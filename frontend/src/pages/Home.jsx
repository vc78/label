import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CinematicHero from '../components/CinematicHero';
import EditorialCollectionRail from '../components/EditorialCollectionRail';
import MainCollectionShowcase from '../components/MainCollectionShowcase';
import EditorialTestimonials from '../components/EditorialTestimonials';
import Footer from '../components/Footer';
import QuickViewModal from '../components/QuickViewModal';
import './Home.css';

const Home = ({
  _onAuthOpen,
  _onProfileOpen,
  onNavigateToCollection,
  onNavigateToSilhouettes,
  onNavigateToPrivateSalon,
  onNavigateToCraft,
  onNavigateToLookbook,
  onNavigateToAbout,
  onNavigateToGallery,
  onProductClick,
  _onApplyCoupon
}) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleOpenProduct = (product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      setQuickViewProduct(product);
      setIsQuickViewOpen(true);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast(`${product.name || product.title} added to Couture Bag`, 'success');
  };

  return (
    <div className="cold-couture-homepage">
      {/* 01. Cinematic Hero with Direct Page Portals */}
      <CinematicHero
        onExploreSilhouettes={onNavigateToSilhouettes || (() => onNavigateToCollection('all'))}
        onOpenAtelier={onNavigateToPrivateSalon || (() => onNavigateToCollection('all'))}
      />

      {/* Architectural Maison Ticker Strip */}
      <div className="maison-ticker-strip">
        <div className="ticker-track">
          <span>HAUTE COUTURE ARCHIVE 2026.IV</span>
          <span className="ticker-bullet">◆</span>
          <span>100% PURE MULBERRY RAW SILK</span>
          <span className="ticker-bullet">◆</span>
          <span>COLD-HAMMERED PLATINUM ZARI</span>
          <span className="ticker-bullet">◆</span>
          <span>LASER-CALIBRATED BESPOKE FIT</span>
          <span className="ticker-bullet">◆</span>
          <span>PRIVATE ATELIER SALON · HYDERABAD · LAT. 17.3850° N</span>
          <span className="ticker-bullet">◆</span>
          <span>HAUTE COUTURE ARCHIVE 2026.IV</span>
          <span className="ticker-bullet">◆</span>
          <span>100% PURE MULBERRY RAW SILK</span>
          <span className="ticker-bullet">◆</span>
          <span>COLD-HAMMERED PLATINUM ZARI</span>
          <span className="ticker-bullet">◆</span>
        </div>
      </div>

      {/* 02. The Items & Top Collections Rail */}
      <EditorialCollectionRail
        onProductClick={handleOpenProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 03. Simple Showcase of More Collection Items */}
      <MainCollectionShowcase
        onProductClick={handleOpenProduct}
        onAddToCart={handleAddToCart}
        onNavigateToCollection={onNavigateToCollection}
      />

      {/* 04. Customer Reviews & Patron Voices Matching Design Reference */}
      <EditorialTestimonials />

      {/* 04. Architectural Footer */}
      <Footer
        onNavigateToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToCollection={onNavigateToCollection}
        onNavigateToSection={(section) => {
          if (section === 'silhouettes' && onNavigateToSilhouettes) onNavigateToSilhouettes();
          else if (section === 'craft-narrative' && onNavigateToCraft) onNavigateToCraft();
          else if (section === 'lookbook' && onNavigateToLookbook) onNavigateToLookbook();
          else if (section === 'private-salon' && onNavigateToPrivateSalon) onNavigateToPrivateSalon();
          else onNavigateToCollection('all');
        }}
        onNavigateToGallery={onNavigateToGallery}
        onNavigateToAbout={onNavigateToAbout}
        onContactOpen={onNavigateToPrivateSalon}
      />

      {/* Quick View Modal fallback */}
      {isQuickViewOpen && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          onViewDetails={onProductClick}
        />
      )}
    </div>
  );
};

export default Home;
