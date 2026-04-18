import { useState } from 'react';
import { marketTrends, trendChartData } from '../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Zap, BarChart2, Globe } from 'lucide-react';
import styles from './Insights.module.css';

const COLORS = {
  aiml: '#7c3aed',
  react: '#06b6d4',
  cloud: '#10b981',
  blockchain: '#f59e0b',
};

export default function Insights() {
  const [activeTab, setActiveTab] = useState('trends');
  const tooltipStyle = {
    background: '#121c31',
    border: '1px solid rgba(124,58,237,0.12)',
    borderRadius: '16px',
    color: '#1f1840',
    fontSize: '12px',
    boxShadow: '0 18px 30px rgba(75,41,138,0.08)',
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Market Insights</h1>
          <p className={styles.sub}>Real-time skill demand and market intelligence</p>
        </div>
        <div className={styles.liveTag}>
          <span className={styles.liveDot} />
          Live Data
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {[
          { id: 'trends', label: 'Skill Trends', icon: <TrendingUp size={14} /> },
          { id: 'demand', label: 'Demand vs Supply', icon: <BarChart2 size={14} /> },
          { id: 'global', label: 'Global Pulse', icon: <Globe size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Trend Chart */}
      {activeTab === 'trends' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Skill Demand Over Time</h2>
            <span className={styles.sectionSub}>Last 7 months</span>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
                <XAxis dataKey="month" tick={{ fill: '#8178a8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8178a8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#544b7d' }} />
                <Area type="monotone" dataKey="aiml" name="AI/ML" stroke={COLORS.aiml} fill={COLORS.aiml} fillOpacity={0.08} strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="react" name="React" stroke={COLORS.react} fill={COLORS.react} fillOpacity={0.08} strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="cloud" name="Cloud" stroke={COLORS.cloud} fill={COLORS.cloud} fillOpacity={0.08} strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="blockchain" name="Blockchain" stroke={COLORS.blockchain} fill={COLORS.blockchain} fillOpacity={0.08} strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Demand vs Supply */}
      {activeTab === 'demand' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Demand vs Supply by Skill</h2>
            <span className={styles.sectionSub}>Higher gap = more opportunity</span>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
                <XAxis dataKey="skill" tick={{ fill: '#8178a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8178a8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#544b7d' }} />
                <Bar dataKey="demand" name="Demand" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" name="Supply" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Global Pulse */}
      {activeTab === 'global' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Global Market Pulse</h2>
            <span className={styles.sectionSub}>Trending skills worldwide</span>
          </div>
          <div className={styles.globalGrid}>
            {[
              { region: '🇺🇸 North America', top: 'AI/ML, Cloud, React', hot: 'Cybersecurity', growth: '+34%' },
              { region: '🇪🇺 Europe', top: 'DevOps, Python, TypeScript', hot: 'Data Science', growth: '+28%' },
              { region: '🌏 Asia Pacific', top: 'React, Node.js, AWS', hot: 'Blockchain', growth: '+52%' },
              { region: '🌍 EMEA', top: 'Cloud, DevOps, UI/UX', hot: 'AI/ML', growth: '+41%' },
            ].map((r, i) => (
              <div key={i} className={styles.regionCard}>
                <div className={styles.regionName}>{r.region}</div>
                <div className={styles.regionTop}>
                  <span className={styles.regionLabel}>Top Skills</span>
                  <span className={styles.regionValue}>{r.top}</span>
                </div>
                <div className={styles.regionHot}>
                  <span className={styles.regionLabel}>🔥 Hottest</span>
                  <span className={styles.regionHotValue}>{r.hot}</span>
                </div>
                <div className={styles.regionGrowth}>{r.growth} growth</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Cards */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}><Zap size={15} style={{ color: '#f59e0b' }} /> Top Skills by Demand</h2>
        </div>
        <div className={styles.skillsGrid}>
          {marketTrends.map((skill, i) => (
            <div key={i} className={styles.skillCard}>
              <div className={styles.skillTop}>
                <span className={styles.skillName}>{skill.skill}</span>
                <span className={styles.skillGrowth}>{skill.growth}</span>
              </div>
              <div className={styles.skillBars}>
                <div className={styles.skillBarRow}>
                  <span className={styles.skillBarLabel}>Demand</span>
                  <div className={styles.skillBarTrack}>
                    <div className={styles.skillBarFill} style={{ width: `${skill.demand}%`, background: '#7c3aed' }} />
                  </div>
                  <span className={styles.skillBarNum}>{skill.demand}</span>
                </div>
                <div className={styles.skillBarRow}>
                  <span className={styles.skillBarLabel}>Supply</span>
                  <div className={styles.skillBarTrack}>
                    <div className={styles.skillBarFill} style={{ width: `${skill.supply}%`, background: '#06b6d4' }} />
                  </div>
                  <span className={styles.skillBarNum}>{skill.supply}</span>
                </div>
              </div>
              <div className={styles.gapBadge}>
                Gap: {skill.demand - skill.supply} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
