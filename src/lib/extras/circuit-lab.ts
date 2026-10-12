import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
  circle,
  goal,
  line,
  near,
  path,
  rect,
  slider,
  text,
  toggle,
  type Shape,
  type Tone,
  type TopicLab,
} from '../topic-lab-kit.ts';

// Schematic helpers: a labelled resistor box on a wire, and a two-terminal source.
const resistor = (x: number, y: number, label: string, vertical = false): Shape[] =>
  vertical
    ? [rect(x - 9, y - 26, 18, 52, 'accent', false, 1, 3), text(x + 16, y + 4, label)]
    : [rect(x - 26, y - 9, 52, 18, 'accent', false, 1, 3), text(x, y - 16, label, 'middle')];
const source = (x: number, y: number, label: string): Shape[] => [
  line(x - 16, y - 6, x + 16, y - 6, 'ink', 3),
  line(x - 8, y + 6, x + 8, y + 6, 'ink', 3),
  text(x - 22, y + 4, label, 'end'),
];

const coulomb: TopicLab = {
  id: 'circ-coulomb',
  title: 'Coulomb force between two charges',
  lead: 'Two point charges on a line. Sign decides attraction or repulsion; magnitude and separation decide how hard.',
  controls: [
    slider('q1', 'Charge 1', -5, 5, 1, 2, 'µC'),
    slider('q2', 'Charge 2', -5, 5, 1, -3, 'µC'),
    slider('r', 'Separation', 2, 20, 1, 10, 'cm'),
  ],
  run: (v) => {
    const force = (8.99e9 * v.q1 * v.q2 * 1e-12) / (v.r / 100) ** 2,
      mag = Math.abs(force);
    const x1 = 320 - v.r * 12,
      x2 = 320 + v.r * 12,
      len = Math.min(70, 12 + Math.log10(mag + 1) * 28),
      dir = force > 0 ? -1 : 1;
    const tone = (q: number): Tone => (q > 0 ? 'warm' : q < 0 ? 'cool' : 'muted');
    return {
      o: { force, mag },
      metrics: [
        { label: 'Force magnitude on each charge', value: mag, unit: 'N' },
        {
          label: 'Interaction',
          value: mag === 0 ? 'None' : force > 0 ? 'Repulsive' : 'Attractive',
        },
        { label: 'Product q₁q₂', value: v.q1 * v.q2, unit: 'µC²' },
      ],
      sceneLabel: `Charges of ${v.q1} and ${v.q2} microcoulombs ${v.r} centimetres apart; ${mag.toPrecision(3)} newtons`,
      scene: [
        line(60, 170, 580, 170, 'muted', 1, true),
        circle(x1, 170, 14 + Math.abs(v.q1) * 2, tone(v.q1)),
        circle(x2, 170, 14 + Math.abs(v.q2) * 2, tone(v.q2)),
        text(x1, 175, v.q1 > 0 ? '+' : v.q1 < 0 ? '−' : '0', 'middle', 'ink', 16),
        text(x2, 175, v.q2 > 0 ? '+' : v.q2 < 0 ? '−' : '0', 'middle', 'ink', 16),
        ...(mag > 0
          ? [
              ...arrow(x1, 120, x1 + dir * len, 120, 'slot', 3),
              ...arrow(x2, 120, x2 - dir * len, 120, 'slot', 3),
            ]
          : []),
        text(320, 250, `r = ${v.r} cm`, 'middle'),
        text(
          320,
          300,
          'Equal and opposite forces act on the two charges (Newton’s third law).',
          'middle',
          'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Cut the force to one quarter of its starting value by changing only the separation.',
      'Force falls as 1/r²: double the distance.',
      { r: 20 },
      (o, v) => v.q1 === 2 && v.q2 === -3 && near(o.mag, 1.3485, 0.01),
    ),
    goal(
      'Make the two charges repel with more than 20 N.',
      'Give them the same sign, make both large, and bring them close.',
      { q1: 5, q2: 5, r: 5 },
      (o) => o.force > 20,
    ),
    goal(
      'Find a way to make the force exactly zero without separating the charges further.',
      'A neutral object feels no Coulomb force from a point charge in this model.',
      { q1: 0 },
      (o) => o.mag === 0,
    ),
  ],
  predict: {
    q: 'Both charges are doubled while their separation stays fixed. The force between them…',
    options: ['Quadruples', 'Doubles', 'Stays the same', 'Increases eightfold'],
    correct: 0,
    why: 'F = k q₁q₂ / r². Each doubling contributes a factor of two, so the product q₁q₂ grows by four.',
  },
  model:
    'Coulomb’s law for point charges in vacuum, k = 8.99 × 10⁹ N·m²/C². Induced polarisation of neutral objects, the finite size of real conductors, and air breakdown at high fields are not modelled.',
};

const ratings = [0.125, 0.25, 0.5, 1];
const energy: TopicLab = {
  id: 'circ-energy',
  title: 'Power, energy, and a resistor’s rating',
  lead: 'A resistor converts electrical energy to heat at a rate set by voltage and resistance. Exceed its rating and it overheats.',
  controls: [
    slider('v', 'Voltage across the resistor', 1, 24, 0.5, 5, 'V'),
    slider('r', 'Resistance', 10, 1000, 10, 220, 'Ω'),
    slider('h', 'Running time', 0.5, 24, 0.5, 1, 'h'),
    choice('rating', 'Resistor power rating', ['⅛ W', '¼ W', '½ W', '1 W'], 1),
  ],
  run: (v) => {
    const current = v.v / v.r,
      power = v.v ** 2 / v.r,
      limit = ratings[v.rating];
    return {
      o: { current, power, wh: power * v.h, over: power > limit ? 1 : 0 },
      metrics: [
        { label: 'Current', value: current * 1000, unit: 'mA' },
        { label: 'Power dissipated', value: power, unit: 'W' },
        { label: 'Energy over the run', value: power * v.h, unit: 'Wh' },
        {
          label: 'Rating check',
          value:
            power > limit
              ? 'OVER the rating — will overheat'
              : `Within rating (${Math.round((power / limit) * 100)}% used)`,
        },
      ],
      plot: {
        title: `P = V² / R for ${v.r} Ω`,
        x: [0, 24, 'Voltage (V)'],
        y: [0, 2, 'Power (W)'],
        curves: [{ f: (x) => x ** 2 / v.r }],
        hlines: [{ y: limit, label: 'rating' }],
        points: [
          {
            x: v.v,
            y: power,
            label: `${power.toPrecision(3)} W`,
            tone: power > limit ? 'warm' : 'slot',
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'At 5 V, choose the resistance that dissipates exactly 0.25 W.',
      'Rearrange P = V² / R to solve for R.',
      { r: 100 },
      (o, v) => v.v === 5 && near(o.power, 0.25, 0.002),
    ),
    goal(
      'Overload the ¼ W resistor: push its dissipation above the rating.',
      'Raise the voltage; power grows with its square.',
      { v: 12 },
      (o, v) => v.rating === 1 && o.over === 1,
    ),
    goal(
      'Deliver that same 0.25 W from a 10 V source instead.',
      'Doubling the voltage needs four times the resistance for the same power.',
      { v: 10, r: 400 },
      (o, v) => v.v === 10 && near(o.power, 0.25, 0.002),
    ),
  ],
  predict: {
    q: 'The voltage across a fixed resistor is doubled. The power it dissipates…',
    options: ['Quadruples', 'Doubles', 'Halves', 'Stays the same'],
    correct: 0,
    why: 'Doubling V also doubles I through the same resistance, and P = VI = V²/R.',
  },
  model:
    'Ohmic resistor: I = V/R, P = V²/R, E = Pt. Resistance is treated as independent of temperature; a real part drifts as it heats and should be derated in warm enclosures.',
};

const divider: TopicLab = {
  id: 'circ-divider',
  title: 'Voltage divider and loading',
  lead: 'Two series resistors split a source voltage. Connect a load and the split changes, because the load sits in parallel with the lower resistor.',
  controls: [
    slider('vs', 'Source voltage', 3, 12, 1, 9, 'V'),
    slider('r1', 'Upper resistor R1', 1, 100, 1, 10, 'kΩ'),
    slider('r2', 'Lower resistor R2', 1, 100, 1, 10, 'kΩ'),
    toggle('load', 'Connect a load across R2'),
    slider('rl', 'Load resistance', 1, 100, 1, 10, 'kΩ'),
  ],
  run: (v) => {
    const ideal = (v.vs * v.r2) / (v.r1 + v.r2),
      lower = v.load ? (v.r2 * v.rl) / (v.r2 + v.rl) : v.r2,
      vout = (v.vs * lower) / (v.r1 + lower),
      drop = ((ideal - vout) / ideal) * 100;
    return {
      o: { vout, ideal, drop, ratio: vout / v.vs },
      metrics: [
        { label: 'Output voltage', value: vout, unit: 'V' },
        { label: 'Unloaded (ideal) output', value: ideal, unit: 'V' },
        { label: 'Drop caused by the load', value: drop, unit: '%' },
        { label: 'Source current', value: v.vs / (v.r1 + lower), unit: 'mA' },
      ],
      sceneLabel: `Voltage divider: ${v.vs} volt source, R1 ${v.r1} kilohm above R2 ${v.r2} kilohm${v.load ? `, loaded by ${v.rl} kilohm` : ''}; output ${vout.toPrecision(3)} volts`,
      scene: [
        path('M150 60H330V90 M330 142V178 M330 230V280H150V182 M150 158V60', 'ink'),
        ...source(150, 170, `${v.vs} V`),
        ...resistor(330, 116, `R1 ${v.r1} kΩ`, true),
        ...resistor(330, 204, `R2 ${v.r2} kΩ`, true),
        circle(330, 160, 4, 'slot'),
        line(330, 160, 470, 160, 'slot'),
        text(480, 150, `Vout = ${vout.toPrecision(3)} V`, 'start', 'slot'),
        ...(v.load
          ? [
              path('M470 160V178 M470 230V280H330', 'ink'),
              ...resistor(470, 204, `load ${v.rl} kΩ`, true),
            ]
          : [text(480, 172, 'no load connected', 'start', 'muted', 11)]),
        text(150, 310, 'ground reference: bottom rail', 'start', 'muted', 11),
      ],
    };
  },
  missions: [
    goal(
      'With no load, set the output to exactly one third of the source voltage.',
      'R2 / (R1 + R2) must equal 1/3: make R1 twice R2.',
      { r1: 20 },
      (o, v) => v.load === 0 && near(o.ratio, 1 / 3, 0.004),
    ),
    goal(
      'Connect a load that drags the output down by more than 30%.',
      'A load comparable to R2 halves the lower resistance.',
      { load: 1 },
      (o, v) => v.load === 1 && o.drop > 30,
    ),
    goal(
      'Keep a load connected, but hold the drop under 5%.',
      'Make the load resistance much larger than R2.',
      { load: 1, rl: 100 },
      (o, v) => v.load === 1 && o.drop < 5,
    ),
  ],
  predict: {
    q: 'A load resistor is connected across the lower resistor of a divider. The output voltage…',
    options: ['Falls', 'Rises', 'Is unchanged', 'Becomes equal to the source voltage'],
    correct: 0,
    why: 'The load is in parallel with R2, so the lower equivalent resistance is smaller and takes a smaller share of the source voltage.',
  },
  model:
    'Vout = Vs · R₂′ / (R₁ + R₂′) with R₂′ = R₂ ∥ R_load. Ideal source and resistors. A divider is a reference, not a regulator: it only holds its ratio when the load draws negligible current.',
};

const leds: [string, number][] = [
  ['Red', 1.8],
  ['Yellow', 2.1],
  ['Green', 2.2],
  ['Blue', 3.2],
  ['White', 3.3],
];
const e12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
function nextE12(ohms: number) {
  for (let decade = 1; decade <= 10000; decade *= 10)
    for (const base of e12) if (base * decade >= ohms - 1e-9) return base * decade;
  return 820000;
}
const ledDesign: TopicLab = {
  id: 'circ-led-design',
  title: 'Choosing an LED series resistor',
  lead: 'Pick the supply, the LED colour, and a target current. The lab finds the ideal resistance and the next standard value you could actually buy.',
  controls: [
    slider('vs', 'Supply voltage', 3, 12, 0.5, 5, 'V'),
    choice(
      'color',
      'LED colour',
      leds.map(([name, vf]) => `${name} · Vf ≈ ${vf} V`),
      0,
    ),
    slider('target', 'Target current', 2, 30, 1, 20, 'mA'),
  ],
  run: (v) => {
    const vf = leds[v.color][1],
      headroom = v.vs - vf,
      lit = headroom > 0 ? 1 : 0;
    const ideal = lit ? headroom / (v.target / 1000) : 0,
      chosen = lit ? nextE12(ideal) : 0,
      actual = lit ? (headroom / chosen) * 1000 : 0,
      pr = lit ? headroom * actual : 0;
    return {
      o: { ideal, chosen, actual, pr, lit },
      metrics: lit
        ? [
            { label: 'Voltage left for the resistor', value: headroom, unit: 'V' },
            { label: 'Ideal resistance', value: ideal, unit: 'Ω' },
            { label: 'Next standard (E12) value', value: chosen, unit: 'Ω' },
            { label: 'Actual LED current', value: actual, unit: 'mA' },
            { label: 'Resistor dissipation', value: pr, unit: 'mW' },
          ]
        : [
            {
              label: 'Result',
              value: 'Supply is at or below the forward voltage — the LED cannot conduct',
            },
          ],
      sceneLabel: `${leds[v.color][0]} LED on a ${v.vs} volt supply${lit ? ` with a ${chosen} ohm resistor carrying ${actual.toPrecision(3)} milliamps` : ', not lit'}`,
      scene: [
        path('M120 80H250 M302 80H420 M460 80H520V260H120V182 M120 158V80', 'ink'),
        ...source(120, 170, `${v.vs} V`),
        ...resistor(276, 80, lit ? `${chosen} Ω` : 'R'),
        path('M420 64V96L460 80Z', lit ? 'slot' : 'muted', true),
        line(460, 64, 460, 96, 'ink', 3),
        text(440, 120, `${leds[v.color][0]} LED`, 'middle'),
        ...(lit
          ? [...arrow(452, 56, 476, 34, 'gold', 2), ...arrow(466, 62, 490, 40, 'gold', 2)]
          : []),
        text(
          320,
          300,
          lit
            ? `${actual.toPrecision(3)} mA flows; ${vf} V is dropped by the LED`
            : 'No current: not enough voltage to turn the junction on',
          'middle',
          'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Design for a blue LED at 10 mA from a 5 V supply.',
      'Subtract the 3.2 V forward drop first, then apply Ohm’s law.',
      { color: 3, target: 10 },
      (o, v) => v.color === 3 && v.vs === 5 && v.target === 10,
    ),
    goal(
      'Find a supply and LED combination that cannot light at all.',
      'A white or blue LED needs more than 3 V.',
      { color: 4, vs: 3 },
      (o) => o.lit === 0,
    ),
    goal(
      'Make the series resistor dissipate more than 150 mW.',
      'Raise the supply: the resistor must drop everything the LED does not.',
      { vs: 12 },
      (o) => o.pr > 150,
    ),
  ],
  predict: {
    q: 'With the same supply and the same resistor, a red LED is swapped for a blue one. The current…',
    options: [
      'Decreases, because blue drops more voltage',
      'Increases, because blue is more efficient',
      'Stays the same; the resistor sets it',
      'Reverses direction',
    ],
    correct: 0,
    why: 'I = (Vs − Vf) / R. A larger forward voltage leaves less voltage across the resistor.',
  },
  model:
    'Constant-forward-drop LED model with typical Vf values (real parts vary by ±0.2 V and with current). The resistor is rounded up to the E12 series so the current never exceeds the target. Check the LED’s rated maximum before a real build.',
};

const adder: TopicLab = {
  id: 'circ-adder',
  title: 'Full adder built from gates',
  lead: 'Three one-bit inputs go in; a two-bit binary total comes out. Trace which gate outputs go high for each combination.',
  controls: [toggle('a', 'Input A'), toggle('b', 'Input B'), toggle('cin', 'Carry in')],
  run: (v) => {
    const x1 = v.a ^ v.b,
      sum = x1 ^ v.cin,
      a1 = v.a & v.b,
      a2 = x1 & v.cin,
      cout = a1 | a2;
    const wire = (on: number): Tone => (on ? 'slot' : 'muted');
    const gate = (x: number, y: number, name: string, on: number): Shape[] => [
      rect(x, y, 80, 46, wire(on), false, 1, 10),
      text(x + 40, y + 28, name, 'middle', wire(on)),
    ];
    return {
      o: { sum, cout, total: v.a + v.b + v.cin },
      metrics: [
        { label: 'Sum bit', value: String(sum) },
        { label: 'Carry out', value: String(cout) },
        { label: 'Binary total (carry, sum)', value: `${cout}${sum} = ${v.a + v.b + v.cin}` },
      ],
      sceneLabel: `Full adder with A ${v.a}, B ${v.b}, carry in ${v.cin}: sum ${sum}, carry out ${cout}`,
      scene: [
        text(30, 84, `A = ${v.a}`, 'start', wire(v.a)),
        text(30, 124, `B = ${v.b}`, 'start', wire(v.b)),
        text(30, 224, `Cin = ${v.cin}`, 'start', wire(v.cin)),
        line(90, 80, 160, 80, wire(v.a)),
        line(90, 120, 160, 120, wire(v.b)),
        ...gate(160, 77, 'XOR', x1),
        line(240, 100, 330, 100, wire(x1)),
        line(90, 220, 300, 220, wire(v.cin)),
        path('M300 220V124H330', wire(v.cin)),
        ...gate(330, 89, 'XOR', sum),
        line(410, 112, 560, 112, wire(sum)),
        text(570, 116, `Sum ${sum}`, 'start', wire(sum)),
        ...gate(160, 150, 'AND', a1),
        path('M120 80V165H160', wire(v.a)),
        path('M105 120V182H160', wire(v.b)),
        ...gate(330, 200, 'AND', a2),
        path('M280 100V212H330', wire(x1)),
        line(300, 232, 330, 232, wire(v.cin)),
        ...gate(450, 240, 'OR', cout),
        path('M240 173H430V252H450', wire(a1)),
        path('M410 223H430V274H450', wire(a2)),
        line(530, 263, 560, 263, wire(cout)),
        text(570, 267, `Cout ${cout}`, 'start', wire(cout)),
      ],
    };
  },
  missions: [
    goal(
      'Produce a sum bit of 0 together with a carry of 1.',
      'Two high inputs make binary 10.',
      { a: 1, b: 1 },
      (o) => o.sum === 0 && o.cout === 1,
    ),
    goal(
      'Produce binary 11 — both outputs high.',
      'All three inputs must be 1.',
      { a: 1, b: 1, cin: 1 },
      (o) => o.sum === 1 && o.cout === 1,
    ),
    goal(
      'Make the sum bit 1 using only the carry input.',
      'Leave A and B low; a lone carry-in passes through the second XOR.',
      { cin: 1 },
      (o, v) => v.cin === 1 && v.a === 0 && v.b === 0,
    ),
  ],
  predict: {
    q: 'All three inputs of a full adder are 1. The outputs are…',
    options: ['Sum 1, carry 1', 'Sum 0, carry 1', 'Sum 1, carry 0', 'Sum 0, carry 0'],
    correct: 0,
    why: '1 + 1 + 1 = 3, which is binary 11: a carry of 1 (the twos place) and a sum of 1 (the ones place).',
  },
  model:
    'Sum = A ⊕ B ⊕ Cin; Cout = A·B + Cin·(A ⊕ B). Ideal Boolean gates with no propagation delay; a real ripple-carry adder’s speed is limited by the carry chain.',
};

const kirchhoff: TopicLab = {
  id: 'circ-kirchhoff',
  title: 'Two sources, three branches',
  lead: 'Two batteries feed a shared resistor. Series–parallel reduction fails here; Kirchhoff’s laws do not.',
  controls: [
    slider('v1', 'Left source V1', 1, 12, 0.5, 9, 'V'),
    slider('v2', 'Right source V2', 0, 12, 0.5, 3, 'V'),
    slider('r1', 'Left resistor R1', 50, 500, 50, 100, 'Ω'),
    slider('r2', 'Right resistor R2', 50, 500, 50, 100, 'Ω'),
    slider('r3', 'Shared resistor R3', 50, 500, 50, 200, 'Ω'),
  ],
  run: (v) => {
    const vn = (v.v1 / v.r1 + v.v2 / v.r2) / (1 / v.r1 + 1 / v.r2 + 1 / v.r3);
    const i1 = ((v.v1 - vn) / v.r1) * 1000,
      i2 = ((v.v2 - vn) / v.r2) * 1000,
      i3 = (vn / v.r3) * 1000;
    return {
      o: { vn, i1, i2, i3 },
      metrics: [
        { label: 'Node voltage', value: vn, unit: 'V' },
        { label: 'I1 (from left source into node)', value: i1, unit: 'mA' },
        { label: 'I2 (from right source into node)', value: i2, unit: 'mA' },
        { label: 'I3 (node to ground through R3)', value: i3, unit: 'mA' },
        {
          label: 'KCL check: I1 + I2 − I3',
          value: Math.abs(i1 + i2 - i3) < 1e-9 ? 0 : i1 + i2 - i3,
          unit: 'mA',
        },
      ],
      note:
        i2 < -0.05
          ? 'I2 is negative: current flows into the right-hand source, which is being charged rather than delivering energy.'
          : undefined,
      sceneLabel: `Two-source network: node at ${vn.toPrecision(3)} volts; branch currents ${i1.toFixed(1)}, ${i2.toFixed(1)}, and ${i3.toFixed(1)} milliamps`,
      scene: [
        path(
          'M110 158V70H190 M242 70H320 M320 70H398 M450 70H530V158 M110 182V270H530V182 M320 70V144 M320 196V270',
          'ink',
        ),
        ...source(110, 170, `${v.v1} V`),
        ...source(530, 170, ''),
        text(552, 174, `${v.v2} V`),
        ...resistor(216, 70, `R1 ${v.r1} Ω`),
        ...resistor(424, 70, `R2 ${v.r2} Ω`),
        ...resistor(320, 170, `R3 ${v.r3} Ω`, true),
        circle(320, 70, 5, 'slot'),
        text(320, 52, `${vn.toPrecision(3)} V`, 'middle', 'slot'),
        ...arrow(i1 >= 0 ? 150 : 180, 100, i1 >= 0 ? 180 : 150, 100, 'green'),
        ...arrow(i2 >= 0 ? 490 : 460, 100, i2 >= 0 ? 460 : 490, 100, 'green'),
        ...arrow(290, 215, 290, 245, 'green'),
        text(165, 122, `${i1.toFixed(1)} mA`, 'middle', 'green', 11),
        text(475, 122, `${i2.toFixed(1)} mA`, 'middle', 'green', 11),
        text(282, 234, `${i3.toFixed(1)} mA`, 'end', 'green', 11),
      ],
    };
  },
  missions: [
    goal(
      'Adjust only V2 until the right-hand branch carries no current.',
      'I2 is zero when V2 equals the node voltage that V1, R1, and R3 would set alone.',
      { v2: 6 },
      (o, v) => v.v1 === 9 && near(o.i2, 0, 0.05),
    ),
    goal(
      'Make both sources deliver current into the node.',
      'Raise V2 above the node voltage.',
      { v2: 9 },
      (o) => o.i1 > 0.5 && o.i2 > 0.5,
    ),
    goal(
      'With the original sources, bring the node to exactly 4.5 V by changing only R3.',
      'A smaller R3 pulls the node closer to ground.',
      { r3: 150 },
      (o, v) => v.v1 === 9 && v.v2 === 3 && v.r1 === 100 && v.r2 === 100 && near(o.vn, 4.5, 0.01),
    ),
  ],
  predict: {
    q: 'At a node, 42 mA arrives along one branch and 18 mA leaves along a second. The third branch carries…',
    options: [
      '24 mA away from the node',
      '60 mA away from the node',
      '24 mA toward the node',
      '18 mA toward the node',
    ],
    correct: 0,
    why: 'Charge does not pile up at a node: currents in must equal currents out, so 42 = 18 + 24.',
  },
  model:
    'Node-voltage solution: V_n = (V₁/R₁ + V₂/R₂) / (1/R₁ + 1/R₂ + 1/R₃), then each branch current from Ohm’s law. Ideal sources with no internal resistance; a negative current simply means the assumed arrow direction was reversed.',
};

const dividers = [1, 10, 100, 1000],
  meters = [10000, 1000, 100];
const meter: TopicLab = {
  id: 'circ-meter',
  title: 'Voltmeter loading error',
  lead: 'A voltmeter is itself a resistor in parallel with whatever it measures. On a high-resistance circuit that changes the answer.',
  controls: [
    choice('r', 'Each divider resistor (R1 = R2)', ['1 kΩ', '10 kΩ', '100 kΩ', '1 MΩ'], 2),
    choice(
      'meter',
      'Voltmeter input resistance',
      ['Digital multimeter · 10 MΩ', 'Bench meter · 1 MΩ', 'Analog meter · 100 kΩ'],
      0,
    ),
    slider('vs', 'Source voltage', 3, 12, 1, 10, 'V'),
  ],
  run: (v) => {
    const r = dividers[v.r],
      rm = meters[v.meter],
      lower = (r * rm) / (r + rm);
    const truth = v.vs / 2,
      measured = (v.vs * lower) / (r + lower),
      error = ((truth - measured) / truth) * 100;
    return {
      o: { truth, measured, error },
      metrics: [
        { label: 'True voltage across R2 (no meter)', value: truth, unit: 'V' },
        { label: 'Meter reading', value: measured, unit: 'V' },
        { label: 'Loading error', value: error, unit: '%' },
        { label: 'Meter ÷ circuit resistance', value: rm / r, unit: '×' },
      ],
      bars: {
        max: v.vs / 2,
        items: [
          { label: 'True voltage (V)', value: truth, tone: 'muted' },
          { label: 'Reading (V)', value: measured, tone: error > 5 ? 'warm' : 'green' },
        ],
      },
    };
  },
  missions: [
    goal(
      'Find a circuit where the 10 MΩ meter reads within 0.1% of the truth.',
      'Use divider resistors thousands of times smaller than the meter.',
      { r: 0 },
      (o) => o.error < 0.1,
    ),
    goal(
      'Produce a loading error greater than 30%.',
      'Measure a megohm divider with the low-resistance analog meter.',
      { r: 3, meter: 2 },
      (o) => o.error > 30,
    ),
    goal(
      'Keep the error on the 1 MΩ divider under 5%.',
      'Only a meter at least ten times the circuit resistance comes close.',
      { r: 3, meter: 0 },
      (o, v) => v.r === 3 && o.error < 5,
    ),
  ],
  predict: {
    q: 'To disturb a circuit as little as possible, a voltmeter’s internal resistance should be…',
    options: ['Very high', 'Very low', 'Equal to the resistor being measured', 'Zero'],
    correct: 0,
    why: 'The meter sits in parallel; a very high resistance diverts almost no current. An ammeter, placed in series, needs the opposite.',
  },
  model:
    'The meter is modelled as a pure resistance in parallel with R2 of an equal-resistor divider. Real meters also have accuracy specifications, input capacitance, and noise that this lab ignores.',
};

const battery: TopicLab = {
  id: 'circ-battery',
  title: 'Battery charge-time estimate',
  lead: 'Capacity is charge. Divide the charge still needed by the current that actually ends up stored, and you have a time.',
  controls: [
    slider('cap', 'Battery capacity', 500, 5000, 100, 2000, 'mAh'),
    slider('i', 'Charging current', 100, 3000, 100, 500, 'mA'),
    slider('eff', 'Charging efficiency', 60, 100, 5, 85, '%'),
    slider('start', 'Starting state of charge', 0, 90, 10, 20, '%'),
  ],
  run: (v) => {
    const needed = v.cap * (1 - v.start / 100),
      time = needed / ((v.i * v.eff) / 100),
      crate = v.i / v.cap;
    return {
      o: { time, crate, needed },
      metrics: [
        { label: 'Charge still needed', value: needed, unit: 'mAh' },
        { label: 'Estimated time to full', value: time, unit: 'h' },
        { label: 'Charge rate', value: crate, unit: 'C' },
      ],
      note:
        crate > 1
          ? 'Above 1 C: many cells are not rated for this; check the datasheet before charging this fast.'
          : undefined,
      plot: {
        title: 'Time falls as 1 / current',
        x: [100, 3000, 'Charging current (mA)'],
        y: [0, 24, 'Time to full (h)'],
        curves: [{ f: (i) => needed / ((i * v.eff) / 100) }],
        points: [{ x: v.i, y: time, label: `${time.toPrecision(3)} h` }],
      },
    };
  },
  missions: [
    goal(
      'Charge the 2,000 mAh battery in under one hour without exceeding 1 C.',
      'Use the largest current that is not more than the capacity number.',
      { i: 2000 },
      (o) => o.time < 1 && o.crate <= 1,
    ),
    goal(
      'Show that an ideal charger filling an empty battery at 0.5 C takes exactly 2 hours.',
      'Set efficiency to 100%, start at 0%, and make the current half the capacity.',
      { eff: 100, start: 0, i: 1000 },
      (o, v) => v.eff === 100 && v.start === 0 && near(o.time, 2, 1e-6),
    ),
    goal(
      'Find a setup that needs more than 20 hours.',
      'A large empty battery on a trickle current.',
      { cap: 5000, i: 100, start: 0 },
      (o) => o.time > 20,
    ),
  ],
  predict: {
    q: 'The charging current is doubled; battery and efficiency are unchanged. The charge time…',
    options: ['Halves', 'Doubles', 'Falls to one quarter', 'Stays the same'],
    correct: 0,
    why: 'Time = charge needed ÷ effective current. Twice the current delivers the same charge in half the time.',
  },
  model:
    'Constant-current estimate: t = capacity × (1 − state of charge) / (current × efficiency). Real chargers taper the current near full (constant-voltage phase), so actual times are longer than this estimate.',
};

const rc: TopicLab = {
  id: 'circ-rc',
  title: 'RC charging and the time constant',
  lead: 'A capacitor charging through a resistor: fast at first, then ever slower as the voltage left across the resistor shrinks.',
  controls: [
    slider('r', 'Resistance', 1, 100, 1, 10, 'kΩ'),
    slider('c', 'Capacitance', 10, 1000, 10, 100, 'µF'),
    slider('vs', 'Supply voltage', 3, 12, 1, 5, 'V'),
    slider('t', 'Elapsed time', 0, 10, 0.1, 0, 's'),
  ],
  run: (v) => {
    const tau = (v.r * v.c) / 1000,
      vc = (t: number) => v.vs * (1 - Math.exp(-t / tau));
    return {
      o: { tau, vc: vc(v.t), fraction: vc(v.t) / v.vs },
      metrics: [
        { label: 'Time constant τ = RC', value: tau, unit: 's' },
        { label: 'Capacitor voltage', value: vc(v.t), unit: 'V' },
        { label: 'Fraction of supply', value: (vc(v.t) / v.vs) * 100, unit: '%' },
        { label: 'Charging current now', value: ((v.vs - vc(v.t)) / v.r) * 1000, unit: 'µA' },
      ],
      plot: {
        title: 'V_C = V_S (1 − e^(−t/τ))',
        x: [0, 10, 'Time (s)'],
        y: [0, 12, 'Capacitor voltage (V)'],
        curves: [{ f: vc }],
        hlines: [{ y: v.vs, label: 'supply' }],
        vlines: tau <= 10 ? [{ x: tau, label: 'τ' }] : [],
        points: [{ x: v.t, y: vc(v.t), label: `${vc(v.t).toPrecision(3)} V` }],
      },
    };
  },
  missions: [
    goal(
      'Charge the capacitor to about 63% of the supply.',
      'That happens after exactly one time constant.',
      { t: 1 },
      (o) => near(o.fraction, 0.632, 0.012),
    ),
    goal(
      'Redesign the circuit for a time constant of 0.5 s.',
      'τ = RC: halve either component.',
      { r: 5 },
      (o) => near(o.tau, 0.5, 1e-6),
    ),
    goal(
      'Reach more than 99% of the supply voltage.',
      'It takes about five time constants.',
      { t: 5 },
      (o) => o.fraction > 0.99,
    ),
  ],
  predict: {
    q: 'After one time constant, a capacitor charging from zero has reached about…',
    options: [
      '63% of the supply voltage',
      '50% of the supply voltage',
      '100% of the supply voltage',
      '37% of the supply voltage',
    ],
    correct: 0,
    why: '1 − e⁻¹ ≈ 0.632. The 37% figure is what remains to be charged, or what a discharging capacitor still holds.',
  },
  model:
    'Ideal series RC step response: V_C(t) = V_S(1 − e^(−t/RC)). Capacitor leakage, tolerance (often ±20% for electrolytics), and source resistance are neglected.',
};

const opamp: TopicLab = {
  id: 'circ-opamp',
  title: 'Op-amp gain and saturation',
  lead: 'Two resistors set the gain of an ideal operational amplifier — until the output hits a supply rail and can go no further.',
  controls: [
    choice('config', 'Configuration', ['Inverting', 'Non-inverting'], 0),
    slider('vin', 'Input voltage', -2, 2, 0.1, 0.5, 'V'),
    slider('rf', 'Feedback resistor Rf', 1, 100, 1, 10, 'kΩ'),
    slider('rin', 'Input / ground resistor Rin', 1, 100, 1, 10, 'kΩ'),
  ],
  run: (v) => {
    const gain = v.config === 0 ? -v.rf / v.rin : 1 + v.rf / v.rin,
      out = (x: number) => Math.max(-12, Math.min(12, gain * x)),
      clipped = Math.abs(gain * v.vin) > 12 ? 1 : 0;
    return {
      o: { gain, vout: out(v.vin), clipped },
      metrics: [
        { label: 'Closed-loop gain', value: gain, unit: 'V/V' },
        { label: 'Output voltage', value: out(v.vin), unit: 'V' },
        { label: 'Output state', value: clipped ? 'Saturated at a ±12 V rail' : 'Linear region' },
      ],
      plot: {
        title: 'Transfer curve with ±12 V rails',
        x: [-2, 2, 'Input (V)'],
        y: [-13, 13, 'Output (V)'],
        curves: [{ f: out }],
        hlines: [
          { y: 12, label: '+rail' },
          { y: -12, label: '−rail' },
        ],
        points: [
          {
            x: v.vin,
            y: out(v.vin),
            label: `${out(v.vin).toPrecision(3)} V`,
            tone: clipped ? 'warm' : 'slot',
          },
        ],
      },
    };
  },
  missions: [
    goal(
      'Build an inverting amplifier with a gain of −10.',
      'For the inverting configuration, gain = −Rf / Rin.',
      { rf: 100 },
      (o, v) => v.config === 0 && near(o.gain, -10, 1e-6),
    ),
    goal(
      'Drive the output into saturation.',
      'Combine a high gain with a large input.',
      { rf: 100, vin: 2 },
      (o) => o.clipped === 1,
    ),
    goal(
      'Build a non-inverting amplifier with a gain of exactly 3.',
      'For the non-inverting configuration, gain = 1 + Rf / Rin.',
      { config: 1, rf: 20 },
      (o, v) => v.config === 1 && near(o.gain, 3, 1e-6),
    ),
  ],
  predict: {
    q: 'An inverting amplifier has Rf = 20 kΩ and Rin = 10 kΩ. With +1 V at the input, the output is…',
    options: ['−2 V', '+2 V', '+3 V', '−0.5 V'],
    correct: 0,
    why: 'Gain = −Rf/Rin = −2. The non-inverting configuration with the same resistors would give +3.',
  },
  model:
    'Ideal op-amp with negative feedback (infinite open-loop gain, no input current) and hard clipping at ±12 V. Real devices saturate a volt or so inside the rails and have limited bandwidth and slew rate.',
};

const faults = [
  { name: 'Case A', reading: [9, 0, 0, 0], answer: 2 },
  { name: 'Case B', reading: [9, 9, 9, 0], answer: 4 },
  { name: 'Case C', reading: [9, 9, 0, 0], answer: 3 },
  { name: 'Case D', reading: [0.3, 0.3, 0.3, 0], answer: 1 },
];
const fault: TopicLab = {
  id: 'circ-fault',
  title: 'Find the fault with one voltmeter',
  lead: 'A battery, switch, resistor, and LED in series — and the LED is dark. Probe each test point against ground before you name the fault.',
  controls: [
    choice(
      'scenario',
      'Faulty circuit',
      faults.map((f) => f.name),
      0,
    ),
    choice(
      'probe',
      'Red probe position',
      [
        'TP1 · battery +',
        'TP2 · after the switch',
        'TP3 · after the resistor',
        'TP4 · LED cathode (ground)',
      ],
      0,
    ),
    choice(
      'diag',
      'Your diagnosis',
      [
        'Not yet diagnosed',
        'Dead battery',
        'Switch not conducting',
        'Open resistor',
        'LED open or reversed',
      ],
      0,
    ),
  ],
  run: (v) => {
    const f = faults[v.scenario],
      reading = f.reading[v.probe],
      correct = v.diag === f.answer ? 1 : 0,
      xs = [150, 270, 400, 520];
    return {
      o: { reading, correct },
      metrics: [
        { label: 'Voltmeter reading (to ground)', value: reading, unit: 'V' },
        {
          label: 'Diagnosis',
          value:
            v.diag === 0
              ? 'Probe all four points first'
              : correct
                ? 'Consistent with every reading'
                : 'Does not fit the readings — keep probing',
        },
      ],
      sceneLabel: `Series test circuit, ${f.name}; probe at test point ${v.probe + 1} reads ${reading} volts`,
      scene: [
        path('M90 158V90H185 M235 90H310 M362 90H440 M480 90H550V260H90V182', 'ink'),
        ...source(90, 170, '9 V'),
        line(185, 90, 235, 90, 'ink', 2, true),
        text(210, 78, 'switch', 'middle', 'muted', 11),
        ...resistor(336, 90, '330 Ω'),
        path('M440 74V106L480 90Z', 'muted', true),
        line(480, 74, 480, 106, 'ink', 3),
        text(460, 130, 'LED (dark)', 'middle', 'muted', 11),
        ...xs.flatMap((x, i) => [
          circle(
            i === 3 ? 550 : x,
            i === 3 ? 180 : 90,
            i === v.probe ? 8 : 4,
            i === v.probe ? 'slot' : 'gold',
          ),
          text(
            i === 3 ? 565 : x,
            i === 3 ? 184 : 64,
            `TP${i + 1}`,
            i === 3 ? 'start' : 'middle',
            i === v.probe ? 'slot' : 'gold',
            11,
          ),
        ]),
        rect(250, 180, 140, 54, 'ink', false, 1, 8),
        text(320, 214, `${reading.toFixed(1)} V`, 'middle', 'slot', 20),
        text(320, 300, 'Black probe stays on the ground rail.', 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal(
      'Diagnose Case A: probe each point, then choose the fault that fits every reading.',
      'Voltage is present before the switch and gone after it.',
      { scenario: 0, diag: 2 },
      (o, v) => v.scenario === 0 && o.correct === 1,
    ),
    goal(
      'Diagnose Case B from its four test-point readings.',
      'Full voltage reaches TP3, so no current is flowing through the resistor. What is blocking it downstream?',
      { scenario: 1, diag: 4 },
      (o, v) => v.scenario === 1 && o.correct === 1,
    ),
    goal(
      'Diagnose Case C from its four test-point readings.',
      'Voltage disappears between TP2 and TP3.',
      { scenario: 2, diag: 3 },
      (o, v) => v.scenario === 2 && o.correct === 1,
    ),
    goal(
      'Diagnose Case D from its four test-point readings.',
      'If TP1 is already near zero, nothing downstream can be blamed yet.',
      { scenario: 3, diag: 1 },
      (o, v) => v.scenario === 3 && o.correct === 1,
    ),
  ],
  predict: {
    q: 'No current flows in a series circuit because one part is open. The voltage across an intact resistor elsewhere in the loop is…',
    options: ['Zero', 'The full supply voltage', 'Half the supply voltage', 'Negative'],
    correct: 0,
    why: 'V = IR and I = 0. The whole supply voltage appears across the open gap instead — which is how a voltmeter finds it.',
  },
  model:
    'Idealised open-circuit faults in a single series loop measured with an ideal voltmeter referenced to ground. Real faults can be intermittent or partial (high resistance rather than open), and a weak battery may read normal until loaded.',
};

export const circuitLabExtras: EventExtras = {
  eventId: 'circuit-lab',
  labs: [coulomb, energy, divider, ledDesign, adder, kirchhoff, meter, battery, rc, opamp, fault],
  lessons: {
    'circ-u1-l1': {
      labs: ['circ-coulomb'],
      phet: [
        phet(
          'charges-and-fields',
          'Charges and Fields',
          'Place charges and map the field and the equipotential lines they create. Field shows the force on a test charge; potential shows the energy landscape.',
          'Place one positive charge. Use the sensor at 1 m and 2 m: by what factor does the field magnitude change?',
          'Add an equal negative charge to make a dipole. Where is the field strongest, and where is the potential zero?',
          'Draw several equipotential lines with the voltmeter tool. At what angle do field arrows cross them?',
        ),
      ],
      sort: sort(
        'Conductor or insulator?',
        ['Conductor', 'Insulator'],
        [
          ['Copper wire', 0],
          ['Rubber glove', 1],
          ['Salt water', 0],
          ['Dry glass rod', 1],
          ['Aluminium foil', 0],
          ['Plastic comb', 1],
        ],
      ),
      checks: [
        check(
          1,
          'The distance between two point charges is tripled. The electric force between them becomes…',
          ['One ninth as large', 'One third as large', 'Three times larger', 'Nine times larger'],
          'Coulomb’s law is an inverse-square law: 1/3² = 1/9.',
        ),
      ],
    },
    'circ-u2-l1': {
      labs: ['circ-energy'],
      phet: [
        phet(
          'ohms-law',
          'Ohm’s Law',
          'A quick feel for proportionality: the symbols in V = IR grow and shrink as you move each slider.',
          'Hold resistance fixed and double the voltage. What happens to the current?',
          'Hold voltage fixed and double the resistance. Describe the change in current in words and as a ratio.',
        ),
        phet(
          'resistance-in-a-wire',
          'Resistance in a Wire',
          'Resistance is not a fixed property of a material alone — geometry matters. Separate the roles of resistivity, length, and cross-section.',
          'Double the length. Then return it and double the area. Which change raises resistance and which lowers it?',
          'Find two different combinations of length and area that give the same resistance.',
        ),
      ],
      sort: sort(
        'Match the quantity to its unit',
        ['Volt', 'Ampere', 'Ohm', 'Watt'],
        [
          ['Energy per unit charge', 0],
          ['Charge passing per second', 1],
          ['Voltage divided by current', 2],
          ['Energy converted per second', 3],
          ['Joule per coulomb', 0],
          ['Coulomb per second', 1],
        ],
      ),
      checks: [
        check(
          3,
          'A 60 W device runs for 5 hours. How much energy does it use?',
          ['0.30 kWh', '12 kWh', '300 kWh', '65 Wh'],
          'Energy = power × time = 60 W × 5 h = 300 Wh = 0.30 kWh.',
        ),
      ],
    },
    'circ-u3-l1': {
      labs: ['circ-divider'],
      phet: [
        phet(
          'circuit-construction-kit-dc',
          'Circuit Construction Kit: DC',
          'Build the circuits from this lesson with real-looking parts and check them with the built-in voltmeter and ammeter.',
          'Build one battery with two bulbs in series. Measure the voltage across each bulb and across both.',
          'Rebuild with the bulbs in parallel. Compare bulb brightness and total battery current with the series case.',
          'Open a switch in one parallel branch. Does the other bulb change? Explain using node voltages.',
        ),
      ],
      sort: sort(
        'Series or parallel?',
        ['Series', 'Parallel'],
        [
          ['The same current passes through every element', 0],
          ['Every element has the same voltage across it', 1],
          ['Equivalent resistance is the sum', 0],
          ['Equivalent resistance is less than the smallest branch', 1],
          ['One open element stops all current', 0],
          ['Household outlets on one circuit', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A 100 Ω and a 300 Ω resistor are connected in parallel. Their equivalent resistance is…',
          ['75 Ω', '400 Ω', '200 Ω', '100 Ω'],
          '1/R = 1/100 + 1/300 = 4/300, so R = 75 Ω — always smaller than the smallest branch.',
        ),
      ],
    },
    'circ-u4-l1': {
      labs: ['circ-led-design'],
      phet: [
        phet(
          'magnets-and-electromagnets',
          'Magnets and Electromagnets',
          'A relay is a switch pulled by an electromagnet. See how coil current and number of turns set the strength of the field that moves the contact.',
          'On the Electromagnet screen, raise the battery voltage. How does the field strength respond?',
          'Reduce the coil to one loop, then restore all loops at the same voltage. Which matters more for a compact relay coil?',
          'Reverse the battery. What changes about the field, and would a simple relay armature care?',
        ),
      ],
      sort: sort(
        'Which component does this?',
        ['Switch', 'Relay', 'Diode', 'LED'],
        [
          ['Manually opens or closes a path', 0],
          ['Lets a small coil current control a separate, larger load', 1],
          ['Conducts in one direction only', 2],
          ['Emits light when forward-biased', 3],
          ['Electrically isolates the control circuit from the load circuit', 1],
          ['Protects a circuit from reverse polarity', 2],
        ],
      ),
      checks: [
        check(
          3,
          'A red LED (forward drop 2.0 V) should carry 15 mA from a 5.0 V supply. The series resistor should be about…',
          ['200 Ω', '333 Ω', '133 Ω', '75 Ω'],
          'R = (5.0 − 2.0) V / 0.015 A = 200 Ω. Only the voltage left over after the LED appears across the resistor.',
        ),
      ],
    },
    'circ-u5-l1': {
      labs: ['circ-adder'],
      sort: sort(
        'Which gate gives this output?',
        ['AND', 'OR', 'XOR', 'NAND'],
        [
          ['High only when both inputs are high', 0],
          ['High when at least one input is high', 1],
          ['High when the inputs differ', 2],
          ['Low only when both inputs are high', 3],
          ['The sum bit of a half adder', 2],
          ['The carry bit of a half adder', 0],
        ],
      ),
      checks: [
        check(
          2,
          'By De Morgan’s theorem, NOT (A AND B) is equivalent to…',
          ['(NOT A) OR (NOT B)', '(NOT A) AND (NOT B)', 'A OR B', 'A XOR B'],
          'Negating an AND turns it into an OR of the negated inputs — which is why a NAND gate can stand in for an OR with inverted inputs.',
        ),
      ],
    },
    'circ-u6-l1': {
      labs: ['circ-kirchhoff'],
      sort: sort(
        'Which conservation law is being used?',
        ['Junction rule (charge)', 'Loop rule (energy)'],
        [
          ['Currents into a node equal currents out', 0],
          ['Voltage rises and drops around a closed path sum to zero', 1],
          ['I₁ = I₂ + I₃', 0],
          ['V_battery − I·R₁ − I·R₂ = 0', 1],
          ['No charge accumulates at a connection point', 0],
          ['A charge returning to its start has gained no net energy', 1],
        ],
      ),
      checks: [
        check(
          2,
          'A circuit has 4 nodes. How many independent junction (KCL) equations can you write?',
          ['3', '4', '2', '1'],
          'One node equation is always the sum of the others, so N nodes give N − 1 independent equations.',
        ),
      ],
    },
    'circ-u7-l1': {
      labs: ['circ-meter'],
      phet: [
        phet(
          'circuit-construction-kit-dc-virtual-lab',
          'Circuit Construction Kit: DC — Virtual Lab',
          'The lab version shows schematic symbols and uses realistic series ammeters. Practise connecting meters the way you must on a real breadboard.',
          'Build a battery and two resistors in series. Insert the series ammeter and confirm the current is the same at every point.',
          'Measure the voltage across each resistor with the voltmeter probes. Do the two readings add to the battery voltage?',
          'Give the battery some internal resistance in the advanced options and repeat. What happens to the terminal voltage under load?',
        ),
      ],
      sort: sort(
        'How do you connect the meter?',
        [
          'In parallel with the component',
          'In series with the component',
          'With the power removed',
        ],
        [
          ['Measuring the voltage across a resistor', 0],
          ['Measuring the current through an LED', 1],
          ['Measuring a resistor’s resistance', 2],
          ['Checking a battery’s terminal voltage', 0],
          ['Checking continuity of a wire', 2],
          ['Measuring the current a motor draws', 1],
        ],
      ),
      checks: [
        check(
          2,
          'What happens if an ammeter is accidentally connected in parallel with a battery?',
          [
            'A very large current flows, because the ammeter’s resistance is tiny',
            'It reads zero, because no current flows',
            'It reads the battery voltage',
            'Nothing; ammeters are protected by high resistance',
          ],
          'An ammeter is designed to be nearly a short circuit. Across a source it draws a damaging current — usually blowing the meter’s fuse.',
        ),
      ],
    },
    'circ-u8-l1': {
      labs: ['circ-battery'],
      sort: sort(
        'Likely cause of the symptom?',
        ['Open circuit', 'Short circuit', 'Wrong component value'],
        [
          ['No current anywhere in a series loop', 0],
          ['Battery gets hot and its voltage collapses', 1],
          ['LED lights but is much dimmer than designed', 2],
          ['Full supply voltage measured across a switch that should be closed', 0],
          ['A fuse blows as soon as power is applied', 1],
          ['Measured current is ten times the calculated value', 2],
        ],
      ),
      checks: [
        check(
          2,
          'A 3,000 mAh battery is charged from empty at 600 mA with 100% efficiency. The charge time is…',
          ['5 hours', '0.2 hours', '2 hours', '18 hours'],
          'Time = capacity ÷ current = 3,000 mAh ÷ 600 mA = 5 h. Real chargers take longer because of losses and current taper.',
        ),
      ],
    },
    'circ-u9-l1': {
      labs: ['circ-rc', 'circ-opamp'],
      phet: [
        phet(
          'capacitor-lab-basics',
          'Capacitor Lab: Basics',
          'Storage and timing both start with a capacitor. See how plate area and spacing set capacitance, and where the stored energy goes.',
          'On the Capacitance screen, double the plate area, then halve the separation. How does each change the capacitance?',
          'Charge the capacitor, disconnect the battery, and pull the plates apart. Which stays constant — charge or voltage?',
          'On the Light Bulb screen, discharge through the bulb. Describe how brightness changes with time and relate it to the RC curve.',
        ),
      ],
      sort: sort(
        'Combinational or sequential?',
        ['Output depends only on present inputs', 'Output depends on stored state too'],
        [
          ['AND gate', 0],
          ['Full adder', 0],
          ['SR latch', 1],
          ['D flip-flop', 1],
          ['Multiplexer', 0],
          ['Binary counter', 1],
        ],
      ),
      checks: [
        check(
          0,
          'In a BJT used as a switch, a small base current…',
          [
            'Controls a much larger collector current',
            'Is the same size as the collector current',
            'Flows only when the collector is disconnected',
            'Sets the supply voltage',
          ],
          'Current gain (β) lets a milliamp-scale control signal switch a load that draws far more — the same idea as a relay, without moving parts.',
        ),
      ],
    },
    'circ-u10-l1': {
      labs: ['circ-fault'],
      phet: [
        phet(
          'faradays-electromagnetic-lab',
          'Faraday’s Electromagnetic Lab',
          'Generators, transformers, and pickups are all applications of one principle: a changing magnetic flux induces a voltage.',
          'On the Pickup Coil screen, move the magnet slowly and then quickly. How does the induced voltage respond to speed?',
          'Hold the magnet still inside the coil. Is there any induced voltage? Explain why not.',
          'On the Generator screen, raise the rotation rate and count loops. Which design choices raise output voltage?',
        ),
      ],
      sort: sort(
        'Good diagnostic practice or not?',
        ['Sound practice', 'Likely to mislead'],
        [
          ['Check the supply voltage first', 0],
          ['Change one thing at a time and re-measure', 0],
          ['Replace parts at random until it works', 1],
          ['Write down each reading with its units', 0],
          ['Assume the meter is right without checking it on a known source', 1],
          ['Split the circuit in half to localise the fault', 0],
        ],
      ),
      checks: [
        check(
          2,
          'The most efficient first measurement on a circuit that is completely dead is usually…',
          [
            'The supply voltage at the circuit’s input',
            'The resistance of every resistor in turn',
            'The current in the last component',
            'The temperature of the board',
          ],
          'If the supply is missing, nothing downstream can be diagnosed. Checking it first halves the search space immediately.',
        ),
      ],
    },
  },
};
