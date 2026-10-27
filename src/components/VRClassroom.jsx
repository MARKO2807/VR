import React from 'react';
import useTilt from '../hooks/useTilt';
import { useT } from '../i18n';

export default function VRClassroom() {
  const t = useT();
  const tilt = useTilt();
  return (
    <section id="platform" className="platform" aria-labelledby="platform-heading">
      <div className="container platform__grid">
        <div className="platform__copy">
          <span className="section-label">{t.platform.label}</span>
          <h2 id="platform-heading" className="section-title">{t.platform.title}</h2>
          {t.platform.intro.map((p, i) => (
            <p key={i} className="platform__intro">{p}</p>
          ))}
          <p className="platform__deploy">{t.platform.deploy}</p>
        </div>
        <div className="dotted-frame tilt-frame platform__frame" {...tilt}>
          <div className="tilt-inner platform__frame-inner">
            <img src="/projects/vr-session.jpg" alt={t.platform.imageAlt} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <style>{`
        .platform { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .platform__grid {
          display: grid;
          grid-template-columns: 1fr minmax(260px, 460px);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }
        .platform__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
          line-height: var(--line-relaxed);
          max-width: 60ch;
        }
        .platform__deploy {
          margin-top: var(--space-lg);
          padding-left: var(--space-lg);
          border-left: 3px solid var(--accent-teal);
          color: var(--text-primary);
          font-weight: 500;
        }
        .platform__frame { width: 100%; }
        .platform__frame-inner {
          border-radius: calc(var(--radius-xl) - 5px);
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--bg-card);
        }
        .platform__frame-inner img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 900px) {
          .platform__grid { grid-template-columns: 1fr; }
          .platform__frame { max-width: 460px; margin-inline: auto; }
        }
      `}</style>
    </section>
  );
}
