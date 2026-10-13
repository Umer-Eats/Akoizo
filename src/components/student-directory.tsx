'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Users } from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { RankBadge } from './rank-badge';
import { rankLabel } from '@/lib/competitive-rating';
import type { StudentDirectory as Directory } from '@/lib/student-profiles';
import './student-profile.css';

export function StudentDirectory() {
  const { request } = useAuth();
  const [data, setData] = useState<Directory | null>(null);
  const [search, setSearch] = useState('');
  const [school, setSchool] = useState('');
  const [division, setDivision] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: search, school, division, page: String(page) });
      request<Directory>(`/api/students?${params}`)
        .then((next) => {
          if (active) setData(next);
        })
        .catch((e) => {
          if (active) setError(authMessage(e));
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [request, search, school, division, page, revision]);
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
  return (
    <section className="student-directory" aria-label="Students across communities">
      <div className="dashboard-section-title">
        <div>
          <p className="eyebrow">CURIOSITY HAS NO BORDERS</p>
          <h2>Meet the Akoizo community.</h2>
          <p>Explore student cards and follow their ranked journey.</p>
        </div>
      </div>
      <div className="student-filters">
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Search students or communities</span>
          <input
            value={search}
            placeholder="Search students or communities"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <label>
          Community
          <select
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All communities</option>
            {data?.schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Division
          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All divisions</option>
            {['A', 'B', 'C'].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <button
          className="button button-small button-glass"
          onClick={() => setRevision((n) => n + 1)}
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <p role="status" className="loading-state">
          Loading student cards…
        </p>
      ) : error ? (
        <div className="empty-state">
          <p role="alert">{error}</p>
          <button className="button button-glass" onClick={() => setRevision((n) => n + 1)}>
            Try again
          </button>
        </div>
      ) : !data?.students.length ? (
        <div className="empty-state">
          <Users size={30} />
          <h3>No students found.</h3>
          <p>Try another name, community, or division.</p>
        </div>
      ) : (
        <>
          <p className="source-note">
            {data.total} students · Ordered by ranked rating · Updates every 30 seconds
          </p>
          <div className="student-card-grid">
            {data.students.map((s) => (
              <Link
                href={`/students/${encodeURIComponent(s.id)}`}
                className="ranked-student-card"
                key={s.id}
              >
                <div className="student-card-top">
                  <span className="student-avatar">{s.name.slice(0, 2).toUpperCase()}</span>
                  <span className="tag">DIVISION {s.division}</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.community}</p>
                <div className="student-card-rank">
                  <RankBadge rank={s.rank} size={64} />
                  <div>
                    <strong>{rankLabel(s.rank)}</strong>
                    <span>
                      {s.rank.name === 'Unranked'
                        ? `${s.rank.placements}/5 placement tests`
                        : `${s.rank.rr} RR`}
                    </span>
                  </div>
                </div>
                <dl className="student-card-stats">
                  <div>
                    <dt>Ranked points</dt>
                    <dd>{s.points.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt>Accuracy</dt>
                    <dd>{s.accuracy === null ? '—' : `${s.accuracy}%`}</dd>
                  </div>
                  <div>
                    <dt>Tests</dt>
                    <dd>{s.tests}</dd>
                  </div>
                </dl>
                <span className="student-card-link">
                  View ranked profile <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="student-pagination">
            <button
              className="button button-small button-glass"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {Math.ceil(data.total / 24)}
            </span>
            <button
              className="button button-small button-glass"
              disabled={(page + 1) * 24 >= data.total}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
