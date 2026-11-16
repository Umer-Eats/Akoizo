export const ATTENDANCE_RADIUS_METERS = 804.672;
// Chromebooks and laptops have no GPS. They locate by Wi-Fi or, on managed school devices with
// Google location accuracy off, by IP address, which can be several miles off and is often worse
// than the device reports. We only need approximate presence (the event code proves the rest):
// a fix counts when it is within the radius plus twice its reported uncertainty, capped here
// (25 km, about 15.5 miles). GPS fixes report small uncertainty, so phones still need to be close.
export const ATTENDANCE_ACCURACY_ALLOWANCE_METERS = 25000;
// Fixes rougher than this are network/IP based; the client then also tries GPS once.
export const ATTENDANCE_ROUGH_FIX_METERS = 1609.344;
// Maximum age of a location fix, measured on the student's device so clock skew does not matter.
export const ATTENDANCE_LOCATION_MAX_AGE_MS = 120000;
export function withinAttendanceRange(distance: number, accuracy: number) {
  return (
    distance <=
    ATTENDANCE_RADIUS_METERS +
      Math.min(Math.max(accuracy, 0) * 2, ATTENDANCE_ACCURACY_ALLOWANCE_METERS)
  );
}
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
  records: { workshopId: string; studentId: string; checkedInAt: string; markedByTeacher: boolean }[];
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
