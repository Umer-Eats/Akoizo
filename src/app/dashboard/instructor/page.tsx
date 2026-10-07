import { AccountGate } from '@/components/account-gate';
import { InstructorDashboard } from '@/components/dashboard';
export const metadata = { title: 'Instructor dashboard', robots: { index: false, follow: false } };
export default function InstructorDashboardPage() {
  return (
    <AccountGate role="instructor">
      <InstructorDashboard />
    </AccountGate>
  );
}
