import { useNavigate } from 'react-router-dom';
import { Zap, Target, TrendingUp, Users, Shield, Star, ArrowRight, Heart } from 'lucide-react';
import styles from './About.module.css';

const team = [
  { name: 'Jordan Blake', role: 'CEO & Co-Founder', avatar: 'JB', bio: 'Ex-Google PM. Passionate about connecting talent with opportunity.' },
  { name: 'Mia Torres', role: 'CTO & Co-Founder', avatar: 'MT', bio: 'Former Netflix engineer. Built systems at scale for 200M+ users.' },
  { name: 'Ravi Sharma', role: 'Head of AI', avatar: 'RS', bio: 'PhD in ML from MIT. Designed the matching algorithm powering GigMatch.' },
  { name: 'Chloe Park', role: 'Head of Design', avatar: 'CP', bio: 'Award-winning designer. Previously led design at Airbnb and Stripe.' },
];

const values = [
  { icon: <Target size={20} />, title: 'Precision Matching', desc: 'Our AI analyzes 50+ signals to find gigs that truly fit your skills and goals.', color: '#7c3aed' },
  { icon: <TrendingUp size={20} />, title: 'Market Intelligence', desc: 'Real-time skill demand data helps you stay ahead of market trends.', color: '#06b6d4' },
  { icon: <Shield size={20} />, title: 'Privacy First', desc: 'Your data is yours. We never sell your information to third parties.', color: '#10b981' },
  { icon: <Heart size={20} />, title: 'Human-Centered', desc: 'Technology that empowers people, not replaces them.', color: '#ec4899' },
];

const stats = [
  { num: '50K+', label: 'Active Freelancers' },
  { num: '12K+', label: 'Companies Hiring' },
  { num: '98%', label: 'Match Satisfaction' },
  { num: '$2.4B', label: 'Gigs Facilitated' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}><Zap size={20} /></div>
            <span className={styles.logoText}>GigMatch</span>
          </div>
          <h1 className={styles.heroTitle}>
            We're on a mission to make<br />
            <span className={styles.accentText}>talent discovery effortless.</span>
          </h1>
          <p className={styles.heroSub}>
            GigMatch uses AI to connect the world's best freelancers with the opportunities they deserve — faster, smarter, and more fairly than ever before.
          </p>
          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className={styles.section}>
        <div className={styles.storyGrid}>
          <div className={styles.storyLeft}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.storyText}>
              GigMatch was born out of frustration. Our founders — Jordan and Mia — spent years watching talented freelancers struggle to find the right opportunities, while companies wasted months searching for the perfect hire.
            </p>
            <p className={styles.storyText}>
              In 2023, they set out to build something different: a platform that uses AI not just to match resumes to job descriptions, but to understand the full picture — skills, career goals, work style, and market demand — to create truly meaningful connections.
            </p>
            <p className={styles.storyText}>
              Today, GigMatch has helped over 50,000 freelancers land their dream gigs, with an average time-to-match of just 4 hours.
            </p>
            <button className={styles.ctaBtn} onClick={() => navigate('/discover')}>
              Start Matching <ArrowRight size={14} />
            </button>
          </div>
          <div className={styles.storyRight}>
            <div className={styles.timelineCard}>
              {[
                { year: '2023', event: 'GigMatch founded in San Francisco', icon: '🚀' },
                { year: 'Q2 2023', event: 'Launched beta with 500 freelancers', icon: '🎯' },
                { year: 'Q4 2023', event: 'Raised $8M Series A funding', icon: '💰' },
                { year: '2024', event: 'Reached 10,000 active users', icon: '📈' },
                { year: 'Q3 2024', event: 'Launched AI matching v2.0', icon: '🤖' },
                { year: '2025', event: '50,000+ freelancers, $2.4B facilitated', icon: '🌍' },
              ].map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>{item.icon}</div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <span className={styles.timelineEvent}>{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 20 }}>What We Stand For</h2>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: `${v.color}18`, color: v.color }}>
                {v.icon}
              </div>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 20 }}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamAvatar}>{member.avatar}</div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
              <p className={styles.teamBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerLeft}>
          <h2 className={styles.ctaBannerTitle}>Ready to find your next gig?</h2>
          <p className={styles.ctaBannerSub}>Join 50,000+ freelancers who land smarter with GigMatch.</p>
        </div>
        <div className={styles.ctaBannerActions}>
          <button className={styles.ctaPrimaryBtn} onClick={() => navigate('/discover')}>
            <Zap size={15} /> Start Swiping
          </button>
          <button className={styles.ctaSecondaryBtn} onClick={() => navigate('/insights')}>
            View Insights <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
