import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // Mock token verification - in real app, this would call the backend
      const mockUser = {
        id: 1,
        name: 'John Doe',
        phoneNumber: '+1234567890',
        userType: 'patient',
        email: 'john@example.com'
      };
      setUser(mockUser);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (phoneNumber, password) => {
    try {
      // Mock login - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser = {
        id: 1,
        name: 'John Doe',
        phoneNumber: phoneNumber,
        userType: 'patient',
        email: 'john@example.com'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed - using mock data' 
      };
    }
  };

  const register = async (name, phoneNumber, password, userType = 'patient') => {
    try {
      // Mock registration - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser = {
        id: Date.now(),
        name: name,
        phoneNumber: phoneNumber,
        userType: userType,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Registration failed - using mock data' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
