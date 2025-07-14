import { useState, useEffect } from 'react';
import api from '../../services/api';
import ProductInputForm from './ProductInputForm';

const ProductsList = ({ products: externalProducts = [] }) => {
  const [localProducts, setLocalProducts] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [expandedLabels, setExpandedLabels] = useState(null);

  // Combine external products with local products
  const allProducts = [...externalProducts, ...localProducts];

  // Close expanded views when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setExpandedDescription(null);
      setExpandedLabels(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePredict = async (formData) => {
    setPredicting(true);
    setPredictionResult(null);

    try {
      const response = await api.post('/scorecard/predict-score/', formData);
      setPredictionResult(response.data);
      
      // Add the new product to the recent products list
      if (Array.isArray(response.data) && response.data.length > 0) {
        const newProduct = {
          id: Date.now(), // Simple ID generation
          name: formData.name_prod,
          description: formData.description_prod,
          total_score: Math.round(response.data[0].sustainability_score_percent),
          predicted_labels: response.data[0].predicted_labels || [],
          timestamp: new Date().toISOString()
        };
        
        // Add to the beginning of the local products list
        setLocalProducts(prevProducts => [newProduct, ...prevProducts]);
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionResult({ error: 'Failed to get prediction. ' + (error.response?.data?.error || error.message) });
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Sustainability Prediction Form */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gray-100)' }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600',
            color: 'var(--gray-900)',
            margin: 0
          }}>
            Product Sustainability Analyzer
          </h3>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-600)',
            marginTop: '0.25rem'
          }}>
            Enter detailed product information to get an AI-powered sustainability assessment
          </p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <ProductInputForm onSubmit={handlePredict} loading={predicting} />
          
          {predictionResult && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: predictionResult.error ? 'var(--red-50)' : 'var(--green-50)', 
              borderRadius: '8px',
              border: `1px solid ${predictionResult.error ? 'var(--red-200)' : 'var(--green-200)'}`
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: predictionResult.error ? 'var(--red-700)' : 'var(--green-700)' }}>
                {predictionResult.error ? 'Error' : 'Sustainability Analysis Result'}
              </h4>
              
              {predictionResult.error ? (
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--red-600)',
                  margin: 0
                }}>
                  {predictionResult.error}
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Array.isArray(predictionResult) && predictionResult.length > 0 && (
                    <>
                      <div style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600',
                        color: 'var(--green-700)'
                      }}>
                        Sustainability Score: {predictionResult[0].sustainability_score_percent}%
                      </div>
                      
                      {predictionResult[0].predicted_labels && predictionResult[0].predicted_labels.length > 0 && (
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--green-700)' }}>
                            Predicted Sustainability Labels:
                          </h5>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {predictionResult[0].predicted_labels.map((label, index) => (
                              <span key={index} style={{
                                background: 'var(--green-100)',
                                color: 'var(--green-800)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <details style={{ fontSize: '0.875rem' }}>
                        <summary style={{ cursor: 'pointer', color: 'var(--green-700)', fontWeight: '500' }}>
                          Show Raw Data
                        </summary>
                        <pre style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--green-600)',
                          whiteSpace: 'pre-wrap',
                          margin: '0.5rem 0 0 0',
                          background: 'white',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          overflow: 'auto'
                        }}>
                          {JSON.stringify(predictionResult, null, 2)}
                        </pre>
                      </details>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="table-container">
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gray-100)' }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600',
          color: 'var(--gray-900)',
          margin: 0
        }}>
          Recent Products
        </h3>
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--gray-600)',
          marginTop: '0.25rem'
        }}>
          Track sustainability metrics for analyzed products
        </p>
      </div>
      
      <div style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Score</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ 
                  textAlign: 'center', 
                  padding: '2rem', 
                  color: 'var(--gray-500)',
                  fontStyle: 'italic' 
                }}>
                  No products analyzed yet. Use the form above to predict sustainability scores.
                </td>
              </tr>
            ) : (
              allProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--blue-50)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem'
                      }}>
                        🧪
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'var(--gray-900)' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                          AI Predicted
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <div 
                        style={{ 
                          color: 'var(--gray-600)',
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.875rem',
                          cursor: product.description && product.description.length > 50 ? 'pointer' : 'default'
                        }}
                        title={product.description} // Tooltip on hover
                        onClick={() => {
                          if (product.description && product.description.length > 50) {
                            setExpandedDescription(expandedDescription === product.id ? null : product.id);
                          }
                        }}
                      >
                        {product.description || 'No description provided'}
                        {product.description && product.description.length > 50 && (
                          <span style={{ 
                            marginLeft: '0.5rem', 
                            color: 'var(--blue-500)',
                            fontSize: '0.75rem'
                          }}>
                            {expandedDescription === product.id ? '▼' : '▶'}
                          </span>
                        )}
                      </div>
                      
                      {expandedDescription === product.id && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: 'white',
                          border: '1px solid var(--gray-200)',
                          borderRadius: '4px',
                          padding: '0.75rem',
                          boxShadow: 'var(--shadow-lg)',
                          zIndex: 10,
                          fontSize: '0.875rem',
                          color: 'var(--gray-700)',
                          whiteSpace: 'normal',
                          maxWidth: '400px'
                        }}>
                          {product.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      product.total_score >= 80 
                        ? 'badge-green' 
                        : product.total_score >= 60 
                        ? 'badge-yellow' 
                        : 'badge-red'
                    }`}>
                      {product.total_score}%
                    </span>
                  </td>
                  <td>
                    {product.predicted_labels && product.predicted_labels.length > 0 ? (
                      <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '250px' }}>
                          {product.predicted_labels.slice(0, 3).map((label, index) => (
                            <span 
                              key={index} 
                              style={{
                                background: 'var(--green-100)',
                                color: 'var(--green-800)',
                                padding: '0.1rem 0.3rem',
                                borderRadius: '3px',
                                fontSize: '0.65rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                              title={label} // Tooltip showing full label
                            >
                              {label.length > 15 ? label.substring(0, 15) + '...' : label}
                            </span>
                          ))}
                          {product.predicted_labels.length > 3 && (
                            <span 
                              style={{
                                color: 'var(--blue-500)',
                                fontSize: '0.65rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                              onClick={() => {
                                setExpandedLabels(expandedLabels === product.id ? null : product.id);
                              }}
                            >
                              +{product.predicted_labels.length - 3} more {expandedLabels === product.id ? '▼' : '▶'}
                            </span>
                          )}
                        </div>
                        
                        {expandedLabels === product.id && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '4px',
                            padding: '0.75rem',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 10,
                            minWidth: '300px',
                            maxWidth: '400px'
                          }}>
                            <div style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: '600', 
                              marginBottom: '0.5rem',
                              color: 'var(--gray-700)'
                            }}>
                              All Sustainability Labels:
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                              {product.predicted_labels.map((label, index) => (
                                <span 
                                  key={index} 
                                  style={{
                                    background: 'var(--green-100)',
                                    color: 'var(--green-800)',
                                    padding: '0.2rem 0.4rem',
                                    borderRadius: '3px',
                                    fontSize: '0.7rem',
                                    fontWeight: '500'
                                  }}
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>
                        No labels
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ProductsList;