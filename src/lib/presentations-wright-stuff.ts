import { defineDeck, type Deck } from './presentation-types.ts';
import { wrightStuffDecksFlight } from './presentations-wright-stuff-2.ts';

// Wright Stuff (Division C) presentations. Each deck follows its lesson in the Wright Stuff
// course section by section (`section` is the lesson section index), and its activities
// rehearse the lesson's rules, worked example, and design reasoning.

const rules = defineDeck('ws-u1-l1', [
  {
    kind: 'title',
    title: 'Rules, scoring, and the flight log bonus',
    image: 'ws-f1d',
    subtitle:
      'Two rubber-powered indoor airplanes, ten minutes, and a score built from **time aloft** and a **complete flight log**.',
    objectives: [
      'State the airplane’s **size, mass, and motor limits**.',
      'Calculate a flight score with the **log bonus**.',
      'Plan the **10-minute Flight Period**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what do you think decides most Wright Stuff scores?',
    options: [
      'Building the lightest plane possible',
      'Trim and motor winding',
      'A powerful launch throw',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The goal: maximum time aloft',
    bullets: [
      'Build up to **two free-flight airplanes** powered only by **rubber motors**, flown indoors.',
      'Nothing controls the plane after release, so every flight depends on **design, trim, and winding**.',
      'The rules reward a plane that ==climbs gently, cruises slowly in wide circles==, and lands only after the motor runs down.',
    ],
    callout:
      'Free flight means the work happens before release: the plane flies the way you set it up.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which flight profile earns the most time in Wright Stuff?',
    options: [
      'A fast climb straight to the ceiling, then a steep glide',
      'A gentle climb, a slow wide-circle cruise, and a landing as the motor runs down',
      'A long straight flight across the gym',
      'A tight spiral that stays near the launch point at low height',
    ],
    answer: 1,
    explanation:
      'Time aloft is the score. A gentle climb and **slow circling cruise** spend the motor’s energy over the longest time while staying inside the room.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Size and mass limits',
    bullets: [
      'The plane must fit a lidless **measurement box** of **32.0 × 24.0 × 47.0 cm** in flight configuration.',
      'It slides in and out ==without changing shape==; propellers may be rotated to fit.',
      'The **airframe mass** without the rubber motor must be at least **8.0 g**.',
      'Because of that minimum, a team cannot win by building lighter; ==the design must use the mass well==.',
    ],
  },
  {
    kind: 'cards',
    section: 1,
    title: 'Check-in numbers to memorize',
    cards: [
      { front: 'Measurement box', back: '32.0 × 24.0 × 47.0 cm, plane in flight configuration' },
      { front: 'Airframe mass', back: 'At least 8.0 g without the motor' },
      { front: 'Motor mass', back: 'At most 1.5 g, including O-rings and attachments' },
      { front: 'Motors checked in', back: 'Up to six, massed separately' },
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Motor and propeller limits',
    bullets: [
      'The rubber motor or motor set, with **O-rings and attachments**, may not exceed **1.5 g**.',
      'Up to **six motors** may be checked in; they are massed separately from the plane.',
      'Propellers may be built or bought, but ==variable-pitch propellers are banned==: nothing may actively change blade angle or diameter.',
      'All lift must come from the **wings**, and the only power is the **rubber**.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Legal or illegal under the motor and propeller rules?',
    bins: ['Legal', 'Illegal'],
    items: [
      ['A purchased plastic propeller', 0],
      ['A 1.4 g motor including its O-ring', 0],
      ['A propeller whose blades twist to a new pitch in flight', 1],
      ['A 1.6 g motor set', 1],
      ['A small battery that adds a burst of power', 1],
      ['A freewheeling propeller that spins freely after the motor unwinds', 0],
    ],
    explanation:
      'The motor set is capped at **1.5 g**, rubber is the only power, and blades may not actively change pitch or diameter. A freewheel does not change pitch, so it is allowed.',
  },
  {
    kind: 'flow',
    section: 3,
    title: 'The 10-minute Flight Period',
    steps: [
      {
        label: 'Motors returned',
        detail: 'The **Flight Period** starts when the supervisor returns the motors.',
      },
      { label: 'Trim flights', detail: 'Test and adjust; **trim flights** do not score.' },
      {
        label: 'Declare',
        detail:
          'Before each launch, ==declare whether it is official==; an undeclared flight counts as official.',
      },
      {
        label: 'Official flights',
        detail: 'Up to **two official flights** using one or two planes.',
      },
      {
        label: 'Timing',
        detail: 'From release until the plane touches the floor or its wings stop supporting it.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A team launches without saying anything, and the plane flies only 40 s. What happens?',
    options: [
      'It is a trim flight and does not count',
      'It counts as an official flight',
      'The team may relaunch without penalty',
      'The supervisor averages it with the next flight',
    ],
    answer: 1,
    explanation:
      'An **undeclared flight counts as official**, so it uses up one of the two official flights. Always declare trim flights out loud.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'When does the timer stop on a Wright Stuff flight?',
    options: [
      'When the motor runs out of turns',
      'When the plane touches the floor or its wings stop supporting it',
      'After exactly three minutes',
      'When the plane first bumps the ceiling',
    ],
    answer: 1,
    explanation:
      'Timing runs **from release** until the plane **touches the floor or its wings stop supporting it**, so a plane gliding after the motor stops still earns time.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Scoring and the tiebreaker',
    bullets: [
      'Flight score = **flight time × flight log bonus**.',
      'Bonus: **×1.2** complete log, **×1.1** partial log, **×1.0** no log.',
      'Team score = the **best flight score**; ties go to the longest **non-scored official flight**.',
      '==A complete log is worth a 20 percent boost==, often more than any trim change.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: score and tiebreaker',
    problem:
      'A team with a **complete flight log** flies official flights of 96.4 s and 112.0 s. What are its score and tiebreaker?',
    steps: [
      'Flight scores: 96.4 × 1.2 = **115.68**; 112.0 × 1.2 = **134.40**.',
      'Score = the best flight score = **134.40**.',
      'Tiebreaker = the non-scored official flight score, **115.68**.',
    ],
    conclusion: 'A strong ==second official flight== still matters, because it breaks ties.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A team with a partial flight log flies a best official flight of 120.0 s. What is its flight score?',
    answer: 132,
    tolerance: 0.05,
    explanation: 'A partial log earns ×1.1, so 120.0 × 1.1 = **132.0**.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'A complete flight log',
    bullets: [
      'At least **10 test flights** before the competition, each with **six or more parameters**.',
      'Three are required: **motor size before wind-up**, **turns or torque at launch**, and **flight time**.',
      'Add three more, such as torque at landing, peak altitude, or propeller pitch.',
      'The log is also ==your best tool for predicting how many turns to use==.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which three parameters must every complete flight log include?',
    options: [
      'Motor size before wind-up',
      'Turns or torque at launch',
      'Flight time',
      'Peak altitude',
      'Propeller pitch',
      'Room temperature',
    ],
    answers: [0, 1, 2],
    explanation:
      'Motor size, launch turns or torque, and flight time are required; **peak altitude and pitch** are good choices for the three extra parameters.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Box **32.0 × 24.0 × 47.0 cm**, airframe **≥ 8.0 g**, motor **≤ 1.5 g**.',
      'Score = best official flight time × **1.2 / 1.1 / 1.0** log bonus.',
      '==Declare every flight==: undeclared flights are official.',
      'A complete log needs **10 flights × 6 parameters**, three of them required.',
    ],
  },
]);

const wings = defineDeck('ws-u2-l1', [
  {
    kind: 'title',
    title: 'Wings and slow flight',
    subtitle: 'Why a duration plane wants **large, light wings** and a cruise near walking speed.',
    objectives: [
      'Use the **lift equation** to relate speed, area, and lift coefficient.',
      'Explain why **slow flight** stretches a fixed energy supply.',
      'Connect **wing loading, camber, and aspect ratio** to drag.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: how fast do you think a good indoor duration plane flies?',
    options: [
      'About walking speed',
      'About bicycle speed',
      'About car speed on a street',
      'Not sure',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The lift equation',
    image: 'ws-lift-curve',
    bullets: [
      '**L = ½ρv²SC_L**: air density ρ, airspeed v, wing area S, and **lift coefficient** C_L.',
      'C_L is set by **wing shape and angle of attack**.',
      'In level flight, **lift equals weight**.',
      'Lift grows with v², so ==more area or a higher C_L supports the same weight at a lower speed==.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: level-flight speed',
    problem:
      'A 9.5 g plane (with motor) has **0.040 m²** of wing and **C_L = 0.8**. Find its level-flight speed, with ρ = 1.2 kg/m³.',
    steps: [
      'Weight W = 0.0095 kg × 9.8 m/s² ≈ **0.093 N**.',
      'Set lift equal to weight: v = √(2W ÷ (ρSC_L)) = √(0.186 ÷ (1.2 × 0.040 × 0.8)) = √4.84.',
      'v ≈ **2.2 m/s**.',
    ],
    conclusion:
      'Speed scales with ==1 ÷ √(S·C_L)==: doubling the wing area cuts speed by about 30 percent.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'The same plane gets twice the wing area (0.080 m²) with C_L still 0.8. What is its new level-flight speed in m/s? (Original: 2.2 m/s.)',
    answer: 1.56,
    tolerance: 0.06,
    unit: 'm/s',
    explanation: 'v scales with 1 ÷ √S, so 2.2 ÷ √2 ≈ **1.56 m/s**.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Why slow is good',
    bullets: [
      'A rubber motor holds a **fixed amount of energy**.',
      'The power needed to stay aloft is ==drag × speed==, so a slow, low-drag plane spends energy over a longer time.',
      'Indoor duration planes cruise near **walking speed, about 1 to 2 m/s**.',
      'They use **large, light wings** and propellers that turn slowly.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why does flying slower usually lengthen a rubber-powered flight?',
    options: [
      'Slow flight makes the rubber store more energy',
      'Power needed is drag times speed, so a fixed energy supply lasts longer',
      'Slower planes need no propeller thrust',
      'The timer runs slower for slow planes',
    ],
    answer: 1,
    explanation:
      'Energy is fixed by the motor. **Power = drag × speed**, so lowering speed (while keeping drag low) stretches the same energy over more seconds.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Wing loading',
    bullets: [
      '**Wing loading** = weight ÷ wing area.',
      '==Lower wing loading means lower flying speed== for the same lift coefficient.',
      'The **8.0 g minimum** and the **measurement box** stop teams from shrinking weight or growing area without limit.',
      'Good designs use the allowed span and length fully and keep structure light where it matters.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A plane weighs 0.093 N and has 0.040 m² of wing. What is its wing loading in N/m²?',
    answer: 2.33,
    tolerance: 0.05,
    unit: 'N/m²',
    explanation: 'Wing loading = 0.093 ÷ 0.040 ≈ **2.3 N/m²**.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Airfoils and camber',
    image: 'ws-wing-profile',
    bullets: [
      'Indoor wings are **thin, curved (cambered) surfaces** of film over a light frame.',
      '**Camber** raises C_L at low speed, so the wing supports weight while flying slowly.',
      '==Too much camber adds drag== and can make the plane unstable in pitch.',
      'Most designs use a **modest, consistent camber** set by curved ribs or a formed spar.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Two kinds of drag',
    image: 'ws-wingtip-vortex',
    bullets: [
      '**Parasite drag** comes from friction and shape and ==grows with speed==.',
      '**Induced drag** comes from producing lift and is ==largest at low speed==.',
      'Long, narrow wings (high **aspect ratio** = span² ÷ area) reduce induced drag.',
      'Indoor planes fly where both matter: use a long span within the box, thin structure, and clean surfaces.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which kind of drag does each statement describe?',
    bins: ['Parasite drag', 'Induced drag'],
    items: [
      ['Caused by producing lift', 1],
      ['Grows as the plane flies faster', 0],
      ['Comes from skin friction and shape', 0],
      ['Largest at low speed', 1],
      ['Reduced by a high aspect ratio', 1],
      ['Reduced by thin structure and clean surfaces', 0],
    ],
    explanation:
      '**Parasite drag** is friction and form drag and rises with speed; **induced drag** is the cost of lift, biggest when flying slowly, and cut by long narrow wings.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A wing spans 0.60 m with an area of 0.045 m². What is its aspect ratio?',
    answer: 8,
    tolerance: 0.1,
    explanation: 'Aspect ratio = span² ÷ area = 0.36 ÷ 0.045 = **8.0**.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Air in the room',
    bullets: [
      'Indoor air is still but not perfect: **ventilation drafts, doors, and heat rising from people** push a slow plane off its circle.',
      '**Air density** changes slightly with temperature and altitude, changing lift at the same speed.',
      '==Watch early flights carefully== and note air currents in the log.',
      'Plan circles that avoid known drafts.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Your plane drifts toward one wall on every flight, always on the same side of the gym. What is the best first response?',
    options: [
      'Add a much bigger rudder offset at random',
      'Note the draft in the log and shift the launch point or circle away from it',
      'Wind the motor to maximum turns',
      'Ignore it; drafts do not affect slow planes',
    ],
    answer: 1,
    explanation:
      'A consistent drift on one side points to an **air current**. Record it and plan circles that avoid it before changing trim.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Lift coefficient', 'Dimensionless measure of a wing’s lifting ability'],
      ['Wing loading', 'Weight divided by wing area'],
      ['Camber', 'Curvature of the wing section'],
      ['Aspect ratio', 'Span squared divided by wing area'],
    ],
    explanation:
      'These four quantities together explain why big, light, long wings fly slowly and efficiently.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**L = ½ρv²SC_L**; in level flight lift equals weight.',
      'Power = drag × speed, so ==slow, low-drag flight stretches the motor’s energy==.',
      'Low **wing loading** and modest **camber** allow slow flight.',
      'High **aspect ratio** cuts induced drag; watch the room’s drafts.',
    ],
  },
]);

const motors = defineDeck('ws-u3-l1', [
  {
    kind: 'title',
    title: 'Rubber motors: storing and releasing energy',
    subtitle: 'The **torque curve** of a wound motor, and how winding choices shape every flight.',
    objectives: [
      'Describe the **burst, cruise, and tail-off** of a rubber motor’s torque.',
      'Trade off motor **length and thickness** at fixed mass.',
      'Plan safe winding with **winder ratios, torque meters, and back-off**.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Energy in rubber',
    bullets: [
      'Twisting a rubber motor stores **elastic energy**.',
      'Available energy depends mostly on ==the rubber’s mass==, which is why the rules cap the motor at **1.5 g**.',
      'Good rubber stores more energy per gram and releases most of it.',
      '**Lubricating** the motor reduces internal friction and lets it take more turns before breaking.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why does the 1.5 g motor limit effectively cap a plane’s energy?',
    options: [
      'Heavier rubber cannot be wound',
      'Stored energy depends mostly on the rubber’s mass',
      'The propeller cannot turn a heavier motor',
      'Lubricant only works on light motors',
    ],
    answer: 1,
    explanation:
      'Elastic energy storage scales mainly with **rubber mass**, so capping mass caps energy.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'The torque curve',
    steps: [
      {
        label: 'Burst',
        detail: 'A freshly wound motor gives **high torque** that can climb the plane quickly.',
      },
      {
        label: 'Cruise',
        detail:
          'Torque drops to a ==long, fairly flat portion==, where most of the flight happens.',
      },
      {
        label: 'Tail-off',
        detail: 'Torque falls away as the last turns unwind and the plane descends.',
      },
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Put the phases of a well-matched flight in order.',
    items: [
      'Wind the motor and launch',
      'Controlled climb during the torque burst',
      'Long cruise near the ceiling on flat torque',
      'Descent as torque tails off',
      'Landing as the motor runs down',
    ],
    explanation:
      'A good flight matches the plane to the curve: **controlled climb** in the burst, then a long **cruise near the ceiling**.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Length versus thickness at fixed mass',
    columns: ['Feature', 'Long, thin motor', 'Short, thick motor'],
    rows: [
      ['Turns it can take', '**More turns**', 'Fewer turns'],
      ['Torque', 'Less torque', '**More torque**'],
      [
        'Typical result',
        '==Longer flight== if torque still keeps the plane level',
        'Strong climb, shorter run',
      ],
      ['Best suited to', 'Low ceilings and long cruise', 'Tall rooms or heavier props'],
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Two motors have the same mass. Motor A is longer and thinner than Motor B. Which is true?',
    options: [
      'A takes more turns and gives less torque',
      'A takes fewer turns and gives more torque',
      'A and B behave identically because the mass is equal',
      'A stores far more energy than B',
    ],
    answer: 0,
    explanation:
      'At fixed mass, **longer and thinner** means more turns and less torque. Teams log length, width, and mass to choose a motor for each room.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Turns and breaking',
    bullets: [
      'Each motor has a **maximum number of turns**, roughly proportional to its length.',
      '**Stretch-winding**, pulling the motor several times its length while winding, packs in more turns.',
      'Winding to the edge of breaking is risky, so ==back off 5 to 10 percent== from tested maximum turns.',
      'Use a **blast tube or guard** for safety.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: safe cranks',
    problem:
      'A team uses a **15:1 winder** and tests show the motor breaks near **1,400 turns**. How many cranks give a safe 8 percent back-off?',
    steps: [
      'Safe turns = 1,400 × 0.92 ≈ **1,290 turns**.',
      'Cranks = 1,290 ÷ 15 ≈ **86 cranks**.',
      'Check the torque at that count and record both in the log.',
    ],
    conclusion: 'Turn counts come from ==tested maximums==, never from a guess.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A motor breaks near 1,200 turns. With a 10:1 winder and a 10 percent back-off, how many cranks should the team wind?',
    answer: 108,
    tolerance: 1,
    unit: 'cranks',
    explanation: 'Safe turns = 1,200 × 0.90 = 1,080; cranks = 1,080 ÷ 10 = **108**.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Winders and torque meters',
    bullets: [
      'A geared **winder** multiplies crank turns: a 10:1 winder gives 10 motor turns per crank.',
      'A **torque meter** measures the twisting force directly.',
      'Many teams ==wind to a target torque rather than a turn count==, because torque predicts the climb better.',
      'Record both turns and torque in the log to match the motor to the ceiling height.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Backing off turns',
    bullets: [
      'After winding, release some turns to set **launch torque** without losing the cruise turns.',
      'This **back-off** is the main control for low ceilings.',
      'A plane that hits the ceiling in the burst ==loses height and time==, so start with less torque in a low room.',
      'In a tall room, more launch torque gives more height to cruise from.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Low ceiling or tall room: which launch plan fits?',
    bins: ['Low ceiling', 'Tall room'],
    items: [
      ['Back off more turns before launch', 0],
      ['Use more launch torque for extra height', 1],
      ['Avoid ceiling bumps during the burst', 0],
      ['Climb higher to cruise from greater height', 1],
    ],
    explanation:
      'Back-off lowers launch torque, which keeps a plane off a **low ceiling**; in a **tall room** extra torque buys height to cruise from.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Torque burst', 'High torque right after launch'],
      ['Stretch-winding', 'Winding while stretched to fit more turns'],
      ['Winder ratio', 'Motor turns per crank turn'],
      ['Back-off', 'Releasing turns to lower launch torque'],
    ],
    explanation: 'These are the controls a team uses to shape the climb and cruise of each flight.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Motor energy depends mostly on **rubber mass**, capped at 1.5 g.',
      'Torque: ==burst, long flat cruise, tail-off==.',
      'Long thin motors: more turns, less torque; short thick motors: the reverse.',
      'Back off **5–10 percent** from max turns, and use **back-off** to set launch torque for the ceiling.',
    ],
  },
]);

const propellers = defineDeck('ws-u4-l1', [
  {
    kind: 'title',
    title: 'Propellers: turning torque into thrust',
    subtitle:
      'A propeller is a **rotating wing**, and the best indoor props are ==large and slow==.',
    objectives: [
      'Define **diameter, pitch, and slip**.',
      'Explain why **large, slow propellers** are efficient at low speed.',
      'Estimate **motor run time** from speed and effective pitch.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'What a propeller does',
    bullets: [
      'Each blade meets the air at an angle and produces a forward force, **thrust**.',
      'The motor’s **torque** turns the propeller against its own drag.',
      'In steady cruise, ==thrust equals the plane’s drag==.',
      'The job: turn slowly released energy into thrust with as little waste as possible.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Diameter and pitch',
    image: 'ws-propeller-pitch',
    bullets: [
      '**Diameter** is the tip-to-tip span.',
      '**Pitch** is the distance the propeller would advance in one revolution, like a screw in a solid.',
      'Blade angle is ==steep near the hub and flatter near the tip== so every section advances the same distance.',
      'Indoor propellers usually have **large diameter and pitch**, so they turn slowly.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why is a propeller blade twisted, steeper near the hub than near the tip?',
    options: [
      'So the tip makes all the thrust',
      'So every section of the blade advances the same distance per revolution',
      'To make the propeller lighter',
      'To change pitch automatically during flight',
    ],
    answer: 1,
    explanation:
      'The tip travels a longer circle each turn, so it needs a **flatter angle** to advance the same distance as the hub section.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Why large and slow',
    bullets: [
      'A propeller makes thrust by pushing air backward.',
      '==Pushing a large mass of air gently wastes less energy== than pushing a small mass quickly.',
      'A large-diameter propeller turning slowly is more efficient at low flight speeds.',
      'It also **unwinds the motor more slowly**, directly stretching flight time when well matched.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Matching the motor',
    bullets: [
      'Too large or too high in pitch: needs more torque than the cruise gives, so ==the plane sinks==.',
      'Too small: spins fast, ==uses turns quickly==, and shortens the flight.',
      'Best match: turns just fast enough to keep the plane **level through the cruise** portion of the torque curve.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'What is the likely propeller problem behind each symptom?',
    bins: ['Prop too large or high pitch', 'Prop too small'],
    items: [
      ['The plane sinks as soon as the burst ends', 0],
      ['The motor runs out quickly while the plane is still high', 1],
      ['The propeller spins very fast for the flight speed', 1],
      ['The propeller nearly stalls during cruise', 0],
    ],
    explanation:
      'An oversized prop asks for more torque than cruise provides; an undersized prop spins fast and **burns turns** too quickly.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Pitch, speed, and slip',
    bullets: [
      'In flight the plane advances **less than the pitch** each revolution; the difference is **slip**.',
      '==Revolutions per second ≈ flight speed ÷ effective pitch==.',
      'At 1.5 m/s with 0.30 m effective advance per turn, the prop spins about **5 rev/s**.',
      'A 900-turn motor then lasts roughly **180 s**.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: motor run time',
    problem:
      'A plane cruises at **1.2 m/s** and its propeller effectively advances **0.24 m per turn**. The motor has **1,200 usable turns**. Estimate the run time.',
    steps: [
      'Revolutions per second = 1.2 ÷ 0.24 = **5.0 rev/s**.',
      'Run time = 1,200 turns ÷ 5.0 rev/s = **240 s**.',
      'The burst spends turns faster, so real time is somewhat less.',
    ],
    conclusion: 'Slower flight or a larger effective pitch ==spends fewer turns per second==.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A plane flies 1.0 m/s with an effective advance of 0.25 m per turn, on a 1,000-turn motor. Estimate the motor run time in seconds.',
    answer: 250,
    tolerance: 2,
    unit: 's',
    explanation: '1.0 ÷ 0.25 = 4 rev/s; 1,000 ÷ 4 = **250 s**.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A propeller has a pitch of 0.40 m but the plane advances only 0.30 m per revolution. What is the slip as a percentage of pitch?',
    answer: 25,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Slip = 0.40 − 0.30 = 0.10 m, and 0.10 ÷ 0.40 = **25 percent**.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building and balancing',
    bullets: [
      '**Light, stiff blades** hold their shape under load.',
      'Balance the propeller so it does not vibrate, and use a **low-friction bearing**.',
      'A **freewheel** or folding mechanism cuts drag after the motor runs out, but ==nothing may actively change pitch or diameter==.',
      'Mark each propeller with an **ID** and log its pitch and diameter so flights can be compared fairly.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which propeller practices help a team compare flights fairly and stay legal?',
    options: [
      'Labeling each propeller with an ID',
      'Logging pitch and diameter for every flight',
      'Using a freewheel after the motor runs down',
      'Fitting blades that twist to a new pitch mid-flight',
      'Leaving the propeller unbalanced to save time',
    ],
    answers: [0, 1, 2],
    explanation:
      'IDs and logged geometry make data traceable, and a **freewheel** is allowed; active pitch change is banned and imbalance causes vibration.',
  },
  {
    kind: 'match',
    prompt: 'Match each propeller term to its meaning.',
    pairs: [
      ['Thrust', 'Forward force produced by the propeller'],
      ['Pitch', 'Ideal forward advance per revolution'],
      ['Slip', 'Difference between pitch and actual advance'],
      ['Freewheel', 'Lets the propeller spin freely after the motor unwinds'],
    ],
    explanation: 'Pitch is the ideal; slip is what is lost in real air.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'In cruise, **thrust = drag**.',
      '==Large, slow propellers== push more air gently and waste less energy.',
      'rev/s ≈ speed ÷ effective pitch; run time ≈ **usable turns ÷ rev/s**.',
      'Match the prop to the **cruise torque**; no active pitch change.',
    ],
  },
]);

export const decks: Deck[] = [rules, wings, motors, propellers, ...wrightStuffDecksFlight];
