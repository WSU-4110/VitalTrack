from flask import Flask
from activity.api_greeting import greeting_blueprint
from activity.api_get_tips import tips_blueprint
from activity.api_create_user import create_user_blueprint
from activity.api_get_user_entries import get_entries_blueprint
from activity.api_log_entry import log_entry_blueprint
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import User
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(greeting_blueprint)
app.register_blueprint(create_user_blueprint)
app.register_blueprint(tips_blueprint)
app.register_blueprint(get_entries_blueprint)
app.register_blueprint(log_entry_blueprint)

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)