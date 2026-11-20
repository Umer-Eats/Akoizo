import { randomInt, randomUUID } from 'node:crypto';
import { AppError, eventKey, type Profile } from './domain.ts';
import { eventsForDivision, type Division } from './events.ts';
import { gradeSlide, scoreDeck, validAnswer } from './presentation-grading.ts';
import { isActivity, isGraded, type ActivitySlide, type Deck } from './presentation-types.ts';
import { deckFor } from './presentations.ts';
import type { Database } from './school-service.ts';
import { settlePresentations } from './study-assignment-service.ts';

/** Members drop from the live roster after this long without polling. */
const ACTIVE_MS = 30_000;
/** Live sessions are listed for joining for this long after their host was last seen. */
const LISTED_MS = 3 * 60 * 60 * 1000;
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** A student's standing on one deck: the best score on each graded activity, summed. */
export type PresentationProgress = {
  /** Sum of the best score earned on each graded activity, across every run and session. */
  earned: number;
  /** Graded activities in the deck (one point each). */
  possible: number;
  /** Graded activities the student has answered at least once. */
  answered: number;
};

export type PresentationResult = PresentationProgress & {
  lessonId: string;
  /** Set once every graded activity has been answered; the deck then counts as complete. */
  completedAt: string | null;
};

export type LiveSummary = {
  id: string;
  code: string;
  lessonId: string;
  hostName: string;
  members: number;
  createdAt: string;
};

/** What every member of a live session sees on each poll. */
export type LiveState = {
  id: string;
  code: string;
  eventId: string;
  lessonId: string;
  hostName: string;
  isHost: boolean;
  slide: number;
  revealed: boolean;
  status: 'live' | 'ended';
  members: { id: string; name: string; active: boolean; answered: boolean; host: boolean }[];
  /** Responses to the current slide, when it is an activity. */
  tally: {
    answered: number;
    /** Choices per option for multiple choice, select-all and polls. */
    options: number[] | null;
    /** Students fully correct, and the average share earned, for graded activities. */
    correct: number;
    average: number;
    /** Written responses, shared once the host reveals them. */
    responses: { name: string; text: string }[];
  } | null;
  /** This member's answers so far, by slide id. */
  mine: Record<string, unknown>;
  /** This member's score in this session once the host ends it. */
  score: { earned: number; possible: number } | null;
  /** A student's best-of-every-session standing on the deck once the session ends. */
  total: PresentationProgress | null;
};

