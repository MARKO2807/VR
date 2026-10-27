import React, { useEffect, useRef } from 'react';

/**
 * Renders a stat value like "74", "48+", "+70 %" or "92 %" and counts the number up from 0
 * once it scrolls into view. Non-numeric values ("Quest 3", "B i C") render as-is.
 * The final text is in the markup from the start, so nothing breaks without JS or with reduced motion.
 */
const PATTERN = /^([^\d]*)(\d+)(.*)$/;

export default function CountUp({ value, duration = 1400, as: Tag = 'span', ...props }) {
  const ref = useRef(null);
  const match = typeof value === 'string' ? value.match(PATTERN) : null;
  // Only animate values that are mostly a number (skip things like "Quest 3")
  const animate = match && match[1].length <= 1 && !/[a-zA-Z]/.test(match[3]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    let frame = 0;
    el.textContent = `${prefix}0${suffix}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, animate]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Tag ref={ref} {...props}>{value}</Tag>;
}
