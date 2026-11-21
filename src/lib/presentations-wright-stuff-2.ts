import { defineDeck } from './presentation-types.ts';

// Wright Stuff decks for stability and trim, building, and competition day (lessons 5–7),
// imported by presentations-wright-stuff.ts.

const stability = defineDeck('ws-u5-l1', [
  {
    kind: 'title',
    title: 'Stability, trim, and circling flight',
    subtitle:
      'How the **stabilizer, CG, decalage, and dihedral** make a plane fly slow, steady circles by itself.',
    objectives: [
      'Explain **pitch stability** with the CG and neutral point.',
      'Diagnose **stalls and dives** from glide tests.',
      'Set up a **circling climb and cruise** with dihedral, turn controls, and thrust offset.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Pitch stability',
    image: 'ws-flight-axes',
    bullets: [
      'A stable plane ==returns to its trimmed angle after a disturbance==.',
      'If the nose rises, the **horizontal stabilizer**’s angle increases and its lift pushes the tail up, lowering the nose.',
      'The **center of gravity (CG)** must be ahead of the **neutral point** for this to work.',
      'Moving the CG back ==reduces stability==; at the neutral point it vanishes.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What happens to pitch stability as the CG moves back toward the neutral point?',
    options: [
      'It increases',
      'It decreases, vanishing at the neutral point',
      'It is unaffected; only the wing sets stability',
      'The plane becomes more stable in roll instead',
    ],
    answer: 1,
    explanation:
      'The stabilizer can only restore the nose if the **CG is ahead of the neutral point**; the farther back the CG, the weaker the restoring effect.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Incidence and decalage',
    bullets: [
      '**Decalage** is the difference between the wing’s and stabilizer’s angles of incidence, with the wing higher.',
      'Decalage and **CG position** together set the trimmed flying speed.',
      '==More decalage or a rearward CG slows the plane until it stalls==; less makes it dive.',
      'Adjustments are tiny: often **a millimeter at the stabilizer** changes trim noticeably.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Glide testing',
    bullets: [
      'Before powered flights, launch gently by hand **without a motor wound**.',
      'A good glide is **long, straight, and smooth**.',
      'A **stall**, nose rising and dropping repeatedly, means too much decalage or a CG too far back.',
      'A **steep dive** means too little. ==Fix the glide first, then add power.==',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which glide-test result does each cause produce?',
    bins: ['Stall (nose rises and drops)', 'Steep dive'],
    items: [
      ['CG too far back', 0],
      ['Too much decalage', 0],
      ['Too little decalage', 1],
      ['CG far forward of plan', 1],
    ],
    explanation:
      'A **rearward CG or extra decalage** slows the plane into a stall; **too little decalage or a far-forward CG** makes it nose down and dive.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: curing a stall',
    problem: 'A plane **stalls on every glide test**. List adjustments in the order to try them.',
    steps: [
      'Check the **CG**; move it slightly forward with a tiny ballast if it is behind plan.',
      'Reduce **decalage** by lowering the stabilizer’s leading edge slightly.',
      'Retest the glide and **record the change and result**.',
    ],
    conclusion: 'Change ==one thing at a time== so the log shows which adjustment worked.',
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the steps for fixing a plane that stalls in its glide.',
    items: [
      'Check the CG against the plan',
      'Add tiny nose ballast if the CG is behind plan',
      'Lower the stabilizer’s leading edge slightly to cut decalage',
      'Retest the glide',
      'Record the change and its result in the log',
    ],
    explanation: 'Balance first, then decalage, then a retest, and **log every change**.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Dihedral and roll',
    bullets: [
      '**Dihedral** is the upward angle of the wings from the center.',
      'When a wing drops, the plane slips sideways and ==the lower wing meets the air at a higher angle==, rolling the plane level.',
      'Dihedral plus a **vertical fin** keeps a turning plane from spiraling into the floor.',
      'Too much dihedral makes the plane **rock**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'How does dihedral roll a plane back to level after a wing drops?',
    options: [
      'The higher wing produces extra thrust',
      'The plane slips sideways and the lower wing meets the air at a higher angle',
      'The stabilizer pushes the tail down',
      'The propeller torque rolls it back',
    ],
    answer: 1,
    explanation:
      'The sideslip raises the **lower wing’s angle of attack**, giving it more lift, which rolls the plane level.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Circling indoors',
    bullets: [
      'Indoor planes fly circles to stay inside the room.',
      'Turns come from a **rudder offset**, a **tilted stabilizer**, or **wing tilt**.',
      '**Torque roll**: propeller torque rolls the plane ==opposite to the propeller’s rotation==, strongest in the burst.',
      'Many teams turn the same way as the torque roll in a careful amount, or use a slight **thrust offset**.',
    ],
  },
  {
    kind: 'fill',
    section: 4,
    prompt: 'Complete the trim summary.',
    text: 'Propeller torque rolls the plane {0} to the propeller’s rotation, and this roll is strongest during the {1}. Wing {2} keeps a turning plane from spiraling into the floor.',
    blanks: ['opposite', 'burst', 'dihedral'],
    distractors: ['parallel', 'cruise', 'camber'],
    explanation:
      'Torque roll acts **opposite** to rotation and peaks in the **burst**; **dihedral** supplies roll stability in the turn.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'The climb and cruise',
    bullets: [
      'During the burst, extra thrust makes the plane **climb** and tighten or widen its circle.',
      'A small **right or down thrust offset**, or a little propeller tilt, controls the climb.',
      'In cruise the plane should ==circle steadily near the ceiling==.',
      'Log each adjustment and keep a short **trim checklist** for competition day.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each trim control to what it mainly adjusts.',
    pairs: [
      ['Decalage', 'Trimmed flying speed and stall tendency'],
      ['Dihedral', 'Roll stability in turns'],
      ['Rudder offset', 'Turn direction and circle size'],
      ['Thrust offset', 'Climb and turn during the burst'],
    ],
    explanation:
      'Each control has a main job; changing them one at a time keeps cause and effect clear in the log.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Keep the **CG ahead of the neutral point** for pitch stability.',
      '==Stall: less decalage or CG forward. Dive: the reverse.==',
      'Fix the **glide** before adding power.',
      'Dihedral, turn controls, and thrust offset shape a **steady circling climb and cruise**.',
    ],
  },
]);

const building = defineDeck('ws-u6-l1', [
  {
    kind: 'title',
    title: 'Building light and strong',
    subtitle:
      'With an **8.0 g minimum**, the goal is not the lightest plane but the ==stiffest, most repeatable== one.',
    objectives: [
      'Choose **materials** and glue for an indoor airframe.',
      'Spend the **minimum mass** on stiffness and durability.',
      'Keep shape consistent and plan **repairs and spares**.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Materials',
    bullets: [
      'Spars and ribs of **balsa** or **carbon fiber**, covered with thin plastic film.',
      'Balsa is light and easy to shape; ==denser balsa is stiffer and heavier==.',
      '**Carbon rods** are very stiff for their weight.',
      'Glue joints add mass quickly: use **small amounts of thin glue**. Keep film tight and wrinkle-free.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each part to its job.',
    pairs: [
      ['Spar', 'Main lengthwise member of a wing'],
      ['Rib', 'Crosswise piece that sets the airfoil shape'],
      ['Film covering', 'Thin surface that holds the airfoil shape'],
      ['Motor stick', 'Beam carrying the motor tension'],
    ],
    explanation:
      'Spars carry the wing along its span, ribs shape the airfoil, and the motor stick carries the wound rubber.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Using the minimum mass',
    bullets: [
      'The plane must weigh **at least 8.0 g** without the motor, so ==there is no prize for building lighter==.',
      'Spend mass on a **stiff motor stick**, wing spars that keep their shape, and joints that survive ceiling bumps.',
      'Add **ballast** only where it improves balance.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: meeting the minimum',
    problem:
      'A built airframe weighs **7.4 g** and its CG is slightly **behind** the target. How should the team meet the 8.0 g minimum?',
    steps: [
      'Mass needed: 8.0 − 7.4 = **0.6 g**; add a small margin, e.g. **0.7 g**.',
      'Place the ballast **near the nose** to move the CG forward.',
      'Recheck balance and glide after adding it.',
    ],
    conclusion: 'Ballast should ==fix two problems at once==: mass and balance.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'An airframe weighs 7.65 g without its motor. What is the least ballast, in grams, that makes it legal?',
    answer: 0.35,
    tolerance: 0.005,
    unit: 'g',
    explanation: '8.0 − 7.65 = **0.35 g**; in practice add a small margin above that.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'The motor stick',
    bullets: [
      'The motor stick carries the ==full tension of the wound motor==.',
      'If it bends, the propeller tilts, **thrust direction changes**, and trim shifts as the torque drops.',
      'A stiff, straight stick keeps the flight predictable **from burst to cruise**.',
      'Test it by winding a motor fully and checking the bend.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why does a flexible motor stick make trim change during a flight?',
    options: [
      'It makes the plane heavier',
      'Its bend, and so the thrust direction, changes as motor torque and tension drop',
      'It reduces the number of turns the motor can take',
      'It changes the wing’s camber',
    ],
    answer: 1,
    explanation:
      'As tension falls the stick straightens, so the **thrust line moves** and the climb and turn change between burst and cruise.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Fitting the box',
    bullets: [
      'The plane must slide into the **measurement box** in flight configuration without changing shape.',
      'That limits **span, length, and height**; use the full allowed span for low induced drag.',
      'Check the fit with the ==exact propeller and landing gear== you will fly.',
      'A plane that only fits when flexed is a **violation**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A plane fits the measurement box only when a wingtip is bent slightly. What is true?',
    options: [
      'It is legal because it fits',
      'It is a violation: the plane must fit in flight configuration without changing shape',
      'It is legal if the propeller is removed',
      'It is legal for trim flights only',
    ],
    answer: 1,
    explanation:
      'The plane must slide in and out **without changing shape**; only rotating the propeller to fit is allowed.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Consistent shape',
    bullets: [
      '**Warps** change trim; heat, humidity, and handling can warp balsa and film.',
      'Store the plane in a **rigid box** and build matching wings on **jigs**.',
      '==Mark incidence and stabilizer positions== so they can be reset.',
      'Removable wings and tails should fit in exactly the same place every time, using **keyed mounts** or marks.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which habits keep an airframe’s trim repeatable?',
    options: [
      'Building matching wings on a jig',
      'Marking stabilizer and incidence positions',
      'Storing the plane in a rigid box',
      'Using keyed mounts for removable parts',
      'Leaving the plane in a hot car between rounds',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'Jigs, marks, rigid storage, and keyed mounts all fight **warps** and misalignment; heat causes warps.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Repairs and spares',
    bullets: [
      'Planes hit walls and ceilings: bring **spare propellers, film, glue**, and a second airplane.',
      'Practice quick repairs and ==check trim afterward with a glide==.',
      'With only **10 minutes**, a ready backup plane and **pre-wound spare motors** lose little time.',
      'Rehearse a full plane swap, motor change, and glide check so it takes about **a minute**.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order a rehearsed backup-plane swap after a crash.',
    items: [
      'Set the damaged plane aside',
      'Take the backup plane from its rigid box',
      'Install a pre-wound spare motor',
      'Make a quick glide check',
      'Launch and declare the next flight',
    ],
    explanation:
      'A practiced sequence keeps the swap near **one minute** of the 10-minute Flight Period.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Balsa, carbon, thin film, and **minimal glue**.',
      '==Spend the 8.0 g on stiffness==, especially the motor stick.',
      'Fit the box **without flexing**; jigs and marks keep trim repeatable.',
      'Spares and a rehearsed **plane swap** protect the Flight Period.',
    ],
  },
]);

const competition = defineDeck('ws-u7-l1', [
  {
    kind: 'title',
    title: 'Testing, the flight log, and competition day',
    subtitle:
      'Turn test flights into **data**, the data into a **winding plan**, and the plan into a calm ten minutes.',
    objectives: [
      'Run **controlled test flights** and build a complete log.',
      'Read a **flight time versus launch torque** curve.',
      'Plan the **Flight Period** and check-in.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Controlled testing',
    bullets: [
      'A test flight is an **experiment**: change ==one variable== and hold the rest constant.',
      'Fly where the **ceiling is known**, and fly several times to see the spread.',
      'Record **every flight, including bad ones**: failures reveal the limits of a design and a motor.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A team changes the motor size and the stabilizer angle at the same time, and the flight improves. What is the problem?',
    options: [
      'Nothing; the flight improved',
      'They cannot tell which change caused the improvement',
      'Motor size should never be changed',
      'Stabilizer angle does not affect flight time',
    ],
    answer: 1,
    explanation:
      'With two variables changed at once, the effect cannot be attributed. **Change one variable at a time.**',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Building the log',
    bullets: [
      'A complete log needs **at least 10 test flights** and **six parameters**.',
      'Required: **motor size before wind-up**, **turns or torque at launch**, and **flight time**.',
      'Good extras: torque at landing, estimated peak altitude, propeller pitch, motor mass, ceiling height.',
      '==Choose parameters you will actually use to make decisions.==',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Required log parameter, or a good optional extra?',
    bins: ['Required', 'Optional extra'],
    items: [
      ['Motor size before wind-up', 0],
      ['Turns or torque at launch', 0],
      ['Flight time', 0],
      ['Torque at landing', 1],
      ['Estimated peak altitude', 1],
      ['Room ceiling height', 1],
    ],
    explanation:
      'Three parameters are required; teams choose **three more** of their own to reach six.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Turning data into decisions',
    bullets: [
      'Graph **flight time against launch torque** for each motor size.',
      'Time usually rises with torque ==until the plane reaches the ceiling==, then falls as it bumps and loses height.',
      'The **peak of that curve** is the best launch torque for that ceiling height.',
      '**Torque at landing** tells whether the motor ran out before the plane landed.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: choosing the first winding',
    problem:
      'Log data at a **9 m ceiling**: torque 0.10 → 95 s, 0.13 → 118 s, 0.16 → 104 s (ceiling bumps). Plan the first official flight.',
    steps: [
      'Flight time **peaks near 0.13** torque units.',
      'At 0.16 the plane **hits the ceiling** and loses time.',
      'Wind near **0.13** for the first official flight; adjust slightly after watching it.',
    ],
    conclusion:
      'The best torque is ==the peak of the curve for this ceiling==, not the maximum the motor can take.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A plane lands with a lot of torque still left in the motor. What does that most likely mean?',
    options: [
      'The motor ran out too early',
      'The plane came down before the motor finished, so energy was wasted',
      'The launch torque was perfect',
      'The propeller was too small',
    ],
    answer: 1,
    explanation:
      'High **torque at landing** means unused energy: the plane descended (often from a ceiling bump or poor trim) before the motor ran down.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Scouting the room',
    bullets: [
      'Officials announce the room’s approximate dimensions and **ceiling height** in advance.',
      'Plan the opening winding from **log data for a similar ceiling**.',
      'On arrival, watch other flights for **drafts and obstacles** like lights and beams.',
      'A plane circling under a beam can ==hang up and end its flight==.',
    ],
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Using 10 minutes well',
    steps: [
      {
        label: 'Trim flight',
        detail: 'A quick **trim flight** at moderate torque to check the room.',
      },
      { label: 'Bank a score', detail: 'An official flight that ==banks a safe score==.' },
      { label: 'Adjust', detail: 'Change the winding based on what the first flight showed.' },
      {
        label: 'Second official',
        detail: 'Fly it with the adjusted winding; it also breaks ties.',
      },
      {
        label: 'Watch the clock',
        detail: 'Any flight **starting** before the period ends may finish.',
      },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order a common Flight Period plan.',
    items: [
      'Motors are returned and the clock starts',
      'Quick trim flight at moderate torque',
      'First official flight to bank a safe score',
      'Adjust the winding from what you saw',
      'Second official flight, started before time runs out',
    ],
    explanation:
      'Bank a safe score early, then use the second official flight to improve or break ties.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Check-in and conduct',
    bullets: [
      'At check-in, present the **planes in the measurement box**, the **motors**, and the **flight log**.',
      '==Only participants handle the planes.==',
      'Declare each flight as **official or trim** before launching.',
      'Teams filing an **appeal** must leave planes, motors, boxes, and log in the event area.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which are true at check-in and during the event?',
    options: [
      'Planes are presented in the measurement box',
      'The flight log is presented with the planes and motors',
      'A coach may launch the plane for the team',
      'Every flight is declared official or trim before launch',
      'A team appealing may take its plane home first',
    ],
    answers: [0, 1, 3],
    explanation:
      'Only participants handle planes, and an appealing team must **leave its equipment** in the event area.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Controlled variable', 'Factor held constant during a test'],
      ['Banked score', 'A safe official flight made early'],
      ['Hang-up', 'Plane caught on a fixture, ending timing'],
      ['Torque at landing', 'Remaining motor torque when the plane lands'],
    ],
    explanation: 'These terms describe how teams test, plan, and protect their flights.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Test like a scientist: ==one variable at a time==, every flight recorded.',
      'The **peak of the time–torque curve** is the best launch torque for a ceiling.',
      'Scout the room for **drafts, lights, and beams**.',
      'Trim, bank a score, adjust, and start the last official flight **before time runs out**.',
    ],
  },
]);

export const wrightStuffDecksFlight = [stability, building, competition];
