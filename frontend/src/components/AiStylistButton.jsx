import React from 'react';
import { Sparkles } from 'lucide-react';
import './AiStylistButton.css';

const AiStylistButton = ({ onClick }) => {
  return (
    <button
      className="ai-floating-trigger-btn"
      onClick={onClick}
      aria-label="Open AI Couture Stylist"
      title="Ask Sahithi's AI Couture Stylist"
    >
      <div className="ai-trigger-icon-wrap">
        <Sparkles size={18} className="ai-trigger-sparkle" />
      </div>
      <span className="ai-trigger-label">AI Stylist</span>
    </button>
  );
};

export default AiStylistButton;
