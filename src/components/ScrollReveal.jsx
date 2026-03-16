import React, { useRef, useState, useEffect } from 'react';

/**
 * Wraps content and reveals it with a fade + slide-up when it scrolls into view.
 * Uses Intersection Observer; respects prefers-reduced-motion.
 */
export default function ScrollReveal({ children, className = '', delay = 0, as: Component = 'div' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ '--scroll-reveal-delay': `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
