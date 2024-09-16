from flask import Flask
from activity.api_greeting import greeting_blueprint
from remotecalls.mongodb_facade import MongoDbFacade

app = Flask(__name__)
app.register_blueprint(greeting_blueprint)

MongoDbFacade().ping() # Will remove once we start actually using mongo (tesing purposes)

if __name__ == "__main__":
    app.run(debug=True)
