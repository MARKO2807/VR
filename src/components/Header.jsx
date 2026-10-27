import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import HeaderControls from './HeaderControls';
import Logo from './Logo';
import { useT } from '../i18n';

const navItems = [
  { key: 'about', id: 'about' },
  { key: 'platform', id: 'platform' },
  { key: 'applications', id: 'applications' },
  { key: 'projects', id: 'projects' },
  { key: 'technology', id: 'technology' },
  { key: 'faq', id: 'faq' },
];

const MENU_ANIM_MS = 240;

export default function Header({ onRequestDemo }) {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const menuVisible = menuOpen || isClosing;

  const closeMenu = () => {
    if (!menuOpen) return;
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, MENU_ANIM_MS);
  };

  // Glass state + active section (one rAF per frame, a handful of rect reads)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuVisible]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const solid = scrolled || menuVisible;

  return (
    <header className="header" role="banner">
      {menuVisible && (
        <div className={`header__backdrop ${isClosing ? 'is-closing' : ''}`} aria-hidden="true" onClick={closeMenu} />
      )}
      <div className={`header__bar ${solid ? 'header__bar--solid' : ''}`}>
        <a href="#hero" className="header__logo" aria-label={t.header.homeAria}>
          <Logo />
        </a>

        <nav className="header__nav" aria-label={t.header.navAria}>
          <ul
            id="nav-menu"
            className={`header__links ${menuVisible ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}
            role="list"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {t.header.nav[item.key]}
                </a>
              </li>
            ))}
            <li className="header__cta-mobile-wrap">
              <button type="button" className="btn btn-primary header__cta-mobile" onClick={() => { closeMenu(); onRequestDemo?.(); }}>
                {t.common.requestDemo}
              </button>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <HeaderControls />
          <MagneticButton type="button" className="btn btn-primary header__cta" onClick={() => onRequestDemo?.()}>
            {t.common.requestDemo}
          </MagneticButton>
          <button
            type="button"
            className={`header__menu-btn ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span className="sr-only">{menuOpen ? t.header.closeMenu : t.header.openMenu}</span>
            <span className="header__menu-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 12px var(--section-padding-x) 0;
          pointer-events: none;
        }
        .header__bar {
          position: relative;
          pointer-events: auto;
          max-width: calc(var(--container-max) - 2 * var(--space-lg));
          margin-inline: auto;
          min-height: 64px;
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: 0 var(--space-sm) 0 var(--space-lg);
          border-radius: 18px;
          border: 1px solid transparent;
          background: transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          animation: headerIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .header__bar { animation: none; }
        }
        .header__bar--solid {
          background: var(--header-bg);
          -webkit-backdrop-filter: saturate(1.6) blur(14px);
          backdrop-filter: saturate(1.6) blur(14px);
          border-color: var(--border);
          box-shadow: 0 8px 32px rgba(11, 26, 42, 0.08);
        }
        .header__logo {
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .header__logo .logo { height: 100%; }
        .header__logo:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 4px; border-radius: 6px; }
        .header__nav { flex: 1; display: flex; justify-content: center; min-width: 0; }
        .header__links { display: flex; align-items: center; gap: 2px; }
        .header__links a {
          display: block;
          padding: 8px 12px;
          border-radius: 999px;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9375rem;
          white-space: nowrap;
          transition: color var(--transition-fast), background-color var(--transition-fast);
        }
        .header__links a:hover { color: var(--text-primary); background: color-mix(in srgb, var(--text-primary) 6%, transparent); }
        .header__links a.is-active { color: var(--accent-teal); background: color-mix(in srgb, var(--accent-teal) 10%, transparent); }
        .header__links a:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
        .header__actions { display: flex; align-items: center; gap: var(--space-sm); flex-shrink: 0; }
        .header__cta { padding: 0.625rem 1.125rem; font-size: 0.9375rem; border-radius: 12px; }
        .header__cta-mobile-wrap, .header__menu-btn { display: none; }
        .header__menu-btn {
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          border-radius: 12px;
        }
        .header__menu-btn:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
        .header__menu-icon, .header__menu-icon::before, .header__menu-icon::after {
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 2px;
          background: currentColor;
          transition: transform 0.25s ease, top 0.25s ease, background 0.2s ease;
        }
        .header__menu-icon { position: relative; }
        .header__menu-icon::before, .header__menu-icon::after { content: ''; position: absolute; left: 0; }
        .header__menu-icon::before { top: -6px; }
        .header__menu-icon::after { top: 6px; }
        .header__menu-btn.is-open .header__menu-icon { background: transparent; }
        .header__menu-btn.is-open .header__menu-icon::before { top: 0; transform: rotate(45deg); }
        .header__menu-btn.is-open .header__menu-icon::after { top: 0; transform: rotate(-45deg); }

        @media (max-width: 1240px) {
          .header__menu-btn { display: inline-flex; }
          .header__cta { display: none; }
          .header__bar { padding-right: var(--space-xs); }
          .header__backdrop {
            position: fixed;
            inset: 0;
            pointer-events: auto;
            background: var(--overlay);
            animation: headerFade 0.24s ease both;
          }
          .header__backdrop.is-closing { animation: headerFade 0.24s ease reverse both; }
          .header__links {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 2px;
            padding: var(--space-sm);
            border-radius: 18px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
            max-height: calc(100dvh - var(--header-h) - 16px);
            overflow-y: auto;
          }
          .header__links.is-open { display: flex; animation: headerDrop 0.28s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .header__links.is-closing { animation: headerDrop 0.24s ease reverse both; }
          .header__links a { padding: 12px 16px; border-radius: 12px; font-size: 1.0625rem; color: var(--text-primary); }
          .header__cta-mobile-wrap { display: block; padding: var(--space-sm) var(--space-xs) var(--space-xs); }
          .header__cta-mobile { width: 100%; }
          @keyframes headerFade { from { opacity: 0; } to { opacity: 1; } }
          @keyframes headerDrop {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: none; }
          }
        }
        @media (max-width: 520px) {
          .header { padding: 8px 10px 0; }
          .header__bar { padding-left: var(--space-md); gap: var(--space-sm); min-height: 60px; }
          .header__logo { height: 30px; }
        }
        @media (max-width: 360px) {
          .header__logo { height: 26px; }
          .header__actions { gap: 4px; }
          .header__menu-btn { width: 40px; }
        }
      `}</style>
    </header>
  );
}
