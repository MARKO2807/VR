import React, { useState, useEffect, useRef } from 'react';

const SIZE = 24;
const DOT = 4;

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
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
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const interactive = el?.closest('a, button, [data-cursor-pointer]');
        setHovering(!!interactive);
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

  useEffect(() => {
    if (visible) document.body.classList.add('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, [visible]);

  return (
    <>
      <div
        className={`custom-cursor ${hovering ? 'custom-cursor--pointer' : ''}`}
        aria-hidden="true"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
        }}
      >
        <span className="custom-cursor__ring" />
        <span className="custom-cursor__dot" />
      </div>
      <style>{`
        body.custom-cursor-active {
          cursor: none;
        }
        body.custom-cursor-active a,
        body.custom-cursor-active button,
        body.custom-cursor-active [data-cursor-pointer] {
          cursor: none;
        }
        .custom-cursor {
          position: fixed;
          width: ${SIZE}px;
          height: ${SIZE}px;
          margin-left: -${SIZE / 2}px;
          margin-top: -${SIZE / 2}px;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }
        .custom-cursor__ring {
          position: absolute;
          width: ${SIZE}px;
          height: ${SIZE}px;
          border: 2px solid var(--accent-teal);
          border-radius: 50%;
          transition: transform 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 0 12px rgba(0, 201, 212, 0.4);
        }
        .custom-cursor__dot {
          position: absolute;
          width: ${DOT}px;
          height: ${DOT}px;
          margin-left: -${DOT / 2}px;
          margin-top: -${DOT / 2}px;
          background: var(--accent-teal);
          border-radius: 50%;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .custom-cursor--pointer .custom-cursor__ring {
          transform: scale(1.35);
          border-color: var(--accent-magenta);
          box-shadow: 0 0 16px rgba(233, 30, 140, 0.35);
        }
        .custom-cursor--pointer .custom-cursor__dot {
          transform: scale(1.5);
          background: var(--accent-magenta);
        }
        @media (max-width: 900px), (hover: none) {
          .custom-cursor { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor { display: none; }
        }
      `}</style>
    </>
  );
}
