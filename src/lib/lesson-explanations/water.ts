// Checkpoint explanations for Water Quality, keyed by question id.
export const waterQuality: Record<string, string> = {
  'water-u1-l1-q1':
    'Water is conserved, so the change in storage over a period equals everything that came in minus everything that went out: ΔS = inputs − outputs. If inflow exceeds outflow, storage rises.',
  'water-u1-l1-q2':
    'Lakes and estuaries can stratify: a warm or fresh surface layer floats over denser bottom water and they barely mix. Bottom water can lose oxygen to decomposition while the surface stays well oxygenated, so a surface-only sample misses it.',
  'water-u1-l1-q3':
    'Respiration by animals, plants, algae and bacteria uses oxygen to break down organic matter, releasing CO₂. In water, it is a major cause of oxygen decline, especially at night when no photosynthesis replaces the oxygen.',
  'water-u1-l1-q4':
    'Storage is an amount present at a moment (for example m³ of water). Flux is a rate of movement (for example m³ per day). Mixing them gives wrong units and confuses how much is there with how fast it is changing.',
  'water-u1-l1-q5':
    'Extra nutrients fuel algal blooms. When the algae die, bacteria decompose them and consume oxygen in the process. Oxygen can therefore drop days or weeks after the nutrient input, especially in bottom water.',
  'water-u1-l1-q6':
    'Water density increases as temperature drops (down to about 4 °C for fresh water) and as salinity rises. Differences in temperature and salinity create layers that resist mixing.',
  'water-u1-l1-q7':
    'Record where and at what depth the sample was taken, the date and time, the tide stage, the method or instrument used and the units. Without these, results cannot be compared or repeated.',
  'water-u2-l1-q1':
    'pH = −log[H⁺], so each unit is a factor of 10 in hydrogen-ion concentration. pH 6 has ten times more H⁺ than pH 7. It is not a salinity or oxygen measure.',
  'water-u2-l1-q2':
    'Every test has a detection limit. "Not detected" means the level was below that limit, not that the substance is absent or the water is safe. A more sensitive method might still find it.',
  'water-u2-l1-q3':
    'BOD (biochemical oxygen demand) is how much oxygen microbes use to break down organic matter in a sample over a set time, usually five days at 20 °C. It shows pollution load, unlike dissolved oxygen, which shows how much oxygen is present now.',
  'water-u2-l1-q4':
    'Conductivity rises with temperature as well as salt content, and each meter responds slightly differently. Calibrating with standards and correcting for temperature lets conductivity be converted to salinity accurately.',
  'water-u2-l1-q5':
    'Water can form layers that differ in temperature, salinity and oxygen. Sampling only the surface can miss low-oxygen or saltier bottom water, so comparing depths shows whether the water column is mixed or stratified.',
  'water-u2-l1-q6':
    'A chemical test shows conditions at one moment. Organisms like aquatic insects live there for weeks or months, so their community reflects long-term conditions, including pollution pulses a single sample might miss. Habitat and sampling still affect what is found.',
  'water-u2-l1-q7':
    'A duplicate checks precision, whether repeated samples agree. If both samples share the same error, such as a miscalibrated meter or contaminated bottle, they will agree and still both be wrong.',
  'water-u3-l1-q1':
    'No. Disinfection, such as chlorine or UV, kills or inactivates microbes. Dissolved salts need different treatment, such as reverse osmosis or distillation. Each step targets specific contaminants.',
  'water-u3-l1-q2':
    'Nutrients fuel algal growth; as algae die, bacteria decompose them, and both respiration and decomposition consume dissolved oxygen. This eutrophication sequence can create low-oxygen dead zones.',
  'water-u3-l1-q3':
    'A load is the mass of a pollutant carried per unit time: load = concentration × flow rate, for example (mg/L) × (L/s) = mg/s. High concentration in a trickle can carry less than a moderate concentration in a large river.',
  'water-u3-l1-q4':
    'Filtration physically removes particles, including some microbes, depending on pore size. Disinfection chemically or physically inactivates microbes that remain, often with chlorine or UV. Treatment plants usually use both.',
  'water-u3-l1-q5':
    'Rain and drought change river flow, which changes how diluted pollutants are and how much runoff enters. A before-and-after comparison could reflect the weather rather than a treatment, unless weather is tracked.',
  'water-u3-l1-q6':
    'Source control stops pollution before it enters water, for example applying fertilizer at the right time and rate, planting buffer strips or upgrading wastewater treatment to remove nitrogen and phosphorus. Effects should be checked locally.',
  'water-u3-l1-q7':
    'Nutrients stored in sediments can keep being released into the water for years, and ecosystems take time to rebuild. Water quality may improve slowly even after outside inputs drop.',
  'water-u4-l1-q1':
    'Energy flows one way through a food web: at each step most is lost as heat and cannot be reused. Matter, such as carbon and nitrogen, is recycled by decomposers and reused by producers.',
  'water-u4-l1-q2':
    'Habitat is the physical place where an organism lives, such as a coral reef or estuary mudflat. Its niche is broader: its role, including what it eats, when it is active and how it interacts with other species.',
  'water-u4-l1-q3':
    'No. Richness counts how many species there are; evenness describes how equally individuals are spread among them. Two sites can each have 5 species, but one may be dominated by a single species while the other has equal numbers of each.',
  'water-u4-l1-q4':
    'In open water, phytoplankton reproduce so fast that a small standing biomass can feed a larger biomass of zooplankton. The pyramid of biomass looks upside-down even though the energy pyramid is still upright.',
  'water-u4-l1-q5':
    'Carrying capacity is the population an environment can support with its current resources. If food, space, temperature or pollution change, carrying capacity changes too, so it is not a fixed number.',
  'water-u4-l1-q6':
    'Comparisons can be distorted by different sampling effort (time or net size), habitat type, season or how easy the species are to detect. A site may look more diverse simply because it was sampled more.',
  'water-u4-l1-q7':
    'Photosynthesis adds oxygen during daylight and respiration removes it day and night. Oxygen usually peaks in the afternoon and is lowest before dawn, so one daytime reading can miss dangerously low night levels.',
  'water-u5-l1-q1':
    'No. Bleaching happens when stressed corals, often from high temperature, expel their symbiotic algae and turn white. If conditions improve quickly, corals can regain the algae and recover; long or severe bleaching can kill them.',
  'water-u5-l1-q2':
    'Mixing equal amounts of fresh water (salinity 0) and seawater (35) gives a weighted average: (0 + 35) ÷ 2 = 17.5. A mixture cannot be saltier than its saltiest source, so 35 or 70 are impossible.',
  'water-u5-l1-q3':
    'A barrier reef runs roughly parallel to the coast and is separated from it by a lagoon, as in the Great Barrier Reef. A fringing reef grows right against the shore, and an atoll forms a ring around a lagoon with no central island.',
  'water-u5-l1-q4':
    'The simple mixing model assumes salt is conservative, neither added nor removed, and that the water is a mix of just the two stated sources (endmembers). Evaporation, extra freshwater inputs or a third source would break the calculation.',
  'water-u5-l1-q5':
    'Rivers carry sediment, nutrients and pollutants from land use, such as farming, logging and cities, out to the coast. Excess sediment blocks light and nutrients feed algae that compete with corals, so reef health depends on upstream practices.',
  'water-u5-l1-q6':
    'Ocean acidification is a chemical change: absorbed CO₂ lowers pH and carbonate availability, making it harder for corals to build skeletons. Bleaching is a stress response, usually to heat, in which corals expel their symbiotic algae. Both harm reefs by different mechanisms.',
  'water-u5-l1-q7':
    'In estuaries, the tide pushes seawater in and then lets river water dominate as it goes out. Salinity and other properties can change within hours, so samples need the tide stage to be interpreted and compared.',
  'water-u6-l1-q1':
    'Corals are cnidarians, like jellyfish and sea anemones. Their polyps have tentacles with stinging cells (cnidocytes) for capturing food. Mollusks, crustaceans and echinoderms are separate animal groups.',
  'water-u6-l1-q2':
    'Many reef animals have larvae that drift in currents before settling. Where they settle connects distant populations, so recruitment (new individuals joining a population) at one reef can depend on larvae produced elsewhere.',
  'water-u6-l1-q3':
    'No. One indicator species reflects only the conditions it is sensitive to. Water can still contain other pollutants it does not respond to, so a full assessment needs several indicators and direct measurements.',
  'water-u6-l1-q4':
    'Sponges have no tentacles; water is drawn in through many pores and channels where cells filter out food particles. Corals have polyps with stinging tentacles to catch plankton, and they also get food from photosynthetic algae living in their tissues.',
  'water-u6-l1-q5':
    'One common name can refer to different species in different places, and one species can have several common names. The scientific name is unique, so pairing them avoids confusion.',
  'water-u6-l1-q6':
    'The number of adults today reflects how many young settled and survived in earlier months or years. A recent improvement in water quality may not yet show in adult numbers, and a recent decline may also take time to appear.',
  'water-u6-l1-q7':
    'Algal cover rises with more nutrients and light and falls with grazing by fish and urchins. Disturbance like storms or bleaching can open space for algae, and substrate type matters. A full answer names a few and notes they can act together.',
  'water-u7-l1-q1':
    'No. Zeroing only sets the starting point. The meter could still respond too strongly or too weakly at higher salinities (a slope error). Calibrating with standards across the range checks the whole response.',
  'water-u7-l1-q2':
    'A refractometer measures how much light bends as it enters the sample (refractive index). Dissolved salt increases refractive index, so the reading can be calibrated to salinity.',
  'water-u7-l1-q3':
    'A mixture of two waters is a weighted average of their properties, so its value must lie between the two endmembers. A mixture saltier or fresher than both sources suggests an error or another process such as evaporation.',
  'water-u7-l1-q4':
    'Conductivity, density and refractive index all change with temperature as well as salinity. Without the temperature, you cannot correct the reading or compare it fairly with calibration standards.',
  'water-u7-l1-q5':
    'A standard is a solution with a precisely known value, such as 35 ppt salt water. Measuring standards shows how the instrument responds, so unknown readings can be converted to accurate values.',
  'water-u7-l1-q6':
    'A calibration is tested only between the lowest and highest standards. Beyond that range the instrument’s response may curve or level off, so values outside it are unreliable.',
  'water-u7-l1-q7':
    'Volume-weighted mixing assumes volumes simply add and the result is reported per volume. If the two waters have very different densities, volumes do not quite add, or salinity is reported per mass, mass weighting is needed.',
  'water-u8-l1-q1':
    'No. If the instrument reads consistently high or low, every sample has the same error. More samples improve precision but not accuracy; only recalibrating fixes bias.',
  'water-u8-l1-q2':
    'A strong conclusion states what the data show (evidence), explains why it happens (mechanism) and states what the data cannot show (limitations). That makes it specific and testable.',
  'water-u8-l1-q3':
    'Writing units right next to each equation or method shows how to use it, for example whether flow is in L/s or m³/s. Units on a cover page are easily missed under time pressure.',
  'water-u8-l1-q4':
    'Load is mass per time, so it needs flow (volume per time) multiplied by concentration, plus a defined period. Concentration alone shows how polluted the water is, not how much pollutant is moving.',
  'water-u8-l1-q5':
    'In estuaries, high tide brings in seawater and low tide brings more river water. Sampling at different tide stages shows the full range of conditions and how much each water source contributes.',
  'water-u8-l1-q6':
    'Record the specific mistake in reasoning or observation and write a rule that applies to future problems, such as "check units before calculating load". That prevents the same error on different questions.',
  'water-u8-l1-q7':
    'A good new measurement gives different results depending on which explanation is correct. For low oxygen, measuring BOD or nutrients could separate decomposition from simple stratification, strengthening the causal claim.',
  'water-u9-l1-q1':
    'A garbage patch is a large area of a gyre where floating debris, mostly small plastic fragments, collects at higher concentration than nearby water. It is not a solid island you could walk on, and it holds only part of all ocean plastic.',
  'water-u9-l1-q2':
    'Detecting a contaminant shows it is present above the method’s detection limit. It does not show its source, whether it is increasing or whether it harms health at that level; those need more data.',
  'water-u9-l1-q3':
    'No. Sunlight and waves break plastic into smaller pieces (microplastics), but the polymer is still there. Fragmentation spreads the plastic over more particles; true degradation into other molecules is much slower.',
  'water-u9-l1-q4':
    'The five major subtropical gyres are the North Pacific, South Pacific, North Atlantic, South Atlantic and Indian Ocean gyres. Rotating currents in each concentrate floating debris toward the center.',
  'water-u9-l1-q5':
    'Different methods catch different particle sizes, for example nets with 0.33 mm mesh versus finer filtration. Counts from methods with different size ranges measure different particles and cannot be compared directly.',
  'water-u9-l1-q6':
    'A blank is a clean sample handled just like the real ones. If it picks up particles or contaminants, they came from the equipment, air or lab, not the water. That amount can be subtracted or the problem fixed.',
  'water-u9-l1-q7':
    'If plastic and other pollutants keep entering the ocean, cleaned areas fill up again. Reducing inputs at the source stops the supply, while cleanup only removes part of what is already there.',
  'water-u7-l1-b-q1':
    'The unknown’s reading lies halfway between the 4.0% and 6.0% standards, so its concentration is about halfway: 5.0% mass/volume. 50% and 0.5% are off by a factor of ten, and 5% m/v is 50 g/L, not 5 g/kg.',
  'water-u7-l1-b-q2':
    'A full answer notes the unknown falls halfway between the two nearest calibration standards, takes the value halfway between 4.0% and 6.0% to get about 5.0% m/v, and mentions that the real calibration may not be perfectly linear.',
  'water-u7-l1-b-q3':
    'Mass/volume percent is grams of solute in every 100 mL of the final solution. 5% m/v salt water has 5 g of salt in each 100 mL of solution. It is not grams per 100 mL of starting water or grams per kilogram.',
};
