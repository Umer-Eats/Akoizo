import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Elastic Launched Gliders (Division B) presentations, served from public/presentations.
export const photos = {
  'b-glide-kid': {
    file: 'b-glide-kid.jpg',
    width: 960,
    height: 720,
    alt: 'A small paper-and-balsa glider flying level across a living room just after leaving a person’s hand.',
    caption:
      'A small free-flight glider just after release: from here on, nothing powers it but the energy it was given.',
    credit: 'Bill Abbott',
    source: commons(
      'The_Kid_Flier_glides_away_neatly,_powered_by_gravity,_supported_by_its_wing_(5702296477).jpg',
    ),
  },
  'b-glide-launch': {
    file: 'b-glide-launch.jpg',
    width: 1200,
    height: 960,
    alt: 'A NASA engineer running forward on a dry lakebed, throwing a white model sailplane up and away with one arm.',
    caption:
      'A NASA engineer hand-launches a model sailplane: a strong, steady release angled upward starts the climb.',
    credit: 'NASA Armstrong Flight Research Center / Carla Thomas',
    source: commons(
      'NASA_Dryden_aerospace_engineer_Michael_Allen_hand-launches_a_model_motorized_sailplane_during_a_study_validating_the_use_of_heat_thermals_to_extend_flight_time_(EC05-0198-11).jpg',
    ),
  },
  'b-glide-stability': {
    file: 'b-glide-stability.png',
    width: 1200,
    height: 611,
    alt: 'Diagram: after a pitch-down disturbance, a statically stable aircraft’s path curves back toward level, a neutral one keeps its new angle, and an unstable one dives more and more steeply.',
    caption:
      'After a nose-down bump, a **stable** aircraft returns toward level flight, a neutral one holds the new angle, and an unstable one keeps diving.',
    credit: 'Olivier Cleynen and Werneuchen',
    source: commons('Aircraft_static_longitudinal_stability.svg'),
  },
  'b-glide-bands': {
    file: 'b-glide-bands.jpg',
    width: 1200,
    height: 1000,
    alt: 'A tangled pile of tan rubber bands on a black background.',
    caption:
      'Rubber bands store energy when stretched; their thickness, length, and age all change how much.',
    credit: 'Ragesoss',
    source: commons('Pile_of_size_19_rubber_bands_on_black.jpg'),
  },
} satisfies Record<string, Photo>;
