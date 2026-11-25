import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Ping Pong Parachute (Division B) presentations, served from public/presentations.
export const photos = {
  'b-ppp-canopy': {
    file: 'b-ppp-canopy.jpg',
    width: 1200,
    height: 801,
    alt: 'A green round parachute fully inflated into a dome, with many suspension lines running down to a parachutist against a cloudy sky.',
    caption: 'A round parachute inflated into a full dome, hanging from long suspension lines.',
    credit: 'U.S. Army photo by Sgt. Austin Robertson',
    source: commons(
      'Operation Market Garden 80th Anniversary- Round Canopy Parachuting Team Jump (8644200).jpg',
    ),
  },
} satisfies Record<string, Photo>;
