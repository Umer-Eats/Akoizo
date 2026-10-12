import type { Division } from './events';

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
