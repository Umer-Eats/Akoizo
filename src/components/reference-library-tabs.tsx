import Link from 'next/link';

export function ReferenceLibraryTabs({
  current,
}: {
  current: 'binders' | 'courses' | 'cheatsheets';
}) {
  return (
    <nav
      aria-label="Reference libraries"
      className="sheet-actions"
      style={{ marginBottom: 24, flexWrap: 'wrap' }}
    >
      {(['binders', 'courses', 'cheatsheets'] as const).map((kind) => (
        <Link
          key={kind}
          href={`/dashboard/${kind}`}
          aria-current={current === kind ? 'page' : undefined}
          className={`button ${current === kind ? 'button-primary' : 'button-secondary'}`}
        >
          {kind === 'binders' ? 'Binders' : kind === 'courses' ? 'Courses' : 'Cheat sheets'}
        </Link>
      ))}
    </nav>
  );
}
