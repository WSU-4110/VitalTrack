from flask import Blueprint, jsonify
from remotecalls.mongodb_facade import mongo_db_facade
from activity.trend_analysis import TrendAnalyzer

get_trends_blueprint = Blueprint("getTrends", __name__)

def entry_to_dict(entry):
    """
    Convert a database entry object to a dictionary.
    """
    date = entry.date if isinstance(entry.date, str) else entry.date.isoformat()
    return {
        "date": date,
        "well_being": entry.well_being,
        "sleep_quality": entry.sleep_quality,
        "mood": entry.mood,
        "stress": entry.stress,  # Add stress if used in trend analysis
    }

@get_trends_blueprint.route("/getTrends/<user_id>")
def get_trends(user_id):
    """
    Fetch and analyze user trends based on their entries.
    """
    print(f"Received request to fetch trends for user ID: {user_id}")  # Log incoming request

    try:
        # Fetch user from the database
        user = mongo_db_facade.get_user_by_id(user_id)
        print(f"Fetched user: {user}")  # Log user data

        if user and 'entries' in user:
            # Ensure entries exist
            if not user.entries:
                print(f"No entries found for user ID: {user_id}")  # Log empty entries
                return jsonify({"success": False, "error": "No entries available for analysis"}), 404

            # Convert entries to dictionaries
            entries_dict = [entry_to_dict(entry) for entry in user.entries]
            print(f"Entries prepared for trend analysis: {entries_dict}")  # Log prepared entries

            # Perform trend analysis
            analyzer = TrendAnalyzer()
            trends = analyzer.analyze_user_trends(entries_dict)
            print(f"Trend analysis results: {trends}")  # Log analysis results

            # Return the analysis results
            return jsonify({"success": True, "trends": trends}), 200
        else:
            print(f"User not found or no entries for user ID: {user_id}")  # Log missing user or entries
            return jsonify({"success": False, "error": "User not found or no entries available"}), 404
    except Exception as e:
        print(f"Error during trend analysis for user ID {user_id}: {e}")  # Log errors
        return jsonify({"success": False, "error": str(e)}), 500
