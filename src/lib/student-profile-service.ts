import { AppError, type Profile } from './domain.ts';
import { publicName, type Database } from './school-service.ts';
import { getSchoolCommunity } from './school-communities.ts';
import type { Division } from './events.ts';
import {
  applyLeaderboard,
  calculateRating,
  PASS_POINTS,
  rankLabel,
  RANK_NAMES,
} from './competitive-rating.ts';
import type { StudentCard, StudentDirectory, StudentRankedProfile } from './student-profiles.ts';

/** Only safe identity fields and released ranked scores leave this service. */
async function roster(db: Database, member: Profile) {
  const active = await db.get(
    `SELECT id FROM users WHERE id=? AND school_id=?
    AND id NOT IN (SELECT user_id FROM departed_members)
    AND school_id NOT IN (SELECT school_id FROM closed_communities)`,
    member.id,
    member.schoolId,
  );
  if (!active) throw new AppError(403, 'Active community membership is required.');
  const users =
    await db.all(`SELECT u.id,u.display_name,u.division,u.school_id,s.name AS school,sc.community_id
    FROM users u JOIN schools s ON s.id=u.school_id LEFT JOIN school_communities sc ON sc.school_id=s.id
    WHERE u.role='student' AND u.id NOT IN (SELECT user_id FROM departed_members)
    AND u.school_id NOT IN (SELECT school_id FROM closed_communities)`);
  const attempts =
    await db.all(`SELECT a.id,a.student_id,a.event_id,e.name AS event_name,a.score,a.max_score,a.points_awarded,a.completed_at
    FROM test_attempts a JOIN users u ON u.id=a.student_id JOIN events e ON e.id=a.event_id
    LEFT JOIN ranked_assignments r ON r.id=a.id
    WHERE a.type='Ranked' AND a.max_score>0 AND u.role='student'
    AND u.id NOT IN (SELECT user_id FROM departed_members)
    AND u.school_id NOT IN (SELECT school_id FROM closed_communities)
    AND (r.id IS NULL OR (r.released_at IS NOT NULL AND r.submitted_at IS NOT NULL
      AND COALESCE(json_extract(r.result_json,'$.pendingPoints'),0)=0
      AND COALESCE(json_extract(r.result_json,'$.automaticGrading'),'complete')!='unavailable'))
    ORDER BY a.completed_at,a.id`);
  const paperTotals = new Map<string, { sum: number; count: number }>();
  // Shared assignment test IDs give a paper benchmark; legacy attempts use the neutral benchmark.
  const papers = await db.all(
    'SELECT id,test_id FROM ranked_assignments WHERE released_at IS NOT NULL',
  );
  const paperIds = new Map(papers.map((r) => [String(r.id), String(r.test_id)]));
  for (const a of attempts) {
    const key = paperIds.get(String(a.id));
    if (!key) continue;
    const total = paperTotals.get(key) ?? { sum: 0, count: 0 };
    total.sum += Number(a.points_awarded);
    total.count++;
    paperTotals.set(key, total);
  }
  const byStudent = new Map<string, typeof attempts>();
  for (const a of attempts) {
    const id = String(a.student_id);
    const list = byStudent.get(id) ?? [];
    list.push(a);
    byStudent.set(id, list);
  }
  return applyLeaderboard(
    users.map((u) => {
      const mine = byStudent.get(String(u.id)) ?? [];
      const rank = calculateRating(
        mine.map((a) => {
          const benchmark = paperTotals.get(paperIds.get(String(a.id)) ?? '');
          return {
            id: String(a.id),
            points: Math.max(0, Math.min(100, Number(a.points_awarded))),
            completedAt: String(a.completed_at),
            paperAverage: benchmark && benchmark.count >= 3 ? benchmark.sum / benchmark.count : 60,
          };
        }),
      );
      return {
        id: String(u.id),
        name: publicName(u.display_name),
        schoolId: String(u.school_id),
        community: getSchoolCommunity(u.community_id)?.name ?? String(u.school),
        division: u.division as Division,
        points: rank.history.reduce((sum, a) => sum + a.points, 0),
        tests: mine.length,
        accuracy: mine.length
          ? Math.round(
              mine.reduce((sum, a) => sum + (Number(a.score) / Number(a.max_score)) * 100, 0) /
                mine.length,
            )
          : null,
        rank,
        attempts: mine,
      };
    }),
  );
}
function card(s: Awaited<ReturnType<typeof roster>>[number]): StudentCard {
  const { history: _history, mmr: _mmr, ...rank } = s.rank;
  return {
    id: s.id,
    name: s.name,
    schoolId: s.schoolId,
    community: s.community,
    division: s.division,
    points: s.points,
    tests: s.tests,
    accuracy: s.accuracy,
    rank,
  };
}
export async function studentDirectory(
  db: Database,
  member: Profile,
  params: URLSearchParams,
): Promise<StudentDirectory> {
  const students = await roster(db, member);
  const search = (params.get('q') ?? '').trim().toLowerCase().slice(0, 100);
  const school = params.get('school');
  const division = params.get('division');
  const matches = students
    .filter(
      (s) =>
        (!school || s.schoolId === school) &&
        (!division || s.division === division) &&
        `${s.name} ${s.community}`.toLowerCase().includes(search),
    )
    .sort(
      (a, b) => b.rank.rating - a.rank.rating || b.points - a.points || a.id.localeCompare(b.id),
    );
  const page = Math.max(0, Math.floor(Number(params.get('page')) || 0));
  return {
    students: matches.slice(page * 24, (page + 1) * 24).map(card),
    total: matches.length,
    schools: [
      ...new Map(students.map((s) => [s.schoolId, { id: s.schoolId, name: s.community }])).values(),
    ].sort((a, b) => a.name.localeCompare(b.name)),
  };
}
export async function studentRankedProfile(
  db: Database,
  member: Profile,
  id: string,
): Promise<StudentRankedProfile> {
  const s = (await roster(db, member)).find((s) => s.id === id);
  if (!s) throw new AppError(404, 'Student profile not found.');
  const history = s.rank.history.map((h) => ({
    id: h.id,
    date: h.completedAt,
    points: h.points,
    delta: h.delta,
    placement: h.placement,
    rating: h.rating,
    event: String(s.attempts.find((a) => a.id === h.id)?.event_name ?? 'Ranked test'),
  }));
  const groups = new Map<
    string,
    { name: string; tests: number; points: number; accuracy: number }
  >();
  for (const a of s.attempts) {
    const key = String(a.event_id);
    const group = groups.get(key) ?? {
      name: String(a.event_name),
      tests: 0,
      points: 0,
      accuracy: 0,
    };
    group.tests++;
    group.points += Number(a.points_awarded);
    group.accuracy += (Number(a.score) / Number(a.max_score)) * 100;
    groups.set(key, group);
  }
  const peakRating = Math.max(
    0,
    ...s.rank.history.filter((h) => !h.placement || s.tests >= 5).map((h) => h.rating),
  );
  const peakDivision = Math.min(21, Math.floor(peakRating / 100));
  const peak =
    s.rank.name === 'Radiant'
      ? 'Radiant'
      : s.tests < 5
        ? 'Unranked'
        : rankLabel({
            name: RANK_NAMES[Math.min(7, Math.floor(peakDivision / 3))],
            tier:
              peakDivision < 21
                ? (peakDivision % 3) + 1
                : peakRating - 2100 >= 200
                  ? 3
                  : peakRating - 2100 >= 90
                    ? 2
                    : 1,
          });
  const recent = history.slice(-5),
    previous = history.slice(-10, -5);
  const mean = (h: typeof history) => h.reduce((sum, t) => sum + t.points, 0) / h.length;
  return {
    ...card(s),
    peak,
    passRate: s.tests
      ? Math.round((history.filter((h) => h.points >= PASS_POINTS).length / s.tests) * 100)
      : null,
    best: s.tests ? Math.max(...history.map((h) => h.points)) : null,
    recentChange: previous.length ? Math.round(mean(recent) - mean(previous)) : null,
    events: [...groups.values()]
      .map((g) => ({ ...g, accuracy: Math.round(g.accuracy / g.tests) }))
      .sort((a, b) => b.accuracy - a.accuracy),
    history,
  };
}
