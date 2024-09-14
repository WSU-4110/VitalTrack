from flask import Blueprint

greeting_blueprint = Blueprint("greeting", __name__)


@greeting_blueprint.route("/greeting")
def Greeting():
    return "<p>VitalTrack</p>"
