import { useId, type ReactNode } from 'react';
import type { CompetitiveRating } from '@/lib/competitive-rating';
import { RANK_NAMES, rankLabel } from '@/lib/competitive-rating';

// Faceted gem crests. Every rank shares one cut stone; higher ranks add a finial, blades,
// wings, a crown and finally rays, so the ladder reads at a glance. Tier pips sit in the stone.
const palettes: [dark: string, base: string, light: string][] = [
  ['#3d444d', '#7a848f', '#cdd5dd'], // Iron
  ['#6b3519', '#b8693a', '#f2be8c'], // Bronze
  ['#566170', '#a3afbc', '#f1f5f9'], // Silver
  ['#7a5206', '#d49b17', '#ffe08a'], // Gold
  ['#145e63', '#2fa3a0', '#a7f3e4'], // Platinum
  ['#4b2d8a', '#8b63d6', '#dccbff'], // Diamond
  ['#155c34', '#2fa35f', '#b4f2c4'], // Ascendant
  ['#7a1530', '#cc3d62', '#ffb3c5'], // Immortal
  ['#8a6510', '#f0c040', '#fffbe0'], // Radiant
];

// Pointy-top hexagon, outer and inner (the table of the stone).
const hex = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
  });
const outer = hex(34);
const inner = hex(20);
const points = (list: readonly (readonly [number, number])[]) =>
  list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
// Light falls from the top left: positive values brighten a facet, negative values darken it.
const facetLight = [0.22, -0.06, -0.3, -0.18, 0.1, 0.4];

const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}L${cx + r * 0.3} ${cy - r * 0.3}L${cx + r} ${cy}L${cx + r * 0.3} ${cy + r * 0.3}L${cx} ${cy + r}L${cx - r * 0.3} ${cy + r * 0.3}L${cx - r} ${cy}L${cx - r * 0.3} ${cy - r * 0.3}Z`;

// Left-side ornaments; the right side is the same shape mirrored.
const blade = { upper: '21,38 6,50 21,50', lower: '21,50 6,50 21,62' };
const wing = ['22,31 2,19 9,36 21,44', '21,44 1,40 9,53 21,56', '21,56 4,61 13,70 25,67'];
const mirror = 'matrix(-1 0 0 1 100 0)';

export function RankBadge({
  rank,
  size = 48,
}: {
  rank: Pick<CompetitiveRating, 'name' | 'tier'>;
  size?: number;
}) {
  const id = useId();
  const index = RANK_NAMES.findIndex((name) => name === rank.name);
  const label = rankLabel(rank);

  if (index < 0) {
    // Unranked: the outline of the stone, waiting to be cut.
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={label}
        className="ako-rank-badge ako-rank-badge-empty"
      >
        <polygon
          points={points(outer)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinejoin="round"
        />
        <polygon points={points(inner)} fill="currentColor" opacity=".08" />
        <polygon points={points(inner)} fill="none" stroke="currentColor" strokeWidth="1" opacity=".45" />
        <path d={star(50, 50, 8)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  const [dark, base, light] = palettes[index];
  const tier = rank.tier ?? 0;
  const side = (children: ReactNode) => (
    <>
      <g>{children}</g>
      <g transform={mirror}>{children}</g>
    </>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={label}
      className="ako-rank-badge"
    >
      <defs>
        <linearGradient id={`${id}-table`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop stopColor={base} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor={light} stopOpacity=".55" />
          <stop offset="1" stopColor={light} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Radiant: a halo of rays behind everything */}
      {index === 8 && (
        <g>
          <circle cx="50" cy="50" r="50" fill={`url(#${id}-glow)`} />
          {Array.from({ length: 16 }, (_, i) => (
            <polygon
              key={i}
              points="48.6,50 50,0 51.4,50"
              fill={i % 2 ? base : light}
              opacity={i % 2 ? 0.45 : 0.7}
              transform={`rotate(${i * 22.5} 50 50)`}
            />
          ))}
        </g>
      )}

      {/* Ascendant and above: swept wings */}
      {index >= 6 &&
        side(
          wing.map((p, i) => (
            <polygon
              key={p}
              points={p}
              fill={[light, base, dark][i]}
              stroke={dark}
              strokeWidth=".6"
              strokeLinejoin="round"
            />
          )),
        )}

      {/* Platinum and Diamond: side blades */}
      {index >= 4 &&
        index < 6 &&
        side(
          <>
            <polygon points={blade.upper} fill={light} />
            <polygon points={blade.lower} fill={base} />
          </>,
        )}

      {/* Gold and above: top finial; Immortal and above: a crown instead */}
      {index >= 7 ? (
        <>
          <polygon points="37,24 34,6 43,14 50,1 57,14 66,6 63,24" fill={base} stroke={dark} strokeWidth=".6" strokeLinejoin="round" />
          <polygon points="50,1 57,14 50,22 43,14" fill={light} />
        </>
      ) : (
        index >= 3 && (
          <>
            <polygon points="50,2 56,10 50,18 44,10" fill={base} />
            <polygon points="50,2 56,10 50,10 44,10" fill={light} />
          </>
        )
      )}

      {/* Diamond and above: bottom finial */}
      {index >= 5 && (
        <>
          <polygon points="50,98 56,90 50,82 44,90" fill={dark} />
          <polygon points="50,98 56,90 50,90 44,90" fill={base} />
        </>
      )}

      {/* The stone: six bevel facets around a flat table */}
      {outer.map((point, i) => {
        const next = (i + 1) % 6;
        const facet = points([point, outer[next], inner[next], inner[i]]);
        const shade = facetLight[i];
        return (
          <g key={i}>
            <polygon points={facet} fill={base} />
            <polygon points={facet} fill={shade > 0 ? '#fff' : '#000'} opacity={Math.abs(shade)} />
          </g>
        );
      })}
      <polygon points={points(inner)} fill={`url(#${id}-table)`} />
      <polygon
        points={points(outer)}
        fill="none"
        stroke={dark}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon points={points(inner)} fill="none" stroke={light} strokeWidth=".8" opacity=".55" />

      {/* Mark and tier pips */}
      <path d={star(50, tier ? 46 : 50, index >= 6 ? 10 : 8.5)} fill={light} />
      {Array.from({ length: tier }, (_, i) => {
        const x = 50 + (i - (tier - 1) / 2) * 7;
        return <polygon key={i} points={`${x},59 ${x + 2.6},62 ${x},65 ${x - 2.6},62`} fill={light} />;
      })}
    </svg>
  );
}
