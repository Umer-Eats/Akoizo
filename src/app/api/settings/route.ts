import { memberFor, json, failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { renameMember, leaveCommunity, deleteCommunity, dashboardFor } from '@/lib/school-service';
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const students =
      profile.role === 'instructor' ? (await dashboardFor(db, profile)).students : [];
    return json({ profile, students });
  } catch (error) {
    return failure(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const body = await request.json();
    return json(await renameMember(db, profile, body?.studentId ?? profile.id, body?.displayName));
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const body = await request.json();
    if (profile.role === 'student') {
      if (body?.confirmation !== 'LEAVE')
        throw new AppError(400, 'Confirm leaving your community.');
      await leaveCommunity(db, profile);
    } else await deleteCommunity(db, profile, body?.confirmation);
    return json({ success: true });
  } catch (error) {
    return failure(error);
  }
}
