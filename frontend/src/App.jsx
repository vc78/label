import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import WishlistDrawer from './components/WishlistDrawer';
import UserProfileModal from './components/UserProfileModal';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './components/ProductPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import SilhouettesPage from './pages/SilhouettesPage';
import CraftPage from './pages/CraftPage';
import LookbookPage from './pages/LookbookPage';
import PrivateSalonPage from './pages/PrivateSalonPage';
import WelcomePopup from './components/WelcomePopup';
import HotPicksDrawer from './components/HotPicksDrawer';
import ContactModal from './components/ContactModal';
import WhatsAppStickyCTA from './components/WhatsAppStickyCTA';
import './index.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHotPicksOpen, setIsHotPicksOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [currentRoute, setCurrentRoute] = useState('home'); // 'home' | 'collection' | 'product' | 'gallery' | 'about'
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  const navigateToCollection = (category = 'all') => {
    setActiveCategory(category);
    setCurrentRoute('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product) => {
    setActiveProduct(product);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const navigateToGallery = () => {
    setCurrentRoute('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    setCurrentRoute('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSilhouettes = () => {
    setCurrentRoute('silhouettes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCraft = () => {
    setCurrentRoute('craft');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLookbook = () => {
    setCurrentRoute('lookbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivateSalon = () => {
    setCurrentRoute('private-salon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId) => {
    if (sectionId === 'silhouettes') {
      navigateToSilhouettes();
    } else if (sectionId === 'craft-narrative') {
      navigateToCraft();
    } else if (sectionId === 'lookbook') {
      navigateToLookbook();
    } else if (sectionId === 'private-salon') {
      navigateToPrivateSalon();
    } else if (currentRoute !== 'home') {
      setCurrentRoute('home');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyBannerCoupon = (code) => {
    setAppliedCouponCode(code);
    setIsCartOpen(true);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <div className="app">

              {/* Global sticky navigation bar */}
              <Navbar
                onNavigateToHome={navigateToHome}
                onNavigateToCollection={navigateToCollection}
                onNavigateToSilhouettes={navigateToSilhouettes}
                onNavigateToPrivateSalon={navigateToPrivateSalon}
                onNavigateToCraft={navigateToCraft}
                onNavigateToLookbook={navigateToLookbook}
                onNavigateToSection={navigateToSection}
                onCartOpen={() => setIsCartOpen(true)}
                onAuthOpen={() => setIsAuthOpen(true)}
                onWishlistOpen={() => setIsWishlistOpen(true)}
                onProfileOpen={() => setIsProfileOpen(true)}
                onContactOpen={() => setIsContactOpen(true)}
                onNavigateToGallery={navigateToGallery}
                onNavigateToAbout={navigateToAbout}
              />

              {/* Main routing view */}
              <main className="main-content">
                {currentRoute === 'home' ? (
                  <Home
                    onAuthOpen={() => setIsAuthOpen(true)}
                    onProfileOpen={() => setIsProfileOpen(true)}
                    onNavigateToCollection={navigateToCollection}
                    onNavigateToSilhouettes={navigateToSilhouettes}
                    onNavigateToPrivateSalon={navigateToPrivateSalon}
                    onNavigateToCraft={navigateToCraft}
                    onNavigateToLookbook={navigateToLookbook}
                    onNavigateToAbout={navigateToAbout}
                    onNavigateToGallery={navigateToGallery}
                    onProductClick={navigateToProduct}
                    onApplyCoupon={handleApplyBannerCoupon}
                  />
                ) : currentRoute === 'collection' ? (
                  <CollectionPage
                    initialCategory={activeCategory}
                    onBack={navigateToHome}
                    onProductClick={navigateToProduct}
                  />
                ) : currentRoute === 'silhouettes' ? (
                  <SilhouettesPage
                    onBack={navigateToHome}
                    onProductClick={navigateToProduct}
                    onAddToCart={(product) => {
                      // Handled by context inside or product click
                      navigateToProduct(product);
                    }}
                    onNavigateToCollection={navigateToCollection}
                    onNavigateToSection={navigateToSection}
                  />
                ) : currentRoute === 'craft' ? (
                  <CraftPage
                    onBack={navigateToHome}
                    onOpenConsultation={navigateToPrivateSalon}
                    onNavigateToCollection={navigateToCollection}
                    onNavigateToSection={navigateToSection}
                  />
                ) : currentRoute === 'lookbook' ? (
                  <LookbookPage
                    onBack={navigateToHome}
                    onProductClick={navigateToProduct}
                    onNavigateToCollection={navigateToCollection}
                    onNavigateToSection={navigateToSection}
                  />
                ) : currentRoute === 'private-salon' ? (
                  <PrivateSalonPage
                    onBack={navigateToHome}
                    onNavigateToCollection={navigateToCollection}
                    onNavigateToSection={navigateToSection}
                  />
                ) : currentRoute === 'product' && activeProduct ? (
                  <ProductPage
                    product={activeProduct}
                    onBack={() => {
                      setCurrentRoute(activeCategory ? 'collection' : 'home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ) : currentRoute === 'gallery' ? (
                  <GalleryPage onBack={navigateToHome} />
                ) : currentRoute === 'about' ? (
                  <AboutPage onBack={navigateToHome} />
                ) : null}
              </main>

              {/* Global floating side cart panel with coupon support */}
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                externalCoupon={appliedCouponCode}
                onClearExternalCoupon={() => setAppliedCouponCode('')}
              />

              {/* Global Wishlist Drawer */}
              <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

              {/* Global Auth Modal */}
              <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

              {/* Global Profile/Sizing Modal */}
              <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

              {/* Global Contact Modal */}
              <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

              {/* Welcome Popup & Hot Picks Drawer */}
              <WelcomePopup
                onCartOpen={() => setIsCartOpen(true)}
                onProductClick={navigateToProduct}
              />
              <HotPicksDrawer
                isOpen={isHotPicksOpen}
                onClose={() => setIsHotPicksOpen(false)}
                onCartOpen={() => setIsCartOpen(true)}
                onProductClick={navigateToProduct}
              />

              {/* Direct WhatsApp Concierge Sticky CTA */}
              <WhatsAppStickyCTA />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
