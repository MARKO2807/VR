import React, { useRef } from 'react';

const STRENGTH = 0.2;
const RADIUS = 120;

/** Button that leans toward the cursor. Transform is set on the element directly (no re-renders). */
export default function MagneticButton({ children, className = '', as: Component = 'button', ...props }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    const pull = dist < RADIUS ? (1 - dist / RADIUS) * STRENGTH : 0;
    el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Component
      ref={ref}
      className={`magnetic-btn ${className}`.trim()}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
