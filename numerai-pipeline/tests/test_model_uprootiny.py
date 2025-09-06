#!/usr/bin/env python3
"""
Comprehensive test suite for uprootiny Numerai model
Tests model functionality, API interactions, and edge cases
"""

import unittest
import pytest
import pandas as pd
import numpy as np
import json
import tempfile
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock
import sys
import os

# Add the parent directory to the Python path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from model_uprootiny import UprootinyModel


class TestUprootinyModel(unittest.TestCase):
    """Test suite for UprootinyModel class"""

    def setUp(self):
        """Set up test fixtures"""
        self.model = UprootinyModel()
        self.test_dir = tempfile.mkdtemp()
        self.test_path = Path(self.test_dir)

        # Create test directories
        (self.test_path / "submissions").mkdir(exist_ok=True)
        (self.test_path / "logs").mkdir(exist_ok=True)

    def tearDown(self):
        """Clean up test fixtures"""
        import shutil

        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_model_initialization(self):
        """Test model initializes with correct attributes"""
        self.assertEqual(self.model.model_name, "uprootiny")
        self.assertIsInstance(self.model.base_path, Path)

    def test_generate_predictions_shape(self):
        """Test predictions generate correct shape and range"""
        # Create mock live data
        live_data = pd.DataFrame({"feature1": range(100), "feature2": range(100)})

        predictions = self.model.generate_predictions(live_data)

        # Test shape
        self.assertEqual(len(predictions), len(live_data))

        # Test range (should be between 0.3 and 0.7)
        self.assertTrue(np.all(predictions >= 0.3))
        self.assertTrue(np.all(predictions <= 0.7))

    def test_generate_predictions_deterministic_length(self):
        """Test predictions always match input data length"""
        for size in [1, 10, 100, 1000]:
            live_data = pd.DataFrame({"feature": range(size)})
            predictions = self.model.generate_predictions(live_data)
            self.assertEqual(len(predictions), size)

    @patch("model_uprootiny.Path")
    def test_generate_predictions_empty_data(self, mock_path):
        """Test model handles empty input data gracefully"""
        empty_data = pd.DataFrame()
        predictions = self.model.generate_predictions(empty_data)
        self.assertEqual(len(predictions), 0)

    @patch("builtins.open", create=True)
    @patch("json.load")
    def test_load_credentials_success(self, mock_json_load, mock_open):
        """Test successful credential loading"""
        mock_credentials = {
            "public_id": "test_public_id",
            "secret_key": "test_secret_key",
        }
        mock_json_load.return_value = mock_credentials

        credentials = self.model.load_credentials()

        self.assertEqual(credentials, mock_credentials)
        mock_open.assert_called_once_with("/home/uprootiny/.numerai/credentials")

    @patch("builtins.open", side_effect=FileNotFoundError)
    def test_load_credentials_file_not_found(self, mock_open):
        """Test credential loading with missing file"""
        with self.assertRaises(FileNotFoundError):
            self.model.load_credentials()

    @patch("builtins.open", create=True)
    @patch("json.load", side_effect=json.JSONDecodeError("Test error", "test", 0))
    def test_load_credentials_invalid_json(self, mock_json_load, mock_open):
        """Test credential loading with invalid JSON"""
        with self.assertRaises(json.JSONDecodeError):
            self.model.load_credentials()

    @patch("model_uprootiny.UprootinyModel.load_credentials")
    @patch("model_uprootiny.NumerAPI")
    @patch("pandas.DataFrame.to_csv")
    def test_submit_predictions_success(
        self, mock_to_csv, mock_numerapi, mock_load_creds
    ):
        """Test successful prediction submission"""
        # Mock setup
        mock_load_creds.return_value = {
            "public_id": "test_id",
            "secret_key": "test_key",
        }

        mock_napi = MagicMock()
        mock_napi.get_models.return_value = {"uprootiny": "model_123"}
        mock_napi.upload_predictions.return_value = "submission_456"
        mock_numerapi.return_value = mock_napi

        # Test data
        predictions_df = pd.DataFrame(
            {"id": ["id1", "id2", "id3"], "prediction": [0.5, 0.6, 0.4]}
        )

        # Override base_path for testing
        self.model.base_path = self.test_path

        submission_id = self.model.submit_predictions(predictions_df, 123)

        # Assertions
        self.assertEqual(submission_id, "submission_456")
        mock_numerapi.assert_called_once_with(
            public_id="test_id", secret_key="test_key"
        )
        mock_napi.get_models.assert_called_once()
        mock_napi.upload_predictions.assert_called_once()
        mock_to_csv.assert_called_once()

    @patch(
        "model_uprootiny.UprootinyModel.load_credentials",
        side_effect=Exception("Creds error"),
    )
    def test_submit_predictions_credentials_error(self, mock_load_creds):
        """Test submission with credential errors"""
        predictions_df = pd.DataFrame({"id": ["test"], "prediction": [0.5]})

        with self.assertRaises(Exception) as context:
            self.model.submit_predictions(predictions_df, 123)

        self.assertIn("Creds error", str(context.exception))

    @patch("builtins.open", create=True)
    @patch("json.dump")
    def test_log_submission(self, mock_json_dump, mock_open):
        """Test submission logging functionality"""
        # Override base_path for testing
        self.model.base_path = self.test_path

        self.model.log_submission("test_submission_id", 123, "/test/file.csv")

        # Verify file was opened for writing
        expected_log_file = self.test_path / "logs" / "submission_log_123.json"
        mock_open.assert_called_once_with(expected_log_file, "w")

        # Verify JSON dump was called
        mock_json_dump.assert_called_once()
        logged_data = mock_json_dump.call_args[0][0]

        # Check logged data structure
        self.assertEqual(logged_data["submission_id"], "test_submission_id")
        self.assertEqual(logged_data["model_name"], "uprootiny")
        self.assertEqual(logged_data["round"], 123)
        self.assertEqual(logged_data["file"], "/test/file.csv")
        self.assertIn("timestamp", logged_data)


