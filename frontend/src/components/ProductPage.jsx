import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Heart, Check, MessageSquare, Shield, Layers, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import BespokeImage from './BespokeImage';
import './ProductPage.css';

const ProductPage = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('Free Size');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('fabric'); // 'fabric' | 'sizing' | 'preservation'

  // Image Gallery
  const images = (product && product.images && product.images.length > 0)
    ? product.images
    : [product?.image || product?.image_url || '/images/i1.png'];

  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    if (product) {
      const initialImages = (product.images && product.images.length > 0)
        ? product.images
        : [product.image || product.image_url || '/images/i1.png'];
      setMainImage(initialImages[0]);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize('Free Size');
      }
    }
  }, [product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast("Please select a size first.", "info");
      return;
    }

    addToCart(product, selectedSize, 1);
    setAdded(true);
    addToast(`${product.name || product.title} (${selectedSize}) acquired to Couture Bag`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello Sahithi, I am inquiring about custom atelier commission for: ${product.name || product.title} (Archive Code: ${product.id}). Can we discuss bespoke measurements and loom timing?`
    );
    window.open(`https://wa.me/919000164752?text=${text}`, '_blank');
  };

  const currentPrice = product.sellingPrice || product.price || product.originalPrice || 14800;
  const originalPrice = product.originalPrice || currentPrice;

  return (
    <div className="cold-couture-product-page">
      {/* Top Breadcrumb Bar */}
      <div className="product-top-bar">
        <div className="couture-container top-bar-flex">
          <button onClick={onBack} className="back-nav-btn touch-target">
            <ArrowLeft size={16} />
            <span>RETURN TO ARCHIVE</span>
          </button>
          <div className="product-code-display">
            ARCHIVE ENTRY #{product.id.toUpperCase()} · HYDERABAD ATELIER
          </div>
        </div>
      </div>

      <div className="couture-container">
        <div className="product-editorial-stage">
          {/* Left: Large Editorial Imagery */}
          <div className="product-imagery-column">
            <div className="main-editorial-frame">
              <BespokeImage
                src={mainImage}
                alt={product.name || product.title}
                className="main-view-image"
              />
              <div className="editorial-grain-overlay" />
              <div className="imagery-edition-stamp">
                <span>HAUTE PIECE · SÉRIE NOIRE</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="editorial-thumb-rail">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb-box ${mainImage === img ? 'thumb-box-active' : ''}`}
                    onClick={() => setMainImage(img)}
                    aria-label={`View angle ${i + 1}`}
                  >
                    <BespokeImage src={img} alt={`Angle ${i + 1}`} className="thumb-media" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Architectural Dossier & Customization */}
          <div className="product-dossier-column">
            {/* Header Details */}
            <div className="dossier-header-block">
              <div className="maison-label">Limited Handloom Run</div>
              <h1 className="product-monolith-name">{product.name || product.title}</h1>

              <div className="dossier-pricing-row">
                <span className="current-price-val">₹{currentPrice.toLocaleString('en-IN')}</span>
                {originalPrice > currentPrice && (
                  <span className="orig-price-val">₹{originalPrice.toLocaleString('en-IN')}</span>
                )}
                <span className="vat-note">Inclusive of all duties · Handcrafted to order</span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="product-narrative-text">
              {product.description || "An architectural triumph sculpted in heavyweight Mulberry raw silk, featuring cold-hammered platinum silver zari and internal bone corsetry for an unbroken vertical line."}
            </p>

            {/* Tactile Fabric Breakdown Drawer */}
            <div className="tactile-specs-accordion">
              <div className="specs-tabs-header">
                <button
                  className={`spec-tab-btn ${activeTab === 'fabric' ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab('fabric')}
                >
                  <Layers size={14} />
                  <span>TEXTILE SPEC</span>
                </button>
                <button
                  className={`spec-tab-btn ${activeTab === 'sizing' ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab('sizing')}
                >
                  <Ruler size={14} />
                  <span>FIT & MEASUREMENT</span>
                </button>
                <button
                  className={`spec-tab-btn ${activeTab === 'preservation' ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab('preservation')}
                >
                  <Shield size={14} />
                  <span>PRESERVATION</span>
                </button>
              </div>

              <div className="spec-tab-content-panel">
                {activeTab === 'fabric' && (
                  <div className="specs-meta-rows">
                    <div className="meta-row">
                      <span className="m-title">WEAVE & ORIGIN</span>
                      <span className="m-detail">{product.fabric || 'Pure Mulberry Katan Silk'} (Varanasi Loom)</span>
                    </div>
                    <div className="meta-row">
                      <span className="m-title">METALLIC CONTENT</span>
                      <span className="m-detail">Cold-Drawn Silver Zari Filaments</span>
                    </div>
                    <div className="meta-row">
                      <span className="m-title">HANDCRAFT HOURS</span>
                      <span className="m-detail">140 - 180 Dedicated Atelier Hours</span>
                    </div>
                    <div className="meta-row">
                      <span className="m-title">INTERIOR STRUCTURE</span>
                      <span className="m-detail">Zero-Synthetic Double Pure Silk Lining</span>
                    </div>
                  </div>
                )}

                {activeTab === 'sizing' && (
                  <div className="specs-meta-rows">
                    <div className="meta-row">
                      <span className="m-title">PROPORTION PROFILE</span>
                      <span className="m-detail">Engineered for clean vertical column drape</span>
                    </div>
                    <div className="meta-row">
                      <span className="m-title">CUSTOM MEASUREMENT</span>
                      <span className="m-detail">Complimentary post-order millimeter calibration via WhatsApp</span>
                    </div>
                  </div>
                )}

                {activeTab === 'preservation' && (
                  <div className="specs-meta-rows">
                    <div className="meta-row">
                      <span className="m-title">CARE PROTOCOL</span>
                      <span className="m-detail">Specialist dry clean only. Avoid moisture on cold zari.</span>
                    </div>
                    <div className="meta-row">
                      <span className="m-title">STORAGE ENCLOSURE</span>
                      <span className="m-detail">Includes acid-free Japanese tissue & obsidian presentation box.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sizing Selector */}
            <div className="sizing-block">
              <div className="sizing-label-line">
                <span className="s-headline">CALIBRATE SIZE</span>
                <span className="s-selected">{selectedSize}</span>
              </div>
              <div className="sizing-pill-cluster">
                {(product.sizes || ['Free Size', 'Custom Tailored Blouse', 'Bespoke Calibrated']).map((size) => (
                  <button
                    key={size}
                    className={`size-choice-btn ${selectedSize === size ? 'size-active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase & Commission Actions (Desktop) */}
            <div className="desktop-actions-cluster">
              <button
                className={`btn-couture-primary acquire-main-btn touch-target ${added ? 'btn-added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>ACQUIRED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ACQUIRE PIECE · ₹{currentPrice.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <button
                className="btn-couture-outline custom-inquire-btn touch-target"
                onClick={handleWhatsAppConsult}
                title="Consult with Sahithi via WhatsApp"
              >
                <MessageSquare size={16} />
                <span>CONSULT STYLIST</span>
              </button>

              <button
                className={`wishlist-icon-btn touch-target ${inWishlist ? 'wishlist-active' : ''}`}
                onClick={() => {
                  toggleWishlist(product);
                  addToast(inWishlist ? 'Removed from Archival Wishlist' : 'Saved to Archival Wishlist', 'info');
                }}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={inWishlist ? '#ffffff' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Purchase Dock (Intentional Touch Redesign) */}
      <div className="mobile-sticky-purchase-dock">
        <div className="dock-content-wrap">
          <div className="dock-pricing">
            <span className="dock-label">{product.name || product.title}</span>
            <span className="dock-amount">₹{currentPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="dock-buttons-row">
            <button
              className="btn-couture-primary dock-buy-btn touch-target"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
              <span>{added ? 'ADDED' : 'ACQUIRE'}</span>
            </button>
            <button
              className="dock-consult-btn touch-target"
              onClick={handleWhatsAppConsult}
              aria-label="WhatsApp Concierge"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
