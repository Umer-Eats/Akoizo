'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  Copy,
  Download,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { AccountGate } from './account-gate';
import { AttendanceMap, type WorkshopLocation } from './attendance-map';
import { workshopStatus, type AttendanceData, type Workshop } from '@/lib/attendance';
import './attendance.css';

function workshopDate(w: Workshop) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: w.timezone,
  }).format(new Date(w.opensAt));
}
function workshopTime(w: Workshop) {
  const f = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: w.timezone,
  });
  return `${f.format(new Date(w.opensAt))} – ${f.format(new Date(w.closesAt))}`;
}
function localInput(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function WorkshopForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => Promise<void> }) {
  const { request } = useAuth();
  const ref = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(''),
    [opens, setOpens] = useState(() => localInput(new Date(Date.now() + 3600000))),
    [closes, setCloses] = useState(() => localInput(new Date(Date.now() + 7200000)));
  const [location, setLocation] = useState<WorkshopLocation | null>(null),
    [mapOpen, setMapOpen] = useState(false);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!location) {
      setError('Choose the workshop location first.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await request('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({
          title,
          opensAt: new Date(opens).toISOString(),
          closesAt: new Date(closes).toISOString(),
          timezone,
          locationName: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });
      await onSaved();
      onClose();
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <dialog
        ref={ref}
        className="att-dialog"
        aria-labelledby="new-workshop-title"
        onCancel={(e) => {
          if (busy) e.preventDefault();
          else onClose();
        }}
      >
        <form onSubmit={submit}>
          <div className="att-dialog-head">
            <div>
              <span className="att-eyebrow">PLAN A WORKSHOP</span>
              <h2 id="new-workshop-title">A day to show up.</h2>
              <p>Each workshop gets its own attendance code.</p>
            </div>
            <button
              type="button"
              className="att-icon"
              aria-label="Close workshop form"
              onClick={onClose}
              disabled={busy}
            >
              <X size={20} />
            </button>
          </div>
          <label className="att-label">
            Workshop name
            <input
              autoFocus
              required
              maxLength={100}
              placeholder="e.g. Saturday build workshop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className="att-form-row">
            <label className="att-label">
              Check-in opens
              <input
                type="datetime-local"
                required
                value={opens}
                onChange={(e) => setOpens(e.target.value)}
              />
            </label>
            <label className="att-label">
              Check-in closes
              <input
                type="datetime-local"
                required
                min={opens}
                value={closes}
                onChange={(e) => setCloses(e.target.value)}
              />
            </label>
          </div>
          <p className="att-help">
            <Clock3 size={14} /> Times use {timezone}. Check-in windows can last up to 24 hours.
          </p>
          <label className="att-label">
            Workshop location
            <button type="button" className="att-location-picker" onClick={() => setMapOpen(true)}>
              <MapPin size={22} />
              <span>
                <strong>{location?.name || 'Choose a location'}</strong>
                <small>
                  {location
                    ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
                    : 'Search an address or drop a pin on the map'}
                </small>
              </span>
              <ChevronRight size={18} />
            </button>
          </label>
          <div className="att-info">
            <ShieldCheck size={21} />
            <p>
              Students need the code and a precise browser location within <strong>0.5 mile</strong>{' '}
              of your pin, during the check-in window.
            </p>
          </div>
          <p className="att-help">
            The current community student roster is saved for this workshop. Cancelled workshops do
            not affect attendance rates.
          </p>
          {error && (
            <p className="att-error" role="alert">
              {error}
            </p>
          )}
          <div className="att-dialog-foot">
            <button type="button" className="button button-glass" onClick={onClose} disabled={busy}>
              Cancel
            </button>
            <button className="button button-primary" disabled={busy || !location}>
              {busy ? 'Creating…' : 'Create workshop'}
              <Plus size={16} />
            </button>
          </div>
        </form>
      </dialog>
      {mapOpen && (
        <AttendanceMap
          initial={location}
          onClose={() => setMapOpen(false)}
          onSelect={(value) => {
            setLocation(value);
            setMapOpen(false);
          }}
        />
      )}
    </>
  );
}

export function AttendancePage() {
  const { profile } = useAuth();
  return (
    <AccountGate role={profile?.role ?? 'student'}>
      <AttendanceWorkspace />
    </AccountGate>
  );
}

