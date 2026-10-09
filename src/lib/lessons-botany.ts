import { buildCourse } from './lesson-course-builder.ts';

export const botanyLessons = buildCourse({
  eventId: 'botany',
  eventName: 'Botany',
  prefix: 'bot',
  lab: 'botany',
  syllabus: 'Botany B_C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Study plant structure, transport, reproduction, diversity, energy, evolution, ecology, and applications through ten syllabus units. Division C lessons connect anatomical diagrams to mechanisms, experiments, and evidence. Interactive responses are simplified teaching models rather than species-specific growth predictions.',
  references: [
    {
      title: 'OpenStax Biology 2e: The Plant Body',
      url: 'https://openstax.org/books/biology-2e/pages/30-1-the-plant-body',
    },
    {
      title: 'OpenStax Biology 2e: Transport of Water and Solutes in Plants',
      url: 'https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants',
    },
  ],
  chapters: [
    {
      title: 'Botany, evidence, and ecosystem importance',
      description: 'Plant science, historical methods, primary production, and ecosystem roles.',
      objectives: [
        'Define plants using more than color or immobility.',
        'Connect primary production to food webs.',
        'Distinguish observation, classification, and experiment.',
      ],
      sections: [
        [
          'What botany studies',
          'Botany investigates plant structure, function, diversity, development, evolution, and relationships with the environment. Being green or immobile is not a sufficient definition: some plants lack ordinary photosynthesis, and many photosynthetic organisms are not land plants. Classification uses shared ancestry and traits rather than one superficial feature. In this course, distinguish land-plant groups from the broader informal use of “algae.” A useful identification combines reproductive structures, vascular features, tissue organization, and life-cycle evidence.',
        ],
        [
          'Historical approaches',
          'Plant science developed through descriptive collections, comparative anatomy, microscopy, controlled physiology experiments, genetics, and molecular methods. Each approach answers a different kind of question. A herbarium specimen preserves morphological evidence and collection context but does not directly record the living plant’s photosynthetic rate. A microscope section reveals tissue organization but may not identify an entire species. Modern sequences can clarify ancestry while requiring appropriate sampling and analysis. Combining methods is strongest when their evidence is complementary rather than assumed interchangeable.',
        ],
        [
          'Primary production',
          'Photosynthetic organisms convert light energy into chemical energy while incorporating inorganic carbon into organic molecules. Gross primary production is total carbon fixation; net primary production subtracts the producers’ respiration. Net production supplies growth and material potentially available to consumers and decomposers. Plants also respire, including at night, so photosynthesis is not their only energy process. A green canopy image does not directly measure net ecosystem carbon exchange, which also includes other organisms and environmental fluxes.',
        ],
        [
          'Ecosystem functions',
          'Plants create habitat, stabilize soil, alter local water and energy exchange, and participate in nutrient cycles. Roots can reduce erosion and influence soil structure; leaves affect shading and transpiration; litter returns organic matter and nutrients through decomposition. These effects vary with species, community, soil, and climate. A fast-growing introduced plant can increase some biomass measurements while reducing native diversity or altering fire regimes. Evaluate ecosystem function through multiple outcomes rather than treating more plant growth as universally beneficial.',
        ],
        [
          'Observation versus explanation',
          'A field observation such as yellow leaves is evidence, not a unique diagnosis. Possible explanations include nutrient limitation, water stress, normal senescence, pathogens, or environmental injury. A controlled experiment changes one factor while comparing outcomes under defined conditions. A classification key distinguishes alternatives based on observable traits, but it does not establish a physiological cause. State which kind of question is being asked before choosing a method. This prevents a recognizable symptom from replacing an actual test of the mechanism.',
        ],
        [
          'Studying across scales',
          'Connect organelles to cells, tissues, organs, whole plants, populations, and ecosystems. A change in stomatal opening can affect leaf gas exchange, whole-plant water use, and canopy energy balance, but those connections depend on scale and context. The teaching lab isolates a leaf’s light and water constraints rather than predicting an ecosystem. Record the variable changed, output measured, and assumption held fixed. A strong response explains the local mechanism and states what additional evidence is needed to generalize it.',
        ],
      ],
      terms: [
        ['Botany', 'Scientific study of plants and their relationships.'],
        ['Primary production', 'Formation of organic material by producers.'],
        ['Net primary production', 'Gross production minus producer respiration.'],
        ['Herbarium', 'Curated collection of preserved plant specimens and metadata.'],
      ],
      example: {
        problem:
          'A plant community fixes 100 carbon units and its producers respire 40 units over the same interval. Calculate NPP.',
        steps: [
          'Identify gross fixation as 100 units.',
          'Subtract producer respiration: 100 − 40 = 60.',
          'Do not subtract consumer respiration when defining plant NPP.',
        ],
        conclusion: 'NPP is 60 carbon units over the stated interval.',
      },
      mcq: [
        [
          'NPP equals…',
          'Gross production minus producer respiration',
          [
            'Gross production plus all respiration',
            'Only nighttime growth',
            'Total ecosystem carbon storage',
          ],
          'NPP is the producer-level balance.',
        ],
        [
          'Yellow leaves uniquely prove nitrogen deficiency?',
          'No',
          ['Yes', 'Only in all monocots', 'Only at noon'],
          'Several causes produce similar symptoms.',
        ],
        [
          'A herbarium primarily preserves…',
          'Specimens and collection evidence',
          [
            'A continuous gas-exchange record',
            'Every soil variable',
            'A full evolutionary tree automatically',
          ],
          'Its evidence is morphological and contextual.',
        ],
      ],
      written: [
        ['Calculate the example NPP.', '100 − 40 = 60 carbon units per stated interval.'],
        [
          'Why do plants need respiration?',
          'Cells use chemical energy to produce ATP and support metabolism; photosynthesis does not eliminate cellular respiration.',
        ],
        [
          'Name two plant ecosystem functions.',
          'Examples include primary production, habitat structure, erosion reduction, water exchange, and nutrient cycling.',
        ],
        [
          'How test a proposed nutrient explanation?',
          'Use a controlled comparison with defined nutrient treatments, comparable plants and conditions, repeated measurements, and alternative-cause checks.',
        ],
      ],
      flow: [
        ['Observe', 'Identify traits or measured physiological changes.'],
        ['Explain', 'Connect them to a mechanism at the appropriate scale.'],
        ['Test', 'Use comparisons and report alternative explanations.'],
      ],
      compare: [
        [
          'Classification',
          'Distinguishes groups by traits and ancestry',
          'Does not diagnose every symptom.',
        ],
        ['Physiology', 'Tests how processes operate', 'Depends on controlled conditions.'],
        [
          'Ecosystem function',
          'Tracks effects across communities',
          'More biomass is not always a better outcome.',
        ],
      ],
      challenge:
        'Change light at fixed water supply and compare modeled carbon gain with water loss. Explain why neither output alone measures ecosystem health.',
      takeaway:
        'Plant science links evidence across scales while keeping classification, mechanism, and ecosystem outcomes distinct.',
    },
    {
      title: 'Plant cells, tissues, and vascular organization',
      description: 'Organelles, meristems, dermal tissue, xylem, and phloem.',
      objectives: [
        'Relate organelles to plant-cell function.',
        'Compare dermal, ground, and vascular tissues.',
        'Distinguish xylem and phloem transport mechanisms.',
      ],
      sections: [
        [
          'Cell structures and functions',
          'A typical living plant cell has a plasma membrane, nucleus, mitochondria, and other eukaryotic organelles. A cellulose-rich wall supports shape and resists internal turgor pressure. The central vacuole contributes to storage and osmotic balance. Chloroplasts perform photosynthesis in appropriate tissues, but not every plant cell has abundant chloroplasts; many root cells do not. Cell walls are outside plasma membranes and do not replace selective membrane transport. Connect each structure to a specific function rather than labeling all plant cells as identical green boxes.',
        ],
        [
          'Meristems and differentiation',
          'Meristems contain cells capable of continued division and supply new tissues. Apical meristems contribute to primary growth in length, while lateral meristems can contribute to secondary thickening in plants with that growth pattern. Daughter cells differentiate into specialized roles, changing wall composition, organelles, and connectivity. Mature xylem conducting cells can be dead at functional maturity, while many other tissues remain alive. Growth involves division, expansion, and differentiation, not merely every mature cell multiplying at the same rate.',
        ],
        [
          'Three tissue systems',
          'Dermal tissue provides the outer interface, including protection and regulated exchange. Ground tissue includes photosynthesis, storage, and support functions, with cells such as parenchyma, collenchyma, and sclerenchyma differing in structure. Vascular tissue carries water, minerals, and organic solutes. A cross-section should be read as organized tissue relationships rather than a list of isolated labels. Tissue arrangements vary among organs and plant groups, so a diagram’s context matters before applying a memorized “inside versus outside” rule.',
        ],
        [
          'Xylem conduction',
          'Xylem conducts water and dissolved minerals through tracheids and, in many groups, vessel elements. Lignified walls provide support and resist collapse under tension. Bulk flow is driven largely by water-potential gradients associated with transpiration, not by individual cells pumping water up the entire stem. Pits permit lateral movement between conducting elements. Embolism can interrupt flow, demonstrating why continuous water columns and network structure matter. Xylem direction is commonly root-to-shoot in transpiring plants but should be described through the actual gradient.',
        ],
        [
          'Phloem conduction',
          'Phloem transports sugars and other solutes between sources and sinks through living conducting systems. In angiosperms, sieve-tube elements work with companion cells. Source loading can raise solute concentration, promote water entry, and create pressure that drives bulk flow toward sinks. A source can be a photosynthesizing leaf or a mobilized storage organ; sinks include growing tissues or storage destinations. Different tubes can carry flow in different directions, so “phloem always moves downward” is an incorrect universal rule.',
        ],
        [
          'Interpreting a tissue diagram',
          'Identify the organ, orientation, outer boundary, and repeating tissue patterns first. Then connect cell wall thickness, lumen size, and position to plausible function. A large empty-looking lumen in a prepared section does not prove the tissue was empty of fluid in life. A label alone does not establish transport rate. Use anatomical evidence to explain capacity or role and physiological measurements to test actual flow. The lab’s selectable leaf structures illustrate tissue-level roles without claiming to reproduce a microscope image.',
        ],
      ],
      terms: [
        ['Meristem', 'Region supplying dividing cells for growth.'],
        ['Xylem', 'Water/mineral conducting and supporting tissue.'],
        ['Phloem', 'Living tissue transporting organic solutes from sources to sinks.'],
        ['Turgor', 'Pressure of cell contents against the wall.'],
      ],
      example: {
        problem:
          'A mature leaf exports sugar to a growing root. Identify source, sink, and transport tissue.',
        steps: [
          'The exporting leaf is the source.',
          'The growing root is a sink using imported material.',
          'Phloem provides source-to-sink organic-solute transport; xylem has a different principal role.',
        ],
        conclusion:
          'Transport direction follows source-sink relationships, not a universal up/down rule.',
      },
      mcq: [
        [
          'Which tissue primarily carries water and minerals?',
          'Xylem',
          ['Phloem only', 'Epidermal hairs only', 'Pollen'],
          'Xylem is the principal water-conducting tissue.',
        ],
        [
          'Do all plant cells have many chloroplasts?',
          'No',
          ['Yes', 'Only every root cell', 'Only every dead xylem cell'],
          'Specialized cells differ in organelles.',
        ],
        [
          'Phloem flow is best described as…',
          'Source to sink',
          ['Always downward', 'Always upward', 'Only from roots to leaves'],
          'Source and sink roles can change.',
        ],
      ],
      written: [
        [
          'Distinguish wall and membrane.',
          'The wall provides structural support outside the selectively permeable plasma membrane.',
        ],
        [
          'What is an apical meristem’s role?',
          'It supplies cells contributing to primary growth in length and associated new tissues.',
        ],
        [
          'Why are lignified xylem walls useful?',
          'They support the plant and resist collapse under the tension of water transport.',
        ],
        [
          'Explain the example’s source-sink relation.',
          'The leaf exports photosynthate, while the growing root imports and uses it; phloem connects those functional roles.',
        ],
      ],
      flow: [
        ['Cells', 'Organelles and walls support specialized functions.'],
        ['Tissues', 'Dermal, ground, and vascular systems organize cells.'],
        ['Transport', 'Gradients connect sources, pathways, and sinks.'],
      ],
      compare: [
        ['Xylem', 'Water/mineral bulk flow', 'Conducting cells often dead at maturity.'],
        ['Phloem', 'Organic-solute source-sink flow', 'Living conducting system.'],
        ['Meristem', 'Cell division for growth', 'Not every mature tissue divides.'],
      ],
      challenge:
        'Select xylem and phloem labels on the plant diagram. Explain why a modeled leaf water-loss change does not directly measure sugar export.',
      takeaway:
        'Anatomical specialization supports different transport roles and cannot be reduced to one direction rule.',
    },
    {
      title: 'Roots, stems, and leaves',
      description: 'Organ structure, functional anatomy, and environmental tradeoffs.',
      objectives: [
        'Explain root uptake and selective entry.',
        'Relate stem organization to transport and support.',
        'Interpret leaf anatomy as a gas-water tradeoff.',
      ],
      sections: [
        [
          'Root systems',
          'Roots anchor plants, acquire water and mineral nutrients, and often store material. Taproot and fibrous systems differ in architecture, but function also depends on soil, age, and species. Root hairs expand the absorptive interface near appropriate root zones. Water and ions follow different physical and selective processes; active ion uptake can affect water potential. A large root system does not guarantee uptake if the soil water is unavailable or the root environment is damaged. Describe the gradient and pathway rather than simply saying roots “suck” water.',
        ],
        [
          'Selective entry to the stele',
          'Water can move through cell walls and extracellular spaces along the apoplast or through connected cell interiors along the symplast. The endodermis and Casparian strip restrict unregulated apoplastic entry into the vascular cylinder, requiring membrane crossing for much of the pathway. This provides selective control of solutes rather than an absolute barrier to all water. Plasmodesmata connect many living cells. The route and developmental stage matter, so an idealized root cross-section should be interpreted as a pathway model, not a complete map of every root segment.',
        ],
        [
          'Stem support and transport',
          'Stems position leaves and reproductive structures while connecting transport pathways. Vascular-bundle arrangement varies among groups, and secondary growth can add tissues through vascular and cork cambia in appropriate plants. Rings or bundles are useful comparative traits, but avoid identifying every plant group from one feature alone. Mechanical support can come from turgor, thickened cell walls, lignified tissues, and overall geometry. A stem’s flexibility or woodiness reflects tissue composition and development rather than only its diameter.',
        ],
        [
          'Leaf surfaces and internal structure',
          'The cuticle reduces uncontrolled water loss; epidermal tissues protect and regulate exchange. Mesophyll contains photosynthetic cells and air spaces that facilitate internal gas diffusion. Veins connect xylem and phloem to the leaf. Stomata are pores controlled by guard cells, linking atmospheric CO2 uptake to water-vapor loss. A typical broadleaf diagram is not universal: needles, succulent leaves, aquatic leaves, and other forms show different arrangements. Always connect the depicted anatomy to the environment and plant group.',
        ],
        [
          'Structure-function tradeoffs',
          'A broad thin leaf can expose photosynthetic tissue to light and shorten diffusion paths, but may face water-loss or heat challenges. A thick cuticle, sunken stomata, reduced leaf area, or succulent storage can alter those tradeoffs. Roots and stems also show adaptations to flooding, drought, climbing, and storage. An adaptation is not automatically optimal in every environment. Explain the benefit and potential cost, such as reduced gas exchange accompanying water conservation.',
        ],
        [
          'Reading organ evidence',
          'Identify the organ and orientation before naming tissues. Compare multiple traits and describe what is actually visible. A cross-section can reveal vascular arrangement but not the full root architecture; a leaf photograph can show venation but not directly measure stomatal conductance. The teaching lab lets students select structures and connect them to modeled exchange. Use it to distinguish anatomical role from a measured rate, then propose an experiment that could test the rate under controlled conditions.',
        ],
      ],
      terms: [
        ['Apoplast', 'Cell-wall and extracellular transport pathway.'],
        ['Symplast', 'Connected living-cell interior pathway.'],
        ['Endodermis', 'Selective root tissue surrounding the vascular cylinder.'],
        ['Stoma', 'Guard-cell-regulated pore for gas exchange.'],
      ],
      example: {
        problem:
          'A leaf closes its stomata during dry conditions. Predict one benefit and one cost.',
        steps: [
          'Reduced pore opening can reduce water-vapor loss.',
          'CO2 diffusion into the leaf can also decline.',
          'Lower CO2 supply can constrain carbon fixation even when light is available.',
        ],
        conclusion:
          'Water conservation and carbon uptake are linked through the same exchange pathway.',
      },
      mcq: [
        [
          'The Casparian strip particularly restricts…',
          'Unregulated apoplastic entry',
          ['All photosynthesis', 'Every phloem tube', 'All root growth'],
          'It promotes selective membrane crossing into the stele.',
        ],
        [
          'Guard cells regulate…',
          'Stomatal opening',
          ['Every xylem vessel directly', 'Pollen chromosome number', 'Root hair length only'],
          'They control pores.',
        ],
        [
          'A thicker cuticle commonly helps reduce…',
          'Uncontrolled water loss',
          ['All respiration', 'Every nutrient deficiency', 'All need for roots'],
          'It changes the surface barrier.',
        ],
      ],
      written: [
        [
          'Compare apoplast and symplast.',
          'Apoplast follows walls/extracellular spaces; symplast follows connected cell interiors.',
        ],
        [
          'Explain the stomatal tradeoff.',
          'Closing pores conserves water but can restrict CO2 entry and hence photosynthesis.',
        ],
        [
          'Why use multiple anatomical traits for classification?',
          'Single traits can vary or evolve convergently; combined evidence supports a more reliable identification.',
        ],
        [
          'What cannot be inferred directly from a leaf picture?',
          'Actual gas-exchange or transport rates require measurements under defined conditions, not morphology alone.',
        ],
      ],
      flow: [
        ['Root', 'Acquire and selectively admit water and ions.'],
        ['Stem', 'Support organs and connect vascular pathways.'],
        ['Leaf', 'Exchange gases and capture light with water constraints.'],
      ],
      compare: [
        ['Cuticle', 'Limits surface water loss', 'Does not replace regulated pores.'],
        [
          'Mesophyll',
          'Photosynthetic tissue and diffusion spaces',
          'Arrangement varies among leaves.',
        ],
        ['Veins', 'Link water supply and sugar export', 'Rate requires physiological data.'],
      ],
      challenge:
        'Reduce stomatal opening at fixed light. Compare carbon-gain and water-loss outputs and identify the anatomical link.',
      takeaway:
        'Organ structures solve linked problems of acquisition, support, exchange, and conservation.',
    },
    {
      title: 'Water transport, storage, hormones, and growth',
      description: 'Water potential, cohesion-tension, pressure flow, and responses.',
      objectives: [
        'Predict water movement from water potential.',
        'Explain transpiration-driven xylem flow.',
        'Connect hormones to context-dependent growth responses.',
      ],
      sections: [
        [
          'Water potential',
          'Water moves from higher to lower water potential under the stated pathway conditions. A simple cell-level expression is Ψ = Ψs + Ψp, combining solute and pressure components; gravity and matric effects can matter in other contexts. Solute potential is negative relative to pure water, while positive turgor pressure can raise total potential. Compare total values rather than only salt concentration. A cell at −0.4 MPa has higher water potential than one at −0.8 MPa, so water tends toward the latter when a pathway permits.',
        ],
        [
          'Cohesion and tension',
          'Transpiration from leaf surfaces can lower leaf water potential and create tension transmitted through a cohesive water column in xylem. Cohesion among water molecules and adhesion to walls support the physical pathway. The plant does not pump each water molecule upward through a series of living vessel pumps. Root pressure can contribute under some conditions but is not the general explanation for tall-tree transpiration flow. Embolism, hydraulic resistance, and changing demand constrain the simple model.',
        ],
        [
          'Stomatal control and storage',
          'Guard-cell turgor influences pore opening, coordinating CO2 uptake and water loss. Environmental signals, internal status, and hormones can modify the response. Water storage in tissues can buffer short-term demand but does not create unlimited supply. Dry air increases the potential for vapor loss, while restricted pores reduce both water loss and CO2 entry. The teaching model uses normalized light, opening, water supply, and dryness to demonstrate this tradeoff; its outputs are relative indices rather than measured species-specific rates.',
        ],
        [
          'Source-sink pressure flow',
          'Phloem loading and unloading alter solute concentrations and pressure differences between sources and sinks. Water exchange with surrounding tissues contributes to the pressure-flow mechanism. Storage organs can switch roles between seasons, becoming sources when reserves are mobilized. Movement of organic solutes is therefore not simply the reverse of xylem movement. Explain which tissue is exporting, which is importing, and what gradient drives bulk flow. Transport and storage interact with development and environmental demand.',
        ],
        [
          'Hormones and tropisms',
          'Auxin can influence cell expansion and directional growth; cytokinins, gibberellins, abscisic acid, and ethylene have distinct but interacting roles. Effects depend on tissue, concentration, developmental stage, and other signals. In a common shoot-phototropism explanation, differential auxin-related growth produces curvature toward light. Root responses can differ from shoot responses. A hormone is not a single universal on/off switch for growth, and applying more of one substance does not guarantee more growth or a desirable outcome.',
        ],
        [
          'Testing growth responses',
          'Design comparisons with defined light direction, hormone treatment, water status, and measurement interval. Measure an outcome such as curvature, elongation, or leaf conductance, not a vague “health” score unless operationalized. Include a suitable untreated or vehicle control when appropriate and distinguish repeated measurements on one plant from independent plants. A correlation between hormone level and growth does not alone establish the causal pathway. Use the structure of a controlled experiment to connect the proposed signal to the observed response.',
        ],
      ],
      terms: [
        ['Water potential', 'Potential governing water movement relative to a reference.'],
        ['Transpiration', 'Water-vapor loss from plant surfaces.'],
        ['Cohesion-tension', 'Mechanism linking evaporation to xylem water movement.'],
        ['Tropism', 'Directional growth response to a stimulus.'],
      ],
      example: {
        problem:
          'Soil water potential is −0.2 MPa, root −0.5 MPa, leaf −1.0 MPa. Predict the idealized direction.',
        steps: [
          'Order values from higher to lower: −0.2 > −0.5 > −1.0.',
          'Water tends from soil toward root and leaf when connected pathways permit.',
          'Transport resistance and dynamic supply still constrain actual rate.',
        ],
        conclusion:
          'The sign and total potential determine direction, not the apparent size of the negative number alone.',
      },
      mcq: [
        [
          'Higher water potential: −0.4 or −0.8 MPa?',
          '−0.4 MPa',
          ['−0.8 MPa', 'They are identical', 'Neither can be compared'],
          'The less negative value is higher.',
        ],
        [
          'Tall-tree xylem flow is generally explained by…',
          'Cohesion-tension linked to transpiration',
          [
            'Each vessel pumping with ATP',
            'Phloem always pushing upward',
            'Gravity pulling water upward',
          ],
          'Evaporation creates a gradient through the hydraulic system.',
        ],
        [
          'Hormone effects depend on…',
          'Tissue and context',
          ['Only the hormone name', 'Only leaf color', 'No concentration effects'],
          'Responses are context-dependent.',
        ],
      ],
      written: [
        [
          'Predict movement from −0.2 to −0.5 MPa.',
          'Toward −0.5 MPa along an available pathway, from higher to lower potential.',
        ],
        [
          'Why distinguish phloem and xylem mechanisms?',
          'They transport different materials and use different gradients and cellular structures.',
        ],
        [
          'What does a directional-light control test?',
          'Whether curvature differs under changed light geometry while other conditions are comparable.',
        ],
        [
          'Why are five readings from one plant not five independent plants?',
          'They share the same biological unit and history; repeated measurements do not create independent treatment replication.',
        ],
      ],
      flow: [
        ['Gradient', 'Compare total water or pressure potential.'],
        ['Pathway', 'Identify xylem, phloem, or membrane transport.'],
        ['Response', 'Link environment and signals to growth or exchange.'],
      ],
      compare: [
        [
          'Xylem tension',
          'Transpiration-linked water flow',
          'Supply and resistance constrain rate.',
        ],
        ['Phloem pressure', 'Source-sink organic-solute flow', 'Source roles can change.'],
        ['Hormone signal', 'Modifies development and responses', 'Effect is context-dependent.'],
      ],
      challenge:
        'Raise air dryness, then reduce water supply. Predict whether water demand and modeled carbon gain change in the same direction.',
      takeaway:
        'Plant transport follows gradients through specialized pathways and is regulated within environmental tradeoffs.',
    },
    {
      title: 'Life cycles, flowers, seeds, and biotechnology',
      description: 'Alternation of generations, double fertilization, breeding, and evidence.',
      objectives: [
        'Track ploidy through meiosis and fertilization.',
        'Explain flower-to-seed development.',
        'Distinguish breeding methods from outcome claims.',
      ],
      sections: [
        [
          'Alternation of generations',
          'Land plants alternate between multicellular diploid sporophytes and haploid gametophytes. Meiosis in the sporophyte produces haploid spores; spores grow into gametophytes by mitosis. Gametophytes produce gametes by mitosis, and fertilization restores diploidy in a zygote. Spores and gametes are not interchangeable: a spore can grow without fusing with another cell, while gametes unite at fertilization. The relative prominence of generations differs among bryophytes, ferns, and seed plants. Track chromosome sets at each transition rather than memorizing a circular diagram without mechanisms.',
        ],
        [
          'Flowers and pollination',
          'In angiosperms, flowers contain reproductive structures with anthers producing pollen and ovules housed within carpels. Pollination transfers pollen to a receptive surface; fertilization is the later fusion of gametes. Wind and animals provide different transfer mechanisms with associated floral traits, but no single color or shape proves a pollinator. Pollen represents a reduced male gametophyte, not a seed. The pollen tube delivers sperm cells toward the female gametophyte within the ovule under the normal angiosperm pathway.',
        ],
        [
          'Double fertilization and seeds',
          'One sperm fertilizes the egg to form a diploid embryo, while another joins the central cell to form endosperm, commonly triploid under the standard angiosperm arrangement. Ovule tissues contribute to seed structures, and the ovary commonly develops into fruit, with variations among fruits. The seed includes an embryo, stored resources, and protective tissues with differing genetic origins. Distinguish embryo genotype from maternal seed-coat tissue. A visible seed is therefore not one genetically uniform cell or tissue.',
        ],
        [
          'Dormancy and germination',
          'A viable seed may remain dormant until suitable cues occur. Water uptake, temperature, oxygen, light, and species-specific signals can affect germination. Dormancy differs from death or simply lacking water at the moment. A germination experiment needs a clear criterion, such as radicle emergence, and an observation interval. Report both the number germinated and the denominator of tested seeds. Differences in seed age, viability, or source can confound a treatment comparison if not controlled or recorded.',
        ],
        [
          'Breeding and biotechnology',
          'Selective breeding chooses parents and offspring with desired traits, often reshuffling many alleles through crosses. Genetic engineering can introduce or alter defined sequences through specific methods; genome editing and transgenic approaches are not identical categories. The method alone does not establish benefit, harm, yield, or ecological effect. Evaluate the actual trait, organism, environment, and evidence. A plant with a targeted resistance trait may still face other pests or stresses. Keep a technical description separate from a broad value judgment about all modified crops.',
        ],
        [
          'Genetics and experimental claims',
          'For a simple monohybrid cross Aa × Aa with complete dominance, expected genotypes are 1 AA : 2 Aa : 1 aa and phenotypes 3 dominant : 1 recessive. Real traits can involve linkage, multiple genes, environmental effects, or non-Mendelian inheritance. Expected ratios are probabilities, not guaranteed exact counts in small samples. A claimed breeding improvement should be tested against an appropriate comparison across replicated conditions. Reproductive success, growth, and ecological performance are different outcomes and should be measured explicitly.',
        ],
      ],
      terms: [
        ['Sporophyte', 'Multicellular diploid generation producing spores by meiosis.'],
        ['Gametophyte', 'Multicellular haploid generation producing gametes by mitosis.'],
        ['Pollination', 'Transfer of pollen to a receptive reproductive surface.'],
        ['Double fertilization', 'Angiosperm process forming embryo and endosperm.'],
      ],
      example: {
        problem:
          'Track ploidy in the standard angiosperm pathway: diploid sporophyte, spore, gametophyte, gamete, zygote.',
        steps: [
          'Meiosis changes 2n sporophyte cells to n spores.',
          'Mitosis maintains n in the gametophyte and its gametes.',
          'Fertilization combines n + n to form a 2n zygote.',
        ],
        conclusion: 'Meiosis and fertilization change ploidy; ordinary mitosis preserves it.',
      },
      mcq: [
        [
          'A plant spore is produced by…',
          'Meiosis in the sporophyte',
          ['Fertilization of two seeds', 'Mitosis of a diploid egg only', 'Pollination alone'],
          'The sporophyte-to-spore transition reduces ploidy.',
        ],
        [
          'Pollination and fertilization are…',
          'Different events',
          ['Synonyms', 'Both always seed dispersal', 'Both meiosis'],
          'Transfer precedes gamete fusion.',
        ],
        [
          'Expected recessive phenotype in Aa × Aa with complete dominance?',
          '1/4',
          ['1/2', '3/4', 'All offspring'],
          'Only aa is recessive under the stated model.',
        ],
      ],
      written: [
        [
          'Track n and 2n in the example.',
          '2n sporophyte → meiosis → n spore → n gametophyte → n gamete → fertilization → 2n zygote.',
        ],
        [
          'What commonly forms triploid endosperm?',
          'A sperm joins the central cell containing two maternal polar-nuclear contributions in the standard arrangement.',
        ],
        [
          'Why is a breeding method not an outcome guarantee?',
          'Effects depend on the specific trait, organism, environment, and evaluation; method labels alone do not establish performance or ecological consequences.',
        ],
        [
          'How define a germination outcome?',
          'Use an explicit criterion such as radicle emergence within a stated interval, with tested and germinated seed counts.',
        ],
      ],
      flow: [
        ['Meiosis', 'Sporophyte produces haploid spores.'],
        ['Gametophyte', 'Haploid growth and gamete production.'],
        ['Fertilization', 'Gamete fusion restores diploidy and initiates a new sporophyte.'],
      ],
      compare: [
        ['Spore', 'Can grow into a gametophyte', 'Not the same as a gamete.'],
        ['Pollination', 'Moves pollen', 'Does not itself mean fertilization occurred.'],
        [
          'Breeding method',
          'Changes or selects genetic variation',
          'Evaluate the actual trait and context.',
        ],
      ],
      challenge:
        'Use the life-cycle view to select meiosis and fertilization. Explain the ploidy change at each, then predict Aa × Aa outcomes.',
      takeaway:
        'Reproductive mechanisms, genetic probabilities, and practical outcomes must be tracked separately.',
    },
    {
      title: 'Major plant groups and comparative identification',
      description: 'Algae, bryophytes, vascular plants, seeds, monocots, and eudicots.',
      objectives: [
        'Compare major evolutionary innovations.',
        'Use multiple traits to distinguish monocots and eudicots.',
        'Explain limits of historical group labels.',
      ],
      sections: [
        [
          'Algae and land plants',
          '“Algae” is an informal term spanning diverse photosynthetic lineages rather than one simple natural group equivalent to land plants. Land plants share an evolutionary history and traits associated with protecting and nourishing embryos. Aquatic photosynthesis alone does not identify a land plant. Compare reproductive features, tissues, life cycles, and molecular evidence where available. Historical terms such as cryptogams group organisms by inconspicuous reproduction but do not represent one exclusive modern evolutionary branch. State the classification framework used by a question.',
        ],
        [
          'Bryophytes and water dependence',
          'Bryophyte groups lack the lignified vascular systems characteristic of vascular plants and commonly have a conspicuous gametophyte generation. Their sperm generally require a water film for movement to the egg. This does not mean every bryophyte lives only submerged in water; small size, surface absorption, and desiccation responses support varied habitats. Distinguish the dominant visible generation from the presence of a sporophyte. A capsule on a moss is not a flower or seed.',
        ],
        [
          'Seedless vascular plants',
          'Lycophytes and ferns have vascular tissues and a prominent sporophyte, yet reproduce through spores rather than seeds. Fern fronds can bear sori containing sporangia, but appearance varies and not every dot is a reproductive structure. A small gametophyte stage remains in the life cycle. Vascular support and transport enable different growth forms from nonvascular groups, though size and habitat still depend on other traits. Identify both the reproductive unit and the generation being observed.',
        ],
        [
          'Gymnosperms and angiosperms',
          'Seed plants protect embryos within seeds and use reduced gametophytes and pollen in their reproductive systems. Gymnosperms bear ovules and seeds without enclosing them in an angiosperm ovary; angiosperms produce flowers and fruits in the standard framework. Cones are common gymnosperm structures but not a universal visual template for every lineage. A fruit is an evolved reproductive structure, not defined by sweetness or culinary use. Compare the location and development of ovules and seeds rather than relying on edible appearance.',
        ],
        [
          'Monocots and eudicots',
          'Common monocot traits include one cotyledon, parallel venation, scattered stem vascular bundles, and floral parts often in threes. Common eudicot traits include two cotyledons, netted venation, a ring-like stem-bundle arrangement, and floral parts often in fours or fives. These are useful patterns with exceptions. Traditional “dicots” are broader than the monophyletic eudicot group. Use several independent features and the question’s terminology rather than declaring a specimen’s identity from one leaf vein.',
        ],
        [
          'Woody and herbaceous forms',
          'Woodiness concerns secondary tissues and persistent structural growth, not a separate single evolutionary lineage. Herbaceous and woody growth forms occur across different groups and environments. A thick stem is not necessarily wood, and a young woody plant may look soft before substantial secondary growth. Comparative identification should proceed from observable traits to a supported group assignment with uncertainty. The lab’s structure and life-cycle diagrams are generalized teaching views; actual specimens can differ in morphology and developmental stage.',
        ],
      ],
      terms: [
        ['Bryophyte', 'Member of a nonvascular land-plant lineage.'],
        ['Vascular plant', 'Plant with specialized lignified transport tissues.'],
        ['Gymnosperm', 'Seed plant with ovules not enclosed in an angiosperm ovary.'],
        ['Eudicot', 'Angiosperm lineage often showing two cotyledons and characteristic pollen.'],
      ],
      example: {
        problem:
          'A specimen has parallel leaf venation, floral parts in threes, and scattered stem bundles. Identify the supported broad group.',
        steps: [
          'Each observed feature is commonly associated with monocots.',
          'The combined evidence is stronger than any single trait alone.',
          'State a monocot interpretation while recognizing exceptions and specimen context.',
        ],
        conclusion: 'The observations support a monocot classification.',
      },
      mcq: [
        [
          'Ferns reproduce through…',
          'Spores with a gametophyte stage',
          ['Flowers and fruit universally', 'Only seeds', 'No meiosis'],
          'They are seedless vascular plants.',
        ],
        [
          'The example most strongly supports…',
          'Monocot',
          ['Moss', 'Fern', 'Every gymnosperm'],
          'Multiple common monocot traits agree.',
        ],
        [
          '“Cryptogams” is best treated as…',
          'A historical descriptive grouping',
          ['One exclusive modern clade', 'A synonym for all angiosperms', 'A seed tissue'],
          'The term groups inconspicuous reproduction across lineages.',
        ],
      ],
      written: [
        [
          'Name two major seed-plant innovations.',
          'Seeds protect embryos; pollen and reduced gametophytes alter reproductive dispersal and dependence on external water.',
        ],
        [
          'Why avoid one-trait identification?',
          'Traits have exceptions and can converge; combined reproductive and anatomical evidence is more reliable.',
        ],
        [
          'Distinguish fruit from culinary sweetness.',
          'A fruit develops from angiosperm reproductive structures; it need not be sweet or eaten.',
        ],
        [
          'Why is woodiness not one plant clade?',
          'Secondary woody growth occurs across multiple evolutionary lineages and is a growth-form trait.',
        ],
      ],
      flow: [
        ['Reproduction', 'Determine spores, seeds, flowers, or fruits.'],
        ['Transport', 'Inspect vascular and support features.'],
        ['Compare', 'Combine several traits with an explicit classification framework.'],
      ],
      compare: [
        [
          'Bryophytes',
          'Prominent gametophyte and nonvascular organization',
          'Not all restricted to submerged habitats.',
        ],
        ['Ferns', 'Vascular sporophyte and spores', 'No seeds in the standard group.'],
        [
          'Seed plants',
          'Seeds and reduced gametophytes',
          'Gymnosperm and angiosperm structures differ.',
        ],
      ],
      challenge:
        'Use the life-cycle diagram to compare a gametophyte-dominant and sporophyte-dominant interpretation without changing the n/2n transitions.',
      takeaway:
        'Reliable group identification combines reproduction, anatomy, and evolutionary context.',
    },
    {
      title: 'Photosynthesis, carbon fixation, and plant biochemistry',
      description: 'Light reactions, Calvin cycle, respiration, and limiting factors.',
      objectives: [
        'Separate light reactions from carbon fixation.',
        'Explain C3, C4, and CAM strategies.',
        'Interpret light-response and net-assimilation curves.',
      ],
      sections: [
        [
          'Energy and carbon are different inputs',
          'Photosynthesis captures light energy and uses it to support the formation of organic molecules from inorganic carbon. Light supplies energy, while CO2 supplies carbon atoms for fixation. Water contributes electrons and oxygen released in oxygenic photosynthesis derives from water, not directly from CO2. A balanced overall equation summarizes many reactions and does not mean glucose appears in one step. Plants use photosynthetic products for respiration, growth, storage, and synthesis of many compounds.',
        ],
        [
          'Light reactions',
          'Thylakoid-associated photosystems absorb photons and drive electron transport, building a proton gradient that supports ATP synthesis and reducing NADP+ to NADPH in the standard noncyclic pathway. Water splitting replaces electrons and releases O2. The energy carriers connect light reactions to later metabolism. More light does not produce unlimited ATP or carbon gain because reaction capacity, photoprotection, CO2 supply, and other factors constrain the system. Distinguish pigment absorption from total whole-leaf photosynthesis.',
        ],
        [
          'The Calvin cycle',
          'The Calvin cycle fixes CO2, reduces carbon intermediates using ATP and NADPH, and regenerates the acceptor RuBP. Rubisco catalyzes a key carboxylation step and can also react with oxygen, contributing to photorespiration. Calling these “dark reactions” can be misleading because their operation depends on light-generated energy carriers and regulation. The immediate products are carbon intermediates used to build sugars and other molecules, not a single isolated glucose molecule at every turn.',
        ],
        [
          'C3, C4, and CAM',
          'C3 describes the ordinary initial Calvin-cycle product framework. C4 plants concentrate CO2 through spatial separation of initial fixation and the Calvin cycle in characteristic tissues; CAM plants separate initial uptake and later use mainly in time, often opening stomata at night. These strategies alter water and carbon tradeoffs but have costs and environmental advantages that depend on conditions. They are not a universal ranking from primitive to best. A plant’s growth performance also depends on temperature, nutrients, and ecological context.',
        ],
        [
          'Net gas exchange and limiting factors',
          'Measured net CO2 assimilation reflects fixation minus relevant CO2 release under the measurement conditions. At low light, increasing light can raise net assimilation; at high light another factor can limit the response. A compensation point is where the specified net balance is zero. Stomatal closure can reduce CO2 entry even when photon supply is high. Water and nutrient status affect the response, so a plateau does not uniquely prove that one named biochemical enzyme is limiting without additional evidence.',
        ],
        [
          'Using a response curve',
          'Read the x-axis stimulus and y-axis measured outcome before explaining shape. A saturating light curve is consistent with limited processing capacity under fixed other conditions. Compare replicates and uncertainty before claiming differences between treatments. The teaching lab uses a relative saturating response multiplied by water and opening constraints; it is deliberately not a species-calibrated biochemical model. Use its curve to reason about interacting limitations, then design real measurements that could distinguish stomatal from biochemical constraints.',
        ],
      ],
      terms: [
        ['Photosystem', 'Pigment-protein system participating in light-driven electron transfer.'],
        ['Calvin cycle', 'Carbon fixation, reduction, and acceptor-regeneration pathway.'],
        [
          'Photorespiration',
          'Process associated with Rubisco oxygenation and carbon/energy costs.',
        ],
        ['Compensation point', 'Condition where a defined net balance is zero.'],
      ],
      example: {
        problem:
          'A leaf fixes 12 relative carbon units and releases 4 through the specified respiratory balance. What is net gain?',
        steps: [
          'Keep the same time interval and measurement basis.',
          'Net gain = 12 − 4 = 8 units.',
          'A higher light input may not raise gain if CO2 supply or water status becomes limiting.',
        ],
        conclusion: 'Net gain is 8 units in this simplified balance.',
      },
      mcq: [
        [
          'Released photosynthetic oxygen originates from…',
          'Water',
          ['CO2 directly', 'Glucose only', 'Nitrogen gas'],
          'Water splitting supplies oxygen.',
        ],
        [
          'CAM primarily separates CO2 uptake and use…',
          'In time',
          [
            'Only between two planets',
            'By eliminating the Calvin cycle',
            'By removing all stomata',
          ],
          'Temporal separation supports water-use strategies.',
        ],
        [
          'A high-light plateau proves one unique cause?',
          'No',
          ['Yes, always light shortage', 'Yes, always no chlorophyll', 'Yes, always no roots'],
          'Several other constraints can limit the response.',
        ],
      ],
      written: [
        ['Calculate the example net gain.', '12 − 4 = 8 relative units over the same interval.'],
        [
          'What do ATP and NADPH connect?',
          'Light-driven energy and reducing power to carbon metabolism, including Calvin-cycle reactions.',
        ],
        [
          'Distinguish C4 and CAM separation.',
          'C4 emphasizes spatial CO2 concentration; CAM emphasizes temporal separation of uptake and later use.',
        ],
        [
          'How test whether stomata contribute to a plateau?',
          'Measure conductance or internal CO2 with controlled conditions and compare responses while accounting for biochemical and water limitations.',
        ],
      ],
      flow: [
        ['Capture', 'Light reactions generate energy carriers.'],
        ['Fix', 'CO2 is incorporated and acceptors regenerated.'],
        ['Balance', 'Respiration and environmental constraints determine net gain.'],
      ],
      compare: [
        ['Light', 'Energy input', 'Not the carbon atom source.'],
        ['CO2', 'Carbon input', 'Entry can be stomatally limited.'],
        ['Net assimilation', 'Balance of uptake and release', 'Not gross fixation alone.'],
      ],
      challenge:
        'Raise light until the curve approaches a plateau, then reduce stomatal opening. Explain how another limitation changes the response.',
      takeaway:
        'Carbon gain is a coupled energy, gas-exchange, and metabolic process with multiple limiting factors.',
    },
    {
      title: 'Plant evolution, fossils, and diversity',
      description: 'Ancestry, innovations, fossil evidence, and conservation value.',
      objectives: [
        'Interpret branching evolutionary diagrams.',
        'Connect innovations to environmental challenges.',
        'Evaluate fossil and modern evidence together.',
      ],
      sections: [
        [
          'Evolution is branching',
          'An evolutionary tree represents relationships among lineages, not a ladder from inferior to superior organisms. Living mosses are not unchanged ancestors of living flowering plants; they are modern members of different branches sharing earlier ancestors. A node represents a common ancestor under the model. Rotating branches around a node does not change relationships. Read shared ancestry from branching order rather than proximity of labels across the page. Trait evolution can involve gains, losses, and convergence.',
        ],
        [
          'Challenges on land',
          'Moving into terrestrial environments involved challenges of desiccation, support, transport, gas exchange, reproduction, and exposure. Traits such as protected embryos, cuticles, stomata in relevant lineages, vascular tissues, pollen, and seeds addressed parts of these challenges over evolutionary history. No one innovation solves everything. A water-conserving barrier can restrict gas exchange, requiring regulated pathways. Explain both the functional advantage and tradeoff rather than treating a trait as a universal improvement independent of habitat.',
        ],
        [
          'Fossil evidence',
          'Fossils can preserve impressions, mineralized tissues, pollen, spores, wood, or other remains. Preservation is selective, so absence from a fossil sample is not proof that a lineage was absent everywhere. Geological context constrains age and environment, while anatomy supports identification. A fossil leaf shape can suggest affinities or conditions but usually requires comparison with other features and context. Distinguish the oldest known evidence from the exact time of origin, which may predate the available record.',
        ],
        [
          'Paleobotanical reconstruction',
          'Combine stratigraphic position, dating evidence, tissue anatomy, and associated organisms or sediments. Pollen and spores can travel and preserve differently, affecting what a deposit represents. Reconstructing a past community from counts therefore requires understanding production, dispersal, and preservation biases. A single abundant pollen type does not directly equal the same fraction of local standing vegetation. Modern reference collections and independent geological evidence can test interpretations. State the spatial and temporal support of the sample.',
        ],
        [
          'Diversity and resilience',
          'Plant diversity includes genetic, species, and functional variation. Different traits can support complementary resource use or responses to disturbance, though diversity effects depend on the system and measured outcome. Conservation value includes ecological roles, evolutionary history, cultural importance, and potential future uses. A species count alone does not describe abundance distribution or functional differences. Evaluate a conservation claim using explicit outcomes instead of assuming every mixture automatically resists every stress.',
        ],
        [
          'Testing evolutionary explanations',
          'A functional story is a hypothesis, not proof of historical selection. Comparative data, fossils, genetics, and experiments can support or challenge it. Similar structures may be homologous through shared ancestry or analogous through convergence. Identify the relevant comparison and alternative explanations. The generalized plant diagram teaches current function, while evolutionary reasoning asks how traits arose and changed. Keeping those questions distinct prevents treating a useful present-day role as a complete reconstruction of evolutionary history.',
        ],
      ],
      terms: [
        ['Clade', 'Ancestor and all its descendants in a phylogenetic framework.'],
        ['Homology', 'Similarity associated with shared ancestry.'],
        ['Convergence', 'Independent evolution of similar traits.'],
        ['Paleobotany', 'Study of fossil plants and past vegetation.'],
      ],
      example: {
        problem:
          'Two modern lineages share a vascular-tissue ancestor. Does one living lineage have to be the ancestor of the other?',
        steps: [
          'Locate their common ancestral node.',
          'Recognize both as modern branches descended from that ancestor.',
          'Use additional branching and trait evidence to describe relationships.',
        ],
        conclusion:
          'Shared ancestry does not make one living branch the direct ancestor of the other.',
      },
      mcq: [
        [
          'Rotating branches at a node changes relationships?',
          'No',
          ['Yes', 'Only for plants', 'Only for fossils'],
          'The branching connections remain the same.',
        ],
        [
          'Oldest known fossil equals exact origin time?',
          'Not necessarily',
          ['Always', 'Only if the fossil is large', 'Only for pollen'],
          'Preservation and sampling leave gaps.',
        ],
        [
          'Similar traits can arise independently through…',
          'Convergence',
          ['Only identical ancestry', 'A display stretch', 'A universal ladder'],
          'Functionally similar traits need not share one origin.',
        ],
      ],
      written: [
        [
          'Why is a tree not a progress ladder?',
          'It shows branching ancestry among lineages, not a ranking of living organisms by superiority.',
        ],
        [
          'Name a terrestrial tradeoff.',
          'A cuticle reduces water loss but restricts direct exchange, favoring regulated gas pathways.',
        ],
        [
          'Why do pollen percentages not directly equal local plant cover?',
          'Production, dispersal, transport, and preservation differ among taxa and locations.',
        ],
        [
          'What evidence strengthens a historical adaptation claim?',
          'Comparative traits, fossils, genetic relationships, and appropriate experiments that test alternatives rather than only a plausible story.',
        ],
      ],
      flow: [
        ['Relationships', 'Infer shared ancestry from multiple evidence types.'],
        ['Traits', 'Map gains, losses, and convergence.'],
        ['Context', 'Test function and history with fossils and modern data.'],
      ],
      compare: [
        ['Function', 'What a trait does now', 'Not a complete origin story.'],
        ['Fossil record', 'Preserved historical evidence', 'Selective and incomplete.'],
        [
          'Diversity',
          'Variation across several levels',
          'A count alone omits structure and function.',
        ],
      ],
      challenge:
        'Compare leaf function under wet and dry presets. Explain why a useful response does not alone prove how the trait evolved.',
      takeaway:
        'Evolutionary arguments require ancestry and historical evidence in addition to present-day function.',
    },
    {
      title: 'Plant ecology, nutrient deficiencies, and disease',
      description: 'Competition, adaptations, cycles, and differential diagnosis.',
      objectives: [
        'Explain resource competition and environmental adaptation.',
        'Distinguish nutrient deficiency from infection.',
        'Design comparisons that test competing causes.',
      ],
      sections: [
        [
          'Communities and competition',
          'Plants compete for light, water, nutrients, and space, while interacting with herbivores, microbes, and pollinators. Resource availability changes with canopy structure, soil conditions, and season. Competition is not always symmetric: a tall plant can shade neighbors while below-ground interactions follow another pattern. Facilitation can also occur when one plant modifies conditions beneficially for another. Describe the measured interaction and resource rather than assuming every neighboring plant has the same effect in every environment.',
        ],
        [
          'Adaptations and tradeoffs',
          'Drought-associated traits can reduce water loss or improve storage and uptake; flood-associated traits can improve internal aeration or tolerate low-oxygen roots. Shade and sun leaves can differ in structure and physiology. These traits have context-dependent costs and benefits. A reduced leaf area can conserve water while limiting light interception. An adaptation explanation should identify the environmental challenge, mechanism, evidence, and potential tradeoff. Avoid labeling a plant “better adapted” without specifying the environment and outcome.',
        ],
        [
          'Nutrients and symptom patterns',
          'Plants require mineral nutrients for structures and metabolism. Deficiency symptoms depend partly on nutrient mobility: some mobile nutrients can be remobilized from older tissues, making older leaves show symptoms first, while less mobile nutrients can affect new growth. Yellowing, necrosis, or stunting can have several causes, including pH-related availability and root damage. Visual symptoms alone are not a unique nutrient test. Use tissue or soil measurements, treatment comparisons, and environmental history to evaluate the hypothesis.',
        ],
        [
          'Infection and environmental injury',
          'Plant diseases can involve fungi, bacteria, viruses, oomycetes, and other agents, while abiotic injury can arise from drought, salinity, temperature, chemicals, or mechanical damage. Distinguish a symptom, the plant’s response, from a sign, direct evidence of an agent or its structures. Spatial spread, host range, lesion pattern, and laboratory evidence can discriminate causes, but no single clue is universally decisive. A pathogen detected on a plant is not automatically the cause of every observed injury.',
        ],
        [
          'Plants in energy and nutrient cycles',
          'Plants capture energy and incorporate carbon, while roots and associated microbes influence nutrient uptake and cycling. Decomposition returns nutrients from dead material, and disturbances alter storage and fluxes. Nitrogen fixation is performed by particular microbes, including some symbiotic partners, not by every plant directly. A legume’s benefit depends on the relevant association and conditions. Distinguish energy flow, which is dissipative, from matter cycling, which transfers atoms among reservoirs.',
        ],
        [
          'Testing competing diagnoses',
          'For a synthetic yellowing case, list at least nutrient limitation, water stress, infection, and normal senescence where plausible. Identify which observation would differ: tissue concentration, moisture history, pathogen evidence, or age pattern. Use comparable plants and controls for any intervention test. Changing several treatments at once can improve appearance without revealing which factor caused the change. The lab isolates water and stomatal constraints but cannot diagnose a real plant disease; its value is practicing mechanism-based comparisons.',
        ],
      ],
      terms: [
        ['Symptom', 'Plant response to injury or disease.'],
        ['Sign', 'Observable evidence of a causal organism or its structures.'],
        ['Nutrient mobility', 'Ability to redistribute a nutrient within the plant.'],
        ['Facilitation', 'Interaction improving another organism’s conditions under a context.'],
      ],
      example: {
        problem:
          'Older leaves yellow first, but soil is dry and no tissue analysis exists. Is nutrient deficiency established?',
        steps: [
          'Age pattern can be consistent with some mobile-nutrient deficiencies.',
          'Dryness and other causes remain plausible.',
          'Measure water status and nutrient evidence or use controlled comparisons before naming a cause.',
        ],
        conclusion: 'The symptom supports hypotheses but does not uniquely diagnose a deficiency.',
      },
      mcq: [
        [
          'A fungal structure on a lesion is an example of…',
          'A sign',
          ['Only a symptom', 'A root system', 'A light-response plateau'],
          'A sign is direct agent-related evidence.',
        ],
        [
          'Do all plants directly fix atmospheric nitrogen?',
          'No',
          ['Yes', 'Only every green leaf', 'Only every woody stem'],
          'Particular microbes carry out biological nitrogen fixation.',
        ],
        [
          'Changing water and nutrients together reveals the unique cause?',
          'No',
          ['Yes', 'Only if leaves become greener', 'Only at high light'],
          'Multiple changes confound causal attribution.',
        ],
      ],
      written: [
        [
          'Distinguish symptom and sign.',
          'A symptom is the plant response; a sign is observable evidence of the agent or its structures.',
        ],
        [
          'Why can older leaves show deficiency first?',
          'Some mobile nutrients are redistributed to new growth, leaving older tissues depleted.',
        ],
        [
          'Give two alternatives to deficiency for yellowing.',
          'Water stress, infection, salinity, normal senescence, or root injury are possible depending on context.',
        ],
        [
          'Design a discriminating test.',
          'Use comparable plants with controlled water and nutrient treatments, relevant measurements, replication, and pathogen checks as appropriate.',
        ],
      ],
      flow: [
        ['Pattern', 'Describe tissue age, distribution, and environmental context.'],
        ['Alternatives', 'Compare biotic and abiotic mechanisms.'],
        ['Test', 'Collect discriminating evidence under controlled conditions.'],
      ],
      compare: [
        [
          'Deficiency',
          'Insufficient available nutrient',
          'Symptoms can overlap with other stress.',
        ],
        ['Infection', 'Agent-associated injury', 'Detection alone may not establish cause.'],
        ['Drought', 'Water-supply limitation', 'Can alter gas exchange and nutrient uptake.'],
      ],
      challenge:
        'Create a low-water trial and a low-light trial with similar carbon-gain outputs. Explain why one output cannot uniquely diagnose stress.',
      takeaway:
        'Ecological and disease explanations require differential evidence, not symptom recognition alone.',
    },
    {
      title: 'Horticulture, aquatic systems, medicine, and materials',
      description: 'Applied plant science with measurable outcomes and ecological context.',
      objectives: [
        'Connect cultivation decisions to plant mechanisms.',
        'Distinguish hydroponics, aquatic plants, and aquaculture.',
        'Evaluate medicinal and material claims using evidence.',
      ],
      sections: [
        [
          'Horticulture as controlled plant management',
          'Horticulture applies plant biology to cultivation, propagation, quality, and management. Light, water, nutrients, temperature, substrate, and developmental stage interact. More fertilizer or water is not universally beneficial; excess can create salinity, oxygen, or runoff problems. Define the outcome, such as germination, yield, flower timing, or storage quality, before evaluating a treatment. A growth response in one species or environment does not automatically transfer to another. Replicated comparisons and clear management records support useful conclusions.',
        ],
        [
          'Hydroponics and aquatic contexts',
          'Hydroponics grows plants with nutrient solutions rather than ordinary soil as the nutrient medium, but roots still require appropriate water, ions, and oxygen. Aquatic plants have adaptations to submerged or floating conditions and are not simply land plants with unlimited water. Aquaculture broadly cultivates aquatic organisms, potentially including algae or integrated systems; it is not a synonym for hydroponics. In an integrated system, nutrient inputs and outputs must be balanced and monitored rather than assuming organisms automatically supply each other’s exact needs.',
        ],
        [
          'Propagation and breeding choices',
          'Sexual propagation produces genetically varied offspring, while many vegetative propagation methods preserve a selected genotype more closely. Clonal uniformity can support consistent traits but may increase shared vulnerability. Grafting combines parts with distinct genetic identities rather than making all cells genetically identical. Successful propagation depends on compatibility, developmental state, and conditions. A practical plan should specify the trait to preserve, the method, and how success will be measured, not merely name a technique.',
        ],
        [
          'Plants and medicine',
          'Plants synthesize compounds with ecological functions such as defense and signaling, and some have informed medicines. A natural origin does not establish safety or effectiveness. Evidence must address the specific compound or preparation, dose, outcome, and study design. Concentrations and contaminants can vary among preparations. This course teaches evidence evaluation and does not recommend using a plant product to treat an individual. Distinguish an interesting biochemical activity from demonstrated clinical benefit in an appropriate setting.',
        ],
        [
          'Materials and environmental management',
          'Cellulose-rich fibers, wood, oils, resins, starches, and other products reflect plant anatomy and chemistry. Material performance depends on composition, processing, moisture, and structure. Plants can also support erosion control, habitat restoration, and some pollutant-management strategies, but uptake of a contaminant may create disposal or food-chain issues. A green-looking site is not automatically restored ecological function. Evaluate native diversity, soil condition, water effects, and the intended long-term outcome.',
        ],
        [
          'Designing an applied evaluation',
          'State the decision, comparison, measured outcomes, timescale, and potential tradeoffs. For an irrigation trial, compare water use and growth or yield rather than only leaf color. Record conditions and independent plant units, and avoid changing light, nutrients, and water simultaneously if the goal is to isolate one effect. The teaching lab visualizes a water-carbon tradeoff under a simplified model. Use it to generate predictions, then explain what field measurements and replication would be needed before a management recommendation.',
        ],
      ],
      terms: [
        ['Horticulture', 'Applied cultivation and management of plants.'],
        [
          'Hydroponics',
          'Cultivation using nutrient solution rather than soil as the nutrient medium.',
        ],
        ['Clonal propagation', 'Producing descendants with closely preserved genotype.'],
        ['Phytoremediation', 'Use of plants in a defined contaminant-management process.'],
      ],
      example: {
        problem:
          'Two irrigation treatments produce the same growth index, but one uses twice the water. What else is needed to choose a management approach?',
        steps: [
          'Compare water-use efficiency under the measured conditions.',
          'Check replication, crop quality, soil effects, and whether the growth index predicts the desired outcome.',
          'Consider long-term and environmental tradeoffs before generalizing.',
        ],
        conclusion: 'Equal growth alone does not establish equal management performance.',
      },
      mcq: [
        [
          'Hydroponic roots still need…',
          'Oxygen and suitable nutrient conditions',
          ['No oxygen', 'Only pure water forever', 'No selective membranes'],
          'Removing soil does not remove physiological requirements.',
        ],
        [
          'Natural origin guarantees medicinal safety?',
          'No',
          ['Yes', 'Only for leaves', 'Only for roots'],
          'Specific evidence and preparation matter.',
        ],
        [
          'Vegetative propagation commonly helps preserve…',
          'A selected genotype',
          ['Maximum new genetic variation necessarily', 'No traits', 'Every environmental effect'],
          'Clonal methods often retain genetic identity more closely.',
        ],
      ],
      written: [
        [
          'Distinguish hydroponics and aquaculture.',
          'Hydroponics is a plant cultivation method using nutrient solution; aquaculture cultivates aquatic organisms and can include different systems.',
        ],
        [
          'Why measure water use and yield together?',
          'They reveal efficiency and tradeoffs that one growth measure can hide.',
        ],
        [
          'What evidence is needed for a medicinal claim?',
          'Specific preparation or compound, dose, outcome, valid study design, effectiveness, and safety evidence.',
        ],
        [
          'Name a phytoremediation limitation.',
          'Contaminants may remain in harvested biomass, require disposal, or enter food chains; success depends on contaminant and site conditions.',
        ],
      ],
      flow: [
        ['Decision', 'Define the desired practical outcome.'],
        ['Mechanism', 'Choose a cultivation or material process grounded in biology.'],
        ['Evaluate', 'Measure benefits, costs, and environmental tradeoffs.'],
      ],
      compare: [
        ['Growth', 'One biological response', 'Not total management success.'],
        ['Natural compound', 'A source of chemical diversity', 'Not automatic safety or efficacy.'],
        [
          'Restoration',
          'Recovery of specified ecological functions',
          'Not simply more green cover.',
        ],
      ],
      challenge:
        'Record two treatments with similar carbon gain but different modeled water loss. Describe which additional real measurements an irrigation decision needs.',
      takeaway:
        'Applied botany evaluates specific mechanisms and outcomes with explicit tradeoffs and evidence.',
    },
  ],
});
