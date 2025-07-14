import React, { useState } from "react";

// List of the 14 real numeric features
const NUMERIC_FIELDS = [
  { key: "cred_credibility", label: "Credibility Score (0–1)" },
  { key: "eco_chemicals", label: "Chemical Safety Score (0–1)" },
  { key: "eco_lifetime", label: "Lifetime Score (0–1)" },
  { key: "eco_water", label: "Water Efficiency (0–1)" },
  { key: "eco_inputs", label: "Eco Inputs Score (0–1)" },
  { key: "eco_quality", label: "Quality Score (0–1)" },
  { key: "eco_energy", label: "Energy Efficiency (0–1)" },
  { key: "eco_waste_air", label: "Air Waste Score (0–1)" },
  { key: "eco_environmental_management", label: "Environmental Management (0–1)" },
  { key: "social_labour_rights", label: "Labour Rights Score (0–1)" },
  { key: "social_business_practice", label: "Business Practice (0–1)" },
  { key: "social_social_rights", label: "Social Rights Score (0–1)" },
  { key: "social_company_responsibility", label: "Company Responsibility (0–1)" },
  { key: "social_conflict_minerals", label: "Conflict Minerals (0–1)" },
];

export default function ProductInputForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name_prod: "",
    description_prod: "",
    ...Object.fromEntries(NUMERIC_FIELDS.map(f => [f.key, "0.5"])), // Default 0.5
  });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert numeric fields to float before submit
    const payload = { ...form };
    NUMERIC_FIELDS.forEach(f => payload[f.key] = parseFloat(payload[f.key]));
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'grid', 
      gap: '1rem', 
      padding: '1.5rem', 
      background: 'white', 
      borderRadius: '12px', 
      boxShadow: 'var(--shadow-lg)' 
    }}>
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: 'var(--gray-700)'
        }}>
          Product Name
        </label>
        <input
          style={{
            width: '100%',
            border: '1px solid var(--gray-300)',
            padding: '0.75rem',
            borderRadius: '6px',
            fontSize: '0.875rem'
          }}
          type="text"
          name="name_prod"
          value={form.name_prod}
          onChange={handleChange}
          required
          placeholder="e.g. Eco Cotton T-shirt"
        />
      </div>
      
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: 'var(--gray-700)'
        }}>
          Product Description
        </label>
        <textarea
          style={{
            width: '100%',
            border: '1px solid var(--gray-300)',
            padding: '0.75rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            minHeight: '80px',
            resize: 'vertical'
          }}
          name="description_prod"
          value={form.description_prod}
          onChange={handleChange}
          required
          placeholder="Describe your product, materials, certifications, etc."
        />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1rem' 
      }}>
        {NUMERIC_FIELDS.map(f => (
          <div key={f.key}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: '500', 
              marginBottom: '0.25rem',
              color: 'var(--gray-600)'
            }}>
              {f.label}
            </label>
            <input
              style={{
                width: '100%',
                border: '1px solid var(--gray-300)',
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}
              type="number"
              name={f.key}
              min="0"
              max="1"
              step="0.01"
              value={form[f.key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
      </div>
      
      <button
        type="submit"
        style={{
          width: '100%',
          background: loading ? 'var(--gray-400)' : 'var(--primary-600)',
          color: 'white',
          fontWeight: '600',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict Sustainability"}
      </button>
    </form>
  );
}
