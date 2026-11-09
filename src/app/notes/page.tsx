import { NotesPage } from '@/components/notes-page';

export const metadata = { title: 'Notes', robots: { index: false, follow: false } };

export default function Page() {
  return <NotesPage />;
}
