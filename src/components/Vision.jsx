import React from 'react';
import { useT } from '../i18n';

export default function Vision() {
  const t = useT();
  return (
    <section className="vision" aria-labelledby="vision-heading">
      <div className="container">
        <span className="section-label">{t.vision.label}</span>
        <h2 id="vision-heading" className="section-title">{t.vision.title}</h2>
        {t.vision.paragraphs.map((p, i) => (
          <p key={i} className="vision__p">{p}</p>
        ))}
        <p className="vision__p vision__p--highlight">{t.vision.highlight}</p>
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
          margin-top: var(--space-lg);
          padding-left: var(--space-lg);
          border-left: 3px solid var(--accent-magenta);
        }
      `}</style>
    </section>
  );
}
