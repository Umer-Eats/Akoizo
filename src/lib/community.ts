import type { Role } from './domain';
import type { Division } from './events';
import type { SchoolAnalytics } from './analytics';

export type CommunityData = {
  name: string;
  analytics: SchoolAnalytics;
  members: { id: string; name: string; role: Role; division: Division | null }[];
  updatedAt: string;
};
