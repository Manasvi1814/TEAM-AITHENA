import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './index.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Insights from './pages/Insights';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('gigmatch_user');
  return user ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="discover" element={<Discover />} />
            <Route path="insights" element={<Insights />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
