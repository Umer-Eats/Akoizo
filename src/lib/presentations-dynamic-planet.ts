import { defineDeck, type Deck } from './presentation-types.ts';
import { dynamicPlanetDecksFlow } from './presentations-dynamic-planet-2.ts';

// Dynamic Planet (Division C, freshwater) presentations, one per lesson, following
// presentations-anatomy.ts. Each deck follows its lesson section by section (`section` is the
// lesson section index); lessons 6–10 are in presentations-dynamic-planet-2.ts.

const budgets = defineDeck('dyn-u1-l1', [
  {
    kind: 'title',
    title: 'Water movement and water budgets',
    subtitle: 'Stores, fluxes, and the bookkeeping that keeps a catchment balanced.',
    objectives: [
      'Define stores and fluxes.',
      'Balance a catchment over time.',
      'Distinguish runoff and infiltration.',
    ],
    image: 'dp-groundwater-flow',
  },
  {
    kind: 'poll',
    prompt:
      'Warm-up: when rain falls on a forested hillside, where do you think most of it goes first?',
    options: [
      'Straight into the stream',
      'Into the soil',
      'Back into the air',
      'It depends on the storm',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Connected stores',
    bullets: [
      'Fresh water sits in **ice, groundwater, soils, lakes, rivers, wetlands, organisms and the atmosphere**.',
      'Stores differ enormously in **size** and **turnover**.',
      'A large store ==does not necessarily provide a large accessible flow==.',
      'Pathways: precipitation, interception, infiltration, runoff, evapotranspiration, subsurface flow.',
      'There is no single mandatory route every molecule follows.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each flux to its description.',
    pairs: [
      ['Interception', 'Rain caught on leaves before reaching the ground'],
      ['Infiltration', 'Water entering the soil surface'],
      ['Evapotranspiration', 'Evaporation plus water released by plants'],
      ['Surface runoff', 'Water flowing over the land surface'],
    ],
    explanation: 'Each pathway moves water between different stores at different speeds.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Boundary and interval',
    bullets: [
      'A budget needs a defined **area**, **depth**, and **time interval**.',
      'Write ==ΔS = inputs − outputs== across that boundary.',
      'Catchment inputs: precipitation, incoming groundwater. Outputs: discharge, evapotranspiration, exports.',
      '**Pipes and diversions** can cross topographic boundaries.',
    ],
    callout: 'Omitting one flow can make a valid conservation law appear to fail.',
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'For a catchment budget, is each flow an input or an output?',
    bins: ['Input', 'Output'],
    items: [
      ['Precipitation', 0],
      ['Stream discharge at the outlet', 1],
      ['Evapotranspiration', 1],
      ['Groundwater flowing in from a neighboring basin', 0],
      ['Water piped out to a city', 1],
      ['Water imported by a canal', 0],
    ],
    explanation:
      'Anything crossing the boundary inward is an input; anything leaving is an output, whether natural or engineered.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Depth and volume',
    bullets: [
      'Precipitation is often given as a **depth** over an area.',
      'Convert mm to m, then multiply by area: ==1 mm over 1 km² = 1000 m³==.',
      'A **runoff coefficient** is a simplified fraction of rain that becomes runoff in one event.',
      'It changes with soil moisture, storm intensity, vegetation and season.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: direct runoff',
    problem: 'Rainfall is 20 mm over 2 km² with runoff fraction 0.30. Find the direct runoff.',
    steps: [
      'Convert depth to **0.020 m** and area to **2 × 10⁶ m²**.',
      'Rain volume = 0.020 × 2 × 10⁶ = **40,000 m³**.',
      'Direct runoff = 0.30 × 40,000 = **12,000 m³**.',
    ],
    conclusion: 'The fraction is ==an input assumption, not a measured basin law==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'Rainfall of 10 mm falls on a 5 km² catchment. What volume of rain fell, in m³?',
    answer: 50000,
    tolerance: 0,
    unit: 'm³',
    explanation: '0.010 m × 5 × 10⁶ m² = 50,000 m³ (or 10 mm × 5 km² × 1000 m³ per mm·km²).',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Infiltration and storage',
    image: 'dp-infiltration',
    caption:
      'Rain **infiltrates** through the unsaturated (vadose) zone to the **water table**, then moves as groundwater toward a stream.',
    bullets: [
      '**Infiltration** is entry into soil; **percolation** is movement within it.',
      'Capacity depends on structure, saturation, compaction, vegetation and rain rate.',
      'Infiltrated water can return later as **baseflow**.',
      '==Impervious surfaces reduce infiltration and speed runoff==.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Why does a stream keep flowing for weeks after the last rain?',
    options: [
      'Surface runoff takes weeks to cross a hillside',
      'Groundwater and soil water drain slowly into it as baseflow',
      'Evaporation adds water to the stream',
      'Streams always flow at a constant rate',
    ],
    answer: 1,
    explanation:
      'Water that infiltrated during storms reaches the channel slowly through the subsurface, sustaining baseflow.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Residence-time reasoning',
    image: 'dp-groundwater-flow',
    caption:
      'Groundwater paths from **recharge** to **discharge** areas take days, years, centuries or millennia depending on depth.',
    bullets: [
      'Simple estimate: ==residence time ≈ storage ÷ outflow== under steady state.',
      'It does not mean every parcel spends exactly that long.',
      'Mixing and preferential paths create a **distribution** of transit times.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A lake stores 3 × 10⁶ m³ and its outflow is 1 × 10⁵ m³/day. What is its approximate residence time, in days?',
    answer: 30,
    tolerance: 0,
    unit: 'days',
    explanation: '3 × 10⁶ ÷ 1 × 10⁵ = 30 days, assuming steady storage and outflow.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'The virtual event balance',
    steps: [
      { label: 'Rain depth', detail: 'Convert to metres.' },
      { label: 'Volume', detail: 'Multiply by **basin area**.' },
      { label: 'Runoff', detail: 'Multiply by the **runoff fraction**.' },
      {
        label: 'Hydrograph',
        detail: 'Spread the volume over a triangle; ==its area stays conserved==.',
      },
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'In the lab, which changes increase the direct-runoff volume? Select all that apply.',
    options: [
      'More rainfall depth',
      'Larger basin area',
      'Higher runoff fraction',
      'Longer event duration with everything else fixed',
    ],
    answers: [0, 1, 2],
    explanation:
      'Volume = depth × area × fraction. Duration changes the peak and timing, not the conserved volume.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Catchment', back: 'Area contributing water to an outlet.' },
      { front: 'Infiltration', back: 'Water entering soil.' },
      { front: 'Baseflow', back: 'Delayed streamflow often supported by groundwater.' },
      {
        front: 'Runoff coefficient',
        back: 'Fraction of rain becoming runoff in a simple calculation.',
      },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Stores differ in size and turnover; ==big is not the same as accessible==.',
      'Budgets: **ΔS = inputs − outputs** for a defined boundary and interval.',
      '1 mm over 1 km² is **1000 m³**.',
      'Infiltrated water returns later as **baseflow**.',
      'Residence time = storage ÷ flux, a summary of a distribution.',
    ],
  },
]);

const climate = defineDeck('dyn-u2-l1', [
  {
    kind: 'title',
    title: 'Freshwater distribution, precipitation, and climate',
    subtitle: 'How much fresh water exists, where it falls, and when it reaches streams.',
    objectives: [
      'Distinguish global storage from availability.',
      'Explain precipitation mechanisms.',
      'Connect seasonality to stream response.',
    ],
    image: 'dp-wave-cloud',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Distribution and access',
    image: 'dp-water-distribution',
    caption:
      'Oceans hold **96.5%** of Earth’s water; of the **2.5%** that is fresh, most is in **glaciers and ice caps (68.7%)** and **groundwater (30.1%)**.',
    bullets: [
      'Rivers hold a ==tiny fraction== of fresh water, yet supply much human use.',
      'Storage proportions do not describe accessible supply, quality or sustainable withdrawal.',
      'Groundwater can be slow to renew; river flow varies through time.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Where is most of Earth’s fresh water stored?',
    options: ['Rivers and lakes', 'The atmosphere', 'Glaciers and ice caps', 'Living things'],
    answer: 2,
    explanation:
      'About two-thirds of fresh water is frozen in glaciers and ice caps; most of the rest is groundwater.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Atmospheric moisture',
    bullets: [
      'Evaporation and transpiration put **water vapor** into the air.',
      'Cooling toward **saturation** produces condensation.',
      'Uplift by **convection**, **fronts**, or **terrain** can produce precipitation.',
      '**Relative humidity** is temperature-dependent: ==capacity and actual moisture content are different==.',
    ],
    callout:
      'A dry region can still have intense storms, and high annual rainfall need not be evenly spread.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each uplift mechanism to its description.',
    pairs: [
      ['Convection', 'Warm surface air rises on its own buoyancy'],
      ['Frontal lifting', 'Warm air rides up over a colder air mass'],
      ['Orographic lifting', 'Air is forced up over mountains'],
    ],
    explanation:
      'All three cool rising air toward saturation, but they occur in different weather settings.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Orographic effects',
    image: 'dp-wave-cloud',
    caption:
      'Rippled **wave clouds** downwind of an island: air flowing over its mountains is pushed up and down, cooling and condensing at each crest.',
    bullets: [
      'Air forced up terrain cools and can precipitate on the **windward** side.',
      'Descending air warms and dries on the **leeward** side: the ==rain shadow==.',
      'Wind direction, moisture source, elevation and stability all matter.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Prevailing winds blow from the west over a north–south mountain range. Where is the rain shadow?',
    options: ['West of the range', 'East of the range', 'On the summit only', 'There is none'],
    answer: 1,
    explanation:
      'Air rises and drops its moisture on the western (windward) slopes, then descends dry on the eastern (leeward) side.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Snow and seasonality',
    image: 'dp-snowpit',
    caption: 'A team digs a **snow pit** to measure snow layers, density and water content.',
    bullets: [
      'Snow ==stores water until melting==, separating precipitation timing from runoff timing.',
      '**Snow-water equivalent (SWE)** is the liquid water the snow represents, not its depth.',
      'Snowmelt basins have low winter flow and a **spring peak**.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A snowpack is 100 cm deep with density 0.30 g/cm³ (water = 1.00). What is its snow-water equivalent, in cm?',
    answer: 30,
    tolerance: 0,
    unit: 'cm',
    explanation: 'SWE = depth × (snow density / water density) = 100 × 0.30 = 30 cm of water.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Climate and variability',
    bullets: [
      '**Climate** is long-term patterns; **weather** is short-term events.',
      '**Drought** can be meteorological, soil-moisture, streamflow, or groundwater, each with ==different lag and recovery==.',
      'Higher evaporative demand can reduce water without a rainfall change.',
      'A few wet days do not end a groundwater drought.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt:
      'A rainfall deficit begins. Order how drought typically appears, from fastest to slowest.',
    items: [
      'Precipitation deficit',
      'Soil moisture deficit',
      'Low streamflow',
      'Falling groundwater levels',
    ],
    explanation:
      'Each store responds with more lag: air, then soil, then streams, then aquifers. Recovery follows the same delays.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Interpreting maps',
    bullets: [
      'Read the **legend, units, averaging period and resolution**.',
      'Compare precipitation with evapotranspiration, storage and demand.',
      'The wettest region ==need not have the best supply==.',
      'In the lab, duration separates **amount** from **timing**.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: same rain, longer storm',
    problem:
      'Two storms deliver equal rainfall, but one lasts twice as long in the lab. Compare volume and peak.',
    steps: [
      'Hold basin area and runoff fraction fixed.',
      'Runoff **volume stays equal**.',
      'A triangle twice as wide with the same area has **half the peak**.',
    ],
    conclusion: '==Equal amount does not mean equal intensity or response.==',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Snow-water equivalent', back: 'Liquid-water amount represented by snow.' },
      { front: 'Rain shadow', back: 'Reduced precipitation on the lee side of mountains.' },
      { front: 'Climate', back: 'Longer-term weather patterns and variability.' },
      { front: 'Drought', back: 'Context-defined water deficit.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Most fresh water is stored in ice and {0}. The dry lee side of a range is a rain {1}. The water held in snow is its snow-water {2}.',
    blanks: ['groundwater', 'shadow', 'equivalent'],
    distractors: ['rivers', 'gauge', 'depth'],
    explanation:
      'Ice and groundwater dominate fresh water; rain shadows lie downwind of mountains; SWE measures snow’s water.',
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Only 2.5% of water is fresh, mostly **ice and groundwater**.',
      'Uplift (convection, fronts, terrain) cools air toward **saturation**.',
      'Windward slopes are wet; ==lee slopes sit in a rain shadow==.',
      '**SWE**, not snow depth, measures stored water.',
      'Drought types differ in lag; amount and timing are separate.',
    ],
  },
]);

const watersheds = defineDeck('dyn-u3-l1', [
  {
    kind: 'title',
    title: 'Watersheds, stream order, and drainage patterns',
    subtitle: 'Delineate basins, number their streams, and read their shapes with care.',
    objectives: [
      'Delineate drainage boundaries.',
      'Apply Strahler ordering.',
      'Interpret drainage patterns with geological context.',
    ],
    image: 'dp-tsangpo',
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Watershed boundaries',
    image: 'dp-topo-map',
    caption:
      'A USGS topographic map: **contour lines** around ridges and valleys show where water drains toward each stream.',
    bullets: [
      'A **topographic divide** separates drainage toward different outlets.',
      'Delineate along ==ridges around the contributing area==, crossing contours at right angles.',
      'Groundwater divides can differ, especially in **karst**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'When you trace a watershed divide on a contour map, what does the line follow?',
    options: [
      'The stream channel',
      'The highest ground between drainages',
      'A straight line between towns',
      'The lowest contour',
    ],
    answer: 1,
    explanation:
      'A divide runs along ridges, the high ground that separates water flowing to different outlets.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Network connections',
    bullets: [
      'Headwaters join **tributaries** and larger channels in a directed network.',
      'The **outlet** defines which upstream area belongs to a basin; move it and the basin changes.',
      'Channels can be **perennial**, **intermittent**, or **ephemeral**.',
      'Map scale ==changes the apparent network density==.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each channel type to its flow behavior.',
    pairs: [
      ['Perennial', 'Flows year-round'],
      ['Intermittent', 'Flows seasonally when groundwater is high'],
      ['Ephemeral', 'Flows only briefly after rain'],
    ],
    explanation: 'Flow permanence depends on how the channel connects to groundwater and storms.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Strahler stream order',
    image: 'dp-strahler',
    caption: 'Strahler ordering: two 1s make a 2, two 2s make a 3, two 3s make a 4.',
    bullets: [
      'A **first-order** stream has no mapped tributaries.',
      'Two streams of ==equal order== join to raise the order by one.',
      'Unequal-order joins **keep the higher order**.',
      'Order depends on the mapped network, not a river’s name or width.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: successive orders',
    problem:
      'A first-order stream joins a third-order stream, then another third-order stream joins. Find the orders.',
    steps: [
      'Unequal **1 and 3** keep order **3**.',
      'Equal **3 and 3** raise the order to **4**.',
      'Apply the rule at each junction separately.',
    ],
    conclusion: 'Stream order is ==a network property==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'Two second-order streams join, and later a first-order stream joins below. What is the final Strahler order?',
    answer: 3,
    tolerance: 0,
    explanation: '2 + 2 (equal) gives 3; a 1 joining a 3 keeps order 3.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Drainage patterns',
    image: 'dp-tsangpo',
    caption:
      'Branching, tree-like **dendritic** valleys in the Himalaya around the Yarlung Tsangpo, seen from orbit with snow on the ridges.',
    bullets: [
      '**Dendritic**: tree-like, often where substrate resistance is fairly uniform.',
      '**Trellis**: parallel streams over alternating resistant and weak rock.',
      '**Radial**: streams flow outward from a high center like a volcano.',
      '**Rectangular**: right-angle bends along fractures. ==These are associations, not diagnoses==.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each drainage pattern to the setting it is often associated with.',
    pairs: [
      ['Dendritic', 'Uniformly resistant rock'],
      ['Trellis', 'Folded alternating hard and soft layers'],
      ['Radial', 'An isolated volcano or dome'],
      ['Rectangular', 'Jointed, fractured bedrock'],
    ],
    explanation:
      'Patterns suggest structure, but compare them with geological evidence before concluding.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Connectivity and transport',
    bullets: [
      'Network structure controls how **water, sediment, nutrients and organisms** move.',
      'A tributary’s influence depends on its ==discharge and concentration==, not its order.',
      'Dams, wetlands and floodplains change connectivity and retention.',
      'Upstream area alone does not fix peak discharge.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A small first-order tributary carries very high nitrate into a large river. What determines its effect on the river?',
    options: [
      'Only its stream order',
      'Its discharge and concentration compared with the main river',
      'Its length alone',
      'Nothing, because low-order streams never matter',
    ],
    answer: 1,
    explanation:
      'The mass it adds is concentration × discharge; mixing with the main flow sets the downstream result.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Reading a basin diagram',
    steps: [
      { label: 'Outlet', detail: 'Mark the **outlet** first.' },
      { label: 'Trace', detail: 'Follow tributaries upstream.' },
      { label: 'Divides', detail: 'Draw ==divides along the ridges==.' },
      {
        label: 'Order',
        detail: 'Label orders from the **headwaters** downward, checking each junction.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'You move a basin’s outlet point 5 km downstream past a tributary junction. What happens to the basin?',
    options: [
      'It stays exactly the same',
      'It grows to include the tributary’s catchment',
      'It shrinks',
      'Its stream order must fall',
    ],
    answer: 1,
    explanation:
      'The outlet defines the contributing area; moving it downstream adds every area draining in above the new point.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Divide', back: 'Boundary separating surface drainage.' },
      { front: 'Tributary', back: 'Channel feeding another channel.' },
      { front: 'Strahler order', back: 'Ordering based on equal-order junctions.' },
      { front: 'Dendritic', back: 'Branching, tree-like drainage pattern.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Divides follow **ridges**; groundwater divides can differ.',
      'The outlet defines the basin; map scale changes network density.',
      'Strahler: ==only equal orders raise the order==.',
      'Dendritic, trellis, radial and rectangular patterns hint at structure.',
      'A tributary’s influence depends on **discharge and concentration**.',
    ],
  },
]);

const sediment = defineDeck('dyn-u4-l1', [
  {
    kind: 'title',
    title: 'Sediment transport and channel forms',
    subtitle: 'What rivers carry, how much they can carry, and the shapes they build.',
    objectives: [
      'Distinguish competence and capacity.',
      'Explain erosion and deposition conditions.',
      'Compare channel patterns.',
    ],
    image: 'dp-braided',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Sediment sources',
    bullets: [
      '**Weathering** supplies particles; **erosion** entrains them into transport.',
      'Hillslopes, banks, beds and tributaries supply different material.',
      'Load reflects both ==available material and transport ability==.',
      '**Dissolved load** can be invisible; muddy color does not reveal grain size or mass.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Transport modes',
    bullets: [
      '**Bed load** moves near the bed by rolling, sliding and short hops (**saltation**).',
      '**Suspended load** is held up in the water column by turbulence.',
      '**Dissolved load** is ions and molecules in solution.',
      'The same grain can ==switch modes as flow changes==.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which transport mode does each describe?',
    bins: ['Bed load', 'Suspended load', 'Dissolved load'],
    items: [
      ['Pebbles rolling along the channel floor', 0],
      ['Silt making the water look muddy', 1],
      ['Calcium ions from limestone weathering', 2],
      ['Sand grains bouncing in short hops', 0],
      ['Fine clay carried for many kilometers', 1],
      ['Dissolved silica in clear spring water', 2],
    ],
    explanation:
      'Heavy grains stay near the bed, fine grains ride turbulence, and ions travel in solution.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Competence and capacity',
    image: 'dp-hjulstrom',
    caption:
      'The **Hjulström curve**: flow speed against grain size, dividing **erosion**, **transport** and **deposition**.',
    bullets: [
      '**Competence**: the largest particle a flow can move.',
      '**Capacity**: the total amount it can carry.',
      'Fine **clay** needs ==more speed to erode than sand== because it is cohesive.',
      'A sediment-starved powerful flow can erode its own bed.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'On the Hjulström curve, which grain size starts moving at the lowest flow speed?',
    options: [
      'Fine clay',
      'Sand around 0.1–0.5 mm',
      'Large boulders',
      'All sizes erode at the same speed',
    ],
    answer: 1,
    explanation:
      'Fine sand is easiest to erode; clay resists because of cohesion and boulders because of mass.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Deposition',
    bullets: [
      'Particles settle when transport conditions and supply favor it.',
      '**Coarse material** usually drops first as flow slows; fine settles later.',
      'Cohesion, density, shape and flocculation ==complicate sorting==.',
      'Deposits record **changing** flow and supply, not one steady velocity.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'A flood wanes and its velocity falls steadily. Order the grain sizes as they deposit.',
    items: ['Gravel', 'Coarse sand', 'Fine sand', 'Silt', 'Clay'],
    explanation:
      'As competence falls, the largest grains settle first; clay may stay suspended until water is nearly still.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Braided channels',
    image: 'dp-braided',
    caption:
      'The braided Rakaia River, New Zealand: many shifting threads weave around gravel bars on a wide bed.',
    bullets: [
      '**Braided** rivers often have ==high sediment supply== and variable flow.',
      'Steep slopes and weak banks favor braiding.',
    ],
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Meandering channels',
    image: 'dp-meander',
    caption:
      'A meandering channel migrates across its valley: the **before** and **after** paths show bends growing and shifting.',
    bullets: [
      '**Meanders** erode outer bends and deposit on inner bends.',
      'Vegetation, bank strength, slope, discharge and sediment all influence pattern.',
      'One aerial shape ==cannot uniquely identify the controlling process==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each channel pattern to its description.',
    pairs: [
      ['Meandering', 'Single sinuous channel with migrating bends'],
      ['Braided', 'Many threads dividing around bars'],
      ['Straight', 'Little sinuosity, often structurally controlled'],
      ['Anastomosing', 'Multiple stable channels around vegetated islands'],
    ],
    explanation:
      'Each pattern reflects a mix of slope, supply, discharge variability and bank strength.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: same discharge, different velocity',
    problem:
      'A river has Q = 20 m³/s. Compare the velocity for cross-sectional areas of 10 and 20 m².',
    steps: [
      'Use **Q = Av**, so v = Q / A.',
      'At 10 m², **v = 2 m/s**.',
      'At 20 m², **v = 1 m/s**; discharge alone does not fix velocity.',
    ],
    conclusion: 'Sediment interpretation ==needs channel geometry==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'A channel cross-section is 8 m² and the mean velocity is 1.5 m/s. What is the discharge, in m³/s?',
    answer: 12,
    tolerance: 0,
    unit: 'm³/s',
    explanation: 'Q = A × v = 8 × 1.5 = 12 m³/s.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A river runs crystal clear. What can you say about its sediment load?',
    options: [
      'It carries no load at all',
      'It may still carry a large dissolved load, and bed load during floods',
      'It carries only boulders',
      'Clear water means it is eroding nothing',
    ],
    answer: 1,
    explanation:
      'Dissolved ions are invisible, and bed load moves mainly at high flow; clarity reflects only suspended fines.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bed load', back: 'Sediment moving close to the bed.' },
      { front: 'Suspended load', back: 'Particles kept up in the water column.' },
      { front: 'Competence', back: 'Largest transportable particle under conditions.' },
      { front: 'Capacity', back: 'Total amount transportable under conditions.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Load reflects **supply** and **transport ability** together.',
      'Bed, suspended and dissolved loads move differently.',
      '**Competence** is the biggest grain; **capacity** is the total amount.',
      'Clay is cohesive: ==hard to erode, slow to settle==.',
      'Braided rivers suggest high supply; meanders migrate; Q = Av.',
    ],
  },
]);

const landforms = defineDeck('dyn-u5-l1', [
  {
    kind: 'title',
    title: 'Fluvial landforms and river history',
    subtitle: 'Bends, bars, floodplains and terraces record how rivers worked over time.',
    objectives: [
      'Connect erosion and deposition to landforms.',
      'Explain floodplain connectivity.',
      'Qualify paleohydrological inference.',
    ],
    image: 'dp-oxbow',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'River work',
    bullets: [
      'Rivers **erode, transport and deposit** while adjusting to slope, base level, discharge and supply.',
      '**Downcutting** makes incised valleys; **lateral migration** builds floodplains.',
      'Valley form reflects channel processes and surrounding geology.',
      'Interpret landforms on their ==formation timescale==, not today’s flow.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Meander migration',
    image: 'dp-point-bar',
    caption:
      'An aerial photo labeling **cutbanks** on outer bends and sandy **point bars** on inner bends.',
    bullets: [
      'Outer bends: faster flow and **erosion** form the cutbank.',
      'Inner bends: slower flow and **deposition** build point bars.',
      'Proving migration needs ==positions compared over time==.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Oxbow lakes',
    image: 'dp-oxbow',
    caption:
      'The meandering Nowitna River, Alaska, with crescent-shaped **oxbow lakes** left behind on its floodplain.',
    bullets: [
      'A **cutoff** across a meander neck isolates the loop as an oxbow lake.',
      'Oxbows ==slowly fill== with sediment and vegetation.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps that form an oxbow lake.',
    items: [
      'Erosion on outer bends makes the meander loop tighter',
      'The neck between two bends narrows',
      'A flood cuts through the neck',
      'The old loop is sealed off by deposition',
      'The isolated loop remains as an oxbow lake',
    ],
    explanation: 'Continued bend migration narrows the neck until a cutoff abandons the loop.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Floodplain deposits',
    image: 'dp-floodplain',
    caption:
      'The Paraná River floodplain from the ISS: old channel courses mark a wide, active floodplain.',
    bullets: [
      '**Overbank flooding** spreads fine sediment outside the channel in layers.',
      '**Natural levees** build where deposition concentrates beside the channel.',
      'Floodplains ==store water and support ecological exchange==.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Engineered levees',
    image: 'dp-levee',
    caption:
      'A built levee along the Sacramento River: the raised bank keeps floodwater in the channel.',
    bullets: [
      'Engineered barriers **alter connectivity** and can redistribute flood hazard downstream.',
      'A flat area beside a river is ==not automatically safe==.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why are natural levees highest right beside the channel?',
    options: [
      'Water flows fastest far from the channel',
      'Flow slows sharply as it leaves the channel, dropping the coarsest sediment first',
      'Wind piles sand there',
      'Levees are always built by people',
    ],
    answer: 1,
    explanation:
      'Overbank water loses velocity at the channel edge, so coarser sediment builds a ridge there.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Terraces and base level',
    bullets: [
      '**River terraces** preserve former floodplain or channel levels after incision.',
      'Tectonics, climate, supply and **base-level** change can all contribute.',
      'Terrace elevation alone ==does not give its age or cause==.',
      '**Base level** is the lowest level a river can erode to, such as sea level.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Sea level falls, lowering a river’s base level. What is the most likely response?',
    options: [
      'The river deposits sediment and raises its bed',
      'The river incises, which can leave its old floodplain as a terrace',
      'Nothing changes',
      'The river immediately becomes braided',
    ],
    answer: 1,
    explanation:
      'A lower base level steepens the river near its mouth, encouraging downcutting that can strand terraces.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Paleohydrology (optional extension)',
    bullets: [
      'Past flows can be reconstructed from **landforms, sediment, high-water marks and dating**.',
      'Hydraulic estimates depend on geometry and assumptions; ==preservation is selective==.',
      'A large deposit may reflect unusual supply or blockage, not only big flow.',
      'Treat inferred discharge as a model estimate with uncertainty.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: same peak, longer event',
    problem:
      'Two events share peak discharge but one lasts longer. Why might their geomorphic effects differ?',
    steps: [
      'Peak alone **omits duration and volume**.',
      'Longer transport opportunity can move more sediment.',
      'Effects still depend on grains, banks and supply.',
    ],
    conclusion: '==A single hydrograph metric is insufficient.==',
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each landform to the process that builds it.',
    pairs: [
      ['Point bar', 'Deposition on the inner bend'],
      ['Cutbank', 'Erosion on the outer bend'],
      ['Oxbow lake', 'Meander cutoff'],
      ['Terrace', 'Incision below an old floodplain'],
    ],
    explanation:
      'Each landform records a process; dated images and stratigraphy show when it happened.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A river cuts a deep, narrow V-shaped valley with little floodplain. Which process dominates there?',
    options: ['Lateral migration', 'Downcutting', 'Overbank deposition', 'Oxbow formation'],
    answer: 1,
    explanation:
      'Vertical incision deepens the valley faster than lateral migration can widen a floodplain.',
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which evidence can help reconstruct a past flood? Select all that apply.',
    options: [
      'Slackwater sediment layers high on valley walls',
      'Dated high-water marks or tree scars',
      'Today’s average discharge alone',
      'The size of boulders the flood moved',
    ],
    answers: [0, 1, 3],
    explanation:
      'Deposits, marks and moved clasts record past stage and competence; present averages do not.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Point bar', back: 'Inner-bend depositional feature.' },
      { front: 'Oxbow', back: 'Cutoff former channel loop.' },
      { front: 'Terrace', back: 'Elevated remnant of an earlier river level.' },
      { front: 'Base level', back: 'Lowest level to which a river can erode.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Outer bends erode (**cutbanks**); inner bends deposit (**point bars**).',
      'Cutoffs leave **oxbow lakes**; floods build levees and floodplain layers.',
      'Terraces record incision; ==elevation alone does not date them==.',
      'Base level limits downcutting.',
      'Landforms reflect repeated events and long history, not one hydrograph.',
    ],
  },
]);

export const decks: Deck[] = [
  budgets,
  climate,
  watersheds,
  sediment,
  landforms,
  ...dynamicPlanetDecksFlow,
];