/** The member's division event and its deck. Instructors use the division they are viewing. */
function deckOf(profile: Profile, eventId: unknown, lessonId: unknown) {
  if (!profile.division) throw new AppError(403, 'Choose a division first.');
  const division: Division = profile.division;
  const event = eventsForDivision(division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  const deck = typeof lessonId === 'string' ? deckFor(division, event.id, lessonId) : null;
  if (!deck) throw new AppError(404, 'That presentation is not available yet.');
  return { division, eventId: event.id, key: eventKey(division, event.id), deck };
}

const parseAnswers = (raw: unknown) =>
  raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

const round = (value: number) => Math.round(value * 100) / 100;

/** Sum the best per-slide scores over the deck's graded activities. */
function progressOf(deck: Deck, best: Map<string, number>): PresentationProgress {
  const graded = deck.slides.filter(isGraded);
  let earned = 0;
  let answered = 0;
  for (const slide of graded) {
    const score = best.get(slide.id);
    if (score === undefined) continue;
    answered++;
    earned += score;
  }
  return { earned: round(earned), possible: graded.length, answered };
}

async function deckProgress(db: Database, studentId: string, key: string, deck: Deck) {
  const rows = await db.all(
    'SELECT slide_id,earned FROM presentation_slide_scores WHERE student_id=? AND event_id=? AND lesson_id=?',
    studentId,
    key,
    deck.lessonId,
  );
  return progressOf(deck, new Map(rows.map((row) => [String(row.slide_id), Number(row.earned)])));
}

/**
 * Raise a student's best score on each answered slide, whichever run or session it came from.
 * Once every graded activity has a score the deck is complete: its result is the sum of the
 * best scores, and any assignment for it is completed.
 */
async function recordSlides(
  db: Database,
  studentId: string,
  key: string,
  deck: Deck,
  mode: 'solo' | 'live',
  scores: { slideId: string; earned: number }[],
) {
  if (!scores.length) return deckProgress(db, studentId, key, deck);
  const now = new Date().toISOString();
  await db.batch(
    scores.map(({ slideId, earned }) => ({
      sql: `INSERT INTO presentation_slide_scores (student_id,event_id,lesson_id,slide_id,earned,mode,updated_at)
        VALUES (?,?,?,?,?,?,?)
        ON CONFLICT(student_id,event_id,lesson_id,slide_id) DO UPDATE SET
          earned=MAX(presentation_slide_scores.earned, excluded.earned),
          mode=CASE WHEN excluded.earned > presentation_slide_scores.earned THEN excluded.mode ELSE presentation_slide_scores.mode END,
          updated_at=CASE WHEN excluded.earned > presentation_slide_scores.earned THEN excluded.updated_at ELSE presentation_slide_scores.updated_at END`,
      args: [studentId, key, deck.lessonId, slideId, earned, mode, now],
    })),
    'immediate',
  );
  const progress = await deckProgress(db, studentId, key, deck);
  if (progress.answered < progress.possible) return progress;
  // The first completion keeps its date; later improvements only raise the score.
  await db.batch(
    [
      {
        sql: `INSERT INTO presentation_results (student_id,event_id,lesson_id,mode,score,max_score,completed_at)
          VALUES (?,?,?,?,?,?,?)
          ON CONFLICT(student_id,event_id,lesson_id) DO UPDATE SET
            score=MAX(presentation_results.score, excluded.score),max_score=excluded.max_score`,
        args: [studentId, key, deck.lessonId, mode, progress.earned, progress.possible, now],
      },
    ],
    'immediate',
  );
  await settlePresentations(db, key, [studentId]);
  return progress;
}

/** The student's standing on every presentation they have started in one event. Instructors see none. */
export async function presentationResults(
  db: Database,
  profile: Profile,
  eventId: unknown,
): Promise<PresentationResult[]> {
  if (profile.role !== 'student' || !profile.division) return [];
  const division = profile.division;
  const event = eventsForDivision(division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  const key = eventKey(division, event.id);
  const [slides, finished] = await Promise.all([
    db.all(
      'SELECT lesson_id,slide_id,earned FROM presentation_slide_scores WHERE student_id=? AND event_id=?',
      profile.id,
      key,
    ),
    db.all(
      'SELECT lesson_id,score,completed_at FROM presentation_results WHERE student_id=? AND event_id=?',
      profile.id,
      key,
    ),
  ]);
  const best = new Map<string, Map<string, number>>();
  for (const row of slides) {
    const lesson = String(row.lesson_id);
    if (!best.has(lesson)) best.set(lesson, new Map());
    best.get(lesson)!.set(String(row.slide_id), Number(row.earned));
  }
  const done = new Map(finished.map((row) => [String(row.lesson_id), row]));
  const results: PresentationResult[] = [];
  for (const lessonId of new Set([...best.keys(), ...done.keys()])) {
    const deck = deckFor(division, event.id, lessonId);
    if (!deck) continue;
    const progress = progressOf(deck, best.get(lessonId) ?? new Map());
    const row = done.get(lessonId);
    results.push({
      lessonId,
      ...progress,
      // A completed deck stays complete even if its slides are later revised.
      earned: row ? Math.max(progress.earned, Number(row.score)) : progress.earned,
      answered: row ? progress.possible : progress.answered,
      completedAt: row ? String(row.completed_at) : null,
    });
  }
  return results;
}

/** Grade the graded activities a member answered; unanswered or malformed ones are skipped. */
function slideScores(deck: Deck, answers: Record<string, unknown>) {
  return deck.slides.filter(isGraded).flatMap((slide) => {
    const answer = validAnswer(slide, answers[slide.id]);
    return answer === null ? [] : [{ slideId: slide.id, earned: gradeSlide(slide, answer).earned }];
  });
}

/**
 * Finish a self-paced run: the answers are graded here against the deck. The run's score is
 * returned with the student's total, which keeps the best score of each slide from every run.
 */
export async function finishSolo(db: Database, profile: Profile, body: Record<string, unknown>) {
  const { key, deck } = deckOf(profile, body.eventId, body.lessonId);
  const answers = parseAnswers(body.answers);
  const score = scoreDeck(deck, answers);
  // An instructor previewing the presentation is graded without anything being recorded.
  const total =
    profile.role === 'student'
      ? await recordSlides(db, profile.id, key, deck, 'solo', slideScores(deck, answers))
      : null;
  return { ...score, total };
}

async function sessionRow(db: Database, profile: Profile, id: unknown) {
  if (typeof id !== 'string' || !id || id.length > 64) throw new AppError(400, 'Choose a session.');
  const row = await db.get(
    `SELECT s.*,u.display_name AS host_name FROM presentation_sessions s JOIN users u ON u.id=s.host_id
     WHERE s.id=? AND s.school_id=?`,
    id,
    profile.schoolId,
  );
  if (!row) throw new AppError(404, 'That presentation has ended or is not at your school.');
  return row;
}

function sessionDeck(row: Record<string, unknown>) {
  const [, division, ...rest] = String(row.event_id).split(':') as [string, Division, string];
  const eventId = rest.join(':');
  const deck = deckFor(division, eventId, String(row.lesson_id));
  if (!deck) throw new AppError(409, 'This presentation is no longer offered.');
  return { division, eventId, deck };
}

/** Host a live presentation. A member hosts one at a time, so an older live session is ended. */
export async function hostSession(db: Database, profile: Profile, body: Record<string, unknown>) {
  const { key, deck } = deckOf(profile, body.eventId, body.lessonId);
  const previous = await db.all(
    "SELECT id FROM presentation_sessions WHERE host_id=? AND status='live'",
    profile.id,
  );
  for (const row of previous) await endSession(db, profile, String(row.id));
  const id = randomUUID();
  const now = new Date().toISOString();
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = Array.from(
      { length: 6 },
      () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)],
    ).join('');
    try {
      await db.batch(
        [
          {
            sql: `INSERT INTO presentation_sessions (id,code,school_id,host_id,event_id,lesson_id,slide,revealed,status,created_at,updated_at)
              VALUES (?,?,?,?,?,?,0,0,'live',?,?)`,
            args: [id, code, profile.schoolId, profile.id, key, deck.lessonId, now, now],
          },
          {
            sql: 'INSERT INTO presentation_members (session_id,user_id,display_name,joined_at,last_seen) VALUES (?,?,?,?,?)',
            args: [id, profile.id, profile.displayName || 'Host', now, Date.now()],
          },
        ],
        'immediate',
      );
      return { id, code };
    } catch (error) {
      if (!(error instanceof Error) || !/UNIQUE constraint failed/i.test(error.message))
        throw error;
    }
  }
  throw new AppError(503, 'Could not create a join code. Try again.');
}

