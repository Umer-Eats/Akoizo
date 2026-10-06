'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LockKeyhole, Search, SearchX } from 'lucide-react';
import { members, filterRankings } from '@/lib/demo';
import type { Division } from '@/lib/events';
import { Mascot, Orbit, PixelStar } from './art';
export function RankingTable({
  school,
  initialDivision = 'All',
}: {
  school?: string;
  initialDivision?: 'All' | Division;
}) {
  const [division, setDivision] = useState<'All' | Division>(initialDivision);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const results = filterRankings(members, { division, query, school });
  const pages = Math.max(1, Math.ceil(results.length / 6));
  const current = Math.min(page, pages);
  return (
    <div>
      <div className="tabs" aria-label="Filter rankings by division">
        {(['All', 'A', 'B', 'C'] as const).map((d) => (
          <button
            key={d}
            aria-pressed={division === d}
            onClick={() => {
              setDivision(d);
              setPage(1);
            }}
          >
            {d === 'All' ? 'All divisions' : `Division ${d}`}
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
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <p aria-live="polite">
          {results.length} MEMBERS · {school ? school.toUpperCase() : 'ALL SCHOOLS'} · ALL TIME
        </p>
      </div>
      {results.length ? (
        <div
          className="table-wrap"
          role="region"
          aria-label="Rankings table, scroll horizontally for more columns"
          tabIndex={0}
        >
          <table aria-label={school ? 'Sample school rankings' : 'Sample global rankings'}>
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
              {results.slice((current - 1) * 6, current * 6).map((m) => (
                <tr key={m.id}>
                  <td className="rank-cell">{String(m.rank).padStart(2, '0')}</td>
                  <td>
                    <span className="member-cell">
                      <span className="member-pixel">
                        <PixelStar />
                      </span>
                      {m.handle}
                    </span>
                  </td>
                  <td className="school-cell">{m.school}</td>
                  <td className="school-cell">{m.division}</td>
                  <td className="score-cell">{m.points.toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <SearchX />
          <h3>No members found.</h3>
          <p>Try another name or school, or choose a different division.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setDivision('All');
              setPage(1);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <nav className="pagination" aria-label="Rankings pagination">
        <button disabled={current === 1} onClick={() => setPage(current - 1)}>
          Previous
        </button>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            aria-current={current === i + 1 ? 'page' : undefined}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={current === pages} onClick={() => setPage(current + 1)}>
          Next
        </button>
      </nav>
    </div>
  );
}
export function Rankings() {
  return (
    <main id="main" className="page-container">
      <div className="page-heading with-art">
        <p className="eyebrow">CURIOSITY BRINGS US TOGETHER</p>
        <h1 className="chrome">Global Rankings</h1>
        <p>Every school. One community of curious minds.</p>
        <span className="tag">PREVIEW · FICTIONAL SAMPLE DATA</span>
        <Orbit />
        <Mascot small />
      </div>
      <RankingTable />
      <aside className="private-callout">
        <LockKeyhole size={30} strokeWidth={1.2} />
        <div>
          <h3>Your school, your team.</h3>
          <p>
            Sign in to view your school-only rankings.
            <br />
            Available only to members of your school.
          </p>
        </div>
        <Link className="button button-glass" href="/login/student">
          Student login
        </Link>
      </aside>
      <p className="source-note">
        Preview scores illustrate the layout. Live ranked tests and points are coming later.
      </p>
    </main>
  );
}
