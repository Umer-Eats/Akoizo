import { failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { sheetFigure } from '@/lib/cheatsheet-figures';

// Same-origin copy of one catalog figure so the browser can embed it in a printable sheet.
// Only ids from the reviewed catalog resolve; the address is never taken from the request.
export async function GET(request: Request) {
  try {
    const figure = sheetFigure(new URL(request.url).searchParams.get('id') ?? '');
    if (!figure) throw new AppError(404, 'That figure is not available.');
    const response = await fetch(figure.src, {
      signal: AbortSignal.timeout(15_000),
      headers: { 'User-Agent': 'Akoizo/1.0 (https://akoizo.app; study reference figures)' },
    });
    const type = response.headers.get('content-type')?.split(';')[0] ?? '';
    if (!response.ok || !['image/png', 'image/jpeg', 'image/webp'].includes(type))
      throw new AppError(502, 'That figure could not be loaded.');
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > 6_000_000) throw new AppError(502, 'That figure could not be loaded.');
    return new Response(bytes, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=604800, s-maxage=2592000, immutable',
      },
    });
  } catch (error) {
    return failure(
      error instanceof AppError ? error : new AppError(502, 'That figure could not be loaded.'),
    );
  }
}
