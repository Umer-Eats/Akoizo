import { memberFor, json, failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { createAssignment, removeAssignment } from '@/lib/school-service';
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const body = await request.json();
    if (!body || typeof body !== 'object') throw new AppError(400, 'Enter assignment details.');
    return json(await createAssignment(db, profile, body), 201);
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const id = new URL(request.url).searchParams.get('id');
    if (!id) throw new AppError(400, 'Choose an assignment.');
    await removeAssignment(db, profile, id);
    return json({ removed: true });
  } catch (error) {
    return failure(error);
  }
}
