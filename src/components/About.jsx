import React from 'react';
import useTilt from '../hooks/useTilt';
import { useT } from '../i18n';

export default function About() {
  const t = useT();
  const tilt = useTilt();

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="container">
        <span className="section-label">{t.about.label}</span>
        <h2 id="about-heading" className="section-title">{t.about.title}</h2>
        <div className="about__grid">
          <div className="about__copy">
            {t.about.paragraphs.map((p, i) => (
              <p key={i} className="about__p">{p}</p>
            ))}
            <p className="about__highlight">
              {t.about.highlight} <strong>VR Classroom4You</strong>
            </p>
          </div>
          <div className="dotted-frame tilt-frame about__frame" {...tilt}>
            <div className="tilt-inner about__frame-inner">
              <img src="/Futuristic room.jpg" alt={t.about.imageAlt} className="about__img" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .about { padding: var(--section-padding-y) 0; }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr minmax(260px, 380px);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: start;
        }
        .about__copy { min-width: 0; max-width: 70ch; }
        .about__p {
          color: var(--text-secondary);
          margin: 0 0 var(--space-md);
          line-height: var(--line-relaxed);
        }
        .about__highlight {
          color: var(--text-primary);
          font-weight: 500;
          margin: var(--space-xl) 0 0;
          padding-left: var(--space-lg);
          border-left: 3px solid var(--accent-teal);
        }
        .about__frame { width: 100%; }
        .about__frame-inner {
          border-radius: calc(var(--radius-xl) - 5px);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-secondary);
        }
        .about__img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 900px) {
          .about__grid { grid-template-columns: 1fr; }
          .about__frame { order: -1; max-width: 420px; margin-inline: auto; }
        }
      `}</style>
    </section>
  );
}
