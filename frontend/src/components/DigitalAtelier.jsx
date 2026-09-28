import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './DigitalAtelier.css';

const BASE_SILHOUETTES = [
  {
    id: 'base-column',
    name: 'The Monolith Column',
    desc: 'Pure vertical line, architectural boat neck with seamless drape',
    basePrice: 16500,
    image: '/images/i1.png',
    leadTime: '18 Days'
  },
  {
    id: 'base-cape',
    name: 'The Nocturne Capelet',
    desc: 'Structured shoulders with detachable flowing asymmetric cape',
    basePrice: 19800,
    image: '/images/i5.png',
    leadTime: '22 Days'
  },
  {
    id: 'base-flute',
    name: 'The Architectural Flute',
    desc: 'Sculpted corsetry with architectural flared volume and micro-train',
    basePrice: 24000,
    image: '/images/i4.png',
    leadTime: '28 Days'
  }
];

const FABRICS = [
  {
    id: 'mikado',
    name: '380 GSM Heavy Raw Mikado',
    desc: 'Matte, structural hand with crisp sculptural fold retention',
    addPrice: 0,
    origin: 'Varanasi Loom'
  },
  {
    id: 'organza',
    name: 'Liquid Graphite Silk Organza',
    desc: 'Translucent, weightless layering with micro-luster reflection',
    addPrice: 1800,
    origin: 'Bengal Handloom'
  },
  {
    id: 'velvet',
    name: 'Crushed Obsidian Silk Velvet',
    desc: 'Deep light-absorbing darkness with fluid liquid contour',
    addPrice: 3200,
    origin: 'Atelier Mill'
  },
  {
    id: 'brocade',
    name: 'Hand-Hammered Platinum Brocade',
    desc: 'Cold metal filaments interlaced with Mulberry warp',
    addPrice: 4800,
    origin: 'Master Guild'
  }
];

const FINISHES = [
  {
    id: 'platinum',
    name: 'Cold Platinum Silver',
    code: '#D1D5DB',
    desc: 'Crisp, icy metallic filaments with razor reflection'
  },
  {
    id: 'champagne',
    name: 'Restrained Champagne Zari',
    code: '#CFC2B2',
    desc: 'Subtle pale champagne gold, quiet and understated'
  },
  {
    id: 'carbon',
    name: 'Monochromatic Matte Carbon',
    code: '#1E1E24',
    desc: 'Tonal black-on-black structural threadwork'
  }
];

const HEM_STYLES = [
  { id: 'floor', name: 'Floor-Grazing Razor Hem', addPrice: 0 },
  { id: 'train', name: 'Architectural Asymmetric Train (+40cm)', addPrice: 2200 },
  { id: 'flute', name: 'High-Slit Geometric Flute', addPrice: 1200 }
];

const FIT_PROFILES = [
  { id: 'standard', name: 'Standard Architectural Size (Free Size / S-XL)' },
  { id: 'bespoke', name: 'Laser-Calibrated Bespoke Fit (Custom Measurements Input)' }
];

