import type { Division } from './events';
import type { CompetitiveRating } from './competitive-rating';

export type StudentCard = {
  id: string;
  name: string;
  schoolId: string;
  community: string;
  division: Division;
  points: number;
  tests: number;
  accuracy: number | null;
  rank: Omit<CompetitiveRating, 'history' | 'mmr'>;
};
export type StudentDirectory = {
  students: StudentCard[];
  total: number;
  schools: { id: string; name: string }[];
};
export type StudentRankedProfile = StudentCard & {
  peak: string;
  passRate: number | null;
  best: number | null;
  recentChange: number | null;
  events: { name: string; tests: number; points: number; accuracy: number }[];
  history: {
    id: string;
    event: string;
    points: number;
    date: string;
    delta: number;
    placement: boolean;
    rating: number;
  }[];
};
