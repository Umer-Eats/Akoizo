import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonsForEvent, sharedDivisionBEvents } from '../src/lib/lessons-registry.ts';
import { extrasFor } from '../src/lib/extras/index.ts';
import { lessonStorageKey, scorePractice } from '../src/lib/lesson-practice.ts';
import { calculateLab, initialLabValues } from '../src/lib/division-c-lab-models.ts';
import { labsForEvent } from '../src/lib/division-c-labs.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';

test('rewritten B lessons retain working practice, evidence, visuals and inline activities', () => {
  const rewritten = sharedDivisionBEvents
    .flatMap((event) => lessonsForEvent(event, 'B')!.lessons)
    .filter((l) => l.id.endsWith('-b'));
  assert.ok(rewritten.length >= 15);
  for (const lesson of rewritten) {
    assert.ok(lesson.sections.length >= 4, lesson.id);
    assert.ok(lesson.visual?.steps.length === 3, lesson.id);
    assert.ok(extrasFor(lesson.id, lesson).checks?.length, lesson.id);
    assert.equal(extrasFor(lesson.id, lesson).sort?.items.length, lesson.keyTerms.length);
    const result = scorePractice(
      lesson.practice,
      Object.fromEntries(lesson.practice.map((q) => [q.id, q.answer])),
    );
    assert.equal(result.earned, result.possible);
    assert.ok(result.possible > 0);
    const sim = lesson.simulation;
    assert.equal(sim.kind, 'investigation');
    if (sim.kind === 'investigation') {
      assert.equal(new Set(sim.options).size, sim.options.length);
      assert.equal(sim.options[sim.correct], lesson.practice[0].answer);
    }
  }
});

test('B scope removes excluded courses and keeps required monitoring and pollution topics core', () => {
  const circuits = lessonsForEvent('circuit-lab', 'B')!;
  assert.ok(!circuits.lessons.some((l) => l.title.includes('Transistors')));
  assert.ok(
    lessonsForEvent('circuit-lab', 'C')!.lessons.some((l) => l.title.includes('Transistors')),
  );
  assert.ok(lessonsForEvent('codebusters', 'B')!.lessons.some((l) => /homophonic/.test(l.title)));
  assert.ok(
    !lessonsForEvent('experimental-design', 'B')!.lessons.some((l) =>
      /Division C comparison/.test(l.title),
    ),
  );
  for (const [event, id] of [
    ['dynamic-planet', 'dyn-u10-l1'],
    ['water-quality', 'water-u9-l1'],
  ]) {
    assert.equal(lessonsForEvent(event, 'B')!.lessons.find((l) => l.id === id)!.extension, false);
    assert.equal(lessonsForEvent(event, 'C')!.lessons.find((l) => l.id === id)!.extension, true);
  }
});

test('lesson progress remains isolated by student, event, and division', () => {
  assert.notEqual(
    lessonStorageKey('student', 'circuit-lab', 'B'),
    lessonStorageKey('student', 'circuit-lab', 'C'),
  );
  assert.equal(
    lessonStorageKey('student', 'circuit-lab'),
    lessonStorageKey('student', 'circuit-lab', 'C'),
  );
});

test('B Water Quality exposes salinometer preparation and calibrates the full percent range', () => {
  const event = eventsForDivision('B').find((e) => e.id === 'water-quality')!;
  for (const tool of ['lab-practice', 'video-grader', 'course-generator'])
    assert.ok(eventToolIds('B', event).includes(tool as never));
  const lab = labsForEvent('B', event.id)[0];
  assert.equal(lab.model, 'salinometer-b');
  for (let sample = 0; sample < 5; sample++) {
    const values = initialLabValues(lab);
    const result = calculateLab(lab.model, values, sample);
    assert.ok(result.answer >= 1 && result.answer <= 10);
    const matched = calculateLab(lab.model, { ...values, salinity: result.answer }, sample);
    assert.equal(matched.readings[0].value, matched.readings[1].value);
    const recalibrated = calculateLab(
      lab.model,
      { ...values, mass: 3, salinity: result.answer },
      sample,
    );
    assert.equal(recalibrated.answer, result.answer);
    assert.equal(recalibrated.readings[0].value, recalibrated.readings[1].value);
  }
  const low = calculateLab(lab.model, { mass: 2, salinity: 1 });
  const high = calculateLab(lab.model, { mass: 2, salinity: 10 });
  assert.ok(high.readings[0].value < low.readings[0].value);
});
