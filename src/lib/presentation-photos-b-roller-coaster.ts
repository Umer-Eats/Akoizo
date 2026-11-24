import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Roller Coaster (Division B) presentations, served from public/presentations.
export const photos = {
  'b-coast-marble': {
    file: 'b-coast-marble.jpg',
    width: 1200,
    height: 900,
    alt: 'A colorful plastic marble run built from clear tubes, chutes, funnels, and building blocks on a wooden floor.',
    caption:
      'A toy marble run: chutes, funnels, and turns that a ball rolls through using only gravity.',
    credit: 'Hillsilo',
    source: commons('Mega_Marble_Run_set.jpg'),
  },
  'b-coast-marble2': {
    file: 'b-coast-marble2.jpg',
    width: 1200,
    height: 1163,
    alt: 'A wooden toy marble track: three gently sloping yellow rails zig-zag down a frame to a small staircase and a numbered ramp.',
    caption:
      'Gently sloping rails zig-zag a marble down slowly; the steeper the slope, the faster the ball speeds up.',
    credit: 'Carl Steinbeißer',
    source: commons('Murmelbahn.JPG'),
  },
  'b-coast-lift': {
    file: 'b-coast-lift.jpg',
    width: 1200,
    height: 900,
    alt: 'A roller coaster train full of riders climbing a very tall, steep lift hill against a blue sky.',
    caption:
      'A coaster train climbs the lift hill: the height it gains here is the energy it spends on the whole ride.',
    credit: 'Adog104',
    source: commons('Mako_roller_coaster_lifthill.jpg'),
  },
  'b-coast-loop': {
    file: 'b-coast-loop.jpg',
    width: 960,
    height: 720,
    alt: 'A green steel roller coaster with a tall vertical loop; the train is passing through the track below the loop.',
    caption:
      'A vertical loop: the train must still be moving fast enough at the top to stay pressed against the track.',
    credit: 'Ryan Hurley (roar888)',
    source: commons('Raptor_(Vertical_Loop).jpg'),
  },
} satisfies Record<string, Photo>;
