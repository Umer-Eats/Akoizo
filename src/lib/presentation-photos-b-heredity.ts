import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Heredity (Division B) presentations, served from public/presentations. The
// decks also reuse the Designer Genes figures (gene-*) registered in presentation-photos-designer-genes.ts.
export const photos = {
  'b-her-snapdragon': {
    file: 'b-her-snapdragon.jpg',
    width: 1200,
    height: 558,
    alt: 'Snapdragon crosses: a red and a white parent give four pink offspring; two pink plants give one red, two pink and one white offspring.',
    caption:
      'Red × white snapdragons give all pink offspring; pink × pink gives 1 red : 2 pink : 1 white.',
    credit: 'Jacek Halicki, I am Jim, Crochet.david and Sciencia58',
    source: commons('Incomplete_dominance_-_Antirrhinum_majus.png'),
  },
  'b-her-dna': {
    file: 'b-her-dna.png',
    width: 1200,
    height: 1191,
    alt: 'A ball-and-stick model of the DNA double helix with its grooves, and close-ups of a T–A pair and a C–G pair joined by dashed hydrogen bonds.',
    caption:
      'The double helix: T pairs with A by two hydrogen bonds and C pairs with G by three; each pair joins a pyrimidine to a purine.',
    credit: 'Zephyris',
    source: commons('DNA_Structure+Key+Labelled.pn_NoBB.png'),
  },
} satisfies Record<string, Photo>;
