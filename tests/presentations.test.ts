import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { schema, eventSeeds, studyAssignmentKindsRebuild } from '../src/lib/schema.ts';
import { registerMember, dashboardFor, type Database } from '../src/lib/school-service.ts';
import type { Profile } from '../src/lib/domain.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { authoredLessonsForEvent } from '../src/lib/lessons-registry.ts';
import { deckFor, presentedLessons } from '../src/lib/presentations.ts';
import { gradeSlide, scoreDeck, slideOrder, validAnswer } from '../src/lib/presentation-grading.ts';
import {
  isActivity,
  isGraded,
  type ActivitySlide,
  type SlideAnswer,
} from '../src/lib/presentation-types.ts';
import {
  answerSlide,
  controlSession,
  finishSolo,
  hostSession,
  joinSession,
  liveSessions,
  presentationResults,
  sessionState,
} from '../src/lib/presentation-service.ts';
import { assignWork, studentWork } from '../src/lib/study-assignment-service.ts';

function fixture(statements = schema) {
  const raw = new DatabaseSync(':memory:');
  raw.exec('PRAGMA foreign_keys=ON');
  for (const sql of statements) raw.exec(sql);
  for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
  const db: Database = {
    async get(sql, ...args) {
      return raw.prepare(sql).get(...args) as Awaited<ReturnType<Database['get']>>;
    },
    async all(sql, ...args) {
      return raw.prepare(sql).all(...args) as Awaited<ReturnType<Database['all']>>;
    },
    async batch(statements) {
      raw.exec('BEGIN IMMEDIATE');
      try {
        const result = statements.map(({ sql, args }) => {
          const result = raw.prepare(sql).run(...args);
          return { rowsAffected: Number(result.changes), rows: [] };
        });
        raw.exec('COMMIT');
        return result;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
  };
  return { db, raw };
}
const identity = (uid: string) => ({ uid, email: `${uid}@example.test` });
async function school(db: Database, students: string[]) {
  const teacher = await registerMember(
    db,
    identity('teacher'),
    {
      role: 'instructor',
      displayName: 'teacher',
      instructorInvitePassword: 'invite',
      schoolCommunityId: 'ppchs',
    },
    'invite',
  );
  const members: Profile[] = [];
  for (const name of students)
    members.push(
      (
        await registerMember(
          db,
          identity(name),
          {
            role: 'student',
            displayName: name,
            division: name.startsWith('b-') ? 'B' : 'C',
            schoolPassword: teacher.credentials!.joiningPassword,
          },
          'invite',
        )
      ).profile,
    );
  return { teacher: teacher.profile, members };
}

/** The answer key of an activity, in the shape a student submits. */
function keyAnswer(slide: ActivitySlide): SlideAnswer {
  switch (slide.kind) {
    case 'mcq':
      return slide.answer;
    case 'multi':
      return slide.answers;
    case 'match':
      return slide.pairs.map((_, i) => i);
    case 'order':
      return slide.items.map((_, i) => i);
    case 'sort':
      return slide.items.map(([, bin]) => bin);
    case 'numeric':
      return slide.answer;
    case 'fill':
      return slide.blanks;
    case 'poll':
      return 0;
    case 'open':
      return 'My answer';
  }
}
const keyAnswers = (lessonId: string) =>
  Object.fromEntries(
    deckFor('C', 'remote-sensing', lessonId)!
      .slides.filter(isActivity)
      .map((slide) => [slide.id, keyAnswer(slide)]),
  );

const course = authoredLessonsForEvent('remote-sensing', 'C')!;

test('every Remote Sensing C lesson has a presentation aligned to its sections', () => {
  assert.deepEqual(
    [...presentedLessons('C', 'remote-sensing')].sort(),
    course.lessons.map((lesson) => lesson.id).sort(),
  );
  for (const lesson of course.lessons) {
    const deck = deckFor('C', 'remote-sensing', lesson.id)!;
    assert.equal(new Set(deck.slides.map((s) => s.id)).size, deck.slides.length);
    assert.equal(deck.slides[0].kind, 'title', lesson.id);
    // Every lesson section is taught by at least one slide.
    const taught = new Set(
      deck.slides.map((slide) => slide.section).filter((s) => s !== undefined),
    );
    for (let section = 0; section < lesson.sections.length; section++)
      assert.ok(taught.has(section), `${lesson.id} covers section ${section}`);
    for (const slide of deck.slides) {
      if (slide.section !== undefined) assert.ok(slide.section < lesson.sections.length, slide.id);
      if (!isActivity(slide)) continue;
      if (slide.kind === 'mcq') assert.ok(slide.answer < slide.options.length, slide.id);
      if (slide.kind === 'multi')
        assert.ok(
          slide.answers.every((a) => a < slide.options.length),
          slide.id,
        );
      if (slide.kind === 'sort')
        assert.ok(
          slide.items.every(([, b]) => b < slide.bins.length),
          slide.id,
        );
      if (slide.kind === 'fill') {
        const blanks = [...slide.text.matchAll(/\{(\d+)\}/g)].map((m) => Number(m[1]));
        assert.deepEqual(
          blanks,
          slide.blanks.map((_, i) => i),
          slide.id,
        );
      }
      const key = validAnswer(slide, keyAnswer(slide));
      assert.notEqual(key, null, `${slide.id} key is a valid answer`);
      if (isGraded(slide))
        assert.ok(gradeSlide(slide, key!).correct, `${slide.id} key grades correct`);
    }
    // A run with every key answer earns every point.
    const score = scoreDeck(deck, keyAnswers(lesson.id));
    assert.equal(score.earned, score.possible);
    assert.ok(score.possible >= 6, `${lesson.id} has enough graded activities`);
  }
});

test('grading gives partial credit and rejects malformed answers', () => {
  const deck = deckFor('C', 'remote-sensing', 'remote-u1-l1')!;
  const match = deck.slides.find((s) => s.kind === 'match') as Extract<
    ActivitySlide,
    { kind: 'match' }
  >;
  const swapped = match.pairs.map((_, i) => (i === 0 ? 1 : i === 1 ? 0 : i));
  assert.deepEqual(gradeSlide(match, swapped), {
    earned: (match.pairs.length - 2) / match.pairs.length,
    correct: false,
  });
  assert.equal(validAnswer(match, [0]), null);
  const order = deck.slides.find((s) => s.kind === 'order') as Extract<
    ActivitySlide,
    { kind: 'order' }
  >;
  assert.equal(
    validAnswer(
      order,
      order.items.map(() => 0),
    ),
    null,
    'duplicates are not an ordering',
  );
  // The starting order of an ordering activity is never already solved.
  assert.ok(slideOrder(order.id, order.items.length).some((v, i) => v !== i));
  assert.deepEqual(scoreDeck(deck, {}), {
    earned: 0,
    possible: deck.slides.filter(isGraded).length,
  });
});

test('the Presentation tab appears after Lessons on Division C events with lessons only', () => {
  let shown = 0;
  for (const event of eventsForDivision('C')) {
    const tools = eventToolIds('C', event);
    const hasLessons = !!authoredLessonsForEvent(event.id, 'C');
    assert.equal(tools.includes('presentation'), hasLessons && tools.includes('lessons'), event.id);
    if (tools.includes('presentation')) {
      shown++;
      assert.equal(tools.indexOf('presentation'), tools.indexOf('lessons') + 1);
    }
  }
  assert.ok(shown > 0);
  const remote = eventsForDivision('C').find((e) => e.id === 'remote-sensing')!;
  assert.ok(eventToolIds('C', remote).includes('presentation'));
  for (const division of ['A', 'B'] as const)
    for (const event of eventsForDivision(division))
      assert.ok(!eventToolIds(division, event).includes('presentation'), `${division}/${event.id}`);
});

const insertAssignment =
  "INSERT INTO study_assignments (id,student_id,instructor_id,event_id,kind,target_id,title,due_date,assigned_at) VALUES (?,'u','t',?,?,'remote-u1-l1','T','2999-01-01','2026-01-01')";

test('older databases keep their assignments when study_assignments learns presentations', () => {
  const old = schema.map((sql) =>
    sql.replace(
      "CHECK(kind IN ('Lesson','Unit','Lab','Presentation'))",
      "CHECK(kind IN ('Lesson','Unit','Lab'))",
    ),
  );
  assert.notDeepEqual(old, schema);
  const { raw } = fixture(old);
  const event = (raw.prepare('SELECT id FROM events LIMIT 1').get() as { id: string }).id;
  raw.exec("INSERT INTO schools (id,name,password_hash) VALUES ('s','School','x')");
  raw.exec(
    "INSERT INTO users (id,firebase_uid,email,role,school_id,division) VALUES ('u','fu','u@x','student','s','C'),('t','ft','t@x','instructor','s',NULL)",
  );
  raw.prepare(insertAssignment).run('a1', event, 'Lesson');
  assert.throws(() => raw.prepare(insertAssignment).run('a2', event, 'Presentation'));
  raw.exec('BEGIN');
  for (const sql of studyAssignmentKindsRebuild) raw.exec(sql);
  raw.exec('COMMIT');
  raw.prepare(insertAssignment).run('a2', event, 'Presentation');
  assert.deepEqual(
    raw
      .prepare('SELECT id,kind FROM study_assignments ORDER BY id')
      .all()
      .map((row) => ({ ...row })),
    [
      { id: 'a1', kind: 'Lesson' },
      { id: 'a2', kind: 'Presentation' },
    ],
  );
  const table = raw
    .prepare("SELECT sql FROM sqlite_master WHERE name='study_assignments'")
    .get() as { sql: string };
  assert.match(table.sql, /'Presentation'/);
});

test('a self-paced presentation is graded on the server and completes its assignment', async () => {
  const { db } = fixture();
  const { teacher, members } = await school(db, ['amy', 'ben']);
  const [amy, ben] = members;
  const lessonId = 'remote-u2-l1';
  await assignWork(db, teacher, {
    action: 'assign',
    division: 'C',
    eventId: 'remote-sensing',
    kind: 'Presentation',
    targetId: lessonId,
    studentIds: [amy.id, ben.id],
    due: '2999-01-01',
    timeZone: 'UTC',
  });
  const [pending] = (await dashboardFor(db, amy)).assignments;
  assert.equal(pending.type, 'Presentation');
  assert.ok(!pending.completedAt);

  const deck = deckFor('C', 'remote-sensing', lessonId)!;
  const score = await finishSolo(db, amy, {
    eventId: 'remote-sensing',
    lessonId,
    answers: keyAnswers(lessonId),
  });
  assert.equal(score.earned, score.possible);
  const [done] = (await dashboardFor(db, amy)).assignments;
  assert.ok(done.completedAt, 'the assignment is complete');
  assert.ok(!(await dashboardFor(db, ben)).assignments[0].completedAt);

  // A weaker later run does not replace the best result.
  await finishSolo(db, amy, { eventId: 'remote-sensing', lessonId, answers: {} });
  const [result] = await presentationResults(db, amy, 'remote-sensing');
  assert.equal(result.earned, deck.slides.filter(isGraded).length);
  assert.ok(result.completedAt);
  const work = await studentWork(db, teacher, amy.id);
  const record = work.find((w) => w.type === 'Presentation')!;
  assert.equal(record.title, course.lessons.find((l) => l.id === lessonId)!.title);

  // Instructors previewing are graded without a record.
  const lead = { ...teacher, division: 'C' as const };
  await finishSolo(db, lead, { eventId: 'remote-sensing', lessonId, answers: {} });
  assert.deepEqual(await presentationResults(db, lead, 'remote-sensing'), []);
  await assert.rejects(
    finishSolo(db, amy, { eventId: 'remote-sensing', lessonId: 'nope', answers: {} }),
  );
});

test('a live presentation is hosted, joined by code, paced by the host, and recorded on end', async () => {
  const { db } = fixture();
  const { teacher, members } = await school(db, ['amy', 'ben', 'cal', 'b-eve']);
  const [amy, ben, cal, eve] = members;
  const lessonId = 'remote-u1-l1';
  const deck = deckFor('C', 'remote-sensing', lessonId)!;
  const { id, code } = await hostSession(db, amy, { eventId: 'remote-sensing', lessonId });
  assert.match(code, /^[A-Z2-9]{6}$/);
  assert.deepEqual(
    (await liveSessions(db, ben, 'remote-sensing')).map((s) => s.code),
    [code],
  );

  assert.equal((await joinSession(db, ben, { code: code.toLowerCase() })).id, id);
  await assert.rejects(joinSession(db, eve, { code }));
  await assert.rejects(joinSession(db, ben, { code: 'ZZZZZZ' }));
  await assert.rejects(sessionState(db, cal, id));
  await assert.rejects(controlSession(db, ben, { id, slide: 3 }), /Only the host/);

  // The host moves to the first graded activity; answers to other slides are refused.
  const graded = deck.slides.findIndex((s) => isGraded(s));
  const slide = deck.slides[graded] as ActivitySlide;
  await controlSession(db, amy, { id, slide: graded });
  const other = deck.slides.find((s, i) => i !== graded && isActivity(s)) as ActivitySlide;
  await assert.rejects(answerSlide(db, ben, { id, slideId: other.id, answer: keyAnswer(other) }));
  await answerSlide(db, ben, { id, slideId: slide.id, answer: keyAnswer(slide) });
  await answerSlide(db, amy, { id, slideId: slide.id, answer: keyAnswer(slide) });

  const view = await sessionState(db, ben, id);
  assert.equal(view.slide, graded);
  assert.equal(view.isHost, false);
  assert.equal(view.tally!.answered, 2);
  assert.equal(view.members.length, 2);
  assert.ok(view.members.every((m) => m.answered));

  await controlSession(db, amy, { id, revealed: true });
  assert.equal((await sessionState(db, ben, id)).revealed, true);
  await assert.rejects(answerSlide(db, ben, { id, slideId: slide.id, answer: keyAnswer(slide) }));
  // Moving on hides the answers again.
  await controlSession(db, amy, { id, slide: graded + 1 });
  assert.equal((await sessionState(db, amy, id)).revealed, false);

  await controlSession(db, amy, { id, action: 'end' });
  const ended = await sessionState(db, ben, id);
  assert.equal(ended.status, 'ended');
  assert.deepEqual(ended.score, { earned: 1, possible: deck.slides.filter(isGraded).length });
  assert.deepEqual(await liveSessions(db, ben, 'remote-sensing'), []);
  for (const student of [amy, ben]) {
    const [result] = await presentationResults(db, student, 'remote-sensing');
    assert.deepEqual(
      { ...result, completedAt: null },
      {
        lessonId,
        earned: 1,
        possible: deck.slides.filter(isGraded).length,
        answered: 1,
        completedAt: null,
      },
    );
  }
  assert.deepEqual(await presentationResults(db, cal, 'remote-sensing'), []);

  // An instructor can host for the class; only the students are recorded.
  const lead = { ...teacher, division: 'C' as const };
  const session = await hostSession(db, lead, { eventId: 'remote-sensing', lessonId });
  await joinSession(db, cal, { code: session.code });
  await controlSession(db, lead, { id: session.id, action: 'end' });
  assert.deepEqual(
    await presentationResults(db, cal, 'remote-sensing'),
    [],
    'joining without answering records nothing',
  );
  assert.deepEqual(await presentationResults(db, lead, 'remote-sensing'), []);
});

test('the best score on each slide adds up across sessions and days to complete a deck', async () => {
  const { db } = fixture();
  const { teacher, members } = await school(db, ['amy', 'ben']);
  const [amy, ben] = members;
  const lead = { ...teacher, division: 'C' as const };
  const lessonId = 'remote-u3-l1';
  const deck = deckFor('C', 'remote-sensing', lessonId)!;
  const graded = deck.slides.flatMap((slide, index) => (isGraded(slide) ? [index] : []));
  const half = Math.ceil(graded.length / 2);
  await assignWork(db, teacher, {
    action: 'assign',
    division: 'C',
    eventId: 'remote-sensing',
    kind: 'Presentation',
    targetId: lessonId,
    studentIds: [amy.id],
    due: '2999-01-01',
    timeZone: 'UTC',
  });
  // A wrong answer: any other choice, or an empty fill-in.
  const wrong = (slide: ActivitySlide): SlideAnswer =>
    slide.kind === 'mcq'
      ? (slide.answer + 1) % slide.options.length
      : slide.kind === 'fill'
        ? slide.blanks.map(() => 'zzz')
        : slide.kind === 'numeric'
          ? slide.answer + 1000
          : keyAnswer(slide);
  async function answer(
    sessionId: string,
    index: number,
    value: (slide: ActivitySlide) => SlideAnswer,
  ) {
    await controlSession(db, lead, { id: sessionId, slide: index });
    const slide = deck.slides[index] as ActivitySlide;
    await answerSlide(db, amy, { id: sessionId, slideId: slide.id, answer: value(slide) });
  }

  // Day one: the first half, the opening activity answered wrong. The teacher leaves without ending.
  const day1 = await hostSession(db, lead, { eventId: 'remote-sensing', lessonId });
  await joinSession(db, amy, { code: day1.code });
  await answer(day1.id, graded[0], wrong);
  for (const index of graded.slice(1, half)) await answer(day1.id, index, keyAnswer);
  let [standing] = await presentationResults(db, amy, 'remote-sensing');
  const firstWrong = gradeSlide(
    deck.slides[graded[0]] as ActivitySlide,
    wrong(deck.slides[graded[0]] as ActivitySlide),
  ).earned;
  assert.deepEqual(standing, {
    lessonId,
    earned: half - 1 + firstWrong,
    possible: graded.length,
    answered: half,
    completedAt: null,
  });
  assert.ok(
    !(await dashboardFor(db, amy)).assignments[0].completedAt,
    'half a deck is not complete',
  );

  // Day two: a new session (which ends the old one). Amy fixes the first activity and does the rest;
  // a worse answer to a slide she already had right does not lower her score.
  const day2 = await hostSession(db, lead, { eventId: 'remote-sensing', lessonId });
  assert.equal((await sessionState(db, amy, day1.id)).status, 'ended');
  await joinSession(db, amy, { code: day2.code });
  await answer(day2.id, graded[0], keyAnswer);
  await answer(day2.id, graded[1], wrong);
  for (const index of graded.slice(half)) await answer(day2.id, index, keyAnswer);
  [standing] = await presentationResults(db, amy, 'remote-sensing');
  assert.equal(standing.earned, graded.length);
  assert.equal(standing.answered, graded.length);
  assert.ok(standing.completedAt);
  assert.ok((await dashboardFor(db, amy)).assignments[0].completedAt, 'the assignment completes');
  const work = await studentWork(db, teacher, amy.id);
  assert.equal(work.find((w) => w.type === 'Presentation')!.score, graded.length);

  // The ended screen shows the session's own score and the running total.
  await controlSession(db, lead, { id: day2.id, action: 'end' });
  const ended = await sessionState(db, amy, day2.id);
  assert.ok(ended.score!.earned < graded.length);
  assert.deepEqual(ended.total, {
    earned: graded.length,
    possible: graded.length,
    answered: graded.length,
  });

  // Solo runs add to the same total: Ben does half alone and half live.
  const soloHalf = Object.fromEntries(
    graded
      .slice(0, half)
      .map((index) => [deck.slides[index].id, keyAnswer(deck.slides[index] as ActivitySlide)]),
  );
  const run = await finishSolo(db, ben, { eventId: 'remote-sensing', lessonId, answers: soloHalf });
  assert.deepEqual(run.total, { earned: half, possible: graded.length, answered: half });
  const day3 = await hostSession(db, lead, { eventId: 'remote-sensing', lessonId });
  await joinSession(db, ben, { code: day3.code });
  for (const index of graded.slice(half)) {
    await controlSession(db, lead, { id: day3.id, slide: index });
    const slide = deck.slides[index] as ActivitySlide;
    await answerSlide(db, ben, { id: day3.id, slideId: slide.id, answer: keyAnswer(slide) });
  }
  const [benStanding] = await presentationResults(db, ben, 'remote-sensing');
  assert.equal(benStanding.earned, graded.length);
  assert.ok(benStanding.completedAt);
});

test('presentation images are found files with sources, with no explorers or drawn diagrams', async () => {
  const { existsSync } = await import('node:fs');
  const { presentationPhotos } = await import('../src/lib/presentation-photos.ts');
  const used = new Set<string>();
  let figures = 0;
  for (const lesson of course.lessons) {
    const deck = deckFor('C', 'remote-sensing', lesson.id)!;
    for (const slide of deck.slides) {
      assert.ok(!['explore', 'diagram'].includes(slide.kind as string), slide.id);
      assert.ok(!('diagram' in slide), `${slide.id} has no drawn diagram`);
      if (slide.kind === 'figure') figures++;
      if (
        (slide.kind === 'bullets' || slide.kind === 'title' || slide.kind === 'figure') &&
        slide.image
      )
        used.add(slide.image);
    }
  }
  assert.ok(figures >= 20, `published figures replace the drawn diagrams (${figures})`);
  assert.ok(
    !existsSync('src/components/presentation-diagrams.tsx'),
    'the drawn diagram component is gone',
  );
  assert.ok(used.size >= 35, `images are used across the decks (${used.size})`);
  for (const [id, photo] of Object.entries(presentationPhotos)) {
    assert.ok(existsSync(`public/presentations/${photo.file}`), `${id} file exists`);
    assert.match(
      photo.source,
      /^https:\/\/(commons\.wikimedia\.org|en\.wikipedia\.org|images\.nasa\.gov)\//,
      id,
    );
    assert.ok(photo.alt && photo.caption && photo.credit, id);
    assert.ok(used.has(id), `${id} is used on a slide`);
  }
});
