import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [djangoUser, setDjangoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register new user
  const signup = async (email, password, userData = {}) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await api.post('/accounts/firebase-login/', {
        idtoken: idToken,
        ...userData
      });
      
      setDjangoUser(response.data.user);
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await api.post('/accounts/firebase-login/', {
        idtoken: idToken
      });
      
      setDjangoUser(response.data.user);
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setDjangoUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Auto-login on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const response = await api.post('/accounts/firebase-login/', {
            idtoken: idToken
          });
          
          setDjangoUser(response.data.user);
          
          if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
          }
          if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
          }
        } catch (error) {
          console.error('Auto-login error:', error);
          setError(error.message);
        }
      } else {
        setDjangoUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    djangoUser,
    signup,
    login,
    logout,
    loading,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};