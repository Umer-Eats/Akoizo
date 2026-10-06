'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
export function Moth({
  small = false,
  interactive = true,
}: {
  small?: boolean;
  interactive?: boolean;
}) {
  const [happy, setHappy] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  const hello = () => {
    setHappy(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setHappy(false), 2400);
  };
  const sprite = (
    <span className="moth-float">
      <span className="moth-sprite" />
    </span>
  );
  return (
    <div className={`moth-wrap ${small ? 'moth-small' : ''} ${happy ? 'is-happy' : ''}`}>
      {interactive ? (
        <button
          className="moth-button"
          onClick={hello}
          aria-label="Say hello to Ako, the poodle moth"
        >
          {sprite}
        </button>
      ) : (
        <div role="img" aria-label="Ako, a lively pixel-art Venezuelan poodle moth">
          {sprite}
        </div>
      )}
      {interactive && (
        <span role="status" className={`moth-speech ${happy ? 'visible' : ''}`}>
          Stay curious, friend.
        </span>
      )}
    </div>
  );
}
export function Orbit({ className = '' }: { className?: string }) {
  return (
    <svg className={`orbit-art ${className}`} viewBox="0 0 1000 500" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth=".65">
        <ellipse cx="500" cy="250" rx="465" ry="118" transform="rotate(-12 500 250)" />
        <ellipse cx="500" cy="250" rx="465" ry="118" transform="rotate(12 500 250)" />
        <ellipse cx="500" cy="250" rx="465" ry="55" />
      </g>
      <circle cx="59" cy="307" r="9" fill="currentColor" />
      <circle cx="922" cy="189" r="5" fill="currentColor" />
      <path d="M864 328v32m-16-16h32M119 117v22m-11-11h22" stroke="currentColor" />
    </svg>
  );
}
export function WireGlobe({ className = '' }: { className?: string }) {
  return (
    <svg className={`wire-globe ${className}`} viewBox="0 0 500 500" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth=".6">
        <circle cx="250" cy="250" r="220" />
        {[50, 105, 160, 205].map((r) => (
          <ellipse key={r} cx="250" cy="250" rx={r} ry="220" />
        ))}
        {[65, 120, 173, 208].map((r) => (
          <ellipse key={r} cx="250" cy="250" rx="220" ry={r} />
        ))}
        <path d="M30 250h440M250 30v440" />
      </g>
    </svg>
  );
}
export function PixelStar({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pixel-star ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 0h4v6h4v4h6v4h-6v4h-4v6h-4v-6H6v-4H0v-4h6V6h4z" />
    </svg>
  );
}
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    el.classList.add('reveal-ready');
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
