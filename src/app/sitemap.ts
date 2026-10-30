import type { MetadataRoute } from 'next';
import { eventPages, publicPages, siteUrl } from '../lib/seo';
import { donationsOpen } from '../lib/donate';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publicPages
    .filter(({ path }) => donationsOpen || (path !== '/support' && path !== '/donate'))
    .map(({ path }) => path);
  return [...pages, ...eventPages.map(({ path }) => path)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
