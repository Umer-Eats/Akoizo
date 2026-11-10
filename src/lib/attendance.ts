export const ATTENDANCE_RADIUS_METERS = 804.672;
export type Workshop = {
  id: string;
  title: string;
  opensAt: string;
  closesAt: string;
  timezone: string;
  locationName: string;
  latitude: number;
  longitude: number;
  cancelled: boolean;
  code?: string;
  audienceIds?: string[];
  expected: number;
  present: number;
  checkedInAt: string | null;
};
export type AttendanceMember = {
  id: string;
  name: string;
  role: string;
  online: boolean;
  attended: number;
  expected: number;
  rate: number | null;
};
export type AttendanceData = {
  workshops: Workshop[];
  members: AttendanceMember[];
  records: { workshopId: string; studentId: string; checkedInAt: string }[];
  serverTime: string;
};
export function workshopStatus(
  w: Pick<Workshop, 'cancelled' | 'opensAt' | 'closesAt'>,
  now = Date.now(),
) {
  return w.cancelled
    ? 'Cancelled'
    : now < Date.parse(w.opensAt)
      ? 'Upcoming'
      : now >= Date.parse(w.closesAt)
        ? 'Closed'
        : 'Open';
}
export function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const rad = (n: number) => (n * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371008.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}
