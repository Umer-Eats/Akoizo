'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, authMessage } from './auth-context';
import { useSettings } from './providers';
import { SchoolPanel } from './dashboard';
import type { Profile, Student } from '@/lib/domain';

function NameEditor({ member, own = false }: { member: Profile; own?: boolean }) {
  const { request, refreshProfile } = useAuth();
  const [name, setName] = useState(member.displayName);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  return (
    <form
      className="settings-name-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setNotice('');
        setError('');
        try {
          await request('/api/settings', {
            method: 'PATCH',
            body: JSON.stringify({ displayName: name, studentId: member.id }),
          });
          if (own) await refreshProfile();
          setNotice('Name saved.');
        } catch (error) {
          setError(authMessage(error));
        } finally {
          setBusy(false);
        }
      }}
    >
      <label htmlFor={`name-${member.id}`}>
        {own ? 'Full name' : `${member.displayName} · Division ${member.division}`}
      </label>
      <div className="settings-input-row">
        <input
          id={`name-${member.id}`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={80}
          required
          autoComplete={own ? 'name' : 'off'}
        />
        <button className="button button-primary button-small" disabled={busy}>
          {busy ? 'Saving…' : 'Save name'}
        </button>
      </div>
      {notice && (
        <p role="status" className="settings-notice">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
    </form>
  );
}
export function AccountSettings() {
  const { profile, request, refreshProfile, clearCredentials } = useAuth();
  const { ako, updateAko, motion, toggleMotion } = useSettings();
  const router = useRouter();
  const [students, setStudents] = useState<Student[] | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [confirmation, setConfirmation] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const student = profile?.role === 'student';
  useEffect(() => {
    if (profile?.role !== 'instructor') return;
    let current = true;
    setError('');
    request<{ students: Student[] }>('/api/settings')
      .then((data) => {
        if (current) setStudents(data.students);
      })
      .catch((error) => {
        if (current) setError(authMessage(error));
      });
    return () => {
      current = false;
    };
  }, [profile?.id, profile?.role, request, retry]);
  if (!profile) return null;
  const expected = student ? 'LEAVE' : profile.schoolName;
  async function depart() {
    setBusy(true);
    setDeleteError('');
    try {
      await request('/api/settings', { method: 'DELETE', body: JSON.stringify({ confirmation }) });
      clearCredentials();
      await refreshProfile();
      router.replace(`/login/${profile!.role}`);
    } catch (error) {
      setDeleteError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <main id="main" className="page-container account-settings">
      <Link className="text-link" href={`/dashboard/${profile.role}`}>
        ← Back to dashboard
      </Link>
      <div className="settings-heading">
        <span className="eyebrow">YOUR SPACE / {student ? 'STUDENT' : 'INSTRUCTOR'}</span>
        <h1>Make yourself at home.</h1>
        <p>
          {student
            ? 'Your name, your lab buddy, your community.'
            : 'Manage access and look after your school community.'}
        </p>
      </div>
      {student ? (
        <>
          <section className="settings-card">
            <span className="eyebrow">01 / PROFILE</span>
            <h2>What should we call you?</h2>
            <p>Your full name appears on your instructor’s student roster.</p>
            <NameEditor member={profile} own />
          </section>
          <section className="settings-card">
            <span className="eyebrow">02 / YOUR LAB BUDDY</span>
            <h2>Ako, your way.</h2>
            <p>
              These preferences are saved in this browser. Drag Ako to place him; dragging anchors
              him automatically.
            </p>
            <label className="settings-toggle">
              <span>
                <strong>Show Ako</strong>
                <small>Keep your little lab buddy on screen.</small>
              </span>
              <input
                type="checkbox"
                checked={ako.visible}
                onChange={(event) => updateAko({ visible: event.target.checked })}
              />
            </label>
            <label className="settings-toggle">
              <span>
                <strong>Encouragement</strong>
                <small>Occasional pep talks in a text bubble.</small>
              </span>
              <input
                type="checkbox"
                checked={!ako.muted}
                onChange={(event) => updateAko({ muted: !event.target.checked })}
              />
            </label>
            <label className="settings-toggle">
              <span>
                <strong>Anchor in place</strong>
                <small>Stay where you put him. Snacks come to him.</small>
              </span>
              <input
                type="checkbox"
                checked={ako.anchored}
                onChange={(event) => updateAko({ anchored: event.target.checked })}
              />
            </label>
            <label className="settings-toggle">
              <span>
                <strong>Animations</strong>
                <small>
                  Site-wide motion. Your device’s reduced-motion preference still applies.
                </small>
              </span>
              <input type="checkbox" checked={motion} onChange={toggleMotion} />
            </label>
          </section>
        </>
      ) : (
        <>
          <SchoolPanel />
          <section className="settings-card">
            <span className="eyebrow">STUDENT ROSTER</span>
            <h2>A name for everyone.</h2>
            <p>Update full names for students in your own community.</p>
            {error ? (
              <div>
                <p role="alert" className="form-error">
                  {error}
                </p>
                <button className="text-link" onClick={() => setRetry((value) => value + 1)}>
                  Try again
                </button>
              </div>
            ) : students === null ? (
              <p role="status">Loading students…</p>
            ) : students.length ? (
              students.map((member) => <NameEditor key={member.id} member={member} />)
            ) : (
              <p>No students have joined yet. Share your joining password to invite them.</p>
            )}
          </section>
        </>
      )}
      <section className="settings-card settings-danger">
        <span className="eyebrow">COMMUNITY MEMBERSHIP</span>
        <h2>{student ? 'Leave this community' : 'Delete this community'}</h2>
        <p>
          <strong>{profile.schoolCommunityName || profile.schoolName}</strong> ·{' '}
          {profile.schoolName}
        </p>
        <p>
          {student
            ? 'Leaving removes you from this roster and clears its assignments. Your sign-in account and personal study progress are kept. You can join again with a community password.'
            : 'Deleting this study group revokes access for all of its members, clears its assignments, and disables its joining password. Sign-in accounts and personal study progress are kept. This does not delete other study groups at the same school.'}
        </p>
        {!confirming ? (
          <button className="button button-glass" onClick={() => setConfirming(true)}>
            {student ? 'Leave community' : 'Delete community'}
          </button>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void depart();
            }}
          >
            <label htmlFor="confirm-community">
              Type <strong>{expected}</strong> to confirm
            </label>
            <input
              id="confirm-community"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              autoComplete="off"
            />
            <div className="account-actions">
              <button
                className="button button-primary"
                disabled={busy || confirmation !== expected}
              >
                {busy ? 'Updating…' : student ? 'Confirm leave' : 'Permanently close community'}
              </button>
              <button
                type="button"
                className="text-link"
                disabled={busy}
                onClick={() => {
                  setConfirming(false);
                  setConfirmation('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {deleteError && (
          <p role="alert" className="form-error">
            {deleteError}
          </p>
        )}
      </section>
    </main>
  );
}
