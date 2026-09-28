import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import SilhouetteDiscovery from '../components/SilhouetteDiscovery';
import Footer from '../components/Footer';
import './DedicatedPage.css';

const SilhouettesPage = ({ onBack, onProductClick, onAddToCart, onNavigateToCollection, onNavigateToSection }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="dedicated-page-wrapper">
      <div className="couture-container">
        <div className="dedicated-page-nav">
          <button onClick={onBack} className="back-btn-chic" aria-label="Back to Home">
            <ArrowLeft size={17} />
            <span>Back to Home</span>
          </button>
          <div className="dedicated-breadcrumbs">
            <span onClick={onBack} className="crumb-link">Home</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Silhouettes</span>
          </div>
        </div>
      </div>

      <main>
        <SilhouetteDiscovery
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      </main>

      <Footer
        onNavigateToHome={onBack}
        onNavigateToCollection={onNavigateToCollection}
        onNavigateToSection={onNavigateToSection}
      />
    </div>
  );
};

export default SilhouettesPage;
