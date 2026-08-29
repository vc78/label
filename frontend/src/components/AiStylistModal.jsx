import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, MessageCircle, Bot, User, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';
import { askGeminiStylist } from '../utils/gemini';
import './AiStylistModal.css';

const QUICK_PROMPTS = [
  "✨ Haldi & Mehendi Outfits",
  "💃 Sangeet & Reception Look",
  "👰 Bridal Trousseau Styling",
  "🎨 Best Colors for Evening Galas",
  "📏 How Bespoke Sizing Works"
];

const AiStylistModal = ({ isOpen, onClose, onNavigateToProduct, onNavigateToCollection }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! ✨ I am your personal AI Haute Couture Stylist at **LABEL by SAHITHI NANDAN**.\n\nTell me about your upcoming wedding, gala, or festive occasion, and I'll curate the perfect bespoke ensemble and jewelry styling for you!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = async (userText) => {
    const text = (userText || inputMessage).trim();
    if (!text || isTyping) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const history = messages.filter(m => m.id !== 'welcome');
      const aiReply = await askGeminiStylist(text, history);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: aiReply
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "✨ I'd love to help! Please connect directly with Sahithi on WhatsApp (+91 9000164752) for immediate personal styling."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleWhatsAppWithStylist = () => {
    const lastUserQuery = messages.filter(m => m.sender === 'user').pop()?.text || 'custom styling consultation';
    const text = encodeURIComponent(`Hello Sahithi, I was chatting with your AI Stylist about: "${lastUserQuery}". Can we discuss custom tailoring and fabrics?`);
    window.open(`https://wa.me/919000164752?text=${text}`, '_blank');
  };

  const formatMessageText = (text) => {
    // Basic bold parsing
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="ai-bold-text">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="ai-stylist-backdrop" onClick={onClose}>
      <motion.div
        className="ai-stylist-modal-card"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="ai-stylist-header">
          <div className="ai-header-brand">
            <div className="ai-bot-avatar">
              <Sparkles size={20} className="sparkle-gold-icon" />
            </div>
            <div>
              <div className="ai-title-row">
                <h3>AI Couture Stylist</h3>
                <span className="gemini-badge">Gemini Powered</span>
              </div>
              <p className="ai-subtitle">LABEL by SAHITHI NANDAN Atelier</p>
            </div>
          </div>
          <button className="ai-close-btn touch-target" onClick={onClose} aria-label="Close AI Stylist">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="ai-messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
              {msg.sender === 'bot' && (
                <div className="ai-mini-avatar">
                  <Bot size={15} />
                </div>
              )}
              <div className={`ai-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                <div className="ai-bubble-content">
                  {formatMessageText(msg.text)}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className="user-mini-avatar">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="ai-message-row bot-row">
              <div className="ai-mini-avatar">
                <Bot size={15} />
              </div>
              <div className="ai-bubble bot-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="ai-quick-prompts-tray">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              className="ai-prompt-chip"
              onClick={() => handleSend(prompt)}
              disabled={isTyping}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="ai-whatsapp-bridge">
          <button className="ai-bridge-btn" onClick={handleWhatsAppWithStylist}>
            <MessageCircle size={16} />
            <span>Consult Sahithi on WhatsApp</span>
          </button>
          <button
            className="ai-explore-btn"
            onClick={() => {
              onClose();
              if (onNavigateToCollection) onNavigateToCollection('all');
            }}
          >
            <ShoppingBag size={15} />
            <span>View All Collections</span>
          </button>
        </div>

        {/* Input Bar */}
        <form
          className="ai-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="ai-text-input"
            placeholder="Ask about fabrics, colors, matching jewelry, or events..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="ai-send-btn touch-target"
            disabled={!inputMessage.trim() || isTyping}
            aria-label="Send query"
          >
            <Send size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AiStylistModal;
