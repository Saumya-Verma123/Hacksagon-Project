import base64
import uuid
import os
from flask import jsonify
from server.model.yolov8_model import run_inference
from extensions.db import mongo

def handle_image_upload(data):
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    image_data = data['image']

    try:
        header, encoded = image_data.split(",", 1)
        image_bytes = base64.b64decode(encoded)
    except Exception:
        return jsonify({'error': 'Invalid image data'}), 400

    image_id = str(uuid.uuid4())
    filename = f"{image_id}.jpg"
    save_path = os.path.join("static", "uploads", filename)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    with open(save_path, "wb") as f:
        f.write(image_bytes)

    result = run_inference(save_path)
    
    result_data = {
        "image_id": image_id,
        "original_image": result['original_image'],         # string path
        "annotated_image": result['annotated_image'],
        "annotation_file": result.get('annotation_file'),
        "detected_objects": result['detected_objects']
    }
    
    mongo.db.detections.insert_one(result_data)

    response = {
        "message": "Image processed successfully",
        "original_image": f"/{result['original_image']}",
        "annotated_image": f"/{result['annotated_image']}",
        "detected_objects": result['detected_objects'],
        "annotation_file": f"/{result['annotation_file']}" if result['annotation_file'] else None
    }




    return jsonify(response), 200
   