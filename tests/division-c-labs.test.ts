import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  divisionBLabs,
  divisionCLabs,
  labsForEvent,
  phetActivities,
} from '../src/lib/division-c-labs.ts';
import {
  calculateLab,
  initialLabValues,
  checkLabAnswer,
  labPlot,
} from '../src/lib/division-c-lab-models.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';

const near = (a: number, b: number, epsilon = 1e-9) =>
  assert.ok(Math.abs(a - b) < epsilon, `${a} ≠ ${b}`);
const allLabs = [...divisionCLabs, ...divisionBLabs];
test('every Division B and C Lab tab has an event-specific simulation; A receives none', () => {
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division)) {
      const hasLab = eventToolIds(division, event).some(
        (id) => id === 'lab-practice' || id === 'lab-generator',
      );
      assert.equal(labsForEvent(division, event.id).length > 0, hasLab, `${division}/${event.id}`);
      if (hasLab) assert.ok(phetActivities[event.id], event.id);
      assert.deepEqual(labsForEvent('A', event.id), []);
    }
  assert.equal(new Set(allLabs.map((l) => l.id)).size, 11);
  // Division B does not inherit Division C's labs, apart from the shared design lab.
  assert.deepEqual(
    labsForEvent('B', 'circuit-lab').map((l) => l.id),
    ['resistor-bench-b'],
  );
  assert.deepEqual(
    labsForEvent('B', 'experimental-design').map((l) => l.id),
    labsForEvent('C', 'experimental-design').map((l) => l.id),
  );
});
test('archive sources refer to real questions from the lab’s own division and existing papers', () => {
  const tests = [
    'imported-practice-tests',
    'practice-tests',
    'batch-converter-practice-tests',
  ].flatMap((file) => JSON.parse(readFileSync(`src/data/${file}.json`, 'utf8')));
  for (const lab of allLabs) {
    if (!lab.source.testId) {
      assert.match(lab.source.paper, /experimentaldesign_2021_c/);
      continue;
    }
    const source = tests.find((t: { id: string }) => t.id === lab.source.testId);
    assert.ok((lab.divisions ?? ['C']).includes(source.division), lab.id);
    assert.equal(source.eventId, lab.eventId);
    for (const id of lab.source.questionIds!)
      assert.ok(source.questions.some((q: { id: string }) => q.id === id));
    assert.ok(existsSync(`public${lab.source.paper.split('#')[0]}`));
  }
});
test('all sample variants and slider boundaries yield finite readings, answers, and plot points', () => {
  for (const lab of allLabs)
    for (let scenario = 0; scenario < 5; scenario++) {
      const initial = initialLabValues(lab);
      for (const values of [
        initial,
        ...lab.controls.flatMap((c) =>
          [c.min, c.max].map((value) => ({ ...initial, [c.key]: value })),
        ),
      ]) {
        const result = calculateLab(lab.model, values, scenario);
        assert.ok(Number.isFinite(result.answer), lab.id);
        assert.ok(
          result.readings.every((r) => Number.isFinite(r.value)),
          lab.id,
        );
        for (const transform of ['A', 'ln(A)', '1/A'])
          assert.ok(
            labPlot(lab, values, scenario, transform).points.every(
              (p) => Number.isFinite(p.x) && Number.isFinite(p.y),
            ),
            lab.id,
          );
      }
    }
});
test('kinetics is first order and Beer–Lambert calibration scales with path length', () => {
  const v = { time: 60, concentration: 60, temperature: 298 };
  const r = calculateLab('kinetics', v);
  near(r.answer, 0.012);
  near(r.readings[0].value, 0.6 * Math.exp(-0.012 * 60));
  const hot = calculateLab('kinetics', { ...v, temperature: 325 });
  assert.ok(hot.answer > r.answer);
  assert.equal(calculateLab('kinetics', { ...v, time: 0 }).ready, false);
  const a = calculateLab('colorimetry', { concentration: 40, path: 1 }, 3);
  const b = calculateLab('colorimetry', { concentration: 40, path: 2 }, 3);
  near(b.readings[0].value, a.readings[0].value * 2);
  near(b.answer, 60);
});
test('circuit conserves current and bridge balance recovers each unknown independent of voltage', () => {
  const v = { voltage: 9, r1: 100, r2: 200, parallel: 0, closed: 1 };
  near(calculateLab('circuit', v).answer, 300);
  near(calculateLab('circuit', v).readings[0].value, 30);
  near(calculateLab('circuit', { ...v, parallel: 1 }).readings[0].value, 135);
  near(calculateLab('circuit', { ...v, closed: 0 }).readings[0].value, 0);
  for (let s = 0; s < 5; s++)
    for (const voltage of [1, 12]) {
      const result = calculateLab('bridge', { voltage, r1: 200, r2: 200, r3: 100 + s * 50 }, s);
      near(result.readings[0].value, 0);
      assert.equal(result.ready, true);
    }
});
test('Rf is invariant with solvent travel; salinity calibration obeys buoyancy', () => {
  const r = calculateLab('chromatography', { front: 15 });
  near(r.readings[1].value, 12.75);
  near(r.answer, 0.85);
  near(calculateLab('chromatography', { front: 2 }).answer, 0.85);
  const fresh = calculateLab('salinometer', { salinity: 0, mass: 2 });
  const salty = calculateLab('salinometer', { salinity: 40, mass: 2 });
  assert.ok(salty.readings[0].value < fresh.readings[0].value);
  const h = salty.readings[1].value;
  near((2 / (0.2 * h) - 0.9982) / 0.00075, salty.answer);
});
test('BOD recovers the same demand at different dilutions and waits for day five', () => {
  for (const fraction of [0.1, 0.25, 0.5]) {
    const r = calculateLab('bod', { initial: 9, fraction, day: 5 }, 4);
    near((9 - r.readings[0].value) / fraction, 10);
    assert.equal(r.ready, true);
    assert.ok(r.readings[0].value > 1);
  }
  assert.equal(calculateLab('bod', { initial: 9, fraction: 0.25, day: 3 }).ready, false);
});
test('absorption mean matches independent replicates and responds to controlled area changes', () => {
  const readings = [1, 2, 3].map((replicate) =>
    calculateLab('absorption', { area: 50, soak: 30, replicate }),
  );
  near(readings.reduce((sum, r) => sum + r.readings[0].value, 0) / 3, readings[0].answer);
  near(
    calculateLab('absorption', { area: 100, soak: 30, replicate: 1 }).answer,
    readings[0].answer * 2,
  );
});
test('answer checking rejects blanks, nonfinite values and incorrect results', () => {
  assert.match(checkLabAnswer('', 0.5), /Enter/);
  assert.match(checkLabAnswer('Infinity', 0.5), /finite/);
  assert.match(checkLabAnswer('0.505', 0.5), /Correct/);
  assert.match(checkLabAnswer('5', 0.5), /Not yet/);
});

test('curd yield plateaus once all casein curdles and scales with milk mass', () => {
  const partial = calculateLab('curd', { vinegar: 1, milk: 120 }, 2);
  const full = calculateLab('curd', { vinegar: 2, milk: 120 }, 2);
  const extra = calculateLab('curd', { vinegar: 6, milk: 120 }, 2);
  assert.equal(partial.ready, false);
  assert.equal(full.ready, true);
  near(partial.readings[0].value * 2, full.readings[0].value);
  near(full.readings[0].value, extra.readings[0].value);
  near((full.readings[0].value / 120) * 100, full.answer);
  near(calculateLab('curd', { vinegar: 2, milk: 130 }, 2).answer, full.answer);
});