/** Live sessions of this event at the member's school that are open to join. */
export async function liveSessions(
  db: Database,
  profile: Profile,
  eventId: unknown,
): Promise<LiveSummary[]> {
  if (!profile.division) throw new AppError(403, 'Choose a division first.');
  const event = eventsForDivision(profile.division).find((candidate) => candidate.id === eventId);
  if (!event) throw new AppError(400, 'Choose an event from your division.');
  const since = new Date(Date.now() - LISTED_MS).toISOString();
  const rows = await db.all(
    `SELECT s.id,s.code,s.lesson_id,s.created_at,u.display_name,
       (SELECT COUNT(*) FROM presentation_members m WHERE m.session_id=s.id AND m.last_seen>?) AS members
     FROM presentation_sessions s JOIN users u ON u.id=s.host_id
     WHERE s.school_id=? AND s.event_id=? AND s.status='live' AND s.updated_at>?
     ORDER BY s.created_at DESC LIMIT 30`,
    Date.now() - ACTIVE_MS,
    profile.schoolId,
    eventKey(profile.division, event.id),
    since,
  );
  return rows.map((row) => ({
    id: String(row.id),
    code: String(row.code),
    lessonId: String(row.lesson_id),
    hostName: String(row.display_name || 'A classmate'),
    members: Number(row.members),
    createdAt: String(row.created_at),
  }));
}

/** Join a live session by its code (or id) at the member's school, in the same division. */
export async function joinSession(db: Database, profile: Profile, body: Record<string, unknown>) {
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
  const row =
    code && code.length <= 12
      ? await db.get(
          'SELECT id,event_id,status FROM presentation_sessions WHERE code=? AND school_id=?',
          code,
          profile.schoolId,
        )
      : null;
  if (!row || row.status !== 'live')
    throw new AppError(404, 'No live presentation at your school has that code.');
  const [, division] = String(row.event_id).split(':');
  if (division !== profile.division)
    throw new AppError(403, `That presentation is for Division ${division} students.`);
  const now = new Date().toISOString();
  await db.batch(
    [
      {
        sql: `INSERT INTO presentation_members (session_id,user_id,display_name,joined_at,last_seen) VALUES (?,?,?,?,?)
          ON CONFLICT(session_id,user_id) DO UPDATE SET last_seen=excluded.last_seen`,
        args: [String(row.id), profile.id, profile.displayName || 'Classmate', now, Date.now()],
      },
    ],
    'immediate',
  );
  return { id: String(row.id) };
}

