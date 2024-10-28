from flask import Blueprint, jsonify, request
from datetime import datetime
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import Medication

log_medication_blueprint = Blueprint("log_medication", __name__)

@log_medication_blueprint.route("/logMedication/<user_id>", methods=["POST"])
def log_medication(user_id):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.entries is None:
        user.entries = []

    data = request.get_json()
    name = data.get("name", "Default Medication")
    dosage = data.get("dosage", "Default Dosage")
    frequency =data.get("frequency")

    medication = Medication(
        name=name,
        dosage=dosage,
        frequency = frequency
    )
    user.medications.append(medication)
    mongo_db_facade.save(user)
    
    return jsonify({"message": "Medication logged successfully!"}), 201
