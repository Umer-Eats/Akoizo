import test from 'node:test';
import assert from 'node:assert/strict';
import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { eventSlots } from '../src/lib/event-slots.ts';
import { atlasImages, lessonAtlas } from '../src/lib/lesson-atlas.ts';
import { experimentPresets } from '../src/lib/lesson-experiments.ts';
import { existsSync } from 'node:fs';
import {
  calculateModel,
  modelControls,
  modelDefaults,
  type ModelId,
} from '../src/lib/lesson-models.ts';
import {
  lessonStorageKey,
  practiceComplete,
  readAttempt,
  scorePractice,
} from '../src/lib/lesson-practice.ts';

test('only the requested pink Division C courses are available', () => {
  const pink = eventSlots.find((slot) => slot.color === 'pink')!;
  for (const id of pink.events) {
    assert.equal(!!lessonsForEvent(id, 'C'), id !== 'engineering-cad');
    assert.equal(lessonsForEvent(id, 'B'), null);
    assert.equal(lessonsForEvent(id, 'A'), null);
  }
  assert.equal(lessonsForEvent('astronomy', 'C'), null);
});

test('all syllabus units have substantive lessons, worked examples, simulations, and answerable practice', () => {
  assert.equal(anatomyLessons.units.length, 10);
  assert.equal(forensicsLessons.units.length, 9);
  const globalIds = new Set<string>();
  for (const course of [anatomyLessons, forensicsLessons]) {
    assert.equal(course.lessons.length, 20);
    assert.equal(course.division, 'C');
    assert.ok(!('instructor' in course));
    const linked = course.units.flatMap((unit) => unit.lessonIds);
    assert.equal(new Set(linked).size, course.lessons.length);
    assert.deepEqual([...linked].sort(), course.lessons.map((lesson) => lesson.id).sort());
    for (const lesson of course.lessons) {
      assert.ok(!globalIds.has(lesson.id));
      globalIds.add(lesson.id);
      assert.ok(
        course.units.find((unit) => unit.id === lesson.unitId)?.lessonIds.includes(lesson.id),
      );
      assert.equal(lesson.kind, 'text');
      assert.ok(lesson.sections.length >= 6);
      const words = lesson.sections
        .flatMap((section) => section.body)
        .join(' ')
        .split(/\s+/).length;
      assert.ok(
        words >= 600,
        `${lesson.id} should contain developed teaching prose, not an outline`,
      );
      assert.ok(lesson.workedExample.steps.length >= 3);
      assert.equal(lesson.practice.length, 7);
      assert.ok(lesson.keyTerms.length >= 4);
      for (const q of lesson.practice) {
        assert.ok(!globalIds.has(q.id));
        globalIds.add(q.id);
        assert.ok(q.prompt && q.answer && q.explanation);
        if (q.type === 'mcq') {
          assert.ok(q.options && q.options.length >= 3);
          assert.equal(
            q.options.filter((option) => option === q.answer).length,
            1,
            `${q.id} has one valid answer`,
          );
        }
      }
      if (lesson.simulation.kind === 'investigation') {
        const sim = lesson.simulation;
        assert.ok(sim.observations.length >= 3);
        assert.ok(sim.correct >= 0 && sim.correct < sim.options.length);
      } else {
        assert.ok(modelControls[lesson.simulation.model]);
        assert.ok(lesson.simulation.challenge && lesson.simulation.takeaway);
      }
    }
  }
  assert.ok(forensicsLessons.lessons.some((lesson) => /Skin, Friction/.test(lesson.title)));
  assert.ok(forensicsLessons.lessons.some((lesson) => /Pollen, Seeds, Tracks/.test(lesson.title)));
});

test('numerical models reproduce worked examples and preserve physical boundaries', () => {
  const metric = (id: ModelId, values: Record<string, number>, index = 0) =>
    calculateModel(id, values).metrics[index].value;
  assert.equal(metric('ventilation', { tidal: 500, rate: 12, dead: 150 }, 1), 4.2);
  assert.equal(metric('ventilation', { tidal: 250, rate: 24, dead: 150 }, 1), 2.4);
  assert.equal(metric('airway', { radius: 50, pressure: 200 }), 16);
  assert.equal(metric('airway', { radius: 50, pressure: 200 }, 1), 0.125);
  assert.equal(metric('diffusion', { area: 50, gradient: 100, thickness: 200 }), 25);
  assert.equal(metric('digestion', { load: 20, capacity: 30 }, 1), 0);
  assert.equal(metric('feedback', { disturbance: 8, gain: 0.5, steps: 3 }), 1);
  assert.equal(metric('chromatography', { front: 8, rf: 0.5 }), 4);
  assert.ok(Math.abs(metric('bloodstain', { length: 12, ratio: 0.5 }, 1) - 30) < 1e-10);
  assert.equal(metric('thermal', { temperature: 20, base: 6, hours: 24 }), 336);
  assert.equal(metric('thermal', { temperature: 6, base: 12, hours: 24 }), 0);
  assert.match(calculateModel('density', { sample: 1.2, liquid: 1 }).interpretation, /sinks/);
  assert.match(
    calculateModel('density', { sample: 1, liquid: 1 }).interpretation,
    /neutral buoyancy/,
  );
  for (const id of Object.keys(modelControls) as ModelId[]) {
    for (const values of [
      modelDefaults(id),
      {},
      Object.fromEntries(modelControls[id].map((c) => [c.key, Infinity])),
    ]) {
      assert.ok(calculateModel(id, values).metrics.every((m) => Number.isFinite(m.value)));
    }
  }
});

