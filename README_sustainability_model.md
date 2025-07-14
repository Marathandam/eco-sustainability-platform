
# 🌱 Sustainability Score Prediction Model

This model predicts the **sustainability score** of fashion or retail products based on structured product metadata and sustainability labels using a deep learning multi-label classification approach.

---

## 🧠 Model Overview

- **Type**: Multi-label classification
- **Architecture**: Feedforward Neural Network with Dense + BatchNorm + Dropout + Residual Blocks
- **Input**: 38 engineered numeric features (e.g. eco/social scores)
- **Output**: Binary labels across top 39 sustainability tags
- **Scoring**: Sustainability score = (number of tags predicted as 1) / 39 × 100%

---

## 📦 Input Data Requirements

The model expects a feature vector for each product. The user **does not** need to provide raw text — only numerical features are passed into the model backend.

### Required Feature Vector (per product)

| Feature | Type | Description |
|--------|------|-------------|
| `cred_credibility` | float | Label credibility score |
| `eco_chemicals` | float | Use of non-toxic chemicals |
| `eco_lifetime` | float | Product longevity |
| `eco_water` | float | Water usage efficiency |
| `eco_inputs` | float | Sustainable material inputs |
| `eco_quality` | float | Product quality index |
| `eco_energy` | float | Energy efficiency |
| `eco_waste_air` | float | Waste & air emissions |
| `eco_environmental_management` | float | Internal sustainability practices |
| `social_labour_rights` | float | Ethical labor practices |
| `social_business_practice` | float | Transparency & ethics |
| `social_social_rights` | float | Gender, race, and human rights policies |
| `social_company_responsibility` | float | Corporate social responsibility |
| `social_conflict_minerals` | float | Policy on conflict minerals |
| *(and 24 other engineered or normalized numeric fields)* | | |

> 🔍 These values are already preprocessed from your cleaned product dataset.

---

## 🧾 Example Input (JSON format)

```
{
  "cred_credibility": 0.8,
  "eco_chemicals": 0.7,
  "eco_lifetime": 0.9,
  "eco_water": 0.65,
  "eco_inputs": 0.8,
  "eco_quality": 0.9,
  "eco_energy": 0.6,
  "eco_waste_air": 0.7,
  "eco_environmental_management": 0.85,
  "social_labour_rights": 0.95,
  "social_business_practice": 0.9,
  "social_social_rights": 0.88,
  "social_company_responsibility": 0.92,
  "social_conflict_minerals": 0.91
  // ... include all 38 features
}
```

---

## 🧪 Model Output

```
{
  "predicted_labels": ["eco_quality", "eco_inputs", "social_labour_rights"],
  "sustainability_score_percent": 7.69,
  "raw_probabilities": [0.002, 0.765, ..., 0.043]
}
```

- **`predicted_labels`**: Tags that passed the threshold (label is 1)
- **`sustainability_score_percent`**: Percentage of top 39 labels predicted as true
- **`raw_probabilities`**: Raw sigmoid output from the model before thresholding

---

## 🛰️ API Integration (for Backend Engineers)

### 🔗 Endpoint: `/predict-score`

- **Method**: `POST`
- **Input**: JSON containing one or more product feature vectors
- **Output**: JSON list of predictions (one per product)

#### Example:

**Request:**
```
POST /predict-score
Content-Type: application/json

[
  {
    "cred_credibility": 0.85,
    "eco_chemicals": 0.7,
    "eco_lifetime": 0.9,
    ...
  },
  {
    "cred_credibility": 0.7,
    "eco_chemicals": 0.6,
    ...
  }
]
```

**Response:**
```
[
  {
    "sustainability_score_percent": 10.26,
    "predicted_labels": ["eco_lifetime", "eco_quality", "social_company_responsibility"]
  },
  {
    "sustainability_score_percent": 5.13,
    "predicted_labels": ["eco_inputs", "eco_chemicals"]
  }
]
```

---

## 🧱 Model Files & Artifacts

- `model_top39_final.h5`: Trained Keras model file
- `top_39_indices.npy`: Indices of top 39 labels used for training
- `optimal_thresholds.npy`: Array of optimal thresholds per label (from validation set)
- `X_sample.npy`: The full feature array used for model input (optional for testing)

---

## 🔧 Environment & Dependencies

```
tensorflow>=2.10
numpy
scikit-learn
```

---

## 🛠️ Development Notes

- Trained on 100k+ fashion products with sustainability metadata
- Uses `sigmoid` output for multi-label prediction
- Optimal thresholds for each label were computed using `precision_recall_curve` on the validation set

---

## 📈 Sustainability Score Logic

Sustainability Score =  
`(number of predicted tags > threshold) / 39 * 100`

This gives a **percentage-based score** based on how many of the **top 39 sustainability tags** the product satisfies.
