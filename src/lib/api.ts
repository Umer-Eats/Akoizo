import { NextResponse } from 'next/server';
import { getAdminAuth } from './firebase-admin';
import { getDb, initializeDatabase } from './db';
import { AppError, type Role } from './domain';
import { profileForUid } from './school-service';

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}
export function failure(error: unknown) {
  if (error instanceof AppError) return json({ error: error.message }, error.status);
  if (error instanceof SyntaxError) return json({ error: 'The request could not be read.' }, 400);
  if (error instanceof Error && /UNIQUE constraint failed/i.test(error.message))
    return json(
      { error: 'This account or assignment already exists. Refresh and try again.' },
      409,
    );
  // Never log tokens, passwords, database statements, or private service credentials.
  console.error(
    'School service request failed:',
    error instanceof Error ? error.name : 'Unknown error',
  );
  return json({ error: 'School services are temporarily unavailable. Please try again.' }, 503);
}
export async function identityFor(request: Request) {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) throw new AppError(401, 'Please log in to continue.');
  const auth = getAdminAuth();
  try {
    return await auth.verifyIdToken(header.slice(7), true);
  } catch {
    throw new AppError(401, 'Your session has expired. Please log in again.');
  }
}
export async function memberFor(request: Request, role?: Role) {
  const identity = await identityFor(request);
  await initializeDatabase();
  const db = getDb();
  const profile = await profileForUid(db, identity.uid);
  if (!profile) throw new AppError(403, 'Finish your school enrollment to continue.');
  if (role && profile.role !== role)
    throw new AppError(403, `This page requires a ${role} account.`);
  return { db, profile };
}
