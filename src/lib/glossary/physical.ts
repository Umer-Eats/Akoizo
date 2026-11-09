import type { GlossaryEntries } from './index.ts';

// Physical-science and inquiry events. Keys: term, then other word forms after "|".
export const physicalGlossaries: Record<string, GlossaryEntries> = {
  'circuit-lab': {
    'Circuit|circuits': 'A closed loop that electric current can flow around.',
    Current: 'The flow of electric charge, measured in amperes (A).',
    'Voltage|volts|low-voltage': 'The electric push that drives current, measured in volts (V).',
    'Resistance|resistances': 'How strongly something opposes current, measured in ohms (Ω).',
    'Resistor|resistors': 'A part made to have a set resistance, used to limit current.',
    'Ohm’s law|Ohm': 'Voltage = current × resistance (V = IR).',
    'Power|dissipation': 'The rate energy is used or turned to heat: P = VI, measured in watts.',
    'Joule|joules': 'The SI unit of energy.',
    'Power rating|rating|ratings': 'The most power a part can handle before overheating.',
    Series: 'Parts connected one after another, so the same current flows through each.',
    Parallel:
      'Parts connected side by side across the same two points, so each gets the same voltage.',
    'Kirchhoff’s laws|Kirchhoff':
      'Current into a junction equals current out; voltages around any loop add to zero.',
    'Junction|node': 'A point where two or more wires connect.',
    'Voltage divider':
      'Two resistors in series that split a voltage in proportion to their resistances.',
    'Wheatstone bridge|bridge':
      'A diamond of four resistors used to measure an unknown resistance precisely.',
    'Short circuit': 'An unintended low-resistance path that lets dangerous current flow.',
    'Open circuit': 'A break in the loop so no current flows.',
    'Terminal|terminals|leads': 'The connection points or wires of a part or battery.',
    'Polarity|reversed':
      'Which side is positive and which is negative; some parts work only one way round.',
    DC: 'Direct current: flows in one direction, as from a battery.',
    AC: 'Alternating current: reverses direction many times a second, as from wall outlets.',
    RMS: 'Root mean square: the effective value of an AC voltage or current.',
    Mains: 'Household wall power (about 120 V AC in the US).',
    'Charge|charges':
      'A property of matter that makes it feel electric force; positive or negative.',
    'Coulomb’s law|Coulomb':
      'The force between charges grows with their size and drops with distance squared.',
    'Electric field': 'The force per unit charge around a charged object.',
    Vector: 'A quantity with both size and direction, like force.',
    Scalar: 'A quantity with size only, like voltage or energy.',
    'Capacitor|capacitors|charging':
      'A part that stores charge; it charges and discharges over time.',
    'Time constant|RC': 'RC, the time for a capacitor to reach about 63% of its final charge.',
    'Diode|diodes|PN': 'A one-way valve for current, made from a PN junction.',
    'LED|LEDs': 'Light-emitting diode: a diode that glows when current flows the right way.',
    'Forward voltage|constant-drop':
      'The roughly fixed voltage a diode or LED uses up when it conducts.',
    Breakdown: 'When a diode or insulator suddenly conducts at too high a voltage.',
    Semiconductor: 'A material, like silicon, whose conductivity can be controlled.',
    'Transistor|BJT': 'A semiconductor switch or amplifier controlled by a small signal.',
    CMOS: 'A common chip technology for digital logic.',
    Multimeter: 'A meter that measures voltage, current and resistance.',
    Ammeter: 'A meter for current, placed in series.',
    Voltmeter: 'A meter for voltage, placed in parallel.',
    Breadboard: 'A board with connected holes for building circuits without soldering.',
    'SPST|switch': 'A switch; SPST means single-pole single-throw, a simple on/off switch.',
    'Switch bounce|bounce': 'A switch’s contacts rapidly opening and closing as it is pressed.',
    Actuator: 'A device that turns an electric signal into motion.',
    Analog: 'Using continuously varying signals.',
    Digital: 'Using signals with two levels: 0 and 1.',
    'Logic gate|gate|gates':
      'A circuit that gives a 0 or 1 output from its inputs by a fixed rule.',
    AND: 'A gate whose output is 1 only if all inputs are 1.',
    OR: 'A gate whose output is 1 if any input is 1.',
    'NOT|inverter': 'A gate that flips its input: 1 becomes 0 and 0 becomes 1.',
    NAND: 'NOT-AND: output is 0 only if all inputs are 1.',
    NOR: 'NOT-OR: output is 1 only if all inputs are 0.',
    XOR: 'Exclusive OR: output is 1 if the inputs differ.',
    XNOR: 'Output is 1 if the inputs are the same.',
    'Truth table': 'A table listing a logic circuit’s output for every input combination.',
    'Boolean algebra|boolean|logical':
      'Algebra of true/false values used to describe and simplify logic circuits.',
    'Combinational logic|combinational': 'Logic whose output depends only on its current inputs.',
    'Half-adder': 'A circuit that adds two bits, giving a sum and a carry.',
    Fuse: 'A safety part that melts and breaks the circuit if current is too high.',
    Ground: 'The reference point of zero voltage in a circuit.',
  },
  thermodynamics: {
    'Thermodynamics|thermodynamic': 'The study of heat, work and energy changes.',
    Kelvin: 'The absolute temperature scale; 0 K is absolute zero and K = °C + 273.15.',
    Celsius: 'The temperature scale where water freezes at 0 °C and boils at 100 °C.',
    'Absolute zero': 'The lowest possible temperature, 0 K, where particle motion is at a minimum.',
    Entropy: 'A measure of how spread out energy is; it tends to increase in isolated systems.',
    'First law of thermodynamics|first law':
      'Energy is conserved: change in internal energy = heat added − work done.',
    'Second law of thermodynamics|second law':
      'Heat flows on its own from hot to cold, and total entropy never decreases.',
    'Internal energy|internal-energy':
      'The total kinetic and potential energy of a substance’s particles.',
    'Heat capacity|capacities': 'Energy needed to raise an object’s temperature by 1 degree.',
    'Specific heat': 'Energy needed to raise 1 g (or 1 kg) of a substance by 1 degree.',
    'Latent heat|latent':
      'Energy absorbed or released during a phase change without a temperature change.',
    'Sensible heat|sensible': 'Heat that changes temperature.',
    Vaporization: 'Changing from liquid to gas.',
    'Phase change|plateau':
      'A change of state; temperature stays flat (a plateau) while it happens.',
    Supercritical: 'Above the critical point, where liquid and gas become one phase.',
    'Coexistence|phase diagram':
      'Conditions where two phases exist together, shown as lines on a phase diagram.',
    'Ideal gas|ideal-gas|PV': 'A model gas obeying PV = nRT.',
    Monatomic: 'Made of single atoms, like helium; its internal energy is (3/2)nRT.',
    Translational: 'Motion of a whole particle from place to place.',
    'Constant-volume|isochoric': 'A process at fixed volume, so no work is done.',
    'Constant-pressure|isobaric': 'A process at fixed pressure.',
    Isothermal: 'A process at constant temperature.',
    'Adiabatic|insulated': 'A process with no heat exchange.',
    'Cyclic|cycle': 'A process that returns a system to its starting state.',
    'Heat engine|engine': 'A device that turns heat flowing from hot to cold into work.',
    Efficiency: 'Useful work out ÷ energy in.',
    Carnot:
      'The ideal engine with the highest possible efficiency: 1 − Tc/Th (temperatures in kelvin).',
    'Refrigerator|heat pump': 'A device that uses work to move heat from cold to hot.',
    'Coefficient of performance|COP|copref|copheat':
      'Heat moved ÷ work used for a refrigerator or heat pump.',
    Conduction: 'Heat moving through direct contact.',
    Convection: 'Heat moving by flowing fluid.',
    Radiation: 'Heat moving as electromagnetic waves.',
    'Thermal conductivity': 'How easily a material conducts heat.',
    Insulation: 'Material that slows heat transfer.',
    'Calorimeter|calorimetry': 'An insulated container used to measure heat transfer.',
    'Thermal equilibrium':
      'When objects in contact reach the same temperature and heat stops flowing.',
    'Extensive|intensive':
      'Extensive properties depend on amount (mass, energy); intensive ones do not (temperature).',
    Macroscopic: 'Large enough to measure directly, like pressure or temperature.',
    'Mole|moles': 'A counting unit, 6.02 × 10²³ particles.',
    Piston: 'A sliding plug in a cylinder; gas pushing it does work.',
    SI: 'The International System of Units (metres, kilograms, seconds, kelvin).',
  },
  codebusters: {
    'Cipher|ciphers': 'A method of hiding a message by changing its letters by a rule.',
    Plaintext: 'The original readable message.',
    Ciphertext: 'The scrambled, encrypted message.',
    'Encrypt|encryption|encode|encodes|encoding': 'Turning plaintext into ciphertext.',
    'Decrypt|decode|decoding|decoded': 'Turning ciphertext back into plaintext.',
    'Key|keys|keyword': 'The secret setting or word that controls a cipher.',
    'Keyed alphabet|keyed':
      'A cipher alphabet that starts with a keyword and continues with the unused letters.',
    'K1|K2|K3':
      'Ways of building keyed alphabets: the keyword in the plaintext (K1), the ciphertext (K2) or both shifted (K3).',
    Aristocrat: 'A substitution cipher that keeps spaces between words.',
    Patristocrat: 'A substitution cipher with spaces removed and letters grouped in fives.',
    Xenocrypt: 'A substitution cipher in Spanish.',
    'Substitution cipher|substitution':
      'A cipher that replaces each letter with another letter or symbol.',
    Monoalphabetic: 'Using one fixed substitution for the whole message.',
    Cryptogram: 'A puzzle of encrypted text to solve.',
    'Caesar cipher|Caesar': 'Shifting every letter the same number of places along the alphabet.',
    Atbash: 'Swapping A↔Z, B↔Y and so on.',
    'Affine cipher|affine': 'Encrypting each letter number x as (ax + b) mod 26.',
    'Modular arithmetic|mod': 'Arithmetic that wraps around, like a clock; mod 26 for letters.',
    'Modular inverse|a-inverse':
      'The number that undoes multiplying by a, mod 26; needed to decrypt affine.',
    'Vigenère|Vigenere': 'Shifting letters by different amounts set by a repeating keyword.',
    Porta:
      'A keyword cipher using paired half-alphabets, where encrypting and decrypting are the same.',
    'Hill cipher|Hill': 'A cipher that encrypts letter pairs or triples using a matrix.',
    'Baconian|AAAAA|AAAAB|AABAA': 'A cipher writing each letter as five A/B symbols.',
    'Morse code|Morse': 'Letters written as dots and dashes.',
    'Pollux|Morbit': 'Ciphers that turn Morse code dots, dashes and gaps into digits.',
    'Fractionated Morse|fractionated-morse':
      'A cipher that turns Morse symbols into triples and maps them to letters.',
    Nihilist: 'A cipher that adds Polybius-square numbers of the message and a key.',
    'Polybius square':
      'A 5×5 grid of letters where each letter is written as its row and column numbers.',
    Checkerboard: 'A cipher using a keyed grid with row and column keys.',
    'Columnar transposition|columnar|transposition':
      'Writing a message in rows and reading out the columns in a key order.',
    'Cryptarithm|SEND|MORE|MONEY':
      'A puzzle where letters stand for digits in a sum, like SEND + MORE = MONEY.',
    'Frequency analysis|frequency':
      'Using how often letters appear to guess substitutions; E, T and A are most common in English.',
    'Crib|cribs': 'A known or guessed piece of plaintext used to break a cipher.',
    'Pattern word|pattern words':
      'A word with repeated letters, like BALLOON, whose shape helps identify it.',
    'Mapping|mappings': 'Which plaintext letter goes with which ciphertext letter.',
  },
  'experimental-design': {
    'Independent variable|independent-variable|IV':
      'The factor you change on purpose in an experiment.',
    'Dependent variable|DV': 'The factor you measure to see the effect.',
    'Controlled variable|controlled variables|constants':
      'Factors kept the same so they do not affect the result.',
    'Control group|control trial': 'A group or trial without the change, used for comparison.',
    Hypothesis:
      'A testable prediction of how the independent variable affects the dependent variable.',
    'Trial|trials': 'One run of an experiment; repeating trials reduces random error.',
    'Replication|repeated trials': 'Repeating an experiment to check that results hold.',
    'Confounding variable|confounded|confounding':
      'An uncontrolled factor that changes along with the independent variable and muddies the result.',
    'Randomization|randomized':
      'Assigning trials or order by chance to spread out unknown effects.',
    Blocking: 'Grouping trials by a known nuisance factor so its effect can be separated.',
    Bias: 'A systematic error that pushes results one way.',
    'Random error|noise|noisy': 'Unpredictable scatter in measurements.',
    'Systematic error|miscalibrated':
      'A consistent error in one direction, such as from a mis-zeroed tool.',
    Accuracy: 'How close a measurement is to the true value.',
    Precision: 'How close repeated measurements are to each other.',
    'Mean|average': 'The sum of values divided by how many there are.',
    Median: 'The middle value when data are in order.',
    Mode: 'The most common value.',
    Range: 'Largest value minus smallest.',
    'Standard deviation|SD|deviations': 'A measure of how spread out data are around the mean.',
    Variance: 'Standard deviation squared; another measure of spread.',
    'Outlier|outliers|anomalies': 'A value far from the rest of the data.',
    Statistics: 'Math for summarizing data and judging how confident we can be.',
    Correlation: 'A pattern where two variables change together; not proof of cause.',
    'Line of best fit|trend line': 'A line drawn through data to show the overall trend.',
    'Significant figures|decimals':
      'The digits in a measurement that are meaningful given its precision.',
    Qualitative: 'Described in words rather than numbers.',
    Quantitative: 'Measured in numbers.',
    'CER|claim, evidence, reasoning':
      'Claim, evidence, reasoning: a way to structure a conclusion.',
    'Procedure|procedural': 'The step-by-step method of the experiment.',
    Apparatus: 'The equipment used in an experiment.',
    'Calibration|calibrate': 'Checking and adjusting an instrument against a known standard.',
    'Raw data|raw-data': 'Measurements as recorded, before any calculation.',
  },
};
