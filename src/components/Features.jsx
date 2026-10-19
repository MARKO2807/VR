import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Glasses, ClipboardList, Presentation, Repeat, Users, Network } from 'lucide-react';
import { useT } from '../i18n';

const icons = [Glasses, ClipboardList, Presentation, Repeat, Users, Network];

export default function Features() {
  const t = useT();
  return (
    <section id="features" className="features" aria-labelledby="features-heading">
      <div className="container">
        <span className="section-label">{t.features.label}</span>
        <h2 id="features-heading" className="section-title">{t.features.title}</h2>
        <ul className="features__grid" role="list">
          {t.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} as="li" delay={i * 70}>
                <article className="card features__card">
                  <span className="features__icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.75} />
                  </span>
                  <h3 className="features__card-title">{f.title}</h3>
                  <p className="features__card-desc">{f.description}</p>
                  <a href="#platform" className="features__link">{t.common.readMore}</a>
                </article>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
      <style>{`
        .features { padding: var(--section-padding-y) 0; }
        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: var(--space-lg);
        }
        .features__grid > li { height: 100%; }
        .features__card {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .features__icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal);
          background: color-mix(in srgb, var(--accent-teal) 10%, transparent);
          margin-bottom: var(--space-lg);
        }
        .features__card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .features__card-desc {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--line-relaxed);
          flex: 1;
          margin-bottom: var(--space-lg);
        }
        .features__link {
          font-size: var(--text-small);
          font-weight: 600;
          color: var(--accent-magenta);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }
        .features__link:hover { color: var(--accent-teal); transform: translateX(4px); }
      `}</style>
    </section>
  );
}
