import { failure, json, memberFor } from '@/lib/api';
import { AppError, isDivision } from '@/lib/domain';
import { rankedPoolSummary } from '@/lib/ranked-builder';
import {
  assignRanked,
  collectRanked,
  createRankedTest,
  deleteRankedTest,
  listRankedForInstructor,
  listRankedForStudent,
  rankedForInstructor,
  rankedForStudent,
  regradeRanked,
  releaseRanked,
  removeRankedQuestion,
  reopenRanked,
  reviewRanked,
  unassignRanked,
} from '@/lib/ranked-service';

// Building a test and grading written answers both wait on Gemini.
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request);
    const params = new URL(request.url).searchParams;
    const testId = params.get('testId');
    const pool = params.get('pool');
    if (profile.role === 'instructor' && pool) {
      if (!isDivision(pool)) throw new AppError(400, 'Choose Division A, B, or C.');
      return json(rankedPoolSummary(pool));
    }
    if (profile.role === 'instructor')
      return json(
        testId
          ? await rankedForInstructor(db, profile, testId)
          : await listRankedForInstructor(db, profile),
      );
    return json(
      testId
        ? await rankedForStudent(db, profile, testId)
        : await listRankedForStudent(db, profile),
    );
  } catch (error) {
    return failure(error);
  }
}
/** Instructor actions on ranked tests. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const raw = await request.text();
    if (raw.length > 50_000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a ranked test action.');
    switch (body.action) {
      case 'create':
        return json(await createRankedTest(db, profile, body), 201);
      case 'assign':
        return json(await assignRanked(db, profile, body), 201);
      case 'unassign':
        await unassignRanked(db, profile, body.assignmentId);
        break;
      case 'release':
        return json(await releaseRanked(db, profile, body));
      case 'reopen':
        await reopenRanked(db, profile, body.assignmentId);
        break;
      case 'collect':
        await collectRanked(db, profile, body.assignmentId);
        break;
      case 'regrade':
        await regradeRanked(db, profile, body.assignmentId);
        break;
      case 'review':
        await reviewRanked(db, profile, body);
        break;
      case 'remove-question':
        await removeRankedQuestion(db, profile, body);
        break;
      case 'delete':
        await deleteRankedTest(db, profile, body.testId);
        break;
      default:
        throw new AppError(400, 'Choose a ranked test action.');
    }
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
