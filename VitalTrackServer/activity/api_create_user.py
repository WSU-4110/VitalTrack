from flask import Blueprint, request, jsonify
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import User

create_user_blueprint = Blueprint("createUser", __name__)

@create_user_blueprint.route("/createUser", methods=["POST"])
def create_user():
    data = request.get_json()

    email = data.get("email")
    name = data.get("name", "")
    age = data.get("age", 20)
    entries = data.get("entries", [])
    medications = data.get("medications", [])

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User(uid=uid,name=name, email=email, age=age, entries=entries, medications=medications)
    mongo_db_facade.save(user)

    return jsonify({"message": "User created successfully"}), 201
