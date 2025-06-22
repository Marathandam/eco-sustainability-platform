import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import UserProfile from './UserProfile';
import StatsCards from './StatsCards';
import ProductsList from './ProductsList';

const Dashboard = () => {
  const { currentUser, djangoUser } = useAuth();
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
            <div>
              <UserProfile user={djangoUser} firebaseUser={currentUser} />
            </div>
          </div>
          
          <ProductsList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;