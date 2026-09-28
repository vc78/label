import React from 'react';
import './WhatsAppStickyCTA.css';

const WhatsAppStickyCTA = () => {
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const phoneNumber = '919000164752';
    const message = encodeURIComponent(
      'Hello Sahithi & Atelier Concierge, I would like to inquire about a bespoke couture commission.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="Direct WhatsApp Concierge" className="whatsapp-cta-wrapper">
      <a
        href="https://wa.me/919000164752"
        onClick={handleWhatsAppClick}
        className="whatsapp-sticky-cta"
        aria-label="Chat on WhatsApp with Atelier Concierge"
        title="Chat on WhatsApp with Atelier Concierge"
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
          className="whatsapp-cta-icon"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.764.78 2.796.78 3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.965 5.765c0 5.517-4.482 9.998-10 9.998-1.758 0-3.414-.46-4.858-1.266L2 22l1.536-5.61C2.698 14.927 2.213 13.513 2.213 12c0-5.517 4.483-9.998 10-9.998 5.518 0 10 4.481 10 9.998z" />
        </svg>
        <span className="sr-only">Chat on WhatsApp with Atelier Concierge</span>
      </a>
    </aside>
  );
};

export default WhatsAppStickyCTA;
