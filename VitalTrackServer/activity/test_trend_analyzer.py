import unittest
from unittest.mock import patch
import pandas as pd
from datetime import datetime
from trend_analysis import TrendAnalyzer

class TestTrendAnalyzer(unittest.TestCase):
    def setUp(self):
        """
        Create a TrendAnalyzer instance and mock user entries for tests.
        """
        self.analyzer = TrendAnalyzer()
        self.mock_entries = [
            {"date": "2024-11-18", "well_being": "Good", "sleep_quality": "Moderate", "mood": "Good", "stress": "Low", "activity": ["gym", "reading"]},
            {"date": "2024-11-19", "well_being": "Moderate", "sleep_quality": "Poor", "mood": "Poor", "stress": "High", "activity": ["work", "walking"]},
            {"date": "2024-11-20", "well_being": "Great", "sleep_quality": "Good", "mood": "Great", "stress": "Low", "activity": ["gym", "yoga"]},
        ]

    def test_prepare_data(self):

        df = self.analyzer.prepare_data(self.mock_entries)
        self.assertEqual(len(df), 3)
        self.assertTrue(all(column in df.columns for column in ["date", "well_being", "sleep_quality", "mood", "stress", "activity"]))
        self.assertEqual(df["well_being"].iloc[0], 3)  # Categorical mapping for "Good"

    def test_detect_clusters(self):

        df = self.analyzer.prepare_data(self.mock_entries)
        clusters = self.analyzer.detect_clusters(df)
        self.assertIsInstance(clusters, dict)
        self.assertTrue(all(isinstance(key, int) for key in clusters.keys()))
        self.assertTrue(all(isinstance(value, int) for value in clusters.values()))

    def test_calculate_moving_averages(self):

        df = self.analyzer.prepare_data(self.mock_entries)
        moving_averages = self.analyzer.calculate_moving_averages(df)
        self.assertTrue("well_being" in moving_averages.columns)
        self.assertTrue("sleep_quality" in moving_averages.columns)
        self.assertTrue("mood" in moving_averages.columns)
        self.assertTrue("stress" in moving_averages.columns)

    def test_activity_mood_correlation(self):

        df = self.analyzer.prepare_data(self.mock_entries)
        insight = self.analyzer.activity_mood_correlation(df)
        self.assertIsInstance(insight, str)
        self.assertIn("mood improves significantly", insight)

    def test_weekly_summary(self):

        df = self.analyzer.prepare_data(self.mock_entries)
        weekly_summary = self.analyzer.weekly_summary(df)
        self.assertIsInstance(weekly_summary, pd.DataFrame)
        self.assertTrue("well_being" in weekly_summary.columns)
        self.assertTrue("sleep_quality" in weekly_summary.columns)

    def test_analyze_user_trends(self):

        trends = self.analyzer.analyze_user_trends(self.mock_entries)
        self.assertIsInstance(trends, dict)
        self.assertIn("trend_clusters", trends)
        self.assertIn("moving_averages", trends)
        self.assertIn("weekly_summary", trends)
        self.assertIn("activity_mood_insight", trends)

if __name__ == "__main__":
    unittest.main()
