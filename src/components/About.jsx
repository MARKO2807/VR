import React, { useRef, useState } from 'react';

const TILT_MAX = 8;

export default function About() {
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
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="container about__container">
        <header className="about__header">
          <span className="section-label">About Horvat Innovative Labs</span>
          <h2 id="about-heading" className="section-title about__title">
            Innovation in Immersive Technology
          </h2>
        </header>
        <div className="about__grid">
          <div className="about__col about__col--copy">
            <p className="about__p">
              Horvat Innovative Labs is an innovation-driven initiative dedicated to the research, development, and implementation of immersive technologies such as Virtual Reality, Augmented Reality, and Mixed Reality.
            </p>
            <p className="about__p">
              The organization focuses on applying these technologies to fields where experiential learning, realistic simulations, and interactive environments significantly improve outcomes.
            </p>
            <p className="about__p">
              Traditional teaching and training methods often rely heavily on theoretical explanations and limited practical exposure. Immersive technologies provide a new approach in which participants learn by doing rather than simply observing or memorizing information.
            </p>
            <p className="about__p">
              Horvat Innovative Labs develops platforms and programs that help organizations adopt these technologies in practical ways, enabling modern training programs that are safer, more engaging, and more efficient.
            </p>
            <p className="about__highlight">
              At the center of this initiative is the immersive platform: <strong>VR Classroom4You</strong>
            </p>
          </div>
          <div className="about__col about__col--side">
            <div
              ref={frameRef}
              className="dotted-frame about__frame about__frame--tilt"
              data-cursor-pointer
              onMouseMove={onFrameMouseMove}
              onMouseLeave={onFrameMouseLeave}
              style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
            >
              <div className="about__frame-inner">
                <img src="/Futuristic room.jpg" alt="Futuristic room" className="about__img" loading="lazy" decoding="async" />
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <style>{`
        .about { padding: var(--section-padding-y) 0; }
        .about__container {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xl);
        }
        .about__header { margin-bottom: var(--space-md); }
        .about__title { margin: 0 0 var(--space-sm); }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-4xl);
          align-items: start;
        }
        .about__col { min-width: 0; }
        .about__col--side {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xl);
          top: calc(72px + var(--space-lg));
        }
        .about__p {
          color: var(--text-secondary);
          margin: 0 0 var(--space-md);
          line-height: var(--line-relaxed);
        }
        .about__p:last-of-type { margin-bottom: 0; }
        .about__frame {
          width: 100%;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .about__frame--tilt { perspective: 1000px; cursor: pointer; }
        .about__frame--tilt .about__frame-inner {
          transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
        }
        @media (hover: hover) {
          .about__frame--tilt:hover .about__frame-inner {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          }
        }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .about__frame--tilt .about__frame-inner { transform: none; }
        }
        .about__frame-inner {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-card);
        }
        .about__img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .about__highlight {
          color: var(--text-primary);
          font-weight: 500;
          margin: var(--space-xl) 0 0;
          padding-left: var(--space-lg);
          border-left: 3px solid var(--accent-teal);
        }
        .about__bullets {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .about__bullets li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          color: var(--text-secondary);
          font-size: var(--text-small);
          margin-bottom: var(--space-sm);
        }
        .about__bullets li:last-child { margin-bottom: 0; }
        .about__arrow {
          color: var(--accent-magenta);
          flex-shrink: 0;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          .about__col--side {
            order: -1;
            position: static;
            flex-direction: column;
            max-width: 400px;
            margin-inline: auto;
          }
        }
        @media (max-width: 480px) {
          .about__col--side { max-width: 260px; }
        }
      `}</style>
    </section>
  );
}
