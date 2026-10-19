import React from 'react';
import MagneticButton from './MagneticButton';
import { useT } from '../i18n';
import { CONTACT_EMAIL } from '../siteConfig';

export default function FinalCTA({ onRequestDemo }) {
  const t = useT();
  return (
    <section id="contact" className="final-cta" aria-labelledby="final-cta-heading">
      <div className="container">
        <div className="final-cta__card">
          <span className="section-label">{t.finalCta.label}</span>
          <h2 id="final-cta-heading" className="final-cta__title">{t.finalCta.title}</h2>
          <p className="final-cta__text">{t.finalCta.text}</p>
          <MagneticButton type="button" className="btn btn-primary final-cta__btn" onClick={onRequestDemo}>
            {t.common.requestDemo}
          </MagneticButton>
          <p className="final-cta__hint">{t.finalCta.hint}</p>
          <p className="final-cta__email">
            {t.finalCta.emailLabel} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
      <style>{`
        .final-cta { padding: clamp(4rem, 10vw, 6rem) 0; }
        .final-cta__card {
          max-width: 820px;
          margin-inline: auto;
          padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1.25rem, 4.5vw, 3rem);
          text-align: center;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%, color-mix(in srgb, var(--accent-teal-bright) 12%, transparent), transparent 70%),
            var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-card);
        }
        .final-cta__title {
          font-size: var(--text-h1);
          font-weight: 700;
          line-height: var(--line-tight);
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .final-cta__text {
          color: var(--text-secondary);
          margin: 0 auto var(--space-xl);
          max-width: 56ch;
          line-height: var(--line-relaxed);
        }
        .final-cta__btn { padding: 1rem 2.25rem; font-size: 1.0625rem; }
        .final-cta__hint { margin-top: var(--space-sm); font-size: 0.8125rem; color: var(--text-muted); }
        .final-cta__email {
          margin-top: var(--space-xl);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--border);
          font-size: var(--text-small);
          color: var(--text-secondary);
        }
        .final-cta__email a { font-weight: 600; color: var(--accent-teal); word-break: break-all; }
        .final-cta__email a:hover { text-decoration: underline; }
        @media (max-width: 480px) {
          .final-cta__btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}
