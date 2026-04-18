import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockGigs, whyNotYouFeedback } from '../data/mockData';
import {
  X,
  Heart,
  Zap,
  Info,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Star,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import styles from './Discover.module.css';

const categoryAccent = {
  Engineering: { tone: '#7c3aed', soft: 'rgba(124, 58, 237, 0.10)' },
  Design: { tone: '#06b6d4', soft: 'rgba(6, 182, 212, 0.10)' },
  Marketing: { tone: '#f59e0b', soft: 'rgba(245, 158, 11, 0.10)' },
  Blockchain: { tone: '#10b981', soft: 'rgba(16, 185, 129, 0.10)' },
  DevOps: { tone: '#8b5cf6', soft: 'rgba(139, 92, 246, 0.10)' },
};

export default function Discover() {
  const { addMatch, addPass, setShowWhyNotModal, setCurrentWhyNotGig } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeExit, setSwipeExit] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filter, setFilter] = useState('all');
  const [dragState, setDragState] = useState({ x: 0, y: 0, active: false });
  const dragStart = useRef(null);
  const cardRef = useRef(null);

  const filters = ['all', 'Engineering', 'Design', 'Marketing', 'Blockchain', 'DevOps'];

  const filteredGigs = filter === 'all'
    ? mockGigs
    : mockGigs.filter((gig) => gig.category === filter);

  const currentGig = filteredGigs[currentIndex];
  const nextGig = filteredGigs[currentIndex + 1];
  const farGig = filteredGigs[currentIndex + 2];
  const isDone = currentIndex >= filteredGigs.length;
  const accent = categoryAccent[currentGig?.category] || categoryAccent.Engineering;

  const resetDrag = () => {
    dragStart.current = null;
    setDragState({ x: 0, y: 0, active: false });
  };

  const commitSwipe = (dir, origin = { x: 0, y: 0 }) => {
    if (!currentGig) return;
    dragStart.current = null;
    setDragState({ x: origin.x, y: origin.y, active: false });
    setSwipeExit({ dir, x: origin.x, y: origin.y });
    window.setTimeout(() => {
      if (dir === 'right') {
        addMatch(currentGig);
      } else {
        addPass(currentGig);
      }
      setSwipeExit(null);
      setDragState({ x: 0, y: 0, active: false });
      setShowDetail(false);
      setCurrentIndex((index) => index + 1);
    }, 320);
  };

  const handleSwipe = (dir) => {
    commitSwipe(dir, { x: 0, y: 0 });
  };

  const handleWhyNot = () => {
    setCurrentWhyNotGig(currentGig);
    setShowWhyNotModal(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      setShowDetail(false);
      resetDrag();
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredGigs.length - 1) {
      setCurrentIndex((index) => index + 1);
      setShowDetail(false);
      resetDrag();
    }
  };

  const handlePointerDown = (event) => {
    if (!currentGig || swipeExit) return;
    dragStart.current = { x: event.clientX, y: event.clientY };
    cardRef.current?.setPointerCapture?.(event.pointerId);
    setDragState({ x: 0, y: 0, active: true });
  };

  const handlePointerMove = (event) => {
    if (!dragStart.current || swipeExit) return;
    const x = event.clientX - dragStart.current.x;
    const y = event.clientY - dragStart.current.y;
    setDragState({ x, y, active: true });
  };

  const handlePointerUp = () => {
    if (!dragStart.current) return;
    if (Math.abs(dragState.x) > 110) {
      commitSwipe(dragState.x > 0 ? 'right' : 'left', { x: dragState.x, y: dragState.y });
      return;
    }
    resetDrag();
  };

  const swipeOpacity = Math.min(Math.abs(dragState.x) / 120, 1);
  const cardTransform = swipeExit
    ? `translateX(${swipeExit.dir === 'right' ? 920 : -920}px) translateY(${swipeExit.y * 0.18}px) rotate(${swipeExit.dir === 'right' ? 22 : -22}deg) scale(1.01)`
    : dragState.active
      ? `translateX(${dragState.x}px) translateY(${dragState.y * 0.12}px) rotate(${dragState.x / 18}deg) scale(1.015)`
      : undefined;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Discover Gigs</h1>
          <p className={styles.sub}>Swipe with confidence. Every card is tuned for clarity in seconds.</p>
        </div>
        <div className={styles.progress}>
          <span className={styles.progressText}>{Math.min(currentIndex + 1, filteredGigs.length)} / {filteredGigs.length}</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${filteredGigs.length ? ((currentIndex + 1) / filteredGigs.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item}
            className={`${styles.filterBtn} ${filter === item ? styles.active : ''}`}
            onClick={() => {
              setFilter(item);
              setCurrentIndex(0);
              setShowDetail(false);
              resetDrag();
            }}
          >
            {item === 'all' ? 'All Gigs' : item}
          </button>
        ))}
      </div>

      <div className={styles.swipeLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.cardArea}>
            {isDone ? (
            <div className={styles.doneCard}>
              <div className={styles.doneEmoji}>🎉</div>
              <h2 className={styles.doneTitle}>You&apos;ve seen all gigs</h2>
              <p className={styles.doneSub}>Reset the deck or switch categories to keep exploring high-fit roles.</p>
              <button className={styles.resetBtn} onClick={() => { setCurrentIndex(0); setFilter('all'); }}>
                Start Over
              </button>
            </div>
          ) : (
            <div className={styles.cardStack}>
              {farGig && <div className={styles.bgCard2} />}
              {nextGig && <div className={styles.bgCard1} />}

              <div
                ref={cardRef}
                className={`${styles.gigCard} ${dragState.active ? styles.dragging : ''} ${swipeExit ? styles.exiting : ''}`}
                style={{
                  transform: cardTransform,
                  '--accent': accent.tone,
                  '--accentSoft': accent.soft,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <div
                  className={`${styles.swipeIndicator} ${styles.likeIndicator} ${(swipeExit?.dir === 'right' || dragState.x > 30) ? styles.show : ''}`}
                  style={{ opacity: swipeExit?.dir === 'right' ? 1 : dragState.x > 0 ? swipeOpacity : 0 }}
                >
                  Interested
                </div>
                <div
                  className={`${styles.swipeIndicator} ${styles.passIndicator} ${(swipeExit?.dir === 'left' || dragState.x < -30) ? styles.show : ''}`}
                  style={{ opacity: swipeExit?.dir === 'left' ? 1 : dragState.x < 0 ? swipeOpacity : 0 }}
                >
                  Skip
                </div>

                <div className={styles.cardHeader}>
                  <div className={styles.cardIdentity}>
                    <div className={styles.cardIcon}>{currentGig.icon}</div>
                    <div>
                      <div className={styles.cardEyebrow}>{currentGig.category}</div>
                      <h2 className={styles.cardTitle}>{currentGig.title}</h2>
                      <p className={styles.cardCompany}>{currentGig.company}</p>
                    </div>
                  </div>

                  <div className={styles.cardHeaderRight}>
                    {currentGig.fastTrack && (
                      <span className={styles.fastTrack}><Zap size={12} /> Fast Track</span>
                    )}
                    <div className={styles.matchScore}>
                      <Star size={12} />
                      <span>{currentGig.matchScore}% Match</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTags}>
                    {currentGig.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                      <TrendingUp size={14} />
                      <span>{currentGig.salary}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <Clock size={14} />
                      <span>{currentGig.duration}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <Users size={14} />
                      <span>{currentGig.teamSize}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <MapPin size={14} />
                      <span>{currentGig.remote ? 'Remote friendly' : 'On-site'}</span>
                    </div>
                  </div>

                  <p className={styles.cardDesc}>{currentGig.description}</p>

                  <div className={styles.skillsRow}>
                    {currentGig.skills.map((skill) => (
                      <span key={skill} className={styles.skillChip}>{skill}</span>
                    ))}
                  </div>

                  {showDetail && (
                    <div className={styles.cardDetail}>
                      <div className={styles.detailBlock}>
                        <span className={styles.detailLabel}>Business impact</span>
                        <strong>{currentGig.impact}</strong>
                      </div>
                      {currentGig.fastTrack && (
                        <div className={styles.fastTrackMsg}>
                          <Zap size={13} /> {currentGig.fastTrackMsg}
                        </div>
                      )}
                    </div>
                  )}

                  <button className={styles.detailToggle} onClick={() => setShowDetail(!showDetail)}>
                    <Info size={13} />
                    {showDetail ? 'Hide details' : 'View details'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isDone && (
          <div className={styles.actions}>
              <button className={styles.navBtn} onClick={handlePrev} disabled={currentIndex === 0}>
                <ChevronLeft size={18} />
              </button>

              <button className={styles.passBtn} onClick={() => handleSwipe('left')}>
                <X size={24} />
              </button>

              <button className={styles.whyNotBtn} onClick={handleWhyNot}>
                <Info size={16} />
                <span>Why not me?</span>
              </button>

              <button className={styles.matchBtn} onClick={() => handleSwipe('right')}>
                <Heart size={24} />
              </button>

              <button className={styles.navBtn} onClick={handleNext} disabled={currentIndex >= filteredGigs.length - 1}>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {!isDone && (
          <aside className={styles.sidePanel}>
            <div className={styles.sideCard}>
              <span className={styles.sideLabel}>Swipe tip</span>
              <h3>Drag the card or use the controls below.</h3>
              <p>Right shows intent, left clears the queue, and “Why not me?” gives instant coaching.</p>
            </div>
            <div className={styles.sideCard}>
              <span className={styles.sideLabel}>Current fit</span>
              <div className={styles.fitRow}>
                <strong>{currentGig.matchScore}%</strong>
                <span>{currentGig.type}</span>
              </div>
              <div className={styles.sideProgress}>
                <div className={styles.sideProgressFill} style={{ width: `${currentGig.matchScore}%` }} />
              </div>
            </div>
          </aside>
        )}
      </div>

      <WhyNotModal />
    </div>
  );
}

function WhyNotModal() {
  const { showWhyNotModal, setShowWhyNotModal, currentWhyNotGig } = useApp();
  if (!showWhyNotModal || !currentWhyNotGig) return null;

  return (
    <div className={styles.modalOverlay} onClick={() => setShowWhyNotModal(false)}>
      <div className={styles.whyNotModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.whyNotHeader}>
          <div>
            <span className={styles.whyNotKicker}>AI feedback</span>
            <h3 className={styles.whyNotTitle}>Why not you, yet?</h3>
            <p className={styles.whyNotSub}>{currentWhyNotGig.title} at {currentWhyNotGig.company}</p>
          </div>
        </div>

        <div className={styles.chatBlock}>
          <div className={styles.chatBubble}>
            <AlertCircle size={16} />
            <div>
              <strong>Missing signals</strong>
              <p>This role wants clearer proof around core platform skills and seniority depth.</p>
            </div>
          </div>
          <div className={styles.tagList}>
            {whyNotYouFeedback.missingSkills.map((skill) => (
              <span key={skill} className={styles.missingTag}>{skill}</span>
            ))}
          </div>
        </div>

        <div className={styles.chatBlock}>
          <div className={`${styles.chatBubble} ${styles.successBubble}`}>
            <Sparkles size={16} />
            <div>
              <strong>Best next moves</strong>
              <p>These actions will create the fastest visible lift in your match quality.</p>
            </div>
          </div>
          <div className={styles.improvementList}>
            {whyNotYouFeedback.improvements.map((improvement, index) => (
              <div key={index} className={styles.improvementItem}>
                <div className={styles.improvementIcon}>
                  <CheckCircle2 size={14} />
                </div>
                <div className={styles.improvementContent}>
                  <div className={styles.improvementAction}>{improvement.action}</div>
                  <div className={styles.improvementMeta}>
                    <span className={styles.timeframe}>{improvement.timeframe}</span>
                    <span className={styles.impact}>{improvement.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.closeWhyNot} onClick={() => setShowWhyNotModal(false)}>
          Got it, I&apos;ll improve
        </button>
      </div>
    </div>
  );
}
