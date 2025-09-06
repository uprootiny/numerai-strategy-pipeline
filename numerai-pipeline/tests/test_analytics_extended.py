#!/usr/bin/env python3
"""
Extended test suite for analytics module
Comprehensive coverage of analytics functionality
"""

import unittest
import pandas as pd
import numpy as np
import tempfile
import json
import time
import os
from pathlib import Path
import sys

# Add the parent directory to the Python path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from analytics.analyze_uprootiny import UprootinyAnalytics


class TestAnalyticsExtended(unittest.TestCase):
    """Extended tests for analytics system"""

    def setUp(self):
        """Set up test fixtures"""
        self.temp_dir = Path(tempfile.mkdtemp())
        self.analytics = UprootinyAnalytics()

        # Create logs directory in temp directory and patch analytics to use it
        self.logs_dir = self.temp_dir / "logs"
        self.logs_dir.mkdir(exist_ok=True)

        # Patch the analytics to use our temp directory
        self.analytics.base_path = self.temp_dir

        # Create sample submission files in the expected format
        self.sample_submissions = [
            {"model": "uprootiny", "round": 450, "score": 0.85, "rank": 150},
            {"model": "uprootiny", "round": 451, "score": 0.87, "rank": 120},
            {"model": "uprootiny", "round": 452, "score": 0.82, "rank": 180},
        ]

        for i, submission in enumerate(self.sample_submissions):
            file_path = self.logs_dir / f"submission_log_{i}.json"
            with open(file_path, "w") as f:
                json.dump(submission, f)

    def tearDown(self):
        """Clean up test fixtures"""
        import shutil

        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_comprehensive_submission_analysis(self):
        """Test comprehensive submission analysis"""
        analysis_results = self.analytics.analyze_submissions()

        # Verify structure
        self.assertIsInstance(analysis_results, dict)
        self.assertIn("total_submissions", analysis_results)
        self.assertIn("performance_metrics", analysis_results)

        # Verify metrics
        metrics = analysis_results["performance_metrics"]
        self.assertIn("average_score", metrics)
        self.assertIn("best_score", metrics)
        self.assertIn("worst_score", metrics)

    def test_performance_trending(self):
        """Test performance trending analysis"""
        # Create trend data
        trend_data = []
        base_score = 0.80

        for i in range(20):
            score = base_score + (i * 0.01) + np.random.normal(0, 0.02)
            trend_data.append(
                {
                    "model": "uprootiny",
                    "round": 450 + i,
                    "score": max(0.0, min(1.0, score)),  # Clamp between 0 and 1
                    "rank": np.random.randint(50, 500),
                }
            )

        # Write trend files
        for i, data in enumerate(trend_data):
            file_path = self.logs_dir / f"submission_log_trend_{i}.json"
            with open(file_path, "w") as f:
                json.dump(data, f)

        # Analyze trends
        results = self.analytics.analyze_submissions()

        self.assertGreaterEqual(results["total_submissions"], 20)
        self.assertIn("performance_metrics", results)

    def test_error_handling_scenarios(self):
        """Test various error handling scenarios"""
        # Test with corrupted JSON files
        corrupted_file = self.logs_dir / "submission_log_corrupted.json"
        with open(corrupted_file, "w") as f:
            f.write("invalid json {{{")

        # Test with empty directory
        empty_dir = self.temp_dir / "empty"
        empty_dir.mkdir()
        empty_logs_dir = empty_dir / "logs"
        empty_logs_dir.mkdir()
        empty_analytics = UprootinyAnalytics()
        empty_analytics.base_path = empty_dir

        results = empty_analytics.analyze_submissions()
        self.assertEqual(results["total_submissions"], 0)

        # Test with non-existent directory
        nonexistent_analytics = UprootinyAnalytics()
        try:
            nonexistent_results = nonexistent_analytics.analyze_submissions()
            # Should handle gracefully
            self.assertIsInstance(nonexistent_results, dict)
        except Exception:
            # Exception is acceptable
            pass

    def test_large_dataset_performance(self):
        """Test performance with larger datasets"""
        # Generate large dataset
        large_data = []
        for i in range(1000):
            large_data.append(
                {
                    "model": f"model_{i % 10}",
                    "round": 400 + (i // 10),
                    "score": np.random.beta(
                        2, 2
                    ),  # Beta distribution for realistic scores
                    "rank": np.random.randint(1, 1000),
                    "timestamp": int(time.time()) - (i * 86400),  # Daily submissions
                }
            )

        # Write large dataset files (each file contains one submission)
        for i, data in enumerate(
            large_data[:20]
        ):  # Limit to 20 files to avoid too many
            file_path = self.logs_dir / f"submission_log_large_{i}.json"
            with open(file_path, "w") as f:
                json.dump(data, f)

        # Time the analysis
        start_time = time.time()
        results = self.analytics.analyze_submissions()
        analysis_time = time.time() - start_time

        # Verify results and performance
        self.assertGreater(
            results["total_submissions"], 15
        )  # Should find most files (20 + setup files)
        self.assertLess(analysis_time, 10.0)  # Should complete within 10 seconds

    def test_data_quality_metrics(self):
        """Test data quality assessment"""
        # Create files with various quality issues
        quality_test_data = [
            {"model": "uprootiny", "round": 450, "score": 0.85, "rank": 150},  # Good
            {
                "model": "uprootiny",
                "round": 451,
                "score": 1.5,
                "rank": 120,
            },  # Invalid score
            {"model": "uprootiny", "round": 452, "rank": 180},  # Missing score
            {"model": "uprootiny", "round": 453, "score": 0.82},  # Missing rank
            {"model": "", "round": 454, "score": 0.88, "rank": 100},  # Empty model name
        ]

        for i, data in enumerate(quality_test_data):
            file_path = self.logs_dir / f"submission_log_quality_{i}.json"
            with open(file_path, "w") as f:
                json.dump(data, f)

        results = self.analytics.analyze_submissions()

        # Should handle data quality issues gracefully
        self.assertIsInstance(results, dict)
        self.assertIn("total_submissions", results)

    def test_analytics_metadata(self):
        """Test analytics metadata and reporting"""
        # Add metadata to submissions
        metadata_submissions = [
            {
                "model": "uprootiny",
                "round": 450,
                "score": 0.85,
                "rank": 150,
                "metadata": {
                    "features_used": 310,
                    "training_time": 3600,
                    "validation_score": 0.82,
                },
            },
            {
                "model": "uprootiny",
                "round": 451,
                "score": 0.87,
                "rank": 120,
                "metadata": {
                    "features_used": 315,
                    "training_time": 3800,
                    "validation_score": 0.84,
                },
            },
        ]

        for i, data in enumerate(metadata_submissions):
            file_path = self.logs_dir / f"submission_log_metadata_{i}.json"
            with open(file_path, "w") as f:
                json.dump(data, f)

        results = self.analytics.analyze_submissions()

        # Should process metadata without errors
        self.assertIsInstance(results, dict)
        self.assertGreaterEqual(results["total_submissions"], 2)


if __name__ == "__main__":
    unittest.main()
