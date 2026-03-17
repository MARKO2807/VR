import React, { useRef, useState } from 'react';

const STRENGTH = 0.2;
const RADIUS = 120;

export default function MagneticButton({ children, className = '', as: Component = 'button', ...props }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = dist < RADIUS ? (1 - dist / RADIUS) * STRENGTH : 0;
    setOffset({
      x: dx * pull,
      y: dy * pull,
    });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <Component
      ref={ref}
      className={`magnetic-btn ${className}`.trim()}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
      <style>{`
        .magnetic-btn {
          transition: transform 0.2s ease-out;
        }
        @media (max-width: 900px), (hover: none), (prefers-reduced-motion: reduce) {
          .magnetic-btn {
            transition: none;
            transform: none !important;
          }
        }
      `}</style>
    </Component>
  );
}
