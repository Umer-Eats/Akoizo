import { useId } from 'react';
import type { CompetitiveRating } from '@/lib/competitive-rating';
import { RANK_NAMES, rankLabel } from '@/lib/competitive-rating';

// Original Ako emblems: curious eyes, orbital paths, and an increasingly elaborate star crest.
const palettes = [
  ['#77818c', '#c7d0d8'],
  ['#a65b32', '#efb77f'],
  ['#8e9eae', '#edf3fa'],
  ['#c18913', '#ffe494'],
  ['#288f90', '#a0f4df'],
  ['#8860c8', '#d4b6ff'],
  ['#329657', '#b1f3a2'],
  ['#c64163', '#ffb3c7'],
  ['#d6a12a', '#fff4c2'],
];
export function RankBadge({
  rank,
  size = 48,
}: {
  rank: Pick<CompetitiveRating, 'name' | 'tier'>;
  size?: number;
}) {
  const id = useId();
  const index = RANK_NAMES.findIndex((name) => name === rank.name);
  const [color, light] = palettes[index] ?? ['#657084', '#c5cddd'];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={rankLabel(rank)}
      className="ako-rank-badge"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={light} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
      {index >= 1 && (
        <ellipse
          cx="50"
          cy="48"
          rx="43"
          ry="19"
          transform={`rotate(${index % 2 ? -32 : 32} 50 48)`}
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
      )}
      {index >= 4 && (
        <ellipse
          cx="50"
          cy="48"
          rx="43"
          ry="19"
          transform="rotate(72 50 48)"
          fill="none"
          stroke={light}
          strokeWidth="2"
        />
      )}
      {index >= 5 && (
        <path
          d="M15 55 6 32 29 43 M85 55 94 32 71 43"
          fill={color}
          stroke={light}
          strokeWidth="2"
        />
      )}
      {index >= 6 && (
        <path
          d="m50 2 5 12 12 5-12 5-5 12-5-12-12-5 12-5Z"
          fill={light}
          stroke={color}
          strokeWidth="2"
        />
      )}
      {index === 8 && (
        <path
          d="m50 4 7 26 22-14-9 27 26 5-25 10 12 24-26-10-7 25-7-25-26 10 12-24L4 48l26-5-9-27 22 14Z"
          fill={color}
          opacity=".4"
        />
      )}
      <path
        d={
          index >= 3
            ? 'M50 17 78 33 78 62 50 82 22 62 22 33Z'
            : 'M25 26 Q50 13 75 26 L79 58 Q73 73 50 80 Q27 73 21 58Z'
        }
        fill={`url(#${id})`}
        stroke={light}
        strokeWidth="2"
      />
      <path d="M29 38 32 26 43 36 M57 36 68 26 71 38" fill={color} />
      <path d="M29 43 Q50 34 71 43 L68 59 Q50 72 32 59Z" fill="#182335" />
      <ellipse cx="40" cy="49" rx="3.5" ry="5" fill={light} />
      <ellipse cx="60" cy="49" rx="3.5" ry="5" fill={light} />
      <path d="m46 59 4 3 4-3" fill="none" stroke={light} strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: rank.tier ?? 0 }, (_, i) => (
        <path
          key={i}
          d={`m${50 + (i - ((rank.tier ?? 1) - 1) / 2) * 12} 84 4 4-4 4-4-4Z`}
          fill={light}
          stroke={color}
        />
      ))}
      {index < 0 && (
        <text x="50" y="91" textAnchor="middle" fill={light} fontSize="15">
          ?
        </text>
      )}
    </svg>
  );
}
