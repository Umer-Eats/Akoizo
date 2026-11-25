import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Scrambler (Division B) presentations, served from public/presentations.
export const photos = {
  'b-scram-egg-cracked': {
    file: 'b-scram-egg-cracked.jpg',
    width: 1200,
    height: 768,
    alt: 'A raw chicken egg broken open on a dark surface, with the yolk and white beside two pieces of cracked shell.',
    caption: 'A raw egg’s thin shell cracks easily, so a hard stop can end the run.',
    credit: 'Sauvagette',
    source: commons('Chicken raw egg with broken shell.jpg'),
  },
} satisfies Record<string, Photo>;
