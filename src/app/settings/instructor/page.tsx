import { AccountGate } from '@/components/account-gate';
import { AccountSettings } from '@/components/account-settings';
export const metadata = { title: 'Settings', robots: { index: false, follow: false } };
export default function SettingsPage() {
  return (
    <AccountGate role="instructor">
      <AccountSettings />
    </AccountGate>
  );
}
