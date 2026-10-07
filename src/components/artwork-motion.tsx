'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const scenes = [
  '.hero-brand',
  '.science-specimen',
  '.lesson-art',
  '.index-stripes',
  '.community-structure',
  '.footer-signoff',
  '.auth-card',
  '.mission-hero',
  '.page-heading',
  '.dashboard-heading',
  '.stat-card',
  '.tools-band',
].join(',');

/** Pause decorative CSS motion outside the viewport and in background tabs. */
export function ArtworkMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.artVisible = String(entry.isIntersecting);
        }
      },
      { rootMargin: '40px' },
    );
    const register = () => {
      for (const element of observed) {
        if (!element.isConnected) {
          observer.unobserve(element);
          observed.delete(element);
        }
      }
      document.querySelectorAll<HTMLElement>(scenes).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        observer.observe(element);
      });
    };
    const updateVisibility = () => {
      document.documentElement.dataset.pageVisible = String(!document.hidden);
    };
    register();
    updateVisibility();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      observed.forEach((element) => delete element.dataset.artVisible);
      delete document.documentElement.dataset.pageVisible;
    };
  }, [pathname]);
  return null;
}
