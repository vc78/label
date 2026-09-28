import { MessageSquare, MapPin, ArrowUp, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import './Footer.css';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = ({ onNavigateToHome, onNavigateToCollection, onNavigateToSection, _onNavigateToGallery, _onNavigateToAbout, onContactOpen }) => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppContact = (e) => {
    if (e) e.preventDefault();
    const message = encodeURIComponent('Hello Sahithi & Atelier Concierge, I would like to inquire about a bespoke commission.');
    window.open(`https://wa.me/919000164752?text=${message}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCityAction = (city) => {
    if (onContactOpen) {
      onContactOpen();
    } else {
      const message = encodeURIComponent(`Hello Sahithi & Atelier Concierge, I would like to inquire about a consultation for your ${city} salon.`);
      window.open(`https://wa.me/919000164752?text=${message}`, '_blank');
    }
  };

  return (
    <footer className="couture-maison-footer">
      <div className="couture-container">
        {/* Top Architectural Brand Row */}
        <div className="footer-top-monolith">
          <div className="footer-brand-lockup">
            <button
              onClick={onNavigateToHome || scrollToTop}
              className="footer-brand-btn"
              aria-label="Navigate to Home"
            >
              <img src="/logos/logo1.png" alt="LABEL by SAHITHI NANDAN" className="footer-brand-logo-img" />
            </button>
            <span className="footer-descriptor">DIGITAL COUTURE HOUSE &nbsp;·&nbsp; ARCHIVE 2026.IV</span>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-back-top-btn touch-target"
            aria-label="Back to top"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={15} />
          </button>
        </div>

        {/* Global Ateliers & Concierge Cards Grid */}
        <div className="footer-ateliers-grid">
          {/* 1. Hyderabad */}
          <div className="atelier-city-card" onClick={() => handleCityAction('Hyderabad')}>
            <div className="city-card-image-wrap">
              <img
                src="/images/atelier-hyderabad.jpg"
                alt="Hyderabad Flagship Atelier"
                className="city-card-img"
                loading="lazy"
              />
            </div>
            <div className="city-card-body">
              <span className="city-status">FLAGSHIP ATELIER</span>
              <h4 className="city-name">HYDERABAD</h4>
              <p className="city-coords">LAT. 17.3850° N &nbsp;·&nbsp; LONG. 78.4867° E</p>
              <div className="city-bottom-row">
                <p className="city-sub">Jubilee Hills Couture Salon &amp; Pattern Rooms</p>
                <button className="city-action-circle" aria-label="Hyderabad Atelier Details">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Dubai */}
          <div className="atelier-city-card" onClick={() => handleCityAction('Dubai')}>
            <div className="city-card-image-wrap">
              <img
                src="/images/atelier-dubai.jpg"
                alt="Dubai Middle East Concierge"
                className="city-card-img"
                loading="lazy"
              />
            </div>
            <div className="city-card-body">
              <span className="city-status">MIDDLE EAST CONCIERGE</span>
              <h4 className="city-name">DUBAI</h4>
              <p className="city-coords">DIFC &nbsp;·&nbsp; PRIVATE BRIDAL SUITE</p>
              <div className="city-bottom-row">
                <p className="city-sub">Direct express courier &amp; video fitting</p>
                <button className="city-action-circle" aria-label="Dubai Concierge Details">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. London */}
          <div className="atelier-city-card" onClick={() => handleCityAction('London')}>
            <div className="city-card-image-wrap">
              <img
                src="/images/atelier-london.jpg"
                alt="London European Salon"
                className="city-card-img"
                loading="lazy"
              />
            </div>
            <div className="city-card-body">
              <span className="city-status">EUROPEAN SALON</span>
              <h4 className="city-name">LONDON</h4>
              <p className="city-coords">MAYFAIR &nbsp;·&nbsp; BY APPOINTMENT</p>
              <div className="city-bottom-row">
                <p className="city-sub">Seasonal private client trunk shows</p>
                <button className="city-action-circle" aria-label="London Salon Details">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 4. New York */}
          <div className="atelier-city-card" onClick={() => handleCityAction('New York')}>
            <div className="city-card-image-wrap">
              <img
                src="/images/atelier-newyork.jpg"
                alt="New York North America Concierge"
                className="city-card-img"
                loading="lazy"
              />
            </div>
            <div className="city-card-body">
              <span className="city-status">NORTH AMERICA CONCIERGE</span>
              <h4 className="city-name">NEW YORK</h4>
              <p className="city-coords">MANHATTAN &nbsp;·&nbsp; PRIVATE SALON</p>
              <div className="city-bottom-row">
                <p className="city-sub">Direct bespoke trousseau consultations</p>
                <button className="city-action-circle" aria-label="New York Concierge Details">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ornamental Divider with Gold Floral Quatrefoil Motif */}
        <div className="footer-ornament-divider" aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-motif">❖</span>
          <span className="divider-line" />
        </div>

        {/* Navigation & Manifesto Grid */}
        <div className="footer-links-matrix">
          {/* Col 1: Manifesto */}
          <div className="matrix-col manifesto-col">
            <h4 className="matrix-title">THE ARCHITECTURAL CHARTER</h4>
            <p className="manifesto-text">
              Cold Couture represents a quiet refusal of decorative excess. We construct pure vertical volume using 380 GSM Mulberry raw silks, cold-hammered platinum wire, and internal structural corsetry. Every piece is fabricated exclusively to individual commission.
            </p>
            <div className="footer-social-cluster">
              <a
                href="https://www.instagram.com/label_by_sahithi_nandan/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box touch-target"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="social-icon-box touch-target"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare size={16} />
              </button>
              <a
                href="https://maps.app.goo.gl/DYnpiRtkERaKnSmA6"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box touch-target"
                aria-label="Google Maps Atelier"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: The Archives */}
          <div className="matrix-col">
            <h4 className="matrix-title">ARCHIVAL SERIES</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => onNavigateToCollection('all')}>
                  <span>Complete 2026 Archive</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToCollection('sarees')}>
                  <span>Monolith Sarees</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToCollection('co-ords')}>
                  <span>Architectural Co-ords</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToCollection('lehengas')}>
                  <span>Fluted Lehengas</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToCollection('dresses')}>
                  <span>Couture Sheaths &amp; Gowns</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToCollection('men')}>
                  <span>Atelier Menswear</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="matrix-col">
            <h4 className="matrix-title">ATELIER EXPERIENCES</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => onNavigateToSection('silhouettes')}>
                  <span>Find Your Silhouette</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('private-salon')}>
                  <span>Bespoke Salon Reservation</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('craft-narrative')}>
                  <span>Craft Behind The Piece</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('lookbook')}>
                  <span>Campaign Lookbook</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('private-salon')}>
                  <span>Private Salon Reservation</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('patron-voices')}>
                  <span>Patron Testimonials</span>
                  <span className="nav-chevron">›</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge & Client Protocol */}
          <div className="matrix-col concierge-col">
            <h4 className="matrix-title">CLIENT CONCIERGE</h4>
            <div className="concierge-direct-card">
              <span className="c-head">PRIVATE ATELIER DISPATCH</span>
              <div className="c-phone-row">
                <Phone size={16} className="c-phone-icon" />
                <span className="c-phone">+91 90001 64752</span>
              </div>
              <p className="c-hours">10:00 AM – 8:00 PM IST (Mon – Sat)</p>
              <button
                className="concierge-footer-btn touch-target"
                onClick={handleWhatsAppContact}
              >
                <MessageSquare size={14} />
                <span>INITIATE CHAT</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Certification Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-meta-text">
            © {currentYear} SAHITHI NANDAN COUTURE HOUSE. ALL RIGHTS RESERVED.
          </div>
          <div className="bottom-cert-badge">
            <ShieldCheck size={14} />
            <span>CERTIFIED COUTURE FABRICATION PROTOCOL &nbsp;·&nbsp; ZERO SYNTHETIC LININGS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

