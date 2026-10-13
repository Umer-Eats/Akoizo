'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, Sparkles, Trophy, Users } from 'lucide-react';
import { eventsForDivision, type Division } from '@/lib/events';
import type { Student } from '@/lib/domain';
import {
  RANKED_MINUTES,
  RANKED_QUESTIONS,
  type InstructorRankedDetail,
  type InstructorRankedRow,
  type InstructorRankedTest,
  type RankedPool,
} from '@/lib/ranked-types';
import type { TeamSheet } from '@/lib/teams';
import { useAuth, authMessage } from './auth-context';
import { AssignEventModal, seatedTeams, type AssignResult } from './assign-event-modal';
import { RankedReview } from './ranked-review';
import './practice.css';
import './ranked.css';

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const statusText = {
  assigned: 'Not started',
  'in-progress': 'In progress',
  submitted: 'Submitted',
  released: 'Results released',
} as const;
function CreateRankedTest({
  students,
  onCreated,
}: {
  students: Student[];
  onCreated: (id: string) => Promise<void>;
}) {
  const { request } = useAuth();
  const common = (['C', 'B', 'A'] as const)
    .map((division) => ({ division, n: students.filter((s) => s.division === division).length }))
    .sort((a, b) => b.n - a.n)[0];
  const [division, setDivision] = useState<Division>(common.division);
  const [pool, setPool] = useState<RankedPool[] | null>(null);
  const [eventId, setEventId] = useState('');
  const [questions, setQuestions] = useState(String(RANKED_QUESTIONS.default));
  const [minutes, setMinutes] = useState(String(RANKED_MINUTES.default));
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setPool(null);
    setEventId('');
    request<RankedPool[]>(`/api/ranked?pool=${division}`)
      .then((rows) => {
        if (active) setPool(rows);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, division]);
  const events = eventsForDivision(division)
    .flatMap((event) => {
      const entry = pool?.find((item) => item.eventId === event.id);
      return entry ? [{ ...event, ...entry }] : [];
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const chosen = events.find((event) => event.id === eventId);
  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !chosen) return;
    setBusy(true);
    setError('');
    try {
      const created = await request<{ id: string }>('/api/ranked', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create',
          division,
          eventId,
          questionCount: Number(questions),
          minutes: Number(minutes),
          title,
        }),
      });
      setTitle('');
      await onCreated(created.id);
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="ranked-create" onSubmit={create}>
      <h3>
        <Sparkles size={18} aria-hidden="true" /> Build a ranked test with Akoizo
      </h3>
      <p>
        Akoizo picks questions from several converted tests of one event and combines them into a
        single new test. The original questions and answer keys are used unchanged.
      </p>
      <div className="ranked-create-fields">
        <label>
          Division
          <select
            aria-label="Division"
            value={division}
            onChange={(e) => setDivision(e.target.value as Division)}
          >
            {(['A', 'B', 'C'] as const).map((value) => (
              <option key={value} value={value}>
                Division {value}
              </option>
            ))}
          </select>
        </label>
        <label className="ranked-wide">
          Event
          <select
            aria-label="Event"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          >
            <option value="">{pool ? 'Choose an event' : 'Loading events…'}</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} · {event.questions} questions in {count(event.sources, 'test')}
              </option>
            ))}
          </select>
        </label>
        <label>
          Questions
          <input
            type="number"
            required
            min={RANKED_QUESTIONS.min}
            max={RANKED_QUESTIONS.max}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </label>
        <label>
          Minutes
          <input
            type="number"
            required
            min={RANKED_MINUTES.min}
            max={RANKED_MINUTES.max}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>
        <label className="ranked-wide">
          Test name (optional)
          <input
            value={title}
            maxLength={80}
            placeholder={chosen ? `${chosen.name} Ranked Test` : 'Named after the event'}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      {pool && !events.length && (
        <p>No Division {division} event has enough converted questions for a ranked test yet.</p>
      )}
      {chosen?.sources === 1 && (
        <p>
          {chosen.name} has one converted test so far, so every question will come from that test.
        </p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div>
        <button className="button button-primary" type="submit" disabled={busy || !chosen}>
          {busy ? 'Akoizo is choosing questions…' : 'Build ranked test'}
        </button>
      </div>
    </form>
  );
}

