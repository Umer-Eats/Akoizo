import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './theme.css';
import { Providers } from '@/components/providers';
import { Header, Footer } from '@/components/site-shell';
import { AkoCompanion } from '@/components/ako-companion';
import { ArtworkMotion } from '@/components/artwork-motion';
import { siteUrl, siteDescription } from '@/lib/seo';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Akoizo | Free Science Olympiad Study Tools', template: '%s | Akoizo' },
  description: siteDescription,
  applicationName: 'Akoizo',
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: [{ url: '/favicon.svg?v=rat-blue-1', type: 'image/svg+xml', sizes: 'any' }] },
};
const themeScript = `(function(){try{var t=localStorage.getItem('akoizo-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';var m=localStorage.getItem('akoizo-motion');document.documentElement.dataset.motion=m||(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on');}catch(e){document.documentElement.dataset.theme='dark';}})();`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <ArtworkMotion />
          <AkoCompanion />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
