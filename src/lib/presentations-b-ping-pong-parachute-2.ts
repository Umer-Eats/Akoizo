import { defineDeck, type Deck } from './presentation-types.ts';

// Ping Pong Parachute (Division B) presentations, units 5–7: parachute physics, deployment, and
// the practice log. Imported by presentations-b-ping-pong-parachute.ts.

const parachute = defineDeck('pppb-u5-l1', [
  {
    kind: 'title',
    title: 'Parachute physics: drag and slow descent',
    subtitle: 'A big, light canopy balances the payload’s weight at a slow, steady speed.',
    objectives: [
      'Explain terminal velocity using drag and weight.',
      'Calculate how canopy area changes descent rate.',
      'Trade parachute size against mass and reliable opening.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: if you make the canopy four times bigger in area, the payload falls…',
    options: ['Four times slower', 'Twice as slow', 'About the same', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Terminal velocity',
    image: 'ppp-terminal-velocity',
    caption:
      'Drag pushes up and weight pulls down. When they are equal, the ==net force is zero== and the speed stops changing.',
    bullets: [
      'The payload speeds up until **drag equals its weight**.',
      'Drag F = ½ρv²C_dA: air density ρ, speed v, drag coefficient C_d, canopy area A.',
      'Solving for speed: **v = √(2W ÷ ρC_dA)**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A payload is falling at its terminal velocity. What is true?',
    options: [
      'Drag equals weight, so the net force is zero',
      'Drag is zero',
      'Weight is larger than drag, so it keeps speeding up',
      'It is slowing down to a stop',
    ],
    answer: 0,
    explanation:
      'At terminal velocity the upward drag balances the weight. With no net force, the speed stays constant.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Area is the big lever',
    bullets: [
      'Speed depends on **1 ÷ √A**.',
      '==Quadrupling the area halves the descent speed== and doubles the time from the same height.',
      'Area grows with diameter squared, so **doubling the diameter** roughly halves the speed.',
      'Large, light canopies win, as long as they pack in and open every time.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'You double the diameter of a round canopy. Its descent speed becomes about:',
    options: ['Half as fast', 'A quarter as fast', 'Twice as fast', 'The same'],
    answer: 0,
    explanation:
      'Doubling the diameter makes the area 4 times larger. Speed goes as 1 ÷ √A, and 1 ÷ √4 = 1/2.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A payload descends at a steady 0.80 m/s from a height of 6.0 m. How long does the descent take?',
    answer: 7.5,
    tolerance: 0.05,
    unit: 's',
    explanation: 'Time = distance ÷ speed = 6.0 ÷ 0.80 = 7.5 s.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Weight and the ping pong ball',
    image: 'ppp-ball',
    caption:
      'The ball weighs about 2.7 g and ==may not be altered==, so every gram saved must come from the canopy, lines, and tape.',
    bullets: [
      'More weight means a faster descent, though only with the **square root**.',
      'Use thin plastic for the canopy and light thread for the lines.',
      'Use the **least tape** that holds reliably.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'If a payload’s weight became four times larger with the same canopy, its terminal speed would:',
    options: ['Double', 'Quadruple', 'Halve', 'Stay the same'],
    answer: 0,
    explanation:
      'v = √(2W ÷ ρC_dA), so speed grows with √W. Four times the weight gives √4 = 2 times the speed.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Drag coefficient',
    bullets: [
      'A **dome-shaped** canopy has C_d around 1.3 to 1.5; a flat sheet that does not fully inflate has less.',
      'A small **vent hole** at the top lets air escape steadily and ==reduces swinging==.',
      'Lines about as long as the canopy diameter help it open into a full dome.',
      'Lines that are too short pull the edge in and shrink the effective area.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: estimate the descent',
    problem:
      'A 4.7 g payload uses a 40 cm diameter dome (C_d ≈ 1.5) in air of density 1.2 kg/m³. Estimate its descent speed and the time to fall 7 m.',
    steps: [
      'W = 0.0047 × 9.8 ≈ **0.046 N**; A = π × 0.20² ≈ **0.126 m²**.',
      'v = √(2 × 0.046 ÷ (1.2 × 1.5 × 0.126)) ≈ **0.64 m/s**.',
      'Time ≈ 7 ÷ 0.64 ≈ 11 s.',
    ],
    conclusion: 'About ==11 s of descent==, plus about a second of climb.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Opening reliably',
    bullets: [
      'A parachute that does not open falls ==as fast as a crumpled bag==.',
      'Thin plastic folds small and opens readily, but **static** and tight packing can make it stick.',
      'Fold loosely, avoid twisted lines, and test the exact packing many times.',
      'Opening **near apogee** gives the longest descent.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Drift and indoor air',
    bullets: [
      'A slow, light payload **drifts** with air currents.',
      'Drift can carry it into a wall or rafter, ==ending the flight early==.',
      'A centered launch, a vent hole, and a canopy that does not glide sideways help.',
      'Watch where test descents drift and adjust the canopy if it slides one way.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Does each choice help or hurt time aloft?',
    bins: ['Helps', 'Hurts'],
    items: [
      ['A larger, light canopy', 0],
      ['Extra layers of tape', 1],
      ['A small vent hole at the top', 0],
      ['Lines much shorter than the canopy diameter', 1],
      ['Packing the canopy very tightly', 1],
      ['Loose folding tested many times', 0],
    ],
    explanation:
      'Bigger light canopies, vent holes, and reliable loose packing all help. Extra tape adds weight, short lines shrink the area, and tight packing risks a failed opening.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the parachute rule.',
    text: 'At terminal velocity, drag equals {0}. Making the canopy area four times larger makes the descent speed {1} as fast.',
    blanks: ['weight', 'half'],
    distractors: ['thrust', 'a quarter'],
    explanation:
      'Drag balances weight at terminal velocity, and speed goes as 1 ÷ √A, so four times the area halves the speed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Terminal velocity', back: 'Steady falling speed when drag equals weight.' },
      { front: 'Drag coefficient (C_d)', back: 'A number for how much drag a shape makes.' },
      { front: 'Canopy area', back: 'The projected area of the open parachute.' },
      { front: 'Air density (ρ)', back: 'Mass of air per cubic meter, about 1.2 kg/m³.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'At **terminal velocity**, drag equals weight and speed stays constant.',
      '==Four times the area halves the speed==; four times the weight doubles it.',
      'Dome shape, a vent hole, and lines about one diameter long help.',
      'A canopy only helps if it **opens every time**.',
    ],
  },
]);

const deployment = defineDeck('pppb-u6-l1', [
  {
    kind: 'title',
    title: 'Deployment and separation',
    subtitle: 'Let the rocket’s own motion release the payload near the top of the climb.',
    objectives: [
      'Explain why the payload must separate and when it should.',
      'Compare passive deployment methods allowed by the rules.',
      'Follow the loading and pressurizing sequence.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why separation is required',
    bullets: [
      'The payload **must separate** from the rocket.',
      'If it stays attached, timing runs until the rocket lands and a ==× 0.90 multiplier== applies.',
      'A heavy rocket hanging from a ping pong ball parachute would fall far faster anyway.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'The payload never leaves the rocket. How is that launch timed and scored?',
    options: [
      'Timing runs until the rocket lands, then × 0.90',
      'Timing stops at apogee, then × 0.25',
      'It is a zero-second launch',
      'It is timed normally with no penalty',
    ],
    answer: 0,
    explanation:
      'Without separation, timing runs until any part of the rocket touches the ground, and a 0.90 multiplier applies.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Allowed energy',
    bullets: [
      'All flight energy must come from **air pressure** supplied through the launcher.',
      'Banned: explosives, chemical reactions, springs or elastic, electrical devices, remote controls, tethers, and throwing.',
      'So deployment must be ==passive==, using the rocket’s own motion.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each deployment method allowed or banned?',
    bins: ['Allowed', 'Banned'],
    items: [
      ['A loose nose cup that releases at apogee', 0],
      ['A spring that pushes the parachute out', 1],
      ['A small electronic timer', 1],
      ['A rubber band ejector', 1],
      ['Letting the rocket tip over at apogee', 0],
      ['Baking soda and vinegar gas', 1],
    ],
    explanation:
      'Only air pressure may supply energy. Passive release from deceleration, drag, or the rocket turning over is allowed; springs, elastic, electronics, and chemicals are not.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Nose-cone release',
    steps: [
      { label: 'Thrust', detail: 'The rocket pushes the payload up and **holds it in the cup**.' },
      {
        label: 'Coast',
        detail:
          'The light, bulky payload feels ==more drag for its mass==, so it presses into the cup.',
      },
      { label: 'Apogee', detail: 'The rocket slows, stops, and **tips over**.' },
      { label: 'Release', detail: 'The payload slides out and the parachute opens.' },
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What makes the payload slide out of a loose nose cup?',
    options: [
      'The rocket slowing, stopping, and tipping over at apogee',
      'A spring under the payload',
      'The launcher pushing it out',
      'The team pulling a string',
    ],
    answer: 0,
    explanation:
      'The cup holds the payload during thrust and the coast. At apogee the rocket stops and tips, and the payload slides free.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Timing of separation',
    columns: ['Release', 'What happens', 'Fix'],
    rows: [
      [
        '**Too early**',
        'Opens while the rocket is fast; may ==tear or tangle==',
        'Deeper or snugger cup',
      ],
      ['**Near apogee**', 'Starts the descent from the highest point', 'Keep it!'],
      [
        '**Too late**',
        'The rocket is already falling; height is wasted',
        'Looser or shallower cup',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Video shows the payload staying in the cup until the rocket is already falling back down. What should you change?',
    options: [
      'Make the cup slightly looser or shallower',
      'Make the cup deeper and snugger',
      'Add a spring under the payload',
      'Raise the pressure until it hits the ceiling',
    ],
    answer: 0,
    explanation:
      'A late release wastes height, so the payload is held too firmly. A looser or shallower cup lets it slide out at apogee. Springs are banned.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: read the video',
    problem:
      'Video shows a payload leaving the rocket 0.3 s after launch, well before apogee, and the parachute tangling.',
    steps: [
      'Early release means the payload sits **too loosely** or is pushed out by airflow.',
      'Make the nose cup slightly **deeper or snugger**.',
      'Test again on video and check that release moves to apogee.',
    ],
    conclusion: '==Change one thing, then check it with evidence.==',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Loading sequence',
    steps: [
      { label: 'Load', detail: 'Put the rocket on the launcher first.' },
      { label: 'Place', detail: 'With it unpressurized, place the payload on or in it.' },
      { label: 'Hands off', detail: '==The payload may not be touched after that.==' },
      { label: 'Pressurize', detail: 'Pump to your chosen psi; the supervisor checks the gauge.' },
      { label: 'Launch', detail: 'Call “3, 2, 1, LAUNCH!” and release.' },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put the launch steps in order.',
    items: [
      'Load the rocket onto the launcher',
      'Place the payload on the unpressurized rocket',
      'Pressurize to the chosen psi',
      'Supervisor checks the gauge',
      'Count down and release',
    ],
    explanation:
      'The rocket goes on the launcher first, then the payload. After pressurizing, the gauge is checked before the countdown.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Rehearsal',
    bullets: [
      'Because the payload cannot be adjusted once loaded, packing must be **fast and consistent**.',
      'Practice exactly: fold, place, check nothing is caught, pressurize.',
      'Bring **spare parachutes** and practice switching to the second rocket.',
      'A ==timed rehearsal== shows whether two launches fit in 5 minutes.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why rehearse with a timer?',
    options: [
      'To check that two launches, including any switch, fit in the 5-minute window',
      'Because rehearsal time is added to the score',
      'To make the parachute open faster',
      'Because the supervisor requires a stopwatch',
    ],
    answer: 0,
    explanation:
      'Teams have 5 minutes for two launches. A timed rehearsal shows whether packing and switching rockets really fit.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Separation', back: 'The payload leaving the rocket during flight.' },
      { front: 'Passive deployment', back: 'Release driven by the rocket’s own motion.' },
      { front: 'Nose cup', back: 'An open holder on top of the rocket that carries the payload.' },
      { front: 'Burnout', back: 'The moment the air thrust ends.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'The payload **must separate**, or the launch is × 0.90.',
      'Only air pressure may supply energy, so deployment is ==passive==.',
      'A loose nose cup releases the payload as the rocket tips over at apogee.',
      'Load rocket, then payload, then pressurize; ==never touch the payload after loading==.',
    ],
  },
]);

const log = defineDeck('pppb-u7-l1', [
  {
    kind: 'title',
    title: 'The practice log and launch decisions',
    subtitle: 'Fly, record, and analyze, then choose and defend a competition pressure.',
    objectives: [
      'Build a complete practice log that meets the rules.',
      'Use controlled tests to improve time aloft.',
      'Justify a competition pressure with data.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Required data',
    image: 'xd-hahn-notebook',
    caption:
      'A real lab notebook. Your practice log is the same idea: ==every flight, every parameter, written down==.',
    bullets: [
      'At least **10 test flights** and **five parameters**.',
      'Required: **launch pressure (psi)**, **peak height (ft)**, and **time aloft (s)**.',
      'At least two more of your choice, such as fin count or parachute diameter.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which three parameters are required in every practice log? Choose three.',
    options: [
      'Launch pressure in psi',
      'Estimated peak height in feet',
      'Time aloft in seconds',
      'Rocket color',
      'Number of fins',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pressure, peak height, and time aloft are required. Fin count is a good extra parameter, but not one of the three required.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: is the log complete?',
    problem: 'A log has 12 flights recording pressure, height, time, and fin count.',
    steps: [
      'Required: pressure, height, time — **all present**.',
      'Additional: only fin count, **one of the two** needed.',
      'Total parameters: four, below the five required.',
    ],
    conclusion:
      'The log is ==incomplete== (× 0.85). Adding one more parameter, like parachute diameter, would fix it.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Choosing extra parameters',
    bullets: [
      'Pick parameters you will **actually change and learn from**.',
      'Parachute diameter and payload mass connect directly to **descent rate**.',
      'Rocket mass and fin count affect **climb and stability**.',
      'Notes on separation and drift help explain ==outliers==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which extra parameter connects most directly to descent rate?',
    options: [
      'Parachute diameter',
      'Rocket color',
      'Launch time of day',
      'Name of the person pumping',
    ],
    answer: 0,
    explanation:
      'Parachute diameter sets canopy area, which directly controls how fast the payload falls.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Controlled testing',
    bullets: [
      '==Change one thing at a time.==',
      'To compare parachutes, keep the rocket, pressure, and packing the same.',
      'To find a pressure, keep the parachute fixed.',
      'Repeat each condition: **averages and spreads** beat one lucky flight.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'You want to know if a 45 cm parachute beats a 35 cm one. Which test plan is best?',
    options: [
      'Fly each parachute several times with the same rocket, pressure, and packing',
      'Fly the 45 cm one at a higher pressure to give it a fair chance',
      'Fly each parachute once and keep the longer time',
      'Change the fins and the parachute together to save time',
    ],
    answer: 0,
    explanation:
      'Only the parachute should change, and repeats show the spread. Changing several things at once hides which one mattered.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reading the data',
    image: 'xd-correlation',
    caption:
      'Points that line up tightly show a strong relationship. A straight time-versus-height line means a ==steady descent rate==.',
    bullets: [
      'Plot **time aloft against peak height**.',
      'The **slope** is seconds per foot of height; a better parachute raises it.',
      'Note and explain outliers, such as a failed opening; ==do not delete them==.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'In your log, a 15 ft flight stayed up 9.0 s and a 20 ft flight stayed up 12.0 s. What is the slope in seconds per foot?',
    answer: 0.6,
    tolerance: 0.01,
    unit: 's/ft',
    explanation: 'Slope = (12.0 − 9.0) ÷ (20 − 15) = 3.0 ÷ 5 = 0.6 s per foot.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Using that slope of 0.6 s per foot, and 12.0 s at 20 ft, about how long should a 22 ft flight last?',
    answer: 13.2,
    tolerance: 0.05,
    unit: 's',
    explanation: 'Two more feet adds 2 × 0.6 = 1.2 s, so 12.0 + 1.2 = 13.2 s.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Justifying pressure',
    bullets: [
      'At competition you choose a pressure and must **justify it with data**.',
      'Bring the pressure–height chart, the spread at your pressure, and the ceiling margin.',
      'Example: “60 psi has reached 19 to 21 feet in eight tests, below the 24-foot ceiling.”',
      '==Clear evidence shows the choice is safe.==',
    ],
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Competition plan',
    steps: [
      { label: 'Launch 1', detail: 'Justified pressure with your **most reliable** parachute.' },
      { label: 'If it went well', detail: 'Repeat the same setup as a strong ==tiebreaker==.' },
      { label: 'If something failed', detail: 'Switch to the **backup** rocket or parachute.' },
      { label: 'Questions', detail: 'Answer design questions using your log as evidence.' },
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each situation to the best plan.',
    pairs: [
      ['Launch 1 was clean and long', 'Repeat the same setup for launch 2'],
      ['The parachute tore on launch 1', 'Switch to the spare parachute'],
      ['The rocket was damaged on launch 1', 'Use the backup rocket'],
      ['The supervisor asks why you chose 60 psi', 'Show the pressure–height chart'],
    ],
    explanation:
      'A good first launch is worth repeating as a tiebreaker. Failures call for spares, and your log answers questions about pressure.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Required parameters',
        back: 'Pressure (psi), peak height (ft), and time aloft (s).',
      },
      { front: 'Additional parameters', back: 'At least two more chosen by the team.' },
      { front: 'Incomplete log', back: 'Missing a parameter or under 10 flights; × 0.85.' },
      { front: 'Outlier', back: 'A data point far from the rest, to be explained, not deleted.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'A complete log: **10+ flights, 5+ parameters**, including pressure, height, and time.',
      '==Change one thing at a time== and repeat each test.',
      'Plot time against height; explain outliers instead of deleting them.',
      'Justify your pressure with the chart, the spread, and the ceiling margin.',
    ],
  },
]);

export const pingPongDecksLate: Deck[] = [parachute, deployment, log];
