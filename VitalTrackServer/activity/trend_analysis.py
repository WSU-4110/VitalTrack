import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from datetime import datetime, timedelta

class TrendAnalyzer:
    activity = ""
  
    def __init__(self, n_clusters=3):
        """
        Initialize the clustering model and define parameters for analysis.
        """
        self.model = KMeans(n_clusters=n_clusters, random_state=42)

    def prepare_data(self, entries):
        """
        Transforms user entries into a DataFrame for analysis.
        """
        categorical_mappings = {
            "Poor": 1,
            "Moderate": 2,
            "Good": 3,
            "Great": 4,
            "Low": 1,
            "High": 3,
        }

        data = {
            "date": [entry["date"] for entry in entries],
            "well_being": [categorical_mappings.get(entry["well_being"], 0) for entry in entries],
            "sleep_quality": [categorical_mappings.get(entry["sleep_quality"], 0) for entry in entries],
            "mood": [categorical_mappings.get(entry["mood"], 0) for entry in entries],
            "stress": [categorical_mappings.get(entry["stress"], 0) for entry in entries],
            "activity": [entry.get("activity", ["Unknown"]) for entry in entries],
        }

        df = pd.DataFrame(data)

        # Convert the date column to datetime
        df["date"] = pd.to_datetime(df["date"], errors="coerce")

        print("DataFrame after preparation:")
        print(df)

        return df

    def detect_clusters(self, df):
        """
        Categorizes entries into clusters based on trends.
        """
        features = df[["well_being", "sleep_quality", "mood", "stress"]].fillna(0)  # Handle NaN values
        labels = self.model.fit_predict(features)

        # Calculate the proportion of each trend type
        unique, counts = np.unique(labels, return_counts=True)
        
        # Cast numpy types to Python types
        return {int(label): int(count) for label, count in zip(unique, counts)}

    def calculate_moving_averages(self, df, window=7):
        """
        Calculates the moving averages for well-being, sleep_quality, mood, and stress.
        """
        if 'date' not in df.columns:
            raise ValueError("The 'date' column is missing from the DataFrame.")

        df = df.set_index("date")
        moving_averages = (
            df[["well_being", "sleep_quality", "mood", "stress"]]
            .rolling(window=window, min_periods=1)
            .mean()
        )
        moving_averages.reset_index(inplace=True)  # Reset index to bring 'date' back as a column
        return moving_averages

    def activity_mood_correlation(self, df):
        """
        Identifies activities that positively correlate with mood.
        Handles 'activity' as an array and flattens the data.
        """
        if 'activity' not in df.columns or 'mood' not in df.columns:
            return "No activity or mood data available."

        # Flatten the activities column
        df = df.explode('activity')

        # Filter out 'Unknown' activities
        df = df[df['activity'] != "Unknown"]

        # Check if activity column has valid entries
        if df.empty or df['activity'].isnull().all():
            return "No valid activity data available."

        # Group by activity and calculate the mean mood for each activity
        activity_mood = df.groupby('activity')['mood'].mean().sort_values(ascending=False)

        # Define categorical mapping for mood
        mood_mapping = {
            (0, 1): "Very Bad",
            (1, 2): "Bad",
            (2, 3): "Okay",
            (3, 4): "Good",
            (4, 5): "Great",
        }

        def get_categorical_mood(value):
            for (lower, upper), label in mood_mapping.items():
                if lower <= value < upper:
                    return label
            return "Unknown"

        # Find the activity with the highest positive effect
        if not activity_mood.empty:
            best_activity = activity_mood.idxmax()
            self.activity = best_activity
            best_mood = activity_mood.max()
            best_mood_label = get_categorical_mood(best_mood)
            return f"When you do {best_activity}, your mood improves significantly with a {best_mood_label} average mood."
        return "No significant correlation found."


    def weekly_summary(self, df):
        """
        Generates weekly summaries for each metric.
        """
        if 'date' not in df.columns:
            raise ValueError("The 'date' column is missing from the DataFrame.")

        df.set_index("date", inplace=True)
        # Exclude non-numeric columns
        numeric_columns = df.select_dtypes(include=['number']).columns
        weekly_summary = df[numeric_columns].resample('W').mean()
        weekly_summary.reset_index(inplace=True)
        weekly_summary["date"] = weekly_summary["date"].dt.strftime('%Y-%m-%d')  # Format date as string
        return weekly_summary

    def analyze_user_trends(self, entries):
        """
        Analyze trends in user entries:
        - Detect clusters
        - Calculate moving averages
        - Generate weekly summaries
        - Provide activity-mood correlation insights
        """
        df = self.prepare_data(entries)

        trend_clusters = self.detect_clusters(df)
        moving_averages = self.calculate_moving_averages(df)
        weekly_summary = self.weekly_summary(df)
        activity_mood_insight = self.activity_mood_correlation(df)

        trend_analysis = {
            "trend_clusters": trend_clusters,
            "moving_averages": moving_averages.to_dict(orient="list"),
            "weekly_summary": weekly_summary.to_dict(orient="list"),
            "activity_mood_insight": activity_mood_insight,
        }
        print(f"Trend analysis results: {trend_analysis}")
        return trend_analysis
