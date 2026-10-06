export type Division = 'A' | 'B' | 'C';
export type EventCategory =
  'Life science' | 'Earth & space' | 'Physics & chemistry' | 'Engineering' | 'Scientific inquiry';
export type ScienceEvent = {
  id: string;
  name: string;
  category: EventCategory;
  type: 'Study' | 'Build' | 'Lab';
};
const groups: Record<'B' | 'C', Record<EventCategory, string[]>> = {
  B: {
    'Life science': [
      'Anatomy and Physiology',
      'Botany',
      'Disease Detectives',
      'Heredity',
      'Water Quality',
    ],
    'Earth & space': [
      'Dynamic Planet',
      'Meteorology',
      'Remote Sensing',
      'Rocks and Minerals',
      'Solar System',
    ],
    'Physics & chemistry': [
      'Circuit Lab',
      'Crime Busters',
      'Food Science',
      'Hovercraft',
      'Thermodynamics',
    ],
    Engineering: ['Boomilever', 'Elastic Launched Gliders', 'Roller Coaster', 'Scrambler'],
    'Scientific inquiry': [
      'Codebusters',
      'Experimental Design',
      'Ping-Pong Parachute',
      'Write It Do It',
    ],
  },
  C: {
    'Life science': [
      'Anatomy and Physiology',
      'Botany',
      'Designer Genes',
      'Disease Detectives',
      'Water Quality',
    ],
    'Earth & space': ['Astronomy', 'Dynamic Planet', 'Remote Sensing', 'Rocks and Minerals'],
    'Physics & chemistry': [
      'Chemistry Lab',
      'Circuit Lab',
      'Forensics',
      'Hovercraft',
      'Protein Modeling',
      'Thermodynamics',
    ],
    Engineering: ['Boomilever', 'Electric Vehicle', 'Mission Possible', 'Wright Stuff'],
    'Scientific inquiry': [
      'Codebusters',
      'Engineering CAD',
      'Experimental Design',
      'Ping Pong Parachute',
    ],
  },
};
const buildEvents = new Set([
  'Boomilever',
  'Elastic Launched Gliders',
  'Roller Coaster',
  'Scrambler',
  'Electric Vehicle',
  'Mission Possible',
  'Wright Stuff',
  'Hovercraft',
  'Ping-Pong Parachute',
  'Ping Pong Parachute',
]);
const labEvents = new Set([
  'Chemistry Lab',
  'Crime Busters',
  'Food Science',
  'Forensics',
  'Experimental Design',
  'Circuit Lab',
]);
export const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export function eventsForDivision(division: Division): ScienceEvent[] {
  if (division === 'A') return [];
  return Object.entries(groups[division]).flatMap(([category, names]) =>
    names.map((name) => ({
      id: slug(name),
      name,
      category: category as EventCategory,
      type: buildEvents.has(name)
        ? ('Build' as const)
        : labEvents.has(name)
          ? ('Lab' as const)
          : ('Study' as const),
    })),
  );
}
export const tools = [
  {
    id: 'lessons',
    name: 'Lessons',
    description: 'Build understanding, one concept at a time.',
    icon: 'book',
  },
  {
    id: 'practice-tests',
    name: 'Practice tests',
    description: 'Find your rhythm. Make room for mistakes.',
    icon: 'file',
  },
  {
    id: 'ranked-tests',
    name: 'Ranked tests',
    description: 'Put your learning to the test and earn points.',
    icon: 'trophy',
  },
  {
    id: 'question-bank',
    name: 'Question bank',
    description: 'Focus on the concepts you want to strengthen.',
    icon: 'layers',
  },
  {
    id: 'vocab-rush',
    name: 'Vocab rush',
    description: 'Get familiar with the language of your event.',
    icon: 'bolt',
  },
  {
    id: 'binder-generator',
    name: 'Notes & binder',
    description: 'Give your knowledge a place to come together.',
    icon: 'folder',
  },
  {
    id: 'cheatsheet-generator',
    name: 'Cheatsheet',
    description: 'Keep the key ideas close at hand.',
    icon: 'file',
  },
] as const;
