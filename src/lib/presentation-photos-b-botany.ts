import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Botany (Division B) presentations, served from public/presentations.
export const photos = {
  'b-bot-photosynthesis': {
    file: 'b-bot-photosynthesis.png',
    width: 1200,
    height: 1200,
    alt: 'Sunlight shining on a green box labeled light reactions, with H₂O going in and O₂ coming out; ATP and NADPH arrows lead to a Calvin cycle loop that takes in CO₂ and gives off sugar.',
    caption:
      'Photosynthesis in two linked stages: the light reactions split water and release oxygen, and the Calvin cycle uses their energy to turn CO₂ into sugar.',
    credit: 'Daniel Mayer (mav), vector version by Yerpo',
    source: commons('Simple_photosynthesis_overview.svg'),
  },
} satisfies Record<string, Photo>;
