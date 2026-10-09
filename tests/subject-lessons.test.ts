import test from 'node:test';
import assert from 'node:assert/strict';
import { yellowPurpleCourses } from '../src/lib/lessons-yellow-purple.ts';
import { eventSlots } from '../src/lib/event-slots.ts';
import {
  cipherTransform,
  keyedAlphabet,
  vegetation,
  epiMeasures,
  stellar,
  plantResponse,
  sampleStats,
  experimentData,
  type CipherMode,
} from '../src/lib/subject-labs.ts';

test('all 53 yellow/purple syllabus units have developed Division C lessons and 371 valid practice questions', () => {
  assert.deepEqual(
    yellowPurpleCourses.map((c) => c.eventId).sort(),
    eventSlots
      .filter((s) => s.color === 'yellow' || s.color === 'purple')
      .flatMap((s) => [...s.events])
      .sort(),
  );
  assert.deepEqual(
    yellowPurpleCourses.map((c) => c.units.length),
    [7, 10, 10, 8, 10, 8],
  );
  const ids = new Set<string>();
  let count = 0;
  for (const course of yellowPurpleCourses) {
    assert.equal(course.division, 'C');
    assert.equal(course.units.length, course.lessons.length);
    assert.deepEqual(
      course.units.flatMap((u) => u.lessonIds),
      course.lessons.map((l) => l.id),
    );
    for (const lesson of course.lessons) {
      assert(!ids.has(lesson.id));
      ids.add(lesson.id);
      assert.equal(lesson.sections.length, 6);
      const text = lesson.sections.flatMap((s) => s.body).join(' ');
      assert(text.split(/\s+/).length >= 430, `${lesson.id} needs developed explanations`);
      assert(!/Benjamin Wang|Noella Lee|instructor:/i.test(text));
      assert.equal(lesson.simulation.kind, 'explorer');
      assert.equal(lesson.visual?.steps.length, 3);
      assert.equal(lesson.visual?.contrasts.length, 3);
      assert.equal(lesson.practice.length, 7);
      assert.equal(lesson.practice.filter((q) => q.type === 'mcq').length, 3);
      for (const q of lesson.practice) {
        assert(!ids.has(q.id));
        ids.add(q.id);
        count++;
        assert(q.prompt && q.answer && q.explanation);
        if (q.type === 'mcq') {
          assert.equal(new Set(q.options).size, 4);
          assert.equal(q.options?.filter((o) => o === q.answer).length, 1);
        }
      }
    }
  }
  assert.equal(count, 371);
  assert(
    yellowPurpleCourses.find((c) => c.eventId === 'remote-sensing')?.lessons.at(-1)?.extension,
  );
  assert(
    yellowPurpleCourses.find((c) => c.eventId === 'disease-detectives')?.lessons.at(-1)?.extension,
  );
});

