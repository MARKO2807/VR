import React, { useState, useEffect, useRef } from 'react';

const GLOW_SIZE = 400;

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -GLOW_SIZE, y: -GLOW_SIZE });
  const [visible, setVisible] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    let isTouch = false;
    const onTouch = () => { isTouch = true; setVisible(false); };
    window.addEventListener('touchstart', onTouch, { once: true });

    const onMove = (e) => {
      if (isTouch) return;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!visible) setVisible(true);
        raf.current = null;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  return (
    <div
      className="cursor-glow"
      aria-hidden="true"
      style={{
        '--glow-x': `${pos.x}px`,
        '--glow-y': `${pos.y}px`,
        opacity: visible ? 1 : 0,
      }}
    >
      <style>{`
        .cursor-glow {
          position: fixed;
          width: ${GLOW_SIZE}px;
          height: ${GLOW_SIZE}px;
          left: calc(var(--glow-x) - ${GLOW_SIZE / 2}px);
          top: calc(var(--glow-y) - ${GLOW_SIZE / 2}px);
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(
            circle,
            rgba(0, 201, 212, 0.08) 0%,
            rgba(233, 30, 140, 0.04) 40%,
            transparent 70%
          );
        }
        @media (max-width: 900px), (hover: none) {
          .cursor-glow { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-glow { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
