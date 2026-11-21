import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Circuit Lab presentations, served from public/presentations.
export const photos = {
  'circ-field-lines': {
    file: 'circ-field-lines.png',
    width: 1200,
    height: 900,
    alt: 'Field lines curving from a red positive charge to a blue negative charge, with arrows pointing away from + and into −.',
    caption:
      'Field lines leave the positive charge and end on the negative one; the field at any point is tangent to a line.',
    credit: 'Geek3',
    source: commons('VFPt_charges_plus_minus_thumb.svg'),
  },
  'circ-coulomb-balance': {
    file: 'circ-coulomb-balance.png',
    width: 1200,
    height: 1504,
    alt: 'An 18th-century engraving of a glass cylinder with a fine suspended wire, a torsion head on top and a graduated scale around the cylinder.',
    caption:
      'Coulomb’s torsion balance (1785): the twist of a thin wire measured the force between two small charged balls.',
    credit: 'Charles-Augustin de Coulomb',
    source: commons('Balance_de_Coulomb.jpg'),
  },
  'circ-resistors': {
    file: 'circ-resistors.jpg',
    width: 1200,
    height: 840,
    alt: 'Six axial-lead resistors side by side, each with a different set of colored bands.',
    caption:
      'Through-hole resistors: the colored bands encode the nominal resistance and tolerance.',
    credit: 'Evan-Amos',
    source: commons('Electronic-Axial-Lead-Resistors-Array.jpg'),
  },
  'circ-multimeter2': {
    file: 'circ-multimeter2.jpg',
    width: 500,
    height: 595,
    alt: 'A digital multimeter with a rotary range dial, input sockets and red and black test leads.',
    caption:
      'A digital multimeter: the dial selects voltage, current or resistance, and the lead sockets change with the quantity measured.',
    credit: 'André Karwath (Aka)',
    source: commons('Digital_Multimeter_Aka.jpg'),
  },
  'circ-parallel': {
    file: 'circ-parallel.png',
    width: 1200,
    height: 706,
    alt: 'A schematic of resistors R1, R2 up to Rn, each connected between the same top and bottom wires.',
    caption: 'Parallel resistors all connect across the same two nodes, so they share one voltage.',
    credit: 'Omegatron',
    source: commons('Resistors_in_parallel.svg'),
  },
  'circ-wheatstone': {
    file: 'circ-wheatstone.png',
    width: 1200,
    height: 922,
    alt: 'A diamond of four resistors R1, R2, R3 and Rx between nodes A, B, C and D, with a meter VG across the middle and a battery on the left.',
    caption:
      'A Wheatstone bridge: the meter across D and B joins the two halves, so no resistor is simply in series or parallel.',
    credit: 'Rhdv',
    source: commons('Wheatstonebridge.svg'),
  },
  'circ-relay': {
    file: 'circ-relay.png',
    width: 1200,
    height: 536,
    alt: 'Two drawings of a relay: a yellow coil and iron armature beside a set of contacts, open on the left and pulled closed on the right.',
    caption:
      'A relay: current in the coil (1) pulls the armature (2), which moves the contacts (3) of a separate circuit.',
    credit: 'Bisgaard and Teslaton',
    source: commons('Relay_principle_horizontal.jpg'),
  },
  'circ-diode-iv': {
    file: 'circ-diode-iv.png',
    width: 1200,
    height: 832,
    alt: 'Current against voltage for germanium and silicon diodes: almost no current until a knee, then a steep rise, with 1 mA reached near 0.28 V and 0.51 V.',
    caption:
      'Diode I–V curves: tiny current below the knee, then a steep rise. Germanium (blue) turns on at a lower voltage than silicon (red).',
    credit: 'Filip Dominec',
    source: commons('V-a_characteristic_diodes_si_ge.svg'),
  },
  'circ-led-parts': {
    file: 'circ-led-parts.png',
    width: 1200,
    height: 1334,
    alt: 'A cutaway green 5 mm LED labeling the epoxy lens, wire bond, reflective cavity, semiconductor die, anvil and post, with the long anode and short cathode leads.',
    caption:
      'Inside an LED: the die sits in a reflective cup; the longer lead is the anode (+) and the flat spot marks the cathode (−).',
    credit: 'Inductiveload',
    source: commons('LED,_5mm,_green_(en).svg'),
  },
  'circ-rgb-leds': {
    file: 'circ-rgb-leds.jpg',
    width: 1200,
    height: 890,
    alt: 'Red, green and blue LEDs glowing against a black background.',
    caption:
      'LEDs of different colors are made from different semiconductors, so their forward voltages differ.',
    credit: 'PiccoloNamek',
    source: commons('RBG-LED.jpg'),
  },
  'circ-half-adder': {
    file: 'circ-half-adder.png',
    width: 1200,
    height: 668,
    alt: 'Inputs A and B feed an XOR gate that outputs S and an AND gate that outputs C.',
    caption: 'A half adder: Sum = A XOR B and Carry = A AND B.',
    credit: 'Inductiveload',
    source: commons('Half_Adder.svg'),
  },
  'circ-full-adder': {
    file: 'circ-full-adder.png',
    width: 1200,
    height: 540,
    alt: 'A full adder built from two XOR gates, two AND gates and an OR gate, with inputs A, B and Cin and outputs S and Cout.',
    caption:
      'A full adder: two XORs make the sum; the carry block makes Cout whenever at least two inputs are 1.',
    credit: 'Inductiveload',
    source: commons('Full-adder_logic_diagram.svg'),
  },
  'circ-kcl': {
    file: 'circ-kcl.png',
    width: 1200,
    height: 1169,
    alt: 'A node joined by four branches carrying currents i1 to i4, with arrows showing assumed directions.',
    caption:
      'Kirchhoff’s current law: with directions assigned, the currents into the node equal the currents out.',
    credit: 'Pflodo and M0tty',
    source: commons("KCL_-_Kirchhoff's_circuit_laws.svg"),
  },
  'circ-kvl': {
    file: 'circ-kvl.png',
    width: 1200,
    height: 1050,
    alt: 'A loop through nodes a, b, c and d with a source v4 and resistors R1, R2 and R3 carrying voltages v1, v2 and v3.',
    caption:
      'Kirchhoff’s voltage law: going around the loop a–b–c–d, the signed voltages sum to zero.',
    credit: 'Kwinkunks',
    source: commons('Kirchhoff_voltage_law.svg'),
  },
  'circ-breadboard': {
    file: 'circ-breadboard.jpg',
    width: 1200,
    height: 801,
    alt: 'A white solderless breadboard with two blocks of holes split by a central gap, and red and blue supply rails along the edges.',
    caption:
      'A solderless breadboard: short rows of holes are joined inside, the central gap separates the two halves, and the long edge rails carry supply.',
    credit: 'oomlout',
    source: commons('400_points_breadboard.jpg'),
  },
  'circ-3way': {
    file: 'circ-3way.png',
    width: 1200,
    height: 700,
    alt: 'Two 3-way switches between a hot wire and a light bulb, joined by two traveler wires, one shown highlighted as the active path.',
    caption:
      'Two SPDT switches with two traveler wires: either switch can complete or break the path to the lamp.',
    credit: 'Cburnett and Fastfission',
    source: commons('3-way_switches_position_1.svg'),
  },
  'circ-transistors': {
    file: 'circ-transistors.jpg',
    width: 1200,
    height: 949,
    alt: 'Several transistors on a blue background: a tiny surface-mount part, a small TO-92, a TO-126 and a large metal TO-3 can.',
    caption:
      'Bipolar transistors come in many packages, from tiny surface-mount parts to large metal power cans.',
    credit: 'Mister rf',
    source: commons('Transistorer_(cropped).jpg'),
  },
  'circ-opamp-noninv': {
    file: 'circ-opamp-noninv.png',
    width: 1200,
    height: 501,
    alt: 'An op-amp with Vin on the + input and a divider of R2 from the output and R1 to ground feeding the − input.',
    caption:
      'A noninverting amplifier: gain = 1 + R2/R1 while negative feedback keeps the op-amp linear.',
    credit: 'Inductiveload',
    source: commons('Op-Amp_Non-Inverting_Amplifier.svg'),
  },
  'circ-opamp-inv': {
    file: 'circ-opamp-inv.png',
    width: 1200,
    height: 700,
    alt: 'An op-amp with Vin through Rin into the − input, Rf from the output back to the − input, and the + input grounded.',
    caption: 'An inverting amplifier: gain = −Rf/Rin, set by the feedback network.',
    credit: 'Inductiveload',
    source: commons('Op-Amp_Inverting_Amplifier.svg'),
  },
  'circ-rc': {
    file: 'circ-rc.png',
    width: 1200,
    height: 842,
    alt: 'A blue curve of capacitor voltage rising quickly then leveling off, with 63.2% marked at one time constant τ and 99.3% at 5τ.',
    caption:
      'A capacitor charging through a resistor reaches 63% of the final voltage after one time constant τ = RC.',
    credit: 'Ktims',
    source: commons('Series_RC_capacitor_voltage.svg'),
  },
  'circ-arduino': {
    file: 'circ-arduino.jpg',
    width: 1200,
    height: 1200,
    alt: 'A blue Arduino Uno board with a USB socket, power jack, microcontroller chip and rows of header pins.',
    caption: 'A microcontroller board links sensors, processing and actuators in one small system.',
    credit: 'SparkFun Electronics',
    source: commons('Arduino_Uno_-_R3.jpg'),
  },
} satisfies Record<string, Photo>;
