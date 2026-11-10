'use client';
import { useEffect } from 'react';
import { useAuth } from './auth-context';

/** A visible, recently active app tab is online. Never requests a member's location. */
export function MemberPresence() {
  const { profile, request } = useAuth();
  useEffect(() => {
    if (!profile) return;
    let pending = false;
    const heartbeat = async () => {
      if (document.visibilityState !== 'visible' || pending) return;
      pending = true;
      try {
        await request('/api/presence', { method: 'POST' });
      } catch {
        /* Presence is best effort. */
      } finally {
        pending = false;
      }
    };
    void heartbeat();
    const timer = window.setInterval(heartbeat, 30000);
    document.addEventListener('visibilitychange', heartbeat);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', heartbeat);
    };
  }, [profile, request]);
  return null;
}
