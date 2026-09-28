import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CinematicHero from '../components/CinematicHero';
import EditorialCollectionRail from '../components/EditorialCollectionRail';
import SilhouetteDiscovery from '../components/SilhouetteDiscovery';
import CraftNarrative from '../components/CraftNarrative';
import DigitalAtelier from '../components/DigitalAtelier';
import EditorialLookbook from '../components/EditorialLookbook';
import PrivateAtelierBooking from '../components/PrivateAtelierBooking';
import EditorialTestimonials from '../components/EditorialTestimonials';
import Footer from '../components/Footer';
import QuickViewModal from '../components/QuickViewModal';
import InteractiveCoutureCanvas from '../components/InteractiveCoutureCanvas';
import './Home.css';

const Home = ({
  _onAuthOpen,
  _onProfileOpen,
  onNavigateToCollection,
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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cold-couture-homepage">
      {/* Interactive Framer Motion Dynamic Luminous Canvas */}
      <InteractiveCoutureCanvas />

      {/* 01. Cinematic Hero with Cursor-Responsive Parallax */}
      <CinematicHero
        onExploreSilhouettes={() => scrollToSection('silhouettes')}
        onOpenAtelier={() => scrollToSection('digital-atelier')}
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

      {/* 02. The Editorial Collection Rail */}
      <EditorialCollectionRail
        onProductClick={handleOpenProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 03. Interactive "Find Your Silhouette" Discovery Experience */}
      <SilhouetteDiscovery
        onProductClick={handleOpenProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 04. "Craft Behind the Piece" Scroll Narrative */}
      <CraftNarrative
        onOpenConsultation={() => scrollToSection('private-salon')}
      />

      {/* 05. The Digital Atelier (Product Customization Suite) */}
      <DigitalAtelier
        onCustomPieceCreated={(_piece) => {
          // Handled via CartContext in DigitalAtelier
        }}
      />

      {/* 06. Immersive Campaign Lookbook */}
      <EditorialLookbook
        onProductClick={handleOpenProduct}
      />

      {/* 07. Private Atelier & Virtual Salon Consultation */}
      <PrivateAtelierBooking />

      {/* 08. Cinematic Editorial Testimonials & Patron Voices */}
      <EditorialTestimonials />

      {/* 09. Cold Couture Architectural Footer */}
      <Footer
        onNavigateToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToCollection={onNavigateToCollection}
        onNavigateToSection={scrollToSection}
        onNavigateToGallery={() => {}}
        onNavigateToAbout={() => {}}
        onContactOpen={() => scrollToSection('private-salon')}
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
