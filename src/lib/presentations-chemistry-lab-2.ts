import { defineDeck, type Deck } from './presentation-types.ts';

// Chemistry Lab decks for units 4 to 9: gases, equilibrium, acids and bases, thermochemistry,
// kinetics, and enzyme kinetics. Imported by presentations-chemistry-lab.ts.

const gases = defineDeck('chem-u4-l1', [
  {
    kind: 'title',
    title: 'Matter, gas laws, and atmospheric chemistry',
    subtitle:
      'Particles in motion, **Kelvin temperature**, and two different atmospheric mechanisms.',
    objectives: [
      'Use **absolute temperature** in gas relations.',
      'Explain phase changes with particle models.',
      'Distinguish **greenhouse warming** from **ozone depletion**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a gas is heated from 10 °C to 20 °C at constant pressure. Its volume…',
    options: ['Doubles', 'Rises by about 3.5%', 'Halves', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Particle motion',
    bullets: [
      'The **ideal gas** model: particles of negligible volume, no attractions, elastic collisions.',
      '**Pressure** is momentum transfer to the container walls.',
      'Average translational kinetic energy depends on **absolute temperature** only.',
      '==At equal temperature, lighter molecules move faster but carry the same average energy.==',
      'Real gases deviate when crowded (high pressure) or near condensation (low temperature).',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'At 300 K, how do He atoms compare with N₂ molecules?',
    options: [
      'Same average kinetic energy, higher average speed',
      'Higher average kinetic energy, same speed',
      'Same speed and same energy',
      'Lower energy and lower speed',
    ],
    answer: 0,
    explanation:
      'Average translational energy depends only on temperature. Since KE = ½mv², the lighter helium atoms must move faster to carry the same energy.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Gas relationships',
    image: 'chem-gas-laws',
    caption:
      '**PV = nRT** links the variables; hold two fixed and you get Boyle’s, Charles’s, Gay-Lussac’s, or Avogadro’s law.',
    bullets: [
      '**Boyle**: P ∝ 1/V at fixed n and T.',
      '**Charles**: V ∝ T at fixed P and n.',
      'A combined gas-law calculation needs the **same sample amount**.',
      'Match R to your units, and ==always use Kelvin==: 0 °C is not zero thermal motion.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: isothermal expansion',
    problem:
      'A fixed sample expands from **2.0 L to 4.0 L** isothermally, starting at 100 kPa. Find the final pressure.',
    steps: [
      'Hold **n and T fixed**, so Boyle’s law applies.',
      'P₁V₁ = P₂V₂.',
      'P₂ = 100 kPa × 2.0/4.0 = **50 kPa**.',
    ],
    conclusion: '==Doubling the volume halves ideal-gas pressure.==',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A gas occupies 3.00 L at 27 °C. At constant pressure, what volume does it occupy at 127 °C?',
    answer: 4,
    tolerance: 0.02,
    unit: 'L',
    explanation:
      'Convert to Kelvin: 300 K and 400 K. V₂ = 3.00 L × 400/300 = 4.00 L. Using Celsius (127/27) would be wildly wrong.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Mixtures and atmospheres',
    bullets: [
      '**Dalton’s law**: total pressure is the sum of partial pressures.',
      'Each **partial pressure** = mole fraction × total pressure.',
      'Gas collected over water is wet: ==subtract the water vapor pressure== at that temperature.',
      'Atmospheric pressure varies with altitude and weather.',
      'State which **standard conditions** you use; definitions differ.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Hydrogen is collected over water at 25 °C with total pressure 101.3 kPa. Water vapor pressure is 3.2 kPa. What is the dry H₂ pressure?',
    answer: 98.1,
    tolerance: 0.1,
    unit: 'kPa',
    explanation: 'P(H₂) = P(total) − P(H₂O) = 101.3 − 3.2 = 98.1 kPa.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Condensed phases',
    callout:
      'A **phase diagram** maps the stable phase against pressure and temperature; lines are phase boundaries and the **triple point** is where three meet.',
    bullets: [
      'In liquids and solids, particles are close enough that **intermolecular forces** dominate.',
      'Phase changes change arrangement, ==not molecular identity==.',
      'During an equilibrium phase change at fixed pressure, added energy changes the phase fraction while **temperature stays constant**.',
      'A **heating curve** follows energy input along one path; a phase diagram maps P and T.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'On a heating curve for water at 1 atm, what happens along the flat segment at 100 °C?',
    options: [
      'Energy converts liquid to vapor at constant temperature',
      'Water molecules break into H₂ and O₂',
      'The thermometer has stopped working',
      'Temperature rises slowly because heat is lost',
    ],
    answer: 0,
    explanation:
      'Energy goes into overcoming intermolecular attractions during vaporization, so the temperature holds until the phase change is complete. No covalent bonds break.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Two atmospheric mechanisms',
    image: 'ozone-hole-2010',
    caption:
      'The Antarctic **ozone hole** is thinning of stratospheric ozone, which absorbs ultraviolet light. It is a different problem from greenhouse warming.',
    bullets: [
      '**Greenhouse gases** absorb and emit **infrared**, changing Earth’s energy balance.',
      '**Stratospheric ozone** absorbs much incoming **ultraviolet**.',
      '==Different wavelengths, different altitudes, different chemistry.==',
      'Avoid the sealed-glass-box or “hole lets heat in” explanations.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which mechanism does each statement describe?',
    bins: ['Greenhouse effect', 'Ozone depletion'],
    items: [
      ['CO₂ absorbs outgoing infrared radiation', 0],
      ['Chlorine radicals destroy O₃ in the stratosphere', 1],
      ['More UV-B reaches the surface', 1],
      ['Methane traps heat more strongly per molecule than CO₂', 0],
      ['Polar stratospheric clouds speed the destruction each spring', 1],
      ['Lower-atmosphere energy balance shifts toward warming', 0],
    ],
    explanation:
      'Greenhouse warming is about infrared absorption in the lower atmosphere; ozone depletion is about stratospheric chemistry and ultraviolet shielding.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpreting a gas experiment',
    bullets: [
      'Record ==which variable is held constant== before predicting a curve.',
      'Plot **P against 1/V**: ideal Boyle behavior gives a straight line through the origin.',
      'Any smooth curve is not proof; check **residuals** from repeated trials.',
      'Real apparatus has leaks, friction, water vapor, and instrument uncertainty.',
    ],
    callout: 'Never improvise pressurized or heated apparatus from a simulation.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Which plot best tests whether a sample obeys Boyle’s law?',
    options: [
      'Pressure versus 1/volume, looking for a straight line through the origin',
      'Pressure versus volume, looking for any smooth curve',
      'Volume versus Celsius temperature',
      'Pressure versus time',
    ],
    answer: 0,
    explanation:
      'P = k(1/V) is linear in 1/V. A curved P–V plot could match many models, so linearizing makes departures from ideal behavior visible.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '==Kelvin, always==, in any gas-law ratio.',
      'Boyle needs fixed n and T; Charles needs fixed n and P.',
      'Partial pressure = mole fraction × total; subtract water vapor for wet gas.',
      'Phase diagrams map P–T; heating curves follow energy along one path.',
      '**Greenhouse = infrared**; **ozone = ultraviolet**.',
    ],
  },
]);

const equilibrium = defineDeck('chem-u5-l1', [
  {
    kind: 'title',
    title: 'Equilibrium, solubility, and steady state',
    subtitle: 'Equal rates, not equal amounts: use **Q versus K** to predict direction.',
    objectives: [
      'Compare **reaction quotient** with **equilibrium constant**.',
      'Predict perturbations without changing K arbitrarily.',
      'Distinguish equilibrium from **steady state**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: at equilibrium, are reactant and product concentrations equal?',
    options: ['Always', 'Only sometimes', 'Never', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Dynamic equilibrium',
    image: 'chem-no2-equilibrium',
    caption:
      'Brown NO₂ and colorless N₂O₄ interconvert in sealed ampoules: each color holds steady once **forward and reverse rates are equal**, and the balance shifts with temperature.',
    bullets: [
      'At equilibrium, ==rates are equal; concentrations need not be==.',
      'Particles keep reacting; macroscopic composition is constant.',
      'Equilibrium can be approached **from either direction**.',
      'Identify the **system boundary**: flowing systems can be constant for other reasons.',
    ],
  },
  {
    kind: 'multi',
    section: 0,
    prompt:
      'Which statements about a system at chemical equilibrium are true? Select all that apply.',
    options: [
      'Forward and reverse rates are equal',
      'Reactions have stopped',
      'Concentrations stay constant',
      'Reactant and product concentrations must be equal',
      'The same state can be reached starting from products',
    ],
    answers: [0, 2, 4],
    explanation:
      'Equilibrium is dynamic: both reactions continue at equal rates, composition holds steady, and the ratio of amounts depends on K, not on equality.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Writing expressions',
    bullets: [
      'For aA + bB ⇌ cC + dD: **Q = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ**.',
      'Concentrations approximate **activities** in dilute solutions.',
      '==Pure solids and liquids are left out== of the simplified expression.',
      '**K** is Q at equilibrium, at a specified temperature.',
      'Reverse a reaction → K becomes 1/K; multiply coefficients by n → K becomes Kⁿ.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What is the equilibrium expression for CaCO₃(s) ⇌ CaO(s) + CO₂(g)?',
    options: ['K = P(CO₂)', 'K = [CaO][CO₂]/[CaCO₃]', 'K = 1/P(CO₂)', 'K = [CaO]/[CaCO₃]'],
    answer: 0,
    explanation: 'Both solids have constant activity and drop out, leaving only the CO₂ pressure.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Direction from Q',
    columns: ['Comparison', 'Net reaction', 'Why'],
    rows: [
      ['**Q < K**', 'Forward', 'Too few products; forward reaction raises Q'],
      ['**Q > K**', 'Reverse', 'Too many products; reverse reaction lowers Q'],
      ['**Q = K**', 'None', 'At equilibrium within the model'],
      ['Add a catalyst', 'Faster approach', '==K and final composition unchanged=='],
      ['Change temperature', 'Depends', '**K itself changes** with T'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'K = 4.0 for a reaction. Which way does each mixture shift?',
    bins: ['Net forward', 'Net reverse', 'At equilibrium'],
    items: [
      ['Q = 0.50', 0],
      ['Q = 12', 1],
      ['Q = 4.0', 2],
      ['Only reactants present (Q = 0)', 0],
      ['Q = 40', 1],
    ],
    explanation:
      'Q below K runs forward, Q above K runs in reverse, and Q equal to K means no net change.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Perturbations',
    bullets: [
      '**Le Châtelier**: the response partially opposes the disturbance; Q gives the precise answer.',
      'Adding a reactant changes **Q, not K**, at constant temperature.',
      'Compressing a gas mixture tends to favor the side with **fewer gas moles**.',
      '==Inert gas at constant volume does not change partial pressures==, so no shift.',
      'Adding gas at **constant pressure** is a different experiment: the volume grows.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0, match each change to its effect.',
    pairs: [
      ['Add more H₂', 'Shifts toward NH₃; K unchanged'],
      ['Halve the volume', 'Shifts toward fewer gas moles (NH₃)'],
      ['Add argon at constant volume', 'No shift'],
      ['Raise the temperature', 'K decreases; shifts toward N₂ and H₂'],
      ['Add an iron catalyst', 'Reaches equilibrium faster; no shift'],
    ],
    explanation:
      'Concentration and pressure changes alter Q. Only temperature changes K: for an exothermic reaction, heating lowers K. Catalysts change only the rate of approach.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Solubility equilibrium',
    bullets: [
      'A sparingly soluble solid sets up a **solubility product, Ksp**.',
      'CaF₂(s) ⇌ Ca²⁺ + 2F⁻, so **Ksp = [Ca²⁺][F⁻]²**.',
      'With solubility s in pure water: [Ca²⁺] = s, [F⁻] = 2s, so **Ksp = 4s³**.',
      '==No single square-root formula fits every salt==: stoichiometry sets the algebra.',
      '**Common ions**, pH, and complex formation change solubility.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: Ksp of CaF₂',
    problem: 'For CaF₂, **s = 2.0 × 10⁻⁴ M** in ideal pure water. Estimate Ksp.',
    steps: [
      'Write CaF₂(s) ⇌ Ca²⁺ + 2F⁻.',
      'Use [Ca²⁺] = s and [F⁻] = **2s**.',
      'Ksp = s(2s)² = 4s³ = **3.2 × 10⁻¹¹**.',
    ],
    conclusion: '==The fluoride coefficient changes both its concentration and its exponent.==',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'AgCl has Ksp = 1.6 × 10⁻¹⁰. What is its molar solubility in pure water? Enter the coefficient of × 10⁻⁵ M.',
    answer: 1.26,
    tolerance: 0.03,
    unit: '× 10⁻⁵ M',
    explanation: 'AgCl gives one Ag⁺ and one Cl⁻, so Ksp = s². s = √(1.6 × 10⁻¹⁰) = 1.26 × 10⁻⁵ M.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Steady-state approximation',
    bullets: [
      'A reactive **intermediate** can stay nearly constant when its formation and consumption rates balance.',
      'The **steady-state approximation** helps derive rate laws for mechanisms.',
      '==Steady state is not equilibrium==: matter and energy can keep flowing through.',
      'Check the timescale: startup and depletion break the approximation.',
      'Constant concentration alone does not identify the mechanism.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A river’s dissolved oxygen stays constant all afternoon while water flows through. What is the best description?',
    options: [
      'A steady state with continuing inflow and outflow',
      'Chemical equilibrium, so all reactions have stopped',
      'Proof that no oxygen is consumed',
      'Q = K for every reaction in the river',
    ],
    answer: 0,
    explanation:
      'The system is open: oxygen enters and leaves continuously, and its gains and losses balance. Constant composition does not by itself mean thermodynamic equilibrium.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Equilibrium = equal rates, constant composition, not equal amounts.',
      'Leave pure solids and liquids out of Q and K.',
      '==Q < K → forward; Q > K → reverse.==',
      'Only temperature changes K; catalysts change only speed.',
      'Ksp algebra follows stoichiometry: CaF₂ gives 4s³.',
    ],
  },
]);

const acids = defineDeck('chem-u6-l1', [
  {
    kind: 'title',
    title: 'Acids, bases, buffers, and titration',
    subtitle: 'Strength is not concentration, and **equivalence is not always pH 7**.',
    objectives: [
      'Separate **strength** from **concentration**.',
      'Calculate strong-acid titration with charge balance.',
      'Explain **buffers** and **equivalence points**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which is “stronger”, 0.001 M HCl or 1 M acetic acid?',
    options: ['HCl', 'Acetic acid', 'They are equal', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Definitions and conjugates',
    bullets: [
      'A **Brønsted acid** donates a proton; a **Brønsted base** accepts one.',
      '**Conjugate pairs** differ by exactly one proton: NH₄⁺/NH₃, H₂O/OH⁻.',
      'A **Lewis base** donates an electron pair; a **Lewis acid** accepts one, even without proton transfer.',
      '==Water is amphoteric==: acid with NH₃, base with HCl.',
      'Write the actual reaction before labeling: the role depends on the partner.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each acid to its conjugate base.',
    pairs: [
      ['H₂O', 'OH⁻'],
      ['NH₄⁺', 'NH₃'],
      ['H₂CO₃', 'HCO₃⁻'],
      ['H₃O⁺', 'H₂O'],
      ['HSO₄⁻', 'SO₄²⁻'],
    ],
    explanation: 'Remove one proton (H⁺) from each acid. Charge drops by one each time.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Strength and concentration',
    bullets: [
      '**Strength** = extent of ionization; **concentration** = amount per volume.',
      '==A dilute strong acid and a concentrated weak acid are different comparisons.==',
      '**Ka** is the acid dissociation constant; **pKa = −log Ka**. Larger Ka means stronger acid.',
      'pH ≈ −log[H₃O⁺] in introductory work; rigorous pH uses activity.',
      'Very dilute acids need **water autoionization** included.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'What is the pH of 0.0010 M HCl (a strong acid) at 25 °C?',
    answer: 3,
    tolerance: 0.02,
    explanation: 'HCl ionizes completely, so [H₃O⁺] = 1.0 × 10⁻³ M and pH = 3.00.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Water and salt solutions',
    bullets: [
      'At about 25 °C, **Kw ≈ 1.0 × 10⁻¹⁴** and pH + pOH ≈ 14.',
      '==Neutral means [H₃O⁺] = [OH⁻]==, not “pH 7 at every temperature.”',
      'Ions from weak acids or bases **hydrolyze**: not every salt is neutral.',
      'Acetate (from a weak acid) makes solutions basic; ammonium (from a weak base) makes them acidic.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is a 0.1 M solution of each salt acidic, basic, or neutral?',
    bins: ['Acidic', 'Basic', 'Neutral'],
    items: [
      ['NH₄Cl', 0],
      ['NaC₂H₃O₂ (sodium acetate)', 1],
      ['NaCl', 2],
      ['Na₂CO₃', 1],
      ['KNO₃', 2],
      ['AlCl₃', 0],
    ],
    explanation:
      'Conjugate bases of weak acids (acetate, carbonate) make solutions basic. NH₄⁺ and hydrated Al³⁺ donate protons. Ions from strong acids and bases do not hydrolyze.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Buffer mechanism',
    bullets: [
      'A **buffer** holds appreciable weak acid and its conjugate base.',
      'Added strong acid is consumed by the base; added strong base is consumed by the acid.',
      '==Do the stoichiometry first, then the equilibrium.==',
      '**Henderson–Hasselbalch**: pH = pKa + log([base]/[acid]); equal amounts give pH ≈ pKa.',
      'Dilution keeps the ratio but lowers **buffer capacity**.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'An acetate buffer (pKa = 4.76) has [acetate] = 0.20 M and [acetic acid] = 0.10 M. What is its pH?',
    answer: 5.06,
    tolerance: 0.02,
    explanation: 'pH = 4.76 + log(0.20/0.10) = 4.76 + 0.30 = 5.06.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Following a titration',
    image: 'chem-titration-curve',
    caption:
      'A titration curve: pH changes slowly, then jumps steeply around the **equivalence point**, where moles of base equal moles of acid.',
    bullets: [
      '**Equivalence** is stoichiometric; the indicator **endpoint** is an observed color change. ==They need not coincide exactly.==',
      'Strong acid + strong base: find excess moles and divide by the **total volume**.',
      'Weak acid titrations have buffer, equivalence, and excess-base regions.',
      'Weak acid + strong base: the equivalence point is **basic**, not neutral.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: strong acid, strong base',
    problem:
      'Titrate **25.0 mL of 0.100 M HCl** with 0.100 M NaOH. Find the equivalence volume and the pH at 30.0 mL of base.',
    steps: [
      'Acid = 2.50 mmol, so equivalence needs **25.0 mL** of base.',
      'At 30.0 mL, excess OH⁻ = 3.00 − 2.50 = 0.500 mmol in **55.0 mL** total.',
      '[OH⁻] ≈ 0.00909 M; pOH ≈ 2.04; **pH ≈ 11.96** at 25 °C.',
    ],
    conclusion: '==Use the total solution volume after reaction.==',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'How many mL of 0.200 M NaOH reach equivalence with 20.0 mL of 0.150 M HCl?',
    answer: 15,
    tolerance: 0.1,
    unit: 'mL',
    explanation:
      'Acid = 20.0 mL × 0.150 M = 3.00 mmol. Base volume = 3.00 mmol ÷ 0.200 M = 15.0 mL.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using the virtual curve',
    bullets: [
      'The lab fixes **25.0 mL of 0.100 M strong monoprotic acid**; you vary base concentration and volume.',
      'It includes water autoionization, so the pH stays finite at equivalence.',
      '==The curve fits those assumptions only==, not every weak-acid titration.',
      'Compare **mole amounts** instead of treating the steepest segment as the definition of equivalence.',
      'Write your prediction **before** crossing the equivalence volume.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'In the virtual lab you switch to 0.200 M NaOH. Where does equivalence now fall for 25.0 mL of 0.100 M HCl?',
    options: ['12.5 mL', '25.0 mL', '50.0 mL', 'It cannot be found'],
    answer: 0,
    explanation:
      '2.50 mmol of acid needs 2.50 mmol of base: 2.50 ÷ 0.200 = 12.5 mL. Doubling base concentration halves the volume.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Conjugates differ by one proton; roles depend on the partner.',
      '==Strength (Ka) is not concentration (M).==',
      'Salts of weak acids are basic; salts of weak bases are acidic.',
      'Buffers: stoichiometry first, then Henderson–Hasselbalch.',
      'Equivalence ≠ endpoint, and weak-acid equivalence is basic.',
    ],
  },
]);

const thermo = defineDeck('chem-u7-l1', [
  {
    kind: 'title',
    title: 'Thermochemistry, entropy, and free energy',
    subtitle: 'Pick a system, keep your signs straight, and **separate favorability from speed**.',
    objectives: [
      'Apply a consistent **heat and work convention**.',
      'Relate **calorimetry** to enthalpy.',
      'Distinguish thermodynamic favorability from reaction speed.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: a reaction in a coffee-cup calorimeter makes the water warmer. Is the reaction endothermic or exothermic?',
    options: ['Exothermic', 'Endothermic', 'Neither', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'System boundaries',
    bullets: [
      'Name the **system** and the **surroundings** before assigning any sign.',
      '**Heat** flows because of a temperature difference; **work** transfers energy by other organized means.',
      'Chemistry convention: **ΔU = q + w**, with ==w positive when work is done on the system==.',
      'Expansion against external pressure gives negative PV work.',
      'Temperature is a state variable; heat depends on the path.',
    ],
    callout: 'A small hot sample can hold less transferable thermal energy than a large cool one.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A gas absorbs 500 J of heat and does 200 J of work on its surroundings. What is ΔU (chemistry convention)?',
    answer: 300,
    tolerance: 0,
    unit: 'J',
    explanation: 'q = +500 J and w = −200 J (work done by the system), so ΔU = 500 − 200 = +300 J.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Calorimetric reasoning',
    image: 'chem-calorimeter',
    caption:
      'A **coffee-cup calorimeter**: nested foam cups hold the water, which absorbs what the reaction releases, so its temperature rise measures the heat.',
    bullets: [
      'Sensible heating: **q = mcΔT** with roughly constant specific heat.',
      'Balance heat gained and lost by sample, water, and container, plus any phase change.',
      '==Ignoring the calorimeter’s heat capacity or room exchange biases the result.==',
      'q(surroundings) and q(reaction) have **opposite signs** under a proper energy balance.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A reaction warms 100.0 g of water (c = 4.18 J/(g·°C)) from 20.0 °C to 26.0 °C. How many joules did the water absorb?',
    answer: 2508,
    tolerance: 5,
    unit: 'J',
    explanation: 'q = mcΔT = 100.0 × 4.18 × 6.0 = 2508 J. The reaction’s q is about −2.51 kJ.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Enthalpy and Hess’s law',
    bullets: [
      '**Enthalpy H = U + PV** is a state function.',
      'At constant pressure with only PV work, **q = ΔH**.',
      '**Hess’s law**: ==enthalpies add along any path with the same endpoints==.',
      'Reverse a reaction → flip the sign of ΔH; multiply coefficients → multiply ΔH.',
      'Include phases: H₂O(l) and H₂O(g) differ in enthalpy.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'C + O₂ → CO₂ has ΔH = −394 kJ; CO + ½O₂ → CO₂ has ΔH = −283 kJ. What is ΔH for C + ½O₂ → CO?',
    answer: -111,
    tolerance: 0.5,
    unit: 'kJ',
    explanation: 'Keep the first reaction and reverse the second: −394 + 283 = −111 kJ.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Entropy and multiplicity',
    bullets: [
      '**Entropy** counts accessible microscopic states and how energy is distributed among them.',
      'Energy dispersal and mixing tend to raise entropy; “disorder” is an incomplete analogy.',
      'For reversible isothermal heat flow, **ΔS = q_rev / T** (Kelvin).',
      '==Spontaneous means total entropy (system + surroundings) does not decrease==.',
      'A system’s entropy can fall if the surroundings gain more.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which processes increase the system’s entropy? Select all that apply.',
    options: [
      'Ice melting',
      'Water vapor condensing',
      'Dissolving a gas-producing tablet in water',
      'Two gases mixing',
      'N₂ + 3H₂ → 2NH₃ (all gases)',
    ],
    answers: [0, 2, 3],
    explanation:
      'Melting, gas release, and mixing all increase accessible microstates. Condensing and forming fewer gas molecules lower the system’s entropy.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Free energy: ΔG = ΔH − TΔS',
    columns: ['ΔH', 'ΔS', 'Forward favored when…'],
    rows: [
      ['− (exothermic)', '+', '==Always== (ΔG < 0 at every T)'],
      ['+ (endothermic)', '−', 'Never'],
      ['−', '−', '**Low** temperature'],
      ['+', '+', '**High** temperature'],
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Favorable is not fast',
    bullets: [
      '**ΔG < 0** favors the forward process at constant T and P; ΔG = 0 at equilibrium.',
      'Standard ΔG° differs from actual ΔG when activities are not standard.',
      '==A favorable reaction can still be slow== if its activation barrier is large.',
      'Catalysts change kinetics, never an unfavorable equilibrium.',
      'Convert ΔS from J to kJ before multiplying by T.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: finding ΔG',
    problem: 'At **300 K**, ΔH = −20 kJ/mol and ΔS = −50 J/(mol·K). Find ΔG.',
    steps: [
      'Convert entropy: −50 J = **−0.050 kJ**/(mol·K).',
      'TΔS = 300 × (−0.050) = **−15 kJ/mol**.',
      'ΔG = −20 − (−15) = **−5 kJ/mol**.',
    ],
    conclusion: 'Forward is favored at 300 K, but ==ΔG says nothing about how fast==.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'Using the same ΔH and ΔS, above what temperature does ΔG become positive?',
    answer: 400,
    tolerance: 1,
    unit: 'K',
    explanation:
      'ΔG = 0 when T = ΔH/ΔS = (−20 kJ) / (−0.050 kJ/K) = 400 K. Above that, −TΔS outweighs ΔH.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Quantitative checks',
    bullets: [
      'Keep **energy per mole** separate from energy for the actual sample.',
      'Exothermic means **ΔH(system) < 0**, even though the water warms.',
      'Check that mcΔT is plausible before reporting many digits.',
      'The virtual gas model uses the physics convention: ΔU = Q − W_by. ==Translate with w = −W_by.==',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'The virtual gas does 150 J of work on its surroundings (W_by = +150 J). In chemistry convention, what is w?',
    options: ['−150 J', '+150 J', '0 J', '+300 J'],
    answer: 0,
    explanation:
      'Work done by the system is energy leaving it, so w = −W_by = −150 J. Both conventions give the same ΔU.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Define the system first; ΔU = q + w in chemistry convention.',
      'q = mcΔT; include the calorimeter and phase changes.',
      '==Hess’s law: flip sign when reversing, scale when multiplying.==',
      'Spontaneity is about total entropy; ΔG = ΔH − TΔS at constant T, P.',
      'Favorable is not fast: activation energy controls speed.',
    ],
  },
]);

const kinetics = defineDeck('chem-u8-l1', [
  {
    kind: 'title',
    title: 'Kinetics, rate laws, mechanisms, and activation energy',
    subtitle: 'Rate laws come from **experiments**, not from the balanced equation.',
    objectives: [
      'Determine **rate orders** from evidence.',
      'Recognize integrated-law plots and **half-lives**.',
      'Separate mechanism claims from overall equations.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: can you read a rate law’s exponents directly from a balanced overall equation?',
    options: ['Yes, always', 'Only for elementary steps', 'Never', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Defining a rate',
    bullets: [
      '**Rate** = change in concentration per time, signed and normalized by coefficients.',
      'A minus sign makes reactant disappearance a **positive** rate.',
      '==Average rate over an interval differs from instantaneous rate== at one moment.',
      'Temperature, concentration, catalysts, surface area, and mixing all matter.',
      'If diffusion or heat transfer limits the measurement, you may not see the intrinsic rate law.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'For 2NO₂ → 2NO + O₂, O₂ forms at 0.010 M/s. How fast does NO₂ disappear?',
    options: ['0.020 M/s', '0.010 M/s', '0.005 M/s', '0.040 M/s'],
    answer: 0,
    explanation: 'Two NO₂ are consumed per O₂ formed, so −Δ[NO₂]/Δt = 2 × 0.010 = 0.020 M/s.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Experimental rate laws',
    bullets: [
      '**rate = k[A]ᵐ[B]ⁿ**, with m and n found by experiment.',
      '==The overall equation gives exponents only for an elementary step.==',
      'Change one concentration at a time; hold the others and temperature fixed.',
      'Double [A] and the rate quadruples → **second order** in A.',
      'The **units of k** depend on the overall order.',
    ],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Use the method of initial rates.',
    text: 'Doubling [A] with [B] fixed doubles the rate, so the reaction is {0} order in A. Doubling [B] with [A] fixed leaves the rate unchanged, so it is {1} order in B. The overall order is {2}.',
    blanks: ['first', 'zero', 'one'],
    distractors: ['second', 'two', 'three'],
    explanation:
      'Rate ratio = (concentration ratio)ᵐ. 2 = 2¹ gives first order; 1 = 2⁰ gives zero order. The overall order is 1 + 0 = 1.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Integrated relationships',
    columns: ['Order', 'Straight-line plot', 'Half-life'],
    rows: [
      ['Zero', '**[A] vs t** (slope −k)', 'Depends on [A]₀; shrinks as [A] falls'],
      ['First', '**ln[A] vs t** (slope −k)', '==t½ = ln2/k, independent of [A]₀=='],
      ['Second', '**1/[A] vs t** (slope +k)', 'Grows as [A] falls'],
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: first-order half-life',
    problem:
      'A first-order reaction has **k = 0.0200 s⁻¹**. Find the half-life and the fraction left after two half-lives.',
    steps: [
      'Use **t½ = ln2/k**.',
      't½ = 0.6931 / 0.0200 = **34.7 s**.',
      'Two halvings leave (½)² = **0.25** of the start.',
    ],
    conclusion: '==The half-life is constant only for the first-order model.==',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A first-order reactant has t½ = 10 min. What percent remains after 30 min?',
    answer: 12.5,
    tolerance: 0.1,
    unit: '%',
    explanation: '30 min is three half-lives: (½)³ = 0.125, or 12.5%.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Activation and temperature',
    image: 'chem-activation-energy',
    caption:
      'An energy profile: reactants must climb the **activation energy** barrier to reach the transition state; a catalyst offers a lower barrier.',
    bullets: [
      '**Arrhenius**: k = A·e^(−Ea/RT) over a suitable temperature range.',
      'Plot **ln k vs 1/T**: the slope is **−Ea/R**.',
      'Higher T raises the fraction of collisions energetic enough to react.',
      '==Activation energy is a kinetic barrier, not ΔH or ΔG.==',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'An Arrhenius plot of ln k versus 1/T has slope −6000 K. What is Ea? (R = 8.314 J/(mol·K))',
    options: ['About 50 kJ/mol', 'About 6 kJ/mol', 'About 720 J/mol', 'About 500 kJ/mol'],
    answer: 0,
    explanation: 'Slope = −Ea/R, so Ea = 6000 K × 8.314 J/(mol·K) ≈ 49,900 J/mol ≈ 50 kJ/mol.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Mechanistic reasoning',
    bullets: [
      'A **mechanism** is a set of elementary steps that sum to the overall reaction.',
      '**Intermediates** form then get consumed; **catalysts** are consumed then regenerated.',
      '==A mechanism must reproduce the observed rate law==, not just balance atoms.',
      'Slow-step arguments may need pre-equilibria or steady-state intermediates.',
      'Several mechanisms can fit limited data; seek new predictions.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt:
      'Mechanism: (1) NO₂ + NO₂ → NO₃ + NO (slow); (2) NO₃ + CO → NO₂ + CO₂ (fast). Classify each species.',
    bins: ['Reactant', 'Product', 'Intermediate'],
    items: [
      ['CO', 0],
      ['CO₂', 1],
      ['NO₃', 2],
      ['NO', 1],
    ],
    explanation:
      'Summing the steps gives NO₂ + CO → NO + CO₂. NO₃ forms in step 1 and is used in step 2, so it is an intermediate. The slow step predicts rate = k[NO₂]².',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Designing rate measurements',
    bullets: [
      'Use a **calibrated observable**: absorbance in its linear range, or gas volume under control.',
      'Document sampling intervals, mixing, temperature, and initial concentrations.',
      '==A changing color shows progress but is not a numerical rate.==',
      'Plot raw and transformed data, record uncertainty, and run an independent trial.',
      'Separate reproducible **instrument drift** from real kinetics.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which practices make a kinetics data set interpretable? Select all that apply.',
    options: [
      'Calibrating absorbance against known concentrations',
      'Letting the room temperature drift between trials',
      'Recording the time of every reading',
      'Running a blank to check for instrument drift',
      'Judging the order only by how fast the color fades',
    ],
    answers: [0, 2, 3],
    explanation:
      'Calibration, timing, and blanks make the signal quantitative and trustworthy. Temperature drift changes k, and a visual impression is not a rate.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Rates are signed and normalized by coefficients.',
      '==Exponents come from experiment==, unless the step is elementary.',
      'Zero: [A] vs t; first: ln[A] vs t; second: 1/[A] vs t.',
      'First-order t½ = ln2/k, independent of starting amount.',
      'ln k vs 1/T slope = −Ea/R; Ea is not ΔH.',
    ],
  },
]);

const enzymes = defineDeck('chem-u9-l1', [
  {
    kind: 'title',
    title: 'Enzyme saturation and Michaelis–Menten reasoning',
    subtitle:
      'Why adding substrate gives **diminishing returns**, and what Vmax and Km really mean.',
    objectives: [
      'Interpret **Vmax** and **Km**.',
      'Recognize **saturation** and model assumptions.',
      'Connect enzyme data to mechanism limits.',
    ],
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: if you keep adding substrate to an enzyme, does the rate keep rising forever?',
    options: ['Yes', 'No, it levels off', 'It drops right away', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Catalytic proteins',
    bullets: [
      'Many **enzymes** are proteins that stabilize pathways with **lower activation barriers**.',
      '==Enzymes do not change the equilibrium== between substrate and product.',
      'Binding places reactants in a favorable environment; catalysis can involve several chemical and shape-change steps.',
      'A lock-and-key cartoon is a simplification, not evidence that every enzyme is rigid.',
      'Enzyme amount, integrity, **cofactors**, and solution conditions affect activity.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What does an enzyme change about a reaction?',
    options: [
      'The activation barrier and therefore the rate',
      'The equilibrium constant',
      'The ΔG between substrate and product',
      'Which products are thermodynamically favored',
    ],
    answer: 0,
    explanation:
      'Like any catalyst, an enzyme speeds both directions by lowering the barrier. The free-energy difference and K stay the same.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'The minimal scheme',
    bullets: [
      'Teaching mechanism: **E + S ⇌ ES → E + P**.',
      'With initial rates, excess substrate, and a **steady-state ES**: **v = Vmax[S] / (Km + [S])**.',
      'Product buildup and the reverse reaction are neglected.',
      '**Vmax** depends on the amount of active enzyme.',
      '==Km combines rate constants== and is not generally a pure binding constant.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt:
      'Which assumptions does the basic Michaelis–Menten rate equation rely on? Select all that apply.',
    options: [
      'Initial rates, before much product forms',
      'Substrate in large excess over enzyme',
      'A roughly steady-state ES concentration',
      'A fast reverse reaction from product back to substrate',
      'Km equal to the pure binding dissociation constant',
    ],
    answers: [0, 1, 2],
    explanation:
      'The equation neglects product buildup and the reverse reaction, assumes excess substrate, and treats ES as steady. Km generally combines several rate constants.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Reading saturation',
    image: 'chem-michaelis-menten',
    caption:
      'A Michaelis–Menten curve: rate rises almost linearly at low [S], reaches **½Vmax at [S] = Km**, and levels toward **Vmax**.',
    bullets: [
      '[S] ≪ Km: rate is roughly **proportional to [S]**.',
      '[S] = Km: rate is exactly **half of Vmax**.',
      '[S] ≫ Km: enzyme is nearly **saturated**, rate approaches Vmax.',
      '==A hyperbola suggests saturation but does not prove the mechanism==: transport limits can look similar.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: diminishing returns',
    problem:
      'For **Vmax = 10 μmol/min** and **Km = 2 mM**, find the rates at 2 mM and 8 mM substrate.',
    steps: [
      'At 2 mM: v = 10 × 2/(2 + 2) = **5 μmol/min** (half of Vmax).',
      'At 8 mM: v = 10 × 8/(2 + 8) = **8 μmol/min**.',
      'A fourfold rise in substrate gives only a **1.6-fold** rise in rate.',
    ],
    conclusion: '==Saturation produces diminishing rate gains.==',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'With Vmax = 10 μmol/min and Km = 2 mM, what is the rate at [S] = 18 mM?',
    answer: 9,
    tolerance: 0.05,
    unit: 'μmol/min',
    explanation: 'v = 10 × 18/(2 + 18) = 180/20 = 9.0 μmol/min, close to but still below Vmax.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Enzyme concentration',
    bullets: [
      'With the same active fraction and turnover, **doubling active enzyme doubles Vmax**.',
      '==Km does not necessarily change== in the simple model.',
      'Denaturation, inhibitors, or missing cofactors lower the active fraction without changing protein mass.',
      'Compare rates per defined enzyme amount.',
      'A failed high-substrate assay might reflect **substrate inhibition**, pH change, or detection limits.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each change to its expected effect in the simple model.',
    pairs: [
      ['Double the active enzyme', 'Vmax doubles; Km unchanged'],
      ['Half the enzyme is denatured', 'Vmax halves'],
      ['Raise [S] from Km to 9 Km', 'Rate rises from 50% to 90% of Vmax'],
      ['Remove a required cofactor', 'Little or no activity'],
    ],
    explanation:
      'Vmax scales with active enzyme, while Km describes the substrate dependence. At 9 Km, v = Vmax × 9/10 = 90% of Vmax.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Collecting interpretable data',
    bullets: [
      'Measure **initial slopes** before much substrate is used or product builds up.',
      'Include a **blank** and a calibration for the optical or chemical signal.',
      'Use substrate levels ==below, around, and above Km==; a narrow low range cannot pin down Vmax.',
      'Fit the original rate–concentration curve with sensible error weighting.',
      '**Reciprocal plots** can magnify low-concentration errors; they are not automatically better.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which choices improve an estimate of Vmax and Km? Select all that apply.',
    options: [
      'Substrate levels spanning well below to well above Km',
      'Only substrate levels far below Km',
      'Initial-rate slopes from the first minutes',
      'A no-enzyme blank',
      'Rates measured after most substrate is gone',
    ],
    answers: [0, 2, 3],
    explanation:
      'A wide range shows both the linear and saturated regions; initial rates avoid depletion and product effects; blanks remove background signal.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Applications and limits',
    bullets: [
      'Enzyme assays link molecular function to **food processing, metabolism, and biotechnology**.',
      'Predictions hold only within validated **temperature, pH, and substrate** ranges.',
      '==A classroom model cannot set a treatment dose or diagnose a patient.==',
      'Separate the effect of **maximum capacity** (Vmax) from **substrate availability**.',
      'Record what was varied, what data estimate it, and one alternative explanation.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'Two assays give curves with the same Km, but one has double the Vmax. What is the simplest explanation?',
    options: [
      'It contains twice as much active enzyme',
      'Its substrate binds twice as tightly',
      'It is at a different equilibrium constant',
      'Its product is more stable',
    ],
    answer: 0,
    explanation:
      'In the basic model Vmax scales with active enzyme while Km stays put. A tighter-binding substrate would show up as a change in Km instead.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Enzymes lower barriers; they never shift equilibrium.',
      '==v = Vmax[S]/(Km + [S])== under initial-rate, steady-state assumptions.',
      'At [S] = Km, v = ½Vmax; far above Km, v → Vmax.',
      'More active enzyme raises Vmax, not Km.',
      'Span the Km range, use initial rates, and include blanks.',
    ],
  },
]);

export const chemistryDecksLater: Deck[] = [gases, equilibrium, acids, thermo, kinetics, enzymes];
