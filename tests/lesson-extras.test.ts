import test from 'node:test';
import assert from 'node:assert/strict';
import { eventExtras, lessonExtras, topicLabs } from '../src/lib/extras/index.ts';
import {
  clampValues,
  labDefaults,
  runLab,
  type LabValues,
  type TopicLab,
} from '../src/lib/topic-lab-kit.ts';
import { check, solutionSequence, stableShuffle, termRounds } from '../src/lib/lesson-extras.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { eventSlots } from '../src/lib/event-slots.ts';

// PhET HTML5 simulations whose embed URL returned HTTP 200 when the lessons were authored.
const verifiedPhet = new Set(
  `neuron membrane-transport gene-expression-essentials diffusion ph-scale ph-scale-basics natural-selection color-vision sound-waves density buoyancy buoyancy-basics molecule-polarity molecule-shapes molecule-shapes-basics beers-law-lab bending-light molecules-and-light projectile-motion build-a-molecule wave-interference waves-intro greenhouse-effect blackbody-spectrum geometric-optics geometric-optics-basics plinko-probability center-and-variability projectile-data-lab projectile-sampling-distributions mean-share-and-balance gravity-and-orbits my-solar-system keplers-laws gravity-force-lab gravity-force-lab-basics models-of-the-hydrogen-atom pendulum-lab masses-and-springs masses-and-springs-basics curve-fitting least-squares-regression acid-base-solutions molarity concentration balancing-chemical-equations reactants-products-and-leftovers gas-properties gases-intro states-of-matter states-of-matter-basics build-an-atom isotopes-and-atomic-mass rutherford-scattering atomic-interactions build-a-nucleus circuit-construction-kit-dc circuit-construction-kit-dc-virtual-lab circuit-construction-kit-ac circuit-construction-kit-ac-virtual-lab ohms-law resistance-in-a-wire capacitor-lab-basics charges-and-fields coulombs-law faradays-law faradays-electromagnetic-lab magnets-and-electromagnets generator balloons-and-static-electricity john-travoltage magnet-and-compass under-pressure energy-forms-and-changes friction energy-skate-park energy-skate-park-basics hookes-law wave-on-a-string fourier-making-waves vector-addition forces-and-motion-basics quantum-measurement collision-lab normal-modes quantum-coin-toss`.split(
    ' ',
  ),
);
const courses = eventSlots
  .flatMap((slot) => [...slot.events])
  .map((id) => lessonsForEvent(id, 'C'))
  .filter((course) => course !== null);

function assertFinite(lab: TopicLab, values: LabValues, context: string) {
  const result = runLab(lab, values);
  for (const [key, value] of Object.entries(result.o))
    assert(Number.isFinite(value), `${lab.id} o.${key} at ${context}`);
  for (const metric of result.metrics)
    assert(
      typeof metric.value === 'string' ? metric.value.length > 0 : Number.isFinite(metric.value),
      `${lab.id} metric "${metric.label}" at ${context}`,
    );
  assert.equal(
    new Set(result.metrics.map((m) => m.label)).size,
    result.metrics.length,
    `${lab.id} metric labels`,
  );
  for (const shape of result.scene ?? [])
    for (const [key, value] of Object.entries(shape)) {
      if (typeof value === 'number')
        assert(Number.isFinite(value), `${lab.id} ${shape.k}.${key} at ${context}`);
      if (typeof value === 'string')
        assert(!/NaN|Infinity|undefined/.test(value), `${lab.id} ${shape.k}.${key} at ${context}`);
    }
  if (result.plot) {
    const [x0, x1] = result.plot.x,
      [y0, y1] = result.plot.y;
    assert(x1 > x0 && y1 > y0, `${lab.id} plot range`);
    for (const curve of result.plot.curves)
      for (let i = 0; i <= 40; i++)
        assert(!Number.isNaN(curve.f(x0 + ((x1 - x0) * i) / 40)), `${lab.id} curve at ${context}`);
    for (const point of result.plot.points ?? [])
      assert(Number.isFinite(point.x) && Number.isFinite(point.y), `${lab.id} point at ${context}`);
  }
  for (const bar of result.bars?.items ?? [])
    assert(Number.isFinite(bar.value), `${lab.id} bar ${bar.label}`);
  assert(result.scene || result.plot || result.bars, `${lab.id} needs a visual`);
  return result;
}

