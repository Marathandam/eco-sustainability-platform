import { useState, useEffect } from 'react';
import api from '../../services/api';

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    avgScore: 0,
    topCountry: 'N/A'
  });
  useEffect(() => {
    // Simulate loading with animation
    const timer = setTimeout(() => {
      setStats({
        totalProducts: 156,
        avgScore: 78,
        topCountry: 'Germany'
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      color: 'var(--primary-500)',
      bgColor: 'var(--primary-50)',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Average Score',
      value: `${stats.avgScore}%`,
      icon: '📊',
      color: 'var(--green-600)',
      bgColor: 'var(--green-50)',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Top Origin',
      value: stats.topCountry,
      icon: '🌍',
      color: '#8b5cf6',
      bgColor: '#f3e8ff',
      change: 'Leading',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.5rem' }}>
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="card" 
          style={{
            background: 'white',
            border: '1px solid var(--gray-100)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: 'var(--gray-600)',
                marginBottom: '0.5rem'
              }}>
                {card.title}
              </p>
              <p style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: card.color,
                marginBottom: '0.25rem'
              }}>
                {card.value}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: card.changeType === 'positive' ? 'var(--green-600)' : 'var(--gray-500)',
                fontWeight: '500'
              }}>
                {card.change} from last month
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: card.bgColor,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;