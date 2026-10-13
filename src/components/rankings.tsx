'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Trophy } from 'lucide-react';
import type { Division } from '@/lib/events';
import { Orbit } from './art';
import { RankBadge } from './rank-badge';
import { rankLabel, PLACEMENT_TESTS, type CompetitiveRating } from '@/lib/competitive-rating';
import './student-profile.css';
type Ranking = {
  id: string;
  name: string;
  schoolId: string;
  school: string;
  division: Division;
  points: number;
  competitiveRank: Pick<CompetitiveRating, 'name' | 'tier' | 'rr' | 'placements'>;
};
type School = { id: string; name: string };
export function Rankings() {
  const [rows, setRows] = useState<Ranking[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [division, setDivision] = useState('All');
  const [school, setSchool] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch('/api/rankings', { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error);
        setRows(body.rankings);
        setSchools(body.schools);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message || 'Could not load rankings.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);
  const ranked = rows
    .filter(
      (row) =>
        (division === 'All' || row.division === division) &&
        (school === 'All' || row.schoolId === school),
    )
    .map((row, index) => ({ ...row, rank: index + 1 }));
  const results = ranked.filter((row) =>
    `${row.name} ${row.school}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main id="main" className="page-container">
      <div className="page-heading with-art">
        <p className="eyebrow">CURIOSITY BRINGS US TOGETHER</p>
        <h1 className="chrome">Global Rankings</h1>
        <p>Every school. One community of curious minds.</p>
        <Orbit />
      </div>
      <div className="tabs" aria-label="Filter rankings by division">
        {['All', 'A', 'B', 'C'].map((value) => (
          <button key={value} aria-pressed={division === value} onClick={() => setDivision(value)}>
            {value === 'All' ? 'All divisions' : `Division ${value}`}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <label className="search-field">
          <span className="sr-only">Search members or schools</span>
          <Search size={16} />
          <input
            placeholder="Search members or schools"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="event-type-filter school-filter">
          School
          <select
            aria-label="Filter rankings by school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          >
            <option value="All">All schools</option>
            {schools.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <p>TOP 500 · ALL TIME</p>
      </div>
      {loading ? (
        <p className="loading-state" role="status">
          Loading rankings…
        </p>
      ) : error ? (
        <div className="empty-state">
          <p role="alert">{error}</p>
          <button className="button button-primary" onClick={() => setRetry(retry + 1)}>
            Try again
          </button>
        </div>
      ) : results.length ? (
        <div className="global-ranking-grid" role="region" aria-label="Global rankings">
          {results.map((row) => (
            <Link
              key={row.id}
              className="ranked-student-card global-ranking-card"
              href={`/students/${encodeURIComponent(row.id)}`}
              aria-label={`View ${row.name} ranked profile`}
            >
              <div className="global-ranking-identity">
                <div className="student-card-top">
                  <span className="student-avatar">{row.name.slice(0, 2).toUpperCase()}</span>
                  <span className="tag">#{row.rank} · ALL-TIME POINTS</span>
                </div>
                <h2>{row.name}</h2>
                <p>{row.school}</p>
              </div>
              <div className="global-ranking-badge">
                <RankBadge rank={row.competitiveRank} size={80} />
                <div>
                  <strong>{rankLabel(row.competitiveRank)}</strong>
                  <span>
                    {row.competitiveRank.name === 'Unranked'
                      ? `${row.competitiveRank.placements}/${PLACEMENT_TESTS} placement tests`
                      : `${row.competitiveRank.rr} RR`}
                  </span>
                </div>
              </div>
              <dl className="student-card-stats global-ranking-card-stats">
                <div>
                  <dt>Ranked points</dt>
                  <dd>{row.points.toLocaleString('en-US')}</dd>
                </div>
                <div>
                  <dt>Division</dt>
                  <dd>{row.division}</dd>
                </div>
              </dl>
              <span className="student-card-link">
                View ranked profile <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Trophy size={30} />
          <h2>{rows.length ? 'No matching rankings.' : 'The first chapter is still to come.'}</h2>
          <p>
            {rows.length
              ? 'Try a different division, school, or search.'
              : 'Rankings will appear when students start earning points in ranked tests.'}
          </p>
          <Link className="button button-glass" href="/login/student">
            Open your study space
          </Link>
        </div>
      )}
      <p className="source-note">
        Only earned points appear here. Public rankings show each student’s first name, last
        initial, and school. Each ranked test is worth up to 100 points, matching the percentage
        score.
      </p>
    </main>
  );
}
