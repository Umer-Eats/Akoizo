'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSettings } from './providers';
import { useAuth, authMessage } from './auth-context';
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { toggleTheme } = useSettings();
  const { profile, logOut } = useAuth();
  const [error, setError] = useState('');
  const logout = () => logOut().catch((error) => setError(authMessage(error)));
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Akoizo home">
          <span className="brand-mark" aria-hidden="true" />
          <span>akoizo</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className={path === '/rankings' ? 'active' : ''} href="/rankings">
            Global Rankings
          </Link>
          <Link className={path === '/mission' ? 'active' : ''} href="/mission">
            Mission
          </Link>
        </nav>
        <div className="header-right">
          {profile ? (
            <>
              <Link className="login-link" href={`/dashboard/${profile.role}`}>
                My dashboard
              </Link>
              <button className="button button-small button-glass instructor-link" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="login-link" href="/login/student">
                Student login
              </Link>
              <Link
                className="button button-small button-glass instructor-link"
                href="/login/instructor"
              >
                Instructor login
              </Link>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Switch color theme">
            <Sun className="sun-icon" size={17} />
            <Moon className="moon-icon" size={17} />
            <span className="theme-day">Day mode</span>
            <span className="theme-night">Night mode</span>
          </button>
          <button
            className="menu-toggle icon-button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/rankings">Global Rankings</Link>
            <Link href="/mission">Mission</Link>
            {profile ? (
              <>
                <Link href={`/dashboard/${profile.role}`}>My dashboard</Link>
                <button className="text-link" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login/student">Student login</Link>
                <Link href="/login/instructor">Instructor login</Link>
              </>
            )}
          </nav>
        )}
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </header>
  );
}
export function Footer() {
  const { motion, toggleMotion } = useSettings();
  return (
    <footer className="site-footer">
      <div className="footer-signoff" aria-hidden="true">
        <span>STAY CURIOUS.</span>
        <span className="pixel-cluster" />
      </div>
      <div className="footer-top">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>akoizo</span>
        </Link>
        <p>Free to learn. Room to grow.</p>
        <div>
          <Link href="/mission">Our mission</Link>
          <Link href="/rankings">Rankings</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Akoizo · An independent learning project.</span>
        <span>Not affiliated with Science Olympiad, Inc.</span>
        <button onClick={toggleMotion} className="motion-button">
          {motion ? <Pause size={12} /> : <Play size={12} />} Motion {motion ? 'on' : 'off'}
        </button>
      </div>
    </footer>
  );
}
