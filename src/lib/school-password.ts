import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';

export function makeSchoolPassword(schoolId: string) {
  return `AKO-${schoolId}.${randomBytes(18).toString('base64url')}`;
}
export function schoolIdFromPassword(password: string) {
  return /^AKO-([a-f0-9-]{36})\.[A-Za-z0-9_-]{24}$/.exec(password)?.[1] ?? null;
}
export function hashSchoolPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 32).toString('hex')}`;
}
export function verifySchoolPassword(password: string, hash: string) {
  const [salt, digest] = hash.split(':');
  if (!salt || !digest || !/^[a-f0-9]{64}$/.test(digest)) return false;
  return timingSafeEqual(scryptSync(password, salt, 32), Buffer.from(digest, 'hex'));
}
export function equalSecret(actual: string, expected: string) {
  return timingSafeEqual(
    createHash('sha256').update(actual).digest(),
    createHash('sha256').update(expected).digest(),
  );
}
