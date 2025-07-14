import numpy as np
import joblib
import os

# 📂 Adjust these paths if needed
ARTIFACT_DIR1 = r"D:\Code\eco-sustainability-platform\sustainability_platform\models"
ARTIFACT_DIR = "model_artifacts"
BINARIZER_PATH = os.path.join(ARTIFACT_DIR1, "label_binarizer.pkl")
TOP39_IDX_PATH = os.path.join(ARTIFACT_DIR, "top_39_indices.npy")
OUTPUT_PATH = os.path.join(ARTIFACT_DIR, "top_39_label_names.npy")

# 📦 Load binarizer and indices
label_binarizer = joblib.load(BINARIZER_PATH)        # contains .classes_ (full label list)
top_39_indices = np.load(TOP39_IDX_PATH)             # shape (39,), indices of top labels

# 🏷️ Extract names
full_label_names = label_binarizer.classes_          # array of shape (n_classes,)
top_39_label_names = full_label_names[top_39_indices]  # shape (39,)

# 💾 Save
np.save(OUTPUT_PATH, top_39_label_names)

print("✅ Saved:", OUTPUT_PATH)
print("🔢 Top 39 label names:\n", top_39_label_names)
