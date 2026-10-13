import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import communityPasswords from '../../communitypasswords.json' with { type: 'json' };

export function instructorInviteForCommunity(
  communityId: string | undefined,
  defaultInvite: string | undefined,
) {
  const community = communityPasswords.find((c) => c.id === communityId);
  if (!community) return undefined;
  const setting = community.instructorPassword.env;
  return setting === 'INSTRUCTOR_INVITE_PASSWORD' ? defaultInvite : process.env[setting];
}

export function campusPassword(communityId: string | null | undefined) {
  const setting = communityPasswords.find((c) => c.id === communityId)?.studentPassword.env;
  if (!setting) return null;
  const password = process.env[setting];
  if (!password) throw new Error(`Missing server enrollment setting: ${setting}`);
  return password;
}
export function campusFromPassword(password: string) {
  const matches = communityPasswords.filter((community) => {
    const expected = process.env[community.studentPassword.env];
    return expected ? equalSecret(password, expected) : false;
  });
  // Shared student passwords cannot identify which campus a student should join.
  return matches.length === 1 ? matches[0].id : null;
}
export function makeSchoolPassword(schoolId: string, communityId?: string | null) {
  const password = campusPassword(communityId);
  if (password) return password;
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
