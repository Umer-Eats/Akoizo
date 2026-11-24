import { defineDeck, type Deck } from './presentation-types.ts';

// Scrambler (Division B) presentations, units 5–7: protecting the egg, the Can Bonus, and
// competition day. Imported by presentations-b-scrambler.ts.

const egg = defineDeck('scr-u5-l1', [
  {
    kind: 'title',
    title: 'Protecting the egg',
    subtitle: 'A legal egg holder, a gentle stop, and no contact with the Terminal Barrier.',
    objectives: [
      'Build a legal egg holder and backstop.',
      'Calculate deceleration during stopping.',
      'Stop safely near the Terminal Barrier.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how fast do you think an egg can stop without cracking?',
    options: ['In 1 cm', 'In 5 cm', 'In 20 cm', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Egg holder rules',
    bullets: [
      'The egg rests on **two wooden dowels**, 1/4 to 3/8 inch thick and 3.0 to 4.0 cm long.',
      'The dowels attach to a wooden **backstop** 5.0 × 5.0 cm and at least 1.1 cm thick; ==no balsa==.',
      'The bottom of the dowels sits 5.0 to 10.0 cm above the track.',
      'The egg must be the ==foremost part== of the vehicle.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which egg holder details are legal? Choose all that apply.',
    options: [
      'A 3/8 inch dowel',
      'A balsa backstop',
      'Dowels 3.5 cm long',
      'Dowel bottoms 7 cm above the track',
      'A wire bracket sticking out ahead of the egg',
    ],
    answers: [0, 2, 3],
    explanation:
      'Dowels of 1/4 to 3/8 inch, 3.0 to 4.0 cm long, with bottoms 5.0 to 10.0 cm up are legal. The backstop may not be balsa, and the egg must be the foremost part.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Attaching the egg',
    bullets: [
      'Supervisors supply the **tape**.',
      'Tape the egg to the dowels with its ==rounded end touching the backstop== and visible.',
      'No tape may cover the **front or rear 1.0 cm** of the egg.',
      'Taping counts against event time, so practice it quickly with the same kind of tape.',
    ],
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Deceleration',
    steps: [
      { label: 'Arrive', detail: 'The vehicle reaches the stop at speed **v**.' },
      { label: 'Brake', detail: 'It slows over a stopping distance **d**.' },
      { label: 'Feel', detail: 'The egg feels average deceleration ==a = v² ÷ (2d)==.' },
      { label: 'Compare', detail: 'Divide by 9.8 m/s² to express it in **g**.' },
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Same speed, different stops',
    columns: ['Stop from 2.0 m/s in…', 'Deceleration', 'For the egg'],
    rows: [
      ['10 cm', '20 m/s², about **2 g**', 'Gentle'],
      ['1 cm', '200 m/s², about **20 g**', '==Ten times harsher=='],
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: how hard is the stop?',
    problem: 'A vehicle arrives at 1.5 m/s and stops in 6 cm. Find the average deceleration in g.',
    steps: [
      'a = v² ÷ (2d) = 1.5² ÷ (2 × 0.06) = 2.25 ÷ 0.12 ≈ **18.8 m/s²**.',
      'In g: 18.8 ÷ 9.8 ≈ **1.9 g**.',
    ],
    conclusion: 'About ==1.9 g==, a gentle stop the egg should survive.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A vehicle moving at 3.0 m/s stops in 5 cm (0.05 m). What is its average deceleration in m/s²?',
    answer: 90,
    tolerance: 0.5,
    unit: 'm/s²',
    explanation:
      'a = v² ÷ (2d) = 3.0² ÷ (2 × 0.05) = 9.0 ÷ 0.10 = 90 m/s², about 9 g. That is risky for an egg.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'If the stopping distance is cut in half at the same speed, the deceleration:',
    options: ['Doubles', 'Halves', 'Quadruples', 'Stays the same'],
    answer: 0,
    explanation: 'a = v² ÷ (2d). Halving d doubles a, so the egg is pushed twice as hard.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The Terminal Barrier',
    bullets: [
      'A hard, flat wall at least **25 cm tall and 1 m long**, centered at the Target Point.',
      'Any vehicle part ==besides the egg== touching the barrier is a competition violation.',
      'So is the egg tip going **past the barrier’s front**.',
      'Aim to stop the egg tip very close to, but not past, the barrier.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which of these is a competition violation at the Terminal Barrier?',
    options: [
      'A wheel bumps the barrier',
      'The egg tip stops 1 cm before the barrier',
      'The vehicle stops 20 cm short',
      'The egg lightly touches the barrier without passing it',
    ],
    answer: 0,
    explanation:
      'Only the egg may touch the barrier, and its tip may not pass the barrier’s front. A wheel touching it is a violation.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Speed at the end',
    bullets: [
      'Deceleration depends on **speed squared**, so slow down before the target.',
      'Some designs let the energy ==run out near the end== so the vehicle coasts in slowly.',
      'Others brake progressively.',
      'Lower arrival speed means gentler stops and smaller skid errors, for a little extra time.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing safely',
    bullets: [
      'Practice with **egg-shaped substitutes** of similar mass, then confirm with real eggs.',
      'Check for **hairline cracks** after every test.',
      'A broken egg on the first run means ==no second run==.',
      'Bring spare eggs and store them in a padded carton.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each habit safe for the egg or risky?',
    bins: ['Safe practice', 'Risky'],
    items: [
      ['Checking for hairline cracks after each test', 0],
      ['Testing a brand-new brake with a real egg first', 1],
      ['Using an egg-shaped substitute of similar mass', 0],
      ['Carrying spare eggs loose in a backpack', 1],
      ['Arriving at the target as fast as possible', 1],
    ],
    explanation:
      'Substitutes and crack checks protect the real egg. Untested brakes, loose eggs, and fast arrivals all raise the risk.',
  },
  {
    kind: 'fill',
    section: 2,
    prompt: 'Complete the deceleration rule.',
    text: 'Average deceleration is a = v² ÷ (2d). A {0} stopping distance gives a gentler stop, and doubling the arrival speed makes the deceleration {1} times as large.',
    blanks: ['longer', 'four'],
    distractors: ['shorter', 'two'],
    explanation:
      'A longer d divides v² by a bigger number. Because v is squared, doubling speed makes a four times larger.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Backstop', back: 'Wooden block at least 1.1 cm thick that holds the dowels.' },
      { front: 'Dowels', back: 'Two wooden pegs that support the egg.' },
      { front: 'Deceleration', back: 'Rate of slowing, a = v² ÷ (2d).' },
      { front: 'g-force', back: 'Acceleration in multiples of 9.8 m/s².' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Build the **dowels and backstop** exactly to the rules; the egg leads the vehicle.',
      'Deceleration a = v² ÷ (2d): ==slower arrival and longer stops protect the egg==.',
      'Only the egg may touch the Terminal Barrier, and never past its front.',
      'Test with substitutes, check for cracks, and bring spares.',
    ],
  },
]);

const canBonus = defineDeck('scr-u6-l1', [
  {
    kind: 'title',
    title: 'The Can Bonus and curved paths',
    subtitle: 'Curve between two cans for a big bonus, then curve back to the target.',
    objectives: [
      'Calculate the Can Bonus for any Inside Can Distance.',
      'Design an arc that passes between the cans and reaches the target.',
      'Compare the bonus with its risks.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Can placement',
    bullets: [
      'The **Bonus Line** lies halfway between the Start Point and Target Point and extends to the left.',
      'The supervisor places the **Outside Can** with its inside edge ==100.0 cm from the center line==.',
      'Competitors place the **Inside Can** with its outside edge 0.0 to 100.0 cm from the Outside Can.',
      'The gap between them is the **Inside Can Distance**.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Bonus value',
    bullets: [
      'Can Bonus = ==−0.5 × (110 − Inside Can Distance)==.',
      'A 50 cm gap earns −30 points; a 30 cm gap earns −40.',
      '**All parts** of the vehicle must pass between the cans.',
      'If a can moves, the bonus is lost.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'What is the Can Bonus for an Inside Can Distance of 40.0 cm?',
    answer: -35,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Can Bonus = −0.5 × (110 − 40) = −0.5 × 70 = −35 points.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each Inside Can Distance to its Can Bonus.',
    pairs: [
      ['30 cm', '−40 points'],
      ['50 cm', '−30 points'],
      ['60 cm', '−25 points'],
      ['100 cm', '−5 points'],
    ],
    explanation:
      'Each uses −0.5 × (110 − gap). Narrower gaps earn bigger (more negative) bonuses but are harder to pass through.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Why the path must curve',
    bullets: [
      'The gap lies to the **left** of the straight line from start to target.',
      'For a 50 cm gap, its center is ==75 cm left== of the center line.',
      'The vehicle curves left through the gap at the halfway point, then back to the Target Point.',
      'A **circular arc** through all three points does this.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'The Outside Can’s inside edge is 100 cm left of center. With a 40 cm Inside Can Distance, how far left of center is the middle of the gap?',
    answer: 80,
    tolerance: 0.5,
    unit: 'cm',
    explanation:
      'The gap runs from 100 − 40 = 60 cm to 100 cm left of center. Its middle is 100 − 40 ÷ 2 = 80 cm.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: arc geometry',
    problem:
      'The target distance is L = 8.00 m and the gap center is s = 0.75 m to the side. Find the arc radius.',
    steps: [
      'Use **R = (L²/4 + s²) ÷ (2s)**.',
      'L²/4 = 64 ÷ 4 = 16; s² = 0.5625.',
      'R = 16.5625 ÷ 1.5 ≈ **11.0 m**.',
      'The arc is longer than the straight line: about 8.19 m.',
    ],
    conclusion: 'The stopping mechanism must count the ==arc length, not the straight distance==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Target 9.00 m with a 60 cm gap, so the gap center is s = 0.70 m to the side. Using R = (L²/4 + s²) ÷ (2s), what is the arc radius? Round to one decimal place.',
    answer: 14.8,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'R = (81 ÷ 4 + 0.49) ÷ 1.4 = (20.25 + 0.49) ÷ 1.4 = 20.74 ÷ 1.4 ≈ 14.8 m.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Steering an arc',
    bullets: [
      'A vehicle turns steadily if its wheels are **angled slightly** or one drive wheel is **larger**.',
      'With wheels a track width w apart, the outer wheel travels (R + w/2) ÷ (R − w/2) times as far.',
      'For R = 11 m and w = 0.15 m, that ratio is about ==1.014==: a tiny difference.',
    ],
    callout: 'Small steering changes make big path changes over 8 to 10 m, so adjust in tiny steps.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'On a steady arc, how do the two drive wheels compare?',
    options: [
      'The outer wheel travels slightly farther than the inner wheel',
      'Both wheels travel exactly the same distance',
      'The inner wheel travels much farther',
      'The outer wheel travels twice as far',
    ],
    answer: 0,
    explanation:
      'The outer wheel follows a slightly larger circle. For an 11 m radius and 15 cm track, it travels only about 1.4 percent farther.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Risk versus reward',
    columns: ['Plan', 'Reward', 'Risk'],
    rows: [
      ['**Straight run**, no cans', 'No bonus', 'Easiest to calibrate'],
      ['**Wide gap** (e.g. 80 cm)', '−15 points', 'Moderate; good first step'],
      [
        '**Narrow gap** (e.g. 30 cm)',
        '−40 points',
        '==Hitting a can loses the bonus== and may wreck the stop',
      ],
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put a sensible plan for adding the Can Bonus in order.',
    items: [
      'Master reliable straight runs',
      'Add the curved path with a wide gap',
      'Build a calibration table for the arc',
      'Narrow the gap as reliability improves',
    ],
    explanation:
      'Teams usually master straight runs first, then add a wide-gap arc, calibrate it, and narrow the gap only once the arc is reliable.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bonus Line', back: 'The line halfway to the target where the cans sit.' },
      { front: 'Outside Can', back: 'Placed by the supervisor, inside edge 100 cm from center.' },
      { front: 'Inside Can', back: 'Placed by competitors, 0 to 100 cm from the Outside Can.' },
      { front: 'Inside Can Distance', back: 'The gap between the two cans.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Can Bonus = **−0.5 × (110 − Inside Can Distance)**; narrower gaps earn more.',
      'The gap is off to the left, so the path must be a **curved arc**.',
      'R = (L²/4 + s²) ÷ (2s), and the arc is longer than the straight line.',
      '==Master straight runs first==, then add the bonus with a wide gap.',
    ],
  },
]);

const competition = defineDeck('scr-u7-l1', [
  {
    kind: 'title',
    title: 'Calibration and competition day',
    subtitle: 'Turn test runs into a table, then follow the rules from impound to the second run.',
    objectives: [
      'Build a calibration table for 7.00–10.00 m targets.',
      'Follow impound, setup, and run procedures.',
      'Use the second run wisely.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The Target Distance',
    bullets: [
      'Chosen by the supervisor between **7.00 and 10.00 m**.',
      'Steps of 0.25 m at Regionals, 0.10 m at State, and 0.01 m at Nationals.',
      'Announced ==after impound and before the first time slot==.',
      'A calibration table covering the whole range lets you set the vehicle quickly.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'At Regionals the Target Distance is 7.00 to 10.00 m in steps of 0.25 m. How many different targets are possible?',
    answer: 13,
    tolerance: 0,
    unit: 'targets',
    explanation:
      '(10.00 − 7.00) ÷ 0.25 = 12 steps, plus the starting value, gives 13 possible targets.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Building the table',
    image: 'xd-hahn-notebook',
    caption:
      'A real lab notebook: dated notes beside columns of numbers. ==Your calibration log should look like this.==',
    bullets: [
      'Test at several settings across the range, such as 7, 8, 9, and 10 m, with **several runs each**.',
      'Record setting, stopping distance, and time, then **fit a line** through the averages.',
      'Keep separate tables for straight runs and each Can Bonus gap.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: read the table',
    problem:
      'Table: 30 turns → 7.20 m, 34 turns → 8.15 m, 38 turns → 9.10 m. Set the vehicle for a State target of 8.60 m.',
    steps: [
      'Slope: (9.10 − 7.20) ÷ 8 = **0.2375 m per turn**.',
      'From 34 turns: (8.60 − 8.15) ÷ 0.2375 ≈ **1.9 turns** more.',
      'Setting = 34 + 1.9 ≈ 35.9 turns.',
    ],
    conclusion: 'Set about ==35.9 turns==, between two tested settings.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Your table shows 40 turns → 8.00 m and 44 turns → 8.80 m. How many turns should you set for an 8.30 m target?',
    answer: 41.5,
    tolerance: 0.1,
    unit: 'turns',
    explanation:
      'Slope = (8.80 − 8.00) ÷ 4 = 0.20 m per turn. Extra distance 0.30 m ÷ 0.20 = 1.5 turns, so 40 + 1.5 = 41.5 turns.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Impound',
    bullets: [
      'Impound the **vehicle**, the **launcher** if separate, and the **Kit Modification Form** if using a kit.',
      'The falling mass must be ==detached== when impounding.',
      'Tools do not need impound; launchers and masses may be shared within a school.',
      'Inspections do not happen at impound. Bring a checklist.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which items must be impounded? Choose all that apply.',
    options: [
      'The vehicle',
      'A separate launcher',
      'The Kit Modification Form, if using a kit',
      'Your screwdrivers and tape measure',
      'The falling mass attached to the vehicle',
    ],
    answers: [0, 1, 2],
    explanation:
      'The vehicle, any separate launcher, and the kit form are impounded. Tools are not, and the falling mass must be detached.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'Setup and launch',
    steps: [
      { label: 'Attach', detail: 'Attach the falling mass and **tape the egg**.' },
      { label: 'Place', detail: 'Vehicle at the Start Point; Inside Can if going for the bonus.' },
      { label: 'Ready', detail: 'Tell the supervisor, who may ask about specific violations.' },
      {
        label: 'Trigger',
        detail: 'Use an ==unsharpened #2 pencil==, touching only the pencil and adding no energy.',
      },
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'During and after the run',
    bullets: [
      'Do not follow the vehicle down the track until you are **called to retrieve it**.',
      'The supervisor decides if the run succeeded, then measures **Vehicle Distance** and records the time.',
      'If the vehicle ==fails to move when triggered==, no run has occurred and you may keep working.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'You trigger the vehicle, but it does not move at all. What happens?',
    options: [
      'No run has occurred, so you may keep working within event time',
      'It counts as a Failed Run',
      'You get a 150-point penalty',
      'You must leave the event',
    ],
    answer: 0,
    explanation:
      'If the vehicle fails to move when triggered, a run has not occurred. The team can fix it and try again within event time.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using the second run',
    bullets: [
      'Only the **better run** counts.',
      'After a good first run, try a ==narrower gap or a small calibration tweak==.',
      'After a failed or penalized first run, make the second a **safe, reliable** run.',
      'The egg must survive the first run for a second run to happen.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'What should the second run look like?',
    bins: ['Try a small improvement', 'Play it safe'],
    items: [
      ['First run stopped 3 cm away with a wide-gap bonus', 0],
      ['First run hit a can and lost the bonus', 1],
      ['First run was a Failed Run', 1],
      ['First run was clean but stopped a steady 4 cm short', 0],
    ],
    explanation:
      'A strong first run leaves room for a careful improvement. After a failure or lost bonus, a reliable second run protects the score.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Target Distance', back: '7.00 to 10.00 m, announced after impound.' },
      { front: 'Calibration table', back: 'Settings matched to measured stopping distances.' },
      { front: 'Impound', back: 'Turning in the vehicle before the event.' },
      { front: 'Kit Modification Form', back: 'Documents at least two functional kit changes.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Test across **7 to 10 m** and fit a line so any target can be set quickly.',
      'Impound the vehicle with the falling mass **detached**.',
      'Trigger with an unsharpened #2 pencil, adding no energy.',
      '==Only the better run counts==: improve after a good run, play safe after a bad one.',
    ],
  },
]);

export const scramblerDecksLate: Deck[] = [egg, canBonus, competition];
