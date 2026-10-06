'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AkoCharacter } from './ako-character';
import { useSettings } from './providers';
import { AKO_WAVE_SECONDS } from '@/lib/ako-motion';
export function Mascot({
  small = false,
  interactive = true,
  corner = false,
}: {
  small?: boolean;
  interactive?: boolean;
  corner?: boolean;
}) {
  const [happy, setHappy] = useState(false);
  const [greeting, setGreeting] = useState(0);
  const [paused, setPaused] = useState(false);
  const [look, setLook] = useState<number | undefined>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const { motion } = useSettings();
  const scene = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    let inView = true;
    const updatePause = () => setPaused(!inView || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePause();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', updatePause);
    updatePause();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePause);
    };
  }, []);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  const hello = () => {
    setHappy(true);
    setGreeting((value) => value + 1);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setHappy(false), AKO_WAVE_SECONDS * 1000);
  };
  const sprite = (
    <AkoCharacter
      action={happy ? 'wave' : 'idle'}
      actionKey={greeting}
      paused={paused}
      motion={motion && !reducedMotion}
      look={look}
    />
  );
  return (
    <div
      ref={scene}
      data-paused={paused}
      className={`mascot-wrap ${small ? 'mascot-small' : ''} ${corner ? 'mascot-corner' : ''} ${happy ? 'is-happy' : ''}`}
    >
      {interactive ? (
        <button
          className="mascot-button"
          onClick={hello}
          onPointerMove={(event) => {
            if (event.pointerType !== 'mouse') return;
            const rect = event.currentTarget.getBoundingClientRect();
            setLook(
              Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)),
            );
          }}
          onPointerLeave={() => setLook(undefined)}
          onFocus={() => setLook(0)}
          onBlur={() => setLook(undefined)}
          aria-label="Say hello to Ako, the lab rat"
        >
          {sprite}
        </button>
      ) : (
        <div role="img" aria-label="Ako, a cheerful male pixel-art lab rat">
          {sprite}
        </div>
      )}
      {interactive && (
        <span role="status" className={`mascot-speech ${happy ? 'visible' : ''}`}>
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
