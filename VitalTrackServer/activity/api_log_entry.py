from flask import Blueprint, jsonify, request
from remotecalls.mongodb_facade import mongo_db_facade
from model.entries_model import Entry

log_entry_blueprint = Blueprint("logEntry", __name__)

@log_entry_blueprint.route("/logEntry", methods=["POST"])
def log_entry():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        entry_data = data.get("entry")

        if not entry_data:
            return jsonify({"success": False, "error": "Entry is required"}), 400

        entry = Entry(
            date=entry_data.get("date"),
            well_being=entry_data.get("well_being"),
            sleep_quality=entry_data.get("sleep_quality"),
            mood=entry_data.get("mood"),
            activity=entry_data.get("activity"),
            symptoms=entry_data.get("symptoms", [])
        )

        user = mongo_db_facade.get_user_by_id(user_id)
        if user is None:
            return jsonify({"success": False, "error": "User not found"}), 404

        user.entries.append(entry)
        mongo_db_facade.save(user)

        return jsonify({"success": True, "message": "Entry logged successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
