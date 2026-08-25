import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Instagram, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { BRAND_INFO, TEST_LOCATIONS } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    serviceInterest: 'driving-lesson',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <PageHeader 
        tag="GET IN TOUCH"
        title="CONTACT OUR INSTRUCTOR DIRECTLY."
        subtitle="Have questions about lesson availability, test centre preparation, or overseas licence conversions? Send us a message or give us a call."
        breadcrumb="Contact"
      />

      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Left Info Column */}
            <div className="contact-info-col">
              <div className="contact-info-card aura-card">
                <span className="pill-badge accent">DIRECT SUPPORT</span>
                <h3 className="info-title">Instructor Contact & Operational Details</h3>
                <p className="info-desc">
                  We aim to respond to all enquiries within 2-4 hours. For urgent test day car hire bookings within 48 hours, phone call or SMS is recommended.
                </p>

                <div className="contact-detail-items">
                  <div className="detail-item">
                    <div className="detail-icon"><Phone size={20} /></div>
                    <div>
                      <span className="detail-label">Phone & SMS (Direct Instructor)</span>
                      <strong className="detail-val">{BRAND_INFO.phonePlaceholder}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><Mail size={20} /></div>
                    <div>
                      <span className="detail-label">Email Inquiries</span>
                      <strong className="detail-val">{BRAND_INFO.emailPlaceholder}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><Clock size={20} /></div>
                    <div>
                      <span className="detail-label">Operating Hours</span>
                      <strong className="detail-val">{BRAND_INFO.hoursPlaceholder}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><MapPin size={20} /></div>
                    <div>
                      <span className="detail-label">Primary Service Area</span>
                      <strong className="detail-val">{BRAND_INFO.serviceArea}</strong>
                    </div>
                  </div>
                </div>

                <div className="contact-hubs-box">
                  <h4>Popular Service NSW Centres Covered:</h4>
                  <div className="hubs-pills">
                    {TEST_LOCATIONS.map((loc) => (
                      <span key={loc.id} className="hub-pill">{loc.name}</span>
                    ))}
                  </div>
                </div>

                <div className="contact-social-box">
                  <span className="social-label">Follow our test route reels:</span>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-badge">
                    <Instagram size={16} />
                    <span>Instagram @CanguruberDS (Placeholder)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-col">
              <div className="contact-form-card aura-card">
                {submitted ? (
                  <div className="form-success-box">
                    <CheckCircle2 size={54} className="success-icon" />
                    <h3>Thank You for Reaching Out!</h3>
                    <p>
                      Your message has been received (Mock UI State). In the live production version, our accredited instructor will review your enquiry and contact you via phone or email promptly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="primary">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="enquiry-form">
                    <span className="pill-badge">ONLINE ENQUIRY FORM</span>
                    <h3 className="form-heading">Send Us a Direct Message</h3>
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Alex Johnson"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="e.g. 0400 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Suburb in Sydney</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Mascot, Botany, Strathfield"
                          value={formData.suburb}
                          onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Service of Interest</label>
                      <select 
                        className="form-select"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      >
                        <option value="driving-lesson">Driving Lesson (1-on-1 Practice)</option>
                        <option value="car-hire">Car Hire for Practical Test</option>
                        <option value="lesson-and-car">Lesson + Car Package (Warm Up + Test)</option>
                        <option value="overseas-conversion">Overseas Licence Conversion</option>
                        <option value="other">General Question / Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message or Test Date *</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Tell us about your driving experience, target test date, or any specific concerns..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" icon={<Send size={18} />} className="w-full">
                      SEND MESSAGE
                    </Button>

                    <p className="form-footer-disclaimer">
                      We respect your privacy. Your information is used strictly to answer your driving enquiry.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
          align-items: flex-start;
        }
        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        .contact-info-card {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
        }
        .info-title {
          font-size: 1.5rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .info-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .contact-detail-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
        }
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .detail-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }
        .detail-label {
          display: block;
          font-size: 0.775rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .detail-val {
          font-size: 1rem;
          color: var(--text-primary);
        }
        .contact-hubs-box {
          margin-bottom: 2rem;
        }
        .contact-hubs-box h4 {
          font-size: 0.9rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }
        .hubs-pills {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .hub-pill {
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: var(--bg-main);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        .contact-social-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .social-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .instagram-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          background: var(--bg-surface-alt);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          width: fit-content;
        }

        /* Form */
        .contact-form-card {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
        }
        @media (max-width: 600px) {
          .contact-form-card {
            padding: 1.5rem;
          }
        }
        .form-heading {
          font-size: 1.6rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
        .form-footer-disclaimer {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          margin-top: 1rem;
        }
        .form-success-box {
          text-align: center;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .success-icon {
          color: var(--brand-success);
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </div>
  );
};
