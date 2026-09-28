import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Eye, ShoppingBag, Check } from 'lucide-react';
import './SilhouetteDiscovery.css';

const SILHOUETTE_OPTIONS = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'column', label: 'Sculpted Column' },
  { id: 'pleat', label: 'Architectural Pleat' },
  { id: 'cape', label: 'Cape & Flute' },
  { id: 'minimalist', label: 'Minimalist Sheath' }
];

const ATMOSPHERE_OPTIONS = [
  { id: 'all', label: 'All Occasions' },
  { id: 'gala', label: 'Nocturne Gala' },
  { id: 'reception', label: 'Reception' },
  { id: 'trousseau', label: 'Trousseau' },
  { id: 'solar', label: 'Ceremony' }
];

const SILHOUETTE_CATALOG = [
  {
    id: 'sil-1',
    title: 'The Monolith Column Drape',
    category: 'sarees',
    silhouette: 'column',
    atmosphere: 'gala',
    textile: 'silk',
    image: '/images/hero_slide_1.jpg',
    price: 14800,
    originalPrice: 18500,
    specs: {
      profile: 'Strict Vertical Razor Line',
      composition: '100% Hand-Spun Katan Silk',
      drapingHours: '140 Hours Handloom',
      hardware: 'Hand-Hammered Silver Pallu'
    }
  },
  {
    id: 'sil-2',
    title: 'Graphite Liquid Organza',
    category: 'sarees',
    silhouette: 'minimalist',
    atmosphere: 'reception',
    textile: 'organza',
    image: '/images/i2.png',
    price: 13600,
    originalPrice: 16000,
    specs: {
      profile: 'Semi-Translucent Flute',
      composition: 'Pure Mulberry Tissue Silk',
      drapingHours: '110 Hours Micro-Zari',
      hardware: 'Hand-Stitched Micro Zardozi'
    }
  },
  {
    id: 'sil-3',
    title: 'Chanderi Tailored Ensemble',
    category: 'co-ords',
    silhouette: 'minimalist',
    atmosphere: 'trousseau',
    textile: 'brocade',
    image: '/images/i3.png',
    price: 13050,
    originalPrice: 14500,
    specs: {
      profile: 'Two-Piece Structure',
      composition: 'Silk Chanderi with Metal Weft',
      drapingHours: '95 Hours Bespoke Loom',
      hardware: 'Restrained Champagne Buttons'
    }
  },
  {
    id: 'sil-4',
    title: 'Icy Platinum Fluted Train',
    category: 'lehengas',
    silhouette: 'cape',
    atmosphere: 'trousseau',
    textile: 'silk',
    image: '/images/i4.png',
    price: 24500,
    originalPrice: 28000,
    specs: {
      profile: 'Volumetric Fluted Train',
      composition: 'Raw Mikado with Heavy Zardozi',
      drapingHours: '220 Hours Atelier Stitch',
      hardware: 'Pure Silver Thread Crystals'
    }
  },
  {
    id: 'sil-5',
    title: 'Kinetic Pleated Cape Silhouette',
    category: 'co-ords',
    silhouette: 'pleat',
    atmosphere: 'gala',
    textile: 'georgette',
    image: '/images/i5.png',
    price: 11900,
    originalPrice: 14000,
    specs: {
      profile: 'Asymmetrical Flowing Capelet',
      composition: 'Precision Knife-Pleated Fabric',
      drapingHours: '80 Hours Hand-Pleat Mold',
      hardware: 'Concealed Obsidian Fasteners'
    }
  },
  {
    id: 'sil-6',
    title: 'Sculptural Champagne Shift',
    category: 'dresses',
    silhouette: 'column',
    atmosphere: 'solar',
    textile: 'organza',
    image: '/images/i6.png',
    price: 10800,
    originalPrice: 12500,
    specs: {
      profile: 'Structured Sleeve Column',
      composition: 'Silk Organza Dual-Layer',
      drapingHours: '75 Hours Master Tailoring',
      hardware: 'Champagne Minimal Piping'
    }
  },
  {
    id: 'sil-7',
    title: 'Obsidian Modernist Sari Gown',
    category: 'dresses',
    silhouette: 'pleat',
    atmosphere: 'reception',
    textile: 'silk',
    image: '/images/i7.png',
    price: 15900,
    originalPrice: 18000,
    specs: {
      profile: 'Pre-Structured Draped Bodice',
      composition: 'Crushed Silk Velvet & Mikado',
      drapingHours: '160 Hours Structural Drape',
      hardware: 'Internal Steel Bone Corsetry'
    }
  },
  {
    id: 'sil-8',
    title: 'Bespoke Atelier Men’s Sherwani',
    category: 'men',
    silhouette: 'column',
    atmosphere: 'solar',
    textile: 'brocade',
    image: '/images/i8.png',
    price: 16500,
    originalPrice: 19500,
    specs: {
      profile: 'Military-Precise Monolithic Line',
      composition: 'Pure Silk Brocade Raw Weave',
      drapingHours: '130 Hours Pattern Draft',
      hardware: 'Icy Silver Handcrafted Studs'
    }
  }
];

