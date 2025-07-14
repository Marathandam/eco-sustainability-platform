import numpy as np
import tensorflow as tf
import joblib
import os
from .preprocess import preprocess_input

# ── Load model and artifacts ─────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACT_DIR = os.path.join(BASE_DIR, "model_artifacts")
MODEL_PATH = os.path.join(ARTIFACT_DIR, "model_top39_final.h5")
THRESHOLDS_PATH = os.path.join(ARTIFACT_DIR, "optimal_thresholds_top39.npy")
LABEL_NAMES_PATH = os.path.join(ARTIFACT_DIR, "top_39_label_names.npy")

# Load model and supporting files
model = tf.keras.models.load_model(MODEL_PATH)
thresholds = np.load(THRESHOLDS_PATH)
label_names = np.load(LABEL_NAMES_PATH, allow_pickle=True).tolist()

# ── Prediction function ─────────────────────────────────────────────
def predict_sustainability(products):
    """
    products: list of product dicts, each containing:
      - 'name_prod', 'description_prod', and 14 numeric features
    Returns: list of dicts with human-readable outputs
    """
    try:
        inputs = [preprocess_input(prod) for prod in products]
        X = np.vstack(inputs)  # Shape: (batch_size, 204)
    except Exception as e:
        return {"error": f"Preprocessing failed: {str(e)}"}

    # Predict
    probs = model.predict(X)
    preds = (probs > thresholds).astype(int)

    results = []
    for prob, pred in zip(probs, preds):
        tags = [label_names[i] for i, v in enumerate(pred) if v == 1]
        n_tags = int(pred.sum())
        # Improved scoring: at least 10% for 1 tag, up to 100% for all tags
        if n_tags == 0:
            score = 0.0
        else:
            score = round(10 + (n_tags - 1) / (len(pred) - 1) * 90, 2)
        result = {
            "sustainability_score_percent": float(score),
            "predicted_labels": tags,
            "raw_probabilities": [round(float(p), 4) for p in prob.tolist()]
        }
        results.append(result)

    return results