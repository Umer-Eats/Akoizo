import { memberFor, json, failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { createTeam, deleteTeam, listTeams, updateTeam } from '@/lib/team-service';

async function bodyOf(request: Request) {
  const body = await request.json();
  if (!body || typeof body !== 'object' || Array.isArray(body))
    throw new AppError(400, 'Enter team details.');
  return body as Record<string, unknown>;
}
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await listTeams(db, profile));
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await createTeam(db, profile, await bodyOf(request)), 201);
  } catch (error) {
    return failure(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await updateTeam(db, profile, await bodyOf(request)));
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    return json(await deleteTeam(db, profile, new URL(request.url).searchParams.get('id')));
  } catch (error) {
    return failure(error);
  }
}
