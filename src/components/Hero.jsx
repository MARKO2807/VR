import React, { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

const TILT_MAX = 8;

export default function Hero({ onRequestDemo }) {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onFrameMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * TILT_MAX,
      y: x * TILT_MAX,
    });
  };

  const onFrameMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg-mesh" aria-hidden="true" />
      <div className="container hero__container">
        <h1 id="hero-heading" className="hero__title">
          <span className="hero__title-line">
            Immersive Training and Digital Experiences with{' '}
            <span className="hero__title-highlight">Virtual Reality</span>
          </span>
        </h1>
        <div className="hero__bento">
          <div className="hero__copy">
            <p className="hero__subtitle">
              Horvat Innovative Labs develops advanced immersive technology solutions through its flagship platform{' '}
              <strong>VR Classroom4You</strong>, enabling organizations, educational institutions, and professional services to train, educate, and present experiences through realistic Virtual Reality environments.
            </p>
            <p className="hero__supporting">
              By combining immersive simulation, interactive learning systems, and modern training methodologies, VR technology allows users to practice real-world situations safely, develop practical skills faster, and experience complex environments in ways that traditional education cannot provide.
            </p>
          </div>
          <div
            ref={frameRef}
            className="dotted-frame hero__frame hero__frame--tilt"
            data-cursor-pointer
            onMouseMove={onFrameMouseMove}
            onMouseLeave={onFrameMouseLeave}
            style={{
              '--tilt-x': `${tilt.x}deg`,
              '--tilt-y': `${tilt.y}deg`,
            }}
          >
            <div className="hero__frame-inner">
              <img
                src="/Oculus3.jpg"
                alt="Immersive VR experience with VR Classroom4You"
                className="hero__img"
              />
            </div>
          </div>
        </div>
        <div className="hero__ctas">
          <MagneticButton type="button" className="btn btn-primary hero__cta-primary" onClick={onRequestDemo}>
            Request a Demo
          </MagneticButton>
          <MagneticButton as="a" href="#platform" className="btn btn-secondary hero__cta-secondary">
            Explore VR Classroom4You
          </MagneticButton>
        </div>
      </div>
      <style>{`
        .hero {
          position: relative;
          padding-top: calc(72px + var(--section-padding-y));
          padding-bottom: var(--section-padding-y);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .hero__bg-mesh {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, rgba(0, 201, 212, 0.04) 0%, transparent 40%, rgba(233, 30, 140, 0.04) 70%, transparent 100%);
          background-size: 200% 200%;
          animation: heroMesh 15s ease-in-out infinite;
        }
        @keyframes heroMesh {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__bg-mesh { animation: none; }
        }
        .hero__container {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          gap: var(--space-3xl);
          min-height: calc(100vh - 72px - var(--section-padding-y) * 2);
        }
        .hero__title {
          font-size: var(--text-hero);
          font-weight: 700;
          line-height: var(--line-tight);
          color: var(--text-primary);
          margin: 0;
        }
        .hero__title-line {
          display: inline;
          opacity: 0;
          transform: translateY(0.75em);
          animation: heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero__title-highlight {
          display: inline;
          background: linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-magenta) 50%, var(--accent-teal) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          filter: drop-shadow(0 0 24px rgba(0, 201, 212, 0.4)) drop-shadow(0 0 48px rgba(233, 30, 140, 0.25));
          animation: heroShimmer 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes heroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroShimmer {
          0% { background-position: 0% 50%; }
          33% { background-position: 100% 50%; }
          66% { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__title-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .hero__title-highlight { animation: none; }
        }
        .hero__bento {
          display: grid;
          grid-template-columns: 1fr minmax(280px, 400px);
          gap: var(--space-3xl);
          align-items: start;
        }
        .hero__copy { min-width: 0; }
        .hero__subtitle {
          font-size: var(--text-body);
          color: var(--text-secondary);
          margin: 0 0 var(--space-lg);
          line-height: var(--line-relaxed);
        }
        .hero__supporting {
          font-size: var(--text-small);
          color: var(--text-muted);
          margin: 0;
          line-height: var(--line-relaxed);
        }
        .hero__frame {
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .hero__frame--tilt {
          perspective: 1000px;
          transition: transform 0.2s ease-out;
          cursor: pointer;
        }
        .hero__frame--tilt .hero__frame-inner {
          transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transition: transform 0.2s ease-out;
        }
        @media (hover: hover) {
          .hero__frame--tilt:hover .hero__frame-inner {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          }
        }
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .hero__frame--tilt .hero__frame-inner { transform: none; }
        }
        .hero__frame-inner {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-card);
          transform-style: preserve-3d;
        }
        .hero__img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
        }
        @media (max-width: 640px) {
          .hero__ctas { justify-content: center; }
        }
        @media (max-width: 960px) {
          .hero__container { min-height: auto; }
          .hero__bento {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          .hero__frame { max-width: 360px; margin-inline: auto; width: 100%; }
        }
        @media (max-width: 480px) {
          .hero__frame { max-width: 260px; }
        }
      `}</style>
    </section>
  );
}
