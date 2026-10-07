import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './theme.css';
import { Providers } from '@/components/providers';
import { Header, Footer } from '@/components/site-shell';
import { AkoCompanion } from '@/components/ako-companion';
import { ArtworkMotion } from '@/components/artwork-motion';
export const metadata: Metadata = {
  title: { default: 'Akoizo — Stay curious. Go further.', template: '%s · Akoizo' },
  description:
    'A free study space for your Science Olympiad journey. Learn, practice, and grow with your community.',
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
      </body>
    </html>
  );
}
