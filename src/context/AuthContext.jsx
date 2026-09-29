import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, loginSocialUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('travelsphere_active_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('travelsphere_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('travelsphere_active_user');
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(credentials);
      if (res.success && res.user) {
        setUser(res.user);
        return { success: true, message: res.message };
      } else {
        throw new Error(res.message || 'Login failed.');
      }
    } catch (err) {
      const errMsg = err.message || 'Login failed.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginSocialUser(provider);
      if (res.success && res.user) {
        setUser(res.user);
        return { success: true, message: res.message, user: res.user };
      } else {
        throw new Error(res.message || 'Social login failed.');
      }
    } catch (err) {
      const errMsg = err.message || 'Social login failed.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(userData);
      if (res.success) {
        return { success: true, message: res.message, user: res.user };
      } else {
        throw new Error(res.message || 'Registration failed.');
      }
    } catch (err) {
      const errMsg = err.message || 'Registration failed.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelsphere_active_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      error,
      login,
      socialLogin,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
