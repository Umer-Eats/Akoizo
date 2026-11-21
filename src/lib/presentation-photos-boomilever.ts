import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Boomilever presentations, served from public/presentations.
export const photos = {
  'boom-balsa-bridge': {
    file: 'boom-balsa-bridge.jpg',
    width: 1200,
    height: 397,
    alt: 'A long, arched balsa wood model bridge made of many thin triangulated sticks.',
    caption:
      'A balsa model bridge: thin sticks, glued joints, and triangles, the same toolkit as a Boomilever.',
    credit: 'BrickArt!san',
    source: commons('Balsa_wood_model_Bridge.jpg'),
  },
  'boom-cantilever': {
    file: 'boom-cantilever.png',
    width: 960,
    height: 541,
    alt: 'Diagram of a cantilever bridge: two orange truss arms, each anchored on one bank, reaching out over a river toward each other.',
    caption:
      'A cantilever bridge: each truss arm is anchored on its bank and reaches out over the river.',
    credit: 'Noleander',
    source: commons('Cantilever_bridge.svg'),
  },
  'boom-forth': {
    file: 'boom-forth.jpg',
    width: 1200,
    height: 646,
    alt: 'A nineteenth-century photograph of the Forth Bridge in Scotland, with its three huge steel cantilever towers.',
    caption:
      'The Forth Bridge in Scotland, opened in 1890, is built from three giant steel cantilevers.',
    credit: 'Internet Archive Book Images',
    source: commons(
      'Triumphs_and_wonders_of_the_19th_century,_the_true_mirror_of_a_phenomenal_era,_a_volume_of_original,_entertaining_and_instructive_historic_and_descriptive_writings,_showing_the_many_and_marvellous_(14803464853).jpg',
    ),
  },
  'boom-buckle-photo': {
    file: 'boom-buckle-photo.jpg',
    width: 1200,
    height: 803,
    alt: 'A hand-drawn sketch of a column pressed at both ends by a force Pc, bowed sideways into a curve.',
    caption: 'A column squeezed at its ends by the critical force bows sideways: it buckles.',
    credit: 'Gcd822',
    source: commons('Beam_column_buckle1.jpg'),
  },
  'boom-buckling-modes': {
    file: 'boom-buckling-modes.png',
    width: 960,
    height: 800,
    alt: 'Six columns with different end supports, each drawn with its dashed buckled shape and labeled with its critical load.',
    caption:
      'Buckled shapes of columns with different end supports, each labeled with its critical load.',
    credit: 'Johannes Kalliauer',
    source: commons('ForceBucklingModeMatlab_EulerModes_1-6.svg'),
  },
  'boom-balsa-tree': {
    file: 'boom-balsa-tree.png',
    width: 500,
    height: 661,
    alt: 'A botanical watercolor of a balsa tree branch with a large cream flower, purple bracts, and broad green leaves.',
    caption: 'Balsa (Ochroma pyramidale), a fast-growing tropical tree whose wood is very light.',
    credit: 'Frances W. Horne, Flora Borinqueña',
    source: commons('Ochroma_pyramidale1FrancesWHorne.jpg'),
  },
  'boom-balsa-sticks': {
    file: 'boom-balsa-sticks.jpg',
    width: 960,
    height: 720,
    alt: 'Two thin strips of balsa wood laid across a steel ruler on a blue background.',
    caption: 'Thin balsa strips beside a ruler.',
    credit: 'Bill Abbott',
    source: commons('1_16"_and_1_8"_balsa_stock_for_Kid_Flier_6_1_2s..._(5702861070).jpg'),
  },
  'boom-level': {
    file: 'boom-level.jpg',
    width: 1200,
    height: 675,
    alt: 'A small clear bubble level with a green vial mounted on top of a camera.',
    caption: 'A bubble level: the bubble centers when the surface is level.',
    credit: 'Ka23 13',
    source: commons('Spirit_level_20200524.jpg'),
  },
  'boom-truss-bridge': {
    file: 'boom-truss-bridge.jpg',
    width: 500,
    height: 375,
    alt: 'Two smiling students holding a balsa truss bridge with triangular towers and cross bracing.',
    caption: 'Students with their balsa truss bridge, braced with triangles.',
    credit: 'Benwildeboer',
    source: commons('Balsa_Bridge2.JPG'),
  },
  'boom-gusset': {
    file: 'boom-gusset.jpg',
    width: 1200,
    height: 800,
    alt: 'Close-up of a steel bridge where crossing members are joined by large riveted gusset plates.',
    caption: 'Riveted gusset plates join crossing members on a steel bridge.',
    credit: 'Chris Light',
    source: commons('Gusset_plate_8132.jpg'),
  },
  'boom-quebec': {
    file: 'boom-quebec.jpg',
    width: 500,
    height: 357,
    alt: 'Black-and-white photograph of the Quebec Bridge after its 1907 collapse, with wreckage between the standing ends over the river.',
    caption:
      'The Quebec Bridge after its 1907 collapse, caused by a buckled lower compression chord.',
    credit: 'Historical archive',
    source: commons('Quebec_Bridge_Collapse.jpg'),
  },
} satisfies Record<string, Photo>;
