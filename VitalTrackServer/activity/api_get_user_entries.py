from flask import Blueprint, jsonify
from remotecalls.mongodb_facade import mongo_db_facade
import datetime


get_entries_blueprint = Blueprint("getEntries", __name__)

def entry_to_dict(entry):
    
    date = entry.date if isinstance(entry.date, str) else entry.date.isoformat()
    return {
        "date": date,
        "well_being": entry.well_being,
        "sleep_quality": entry.sleep_quality,
        "mood": entry.mood,
        "activity": entry.activity,
        "symptoms": entry.symptoms
    }

@get_entries_blueprint.route("/getEntries/<user_id>")
def get_entries(user_id):
    try:
        user = mongo_db_facade.get_user_by_id(user_id)
        if user and 'entries' in user:
            entries_dict = [entry_to_dict(entry) for entry in user.entries]
            return jsonify({"success": True, "entries": entries_dict}), 200
        else:
            return jsonify({"success": False, "error": "User not found or no entries available"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
