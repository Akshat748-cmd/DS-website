import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../../data/content';

export const EditorialTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % PLACEHOLDER_REVIEWS.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + PLACEHOLDER_REVIEWS.length) % PLACEHOLDER_REVIEWS.length);

  const current = PLACEHOLDER_REVIEWS[activeIdx];

  // Girl driving background photos per review for rich storytelling
  const reviewBackgrounds = [
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85', // Girl smiling behind steering wheel driving
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=85', // Young woman driving confidently
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=85', // Female student driver with instructor
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'  // Driving session on highway
  ];

  const currentBg = reviewBackgrounds[activeIdx % reviewBackgrounds.length];

  return (
    <section className="editorial-testimonials-section section-padding">
      <div className="container">
        <div className="section-header-row">
          <div className="section-header">
            <span className="testimonials-eyebrow">
              SECTION 08 // STUDENT STORIES
            </span>
            <h2 className="testimonials-headline">DRIVEN BY OUR STUDENTS.</h2>
          </div>

          <div className="carousel-nav-buttons hide-mobile">
            <button onClick={prev} className="nav-arrow" aria-label="Previous testimonial">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} className="nav-arrow" aria-label="Next testimonial">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Full-Screen Magazine Quotation Display with Girl Driving Background */}
        <div className="magazine-quote-card">
          {/* Background Photo of Girl Driving Car */}
          <div className="card-bg-photo-layer">
            <img 
              src={currentBg} 
              alt="Confident female student driving car with Canguruber" 
              className="girl-driving-bg-img"
              key={activeIdx}
            />
            <div className="card-photo-dark-scrim" />
          </div>

          <div className="quote-top-strip">
            <div className="stars-cluster">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="star-yellow" fill="currentColor" />
              ))}
            </div>
            <span className="pass-status-pill">{current.passStatus}</span>
          </div>

          <blockquote className="master-quote-text">
            "{current.reviewText}"
          </blockquote>

          <div className="student-profile-footer">
            <div className="student-avatar-box">
              <span className="avatar-letter">{current.studentName.charAt(0)}</span>
            </div>
            <div className="student-meta">
              <strong className="student-name">{current.studentName}</strong>
              <span className="student-detail">{current.serviceType} • {current.locationTag} • {current.date}</span>
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="testimonial-dots-row">
          {PLACEHOLDER_REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .editorial-testimonials-section {
          background-color: #FFFFFF;
          color: var(--canguruber-navy);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .testimonials-eyebrow {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.825rem;
          letter-spacing: 0.16em;
          color: #B28F00;
          margin-bottom: 0.5rem;
        }
        .testimonials-headline {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          color: var(--canguruber-navy);
        }
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .carousel-nav-buttons {
          display: flex;
          gap: 0.75rem;
        }
        .nav-arrow {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #0A1420;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-arrow:hover {
          background: var(--canguruber-yellow);
          color: #0A1420;
          border-color: var(--canguruber-yellow);
          transform: translateY(-2px);
        }

        /* Magazine Card */
        .magazine-quote-card {
          position: relative;
          background: #07131D;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--radius-lg);
          padding: 3rem 3.5rem;
          min-height: 330px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .magazine-quote-card {
            padding: 2rem 1.5rem;
            min-height: 300px;
          }
        }

        /* Background Photo Layer */
        .card-bg-photo-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .girl-driving-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
          transform: scale(1.03);
          animation: fadeImg 0.6s ease;
        }
        @keyframes fadeImg {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1.03); }
        }
        .card-photo-dark-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg, 
            rgba(7, 19, 29, 0.94) 0%, 
            rgba(7, 19, 29, 0.88) 50%, 
            rgba(7, 19, 29, 0.72) 100%
          );
        }

        /* Foreground Elements (z-index: 5) */
        .quote-top-strip {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .stars-cluster {
          display: flex;
          gap: 0.35rem;
        }
        .star-yellow {
          color: #FFD000;
          filter: drop-shadow(0 0 8px rgba(255, 208, 0, 0.6));
        }
        .pass-status-pill {
          font-family: var(--font-display);
          font-size: 0.775rem;
          font-weight: 800;
          padding: 0.35rem 0.95rem;
          background: rgba(255, 208, 0, 0.18);
          color: #FFD000;
          border: 1.5px solid #FFD000;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
          backdrop-filter: blur(8px);
        }
        .master-quote-text {
          position: relative;
          z-index: 5;
          font-family: var(--font-display);
          font-size: clamp(1.45rem, 2.4vw, 2.15rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: #FFFFFF !important;
          margin-bottom: 1.75rem;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.8);
        }
        .student-profile-footer {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 1.15rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }
        .student-avatar-box {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #FFD000;
          color: #07131D;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(255, 208, 0, 0.4);
        }
        .student-meta {
          display: flex;
          flex-direction: column;
        }
        .student-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF !important;
        }
        .student-detail {
          font-size: 0.85rem;
          color: #CBD5E1 !important;
        }

        .testimonial-dots-row {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: 2rem;
        }
        .t-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-light);
          transition: all 0.25s;
        }
        .t-dot.active {
          width: 34px;
          border-radius: 6px;
          background: #FFD000;
        }
      `}</style>
    </section>
  );
};
