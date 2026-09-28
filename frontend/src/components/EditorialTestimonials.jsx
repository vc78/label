import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import './EditorialTestimonials.css';

const EDITORIAL_TESTIMONIALS = [
  {
    id: 't-1',
    quotePart1: "“The Monolith Raw Silk drape possesses a gravity that standard bridal boutiques simply cannot engineer. It feels architectural, strict in its line, yet ",
    quoteHighlight: "breathtakingly fluid",
    quotePart2: " when walking down the aisle.”",
    author: "ANANYA DESHMUKH",
    title: "PRIVATE COUTURE PATRON",
    occasion: "Nocturne Reception · Mumbai · London",
    edition: "COMMISSION ARCHIVE #0421",
    modelImage: "/images/pexels-amodita-s-frame-485464413-33225585.jpg.jpg"
  },
  {
    id: 't-2',
    quotePart1: "“Sahithi’s restraint with metallic wire is what sets the ",
    quoteHighlight: "Maison apart",
    quotePart2: ". There is no gaudy yellow gold here — only an icy, moonlit platinum sheen that looks extraordinary under architectural evening lighting.”",
    author: "DEVIKA SINGHANIA",
    title: "FASHION FEATURES DIRECTOR",
    occasion: "Venice Biennale Gala Ensemble · Milan · New Delhi",
    edition: "COMMISSION ARCHIVE #0389",
    modelImage: "/images/pexels-amodita-s-frame-485464413-33225585.jpg.jpg"
  },
  {
    id: 't-3',
    quotePart1: "“The laser-measured bespoke fit was so precise that our international bridal fitting required zero alterations. The internal boning distributes weight so evenly that the ",
    quoteHighlight: "180-hour zardozi skirt",
    quotePart2: " floats effortlessly throughout the gala.”",
    author: "ZOYA AL-MANSOOR",
    title: "INTERNATIONAL TROUSSEAU COLLECTOR",
    occasion: "Bespoke Royal Sangeet · Dubai · Hyderabad",
    edition: "COMMISSION ARCHIVE #0514",
    modelImage: "/images/pexels-amodita-s-frame-485464413-33225585.jpg.jpg"
  }
];

const EditorialTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Devika Singhania matching the design reference
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const current = EDITORIAL_TESTIMONIALS[activeIndex];

  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EDITORIAL_TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EDITORIAL_TESTIMONIALS.length) % EDITORIAL_TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const activeNumStr = String(activeIndex + 1).padStart(2, '0');
  const totalNumStr = String(EDITORIAL_TESTIMONIALS.length).padStart(2, '0');

  return (
    <section
      className="patron-reviews-luxury-section"
      id="patron-voices"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseAutoAdvance}
    >
      {/* Background Architectural Scrim & Model */}
      <div className="reviews-backdrop-container">
        <div className="reviews-ambient-warmth" />
        <div className="reviews-model-stage">
          <img
            src={current.modelImage}
            alt="Haute Couture Patron Experience"
            className="reviews-model-photo"
          />
          <div className="reviews-model-vignette" />
        </div>
      </div>

      <div className="couture-container reviews-content-container">
        {/* Top Header Row with Counter and Circular Steppers */}
        <div className="reviews-header-bar">
          <div className="reviews-category-badge">
            <span className="sparkle-gold">✦</span>
            <span>PATRON TESTIMONIALS & CRITICAL VOICES</span>
          </div>

          <div className="reviews-top-controls">
            <span className="reviews-counter-text">
              {activeNumStr} / {totalNumStr}
            </span>
            <div className="reviews-top-arrow-pair">
              <button
                onClick={() => { pauseAutoAdvance(); handlePrev(); }}
                className="top-circle-arrow top-arrow-prev"
                aria-label="Previous patron review"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => { pauseAutoAdvance(); handleNext(); }}
                className="top-circle-arrow top-arrow-next active-gold-arrow"
                aria-label="Next patron review"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage with Left Vertical Indicator & Floating Testimonial Card */}
        <div className="reviews-main-stage">
          {/* Left Vertical Indicator Track */}
          <div className="reviews-vertical-indicator" aria-hidden="true">
            <span className="v-num v-active">{activeNumStr}</span>
            <span className="v-line" />
            <span className="v-num v-total">{totalNumStr}</span>
          </div>

          {/* Central Luxury Floating Card */}
          <div className="reviews-card-wrapper">
            {/* Left Chevron Button intersecting Card edge */}
            <button
              onClick={() => { pauseAutoAdvance(); handlePrev(); }}
              className="card-side-chevron side-chevron-left touch-target"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Chevron Button intersecting Card edge */}
            <button
              onClick={() => { pauseAutoAdvance(); handleNext(); }}
              className="card-side-chevron side-chevron-right touch-target"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                className="reviews-floating-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Gold Quotation Icon */}
                <div className="reviews-quote-icon" aria-hidden="true">
                  <svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor">
                    <path d="M0 16.25C0 7.25 5.5 1.5 13.5 0l2 3.5C10 5 8 8 7.5 11.5H14V26H0V16.25zM18 16.25C18 7.25 23.5 1.5 31.5 0l2 3.5c-5.5 1.5-7.5 4.5-8 8H32V26H18V16.25z" />
                  </svg>
                </div>

                {/* Editorial Quote Body */}
                <blockquote className="reviews-quote-body">
                  {current.quotePart1}
                  <span className="quote-highlight-italic">{current.quoteHighlight}</span>
                  {current.quotePart2}
                </blockquote>

                {/* Ornamental Fleur / Diamond Divider */}
                <div className="reviews-fleur-divider" aria-hidden="true">
                  <span className="fleur-glyph">❖</span>
                </div>

                {/* Patron Dossier Footer */}
                <div className="reviews-patron-footer">
                  <div className="patron-identity-block">
                    <h3 className="patron-author-name">{current.author}</h3>
                    <div className="patron-author-role">{current.title}</div>
                    <div className="patron-author-meta">{current.occasion}</div>
                  </div>

                  <div className="patron-archive-badge">
                    <ShieldCheck size={14} className="badge-shield-icon" />
                    <span>{current.edition}</span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Bottom Dashes Pagination Indicator */}
            <div className="reviews-dash-track" role="tablist" aria-label="Review pagination">
              {EDITORIAL_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  className={`dash-pill ${activeIndex === idx ? 'dash-active' : ''}`}
                  onClick={() => { pauseAutoAdvance(); setActiveIndex(idx); }}
                  aria-label={`Go to slide ${idx + 1}`}
                  role="tab"
                  aria-selected={activeIndex === idx}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Golden Arch Curve with Bottom Center Emblem */}
        <div className="reviews-bottom-arch" aria-hidden="true">
          <div className="arch-curve-line" />
          <div className="arch-center-emblem">✦</div>
        </div>
      </div>
    </section>
  );
};

export default EditorialTestimonials;