const DigitalAtelier = ({ onCustomPieceCreated }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [selectedBase, setSelectedBase] = useState(BASE_SILHOUETTES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [selectedHem, setSelectedHem] = useState(HEM_STYLES[0]);
  const [selectedFit, setSelectedFit] = useState(FIT_PROFILES[0]);
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: ''
  });

  const totalPrice = selectedBase.basePrice + selectedFabric.addPrice + selectedHem.addPrice;

  const handleCommission = () => {
    const bespokeProduct = {
      id: `bespoke-${Date.now()}`,
      name: `${selectedBase.name} [Bespoke Custom]`,
      sellingPrice: totalPrice,
      originalPrice: totalPrice,
      image: selectedBase.image,
      images: [selectedBase.image],
      selectedSize: selectedFit.id === 'bespoke' ? 'Bespoke Calibrated' : 'Standard Architectural',
      bespokeSpecs: {
        base: selectedBase.name,
        fabric: selectedFabric.name,
        finish: selectedFinish.name,
        hem: selectedHem.name,
        fit: selectedFit.name,
        measurements: selectedFit.id === 'bespoke' ? customMeasurements : null,
        leadTime: selectedBase.leadTime
      }
    };

    addToCart(bespokeProduct);
    addToast('Bespoke Commission added to Couture Bag', 'success');
    if (onCustomPieceCreated) onCustomPieceCreated(bespokeProduct);
  };

  return (
    <section className="digital-atelier-section" id="digital-atelier">
      <div className="couture-container">
        {/* Section Title */}
        <div className="atelier-intro">
          <div className="maison-label">Interactive Commission Lab</div>
          <h2 className="atelier-title">The Digital Atelier</h2>
          <p className="atelier-desc">
            Engineer your own bespoke silhouette. Customize the structural foundation, tactile textile weight, cold metallic finish, and tailored fit. Every commissioned piece is made exclusively to order.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="atelier-workspace-grid">
          {/* Left: Interactive Preview & Live Spec Sheet */}
          <div className="atelier-preview-column">
            <div className="atelier-visual-stage">
              <img
                src={selectedBase.image}
                alt={selectedBase.name}
                className="atelier-render-img"
              />
              <div className="atelier-vignette" />

              {/* Live Spec Watermark */}
              <div className="atelier-overlay-code">
                <span className="live-pill">LIVE ATELIER SPEC</span>
                <span className="spec-code-text">ATELIER-{selectedBase.id.toUpperCase()}-{selectedFabric.id.toUpperCase()}</span>
              </div>

              {/* Live Price Tag */}
              <div className="atelier-floating-price">
                <span className="floating-label">COMMISSION TOTAL</span>
                <span className="floating-value">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Spec Sheet Summary Card */}
            <div className="atelier-summary-card">
              <div className="summary-header">
                <Scissors size={15} />
                <span>ARCHIVAL COMMISSION MANIFEST</span>
              </div>

              <div className="summary-list">
                <div className="summary-row">
                  <span className="sum-label">FOUNDATION:</span>
                  <span className="sum-val">{selectedBase.name}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">TEXTILE DENSITY:</span>
                  <span className="sum-val">{selectedFabric.name}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">METALLIC WEFT:</span>
                  <span className="sum-val">{selectedFinish.name}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">HEM ARCHITECTURE:</span>
                  <span className="sum-val">{selectedHem.name}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">FIT PROTOCOL:</span>
                  <span className="sum-val">{selectedFit.name}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">CREATION WINDOW:</span>
                  <span className="sum-val sum-highlight">{selectedBase.leadTime}</span>
                </div>
              </div>

              <button
                className="btn-couture-primary commission-cta touch-target"
                onClick={handleCommission}
              >
                <ShoppingBag size={16} />
                <span>COMMISSION THIS PIECE · ₹{totalPrice.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="atelier-controls-column">
            {/* Step 1: Base Foundation */}
            <div className="control-block">
              <div className="control-header">
                <span className="step-num">01</span>
                <div>
                  <h3 className="control-name">CHOOSE FOUNDATION SILHOUETTE</h3>
                  <p className="control-hint">The primary architectural line of the garment</p>
                </div>
              </div>

              <div className="base-cards-grid">
                {BASE_SILHOUETTES.map((base) => (
                  <div
                    key={base.id}
                    className={`base-select-card ${selectedBase.id === base.id ? 'base-selected' : ''}`}
                    onClick={() => setSelectedBase(base)}
                  >
                    <div className="base-card-info">
                      <h4 className="base-title">{base.name}</h4>
                      <p className="base-desc">{base.desc}</p>
                      <div className="base-price-tag">From ₹{base.basePrice.toLocaleString('en-IN')}</div>
                    </div>
                    {selectedBase.id === base.id && <Check size={16} className="base-check" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Fabric & Weight */}
            <div className="control-block">
              <div className="control-header">
                <span className="step-num">02</span>
                <div>
                  <h3 className="control-name">SELECT ARCHIVAL TEXTILE</h3>
                  <p className="control-hint">Curated looms woven exclusively for cold couture</p>
                </div>
              </div>

              <div className="fabric-select-list">
                {FABRICS.map((fabric) => (
                  <div
                    key={fabric.id}
                    className={`fabric-item-row ${selectedFabric.id === fabric.id ? 'fabric-selected' : ''}`}
                    onClick={() => setSelectedFabric(fabric)}
                  >
                    <div className="fabric-meta">
                      <div className="f-title-line">
                        <span className="f-name">{fabric.name}</span>
                        <span className="f-origin">[{fabric.origin}]</span>
                      </div>
                      <p className="f-desc">{fabric.desc}</p>
                    </div>

                    <div className="fabric-price-add">
                      {fabric.addPrice > 0 ? `+₹${fabric.addPrice.toLocaleString('en-IN')}` : 'Included'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Metallic Finish */}
            <div className="control-block">
              <div className="control-header">
                <span className="step-num">03</span>
                <div>
                  <h3 className="control-name">METALLIC FILAMENT & HARDWARE</h3>
                  <p className="control-hint">Restrained cold silver or champagne thread tones</p>
                </div>
              </div>

              <div className="finish-pill-row">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    className={`finish-card ${selectedFinish.id === finish.id ? 'finish-selected' : ''}`}
                    onClick={() => setSelectedFinish(finish)}
                  >
                    <div className="finish-swatch" style={{ backgroundColor: finish.code }} />
                    <div className="finish-name">{finish.name}</div>
                    <div className="finish-desc">{finish.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Hem Architecture */}
            <div className="control-block">
              <div className="control-header">
                <span className="step-num">04</span>
                <div>
                  <h3 className="control-name">HEM ARCHITECTURE</h3>
                  <p className="control-hint">Floor length, flared sweep, or asymmetric train</p>
                </div>
              </div>

              <div className="hem-grid">
                {HEM_STYLES.map((hem) => (
                  <button
                    key={hem.id}
                    className={`hem-pill ${selectedHem.id === hem.id ? 'hem-active' : ''}`}
                    onClick={() => setSelectedHem(hem)}
                  >
                    <span>{hem.name}</span>
                    {hem.addPrice > 0 && <span className="hem-add">+₹{hem.addPrice}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Fit Profile */}
            <div className="control-block">
              <div className="control-header">
                <span className="step-num">05</span>
                <div>
                  <h3 className="control-name">FIT & SIZING CALIBRATION</h3>
                  <p className="control-hint">Standard architectural sizing or bespoke measurements</p>
                </div>
              </div>

              <div className="fit-toggle-row">
                {FIT_PROFILES.map((fit) => (
                  <button
                    key={fit.id}
                    className={`fit-btn ${selectedFit.id === fit.id ? 'fit-active' : ''}`}
                    onClick={() => setSelectedFit(fit)}
                  >
                    {fit.name}
                  </button>
                ))}
              </div>

              {selectedFit.id === 'bespoke' && (
                <motion.div
                  className="bespoke-inputs-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="inputs-note">
                    Enter your dimensions in inches. Our master cutter will cross-check before cutting.
                  </p>
                  <div className="inputs-grid">
                    <input
                      type="number"
                      placeholder="Bust (in)"
                      value={customMeasurements.bust}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, bust: e.target.value })}
                      className="atelier-input"
                    />
                    <input
                      type="number"
                      placeholder="Waist (in)"
                      value={customMeasurements.waist}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: e.target.value })}
                      className="atelier-input"
                    />
                    <input
                      type="number"
                      placeholder="Hips (in)"
                      value={customMeasurements.hips}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, hips: e.target.value })}
                      className="atelier-input"
                    />
                    <input
                      type="number"
                      placeholder="Total Height (cm)"
                      value={customMeasurements.height}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, height: e.target.value })}
                      className="atelier-input"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalAtelier;
