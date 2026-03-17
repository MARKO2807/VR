import React from 'react';

export default function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <div className="floating-shapes__blob floating-shapes__blob--1" />
      <div className="floating-shapes__blob floating-shapes__blob--2" />
      <div className="floating-shapes__blob floating-shapes__blob--3" />
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
          filter: blur(80px);
          opacity: 0.2;
        }
        .floating-shapes__blob--1 {
          width: min(60vw, 500px);
          height: min(60vw, 500px);
          background: var(--accent-teal);
          top: 10%;
          left: -10%;
          animation: float1 25s ease-in-out infinite;
        }
        .floating-shapes__blob--2 {
          width: min(50vw, 400px);
          height: min(50vw, 400px);
          background: var(--accent-magenta);
          top: 50%;
          right: -5%;
          animation: float2 22s ease-in-out infinite;
        }
        .floating-shapes__blob--3 {
          width: min(40vw, 320px);
          height: min(40vw, 320px);
          background: var(--accent-teal);
          bottom: 5%;
          left: 20%;
          animation: float3 28s ease-in-out infinite;
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(8%, 15%) scale(1.05); }
          66% { transform: translate(-5%, 8%) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10%, -8%) scale(1.08); }
          66% { transform: translate(5%, 5%) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12%, -12%) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-shapes__blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
