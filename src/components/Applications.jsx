import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useT } from '../i18n';

const images = ['/SailingBoat.jpg', '/Firefighter.jpg', '/University2.jpg', '/Tourism.jpg'];

export default function Applications() {
  const t = useT();
  return (
    <section id="applications" className="applications" aria-labelledby="applications-heading">
      <div className="container">
        <span className="section-label">{t.applications.label}</span>
        <h2 id="applications-heading" className="section-title">{t.applications.title}</h2>
        <p className="applications__intro">{t.applications.intro}</p>
        <ul className="applications__list" role="list">
          {t.applications.items.map((app, i) => (
            <ScrollReveal key={i} as="li" delay={i * 80} className="applications__card card">
              <div className="applications__card-body">
                <h3 className="applications__card-title">{app.title}</h3>
                <p className="applications__card-intro">{app.intro}</p>
                <ul className="applications__items" role="list">
                  {app.items.map((item) => (
                    <li key={item}>
                      <span className="applications__bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="applications__closing">{app.closing}</p>
              </div>
              <div className="applications__card-image-wrap">
                <img
                  src={images[i]}
                  alt={app.imageAlt}
                  className="applications__card-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
      <style>{`
        .applications { padding: var(--section-padding-y) 0; }
        .applications__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 65ch;
        }
        .applications__list { display: flex; flex-direction: column; gap: var(--space-xl); }
        .applications__card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .applications__card-image-wrap {
          order: -1;
          aspect-ratio: 2 / 1;
          overflow: hidden;
          background: var(--bg-secondary);
        }
        .applications__card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        @media (hover: hover) {
          .applications__card:hover .applications__card-image { transform: scale(1.04); }
        }
        .applications__card-body { padding: clamp(1.5rem, 4vw, 2.5rem); }
        .applications__card-title {
          font-size: var(--text-h3);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .applications__card-intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-lg);
          line-height: var(--line-relaxed);
        }
        .applications__items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
          gap: var(--space-xs) var(--space-lg);
          margin-bottom: var(--space-lg);
        }
        .applications__items li {
          display: flex;
          align-items: baseline;
          gap: var(--space-sm);
          color: var(--text-primary);
          font-size: var(--text-small);
        }
        .applications__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          flex-shrink: 0;
          transform: translateY(-2px);
        }
        .applications__closing {
          color: var(--text-secondary);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
        }
        @media (min-width: 820px) {
          .applications__card {
            display: grid;
            grid-template-columns: 1fr minmax(260px, 34%);
          }
          .applications__card-image-wrap { order: unset; aspect-ratio: auto; min-height: 100%; }
        }
      `}</style>
    </section>
  );
}
