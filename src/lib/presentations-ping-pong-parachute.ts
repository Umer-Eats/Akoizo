import { defineDeck, type Deck } from './presentation-types.ts';
import { pingPongDecksDescent } from './presentations-ping-pong-parachute-2.ts';

// Ping Pong Parachute (Division C) presentations. Each deck follows its lesson in the Ping Pong
// Parachute course section by section (`section` is the lesson section index), and its
// activities rehearse the lesson's rules, worked example, and physics.

const scoring = defineDeck('ppp-u1-l1', [
  {
    kind: 'title',
    title: 'The event and its score: time aloft and multipliers',
    subtitle:
      'An air-powered bottle rocket lifts a **ping pong ball parachute**; the score is how long the payload stays up, ==after multipliers==.',
    objectives: [
      'Describe the **parachute payload system** and launch equipment.',
      'Apply the **timing rules** and the **separation, ceiling, and log multipliers**.',
      'Rank teams by **best launch** and break ties.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: where do you think most of a launch’s time aloft is earned?',
    options: [
      'Climbing up',
      'Floating down under the parachute',
      'About half and half',
      'Not sure',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What you build and bring',
    bullets: [
      'Up to **two bottle rockets**, two **unaltered standard ping pong balls**, and two **parachutes**.',
      'A parachute taped to a ball forms the **parachute payload system**.',
      'The supervisor provides a launcher with a **Schrader valve**, an air pump, a pressure gauge, and timers.',
      'Rockets are pressurized with ==air only== and launched indoors.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which of these does the team supply rather than the supervisor?',
    options: ['The air pump', 'The pressure gauge', 'The parachute payload system', 'The timers'],
    answer: 2,
    explanation:
      'Teams bring rockets, balls, and parachutes; the supervisor supplies the **launcher, pump, gauge, and timers**.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Timing',
    bullets: [
      'Timing starts when the rocket **leaves the launcher** and stops when the **payload lands**.',
      'Three timers record each launch; ==the middle value is the official time==, to hundredths of a second.',
      'The payload **must separate** from the rocket.',
      'If it never separates, timing runs until any part of the rocket touches the ground, and the launch takes a **0.90 multiplier**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Three timers read 13.84 s, 14.02 s and 13.91 s. What is the official time in seconds?',
    answer: 13.91,
    tolerance: 0.001,
    unit: 's',
    explanation: 'The official time is the **middle value**, the median: 13.91 s.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Ranking',
    bullets: [
      'The score is the ==greatest time aloft from a single launch, after multipliers==; high score wins.',
      'Ties are broken by the time aloft of the team’s **other launch**.',
      'Teams have **5 minutes** for two launches, with the same rocket or two different rockets.',
      'So the second launch is both **a second chance and the tiebreaker**.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The ceiling multiplier',
    bullets: [
      'If any part of the rocket or payload hits the **ceiling**, or anything attached to it like a light or hoop, during the ascent:',
      'timing **stops at contact** and the launch is multiplied by **0.25**.',
      '==A ceiling hit turns a long flight into almost nothing.==',
      'Tournaments must tell teams the **ceiling height in advance**.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: a grazed light',
    problem:
      'A team with a complete log records **14.20 s** on launch 1 (clean) and **19.80 s** on launch 2, but launch 2 grazed a light on the way up. What is its score?',
    steps: [
      'Launch 1: 14.20 s × 1.00 = **14.20**.',
      'Launch 2: timing stopped at contact, and even 19.80 s × 0.25 = **4.95**.',
      'Best launch: **14.20**.',
    ],
    conclusion:
      'The longer flight lost because ==a ceiling hit costs three quarters of the time==.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which event during the ascent triggers the 0.25 multiplier?',
    options: [
      'The payload drifting into a wall on the way down',
      'The rocket brushing a basketball hoop attached to the ceiling',
      'The rocket landing outside the launch area',
      'The parachute opening late',
    ],
    answer: 1,
    explanation:
      'Contact with the ceiling **or anything attached to it** during the ascent stops timing and applies **×0.25**.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Practice log multipliers',
    bullets: [
      'Teams present a **practice log** of at least **10 test flights** with at least **five parameters**.',
      'Incomplete log: score × **0.85**. No log: score × **0.70**.',
      'Teams without a complete log are also limited to a ==safe pressure chosen by the supervisor==.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A team with an incomplete log flies a clean 15.00 s launch. What is its score after the log multiplier?',
    answer: 12.75,
    tolerance: 0.005,
    explanation: '15.00 × 0.85 = **12.75**.',
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each situation to its multiplier.',
    pairs: [
      ['Payload never separates', '× 0.90'],
      ['Ceiling contact on the ascent', '× 0.25'],
      ['Incomplete practice log', '× 0.85'],
      ['No practice log', '× 0.70'],
    ],
    explanation:
      'The ceiling penalty is by far the harshest; the log penalties apply to every launch score.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Inspection and safety',
    bullets: [
      'Arrive ready to launch, wearing **Category B eye protection**.',
      'Rockets are **inspected**; ones that break construction rules are not launched.',
      'A team that cannot launch at all receives **participation points**.',
      'If the supplied launcher fails to release a rocket, ==that launch never happened== and can be restarted.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'The launcher jams and the rocket does not leave it. What happens to that launch?',
    options: [
      'It scores zero',
      'It counts as a launch with a 0.90 multiplier',
      'It never happened and can be restarted',
      'The team loses its second launch',
    ],
    answer: 2,
    explanation:
      'A failure of the **supplied launcher** means the launch did not occur, so it can be restarted.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Time runs from **leaving the launcher** to the **payload landing**; the median of three timers counts.',
      'Score = **best single launch after multipliers**; the other launch breaks ties.',
      '==Ceiling contact: × 0.25.== No separation: × 0.90.',
      'Log: **10 flights × 5 parameters**, or × 0.85 (incomplete) / × 0.70 (none).',
    ],
  },
]);

const climb = defineDeck('ppp-u2-l1', [
  {
    kind: 'title',
    title: 'How an air-powered bottle rocket climbs',
    subtitle:
      'Milliseconds of thrust, a second of coasting, and then the **parachute** does the real work.',
    objectives: [
      'Explain thrust with **Newton’s third law** and **impulse**.',
      'Describe **coasting, drag, and apogee**.',
      'Name the **three flight phases** and where time aloft is earned.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Stored energy',
    image: 'ppp-bottle-rocket',
    bullets: [
      'Pumping air into a sealed bottle **compresses** it, storing energy.',
      'On release, air rushes out of the nozzle: by **Newton’s third law**, air pushed back pushes the rocket forward.',
      '==Water is not allowed==, so the only propellant is light air that leaves quickly.',
      'That makes the **powered phase extremely short**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why is the powered phase of this event’s rocket so short?',
    options: [
      'The launcher holds the rocket back',
      'The propellant is light air, which leaves the nozzle quickly',
      'The bottle is too small to hold any pressure',
      'The parachute opens immediately',
    ],
    answer: 1,
    explanation:
      'With **air only** (no water), there is very little propellant mass and it leaves almost at once.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Thrust and impulse',
    bullets: [
      '**Thrust** ≈ pressure difference × nozzle area at first, falling quickly as pressure drops.',
      '**Impulse** = thrust × time; it is what changes the rocket’s momentum.',
      'Higher pressure stores more energy and gives more impulse, so the rocket leaves faster.',
      'The nozzle is fixed at about **2.2 cm** by the bottle neck, so ==pressure is your main control==.',
    ],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the summary of the powered phase.',
    text: 'Thrust times time is called {0}, and it changes the rocket’s {1}. Because the nozzle size is fixed by the bottle neck, the team’s main control is launch {2}.',
    blanks: ['impulse', 'momentum', 'pressure'],
    distractors: ['apogee', 'temperature', 'drag'],
    explanation:
      '**Impulse** changes **momentum**; with a fixed 2.2 cm nozzle, **pressure** is what the team chooses.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Coasting to apogee',
    bullets: [
      'After the air is spent, the rocket **coasts** upward, slowed by gravity and drag.',
      '**Drag grows with the square of speed**, so it matters most right after launch.',
      'A light rocket accelerates more but also ==loses speed faster to drag==.',
      'The peak height, **apogee**, is reached when upward speed falls to zero.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'If a rocket’s speed doubles, by what factor does its air drag increase (drag ∝ v²)?',
    answer: 4,
    tolerance: 0,
    explanation: 'Drag grows with the square of speed: 2² = **4 times** the drag.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Why mass matters',
    bullets: [
      'From **F = ma**, the same thrust accelerates a lighter rocket more.',
      'But a rocket that is too light carries little **momentum** and is slowed quickly by drag.',
      'The goal is ==not maximum height==: reach a safe height below the ceiling with a clean, upright flight.',
      'Then release the payload near **apogee**.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Pressure limits',
    bullets: [
      'The bottle must be a single plastic **carbonated-beverage bottle of 1 liter or less**, designed for pressure.',
      'You choose the launch pressure and must **justify it with log data**; the supervisor checks the gauge.',
      'Without a complete log, the supervisor sets a lower **safe pressure**.',
      '==Never alter the bottle’s structure to save mass.==',
    ],
  },
  {
    kind: 'flow',
    section: 5,
    title: 'The three phases of every flight',
    steps: [
      { label: 'Powered', detail: '**Milliseconds** of thrust as the air leaves the nozzle.' },
      { label: 'Coasting', detail: 'Rising and slowing under gravity and drag, up to **apogee**.' },
      {
        label: 'Recovery',
        detail: 'The payload separates and descends: ==nearly all the time aloft is earned here==.',
      },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the events of a flight in order.',
    items: [
      'Launcher releases the pressurized rocket',
      'Air leaves the nozzle (powered phase)',
      'Rocket coasts upward and slows',
      'Rocket reaches apogee',
      'Payload separates and the parachute descends',
    ],
    explanation: 'Powered, coasting, then recovery; the payload should separate **near apogee**.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: where the time comes from',
    problem:
      'A rocket reaches apogee **1.2 s** after launch, and the payload then descends for **11.5 s**. What share of time aloft came from the descent?',
    steps: [
      'Total time aloft = 1.2 + 11.5 = **12.7 s**.',
      'Descent share = 11.5 ÷ 12.7 ≈ **0.91**.',
      'About **91 percent** of the score comes from the parachute.',
    ],
    conclusion: 'Climb only sets the starting height; ==the parachute earns the score==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Apogee comes 1.0 s after launch and the descent lasts 9.0 s. What percent of the time aloft is the descent?',
    answer: 90,
    tolerance: 0.5,
    unit: '%',
    explanation: '9.0 ÷ (1.0 + 9.0) = 0.90, so **90 percent**.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Thrust', 'Force from air leaving the nozzle'],
      ['Impulse', 'Thrust times time; the momentum change it produces'],
      ['Apogee', 'The highest point of the flight'],
      ['Psi', 'Pounds per square inch, the gauge pressure unit'],
    ],
    explanation: 'Pressure (psi) sets the impulse, which sets the climb to apogee.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Air out the back pushes the rocket forward (**Newton’s third law**).',
      '**Pressure** is the main control; the nozzle is fixed by the bottle neck.',
      'Drag grows with **v²**; apogee is where upward speed reaches zero.',
      '==Most time aloft is earned in recovery==, under the parachute.',
    ],
  },
]);

const construction = defineDeck('ppp-u3-l1', [
  {
    kind: 'title',
    title: 'Building a legal, stable rocket',
    image: 'ppp-bottle-rocket',
    subtitle:
      'An **unaltered bottle**, tape-only attachments, a **blunt nose**, and fins that keep the CG ahead of the CP.',
    objectives: [
      'Apply the **pressure vessel, attachment, and nose** rules.',
      'Explain stability with the **CG and CP**.',
      'Measure a **stability margin** and fix an unstable rocket.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The pressure vessel',
    bullets: [
      'One plastic **carbonated-beverage bottle of 1 liter or less**, nozzle about **2.2 cm**, standard neck under 1.6 cm from flange to opening.',
      'The **label must be presented**.',
      'Its structure may not be altered by ==cutting, sanding, heating, hot glue, super glue, or spray paint==.',
      'A weakened bottle can **burst**.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Attachments',
    bullets: [
      '==Only tape== may attach fins and other parts to the pressure vessel; no glue may touch it.',
      '**Metal** is prohibited anywhere on the rocket or payload, and so are **Mylar** and **ultrafilm**.',
      'Fins and added parts must sit **5 cm or more above the bottle opening** so the rocket fits the launcher.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Legal or illegal construction?',
    bins: ['Legal', 'Illegal'],
    items: [
      ['Foam-board fins taped to the bottle', 0],
      ['Fins hot-glued to the bottle', 1],
      ['A bottle sanded thinner to save mass', 1],
      ['A Mylar parachute canopy', 1],
      ['A thin plastic-bag canopy', 0],
      ['A small metal weight in the nose', 1],
    ],
    explanation:
      'Only **tape** may touch the bottle, the bottle may not be altered, and **metal, Mylar, and ultrafilm** are banned anywhere.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The nose',
    bullets: [
      'The nose must be **rounded or blunt**.',
      '**Cap test**: a standard bottle cap (about 3.1 cm across, 1.25 cm tall) is placed over the tip, and ==no part of the nose may touch the inside top of the cap==.',
      'This keeps the tip from being pointed, protecting people and the ceiling.',
      'Test your nose with a real cap before competition.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'During the cap test, the nose tip touches the inside top of the bottle cap. What does that mean?',
    options: [
      'The nose passes because it fits under the cap',
      'The nose is too pointed and fails the rule',
      'The nose is too blunt and must be sharpened',
      'The cap is the wrong size, so the test is skipped',
    ],
    answer: 1,
    explanation:
      'A blunt nose keeps clear of the cap’s inside top; a tip that **reaches the top is too pointed**.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Stability: CG ahead of CP',
    bullets: [
      'A rocket flies straight when its **center of gravity (CG)** is ahead of its **center of pressure (CP)**.',
      'The CP is where aerodynamic forces effectively act; **fins at the tail move it backward**.',
      'If the rocket tilts, air pushes on the fins and ==swings the nose back into the wind==.',
      'If the CG is behind the CP, the rocket **tumbles**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A rocket tumbles end over end right after launch. What is the most likely cause?',
    options: [
      'Its CG is behind its CP',
      'Its CG is far ahead of its CP',
      'The launch pressure was too low',
      'The nose passed the cap test',
    ],
    answer: 0,
    explanation:
      'With the **CG behind the CP**, aerodynamic forces turn the rocket away from its path instead of correcting it.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Finding the CG and CP',
    bullets: [
      'Find the **CG** by balancing the finished rocket, ==with payload loaded==, on a finger or string.',
      'Estimate the **CP** by balancing a cardboard cut-out of the rocket’s side outline.',
      'Aim for the CG at least **one body diameter** ahead of the CP.',
      'Adding a little **nose mass** moves the CG forward.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: stability margin',
    problem:
      'A rocket’s **CG is 18 cm** from the nose and its **CP is 21 cm** from the nose. The bottle diameter is **8 cm**. Is it stable enough?',
    steps: [
      'Stability margin = 21 − 18 = **3 cm**.',
      'In body diameters: 3 ÷ 8 ≈ **0.4**.',
      'Below the **1-diameter** guideline: enlarge the fins or add nose mass.',
    ],
    conclusion:
      'Express the margin in ==body diameters== so rockets of different sizes compare fairly.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A rocket’s CG is 20 cm and its CP is 28 cm from the nose, with an 8 cm body diameter. What is the stability margin in body diameters?',
    answer: 1,
    tolerance: 0.02,
    explanation: '(28 − 20) ÷ 8 = **1.0 diameter**, meeting the guideline.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Fin design',
    bullets: [
      '**Three or four fins**, evenly spaced and aligned with the body, give steady flight.',
      'Large fins move the CP farther back but add **drag and mass**.',
      'Light, stiff materials such as **foam board** or **corrugated plastic** work well, attached with tape.',
      '==Misaligned fins make the rocket spin or curve==, wasting height and carrying it toward walls.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which changes increase the stability margin?',
    options: [
      'Larger fins at the tail',
      'A little extra mass in the nose',
      'Moving the fins forward toward the nose',
      'Removing the nose mass',
    ],
    answers: [0, 1],
    explanation:
      'Larger tail fins move the **CP back**; nose mass moves the **CG forward**. Both widen the gap.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Pressure vessel', 'The unaltered bottle that holds the compressed air'],
      ['Stability margin', 'Distance the CG sits ahead of the CP'],
      ['Cap test', 'Check that the nose does not touch the inside top of a bottle cap'],
      ['No-fin zone', 'The 5 cm above the bottle opening that must stay clear'],
    ],
    explanation: 'These are the terms inspectors and supervisors use at check-in.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Unaltered bottle ≤ 1 L; ==tape only== on the bottle; no metal, Mylar, or ultrafilm.',
      'Blunt nose that passes the **cap test**; parts **≥ 5 cm** above the opening.',
      'Stable when the **CG is ahead of the CP**, ideally by one body diameter.',
      'Three or four aligned, light fins.',
    ],
  },
]);

const apogee = defineDeck('ppp-u4-l1', [
  {
    kind: 'title',
    title: 'Apogee, ceiling height, and choosing pressure',
    subtitle: 'Get apogee **close to the ceiling without touching it**, using measured data.',
    objectives: [
      'Measure apogee with the **tangent method** or reference heights.',
      'Build and read a **pressure–height chart**.',
      'Choose a pressure with a **safety margin** for any announced ceiling.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why apogee matters',
    bullets: [
      'Time aloft depends on ==how high the payload starts its descent==.',
      'So aim apogee **close to the ceiling without touching it**.',
      'Tournaments give the **ceiling height in feet** in advance; more than 20 feet is recommended.',
      'Your job: know, from data, what height each pressure produces.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Measuring with an angle',
    image: 'ppp-clinometer',
    bullets: [
      'Stand a measured distance away and sight the rocket at apogee with a **clinometer** or phone app.',
      '**Height = distance × tan(angle) + eye height.**',
      'Example: 10 m away at 55° gives 10 × 1.43 ≈ **14.3 m** above eye level.',
      'Two observers on different sides **average out drift**.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An observer 8.0 m from the launcher sights apogee at 60° with an eye height of 1.5 m. What is the apogee height in meters? (tan 60° ≈ 1.732)',
    answer: 15.36,
    tolerance: 0.1,
    unit: 'm',
    explanation: '8.0 × 1.732 = 13.86 m, plus 1.5 m eye height ≈ **15.4 m**.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Measuring against a reference',
    bullets: [
      'Indoors, compare apogee to **known heights**: wall marks, a **basketball rim at 10 feet**, ceiling beams.',
      '**Video** helps.',
      'Record the peak height in **feet**: it is a required log parameter.',
      '==Consistent methods matter more than perfect accuracy==, since the chart only predicts your own rocket.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Why should a team measure apogee the same way every time, even if the method is not perfectly accurate?',
    options: [
      'Judges require one specific method',
      'The chart only has to predict the team’s own rocket using the team’s own method',
      'Inconsistent methods break the rocket',
      'Video is not allowed',
    ],
    answer: 1,
    explanation:
      'A **consistent** method keeps the pressure–height chart internally reliable, which is all the prediction needs.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The pressure–height chart',
    bullets: [
      'Launch the same rocket at several pressures and record the peak height for each.',
      'Plot **height against pressure**.',
      'The curve rises steeply, then ==flattens as drag grows with speed==.',
      'Read the pressure that gives a height **2 to 3 feet below** the competition ceiling.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: picking pressure',
    problem:
      'Chart: **50 psi → 17 ft, 60 psi → 21 ft, 70 psi → 24 ft**, with about ±1.5 ft spread. The ceiling is **25 ft**. Which pressure?',
    steps: [
      '70 psi could reach **25.5 ft**: too risky.',
      '60 psi reaches 21 ± 1.5 ft, at most **22.5 ft**: safe.',
      'Interpolating, about **63 psi** gives roughly 22 ft, still clearing 25 ft with margin.',
    ],
    conclusion: 'Plan for the ==highest expected flight==, not the average one.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why does the pressure–height curve flatten at high pressure?',
    options: [
      'The bottle stops holding air',
      'Drag grows with the square of speed, so extra launch speed buys less height',
      'Gravity gets stronger at higher altitude in the gym',
      'The gauge reads wrong at high pressure',
    ],
    answer: 1,
    explanation:
      'Faster rockets lose proportionally more to **drag**, so each extra psi adds less height.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Margin for spread',
    bullets: [
      'Height varies from flight to flight: **payload loading, small leaks, air currents**.',
      'Look at the **spread** at one pressure, e.g. 19 to 22 feet at 60 psi.',
      'Set the target so the ==highest expected flight still clears the ceiling==.',
      'A 0.25 multiplier is far worse than a slightly shorter clean flight: **when in doubt, step down**.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'At 55 psi, repeated launches reached 18, 19.5, 20 and 21 ft. The ceiling is 24 ft. What is the clearance, in feet, for the highest expected flight?',
    answer: 3,
    tolerance: 0.01,
    unit: 'ft',
    explanation: 'Highest flight 21 ft; 24 − 21 = **3 ft** of margin.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Different venues',
    bullets: [
      'Practice rooms rarely match the competition ceiling.',
      'That is why the log records ==pressure and height, not just time==: you can choose pressure for any announced ceiling.',
      'Air from vents or doors can push light payloads; tournaments try to reduce it.',
      'Your margin should still allow for **some drift**.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Your practice gym has a 30 ft ceiling but the tournament ceiling is 22 ft. What should you do?',
    options: [
      'Use the pressure that worked best in practice',
      'Read a pressure from your chart that keeps the highest expected flight a few feet below 22 ft',
      'Use maximum pressure and hope',
      'Skip the second launch',
    ],
    answer: 1,
    explanation:
      'Because the log links **pressure to height**, you can choose a pressure for any announced ceiling.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Clinometer', 'Tool that measures the angle of elevation'],
      ['Tangent method', 'Height = distance × tan(angle) + eye height'],
      ['Safety margin', 'Planned gap between expected apogee and the ceiling'],
      ['Spread', 'Range of results from repeated identical launches'],
    ],
    explanation: 'Measure, chart, and leave a margin for the spread.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Measure apogee by **tangent method** or **reference heights**, consistently.',
      'Chart **height against pressure**; it flattens because of drag.',
      '==Leave margin for the highest expected flight==; step down when unsure.',
      'Height data lets you choose pressure for **any ceiling**.',
    ],
  },
]);

export const decks: Deck[] = [scoring, climb, construction, apogee, ...pingPongDecksDescent];
