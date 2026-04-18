import { X, CheckCircle2, Clock, AlertTriangle, Briefcase } from 'lucide-react';
import styles from './ApplicationStatusPanel.module.css';

const mockApplications = [
  {
    id: 1,
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    status: 'interviewing',
    statusLabel: 'Interviewing',
    time: '2 days ago',
  },
  {
    id: 2,
    company: 'Netflix',
    role: 'Lead React Developer',
    status: 'reviewing',
    statusLabel: 'Under Review',
    time: '4 days ago',
  },
  {
    id: 3,
    company: 'FinTech Scaleup',
    role: 'Senior Full-Stack Engineer',
    status: 'rejected',
    statusLabel: 'Not selected',
    time: '1 week ago',
    feedback: 'CV Gap: The role required 5+ years of robust AWS DevOps & Kubernetes experience. Your portfolio heavily emphasized frontend architecture without sufficient infrastructure proof.',
  }
];

const statusConfig = {
  interviewing: {
    icon: <CheckCircle2 size={16} />,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.12)'
  },
  reviewing: {
    icon: <Clock size={16} />,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)'
  },
  rejected: {
    icon: <AlertTriangle size={16} />,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.12)'
  }
};

export default function ApplicationStatusPanel({ onClose }) {
  return (
    <div className={styles.panelOverlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <span className={styles.titleIcon}>
              <Briefcase size={16} />
            </span>
            <span className={styles.title}>Application Status</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.list}>
          {mockApplications.map((app) => {
            const config = statusConfig[app.status];
            return (
              <div key={app.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.jobInfo}>
                    <span className={styles.role}>{app.role}</span>
                    <span className={styles.company}>{app.company}</span>
                  </div>
                  <div 
                    className={styles.statusBadge} 
                    style={{ color: config.color, background: config.bg }}
                  >
                    {config.icon}
                    <span>{app.statusLabel}</span>
                  </div>
                </div>
                
                {app.status === 'rejected' && app.feedback && (
                  <div className={styles.feedbackBlock}>
                    <div className={styles.feedbackHeader}>
                      <AlertTriangle size={12} />
                      <strong>Why was I rejected?</strong>
                    </div>
                    <p className={styles.feedbackText}>{app.feedback}</p>
                  </div>
                )}
                
                <span className={styles.time}>{app.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
