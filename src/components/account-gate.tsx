'use client';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, authMessage } from './auth-context';
import type { Role } from '@/lib/domain';
export function AccountGate({ role, children }: { role: Role; children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.loading || auth.sessionError) return;
    if (!auth.user || !auth.profile) router.replace(`/login/${role}`);
    else if (auth.profile.role !== role) router.replace(`/dashboard/${auth.profile.role}`);
  }, [auth.loading, auth.sessionError, auth.user, auth.profile, role, router]);
  if (auth.sessionError)
    return (
      <main id="main" className="page-container">
        <div className="empty-state">
          <h1>Let’s reconnect.</h1>
          <p role="alert">{auth.sessionError}</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>
            Try again
          </button>
          <button
            className="text-link"
            onClick={() =>
              auth
                .logOut()
                .then(() => router.replace(`/login/${role}`))
                .catch((error) => window.alert(authMessage(error)))
            }
          >
            Return to login
          </button>
        </div>
      </main>
    );
  if (auth.loading || !auth.profile || auth.profile.role !== role)
    return (
      <main id="main" className="page-container">
        <p className="loading-state" role="status">
          Opening your study space…
        </p>
      </main>
    );
  return children;
}
