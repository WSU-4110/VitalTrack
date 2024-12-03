from flask import Blueprint, jsonify, request
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import Medication

log_medication_blueprint = Blueprint("log_medication", __name__)

@log_medication_blueprint.route("/getMedications/<user_id>", methods=["GET"])
def get_medications(user_id):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    medications = [{"name": med.name, "dosage": med.dosage, "frequency": med.frequency} for med in user.medications]
    return jsonify(medications), 200

@log_medication_blueprint.route("/logMedication/<user_id>", methods=["POST"])
def log_medication(user_id):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    medication = Medication(
        name=data.get("name", "Default Medication"),
        dosage=data.get("dosage", "Default Dosage"),
        frequency=data.get("frequency", "Default Frequency")
    )
    user.medications.append(medication)
    mongo_db_facade.save(user)

    return jsonify({"message": "Medication logged successfully!"}), 201

@log_medication_blueprint.route("/updateMedication/<user_id>/<int:medication_index>", methods=["PUT"])
def update_medication(user_id, medication_index):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if medication_index < 0 or medication_index >= len(user.medications):
        return jsonify({"error": "Medication not found"}), 404

    data = request.get_json()
    user.medications[medication_index].name = data.get("name")
    user.medications[medication_index].dosage = data.get("dosage")
    user.medications[medication_index].frequency = data.get("frequency")
    mongo_db_facade.save(user)

    return jsonify({"message": "Medication updated successfully!"}), 200

@log_medication_blueprint.route("/deleteMedication/<user_id>/<int:medication_index>", methods=["DELETE"])
def delete_medication(user_id, medication_index):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if medication_index < 0 or medication_index >= len(user.medications):
        return jsonify({"error": "Medication not found"}), 404

    del user.medications[medication_index]
    mongo_db_facade.save(user)

    return jsonify({"message": "Medication deleted successfully!"}), 200

@log_medication_blueprint.route("/getMedication/<user_id>/<int:medication_index>", methods=["GET"])
def get_medication_by_index(user_id, medication_index):
    user = mongo_db_facade.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if medication_index < 0 or medication_index >= len(user.medications):
        return jsonify({"error": "Medication not found"}), 404

    medication = user.medications[medication_index]
    return jsonify({
        "name": medication.name,
        "dosage": medication.dosage,
        "frequency": medication.frequency
    }), 200
