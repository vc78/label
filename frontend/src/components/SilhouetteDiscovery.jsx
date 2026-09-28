import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, SlidersHorizontal, Eye, ShoppingBag, Check } from 'lucide-react';
import './SilhouetteDiscovery.css';

const SILHOUETTE_OPTIONS = [
  { id: 'all', label: 'All Silhouettes', desc: 'Complete Architectural Archive' },
  { id: 'column', label: 'Sculpted Column', desc: 'Monolithic, vertical floor-grazing line' },
  { id: 'pleat', label: 'Architectural Pleat', desc: 'Kinetic micro-folds engineered for motion' },
  { id: 'cape', label: 'Cape & Flute', desc: 'Dramatic asymmetric shoulder sweep' },
  { id: 'minimalist', label: 'Minimalist Sheath', desc: 'Unembellished precision razor contour' }
];

const ATMOSPHERE_OPTIONS = [
  { id: 'all', label: 'All Atmospheres' },
  { id: 'gala', label: 'Nocturne Gala (Evening)' },
  { id: 'reception', label: 'Editorial Reception' },
  { id: 'trousseau', label: 'Bespoke Trousseau' },
  { id: 'solar', label: 'Solar Ceremony' }
];

const TEXTILE_OPTIONS = [
  { id: 'all', label: 'All Textiles' },
  { id: 'silk', label: 'Raw Mulberry Silk' },
  { id: 'organza', label: 'Tissue Organza' },
  { id: 'brocade', label: 'Zari Brocade Weft' },
  { id: 'georgette', label: 'Micro-Pleated Georgette' }
];

const SILHOUETTE_CATALOG = [
  {
    id: 'sil-1',
    title: 'The Monolith Column Drape',
    category: 'sarees',
    silhouette: 'column',
    atmosphere: 'gala',
    textile: 'silk',
    image: '/images/i1.png',
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
      profile: 'Ethereal Semi-Translucent Flute',
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
      profile: 'Two-Piece Architectural Structure',
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
      profile: 'Volumetric Fluted Architecture',
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
      profile: 'Subtle Column with Structured Sleeve',
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
      composition: 'Pure Silk Brocade with Raw Weave',
      drapingHours: '130 Hours Pattern Draft',
      hardware: 'Icy Silver Handcrafted Studs'
    }
  }
];

