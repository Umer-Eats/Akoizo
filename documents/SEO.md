# Search visibility and Google Search Console

The primary domain is `https://akoizo.app`. Public pages have individual titles,
descriptions, canonical URLs, and Open Graph/Twitter metadata. The home page also
provides WebSite and Organization structured data. `/study-tools` is a server-rendered
public guide and event catalog; dashboard lessons still require school membership.

## Sitemap

Next.js generates `https://akoizo.app/sitemap.xml` from the same public-page registry
used for metadata in `src/lib/seo.ts`. It contains only public canonical pages, excluding
login, dashboard, settings, and API routes. It deliberately omits modification dates
because no reliable content-modification timestamps are tracked. `/robots.txt` advertises
the sitemap. Account pages use `noindex` and remain crawlable so search engines can read it.

## Deploy and submit

1. Deploy this build to the production project serving `akoizo.app`.
2. Add `akoizo.app` as a Domain property in Google Search Console and verify using its
   DNS TXT record. Alternatively, verify the URL-prefix property `https://akoizo.app/`
   with the HTML-tag method: set `GOOGLE_SITE_VERIFICATION` on the deployment host to
   the supplied tag's `content` value, then rebuild and redeploy.
3. Open `/sitemap.xml` and `/robots.txt` on production and confirm both return HTTP 200.
4. In Search Console → Sitemaps, submit `https://akoizo.app/sitemap.xml`
   (or enter `sitemap.xml` when the property URL is already shown).
   Google fetches the hosted XML; no local file upload is needed.
5. Use URL Inspection to test the home and study-tools pages and request indexing.
   Check the sitemap processing status and Page indexing report after Google crawls.

Run `node scripts/seo-check.mjs` against a local production server (default port 3002),
or set `TEST_BASE_URL=https://akoizo.app` to verify the deployed site. This checks sitemap
XML, public page status/canonicals/metadata, structured data, crawler access, and account noindex.

Adding a public page requires adding its path, title, and description to `publicPages`
and calling `pageMetadata` in its page module. Keep private and redirect routes out of
the registry. If the primary domain changes, update `siteUrl` and redirect the old domain
at the hosting layer. Configure hosting aliases such as `www` to redirect to the primary
domain rather than serving duplicate copies.

Metadata and a sitemap improve discoverability but do not guarantee indexing or rankings.
Descriptions describe actual page content rather than lists of keywords; Google does not
use the meta keywords tag for ranking.

References: [Google sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[page descriptions](https://developers.google.com/search/docs/appearance/snippet),
[supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags).
