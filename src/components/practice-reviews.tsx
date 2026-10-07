'use client';
import { useEffect, useState } from 'react';
import { useAuth, authMessage } from './auth-context';
import type { PracticeReview } from '@/lib/practice-types';
import './practice.css';

export function PracticeReviews() {
  const { request, profile } = useAuth();
  const [reviews, setReviews] = useState<PracticeReview[]>([]);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    request<PracticeReview[]>('/api/practice/review')
      .then((rows) => {
        if (active) {
          setReviews(rows);
          setError('');
        }
      })
      .catch((e) => {
        if (active) setError(authMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [request, profile?.id, revision]);
  return (
    <section className="practice-review-list" aria-label="Written answer reviews">
      <div className="dashboard-section-title">
        <h2>Written answers to review.</h2>
        <button className="button button-secondary" onClick={() => setRevision((n) => n + 1)}>
          Refresh
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {loading && (
        <p className="practice-note" role="status">
          Loading written answers…
        </p>
      )}
      {!loading && !error && !reviews.length && (
        <p className="practice-note">No written answers awaiting review.</p>
      )}
      {reviews.map((review) => (
        <Review key={review.result.id} review={review} onSaved={() => setRevision((n) => n + 1)} />
      ))}
    </section>
  );
}
function Review({ review, onSaved }: { review: PracticeReview; onSaved: () => void }) {
  const { request } = useAuth();
  const [scores, setScores] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError('');
    try {
      await request('/api/practice/review', {
        method: 'POST',
        body: JSON.stringify({
          id: review.result.id,
          scores: Object.fromEntries(Object.entries(scores).map(([id, n]) => [id, Number(n)])),
        }),
      });
      onSaved();
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setPending(false);
    }
  }
  return (
    <details className="practice-alignment">
      <summary>
        {review.studentName} · {review.title} · {review.result.pendingPoints} points pending
      </summary>
      {review.result.keyUrl ? (
        <a href={review.result.keyUrl} target="_blank" rel="noreferrer">
          Open the complete published rubric
        </a>
      ) : (
        <p>
          No published key. Any AI-generated reference answers must be checked against the
          questions.
        </p>
      )}
      <form onSubmit={submit}>
        {review.result.questions
          .filter((q) => q.criteria.some((c) => c.needsReview))
          .map((q) => (
            <div className="practice-review-question" key={q.id}>
              <h3>{review.questions.find((item) => item.id === q.id)?.label ?? q.id}</h3>
              <p className="practice-original-answer">{q.answer}</p>
              {q.criteria
                .filter((c) => c.needsReview)
                .map((c) => (
                  <label key={c.id}>
                    <span className="practice-rubric">Rubric: {c.answer}</span>
                    <span>Points earned (maximum {c.points})</span>
                    <input
                      type="number"
                      required
                      min={0}
                      max={c.points}
                      step="any"
                      disabled={pending}
                      value={scores[`${q.id}/${c.id}`] ?? ''}
                      onChange={(e) =>
                        setScores((s) => ({ ...s, [`${q.id}/${c.id}`]: e.target.value }))
                      }
                    />
                  </label>
                ))}
            </div>
          ))}
        {error && <p role="alert">{error}</p>}
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save rubric scores'}
        </button>
      </form>
    </details>
  );
}