test('every topic lab is finite across its control range and every goal is reachable but not pre-solved', () => {
  const labs = Object.values(topicLabs);
  assert.equal(
    labs.length,
    eventExtras.reduce((n, e) => n + e.labs.length, 0),
    'lab ids are unique',
  );
  // Report every faulty lab at once rather than stopping at the first.
  const problems: string[] = [];
  for (const lab of labs)
    try {
      assert(lab.title.length > 8 && lab.lead.length > 40 && lab.model.length > 60, lab.id);
      assert(lab.controls.length >= 1 && lab.controls.length <= 5, lab.id);
      assert.equal(new Set(lab.controls.map((c) => c.key)).size, lab.controls.length, lab.id);
      const defaults = labDefaults(lab);
      assert.deepEqual(
        clampValues(lab, defaults),
        defaults,
        `${lab.id} defaults lie inside their ranges`,
      );
      for (const c of lab.controls.filter((c) => !c.options && !c.toggle)) {
        assert(c.min! < c.max! && c.step! > 0, `${lab.id} ${c.key}`);
        const steps = (c.initial - c.min!) / c.step!;
        assert(
          Math.abs(steps - Math.round(steps)) < 1e-6,
          `${lab.id} ${c.key} initial is on a step`,
        );
      }
      const extremes = (pick: (c: TopicLab['controls'][number]) => number) =>
        Object.fromEntries(lab.controls.map((c) => [c.key, pick(c)]));
      const low = (c: TopicLab['controls'][number]) => (c.options || c.toggle ? 0 : c.min!),
        high = (c: TopicLab['controls'][number]) =>
          c.options ? c.options.length - 1 : c.toggle ? 1 : c.max!;
      assertFinite(lab, defaults, 'defaults');
      assertFinite(lab, extremes(low), 'all minimum');
      assertFinite(lab, extremes(high), 'all maximum');
      for (const c of lab.controls) {
        assertFinite(lab, { ...defaults, [c.key]: low(c) }, `${c.key} minimum`);
        assertFinite(lab, { ...defaults, [c.key]: high(c) }, `${c.key} maximum`);
        for (let i = 0; i < (c.options?.length ?? 0); i++)
          assertFinite(lab, { ...defaults, [c.key]: i }, `${c.key}=${i}`);
      }
      // Programmatic garbage is bounded exactly like slider input.
      assertFinite(
        lab,
        extremes(() => Number.NaN),
        'non-finite input',
      );
      assert(lab.missions.length >= 2 && lab.missions.length <= 4, lab.id);
      for (const mission of lab.missions) {
        assert(
          mission.goal.length > 25 && mission.hint.length > 15,
          `${lab.id} mission text: ${mission.goal} / ${mission.hint}`,
        );
        const start = runLab(lab, defaults);
        assert(
          !mission.done(start.o, defaults),
          `${lab.id}: "${mission.goal}" is already met at the defaults`,
        );
        const solved = clampValues(lab, { ...defaults, ...mission.at });
        for (const key of Object.keys(mission.at)) {
          assert(key in defaults, `${lab.id} solution key ${key}`);
          assert.equal(
            solved[key],
            mission.at[key],
            `${lab.id} solution ${key} is inside the control range`,
          );
          const c = lab.controls.find((item) => item.key === key)!;
          if (!c.options && !c.toggle) {
            const steps = (mission.at[key] - c.min!) / c.step!;
            assert(
              Math.abs(steps - Math.round(steps)) < 1e-6,
              `${lab.id} solution ${key} is reachable on the slider`,
            );
          }
        }
        assert(
          mission.done(runLab(lab, solved).o, solved),
          `${lab.id}: "${mission.goal}" is not reached by its recorded solution`,
        );
      }
      const { options, correct, q, why } = lab.predict;
      assert(
        options.length >= 3 && new Set(options).size === options.length && options[correct],
        lab.id,
      );
      assert(q.length > 30 && why.length > 50, `${lab.id} prediction`);
    } catch (error) {
      problems.push((error as Error).message);
    }
  assert.deepEqual(problems, []);
});

