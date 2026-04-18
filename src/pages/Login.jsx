import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import styles from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login({
      name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      email: form.email,
      role: 'Full-Stack Developer',
      skills: ['React', 'Node.js', 'Python'],
      tier: 'Elite Tier',
      careerIntent: 'growth',
      interests: ['Engineering', 'AI/ML'],
    });
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemo = () => {
    login({
      name: 'Alex Rivers',
      email: 'alex@gigmatch.io',
      role: 'Full-Stack Developer',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      tier: 'Elite Tier',
      careerIntent: 'growth',
      interests: ['Engineering', 'AI/ML', 'Cloud'],
    });
    navigate('/dashboard');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authBg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.authContainer}>
        <div className={styles.authLeft}>
          <div className={styles.logoWrap}>
            <div className={styles.logoIcon}><Zap size={22} /></div>
            <span className={styles.logoText}>GigMatch</span>
          </div>

          <div className={styles.heroBlock}>
            <span className={styles.eyebrow}>AI-Powered Talent Search</span>
            <h1 className={styles.heroTitle}>
              Define your <span className={styles.accentText}>next</span> move.
            </h1>
            <p className={styles.heroSub}>
              A calmer, smarter way to discover great-fit gigs with clean signals, quick decisions, and polished recruiter-ready workflows.
            </p>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>4,200+</span>
              <span className={styles.statLabel}>Executives</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>94%</span>
              <span className={styles.statLabel}>Match Rate</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>18d</span>
              <span className={styles.statLabel}>Avg. Placed</span>
            </div>
          </div>

          <div className={styles.floatingCard}>
            <div className={styles.fcTop}>
              <span className={styles.fcScore}>Match score</span>
              <span className={styles.fcNum}>98%</span>
            </div>
            <div className={styles.fcTitle}>Senior Full-Stack Engineer</div>
            <div className={styles.fcSub}>FinTech Scaleup · $120k-$160k</div>
          </div>
        </div>

        <div className={styles.authRight}>
          <div className={styles.authCard}>
            <h2 className={styles.authTitle}>Welcome back</h2>
            <p className={styles.authSub}>Sign in to continue your matching flow.</p>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={styles.passWrap}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : <>Continue to Dashboard <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className={styles.divider}><span>or</span></div>

            <button className={styles.demoBtn} onClick={handleDemo}>
              <Zap size={16} /> Try Demo Account
            </button>

            <p className={styles.switchAuth}>
              Don&apos;t have an account? <Link to="/signup">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
