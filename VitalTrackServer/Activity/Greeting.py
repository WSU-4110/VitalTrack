from flask import Flask

app = Flask(__name__)


@app.route("/")
def Greeting():
    return "<p>VitalTrack</p>"
