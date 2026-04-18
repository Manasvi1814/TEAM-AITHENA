import { useState } from 'react';
import { Search, Filter, MapPin, Star, Zap, Users } from 'lucide-react';
import styles from './Explore.module.css';

const talentPool = [
  { id: 1, name: 'Sarah Chen', role: 'Senior React Developer', skills: ['React', 'TypeScript', 'Node.js'], location: 'San Francisco, CA', rate: '$120/hr', availability: 'Available Now', score: 97, avatar: 'SC', tier: 'Elite', remote: true },
  { id: 2, name: 'Marcus Johnson', role: 'AI/ML Engineer', skills: ['Python', 'TensorFlow', 'PyTorch'], location: 'New York, NY', rate: '$150/hr', availability: 'Available in 2 weeks', score: 95, avatar: 'MJ', tier: 'Elite', remote: true },
  { id: 3, name: 'Priya Patel', role: 'UX/Product Designer', skills: ['Figma', 'UX Research', 'Prototyping'], location: 'Austin, TX', rate: '$95/hr', availability: 'Available Now', score: 92, avatar: 'PP', tier: 'Pro', remote: true },
  { id: 4, name: 'Alex Kim', role: 'DevOps / Cloud Architect', skills: ['AWS', 'Kubernetes', 'Terraform'], location: 'Seattle, WA', rate: '$130/hr', availability: 'Available in 1 week', score: 94, avatar: 'AK', tier: 'Elite', remote: false },
  { id: 5, name: 'Jordan Lee', role: 'Blockchain Developer', skills: ['Solidity', 'Web3.js', 'Rust'], location: 'Miami, FL', rate: '$140/hr', availability: 'Available Now', score: 89, avatar: 'JL', tier: 'Pro', remote: true },
  { id: 6, name: 'Emma Wilson', role: 'Growth Marketing Lead', skills: ['SEO', 'Paid Ads', 'Analytics'], location: 'Chicago, IL', rate: '$85/hr', availability: 'Available in 3 weeks', score: 91, avatar: 'EW', tier: 'Pro', remote: true },
  { id: 7, name: 'David Park', role: 'Full-Stack Engineer', skills: ['React', 'Python', 'PostgreSQL'], location: 'Los Angeles, CA', rate: '$110/hr', availability: 'Available Now', score: 88, avatar: 'DP', tier: 'Starter', remote: false },
  { id: 8, name: 'Aisha Okonkwo', role: 'Data Scientist', skills: ['Python', 'R', 'Machine Learning'], location: 'Boston, MA', rate: '$125/hr', availability: 'Available in 1 week', score: 93, avatar: 'AO', tier: 'Elite', remote: true },
];

const ROLES = ['All Roles', 'Engineering', 'Design', 'Marketing', 'Data Science', 'DevOps', 'Blockchain'];
const TIERS = ['All Tiers', 'Elite', 'Pro', 'Starter'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);

  const filtered = talentPool.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchRole = roleFilter === 'All Roles' ||
      t.role.toLowerCase().includes(roleFilter.toLowerCase()) ||
      (roleFilter === 'Data Science' && t.role.toLowerCase().includes('data')) ||
      (roleFilter === 'Engineering' && t.role.toLowerCase().includes('engineer')) ||
      (roleFilter === 'Design' && t.role.toLowerCase().includes('designer')) ||
      (roleFilter === 'Marketing' && t.role.toLowerCase().includes('marketing')) ||
      (roleFilter === 'DevOps' && t.role.toLowerCase().includes('devops')) ||
      (roleFilter === 'Blockchain' && t.role.toLowerCase().includes('blockchain'));
    const matchTier = tierFilter === 'All Tiers' || t.tier === tierFilter;
    const matchRemote = !remoteOnly || t.remote;
    return matchSearch && matchRole && matchTier && matchRemote;
  });

  const toggleSave = (id) => {
    setSavedProfiles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const tierColors = { Elite: '#7c3aed', Pro: '#06b6d4', Starter: '#10b981' };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Talent Pool</h1>
          <p className={styles.sub}>Discover top freelancers and collaborators</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.headerStat}>
            <Users size={14} />
            <span>{talentPool.length} Profiles</span>
          </div>
          <div className={styles.headerStat}>
            <Zap size={14} />
            <span>{talentPool.filter(t => t.availability === 'Available Now').length} Available Now</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search by name, role, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <select
            className={styles.filterSelect}
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
          >
            {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            className={`${styles.remoteToggle} ${remoteOnly ? styles.active : ''}`}
            onClick={() => setRemoteOnly(!remoteOnly)}
          >
            <MapPin size={13} /> Remote Only
          </button>
        </div>
      </div>

      {/* Role Filters */}
      <div className={styles.roleFilters}>
        {ROLES.map(r => (
          <button
            key={r}
            className={`${styles.roleBtn} ${roleFilter === r ? styles.active : ''}`}
            onClick={() => setRoleFilter(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className={styles.resultsRow}>
        <span className={styles.resultsCount}>{filtered.length} freelancers found</span>
        {savedProfiles.length > 0 && (
          <span className={styles.savedCount}>
            <Star size={12} /> {savedProfiles.length} saved
          </span>
        )}
      </div>

      {/* Talent Grid */}
      <div className={styles.grid}>
        {filtered.map(talent => (
          <div key={talent.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>{talent.avatar}</div>
                <div
                  className={styles.tierBadge}
                  style={{ background: `${tierColors[talent.tier]}22`, color: tierColors[talent.tier], borderColor: `${tierColors[talent.tier]}44` }}
                >
                  {talent.tier}
                </div>
              </div>
              <button
                className={`${styles.saveBtn} ${savedProfiles.includes(talent.id) ? styles.saved : ''}`}
                onClick={() => toggleSave(talent.id)}
              >
                <Star size={14} />
              </button>
            </div>

            <div className={styles.cardInfo}>
              <h3 className={styles.talentName}>{talent.name}</h3>
              <p className={styles.talentRole}>{talent.role}</p>
              <div className={styles.talentMeta}>
                <span className={styles.metaItem}>
                  <MapPin size={11} /> {talent.location}
                </span>
                <span className={styles.metaItem}>
                  {talent.remote ? '🌐 Remote' : '🏢 On-site'}
                </span>
              </div>
            </div>

            <div className={styles.skillsRow}>
              {talent.skills.map(s => (
                <span key={s} className={styles.skillChip}>{s}</span>
              ))}
            </div>

            <div className={styles.cardBottom}>
              <div className={styles.rateScore}>
                <span className={styles.rate}>{talent.rate}</span>
                <div className={styles.score}>
                  <Zap size={11} />
                  <span>{talent.score}%</span>
                </div>
              </div>
              <span
                className={`${styles.availability} ${talent.availability === 'Available Now' ? styles.availNow : styles.availSoon}`}
              >
                {talent.availability}
              </span>
            </div>

            <button className={styles.connectBtn}>Connect</button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No results found</h3>
          <p className={styles.emptySub}>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
