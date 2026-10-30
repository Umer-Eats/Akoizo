import { Home } from '@/components/home';
import { pageMetadata, siteUrl, siteDescription } from '@/lib/seo';
export const metadata = pageMetadata('/');
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: `${siteUrl}/`,
                name: 'Akoizo',
                alternateName: ['Akoizo Science Olympiad', 'Akoizo SciOly'],
                description: siteDescription,
                publisher: { '@id': `${siteUrl}/#organization` },
                inLanguage: 'en',
              },
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
                name: 'Akoizo',
                url: `${siteUrl}/`,
                logo: `${siteUrl}/akoizo-logo.svg`,
                description:
                  'Akoizo is a free Science Olympiad study platform for students and schools, built by a high school student.',
                knowsAbout: ['Science Olympiad', 'SciOly', 'STEM education', 'Test preparation'],
              },
            ],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <Home />
    </>
  );
}
