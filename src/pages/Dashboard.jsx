import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockGigs, profileBoostSuggestions, trendChartData, marketTrends } from '../data/mockData';
import {
  Zap,
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
  Star,
  ArrowRight,
  Flame,
  Award,
  BarChart2,
  PenSquare,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user, matches } = useApp();
  const navigate = useNavigate();
  const [activeBoost, setActiveBoost] = useState(null);

  const topGigs = mockGigs.slice(0, 3);
  const profileStrength = user?.profileStrength || 65;
  const firstName = user?.name?.split(' ')[0] || 'there';
  const profileChecklist = [
    { id: 1, title: 'Professional bio', progress: user?.bio ? 100 : 45, tone: 'purple', icon: <PenSquare size={16} /> },
    { id: 2, title: 'Skill positioning', progress: Math.min(((user?.skills?.length || 0) * 18), 100), tone: 'cyan', icon: <Sparkles size={16} /> },
    { id: 3, title: 'Portfolio readiness', progress: 52, tone: 'green', icon: <CheckCircle2 size={16} /> },
  ];

  const stats = [
    { icon: <Target size={18} />, label: 'Match Score', value: '94%', color: '#7c3aed', sub: '+6% this week' },
    { icon: <Flame size={18} />, label: 'Profile Views', value: '128', color: '#f59e0b', sub: '+23 today' },
    { icon: <Star size={18} />, label: 'Gigs Matched', value: matches.length || 0, color: '#10b981', sub: 'All time' },
    { icon: <Clock size={18} />, label: 'Avg Response', value: '4 hrs', color: '#06b6d4', sub: 'Recruiter average' },
  ];

  const chartData = useMemo(() => trendChartData.slice(-5), []);
  const marketLeaders = marketTrends.slice(0, 4);

  return (
    <div className={styles.page}>
      <section className={styles.heroPanel}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>Smart matching, cleaner decisions</span>
          <h1 className={styles.welcomeTitle}>
            Make your next move feel obvious, <span className={styles.highlight}>{firstName}</span>.
          </h1>
          <p className={styles.welcomeSub}>
            Your profile is attracting strong-fit gigs already. The fastest wins today are improving skill positioning and jumping back into swipe mode.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} onClick={() => navigate('/discover')}>
              <Zap size={16} /> Start Swiping <ArrowRight size={14} />
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate('/profile')}>
              Polish Profile
            </button>
          </div>
        </div>

        <div className={styles.profileWidget}>
          <div className={styles.profileWidgetTop}>
            <div className={styles.profileAvatar}>
              {user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'GM'}
            </div>
            <button className={styles.quickEdit} onClick={() => navigate('/profile')}>
              <PenSquare size={14} />
            </button>
          </div>
          <h3 className={styles.profileName}>{user?.name || 'GigMatch User'}</h3>
          <p className={styles.profileRole}>{user?.role || 'Add your role to improve relevance'}</p>
          <div className={styles.profilePills}>
            <span className={styles.tierPill}>{user?.tier || 'Starter Tier'}</span>
            <span className={styles.metaPill}>{matches.length} active matches</span>
          </div>
          <div className={styles.profileStrengthBlock}>
            <div className={styles.profileStrengthRow}>
              <span>Profile strength</span>
              <strong>{profileStrength}%</strong>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${profileStrength}%` }} />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <article key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}1A`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statSub}>{stat.sub}</span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Boost Your Profile</h2>
              <p className={styles.sectionSub}>Small upgrades that directly improve discoverability.</p>
            </div>
            <button className={styles.linkBtn} onClick={() => navigate('/profile')}>
              Open profile <ChevronRight size={14} />
            </button>
          </div>

          <div className={styles.boostGrid}>
            {profileChecklist.map((item) => (
              <article key={item.id} className={`${styles.boostCard} ${styles[item.tone]}`}>
                <div className={styles.boostHeader}>
                  <div className={styles.boostIcon}>{item.icon}</div>
                  <span className={styles.boostValue}>{item.progress}%</span>
                </div>
                <h3 className={styles.boostTitle}>{item.title}</h3>
                <div className={styles.inlineProgress}>
                  <div className={styles.inlineProgressFill} style={{ width: `${item.progress}%` }} />
                </div>
              </article>
            ))}
          </div>

          <div className={styles.suggestionsCard}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <BarChart2 size={15} style={{ color: '#06b6d4' }} /> Why this week matters
              </h3>
            </div>
            <div className={styles.suggestionList}>
              {profileBoostSuggestions.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion.id}
                  className={`${styles.suggestionItem} ${activeBoost === suggestion.id ? styles.active : ''}`}
                  onClick={() => setActiveBoost(activeBoost === suggestion.id ? null : suggestion.id)}
                >
                  <span className={styles.suggestionIcon}>{suggestion.icon}</span>
                  <div className={styles.suggestionContent}>
                    <span className={styles.suggestionTitle}>{suggestion.title}</span>
                    <span className={styles.suggestionMeta}>{suggestion.action}</span>
                    {activeBoost === suggestion.id && (
                      <p className={styles.suggestionDesc}>{suggestion.description}</p>
                    )}
                  </div>
                  <span className={`${styles.priorityBadge} ${styles[suggestion.priority]}`}>{suggestion.priority}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className={styles.rightCol}>
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Market Trends</h2>
                <p className={styles.sectionSub}>A clean read on what is rising right now.</p>
              </div>
            </div>
            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(124, 58, 237, 0.08)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#8178a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8178a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#121c31',
                      border: '1px solid rgba(124,58,237,0.12)',
                      borderRadius: '16px',
                      boxShadow: '0 16px 30px rgba(75,41,138,0.08)',
                    }}
                  />
                  <Area type="monotone" dataKey="aiml" name="AI/ML" stroke="#7c3aed" strokeWidth={2.5} fill="#7c3aed" fillOpacity={0.08} />
                  <Area type="monotone" dataKey="react" name="React" stroke="#06b6d4" strokeWidth={2.5} fill="#06b6d4" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.marketList}>
              {marketLeaders.map((skill) => (
                <div key={skill.skill} className={styles.marketItem}>
                  <div>
                    <strong>{skill.skill}</strong>
                    <span>{skill.growth} growth</span>
                  </div>
                  <div className={styles.marketMeter}>
                    <div className={styles.marketMeterFill} style={{ width: `${skill.demand}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Demand Snapshot</h2>
                <p className={styles.sectionSub}>Top opportunity gaps in your market.</p>
              </div>
            </div>
            <div className={styles.chartWrapCompact}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={marketLeaders} margin={{ top: 8, right: 0, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(124, 58, 237, 0.08)" vertical={false} />
                  <XAxis dataKey="skill" tick={{ fill: '#8178a8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8178a8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#121c31',
                      border: '1px solid rgba(124,58,237,0.12)',
                      borderRadius: '16px',
                    }}
                  />
                  <Bar dataKey="demand" fill="#7c3aed" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="supply" fill="#06b6d4" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </aside>
      </div>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>
              <Flame size={16} style={{ color: '#f59e0b' }} /> Top Matches For You
            </h2>
            <p className={styles.sectionSub}>High-intent roles sorted by fit and hiring speed.</p>
          </div>
          <button className={styles.linkBtn} onClick={() => navigate('/discover')}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className={styles.gigList}>
          {topGigs.map((gig) => (
            <button key={gig.id} className={styles.gigCard} onClick={() => navigate('/discover')}>
              <div className={styles.gigLeft}>
                <div className={styles.gigIcon}>{gig.icon}</div>
                <div className={styles.gigInfo}>
                  <span className={styles.gigTitle}>{gig.title}</span>
                  <span className={styles.gigCompany}>{gig.company} · {gig.salary}</span>
                  <div className={styles.gigTags}>
                    {gig.tags.map((tag) => (
                      <span key={tag} className={styles.gigTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.gigRight}>
                <div className={styles.matchBadge}>
                  <span className={styles.matchNum}>{gig.matchScore}%</span>
                  <span className={styles.matchLabel}>match</span>
                </div>
                {gig.fastTrack && (
                  <span className={styles.fastTrackBadge}><Zap size={10} /> Fast Track</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.marketBanner}>
        <div className={styles.marketBannerLeft}>
          <TrendingUp size={20} style={{ color: '#10b981' }} />
          <div>
            <span className={styles.marketBannerTitle}>Market Pulse</span>
            <span className={styles.marketBannerSub}>AI/ML demand is still leading. Profiles with current portfolio links are converting fastest this week.</span>
          </div>
        </div>
        <button className={styles.insightsBtn} onClick={() => navigate('/insights')}>
          View Insights <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}
