import test from 'node:test';
import assert from 'node:assert/strict';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
import { lessonsForEvent, sharedDivisionBEvents } from '../src/lib/lessons-registry.ts';
import { divisionBCourses } from '../src/lib/lessons-division-b.ts';
import { yellowPurpleCourses } from '../src/lib/lessons-yellow-purple.ts';
import { blueGreenOrangeCourses } from '../src/lib/lessons-blue-green-orange.ts';
import { sheetEventsByDivision } from '../src/lib/cheatsheets.ts';
import { sheetRuleText } from '../src/lib/cheatsheet-ai.ts';
import { binderEventsByDivision, binderRecommendations } from '../src/lib/binders.ts';
import { labsForEvent } from '../src/lib/division-c-labs.ts';
import { listPracticeTests } from '../src/lib/practice-catalog.ts';
import binderRulesB from '../src/data/binder-rules-b.json' with { type: 'json' };

const divisionB = eventsForDivision('B');
const has = (eventId: string, tool: string) =>
  eventToolIds(
    'B',
    divisionB.find((e) => e.id === eventId)!,
  ).includes(tool as never);

test('every Division B tool that Division C fills has content in Division B too', () => {
  for (const event of divisionB) {
    const tools = eventToolIds('B', event);
    const cCourse = lessonsForEvent(event.id, 'C');
    const bOnly = divisionBCourses.some((course) => course.eventId === event.id);
    // Study events get a course; build events have none in either division, as in Division C.
    const studyEvent = tools.includes('practice-tests') || tools.includes('lab-generator');
    assert.equal(!!lessonsForEvent(event.id, 'B'), studyEvent, `${event.id} lessons`);
    assert.equal(!!lessonsForEvent(event.id, 'B'), !!cCourse || bOnly, `${event.id} course source`);
    if (tools.includes('practice-tests'))
      assert.ok(listPracticeTests('B', event.id).length > 0, `${event.id} practice tests`);
    if (tools.includes('cheatsheet-generator')) {
      assert.ok(
        sheetEventsByDivision.B.some((e) => e.id === event.id),
        event.id,
      );
      assert.match(sheetRuleText('B', event.id) ?? '', /\bB\b/, `${event.id} rules`);
    }
    if (tools.includes('binder-generator')) {
      assert.ok(
        binderEventsByDivision.B.some((e) => e.id === event.id),
        event.id,
      );
      assert.ok(binderRecommendations[event.id], `${event.id} page guidance`);
      assert.ok((binderRulesB as Record<string, string>)[event.id]?.length > 1000, event.id);
    }
    if (tools.includes('lab-practice') || tools.includes('lab-generator'))
      assert.ok(labsForEvent('B', event.id).length > 0, `${event.id} labs`);
  }
  assert.equal(
    sheetEventsByDivision.B.length,
    divisionB.filter((e) => has(e.id, 'cheatsheet-generator')).length,
  );
  assert.equal(
    binderEventsByDivision.B.length,
    divisionB.filter((e) => has(e.id, 'binder-generator')).length,
  );
});

test('shared Division B courses reuse Division C lessons and say so', () => {
  for (const id of sharedDivisionBEvents) {
    const b = lessonsForEvent(id, 'B')!,
      c = lessonsForEvent(id, 'C')!;
    assert.equal(b.division, 'B');
    assert.equal(c.division, 'C');
    assert.equal(b.lessons, c.lessons);
    assert.match(b.intro, /shared with Division C/);
    assert.doesNotMatch(c.intro, /shared with Division C/);
  }
});

test('Division B-only courses meet the lesson quality bar', () => {
  assert.deepEqual(divisionBCourses.map((c) => c.eventId).sort(), [
    'crime-busters',
    'food-science',
    'heredity',
    'meteorology',
    'solar-system',
  ]);
  const proseSeen = new Set(
    [...yellowPurpleCourses, ...blueGreenOrangeCourses].flatMap((c) =>
      c.lessons.map((l) => l.sections.flatMap((s) => s.body).join(' ')),
    ),
  );
  const ids = new Set<string>();
  for (const course of divisionBCourses) {
    assert.equal(course.division, 'B');
    assert.equal(lessonsForEvent(course.eventId, 'B'), course);
    assert.equal(lessonsForEvent(course.eventId, 'C'), null);
    assert.deepEqual(
      course.units.flatMap((u) => u.lessonIds),
      course.lessons.map((l) => l.id),
    );
    assert.ok(course.units.length >= 7, course.eventId);
    for (const lesson of course.lessons) {
      assert.ok(!ids.has(lesson.id), lesson.id);
      ids.add(lesson.id);
      const prose = lesson.sections.flatMap((s) => s.body).join(' ');
      assert.ok(!proseSeen.has(prose), `duplicate prose ${lesson.id}`);
      proseSeen.add(prose);
      assert.equal(lesson.sections.length, 6, lesson.id);
      assert.ok(prose.split(/\s+/).length >= 345, lesson.id);
      assert.equal(lesson.keyTerms.length, 6, lesson.id);
      assert.equal(lesson.visual?.steps.length, 3, lesson.id);
      assert.equal(lesson.visual?.contrasts.length, 3, lesson.id);
      assert.equal(lesson.practice.length, 7, lesson.id);
      for (const q of lesson.practice) {
        assert.ok(q.prompt && q.answer && q.explanation, q.id);
        if (q.type === 'mcq') {
          assert.equal(new Set(q.options).size, 4, q.id);
          assert.equal(q.options!.filter((o) => o === q.answer).length, 1, q.id);
        }
      }
      assert.equal(lesson.practice.filter((q) => q.type === 'mcq').length, 3, lesson.id);
      const sim = lesson.simulation;
      assert.equal(sim.kind, 'investigation', lesson.id);
      if (sim.kind !== 'investigation') continue;
      assert.ok(sim.observations.length >= 3 && sim.observations.length <= 4, lesson.id);
      assert.equal(new Set(sim.options).size, sim.options.length, lesson.id);
      assert.ok(sim.correct >= 0 && sim.correct < sim.options.length, lesson.id);
      assert.ok(sim.explanation.length > 60, lesson.id);
    }
  }
  assert.equal(ids.size, 37);
});
