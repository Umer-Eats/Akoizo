import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const waterLessons = buildCourse({
  eventId: 'water-quality',
  eventName: 'Water Quality',
  prefix: 'water',
  lab: 'water',
  syllabus: 'Water Quality B_C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Nine units follow the supplied marine and estuary syllabus, connecting water chemistry, ecosystem processes, reef organisms, and salinity measurement. Virtual mixtures and oxygen budgets are simplified teaching models, not environmental compliance assessments. Unit 9 is optional enrichment.',
  references: [
    {
      title: 'NOAA: Estuaries',
      url: 'https://oceanservice.noaa.gov/education/tutorial_estuaries/',
    },
    { title: 'NOAA: Coral reefs', url: 'https://oceanservice.noaa.gov/education/tutorial_corals/' },
    { title: 'USGS Water Science School', url: 'https://www.usgs.gov/water-science-school' },
  ],
  chapters: [
    c(
      'Water properties and interacting cycles',
      [
        'Trace water and element fluxes.',
        'Distinguish storage from movement.',
        'Connect stratification to water properties.',
      ],
      [
        [
          'Water’s molecular properties',
          'Water’s polarity and hydrogen bonding help explain cohesion, relatively high heat capacity, and solvent behavior. Dissolved salts change density and freezing behavior. Ice is less dense than liquid fresh water near freezing, influencing lake and polar environments. These properties are mechanisms, not a promise that water dissolves everything. Solubility depends on the substance, temperature, pressure, and chemical conditions; particles suspended in water are not necessarily dissolved.',
        ],
        [
          'The hydrological budget',
          'Precipitation, evaporation, transpiration, runoff, infiltration, and groundwater flow move water among stores. A budget uses change in storage = inputs − outputs over a defined region and interval. Water can cross a watershed through pipes or groundwater as well as surface channels. A large reservoir can have slow turnover even when its flux is substantial. Keep volume, flux per time, and residence time as separate quantities.',
        ],
        [
          'Carbon and oxygen',
          'Photosynthesis incorporates inorganic carbon into organic matter and can release oxygen, while respiration and decomposition consume oxygen and return carbon. Gas exchange also connects water and atmosphere. A daytime oxygen measurement may differ from a predawn one because these processes vary over the day. Carbonate chemistry links dissolved carbon, pH, and alkalinity. One pH reading cannot reveal all carbon stores or rates without further measurements.',
        ],
        [
          'Nitrogen and phosphorus',
          'Nitrogen fixation, assimilation, mineralization, nitrification, and denitrification move nitrogen among chemical forms. These transformations depend on organisms and conditions such as oxygen availability. Phosphorus often cycles through dissolved, particulate, and sediment-associated forms without a comparable major atmospheric gas phase. Nutrient enrichment can stimulate production, but the limiting nutrient depends on the ecosystem and season. More nutrients do not automatically mean healthier water.',
        ],
        [
          'Density and mixing',
          'Temperature and salinity affect density, which can produce stratification or encourage mixing. A fresh surface layer over saline water can restrict vertical oxygen exchange. Wind, tides, river input, and seasonal heating modify this structure. A surface sample may therefore miss low oxygen near the bottom. A useful sampling plan specifies depth, location, tidal stage, and time rather than treating an estuary as a uniformly mixed container.',
        ],
        [
          'Linking cycles to evidence',
          'Follow an input through transformations and outputs. Nutrient runoff may increase algal production, followed by oxygen demand during decomposition, but this causal chain needs observations at relevant times and depths. The lab separates a salinity mixture from a short oxygen budget so that one does not falsely determine the other. Record assumptions and identify measurements needed to test a field explanation. Cycles describe connected processes rather than isolated memorized arrows.',
        ],
      ],
      [
        ['Flux', 'Transfer per unit time.'],
        ['Residence time', 'Storage divided by an appropriate flux under a steady approximation.'],
        ['Stratification', 'Vertical density layering.'],
        ['Denitrification', 'Microbial conversion of oxidized nitrogen toward gaseous forms.'],
      ],
      [
        'A bay receives 8 units/day and loses 6 units/day. Find storage change over three days.',
        [
          'Net input is 8 − 6 = 2 units/day.',
          'Multiply by three days.',
          'Storage increases by 6 units if fluxes remain constant.',
        ],
        'A budget requires a boundary and interval.',
      ],
      [
        [
          'Storage change equals…',
          'Inputs minus outputs',
          ['Inputs plus outputs always', 'Only evaporation', 'Only initial volume'],
          'Conserve water.',
        ],
        [
          'A surface sample can miss…',
          'Bottom-water oxygen depletion',
          ['All salinity', 'Every organism', 'All dissolved gases'],
          'Stratification can isolate depths.',
        ],
        [
          'Respiration generally…',
          'Consumes oxygen',
          ['Creates unlimited oxygen', 'Eliminates nitrogen', 'Only occurs in animals'],
          'Many organisms respire.',
        ],
      ],
      [
        [
          'Why separate storage and flux?',
          'They have different units and describe different aspects of the system.',
        ],
        [
          'How can nutrients lower later oxygen?',
          'Enhanced production can supply organic matter whose decomposition consumes oxygen.',
        ],
        ['Name two density controls.', 'Temperature and salinity.'],
        [
          'What should a sampling record include?',
          'Location, depth, time, tidal conditions, method, and units.',
        ],
      ],
      [
        ['Input', 'Water and nutrients cross the boundary.'],
        ['Transform', 'Organisms and chemistry change forms.'],
        ['Output', 'Exchange and transport complete the budget.'],
      ],
      [
        ['Dissolved', 'Molecular or ionic solution', 'Not suspended grains.'],
        ['Storage', 'Amount within a boundary', 'Not a rate.'],
        ['Flux', 'Movement per time', 'Can vary seasonally.'],
      ],
      'Hold salinity fixed and change oxygen demand. Explain why salinity alone cannot predict the oxygen budget.',
      'Aquatic cycles connect storage, transport, chemical form, and biological activity.',
    ),
    c(
      'Chemical, physical, and biological water measures',
      [
        'Interpret units and sampling context.',
        'Compare oxygen concentration and demand.',
        'Use several indicators rather than one score.',
      ],
      [
        [
          'Chemical measurements',
          'Dissolved oxygen, pH, nutrients, alkalinity, salinity, and selected contaminants describe different chemical properties. Dissolved oxygen concentration is not the same as percent saturation; saturation depends on temperature, salinity, and pressure. pH is logarithmic, so arithmetic averaging can be misleading. Alkalinity describes acid-neutralizing capacity rather than pH itself. State measurement methods and conditions before comparing values from different places or instruments.',
        ],
        [
          'Physical measurements',
          'Temperature, turbidity, transparency, depth, and flow constrain interpretation. Turbidity measures light scattering under a specified method, whereas a Secchi depth records a visibility endpoint. Suspended sediment, plankton, and dissolved color can affect optical observations differently. Conductivity reflects ionic conduction and is often used to infer salinity with appropriate calibration, but it is temperature-sensitive and not a unique chemical fingerprint. Do not treat every optical or electrical reading as interchangeable.',
        ],
        [
          'Oxygen demand',
          'Biochemical oxygen demand estimates oxygen consumed by biological processes during a defined incubation, with method-specific conditions. It differs from the oxygen present at collection. High oxygen demand can contribute to later depletion if replenishment is insufficient. Chemical oxygen demand uses another analytical approach and does not measure the identical quantity. A single low oxygen reading does not identify which source or process caused it.',
        ],
        [
          'Biological evidence',
          'Organism communities integrate environmental conditions over time, but interpretation depends on habitat, season, identification quality, and sampling effort. Indicator organisms are evidence about conditions rather than infallible diagnostic labels. Chlorophyll can approximate photosynthetic biomass under stated methods, while microbial indicators address different questions. A missing organism could reflect unsuitable habitat or poor sampling rather than contamination. Combine biological findings with chemical and physical observations.',
        ],
        [
          'Quality assurance',
          'Calibrate instruments with suitable standards, record temperature compensation, use blanks or duplicates when appropriate, and keep sample handling consistent. Replication reveals variability but does not remove a shared calibration error. Detection limits matter: nondetection means below the method’s ability under stated conditions, not necessarily zero. Compare equivalent units and sampling depths. A result without collection context can be numerically precise yet environmentally misleading.',
        ],
        [
          'Integrated interpretation',
          'A warm stratified site with elevated nutrients, high chlorophyll, and low bottom oxygen supports a different explanation from a turbid, rapidly flowing site with similar surface oxygen. Build a mechanism and identify an alternative. The virtual lab reports salinity and a transparent oxygen bookkeeping model; it does not produce a universal healthy/unhealthy score. Applicable standards are context-specific and must not be invented from a classroom slider value.',
        ],
      ],
      [
        ['Alkalinity', 'Acid-neutralizing capacity.'],
        ['Turbidity', 'Method-dependent optical scattering measure.'],
        ['BOD', 'Oxygen demand over a defined biological incubation.'],
        ['Detection limit', 'Lowest reliably detectable amount under a method.'],
      ],
      [
        'Two sites both have 6 mg/L oxygen. Are they equally saturated?',
        [
          'Check temperature, salinity, and pressure.',
          'These affect equilibrium oxygen solubility.',
          'Equal concentration need not mean equal percent saturation.',
        ],
        'Units do not remove environmental context.',
      ],
      [
        [
          'pH is…',
          'Logarithmic',
          ['Linear concentration', 'A salinity unit', 'A direct oxygen measure'],
          'It relates to hydrogen-ion activity.',
        ],
        [
          'Nondetection means…',
          'Below the method’s detection capability',
          ['Exactly zero always', 'Definitely safe', 'No sampling needed'],
          'Method limitations remain.',
        ],
        [
          'BOD measures…',
          'Defined oxygen demand',
          ['Only initial oxygen', 'Only salt mass', 'Only current speed'],
          'It is distinct from dissolved oxygen concentration.',
        ],
      ],
      [
        [
          'Why calibrate conductivity?',
          'Temperature and instrument response influence salinity inference.',
        ],
        [
          'Why compare depths?',
          'Stratification can create different conditions at surface and bottom.',
        ],
        [
          'How can biology complement chemistry?',
          'Communities can integrate longer-term exposure, subject to habitat and sampling limits.',
        ],
        ['What does a duplicate not remove?', 'A systematic bias shared by both samples.'],
      ],
      [
        ['Collect', 'Define place, depth, and time.'],
        ['Measure', 'Use calibrated methods and units.'],
        ['Combine', 'Interpret multiple indicators with alternatives.'],
      ],
      [
        ['DO', 'Oxygen present', 'Not demand.'],
        ['BOD', 'Potential consumption', 'Method and interval matter.'],
        ['Indicator', 'Evidence about conditions', 'Not a universal verdict.'],
      ],
      'Compare oxygen input and demand while holding the starting concentration fixed. Record both concentration change and process explanation.',
      'Water-quality interpretation depends on method, context, and multiple independent measures.',
    ),
    c(
      'Human impacts, treatment, and pollution management',
      [
        'Distinguish wastewater and drinking-water treatment.',
        'Trace point and diffuse sources.',
        'Evaluate management through measured outcomes.',
      ],
      [
        [
          'Source pathways',
          'Point sources enter through identifiable outlets; nonpoint sources are distributed across land or atmospheric pathways. Storm runoff can carry nutrients, sediment, microbes, and chemicals. Exposure depends on concentration, duration, chemical form, and transport, not merely whether a substance is present. A source inventory should include timing and hydrological connections. Clear-looking water can contain dissolved contaminants, while visibly turbid water does not identify a specific toxin.',
        ],
        [
          'Wastewater treatment',
          'Typical treatment trains include physical removal of large material, settling, biological processing, and additional polishing or nutrient removal as required. Disinfection reduces targeted pathogens but does not necessarily remove dissolved salts or all chemicals. Sludge handling is part of the system rather than disappearance of captured matter. Different plants use different sequences. Follow where material goes and distinguish removal from conversion to another chemical form.',
        ],
        [
          'Potable-water treatment',
          'Drinking-water treatment depends on source quality and objectives. Coagulation and flocculation aggregate fine particles; settling and filtration remove suitable particles; disinfection addresses susceptible microbes. Membranes, adsorption, or other processes target additional substances. No single step makes every possible source potable. The course explains principles, not a home purification protocol; safety claims require validated treatment, testing, and applicable standards.',
        ],
        [
          'Eutrophication mechanisms',
          'Nutrient enrichment can increase primary production. Later respiration and decomposition can deplete oxygen, especially where stratification limits exchange. Algal blooms can have additional effects, but not every bloom produces toxins. Distinguish biomass, species composition, toxin measurements, and oxygen outcomes. A plausible nutrient explanation needs loading data and ecosystem context rather than a single green-water photograph. Prevention can address both nutrient sources and transport pathways.',
        ],
        [
          'Management choices',
          'Source reduction, buffer zones, erosion control, wastewater upgrades, and stormwater retention target different pathways. A measure’s success depends on design, maintenance, scale, and local conditions. Retention may change peak flow without eliminating every contaminant. Compare before/after observations with suitable references and account for weather differences. A lower measured concentration can result from dilution rather than a lower total load, so estimate flow as well as concentration.',
        ],
        [
          'Evidence and decisions',
          'Separate mechanism, observation, and management inference. If a treatment reduces nutrient loading but oxygen remains low, consider stored sediment nutrients, temperature, mixing, or time lag. The virtual oxygen budget lets you compare reduced demand with increased oxygen input, but it does not predict a real treatment plant’s performance. State which additional measurements would distinguish the proposed mechanism from another explanation and how long monitoring should continue.',
        ],
      ],
      [
        ['Point source', 'Identifiable discharge location.'],
        ['Nonpoint source', 'Distributed input pathway.'],
        ['Load', 'Quantity entering over time.'],
        ['Disinfection', 'Reduction of targeted viable pathogens.'],
      ],
      [
        'A river concentration halves while discharge doubles. What happens to load rate?',
        [
          'Use load rate = concentration × discharge.',
          'New rate is 0.5 × 2 = 1 times original.',
          'Concentration improved but load rate did not change.',
        ],
        'Dilution and source reduction differ.',
      ],
      [
        [
          'Disinfection necessarily removes all salts?',
          'No',
          ['Yes', 'Only when water is clear', 'Always after settling'],
          'Targets differ by process.',
        ],
        [
          'Nutrient enrichment can later reduce oxygen through…',
          'Respiration and decomposition',
          ['Creation of vacuum', 'Instant salt disappearance', 'Only increased sunlight'],
          'Organic matter supports demand.',
        ],
        [
          'Load rate combines…',
          'Concentration and flow',
          ['Color and price', 'pH and age only', 'Depth alone'],
          'Mass transport depends on both.',
        ],
      ],
      [
        [
          'Compare filtration and disinfection.',
          'Filtration removes suitable particles; disinfection inactivates targeted microbes.',
        ],
        [
          'Why monitor weather?',
          'Flow and dilution changes can confound before/after comparisons.',
        ],
        [
          'Name one source-control strategy.',
          'Reduce nutrient application losses or improve wastewater nutrient removal, with local validation.',
        ],
        [
          'Why might recovery lag?',
          'Stored nutrients and ecosystem processes can persist after external inputs decline.',
        ],
      ],
      [
        ['Source', 'Identify material and pathway.'],
        ['Intervene', 'Target removal, conversion, or input reduction.'],
        ['Monitor', 'Measure load and ecological response.'],
      ],
      [
        ['Clear water', 'Optical appearance', 'Not proof of potability.'],
        ['Concentration', 'Amount per volume', 'Can fall by dilution.'],
        ['Load', 'Transported quantity', 'Requires flow and time.'],
      ],
      'Reduce oxygen demand by half, then separately double oxygen input. Compare net changes and explain why field management needs more data.',
      'Treatment and management must target a defined substance, pathway, and measurable outcome.',
    ),
    c(
      'Food webs, niches, and population dynamics',
      [
        'Trace energy and matter differently.',
        'Interpret ecological interactions.',
        'Evaluate population models and sampling limits.',
      ],
      [
        [
          'Food-web connections',
          'Producers incorporate energy into organic matter; consumers and decomposers obtain it through other organisms or detritus. Arrows should be defined, commonly pointing from resource to consumer to show transfer. Omnivory and detrital pathways make real webs more complex than one chain. Energy dissipates as heat through transformations, while matter cycles. Removing one population can have indirect effects, but the direction and magnitude depend on the broader network.',
        ],
        [
          'Ecological pyramids',
          'Energy pyramids describe transfer rates across trophic levels and generally decline upward in comparable units. Biomass is a standing stock and can show a different shape, especially where phytoplankton turn over rapidly. Numbers depend strongly on organism size. A simplified ten-percent transfer rule is a teaching approximation, not a universal constant. State whether a graph shows energy per time, biomass, or organism count before drawing a conclusion.',
        ],
        [
          'Niche and habitat',
          'Habitat describes where an organism lives; niche includes its resource use and ecological relationships. Fundamental and realized niches differ because interactions and constraints modify actual occurrence. Competition, predation, mutualism, and parasitism affect populations in different ways. These categories describe effects under stated conditions, and some relationships can shift with environment. A species name alone does not establish its exact role in every community.',
        ],
        [
          'Population models',
          'Exponential growth assumes a constant per-capita growth rate without limiting feedback. Logistic growth introduces density dependence and a carrying-capacity parameter. Real populations experience changing resources, disturbance, migration, and age structure, so carrying capacity is not necessarily a fixed permanent number. Survivorship curves summarize mortality patterns across age, not a universal prediction for every individual. Distinguish model parameters from observed counts.',
        ],
        [
          'Diversity and evidence',
          'Richness counts species, while evenness describes relative abundances. Two communities can have equal richness but different dominance. Sampling effort, habitat area, season, and identification quality influence estimates. An observed absence needs interpretation relative to detection probability. Comparisons should standardize methods and report uncertainty. Diversity can inform ecological assessment but does not replace targeted chemical or pathogen measurements.',
        ],
        [
          'Linking oxygen to ecology',
          'Production and respiration connect food webs to oxygen cycles. High daytime production can coexist with low predawn oxygen or deep-water depletion. The virtual model has constant input and demand over a short interval and omits changing populations, photosynthetic light cycles, and reaeration feedback. Use it to reason about balance, then identify why a dynamic ecosystem requires repeated observations rather than extrapolating one straight line indefinitely.',
        ],
      ],
      [
        ['Niche', 'Resource use and ecological role.'],
        ['Richness', 'Number of species.'],
        ['Evenness', 'Distribution of relative abundances.'],
        ['Carrying capacity', 'Context-dependent population parameter in a model.'],
      ],
      [
        'Two sites have four species. One is dominated by a single species. Compare diversity information.',
        [
          'Richness is equal.',
          'Relative abundance differs.',
          'The dominated site has lower evenness.',
        ],
        'Richness alone misses community structure.',
      ],
      [
        [
          'Energy and matter differ because…',
          'Energy dissipates while matter cycles',
          ['Both disappear', 'Matter never moves', 'Energy cycles perfectly'],
          'Transfers have different accounting.',
        ],
        [
          'Habitat primarily describes…',
          'Where an organism lives',
          ['Only its ancestry', 'Only its pH', 'Its entire niche'],
          'Niche is broader.',
        ],
        [
          'Equal richness guarantees equal evenness?',
          'No',
          ['Always', 'Only in estuaries', 'Only for fish'],
          'Abundance distributions can differ.',
        ],
      ],
      [
        [
          'Why can biomass pyramids invert?',
          'Rapid producer turnover can support larger consumer standing biomass.',
        ],
        ['Why is carrying capacity conditional?', 'Resources and environmental conditions change.'],
        [
          'Name a sampling confounder.',
          'Different effort, habitat, season, or detection probability.',
        ],
        [
          'Why measure oxygen through a day?',
          'Production and respiration create time-dependent conditions.',
        ],
      ],
      [
        ['Produce', 'Capture energy into organic matter.'],
        ['Consume', 'Transfer material through the web.'],
        ['Recycle', 'Decomposition returns nutrients and consumes oxygen.'],
      ],
      [
        ['Energy', 'Transfer rate', 'Dissipates as heat.'],
        ['Biomass', 'Standing stock', 'Can reflect rapid turnover.'],
        ['Abundance', 'Individuals counted', 'Depends on size and sampling.'],
      ],
      'Compare oxygen balance under high and low production. Explain which food-web processes the constant-rate model omits.',
      'Ecological conclusions require the correct measure, timescale, and sampling context.',
    ),
    c(
      'Oceans, estuaries, reefs, and watersheds',
      [
        'Explain estuarine mixing.',
        'Compare reef types and threats.',
        'Connect upstream land use to coastal conditions.',
      ],
      [
        [
          'Marine gradients',
          'Ocean conditions vary with depth, light, temperature, circulation, nutrients, and substrate. The photic zone supports substantial photosynthesis where light is adequate; deeper waters depend on different energy and material pathways. Continental shelves and open-ocean waters can differ greatly in productivity. Avoid treating all saltwater as one habitat. A measurement must be located within its physical setting before assigning ecological meaning.',
        ],
        [
          'Estuarine mixing',
          'Estuaries connect freshwater input and marine influence, often with tides and strong salinity gradients. They range from well mixed to strongly stratified depending on river flow, tides, geometry, and other factors. Salinity can change over hours and with depth. A simple two-endmember mixture estimates composition under conservative mixing, but evaporation, precipitation, groundwater, and variable endmembers can invalidate the simple model. Always state the endmember values and volume assumptions.',
        ],
        [
          'Reef types',
          'Fringing reefs lie near shore, barrier reefs are separated by a lagoon, and atolls form ringlike structures around a lagoon, often associated with a long geological history. Reef-building corals create calcium carbonate frameworks and often depend on symbiotic algae. Not all corals build tropical shallow-water reefs. Species, depth, light, water motion, and chemistry influence reef structure. A reef photograph does not alone establish its geological origin or health.',
        ],
        [
          'Threat mechanisms',
          'Thermal stress can disrupt coral–algal symbiosis and cause bleaching; bleached coral is stressed but not automatically dead. Ocean acidification alters carbonate chemistry and can affect calcification. Sediment, nutrient enrichment, disease, physical damage, and overharvesting create additional pressures. Different threats need different evidence. A white skeleton and a pale living colony can be visually confusing, so combine tissue observations, history, and measurements rather than labeling every pale patch identically.',
        ],
        [
          'Watershed connections',
          'A watershed drains toward a defined outlet, but subsurface flow and human infrastructure can cross apparent surface boundaries. Land use affects runoff timing, sediment, nutrients, and contaminants reaching estuaries and reefs. Management therefore connects inland and coastal processes. Trace a pollutant from source through transport and transformation to exposure. Distance alone does not determine impact; retention, dilution, chemical form, and event timing matter.',
        ],
        [
          'Comparing habitats',
          'Use a table of salinity range, tidal influence, substrate, light, and characteristic organisms. An estuary can be highly productive while experiencing strong natural variability; variability itself is not proof of pollution. The lab’s salt mixture is intentionally independent of its oxygen budget. Explain why a saline sample can have high or low oxygen depending on temperature, biological demand, and exchange. Habitat categories guide hypotheses but do not replace measurements.',
        ],
      ],
      [
        ['Estuary', 'Coastal system influenced by freshwater and seawater.'],
        ['Endmember', 'Defined source composition in a mixture.'],
        ['Bleaching', 'Loss or reduction of symbionts or pigments in stressed coral.'],
        ['Watershed', 'Area draining to a defined outlet.'],
      ],
      [
        'Mix equal volumes of fresh water at 0 and seawater at 35 salinity units. Estimate final salinity.',
        [
          'Assume conservative mixing and additive volumes.',
          'Use the volume-weighted average.',
          'S = (0 + 35)/2 = 17.5.',
        ],
        'Real estuaries can violate simple endmember assumptions.',
      ],
      [
        [
          'Bleaching means coral is always already dead?',
          'No',
          ['Yes', 'Only at high tide', 'Only in an atoll'],
          'It indicates stress and symbiosis disruption.',
        ],
        ['Equal 0 and 35 endmembers yield…', '17.5', ['35', '70', '0'], 'Use a weighted mixture.'],
        [
          'A barrier reef commonly has…',
          'A lagoon separating it from shore',
          ['Only freshwater', 'No carbonate framework', 'No organisms'],
          'This distinguishes its setting.',
        ],
      ],
      [
        [
          'Name a salinity-model assumption.',
          'Conservative mixing with specified endmembers and no additional salt or water flux.',
        ],
        [
          'Why link watersheds and reefs?',
          'Upstream land use can affect coastal sediment, nutrients, and contaminants.',
        ],
        [
          'Distinguish acidification and bleaching.',
          'They involve different mechanisms, though both can stress reefs.',
        ],
        [
          'Why sample with tidal information?',
          'Tides can change water sources and salinity over short intervals.',
        ],
      ],
      [
        ['Land', 'Runoff carries water and material.'],
        ['Estuary', 'Mixing and transformation change exposure.'],
        ['Coast', 'Habitats respond to physical and chemical conditions.'],
      ],
      [
        ['Fringing', 'Near shore', 'Setting alone does not establish health.'],
        ['Barrier', 'Lagoon separates shore', 'Can experience multiple stressors.'],
        ['Atoll', 'Ringlike reef and lagoon', 'Requires geological context.'],
      ],
      'Change freshwater fraction from 0 to 100%. Record salinity at three settings and explain when a straight mixing line would fail.',
      'Coastal ecosystems connect watershed inputs with mixing, circulation, and biological processes.',
    ),
    c(
      'Reef organisms, identification, and indicator interpretation',
      [
        'Compare reef organism groups.',
        'Connect feeding and life history.',
        'Use indicator claims cautiously.',
      ],
      [
        [
          'Identification levels',
          'Begin with broad features such as body symmetry, skeleton, attachment, appendages, and feeding structures. Reef communities include cnidarians, sponges, mollusks, echinoderms, crustaceans, fishes, and algae. Common names can refer to several taxa, so pair them with an appropriate scientific name and level of identification. Do not invent a species-level identification from a generalized schematic. The applicable official list determines the specific organisms required for competition.',
        ],
        [
          'Corals and sponges',
          'Corals are cnidarians with polyps and stinging cells; many reef builders secrete calcium carbonate skeletons. Sponges filter water through pores and internal channels and lack the same tissue organization as corals. Both can be attached and branching, so shape alone can mislead. Feeding, surface structures, and skeleton evidence help distinguish them. Symbiotic associations are important but vary across groups and environmental conditions.',
        ],
        [
          'Mobile invertebrates',
          'Echinoderms often show fivefold adult organization and a water vascular system; mollusks have varied body plans including gastropods and bivalves; crustaceans have jointed appendages and exoskeletons. Adult form may differ strongly from larval form. Grazers, predators, filter feeders, and detritivores occupy different roles even within a broad group. Connect a structure to its function rather than assigning every member an identical feeding strategy.',
        ],
        [
          'Algae and producers',
          'Macroalgae contribute primary production, habitat, and food, while some calcifying algae help reef structure. Excess algal cover can have several causes, including altered grazing and nutrient conditions. Coral–algal competition depends on local context. Distinguish macroalgae, microscopic symbionts, and cyanobacteria rather than labeling all green material the same organism. Color categories are useful descriptions but do not replace taxonomic and structural evidence.',
        ],
        [
          'Life cycles',
          'Many reef organisms have dispersive larval stages and relatively site-attached adults. Recruitment depends on larval supply, settlement, survival, and habitat conditions. Adult abundance can reflect earlier conditions rather than only the sampling day. Reproduction can be sexual or asexual in some groups, with different consequences for genetic diversity and spread. A short monitoring interval may miss seasonal spawning or delayed community response.',
        ],
        [
          'Indicator reasoning',
          'An organism’s presence supports an environmental interpretation only when its tolerance, habitat, sampling, and identification are understood. Coral cover, grazing activity, and community composition can complement chemistry, but no single organism certifies all aspects of water quality. The lab offers habitat explanation cards rather than an automated species diagnosis. Use them to propose mechanisms, then identify independent measurements and alternatives that could challenge your interpretation.',
        ],
      ],
      [
        ['Polyp', 'Cnidarian body form found in corals.'],
        ['Filter feeder', 'Organism collecting suspended food from water.'],
        ['Recruitment', 'Addition of individuals through settlement and survival.'],
        ['Indicator', 'Organism or measure interpreted in environmental context.'],
      ],
      [
        'A branching attached organism is photographed. Can shape distinguish coral from sponge?',
        [
          'Both groups can be branching and attached.',
          'Seek polyp/tissue, pores, and skeleton evidence.',
          'Keep identification broad until diagnostic features are visible.',
        ],
        'Shared shape is not a unique taxonomic character.',
      ],
      [
        [
          'Corals belong to…',
          'Cnidarians',
          ['Mollusks', 'Crustaceans', 'Echinoderms'],
          'Polyps and stinging cells characterize the group.',
        ],
        [
          'A dispersive larva can affect…',
          'Recruitment connectivity',
          ['Only rock hardness', 'Only salinity units', 'No population process'],
          'Life stages connect habitats.',
        ],
        [
          'One indicator organism proves all water is safe?',
          'No',
          ['Always', 'Only on reefs', 'Only if abundant'],
          'Claims need context and independent measures.',
        ],
      ],
      [
        [
          'Contrast sponge and coral feeding structures.',
          'Sponges filter through pore/channel systems; corals have polyps with tentacles and other nutritional pathways.',
        ],
        ['Why pair common and scientific names?', 'Common names can be ambiguous across taxa.'],
        [
          'Why can adult abundance lag conditions?',
          'Recruitment and survival integrate earlier environmental history.',
        ],
        [
          'What can alter algal cover?',
          'Nutrients, grazing, disturbance, habitat, and light can all contribute.',
        ],
      ],
      [
        ['Describe', 'Record body structures and life stage.'],
        ['Identify', 'Match diagnostic features at a justified taxonomic level.'],
        ['Interpret', 'Connect ecology with independent water measurements.'],
      ],
      [
        ['Shape', 'Candidate clue', 'Often shared among groups.'],
        ['Life stage', 'Changes form and dispersal', 'Adult guides may not identify larvae.'],
        ['Indicator', 'Contextual evidence', 'Not universal certification.'],
      ],
      'Select reef, estuary, and ocean habitat cards. Propose an organism observation and an independent chemical measure for each.',
      'Identification and ecological interpretation are separate claims, each requiring suitable evidence.',
    ),
    c(
      'Salinometers, calibration, and mixture calculations',
      [
        'Compare conductivity, density, and refractive methods.',
        'Read a calibrated scale.',
        'Quantify mixtures and uncertainty.',
      ],
      [
        [
          'What salinity means',
          'Salinity describes dissolved salt content, but reporting conventions vary. Practical salinity is inferred from conductivity ratios and is dimensionless; mass-based salinity can be reported in grams per kilogram. School problems sometimes use ppt shorthand. State the convention rather than treating all labels as identical at unlimited precision. The lab uses explicitly labeled approximate salinity units for a linear endmember mixture, not a full seawater equation of state.',
        ],
        [
          'Conductivity method',
          'Ions carry electric current, making conductivity useful for salinity inference with calibration and temperature control or compensation. The relationship is not a universal straight line across every composition and range. Electrode geometry, contamination, and bubbles can affect readings. A sensor calibrated in one solution may not identify the exact ionic composition of an unknown. Conductivity supports an inference about salinity, not a complete chemical analysis.',
        ],
        [
          'Density and optics',
          'Hydrometers infer density through buoyancy, while refractometers infer refractive index from optical behavior. Both require appropriate scales and temperature handling. Read the correct meniscus and instrument instructions, and avoid assuming a scale designed for one solution applies to another. A density change can arise from temperature as well as salts. Independent checks and suitable standards help distinguish instrument effects from true sample differences.',
        ],
        [
          'Calibration sequence',
          'Use clean equipment and an appropriate reference or set of standards spanning the measurement range. Record raw reading, temperature, corrected value, and repeated observations. A zero check alone does not guarantee correct scale over the entire range. Fit and inspect the calibration relationship without extrapolating far beyond standards. Replication estimates variation, while reference agreement tests accuracy. Keep calibration data separate from unknown-sample measurements.',
        ],
        [
          'Construction principles',
          'A simple school salinity device can illustrate sensing and calibration, but design details must follow approved materials and procedures. Identify what physical property is measured, how geometry affects response, and how a scale is established. The virtual mixture replaces physical construction for this lesson. It deliberately does not claim that an arbitrary resistor reading is a validated seawater salinometer or that a homemade device establishes environmental safety.',
        ],
        [
          'Mixture reasoning',
          'For conservative mixing with additive volumes and compatible salinity units, use S = (S₁V₁ + S₂V₂)/(V₁+V₂). To infer freshwater fraction from fixed endmembers, solve the same linear relation. Mass-based quantities may require mass weighting or density corrections. Check that the result lies between endmembers when both fractions are nonnegative. Values outside that range indicate violated assumptions, wrong units, or additional processes.',
        ],
      ],
      [
        ['Practical salinity', 'Conductivity-based dimensionless salinity convention.'],
        ['Calibration', 'Mapping sensor response to known standards.'],
        ['Refractometer', 'Instrument using refractive behavior.'],
        ['Endmember mixing', 'Weighted combination of defined source waters.'],
      ],
      [
        'Find freshwater fraction when Sfresh=0, Ssea=35, and Smix=21.',
        ['Write 21 = 35(1−f).', '1−f = 21/35 = 0.60.', 'Freshwater fraction is f = 0.40.'],
        'This inference assumes fixed conservative endmembers.',
      ],
      [
        [
          'A zero calibration alone establishes full-range accuracy?',
          'No',
          ['Always', 'Only at sea level', 'Only in winter'],
          'Scale response can still be wrong.',
        ],
        [
          'A refractometer measures a property related to…',
          'Refractive index',
          ['DNA sequence', 'Oxygen demand directly', 'Current direction only'],
          'It uses optical behavior.',
        ],
        [
          'A simple nonnegative mixture must lie…',
          'Between its endmembers',
          ['Above both always', 'Below both always', 'At exactly zero'],
          'A weighted average has bounds.',
        ],
      ],
      [
        [
          'Why record temperature?',
          'Conductivity, density, and refractive response can depend on it.',
        ],
        ['What is a standard?', 'A suitable reference with known value for calibration.'],
        [
          'Why avoid extrapolation?',
          'The calibrated relation may not hold beyond the tested range.',
        ],
        [
          'When might volume weighting fail?',
          'When density differences, nonadditive volume, or mass-based reporting require another treatment.',
        ],
      ],
      [
        ['Sense', 'Measure conductivity, density, or optics.'],
        ['Calibrate', 'Compare suitable known standards.'],
        ['Infer', 'Report salinity with units and uncertainty.'],
      ],
      [
        ['Sensor reading', 'Raw physical response', 'Needs calibration.'],
        ['Salinity', 'Inferred salt measure', 'Convention must be stated.'],
        ['Mixture', 'Weighted source estimate', 'Needs conservative assumptions.'],
      ],
      'Set the mixture to 21 units and recover freshwater fraction. Change the seawater endmember and explain why the inferred fraction changes.',
      'A salinity number is meaningful only with a method, convention, and calibration.',
    ),
    c(
      'References, synthesis, and water-quality study skills',
      [
        'Build process-centered notes.',
        'Evaluate a multi-measure case.',
        'Design a defensible monitoring plan.',
      ],
      [
        [
          'Organizing references',
          'Group notes by cycles, measurement methods, habitats, organisms, treatment, and calculations. Place units, calibration requirements, and limitations beside each method. Use labeled diagrams that connect nutrient inputs, production, respiration, and oxygen rather than lists of unrelated facts. Organism pages should include diagnostic structures and ecological context. Keep the applicable event’s allowed reference format separate from the content you would ideally like to bring.',
        ],
        [
          'Reading a case',
          'Identify the boundary, sampling interval, locations, depths, and methods. Separate measured values from interpretations. A reported increase in nutrients is not automatically a measured increase in load unless flow is included. A single daytime oxygen value may conceal nocturnal depletion. Build a timeline and compare similar conditions. Missing metadata should lower confidence in a conclusion rather than being filled with an unstated assumption.',
        ],
        [
          'Quantitative habits',
          'Show units and conversions for concentration, volume, flow, and time. Check weighted averages against source bounds. Distinguish salinity fraction from percent freshwater and from the proportion of a particular dissolved ion. Graph axes should name the quantity and scale. For logarithmic variables such as pH, explain what a numerical difference means chemically. Retain sensible precision and do not present synthetic model values as measured field accuracy.',
        ],
        [
          'Monitoring design',
          'Select sites that address the question, including suitable reference locations and relevant depths. Repeat across tides, seasons, or daily cycles when those processes matter. Include calibration, duplicates, and handling records. Sampling more often does not fix an instrument’s consistent offset, and sampling one convenient bank may not represent the whole channel. Match spatial and temporal coverage to the hypothesized mechanism.',
        ],
        [
          'Team practice',
          'One teammate can extract data while another checks mechanisms and units, then compare independently reasoned conclusions. Maintain an error log for missing concepts, wrong units, weak identification, and unsupported causal claims. Redo a changed scenario to test transfer. A memorized answer to one estuary question is less useful than knowing how mixing, oxygen demand, and sampling context interact. Practice should expose uncertainty, not conceal it.',
        ],
        [
          'Synthesis',
          'Write a conclusion that names the best-supported mechanism, the observations supporting it, and an alternative explanation. Propose a measurement that would discriminate between them. The lab notebook compares temporary scenarios; practice saves separately in the browser. A synthetic oxygen decline illustrates bookkeeping, while a real ecosystem needs transport, solubility, and biological feedback. Course completion means engaged practice, not certification that a field sample is safe.',
        ],
      ],
      [
        ['Metadata', 'Context describing collection and measurement.'],
        ['Reference site', 'Comparison location chosen for the question.'],
        ['Causal hypothesis', 'Proposed mechanism connecting processes.'],
        ['Monitoring', 'Repeated observations with a defined purpose.'],
      ],
      [
        'A surface sample has high oxygen at noon. Design a stronger assessment.',
        [
          'Sample predawn and noon.',
          'Include bottom water where stratification may occur.',
          'Record temperature, salinity, mixing, and production/demand indicators.',
        ],
        'Broaden coverage to the proposed mechanism.',
      ],
      [
        [
          'More samples automatically fix calibration bias?',
          'No',
          ['Always', 'Only in estuaries', 'Only with a spreadsheet'],
          'Shared bias persists.',
        ],
        [
          'A strong conclusion includes…',
          'Evidence, mechanism, and limitations',
          ['Only a score', 'Only a photograph', 'Only a species nickname'],
          'It should be testable.',
        ],
        [
          'A useful note page places units…',
          'Beside the method or equation',
          ['Only on a cover', 'Nowhere', 'Only in teacher notes'],
          'Context prevents misuse.',
        ],
      ],
      [
        [
          'What is missing from concentration-only load claims?',
          'Flow and a defined time interval.',
        ],
        ['Why sample different tides?', 'Water sources and mixing can vary with tidal stage.'],
        [
          'What should an error log correct?',
          'The failed reasoning or observation and a transferable replacement rule.',
        ],
        [
          'How can a new measurement strengthen causality?',
          'It can distinguish the proposed mechanism from a plausible alternative.',
        ],
      ],
      [
        ['Frame', 'State the question and missing context.'],
        ['Compare', 'Use matched measurements and mechanisms.'],
        ['Test', 'Choose a discriminating follow-up observation.'],
      ],
      [
        ['Data', 'Measured quantities', 'Need metadata.'],
        ['Model', 'Simplified relationship', 'Needs assumptions.'],
        ['Conclusion', 'Evidence-based interpretation', 'Retains uncertainty.'],
      ],
      'Record two scenarios with the same final oxygen but different input/demand settings. Explain why one endpoint does not identify the process.',
      'Strong study skills organize evidence so that unfamiliar cases remain solvable.',
    ),
    c(
      'Emerging contaminants and ocean garbage patches',
      [
        'Explain transport and persistence.',
        'Locate the five major subtropical accumulation regions conceptually.',
        'Distinguish presence, exposure, and effect.',
      ],
      [
        [
          'Emerging questions',
          'Emerging contaminants include substances newly recognized, newly measured, or insufficiently characterized in a context. Pharmaceuticals, some persistent industrial chemicals, and microplastics pose different analytical and ecological questions. The category does not mean every substance is equally persistent or harmful. Identify chemical form, concentration, exposure route, and evidence quality. Detection technology can reveal previously unseen material without showing that its environmental concentration recently increased.',
        ],
        [
          'Fate and transport',
          'Advection, mixing, settling, sorption, degradation, and biological uptake influence where contaminants go. Persistence depends on chemical properties and environmental conditions. A substance can transform into products with different behavior. Particle-associated material follows different pathways from a dissolved compound. A useful mass balance includes inputs, outputs, storage, and transformation rather than assuming dilution permanently removes material from the environment.',
        ],
        [
          'Plastic fragmentation',
          'Large plastic items can fragment into smaller pieces, changing transport and exposure while not necessarily eliminating polymer mass. Density, fouling, shape, and currents affect whether particles float, sink, or remain suspended. Microplastics are not one uniform substance or size. Sampling nets, laboratory methods, and contamination control influence reported counts. Compare compatible size ranges and methods before treating two abundance estimates as a trend.',
        ],
        [
          'Five accumulation regions',
          'Major subtropical gyres occur in the North and South Pacific, North and South Atlantic, and Indian Ocean. Their circulation can accumulate floating debris, but garbage patches are dispersed regions rather than solid islands of trash. Boundaries and concentrations vary with conditions. Surface accumulation does not account for all plastic in beaches, sediments, organisms, or deeper water. A map of gyres is a circulation framework, not a complete inventory of pollution.',
        ],
        [
          'Exposure and effects',
          'Presence establishes that a substance was detected under a method. Exposure requires contact over a relevant route and duration, and an effect requires additional evidence. Laboratory effects at one concentration do not automatically establish the same field outcome. Multiple stressors and species differences complicate inference. This lesson teaches environmental reasoning without issuing health advice or inventing universal thresholds for unmeasured mixtures.',
        ],
        [
          'Management and research',
          'Reducing sources, improving waste handling, targeting transport pathways, and monitoring outcomes address different parts of the problem. Cleanup of one accumulation region does not stop continued input. A research plan should define the substance, size range or chemical form, sampling frame, blanks, and comparison sites. The salt and oxygen lab cannot model contaminant toxicity; use it to practice explicit budgets and explain which additional fate processes would be necessary.',
        ],
      ],
      [
        ['Advection', 'Transport with bulk water motion.'],
        ['Sorption', 'Association with surfaces or particles.'],
        ['Persistence', 'Resistance to removal or transformation over time.'],
        ['Exposure', 'Contact through a defined route and duration.'],
      ],
      [
        'A plastic item fragments into 100 pieces. Has its polymer mass necessarily vanished?',
        [
          'Fragmentation changes size distribution.',
          'It does not itself require loss of polymer mass.',
          'Transport and detectability can change even if mass remains.',
        ],
        'Counts and mass are different metrics.',
      ],
      [
        [
          'A garbage patch is best described as…',
          'A dispersed accumulation region',
          ['A solid island', 'All ocean plastic', 'A freshwater reservoir'],
          'Debris is spatially variable.',
        ],
        [
          'Detection alone establishes…',
          'Presence under a method',
          ['Every health effect', 'A universal source', 'A recent increase'],
          'Further evidence is needed.',
        ],
        [
          'Fragmentation necessarily destroys polymer mass?',
          'No',
          ['Always', 'Only in the Atlantic', 'Only below 1 mm'],
          'Physical breakup and degradation differ.',
        ],
      ],
      [
        [
          'Name the five gyre regions.',
          'North/South Pacific, North/South Atlantic, and Indian Ocean subtropical regions.',
        ],
        [
          'Why compare size ranges?',
          'Methods counting different particle sizes measure different populations.',
        ],
        [
          'How do blanks help?',
          'They reveal contamination introduced during sampling or analysis.',
        ],
        [
          'Why does cleanup not replace prevention?',
          'Continued inputs can replenish removed material.',
        ],
      ],
      [
        ['Release', 'Identify sources and forms.'],
        ['Transport', 'Track mixing, settling, and transformation.'],
        ['Assess', 'Separate detection, exposure, and effects.'],
      ],
      [
        ['Count', 'Number of particles', 'Not equivalent to mass.'],
        ['Detection', 'Method-supported presence', 'Not proof of effect.'],
        ['Gyre', 'Circulation-driven accumulation', 'Not a solid debris island.'],
      ],
      'Explain how to extend the lab’s budget to include contaminant inputs, settling, and degradation without treating oxygen demand as toxicity.',
      'Emerging environmental questions need careful definitions and evidence at each inference step.',
      true,
    ),
  ],
});
