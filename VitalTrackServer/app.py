from flask import Flask
from activity.api_greeting import greeting_blueprint
from activity.api_user import user_blueprint
from activity.api_get_tips import tips_blueprint
from remotecalls.mongodb_facade import mongo_db_facade
from model.user_model import User

app = Flask(__name__)
app.register_blueprint(greeting_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(tips_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
