import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { practiceTests } from '../src/lib/practice-catalog.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { gradePractice } from '../src/lib/practice-grading.ts';

const forms = practiceTests.filter((p) => p.id.startsWith('akoizo-2027-rotation-'));
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url));
const sha = (data: Uint8Array) => createHash('sha256').update(data).digest('hex');
const clean = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, '');

test('all 46 B/C libraries have five current-topic papers independently of historical papers', () => {
  assert.equal(forms.length, 44);
  assert.equal(
    forms.reduce((n, p) => n + p.questionCount, 0),
    880,
  );
  for (const division of ['B', 'C'] as const)
    for (const event of eventsForDivision(division))
      assert.ok(
        practiceTests.filter(
          (p) => p.division === division && p.eventId === event.id && p.topicMatch === 'current',
        ).length >= 5,
        `${division}/${event.id}`,
      );
});

test('each new field has rule evidence tied to the actual 2027 rules and a verified PDF/key', () => {
  const audit = JSON.parse(read('documents/practice-rotation-2027-audit.json').toString());
  const assets = JSON.parse(read('documents/practice-rotation-2027-assets.json').toString());
  for (const p of forms) {
    const entry = audit.find((a: { id: string }) => a.id === p.id);
    assert.equal(entry.rulesSha256, sha(read('public' + entry.rulesUrl)));
    assert.equal(
      entry.questionFingerprint,
      sha(Buffer.from(JSON.stringify(p.questions.map((q) => [q.prompt, q.context, q.options])))),
    );
    assert.equal(entry.fields.length, p.questionCount);
    assert.ok(entry.fields.every((f: { ruleClause: string }) => f.ruleClause?.length));
    for (const asset of assets.find((a: { id: string }) => a.id === p.id).assets) {
      assert.equal(sha(read(`public/practice/${p.id}/${asset.role}.pdf`)), asset.sha256);
      if (asset.role === 'test') assert.ok(p.questions.every((q) => q.page <= asset.pages));
    }
    const answers = Object.fromEntries(
      p.questions.map((q) => [
        q.id,
        q.type === 'mcq'
          ? p.keys[q.id].correctOption!
          : p.keys[q.id]
              .criteria!.map((c) => (c.numeric ? String(c.numeric.value) : c.answer))
              .join('\n'),
      ]),
    );
    const graded = gradePractice(p, answers);
    for (const q of p.questions)
      if (q.type === 'mcq' || p.keys[q.id].criteria?.every((c) => c.numeric || c.cipher))
        assert.equal(
          graded.questions.find((g) => g.id === q.id)!.earned,
          q.points,
          `${p.id}/${q.id}`,
        );
  }
});

test('rotation-specific exclusions and section weights survive catalog generation', () => {
  for (const p of forms) {
    const text = p.questions.map((q) => q.prompt + ' ' + q.context).join('\n');
    assert.doesNotMatch(text, /\uFFFD|NaN|undefined data/);
    if (p.eventId === 'chemistry-lab') {
      assert.doesNotMatch(text, /titration|buffer pH|electrochemical cell/i);
      assert.equal(
        p.questions.slice(0, 10).reduce((n, q) => n + q.points, 0),
        p.maxScore / 2,
      );
      assert.match(text, /initial-rate/);
    }
    if (p.eventId === 'circuit-lab')
      assert.doesNotMatch(text, /capacitance|inductance|reactance|Thevenin/i);
    if (p.eventId === 'codebusters') assert.doesNotMatch(text, /Caesar|Atbash|Affine/i);
    if (p.eventId === 'meteorology')
      assert.equal(p.questions.filter((q) => q.context?.includes('|')).length >= 10, true);
    if (p.eventId === 'water-quality')
      assert.deepEqual(
        [6, 6, 6, 2].map((n) => (n * 2) / p.maxScore),
        [0.3, 0.3, 0.3, 0.1],
      );
    if (p.eventId === 'protein-modeling') assert.match(text, /153.*252/);
    for (const key of Object.values(p.keys))
      for (const c of key.criteria ?? [])
        if (c.numeric && c.numeric.value !== 0)
          assert.ok(c.numeric.tolerance < Math.abs(c.numeric.value), p.id);
  }
});

test('substitution puzzles independently decode with allowed deranged K2 alphabets', () => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (const p of forms.filter((p) => p.eventId === 'codebusters'))
    for (const id of ['1', '2', '3']) {
      const q = p.questions.find((q) => q.id === id)!;
      const key = q.context!.match(/Cipher alphabet[^:]*: ([A-Z]{26})/)![1];
      assert.equal(new Set(key).size, 26);
      assert.ok([...key].every((c, i) => c !== abc[i]));
      if (id !== '1') {
        assert.match(q.context!, /K2/);
        const word = ['SCIENCE', 'OBSERVATION', 'EXPERIMENT', 'LABORATORY'][
          Number(p.id.slice(-1)) - 1
        ];
        const keyed = [...new Set(word + abc)].join('');
        assert.ok((keyed + keyed).includes(key));
      }
      const ciphertext = clean(q.prompt!.slice(q.prompt!.indexOf(':') + 1));
      assert.equal(
        [...ciphertext].map((c) => abc[key.indexOf(c)]).join(''),
        clean(p.keys[id].criteria![0].cipher!.solution),
      );
    }
});

test('columnar, Polybius and Porta puzzles independently recover their supplied plaintext', () => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    poly = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  for (const p of forms.filter((p) => p.eventId === 'codebusters')) {
    const answer = (id: string) => clean(p.keys[id].criteria![0].cipher!.solution);
    const ciphertext = (id: string) =>
      p.questions
        .find((q) => q.id === id)!
        .prompt!.split(': ')
        .at(-1)!;
    const coords = (c: string) => {
      const i = poly.indexOf(c);
      return 10 * (1 + Math.floor(i / 5)) + 1 + (i % 5);
    };
    const nums = ciphertext('5').split(' ').map(Number);
    const decoded = nums
      .map((n, i) => {
        const value = n - coords('DATA'[i % 4]);
        return poly[(Math.floor(value / 10) - 1) * 5 + (value % 10) - 1];
      })
      .join('');
    assert.equal(decoded, answer('5'));
    assert.equal(
      ciphertext('6')
        .split(' ')
        .map((s) => poly['ABCDE'.indexOf(s[0]) * 5 + 'VWXYZ'.indexOf(s[1])])
        .join(''),
      answer('6'),
    );
    const columns = ciphertext('7').split(' '),
      matches = [];
    for (let a = 0; a < 4; a++)
      for (let b = 0; b < 4; b++)
        for (let c = 0; c < 4; c++)
          for (let d = 0; d < 4; d++) {
            if (new Set([a, b, c, d]).size !== 4) continue;
            const text = Array.from({ length: columns[0].length }, (_, i) =>
              [a, b, c, d].map((j) => columns[j][i]).join(''),
            ).join('');
            if (text.startsWith('STAR')) matches.push(text);
          }
    assert.ok(matches.includes(answer('7')));
    const context = p.questions.find((q) => q.id === '15')!.context!;
    const rows = Object.fromEntries(
      [...context.matchAll(/([A-Z]{2})=([A-Z]{26})/g)].map((m) => [m[1], m[2]]),
    );
    assert.equal(
      [...clean(ciphertext('15'))]
        .map((c, i) => {
          const r = Math.floor(abc.indexOf('SCIENCE'[i % 7]) / 2);
          const pair = abc.slice(r * 2, r * 2 + 2);
          return rows[pair][abc.indexOf(c)];
        })
        .join(''),
      answer('15'),
    );
  }
});
