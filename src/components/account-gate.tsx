'use client';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, authMessage } from './auth-context';
import type { Role } from '@/lib/domain';
import { TeacherStudy } from './study-mode';
/**
 * Signed-in pages for one role. `learner` pages are student tools: students use them, and
 * instructors open them too, seeing them as a student of the division they choose.
 */
export function AccountGate({ role, children }: { role: Role | 'learner'; children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const login = role === 'learner' ? 'student' : role;
  const allowed = (member: Role) => role === 'learner' || member === role;
  useEffect(() => {
    if (auth.loading || auth.sessionError) return;
    if (!auth.user || !auth.profile) router.replace(`/login/${login}`);
    else if (!allowed(auth.profile.role)) router.replace(`/dashboard/${auth.profile.role}`);
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
                .then(() => router.replace(`/login/${login}`))
                .catch((error) => window.alert(authMessage(error)))
            }
          >
            Return to login
          </button>
        </div>
      </main>
    );
  if (auth.loading || !auth.profile || !allowed(auth.profile.role))
    return (
      <main id="main" className="page-container">
        <p className="loading-state" role="status">
          Opening your study space…
        </p>
      </main>
    );
  if (role === 'learner' && auth.profile.role === 'instructor')
    return <TeacherStudy>{children}</TeacherStudy>;
  return children;
}
