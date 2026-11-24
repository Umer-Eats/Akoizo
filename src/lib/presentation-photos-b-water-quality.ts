import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Water Quality (Division B) presentations, served from public/presentations.
// The decks shared with Division C use the Division C figures (wq-*); these are B-only.
export const photos = {
  'b-wq-hydrometer': {
    file: 'b-wq-hydrometer.png',
    width: 500,
    height: 566,
    alt: 'A drawing of a hydrometer floating upright in a cylinder of liquid, with an eye reading the scale level with the liquid surface.',
    caption:
      'A hydrometer floats upright in the liquid; read the scale where it meets the surface, at eye level.',
    credit: 'SG0039',
    source: commons('Taking_Hydrometer_Reading.png'),
  },
} satisfies Record<string, Photo>;
