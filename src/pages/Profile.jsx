import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { profileBoostSuggestions } from '../data/mockData';
import {
  Edit2,
  Check,
  X,
  Plus,
  Award,
  Zap,
  MapPin,
  Briefcase,
  ArrowRight,
  GitBranch,
  Globe,
  Sparkles,
} from 'lucide-react';
import styles from './Profile.module.css';

const ALL_SKILLS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker',
  'Figma', 'UI/UX', 'Machine Learning', 'Data Science', 'Blockchain',
  'Solidity', 'DevOps', 'Kubernetes', 'GraphQL', 'Vue.js',
  'Swift', 'Kotlin', 'Go', 'Rust', 'PostgreSQL', 'MongoDB',
];

export default function Profile() {
  const { user, updateUser } = useApp();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [editingSkills, setEditingSkills] = useState(false);
  const [skills, setSkills] = useState(user?.skills || []);
  const [activeTab, setActiveTab] = useState('overview');

  const initials = user?.name?.split(' ').map((name) => name[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const profileStrength = user?.profileStrength || 65;

  const saveBio = () => {
    updateUser({ bio });
    setEditingBio(false);
  };

  const toggleSkill = (skill) => {
    setSkills((previous) => previous.includes(skill) ? previous.filter((entry) => entry !== skill) : [...previous, skill]);
  };

  const saveSkills = () => {
    updateUser({ skills });
    setEditingSkills(false);
  };

  const strengthItems = [
    { label: 'Professional bio', done: !!user?.bio },
    { label: 'Role clarity', done: !!user?.role },
    { label: 'Skills listed', done: (user?.skills?.length || 0) > 0 },
    { label: 'Portfolio added', done: false },
    { label: 'Certifications', done: false },
    { label: 'Experience signal', done: !!user?.experience },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarColumn}>
            <div className={styles.avatar}>{initials}</div>
            <button className={styles.editAvatarBtn}><Edit2 size={12} /></button>
          </div>

          <div className={styles.heroInfo}>
            <span className={styles.heroKicker}>Public profile</span>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{user?.name || 'Your Name'}</h1>
              <span className={styles.tierBadge}><Zap size={12} /> {user?.tier || 'Starter Tier'}</span>
            </div>
            <p className={styles.role}>{user?.role || 'Add your role to sharpen matching quality'}</p>
            <div className={styles.heroMeta}>
              {user?.email && <span className={styles.metaItem}>{user.email}</span>}
              <span className={styles.metaItem}><MapPin size={13} /> Remote</span>
              <span className={styles.metaItem}><Briefcase size={13} /> {user?.experience || 'Mid-Level'}</span>
            </div>
            <div className={styles.socialRow}>
              <button className={styles.socialBtn}><GitBranch size={16} /></button>
              <button className={styles.socialBtn}><Globe size={16} /></button>
              <button className={styles.socialBtn}><Plus size={16} /></button>
            </div>
          </div>

          <div className={styles.heroAside}>
            <div className={styles.strengthCircle}>
              <svg viewBox="0 0 120 120" className={styles.strengthSvg}>
                <circle cx="60" cy="60" r="52" className={styles.strengthTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className={styles.strengthProgress}
                  style={{ strokeDashoffset: 327 - (327 * profileStrength) / 100 }}
                />
              </svg>
              <div className={styles.strengthInner}>
                <span className={styles.strengthNum}>{profileStrength}%</span>
                <span className={styles.strengthLabel}>Strength</span>
              </div>
            </div>
            <p className={styles.strengthCopy}>A few stronger proof points can move you into the top recruiter tier.</p>
          </div>
        </div>
      </section>

      <div className={styles.tabs}>
        {['overview', 'skills', 'boost'].map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className={styles.overviewGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>About Me</h3>
                <button className={styles.editBtn} onClick={() => setEditingBio(!editingBio)}>
                  <Edit2 size={13} /> Edit
                </button>
              </div>
              {editingBio ? (
                <div className={styles.editArea}>
                  <textarea
                    className={styles.bioTextarea}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    placeholder="Write a crisp, business-friendly summary that shows expertise, impact, and what you want next."
                    rows={5}
                  />
                  <div className={styles.editActions}>
                    <button className={styles.saveBtn} onClick={saveBio}><Check size={13} /> Save</button>
                    <button className={styles.cancelBtn} onClick={() => setEditingBio(false)}><X size={13} /> Cancel</button>
                  </div>
                </div>
              ) : (
                <p className={styles.bioText}>
                  {user?.bio || 'No bio added yet. Add a concise summary with measurable outcomes so recruiters understand your value quickly.'}
                </p>
              )}
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Career Intent</h3>
              <div className={styles.intentGrid}>
                {[
                  { id: 'growth', icon: '🚀', label: 'Career Growth' },
                  { id: 'switch', icon: '🔁', label: 'Career Switch' },
                  { id: 'return', icon: '⏳', label: 'Returning' },
                  { id: 'freelance', icon: '💼', label: 'Freelancing' },
                ].map((intent) => (
                  <button
                    key={intent.id}
                    className={`${styles.intentCard} ${user?.careerIntent === intent.id ? styles.intentActive : ''}`}
                    onClick={() => updateUser({ careerIntent: intent.id })}
                  >
                    <span className={styles.intentIcon}>{intent.icon}</span>
                    <span className={styles.intentLabel}>{intent.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Portfolio & Links</h3>
                <button className={styles.editBtn}><Plus size={13} /> Add Link</button>
              </div>
              <div className={styles.linksGrid}>
                <button className={styles.linkCard}>
                  <div className={styles.linkIcon}><GitBranch size={18} /></div>
                  <div>
                    <strong>GitHub</strong>
                    <span>Show active projects and contribution quality</span>
                  </div>
                  <span className={styles.linkStatus}>Not added</span>
                </button>
                <button className={styles.linkCard}>
                  <div className={styles.linkIcon}><Globe size={18} /></div>
                  <div>
                    <strong>Portfolio</strong>
                    <span>Showcase case studies, outcomes, and credibility</span>
                  </div>
                  <span className={styles.linkStatus}>Not added</span>
                </button>
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.section}>
              <div className={styles.sideHeader}>
                <Sparkles size={16} />
                <span>Profile snapshot</span>
              </div>
              <div className={styles.snapshotList}>
                <div className={styles.snapshotItem}>
                  <span>Skills added</span>
                  <strong>{user?.skills?.length || 0}</strong>
                </div>
                <div className={styles.snapshotItem}>
                  <span>Interests</span>
                  <strong>{user?.interests?.length || 0}</strong>
                </div>
                <div className={styles.snapshotItem}>
                  <span>Match readiness</span>
                  <strong>{profileStrength >= 80 ? 'High' : 'Growing'}</strong>
                </div>
              </div>
            </section>

            {(user?.skills || []).length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Top Skills</h3>
                <div className={styles.tagsRow}>
                  {user.skills.map((skill) => (
                    <span key={skill} className={styles.interestTag}>{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className={styles.tabContent}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Your Skills</h3>
              <button className={styles.editBtn} onClick={() => setEditingSkills(!editingSkills)}>
                <Edit2 size={13} /> {editingSkills ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingSkills ? (
              <>
                <div className={styles.skillGrid}>
                  {ALL_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      className={`${styles.skillChip} ${skills.includes(skill) ? styles.selected : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skills.includes(skill) && <Check size={10} />}
                      {skill}
                    </button>
                  ))}
                </div>
                <button className={styles.saveSkillsBtn} onClick={saveSkills}>
                  <Check size={14} /> Save Skills ({skills.length} selected)
                </button>
              </>
            ) : (
              <div className={styles.skillGrid}>
                {(user?.skills || []).length > 0 ? (
                  user.skills.map((skill) => (
                    <span key={skill} className={`${styles.skillChip} ${styles.selected}`}>{skill}</span>
                  ))
                ) : (
                  <p className={styles.emptyText}>No skills added yet. Click Edit to build your public skill story.</p>
                )}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}><Award size={15} /> Certifications</h3>
              <button className={styles.editBtn}><Plus size={13} /> Add</button>
            </div>
            <div className={styles.certPlaceholder}>
              <Award size={34} />
              <p>No certifications added yet</p>
              <p className={styles.certSub}>Verified credentials make the profile feel complete and trustworthy.</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'boost' && (
        <div className={styles.tabContent}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile Completion</h3>
            <div className={styles.strengthList}>
              {strengthItems.map((item, index) => (
                <div key={index} className={`${styles.strengthItem} ${item.done ? styles.done : ''}`}>
                  <div className={`${styles.strengthCheck} ${item.done ? styles.checkDone : ''}`}>
                    {item.done ? <Check size={12} /> : <span>{index + 1}</span>}
                  </div>
                  <span className={styles.strengthItemLabel}>{item.label}</span>
                  {!item.done && <span className={styles.strengthItemAction}>Add <ArrowRight size={11} /></span>}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Zap size={15} style={{ color: '#7c3aed' }} /> AI-Powered Suggestions</h3>
            <div className={styles.suggestionList}>
              {profileBoostSuggestions.map((suggestion) => (
                <div key={suggestion.id} className={styles.suggestionCard}>
                  <span className={styles.suggestionIcon}>{suggestion.icon}</span>
                  <div className={styles.suggestionInfo}>
                    <div className={styles.suggestionTitle}>{suggestion.title}</div>
                    <div className={styles.suggestionDesc}>{suggestion.description}</div>
                  </div>
                  <div className={styles.suggestionRight}>
                    <span className={`${styles.priorityBadge} ${styles[suggestion.priority]}`}>{suggestion.priority}</span>
                    <button className={styles.actionBtn}>{suggestion.action}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
