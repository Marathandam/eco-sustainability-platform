import { useState, useEffect } from 'react';
import api from '../../services/api';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Mock data for now - replace with actual API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Organic Apples',
          packaging_material: 'Recycled cardboard',
          origin_country: 'Germany',
          total_score: 85,
          transport_mode: 'truck'
        },
        {
          id: 2,
          name: 'Fair Trade Coffee',
          packaging_material: 'Biodegradable',
          origin_country: 'Colombia',
          total_score: 92,
          transport_mode: 'ship'
        },
        {
          id: 3,
          name: 'Eco-friendly Detergent',
          packaging_material: 'Recycled plastic',
          origin_country: 'Netherlands',
          total_score: 78,
          transport_mode: 'truck'
        },
        {
          id: 4,
          name: 'Bamboo Toothbrush',
          packaging_material: 'Compostable box',
          origin_country: 'China',
          total_score: 95,
          transport_mode: 'ship'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ 
            height: '1rem', 
            background: 'var(--gray-200)', 
            borderRadius: '4px', 
            width: '25%', 
            marginBottom: '1rem' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              height: '1rem', 
              background: 'var(--gray-200)', 
              borderRadius: '4px' 
            }}></div>
            <div style={{ 
              height: '1rem', 
              background: 'var(--gray-200)', 
              borderRadius: '4px',
              width: '83%'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
          Track sustainability metrics for your product inventory
        </p>
      </div>
      
      <div style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Origin</th>
              <th>Packaging</th>
              <th>Transport</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-50)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem'
                    }}>
                      {product.name.includes('Apple') ? '🍎' : 
                       product.name.includes('Coffee') ? '☕' : 
                       product.name.includes('Detergent') ? '🧽' : '🪥'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: 'var(--gray-900)' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🌍</span>
                    <span>{product.origin_country}</span>
                  </div>
                </td>
                <td>
                  <div style={{ color: 'var(--gray-600)' }}>
                    {product.packaging_material}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{product.transport_mode === 'truck' ? '🚛' : '🚢'}</span>
                    <span style={{ textTransform: 'capitalize' }}>{product.transport_mode}</span>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;