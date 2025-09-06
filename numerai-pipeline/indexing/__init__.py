"""
Multi-tier indexing system for numerai-uprootiny
Provides fast data access, filtering, and clustering capabilities
"""

from .index_engine import IndexEngine, IndexType

__all__ = ["IndexEngine", "IndexType"]

__version__ = "1.0.0"
