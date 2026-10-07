import { AccountGate } from '@/components/account-gate';
import { StudentDashboard } from '@/components/dashboard';
export const metadata = { title: 'Student dashboard', robots: { index: false, follow: false } };
export default function StudentDashboardPage() {
  return (
    <AccountGate role="student">
      <StudentDashboard />
    </AccountGate>
  );
}
