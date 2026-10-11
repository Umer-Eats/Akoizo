import type { Metadata } from 'next';

// Always use the primary domain, including in preview deployments.
export const siteUrl = 'https://akoizo.app';
export const siteDescription =
  'Free Science Olympiad study tools from Akoizo: event lessons, practice tests, and school study groups for Division A, B, and C preparation.';

export const publicPages = [
  { path: '/', title: 'Akoizo | Free Science Olympiad Study Tools', description: siteDescription },
  {
    path: '/study-tools',
    title: 'Science Olympiad Study Tools, Lessons & Practice Tests',
    description:
      'Explore Akoizo’s free Science Olympiad study tools, event lessons, practice tests, and 2027 Division A, B, and C event catalog.',
  },
  {
    path: '/mission',
    title: 'Our Mission: Free Science Olympiad Preparation',
    description:
      'Akoizo makes Science Olympiad preparation accessible with free study tools, lessons, practice, and school communities for curious students.',
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
