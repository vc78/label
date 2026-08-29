import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
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
    addToCart(product, "Free Size", 1);
    setIsVisible(false);
    if (onCartOpen) onCartOpen();
  };

  return (
    <div className="welcome-popup-overlay">
      <div className="welcome-popup-content">
        <button className="welcome-close-btn" onClick={() => setIsVisible(false)}>
          <X size={24} />
        </button>
        <div className="welcome-popup-split">
          <div className="welcome-image-side">
            <img src={product.image} alt={product.name} />
            <span className="welcome-tag">{product.tag}</span>
          </div>
          <div className="welcome-text-side">
            <h2>Trending Now</h2>
            <p className="welcome-subtitle">Elevate your festive wardrobe with our most coveted piece.</p>
            <h3 className="welcome-product-name">{product.name}</h3>
            <p className="welcome-price">₹{product.price.toLocaleString()}</p>
            <button className="welcome-order-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
