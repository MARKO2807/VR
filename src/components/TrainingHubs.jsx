import React from 'react';
import { Check } from 'lucide-react';
import { useT } from '../i18n';

export default function TrainingHubs({ onRequestDemo }) {
  const t = useT();
  return (
    <section id="hubs" className="hubs" aria-labelledby="hubs-heading">
      <div className="container">
        <span className="section-label">{t.hubs.label}</span>
        <h2 id="hubs-heading" className="section-title">{t.hubs.title}</h2>
        <p className="hubs__intro">{t.hubs.intro}</p>
        <div className="hubs__cards">
          <div className="card hubs__card">
            <h3 className="hubs__card-title">{t.hubs.supportTitle}</h3>
            <ul className="hubs__list" role="list">
              {t.hubs.supports.map((s) => (
                <li key={s}>
                  <Check className="hubs__check" size={18} strokeWidth={2.5} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card hubs__card hubs__card-cta">
            <p className="hubs__cta-text">{t.hubs.ctaText}</p>
            <button type="button" className="btn btn-primary" onClick={onRequestDemo}>
              {t.common.requestDemo}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .hubs { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .hubs__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 65ch;
        }
        .hubs__cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: var(--space-lg);
        }
        .hubs__card { padding: clamp(1.5rem, 4vw, 2.5rem); }
        .hubs__card-title {
          font-size: var(--text-h3);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-lg);
        }
        .hubs__list li {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-primary);
          font-size: var(--text-small);
          margin-bottom: var(--space-sm);
        }
        .hubs__check { color: var(--accent-teal); flex-shrink: 0; }
        .hubs__card-cta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .hubs__cta-text {
          color: var(--text-secondary);
          font-size: 1.0625rem;
          margin-bottom: var(--space-xl);
          line-height: var(--line-relaxed);
        }
      `}</style>
    </section>
  );
}
