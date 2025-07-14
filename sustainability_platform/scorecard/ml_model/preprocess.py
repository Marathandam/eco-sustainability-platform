import numpy as np
import joblib           # use joblib for large sklearn objects
import os
import pandas as pd

# ── Load TF-IDF vectorizers ────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VEC_DIR  = os.path.join(BASE_DIR, "..", "..", "models")

tfidf_name = joblib.load(os.path.join(VEC_DIR, "tfidf_name.pkl"))   # 100-dim
tfidf_desc = joblib.load(os.path.join(VEC_DIR, "tfidf_desc.pkl"))   # 100-dim (will slice)

# ── Numeric feature list (38 total) ────────────────────────────
NUMERIC_FEATURES = [
    "cred_credibility", "eco_chemicals", "eco_lifetime", "eco_water",
    "eco_inputs", "eco_quality", "eco_energy", "eco_waste_air",
    "eco_environmental_management", "social_labour_rights",
    "social_business_practice", "social_social_rights",
    "social_company_responsibility", "social_conflict_minerals",
] + [f"feature_{i}" for i in range(1, 25)]  # engineered placeholders

# ── Preprocess single product dict → (1, 204) numpy array ─────
def preprocess_input(product_dict: dict) -> np.ndarray:
    """
    Parameters
    ----------
    product_dict : dict
        Must contain:
          - 'name_prod' (str)
          - 'description_prod' (str)
          - 38 numeric keys listed in NUMERIC_FEATURES
    Returns
    -------
    np.ndarray  shape (1, 204)
    """
    # Wrap in DataFrame for convenience
    df = pd.DataFrame([product_dict])

    # Ensure all numeric cols exist, fill missing with 0.0
    for col in NUMERIC_FEATURES:
        if col not in df:
            df[col] = 0.0

    # TF-IDF vectors
    name_vec = tfidf_name.transform(df["name_prod"].fillna("")).toarray()       # (1, 100)
    desc_vec = tfidf_desc.transform(df["description_prod"].fillna("")).toarray()[:, :66]  # (1, 66)

    # Numeric block
    numeric_vec = df[NUMERIC_FEATURES].astype(float).values                     # (1, 38)

    # Concatenate → (1, 204)
    final_input = np.hstack([name_vec, desc_vec, numeric_vec]).astype("float32")
    return final_input
