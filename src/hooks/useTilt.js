import { useCallback, useRef } from 'react';

/**
 * 3D tilt on hover. Writes --tilt-x / --tilt-y straight to the element
 * (one rAF per frame, no React re-renders). Pair with the .tilt-frame / .tilt-inner CSS.
 */
export default function useTilt(max = 6) {
  const ref = useRef(null);
  const frame = useRef(0);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el || frame.current) return;
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-x', `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(x * max).toFixed(2)}deg`);
    });
  }, [max]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
