import React from 'react';

const supports = [
  'VR hardware installation',
  'Simulation software setup',
  'Instructor and operator training',
  'Development of specialized training scenarios',
  'System integration and technical support',
];

export default function TrainingHubs({ onRequestDemo }) {
  return (
    <section id="hubs" className="hubs" aria-labelledby="hubs-heading">
      <div className="container">
        <span className="section-label">VR Training Hubs</span>
        <h2 id="hubs-heading" className="section-title">
          Developing Immersive VR Training Centers
        </h2>
        <p className="hubs__intro">
          Horvat Innovative Labs supports partners in developing dedicated VR training centers and immersive learning hubs. These centers combine advanced VR simulation systems with structured training programs to create scalable learning environments.
        </p>
        <div className="hubs__cards">
          <div className="card hubs__card">
            <h3 className="hubs__card-title">Support may include</h3>
            <ul className="hubs__list" role="list">
              {supports.map((s) => (
                <li key={s}>
                  <span className="hubs__check" aria-hidden="true">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card hubs__card hubs__card-cta">
            <p className="hubs__cta-text">
              Such hubs can become regional centers for maritime training, professional safety education, and immersive learning programs.
            </p>
            <button type="button" className="btn btn-primary" onClick={onRequestDemo}>
              Request a Demo
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-xl);
        }
        .hubs__card { padding: var(--space-2xl); }
        .hubs__card-title {
          font-size: var(--text-h3);
          font-weight: 700;
          color: var(--accent-teal);
          margin-bottom: var(--space-lg);
        }
        .hubs__list { }
        .hubs__list li {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-secondary);
          font-size: var(--text-small);
          margin-bottom: var(--space-sm);
        }
        .hubs__check { color: var(--accent-teal); font-weight: 700; }
        .hubs__card-cta {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hubs__cta-text {
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
          line-height: var(--line-relaxed);
        }
      `}</style>
    </section>
  );
}
