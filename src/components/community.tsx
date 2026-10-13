'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentDirectory } from './student-directory';
import { RefreshCw, LockKeyhole } from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { AccountGate } from './account-gate';
import { InstructorAnalytics } from './instructor-analytics';
import type { CommunityData } from '@/lib/community';
import { eventsForDivision } from '@/lib/events';
import { eventSlots, slotForEvent } from '@/lib/event-slots';
import { partnerLimit, TEAM_SIZE } from '@/lib/teams';
import './teams.css';
import './community.css';

function CommunityView() {
  const { request, profile } = useAuth();
  const [data, setData] = useState<CommunityData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const [tab, setTab] = useState('analytics');
  const [teamId, setTeamId] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let active = true;
    let pending = false;
    const refresh = async () => {
      if (pending) return;
      pending = true;
      setLoading(true);
      try {
        const next = await request<CommunityData>('/api/community');
        if (active) {
          setData(next);
          setError('');
        }
      } catch (error) {
        if (active) setError(authMessage(error));
      } finally {
        pending = false;
        if (active) setLoading(false);
      }
    };
    void refresh();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    const interval = window.setInterval(onVisible, 30_000);
    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener('focus', onVisible);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [request, revision]);

  const team = data?.analytics.teams.find((t) => t.id === teamId) ?? data?.analytics.teams[0];
  const students = new Map(data?.analytics.students.map((s) => [s.id, s]));
  const roster = team
    ? [...new Set(Object.values(team.slots).flat())]
        .flatMap((id) => (id && students.has(id) ? [students.get(id)!] : []))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <main id="main" className="page-container community-page">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">YOUR COMMUNITY</p>
          <h1>{data?.name ?? 'Community'}</h1>
          <p>See how your community is growing, together.</p>
          {profile?.role === 'student' && (
            <Link className="text-link" href={`/students/${encodeURIComponent(profile.id)}`}>
              My ranked profile
            </Link>
          )}
        </div>
        <button
          className="button button-small button-glass"
          disabled={loading}
          onClick={() => setRevision((n) => n + 1)}
        >
          <RefreshCw size={15} /> {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      <div className="community-status">
        <span>
          <LockKeyhole size={14} /> Read-only · Teams and data are managed by instructors.
        </span>
        <span role="status">
          {error
            ? 'Unable to refresh · Retry with Refresh'
            : data
              ? `Updates every 30 seconds · Updated ${new Date(data.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
              : 'Loading community…'}
        </span>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {data && (
        <>
          <div className="tabs community-tabs" role="tablist" aria-label="Community views">
            {['analytics', 'teams', 'members', 'students'].map((id) => (
              <button
                key={id}
                id={`community-${id}-tab`}
                role="tab"
                aria-selected={tab === id}
                aria-controls="community-panel"
                onClick={() => setTab(id)}
              >
                {id === 'analytics'
                  ? 'Analytics'
                  : id === 'teams'
                    ? `Teams (${data.analytics.teams.length})`
                    : id === 'members'
                      ? `Members (${data.members.length})`
                      : 'Across communities'}
              </button>
            ))}
          </div>
          <div id="community-panel" role="tabpanel" aria-labelledby={`community-${tab}-tab`}>
            {tab === 'students' && <StudentDirectory />}
            {tab === 'analytics' && <InstructorAnalytics data={data.analytics} />}
            {tab === 'teams' && (
              <section aria-label="Community teams">
                <div className="dashboard-section-title">
                  <h2>Your community’s teams.</h2>
                </div>
                <div className="tabs community-tabs" role="group" aria-label="Choose a team">
                  {data.analytics.teams.map((t) => (
                    <button
                      key={t.id}
                      aria-pressed={t.id === team?.id}
                      onClick={() => setTeamId(t.id)}
                    >
                      {t.name} · {t.division}
                    </button>
                  ))}
                </div>
                {!team && (
                  <p className="empty-state">Your instructors haven’t created any teams yet.</p>
                )}
                {team && (
                  <div className="team-sheet">
                    <div className="team-sheet-title">
                      <h3>{team.name}</h3>
                      <span className="tag">DIVISION {team.division}</span>
                      <span className="tag">
                        {roster.length} / {TEAM_SIZE} STUDENTS
                      </span>
                    </div>
                    <div
                      className="team-grid-wrap"
                      role="region"
                      aria-label={`${team.name} roster`}
                      tabIndex={0}
                    >
                      <table className="team-grid team-roster">
                        <thead>
                          <tr>
                            <th scope="col">Student</th>
                            <th scope="col">Events</th>
                            <th scope="col">Timeslots</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roster.map((s) => {
                            const mine = Object.entries(team.slots)
                              .filter(([, seats]) => seats.includes(s.id))
                              .map(([id]) => id);
                            return (
                              <tr key={s.id}>
                                <th scope="row">
                                  <span className="team-card">
                                    <span className="student-avatar">
                                      {s.name.slice(0, 2).toUpperCase()}
                                    </span>
                                    <Link href={`/students/${encodeURIComponent(s.id)}`}>
                                      {s.name}
                                    </Link>
                                  </span>
                                </th>
                                <td className="team-count">{mine.length}</td>
                                <td>
                                  <span className="team-dots">
                                    {mine.map((id) => (
                                      <span
                                        key={id}
                                        className="team-dot"
                                        data-slot={slotForEvent(id)?.color ?? 'unassigned'}
                                        title={
                                          eventsForDivision(team.division).find((e) => e.id === id)
                                            ?.name
                                        }
                                      />
                                    ))}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                          {!roster.length && (
                            <tr>
                              <td colSpan={3} className="team-grid-empty">
                                No students seated yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="slot-legend" aria-label="Timeslot colors">
                      {eventSlots.map((slot) => (
                        <span className="slot-chip" data-slot={slot.color} key={slot.color}>
                          {slot.label} timeslot
                        </span>
                      ))}
                      <span className="slot-chip" data-slot="unassigned">
                        No timeslot
                      </span>
                    </div>
                    <div
                      className="team-grid-wrap"
                      role="region"
                      aria-label={`${team.name} events`}
                      tabIndex={0}
                    >
                      <table className="team-grid team-events">
                        <thead>
                          <tr>
                            <th scope="col">Event</th>
                            {[1, 2, 3].map((n) => (
                              <th scope="col" key={n}>
                                Partner {n}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[...eventsForDivision(team.division)]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((event) => (
                              <tr
                                key={event.id}
                                data-slot={slotForEvent(event.id)?.color ?? 'unassigned'}
                              >
                                <th scope="row">{event.name}</th>
                                {[0, 1, 2].map((seat) =>
                                  seat >= partnerLimit(event.id) ? (
                                    <td
                                      key={seat}
                                      className="team-seat-none"
                                      aria-label="Not applicable"
                                    />
                                  ) : (
                                    <td key={seat}>
                                      <span className="community-seat">
                                        {team.slots[event.id]?.[seat] ? (
                                          <Link
                                            href={`/students/${encodeURIComponent(team.slots[event.id][seat]!)}`}
                                          >
                                            {students.get(team.slots[event.id]?.[seat] ?? '')
                                              ?.name ?? 'Unassigned'}
                                          </Link>
                                        ) : (
                                          'Unassigned'
                                        )}
                                      </span>
                                    </td>
                                  ),
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            )}
            {tab === 'members' && (
              <section aria-label="Community members">
                <div className="dashboard-section-title">
                  <h2>Everyone in your community.</h2>
                </div>
                <label className="search-field">
                  <span className="sr-only">Search members</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search members by name"
                  />
                </label>
                <div className="an-table-wrap">
                  <table className="an-table">
                    <thead>
                      <tr>
                        <th scope="col">Member</th>
                        <th scope="col">Role</th>
                        <th scope="col">Division</th>
                        <th scope="col">Teams</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.members
                        .filter((m) => m.name.toLowerCase().includes(search.trim().toLowerCase()))
                        .map((m) => (
                          <tr key={m.id}>
                            <th scope="row">
                              {m.role === 'student' ? (
                                <Link href={`/students/${encodeURIComponent(m.id)}`}>{m.name}</Link>
                              ) : (
                                m.name
                              )}
                            </th>
                            <td>{m.role === 'instructor' ? 'Instructor' : 'Student'}</td>
                            <td>{m.division ? `Division ${m.division}` : '—'}</td>
                            <td>
                              {data.analytics.teams
                                .filter((t) =>
                                  Object.values(t.slots).some((seats) => seats.includes(m.id)),
                                )
                                .map((t) => t.name)
                                .join(', ') || '—'}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {!data.members.some((m) =>
                  m.name.toLowerCase().includes(search.trim().toLowerCase()),
                ) && <p className="empty-state">No members match that name.</p>}
              </section>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export function CommunityPage() {
  const { profile } = useAuth();
  return (
    <AccountGate role={profile?.role ?? 'student'}>
      <CommunityView />
    </AccountGate>
  );
}
