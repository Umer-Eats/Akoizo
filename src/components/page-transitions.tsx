'use client';
import { ViewTransition, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { navKind } from '@/lib/page-transition';
import { useSettings } from './providers';

const settleMs = 1100;

/**
 * Animates every route change. The page is keyed to its path inside a <ViewTransition>,
 * so on navigation React runs a browser view transition where the old page exits and
 * the new one enters as separate layers. transitions.css picks the motion from
 * `html[data-nav]`. The nav bar, Ako and the notes dock carry their own transition
 * names so they stay drawn above the moving page.
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { motion } = useSettings();
  const previous = useRef(pathname);
  const settle = useRef<number>(undefined);

  // Runs inside the view transition's update, before the animations are built.
  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from === pathname) return;
    const root = document.documentElement;
    root.dataset.nav = navKind(from, pathname);
    root.dataset.pageEnter = '';
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      delete root.dataset.nav;
      delete root.dataset.pageEnter;
    }, settleMs);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(settle.current), []);

  return (
    <>
      <NavProgress pathname={pathname} />
      <ViewTransition
        key={pathname}
        enter={motion ? 'page-enter' : 'none'}
        exit={motion ? 'page-exit' : 'none'}
        default="none"
      >
        {children}
      </ViewTransition>
    </>
  );
}

/** A thin accent bar that runs while a clicked link is loading its page. */
function NavProgress({ pathname }: { pathname: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const finish = () => {
    const element = bar.current;
    pending.current = false;
    clearTimers();
    if (!element || element.getAnimations().length === 0) return;
    const from = getComputedStyle(element).transform;
    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate(
      [
        { transform: from === 'none' ? 'scaleX(0)' : from, opacity: 1 },
        { transform: 'scaleX(1)', opacity: 1, offset: 0.45 },
        { transform: 'scaleX(1)', opacity: 0 },
      ],
      { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Capture phase: Next's <Link> cancels the default before a bubbling listener sees it.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const element = bar.current;
      if (!element) return;
      clearTimers();
      pending.current = true;
      // Prefetched pages land almost at once; only show the bar when the wait is noticeable.
      timers.current.push(
        window.setTimeout(() => {
          if (!pending.current) return;
          element.getAnimations().forEach((animation) => animation.cancel());
          element.animate(
            [
              { transform: 'scaleX(0)', opacity: 1 },
              { transform: 'scaleX(0.35)', opacity: 1, offset: 0.08 },
              { transform: 'scaleX(0.9)', opacity: 1 },
            ],
            { duration: 9000, easing: 'cubic-bezier(0.1, 0.7, 0.2, 1)', fill: 'forwards' },
          );
        }, 120),
        // A link whose navigation was cancelled must not leave the bar stuck.
        window.setTimeout(finish, 12000),
      );
    };
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimers();
    };
    // The handlers only touch refs, so the first render's copies stay correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (pending.current) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <div ref={bar} className="nav-progress" aria-hidden="true" />;
}
