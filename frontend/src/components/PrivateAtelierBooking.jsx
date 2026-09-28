import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Video, CheckCircle2, MessageSquare, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './PrivateAtelierBooking.css';

const SALON_MODES = [
  {
    id: 'virtual',
    title: 'Virtual Video Consultation',
    subtitle: '1-on-1 Digital Styling with Sahithi',
    duration: '45 Minutes',
    badge: 'Worldwide Clients',
    icon: Video,
    location: 'Encrypted HD Video Session'
  },
  {
    id: 'flagship',
    title: 'Private Flagship Fitting',
    subtitle: 'Exclusive Hyderabad Atelier Salon',
    duration: '90 Minutes',
    badge: 'Physical Salon',
    icon: MapPin,
    location: 'Jubilee Hills Atelier, Hyderabad'
  },
  {
    id: 'international',
    title: 'International Bridal Concierge',
    subtitle: 'Dubai · London · New York Private Suite',
    duration: 'Custom Schedule',
    badge: 'By Invitation / Seasonal',
    icon: UserCheck,
    location: 'Private Hotel Suite Concierge'
  }
];

const TIME_SLOTS = [
  '11:00 AM IST',
  '02:30 PM IST',
  '04:30 PM IST',
  '06:30 PM IST',
  '08:00 PM IST (US / EU Friendly)'
];

