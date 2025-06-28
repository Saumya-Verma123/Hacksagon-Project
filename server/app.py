from flask import Flask
from flask_cors import CORS
from routes.image_routes import image_bp
from extensions.db import mongo
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

mongo.init_app(app)
app.register_blueprint(image_bp)

from routes.image_routes import image_bp

@app.route("/")
def home():
    return "Recyclens backend is running!"



if __name__ == "__main__":
    app.run(debug=True)
