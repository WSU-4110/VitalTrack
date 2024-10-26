from flask import Blueprint, jsonify, request
from datetime import datetime
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import Medication


log_medication_blueprint = Blueprint("log_medication", __name__)

@log_medication_blueprint.route("/logMedication", methods=["POST"])
def log_medication():
    
    data = request.get_json()
    
    user_id = data.get("user_id")
    name = data.get("name")
    dosage = data.get("dosage")
    time_logged = datetime.utcnow()

    if not user_id or not name or not dosage:
        return jsonify({"error": "User ID, Name, and Dosage are required"}), 400

    user = mongo_db_facade.get_user_by_id(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    medication = Medication(
        name=name,
        dosage=dosage,
        time_logged=time_logged
    )
    user.medications.append(medication)
    mongo_db_facade.save(user)
    return jsonify({"message": "Medication logged successfully!"}), 201
