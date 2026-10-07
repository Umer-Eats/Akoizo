import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import eventRulePages from '../src/lib/event-rule-pages.json' with { type: 'json' };
import { eventsForDivision, tools } from '../src/lib/events.ts';
import { eventToolIds, rulesForEvent } from '../src/lib/event-rules.ts';
import { validateAssignment, dateInZone, eventKey, readEnrollment } from '../src/lib/domain.ts';
import { schoolCommunities } from '../src/lib/school-communities.ts';

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
test('event toolkits follow the competition format and keep Lessons first and Rules last', () => {
  for (const division of ['A', 'B', 'C'] as const) {
    for (const event of eventsForDivision(division)) {
      const ids = eventToolIds(division, event);
      assert.equal(ids[0], 'lessons');
      assert.equal(ids.at(-1), 'rules');
      const rules = rulesForEvent(division, event);
      assert.equal(rules.division, division);
      assert.ok(rules.pageRange[0] <= rules.pageRange[1]);
    }
  }
  assert.deepEqual(
    eventToolIds(
      'C',
      eventsForDivision('C').find((event) => event.id === 'engineering-cad')!,
    ),
    ['lessons', 'cad-file-grader', 'rules'],
  );
  assert.deepEqual(
    eventToolIds(
      'C',
      eventsForDivision('C').find((event) => event.id === 'experimental-design')!,
    ),
    ['lessons', 'lab-generator', 'rules'],
  );
  const thermodynamics = eventsForDivision('C').find((event) => event.id === 'thermodynamics')!;
  assert.ok(eventToolIds('C', thermodynamics).includes('video-grader'));
  assert.ok(eventToolIds('C', thermodynamics).includes('practice-tests'));
  const waterQuality = eventsForDivision('C').find((event) => event.id === 'water-quality')!;
  assert.ok(eventToolIds('C', waterQuality).includes('video-grader'));
});
test('every catalog event has its own local PDF section and complete rulebook', () => {
  for (const division of ['A', 'B', 'C'] as const) {
    const events = eventsForDivision(division);
    assert.deepEqual(
      Object.keys(eventRulePages[division]).sort(),
      events.map((event) => event.id).sort(),
    );
    for (const event of events) {
      const rules = rulesForEvent(division, event);
      for (const url of [rules.sectionUrl, rules.sourceUrl]) {
        assert.ok(url.startsWith('/rules/2027/'));
        assert.equal(
          readFileSync(new URL(`../public${url}`, import.meta.url))
            .subarray(0, 5)
            .toString(),
          '%PDF-',
        );
      }
    }
  }
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
  const instructor = {
    role: 'instructor',
    displayName: 'Teacher',
    instructorInvitePassword: 'test',
  };
  for (const schoolCommunityId of ['', 'other-florida-school', 'toString', undefined]) {
    assert.throws(
      () => readEnrollment({ ...instructor, schoolCommunityId }),
      /Choose a school community/,
    );
  }
  for (const community of schoolCommunities) {
    assert.equal(
      readEnrollment({ ...instructor, schoolCommunityId: community.id }).schoolCommunityId,
      community.id,
    );
  }
  assert.equal(
    readEnrollment({
      role: 'student',
      displayName: 'Student',
      division: 'C',
      schoolPassword: 'test',
      schoolCommunityId: 'ppcms-west',
    }).schoolCommunityId,
    undefined,
  );
});
