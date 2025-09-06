#!/usr/bin/env python3
"""
Advanced indexing engine for numerai data
Supports multiple index types with automatic optimization
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Any, Union, Callable, Tuple
from enum import Enum
from dataclasses import dataclass
from collections import defaultdict
import bisect
import hashlib
import pickle
import logging
from pathlib import Path


class IndexType(Enum):
    """Types of indices available"""

    BTREE = "btree"  # Balanced tree for range queries
    HASH = "hash"  # Hash table for exact matches
    BITMAP = "bitmap"  # Bitmap index for categorical data
    SPATIAL = "spatial"  # R-tree for spatial data
    TEMPORAL = "temporal"  # Time-series optimized index
    COMPOSITE = "composite"  # Multi-column composite index
    INVERTED = "inverted"  # Inverted index for text/features


@dataclass
class IndexMetadata:
    """Metadata for index tracking"""

    name: str
    index_type: IndexType
    column: str
    size: int
    memory_usage: int
    created_at: pd.Timestamp
    last_updated: pd.Timestamp
    access_count: int = 0
    hit_rate: float = 0.0


class BTreeIndex:
    """B-tree index implementation for range queries"""

    def __init__(self, column: str):
        self.column = column
        self.sorted_keys = []
        self.key_to_indices = defaultdict(list)
        self._is_built = False

    def build(self, data: pd.DataFrame) -> None:
        """Build the B-tree index"""
        if self.column not in data.columns:
            raise ValueError(f"Column {self.column} not found in data")

        # Create sorted keys and mapping
        for idx, value in enumerate(data[self.column]):
            if pd.notna(value):
                self.key_to_indices[value].append(idx)

        self.sorted_keys = sorted(self.key_to_indices.keys())
        self._is_built = True

    def range_query(self, min_val: Any, max_val: Any) -> List[int]:
        """Find indices for values in range [min_val, max_val]"""
        if not self._is_built:
            raise RuntimeError("Index not built")

        start_idx = bisect.bisect_left(self.sorted_keys, min_val)
        end_idx = bisect.bisect_right(self.sorted_keys, max_val)

        result_indices = []
        for i in range(start_idx, end_idx):
            result_indices.extend(self.key_to_indices[self.sorted_keys[i]])

        return sorted(result_indices)

    def exact_match(self, value: Any) -> List[int]:
        """Find indices for exact value match"""
        return self.key_to_indices.get(value, [])


class HashIndex:
    """Hash index for fast exact matches"""

    def __init__(self, column: str):
        self.column = column
        self.hash_table = defaultdict(list)
        self._is_built = False

    def build(self, data: pd.DataFrame) -> None:
        """Build the hash index"""
        if self.column not in data.columns:
            raise ValueError(f"Column {self.column} not found in data")

        for idx, value in enumerate(data[self.column]):
            if pd.notna(value):
                # Use hash for large strings, direct value for small ones
                key = (
                    hash(str(value))
                    if isinstance(value, str) and len(str(value)) > 50
                    else value
                )
                self.hash_table[key].append(idx)

        self._is_built = True

    def lookup(self, value: Any) -> List[int]:
        """Find indices for exact value"""
        if not self._is_built:
            raise RuntimeError("Index not built")

        key = (
            hash(str(value))
            if isinstance(value, str) and len(str(value)) > 50
            else value
        )
        return self.hash_table.get(key, [])


class BitmapIndex:
    """Bitmap index for categorical data"""

    def __init__(self, column: str):
        self.column = column
        self.bitmaps = {}
        self.unique_values = set()
        self._is_built = False

    def build(self, data: pd.DataFrame) -> None:
        """Build bitmap index"""
        if self.column not in data.columns:
            raise ValueError(f"Column {self.column} not found in data")

        self.unique_values = set(data[self.column].dropna().unique())

        # Create bitmap for each unique value
        for value in self.unique_values:
            bitmap = np.zeros(len(data), dtype=bool)
            bitmap[data[self.column] == value] = True
            self.bitmaps[value] = bitmap

        self._is_built = True

    def lookup(self, value: Any) -> np.ndarray:
        """Get bitmap for value"""
        if not self._is_built:
            raise RuntimeError("Index not built")

        return self.bitmaps.get(
            value, np.zeros(len(next(iter(self.bitmaps.values()))), dtype=bool)
        )

    def intersection(self, values: List[Any]) -> np.ndarray:
        """Get intersection of multiple values (AND operation)"""
        if not values:
            return np.zeros(len(next(iter(self.bitmaps.values()))), dtype=bool)

        result = self.lookup(values[0])
        for value in values[1:]:
            result &= self.lookup(value)

        return result

    def union(self, values: List[Any]) -> np.ndarray:
        """Get union of multiple values (OR operation)"""
        if not values:
            return np.zeros(len(next(iter(self.bitmaps.values()))), dtype=bool)

        result = self.lookup(values[0])
        for value in values[1:]:
            result |= self.lookup(value)

        return result


class CompositeIndex:
    """Multi-column composite index"""

    def __init__(self, columns: List[str]):
        self.columns = columns
        self.composite_keys = {}
        self._is_built = False

    def build(self, data: pd.DataFrame) -> None:
        """Build composite index"""
        missing_cols = [col for col in self.columns if col not in data.columns]
        if missing_cols:
            raise ValueError(f"Columns not found: {missing_cols}")

        for idx, row in data.iterrows():
            # Create composite key from multiple columns
            key_parts = []
            for col in self.columns:
                value = row[col]
                if pd.isna(value):
                    key_parts.append("__NULL__")
                else:
                    key_parts.append(str(value))

            composite_key = "|".join(key_parts)

            if composite_key not in self.composite_keys:
                self.composite_keys[composite_key] = []
            self.composite_keys[composite_key].append(idx)

        self._is_built = True

    def lookup(self, **kwargs) -> List[int]:
        """Find indices matching composite key"""
        if not self._is_built:
            raise RuntimeError("Index not built")

        # Build key from provided values
        key_parts = []
        for col in self.columns:
            if col in kwargs:
                value = kwargs[col]
                key_parts.append("__NULL__" if pd.isna(value) else str(value))
            else:
                key_parts.append("*")  # Wildcard for missing values

        pattern = "|".join(key_parts)

        # Find matching keys (simple pattern matching for now)
        if "*" not in pattern:
            return self.composite_keys.get(pattern, [])

        # Handle wildcards
        matching_indices = []
        for key, indices in self.composite_keys.items():
            if self._matches_pattern(key, pattern):
                matching_indices.extend(indices)

        return sorted(set(matching_indices))

    def _matches_pattern(self, key: str, pattern: str) -> bool:
        """Check if key matches pattern with wildcards"""
        key_parts = key.split("|")
        pattern_parts = pattern.split("|")

        if len(key_parts) != len(pattern_parts):
            return False

        for key_part, pattern_part in zip(key_parts, pattern_parts):
            if pattern_part != "*" and key_part != pattern_part:
                return False

        return True


class IndexEngine:
    """
    🚀 Friendly and Trustworthy Index Engine

    A delightfully simple yet powerful indexing system that makes data access fast and fun!

    Features:
    ✨ Multiple index types (B-tree, Hash, Bitmap, Composite)
    🔍 Lightning-fast queries with automatic optimization
    📊 Built-in performance monitoring and health checks
    🛡️ Robust error handling and data validation
    💾 Smart caching with automatic cleanup
    📈 Real-time usage analytics and recommendations

    Example:
        >>> engine = IndexEngine()
        >>> engine.create_index("my_fast_index", IndexType.HASH, data, column="id")
        >>> results = engine.query("my_fast_index", value=12345)
        >>> print(f"Found {len(results)} matching records! 🎉")
    """

    def __init__(self, cache_dir: Optional[Path] = None, friendly_mode: bool = True):
        """
        Initialize your friendly index engine! 🚀

        Args:
            cache_dir: Where to store index cache (defaults to sensible location)
            friendly_mode: Enable helpful messages and emojis (recommended!)
        """
        self.indices: Dict[str, Any] = {}
        self.metadata: Dict[str, IndexMetadata] = {}
        self.friendly_mode = friendly_mode

        # Setup cache directory with user-friendly path
        if cache_dir:
            self.cache_dir = Path(cache_dir)
        else:
            self.cache_dir = Path.home() / ".numerai_cache" / "indices"

        try:
            self.cache_dir.mkdir(parents=True, exist_ok=True)
            if self.friendly_mode:
                print(f"📁 Index cache ready at: {self.cache_dir}")
        except PermissionError:
            # Fallback to temp directory if home isn't writable
            import tempfile

            self.cache_dir = Path(tempfile.gettempdir()) / "numerai_indices"
            self.cache_dir.mkdir(exist_ok=True)
            if self.friendly_mode:
                print(f"📁 Using temporary cache at: {self.cache_dir}")

        # Performance tracking with friendly names
        self.query_stats = defaultdict(int)
        self.performance_log = []
        self._health_score = 100

        # Setup friendly logging
        self.logger = logging.getLogger(__name__)
        if self.friendly_mode:
            # Add colorful handler for friendly output
            handler = logging.StreamHandler()
            formatter = logging.Formatter("🔧 %(levelname)s: %(message)s")
            handler.setFormatter(formatter)
            if not self.logger.handlers:
                self.logger.addHandler(handler)
                self.logger.setLevel(logging.INFO)

        if self.friendly_mode:
            print("🎯 IndexEngine initialized and ready to accelerate your queries!")
            print("💡 Tip: Use engine.help() to see available commands")

    def help(self) -> None:
        """Show helpful information about using the IndexEngine 💡"""
        help_text = """
