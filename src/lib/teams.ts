import type { Division } from './events';

/**
 * The division instructor pages open on: the one most of the roster competes in. An empty roster
 * falls back to the community's level: high schools compete in C, middle schools in B.
 */
export function rosterDivision(
  students: { division: Division | null | undefined }[],
  communityName?: string | null,
): Division {
  const common = (['C', 'B', 'A'] as const)
    .map((division) => ({ division, n: students.filter((s) => s.division === division).length }))
    .sort((a, b) => b.n - a.n)[0];
  if (common.n) return common.division;
  return /middle school/i.test(communityName ?? '') ? 'B' : 'C';
}

export type TeamSheet = {
  id: string;
  name: string;
  division: Division;
  /** Event id → partner seats in order. Empty seats are null. */
  slots: Record<string, (string | null)[]>;
};

// Science Olympiad allows up to 15 students on a team.
export const TEAM_SIZE = 15;
const trios = new Set(['codebusters', 'experimental-design']);
/** Most events seat two partners; Codebusters and Experimental Design seat three. */
export const partnerLimit = (eventId: string) => (trios.has(eventId) ? 3 : 2);