/** One poll of a live session: where the host is, who is here, and the room's responses. */
export async function sessionState(
  db: Database,
  profile: Profile,
  id: unknown,
): Promise<LiveState> {
  const row = await sessionRow(db, profile, id);
  const sessionId = String(row.id);
  const isHost = row.host_id === profile.id;
  const member = await db.get(
    'SELECT last_seen FROM presentation_members WHERE session_id=? AND user_id=?',
    sessionId,
    profile.id,
  );
  if (!member) throw new AppError(403, 'Join this presentation with its code first.');
  const now = Date.now();
  // Heartbeats are written at most every ten seconds to keep polling cheap.
  if (row.status === 'live' && now - Number(member.last_seen) > 10_000)
    await db.batch(
      [
        {
          sql: 'UPDATE presentation_members SET last_seen=? WHERE session_id=? AND user_id=?',
          args: [now, sessionId, profile.id],
        },
        ...(isHost
          ? [
              {
                sql: 'UPDATE presentation_sessions SET updated_at=? WHERE id=?',
                args: [new Date(now).toISOString(), sessionId],
              },
            ]
          : []),
      ],
      'immediate',
    );
  const { eventId, deck } = sessionDeck(row);
  const slideIndex = Math.min(Math.max(Number(row.slide), 0), deck.slides.length - 1);
  const slide = deck.slides[slideIndex];
  const revealed = Number(row.revealed) === 1;
  const members = await db.all(
    'SELECT user_id,display_name,last_seen FROM presentation_members WHERE session_id=? ORDER BY joined_at',
    sessionId,
  );
  const current = isActivity(slide)
    ? await db.all(
        `SELECT a.user_id,a.answer,a.earned,m.display_name FROM presentation_answers a
         JOIN presentation_members m ON m.session_id=a.session_id AND m.user_id=a.user_id
         WHERE a.session_id=? AND a.slide_id=?`,
        sessionId,
        slide.id,
      )
    : [];
  const answeredBy = new Set(current.map((answer) => String(answer.user_id)));
  const mineRows = await db.all(
    'SELECT slide_id,answer FROM presentation_answers WHERE session_id=? AND user_id=?',
    sessionId,
    profile.id,
  );
  const mine = Object.fromEntries(
    mineRows.map((answer) => [String(answer.slide_id), JSON.parse(String(answer.answer))]),
  );
  return {
    id: sessionId,
    code: String(row.code),
    eventId,
    lessonId: deck.lessonId,
    hostName: String(row.host_name || 'Host'),
    isHost,
    slide: slideIndex,
    revealed,
    status: row.status === 'ended' ? 'ended' : 'live',
    members: members.map((m) => ({
      id: String(m.user_id),
      name: String(m.display_name),
      active: now - Number(m.last_seen) < ACTIVE_MS,
      answered: answeredBy.has(String(m.user_id)),
      host: m.user_id === row.host_id,
    })),
    tally: isActivity(slide) ? tallyOf(slide, current, revealed || isHost) : null,
    mine,
    score: row.status === 'ended' ? scoreDeck(deck, mine) : null,
    total:
      row.status === 'ended' && profile.role === 'student'
        ? await deckProgress(db, profile.id, String(row.event_id), deck)
        : null,
  };
}

function tallyOf(
  slide: ActivitySlide,
  rows: Record<string, unknown>[],
  showResponses: boolean,
): LiveState['tally'] {
  const answers = rows.map((row) => JSON.parse(String(row.answer)) as unknown);
  let options: number[] | null = null;
  if (slide.kind === 'mcq' || slide.kind === 'poll' || slide.kind === 'multi') {
    options = slide.options.map(() => 0);
    for (const answer of answers)
      for (const choice of Array.isArray(answer) ? answer : [answer])
        if (typeof choice === 'number' && options[choice] !== undefined) options[choice]++;
  }
  const earned = rows.map((row) => Number(row.earned));
  return {
    answered: rows.length,
    options,
    correct: earned.filter((value) => value >= 1).length,
    average: earned.length ? earned.reduce((sum, value) => sum + value, 0) / earned.length : 0,
    responses:
      slide.kind === 'open' && showResponses
        ? rows.map((row) => ({
            name: String(row.display_name),
            text: String(JSON.parse(String(row.answer))),
          }))
        : [],
  };
}

