import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, User, MessageSquare, Compass, Scissors, Layers, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const announcements = [
  "MAISON DISPATCH: COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER ₹10,000",
  "PRIVATE SALON: SLOTS NOW OPEN FOR HYDERABAD ATELIER & VIRTUAL CONSULTATIONS",
  "COLD COUTURE: 2026 WINTER ARCHIVES NOW INTRODUCED"
];

const Navbar = ({
  onCartOpen,
  onWishlistOpen,
  onAuthOpen,
  onProfileOpen,
  onContactOpen,
  onNavigateToHome,
  onNavigateToCollection,
  onNavigateToSection,
  onNavigateToGallery,
  onNavigateToAbout
}) => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Lazy initialize announcement visibility from localStorage
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    return localStorage.getItem('hideAnnouncement') !== 'true';
  });
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const hideAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem('hideAnnouncement', 'true');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <>
      {/* Top Architectural Announcement Bar */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="couture-announcement-bar"
          >
            <div className="announcement-content">
              <AnimatePresence mode="wait">
                <motion.span
                  key={announcementIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="announcement-message"
                >
                  {announcements[announcementIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              onClick={hideAnnouncement}
              className="announcement-close-btn touch-target"
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sticky Navbar */}
      <header className={`couture-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="couture-container navbar-inner-flex">
          {/* Mobile Menu Trigger */}
          <button
            className="navbar-mobile-toggle touch-target"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Couture Menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Left Nav Links */}
          <nav className="desktop-nav-menu left-nav" aria-label="Main Navigation">
            <button
              onClick={() => onNavigateToCollection('all')}
              className="nav-link-item"
            >
              ARCHIVE
            </button>
            <button
              onClick={() => onNavigateToSection('silhouettes')}
              className="nav-link-item"
            >
              SILHOUETTES
            </button>
            <button
              onClick={() => onNavigateToSection('digital-atelier')}
              className="nav-link-item"
            >
              DIGITAL ATELIER
            </button>
          </nav>

          {/* Center Architectural Brand Mark with logo1.png */}
          <div className="navbar-brand-mark" onClick={onNavigateToHome}>
            <img src="/logos/logo1.png" alt="LABEL by SAHITHI NANDAN" className="navbar-brand-logo-img" />
            <span className="brand-sub-descriptor">DIGITAL COUTURE HOUSE</span>
          </div>

          {/* Desktop Right Nav Links */}
          <nav className="desktop-nav-menu right-nav">
            <button
              onClick={() => onNavigateToSection('craft-narrative')}
              className="nav-link-item"
            >
              CRAFT NARRATIVE
            </button>
            <button
              onClick={() => onNavigateToSection('lookbook')}
              className="nav-link-item"
            >
              LOOKBOOK
            </button>
            <button
              onClick={() => onNavigateToSection('private-salon')}
              className="nav-link-item highlight-link"
            >
              PRIVATE SALON
            </button>
          </nav>

          {/* Utility Actions (Wishlist, Bag, Client Profile) */}
          <div className="navbar-utilities">
            {/* Wishlist */}
            <button
              className="nav-utility-btn touch-target"
              onClick={onWishlistOpen}
              aria-label={`Wishlist, ${wishlistCount} items`}
              title="Archival Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && <span className="nav-badge-count">{wishlistCount}</span>}
            </button>

            {/* Cart / Bag */}
            <button
              className="nav-utility-btn touch-target bag-btn"
              onClick={onCartOpen}
              aria-label={`Couture Bag, ${cartItemCount} items`}
              title="Couture Bag"
            >
              <ShoppingBag size={18} />
              {cartItemCount > 0 && <span className="nav-badge-count">{cartItemCount}</span>}
            </button>

            {/* User Profile */}
            <div className="user-profile-relative-wrap">
              {user ? (
                <button
                  className="nav-avatar-btn touch-target"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User profile menu"
                >
                  <span className="avatar-initials">{getInitials(user.name)}</span>
                </button>
              ) : (
                <button
                  className="nav-utility-btn touch-target"
                  onClick={onAuthOpen}
                  aria-label="Client Sign In"
                  title="Client Dossier Sign In"
                >
                  <User size={18} />
                </button>
              )}

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && user && (
                  <motion.div
                    className="user-dropdown-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-client-info">
                      <span className="d-client-name">{user.name}</span>
                      <span className="d-client-email">{user.email}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        onProfileOpen();
                      }}
                    >
                      Bespoke Sizing Profile
                    </button>
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        onCartOpen();
                      }}
                    >
                      Couture Bag & Orders
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-menu-item text-danger"
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Redesigned Architectural Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              className="mobile-drawer-sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer-header-row">
                <div className="drawer-brand-mark" onClick={() => { setMobileMenuOpen(false); onNavigateToHome(); }}>
                  <img src="/logos/logo1.png" alt="LABEL by SAHITHI NANDAN" className="drawer-brand-logo-img" />
                  <span className="drawer-brand-sub">DIGITAL COUTURE HOUSE</span>
                </div>
                <button
                  className="drawer-close-btn touch-target"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="drawer-links-scroll">
                <div className="drawer-category-group">
                  <span className="drawer-section-label">COUTURE ARCHIVES</span>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToCollection('all');
                    }}
                  >
                    <span>Complete Archive Collection</span>
                    <span className="link-arrow">→</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToCollection('sarees');
                    }}
                  >
                    <span>Couture Sarees</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToCollection('co-ords');
                    }}
                  >
                    <span>Architectural Co-ords</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToCollection('lehengas');
                    }}
                  >
                    <span>Sculptural Lehengas</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToCollection('men');
                    }}
                  >
                    <span>Menswear Atelier</span>
                  </button>
                </div>

                <div className="drawer-category-group">
                  <span className="drawer-section-label">ATELIER EXPERIENCES</span>
                  <button
                    className="drawer-link-item highlight-drawer-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToSection('silhouettes');
                    }}
                  >
                    <Compass size={16} />
                    <span>Find Your Silhouette</span>
                  </button>
                  <button
                    className="drawer-link-item highlight-drawer-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToSection('digital-atelier');
                    }}
                  >
                    <Scissors size={16} />
                    <span>Digital Customization Atelier</span>
                  </button>
                  <button
                    className="drawer-link-item highlight-drawer-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToSection('craft-narrative');
                    }}
                  >
                    <Layers size={16} />
                    <span>Craft Behind The Piece</span>
                  </button>
                  <button
                    className="drawer-link-item highlight-drawer-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToSection('lookbook');
                    }}
                  >
                    <Sparkles size={16} />
                    <span>Campaign Lookbook</span>
                  </button>
                  <button
                    className="drawer-link-item highlight-drawer-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToSection('private-salon');
                    }}
                  >
                    <MessageSquare size={16} />
                    <span>Private Salon Booking</span>
                  </button>
                </div>

                <div className="drawer-category-group">
                  <span className="drawer-section-label">THE MAISON</span>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToAbout();
                    }}
                  >
                    <span>Atelier Manifesto</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onNavigateToGallery();
                    }}
                  >
                    <span>Artisanal Gallery</span>
                  </button>
                  <button
                    className="drawer-link-item"
                    onClick={() => {
                      handleMobileLinkClick();
                      onContactOpen();
                    }}
                  >
                    <span>Direct Concierge Contact</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="drawer-footer-block">
                <div className="drawer-coords-line">
                  <span>HYDERABAD FLAGSHIP · LAT. 17.3850° N</span>
                </div>
                <button
                  className="btn-couture-primary drawer-concierge-btn touch-target"
                  onClick={() => {
                    handleMobileLinkClick();
                    window.open('https://wa.me/919000164752?text=Hello%20Sahithi%2C%20inquiry%20regarding%20Cold%20Couture%20collection', '_blank');
                  }}
                >
                  <MessageSquare size={16} />
                  <span>WHATSAPP ATELIER CONCIERGE</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
