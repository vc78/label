import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import './EditorialLookbook.css';

const LOOKS = [
  {
    lookNumber: '01',
    edition: 'SÉRIE NOIRE',
    title: 'The Monolith Void Silhouette',
    subtitle: 'High-density Mulberry raw silk paired with razor-tailored corsetry.',
    image: '/images/hero_slide_1.jpg',
    productId: 'saree-1',
    modelStats: '178 CM · 32-24-35 · BESPOKE SIZE 38',
    composition: '100% Raw Katan Silk · Antique Icy Zari',
    accentNotes: 'Zero embellishment, maximum line tension'
  },
  {
    lookNumber: '02',
    edition: 'SÉRIE VAPEUR',
    title: 'Liquid Platinum Organza',
    subtitle: 'Micro-woven tissue organza creating an ethereal cold aura.',
    image: '/images/i2.png',
    productId: 'saree-2',
    modelStats: '180 CM · 33-24-36 · EDITORIAL FLUTE',
    composition: 'Tissue Silk Organza · Hand-Dyed Slate',
    accentNotes: 'Light refraction across translucent pleating'
  },
  {
    lookNumber: '03',
    edition: 'SÉRIE GÉOMÉTRIE',
    title: 'Minimalist Chanderi Structure',
    subtitle: 'Cold silver weft tailored with crisp geometric precision.',
    image: '/images/i3.png',
    productId: 'saree-3',
    modelStats: '176 CM · 32-25-34 · STANDARD FIT',
    composition: 'Silk Chanderi · Cold Pressed Zari',
    accentNotes: 'Two-piece architectural separates'
  },
  {
    lookNumber: '04',
    edition: 'SÉRIE CRISTAL',
    title: 'Architectural Flute Bridal',
    subtitle: 'Sculptural Mikado skirt engineered with 220 hours of needlework.',
    image: '/images/i4.png',
    productId: 'lehenga-1',
    modelStats: '179 CM · 34-25-36 · BESPOKE CORSETRY',
    composition: 'Raw Mikado · Hand-Hammered Zardozi',
    accentNotes: 'Sculpted internal bone support'
  },
  {
    lookNumber: '05',
    edition: 'SÉRIE CINÉTIQUE',
    title: 'Asymmetrical Nocturne Cape',
    subtitle: 'Knife-pleated flowing silhouette engineered for dramatic kinetic motion.',
    image: '/images/i5.png',
    productId: 'coord-2',
    modelStats: '177 CM · 32-24-35 · DRAPED ARCHIVE',
    composition: 'Matte Georgette · Liquid Satin Trim',
    accentNotes: 'Detachable shoulder sweep'
  }
];

const EditorialLookbook = ({ onProductClick }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const look = LOOKS[activeLookIndex];

  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  const handleNext = useCallback(() => {
    setActiveLookIndex((prev) => (prev + 1) % LOOKS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveLookIndex((prev) => (prev - 1 + LOOKS.length) % LOOKS.length);
  }, []);

  // Self-scrolling Lookbook carousel effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      className="editorial-lookbook-section"
      id="lookbook"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseAutoAdvance}
    >
      <div className="couture-container">
        {/* Lookbook Header */}
        <div className="lookbook-top-flex">
          <div>
            <div className="maison-label">Campaign Visuals 2026</div>
            <h2 className="lookbook-title">Editorial Lookbook</h2>
            <p className="lookbook-desc">
              A cinematic photographic study in volume, light absorption, and architectural proportion. Drag or step through the campaign looks.
            </p>
          </div>

          <div className="lookbook-controls-cluster">
            <span className="lookbook-counter-display">
              LOOK {look.lookNumber} <span className="counter-sep">/</span> 0{LOOKS.length}
            </span>
            <div className="lookbook-btn-group">
              <button
                onClick={() => { pauseAutoAdvance(); handlePrev(); }}
                className="lookbook-nav-btn touch-target"
                aria-label="Previous Look"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => { pauseAutoAdvance(); handleNext(); }}
                className="lookbook-nav-btn touch-target"
                aria-label="Next Look"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Editorial Spread */}
        <div className="lookbook-stage">
          <motion.div
            key={look.lookNumber}
            className="editorial-spread-grid"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {/* Visual Canvas */}
            <div className="spread-media-col" onClick={() => onProductClick?.(look)}>
              <div className="spread-image-wrapper">
                <img
                  src={look.image}
                  alt={look.title}
                  className="spread-img"
                  loading="lazy"
                />
                <div className="spread-vignette" />

                {/* Overlaid Edition Tag */}
                <div className="spread-edition-badge">
                  <span>{look.edition}</span>
                  <span className="badge-sep">·</span>
                  <span>LOOK {look.lookNumber}</span>
                </div>
              </div>
            </div>

            {/* Dossier Meta Column */}
            <div className="spread-dossier-col">
              <div className="dossier-top">
                <div className="dossier-edition-num">{look.edition}</div>
                <h3 className="dossier-title">{look.title}</h3>
                <p className="dossier-subtitle">{look.subtitle}</p>
              </div>

              {/* Technical Proportions & Attributes */}
              <div className="dossier-specs-box">
                <div className="dossier-spec-row">
                  <span className="d-label">PROPORTIONS</span>
                  <span className="d-val">{look.modelStats}</span>
                </div>
                <div className="dossier-spec-row">
                  <span className="d-label">COMPOSITION</span>
                  <span className="d-val">{look.composition}</span>
                </div>
                <div className="dossier-spec-row">
                  <span className="d-label">FORM FOCUS</span>
                  <span className="d-val">{look.accentNotes}</span>
                </div>
              </div>

              {/* Quick Lookbook Selector Rails */}
              <div className="lookbook-thumbnail-rail">
                {LOOKS.map((item, idx) => (
                  <div
                    key={item.lookNumber}
                    className={`thumb-card ${activeLookIndex === idx ? 'thumb-active' : ''}`}
                    onClick={() => setActiveLookIndex(idx)}
                  >
                    <img src={item.image} alt={item.title} className="thumb-img" />
                    <span className="thumb-idx">{item.lookNumber}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                className="btn-couture-primary acquire-look-btn touch-target"
                onClick={() => onProductClick?.(look)}
              >
                <span>ACQUIRE COMPLETE LOOK</span>
                <ArrowUpRight size={17} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditorialLookbook;
