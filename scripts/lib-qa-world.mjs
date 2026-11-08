import '../tests/enrollment-env.mjs';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { schema, eventSeeds } from '../src/lib/schema.ts';
import { registerMember, dashboardFor, publicRankings } from '../src/lib/school-service.ts';
import { listTeams, createTeam } from '../src/lib/team-service.ts';
import { communityFor } from '../src/lib/community-service.ts';
import { schoolAnalytics } from '../src/lib/analytics-service.ts';
import { listBinders } from '../src/lib/binder-service.ts';
import { selectedEvents, selectEvent } from '../src/lib/event-selections.ts';
import { studentWork } from '../src/lib/study-assignment-service.ts';
import {
  publicStudentRanks,
  studentDirectory,
  studentRankedProfile,
} from '../src/lib/student-profile-service.ts';
import { practiceTests, publicPracticePaper } from '../src/lib/practice-catalog.ts';

// A small demo school in an in-memory database, served through the real services.
// Used for QA screenshots and marketing clips; nothing touches the live database.
export async function qaWorld() {
  const raw = new DatabaseSync(':memory:');
  raw.exec('PRAGMA foreign_keys=ON');
  for (const sql of schema) raw.exec(sql);
  for (const seed of eventSeeds) raw.prepare(seed.sql).run(...seed.args);
  const db = {
    get: async (sql, ...args) => raw.prepare(sql).get(...args),
    all: async (sql, ...args) => raw.prepare(sql).all(...args),
    async batch(statements) {
      raw.exec('BEGIN IMMEDIATE');
      try {
        const result = statements.map(({ sql, args }) => ({
          rowsAffected: Number(raw.prepare(sql).run(...args).changes),
          rows: [],
        }));
        raw.exec('COMMIT');
        return result;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
  };
  const identity = (uid) => ({ uid, email: `${uid}@example.test` });
  const coach = await registerMember(
    db,
    identity('qa-coach'),
    {
      role: 'instructor',
      displayName: 'Coach Lee',
      instructorInvitePassword: 'qa',
      schoolCommunityId: 'ppchs',
    },
    'qa',
  );
  const join = coach.credentials.joiningPassword;
  const roster = [
    ['qa-student', 'Ada Lovelace', 'C', 380, ['astronomy', 'anatomy-and-physiology', 'chemistry-lab']],
    ['qa-ben', 'Ben Ortiz', 'C', 520, ['circuit-lab', 'forensics', 'codebusters']],
    ['qa-cal', 'Cal Reyes', 'C', 260, ['disease-detectives', 'botany']],
    ['qa-dee', 'Dee Park', 'B', 410, ['heredity', 'meteorology']],
    ['qa-eli', 'Eli Stone', 'B', 150, ['water-quality']],
    ['qa-fay', 'Fay Kim', 'C', 300, ['dynamic-planet', 'thermodynamics']],
  ];
  const profiles = { instructor: coach.profile };
  for (const [uid, name, division, points, events] of roster) {
    const { profile } = await registerMember(
      db,
      identity(uid),
      { role: 'student', displayName: name, division, schoolPassword: join },
      'qa',
    );
    profiles[uid] = profile;
    for (const eventId of events)
      await selectEvent(db, profile, { division, eventId, selected: true }).catch(() => {});
    raw
      .prepare('INSERT INTO points_ledger (id,student_id,points,reason) VALUES (?,?,?,?)')
      .run(randomUUID(), profile.id, points, 'qa');
  }
  profiles.student = profiles['qa-student'];
  await createTeam(db, coach.profile, {
    name: 'Varsity',
    division: 'C',
    studentIds: ['qa-student', 'qa-ben', 'qa-cal'].map((id) => profiles[id].id),
  }).catch(() => {});

  async function handle(url, request, profile) {
    const p = url.pathname;
    const method = request.method();
    const body = method === 'POST' ? (request.postDataJSON() ?? {}) : {};
    if (p === '/api/auth/profile') return profile;
    if (p === '/api/dashboard') return dashboardFor(db, profile);
    if (p === '/api/rankings') {
      const [data, ranks] = await Promise.all([publicRankings(db), publicStudentRanks(db)]);
      return { ...data, rankings: data.rankings.map((s) => ({ ...s, competitiveRank: ranks[s.id] })) };
    }
    if (p === '/api/community') return communityFor(db, profile);
    if (p === '/api/analytics') return schoolAnalytics(db, profile);
    if (p === '/api/teams') return listTeams(db, profile);
    if (p === '/api/students') return studentDirectory(db, profile, url.searchParams);
    if (p.startsWith('/api/students/'))
      return studentRankedProfile(db, profile, decodeURIComponent(p.split('/')[3]));
    if (p === '/api/binders')
      return listBinders(db, profile, url.searchParams.get('eventId'), url.searchParams.get('before'), url.searchParams.get('division'));
    if (p === '/api/progress') return studentWork(db, profile, url.searchParams.get('studentId'));
    if (p === '/api/event-selections')
      return method === 'POST'
        ? selectEvent(db, profile, body)
        : selectedEvents(db, profile, url.searchParams.get('division') || profile.division);
    if (p === '/api/practice' && url.searchParams.get('testId')) {
      const test = practiceTests.find((t) => t.id === url.searchParams.get('testId'));
      return { test: publicPracticePaper(test), attempts: [] };
    }
    return undefined;
  }
  return { db, profiles, handle };
}