const PrivateAtelierBooking = () => {
  const { addToast } = useToast();
  const [selectedMode, setSelectedMode] = useState(SALON_MODES[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast('Please provide your name and WhatsApp contact', 'error');
      return;
    }

    setIsSubmitting(true);
    const bookingCode = `ATELIER-${Date.now().toString().slice(-6)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      const bookingData = {
        code: bookingCode,
        mode: selectedMode.title,
        date: selectedDate || 'To be finalized with concierge',
        time: selectedTime,
        client: formData
      };
      setBookingConfirmed(bookingData);
      addToast(`Salon Appointment Requested. Reference: ${bookingCode}`, 'success');

      // WhatsApp Concierge integration
      const message = encodeURIComponent(
        `Hello Sahithi & Atelier Concierge, I would like to confirm my private salon appointment.\n\n` +
        `Ref Code: ${bookingCode}\n` +
        `Experience: ${selectedMode.title}\n` +
        `Requested Date: ${selectedDate || 'Upcoming'}\n` +
        `Time Slot: ${selectedTime}\n` +
        `Client: ${formData.name} (${formData.phone})\n` +
        `Event Date: ${formData.eventDate || 'N/A'}\n` +
        `Notes: ${formData.notes || 'Bespoke couture inquiry'}`
      );
      window.open(`https://wa.me/919000164752?text=${message}`, '_blank');
    }, 700);
  };

  return (
    <section className="private-atelier-section" id="private-salon">
      <div className="couture-container">
        <div className="private-header">
          <div className="maison-label">Private Client Salon</div>
          <h2 className="private-title">Private Atelier Consultation</h2>
          <p className="private-subtitle">
            Reserve a confidential one-on-one couture consultation with founder and designer Sahithi Nandhan. Available via encrypted video or private flagship salon.
          </p>
        </div>

        <div className="booking-card-wrapper">
          <AnimatePresence mode="wait">
            {!bookingConfirmed ? (
              <form onSubmit={handleSubmit} className="booking-form-grid">
                {/* Left: Consultation Experience & Time Selection */}
                <div className="booking-selection-col">
                  <div className="booking-block-header">
                    <span className="step-tag">STEP 01</span>
                    <h3 className="block-title">SELECT SALON EXPERIENCE</h3>
                  </div>

                  <div className="mode-cards-stack">
                    {SALON_MODES.map((mode) => {
                      const IconComponent = mode.icon;
                      return (
                        <div
                          key={mode.id}
                          className={`mode-card ${selectedMode.id === mode.id ? 'mode-active' : ''}`}
                          onClick={() => setSelectedMode(mode)}
                        >
                          <div className="mode-icon-box">
                            <IconComponent size={20} />
                          </div>
                          <div className="mode-content">
                            <div className="mode-title-row">
                              <span className="mode-title">{mode.title}</span>
                              <span className="mode-badge">{mode.badge}</span>
                            </div>
                            <p className="mode-sub">{mode.subtitle}</p>
                            <div className="mode-meta-row">
                              <span className="m-dur">
                                <Clock size={12} /> {mode.duration}
                              </span>
                              <span className="m-loc">
                                <MapPin size={12} /> {mode.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Schedule Selector */}
                  <div className="schedule-sub-block">
                    <div className="booking-block-header">
                      <span className="step-tag">STEP 02</span>
                      <h3 className="block-title">SELECT PREFERRED CALENDAR SLOT</h3>
                    </div>

                    <div className="date-time-cluster">
                      <div className="date-input-wrap">
                        <label className="field-label">Preferred Date</label>
                        <input
                          type="date"
                          className="couture-field"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>

                      <div className="time-select-wrap">
                        <label className="field-label">Time Window</label>
                        <select
                          className="couture-field"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        >
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Client Information & Dispatch */}
                <div className="booking-client-col">
                  <div className="booking-block-header">
                    <span className="step-tag">STEP 03</span>
                    <h3 className="block-title">CLIENT & OCCASION DOSSIER</h3>
                  </div>

                  <div className="fields-grid">
                    <div className="field-group">
                      <label className="field-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Radhika Verma"
                        className="couture-field"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">WhatsApp Contact Number *</label>
                      <input
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+91 / International Phone"
                        className="couture-field"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Email Address</label>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="client@couture.com"
                        className="couture-field"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Occasion / Wedding Date</label>
                      <input
                        type="date"
                        autoComplete="off"
                        className="couture-field"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-width">
                      <label className="field-label">Styling Intent / Specific Pieces of Interest</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your desired silhouettes, color preferences, or specific archival pieces..."
                        className="couture-field textarea-field"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Security & Confidentiality Notice */}
                  <div className="confidentiality-bar">
                    <Shield size={16} />
                    <span>Strict client confidentiality guaranteed. Zero obligation consultation.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-couture-primary submit-booking-btn touch-target"
                  >
                    <span>{isSubmitting ? 'RESERVING ATELIER CALENDAR...' : 'CONFIRM PRIVATE APPOINTMENT'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                className="booking-success-dossier"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon-badge">
                  <CheckCircle2 size={36} />
                </div>
                <div className="maison-label">Salon Appointment Secured</div>
                <h3 className="success-title">APPOINTMENT DOSSIER: {bookingConfirmed.code}</h3>
                <p className="success-desc">
                  Your appointment request has been transmitted directly to Sahithi's personal atelier team. A dedicated couture concierge will confirm your calendar invite via WhatsApp.
                </p>

                <div className="dossier-receipt-card">
                  <div className="receipt-line">
                    <span className="r-label">EXPERIENCE:</span>
                    <span className="r-value">{bookingConfirmed.mode}</span>
                  </div>
                  <div className="receipt-line">
                    <span className="r-label">SCHEDULED DATE:</span>
                    <span className="r-value">{bookingConfirmed.date}</span>
                  </div>
                  <div className="receipt-line">
                    <span className="r-label">SLOT:</span>
                    <span className="r-value">{bookingConfirmed.time}</span>
                  </div>
                  <div className="receipt-line">
                    <span className="r-label">CLIENT:</span>
                    <span className="r-value">{bookingConfirmed.client.name}</span>
                  </div>
                </div>

                <div className="success-actions-row">
                  <button
                    className="btn-couture-primary"
                    onClick={() => {
                      const msg = encodeURIComponent(`Hello Sahithi, confirming appointment ${bookingConfirmed.code}`);
                      window.open(`https://wa.me/919000164752?text=${msg}`, '_blank');
                    }}
                  >
                    <MessageSquare size={16} />
                    <span>CHAT WITH CONCIERGE NOW</span>
                  </button>

                  <button
                    className="btn-couture-outline"
                    onClick={() => setBookingConfirmed(null)}
                  >
                    <span>RESERVE ANOTHER SLOT</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PrivateAtelierBooking;
