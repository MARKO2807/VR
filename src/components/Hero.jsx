import React from 'react';
import MagneticButton from './MagneticButton';
import useTilt from '../hooks/useTilt';
import { useT } from '../i18n';

export default function Hero({ onRequestDemo }) {
  const t = useT();
  const tilt = useTilt();

  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="container hero__container">
        <h1 id="hero-heading" className="hero__title">
          {t.hero.titleStart}{' '}
          <span className="hero__title-highlight">{t.hero.titleHighlight}</span>
        </h1>
        <div className="hero__bento">
          <div className="hero__copy">
            <p className="hero__subtitle">
              {t.hero.subtitleStart} <strong>VR Classroom4You</strong>{t.hero.subtitleEnd}
            </p>
            <p className="hero__supporting">{t.hero.supporting}</p>
            <div className="hero__ctas">
              <MagneticButton type="button" className="btn btn-primary" onClick={onRequestDemo}>
                {t.common.requestDemo}
              </MagneticButton>
              <MagneticButton as="a" href="#platform" className="btn btn-secondary">
                {t.hero.explore}
              </MagneticButton>
            </div>
          </div>
          <div className="dotted-frame tilt-frame hero__frame" {...tilt}>
            <div className="tilt-inner hero__frame-inner">
              <img
                src="/Oculus3.jpg"
                alt={t.hero.imageAlt}
                className="hero__img"
                width="1200"
                height="900"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero {
          position: relative;
          padding-top: calc(var(--header-h) + clamp(2.5rem, 7vw, 5rem));
          padding-bottom: var(--section-padding-y);
          min-height: min(100vh, 960px);
          display: flex;
          align-items: center;
          background:
            radial-gradient(ellipse 80% 60% at 85% 10%, color-mix(in srgb, var(--accent-teal-bright) 10%, transparent), transparent 70%),
            linear-gradient(180deg, var(--bg-secondary) 0%, transparent 100%);
        }
        .hero__container {
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 5vw, 3.5rem);
        }
        .hero__title {
          font-size: var(--text-hero);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          max-width: 20ch;
          animation: heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero__title-highlight {
          background: var(--gradient-brand);
          background-size: 100% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroColorFlow 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(0.5em); }
          to { opacity: 1; transform: none; }
        }
        /* Brand gradient "flows" into the highlighted words: starts zoomed on the teal end, settles on the full gradient */
        @keyframes heroColorFlow {
          from { background-size: 400% 100%; background-position: 0% 50%; }
          to { background-size: 100% 100%; background-position: 0% 50%; }
        }
        /* Staggered entrance for copy, buttons and image */
        .hero__subtitle, .hero__supporting, .hero__ctas {
          animation: heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero__subtitle { animation-delay: 0.12s; }
        .hero__supporting { animation-delay: 0.22s; }
        .hero__ctas { animation-delay: 0.32s; }
        .hero__frame { animation: heroFrameIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both; }
        .hero__img { animation: heroImgIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both; }
        @keyframes heroFrameIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes heroImgIn {
          from { clip-path: inset(0 0 100% 0); transform: scale(1.12); }
          to { clip-path: inset(0 0 0 0); transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__title, .hero__title-highlight, .hero__subtitle, .hero__supporting, .hero__ctas, .hero__frame, .hero__img { animation: none; }
        }
        .hero__bento {
          display: grid;
          grid-template-columns: 1fr minmax(280px, 440px);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }
        .hero__copy { min-width: 0; max-width: 62ch; }
        .hero__subtitle {
          font-size: 1.125rem;
          color: var(--text-primary);
          margin: 0 0 var(--space-lg);
          line-height: var(--line-relaxed);
        }
        .hero__supporting {
          font-size: var(--text-body);
          color: var(--text-secondary);
          margin: 0 0 var(--space-2xl);
          line-height: var(--line-relaxed);
        }
        .hero__frame { border-radius: var(--radius-xl); }
        .hero__frame-inner {
          border-radius: calc(var(--radius-xl) - 5px);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-secondary);
        }
        .hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
        }
        @media (max-width: 960px) {
          .hero { min-height: auto; }
          .hero__bento { grid-template-columns: 1fr; }
          .hero__frame { max-width: 440px; width: 100%; margin-inline: auto; order: -1; }
        }
        @media (max-width: 480px) {
          .hero__subtitle { font-size: 1.0625rem; }
          .hero__ctas .btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}
