import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './WelcomePopup.css';

const WelcomePopup = ({ onCartOpen, onProductClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  // Real bestseller product from catalog
  const product = products.find(p => p.id === 'lehenga-1') || products[0];

  useEffect(() => {
    // Only show once per session
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenWelcomePopup', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleOrderNow = () => {
    addToCart(product, product.sizes?.[0] || 'Free Size', 1);
    setIsVisible(false);
    if (onCartOpen) onCartOpen();
  };

  const handleViewProduct = () => {
    setIsVisible(false);
    if (onProductClick) onProductClick(product);
  };

  return (
    <div className="welcome-popup-overlay" onClick={() => setIsVisible(false)}>
      <div className="welcome-popup-content" onClick={e => e.stopPropagation()}>
        <button className="welcome-close-btn" onClick={() => setIsVisible(false)}>
          <X size={20} />
        </button>
        <div className="welcome-popup-split">
          <div className="welcome-image-side" onClick={handleViewProduct}>
            <img src={product.image} alt={product.name} />
            <span className="welcome-tag">{product.tag || 'New Arrival'}</span>
          </div>
          <div className="welcome-text-side">
            <p className="welcome-eyebrow">ARCHIVAL COMMISSION · LIMITED RUN</p>
            <h3 className="welcome-product-name">{product.name}</h3>
            <p className="welcome-subtitle">{product.fabric || 'Handcrafted luxury piece'}</p>
            <div className="welcome-price-row">
              <span className="welcome-price">₹{(product.sellingPrice || product.price).toLocaleString()}</span>
              {product.originalPrice && product.originalPrice !== product.sellingPrice && (
                <span className="welcome-original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="welcome-actions">
              <button className="welcome-order-btn" onClick={handleOrderNow}>
                Add to Cart
              </button>
              <button className="welcome-view-btn" onClick={handleViewProduct}>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;

