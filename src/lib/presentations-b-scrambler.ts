import { defineDeck, type Deck } from './presentation-types.ts';
import { scramblerDecksLate } from './presentations-b-scrambler-2.ts';

// Scrambler (Division B) presentations. Each deck follows its lesson in the Division B Scrambler
// course section by section (`section` is the lesson section index), at a middle-school level.

const rules = defineDeck('scr-u1-l1', [
  {
    kind: 'title',
    title: 'Rules and the low-score system',
    subtitle:
      'Carry a raw egg to a target, stop on your own, and keep the score as low as you can.',
    objectives: [
      'Describe the vehicle, energy, and egg requirements.',
      'Calculate a run score with distance, time, and the Can Bonus.',
      'Explain why accuracy matters more than speed.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in Scrambler, which do you think matters most?',
    options: ['Going fast', 'Stopping close to the target', 'Keeping the egg safe', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The task',
    bullets: [
      'Build a vehicle that carries a **raw egg** from the Start Point toward a **Target Point** 7.00 to 10.00 m away.',
      'It must ==stop automatically== as close to the Target Point as possible.',
      'A **Terminal Barrier**, a hard wall at least 25 cm tall, stands at the Target Point.',
      'The egg must survive, and ==the lowest score wins==.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Energy and size limits',
    bullets: [
      'All propulsion energy comes from a **falling mass** of no more than 2.00 kg.',
      'The falling mass may not touch the floor, so teams use a **cushion**.',
      'Ready to run, everything (egg, mass, cushion) fits in a box with a 100.0 × 50.0 cm base and 100.0 cm height.',
      '==No electronics==, no remote control, and no tether.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which of these are NOT allowed on a Scrambler? Choose all that apply.',
    options: [
      'A battery-powered motor',
      'A 1.50 kg falling mass',
      'A remote-control brake',
      'A cushion under the falling mass',
      'A string tied from the vehicle to a team member',
    ],
    answers: [0, 2, 4],
    explanation:
      'Energy must come only from a falling mass of 2.00 kg or less, so a motor is out. Remote control and tethers are banned. A 1.50 kg mass and a cushion are both fine.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Building a Run Score',
    steps: [
      { label: 'Start at 100', detail: 'Every run begins with a **base of 100** points.' },
      {
        label: 'Distance Score',
        detail: '**2.0 points per cm** from the egg’s tip to the Target Point.',
      },
      { label: 'Time Score', detail: 'The run time in seconds: **1 point per second**.' },
      { label: 'Can Bonus', detail: 'A ==negative== number that lowers the score.' },
      { label: 'Penalties', detail: 'Added for violations. The better of two runs counts.' },
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: score a run',
    problem:
      'A run stops 12.4 cm from the Target Point in 5.31 s, with an Inside Can Distance of 60.0 cm and no violations.',
    steps: [
      'Distance Score = 2.0 × 12.4 = **24.80**; Time Score = **5.31**.',
      'Can Bonus = −0.5 × (110 − 60.0) = **−25.00**.',
      'Run Score = 100 + 24.80 + 5.31 − 25.00.',
    ],
    conclusion:
      'The Run Score is ==105.11==. The Can Bonus cancelled out most of the distance points.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A run stops 8.0 cm from the Target Point in 4.50 s, with no Can Bonus and no penalties. What is the Run Score?',
    answer: 120.5,
    tolerance: 0.05,
    unit: 'points',
    explanation: 'Run Score = 100 + (2.0 × 8.0) + 4.50 = 100 + 16.0 + 4.50 = 120.5 points.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Failed runs and penalties',
    bullets: [
      'A **Failed Run** scores a Distance Score of ==2500 points== and a time of zero.',
      'A **competition violation** adds 150 points; a **construction violation** adds 300.',
      'Kits need at least two documented functional modifications, or a penalty applies.',
      '==Breaking the egg is a competition violation.==',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each event to what it adds to the run.',
    pairs: [
      ['Failed Run', '2500-point Distance Score'],
      ['Competition violation', '+150 points'],
      ['Construction violation', '+300 points'],
      ['Narrow gap between the cans', 'A negative Can Bonus'],
    ],
    explanation:
      'A failed run is far worse than any normal run. Violations add 150 or 300 points, and the Can Bonus is the only part that lowers the score.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Accuracy beats speed',
    columns: ['Change', 'Points saved', 'How hard is it?'],
    rows: [
      ['Stop 5 cm closer', '**10 points**', 'Better calibration and braking'],
      ['Run 10 s faster', '10 points', 'Most runs only take a few seconds already'],
      ['Stop 1 cm closer', '**2 points**', 'Each centimeter counts double'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which change lowers the score more?',
    options: [
      'Stopping 5 cm closer to the target',
      'Finishing 5 seconds faster',
      'They lower it the same amount',
      'Neither changes the score',
    ],
    answer: 0,
    explanation:
      'Five centimeters is worth 2 × 5 = 10 points, but five seconds is worth only 5 points. Focus first on precise stopping and a safe egg.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Tiebreakers',
    bullets: [
      'First: the better **Vehicle Distance** of the scored run.',
      'Then: the lower **Time Score** of the scored run.',
      'Then: the better Vehicle Distance, then Time Score, of the ==non-scored run==.',
    ],
    callout:
      'Because both runs can matter, try to make your second run strong even after a good first run.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the tiebreakers in the order they are used.',
    items: [
      'Vehicle Distance of the scored run',
      'Time Score of the scored run',
      'Vehicle Distance of the non-scored run',
      'Time Score of the non-scored run',
    ],
    explanation:
      'Ties are broken by the scored run first (distance, then time), then by the non-scored run (distance, then time).',
  },
  {
    kind: 'fill',
    section: 2,
    prompt: 'Complete the scoring rule.',
    text: 'Run Score = {0} + Distance Score + Time Score + Can Bonus + Run Penalties. The Distance Score is {1} points per centimeter, and the {2} score wins.',
    blanks: ['100', '2.0', 'lowest'],
    distractors: ['50', '1.0', 'highest'],
    explanation:
      'Every run starts at 100. Each centimeter of Vehicle Distance costs 2.0 points, and the lowest final score wins.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Target Point', back: 'The point 7.00 to 10.00 m from the Start Point.' },
      { front: 'Terminal Barrier', back: 'A hard wall at least 25 cm tall at the Target Point.' },
      { front: 'Vehicle Distance', back: 'Distance from the egg’s tip to the Target Point.' },
      { front: 'Failed Run', back: 'A run given a 2500-point Distance Score.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'A **falling mass** of up to 2.00 kg powers a vehicle that carries a raw egg and stops on its own.',
      'Run Score = 100 + 2.0 per cm + 1 per second + Can Bonus + penalties; ==lowest wins==.',
      'A broken egg or failed run is very costly, so **reliability comes first**.',
      'Each centimeter costs twice as much as each second.',
    ],
  },
]);

const energy = defineDeck('scr-u2-l1', [
  {
    kind: 'title',
    title: 'Energy from a falling mass',
    subtitle:
      'How a dropping weight becomes a moving vehicle, and how much energy you really need.',
    objectives: [
      'Calculate gravitational potential energy available.',
      'Trace energy from the mass to the vehicle.',
      'Choose how much energy the run actually needs.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'A falling weight can do work',
    image: 'thermo-joule',
    caption:
      'In this famous 1800s experiment, a **falling weight** on a cord turns a paddle wheel. A Scrambler uses the same idea to turn its wheels.',
    bullets: [
      'A mass m dropping height h releases **potential energy mgh**.',
      '2.00 kg falling 0.80 m: 2.00 × 9.8 × 0.80 ≈ ==15.7 J==.',
      'The size box limits how far the mass can fall, and the cushion takes up some height.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'How much energy does a 1.00 kg mass release when it falls 0.70 m? Use g = 9.8 m/s².',
    answer: 6.86,
    tolerance: 0.05,
    unit: 'J',
    explanation: 'Energy = mgh = 1.00 × 9.8 × 0.70 = 6.86 J. Not all of it will reach the vehicle.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Where the energy goes',
    steps: [
      { label: 'Drop', detail: 'The mass releases **mgh**.' },
      { label: 'Transfer', detail: 'Strings, pulleys, and axles carry energy to the wheels.' },
      { label: 'Losses', detail: '**Friction** in bearings and pulleys turns some into heat.' },
      { label: 'Leftover', detail: 'Some stays as motion of the falling mass itself.' },
      {
        label: 'Vehicle',
        detail:
          'The rest becomes the vehicle’s **kinetic energy**, then is lost to rolling and braking.',
      },
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt:
      'A vehicle travels less far than the energy calculation predicted. Which could explain it?',
    options: [
      'Friction in the pulleys and bearings',
      'The falling mass still moving when it hits the cushion',
      'Rolling resistance of the wheels',
      'Energy vanishing because the mass is under 2.00 kg',
    ],
    answers: [0, 1, 2],
    explanation:
      'Friction, energy left in the falling mass, and rolling resistance all take energy away from forward travel. A lighter mass gives less energy to start with, but energy never just vanishes.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Two architectures',
    columns: ['Design', 'How it works', 'Watch out for'],
    rows: [
      [
        '**On-board mass**',
        'The mass rides on the vehicle and drives the wheels as it drops.',
        'Extra mass to carry; must fit the size box',
      ],
      [
        '**Launcher**',
        'A separate stand drops the mass, which pulls the vehicle with a string, then lets go so it ==coasts==.',
        'String release must be clean and repeatable',
      ],
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'In a launcher design, what does the vehicle do after the string lets go?',
    options: ['It coasts', 'It speeds up', 'It reverses', 'It stops instantly'],
    answer: 0,
    explanation:
      'The launcher’s string pulls the vehicle forward and then releases it, so the vehicle coasts the rest of the way.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'How much energy is enough?',
    bullets: [
      'You only need enough energy to cover the target distance against **rolling resistance**.',
      'Extra energy means ==more speed==, which makes stopping harder and cracks eggs.',
      'Many teams use less than 2.00 kg or a shorter drop.',
      'Tune the energy so the vehicle reaches the stop at a **moderate speed**.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Speed and kinetic energy',
    bullets: [
      'Kinetic energy is **½mv²**.',
      '==Doubling speed quadruples kinetic energy==, which the brake must remove.',
      'A 0.60 kg vehicle at 2.0 m/s has 1.2 J; at 4.0 m/s it has 4.8 J.',
      'Time only costs 1 point per second, so a moderate speed is usually the better trade.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A 0.60 kg vehicle moves at 3.0 m/s. What is its kinetic energy?',
    answer: 2.7,
    tolerance: 0.05,
    unit: 'J',
    explanation: 'KE = ½mv² = 0.5 × 0.60 × 3.0² = 0.5 × 0.60 × 9.0 = 2.7 J.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: top speed',
    problem:
      'A 1.50 kg mass falls 0.60 m. If 40 percent of the energy reaches a 0.50 kg vehicle as kinetic energy, what is its top speed?',
    steps: [
      'Energy released = 1.50 × 9.8 × 0.60 ≈ **8.8 J**.',
      'To the vehicle: 0.40 × 8.8 ≈ **3.5 J**.',
      'v = √(2E ÷ m) = √(2 × 3.5 ÷ 0.50) ≈ 3.7 m/s.',
    ],
    conclusion: 'Top speed is about ==3.7 m/s==, which may be faster than the egg needs.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'If a vehicle’s speed doubles, its kinetic energy becomes:',
    options: ['Twice as large', 'Four times as large', 'Half as large', 'The same'],
    answer: 1,
    explanation:
      'KE = ½mv², so doubling v multiplies KE by 2² = 4. The brake must remove four times the energy.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Consistency',
    bullets: [
      'For precise stopping, ==every run should deliver the same energy==.',
      'Use the **same mass, release height, and string routing** each time.',
      'Check that strings do not slip or tangle and that pulleys spin freely.',
      'Mark the release height on the frame so it never drifts between runs.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Does each habit make runs more consistent or less consistent?',
    bins: ['More consistent', 'Less consistent'],
    items: [
      ['Marking the release height on the frame', 0],
      ['Using whatever mass is handy that day', 1],
      ['Routing the string the same way each run', 0],
      ['Ignoring a pulley that squeaks', 1],
      ['Using the same mass every run', 0],
    ],
    explanation:
      'Same mass, same height, and same string path give the same energy each run. Changing parts and sticky pulleys add variation.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Gravitational potential energy', back: 'mgh, released as the mass falls.' },
      { front: 'Kinetic energy', back: '½mv² of a moving object.' },
      { front: 'Launcher', back: 'A separate stand that holds and drops the mass.' },
      { front: 'Rolling resistance', back: 'Energy lost as the wheels roll.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'A falling mass releases **mgh**: 2.00 kg over 0.80 m gives about 15.7 J.',
      'Friction, the moving mass, and rolling resistance all take a share.',
      '**Kinetic energy grows with speed squared**, so extra speed makes stopping harder.',
      '==Use just enough energy, the same way every run.==',
    ],
  },
]);

const drivetrain = defineDeck('scr-u3-l1', [
  {
    kind: 'title',
    title: 'Drivetrains: turning a drop into distance',
    subtitle: 'A short fall of string can drive a long run if the axle and wheels are sized right.',
    objectives: [
      'Relate drop height, axle size, and wheel size to distance.',
      'Choose a gear or pulley ratio.',
      'Design low-friction axles and wheels.',
    ],
  },
  {
    kind: 'flow',
    section: 0,
    title: 'String and axle',
    steps: [
      { label: 'Pull', detail: 'The falling mass pulls a string wound on the **drive axle**.' },
      { label: 'Turn', detail: 'String length L unwinds the axle L ÷ (2πr) times.' },
      { label: 'Roll', detail: 'Each turn moves the vehicle one **wheel circumference**, 2πR.' },
      { label: 'Travel', detail: 'Distance ≈ ==L × R ÷ r==, ignoring slip.' },
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A mass pulls 0.80 m of string off an axle of radius 0.40 cm. The wheels have radius 4.0 cm. About how far does the vehicle travel?',
    answer: 8,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Distance ≈ L × R ÷ r = 0.80 m × (4.0 ÷ 0.40) = 0.80 × 10 = 8.0 m.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The distance ratio',
    bullets: [
      'The **distance ratio** R ÷ r multiplies the string length.',
      'To go 9 m with 0.8 m of string you need R ÷ r ≈ 11, such as a 0.4 cm axle with 4.5 cm wheels.',
      'A larger ratio goes farther but ==pushes less hard==, so the vehicle speeds up more slowly.',
      'Choose a ratio that covers the **longest possible target** (10.00 m) with margin.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: is the ratio big enough?',
    problem:
      'A vehicle has a 0.50 cm axle radius and 4.0 cm wheel radius. The mass pulls 0.75 m of string. About how far can it be driven?',
    steps: [
      'Distance ratio = 4.0 ÷ 0.50 = **8**.',
      'Distance ≈ 0.75 m × 8 = **6.0 m**.',
      'The shortest target is 7.00 m, so this is too short.',
    ],
    conclusion: '==Increase the ratio== (a thinner axle or larger wheels) or the string length.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Doubling the wheel radius with the same axle and string does what to the driven distance?',
    options: ['Doubles it', 'Halves it', 'Quadruples it', 'No change'],
    answer: 0,
    explanation:
      'Driven distance ≈ L × R ÷ r. Doubling R doubles the distance, if the wheels do not slip.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Pulleys trade force for distance',
    image: 'mp-pulley',
    caption:
      'A block and tackle shares a load among several rope segments. Arranged the other way, pulleys can ==turn a short fall into a long pull==.',
    bullets: [
      'If the mass moves 1 cm while the string moves 2 cm, distance **doubles** and force **halves**.',
      'Launcher designs often use pulleys to stretch the mass’s short fall.',
      'Every pulley adds **friction**, so use only what you need.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A pulley setup makes the string move 3 cm for every 1 cm the mass falls. Compared with no pulleys, the pull on the string is:',
    options: [
      'About one third as strong',
      'Three times as strong',
      'The same',
      'Nine times as strong',
    ],
    answer: 0,
    explanation:
      'Pulleys trade force for distance. Three times the distance means about one third of the force, minus some friction.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Wheels',
    bullets: [
      '**Large, light, true** wheels roll with less resistance and cover more distance per turn.',
      'Wheels must be round and centered, or the vehicle ==wobbles and veers==.',
      'Thin rubber bands or O-rings on the rims improve **traction**.',
      'Measure wheel diameter precisely: calibration depends on it.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Axles and bearings',
    bullets: [
      'Friction in axles wastes energy and makes runs **inconsistent**.',
      'Use straight, smooth axles in low-friction **bearings** or bushings.',
      'Keep wheels perpendicular to axles and ==axles parallel to each other==.',
      'Test: a gentle push by hand should make the vehicle roll straight and far.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Does each choice help or hurt the drivetrain?',
    bins: ['Helps', 'Hurts'],
    items: [
      ['Smooth axles in bearings', 0],
      ['A wobbly, off-center wheel', 1],
      ['O-rings on the wheel rims', 0],
      ['Axles that are not parallel', 1],
      ['Large, light wheels', 0],
      ['Extra pulleys you do not need', 1],
    ],
    explanation:
      'Bearings, traction rings, and large light wheels reduce losses and slip. Wobble, misalignment, and unneeded pulleys waste energy and add error.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'String management',
    bullets: [
      'Wind the string **neatly** so the effective axle radius stays constant.',
      'If string piles up, the effective radius changes and ==the run no longer matches your calibration==.',
      'A small hook or hole lets the string **release** when fully unwound, so it does not rewind or snag.',
      'Use strong, low-stretch line.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why should the string wind neatly in a single layer on the axle?',
    options: [
      'So the effective axle radius stays constant from run to run',
      'So the falling mass gets heavier',
      'So the string stretches more',
      'So the wheels grip the floor better',
    ],
    answer: 0,
    explanation:
      'Distance depends on R ÷ r. If the string piles up, r changes partway through the run, so the distance per centimeter of drop no longer matches the calibration.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Complete the drivetrain rule.',
    text: 'Each axle turn moves the vehicle one wheel {0}. Driven distance is about string length times wheel radius divided by {1} radius.',
    blanks: ['circumference', 'axle'],
    distractors: ['diameter', 'pulley'],
    explanation:
      'One turn rolls the wheel through its circumference, 2πR, and the distance ratio is wheel radius over axle radius.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Drive axle', back: 'The axle turned by the string.' },
      { front: 'Distance ratio', back: 'Wheel radius divided by axle radius.' },
      { front: 'Wheel circumference', back: '2πR, the distance moved per wheel turn.' },
      { front: 'Bearing', back: 'A part that supports an axle with low friction.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Driven distance ≈ **string length × R ÷ r**.',
      'A bigger ratio goes farther but pushes less hard.',
      'Pulleys trade force for distance, at the cost of friction.',
      '==True wheels, smooth bearings, and neat string== keep runs consistent.',
    ],
  },
]);

const stopping = defineDeck('scr-u4-l1', [
  {
    kind: 'title',
    title: 'Automatic stopping',
    subtitle: 'Count the axle turns, trigger the brake, and land the egg right at the target.',
    objectives: [
      'Design a turn-counting stopping mechanism.',
      'Convert target distance to axle turns.',
      'Reduce stopping error from skid and overrun.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why automatic stopping?',
    bullets: [
      'The **stopping mechanism** must be entirely inside the vehicle and work on its own.',
      'No remote control or tether.',
      'Pre-loaded energy like a spring may ==work the brake==, but may not push the vehicle.',
      'The Distance Score is the biggest part of the score, so the brake is the **heart of the design**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A rubber band snaps a brake pad onto the wheel. Is that allowed?',
    options: [
      'Yes, pre-loaded energy may operate the brake if it does not propel the vehicle',
      'No, only the falling mass may store any energy',
      'Only if the band is under 1 cm long',
      'Only with a remote trigger',
    ],
    answer: 0,
    explanation:
      'Springs and rubber bands may operate the brake. They may not push the vehicle forward; that energy must come from the falling mass.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Threaded rod and wing nut',
    image: 'mp-pitch',
    caption:
      'A screw pitch gauge shows that every thread has a fixed **pitch**: one turn always moves a nut the same distance along it.',
    bullets: [
      'A threaded rod is the axle, or is geared to it.',
      'A **wing nut** rides along the threads, held from spinning by a guide.',
      'After a set number of turns, the nut ==hits a stop or releases the brake==.',
      'Setting the nut’s starting position sets the distance.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Put the wing-nut stopping sequence in order.',
    items: [
      'Set the nut’s starting position for the target',
      'Release the mass so the axle starts turning',
      'The nut travels along the threads with each turn',
      'The nut reaches the stop and triggers the brake',
      'The vehicle stops near the target',
    ],
    explanation:
      'The nut position is set first. Each axle turn moves the nut a fixed amount until it trips the brake.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Turns from distance',
    bullets: [
      'Distance per axle turn = wheel circumference = **πd**.',
      'Target 8.50 m with 8.00 cm wheels: each turn moves 25.13 cm.',
      'Turns needed = 850 ÷ 25.13 ≈ ==33.8 turns==.',
      'Vehicle Distance is measured from the **egg tip**, so measure where the tip sits.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Wheels are 6.0 cm in diameter. How far does one axle turn move the vehicle?',
    answer: 18.8,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'Distance per turn = πd = 3.1416 × 6.0 ≈ 18.8 cm.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: setting the turns',
    problem:
      'Target 8.00 m. Wheels are 6.00 cm in diameter. The vehicle skids 4 cm after the brake triggers, and the egg tip starts on the Start Point. How many turns should the nut allow?',
    steps: [
      'Circumference = π × 6.00 ≈ **18.85 cm**.',
      'Distance before braking = 800 − 4 = **796 cm**.',
      'Turns = 796 ÷ 18.85 ≈ 42.2.',
    ],
    conclusion: 'Set the nut for about ==42.2 turns==, then check it with real runs.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A target is 9.00 m and the wheels are 7.00 cm in diameter. Ignoring skid, how many axle turns are needed? Round to one decimal place.',
    answer: 40.9,
    tolerance: 0.1,
    unit: 'turns',
    explanation: 'Circumference = π × 7.00 ≈ 21.99 cm. Turns = 900 ÷ 21.99 ≈ 40.9.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Braking choices',
    columns: ['Brake', 'Good', 'Risk'],
    rows: [
      ['**Sudden lock** or pin in the axle', 'Little skid', 'Can ==crack the egg=='],
      ['**Slow, soft** brake', 'Gentle on the egg', 'Skids or rolls on unpredictably'],
      ['**Firm, even** pressure', 'Repeatable stop', 'Needs testing from full speed'],
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Calibration',
    bullets: [
      '**Calibration** connects nut position (turns) to actual stopping distance.',
      'Run several settings, measure where the egg tip stops, and fit a line or table.',
      'Use it to choose the setting for any target.',
      '==Recheck on a floor like the competition floor==: floors change skid distance.',
    ],
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Sources of error',
    image: 'xd-prec-lowacc',
    caption:
      'Tightly grouped hits away from the center: **precise but not accurate**. A vehicle that stops in the same wrong place needs a calibration fix.',
    bullets: [
      'Wheel slip, a curving path, string variation, and uneven braking all add error.',
      'Run many tests at one setting to measure the **spread**, then attack the largest cause.',
      'Stopping within ==2 to 3 cm== every time is very competitive.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Sort each problem by the kind of fix it needs.',
    bins: ['Shift the calibration', 'Reduce the spread'],
    items: [
      ['Every run stops 6 cm short', 0],
      ['Runs stop anywhere from 2 cm short to 9 cm long', 1],
      ['The brake grabs differently each time', 1],
      ['Always overshoots by the same 3 cm', 0],
      ['The string sometimes slips on the axle', 1],
    ],
    explanation:
      'A steady offset is fixed by adjusting the setting. Scattered stops come from inconsistent parts, which must be fixed in the vehicle itself.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Stopping mechanism', back: 'Automatic, in-vehicle device that halts the vehicle.' },
      { front: 'Threaded rod', back: 'A screw that moves a nut a fixed distance per turn.' },
      { front: 'Wing nut', back: 'A nut that travels along the threads to trigger the brake.' },
      { front: 'Calibration', back: 'Linking a setting to the actual stopping distance.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'A **threaded rod and wing nut** count axle turns and trigger the brake.',
      'Turns = distance ÷ (π × wheel diameter), corrected for skid and egg-tip position.',
      'A firm, even brake beats both a slam and a slow drag.',
      '==Calibrate on a similar floor== and shrink the spread one cause at a time.',
    ],
  },
]);

export const decks: Deck[] = [rules, energy, drivetrain, stopping, ...scramblerDecksLate];
