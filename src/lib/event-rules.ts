import type { Division, EventToolId, ScienceEvent } from './events';

export type RulesInfo = {
  division: Division;
  pageRange: [number, number];
  summary: string;
  resources: string;
  sourceUrl: string;
};

const sources: Record<Division, string> = {
  A: 'https://docs.google.com/document/d/1gji19ZeWW5H_yfTI2mwR4Rboskdwyv27N6BfrShAjR8/preview',
  B: 'https://www.soinc.org/sites/default/files/uploaded_files/Science_Olympiad_Div_B_Rules_2027.pdf',
  C: 'https://www.soinc.org/sites/default/files/uploaded_files/Science_Olympiad_Div_C_Rules_2027.pdf',
};

const pageRanges: Record<Division, Record<string, [number, number]>> = {
  A: {
    aerodynamics: [8, 11], 'a-matter-of-matter': [12, 13], 'chew-the-fat': [14, 15],
    'crave-the-wave': [16, 17], crimebusters: [18, 23], 'deep-blue-sea': [24, 25],
    'fast-facts': [26, 27], 'metric-mastery': [28, 29], 'mission-possible': [30, 32],
    'mystery-packaging': [33, 35], progamers: [36, 36], 'rock-hound': [37, 38],
    'tennis-ball-catapult': [39, 42], 'weather-permitting': [43, 44],
    'write-it-do-it': [45, 45], 'shelby-jacobs-rocketry': [46, 49],
    'professor-jensens-potions': [50, 52],
  },
  B: {
    'anatomy-and-physiology': [8, 9], boomilever: [10, 15], botany: [16, 16],
    'circuit-lab': [17, 18], codebusters: [19, 20], 'crime-busters': [21, 22],
    'disease-detectives': [23, 24], 'dynamic-planet': [25, 26],
    'elastic-launched-gliders': [27, 29], 'experimental-design': [30, 31],
    'food-science': [32, 33], heredity: [34, 35], hovercraft: [36, 39],
    meteorology: [40, 41], 'ping-pong-parachute': [42, 43], 'remote-sensing': [44, 45],
    'rocks-and-minerals': [46, 50], 'roller-coaster': [51, 53], scrambler: [54, 59],
    'solar-system': [60, 60], thermodynamics: [61, 63], 'water-quality': [64, 65],
    'write-it-do-it': [66, 67],
  },
  C: {
    'anatomy-and-physiology': [8, 10], astronomy: [11, 11], boomilever: [12, 17],
    botany: [18, 18], 'chemistry-lab': [19, 20], 'circuit-lab': [21, 22],
    codebusters: [23, 24], 'designer-genes': [25, 26], 'disease-detectives': [27, 28],
    'dynamic-planet': [29, 30], 'electric-vehicle': [31, 36], 'engineering-cad': [37, 37],
    'experimental-design': [38, 39], forensics: [40, 41], hovercraft: [42, 45],
    'mission-possible': [46, 50], 'ping-pong-parachute': [51, 52],
    'protein-modeling': [53, 54], 'remote-sensing': [55, 56], 'rocks-and-minerals': [57, 61],
    thermodynamics: [62, 64], 'water-quality': [65, 66], 'wright-stuff': [67, 69],
  },
};

const summaries: Record<string, string> = {
  'A/aerodynamics': 'On-site paper-airplane build with duration and target-accuracy flights. Teams submit a practice data log and use only the provided construction materials.',
  'A/a-matter-of-matter': 'Station-based properties-of-matter questions and experiments. A bound research binder and safety goggles are permitted.',
  'A/chew-the-fat': 'Station-based digestive-system and nutrition event with food-component tests. A bound research binder is permitted.',
  'A/crave-the-wave': 'Hands-on and written wave-motion event covering wave characteristics, types, seismic waves, light, sound, and the electromagnetic spectrum. A bound binder is permitted.',
  'A/crimebusters': 'Crime-solving lab using powder identification, fingerprints, and paper chromatography. Teams bring a powder-properties chart and full lab safety equipment.',
  'A/deep-blue-sea': 'Station or timed-slide assessment of Florida freshwater and Intracoastal flora, fauna, habitats, diets, life cycles, and water quality. A bound binder is permitted.',
  'A/fast-facts': 'Timed scientific-process and scientist vocabulary grid. Teams bring writing utensils only.',
  'A/metric-mastery': 'Estimate, measure, compare, and convert metric quantities at stations using measurement tools and a calculator.',
  'A/mission-possible': 'Pre-built and impounded Rube Goldberg device with action transfers, energy forms, a timed task, safety requirements, and an action-sequence list.',
  'A/mystery-packaging': 'On-site build using supplied materials to protect a target from a drop. Teams return to test the package later in the tournament.',
  'A/progamers': 'Timed Scratch challenge: recreate a displayed game. Teams may bring writing utensils and one page of notes.',
  'A/rock-hound': 'Station-based identification and knowledge of Florida rocks, minerals, and natural resources. A bound binder is permitted.',
  'A/tennis-ball-catapult': 'Pre-built, impounded, free-standing launcher calibrated to lob a tennis ball at a target. Impact-resistant goggles are required.',
  'A/weather-permitting': 'Binder-supported weather investigation event emphasizing data, maps, tools, and scientific process skills.',
  'A/write-it-do-it': 'Communication and construction challenge: one participant describes an object and the other builds it from the description.',
  'A/shelby-jacobs-rocketry': 'Special event: pre-built air-and-water bottle rocket scored by time aloft at the First Coast tournament.',
  'A/professor-jensens-potions': 'Special event: lab-safety, reactions, toxins, and antidotes at stations. It runs at the Central Florida tournament and requires goggles.',
};

