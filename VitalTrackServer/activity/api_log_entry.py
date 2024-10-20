

from flask import Blueprint, jsonify, request
from remotecalls.mongodb_facade import mongo_db_facade
from model.entries_model import Entry

log_entry_blueprint = Blueprint("logEntry", __name__)

@log_entry_blueprint.route("/logEntry", methods=["POST"])
def log_entry():
    print("log_entry route was hit")  # Check if this gets printed

    try:

        data = request.get_json()
        user_id = data.get("user_id")
        entry_data = data.get("entry")
        print("Data received:", data)  # Print the full request data

        if not entry_data:
            return jsonify({"success": False, "error": "Entry is required"}), 400

        entry = Entry(
            date=entry_data.get("date"),
            well_being=entry_data.get("well_being"),
            sleep_quality=entry_data.get("sleep_quality"),
            mood=entry_data.get("mood"),
            stress = entry_data.get("stress"),
            activity=entry_data.get("activity",[]),
            symptoms=entry_data.get("symptoms", [])
            
        )
        print(entry)

        user = mongo_db_facade.get_user_by_id(user_id)
        print("USER ID: ",user.user_id)
        print("USER: ",user.email)
        if user is None:
            return jsonify({"success": False, "error": "User not found"}), 404

     
        user.entries.append(entry)

      # Try validating and saving the user
        try:
            user.validate()  # Ensure all fields are valid before saving
            mongo_db_facade.save(user)
            print("User saved successfully.")
        except ValidationError as ve:
            print(f"Validation error: {ve}")
            return jsonify({"success": False, "error": f"Validation error: {ve}"}), 500

        return jsonify({"success": True, "message": "Entry logged successfully"}), 200
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500
