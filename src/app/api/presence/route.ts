import { memberFor, json, failure } from '@/lib/api';
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    await db.batch(
      [
        {
          sql: 'INSERT INTO member_presence (user_id,last_seen) VALUES (?,?) ON CONFLICT(user_id) DO UPDATE SET last_seen=excluded.last_seen',
          args: [profile.id, Date.now()],
        },
      ],
      'immediate',
    );
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