const testEvents: Record<Division, Set<string>> = {
  A: new Set(['a-matter-of-matter', 'chew-the-fat', 'crave-the-wave', 'crimebusters', 'deep-blue-sea', 'fast-facts', 'metric-mastery', 'rock-hound', 'weather-permitting', 'professor-jensens-potions']),
  B: new Set(['anatomy-and-physiology', 'botany', 'circuit-lab', 'codebusters', 'crime-busters', 'disease-detectives', 'dynamic-planet', 'experimental-design', 'food-science', 'heredity', 'meteorology', 'remote-sensing', 'rocks-and-minerals', 'solar-system', 'thermodynamics', 'water-quality']),
  C: new Set(['anatomy-and-physiology', 'astronomy', 'botany', 'chemistry-lab', 'circuit-lab', 'codebusters', 'designer-genes', 'disease-detectives', 'dynamic-planet', 'experimental-design', 'forensics', 'protein-modeling', 'remote-sensing', 'rocks-and-minerals', 'thermodynamics', 'water-quality']),
};

const labEvents: Record<Division, Set<string>> = {
  A: new Set(['a-matter-of-matter', 'chew-the-fat', 'crave-the-wave', 'crimebusters', 'metric-mastery', 'professor-jensens-potions']),
  B: new Set(['circuit-lab', 'crime-busters', 'experimental-design', 'food-science']),
  C: new Set(['chemistry-lab', 'circuit-lab', 'experimental-design', 'forensics', 'water-quality']),
};

const buildEvents: Record<Division, Set<string>> = {
  A: new Set(['aerodynamics', 'mission-possible', 'mystery-packaging', 'tennis-ball-catapult', 'shelby-jacobs-rocketry']),
  B: new Set(['boomilever', 'elastic-launched-gliders', 'hovercraft', 'ping-pong-parachute', 'roller-coaster', 'scrambler', 'thermodynamics']),
  C: new Set(['boomilever', 'electric-vehicle', 'hovercraft', 'mission-possible', 'ping-pong-parachute', 'protein-modeling', 'thermodynamics', 'water-quality', 'wright-stuff']),
};

const binderEvents: Record<Division, Set<string>> = {
  A: new Set(['a-matter-of-matter', 'chew-the-fat', 'crave-the-wave', 'deep-blue-sea', 'rock-hound', 'weather-permitting', 'professor-jensens-potions']),
  B: new Set(['circuit-lab', 'dynamic-planet', 'meteorology', 'remote-sensing', 'rocks-and-minerals', 'thermodynamics']),
  C: new Set(['astronomy', 'circuit-lab', 'dynamic-planet', 'remote-sensing', 'rocks-and-minerals', 'thermodynamics']),
};

const cheatsheetEvents: Record<Division, Set<string>> = {
  A: new Set(['crimebusters', 'progamers']),
  B: new Set(['anatomy-and-physiology', 'botany', 'crime-busters', 'disease-detectives', 'food-science', 'heredity', 'solar-system', 'water-quality']),
  C: new Set(['anatomy-and-physiology', 'botany', 'chemistry-lab', 'designer-genes', 'disease-detectives', 'forensics', 'protein-modeling', 'water-quality']),
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
    ids.push('practice-tests', 'ranked-tests', 'question-bank', 'vocab-rush');
    if (binderEvents[division].has(event.id)) ids.push('binder-generator');
    else if (cheatsheetEvents[division].has(event.id)) ids.push('cheatsheet-generator');
  }
  if (labEvents[division].has(event.id)) ids.push('lab-practice');
  if (buildEvents[division].has(event.id)) ids.push('video-grader', 'course-generator');
  ids.push('rules');
  return ids;
}

export function rulesForEvent(division: Division, event: ScienceEvent): RulesInfo {
  const pageRange = pageRanges[division][event.id] || [1, 1];
  const hasTest = testEvents[division].has(event.id);
  const hasBuild = buildEvents[division].has(event.id);
  const hasLab = labEvents[division].has(event.id);
  const format = hasBuild && hasTest
    ? 'This event combines a scored test with a student-built device or model.'
    : hasBuild
      ? 'This event is centered on a student-built device, model, or performance build.'
      : hasLab
        ? 'This event uses hands-on investigation, observations, measurements, or lab-practical work.'
        : hasTest
          ? 'This event is assessed through a written exam, stations, or both, with event-specific reference rules.'
          : 'This event is assessed through a timed performance or communication challenge.';
  return {
    division,
    pageRange,
    summary: summaries[`${division}/${event.id}`] || `${event.name}. ${format}`,
    resources: binderEvents[division].has(event.id)
      ? 'The rules permit a bound binder or printed notes. Use the generator to organize permitted references, then verify the final materials against the tournament rules.'
      : cheatsheetEvents[division].has(event.id)
        ? 'The rules permit a limited reference sheet or event-specific chart. Use the generator as a drafting aid and verify page size, labels, and annotations before competition.'
        : 'The rules do not list a general reference binder for this event. Study materials here are for preparation and may not be taken into competition unless the rules allow them.',
    sourceUrl: sources[division],
  };
}
