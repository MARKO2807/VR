import React from 'react';
import { Check } from 'lucide-react';
import { useT } from '../i18n';

export default function Benefits() {
  const t = useT();
  return (
    <section className="benefits" aria-labelledby="benefits-heading">
      <div className="container benefits__container">
        <span className="section-label">{t.benefits.label}</span>
        <h2 id="benefits-heading" className="section-title">{t.benefits.title}</h2>
        <p className="benefits__intro">{t.benefits.intro}</p>
        <ul className="benefits__grid" role="list">
          {t.benefits.items.map((b) => (
            <li key={b} className="card benefits__card">
              <span className="benefits__icon" aria-hidden="true">
                <Check size={18} strokeWidth={3} />
              </span>
              <span className="benefits__text">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .benefits { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .benefits__container { text-align: center; }
        .benefits__intro {
          color: var(--text-secondary);
          margin: 0 auto var(--space-2xl);
          max-width: 60ch;
        }
        .benefits__grid {
          display: grid;
          gap: var(--space-md);
          max-width: 640px;
          margin-inline: auto;
          text-align: left;
        }
        .benefits__card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
        }
        .benefits__icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--gradient-teal);
          color: var(--on-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .benefits__text { font-weight: 500; color: var(--text-primary); }
      `}</style>
    </section>
  );
}
