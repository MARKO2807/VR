import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Building2, Globe, ShieldCheck, Users } from 'lucide-react';
import { useT } from '../i18n';

const icons = [Building2, Globe, ShieldCheck, Users];

export default function SocialProof() {
  const t = useT();
  return (
    <section className="social-proof" aria-label={t.socialProof.aria}>
      <div className="container">
        <p className="social-proof__intro">{t.socialProof.intro}</p>
        <ul className="social-proof__list" role="list">
          {t.socialProof.items.map((name, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} as="li" delay={i * 80} className="social-proof__item">
                <Icon className="social-proof__icon" size={32} strokeWidth={1.75} aria-hidden="true" />
                <span className="social-proof__name">{name}</span>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
      <style>{`
        .social-proof {
          padding: var(--space-2xl) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .social-proof__intro {
          text-align: center;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: var(--space-xl);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .social-proof__list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
        }
        .social-proof__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-sm);
          color: var(--text-secondary);
          font-size: var(--text-small);
          font-weight: 600;
        }
        .social-proof__icon { color: var(--accent-teal); flex-shrink: 0; }
        @media (max-width: 767px) {
          .social-proof__list { grid-template-columns: repeat(2, 1fr); gap: var(--space-xl) var(--space-md); }
        }
      `}</style>
    </section>
  );
}
