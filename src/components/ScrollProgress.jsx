import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      role="presentation"
      aria-hidden="true"
      style={{ '--scroll-progress': `${progress}%` }}
    >
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 999;
          background: rgba(255,255,255,0.06);
        }
        .scroll-progress::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: var(--scroll-progress);
          background: linear-gradient(90deg, var(--accent-magenta), var(--accent-teal));
          transition: width 0.1s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-progress::after { transition: none; }
        }
      `}</style>
    </div>
  );
}
