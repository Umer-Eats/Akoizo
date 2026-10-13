'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Trophy } from 'lucide-react';
import type { Division } from '@/lib/events';
import { Orbit } from './art';
type Ranking = {
  id: string;
  name: string;
  schoolId: string;
  school: string;
  division: Division;
  points: number;
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
        <div className="table-wrap" role="region" aria-label="Global rankings" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">RANK</th>
                <th scope="col">MEMBER</th>
                <th scope="col">SCHOOL</th>
                <th scope="col">DIVISION</th>
                <th scope="col">POINTS</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.id}>
                  <td>{row.rank}</td>
                  <td>
                    <Link href={`/students/${encodeURIComponent(row.id)}`}>{row.name}</Link>
                  </td>
                  <td>{row.school}</td>
                  <td>{row.division}</td>
                  <td>{row.points.toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
