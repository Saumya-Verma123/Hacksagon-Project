from flask import Blueprint, jsonify, request
import traceback
from extensions.db import mongo
from datetime import datetime

from services.solution import (
    get_material_type,
    get_material_recyclability,
    get_material_fun_fact,
)

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/api/gemini-insights", methods=["POST"])
def get_gemini_insights():
    data = request.get_json()
    detected_objects = data.get("detected_objects")

    if not detected_objects:
        return jsonify({"error": "No detected objects provided"}), 400

    try:
        # Extract unique classes
        materials = list({obj['class'].strip().replace('-', ' ').upper() for obj in detected_objects})

        insights = []

        for material in materials:
            type_info = get_material_type(material)
            recyclability = get_material_recyclability(material)
            fun_fact = get_material_fun_fact(material)

            insights.append({
                "name": material,
                "type": type_info,
                "recyclability": recyclability,
                "funFact": fun_fact,
            })

        # Save insights with timestamp
        insights_doc = {
            "detected_objects": detected_objects,
            "insights": insights,
            "timestamp": datetime.utcnow()
        }

        result = mongo.db.insights.insert_one(insights_doc)
        stored_doc = mongo.db.insights.find_one({"_id": result.inserted_id})

        return jsonify({"insights": stored_doc["insights"]}), 200

    except Exception as e:
        print("Error in /api/gemini-insights route:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500