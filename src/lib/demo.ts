import type { Division } from './events';
export type Member = {
  id: string;
  name: string;
  handle: string;
  school: string;
  division: Division;
  points: number;
  lessons: number;
  practice: number;
  ranked: number;
  event: string;
};
export const members: Member[] = [
  {
    id: 's1',
    name: 'Alex Morgan',
    handle: 'orbitmoth',
    school: 'Cedar Academy',
    division: 'C',
    points: 2840,
    lessons: 72,
    practice: 14,
    ranked: 8,
    event: 'Astronomy',
  },
  {
    id: 's2',
    name: 'Jordan Lee',
    handle: 'quarkling',
    school: 'Northstar High',
    division: 'C',
    points: 2610,
    lessons: 64,
    practice: 12,
    ranked: 7,
    event: 'Chemistry Lab',
  },
  {
    id: 's3',
    name: 'Sam Rivera',
    handle: 'iontrail',
    school: 'Willow High',
    division: 'C',
    points: 2490,
    lessons: 61,
    practice: 11,
    ranked: 7,
    event: 'Astronomy',
  },
  {
    id: 's4',
    name: 'Riley Chen',
    handle: 'novanotes',
    school: 'Cedar Academy',
    division: 'C',
    points: 2320,
    lessons: 58,
    practice: 10,
    ranked: 6,
    event: 'Codebusters',
  },
  {
    id: 's5',
    name: 'Charlie Davis',
    handle: 'protonpath',
    school: 'Summit School',
    division: 'C',
    points: 2180,
    lessons: 56,
    practice: 9,
    ranked: 6,
    event: 'Circuit Lab',
  },
  {
    id: 's6',
    name: 'Jamie Park',
    handle: 'lumenlab',
    school: 'Northstar High',
    division: 'C',
    points: 2040,
    lessons: 51,
    practice: 8,
    ranked: 5,
    event: 'Astronomy',
  },
  {
    id: 's7',
    name: 'Taylor Brooks',
    handle: 'solarscribe',
    school: 'Willow High',
    division: 'C',
    points: 1910,
    lessons: 44,
    practice: 8,
    ranked: 4,
    event: 'Botany',
  },
  {
    id: 's8',
    name: 'Drew Patel',
    handle: 'mossbyte',
    school: 'Cedar Academy',
    division: 'B',
    points: 1860,
    lessons: 43,
    practice: 7,
    ranked: 5,
    event: 'Solar System',
  },
  {
    id: 's9',
    name: 'Casey Kim',
    handle: 'cloudatlas',
    school: 'Northstar Middle',
    division: 'B',
    points: 1740,
    lessons: 40,
    practice: 6,
    ranked: 4,
    event: 'Meteorology',
  },
  {
    id: 's10',
    name: 'Quinn Bell',
    handle: 'petriwave',
    school: 'Willow Middle',
    division: 'B',
    points: 1620,
    lessons: 38,
    practice: 6,
    ranked: 4,
    event: 'Crime Busters',
  },
  {
    id: 's11',
    name: 'Sky Reed',
    handle: 'tinycosmos',
    school: 'Cedar Academy',
    division: 'A',
    points: 980,
    lessons: 24,
    practice: 4,
    ranked: 2,
    event: 'Local events',
  },
  {
    id: 's12',
    name: 'Rowan Gray',
    handle: 'littlecomet',
    school: 'Summit Elementary',
    division: 'A',
    points: 860,
    lessons: 20,
    practice: 3,
    ranked: 2,
    event: 'Local events',
  },
];
export type RankingFilters = { division: 'All' | Division; query: string; school?: string };
export function filterRankings(data: Member[], filters: RankingFilters) {
  const ranked = data
    .filter(
      (m) =>
        (filters.division === 'All' || m.division === filters.division) &&
        (!filters.school || m.school === filters.school),
    )
    .sort((a, b) => b.points - a.points || a.handle.localeCompare(b.handle))
    .map((m, i) => ({ ...m, rank: i + 1 }));
  const q = filters.query.trim().toLowerCase();
  return ranked.filter((m) => `${m.handle} ${m.school}`.toLowerCase().includes(q));
}
export type Assignment = {
  id: string;
  studentId: string;
  division: Division;
  eventId: string;
  eventName: string;
  type: 'Practice' | 'Ranked';
  due: string;
};
export function validateAssignment(
  student: Member,
  eventIds: string[],
  eventId: string,
  due: string,
  today: string,
) {
  if (student.division === 'A')
    return 'Your school’s Division A event list needs to be configured first.';
  if (!eventIds.includes(eventId)) return 'Choose an event from this student’s division.';
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(due) ||
    Number.isNaN(Date.parse(due)) ||
    new Date(due).toISOString().slice(0, 10) !== due
  )
    return 'Choose a valid due date.';
  if (due < today) return 'The due date must be today or later.';
  return null;
}
