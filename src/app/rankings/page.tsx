import { pageMetadata } from '@/lib/seo';
import { Rankings } from '@/components/rankings';
export const metadata = pageMetadata('/rankings');
export default function Page() {
  return <Rankings />;
}
