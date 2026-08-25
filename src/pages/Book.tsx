import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Car, 
  User, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { SERVICES, TEST_LOCATIONS, BRAND_INFO } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Book: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'driving-lesson';
  const initialLocation = searchParams.get('location') || 'loc-01';

  // Multi-step state: 1: Service, 2: Location, 3: Date/Time, 4: Student Details, 5: Review & Confirmed
  const [step, setStep] = useState<number>(1);

  const [booking, setBooking] = useState({
    serviceId: initialService,
    locationId: initialLocation,
    transmission: 'automatic',
    date: '2026-09-10',
    timeSlot: '09:00 AM - 10:30 AM',
    fullName: '',
    email: '',
    phone: '',
    licenceType: 'NSW Learner Licence',
    pickupAddress: '',
    notes: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (searchParams.get('service')) {
      setBooking(prev => ({ ...prev, serviceId: searchParams.get('service') || prev.serviceId }));
    }
    if (searchParams.get('location')) {
      setBooking(prev => ({ ...prev, locationId: searchParams.get('location') || prev.locationId }));
    }
  }, [searchParams]);

  const selectedServiceObj = SERVICES.find(s => s.id === booking.serviceId) || SERVICES[0];
  const selectedLocationObj = TEST_LOCATIONS.find(l => l.id === booking.locationId) || TEST_LOCATIONS[0];

  const timeSlots = [
    '07:30 AM - 09:00 AM (Early Slot)',
    '09:30 AM - 11:00 AM (Morning Test Prep)',
    '11:30 AM - 01:00 PM (Midday Session)',
    '02:00 PM - 03:30 PM (Afternoon Traffic)',
    '04:00 PM - 05:30 PM (School Zone & Peak)',
    '05:45 PM - 07:15 PM (Twilight/Dusk Drive)'
  ];

  const nextStep = () => {
    if (step === 4) {
      if (!booking.fullName || !booking.email || !booking.phone) {
        alert('Please fill in your name, email, and phone number to continue.');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsCompleted(true);
  };

  return (
    <div className="book-page">
      <PageHeader 
        tag="ONLINE BOOKING WIZARD"
        title="SCHEDULE YOUR DRIVING SESSION."
        subtitle="Select your preferred service, Service NSW test location, date, and time slot. Instant UI mock booking confirmation."
        breadcrumb="Book Online"
      />

      <section className="section-padding">
        <div className="container">
          {/* Progress Indicator */}
          {!isCompleted && (
            <div className="booking-stepper-wrapper aura-card">
              <div className="stepper-bar">
                <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                  <span className="node-num">1</span>
                  <span className="node-label">Select Service</span>
                </div>
                <div className={`stepper-line ${step >= 2 ? 'active' : ''}`} />
                <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
                  <span className="node-num">2</span>
                  <span className="node-label">Location / Centre</span>
                </div>
                <div className={`stepper-line ${step >= 3 ? 'active' : ''}`} />
                <div className={`step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'done' : ''}`}>
                  <span className="node-num">3</span>
                  <span className="node-label">Date & Time</span>
                </div>
                <div className={`stepper-line ${step >= 4 ? 'active' : ''}`} />
                <div className={`step-node ${step >= 4 ? 'active' : ''} ${step > 4 ? 'done' : ''}`}>
                  <span className="node-num">4</span>
                  <span className="node-label">Student Details</span>
                </div>
                <div className={`stepper-line ${step >= 5 ? 'active' : ''}`} />
                <div className={`step-node ${step === 5 ? 'active' : ''}`}>
                  <span className="node-num">5</span>
                  <span className="node-label">Review</span>
                </div>
              </div>
            </div>
          )}

          <div className="booking-layout-grid">
            {/* Main Interactive Form Body */}
            <div className="booking-main-col">
              {isCompleted ? (
                /* Success Screen */
                <div className="booking-success-card aura-card text-center">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={64} className="success-check-icon" />
                  </div>
                  <span className="pill-badge accent">MOCK BOOKING CONFIRMED</span>
                  <h2 className="success-title">Your Driving Session Request is Reserved!</h2>
                  <p className="success-p">
                    Thank you, <strong>{booking.fullName}</strong>. This is a complete front-end demonstration of the booking UX. In the production live release, your instructor will confirm your test slot via SMS and email.
                  </p>

                  <div className="booking-summary-receipt aura-card">
                    <h4>Booking Summary</h4>
                    <div className="receipt-row">
                      <span>Service:</span>
                      <strong>{selectedServiceObj.title} ({selectedServiceObj.pricePlaceholder})</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Location:</span>
                      <strong>{selectedLocationObj.name}</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Date & Time:</span>
                      <strong>{booking.date} @ {booking.timeSlot}</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Contact:</span>
                      <strong>{booking.phone} ({booking.email})</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Licence Status:</span>
                      <strong>{booking.licenceType}</strong>
                    </div>
                  </div>

                  <div className="success-actions">
                    <Button onClick={() => { setIsCompleted(false); setStep(1); }} variant="primary" size="lg">
                      Book Another Session
                    </Button>
                    <Button to="/" variant="outline" size="lg">
                      Return to Homepage
                    </Button>
                  </div>
                </div>
              ) : (
                /* Multi-Step Wizard */
                <div className="booking-step-container aura-card">
                  {/* STEP 1: SERVICE SELECTION */}
                  {step === 1 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 1 OF 5</span>
                        <h3 className="step-title">Choose Your Training or Test Service</h3>
                        <p className="step-desc">Select whether you need driving instruction, practical test car rental, or the combined package.</p>
                      </div>

                      <div className="service-select-grid">
                        {SERVICES.map((s) => {
                          const isSelected = booking.serviceId === s.id;
                          return (
                            <div 
                              key={s.id} 
                              className={`service-option-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => setBooking({ ...booking, serviceId: s.id })}
                            >
                              <div className="option-top">
                                <span className="option-num">{s.number}</span>
                                <span className="option-price">{s.pricePlaceholder}</span>
                              </div>
                              <h4 className="option-title">{s.title}</h4>
                              <p className="option-desc">{s.shortDesc}</p>
                              <span className="option-badge">{s.badge}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: LOCATION SELECTION */}
                  {step === 2 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 2 OF 5</span>
                        <h3 className="step-title">Select Your Service NSW Test Centre / Region</h3>
                        <p className="step-desc">Choose the testing center where you will take your test or nearby training suburb.</p>
                      </div>

                      <div className="location-select-grid">
                        {TEST_LOCATIONS.map((loc) => {
                          const isSelected = booking.locationId === loc.id;
                          return (
                            <div 
                              key={loc.id} 
                              className={`location-option-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => setBooking({ ...booking, locationId: loc.id })}
                            >
                              <div className="loc-card-header">
                                <MapPin size={20} className="loc-pin" />
                                <span className="loc-code">{loc.code}</span>
                              </div>
                              <h4 className="loc-name">{loc.name}</h4>
                              <p className="loc-desc">{loc.description}</p>
                              <span className="loc-type-tag">{loc.testCenterType}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DATE & TIME */}
                  {step === 3 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 3 OF 5</span>
                        <h3 className="step-title">Select Preferred Date & Starting Time</h3>
                        <p className="step-desc">Pick your target lesson or test appointment date and preferred time window.</p>
                      </div>

                      <div className="datetime-grid">
                        <div className="form-group">
                          <label className="form-label">Select Date</label>
                          <div className="input-with-icon">
                            <input 
                              type="date" 
                              className="form-input" 
                              value={booking.date}
                              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Select Transmission Type</label>
                          <div className="transmission-toggle">
                            <button 
                              type="button" 
                              className={`trans-btn ${booking.transmission === 'automatic' ? 'active' : ''}`}
                              onClick={() => setBooking({ ...booking, transmission: 'automatic' })}
                            >
                              Automatic Transmission (Default)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="timeslots-section">
                        <label className="form-label">Available Time Windows</label>
                        <div className="slots-grid">
                          {timeSlots.map((slot, i) => (
                            <button 
                              key={i} 
                              type="button" 
                              className={`slot-chip ${booking.timeSlot === slot ? 'active' : ''}`}
                              onClick={() => setBooking({ ...booking, timeSlot: slot })}
                            >
                              <Clock size={14} />
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: STUDENT DETAILS */}
                  {step === 4 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 4 OF 5</span>
                        <h3 className="step-title">Student & Licence Information</h3>
                        <p className="step-desc">Enter your contact details so the instructor can confirm your pickup and booking schedule.</p>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g. Jordan Smith"
                            value={booking.fullName}
                            onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Mobile Phone (for SMS confirmation) *</label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="e.g. 0412 345 678"
                            value={booking.phone}
                            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Email Address *</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            placeholder="e.g. jordan@example.com"
                            value={booking.email}
                            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Current Licence Type</label>
                          <select 
                            className="form-select"
                            value={booking.licenceType}
                            onChange={(e) => setBooking({ ...booking, licenceType: e.target.value })}
                          >
                            <option value="NSW Learner Licence">NSW Learner Licence (L-Plate)</option>
                            <option value="Overseas Driver Licence">Overseas / International Licence</option>
                            <option value="Provisional P1/P2 Refresher">Provisional P1/P2 Refresher</option>
                            <option value="Full Licence Refresher">Full Licence Refresher</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Pickup Address or Suburb (Optional)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 124 Botany Rd, Mascot NSW"
                          value={booking.pickupAddress}
                          onChange={(e) => setBooking({ ...booking, pickupAddress: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Special Notes / Test Booking Reference (Optional)</label>
                        <textarea 
                          className="form-textarea" 
                          placeholder="e.g. Test booked for 10:15 AM with Service NSW Botany, or specific parking concerns..."
                          value={booking.notes}
                          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: REVIEW & CONFIRM */}
                  {step === 5 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 5 OF 5</span>
                        <h3 className="step-title">Review & Finalize Your Booking</h3>
                        <p className="step-desc">Please verify all details before submitting your driving appointment request.</p>
                      </div>

                      <div className="review-cards-list">
                        <div className="review-block">
                          <span className="rev-label">Selected Service</span>
                          <strong className="rev-val">{selectedServiceObj.title}</strong>
                          <span className="rev-sub">{selectedServiceObj.pricePlaceholder} • {selectedServiceObj.badge}</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Location / Centre</span>
                          <strong className="rev-val">{selectedLocationObj.name}</strong>
                          <span className="rev-sub">{selectedLocationObj.addressPlaceholder}</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Appointment Time</span>
                          <strong className="rev-val">{booking.date}</strong>
                          <span className="rev-sub">{booking.timeSlot} ({booking.transmission} vehicle)</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Student Details</span>
                          <strong className="rev-val">{booking.fullName}</strong>
                          <span className="rev-sub">{booking.phone} • {booking.email} • {booking.licenceType}</span>
                        </div>
                      </div>

                      <div className="policy-notice-box">
                        <ShieldCheck size={18} className="notice-icon" />
                        <div>
                          <strong>Zero Risk Mock Reservation:</strong>
                          <p>No immediate payment required at this step. Your instructor will contact you to confirm timing details.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="stepper-nav-bar">
                    {step > 1 ? (
                      <Button onClick={prevStep} variant="outline" icon={<ArrowLeft size={16} />}>
                        Previous Step
                      </Button>
                    ) : <div />}

                    {step < 5 ? (
                      <Button onClick={nextStep} variant="primary" icon={<ArrowRight size={16} />}>
                        Continue to Step {step + 1}
                      </Button>
                    ) : (
                      <Button onClick={handleFinalSubmit} variant="primary" size="lg" icon={<CheckCircle2 size={18} />}>
                        CONFIRM BOOKING REQUEST
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Order Summary Sidebar */}
            {!isCompleted && (
              <div className="booking-summary-col">
                <div className="summary-sidebar-card aura-card">
                  <span className="pill-badge">SESSION OVERVIEW</span>
                  <h4 className="sidebar-title">Your Booking Details</h4>

                  <div className="sidebar-summary-list">
                    <div className="sidebar-item">
                      <span className="side-label">Selected Service</span>
                      <strong className="side-val">{selectedServiceObj.title}</strong>
                      <span className="side-chip">{selectedServiceObj.badge}</span>
                    </div>

                    <div className="sidebar-item">
                      <span className="side-label">Test / Practice Centre</span>
                      <strong className="side-val">{selectedLocationObj.name}</strong>
                    </div>

                    <div className="sidebar-item">
                      <span className="side-label">Date & Time</span>
                      <strong className="side-val">{booking.date}</strong>
                      <span className="side-time">{booking.timeSlot}</span>
                    </div>

                    <div className="sidebar-item price-row">
                      <span className="side-label">Total Estimated Price</span>
                      <strong className="side-price">{selectedServiceObj.pricePlaceholder}</strong>
                    </div>
                  </div>

                  <div className="sidebar-trust-box">
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>NSW Dual-Control Automatic Car</span>
                    </div>
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>Authorized Driving Instructor</span>
                    </div>
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>Flexible Rescheduling Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        /* Stepper bar */
        .booking-stepper-wrapper {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 1.75rem 2.5rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 768px) {
          .booking-stepper-wrapper {
            padding: 1.25rem 1rem;
          }
        }
        .stepper-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          z-index: 2;
        }
        .node-num {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-surface-alt);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .step-node.active .node-num {
          background: var(--accent-primary);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }
        .step-node.done .node-num {
          background: var(--text-primary);
          color: #FFFFFF;
        }
        .node-label {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .node-label {
            display: none;
          }
        }
        .step-node.active .node-label {
          color: var(--text-primary);
        }
        .stepper-line {
          flex: 1;
          height: 2px;
          background: var(--border-light);
          margin: 0 0.5rem;
          position: relative;
          top: -10px;
        }
        .stepper-line.active {
          background: var(--text-primary);
        }

        /* Layout Grid */
        .booking-layout-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 2.5rem;
          align-items: flex-start;
        }
        @media (max-width: 960px) {
          .booking-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        .booking-step-container {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
        }
        @media (max-width: 600px) {
          .booking-step-container {
            padding: 1.5rem;
          }
        }
        .step-heading-row {
          margin-bottom: 2rem;
        }
        .step-title {
          font-size: 1.6rem;
          font-weight: 900;
          margin-top: 0.5rem;
          margin-bottom: 0.4rem;
        }
        .step-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* Step 1: Services */
        .service-select-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .service-option-card {
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background: var(--bg-surface);
        }
        .service-option-card:hover {
          border-color: var(--border-medium);
          background: var(--bg-card-hover);
        }
        .service-option-card.selected {
          border-color: var(--text-primary);
          background: var(--accent-subtle);
          box-shadow: var(--shadow-sm);
        }
        .option-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .option-num {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .option-price {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .option-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }
        .option-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        .option-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          background: #FFFFFF;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        /* Step 2: Locations */
        .location-select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .location-select-grid {
            grid-template-columns: 1fr;
          }
        }
        .location-option-card {
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .location-option-card:hover {
          border-color: var(--border-medium);
        }
        .location-option-card.selected {
          border-color: var(--text-primary);
          background: var(--accent-subtle);
        }
        .loc-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .loc-pin {
          color: var(--text-primary);
        }
        .loc-code {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .loc-name {
          font-size: 1rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }
        .loc-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .loc-type-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        /* Step 3: Date / Time */
        .datetime-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) {
          .datetime-grid {
            grid-template-columns: 1fr;
          }
        }
        .trans-btn {
          width: 100%;
          padding: 0.875rem;
          background: var(--bg-surface-alt);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.875rem;
          color: var(--text-primary);
        }
        .trans-btn.active {
          background: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }
        .slots-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 0.5rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .slots-grid {
            grid-template-columns: 1fr;
          }
        }
        .slot-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--bg-surface-alt);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: all 0.2s;
        }
        .slot-chip:hover {
          border-color: var(--border-medium);
        }
        .slot-chip.active {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          font-weight: 800;
        }

        /* Step 5: Review */
        .review-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .review-block {
          background: var(--bg-surface-alt);
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
        }
        .rev-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .rev-val {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .rev-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .policy-notice-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FFFFFF;
          border: 1px dashed var(--border-medium);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .notice-icon {
          color: var(--brand-success);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .policy-notice-box strong {
          display: block;
          font-size: 0.85rem;
        }
        .policy-notice-box p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Stepper Navigation */
        .stepper-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-light);
        }

        /* Sidebar */
        .summary-sidebar-card {
          background: #FFFFFF;
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          position: sticky;
          top: 100px;
        }
        .sidebar-title {
          font-size: 1.35rem;
          font-weight: 900;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .sidebar-summary-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        .side-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .side-val {
          display: block;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .side-chip {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          background: var(--bg-surface-alt);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          margin-top: 0.25rem;
        }
        .side-time {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .price-row {
          padding-top: 0.75rem;
          border-top: 1px dashed var(--border-light);
        }
        .side-price {
          font-size: 1.4rem;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }
        .sidebar-trust-box {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .trust-point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .green {
          color: #16A34A;
        }

        /* Success */
        .booking-success-card {
          background: #FFFFFF;
          padding: 4rem 2.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrap {
          margin-bottom: 1rem;
        }
        .success-check-icon {
          color: #16A34A;
        }
        .success-title {
          font-size: 2.2rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .success-p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .booking-summary-receipt {
          background: var(--bg-surface-alt);
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 540px;
          margin-bottom: 2.5rem;
          text-align: left;
        }
        .booking-summary-receipt h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-medium);
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.9rem;
        }
        .receipt-row span {
          color: var(--text-muted);
        }
        .success-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
