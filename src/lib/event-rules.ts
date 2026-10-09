import eventRulePages from './event-rule-pages.json' with { type: 'json' };
import type { Division, EventToolId, ScienceEvent } from './events';

export type RulesInfo = {
  division: Division;
  pageRange: [number, number];
  sectionUrl: string;
  sourceUrl: string;
};

const pageRanges: Record<Division, Record<string, number[]>> = eventRulePages;

const testEvents: Record<Division, Set<string>> = {
  A: new Set([
    'a-matter-of-matter',
    'chew-the-fat',
    'crave-the-wave',
    'crimebusters',
    'deep-blue-sea',
    'fast-facts',
    'metric-mastery',
    'rock-hound',
    'weather-permitting',
    'professor-jensens-potions',
  ]),
  B: new Set([
    'anatomy-and-physiology',
    'botany',
    'circuit-lab',
    'codebusters',
    'crime-busters',
    'disease-detectives',
    'dynamic-planet',
    'experimental-design',
    'food-science',
    'heredity',
    'meteorology',
    'remote-sensing',
    'rocks-and-minerals',
    'solar-system',
    'thermodynamics',
    'water-quality',
  ]),
  C: new Set([
    'anatomy-and-physiology',
    'astronomy',
    'botany',
    'chemistry-lab',
    'circuit-lab',
    'codebusters',
    'designer-genes',
    'disease-detectives',
    'dynamic-planet',
    'experimental-design',
    'forensics',
    'protein-modeling',
    'remote-sensing',
    'rocks-and-minerals',
    'thermodynamics',
    'water-quality',
  ]),
};

const labEvents: Record<Division, Set<string>> = {
  A: new Set([
    'a-matter-of-matter',
    'chew-the-fat',
    'crave-the-wave',
    'crimebusters',
    'metric-mastery',
    'professor-jensens-potions',
  ]),
  B: new Set(['circuit-lab', 'crime-busters', 'experimental-design', 'food-science']),
  C: new Set(['chemistry-lab', 'circuit-lab', 'experimental-design', 'forensics', 'water-quality']),
};

const buildEvents: Record<Division, Set<string>> = {
  A: new Set([
    'aerodynamics',
    'mission-possible',
    'mystery-packaging',
    'tennis-ball-catapult',
    'shelby-jacobs-rocketry',
  ]),
  B: new Set([
    'boomilever',
    'elastic-launched-gliders',
    'hovercraft',
    'ping-pong-parachute',
    'roller-coaster',
    'scrambler',
    'thermodynamics',
  ]),
  C: new Set([
    'boomilever',
    'electric-vehicle',
    'hovercraft',
    'mission-possible',
    'ping-pong-parachute',
    'protein-modeling',
    'thermodynamics',
    'water-quality',
    'wright-stuff',
  ]),
};

const binderEvents: Record<Division, Set<string>> = {
  A: new Set([
    'a-matter-of-matter',
    'chew-the-fat',
    'crave-the-wave',
    'deep-blue-sea',
    'rock-hound',
    'weather-permitting',
    'professor-jensens-potions',
  ]),
  B: new Set([
    'circuit-lab',
    'dynamic-planet',
    'meteorology',
    'remote-sensing',
    'rocks-and-minerals',
    'thermodynamics',
  ]),
  C: new Set([
    'astronomy',
    'circuit-lab',
    'dynamic-planet',
    'remote-sensing',
    'rocks-and-minerals',
    'thermodynamics',
  ]),
};

const cheatsheetEvents: Record<Division, Set<string>> = {
  A: new Set(['crimebusters', 'progamers']),
  B: new Set([
    'anatomy-and-physiology',
    'botany',
    'crime-busters',
    'disease-detectives',
    'food-science',
    'heredity',
    'solar-system',
    'water-quality',
  ]),
  C: new Set([
    'anatomy-and-physiology',
    'botany',
    'chemistry-lab',
    'designer-genes',
    'disease-detectives',
    'forensics',
    'protein-modeling',
    'water-quality',
  ]),
};

const specialTools: Record<string, EventToolId[]> = {
  'A/experimental-design': ['lessons', 'lab-generator', 'rules'],
  'B/experimental-design': ['lessons', 'lab-generator', 'rules'],
  'C/experimental-design': ['lessons', 'lab-generator', 'rules'],
  'C/engineering-cad': ['lessons', 'cad-file-grader', 'rules'],
};

export function eventToolIds(division: Division, event: ScienceEvent): EventToolId[] {
  const key = `${division}/${event.id}`;
  if (specialTools[key]) return specialTools[key];
  const ids: EventToolId[] = ['lessons'];
  if (testEvents[division].has(event.id)) {
    // Temporarily hidden: 'question-bank', 'vocab-rush'
    ids.push('practice-tests', 'ranked-tests');
    if (binderEvents[division].has(event.id)) ids.push('binder-generator');
    else if (cheatsheetEvents[division].has(event.id)) ids.push('cheatsheet-generator');
  }
  if (labEvents[division].has(event.id)) ids.push('lab-practice');
  if (buildEvents[division].has(event.id)) ids.push('video-grader', 'course-generator');
  ids.push('rules');
  return ids;
}

export function rulesForEvent(division: Division, event: ScienceEvent): RulesInfo {
  const pageRange = pageRanges[division][event.id];
  if (!pageRange || pageRange.length !== 2) {
    throw new Error(`Missing rules pages for ${division}/${event.id}`);
  }
  return {
    division,
    pageRange: [pageRange[0], pageRange[1]],
    sectionUrl: `/rules/2027/${division.toLowerCase()}/${event.id}.pdf`,
    sourceUrl: `/rules/2027/division-${division.toLowerCase()}.pdf`,
  };
}