const SilhouetteDiscovery = ({ onProductClick, onAddToCart }) => {
  const [selectedSilhouette, setSelectedSilhouette] = useState('all');
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all');

  const filteredPieces = useMemo(() => {
    return SILHOUETTE_CATALOG.filter((item) => {
      const matchSil = selectedSilhouette === 'all' || item.silhouette === selectedSilhouette;
      const matchAtm = selectedAtmosphere === 'all' || item.atmosphere === selectedAtmosphere;
      return matchSil && matchAtm;
    });
  }, [selectedSilhouette, selectedAtmosphere]);

  const resetFilters = () => {
    setSelectedSilhouette('all');
    setSelectedAtmosphere('all');
  };

  return (
    <section className="silhouette-discovery-section" id="silhouettes">
      <div className="couture-container">
        {/* Section Intro - Compact & Elegant */}
        <div className="silhouette-intro-row">
          <div className="intro-left-block">
            <span className="maison-label">Interactive Atelier Experience</span>
            <h2 className="silhouette-title">Find Your Silhouette</h2>
            <p className="silhouette-description">
              Filter through the architectural codes of the house. Specify your desired structural line and event atmosphere.
            </p>
          </div>

          <div className="discovery-stats-pill">
            <span className="stats-dot" />
            <span className="stats-text">{filteredPieces.length} PIECES</span>
          </div>
        </div>

        {/* Sleek, Cool, Compact Single-Row Filter System */}
        <div className="chic-silhouette-filter-bar">
          <div className="silhouette-pill-track" role="tablist" aria-label="Filter silhouettes">
            {SILHOUETTE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                role="tab"
                className={`silhouette-pill-chip ${selectedSilhouette === opt.id ? 'active-chip' : ''}`}
                onClick={() => setSelectedSilhouette(opt.id)}
                aria-selected={selectedSilhouette === opt.id}
              >
                <span>{opt.label}</span>
                {selectedSilhouette === opt.id && <Check size={13} className="pill-check-icon" />}
              </button>
            ))}
          </div>

          <div className="atmosphere-filter-track">
            {ATMOSPHERE_OPTIONS.map((atm) => (
              <button
                key={atm.id}
                className={`atmosphere-sub-chip ${selectedAtmosphere === atm.id ? 'active-sub-chip' : ''}`}
                onClick={() => setSelectedAtmosphere(atm.id)}
              >
                {atm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Grid - Compact, Cool, 4-Col Desktop / 2-Col Mobile (12px gap) */}
        <AnimatePresence mode="popLayout">
          {filteredPieces.length > 0 ? (
            <motion.div
              className="silhouette-results-grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPieces.map((item) => (
                <motion.div
                  key={item.id}
                  className="silhouette-card"
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="card-visual-wrapper" onClick={() => onProductClick?.(item)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-media"
                      loading="lazy"
                    />
                    <div className="card-gradient-sheen" />
                    <div className="card-blueprint-badge">
                      <span>{item.specs.profile}</span>
                    </div>

                    <div className="card-hover-actions">
                      <button
                        className="quick-view-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick?.(item);
                        }}
                      >
                        <Eye size={14} />
                        <span>INSPECT</span>
                      </button>
                    </div>
                  </div>

                  <div className="card-detail-body">
                    <div className="card-category-indicator">{item.category}</div>
                    <h3 className="card-item-title" onClick={() => onProductClick?.(item)}>
                      {item.title}
                    </h3>
                    <div className="card-silhouette-subtitle">
                      {item.specs.composition}
                    </div>

                    <div className="card-footer-action">
                      <div className="card-pricing">
                        <span className="p-current">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.originalPrice > item.price && (
                          <span className="p-original">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      <button
                        className="btn-acquire-couture touch-target"
                        onClick={() => onAddToCart ? onAddToCart(item) : onProductClick?.(item)}
                        aria-label={`Commission or add ${item.title} to bag`}
                      >
                        <ShoppingBag size={14} />
                        <span>COMMISSION</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="silhouette-empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="empty-box-icon">
                <Compass size={28} />
              </div>
              <h3 className="empty-title">NO MATCHING ARCHIVAL FORM FOUND</h3>
              <p className="empty-text">
                Your combination of structural line and occasion is currently in commission.
              </p>
              <button onClick={resetFilters} className="btn-couture-primary">
                RESET FILTERS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SilhouetteDiscovery;
