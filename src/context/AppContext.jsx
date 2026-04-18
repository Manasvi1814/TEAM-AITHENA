import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gigmatch_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('gigmatch_user');
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'match', message: 'New match with TechCorp!', time: '2m ago', read: false },
    { id: 2, type: 'view', message: 'FinTech Scaleup viewed your profile', time: '15m ago', read: false },
    { id: 3, type: 'tip', message: 'Add TypeScript to boost matches by 35%', time: '1h ago', read: true },
    { id: 4, type: 'match', message: "It's a match with DeepMind Ventures!", time: '3h ago', read: true },
  ]);

  const [matches, setMatches] = useState([]);
  const [passedGigs, setPassedGigs] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [showWhyNotModal, setShowWhyNotModal] = useState(false);
  const [currentWhyNotGig, setCurrentWhyNotGig] = useState(null);

  const login = (userData) => {
    const fullUser = {
      ...userData,
      id: Date.now(),
      avatar: userData.avatar || null,
      profileStrength: 65,
      joinedDate: new Date().toISOString(),
    };
    setUser(fullUser);
    setIsAuthenticated(true);
    localStorage.setItem('gigmatch_user', JSON.stringify(fullUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gigmatch_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('gigmatch_user', JSON.stringify(updated));
  };

  const addMatch = (gig) => {
    setMatches(prev => [...prev, { ...gig, matchedAt: new Date().toISOString() }]);
    setCurrentMatch(gig);
    setShowMatchModal(true);
  };

  const addPass = (gig) => {
    setPassedGigs(prev => [...prev, gig]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateUser,
      notifications,
      unreadCount,
      markNotificationsRead,
      matches,
      passedGigs,
      addMatch,
      addPass,
      showMatchModal,
      setShowMatchModal,
      currentMatch,
      showWhyNotModal,
      setShowWhyNotModal,
      currentWhyNotGig,
      setCurrentWhyNotGig,
    }}>
      {children}
    </AppContext.Provider>
  );
};
