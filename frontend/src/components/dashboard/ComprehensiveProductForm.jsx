import React, { useState } from 'react';
import './ComprehensiveProductForm.css';

const ComprehensiveProductForm = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState({
    // Required text fields for TF-IDF processing
    name_prod: '',
    description_prod: '',
    
    // 14 Real sustainability features (any number allowed)
    cred_credibility: 0.5,
    eco_chemicals: 0.5,
    eco_lifetime: 0.5,
    eco_water: 0.5,
    eco_inputs: 0.5,
    eco_quality: 0.5,
    eco_energy: 0.5,
    eco_waste_air: 0.5,
    eco_environmental_management: 0.5,
    social_labour_rights: 0.5,
    social_business_practice: 0.5,
    social_social_rights: 0.5,
    social_company_responsibility: 0.5,
    social_conflict_minerals: 0.5,
    
    // 24 engineered features (any number allowed)
    feature_1: 0,
    feature_2: 0,
    feature_3: 0,
    feature_4: 0,
    feature_5: 0,
    feature_6: 0,
    feature_7: 0,
    feature_8: 0,
    feature_9: 0,
    feature_10: 0,
    feature_11: 0,
    feature_12: 0,
    feature_13: 0,
    feature_14: 0,
    feature_15: 0,
    feature_16: 0,
    feature_17: 0,
    feature_18: 0,
    feature_19: 0,
    feature_20: 0,
    feature_21: 0,
    feature_22: 0,
    feature_23: 0,
    feature_24: 0,
  });

  // Core sustainability metrics with user-friendly labels
  const coreMetrics = [
    { key: 'cred_credibility', label: 'Credibility Score', desc: 'Overall trustworthiness and verification level' },
    { key: 'eco_chemicals', label: 'Chemical Safety', desc: 'Use of safe, non-toxic chemicals' },
    { key: 'eco_lifetime', label: 'Product Lifetime', desc: 'Durability and longevity of the product' },
    { key: 'eco_water', label: 'Water Efficiency', desc: 'Water conservation in production' },
    { key: 'eco_inputs', label: 'Sustainable Inputs', desc: 'Use of renewable/recycled materials' },
    { key: 'eco_quality', label: 'Environmental Quality', desc: 'Overall environmental standards' },
    { key: 'eco_energy', label: 'Energy Efficiency', desc: 'Renewable energy usage' },
    { key: 'eco_waste_air', label: 'Waste & Air Quality', desc: 'Waste reduction and air pollution control' },
    { key: 'eco_environmental_management', label: 'Environmental Management', desc: 'Environmental management systems' },
    { key: 'social_labour_rights', label: 'Labour Rights', desc: 'Fair labor practices and worker rights' },
    { key: 'social_business_practice', label: 'Business Ethics', desc: 'Ethical business practices' },
    { key: 'social_social_rights', label: 'Social Rights', desc: 'Community and social responsibility' },
    { key: 'social_company_responsibility', label: 'Corporate Responsibility', desc: 'Overall corporate social responsibility' },
    { key: 'social_conflict_minerals', label: 'Ethical Sourcing', desc: 'Conflict-free mineral sourcing' },
  ];

  // Advanced features for expert users
  const advancedFeatures = Array.from({ length: 24 }, (_, i) => ({
    key: `feature_${i + 1}`,
    label: `Advanced Feature ${i + 1}`,
    desc: `Custom engineered feature ${i + 1}`
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name_prod' || name === 'description_prod' ? value : (value === '' ? '' : parseFloat(value) || 0)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert all numeric values to proper numbers
    const processedData = { ...formData };
    [...coreMetrics, ...advancedFeatures].forEach(field => {
      processedData[field.key] = parseFloat(processedData[field.key]) || 0;
    });
    
    // Call the prediction function (Dashboard will handle adding to recent products)
    onPredict(processedData);
  };

  const resetForm = () => {
    setFormData({
      name_prod: '',
      description_prod: '',
      ...Object.fromEntries(coreMetrics.map(m => [m.key, 0.5])),
      ...Object.fromEntries(advancedFeatures.map(f => [f.key, 0])),
    });
  };

  const loadExample = () => {
    // Example data from test.json - this could be extended with more examples
    const exampleData = {
    name_prod: "Sample Product 1167628",
    description_prod: "",
    cred_credibility: 0.0,
    eco_chemicals: 23.99,
    eco_lifetime: 1024.0,
    eco_water: 2.0,
    eco_inputs: 0.0,
    eco_quality: 0.0,
    eco_energy: 0.3522562638954091,
    eco_waste_air: 0.0,
    eco_environmental_management: 0.0,
    social_labour_rights: 0.0,
    social_business_practice: 0.0,
    social_social_rights: 0.0,
    social_company_responsibility: 0.19744953359911066,
    social_conflict_minerals: 0.0,
    feature_1: 0.0,
    feature_2: 0.0,
    feature_3: 0.0,
    feature_4: 0.21169464245530029,
    feature_5: 0.0,
    feature_6: 0.0,
    feature_7: 0.0,
    feature_8: 0.0,
    feature_9: 0.0,
    feature_10: 0.0,
    feature_11: 0.0,
    feature_12: 0.0,
    feature_13: 0.0,
    feature_14: 0.0,
    feature_15: 0.0,
    feature_16: 0.28602796397335084,
    feature_17: 0.0,
    feature_18: 0.0,
    feature_19: 0.0,
    feature_20: 0.0,
    feature_21: 0.0,
    feature_22: 0.0,
    feature_23: 0.0,
    feature_24: 0.0
  }

    setFormData(exampleData);
  };

  return (
    <div className="comprehensive-form-container">
      <div className="form-header">
        <h2>🌱 Comprehensive Sustainability Assessment</h2>
        <p>Enter any numeric values for accurate sustainability prediction</p>
        <div className="form-actions">
          <button type="button" onClick={loadExample} className="example-btn">
            📝 Load Example
          </button>
          <button type="button" onClick={resetForm} className="reset-btn">
            🔄 Reset Form
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="comprehensive-form">
        {/* Basic Product Information */}
        <div className="form-section">
          <h3>📦 Product Information</h3>
          <div className="input-group">
            <label htmlFor="name_prod">Product Name *</label>
            <input
              type="text"
              id="name_prod"
              name="name_prod"
              value={formData.name_prod}
              onChange={handleInputChange}
              placeholder="e.g., Organic Cotton T-Shirt"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="description_prod">Product Description *</label>
            <textarea
              id="description_prod"
              name="description_prod"
              value={formData.description_prod}
              onChange={handleInputChange}
              placeholder="Detailed description including materials, certifications, manufacturing processes..."
              rows="4"
              required
            />
          </div>
        </div>

        {/* Core Sustainability Metrics */}
        <div className="form-section">
          <h3>🌍 Core Sustainability Metrics</h3>
          <p className="section-description">
            Enter any numeric values. Common ranges: 0.0-1.0 (percentages) or 0-10 (ratings)
          </p>
          <div className="metrics-grid">
            {coreMetrics.map(metric => (
              <div key={metric.key} className="metric-input">
                <label htmlFor={metric.key}>
                  {metric.label}
                  <span className="metric-description">{metric.desc}</span>
                </label>
                <input
                  type="number"
                  id={metric.key}
                  name={metric.key}
                  value={formData[metric.key]}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="Any number"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features - Collapsible */}
        <details className="form-section advanced-section">
          <summary>
            <h3>⚙️ Advanced Features (Optional)</h3>
            <p>Custom engineered features for expert users</p>
          </summary>
          <div className="advanced-grid">
            {advancedFeatures.map(feature => (
              <div key={feature.key} className="advanced-input">
                <label htmlFor={feature.key}>{feature.label}</label>
                <input
                  type="number"
                  id={feature.key}
                  name={feature.key}
                  value={formData[feature.key]}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </details>

        {/* Submit Button */}
        <div className="form-submit">
          <button
            type="submit"
            disabled={isLoading || !formData.name_prod || !formData.description_prod}
            className="predict-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Analyzing Sustainability...
              </>
            ) : (
              <>
                🔍 Predict Sustainability Score
              </>
            )}
          </button>
        </div>

        {/* Input Guidelines */}
        <div className="input-guidelines">
          <h4>💡 Input Guidelines</h4>
          <ul>
            <li><strong>Any Numbers Allowed:</strong> Enter values in any scale (0-1, 0-10, 0-100, etc.)</li>
            <li><strong>Decimal Values:</strong> Use decimals for precise measurements (e.g., 0.75, 8.5)</li>
            <li><strong>Negative Values:</strong> Allowed if representing deficits or negative impacts</li>
            <li><strong>Large Numbers:</strong> For absolute measurements (e.g., CO2 emissions in tons)</li>
            <li><strong>Zero Values:</strong> Use 0 for features not applicable to your product</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ComprehensiveProductForm;