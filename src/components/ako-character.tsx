'use client';
import { useEffect, useState } from 'react';
import { akoFrame, type AkoAction } from '@/lib/ako-motion';

/** Original 48px artwork: integer pixels, shared palette and a fixed foot anchor.
 * Discrete clips follow PerfectPixel's frame/identity/anchor consistency approach. */
export function AkoCharacter({
  action = 'idle',
  actionKey = 0,
  paused = false,
  motion = true,
  look,
}: {
  action?: AkoAction;
  actionKey?: number;
  paused?: boolean;
  motion?: boolean;
  look?: number;
}) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    setFrame(0);
    if (!motion || paused) return;
    let time = 0;
    const timer = setInterval(() => {
      if (!document.hidden) {
        time += 0.07;
        setFrame(akoFrame(action, time));
      }
    }, 70);
    return () => clearInterval(timer);
  }, [action, actionKey, motion, paused]);
  const f = motion ? frame : 0;
  const moving = action === 'walk' || action === 'run';
  const joy = action === 'happy';
  const angry = action === 'angry';
  const sad = action === 'sad';
  const sleep = action === 'sleep';
  const eat = action === 'eat';
  const think = action === 'thinking';
  const bounce = moving
    ? [0, -1, -2, -1, 0, -1, -2, -1][f]
    : joy
      ? [0, -2, -4, -3, -1, 0][f]
      : f % 4 === 2
        ? -1
        : 0;
  const stride = moving ? [0, 2, 3, 2, 0, -2, -3, -2][f] : 0;
  const outline = '#243451',
    fur = angry ? '#ef6976' : '#89bcdf',
    light = angry ? '#ffabb0' : '#c1e2ef';
  const eye = sleep || (action === 'idle' && f === 6);
  return (
    <svg
      className="ako-rig ako-pixel"
      viewBox="0 0 48 48"
      width="192"
      height="192"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      data-action={action}
      data-frame={f}
    >
      <path fill="#213450" opacity=".18" d="M12 44h26v2H12z" />
      <g transform={look !== undefined && look < -0.2 ? 'translate(48 0) scale(-1 1)' : undefined}>
        <path fill="none" stroke={outline} strokeWidth="4" d={`M15 37H8v-3H5v-${5 + (f % 2)}H8`} />
        <path fill="none" stroke="#ee9daa" strokeWidth="2" d={`M15 37H8v-3H5v-${5 + (f % 2)}H8`} />
        <path
          fill={outline}
          d={`M${16 + stride} 40h7v4h-9v-2h2z M${28 - stride} 40h7v4h-9v-2h2z`}
        />
        <path
          fill="#eea9b3"
          d={`M${16 + stride} 41h5v2h-7v-1h2z M${28 - stride} 41h5v2h-7v-1h2z`}
        />
        <g transform={`translate(${angry && f % 2 ? 1 : 0} ${bounce})`}>
          <path fill={outline} d="M17 27h16v3h3v11H14V30h3z" />
          <path fill="#f8f4df" d="M18 28h14v3h2v9H16v-9h2z" />
          <path fill="#c5dce0" d="M16 33h3v7h-3zM31 31h3v9h-3z" />
          <path fill="#537fbe" d="M22 28h6v5h-6z" />
          <path fill="#e8f9f0" d="M19 28h3v7l-3-3zM28 28h3v4l-3 3z" />
          <path fill="#273c5b" d="M24 34h1v1h-1zM24 37h1v1h-1z" />
          <path fill="#7ab9b3" d="M28 35h4v3h-4z" />
          <path fill="#f6ca73" d="M30 32h1v4h-1z" />
          <g transform={`translate(0 ${sad ? 2 : 0})`}>
            <path fill={outline} d="M10 7h9v2h12V7h9v2h3v10h-3v6h-3v3H16v-3h-4v-6H8V10h2z" />
            <path fill={fur} d="M11 9h7v3h15V9h6v2h2v7h-4v7h-4v2H18v-3h-4v-7h-4v-6h1z" />
            <path fill="#ee9daa" d="M12 11h4v7h-4zM35 11h4v7h-4z" />
            <path fill="#ffccd1" d="M12 11h3v3h-3zM35 11h3v3h-3z" />
            <path fill={light} d="M19 12h12v2H19zM16 14h5v4h-5zM18 10h4v2h-4z" />
            <path fill="#fff2d8" d="M21 22h12v2h3v3h-4v2H21v-2h-3v-3h3z" />
            {eye ? (
              <path fill={outline} d="M18 20h5v1h-5zM29 20h5v1h-5z" />
            ) : joy ? (
              <path
                fill={outline}
                d="M18 20v-2h2v-1h2v1h1v2h-2v-1h-1v1zM29 20v-2h2v-1h2v1h1v2h-2v-1h-1v1z"
              />
            ) : (
              <>
                <path fill={outline} d="M19 17h4v6h-4zM29 17h4v6h-4z" />
                <path fill="white" d="M19 17h2v2h-2zM29 17h2v2h-2z" />
              </>
            )}
            {angry && <path fill={outline} d="M18 15h2v1h3v2h-2v-1h-3zM29 16h3v-1h2v2h-3v1h-2z" />}
            {sad && (
              <>
                <path fill={outline} d="M18 16h3v-1h2v1h-2v1h-3zM29 15h2v1h3v1h-3v-1h-2z" />
                <path fill="#63c6ee" d={`M32 ${23 + (f % 3)}h2v3h-2z`} />
              </>
            )}
            <path fill="#e08b9b" d="M24 22h5v2h-1v1h-3v-1h-1zM16 23h3v1h-3zM34 23h3v1h-3z" />
            <path
              fill={outline}
              d={
                sad
                  ? 'M25 27h4v1h-4zM24 28h1v1h-1zM29 28h1v1h-1z'
                  : (eat && f % 2) || action === 'surprised'
                    ? 'M25 26h4v3h-4z'
                    : 'M24 26h1v1h4v-1h1v2h-6z'
              }
            />
            {!sad && <path fill="white" d="M26 27h2v2h-2z" />}
            <path fill={outline} d="M11 22h5v1h-5zM12 25h4v1h-4zM37 22h5v1h-5zM37 25h4v1h-4z" />
          </g>
          <path
            fill={outline}
            d={action === 'wave' || joy ? `M12 ${23 + (f % 2) * 2}h4v11h-4z` : 'M12 31h4v7h-4z'}
          />
          <path
            fill={fur}
            d={action === 'wave' || joy ? `M12 ${22 + (f % 2) * 2}h3v4h-3z` : 'M12 34h3v3h-3z'}
          />
          <path fill={outline} d={think || eat ? 'M30 28h5v6h-5z' : 'M34 31h3v7h-3z'} />
          <path fill={fur} d={think || eat ? 'M29 27h5v4h-5z' : 'M34 34h3v3h-3z'} />
          {eat && (
            <g transform={`translate(22 ${31 + (f % 2)})`}>
              <path fill="#ac6a32" d="M0 0h7v6H0z" />
              <path fill="#ffdc78" d="M0 0h6v4H0z" />
              <path fill="#d69b3d" d="M2 1h2v2H2z" />
            </g>
          )}
        </g>
      </g>
      {joy && (
        <g fill={f % 2 ? '#ffe79c' : '#f6b84e'}>
          <path d="M7 4h2v3h3v2H9v3H7V9H4V7h3zM39 28h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
          <path d={`M${34 + (f % 3)} 3h2v2h-2zM7 20h2v2H7z`} />
        </g>
      )}
      {think && (
        <g fill="#acd6f5">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={24 + i * 5}
              y={4}
              width="3"
              height="3"
              opacity={f % 3 === i ? 1 : 0.25}
            />
          ))}
        </g>
      )}
      {angry && <path fill="#f16f7d" d="M37 2h2v3h3v2h-5zM43 8h2v5h-5v-2h3z" />}
      {sleep && (
        <path
          transform={`translate(0 ${-f % 3})`}
          fill="#8bb5d9"
          d="M34 2h7v2h-2v2h-2v2h4v2h-7V8h2V6h2V4h-4z"
        />
      )}
      {action === 'surprised' && <path fill="#f6cc72" d="M25 1h2v5h-2zM25 7h2v2h-2z" />}
    </svg>
  );
}
