/** Akoizo's transparent, test-based adaptation of competitive RR (not Riot's private MMR). */
export const RANK_NAMES = [
  'Iron',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Ascendant',
  'Immortal',
  'Radiant',
] as const;
export type RankName = (typeof RANK_NAMES)[number];
export const PLACEMENT_TESTS = 5;
export const PASS_POINTS = 60;
export const RADIANT_RR = 450;
export type RatingTest = {
  id: string;
  points: number;
  completedAt: string;
  /** Mean normalized score on this paper, across released, fully graded attempts. */
  paperAverage: number;
};
export type RatingHistory = RatingTest & { delta: number; rating: number; placement: boolean };
export type CompetitiveRating = {
  name: RankName | 'Unranked';
  tier: number | null;
  rr: number;
  rating: number;
  mmr: number;
  shields: number;
  placements: number;
  history: RatingHistory[];
  leaderboardPosition: number | null;
};
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function rankLabel(rank: Pick<CompetitiveRating, 'name' | 'tier'>) {
  return `${rank.name}${rank.tier ? ` ${rank.tier}` : ''}`;
}

export function calculateRating(tests: RatingTest[]): CompetitiveRating {
  const ordered = [...tests].sort(
    (a, b) => a.completedAt.localeCompare(b.completedAt) || a.id.localeCompare(b.id),
  );
  let division = 0,
    rr = 0,
    mmr = 1050,
    shields = 0;
  const history: RatingHistory[] = [];
  for (const [i, test] of ordered.entries()) {
    const points = clamp(test.points, 0, 100);
    // A harder paper gives a modest skill adjustment, bounded to avoid small-cohort swings.
    const adjusted = clamp(points + clamp(60 - test.paperAverage, -10, 10), 0, 100);
    mmr =
      i < PLACEMENT_TESTS ? (mmr * i + adjusted * 21) / (i + 1) : mmr * 0.85 + adjusted * 21 * 0.15;
    const before = division * 100 + rr;
    if (i < PLACEMENT_TESTS) {
      if (i === PLACEMENT_TESTS - 1) {
        division = clamp(Math.floor(mmr / 100), 0, 20);
        rr = 50;
        shields = division % 3 === 0 ? 2 : 0;
      }
      history.push({ ...test, points, delta: 0, rating: division * 100 + rr, placement: true });
      continue;
    }
    const win = points >= PASS_POINTS;
    const convergence = division < 21 ? clamp((mmr - before) / 100, -8, 8) : 0;
    const margin = win ? (points - PASS_POINTS) / 4 : (PASS_POINTS - points) / 4;
    const change = win
      ? Math.round(clamp(20 + margin + convergence, 10, 40))
      : -Math.round(clamp(20 + margin - convergence, 10, 35));
    if (division === 21) {
      if (!win && rr === 0) {
        division = 20;
        rr = Math.max(70, 100 + change);
        shields = 0;
      } else rr = Math.max(0, rr + change);
    } else if (win && rr + change >= 100) {
      division++;
      rr = Math.max(10, rr + change - 100);
      if (division === 21) rr = 10;
      shields = division % 3 === 0 && division < 21 ? 2 : 0;
    } else if (!win && rr === 0 && division > 0) {
      if (division % 3 === 0 && shields > 0) shields--;
      else {
        division--;
        rr = Math.max(70, 100 + change);
        shields = division % 3 === 0 ? 2 : 0;
      }
    } else rr = Math.max(0, rr + change);
    history.push({
      ...test,
      points,
      delta: division * 100 + rr - before,
      rating: division * 100 + rr,
      placement: false,
    });
  }
  const placed = ordered.length >= PLACEMENT_TESTS;
  return {
    name: !placed ? 'Unranked' : division < 21 ? RANK_NAMES[Math.floor(division / 3)] : 'Immortal',
    tier: !placed ? null : division < 21 ? (division % 3) + 1 : rr >= 200 ? 3 : rr >= 90 ? 2 : 1,
    rr,
    rating: placed ? division * 100 + rr : 0,
    mmr: Math.round(mmr),
    shields,
    placements: Math.min(PLACEMENT_TESTS, ordered.length),
    history,
    leaderboardPosition: null,
  };
}

/** Global Akoizo ladder uses NA high-rank thresholds. Inactivity removes eligibility, not RR. */
export function applyLeaderboard<T extends { id: string; rank: CompetitiveRating }>(
  students: T[],
  now = Date.now(),
): T[] {
  const eligible = students
    .filter(
      ({ rank }) =>
        rank.name === 'Immortal' &&
        now - Date.parse(rank.history.at(-1)?.completedAt ?? '') <= 7 * 86400000,
    )
    .sort((a, b) => b.rank.rating - a.rank.rating || a.id.localeCompare(b.id));
  const positions = new Map(eligible.map((s, i) => [s.id, i + 1]));
  return students.map((s) => {
    const position = positions.get(s.id) ?? null;
    const radiant = position !== null && position <= 500 && s.rank.rr >= RADIANT_RR;
    return {
      ...s,
      rank: {
        ...s.rank,
        name: radiant ? 'Radiant' : s.rank.name,
        tier: radiant ? null : s.rank.tier,
        leaderboardPosition: position,
      },
    };
  });
}
