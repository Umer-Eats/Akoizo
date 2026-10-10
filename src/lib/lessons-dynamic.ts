import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const dynamicLessons = buildCourse({
  eventId: 'dynamic-planet',
  eventName: 'Dynamic Planet',
  prefix: 'dyn',
  lab: 'hydrology',
  syllabus: 'Dynamic Planet B_C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Ten freshwater units connect water budgets, climate, drainage networks, sediment, rivers, groundwater, lakes, wetlands, and human impacts. Optional mathematical and paleohydrology topics are labeled within their units; Unit 10 is enrichment. Fixed hydrographs are synthetic, and Darcy flow uses a declared homogeneous saturated model.',
  references: [
    { title: 'USGS Water Science School', url: 'https://www.usgs.gov/water-science-school' },
    {
      title: 'USGS Streamflow and the Water Cycle',
      url: 'https://www.usgs.gov/water-science-school/science/streamflow-and-water-cycle',
    },
  ],
  chapters: [
    c(
      'Water movement and water budgets',
      [
        'Define stores and fluxes.',
        'Balance a catchment over time.',
        'Distinguish runoff and infiltration.',
      ],
      [
        [
          'Connected stores',
          'Freshwater occupies ice, groundwater, soils, lakes, rivers, wetlands, organisms, and the atmosphere. These stores differ enormously in size and turnover. A large store does not necessarily provide a large readily accessible flow. Trace water through precipitation, interception, infiltration, runoff, evapotranspiration, and subsurface movement. The cycle has many pathways rather than one mandatory sequence that every water molecule follows.',
        ],
        [
          'Boundary and interval',
          'A budget needs a defined area, depth, and time interval. Write ΔS = inputs − outputs, accounting for transfers across that boundary. For a catchment, precipitation and incoming groundwater may be inputs, while discharge, evapotranspiration, and exported water may be outputs. Human pipes and diversions can cross topographic boundaries. Omitting one flow can make a valid conservation law appear to fail.',
        ],
        [
          'Depth and volume',
          'Hydrological budgets often express precipitation as depth over area. Convert millimeters to meters and multiply by catchment area to obtain volume. One millimeter over one square kilometer is one thousand cubic meters. A runoff coefficient represents a simplified fraction of rainfall becoming a specified runoff component during a defined event. It is not a fixed universal property independent of soil moisture, storm intensity, vegetation, and season.',
        ],
        [
          'Infiltration and storage',
          'Infiltration is entry into soil, while percolation describes movement within it. Capacity depends on soil structure, saturation, compaction, vegetation, and rainfall conditions. Water can infiltrate and later return to a stream as subsurface flow. Immediate surface runoff and delayed baseflow therefore have different timing. Impervious surfaces can reduce infiltration and accelerate runoff, but connected drainage and storage also shape the response.',
        ],
        [
          'Residence-time reasoning',
          'A simple residence-time estimate divides storage by outflow under an approximate steady-state model. It does not imply every parcel spends exactly that time in the store. Mixing, preferential paths, and changing inflows create distributions of transit times. Distinguish the age of stored water from the travel time of water leaving today. A single ratio summarizes one aspect of a more complex system.',
        ],
        [
          'Virtual event balance',
          'The lab converts rainfall depth, basin area, and runoff fraction into direct-runoff volume, then distributes that volume across a transparent triangular hydrograph. The time integral is conserved. It excludes evapotranspiration during the short event and does not infer a real basin’s response from area alone. Change one input and check whether both the integrated volume and peak respond as predicted.',
        ],
      ],
      [
        ['Catchment', 'Area contributing water to an outlet.'],
        ['Infiltration', 'Water entering soil.'],
        ['Baseflow', 'Delayed streamflow often supported by groundwater.'],
        ['Runoff coefficient', 'Defined fraction in a simplified rainfall–runoff calculation.'],
      ],
      [
        'Rainfall is 20 mm over 2 km² with runoff fraction 0.30. Find direct runoff.',
        [
          'Convert depth to 0.020 m and area to 2 × 10⁶ m².',
          'Rain volume is 40,000 m³.',
          'Direct runoff is 0.30 × 40,000 = 12,000 m³.',
        ],
        'The fraction is an input assumption, not a measured basin law.',
      ],
      [
        [
          'One mm over one km² equals…',
          '1000 m³',
          ['1 m³', '1 million m³', '1000 liters'],
          'Convert both area and depth.',
        ],
        [
          'A budget requires…',
          'A boundary and interval',
          ['Only a river name', 'Only a map color', 'Only a starting temperature'],
          'Fluxes are boundary-dependent.',
        ],
        [
          'Infiltrated water can later…',
          'Support streamflow',
          ['Never move again', 'Only evaporate instantly', 'Create salt by definition'],
          'Subsurface pathways can reach streams.',
        ],
      ],
      [
        [
          'What is missing from a simple P−Q budget?',
          'Evapotranspiration, storage change, and other boundary transfers may matter.',
        ],
        [
          'Why is runoff fraction variable?',
          'Soil moisture, intensity, land cover, and event conditions change.',
        ],
        [
          'What does residence time summarize?',
          'Storage relative to flux under a stated approximation, not every parcel’s age.',
        ],
        [
          'What does the lab conserve?',
          'Specified direct-runoff volume distributed over the synthetic event.',
        ],
      ],
      [
        ['Rain', 'Convert depth over area to volume.'],
        ['Partition', 'Allocate runoff and other stores under assumptions.'],
        ['Route', 'Distribute outflow through time.'],
      ],
      [
        ['Depth', 'Rain amount per area', 'Needs area for volume.'],
        ['Volume', 'Total event water', 'Not discharge.'],
        ['Discharge', 'Volume per time', 'Integrates to volume.'],
      ],
      'Double rainfall at fixed area, fraction, and duration. Verify both runoff volume and peak discharge ratios.',
      'Hydrological reasoning begins with boundaries, units, and conservation.',
    ),
    c(
      'Freshwater distribution, precipitation, and climate',
      [
        'Distinguish global storage from availability.',
        'Explain precipitation mechanisms.',
        'Connect seasonality to stream response.',
      ],
      [
        [
          'Distribution and access',
          'Most Earth water is saline; much freshwater is stored in ice or underground rather than rivers. Storage proportions do not directly describe accessible supply, water quality, or sustainable withdrawal. Groundwater can be difficult to renew, and river flow varies through time. A map of freshwater volume therefore answers a different question from a map of reliable usable water. State the quantity before comparing regions.',
        ],
        [
          'Atmospheric moisture',
          'Evaporation and transpiration transfer water vapor to air. Cooling toward saturation can produce condensation, while uplift through convection, fronts, or terrain can support precipitation. Warm air’s moisture capacity and actual moisture content are different concepts. Relative humidity is temperature-dependent. A dry region can experience intense storms, and high annual rainfall does not imply evenly distributed precipitation. Interpret the process and timescale together.',
        ],
        [
          'Orographic effects',
          'Air forced upward over terrain can cool and produce precipitation under suitable conditions, while descending air on the other side can contribute to a rain shadow. Wind direction, moisture source, elevation, and atmospheric stability matter. A mountain does not guarantee one fixed wet side under every weather pattern. Use maps of prevailing flow and topography rather than inferring climate from elevation alone.',
        ],
        [
          'Snow and seasonality',
          'Snow stores water until melting, separating precipitation timing from runoff timing. Snow-water equivalent measures the liquid-water amount represented by snow, not simply snow depth. Temperature, radiation, wind, and rain influence melt. A basin can have low winter discharge and high spring runoff even if precipitation was earlier. Distinguish rainfall-driven and snowmelt-driven hydrographs before comparing peak timing.',
        ],
        [
          'Climate and variability',
          'Climate describes patterns over an appropriate long interval, while weather describes shorter events. Drought can involve precipitation deficits, soil moisture, streamflow, or groundwater, each with different lag and recovery. Changes in evaporation demand and storage can alter freshwater availability even without a matching rainfall change. A short sequence of wet days does not necessarily end a groundwater drought.',
        ],
        [
          'Interpreting maps',
          'Read legend, units, averaging period, and spatial resolution. Compare precipitation with evapotranspiration, storage, and demand rather than assuming the wettest region has the best supply. The lab represents one synthetic rainfall event and does not forecast climate. Use its duration control to distinguish amount from timing, then explain what snow storage or seasonal baseflow would add to the model.',
        ],
      ],
      [
        ['Snow-water equivalent', 'Liquid-water amount represented by snow.'],
        ['Rain shadow', 'Reduced precipitation associated with lee-side conditions.'],
        ['Climate', 'Longer-term weather patterns and variability.'],
        ['Drought', 'Context-defined water deficit.'],
      ],
      [
        'Two storms deliver equal rainfall but one lasts twice as long in the lab. Compare volume and peak.',
        [
          'Hold basin and runoff fraction fixed.',
          'Runoff volume stays equal.',
          'A broader triangular event has half the peak.',
        ],
        'Equal amount does not mean equal intensity or response.',
      ],
      [
        [
          'Snow depth equals liquid-water depth automatically?',
          'No',
          ['Always', 'Only in mountains', 'Only in spring'],
          'Density and water equivalent matter.',
        ],
        [
          'A one-event lab predicts climate?',
          'No',
          ['Always', 'Only with more sliders', 'Only for wet regions'],
          'Timescales and processes differ.',
        ],
        [
          'Equal annual rain implies equal reliable supply?',
          'No',
          ['Always', 'Only near oceans', 'Only for groundwater'],
          'Timing, storage, quality, and demand differ.',
        ],
      ],
      [
        ['Why can runoff lag snowfall?', 'Snow stores water until melt.'],
        [
          'What should a precipitation map state?',
          'Units, period, resolution, and the represented statistic.',
        ],
        [
          'Why can drought recovery lag rain?',
          'Subsurface and other stores may need sustained recharge.',
        ],
        [
          'What influences orographic precipitation?',
          'Airflow, moisture, terrain, and atmospheric conditions.',
        ],
      ],
      [
        ['Atmosphere', 'Transport and condense moisture.'],
        ['Store', 'Retain water in snow, soil, or aquifers.'],
        ['Release', 'Route runoff on different timescales.'],
      ],
      [
        ['Weather', 'Short events', 'Not long-term climate.'],
        ['Snow depth', 'Physical thickness', 'Not water equivalent.'],
        ['Availability', 'Reliable usable resource', 'Not storage alone.'],
      ],
      'Compare equal rainfall events with different duration. Explain how snow storage would further separate precipitation and discharge timing.',
      'Freshwater availability depends on where water is stored and when it moves.',
    ),
    c(
      'Watersheds, stream order, and drainage patterns',
      [
        'Delineate drainage boundaries.',
        'Apply Strahler ordering.',
        'Interpret drainage patterns with geological context.',
      ],
      [
        [
          'Watershed boundaries',
          'A topographic divide separates surface drainage toward different outlets. Delineation follows ridges around the contributing area, using contours and flow direction. Groundwater boundaries can differ from surface divides, especially in permeable or karst terrain. Human drainage systems can also reroute water. State whether a map shows surface catchment, subsurface contributing area, or administrative boundary rather than assuming all outlines represent the same thing.',
        ],
        [
          'Network connections',
          'Headwaters join tributaries and larger channels, creating a directed network. An outlet defines which upstream area belongs to a basin. Changing the outlet changes contributing area and often stream order. A mapped channel is not necessarily flowing year-round; perennial, intermittent, and ephemeral channels have different flow behavior. Map scale and minimum mapped channel size affect the apparent network density.',
        ],
        [
          'Strahler order',
          'A first-order stream has no mapped tributaries in the scheme. When two streams of equal order join, downstream order increases by one; unequal-order joins retain the higher order. Two second-order streams create a third-order stream, but a first joining a third does not create a fourth. State the ordering method because other systems exist. The result depends on the mapped network, not solely a river’s name or width.',
        ],
        [
          'Drainage patterns',
          'Dendritic networks often develop where substrate resistance is relatively uniform. Trellis patterns can reflect alternating resistant and weaker structures, radial drainage can develop around elevated centers, and rectangular patterns can follow fractures. These are conditional associations, not unique geological diagnoses. Landform history and scale matter. Compare the drainage pattern with geological and topographic evidence before assigning a structural explanation.',
        ],
        [
          'Connectivity and transport',
          'Network structure affects how water, sediment, nutrients, and organisms move. A tributary’s influence depends on its discharge and material concentration, not just its order. Dams, wetlands, and floodplains can alter connectivity and retention. Upstream area alone does not fix peak discharge because rainfall distribution, storage, and routing vary. Distinguish a spatial network from the time-dependent flows passing through it.',
        ],
        [
          'Reading a basin diagram',
          'Mark the outlet, trace tributaries upstream, delineate divides, and label orders from the headwaters downward. Check each equal-order junction explicitly. The lab’s basin area parameter abstracts this network and does not calculate drainage pattern. Use its volume and timing outputs to explain what a spatial map omits. A strong map interpretation links shape and connectivity to testable hydrological questions.',
        ],
      ],
      [
        ['Divide', 'Boundary separating surface drainage.'],
        ['Tributary', 'Channel feeding another channel.'],
        ['Strahler order', 'Ordering based on equal-order junctions.'],
        ['Dendritic', 'Branching drainage pattern.'],
      ],
      [
        'A first-order stream joins a third-order stream, then another third-order joins. Find successive orders.',
        [
          'Unequal 1 and 3 retain order 3.',
          'Equal 3 and 3 raise order to 4.',
          'Apply the rule at each junction separately.',
        ],
        'Stream order is a network property.',
      ],
      [
        [
          'Two second-order streams create…',
          'Third order',
          ['Second order', 'Fourth order', 'First order'],
          'Equal orders increment by one.',
        ],
        [
          'Groundwater divides always match surface divides?',
          'No',
          ['Always', 'Only on maps', 'Only in winter'],
          'Subsurface flow can differ.',
        ],
        [
          'Radial drainage can suggest…',
          'An elevated central feature',
          ['Only flat sediment', 'Only a straight fault', 'No topography'],
          'Context still matters.',
        ],
      ],
      [
        ['Why specify the outlet?', 'It defines the contributing basin and network considered.'],
        [
          'Why does map scale affect order?',
          'Smaller channels may be omitted at coarse resolution.',
        ],
        [
          'What additional data estimate tributary load?',
          'Discharge and constituent concentration over time.',
        ],
        [
          'Why is pattern not a unique diagnosis?',
          'Several geological and historical conditions can create similar patterns.',
        ],
      ],
      [
        ['Outlet', 'Define the basin question.'],
        ['Trace', 'Follow connected channels and divides.'],
        ['Order', 'Apply junction rules consistently.'],
      ],
      [
        ['Map network', 'Spatial connectivity', 'Not flow magnitude.'],
        ['Order', 'Topological classification', 'Depends on mapping method.'],
        ['Divide', 'Surface boundary', 'Can differ underground.'],
      ],
      'Double basin area in the lab, then explain why a real larger watershed might not simply double peak flow.',
      'Drainage maps describe connectivity whose hydrological effects depend on timing and storage.',
    ),
    c(
      'Sediment transport and channel forms',
      [
        'Distinguish competence and capacity.',
        'Explain erosion and deposition conditions.',
        'Compare channel patterns.',
      ],
      [
        [
          'Sediment sources',
          'Weathering supplies particles, while erosion entrains them into transport. Hillslopes, banks, channel beds, and upstream tributaries contribute different material. Human disturbance can increase supply independently of flow. A river’s sediment load reflects both available material and transport ability. Clear water may still carry dissolved load, and a turbid river does not reveal grain size or total mass from color alone.',
        ],
        [
          'Transport modes',
          'Bed load moves near the bed through rolling, sliding, and short hops, while suspended load remains supported in the water column by turbulence. Dissolved load consists of ions and molecules in solution. The same grain can shift transport mode as conditions change. Fine cohesive particles can behave differently from noncohesive sand. Define the material and flow context before applying a generalized threshold diagram.',
        ],
        [
          'Competence and capacity',
          'Competence describes the largest particles a flow can transport under a defined model; capacity describes the amount it can carry. They are different properties. Increased velocity or shear can alter both, but sediment supply and channel geometry matter. A powerful sediment-starved flow can erode its bed. Do not infer total transported mass from the largest visible clast or from discharge alone.',
        ],
        [
          'Deposition',
          'Particles settle or accumulate when transport conditions and supply favor it. Coarse material often deposits before finer material as flow slows, but cohesion, density, shape, and flocculation complicate sorting. A drop in transport capacity can cause deposition even while water continues moving. Deposits record changing flow and sediment supply rather than one constant velocity. Examine grain distributions and structures together.',
        ],
        [
          'Channel patterns',
          'Meandering channels have sinuous paths with erosion and deposition patterns that can migrate. Braided channels contain multiple shifting threads around bars and often reflect high sediment supply and variable flow, among other controls. Straight and anastomosing forms have other contexts. Vegetation, bank strength, slope, discharge variability, and sediment all influence pattern. One aerial shape cannot uniquely identify the controlling process.',
        ],
        [
          'Linking flow and sediment',
          'The lab calculates water discharge but not sediment entrainment or channel migration. Explain why equal discharge can have different velocities in channels with different cross-sectional areas and different sediment behavior. A full transport model would need geometry, shear, grain properties, and supply. Use the hydrograph to predict when transport potential might rise, while keeping that hypothesis separate from a measured sediment load.',
        ],
      ],
      [
        ['Bed load', 'Sediment moving close to the bed.'],
        ['Suspended load', 'Particles maintained in the water column.'],
        ['Competence', 'Largest transportable particle under conditions.'],
        ['Capacity', 'Amount transportable under conditions.'],
      ],
      [
        'A river has Q=20 m³/s. Compare velocity for areas 10 and 20 m².',
        [
          'Use Q = Av.',
          'At 10 m², v=2 m/s.',
          'At 20 m², v=1 m/s; discharge alone does not fix velocity.',
        ],
        'Sediment interpretation needs geometry.',
      ],
      [
        [
          'Dissolved load consists of…',
          'Ions and molecules in solution',
          ['Only gravel', 'Only floating wood', 'Only sand'],
          'It differs from suspended particles.',
        ],
        [
          'Competence describes…',
          'Largest transportable particles',
          ['Total water volume', 'Only sediment color', 'Only rainfall'],
          'Capacity concerns amount.',
        ],
        [
          'Equal discharge guarantees equal velocity?',
          'No',
          ['Always', 'Only for rivers', 'Only at flood stage'],
          'Cross-sectional area matters.',
        ],
      ],
      [
        [
          'Why can a sediment-starved flow erode?',
          'Transport ability can exceed supplied load, allowing bed or bank entrainment.',
        ],
        [
          'What controls channel pattern?',
          'Slope, bank strength, vegetation, sediment supply, and flow variability interact.',
        ],
        [
          'Why is turbidity not total load?',
          'Optical response depends on particle properties and concentration, and load also needs flow.',
        ],
        [
          'What does the lab omit?',
          'Grain entrainment, shear stress, sediment supply, and channel evolution.',
        ],
      ],
      [
        ['Supply', 'Produce and deliver sediment.'],
        ['Transport', 'Apply flow and grain-dependent processes.'],
        ['Deposit', 'Accumulate material as conditions change.'],
      ],
      [
        ['Discharge', 'Water volume/time', 'Not velocity alone.'],
        ['Competence', 'Particle-size ability', 'Not total mass.'],
        ['Capacity', 'Transport amount', 'Depends on conditions and supply.'],
      ],
      'Compare narrow and broad synthetic hydrographs with equal volume. Propose sediment measurements needed to test transport timing.',
      'Sediment behavior reflects the interaction of flow, material, geometry, and supply.',
    ),
    c(
      'Fluvial landforms and river history',
      [
        'Connect erosion and deposition to landforms.',
        'Explain floodplain connectivity.',
        'Qualify paleohydrological inference.',
      ],
      [
        [
          'River work',
          'Rivers erode, transport, and deposit material while adjusting to slope, base level, discharge, and sediment supply. Valley form reflects both channel processes and surrounding geology. Downcutting can produce incised valleys, while lateral migration builds floodplain features. A channel is one part of a larger fluvial system. Interpret landforms over their formation timescale rather than attributing every feature to the current day’s flow.',
        ],
        [
          'Meander migration',
          'In many meanders, outer bends experience stronger erosion while inner bends accumulate point-bar deposits, but local flow and bank conditions matter. Migration can shift a channel across its floodplain. A cutoff can isolate a loop as an oxbow lake. A photograph of a bend shows geometry, while migration requires comparing positions over time. Separate a plausible mechanism from direct evidence that movement occurred.',
        ],
        [
          'Floodplain deposits',
          'Overbank flooding can deposit fine material outside the channel, and repeated events build layered floodplain records. Natural levees can form near channels where sediment deposition is concentrated. Floodplains also store water and support ecological exchanges. Engineering barriers can alter connectivity and redistribute hazards. A flat area beside a river is not automatically safe or currently active floodplain; maps and historical evidence are needed.',
        ],
        [
          'Terraces and base level',
          'River terraces can preserve former floodplain or channel levels after incision or other changes. Tectonics, climate, sediment supply, and base-level change can contribute. A terrace elevation alone does not identify its age or one unique cause. Compare stratigraphy, dating, and regional context. Base level constrains erosion but is not a simple statement that all rivers must immediately reach one flat profile.',
        ],
        [
          'Paleohydrology: optional extension',
          'Past-flow reconstruction can use landforms, sediment, high-water indicators, and dating. Hydraulic interpretation depends on channel geometry and assumptions, while preservation is selective. A large deposit may reflect unusual supply or blockage as well as large flow. Treat inferred discharge as a model-based estimate with uncertainty. This syllabus marks paleohydrology as enrichment; foundational landform reasoning remains useful without a full reconstruction calculation.',
        ],
        [
          'Maps and time series',
          'Compare dated aerial images, cross sections, topography, and sediment descriptions. Align scale and reference points before inferring migration. The lab’s hydrograph represents one event and cannot carve a valley or date a terrace. Use it to distinguish peak flow, duration, and volume, then explain why landform development depends on repeated events, material resistance, and longer history.',
        ],
      ],
      [
        ['Point bar', 'Inner-bend depositional feature.'],
        ['Oxbow', 'Cutoff former channel loop.'],
        ['Terrace', 'Elevated remnant of an earlier river level or surface.'],
        ['Base level', 'Constraint on downward erosion.'],
      ],
      [
        'Two events share peak discharge but one lasts longer. Why might their geomorphic effects differ?',
        [
          'Peak alone omits duration and volume.',
          'Longer transport opportunity can alter sediment movement.',
          'Actual effects still depend on grains, banks, and supply.',
        ],
        'A single hydrograph metric is insufficient.',
      ],
      [
        [
          'An oxbow commonly forms through…',
          'Meander cutoff',
          ['Only glacier freezing', 'Only coral growth', 'Only groundwater pumping'],
          'A former loop becomes isolated.',
        ],
        [
          'Terrace elevation alone establishes exact age?',
          'No',
          ['Always', 'Only for sandstone', 'Only below sea level'],
          'Dating and context are needed.',
        ],
        [
          'Migration evidence is strongest from…',
          'Comparable positions over time',
          ['One unlabeled image', 'One water sample', 'Only river name'],
          'Change needs temporal comparison.',
        ],
      ],
      [
        [
          'What can form a point bar?',
          'Deposition on the inner part of a bend under suitable flow conditions.',
        ],
        [
          'Why are floodplains connected systems?',
          'They exchange water, sediment, nutrients, and organisms with channels.',
        ],
        [
          'Name a terrace interpretation uncertainty.',
          'Several processes and preservation histories can produce elevated surfaces.',
        ],
        [
          'Why is paleoflow model-based?',
          'Discharge is inferred from preserved evidence using hydraulic and historical assumptions.',
        ],
      ],
      [
        ['Flow', 'Apply events to a resistant landscape.'],
        ['Change', 'Erode banks and deposit sediment.'],
        ['Preserve', 'Read landforms through time and context.'],
      ],
      [
        ['Peak', 'Maximum rate', 'Omits duration.'],
        ['Landform', 'Integrated history', 'Not one current flow.'],
        ['Paleoflow', 'Reconstructed estimate', 'Needs preserved evidence and assumptions.'],
      ],
      'Compare equal-volume hydrographs with different peaks. Explain why neither alone predicts a meander cutoff.',
      'River landforms record cumulative processes whose histories require more than one image or peak value.',
    ),
    c(
      'Streamflow, hydrographs, and floods',
      [
        'Interpret discharge through time.',
        'Distinguish flood probability and recurrence.',
        'Use continuity and optional hydraulic relations.',
      ],
      [
        [
          'Discharge and stage',
          'Discharge is volume passing a cross section per time, commonly cubic meters per second. Stage is water-surface elevation relative to a reference. A rating relation connects stage and discharge under calibrated conditions, but channel change or backwater can alter it. High stage is not universally the same discharge at every site. A measurement requires location, datum, method, and uncertainty.',
        ],
        [
          'Hydrograph components',
          'A hydrograph plots discharge against time, showing rising limb, peak, and recession. Baseflow and event runoff can contribute differently. Time to peak and lag depend on routing, storage, rainfall distribution, and basin characteristics. Integrating discharge over time gives volume; peak alone does not. Two curves with the same peak can transport different total volumes. Read axis units before estimating an area under the curve.',
        ],
        [
          'Flood mechanisms',
          'Intense rain, prolonged rain, snowmelt, rain on snow, obstructions, and coastal or downstream effects can contribute to flooding in different systems. Antecedent saturation can increase rapid runoff. Urban drainage can accelerate response, while storage can attenuate it under suitable conditions. A flood is a system response, not simply a rainfall threshold identical for every basin. Exposure and vulnerability determine consequences as well as physical water levels.',
        ],
        [
          'Probability',
          'A one-percent annual-exceedance event has a one-percent chance of exceedance in each year under the stated model. It does not occur exactly once per century, and successive years can both exceed it. Independence and stationarity assumptions matter when combining years or interpreting a historical estimate. Changing land use, climate, channels, or data can affect estimates. Recurrence terminology should not imply a protective waiting period after a flood.',
        ],
        [
          'Mathematical extension',
          'Continuity Q = Av connects cross-sectional area and mean velocity. More advanced open-channel relationships introduce roughness, hydraulic radius, and slope under specific flow assumptions. The syllabus marks mathematical relationships as enrichment. Use units and model limits before substituting values. A formula calibrated for uniform steady flow is not automatically valid in a rapidly changing flood or a complex backwater reach.',
        ],
        [
          'Synthetic hydrographs',
          'The lab distributes runoff volume V over a triangular event of duration D, giving peak 2V/D with seconds used consistently. Doubling duration at fixed volume halves peak. This is a transparent routing illustration, not a flood forecast or calibrated rating curve. Record the integral check and identify what real rainfall timing, channel storage, and measured calibration would add.',
        ],
      ],
      [
        ['Stage', 'Water elevation relative to a reference.'],
        ['Hydrograph', 'Discharge versus time.'],
        ['Rating curve', 'Site-specific stage–discharge relation.'],
        ['Annual exceedance', 'Probability of exceeding a level in a year.'],
      ],
      [
        'A triangular hydrograph has base 4 h and peak 10 m³/s above zero. Find volume.',
        ['Convert 4 h to 14,400 s.', 'Area = 1/2 × base × peak.', 'Volume = 72,000 m³.'],
        'Integration uses time in compatible units.',
      ],
      [
        [
          'Hydrograph area represents…',
          'Volume',
          ['Only peak stage', 'Only velocity', 'Only basin area'],
          'Integrate discharge over time.',
        ],
        [
          'A 100-year label means exact spacing?',
          'No',
          ['Always', 'Only for rivers', 'Only after one flood'],
          'It expresses a probability model.',
        ],
        [
          'Stage and discharge are…',
          'Related but different quantities',
          ['Identical units', 'Always equal numbers', 'Unrelated by any model'],
          'A calibrated relation connects them.',
        ],
      ],
      [
        [
          'Why can a rating curve change?',
          'Channel geometry or backwater conditions can alter stage–flow relationships.',
        ],
        ['What happens to peak if duration doubles at fixed triangular volume?', 'It halves.'],
        ['Why record antecedent moisture?', 'It affects infiltration and runoff response.'],
        [
          'What limits recurrence estimates?',
          'Finite data and assumptions about independence and stationarity.',
        ],
      ],
      [
        ['Generate', 'Rainfall and storage produce runoff.'],
        ['Route', 'Timing shapes the hydrograph.'],
        ['Integrate', 'Compare peak, duration, and total volume.'],
      ],
      [
        ['Stage', 'Height', 'Needs a reference datum.'],
        ['Discharge', 'Volume/time', 'Not velocity alone.'],
        ['Recurrence', 'Statistical description', 'Not a timetable.'],
      ],
      'Keep runoff volume fixed and double duration. Verify peak halves and integrated volume remains constant.',
      'A flood description needs probability, timing, volume, and site context.',
    ),
    c(
      'Groundwater, aquifers, karst, and Darcy flow',
      [
        'Distinguish porosity and permeability.',
        'Interpret hydraulic head and gradients.',
        'Apply Darcy’s law within assumptions.',
      ],
      [
        [
          'Subsurface zones',
          'The unsaturated zone contains both air and water in pore space, while the saturated zone has connected pores filled with water in the simple model. The water table is a surface related to atmospheric pressure in an unconfined aquifer, not the top of one underground river. Capillary effects and perched water add complexity. Groundwater occurs in pores and fractures; some karst systems also have larger conduits.',
        ],
        [
          'Storage and transmission',
          'Porosity is the fraction of void space, while permeability describes the ability of a medium to transmit fluid through connected pathways. High porosity does not guarantee high permeability; clay can store water in small pores yet transmit it slowly. Hydraulic conductivity also depends on fluid properties. An aquifer can transmit usable quantities under a defined context, while an aquitard restricts flow relative to adjacent units.',
        ],
        [
          'Head and flow',
          'Hydraulic head combines elevation and pressure contributions under the usual groundwater model. Flow tends from higher to lower head, not necessarily vertically downhill from the land surface. Wells can measure head when properly constructed and interpreted. Pumping can lower nearby head and create a cone of depression. A well’s water level is a measurement with location, screened interval, and timing, not a universal map of all depths.',
        ],
        [
          'Darcy’s law: extension',
          'For suitable saturated flow, volumetric rate magnitude can be written Q = KAi, where i is hydraulic gradient and the signed vector form follows decreasing head. K has length/time units, A area, and i is dimensionless. Darcy flux Q/A is not the same as average pore-water velocity, which additionally depends on effective porosity. The lab uses a homogeneous one-dimensional medium; turbulent conduit flow can violate this model.',
        ],
        [
          'Karst',
          'Dissolution of soluble rock such as limestone can produce sinkholes, caves, and conduit networks under suitable chemistry and flow. Rapid preferential transport can connect surface contamination to groundwater with limited filtration. Surface divides may not match subsurface contributing areas. Not every cave forms by the same mechanism, and a sinkhole map alone does not establish exact flow paths. Tracing and monitoring require appropriate methods and context.',
        ],
        [
          'Groundwater interpretation',
          'Combine geology, well construction, head measurements, pumping history, and water chemistry. Draw the assumed flow direction and unit boundaries before calculating. The Darcy lab lets you vary K, area, head difference, and length separately; it does not predict a real well yield or contaminant arrival time. Explain which porosity, dispersion, reaction, and boundary information would be required to extend the model.',
        ],
      ],
      [
        ['Porosity', 'Void-space fraction.'],
        ['Hydraulic conductivity', 'Transmission coefficient including medium and fluid effects.'],
        ['Hydraulic head', 'Elevation-plus-pressure potential measure.'],
        ['Darcy flux', 'Volumetric flow per bulk cross-sectional area.'],
      ],
      [
        'K=0.001 m/s, A=10 m², head drop=2 m over 100 m. Find Q.',
        [
          'Gradient i = 2/100 = 0.02.',
          'Q = 0.001 × 10 × 0.02.',
          'Q = 0.0002 m³/s, toward lower head.',
        ],
        'Pore velocity needs effective porosity too.',
      ],
      [
        [
          'High porosity always means high permeability?',
          'No',
          ['Always', 'Only for clay', 'Only below water table'],
          'Connectivity and pore size matter.',
        ],
        ['Darcy flux equals…', 'Q/A', ['Q×A', 'K/A', 'Porosity alone'], 'It uses bulk area.'],
        [
          'Flow generally follows…',
          'Decreasing hydraulic head',
          ['Only surface slope', 'Increasing head always', 'Only north'],
          'Head includes pressure and elevation.',
        ],
      ],
      [
        [
          'Why can karst move contaminants quickly?',
          'Conduits provide rapid preferential paths with limited filtering.',
        ],
        [
          'What changes pore velocity relative to Darcy flux?',
          'Effective porosity and flow distribution.',
        ],
        [
          'What does pumping alter?',
          'Head and gradients, potentially drawing water from different directions.',
        ],
        [
          'Name a Darcy-model limit.',
          'Homogeneous saturated laminar assumptions may fail in complex or turbulent conduits.',
        ],
      ],
      [
        ['Measure', 'Determine head at known locations.'],
        ['Gradient', 'Divide head difference by path length.'],
        ['Transmit', 'Combine K, area, and gradient.'],
      ],
      [
        ['Porosity', 'Storage geometry', 'Not transmission alone.'],
        ['Conductivity', 'Flow coefficient', 'Depends on medium and fluid.'],
        ['Pore velocity', 'Water movement in voids', 'Not Q/A alone.'],
      ],
      'Double K, then double flow length separately at fixed head drop. Explain why their effects on Q are opposite.',
      'Groundwater flow depends on connected pathways and hydraulic head, not simply depth.',
    ),
    c(
      'Lakes, wetlands, and freshwater storage',
      [
        'Compare formation mechanisms.',
        'Explain lake stratification and turnover.',
        'Connect wetland hydrology to function.',
      ],
      [
        [
          'Lake formation',
          'Lakes occupy depressions created by processes such as glaciation, tectonics, volcanism, river cutoffs, landslides, or human dams. Formation controls basin shape and connections but does not uniquely determine present chemistry. A reservoir is managed storage with operating rules that affect water levels and flow. Define inputs and outlets, including groundwater, before estimating residence time. A closed surface basin can still exchange water through evaporation or subsurface pathways.',
        ],
        [
          'Thermal layers',
          'Many lakes develop seasonal thermal stratification, with a warmer upper layer, transition zone, and deeper layer under suitable conditions. Mixing regimes vary with climate, depth, salinity, wind, and ice cover. Turnover is not universally identical twice a year in every lake. Density relationships and energy input determine stability. A surface temperature measurement cannot describe the entire water column.',
        ],
        [
          'Oxygen and nutrients',
          'Stratification can restrict oxygen renewal at depth while decomposition consumes oxygen. Nutrients can accumulate or be transformed in sediments and deep water. Mixing can redistribute them, changing productivity and exposure. Trophic labels summarize aspects of nutrient and production status but are not complete health scores. Light, depth, food webs, and inputs all matter. Compare profiles and seasonal observations rather than one surface sample.',
        ],
        [
          'Wetland diversity',
          'Wetlands are characterized by hydrology, soils, and adapted organisms under relevant definitions. Marshes commonly have herbaceous vegetation, swamps woody vegetation, and peatlands accumulate partially decomposed organic material under suitable conditions. Bogs and fens differ in water and nutrient sources. These categories vary regionally. A wetland is not simply any temporary puddle or a habitat with one particular species.',
        ],
        [
          'Functions and limits',
          'Wetlands can store water, alter flow timing, retain or transform nutrients, support habitat, and accumulate carbon. Performance depends on connectivity, residence time, loading, redox conditions, and vegetation. They do not remove every contaminant indefinitely. Stored material can be remobilized under changed conditions. Management should consider both hydrological and ecological effects rather than treating a wetland as a universal passive filter.',
        ],
        [
          'Storage models',
          'The event hydrograph illustrates how duration affects peak at fixed volume, offering a conceptual link to attenuation. It does not calculate a lake’s outlet relation or wetland treatment capacity. A reservoir model would require storage–elevation–outflow relationships and operating rules. Explain the difference between delaying water and removing it from a system. Conservation still applies when peak discharge decreases.',
        ],
      ],
      [
        ['Stratification', 'Layering that limits mixing.'],
        ['Turnover', 'Water-column mixing under suitable conditions.'],
        ['Peat', 'Accumulated partly decomposed organic material.'],
        ['Attenuation', 'Reduction or spreading of a flow peak.'],
      ],
      [
        'A storage feature lowers peak outflow but releases the same event volume later. Was water destroyed?',
        [
          'Compare integrated inflow and outflow.',
          'Temporary storage changes timing.',
          'Equal total volume is consistent with conservation.',
        ],
        'Lower peak does not imply permanent removal.',
      ],
      [
        [
          'Every lake mixes twice per year?',
          'No',
          ['Always', 'Only if deep', 'Only if freshwater'],
          'Mixing regimes vary.',
        ],
        [
          'A bog is typically associated with…',
          'Precipitation-dominated water supply',
          ['Only seawater tides', 'Only bedrock magma', 'Only industrial pipes'],
          'Peatland sources differ.',
        ],
        [
          'Wetlands remove all contaminants forever?',
          'No',
          ['Always', 'Only in summer', 'Only if large'],
          'Capacity and remobilization matter.',
        ],
      ],
      [
        ['Why measure profiles?', 'Temperature and oxygen can vary strongly with depth.'],
        [
          'Name a lake formation mechanism.',
          'Glacial erosion/deposition, tectonic depression, volcanic basin, cutoff, or damming.',
        ],
        [
          'What limits wetland treatment?',
          'Loading, residence time, chemistry, connectivity, and finite retention.',
        ],
        [
          'What is needed for reservoir prediction?',
          'Storage–elevation–outflow relations and relevant management rules.',
        ],
      ],
      [
        ['Store', 'Retain water in a basin or wetland.'],
        ['Process', 'Mix, react, and exchange material.'],
        ['Release', 'Alter timing and downstream conditions.'],
      ],
      [
        ['Lake', 'Open-water storage', 'Depth and mixing vary.'],
        ['Wetland', 'Hydrology–soil–biota system', 'Not an unlimited filter.'],
        ['Attenuation', 'Peak reduction', 'Volume can remain unchanged.'],
      ],
      'Increase hydrograph duration at fixed volume and describe a conceptual storage effect without claiming a calibrated reservoir model.',
      'Lakes and wetlands change timing and biogeochemistry while remaining parts of a water budget.',
    ),
    c(
      'Land use, water pollution, and hydrological impacts',
      [
        'Trace changes in runoff and recharge.',
        'Distinguish concentration and load.',
        'Evaluate management with matched observations.',
      ],
      [
        [
          'Land-cover pathways',
          'Vegetation, soil structure, compaction, impervious cover, and drainage infrastructure influence infiltration and runoff timing. Urbanization can create faster connected pathways, while agricultural and forestry practices can alter sediment and evapotranspiration. Effects depend on scale and management rather than the land-use label alone. A basin-wide percentage can hide where surfaces connect to channels. Map pathways and storage as well as total area.',
        ],
        [
          'Flow alteration',
          'Dams, diversions, withdrawals, and drainage change flow magnitude, timing, temperature, and connectivity. A reduced peak can coexist with changed low flows or sediment transport. Groundwater pumping can affect streamflow through connected systems, sometimes with delays. Distinguish intended management outcome from all downstream consequences. A flow regime includes seasonal and event behavior, not only annual average discharge.',
        ],
        [
          'Pollutant transport',
          'Sediment, nutrients, salts, pathogens, and chemical contaminants follow different pathways and transformations. Concentration multiplied by discharge estimates instantaneous load rate with compatible units. Storms can increase total transport even when dilution lowers concentration. Dissolved and particulate fractions can respond differently. Identify the substance, form, sampling method, and hydrological condition before comparing sites or proposing a source.',
        ],
        [
          'Management mechanisms',
          'Riparian buffers, erosion control, infiltration practices, treatment, and source reduction address different causes. A measure may reduce one pollutant while having limited effect on another. Maintenance and location matter. Increased infiltration can improve recharge but may also transport contaminants if source quality is poor. Evaluate benefits and limitations through the specific pathway rather than treating one technique as universally effective.',
        ],
        [
          'Monitoring inference',
          'Compare similar seasons and flow conditions, use reference sites where appropriate, and account for rainfall variation. A before/after change is not automatically caused by the intervention. Repeated samples reduce uncertainty about variability but do not remove systematic sensor bias. Include discharge and timing when estimating loads. Report uncertainty and alternative explanations in a form that supports a testable conclusion.',
        ],
        [
          'Using the event model',
          'Change runoff fraction while holding rainfall and area fixed. The lab predicts direct-runoff volume and a synthetic peak, illustrating one possible consequence of altered partitioning. It does not infer groundwater recharge, pollutant chemistry, or a real urban basin’s hydrograph. State which observations would estimate the fraction and which additional processes would be needed to evaluate a management project.',
        ],
      ],
      [
        ['Impervious', 'Strongly restricting infiltration through a surface.'],
        ['Flow regime', 'Pattern of flow magnitude and timing.'],
        ['Load rate', 'Concentration × discharge.'],
        ['Riparian', 'Associated with river margins.'],
      ],
      [
        'Concentration is 2 mg/L and discharge is 3 m³/s. Find load rate.',
        ['Convert 3 m³/s to 3000 L/s.', 'Multiply 2 mg/L × 3000 L/s = 6000 mg/s.', 'Report 6 g/s.'],
        'Concentration alone is not transported mass per time.',
      ],
      [
        [
          'Impervious connectivity can affect…',
          'Runoff timing',
          ['Only mineral hardness', 'Only gene frequency', 'No water process'],
          'Drainage pathways matter.',
        ],
        [
          'Load rate needs…',
          'Concentration and discharge',
          ['Only pH', 'Only map area', 'Only color'],
          'Transport combines both.',
        ],
        [
          'Before/after change proves causality alone?',
          'No',
          ['Always', 'Only after one storm', 'Only in a reservoir'],
          'Confounders must be considered.',
        ],
      ],
      [
        [
          'Why map drainage connections?',
          'Connected surfaces can route runoff rapidly to channels.',
        ],
        [
          'How can pumping affect streams?',
          'Connected groundwater gradients and discharge can change, sometimes with delay.',
        ],
        [
          'Why can dilution hide load?',
          'Lower concentration may accompany greater flow, leaving load unchanged or higher.',
        ],
        [
          'What does the lab not predict?',
          'Actual recharge, pollutant transformations, or intervention effectiveness.',
        ],
      ],
      [
        ['Alter', 'Change land cover or flow pathways.'],
        ['Respond', 'Modify partitioning and transport.'],
        ['Measure', 'Compare flow and constituent loads.'],
      ],
      [
        ['Concentration', 'Amount/volume', 'Can fall by dilution.'],
        ['Load', 'Mass/time', 'Needs discharge.'],
        ['Intervention', 'Targets a pathway', 'Effects are context-specific.'],
      ],
      'Raise runoff fraction from 0.3 to 0.6 at fixed rainfall. Compare event volume and peak, then state the missing recharge information.',
      'Human impacts change connected pathways whose effects need measured water and material budgets.',
    ),
    c(
      'Maps, monitoring, and integrated freshwater investigations',
      [
        'Read map scales and contours.',
        'Match monitoring tools to questions.',
        'Synthesize evidence with uncertainty.',
      ],
      [
        [
          'Map literacy',
          'Check title, projection, scale, units, date, and legend. Contours connect equal elevation and help infer slope and divides, while colors may encode categories rather than height. Spatial resolution determines which channels or wetlands are represented. A historical map and current image may differ in method as well as landscape. Align reference points and metadata before treating every discrepancy as real change.',
        ],
        [
          'Cross sections',
          'A cross section translates a surface path into elevation and subsurface relationships. Groundwater head, water table, aquifer boundaries, and land surface are different lines with different meanings. Vertical exaggeration can make slopes look steeper. Label axes and distinguish observed boundaries from inferred ones. A diagram that omits scale can teach concepts but cannot support a precise distance or gradient calculation.',
        ],
        [
          'Monitoring tools',
          'Rain gauges, stream gauges, velocity measurements, wells, temperature loggers, and remote sensing answer different questions. Instruments require calibration and suitable placement. A satellite image can show surface extent but may not measure depth or subsurface flow directly. Continuous monitoring resolves timing but can have drift or gaps. A manual sample can provide chemistry while missing short events. Combine methods around the mechanism being tested.',
        ],
        [
          'Sampling design',
          'Define hypotheses, sites, intervals, depths, and event triggers. Include references, duplicates, and instrument checks as appropriate. A convenient location may not represent the basin. Sampling only low flow can miss storm transport, while sampling only storms can miss groundwater-supported conditions. Record uncertainty and missing data rather than quietly interpolating a dramatic event. Choose coverage to separate competing explanations.',
        ],
        [
          'Integrated case',
          'For a flashy urban stream, combine rainfall, impervious connectivity, hydrographs, and water-quality samples. For declining groundwater, combine heads, pumping, recharge context, and geology. Use the simplest model that answers the question without claiming missing processes are negligible. A well-supported explanation links each measured quantity to a particular part of the mechanism. Alternative causes should generate different predicted observations.',
        ],
        [
          'Optional synthesis',
          'This enrichment unit extends the foundational freshwater course into research-style interpretation. The lab provides a conserved event model and an independent Darcy model, not a full coupled basin forecast. Compare their units, inputs, and assumptions. Explain why adding their outputs without defining connected boundaries would be meaningless. Scientific synthesis connects models through explicit interfaces and verifies them against appropriate observations.',
        ],
      ],
      [
        ['Datum', 'Reference for elevation or position.'],
        ['Resolution', 'Scale of distinguishable detail.'],
        ['Hydraulic gradient', 'Head difference per flow length.'],
        ['Monitoring design', 'Plan connecting observations to a question.'],
      ],
      [
        'Two wells have heads 110 and 106 m, separated by 200 m. Find gradient magnitude.',
        [
          'Head drop is 4 m.',
          'Gradient = 4/200 = 0.020.',
          'Flow direction is toward lower head under the model.',
        ],
        'Land-surface slope alone is not the calculation.',
      ],
      [
        [
          'A contour connects equal…',
          'Elevation',
          ['Discharge', 'Rainfall always', 'Chemical concentration always'],
          'Read the map legend.',
        ],
        [
          'Vertical exaggeration changes…',
          'Displayed slope appearance',
          ['Actual geology automatically', 'Measured head automatically', 'Water mass'],
          'It is a representation choice.',
        ],
        [
          'Best monitoring design begins with…',
          'A defined question',
          ['Maximum instruments', 'Only convenience', 'Only an attractive map'],
          'Methods should answer the mechanism.',
        ],
      ],
      [
        ['What should accompany a map?', 'Scale, legend, date, reference, and method context.'],
        [
          'Why combine gauges and samples?',
          'Flow timing and constituent measurements address complementary transport questions.',
        ],
        [
          'Why not add Darcy Q and event peak blindly?',
          'Their boundaries, pathways, and timing may differ or overlap.',
        ],
        [
          'What makes a hypothesis testable?',
          'It predicts observations that differ from plausible alternatives.',
        ],
      ],
      [
        ['Map', 'Define space and reference.'],
        ['Monitor', 'Measure relevant processes through time.'],
        ['Synthesize', 'Connect budgets and test alternatives.'],
      ],
      [
        ['Image', 'Surface representation', 'May not reveal depth.'],
        ['Gauge', 'Time series', 'Needs calibration.'],
        ['Model', 'Conditional prediction', 'Needs boundary compatibility.'],
      ],
      'Compare the event and Darcy modes. Write their units and boundaries and explain what would connect them in a real catchment.',
      'Integrated hydrology combines compatible models and observations rather than simply collecting more numbers.',
      true,
    ),
  ],
});
