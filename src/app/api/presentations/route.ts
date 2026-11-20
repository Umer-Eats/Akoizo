import { failure, json, memberFor } from '@/lib/api';
import { AppError } from '@/lib/domain';
import {
  answerSlide,
  controlSession,
  finishSolo,
  hostSession,
  joinSession,
  liveSessions,
  presentationResults,
} from '@/lib/presentation-service';

/** The student's finished presentations in one event, and the live sessions open to join. */
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'learner');
    const eventId = new URL(request.url).searchParams.get('eventId');
    const [results, sessions] = await Promise.all([
      presentationResults(db, profile, eventId),
      liveSessions(db, profile, eventId),
    ]);
    return json({ results, sessions });
  } catch (error) {
    return failure(error);
  }
}

/** finish (self-paced), host, join, answer, or control (host only) a presentation. */
export async function POST(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'learner');
    const raw = await request.text();
    if (raw.length > 40_000) throw new AppError(413, 'The request is too large.');
    const body = JSON.parse(raw || '{}');
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new AppError(400, 'Choose a presentation.');
    switch (body.action) {
      case 'finish':
        return json(await finishSolo(db, profile, body));
      case 'host':
        return json(await hostSession(db, profile, body), 201);
      case 'join':
        return json(await joinSession(db, profile, body));
      case 'answer':
        return json(await answerSlide(db, profile, body));
      case 'control':
      // The host's "End presentation" sends action 'end'; controlSession ends the session for it.
      case 'end':
        return json(await controlSession(db, profile, body));
      default:
        throw new AppError(400, 'Choose a presentation action.');
    }
  } catch (error) {
    return failure(error);
  }
}
