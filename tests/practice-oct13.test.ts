import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findPracticeTest,
  listArchiveSources,
  publicPracticePaper,
} from '../src/lib/practice-catalog.ts';
import { gradePractice, validateAnswers } from '../src/lib/practice-grading.ts';

const batch = [
  ['51mtaevlop0', 34, 9430],
  ['yyjk7oyaqzi', 34, 9665],
  ['nt3v7oj3rjc', 34, 10164],
  ['uk5mc-xtiqw', 18, 70],
  ['ny-dzskly80', 100, 100],
  ['z1tqamhu3cw', 63, 110.5],
  ['ajzmepy-1v8', 96, 114.5],
  ['msr9ze54iku', 160, 160],
  ['pgz8ogkxhr0', 55, 155.5],
  ['fehps-jnwpk', 28, 88],
  ['zrvevxmrlcc', 25, 94],
  ['37x5bgyxapo', 86, 113],
  ['d9cpysudn-y', 45, 67],
  ['nchmgorixfs', 12, 46],
  ['mypk0kixvlm', 56, 196],
  ['q7mxc-lyt3q', 60, 120],
  ['oyws8qhr8-s', 37, 62],
  ['p-vah4utveu', 48, 145],
  ['lqsqfowwqcu', 86, 191],
  ['8hoey-b0s6o', 64, 95],
] as const;
const paper = (id: string) => findPracticeTest('C', `scioly-${id}-c`);

test('October 13 adds 20 complete C papers across eight smaller libraries, without duplicate archive cards', () => {
  const events = new Map<string, number>();
  let fields = 0;
  for (const [id, count, points] of batch) {
    const p = paper(id);
    assert.equal(p.questionCount, count, id);
    assert.equal(p.maxScore, points, id);
    assert.equal(p.questions.length, count);
    assert.equal(p.gradingMode, 'published-key');
    assert.equal(
      listArchiveSources('C', p.eventId).some((s) => s.sourceId === p.sourceId),
      false,
    );
    assert.ok(p.paperUrl.startsWith('/practice/'));
    assert.ok(p.keyUrl?.startsWith('/practice/'));
    assert.equal('keys' in publicPracticePaper(p), false);
    fields += count;
    events.set(p.eventId, (events.get(p.eventId) ?? 0) + 1);
  }
  assert.equal(fields, 1141);
  assert.equal(events.size, 8);
  assert.deepEqual([...events.values()].sort(), [2, 2, 2, 2, 3, 3, 3, 3]);
});

test('Codebusters grades requested keywords and decoded cryptarithms without an AI request', () => {
  const p = paper('yyjk7oyaqzi');
  const correct = gradePractice(p, { '5': 'GRADUATE', '15': 'gator heart', '33': 'TRAIN' });
  assert.equal(correct.score, 237 + 221 + 246);
  assert.equal(correct.pendingPoints, 0);
  assert.equal(gradePractice(p, { '5': 'GRADUATX' }).score, 137);
  assert.equal(gradePractice(p, { '15': 'GATOR HEARX' }).score, 121);
  const s = paper('51mtaevlop0');
  assert.match(s.keys['18'].criteria![0].answer, /genuises/);
  for (const id of ['51mtaevlop0', 'yyjk7oyaqzi', 'nt3v7oj3rjc']) {
    const c = paper(id);
    const answers = Object.fromEntries(
      c.questions.map((q) => [q.id, c.keys[q.id].criteria![0].cipher!.solution]),
    );
    const result = gradePractice(c, answers);
    assert.equal(result.score, c.maxScore);
    assert.equal(result.pendingPoints, 0);
    const timed = c.keys.T.criteria![0].cipher!;
    const text = timed.solution
      .normalize('NFD')
      .replace(/[^a-z]/gi, '')
      .toUpperCase();
    assert.equal(gradePractice(c, { T: '___' + text.slice(3) }).score, 0);
  }
});

test('new remote papers retain all image packets and exclude incompatible source answers', () => {
  for (const id of ['mypk0kixvlm', 'q7mxc-lyt3q', 'lqsqfowwqcu']) {
    assert.ok(paper(id).supplementUrl?.endsWith('/images.pdf'));
    assert.equal(paper(id).topicMatch, 'different');
  }
  const mit = paper('lqsqfowwqcu');
  assert.equal(gradePractice(mit, { '7': '1.0001', '73': '101 min' }).score, 3);
  const excluded = gradePractice(mit, { '8': '30 km/s', '10': '29.53 km/s', '16': 'high' });
  assert.equal(excluded.score, 0);
  assert.equal(excluded.pendingPoints, 0);
  const ward = paper('q7mxc-lyt3q');
  assert.equal(gradePractice(ward, { '59': '5800 K', '53': 'B' }).score, 6);
  assert.match(ward.keys['40'].criteria![0].answer, /increasing solar absorption/);
});

test('Thermodynamics covers every missing state and work/heat cell with signed free numeric checks', () => {
  const p = paper('8hoey-b0s6o');
  assert.equal(p.year, 2017);
  assert.equal(p.questions.filter((q) => /^2-[PVT]\d+$/.test(q.id)).length, 17);
  assert.equal(p.questions.filter((q) => /^2-[WQ]\d+$/.test(q.id)).length, 20);
  const typed = '  -4565 J  ';
  const result = gradePractice(
    p,
    validateAnswers(p, {
      '1-15': '-40 C',
      '2-P3': '70 atm',
      '2-W1': '5066 J',
      '2-Q2': typed,
      '2-W2': '0 J',
    }),
  );
  assert.equal(result.score, 8);
  assert.equal(result.pendingPoints, 0);
  assert.equal(result.questions.find((q) => q.id === '2-Q2')!.answer, typed);
  assert.equal(gradePractice(p, { '2-Q2': '4565 J' }).score, 0);
});

test('new genetics and anatomy papers keep source corrections and matching banks usable', () => {
  const genetics = paper('p-vah4utveu');
  assert.equal(
    gradePractice(genetics, {
      '24': '40%',
      '31': 'messenger ribonucleic acid',
      '46': 'gel electrophoresis',
    }).score,
    6,
  );
  assert.match(genetics.questions.find((q) => q.id === '27')!.prompt!, /GTA, not GUA/);
  const palo = paper('oyws8qhr8-s');
  assert.equal(gradePractice(palo, { '7': 'B', '34': 'A,B,C,D' }).score, 3);
  assert.equal(gradePractice(palo, { '34': 'A,C' }).score, 1);
  assert.match(palo.keys['22'].criteria![0].answer, /100%/);
  const islip = paper('ny-dzskly80');
  assert.equal(islip.year, 2016);
  assert.equal(islip.topicMatch, 'different');
  assert.equal(gradePractice(islip, { '93': 'C' }).score, 1);
  assert.equal(gradePractice(islip, { '93': 'D' }).score, 1);
});
