// Custom hook for jobs
import { useState, useEffect } from 'react';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch jobs
    setLoading(false);
  }, []);

  const searchJobs = (query) => {
    // TODO: Implement job search
    console.log('Searching jobs:', query);
  };

  return {
    jobs,
    loading,
    searchJobs
  };
};