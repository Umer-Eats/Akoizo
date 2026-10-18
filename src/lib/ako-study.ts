// Shared by the browser companion and the server tutor. No credentials or answer keys here.
export const AKO_MOODS = [
  'idle',
  'wave',
  'thinking',
  'happy',
  'surprised',
  'sad',
  'angry',
] as const;
/** Every mood is also an AkoAction, so a reply can drive the pixel clip directly. */
export type AkoMood = (typeof AKO_MOODS)[number];
export const AKO_VERDICTS = ['none', 'correct', 'partial', 'incorrect'] as const;
export type AkoVerdict = (typeof AKO_VERDICTS)[number];
export type AkoTurn = { role: 'student' | 'ako'; text: string };
/** Preserve provider paragraph breaks; split long unformatted explanations into readable ideas. */
export function akoReplyParagraphs(text: string): string[] {
  const paragraphs = text.split(/\n\s*\n/).filter((part) => part.trim());
  if (paragraphs.length > 1 || text.length < 240) return paragraphs;
  const sentences = Array.from(
    new Intl.Segmenter('en', { granularity: 'sentence' }).segment(text),
    ({ segment }) => segment,
  );
  return Array.from({ length: Math.ceil(sentences.length / 2) }, (_, index) =>
    sentences
      .slice(index * 2, index * 2 + 2)
      .join('')
      .trim(),
  );
}
export type AkoReply = {
  reply: string;
  mood: AkoMood;
  verdict: AkoVerdict;
  // Ako asked "why?" and is still waiting for a correct explanation.
  awaitingWhy: boolean;
  missedWhys: number;
  nextLineId?: string;
};
/** After this many wrong explanations Ako explains the reasoning himself and moves on. */
export const AKO_MAX_MISSES = 3;
export const AKO_LIMITS = { message: 1000, turn: 1500, turns: 12, answer: 2000 };

/** The server decides Ako's feelings from the verdict; the model cannot be mad on its own. */
export function settleAkoReply(
  raw: { reply: string; mood: AkoMood; verdict: AkoVerdict; askedWhy: boolean },
  state: { pendingWhy: boolean; missedWhys: number },
): AkoReply {
  const verdict = state.pendingWhy ? raw.verdict : 'none';
  const missedWhys = verdict === 'incorrect' ? state.missedWhys + 1 : state.missedWhys;
  // The model may stop asking (it explained, or the topic moved on); it can never excuse a miss early.
  const awaitingWhy =
    raw.askedWhy &&
    verdict !== 'correct' &&
    !(verdict === 'incorrect' && missedWhys >= AKO_MAX_MISSES);
  const mood: AkoMood =
    verdict === 'correct'
      ? raw.mood === 'surprised'
        ? 'surprised'
        : 'happy'
      : verdict === 'incorrect'
        ? awaitingWhy
          ? 'angry'
          : 'sad'
        : verdict === 'partial' || raw.mood === 'angry'
          ? 'thinking'
          : raw.mood;
  return { reply: raw.reply, mood, verdict, awaitingWhy, missedWhys: awaitingWhy ? missedWhys : 0 };
}

/** Sliding-window limiter. Best effort only: each server instance keeps its own log. */
export function allowAkoMessage(
  log: Map<string, number[]>,
  id: string,
  now: number,
  limit = 30,
  windowMs = 10 * 60_000,
) {
  const recent = (log.get(id) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    log.set(id, recent);
    return false;
  }
  recent.push(now);
  log.set(id, recent);
  if (log.size > 5000)
    for (const [key, times] of log)
      if (!times.some((time) => now - time < windowMs)) log.delete(key);
  return true;
}

/** The practice test the student has open, published for the companion in the root layout. */
export type AkoStudy = {
  lesson?: { eventId: string; lessonId: string; onLine: (id: string) => void; onPause: () => void };
  testId: string;
  title: string;
  questions: { id: string; label: string }[];
  answerFor: (questionId: string) => string;
};
let study: AkoStudy | null = null;
export const akoStudy = () => study;
export function setAkoStudy(next: AkoStudy | null) {
  study = next;
  window.dispatchEvent(new Event('ako:study'));
}
/** Open Ako's chat focused on one question. */
export function askAkoAbout(questionId: string) {
  window.dispatchEvent(new CustomEvent('ako:ask', { detail: { questionId } }));
}
