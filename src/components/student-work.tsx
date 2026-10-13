'use client';
import { useEffect, useState } from 'react';
import type { WorkRecord } from '@/lib/domain';
import { useAuth, authMessage } from './auth-context';

const average = (records: WorkRecord[]) => {
  const scored = records.filter((record) => record.percentage !== null);
  return scored.length
    ? `${Math.round(scored.reduce((sum, record) => sum + record.percentage!, 0) / scored.length)}%`
    : '—';
};
const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/**
 * Submitted lessons, lab simulations and practice tests of one student: lessons by completion,
 * labs and tests by accuracy. Without `studentId` it shows the signed-in student's own work.
 */
export function StudentWork({
  studentId,
  refreshed,
}: {
  studentId?: string;
  /** Changes whenever the dashboard refreshes, so the records reload with it. */
  refreshed?: unknown;
}) {
  const { request } = useAuth();
  const [records, setRecords] = useState<WorkRecord[] | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    request<WorkRecord[]>(
      `/api/progress${studentId ? `?studentId=${encodeURIComponent(studentId)}` : ''}`,
    )
      .then((next) => {
        if (active) setRecords(next);
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      });
    return () => {
      active = false;
    };
  }, [request, studentId, refreshed, retry]);
  const of = (type: WorkRecord['type']) => (records ?? []).filter((record) => record.type === type);
  const lessons = of('Lesson');
  const labs = of('Lab');
  const tests = of('Practice');
  return (
    <section aria-label="Submitted work">
      <div className="dashboard-section-title">
        <h2>Submitted work.</h2>
        <span className="tag">LESSONS · LABS · PRACTICE TESTS</span>
      </div>
      {error ? (
        <div className="empty-state">
          <p role="alert">{error}</p>
          <button className="button button-secondary" onClick={() => setRetry((n) => n + 1)}>
            Try again
          </button>
        </div>
      ) : !records ? (
        <p role="status">Loading submitted work…</p>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <span>Lessons completed</span>
              <strong>{lessons.length}</strong>
              <small>Practice score {average(lessons)}</small>
            </div>
            <div className="stat-card">
              <span>Lab accuracy</span>
              <strong>{average(labs)}</strong>
              <small>{count(labs.length, 'lab')} submitted</small>
            </div>
            <div className="stat-card">
              <span>Practice test accuracy</span>
              <strong>{average(tests)}</strong>
              <small>{count(tests.length, 'attempt')} submitted</small>
            </div>
          </div>
          {records.length ? (
            <div className="table-wrap" role="region" aria-label="Submitted work" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">WORK</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">EVENT</th>
                    <th scope="col">RESULT</th>
                    <th scope="col">SUBMITTED</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr
                      key={`${record.type}/${record.eventId}/${record.targetId}/${record.completedAt}`}
                    >
                      <th scope="row">{record.title}</th>
                      <td>
                        {record.type === 'Practice'
                          ? 'Practice test'
                          : record.type === 'Lab'
                            ? 'Lab simulation'
                            : 'Lesson'}
                      </td>
                      <td>{record.eventName}</td>
                      <td>
                        {record.type === 'Lab'
                          ? `${record.percentage}% accuracy`
                          : record.type === 'Lesson'
                            ? `Completed${record.percentage === null ? '' : ` · ${record.score} / ${record.maxScore} (${record.percentage}%)`}`
                            : `${record.score} / ${record.maxScore} · ${record.percentage ?? 0}% accuracy`}
                      </td>
                      <td>
                        <time dateTime={record.completedAt}>
                          {new Date(record.completedAt).toLocaleDateString()}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>Nothing submitted yet.</h3>
              <p>
                Lessons appear here when they are submitted, and labs and practice tests with their
                accuracy.
              </p>
            </div>
          )}
          <p className="source-note">
            Lessons count as completed when submitted; their score covers the multiple-choice
            questions. Lab accuracy is how close the latest submitted answer is to the lab’s model.
            Practice tests list every attempt.
          </p>
        </>
      )}
    </section>
  );
}
