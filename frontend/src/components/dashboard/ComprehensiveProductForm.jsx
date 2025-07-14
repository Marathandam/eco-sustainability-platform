import React, { useState } from 'react';
import './ComprehensiveProductForm.css';

const ComprehensiveProductForm = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState({
    // Required text fields for TF-IDF processing
    name_prod: '',
    description_prod: '',
    
    // 14 Real sustainability features (0-10 scale typically)
    cred_credibility: 5,
    eco_chemicals: 5,
    eco_lifetime: 5,
    eco_water: 5,
    eco_inputs: 5,
    eco_quality: 5,
    eco_energy: 5,
    eco_waste_air: 5,
    eco_environmental_management: 5,
    social_labour_rights: 5,
    social_business_practice: 5,
    social_social_rights: 5,
    social_company_responsibility: 5,
    social_conflict_minerals: 5,
    
    // 24 Engineered features (placeholders - can be 0 or calculated values)
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

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Feature descriptions for user guidance
  const featureDescriptions = {
    cred_credibility: "Overall credibility of sustainability claims (0-10)",
    eco_chemicals: "Chemical safety and eco-friendliness (0-10)",
    eco_lifetime: "Product durability and lifespan (0-10)",
    eco_water: "Water consumption efficiency (0-10)",
    eco_inputs: "Sustainable raw material usage (0-10)",
    eco_quality: "Environmental quality standards (0-10)",
    eco_energy: "Energy efficiency in production/use (0-10)",
    eco_waste_air: "Waste and air pollution management (0-10)",
    eco_environmental_management: "Environmental management systems (0-10)",
    social_labour_rights: "Fair labor practices (0-10)",
    social_business_practice: "Ethical business practices (0-10)",
    social_social_rights: "Social responsibility and rights (0-10)",
    social_company_responsibility: "Corporate social responsibility (0-10)",
    social_conflict_minerals: "Conflict-free mineral sourcing (0-10)"
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name_prod.trim()) {
      alert('Product name is required');
      return;
    }
    if (!formData.description_prod.trim()) {
      alert('Product description is required');
      return;
    }

    // Call prediction with exact backend format
    onPredict(formData);
  };

  const resetForm = () => {
    setFormData({
      name_prod: '',
      description_prod: '',
      cred_credibility: 5,
      eco_chemicals: 5,
      eco_lifetime: 5,
      eco_water: 5,
      eco_inputs: 5,
      eco_quality: 5,
      eco_energy: 5,
      eco_waste_air: 5,
      eco_environmental_management: 5,
      social_labour_rights: 5,
      social_business_practice: 5,
      social_social_rights: 5,
      social_company_responsibility: 5,
      social_conflict_minerals: 5,
      feature_1: 0, feature_2: 0, feature_3: 0, feature_4: 0, feature_5: 0,
      feature_6: 0, feature_7: 0, feature_8: 0, feature_9: 0, feature_10: 0,
      feature_11: 0, feature_12: 0, feature_13: 0, feature_14: 0, feature_15: 0,
      feature_16: 0, feature_17: 0, feature_18: 0, feature_19: 0, feature_20: 0,
      feature_21: 0, feature_22: 0, feature_23: 0, feature_24: 0,
    });
  };

  return (
    <div className="comprehensive-form-container">
      <div className="form-header">
        <h2>🌱 Sustainability Assessment Form</h2>
        <p>Enter product details for AI-powered sustainability analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="comprehensive-form">
        
        {/* Basic Product Information */}
        <div className="form-section">
          <h3>📦 Product Information</h3>
          
          <div className="form-group">
            <label htmlFor="name_prod">Product Name *</label>
            <input
              type="text"
              id="name_prod"
              value={formData.name_prod}
              onChange={(e) => handleInputChange('name_prod', e.target.value)}
              placeholder="e.g., Organic Cotton T-Shirt"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description_prod">Product Description *</label>
            <textarea
              id="description_prod"
              value={formData.description_prod}
              onChange={(e) => handleInputChange('description_prod', e.target.value)}
              placeholder="Detailed description including materials, manufacturing process, certifications..."
              rows={4}
              required
            />
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="form-section">
          <h3>🌍 Sustainability Metrics (Rate 0-10)</h3>
          <p className="section-note">Rate each aspect based on available information. Default value is 5 (neutral).</p>
          
          <div className="metrics-grid">
            {Object.entries(featureDescriptions).map(([field, description]) => (
              <div key={field} className="metric-group">
                <label htmlFor={field}>
                  {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                <div className="metric-input">
                  <input
                    type="range"
                    id={field}
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, parseFloat(e.target.value))}
                  />
                  <span className="metric-value">{formData[field]}</span>
                </div>
                <small className="metric-description">{description}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="form-section">
          <div className="advanced-toggle">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="toggle-btn"
            >
              {showAdvanced ? '🔼' : '🔽'} Advanced Features (Optional)
            </button>
          </div>

          {showAdvanced && (
            <div className="advanced-features">
              <p className="section-note">
                These are engineered features for advanced users. Default values are typically sufficient.
              </p>
              <div className="features-grid">
                {Array.from({length: 24}, (_, i) => i + 1).map(num => (
                  <div key={`feature_${num}`} className="feature-group">
                    <label htmlFor={`feature_${num}`}>Feature {num}</label>
                    <input
                      type="number"
                      id={`feature_${num}`}
                      value={formData[`feature_${num}`]}
                      onChange={(e) => handleInputChange(`feature_${num}`, parseFloat(e.target.value) || 0)}
                      step="0.01"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary"
            disabled={isLoading}
          >
            🔄 Reset Form
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? '🔄 Analyzing...' : '🚀 Predict Sustainability'}
          </button>
        </div>
      </form>

      {/* Input Guidelines */}
      <div className="input-guidelines">
        <h4>📋 Input Guidelines</h4>
        <ul>
          <li><strong>Product Name:</strong> Clear, descriptive name (used for text analysis)</li>
          <li><strong>Description:</strong> Detailed information about materials, process, certifications</li>
          <li><strong>Sustainability Metrics:</strong> Rate 0-10 where 0=very poor, 5=average, 10=excellent</li>
          <li><strong>Advanced Features:</strong> Leave as 0 unless you have specific calculated values</li>
          <li><strong>Text Quality:</strong> More detailed descriptions lead to better predictions</li>
        </ul>
      </div>
    </div>
  );
};

export default ComprehensiveProductForm;
