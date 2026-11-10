import { memberFor, json, failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  attendanceFor,
  checkIn,
  createWorkshop,
  manageWorkshop,
  deleteWorkshop,
} from '@/lib/attendance-service';
async function bodyOf(request: Request) {
  const body = await request.json();
  if (!body || typeof body !== 'object' || Array.isArray(body))
    throw new AppError(400, 'Enter attendance details.');
  return body as Record<string, unknown>;
}
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    return json(await attendanceFor(db, profile));
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const body = await bodyOf(request);
    return json(
      profile.role === 'instructor'
        ? await createWorkshop(db, profile, body)
        : await checkIn(db, profile, body),
      201,
    );
  } catch (error) {
    return failure(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await manageWorkshop(db, profile, await bodyOf(request)));
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await deleteWorkshop(db, profile, (await bodyOf(request)).id));
  } catch (error) {
    return failure(error);
  }
}
