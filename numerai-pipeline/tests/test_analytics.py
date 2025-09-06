#!/usr/bin/env python3
"""
Comprehensive test suite for uprootiny analytics module
Tests analytics functionality, file operations, and data processing
"""

import unittest
import pytest
import pandas as pd
import numpy as np
import json
import tempfile
from pathlib import Path
from unittest.mock import Mock, patch, mock_open
import sys

# Add the parent directory to the Python path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from analytics.analyze_uprootiny import UprootinyAnalytics


class TestUprootinyAnalytics(unittest.TestCase):
    """Test suite for UprootinyAnalytics class"""

    def setUp(self):
        """Set up test fixtures"""
        self.analytics = UprootinyAnalytics()
        self.test_dir = tempfile.mkdtemp()
        self.test_path = Path(self.test_dir)

        # Override base_path for testing
        self.analytics.base_path = self.test_path

        # Create test directory structure
        (self.test_path / "logs").mkdir(exist_ok=True)
        (self.test_path / "submissions").mkdir(exist_ok=True)

    def tearDown(self):
        """Clean up test fixtures"""
        import shutil

        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_analytics_initialization(self):
        """Test analytics initializes with correct attributes"""
        self.assertEqual(self.analytics.model_name, "uprootiny")
        self.assertIsInstance(self.analytics.base_path, Path)

    def test_analyze_submissions_no_logs(self):
        """Test analytics handles no submission logs gracefully"""
        with patch("builtins.print") as mock_print:
            result = self.analytics.analyze_submissions()

            # Should print no submissions message
            mock_print.assert_called_with("📊 No submissions found")
            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 0)

    def test_analyze_submissions_with_logs(self):
        """Test analytics processes submission logs correctly"""
        # Create test log files
        test_logs = [
            {
                "submission_id": "sub_001",
                "model_name": "uprootiny",
                "round": 100,
                "timestamp": "2023-01-01T10:00:00",
                "file": "/test/file1.csv",
            },
            {
                "submission_id": "sub_002",
                "model_name": "uprootiny",
                "round": 101,
                "timestamp": "2023-01-02T10:00:00",
                "file": "/test/file2.csv",
            },
        ]

        # Write test log files
        logs_path = self.test_path / "logs"
        for i, log_data in enumerate(test_logs):
            log_file = logs_path / f"submission_log_{100 + i}.json"
            with open(log_file, "w") as f:
                json.dump(log_data, f)

        with patch("builtins.print") as mock_print:
            result = self.analytics.analyze_submissions()

            # Should return structured dict
            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 2)
            self.assertIsInstance(result["dataframe"], pd.DataFrame)
            self.assertEqual(len(result["dataframe"]), 2)

            # Check print calls
            print_calls = [call[0][0] for call in mock_print.call_args_list]
            self.assertTrue(any("Total submissions: 2" in call for call in print_calls))

    def test_analyze_submissions_invalid_json(self):
        """Test analytics handles invalid JSON files gracefully"""
        # Create invalid JSON file
        logs_path = self.test_path / "logs"
        invalid_log = logs_path / "submission_log_100.json"
        with open(invalid_log, "w") as f:
            f.write("invalid json content")

        # Should handle gracefully, not raise error
        with patch("builtins.print"):
            result = self.analytics.analyze_submissions()
            # Should return empty result due to error handling
            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 0)

    def test_analyze_submissions_file_permissions(self):
        """Test analytics handles file permission errors"""
        # Create log file
        logs_path = self.test_path / "logs"
        log_file = logs_path / "submission_log_100.json"
        with open(log_file, "w") as f:
            json.dump({"test": "data"}, f)

        # Mock file open to raise PermissionError
        with patch("builtins.open", side_effect=PermissionError("Access denied")):
            with self.assertRaises(PermissionError):
                self.analytics.analyze_submissions()

    @patch.object(UprootinyAnalytics, "analyze_submissions")
    def test_run_analysis(self, mock_analyze_submissions):
        """Test run_analysis calls analyze_submissions"""
        mock_analyze_submissions.return_value = None

        with patch("builtins.print") as mock_print:
            self.analytics.run_analysis()

            # Should call analyze_submissions
            mock_analyze_submissions.assert_called_once()

            # Should print analysis start message
            mock_print.assert_called_with("🔍 Running analysis for UPROOTINY")

    def test_analyze_submissions_data_quality(self):
        """Test analytics validates submission data quality"""
        # Create test log with missing fields
        incomplete_log = {
            "submission_id": "sub_001",
            "model_name": "uprootiny",
            # Missing required fields: round, timestamp, file
        }

        logs_path = self.test_path / "logs"
        log_file = logs_path / "submission_log_100.json"
        with open(log_file, "w") as f:
            json.dump(incomplete_log, f)

        with patch("builtins.print"):
            result = self.analytics.analyze_submissions()

            # Should still process the log but with NaN values for missing fields
            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 1)
            self.assertIsInstance(result["dataframe"], pd.DataFrame)
            self.assertEqual(len(result["dataframe"]), 1)

    def test_analyze_submissions_timestamp_parsing(self):
        """Test analytics handles different timestamp formats"""
        test_logs = [
            {
                "submission_id": "sub_001",
                "timestamp": "2023-01-01T10:00:00.123456",
                "round": 100,
                "model_name": "uprootiny",
                "file": "test.csv",
            },
            {
                "submission_id": "sub_002",
                "timestamp": "2023-01-02T10:00:00",
                "round": 101,
                "model_name": "uprootiny",
                "file": "test2.csv",
            },
        ]

        logs_path = self.test_path / "logs"
        for i, log_data in enumerate(test_logs):
            log_file = logs_path / f"submission_log_{100 + i}.json"
            with open(log_file, "w") as f:
                json.dump(log_data, f)

        with patch("builtins.print") as mock_print:
            result = self.analytics.analyze_submissions()

            # Should process both timestamps correctly
            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 2)
            self.assertIsInstance(result["dataframe"], pd.DataFrame)
            self.assertEqual(len(result["dataframe"]), 2)

            # Check that date range calculation works
            print_calls = [call[0][0] for call in mock_print.call_args_list]
            date_range_call = [call for call in print_calls if "Date range:" in call]
            self.assertTrue(len(date_range_call) > 0)


