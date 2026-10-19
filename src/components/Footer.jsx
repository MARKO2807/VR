import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import Logo from './Logo';
import { useT } from '../i18n';
import { CONTACT_EMAIL, COMPANY } from '../siteConfig';

const navKeys = ['about', 'platform', 'applications', 'projects', 'videos', 'faq'];

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#hero" className="footer__logo" aria-label={t.header.homeAria}><Logo /></a>
            <p className="footer__tagline">{t.footer.tagline}</p>
          </div>

          <nav className="footer__col" aria-label={t.footer.navAria}>
            <h2 className="footer__title">{t.footer.navTitle}</h2>
            <ul className="footer__list footer__list--cols" role="list">
              {navKeys.map((key) => (
                <li key={key}><a href={`#${key}`}>{t.header.nav[key]}</a></li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__title">{t.footer.contactTitle}</h2>
            <ul className="footer__list" role="list">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer__email">
                  <Mail size={16} aria-hidden="true" /> {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <h2 className="footer__title footer__title--spaced">{t.footer.legalTitle}</h2>
            <ul className="footer__list" role="list">
              <li><a href="#privatnost">{t.footer.privacy}</a></li>
              <li><a href="#uvjeti">{t.footer.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__company">
            {t.footer.brandOf} <strong>{COMPANY.name}</strong> · OIB: {COMPANY.oib}
            {COMPANY.address && <> · {COMPANY.address}</>}
          </p>
          <p className="footer__copyright">© {year} {COMPANY.name}. {t.footer.rights}</p>
          <a href="#hero" className="footer__top">
            <ArrowUp size={16} aria-hidden="true" /> {t.footer.backToTop}
          </a>
        </div>
      </div>
      <style>{`
        .footer {
          padding: clamp(2.5rem, 6vw, 4rem) 0 var(--space-xl);
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: var(--space-2xl);
        }
        .footer__logo { display: inline-flex; height: 44px; }
        .footer__logo .logo { height: 100%; }
        .footer__tagline { margin-top: var(--space-md); color: var(--text-secondary); font-size: var(--text-small); max-width: 32ch; }
        .footer__title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-md);
        }
        .footer__title--spaced { margin-top: var(--space-xl); }
        .footer__list { display: grid; gap: var(--space-sm); }
        .footer__list--cols { grid-template-columns: repeat(2, max-content); column-gap: var(--space-2xl); }
        .footer__list a {
          font-size: var(--text-small);
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .footer__list a:hover { color: var(--accent-teal); }
        .footer__email { display: inline-flex; align-items: center; gap: var(--space-sm); font-weight: 600; color: var(--text-primary) !important; word-break: break-all; }
        .footer__email:hover { color: var(--accent-teal) !important; }
        .footer__bottom {
          margin-top: var(--space-2xl);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-sm) var(--space-xl);
          font-size: 0.8125rem;
          color: var(--text-muted);
        }
        .footer__company { flex-basis: 100%; color: var(--text-secondary); }
        .footer__company strong { color: var(--text-primary); font-weight: 600; }
        .footer__top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .footer__top:hover { color: var(--accent-teal); }
        @media (max-width: 860px) {
          .footer__grid { grid-template-columns: 1fr 1fr; }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .footer__grid { grid-template-columns: 1fr; gap: var(--space-xl); }
          .footer__logo { height: 36px; }
        }
      `}</style>
    </footer>
  );
}