/** Save a member's answer to the slide the host is showing. Answers can change until revealed. */
export async function answerSlide(db: Database, profile: Profile, body: Record<string, unknown>) {
  const row = await sessionRow(db, profile, body.id);
  if (row.status !== 'live') throw new AppError(409, 'This presentation has ended.');
  const { deck } = sessionDeck(row);
  const slide = deck.slides[Number(row.slide)];
  if (!slide || slide.id !== body.slideId || !isActivity(slide))
    throw new AppError(409, 'The host has moved to another slide.');
  if (Number(row.revealed) === 1) throw new AppError(409, 'The answers have been revealed.');
  const answer = validAnswer(slide, body.answer);
  if (answer === null) throw new AppError(400, 'Finish your answer before submitting.');
  const member = await db.get(
    'SELECT 1 FROM presentation_members WHERE session_id=? AND user_id=?',
    String(row.id),
    profile.id,
  );
  if (!member) throw new AppError(403, 'Join this presentation with its code first.');
  const { earned } = gradeSlide(slide, answer);
  await db.batch(
    [
      {
        sql: `INSERT INTO presentation_answers (session_id,user_id,slide_id,answer,earned,answered_at) VALUES (?,?,?,?,?,?)
          ON CONFLICT(session_id,user_id,slide_id) DO UPDATE SET answer=excluded.answer,earned=excluded.earned,answered_at=excluded.answered_at`,
        args: [
          String(row.id),
          profile.id,
          slide.id,
          JSON.stringify(answer),
          earned,
          new Date().toISOString(),
        ],
      },
    ],
    'immediate',
  );
  // A student's live answer counts toward their best-of-every-session total straight away, so
  // nothing is lost if the host leaves without ending or the class continues another day.
  if (profile.role === 'student' && isGraded(slide))
    await recordSlides(db, profile.id, String(row.event_id), deck, 'live', [
      { slideId: slide.id, earned },
    ]);
  return { saved: true };
}

/** The host moves the room to a slide, or reveals the current slide's answers. */
export async function controlSession(
  db: Database,
  profile: Profile,
  body: Record<string, unknown>,
) {
  const row = await sessionRow(db, profile, body.id);
  if (row.host_id !== profile.id)
    throw new AppError(403, 'Only the host controls this presentation.');
  if (body.action === 'end') return endSession(db, profile, String(row.id));
  if (row.status !== 'live') throw new AppError(409, 'This presentation has ended.');
  const { deck } = sessionDeck(row);
  const slide =
    body.slide === undefined
      ? Number(row.slide)
      : Number.isInteger(body.slide)
        ? Math.min(Math.max(body.slide as number, 0), deck.slides.length - 1)
        : NaN;
  if (!Number.isFinite(slide)) throw new AppError(400, 'Choose a slide.');
  // Moving to another slide hides the answers again.
  const revealed =
    slide !== Number(row.slide)
      ? 0
      : body.revealed === true
        ? 1
        : body.revealed === false
          ? 0
          : Number(row.revealed);
  await db.batch(
    [
      {
        sql: 'UPDATE presentation_sessions SET slide=?,revealed=?,updated_at=? WHERE id=?',
        args: [slide, revealed, new Date().toISOString(), String(row.id)],
      },
    ],
    'immediate',
  );
  return { slide, revealed: revealed === 1 };
}

/** End a live session. Students' answers were already counted as they submitted them. */
async function endSession(db: Database, profile: Profile, id: string) {
  const row = await sessionRow(db, profile, id);
  if (row.host_id !== profile.id)
    throw new AppError(403, 'Only the host can end this presentation.');
  if (row.status === 'ended') return { ended: true };
  await db.batch(
    [
      {
        sql: "UPDATE presentation_sessions SET status='ended',updated_at=? WHERE id=? AND status='live'",
        args: [new Date().toISOString(), id],
      },
    ],
    'immediate',
  );
  return { ended: true };
}
