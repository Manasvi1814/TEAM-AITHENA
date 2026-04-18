// Custom hook for authentication
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Check if user is authenticated
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // TODO: Implement login logic
    console.log('Logging in with:', credentials);
  };

  const logout = () => {
    // TODO: Implement logout logic
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout
  };
};