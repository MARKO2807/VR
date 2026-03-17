import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Building2, Globe, ShieldCheck, Users } from 'lucide-react';

const partners = [
  { id: 1, name: 'Public Sector', icon: Building2 },
  { id: 2, name: 'International Organizations', icon: Globe },
  { id: 3, name: 'Compliance Teams', icon: ShieldCheck },
  { id: 4, name: 'Research Groups', icon: Users },
];

export default function SocialProof() {
  return (
    <section className="social-proof" aria-label="Partners and applications">
      <div className="container">
        <p className="social-proof__intro">Trusted by teams across sectors</p>
        <ul className="social-proof__list" role="list">
          {partners.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.id} as="li" delay={i * 80} className="social-proof__item">
                <Icon className="social-proof__icon" size={48} aria-hidden="true" />
                <span className="social-proof__name">{p.name}</span>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
      <style>{`
        .social-proof {
          padding: var(--section-padding-y) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .social-proof__intro {
          text-align: center;
          font-size: var(--text-small);
          color: var(--text-muted);
          margin-bottom: var(--space-xl);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .social-proof__list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: var(--space-2xl) var(--space-3xl);
        }
        @media (max-width: 767px) {
          .social-proof__list {
            flex-direction: column;
            flex-wrap: nowrap;
          }
        }
        .social-proof__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          color: var(--text-secondary);
          font-size: var(--text-small);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .social-proof__icon {
          width: 48px;
          height: 48px;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .social-proof__icon svg { width: 100%; height: 100%; }
      `}</style>
    </section>
  );
}