🚀 IndexEngine Help - Your Fast Data Access Companion

🔍 AVAILABLE INDEX TYPES:
  • BTREE    - Perfect for range queries (age > 25, price between $10-$50)
  • HASH     - Lightning fast exact matches (id = 12345)
  • BITMAP   - Super efficient for categories (status IN ['active', 'pending'])
  • COMPOSITE- Query multiple columns together (user_id + timestamp)

✨ QUICK START EXAMPLES:

  # Create a fast lookup index for user IDs
  engine.create_index("users", IndexType.HASH, data, column="user_id")
  
  # Create a range query index for numerical data
  engine.create_index("prices", IndexType.BTREE, data, column="price")
  
  # Create a category index for status filtering  
  engine.create_index("status", IndexType.BITMAP, data, column="status")
  
  # Query your indices
  user_rows = engine.query("users", value=12345)
  price_rows = engine.query("prices", min_val=10, max_val=50)
  active_rows = engine.query("status", value="active")

📊 MONITORING:
  • engine.status()           - Check engine health
  • engine.get_index_stats()  - View performance metrics
  • engine.optimize()         - Get optimization suggestions

🛠️ MAINTENANCE:
  • engine.rebuild_index()    - Refresh an index
  • engine.clear_cache()      - Clean up disk space
  • engine.validate()         - Check data integrity

