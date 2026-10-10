import test from 'node:test';
import assert from 'node:assert/strict';
import { blueGreenOrangeCourses as courses } from '../src/lib/lessons-blue-green-orange.ts';
import { yellowPurpleCourses } from '../src/lib/lessons-yellow-purple.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';
import { eventSlots } from '../src/lib/event-slots.ts';
import { lessonReferenceFigures } from '../src/lib/lesson-reference-figures.ts';
import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import {
  strongTitration,
  gasProcess,
  gasR,
  waterHeating,
  resistorNetwork,
  gateOutput,
  cross,
  runoff,
  darcy,
  chainCoordinates,
  chainContacts,
  type GasPath,
} from '../src/lib/extended-lab-models.ts';

test('all 74 blue/green/orange units are distinct, substantive Division C lessons with 518 valid practice questions', () => {
  assert.deepEqual(
    courses.map((c) => c.units.length),
    [9, 8, 10, 9, 8, 10, 10, 10],
  );
  assert.deepEqual(
    courses.map((c) => c.eventId).sort(),
    eventSlots
      .filter((s) => ['blue', 'green', 'orange'].includes(s.color))
      .flatMap((s) => [...s.events])
      .sort(),
  );
  const ids = new Set<string>(),
    texts = new Set<string>(),
    examples = new Set<string>(),
    flows = new Set<string>(),
    quizzes = new Set<string>();
  // Compare all authored courses, including the previous expansion, to catch reused lesson bodies.
  for (const c of [...yellowPurpleCourses, ...courses])
    for (const l of c.lessons) {
      const prose = l.sections.flatMap((s) => s.body).join(' ');
      assert(!texts.has(prose), `duplicate prose ${l.id}`);
      texts.add(prose);
      assert(!examples.has(l.workedExample.problem), `duplicate example ${l.id}`);
      examples.add(l.workedExample.problem);
      const flow = JSON.stringify(l.visual?.steps);
      assert(!flows.has(flow), `duplicate visual ${l.id}`);
      flows.add(flow);
      const quiz = JSON.stringify(l.practice.map((q) => q.prompt));
      assert(!quizzes.has(quiz), `duplicate practice ${l.id}`);
      quizzes.add(quiz);
    }
  let count = 0;
  for (const c of courses) {
    assert.equal(lessonsForEvent(c.eventId, 'C'), c);
    assert.equal(lessonsForEvent(c.eventId, 'B'), null);
    assert.equal(lessonsForEvent(c.eventId, 'A'), null);
    assert.deepEqual(
      c.units.flatMap((u) => u.lessonIds),
      c.lessons.map((l) => l.id),
    );
    for (const l of c.lessons) {
      assert(!ids.has(l.id));
      ids.add(l.id);
      assert.equal(l.sections.length, 6);
      const prose = l.sections.flatMap((s) => s.body).join(' ');
      assert(prose.split(/\s+/).length >= 345, l.id);
      assert(
        !/instructor:|Ashley Li|Amy Song|Pranav Yaramalla|Siyona Arun|Cassie Li|Arya Aia|Charlotte Laetsch|Vicky Guo/i.test(
          JSON.stringify(l),
        ),
      );
      assert.equal(l.visual?.steps.length, 3);
      assert.equal(l.visual?.contrasts.length, 3);
      assert(l.simulation.kind === 'explorer');
      assert(l.simulation.challenge.length > 50);
      assert.equal(l.practice.length, 7);
      assert.equal(l.practice.filter((q) => q.type === 'mcq').length, 3);
      for (const q of l.practice) {
        assert(!ids.has(q.id));
        ids.add(q.id);
        count++;
        assert(q.answer && q.explanation && q.prompt);
        if (q.type === 'mcq') {
          assert.equal(new Set(q.options).size, 4);
          assert.equal(q.options?.filter((o) => o === q.answer).length, 1);
        }
      }
    }
  }
  assert.equal(count, 518);
  assert.equal(lessonsForEvent('engineering-cad', 'C'), null);
  for (const id of [
    'chemistry-lab',
    'circuit-lab',
    'water-quality',
    'designer-genes',
    'dynamic-planet',
  ])
    assert(courses.find((c) => c.eventId === id)?.lessons.at(-1)?.extension);
});
test('online figures have verified source, credit, license, original reading prompt and valid lesson placement', () => {
  assert.equal(lessonReferenceFigures.length, 90);
  const allCourses = [...courses, ...yellowPurpleCourses, anatomyLessons, forensicsLessons];
  const lessons = new Map(allCourses.flatMap((c) => c.lessons.map((l) => [l.id, l] as const)));
  for (const course of allCourses)
    assert(
      lessonReferenceFigures.some((f) => course.lessons.some((l) => l.id === f.lessonId)),
      course.eventId,
    );
  for (const f of lessonReferenceFigures) {
    const lesson = lessons.get(f.lessonId);
    assert(lesson, f.lessonId);
    assert(Number.isInteger(f.section) && f.section >= 0 && f.section < lesson.sections.length);
    for (const key of ['src', 'source', 'licenseUrl'] as const)
      assert(new URL(f[key]).protocol === 'https:');
    assert(f.author && f.alt.length > 30 && f.prompt.length > 50);
  }
  assert.equal(new Set(lessonReferenceFigures.map((f) => f.src)).size, 90);
  assert.equal(new Set(lessonReferenceFigures.map((f) => f.prompt)).size, 90);
});
test('titration covers acid, equivalence, base and finite concentrations without cancellation', () => {
  assert(Math.abs(strongTitration(0, 0.1).ph - 1) < 1e-10);
  assert.equal(strongTitration(25, 0.1).ph, 7);
  assert.equal(strongTitration(0, 0.2).equivalenceML, 12.5);
  assert(Math.abs(strongTitration(30, 0.1).ph - 11.958607315) < 1e-8);
  for (const m of [0.05, 0.1, 0.2])
    for (const v of [0, 12.5, 25, 50]) assert(Number.isFinite(strongTitration(v, m).ph));
});
test('gas paths conserve energy and match their physical constraints over all controls', () => {
  const paths: GasPath[] = ['isothermal', 'isobaric', 'isochoric', 'adiabatic'];
  for (const path of paths)
    for (const ratio of [1, 2, 4])
      for (const tr of [0.5, 1.5, 3]) {
        const g = gasProcess(path, ratio, tr);
        assert(Math.abs(g.heat - g.work - g.du) < 1e-10);
        assert(Math.abs(g.p2 * g.v2 - gasR * g.t2) < 1e-9);
        assert(Object.values(g).every(Number.isFinite));
        if (path === 'isothermal') {
          assert.equal(g.du, 0);
          assert.equal(g.t2, 300);
        }
        if (path === 'isobaric') assert(Math.abs(g.p2 - g.p1) < 1e-9);
        if (path === 'isochoric') {
          assert.equal(g.v2, g.v1);
          assert.equal(g.work, 0);
        }
        if (path === 'adiabatic') {
          assert.equal(g.heat, 0);
          assert(Math.abs(g.entropy) < 1e-12);
        }
      }
  assert(Math.abs(gasProcess('isothermal', 2).work - 1728.84769775) < 1e-7);
});
test('water heating tracks phase fractions, boundary continuity and mass scaling', () => {
  assert.equal(waterHeating(1, 0).temperature, -20);
  assert.equal(waterHeating(1, 42).temperature, 0);
  assert.equal(waterHeating(1, 209).fraction, 0.5);
  assert.equal(waterHeating(1, 376).fraction, 1);
  assert.equal(waterHeating(1, 794).temperature, 100);
  assert.equal(waterHeating(1, 1924).fraction, 0.5);
  assert.deepEqual(waterHeating(0.2, 100), waterHeating(0.4, 200));
  for (const e of [42, 376, 794, 3054])
    assert(
      Math.abs(waterHeating(1, e - 1e-6).temperature - waterHeating(1, e + 1e-6).temperature) <
        1e-4,
    );
});
test('network, logic, and inheritance calculations preserve conservation and probabilities', () => {
  const parallel = resistorNetwork(6, 100, 300, true);
  assert.equal(parallel.resistance, 75);
  assert.equal(parallel.current, 0.08);
  assert(Math.abs(parallel.i1 + parallel.i2 - parallel.current) < 1e-12);
  const series = resistorNetwork(6, 100, 300, false);
  assert.equal(series.current, 0.015);
  assert.equal(series.v1 + series.v2, 6);
  assert.equal(series.power, series.i1 ** 2 * 100 + series.i2 ** 2 * 300);
  assert.equal(resistorNetwork(6, 100, 300, true, false).power, 0);
  for (const a of [false, true])
    for (const b of [false, true]) {
      assert.equal(gateOutput('NAND', a, b), !gateOutput('AND', a, b));
      assert.equal(gateOutput('NOR', a, b), !gateOutput('OR', a, b));
      assert.equal(gateOutput('XOR', a, b), a !== b);
    }
  assert.deepEqual(cross('Aa', 'Aa'), {
    cells: ['AA', 'Aa', 'Aa', 'aa'],
    AA: 0.25,
    Aa: 0.5,
    aa: 0.25,
  });
  for (const a of ['AA', 'Aa', 'aa'])
    for (const b of ['AA', 'Aa', 'aa']) {
      const c = cross(a, b);
      assert.equal(c.AA + c.Aa + c.aa, 1);
      assert.equal(c.AA, cross(b, a).AA);
    }
});
test('hydrograph volume, Darcy units and geometric contacts have transparent invariants', () => {
  const event = runoff(20, 2, 0.3, 4);
  assert.equal(event.volume, 12000);
  assert(Math.abs((event.peak * 4 * 3600) / 2 - event.volume) < 1e-9);
  assert.equal(runoff(20, 2, 0.3, 8).peak, event.peak / 2);
  assert.deepEqual(darcy(0.001, 10, 2, 100), { gradient: 0.02, flow: 0.0002 });
  const points = chainCoordinates(50),
    count = chainContacts(points, 2);
  assert(chainContacts(points, 4) >= count);
  const rotated = points.map((p) => ({ x: p.z, y: p.y, z: -p.x }));
  assert.equal(chainContacts(rotated, 2), count);
});
