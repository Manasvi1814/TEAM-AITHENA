import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowLeft, Zap, Check } from 'lucide-react';
import styles from './Auth.module.css';

const SKILLS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker',
  'Figma', 'UI/UX', 'Machine Learning', 'Data Science', 'Blockchain',
  'Solidity', 'DevOps', 'Kubernetes', 'GraphQL', 'Vue.js', 'Angular',
  'Swift', 'Kotlin', 'Go', 'Rust', 'PostgreSQL', 'MongoDB', 'Redis',
];

const INTERESTS = [
  'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 'Blockchain', 'SaaS',
  'E-Commerce', 'Gaming', 'Cybersecurity', 'Climate Tech', 'Web3', 'IoT',
];

const INTENTS = [
  { id: 'growth', icon: '🚀', label: 'Career Growth', sub: 'Level up my career' },
  { id: 'switch', icon: '🔁', label: 'Career Switch', sub: 'Changing fields' },
  { id: 'return', icon: '⏳', label: 'Returning', sub: 'After a break' },
  { id: 'freelance', icon: '💼', label: 'Freelancing', sub: 'Independent work' },
];

const GIG_TYPES = [
  { id: 'fulltime', label: 'Full-Time' },
  { id: 'parttime', label: 'Part-Time' },
  { id: 'contract', label: 'Contract' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'remote', label: 'Remote Only' },
  { id: 'hybrid', label: 'Hybrid' },
];

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    skills: [],
    experience: 'mid',
    careerIntent: '',
    interests: [],
    gigTypes: [],
  });

  const toggleSkill = (skill) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.includes(skill) ? current.skills.filter((entry) => entry !== skill) : [...current.skills, skill],
    }));
  };

  const toggleInterest = (interest) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest) ? current.interests.filter((entry) => entry !== interest) : [...current.interests, interest],
    }));
  };

  const toggleGigType = (gigType) => {
    setForm((current) => ({
      ...current,
      gigTypes: current.gigTypes.includes(gigType) ? current.gigTypes.filter((entry) => entry !== gigType) : [...current.gigTypes, gigType],
    }));
  };

  const handleFinish = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    login({ ...form, tier: 'Starter Tier', profileStrength: 45 });
    setLoading(false);
    navigate('/dashboard');
  };

  const stepTitles = ['Basic Info', 'Skills', 'Career Intent', 'Preferences'];

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
            <span className={styles.eyebrow}>Premium onboarding flow</span>
            <h1 className={styles.heroTitle}>
              Create your <span className={styles.accentText}>orbit</span>.
            </h1>
            <p className={styles.heroSub}>
              Set up a recruiter-ready profile in a few calm steps and let the platform tailor better gig matches from day one.
            </p>
          </div>

          <div className={styles.onboardSteps}>
            {stepTitles.map((title, index) => (
              <div
                key={title}
                className={`${styles.onboardStep} ${step > index + 1 ? styles.done : ''} ${step === index + 1 ? styles.current : ''}`}
              >
                <div className={styles.onboardStepNum}>
                  {step > index + 1 ? <Check size={14} /> : index + 1}
                </div>
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.authRight}>
          <div className={styles.authCard}>
            <div className={styles.stepIndicator}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`${styles.stepDot} ${step === item ? styles.active : ''} ${step > item ? styles.done : ''}`} />
              ))}
              <span className={styles.stepTitle}>Step {step} of 4</span>
            </div>

            {step > 1 && (
              <button className={styles.backBtn} onClick={() => setStep((current) => current - 1)}>
                <ArrowLeft size={14} /> Back
              </button>
            )}

            {step === 1 && (
              <>
                <h2 className={styles.authTitle}>Create account</h2>
                <p className={styles.authSub}>Welcome to a cleaner way to start your search.</p>
                <div className={styles.authForm}>
                  <div className={styles.twoCol}>
                    <div className={styles.formGroup}>
                      <label>Full Name</label>
                      <input placeholder="Alex Rivers" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Current Role</label>
                      <input placeholder="VP of Product" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Work Email</label>
                    <input type="email" placeholder="alex.rivers@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" placeholder="Create a secure password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Experience Level</label>
                    <select value={form.experience} onChange={(event) => setForm({ ...form, experience: event.target.value })}>
                      <option value="fresher">Fresher / Student</option>
                      <option value="junior">Junior (1-2 years)</option>
                      <option value="mid">Mid-Level (3-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                      <option value="lead">Lead / Principal</option>
                    </select>
                  </div>
                  <button className={styles.submitBtn} onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.password}>
                    Continue to Skills <ArrowRight size={16} />
                  </button>
                </div>
                <p className={styles.switchAuth}>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className={styles.authTitle}>Your Skills</h2>
                <p className={styles.authSub}>Select all that apply. These will directly shape your matching quality.</p>
                <div className={styles.skillGrid}>
                  {SKILLS.map((skill) => (
                    <button key={skill} className={`${styles.skillChip} ${form.skills.includes(skill) ? styles.selected : ''}`} onClick={() => toggleSkill(skill)}>
                      {form.skills.includes(skill) && <Check size={10} style={{ marginRight: 4 }} />}
                      {skill}
                    </button>
                  ))}
                </div>
                <button className={styles.submitBtn} style={{ marginTop: 20 }} onClick={() => setStep(3)} disabled={form.skills.length === 0}>
                  Continue ({form.skills.length} selected) <ArrowRight size={16} />
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className={styles.authTitle}>Career Intent</h2>
                <p className={styles.authSub}>What best describes where you are right now?</p>
                <div className={styles.intentGrid}>
                  {INTENTS.map((intent) => (
                    <button
                      key={intent.id}
                      className={`${styles.intentCard} ${form.careerIntent === intent.id ? styles.selected : ''}`}
                      onClick={() => setForm({ ...form, careerIntent: intent.id })}
                    >
                      <span className={styles.intentIcon}>{intent.icon}</span>
                      <span className={styles.intentLabel}>{intent.label}</span>
                      <span className={styles.intentSub}>{intent.sub}</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <label>Areas of Interest</label>
                  <div className={styles.skillGrid} style={{ marginTop: 8 }}>
                    {INTERESTS.map((interest) => (
                      <button key={interest} className={`${styles.skillChip} ${form.interests.includes(interest) ? styles.selected : ''}`} onClick={() => toggleInterest(interest)}>
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                <button className={styles.submitBtn} style={{ marginTop: 20 }} onClick={() => setStep(4)} disabled={!form.careerIntent}>
                  Continue <ArrowRight size={16} />
                </button>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className={styles.authTitle}>Gig Preferences</h2>
                <p className={styles.authSub}>Pick the work styles you want the matcher to prioritize.</p>
                <div className={styles.skillGrid}>
                  {GIG_TYPES.map((gigType) => (
                    <button key={gigType.id} className={`${styles.skillChip} ${form.gigTypes.includes(gigType.id) ? styles.selected : ''}`} onClick={() => toggleGigType(gigType.id)}>
                      {gigType.label}
                    </button>
                  ))}
                </div>
                <button className={styles.submitBtn} style={{ marginTop: 24 }} onClick={handleFinish} disabled={loading || form.gigTypes.length === 0}>
                  {loading ? <span className={styles.spinner} /> : <>Launch My Profile <ArrowRight size={16} /></>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
