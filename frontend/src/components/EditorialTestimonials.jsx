import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import './EditorialTestimonials.css';

const EDITORIAL_TESTIMONIALS = [
  {
    id: 't-1',
    quote: "“The Monolith Raw Silk drape possesses a gravity that standard bridal boutiques simply cannot engineer. It feels architectural, strict in its line, yet breathtakingly fluid when walking.”",
    author: "Ananya Deshmukh",
    title: "Private Couture Patron",
    occasion: "Nocturne Reception, Mumbai",
    edition: "COMMISSION ARCHIVE #0421",
    location: "Mumbai · London"
  },
  {
    id: 't-2',
    quote: "“Sahithi’s restraint with metallic wire is what sets the Maison apart. There is no gaudy yellow gold here—only an icy, moonlit platinum sheen that looks extraordinary under architectural evening lighting.”",
    author: "Devika Singhania",
    title: "Fashion Features Director",
    occasion: "Venice Biennale Gala Ensemble",
    edition: "COMMISSION ARCHIVE #0389",
    location: "Milan · New Delhi"
  },
  {
    id: 't-3',
    quote: "“The laser-measured bespoke fit was so precise that our international bridal fitting required zero alterations. The internal boning distributes weight so evenly that the 180-hour zardozi skirt floats effortlessly.”",
    author: "Zoya Al-Mansoor",
    title: "International Trousseau Collector",
    occasion: "Bespoke Royal Sangeet",
    edition: "COMMISSION ARCHIVE #0514",
    location: "Dubai · Hyderabad"
  }
];

const EditorialTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const current = EDITORIAL_TESTIMONIALS[activeIndex];

  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5500);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EDITORIAL_TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EDITORIAL_TESTIMONIALS.length) % EDITORIAL_TESTIMONIALS.length);
  }, []);

  // Self-advancing Testimonials carousel effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      className="editorial-testimonials-section"
      id="patron-voices"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseAutoAdvance}
    >
      <div className="couture-container">
        <div className="testimonials-top-bar">
          <div className="maison-label">Patron Testimonials & Critical Voices</div>
          <div className="testimonials-index">
            <span>VOICE 0{activeIndex + 1}</span>
            <span className="t-sep">/</span>
            <span>0{EDITORIAL_TESTIMONIALS.length}</span>
          </div>
        </div>

        <div className="testimonial-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="testimonial-monolith-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="quote-mark-box">
                <Quote size={32} />
              </div>

              <blockquote className="monolith-quote-text">
                {current.quote}
              </blockquote>

              <div className="patron-dossier-row">
                <div className="patron-info">
                  <h4 className="patron-name">{current.author}</h4>
                  <p className="patron-role">{current.title}</p>
                  <p className="patron-occasion">{current.occasion} · {current.location}</p>
                </div>

                <div className="patron-verified-seal">
                  <ShieldCheck size={16} />
                  <span>{current.edition}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Controls */}
          <div className="testimonials-stepper">
            <div className="stepper-dots">
              {EDITORIAL_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  className={`dot-bar ${activeIndex === idx ? 'dot-active' : ''}`}
                  onClick={() => { pauseAutoAdvance(); setActiveIndex(idx); }}
                  aria-label={`Jump to review 0${idx + 1}`}
                />
              ))}
            </div>

            <div className="stepper-nav-arrows">
              <button
                onClick={() => { pauseAutoAdvance(); handlePrev(); }}
                className="step-btn touch-target"
                aria-label="Previous patron review"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => { pauseAutoAdvance(); handleNext(); }}
                className="step-btn touch-target"
                aria-label="Next patron review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialTestimonials;
