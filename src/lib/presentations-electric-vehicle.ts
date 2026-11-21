import { defineDeck, type Deck } from './presentation-types.ts';

// Electric Vehicle (Division C) presentations. Each deck follows its lesson in the Electric
// Vehicle lessons section by section (`section` is the lesson section index), and its activities
// rehearse the lesson's scoring rules, path math, control ideas, worked example, and key terms.

const scoring = defineDeck('ev-u1-l1', [
  {
    kind: 'title',
    title: 'Scoring a run: distance, time, bottle, and pusher',
    subtitle: 'Low score wins: every centimeter, second, and violation adds points.',
    objectives: [
      'Describe the run from the **Start Point** to the final stop.',
      'Calculate **Distance Score** and **Time Score**.',
      'Apply the **Bottle Bonus** and **Pusher Bonus**.',
      'Rank which points matter most.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: in Electric Vehicle, is a higher or lower score better?',
    options: ['Higher', 'Lower', 'It depends on the run', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The task',
    bullets: [
      'The vehicle starts with its rear **Measurement Point (MP)** over the Start Point.',
      'It drives forward and catches a 500 mL **water bottle** placed 2, 3, or 4 m down the track.',
      'It pushes the bottle past a **Bottle Line** 1 to 3 m beyond the Target Point.',
      'Then it ==reverses so the MP stops as close as possible to the Target Point==, ideally at the Target Time.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put the stages of a run in order.',
    items: [
      'MP placed over the Start Point',
      'Vehicle drives forward and catches the bottle',
      'Bottle pushed past the Bottle Line',
      'Vehicle reverses, leaving the bottle',
      'MP stops near the Target Point',
    ],
    explanation:
      'The vehicle goes out past the Target Point with the bottle, then backs up to stop its MP on the Target Point.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Run Score',
    bullets: [
      '**Run Score = 100 + Distance Score + Time Score + Bonuses + Run Penalties**; ==low score wins==.',
      'The Final Score is the better of two runs.',
      '**Distance Score** = 2.0 points per cm of Vehicle Distance + 1.0 point per cm of Bottle Distance.',
      'Every centimeter of vehicle error costs **twice** as much as bottle error.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'The MP stops 10.0 cm from the Target Point and the bottle ends 8.0 cm beyond the Bottle Line. What is the Distance Score?',
    answer: 28,
    tolerance: 0.05,
    unit: 'points',
    explanation: 'Distance Score = 10.0 × 2.0 + 8.0 × 1.0 = 28 points.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Time Score',
    bullets: [
      '**Time Score = |Target Time − Run Time| × 0.5** points per second.',
      'The Target Time is 10.0 to 20.0 s in 0.5 s steps.',
      'Run Time starts at the trigger and ends when the vehicle is ==stationary for 3 seconds==; those 3 s are not counted.',
      'Pauses before moving and any rocking or recoil are counted. A 2-second miss costs only 1 point.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'The Target Time is 15.0 s and the run takes 17.4 s. What is the Time Score?',
    answer: 1.2,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Time Score = |15.0 − 17.4| × 0.5 = 2.4 × 0.5 = 1.2 points.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Bottle and pusher bonuses',
    bullets: [
      '**Bottle Bonus**: −20 points if the bottle ends fully beyond the Bottle Line.',
      'If the bottle does not get past the Target Point, or the moving-bottle rules are broken, Bottle Distance becomes **400 cm**.',
      '**Pusher Bonus** = (widest pusher opening − 35.0 cm) × 1.5.',
      'It is ==negative, and so helpful==, for any opening narrower than 35 cm.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'A pusher’s widest opening is 12.0 cm. What is its Pusher Bonus?',
    answer: -34.5,
    tolerance: 0.05,
    unit: 'points',
    explanation: 'Pusher Bonus = (12.0 − 35.0) × 1.5 = −34.5 points, applied to every run.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Penalties',
    bullets: [
      'One or more **competition violations** add 150 points to a run; one or more **construction violations** add 300.',
      'A kit vehicle without two documented modifications gets a **50-point** non-modification penalty.',
      'A **Failed Run**, such as driving the wrong way, has a Distance Score of 2500.',
      '==Missing impound adds 5000 points== to the Final Score.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'What does each problem cost?',
    bins: [
      '+150 to the run',
      '+300 to the run',
      'Distance Score of 2500',
      '+5000 to the Final Score',
    ],
    items: [
      ['Following the vehicle down the track too early', 0],
      ['A part falls off during the run', 1],
      ['The vehicle drives the wrong direction', 2],
      ['The team misses impound', 3],
    ],
    explanation:
      'Competition violations add 150, construction violations 300, a wrong-way run is a Failed Run, and missing impound adds 5000.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'What matters most',
    bullets: [
      'A narrow pusher can be worth ==about −40 points every run==; the bottle past the line is −20.',
      'Vehicle Distance costs 2 points per cm: stopping 10 cm off costs 20.',
      'Time Score is cheap by comparison.',
      'Violations and failed runs dwarf everything: **reliability and legality first**, then pusher, bottle, and stopping accuracy.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which of these costs a team the most points on one run?',
    options: [
      'A construction violation',
      'Stopping 10 cm from the Target Point',
      'Finishing 3 s off the Target Time',
      'Losing the Bottle Bonus',
    ],
    answer: 0,
    explanation:
      'A construction violation adds 300. Ten centimeters costs 20, three seconds 1.5, and losing the bottle bonus about 20.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: score a run',
    problem:
      'Target Time 14 s. Pusher opening 16.0 cm. The vehicle stops 22.5 cm from the Target Point in 16.37 s; the bottle ends 12.1 cm beyond the Bottle Line. Find the Run Score.',
    steps: [
      'Distance Score = 22.5 × 2.0 + 12.1 × 1.0 = **57.10**.',
      'Time Score = |14 − 16.37| × 0.5 = **1.19**; Bottle Bonus = **−20**.',
      'Pusher Bonus = (16.0 − 35.0) × 1.5 = **−28.50**; total = 100 + 57.10 + 1.19 − 20 − 28.50.',
    ],
    conclusion: 'Run Score = ==109.79==, matching the rules’ scoring example.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Measurement Point (MP)',
        back: 'Rearmost point of the vehicle, used for distance.',
      },
      {
        front: 'Vehicle Distance',
        back: 'Point-to-point distance from the MP to the Target Point.',
      },
      { front: 'Bottle Distance', back: 'From the Bottle Line to the bottle’s closest side.' },
      { front: 'Failed Run', back: 'A run scored with a 2500-point Distance Score.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Vehicle Distance costs {0} points per cm and Bottle Distance {1} point per cm. Time costs 0.5 points per {2}.',
    blanks: ['2.0', '1.0', 'second'],
    distractors: ['0.5', '3.0', 'centimeter'],
    explanation:
      'Vehicle error is weighted twice bottle error, and time is cheap at 0.5 points per second.',
  },
  {
    kind: 'open',
    prompt:
      'Your team has one week left. Rank where you would spend it, and justify the order using point values.',
    model:
      'First make the vehicle legal and reliable, since violations and failed runs cost hundreds of points. Then narrow the pusher while keeping capture reliable, worth up to about 40 points. Then stopping accuracy at 2 points per cm, and timing last at 0.5 points per second.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Run Score = 100 + Distance + Time + Bonuses + Penalties; low wins.',
      'Vehicle error costs 2 points per cm, bottle error 1, time 0.5 per second.',
      'The Pusher and Bottle Bonuses subtract points.',
      '==Legality and reliability first: penalties dwarf everything else.==',
    ],
  },
]);

const path = defineDeck('ev-u2-l1', [
  {
    kind: 'title',
    title: 'Planning the path: distances, geometry, and the reverse',
    subtitle: 'Turn the posted values into exact forward and reverse distances.',
    objectives: [
      'Read the **announced values** and where each is measured.',
      'Account for the offset between the **pusher** and the **MP**.',
      'Calculate the **forward leg** and **reverse leg**.',
      'Choose margins and keep the vehicle straight.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which part of your vehicle is the Measurement Point?',
    options: [
      'The rearmost point',
      'The front of the pusher',
      'The center of the axle',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Announced values',
    bullets: [
      'After impound the supervisor posts the **Target Distance** (5.00 to 9.00 m), **Target Time** (10.0 to 20.0 s), and **Bottle Line Distance** (1.00 to 3.00 m beyond the Target Point).',
      'The bottle sits on the center line 2.0 m from the Start Point at Regionals, 3.0 m at States, and 4.0 m at Nationals.',
      '==Your program must accept these values as inputs.==',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each posted value to its range.',
    pairs: [
      ['Target Distance', '5.00 to 9.00 m'],
      ['Target Time', '10.0 to 20.0 s'],
      ['Bottle Line Distance', '1.00 to 3.00 m past the Target Point'],
      ['Bottle location at States', '3.0 m from the Start Point'],
    ],
    explanation:
      'Every team gets the same values, so the program should compute its path from them.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Reference points',
    bullets: [
      'The **MP** is the rearmost point and is used for Vehicle Distance.',
      'The **bottle pusher** is the foremost part.',
      'The distance between them is roughly your vehicle length, at most 80.0 cm.',
      '==The pusher must travel farther than the MP== to move the bottle where it needs to go.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why must the program store the distance from the pusher face back to the MP?',
    options: [
      'The pusher moves the bottle, but the MP is what is measured',
      'The rules require it on the score sheet',
      'It sets the Target Time',
      'It changes the Bottle Line Distance',
    ],
    answer: 0,
    explanation:
      'The pusher face decides where the bottle ends up, while the MP decides Vehicle Distance; the offset links the two.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Forward leg',
    bullets: [
      'For the bottle to be fully beyond the Bottle Line, its ==near side must pass the line==.',
      'The bottle is 6 to 7 cm across and sits inside the pusher’s opening.',
      'So the pusher face must travel past the line by the **bottle diameter plus a margin**.',
      'MP forward travel = pusher-face position − vehicle length.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Target Distance 6.00 m, Bottle Line Distance 1.50 m, vehicle length 0.40 m, bottle 0.065 m, margin 0.03 m. How far does the MP travel forward, in metres?',
    answer: 7.195,
    tolerance: 0.003,
    unit: 'm',
    explanation:
      'The line is at 7.50 m, so the pusher face goes to 7.50 + 0.065 + 0.03 = 7.595 m. The MP trails by 0.40 m: 7.195 m.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Reverse leg',
    bullets: [
      'After pushing, the vehicle backs up until the MP is over the Target Point.',
      'The bottle only rests against the pusher, so ==reversing simply leaves it==.',
      '**Reverse distance = MP forward travel − Target Distance**.',
      'Forward errors carry into the reverse unless the vehicle measures position throughout.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Using the last answer (MP forward travel 7.195 m, Target Distance 6.00 m), how far must the vehicle reverse, in metres?',
    answer: 1.195,
    tolerance: 0.003,
    unit: 'm',
    explanation: 'Reverse = 7.195 − 6.00 = 1.195 m.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Margin choices',
    bullets: [
      'Pushing well past the line protects the −20 bonus but adds Bottle Distance at **1 point per cm**.',
      'Overshooting by 10 cm costs 10 points; missing the line costs about 20 plus the remaining distance.',
      'Most teams aim ==a few centimeters beyond==, using measured bottle slide.',
      'Bottles may slide after the vehicle stops, so test with bottles weighted to **80 to 100 g**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why aim a few centimeters past the Bottle Line rather than 20 cm past it?',
    options: [
      'Each extra centimeter adds a point of Bottle Distance',
      'The bottle must touch the line',
      'Pushing farther slows the Time Score',
      'The rules forbid pushing past 20 cm',
    ],
    answer: 0,
    explanation:
      'A small margin secures the −20 bonus; every centimeter beyond that only adds Bottle Distance at 1 point per cm.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Staying straight',
    bullets: [
      'The track is **2.0 m wide**, and the bottle sits on the center line from Start to Target.',
      'A drifting vehicle can miss the bottle or push it at an angle.',
      'Vehicle Distance is measured **point to point**, so ==sideways error counts==.',
      'Aligning at the start and matching the wheels matters as much as distance control.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'The MP stops 8.0 cm past the Target Point and 6.0 cm to the side of the center line. What is the Vehicle Distance, in centimeters?',
    answer: 10,
    tolerance: 0.05,
    unit: 'cm',
    explanation: 'Point to point: √(8.0² + 6.0²) = 10.0 cm, costing 20 points.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: both legs',
    problem:
      'Target Distance 7.00 m, Bottle Line Distance 2.00 m, vehicle length 50 cm, bottle 6.5 cm, desired margin 3 cm. How far does the MP travel forward and backward?',
    steps: [
      'The line is at 9.00 m; the pusher face must reach 9.00 + 0.065 + 0.03 = **9.095 m**.',
      'MP forward travel = 9.095 − 0.50 = **8.595 m**.',
      'Reverse = 8.595 − 7.00 = **1.595 m**.',
    ],
    conclusion:
      'About 8.60 m forward and 1.60 m back; ==the program should compute this from the posted values==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Target Distance', back: 'Start Point to Target Point, 5.00–9.00 m.' },
      { front: 'Bottle Line Distance', back: 'Target Point to Bottle Line, 1.00–3.00 m.' },
      { front: 'Vehicle length offset', back: 'Distance from the pusher face back to the MP.' },
      { front: 'Reverse leg', back: 'Backing up until the MP reaches the Target Point.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The pusher face must pass the Bottle Line by the bottle {0} plus a margin. The MP trails the pusher by the vehicle {1}, and the reverse distance is the MP’s forward travel minus the Target {2}.',
    blanks: ['diameter', 'length', 'Distance'],
    distractors: ['height', 'width', 'Time'],
    explanation:
      'Bottle diameter sets the overshoot, vehicle length sets the offset, and Target Distance sets the reverse.',
  },
  {
    kind: 'open',
    prompt: 'Why is it risky to hard-code the forward and reverse distances in your program?',
    model:
      'The Target Distance and Bottle Line Distance are announced at the tournament, so fixed numbers would be wrong. The program should take the posted values as inputs and compute both legs, including the pusher offset and margin.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Posted values change every tournament: make them inputs.',
      'The pusher moves the bottle; the MP is measured.',
      'Forward travel = line + bottle + margin − vehicle length; reverse = forward − Target Distance.',
      '==Small margins and a straight path protect both scores.==',
    ],
  },
]);

const drivetrain = defineDeck('ev-u3-l1', [
  {
    kind: 'title',
    title: 'Drivetrain and distance sensing: motors, gears, and encoders',
    subtitle: 'Count wheel rotation precisely, and distance follows.',
    objectives: [
      'Convert wheel rotation to distance with the **circumference**.',
      'Explain how **rotary encoders** and **quadrature** signals work.',
      'Choose a **gear ratio**.',
      'Calibrate and reduce distance errors.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how does your vehicle know how far it has gone?',
    options: ['Encoder counts', 'Timing at a set speed', 'It doesn’t yet', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Distance from rotation',
    image: 'ev-motor',
    caption:
      'A small DC motor like those that drive competition vehicles: each turn of its shaft can be counted.',
    bullets: [
      'Each wheel revolution moves the vehicle one **circumference, π × diameter**, if the wheel does not slip.',
      'A 6.0 cm wheel moves 18.85 cm per turn.',
      'To stop within 1 cm, you must ==count fractions of a revolution== with an encoder.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'How far does a 5.0 cm diameter wheel roll in one revolution, in centimeters?',
    answer: 15.71,
    tolerance: 0.02,
    unit: 'cm',
    explanation: 'Circumference = π × 5.0 ≈ 15.71 cm.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Encoders',
    image: 'ev-encoder',
    caption: 'A rotary encoder sends pulses as its shaft turns.',
    bullets: [
      '**Optical and magnetic quadrature encoders** give two signals that also reveal direction, which matters because the vehicle reverses.',
      '360 counts per revolution on a 6.0 cm wheel: each count is 18.85 ÷ 360 ≈ **0.052 cm**.',
      '==Mounting the encoder on the motor shaft multiplies counts by the gear ratio.==',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Quadrature: two tracks, one direction',
    image: 'ev-quadrature',
    caption:
      'Two offset tracks give two signals; whichever changes first tells the controller ==which way the wheel is turning==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An encoder gives 200 counts per wheel revolution on a 6.0 cm wheel (18.85 cm per turn). How far is each count, in centimeters?',
    answer: 0.0942,
    tolerance: 0.0005,
    unit: 'cm',
    explanation: '18.85 cm ÷ 200 counts ≈ 0.094 cm per count.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Motors and gearing',
    bullets: [
      'Small DC motors spin fast with little torque, so a **gearbox** trades speed for torque.',
      'A higher reduction gives ==more pushing force and finer control== but lower top speed.',
      'With 10 to 20 s for roughly 10 to 13 m of travel, average speeds are modest.',
      'Choose a ratio that covers the longest path within the shortest Target Time, with margin.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A team switches to a gearbox with a higher reduction. What changes?',
    options: [
      'More torque and finer control, lower top speed',
      'Less torque and higher top speed',
      'More battery voltage',
      'Nothing, gears only change direction',
    ],
    answer: 0,
    explanation:
      'More reduction multiplies torque and divides speed, so control improves but top speed falls.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Calibration',
    bullets: [
      'Real wheels compress and tire diameter varies, so calculate distance per count ==from a measured run==, not the nominal size.',
      'Drive a commanded number of counts, measure the actual distance with a tape, and adjust the conversion factor.',
      'Repeat in **both directions**: backlash and weight shift can make forward and reverse differ.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'You command 10,000 counts and the vehicle actually travels 490 cm. What is the measured distance per count, in centimeters?',
    answer: 0.049,
    tolerance: 0.0005,
    unit: 'cm',
    explanation: '490 cm ÷ 10,000 counts = 0.049 cm per count; use this, not the nominal value.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Sources of error',
    bullets: [
      '**Wheel slip** during hard acceleration or braking, uneven floors, debris, tire wear, and **gear backlash** all make encoder distance differ from true distance.',
      'Accelerate and brake smoothly, keep tires clean, and calibrate on the same floor type.',
      'Supervisor-approved substances on the vehicle must ==leave no residue==, and the track must stay dry.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which make encoder distance differ from true distance? Select all that apply.',
    options: [
      'Wheel slip under hard braking',
      'Gear backlash on reversing',
      'Dust on the tires',
      'A narrow pusher',
    ],
    answers: [0, 1, 2],
    explanation:
      'Slip, backlash, and dirty tires break the link between counts and distance. Pusher width does not.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Two wheels, one line',
    bullets: [
      'Encoders on both drive wheels let the controller compare them.',
      'If one wheel counts more, ==the vehicle is turning==; equalizing the counts keeps it straight.',
      'A single drive motor with a differential or fixed axle avoids mismatch but cannot steer corrections.',
      'Many teams use one motor and careful alignment.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'The left wheel’s encoder counts more than the right’s during a run. Which way is the vehicle curving?',
    options: ['To the right', 'To the left', 'It is going straight', 'It is reversing'],
    answer: 0,
    explanation:
      'The left wheel travels farther than the right, so the vehicle curves toward the right.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: counts for a distance',
    problem:
      'A 6.5 cm wheel drives a 100-count-per-revolution encoder through a 3:1 motor-to-wheel gear ratio, with the encoder on the motor shaft. How many counts for 8.60 m?',
    steps: [
      'Counts per wheel revolution = 100 × 3 = **300**.',
      'Distance per count = π × 6.5 ÷ 300 ≈ **0.068 cm**.',
      'Counts for 860 cm = 860 ÷ 0.068 ≈ **12,630**.',
    ],
    conclusion:
      'Command about 12,630 counts, then ==correct the factor with a measured calibration run==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Rotary encoder', back: 'Sensor that outputs pulses as a shaft turns.' },
      { front: 'Quadrature', back: 'Two offset encoder signals that reveal direction.' },
      { front: 'Backlash', back: 'Play in gears that loses motion on reversing.' },
      {
        front: 'Wheel slip',
        back: 'Wheel turning without the vehicle moving the matching distance.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'One wheel turn moves the vehicle one {0}. A {1} encoder reveals direction, and an encoder on the motor shaft multiplies counts by the {2}.',
    blanks: ['circumference', 'quadrature', 'gear ratio'],
    distractors: ['diameter', 'single-track', 'voltage'],
    explanation:
      'Distance per turn is π × d; quadrature gives direction; motor-shaft encoders gain the gear ratio.',
  },
  {
    kind: 'open',
    prompt:
      'Your vehicle stops 3 cm short going forward but lands exactly in reverse. What would you check?',
    model:
      'Calibrate the conversion factor separately for each direction, since backlash and weight shift differ. Also check for wheel slip during forward acceleration by ramping up more gently.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Distance = counts × distance per count; one turn is π × d.',
      'Quadrature encoders count direction as well as rotation.',
      'Gear for torque and control, with enough speed for the shortest time.',
      '==Calibrate from measured runs in both directions.==',
    ],
  },
]);

const control = defineDeck('ev-u4-l1', [
  {
    kind: 'title',
    title: 'Control: speed profiles, stopping, and hitting the Target Time',
    subtitle: 'A program that measures, corrects, and stops cleanly.',
    objectives: [
      'Apply the rules for **microcontrollers** and code.',
      'Plan a **trapezoidal speed profile**.',
      'Compare **open-loop** and **closed-loop** control.',
      'Stop firmly and hit the Target Time.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does your vehicle correct itself while it drives?',
    options: ['Yes, with feedback', 'No, fixed power', 'Partly', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Microcontrollers allowed',
    image: 'ev-arduino',
    caption:
      'A microcontroller board like this can read encoders and drive motors, and it is ==allowed in Electric Vehicle==.',
    bullets: [
      'Teams may program over **WiFi, Bluetooth, or USB**.',
      'The program must be **developed by the team**; shells and small online examples are fine.',
      '**Single-source programs** are prohibited.',
      'AI may help with design before competition day, but **not during event time**.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which are allowed? Select all that apply.',
    options: [
      'A microcontroller reading encoders',
      'Uploading code over USB before a run',
      'Starting from a small online motor example',
      'Copying one complete program from a single source',
    ],
    answers: [0, 1, 2],
    explanation:
      'Microcontrollers, programming links, and small starting examples are fine; single-source programs are not.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Speed profile',
    bullets: [
      'A **trapezoidal profile** accelerates gently, cruises, then decelerates before each stop.',
      'Total time includes the forward leg, the pause to reverse, the reverse leg, and settling.',
      'Given path length and Target Time, the program can compute the **cruise speed**.',
      '==Slower, smoother motion reduces slip and overshoot==, so use the full Target Time.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the phases of a run’s speed profile.',
    items: [
      'Accelerate forward',
      'Cruise forward',
      'Decelerate past the Bottle Line',
      'Pause and switch to reverse',
      'Reverse to the Target Point',
      'Settle still for 3 seconds',
    ],
    explanation:
      'Each leg ramps up, cruises, and ramps down; the run ends after the vehicle settles.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Feedback control',
    image: 'ev-pid',
    caption:
      'A **PID controller** compares the setpoint r(t) with the measurement y(t) and adds proportional, integral, and derivative terms of the error.',
    bullets: [
      '**Open-loop** control sends fixed power and hopes; **closed-loop** control measures and corrects.',
      'A **proportional** controller sets power by remaining distance, so the vehicle slows as it nears the target.',
      'Integral and derivative terms ==remove steady errors and damp overshoot==.',
      'Tune gains on the real floor with a weighted bottle.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each control idea to what it does.',
    pairs: [
      ['Open-loop control', 'Fixed commands with no measurement'],
      ['Proportional term', 'Power grows with remaining error'],
      ['Integral term', 'Removes small steady errors'],
      ['Derivative term', 'Damps overshoot'],
    ],
    explanation:
      'Closed-loop PID combines all three terms; open-loop control never checks its result.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Braking and settling',
    bullets: [
      'Run Time ends only when the vehicle has been ==still for 3 seconds==, and any rocking counts.',
      'Electronic braking by **shorting the motor**, or holding position with the controller, stops quickly.',
      'Overshoot then correction wastes time and may move the MP.',
      'A firm final stop prevents **coasting** after the program ends.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why hold the motors firmly at the final stop instead of just cutting power?',
    options: [
      'So the vehicle does not coast or rock and move the MP',
      'To raise the Pusher Bonus',
      'Because Run Time stops when power is cut',
      'To recharge the batteries',
    ],
    answer: 0,
    explanation:
      'Coasting or rocking moves the MP and keeps Run Time running; a held stop ends the run cleanly.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Timing accuracy',
    bullets: [
      'Time Score is only **0.5 points per second**, but there is no reason to waste it.',
      'Measure actual run times, including **trigger delay** and **settling**, and adjust the cruise speed.',
      'Battery voltage changes speed, so ==closed-loop speed control keeps timing steady== as batteries drain.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A run finishes 1.5 s after the Target Time. What Time Score does it earn?',
    answer: 0.75,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'Time Score = 1.5 × 0.5 = 0.75 points.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing the program',
    bullets: [
      'Test every legal combination: short and long targets, near and far bottle lines, fast and slow times.',
      'A run that works at 7 m in 15 s ==may fail at 9 m in 10 s==.',
      'Log commanded and measured values for each test.',
      'Once a run starts, you may not use or view your programming tools until the vehicle is retrieved.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which test cases stress a program the most? Select all that apply.',
    options: [
      '9.00 m Target Distance with a 10.0 s Target Time',
      'Bottle Line 3.00 m past the Target Point',
      '5.00 m Target Distance with a 20.0 s Target Time',
      'Only the values used at last year’s tournament',
    ],
    answers: [0, 1, 2],
    explanation:
      'Test the extremes: longest and fastest, farthest bottle line, shortest and slowest. Old values alone miss them.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: cruise speed',
    problem:
      'Total MP travel is 8.60 m forward plus 1.60 m back. Target Time is 15.0 s. You allow 1.0 s for each of four speed ramps, 0.5 s to reverse, and 0.3 s of settling. What cruise speed is needed?',
    steps: [
      'Time outside cruise: 4 × 1.0 + 0.5 + 0.3 = 4.8 s; cruise time = **10.2 s**.',
      'Each ramp covers about half the cruise speed for 1 s, so four ramps ≈ **2 × v**.',
      'Distance: 10.2v + 2v = 10.20 m, so **v ≈ 0.84 m/s**.',
    ],
    conclusion: 'Cruise at about 0.84 m/s, then ==fine-tune from measured run times==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Closed-loop control', back: 'Commands corrected using sensor feedback.' },
      {
        front: 'PID controller',
        back: 'Feedback with proportional, integral, and derivative terms.',
      },
      { front: 'Overshoot', back: 'Passing the target before correcting back.' },
      { front: 'Complete stop', back: 'Stationary for 3 seconds; ends Run Time.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A {0} profile accelerates, cruises, and decelerates. {1}-loop control measures and corrects, and Run Time ends after the vehicle is still for {2} seconds.',
    blanks: ['trapezoidal', 'Closed', '3'],
    distractors: ['square', 'Open', '5'],
    explanation:
      'Trapezoidal motion, closed-loop feedback, and a 3-second stop define good control.',
  },
  {
    kind: 'open',
    prompt:
      'Your vehicle overshoots the Target Point by 4 cm and then creeps back. How would you change the control?',
    model:
      'Lower the proportional gain or add a derivative term to damp the approach, and lengthen the final deceleration ramp. Then hold position with braking at the end so it does not drift or rock after stopping.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Microcontrollers are allowed; the code must be the team’s own.',
      'Plan trapezoidal moves that use the whole Target Time.',
      'Closed-loop PID control slows, corrects, and damps overshoot.',
      '==Stop firmly, then test every extreme combination.==',
    ],
  },
]);

const pusher = defineDeck('ev-u5-l1', [
  {
    kind: 'title',
    title: 'The bottle pusher: catching, pushing, and the narrow-opening bonus',
    subtitle: 'A narrow pusher earns big points only if it catches the bottle every time.',
    objectives: [
      'Apply the **pusher rules** and **moving-bottle rules**.',
      'Calculate the **Pusher Bonus** from the widest opening.',
      'Design a **funnel** and **pocket** that capture and hold the bottle.',
      'Weigh bonus size against reliability.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how wide is your pusher’s opening now?',
    options: ['Under 12 cm', '12 to 20 cm', 'Over 20 cm', 'Not built yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Pusher rules',
    bullets: [
      'The pusher attaches to the front and is the **foremost part** of the vehicle.',
      'It must be ==rigid, with no flexing, moving parts, or size changes==; only one may be impounded.',
      'Foremost edges are rounded, about a #2 pencil’s diameter or larger.',
      'It must push imperfect bottles, and **kit pushers** may not be used.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which pusher designs are legal? Select all that apply.',
    options: [
      'A rigid V-shaped pusher with rounded front edges',
      'A pusher with spring-loaded gates that close on the bottle',
      'A pusher taken from a purchased kit',
      'A rigid curved pocket that is the foremost part',
    ],
    answers: [0, 3],
    explanation:
      'Pushers must be rigid, rounded, team-built, and foremost. Moving gates and kit pushers are not allowed.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The bottle',
    bullets: [
      'A clear single-use **500 mL** water bottle, 6 to 7 cm across and 18 to 22 cm tall.',
      'Weighted to **80–100 g** with metal BBs, not liquid.',
      'It must ==stay upright and on the floor==, may only be pushed, and only the pusher may touch it.',
      'No part of the vehicle may go under it, and nothing beyond the measured opening may contact it.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each bottle specification to its value.',
    pairs: [
      ['Volume', '500 mL'],
      ['Diameter', '6 to 7 cm'],
      ['Mass', '80 to 100 g, weighted with BBs'],
      ['Height', '18 to 22 cm'],
    ],
    explanation:
      'Test with bottles across these ranges so the pusher handles any bottle the supervisor uses.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Measuring the opening',
    bullets: [
      'The supervisor measures the pusher’s **widest opening** to 0.1 cm; teams without one use 35.0 cm.',
      '**Pusher Bonus = (opening − 35.0) × 1.5**.',
      'A 10 cm opening gives −37.5 points on every run; a 30 cm opening only −7.5.',
      '==One of the largest single sources of points in the event.==',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'What is the Pusher Bonus for a 10.0 cm opening?',
    answer: -37.5,
    tolerance: 0.05,
    unit: 'points',
    explanation: '(10.0 − 35.0) × 1.5 = −37.5 points.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Capture geometry',
    bullets: [
      'A narrow pusher only works ==if the bottle enters it==.',
      'A **V or funnel** guides a slightly off-center bottle into a **pocket**.',
      'The opening must exceed the 6–7 cm bottle plus your expected **lateral error** at the bottle.',
      'If the vehicle drifts 1.5 cm at 3 m, a 10–11 cm opening with a centering V is reasonable.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'What sets the narrowest opening a team can safely use?',
    options: [
      'Bottle diameter plus the vehicle’s sideways error at the bottle',
      'The Target Time',
      'The vehicle’s length',
      'The battery voltage',
    ],
    answer: 0,
    explanation:
      'The bottle must fit even when the vehicle arrives a little off center, so lateral error sets the margin.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Pushing stably',
    bullets: [
      'A tall, light bottle ==tips if pushed too high or too hard==.',
      'Contact low on the bottle, near its base, and accelerate gently once it is captured.',
      'A **curved pocket** keeps the bottle from sliding sideways.',
      'Test with 80 g and 100 g bottles and slightly dented ones.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'The bottle tips over as soon as the vehicle speeds up. What is the best fix?',
    options: [
      'Push lower on the bottle and accelerate more gently',
      'Raise the pusher to the bottle’s cap',
      'Use a heavier bottle of your own',
      'Make the opening wider',
    ],
    answer: 0,
    explanation:
      'Low contact and gentle acceleration keep the bottle upright; teams cannot supply their own bottle.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Releasing the bottle',
    bullets: [
      'When the vehicle reverses, the bottle should stay where it is.',
      'A pocket ==with no hooks== lets the bottle simply remain as the vehicle backs away.',
      'Decelerate smoothly before reversing so the bottle does not roll too far.',
      'Measure how far it slides after the vehicle stops and include that in the path plan.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why should a pocket have no hooks or lips around the bottle?',
    options: [
      'So the bottle stays behind when the vehicle reverses',
      'Hooks make the opening narrower',
      'Hooks are required to be metal',
      'So the bottle can be lifted',
    ],
    answer: 0,
    explanation:
      'The bottle only rests against the pusher, so reversing leaves it in place; a hook would drag it back.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: narrow or reliable?',
    problem:
      'A 9.0 cm pusher catches the bottle in 8 of 10 tests; a 15.0 cm pusher in 10 of 10. A miss costs about 420 points (400 cm bottle penalty plus no bonus).',
    steps: [
      'Bonuses: 9.0 cm → **−39.0**; 15.0 cm → **−30.0**.',
      'Expected miss cost: 9.0 cm → 0.2 × 420 = **84**; 15.0 cm → **0**.',
      'Expected net: 9.0 cm ≈ **+45**; 15.0 cm ≈ **−30**.',
    ],
    conclusion:
      'The reliable 15.0 cm pusher is ==about 75 points better on average==, despite its smaller bonus.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A 12.0 cm pusher (bonus −34.5) misses the bottle in 1 of 10 runs, and a miss costs 420 points. What is its expected net effect per run, in points?',
    answer: 7.5,
    tolerance: 0.05,
    unit: 'points',
    explanation:
      'Expected miss cost = 0.1 × 420 = 42; net = 42 − 34.5 = +7.5 points, worse than a reliable wider pusher.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Widest opening', back: 'Measured mouth of the pusher, used for the bonus.' },
      { front: 'Funnel (V) entry', back: 'Angled guides that center an offset bottle.' },
      { front: 'Pocket', back: 'Where the captured bottle rests.' },
      { front: 'Lateral error', back: 'Sideways offset of the vehicle from the center line.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The Pusher Bonus is the opening minus {0} cm, times 1.5. A {1} entry centers the bottle, and the pusher should contact the bottle {2} near its base.',
    blanks: ['35.0', 'funnel', 'low'],
    distractors: ['20.0', 'hooked', 'high'],
    explanation: 'Bonus = (opening − 35.0) × 1.5; a funnel centers; low contact prevents tipping.',
  },
  {
    kind: 'open',
    prompt: 'How would you decide how narrow to make your competition pusher?',
    model:
      'Measure my vehicle’s sideways error at the bottle location over many runs, add that to the bottle diameter with a small margin, and test capture rates at a few widths. I would pick the narrowest width that catches essentially every time, since a miss costs far more than the extra bonus.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'A rigid, rounded, team-built pusher is the foremost part.',
      'Bonus = (opening − 35.0) × 1.5 on every run.',
      'Funnel in, push low, release cleanly.',
      '==Reliability beats width: one miss erases many runs of bonus.==',
    ],
  },
]);

const power = defineDeck('ev-u6-l1', [
  {
    kind: 'title',
    title: 'Power, construction limits, and legal parts',
    subtitle: 'Eight AA cells, a firm Measurement Point, and parts the rules allow.',
    objectives: [
      'Apply the **battery** and **energy storage** rules.',
      'Check size and construction limits.',
      'Build a rigid **Measurement Point**.',
      'Use kits and code legally.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which battery chemistry does your vehicle use?',
    options: ['NiMH AA', 'Alkaline AA', 'Something else', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Batteries',
    image: 'ev-aa',
    caption:
      'Labeled rechargeable **NiMH AA** cells: legal, removable, and 1.2 V each when charged.',
    bullets: [
      'All electrical energy for any purpose comes from ==at most eight AA batteries==.',
      'Each is a commercial AA with its original label, **1.2 to 1.5 V** when fully charged, individually removable.',
      '**Lithium and lead** batteries are prohibited; teams using them get participation points only.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which power source is legal for an Electric Vehicle?',
    options: [
      'Six labeled NiMH AA cells in a holder',
      'A lithium-ion 18650 pack',
      'Ten labeled alkaline AA cells',
      'A sealed lead-acid battery',
    ],
    answer: 0,
    explanation:
      'Up to eight labeled AA cells of 1.2–1.5 V are allowed. Lithium, lead, and more than eight cells are not.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'No extra energy storage',
    image: 'ev-supercap',
    caption:
      'Supercapacitors store energy and release it fast, which is exactly why they are ==banned on the vehicle==.',
    bullets: [
      'Devices that let the vehicle exceed the battery’s instantaneous energy, such as **large capacitors or springs**, are not allowed.',
      'Propulsion must be electric, from the AA batteries.',
      'Alignment devices may have their own power, but **lasers** are prohibited everywhere and **cameras** are banned.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each item allowed on or with the vehicle?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['A motor driver chip', 0],
      ['A 1 F supercapacitor to boost acceleration', 1],
      ['A wound spring that helps launch the vehicle', 1],
      ['A laser pointer for aiming', 1],
      ['A battery-powered non-laser sighting device', 0],
    ],
    explanation: 'Electronics are fine, but extra energy storage, lasers, and cameras are banned.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Size and parts',
    bullets: [
      'No longer than **80.0 cm** and no wider than **35.0 cm** at any point.',
      'All parts move together: ==no anchors, tethers, ramps, or separate pieces==.',
      'Only wheels or treads, and parts already touching the floor at the start, may contact the floor.',
      'Pieces falling off during a run, and remote control, are **construction violations**.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which are construction violations? Select all that apply.',
    options: [
      'A string tether to the start',
      'A sensor cover that falls off mid-run',
      'Steering the vehicle with a remote',
      'A vehicle 75 cm long and 30 cm wide',
    ],
    answers: [0, 1, 2],
    explanation:
      'Tethers, lost parts, and remote control break the rules; 75 × 30 cm is within the size limits.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The Measurement Point',
    bullets: [
      'The MP must be the **rearmost** part, at most **1.0 cm** above the track, and easy to measure.',
      'A skewer tip, pencil tip, or wire end works.',
      'It is used for every distance, so it ==must be rigid==.',
      'A wobbling MP moves after stopping; glue it firmly and check it after every test.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which makes the best Measurement Point?',
    options: [
      'A glued, rigid skewer tip at the rear, 0.5 cm above the floor',
      'A flexible wire whisker 3 cm above the floor',
      'The front edge of the pusher',
      'A piece of tape on the rear axle',
    ],
    answer: 0,
    explanation:
      'The MP must be rearmost, rigid, easy to measure, and no more than 1.0 cm above the track.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Kits and code',
    bullets: [
      'Kits are allowed with ==at least two functional modifications==, documented on the **Kit Modification Form** and impounded.',
      'Kit pushers are not allowed, and kits may supply only common parts, not custom circuit boards.',
      'The program must be developed by a team member; **single-source programs** are prohibited.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A team builds from a kit and makes one modification. What happens?',
    options: [
      'A 50-point non-modification penalty',
      'Nothing; one modification is enough',
      'The vehicle cannot run',
      'A 5000-point penalty',
    ],
    answer: 0,
    explanation:
      'Kits need two documented functional modifications; otherwise the run takes a 50-point penalty.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Design knowledge',
    bullets: [
      'Participants must answer questions about **design, construction, and operation**.',
      'Be ready to explain drivetrain, sensing, control algorithm, battery choice, and pusher geometry.',
      'A neat, labeled wiring layout ==speeds inspection and repairs== during the 8-minute event time.',
      'Spare batteries and a printed wiring diagram help too.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: what must change?',
    problem:
      'A vehicle uses six NiMH AA cells, a motor driver chip, a microcontroller, a 1 F supercapacitor to boost acceleration, and a laser pointer for aiming. What must change?',
    steps: [
      'Six labeled NiMH AAs, a motor driver, and a microcontroller are **allowed**.',
      'The supercapacitor is an ==energy storage device that can exceed battery power==: remove it.',
      'The laser pointer is prohibited: replace it with a **non-laser** sighting device.',
    ],
    conclusion: 'Remove the supercapacitor and the laser; the rest is legal.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'AA battery', back: 'Labeled cell, 1.2–1.5 V charged; up to eight allowed.' },
      {
        front: 'Energy storage device',
        back: 'A capacitor or spring that could exceed battery power; banned.',
      },
      {
        front: 'Kit Modification Form',
        back: 'Records two functional changes to a kit; impounded.',
      },
      { front: 'Tether', back: 'A physical connection to the vehicle during a run; banned.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'All energy comes from at most {0} AA batteries. The vehicle may be at most {1} cm long, and the MP must be the {2} part.',
    blanks: ['eight', '80.0', 'rearmost'],
    distractors: ['six', '35.0', 'foremost'],
    explanation: 'Eight AA cells maximum, 80.0 cm long by 35.0 cm wide, and a rearmost MP.',
  },
  {
    kind: 'open',
    prompt: 'A supervisor asks you to explain your stopping method. What would you say?',
    model:
      'Describe the encoder counts the program converts to distance, the deceleration ramp and feedback that slow the vehicle near the target, and the braking that holds it still. Point to the calibration log that shows the stopping error.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Up to eight labeled AA cells; no lithium or lead.',
      'No capacitors, springs, lasers, or cameras for extra energy or aiming.',
      'Stay within 80.0 × 35.0 cm with nothing tethered or falling off.',
      '==A rigid, rearmost MP makes every careful stop count.==',
    ],
  },
]);

const competition = defineDeck('ev-u7-l1', [
  {
    kind: 'title',
    title: 'Competition day: impound, check-in, and running',
    subtitle: 'Eight minutes, two runs, and a pencil to start each one.',
    objectives: [
      'List what to **impound**.',
      'Follow the **check-in** rules.',
      'Start and run the vehicle correctly.',
      'Avoid failed runs and know the **tiebreakers**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how long does it take you to enter posted values and set up a run?',
    options: ['Under 1 minute', '1 to 3 minutes', 'Over 3 minutes', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Impound',
    bullets: [
      'Impound happens before the first time slot.',
      'Impound **one vehicle**, batteries stored separately, spare parts, any alignment device, the Kit Modification Form if used, and papers.',
      'Impounding more than one vehicle is a **construction violation** on all runs.',
      '==Missing impound adds 5000 points== to the Final Score.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Should each item be impounded?',
    bins: ['Impound it', 'Do not impound'],
    items: [
      ['The vehicle', 0],
      ['The alignment device', 0],
      ['The Kit Modification Form', 0],
      ['A second, backup vehicle', 1],
    ],
    explanation:
      'Impound one vehicle with its spares, alignment device, and forms. A second vehicle is a violation.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Check-in',
    bullets: [
      'After values are announced, teams retrieve items when told.',
      'The supervisor inspects the vehicle, **measures the pusher opening**, and points out violations, which teams may fix during event time.',
      'Once check-in starts, participants ==may not leave, get outside help, use AC outlets, or use AI==.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which are not allowed once check-in starts? Select all that apply.',
    options: [
      'Asking a coach for help',
      'Charging a laptop from a wall outlet',
      'Asking an AI tool to adjust the code',
      'Fixing a violation the supervisor pointed out',
    ],
    answers: [0, 1, 2],
    explanation:
      'Outside help, AC power, and AI are banned after check-in; fixing pointed-out violations is allowed.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Event time',
    bullets: [
      '**8 minutes** to adjust, repair, and make two runs.',
      'A vehicle ==ready to run before time expires== may finish its run.',
      'Teams may verify track dimensions and clean the track but must keep it dry, and may not tape the floor.',
      'No rolling the vehicle on the track floor before or after runs.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which is allowed on the track during event time?',
    options: [
      'Measuring the track’s dimensions',
      'Taping a guide line on the floor',
      'Wiping the floor with a wet cloth',
      'Rolling the vehicle to test the wheels',
    ],
    answer: 0,
    explanation:
      'Teams may verify dimensions and dry-clean the track, but may not tape it, wet it, or roll the vehicle on it.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Starting a run',
    bullets: [
      'Place the MP over the Start Point within about 1 cm, with the body on the target side.',
      'The vehicle stays put untouched; tell the supervisor you are ready, and event time pauses while they check.',
      'Start it with a ==vertical motion of an unsharpened #2 pencil==; only the pencil may touch the vehicle.',
      'If it does not move, no run occurred.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the start of a run.',
    items: [
      'Enter the posted values into the program',
      'Place the MP over the Start Point',
      'Move the alignment device behind the Start Point',
      'Tell the supervisor you are ready',
      'Trigger with a vertical pencil motion',
    ],
    explanation:
      'Program, place, clear the alignment device, signal ready, then trigger with the pencil.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'During and after',
    bullets: [
      'Alignment devices stay within the track area, not fixed to the floor, and move behind the Start Point before the run.',
      '==Do not follow the vehicle down the track before being called==: that is a competition violation.',
      'The supervisor measures Run Time, Vehicle Distance, and Bottle Distance, and checks the bottle rules.',
      'Violations are reported at the end of each run.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A team member walks beside the moving vehicle to watch the bottle. What happens?',
    options: [
      'A competition violation adds 150 points to the run',
      'Nothing, watching is allowed',
      'The run becomes a Failed Run',
      'The team is disqualified',
    ],
    answer: 0,
    explanation:
      'Following the vehicle before being called is a competition violation: +150 points to that run.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Failed runs and ties',
    bullets: [
      'A run **fails** if the vehicle goes the wrong way, starts before the supervisor is ready, cannot be measured, or is pushed.',
      'A team with only one successful run in 8 minutes gets a Failed Run as its second.',
      'Ties go to the ==better Distance Score==, then lower Time Score, then better Vehicle Distance, then the narrower pusher.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the tiebreakers, first to last.',
    items: [
      'Better Distance Score',
      'Lower Time Score',
      'Better Vehicle Distance',
      'Narrower pusher',
    ],
    explanation:
      'Distance Score decides first, then Time Score, then Vehicle Distance, then pusher width.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: 1:30 left',
    problem:
      'With 1:30 left in event time, a team’s first run was successful. Its vehicle now has a loose wire. What should it do?',
    steps: [
      'Without a second run, it counts as failed, but ==the first still scores==.',
      'Fix the wire quickly, re-enter the posted values if needed, and place the vehicle ready to run.',
      'Signal ready before time expires; a **ready vehicle may complete its run**.',
    ],
    conclusion:
      'The better of two runs counts, so a quick, careful second run can only help if it is clean.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Event time', back: 'Eight minutes to adjust and make two runs.' },
      { front: 'Ready-to-run', back: 'Vehicle placed at the start, waiting for the trigger.' },
      { front: 'Pencil trigger', back: 'Unsharpened #2 pencil used with a vertical motion.' },
      { front: 'Alignment device', back: 'A non-laser sighting aid used within the track area.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Teams get {0} minutes of event time. The vehicle is started with an unsharpened {1}, and missing impound adds {2} points.',
    blanks: ['8', 'pencil', '5000'],
    distractors: ['10', 'finger', '500'],
    explanation: 'Eight minutes, a pencil trigger, and a 5000-point impound penalty.',
  },
  {
    kind: 'open',
    prompt: 'Write a short checklist your team would follow between run one and run two.',
    model:
      'Check the MP and pusher are still rigid, check battery voltage, confirm the posted values in the program, re-align at the Start Point, move the alignment device behind the start, signal ready, and trigger with the pencil, all while watching the clock.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Impound one vehicle and everything it needs.',
      'After check-in: no leaving, help, AC power, or AI.',
      'Pencil start, no following, and keep the track dry and untaped.',
      '==Two clean runs in eight minutes; ties go to Distance Score first.==',
    ],
  },
]);

export const decks: Deck[] = [scoring, path, drivetrain, control, pusher, power, competition];
