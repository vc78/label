import { MessageSquare, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import './Footer.css';

const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = ({ _onNavigateToHome, onNavigateToCollection, onNavigateToSection, _onNavigateToGallery, _onNavigateToAbout, _onContactOpen }) => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppContact = (e) => {
    e.preventDefault();
    const message = encodeURIComponent('Hello Sahithi & Atelier Concierge, I would like to inquire about a bespoke commission.');
    window.open(`https://wa.me/919000164752?text=${message}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="couture-maison-footer">
      <div className="couture-container">
        {/* Top Architectural Brand Row */}
        <div className="footer-top-monolith">
          <div className="footer-brand-lockup">
            <img src="/logos/logo1.png" alt="LABEL by SAHITHI NANDAN" className="footer-brand-logo-img" />
            <span className="footer-descriptor">DIGITAL COUTURE HOUSE · ARCHIVE 2026.IV</span>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-back-top-btn touch-target"
            aria-label="Back to top"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Global Ateliers & Concierge Strip */}
        <div className="footer-ateliers-grid">
          <div className="atelier-city-card">
            <span className="city-status">FLAGSHIP ATELIER</span>
            <h4 className="city-name">HYDERABAD</h4>
            <p className="city-coords">LAT. 17.3850° N · LONG. 78.4867° E</p>
            <p className="city-sub">Jubilee Hills Couture Salon & Pattern Rooms</p>
          </div>

          <div className="atelier-city-card">
            <span className="city-status">MIDDLE EAST CONCIERGE</span>
            <h4 className="city-name">DUBAI</h4>
            <p className="city-coords">DIFC · PRIVATE BRIDAL SUITE</p>
            <p className="city-sub">Direct express courier & video fitting</p>
          </div>

          <div className="atelier-city-card">
            <span className="city-status">EUROPEAN SALON</span>
            <h4 className="city-name">LONDON</h4>
            <p className="city-coords">MAYFAIR · BY APPOINTMENT</p>
            <p className="city-sub">Seasonal private client trunk shows</p>
          </div>

          <div className="atelier-city-card">
            <span className="city-status">NORTH AMERICA CONCIERGE</span>
            <h4 className="city-name">NEW YORK</h4>
            <p className="city-coords">MANHATTAN · PRIVATE SALON</p>
            <p className="city-sub">Direct bespoke trousseau consultations</p>
          </div>
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
                <InstagramIcon size={17} />
              </a>
              <a
                href="#whatsapp"
                onClick={handleWhatsAppContact}
                className="social-icon-box touch-target"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare size={17} />
              </a>
              <a
                href="https://maps.app.goo.gl/DYnpiRtkERaKnSmA6"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box touch-target"
                aria-label="Google Maps Atelier"
              >
                <MapPin size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: The Archives */}
          <div className="matrix-col">
            <h4 className="matrix-title">ARCHIVAL SERIES</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => onNavigateToCollection('all')}>Complete 2026 Archive</button></li>
              <li><button onClick={() => onNavigateToCollection('sarees')}>Monolith Sarees</button></li>
              <li><button onClick={() => onNavigateToCollection('co-ords')}>Architectural Co-ords</button></li>
              <li><button onClick={() => onNavigateToCollection('lehengas')}>Fluted Lehengas</button></li>
              <li><button onClick={() => onNavigateToCollection('dresses')}>Couture Sheaths & Gowns</button></li>
              <li><button onClick={() => onNavigateToCollection('men')}>Atelier Menswear</button></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="matrix-col">
            <h4 className="matrix-title">ATELIER EXPERIENCES</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => onNavigateToSection('silhouettes')}>Find Your Silhouette</button></li>
              <li><button onClick={() => onNavigateToSection('digital-atelier')}>The Digital Customizer</button></li>
              <li><button onClick={() => onNavigateToSection('craft-narrative')}>Craft Behind The Piece</button></li>
              <li><button onClick={() => onNavigateToSection('lookbook')}>Campaign Lookbook</button></li>
              <li><button onClick={() => onNavigateToSection('private-salon')}>Private Salon Reservation</button></li>
              <li><button onClick={() => onNavigateToSection('patron-voices')}>Patron Testimonials</button></li>
            </ul>
          </div>

          {/* Col 4: Concierge & Client Protocol */}
          <div className="matrix-col">
            <h4 className="matrix-title">CLIENT CONCIERGE</h4>
            <div className="concierge-direct-card">
              <span className="c-head">PRIVATE ATELIER DISPATCH</span>
              <p className="c-phone">+91 90001 64752</p>
              <p className="c-hours">10:00 AM – 8:00 PM IST (Mon – Sat)</p>
              <button
                className="btn-couture-outline concierge-footer-btn touch-target"
                onClick={handleWhatsAppContact}
              >
                <MessageSquare size={14} />
                <span>INITIATE CHAT</span>
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
            <span>CERTIFIED COUTURE FABRICATION PROTOCOL · ZERO SYNTHETIC LININGS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
