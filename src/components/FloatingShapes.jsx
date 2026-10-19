import React from 'react';

/**
 * Soft ambient color behind the page. Uses radial gradients instead of filter: blur(),
 * so it costs almost nothing to paint; the slow drift is transform-only and stops under reduced motion.
 */
export default function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <div className="floating-shapes__blob floating-shapes__blob--1" />
      <div className="floating-shapes__blob floating-shapes__blob--2" />
      <style>{`
        .floating-shapes {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .floating-shapes__blob {
          position: absolute;
          border-radius: 50%;
          opacity: var(--blob-opacity);
          will-change: transform;
        }
        .floating-shapes__blob--1 {
          width: min(90vw, 760px);
          height: min(90vw, 760px);
          top: -10%;
          left: -20%;
          background: radial-gradient(circle, var(--accent-teal-bright, #00c9d4) 0%, transparent 65%);
          animation: floatA 40s ease-in-out infinite alternate;
        }
        .floating-shapes__blob--2 {
          width: min(80vw, 640px);
          height: min(80vw, 640px);
          bottom: -15%;
          right: -15%;
          background: radial-gradient(circle, #e91e8c 0%, transparent 65%);
          animation: floatB 46s ease-in-out infinite alternate;
        }
        @keyframes floatA { to { transform: translate3d(12vw, 18vh, 0); } }
        @keyframes floatB { to { transform: translate3d(-10vw, -14vh, 0); } }
        @media (prefers-reduced-motion: reduce) {
          .floating-shapes__blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
