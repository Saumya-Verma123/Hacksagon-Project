from ultralytics import YOLO
from pathlib import Path
import os
import shutil


model = YOLO("model/best.pt")

def run_inference(image_path, output_dir="static/predictions", annotation_dir="static/annotations"):
    
    results = model.predict(source=image_path, save=True, save_txt=True, conf=0.3, device='cpu')
    
    result = results[0]  
    original_name = os.path.basename(image_path)

    
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(annotation_dir, exist_ok=True)

   
    pred_image_path = os.path.join(output_dir, original_name)
    shutil.move(str(Path(result.save_dir) / original_name), pred_image_path)

    
    pred_label_path = os.path.join(annotation_dir, original_name.replace('.jpg', '.txt'))
    label_file = Path(result.save_dir) / "labels" / original_name.replace('.jpg', '.txt')
    if label_file.exists():
        shutil.move(str(label_file), pred_label_path)
    else:
        pred_label_path = None

    
    detected_objects = []
    if result.boxes:
        for cls, conf in zip(result.boxes.cls, result.boxes.conf):
            detected_objects.append({
                "class": model.names[int(cls)],
                "confidence": float(conf)
        })
    else:
        detected_objects = []

    return {
        "original_image": image_path,
        "annotated_image": pred_image_path,
        "annotation_file": pred_label_path,
        "detected_objects": detected_objects
    }
