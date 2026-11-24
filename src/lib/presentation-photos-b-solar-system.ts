import { nasa, type Photo } from './presentation-photo-source.ts';

// Figures for the Solar System (Division B) presentations, served from public/presentations.
export const photos = {
  'b-sol-kepler22-hz': {
    file: 'b-sol-kepler22-hz.jpg',
    width: 1200,
    height: 960,
    alt: 'Diagram comparing the Kepler-22 system with the inner solar system, each with a green habitable-zone band around its star.',
    caption:
      'The green bands mark each star’s habitable zone. Kepler-22 is a little cooler than the Sun, so its zone sits slightly closer in.',
    credit: 'NASA/JPL-Caltech/Ames',
    source: nasa('PIA14882'),
  },
  'b-sol-enceladus-plume': {
    file: 'b-sol-enceladus-plume.jpg',
    width: 1008,
    height: 1008,
    alt: 'Enceladus seen as a small dark disk with a bright fan of icy material spraying from its south pole, against a hazy grey background.',
    caption:
      'Lit from behind by the Sun, the plume of Enceladus glows as it sprays water vapor and ice grains into Saturn’s E ring.',
    credit: 'NASA/JPL/Space Science Institute',
    source: nasa('PIA08921'),
  },
  'b-sol-enceladus-stripes': {
    file: 'b-sol-enceladus-stripes.jpg',
    width: 887,
    height: 619,
    alt: 'Grey close-up of Enceladus’s icy surface crossed by long parallel ridges and grooves.',
    caption:
      'The “tiger stripes” near Enceladus’s south pole: long warm cracks that are the sources of its jets.',
    credit: 'NASA/JPL/Space Science Institute/USRA/LPI',
    source: nasa('PIA10352'),
  },
  'b-sol-venus-radar': {
    file: 'b-sol-venus-radar.jpg',
    width: 1200,
    height: 1200,
    alt: 'A grey globe of Venus with a latitude-longitude grid, showing bright rough highlands and darker smooth plains.',
    caption:
      'Venus’s surface mapped by Magellan’s radar, which sees through the thick clouds. Bright areas are rough; darker areas are smoother.',
    credit: 'NASA/JPL',
    source: nasa('PIA00478'),
  },
  'b-sol-valleys': {
    file: 'b-sol-valleys.jpg',
    width: 1223,
    height: 512,
    alt: 'Grey orbital image of cratered Martian ground cut by long branching valleys.',
    caption:
      'Branching valley networks cut into Mars’s ancient cratered highlands, a sign that liquid water once flowed across the surface.',
    credit: 'NASA/JPL/Malin Space Science Systems',
    source: nasa('PIA01499'),
  },
  'b-sol-europa': {
    file: 'b-sol-europa.jpg',
    width: 1200,
    height: 887,
    alt: 'Europa’s pale icy surface crossed by many reddish-brown cracks and ridges.',
    caption:
      'Europa from the Galileo spacecraft: a young icy shell crisscrossed by reddish cracks and ridges, above a hidden salty ocean.',
    credit: 'NASA/JPL-Caltech/SETI Institute',
    source: nasa('PIA19048'),
  },
  'b-sol-ganymede': {
    file: 'b-sol-ganymede.jpg',
    width: 800,
    height: 800,
    alt: 'Grey globe of Ganymede with large dark regions and lighter grooved bands between them.',
    caption:
      'Ganymede, the largest moon in the solar system: dark, ancient cratered regions divided by lighter, grooved terrain.',
    credit: 'NASA/JPL',
    source: nasa('PIA00706'),
  },
  'b-sol-titan': {
    file: 'b-sol-titan.jpg',
    width: 993,
    height: 1017,
    alt: 'Titan as a smooth orange-brown ball in front of Saturn’s pale disk and edge-on rings.',
    caption:
      'Titan in true color from Cassini. Its thick nitrogen atmosphere and orange organic haze hide the surface from ordinary cameras.',
    credit: 'NASA/JPL-Caltech/Space Science Institute',
    source: nasa('PIA14909'),
  },
  'b-sol-titan-lakes': {
    file: 'b-sol-titan-lakes.jpg',
    width: 1200,
    height: 788,
    alt: 'Grey mosaic of Titan’s north polar region with large dark patches of liquid seas and many small dark lakes.',
    caption:
      'Titan’s northern seas and lakes, including Kraken Mare and Ligeia Mare. The dark areas are liquid methane and ethane.',
    credit: 'NASA/JPL-Caltech/Space Science Institute',
    source: nasa('PIA21434'),
  },
  'b-sol-67p': {
    file: 'b-sol-67p.jpg',
    width: 1200,
    height: 1200,
    alt: 'Close view of comet 67P’s rugged grey nucleus, with two lobes joined by a narrow neck.',
    caption:
      'Comet 67P/Churyumov–Gerasimenko from Rosetta: two lobes joined by a neck, with cliffs, pits and boulders.',
    credit: 'ESA/Rosetta/MPS for OSIRIS Team',
    source: nasa('PIA21068'),
  },
  'b-sol-bennu-sample': {
    file: 'b-sol-bennu-sample.jpg',
    width: 1200,
    height: 1175,
    alt: 'A small glass vial holding dark powdery rock from asteroid Bennu, with tweezers beside it.',
    caption:
      'Part of the asteroid Bennu sample returned by OSIRIS-REx in 2023: dark, carbon-rich dust and pebbles.',
    credit: 'NASA/Goddard',
    source: nasa('Bennu_Sample2'),
  },
  'b-sol-tardigrade': {
    file: 'b-sol-tardigrade.jpg',
    width: 1100,
    height: 578,
    alt: 'Light micrograph of a brown, plump, eight-legged tardigrade with claws on its legs.',
    caption:
      'A tardigrade (“water bear”) under a microscope. These tiny animals survive drying, freezing, radiation and even vacuum.',
    credit: 'NASA',
    source: nasa('jsc2021e019949'),
  },
  'b-sol-trappist-hz': {
    file: 'b-sol-trappist-hz.jpg',
    width: 1200,
    height: 674,
    alt: 'Illustration comparing the seven TRAPPIST-1 planets and their habitable zone with the inner solar system, enlarged 25 times.',
    caption:
      'The whole TRAPPIST-1 system would fit inside Mercury’s orbit. Planets e, f and g lie in the green habitable zone.',
    credit: 'NASA/JPL-Caltech',
    source: nasa('PIA21424'),
  },
} satisfies Record<string, Photo>;
