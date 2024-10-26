from flask import Blueprint, jsonify
from remotecalls.mongodb_facade import mongo_db_facade


get_medications_blueprint = Blueprint("get_medications", __name__)


@get_medications_blueprint.route("/getMedications/<user_id>", methods=["GET"])
def get_medications(user_id):
    
    user = mongo_db_facade.get_user_by_id(user_id)

    
    if not user:
        return jsonify({"error": "User not found"}), 404

    
    medications_data = user.medications  


    medications = [med.to_mongo().to_dict() for med in medications_data]

    
    return jsonify(medications), 200
