// Pembroke Pines Charter campus directory, reviewed October 6, 2026:
// https://www.pinescharter.net/2308/Contact-Us
// Campus names come first for middle schools so they remain distinct on small screens.
export const schoolCommunities = [
  { id: 'ppchs', name: 'Pembroke Pines Charter High School' },
  { id: 'ppcms-central', name: 'Central Campus Pembroke Pines Charter Middle School' },
  { id: 'ppcms-west', name: 'West Campus Pembroke Pines Charter Middle School' },
  { id: 'ppcms-academic-village', name: 'Academic Village Pembroke Pines Charter Middle School' },
] as const;

export type SchoolCommunityId = (typeof schoolCommunities)[number]['id'];
export function getSchoolCommunity(id: unknown) {
  return schoolCommunities.find((community) => community.id === id);
}
