'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { AccountGate } from './account-gate';
import { useAuth, authMessage } from './auth-context';
import { RankBadge } from './rank-badge';
import { RANK_NAMES, rankLabel } from '@/lib/competitive-rating';
import type { StudentRankedProfile as Profile } from '@/lib/student-profiles';
import './student-profile.css';

const percent = (n: number | null) => (n === null ? '—' : `${n}%`);
const date = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
function ProfileView({ studentId }: { studentId: string }) {
  const { request } = useAuth();
  const [data, setData] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const [metric, setMetric] = useState<'points' | 'rating'>('points');
  const [historyPage, setHistoryPage] = useState(0);
  useEffect(() => {
    setHistoryPage(0);
    setData(null);
  }, [studentId]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    request<Profile>(`/api/students/${encodeURIComponent(studentId)}`)
      .then((next) => {
        if (active) setData(next);
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
  }, [studentId, request, revision]);
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') setRevision((n) => n + 1);
    };
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener('focus', refresh);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', refresh);
    };
  }, []);
  if (error)
    return (
      <main id="main" className="page-container">
        <Link href="/community">Back to community</Link>
        <div className="empty-state">
          <p role="alert">{error}</p>
          <button className="button button-primary" onClick={() => setRevision((n) => n + 1)}>
            Try again
          </button>
        </div>
      </main>
    );
  if (!data)
    return (
      <main id="main" className="page-container">
        <p role="status">Loading ranked profile…</p>
      </main>
    );
  const ranked = data.rank.name !== 'Unranked';
  const high = ['Immortal', 'Radiant'].includes(data.rank.name);
  const series = data.history.filter((h) => metric === 'points' || !h.placement).slice(-20);
  const ceiling = metric === 'points' ? 100 : Math.max(100, ...series.map((h) => h.rating));
  const coords = series.map(
    (h, i) =>
      `${40 + (series.length === 1 ? 340 : (i / (series.length - 1)) * 680)},${170 - ((metric === 'points' ? h.points : h.rating) / ceiling) * 140}`,
  );
  return (
    <main id="main" className="page-container ranked-profile-page">
      <div className="ranked-profile-navigation">
        <Link href="/community">
          <ArrowLeft size={16} /> Community
        </Link>
        <button
          className="button button-small button-glass"
          disabled={loading}
          onClick={() => setRevision((n) => n + 1)}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>
      <header className="ranked-profile-hero">
        <div>
          <p className="eyebrow">AKOIZO / RANKED PROFILE</p>
          <h1>{data.name}</h1>
          <p>
            {data.community} <span>· Division {data.division}</span>
          </p>
          <span className="tag">{data.tests} RELEASED RANKED TESTS</span>
        </div>
        <div className="ranked-profile-emblem">
          <RankBadge rank={data.rank} size={150} />
          <div>
            <h2>{rankLabel(data.rank)}</h2>
            <p>
              {ranked
                ? `${data.rank.rr} RR${data.rank.leaderboardPosition ? ` · #${data.rank.leaderboardPosition} on the elite ladder` : ''}`
                : `${data.rank.placements} of 5 placement tests complete`}
            </p>
          </div>
        </div>
      </header>
      <section className="ranked-progress-panel" aria-label="Rank progress">
        <div>
          <strong>{ranked ? (high ? 'Elite ladder' : 'Next tier') : 'Your first rank'}</strong>
          <span>
            {ranked
              ? high
                ? 'Radiant: 450+ RR and an active top-500 position'
                : `${100 - data.rank.rr} RR to promotion`
              : `${5 - data.rank.placements} more released tests to reveal a rank`}
          </span>
        </div>
        <progress
          aria-label={ranked ? 'Rank rating progress' : 'Placement progress'}
          max={ranked ? (high ? 450 : 100) : 5}
          value={ranked ? Math.min(high ? 450 : 100, data.rank.rr) : data.rank.placements}
        />
        <p>
          {ranked
            ? `Best tier by RR: ${data.peak} · ${data.rank.shields} rank shields`
            : 'Every ranked journey starts with five tests.'}
        </p>
      </section>
      <dl className="ranked-profile-metrics">
        {[
          ['Ranked points', data.points.toLocaleString(), 'Released tests only'],
          ['Average accuracy', percent(data.accuracy), 'Equal weight per test'],
          ['Pass rate', percent(data.passRate), '60+ points out of 100'],
          ['Best score', percent(data.best), 'Personal best'],
        ].map(([label, value, hint]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
            <span>{hint}</span>
          </div>
        ))}
      </dl>
      <div className="ranked-analytics-grid">
        <section className="ranked-analytics-panel">
          <p className="eyebrow">THE JOURNEY</p>
          <h2>Performance over time</h2>
          <p>
            {data.recentChange === null
              ? 'Complete more tests to compare recent performance.'
              : `${data.recentChange > 0 ? '+' : ''}${data.recentChange} points: latest five tests vs. the preceding five.`}
          </p>
          <div className="tabs" aria-label="Chart metric">
            {(['points', 'rating'] as const).map((m) => (
              <button key={m} aria-pressed={m === metric} onClick={() => setMetric(m)}>
                {m === 'points' ? 'Test points' : 'Ranked rating'}
              </button>
            ))}
          </div>
          {series.length ? (
            <>
              <svg
                className="ranked-trend-chart"
                viewBox="0 0 760 205"
                role="img"
                aria-label={`${metric === 'points' ? 'Test points' : 'Ranked rating'} over the latest ${series.length} tests. Exact values appear in test history.`}
              >
                {[0, 0.5, 1].map((fraction) => (
                  <g key={fraction}>
                    <line
                      x1="40"
                      y1={170 - fraction * 140}
                      x2="720"
                      y2={170 - fraction * 140}
                      stroke="var(--line)"
                    />
                    <text
                      x="32"
                      y={175 - fraction * 140}
                      textAnchor="end"
                      fill="var(--muted)"
                      fontSize="12"
                    >
                      {Math.round(ceiling * fraction)}
                    </text>
                  </g>
                ))}
                {series.length > 1 && (
                  <polyline
                    points={coords.join(' ')}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                  />
                )}
                {series.map((h, i) => (
                  <circle
                    key={h.id}
                    cx={coords[i].split(',')[0]}
                    cy={coords[i].split(',')[1]}
                    r="4"
                    fill="var(--accent)"
                  >
                    <title>
                      {date(h.date)}:{' '}
                      {metric === 'points' ? `${h.points} points` : `${h.rating} rating`}
                    </title>
                  </circle>
                ))}
                <text x="40" y="200" fill="var(--muted)" fontSize="12">
                  {date(series[0].date)}
                </text>
                <text x="720" y="200" textAnchor="end" fill="var(--muted)" fontSize="12">
                  {date(series.at(-1)!.date)}
                </text>
              </svg>
              <p className="source-note">
                {metric === 'rating'
                  ? 'Cumulative rating across tiers. Placement tests establish the starting rank.'
                  : 'Every test is normalized to 100 points.'}
              </p>
            </>
          ) : (
            <p className="empty-state">
              {metric === 'rating'
                ? 'Your rating trend begins after placements.'
                : 'Released ranked results will appear here.'}
            </p>
          )}
        </section>
        <section className="ranked-analytics-panel">
          <p className="eyebrow">FIND YOUR STRENGTHS</p>
          <h2>Event performance</h2>
          {data.events.length ? (
            data.events.map((e) => (
              <div className="ranked-event" key={e.name}>
                <div>
                  <strong>{e.name}</strong>
                  <span>{e.accuracy}%</span>
                </div>
                <progress max="100" value={e.accuracy} aria-label={`${e.name} accuracy`} />
                <small>
                  {e.tests} tests · {e.points} ranked points
                </small>
              </div>
            ))
          ) : (
            <p className="empty-state">Complete a ranked test to discover your strongest events.</p>
          )}
        </section>
      </div>
      <section className="ranked-analytics-panel">
        <p className="eyebrow">EVERY STEP COUNTS</p>
        <h2>Ranked test history</h2>
        {data.history.length ? (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {['Date', 'Event', 'Points / 100', 'RR change', 'Rating'].map((h) => (
                      <th scope="col" key={h}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...data.history]
                    .reverse()
                    .slice(historyPage * 10, (historyPage + 1) * 10)
                    .map((h) => (
                      <tr key={h.id}>
                        <td>{date(h.date)}</td>
                        <td>{h.event}</td>
                        <td>{h.points}</td>
                        <td>{h.placement ? 'Placement' : `${h.delta > 0 ? '+' : ''}${h.delta}`}</td>
                        <td>{h.placement ? '—' : h.rating}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {data.history.length > 10 && (
              <div className="student-pagination" aria-label="Test history pages">
                <button
                  className="button button-small button-glass"
                  disabled={historyPage === 0}
                  onClick={() => setHistoryPage((n) => n - 1)}
                >
                  Newer tests
                </button>
                <span>
                  {historyPage + 1} / {Math.ceil(data.history.length / 10)}
                </span>
                <button
                  className="button button-small button-glass"
                  disabled={(historyPage + 1) * 10 >= data.history.length}
                  onClick={() => setHistoryPage((n) => n + 1)}
                >
                  Older tests
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="empty-state">No released ranked tests yet.</p>
        )}
      </section>
      <details className="ranked-analytics-panel ranked-rules">
        <summary>How Akoizo ranks work</summary>
        <p>
          Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, and Immortal have three tiers.
          Radiant is the pinnacle. Five released, fully graded tests establish a starting rank,
          capped at Ascendant 3, with 50 RR.
        </p>
        <p>
          Each test awards up to 100 ranked points. Scores of 60 or higher earn RR; lower scores
          lose RR. Gains and losses vary with the score margin and an evolving skill estimate based
          on ranked points and paper difficulty. Strong, consistent results help your visible rank
          catch up to your skill. Practice tests do not affect rank.
        </p>
        <p>
          Iron through Ascendant need 100 RR per tier, with at least 10 RR after promotion. Reaching
          zero RR gives protection until the next unsuccessful test; demotion leaves at least 70 RR.
          Entering tier 1 grants two shields against dropping to a lower rank.
        </p>
        <p>
          Immortal uses an uncapped RR total: 90 RR for tier 2 and 200 RR for tier 3. Radiant
          requires at least 450 RR and a top-500 position among elite students with a released test
          in the last seven days. Inactivity removes leaderboard eligibility without erasing RR.
          Corrected or reopened tests recalculate the journey automatically.
        </p>
        <p>
          This is Akoizo’s transparent adaptation of Valorant’s competitive structure. Riot’s exact
          MMR formula is private. Akoizo uses one global ladder, North American elite thresholds,
          and a continuous test history.
        </p>
        <div className="ranked-badge-gallery">
          {RANK_NAMES.map((name) => (
            <div key={name}>
              <RankBadge rank={{ name, tier: name === 'Radiant' ? null : 3 }} size={70} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </details>
      <p className="source-note">
        Visible to enrolled community members. Profiles show first name and last initial, and
        released ranked statistics. Updated every 30 seconds.
      </p>
    </main>
  );
}
export function StudentRankedProfile({ studentId }: { studentId: string }) {
  const { profile } = useAuth();
  return (
    <AccountGate role={profile?.role ?? 'student'}>
      <ProfileView studentId={studentId} />
    </AccountGate>
  );
}
