from flask import Flask
from activity.api_greeting import greeting_blueprint

app = Flask(__name__)
app.register_blueprint(greeting_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
