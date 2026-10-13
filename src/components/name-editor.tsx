'use client';
import { useState } from 'react';
import { useAuth, authMessage } from './auth-context';
import type { Profile } from '@/lib/domain';

export function NameEditor({
  member,
  own = false,
  onSaved,
}: {
  member: Profile;
  own?: boolean;
  onSaved?: () => void | Promise<void>;
}) {
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
          await onSaved?.();
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
