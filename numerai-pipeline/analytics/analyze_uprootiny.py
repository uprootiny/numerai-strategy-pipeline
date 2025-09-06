#!/usr/bin/env python3
"""
Analytics for uprootiny model
Following AI playbook patterns
"""

import pandas as pd
import json
from pathlib import Path
import matplotlib.pyplot as plt


class UprootinyAnalytics:
    def __init__(self):
        self.base_path = Path(__file__).parent.parent
        self.model_name = "uprootiny"

    def analyze_submissions(self):
        """Analyze submission history"""
        submissions = []
        logs_path = self.base_path / "logs"

        for log_file in logs_path.glob("submission_log_*.json"):
            try:
                with open(log_file) as f:
                    submissions.append(json.load(f))
            except (json.JSONDecodeError, FileNotFoundError, ValueError) as e:
                print(f"⚠️ Skipping corrupted file {log_file}: {e}")
                continue

        if not submissions:
            print("📊 No submissions found")
            return {
                "total_submissions": 0,
                "performance_metrics": {},
                "message": "No submissions found",
            }

        df = pd.DataFrame(submissions)
        print(f"📊 Total submissions: {len(df)}")

        # Check if timestamp column exists before accessing it
        if "timestamp" in df.columns and not df["timestamp"].isna().all():
            print(f"📅 Date range: {df['timestamp'].min()} to {df['timestamp'].max()}")
        else:
            print("📅 Date range: No timestamp data available")

        # Calculate performance metrics
        performance_metrics = {}
        if "score" in df.columns:
            scores = df["score"].dropna()
            if len(scores) > 0:
                performance_metrics = {
                    "average_score": float(scores.mean()),
                    "best_score": float(scores.max()),
                    "worst_score": float(scores.min()),
                    "std_score": float(scores.std()) if len(scores) > 1 else 0.0,
                }

        return {
            "total_submissions": len(df),
            "performance_metrics": performance_metrics,
            "dataframe": df,
            "date_range": {
                "min": (
                    df["timestamp"].min()
                    if "timestamp" in df.columns and not df["timestamp"].isna().all()
                    else None
                ),
                "max": (
                    df["timestamp"].max()
                    if "timestamp" in df.columns and not df["timestamp"].isna().all()
                    else None
                ),
            },
        }

    def run_analysis(self):
        """Run full analysis suite"""
        print(f"🔍 Running analysis for {self.model_name.upper()}")
        self.analyze_submissions()


def main():
    """Main entry point for uprootiny analytics"""
    analytics = UprootinyAnalytics()
    analytics.run_analysis()
    return analytics


if __name__ == "__main__":
    main()
