export type Division = 'A' | 'B' | 'C';
export type EventCategory =
  'Life science' | 'Earth & space' | 'Physics & chemistry' | 'Engineering' | 'Scientific inquiry';
export type ScienceEvent = {
  id: string;
  name: string;
  category: EventCategory;
  type: 'Study' | 'Build' | 'Lab' | 'Skill';
  special?: boolean;
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
  if (division === 'A') return elementaryEvents;
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
    name: 'Practice question bank',
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
    name: 'Notes / binder generator',
    description: 'Give your knowledge a place to come together.',
    icon: 'folder',
  },
  {
    id: 'cheatsheet-generator',
    name: 'Cheatsheet generator',
    description: 'Keep the key ideas close at hand.',
    icon: 'file',
  },
] as const;

// User-supplied 2027 Florida Elementary Science Olympiad manual, reviewed October 6, 2026.
export const elementaryManualUrl =
  'https://docs.google.com/document/d/1gji19ZeWW5H_yfTI2mwR4Rboskdwyv27N6BfrShAjR8/edit?tab=t.0';
const elementaryEvents: ScienceEvent[] = [
  { id: 'aerodynamics', name: 'Aerodynamics', category: 'Engineering', type: 'Build' },
  {
    id: 'a-matter-of-matter',
    name: 'A Matter of Matter',
    category: 'Physics & chemistry',
    type: 'Lab',
  },
  { id: 'chew-the-fat', name: 'Chew the Fat', category: 'Life science', type: 'Study' },
  { id: 'crave-the-wave', name: 'Crave the Wave', category: 'Physics & chemistry', type: 'Study' },
  { id: 'crimebusters', name: 'Crimebusters', category: 'Physics & chemistry', type: 'Lab' },
  { id: 'deep-blue-sea', name: 'Deep Blue Sea', category: 'Life science', type: 'Study' },
  { id: 'fast-facts', name: 'Fast Facts', category: 'Scientific inquiry', type: 'Study' },
  { id: 'metric-mastery', name: 'Metric Mastery', category: 'Scientific inquiry', type: 'Lab' },
  { id: 'mission-possible', name: 'Mission Possible', category: 'Engineering', type: 'Build' },
  { id: 'mystery-packaging', name: 'Mystery Packaging', category: 'Engineering', type: 'Build' },
  { id: 'progamers', name: 'ProGamers', category: 'Scientific inquiry', type: 'Skill' },
  { id: 'rock-hound', name: 'Rock Hound', category: 'Earth & space', type: 'Study' },
  {
    id: 'tennis-ball-catapult',
    name: 'Tennis Ball Catapult',
    category: 'Engineering',
    type: 'Build',
  },
  {
    id: 'weather-permitting',
    name: 'Weather Permitting',
    category: 'Earth & space',
    type: 'Study',
  },
  { id: 'write-it-do-it', name: 'Write It, Do It', category: 'Scientific inquiry', type: 'Skill' },
  {
    id: 'shelby-jacobs-rocketry',
    name: 'Shelby Jacobs Rocketry',
    category: 'Engineering',
    type: 'Build',
    special: true,
  },
  {
    id: 'professor-jensens-potions',
    name: 'Professor Jensen’s Potions',
    category: 'Physics & chemistry',
    type: 'Lab',
    special: true,
  },
];
export const eventFocus: Record<ScienceEvent['type'], { title: string; description: string }> = {
  Study: {
    title: 'Concepts & recall',
    description: 'Learn the science, strengthen your recall, and practice applying concepts.',
  },
  Build: {
    title: 'Design & engineering',
    description:
      'Prepare with design principles, build planning, testing, and engineering vocabulary.',
  },
  Lab: {
    title: 'Investigation & analysis',
    description: 'Prepare with procedures, observations, measurements, and data interpretation.',
  },
  Skill: {
    title: 'Skills & problem solving',
    description: 'Develop your process through communication, programming, and timed challenges.',
  },
};