test('all sixteen Division C courses receive lesson-specific labs, activities, and checks', () => {
  assert.equal(courses.length, 16);
  assert.deepEqual(eventExtras.map((e) => e.eventId).sort(), courses.map((c) => c.eventId).sort());
  const labUse = new Map<string, string[]>();
  const sortTitles = new Set<string>(),
    checkPrompts = new Set<string>();
  let lessons = 0,
    phetPlacements = 0;
  for (const event of eventExtras) {
    const course = lessonsForEvent(event.eventId, 'C')!;
    assert.deepEqual(
      Object.keys(event.lessons).sort(),
      course.lessons.map((l) => l.id).sort(),
      event.eventId,
    );
    for (const lab of event.labs)
      assert(lab.id.startsWith(event.labs[0].id.split('-')[0] + '-'), `${lab.id} prefix`);
    for (const lesson of course.lessons) {
      lessons++;
      const extras = event.lessons[lesson.id];
      assert(
        (extras.labs?.length ?? 0) + (extras.phet?.length ?? 0) >= 1,
        `${lesson.id} needs a lesson-specific lab`,
      );
      for (const id of extras.labs ?? []) {
        assert(
          event.labs.some((lab) => lab.id === id),
          `${lesson.id} uses ${id} from another event`,
        );
        labUse.set(id, [...(labUse.get(id) ?? []), lesson.id]);
      }
      for (const embed of extras.phet ?? []) {
        phetPlacements++;
        assert(
          verifiedPhet.has(embed.sim),
          `${lesson.id}: ${embed.sim} is not a verified PhET HTML5 simulation`,
        );
        assert(embed.why.length > 60 && embed.tasks.length >= 2, `${lesson.id} ${embed.sim}`);
        for (const task of embed.tasks) assert(task.length > 40, `${lesson.id} ${embed.sim} task`);
      }
      assert.equal(
        new Set((extras.phet ?? []).map((e) => e.sim)).size,
        extras.phet?.length ?? 0,
        lesson.id,
      );
      const board = extras.sort;
      assert(board, `${lesson.id} needs a classification activity`);
      assert(
        board.bins.length >= 2 && board.bins.length <= 4 && board.items.length >= 5,
        lesson.id,
      );
      assert.equal(
        new Set(board.items.map(([text]) => text)).size,
        board.items.length,
        `${lesson.id} sort items`,
      );
      for (const [, bin] of board.items)
        assert(Number.isInteger(bin) && bin >= 0 && bin < board.bins.length, lesson.id);
      for (let bin = 0; bin < board.bins.length; bin++)
        assert(
          board.items.some(([, b]) => b === bin),
          `${lesson.id}: empty category ${board.bins[bin]}`,
        );
      assert(!sortTitles.has(board.title), `duplicate classification activity: ${board.title}`);
      sortTitles.add(board.title);
      assert(extras.checks?.length, `${lesson.id} needs an inline check`);
      for (const item of extras.checks) {
        assert(
          item.after >= 0 && item.after < lesson.sections.length,
          `${lesson.id} check placement`,
        );
        assert(
          item.options.length >= 3 && new Set(item.options).size === item.options.length,
          lesson.id,
        );
        assert(
          item.correct >= 0 && item.correct < item.options.length && item.why.length > 40,
          lesson.id,
        );
        assert(!checkPrompts.has(item.q), `duplicate check: ${item.q}`);
        checkPrompts.add(item.q);
      }
    }
  }
  assert.equal(lessons, 167);
  assert.equal(Object.keys(lessonExtras).length, 167);
  // Labs are specific: none is shared between events, and none repeats in more than two lessons.
  for (const lab of Object.values(topicLabs)) {
    const used = labUse.get(lab.id) ?? [];
    assert(used.length >= 1 && used.length <= 2, `${lab.id} is used in ${used.length} lessons`);
  }
  assert(Object.keys(topicLabs).length >= 90, `only ${Object.keys(topicLabs).length} topic labs`);
  assert(phetPlacements >= 45, `only ${phetPlacements} PhET placements`);
});

test('generated activities are stable, complete, and never give the answer away', () => {
  for (const course of courses)
    for (const lesson of course.lessons) {
      const rounds = termRounds(lesson);
      for (const round of rounds) {
        assert.equal(round.options.filter((o) => o === round.answer).length, 1, lesson.id);
        assert.equal(new Set(round.options).size, round.options.length, lesson.id);
      }
      assert.deepEqual(termRounds(lesson), rounds);
      const sequence = solutionSequence(lesson);
      if (sequence) {
        assert.deepEqual([...sequence.scrambled].sort(), [...sequence.answer].sort(), lesson.id);
        assert.notDeepEqual(sequence.scrambled, sequence.answer, lesson.id);
      }
    }
  assert.deepEqual(stableShuffle([1, 2, 3, 4], 'seed'), stableShuffle([1, 2, 3, 4], 'seed'));
  assert.notDeepEqual(stableShuffle(['a', 'b'], 'x'), ['a', 'b']);
  const sample = check(
    0,
    'Which option is authored first?',
    ['right', 'wrong one', 'wrong two'],
    'explanation',
  );
  assert.equal(sample.options[sample.correct], 'right');
  assert.deepEqual([...sample.options].sort(), ['right', 'wrong one', 'wrong two']);
});
