import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import './EditorialCollectionRail.css';

const RAIL_PIECES = [
  {
    id: 'rail-1',
    edition: '01 / ARCHIVE',
    title: 'Monolith Raw Silk Drape',
    category: 'Couture Saree',
    image: '/images/i1.png',
    price: 14800,
    originalPrice: 18500,
    fabric: '380 GSM Mulberry Raw Silk',
    weave: 'Pure Katan Hand-Spun',
    hours: '140 Hours',
    silhouette: 'Draped Column',
    tag: 'Cold Archival'
  },
  {
    id: 'rail-2',
    edition: '02 / ARCHIVE',
    title: 'Tissue Graphite Organza',
    category: 'Sculptural Saree',
    image: '/images/i2.png',
    price: 13600,
    originalPrice: 16000,
    fabric: 'Liquid Organza Silk',
    weave: 'Micro Metallic Thread',
    hours: '110 Hours',
    silhouette: 'Ethereal Sheer Flute',
    tag: 'Limited Loom'
  },
  {
    id: 'rail-3',
    edition: '03 / ARCHIVE',
    title: 'Obsidian Brocade Ensemble',
    category: 'Architectural Co-ord',
    image: '/images/i3.png',
    price: 13050,
    originalPrice: 14500,
    fabric: 'Chanderi Silver Weft',
    weave: 'Restrained Champagne Zari',
    hours: '95 Hours',
    silhouette: 'Tailored Minimalist',
    tag: 'New Edition'
  },
  {
    id: 'rail-4',
    edition: '04 / ARCHIVE',
    title: 'Icy Platinum Bridal Structure',
    category: 'Grand Lehenga',
    image: '/images/i4.png',
    price: 24500,
    originalPrice: 28000,
    fabric: 'Sculpted Zardozi Mikado',
    weave: 'Hand-Hammered Silver Zari',
    hours: '220 Hours',
    silhouette: 'Architectural Flute',
    tag: 'Haute Piece'
  },
  {
    id: 'rail-5',
    edition: '05 / ARCHIVE',
    title: 'Nocturne Pleated Cape Set',
    category: 'Pre-Draped Silhouette',
    image: '/images/i5.png',
    price: 11900,
    originalPrice: 14000,
    fabric: 'Matte Georgette & Satin',
    weave: 'Micro Knife-Pleating',
    hours: '80 Hours',
    silhouette: 'Kinetic Movement',
    tag: 'Couture Run'
  },
  {
    id: 'rail-6',
    edition: '06 / ARCHIVE',
    title: 'Champagne Filament Trousseau',
    category: 'Handcrafted Kurta',
    image: '/images/i6.png',
    price: 10800,
    originalPrice: 12500,
    fabric: 'Organza & Raw Mulberry',
    weave: 'Champagne Threadwork',
    hours: '75 Hours',
    silhouette: 'Architectural Column',
    tag: 'Restrained Luxe'
  }
];

const EditorialCollectionRail = ({ onProductClick, onAddToCart }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const railRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const pauseAutoScrollTemporarily = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  }, []);

  const scrollRail = (direction) => {
    pauseAutoScrollTemporarily();
    if (railRef.current) {
      const firstCard = railRef.current.querySelector('.rail-card');
      const cardWidth = firstCard ? firstCard.clientWidth + 24 : 360;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Self-scrolling Carousel effect
  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      if (railRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
        // If near end, loop smoothly back to beginning
        if (scrollLeft + clientWidth >= scrollWidth - 30) {
          railRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const firstCard = railRef.current.querySelector('.rail-card');
          const step = firstCard ? firstCard.clientWidth + 24 : 360;
          railRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 3600);

    return () => clearInterval(interval);
  }, [isInteracting]);

  return (
    <section
      className="editorial-rail-section"
      id="editorial-rail"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={pauseAutoScrollTemporarily}
    >
      <div className="couture-container">
        {/* Section Header */}
        <div className="rail-header-flex">
          <div>
            <div className="maison-label">Curated Series 2026.IV</div>
            <h2 className="rail-heading">The Cold Couture Rail</h2>
            <p className="rail-subheading">
              Architectural cuts sculpted in unembellished raw silks, liquid graphite lamé, and restrained metallic silver filaments.
            </p>
          </div>

          <div className="rail-nav-controls">
            <button
              onClick={() => scrollRail('left')}
              className="rail-arrow-btn touch-target"
              aria-label="Scroll Rail Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollRail('right')}
              className="rail-arrow-btn touch-target"
              aria-label="Scroll Rail Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Editorial Rail Container */}
      <div className="rail-scroll-track" ref={railRef}>
        {RAIL_PIECES.map((piece, idx) => (
          <motion.article
            key={piece.id}
            className="rail-card"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
          >
            {/* Visual Framing */}
            <div className="rail-image-frame" onClick={() => onProductClick?.(piece)}>
              <img
                src={piece.image}
                alt={piece.title}
                className="rail-image"
                loading="lazy"
              />
              
              {/* Cold Tone Vignette Overlay */}
              <div className="rail-vignette-overlay" />

              {/* Tag & Index Badge */}
              <div className="rail-top-badges">
                <span className="rail-edition-tag">{piece.edition}</span>
                <span className="rail-status-pill">{piece.tag}</span>
              </div>

              {/* Micro-Details Overlay on Hover */}
              <div className={`rail-hover-specs ${hoveredIndex === idx ? 'specs-active' : ''}`}>
                <div className="rail-spec-row">
                  <span className="spec-label">TEXTILE</span>
                  <span className="spec-value">{piece.fabric}</span>
                </div>
                <div className="rail-spec-row">
                  <span className="spec-label">WEAVE</span>
                  <span className="spec-value">{piece.weave}</span>
                </div>
                <div className="rail-spec-row">
                  <span className="spec-label">CREATION</span>
                  <span className="spec-value">{piece.hours}</span>
                </div>
                <div className="rail-spec-row">
                  <span className="spec-label">SILHOUETTE</span>
                  <span className="spec-value">{piece.silhouette}</span>
                </div>
              </div>

              {/* Action Trigger Pill */}
              <div className="rail-quick-inspect">
                <span>INSPECT SILHOUETTE</span>
                <Eye size={14} />
              </div>
            </div>

            {/* Typography & Editorial Metadata */}
            <div className="rail-card-meta">
              <div className="rail-category-tag">{piece.category}</div>
              <h3 className="rail-piece-title" onClick={() => onProductClick?.(piece)}>
                {piece.title}
              </h3>
              
              <div className="rail-price-row">
                <div className="rail-price-block">
                  <span className="rail-price-current">₹{piece.price.toLocaleString('en-IN')}</span>
                  {piece.originalPrice > piece.price && (
                    <span className="rail-price-original">₹{piece.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <button
                  className="rail-acquire-btn touch-target"
                  onClick={() => onAddToCart ? onAddToCart(piece) : onProductClick?.(piece)}
                  aria-label={`Acquire ${piece.title}`}
                  title="Add to Couture Bag"
                >
                  <ShoppingBag size={15} />
                  <span>ACQUIRE</span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default EditorialCollectionRail;
