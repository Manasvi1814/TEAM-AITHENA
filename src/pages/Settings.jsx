import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Shield, Palette, LogOut, ChevronRight,
  Zap, Check, Trash2
} from 'lucide-react';
import styles from './Settings.module.css';

export default function Settings() {
  const { user, updateUser, logout } = useApp();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    newMatches: true,
    profileViews: true,
    marketTips: false,
    weeklyDigest: true,
    emailAlerts: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showSalary: false,
    allowRecruiterContact: true,
    showOnlineStatus: true,
  });

  const [preferences, setPreferences] = useState({
    remoteOnly: user?.gigTypes?.includes('remote') || false,
    partTimeOk: user?.gigTypes?.includes('parttime') || false,
    minSalary: '80000',
    theme: 'dark',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser({ preferences, privacy });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNotif = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key) => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.sub}>Manage your account preferences and privacy</p>
        </div>
        <button
          className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
          onClick={handleSave}
        >
          {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
        </button>
      </div>

      <div className={styles.grid}>
        {/* Left Column */}
        <div className={styles.col}>
          {/* Account Info */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>
                <Zap size={16} />
              </div>
              <h3 className={styles.sectionTitle}>Account</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Name</span>
                <span className={styles.infoValue}>{user?.name || '—'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{user?.email || '—'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Tier</span>
                <span className={styles.tierBadge}>{user?.tier || 'Starter Tier'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Member Since</span>
                <span className={styles.infoValue}>
                  {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                </span>
              </div>
            </div>
            <button className={styles.upgradeBanner}>
              <Zap size={14} />
              Upgrade to Pro — Unlock unlimited matches
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Notifications */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                <Bell size={16} />
              </div>
              <h3 className={styles.sectionTitle}>Notifications</h3>
            </div>
            <div className={styles.toggleList}>
              {[
                { key: 'newMatches', label: 'New Gig Matches', sub: 'Get notified when new matches are found' },
                { key: 'profileViews', label: 'Profile Views', sub: 'When a recruiter views your profile' },
                { key: 'marketTips', label: 'Market Tips', sub: 'AI-powered skill and market insights' },
                { key: 'weeklyDigest', label: 'Weekly Digest', sub: 'Summary of your activity and matches' },
                { key: 'emailAlerts', label: 'Email Alerts', sub: 'Receive notifications via email' },
              ].map(item => (
                <div key={item.key} className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>{item.label}</span>
                    <span className={styles.toggleSub}>{item.sub}</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${notifications[item.key] ? styles.toggleOn : ''}`}
                    onClick={() => toggleNotif(item.key)}
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.col}>
          {/* Privacy */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                <Shield size={16} />
              </div>
              <h3 className={styles.sectionTitle}>Privacy</h3>
            </div>
            <div className={styles.toggleList}>
              {[
                { key: 'profileVisible', label: 'Public Profile', sub: 'Allow recruiters to find your profile' },
                { key: 'showSalary', label: 'Show Salary Expectations', sub: 'Display your rate on your profile' },
                { key: 'allowRecruiterContact', label: 'Recruiter Contact', sub: 'Allow direct messages from recruiters' },
                { key: 'showOnlineStatus', label: 'Online Status', sub: 'Show when you were last active' },
              ].map(item => (
                <div key={item.key} className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>{item.label}</span>
                    <span className={styles.toggleSub}>{item.sub}</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${privacy[item.key] ? styles.toggleOn : ''}`}
                    onClick={() => togglePrivacy(item.key)}
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' }}>
                <Palette size={16} />
              </div>
              <h3 className={styles.sectionTitle}>Gig Preferences</h3>
            </div>
            <div className={styles.prefList}>
              <div className={styles.prefRow}>
                <span className={styles.prefLabel}>Minimum Salary</span>
                <div className={styles.prefInput}>
                  <span className={styles.prefPrefix}>$</span>
                  <input
                    type="number"
                    value={preferences.minSalary}
                    onChange={e => setPreferences(p => ({ ...p, minSalary: e.target.value }))}
                    className={styles.salaryInput}
                  />
                  <span className={styles.prefSuffix}>/yr</span>
                </div>
              </div>
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Remote Only</span>
                  <span className={styles.toggleSub}>Only show remote gigs</span>
                </div>
                <button
                  className={`${styles.toggle} ${preferences.remoteOnly ? styles.toggleOn : ''}`}
                  onClick={() => setPreferences(p => ({ ...p, remoteOnly: !p.remoteOnly }))}
                >
                  <div className={styles.toggleThumb} />
                </button>
              </div>
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>Part-Time OK</span>
                  <span className={styles.toggleSub}>Include part-time opportunities</span>
                </div>
                <button
                  className={`${styles.toggle} ${preferences.partTimeOk ? styles.toggleOn : ''}`}
                  onClick={() => setPreferences(p => ({ ...p, partTimeOk: !p.partTimeOk }))}
                >
                  <div className={styles.toggleThumb} />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className={`${styles.section} ${styles.dangerSection}`}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                <Trash2 size={16} />
              </div>
              <h3 className={styles.sectionTitle}>Danger Zone</h3>
            </div>
            <div className={styles.dangerList}>
              <button className={styles.dangerBtn} onClick={handleLogout}>
                <LogOut size={14} />
                Sign Out
                <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
              <button className={styles.dangerBtnRed}>
                <Trash2 size={14} />
                Delete Account
                <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
