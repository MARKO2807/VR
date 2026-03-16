import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'Applications', href: '#applications' },
  { label: 'Technology', href: '#technology' },
  { label: 'FAQ', href: '#faq' },
];

const MENU_ANIM_MS = 280;

export default function Header({ onRequestDemo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuVisible = menuOpen || isClosing;

  const closeMenu = (callback) => {
    if (!menuOpen) return;
    setIsClosing(true);
    const t = setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
      callback?.();
    }, MENU_ANIM_MS);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuVisible]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        <a href="#hero" className="header__logo" aria-label="Horvat Innovative Labs home">
    
          <span className="header__logo-text">Horvat Innovative Labs</span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <button
            type="button"
            className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="header__menu-icon" aria-hidden="true" />
          </button>
          {menuVisible && (
            <div
              className={`header__backdrop ${isClosing ? 'header__backdrop--closing' : ''}`}
              aria-hidden="true"
              onClick={() => closeMenu()}
            />
          )}
          <ul
            id="nav-menu"
            className={`header__links ${menuVisible ? 'header__links--open' : ''} ${isClosing ? 'header__links--closing' : ''}`}
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => closeMenu()}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="header__cta-wrap">
              <button type="button" className="btn btn-primary header__cta header__cta--mobile" onClick={() => { closeMenu(); onRequestDemo?.(); }}>
                Request a Demo
              </button>
            </li>
          </ul>
        </nav>

        <button type="button" className="btn btn-primary header__cta header__cta--desktop" onClick={() => { closeMenu(); onRequestDemo?.(); }}>
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
          min-height: 80px;
          gap: var(--space-lg);
        }
        .header__logo {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.25rem;
        }
        .header__logo-frame {
          padding: 4px;
          border-radius: var(--radius-md);
        }
        .header__logo-frame .header__logo-img {
          display: block;
          height: 36px;
          width: auto;
          min-width: 32px;
          border-radius: calc(var(--radius-md) - 2px);
          object-fit: contain;
        }
        .header__logo-text {
          white-space: nowrap;
          background: linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-magenta) 50%, var(--accent-teal) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .header__logo-text { animation: none; }
        }
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
          position: relative;
          width: 22px;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .header__menu-icon::before,
        .header__menu-icon::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.25s ease;
        }
        .header__menu-icon::before { top: -7px; }
        .header__menu-icon::after { top: 7px; }
        .header__menu-btn--open .header__menu-icon {
          background: transparent;
        }
        .header__menu-btn--open .header__menu-icon::before {
          top: 0;
          transform: rotate(45deg);
        }
        .header__menu-btn--open .header__menu-icon::after {
          top: 0;
          transform: rotate(-45deg);
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
        .header__cta--mobile { display: none; }
        .header__cta-wrap { display: contents; }
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
          .header__cta--desktop { display: none; }
          .header__cta-wrap { display: block; margin-top: var(--space-md); padding-top: var(--space-lg); border-top: 1px solid rgba(255,255,255,0.08); }
          .header__cta--mobile { display: inline-flex; width: 100%; justify-content: center; }
          .header__backdrop {
            position: fixed;
            inset: 0;
            top: 80px;
            z-index: 99;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            opacity: 0;
            animation: headerBackdropIn 0.25s ease forwards;
          }
          .header__backdrop--closing {
            animation: headerBackdropOut 0.28s ease forwards;
          }
          .header__links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            z-index: 101;
            flex-direction: column;
            align-items: stretch;
            background: rgba(14, 20, 32, 0.98);
            backdrop-filter: blur(20px);
            padding: var(--space-xl) var(--space-lg) var(--space-2xl);
            gap: 0;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
            display: none;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
          }
          .header__links--open {
            display: flex;
            animation: headerPanelIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .header__links--closing {
            animation: headerPanelOut 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .header__links li {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .header__links li:last-of-type { border-bottom: none; }
          .header__links a {
            display: block;
            padding: var(--space-md) 0;
            font-size: 1rem;
            color: var(--text-primary);
          }
          @keyframes headerBackdropIn {
            to { opacity: 1; }
          }
          @keyframes headerBackdropOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes headerPanelIn {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes headerPanelOut {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-12px);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .header__backdrop { animation: none; }
            .header__backdrop--closing { animation: none; opacity: 0; }
            .header__links--open { animation: none; }
            .header__links--closing { animation: none; }
          }
        }
      `}</style>
    </header>
  );
}
