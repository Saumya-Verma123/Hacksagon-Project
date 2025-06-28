from flask import Flask
from flask_cors import CORS
# from extensions.db import mongo
# from extensions.oauth import oauth
# from routes.auth_routes import auth_bp
from routes.image_routes import image_bp
# from routes.history_routes import history_bp
# from routes.chatbot_routes import chatbot_bp
from extensions.db import mongo

from dotenv import load_dotenv
import os

# === Load .env ===
load_dotenv()

# === Initialize App ===
app = Flask(__name__)
CORS(app)

# === App Configuration ===
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

# === Initialize Extensions ===
mongo.init_app(app)
# oauth.init_app(app)

# === Register Blueprints ===
# app.register_blueprint(auth_bp)
app.register_blueprint(image_bp)
# app.register_blueprint(history_bp)
# app.register_blueprint(chatbot_bp)  # new addition
from routes.image_routes import image_bp
# app.register_blueprint(image_bp)

# === Home Route ===
@app.route("/")
def home():
    return "Recyclens backend is running!"


# === Run Server ===
if __name__ == "__main__":
    app.run(debug=True)