test('cipher transformations reverse known messages and reject invalid conventions', () => {
  const transform = (text: string, mode: CipherMode, decode = false) =>
    cipherTransform(text, mode, 8, 5, 'SCIENCE', decode);
  assert.equal(cipherTransform('CAT', 'Affine', 8, 5, 'A'), 'SIZ');
  assert.equal(cipherTransform('SIZ', 'Affine', 8, 5, 'A', true), 'CAT');
  assert.equal(cipherTransform('ZOO', 'Caesar', 3, 1, 'A'), 'CRR');
  assert.equal(cipherTransform('ABC', 'Atbash', 0, 1, 'A'), 'ZYX');
  for (const mode of [
    'Caesar',
    'Atbash',
    'Affine',
    'Porta',
    'Checkerboard',
    'Nihilist',
    'Baconian',
    'Fractionated Morse',
  ] as CipherMode[]) {
    const encoded = transform('MEET ME AT NOON', mode);
    assert.equal(transform(encoded, mode, true), 'MEET ME AT NOON', mode);
  }
  for (const a of [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25])
    for (const b of [0, 3, 25])
      assert.equal(
        cipherTransform(cipherTransform('AZBYCX', 'Affine', b, a, 'A'), 'Affine', b, a, 'A', true),
        'AZBYCX',
      );
  assert.throws(() => cipherTransform('A', 'Affine', 0, 2, 'A'), /coprime/);
  assert.throws(() => transform('BBBBB', 'Baconian', true), /unused/);
  assert.throws(() => transform('99', 'Checkerboard', true), /outside/);
  assert.equal(cipherTransform('CAT', 'Checkerboard', 0, 1, 'A'), '13 11 44');
  assert.equal(cipherTransform('CAT', 'Nihilist', 0, 1, 'A'), '24 22 55');
  assert.equal(
    cipherTransform('A ! B', 'Fractionated Morse', 0, 1, 'A'),
    cipherTransform('A B', 'Fractionated Morse', 0, 1, 'A'),
  );
  assert.equal(keyedAlphabet('BALLOON').slice(0, 5), 'BALON');
  assert.equal(keyedAlphabet('JIG', true).length, 25);
  const encoded = transform('MEETMEATNOON', 'Complete columnar');
  assert.equal(transform(encoded, 'Complete columnar', true), 'MEETMEATNOONXX');
});

test('remote sensing, epidemiology and stellar models reproduce worked examples and undefined denominators', () => {
  const v = vegetation(0.6, 0.2, 0.1);
  assert(Math.abs(v.ndvi! - 0.5) < 1e-12);
  assert(Math.abs(v.evi! - 1 / 2.05) < 1e-12);
  assert.equal(vegetation(0, 0, 0).ndvi, null);
  const epi = epiMeasures(20, 30, 5, 45);
  assert.equal(epi.rr, 4);
  assert.equal(epi.or, 6);
  assert.equal(epiMeasures(0, 0, 0, 0).rr, null);
  assert.equal(epiMeasures(0, 0, 0, 0).specificity, null);
  assert(Math.abs(epiMeasures(9, 99, 1, 891).ppv! - 1 / 12) < 1e-12);
  const solar = stellar(5772, 1, 10);
  assert.equal(solar.luminosity, 1);
  assert.equal(solar.flux, 1);
  assert.equal(solar.modulus, 0);
  assert.equal(stellar(5772, 1, 100).flux, 0.01);
  assert.equal(stellar(5772, 1, 100).modulus, 5);
  assert.equal(stellar(5772 * 2, 2, 10).luminosity, 64);
});

test('plant tradeoffs and synthetic experiments distinguish noise, fixed offset and time confounding', () => {
  assert.equal(plantResponse(0, 100, 100, 100).gain, 0);
  assert.equal(plantResponse(100, 0, 100, 100).gain, 0);
  assert.equal(plantResponse(100, 0, 100, 100).loss, 0);
  assert(plantResponse(90, 70, 80, 50).gain > plantResponse(10, 70, 80, 50).gain);
  assert.equal(sampleStats([8, 10, 12]).mean, 10);
  assert.equal(sampleStats([8, 10, 12]).sd, 2);
  const settings = {
    slope: 4,
    noise: 0,
    offset: 0,
    replicates: 3,
    confounded: false,
    randomized: false,
    anomaly: false,
    run: 0,
  };
  const baseline = experimentData(settings);
  assert.deepEqual(
    baseline.groups.map((g) => g.mean),
    [14, 18, 22],
  );
  const biased = experimentData({ ...settings, offset: 5 });
  assert.deepEqual(
    biased.groups.map((g) => g.mean),
    [19, 23, 27],
  );
  assert(biased.groups.every((g) => g.sd === 0));
  const drift = experimentData({ ...settings, confounded: true });
  assert(drift.groups[2].mean - drift.groups[0].mean > 8);
  const randomized = experimentData({ ...settings, confounded: true, randomized: true });
  assert.deepEqual(
    randomized.observations.map((o) => o.order),
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  );
  assert(new Set(randomized.observations.map((o) => `${o.level}-${o.trial}`)).size === 9);
});
