import type { Metadata } from 'next';
import { Rankings } from '@/components/rankings';
export const metadata: Metadata = { title: 'Global Rankings' };
export default function Page() {
  return <Rankings />;
}
