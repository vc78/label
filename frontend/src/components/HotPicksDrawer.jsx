import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './HotPicksDrawer.css';

const HotPicksDrawer = ({ isOpen, onClose, onCartOpen, onProductClick }) => {
  const { addToCart } = useCart();

  // Curate real hot picks from catalog
  const hotPicks = products.filter(p => p.tag === 'Bestseller' || p.tag === 'New' || p.isNew).slice(0, 4);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || "Free Size", 1);
    onClose();
    if (onCartOpen) onCartOpen();
  };

  const handleCardClick = (product) => {
    onClose();
    if (onProductClick) onProductClick(product);
  };

  return (
    <>
      <div className={`hot-picks-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`hot-picks-drawer ${isOpen ? 'open' : ''}`}>
        <div className="hot-picks-header">
          <h2>Hot Picks</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <div className="hot-picks-content">
          {hotPicks.map(product => (
            <div key={product.id} className="hot-pick-card" onClick={() => handleCardClick(product)}>
              <div className="hot-pick-image">
                <img src={product.image} alt={product.name} />
                <span className="hot-pick-tag">{product.tag || 'Bestseller'}</span>
              </div>
              <div className="hot-pick-info">
                <h3>{product.name}</h3>
                <p>₹{(product.sellingPrice || product.price).toLocaleString()}</p>
                <button className="hot-pick-add-btn" onClick={(e) => handleAddToCart(product, e)}>
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotPicksDrawer;
