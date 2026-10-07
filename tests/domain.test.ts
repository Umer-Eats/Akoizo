import test from 'node:test';
import assert from 'node:assert/strict';
import { eventsForDivision, tools } from '../src/lib/events.ts';
import { validateAssignment, dateInZone, eventKey, readEnrollment } from '../src/lib/domain.ts';

test('division slates follow the two national lists and the supplied Florida manual', () => {
  for (const division of ['B', 'C'] as const) {
    assert.equal(eventsForDivision(division).length, 23);
    assert.equal(new Set(eventsForDivision(division).map((event) => event.id)).size, 23);
  }
  const elementary = eventsForDivision('A');
  assert.equal(elementary.length, 17);
  assert.equal(elementary.filter((event) => !event.special).length, 15);
  assert.deepEqual(
    elementary.filter((event) => event.special).map((event) => event.name),
    ['Shelby Jacobs Rocketry', 'Professor Jensen’s Potions'],
  );
  assert.equal(elementary.find((event) => event.id === 'progamers')?.type, 'Skill');
  assert.equal(
    eventsForDivision('B').some((event) => event.id === 'astronomy'),
    false,
  );
  assert.equal(
    eventsForDivision('C').some((event) => event.id === 'solar-system'),
    false,
  );
  assert.notEqual(eventKey('B', 'circuit-lab'), eventKey('C', 'circuit-lab'));
  assert.equal(new Set(tools.map((tool) => tool.id)).size, 7);
});
test('assignments reject wrong divisions, invalid test types, and past or impossible dates', () => {
  for (const [division, event, type, due] of [
    ['B', 'astronomy', 'Practice', '2027-01-02'],
    ['A', 'solar-system', 'Practice', '2027-01-02'],
    ['C', 'astronomy', 'Anything', '2027-01-02'],
    ['C', 'astronomy', 'Practice', '2027-02-31'],
    ['C', 'astronomy', 'Practice', '2026-12-31'],
    ['C', 'astronomy', 'Practice', 'invalid'],
  ] as const)
    assert.throws(() => validateAssignment(division, event, type, due, '2027-01-01'));
  assert.equal(
    validateAssignment('A', 'aerodynamics', 'Ranked', '2027-01-01', '2027-01-01').type,
    'Ranked',
  );
  assert.equal(dateInZone('America/New_York', new Date('2027-01-02T02:00:00Z')), '2027-01-01');
  assert.throws(() => dateInZone('invalid'));
});
test('enrollment input validation excludes unsupported roles and divisions', () => {
  assert.throws(() => readEnrollment({ role: 'admin' }));
  assert.throws(() =>
    readEnrollment({ role: 'student', displayName: 'A', division: 'D', schoolPassword: 'x' }),
  );
  assert.throws(() =>
    readEnrollment({ role: 'instructor', displayName: 'A', instructorInvitePassword: '' }),
  );
  assert.equal(
    readEnrollment({ role: 'student', displayName: ' Alex ', division: 'A', schoolPassword: 'x' })
      .displayName,
    'Alex',
  );
});
