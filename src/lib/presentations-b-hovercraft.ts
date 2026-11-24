import { defineDeck, type Deck } from './presentation-types.ts';

// Hovercraft (Division B) presentations. Each deck follows its lesson in the Hovercraft lessons
// section by section (`section` is the lesson section index), and its activities rehearse the
// lesson's scoring rules, physics, worked example, and key terms.

const scoring = defineDeck('hovb-u1-l1', [
  {
    kind: 'title',
    title: 'Scoring a run: Distance, Time, and Mass',
    subtitle: 'Three scores add up to 100 points, and every one rewards control over raw speed.',
    objectives: [
      'Calculate **Distance**, **Time**, and **Mass Scores** for complete and incomplete runs.',
      'Explain how the ramp and penalties change a run score.',
      'Decide how many nickels to carry.',
    ],
    image: 'hov-srn4',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what wins more Hovercraft points?',
    options: [
      'The fastest vehicle',
      'The vehicle closest to the Target Time',
      'The heaviest vehicle',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The run score',
    bullets: [
      '**Run Score = DS + TS + MS**, and the Final Score is the best run.',
      'A **complete run** crosses the finish within 2 × TT without a 3-second stall: full DS of 40.',
      'Time Score adds up to 40 more; Mass Score adds up to 20.',
      '==A perfect run scores 100.==',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each part of the run score to its maximum.',
    pairs: [
      ['Distance Score', '40 points'],
      ['Time Score', '40 points (accuracy)'],
      ['Mass Score', '20 points'],
      ['Perfect run', '100 points'],
    ],
    explanation:
      'A complete run earns the full 40 for distance, accuracy earns up to 40 for time, and carrying every nickel earns 20.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Time Score rewards accuracy',
    bullets: [
      'Every team gets the same **Target Time (TT)**, between 6.0 and 18.0 s.',
      'Complete run: **TS = 40 × (1 − |runtime − TT| ÷ TT)**, never below zero.',
      'Missing by 10 percent of TT costs 4 points.',
      '==Early and late are penalized equally==, so the goal is accuracy, not speed.',
      'An incomplete run earns no Time Score at all.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'TT is 10.0 s and a complete run takes 9.0 s. What is the Time Score?',
    answer: 36,
    tolerance: 0.1,
    unit: 'points',
    explanation:
      'The error is 1.0 s, which is 10 percent of TT. TS = 40 × (1 − 1.0 ÷ 10.0) = 36. Running 11.0 s would score the same.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Incomplete runs',
    bullets: [
      'A run is **incomplete** if the vehicle stops moving for 3 s before the finish, or the dowel has not crossed within 2 × TT.',
      'The supervisor measures the dowel’s distance **d** from the finish line.',
      '**DS = 40 × (185 − d) ÷ 185**: stopping 37 cm short earns 32.',
      'Teams ==cannot declare a run incomplete themselves==.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A vehicle stalls with its dowel 74 cm short of the finish. What is its Distance Score?',
    answer: 24,
    tolerance: 0.1,
    unit: 'points',
    explanation:
      'DS = 40 × (185 − 74) ÷ 185 = 40 × 111 ÷ 185 = 24. Its Time Score is 0, because the run is incomplete.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Mass Score',
    bullets: [
      '**MS = (4R + 0.1N) × (185 − d) ÷ 185**, with R rolls (a half roll counts 0.5) and N loose nickels.',
      'The supervisor provides 4 full rolls, 1 half roll, and 20 loose nickels.',
      'Carrying everything: 4 × 4.5 + 0.1 × 20 = ==20, the maximum==.',
      'Anything that falls off during the run does not count.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A complete run carries 2 full rolls, the half roll, and 10 loose nickels. What is the Mass Score?',
    answer: 11,
    tolerance: 0.05,
    unit: 'points',
    explanation:
      'R = 2.5 and N = 10, so MS = 4 × 2.5 + 0.1 × 10 = 11. A complete run has d = 0, so nothing is prorated.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The ramp',
    bullets: [
      'A supervisor-provided ramp, 5 cm high and 41 cm long, ends 4 cm behind the start line.',
      'It gives a **running start**, but a ramp run’s DS is multiplied by 0.5 and its MS is set to 0.',
      'The ramp can rescue a weak vehicle, but ==it caps a run at about 60 points==.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'What is the most a perfect, complete ramp run can score?',
    options: ['100 points', '80 points', '60 points', '40 points'],
    answer: 2,
    explanation:
      'DS is halved to 20, TS can still reach 40, and MS is 0, so the ceiling is 60. Use the ramp only when the vehicle cannot finish without it.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Penalties and ties',
    bullets: [
      'Each **construction violation** multiplies DS, TS, and MS by 0.8.',
      'Each **competition violation** multiplies them by 0.9; missing impound by 0.7.',
      'Anything falling off the vehicle is one construction penalty.',
      '==Touching the vehicle during a run makes DS, TS, and MS all zero.==',
      'Ties are broken first by the best Time Score over all runs.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'What does each event do to the run’s scores?',
    bins: ['× 0.8', '× 0.9', '× 0.7', 'All become 0'],
    items: [
      ['A loose nickel falls off mid-run', 0],
      ['A construction violation', 0],
      ['A competition violation', 1],
      ['The team missed impound', 2],
      ['A team member touches the moving vehicle', 3],
    ],
    explanation:
      'Lost parts count as a construction penalty (× 0.8), competition violations cost × 0.9, missed impound × 0.7, and touching the vehicle zeroes the run.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: score a complete run',
    problem:
      'TT is 12.0 s. A vehicle carries 3 rolls and 10 loose nickels and finishes in 13.2 s with nothing falling off. Find the run score.',
    steps: [
      '**DS = 40**, because the run is complete.',
      'TS = 40 × (1 − 1.2 ÷ 12.0) = **36.00**.',
      'MS = (4 × 3 + 0.1 × 10) × 185 ÷ 185 = **13**.',
    ],
    conclusion: 'Run score = 40 + 36.00 + 13 = ==89.00==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Target Time (TT)', back: 'The run time every team aims for, 6.0–18.0 s.' },
      { front: 'Distance Score', back: '40 when complete; prorated by distance when not.' },
      { front: 'Incomplete run', back: 'Stalls 3 s, or fails to finish within 2 × TT.' },
      { front: 'Construction violation', back: 'A rule break that multiplies the run by 0.8.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A complete run earns a Distance Score of {0}. The Time Score depends on how close the run is to the {1}, and an {2} run earns no Time Score.',
    blanks: ['40', 'Target Time', 'incomplete'],
    distractors: ['20', 'fastest time', 'early'],
    explanation:
      'Completion gives the full 40 for distance, accuracy to TT drives the Time Score, and incomplete runs get no Time Score.',
  },
  {
    kind: 'open',
    prompt:
      'Your vehicle times well empty but sometimes stalls with all the nickels. How would you decide what to carry on run one?',
    model:
      'Compare expected points: a stall loses all 40 Time Score points and prorates Distance and Mass, while a lighter load gives up a few Mass points. Carry the load you can finish with reliably, and keep the heavier load for a run you have calibrated.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Run Score = DS + TS + MS, and the best run counts.',
      'Time Score rewards accuracy to TT; early and late cost the same.',
      'Incomplete runs lose all Time Score and prorate DS and MS.',
      '==Avoid stalls, lost parts, and touches: they cost more than nickels earn.==',
    ],
  },
]);

const levitation = defineDeck('hovb-u2-l1', [
  {
    kind: 'title',
    title: 'Levitation: the air cushion and the skirt',
    subtitle: 'A tiny pressure under a large area lifts the whole vehicle off the track.',
    objectives: [
      'Calculate the **cushion pressure** needed to float a vehicle.',
      'Explain why a larger footprint and a good skirt reduce leakage.',
      'Test levitation the way a supervisor will.',
      'Compare separate and shared lift fans.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how much extra pressure do you think floats a 1 kg hovercraft?',
    options: [
      'About one-thousandth of atmospheric',
      'About half of atmospheric',
      'About double atmospheric',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Floating on pressure',
    image: 'hov-scheme',
    caption:
      'A **lift fan** pumps air under the hull faster than it escapes, so the cushion pressure rises slightly above atmospheric.',
    bullets: [
      'Extra pressure × cushion area must equal weight: **P = W ÷ A**.',
      '9.8 N (1 kg) over a 30 × 30 cm cushion needs only about 109 Pa.',
      'That is ==roughly one-thousandth of atmospheric pressure==.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A 1.2 kg hovercraft (weight 11.76 N) has a 0.30 m × 0.40 m cushion. What cushion pressure does it need, in pascals?',
    answer: 98,
    tolerance: 2,
    unit: 'Pa',
    explanation: 'Area = 0.30 × 0.40 = 0.12 m², so P = 11.76 ÷ 0.12 = 98 Pa above atmospheric.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Why area helps',
    bullets: [
      'Required pressure is weight ÷ area, so a **larger footprint** floats the same vehicle on lower pressure.',
      'Lower pressure ==leaks less air== through the edge gap, so the fan does less work.',
      'The vehicle must fit a 40 × 40 × 40 cm box when levitated and run in a 45 cm wide track.',
      'Most teams use nearly the full footprint allowed.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A team doubles its cushion area without changing the vehicle’s weight. What happens to the pressure it needs?',
    options: ['It doubles', 'It halves', 'It stays the same', 'It quadruples'],
    answer: 1,
    explanation:
      'P = W ÷ A, so doubling A halves P. Lower pressure also means less air leaking out at the edges.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The skirt',
    image: 'hov-skirt',
    caption:
      'The flexible **skirt** around this hovercraft holds the cushion air in while letting the craft ride over bumps.',
    bullets: [
      'A **bag skirt** inflates into a tube; a **finger skirt** uses many small pockets that conform to the surface.',
      'Plastic sheet, such as a trash bag or shower curtain, is common on competition vehicles.',
      '==The skirt should touch lightly==; dragging hard creates friction.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each skirt idea to its description.',
    pairs: [
      ['Bag skirt', 'Inflates into one continuous tube'],
      ['Finger skirt', 'Many small pockets that each conform'],
      ['Trash-bag plastic', 'A common light skirt material'],
      ['A skirt pressing hard on the floor', 'Adds friction and slows the run'],
    ],
    explanation:
      'Both skirt styles contain the cushion; light plastic works well, but the skirt should only kiss the surface.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Leakage and hover gap',
    bullets: [
      'Air escapes through the **hover gap** between skirt and floor.',
      'Leak rate grows with the gap length around the perimeter and with the ==square root of cushion pressure==.',
      'A smooth, even skirt keeps the gap small and uniform.',
      'If one side leaks more, the vehicle **tilts and drifts toward it**: check that it sits level and centered with motors running.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'The left side of a skirt leaks more air than the right. What will the vehicle tend to do?',
    options: [
      'Tilt and drift toward the left',
      'Tilt and drift toward the right',
      'Rise higher on the left',
      'Nothing, leaks even out',
    ],
    answer: 0,
    explanation:
      'The leaky side loses cushion support and sinks, so the craft tilts and drifts toward it. Fix the skirt so the gap is even.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Testing levitation',
    image: 'hov-underside',
    caption:
      'Underside of a homemade hovercraft: lift air enters the cushion through the holes and must leak out evenly all the way around.',
    bullets: [
      'The rules require the vehicle to **levitate on a cushion of air**; the supervisor may push it down slightly to see it rise.',
      'Contact with the track surface or the inside of the rails is allowed, ==not the top or outside of the rails==.',
      'Home test: with lift running, the vehicle should glide a long way after a gentle push.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each kind of contact allowed during a run?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['Skirt brushing the track surface', 0],
      ['Bumper sliding along the inside of a rail', 0],
      ['Part of the hull riding on top of a rail', 1],
      ['An arm reaching around the outside of a rail', 1],
    ],
    explanation:
      'The track surface and the inside faces of the rails may be touched; the tops and outsides of the rails may not.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Sharing power between lift and thrust',
    columns: ['', 'Separate lift fan', 'One fan, split flow'],
    rows: [
      ['Motors', 'Two: one for lift, one for thrust', 'One fan feeds cushion and rear duct'],
      ['Tuning', '==Set lift and thrust independently==', 'Changing speed changes both'],
      ['Mass', 'More motor and battery mass', 'Lighter'],
      ['Rules', 'Up to **two motors**; all lift and thrust from air pressure', 'Same rules'],
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which statements about Hovercraft power are true? Select all that apply.',
    options: [
      'A team may use up to two motors',
      'All lift and thrust must come from air pressure',
      'A separate lift fan makes timing calibration easier',
      'Driven wheels may help push the vehicle',
    ],
    answers: [0, 1, 2],
    explanation:
      'Two motors at most, all force from air, and independent lift makes thrust easier to tune. Wheels would break the air-pressure rule.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: cushion pressure',
    problem:
      'A hovercraft with nickels weighs 1.6 kg and has a 0.35 m × 0.35 m cushion. What cushion pressure is needed?',
    steps: [
      'Weight = 1.6 × 9.8 ≈ **15.7 N**.',
      'Area = 0.35 × 0.35 = **0.1225 m²**.',
      'P = 15.7 ÷ 0.1225 ≈ **128 Pa**.',
    ],
    conclusion:
      'About 128 Pa above atmospheric, which ==a small fan can supply easily if leaks are controlled==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Cushion pressure', back: 'Pressure above atmospheric under the hull; W ÷ A.' },
      { front: 'Footprint', back: 'The area of the air cushion under the vehicle.' },
      { front: 'Hover gap', back: 'The small opening where cushion air escapes.' },
      { front: 'Pascal (Pa)', back: 'One newton per square metre.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Cushion pressure equals weight divided by {0}. A larger footprint needs {1} pressure, and the {2} holds the air in while touching the track lightly.',
    blanks: ['area', 'lower', 'skirt'],
    distractors: ['mass', 'higher', 'propeller'],
    explanation:
      'P = W ÷ A, so more area means lower pressure and less leakage; the skirt contains the cushion.',
  },
  {
    kind: 'open',
    prompt:
      'With all the nickels aboard, your rear skirt drags and the craft stops quickly. Name two fixes and explain why each helps.',
    model:
      'Move the load forward so the loaded center of mass sits over the cushion center, which levels the hull and evens the gap. Or raise lift flow or enlarge the footprint, so the cushion pressure needed falls and the skirt lifts clear.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Lift needs only about 100 Pa: P = W ÷ A.',
      'A bigger footprint lowers pressure and leakage.',
      'An even, lightly touching skirt keeps the craft level and straight.',
      '==All lift and thrust come from air, with at most two motors.==',
    ],
  },
]);

const thrust = defineDeck('hovb-u3-l1', [
  {
    kind: 'title',
    title: 'Thrust, friction, and motion down the track',
    subtitle:
      'Newton’s laws explain how the vehicle speeds up, holds a pace, and crosses the line.',
    objectives: [
      'Apply **Newton’s second and third laws** to thrust and load.',
      'Explain why low friction makes small effects matter.',
      'Relate start position and speed profile to run time.',
      'Keep the vehicle straight and moving to the finish.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what pushes a hovercraft forward?',
    options: [
      'Air pushed backward pushes back on the craft',
      'The cushion air',
      'Wheels under the skirt',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Newton’s laws',
    image: 'hov-propeller',
    caption:
      'This propeller once drove an SR.N4 hovercraft: it pushes air backward, and ==the air pushes the craft forward==.',
    bullets: [
      'Third law: action and reaction, so **thrust** comes from accelerating air rearward.',
      'Second law: **a = F_net ÷ m**, where net force is thrust minus drag and skirt friction.',
      'Heavier loads mean slower acceleration for the same thrust.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'Thrust is 0.30 N and drag plus skirt friction is 0.10 N on a 1.0 kg vehicle. What is its acceleration, in m/s²?',
    answer: 0.2,
    tolerance: 0.005,
    unit: 'm/s²',
    explanation: 'Net force = 0.30 − 0.10 = 0.20 N, so a = 0.20 ÷ 1.0 = 0.20 m/s².',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Low friction is the point',
    bullets: [
      'Floating on air removes most **rolling and sliding friction**, so even a small thrust accelerates the vehicle.',
      'There is also ==little to slow it==: a gentle tilt in the floor can speed it up or slow it down.',
      'Small surface differences matter, so tournaments describe their track surface ahead of time.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Your vehicle runs faster in one direction down your hallway than the other. What is the most likely cause?',
    options: [
      'A slight slope in the floor',
      'The Target Time changed',
      'The skirt is too large',
      'The dowel is too tall',
    ],
    answer: 0,
    explanation:
      'With almost no friction, a gentle slope adds or removes noticeable force. Calibrate on a level surface like the tournament’s.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Starting and the timed zone',
    bullets: [
      'The vehicle starts fully behind the start line, held by the supervisor’s wood block.',
      'Timing starts when the **dowel crosses the start line** and stops when it crosses the finish 185 cm later.',
      'Starting farther back gives more run-up before timing starts: ==start position is a tuning variable==.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Put the start of a run in order.',
    items: [
      'Vehicle placed fully behind the start line',
      'Supervisor holds the wood block at its front',
      'Countdown ends and the block is removed',
      'Dowel crosses the start line: timing starts',
      'Dowel crosses the finish 185 cm later: timing stops',
    ],
    explanation:
      'The block holds the vehicle until launch, and the timed zone runs from the dowel crossing the start line to it crossing the finish.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Speed profile',
    bullets: [
      'A vehicle that keeps accelerating crosses the zone faster and faster.',
      'With enough drag it approaches a **terminal speed**, where thrust equals drag.',
      '==A steady speed through the zone is easiest to predict.==',
      '**Average speed = 185 cm ÷ run time**: a 12 s target needs about 15.4 cm/s.',
      'Measure speed at a few points to see whether the vehicle is still accelerating in the zone.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'What average speed, in cm/s, crosses the 185 cm timed zone in a 16.0 s Target Time?',
    answer: 11.56,
    tolerance: 0.05,
    unit: 'cm/s',
    explanation: 'Average speed = 185 cm ÷ 16.0 s ≈ 11.56 cm/s.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Staying straight',
    bullets: [
      'The track is only **45 cm wide**, and rails stop sideways drift.',
      'Scraping a rail loses speed ==unpredictably==, which ruins timing because each run touches differently.',
      'Align the **thrust line through the center of mass** and balance the load side to side.',
      'Use smooth bumpers or rounded corners so any rail contact is light and consistent.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which changes make rail contact lighter and more consistent? Select all that apply.',
    options: [
      'Aim the thrust line through the center of mass',
      'Balance the nickels side to side',
      'Fit smooth, rounded bumpers',
      'Add sharp corners to grip the rails',
    ],
    answers: [0, 1, 2],
    explanation:
      'Centered thrust and balanced load keep the craft straight; rounded bumpers make any contact gentle. Sharp corners snag.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Stopping',
    bullets: [
      'A cushioned barrier sits at least 5 cm past the finish.',
      'Timing ends at the finish line, so the vehicle ==does not need to stop on its own==.',
      'It must not stall before the line: a 3-second stall makes the run **incomplete**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A slow vehicle creeps to a halt 8 cm before the finish line and sits there for 3 seconds. What happens?',
    options: [
      'The run is incomplete and earns no Time Score',
      'Timing pauses until it moves again',
      'The supervisor gives it a push',
      'It scores a full Distance Score',
    ],
    answer: 0,
    explanation:
      'A 3-second stall before the finish makes the run incomplete: no Time Score, and Distance and Mass Scores are prorated by the 8 cm.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: required speed and load',
    problem:
      'A hovercraft must cross 185 cm in 12.0 s at steady speed, entering the zone already at speed. What speed is required, and how does adding 0.2 kg affect it?',
    steps: [
      'Average speed = 185 cm ÷ 12.0 s ≈ **15.4 cm/s**.',
      'Extra mass lowers acceleration from the same thrust (**a = F ÷ m**).',
      'At steady speed drag balances thrust, but the vehicle reaches that speed more slowly and skirt friction may rise.',
    ],
    conclusion:
      '==Recalibrate thrust whenever you change the load==: the same setting gives a slower run with more nickels.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Thrust', back: 'Forward force from pushing air backward.' },
      { front: 'Net force', back: 'Thrust minus drag and friction; sets acceleration.' },
      { front: 'Terminal speed', back: 'The speed where drag equals thrust.' },
      { front: 'Center of mass', back: 'Balance point of the loaded vehicle.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Acceleration equals net force divided by {0}. Timing starts when the {1} crosses the start line, and a {2}-second stall before the finish makes the run incomplete.',
    blanks: ['mass', 'dowel', '3'],
    distractors: ['thrust', 'skirt', '5'],
    explanation:
      'Newton’s second law gives a = F ÷ m; the dowel triggers timing; a 3-second stall ends the run.',
  },
  {
    kind: 'open',
    prompt:
      'Your vehicle is still accelerating when it crosses the finish. Why is that a problem for hitting TT, and how could you fix it?',
    model:
      'Its speed in the zone depends sensitively on start position, voltage, and floor slope, so times vary. Starting farther back or adding drag lets it reach a steady speed before the zone, which makes run time more predictable.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Thrust comes from pushing air backward; a = F_net ÷ m.',
      'Near-zero friction makes floor slope and load matter.',
      'Start position and a steady zone speed make time predictable.',
      '==Run straight, touch rails lightly, and never stall before the line.==',
    ],
  },
]);

const electrical = defineDeck('hovb-u4-l1', [
  {
    kind: 'title',
    title: 'The electrical system: batteries, motors, and speed control',
    subtitle: 'Legal parts, a safe voltage, and an analog knob that sets your speed.',
    objectives: [
      'Identify **allowed and banned** electrical components.',
      'Apply the battery rules and the **12.0 V** limit.',
      'Use series, parallel, and resistance to set motor speed.',
      'Plan for battery sag and the safety rules.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how would you control a Hovercraft’s speed without a microcontroller?',
    options: ['A variable resistor', 'Fewer batteries', 'A smaller propeller', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Allowed parts',
    bullets: [
      'Allowed: batteries, wires and holders, **mechanical switches**, relays, resistors (including potentiometers and rheostats), capacitors.',
      'Up to **two motors**, which may be brushless.',
      '**Integrated circuits** are banned unless they are a manufactured part of a commercial motor; lasers are banned.',
      '==No microcontrollers==, so timing control must be analog or mechanical.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each component allowed on a Hovercraft?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['Potentiometer', 0],
      ['Relay', 0],
      ['Brushless motor', 0],
      ['Microcontroller board', 1],
      ['Laser pointer for aiming', 1],
      ['Capacitor', 0],
    ],
    explanation:
      'Passive parts, switches, relays, and up to two motors are fine. Integrated circuits such as microcontrollers, and all lasers, are banned.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Battery rules',
    image: 'hov-nimh',
    caption:
      'Labeled **nickel-metal hydride (NiMH)** AA cells, about 1.2 V each, are a common legal choice.',
    bullets: [
      'Only commercial batteries with their ==original, visible labels== may power the motors.',
      '**Lithium and lead** batteries are prohibited.',
      'Expected voltage between any two points must stay **at or below 12.0 V**, calculated from labels.',
      'Batteries are stored separately at impound.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which battery choice is legal for a Hovercraft?',
    options: [
      'A labeled lithium-polymer drone pack',
      'Six labeled 1.5 V alkaline AA cells in series',
      'A small sealed lead-acid battery',
      'AA cells with their labels removed',
    ],
    answer: 1,
    explanation:
      'Six alkaline cells give 9.0 V, under the limit, with labels intact. Lithium and lead chemistries are banned, and labels must stay visible.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Series and parallel',
    bullets: [
      'Cells in **series** add their voltages: four 1.2 V NiMH cells give 4.8 V.',
      'Cells in **parallel** keep the same voltage but share the current, so the pack lasts longer.',
      'Motor speed rises with voltage: ==series sets speed==, parallel helps hold voltage under load.',
      'Track total voltage against the 12.0 V limit.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'What voltage do two parallel strings of four 1.5 V alkaline cells give?',
    answer: 6,
    tolerance: 0.05,
    unit: 'V',
    explanation:
      'Each series string is 4 × 1.5 = 6.0 V. Putting two strings in parallel keeps 6.0 V and doubles the capacity.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Speed control with resistance',
    image: 'hov-potentiometer',
    caption:
      'A **potentiometer** is a variable resistor: turning the shaft changes how much resistance sits in the circuit.',
    bullets: [
      'A resistor in series with a motor takes part of the voltage, so ==the motor runs slower==.',
      'A potentiometer or **rheostat** becomes a tuning knob for hitting a Target Time.',
      'Resistors waste energy as heat: check they are rated for the current.',
      'Mark knob positions and record their run times, so the knob becomes a reliable dial.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'You turn the potentiometer to add more resistance in series with the thrust motor. What happens?',
    options: [
      'The motor gets less voltage and runs slower',
      'The motor gets more voltage and runs faster',
      'The battery voltage rises',
      'Nothing changes until the battery is replaced',
    ],
    answer: 0,
    explanation:
      'More series resistance drops more voltage across the resistor, leaving less for the motor, so it slows and the run takes longer.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Battery sag',
    bullets: [
      'As batteries discharge, **voltage falls** and the motor slows.',
      'Fresh batteries can make the same setting noticeably faster than tired ones.',
      'Charge or replace batteries on a consistent schedule, and ==measure pack voltage before each run==.',
      'Build calibration data at the same voltage you will use at competition.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Your calibration was built with tired batteries, but you install fresh ones for competition. What will most likely happen?',
    options: [
      'Runs will be faster than the calibration predicts',
      'Runs will be slower than predicted',
      'Run times will not change',
      'The vehicle will fail inspection',
    ],
    answer: 0,
    explanation:
      'Fresh cells deliver higher voltage, so the motor spins faster at the same setting. Calibrate at the voltage you will compete with.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Switches and safety',
    image: 'hov-toggle',
    caption:
      'Toggles, rockers, and push-buttons are all **manually operated mechanical switches**, the kind every motor needs.',
    bullets: [
      'Each motor needs an accessible switch for safe starting and stopping.',
      'Inserting batteries or twisting wires ==does not count as a switch==.',
      'Propellers and impellers, including under the hull, must be shielded so a **3/8-inch dowel** cannot touch them.',
      'A vehicle failing these safety rules cannot run and receives participation points only.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which setups meet the switch and safety rules? Select all that apply.',
    options: [
      'A toggle switch on each motor circuit',
      'Starting by twisting two wires together',
      'A mesh guard that a 3/8-inch dowel cannot pass',
      'Starting by snapping the last battery into its holder',
    ],
    answers: [0, 2],
    explanation:
      'A mechanical switch and a proper prop guard are required. Twisting wires or inserting batteries does not count as switching.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: eight AA cells',
    problem:
      'A team wants to use eight 1.5 V alkaline AA cells. Is that legal, and what are the options?',
    steps: [
      'Eight in series: 8 × 1.5 = **12.0 V**, exactly at the limit.',
      'Two parallel strings of four: **6.0 V** with double capacity.',
      'Lithium or lead cells would be illegal regardless of voltage.',
    ],
    conclusion:
      'Eight in series is legal but ==leaves no margin==; many teams prefer lower voltage with a potentiometer for control.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Series', back: 'Cells end to end; voltages add.' },
      { front: 'Parallel', back: 'Cells side by side; same voltage, more capacity.' },
      { front: 'Voltage sag', back: 'Battery voltage dropping as it discharges.' },
      {
        front: 'Integrated circuit',
        back: 'A packaged chip; banned except inside a commercial motor.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Battery voltage between any two points must stay at or below {0} V. Cells in {1} add their voltages, and a {2} in series with a motor slows it down.',
    blanks: ['12.0', 'series', 'potentiometer'],
    distractors: ['9.0', 'parallel', 'microcontroller'],
    explanation:
      'The limit is 12.0 V, series cells add voltage, and a variable resistor such as a potentiometer controls speed.',
  },
  {
    kind: 'open',
    prompt: 'Why might a team choose 6 V with a potentiometer over 12 V with no speed control?',
    model:
      'The lower voltage leaves margin below the limit and the potentiometer gives a fine, repeatable dial for any Target Time. At 12 V without control the only adjustments are coarse ones such as changing cells.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'No integrated circuits or lasers: control is analog.',
      'Labeled cells only, no lithium or lead, 12.0 V maximum.',
      'Series sets speed; a potentiometer tunes it; sag slows it.',
      '==Every motor needs a mechanical switch, and every prop needs a guard.==',
    ],
  },
]);

const nickels = defineDeck('hovb-u5-l1', [
  {
    kind: 'title',
    title: 'Carrying nickels: mass, balance, and security',
    subtitle:
      'Up to a kilogram of coins, held by shape alone, placed where the cushion can carry it.',
    objectives: [
      'Count the **Mass Score** value of each load.',
      'Hold rolls and loose nickels without tape or glue.',
      'Balance the **loaded center of mass** over the cushion.',
      'Plan calibrations for the loads you might carry.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: would you carry every nickel on your first run?',
    options: ['Yes, all of them', 'Some of them', 'None until run two', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'The available masses',
    image: 'hov-nickels',
    caption: 'Nickels are about 5 g each; a bank roll of 40 weighs about 200 g.',
    bullets: [
      'The supervisor provides **4 full rolls** of 40, **1 half roll** of 20, and **20 loose nickels**.',
      'Together they range from about 5 g to ==about 1 kg==.',
      'Teams choose how much to carry and can change it between runs.',
      'You may not bring your own masses.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'Using 200 g per full roll and 5 g per nickel, what is the total mass of every nickel provided, in grams?',
    answer: 1000,
    tolerance: 5,
    unit: 'g',
    explanation:
      'Four rolls are 800 g, the half roll is 100 g, and 20 loose nickels are 100 g: 1000 g in all.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'How to hold them',
    bullets: [
      'You may not unroll, break, or alter the packaging.',
      'You may not **tape or glue** nickels or rolls to the vehicle; vehicles that need it cannot carry masses.',
      'Good designs use **cradles**, slots, or bins sized for rolls, plus a tray or cup for loose nickels.',
      '==The coins sit in place by shape alone.==',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which ways of carrying nickels are legal? Select all that apply.',
    options: [
      'A cradle shaped to hold each roll',
      'A walled cup for loose nickels',
      'Taping the rolls to the deck',
      'Unrolling a roll to spread the coins out',
    ],
    answers: [0, 1],
    explanation:
      'Shaped holders are the intended solution. Tape, glue, and altering the packaging are not allowed.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Balance',
    bullets: [
      'A kilogram of nickels may **outweigh the rest of the vehicle**.',
      'An off-center load tilts the hull: leakage rises on one side and the skirt drags on the other.',
      'Place the load so the ==loaded center of mass lies over the cushion’s center==.',
      'Mark cradle positions so every run uses the same layout.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'All four rolls sit at the rear of the deck. What is the most likely result?',
    options: [
      'The rear skirt drags and the front leaks more air',
      'The vehicle lifts higher and runs faster',
      'Nothing changes because the total mass is the same',
      'The front skirt drags',
    ],
    answer: 0,
    explanation:
      'The loaded center of mass moves rearward, the hull tips back, the rear skirt presses down and drags, and the raised front leaks.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Keeping them aboard',
    bullets: [
      'If any part, roll, or nickel falls off, the run takes ==one construction penalty (× 0.8)==.',
      'Anything lost does not count toward Mass Score.',
      'Loose nickels slide during acceleration and bumps, so **contain them with walls**.',
      'A coin that rattles out at the start line costs far more than the 0.5 points it was worth.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Value per gram',
    bullets: [
      'A full roll adds **4 MS points** for about 200 g: 0.02 points per gram.',
      'A loose nickel adds **0.1 points** for 5 g: ==the same rate==.',
      'All carried mass costs speed, so ask whether the vehicle can carry it and still finish on time.',
      'For most competitive vehicles the answer is to carry everything.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'How many Mass Score points does the half roll add on a complete run?',
    answer: 2,
    tolerance: 0.01,
    unit: 'points',
    explanation: 'A half roll counts R = 0.5, and 4 × 0.5 = 2 points, for about 100 g.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Calibrating with load',
    bullets: [
      'Run time depends strongly on mass, so build a **separate calibration** for each load.',
      'A common plan: calibrate for the ==full load and for no load==.',
      'If run one goes badly, drop the nickels for run two and still use a known setting.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why calibrate for both the full load and no load?',
    options: [
      'So run two can switch loads and still use a known setting',
      'Because the rules require two loads',
      'Because nickels change the Target Time',
      'To make the vehicle lighter at inspection',
    ],
    answer: 0,
    explanation:
      'Each load needs its own curve. With two curves you can change the load between runs without guessing a new setting.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: two lost nickels',
    problem:
      'A vehicle carries 3 rolls, the half roll, and 12 loose nickels, but 2 loose nickels fall out mid-run. The run is complete. Find the Mass Score and the penalty effect.',
    steps: [
      'Counted load: R = 3.5, N = 10, so 4 × 3.5 + 0.1 × 10 = **15**.',
      'Something fell off, so one **construction penalty** applies: DS, TS, and MS × 0.8.',
      'MS after penalty = 15 × 0.8 = **12**.',
    ],
    conclusion:
      'Two lost nickels cost 0.2 MS directly, but ==the penalty cost 20 percent of the whole run==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A complete run would have scored DS 40, TS 35, and MS 20, but one loose nickel fell out. What is the run score?',
    answer: 75.92,
    tolerance: 0.05,
    unit: 'points',
    explanation:
      'The lost nickel drops MS to 19.9, and the construction penalty multiplies everything by 0.8: (40 + 35 + 19.9) × 0.8 = 75.92.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Nickel roll', back: '40 nickels, about 200 g; counts as R = 1.' },
      { front: 'Half roll', back: '20 nickels; counts as R = 0.5.' },
      { front: 'Cradle', back: 'A shaped holder that keeps a roll in place without tape.' },
      { front: 'Calibration set', back: 'Recorded settings and times for one load.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Nickels must be held by {0} alone, never tape. The loaded center of mass belongs over the cushion’s {1}, and anything that falls off costs a {2} penalty.',
    blanks: ['shape', 'center', 'construction'],
    distractors: ['glue', 'edge', 'competition'],
    explanation:
      'Cradles and walled trays hold coins by shape; a centered load keeps the hull level; lost parts are a construction penalty.',
  },
  {
    kind: 'open',
    prompt: 'Describe a holder layout for all the nickels that keeps the load centered and secure.',
    model:
      'Two pairs of roll cradles placed symmetrically either side of the centerline, the half roll on the centerline, and the loose nickels in a walled cup over the cushion center. Marked positions make every run identical.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Up to 1 kg of nickels earns up to 20 MS points at 0.02 points per gram.',
      'Hold coins by shape: no tape, glue, or unrolling.',
      'Center the loaded mass over the cushion.',
      '==Secure every coin: a lost nickel costs 20 percent of the run.==',
    ],
  },
]);

const calibration = defineDeck('hovb-u6-l1', [
  {
    kind: 'title',
    title: 'Hitting the Target Time: calibration and repeatability',
    subtitle: 'Turn an unknown Target Time into a setting you can read off a graph.',
    objectives: [
      'Build a **calibration curve** and interpolate from it.',
      'Measure and improve **repeatability** before refining the curve.',
      'Describe the timing dowel and photogates.',
      'Plan two runs with no practice run.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how do you plan to time your practice runs?',
    options: ['Phone video', 'Stopwatches', 'Homemade photogate', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The calibration curve',
    bullets: [
      'The Target Time is announced only at competition, so you need a way to set ==any time from 6.0 to 18.0 s==.',
      'Choose one main control, such as **potentiometer position** or **start distance**.',
      'Record run times at several settings with a fixed load and voltage.',
      'Plotting time against setting gives a **calibration curve** to read on competition day.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'While building one calibration curve, what should you keep fixed?',
    options: [
      'The load and the battery voltage',
      'The potentiometer setting',
      'The run time',
      'Nothing, vary everything',
    ],
    answer: 0,
    explanation:
      'The curve links one control to run time, so every other factor, especially load and voltage, must stay the same.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Interpolation',
    bullets: [
      'If setting 4 gives 11.0 s and setting 5 gives 13.0 s, a 12.0 s target lies halfway, near **4.5**.',
      '**Linear interpolation** works when points are close together; where the curve bends, add measurements.',
      '==Impound your chart and calculations==: no new notes may come in after impound.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Setting 2 gives 8.0 s and setting 3 gives 10.0 s. Which setting should give a 9.5 s Target Time?',
    answer: 2.75,
    tolerance: 0.02,
    explanation: '9.5 s is (9.5 − 8.0) ÷ (10.0 − 8.0) = 0.75 of the way from 2 to 3, so 2.75.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Repeatability',
    image: 'hov-accuracy',
    caption:
      'Tight cluster, off center: **high precision** but **low accuracy**. Precision is the spread; accuracy is the distance from the target.',
    bullets: [
      'Run the same setting five times: the spread is your precision.',
      'If times range from 11.4 to 12.6 s, ==no interpolation will hit TT within 0.2 s==.',
      'Reduce variation first: consistent start, balanced load, fresh batteries, smooth skirts.',
      'Then refine the curve, since a tighter spread makes every point more trustworthy.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Five runs at one setting give 11.4, 12.6, 11.8, 12.3, and 11.6 s. What should the team do next?',
    options: [
      'Reduce run-to-run variation before refining the curve',
      'Add more points to the curve right away',
      'Average the times and stop testing',
      'Change the Target Time',
    ],
    answer: 0,
    explanation:
      'A 1.2 s spread is a precision problem. Fix start position, balance, batteries, and skirt first, or the curve cannot be trusted.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Timing method',
    image: 'hov-photogate',
    caption:
      'A **photogate** times an object by detecting when it breaks a light beam, like the gates at the start and finish lines.',
    bullets: [
      'The vehicle carries a vertical wooden **timing dowel**, at least 1/4 inch thick.',
      'It sits within **3.0 cm** of the front edge and reaches at least **20 cm** above the track.',
      'Photogate beams sit ==about 17 cm up==, so the dowel is what they see.',
      'At home, use phone video at a known frame rate, or several stopwatch timers averaged.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each timing-dowel rule to its value.',
    pairs: [
      ['Minimum dowel thickness', '1/4 inch'],
      ['Maximum distance from the front edge', '3.0 cm'],
      ['Minimum height above the track', '20 cm'],
      ['Photogate beam height', 'About 17 cm'],
    ],
    explanation:
      'The dowel must be thick and tall enough, and far enough forward, to break beams set about 17 cm above the track.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Long and short targets',
    bullets: [
      'Very **short targets** need a fast vehicle with plenty of run-up.',
      'Long targets, near 18 s, need a ==slow, steady vehicle that never stalls==.',
      'A vehicle tuned too slow may creep and stop: a 3-second stall ends the run.',
      'Test the extremes of the range, not just the middle.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which Target Time does each concern belong to?',
    bins: ['Short TT (near 6 s)', 'Long TT (near 18 s)'],
    items: [
      ['Needs plenty of run-up behind the start line', 0],
      ['Risk of creeping to a 3-second stall', 1],
      ['Needs high thrust from the start', 0],
      ['Needs a slow speed that stays steady', 1],
    ],
    explanation:
      'Short targets demand speed and run-up; long targets demand slow, steady motion that never stalls.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'No practice runs',
    bullets: [
      'There are **no practice runs**: you get two runs in 8 minutes.',
      'Run one uses your best calibrated setting; compare the result with TT.',
      'Adjust run two by the curve.',
      '==A consistent vehicle corrects by a known amount==; an inconsistent one turns run two into a guess.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: choose a setting',
    problem:
      'Your curve shows setting 3 → 9.6 s and setting 4 → 11.2 s (full load, 5.0 V). The Target Time is 10.0 s. Which setting do you choose?',
    steps: [
      'The target is (10.0 − 9.6) ÷ (11.2 − 9.6) = **0.25** of the way from 3 to 4.',
      'Interpolated setting = 3 + 0.25 = **3.25**.',
      'If run one gives 10.3 s, TS = 38.80; shift slightly toward 3 for run two.',
    ],
    conclusion:
      '==Interpolation gives a starting setting==; the first run tells you which way to correct.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'TT is 10.0 s and run one takes 10.3 s. What Time Score did it earn?',
    answer: 38.8,
    tolerance: 0.05,
    unit: 'points',
    explanation: 'TS = 40 × (1 − 0.3 ÷ 10.0) = 40 × 0.97 = 38.8.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Calibration curve', back: 'Graph of run time against a control setting.' },
      { front: 'Interpolation', back: 'Estimating a setting between two measured points.' },
      { front: 'Precision', back: 'How close repeated results are to each other.' },
      { front: 'Accuracy', back: 'How close a result is to the target.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A calibration curve plots run time against one {0}. Estimating between two points is {1}, and the spread of repeated runs measures {2}.',
    blanks: ['setting', 'interpolation', 'precision'],
    distractors: ['load', 'extrapolation', 'accuracy'],
    explanation:
      'One control setting goes on the curve, interpolation reads between points, and spread is precision.',
  },
  {
    kind: 'open',
    prompt:
      'Your first run is 0.5 s slow. Explain how you would choose the setting for your second run.',
    model:
      'Read the curve’s slope near the setting I used, find how much the setting must change to remove 0.5 s, and move that amount toward the faster side. This only works if my spread is small, so the 0.5 s is a real offset and not noise.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Build a curve of time against one control, at fixed load and voltage.',
      'Interpolate between close points and impound the chart.',
      'Fix precision before refining accuracy.',
      '==Use run one to measure the offset and run two to correct it.==',
    ],
  },
]);

const competition = defineDeck('hovb-u7-l1', [
  {
    kind: 'title',
    title: 'Impound, inspection, and competition day',
    subtitle: 'Bring the right things, pass inspection, and use eight minutes well.',
    objectives: [
      'List what to **impound** and what stays with you.',
      'Prepare for the **specification check**.',
      'Run the 8-minute period and the launch procedure correctly.',
      'Explain your design to the supervisor.',
    ],
    image: 'hov-toy',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what worries you most about competition day?',
    options: ['Inspection', 'Running out of time', 'Missing the Target Time', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Impound',
    bullets: [
      'Impound **one vehicle**, spare parts, and any papers you will need, with batteries stored separately.',
      '==Nothing else may be brought in later.==',
      'Missing impound multiplies DS, TS, and MS by **0.7** for every run.',
      'Tools and up to two Class III calculators need not be impounded, but tools may not travel with the vehicle; laser tools are banned.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Does each item go into impound?',
    bins: ['Impound it', 'Need not impound'],
    items: [
      ['The vehicle', 0],
      ['Spare parts', 0],
      ['Calibration chart and notes', 0],
      ['Screwdrivers and pliers', 1],
      ['Two Class III calculators', 1],
    ],
    explanation:
      'The vehicle, spares, and papers must be impounded, since nothing can be added later. Tools and calculators need not be.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Inspection',
    bullets: [
      'The supervisor checks the **40 × 40 × 40 cm** box when levitated and the timing dowel.',
      'Also: allowed electrical parts, battery labels and voltage, switches, and prop shielding.',
      'Out-of-spec vehicles ==may be fixed during the testing period==.',
      'Safety failures that cannot be fixed mean the vehicle does not run and gets participation points.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which items does the specification check cover? Select all that apply.',
    options: [
      'Size when levitated',
      'Battery labels and voltage',
      'Prop shielding',
      'The color of the hull',
    ],
    answers: [0, 1, 2],
    explanation:
      'Inspection covers size, dowel, electrical parts, batteries, switches, and shielding. Color is not a rule.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The 8-minute period',
    bullets: [
      '**8 minutes** to adjust, repair, and make two runs.',
      'Time ends after two complete or two incomplete runs, or when 8 minutes pass.',
      '==A run started before time expires may finish.==',
      'You may **dry-sweep** and measure the track, but not wet it or ask to move or level it.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Which action is allowed on the track during your 8 minutes?',
    options: [
      'Brushing it with a dry broom',
      'Wiping it with a damp cloth',
      'Asking to re-level it',
      'Moving it closer to the wall',
    ],
    answer: 0,
    explanation:
      'A dry sweep and measuring are allowed. Wetting the track or asking to change its position or leveling is not.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Starting a run',
    bullets: [
      'Place the vehicle and its load fully behind the start line; the supervisor holds a **wood block** against its front.',
      'Turn on the motors, remove your hands, and count “3, 2, 1, launch.”',
      'The supervisor removes the block.',
      'If the dowel does not cross the start line within 3 s, ==the attempt does not count as a run==.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the launch procedure.',
    items: [
      'Place the loaded vehicle behind the start line',
      'Supervisor holds the wood block at the front',
      'Turn on the motors',
      'Remove your hands and count down',
      'Supervisor removes the block',
    ],
    explanation:
      'The block holds the vehicle while motors start and hands come off; the countdown ends with the block’s removal.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'During and after',
    bullets: [
      '==Do not touch or interfere with the vehicle== until the supervisor says so.',
      'For an incomplete run, the supervisor places the block in front, you switch off without moving it, and the dowel’s distance is measured.',
      'The competition clock pauses for that measurement.',
      'Review your score sheet with the supervisor at the end.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Your vehicle stalls mid-track. What should you do?',
    options: [
      'Wait for the supervisor, then switch it off without moving it',
      'Push it over the finish line',
      'Pick it up and restart',
      'Declare the run incomplete yourself',
    ],
    answer: 0,
    explanation:
      'The supervisor blocks it and you switch it off in place so the dowel’s distance can be measured. Touching it zeroes the run.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Design knowledge',
    bullets: [
      'Participants must answer questions about **design, construction, and operation**.',
      'Be ready to explain lift and thrust, wiring, battery choice, calibration method, and load choice.',
      'Your ==build log and calibration data== are the best preparation and the evidence for your settings.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: a failed launch',
    problem:
      'A team’s vehicle passes inspection, but its first attempt sits behind the start line for 4 seconds. What happens, and what should the team do?',
    steps: [
      'The dowel did not cross within 3 seconds, so ==it is not a run==.',
      'The team still has two runs available while time remains.',
      'Check lift and thrust, restart quickly, and watch the 8-minute clock.',
    ],
    conclusion: 'A failed launch does not use a run, but it **uses time**, so diagnose fast.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Impound', back: 'Turning in the vehicle, spares, and papers before competing.' },
      {
        front: 'Specification check',
        back: 'The supervisor’s inspection of size, parts, and safety.',
      },
      { front: 'Launch block', back: 'Wood block held at the front before release.' },
      { front: 'Dry sweep', back: 'Brushing the track without liquid; allowed.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Missing impound multiplies every run by {0}. Teams get {1} minutes for adjustments and two runs, and the dowel must cross the start line within {2} seconds of launch.',
    blanks: ['0.7', '8', '3'],
    distractors: ['0.8', '10', '5'],
    explanation:
      'Impound matters (× 0.7 if missed), the window is 8 minutes, and launches must cross within 3 s.',
  },
  {
    kind: 'open',
    prompt: 'A supervisor asks why you chose your battery pack. What would you say?',
    model:
      'Name the chemistry and count, show the voltage is under 12.0 V from the labels, and explain how it gives enough speed for short targets while the potentiometer slows it for long ones. Point to calibration data taken at that voltage.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Impound everything you need; nothing comes in later.',
      'Inspection is fixable; unsafe vehicles do not run.',
      'Eight minutes, two runs, a careful launch, and no touching.',
      '==Know your design and bring the data behind every setting.==',
    ],
  },
]);

export const decks: Deck[] = [
  scoring,
  levitation,
  thrust,
  electrical,
  nickels,
  calibration,
  competition,
];