test('each lesson has a contextual visual atlas and experiments stay within the teaching model ranges', () => {
  const lessons = [...anatomyLessons.lessons, ...forensicsLessons.lessons];
  assert.deepEqual(Object.keys(lessonAtlas).sort(), lessons.map((lesson) => lesson.id).sort());
  for (const lesson of lessons) {
    const atlas = lessonAtlas[lesson.id];
    assert.ok(atlas.section >= 0 && atlas.section < lesson.sections.length);
    assert.equal(atlas.steps.length, 3);
    assert.equal(atlas.contrasts.length, 3);
    assert.ok(atlas.steps.every((step) => step.label && step.detail));
    assert.ok(atlas.contrasts.every((row) => row.label && row.mechanism && row.limit));
    if (atlas.image) {
      const image = atlasImages[atlas.image];
      assert.ok(
        image.alt &&
          image.author &&
          image.source.startsWith('https:') &&
          image.licenseUrl.startsWith('https:'),
      );
      assert.ok(
        existsSync(new URL(`../public/lesson-visuals/${atlas.image}.jpg`, import.meta.url)),
      );
    }
    if (lesson.simulation.kind === 'model') {
      const id = lesson.simulation.model;
      for (const preset of experimentPresets[id]) {
        for (const [key, value] of Object.entries(preset.inputs)) {
          const control = modelControls[id].find((control) => control.key === key);
          assert.ok(
            control && value >= control.min && value <= control.max,
            `${id}: ${key} is bounded`,
          );
        }
        assert.ok(
          calculateModel(id, { ...modelDefaults(id), ...preset.inputs }).metrics.every((metric) =>
            Number.isFinite(metric.value),
          ),
        );
      }
    }
  }
});

test('practice scores weighted multiple-choice answers and never keyword-grades written answers', () => {
  const questions = forensicsLessons.lessons[0].practice;
  const answers = Object.fromEntries(questions.map((q) => [q.id, q.answer]));
  const score = scorePractice(questions, answers);
  assert.equal(score.earned, score.possible);
  assert.equal(score.answered, 7);
  assert.equal(score.written, 4);
  assert.equal(score.possible, 6);
  const short = questions.find((q) => q.type === 'short')!;
  answers[short.id] = 'Entirely wrong reasoning';
  assert.equal(scorePractice(questions, answers).earned, score.earned);
  const mcq = questions.find((q) => q.type === 'mcq')!;
  answers[mcq.id] = 'Not an option';
  assert.equal(scorePractice(questions, answers).earned, score.earned - (mcq.points ?? 1));
});

test('saved practice requires valid answers and explicit written review, scoped to each student and event', () => {
  const questions = anatomyLessons.lessons[0].practice;
  const answers = Object.fromEntries(questions.map((q) => [q.id, q.answer]));
  assert.equal(practiceComplete({ answers, submitted: true, reviewed: [] }, questions), false);
  const reviewed = questions.filter((q) => q.type === 'short').map((q) => q.id);
  const restored = readAttempt(
    { answers, submitted: true, reviewed: [...reviewed, 'invented', reviewed[0]] },
    questions,
  );
  assert.equal(practiceComplete(restored, questions), true);
  assert.equal(restored.reviewed.length, reviewed.length);
  assert.deepEqual(readAttempt(null, questions), { answers: {}, submitted: false, reviewed: [] });
  const missing = { ...answers, [questions[0].id]: 'Invalid choice' };
  assert.equal(
    readAttempt({ answers: missing, submitted: true, reviewed }, questions).submitted,
    false,
  );
  assert.notEqual(
    lessonStorageKey('student-a', 'forensics'),
    lessonStorageKey('student-b', 'forensics'),
  );
  assert.notEqual(
    lessonStorageKey('student-a', 'forensics'),
    lessonStorageKey('student-a', 'anatomy-and-physiology'),
  );
});
