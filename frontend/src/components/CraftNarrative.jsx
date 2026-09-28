import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Clock, Award } from 'lucide-react';
import './CraftNarrative.css';

const CRAFT_PHASES = [
  {
    phase: '01',
    code: 'GEO-DRAFT',
    title: 'Topography of Form',
    subheading: 'Architectural draping and internal structural scaffolding.',
    image: '/images/pexels-abhijith-ts-33843905-32856051.jpg',
    metric: '48H PATTERN GEOMETRY',
    details: [
      'Each silhouette begins not with illustration, but with direct sculptural draping on archival linen-and-wood mannequins.',
      'Internal steel-boned corsetry is hand-integrated between silk layers to provide an imperceptible architectural lift without stiffness.',
      'Angles are measured down to the millimeter to maintain an unbroken monolithic vertical axis.'
    ],
    accentDetail: 'Sculptural Bone Structure'
  },
  {
    phase: '02',
    code: 'METALLIC-WEFT',
    title: 'The Metallic Loom',
    subheading: 'Precision weaving with cold platinum and champagne wire.',
    image: '/images/pexels-artworkbyumair-15226347.jpg',
    metric: '320 GSM RAW SILK MIKADO',
    details: [
      'We commission custom handloom runs using pure Mulberry raw silk interlaced with flattened platinum silver thread.',
      'Unlike commercially dipped zari, our metallic filaments are cold-hammered, resulting in a restrained, icy gleam rather than brassy sheen.',
      'Only 1.5 meters of this bespoke textile can be manually constructed per artisan per day.'
    ],
    accentDetail: 'Cold-Hammered Platinum Wire'
  },
  {
    phase: '03',
    code: 'MICRO-STITCH',
    title: 'The 180-Hour Needle',
    subheading: 'Invisible blind-hemming and hand-placed architectural embellishment.',
    image: '/images/pexels-amodita-s-frame-485464413-33225585.jpg.jpg',
    metric: '180+ ARTISANAL HOURS',
    details: [
      'Every seam is hand-finished with double silk blind-stitching, leaving zero raw edges and creating an unbroken garment interior.',
      'Micro-crystals and graphite tube beads are individually counted and locked into the weave to create directional light refraction.',
      'Master embroiderers work in climate-controlled ateliers to prevent moisture transfer to delicate raw silks.'
    ],
    accentDetail: 'Double Silk Blind-Hemming'
  },
  {
    phase: '04',
    code: 'ARCHIVAL-CURE',
    title: 'The Cold Finish & Seal',
    subheading: 'High-pressure sculpting and bespoke archival casing.',
    image: '/images/pexels-saurabh-chakraborty-214986446-12567318.jpg',
    metric: 'ARCHIVAL GRADE PRESERVATION',
    details: [
      'Completed pieces undergo a calibrated cool-steam pressing to permanently lock the architectural drape and drape memory.',
      'Each creation receives an embossed brass authenticity plaque carrying its unique serial archive index.',
      'Enclosed in acid-free Japanese archival paper within our signature obsidian monolith presentation box.'
    ],
    accentDetail: 'Obsidian Archival Casing'
  }
];

const CraftNarrative = ({ onOpenConsultation }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const activePhase = CRAFT_PHASES[activePhaseIndex];

  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5500);
  }, []);

  const handleNextPhase = useCallback(() => {
    setActivePhaseIndex((prev) => (prev + 1) % CRAFT_PHASES.length);
  }, []);

  // Self-advancing Craft phase sequence
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNextPhase();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, handleNextPhase]);

  return (
    <section
      className="craft-narrative-section"
      id="craft-narrative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseAutoAdvance}
    >
      {/* Background Cinematic Visual */}
      <div className="craft-backdrop-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={activePhase.image}
            src={activePhase.image}
            alt={activePhase.title}
            className="craft-backdrop-img"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.38, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="craft-film-grain-overlay" />
        <div className="craft-gradient-scrim" />
      </div>

      <div className="couture-container craft-content-wrap">
        {/* Header Bar */}
        <div className="craft-top-meta">
          <div className="maison-label">Behind The Form</div>
          <div className="craft-counter">
            <span className="current-phase-num">PHASE {activePhase.phase}</span>
            <span className="phase-slash">/</span>
            <span className="total-phases">04</span>
          </div>
        </div>

        {/* Phase Navigator Scrub Bar */}
        <div className="craft-scrub-bar">
          {CRAFT_PHASES.map((p, idx) => (
            <button
              key={p.phase}
              className={`craft-scrub-tab ${activePhaseIndex === idx ? 'tab-active' : ''}`}
              onClick={() => { pauseAutoAdvance(); setActivePhaseIndex(idx); }}
            >
              <span className="tab-code">{p.code}</span>
              <span className="tab-title">{p.title}</span>
              <div className="tab-line-progress" />
            </button>
          ))}
        </div>

        {/* Active Stage Narrative Card */}
        <div className="craft-stage-grid">
          <motion.div
            key={activePhase.phase}
            className="craft-narrative-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="craft-badge-row">
              <span className="craft-metric-pill">
                <Clock size={13} />
                <span>{activePhase.metric}</span>
              </span>
              <span className="craft-accent-pill">{activePhase.accentDetail}</span>
            </div>

            <h2 className="craft-stage-heading">{activePhase.title}</h2>
            <p className="craft-stage-subheading">{activePhase.subheading}</p>

            <div className="craft-bullets-list">
              {activePhase.details.map((detail, dIdx) => (
                <div key={dIdx} className="craft-bullet-item">
                  <div className="bullet-num">0{dIdx + 1}</div>
                  <p className="bullet-text">{detail}</p>
                </div>
              ))}
            </div>

            <div className="craft-cta-row">
              <button
                className="btn-couture-primary"
                onClick={() => {
                  const next = (activePhaseIndex + 1) % CRAFT_PHASES.length;
                  setActivePhaseIndex(next);
                }}
              >
                <span>NEXT PHASE ({activePhaseIndex === 3 ? '01' : `0${activePhaseIndex + 2}`})</span>
                <ChevronRight size={16} />
              </button>

              {onOpenConsultation && (
                <button
                  className="btn-couture-outline"
                  onClick={onOpenConsultation}
                >
                  <span>INQUIRE ATELIER</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Architectural Spec Card */}
          <div className="craft-side-specs">
            <div className="side-spec-box">
              <div className="spec-box-header">
                <Award size={16} className="spec-award-icon" />
                <span>CERTIFIED COUTURE PROTOCOL</span>
              </div>
              <p className="spec-box-body">
                Every bespoke piece fabricated under the Cold Couture banner satisfies strict dimensional tolerances. We enforce a zero-synthetic rule across all structural linings, interfacings, and hand embroidery threads.
              </p>
              
              <div className="spec-meta-grid">
                <div className="meta-cell">
                  <span className="m-label">PRIMARY ORIGIN</span>
                  <span className="m-value">HYDERABAD ATELIER</span>
                </div>
                <div className="meta-cell">
                  <span className="m-label">HANDLOOM REGION</span>
                  <span className="m-value">VARANASI & CHANDERI</span>
                </div>
                <div className="meta-cell">
                  <span className="m-label">THREAD COMPOSITION</span>
                  <span className="m-value">100% PURE MULBERRY</span>
                </div>
                <div className="meta-cell">
                  <span className="m-label">METALLIC CONTENT</span>
                  <span className="m-value">CERTIFIED SILVER ZARI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftNarrative;
