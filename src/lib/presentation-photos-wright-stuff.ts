import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Wright Stuff presentations, served from public/presentations.
export const photos = {
  'ws-f1d': {
    file: 'ws-f1d.jpg',
    width: 500,
    height: 323,
    alt: 'A very light indoor model airplane with a film-covered wing, tail and large two-blade propeller, flying against a dark background.',
    caption:
      'An F1D indoor duration model: big, light film wings, a long motor stick and a large, slow propeller.',
    credit: 'Vogelfrei',
    source: commons('Saalflugf1d.jpg'),
  },
  'ws-wing-profile': {
    file: 'ws-wing-profile.png',
    width: 960,
    height: 407,
    alt: 'A wing cross section labeled with leading edge, trailing edge, chord line, camber line, upper and lower surface, maximum thickness, maximum camber, and the angle of attack to the relative wind.',
    caption:
      'Airfoil terms: the camber line curves above the straight chord line, and the angle of attack is measured from the relative wind.',
    credit: 'Olivier Cleynen',
    source: commons('Wing_profile_nomenclature.svg'),
  },
  'ws-wingtip-vortex': {
    file: 'ws-wingtip-vortex.jpg',
    width: 1200,
    height: 976,
    alt: 'Red smoke curling into a large spiral behind the wingtip of a low-flying crop-duster airplane.',
    caption:
      'Colored smoke reveals a wingtip vortex, the swirl that comes with making lift and causes induced drag.',
    credit: 'NASA Langley Research Center, edited by Fir0002',
    source: commons('Airplane_vortex_edit.jpg'),
  },
  'ws-flight-axes': {
    file: 'ws-flight-axes.png',
    width: 1200,
    height: 900,
    alt: 'A model airplane with three colored arrows showing rotation about its axes: roll along the fuselage, pitch across the wings, and yaw about a vertical axis.',
    caption:
      'The three rotations: pitch (nose up and down), roll (wings tilting), and yaw (nose turning left and right).',
    credit: 'ZeroOne',
    source: commons('Flight_dynamics_with_text.png'),
  },
  'ws-lift-curve': {
    file: 'ws-lift-curve.png',
    width: 960,
    height: 788,
    alt: 'A graph of lift coefficient against angle of attack: a straight rising line that peaks near 1.7 around 15 to 20 degrees, then falls.',
    caption:
      'Lift coefficient rises almost linearly with angle of attack until the stall, where it peaks and then drops.',
    credit: 'botag, vectorized by Mysid',
    source: commons('Lift_curve.svg'),
  },
  'ws-propeller-pitch': {
    file: 'ws-propeller-pitch.png',
    width: 500,
    height: 228,
    alt: 'A blade section’s helical path unrolled into a right triangle with base 2πr (one circumference) and height H (the pitch), and blade angle φ; beside it a cylinder shows the helix.',
    caption:
      'Pitch geometry: unrolled, one revolution is a triangle with base 2πr and height H, the pitch, so the blade angle φ must flatten as r grows.',
    credit: 'Dtom',
    source: commons('Propeller_pitch.gif'),
  },
} satisfies Record<string, Photo>;
