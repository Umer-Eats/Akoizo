import { defineDeck, type Deck } from './presentation-types.ts';

// Dynamic Planet decks for lessons 6–10 (hydrographs, groundwater, lakes and wetlands, land use,
// and monitoring), imported by presentations-dynamic-planet.ts.

const hydrographs = defineDeck('dyn-u6-l1', [
  {
    kind: 'title',
    title: 'Streamflow, hydrographs, and floods',
    subtitle: 'Measure discharge, read its curve through time, and state flood odds honestly.',
    objectives: [
      'Interpret discharge through time.',
      'Distinguish flood probability and recurrence.',
      'Use continuity and optional hydraulic relations.',
    ],
    image: 'dp-flood-1993',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Discharge and stage',
    image: 'dp-gauge',
    caption:
      'A gauging station weir at Brant Broughton, England: a fixed structure makes the **stage–discharge** relation stable.',
    bullets: [
      '**Discharge** is volume passing a cross-section per time, often m³/s.',
      '**Stage** is the water-surface elevation relative to a reference.',
      'A **rating curve** links stage and discharge ==at one calibrated site==.',
      'Channel change or backwater can shift the rating.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Two rivers both reach a stage of 3 m. What can you conclude about their discharges?',
    options: [
      'They are equal',
      'Nothing directly; each site needs its own rating curve',
      'The wider river has less discharge',
      'Stage and discharge are the same quantity',
    ],
    answer: 1,
    explanation:
      'Stage is a height relative to a local datum; converting it to discharge needs that site’s calibrated rating.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Hydrograph components',
    image: 'dp-hydrograph',
    caption:
      'A stream hydrograph: discharge (m³/s) through the year, with sharp storm peaks above a slowly varying baseflow.',
    bullets: [
      'A hydrograph shows the **rising limb**, **peak**, and **recession**.',
      '**Lag time** depends on routing, storage, rainfall distribution and basin shape.',
      '==The area under the curve is volume==; peak alone is not.',
      'Read the axis units before estimating any area.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt:
      'Does each change usually make a storm hydrograph flashier (higher, sooner peak) or more subdued?',
    bins: ['Flashier', 'More subdued'],
    items: [
      ['Paving the basin with roads and roofs', 0],
      ['A large wetland upstream of the gauge', 1],
      ['Already saturated soils before the storm', 0],
      ['Dense forest with deep, permeable soils', 1],
      ['Storm drains piping water straight to the channel', 0],
      ['A long, narrow basin with slow routing', 1],
    ],
    explanation:
      'Fast connected pathways and saturation raise and quicken peaks; storage, infiltration and long routing spread them out.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Flood mechanisms',
    image: 'dp-flood-1993',
    caption:
      'Kaskaskia Island, Illinois, under water during the Great Flood of 1993 on the Mississippi.',
    bullets: [
      'Causes include **intense or prolonged rain**, **snowmelt**, **rain on snow**, obstructions and downstream effects.',
      '**Antecedent saturation** increases rapid runoff.',
      'A flood is ==a system response, not a single rainfall threshold==.',
      'Exposure and vulnerability shape the consequences.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt:
      'Which conditions can make the same rainstorm produce a bigger flood? Select all that apply.',
    options: [
      'Soils saturated by earlier rain',
      'Rain falling on a melting snowpack',
      'A debris jam blocking the channel',
      'A dry, deeply cracked soil before the storm',
    ],
    answers: [0, 1, 2],
    explanation:
      'Saturation, added snowmelt and obstructions raise flood response; dry soils usually absorb more rain first.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Flood probability',
    bullets: [
      'A **1% annual-exceedance** flood has a 1% chance of being exceeded ==in each year==.',
      'It does not happen exactly once per century; two years in a row can both exceed it.',
      'Estimates assume **independence** and **stationarity**.',
      'Land use, climate and channel change can shift the odds.',
    ],
    callout: 'A “100-year flood” last year gives no protective waiting period.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'For a 1% annual-exceedance flood, what is the chance (in %) of at least one exceedance in 30 independent years? Round to the nearest whole percent.',
    answer: 26,
    tolerance: 1,
    unit: '%',
    explanation: '1 − 0.99³⁰ ≈ 1 − 0.74 = 0.26, about 26%: far from negligible over a mortgage.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Mathematical extension',
    bullets: [
      'Continuity: ==Q = Av== links cross-sectional area and mean velocity.',
      'Open-channel relations add **roughness**, **hydraulic radius** and **slope**.',
      'Formulas for uniform steady flow may fail in a rapidly changing flood.',
      'Check units and model limits before substituting values.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: hydrograph volume',
    problem: 'A triangular hydrograph has base 4 h and peak 10 m³/s above zero. Find the volume.',
    steps: [
      'Convert 4 h to **14,400 s**.',
      'Area = ½ × base × peak.',
      'Volume = ½ × 14,400 × 10 = **72,000 m³**.',
    ],
    conclusion: 'Integration needs ==time in compatible units==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'In the lab, a runoff volume of 36,000 m³ is spread over a triangular event lasting 2 h. What is the peak (2V/D), in m³/s?',
    answer: 10,
    tolerance: 0,
    unit: 'm³/s',
    explanation: 'D = 7200 s, so peak = 2 × 36,000 / 7200 = 10 m³/s.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A flood moves at a mean velocity of 2.5 m/s through a cross-section of 40 m². What is the discharge, in m³/s?',
    answer: 100,
    tolerance: 0,
    unit: 'm³/s',
    explanation: 'Q = A × v = 40 × 2.5 = 100 m³/s.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Stage', back: 'Water elevation relative to a reference.' },
      { front: 'Hydrograph', back: 'Discharge versus time.' },
      { front: 'Rating curve', back: 'Site-specific stage–discharge relation.' },
      { front: 'Annual exceedance', back: 'Probability of exceeding a level in a year.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Stage** converts to discharge only through a site’s rating curve.',
      'Area under a hydrograph is **volume**; the peak is a rate.',
      'Floods come from rain, snowmelt, saturation and obstructions together.',
      'A 1% flood has a 1% chance ==every year==.',
      'Triangle peak = **2V/D** with time in seconds.',
    ],
  },
]);

const groundwater = defineDeck('dyn-u7-l1', [
  {
    kind: 'title',
    title: 'Groundwater, aquifers, karst, and Darcy flow',
    subtitle: 'How water is stored and moves below ground, and the law that describes it.',
    objectives: [
      'Distinguish porosity and permeability.',
      'Interpret hydraulic head and gradients.',
      'Apply Darcy’s law within assumptions.',
    ],
    image: 'dp-sinkhole',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Subsurface zones',
    image: 'dp-water-table',
    caption:
      'The **unsaturated zone** above the **water table**, the saturated **aquifer** below, a **perched water table** on an aquiclude, and a **spring** where the water table meets the surface.',
    bullets: [
      'Unsaturated pores hold both **air and water**; saturated pores are full.',
      'The water table is ==not the top of an underground river==.',
      'Groundwater sits in **pores and fractures**; karst adds conduits.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What is a perched water table?',
    options: [
      'The main water table under a mountain',
      'A local saturated zone sitting above a low-permeability layer, above the main water table',
      'Water stored in the atmosphere',
      'A water table that only exists during droughts',
    ],
    answer: 1,
    explanation:
      'A clay or other low-permeability lens can hold up a local saturated zone above the regional water table.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Storage and transmission',
    bullets: [
      '**Porosity** is the fraction of void space.',
      '**Permeability** is the ability to transmit fluid through connected pathways.',
      '==High porosity does not guarantee high permeability==: clay stores water but transmits it slowly.',
      'An **aquifer** transmits usable water; an **aquitard** restricts flow.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Is each material more likely to act as an aquifer or an aquitard?',
    bins: ['Aquifer', 'Aquitard'],
    items: [
      ['Well-sorted sand', 0],
      ['Clay', 1],
      ['Clean gravel', 0],
      ['Unfractured shale', 1],
      ['Fractured limestone', 0],
      ['Dense unfractured granite', 1],
    ],
    explanation:
      'Connected large pores or fractures transmit water; fine-grained or unfractured rock restricts it.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Head and pumping',
    image: 'dp-cone',
    caption:
      'Pumping a well lowers the water table into a **cone of depression**; the **drawdown** is greatest at the well.',
    bullets: [
      '**Hydraulic head** combines elevation and pressure.',
      'Flow goes ==from higher to lower head==, not simply downhill.',
      'A well level is a measurement with location, screen interval and timing.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A pumping well creates a cone of depression next to a stream. What can happen to the stream?',
    options: [
      'Nothing, because groundwater and streams are unconnected',
      'Groundwater flow toward the stream can drop, or stream water can be drawn into the aquifer',
      'The stream always floods',
      'The stream’s water becomes saltier immediately',
    ],
    answer: 1,
    explanation:
      'Lowered head near the stream reduces baseflow or reverses the gradient, sometimes after a delay.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Darcy’s law (extension)',
    image: 'dp-darcy',
    caption:
      'A Darcy column: water flows through sand of length **L** while gauges read the head at each end.',
    bullets: [
      '==Q = KAi==, where i = head drop ÷ length.',
      '**K** has length/time units; **i** is dimensionless.',
      'Darcy flux Q/A is not pore velocity, which also needs **effective porosity**.',
      'Turbulent conduit flow can violate the model.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: Darcy flow',
    problem: 'K = 0.001 m/s, A = 10 m², and the head drops 2 m over 100 m. Find Q.',
    steps: [
      'Gradient **i = 2/100 = 0.02**.',
      'Q = 0.001 × 10 × 0.02.',
      '**Q = 0.0002 m³/s**, toward lower head.',
    ],
    conclusion: 'Pore velocity ==needs effective porosity too==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'K = 0.0005 m/s, A = 20 m², and the gradient is 0.01. What is Q, in m³/s?',
    answer: 0.0001,
    tolerance: 0.000001,
    unit: 'm³/s',
    explanation: 'Q = KAi = 0.0005 × 20 × 0.01 = 0.0001 m³/s.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Karst',
    image: 'dp-sinkhole',
    caption:
      'Red Lake near Imotski, Croatia: a deep **collapse sinkhole** in limestone holding a lake.',
    bullets: [
      'Dissolution of **limestone** can produce sinkholes, caves and conduits.',
      'Rapid preferential flow ==links surface contamination to groundwater== with little filtration.',
      'Surface divides may not match subsurface contributing areas.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Why is karst groundwater especially vulnerable to contamination?',
    options: [
      'Limestone adds toxins to water',
      'Conduits carry water quickly with little filtration',
      'Karst aquifers never recharge',
      'Sinkholes only occur in deserts',
    ],
    answer: 1,
    explanation:
      'Open conduits transmit water fast, so surface pollutants can reach springs and wells within hours or days.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Interpreting groundwater',
    steps: [
      { label: 'Geology', detail: 'Map **units and boundaries**.' },
      { label: 'Heads', detail: 'Compare well levels with construction and timing.' },
      { label: 'Direction', detail: 'Draw flow ==toward lower head==.' },
      {
        label: 'Calculate',
        detail: 'Apply Darcy and name the missing porosity, dispersion and reaction data.',
      },
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the groundwater summary.',
    text: 'Void space is measured by {0}; the ability to transmit water is {1}. Groundwater flows toward lower hydraulic {2}.',
    blanks: ['porosity', 'permeability', 'head'],
    distractors: ['salinity', 'elevation', 'turbidity'],
    explanation: 'Porosity stores, permeability transmits, and head differences drive flow.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Porosity', back: 'Void-space fraction.' },
      {
        front: 'Hydraulic conductivity',
        back: 'Transmission coefficient including medium and fluid effects.',
      },
      { front: 'Hydraulic head', back: 'Elevation-plus-pressure potential measure.' },
      { front: 'Darcy flux', back: 'Volumetric flow per bulk cross-sectional area.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'The water table separates **unsaturated** and **saturated** zones.',
      '==Porosity stores; permeability transmits.==',
      'Groundwater flows toward **lower head**; pumping makes a cone of depression.',
      'Darcy: **Q = KAi** for laminar saturated flow.',
      'Karst conduits move water and contaminants fast.',
    ],
  },
]);

const lakes = defineDeck('dyn-u8-l1', [
  {
    kind: 'title',
    title: 'Lakes, wetlands, and freshwater storage',
    subtitle: 'How basins form, how lakes layer and mix, and what wetlands can and cannot do.',
    objectives: [
      'Compare formation mechanisms.',
      'Explain lake stratification and turnover.',
      'Connect wetland hydrology to function.',
    ],
    image: 'dp-bog',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Lake formation',
    bullets: [
      'Depressions form by **glaciation, tectonics, volcanism, river cutoffs, landslides** or **dams**.',
      'Formation controls basin shape, ==not present chemistry==.',
      'A **reservoir** is managed storage with operating rules.',
      'Closed basins still lose water by evaporation or seepage.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each lake to the process that formed its basin.',
    pairs: [
      ['Oxbow lake', 'River meander cutoff'],
      ['Crater lake', 'Volcanic collapse'],
      ['Rift lake', 'Tectonic faulting'],
      ['Kettle lake', 'Melting of buried glacial ice'],
    ],
    explanation: 'Each process leaves a characteristic basin shape and depth.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Thermal layers',
    image: 'dp-lake-strat',
    caption:
      'A stratified lake: a warm upper layer (**epilimnion**), a sharp transition (**metalimnion**), and a cold deep layer (**hypolimnion**).',
    bullets: [
      'Warm water is less dense and floats on cold water.',
      'Mixing regimes vary with **climate, depth, salinity, wind and ice**.',
      '==Turnover is not identical twice a year in every lake==.',
      'One surface temperature cannot describe the water column.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the layers of a summer-stratified lake from surface to bottom.',
    items: ['Epilimnion', 'Metalimnion (thermocline)', 'Hypolimnion', 'Sediments'],
    explanation:
      'Warm mixed water sits on top, the thermocline separates it, and cold dense water lies on the sediments.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Oxygen and nutrients',
    bullets: [
      'Stratification ==cuts off oxygen renewal at depth== while decomposition consumes it.',
      'Nutrients accumulate in sediments and deep water.',
      '**Turnover** redistributes them, changing productivity.',
      '**Trophic labels** summarize nutrient status but are not health scores.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Late in summer, a stratified lake’s bottom water has very low oxygen. What is the main cause?',
    options: [
      'Sunlight destroys oxygen at depth',
      'Decomposition uses oxygen while stratification blocks resupply from the surface',
      'Fish breathe only at the bottom',
      'Cold water cannot hold any oxygen',
    ],
    answer: 1,
    explanation:
      'Cold water can hold plenty of oxygen, but once isolated, decomposers use it up with no mixing to replace it.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Wetland diversity',
    image: 'dp-coastal-marsh',
    caption:
      'A USGS wetland profile from upland through **swamp forest and shrub**, **meadow** and **emergent marsh** to **submergent** plants in open water.',
    bullets: [
      'Wetlands are defined by **hydrology, soils and adapted organisms**.',
      '**Marshes**: herbaceous plants. **Swamps**: woody plants.',
      '**Peatlands** accumulate partly decomposed organic matter.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'A bog',
    image: 'dp-bog',
    caption:
      'An open bog at Lauhanvuori, Finland: moss-covered peat with scattered pines and pools.',
    bullets: [
      '**Bogs** are fed mainly by rain and are acidic and nutrient-poor.',
      '**Fens** receive groundwater and are ==richer in minerals==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each description a marsh, a swamp, or a bog?',
    bins: ['Marsh', 'Swamp', 'Bog'],
    items: [
      ['Reeds and cattails in shallow water', 0],
      ['Flooded forest of cypress trees', 1],
      ['Acidic sphagnum peat fed mainly by rain', 2],
      ['Grassy tidal wetland along a coast', 0],
      ['Shrubs and trees standing in seasonal floodwater', 1],
      ['Nutrient-poor peatland with carnivorous plants', 2],
    ],
    explanation:
      'Herbaceous plants mark marshes, woody plants mark swamps, and rain-fed acidic peat marks bogs.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Wetland functions and limits',
    image: 'dp-marsh',
    caption:
      'Reed marsh in the New Jersey Meadowlands, an urban wetland that stores floodwater and supports wildlife.',
    bullets: [
      'Wetlands can **store water**, **delay flow**, **retain nutrients** and **accumulate carbon**.',
      'Performance depends on connectivity, residence time, loading and redox.',
      'They ==do not remove every contaminant forever==; material can be remobilized.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which statements about wetlands are supported? Select all that apply.',
    options: [
      'They can lower and delay flood peaks',
      'They can transform nitrate through denitrification',
      'They remove every pollutant permanently',
      'Draining one can release stored carbon',
    ],
    answers: [0, 1, 3],
    explanation:
      'Wetlands store and transform, but stored material can return when conditions change.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: storage and conservation',
    problem:
      'A storage feature lowers peak outflow but releases the same event volume later. Was water destroyed?',
    steps: [
      'Compare integrated **inflow and outflow**.',
      'Temporary storage changes **timing**.',
      'Equal total volume is consistent with conservation.',
    ],
    conclusion: '==A lower peak does not mean permanent removal.==',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A wetland halves a flood’s peak outflow. What happened to the floodwater volume?',
    options: [
      'Half of it was destroyed',
      'It was stored for a time and released more slowly, or lost by evaporation or infiltration',
      'It doubled',
      'It became groundwater instantly',
    ],
    answer: 1,
    explanation:
      'Attenuation spreads the same volume over a longer time unless water truly leaves by another pathway.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Stratification', back: 'Layering that limits mixing.' },
      { front: 'Turnover', back: 'Water-column mixing under suitable conditions.' },
      { front: 'Peat', back: 'Accumulated partly decomposed organic material.' },
      { front: 'Attenuation', back: 'Reduction or spreading of a flow peak.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Lake basins form by glaciers, faults, volcanoes, cutoffs, landslides and dams.',
      'Summer lakes stratify into **epilimnion, metalimnion and hypolimnion**.',
      'Isolated deep water ==can lose its oxygen==.',
      'Marshes, swamps and bogs differ in plants and water source.',
      'Storage **attenuates** peaks without destroying volume.',
    ],
  },
]);

const landUse = defineDeck('dyn-u9-l1', [
  {
    kind: 'title',
    title: 'Land use, water pollution, and hydrological impacts',
    subtitle:
      'How surfaces, structures and sources change runoff, recharge and what water carries.',
    objectives: [
      'Trace changes in runoff and recharge.',
      'Distinguish concentration and load.',
      'Evaluate management with matched observations.',
    ],
    image: 'dp-parking-lot',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Land-cover pathways',
    image: 'dp-parking-lot',
    caption:
      'A large parking lot in Gross-Gerau, Germany: rain on this **impervious** surface runs off almost at once.',
    bullets: [
      'Vegetation, soil structure, compaction and **impervious cover** control infiltration and timing.',
      'Urban drains create ==fast connected pathways==.',
      'A basin-wide percentage can hide where surfaces connect to channels.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Connected drainage',
    image: 'dp-storm-drain',
    caption:
      'A street **storm drain** carries runoff, and whatever it picks up, straight toward a stream.',
    bullets: [
      'Storm drains ==bypass soil filtering==.',
      'Map pathways and storage, not only total paved area.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A town disconnects its roof downspouts so they drain onto lawns. What is the most likely effect?',
    options: [
      'Faster and higher storm peaks',
      'More infiltration and a slower, smaller runoff response',
      'No change, since total paved area is the same',
      'Lower groundwater recharge',
    ],
    answer: 1,
    explanation:
      'Disconnecting impervious surfaces routes water through soil, increasing infiltration and slowing runoff.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Flow alteration',
    bullets: [
      '**Dams, diversions, withdrawals and drainage** change magnitude, timing, temperature and connectivity.',
      'A reduced peak can coexist with ==changed low flows or sediment transport==.',
      'Groundwater pumping can reduce streamflow after a delay.',
      'A **flow regime** is seasonal and event behavior, not only the annual average.',
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which can be downstream effects of a large dam? Select all that apply.',
    options: [
      'Lower flood peaks',
      'Trapped sediment and channel erosion below the dam',
      'Changed water temperature',
      'Guaranteed higher low flows in every season',
    ],
    answers: [0, 1, 2],
    explanation:
      'Dams store water and sediment and release water of different temperature; low flows depend on operating rules.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Pollutant transport',
    bullets: [
      'Sediment, nutrients, salts, pathogens and chemicals follow **different pathways**.',
      '==Load rate = concentration × discharge== in compatible units.',
      'Storms can raise total transport even when dilution lowers concentration.',
      'Dissolved and particulate forms respond differently.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: load rate',
    problem: 'Concentration is 2 mg/L and discharge is 3 m³/s. Find the load rate.',
    steps: [
      'Convert 3 m³/s to **3000 L/s**.',
      '2 mg/L × 3000 L/s = **6000 mg/s**.',
      'Report **6 g/s**.',
    ],
    conclusion: 'Concentration alone is ==not transported mass per time==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Nitrate is 5 mg/L in a stream flowing at 2 m³/s. What is the nitrate load rate, in g/s?',
    answer: 10,
    tolerance: 0,
    unit: 'g/s',
    explanation: '2 m³/s = 2000 L/s; 5 mg/L × 2000 L/s = 10,000 mg/s = 10 g/s.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Management mechanisms',
    image: 'dp-riparian',
    caption:
      'A riparian area between upland and stream: vegetation and soils sit just above the water table along the channel margin.',
    bullets: [
      '**Riparian buffers**, erosion control, infiltration practices, treatment and **source reduction** target different causes.',
      'A measure may reduce one pollutant but not another.',
      'Infiltration ==can carry contaminants down== if the source is dirty.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each practice to the problem it mainly addresses.',
    pairs: [
      ['Riparian buffer', 'Sediment and nutrients from adjacent fields'],
      ['Silt fence at a construction site', 'Soil erosion during building'],
      ['Rain garden', 'Fast runoff from roofs and pavement'],
      ['Reduced fertilizer application', 'Nutrient source strength'],
    ],
    explanation: 'Each practice works on a specific pathway; none is universally effective.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Monitoring inference',
    bullets: [
      'Compare **similar seasons and flows**, with reference sites.',
      'A before/after change is ==not automatically caused by the intervention==.',
      'Repeated samples reduce random variability but not **sensor bias**.',
      'Include discharge and timing when estimating loads.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Nitrate fell after a buffer was planted, but the “after” year was a drought. What is the best next step?',
    options: [
      'Declare the buffer a success',
      'Compare with a reference stream and matched flow conditions',
      'Stop monitoring',
      'Assume the drought had no effect',
    ],
    answer: 1,
    explanation:
      'Low flow changes loads and concentrations by itself; a reference site separates weather from the intervention.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Using the event model',
    problem:
      'Rain is 20 mm on 2 km². Urbanization raises the runoff fraction from 0.30 to 0.60. Compare direct runoff.',
    steps: [
      'Rain volume stays **40,000 m³**.',
      'Before: 0.30 × 40,000 = **12,000 m³**.',
      'After: 0.60 × 40,000 = **24,000 m³**, and the synthetic peak doubles too.',
    ],
    conclusion:
      'The model shows one consequence; ==it does not estimate recharge or pollutant chemistry==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'In the lab, 10 mm of rain falls on 3 km² with a runoff fraction of 0.40. What is the direct runoff, in m³?',
    answer: 12000,
    tolerance: 0,
    unit: 'm³',
    explanation: '10 mm × 3 km² = 30,000 m³ of rain; 0.40 × 30,000 = 12,000 m³.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Impervious', back: 'Strongly restricting infiltration through a surface.' },
      { front: 'Flow regime', back: 'Pattern of flow magnitude and timing.' },
      { front: 'Load rate', back: 'Concentration × discharge.' },
      { front: 'Riparian', back: 'Associated with river margins.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Connected** impervious surfaces speed and raise runoff.',
      'Dams and withdrawals change the whole **flow regime**.',
      '==Load = concentration × discharge.==',
      'Each management practice targets a specific pathway.',
      'Matched comparisons separate the intervention from the weather.',
    ],
  },
]);

const monitoring = defineDeck('dyn-u10-l1', [
  {
    kind: 'title',
    title: 'Maps, monitoring, and integrated freshwater investigations',
    subtitle:
      'Read maps and cross sections, pick the right instruments, and link evidence to mechanism.',
    objectives: [
      'Read map scales and contours.',
      'Match monitoring tools to questions.',
      'Synthesize evidence with uncertainty.',
    ],
    image: 'dp-topo-map',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Map literacy',
    image: 'dp-contours',
    caption:
      'A hill’s profile projected down onto **contour lines**: close spacing means a steep slope, wide spacing a gentle one.',
    bullets: [
      'Check **title, projection, scale, units, date and legend**.',
      'Contours connect ==equal elevation==; colors may encode categories, not height.',
      'Resolution sets which channels or wetlands are shown.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'On a topographic map, contour lines bunch tightly together on one side of a hill. What does this show?',
    options: ['A gentle slope', 'A steep slope', 'A lake', 'A higher contour interval'],
    answer: 1,
    explanation:
      'Closely spaced contours mean elevation changes quickly over a short distance: a steep slope.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Cross sections',
    bullets: [
      'A cross section turns a surface path into **elevation and subsurface** relationships.',
      'Land surface, water table, head and aquifer boundaries are **different lines**.',
      '**Vertical exaggeration** makes slopes look steeper.',
      'Without scale, a diagram ==cannot support a precise gradient==.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: hydraulic gradient',
    problem: 'Two wells have heads of 110 and 106 m, 200 m apart. Find the gradient magnitude.',
    steps: [
      'Head drop is **4 m**.',
      'Gradient = 4/200 = **0.020**.',
      'Flow is toward the **lower head** under the model.',
    ],
    conclusion: 'Land-surface slope ==is not the calculation==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'Two wells 500 m apart have heads of 215 m and 210 m. What is the hydraulic gradient?',
    answer: 0.01,
    tolerance: 0.0001,
    explanation: 'Head drop 5 m ÷ 500 m = 0.01, directed toward the 210 m well.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Monitoring tools',
    image: 'dp-gauge',
    caption: 'A stream gauging weir records stage continuously; a rating converts it to discharge.',
    bullets: [
      '**Rain gauges, stream gauges, wells, loggers and remote sensing** answer different questions.',
      'Instruments need **calibration** and good placement.',
      'Satellites show extent but ==not depth or subsurface flow==.',
      'Continuous loggers resolve timing; manual samples give chemistry.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each question to the best tool.',
    pairs: [
      ['How fast did the river rise during the storm?', 'Continuous stream gauge'],
      ['Is the water table falling over years?', 'Monitoring well'],
      ['How large an area flooded?', 'Satellite image'],
      ['What was the phosphorus concentration?', 'Water sample analyzed in a lab'],
    ],
    explanation: 'Each tool measures one part of the system; combine them around the mechanism.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Sampling design',
    bullets: [
      'Define **hypotheses, sites, intervals, depths and event triggers**.',
      'Include **references, duplicates** and instrument checks.',
      'Low-flow-only sampling ==misses storm transport==; storm-only sampling misses baseflow.',
      'Record gaps rather than interpolating a dramatic event.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which choices strengthen a sampling plan for storm pollution? Select all that apply.',
    options: [
      'Triggering samples on rising stage',
      'Adding an upstream reference site',
      'Sampling only on dry, sunny days',
      'Collecting field duplicates',
    ],
    answers: [0, 1, 3],
    explanation:
      'Event triggers, references and duplicates target storms and quantify error; dry-day sampling misses the event.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Integrated case: a flashy urban stream',
    steps: [
      { label: 'Rainfall', detail: 'Measure storm **depth and timing**.' },
      { label: 'Pathways', detail: 'Map **connected impervious** areas.' },
      { label: 'Response', detail: 'Read the hydrograph lag and peak.' },
      { label: 'Quality', detail: 'Link samples to flow ==to estimate loads==.' },
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Optional synthesis',
    bullets: [
      'The lab offers a **conserved event model** and an independent **Darcy model**.',
      'Compare their **units, inputs and assumptions**.',
      'Adding their outputs ==without a defined connection is meaningless==.',
      'Synthesis links models through explicit interfaces and checks them against data.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Well levels in a region are falling. Which evidence best tests whether pumping is the cause?',
    options: [
      'One photo of a dry streambed',
      'Head records compared with pumping history and recharge, plus wells outside the pumped area',
      'The average rainfall for one month',
      'A map of land-surface elevation',
    ],
    answer: 1,
    explanation:
      'Linking heads to pumping and recharge, with comparison wells, separates pumping from drought.',
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Which lab model does each input belong to?',
    bins: ['Event runoff model', 'Darcy model'],
    items: [
      ['Rainfall depth', 0],
      ['Hydraulic conductivity K', 1],
      ['Basin area', 0],
      ['Head difference', 1],
      ['Runoff fraction', 0],
      ['Flow length', 1],
    ],
    explanation:
      'The two models have separate inputs and units; joining them needs an explicit defined connection.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Datum', back: 'Reference for elevation or position.' },
      { front: 'Resolution', back: 'Scale of distinguishable detail.' },
      { front: 'Hydraulic gradient', back: 'Head difference per flow length.' },
      { front: 'Monitoring design', back: 'Plan connecting observations to a question.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Read the **legend, scale and datum** before interpreting a map.',
      'Close contours mean ==steep slopes==.',
      'Gradient = **head drop ÷ distance**, not land slope.',
      'Each instrument answers a specific question; combine them.',
      'Design sampling to separate competing explanations.',
    ],
  },
]);

export const dynamicPlanetDecksFlow: Deck[] = [
  hydrographs,
  groundwater,
  lakes,
  landUse,
  monitoring,
];
