import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as later } from './presentations-b-roller-coaster-2.ts';

// Roller Coaster (Division B) presentations. Each deck follows its lesson section by section
// (`section` is the lesson section index), and its activities rehearse the lesson's rules, physics,
// worked example, and key terms. Lessons 5–7 are in presentations-b-roller-coaster-2.ts.

const rules = defineDeck('rc-u1-l1', [
  {
    kind: 'title',
    title: 'Rules and the four-part score',
    subtitle:
      'A ball, gravity, and a few simple machines: every point comes from size, time, elevators, and a loop.',
    objectives: [
      'List the **device limits** and the rules on energy.',
      'Calculate a **Run Score** from size, time, elevators, and loop.',
      'Decide which points are worth the most effort.',
    ],
    image: 'b-coast-marble',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which part of the score do you think is easiest to earn?',
    options: ['A small device', 'Hitting the Target Time', 'Elevators', 'A tall loop'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The device',
    image: 'b-coast-marble',
    bullets: [
      'A track carries a ball ==at least 1 cm in diameter== from one labeled **Start Line** to one **Finish Line**.',
      'At all times it must fit within **30.0 cm wide, 80.0 cm long, and 60.0 cm high**, not counting the ball.',
      'The ball must stay **visible**.',
      'A mechanism must **stop the ball safely** after the Finish Line.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each device limit to its size.',
    pairs: [
      ['Width', '30.0 cm'],
      ['Length', '80.0 cm'],
      ['Height', '60.0 cm'],
      ['Ball diameter', 'At least 1 cm'],
    ],
    explanation: 'The device fits in 30 × 80 × 60 cm, and the ball must be at least 1 cm across.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Energy rules',
    bullets: [
      'The ball moves using ==only its own gravitational potential energy==, except for the simple machines in the elevators.',
      '**Springs, rubber bands**, and other stored energy are banned.',
      '**Magnets, electrical parts, and electronics** may not be used anywhere.',
      'On “Go,” a team member releases the ball by pulling an unsharpened **#2 pencil** from the track.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each energy source allowed?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['The ball’s own height', 0],
      ['A counterweight driving an elevator', 0],
      ['A wound spring', 1],
      ['A rubber band launcher', 1],
      ['A small magnet to slow the ball', 1],
      ['A battery motor', 1],
    ],
    explanation:
      'Only gravity and the elevators’ simple machines (including counterweights) may move the ball. Springs, rubber bands, magnets, and electricity are banned.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The four scores',
    bullets: [
      '==Run Score = Size + Time + Elevator + Loop==, and the highest score wins.',
      '**Size Score** rewards a small device.',
      '**Time Score** rewards running close to the Target Time.',
      '**Elevator Score** is 50 points for each of two types; **Loop Score** is 3 points per whole cm of loop height.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each score to what earns it.',
    pairs: [
      ['Size Score', 'A small device'],
      ['Time Score', 'Running close to the Target Time'],
      ['Elevator Score', '50 points per elevator type'],
      ['Loop Score', '3 points per whole cm of loop height'],
    ],
    explanation: 'The four parts add up to the Run Score.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Size Score',
    bullets: [
      '**Size Score = (60 − height) + (30 − width) + (80 − length)**, measured to 0.1 cm.',
      'A 50 × 25 × 70 cm device earns 10 + 5 + 10 = **25 points**.',
      'Each centimeter saved earns 1 point; ==each centimeter of loop earns 3==.',
      'So a tall loop is usually worth some extra height.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'A device is 55 cm high, 28 cm wide, and 75 cm long. What is its Size Score?',
    answer: 12,
    tolerance: 0.01,
    unit: 'points',
    explanation: '(60 − 55) + (30 − 28) + (80 − 75) = 5 + 2 + 5 = 12 points.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Time Score',
    bullets: [
      'Teams earn **5 points for every full second** of run time up to the Target Time.',
      'They **lose 5 points** for every full second past it, up to twice the Target Time.',
      'The **Target Time** is between ==30 and 60 seconds==.',
      'A ball that does not cross the Finish Line earns a Time Score of **zero**, but elevator and loop points can still count.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'The Target Time is 40 s and the run takes 37.8 s. What is the Time Score?',
    answer: 185,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Only full seconds count: 37 × 5 = 185 points. The best possible is 40 × 5 = 200.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: a full Run Score',
    problem:
      'Target Time 45 s. A 52 × 26 × 72 cm device runs 44.6 s with both elevators and an 18.4 cm loop. Find the Run Score.',
    steps: [
      'Size: (60 − 52) + (30 − 26) + (80 − 72) = 8 + 4 + 8 = **20**.',
      'Time: 44 full seconds × 5 = **220**. Elevators: 2 × 50 = **100**.',
      'Loop: 18 whole cm × 3 = **54**. Total = 20 + 220 + 100 + 54 = **394**.',
    ],
    conclusion: 'Run Score = 394. ==Time and elevators are the biggest pieces.==',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Tiers and ties',
    bullets: [
      '**Tier 1** runs have no violations; construction or competition violations drop a run to **Tier 2**.',
      'Ties are broken by the highest **Loop Score**, then Size Score, then Time Score, then the longest time the ball ran.',
      '==Because Loop Score breaks ties first, a reliable tall loop is valuable twice.==',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the tiebreakers in the order they are used.',
    items: ['Loop Score', 'Size Score', 'Time Score', 'Longest time the ball ran'],
    explanation:
      'Loop first, then Size, then Time, and finally how long the ball ran before stopping or leaving.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Run Score', back: 'Size + Time + Elevator + Loop.' },
      { front: 'Size Score', back: '(60 − H) + (30 − W) + (80 − L).' },
      {
        front: 'Time Score',
        back: '5 points per full second up to the Target Time, minus 5 per second past it.',
      },
      { front: 'Loop Score', back: '3 points per whole cm of loop height.' },
      { front: 'Ready-to-run position', back: 'Ball held behind the Start Line by a pencil.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Each elevator type earns {0} points, each whole centimeter of loop earns {1} points, and the first tiebreaker is the {2} Score.',
    blanks: ['50', '3', 'Loop'],
    distractors: ['100', '1', 'Size'],
    explanation: 'Elevators are 50 each, the loop is 3 per cm, and Loop Score breaks ties first.',
  },
  {
    kind: 'open',
    prompt: 'Why is a tall loop usually worth a little extra device height?',
    model:
      'Each centimeter of loop height earns 3 points, but each extra centimeter of device height costs only 1 Size point. Loop Score is also the first tiebreaker.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Device fits 30 × 80 × 60 cm; ball at least 1 cm; gravity only, plus elevator machines.',
      '==Run Score = Size + Time + Elevator + Loop.==',
      'Time: 5 per full second up to the Target Time (30–60 s).',
      'Elevators 50 each, loop 3 per cm; Loop Score breaks ties first.',
    ],
  },
]);

const energy = defineDeck('rc-u2-l1', [
  {
    kind: 'title',
    title: 'Energy, friction, and the rolling ball',
    subtitle: 'The starting height is the ball’s whole energy budget for the run.',
    objectives: [
      'Apply **energy conservation** to a rolling ball.',
      'Explain why rolling balls are slower than sliding objects.',
      'Account for **friction losses** along the track.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: can a ball roll back up to exactly its starting height on a real track?',
    options: [
      'Yes, always',
      'No, it always falls a little short',
      'Only if it is heavy',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Potential to kinetic',
    image: 'b-coast-lift',
    caption:
      'A coaster train climbs the lift hill: the height it gains here is the energy it spends on the whole ride.',
    bullets: [
      'At the start, the ball has **gravitational potential energy, mgh**.',
      'As it rolls down, that energy becomes **kinetic energy**.',
      'Without losses, ==speed at any point depends only on how far it has dropped==.',
      'So the starting height limits everything the ball can do.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Without losses, what sets the ball’s speed at a point on the track?',
    options: [
      'How far it has dropped from the start',
      'How long the track is',
      'How many turns it has taken',
      'The color of the ball',
    ],
    answer: 0,
    explanation:
      'With no losses, potential energy lost equals kinetic energy gained, so speed depends only on the height dropped.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Rolling energy',
    bullets: [
      'A rolling ball has two kinds of kinetic energy: **moving forward** and **spinning**.',
      'For a solid sphere, total kinetic energy is **(7/10)mv²**, not ½mv².',
      'So after dropping h, it reaches **v = √(10gh/7)**: ==slower than a sliding object==.',
      'A **hollow ball** puts more energy into spin and is slower still.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A solid ball rolls down a drop of 0.20 m from rest, with no losses. What is its speed, in m/s?',
    answer: 1.67,
    tolerance: 0.02,
    unit: 'm/s',
    explanation: 'v = √(10gh ÷ 7) = √(10 × 9.8 × 0.20 ÷ 7) = √2.8 ≈ 1.67 m/s.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: speed after a drop',
    problem: 'A solid ball drops 0.40 m from rest without losses. Find its speed.',
    steps: [
      'Energy: mgh = **(7/10)mv²**, and the mass cancels.',
      'v = √(10gh ÷ 7) = √(10 × 9.8 × 0.40 ÷ 7) = √5.6.',
      'v ≈ **2.37 m/s**.',
    ],
    conclusion: 'About 2.4 m/s; ==a sliding object would reach about 2.8 m/s==.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Friction and losses',
    bullets: [
      'Real tracks lose energy to **rolling resistance, air drag, bumps at joints**, and sliding in curves.',
      'Each loss lowers the ball’s energy, so ==it can never climb back to its starting height==.',
      '**Smooth joints, rigid track, and gentle curves** reduce losses.',
      'Small losses add up, so measure speed at key points with video or two timing marks.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which changes reduce energy losses on the track? Select all that apply.',
    options: [
      'Smoothing the joints between track pieces',
      'Making the track rigid so it does not wobble',
      'Adding sharp, sudden turns',
      'Using gentle curves',
    ],
    answers: [0, 1, 3],
    explanation:
      'Bumps, wobbly track, and sharp turns all waste energy. Smooth joints, rigid track, and gentle curves keep it.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Height budget',
    bullets: [
      'The device is at most **60.0 cm high**, and ==every bit of height is energy==.',
      'The track must pay for the **loop**, carry the ball through timing sections, and still reach the Finish.',
      '**Elevators** lift the ball, giving it more height to spend later.',
      'Plan where each centimeter of height is used.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Halfway through the run, your ball is almost out of height but still needs to travel far. What helps most?',
    options: [
      'An elevator that lifts the ball to a higher level',
      'A steeper drop right away',
      'A lighter ball',
      'A taller Finish Line',
    ],
    answer: 0,
    explanation:
      'An elevator gives the ball new height, which is new energy to spend on the rest of the track.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Slopes and speed',
    image: 'b-coast-marble2',
    caption:
      'Gently sloping rails zig-zag a marble down slowly; the steeper the slope, the faster the ball speeds up.',
    bullets: [
      'On a slope of angle θ, a rolling solid sphere speeds up at **(5/7)g sin θ**, minus friction.',
      'On a **very gentle slope**, friction nearly balances gravity and the ball rolls slowly at a near-steady speed.',
      'That is how ==long, slow track sections== are made.',
      'Too gentle, and the ball may **stop**, ending timing.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'Ignoring friction, what is the acceleration of a rolling solid sphere on a 30° slope, in m/s²? (sin 30° = 0.5)',
    answer: 3.5,
    tolerance: 0.05,
    unit: 'm/s²',
    explanation:
      'a = (5/7) × 9.8 × 0.5 = 3.5 m/s², less than the 4.9 m/s² a sliding object would have.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Choosing a ball',
    bullets: [
      'A **heavy steel ball** rolls consistently and is less bothered by small bumps.',
      'A **light plastic ball** is slowed more by friction and air.',
      'A steel ball is fine, but ==no magnets may be used anywhere==, even hidden in the track.',
      'Test several balls and keep the **most consistent** one.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which ball is usually the most consistent run after run?',
    options: [
      'A heavy steel ball',
      'A light plastic ball',
      'A hollow ping pong ball',
      'A rubber bouncy ball',
    ],
    answer: 0,
    explanation:
      'A heavy steel ball carries more energy compared with the small losses from bumps and air, so it varies less between runs.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Gravitational potential energy', back: 'mgh, energy stored by height.' },
      { front: 'Rolling kinetic energy', back: '(7/10)mv² for a solid sphere.' },
      {
        front: 'Rolling resistance',
        back: 'Energy lost as the ball and track deform while rolling.',
      },
      { front: 'Height budget', back: 'A plan for how the starting height is spent.' },
      { front: 'Incline acceleration', back: '(5/7)g sin θ for a rolling solid sphere.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A rolling solid ball has kinetic energy of {0} m v squared, so it is {1} than a sliding object. Friction means it can never climb back to its {2} height.',
    blanks: ['7/10', 'slower', 'starting'],
    distractors: ['1/2', 'faster', 'loop'],
    explanation:
      'Spin takes part of the energy, so a rolling ball is slower, and losses keep it below its starting height.',
  },
  {
    kind: 'open',
    prompt: 'Your ball keeps stopping on a long, gentle section. Suggest two fixes.',
    model:
      'Make the slope slightly steeper so gravity beats friction, and smooth the joints or stiffen the track to reduce losses. A heavier, more consistent ball can also help it keep rolling.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Starting height is energy: mgh becomes kinetic energy.',
      '==Rolling solid ball: KE = (7/10)mv², v = √(10gh/7).==',
      'Friction and bumps steal energy; plan the 60 cm height budget.',
      'Gentle slopes make slow sections; a heavy steel ball is consistent, but no magnets.',
    ],
  },
]);

const loops = defineDeck('rc-u3-l1', [
  {
    kind: 'title',
    title: 'Loops: physics and scoring',
    subtitle:
      'A loop earns 3 points per centimeter, but only if the ball is fast enough at the top.',
    objectives: [
      'Find the **minimum speed** at the top of a loop.',
      'Calculate the **release height** a loop needs.',
      'Build a loop that meets every scoring rule.',
    ],
    image: 'b-coast-loop',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why doesn’t a coaster fall off at the top of a loop?',
    options: ['It is moving fast enough', 'Magnets hold it', 'The track grabs it', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What counts as a loop',
    bullets: [
      'A loop is a **continuously concave** section of track that appears to cross itself at a **Point of Intersection (POI)**.',
      'The two track sections must **touch at the POI**, with a clearly labeled measuring point.',
      '**Loop height** = vertical distance from the POI to the ==highest inside point of the loop==.',
      'It must be clearly labeled to count.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Where is loop height measured from and to?',
    options: [
      'From the POI up to the highest inside point of the loop',
      'From the floor to the top of the loop',
      'From the Start Line to the loop',
      'Across the widest part of the loop',
    ],
    answer: 0,
    explanation:
      'Loop height runs vertically from the Point of Intersection to the highest inside point.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Loop rules',
    bullets: [
      'The ball must **stay in contact** with the track through the loop.',
      'At the top it must be ==completely unsupported from below==, held against the track only by its speed.',
      'The track must **not be fully enclosed** anywhere in the loop.',
      'Only **one loop** may score.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which loops break the rules? Select all that apply.',
    options: [
      'A loop made from a closed tube',
      'A loop where a ledge supports the ball from below at the top',
      'An open track with side rails, ball held by its speed',
      'A loop where the ball leaves the track and drops into a cup',
    ],
    answers: [0, 1, 3],
    explanation:
      'The track cannot be enclosed, the ball must be unsupported from below at the top, and it must stay in contact all the way around.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The speed needed at the top',
    image: 'b-coast-loop',
    caption:
      'A vertical loop: the train must still be moving fast enough at the top to stay pressed against the track.',
    bullets: [
      'At the top, gravity and the track’s push together give the **centripetal force**.',
      'The ball stays on only if ==v² ≥ g r==, where r is the radius of its circular path.',
      'Slower than that, it falls away from the track.',
      'A 10 cm radius needs at least √(9.8 × 0.10) ≈ **1.0 m/s** at the top.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A loop’s path radius is 0.16 m. What is the minimum speed at the top, in m/s?',
    answer: 1.25,
    tolerance: 0.02,
    unit: 'm/s',
    explanation: 'v = √(g r) = √(9.8 × 0.16) = √1.568 ≈ 1.25 m/s.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Release height',
    bullets: [
      'For a rolling solid sphere, the minimum start is ==h ≥ 2.7 r== above the loop’s bottom, ignoring friction.',
      'The ball needs **2r** of height to reach the top, plus energy for the minimum speed and spin.',
      'Real tracks lose energy, so add a **margin**: many builders start 10 to 30 percent higher.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A loop has a 12 cm path radius. What is the ideal minimum release height above the loop bottom, in cm?',
    answer: 32.4,
    tolerance: 0.1,
    unit: 'cm',
    explanation:
      'h = 2.7 × 12 = 32.4 cm. In practice, start 10–30 percent higher to cover friction.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: release height with a margin',
    problem:
      'A loop has a 9.0 cm path radius. What is the ideal minimum release height above the loop bottom, and a practical target?',
    steps: [
      'Ideal: h = 2.7 × 9.0 = **24.3 cm**.',
      'Add a 20 percent margin for friction: 24.3 × 1.2 ≈ **29 cm**.',
      'Test from 29 cm and adjust until the loop works every run.',
    ],
    conclusion: 'Start about 29 cm above the loop bottom and ==refine by testing==.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Scoring and trade-offs',
    bullets: [
      '**Loop Score = 3 points per whole centimeter** of height: a 20 cm loop earns 60.',
      'Taller loops need more starting height, which uses the height budget.',
      'A loop earns **3 points per cm** while extra device height costs **1 Size point**.',
      '==Building the tallest reliable loop is usually worth it.==',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A loop measures 23.7 cm high. What is its Loop Score?',
    answer: 69,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Only whole centimeters count: 23 × 3 = 69 points.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a reliable loop',
    bullets: [
      'Use a **smooth, flexible track** bent into a round shape.',
      'Add **side rails** that guide the ball without enclosing it.',
      'Make the **entry and exit gradual** so the ball does not jump.',
      'Test many times: ==a loop that works nine times in ten is risky== with only two scorable runs.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'The ball keeps hopping off the track where it enters the loop. What is the best fix?',
    options: [
      'Make the entry into the loop more gradual',
      'Enclose the loop in a tube',
      'Use a hollow ball',
      'Lower the start height a lot',
    ],
    answer: 0,
    explanation:
      'A sudden change in curve makes the ball jump. A gradual entry keeps it on the track. Enclosing the loop is not allowed.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Point of Intersection (POI)', back: 'Where the loop appears to cross itself.' },
      { front: 'Loop height', back: 'Vertical distance from the POI to the highest inside point.' },
      { front: 'Centripetal force', back: 'The net inward force needed for circular motion.' },
      { front: 'Minimum top speed', back: 'v = √(g r) at the top of the loop.' },
      { front: 'Release height rule', back: 'h ≥ 2.7 r for a rolling solid sphere, no friction.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'At the top of a loop the ball needs v squared of at least g times {0}. Ideally it starts {1} times the radius above the loop bottom, and each whole centimeter of loop earns {2} points.',
    blanks: ['r', '2.7', '3'],
    distractors: ['h', '2.0', '1'],
    explanation:
      'v² ≥ g r at the top, h ≥ 2.7 r for a rolling sphere, and 3 points per cm of loop.',
  },
  {
    kind: 'open',
    prompt:
      'Your loop works 9 times out of 10 from 29 cm. What would you change before competition, and why?',
    model:
      'Raise the start a little to add margin, or smooth the entry and joints to cut losses, then test again until it works every time. With only two scorable runs, a 1-in-10 failure is too risky.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Loop height: POI to highest inside point, clearly labeled; open track, unsupported top.',
      '==At the top v² ≥ g r; start at least 2.7 r above the loop bottom, plus a margin.==',
      'Loop Score is 3 points per whole cm and the first tiebreaker.',
      'Smooth, gradual, well-tested loops are the reliable ones.',
    ],
  },
]);

const elevators = defineDeck('rc-u4-l1', [
  {
    kind: 'title',
    title: 'Elevators: levers, wheels, and pulleys',
    subtitle:
      'Two simple-machine elevators can earn 100 points and give the ball new height to spend.',
    objectives: [
      'Explain **IMA less than 1** and why elevators use it.',
      'Design a **Type 1** and a **Type 2** elevator.',
      'Use **counterweights** safely and reliably.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which simple machine have you used today?',
    options: ['A lever', 'A wheel and axle', 'A pulley', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Two elevator types',
    bullets: [
      'Up to two distinct elevator types can each earn **50 points** once.',
      '**Type 1**: a ==first-class lever + a wheel and axle==, IMA less than 1, raising the ball at least 10 cm.',
      '**Type 2**: a ==second-class lever + a pulley==, IMA less than 1, raising the ball at least 10 cm.',
      'They may appear in any order.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each elevator type to its machines.',
    pairs: [
      ['Type 1', 'First-class lever + wheel and axle'],
      ['Type 2', 'Second-class lever + pulley'],
      ['Both types', 'IMA less than 1 and a lift of at least 10 cm'],
    ],
    explanation:
      'Each type combines a lever with a second machine, has IMA below 1, and lifts the ball at least 10 cm.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'What IMA less than 1 means',
    bullets: [
      '**Ideal mechanical advantage (IMA)** = effort distance ÷ load distance.',
      'IMA less than 1 means ==the load moves farther than the effort==.',
      'A heavy counterweight moving a short distance lifts the light ball a longer distance.',
      'For combined machines, **overall IMA = the product** of the individual IMAs.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'An elevator has IMA 0.5. The effort moves 6 cm. How far does the ball rise, in cm?',
    answer: 12,
    tolerance: 0.01,
    unit: 'cm',
    explanation:
      'Load distance = effort distance ÷ IMA = 6 ÷ 0.5 = 12 cm, enough to pass the 10 cm minimum.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Type 1: lever and wheel',
    image: 'mp-levers',
    caption: 'Pliers and a wheelbarrow: effort arm r2 and load arm r1 are measured from the pivot.',
    bullets: [
      'A **first-class lever** (pivot in the middle) with a short effort arm and long load arm has IMA below 1.',
      'A **wheel and axle** with effort on the axle and load at the rim has IMA = ==axle radius ÷ wheel radius==.',
      'Combine them, for example a lever turning an axle that winds a ball cup up on a large wheel, to multiply the travel.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Effort is applied to a 1.0 cm radius axle, and the ball rides at the rim of a 5.0 cm radius wheel. What is the IMA?',
    answer: 0.2,
    tolerance: 0.005,
    explanation:
      'IMA = axle radius ÷ wheel radius = 1.0 ÷ 5.0 = 0.2. The rim moves 5 times as far as the axle surface.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Type 2: lever and pulley',
    image: 'mp-pulley',
    caption: 'A block and tackle: rope segments between the blocks share the load.',
    bullets: [
      'A **second-class lever** has the load between pivot and effort, so ==its IMA is above 1==.',
      'Pair it with a pulley set up to **multiply distance**: pulling the axle of a movable pulley makes the rope end move twice as far.',
      'Example: **1.5 × 0.5 = 0.75**, which is below 1.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: is this Type 2 legal?',
    problem:
      'A second-class lever has IMA 1.6. It drives a movable pulley inverted to give IMA 0.5. Is it legal, and how far does the ball rise if the effort moves 8 cm?',
    steps: [
      'Combined IMA = 1.6 × 0.5 = **0.8**, which is less than 1.',
      'Load distance = effort distance ÷ IMA = 8 ÷ 0.8 = **10 cm**.',
      'The ball rises exactly 10 cm, the minimum: add a small margin.',
    ],
    conclusion:
      'Legal with IMA 0.8; ==raise the effort travel slightly== so the ball rises more than 10 cm.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A second-class lever with IMA 2.5 drives a pulley with IMA 0.5. Does the combination qualify?',
    options: [
      'No, the combined IMA is 1.25, above 1',
      'Yes, the combined IMA is 0.5',
      'Yes, the combined IMA is 3.0',
      'Yes, any lever with a pulley counts',
    ],
    answer: 0,
    explanation:
      'Combined IMA = 2.5 × 0.5 = 1.25, which is not less than 1, so it does not qualify.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Counterweights and triggers',
    bullets: [
      '**Counterweights** are allowed.',
      'Often the ball rolls onto a platform or **trips a latch**, releasing a counterweight that drives the elevator.',
      'With IMA 0.5, the effort force must be ==at least twice the ball’s weight, plus friction==.',
      'Gates may be part of an elevator action, and track can be reused after the ball is lifted.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put a counterweight elevator’s action in order.',
    items: [
      'The ball rolls onto the platform',
      'It trips a latch',
      'The counterweight drops a short distance',
      'The machines lift the ball a longer distance',
      'The ball rolls on along the upper track',
    ],
    explanation:
      'The ball’s arrival triggers the counterweight, whose short, heavy drop lifts the light ball farther through the IMA-below-1 machines.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Making elevators count',
    bullets: [
      'Points count only if the ball ==reaches the track at the top==, meets every requirement, and continues on.',
      '**Label** each elevator clearly.',
      'Elevators add time, which helps with longer Target Times.',
      'Test each one many times: a stalled elevator can stop timing and lose the Time Score.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which are needed for an elevator to earn its 50 points? Select all that apply.',
    options: [
      'The ball reaches the track at the top',
      'The ball continues along the track afterward',
      'The elevator is clearly labeled',
      'The elevator uses a magnet',
    ],
    answers: [0, 1, 2],
    explanation:
      'The ball must reach the top and continue, the elevator must meet its rules and be labeled. Magnets are banned.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'IMA < 1', back: 'The load moves farther than the effort.' },
      { front: 'Type 1 elevator', back: 'First-class lever + wheel and axle, IMA < 1.' },
      { front: 'Type 2 elevator', back: 'Second-class lever + pulley, IMA < 1.' },
      { front: 'Counterweight', back: 'A mass whose fall drives an elevator.' },
      { front: 'Combined IMA', back: 'The product of the IMAs of machines in series.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'IMA equals effort distance divided by {0} distance. Combined IMA is the {1} of the parts, and each elevator must lift the ball at least {2} cm.',
    blanks: ['load', 'product', '10'],
    distractors: ['ball', 'sum', '5'],
    explanation:
      'IMA = effort ÷ load distance, machines in series multiply, and the lift must be at least 10 cm.',
  },
  {
    kind: 'open',
    prompt: 'Why do the elevator rules require an IMA less than 1 instead of greater than 1?',
    model:
      'With IMA below 1, a heavy counterweight moving a short distance lifts the light ball a long distance. That trades force for distance, which is what a ball lift needs, and it makes teams combine machines thoughtfully.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Type 1: first-class lever + wheel and axle. Type 2: second-class lever + pulley.',
      '==IMA < 1: the ball moves farther than the effort; combined IMA is a product.==',
      'Lift at least 10 cm, with a margin; counterweights and latches drive the lift.',
      'Label, test, and make sure the ball continues on the track.',
    ],
  },
]);

export const decks: Deck[] = [rules, energy, loops, elevators, ...later];