class TestUprootinyAnalyticsIntegration(unittest.TestCase):
    """Integration tests for UprootinyAnalytics"""

    def setUp(self):
        """Set up integration test fixtures"""
        self.analytics = UprootinyAnalytics()
        self.test_dir = tempfile.mkdtemp()
        self.test_path = Path(self.test_dir)
        self.analytics.base_path = self.test_path

        # Create realistic directory structure
        (self.test_path / "logs").mkdir(exist_ok=True)
        (self.test_path / "submissions").mkdir(exist_ok=True)
        (self.test_path / "forecasts").mkdir(exist_ok=True)

    def tearDown(self):
        """Clean up integration test fixtures"""
        import shutil

        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_full_analytics_workflow(self):
        """Test complete analytics workflow with realistic data"""
        # Create realistic submission log data
        import datetime

        submissions = []
        for i in range(10):
            timestamp = datetime.datetime(2023, 1, 1) + datetime.timedelta(days=i)
            submission = {
                "submission_id": f"sub_{i:03d}",
                "model_name": "uprootiny",
                "round": 100 + i,
                "timestamp": timestamp.isoformat(),
                "file": f"/test/submissions/uprootiny_round_{100+i}_{timestamp.strftime('%Y%m%d_%H%M%S')}.csv",
            }
            submissions.append(submission)

            # Write log file
            log_file = self.test_path / "logs" / f"submission_log_{100 + i}.json"
            with open(log_file, "w") as f:
                json.dump(submission, f, indent=2)

        # Run full analysis
        with patch("builtins.print") as mock_print:
            result = self.analytics.run_analysis()

            # Verify output
            print_calls = [call[0][0] for call in mock_print.call_args_list]

            # Should have analysis start message
            self.assertTrue(
                any("Running analysis for UPROOTINY" in call for call in print_calls)
            )

            # Should have found submissions
            self.assertTrue(
                any("Total submissions: 10" in call for call in print_calls)
            )

    def test_analytics_with_mixed_data(self):
        """Test analytics handles mixed data formats correctly"""
        # Create logs with different data structures
        mixed_logs = [
            {
                "submission_id": "sub_001",
                "model_name": "uprootiny",
                "round": 100,
                "timestamp": "2023-01-01T10:00:00",
                "file": "test1.csv",
                "extra_field": "extra_data",
            },
            {
                "submission_id": "sub_002",
                "model_name": "uprootiny",
                "round": 101,
                "timestamp": "2023-01-02T10:00:00",
                "file": "test2.csv",
                # Missing extra_field
            },
        ]

        logs_path = self.test_path / "logs"
        for i, log_data in enumerate(mixed_logs):
            log_file = logs_path / f"submission_log_{100 + i}.json"
            with open(log_file, "w") as f:
                json.dump(log_data, f)

        # Should handle mixed data gracefully
        with patch("builtins.print"):
            result = self.analytics.analyze_submissions()

            self.assertIsInstance(result, dict)
            self.assertEqual(result["total_submissions"], 2)
            self.assertIsInstance(result["dataframe"], pd.DataFrame)
            self.assertEqual(len(result["dataframe"]), 2)

            # Check that both submissions are included
            self.assertEqual(
                set(result["dataframe"]["submission_id"]), {"sub_001", "sub_002"}
            )


class TestUprootinyAnalyticsPerformance(unittest.TestCase):
    """Performance tests for UprootinyAnalytics"""

    def setUp(self):
        """Set up performance test fixtures"""
        self.analytics = UprootinyAnalytics()
        self.test_dir = tempfile.mkdtemp()
        self.test_path = Path(self.test_dir)
        self.analytics.base_path = self.test_path
        (self.test_path / "logs").mkdir(exist_ok=True)

    def tearDown(self):
        """Clean up performance test fixtures"""
        import shutil

        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_analytics_performance_many_files(self):
        """Test analytics performance with many log files"""
        import time
        import datetime

        # Create 100 log files
        logs_path = self.test_path / "logs"
        for i in range(100):
            log_data = {
                "submission_id": f"sub_{i:03d}",
                "model_name": "uprootiny",
                "round": 100 + i,
                "timestamp": (
                    datetime.datetime(2023, 1, 1) + datetime.timedelta(days=i)
                ).isoformat(),
                "file": f"test_{i}.csv",
            }

            log_file = logs_path / f"submission_log_{100 + i}.json"
            with open(log_file, "w") as f:
                json.dump(log_data, f)

        # Measure performance
        start_time = time.time()

        with patch("builtins.print"):
            result = self.analytics.analyze_submissions()

        end_time = time.time()

        # Should complete reasonably quickly (less than 5 seconds)
        self.assertLess(end_time - start_time, 5.0)
        self.assertIsInstance(result, dict)
        self.assertEqual(result["total_submissions"], 100)
        self.assertIsInstance(result["dataframe"], pd.DataFrame)
        self.assertEqual(len(result["dataframe"]), 100)


if __name__ == "__main__":
    # Configure test runner
    unittest.main(verbosity=2, buffer=True)
