import { defineDeck, type Deck } from './presentation-types.ts';

// Mission Possible (Division C) presentations. Each deck follows its lesson in the Mission
// Possible lessons section by section (`section` is the lesson section index), and its activities
// rehearse the lesson's scoring rules, mechanisms, calculations, worked example, and key terms.

const scoring = defineDeck('mp-u1-l1', [
  {
    kind: 'title',
    title: 'Where the points are: building a scoring plan',
    subtitle: 'A coin starts it, a gum pack ends it, and reliable actions in between score.',
    objectives: [
      'Describe the **Start Action**, **scorable actions**, and **Final Action**.',
      'Total the big-ticket and smaller bonus points.',
      'Apply the **penalties** and **tiers**.',
      'Plan for reliability over action count.',
    ],
    image: 'mp-rube',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how many scorable actions does your device complete reliably?',
    options: ['None yet', '1 to 5', '6 to 9', '10 or more'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The structure of the event',
    bullets: [
      'The device starts with a **coin dropped into a vertical slot**.',
      'It ends by dropping an unaltered **5-stick gum pack** at least 50 cm onto a small platform.',
      'In between, up to **12 scorable actions** are worth 50 points each.',
      '==High score wins==; timing, documentation, setup, size, and a clean run add more.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Put the parts of a run in order.',
    items: [
      'Supervisor drops a coin into the slot',
      'The Start Action moves visibly',
      'Scorable actions run in sequence',
      'The gum pack drops onto the platform',
    ],
    explanation:
      'The coin triggers the Start Action, the scorable actions follow, and the gum drop ends the run.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Big-ticket items',
    bullets: [
      '**Final Action**: 250 points.',
      '**Start Action**: 25, 50, or 200 points, depending on which coin starts it.',
      '**Scorable actions**: up to 12 × 50 = 600 points.',
      '**Time**: 2 points per full second up to the Target Time, so ==up to 120 at Regionals== (60 s).',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which single item is worth the most points?',
    options: [
      'The Final Action',
      'One scorable action',
      'Setup within 30 minutes',
      'A quarter-only start',
    ],
    answer: 0,
    explanation:
      'The Final Action is worth 250; a quarter-only start 200, a scorable action 50, and setup 50.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Smaller, reliable points',
    bullets: [
      '**Action Sequence List (ASL)**: up to 100, at 25 each for on time, format, accurate descriptions, and matching labels.',
      '**Setup** within 30 minutes: 50 (75 within 15 minutes at State and Nationals).',
      '**No adjustments** during the run: 75.',
      'Each dimension under 80 cm: ==0.1 point per 0.1 cm==, up to 30 per dimension.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A device measures 65 × 72 × 80 cm. How many size points does it earn in total?',
    answer: 23,
    tolerance: 0.05,
    unit: 'points',
    explanation: 'Under 80 cm by 15, 8, and 0 cm, at 1 point per cm: 15 + 8 + 0 = 23 points.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Penalties',
    bullets: [
      'Past the Target Time: **−2 points per second**; at twice the Target Time, ==no time points at all==.',
      'Each touch or adjustment: **−25**, up to three.',
      'Any solid or liquid leaving the device: **−50**.',
      'Electricity after 30 seconds: **−250**, and the action is void. Each dimension over 80 cm: **−25**.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'What does each problem cost?',
    bins: ['−25', '−50', '−250'],
    items: [
      ['A participant nudges a stuck marble', 0],
      ['Water splashes out of the device', 1],
      ['A motor runs at 34 seconds', 2],
      ['The device is 81 cm tall', 0],
    ],
    explanation:
      'Touches and oversize dimensions cost 25, material leaving the device 50, and late electricity 250.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'At Regionals (Target Time 60 s), a run lasts 70 s. How many time points does it earn?',
    answer: 100,
    tolerance: 0.05,
    unit: 'points',
    explanation: '2 × 60 = 120 for the Target Time, minus 2 × 10 = 20 for overtime: 100 points.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Tiers',
    bullets: [
      '**Tier 1**: no violations.',
      '**Tier 2**: construction or run violations not otherwise penalized, or any dimension over 82 cm.',
      '**Tier 3**: late impound, no eye protection, or unable to answer build questions.',
      'Unsafe or remote-controlled devices get participation points only. Ties go to ==fewest penalty points==, then the smallest L + D + H.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'A device measures 83 cm tall but has no other problems. Which tier is it in?',
    options: ['Tier 2', 'Tier 1', 'Tier 3', 'Participation points only'],
    answer: 0,
    explanation: 'Any dimension over 82 cm puts a device in Tier 2.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Planning for reliability',
    image: 'mp-dominoes',
    caption:
      'Like dominoes, ==every action must start the next one== for the 250-point Final Action to arrive.',
    bullets: [
      'One jammed action can cost a touch penalty, the no-adjustment bonus, and time.',
      'Eight dependable actions often outscore twelve fragile ones.',
      'Build the start and final actions first, then add scorable actions one at a time.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'One action jams and a participant fixes it. What can the team lose? Select all that apply.',
    options: [
      'A 25-point touch penalty',
      'The 75-point no-adjustment bonus',
      'Time points if the run goes long',
      'The ASL points',
    ],
    answers: [0, 1, 2],
    explanation:
      'A fix costs a touch, the no-adjustment bonus, and often time. ASL points depend on documentation, not the run.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: estimate a score',
    problem:
      'A Regional device starts on the first coin, completes 8 scorable actions and the Final Action at 58 s, earns all ASL points, sets up in 20 minutes, has no adjustments, and measures 60 × 60 × 70 cm.',
    steps: [
      'Start 25 + actions 8 × 50 = 400 + Final 250 = **675**.',
      'Time 58 × 2 = **116**; ASL **100**; setup **50**; no adjustments **75**.',
      'Size: 20 + 20 + 10 = **50**.',
    ],
    conclusion: 'Total ≈ 675 + 116 + 100 + 50 + 75 + 50 = ==1,066 points==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Start Action', back: 'Coin-triggered first action, worth 25, 50, or 200 points.' },
      { front: 'Scorable action', back: 'One of 12 listed tasks, 50 points each.' },
      { front: 'Final Action', back: 'Dropping the gum pack 50 cm onto the platform; 250 points.' },
      { front: 'Touch', back: 'An adjustment during the run; −25 each, up to three.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Each scorable action is worth {0} points, the Final Action {1}, and time earns {2} points per second up to the Target Time.',
    blanks: ['50', '250', '2'],
    distractors: ['25', '200', '1'],
    explanation: 'Actions 50 each, Final Action 250, and 2 points per second of operation.',
  },
  {
    kind: 'open',
    prompt:
      'Your device has 10 actions, but two jam in one run out of three. What would you do before the tournament?',
    model:
      'Remove or rebuild the two unreliable actions. Losing 100 points of actions is better than risking touch penalties, the 75-point no-adjustment bonus, time points, and possibly the 250-point Final Action.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Final Action 250, start up to 200, actions 50 each, time 2 per second.',
      'ASL, setup, no adjustments, and size add up to about 300 more.',
      'Touches, spills, late electricity, and overtime cost points.',
      '==Reliable actions beat many actions.==',
    ],
  },
]);

const start = defineDeck('mp-u2-l1', [
  {
    kind: 'title',
    title: 'The Start Action: coins, slots, and selective triggers',
    subtitle: 'A device that ignores the nickel and dime earns 175 extra points.',
    objectives: [
      'Follow the **coin sequence** and its points.',
      'Explain why a **quarter-only start** pays.',
      'Compare coin **sizes** and **masses**.',
      'Design a **size sorter** and a **catch bin**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which coin starts your device now?',
    options: ['Any coin', 'Only the quarter', 'It does not start reliably', 'Not built yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The coin sequence',
    bullets: [
      'The device has a **vertical coin slot** on one side, one coin wide.',
      'The supervisor drops a nickel or dime first, in the announced **Coin Drop Order**: starting then earns **25**.',
      'If not, the second small coin is dropped: starting then earns **50**.',
      'If neither works, a quarter is dropped: ==starting only then earns 200==.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the coin drops for a Coin Drop Order of dime then nickel.',
    items: ['Dime', 'Nickel', 'Quarter'],
    explanation: 'Both small coins are tried in the announced order before the quarter.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Why 200 points is possible',
    bullets: [
      'The quarter-only start ==rewards a device that can tell coins apart==.',
      'Because both small coins are tried first, ignoring them earns **175 more** points than a simple start.',
      'The Coin Drop Order is announced at setup, but a good sorter ignores both small coins either way.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'How many more points does a quarter-only start earn than a start on the first coin?',
    answer: 175,
    tolerance: 0.05,
    unit: 'points',
    explanation: '200 − 25 = 175 points.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Coin properties',
    image: 'mp-coins',
    caption: 'A quarter is about **24.3 mm** across, roughly 3 mm wider than a nickel.',
    bullets: [
      'Dime: about **17.9 mm** and 2.27 g. Nickel: about **21.2 mm** and 5.0 g. Quarter: about **24.3 mm** and 5.67 g.',
      '==Diameter is the cleanest difference.==',
      'Nickel and quarter masses differ by under a gram, which is hard to sense reliably.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each coin to its approximate diameter.',
    pairs: [
      ['Dime', '17.9 mm'],
      ['Nickel', '21.2 mm'],
      ['Quarter', '24.3 mm'],
    ],
    explanation: 'Each coin is about 3 mm wider than the next smaller one.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Sorting by size',
    bullets: [
      'Roll each coin down a slightly tilted ramp with a **gap or rail**.',
      'Coins smaller than the gap ==fall through into a catch bin==.',
      'The quarter rides across and drops onto a trigger: a lever, a balanced arm, or a falling domino.',
      'A gap between 22 and 24 mm separates them; leave room for wear and alignment.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which rail gap best rejects nickels and dimes but carries quarters?',
    options: ['22.7 mm', '20.0 mm', '24.5 mm', '18.0 mm'],
    answer: 0,
    explanation:
      '22.7 mm is wider than a nickel (21.2 mm) and narrower than a quarter (24.3 mm), with margin on both sides.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Timing starts with motion',
    bullets: [
      'Timing begins with ==the first action, not the coin’s insertion==, so that action must be clearly visible.',
      'If the quarter fails, the team gets a **20-second countdown** to drop another quarter from above; timing starts then, with no start points.',
      'If a team must touch the device to start it, there are **no start points** and a touch penalty applies.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'When does timing begin?',
    options: [
      'When the first action visibly moves',
      'When the supervisor drops the first coin',
      'When the team says it is ready',
      'When the gum pack is loaded',
    ],
    answer: 0,
    explanation:
      'Timing starts with the first action, so make that motion easy for the supervisor to see.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Returning the coins',
    bullets: [
      'All coins are supplied by the supervisor and ==must be returned==, or a competition violation is assessed.',
      'Design the sorter so rejected coins land in an **accessible bin**.',
      'A bin also stops loose coins leaving the device, which would cost **50 points**.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Why should rejected coins land in a catch bin? Select all that apply.',
    options: [
      'Coins must be returned to the supervisor',
      'A coin leaving the device costs 50 points',
      'Loose coins could jam later actions',
      'The bin earns its own scorable action',
    ],
    answers: [0, 1, 2],
    explanation:
      'A bin makes return easy, keeps coins inside, and protects other actions. It does not score.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: design the gap',
    problem:
      'Design a rail gap that rejects nickels and dimes but passes quarters, allowing 0.5 mm tolerance on each side.',
    steps: [
      'Largest coin to reject: nickel, 21.2 mm; gap must be wider than **21.7 mm**.',
      'Smallest coin to keep: quarter, 24.3 mm; gap must be narrower than **23.8 mm**.',
      'Choose a gap near **22.7 mm**, centered in the window.',
    ],
    conclusion:
      'A gap near 22.7 mm ==drops both small coins and carries the quarter== to the trigger.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Coin Drop Order',
        back: 'Nickel then dime, or dime then nickel, announced at setup.',
      },
      {
        front: 'Quarter-only start',
        back: 'Ignores small coins and starts on the quarter; 200 points.',
      },
      { front: 'Catch bin', back: 'Container for rejected coins so they can be returned.' },
      { front: 'Countdown restart', back: '20 s to drop a quarter from above; no start points.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'A start on the first coin earns {0} points and a quarter-only start earns {1}. Sorting works best by coin {2}.',
    blanks: ['25', '200', 'diameter'],
    distractors: ['50', '250', 'color'],
    explanation: 'First coin 25, quarter only 200; diameter separates the coins most cleanly.',
  },
  {
    kind: 'open',
    prompt:
      'Your sorter sometimes lets a worn nickel ride across to the trigger. What would you change?',
    model:
      'Widen the gap slightly toward the middle of the 21.7 to 23.8 mm window, tilt the rail a little more so coins sit against its edge, and test with many worn coins of each type.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'First coin 25, second 50, quarter only 200.',
      'Diameter separates the coins best; a 22 to 24 mm gap works.',
      'Timing starts at the first visible action.',
      '==Catch and return every coin.==',
    ],
  },
]);

const machines = defineDeck('mp-u3-l1', [
  {
    kind: 'title',
    title: 'Simple machines: levers, inclines, pulleys, and screws',
    subtitle: 'Each scorable machine must show its ideal mechanical advantage in its geometry.',
    objectives: [
      'Calculate **ideal mechanical advantage (IMA)**.',
      'Identify the three **lever classes**.',
      'Size an **incline** and a **pulley system**.',
      'Build **screw** and **Archimedes screw** actions.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which simple machine action have you built?',
    options: ['Lever', 'Incline or pulley', 'Screw', 'None yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Ideal mechanical advantage',
    bullets: [
      '**IMA** is the force multiplication with no friction.',
      'Lever: **effort arm ÷ load arm**. Incline: **slope length ÷ vertical height**.',
      'Pulleys: the ==number of rope segments supporting the moving load==.',
      'The rules use IMA, so you must be able to show the geometry, not just the motion.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'A lever has an effort arm of 30 cm and a load arm of 10 cm. What is its IMA?',
    answer: 3,
    tolerance: 0.01,
    explanation: 'IMA = effort arm ÷ load arm = 30 ÷ 10 = 3.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Three lever classes',
    image: 'mp-levers',
    caption:
      'Pliers are first-class levers and a wheelbarrow is second-class; each arm is measured from the pivot.',
    bullets: [
      '**First class**: fulcrum between effort and load, like a seesaw.',
      '**Second class**: load between fulcrum and effort, like a wheelbarrow.',
      '**Third class**: effort between fulcrum and load, like tweezers. ==One action needs all three classes==.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each lever class to an example.',
    pairs: [
      ['First class', 'Seesaw'],
      ['Second class', 'Wheelbarrow'],
      ['Third class', 'Tweezers'],
    ],
    explanation:
      'The fulcrum, the load, or the effort sits in the middle for first, second, and third class levers.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The inclined plane',
    image: 'mp-incline',
    caption: 'IMA = slope length l ÷ height h.',
    bullets: [
      'One action moves an object of **at least 400 g** up an incline with **IMA of at least 2**, rising at least 10 cm.',
      'IMA 2 means the slope is ==at least twice as long as its rise==: 20 cm long for 10 cm up.',
      'The mass must be removable so the supervisor can verify it.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'An incline must have an IMA of at least 2 and a rise of 12 cm. What is the shortest legal slope length, in cm?',
    answer: 24,
    tolerance: 0.05,
    unit: 'cm',
    explanation: 'Slope length = IMA × height = 2 × 12 = 24 cm.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Pulley systems',
    image: 'mp-pulley',
    caption: 'In a block and tackle, the rope segments holding the lower block share the load.',
    bullets: [
      'One action uses pulleys with **IMA of at least 3** to lift at least 400 g by 10 cm or more.',
      'A single fixed pulley only changes direction: IMA 1.',
      'With IMA 3, the effort rope moves ==three times as far as the load==: 30 cm of pull for 10 cm of lift.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A pulley system with IMA 3 lifts a load 12 cm. How far must the effort rope be pulled, in cm?',
    answer: 36,
    tolerance: 0.05,
    unit: 'cm',
    explanation: 'Rope distance = IMA × lift = 3 × 12 = 36 cm.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Screws',
    image: 'mp-pitch',
    caption: 'A pitch gauge measures **pitch**, the distance a screw advances in one full turn.',
    bullets: [
      'A screw turns rotation into linear motion.',
      'One action uses gravity to turn a screw ==at least two full turns==, moving an object at least 2 cm; mark the screw so rotation shows.',
      'A falling weight on a string wound around a spool on a threaded rod works. The nut must not turn with the rod.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'The nut spins along with the threaded rod instead of moving. What is wrong?',
    options: [
      'The nut is not held against turning',
      'The pitch is too fine',
      'The weight is too heavy',
      'The rod is not marked',
    ],
    answer: 0,
    explanation:
      'The nut only travels along the rod if something stops it turning, such as a guide slot.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Archimedes screw',
    image: 'mp-archimedes',
    caption: 'An Archimedes screw lifts what it carries ==one turn at a time== as it rotates.',
    bullets: [
      'A helix inside a tube, or a tube wrapped around a shaft, tilted upward.',
      'The action must raise a **marble at least 20 cm**, with the whole action visible; a clear tube helps.',
      'Keep the tilt shallow so the marble rides each turn instead of rolling back.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'The marble keeps rolling back down an Archimedes screw. What is the best first fix?',
    options: [
      'Make the tilt shallower',
      'Spin the screw backward',
      'Use a heavier marble',
      'Make the tube opaque',
    ],
    answer: 0,
    explanation:
      'If the screw is too steep, each turn cannot hold the marble; a shallower tilt lets it ride up.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: screw turns',
    problem:
      'A screw has a pitch of 1.5 mm. How many turns move an object 2.0 cm, and is that enough rotation?',
    steps: [
      '2.0 cm = **20 mm**.',
      'Turns = 20 ÷ 1.5 ≈ **13.3 turns**.',
      'The rule needs at least 2 full turns and 2 cm; **13.3 turns** satisfies both.',
    ],
    conclusion:
      'A fine pitch easily meets the rule but ==needs a long spool string== or many turns.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'IMA', back: 'Frictionless force multiplication from geometry.' },
      { front: 'Fulcrum', back: 'Pivot point of a lever.' },
      { front: 'Supporting segments', back: 'Rope sections holding a pulley load; equal to IMA.' },
      { front: 'Pitch', back: 'Distance a screw advances per full turn.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Lever IMA is effort arm divided by {0} arm. Incline IMA is slope length divided by {1}. Pulley IMA is the number of supporting rope {2}.',
    blanks: ['load', 'height', 'segments'],
    distractors: ['effort', 'width', 'pulleys'],
    explanation: 'IMA comes from geometry: arms, slope over rise, and supporting segments.',
  },
  {
    kind: 'open',
    prompt: 'How would you show a supervisor that your pulley action has an IMA of at least 3?',
    model:
      'Point out the three rope segments supporting the movable pulley holding the load, and show that pulling the effort rope 30 cm lifts the load 10 cm.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'IMA comes from geometry: arms, slope ÷ rise, supporting segments.',
      'One action needs all three lever classes.',
      'Incline IMA ≥ 2 and pulley IMA ≥ 3, each lifting 400 g.',
      '==Screws need two marked turns; an Archimedes screw lifts a marble 20 cm.==',
    ],
  },
]);

const chemistry = defineDeck('mp-u4-l1', [
  {
    kind: 'title',
    title: 'Chemical actions: gas, cold, and fizz',
    subtitle: 'Reactions that inflate, cool, and push, measured and contained.',
    objectives: [
      'Size a **vinegar and baking soda** balloon action.',
      'Use the **limiting reactant** and **molar volume**.',
      'Build **endothermic** and **Alka-Seltzer** actions.',
      'Keep chemical steps safe, contained, and on time.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which chemical action feels hardest to make reliable?',
    options: ['Balloon inflation', 'Endothermic cooling', 'Alka-Seltzer', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Vinegar and baking soda',
    image: 'mp-vinegar',
    caption: 'Foam forms as acetic acid and baking soda release **carbon dioxide**.',
    bullets: [
      'Acetic acid + sodium bicarbonate → sodium acetate + water + **CO₂**.',
      'Trapped in a balloon, the gas inflates it.',
      'The balloon must ==expand 20 cm and strike an object== that started at least 20 cm above it.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What sets how much gas a vinegar and baking soda reaction makes?',
    options: [
      'The limiting reactant',
      'The balloon color',
      'The container shape',
      'The room’s humidity',
    ],
    answer: 0,
    explanation: 'The reactant that runs out first limits how much CO₂ forms.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Getting enough gas',
    bullets: [
      '1 g of baking soda is about **0.012 mol** and can make about 0.012 mol of CO₂.',
      'At about 24 L per mole, that is ==roughly 290 mL== at room temperature.',
      'Household vinegar is about 5 percent acetic acid, **0.83 mol/L**, so about 15 mL reacts with 1 g.',
      'Test how much gas your balloon needs, and add a margin.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'You need 0.50 L of CO₂. How many grams of baking soda (84 g/mol) does that take? Use 24 L/mol.',
    answer: 1.75,
    tolerance: 0.03,
    unit: 'g',
    explanation: '0.50 ÷ 24 ≈ 0.0208 mol; 0.0208 × 84 ≈ 1.75 g.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Endothermic actions',
    bullets: [
      'An **endothermic** process absorbs heat and cools its surroundings.',
      'Dissolving ammonium chloride, or citric acid with baking soda, cools noticeably.',
      'The temperature drop must ==initiate the next action==: contracting a sealed gas, or bending a bimetallic strip or wax.',
      'A cooling that does nothing does not count.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which could let a temperature drop start the next action? Select all that apply.',
    options: [
      'Gas contracting in a sealed container to pull a piston',
      'A bimetallic strip bending to release a latch',
      'Wax shrinking to free a lever',
      'A thermometer simply showing the drop',
    ],
    answers: [0, 1, 2],
    explanation: 'The cooling must move something. A reading alone does not initiate an action.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Alka-Seltzer',
    image: 'mp-alka',
    caption:
      'Citric acid and sodium bicarbonate in the tablet react in water, releasing **carbon dioxide**.',
    bullets: [
      'The scorable action drops ==two tablets into water==, and the reaction triggers the next action.',
      'Gas pressure can push a piston or lift a float.',
      'Warm water reacts much faster, which also changes your timing.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'The competition room is colder than your practice room. What happens to the Alka-Seltzer action?',
    options: [
      'It reacts more slowly and takes longer',
      'It reacts faster',
      'It makes no gas',
      'Nothing changes',
    ],
    answer: 0,
    explanation: 'Colder water slows the reaction, so test at the competition room’s temperature.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Safety and containment',
    bullets: [
      '**Hazardous chemicals, flammable gases, and dry ice** are prohibited; every device must pass a safety inspection.',
      'Keep liquids in sealed or deep containers: ==any liquid leaving the device costs 50 points==.',
      'Use eye protection, label containers, and know what is in each.',
      'Choose the mildest chemicals that do the job.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Is each allowed in a chemical action?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['Vinegar and baking soda', 0],
      ['Alka-Seltzer in water', 0],
      ['Dry ice in a bottle', 1],
      ['A flammable gas', 1],
    ],
    explanation: 'Mild household reactions are fine; dry ice and flammable gases are prohibited.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reliability and timing',
    bullets: [
      'Chemical actions vary with **temperature, freshness, and mixing**.',
      'Pre-measure reactants into labeled cups; use fresh tablets and vinegar.',
      'Test at the competition room’s temperature.',
      'Time each reaction: ==chemical steps are often the slowest and least predictable==.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A recipe needs 2.0 g of baking soda. With a 20 percent margin, how many grams should you pre-measure?',
    answer: 2.4,
    tolerance: 0.01,
    unit: 'g',
    explanation: '2.0 × 1.2 = 2.4 g.',
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: size the reaction',
    problem:
      'You need about 600 mL of CO₂ to inflate a balloon to size. How much baking soda and vinegar should you use?',
    steps: [
      'Moles CO₂ = 0.600 L ÷ 24 L/mol = **0.025 mol**.',
      'Baking soda: 0.025 × 84 g/mol ≈ **2.1 g**.',
      'Vinegar: 0.025 ÷ 0.83 mol/L ≈ **30 mL**; add about 20 percent to each.',
    ],
    conclusion:
      'About ==2.5 g of baking soda with 36 mL of vinegar== gives enough gas with margin.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Limiting reactant',
        back: 'The reactant that runs out first, setting the product amount.',
      },
      { front: 'Endothermic', back: 'Absorbs heat from the surroundings, causing cooling.' },
      { front: 'Molar volume', back: 'About 24 L per mole of gas at room conditions.' },
      { front: 'Containment', back: 'Keeping solids and liquids inside the device.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Baking soda and vinegar release {0}. One mole of gas fills about {1} L at room temperature, and an {2} process cools its surroundings.',
    blanks: ['carbon dioxide', '24', 'endothermic'],
    distractors: ['oxygen', '12', 'exothermic'],
    explanation:
      'CO₂ is the gas, 24 L per mole is the molar volume, and endothermic processes cool.',
  },
  {
    kind: 'open',
    prompt:
      'Your balloon action works at home but fails at the tournament. List what you would check.',
    model:
      'Check the room and water temperature, the freshness of the vinegar and baking soda, that the reactants were measured and mixed fully, that the balloon is sealed, and that the target object starts in the right place.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Gas volume ≈ moles × 24 L; the limiting reactant decides moles.',
      'Cooling or fizzing must physically start the next action.',
      'No hazardous chemicals, flammable gases, or dry ice; keep liquids in.',
      '==Pre-measure, use fresh reactants, and time every reaction.==',
    ],
  },
]);

const electrical = defineDeck('mp-u5-l1', [
  {
    kind: 'title',
    title: 'Electrical, infrared, and magnetic actions',
    subtitle: 'Electricity is allowed, but only for the first 30 seconds.',
    objectives: [
      'Apply the **electricity rules** and the **30-second rule**.',
      'Build an **infrared beam** action.',
      'Break a string with **nichrome** wire.',
      'Release an object by **removing a magnet**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how many seconds into your run does your last electrical action finish?',
    options: ['Under 15 s', '15 to 25 s', 'Over 25 s', 'No electrical actions yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Electricity rules',
    bullets: [
      'Only **commercial batteries**, with ==no more than 9 V across any two points==, calculated from labels.',
      '**Arduinos, Raspberry Pis, and integrated circuits** are banned.',
      'Timing may not be powered by electricity or springs.',
      'Electricity after the first **30 seconds** costs 250 points and the action does not count.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each part allowed?',
    bins: ['Allowed', 'Not allowed'],
    items: [
      ['A labeled 9 V battery', 0],
      ['A relay', 0],
      ['An Arduino board', 1],
      ['Two 9 V batteries in series', 1],
      ['An integrated circuit timer chip', 1],
    ],
    explanation:
      'Batteries up to 9 V and simple discrete parts are fine; microcontrollers, ICs, and over 9 V are banned.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Planning around 30 seconds',
    bullets: [
      'Timing starts with the first action, so ==all electrical actions must happen early==.',
      'Put the infrared beam and string-breaking actions near the start.',
      'Then disconnect power mechanically, for example with a switch the device itself opens.',
      'Measure the timeline so electrical steps finish well before 30 s, even on a fast run.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Where in the sequence should the electrical actions go?',
    options: [
      'Near the start, finishing well before 30 seconds',
      'Near the end, just before the gum drop',
      'Anywhere, as long as they are labeled',
      'Right after the water timer',
    ],
    answer: 0,
    explanation:
      'Electricity is allowed only in the first 30 seconds, so schedule it early with margin.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Infrared beam',
    image: 'mp-irled',
    caption: 'Remote-control **IR LEDs** glow in a camera image but are invisible to the eye.',
    bullets: [
      'Transmitter and receiver at least **20 cm apart**; the transmitter is an IR LED, the receiver **photodiode-based**.',
      'Breaking or completing the beam changes the receiver’s output, which can switch a relay to run a motor or solenoid.',
      '==Shield the receiver from room light.==',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The relay',
    image: 'mp-relay',
    caption:
      'A **relay** is an electrically operated mechanical switch: a small receiver current can turn on a motor circuit.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each part to its job in the beam action.',
    pairs: [
      ['IR LED', 'Sends the infrared beam'],
      ['Photodiode', 'Senses the beam'],
      ['Relay', 'Switches the motor circuit'],
      ['Shield tube', 'Blocks room light'],
    ],
    explanation:
      'The LED sends, the photodiode senses, the relay switches, and shielding keeps it reliable.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Breaking a string',
    image: 'mp-nichrome',
    caption:
      '**Nichrome** resistance wire heats when current flows; a short length melts nylon line in seconds.',
    bullets: [
      'Electricity must directly or indirectly ==break a string or fishing line==, dropping an object that starts the next action.',
      'Power = **V² ÷ R**: lower resistance heats faster but drains the battery.',
      'Keep the hot wire away from flammable materials.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A 6 V battery pack drives a 3 Ω nichrome segment. What power does it deliver, in watts?',
    answer: 12,
    tolerance: 0.05,
    unit: 'W',
    explanation: 'P = V² ÷ R = 36 ÷ 3 = 12 W.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Magnet removal',
    image: 'mp-magnet',
    caption:
      'Strong **neodymium** magnets, like this one from a hard drive, hold steel firmly at close range.',
    bullets: [
      'One action removes a magnet so a magnetic object ==falls due to the loss of magnetic force==.',
      'Example: a steel ball held under a shelf drops when an earlier action slides the magnet away.',
      'Magnetic force falls off steeply with distance, so even a short slide releases it.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why does sliding the magnet only a little way release the steel ball?',
    options: [
      'Magnetic force drops steeply with distance',
      'The magnet loses its magnetism when moved',
      'Gravity gets stronger near the shelf',
      'The ball becomes non-magnetic',
    ],
    answer: 0,
    explanation: 'Magnetic force weakens rapidly as the gap grows, so a short slide is enough.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reliability',
    bullets: [
      'Electrical actions depend on **battery voltage, connections, and alignment**.',
      'Use fresh batteries, solid connections, and alignment guides for the beam.',
      'Make it ==visible to the supervisor== that the beam was interrupted or the line broke.',
      'Label each action with its ASL number and be ready to show labeled battery voltages.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which make electrical actions more reliable? Select all that apply.',
    options: [
      'Fresh batteries',
      'Alignment guides for the beam',
      'Soldered or screwed connections',
      'Running them after 30 s',
    ],
    answers: [0, 1, 2],
    explanation:
      'Fresh power, alignment, and firm connections help. Running after 30 s costs 250 points.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: the hot wire',
    problem:
      'A 9 V battery drives a nichrome segment of 6 Ω. What current and power result, and is the plan legal?',
    steps: [
      'Current I = V ÷ R = 9 ÷ 6 = **1.5 A**.',
      'Power P = V × I = 9 × 1.5 = **13.5 W**, enough to melt nylon line quickly.',
      'Legal with one labeled 9 V battery, finishing within the first 30 s.',
    ],
    conclusion:
      'The hot wire works fast: ==schedule it early and disconnect power== after the line breaks.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'IR LED', back: 'Diode producing infrared light; the required transmitter.' },
      { front: 'Photodiode', back: 'Light sensor that produces current when light hits it.' },
      { front: 'Nichrome', back: 'Resistance wire that heats with current; cuts line.' },
      { front: '30-second rule', back: 'No electricity after the first 30 seconds of operation.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Circuits may use at most {0} V and only in the first {1} seconds. A {2} wire heats to cut fishing line.',
    blanks: ['9', '30', 'nichrome'],
    distractors: ['12', '60', 'copper'],
    explanation: '9 V maximum, the 30-second rule, and nichrome for cutting line.',
  },
  {
    kind: 'open',
    prompt:
      'How would you make sure no electricity flows after 30 seconds, even if the run is slow?',
    model:
      'Put electrical actions first and have the device open a mechanical switch, or pull a battery contact, right after the last electrical action, so power is cut no matter how long later steps take.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Commercial batteries, 9 V maximum, no microcontrollers or ICs.',
      'Electricity only in the first 30 seconds; disconnect it mechanically.',
      'IR LED to photodiode at 20 cm or more; nichrome cuts line; magnets release with distance.',
      '==Make every electrical step visible and early.==',
    ],
  },
]);

const timing = defineDeck('mp-u6-l1', [
  {
    kind: 'title',
    title: 'Timing: Target Time, the water timer, and pacing',
    subtitle: 'Finish close to the Target Time, never far past it.',
    objectives: [
      'Calculate **time points** and **overtime** penalties.',
      'Know the **Target Time** at each level.',
      'Design and adjust a **water timer**.',
      'Pace the device to finish just under the target.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how long does your device run now?',
    options: ['Under 30 s', '30 to 60 s', 'Over 60 s', 'Not measured yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Time points',
    bullets: [
      '**+2 points per full second** of operation up to the Target Time.',
      '**−2 points per second** past it, up to twice the Target Time.',
      'A run lasting ==twice the Target Time earns no time points==.',
      'Timing stops when the gum comes to rest on the platform.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'Target Time is 60 s and the run lasts 54 s. How many time points does it earn?',
    answer: 108,
    tolerance: 0.05,
    unit: 'points',
    explanation: '2 × 54 = 108 points.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Target Times',
    bullets: [
      '**Regionals**: 60 s. **State**: 61 to 90 s. **Nationals**: 91 to 120 s.',
      'Teams learn the exact value ==at the start of setup==.',
      'A State or National device needs a way to add 30 or more seconds on short notice.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each level to its Target Time.',
    pairs: [
      ['Regionals', '60 s'],
      ['State', '61 to 90 s'],
      ['Nationals', '91 to 120 s'],
    ],
    explanation: 'The Target Time grows at each level and is announced at setup.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The water timer',
    bullets: [
      'Teams may designate one **water timer**, an action lasting over 10 s, that is not a scorable action.',
      'It earns ==1 bonus point per full second== it runs before the Target Time.',
      'It must initiate the next action.',
      'At State and Nationals, teams must show how it is adjusted for the Target Time to get the bonus.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which are true of the water timer? Select all that apply.',
    options: [
      'It must last more than 10 seconds',
      'It must start the next action',
      'It earns 1 point per second before the Target Time',
      'It counts as one of the 12 scorable actions',
    ],
    answers: [0, 1, 2],
    explanation:
      'The water timer is a designated non-scorable action with its own per-second bonus.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'How water timers work',
    image: 'mp-torricelli',
    caption:
      'Torricelli’s law: outflow speed is v = √(2gh), so ==flow slows as the water depth h drops==.',
    bullets: [
      'Water drains through a small hole into a cup that tips, or under a float that rises, releasing the next action.',
      'Flow slows as the level drops.',
      'Adjust time with the **starting volume**, the **hole size**, or the **tipping volume**.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'Using v = √(2gh) with g = 9.8 m/s², how fast does water leave a hole 0.20 m below the surface, in m/s?',
    answer: 1.98,
    tolerance: 0.02,
    unit: 'm/s',
    explanation: 'v = √(2 × 9.8 × 0.20) = √3.92 ≈ 1.98 m/s.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Pacing the device',
    bullets: [
      'Measure every action’s duration and add them up.',
      'The water timer is your ==adjustable buffer==: set it so the chain ends near the Target Time.',
      'The timer earns 1 point per second and the device 2, so a timer that keeps the run on time is worth up to **3 points per second**.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A State Target Time is announced 25 s longer than your practice runs. What should you adjust?',
    options: [
      'The water timer, by about 25 s',
      'The coin sorter',
      'The number of scorable actions',
      'The gum drop height',
    ],
    answer: 0,
    explanation: 'The water timer is the adjustable buffer for matching the Target Time.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Avoiding overtime',
    bullets: [
      'Running long costs **2 points per second**, and at twice the Target Time, all time points.',
      'Slow reactions, jams, and adjustments push runs long.',
      '==Aim slightly under the Target Time== so normal variation does not cross it.',
      'Keep the gum drop reliable so timing stops when expected.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'Target Time is 60 s and a run lasts 68 s. How many time points does it earn?',
    answer: 104,
    tolerance: 0.05,
    unit: 'points',
    explanation: '2 × 60 = 120, minus 2 × 8 = 16 for overtime: 104 points.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: an overtime run',
    problem:
      'Target Time 60 s. The device runs 67 s with a 25-s water timer that ended at 40 s. Calculate time points and timer bonus.',
    steps: [
      'Time points: 2 × 60 = 120, minus 2 × 7 = 14 → **106**.',
      'Water timer: 25 full seconds before the Target Time → **+25**.',
      'Total from timing: **131 points**.',
    ],
    conclusion:
      'Shortening the timer by 7 s gives 120 time points but loses 7 timer points: ==a net gain of 7==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Target Operation Time', back: 'The run length teams aim for, announced at setup.' },
      { front: 'Water timer', back: 'Non-scorable action over 10 s earning 1 point per second.' },
      { front: 'Torricelli’s law', back: 'Outflow speed v = √(2gh) from a hole at depth h.' },
      { front: 'Overtime penalty', back: '−2 points per second past the Target Time.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The device earns {0} points per second up to the Target Time. The water timer earns {1} point per second, and a run lasting {2} the Target Time earns no time points.',
    blanks: ['2', '1', 'twice'],
    distractors: ['3', '5', 'half'],
    explanation:
      '2 per second for the device, 1 per second for the timer, and nothing at twice the target.',
  },
  {
    kind: 'open',
    prompt:
      'Describe how your water timer could be adjusted quickly for any Target Time from 61 to 90 s.',
    model:
      'Use marked fill lines on the reservoir, calibrated by measured drain times, so the team can pour in the volume for the announced Target Time minus the other actions’ total. A swappable hole insert gives a second adjustment.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '+2 per second up to the target, −2 per second past it, zero at twice.',
      'Regionals 60 s; State 61–90 s; Nationals 91–120 s.',
      'The water timer is the adjustable buffer and earns 1 per second.',
      '==Aim slightly under the Target Time.==',
    ],
  },
]);

const finale = defineDeck('mp-u7-l1', [
  {
    kind: 'title',
    title: 'The Final Action, the ASL, and competition day',
    subtitle: 'A gum pack, a numbered list, and a practiced setup.',
    objectives: [
      'Meet the **gum drop** and **platform** rules.',
      'Keep the pack on a small platform.',
      'Write a correct **Action Sequence List**.',
      'Avoid lost points and plan **setup** and **impound**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how often does your gum pack stay on the platform?',
    options: ['Almost always', 'About half the time', 'Rarely', 'Not tested yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'The gum drop',
    image: 'mp-gum',
    caption: 'The Final Action drops an unaltered, store-bought **5-stick** gum pack.',
    bullets: [
      'After all scorable actions are attempted, the pack falls ==at least 50 cm== onto a platform.',
      'The platform is flat, rigid, unpadded, at most **12 × 12 × 0.5 cm**, with no sides and no walls within 4 cm.',
      'Its top is at least 2 cm above the base. The Final Action earns **250 points**.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Which platforms are legal? Select all that apply.',
    options: [
      'A rigid 10 × 10 × 0.5 cm plate',
      'A 12 × 12 cm plate with no walls within 4 cm',
      'A foam-padded 10 × 10 cm plate',
      'A 12 × 12 cm tray with 1 cm sides',
    ],
    answers: [0, 1],
    explanation: 'The platform must be rigid, unpadded, at most 12 × 12 × 0.5 cm, with no sides.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Landing and removal',
    bullets: [
      'The gum must be the ==only thing on the platform==, supported only by it and clearly visible.',
      'An opening on the coin-slot side lets a team member reach in and **remove the pack**; otherwise the Final Action does not count.',
      'Touching the action that releases the gum: no Final Action points and **zero time points**.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A team member pushes the stuck gum release by hand. What happens?',
    options: [
      'No Final Action points and zero time points',
      'A 25-point touch penalty only',
      'The Final Action still counts',
      'The team moves to Tier 3',
    ],
    answer: 0,
    explanation: 'Touching the gum release voids the Final Action and all time points.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Staying on a small platform',
    bullets: [
      'A pack falling 50 cm lands at about **3.1 m/s** and tends to bounce.',
      'Release it ==flat, from a level guide==, and drop it near the platform center.',
      'A smooth platform lets it slide, so test how far it moves.',
      'A short chute ending above the 50 cm mark steadies the fall without walls near the platform.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Using v = √(2gh) with g = 9.8 m/s², how fast does a pack dropped 0.60 m land, in m/s?',
    answer: 3.43,
    tolerance: 0.02,
    unit: 'm/s',
    explanation: 'v = √(2 × 9.8 × 0.60) = √11.76 ≈ 3.43 m/s.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The Action Sequence List',
    bullets: [
      'The **ASL** documents every scorable and non-scorable action in order.',
      'Column 1: an **ordinal number** matching a label in the device. Column 2: the **object moved**. Column 3: the **rule task**, as a roman numeral i to xii.',
      '==Only actions listed by numeral can score==; actions skipped because something starts out of order earn zero.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the three ASL columns.',
    items: ['Ordinal number matching a device label', 'Object moved', 'Rule task numeral'],
    explanation: 'Number, object, then the task numeral from i to xii.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Rules that remove points',
    bullets: [
      'Each movable object may be used in **only one** assigned action.',
      '**Parallel and dead-end actions** do not count.',
      'If a participant completes an action, or directly completes it by adjusting, ==it scores nothing==.',
      'Up to three adjustments at −25 each; adjusting just to stall for time leads to disqualification.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Does each action score?',
    bins: ['Can score', 'Scores nothing'],
    items: [
      ['An action in the main chain, listed with its numeral', 0],
      ['A branch that leads nowhere', 1],
      ['An action a participant finishes by hand', 1],
      ['A marble reused for a second task', 1],
    ],
    explanation:
      'Only listed actions in the chain to the Final Action score, each with its own object.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Setup and impound',
    bullets: [
      'At State and Nationals, devices, the ASL, and tools are **impounded** before the first time slot.',
      'Setup within 30 minutes earns **50**; within 15 minutes at State and Nationals, **75**.',
      '==Practice the full setup with a timer.==',
      'Pre-measure reactants, label everything, and bring spare balloons, tablets, and gum.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'At a State tournament, a team sets up in 14 minutes. How many setup points does it earn?',
    options: ['75', '50', '25', '0'],
    answer: 0,
    explanation: 'At State and Nationals, setup within 15 minutes earns 75 points.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: the landing',
    problem:
      'Estimate the landing speed of a gum pack dropped 55 cm, and suggest how to keep it on the platform.',
    steps: [
      'v = √(2 × 9.8 × 0.55) ≈ **3.3 m/s**.',
      'At that speed a tilted pack bounces or slides off a 12 cm platform.',
      'Use a **level release guide** and center the drop; test slide distance on the real platform.',
    ],
    conclusion: '==Drop flat and centered==, with room on the platform for the pack to slide.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Platform', back: 'Flat, rigid, unpadded, at most 12 × 12 × 0.5 cm, no sides.' },
      { front: 'ASL columns', back: 'Ordinal number, object moved, and rule task numeral.' },
      { front: 'Dead-end action', back: 'An action that does not lead to the Final Action.' },
      { front: 'Setup bonus', back: '50 within 30 min; 75 within 15 min at State and Nationals.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The gum pack falls at least {0} cm onto a platform no larger than {1} cm on a side. Rule tasks in the ASL use roman {2}.',
    blanks: ['50', '12', 'numerals'],
    distractors: ['30', '20', 'letters'],
    explanation: 'A 50 cm drop, a 12 × 12 cm platform, and roman numerals i to xii.',
  },
  {
    kind: 'open',
    prompt: 'Write a short checklist for the hour before your time slot.',
    model:
      'Check the ASL labels match the device, pre-measure reactants, load fresh tablets and a new gum pack, check battery voltages, confirm the water timer setting for the Target Time, and rehearse the setup with a timer.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Gum drops 50 cm onto a rigid 12 × 12 cm platform for 250 points.',
      'It must be removable, and the release must never be touched.',
      'The ASL numbers every action; only listed numerals score.',
      '==No dead ends, no reused objects, and a practiced setup.==',
    ],
  },
]);

export const decks: Deck[] = [scoring, start, machines, chemistry, electrical, timing, finale];
