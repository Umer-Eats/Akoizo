import { defineDeck, type Deck } from './presentation-types.ts';
import { pingPongDecksLate } from './presentations-b-ping-pong-parachute-2.ts';

// Ping Pong Parachute (Division B) presentations. Each deck follows its lesson in the Division B
// course section by section (`section` is the lesson section index), at a middle-school level.

const scoring = defineDeck('pppb-u1-l1', [
  {
    kind: 'title',
    title: 'The event and its score: time aloft and multipliers',
    subtitle: 'Launch a bottle rocket, release a ping pong ball parachute, and keep it in the air.',
    objectives: [
      'Describe how a launch is timed and scored.',
      'Apply the separation, ceiling, and log multipliers.',
      'Plan two launches in the five-minute window.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: where do you think most of the time aloft comes from?',
    options: [
      'The rocket climbing',
      'The parachute coming down',
      'About half and half',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'What you build',
    image: 'ppp-ball',
    caption:
      'A standard ping pong ball. With a parachute taped to it, it becomes the **parachute payload system**.',
    bullets: [
      'Bring up to **two bottle rockets**, two unaltered ping pong balls, and two parachutes.',
      'The supervisor supplies the launcher, pump, pressure gauge, and timers.',
      'The rocket is pressurized with ==air only== and launched indoors.',
    ],
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Timing a launch',
    steps: [
      { label: 'Start', detail: 'Timing begins when the rocket **leaves the launcher**.' },
      { label: 'Separate', detail: 'The payload must ==separate from the rocket==.' },
      { label: 'Stop', detail: 'Timing stops when the parachute payload system **lands**.' },
      { label: 'Record', detail: 'Three timers; the ==middle value== is official, to hundredths.' },
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Three timers read 12.41, 12.56, and 12.30 s. What is the official time?',
    options: ['12.41 s', '12.56 s', '12.42 s', '12.30 s'],
    answer: 0,
    explanation:
      'The rules use the middle value, not the average. Sorted, the times are 12.30, 12.41, and 12.56, so 12.41 s is official.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Ranking',
    bullets: [
      'The score is the **greatest time aloft** from a single launch, after multipliers.',
      '==High score wins.==',
      'Ties are broken by the time aloft of the team’s **other launch**.',
      'You have **5 minutes** for two launches, with the same rocket or two different ones.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'After multipliers, launch 1 is worth 10.50 s and launch 2 is worth 12.20 s. What are the score and the tiebreaker?',
    options: [
      'Score 12.20; tiebreaker 10.50',
      'Score 22.70; no tiebreaker',
      'Score 11.35, the average',
      'Score 10.50; tiebreaker 12.20',
    ],
    answer: 0,
    explanation:
      'The score is the greatest single launch, 12.20. The other launch, 10.50, is used to break ties.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'The multipliers',
    columns: ['What happened', 'Multiplier', 'Why'],
    rows: [
      ['Payload never separated', '**× 0.90**', 'Timing runs until the rocket lands'],
      ['Hit the ceiling on the way up', '==× 0.25==', 'Timing also stops at contact'],
      ['Incomplete practice log', '**× 0.85**', 'Fewer than 10 flights or 5 parameters'],
      ['No practice log', '**× 0.70**', 'Also limited to a safe supervisor pressure'],
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The ceiling multiplier',
    bullets: [
      'If any part of the rocket or payload hits the ceiling, or something attached to it, ==timing stops at that instant==.',
      'The launch is then multiplied by **0.25**.',
      'A ceiling hit turns a long flight into almost nothing.',
      'Tournaments must tell teams the **ceiling height** in advance.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: which launch counts?',
    problem:
      'A team with a complete log records 14.20 s on launch 1 (clean) and 19.80 s on launch 2, but launch 2 grazed a light on the way up.',
    steps: [
      'Launch 1: 14.20 × 1.00 = **14.20**.',
      'Launch 2: timing stopped at contact; even 19.80 × 0.25 = **4.95**.',
      'The score is the greater value.',
    ],
    conclusion: 'The score is ==14.20==. The clean, shorter flight wins easily.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A team with a complete log has a launch whose payload never separates. The rocket lands after 11.00 s. What is that launch worth?',
    answer: 9.9,
    tolerance: 0.01,
    unit: 's',
    explanation: 'No separation means a 0.90 multiplier: 11.00 × 0.90 = 9.90.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Practice log multipliers',
    bullets: [
      'Present a log of **at least 10 test flights** with **at least five parameters**.',
      'Incomplete log: score × 0.85. No log: score × 0.70.',
      'Teams without a complete log are limited to a ==safe pressure chosen by the supervisor==.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A team’s best clean launch is 15.00 s, but its practice log is incomplete. What is its score?',
    answer: 12.75,
    tolerance: 0.01,
    unit: 's',
    explanation: 'An incomplete log multiplies the score by 0.85: 15.00 × 0.85 = 12.75.',
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each situation to its multiplier.',
    pairs: [
      ['Complete log, clean launch', '× 1.00'],
      ['Payload stayed on the rocket', '× 0.90'],
      ['Incomplete practice log', '× 0.85'],
      ['No practice log', '× 0.70'],
      ['Rocket hit the ceiling', '× 0.25'],
    ],
    explanation:
      'The ceiling hit is by far the worst. Separation failures and log problems cost less, but still add up.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Inspection and safety',
    bullets: [
      'Arrive ready to launch, with **Category B eye protection**.',
      'Rockets are inspected; ones that break construction rules are ==not launched==.',
      'A team that cannot launch at all receives participation points.',
      'If the supplied launcher fails to release a rocket, that launch never happened and can be restarted.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'The supervisor’s launcher jams and the rocket never leaves it. What happens?',
    options: [
      'That launch never happened and can be restarted',
      'It counts as a zero-second launch',
      'The team gets participation points only',
      'The team loses its second launch',
    ],
    answer: 0,
    explanation:
      'If the supplied launcher fails to release a rocket, the launch did not happen and can be restarted.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Time aloft', back: 'From leaving the launcher until the payload lands.' },
      { front: 'Parachute payload system', back: 'A ping pong ball with its taped-on parachute.' },
      { front: 'Separation', back: 'The payload leaving the rocket during flight; required.' },
      { front: 'Multiplier', back: 'A factor below 1 that shrinks a launch’s time.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Time runs from launch until the **payload lands**; the middle of three timers counts.',
      'Best single launch after multipliers wins; the other launch breaks ties.',
      '==A ceiling hit (× 0.25) is the worst mistake==; no separation is × 0.90.',
      'A complete log (10 flights, 5 parameters) avoids × 0.85 or × 0.70.',
    ],
  },
]);

const climb = defineDeck('pppb-u2-l1', [
  {
    kind: 'title',
    title: 'How an air-powered bottle rocket climbs',
    subtitle: 'Compressed air, Newton’s third law, and a climb that lasts about a second.',
    objectives: [
      'Explain thrust from compressed air using Newton’s laws.',
      'Relate launch pressure to impulse and peak height.',
      'Describe the three phases of flight.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Stored energy',
    image: 'ppp-bottle-rocket',
    caption:
      'A bottle rocket on its launch tube. Pumping air in ==stores energy in the compressed air==.',
    bullets: [
      'When released, air rushes out of the nozzle.',
      '**Newton’s third law**: air pushed backward pushes the rocket forward.',
      'No water is allowed, so the light air leaves quickly and the powered phase is **extremely short**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is the powered phase so short in this event?',
    options: [
      'Only air is used, so the propellant is very light and leaves almost instantly',
      'The launcher limits it to one second',
      'Fins stop the thrust',
      'The parachute opens immediately',
    ],
    answer: 0,
    explanation:
      'Without water, the only propellant is air, which is light and rushes out in milliseconds.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Thrust and impulse',
    bullets: [
      '**Thrust** is roughly pressure difference × nozzle area, falling fast as pressure drops.',
      '**Impulse** = thrust × time; it is what changes the rocket’s momentum.',
      'Higher pressure stores more energy and gives ==more impulse==.',
      'The nozzle is fixed at about 2.2 cm, so **pressure is your main control**.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'The nozzle size is fixed by the bottle neck. What is your main control over impulse?',
    options: [
      'The launch pressure',
      'The color of the bottle',
      'The parachute size',
      'The ceiling height',
    ],
    answer: 0,
    explanation:
      'Higher pressure stores more energy and gives more impulse. With the nozzle fixed at about 2.2 cm, pressure is the main control.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Coasting',
    bullets: [
      'After the air is spent, the rocket **coasts** upward, slowed by gravity and drag.',
      'Drag grows with the ==square of speed==, so it matters most right after launch.',
      'The peak height, or **apogee**, is reached when upward speed falls to zero.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'If a rocket’s speed doubles, the air drag on it becomes about:',
    options: ['Four times as large', 'Twice as large', 'Half as large', 'The same'],
    answer: 0,
    explanation:
      'Drag grows with the square of speed, so doubling the speed gives about 2² = 4 times the drag.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Why mass matters',
    bullets: [
      'From **F = ma**, the same thrust accelerates a lighter rocket more.',
      'But a very light rocket carries little momentum and is slowed quickly by drag.',
      'The goal is ==not maximum height==: reach a safe height below the ceiling, fly straight, and release near apogee.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Pressure limits',
    bullets: [
      'The bottle must be one plastic **carbonated-beverage bottle** of 1 liter or less.',
      'You choose the launch pressure and must ==justify it with your log data==.',
      'Without a complete log, the supervisor sets a lower safe pressure.',
      'Never alter the bottle’s structure to save mass.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which statements about launch pressure are true? Choose all that apply.',
    options: [
      'Teams must justify their pressure with log data',
      'The supervisor checks the gauge',
      'Teams without a complete log get a lower safe pressure',
      'Any bottle that holds air is allowed',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pressure is justified with data and checked on the gauge, and incomplete logs mean a lower set pressure. Only one carbonated-beverage bottle of 1 liter or less is allowed.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'The three phases of flight',
    steps: [
      { label: 'Powered', detail: '**Milliseconds** of thrust as the air rushes out.' },
      { label: 'Coasting', detail: 'The rocket rises and slows to apogee.' },
      { label: 'Recovery', detail: 'The payload separates and ==descends slowly==.' },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the phases of flight in order.',
    items: ['Powered phase', 'Coasting phase', 'Apogee', 'Payload separates', 'Parachute descent'],
    explanation:
      'Thrust comes first, then a coast to apogee. The payload separates near apogee and descends under its parachute.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: where does the time come from?',
    problem:
      'A rocket reaches apogee 1.2 s after launch, and the payload then descends for 11.5 s.',
    steps: [
      'Total time aloft = 1.2 + 11.5 = **12.7 s**.',
      'Descent share = 11.5 ÷ 12.7 ≈ **0.91**.',
    ],
    conclusion: 'About ==91 percent== of the score comes from the parachute.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A rocket reaches apogee after 1.0 s, and the parachute then descends for 9.0 s. What percent of the time aloft is the descent?',
    answer: 90,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Total = 1.0 + 9.0 = 10.0 s. Descent share = 9.0 ÷ 10.0 = 0.90, or 90 percent.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Thrust', back: 'Force from air leaving the nozzle.' },
      { front: 'Impulse', back: 'Thrust times time; the change in momentum it causes.' },
      { front: 'Apogee', back: 'The highest point of the flight.' },
      { front: 'Drag', back: 'Air resistance, growing with the square of speed.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Air rushing out pushes the rocket up (**Newton’s third law**).',
      'Pressure sets the impulse; the climb lasts only about a second.',
      'Drag grows with speed squared and slows the coast to apogee.',
      '==Nearly all the time aloft comes from the parachute descent.==',
    ],
  },
]);

const build = defineDeck('pppb-u3-l1', [
  {
    kind: 'title',
    title: 'Building a legal, stable rocket',
    subtitle:
      'An unaltered bottle, tape-only attachments, a blunt nose, and fins that keep it straight.',
    objectives: [
      'Apply the bottle, nose, fin, and material rules.',
      'Explain stability using center of gravity and center of pressure.',
      'Design fins that keep the rocket flying straight.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The pressure vessel',
    bullets: [
      'One plastic **carbonated-beverage bottle** of 1 liter or less, with a nozzle about 2.2 cm across.',
      'The **label** must be presented.',
      'No cutting, sanding, heating, hot glue, super glue, or spray paint on it.',
      '==A weakened bottle can burst.==',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Attachments',
    bullets: [
      'Only **tape** may attach fins and parts to the pressure vessel; ==no glue of any kind==.',
      '**Metal** is banned anywhere on the rocket or payload, and so are Mylar and ultrafilm.',
      'Fins and added parts must sit **5 cm or more** above the bottle opening.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each choice legal or illegal?',
    bins: ['Legal', 'Illegal'],
    items: [
      ['Fins taped to the bottle', 0],
      ['Fins hot-glued to the bottle', 1],
      ['A metal washer in the nose for weight', 1],
      ['Foam-board fins', 0],
      ['A Mylar parachute canopy', 1],
      ['Fins starting 6 cm above the bottle opening', 0],
    ],
    explanation:
      'Tape is the only allowed attachment to the bottle. Metal, Mylar, and ultrafilm are banned. Fins must be at least 5 cm above the opening.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The nose',
    bullets: [
      'The nose must be **rounded or blunt**.',
      'A standard bottle cap (about 3.1 cm across, 1.25 cm tall) is placed over the tip.',
      '==No part of the nose may touch the inside top of the cap.==',
      'This protects people and the ceiling. Test your nose with a real cap.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A standard bottle cap is placed over the rocket’s nose. Which nose passes?',
    options: [
      'A rounded nose that does not touch the inside top of the cap',
      'A pointed nose that touches the inside top of the cap',
      'A nose with a metal tip',
      'A sharp cone glued to the bottle',
    ],
    answer: 0,
    explanation:
      'The nose must be rounded or blunt, and no part may touch the inside top of the cap. Metal and glue on the bottle are not allowed.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Stability',
    image: 'ws-flight-axes',
    caption:
      'A flying body can rotate about three axes. Fins stop the rocket from **pitching and yawing** away from a straight path.',
    bullets: [
      'A rocket flies straight when its **center of gravity (CG)** is ahead of its **center of pressure (CP)**.',
      'Fins at the tail move the CP backward.',
      'If it tilts, air pushes on the fins and ==swings the nose back into the wind==.',
      'If the CG is behind the CP, the rocket tumbles.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'For a stable rocket, where should the center of gravity be?',
    options: [
      'Ahead of (closer to the nose than) the center of pressure',
      'Behind the center of pressure',
      'Exactly at the center of pressure',
      'It does not matter',
    ],
    answer: 0,
    explanation:
      'With the CG ahead of the CP, air pushing on the fins swings the nose back into the wind. A CG behind the CP makes it tumble.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Finding CG and CP',
    bullets: [
      'Find the **CG** by balancing the finished rocket, with payload loaded, on a finger or string.',
      'Rough **CP**: cut the rocket’s side outline from cardboard and find its balance point.',
      'Aim for the CG at least ==one body diameter ahead of the CP==.',
      'A little nose mass moves the CG forward.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: stable enough?',
    problem:
      'A rocket’s CG is 18 cm from the nose and its CP is 21 cm from the nose. The bottle is 8 cm across.',
    steps: [
      'Stability margin = 21 − 18 = **3 cm**.',
      'In body diameters: 3 ÷ 8 ≈ **0.4**.',
      'That is below the 1-diameter guideline.',
    ],
    conclusion:
      '==Enlarge the fins or add nose mass== until the margin reaches about one diameter.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A rocket’s CG is 20 cm from the nose and its CP is 30 cm from the nose. The bottle is 8 cm across. What is the stability margin in body diameters?',
    answer: 1.25,
    tolerance: 0.01,
    unit: 'diameters',
    explanation:
      'Margin = 30 − 20 = 10 cm. 10 ÷ 8 = 1.25 body diameters, which meets the guideline.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Fin design',
    bullets: [
      '**Three or four fins**, evenly spaced and aligned with the body.',
      'Larger fins move the CP farther back but add drag and mass.',
      'Light, stiff materials like **foam board or corrugated plastic** work well, attached with tape.',
      '==Misaligned fins make the rocket spin or curve==, wasting height.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which changes move the rocket toward better stability? Choose all that apply.',
    options: [
      'Adding a little mass to the nose',
      'Using larger fins at the tail',
      'Adding mass to the tail',
      'Removing the fins',
    ],
    answers: [0, 1],
    explanation:
      'Nose mass moves the CG forward and larger tail fins move the CP back, both increasing the margin. Tail mass and removing fins do the opposite.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the stability rule.',
    text: 'A rocket is stable when its center of {0} is ahead of its center of {1}. Fins at the {2} move the center of pressure backward.',
    blanks: ['gravity', 'pressure', 'tail'],
    distractors: ['thrust', 'nose'],
    explanation: 'The CG must lead the CP. Tail fins add area at the back, moving the CP rearward.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Pressure vessel', back: 'The unaltered bottle that holds the compressed air.' },
      { front: 'Center of gravity (CG)', back: 'The rocket’s balance point.' },
      { front: 'Center of pressure (CP)', back: 'Where air forces effectively act.' },
      { front: 'Stability margin', back: 'Distance from CG back to CP, often in body diameters.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Use one **unaltered** bottle; attach parts with **tape only**; no metal or Mylar.',
      'The nose must be blunt and clear the inside of a bottle cap.',
      '==CG ahead of CP, by about one body diameter==, keeps the rocket straight.',
      'Three or four aligned fins; nose mass or larger fins add stability.',
    ],
  },
]);

const apogee = defineDeck('pppb-u4-l1', [
  {
    kind: 'title',
    title: 'Apogee, ceiling height, and choosing pressure',
    subtitle: 'Climb as high as you safely can, and use data to stay below the ceiling.',
    objectives: [
      'Estimate apogee with angle measurements or timing.',
      'Relate ceiling height to a safe launch pressure.',
      'Build a pressure-versus-height chart from test flights.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why apogee matters',
    bullets: [
      'Time aloft depends on how high the payload ==starts its descent==.',
      'You want apogee **close to the ceiling without touching it**.',
      'Tournaments give the ceiling height in feet in advance; more than 20 feet is recommended.',
      'Know, from data, what height each pressure gives your rocket.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Measuring with an angle',
    image: 'ppp-clinometer',
    caption:
      'A phone clinometer measures the **angle of elevation** to the rocket at its highest point.',
    bullets: [
      'Height above your eye = ==distance × tan(angle)==, then add your eye height.',
      '10 m away at 55°: 10 × 1.43 ≈ 14.3 m above eye level.',
      'Two observers on different sides average out drift.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An observer 8 m from the launcher sees apogee at 45°. Their eye height is 1.5 m. What is the apogee height in meters?',
    answer: 9.5,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'tan 45° = 1, so the height above the eye is 8 × 1 = 8 m. Add 1.5 m: 9.5 m.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An observer 12 m away sees apogee at 30° (tan 30° ≈ 0.577), with eye height 1.5 m. What is the apogee height? Round to one decimal place.',
    answer: 8.4,
    tolerance: 0.1,
    unit: 'm',
    explanation: '12 × 0.577 ≈ 6.9 m above the eye. Adding 1.5 m gives about 8.4 m.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Measuring against a reference',
    bullets: [
      'Indoors, compare apogee to **known heights**: wall marks, a 10-foot basketball rim, ceiling beams.',
      '**Video** helps you see the peak.',
      'Record the peak height in **feet**: it is a required log parameter.',
      '==A consistent method matters more than perfect accuracy.==',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which is a handy known reference height in many gyms?',
    options: [
      'A basketball rim at 10 feet',
      'A doorknob at 10 feet',
      'A light switch at 20 feet',
      'A chair seat at 5 feet',
    ],
    answer: 0,
    explanation:
      'A regulation basketball rim is 10 feet high, so it makes a useful mark for estimating apogee indoors.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Pressure–height chart',
    bullets: [
      'Launch the same rocket at several pressures and record each peak height.',
      'Plot **height against pressure**.',
      'The curve rises steeply at first, then ==flattens== because drag grows with speed.',
      'Read the pressure that gives a **safe margin** below the ceiling, such as 2 to 3 feet.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why does the pressure–height curve flatten at high pressures?',
    options: [
      'Drag grows with speed, so extra pressure adds less and less height',
      'The gauge stops working',
      'The bottle gets lighter',
      'Gravity gets weaker higher up',
    ],
    answer: 0,
    explanation:
      'Faster rockets lose much more energy to drag, which grows with speed squared, so each extra psi adds less height.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Margin',
    image: 'xd-sd',
    caption:
      'Repeated measurements spread out around an average. ==Plan for the high end of the spread==, not the average.',
    bullets: [
      'Heights vary with payload loading, small leaks, and air currents.',
      'If launches at 60 psi range from 19 to 22 feet, the highest must still clear the ceiling.',
      'A × 0.25 multiplier is far worse than a slightly shorter flight: when in doubt, **step the pressure down**.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: choose a pressure',
    problem:
      'Your chart shows 50 psi → 17 ft, 60 psi → 21 ft, 70 psi → 24 ft, each with about ±1.5 ft spread. The ceiling is 25 ft.',
    steps: [
      '70 psi could reach 24 + 1.5 = **25.5 ft**: too risky.',
      '60 psi reaches at most 21 + 1.5 = **22.5 ft**: safe.',
    ],
    conclusion: 'Choose ==60 psi==, which keeps even the highest flight below the ceiling.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'At 55 psi your rocket reaches 18 to 21 ft; at 65 psi it reaches 22 to 26 ft. The ceiling is 24 ft. Which pressure should you choose?',
    options: ['55 psi', '65 psi', 'Either one', 'A pressure above 65 psi'],
    answer: 0,
    explanation:
      'At 65 psi the highest flights reach 26 ft, above the 24 ft ceiling. At 55 psi the highest is 21 ft, safely below.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Different venues',
    bullets: [
      'Practice rooms rarely match the competition ceiling.',
      'Recording **pressure and height**, not just time, lets you choose pressure for ==any announced ceiling==.',
      'Vents and doors can push light payloads; leave margin for some drift.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Which log entries help you choose a pressure for a new venue?',
    bins: ['Helps choose pressure', 'Does not help much'],
    items: [
      ['Launch pressure for each flight', 0],
      ['Peak height for each flight', 0],
      ['The color of the rocket', 1],
      ['Spread of heights at each pressure', 0],
      ['The day of the week', 1],
    ],
    explanation:
      'Pressure, height, and spread let you read off a safe pressure for any ceiling. Color and weekday do not change the height.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Clinometer', back: 'A tool that measures the angle of elevation.' },
      { front: 'Tangent method', back: 'Height = distance × tan(angle) + eye height.' },
      { front: 'Ceiling height', back: 'Room height given to teams in advance, in feet.' },
      {
        front: 'Safety margin',
        back: 'Extra room left below the ceiling for flight-to-flight spread.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Higher apogee means longer descent, but ==never touch the ceiling==.',
      'Measure height with **distance × tan(angle) + eye height** or known reference heights.',
      'Build a pressure–height chart; it flattens at high pressure.',
      'Pick a pressure whose **highest** flight still clears the ceiling.',
    ],
  },
]);

export const decks: Deck[] = [scoring, climb, build, apogee, ...pingPongDecksLate];
