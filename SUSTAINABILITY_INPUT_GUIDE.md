# 🌱 Sustainability Assessment Input Guide

## Backend Analysis Summary

After analyzing the complete backend logic, here's exactly what the ML model needs:

### 📊 Complete Input Structure (204 features total)

The model processes inputs in this order:
1. **Product Name** → TF-IDF Vectorization → 100 features
2. **Product Description** → TF-IDF Vectorization → 66 features  
3. **38 Numeric Features** → Direct input

### 🔍 Exact Backend Processing Flow

1. **Text Processing** (`preprocess.py`):
   - `name_prod` → TF-IDF vectorizer → 100-dimensional vector
   - `description_prod` → TF-IDF vectorizer → 66-dimensional vector
   - Both use pre-trained vectorizers from `sustainability_platform/models/`

2. **Numeric Features** (38 total):
   - **14 Real Sustainability Metrics** (the important ones)
   - **24 Engineered Features** (typically set to 0)

3. **Final Concatenation**:
   ```python
   final_input = np.hstack([name_vec, desc_vec, numeric_vec]).astype("float32")
   # Shape: (1, 204) = (1, 100+66+38)
   ```

## 📝 How to Fill Out the Form

### 🏷️ Product Information (CRITICAL)
- **Product Name**: Clear, descriptive name
  - ✅ Good: "Organic Cotton Fair Trade T-Shirt"
  - ❌ Bad: "Shirt" or "Product123"
  
- **Product Description**: Detailed information for better predictions
  - ✅ Good: "100% organic cotton t-shirt made from GOTS-certified materials. Manufactured in a solar-powered facility with zero-waste production. Fair trade certified ensuring living wages for workers. Dyed with natural plant-based dyes. Biodegradable packaging."
  - ❌ Bad: "A shirt" or "Cotton clothing"

### 🌍 Sustainability Metrics (14 Core Features)

Rate each on a 0-10 scale where:
- **0-2**: Very poor sustainability
- **3-4**: Below average  
- **5**: Average/neutral
- **6-7**: Above average
- **8-10**: Excellent sustainability

#### Environmental Metrics:
- **Eco Chemicals** (0-10): Chemical safety, toxicity levels
- **Eco Lifetime** (0-10): Product durability, expected lifespan
- **Eco Water** (0-10): Water usage efficiency in production
- **Eco Inputs** (0-10): Sustainable raw materials usage
- **Eco Quality** (0-10): Environmental quality standards compliance
- **Eco Energy** (0-10): Energy efficiency in production/use
- **Eco Waste Air** (0-10): Waste management and air pollution control
- **Eco Environmental Management** (0-10): Environmental management systems

#### Social Metrics:
- **Social Labour Rights** (0-10): Fair labor practices, worker safety
- **Social Business Practice** (0-10): Ethical business operations
- **Social Social Rights** (0-10): Community impact, social responsibility
- **Social Company Responsibility** (0-10): Corporate social responsibility
- **Social Conflict Minerals** (0-10): Conflict-free sourcing

#### Credibility:
- **Cred Credibility** (0-10): Overall credibility of sustainability claims

### ⚙️ Advanced Features (24 Engineered Features)
- **Default**: Leave all as 0 unless you have specific calculated values
- **Purpose**: These are model-engineered features for advanced users
- **Impact**: Usually minimal compared to text and core metrics

## 🎯 Input Examples

### Example 1: Sustainable Product
```
Product Name: "Patagonia Recycled Wool Sweater"
Description: "Made from 100% recycled wool. Carbon-neutral manufacturing. Lifetime repair guarantee. Fair Trade Certified factory. Packaged in compostable materials."

Sustainability Metrics:
- Eco Chemicals: 8.5 (natural materials, safe dyes)
- Eco Lifetime: 9.0 (lifetime guarantee)
- Eco Water: 7.5 (efficient wool processing)
- Eco Energy: 8.0 (renewable energy factory)
- Social Labour Rights: 9.0 (Fair Trade certified)
- Cred Credibility: 9.5 (Patagonia's reputation)
```

### Example 2: Average Product
```
Product Name: "Standard Cotton Jeans"
Description: "Regular cotton denim jeans. Standard manufacturing process. Basic quality materials."

Sustainability Metrics:
- All metrics: 5.0 (average/neutral)
```

### Example 3: Poor Sustainability
```
Product Name: "Fast Fashion Synthetic Dress"
Description: "Polyester blend dress. Mass produced in conventional factory. Single-use quality."

Sustainability Metrics:
- Eco Chemicals: 2.0 (synthetic materials)
- Eco Lifetime: 1.5 (poor quality)
- Social Labour Rights: 2.0 (potential labor issues)
- All others: 2-3 range
```

## 🚀 Expected Output

The model returns:
- **Sustainability Score**: 0-100% (based on number of positive labels)
- **Predicted Labels**: List of sustainability categories the product qualifies for
- **Raw Probabilities**: Confidence scores for each label

### Sample Labels the Model Can Predict:
- Organic Materials
- Fair Trade
- Carbon Neutral
- Renewable Energy
- Recyclable
- Biodegradable
- Water Efficient
- Energy Efficient
- Worker Safety
- Community Impact
- etc. (39 total labels)

## 💡 Tips for Best Results

1. **Rich Descriptions**: More detailed descriptions = better predictions
2. **Honest Ratings**: Rate based on actual product characteristics
3. **Specific Names**: Include brand, material, certifications in name
4. **Context Matters**: Mention certifications, standards, processes
5. **Consistency**: Align text description with numeric ratings

## 🔧 Technical Notes

- Model expects exactly this input format
- Text fields are processed through pre-trained TF-IDF vectorizers
- Missing or incorrect format will cause prediction errors
- Advanced features can remain 0 for most use cases
