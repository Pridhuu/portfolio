'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 400);
          return 100;
        }
        const increment = p < 60 ? Math.random() * 12 + 4 : Math.random() * 6 + 2;
        return Math.min(p + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="loader-name" style={{ animation: 'letterReveal 0.8s cubic-bezier(0.4,0,0.2,1) both' }}>
        PRIDHU
      </div>
      <div className="loader-bar">
        <div className="loader-progress" style={{ width: `${progress}%` }} />
      </div>
      <span style={{ fontSize: '10px', color: 'rgba(238,236,232,0.4)', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>
        LOADING — {Math.round(progress)}%
      </span>
    </div>
  );
}