function AssignRankedModal({
  test,
  students,
  teams,
  onClose,
  onAssigned,
}: {
  test: InstructorRankedTest;
  students: Student[];
  teams: TeamSheet[];
  onClose: () => void;
  onAssigned: () => Promise<void>;
}) {
  const { request } = useAuth();
  return (
    <AssignEventModal
      division={test.division}
      eventId={test.eventId}
      eventName={test.eventName}
      eyebrow={`${test.eventName.toUpperCase()} · DIVISION ${test.division} · RANKED`}
      title={test.title}
      meta={`${count(test.questionCount, 'question')} · ${test.maxScore} points · ${test.minutes} minutes`}
      noun="test"
      footer="Students take it in a locked full-screen window."
      already={new Set(test.assignments.map((row) => row.studentId))}
      students={students}
      teams={teams}
      onClose={onClose}
      onAssign={async (body) => {
        const result = await request<AssignResult>('/api/ranked', {
          method: 'POST',
          body: JSON.stringify({ action: 'assign', testId: test.id, ...body }),
        });
        await onAssigned();
        return result;
      }}
    />
  );
}

function RankedResults({
  test,
  teams,
  onBack,
  onAssign,
  onChanged,
}: {
  test: InstructorRankedTest;
  teams: TeamSheet[];
  onBack: () => void;
  onAssign: () => void;
  onChanged: () => Promise<void>;
}) {
  const { request } = useAuth();
  const [detail, setDetail] = useState<InstructorRankedDetail | null>(null);
  const [open, setOpen] = useState('');
  const [scores, setScores] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const load = useCallback(
    () =>
      request<InstructorRankedDetail>(`/api/ranked?testId=${encodeURIComponent(test.id)}`).then(
        setDetail,
      ),
    [request, test.id],
  );
  // The parent's list refreshes after every action, so reload results whenever it changes.
  useEffect(() => {
    load().catch((error) => setError(authMessage(error)));
  }, [load, test]);
  async function act(key: string, body: Record<string, unknown>) {
    if (busy) return;
    setBusy(key);
    setError('');
    try {
      await request('/api/ranked', { method: 'POST', body: JSON.stringify(body) });
      await onChanged();
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy('');
    }
  }
  const submitted = test.assignments.filter((row) => row.submittedAt);
  const teamOf = (studentId: string) =>
    seatedTeams(test.division, test.eventId, teams)
      .filter((entry) => entry.ids.includes(studentId))
      .map((entry) => entry.team.name)
      .join(', ');
  const expired = (row: InstructorRankedRow) =>
    row.status === 'in-progress' && !!row.deadline && Date.parse(row.deadline) < Date.now();
  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ChevronLeft size={16} /> All ranked tests
      </button>
      <div className="dashboard-section-title">
        <h2>{test.title}</h2>
        <span className="tag">
          {test.eventName.toUpperCase()} · DIVISION {test.division}
        </span>
      </div>
      <p className="ranked-test-meta">
        {count(test.questionCount, 'question')} · {test.maxScore} points · {test.minutes} minutes ·
        combined from {count(test.sources.length, 'test')}
      </p>
      <div className="ranked-sources">
        {test.sources.map((source) => (
          <span className="assign-event-chip" key={source.testId}>
            {source.title} · {source.questions}
          </span>
        ))}
      </div>
      <div className="ranked-toolbar">
        <button className="assign-pill" onClick={onAssign}>
          Assign to students
        </button>
        <button
          className="button button-small button-glass"
          disabled={!!busy || !submitted.some((row) => row.status === 'submitted')}
          onClick={() => act('release-all', { action: 'release', testId: test.id, released: true })}
        >
          {busy === 'release-all' ? 'Releasing…' : 'Release all results'}
        </button>
        <button
          className="button button-small button-glass"
          disabled={!!busy || !submitted.some((row) => row.status === 'released')}
          onClick={() => act('hide-all', { action: 'release', testId: test.id, released: false })}
        >
          Hide all results
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {test.assignments.length ? (
        <div className="table-wrap" role="region" aria-label="Student results" tabIndex={0}>
          <table className="ranked-results">
            <thead>
              <tr>
                <th scope="col">STUDENT</th>
                <th scope="col">STATUS</th>
                <th scope="col">SCORE</th>
                <th scope="col">LEFT TEST</th>
                <th scope="col">RESULTS</th>
              </tr>
            </thead>
            <tbody>
              {test.assignments.map((row) => {
                const result = detail?.results[row.assignmentId];
                const pending = Object.fromEntries(
                  Object.entries(scores).filter(([key]) => key.startsWith(`${row.assignmentId}:`)),
                );
                return [
                  <tr key={row.assignmentId}>
                    <th scope="row">
                      {row.studentName}
                      <small>{teamOf(row.studentId) || 'No team seat'}</small>
                    </th>
                    <td>
                      {expired(row) ? 'Time expired' : statusText[row.status]}
                      {row.closedByExit && <small data-flag="true">Closed: left full screen</small>}
                      <small>Due {row.due}</small>
                    </td>
                    <td>
                      {row.score ? (
                        <>
                          {row.score.score} / {row.score.maxScore} · {row.score.percentage}%
                          {row.score.pendingPoints > 0 && (
                            <small>
                              {row.score.pendingPoints} points{' '}
                              {row.score.grading === 'pending' ? 'not graded yet' : 'need review'}
                            </small>
                          )}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td data-flag={row.violations > 0}>
                      {row.startedAt ? count(row.violations, 'time') : '—'}
                    </td>
                    <td>
                      <div className="ranked-row-actions">
                        {row.submittedAt && (
                          <>
                            <button
                              disabled={!!busy}
                              onClick={() =>
                                act(`release-${row.assignmentId}`, {
                                  action: 'release',
                                  testId: test.id,
                                  studentIds: [row.studentId],
                                  released: row.status !== 'released',
                                })
                              }
                            >
                              {row.status === 'released' ? 'Hide results' : 'Release results'}
                            </button>
                            <button
                              aria-expanded={open === row.assignmentId}
                              onClick={() =>
                                setOpen(open === row.assignmentId ? '' : row.assignmentId)
                              }
                            >
                              {open === row.assignmentId ? 'Close answers' : 'View answers'}
                            </button>
                          </>
                        )}
                        {row.score?.grading === 'pending' && (
                          <button
                            disabled={!!busy}
                            onClick={() =>
                              act(`grade-${row.assignmentId}`, {
                                action: 'regrade',
                                assignmentId: row.assignmentId,
                              })
                            }
                          >
                            {busy === `grade-${row.assignmentId}`
                              ? 'Grading…'
                              : 'Grade written answers'}
                          </button>
                        )}
                        {expired(row) && (
                          <button
                            disabled={!!busy}
                            onClick={() =>
                              act(`collect-${row.assignmentId}`, {
                                action: 'collect',
                                assignmentId: row.assignmentId,
                              })
                            }
                          >
                            {busy === `collect-${row.assignmentId}`
                              ? 'Collecting…'
                              : 'Collect saved answers'}
                          </button>
                        )}
                        {row.closedByExit && (
                          <button
                            disabled={!!busy}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Reopen this test for ${row.studentName}? Their score is withdrawn, their saved answers stay, and they continue with the time they had left.`,
                                )
                              )
                                void act(`reopen-${row.assignmentId}`, {
                                  action: 'reopen',
                                  assignmentId: row.assignmentId,
                                });
                            }}
                          >
                            {busy === `reopen-${row.assignmentId}` ? 'Reopening…' : 'Reopen test'}
                          </button>
                        )}
                        {row.status === 'assigned' && (
                          <button
                            disabled={!!busy}
                            onClick={() =>
                              act(`remove-${row.assignmentId}`, {
                                action: 'unassign',
                                assignmentId: row.assignmentId,
                              })
                            }
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>,
                  open === row.assignmentId && result && detail && (
                    <tr key={`${row.assignmentId}-review`}>
                      <td colSpan={5}>
                        <form
                          className="ranked-review-panel"
                          onSubmit={(e) => {
                            e.preventDefault();
                            void act(`review-${row.assignmentId}`, {
                              action: 'review',
                              assignmentId: row.assignmentId,
                              scores: Object.fromEntries(
                                Object.entries(pending).map(([key, value]) => [
                                  key.slice(row.assignmentId.length + 1),
                                  Number(value),
                                ]),
                              ),
                            }).then(() => setScores({}));
                          }}
                        >
                          <RankedReview
                            questions={detail.questions}
                            result={result}
                            origins={detail.origins}
                            scores={Object.fromEntries(
                              Object.entries(pending).map(([key, value]) => [
                                key.slice(row.assignmentId.length + 1),
                                value,
                              ]),
                            )}
                            onScore={
                              result.pendingPoints
                                ? (key, value) =>
                                    setScores((current) => ({
                                      ...current,
                                      [`${row.assignmentId}:${key}`]: value,
                                    }))
                                : undefined
                            }
                          />
                          {result.pendingPoints > 0 && (
                            <button
                              className="button button-primary"
                              type="submit"
                              disabled={!!busy}
                            >
                              {busy === `review-${row.assignmentId}`
                                ? 'Saving…'
                                : 'Save rubric scores'}
                            </button>
                          )}
                        </form>
                      </td>
                    </tr>
                  ),
                ];
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <Users size={26} />
          <h3>Not assigned yet.</h3>
          <p>
            Assign this test to everyone in the event, or to chosen students and their partners.
          </p>
        </div>
      )}
      <p className="source-note">
        Students see their score as soon as they submit. Their answers, the correct answers, and
        rubric feedback open only after you release results for that student. “Left test” counts
        each time a student left full screen or switched away.
      </p>
      {detail && (
        <details className="practice-alignment">
          <summary>Preview questions and answer key</summary>
          <p>
            Until a student starts, you can remove any question that does not suit this test. The
            point total updates to match.
          </p>
          <RankedReview
            questions={detail.questions}
            result={detail.answerKey}
            origins={detail.origins}
            preview
            onRemove={
              test.assignments.some((row) => row.startedAt) ||
              detail.questions.length <= RANKED_QUESTIONS.min ||
              busy
                ? undefined
                : (questionId) =>
                    act('remove-question', {
                      action: 'remove-question',
                      testId: test.id,
                      questionId,
                    })
            }
          />
        </details>
      )}
    </>
  );
}

export function InstructorRanked({
  students,
  onChanged,
}: {
  students: Student[];
  onChanged: () => Promise<void>;
}) {
  const { request } = useAuth();
  const [tests, setTests] = useState<InstructorRankedTest[] | null>(null);
  const [teams, setTeams] = useState<TeamSheet[]>([]);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState('');
  const [assignId, setAssignId] = useState('');
  const [busy, setBusy] = useState('');
  const load = useCallback(async () => {
    const [nextTests, nextTeams] = await Promise.all([
      request<InstructorRankedTest[]>('/api/ranked'),
      request<TeamSheet[]>('/api/teams'),
    ]);
    setTests(nextTests);
    setTeams(nextTeams);
  }, [request]);
  // The roster changes identity on every dashboard refresh, so Refresh also reloads results.
  useEffect(() => {
    load().catch((error) => setError(authMessage(error)));
  }, [load, students]);
  // Keeps the dashboard's assignment lists and student stats in step with ranked changes.
  const refresh = useCallback(async () => {
    await Promise.all([load(), onChanged()]);
  }, [load, onChanged]);
  async function remove(test: InstructorRankedTest) {
    if (busy || !window.confirm(`Delete ${test.title}? Students who have not started lose it.`))
      return;
    setBusy(test.id);
    setError('');
    try {
      await request('/api/ranked', {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', testId: test.id }),
      });
      await refresh();
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy('');
    }
  }
  if (!tests)
    return error ? (
      <div className="practice-empty">
        <p role="alert">{error}</p>
        <button
          className="button button-secondary"
          onClick={() => {
            setError('');
            load().catch((error) => setError(authMessage(error)));
          }}
        >
          Try again
        </button>
      </div>
    ) : (
      <p role="status">Loading ranked tests…</p>
    );
  const opened = tests.find((test) => test.id === openId);
  const assigning = tests.find((test) => test.id === assignId);
  const modal = assigning && (
    <AssignRankedModal
      test={assigning}
      students={students}
      teams={teams}
      onClose={() => setAssignId('')}
      onAssigned={refresh}
    />
  );
  if (opened)
    return (
      <>
        <RankedResults
          test={opened}
          teams={teams}
          onBack={() => setOpenId('')}
          onAssign={() => setAssignId(opened.id)}
          onChanged={refresh}
        />
        {modal}
      </>
    );
  return (
    <section aria-label="Ranked tests">
      <div className="dashboard-section-title">
        <h2>Ranked tests.</h2>
        <span className="tag">{count(tests.length, 'TEST').toUpperCase()}</span>
      </div>
      <CreateRankedTest
        students={students}
        onCreated={async (id) => {
          await refresh();
          setOpenId(id);
        }}
      />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {tests.length ? (
        <ul className="practice-test-list instructor-test-list">
          {tests.map((test) => {
            const started = test.assignments.filter((row) => row.startedAt).length;
            const done = test.assignments.filter((row) => row.submittedAt).length;
            const released = test.assignments.filter((row) => row.status === 'released').length;
            return (
              <li key={test.id}>
                <div className="instructor-test-card">
                  <span className="practice-test-icon">
                    <Trophy size={22} />
                  </span>
                  <div className="instructor-test-body">
                    <h2>{test.title}</h2>
                    <p>
                      {test.eventName} · Division {test.division} ·{' '}
                      {count(test.questionCount, 'question')} · {test.maxScore} points ·{' '}
                      {test.minutes} minutes · from {count(test.sources.length, 'test')}
                    </p>
                    <span>
                      {test.assignments.length} assigned <b>·</b> {done} submitted <b>·</b>{' '}
                      {released} released
                    </span>
                  </div>
                  <div className="ranked-test-actions">
                    <button
                      className="assign-pill"
                      onClick={() => setAssignId(test.id)}
                      aria-label={`Assign ${test.title}`}
                    >
                      Assign
                    </button>
                    <button
                      className="text-link"
                      onClick={() => setOpenId(test.id)}
                      aria-label={`Results and preview for ${test.title}`}
                    >
                      Results & preview
                    </button>
                    {!started && (
                      <button
                        className="text-link"
                        disabled={!!busy}
                        onClick={() => remove(test)}
                        aria-label={`Delete ${test.title}`}
                      >
                        {busy === test.id ? 'Deleting…' : 'Delete'}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="practice-empty">
          <Trophy size={30} />
          <h2>No ranked tests yet.</h2>
          <p>
            Build one above. Then assign it to everyone seated in that event across your teams in
            one step.
          </p>
        </div>
      )}
      {modal}
    </section>
  );
}
