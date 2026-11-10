import { memberFor, json, failure } from '@/lib/api';
import { AppError } from '@/lib/domain';
import { attendanceLimit } from '@/lib/attendance-service';
export async function GET(request: Request) {
  try {
    const { db, profile } = await memberFor(request, 'instructor');
    const q = new URL(request.url).searchParams.get('q')?.trim();
    if (!q || q.length < 3 || q.length > 200)
      throw new AppError(400, 'Enter an address between 3 and 200 characters.');
    const key = process.env.GEOAPIFY_API_KEY;
    if (!key)
      throw new AppError(
        503,
        'Address search needs a Geoapify API key. You can still select a point on the map or use your current location.',
      );
    await attendanceLimit(db, `geocode:${profile.id}`, 20, 60);
    const url = new URL('https://api.geoapify.com/v1/geocode/search');
    url.search = new URLSearchParams({
      text: q,
      format: 'json',
      limit: '5',
      apiKey: key,
    }).toString();
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok)
      throw new AppError(503, 'Address search is unavailable. Please select a point on the map.');
    const data = await response.json();
    return json({
      results: (data.results ?? []).map((r: { formatted: string; lat: number; lon: number }) => ({
        name: r.formatted,
        latitude: r.lat,
        longitude: r.lon,
      })),
    });
  } catch (error) {
    return failure(error);
  }
}
