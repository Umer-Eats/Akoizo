import test from 'node:test';
import assert from 'node:assert/strict';
import { eventsForDivision } from '../src/lib/events.ts';
import { members, filterRankings, validateAssignment } from '../src/lib/demo.ts';
test('national event slates have 23 unique events, with separate B and C offerings', () => {
  for (const d of ['B', 'C'] as const) {
    const events = eventsForDivision(d);
    assert.equal(events.length, 23);
    assert.equal(new Set(events.map((e) => e.id)).size, 23);
  }
  assert.ok(eventsForDivision('C').some((e) => e.name === 'Astronomy'));
  assert.ok(!eventsForDivision('B').some((e) => e.name === 'Astronomy'));
  assert.ok(eventsForDivision('B').some((e) => e.name === 'Solar System'));
  assert.deepEqual(eventsForDivision('A'), []);
});
test('sample school ranking includes only matching school and division; search preserves rank', () => {
  const list = filterRankings(members, { division: 'C', query: '', school: 'Cedar Academy' });
  assert.equal(list.length, 2);
  assert.ok(list.every((m) => m.school === 'Cedar Academy' && m.division === 'C'));
  const search = filterRankings(members, { division: 'C', query: 'novanotes' });
  assert.equal(search[0].rank, 4);
  assert.equal(filterRankings(members, { division: 'All', query: 'no-such-member' }).length, 0);
});
test('assignment validation rejects wrong division, past dates, impossible dates, and unconfigured A events', () => {
  const student = members.find((m) => m.division === 'B')!;
  const ids = eventsForDivision('B').map((e) => e.id);
  assert.ok(validateAssignment(student, ids, 'astronomy', '2027-01-02', '2027-01-01'));
  assert.ok(validateAssignment(student, ids, 'solar-system', '2026-12-31', '2027-01-01'));
  assert.ok(validateAssignment(student, ids, 'solar-system', '2027-02-31', '2027-01-01'));
  assert.equal(validateAssignment(student, ids, 'solar-system', '2027-01-01', '2027-01-01'), null);
  assert.ok(
    validateAssignment(
      members.find((m) => m.division === 'A')!,
      [],
      'astronomy',
      '2027-01-02',
      '2027-01-01',
    ),
  );
});
