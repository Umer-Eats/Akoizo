import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Ping Pong Parachute presentations, served from public/presentations.
export const photos = {
  'ppp-bottle-rocket': {
    file: 'ppp-bottle-rocket.jpg',
    width: 960,
    height: 1280,
    alt: 'A plastic soda-bottle rocket with taped-on paper fins and a cone nose, standing upside down on a launch tube connected to a pump hose, with students in the background.',
    caption:
      'A bottle rocket on its launcher: the bottle neck points down onto the launch tube, with fins taped on and a nose on top.',
    credit: 'brittgow',
    source: commons('Bottle_rocket_experiment_(4781946921).jpg'),
  },
  'ppp-ball': {
    file: 'ppp-ball.jpg',
    width: 960,
    height: 640,
    alt: 'A single white 40 mm plastic table tennis ball on a black background.',
    caption:
      'A standard 40 mm ping pong ball, about 2.7 g. It may not be altered, so all weight savings come from the canopy, lines and tape.',
    credit: 'Peter Porai-Koshits',
    source: commons('Table_Tennis_Plastic_Ball_40+_mm.jpg'),
  },
  'ppp-clinometer': {
    file: 'ppp-clinometer.jpg',
    width: 1200,
    height: 800,
    alt: 'A smartphone running a clinometer app that shows a dial and an angle reading.',
    caption:
      'A phone clinometer app measures the angle of elevation; height above the eye = distance × tan(angle).',
    credit: 'Rufiyaa',
    source: commons('Clinometer_on_smartphone.jpg'),
  },
  'ppp-terminal-velocity': {
    file: 'ppp-terminal-velocity.png',
    width: 1000,
    height: 994,
    alt: 'A falling ball with an upward drag arrow labeled Fd and a downward gravity arrow labeled Fg, with air streaming past on both sides.',
    caption:
      'At terminal velocity the upward drag force F_d equals the weight F_g, so the net force is zero and the speed stays constant.',
    credit: 'Neurolysis',
    source: commons('Terminal_velocity.svg'),
  },
} satisfies Record<string, Photo>;
