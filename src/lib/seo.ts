import type { Metadata } from 'next';
import { eventsForDivision, type Division, type ScienceEvent } from './events.ts';

// Always use the primary domain, including in preview deployments.
export const siteUrl = 'https://akoizo.app';
export const siteDescription =
  'Free Science Olympiad (SciOly) study resources from Akoizo: event lessons, practice tests, and school study groups for Division A, B, and C students and teams.';

export const publicPages = [
  { path: '/', title: 'Akoizo | Free Science Olympiad Study Tools', description: siteDescription },
  {
    path: '/study-tools',
    title: 'Free Science Olympiad Study Resources: SciOly Lessons & Practice Tests',
    description:
      'Browse free SciOly study guides for every 2027 Science Olympiad event in Division A, B, and C, with lessons, practice tests, rules, and tools for school teams.',
  },
  {
    path: '/mission',
    title: 'Our Mission: Free Science Olympiad Preparation',
    description:
      'Akoizo makes Science Olympiad preparation free for every student. Read the mission and meet Umer Qureshi, the high school student who built it.',
  },
  {
    path: '/support',
    title: 'Support Akoizo: Keep Science Olympiad Study Tools Free',
    description:
      'Akoizo is free for every Science Olympiad student. See what it costs to host the site, write lessons, and compile practice data, and how to help.',
  },
  {
    path: '/donate',
    title: 'Donate to Akoizo’s Free Science Olympiad Study Tools',
    description:
      'Donate with PayPal or a debit or credit card to help keep Akoizo online and free for Science Olympiad students. Donations go directly to the student who runs the site.',
  },
  {
    path: '/contact',
    title: 'Contact Akoizo: Add Your School’s Science Olympiad Team',
    description:
      'Teachers and schools: email Akoizo to add your school and give your Science Olympiad team free lessons, practice tests, and study groups.',
  },
  {
    path: '/rankings',
    title: 'Science Olympiad Study Rankings',
    description:
      'Explore Akoizo’s learner and school study rankings across Science Olympiad divisions. Follow earned points in the Akoizo study community.',
  },
] as const;

export function pageMetadata(path: (typeof publicPages)[number]['path']): Metadata {
  const page = publicPages.find((entry) => entry.path === path)!;
  const title = path === '/' ? page.title : `${page.title} | Akoizo`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: 'website',
      siteName: 'Akoizo',
      locale: 'en_US',
      url: page.path,
      title,
      description: page.description,
    },
    twitter: { card: 'summary', title, description: page.description },
  };
}

export const divisionLevel: Record<Division, string> = {
  A: 'elementary school',
  B: 'middle school',
  C: 'high school',
};

/** Public study-guide pages: one per event in each division. */
export function eventPagePath(division: Division, eventId: string) {
  return `/study-tools/division-${division.toLowerCase()}/${eventId}`;
}

export const eventPages = (['A', 'B', 'C'] as const).flatMap((division) =>
  eventsForDivision(division).map((event) => ({
    division,
    event,
    path: eventPagePath(division, event.id),
  })),
);

export function findEventPage(divisionParam: string, eventId: string) {
  return eventPages.find((page) => page.path === `/study-tools/${divisionParam}/${eventId}`);
}

export function eventPageMetadata(
  division: Division,
  event: ScienceEvent,
  hasLessons: boolean,
): Metadata {
  const path = eventPagePath(division, event.id);
  const title = `${event.name} Science Olympiad Study Guide (Division ${division}) | Akoizo`;
  const description = hasLessons
    ? `Free ${event.name} study guide for Science Olympiad Division ${division} (${divisionLevel[division]}): SciOly lessons, practice tests, key topics, and rules for students and school teams.`
    : `Free ${event.name} Science Olympiad Division ${division} (${divisionLevel[division]}) study resources: event focus, rules, and SciOly study tools for students and school teams.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      siteName: 'Akoizo',
      locale: 'en_US',
      url: path,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}