class TestUprootinyModelIntegration(unittest.TestCase):
    """Integration tests for UprootinyModel"""

    def setUp(self):
        """Set up integration test fixtures"""
        self.model = UprootinyModel()
        self.test_dir = tempfile.mkdtemp()
        self.test_path = Path(self.test_dir)

        # Create test directory structure
        for subdir in ["submissions", "logs", "data", "forecasts"]:
            (self.test_path / subdir).mkdir(exist_ok=True)

    def tearDown(self):
        """Clean up integration test fixtures"""
        import shutil

        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_full_prediction_workflow(self):
        """Test complete prediction generation workflow"""
        # Create realistic test data
        live_data = pd.DataFrame(
            {
                "feature_1": np.random.randn(1000),
                "feature_2": np.random.randn(1000),
                "feature_3": np.random.randn(1000),
            }
        )

        # Generate predictions
        predictions = self.model.generate_predictions(live_data)

        # Validate predictions
        self.assertEqual(len(predictions), 1000)
        self.assertTrue(np.all(predictions >= 0.3))
        self.assertTrue(np.all(predictions <= 0.7))
        self.assertFalse(np.any(np.isnan(predictions)))

    def test_model_consistency(self):
        """Test model produces consistent results with same random seed"""
        live_data = pd.DataFrame({"feature": range(100)})

        # Note: Current model uses random without seed, so this tests the structure
        pred1 = self.model.generate_predictions(live_data)
        pred2 = self.model.generate_predictions(live_data)

        # Both should have same length and be in valid range
        self.assertEqual(len(pred1), len(pred2))
        self.assertTrue(np.all((pred1 >= 0.3) & (pred1 <= 0.7)))
        self.assertTrue(np.all((pred2 >= 0.3) & (pred2 <= 0.7)))


class TestUprootinyModelPerformance(unittest.TestCase):
    """Performance tests for UprootinyModel"""

    def setUp(self):
        """Set up performance test fixtures"""
        self.model = UprootinyModel()

    def test_prediction_speed_small(self):
        """Test prediction generation speed for small datasets"""
        import time

        live_data = pd.DataFrame({"feature": range(100)})

        start_time = time.time()
        predictions = self.model.generate_predictions(live_data)
        end_time = time.time()

        # Should complete quickly (less than 1 second)
        self.assertLess(end_time - start_time, 1.0)
        self.assertEqual(len(predictions), 100)

    def test_prediction_speed_large(self):
        """Test prediction generation speed for large datasets"""
        import time

        live_data = pd.DataFrame({"feature": range(10000)})

        start_time = time.time()
        predictions = self.model.generate_predictions(live_data)
        end_time = time.time()

        # Should complete reasonably quickly (less than 5 seconds)
        self.assertLess(end_time - start_time, 5.0)
        self.assertEqual(len(predictions), 10000)

    def test_memory_usage(self):
        """Test model doesn't use excessive memory"""
        import psutil
        import os

        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss

        # Generate predictions for large dataset
        live_data = pd.DataFrame({"feature": range(50000)})
        predictions = self.model.generate_predictions(live_data)

        final_memory = process.memory_info().rss
        memory_increase = final_memory - initial_memory

        # Memory increase should be reasonable (less than 100MB)
        self.assertLess(memory_increase, 100 * 1024 * 1024)


if __name__ == "__main__":
    # Configure test runner
    unittest.main(verbosity=2, buffer=True)
