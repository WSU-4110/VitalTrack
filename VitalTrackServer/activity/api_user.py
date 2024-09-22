from flask import Blueprint
from remotecalls.mongodb_facade import mongo_db_facade

user_blueprint = Blueprint("user", __name__)


@user_blueprint.route("/user/<user_id>")
def get_user_information(user_id):
    user = mongo_db_facade.get_user_by_id(user_id)
    return user.to_json() if user else "User not found"
    
