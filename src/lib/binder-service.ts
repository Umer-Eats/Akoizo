import { randomUUID } from 'node:crypto';
import type { Database } from './school-service.ts';
import { AppError, type Profile } from './domain.ts';
import {
  binderContentPages,
  binderEvent,
  binderPlanReady,
  binderTopics,
  mergeBinderTopics,
  parseBinderInput,
  requireBinderStudent,
} from './binders.ts';
import { outlineBinder, planBinderTopics, writeBinderPages } from './binder-ai.ts';
import type { Binder, BinderCard, BinderInput, BinderPlan } from './binder-types.ts';

type Row = Record<string, string | number | null>;
const columns =
  'id,event_id,title,level,page_count,completed_pages,status,school_name,created_at,generated_at';
function card(r: Row): BinderCard {
  return {
    id: String(r.id),
    eventId: String(r.event_id),
    title: String(r.title),
    level: r.level as BinderCard['level'],
    pageCount: Number(r.page_count),
    completedPages: Number(r.completed_pages),
    status: r.status as BinderCard['status'],
    schoolName: String(r.school_name),
    createdAt: String(r.created_at),
    generatedAt: r.generated_at ? String(r.generated_at) : null,
  };
}
export async function listBinders(
  db: Database,
  profile: Profile,
  eventId: string | null,
  before: string | null,
) {
  if (eventId) binderEvent(eventId);
  if (before && !/^\d{4}-\d\d-\d\dT[\d:.]+Z\|[a-f0-9-]{36}$/.test(before))
    throw new AppError(400, 'Invalid library page.');
  const [date, id] = before?.split('|') ?? [];
  // Shared with every authenticated school member; deliberately no school or division filter.
  const rows = await db.all(
    `SELECT ${columns} FROM binders WHERE status='published' ${eventId ? 'AND event_id=?' : ''} ${before ? 'AND (generated_at<? OR (generated_at=? AND id<?))' : ''} ORDER BY generated_at DESC,id DESC LIMIT 25`,
    ...(eventId ? [eventId] : []),
    ...(before ? [date, date, id] : []),
  );
  const binders = rows.slice(0, 24).map(card),
    last = binders.at(-1);
  const jobs = (
    await db.all(
      `SELECT ${columns} FROM binders WHERE creator_id=? AND status IN ('generating','ready') ${eventId ? 'AND event_id=?' : ''} ORDER BY created_at DESC LIMIT 10`,
      profile.id,
      ...(eventId ? [eventId] : []),
    )
  ).map(card);
  return {
    binders,
    jobs,
    nextCursor: rows.length > 24 && last ? `${last.generatedAt}|${last.id}` : null,
  };
}
export async function readBinder(db: Database, profile: Profile, id: string): Promise<Binder> {
  const row = await db.get(
    `SELECT * FROM binders WHERE id=? AND (status='published' OR creator_id=?)`,
    id,
    profile.id,
  );
  if (!row) throw new AppError(404, 'That binder is not available.');
  const pages = await db.all(
    'SELECT content_json FROM binder_pages WHERE binder_id=? ORDER BY page_index',
    id,
  );
  return {
    ...card(row),
    plan: JSON.parse(String(row.plan_json)),
    pages: pages.map((p) => JSON.parse(String(p.content_json))),
    images: JSON.parse(String(row.images_json)),
  };
}
export async function createBinder(db: Database, profile: Profile, value: BinderInput) {
  requireBinderStudent(profile);
  const input = parseBinderInput(value),
    id = randomUUID(),
    now = new Date().toISOString();
  const result = await db.batch(
    [
      {
        sql: `INSERT INTO binders (id,creator_id,event_id,title,level,page_count,completed_pages,status,school_name,created_at,input_json,plan_json,images_json,attempts)
    SELECT ?,?,?,?,?,?,0,'generating',?,?,?,'{"sections":[]}',?,0
    WHERE NOT EXISTS (SELECT 1 FROM binders WHERE creator_id=? AND status IN ('generating','ready'))
    AND (SELECT COUNT(*) FROM binders WHERE creator_id=? AND created_at>?)<3`,
        args: [
          id,
          profile.id,
          input.eventId,
          input.title,
          input.level,
          input.pageCount,
          profile.schoolName,
          now,
          JSON.stringify(input),
          JSON.stringify(input.uploads.filter((u) => u.mime.startsWith('image/'))),
          profile.id,
          profile.id,
          new Date(Date.now() - 86400_000).toISOString(),
        ],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(
      429,
      'Resume or cancel your existing binder first. You can start up to 3 binders per day.',
    );
  return card((await db.get(`SELECT ${columns} FROM binders WHERE id=?`, id))!);
}
const binderAI = { outline: outlineBinder, topics: planBinderTopics, pages: writeBinderPages };
// One Gemini call per request, saved before the next: the outline, then each section's topics,
// then pages in batches. A dropped connection or closed tab loses at most the call in flight.
export async function advanceBinder(db: Database, profile: Profile, id: string, ai = binderAI) {
  requireBinderStudent(profile);
  const token = randomUUID(),
    now = Date.now();
  const result = await db.batch(
    [
      {
        sql: `UPDATE binders SET lease_token=?,lease_until=?,attempts=attempts+1 WHERE id=? AND creator_id=? AND status='generating' AND (lease_until IS NULL OR lease_until<?) AND attempts < page_count*4+40`,
        args: [token, now + 130_000, id, profile.id, now],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(
      409,
      'This binder is busy, complete, cancelled, or has reached its retry limit. Refresh; if busy, wait two minutes before resuming.',
    );
  try {
    const row = (await db.get('SELECT * FROM binders WHERE id=?', id))!;
    const input: BinderInput = JSON.parse(String(row.input_json));
    let plan: BinderPlan = JSON.parse(String(row.plan_json));
    const total = binderContentPages(input.pageCount);
    if (!binderPlanReady(plan)) {
      if (!plan.sections.length) plan = await ai.outline(input);
      else {
        const index = plan.sections.findIndex((s) => s.topics.length < s.pages);
        const merged = mergeBinderTopics(plan, index, await ai.topics(input, plan, index));
        if (!merged.added)
          throw new AppError(
            502,
            'Akoizo repeated topics that are already planned. Your outline is saved; resume to retry.',
          );
        plan = merged.plan;
      }
      await db.batch(
        [
          {
            sql: `UPDATE binders SET plan_json=? WHERE id=? AND lease_token=? AND status='generating'`,
            args: [JSON.stringify(plan), id, token],
          },
        ],
        'immediate',
      );
    } else {
      const offset = Number(row.completed_pages),
        pages = await ai.pages(input, plan, offset);
      if (!pages.length || offset + pages.length > total) throw new Error('Invalid batch');
      const done = offset + pages.length === total;
      await db.batch(
        [
          ...pages.map((p, i) => ({
            sql: `INSERT INTO binder_pages(binder_id,page_index,content_json) SELECT ?,?,? WHERE EXISTS (SELECT 1 FROM binders WHERE id=? AND lease_token=? AND status='generating')`,
            args: [id, offset + i, JSON.stringify(p), id, token],
          })),
          {
            sql: `UPDATE binders SET completed_pages=?,status=? WHERE id=? AND lease_token=? AND status='generating'`,
            args: [offset + pages.length, done ? 'ready' : 'generating', id, token],
          },
        ],
        'immediate',
      );
    }
    const next = card((await db.get(`SELECT ${columns} FROM binders WHERE id=?`, id))!);
    return binderPlanReady(plan) ? next : { ...next, plannedPages: binderTopics(plan).length };
  } finally {
    await db.batch(
      [
        {
          sql: 'UPDATE binders SET lease_token=NULL,lease_until=NULL WHERE id=? AND lease_token=?',
          args: [id, token],
        },
      ],
      'immediate',
    );
  }
}
export async function publishBinder(db: Database, profile: Profile, id: string) {
  requireBinderStudent(profile);
  const row = await db.get(
    'SELECT page_count FROM binders WHERE id=? AND creator_id=?',
    id,
    profile.id,
  );
  const total = row ? binderContentPages(Number(row.page_count)) : -1;
  const result = await db.batch(
    [
      {
        sql: `UPDATE binders SET status='published',generated_at=COALESCE(generated_at,?),input_json='{}' WHERE id=? AND creator_id=? AND status IN ('ready','published') AND completed_pages=? AND (SELECT COUNT(*) FROM binder_pages WHERE binder_id=?)=?`,
        args: [new Date().toISOString(), id, profile.id, total, id, total],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(409, 'Finish every page before sharing this binder.');
  return readBinder(db, profile, id);
}
export async function cancelBinder(db: Database, profile: Profile, id: string) {
  const result = await db.batch(
    [
      {
        sql: `UPDATE binders SET status='cancelled',input_json='{}',images_json='[]',lease_token=NULL,lease_until=NULL WHERE id=? AND creator_id=? AND status IN ('generating','ready')`,
        args: [id, profile.id],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected) throw new AppError(404, 'That unfinished binder is not available.');
  return { cancelled: true };
}
