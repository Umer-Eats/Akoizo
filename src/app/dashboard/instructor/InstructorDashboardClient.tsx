'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-context';
import { InstructorDashboard as PreviewInstructorDashboard } from '@/components/dashboard';

export function InstructorDashboardClient() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'instructor') {
        router.push('/login/instructor');
      }
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <main id="main" className="page-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!user || role !== 'instructor') {
    return null;
  }

  return <PreviewInstructorDashboard />;
}