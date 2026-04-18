// Custom hook for dashboard
import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard stats
    setLoading(false);
  }, []);

  return {
    stats,
    loading
  };
};