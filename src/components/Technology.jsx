import React, { useRef, useState } from 'react';

const TILT_MAX = 8;

const techItems = [
  'High-fidelity 3D simulation environments',
  'Immersive VR visualization systems',
  '360° video and virtual scenes',
  'Interactive training software',
  'VR headsets and control interfaces',
  'Instructor monitoring and evaluation tools',
];

export default function Technology() {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onFrameMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * TILT_MAX, y: x * TILT_MAX });
  };

  const onFrameMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="technology" className="technology" aria-labelledby="tech-heading">
      <div className="container technology__container">
        <div className="technology__content">
          <span className="section-label">Technology</span>
          <h2 id="tech-heading" className="section-title">
            Technology Behind the Platform
          </h2>
          <p className="technology__intro">
            VR Classroom4You integrates advanced immersive technologies to create realistic digital environments.
          </p>
          <ul className="technology__list" role="list">
            {techItems.map((item) => (
              <li key={item} className="technology__item">
                <span className="technology__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="technology__outro">
            The system architecture is designed to be flexible and scalable, enabling organizations to adapt the platform to their specific training requirements.
          </p>
        </div>
        <div className="technology__visual">
          <div
            ref={frameRef}
            className="dotted-frame technology__frame technology__frame--tilt"
            data-cursor-pointer
            onMouseMove={onFrameMouseMove}
            onMouseLeave={onFrameMouseLeave}
            style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
          >
            <div className="technology__frame-inner">
              <img src="/Technology.jpg" alt="VR Classroom4You technology and platform" className="technology__img" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .technology { padding: var(--section-padding-y) 0; }
        .technology__container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: var(--space-3xl);
        }
        .technology__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
          line-height: var(--line-relaxed);
        }
        .technology__list { margin-bottom: var(--space-xl); }
        .technology__item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          color: var(--text-secondary);
          font-size: var(--text-small);
          margin-bottom: var(--space-md);
        }
        .technology__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-magenta);
          flex-shrink: 0;
        }
        .technology__outro {
          margin-top: var(--space-lg);
          color: var(--text-muted);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
        }
        .technology__visual { display: flex; justify-content: center; padding: var(--space-md) 0; }
        .technology__frame { max-width: 360px; }
        .technology__frame--tilt { perspective: 1000px; cursor: pointer; }
        .technology__frame--tilt .technology__frame-inner {
          transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
        }
        @media (hover: hover) {
          .technology__frame--tilt:hover .technology__frame-inner {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          }
        }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .technology__frame--tilt .technology__frame-inner { transform: none; }
        }
        .technology__frame-inner {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-card);
        }
        .technology__img {
          width: 100%;
          height: 100%;
          display: block;
        }
        @media (max-width: 960px) {
          .technology__container { grid-template-columns: 1fr; }
          .technology__visual { order: -1; max-width: 320px; margin-inline: auto;}
          .technology__frame { margin-inline: auto; }
        }
        @media (max-width: 480px) {
          .technology__visual { max-width: 260px; }
        }
      `}</style>
    </section>
  );
}