export function AttendanceWorkspace({ embedded = false }: { embedded?: boolean }) {
  const { profile, request } = useAuth();
  const teacher = profile?.role === 'instructor';
  const [data, setData] = useState<AttendanceData | null>(null),
    [error, setError] = useState(''),
    [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(''),
    [creating, setCreating] = useState(false);
  const [tab, setTab] = useState('workshops'),
    [filter, setFilter] = useState('all'),
    [search, setSearch] = useState(''),
    [selectedId, setSelectedId] = useState('');
  const [code, setCode] = useState(''),
    [now, setNow] = useState(Date.now()),
    [confirmCancel, setConfirmCancel] = useState('');
  const clockOffset = useRef(0),
    version = useRef(0);
  const refresh = useCallback(async () => {
    const revision = ++version.current;
    setLoading(true);
    try {
      const next = await request<AttendanceData>('/api/attendance');
      if (version.current !== revision) return;
      clockOffset.current = Date.parse(next.serverTime) - Date.now();
      setNow(Date.now() + clockOffset.current);
      setData(next);
      setError('');
    } catch (e) {
      if (version.current === revision) setError(authMessage(e));
    } finally {
      if (version.current === revision) setLoading(false);
    }
  }, [request]);
  useEffect(() => {
    void refresh();
    const tick = window.setInterval(() => setNow(Date.now() + clockOffset.current), 1000);
    const visibleRefresh = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    const timer = window.setInterval(visibleRefresh, 30000);
    document.addEventListener('visibilitychange', visibleRefresh);
    return () => {
      version.current++;
      window.clearInterval(tick);
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', visibleRefresh);
    };
  }, [refresh]);
  useEffect(() => {
    setCode('');
    setConfirmCancel('');
    setNotice('');
  }, [selectedId]);
  const workshops = data?.workshops ?? [];
  const students = data?.members.filter((m) => m.role === 'student') ?? [];
  const open = workshops.filter((w) => workshopStatus(w, now) === 'Open');
  const closed = workshops.filter((w) => !w.cancelled && Date.parse(w.closesAt) <= now);
  const attended = workshops.filter((w) => !w.cancelled && w.checkedInAt).length;
  const closedAttended = closed.filter((w) => w.checkedInAt).length;
  const expected = teacher ? closed.reduce((n, w) => n + w.expected, 0) : closed.length;
  const present = teacher ? closed.reduce((n, w) => n + w.present, 0) : closedAttended;
  const rate = expected ? Math.round((present / expected) * 100) : null;
  const online = data?.members.filter((m) => m.online) ?? [];
  const filtered = workshops.filter(
    (w) =>
      (filter === 'all' || workshopStatus(w, now).toLowerCase() === filter) &&
      `${w.title} ${w.locationName}`.toLowerCase().includes(search.toLowerCase()),
  );
  const selected =
    workshops.find((w) => w.id === selectedId) ??
    open[0] ??
    workshops.find((w) => workshopStatus(w, now) === 'Upcoming') ??
    workshops[0];

  async function manage(w: Workshop, action: 'rotate' | 'cancel') {
    setBusy(w.id);
    setError('');
    setNotice('');
    try {
      await request('/api/attendance', {
        method: 'PATCH',
        body: JSON.stringify({ id: w.id, action }),
      });
      await refresh();
      setNotice(
        action === 'rotate'
          ? 'New code generated. Share it with students at the workshop.'
          : 'Workshop cancelled. It will not count toward attendance rates.',
      );
      setConfirmCancel('');
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setBusy('');
    }
  }
  async function checkIn(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setBusy('checkin');
    setError('');
    setNotice('');
    try {
      if (!navigator.geolocation)
        throw new Error(
          'Location is unavailable in this browser. Please use a browser that supports location.',
        );
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          resolve,
          (e) =>
            reject(
              new Error(
                e.code === 1
                  ? 'Allow location access in your browser to check in.'
                  : e.code === 3
                    ? 'Location timed out. Move near a window and try again.'
                    : 'Your location could not be determined. Enable precise location and try again.',
              ),
            ),
          { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 },
        ),
      );
      const result = await request<{ alreadyRecorded: boolean }>('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({
          workshopId: selected.id,
          code: code.trim(),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        }),
      });
      await refresh();
      setCode('');
      setNotice(
        result.alreadyRecorded
          ? 'Your attendance was already recorded.'
          : 'You’re checked in. Your attendance has been recorded.',
      );
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setBusy('');
    }
  }
  function exportCsv() {
    if (!data) return;
    const safe = (value: unknown) =>
      `"${String(value ?? '')
        .replace(/^[=+@\-\t\r]/, "'$&")
        .replaceAll('"', '""')}"`;
    const rows = [['Student', 'Workshop', 'Date', 'Status', 'Checked in at']];
    for (const w of workshops)
      for (const m of students) {
        if (!w.audienceIds?.includes(m.id)) continue;
        const entry = data.records.find((r) => r.workshopId === w.id && r.studentId === m.id);
        rows.push([
          m.name,
          w.title,
          workshopDate(w),
          w.cancelled
            ? 'Cancelled'
            : entry
              ? 'Present'
              : workshopStatus(w, now) === 'Closed'
                ? 'Absent'
                : 'Pending',
          entry?.checkedInAt ?? '',
        ]);
      }
    const blob = new Blob(['\uFEFF' + rows.map((r) => r.map(safe).join(',')).join('\r\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement('a');
    a.href = url;
    a.download = 'workshop-attendance.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  const content = (
    <>
      <div className="att-heading">
        <div>
          <span className="att-eyebrow">
            {teacher ? 'INSTRUCTOR WORKSPACE' : 'YOUR WORKSHOP RECORD'} /{' '}
            {profile?.schoolCommunityName || profile?.schoolName}
          </span>
          <h1>
            Show up. <span>Move forward.</span>
          </h1>
          <p>
            {teacher
              ? 'Every workshop, every student. Keep your community on track.'
              : 'Your workshops and attendance, all in one place.'}
          </p>
        </div>
        <div className="att-heading-actions">
          <button
            className="button button-glass button-small"
            onClick={() => void refresh()}
            disabled={loading}
            aria-label="Refresh attendance"
          >
            <RefreshCw size={16} />
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          {teacher && (
            <button className="button button-primary" onClick={() => setCreating(true)}>
              <Plus size={17} />
              New workshop
            </button>
          )}
        </div>
      </div>
      {error && (
        <p className="att-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="att-success" role="status">
          <CheckCheck size={18} />
          {notice}
        </p>
      )}
      <div className="att-stats">
        {[
          {
            label: 'Attendance rate',
            value: rate === null ? '—' : `${rate}%`,
            hint: 'Across completed workshops',
            icon: ShieldCheck,
          },
          {
            label: teacher ? 'Workshops scheduled' : 'Workshops attended',
            value: teacher ? workshops.filter((w) => !w.cancelled).length : attended,
            hint: teacher ? 'A unique code for every day' : 'Your recorded check-ins',
            icon: CalendarDays,
          },
          {
            label: teacher ? 'Open for check-in' : 'Open now',
            value: open.length,
            hint: 'Code + location required',
            icon: Clock3,
          },
          {
            label: teacher ? 'Online now' : 'Upcoming workshops',
            value: teacher
              ? online.length
              : workshops.filter((w) => workshopStatus(w, now) === 'Upcoming').length,
            hint: teacher ? 'Active in the last 90 seconds' : 'Make room for your next session',
            icon: teacher ? Users : CalendarDays,
          },
        ].map((s) => (
          <div className="att-stat" key={s.label}>
            <div>
              <span>{s.label}</span>
              <s.icon size={18} />
            </div>
            <strong>{s.value}</strong>
            <small>{s.hint}</small>
          </div>
        ))}
      </div>
      {teacher && (
        <div
          className="att-tabs"
          role="tablist"
          aria-label="Attendance views"
          onKeyDown={(e) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
            const buttons = Array.from(
              e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
            );
            const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
            const next =
              e.key === 'Home'
                ? 0
                : e.key === 'End'
                  ? buttons.length - 1
                  : (index + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
            e.preventDefault();
            buttons[next]?.focus();
            buttons[next]?.click();
          }}
        >
          {[
            ['workshops', 'Workshops', CalendarDays],
            ['analytics', 'Student analytics', ShieldCheck],
            ['online', 'Online now', Users],
          ].map(([id, label, Icon]) => (
            <button
              key={String(id)}
              id={`att-tab-${id}`}
              role="tab"
              tabIndex={tab === id ? 0 : -1}
              aria-selected={tab === id}
              aria-controls="att-panel"
              onClick={() => {
                setTab(String(id));
                setSearch('');
              }}
            >
              <Icon size={16} />
              {String(label)}
              {id === 'online' && <b>{online.length}</b>}
            </button>
          ))}
        </div>
      )}
      {!data ? (
        <div className="att-empty">
          <RefreshCw size={28} />
          <h2>{error ? 'Attendance is unavailable.' : 'Loading attendance…'}</h2>
          <p>{error ? 'Use Refresh to try again.' : 'Getting your community’s workshops.'}</p>
        </div>
      ) : (
        <div
          id="att-panel"
          role={teacher ? 'tabpanel' : undefined}
          aria-labelledby={teacher ? `att-tab-${tab}` : undefined}
        >
          {tab === 'workshops' && (
            <div className="att-workspace">
              <section className="att-panel att-workshop-list">
                <div className="att-panel-title">
                  <div>
                    <span className="att-eyebrow">THE SCHEDULE</span>
                    <h2>
                      Workshop days <b>{workshops.length}</b>
                    </h2>
                  </div>
                </div>
                <div className="att-toolbar">
                  <label className="att-search">
                    <Search size={16} />
                    <input
                      aria-label="Search workshops"
                      placeholder="Find a workshop…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <select
                    aria-label="Filter workshops"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All days</option>
                    <option value="open">Open now</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {!filtered.length ? (
                  <div className="att-empty">
                    <CalendarDays size={30} />
                    <h3>
                      {workshops.length
                        ? 'No matching workshops.'
                        : 'Your next workshop starts here.'}
                    </h3>
                    <p>
                      {workshops.length
                        ? 'Try another search or filter.'
                        : teacher
                          ? 'Create a workshop, set the window, and choose your location.'
                          : 'Your teacher’s workshop days will appear here when scheduled.'}
                    </p>
                    {teacher && !workshops.length && (
                      <button className="button button-primary" onClick={() => setCreating(true)}>
                        <Plus size={16} />
                        Plan a workshop
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="att-days">
                    {filtered.map((w) => {
                      const status = workshopStatus(w, now);
                      return (
                        <button
                          className={`att-day ${selected?.id === w.id ? 'is-selected' : ''}`}
                          key={w.id}
                          onClick={() => setSelectedId(w.id)}
                          aria-pressed={selected?.id === w.id}
                        >
                          <div className="att-date-block">
                            <span>
                              {new Intl.DateTimeFormat(undefined, {
                                month: 'short',
                                timeZone: w.timezone,
                              }).format(new Date(w.opensAt))}
                            </span>
                            <strong>
                              {new Intl.DateTimeFormat(undefined, {
                                day: 'numeric',
                                timeZone: w.timezone,
                              }).format(new Date(w.opensAt))}
                            </strong>
                          </div>
                          <div className="att-day-body">
                            <div>
                              <strong>{w.title}</strong>
                              <span
                                className={`att-badge att-${w.checkedInAt && !w.cancelled ? 'present' : status.toLowerCase()}`}
                              >
                                {w.checkedInAt && !w.cancelled ? 'Present' : status}
                              </span>
                            </div>
                            <span>
                              <Clock3 size={13} />
                              {workshopTime(w)}
                            </span>
                            <span>
                              <MapPin size={13} />
                              {w.locationName}
                            </span>
                            {teacher && (
                              <small>
                                {w.present} / {w.expected} students checked in
                              </small>
                            )}
                          </div>
                          <ChevronRight size={17} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
              <aside className="att-detail">
                {selected ? (
                  <>
                    <section className="att-panel">
                      <div className="att-detail-hero">
                        <span className="att-eyebrow">
                          {teacher ? 'WORKSHOP CONTROL' : 'YOUR CHECK-IN'}
                        </span>
                        <span
                          className={`att-badge att-${workshopStatus(selected, now).toLowerCase()}`}
                        >
                          <i />
                          {workshopStatus(selected, now)}
                        </span>
                        <h2>{selected.title}</h2>
                        <p>{workshopDate(selected)}</p>
                      </div>
                      <div className="att-detail-body">
                        <div className="att-detail-line">
                          <Clock3 size={18} />
                          <div>
                            <strong>{workshopTime(selected)}</strong>
                            <small>{selected.timezone}</small>
                          </div>
                        </div>
                        <div className="att-detail-line">
                          <MapPin size={18} />
                          <div>
                            <strong>{selected.locationName}</strong>
                            <a
                              className="text-link"
                              href={`https://www.openstreetmap.org/?mlat=${selected.latitude}&mlon=${selected.longitude}#map=16/${selected.latitude}/${selected.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View location ↗
                            </a>
                          </div>
                        </div>
                        {teacher ? (
                          <>
                            <div className="att-code-box">
                              <span>ATTENDANCE CODE</span>
                              <strong>{selected.code}</strong>
                              <button
                                className="text-link"
                                onClick={async () => {
                                  try {
                                    await navigator.clipboard.writeText(selected.code ?? '');
                                    setNotice(
                                      'Code copied. Share it with students at the workshop.',
                                    );
                                  } catch {
                                    setError(
                                      'Could not copy. Select the code and copy it manually.',
                                    );
                                  }
                                }}
                              >
                                <Copy size={14} />
                                Copy code
                              </button>
                            </div>
                            <div className="att-progress-label">
                              <span>Students checked in</span>
                              <strong>
                                {selected.present} / {selected.expected}
                              </strong>
                            </div>
                            <progress
                              value={selected.present}
                              max={Math.max(1, selected.expected)}
                              aria-label="Workshop attendance"
                            />
                            {['Open', 'Upcoming'].includes(workshopStatus(selected, now)) && (
                              <div className="att-controls">
                                <button
                                  className="button button-glass button-small"
                                  disabled={!!busy}
                                  onClick={() => void manage(selected, 'rotate')}
                                >
                                  <RefreshCw size={14} />
                                  New code
                                </button>
                                <button
                                  className="att-danger"
                                  disabled={!!busy}
                                  onClick={() => setConfirmCancel(selected.id)}
                                >
                                  Cancel workshop
                                </button>
                              </div>
                            )}
                            {confirmCancel === selected.id && (
                              <div className="att-confirm">
                                <p>
                                  Cancel this workshop? Check-in will close and it will be excluded
                                  from attendance rates.
                                </p>
                                <button
                                  className="button button-small"
                                  disabled={!!busy}
                                  onClick={() => void manage(selected, 'cancel')}
                                >
                                  Yes, cancel workshop
                                </button>
                                <button className="text-link" onClick={() => setConfirmCancel('')}>
                                  Keep workshop
                                </button>
                              </div>
                            )}
                          </>
                        ) : selected.checkedInAt && !selected.cancelled ? (
                          <div className="att-checked">
                            <CheckCheck size={28} />
                            <h3>You showed up.</h3>
                            <p>
                              Attendance recorded at{' '}
                              {new Date(selected.checkedInAt).toLocaleTimeString(undefined, {
                                hour: 'numeric',
                                minute: '2-digit',
                                timeZone: selected.timezone,
                              })}
                              .
                            </p>
                          </div>
                        ) : workshopStatus(selected, now) === 'Open' ? (
                          <form className="att-checkin" onSubmit={checkIn}>
                            <label className="att-label">
                              Enter your workshop code
                              <input
                                className="att-code-input"
                                placeholder="8-character code"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                minLength={8}
                                maxLength={8}
                                autoComplete="off"
                                autoCapitalize="characters"
                                spellCheck={false}
                                required
                              />
                            </label>
                            <button
                              className="button button-primary"
                              disabled={!!busy || code.trim().length !== 8}
                            >
                              {busy === 'checkin' ? (
                                <>
                                  <RefreshCw size={16} />
                                  Checking location…
                                </>
                              ) : (
                                <>
                                  <MapPin size={16} />
                                  Check in with location
                                </>
                              )}
                            </button>
                            <p>
                              Your browser will ask for location access. Your exact coordinates are
                              used for this check and are not saved.
                            </p>
                          </form>
                        ) : (
                          <div className="att-info">
                            <Clock3 size={19} />
                            <p>
                              {selected.cancelled
                                ? 'This workshop was cancelled. It does not affect your attendance.'
                                : workshopStatus(selected, now) === 'Upcoming'
                                  ? 'Check-in opens at the time above. Ask your teacher for the code when you arrive.'
                                  : 'The check-in window has closed. No attendance was recorded for this workshop.'}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                    <div className="att-info att-location-note">
                      <ShieldCheck size={22} />
                      <div>
                        <strong>Right place. Right time.</strong>
                        <p>
                          A valid code, the teacher’s check-in window, and a precise location within
                          0.5 mile are required.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="att-panel att-empty">
                    <MapPin size={30} />
                    <h3>A place to connect.</h3>
                    <p>Select a workshop to see its location and check-in details.</p>
                  </div>
                )}
              </aside>
            </div>
          )}
          {teacher && tab === 'analytics' && (
            <section className="att-panel">
              <div className="att-panel-title">
                <div>
                  <span className="att-eyebrow">THE BIG PICTURE</span>
                  <h2>Student attendance</h2>
                  <p>Rates include completed workshops on each student’s saved roster.</p>
                </div>
                <button className="button button-glass button-small" onClick={exportCsv}>
                  <Download size={15} />
                  Export attendance
                </button>
              </div>
              <div className="att-toolbar">
                <label className="att-search">
                  <Search size={16} />
                  <input
                    aria-label="Search students"
                    placeholder="Search students…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Workshop report"
                  value={selected?.id ?? ''}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  {workshops.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.title} · {workshopDate(w)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="att-table-scroll">
                <table className="att-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Completed attendance</th>
                      <th>Attendance rate</th>
                      <th>{selected ? 'Selected workshop' : 'Workshop'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
                      .map((m) => {
                        const r = data.records.find(
                          (r) => r.workshopId === selected?.id && r.studentId === m.id,
                        );
                        return (
                          <tr key={m.id}>
                            <td>
                              <span className="att-person">
                                <i className={m.online ? 'is-online' : ''}>
                                  {m.name.slice(0, 1).toUpperCase()}
                                </i>
                                <span>
                                  {m.name}
                                  <small>{m.online ? 'Online now' : 'Offline'}</small>
                                </span>
                              </span>
                            </td>
                            <td>
                              {m.attended}{' '}
                              <span className="att-muted">/ {m.expected} workshops</span>
                            </td>
                            <td>
                              <div className="att-rate">
                                <progress
                                  value={m.rate ?? 0}
                                  max={100}
                                  aria-label={`${m.name} attendance rate`}
                                />
                                <strong>{m.rate === null ? '—' : `${m.rate}%`}</strong>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`att-badge att-${r ? 'present' : selected && workshopStatus(selected, now) === 'Closed' ? 'closed' : 'upcoming'}`}
                              >
                                {!selected
                                  ? '—'
                                  : selected.cancelled
                                    ? 'Cancelled'
                                    : !selected.audienceIds?.includes(m.id)
                                      ? 'Not on roster'
                                      : r
                                        ? 'Present'
                                        : workshopStatus(selected, now) === 'Closed'
                                          ? 'Absent'
                                          : 'Pending'}
                              </span>
                              {r && (
                                <small className="att-record-time">
                                  {new Date(r.checkedInAt).toLocaleTimeString(undefined, {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    timeZone: selected?.timezone,
                                  })}
                                </small>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {!students.length && (
                  <div className="att-empty">
                    <Users size={28} />
                    <h3>No students yet.</h3>
                    <p>Students will appear when they join your community.</p>
                  </div>
                )}
              </div>
            </section>
          )}
          {teacher && tab === 'online' && (
            <section className="att-panel">
              <div className="att-panel-title">
                <div>
                  <span className="att-eyebrow">YOUR COMMUNITY, HERE</span>
                  <h2>
                    <span className="att-live-dot" /> Online now <b>{online.length}</b>
                  </h2>
                  <p>
                    Members with a visible Akoizo tab active in the last 90 seconds. Updates every
                    30 seconds.
                  </p>
                </div>
              </div>
              <div className="att-online-grid">
                {online.map((m) => (
                  <div className="att-online-person" key={m.id}>
                    <span className="att-avatar">
                      {m.name.slice(0, 1).toUpperCase()}
                      <i />
                    </span>
                    <div>
                      <strong>{m.name}</strong>
                      <small>{m.role === 'instructor' ? 'Teacher' : 'Student'}</small>
                    </div>
                    <span className="att-badge att-present">Online</span>
                  </div>
                ))}
              </div>
              {!online.length && (
                <div className="att-empty">
                  <Users size={30} />
                  <h3>A quiet moment.</h3>
                  <p>Community members will appear here when they are active.</p>
                </div>
              )}
            </section>
          )}
        </div>
      )}
      <div className="att-footer-note">
        <Check size={14} />
        <span>
          Attendance belongs to your community.{' '}
          {teacher
            ? 'Cancelled and upcoming workshops are excluded from rates.'
            : 'Your teacher sets each workshop’s time and place.'}
        </span>
        {!embedded && (
          <Link href={`/dashboard/${profile?.role ?? 'student'}`}>
            Back to dashboard <ChevronRight size={14} />
          </Link>
        )}
      </div>
      {creating && <WorkshopForm onClose={() => setCreating(false)} onSaved={refresh} />}
    </>
  );
  return embedded ? (
    <div className="attendance attendance-embedded">{content}</div>
  ) : (
    <main id="main" className="page-container attendance">
      {content}
    </main>
  );
}
