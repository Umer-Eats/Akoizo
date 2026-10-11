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
                description: siteDescription,
                inLanguage: 'en',
              },
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
                name: 'Akoizo',
                url: `${siteUrl}/`,
                logo: `${siteUrl}/akoizo-logo.svg`,
              },
            ],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <Home />
    </>
  );
}
