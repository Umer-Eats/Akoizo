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
      'Donate with Zelle to help keep Akoizo online and free for Science Olympiad students. Donations go directly to the student who runs the site.',
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
