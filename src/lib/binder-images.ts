// Server only: finds a freely licensed Wikimedia Commons file for a page's photo request.
import type { BinderPhoto } from './binder-types.ts';

const api = 'https://commons.wikimedia.org/w/api.php';
// Licences that allow redistribution in a shared, exported binder with credit.
const reusable = /^(public domain|pd\b|cc0|cc[ -]by(-sa)?[ -]\d)/i;
// Labels in a figure only help if the student can read them: non-Latin titles and files tagged
// with another language sort last.
const foreign =
  /[^\x20-ɏ]|[ _-](heb|deu|ger|fra|esp|rus|de|fr|es|it|ru|nl|pl|he|ar|ja|zh|pt)\.[a-z]+$/i;
const plain = (html: unknown) =>
  String(html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

type CommonsPage = {
  index?: number;
  title?: string;
  imageinfo?: {
    thumburl?: string;
    descriptionurl?: string;
    mime?: string;
    width?: number;
    height?: number;
    extmetadata?: Record<string, { value?: unknown }>;
  }[];
};

// Commons search requires every word to match, so a descriptive phrase often finds nothing.
// Fall back to its leading words, which carry the subject ("oxbow lake", "galena crystal").
export async function findBinderPhoto(
  query: string,
  fetcher: typeof fetch = fetch,
): Promise<BinderPhoto | null> {
  const words = query.split(/\s+/).filter(Boolean);
  const attempts = [words, words.slice(0, 3), words.slice(0, 2)]
    .filter((w, i, all) => w.length && (i === 0 || w.length < all[i - 1].length))
    .map((w) => w.join(' '));
  for (const attempt of attempts) {
    const photo = await searchCommons(attempt, fetcher);
    if (photo) return photo;
  }
  return null;
}
async function searchCommons(query: string, fetcher: typeof fetch): Promise<BinderPhoto | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: '8',
    gsrsearch: `${query} filetype:bitmap|drawing`,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime|size',
    iiurlwidth: '480',
    iiextmetadatafilter: 'LicenseShortName|Artist',
  });
  try {
    const response = await fetcher(`${api}?${params}`, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'AkoizoBinders/1.0 (https://akoizo.com; study binder figures)' },
    });
    if (!response.ok) return null;
    const pages = Object.values<CommonsPage>((await response.json())?.query?.pages ?? {});
    // Search rank alone often leads with a tangential file, so prefer titles that name the subject.
    const stems = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .map((w) => w.slice(0, 5));
    const named = (p: CommonsPage) =>
      stems.filter((stem) => (p.title ?? '').toLowerCase().includes(stem)).length;
    const unreadable = (p: CommonsPage) => (foreign.test(p.title ?? '') ? 1 : 0);
    pages.sort(
      (a, b) =>
        unreadable(a) - unreadable(b) || named(b) - named(a) || (a.index ?? 0) - (b.index ?? 0),
    );
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      const license = plain(info?.extmetadata?.LicenseShortName?.value);
      const src = info?.thumburl ?? '';
      if (!info || !reusable.test(license)) continue;
      if (!/^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(src)) continue;
      if (!/^https:\/\/commons\.wikimedia\.org\//.test(info.descriptionurl ?? '')) continue;
      if (!/^image\/(jpeg|png|svg\+xml)$/.test(info.mime ?? '')) continue;
      // Skip icons and extreme banners that cannot be read in a half-page figure.
      const ratio = (info.width ?? 0) / (info.height || 1);
      if ((info.width ?? 0) < 240 || ratio > 3.2 || ratio < 0.4) continue;
      return {
        src,
        source: info.descriptionurl!,
        title: plain(page.title)
          .replace(/^File:/, '')
          .replace(/\.[a-z]{3,4}$/i, '')
          .slice(0, 110),
        author:
          plain(info.extmetadata?.Artist?.value)
            .replace(/\(?\s*https?:\S+\s*\)?/g, '')
            .trim()
            .slice(0, 80) || 'Wikimedia Commons contributor',
        license: license.slice(0, 30),
      };
    }
  } catch {
    // A missing photo never fails a page; the labeled diagram still stands on its own.
  }
  return null;
}
