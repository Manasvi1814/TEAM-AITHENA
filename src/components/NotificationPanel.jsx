import { useApp } from '../context/AppContext';
import { Bell, Zap, Eye, X } from 'lucide-react';
import styles from './NotificationPanel.module.css';

const iconMap = {
  match: <Zap size={14} />,
  view: <Eye size={14} />,
  tip: <Bell size={14} />,
};

const colorMap = {
  match: '#7c3aed',
  view: '#06b6d4',
  tip: '#f59e0b',
};

export default function NotificationPanel({ onClose }) {
  const { notifications, markNotificationsRead } = useApp();

  const handleMarkAll = () => {
    markNotificationsRead();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Notifications</span>
        <div className={styles.headerActions}>
          <button className={styles.markAllBtn} onClick={handleMarkAll}>
            Mark all read
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`${styles.item} ${!n.read ? styles.unread : ''}`}>
              <div
                className={styles.iconWrap}
                style={{ background: `${colorMap[n.type]}22`, color: colorMap[n.type] }}
              >
                {iconMap[n.type]}
              </div>
              <div className={styles.content}>
                <p className={styles.message}>{n.message}</p>
                <span className={styles.time}>{n.time}</span>
              </div>
              {!n.read && <div className={styles.dot} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
