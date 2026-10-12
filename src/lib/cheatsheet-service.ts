import { randomUUID } from 'node:crypto';
import type { Database } from './school-service.ts';
import { AppError, type Profile } from './domain.ts';
import { requireSheetStudent, sheetEvent } from './cheatsheets.ts';
import { generateSheet } from './cheatsheet-ai.ts';
import type { CheatSheet, SheetCard, SheetInput } from './cheatsheet-types.ts';

function card(row: Record<string, string | number | null>): SheetCard {
  return {
    id: String(row.id),
    eventId: String(row.event_id),
    title: String(row.title),
    level: row.level as SheetCard['level'],
    createdAt: String(row.created_at),
    schoolName: String(row.school_name),
    hasExclusions: Boolean(row.has_exclusions),
    imageCount: Number(row.image_count),
  };
}
export async function listSheets(
  db: Database,
  profile: Profile,
  eventId: string | null,
  before: string | null,
) {
  requireSheetStudent(profile);
  if (eventId) sheetEvent(eventId);
  if (before && !/^\d{4}-\d\d-\d\dT[\d:.]+Z\|[a-f0-9-]{36}$/.test(before))
    throw new AppError(400, 'Invalid library page.');
  const [date, id] = before?.split('|') ?? [];
  // Deliberately global: no school_id or creator filter. Only published Division C sheets.
  const rows = await db.all(
    `SELECT id,event_id,title,level,created_at,school_name,has_exclusions,image_count FROM cheat_sheets
    WHERE status='published' ${eventId ? 'AND event_id=?' : ''}
    ${before ? 'AND (created_at < ? OR (created_at = ? AND id < ?))' : ''}
    ORDER BY created_at DESC,id DESC LIMIT 25`,
    ...(eventId ? [eventId] : []),
    ...(before ? [date, date, id] : []),
  );
  const more = rows.length > 24;
  const items = rows.slice(0, 24).map(card);
  const last = items.at(-1);
  const drafts = (
    await db.all(
      `SELECT id,event_id,title,level,created_at,school_name,has_exclusions,image_count FROM cheat_sheets WHERE creator_id=? AND status='draft' ${eventId ? 'AND event_id=?' : ''} ORDER BY created_at DESC LIMIT 10`,
      profile.id,
      ...(eventId ? [eventId] : []),
    )
  ).map(card);
  return {
    sheets: items,
    drafts,
    nextCursor: more && last ? `${last.createdAt}|${last.id}` : null,
  };
}
export async function readSheet(db: Database, profile: Profile, id: string): Promise<CheatSheet> {
  requireSheetStudent(profile);
  const row = await db.get(
    `SELECT * FROM cheat_sheets WHERE id=? AND (status='published' OR (creator_id=? AND status='draft'))`,
    id,
    profile.id,
  );
  if (!row) throw new AppError(404, 'That cheat sheet is not available.');
  return {
    ...card(row),
    content: JSON.parse(String(row.content_json)),
    images: JSON.parse(String(row.images_json)),
    exclusions: String(row.exclusions),
    published: row.status === 'published',
  };
}
export async function createSheet(
  db: Database,
  profile: Profile,
  input: SheetInput,
  generate = generateSheet,
) {
  requireSheetStudent(profile);
  sheetEvent(input.eventId);
  const id = randomUUID(),
    now = new Date().toISOString();
  const windowStart = new Date(Date.now() - 10 * 60_000).toISOString();
  const activeStart = new Date(Date.now() - 150_000).toISOString();
  // Atomic reservation works across server instances and prevents parallel expensive generations.
  const result = await db.batch(
    [
      {
        sql: `INSERT INTO cheat_sheets
    (id,creator_id,event_id,title,school_name,level,created_at,status,has_exclusions,image_count,exclusions,content_json,images_json)
    SELECT ?,?,?,?,?,?,?,'generating',?,?,?,'{}','[]'
    WHERE (SELECT COUNT(*) FROM cheat_sheets WHERE creator_id=? AND created_at>?) < 3
    AND NOT EXISTS (SELECT 1 FROM cheat_sheets WHERE creator_id=? AND status='generating' AND created_at>?)`,
        args: [
          id,
          profile.id,
          input.eventId,
          input.title,
          profile.schoolCommunityName || profile.schoolName,
          input.level,
          now,
          Number(Boolean(input.exclusions)),
          input.uploads.filter((u) => u.mime.startsWith('image/')).length,
          input.exclusions,
          profile.id,
          windowStart,
          profile.id,
          activeStart,
        ],
      },
    ],
    'immediate',
  );
  if (!result[0].rowsAffected)
    throw new AppError(
      429,
      'Please let your current sheet finish, or wait a few minutes. You can generate 3 sheets every 10 minutes.',
    );
  try {
    const content = await generate(input);
    const images = input.uploads.filter((u) => u.mime.startsWith('image/'));
    await db.batch(
      [
        {
          sql: `UPDATE cheat_sheets SET status='draft',content_json=?,images_json=? WHERE id=?`,
          args: [JSON.stringify(content), JSON.stringify(images), id],
        },
      ],
      'immediate',
    );
    return await readSheet(db, profile, id);
  } catch (error) {
    await db.batch(
      [{ sql: `UPDATE cheat_sheets SET status='failed' WHERE id=?`, args: [id] }],
      'immediate',
    );
    throw error;
  }
}
export async function publishSheet(db: Database, profile: Profile, id: string) {
  requireSheetStudent(profile);
  const results = await db.batch(
    [
      {
        sql: `UPDATE cheat_sheets SET status='published' WHERE id=? AND creator_id=? AND status IN ('draft','published')`,
        args: [id, profile.id],
      },
    ],
    'immediate',
  );
  if (!results[0].rowsAffected) throw new AppError(404, 'That draft is not available to publish.');
  return readSheet(db, profile, id);
}
