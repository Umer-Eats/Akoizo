'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Users } from 'lucide-react';
import { eventsForDivision, type Division } from '@/lib/events';
import {
  accuracy,
  analyticsGroups,
  completion,
  summarize,
  weeklyAccuracy,
  type AnalyticsGroup,
  type AnalyticsSummary,
  type SchoolAnalytics,
} from '@/lib/analytics';
import { useAuth, authMessage } from './auth-context';
import './analytics.css';

const metrics = [
  {
    id: 'accuracy',
    label: 'Accuracy',
    percent: true,
    of: (s: AnalyticsSummary) => accuracy(s.overall),
  },
  { id: 'points', label: 'Points', percent: false, of: (s: AnalyticsSummary) => s.points },
  {
    id: 'tests',
    label: 'Tests completed',
    percent: false,
    of: (s: AnalyticsSummary) => s.practiceTests + s.rankedTests,
  },
  { id: 'work', label: 'Assigned work done', percent: true, of: completion },
] as const;
type MetricId = (typeof metrics)[number]['id'];
const percent = (value: number | null) => (value === null ? '—' : `${value}%`);
const whole = (value: number) => value.toLocaleString('en-US');
const weekLabel = (week: string) =>
  new Date(`${week}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
/** Series colors follow the team, in a fixed order. Past eight teams, the rest share gray. */
const seriesColor = (index: number) => (index < 8 ? `var(--viz-${index + 1})` : 'var(--muted)');

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

function MetricTabs({ value, onChange }: { value: MetricId; onChange: (id: MetricId) => void }) {
  return (
    <div className="tabs an-metrics" role="group" aria-label="Compare by">
      {metrics.map((metric) => (
        <button
          key={metric.id}
          aria-pressed={value === metric.id}
          onClick={() => onChange(metric.id)}
        >
          {metric.label}
        </button>
      ))}
    </div>
  );
}

function Tiles({ summary, students }: { summary: AnalyticsSummary; students: number }) {
  const tiles = [
    ['Students', whole(students), 'On this roster'],
    ['Overall accuracy', percent(accuracy(summary.overall)), 'All graded test points'],
    [
      'Tests completed',
      whole(summary.practiceTests + summary.rankedTests),
      `${summary.practiceTests} practice · ${summary.rankedTests} ranked`,
    ],
    [
      'Assigned work done',
      percent(completion(summary)),
      `${summary.completed} of ${summary.assigned} assignments`,
    ],
    ['Total points', whole(summary.points), 'Earned through ranked tests'],
  ];
  return (
    <div className="stat-grid an-tiles">
      {tiles.map(([name, value, hint]) => (
        <div className="stat-card" key={name}>
          <span>{name}</span>
          <strong>{value}</strong>
          <small>{hint}</small>
        </div>
      ))}
    </div>
  );
}

type Bar = { id: string; label: string; note?: string; value: number | null };
/** Ranked horizontal bars. A row is a button when it opens something. */
function BarList({
  bars,
  metric,
  onOpen,
}: {
  bars: Bar[];
  metric: (typeof metrics)[number];
  onOpen?: (id: string) => void;
}) {
  const sorted = [...bars].sort(
    (a, b) => (b.value ?? -1) - (a.value ?? -1) || a.label.localeCompare(b.label),
  );
  const max = metric.percent ? 100 : Math.max(1, ...bars.map((bar) => bar.value ?? 0));
  return (
    <ol className="an-bars" aria-label={`${metric.label} ranking`}>
      {sorted.map((bar) => {
        const body = (
          <>
            <span className="an-bar-label">
              {bar.label}
              {bar.note && <small>{bar.note}</small>}
            </span>
            <span className="an-bar-track">
              <span
                className="an-bar-fill"
                style={{ width: `${(Math.max(0, bar.value ?? 0) / max) * 100}%` }}
              />
            </span>
            <span className="an-bar-value">
              {bar.value === null
                ? 'No data'
                : metric.percent
                  ? percent(bar.value)
                  : whole(bar.value)}
            </span>
            {onOpen && <ChevronRight size={15} aria-hidden="true" />}
          </>
        );
        return (
          <li key={bar.id}>
            {onOpen ? (
              <button
                className="an-bar"
                onClick={() => onOpen(bar.id)}
                aria-label={`Open ${bar.label} analytics`}
              >
                {body}
              </button>
            ) : (
              <div className="an-bar">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

type Series = {
  id: string;
  label: string;
  color: string;
  points: { week: string; value: number }[];
};
/** Weekly accuracy lines with a crosshair that reads every series at once. */
function TrendChart({ series }: { series: Series[] }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const shown = series.filter((line) => line.points.length);
  const weeks = [
    ...new Set(shown.flatMap((line) => line.points.map((point) => point.week))),
  ].sort();
  if (!weeks.length)
    return (
      <div className="an-trend" ref={ref}>
        <p className="an-empty">
          No graded tests yet. Accuracy appears here as students submit practice and ranked tests.
        </p>
      </div>
    );
  const height = 240;
  const pad = { top: 14, right: 16, bottom: 28, left: 38 };
  const inner = Math.max(40, width - pad.left - pad.right);
  const x = (index: number) =>
    pad.left + (weeks.length === 1 ? inner / 2 : (index / (weeks.length - 1)) * inner);
  const y = (value: number) => pad.top + (1 - value / 100) * (height - pad.top - pad.bottom);
  const every = Math.ceil(weeks.length / Math.max(2, Math.floor(inner / 70)));
  const active = hover === null ? null : weeks[hover];
  return (
    <div className="an-trend" ref={ref}>
      {shown.length > 1 && (
        <ul className="an-legend" aria-label="Lines">
          {shown.map((line) => (
            <li key={line.id}>
              <span className="an-swatch" style={{ background: line.color }} />
              {line.label}
            </li>
          ))}
        </ul>
      )}
      <div className="an-plot">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={`Weekly accuracy for ${shown.map((line) => line.label).join(', ')}`}
          onMouseLeave={() => setHover(null)}
          onMouseMove={(event) => {
            const offset = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const index =
              weeks.length === 1
                ? 0
                : Math.round(((offset - pad.left) / inner) * (weeks.length - 1));
            setHover(Math.max(0, Math.min(weeks.length - 1, index)));
          }}
        >
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                className="an-grid"
                x1={pad.left}
                x2={width - pad.right}
                y1={y(tick)}
                y2={y(tick)}
              />
              <text className="an-axis" x={pad.left - 8} y={y(tick) + 3} textAnchor="end">
                {tick}%
              </text>
            </g>
          ))}
          {weeks.map(
            (week, index) =>
              index % every === 0 && (
                <text
                  className="an-axis"
                  key={week}
                  x={x(index)}
                  y={height - 8}
                  textAnchor="middle"
                >
                  {weekLabel(week)}
                </text>
              ),
          )}
          {active && (
            <line className="an-crosshair" x1={x(hover!)} x2={x(hover!)} y1={pad.top} y2={y(0)} />
          )}
          {shown.map((line) => (
            <g key={line.id}>
              <polyline
                className="an-line"
                stroke={line.color}
                points={line.points
                  .map((point) => `${x(weeks.indexOf(point.week))},${y(point.value)}`)
                  .join(' ')}
              />
              {line.points.map((point) => (
                <circle
                  className="an-dot"
                  key={point.week}
                  cx={x(weeks.indexOf(point.week))}
                  cy={y(point.value)}
                  r={point.week === active ? 5 : 4}
                  fill={line.color}
                />
              ))}
            </g>
          ))}
        </svg>
        {active && (
          <div
            className="an-tooltip"
            style={
              x(hover!) > width / 2 ? { right: width - x(hover!) + 12 } : { left: x(hover!) + 12 }
            }
          >
            <strong>Week of {weekLabel(active)}</strong>
            {shown.map((line) => {
              const point = line.points.find((candidate) => candidate.week === active);
              return (
                <span key={line.id}>
                  <span className="an-swatch" style={{ background: line.color }} />
                  {line.label}
                  <b>{point ? `${point.value}%` : '—'}</b>
                </span>
              );
            })}
          </div>
        )}
      </div>
      <details className="an-data">
        <summary>View as a table</summary>
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th scope="col">Week of</th>
                {shown.map((line) => (
                  <th scope="col" key={line.id}>
                    {line.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week}>
                  <th scope="row">{weekLabel(week)}</th>
                  {shown.map((line) => (
                    <td key={line.id}>
                      {percent(line.points.find((point) => point.week === week)?.value ?? null)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

type HeatColumn = { id: string; label: string; onOpen?: () => void };
type HeatRow = {
  id: string;
  label: string;
  cells: { value: number | null; seated?: boolean }[];
  onSelect?: () => void;
};
/** Events down the side, teams or students across the top, accuracy as depth of blue. */
function HeatTable({
  corner,
  columns,
  rows,
  label,
}: {
  corner: string;
  columns: HeatColumn[];
  rows: HeatRow[];
  label: string;
}) {
  if (!rows.length)
    return <p className="an-empty">No event has a graded test yet. Scores fill this grid in.</p>;
  return (
    <div className="an-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table className="an-table an-heat">
        <thead>
          <tr>
            <th scope="col">{corner}</th>
            {columns.map((column) => (
              <th scope="col" key={column.id}>
                {column.onOpen ? (
                  <button
                    className="text-link"
                    onClick={column.onOpen}
                    aria-label={`Open ${column.label} analytics`}
                  >
                    {column.label}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">
                {row.onSelect ? (
                  <button
                    className="text-link"
                    onClick={row.onSelect}
                    aria-label={`Show ${row.label} breakdown`}
                  >
                    {row.label}
                  </button>
                ) : (
                  row.label
                )}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={columns[index].id}
                  data-empty={cell.value === null}
                  data-seated={!!cell.seated}
                  title={`${columns[index].label} · ${row.label}: ${
                    cell.value === null ? 'no graded tests' : `${cell.value}% accuracy`
                  }${cell.seated ? ' · competes in this event' : ''}`}
                  style={
                    cell.value === null
                      ? undefined
                      : {
                          background: `color-mix(in srgb, var(--viz-1) ${Math.round(8 + cell.value * 0.5)}%, var(--surface))`,
                        }
                  }
                >
                  {cell.value === null ? '—' : `${cell.value}%`}
                  {cell.seated && <span className="sr-only"> (competes in this event)</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Meter({ value }: { value: number | null }) {
  return (
    <td className="an-meter" data-empty={value === null}>
      {percent(value)}
      <span className="an-bar-track" aria-hidden="true">
        <span className="an-bar-fill" style={{ width: `${value ?? 0}%` }} />
      </span>
    </td>
  );
}

export function InstructorAnalytics({ data: suppliedData }: { data?: SchoolAnalytics } = {}) {
  const { request } = useAuth();
  const [data, setData] = useState<SchoolAnalytics | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const [groupId, setGroupId] = useState('');
  const [chosenDivision, setDivision] = useState<Division | ''>('');
  const [metricId, setMetric] = useState<MetricId>('accuracy');
  const [studentMetricId, setStudentMetric] = useState<MetricId>('points');
  const [eventId, setEventId] = useState('');
  useEffect(() => {
    if (suppliedData) {
      setData(suppliedData);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    request<SchoolAnalytics>('/api/analytics')
      .then((next) => {
        if (active) {
          setData(next);
          setError('');
        }
      })
      .catch((error) => {
        if (active) setError(authMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [request, revision, suppliedData]);
  const groups = useMemo(() => (data ? analyticsGroups(data) : []), [data]);
  if (!data)
    return error ? (
      <div className="practice-empty">
        <p role="alert">{error}</p>
        <button className="button button-secondary" onClick={() => setRevision((n) => n + 1)}>
          Try again
        </button>
      </div>
    ) : (
      <p role="status">Loading your analytics…</p>
    );

  const names = new Map(data.students.map((student) => [student.id, student]));
  /** Points shown are a student's whole total, as on the rest of the dashboard. */
  const stats = (ids: string[], division: Division, event?: string) => {
    const summary = summarize(data, ids, division, event);
    return event
      ? summary
      : { ...summary, points: ids.reduce((sum, id) => sum + (names.get(id)?.points ?? 0), 0) };
  };
  const refresh = !suppliedData && (
    <button
      className="button button-small button-glass"
      onClick={() => setRevision((n) => n + 1)}
      disabled={loading}
    >
      <RefreshCw size={15} />
      {loading ? 'Refreshing…' : 'Refresh'}
    </button>
  );
  const colorOf = (group: AnalyticsGroup) => seriesColor(groups.indexOf(group));
  const group = groups.find((candidate) => candidate.id === groupId);

  if (group) {
    const members = group.memberIds
      .map((id) => names.get(id)!)
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
    const summary = stats(group.memberIds, group.division);
    const metric = metrics.find((candidate) => candidate.id === studentMetricId)!;
    const events = eventsForDivision(group.division)
      .map((event) => ({
        event,
        seats: group.seats[event.id] ?? [],
        team: accuracy(summarize(data, group.memberIds, group.division, event.id).overall),
      }))
      .filter((row) => row.seats.length || row.team !== null)
      .sort((a, b) => a.event.name.localeCompare(b.event.name));
    const event = events.find((row) => row.event.id === eventId)?.event;
    const everyone = data.students
      .filter((student) => student.division === group.division)
      .map((student) => student.id);
    return (
      <section aria-label={`${group.name} analytics`} className="an-root">
        <button className="back-link" onClick={() => setGroupId('')}>
          <ChevronLeft size={16} /> All teams
        </button>
        <div className="dashboard-section-title an-title">
          <h2>{group.name}</h2>
          <span className="tag">DIVISION {group.division}</span>
          {refresh}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <Tiles summary={summary} students={members.length} />

        <div className="an-card">
          <div className="an-card-title">
            <h3>Compare students</h3>
            <MetricTabs value={studentMetricId} onChange={setStudentMetric} />
          </div>
          <BarList
            metric={metric}
            bars={members.map((student) => ({
              id: student.id,
              label: student.name,
              value: metric.of(stats([student.id], group.division)),
            }))}
          />
        </div>

        <div className="an-card">
          <div className="an-card-title">
            <h3>Accuracy over time</h3>
            <span className="an-note">Weekly, all graded tests</span>
          </div>
          <TrendChart
            series={[
              {
                id: group.id,
                label: group.name,
                color: colorOf(group),
                points: weeklyAccuracy(data.attempts, group.memberIds, group.division),
              },
              {
                id: 'school',
                label: `All Division ${group.division} students`,
                color: 'var(--muted)',
                points: weeklyAccuracy(data.attempts, everyone, group.division),
              },
            ]}
          />
        </div>

        <div className="an-card">
          <div className="an-card-title">
            <h3>Accuracy by event</h3>
            <span className="an-note">
              {group.isTeam ? 'Outlined cells are the students seated in that event. ' : ''}
              Choose an event to break it down.
            </span>
          </div>
          <HeatTable
            label={`${group.name} accuracy by event and student`}
            corner="Event"
            columns={[
              { id: 'team', label: group.isTeam ? 'Team' : 'Group' },
              ...members.map((student) => ({ id: student.id, label: student.name })),
            ]}
            rows={events.map((row) => ({
              id: row.event.id,
              label: row.event.name,
              onSelect: () => setEventId(row.event.id),
              cells: [
                { value: row.team },
                ...members.map((student) => ({
                  value: accuracy(
                    summarize(data, [student.id], group.division, row.event.id).overall,
                  ),
                  seated: row.seats.includes(student.id),
                })),
              ],
            }))}
          />
        </div>

        <div className="an-card">
          <div className="an-card-title">
            <h3>Student breakdown</h3>
            <label className="an-select">
              Event
              <select
                aria-label="Breakdown event"
                value={event?.id ?? ''}
                onChange={(e) => setEventId(e.target.value)}
              >
                <option value="">All events</option>
                {events.map((row) => (
                  <option key={row.event.id} value={row.event.id}>
                    {row.event.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="an-table-wrap" role="region" aria-label="Student breakdown" tabIndex={0}>
            <table className="an-table an-breakdown">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Points</th>
                  <th scope="col">Overall</th>
                  <th scope="col">Multiple choice</th>
                  <th scope="col">Written</th>
                  <th scope="col">Practice tests</th>
                  <th scope="col">Ranked tests</th>
                  <th scope="col">Lessons</th>
                  <th scope="col">Assigned done</th>
                </tr>
              </thead>
              <tbody>
                {members.map((student) => {
                  const row = stats([student.id], group.division, event?.id);
                  return (
                    <tr key={student.id}>
                      <th scope="row">
                        {student.name}
                        {event && group.seats[event.id]?.includes(student.id) && (
                          <span className="tag">SEATED</span>
                        )}
                      </th>
                      <td className="an-number">{whole(row.points)}</td>
                      <Meter value={accuracy(row.overall)} />
                      <Meter value={accuracy(row.multipleChoice)} />
                      <Meter value={accuracy(row.written)} />
                      <td>
                        {percent(accuracy(row.practice))}
                        <small>{row.practiceTests} taken</small>
                      </td>
                      <td>
                        {percent(accuracy(row.ranked))}
                        <small>{row.rankedTests} taken</small>
                      </td>
                      <td className="an-number">{row.lessons}</td>
                      <td>
                        {percent(completion(row))}
                        <small>
                          {row.completed} of {row.assigned}
                        </small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="source-note">
            Accuracy is points earned out of points graded. Written answers still waiting for review
            are left out until they are scored.
            {event ? ` Points are those earned in ${event.name}.` : ''}
          </p>
        </div>
      </section>
    );
  }

  const divisions = (['A', 'B', 'C'] as const).filter((value) =>
    groups.some((candidate) => candidate.division === value),
  );
  const division =
    divisions.find((value) => value === chosenDivision) ??
    [...divisions].sort(
      (a, b) =>
        data.students.filter((s) => s.division === b).length -
        data.students.filter((s) => s.division === a).length,
    )[0];
  if (!division)
    return (
      <div className="empty-state">
        <Users size={32} />
        <h2>Analytics start with your roster.</h2>
        <p>
          {suppliedData
            ? 'Scores and points appear here as community members study.'
            : 'Share your school password, then build teams. Scores and points appear here.'}
        </p>
      </div>
    );
  const shown = groups.filter((candidate) => candidate.division === division);
  const everyone = data.students.filter((s) => s.division === division).map((s) => s.id);
  const metric = metrics.find((candidate) => candidate.id === metricId)!;
  const teamCount = data.teams.length;
  return (
    <section aria-label="School analytics" className="an-root">
      <div className="dashboard-section-title an-title">
        <h2>See how every team is doing.</h2>
        <span className="tag">
          {teamCount} {teamCount === 1 ? 'TEAM' : 'TEAMS'}
        </span>
        {refresh}
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {divisions.length > 1 && (
        <div className="tabs an-divisions" role="group" aria-label="Division">
          {divisions.map((value) => (
            <button
              key={value}
              aria-pressed={value === division}
              onClick={() => setDivision(value)}
            >
              Division {value}
            </button>
          ))}
        </div>
      )}
      <Tiles summary={stats(everyone, division)} students={everyone.length} />

      <div className="an-card">
        <div className="an-card-title">
          <h3>Compare teams</h3>
          <MetricTabs value={metricId} onChange={setMetric} />
        </div>
        <BarList
          metric={metric}
          onOpen={setGroupId}
          bars={shown.map((candidate) => ({
            id: candidate.id,
            label: candidate.name,
            note: `${candidate.memberIds.length} ${candidate.memberIds.length === 1 ? 'student' : 'students'}`,
            value: metric.of(stats(candidate.memberIds, division)),
          }))}
        />
        <p className="an-note">Select a team to see its students and events.</p>
      </div>

      <div className="an-card">
        <div className="an-card-title">
          <h3>Accuracy over time</h3>
          <span className="an-note">Weekly, all graded tests</span>
        </div>
        <TrendChart
          series={shown.map((candidate) => ({
            id: candidate.id,
            label: candidate.name,
            color: colorOf(candidate),
            points: weeklyAccuracy(data.attempts, candidate.memberIds, division),
          }))}
        />
      </div>

      <div className="an-card">
        <div className="an-card-title">
          <h3>Accuracy by event</h3>
          <span className="an-note">Each team’s students, all graded tests in the event</span>
        </div>
        <HeatTable
          label="Accuracy by event and team"
          corner="Event"
          columns={shown.map((candidate) => ({
            id: candidate.id,
            label: candidate.name,
            onOpen: () => setGroupId(candidate.id),
          }))}
          rows={eventsForDivision(division)
            .map((event) => ({
              id: event.id,
              label: event.name,
              cells: shown.map((candidate) => ({
                value: accuracy(summarize(data, candidate.memberIds, division, event.id).overall),
              })),
            }))
            .filter((row) => row.cells.some((cell) => cell.value !== null))
            .sort((a, b) => a.label.localeCompare(b.label))}
        />
      </div>
    </section>
  );
}
