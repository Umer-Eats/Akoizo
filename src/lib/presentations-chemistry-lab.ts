import { defineDeck, type Deck } from './presentation-types.ts';
import { chemistryDecksLater } from './presentations-chemistry-lab-2.ts';

// Chemistry Lab (Division C) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson in lessons-chemistry.ts section by section (`section` is the
// lesson section index); activities rehearse the key terms, worked example, and checkpoints.

const atoms = defineDeck('chem-u1-l1', [
  {
    kind: 'title',
    title: 'Atoms, measurement, nomenclature, and laboratory reasoning',
    subtitle:
      'Count particles, carry units, name compounds, and record what you **actually measured**.',
    objectives: [
      'Connect atomic particles to periodic trends.',
      'Convert measurements to amounts with **significant figures**.',
      'Interpret names and safe laboratory procedures.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which number on a periodic table tile tells you which element it is?',
    options: ['Atomic number', 'Atomic mass', 'Number of neutrons', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Atomic bookkeeping',
    bullets: [
      '**Atomic number** (Z) counts protons and identifies the element.',
      '**Mass number** counts protons plus neutrons in one isotope; the table lists an abundance-weighted **atomic mass**.',
      'Neutral atoms have equal protons and electrons; ==ions differ only in electrons==.',
      '**Isotopes** share chemical identity but differ in neutrons, mass, and nuclear stability.',
    ],
    callout:
      'Write the nuclear symbol and charge first, then count. Never change the proton number to explain an ion.',
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each species to its particle counts.',
    pairs: [
      ['³⁵Cl⁻', '17 protons, 18 neutrons, 18 electrons'],
      ['³⁷Cl', '17 protons, 20 neutrons, 17 electrons'],
      ['²⁴Mg²⁺', '12 protons, 12 neutrons, 10 electrons'],
      ['²³Na', '11 protons, 12 neutrons, 11 electrons'],
    ],
    explanation:
      'Protons come from Z, neutrons are mass number minus Z, and electrons are Z minus the charge. Chloride gains one electron; Mg²⁺ loses two.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Periodic patterns',
    image: 'chem-periodic-trends',
    caption:
      'Across a period **atomic radius** shrinks and **ionization energy** rises; down a group radius grows as shells are added.',
    bullets: [
      'Rising **effective nuclear charge** pulls the same shell closer across a period.',
      'Exceptions follow subshell occupancy and pairing (for example, O has a lower first IE than N).',
      '==A trend compares related atoms==; it is not an exceptionless ranking of every species.',
      'For **isoelectronic** ions, more protons means a smaller ion.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order these isoelectronic ions from largest to smallest radius.',
    items: ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'],
    explanation:
      'All four have 10 electrons. Nuclear charge rises from 8 to 12, so the same electron cloud is pulled tighter and the radius falls.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Amounts and units',
    bullets: [
      'The **mole** links particles to grams: n = m/M.',
      'Entities = n × **Avogadro’s constant**, exactly 6.02214076 × 10²³ per mole.',
      'Say what the entities are: atoms, molecules, or **formula units**.',
      '==Let units cancel==: grams divided by grams per mole leaves moles.',
    ],
    callout: 'One mole of CaCl₂ formula units contains three moles of ions.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'How many moles are in 9.0 g of water (M = 18.0 g/mol)?',
    answer: 0.5,
    tolerance: 0.01,
    unit: 'mol',
    explanation: 'n = m/M = 9.0 g ÷ 18.0 g/mol = 0.50 mol.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Reporting measurements',
    callout:
      'Read an analog scale like a burette at eye level: record every **certain digit** plus **one estimated digit**; digital equipment reports its stated resolution.',
    bullets: [
      'Multiply or divide: keep the **least number of significant figures**.',
      'Add or subtract: keep the **least number of decimal places**.',
      'Exact counts and defined conversions never limit precision; keep **guard digits** until the end.',
      '==Precision is repeatability; accuracy is agreement with a reference.==',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each statement about precision or accuracy?',
    bins: ['Precision', 'Accuracy'],
    items: [
      ['Five trials agree within 0.01 g', 0],
      ['The mean matches a certified standard', 1],
      ['A biased balance reads the same wrong mass every time', 0],
      ['A calibration check shows a 2% error from the true value', 1],
    ],
    explanation:
      'Precision is about how closely repeated results agree; accuracy is about how close they are to the true or reference value. A biased balance can be precise yet inaccurate.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Naming and formulas',
    bullets: [
      'An **ionic formula balances total charge**: Ca²⁺ needs two Cl⁻, so calcium chloride is CaCl₂.',
      '**Roman numerals** give the oxidation state of variable-charge metals: iron(III) oxide is Fe₂O₃.',
      '**Prefixes** count atoms in binary covalent compounds: dinitrogen tetroxide is N₂O₄.',
      '**Polyatomic ions** keep their formulas, with parentheses when repeated: Ca(NO₃)₂.',
      'A **hydrate** adds its water to the formula mass: CuSO₄·5H₂O.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each name to its formula.',
    pairs: [
      ['Iron(III) oxide', 'Fe₂O₃'],
      ['Calcium nitrate', 'Ca(NO₃)₂'],
      ['Dinitrogen tetroxide', 'N₂O₄'],
      ['Copper(II) sulfate pentahydrate', 'CuSO₄·5H₂O'],
    ],
    explanation:
      'Ionic names balance charge (Fe³⁺ with O²⁻ gives Fe₂O₃), covalent prefixes count atoms, and a hydrate lists its waters after a dot.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Laboratory decisions',
    bullets: [
      'Read the **procedure, labels, and safety information** before handling anything.',
      'Wear eye protection, **label every solution**, use the right waste container, and report spills or broken glass.',
      '==Never identify a chemical by tasting or direct inhalation.==',
      'Use clean equipment and **never return surplus reagent** to the stock bottle.',
      'Keep **observations separate from interpretations** in your notebook.',
    ],
    callout:
      'This lesson teaches reasoning; real experiments need approved procedures and supervision.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which actions are good laboratory practice? Select all that apply.',
    options: [
      'Pour unused reagent into a labeled waste or spare beaker',
      'Return leftover reagent to the stock bottle',
      'Waft vapors only when the procedure says to',
      'Record “white precipitate formed” before writing “chloride present”',
      'Taste a crystal to confirm it is salt',
    ],
    answers: [0, 2, 3],
    explanation:
      'Returning reagent risks contaminating the stock, and tasting is never allowed. Recording the observation before the interpretation keeps your notebook honest.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: counting formula units',
    problem: 'How many formula units are in **5.85 g NaCl**, using M = 58.44 g/mol?',
    steps: [
      'Divide 5.85 g by 58.44 g/mol to get 0.1001 mol, keeping a **guard digit**.',
      'Multiply by 6.02214076 × 10²³ formula units per mole.',
      'Report **6.03 × 10²² formula units** to three significant figures.',
    ],
    conclusion:
      'Each formula unit holds one Na⁺ and one Cl⁻, so the ion count is twice this number.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Using the example, how many total ions (Na⁺ plus Cl⁻) are in 5.85 g NaCl? Enter the coefficient of × 10²² (for example 6.03).',
    answer: 12.05,
    tolerance: 0.1,
    unit: '× 10²² ions',
    explanation: 'Two ions per formula unit: 2 × 6.03 × 10²² = 1.21 × 10²³, which is 12.1 × 10²².',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Z identifies the element**; ions change electrons, isotopes change neutrons.',
      'Trends come from effective nuclear charge and shells, with known exceptions.',
      '==n = m/M==, and always name the entity you are counting.',
      'Sig-fig rules differ for multiply/divide and add/subtract; exact numbers never limit.',
      'Names and formulas must agree in composition and total charge.',
    ],
  },
]);

const bonding = defineDeck('chem-u2-l1', [
  {
    kind: 'title',
    title: 'Bonding, molecular geometry, and intermolecular forces',
    subtitle: 'From electron bookkeeping to 3-D shape to the **forces between molecules**.',
    objectives: [
      'Distinguish **bonding** from attractions between particles.',
      'Use **Lewis structures** and electron domains.',
      'Relate molecular shape to **polarity**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when water boils, what is being overcome?',
    options: [
      'Attractions between water molecules',
      'O–H covalent bonds inside each molecule',
      'Both equally',
      'Not sure yet',
    ],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Bonding models',
    columns: ['Model', 'What holds it together', 'Example'],
    rows: [
      ['**Ionic**', 'Electrostatic attraction in an extended array of ions', 'NaCl crystal'],
      ['**Covalent**', 'Shared electron density between atoms', 'H₂O, CO₂'],
      ['**Metallic**', 'Mobile electrons across a metal lattice', 'Copper wire'],
      ['Intermediate', '==Real bonds can have mixed character==', 'Polar C–O bond'],
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Which bonding model best describes each substance?',
    bins: ['Ionic', 'Covalent molecular', 'Metallic'],
    items: [
      ['Potassium bromide', 0],
      ['Methane', 1],
      ['Aluminum foil', 2],
      ['Magnesium oxide', 0],
      ['Sucrose', 1],
      ['Brass', 2],
    ],
    explanation:
      'Metal plus nonmetal salts form ionic arrays, nonmetals share electrons in molecules, and metals and alloys have delocalized electrons.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Lewis accounting',
    steps: [
      { label: 'Count', detail: 'Total **valence electrons**, adjusted for charge.' },
      {
        label: 'Skeleton',
        detail: 'Choose a plausible arrangement, usually the least electronegative atom central.',
      },
      {
        label: 'Distribute',
        detail: 'Hydrogen gets a **duet**; many main-group atoms reach an **octet**.',
      },
      { label: 'Check', detail: 'Minimize **formal charges**; use multiple bonds where needed.' },
      {
        label: 'Resonance',
        detail: '==One delocalized structure==, drawn as several bookkeeping forms.',
      },
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'How many valence electrons are in the nitrate ion, NO₃⁻?',
    answer: 24,
    tolerance: 0,
    unit: 'electrons',
    explanation: 'N has 5, three O have 18, and the 1− charge adds 1: 5 + 18 + 1 = 24.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Shape from domains',
    callout:
      '**VSEPR** spreads electron domains apart: two domains are linear, three trigonal planar, four tetrahedral.',
    bullets: [
      'A double or triple bond still counts as **one domain**.',
      '**Lone pairs** occupy domains but are left out when naming the molecular shape.',
      'Water: four domains, two lone pairs, **bent**. Ammonia: four domains, one lone pair, **trigonal pyramidal**.',
      '==Electron geometry and molecular shape are different names==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each molecule to its molecular shape.',
    pairs: [
      ['CO₂', 'Linear'],
      ['BF₃', 'Trigonal planar'],
      ['CH₄', 'Tetrahedral'],
      ['NH₃', 'Trigonal pyramidal'],
      ['H₂O', 'Bent'],
    ],
    explanation:
      'Count domains on the central atom, then name the shape from the atoms only: lone pairs turn tetrahedral into pyramidal (one) or bent (two).',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Net molecular polarity',
    bullets: [
      '==A polar bond does not guarantee a polar molecule.==',
      'Add **bond dipole vectors** using the 3-D geometry.',
      'Linear CO₂: opposing dipoles **cancel**, so the molecule is nonpolar.',
      'Bent H₂O: dipoles do not cancel, leaving a **net dipole**.',
      'Different substituents (CH₂Cl₂) break cancellation even in a tetrahedral arrangement.',
    ],
    callout:
      'A flat Lewis drawing can hide the 3-D vector relationship. State bond polarity and shape.',
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which molecules are polar overall? Select all that apply.',
    options: ['CO₂', 'H₂O', 'CCl₄', 'CH₂Cl₂', 'NH₃', 'BF₃'],
    answers: [1, 3, 4],
    explanation:
      'CO₂, CCl₄, and BF₃ have polar bonds arranged symmetrically, so the dipoles cancel. Water and ammonia have lone pairs that break symmetry, and CH₂Cl₂ has unequal substituents.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Forces between particles',
    image: 'chem-hbond-water',
    caption:
      'Dashed lines mark **hydrogen bonds** between water molecules: H on one O attracts a lone pair on a neighboring O.',
    bullets: [
      '**London dispersion** comes from correlated temporary electron fluctuations and acts in every molecule.',
      'Polar molecules add **dipole–dipole** attractions.',
      '**Hydrogen bonding** needs H bonded to N, O, or F interacting with an acceptor lone pair.',
      '==Compare similar-size substances== before blaming one force; polarizability, shape, and packing matter.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why does butane (C₄H₁₀) boil higher than methane (CH₄)?',
    options: [
      'Larger, more polarizable molecules have stronger dispersion forces',
      'Butane forms hydrogen bonds',
      'Butane has ionic bonds',
      'Butane’s C–H bonds are stronger',
    ],
    answer: 0,
    explanation:
      'Both are nonpolar hydrocarbons, so dispersion dominates. More electrons and more surface contact make butane’s dispersion forces stronger. Boiling does not break C–H bonds.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Structure to evidence',
    bullets: [
      'Explain solubility by **competing interactions and entropy**, not “like dissolves like” as a law.',
      '**Conductivity needs mobile charged particles**: solid NaCl conducts poorly; molten NaCl conducts.',
      'Melting, boiling, viscosity, and conductivity give ==different evidence about structure==.',
      'Draw the particles, label interactions, and **predict an independent property** to test your model.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the reasoning about conductivity.',
    text: 'Solid sodium chloride conducts poorly because its {0} are locked in place. When it {1}, the ions can move and it conducts. Sugar solution does not conduct because sugar dissolves as neutral {2}.',
    blanks: ['ions', 'melts', 'molecules'],
    distractors: ['electrons', 'freezes', 'atoms'],
    explanation:
      'Conductivity requires mobile charge carriers. Molten or dissolved ionic compounds have them; molecular solutes such as sucrose do not.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: CO₂ versus H₂O',
    problem: 'Why is **CO₂ nonpolar** while **H₂O is polar**, when both have polar bonds?',
    steps: [
      'Draw both Lewis structures.',
      'CO₂ has two domains on C and is **linear**; H₂O has four domains on O, two of them lone pairs, and is **bent**.',
      'Opposing CO₂ bond dipoles cancel; water’s angled dipoles add to a net dipole.',
    ],
    conclusion: '==Net polarity requires geometry as well as polar bonds.==',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Identify the particles first: ions, molecules, or metal atoms.',
      'Lewis structures count valence electrons; **resonance is one delocalized structure**.',
      'VSEPR domains give electron geometry; atoms alone name the shape.',
      '==Polarity = polar bonds + asymmetric geometry.==',
      'Dispersion acts everywhere; hydrogen bonds need H on N, O, or F.',
    ],
  },
]);

const reactions = defineDeck('chem-u3-l1', [
  {
    kind: 'title',
    title: 'Reactions, equations, and stoichiometry',
    subtitle: 'Balance with coefficients, think in moles, and find **what runs out first**.',
    objectives: [
      'Balance atoms and charge **without altering formulas**.',
      'Identify **limiting reactants**.',
      'Connect theoretical yield to measured yield.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: you see bubbles after mixing two liquids. Is that proof of a chemical reaction?',
    options: ['Yes, always', 'Only with more evidence', 'Never', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Observations and reactions',
    image: 'chem-precipitate',
    caption:
      'A **precipitate** forming when two clear solutions mix supports a reaction, but it does not tell you the equation by itself.',
    bullets: [
      'Gas, precipitate, temperature change, or lasting color change ==support but do not prove== a specific reaction.',
      'Dissolving and phase changes can also produce visible effects.',
      'Record **observations first**, then propose identities and testable products.',
      'Categories overlap: **combustion is usually redox**.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Classify each reaction.',
    bins: ['Precipitation', 'Acid–base', 'Combustion (redox)'],
    items: [
      ['AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)', 0],
      ['HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)', 1],
      ['CH₄ + 2O₂ → CO₂ + 2H₂O', 2],
      ['BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)', 0],
      ['NH₃(aq) + HC₂H₃O₂(aq) → NH₄⁺ + C₂H₃O₂⁻', 1],
      ['2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O', 2],
    ],
    explanation:
      'An insoluble solid marks precipitation, proton transfer marks acid–base, and burning in oxygen is combustion, which is also a redox reaction.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Balancing equations',
    bullets: [
      '**Coefficients conserve atoms**; ==change coefficients, never subscripts==.',
      'Physical states (s, l, g, aq) clarify dissolved ions, gases, and precipitates.',
      'Ionic equations must conserve **charge** as well as atoms.',
      'Cancel **spectator ions** to get the **net ionic equation**.',
      'Fractional coefficients are fine during algebra; multiply through at the end.',
    ],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Balance the combustion of propane.',
    text: 'C₃H₈ + {0} O₂ → {1} CO₂ + {2} H₂O',
    blanks: ['5', '3', '4'],
    distractors: ['2', '6', '8'],
    explanation:
      'Three carbons give 3 CO₂, eight hydrogens give 4 H₂O, and the 10 oxygen atoms on the right need 5 O₂.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What is the net ionic equation for mixing AgNO₃(aq) with NaCl(aq)?',
    options: [
      'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)',
      'Na⁺(aq) + NO₃⁻(aq) → NaNO₃(aq)',
      'AgNO₃ + NaCl → AgCl + NaNO₃',
      'Ag⁺ + NO₃⁻ → AgNO₃(s)',
    ],
    answer: 0,
    explanation:
      'Na⁺ and NO₃⁻ stay dissolved and unchanged, so they are spectators. Only silver and chloride ions combine into the solid.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Mole ratios',
    steps: [
      { label: 'Mass → moles', detail: 'Divide each given mass by its **molar mass**.' },
      {
        label: 'Mole ratio',
        detail: 'Apply the **coefficient ratio** from the balanced equation.',
      },
      { label: 'Moles → target', detail: 'Convert to grams, liters, or particles as asked.' },
      { label: 'Check', detail: '==Coefficients are mole ratios, not mass ratios.==' },
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'For 2H₂ + O₂ → 2H₂O, how many grams of water form from 4.0 g of H₂ with excess O₂? (H₂ = 2.0 g/mol, H₂O = 18.0 g/mol)',
    answer: 36,
    tolerance: 0.5,
    unit: 'g',
    explanation:
      '4.0 g ÷ 2.0 g/mol = 2.0 mol H₂, which makes 2.0 mol H₂O (1:1 ratio). 2.0 mol × 18.0 g/mol = 36 g.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Limiting reactants',
    bullets: [
      'The **limiting reactant** allows the smallest **reaction extent**.',
      'Divide each available mole amount by its coefficient, then ==compare the extents==.',
      'The smallest extent sets the **theoretical product** under complete reaction.',
      'Find the excess left by subtracting the amount **consumed**, never by subtracting masses.',
    ],
    callout: 'A reagent can be in excess even when its starting mass was smaller.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: hydrogen and oxygen',
    problem:
      'React **3.0 mol H₂** with **1.0 mol O₂** (2H₂ + O₂ → 2H₂O). Find the water formed and the hydrogen left.',
    steps: [
      'Extents: 3.0/2 = **1.5** for H₂ and 1.0/1 = **1.0** for O₂.',
      'Oxygen limits; water = 2 × 1.0 = **2.0 mol**.',
      'Hydrogen consumed = 2.0 mol, leaving **1.0 mol H₂**.',
    ],
    conclusion: '==Compare mole amounts divided by coefficients==, not raw moles or grams.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'For N₂ + 3H₂ → 2NH₃, you mix 2.0 mol N₂ with 3.0 mol H₂. How many moles of NH₃ can form?',
    answer: 2,
    tolerance: 0.01,
    unit: 'mol',
    explanation: 'Extents are 2.0/1 = 2.0 and 3.0/3 = 1.0, so H₂ limits. NH₃ = 2 × 1.0 = 2.0 mol.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Yield and concentration',
    bullets: [
      '**Theoretical yield** assumes the limiting reagent reacts completely as written.',
      '**Percent yield** = actual ÷ theoretical × 100%.',
      'Actual yield is lower from incomplete conversion, side reactions, and losses in recovery.',
      '==Above 100% signals a problem==: wet product, impurities, or the wrong product assumption.',
      'In solution, **moles = molarity × volume in liters**; dilution is not a reaction.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'Theoretical yield is 12.0 g and you isolate 9.6 g of dry product. What is the percent yield?',
    answer: 80,
    tolerance: 0.5,
    unit: '%',
    explanation: '9.6 ÷ 12.0 × 100% = 80%.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Checking a solution',
    bullets: [
      'Verify **atom and charge balance** before calculating.',
      'Compare the product amount with the atoms available; **check units** at each step.',
      'Significant figures follow the measured inputs, ==not the exact coefficients==.',
      'When volumes mix, use the **total volume** (additive-volume approximation).',
      'State assumptions: complete reaction, no side products, anhydrous material.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'You mix 50.0 mL of 0.200 M NaCl with 50.0 mL of water. What is the final [NaCl]?',
    options: ['0.100 M', '0.200 M', '0.400 M', '0.0100 M'],
    answer: 0,
    explanation:
      'Moles stay at 0.0100 mol while volume doubles to 100.0 mL, so the concentration halves to 0.100 M.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Observations support reactions; they do not write the equation for you.',
      '**Balance with coefficients**, and conserve charge in ionic equations.',
      'Mass → moles → ratio → target unit.',
      '==The smallest moles-per-coefficient is the limiting reactant.==',
      'Percent yield = actual/theoretical × 100%; over 100% means something is wrong.',
    ],
  },
]);

export const decks: Deck[] = [atoms, bonding, reactions, ...chemistryDecksLater];
