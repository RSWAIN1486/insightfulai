import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService from '../services/api';

// Define types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Test user for development
const TEST_USER: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin',
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    // For development: Auto-login with test user
    const autoLogin = async () => {
      try {
        // Check if we have a stored user in localStorage
        const storedUser = localStorage.getItem('testUser');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // For first-time visits, set the test user
          setUser(TEST_USER);
          localStorage.setItem('testUser', JSON.stringify(TEST_USER));
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  // Login function (simplified for development)
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For development: Accept any credentials and return test user
      console.log(`Development login with: ${email} / ${password}`);
      
      // Use our API service instead of direct axios calls
      const response = await apiService.post('/v1/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Save token
      localStorage.setItem('token', token);
      
      // Set user
      setUser(user || TEST_USER);
      localStorage.setItem('testUser', JSON.stringify(user || TEST_USER));
    } catch (err: any) {
      setError('Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('testUser');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Register function (simplified for development)
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use our API service instead of direct axios calls
      const response = await apiService.post('/v1/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      // Save token
      localStorage.setItem('token', token);
      
      // Create a custom user with the provided data
      const customUser = user || {
        ...TEST_USER,
        name,
        email,
      };
      
      setUser(customUser);
      localStorage.setItem('testUser', JSON.stringify(customUser));
    } catch (err: any) {
      setError('Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Provide the auth context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 