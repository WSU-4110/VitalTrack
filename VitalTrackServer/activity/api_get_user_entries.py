from flask import Blueprint, jsonify
from remotecalls.mongodb_facade import mongo_db_facade

get_entries_blueprint = Blueprint("getEntries", __name__)

@get_entries_blueprint.route("/getEntries/<user_id>")
def get_entries(user_id):
    try:
        user = mongo_db_facade.get_user_by_id(user_id)
        if user and 'entries' in user:
            return jsonify({"success": True, "entries": user['entries']}), 200
        else:
            return jsonify({"success": False, "error": "User not found or no entries available"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
