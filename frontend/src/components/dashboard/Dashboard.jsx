import { useState } from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import ProductsList from './ProductsList';
import ComprehensiveProductForm from './ComprehensiveProductForm';
import { predictSustainability } from '../../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handlePredict = async (formData) => {
    setIsLoading(true);
    try {
      const result = await predictSustainability(formData);
      
      if (result && result[0]) {
        const newProduct = {
          id: Date.now(),
          name: formData.name_prod,
          description: formData.description_prod,
          total_score: Math.round(result[0].sustainability_score_percent || 0),
          predicted_labels: result[0].predicted_labels || [],
          labels: result[0].predicted_labels || [], // Keep both for compatibility
          certificates: result[0].predicted_labels || [], // Add certificates field for display
          timestamp: new Date().toLocaleString(),
          source: 'comprehensive_form' // Track which form was used
        };
        
        setProducts(prev => [newProduct, ...prev]);
        setActiveTab('products'); // Switch to products tab to see result
        
        // Enhanced success message with certificates
        const certificateNames = result[0].predicted_labels?.length > 0 
          ? result[0].predicted_labels.join(', ') 
          : 'None assigned';
        
        alert(`✅ Prediction completed!\n\nSustainability Score: ${newProduct.total_score}%\n\nSustainability Certificates: ${certificateNames}\n\nProduct added to recent products!`);
      }
    } catch (error) {
      console.error('Prediction error:', error);
      alert('❌ Prediction failed. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
      <Header />
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="fade-in" style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ gridColumn: 'span 2' }}>
              <StatsCards />
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="tab-container">
            <div className="tab-navigation">
              <button
                className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                📊 Products & Results
              </button>
              <button
                className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`}
                onClick={() => setActiveTab('assessment')}
              >
                🌱 Sustainability Assessment
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'products' && (
                <ProductsList products={products} />
              )}
              
              {activeTab === 'assessment' && (
                <ComprehensiveProductForm 
                  onPredict={handlePredict}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;