import React from 'react';

const navLinks = (onRequestDemo) => [
  { label: "FAQ's", href: '#faq' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Contact', onClick: onRequestDemo },
];

const quickLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Applications', href: '#applications' },
  { label: 'Technology', href: '#technology' },
  { label: 'VR Hubs', href: '#hubs' },
];

export default function Footer({ onRequestDemo }) {
  const currentYear = new Date().getFullYear();
  const links = navLinks(onRequestDemo);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <span className="footer__logo-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4L6 8v8l8 4 8-4V8l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M14 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Horvat Innovative Labs</span>
          </a>
          <p className="footer__about">
            Innovation-driven initiative dedicated to the research, development, and implementation of immersive technologies. VR Classroom4You – immersive learning for organizations and institutions.
          </p>
       
        </div>
        <div className="footer__col">
          <h3 className="footer__col-title">Navigations</h3>
          <ul className="footer__links" role="list">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href}>
                    <span className="footer__arrow" aria-hidden="true">→</span>
                    {link.label}
                  </a>
                ) : (
                  <button type="button" className="footer__link-btn" onClick={link.onClick}>
                    <span className="footer__arrow" aria-hidden="true">→</span>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__col-title">Quick Links</h3>
          <ul className="footer__links" role="list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <span className="footer__arrow" aria-hidden="true">→</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copyright">
            Copyright © {currentYear} Horvat Innovative Labs. All rights reserved.
          </p>
        </div>
      </div>
      <style>{`
        .footer {
          padding-top: var(--space-3xl);
          background: var(--bg-primary);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          padding-bottom: var(--space-2xl);
        }
        .footer__logo {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .footer__logo-icon { color: var(--accent-teal); }
        .footer__about {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--line-relaxed);
          margin-bottom: var(--space-lg);
          max-width: 280px;
        }
        .footer__social {
          display: flex;
          gap: var(--space-sm);
        }
        .footer__social-link {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--accent-teal);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .footer__social-link:hover {
          background: var(--accent-teal-hover);
          transform: translateY(-2px);
        }
        .footer__col-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .footer__links li { margin-bottom: var(--space-xs); }
        .footer__links a,
        .footer__link-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--text-small);
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .footer__links a:hover,
        .footer__link-btn:hover { color: var(--accent-teal); }
        .footer__arrow { color: var(--text-muted); font-size: 0.75rem; }
        .footer__bottom {
          padding: var(--space-lg) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer__copyright {
          text-align: center;
          font-size: var(--text-small);
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .footer__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
