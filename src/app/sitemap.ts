import type { MetadataRoute } from 'next';
import { publicPages, siteUrl } from '../lib/seo';
import { donationsOpen } from '../lib/donate';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages
    .filter(({ path }) => donationsOpen || (path !== '/support' && path !== '/donate'))
    .map(({ path }) => ({ url: new URL(path, siteUrl).href }));
}
