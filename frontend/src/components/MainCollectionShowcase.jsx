import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import './MainCollectionShowcase.css';

const SHOWCASE_TABS = [
  { id: 'all', label: 'All Pieces' },
  { id: 'sarees', label: 'Sarees' },
  { id: 'lehengas', label: 'Lehengas' },
  { id: 'co-ords', label: 'Pre Draped' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'men', label: 'Menswear' }
];

const MainCollectionShowcase = ({ onProductClick, onAddToCart, onNavigateToCollection }) => {
  const [activeTab, setActiveTab] = useState('all');
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const displayedProducts = useMemo(() => {
    let list = products;
    if (activeTab !== 'all') {
      list = products.filter((p) => p.category === activeTab);
    }
    // Simple showcase: display top 12 items for this category
    return list.slice(0, 12);
  }, [activeTab]);

  return (
    <section className="main-collection-showcase-section" id="collections">
      <div className="couture-container">
        {/* Section Header */}
        <div className="showcase-header-row">
          <div>
            <span className="maison-label">Haute Couture Archive</span>
            <h2 className="showcase-title">Curated Collections</h2>
            <p className="showcase-subtitle">
              Handcrafted masterworks sculpted in pure mulberry silks, authentic handlooms, and fine zardozi.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCollection && onNavigateToCollection(activeTab)}
            className="showcase-view-all-btn touch-target"
            aria-label="View entire archive collection"
          >
            <span>VIEW ALL ({products.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Clean, Simple Category Tabs */}
        <div className="showcase-tabs-strip" role="tablist" aria-label="Collections filter">
          {SHOWCASE_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`showcase-tab-chip ${activeTab === tab.id ? 'active-tab' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simple Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="showcase-product-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {displayedProducts.map((product) => {
              const inWish = isInWishlist ? isInWishlist(product.id) : false;
              return (
                <article
                  key={product.id}
                  className="showcase-product-card"
                  onClick={() => onProductClick && onProductClick(product)}
                >
                  {/* Media Frame */}
                  <div className="showcase-media-frame">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="showcase-item-img"
                    />

                    {/* Badge */}
                    {product.tag && (
                      <span className="showcase-tag-badge">{product.tag}</span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      className={`showcase-wish-btn ${inWish ? 'in-wish' : ''}`}
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (toggleWishlist) toggleWishlist(product);
                        if (addToast) {
                          addToast(
                            inWish
                              ? `Removed ${product.name} from wishlist`
                              : `Added ${product.name} to wishlist ❤️`,
                            'info'
                          );
                        }
                      }}
                    >
                      <Heart
                        size={17}
                        fill={inWish ? '#A81C43' : 'none'}
                        color={inWish ? '#A81C43' : '#101114'}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="showcase-card-body">
                    <span className="showcase-item-category">{product.category}</span>
                    <h3 className="showcase-item-name">{product.name}</h3>
                    <div className="showcase-item-fabric">{product.fabric}</div>

                    <div className="showcase-price-row">
                      <div className="showcase-prices">
                        <span className="price-sale">₹{product.sellingPrice.toLocaleString('en-IN')}</span>
                        {product.originalPrice > product.sellingPrice && (
                          <span className="price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      <button
                        className="showcase-acquire-btn touch-target"
                        aria-label={`View or acquire ${product.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) onAddToCart(product);
                          else if (onProductClick) onProductClick(product);
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>ACQUIRE</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA to view all items */}
        <div className="showcase-bottom-bar">
          <button
            onClick={() => onNavigateToCollection && onNavigateToCollection('all')}
            className="btn-couture-outline touch-target showcase-more-btn"
          >
            <span>EXPLORE FULL ARCHIVE CATALOG ({products.length} ENSEMBLES)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainCollectionShowcase;
