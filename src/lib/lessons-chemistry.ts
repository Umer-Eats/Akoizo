import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';

export const chemistryLessons = buildCourse({
  eventId: 'chemistry-lab',
  eventName: 'Chemistry Lab',
  prefix: 'chem',
  lab: 'chemistry',
  syllabus: 'Chemistry Lab C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Nine units connect microscopic structure, quantitative reactions, gases, equilibria, energy, and rates. Use dimensional reasoning and evidence before choosing an equation. Unit 9 is optional enrichment. The supplied syllabus defines this course; applicable event rules define competition topics and permitted equipment.',
  references: [
    {
      title: 'OpenStax Chemistry 2e',
      url: 'https://openstax.org/books/chemistry-2e/pages/1-introduction',
    },
  ],
  chapters: [
    c(
      'Atoms, measurement, nomenclature, and laboratory reasoning',
      [
        'Connect atomic particles to periodic trends.',
        'Convert measurements to amounts with significant figures.',
        'Interpret names and safe laboratory procedures.',
      ],
      [
        [
          'Atomic bookkeeping',
          'Atomic number counts protons and identifies an element. Mass number counts protons plus neutrons in one isotope; the periodic table usually reports an abundance-weighted atomic mass instead. Neutral atoms have equal proton and electron counts, while ions differ in electrons. Isotopes share chemical identity but can differ in mass and nuclear stability. Write the nuclear symbol and charge before calculating particle counts; never change proton number merely to explain an ion.',
        ],
        [
          'Periodic patterns',
          'Electron arrangement helps explain recurring properties. Across many main-group periods, increasing effective nuclear attraction generally contracts atomic radius and raises ionization energy, with exceptions associated with subshell occupancy and pairing. Down a group, added electron shells often increase radius. A trend is a model for comparing related atoms, not an exceptionless ranking of all species. Compare ions with the same electron count by their nuclear charge, and distinguish atomic radius from ionic radius.',
        ],
        [
          'Amounts and units',
          'The mole connects microscopic entities with macroscopic measurements. Amount n = m/M requires mass and molar mass in compatible units; entity count is n times Avogadro’s constant, exactly 6.02214076 × 10²³ per mole. Specify whether entities are atoms, molecules, or formula units. Dimensional cancellation reveals many mistakes: dividing grams by grams per mole produces moles. For a compound, count atoms within each formula unit separately from the number of formula units.',
        ],
        [
          'Reporting measurements',
          'Record all certain instrument digits and one estimated digit for an analog scale; use the stated resolution for digital equipment. Multiplication and division usually follow the least precise significant-figure count, while addition and subtraction follow decimal-place precision. Retain guard digits through intermediate calculations. Exact counts and defined conversions do not limit precision. Precision describes reproducibility, while accuracy describes agreement with a reference; a consistently biased balance can be precise without being accurate.',
        ],
        [
          'Naming and formulas',
          'An ionic formula balances total charge rather than naming a discrete molecule. Calcium chloride is CaCl₂ because Ca²⁺ requires two chloride ions. Roman numerals specify oxidation state for variable-charge metals; molecular prefixes instead count atoms in many binary covalent compounds. Polyatomic ions retain their internal formulas, with parentheses when repeated. Check that the name, composition, and total charge agree before calculating molar mass. Hydrates add the indicated water contribution to formula mass.',
        ],
        [
          'Laboratory decisions',
          'Read the procedure, labels, and safety information before handling substances. Wear required eye protection, label solutions, use appropriate waste containers, and tell the supervisor about spills or broken glass. Never identify a chemical by tasting or direct inhalation. Measure with clean equipment, avoid returning surplus reagent to stock, and separate observations from interpretations in your notebook. This virtual lesson teaches reasoning; real experiments require approved procedures and supervision.',
        ],
      ],
      [
        ['Isotope', 'Atoms with equal proton counts but different neutron counts.'],
        ['Mole', 'Amount containing the defined Avogadro number of entities.'],
        ['Precision', 'Repeatability of measurements.'],
        ['Oxidation state', 'Formal electron-accounting number used in formulas and redox.'],
      ],
      [
        'How many formula units are in 5.85 g NaCl, using M = 58.44 g/mol?',
        [
          'Divide 5.85 g by 58.44 g/mol to obtain 0.1001 mol before rounding.',
          'Multiply by 6.02214076 × 10²³ formula units/mol.',
          'Report 6.03 × 10²² formula units to three significant figures.',
        ],
        'Each formula unit has one sodium ion and one chloride ion.',
      ],
      [
        [
          'An ion forms by changing its…',
          'Electron count',
          ['Proton identity', 'Atomic number', 'Number of elements'],
          'Ordinary ion formation transfers electrons.',
        ],
        [
          'The formula of calcium chloride is…',
          'CaCl₂',
          ['CaCl', 'Ca₂Cl', 'CaCl₃'],
          'Total charge must balance.',
        ],
        [
          'A precise but biased balance produces…',
          'Closely grouped readings displaced from the reference',
          ['Perfect accuracy', 'Random chemical identities', 'Exact masses'],
          'Repeatability and accuracy differ.',
        ],
      ],
      [
        [
          'Distinguish isotope mass number from atomic mass.',
          'Mass number is an integer nucleon count for one isotope; atomic mass on a table is usually an abundance-weighted value.',
        ],
        [
          'Why identify the entity in a mole calculation?',
          'A mole of molecules and a mole of constituent atoms count different objects.',
        ],
        [
          'Convert 0.20 mol CO₂ to moles of oxygen atoms.',
          '0.40 mol oxygen atoms, because each molecule contains two.',
        ],
        [
          'Explain why guard digits matter.',
          'Premature rounding can accumulate error; round the final result to input precision.',
        ],
      ],
      [
        ['Measure', 'Record mass, units, and instrument resolution.'],
        ['Convert', 'Use molar mass and entity definitions.'],
        ['Check', 'Confirm charge, units, and significant figures.'],
      ],
      [
        ['Isotope', 'Neutron count changes', 'Element identity stays fixed.'],
        ['Ion', 'Electron count changes', 'Proton count stays fixed.'],
        ['Measurement', 'Includes finite resolution', 'Calculator digits do not create precision.'],
      ],
      'Explore the amount and concentration controls. Hold amount fixed while doubling volume; predict the concentration ratio.',
      'Chemical calculations begin with defined entities, balanced charge, and traceable units.',
    ),
    c(
      'Bonding, molecular geometry, and intermolecular forces',
      [
        'Distinguish bonding from attractions between particles.',
        'Use Lewis structures and electron domains.',
        'Relate molecular shape to polarity.',
      ],
      [
        [
          'Bonding models',
          'Ionic bonding describes electrostatic attraction within an extended array of oppositely charged ions. Covalent bonding describes shared electron density between atoms; metallic bonding involves mobile electrons across a metal structure. Real bonds can have intermediate character. Electronegativity difference is a useful clue rather than an absolute boundary. Do not call melting an ionic solid the breaking of molecular covalent bonds: identify the particles and interactions appropriate to the material.',
        ],
        [
          'Lewis accounting',
          'Count total valence electrons, adjust for charge, choose a plausible skeleton, and distribute electrons while checking formal charges. Hydrogen normally has a duet, and many main-group atoms tend toward octets, with recognized exceptions. Multiple bonds change electron allocation but still count as one domain in simple geometry reasoning. Resonance structures represent alternative electron bookkeeping for one delocalized structure; the molecule does not rapidly alternate between independent drawings.',
        ],
        [
          'Shape from domains',
          'VSEPR models electron domains around a central atom as arrangements that reduce repulsion. Two domains suggest linear geometry, three trigonal planar, and four tetrahedral electron geometry. Lone pairs occupy domains but are omitted when naming molecular shape. Water has four electron domains and a bent molecular shape; ammonia has a trigonal pyramidal shape. These models predict useful approximate shapes, while exact angles depend on bonding and electronic structure.',
        ],
        [
          'Net molecular polarity',
          'A polar bond does not guarantee a polar molecule. Add bond dipole vectors with the molecular geometry: symmetrical CO₂ has opposing bond dipoles that cancel, while bent H₂O has a net dipole. Different substituents can destroy cancellation even in an apparently symmetrical electron-domain arrangement. State both the bond polarity and the spatial reasoning. A two-dimensional Lewis drawing alone may hide the three-dimensional vector relationship.',
        ],
        [
          'Forces between particles',
          'London dispersion arises from correlated temporary electron-density fluctuations and occurs in all atoms and molecules. Polar molecules can also show dipole interactions. Hydrogen bonding is especially important when hydrogen bonded to suitable electronegative atoms interacts with an acceptor. Compare similar-size substances before attributing boiling-point differences to one force; polarizability, shape, and packing matter too. Intermolecular attractions influence phase behavior without normally changing molecular connectivity.',
        ],
        [
          'Structure to evidence',
          'Explain solubility through competing interactions and entropy rather than memorizing like dissolves like as a universal law. Conductivity requires mobile charged particles: an ionic solid may conduct poorly while its melt conducts. Melting, boiling, viscosity, and conductivity offer different evidence about structure. A single measurement rarely identifies an unknown uniquely. Draw the proposed particles, label their interactions, and predict an independent property that could challenge the model.',
        ],
      ],
      [
        ['Lewis structure', 'Valence-electron and bond representation.'],
        ['Electron domain', 'Bond or lone-pair region around a center.'],
        ['Dipole', 'Separation of electrical charge.'],
        ['Dispersion', 'Attraction associated with correlated electron fluctuations.'],
      ],
      [
        'Why is CO₂ nonpolar while H₂O is polar?',
        [
          'Draw both Lewis structures.',
          'CO₂ is linear; H₂O is bent because oxygen has two lone-pair domains.',
          'Opposing CO₂ dipoles cancel; water dipoles do not.',
        ],
        'Net polarity requires geometry as well as polar bonds.',
      ],
      [
        [
          'Water has which molecular shape?',
          'Bent',
          ['Linear', 'Trigonal planar', 'Octahedral'],
          'Lone pairs influence its electron-domain arrangement.',
        ],
        [
          'All molecules exhibit…',
          'Dispersion interactions',
          ['Permanent ion lattices', 'Hydrogen bonding', 'Metallic bonding'],
          'Dispersion does not require a permanent dipole.',
        ],
        [
          'A double bond counts as how many VSEPR domains?',
          'One',
          ['Two', 'Three', 'Zero'],
          'One region of electron density defines a domain.',
        ],
      ],
      [
        [
          'Explain ionic-melt conductivity.',
          'Mobile ions carry charge; fixed ions in a solid lattice cannot move freely.',
        ],
        [
          'Why does resonance not mean alternating molecules?',
          'The actual electronic structure is delocalized; drawings are accounting contributors.',
        ],
        [
          'Distinguish boiling from chemical decomposition.',
          'Boiling changes intermolecular arrangement; decomposition changes chemical identities and connectivity.',
        ],
        [
          'Design evidence for a polarity claim.',
          'Use molecular geometry and bond dipoles, then compare independent properties with controlled molecular size.',
        ],
      ],
      [
        ['Count', 'Allocate valence electrons and charges.'],
        ['Arrange', 'Identify domains and molecular shape.'],
        ['Predict', 'Combine dipoles and particle attractions.'],
      ],
      [
        ['Covalent bond', 'Shared electron density', 'Not the same as intermolecular attraction.'],
        ['Lone pair', 'Changes domain arrangement', 'Omitted in molecular-shape naming.'],
        [
          'Hydrogen bond',
          'Specific donor–acceptor attraction',
          'Not present in every hydrogen-containing molecule.',
        ],
      ],
      'Use the concentration diagram to distinguish particle number from concentration. Explain why its dots cannot establish molecular geometry.',
      'Models must match the level of structure: atoms, molecules, or bulk materials.',
    ),
    c(
      'Reactions, equations, and stoichiometry',
      [
        'Balance atoms and charge without altering formulas.',
        'Identify limiting reactants.',
        'Connect theoretical yield to measured yield.',
      ],
      [
        [
          'Observations and reactions',
          'Gas formation, a precipitate, temperature change, or a persistent color change may support a reaction, but none alone proves a particular equation. Dissolution and phase changes can also produce visible effects. Record observations first, then propose identities and testable products. Common categories include precipitation, acid–base, redox, and combustion. Categories can overlap: combustion is usually redox. Use chemical evidence rather than forcing every process into one exclusive label.',
        ],
        [
          'Balancing equations',
          'Coefficients conserve atoms in ordinary chemical reactions. Change coefficients, never subscripts, because subscripts define the substances. Include physical states when they clarify dissolved ions, gases, or precipitates. For an ionic equation, conserve total charge as well as atoms. Cancel spectator ions to obtain the net ionic equation, but retain species that chemically change. Fractional coefficients can assist algebra, then multiply to obtain conventional whole-number coefficients.',
        ],
        [
          'Mole ratios',
          'Balanced coefficients express ratios of reacting amounts, not mass ratios. Convert each given mass to moles, apply the relevant coefficient ratio, and convert the target amount to the requested unit. Write a cancellation chain rather than choosing operations from memory. The equation 2H₂ + O₂ → 2H₂O means two moles of hydrogen require one mole of oxygen; it does not mean two grams of hydrogen require one gram of oxygen.',
        ],
        [
          'Limiting reactants',
          'A reactant is limiting if it permits the smallest reaction extent. Divide each available mole amount by its stoichiometric coefficient and compare these extents. The smallest controls theoretical product formation under the stated complete-reaction assumption. Calculate excess remaining from the amount consumed, not from an unbalanced subtraction of masses. An excess reagent can remain even when its initial mass was smaller than another reagent’s mass.',
        ],
        [
          'Yield and concentration',
          'Theoretical yield assumes the limiting reagent follows the stated equation completely. Actual isolated yield can be lower because conversion, selectivity, recovery, and measurement are imperfect. Percent yield is actual divided by theoretical times one hundred. A value above one hundred suggests issues such as moisture, impurities, or an incorrect product assumption. In solution, amount equals molarity times volume in liters; distinguish dilution from a reaction that consumes solute.',
        ],
        [
          'Checking a solution',
          'Verify atom and charge balance, compare product amount against available atoms, and check units at each step. Significant figures should reflect the measured inputs, not exact equation coefficients. If solution volumes are added, account for total volume when calculating final concentration under the additive-volume approximation. State whether the calculation assumes complete reaction, negligible side products, and anhydrous material. These assumptions explain why a calculated maximum can differ from an experiment.',
        ],
      ],
      [
        ['Stoichiometry', 'Quantitative relationships from a balanced equation.'],
        ['Limiting reactant', 'Reactant allowing the smallest reaction extent.'],
        ['Net ionic equation', 'Equation omitting spectator ions.'],
        ['Percent yield', 'Actual yield / theoretical yield × 100%.'],
      ],
      [
        'React 3.0 mol H₂ with 1.0 mol O₂. Find water and leftover hydrogen.',
        [
          'Extents are 3.0/2 = 1.5 and 1.0/1 = 1.0 mol.',
          'Oxygen limits; water amount is 2 × 1.0 = 2.0 mol.',
          'Hydrogen consumed is 2.0 mol, leaving 1.0 mol.',
        ],
        'Compare mole amounts divided by coefficients.',
      ],
      [
        [
          'Which may be changed to balance an equation?',
          'Coefficients',
          ['Chemical subscripts', 'Element identities', 'Atomic numbers'],
          'Formulas must retain substance identity.',
        ],
        [
          'For the example, the limiting reagent is…',
          'O₂',
          ['H₂', 'H₂O', 'Neither reagent'],
          'It permits the smaller reaction extent.',
        ],
        [
          'Actual 8 g versus theoretical 10 g gives…',
          '80% yield',
          ['125% yield', '20% yield', '800% yield'],
          'Use actual/theoretical.',
        ],
      ],
      [
        [
          'Why are coefficients not mass ratios?',
          'Different substances have different molar masses; coefficients count relative mole amounts.',
        ],
        ['Balance Al + O₂ → Al₂O₃.', '4Al + 3O₂ → 2Al₂O₃.'],
        [
          'What might explain yield above 100%?',
          'Wet or impure recovered product, weighing error, or a wrong assumed formula.',
        ],
        ['Find moles in 25.0 mL of 0.200 M solute.', '0.0250 L × 0.200 mol/L = 0.00500 mol.'],
      ],
      [
        ['Balance', 'Conserve each element and total charge.'],
        ['Compare', 'Convert reactants to allowed reaction extents.'],
        ['Predict', 'Find product and excess under stated assumptions.'],
      ],
      [
        ['Coefficient', 'Relative amount', 'Not a subscript or mass ratio.'],
        ['Theoretical yield', 'Stoichiometric maximum', 'Assumes the specified reaction.'],
        ['Actual yield', 'Measured recovery', 'Can include recovery and purity effects.'],
      ],
      'Double amount at fixed volume and observe concentration. Explain the additional equation needed to predict a reaction yield.',
      'Stoichiometry connects balanced identities to amounts, not simply to visible changes.',
    ),
    c(
      'Matter, gas laws, and atmospheric chemistry',
      [
        'Use absolute temperature in gas relations.',
        'Explain phase changes with particle models.',
        'Distinguish greenhouse warming from ozone depletion.',
      ],
      [
        [
          'Particle motion',
          'The ideal-gas model treats particles as negligible in volume with no intermolecular attraction except during elastic collisions. Pressure results from momentum transfer to container walls, and average translational kinetic energy depends on absolute temperature. At equal temperature, lighter molecules have greater typical speeds, not greater average translational energy. Real gases deviate especially when particles are crowded or attractions matter near condensation. Identify these assumptions before using the model quantitatively.',
        ],
        [
          'Gas relationships',
          'PV = nRT relates equilibrium pressure, volume, amount, and Kelvin temperature. Boyle’s inverse pressure–volume relation holds at fixed amount and temperature; Charles’s volume–temperature relation holds at fixed pressure and amount. A combined gas-law calculation requires the same sample amount. Match the gas constant to pressure and volume units. Celsius zero is not zero thermal motion, so substituting Celsius into a temperature ratio produces a physically incorrect result.',
        ],
        [
          'Mixtures and atmospheres',
          'For an ideal nonreacting gas mixture, total pressure is the sum of partial pressures. Each partial pressure equals mole fraction times total pressure. A gas collected over water includes water vapor, so dry-gas pressure requires subtraction of the vapor contribution at the measured temperature. Atmospheric pressure changes with altitude, weather, and local conditions. A quoted standard condition is a definition that must be stated; do not silently interchange different standard temperatures or pressures.',
        ],
        [
          'Condensed phases',
          'Liquids and solids have particles close enough that intermolecular interactions strongly affect behavior. Melting, vaporization, freezing, and condensation change phase without necessarily changing molecular identity. During an ideal equilibrium phase transition at fixed pressure, supplied energy can change phase fraction while temperature stays constant. A phase diagram maps stable phases against pressure and temperature, whereas a heating curve follows energy input along one path. Distinguish those different axes.',
        ],
        [
          'Two atmospheric mechanisms',
          'Greenhouse gases absorb and emit infrared radiation, influencing Earth’s energy balance. Stratospheric ozone absorbs much incoming ultraviolet radiation. Ozone depletion and greenhouse warming are therefore different mechanisms, even though some substances influence both. Avoid explaining the greenhouse effect as a literal sealed glass container or a hole that directly lets heat enter. Use wavelength, altitude, and chemical process to distinguish each phenomenon and the relevant observations.',
        ],
        [
          'Interpreting a gas experiment',
          'A virtual piston separates changes in pressure, temperature, and amount; real apparatus also has leaks, friction, water vapor, and instrument uncertainty. Record which variable is held constant before predicting a curve. Plot pressure against inverse volume to test ideal Boyle behavior rather than claiming any smooth curve is proof. Repeated measurements and residuals reveal departures from the model. No pressurized or heated physical apparatus should be improvised from this simulation.',
        ],
      ],
      [
        ['Ideal gas', 'Model with negligible particle volume and attractions.'],
        ['Partial pressure', 'Pressure contribution of one component.'],
        ['Kelvin', 'Absolute temperature scale.'],
        ['Phase diagram', 'Map of stable phase against thermodynamic variables.'],
      ],
      [
        'A fixed sample expands from 2.0 L to 4.0 L isothermally at initial 100 kPa. Find final pressure.',
        ['Hold n and T fixed.', 'Apply P₁V₁ = P₂V₂.', 'P₂ = 100 × 2.0/4.0 = 50 kPa.'],
        'Doubling volume halves ideal-gas pressure.',
      ],
      [
        [
          'Temperature ratios in gas laws use…',
          'Kelvin',
          ['Celsius', 'Fahrenheit', 'An arbitrary zero'],
          'An absolute scale is required.',
        ],
        [
          'At equal T, gases share average…',
          'Translational kinetic energy',
          ['Molecular speed', 'Molar mass', 'Density'],
          'Mass affects speed at fixed energy.',
        ],
        [
          'Ozone mainly shields incoming…',
          'Ultraviolet radiation',
          ['Ocean tides', 'All infrared radiation', 'Sound waves'],
          'Stratospheric ozone absorbs UV.',
        ],
      ],
      [
        [
          'When does the ideal model often fail?',
          'At high density or near condensation, when finite volume and attractions matter.',
        ],
        [
          'Explain gas collected over water.',
          'Measured total pressure includes water vapor; subtract its equilibrium partial pressure for dry gas.',
        ],
        [
          'Distinguish a heating curve and phase diagram.',
          'One plots temperature against energy or time along a path; the other maps phases against pressure and temperature.',
        ],
        [
          'What makes a Boyle-law test controlled?',
          'Keep amount and temperature fixed while varying volume and measuring pressure.',
        ],
      ],
      [
        ['Define', 'Fix amount, temperature, and pressure units.'],
        ['Vary', 'Move one gas variable under a specified constraint.'],
        ['Evaluate', 'Compare measured or modeled pressure with PV = nRT.'],
      ],
      [
        ['Boyle', 'P inversely proportional to V', 'Requires constant n and T.'],
        ['Charles', 'V proportional to T', 'Requires constant n and P.'],
        [
          'Atmospheric mechanisms',
          'Different wavelengths and chemistry',
          'Ozone loss is not identical to greenhouse warming.',
        ],
      ],
      'In the gas mode, double volume isothermally, then switch to isobaric expansion. Compare pressure and heat transfer.',
      'Gas-law predictions are statements about controlled paths and absolute temperature.',
    ),
    c(
      'Equilibrium, solubility, and steady state',
      [
        'Compare reaction quotient with equilibrium constant.',
        'Predict perturbations without changing K arbitrarily.',
        'Distinguish equilibrium from steady state.',
      ],
      [
        [
          'Dynamic equilibrium',
          'At chemical equilibrium, forward and reverse reaction rates are equal, so macroscopic composition is constant. Particles continue reacting; equal rates do not require equal concentrations. Equilibrium can be approached from either direction under the same conditions. A closed reacting system is a useful starting model, while flowing or externally driven systems may maintain constant composition for other reasons. Identify the system boundary before interpreting an unchanged concentration as equilibrium evidence.',
        ],
        [
          'Writing expressions',
          'For aA + bB ⇌ cC + dD, the reaction quotient uses product activities raised to their coefficients divided by reactant activities raised to theirs. Introductory concentration expressions approximate activities for suitable dilute solutions. Pure solids and liquids have effectively constant activities and are omitted from the simplified expression. K is the quotient at equilibrium at a specified temperature. Changing the written reaction by reversing or multiplying coefficients changes the corresponding K expression.',
        ],
        [
          'Direction from Q',
          'Compare Q with K for the same reaction and temperature. If Q is smaller, net forward reaction raises the quotient; if Q is larger, net reverse reaction lowers it. At Q = K the system is at equilibrium within the model. Adding a catalyst changes how quickly equilibrium is approached but does not change K or the final equilibrium composition. Temperature can change K because it changes the relative thermodynamic favorability of reactants and products.',
        ],
        [
          'Perturbations',
          'Le Châtelier’s principle summarizes responses that partially oppose a disturbance, but the quotient provides a more precise calculation. Adding a reactant initially changes Q, not K at unchanged temperature. Compressing a gas mixture can favor the side with fewer gas moles, with exceptions and constraints that must be stated. Adding inert gas at constant volume does not change reacting ideal-gas partial pressures. Constant-pressure addition is a different experiment and may change volume.',
        ],
        [
          'Solubility equilibrium',
          'A sparingly soluble solid establishes an ion-activity product when equilibrated with solution. For CaF₂, the simplified Ksp expression is [Ca²⁺][F⁻]². If solubility is s in otherwise pure water, concentrations are s and 2s, giving Ksp = 4s³ under ideal dilute assumptions. Common ions, pH, and complex formation can alter solubility. Do not use one universal square-root formula for salts with different stoichiometries.',
        ],
        [
          'Steady-state approximation',
          'A reaction intermediate can remain at nearly constant low concentration when its formation and consumption rates nearly balance. This steady-state approximation helps derive rate laws for mechanisms, but it does not imply all reactions are at thermodynamic equilibrium. Matter and energy may flow continuously through a steady system. Check the timescale over which the approximation applies, especially during startup or depletion. Constant concentration alone does not identify the underlying mechanism.',
        ],
      ],
      [
        ['Equilibrium constant', 'Reaction quotient at equilibrium at a specified temperature.'],
        ['Reaction quotient', 'Activity ratio for the current composition.'],
        ['Ksp', 'Solubility-product equilibrium constant.'],
        ['Steady state', 'Approximately constant state that can include continuing flux.'],
      ],
      [
        'For CaF₂, s = 2.0 × 10⁻⁴ M in ideal pure water. Estimate Ksp.',
        [
          'Write CaF₂(s) ⇌ Ca²⁺ + 2F⁻.',
          'Use [Ca²⁺] = s and [F⁻] = 2s.',
          'Ksp = s(2s)² = 4s³ = 3.2 × 10⁻¹¹.',
        ],
        'The coefficient on fluoride changes both concentration and exponent.',
      ],
      [
        [
          'If Q < K, net reaction proceeds…',
          'Forward',
          ['Backward', 'Nowhere', 'Only with a catalyst'],
          'Product formation raises Q.',
        ],
        [
          'At fixed temperature a catalyst changes…',
          'Approach rate',
          ['K itself', 'Equilibrium atom counts', 'Product identity necessarily'],
          'It accelerates both directions.',
        ],
        [
          'Equilibrium requires equal…',
          'Forward and reverse rates',
          ['All concentrations', 'Reactant masses', 'Gas coefficients'],
          'Dynamic rates balance.',
        ],
      ],
      [
        [
          'Why omit a pure solid in a simple K expression?',
          'Its activity is effectively constant while the phase is present.',
        ],
        [
          'Why is steady state not necessarily equilibrium?',
          'Constant concentrations can be maintained by unequal thermodynamic driving forces and continuous flows.',
        ],
        [
          'How does a common ion affect simple dissolution?',
          'It raises the ion quotient and often reduces additional dissolution under the stated model.',
        ],
        [
          'Does adding reactant change K?',
          'Not at unchanged temperature for the same reaction; it changes Q first.',
        ],
      ],
      [
        ['Write', 'Define the reaction and activities.'],
        ['Compare', 'Evaluate Q relative to K.'],
        ['Relax', 'Follow net reaction toward equilibrium.'],
      ],
      [
        ['Equilibrium', 'Equal opposing rates', 'Concentrations need not be equal.'],
        ['Catalyst', 'Lowers kinetic barriers', 'Does not change equilibrium K.'],
        [
          'Steady state',
          'Formation and consumption may balance',
          'Does not establish thermodynamic equilibrium.',
        ],
      ],
      'Change acid amount and volume. Distinguish a concentration change from a change in an equilibrium constant.',
      'Equilibrium is a relationship among activities at a given temperature, not a stopped reaction.',
    ),
    c(
      'Acids, bases, buffers, and titration',
      [
        'Separate strength from concentration.',
        'Calculate strong-acid titration with charge balance.',
        'Explain buffers and equivalence points.',
      ],
      [
        [
          'Definitions and conjugates',
          'A Brønsted acid donates a proton and a Brønsted base accepts one. Conjugate partners differ by one proton. A Lewis base donates an electron pair and a Lewis acid accepts one, encompassing reactions that need no proton transfer. Water can act as either acid or base depending on its partner. Write the actual reaction before labeling species: a substance’s role depends on context rather than its name alone.',
        ],
        [
          'Strength and concentration',
          'Strength describes extent of ionization in the specified solvent and conditions; concentration describes amount per volume. A dilute strong acid and concentrated weak acid are different comparisons. Ka describes acid dissociation equilibrium, while pKa is minus its base-ten logarithm. Larger Ka means stronger acid in the same context. Introductory pH approximates minus log of hydronium molarity, though rigorous pH uses activity. Very dilute solutions require accounting for water autoionization.',
        ],
        [
          'Water and salt solutions',
          'At approximately 25 °C, Kw is about 1.0 × 10⁻¹⁴ and pH + pOH is approximately 14 under ideal dilute assumptions. Neutrality means equal hydronium and hydroxide activities, not a temperature-independent pH of seven. Ions from weak acids or bases can hydrolyze and change solution pH; not every salt is neutral. Recognize conjugate partners and compare their relevant equilibria before predicting whether a salt solution is acidic or basic.',
        ],
        [
          'Buffer mechanism',
          'A buffer contains appreciable weak acid and conjugate base, or the corresponding base system. Added strong acid consumes the conjugate base; added strong base consumes the weak acid. First perform stoichiometric neutralization, then apply equilibrium reasoning. Henderson–Hasselbalch approximates pH = pKa + log([base]/[acid]) when its assumptions are suitable. Equal conjugate amounts give pH near pKa. Dilution can preserve this ratio while reducing capacity; buffers do not neutralize unlimited additions.',
        ],
        [
          'Following a titration',
          'Equivalence is the stoichiometric amount required by the reaction; an indicator endpoint is an observed color change near a chosen condition. They need not coincide exactly. For strong monoprotic acid and strong base, calculate excess equivalents and divide by total volume, including water autoionization near equivalence. For weak acid titration, buffer, equivalence, and excess-base regions require different reasoning. A weak-acid/strong-base equivalence point is generally basic, not automatically neutral.',
        ],
        [
          'Using the virtual curve',
          'The lab fixes 25.0 mL of 0.100 M strong monoprotic acid and lets you vary base concentration and volume. Its ideal 25 °C calculation accounts for water autoionization so it remains finite at equivalence. The plotted curve is specific to those assumptions, not an all-purpose weak-acid curve. Read the axes and compare mole amounts rather than treating the steepest screen segment as the definition of equivalence. Record predictions before crossing the equivalence volume.',
        ],
      ],
      [
        ['Conjugate pair', 'Species differing by one proton.'],
        ['Buffer capacity', 'Amount of added acid or base a buffer can accommodate.'],
        ['Equivalence point', 'Stoichiometric completion point in a titration.'],
        ['Endpoint', 'Observed indicator or instrument criterion.'],
      ],
      [
        'Titrate 25.0 mL 0.100 M HCl with 0.100 M NaOH. Find equivalence volume and ideal pH at 30.0 mL base.',
        [
          'Acid amount is 2.50 mmol; equivalence needs 25.0 mL base.',
          'At 30.0 mL, excess OH⁻ is 0.500 mmol in 55.0 mL.',
          '[OH⁻] ≈ 0.00909 M; pOH ≈ 2.04, pH ≈ 11.96 at 25 °C.',
        ],
        'Use total solution volume after reaction.',
      ],
      [
        [
          'Strong versus weak primarily describes…',
          'Extent of ionization',
          ['Bottle volume', 'Concentration alone', 'Color'],
          'Strength and concentration differ.',
        ],
        [
          'A buffer with equal HA and A⁻ has pH near…',
          'pKa',
          ['Always zero', 'Always fourteen', 'Twice pKa'],
          'The logarithm of unity is zero.',
        ],
        [
          'Equivalence is defined by…',
          'Reaction stoichiometry',
          ['Any color change', 'Maximum volume', 'All salts having pH seven'],
          'Endpoint is observational.',
        ],
      ],
      [
        [
          'Why do dilution and capacity differ?',
          'The conjugate ratio may remain similar while fewer moles per volume resist added acid or base.',
        ],
        [
          'Why can salt solutions be nonneutral?',
          'Some ions react with water as conjugate acids or bases.',
        ],
        [
          'What is neutral at any temperature?',
          'Equal hydronium and hydroxide activities; the corresponding pH depends on Kw.',
        ],
        [
          'Why add volumes in a titration calculation?',
          'Excess ion concentration uses the entire final solution volume under the additive-volume approximation.',
        ],
      ],
      [
        ['Count', 'Find acid and base equivalents.'],
        ['React', 'Subtract consumed amounts and sum volumes.'],
        ['Equilibrate', 'Find pH using the remaining species and Kw.'],
      ],
      [
        ['Strength', 'Ionization equilibrium', 'Not concentration.'],
        ['Buffer', 'Conjugate reservoir', 'Finite capacity.'],
        [
          'Strong titration model',
          'Excess equivalents plus Kw',
          'Does not model weak-acid dissociation.',
        ],
      ],
      'Record pH at 20, 25, and 30 mL of 0.100 M base. Double base concentration and predict the new equivalence volume.',
      'Perform reaction stoichiometry before selecting the pH equation.',
    ),
    c(
      'Thermochemistry, entropy, and free energy',
      [
        'Apply a consistent heat and work convention.',
        'Relate calorimetry to enthalpy.',
        'Distinguish thermodynamic favorability from reaction speed.',
      ],
      [
        [
          'System boundaries',
          'Choose the reacting system and label the surroundings before assigning signs. Heat is energy transfer caused by temperature difference; work transfers energy through other organized mechanisms. In the chemistry convention, ΔU = q + w, with positive work done on the system. Expansion against external pressure gives negative pressure–volume work. Temperature is a state variable, whereas heat depends on the process. A hot small sample need not contain more transferable thermal energy than a cooler large sample.',
        ],
        [
          'Calorimetric reasoning',
          'For sensible heating with approximately constant specific heat, q = mcΔT. A simple insulated calorimeter balances heat gained and lost by sample, water, and container, plus any phase-change contribution. Neglecting the calorimeter’s heat capacity or heat exchange with the room can bias inferred reaction energy. Distinguish the heat measured by the surroundings from the reaction heat; they have opposite signs only under an appropriate energy balance. Report the assumptions with the result.',
        ],
        [
          'Enthalpy and Hess’s law',
          'Enthalpy H = U + PV is a state function. At constant pressure with only pressure–volume work, heat equals the enthalpy change. Hess’s law allows summing reaction enthalpies along alternative paths connecting the same initial and final states. Reverse a reaction and reverse its enthalpy sign; multiply coefficients and multiply the enthalpy. Include phases because liquid and gaseous products differ in enthalpy. Standard formation data require a consistent reference state.',
        ],
        [
          'Entropy and multiplicity',
          'Entropy relates to the number and distribution of accessible microscopic states. Dispersion of energy and mixing can increase entropy, but simple disorder analogies are incomplete. A system’s entropy can decrease while the surroundings increase by more. For a reversible isothermal heat transfer, ΔS = qrev/T with temperature in Kelvin. Spontaneous processes satisfy nondecreasing total entropy of system plus surroundings, not necessarily increasing entropy of the system alone.',
        ],
        [
          'Free energy',
          'At constant temperature and pressure, ΔG = ΔH − TΔS helps judge thermodynamic direction under the stated conditions. Negative ΔG favors the forward process; equilibrium has zero reaction Gibbs change. Standard ΔG and actual ΔG differ when activities differ from standard conditions. A favorable reaction can remain slow because of a large activation barrier. Catalysts alter kinetics rather than making an unfavorable equilibrium favorable. Convert entropy units to match enthalpy before multiplying by temperature.',
        ],
        [
          'Quantitative checks',
          'Keep energy per mole separate from energy for the actual sample. An exothermic reaction has negative system enthalpy change under the stated convention, even if the surrounding water warms. Estimate whether mcΔT is plausible before reporting precision. The virtual gas model uses work by the gas, the physics convention, and labels it explicitly; translate its ΔU = Q − Wby into chemistry’s w = −Wby. Consistent sign definitions make the conventions agree.',
        ],
      ],
      [
        ['Enthalpy', 'State function H = U + PV.'],
        ['Entropy', 'State function linked to accessible microscopic states.'],
        ['Gibbs energy', 'G = H − TS.'],
        ['Hess’s law', 'Reaction enthalpies add for paths with identical endpoints.'],
      ],
      [
        'At 300 K, ΔH = −20 kJ/mol and ΔS = −50 J/(mol K). Find ΔG.',
        [
          'Convert entropy to −0.050 kJ/(mol K).',
          'Compute TΔS = −15 kJ/mol.',
          'ΔG = −20 − (−15) = −5 kJ/mol.',
        ],
        'Forward favorability at these conditions does not determine reaction speed.',
      ],
      [
        [
          'Exothermic system enthalpy change is…',
          'Negative',
          ['Always zero', 'Positive', 'Equal to temperature'],
          'Heat leaves the system at constant pressure.',
        ],
        [
          'A catalyst primarily changes…',
          'Reaction rate',
          ['Endpoint ΔG', 'Atom conservation', 'Equilibrium enthalpy'],
          'It changes activation pathways.',
        ],
        [
          'Hess’s law relies on enthalpy being…',
          'A state function',
          ['A path length', 'Always positive', 'An instrument reading only'],
          'Only endpoints determine the change.',
        ],
      ],
      [
        ['Why convert entropy units?', 'TΔS and ΔH must have matching energy-per-mole units.'],
        [
          'Can system entropy decrease spontaneously?',
          'Yes, if the surroundings increase enough that total entropy does not decrease.',
        ],
        [
          'Explain calorimeter versus reaction signs.',
          'If heat exchange is confined to them, heat gained by one is lost by the other.',
        ],
        [
          'Translate gas work conventions.',
          'Work done on the system is the negative of work done by it, so ΔU = q + w = Q − Wby.',
        ],
      ],
      [
        ['Define', 'Choose the system and signs.'],
        ['Balance', 'Account for heat, work, and state changes.'],
        ['Interpret', 'Separate energy, entropy, equilibrium, and speed.'],
      ],
      [
        ['Heat', 'Energy crossing a boundary', 'Not a stored state property.'],
        ['Enthalpy', 'State function', 'Equals heat only under suitable conditions.'],
        ['Favorability', 'Thermodynamic direction', 'Does not specify reaction rate.'],
      ],
      'In the gas lab compare isochoric and isothermal expansion. Translate work-by-gas into the chemistry work convention.',
      'Thermochemical signs are meaningful only with a defined system and convention.',
    ),
    c(
      'Kinetics, rate laws, mechanisms, and activation energy',
      [
        'Determine rate orders from evidence.',
        'Recognize integrated-law plots and half-lives.',
        'Separate mechanism claims from overall equations.',
      ],
      [
        [
          'Defining a rate',
          'Reaction rate describes concentration change per time, with signs and stoichiometric normalization chosen consistently. A reactant disappearance rate is positive after applying the minus sign. Average rate over an interval differs from instantaneous rate at one moment. Temperature, concentration, catalysts, surface area, and mixing can influence observed rates. If a measurement depends on diffusion or heat transfer, it may not directly reveal the intrinsic chemical rate law.',
        ],
        [
          'Experimental rate laws',
          'A rate law such as rate = k[A]ᵐ[B]ⁿ is normally established experimentally. The overall balanced equation does not generally supply exponents unless the step is elementary. Compare trials that change one concentration while holding the others and temperature fixed. Doubling A with a fourfold rate increase suggests second order in A in that tested regime. The units of k depend on total order, so a rate constant without units is incomplete.',
        ],
        [
          'Integrated relationships',
          'For a single-reactant zero-order model, concentration falls linearly with time; for first order, ln concentration is linear; for second order, inverse concentration is linear under the common rate = k[A]² convention. Check model definitions and residuals instead of judging straightness by eye alone. First-order half-life is ln2/k and independent of starting concentration. Other orders have concentration-dependent half-lives. Integrated laws require the relevant conditions to remain unchanged.',
        ],
        [
          'Activation and temperature',
          'Arrhenius behavior approximates k = A exp(−Ea/RT) over an appropriate temperature range. A plot of ln k against 1/T has slope −Ea/R when the model applies. Use Kelvin and compatible energy units. Raising temperature often increases rate by increasing the fraction of sufficiently energetic collisions, but complex systems may deviate. Activation energy describes a kinetic barrier and is not the same as reaction enthalpy or Gibbs energy change.',
        ],
        [
          'Mechanistic reasoning',
          'A mechanism proposes elementary steps whose sum gives the overall reaction. Intermediates form and are consumed; catalysts are consumed and regenerated. A plausible mechanism must reproduce the observed rate law, not merely balance atoms. A slow-step argument may require accounting for pre-equilibria or intermediate concentrations. Several mechanisms can fit limited data, so a rate law alone rarely proves a unique microscopic pathway. Seek additional evidence or predicted changes under new conditions.',
        ],
        [
          'Designing rate measurements',
          'Use a calibrated observable related to concentration, such as absorbance in its linear regime or gas volume under controlled conditions. Keep sampling intervals, mixing, temperature, and initial concentrations documented. A changing color can indicate progress but does not automatically equal a numerical rate. Plot raw data and transformed data, record uncertainty, and test an independent trial. Distinguish reproducible instrument drift from chemical kinetics before interpreting a fitted slope.',
        ],
      ],
      [
        ['Rate law', 'Empirical relation between rate and concentrations.'],
        ['Order', 'Concentration exponent in a rate law.'],
        ['Half-life', 'Time required for concentration to halve under a model.'],
        ['Activation energy', 'Energy parameter controlling temperature dependence of a rate.'],
      ],
      [
        'A first-order reaction has k = 0.0200 s⁻¹. Find half-life and fraction remaining after two half-lives.',
        [
          'Use t½ = ln2/k.',
          't½ = 0.6931/0.0200 = 34.7 s.',
          'Two halvings leave (1/2)² = 0.25 of the starting amount.',
        ],
        'The half-life is constant only for this first-order model.',
      ],
      [
        [
          'Doubling [A] quadruples rate at fixed other conditions. Order in A is…',
          'Two',
          ['Zero', 'One', 'Four'],
          '2 raised to the second power is four.',
        ],
        [
          'A first-order linear plot uses…',
          'ln[A] versus time',
          ['[A]² versus time', 'Rate versus mass only', 'Temperature versus volume'],
          'The slope is −k.',
        ],
        [
          'Overall coefficients always give rate orders?',
          'No',
          ['Yes for every reaction', 'Only when products are gases', 'Only at equilibrium'],
          'Orders need evidence or an elementary-step justification.',
        ],
      ],
      [
        ['Why include units on k?', 'Its dimensions depend on total reaction order.'],
        [
          'Distinguish intermediate and catalyst.',
          'An intermediate is formed then consumed; a catalyst is consumed then regenerated and is present as a participant initially.',
        ],
        [
          'What does an Arrhenius slope imply?',
          'Under the model, Ea = −R times the ln k versus 1/T slope.',
        ],
        [
          'Design a control for colorimetric drift.',
          'Measure a suitable blank or stable reference over the same time and temperature conditions.',
        ],
      ],
      [
        ['Measure', 'Collect concentration-linked observations versus time.'],
        ['Fit', 'Test rate-law forms and units.'],
        ['Challenge', 'Predict new trials and examine alternative mechanisms.'],
      ],
      [
        [
          'Rate law',
          'Observed concentration dependence',
          'Not generally read from the overall equation.',
        ],
        [
          'Integrated law',
          'Concentration through time',
          'Requires the assumed order and conditions.',
        ],
        ['Mechanism', 'Elementary pathway proposal', 'Needs independent kinetic support.'],
      ],
      'Use the first-order decay mode. Double k and compare the half-life and amount remaining at a fixed time.',
      'Kinetic evidence describes how fast and by what plausible pathway, not the equilibrium endpoint.',
    ),
    c(
      'Enzyme saturation and Michaelis–Menten reasoning',
      [
        'Interpret Vmax and Km.',
        'Recognize saturation and model assumptions.',
        'Connect enzyme data to mechanism limits.',
      ],
      [
        [
          'Catalytic proteins',
          'Many enzymes are proteins that stabilize reaction pathways with lower activation barriers. They do not alter the equilibrium free-energy difference between substrate and product. Binding brings reactants into a favorable environment, but catalysis can involve multiple chemical and conformational steps. A substrate-binding diagram is a simplified representation, not evidence that every enzyme behaves as one rigid lock and key. Enzyme amount, integrity, cofactors, and solution conditions influence measured activity.',
        ],
        [
          'The minimal scheme',
          'A common teaching mechanism is E + S ⇌ ES → E + P. Under suitable initial-rate, substrate-excess, and steady-state assumptions, v = Vmax[S]/(Km + [S]). Product accumulation and reverse reaction are neglected in that basic initial-rate model. Vmax depends on active enzyme amount, while Km combines kinetic constants and is not generally identical to a pure binding dissociation constant. State these assumptions before interpreting fitted parameters.',
        ],
        [
          'Reading saturation',
          'At substrate concentration much smaller than Km, rate is approximately proportional to substrate concentration. At concentration equal to Km, rate is half Vmax. At concentration much larger than Km, most catalytic capacity is occupied and rate approaches Vmax. Increasing substrate cannot raise the modeled rate indefinitely. A hyperbolic curve suggests saturation but does not uniquely prove the minimal mechanism; transport limitations or other processes can produce related patterns.',
        ],
        [
          'Enzyme concentration',
          'With unchanged active fraction and catalytic turnover, doubling total active enzyme doubles Vmax. It does not necessarily change Km in the simple model. Denaturation, inhibitors, or missing cofactors can change active enzyme fraction without changing total measured protein mass. Compare rates per defined enzyme amount when appropriate. A failed high-substrate assay might reflect substrate inhibition, pH change, or detection limits rather than a simple saturation law.',
        ],
        [
          'Collecting interpretable data',
          'Measure initial slopes before substantial substrate depletion or product buildup. Include a blank and concentration calibration for the optical or chemical signal. Use substrate levels below, around, and above the estimated Km; a narrow range far below saturation cannot determine Vmax well. Fit the original rate–concentration relationship with appropriate error reasoning. Reciprocal plots can magnify low-concentration measurement errors and should not be treated as automatically superior evidence.',
        ],
        [
          'Applications and limits',
          'Enzyme assays connect molecular function to food processing, metabolism, and biotechnology. Predictions must remain within validated temperature, pH, and substrate ranges. A classroom saturation model cannot establish a treatment dose or a patient diagnosis. Use the lab to separate effects of maximum catalytic capacity from changes in substrate availability. Record what parameter was varied, what data would estimate it, and one alternative explanation for a similar-looking curve.',
        ],
      ],
      [
        ['Vmax', 'Maximum rate approached in the saturation model.'],
        ['Km', 'Substrate concentration giving half Vmax in the basic model.'],
        ['Initial rate', 'Early reaction slope before substantial composition change.'],
        ['Steady-state ES', 'Approximate balance of complex formation and consumption.'],
      ],
      [
        'For Vmax = 10 μmol/min and Km = 2 mM, calculate rates at 2 and 8 mM substrate.',
        [
          'At 2 mM, v = 10 × 2/(2+2) = 5 μmol/min.',
          'At 8 mM, v = 10 × 8/(2+8) = 8 μmol/min.',
          'A fourfold substrate increase gives only a 1.6-fold rate increase here.',
        ],
        'Saturation produces diminishing rate gains.',
      ],
      [
        [
          'At [S] = Km the rate is…',
          'Vmax/2',
          ['Vmax', '2Vmax', 'Zero'],
          'Substitute equal terms in the denominator.',
        ],
        [
          'Doubling active enzyme typically doubles…',
          'Vmax',
          ['Km automatically', 'Equilibrium constant', 'Substrate identity'],
          'Capacity depends on active enzyme amount.',
        ],
        [
          'The basic expression is best applied to…',
          'Suitable initial-rate conditions',
          [
            'Any late reaction mixture',
            'All cooperative enzymes exactly',
            'Every inhibitor mechanism unchanged',
          ],
          'Its assumptions restrict use.',
        ],
      ],
      [
        [
          'Why is Km not always binding affinity?',
          'It combines binding and catalytic rate constants in the simple mechanism.',
        ],
        [
          'Why sample above and below Km?',
          'Both the low-concentration slope and saturation region constrain parameter estimates.',
        ],
        [
          'How can a blank help?',
          'It reveals signal changes unrelated to enzyme-catalyzed product formation.',
        ],
        [
          'Give a model limitation.',
          'Cooperativity, inhibition, depletion, reverse reaction, or denaturation can violate basic assumptions.',
        ],
      ],
      [
        ['Bind', 'Substrate and enzyme form a complex.'],
        ['Turn over', 'Complex produces product and regenerates enzyme.'],
        ['Saturate', 'Finite active capacity limits high-substrate rate.'],
      ],
      [
        ['Low substrate', 'Nearly linear response', 'Cannot alone constrain Vmax well.'],
        ['At Km', 'Half-maximal rate', 'Not a universal binding constant.'],
        ['High substrate', 'Approaches capacity', 'Other mechanisms may violate the model.'],
      ],
      'Use saturation mode to compare [S] = Km and [S] = 4Km. Then double Vmax without changing Km.',
      'Enzyme parameters have meaning only under the kinetic model and assay conditions.',
      true,
    ),
  ],
});