const SilhouetteDiscovery = ({ onProductClick, onAddToCart }) => {
  const [selectedSilhouette, setSelectedSilhouette] = useState('all');
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all');
  const [selectedTextile, setSelectedTextile] = useState('all');

  const filteredPieces = useMemo(() => {
    return SILHOUETTE_CATALOG.filter((item) => {
      const matchSil = selectedSilhouette === 'all' || item.silhouette === selectedSilhouette;
      const matchAtm = selectedAtmosphere === 'all' || item.atmosphere === selectedAtmosphere;
      const matchTex = selectedTextile === 'all' || item.textile === selectedTextile;
      return matchSil && matchAtm && matchTex;
    });
  }, [selectedSilhouette, selectedAtmosphere, selectedTextile]);

  const resetFilters = () => {
    setSelectedSilhouette('all');
    setSelectedAtmosphere('all');
    setSelectedTextile('all');
  };

  return (
    <section className="silhouette-discovery-section" id="silhouettes">
      <div className="couture-container">
        {/* Section Intro */}
        <div className="silhouette-intro-row">
          <div>
            <div className="maison-label">Interactive Atelier Experience</div>
            <h2 className="silhouette-title">Find Your Silhouette</h2>
            <p className="silhouette-description">
              Filter through the architectural codes of the house. Specify your desired structural line, event atmosphere, and textile density to reveal customized couture pieces instantly.
            </p>
          </div>

          <div className="discovery-stats-pill">
            <span className="stats-dot" />
            <span className="stats-text">{filteredPieces.length} ARCHIVAL SILHOUETTES MATCHED</span>
          </div>
        </div>

        {/* Facet Selectors */}
        <div className="discovery-matrix-panel">
          {/* Dimension 1: Silhouette Form */}
          <div className="matrix-dimension-group">
            <div className="dimension-label-header">
              <Compass size={15} />
              <span>01. STRUCTURAL GEOMETRY</span>
            </div>
            <div className="silhouette-pill-grid">
              {SILHOUETTE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`silhouette-filter-pill ${selectedSilhouette === opt.id ? 'active-pill' : ''}`}
                  onClick={() => setSelectedSilhouette(opt.id)}
                  aria-pressed={selectedSilhouette === opt.id}
                >
                  <span className="pill-name">{opt.label}</span>
                  {selectedSilhouette === opt.id && <Check size={14} className="pill-check" />}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension 2 & 3 Combined Row */}
          <div className="matrix-secondary-row">
            {/* Atmosphere */}
            <div className="secondary-facet-group">
              <div className="dimension-label-header">
                <SlidersHorizontal size={14} />
                <span>02. EVENT ATMOSPHERE</span>
              </div>
              <div className="secondary-pill-cluster">
                {ATMOSPHERE_OPTIONS.map((atm) => (
                  <button
                    key={atm.id}
                    className={`micro-pill ${selectedAtmosphere === atm.id ? 'micro-active' : ''}`}
                    onClick={() => setSelectedAtmosphere(atm.id)}
                  >
                    {atm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textile */}
            <div className="secondary-facet-group">
              <div className="dimension-label-header">
                <Sparkles size={14} />
                <span>03. TEXTILE DENSITY</span>
              </div>
              <div className="secondary-pill-cluster">
                {TEXTILE_OPTIONS.map((tex) => (
                  <button
                    key={tex.id}
                    className={`micro-pill ${selectedTextile === tex.id ? 'micro-active' : ''}`}
                    onClick={() => setSelectedTextile(tex.id)}
                  >
                    {tex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Summary Bar */}
          {(selectedSilhouette !== 'all' || selectedAtmosphere !== 'all' || selectedTextile !== 'all') && (
            <div className="filter-active-bar">
              <div className="active-tags-flex">
                <span className="filter-summary-text">Active Filter Parameters:</span>
                {selectedSilhouette !== 'all' && (
                  <span className="tag-chip">Silhouette: {SILHOUETTE_OPTIONS.find(o => o.id === selectedSilhouette)?.label}</span>
                )}
                {selectedAtmosphere !== 'all' && (
                  <span className="tag-chip">Atmosphere: {ATMOSPHERE_OPTIONS.find(o => o.id === selectedAtmosphere)?.label}</span>
                )}
                {selectedTextile !== 'all' && (
                  <span className="tag-chip">Textile: {TEXTILE_OPTIONS.find(o => o.id === selectedTextile)?.label}</span>
                )}
              </div>
              <button onClick={resetFilters} className="clear-filters-btn">
                RESET TO ALL
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPieces.length > 0 ? (
            <motion.div
              className="silhouette-results-grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredPieces.map((item) => (
                <motion.div
                  key={item.id}
                  className="silhouette-card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
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
                        <Eye size={15} />
                        <span>INSPECT</span>
                      </button>
                    </div>
                  </div>

                  <div className="card-detail-body">
                    <div className="card-category-indicator">{item.category}</div>
                    <h3 className="card-item-title" onClick={() => onProductClick?.(item)}>
                      {item.title}
                    </h3>

                    {/* Structural Specs Blueprint */}
                    <div className="card-specs-list">
                      <div className="spec-item">
                        <span className="s-label">COMPOSITION:</span>
                        <span className="s-val">{item.specs.composition}</span>
                      </div>
                      <div className="spec-item">
                        <span className="s-label">LOOM CREATION:</span>
                        <span className="s-val">{item.specs.drapingHours}</span>
                      </div>
                      <div className="spec-item">
                        <span className="s-label">DETAIL:</span>
                        <span className="s-val">{item.specs.hardware}</span>
                      </div>
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
                        <span>COMMISSION PIECE</span>
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
                <Compass size={32} />
              </div>
              <h3 className="empty-title">NO MATCHING ARCHIVAL FORM FOUND</h3>
              <p className="empty-text">
                Your combination of structural line and textile density is currently in commission. Reset your filters or contact the private atelier for bespoke formulation.
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
