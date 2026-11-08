'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react';
import { useSettings } from './providers';
import { useAuth, authMessage } from './auth-context';
import { donationsOpen } from '@/lib/donate';

// Public pages that use the landing design. Signed-in feature pages keep the app shell.
const landingPaths = ['/', '/study-tools', '/mission', '/contact', '/support', '/donate'];
export const isLandingPath = (path: string) => landingPaths.includes(path);

const links = [
  { href: '/study-tools', label: 'Study tools' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/mission', label: 'Mission' },
  ...(donationsOpen ? [{ href: '/support', label: 'Donate' }] : []),
  { href: '/contact', label: 'Contact' },
];

export function LandingNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { toggleTheme } = useSettings();
  const { profile, logOut } = useAuth();
  const logout = () => logOut().catch((e) => setError(authMessage(e)));
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);
  const current = (href: string) =>
    path === href || (href === '/support' && path === '/donate') ? 'page' : undefined;
  return (
    <header className="lx-nav">
      <div className="lx-nav-bar">
        <Link href="/" className="lx-brand" aria-label="Akoizo home">
          <span className="lx-brand-mark" aria-hidden="true" />
          akoizo
        </Link>
        <nav className="lx-nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={current(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="lx-nav-right">
          {profile ? (
            <>
              <Link className="lx-nav-text lx-nav-hide lx-nav-extra" href="/community">
                Community
              </Link>
              <button className="lx-nav-text lx-nav-hide" onClick={logout}>
                Sign out
              </button>
              <Link className="lx-btn lx-btn-primary lx-nav-hide" href={`/dashboard/${profile.role}`}>
                My dashboard
              </Link>
            </>
          ) : (
            <>
              <Link className="lx-nav-text lx-nav-hide lx-nav-extra" href="/login/instructor">
                Instructors
              </Link>
              <Link className="lx-btn lx-btn-primary lx-nav-hide" href="/login/student">
                Student login
              </Link>
            </>
          )}
          <button className="lx-icon-btn lx-theme" onClick={toggleTheme} aria-label="Switch color theme">
            <Sun className="lx-sun" size={18} />
            <Moon className="lx-moon" size={18} />
          </button>
          <button
            className="lx-icon-btn lx-menu-btn"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="lx-drawer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="lx-drawer" className="lx-drawer" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={current(link.href)}>
              {link.label} <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
          {profile && (
            <>
              <Link href="/community">
                Community <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href={`/settings/${profile.role}`}>
                Settings <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/dashboard/binders">
                Binders <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </>
          )}
          <div className="lx-drawer-actions">
            {profile ? (
              <>
                <Link className="lx-btn lx-btn-primary" href={`/dashboard/${profile.role}`}>
                  My dashboard
                </Link>
                <button className="lx-btn lx-btn-line" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link className="lx-btn lx-btn-primary" href="/login/student">
                  Student login
                </Link>
                <Link className="lx-btn lx-btn-line" href="/login/instructor">
                  Instructor login
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
      {error && (
        <p className="form-error lx-nav-error" role="alert">
          {error}
        </p>
      )}
    </header>
  );
}

const index = [
  { href: '/study-tools', label: 'Study tools and event guides' },
  { href: '/rankings', label: 'Global rankings' },
  { href: '/mission', label: 'Our mission' },
  { href: '/mission#who-we-are', label: 'Who made Akoizo' },
  { href: '/contact', label: 'Add your school' },
  ...(donationsOpen ? [{ href: '/support', label: 'Support Akoizo' }] : []),
  { href: '/login/student', label: 'Student login' },
  { href: '/login/instructor', label: 'Instructor login' },
];

export function LandingFooter() {
  const { motion, toggleMotion } = useSettings();
  return (
    <footer className="lx-footer">
      <div className="lx-footer-inner">
        <div className="lx-footer-top">
          <div>
            <Link className="lx-brand" href="/">
              <span className="lx-brand-mark" aria-hidden="true" />
              akoizo
            </Link>
            <p>Free Science Olympiad study tools. Free to learn, room to grow.</p>
          </div>
          <nav aria-label="Site index">
            <p className="lx-mono">Index</p>
            <ul className="lx-index">
              {index.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    {item.label}
                    <b>{String(i + 1).padStart(2, '0')}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="lx-footer-legal">
          <span>© {new Date().getFullYear()} Akoizo · An independent learning project.</span>
          <span>Not affiliated with Science Olympiad, Inc.</span>
          <button className="lx-nav-text" onClick={toggleMotion}>
            {motion ? <Pause size={13} /> : <Play size={13} />} Motion {motion ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </footer>
  );
}
