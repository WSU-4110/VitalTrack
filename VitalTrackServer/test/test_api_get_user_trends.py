import unittest
from unittest.mock import patch, MagicMock
from flask import Flask
from dotenv import load_dotenv
import os
import sys

# Load environment variables
os.environ["MONGO_API_KEY"] = "test_api_key"
load_dotenv()

# Adjust the import path for the activity module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from activity.api_get_user_trends import get_trends_blueprint


class TestGetTrendsEndpoint(unittest.TestCase):
    def setUp(self):
        # Create a Flask app and register the blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(get_trends_blueprint)
        self.client = self.app.test_client()

@patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
@patch("activity.trend_analysis.TrendAnalyzer")
def test_get_trends_success(self, mock_trend_analyzer, mock_get_user_by_id):
    # Mock user data with valid entries
    mock_user = MagicMock()
    mock_user.entries = [
        MagicMock(
            date="2024-12-01",
            well_being="Good",
            sleep_quality="Moderate",
            mood="Great",
            stress="Low",
        ),
        MagicMock(
            date="2024-12-02",
            well_being="Moderate",
            sleep_quality="Poor",
            mood="Good",
            stress="High",
        ),
    ]
    mock_get_user_by_id.return_value = mock_user  # Mock successful user fetch

    # Mock TrendAnalyzer's behavior
    mock_analyzer_instance = mock_trend_analyzer.return_value
    mock_analyzer_instance.analyze_user_trends.return_value = {
        "trend_clusters": {0: 1, 1: 1},
        "moving_averages": {
            "date": ["2024-12-01", "2024-12-02"],
            "well_being": [3.0, 2.5],
            "sleep_quality": [2.0, 1.5],
            "mood": [4.0, 3.5],
            "stress": [1.0, 2.0],
        },
        "weekly_summary": {
            "date": ["2024-12-07"],
            "well_being": [2.75],
            "sleep_quality": [1.75],
            "mood": [3.75],
            "stress": [1.5],
        },
        "activity_mood_insight": "When you do yoga, your mood improves significantly with a Great average mood.",
    }

    # Call the endpoint
    response = self.client.get("/getTrends/mock_user_id")
    data = response.get_json()

    # Assertions
    self.assertEqual(response.status_code, 200)  # Verify status code
    self.assertTrue(data["success"])  # Verify success flag
    self.assertIn("trends", data)  # Ensure 'trends' is in response

    # Validate trends data
    expected_trends = {
        "trend_clusters": {0: 1, 1: 1},
        "moving_averages": {
            "date": ["2024-12-01", "2024-12-02"],
            "well_being": [3.0, 2.5],
            "sleep_quality": [2.0, 1.5],
            "mood": [4.0, 3.5],
            "stress": [1.0, 2.0],
        },
        "weekly_summary": {
            "date": ["2024-12-07"],
            "well_being": [2.75],
            "sleep_quality": [1.75],
            "mood": [3.75],
            "stress": [1.5],
        },
        "activity_mood_insight": "When you do yoga, your mood improves significantly with a Great average mood.",
    }
    self.assertEqual(data["trends"], expected_trends)  # Validate trends


    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_trends_no_entries(self, mock_get_user_by_id):
        # Mock user with no entries
        mock_user = MagicMock(entries=[])
        mock_get_user_by_id.return_value = mock_user

        # Call the endpoint
        response = self.client.get("/getTrends/mock_user_id")
        data = response.get_json()

        # Assertions
        self.assertEqual(response.status_code, 404)
        self.assertFalse(data["success"])
        self.assertEqual(data["error"], "User not found or no entries available")

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_trends_user_not_found(self, mock_get_user_by_id):
        # Mock no user found
        mock_get_user_by_id.return_value = None

        # Call the endpoint
        response = self.client.get("/getTrends/mock_user_id")
        data = response.get_json()

        # Assertions
        self.assertEqual(response.status_code, 404)
        self.assertFalse(data["success"])
        self.assertEqual(data["error"], "User not found or no entries available")

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_trends_exception_handling(self, mock_get_user_by_id):
        # Mock an exception during user fetching
        mock_get_user_by_id.side_effect = Exception("Mocked database error")

        # Call the endpoint
        response = self.client.get("/getTrends/mock_user_id")
        data = response.get_json()

        # Assertions
        self.assertEqual(response.status_code, 500)
        self.assertFalse(data["success"])
        self.assertEqual(data["error"], "Mocked database error")


if __name__ == "__main__":
    unittest.main()
