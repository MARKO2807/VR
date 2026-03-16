import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'Applications', href: '#applications' },
  { label: 'Technology', href: '#technology' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header({ onRequestDemo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        <a href="#hero" className="header__logo" aria-label="Horvat Innovative Labs home">
          <span className="header__logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 4L6 8v8l8 4 8-4V8l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M14 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="header__logo-text">Horvat Innovative Labs</span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <button
            type="button"
            className="header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="header__menu-icon" aria-hidden="true" />
          </button>
          <ul id="nav-menu" className={`header__links ${menuOpen ? 'header__links--open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="btn btn-primary header__cta" onClick={() => { setMenuOpen(false); onRequestDemo?.(); }}>
          Request a Demo
        </button>
      </div>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 15, 25, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.25s ease;
        }
        .header--scrolled {
          background: rgba(10, 15, 25, 0.82);
        }
        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
          gap: var(--space-lg);
        }
        .header__logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.125rem;
        }
        .header__logo-icon { color: var(--accent-teal); }
        .header__logo-text { white-space: nowrap; }
        .header__nav { flex: 1; display: flex; justify-content: flex-end; }
        .header__menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .header__menu-icon {
          width: 24px;
          height: 2px;
          background: currentColor;
          box-shadow: 0 -7px 0 currentColor, 0 7px 0 currentColor;
        }
        .header__links {
          display: flex;
          align-items: center;
          gap: var(--space-xl);
        }
        .header__links a {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: var(--text-small);
        }
        .header__links a:hover { color: var(--accent-teal); }
        .header__cta { flex-shrink: 0; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 900px) {
          .header__menu-btn { display: flex; }
          .header__cta { display: none; }
          .header__links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--bg-secondary);
            padding: var(--space-lg);
            gap: var(--space-md);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            display: none;
          }
          .header__links--open { display: flex; }
        }
      `}</style>
    </header>
  );
}
