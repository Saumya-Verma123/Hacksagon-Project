from extensions.db import mongo
from bson import ObjectId

def get_history(user_id):
    images = mongo.db.images.find({"user_id": user_id})
    return [{
        "_id": str(image["_id"]),
        "original_image_url": image["original_image_url"],
        "processed_image_url": image["processed_image_url"],
        "timestamp": image["timestamp"]
    } for image in images]


def delete_image(user_id, image_id):
    mongo.db.images.delete_one({"_id": ObjectId(image_id), "user_id": user_id})


def delete_all_history(user_id):
    mongo.db.images.delete_many({"user_id": user_id})