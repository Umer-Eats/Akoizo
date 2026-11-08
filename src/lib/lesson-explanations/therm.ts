// Checkpoint explanations for Thermodynamics, keyed by question id.
export const thermodynamics: Record<string, string> = {
  'therm-u1-l1-q1':
    'Sealed means no matter can enter or leave, so it is a closed system. A conducting wall still lets heat through, so it is not isolated; an isolated system blocks both matter and energy.',
  'therm-u1-l1-q2':
    'Heat is energy that crosses a system’s boundary because of a temperature difference. A body does not contain "heat"; it has internal energy. Temperature measures average molecular kinetic energy, which is a different idea.',
  'therm-u1-l1-q3':
    'Gas laws use ratios and proportions, which only work on an absolute scale starting at true zero. Going from 10 °C to 20 °C does not double the gas’s energy, but going from 283 K to 566 K does.',
  'therm-u1-l1-q4':
    'The boundary defines what is inside the system. Heat, work and mass are counted only when they cross it, so drawing it differently changes which transfers appear in the energy balance.',
  'therm-u1-l1-q5':
    'Yes. Internal energy depends on the amount of material, its phase and its composition, not just temperature. A bathtub at 40 °C holds far more internal energy than a cup at 40 °C, and liquid water at 0 °C holds more than ice at 0 °C.',
  'therm-u1-l1-q6':
    'Thermal equilibrium means no net heat flows between objects because they are at the same temperature. Molecules keep moving and exchanging energy; the exchanges just balance out.',
  'therm-u1-l1-q7':
    'A thermometer must reach the sample’s temperature by exchanging heat with it. If the sample is small and the thermometer cold or warm, that exchange noticeably changes the temperature being measured.',
  'therm-u2-l1-q1':
    'No. Thermal radiation is electromagnetic waves, which travel through empty space; sunlight reaches Earth across a vacuum. Conduction and convection, by contrast, need matter.',
  'therm-u2-l1-q2':
    'Q = mcΔT gives the energy (in joules) needed to change a mass’s temperature by ΔT. It says nothing about how fast that happens; rate (power) requires time.',
  'therm-u2-l1-q3':
    'The convection coefficient h depends on the fluid, how fast it moves, the surface shape and orientation and whether flow is natural or forced. It has no single universal value, even for air.',
  'therm-u2-l1-q4':
    'Radiated power follows the Stefan–Boltzmann law, P = εσAT⁴, using absolute temperature. On the Celsius scale, 0 °C would wrongly give zero radiation, and the fourth power magnifies any offset error.',
  'therm-u2-l1-q5':
    'Insulation slows heat flow but cannot stop it: it has finite resistance, and heat can still escape through gaps, lids, supports (thermal bridges) or radiation. The object still cools, just more slowly.',
  'therm-u2-l1-q6':
    'Heat capacity C is the energy needed to warm a whole object by 1 K (J/K). Specific heat c is per unit mass (J/(kg·K)). They relate as C = m × c.',
  'therm-u2-l1-q7':
    'Predicting cooling time requires how much energy must be lost (heat capacity × temperature change) and how fast it leaves through each path (conduction, convection, radiation) under the actual conditions. Rate times time must equal energy.',
  'therm-u3-l1-q1':
    'A phase diagram shows which phase is stable at each combination of pressure and temperature. Lines mark phase boundaries; the triple point and critical point are special points on it.',
  'therm-u3-l1-q2':
    'No. The triple point is the single pressure and temperature where solid, liquid and gas coexist. The critical point is where the liquid–gas boundary ends and the two phases become indistinguishable.',
  'therm-u3-l1-q3':
    'On a melting plateau, temperature stays constant while added energy converts solid to liquid. The fraction that is liquid steadily increases until all of it has melted.',
  'therm-u3-l1-q4':
    'Phase transition temperatures shift with pressure. Water boils below 100 °C at high altitude and above it in a pressure cooker. A transition temperature is meaningful only with its pressure.',
  'therm-u3-l1-q5':
    'Energy added equals heating power × time only if the power is known and steady. A plot against time shows energy only after converting with the net heating rate, after any losses.',
  'therm-u3-l1-q6':
    'The lab uses simple fixed transition temperatures. It leaves out how pressure changes them, supercooling (liquid below its freezing point), temperature differences inside the sample and more complex phase behavior.',
  'therm-u3-l1-q7':
    'At a phase transition, temperature stays the same whether the sample is 10% or 90% melted. Temperature alone cannot tell you how much is in each phase; you also need the energy added.',
  'therm-u4-l1-q1':
    'During a phase change, temperature does not change, so mcΔT = 0 even though energy is absorbed. The energy is Q = mL, where L is the latent heat of fusion or vaporization.',
  'therm-u4-l1-q2':
    'Energy needed scales with mass in both heating (mcΔT) and phase change (mL), so doubling mass doubles the energy. Transition temperature and specific heat are properties of the material and do not change.',
  'therm-u4-l1-q3':
    'First check whether there is enough heat to melt all the ice. If not, the final temperature is 0 °C with some ice left. If there is, all ice melts and you solve for a final temperature above 0 °C.',
  'therm-u4-l1-q4':
    'From cold ice to warm water: (1) warm the ice to 0 °C, Q = m·c_ice·ΔT; (2) melt it at 0 °C, Q = m·L_f; (3) warm the liquid water, Q = m·c_water·ΔT. Add the three energies.',
  'therm-u4-l1-q5':
    'The container also warms or cools during the experiment, absorbing or releasing energy based on its heat capacity. Ignoring it makes the calculated heat for the sample or reaction too small.',
  'therm-u4-l1-q6':
    'An ideal calorimeter assumes no heat leaks across the outer boundary, so all heat lost by one part is gained by another and the total is zero. Real calorimeters lose some heat, which adds error.',
  'therm-u4-l1-q7':
    'On a plateau, energy is still being added, but it breaks molecular attractions to change phase instead of raising temperature. That energy is latent heat (mL).',
  'therm-u5-l1-q1':
    'A monatomic ideal gas stores energy only as motion in three directions, each contributing ½R per mole. So U = (3/2)nRT and the molar heat capacity at constant volume is Cv = 3R/2.',
  'therm-u5-l1-q2':
    'PV = nRT needs absolute pressure, measured from a vacuum. A tire gauge reading is gauge pressure (above atmospheric), so add about 101 kPa before using it in the gas law.',
  'therm-u5-l1-q3':
    'At the same temperature all gases have the same average translational kinetic energy, (3/2)kT per molecule. Lighter molecules therefore move faster, so speeds differ.',
  'therm-u5-l1-q4':
    'At constant volume, all heat raises internal energy. At constant pressure, the gas also expands and does work on its surroundings, so more heat is needed for the same temperature rise: Cp = Cv + R for an ideal gas.',
  'therm-u5-l1-q5':
    'The ideal gas model ignores molecular size and attractions. At high pressure or low temperature near condensation, molecules are close together, so these effects matter and the model’s predictions drift.',
  'therm-u5-l1-q6':
    'PV = nRT links pressure, volume and temperature at a single state. Heat depends on the process path between states, for example constant pressure versus constant volume, so the state equation alone cannot give Q.',
  'therm-u5-l1-q7':
    'γ = Cp/Cv = (5/2)R ÷ (3/2)R = 5/3 holds for an ideal monatomic gas whose atoms store energy only in three translational directions. Diatomic gases have more degrees of freedom and γ ≈ 7/5.',
  'therm-u6-l1-q1':
    'Boundary work is W = ∫P dV. In an isochoric process the volume does not change (dV = 0), so no boundary work is done. All heat goes into internal energy.',
  'therm-u6-l1-q2':
    'Adiabatic means no heat crosses the boundary (Q = 0). Work can still happen, and temperature usually changes. An adiabatic process need not be reversible.',
  'therm-u6-l1-q3':
    'The area under a process curve on a P–V diagram equals the boundary work, W = ∫P dV. It is positive for expansion (work by the gas) and negative for compression, so use signs and consistent units.',
  'therm-u6-l1-q4':
    'With Q = 0, the first law gives ΔU = −W_by. When the gas expands and does work, that energy comes from its internal energy, so internal energy and temperature drop.',
  'therm-u6-l1-q5':
    'In an isothermal expansion the gas does work, which would cool it, so heat must flow in to keep the temperature constant (Q = W_by for an ideal gas). Insulation would block that heat flow.',
  'therm-u6-l1-q6':
    'PVᵞ = constant holds only for a reversible (quasistatic, frictionless) adiabatic process of an ideal gas with constant heat capacities. Fast or irreversible adiabatic processes do not follow it.',
  'therm-u6-l1-q7':
    'In an isochoric process volume is fixed by definition. To create a change of state, you vary temperature, which changes pressure along a vertical line on the P–V diagram.',
  'therm-u7-l1-q1':
    'Heat and work depend on the path taken between two states, not just the start and end. Internal energy is a state function; heat and work are not.',
  'therm-u7-l1-q2':
    'In a complete cycle the system returns to its starting state. Internal energy is a state function, so its net change over the cycle is zero.',
  'therm-u7-l1-q3':
    'Adiabatic means Q = 0. The first law gives ΔU = Q − W_by = 0 − (positive work) < 0. The gas uses its own internal energy to do work, so it cools.',
  'therm-u7-l1-q4':
    'Work done on the system is the negative of work done by it: w_on = −W_by. If the gas does 100 J of work, then w_on = −100 J. Both conventions describe the same energy flow.',
  'therm-u7-l1-q5':
    'For an ideal gas, ΔU = nCvΔT, depending only on temperature. Computing ΔU that way and comparing with Q − W from the first law checks that signs and transfers were counted correctly.',
  'therm-u7-l1-q6':
    'Yes. Over a full cycle ΔU = 0, so net heat in equals net work out (Q_net = W_net). That is how heat engines turn heat into work.',
  'therm-u7-l1-q7':
    'For an ideal gas, internal energy depends only on temperature, so isothermal means ΔU = 0. For real substances, especially during phase changes, U also depends on volume or phase, so ΔU can be nonzero at constant temperature.',
  'therm-u8-l1-q1':
    'No. Adiabatic means no heat transfer. If the process is irreversible (with friction or rapid expansion), entropy is generated inside, so entropy rises. Only a reversible adiabatic process is isentropic.',
  'therm-u8-l1-q2':
    'Entropy change involves Q/T, so T must be an absolute temperature in kelvin. Using Celsius would give wrong values and could divide by zero at 0 °C.',
  'therm-u8-l1-q3':
    'The second law limits total entropy (system plus surroundings), which cannot decrease. A system can lose entropy, as when water freezes, if it releases enough heat to raise the surroundings’ entropy by more.',
  'therm-u8-l1-q4':
    'Quasistatic means very slow, passing through near-equilibrium states. If friction or other dissipation is present, entropy is still generated, so a slow process can still be irreversible.',
  'therm-u8-l1-q5':
    'Entropy is a state function defined by heat along a reversible path: ΔS = ∫dQ_rev/T. Any real path between the same states gives the same ΔS, even though the actual heat transferred differs.',
  'therm-u8-l1-q6':
    'When heat Q flows from hot (T_h) to cold (T_c), the hot body loses Q/T_h of entropy and the cold body gains Q/T_c. Since T_c < T_h, the gain is larger, so total entropy increases.',
  'therm-u8-l1-q7':
    'An ideal model can be set up with zero entropy generation, but real devices always have some friction, leaks or heat-transfer losses. Zero in the model does not mean a real machine is reversible.',
  'therm-u9-l1-q1':
    'Carnot efficiency = 1 − T_c/T_h, a ratio of temperatures, so both must be in kelvin. Using Celsius would give wrong results, and could even suggest efficiency above 100%.',
  'therm-u9-l1-q2':
    'No. A heat pump uses work to move heat from cold to warm. It delivers the moved heat plus the work, so heat delivered can exceed work input (COP > 1) while energy is still conserved.',
  'therm-u9-l1-q3':
    'In one complete cycle ΔU = 0, so heat in equals work out plus heat rejected: Q_h = W + Q_c. Work output is W = Q_h − Q_c, using positive magnitudes.',
  'therm-u9-l1-q4':
    'Carnot efficiency is a theoretical maximum for a reversible engine. Real engines have friction, finite-speed heat transfer, heat leaks and practical limits, all of which create entropy and lower efficiency.',
  'therm-u9-l1-q5':
    'A refrigerator’s job is to remove heat from the cold space: COP_R = Q_c ÷ W. A heat pump’s job is to deliver heat to the warm space: COP_HP = Q_h ÷ W. For the same device, COP_HP = COP_R + 1.',
  'therm-u9-l1-q6':
    'With T_h = T_c, Carnot efficiency 1 − T_c/T_h becomes 0: an engine cannot produce work. The ideal refrigerator COP, T_c ÷ (T_h − T_c), becomes infinite, an idealized limit, because no temperature difference needs to be overcome.',
  'therm-u9-l1-q7':
    'No. The panel is an idealized cycle model. Bills depend on real heating or cooling loads, weather, equipment losses, run time and electricity prices, none of which it models.',
  'therm-u10-l1-q1':
    'Joule showed that a fixed amount of mechanical work, such as falling weights turning a paddle in water, always produced the same temperature rise. That established that work and heat are both forms of energy (about 4.18 J per calorie).',
  'therm-u10-l1-q2':
    'No. At a given temperature, gas molecules have a spread of speeds (the Maxwell–Boltzmann distribution). Temperature sets the average kinetic energy, not one speed for every molecule.',
  'therm-u10-l1-q3':
    'No. Every model works only under certain conditions. Historically important models, like the ideal gas law or the caloric theory, can be useful approximations or even wrong outside their range.',
  'therm-u10-l1-q4':
    'Black’s latent heat experiments showed that ice absorbs a lot of heat while melting without its temperature changing. Heat and temperature are different: energy can change phase instead of raising temperature.',
  'therm-u10-l1-q5':
    'The first law is energy conservation: ΔU = Q − W. The second law sets the direction of processes: total entropy never decreases, so heat flows spontaneously from hot to cold and no engine is 100% efficient.',
  'therm-u10-l1-q6':
    'Individual molecules have widely different speeds and energies, but averages over huge numbers of molecules are very stable. Distributions connect that microscopic variety to measurable bulk properties like temperature and pressure.',
  'therm-u10-l1-q7':
    'Check systematically: are the model’s assumptions valid, units consistent, sign conventions correct, system boundaries the same and measurements reliable, and does the model leave out a process such as heat loss?',
  'therm-u6-l1-b-q1':
    'At constant pressure, work = P × ΔV = 100,000 Pa × 0.002 m³ = 200 J. First law: ΔU = Q − W = 300 J − 200 J = +100 J. Adding 300 + 200 gives the wrong 500 J; constant pressure does not mean ΔU = 0.',
  'therm-u6-l1-b-q2':
    'A full answer calculates the work (100,000 × 0.002 = 200 J), applies ΔU = heat added − work done, and subtracts 300 − 200 to get a 100 J increase in internal energy.',
  'therm-u6-l1-b-q3':
    'Isothermal means the temperature stays constant throughout the process. For an ideal gas, that requires heat to flow in or out to balance any work done.',
  'therm-u8-l1-b-q1':
    'Over a full cycle the engine’s internal energy returns to its start, so heat in = work out + heat rejected. Heat rejected = 500 J − 150 J = 350 J. 0 J would mean 100% efficiency, which the second law forbids.',
  'therm-u8-l1-b-q2':
    'A full answer notes a complete cycle has no net internal-energy change, writes heat input = work output + heat rejected, and subtracts 500 − 150 to get 350 J.',
  'therm-u8-l1-b-q3':
    'A system is the specific part of the world chosen for study, such as a gas in a cylinder, separated from its surroundings by a boundary. Energy transfers are counted as they cross that boundary.',
};
