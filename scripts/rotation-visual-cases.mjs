import { visualScience } from './rotation-visual-science.mjs';
import { visualEarthSpace } from './rotation-visual-earth-space.mjs';
import { visualLifeLab } from './rotation-visual-life-lab.mjs';
import { visualCiphers } from './rotation-visual-ciphers.mjs';

export function sectionFor(event, division, index, visual = false) {
  if (event === 'water-quality')
    return ['ecology', 'organisms', 'monitoring', 'salinometer'][
      visual ? Math.floor(index / 3) : index < 6 ? 0 : index < 12 ? 1 : index < 18 ? 2 : 3
    ];
  if (event === 'chemistry-lab') return index < (visual ? 6 : 10) ? 'gases' : 'kinetics';
  if (event === 'remote-sensing')
    return division === 'B'
      ? index < (visual ? 4 : 6)
        ? 'concepts'
        : 'interpretation'
      : ['instrumentation', 'interpretation', 'climate', 'energy'][
          visual ? Math.floor(index / 3) : index < 5 ? 0 : index < 12 ? 1 : index < 16 ? 2 : 3
        ];
  return 'event-core';
}
export function visualCases(test, f) {
  const result =
    visualScience(test, f) ??
    visualEarthSpace(test, f) ??
    visualLifeLab(test, f) ??
    visualCiphers(test, f);
  if (!result || result.entries.length !== 12)
    throw Error(`Missing visual content: ${test.division}/${test.eventId}`);
  result.entries.forEach((entry, i) => {
    entry.section = sectionFor(test.eventId, test.division, i, true);
    if (test.eventId === 'water-quality') entry.points = i < 9 ? 4 : [2, 1, 1][i - 9];
    if (test.eventId === 'remote-sensing' && test.division === 'C')
      entry.points = [4, 3, 3, 5, 5, 4, 3, 3, 2, 3, 3, 2][i];
  });
  return result;
}
