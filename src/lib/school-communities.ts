import { schoolCommunities } from './community-directory.ts';
export { schoolCommunities };

export type SchoolCommunityId = (typeof schoolCommunities)[number]['id'];
export function getSchoolCommunity(id: unknown) {
  return schoolCommunities.find((community) => community.id === id);
}
