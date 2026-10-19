import React, { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor-pointer]';
const TEXT_INPUT = 'input, textarea, select, [contenteditable="true"]';

/**
 * Lightweight custom cursor: a dot that tracks the pointer exactly and a ring that eases after it.
 * Everything is done with transforms on refs inside one rAF loop that sleeps when the ring settles,
 * so there are no React re-renders and no layout reads on mouse move.
 * Only enabled for fine pointers (mouse/trackpad) on wide screens without reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)');
    if (!query.matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;
    let shown = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (!shown) {
        shown = true;
        pos.x = target.x;
        pos.y = target.y;
        document.documentElement.classList.add('has-custom-cursor');
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // mouseover only fires when the hovered element changes – far cheaper than elementFromPoint per move
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      const overText = !!el?.closest(TEXT_INPUT);
      document.documentElement.classList.toggle('custom-cursor--text', overText);
      document.documentElement.classList.toggle('custom-cursor--pointer', !overText && !!el?.closest(INTERACTIVE));
    };

    const onLeave = () => {
      shown = false;
      document.documentElement.classList.remove('has-custom-cursor');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor', 'custom-cursor--pointer', 'custom-cursor--text');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor custom-cursor__ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor custom-cursor__dot" aria-hidden="true" />
      <style>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          opacity: 0;
          will-change: transform;
        }
        .has-custom-cursor .custom-cursor { opacity: 1; }
        .has-custom-cursor,
        .has-custom-cursor * { cursor: none !important; }
        .has-custom-cursor.custom-cursor--text input,
        .has-custom-cursor.custom-cursor--text textarea,
        .has-custom-cursor.custom-cursor--text select { cursor: text !important; }
        .custom-cursor--text .custom-cursor { opacity: 0 !important; }

        .custom-cursor__ring {
          width: 28px;
          height: 28px;
          margin: -14px 0 0 -14px;
          border: 1.5px solid var(--accent-teal);
          transition: opacity 0.2s ease, width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor__dot {
          width: 6px;
          height: 6px;
          margin: -3px 0 0 -3px;
          background: var(--accent-teal);
          transition: opacity 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor--pointer .custom-cursor__ring {
          width: 44px;
          height: 44px;
          margin: -22px 0 0 -22px;
          border-color: var(--accent-magenta);
          background-color: var(--accent-magenta-soft);
        }
        .custom-cursor--pointer .custom-cursor__dot { background: var(--accent-magenta); }
      `}</style>
    </>
  );
}
