from flask import Blueprint
from controllers.image_controller import upload_image


image_bp = Blueprint("image", __name__)

image_bp.route("/upload", methods=["POST"])(upload_image)

