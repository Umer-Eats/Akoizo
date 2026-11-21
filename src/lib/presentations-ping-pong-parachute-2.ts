import { defineDeck } from './presentation-types.ts';

// Ping Pong Parachute decks for parachute physics, deployment, and the practice log (lessons
// 5–7), imported by presentations-ping-pong-parachute.ts.

const parachute = defineDeck('ppp-u5-l1', [
  {
    kind: 'title',
    title: 'Parachute physics: drag and slow descent',
    subtitle:
      'A slow, steady descent comes from **large canopy area**, a **high drag coefficient**, and a **light payload**.',
    objectives: [
      'Derive **terminal velocity** from the drag equation.',
      'Explain why **canopy area** is the biggest lever.',
      'Design for **reliable opening** and little drift.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Terminal velocity',
    image: 'ppp-terminal-velocity',
    caption:
      'A falling payload speeds up until **drag equals its weight**; then the net force is zero and it falls at a steady **terminal velocity**.',
    bullets: [
      'Drag: **F = ½ρv²C_dA** (air density, speed, drag coefficient, canopy area).',
      'Set drag equal to weight W and solve: **v = √(2W ÷ ρC_dA)**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'At terminal velocity, what is true of the forces on the payload?',
    options: [
      'Drag is zero',
      'Drag equals weight, so the net force is zero',
      'Weight is greater than drag, so it keeps speeding up',
      'Drag is greater than weight, so it rises',
    ],
    answer: 1,
    explanation:
      'Balanced forces mean **zero acceleration**: the payload falls at a constant speed.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Area is the big lever',
    bullets: [
      'Because v ∝ 1 ÷ √A, ==quadrupling canopy area halves the descent speed== and doubles the time from the same height.',
      'Area grows with the **square of diameter**, so doubling a canopy’s diameter roughly halves the descent speed.',
      '**Large, light canopies** are the core of long times aloft, as long as they pack into the rocket and open every time.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: descent speed and time',
    problem:
      'A **4.7 g** payload uses a **40 cm** diameter dome (C_d ≈ 1.5). Estimate its descent speed and the time to fall **7 m**.',
    steps: [
      'W = 0.0047 × 9.8 ≈ **0.046 N**; A = π × 0.20² ≈ **0.126 m²**.',
      'v = √(2 × 0.046 ÷ (1.2 × 1.5 × 0.126)) ≈ **0.64 m/s**.',
      'Time ≈ 7 ÷ 0.64 ≈ **11 s**, plus the climb.',
    ],
    conclusion: 'A few grams and a hand-sized canopy give ==over ten seconds== of descent.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'The same payload switches to an 80 cm canopy of the same shape. Estimate its new descent speed in m/s (it was 0.64 m/s).',
    answer: 0.32,
    tolerance: 0.02,
    unit: 'm/s',
    explanation:
      'Doubling diameter makes area 4 times larger, and v ∝ 1 ÷ √A, so 0.64 ÷ 2 = **0.32 m/s**.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Weight and the ping pong ball',
    image: 'ppp-ball',
    bullets: [
      'A standard ping pong ball is about **2.7 g**; parachute, tape, and lines add more.',
      'Every gram raises descent speed, though ==only with the square root of weight==.',
      'Use **thin plastic** for the canopy, **light thread** for lines, and the least tape that holds.',
      'The ball **may not be altered**, so savings must come from canopy, lines, and attachment.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'If payload weight is cut to one quarter with the same canopy, by what factor does terminal speed change?',
    answer: 0.5,
    tolerance: 0.01,
    explanation: 'v ∝ √W, so √(1/4) = **0.5**: half the speed.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Drag coefficient and shape',
    bullets: [
      'A **dome-shaped canopy** has C_d around **1.3 to 1.5**; a flat sheet that does not inflate fully has less.',
      'A small **spill hole** at the top lets air escape steadily, ==reducing swinging that wastes height==.',
      '**Shroud lines** about as long as the canopy diameter help it open into a full dome.',
      'Lines that are too short pull the edge inward and **shrink the effective area**.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Does each change help or hurt the descent?',
    bins: ['Helps a slow, steady descent', 'Hurts it'],
    items: [
      ['Adding a small spill hole at the top', 0],
      ['Shroud lines about as long as the canopy diameter', 0],
      ['Very short shroud lines', 1],
      ['A dome that inflates fully', 0],
      ['A flat sheet that stays half open', 1],
      ['Extra layers of heavy tape', 1],
    ],
    explanation:
      'Full inflation and a **spill hole** raise effective drag and steadiness; short lines, poor inflation, and extra mass speed the fall.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Opening reliably',
    bullets: [
      'A parachute that does not open ==falls as fast as a crumpled bag==.',
      'Thin plastic folds compactly and opens readily, but **static and tight packing** can make it stick.',
      'Fold it **loosely**, avoid twisting lines, and test the exact packing method many times.',
      'Opening **early near apogee** gives the longest descent.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which packing habits make a canopy open reliably?',
    options: [
      'Folding the canopy loosely',
      'Keeping the shroud lines untwisted',
      'Testing the exact packing method many times',
      'Packing the canopy as tightly as possible',
      'Leaving static to hold the folds together',
    ],
    answers: [0, 1, 2],
    explanation:
      'Tight packing and **static** make thin plastic stick; loose, untwisted, rehearsed packing opens every time.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Drift and indoor air',
    bullets: [
      'A slow, light payload **drifts** with air currents.',
      'Drift can carry it into a **wall or rafter**, ending the flight early.',
      'Tournaments reduce HVAC and door drafts where possible.',
      'A **centered launch**, a **spill hole**, and a canopy that does not glide sideways help; ==watch where test descents drift==.',
    ],
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Terminal velocity', 'Steady falling speed when drag equals weight'],
      ['Drag coefficient', 'Number describing how much drag a shape makes'],
      ['Spill hole', 'Small vent at the canopy top that steadies descent'],
      ['Shroud lines', 'Threads connecting the canopy to the payload'],
    ],
    explanation: 'Area, shape, and weight together set terminal velocity.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**v = √(2W ÷ ρC_dA)**: terminal velocity when drag equals weight.',
      '==4× area halves the speed==; doubling diameter does it.',
      'Weight matters only with its **square root**; the ball may not be altered.',
      'Dome shape, **spill hole**, proper lines, and loose packing give reliable, steady descents.',
    ],
  },
]);

const deployment = defineDeck('ppp-u6-l1', [
  {
    kind: 'title',
    title: 'Deployment and separation',
    subtitle: 'A **passive** release driven only by the rocket’s own motion, timed for **apogee**.',
    objectives: [
      'Explain why **separation** is required and what energy is allowed.',
      'Design a **nose-cup release** that lets go near apogee.',
      'Follow the **loading sequence** and rehearse it.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Why separation is required',
    bullets: [
      'The payload **must separate** from the rocket.',
      'If it stays attached, timing runs until the rocket hits the ground and a **0.90 multiplier** applies.',
      'A heavy rocket hanging from a ping pong ball parachute ==would fall far faster anyway==.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Allowed energy',
    bullets: [
      'All energy must come from ==air pressure supplied through the launcher==.',
      'Prohibited: **explosives, chemical reactions, springs or elastic assists, electrical devices, remote controls, tethers, and throwing**.',
      'So deployment must be **passive**: deceleration, air drag, or the rocket turning over at apogee.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Allowed or prohibited deployment method?',
    bins: ['Allowed', 'Prohibited'],
    items: [
      ['Payload slides out of an open nose cup as the rocket tips over', 0],
      ['A rubber band that flings the payload out', 1],
      ['A battery timer that pops a latch', 1],
      ['Drag holding a light payload against the cup after burnout', 0],
      ['A string tether linking payload and rocket', 1],
      ['A tiny chemical charge', 1],
    ],
    explanation:
      'Only **launcher air pressure** may power the flight, so release must come from the rocket’s own motion.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Nose-cup release',
    bullets: [
      'Seat the payload in a loose **nose cone or open cup** on top of the rocket.',
      'During thrust the rocket pushes the payload up and **holds it in the cup**.',
      'After **burnout** the light, bulky payload feels more drag for its mass, so it ==presses into the cup==.',
      'As the rocket slows, stops, and **tips over at apogee**, the payload slides out.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order what happens to a payload in a nose cup.',
    items: [
      'Thrust pushes the rocket and payload upward together',
      'Burnout: air thrust ends',
      'Drag presses the light payload into the cup as both slow',
      'The rocket stops and tips over at apogee',
      'The payload slides out and the parachute opens',
    ],
    explanation:
      'A passive cup uses the rocket’s own **deceleration and turnover** to release near apogee.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Timing of separation',
    bullets: [
      'Ideally the payload releases ==near apogee==, so the parachute starts from the highest point.',
      '**Too early**: it opens while the rocket is fast, and may tear or tangle.',
      '**Too late**: the rocket is already falling, wasting height.',
      '**Video** of test flights shows exactly when separation happens, so you can adjust the fit.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: early release',
    problem:
      'Video shows a payload leaving the rocket **0.3 s after launch**, well before apogee, and the parachute **tangling**. What should change?',
    steps: [
      'Early release means the payload sits **too loosely** or is pushed out by airflow.',
      'Make the nose cup **slightly deeper or snugger** so it stays through the fast climb.',
      'Retest with video until release happens **near apogee**.',
    ],
    conclusion: 'Adjust the fit ==with evidence from video==, one change at a time.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Video shows the payload staying in the cup until the rocket is already falling. What should you try?',
    options: [
      'Make the cup deeper and snugger',
      'Make the cup slightly shallower or looser',
      'Add a spring to push it out',
      'Raise the pressure a lot',
    ],
    answer: 1,
    explanation:
      'A late release means the fit is **too tight**; loosen or shallow the cup slightly (springs are prohibited).',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'The loading sequence',
    steps: [
      { label: 'Rocket on', detail: 'Load the rocket onto the launcher first.' },
      {
        label: 'Payload in',
        detail: 'With the rocket **not pressurized**, place the payload on or in it.',
      },
      { label: 'Hands off', detail: '==After that, the payload may not be touched.==' },
      { label: 'Pressurize', detail: 'Pump to your chosen psi; the supervisor checks the gauge.' },
      { label: 'Launch', detail: 'A team member calls **“3, 2, 1, LAUNCH!”** and releases.' },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put the launch steps in the required order.',
    items: [
      'Load the rocket onto the launcher',
      'Place the payload on the unpressurized rocket',
      'Pressurize to the chosen psi',
      'Supervisor checks the gauge',
      'Call the countdown and release',
    ],
    explanation:
      'Rocket first, payload second, then pressure; the payload is **not touched** once placed.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Rehearsal',
    bullets: [
      'Because the payload cannot be adjusted once loaded, packing must be ==fast and consistent==.',
      'Practice the competition steps: **fold, place, check nothing is caught, pressurize**.',
      'Bring **spare parachutes** and practice switching to the second rocket.',
      'A **timed rehearsal** shows whether two launches really fit in **5 minutes**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A payload never separates and the rocket lands after 6.00 s. What does the launch score (complete log)?',
    options: ['6.00', '5.40', '1.50', '0'],
    answer: 1,
    explanation: 'No separation applies **× 0.90**: 6.00 × 0.90 = 5.40.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Passive deployment', 'Release driven by the rocket’s own motion'],
      ['Nose cup', 'Open holder on top of the rocket that carries the payload'],
      ['Burnout', 'The moment the air thrust ends'],
      ['Tether', 'A line connecting rocket and payload; prohibited'],
    ],
    explanation: 'These terms describe how a legal passive release works.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Separation is required: otherwise **× 0.90** and a fast fall.',
      '==Only launcher air pressure== may power the flight; release is passive.',
      'A **nose cup** releases as the rocket slows and tips over at apogee; tune the fit with video.',
      'Rocket, payload, then pressure, and **no touching** the payload after loading.',
    ],
  },
]);

const practiceLog = defineDeck('ppp-u7-l1', [
  {
    kind: 'title',
    title: 'The practice log and launch decisions',
    subtitle:
      'A complete log protects your score, and **good data** tells you which pressure and parachute to fly.',
    objectives: [
      'List the **required and additional** log parameters.',
      'Run **controlled tests** and read time-versus-height data.',
      'Justify a **launch pressure** and plan competition launches.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Required data',
    bullets: [
      'The log covers **10 or more test flights** and **five or more parameters**.',
      'Required: **launch pressure (psi)**, **estimated peak height (ft)**, and **time aloft (s)**.',
      'At least **two more** of your choice: fin count, parachute diameter, rocket mass, deployment method.',
      '==Missing any parameter or flight makes it incomplete== (× 0.85).',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: is this log complete?',
    problem:
      'A log has **12 flights** recording pressure, height, time, and fin count. Is it complete?',
    steps: [
      'Required: pressure, height, time, **all present**.',
      'Additional parameters: only fin count, **one of the two needed**.',
      'Total parameters: **four**, below the five required.',
    ],
    conclusion:
      'Incomplete: adding ==one more parameter to every flight== would have saved 15 percent.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A log has 9 flights with pressure, height, time, parachute diameter, and rocket mass. Is it complete?',
    options: [
      'Yes, it has five parameters',
      'No, it needs at least 10 flights',
      'No, it needs six parameters',
      'Yes, if the flights were all successful',
    ],
    answer: 1,
    explanation: 'Five parameters is enough, but the log needs **10 or more flights**.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Choosing extra parameters',
    bullets: [
      'Pick parameters you will ==actually change and learn from==.',
      '**Parachute diameter** and **payload mass** connect directly to descent rate.',
      '**Rocket mass** and **fin count** affect climb and stability.',
      'Recording **separation success** and drift notes explains outliers and helps on design questions.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Controlled testing',
    bullets: [
      '==Change one thing at a time.==',
      'To compare parachutes, keep the **rocket, pressure, and packing** the same.',
      'To find a pressure, keep the **parachute** fixed.',
      'Repeat each condition: **averages and spreads** beat one long flight that may have caught a lucky current.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'To compare two parachutes fairly, what should stay the same?',
    options: [
      'Only the rocket',
      'The rocket, the pressure, and the packing method',
      'Nothing; change everything to save time',
      'Only the pressure',
    ],
    answer: 1,
    explanation: 'Hold every other variable fixed so the **parachute** is the only difference.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Reading the data',
    bullets: [
      'Plot **time aloft against peak height**.',
      'If points fall on a straight line, your descent rate is steady; ==the slope is seconds per foot of height==.',
      'A parachute that improves the slope helps **at every venue**.',
      '**Outliers**, such as a failed opening, should be noted and explained, not deleted.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A parachute gives 9.0 s from a 15 ft apogee and 12.6 s from a 21 ft apogee. What is the descent slope in seconds per foot?',
    answer: 0.6,
    tolerance: 0.01,
    unit: 's/ft',
    explanation: '(12.6 − 9.0) ÷ (21 − 15) = 3.6 ÷ 6 = **0.6 s/ft**.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Justifying pressure',
    bullets: [
      'At competition you choose a pressure and must **justify it with data**.',
      'Bring the **pressure–height chart**, the **spread** at that pressure, and the **ceiling margin** it gives.',
      'For example: ==“60 psi has reached 19 to 21 feet in eight tests, below the 24-foot ceiling.”==',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which pieces of evidence best justify a chosen launch pressure?',
    options: [
      'The pressure–height chart',
      'The spread of heights at that pressure',
      'The margin below the announced ceiling',
      'The single longest flight ever recorded',
      'A teammate’s guess',
    ],
    answers: [0, 1, 2],
    explanation:
      'A **chart, spread, and margin** show the choice is safe and evidence-based; a single lucky flight does not.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Competition plan',
    bullets: [
      'Launch 1: the **justified pressure** with your **most reliable parachute**.',
      'If it scores well, ==repeat the same setup for launch 2== as a tiebreaker.',
      'If something fails, switch to the **backup rocket or parachute**.',
      'Know the **5-minute** window, prepare spares, and use the log as evidence when answering questions.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Does each extra parameter mainly explain the climb or the descent?',
    bins: ['Climb and stability', 'Descent rate'],
    items: [
      ['Parachute diameter', 1],
      ['Payload mass', 1],
      ['Rocket mass', 0],
      ['Fin count', 0],
    ],
    explanation:
      'Canopy size and payload mass set **descent rate**; rocket mass and fins affect **climb and stability**.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Required parameters', 'Pressure, peak height, and time aloft'],
      ['Incomplete log', 'Missing a parameter or under 10 flights'],
      ['Outlier', 'A result far from the rest, to be explained'],
      ['Descent slope', 'Seconds of time aloft gained per foot of height'],
    ],
    explanation: 'The log is both a scoring requirement and your main design tool.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**10+ flights × 5+ parameters**, including psi, ft, and s.',
      '==One variable at a time==, with repeats and explained outliers.',
      'The **time-versus-height slope** rates a parachute at every venue.',
      'Justify pressure with **chart, spread, and margin**; repeat a good setup for launch 2.',
    ],
  },
]);

export const pingPongDecksDescent = [parachute, deployment, practiceLog];
