import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>Out of orbit.</h1>
      <p>That page or event isn’t in this study space.</p>
      <Link className="button button-primary" href="/">
        Find your way home
      </Link>
    </main>
  );
}
