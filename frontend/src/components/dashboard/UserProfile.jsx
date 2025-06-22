const UserProfile = ({ user, firebaseUser }) => {
  return (
    <div className="card" style={{ height: 'fit-content' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '600',
          margin: '0 auto 1rem'
        }}>
          {(user?.full_name || user?.email)?.charAt(0).toUpperCase()}
        </div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: 'var(--gray-900)'
        }}>
          User Profile
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ 
            fontSize: '0.75rem', 
            fontWeight: '500', 
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Email
          </label>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-900)',
            fontWeight: '500',
            marginTop: '0.25rem'
          }}>
            {user?.email}
          </p>
        </div>
        
        <div>
          <label style={{ 
            fontSize: '0.75rem', 
            fontWeight: '500', 
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Full Name
          </label>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-900)',
            fontWeight: '500',
            marginTop: '0.25rem'
          }}>
            {user?.full_name || 'Not provided'}
          </p>
        </div>
        
        <div>
          <label style={{ 
            fontSize: '0.75rem', 
            fontWeight: '500', 
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            User ID
          </label>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--gray-900)',
            fontWeight: '500',
            marginTop: '0.25rem'
          }}>
            {user?.id}
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label style={{ 
              fontSize: '0.75rem', 
              fontWeight: '500', 
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Status
            </label>
            <p style={{ marginTop: '0.25rem' }}>
              {user?.is_active ? (
                <span className="badge badge-green">Active</span>
              ) : (
                <span className="badge badge-red">Inactive</span>
              )}
            </p>
          </div>
          
          <div>
            <label style={{ 
              fontSize: '0.75rem', 
              fontWeight: '500', 
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Verified
            </label>
            <p style={{ marginTop: '0.25rem' }}>
              {firebaseUser?.emailVerified ? (
                <span className="badge badge-green">✓ Verified</span>
              ) : (
                <span className="badge badge-yellow">⏳ Pending</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;