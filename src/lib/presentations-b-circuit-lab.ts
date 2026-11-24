import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-circuit-lab.ts';

// Circuit Lab (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Lessons circ-u1-l1 to circ-u8-l1 are shared with Division C word for word, so their decks are
// the Division C decks; circ-u9-l1-b is written for Division B's fault-finding lesson.

const shared = [
  'circ-u1-l1',
  'circ-u2-l1',
  'circ-u3-l1',
  'circ-u4-l1',
  'circ-u5-l1',
  'circ-u6-l1',
  'circ-u7-l1',
  'circ-u8-l1',
];

const faultFinding = defineDeck('circ-u9-l1-b', [
  {
    kind: 'title',
    title: 'Fault finding with switches, fuses, and diodes',
    subtitle: 'When a circuit does not work, ==trace the path before you change parts==.',
    objectives: [
      'Trace a **complete path** from one battery terminal to the other.',
      'Tell what a **fuse**, a **circuit breaker**, a **GFCI**, and a **relay** each do.',
      'Explain why a **diode** or LED only conducts one way.',
      'Plan one measurement that separates two possible faults.',
    ],
    image: 'circ-breadboard',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a flashlight will not light. What would you check first?',
    options: [
      'Replace the bulb right away',
      'Check the batteries and switch',
      'Look for a broken wire or loose contact',
      'Not sure yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Trace a complete path',
    bullets: [
      'Charge needs a **complete conducting path**: battery terminal → load → other terminal.',
      'An **open switch** or a broken wire makes an **open circuit**: no current anywhere in that loop.',
      'A **short circuit** is an unintended low-resistance path that can bypass the load.',
      'A short can draw ==excessive current==, which heats wires and drains or damages the source.',
    ],
    callout: 'Trace the wiring with your finger on the sketch before changing any component.',
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each fault an open circuit or a short circuit?',
    bins: ['Open circuit', 'Short circuit'],
    items: [
      ['A switch is left in the off position', 0],
      ['A bare wire touches both battery terminals', 1],
      ['A wire has come loose from the bulb holder', 0],
      ['A stray wire connects across the lamp, so the lamp goes dark', 1],
      ['A broken lamp filament', 0],
    ],
    explanation:
      'A break anywhere in the loop is an open circuit. A low-resistance path that skips the load is a short circuit.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A series loop has a battery, a switch, and a lamp. The switch is open. What is true?',
    options: [
      'Current flows only between the battery and the switch',
      'No current flows anywhere in the loop',
      'The lamp glows at half brightness',
      'The battery is short-circuited',
    ],
    answer: 1,
    explanation:
      'In one series loop, an open switch breaks the only path, so current is zero everywhere in that loop.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Protection and control',
    image: 'circ-relay',
    caption:
      'A **relay**: a small current in the coil pulls the armature, which moves contacts in a ==separate circuit==.',
    bullets: [
      'A **fuse** melts when too much current heats its thin element, opening the circuit for good.',
      'A **circuit breaker** also stops excessive current, but it can be **reset** after the fault is fixed.',
      'A **GFCI** compares outgoing and returning current and trips when they do not balance.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each device to its job.',
    pairs: [
      ['Fuse', 'Melts open when current is too high'],
      ['Circuit breaker', 'Interrupts high current and can be reset'],
      ['GFCI', 'Trips when outgoing and returning current differ'],
      ['Relay', 'Uses one circuit to switch another'],
    ],
    explanation:
      'Fuses and breakers both protect against too much current, but only a breaker can be reset. A GFCI watches for a current imbalance, and a relay is an electrically operated switch.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A fuse has blown in a toy circuit. What should happen before it is replaced?',
    options: [
      'Replace it with a thicker wire so it never blows again',
      'Find and correct the fault that caused too much current',
      'Add a second battery to make up for the lost current',
      'Nothing; fuses blow at random',
    ],
    answer: 1,
    explanation:
      'A blown fuse is a symptom. If the short or overload is still there, a new fuse will blow too, and bypassing the fuse removes the protection.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'A diode has direction',
    image: 'circ-diode-iv',
    caption:
      'Diode current stays tiny until the forward voltage passes the knee, then rises steeply. In reverse it ==barely conducts==.',
    bullets: [
      'A silicon **diode** conducts much more easily **forward** than in reverse.',
      'It is **not a resistor**: it does not follow the same voltage-current rule both ways.',
      'An **LED** lights only when **forward biased**, and it needs a resistor for **current limiting**.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Reading an LED',
    image: 'circ-led-parts',
    bullets: [
      'The **longer lead** is the anode (+); the **flat spot** on the rim marks the cathode (−).',
      'Reversed, an LED stays dark even with a good battery.',
      'If only **one LED** is dark, compare its direction and connections with a working branch first.',
    ],
    callout: 'A dark LED next to a lit one means ==the battery is probably fine==.',
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which statements about diodes and LEDs are true? Choose all that apply.',
    options: [
      'A diode conducts more readily in one direction',
      'An LED lights when it is forward biased',
      'An LED can be connected straight to a battery with no resistor',
      'A diode behaves like a resistor in both directions',
      'A reversed LED stays dark',
    ],
    answers: [0, 1, 4],
    explanation:
      'Diodes are one-way devices. An LED needs forward bias and a current-limiting resistor; it is not an ordinary resistor.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Measure and test',
    image: 'circ-multimeter2',
    bullets: [
      '**Disconnect power** before rearranging wires or measuring resistance.',
      'Measure **voltage across** a component; measure **current through** a series connection.',
      'Start with a **wiring sketch** and a **prediction**, then test.',
      'Choose ==one measurement that tells two faults apart==, such as an open wire versus a reversed LED.',
    ],
    callout:
      'Transistors, op-amps, capacitors, and sequential logic are outside the Division B Circuit Lab scope.',
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'How should the meter be connected for each measurement?',
    bins: ['Across the component', 'In series, in the path', 'With power disconnected'],
    items: [
      ['Voltage drop across a resistor', 0],
      ['Current through a lamp', 1],
      ['Resistance of a resistor', 2],
      ['Voltage across the battery terminals', 0],
      ['Current leaving the battery', 1],
    ],
    explanation:
      'Voltmeters compare two points, so they go across. Ammeters must be in the current path. Ohmmeters supply their own test current, so the circuit must be unpowered.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: one dark LED',
    problem:
      'The battery reads **6 V**. Branch A’s LED lights through a resistor. Branch B’s LED is **reversed** and stays dark.',
    steps: [
      'The working branch shows that the **supply can power an LED**.',
      'Compare **LED polarity** and connections in the two branches.',
      '**Disconnect power**, correct the reversed LED, and retest with its resistor.',
    ],
    conclusion:
      'Reverse the LED with power disconnected, ==keeping its current-limiting resistor==.',
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Put the troubleshooting steps in a safe, logical order.',
    items: [
      'Sketch the wiring and predict what should happen',
      'Measure the battery voltage',
      'Compare the dark branch with a working branch',
      'Disconnect power',
      'Fix the one suspected fault',
      'Reconnect power and retest',
    ],
    explanation:
      'Predict first, gather evidence, and only then disconnect power to make one change and retest, so each result points to a single cause.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Complete the summary of circuit faults.',
    text: 'An open switch makes an {0} circuit. A low-resistance path that bypasses the load is a {1} circuit. A {2} melts when current is too high.',
    blanks: ['open', 'short', 'fuse'],
    distractors: ['closed', 'relay', 'diode'],
    explanation:
      'Open circuits have a break in the path, short circuits skip the load, and fuses melt to stop excessive current.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Current needs a **complete path**; an **open** breaks it and a **short** bypasses the load.',
      '**Fuses** melt, **breakers** reset, **GFCIs** detect imbalance, and **relays** switch another circuit.',
      'A **diode** or **LED** conducts one way and is ==not a resistor==.',
      'Disconnect power, then use **one measurement** to separate competing faults.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'Two LEDs share a battery. One lights and one does not. Describe two measurements or checks you would make and what each would tell you.',
    model:
      'First, I would check the dark LED’s orientation against the working one; if it is reversed, that explains it. Second, with power off I would check continuity of its branch wires; an open connection would also leave it dark. The lit LED already shows the battery works.',
  },
]);

export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => shared.includes(deck.lessonId)),
  faultFinding,
];