Need more help? Check the documentation or ask for assistance! 🤝
        """
        print(help_text)

    def create_index(
        self,
        name: str,
        index_type: IndexType,
        data: pd.DataFrame,
        column: Optional[str] = None,
        columns: Optional[List[str]] = None,
        validate_data: bool = True,
    ) -> bool:
        """
        Create a shiny new index to speed up your queries! ✨

        Args:
            name: A memorable name for your index (like "user_lookup")
            index_type: Type of index (HASH for exact matches, BTREE for ranges, etc.)
            data: Your precious DataFrame to index
            column: Column to index (for single-column indices)
            columns: List of columns (for composite indices)
            validate_data: Check data quality before indexing (recommended!)

        Returns:
            bool: True if index was created successfully

        Example:
            >>> success = engine.create_index("my_users", IndexType.HASH, df, column="user_id")
            >>> if success:
            >>>     print("🎉 Ready to query at lightning speed!")
        """

        # Friendly validation with helpful error messages
        if not name or not name.strip():
            if self.friendly_mode:
                print(
                    "❌ Oops! Index names can't be empty. Try something like 'user_lookup' or 'price_index'"
                )
            raise ValueError("Index name cannot be empty")

        if not isinstance(data, pd.DataFrame):
            if self.friendly_mode:
                print(
                    "❌ Expected a pandas DataFrame, but got something else. Make sure to pass your data as a DataFrame!"
                )
            raise TypeError("Data must be a pandas DataFrame")

        if len(data) == 0:
            if self.friendly_mode:
                print("❌ Your DataFrame is empty! Can't create an index on no data.")
            raise ValueError("Cannot create index on empty DataFrame")

        # Warn about rebuilding existing indices
        if name in self.indices:
            if self.friendly_mode:
                print(
                    f"🔄 Index '{name}' already exists - rebuilding with fresh data..."
                )
            else:
                self.logger.warning(f"Index {name} already exists, rebuilding...")

        # Validate data quality if requested
        if validate_data:
            self._validate_data_quality(data, column, columns)

        try:
            # Create appropriate index based on type with friendly progress
            if self.friendly_mode:
                print(f"🏗️ Building {index_type.value.upper()} index '{name}'...")

            if index_type == IndexType.BTREE:
                if not column:
                    raise ValueError(
                        "🎯 BTREE index needs a column! Try: create_index('my_index', IndexType.BTREE, data, column='price')"
                    )
                if column not in data.columns:
                    raise ValueError(
                        f"❌ Column '{column}' not found in your data. Available columns: {list(data.columns)}"
                    )
                index = BTreeIndex(column)

            elif index_type == IndexType.HASH:
                if not column:
                    raise ValueError(
                        "🎯 HASH index needs a column! Try: create_index('my_index', IndexType.HASH, data, column='user_id')"
                    )
                if column not in data.columns:
                    raise ValueError(
                        f"❌ Column '{column}' not found in your data. Available columns: {list(data.columns)}"
                    )
                index = HashIndex(column)

            elif index_type == IndexType.BITMAP:
                if not column:
                    raise ValueError(
                        "🎯 BITMAP index needs a column! Try: create_index('my_index', IndexType.BITMAP, data, column='category')"
                    )
                if column not in data.columns:
                    raise ValueError(
                        f"❌ Column '{column}' not found in your data. Available columns: {list(data.columns)}"
                    )
                index = BitmapIndex(column)

            elif index_type == IndexType.COMPOSITE:
                if not columns:
                    raise ValueError(
                        "🎯 COMPOSITE index needs columns! Try: create_index('my_index', IndexType.COMPOSITE, data, columns=['user_id', 'date'])"
                    )
                missing_cols = [col for col in columns if col not in data.columns]
                if missing_cols:
                    raise ValueError(
                        f"❌ Columns not found in your data: {missing_cols}. Available: {list(data.columns)}"
                    )
                index = CompositeIndex(columns)

            else:
                raise NotImplementedError(
                    f"❌ Index type {index_type} isn't implemented yet. Supported types: BTREE, HASH, BITMAP, COMPOSITE"
                )

            # Build the index with progress tracking
            start_time = pd.Timestamp.now()
            index.build(data)
            build_time = (pd.Timestamp.now() - start_time).total_seconds()

            # Store index and metadata
            self.indices[name] = index
            memory_usage = self._estimate_memory_usage(index)
            self.metadata[name] = IndexMetadata(
                name=name,
                index_type=index_type,
                column=column or ",".join(columns or []),
                size=len(data),
                memory_usage=memory_usage,
                created_at=pd.Timestamp.now(),
                last_updated=pd.Timestamp.now(),
            )

            # Friendly success message
            if self.friendly_mode:
                memory_mb = (
                    memory_usage / (1024 * 1024)
                    if memory_usage > 1024 * 1024
                    else memory_usage / 1024
                )
                memory_unit = "MB" if memory_usage > 1024 * 1024 else "KB"
                print(f"✅ Index '{name}' created successfully!")
                print(f"   📊 Indexed {len(data):,} rows in {build_time:.3f}s")
                print(f"   💾 Memory usage: {memory_mb:.1f} {memory_unit}")
                print(f"   🚀 Ready for lightning-fast queries!")
            else:
                self.logger.info(
                    f"Created {index_type.value} index '{name}' in {build_time:.3f}s"
                )

            # Cache the index for persistence
            self._cache_index(name, index)
            return True

        except Exception as e:
            if self.friendly_mode:
                print(f"❌ Oops! Failed to create index '{name}': {str(e)}")
                print("💡 Try checking your data or use engine.help() for guidance")
            else:
                self.logger.error(f"Failed to create index {name}: {e}")
            return False

    def _validate_data_quality(
        self, data: pd.DataFrame, column: Optional[str], columns: Optional[List[str]]
    ) -> None:
        """Validate data quality and provide helpful suggestions"""
        if column:
            null_pct = data[column].isnull().sum() / len(data) * 100
            if null_pct > 50:
                if self.friendly_mode:
                    print(
                        f"⚠️ Warning: Column '{column}' has {null_pct:.1f}% null values. This might slow down queries."
                    )
                    print(
                        "💡 Consider cleaning your data or choosing a different column for better performance."
                    )

        if columns:
            for col in columns:
                null_pct = data[col].isnull().sum() / len(data) * 100
                if null_pct > 50:
                    if self.friendly_mode:
                        print(
                            f"⚠️ Warning: Column '{col}' has {null_pct:.1f}% null values."
                        )

    def query(self, index_name: str, **kwargs) -> List[int]:
        """
        Query your index with lightning speed! ⚡

        Args:
            index_name: Name of the index to query
            **kwargs: Query parameters (depends on index type)

        Returns:
            List of row indices matching your query

        Examples:
            >>> # Exact match on HASH index
            >>> rows = engine.query("users", value=12345)
            >>>
            >>> # Range query on BTREE index
            >>> rows = engine.query("prices", min_val=10, max_val=50)
            >>>
            >>> # Category lookup on BITMAP index
            >>> rows = engine.query("status", value="active")
            >>>
            >>> # Multiple values with OR operation
            >>> rows = engine.query("status", values=["active", "pending"], operation="union")
        """

        # Friendly validation
        if not index_name or not index_name.strip():
            if self.friendly_mode:
                print("❌ Index name can't be empty! Which index do you want to query?")
                if self.indices:
                    print(f"💡 Available indices: {list(self.indices.keys())}")
            raise ValueError("Index name cannot be empty")

        if index_name not in self.indices:
            if self.friendly_mode:
                print(f"❌ Index '{index_name}' not found!")
                if self.indices:
                    print(f"💡 Available indices: {list(self.indices.keys())}")
                else:
                    print(
                        "💡 No indices exist yet. Create one first with engine.create_index()"
                    )
            raise ValueError(f"Index '{index_name}' not found")

        try:
            index = self.indices[index_name]
            metadata = self.metadata[index_name]

            # Track query for analytics
            self.query_stats[index_name] += 1
            metadata.access_count += 1

            start_time = pd.Timestamp.now()

            # Execute query based on index type with validation
            if isinstance(index, BTreeIndex):
                if "value" in kwargs:
                    result = index.exact_match(kwargs["value"])
                elif "min_val" in kwargs and "max_val" in kwargs:
                    result = index.range_query(kwargs["min_val"], kwargs["max_val"])
                else:
                    if self.friendly_mode:
                        print("❌ BTREE index queries need either:")
                        print("   • value=123 (exact match)")
                        print("   • min_val=10, max_val=50 (range query)")
                    raise ValueError(
                        "BTREE index requires 'value' or 'min_val'+'max_val' parameters"
                    )

            elif isinstance(index, HashIndex):
                if "value" not in kwargs:
                    if self.friendly_mode:
                        print("❌ HASH index queries need: value=your_lookup_value")
                    raise ValueError("HASH index requires 'value' parameter")
                result = index.lookup(kwargs["value"])

            elif isinstance(index, BitmapIndex):
                if "value" in kwargs:
                    bitmap = index.lookup(kwargs["value"])
                    result = np.where(bitmap)[0].tolist()
                elif "values" in kwargs:
                    operation = kwargs.get("operation", "union")
                    if operation == "union":
                        bitmap = index.union(kwargs["values"])
                    elif operation == "intersection":
                        bitmap = index.intersection(kwargs["values"])
                    else:
                        if self.friendly_mode:
                            print(
                                "❌ Operation must be 'union' (OR) or 'intersection' (AND)"
                            )
                        raise ValueError("Operation must be 'union' or 'intersection'")
                    result = np.where(bitmap)[0].tolist()
                else:
                    if self.friendly_mode:
                        print("❌ BITMAP index queries need either:")
                        print("   • value='category' (single value)")
                        print(
                            "   • values=['cat1', 'cat2'], operation='union' (multiple values)"
                        )
                    raise ValueError(
                        "BITMAP index requires 'value' or 'values' parameter"
                    )

            elif isinstance(index, CompositeIndex):
                if not kwargs:
                    if self.friendly_mode:
                        print("❌ COMPOSITE index queries need column values:")
                        print(f"   • Available columns: {index.columns}")
                        print(
                            "   • Example: engine.query('my_index', user_id=123, date='2023-01-01')"
                        )
                    raise ValueError("COMPOSITE index requires column value parameters")
                result = index.lookup(**kwargs)

            else:
                raise NotImplementedError(f"Query not implemented for index type")

            # Update performance metrics
            query_time = (pd.Timestamp.now() - start_time).total_seconds()
            self.performance_log.append(
                {
                    "index_name": index_name,
                    "query_time": query_time,
                    "result_count": len(result),
                    "timestamp": pd.Timestamp.now(),
                }
            )

            # Friendly result summary
            if self.friendly_mode and query_time > 0.1:  # Only show for slower queries
                print(
                    f"⚡ Query completed in {query_time:.3f}s - Found {len(result):,} matches"
                )

            return result

        except Exception as e:
            if self.friendly_mode:
                print(f"❌ Query failed: {str(e)}")
                print("💡 Try engine.help() for query examples")
            raise

    def status(self) -> Dict[str, Any]:
        """
        Check the health and status of your IndexEngine 🏥

        Returns comprehensive status information including performance metrics,
        health indicators, and helpful recommendations.
        """

        total_indices = len(self.indices)
        total_queries = sum(self.query_stats.values())
        total_memory = sum(meta.memory_usage for meta in self.metadata.values())

        # Calculate health score based on various factors
        health_factors = []

        # Factor 1: Query performance (recent queries)
        recent_queries = [
            log
            for log in self.performance_log
            if log["timestamp"] > pd.Timestamp.now() - pd.Timedelta(minutes=10)
        ]
        if recent_queries:
            avg_query_time = np.mean([q["query_time"] for q in recent_queries])
            if avg_query_time < 0.01:
                health_factors.append(100)  # Excellent
            elif avg_query_time < 0.1:
                health_factors.append(80)  # Good
            elif avg_query_time < 0.5:
                health_factors.append(60)  # Fair
            else:
                health_factors.append(40)  # Needs attention
        else:
            health_factors.append(100)  # No recent queries to worry about

        # Factor 2: Memory usage efficiency
        if total_memory < 100 * 1024 * 1024:  # < 100MB
            health_factors.append(100)
        elif total_memory < 500 * 1024 * 1024:  # < 500MB
            health_factors.append(80)
        else:
            health_factors.append(60)

        # Factor 3: Index usage balance
        if total_queries > 0:
            query_distribution = np.array(list(self.query_stats.values()))
            balance_score = 100 - (
                np.std(query_distribution) / np.mean(query_distribution) * 20
            )
            health_factors.append(max(50, min(100, balance_score)))
        else:
            health_factors.append(100)

        overall_health = int(np.mean(health_factors))

        # Determine health emoji and message
        if overall_health >= 90:
            health_emoji = "💚"
            health_msg = "Excellent - Running like a dream!"
        elif overall_health >= 75:
            health_emoji = "💛"
            health_msg = "Good - Performing well"
        elif overall_health >= 60:
            health_emoji = "🟠"
            health_msg = "Fair - Could use some optimization"
        else:
            health_emoji = "🔴"
            health_msg = "Needs attention - Consider optimization"

        status_info = {
            "health_score": overall_health,
            "health_status": f"{health_emoji} {health_msg}",
            "indices": {
                "total": total_indices,
                "types": {
                    t.value: sum(1 for m in self.metadata.values() if m.index_type == t)
                    for t in IndexType
                },
                "names": list(self.indices.keys()),
            },
            "performance": {
                "total_queries": total_queries,
                "recent_queries": len(recent_queries),
                "avg_recent_query_time": (
                    np.mean([q["query_time"] for q in recent_queries])
                    if recent_queries
                    else 0
                ),
                "memory_usage_mb": total_memory / (1024 * 1024),
            },
            "recommendations": self._generate_health_recommendations(
                overall_health, recent_queries, total_memory
            ),
        }

        if self.friendly_mode:
            self._print_friendly_status(status_info)

        return status_info

    def _print_friendly_status(self, status_info: Dict[str, Any]) -> None:
        """Print a friendly status report"""
        print("\n🚀 IndexEngine Status Report")
        print("=" * 50)

        print(f"📊 Overall Health: {status_info['health_status']}")
        print(f"🏗️ Active Indices: {status_info['indices']['total']}")

        if status_info["indices"]["names"]:
            print(f"📝 Index Names: {', '.join(status_info['indices']['names'])}")

        print(f"⚡ Total Queries: {status_info['performance']['total_queries']:,}")

        if status_info["performance"]["recent_queries"] > 0:
            avg_time = status_info["performance"]["avg_recent_query_time"]
            print(f"🕐 Avg Query Time: {avg_time:.3f}s")

        memory_mb = status_info["performance"]["memory_usage_mb"]
        print(f"💾 Memory Usage: {memory_mb:.1f} MB")

        if status_info["recommendations"]:
            print("\n💡 Recommendations:")
            for rec in status_info["recommendations"]:
                print(f"   • {rec}")

        print("\n✨ Keep up the great work! Your data is flying fast! 🚀")

    def _generate_health_recommendations(
        self, health_score: int, recent_queries: List, memory_usage: int
    ) -> List[str]:
        """Generate helpful recommendations based on current status"""
        recommendations = []

        if health_score < 75:
            recommendations.append(
                "Consider running engine.optimize() for performance suggestions"
            )

        if recent_queries and np.mean([q["query_time"] for q in recent_queries]) > 0.1:
            recommendations.append(
                "Some queries are running slowly - check if indices need rebuilding"
            )

        if memory_usage > 500 * 1024 * 1024:  # > 500MB
            recommendations.append(
                "Memory usage is high - consider clearing unused indices"
            )

        if len(self.indices) == 0:
            recommendations.append(
                "No indices created yet - use create_index() to speed up your queries!"
            )

        if not recommendations:
            recommendations.append(
                "Everything looks great! Your indices are performing optimally 🎉"
            )

        return recommendations

    def get_index_stats(self, index_name: Optional[str] = None) -> Dict[str, Any]:
        """Get index statistics"""
        if index_name:
            if index_name not in self.metadata:
                raise ValueError(f"Index {index_name} not found")
            return self.metadata[index_name].__dict__

        # Return stats for all indices
        stats = {}
        for name, metadata in self.metadata.items():
            stats[name] = metadata.__dict__
            stats[name]["query_count"] = self.query_stats[name]

        return stats

    def optimize_indices(self) -> Dict[str, str]:
        """Optimize indices based on usage patterns"""
        optimization_results = {}

        # Analyze query patterns
        recent_queries = [
            log
            for log in self.performance_log
            if log["timestamp"] > pd.Timestamp.now() - pd.Timedelta(hours=1)
        ]

        # Identify slow queries
        slow_threshold = 0.1  # seconds
        slow_queries = [q for q in recent_queries if q["query_time"] > slow_threshold]

        for index_name in self.indices.keys():
            index_slow_queries = [
                q for q in slow_queries if q["index_name"] == index_name
            ]

            if index_slow_queries:
                avg_time = np.mean([q["query_time"] for q in index_slow_queries])
                optimization_results[index_name] = (
                    f"Consider rebuilding - avg query time: {avg_time:.3f}s"
                )
            else:
                optimization_results[index_name] = "Performing well"

        return optimization_results

    def _estimate_memory_usage(self, index: Any) -> int:
        """Estimate memory usage of an index"""
        try:
            return len(pickle.dumps(index))
        except:
            return 0  # Fallback if pickle fails

    def _cache_index(self, name: str, index: Any) -> None:
        """Cache index to disk"""
        try:
            cache_file = self.cache_dir / f"{name}.index"
            with open(cache_file, "wb") as f:
                pickle.dump(index, f)
        except Exception as e:
            self.logger.warning(f"Failed to cache index {name}: {e}")

    def load_cached_index(self, name: str) -> bool:
        """Load index from cache"""
        try:
            cache_file = self.cache_dir / f"{name}.index"
            if cache_file.exists():
                with open(cache_file, "rb") as f:
                    index = pickle.load(f)
                self.indices[name] = index
                return True
        except Exception as e:
            self.logger.warning(f"Failed to load cached index {name}: {e}")
        return False

    def clear_cache(self) -> None:
        """Clear all cached indices"""
        for cache_file in self.cache_dir.glob("*.index"):
            cache_file.unlink()
        self.logger.info("Cleared index cache")
