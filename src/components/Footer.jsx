import React from 'react';

const footerLinks = (onRequestDemo) => [
  { label: 'Back to top', href: '#hero' },
  { label: "FAQ's", href: '#faq' },
  { label: 'Contact', onClick: onRequestDemo },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default function Footer({ onRequestDemo }) {
  const currentYear = new Date().getFullYear();
  const links = footerLinks(onRequestDemo);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <a href="#hero" className="footer__logo">
          <span className="footer__logo-text">Horvat Innovative Labs</span>
        </a>
        <p className="footer__tagline">
          Immersive learning for organizations.
        </p>
        <nav className="footer__nav" aria-label="Footer">
          <ul className="footer__links" role="list">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <button type="button" className="footer__link-btn" onClick={link.onClick}>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer__copyright">
          © {currentYear} Horvat Innovative Labs. All rights reserved.
        </p>
      </div>
      <style>{`
        .footer {
          padding: var(--space-2xl) 0;
          background: var(--bg-primary);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer__inner {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }
        .footer__logo {
          font-weight: 700;
          font-size: 1.125rem;
          display: inline-block;
        }
        .footer__logo-text {
          background: linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-magenta) 50%, var(--accent-teal) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer__logo-text { animation: none; }
        }
        .footer__tagline {
          font-size: var(--text-small);
          color: var(--text-muted);
          max-width: 280px;
        }
        .footer__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-md);
        }
        .footer__links a,
        .footer__link-btn {
          font-size: var(--text-small);
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
          transition: color var(--transition-fast);
        }
        .footer__links a:hover,
        .footer__link-btn:hover {
          color: var(--accent-teal);
        }
        .footer__copyright {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: var(--space-xs);
        }
      `}</style>
    </footer>
  );
}
