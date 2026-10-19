import React from 'react';
import useTilt from '../hooks/useTilt';
import { useT } from '../i18n';

export default function Technology() {
  const t = useT();
  const tilt = useTilt();

  return (
    <section id="technology" className="technology" aria-labelledby="tech-heading">
      <div className="container technology__container">
        <div className="technology__content">
          <span className="section-label">{t.technology.label}</span>
          <h2 id="tech-heading" className="section-title">{t.technology.title}</h2>
          <p className="technology__intro">{t.technology.intro}</p>
          <ul className="technology__list" role="list">
            {t.technology.items.map((item) => (
              <li key={item} className="technology__item">
                <span className="technology__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="technology__outro">{t.technology.outro}</p>
        </div>
        <div className="dotted-frame tilt-frame technology__frame" {...tilt}>
          <div className="tilt-inner technology__frame-inner">
            <img src="/Technology.jpg" alt={t.technology.imageAlt} className="technology__img" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <style>{`
        .technology { padding: var(--section-padding-y) 0; }
        .technology__container {
          display: grid;
          grid-template-columns: 1fr minmax(260px, 420px);
          align-items: center;
          gap: clamp(2rem, 6vw, 5rem);
        }
        .technology__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
          line-height: var(--line-relaxed);
        }
        .technology__list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
          gap: var(--space-sm) var(--space-lg);
          margin-bottom: var(--space-xl);
        }
        .technology__item {
          display: flex;
          align-items: baseline;
          gap: var(--space-md);
          color: var(--text-primary);
          font-size: var(--text-small);
        }
        .technology__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-magenta);
          flex-shrink: 0;
          transform: translateY(-2px);
        }
        .technology__outro {
          color: var(--text-secondary);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
        }
        .technology__frame { width: 100%; }
        .technology__frame-inner {
          border-radius: calc(var(--radius-xl) - 5px);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-secondary);
        }
        .technology__img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 900px) {
          .technology__container { grid-template-columns: 1fr; }
          .technology__frame { order: -1; max-width: 420px; margin-inline: auto; }
        }
      `}</style>
    </section>
  );
}
