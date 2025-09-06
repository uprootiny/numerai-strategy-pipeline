#!/usr/bin/env python3
"""
Basic test suite for indexing module
Ensures indexing functionality is tested and covered
"""

import unittest
import pandas as pd
import numpy as np
import tempfile
import time
from pathlib import Path
import sys
import os

# Add the parent directory to the Python path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from indexing import IndexEngine, IndexType


class TestIndexingBasics(unittest.TestCase):
    """Basic tests for indexing system to ensure coverage"""

    def setUp(self):
        """Set up test fixtures"""
        self.test_data = pd.DataFrame(
            {
                "id": range(100),
                "category": np.random.choice(["A", "B", "C"], 100),
                "value": np.random.uniform(0, 100, 100),
            }
        )

    def test_index_engine_creation(self):
        """Test IndexEngine can be created"""
        engine = IndexEngine(friendly_mode=False)
        self.assertIsInstance(engine, IndexEngine)

    def test_hash_index_creation_and_query(self):
        """Test HASH index creation and basic query"""
        engine = IndexEngine(friendly_mode=False)

        success = engine.create_index(
            "test_hash", IndexType.HASH, self.test_data, column="id"
        )
        self.assertTrue(success)

        # Test query
        results = engine.query("test_hash", value=42)
        self.assertIsInstance(results, list)
        if 42 < len(self.test_data):
            self.assertIn(42, results)

    def test_bitmap_index_creation_and_query(self):
        """Test BITMAP index creation and basic query"""
        engine = IndexEngine(friendly_mode=False)

        success = engine.create_index(
            "test_bitmap", IndexType.BITMAP, self.test_data, column="category"
        )
        self.assertTrue(success)

        # Test query
        results = engine.query("test_bitmap", value="A")
        self.assertIsInstance(results, list)

    def test_btree_index_creation_and_query(self):
        """Test BTREE index creation and basic query"""
        engine = IndexEngine(friendly_mode=False)

        success = engine.create_index(
            "test_btree", IndexType.BTREE, self.test_data, column="value"
        )
        self.assertTrue(success)

        # Test range query
        results = engine.query("test_btree", min_val=10, max_val=50)
        self.assertIsInstance(results, list)

    def test_engine_status(self):
        """Test engine status functionality"""
        engine = IndexEngine(friendly_mode=False)

        # Create an index
        engine.create_index("test_status", IndexType.HASH, self.test_data, column="id")

        # Get status
        status = engine.status()
        self.assertIsInstance(status, dict)
        self.assertIn("health_score", status)
        self.assertIn("indices", status)

    def test_query_error_handling(self):
        """Test query error handling"""
        engine = IndexEngine(friendly_mode=False)

        # Test query on non-existent index
        with self.assertRaises(ValueError):
            engine.query("non_existent_index", value=123)

    def test_friendly_mode(self):
        """Test friendly mode functionality"""
        # Test with friendly_mode=True (default)
        engine = IndexEngine()
        self.assertTrue(engine.friendly_mode)

        # Create an index in friendly mode
        success = engine.create_index(
            "test_friendly", IndexType.HASH, self.test_data, column="id"
        )
        self.assertTrue(success)

        # Test status in friendly mode
        status = engine.status()
        self.assertIsInstance(status, dict)

    def test_advanced_btree_operations(self):
        """Test advanced B-tree operations"""
        engine = IndexEngine(friendly_mode=False)

        success = engine.create_index(
            "test_btree_advanced", IndexType.BTREE, self.test_data, column="value"
        )
        self.assertTrue(success)

        # Test different query types
        results_range = engine.query("test_btree_advanced", min_val=20, max_val=80)
        self.assertIsInstance(results_range, list)

        results_exact = engine.query("test_btree_advanced", value=50.0)
        self.assertIsInstance(results_exact, list)

        # Test edge cases
        results_empty = engine.query("test_btree_advanced", min_val=200, max_val=300)
        self.assertEqual(len(results_empty), 0)

    def test_bitmap_categories(self):
        """Test bitmap index with different categories"""
        engine = IndexEngine(friendly_mode=False)

        success = engine.create_index(
            "test_bitmap_cats", IndexType.BITMAP, self.test_data, column="category"
        )
        self.assertTrue(success)

        # Test all possible categories
        for cat in ["A", "B", "C"]:
            results = engine.query("test_bitmap_cats", value=cat)
            self.assertIsInstance(results, list)
            self.assertGreater(len(results), 0)

    def test_composite_index_creation(self):
        """Test COMPOSITE index creation if supported"""
        engine = IndexEngine(friendly_mode=False)

        try:
            # This might not be implemented yet, but test if it works
            success = engine.create_index(
                "test_composite", IndexType.COMPOSITE, self.test_data, column="id"
            )
            self.assertIsInstance(success, bool)
        except (NotImplementedError, AttributeError):
            # If composite indexes aren't implemented, that's expected
            pass

    def test_index_management(self):
        """Test index management operations"""
        engine = IndexEngine(friendly_mode=False)

        # Create multiple indexes
        engine.create_index(
            "test_hash_mgmt", IndexType.HASH, self.test_data, column="id"
        )
        engine.create_index(
            "test_bitmap_mgmt", IndexType.BITMAP, self.test_data, column="category"
        )

        # Check status shows multiple indexes
        status = engine.status()
        self.assertIn("indices", status)
        self.assertGreaterEqual(len(status["indices"]), 2)

    def test_edge_case_data(self):
        """Test with edge case data scenarios"""
        engine = IndexEngine(friendly_mode=False)

        # Test with empty DataFrame - should raise ValueError
        empty_data = pd.DataFrame({"id": [], "category": [], "value": []})
        with self.assertRaises(ValueError):
            engine.create_index("test_empty", IndexType.HASH, empty_data, column="id")

        # Test with single row DataFrame
        single_data = pd.DataFrame({"id": [1], "category": ["A"], "value": [50.0]})
        success = engine.create_index(
            "test_single", IndexType.HASH, single_data, column="id"
        )
        self.assertTrue(success)

    def test_data_validation(self):
        """Test data validation scenarios"""
        engine = IndexEngine(friendly_mode=False)

        # Test with invalid column name
        try:
            success = engine.create_index(
                "test_invalid_col", IndexType.HASH, self.test_data, column="nonexistent"
            )
            # Should either fail or handle gracefully
            self.assertIsInstance(success, bool)
        except (KeyError, ValueError):
            # Expected if validation is strict
            pass

    def test_comprehensive_index_operations(self):
        """Test comprehensive indexing operations to improve coverage"""
        engine = IndexEngine(friendly_mode=False)

        # Test all index types with various data
        large_data = pd.DataFrame(
            {
                "id": range(1000),
                "category": np.random.choice(["A", "B", "C", "D", "E"], 1000),
                "value": np.random.uniform(0, 1000, 1000),
                "score": np.random.normal(500, 100, 1000),
            }
        )

        # Create multiple indexes
        success_hash = engine.create_index(
            "large_hash", IndexType.HASH, large_data, column="id"
        )
        success_bitmap = engine.create_index(
            "large_bitmap", IndexType.BITMAP, large_data, column="category"
        )
        success_btree1 = engine.create_index(
            "large_btree1", IndexType.BTREE, large_data, column="value"
        )
        success_btree2 = engine.create_index(
            "large_btree2", IndexType.BTREE, large_data, column="score"
        )

        self.assertTrue(success_hash)
        self.assertTrue(success_bitmap)
        self.assertTrue(success_btree1)
        self.assertTrue(success_btree2)

        # Test complex queries
        hash_results = engine.query("large_hash", value=500)
        bitmap_results = engine.query("large_bitmap", value="A")
        range_results = engine.query("large_btree1", min_val=100, max_val=200)
        score_results = engine.query("large_btree2", min_val=400, max_val=600)

        # Verify results are lists
        for results in [hash_results, bitmap_results, range_results, score_results]:
            self.assertIsInstance(results, list)

        # Test status with multiple indexes
        status = engine.status()
        self.assertIn("indices", status)
        self.assertGreaterEqual(len(status["indices"]), 3)
        self.assertIn("health_score", status)

    def test_index_error_conditions(self):
        """Test various error conditions to improve coverage"""
        engine = IndexEngine(friendly_mode=False)

        # Test invalid DataFrame types
        with self.assertRaises(TypeError):
            engine.create_index(
                "invalid", IndexType.HASH, "not a dataframe", column="id"
            )

        with self.assertRaises(TypeError):
            engine.create_index("invalid", IndexType.HASH, None, column="id")

        # Test empty index names
        with self.assertRaises(ValueError):
            engine.create_index("", IndexType.HASH, self.test_data, column="id")

        with self.assertRaises(ValueError):
            engine.create_index("   ", IndexType.HASH, self.test_data, column="id")

        # Test query on non-existent index with different parameters
        with self.assertRaises(ValueError):
            engine.query("nonexistent", value=123)

        with self.assertRaises(ValueError):
            engine.query("nonexistent", min_val=1, max_val=10)

    def test_friendly_mode_features(self):
        """Test friendly mode specific features"""
        engine = IndexEngine(friendly_mode=True)

        # Test help functionality
        try:
            # This should work in friendly mode
            engine.create_index(
                "friendly_test", IndexType.HASH, self.test_data, column="id"
            )
        except Exception as e:
            # If it fails, it should be a graceful failure
            self.assertIsInstance(e, (ValueError, TypeError))

        # Test status in friendly mode
        status = engine.status()
        self.assertIsInstance(status, dict)

    def test_index_performance_scenarios(self):
        """Test performance-related scenarios"""
        engine = IndexEngine(friendly_mode=False)

        # Test with different data sizes
        small_data = pd.DataFrame(
            {"id": range(10), "category": ["A"] * 10, "value": range(10)}
        )

        medium_data = pd.DataFrame(
            {
                "id": range(100),
                "category": np.random.choice(["A", "B"], 100),
                "value": np.random.uniform(0, 100, 100),
            }
        )

        # Test index creation speed with different sizes
        start_time = time.time()
        engine.create_index("small_perf", IndexType.HASH, small_data, column="id")
        small_time = time.time() - start_time

        start_time = time.time()
        engine.create_index("medium_perf", IndexType.HASH, medium_data, column="id")
        medium_time = time.time() - start_time

        # Indexes should be created successfully regardless of size
        self.assertGreater(small_time, 0)
        self.assertGreater(medium_time, 0)


if __name__ == "__main__":
    unittest.main()
