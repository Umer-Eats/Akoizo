import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const thermodynamicsLessons = buildCourse({
  eventId: 'thermodynamics',
  eventName: 'Thermodynamics',
  prefix: 'therm',
  lab: 'thermodynamics',
  syllabus: 'Thermodynamics B_C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Ten units develop systems, heat transfer, phases, calorimetry, gases, processes, energy conservation, entropy, cycles, and historical evidence. Equations use Kelvin and a declared work-by-system convention. Interactive curves are idealized teaching paths rather than predictions for a physical competition device.',
  references: [
    {
      title: 'OpenStax University Physics Volume 2',
      url: 'https://openstax.org/books/university-physics-volume-2/pages/1-introduction',
    },
    {
      title: 'OpenStax: Carnot cycle',
      url: 'https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle',
    },
  ],
  chapters: [
    c(
      'Systems, temperature, and thermal equilibrium',
      [
        'Define thermodynamic boundaries.',
        'Distinguish heat from temperature.',
        'Use absolute temperature scales.',
      ],
      [
        [
          'System boundaries',
          'A thermodynamic system is the chosen material or region under study; everything else is surroundings. Open systems exchange matter and energy, closed systems exchange energy but not matter, and ideal isolated systems exchange neither. A boundary can move or remain fixed. Classification depends on the interval and what transfers are allowed. A sealed container is not automatically isolated because heat can still cross its walls.',
        ],
        [
          'State variables',
          'Pressure, volume, temperature, amount, and internal energy describe equilibrium states within suitable models. Extensive quantities scale with system size, while intensive quantities such as temperature do not simply add when samples combine. A state description does not specify the path used to reach it. Two systems can share temperature while containing different amounts of matter and different internal energy. Avoid using one variable as a substitute for another.',
        ],
        [
          'Heat and temperature',
          'Temperature characterizes thermal equilibrium and connects to statistical energy distributions. Heat is energy crossing a boundary because of a temperature difference; it is not a substance stored inside an object. Internal energy is a state property. A large cool sample can transfer more total energy than a tiny hot one under a specified process. State mass, heat capacity, and endpoints before comparing heat quantities.',
        ],
        [
          'Zeroth law',
          'If two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with one another. This supports consistent temperature measurement. Equilibrium means no net thermal driving difference, not absence of molecular motion. A thermometer must interact with the sample and can perturb a small system. Calibration, response time, and thermal contact influence whether a reading represents the intended temperature.',
        ],
        [
          'Scales',
          'Kelvin temperature equals Celsius temperature plus 273.15. Temperature differences have the same numerical size in Kelvin and Celsius, while ratios require an absolute scale. Fahrenheit conversion uses a different step size and offset. Absolute zero is the lower thermodynamic reference, not an ordinary reachable endpoint in a classroom experiment. Gas laws, radiation, entropy, and Carnot equations require Kelvin rather than Celsius substitution.',
        ],
        [
          'Model preparation',
          'The lab begins with one mole of ideal monatomic gas at 300 K and a specified initial volume. Its boundary is a conceptual piston for expansion paths. Identify matter exchange, heat transfer, and work before moving a control. An insulated path and a constant-temperature path impose different constraints. Record the system and sign convention with every trial so that numerical comparisons retain physical meaning.',
        ],
      ],
      [
        ['Open system', 'Exchanges matter and energy.'],
        ['Internal energy', 'State property of microscopic energy.'],
        ['Heat', 'Energy transfer driven by temperature difference.'],
        ['Zeroth law', 'Transitive thermal-equilibrium principle.'],
      ],
      [
        'Convert 27 °C to Kelvin and compare a 10 °C temperature change.',
        [
          'T = 27 + 273.15 = 300.15 K.',
          'A change of 10 °C equals a change of 10 K.',
          'A ratio must use absolute temperatures, not Celsius numbers.',
        ],
        'Offsets affect values but not Celsius/Kelvin differences.',
      ],
      [
        [
          'A sealed conducting container is necessarily…',
          'Closed, not necessarily isolated',
          ['Always isolated', 'Always open to matter', 'Without internal energy'],
          'Heat can cross a sealed wall.',
        ],
        [
          'Heat is…',
          'Boundary energy transfer',
          ['A stored substance', 'Identical to temperature', 'Only mechanical work'],
          'It is process-dependent.',
        ],
        [
          'Gas-law ratios require…',
          'Kelvin',
          ['Celsius', 'Fahrenheit', 'An arbitrary zero'],
          'Use absolute temperature.',
        ],
      ],
      [
        ['Why define a boundary?', 'It determines which matter and energy transfers count.'],
        [
          'Can equal-temperature samples have different U?',
          'Yes; amount, phase, and composition also matter.',
        ],
        ['What does thermal equilibrium not mean?', 'It does not mean molecules stop moving.'],
        [
          'Why can a thermometer perturb a sample?',
          'It exchanges energy and may be significant relative to a small sample.',
        ],
      ],
      [
        ['Define', 'Choose material and boundary.'],
        ['Describe', 'Specify equilibrium state variables.'],
        ['Constrain', 'Declare permitted heat and work transfers.'],
      ],
      [
        ['Temperature', 'Intensive state variable', 'Not heat.'],
        ['Heat', 'Process transfer', 'Not stored content.'],
        ['Isolation', 'No boundary exchange', 'Idealization needing justification.'],
      ],
      'Compare the gas lab’s isothermal and adiabatic constraints before changing volume. State which allows heat transfer.',
      'Thermodynamic statements become clear only after the system and process constraints are defined.',
    ),
    c(
      'Conduction, convection, radiation, and heat capacity',
      [
        'Compare transfer mechanisms.',
        'Use heat capacity with units.',
        'Identify model limits for insulation.',
      ],
      [
        [
          'Conduction',
          'Conduction transfers energy through microscopic interactions within matter without requiring bulk material flow. A simple steady slab model gives heat-transfer rate proportional to conductivity, area, and temperature difference and inversely proportional to thickness. Real geometries and changing temperatures require more complete treatment. Thermal conductivity and electrical conductivity are different properties, even when correlated in some materials. A material’s thickness and contact quality matter as well as its name.',
        ],
        [
          'Convection',
          'Convection combines energy transport with bulk fluid motion. Natural convection can arise from buoyancy, while forced convection uses externally driven flow. A simplified rate hAΔT uses an effective coefficient that depends on fluid, geometry, and flow regime. It is not a universal material constant. A lid or air gap can change several transfer paths at once, so an observed cooling change should not automatically be attributed to only one mechanism.',
        ],
        [
          'Radiation',
          'Thermal radiation transfers energy electromagnetically and does not require a material medium. For a graybody exchanging with a large environment, a simplified net rate involves emissivity, area, and the difference of fourth powers of absolute temperatures. Celsius values are invalid in that fourth-power expression. Surface finish and wavelength dependence matter. Reflective appearance in visible light does not alone determine infrared emissivity.',
        ],
        [
          'Heat capacity',
          'Heat capacity C relates energy input to temperature change for a specified process and range. Specific heat c is capacity per mass; molar heat capacity is per mole. For suitable constant c without phase change, Q = mcΔT. Gas heat capacities differ by constraint: constant-pressure heating includes expansion work, while constant-volume heating does not. State which heat capacity a problem provides rather than selecting one from a familiar number.',
        ],
        [
          'Multiple pathways',
          'A cooling object may lose energy by conduction through supports, convection to air, radiation, and evaporation. Insulation can reduce some paths while leaving others. A simple exponential cooling law approximates a regime with effectively constant coefficients and internal temperature uniformity. Its fit does not uniquely identify the physical mechanism. Compare controlled designs and account for changing room conditions and sensor placement.',
        ],
        [
          'Using energy models',
          'The calorimetry mode shows sensible and latent energy rather than a detailed insulation prediction. The gas mode compares process-dependent heat capacity effects. Explain why neither alone predicts the cooling time of a real container. A complete design model would need geometry, material properties, boundary conditions, and validated transfer coefficients. Record an energy balance before selecting a heat-transfer equation.',
        ],
      ],
      [
        ['Conductivity', 'Coefficient for conduction under a model.'],
        ['Convection', 'Energy transport involving bulk fluid motion.'],
        ['Emissivity', 'Radiative emission relative to an ideal blackbody.'],
        ['Specific heat', 'Heat capacity per mass.'],
      ],
      [
        'Heat 0.20 kg water by 10 K with c=4180 J/(kg K), neglecting losses.',
        ['Use Q = mcΔT.', 'Q = 0.20 × 4180 × 10.', 'Q = 8360 J.'],
        'The result is energy, not transfer rate or time.',
      ],
      [
        [
          'Radiation requires matter between objects?',
          'No',
          ['Always', 'Only in a vacuum', 'Only for visible light'],
          'Electromagnetic transfer can cross vacuum.',
        ],
        [
          'Q=mcΔT gives…',
          'Energy',
          ['Power without time', 'A universal cooling rate', 'Pressure'],
          'Its units are joules.',
        ],
        [
          'Convection coefficient h is…',
          'Condition-dependent',
          ['Universal for all air', 'Equal to mass', 'Always zero'],
          'Flow and geometry matter.',
        ],
      ],
      [
        ['Why use Kelvin in radiation?', 'Absolute fourth-power temperatures determine the model.'],
        [
          'Why does insulation not guarantee no cooling?',
          'Other transfer paths and finite resistance remain.',
        ],
        ['Contrast C and c.', 'C is total heat capacity; c is per mass.'],
        [
          'What data predict cooling time?',
          'Energy capacity plus validated transfer paths and boundary conditions.',
        ],
      ],
      [
        ['Gradient', 'Identify a temperature difference.'],
        ['Path', 'Choose conduction, convection, radiation, or several.'],
        ['Balance', 'Connect rate of transfer to energy storage.'],
      ],
      [
        ['Energy', 'Joules', 'Not rate.'],
        ['Rate', 'Watts', 'Needs a transfer model.'],
        ['Capacity', 'J/K', 'Depends on material and constraint.'],
      ],
      'Double mass in the heating model. Compare energy needed for the same state, then explain why this does not by itself determine heating time.',
      'Heat capacity describes storage response; heat-transfer laws describe how quickly energy crosses a boundary.',
    ),
    c(
      'Phases, diagrams, and transition paths',
      [
        'Read phase-diagram axes.',
        'Distinguish phase and heating curves.',
        'Explain triple and critical points.',
      ],
      [
        [
          'States of matter',
          'Solids, liquids, gases, and plasmas describe broad organization and behavior, with many specialized states beyond the introductory picture. Solids resist shape change, liquids flow with relatively fixed volume, and gases expand readily. Plasma includes substantial ionization and collective charged-particle behavior. These categories do not imply one universal molecular arrangement for every substance. Distinguish changes in physical phase from changes in chemical composition.',
        ],
        [
          'Phase diagrams',
          'A pressure–temperature phase diagram maps stable phases under equilibrium assumptions. Boundaries represent coexistence conditions, while crossing a boundary changes the stable phase. Read both axes before interpreting a path. Heating at fixed pressure follows a horizontal or vertical direction depending on axis placement, not a universal screen direction. A diagram is substance-specific; water’s solid–liquid boundary differs from many familiar materials.',
        ],
        [
          'Triple and critical points',
          'At a triple point, three phases coexist under particular conditions. A liquid–gas coexistence curve ends at a critical point beyond which the distinction between liquid and gas changes into a supercritical regime. A critical point is not the same as a melting point or a universal high-temperature limit. Phase labels and boundaries depend on pressure as well as temperature.',
        ],
        [
          'Heating curves',
          'A heating curve plots temperature against supplied energy or time for a specified process. Ideal plateaus reflect latent energy at a phase transition under suitable pressure and equilibrium conditions. If the horizontal axis is time, interpretation also depends on heating power and losses. A sloped temperature segment does not prove constant specific heat across an unlimited range. Distinguish a path experiment from the full phase map.',
        ],
        [
          'Water-specific reasoning',
          'At about one atmosphere, pure water melts near 0 °C and boils near 100 °C under the introductory model. Pressure changes these transition conditions, and dissolved substances can shift them. The lab uses these fixed reference transitions and constant heat capacities. It does not model high-pressure ice forms, supercritical water, or plasma. Treat the diagram as a transparent energy example rather than a complete phase-equilibrium solver.',
        ],
        [
          'Interpreting evidence',
          'Identify initial state, path constraint, transition boundary, and final state. A mixture of phases can absorb energy while temperature stays near a transition, so temperature alone does not determine phase fraction. A physical experiment may show supercooling, delayed nucleation, or gradients. These kinetic effects do not invalidate equilibrium diagrams but limit immediate application. Explain the assumption connecting the observed path to the equilibrium model.',
        ],
      ],
      [
        ['Triple point', 'Three-phase coexistence condition.'],
        ['Critical point', 'Endpoint of liquid–gas coexistence.'],
        ['Latent heat', 'Energy per amount for a phase transition.'],
        ['Heating curve', 'Temperature along a specified energy-input path.'],
      ],
      [
        'During ideal melting at 0 °C, added energy increases what?',
        [
          'Temperature remains at the transition in the model.',
          'Energy converts ice to liquid.',
          'Liquid fraction rises until melting finishes.',
        ],
        'A plateau can contain changing internal state.',
      ],
      [
        [
          'A phase diagram commonly uses…',
          'Pressure and temperature',
          ['Only time and mass', 'Only current and voltage', 'Only energy and color'],
          'Axes define the map.',
        ],
        [
          'Triple and critical points are identical?',
          'No',
          ['Always', 'Only for water', 'Only at zero pressure'],
          'They describe different conditions.',
        ],
        [
          'At a melting plateau, phase fraction can…',
          'Change',
          ['Never change', 'Only become plasma', 'Only decrease under heating'],
          'Latent energy changes phase amount.',
        ],
      ],
      [
        ['Why is pressure important?', 'It changes equilibrium transition conditions.'],
        [
          'Why distinguish time and energy axes?',
          'Time requires knowledge of net heating power to infer energy.',
        ],
        [
          'What does the lab omit?',
          'Pressure-dependent transitions, supercooling, gradients, and complex phase behavior.',
        ],
        [
          'Why can temperature alone be insufficient?',
          'At coexistence, different phase fractions can share the transition temperature.',
        ],
      ],
      [
        ['Locate', 'Identify the state and axes.'],
        ['Follow', 'Apply the specified pressure–temperature or energy path.'],
        ['Transform', 'Track phase fraction and latent energy.'],
      ],
      [
        ['Phase map', 'Equilibrium regions', 'Not a time series.'],
        ['Heating curve', 'One path', 'Power matters if time is plotted.'],
        ['Plateau', 'Coexisting phases', 'State can change at fixed temperature.'],
      ],
      'Move through the melting and boiling plateaus in heating mode. Record energy ranges and phase descriptions.',
      'Phase diagrams and heating curves answer different questions about state and process.',
    ),
    c(
      'Latent heat, heating curves, and calorimetry',
      [
        'Combine sensible and latent energy.',
        'Write an insulated energy balance.',
        'Check final phase before final temperature.',
      ],
      [
        [
          'Sensible energy',
          'Within a single phase over a suitable range, Q = mcΔT approximates energy needed to change temperature. Use the phase-appropriate specific heat and keep units consistent. Ice, liquid water, and vapor have different capacities. The formula does not include a phase transition automatically. If a path crosses a transition, split it into segments rather than inserting one total temperature difference into a single expression.',
        ],
        [
          'Latent energy',
          'A phase transition uses Q = mL for complete conversion under specified conditions. For partial conversion, use the mass transformed. Latent heat values depend on substance and conditions, and melting and vaporization have different values. At an ideal plateau, energy changes phase fraction while temperature remains fixed. Do not treat the plateau as energy-free because its temperature difference is zero.',
        ],
        [
          'Segmented paths',
          'To heat ice below freezing to warm liquid, first warm ice, then melt it, then warm the liquid. Add segment energies with compatible units. For a cooling path, signs reverse relative to the chosen system. A heating curve’s breakpoints are cumulative energies, not independent amounts. Mark the initial reference state so zero input has a defined physical meaning.',
        ],
        [
          'Calorimeter balance',
          'For an ideal insulated combined system, total energy change sums to zero. Heat lost by hotter material equals heat gained by colder material and container, with phase changes included. A guessed final temperature can be inconsistent if insufficient energy exists to melt all ice. Solve the phase regime first, then calculate temperature within that regime. Real experiments also exchange energy with the room and measurement equipment.',
        ],
        [
          'Capacity and losses',
          'A calorimeter constant accounts for the apparatus’s heat capacity under a model. Ignoring it can bias inferred sample heat capacity or reaction energy. Evaporation, splashing, mixing delays, and sensor response introduce additional effects. Report measured initial temperatures and masses rather than assuming them exact. A good result includes uncertainty and an explanation of which omitted terms are plausibly small.',
        ],
        [
          'Virtual curve',
          'The lab starts with ice at −20 °C and tracks energy through melting, liquid warming, vaporization, and a limited vapor-heating range at approximately one atmosphere. Constants are rounded teaching values stated beside the chart. Change mass and compare transition energies; their proportional scaling follows extensive energy. The model does not calculate heating time or losses and should not be interpreted as an experimental apparatus design.',
        ],
      ],
      [
        ['Sensible heat', 'Energy associated with temperature change within a phase.'],
        ['Latent heat', 'Energy per mass for phase conversion.'],
        ['Calorimeter constant', 'Apparatus heat capacity under a model.'],
        ['Energy balance', 'Accounting of all relevant energy changes.'],
      ],
      [
        'Melt 0.10 kg ice at 0 °C using Lf=334 kJ/kg. Find energy.',
        [
          'No initial sensible warming is needed.',
          'Q = mLf = 0.10 × 334 kJ.',
          'Q = 33.4 kJ for complete melting.',
        ],
        'Additional warming requires another segment.',
      ],
      [
        [
          'At a phase transition, use…',
          'mL',
          ['Only mcΔT with zero ΔT', 'Only PV', 'Only temperature ratio'],
          'Latent energy is separate.',
        ],
        [
          'Doubling mass at the same path doubles…',
          'Required energy',
          ['Transition temperature necessarily', 'Specific heat', 'Kelvin offset'],
          'Energy is extensive.',
        ],
        [
          'Before solving final temperature with ice, check…',
          'Whether all ice melts',
          ['Only container color', 'Only elapsed time', 'Only the answer units'],
          'The phase regime determines the equation.',
        ],
      ],
      [
        ['List three stages from cold ice to warm water.', 'Warm ice, melt ice, warm liquid.'],
        ['Why include the container?', 'It absorbs or releases energy through its heat capacity.'],
        [
          'What does an ideal insulated balance assume?',
          'Negligible net energy transfer across the combined boundary.',
        ],
        [
          'Why is a plateau not energy-free?',
          'Energy changes phase fraction even with zero temperature change.',
        ],
      ],
      [
        ['Segment', 'Separate phases and transitions.'],
        ['Calculate', 'Apply mcΔT or mL as appropriate.'],
        ['Sum', 'Check total balance and final phase.'],
      ],
      [
        ['mcΔT', 'Temperature change', 'Requires appropriate c.'],
        ['mL', 'Phase conversion', 'Temperature can remain fixed.'],
        ['Balance', 'Combined energy', 'Includes apparatus if significant.'],
      ],
      'Double mass and identify how melting-start and melting-end energies move. Explain why the plateau temperature stays fixed in this model.',
      'Calorimetry requires tracking both temperature and phase rather than using one equation for every segment.',
    ),
    c(
      'Ideal gases and kinetic molecular theory',
      [
        'Use consistent gas-law units.',
        'Connect temperature and kinetic energy.',
        'Identify ideal-gas limits.',
      ],
      [
        [
          'Macroscopic relation',
          'PV = nRT connects equilibrium variables for an ideal gas. Specify the amount, gas constant, and units before calculating. Pressure must be absolute rather than gauge pressure when using the basic equation. Celsius temperature is invalid in the product. A change in one variable requires stating what is held fixed. An equation of state describes states but does not determine the heat and work of every connecting path.',
        ],
        [
          'Simple gas laws',
          'At fixed amount and temperature, pressure varies inversely with volume. At fixed amount and pressure, volume varies with Kelvin temperature. At fixed amount and volume, pressure varies with Kelvin temperature. These conditional statements are often called Boyle, Charles, and pressure–temperature laws. Combining them requires the same amount unless an amount change is included explicitly. A leaking container cannot be analyzed as a fixed sample without justification.',
        ],
        [
          'Microscopic interpretation',
          'Ideal-gas particles have negligible volume and no long-range interaction energy in the model, with pressure produced by collisions. Average translational kinetic energy per particle is 3kBT/2. Equal-temperature gases share average translational energy, while typical speeds depend on particle mass. Molecular rotation and vibration can contribute to heat capacity in real gases. The monatomic model deliberately omits those additional internal modes.',
        ],
        [
          'Internal energy',
          'For an ideal monatomic gas, U = 3nRT/2 up to the chosen reference and Cv = 3R/2 per mole. Cp = Cv + R in the ideal-gas model, so Cp/Cv = 5/3 for the monatomic case. Diatomic and polyatomic gases can have different capacities depending on active degrees of freedom and temperature. Do not apply the monatomic constants to every gas without checking the stated model.',
        ],
        [
          'Real-gas departures',
          'Finite particle size and attractions matter at high density or near condensation. An ideal prediction can then be systematically wrong even with accurate arithmetic. Pressure, volume, temperature, composition, and phase stability determine whether the approximation is suitable. A low-pressure gas is often closer to ideal, but no single label guarantees exactness across all conditions. State the approximation and its expected regime.',
        ],
        [
          'Interactive paths',
          'The lab fixes n=1 mol and initial T=300 K, then lets final volume ratio and process vary. It computes pressure and temperature using ideal monatomic relations. Compare the same endpoint ratio under different constraints to see why the equation of state alone does not determine energy transfer. No moving piston image is a molecular-dynamics calculation; it is a representation of a thermodynamic state path.',
        ],
      ],
      [
        ['Absolute pressure', 'Pressure relative to vacuum.'],
        ['Equation of state', 'Relation among equilibrium state variables.'],
        ['Cv', 'Constant-volume heat capacity.'],
        ['Gamma', 'Cp/Cv ratio.'],
      ],
      [
        'For one mole at 300 K in 0.010 m³, estimate pressure using R=8.314 J/(mol K).',
        ['Use SI units.', 'P = nRT/V = 1 × 8.314 × 300/0.010.', 'P ≈ 249,420 Pa = 249 kPa.'],
        'Pressure is absolute.',
      ],
      [
        [
          'Ideal monatomic Cv equals…',
          '3R/2',
          ['R/2', '5R', 'Zero'],
          'Three translational degrees contribute.',
        ],
        [
          'Gas-law pressure should be…',
          'Absolute',
          ['Gauge without conversion', 'Always atmospheric', 'Only a color'],
          'The equation uses vacuum reference.',
        ],
        [
          'Equal T means equal average translational…',
          'Energy',
          ['Speed for all masses', 'Density', 'Molar mass'],
          'Speed varies with mass.',
        ],
      ],
      [
        ['Why can Cp exceed Cv?', 'At constant pressure, heating includes expansion work.'],
        [
          'When can the ideal model fail?',
          'High density or near condensation makes size and attraction important.',
        ],
        [
          'Why does state law not determine Q?',
          'Heat depends on the path, not only the endpoint state relation.',
        ],
        [
          'What assumptions fix gamma=5/3?',
          'An ideal monatomic gas with the stated active degrees of freedom.',
        ],
      ],
      [
        ['Specify', 'Choose n, units, and absolute variables.'],
        ['Relate', 'Apply PV=nRT.'],
        ['Constrain', 'Choose a process before computing transfers.'],
      ],
      [
        ['State law', 'Links P,V,T,n', 'Not a full process model.'],
        ['Monatomic', 'Specified heat capacities', 'Not all gases.'],
        ['Ideal', 'Negligible interactions', 'Conditional approximation.'],
      ],
      'At fixed isothermal path, double volume and check pressure halves while internal energy change remains zero.',
      'An equation of state and a process constraint are both needed for a thermodynamic calculation.',
    ),
    c(
      'Isothermal, isobaric, isochoric, and adiabatic processes',
      [
        'Read P–V work as area.',
        'Compare path constraints.',
        'Apply reversible adiabatic relations cautiously.',
      ],
      [
        [
          'Work by the gas',
          'For a quasistatic expansion, work by the system is the integral of pressure with respect to volume. On a P–V diagram it is signed area under the path, positive for expansion under this convention. Pressure in pascals and volume in cubic meters produce joules. A vertical constant-volume path has zero boundary work even when pressure and temperature change. Path shape matters, not only the volume endpoints.',
        ],
        [
          'Isothermal',
          'An ideal-gas isothermal path keeps temperature constant, so internal energy stays constant for the ideal model. Heat supplied balances expansion work, with Wby = nRT ln(V₂/V₁) for a reversible quasistatic path. Isothermal does not mean insulated. Energy must often cross the boundary to maintain temperature while work occurs. Distinguish an ideal reversible path from an abrupt free expansion.',
        ],
        [
          'Isobaric',
          'An isobaric path holds pressure constant. Work by the gas is PΔV, and temperature changes in proportion to volume for a fixed ideal amount. Heat supplies both internal-energy increase and work during expansion. With constant Cp, Q = nCpΔT. A horizontal line is isobaric only when pressure is the vertical axis. Always identify axes before naming the path.',
        ],
        [
          'Isochoric',
          'An isochoric path holds volume constant, giving zero pressure–volume work. Supplied heat changes internal energy and temperature under the ideal closed-system model. Pressure rises with Kelvin temperature at fixed amount. Zero boundary work does not mean zero heat or zero energy change. The lab uses a temperature-ratio control for this mode because final volume ratio must remain one.',
        ],
        [
          'Adiabatic',
          'An adiabatic boundary has no heat transfer. Expansion can still lower internal energy as the gas does work. For a reversible ideal-gas path with constant heat capacities, PVᵞ is constant and TVᵞ⁻¹ is constant. Adiabatic does not automatically mean reversible, so these power laws need more assumptions than Q=0 alone. Friction or rapid nonequilibrium expansion can require a different analysis.',
        ],
        [
          'Comparing paths',
          'Compare equal initial states and final volume ratios, then examine final temperature, pressure, work, and heat. The lab plots reversible idealized paths and reports its convention. Fixed chart axes support comparisons; values remain finite within bounded controls. Explain which state variables are shared and which differ before comparing work. Two paths ending at different temperatures cannot be described as having identical full endpoints.',
        ],
      ],
      [
        ['Quasistatic', 'Path close to a sequence of equilibrium states.'],
        ['Isothermal', 'Constant temperature.'],
        ['Isochoric', 'Constant volume.'],
        ['Adiabatic', 'No heat transfer.'],
      ],
      [
        'One mole at 300 K expands reversibly isothermally to twice its volume. Find Wby.',
        ['Use Wby=nRT ln2.', 'Wby≈1 × 8.314 × 300 × 0.693.', 'Wby≈1729 J; ΔU=0 and Q=Wby.'],
        'Constant temperature does not mean zero heat.',
      ],
      [
        [
          'Isochoric boundary work is…',
          'Zero',
          ['Always nRT', 'Always negative', 'Equal to pressure'],
          'Volume does not change.',
        ],
        [
          'Adiabatic means…',
          'Q=0',
          ['ΔT=0', 'W=0', 'Always reversible'],
          'No heat crosses the boundary.',
        ],
        [
          'P–V area gives…',
          'Boundary work',
          ['Entropy directly', 'Only temperature', 'Only mass'],
          'Use signed compatible units.',
        ],
      ],
      [
        ['Why can adiabatic expansion cool?', 'Work by the gas reduces internal energy when Q=0.'],
        ['Why is isothermal not insulated?', 'Heat can enter to replace energy used for work.'],
        [
          'What extra condition supports PVᵞ constant?',
          'A reversible ideal-gas path with suitable constant heat capacities.',
        ],
        [
          'Why use temperature control in isochoric mode?',
          'Volume must stay fixed; temperature changes define a nontrivial path.',
        ],
      ],
      [
        ['Constrain', 'Choose the variable or transfer held fixed.'],
        ['Trace', 'Compute a consistent state path.'],
        ['Integrate', 'Find work and energy transfers.'],
      ],
      [
        ['Isothermal', 'Constant T', 'Heat may transfer.'],
        ['Adiabatic', 'Zero Q', 'Temperature may change.'],
        ['Isochoric', 'Constant V', 'Work zero, energy can change.'],
      ],
      'Compare expansion ratio 2 under isothermal, isobaric, and reversible adiabatic paths. Record final T, Q, W, and ΔU.',
      'Process names state different constraints and should never be treated as interchangeable labels.',
    ),
    c(
      'Internal energy and the first law',
      [
        'Use a declared work convention.',
        'Balance heat and work.',
        'Translate between physics and chemistry signs.',
      ],
      [
        [
          'Energy conservation',
          'For the closed system used here, ΔU = Q − Wby, where Q is heat into the system and Wby is work done by it. This is an energy balance, not a claim that heat and internal energy are identical. Other work types or kinetic and gravitational terms may matter in broader systems. State which terms are included before interpreting a result.',
        ],
        [
          'Sign conventions',
          'Chemistry often writes ΔU = q + won, where work done on the system is positive. The two forms agree because won = −Wby. Expansion work is positive in the work-by convention and negative in the work-on convention. A sign error often comes from switching definitions midway. Write a short sentence naming the direction of each transfer rather than relying on one familiar equation symbol.',
        ],
        [
          'State and path',
          'Internal energy change depends on initial and final state, while heat and work depend on path. Different paths between the same full states can have different Q and W but the same difference Q−Wby. A cyclic process returns to the initial state, so net ΔU is zero, while net heat and net work can be nonzero and equal under this convention.',
        ],
        [
          'Special processes',
          'Isochoric change has Wby=0, so ΔU=Q. Adiabatic change has Q=0, so ΔU=−Wby. For an ideal-gas isothermal change, ΔU=0, so Q=Wby. These conclusions use both the first law and model or process assumptions. Isothermal internal energy need not be universally constant for every nonideal material. Make the ideal-gas qualification explicit.',
        ],
        [
          'Calculating changes',
          'For a monatomic ideal gas with fixed amount, ΔU = 3nRΔT/2. A temperature increase means positive internal-energy change under the model. Check that computed heat minus work matches this state-based result. Using both routes provides an independent consistency check. Units, absolute temperatures, and sign directions should remain visible even when the numerical calculation is simple.',
        ],
        [
          'Interactive verification',
          'The lab reports Q, Wby, and ΔU for its selected path. Record trials with the same initial state but different constraints and verify the balance numerically. Its labels use work by the gas consistently. The model is not an engine cycle merely because a curve appears on a P–V plot; a cycle requires a closed path returning to the full initial state.',
        ],
      ],
      [
        ['First law', 'Conservation of energy across the defined system.'],
        ['Work by', 'Positive energy transfer outward through work.'],
        ['State function', 'Quantity determined by state.'],
        ['Cycle', 'Process returning to the initial state.'],
      ],
      [
        'A system receives 500 J heat and does 200 J work. Find ΔU and chemistry work.',
        ['Q=+500 J, Wby=+200 J.', 'ΔU=500−200=300 J.', 'won=−200 J, giving q+won=300 J.'],
        'Both sign conventions give the same energy change.',
      ],
      [
        [
          'Heat and work are…',
          'Path-dependent',
          ['Always state functions', 'Always equal', 'Always positive'],
          'Their values depend on the process.',
        ],
        [
          'A complete cycle has net ΔU…',
          'Zero',
          ['Always positive', 'Always negative', 'Equal to temperature'],
          'The state returns.',
        ],
        [
          'Adiabatic expansion with positive Wby gives ΔU…',
          'Negative',
          ['Positive', 'Zero always', 'Undefined always'],
          'Q=0 and ΔU=−Wby.',
        ],
      ],
      [
        ['Translate Wby=100 J to won.', 'won=−100 J.'],
        [
          'Why check ΔU from temperature too?',
          'It independently verifies transfer accounting under the ideal model.',
        ],
        ['Can a cycle have net work?', 'Yes; net heat equals net work when net ΔU=0.'],
        [
          'Why qualify isothermal ΔU=0?',
          'It follows for an ideal gas whose U depends only on temperature, not every material.',
        ],
      ],
      [
        ['Declare', 'Fix signs and included energy terms.'],
        ['Account', 'Find Q and Wby.'],
        ['Check', 'Compare Q−Wby with state-based ΔU.'],
      ],
      [
        ['U', 'State property', 'Not heat stored.'],
        ['Q', 'Heat into system', 'Path-dependent.'],
        ['Wby', 'Work outward', 'Opposite of work-on convention.'],
      ],
      'For every gas process, verify Q−Wby−ΔU=0 within rounding. Translate one result into chemistry notation.',
      'Energy conservation is independent of notation when the transfer directions are consistent.',
    ),
    c(
      'Entropy, reversibility, and the second law',
      [
        'Compute entropy changes with Kelvin.',
        'Distinguish reversible idealization from spontaneous transfer.',
        'Separate system and total entropy.',
      ],
      [
        [
          'Direction beyond conservation',
          'The first law permits many energy balances but does not determine which processes occur spontaneously. The second law constrains total entropy change of a system plus surroundings. For an isolated combined system, entropy does not decrease. A local entropy decrease is possible when compensated elsewhere. Avoid explaining every spontaneous process through only the system’s entropy or only its energy loss.',
        ],
        [
          'Entropy as a state function',
          'Entropy connects macroscopic thermodynamics with microscopic multiplicity and energy distribution. For a reversible heat-transfer path, dS = δQrev/T. Entropy is a state function even when the actual process is irreversible; a suitable reversible reference path can calculate its change. Heat itself remains path-dependent. The word reversible in the formula does not mean every real heat transfer is reversible.',
        ],
        [
          'Finite-temperature heat flow',
          'Heat transferred from a hot reservoir to a colder one increases total entropy. For reservoir magnitudes Q, the hot change is −Q/Th and the cold change +Q/Tc, with Kelvin temperatures. Because Tc is lower, the gain exceeds the loss. This result identifies irreversibility while conserving energy. Equal energy transfers can produce unequal entropy changes at different temperatures.',
        ],
        [
          'Reversibility',
          'A reversible process is an ideal limit in which system and surroundings can be restored without net changes elsewhere. Finite temperature gradients, friction, unrestrained expansion, and mixing generally generate entropy. Quasistatic motion alone does not guarantee reversibility if dissipative effects remain. Real devices can approach some ideal relations but do not achieve every reversible condition exactly. Distinguish an ideal benchmark from measured performance.',
        ],
        [
          'Gas entropy',
          'For an ideal gas with constant capacities, entropy change can be written nCv ln(T₂/T₁) + nR ln(V₂/V₁). Reversible adiabatic paths are isentropic under the stated model; adiabatic irreversible paths can generate entropy. Isothermal reversible expansion increases gas entropy while the surroundings lose equal entropy, making total generation zero in the ideal limit. Track the appropriate boundary.',
        ],
        [
          'Using the lab',
          'The gas paths are reversible teaching paths and the cycle panel gives a reversible Carnot bound. They do not calculate frictional entropy generation for a physical engine. Explain how a real finite-gradient heat transfer would change total entropy while preserving energy balance. A formula returning zero generation is evidence about the ideal model, not proof that a real process has no losses.',
        ],
      ],
      [
        ['Entropy generation', 'Increase associated with irreversibility.'],
        ['Reversible', 'Ideal process reversible without net external changes.'],
        ['Isentropic', 'Constant entropy.'],
        ['Reservoir', 'Ideal body maintaining a fixed temperature during exchange.'],
      ],
      [
        'Transfer 100 J from 400 K to 300 K reservoirs. Find total entropy change.',
        [
          'Hot change = −100/400 = −0.250 J/K.',
          'Cold change = +100/300 = +0.333 J/K.',
          'Total = +0.0833 J/K.',
        ],
        'Energy is conserved while total entropy increases.',
      ],
      [
        [
          'Adiabatic always means isentropic?',
          'No',
          ['Always', 'Only if temperature changes', 'Only for solids'],
          'Irreversible adiabatic processes can generate entropy.',
        ],
        [
          'Entropy calculations require…',
          'Kelvin',
          ['Celsius ratios', 'Only mass', 'Only volume'],
          'Absolute temperature is essential.',
        ],
        [
          'System entropy may decrease if…',
          'Surroundings compensate sufficiently',
          ['The first law fails', 'Energy disappears', 'All motion stops'],
          'Total entropy is the relevant constraint.',
        ],
      ],
      [
        [
          'Why is quasistatic insufficient for reversibility?',
          'Friction or other dissipation can remain.',
        ],
        [
          'How can entropy be state-dependent while heat is not?',
          'A reversible reference integral defines state change, while actual heat varies by path.',
        ],
        [
          'Why does hot-to-cold transfer generate entropy?',
          'The cold reservoir gains more Q/T than the hot reservoir loses.',
        ],
        [
          'What does zero ideal generation not prove?',
          'That a real apparatus has no irreversibility.',
        ],
      ],
      [
        ['Boundary', 'Include system and relevant surroundings.'],
        ['Transfer', 'Calculate entropy gains and losses.'],
        ['Generate', 'Identify nonnegative total irreversibility.'],
      ],
      [
        ['System entropy', 'Can rise or fall', 'Depends on exchanges.'],
        ['Total entropy', 'Second-law constraint', 'Must include surroundings.'],
        ['Adiabatic', 'Zero heat transfer', 'Not automatically reversible.'],
      ],
      'Compare reversible adiabatic and isothermal gas expansion. Explain system entropy changes and the role of surroundings.',
      'The second law concerns process direction and total entropy, beyond energy conservation alone.',
    ),
    c(
      'Heat engines, Carnot cycles, refrigerators, and heat pumps',
      [
        'Balance heat and work for cycles.',
        'Calculate reversible efficiency bounds.',
        'Distinguish efficiency from COP.',
      ],
      [
        [
          'Engine accounting',
          'A heat engine operates cyclically, receiving heat Qh, delivering work W, and rejecting heat Qc as positive magnitudes in this description. Since the system returns to its initial state, W = Qh − Qc. Thermal efficiency is W/Qh. An engine cannot convert all heat from one reservoir into work in a cycle under the second-law constraints. Label energy-flow directions before using magnitude equations.',
        ],
        [
          'Carnot idealization',
          'A reversible Carnot cycle combines two isothermal and two reversible adiabatic processes between reservoirs. Its efficiency is 1 − Tc/Th, with Kelvin temperatures and Th greater than Tc. This is a maximum for heat engines between those reservoirs, not a prediction that every engine achieves it. Reservoir temperatures and internal working-fluid temperatures should not be silently interchanged in a real device.',
        ],
        [
          'Changing the bound',
          'Increasing Th or lowering Tc can raise the ideal bound, but materials, heat transfer, emissions, and operating limits matter in practice. Celsius substitution can produce nonsense or an apparently plausible wrong result. Equal reservoir temperatures yield no positive Carnot efficiency. The bound applies to the defined heat-engine context and should not be generalized indiscriminately to every energy-conversion technology.',
        ],
        [
          'Refrigerators',
          'A refrigerator uses work to move heat from a colder region to a warmer one. Its coefficient of performance is Qc/W. For a reversible device between fixed reservoirs, COPref = Tc/(Th−Tc). COP can exceed one because it compares moved heat with input work rather than claiming creation of energy. A small temperature lift can yield a high ideal COP, while real devices face finite transfer and other losses.',
        ],
        [
          'Heat pumps',
          'A heat pump’s useful output is heat delivered to the warm side, so COPheat = Qh/W. For the same ideal cycle, COPheat = COPref + 1. The different numerators reflect different purposes, not contradictory accounting. Seasonal performance also depends on operating conditions and auxiliary energy. One design-point value does not determine an entire building’s energy demand or cost.',
        ],
        [
          'Interactive cycle panel',
          'The panel lets reservoir temperatures vary with bounds that keep Th above Tc, and reports Carnot efficiency and both COP values. It is a reversible limit calculator rather than a simulated real compressor or closed P–V cycle. Use the gas-process panel to understand individual path constraints, then explain how a cycle must connect them consistently. Keep magnitude accounting separate from the signed work convention used for one path.',
        ],
      ],
      [
        ['Thermal efficiency', 'Useful engine work divided by hot-side heat input.'],
        ['COP', 'Useful moved heat divided by work input.'],
        ['Carnot bound', 'Reversible maximum between fixed reservoirs.'],
        ['Heat rejection', 'Energy delivered to the cold reservoir in an engine.'],
      ],
      [
        'For Th=600 K and Tc=300 K, find Carnot efficiency and refrigerator COP.',
        ['η=1−300/600=0.50.', 'COPref=300/(600−300)=1.', 'COPheat=2.'],
        'The values describe different useful outputs.',
      ],
      [
        [
          'Carnot efficiency uses…',
          'Kelvin reservoir temperatures',
          ['Celsius directly', 'Only pressure', 'Only gas mass'],
          'It uses absolute ratios.',
        ],
        [
          'COP above one violates conservation?',
          'No',
          ['Always', 'Only for engines', 'Only with ideal gases'],
          'Heat is moved as well as work supplied.',
        ],
        [
          'For one cycle, W equals…',
          'Qh−Qc',
          ['Qh+Qc always', 'Zero necessarily', 'Qc−Qh for an engine output'],
          'Use positive heat magnitudes.',
        ],
      ],
      [
        [
          'Why can real efficiency be lower?',
          'Irreversibility and practical transfer and operating limitations reduce performance.',
        ],
        [
          'Distinguish refrigerator and heat-pump COP.',
          'One uses cold-side heat removed; the other warm-side heat delivered.',
        ],
        [
          'What happens at equal reservoir temperatures?',
          'The ideal engine efficiency tends to zero; the refrigerator expression has a limiting singular idealization.',
        ],
        [
          'Does the panel predict electricity bills?',
          'No; real loads, conditions, losses, and operating duration are not modeled.',
        ],
      ],
      [
        ['Receive', 'Take heat from a hot reservoir.'],
        ['Convert', 'Deliver work while returning to state.'],
        ['Reject', 'Send remaining heat to the cold reservoir.'],
      ],
      [
        ['Efficiency', 'W/Qh', 'At most the relevant bound.'],
        ['Refrigerator COP', 'Qc/W', 'Can exceed one.'],
        ['Heat-pump COP', 'Qh/W', 'One greater for the same ideal cycle.'],
      ],
      'Set reservoirs to 600 K and 300 K, then raise the cold temperature. Compare efficiency and COP and explain their different trends.',
      'Cycle performance metrics depend on the useful output and the thermodynamic boundary.',
    ),
    c(
      'Historical experiments and modern thermodynamic reasoning',
      [
        'Connect historical contributions to evidence.',
        'Distinguish classical and statistical descriptions.',
        'Evaluate models through reproducible checks.',
      ],
      [
        [
          'Heat as a scientific question',
          'Early heat theories sought to explain warming, phase changes, and machines. Joseph Black’s work helped distinguish specific and latent heat, showing why temperature change alone does not capture all thermal energy transfer. Historical terminology should be interpreted in context rather than copied as modern notation. The enduring reasoning is to separate measurable temperature, energy transfer, and material response through controlled comparisons.',
        ],
        [
          'Joule and energy',
          'Joule’s experiments connected mechanical work and thermal effects, supporting quantitative energy conservation. A useful modern reconstruction identifies the work input, temperature response, apparatus capacity, and losses. A rising thermometer reading alone does not establish an exact conversion without accounting for the whole system. Historical evidence illustrates why calibration and boundaries matter as much as a formula.',
        ],
        [
          'Kelvin and Clausius',
          'Kelvin helped develop absolute thermodynamic temperature, while Clausius formalized aspects of the second law and entropy. Their contributions connect temperature ratios, reversible benchmarks, and process direction. The first and second laws answer different questions: conservation and allowed direction. Learning their relationship is more useful than treating each name as an isolated vocabulary fact. State the system and conditions when applying either principle.',
        ],
        [
          'Maxwell and Boltzmann',
          'Statistical approaches connect macroscopic properties with distributions of microscopic states and motions. Maxwell’s velocity distributions and Boltzmann’s statistical reasoning help explain why equal temperature does not imply identical molecular speed. A distribution describes many particles rather than a single deterministic speed. Probability and large numbers connect microscopic variation to reproducible bulk behavior. Classical thermodynamics can remain useful without tracking every particle individually.',
        ],
        [
          'Planck and radiation',
          'Planck’s work on thermal radiation contributed to quantum theory and the description of blackbody spectra. Radiation laws show why wavelength and temperature matter beyond a simple visible-color label. Classical models have regimes of usefulness and limits. Scientific progress often preserves a successful approximation while clarifying where it fails. Do not interpret a model’s historical importance as proof that it is exact in every modern application.',
        ],
        [
          'Synthesis and verification',
          'Use boundaries, state variables, process constraints, signs, and limiting cases as a common problem-solving routine. Check the gas lab’s energy balance, the heating curve’s phase segments, and the Carnot panel’s reservoir ordering. These tools are generated from equations and do not independently validate them experimentally. A strong explanation identifies the evidence that originally motivates a law and the new observations needed to test a real design.',
        ],
      ],
      [
        ['Specific heat', 'Energy response per mass and temperature change.'],
        ['Statistical mechanics', 'Connection between microscopic states and bulk properties.'],
        ['Distribution', 'Probabilities or frequencies across possible values.'],
        ['Blackbody', 'Ideal thermal-radiation absorber and emitter.'],
      ],
      [
        'A mechanical heater adds 1000 J to a system with total capacity 500 J/K, neglecting losses. Predict ΔT.',
        [
          'Use energy change = CΔT.',
          'ΔT=1000/500=2 K.',
          'A different measured rise could reflect losses or an incorrect capacity estimate.',
        ],
        'A discrepancy invites a boundary and measurement audit.',
      ],
      [
        [
          'Joule’s work connected…',
          'Mechanical work and thermal energy',
          ['Only genetics and proteins', 'Only rock sorting', 'Only salinity and light'],
          'It supported quantitative energy equivalence.',
        ],
        [
          'Equal-temperature molecules all have one speed?',
          'No',
          ['Always', 'Only for monatomic gases', 'Only at 300 K'],
          'They have a distribution.',
        ],
        [
          'A model’s historical importance makes it universally exact?',
          'No',
          ['Always', 'Only if famous', 'Only if old'],
          'Models have validity regimes.',
        ],
      ],
      [
        [
          'What did latent-heat reasoning clarify?',
          'Energy can change phase without changing temperature.',
        ],
        [
          'How do first and second laws differ?',
          'One constrains energy balance; the other direction and total entropy.',
        ],
        ['Why use distributions?', 'Microscopic particles vary while bulk averages can be stable.'],
        [
          'How should a simulation discrepancy be investigated?',
          'Check assumptions, units, signs, boundaries, measurements, and omitted processes.',
        ],
      ],
      [
        ['Observe', 'Measure a reproducible thermal effect.'],
        ['Model', 'Connect energy and state under assumptions.'],
        ['Refine', 'Use discrepancies to improve scope and evidence.'],
      ],
      [
        ['Classical', 'Bulk state relationships', 'Does not track each particle.'],
        ['Statistical', 'Microscopic distributions', 'Requires a model of states.'],
        ['Simulation', 'Equation-generated behavior', 'Not independent experimental proof.'],
      ],
      'Choose one numerical result from each lab mode and write its conservation or limiting-case check.',
      'Thermodynamics grows from careful experiments and remains strongest when models are checked against evidence.',
    ),
  ],
});
