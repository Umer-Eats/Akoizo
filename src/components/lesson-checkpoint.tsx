'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import type { Lesson } from '@/lib/lessons';
import { checkpointProgress, type CheckResult, type LessonAttempt } from '@/lib/lesson-practice';
import { ChoiceOptions } from './choice-options';
import './lesson-checkpoint.css';

/** What the server said about one checked answer. */
export type CheckOutcome =
  | { status: 'checked'; result: CheckResult }
  | { status: 'self-mark' }
  | { status: 'error'; message: string };

type DotState = 'correct' | 'incorrect' | 'answered' | 'empty';
const dotLabel: Record<DotState, string> = {
  correct: 'correct',
  incorrect: 'incorrect',
  answered: 'answered, not checked yet',
  empty: 'not answered',
};

/**
 * The lesson checkpoint: one question at a time, each checked as the student goes. Numbered
 * circles show progress and turn green or red once a question is checked.
 */
export function CheckpointView({
  lesson,
  attempt,
  completed,
  onAnswer,
  onCheck,
  onRetake,
}: {
  lesson: Lesson;
  attempt: LessonAttempt;
  /** The lesson is recorded as complete for the instructor. */
  completed: boolean;
  onAnswer: (questionId: string, answer: string) => void;
  onCheck: (questionId: string, answer: string, selfMark?: boolean) => Promise<CheckOutcome>;
  onRetake: () => Promise<void>;
}) {
  const questions = lesson.practice;
  const firstOpen = questions.findIndex((q) => !attempt.checks[q.id]);
  const [index, setIndex] = useState(firstOpen < 0 ? 0 : firstOpen);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // Written answer waiting for the student's own mark because AI marking is unavailable.
  const [selfMarking, setSelfMarking] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const wasComplete = useRef(checkpointProgress(attempt, questions).complete);
  const progress = checkpointProgress(attempt, questions);
  const q = questions[Math.min(index, questions.length - 1)];
  const answer = attempt.answers[q.id] ?? '';
  const check = attempt.checks[q.id];
  const state = (id: string): DotState => {
    const c = attempt.checks[id];
    if (c) return c.correct ? 'correct' : 'incorrect';
    return attempt.answers[id]?.trim() ? 'answered' : 'empty';
  };
  const go = (next: number) => {
    setIndex(next);
    setError('');
    setSelfMarking('');
    requestAnimationFrame(() => cardRef.current?.focus({ preventScroll: true }));
  };
  const nextOpen = () => {
    const after = questions.findIndex((item, i) => i > index && !attempt.checks[item.id]);
    const any = questions.findIndex((item) => !attempt.checks[item.id] && item.id !== q.id);
    return after >= 0 ? after : any;
  };
  const submit = async (selfMark?: boolean) => {
    setBusy(true);
    setError('');
    const outcome = await onCheck(q.id, answer, selfMark);
    setBusy(false);
    if (outcome.status === 'self-mark') setSelfMarking(q.id);
    else if (outcome.status === 'error') setError(outcome.message);
    else setSelfMarking('');
  };
  // Bring the result into view the moment the last question is checked.
  useEffect(() => {
    if (progress.complete && !wasComplete.current)
      summaryRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    wasComplete.current = progress.complete;
  }, [progress.complete]);
  const percent = progress.total ? Math.round((progress.correct / progress.total) * 100) : 0;
  const upcoming = check ? nextOpen() : -1;

  return (
    <section
      id="lesson-practice"
      className="lesson-quiz lc"
      aria-labelledby="lesson-practice-title"
    >
      <header className="lc-head">
        <div>
          <p className="eyebrow">CHECKPOINT · CHECK AS YOU GO</p>
          <h3 id="lesson-practice-title">Show what you learned</h3>
          <p>
            Answer a question, then check it straight away. Each answer is marked and explained, and
            your results are saved for your instructor.
          </p>
        </div>
        <p className="lc-tally" aria-live="polite">
          <strong>
            {progress.correct}/{progress.total}
          </strong>
          <span>
            correct · {progress.checked} of {progress.total} checked
          </span>
        </p>
      </header>

      <nav className="lc-nav" aria-label="Checkpoint questions">
        <ol className="lc-dots">
          {questions.map((item, i) => {
            const s = state(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="lc-dot"
                  data-state={s}
                  aria-current={i === index ? 'step' : undefined}
                  aria-label={`Question ${i + 1}, ${dotLabel[s]}`}
                  onClick={() => go(i)}
                >
                  {i + 1}
                  {/* A shape as well as a colour, so the result never depends on colour alone. */}
                  {s === 'correct' && (
                    <i className="lc-badge">
                      <Check size={10} strokeWidth={4} aria-hidden="true" />
                    </i>
                  )}
                  {s === 'incorrect' && (
                    <i className="lc-badge">
                      <X size={10} strokeWidth={4} aria-hidden="true" />
                    </i>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="lc-legend" aria-hidden="true">
          <span data-state="correct">Correct</span>
          <span data-state="incorrect">Incorrect</span>
          <span data-state="answered">Answered</span>
        </p>
      </nav>

      <div
        key={q.id}
        ref={cardRef}
        className="quiz-question lc-card"
        data-result={check ? (check.correct ? 'correct' : 'incorrect') : undefined}
        tabIndex={-1}
        role="group"
        aria-labelledby="lc-prompt"
      >
        <p className="lc-meta">
          Question {index + 1} of {questions.length} ·{' '}
          {q.type === 'mcq' ? 'Multiple choice' : 'Written answer'}
        </p>
        <h4 id="lc-prompt" className="lc-prompt">
          {q.prompt}
        </h4>
        <fieldset disabled={!!check || busy} className="lc-answer">
          <legend className="sr-only">Your answer</legend>
          {q.type === 'mcq' && q.options ? (
            <ChoiceOptions
              name={q.id}
              label={q.prompt}
              options={q.options.map((option) => ({ id: option, text: option }))}
              value={answer}
              correctOptions={check ? [q.answer] : []}
              onChange={(value) => onAnswer(q.id, value)}
            />
          ) : (
            <label className="quiz-written">
              <span>Your answer</span>
              <textarea
                rows={4}
                maxLength={4000}
                value={answer}
                readOnly={!!check}
                onChange={(event) => onAnswer(q.id, event.target.value)}
                placeholder="Explain your reasoning. Show any calculation and include units."
              />
            </label>
          )}
        </fieldset>

        {!check && selfMarking !== q.id && (
          <div className="lc-actions">
            <button
              type="button"
              className="button button-primary"
              disabled={!answer.trim() || busy}
              onClick={() => submit()}
            >
              {busy ? 'Checking…' : 'Check answer'}
            </button>
            {!answer.trim() && (
              <span className="lc-hint">
                {q.type === 'mcq'
                  ? 'Choose an answer to check it.'
                  : 'Write an answer to check it.'}
              </span>
            )}
          </div>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error} Your answer is still here; try checking it again.
          </p>
        )}

        {!check && selfMarking === q.id && (
          <div className="lc-feedback lc-selfmark" role="status">
            <p className="lc-verdict-note">
              Automatic marking is unavailable right now. Compare your answer with the model answer,
              then mark it honestly.
            </p>
            <Explanation lesson={lesson} questionId={q.id} />
            <div className="lc-actions">
              <button
                type="button"
                className="button button-primary"
                disabled={busy}
                onClick={() => submit(true)}
              >
                <Check size={16} aria-hidden="true" /> My answer matches
              </button>
              <button
                type="button"
                className="button button-glass"
                disabled={busy}
                onClick={() => submit(false)}
              >
                <X size={16} aria-hidden="true" /> I missed the key idea
              </button>
            </div>
          </div>
        )}

        {check && (
          <div className="lc-feedback" role="status">
            <p className="lc-verdict" data-result={check.correct ? 'correct' : 'incorrect'}>
              {check.correct ? (
                <Check size={18} strokeWidth={3} aria-hidden="true" />
              ) : (
                <X size={18} strokeWidth={3} aria-hidden="true" />
              )}
              {check.correct ? 'Correct' : 'Not quite'}
              <small>
                {check.by === 'key'
                  ? 'Marked by the answer key'
                  : check.by === 'ai'
                    ? 'Marked by AI against the model answer'
                    : 'Marked by you against the model answer'}
              </small>
            </p>
            {q.type === 'mcq' && !check.correct && (
              <p className="lc-chosen">
                You chose <strong>{answer}</strong>. The answer is <strong>{q.answer}</strong>.
              </p>
            )}
            {check.feedback && (
              <div className="lc-block">
                <h5>Feedback on your answer</h5>
                <p>{check.feedback}</p>
              </div>
            )}
            <Explanation lesson={lesson} questionId={q.id} />
            <div className="lc-actions">
              {upcoming >= 0 ? (
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => go(upcoming)}
                >
                  Next question <ArrowRight size={16} aria-hidden="true" />
                </button>
              ) : (
                index < questions.length - 1 && (
                  <button
                    type="button"
                    className="button button-glass"
                    onClick={() => go(index + 1)}
                  >
                    Review question {index + 2} <ArrowRight size={16} aria-hidden="true" />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {progress.complete && (
        <div ref={summaryRef} className="lc-summary" role="status">
          <div className="lc-summary-score" data-pass={percent >= 70 || undefined}>
            <strong>{percent}%</strong>
            <span>
              {progress.correct} of {progress.total} correct
            </span>
          </div>
          <div>
            <h4>{completed ? 'Lesson complete' : 'Checkpoint finished'}</h4>
            <p>
              {completed
                ? 'Your completion and results are saved for your instructor.'
                : 'Saving your results…'}{' '}
              {progress.correct < progress.total &&
                'Open any red circle to review the explanation before moving on.'}
            </p>
            <button
              type="button"
              className="button button-small button-glass"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await onRetake();
                  go(0);
                } catch {
                  setError('The checkpoint could not be reset.');
                } finally {
                  setBusy(false);
                }
              }}
            >
              <RotateCcw size={15} aria-hidden="true" /> Retake checkpoint
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Explanation({ lesson, questionId }: { lesson: Lesson; questionId: string }) {
  const q = lesson.practice.find((item) => item.id === questionId)!;
  return (
    <>
      {q.type === 'short' && (
        <div className="lc-block lc-model">
          <h5>Model answer</h5>
          <p>{q.answer}</p>
        </div>
      )}
      <div className="lc-block">
        <h5>Why</h5>
        <p>{q.explanation}</p>
      </div>
    </>
  );
}
