const Header = () => {
  return (
    <header style={{
      background: 'white',
      boxShadow: 'var(--shadow-sm)',
      borderBottom: '1px solid var(--gray-200)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '4rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🌱</div>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: 'var(--gray-900)',
            margin: 0
          }}>
            Eco Sustainability Platform
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: 'var(--gray-50)',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              E
            </div>
            <div>
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: 'var(--gray-900)' 
              }}>
                Eco User
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--gray-500)' 
              }}>
                Guest Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;