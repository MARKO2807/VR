import React from 'react';

const benefits = [
  'Higher engagement and motivation',
  'Improved knowledge retention',
  'Faster skill development',
  'Safe training for complex or dangerous procedures',
  'Repeatable learning environments',
];

export default function Benefits() {
  return (
    <section className="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <span className="section-label">Why immersive learning</span>
        <h2 id="benefits-heading" className="section-title">
          Why Immersive Learning Works
        </h2>
        <p className="benefits__intro">
          Experiential learning environments significantly improve the way people acquire and retain knowledge. When learners actively participate in realistic scenarios, they develop stronger cognitive connections and practical skills.
        </p>
        <ul className="benefits__grid" role="list">
          {benefits.map((b) => (
            <li key={b} className="card benefits__card">
              <span className="benefits__icon" aria-hidden="true">✓</span>
              <span className="benefits__text">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .benefits { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .benefits__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 60ch;
        }
        .benefits__grid {
          display: grid;
          gap: var(--space-lg);
        }
        @media (min-width: 720px) {
          .benefits__grid {
            grid-template-columns: 1fr;
            max-width: 50%;
            margin-right: auto;
          }
        }
        .benefits__card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-lg) var(--space-xl);
        }
        .benefits__icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-teal);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        .benefits__text {
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
}
