import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Home,
  Compass,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  MessageSquare,
  Zap,
  ChevronUp,
  X,
  ClipboardList,
} from 'lucide-react';
import styles from './Layout.module.css';
import NotificationPanel from './NotificationPanel';
import ApplicationStatusPanel from './ApplicationStatusPanel';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/discover', icon: Compass, label: 'Matches' },
  { to: '/insights', icon: BarChart2, label: 'Analytics' },
  { to: '/explore', icon: Users, label: 'Talent Pool' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  const { user, logout, unreadCount, matches, showMatchModal, setShowMatchModal, currentMatch } = useApp();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAppStatus, setShowAppStatus] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const profileStrength = user?.profileStrength || 65;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}><Zap size={18} /></div>
          <span className={styles.logoText}>GigMatch</span>
        </div>

        <div className={styles.sidebarUser}>
          <div className={styles.userAvatar}>{initials}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'User'}</span>
            <span className={styles.userRole}>{user?.role || 'VP of Product'}</span>
            <span className={styles.userTier}>{user?.tier || 'Starter Tier'}</span>
            <div className={styles.sidebarStrength}>
              <div className={styles.sidebarStrengthRow}>
                <span>Profile strength</span>
                <strong>{profileStrength}%</strong>
              </div>
              <div className={styles.sidebarStrengthBar}>
                <div className={styles.sidebarStrengthFill} style={{ width: `${profileStrength}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.menuLabel}>Menu</div>
        <nav className={styles.sidebarNav}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
            >
              <div className={styles.navItemLeft}>
                <Icon size={18} />
                <span>{label}</span>
              </div>
              {label === 'Matches' && <span className={styles.navCount}>{matches.length}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <button className={styles.upgradeBtn}>
            <ChevronUp size={14} />
            Upgrade to Pro
          </button>

          <div className={styles.sidebarStats}>
            <div className={styles.sidebarStat}>
              <strong>4.2k+</strong>
              <span>Executives</span>
            </div>
            <div className={styles.sidebarStatDivider} />
            <div className={styles.sidebarStat}>
              <strong>94%</strong>
              <span>Match Rate</span>
            </div>
            <div className={styles.sidebarStatDivider} />
            <div className={styles.sidebarStat}>
              <strong>18d</strong>
              <span>Avg. Placed</span>
            </div>
          </div>

          <div className={styles.sidebarActions}>
            <button className={styles.actionBtn} onClick={() => navigate('/about')}>
              <HelpCircle size={16} />
              <span>Support</span>
            </button>
            <button className={styles.actionBtn} onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className={styles.mainWrap}>
        <header className={styles.topNav}>
          <nav className={styles.topNavLinks}>
            <NavLink to="/dashboard" className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/discover" className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`}>
              Discovery
            </NavLink>
            <NavLink to="/insights" className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`}>
              Insights
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`}>
              Network
            </NavLink>
          </nav>

          <div className={styles.topNavRight}>
            <button className={styles.iconBtn} onClick={() => { setShowNotifs(!showNotifs); setShowAppStatus(false); }}>
              <Bell size={18} />
              {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </button>
            <button className={styles.iconBtn} onClick={() => { setShowAppStatus(!showAppStatus); setShowNotifs(false); }}>
              <ClipboardList size={18} />
            </button>
            <button className={styles.iconBtn} onClick={() => navigate('/about')}>
              <MessageSquare size={18} />
            </button>
            <button className={styles.postGigBtn} onClick={() => navigate('/profile')}>
              Polish Profile
            </button>
            <button className={styles.avatarBtn} onClick={() => navigate('/profile')}>
              <span>{initials}</span>
            </button>
          </div>
        </header>

        {showNotifs && <NotificationPanel onClose={() => setShowNotifs(false)} />}
        {showAppStatus && <ApplicationStatusPanel onClose={() => setShowAppStatus(false)} />}

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>

      {showMatchModal && currentMatch && (
        <div className={styles.matchOverlay} onClick={() => setShowMatchModal(false)}>
          <div className={styles.matchModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.matchFireworks}>🎉</div>
            <h2 className={styles.matchTitle}>It&apos;s a Match!</h2>
            <p className={styles.matchSub}>You and <strong>{currentMatch.company}</strong> are interested in each other!</p>
            <div className={styles.matchGig}>
              <span className={styles.matchGigIcon}>{currentMatch.icon}</span>
              <div>
                <div className={styles.matchGigTitle}>{currentMatch.title}</div>
                <div className={styles.matchGigSub}>{currentMatch.salary}</div>
              </div>
            </div>
            <div className={styles.matchActions}>
              <button className={styles.matchMsgBtn} onClick={() => setShowMatchModal(false)}>
                Send Message
              </button>
              <button className={styles.matchKeepBtn} onClick={() => setShowMatchModal(false)}>
                Keep Swiping
              </button>
            </div>
            <button className={styles.matchClose} onClick={() => setShowMatchModal(false)}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
