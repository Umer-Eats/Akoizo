'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-context';
import { StudentDashboard as PreviewStudentDashboard } from '@/components/dashboard';

export function StudentDashboardClient() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'student') {
        router.push('/login/student');
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

  if (!user || role !== 'student') {
    return null;
  }

  return <PreviewStudentDashboard />;
}