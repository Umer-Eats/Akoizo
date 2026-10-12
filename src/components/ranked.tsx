'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lock,
  Maximize,
  ShieldAlert,
  Trophy,
} from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { eventsForDivision } from '@/lib/events';
import type { Answers } from '@/lib/practice-types';
import type { StudentRankedDetail, StudentRankedTest } from '@/lib/ranked-types';
import { ChoiceOptions } from './choice-options';
import { RankedReview } from './ranked-review';
import './practice.css';
import './ranked.css';

const statusLabel = {
  assigned: 'NOT STARTED',
  'in-progress': 'IN PROGRESS',
  submitted: 'SUBMITTED',
  released: 'RESULTS RELEASED',
} as const;

function formatClock(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${rest}` : `${minutes}:${rest}`;
}
function ScoreLine({ test }: { test: StudentRankedTest }) {
  if (!test.score) return null;
  return (
    <strong className="ranked-score-line">
      {test.score.score} / {test.score.maxScore} points · {test.score.percentage}%
    </strong>
  );
}

/** Every ranked test the instructor has assigned to this student for one event. */
export function RankedTestList({ eventId }: { eventId: string }) {
  const { request, profile } = useAuth();
  const [tests, setTests] = useState<StudentRankedTest[] | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setTests(null);
    setError('');
    request<StudentRankedTest[]>('/api/ranked')
      .then((rows) => {
        if (active) setTests(rows);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, profile?.id, retry]);
  if (error)
    return (
      <div className="practice-empty">
        <p role="alert">{error}</p>
        <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
          Try again
        </button>
      </div>
    );
  if (!tests) return <p role="status">Loading your ranked tests…</p>;
  const mine = tests.filter(
    (test) => test.eventId === eventId && test.division === profile!.division,
  );
  const elsewhere = tests.filter(
    (test) => test.eventId !== eventId && test.division === profile!.division,
  );
  const otherEvents = [...new Set(elsewhere.map((test) => test.eventId))];
  return (
    <section className="practice-library ranked-library" aria-label="Assigned ranked tests">
      <p className="practice-count" aria-live="polite">
        {mine.length} ranked {mine.length === 1 ? 'test' : 'tests'} assigned for this event
      </p>
      {mine.length ? (
        <ul className="practice-test-list">
          {mine.map((test) => (
            <li key={test.id}>
              <Link href={`/dashboard/student/events/${eventId}/ranked-tests/${test.id}`}>
                <span className="practice-test-icon">
                  <Trophy size={22} />
                </span>
                <div>
                  <h2>{test.title}</h2>
                  <span className="tag ranked-status" data-status={test.status}>
                    {statusLabel[test.status]}
                  </span>
                  <p>
                    {test.questionCount} questions <b>·</b> {test.maxScore} points <b>·</b>{' '}
                    {test.minutes} minutes <b>·</b> Due <time dateTime={test.due}>{test.due}</time>
                  </p>
                  {test.score ? (
                    <p>
                      <ScoreLine test={test} />
                      {test.status === 'released'
                        ? ' · Open to review every answer.'
                        : ' · Answers stay locked until your instructor releases results.'}
                    </p>
                  ) : (
                    <p>
                      {test.status === 'in-progress'
                        ? 'Your timer is running. Return to the test now.'
                        : 'Opens in full screen. Start when you are ready to finish in one sitting.'}
                    </p>
                  )}
                </div>
                <ChevronRight size={20} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="practice-empty">
          <Trophy size={30} />
          <h2>No ranked tests assigned yet.</h2>
          <p>Ranked tests from your instructor for this event will appear here.</p>
        </div>
      )}
      {otherEvents.length > 0 && (
        <p className="practice-note">
          You also have ranked tests in{' '}
          {otherEvents.map((id, index) => (
            <span key={id}>
              {index > 0 && ', '}
              <Link
                className="ranked-inline-link"
                href={`/dashboard/student/events/${id}/ranked-tests`}
              >
                {elsewhere.find((test) => test.eventId === id)!.eventName}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
      <p className="practice-note">
        Ranked tests combine questions from several past competition tests. Your score appears as
        soon as you submit and earns ranking points. Your instructor decides when the full results
        open.
      </p>
    </section>
  );
}

type KeyboardLock = { lock?: (keys: string[]) => Promise<void>; unlock?: () => void };
const keyboard = () => (navigator as Navigator & { keyboard?: KeyboardLock }).keyboard;
async function enterFullscreen() {
  try {
    if (!document.fullscreenElement)
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    // Where supported, Escape then needs a long press instead of leaving the test at once.
    await keyboard()
      ?.lock?.(['Escape'])
      .catch(() => {});
  } catch {
    /* The caller decides what to do when full screen was refused. */
  }
  return !!document.fullscreenElement;
}
function leaveFullscreen() {
  keyboard()?.unlock?.();
  if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
}

export function RankedTestView({ eventId, testId }: { eventId: string; testId: string }) {
  const { profile, request } = useAuth();
  const [detail, setDetail] = useState<StudentRankedDetail | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [outside, setOutside] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [violations, setViolations] = useState(0);
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>('saved');
  const [remaining, setRemaining] = useState<number | null>(null);
  // Without the Fullscreen API (some phones) the test still runs, and tab switches still count.
  const [canFullscreen, setCanFullscreen] = useState(true);
  const answersRef = useRef<Answers>({});
  const unsentViolations = useRef(0);
  const saving = useRef(false);
  const saveAgain = useRef(false);
  const clockOffset = useRef(0);
  const lastFlag = useRef(0);
  const submitting = useRef(false);
  const dirty = useRef(false);
  const autoSubmitted = useRef(false);
  // False once the attempt is handed in, so leaving full screen afterwards is not an exit.
  const watching = useRef(false);
  const event = eventsForDivision(profile!.division!).find((e) => e.id === eventId);
  const back = `/dashboard/student/events/${eventId}/ranked-tests`;
  const attempt = '/api/ranked/attempt';

  const apply = useCallback((next: StudentRankedDetail) => {
    clockOffset.current = Date.parse(next.now) - Date.now();
    setDetail(next);
    setViolations(next.test.violations);
    if (next.paper) {
      answersRef.current = next.paper.answers;
      setAnswers(next.paper.answers);
    }
  }, []);
  useEffect(() => {
    let active = true;
    setDetail(null);
    setError('');
    setCanFullscreen(document.fullscreenEnabled);
    request<StudentRankedDetail>(`/api/ranked?testId=${encodeURIComponent(testId)}`)
      .then((next) => {
        if (!active) return;
        if (next.test.eventId !== eventId)
          throw new Error('This test belongs to a different event.');
        apply(next);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, testId, eventId, retry, apply]);

  const save = useCallback(async () => {
    if (saving.current) {
      saveAgain.current = true;
      return;
    }
    saving.current = true;
    setSaveState('saving');
    const count = unsentViolations.current;
    unsentViolations.current = 0;
    try {
      await request(attempt, {
        method: 'POST',
        body: JSON.stringify({
          action: 'save',
          testId,
          answers: answersRef.current,
          violations: count,
        }),
      });
      setSaveState('saved');
    } catch {
      unsentViolations.current += count;
      setSaveState('error');
    } finally {
      saving.current = false;
      if (saveAgain.current) {
        saveAgain.current = false;
        void save();
      }
    }
  }, [request, testId]);

  const submit = useCallback(async () => {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError('');
    setConfirming(false);
    try {
      if (unsentViolations.current) await save();
      const next = await request<StudentRankedDetail>(attempt, {
        method: 'POST',
        body: JSON.stringify({ action: 'submit', testId, answers: answersRef.current }),
      });
      watching.current = false;
      setLocked(false);
      setOutside(false);
      leaveFullscreen();
      apply(next);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setError(authMessage(error));
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }, [request, testId, save, apply]);

  // The countdown follows the server's deadline, and time that runs out submits by itself.
  const deadline = detail?.test.status === 'in-progress' ? detail.test.deadline : null;
  useEffect(() => {
    if (!deadline) {
      setRemaining(null);
      return;
    }
    const tick = () => {
      const seconds = Math.max(
        0,
        Math.ceil((Date.parse(deadline) - (Date.now() + clockOffset.current)) / 1000),
      );
      setRemaining(seconds);
      if (seconds === 0 && !autoSubmitted.current) {
        autoSubmitted.current = true;
        void submit();
      }
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, submit]);

  // Autosave shortly after the student stops typing.
  useEffect(() => {
    if (!locked) return;
    const timer = window.setTimeout(() => {
      if (!dirty.current) return;
      dirty.current = false;
      void save();
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [answers, locked, save]);

  // While the test is open: keep it full screen, record every exit, and block the easy ways out.
  useEffect(() => {
    if (!locked) return;
    watching.current = true;
    const flag = () => {
      if (!watching.current || Date.now() - lastFlag.current < 1500) return;
      lastFlag.current = Date.now();
      unsentViolations.current++;
      setViolations((count) => count + 1);
      void save();
    };
    const onFullscreen = () => {
      const left = canFullscreen && !document.fullscreenElement;
      setOutside(left);
      if (left) flag();
    };
    const onVisibility = () => {
      if (document.hidden) flag();
    };
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    const block = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ['p', 's', 'u'].includes(e.key.toLowerCase()))
        e.preventDefault();
    };
    const onBack = () => history.pushState(null, '', location.href);
    history.pushState(null, '', location.href);
    document.documentElement.classList.add('ranked-locked');
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', flag);
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('popstate', onBack);
    window.addEventListener('keydown', onKey);
    for (const type of ['contextmenu', 'copy', 'cut', 'paste', 'dragstart'])
      document.addEventListener(type, block);
    return () => {
      document.documentElement.classList.remove('ranked-locked');
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', flag);
      window.removeEventListener('beforeunload', onUnload);
      window.removeEventListener('popstate', onBack);
      window.removeEventListener('keydown', onKey);
      for (const type of ['contextmenu', 'copy', 'cut', 'paste', 'dragstart'])
        document.removeEventListener(type, block);
    };
  }, [locked, canFullscreen, save]);
  useEffect(() => leaveFullscreen, []);

  async function begin() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      // Full screen must be requested first, while the click still counts as a user action.
      if (canFullscreen && !(await enterFullscreen())) {
        setError('Allow full screen to take this test, then try again.');
        return;
      }
      if (detail?.test.status === 'assigned')
        apply(
          await request<StudentRankedDetail>(attempt, {
            method: 'POST',
            body: JSON.stringify({ action: 'start', testId }),
          }),
        );
      setOutside(false);
      setLocked(true);
    } catch (error) {
      leaveFullscreen();
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function finishGrading() {
    setBusy(true);
    setError('');
    try {
      apply(
        await request<StudentRankedDetail>(attempt, {
          method: 'POST',
          body: JSON.stringify({ action: 'grade', testId }),
        }),
      );
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  function answer(id: string, value: string) {
    answersRef.current = { ...answersRef.current, [id]: value };
    dirty.current = true;
    setAnswers(answersRef.current);
  }

  if (!detail)
    return (
      <main id="main" className="page-container practice-page">
        <Link className="back-link" href={back}>
          <ChevronLeft size={16} /> Ranked tests
        </Link>
        <div className="practice-empty">
          {error ? (
            <>
              <p role="alert">{error}</p>
              <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
                Try again
              </button>
            </>
          ) : (
            <p role="status">Loading your ranked test…</p>
          )}
        </div>
      </main>
    );

  const { test, paper, review } = detail;
  const questions = paper?.questions ?? [];
  const answered = questions.filter((q) => (answers[q.id] ?? '').trim()).length;
  const timeUp = remaining === 0;

  if (locked && paper)
    return (
      <main id="main" className="ranked-lock" aria-label={test.title}>
        <header className="ranked-lock-bar">
          <div>
            <p className="eyebrow">
              RANKED TEST / {event?.name.toUpperCase()} / DIVISION {test.division}
            </p>
            <strong>{test.title}</strong>
          </div>
          <span
            className="practice-timer"
            role="timer"
            aria-label="Time left"
            data-low={remaining !== null && remaining <= 300}
          >
            <Clock3 size={16} aria-hidden="true" />
            <span>Time left</span>
            <strong>{formatClock(remaining ?? 0)}</strong>
          </span>
          <span className="ranked-lock-status" role="status">
            {answered} of {questions.length} answered ·{' '}
            {saveState === 'saved'
              ? 'Saved'
              : saveState === 'saving'
                ? 'Saving…'
                : 'Not saved. Retrying on your next answer.'}
          </span>
          <button
            className="button button-small button-primary"
            disabled={busy}
            onClick={() => setConfirming(true)}
          >
            {busy ? 'Submitting…' : 'Submit test'}
          </button>
        </header>
        {violations > 0 && (
          <p className="ranked-lock-warning" role="status">
            <ShieldAlert size={16} aria-hidden="true" /> You left the test {violations}{' '}
            {violations === 1 ? 'time' : 'times'}. Your instructor can see this.
          </p>
        )}
        {!canFullscreen && (
          <p className="ranked-lock-warning" role="status">
            This browser cannot go full screen. Stay on this tab until you submit.
          </p>
        )}
        <form
          className="ranked-lock-body"
          inert={outside || confirming || busy}
          onSubmit={(e) => {
            e.preventDefault();
            setConfirming(true);
          }}
        >
          {questions.map((question) => (
            <fieldset className="practice-question" key={question.id}>
              <legend>
                {question.label} <span>{question.points} points</span>
              </legend>
              {question.context && <p className="practice-question-context">{question.context}</p>}
              <p className="ranked-prompt">{question.prompt}</p>
              {question.type === 'mcq' ? (
                <>
                  <p className="practice-question-reference">
                    {question.multiple ? 'Select all that apply.' : 'Choose one answer.'}
                  </p>
                  <ChoiceOptions
                    name={question.id}
                    label={question.label}
                    options={question.options!}
                    value={answers[question.id] ?? ''}
                    multiple={question.multiple}
                    onChange={(value) => answer(question.id, value)}
                  />
                </>
              ) : (
                <label className="practice-written">
                  <span>Your answer</span>
                  <textarea
                    rows={3}
                    maxLength={10000}
                    value={answers[question.id] ?? ''}
                    placeholder="Type your answer…"
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(e) => answer(question.id, e.target.value)}
                  />
                </label>
              )}
            </fieldset>
          ))}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="practice-submit">
            <p>
              {questions.length - answered > 0
                ? `${questions.length - answered} unanswered questions will receive zero points.`
                : 'Every question is answered.'}
            </p>
            <button className="button button-primary" type="submit" disabled={busy}>
              {busy ? 'Submitting…' : 'Submit test'}
            </button>
          </div>
        </form>
        {confirming && !outside && (
          <div className="ranked-lock-blocker" role="alertdialog" aria-label="Submit your test?">
            <h2>Submit your test?</h2>
            <p>
              {questions.length - answered > 0
                ? `${questions.length - answered} of ${questions.length} questions are unanswered. `
                : 'Every question is answered. '}
              You cannot change your answers after submitting.
            </p>
            <div className="practice-result-actions">
              <button className="button button-primary" onClick={() => void submit()}>
                Submit for grading
              </button>
              <button className="button button-secondary" onClick={() => setConfirming(false)}>
                Keep working
              </button>
            </div>
          </div>
        )}
        {outside && (
          <div
            className="ranked-lock-blocker"
            role="alertdialog"
            aria-label="Return to full screen"
          >
            <Lock size={30} aria-hidden="true" />
            <h2>Return to full screen to continue.</h2>
            <p>
              Your test is hidden while you are outside full screen. Your timer is still running,
              and this exit was recorded for your instructor.
            </p>
            <button
              className="button button-primary"
              onClick={async () => setOutside(!(await enterFullscreen()))}
            >
              <Maximize size={16} aria-hidden="true" /> Return to the test
            </button>
          </div>
        )}
        {timeUp && busy && (
          <div className="ranked-lock-blocker" role="status">
            <h2>Time is up.</h2>
            <p>Submitting your answers…</p>
          </div>
        )}
      </main>
    );

  return (
    <main id="main" className="page-container practice-page ranked-page">
      <Link className="back-link" href={back}>
        <ChevronLeft size={16} /> Ranked tests
      </Link>
      <header className="practice-heading">
        <p className="eyebrow">
          {event?.name} / DIVISION {test.division} / RANKED TEST
        </p>
        <h1>{test.title}</h1>
        <p>
          {test.questionCount} questions · {test.maxScore} points · {test.minutes} minutes · Due{' '}
          <time dateTime={test.due}>{test.due}</time>
        </p>
      </header>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {(test.status === 'assigned' || test.status === 'in-progress') && (
        <section className="ranked-briefing" aria-label="Before you begin">
          <Lock size={28} aria-hidden="true" />
          <h2>
            {timeUp
              ? 'Time is up.'
              : test.status === 'assigned'
                ? 'This test locks your screen until you submit.'
                : 'Your test is still running.'}
          </h2>
          {timeUp ? (
            <p>
              {busy ? 'Submitting your saved answers…' : 'Your saved answers are ready to submit.'}
            </p>
          ) : (
            <ul>
              <li>The test opens in full screen and stays there until you submit.</li>
              <li>
                Leaving full screen or switching tabs hides the test and is reported to your
                instructor.
              </li>
              <li>
                You have {test.minutes} minutes. The timer starts when you begin, cannot be paused,
                and submits your answers when it ends.
              </li>
              <li>Copying, pasting, and printing are turned off during the test.</li>
              <li>
                You see your score right away. Answers open when your instructor releases results.
              </li>
            </ul>
          )}
          {test.status === 'in-progress' && remaining !== null && !timeUp && (
            <p className="ranked-briefing-clock" role="timer">
              Time left <strong>{formatClock(remaining)}</strong>
            </p>
          )}
          {timeUp ? (
            <button className="button button-primary" disabled={busy} onClick={() => void submit()}>
              {busy ? 'Submitting…' : 'Submit my answers'}
            </button>
          ) : (
            <button className="button button-primary" disabled={busy} onClick={begin}>
              <Maximize size={16} aria-hidden="true" />
              {busy
                ? 'Opening…'
                : test.status === 'assigned'
                  ? 'Enter full screen and start'
                  : 'Return to the test'}
            </button>
          )}
          {!canFullscreen && (
            <p className="practice-note">
              This browser cannot go full screen. The test still runs here, and leaving the tab is
              recorded.
            </p>
          )}
        </section>
      )}
      {test.score && (
        <section className="practice-result" aria-label="Your score">
          <div>
            <p className="eyebrow">
              {test.score.pendingPoints ? 'PROVISIONAL SCORE' : 'YOUR SCORE'}
            </p>
            <h2>
              {test.score.score}
              <span> / {test.score.maxScore} points</span>
            </h2>
          </div>
          <strong className="practice-percentage">{test.score.percentage}%</strong>
          {test.score.grading === 'pending' ? (
            <p>
              Your answers are saved. Written answers worth {test.score.pendingPoints} points are
              still waiting to be graded, so this score can go up.
            </p>
          ) : test.score.pendingPoints ? (
            <p>
              {test.score.pendingPoints} points are waiting for your instructor’s review. These are
              pending, not marked incorrect.
            </p>
          ) : (
            <p>Your test is graded and your ranking points are saved.</p>
          )}
          {test.status === 'submitted' && (
            <p>
              <Lock size={14} aria-hidden="true" /> Your answers and the correct answers stay locked
              until your instructor releases results.
            </p>
          )}
          {test.score.grading === 'pending' && (
            <div className="practice-result-actions">
              <button className="button button-primary" disabled={busy} onClick={finishGrading}>
                {busy ? 'Grading…' : 'Finish grading'}
              </button>
            </div>
          )}
        </section>
      )}
      {review && (
        <>
          <details className="practice-alignment">
            <summary>Where these questions came from</summary>
            {review.sources.map((source) => (
              <p key={source.testId}>
                {source.title} · {source.questions}{' '}
                {source.questions === 1 ? 'question' : 'questions'}
              </p>
            ))}
          </details>
          <div className="practice-answer-heading">
            <h2>Answer review</h2>
            <p>Correct multiple-choice options are green. Written rubric answers are red.</p>
          </div>
          <RankedReview questions={review.questions} result={review.result} />
        </>
      )}
    </main>
  );
}
