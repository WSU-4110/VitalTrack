from flask import Blueprint
from remotecalls.mongodb_facade import mongo_db_facade
from remotecalls.openai_facade import OpenAIFacade

tips_blueprint = Blueprint("tips", __name__)


@tips_blueprint.route("/tips/<user_id>")
def get_tips(user_id):
    user = mongo_db_facade.get_user_by_id(user_id)
    user_json = user.to_json() if user else "No User Found"
    response = OpenAIFacade().get_gpt4_response(user_json)

    return response
