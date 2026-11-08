import { createHash, randomUUID } from 'node:crypto';
import { AppError, type Profile } from './domain.ts';
import { buildEvent, parseCourse, type BuildDivision } from './build-events.ts';
import type { Database } from './school-service.ts';
import type { CourseCard, SavedCourse, CourseLibrary } from './course-types.ts';

type Row = Record<string, string | number | null>;
const columns = 'id,event_id,division,title,level,school_name,created_at';
const card = (r: Row): CourseCard => ({
  id: String(r.id),
  eventId: String(r.event_id),
  division: r.division as BuildDivision,
  title: String(r.title),
  level: r.level as CourseCard['level'],
  schoolName: String(r.school_name),
  createdAt: String(r.created_at),
});

export async function saveCourse(
  db: Database,
  profile: Profile,
  value: unknown,
): Promise<SavedCourse> {
  if (profile.role !== 'student' || (profile.division !== 'B' && profile.division !== 'C'))
    throw new AppError(403, 'Only Division B and C students can save courses.');
  let course;
  try {
    const eventId = (value as { eventId?: unknown })?.eventId;
    if (typeof eventId !== 'string') throw new Error('Choose a course.');
    course = parseCourse(value, profile.division, eventId);
  } catch {
    throw new AppError(400, 'Choose a valid course for your division.');
  }
  if (
    course.diagram.nodes.length < 2 ||
    !course.setup.length ||
    !course.ruleReferences.length ||
    Object.values(course.parameters).some((v) => !v.trim())
  )
    throw new AppError(400, 'Complete the course diagram, parameters and setup before saving.');
  const content = JSON.stringify(course);
  if (content.length > 200_000) throw new AppError(413, 'This course is too large to save.');
  const hash = createHash('sha256').update(content).digest('hex');
  await db.batch(
    [
      {
        sql: `INSERT INTO saved_courses (${columns},creator_id,content_json,content_hash)
      VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(creator_id,content_hash) DO NOTHING`,
        args: [
          randomUUID(),
          course.eventId,
          course.division,
          course.title,
          course.level,
          profile.schoolCommunityName || profile.schoolName,
          new Date().toISOString(),
          profile.id,
          content,
          hash,
        ],
      },
    ],
    'immediate',
  );
  const row = (await db.get(
    'SELECT * FROM saved_courses WHERE creator_id=? AND content_hash=?',
    profile.id,
    hash,
  ))!;
  return { ...card(row), course: JSON.parse(String(row.content_json)) };
}

export async function readCourse(
  db: Database,
  _profile: Profile,
  id: string,
): Promise<SavedCourse> {
  const row = await db.get('SELECT * FROM saved_courses WHERE id=?', id);
  if (!row) throw new AppError(404, 'That saved course is not available.');
  return { ...card(row), course: JSON.parse(String(row.content_json)) };
}

export async function listCourses(
  db: Database,
  _profile: Profile,
  eventId: string | null,
  division: string | null,
  before: string | null,
): Promise<CourseLibrary> {
  if (division !== null && division !== 'B' && division !== 'C')
    throw new AppError(400, 'Choose Division B or C.');
  if (eventId) {
    try {
      if (division) buildEvent(division, eventId);
      else {
        try {
          buildEvent('C', eventId);
        } catch {
          buildEvent('B', eventId);
        }
      }
    } catch {
      throw new AppError(400, 'Choose a build event.');
    }
  }
  if (before && !/^\d{4}-\d\d-\d\dT[\d:.]+Z\|[a-f0-9-]{36}$/.test(before))
    throw new AppError(400, 'Invalid library page.');
  const [date, id] = before?.split('|') ?? [];
  const rows = await db.all(
    `SELECT ${columns} FROM saved_courses WHERE 1=1
    ${division ? 'AND division=?' : ''} ${eventId ? 'AND event_id=?' : ''}
    ${before ? 'AND (created_at<? OR (created_at=? AND id<?))' : ''}
    ORDER BY created_at DESC,id DESC LIMIT 25`,
    ...(division ? [division] : []),
    ...(eventId ? [eventId] : []),
    ...(before ? [date, date, id] : []),
  );
  const courses = rows.slice(0, 24).map(card),
    last = courses.at(-1);
  return { courses, nextCursor: rows.length > 24 && last ? `${last.createdAt}|${last.id}` : null };
}
