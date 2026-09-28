import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Scissors, ChevronLeft, ChevronRight } from 'lucide-react';
import './CinematicHero.css';

const HERO_SLIDES = [
  {
    id: 'winter-editions',
    image: '/images/hero_slide_1.jpg',
    badge: 'DIGITAL COUTURE HOUSE · ARCHIVE 2026.IV · HYDERABAD',
    title: 'COLD COUTURE',
    subtitle: 'THE WINTER EDITIONS',
    description:
      'Architectural purity sculpted in monolithic raw silks, icy platinum silver filaments, and unembellished geometric contours. A quiet defiance of conventional luxury.',
    primaryCta: 'EXPLORE SILHOUETTES',
    secondaryCta: 'ENTER DIGITAL ATELIER'
  },
  {
    id: 'platinum-zari',
    image: '/images/hero_slide_2.jpg',
    badge: 'HAUTE COUTURE ARCHIVE · BESPOKE SAREES · JUBILEE HILLS',
    title: 'PLATINUM ZARI',
    subtitle: 'THE ARTISANAL WEAVE',
    description:
      'Cold-hammered metallic filaments interlaced with 100% pure mulberry silk. Hand-embroidered masterworks conceived by royal master craftsmen.',
    primaryCta: 'EXPLORE SILHOUETTES',
    secondaryCta: 'ENTER DIGITAL ATELIER'
  },
  {
    id: 'silk-sanctuary',
    image: '/images/hero_slide_3.jpg',
    badge: 'PRIVATE ATELIER SALON · VIRTUAL FITTINGS · WORLDWIDE',
    title: 'SILK SANCTUARY',
    subtitle: 'ARCHITECTURAL SILHOUETTES',
    description:
      'Millimeter-calibrated laser measurements crafted for royal trousseaus and global galas. Quiet grandeur and structural majesty redefined.',
    primaryCta: 'EXPLORE SILHOUETTES',
    secondaryCta: 'ENTER DIGITAL ATELIER'
  }
];

const CinematicHero = ({ onExploreSilhouettes, onOpenAtelier }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const pauseAutoPlayTemporarily = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5200);

    return () => clearInterval(timerRef.current);
  }, [isPaused, nextSlide]);

  // Cursor-responsive parallax tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth < 1024) return;

      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      setMouseOffset({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y))
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    document.getElementById('editorial-rail')?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="cinematic-hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={pauseAutoPlayTemporarily}
      aria-label="Couture Hero Carousel"
    >
      {/* 1. Background Visual Carousel with Ken-Burns and Crossfade */}
      <div className="hero-carousel-viewport">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.id}
            className="hero-slide-frame"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseOffset.x * -12,
              y: mouseOffset.y * -8
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.6, ease: 'easeOut' },
              x: { duration: 0.2 },
              y: { duration: 0.2 }
            }}
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="hero-slide-img"
              loading="eager"
            />
            {/* Luminous Warm Light Scrim */}
            <div className="hero-slide-luminous-scrim" />
            <div className="hero-top-vignette" />
            <div className="hero-bottom-vignette" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Interactive Navigation Chevrons (Hover to reveal) */}
      <button
        className="hero-nav-arrow hero-prev-arrow touch-target"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="hero-nav-arrow hero-next-arrow touch-target"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* 3. Foreground Editorial Content Stage */}
      <div
        className="hero-content-stage"
        style={{
          transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 6}px, 0)`
        }}
      >
        <div className="couture-container hero-container-layout">
          <div className="hero-editorial-dossier">
            {/* Top Monogram Tag Badge */}
            <motion.div
              key={`badge-${activeSlide.id}`}
              className="hero-monogram-tag"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-geo-dot" />
              <span className="hero-archive-text">{activeSlide.badge}</span>
            </motion.div>

            {/* Monolithic Title & Italic Subtitle */}
            <motion.div
              key={`titles-${activeSlide.id}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-monolith-title">{activeSlide.title}</h1>
              <span className="hero-title-subscript">{activeSlide.subtitle}</span>
            </motion.div>

            {/* Editorial Manifesto Description */}
            <motion.p
              key={`desc-${activeSlide.id}`}
              className="hero-editorial-manifesto"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {activeSlide.description}
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              className="hero-actions-cluster"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <button
                className="btn-couture-primary touch-target"
                onClick={onExploreSilhouettes}
              >
                <Compass size={17} className="btn-icon" />
                <span>{activeSlide.primaryCta}</span>
              </button>

              <button
                className="btn-couture-outline touch-target"
                onClick={onOpenAtelier}
              >
                <Scissors size={17} className="btn-icon" />
                <span>{activeSlide.secondaryCta}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Carousel Pagination Indicator Bars */}
      <div className="hero-carousel-pagination" aria-label="Slide Selection">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            className={`pagination-item ${idx === currentSlide ? 'pagination-active' : ''}`}
            onClick={() => { pauseAutoPlayTemporarily(); setCurrentSlide(idx); }}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
          >
            <span className="pagination-num">0{idx + 1}</span>
            <div className="pagination-bar-track">
              <div className="pagination-bar-fill" />
            </div>
          </button>
        ))}
      </div>

      {/* 5. Minimalist Mouse Scroll Indicator on Bottom Right (as in reference) */}
      <div
        className="hero-scroll-indicator touch-target"
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to explore collection"
      >
        <div className="mouse-capsule">
          <div className="mouse-wheel-dot" />
        </div>
        <span className="scroll-caption">SCROLL</span>
        <div className="scroll-hairline-down" />
      </div>
    </section>
  );
};

export default CinematicHero;
