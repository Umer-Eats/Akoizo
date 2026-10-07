'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Search,
} from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { eventsForDivision } from '@/lib/events';
import {
  competitionLevels,
  practiceTitle,
  PRACTICE_SEASON,
  type Answers,
  type PracticePaper,
  type PracticeSummary,
  type PracticeResult,
} from '@/lib/practice-types';
import './practice.css';

export function PracticeLibrary({ eventId }: { eventId: string }) {
  const { request, profile } = useAuth();
  const [tests, setTests] = useState<PracticeSummary[] | null>(null);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setTests(null);
    setError('');
    request<{ tests: PracticeSummary[] }>(`/api/practice?eventId=${encodeURIComponent(eventId)}`)
      .then((data) => {
        if (active) setTests(data.tests);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, eventId, profile?.division, retry]);
  const matches =
    tests?.filter(
      (test) =>
        (!level || test.level === level) &&
        (!year || String(test.year) === year) &&
        `${practiceTitle(test)} ${test.topics.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    ) ?? [];
  return (
    <section className="practice-library" aria-label="Past competition tests">
      <div className="practice-search">
        <Search size={20} aria-hidden="true" />
        <input
          aria-label="Search practice tests"
          placeholder="Search competition, year, or topic…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Clear search">
            Clear
          </button>
        )}
      </div>
      <div className="practice-filters">
        <label>
          Level
          <select aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">All levels</option>
            {competitionLevels.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Year
          <select aria-label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {[...new Set(tests?.map((t) => t.year))]
              .sort((a, b) => b - a)
              .map((value) => (
                <option key={value}>{value}</option>
              ))}
          </select>
        </label>
        <span className="practice-season">
          <Check size={16} /> Reviewed for {PRACTICE_SEASON} · Division {profile?.division}
        </span>
      </div>
      {error ? (
        <div className="practice-empty">
          <p role="alert">{error}</p>
          <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
            Try again
          </button>
        </div>
      ) : !tests ? (
        <p role="status">Loading past competition tests…</p>
      ) : (
        <>
          <p className="practice-count" aria-live="polite">
            {matches.length} {matches.length === 1 ? 'test' : 'tests'} available
          </p>
          {matches.length ? (
            <ul className="practice-test-list">
              {matches.map((test) => (
                <li key={test.id}>
                  <Link href={`/dashboard/student/events/${eventId}/practice-tests/${test.id}`}>
                    <span className="practice-test-icon">
                      <FileText size={22} />
                    </span>
                    <div>
                      <h2>{practiceTitle(test)}</h2>
                      <p>{test.topics.join(' · ')}</p>
                      <span>
                        {test.questionCount} answer fields <b>·</b> {test.maxScore} points <b>·</b>{' '}
                        {test.minutes} minutes
                        <br />
                        {test.scoringBasis}
                      </span>
                    </div>
                    <ChevronRight size={20} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="practice-empty">
              <FileText size={30} />
              <h2>
                {tests.length
                  ? 'No tests match your search.'
                  : 'No verified tests for this event yet.'}
              </h2>
              <p>
                {tests.length
                  ? 'Try a different competition, year, or level.'
                  : `A complete paper, scoring key, and ${PRACTICE_SEASON} topic check are required before a test appears here.`}
              </p>
              {tests.length > 0 && (
                <button
                  className="button button-secondary"
                  onClick={() => {
                    setQuery('');
                    setLevel('');
                    setYear('');
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
          <p className="practice-note">
            Past papers keep their original questions. Each listing explains its {PRACTICE_SEASON}{' '}
            subject match, topic differences, and scoring basis. Check the Rules tab for this year’s
            requirements. Gemini grades written explanations against the published rubric; uncertain
            answers remain available for instructor review.
          </p>
        </>
      )}
    </section>
  );
}

type Draft = { answers: Answers; submissionId: string; elapsedSeconds?: number };

function formatElapsed(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

export function PracticeTestView({ eventId, testId }: { eventId: string; testId: string }) {
  const { profile, request } = useAuth();
  const [paper, setPaper] = useState<PracticePaper | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [attempts, setAttempts] = useState<PracticeResult[]>([]);
  const [result, setResult] = useState<PracticeResult | null>(null);
  const [error, setError] = useState('');
  const [saveWarning, setSaveWarning] = useState('');
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const submissionId = useRef('');
  const summary = useRef<HTMLElement>(null);
  const storageKey = `akoizo-practice:${profile!.id}:${profile!.division}:${testId}`;
  const event = eventsForDivision(profile!.division!).find((e) => e.id === eventId);
  const back = `/dashboard/student/events/${eventId}/practice-tests`;
  useEffect(() => {
    let active = true;
    setPaper(null);
    setError('');
    setReady(false);
    setResult(null);
    setAnswers({});
    setViewingHistory(false);
    setSaveWarning('');
    setElapsedSeconds(0);
    request<{ test: PracticePaper; attempts: PracticeResult[] }>(
      `/api/practice?testId=${encodeURIComponent(testId)}`,
    )
      .then((data) => {
        if (!active) return;
        if (data.test.eventId !== eventId)
          throw new Error('This test belongs to a different event.');
        setPaper(data.test);
        setAttempts(data.attempts);
        submissionId.current = crypto.randomUUID();
        try {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            const draft: Draft = JSON.parse(saved);
            if (
              typeof draft.submissionId === 'string' &&
              /^[\da-f-]{36}$/i.test(draft.submissionId) &&
              draft.answers &&
              typeof draft.answers === 'object' &&
              !Array.isArray(draft.answers)
            ) {
              const allowed = new Set(data.test.questions.map((q) => q.id));
              setAnswers(
                Object.fromEntries(
                  Object.entries(draft.answers).filter(
                    ([id, value]) => allowed.has(id) && typeof value === 'string',
                  ),
                ),
              );
              submissionId.current = draft.submissionId;
              if (
                typeof draft.elapsedSeconds === 'number' &&
                Number.isInteger(draft.elapsedSeconds) &&
                draft.elapsedSeconds >= 0 &&
                draft.elapsedSeconds <= 7 * 24 * 60 * 60
              )
                setElapsedSeconds(draft.elapsedSeconds);
            }
          }
        } catch {
          setSaveWarning(
            'Draft saving is unavailable in this browser. Keep this page open until you submit.',
          );
        }
        setReady(true);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, testId, eventId, storageKey, retry]);
  useEffect(() => {
    if (!ready || result) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ answers, submissionId: submissionId.current, elapsedSeconds }),
      );
    } catch {
      setSaveWarning(
        'Your draft could not be saved in this browser. Keep this page open until you submit.',
      );
    }
  }, [answers, elapsedSeconds, ready, result, storageKey]);
  useEffect(() => {
    if (!ready || result || pending || viewingHistory) return;
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [pending, ready, result, viewingHistory]);
  async function submit() {
    if (pending || !paper) return;
    setPending(true);
    setError('');
    try {
      const graded = await request<PracticeResult>('/api/practice', {
        method: 'POST',
        body: JSON.stringify({ testId, submissionId: submissionId.current, answers }),
      });
      setResult(graded);
      setViewingHistory(false);
      setAttempts((current) => [graded, ...current.filter((a) => a.id !== graded.id)]);
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* The saved submission is authoritative. */
      }
      requestAnimationFrame(() => {
        summary.current?.focus();
        summary.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setPending(false);
    }
  }
  function startAgain() {
    submissionId.current = crypto.randomUUID();
    setAnswers({});
    setElapsedSeconds(0);
    setResult(null);
    setError('');
    setViewingHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const answered = paper?.questions.filter((q) => (answers[q.id] ?? '').trim()).length ?? 0;
  return (
    <main id="main" className="page-container practice-page">
      <Link className="back-link" href={back}>
        <ChevronLeft size={16} /> Practice tests
      </Link>
      {!paper ? (
        <div className="practice-empty">
          {error ? (
            <>
              <p role="alert">{error}</p>
              <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
                Try again
              </button>
            </>
          ) : (
            <p role="status">Loading your test…</p>
          )}
        </div>
      ) : (
        <>
          <header className="practice-heading">
            <p className="eyebrow">
              {event?.name} / DIVISION {paper.division}
            </p>
            <h1>{practiceTitle(paper)}</h1>
            <p>
              {paper.questionCount} answer fields · {paper.maxScore} points · {paper.minutes}{' '}
              minutes suggested
            </p>
          </header>
          <details className="practice-alignment" open>
            <summary>
              <Check size={16} /> {paper.season} subject match & scoring
            </summary>
            <p>{paper.alignment}</p>
            <p>
              <strong>{paper.scoringBasis}.</strong> {paper.instructions}
            </p>
            <a href={paper.sourceUrl} target="_blank" rel="noreferrer">
              Competition source <ArrowUpRight size={14} />
            </a>
          </details>
          {attempts.length > 0 && (
            <details className="practice-history">
              <summary>Previous submissions ({attempts.length})</summary>
              {attempts.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    if (!result) setViewingHistory(true);
                    setResult(a);
                    setError('');
                  }}
                >
                  <span>{new Date(a.completedAt).toLocaleString()}</span>
                  <strong>
                    {a.score}/{a.maxScore} · {a.percentage}%
                    {a.pendingPoints ? ' · Review needed' : ''}
                  </strong>
                </button>
              ))}
            </details>
          )}
          {result && (
            <section
              className="practice-result"
              ref={summary}
              tabIndex={-1}
              aria-label="Test results"
            >
              <div>
                <p className="eyebrow">
                  {result.pendingPoints ? 'PROVISIONAL SCORE' : 'YOUR SCORE'}
                </p>
                <h2>
                  {result.score}
                  <span> / {result.maxScore} points</span>
                </h2>
              </div>
              <strong className="practice-percentage">{result.percentage}%</strong>
              <p>
                {result.pendingPoints
                  ? `${result.pendingPoints} points need rubric review for written explanations. These are pending, not marked incorrect.`
                  : 'Your submission is saved. Review every answer below.'}
              </p>
              {result.attemptNumber && result.attemptNumber > 1 && (
                <p>
                  Repeat attempt: this score is for practice feedback only. No additional points or
                  assignment credit are awarded.
                </p>
              )}
              <p>
                Correct multiple-choice options are green. Written rubric answers are red. Your
                original answers stay visible.
              </p>
              {result.automaticGrading === 'complete' && (
                <p>Written feedback was graded with Gemini using this test’s rubric.</p>
              )}
              {result.automaticGrading === 'unavailable' && (
                <p>
                  Automatic written-answer grading is unavailable. Your answers are saved, and the
                  remaining points need instructor review.
                </p>
              )}
              <div className="practice-result-actions">
                <a
                  className="button button-secondary"
                  href={result.keyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Published answer key <ArrowUpRight size={16} />
                </a>
                <button className="button button-primary" onClick={startAgain}>
                  Try again
                </button>
              </div>
            </section>
          )}
          {viewingHistory && (
            <button
              className="button button-secondary"
              onClick={() => {
                setResult(null);
                setViewingHistory(false);
              }}
            >
              Return to your draft
            </button>
          )}
          <div className="practice-workspace">
            <section className="practice-paper" aria-label="Complete competition paper">
              <div className="practice-paper-heading">
                <h2>Original test</h2>
                <a href={paper.paperUrl} target="_blank" rel="noreferrer">
                  Open paper <ArrowUpRight size={15} />
                </a>
              </div>
              <iframe
                title={`Complete test: ${practiceTitle(paper)}`}
                src={paper.paperUrl.replace(/\/view(?:\?.*)?$/, '/preview')}
                allowFullScreen
              />
              <p>
                Scroll through the entire original paper here. All diagrams and case studies are
                included. If your browser cannot display it, use Open paper.
              </p>
            </section>
            <form
              className="practice-answer-sheet"
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
            >
              <div className="practice-answer-heading">
                <div className="practice-answer-title">
                  <h2>{result ? 'Answer review' : 'Your answers'}</h2>
                  <span className="practice-timer" role="timer" aria-label="Time spent">
                    <Clock3 size={16} aria-hidden="true" />
                    <span>Time spent</span>
                    <strong>{formatElapsed(elapsedSeconds)}</strong>
                  </span>
                </div>
                <p>
                  {result
                    ? 'Question numbers follow the original paper.'
                    : `${answered} of ${paper.questionCount} answered · ${saveWarning ? 'Draft not saved' : 'Draft saved in this browser'}`}
                </p>
              </div>
              {saveWarning && !result && (
                <p className="form-error" role="status">
                  {saveWarning}
                </p>
              )}
              {paper.questions.map((question) => {
                const graded = result?.questions.find((q) => q.id === question.id);
                const value = graded?.answer ?? answers[question.id] ?? '';
                const review = graded?.criteria.some((c) => c.needsReview);
                return (
                  <fieldset
                    className="practice-question"
                    key={question.id}
                    disabled={pending || !!result}
                  >
                    <legend>
                      {question.label}{' '}
                      <span>
                        {graded ? `${graded.earned} / ` : ''}
                        {question.points} points{review ? ' · Pending review' : ''}
                      </span>
                    </legend>
                    <p className="practice-question-reference">
                      Paper page {question.page}
                      {question.prompt ? ` · ${question.prompt}` : ''}
                    </p>
                    {question.type === 'mcq' ? (
                      <>
                        <p className="practice-question-reference">
                          {question.multiple ? 'Select all that apply.' : 'Choose one answer.'}
                        </p>
                        <div
                          className="practice-options"
                          role={question.multiple ? 'group' : 'radiogroup'}
                          aria-label={question.label}
                        >
                          {question.options!.map((option) => {
                            const selected = question.multiple
                              ? value.split(',').includes(option.id)
                              : value === option.id;
                            const correct = (
                              graded?.correctOptions ??
                              graded?.acceptedOptions ?? [graded?.correctOption]
                            ).includes(option.id);
                            return (
                              <label
                                className={`practice-option${selected ? ' selected' : ''}${correct ? ' correct' : ''}`}
                                key={option.id}
                              >
                                <input
                                  type={question.multiple ? 'checkbox' : 'radio'}
                                  name={question.id}
                                  value={option.id}
                                  checked={selected}
                                  onChange={() =>
                                    setAnswers((a) => {
                                      const existing = (a[question.id] ?? '')
                                        .split(',')
                                        .filter(Boolean);
                                      return {
                                        ...a,
                                        [question.id]: question.multiple
                                          ? (selected
                                              ? existing.filter((v) => v !== option.id)
                                              : [...existing, option.id]
                                            )
                                              .sort()
                                              .join(',')
                                          : option.id,
                                      };
                                    })
                                  }
                                />
                                <span>{option.text}</span>
                                {selected && <small>Your answer</small>}
                                {correct && (
                                  <small>
                                    <Check size={14} /> Correct answer
                                  </small>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <label className="practice-written">
                        <span>Your answer</span>
                        <textarea
                          rows={3}
                          maxLength={10000}
                          value={value}
                          placeholder="Type your answer…"
                          onChange={(e) =>
                            setAnswers((a) => ({ ...a, [question.id]: e.target.value }))
                          }
                        />
                      </label>
                    )}
                    {graded && !graded.answer.trim() && (
                      <p className="practice-unanswered">Not answered</p>
                    )}
                    {graded && question.type === 'frq' && (
                      <div className="practice-rubric">
                        <h3>Rubric answer</h3>
                        {graded.criteria.map((criterion) => (
                          <p key={criterion.id}>
                            {criterion.answer}
                            <span>
                              {criterion.needsReview
                                ? 'Needs review'
                                : `${criterion.earned}/${criterion.points} points`}
                            </span>
                            {criterion.feedback && (
                              <span>
                                {criterion.gradedBy === 'gemini' ? 'Gemini feedback: ' : ''}
                                {criterion.feedback}
                              </span>
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              })}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              {!result && (
                <div className="practice-submit">
                  <p>
                    Written answers may be sent to Gemini with the test rubric for automatic
                    grading. Avoid including personal information in your answers.
                  </p>
                  <p>
                    {paper.questionCount - answered > 0
                      ? `${paper.questionCount - answered} unanswered fields will receive zero points.`
                      : 'Every answer field is filled.'}
                  </p>
                  <button
                    className="button button-primary"
                    type="submit"
                    disabled={pending || !ready}
                  >
                    {pending ? 'Grading and saving…' : 'Submit test'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </main>
  );
}
