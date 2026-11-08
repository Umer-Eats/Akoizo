// Checkpoint explanations for Chem Lab, keyed by question id.
export const chemistry: Record<string, string> = {
  'chem-u1-l1-q1':
    'An ion forms when an atom gains or loses electrons, giving it a net charge. The number of protons (the atomic number) stays the same; changing it would turn the atom into a different element.',
  'chem-u1-l1-q2':
    'Calcium forms Ca²⁺ and chlorine forms Cl⁻. Balancing charge needs two chloride ions for each calcium: (+2) + 2(−1) = 0, so the formula is CaCl₂.',
  'chem-u1-l1-q3':
    'Precise means repeated readings agree closely; biased means they are all shifted from the true value. A biased but precise balance gives tightly grouped readings that are consistently off, for example always 0.05 g too high.',
  'chem-u1-l1-q4':
    'Mass number is the whole-number count of protons plus neutrons in one isotope, such as 35 for chlorine-35. The atomic mass on the periodic table (35.45 for Cl) is a weighted average over all naturally occurring isotopes, so it is usually not a whole number.',
  'chem-u1-l1-q5':
    'One mole of CO₂ molecules contains one mole of carbon atoms but two moles of oxygen atoms. Saying exactly what is being counted (molecules, atoms or ions) prevents errors by a factor of two or more.',
  'chem-u1-l1-q6':
    'Each CO₂ molecule contains two oxygen atoms, so moles of O atoms = 2 × moles of CO₂ = 2 × 0.20 = 0.40 mol.',
  'chem-u1-l1-q7':
    'Rounding intermediate results drops small amounts that can add up over several steps. Keeping one or two extra (guard) digits during calculation and rounding only the final answer keeps the result faithful to the input precision.',
  'chem-u2-l1-q1':
    'Oxygen in water has four electron domains: two bonds and two lone pairs, arranged tetrahedrally. The lone pairs are invisible in the molecular shape, so the atoms form a bent shape with a bond angle of about 104.5°.',
  'chem-u2-l1-q2':
    'London dispersion forces arise from temporary shifts in electron clouds, which happen in every molecule. Hydrogen bonding needs H bonded to N, O or F, and metallic or ionic bonding occur only in specific substances.',
  'chem-u2-l1-q3':
    'In VSEPR, each region of electron density counts as one domain, whether it is a single, double or triple bond or a lone pair. A double bond points in one direction, so it is one domain.',
  'chem-u2-l1-q4':
    'Ionic compounds conduct electricity when melted (or dissolved) because their ions can move and carry charge. In the solid, ions are locked in a lattice and cannot flow, so the solid does not conduct.',
  'chem-u2-l1-q5':
    'Resonance structures are separate drawings of one real molecule whose electrons are spread (delocalized) over several atoms. The molecule does not switch between the structures; its true structure is a blend, so all equivalent bonds are the same length.',
  'chem-u2-l1-q6':
    'Boiling separates molecules from each other by overcoming intermolecular forces; the molecules themselves stay the same (water vapor is still H₂O). Decomposition breaks chemical bonds inside molecules and forms new substances.',
  'chem-u2-l1-q7':
    'Show the molecule’s shape and bond dipoles to predict whether the dipoles cancel. Then test independent properties, such as solubility in water or boiling point, against a nonpolar molecule of similar size so size does not explain the difference.',
  'chem-u3-l1-q1':
    'Only coefficients, the numbers in front of formulas, may change when balancing. Changing subscripts or elements would change the substance itself, for example turning H₂O into H₂O₂.',
  'chem-u3-l1-q2':
    'For 2H₂ + O₂ → 2H₂O, divide each amount by its coefficient: H₂ gives 3.0 ÷ 2 = 1.5 and O₂ gives 1.0 ÷ 1 = 1.0. O₂ gives the smaller value, so it runs out first and limits the reaction. H₂O is a product, not a reagent.',
  'chem-u3-l1-q3':
    'Percent yield = actual ÷ theoretical × 100% = 8 g ÷ 10 g × 100% = 80%. Dividing the wrong way gives 125%; 20% is the fraction lost.',
  'chem-u3-l1-q4':
    'Coefficients count particles (moles), not grams. Because each substance has its own molar mass, 2 mol H₂ (4 g) and 1 mol O₂ (32 g) react even though the coefficient ratio is 2:1. Convert grams to moles before using coefficients.',
  'chem-u3-l1-q5':
    'Al₂O₃ has 3 O atoms and O₂ has 2, so the least common multiple is 6: 3O₂ → 2Al₂O₃. That makes 4 Al on the right, so use 4Al: 4Al + 3O₂ → 2Al₂O₃. Check: 4 Al and 6 O on each side.',
  'chem-u3-l1-q6':
    'Yield over 100% means the measured product weighs more than chemically possible. Common reasons are product that is still wet, impurities or leftover reagents mixed in, weighing errors, or the product being a different compound (for example a hydrate) than assumed.',
  'chem-u3-l1-q7':
    'Moles = molarity × volume in liters. Convert 25.0 mL to 0.0250 L, then 0.0250 L × 0.200 mol/L = 0.00500 mol.',
  'chem-u4-l1-q1':
    'Gas laws involve proportions to temperature, which only work on an absolute scale where zero means no thermal motion. Doubling 10 °C to 20 °C does not double the gas’s energy, but doubling 283 K to 566 K does.',
  'chem-u4-l1-q2':
    'Average translational kinetic energy depends only on temperature: KE = (3/2)kT. At the same T, every gas has the same average KE, so lighter molecules move faster (KE = ½mv²). Speed, molar mass and density differ.',
  'chem-u4-l1-q3':
    'Stratospheric ozone absorbs most incoming ultraviolet radiation, especially UV-B and UV-C, protecting living things from DNA damage. It does not block most infrared, which is handled by greenhouse gases.',
  'chem-u4-l1-q4':
    'The ideal gas law assumes molecules take up no space and do not attract each other. At high pressure or low temperature near condensation, molecules are close together, so their volume and attractions matter and the gas deviates from ideal behavior.',
  'chem-u4-l1-q5':
    'Gas collected over water is mixed with water vapor. By Dalton’s law, total pressure = P(gas) + P(water vapor). Subtract water’s vapor pressure at that temperature from the measured total to get the dry gas’s pressure.',
  'chem-u4-l1-q6':
    'A heating curve tracks temperature as heat is added over time, showing flat plateaus at melting and boiling. A phase diagram maps which phase is stable at each combination of pressure and temperature, including the triple and critical points.',
  'chem-u4-l1-q7':
    'Boyle’s law (P ∝ 1/V) holds only when the amount of gas and the temperature are constant. A controlled test seals in a fixed amount of gas, changes the volume slowly so temperature stays the same, and measures pressure.',
  'chem-u5-l1-q1':
    'Q is the current ratio of products to reactants. If Q < K, there are too few products compared with equilibrium, so the reaction proceeds forward to make more products until Q = K.',
  'chem-u5-l1-q2':
    'A catalyst lowers activation energy for both the forward and reverse reactions equally, so equilibrium is reached faster. It does not change K or the final equilibrium amounts at a given temperature.',
  'chem-u5-l1-q3':
    'At equilibrium the forward and reverse reactions continue at equal rates, so concentrations stop changing. The concentrations are constant, not necessarily equal, and masses of reactants and products usually differ.',
  'chem-u5-l1-q4':
    'A pure solid’s effective concentration (activity) does not change while some of it is present; it is set to 1. Adding more solid does not shift the equilibrium, so it is left out of the K expression.',
  'chem-u5-l1-q5':
    'At steady state, concentrations stay constant because material flows in and out at matching rates, as in a cell or a flowing river. The reaction itself is not balanced: there is still a net forward process, so it is not at equilibrium.',
  'chem-u5-l1-q6':
    'Adding an ion that is already part of the dissolving salt raises the ion product Q. If Q exceeds Ksp, the salt dissolves less or precipitates. For example, AgCl is less soluble in NaCl solution than in pure water.',
  'chem-u5-l1-q7':
    'No. K depends only on temperature for a given reaction. Adding reactant lowers Q below K, so the reaction shifts forward until Q equals the same K again.',
  'chem-u6-l1-q1':
    'A strong acid ionizes completely in water and a weak acid only partly. That is different from concentration, how much acid is dissolved. A dilute strong acid and a concentrated weak acid are both possible.',
  'chem-u6-l1-q2':
    'By the Henderson–Hasselbalch equation, pH = pKa + log([A⁻] ÷ [HA]). With equal amounts the ratio is 1 and log(1) = 0, so pH = pKa. Buffers work best near this point.',
  'chem-u6-l1-q3':
    'The equivalence point is where the moles of added titrant exactly match the analyte according to the balanced equation. The endpoint is where the indicator changes color, ideally close to it. The pH at equivalence is 7 only for strong acid with strong base.',
  'chem-u6-l1-q4':
    'Diluting a buffer keeps the HA : A⁻ ratio and roughly the pH the same, but there are fewer moles of each per liter. It can then neutralize less added acid or base before the pH shifts, so buffer capacity falls.',
  'chem-u6-l1-q5':
    'Some salt ions react with water. A conjugate base of a weak acid, such as acetate, accepts H⁺ and makes the solution basic; a conjugate acid of a weak base, such as NH₄⁺, releases H⁺ and makes it acidic. Ions from strong acids and bases do not.',
  'chem-u6-l1-q6':
    'A solution is neutral when [H₃O⁺] = [OH⁻]. Kw changes with temperature, so the pH of neutral water is 7.00 only at 25 °C; at higher temperatures neutral pH is below 7.',
  'chem-u6-l1-q7':
    'After mixing, leftover acid or base is spread through the combined volume of both solutions. Concentration = excess moles ÷ total volume, assuming volumes simply add.',
  'chem-u7-l1-q1':
    'An exothermic reaction releases heat from the system to the surroundings, so the system’s enthalpy decreases and ΔH is negative. Endothermic reactions have positive ΔH.',
  'chem-u7-l1-q2':
    'A catalyst provides a lower-energy pathway, which speeds up the reaction. ΔH and ΔG depend only on reactants and products, so they stay the same, and atoms are conserved regardless.',
  'chem-u7-l1-q3':
    'Enthalpy is a state function: its change depends only on the start and end states, not the route. You can therefore add the ΔH values of steps that lead from the same reactants to the same products.',
  'chem-u7-l1-q4':
    'In ΔG = ΔH − TΔS, entropy is usually given in J/(mol·K) and enthalpy in kJ/mol. Convert entropy to kJ (divide by 1,000) or enthalpy to J so the terms match before subtracting.',
  'chem-u7-l1-q5':
    'Yes. A process can lower the system’s entropy, as water freezing does, if it releases enough heat to raise the surroundings’ entropy more. The second law only requires total entropy (system plus surroundings) not to decrease.',
  'chem-u7-l1-q6':
    'In an ideal calorimeter, heat lost by the reaction equals heat gained by the water and container: q(reaction) = −q(calorimeter). If the water warms, q(calorimeter) is positive, so the reaction’s q and ΔH are negative.',
  'chem-u7-l1-q7':
    'Chemistry often writes ΔU = q + w, where w is work done on the system; physics often writes ΔU = Q − W, where W is work done by it. Since w = −W, both say the same thing.',
  'chem-u8-l1-q1':
    'If rate = k[A]ⁿ, doubling [A] multiplies the rate by 2ⁿ. A rate that quadruples means 2ⁿ = 4, so n = 2: second order in A.',
  'chem-u8-l1-q2':
    'The integrated first-order law is ln[A] = −kt + ln[A]₀. Plotting ln[A] against time gives a straight line with slope −k. A curve on that plot would suggest a different order.',
  'chem-u8-l1-q3':
    'No. Rate orders must be found by experiment, unless the step is a known elementary step. Many reactions occur in several steps, and the slowest step decides the rate law, not the overall coefficients.',
  'chem-u8-l1-q4':
    'The units of k change with overall order so that rate always comes out in M/s: s⁻¹ for first order, M⁻¹·s⁻¹ for second order. The units reveal the order and are needed to use k correctly.',
  'chem-u8-l1-q5':
    'An intermediate is made in one step and used up in a later one, so it does not appear in the overall equation. A catalyst is used in an early step and regenerated later, so it is present at the start and the end.',
  'chem-u8-l1-q6':
    'The Arrhenius equation gives ln k = −Ea/(R·T) + ln A. Plotting ln k against 1/T gives a straight line with slope −Ea/R, so Ea = −R × slope. A steeper slope means a larger activation energy.',
  'chem-u8-l1-q7':
    'Run a blank (all reagents except the reacting species) or a stable reference solution alongside the samples at the same time and temperature. Any change in its reading shows instrument drift, which can then be subtracted from the samples.',
  'chem-u9-l1-q1':
    'Michaelis–Menten: v = Vmax[S] ÷ (Km + [S]). When [S] = Km, v = Vmax·Km ÷ (2Km) = Vmax/2. That is the definition of Km: the substrate concentration giving half the maximum rate.',
  'chem-u9-l1-q2':
    'Vmax = kcat × total enzyme, so doubling the active enzyme doubles Vmax. Km is a property of the enzyme–substrate pair and does not depend on how much enzyme is present.',
  'chem-u9-l1-q3':
    'The basic equation assumes initial rates, before much substrate is used, little product has built up and the reverse reaction is negligible. It does not describe cooperative enzymes or every type of inhibition exactly.',
  'chem-u9-l1-q4':
    'In the simple mechanism, Km = (k₋₁ + kcat) ÷ k₁. It includes the rate of catalysis as well as binding and unbinding. Only when kcat is much smaller than k₋₁ does Km approximate the dissociation constant.',
  'chem-u9-l1-q5':
    'Below Km, the rate rises nearly linearly with [S], which helps estimate Vmax/Km. Above Km, the rate approaches Vmax. Data from both regions are needed to pin down Km and Vmax accurately.',
  'chem-u9-l1-q6':
    'A blank without enzyme (or substrate) shows any signal change from other causes, such as substrate breaking down by itself or instrument drift. Subtracting it isolates the enzyme-catalyzed rate.',
  'chem-u9-l1-q7':
    'The model fails when enzymes bind cooperatively, inhibitors are present, substrate is significantly used up, the reverse reaction matters, or the enzyme denatures during the assay. Each breaks one of its assumptions.',
};
