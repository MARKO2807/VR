import React from 'react';

export default function Vision() {
  return (
    <section className="vision" aria-labelledby="vision-heading">
      <div className="container vision__container">
        <span className="section-label">Future</span>
        <h2 id="vision-heading" className="section-title">
          Shaping the Future of Education and Training
        </h2>
        <p className="vision__p">
          The future of immersive learning lies in the integration of Virtual Reality, Artificial Intelligence, and adaptive educational systems.
        </p>
        <p className="vision__p">
          These technologies will enable intelligent learning environments that analyze user performance, adjust scenarios dynamically, and create personalized training paths.
        </p>
        <p className="vision__p vision__p--highlight">
          Horvat Innovative Labs aims to contribute to this evolution by developing platforms that make immersive learning accessible to organizations, educational institutions, and professional training programs.
        </p>
      </div>
      <style>{`
        .vision { padding: var(--section-padding-y) 0; }
        .vision__p {
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
          line-height: var(--line-relaxed);
          max-width: 70ch;
        }
        .vision__p--highlight {
          color: var(--text-primary);
          font-weight: 500;
          padding-left: var(--space-lg);
          border-left: 3px solid var(--accent-magenta);
        }
      `}</style>
    </section>
  );
}
