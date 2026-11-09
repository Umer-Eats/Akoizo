'use client';
import { AccountGate } from './account-gate';
import { useAuth } from './auth-context';
import { NotesApp } from './notes-app';
import './notes.css';

// Notes are for every signed-in member, students and instructors alike.
export function NotesPage() {
  const { profile } = useAuth();
  return (
    <AccountGate role={profile?.role ?? 'student'}>
      <NotesApp />
    </AccountGate>
  );
}
