import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenStudentPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudentPortal }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`canguruber-exact-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container-wide">
          <nav className="header-nav-row">
            {/* Exact Brand Logo from Screenshot */}
            <Link to="/" className="brand-logo-exact">
              <div className="logo-text-wrap">
                <span className="logo-main">
                  CANGURU<span className="logo-highlight">BER</span>
                </span>
                <span className="logo-sub">DRIVING SCHOOL</span>
              </div>
            </Link>

            {/* Exact Center Nav Links */}
            <div className="center-nav-links hide-mobile">
              {/* Services with Dropdown */}
              <div 
                className="nav-item-dropdown"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="nav-link-btn" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                  <span>SERVICES</span>
                  <ChevronDown size={14} className={`dropdown-icon ${isServicesOpen ? 'rotate' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="services-dropdown-menu">
                    <Link to="/driving-lessons" className="dropdown-link">
                      <strong>01. Driving Lessons</strong>
                      <span>Personalised 1-on-1 coaching</span>
                    </Link>
                    <Link to="/car-hire" className="dropdown-link">
                      <strong>02. Car Hire for Test</strong>
                      <span>Service NSW test-ready vehicle</span>
                    </Link>
                    <Link to="/lesson-and-car" className="dropdown-link">
                      <strong>03. Lesson + Car Combo</strong>
                      <span>Warm-up lesson + test car</span>
                    </Link>
                    <Link to="/services" className="dropdown-link view-all">
                      <span>View All Packages & Pricing →</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/about" className={`header-link ${location.pathname === '/about' ? 'active' : ''}`}>
                ABOUT
              </Link>
              <Link to="/faq" className={`header-link ${location.pathname === '/faq' ? 'active' : ''}`}>
                FAQ
              </Link>
              <Link to="/blog" className={`header-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                BLOG & ARTICLES
              </Link>
              <Link to="/contact" className={`header-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                CONTACT
              </Link>
            </div>

            {/* Exact Right Action Buttons from Screenshot */}
            <div className="header-right-actions">
              <Button to="/book" variant="yellow" size="sm" icon={<ArrowRight size={15} />}>
                BOOK A LESSON
              </Button>

              {/* Exact Dark Circular Menu Toggle */}
              <button 
                className="dark-circle-menu-btn" 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {isMobileOpen && (
        <div className="header-drawer-overlay">
          <div className="header-drawer-panel">
            <div className="drawer-top">
              <Link to="/" className="brand-logo-exact" onClick={() => setIsMobileOpen(false)}>
                <span className="logo-main">
                  CANGURU<span className="logo-highlight">BER</span>
                </span>
                <span className="logo-sub">DRIVING SCHOOL</span>
              </Link>
              <button className="close-btn" onClick={() => setIsMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="drawer-links-list">
              <Link to="/services" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>SERVICES</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/driving-lessons" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Driving Lessons
              </Link>
              <Link to="/car-hire" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Car Hire for Test
              </Link>
              <Link to="/lesson-and-car" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Lesson + Car Package
              </Link>
              <Link to="/about" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>ABOUT</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/faq" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>FAQ</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/blog" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>BLOG & ARTICLES</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>CONTACT</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="drawer-bottom-actions">
              <Button to="/book" variant="yellow" size="lg" className="w-full" onClick={() => setIsMobileOpen(false)}>
                BOOK A LESSON
              </Button>
              {onOpenStudentPortal && (
                <button 
                  onClick={() => { setIsMobileOpen(false); onOpenStudentPortal(); }}
                  className="drawer-portal-btn"
                >
                  <UserCheck size={16} />
                  <span>Student Portal Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .canguruber-exact-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        .canguruber-exact-header.is-scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .header-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        /* Exact Logo */
        .brand-logo-exact {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .logo-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .logo-main {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.35rem;
          letter-spacing: 0.02em;
          color: #07131D;
          line-height: 1;
        }
        .logo-highlight {
          color: var(--accent-gold);
        }
        .logo-sub {
          font-family: var(--font-display);
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #07131D;
          margin-top: 2px;
        }

        /* Center Nav Links */
        .center-nav-links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }
        .header-link, .nav-link-btn {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.825rem;
          letter-spacing: 0.06em;
          color: #07131D;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 0;
          background: transparent;
        }
        .header-link:hover, .nav-link-btn:hover {
          color: var(--accent-gold);
        }
        .header-link.active {
          color: #000000;
          font-weight: 800;
        }
        .dropdown-icon {
          transition: transform 0.2s ease;
        }
        .dropdown-icon.rotate {
          transform: rotate(180deg);
        }

        /* Dropdown */
        .nav-item-dropdown {
          position: relative;
        }
        .services-dropdown-menu {
          position: absolute;
          top: 100%;
          left: -20px;
          width: 280px;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          border: 1px solid var(--border-light);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          animation: dropFade 0.2s ease;
        }
        @keyframes dropFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-link {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          transition: background 0.15s ease;
        }
        .dropdown-link:hover {
          background: var(--bg-subtle);
        }
        .dropdown-link strong {
          font-family: var(--font-display);
          font-size: 0.85rem;
          color: var(--canguruber-navy);
        }
        .dropdown-link span {
          font-size: 0.75rem;
          color: var(--text-body);
        }
        .dropdown-link.view-all {
          border-top: 1px solid var(--border-light);
          margin-top: 0.25rem;
          padding-top: 0.65rem;
        }
        .dropdown-link.view-all span {
          font-weight: 800;
          color: var(--canguruber-navy);
        }

        /* Right Actions */
        .header-right-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .dark-circle-menu-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--canguruber-navy);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .dark-circle-menu-btn:hover {
          background: #1E2D3D;
          transform: scale(1.05);
        }

        /* Mobile Drawer */
        .header-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 20, 32, 0.7);
          backdrop-filter: blur(6px);
          z-index: 300;
          display: flex;
          justify-content: flex-end;
        }
        .header-drawer-panel {
          width: 85%;
          max-width: 380px;
          background: #FFFFFF;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.75rem;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
        }
        .drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }
        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--canguruber-navy);
        }
        .drawer-links-list {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
          flex: 1;
          gap: 0.5rem;
        }
        .drawer-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--canguruber-navy);
          border-bottom: 1px solid var(--border-light);
        }
        .drawer-sub-item {
          padding-left: 1rem;
          font-size: 0.9rem;
          color: var(--text-body);
          font-weight: 600;
        }
        .drawer-bottom-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .drawer-portal-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--bg-subtle);
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--canguruber-navy);
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </>
  );
};
