import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const rocksLessons = buildCourse({
  eventId: 'rocks-and-minerals',
  eventName: 'Rocks & Minerals',
  prefix: 'rock',
  lab: 'minerals',
  syllabus: 'Rocks & Minerals B_C SciConnect Syllabus 2026.pdf',
  intro:
    'Eight units develop mineral evidence, atomic structure, silicate groups, and the formation and identification of rocks. Specimen decisions combine independent observations with geological context. The virtual specimens are schematic teaching cases; consult the applicable official list for competition identification scope.',
  references: [
    { title: 'USGS: Minerals', url: 'https://www.usgs.gov/science/science-explorer/minerals' },
    {
      title: 'Smithsonian National Rock and Ore Collections',
      url: 'https://naturalhistory.si.edu/research/mineral-sciences/collections-overview',
    },
  ],
  chapters: [
    c(
      'Minerals, rocks, and diagnostic evidence',
      [
        'Distinguish minerals from rocks.',
        'Choose independent diagnostic observations.',
        'Explain uncertainty in specimen identification.',
      ],
      [
        [
          'Mineral versus rock',
          'A mineral is generally a naturally occurring inorganic solid with an ordered internal structure and a characteristic composition that can vary within limits. A rock is an aggregate of minerals, mineraloids, or other geological material. Granite contains several mineral species; quartz is one mineral. Glass lacks the long-range crystalline order of a mineral. Definitions help organize observations, but a visually uniform rock need not be a single mineral. Examine grains and textures at an appropriate scale.',
        ],
        [
          'Color and streak',
          'Color can vary with impurities, defects, weathering, and lighting, so it is often a weak identifier alone. Streak is the color of powdered material and can be more consistent for some minerals. A specimen harder than a streak plate may scratch the plate instead of producing a reliable streak. Distinguish a powder trail from the plate’s own debris. Luster describes reflected light, such as metallic or vitreous appearance, and depends on surface condition.',
        ],
        [
          'Hardness testing',
          'Mohs hardness is an ordinal scratch-resistance scale, not a linear measure of strength or toughness. A harder reference scratches a softer fresh surface. Test both directions when possible and wipe away loose powder to distinguish a true groove from a mark. Weathered surfaces, coatings, and multiple grains complicate a test. Do not infer that hardness eight is twice hardness four; the physical intervals are unequal. Use approved tests on suitable specimens only.',
        ],
        [
          'Cleavage and fracture',
          'Cleavage follows planes favored by internal bonding; fracture describes other breakage surfaces. Count sets of parallel planes and measure their relationships, rather than counting every visible flat face. Crystal growth faces are not automatically cleavage planes. Quartz commonly shows conchoidal fracture, whereas calcite has rhombohedral cleavage. One broken fragment may hide an important direction. Observe several orientations and connect breakage to structure instead of trusting a silhouette.',
        ],
        [
          'Combining evidence',
          'Density, magnetism, crystal habit, streak, cleavage, and approved reaction observations can narrow possibilities. Use features that answer different questions: color and a photograph of color are not independent evidence. Density requires mass divided by true specimen volume, and porous aggregates can complicate interpretation. Acid reactivity is supplied as an observation in this course rather than a physical test instruction. Real specimens and chemicals require approved handling and school procedures.',
        ],
        [
          'An identification claim',
          'State a candidate, the observations that support it, and a plausible alternative that was excluded. An unknown with hardness near three, pale streak, rhombohedral cleavage, and recorded carbonate reactivity supports calcite more strongly than its color alone. Identification remains limited by the quality and range of observations. The lab asks you to reveal evidence before choosing a conclusion; it rewards diagnostic reasoning rather than memorizing one idealized photograph.',
        ],
      ],
      [
        ['Mineral', 'Crystalline geological substance with characteristic composition.'],
        ['Rock', 'Aggregate of geological material.'],
        ['Cleavage', 'Preferential breakage along structural planes.'],
        ['Streak', 'Color of mineral powder.'],
      ],
      [
        'An unknown scratches gypsum but is scratched by fluorite. What can you conclude?',
        [
          'Gypsum is Mohs 2; fluorite is Mohs 4.',
          'The test brackets hardness between about 2 and 4.',
          'Calcite at 3 is compatible, but additional evidence is needed.',
        ],
        'A bracket is evidence, not a unique identification.',
      ],
      [
        [
          'Mohs hardness is…',
          'An ordinal scratch scale',
          ['A linear mass scale', 'A color scale', 'A toughness scale'],
          'Intervals are not equal.',
        ],
        [
          'A rock can contain…',
          'Multiple minerals',
          ['Only one chemical element', 'No geological material', 'Only transparent crystals'],
          'Rocks are aggregates.',
        ],
        [
          'The best identification uses…',
          'Several diagnostic observations',
          ['Color alone', 'One nickname', 'Only specimen size'],
          'Independent evidence narrows alternatives.',
        ],
      ],
      [
        [
          'Why can streak fail on quartz?',
          'Quartz can scratch the plate rather than yield a diagnostic powder.',
        ],
        [
          'Distinguish face from cleavage.',
          'A growth face forms during crystallization; cleavage is a preferred breakage direction.',
        ],
        [
          'Explain a density calculation.',
          'Divide measured mass by specimen volume and report units and porosity limitations.',
        ],
        [
          'Name one alternative-evidence check.',
          'For suspected calcite versus quartz, combine hardness with cleavage or a supplied carbonate reaction observation.',
        ],
      ],
      [
        ['Observe', 'Separate grains and surface condition.'],
        ['Test', 'Reveal hardness, cleavage, and other evidence.'],
        ['Conclude', 'Choose a supported candidate and state limitations.'],
      ],
      [
        ['Color', 'Visible appearance', 'Often impurity-dependent.'],
        ['Hardness', 'Scratch resistance', 'Not toughness.'],
        ['Cleavage', 'Bond-controlled planes', 'Not every flat face.'],
      ],
      'Reveal at least three different tests for two specimens. Explain which test excludes your nearest alternative.',
      'A specimen name is a conclusion supported by independent physical evidence.',
    ),
    c(
      'Formation environments, crystal systems, and habit',
      [
        'Connect crystallization to environment.',
        'Distinguish lattice symmetry from external habit.',
        'Explain why growth history changes appearance.',
      ],
      [
        [
          'Routes to crystals',
          'Minerals can crystallize from cooling magma, precipitate from aqueous solutions, grow during metamorphic reactions, or form through biological processes. Temperature, pressure, composition, and fluid chemistry determine which phases are stable or kinetically accessible. Slow growth can allow large crystals, but space and supply also matter. A large crystal does not by itself prove one unique environment. Use host rock, associated minerals, and growth relationships to reconstruct a defensible formation history.',
        ],
        [
          'Ordered structure',
          'A crystal repeats a structural arrangement through space. The unit cell describes a repeating building block and its dimensions and angles. Atomic arrangement influences symmetry, density, cleavage, and directional properties. Different structures with the same composition are polymorphs; diamond and graphite illustrate how structure can strongly change properties. Composition alone therefore does not fully predict a specimen’s behavior. Distinguish the ideal repeating lattice from defects and impurities in real material.',
        ],
        [
          'Seven systems',
          'Crystal systems organize symmetry and unit-cell geometry: cubic, tetragonal, orthorhombic, hexagonal, trigonal, monoclinic, and triclinic. Cubic axes have equal lengths and right angles; orthorhombic axes have unequal lengths with right angles. Trigonal classification involves threefold symmetry and has alternative conventional cell descriptions. Learn symmetry relationships rather than assuming every specimen displays a perfect textbook cell. Broken or intergrown specimens may conceal the diagnostic external geometry.',
        ],
        [
          'Habit is appearance',
          'Habit describes growth form, such as prismatic, acicular, tabular, fibrous, or massive. The same mineral can display different habits in different growth conditions, and different minerals can share one habit. A massive specimen can still have crystalline internal order. Crystal faces grow at different relative rates; limited space produces intergrowth rather than an isolated ideal crystal. Habit complements structural evidence but should not replace hardness, cleavage, and composition.',
        ],
        [
          'Fluids and replacement',
          'Hydrothermal fluids transport dissolved components and precipitate minerals as conditions change. Evaporation can concentrate ions until mineral precipitation occurs. Replacement can preserve an earlier shape while changing mineral composition, creating a pseudomorph. Crosscutting veins and overgrowths establish relative timing, but absolute ages require additional evidence. Examine contacts and inclusions: a mineral enclosed by another often formed earlier, although replacement and complex histories can complicate a simple sequence.',
        ],
        [
          'Interpreting a specimen',
          'Separate three claims: what the mineral is, what structure it has, and how the observed specimen formed. A cubic-looking shape supports a symmetry interpretation but does not uniquely identify a species. Record whether faces are growth surfaces, cleavage fragments, or an altered inherited form. The virtual evidence cards simplify natural variation; compare how multiple properties remain diagnostic even when habit changes. Geological explanations should account for both the mineral association and the texture.',
        ],
      ],
      [
        ['Unit cell', 'Repeating structural cell.'],
        ['Polymorph', 'Same composition with different crystal structure.'],
        ['Habit', 'External growth form.'],
        ['Pseudomorph', 'New mineral retaining an earlier form.'],
      ],
      [
        'A massive specimen lacks visible faces. Does it lack crystalline order?',
        [
          'Habit describes external appearance.',
          'Many small intergrown crystals can produce a massive appearance.',
          'Other structural and physical observations are needed.',
        ],
        'Absent faces do not establish an amorphous material.',
      ],
      [
        [
          'Equal axes and right angles describe the conventional…',
          'Cubic system',
          ['Triclinic system', 'Monoclinic system', 'Orthorhombic system'],
          'Cubic cell dimensions are equal.',
        ],
        [
          'Same composition, different structure defines…',
          'Polymorphism',
          ['Sorting', 'Streak', 'Cementation'],
          'Atomic arrangement differs.',
        ],
        [
          'Acicular describes…',
          'Needlelike habit',
          ['One unique species', 'A hardness value', 'A chemical reaction'],
          'Habit is growth appearance.',
        ],
      ],
      [
        [
          'Why is slow cooling insufficient to predict size?',
          'Available space, nucleation, fluid supply, and growth time also matter.',
        ],
        [
          'What is a pseudomorph?',
          'A replacement mineral preserves the external form of an earlier material.',
        ],
        [
          'How can veins constrain timing?',
          'A vein that cuts host material is generally younger than the material it cuts.',
        ],
        [
          'Distinguish symmetry and habit.',
          'Symmetry describes structural relationships; habit describes the realized external growth form.',
        ],
      ],
      [
        ['Conditions', 'Temperature, pressure, fluids, and composition.'],
        ['Structure', 'Stable or accessible atomic arrangement.'],
        ['Appearance', 'Growth, breakage, and alteration modify habit.'],
      ],
      [
        ['System', 'Symmetry classification', 'May be hidden by breakage.'],
        ['Habit', 'External growth form', 'Not unique to a species.'],
        ['Polymorph', 'Alternative structure', 'May share composition.'],
      ],
      'Compare calcite and quartz evidence cards. Relate cleavage and fracture to internal structure rather than display color.',
      'Crystal structure constrains properties while growth history shapes the visible specimen.',
    ),
    c(
      'Silicate structures and mineral groups',
      [
        'Trace shared oxygen in tetrahedral structures.',
        'Compare silicate groups.',
        'Connect structure to cleavage and composition.',
      ],
      [
        [
          'The tetrahedral building block',
          'A silicate tetrahedron has silicon coordinated by four oxygen atoms. Tetrahedra can share oxygen corners, producing larger groups, chains, sheets, or frameworks. The isolated unit is conventionally represented as SiO₄⁴⁻, but real minerals include additional cations and sometimes substitutions. Shared oxygen changes the overall silicon-to-oxygen ratio and charge balance. A structural diagram is a connectivity model, not a photograph or a literal set of rigid colored balls.',
        ],
        [
          'Isolated and paired units',
          'Nesosilicates contain isolated tetrahedra connected through other cations; olivine is a familiar example. Sorosilicates contain paired tetrahedra sharing one oxygen, giving Si₂O₇ groups. Cyclosilicates contain rings, commonly illustrated by six-membered rings, though ring sizes vary. Group names describe connectivity rather than specimen shape. An elongated crystal is not automatically a chain silicate. Use chemistry and structure together when assigning a mineral group.',
        ],
        [
          'Chains and double chains',
          'Single-chain inosilicates share two corners per tetrahedron along a chain, commonly giving a SiO₃ ratio. Pyroxenes are representative. Double-chain structures, represented by amphiboles, alternate sharing patterns and commonly yield Si₄O₁₁ groups. These arrangements help explain contrasting cleavage angles: pyroxene cleavage is near right angles, while amphibole commonly shows about 56° and 124°. Natural specimens may obscure angles, so combine this evidence with habit and other properties.',
        ],
        [
          'Sheets',
          'Phyllosilicates link tetrahedra into sheets, with an idealized Si₂O₅ ratio before accounting for substitutions and other layers. Micas and many clay minerals have layered structures. Relatively weak bonding between certain layers can produce strong basal cleavage, but layer chemistry determines specific behavior. A thin flaky fragment is suggestive, not definitive. Distinguish elastic mica sheets from other soft layered materials using additional observations such as hardness and flexibility.',
        ],
        [
          'Frameworks',
          'Tectosilicates share all four oxygen corners in three-dimensional networks, producing the SiO₂ ratio in pure silica. Quartz is a framework silicate. Feldspars incorporate aluminum substitution and charge-balancing cations, giving different chemistry and cleavage. A shared structural class does not imply identical physical properties. Atomic substitution must maintain overall charge balance and can change lattice dimensions or stability. Learn representative minerals while preserving the difference between group connectivity and exact composition.',
        ],
        [
          'Reasoning with diagrams',
          'Count unique oxygen atoms rather than drawing corners without accounting for sharing. An oxygen joining two tetrahedra contributes half to each tetrahedron’s bookkeeping. Use a structure–property explanation cautiously: cleavage reflects bond strengths and planes in the full crystal, not merely the number of shared corners. The specimen lab tests observable properties; link them to a plausible structural class only when evidence supports the specific mineral identity.',
        ],
      ],
      [
        ['Tetrahedron', 'Silicon coordinated by four oxygen atoms.'],
        ['Inosilicate', 'Chain silicate structure.'],
        ['Phyllosilicate', 'Sheet silicate structure.'],
        ['Tectosilicate', 'Framework silicate structure.'],
      ],
      [
        'Why does a fully shared silica framework have SiO₂ rather than SiO₄?',
        [
          'Each tetrahedron has four oxygen corners.',
          'Each corner is shared by two tetrahedra.',
          'Count four halves = two oxygen atoms per silicon.',
        ],
        'Sharing changes atom bookkeeping.',
      ],
      [
        [
          'Micas are representative…',
          'Sheet silicates',
          ['Native elements', 'Halides', 'Sulfides'],
          'Their layered structures support basal cleavage.',
        ],
        [
          'Olivine contains…',
          'Isolated tetrahedra',
          ['Only metal atoms', 'A pure carbonate lattice', 'No silicon'],
          'It is a nesosilicate.',
        ],
        [
          'Quartz is a…',
          'Framework silicate',
          ['Double-chain silicate', 'Sulfide', 'Halide'],
          'Its tetrahedra form a network.',
        ],
      ],
      [
        [
          'Compare pyroxene and amphibole cleavage.',
          'Pyroxene commonly approaches 90°; amphibole commonly approaches 56°/124°.',
        ],
        [
          'Why does crystal elongation not prove chain structure?',
          'External habit reflects growth and is not uniquely determined by one connectivity group.',
        ],
        [
          'Explain oxygen sharing.',
          'A shared oxygen belongs to adjacent tetrahedra and must not be counted twice in the overall ratio.',
        ],
        [
          'Why can quartz and feldspar differ?',
          'They differ in chemistry, substitutions, and detailed lattice bonding despite both being frameworks.',
        ],
      ],
      [
        ['Connect', 'Identify oxygen sharing.'],
        ['Classify', 'Isolated, paired, ring, chain, sheet, or framework.'],
        ['Test', 'Compare predicted properties with mineral evidence.'],
      ],
      [
        ['Chain', 'One-dimensional linkage', 'Habit alone cannot prove it.'],
        ['Sheet', 'Two-dimensional linkage', 'Full layer chemistry affects cleavage.'],
        [
          'Framework',
          'Three-dimensional linkage',
          'Different compositions retain different properties.',
        ],
      ],
      'Identify a quartz case from the evidence. Explain why conchoidal fracture is more useful than its rendered color.',
      'Silicate classification follows tetrahedral connectivity, not an external silhouette.',
    ),
    c(
      'Non-silicates and economic geology',
      [
        'Recognize major non-silicate groups.',
        'Use chemical and physical evidence together.',
        'Separate mineral resources from economic reserves.',
      ],
      [
        [
          'Grouping by chemistry',
          'Non-silicate minerals include carbonates, oxides, sulfides, halides, native elements, and additional groups such as sulfates and phosphates. These classes use characteristic anions or anionic groups rather than a universal external shape. Calcite is a carbonate, hematite an oxide, pyrite a sulfide, halite a halide, and copper can occur as a native element. A metallic luster does not make every specimen a native metal; many sulfides also look metallic.',
        ],
        [
          'Carbonates',
          'Carbonates contain the carbonate group, CO₃²⁻. Calcite and dolomite are important rock-forming examples with related but distinguishable compositions and behavior. Supplied reaction observations can help distinguish carbonate candidates, but reaction rate depends on surface preparation and conditions. Rhombohedral cleavage is useful for calcite but is not evidence of cubic symmetry. Carbonate minerals connect precipitation, biological activity, sedimentary rocks, groundwater chemistry, and karst landscape development.',
        ],
        [
          'Oxides and sulfides',
          'Oxides combine oxygen with other elements; hematite and magnetite are major iron-bearing examples. Hematite’s reddish-brown streak and magnetite’s strong magnetism offer more diagnostic evidence than dark color alone. Sulfides combine sulfur with metals or other elements; pyrite and galena are familiar examples. Weathering can alter surfaces or produce environmental consequences. Distinguish a fresh interior observation from an oxidized coating before comparing a specimen with a reference description.',
        ],
        [
          'Halides and native elements',
          'Halite commonly has cubic cleavage and low hardness; fluorite commonly has octahedral cleavage and Mohs hardness four. Neither should be identified through tasting. Native elements can include metals such as copper and nonmetals such as sulfur or carbon. Diamond and graphite show why composition alone cannot establish hardness. Use structure, luster, density, and cleavage as complementary evidence. Do not equate a shiny yellow specimen automatically with gold.',
        ],
        [
          'Uses and extraction',
          'Mineral properties support uses: hardness for abrasives, conductivity for wiring, and composition for metal production or industrial feedstocks. An ore is material from which a valuable component can be extracted economically under specified conditions. A geological resource and an economically recoverable reserve are different categories. Prices, technology, access, grade, and environmental constraints affect economic status. A useful mineral is not necessarily an ore at every location and concentration.',
        ],
        [
          'Environmental interpretation',
          'Mining and processing can affect land, water, energy use, and communities. Some sulfide-rich materials can generate acidic drainage when exposed to oxygen and water, but site behavior depends on mineralogy and neutralizing capacity. Evaluate a claim with composition, exposure, and hydrology rather than assigning identical risk to every sulfide specimen. The lab’s supplied property cards teach identification; they do not establish extraction feasibility or environmental impact for a real deposit.',
        ],
      ],
      [
        ['Carbonate', 'Mineral class containing CO₃²⁻.'],
        ['Sulfide', 'Mineral class with sulfur bonded to other elements.'],
        ['Ore', 'Material economically extractable for a valuable component.'],
        ['Reserve', 'Economically recoverable portion under specified conditions.'],
      ],
      [
        'A dark specimen has reddish-brown streak and weak magnetism. Which iron mineral is favored?',
        [
          'Compare hematite and magnetite rather than using color.',
          'Hematite commonly gives reddish-brown streak; magnetite is strongly magnetic.',
          'Favor hematite while checking other properties.',
        ],
        'Use diagnostic combinations.',
      ],
      [
        [
          'Pyrite belongs to…',
          'Sulfides',
          ['Halides', 'Carbonates', 'Native elements'],
          'It contains iron and sulfur.',
        ],
        [
          'The approved way to distinguish halite is…',
          'Physical evidence without tasting',
          ['Taste every sample', 'Heat an unknown', 'Assume all clear crystals are salt'],
          'Unknowns must not be tasted.',
        ],
        [
          'Ore status depends partly on…',
          'Economic extraction conditions',
          ['Color alone', 'Crystal size only', 'One fixed universal value'],
          'Recoverability is contextual.',
        ],
      ],
      [
        [
          'Why is luster insufficient for gold identification?',
          'Several minerals are metallic and yellowish; hardness, streak, density, and other evidence distinguish them.',
        ],
        ['Name a carbonate and oxide.', 'Calcite is a carbonate; hematite is an oxide.'],
        [
          'Why distinguish surface alteration?',
          'Weathering can mask the original mineral’s diagnostic properties.',
        ],
        [
          'Explain a mineral use through a property.',
          'Copper’s electrical conductivity supports wiring; hard minerals can serve as abrasives.',
        ],
      ],
      [
        ['Classify', 'Identify likely chemical group.'],
        ['Discriminate', 'Use streak, cleavage, hardness, and magnetism.'],
        ['Contextualize', 'Connect properties to uses and geological setting.'],
      ],
      [
        ['Metallic luster', 'Optical appearance', 'Not proof of native metal.'],
        ['Resource', 'Geological concentration', 'Not automatically economic.'],
        ['Reserve', 'Recoverable material', 'Depends on stated conditions.'],
      ],
      'Compare pyrite, hematite, and magnetite. Record which revealed observations distinguish each pair.',
      'Non-silicate identification combines chemical class with independent specimen evidence.',
    ),
    c(
      'Igneous processes, textures, and Bowen’s series',
      [
        'Relate texture to cooling history.',
        'Separate composition from grain size.',
        'Explain fractional crystallization.',
      ],
      [
        [
          'Magma and lava',
          'Magma is molten or partly molten material below the surface; lava has erupted at the surface. Cooling crystallizes minerals according to composition, pressure, water content, and thermal history. Intrusive rocks often cool slowly enough to form visible interlocking crystals, while extrusive rocks often have finer textures. These are common relationships, not absolute clock readings. A rock can record several stages of cooling, and glass forms when crystallization is suppressed by rapid quenching or unsuitable conditions.',
        ],
        [
          'Describing texture',
          'Phaneritic texture has crystals readily visible without magnification; aphanitic texture has very fine crystals. Porphyritic texture has larger crystals in a finer groundmass, often recording changes in growth conditions. Vesicles are gas-bubble cavities; pyroclastic texture records fragmented eruptive material. Glassy texture reflects absent long-range crystal order. Describe what is visible before assigning a process. Vesicles alone do not establish exact magma composition or eruption temperature.',
        ],
        [
          'Composition and mineralogy',
          'Felsic and mafic labels refer broadly to composition and characteristic mineral associations. Felsic rocks tend to be richer in silica and often contain quartz and feldspars; mafic rocks commonly contain more iron- and magnesium-bearing minerals. Granite and rhyolite can have related compositions with contrasting grain sizes, as can gabbro and basalt. Dark color is a clue, but weathering and mineral proportions complicate visual classification. Keep texture and composition as separate axes.',
        ],
        [
          'Bowen’s reaction series',
          'Bowen’s series summarizes common crystallization relationships in suitable magmas. The discontinuous branch progresses through minerals such as olivine, pyroxene, amphibole, and biotite, while plagioclase composition changes along a continuous branch. Lower-temperature assemblages can include potassium feldspar, muscovite, and quartz where composition permits. It is not a promise that every magma crystallizes every listed mineral. Water, pressure, bulk chemistry, and equilibrium versus crystal removal matter.',
        ],
        [
          'Differentiation',
          'Crystals can react with remaining melt if they remain in contact. If they are physically removed, fractional crystallization changes the residual melt’s composition. Assimilation and magma mixing can also modify a magma. A mineral sequence is therefore a process model rather than a universal specimen checklist. Compare mineral associations and textural relationships when reconstructing history. An isolated olivine grain does not identify the entire rock or establish one unique cooling path.',
        ],
        [
          'Interpreting specimens',
          'A coarse interlocking rock with quartz, feldspar, and mica supports a granitic interpretation; a fine dark rock can suggest basalt but needs additional evidence. Distinguish true crystals from cemented sediment grains or metamorphic recrystallization. Record phenocryst identities, groundmass, vesicles, and contacts. The rock-cycle diagram shows possible transformations rather than a mandatory circular sequence: an igneous rock can be metamorphosed directly or weather into sediment under different conditions.',
        ],
      ],
      [
        ['Intrusive', 'Crystallized below the surface.'],
        ['Porphyritic', 'Large crystals within a finer groundmass.'],
        ['Fractional crystallization', 'Removal of crystals changes remaining melt.'],
        ['Vesicle', 'Cavity formed by a gas bubble.'],
      ],
      [
        'Granite and rhyolite have similar broad composition but different textures. Explain.',
        [
          'Both can be felsic.',
          'Granite commonly has coarse crystals from intrusive growth.',
          'Rhyolite commonly has fine extrusive texture.',
        ],
        'Composition does not uniquely determine cooling texture.',
      ],
      [
        [
          'A two-stage cooling clue is…',
          'Porphyritic texture',
          ['One uniform streak', 'Metallic luster', 'Perfect sorting'],
          'Contrasting grain populations record differing growth conditions.',
        ],
        [
          'Fractional crystallization requires…',
          'Separation of crystals from melt',
          ['Only a color change', 'No crystals', 'Sediment compaction'],
          'Removal changes residual composition.',
        ],
        [
          'Bowen’s series is…',
          'A conditional crystallization model',
          ['Every rock’s mandatory sequence', 'A hardness scale', 'A river classification'],
          'Bulk chemistry and conditions matter.',
        ],
      ],
      [
        [
          'Why separate texture and composition?',
          'Different cooling histories can produce different textures from similar compositions.',
        ],
        [
          'What do vesicles record?',
          'Gas bubbles trapped during solidification, without uniquely fixing composition.',
        ],
        [
          'Contrast glass and fine crystals.',
          'Glass lacks long-range crystalline order; fine-grained rock contains small crystals.',
        ],
        [
          'What supports an igneous interpretation?',
          'Interlocking primary crystals, appropriate mineral associations, and field relationships.',
        ],
      ],
      [
        ['Melt', 'Composition, pressure, and dissolved gases.'],
        ['Cool', 'Nucleation, growth, and possible crystal separation.'],
        ['Read', 'Texture plus mineral assemblage constrains history.'],
      ],
      [
        ['Texture', 'Crystal sizes and arrangement', 'Not composition alone.'],
        ['Composition', 'Mineral and chemical proportions', 'Not a unique cooling rate.'],
        ['Bowen', 'Common crystallization relationships', 'Not universal for all melts.'],
      ],
      'Select rock-cycle stages and trace an igneous-to-sedimentary route. Name the processes between stages.',
      'Igneous interpretation uses texture and composition together with a conditional cooling model.',
    ),
    c(
      'Sedimentary processes, grains, and fossils',
      [
        'Trace weathering through lithification.',
        'Use grain size and sorting cautiously.',
        'Distinguish clastic, chemical, and biochemical origins.',
      ],
      [
        [
          'From source to sediment',
          'Physical weathering breaks material apart, while chemical weathering changes minerals through reactions. Erosion removes material; transport moves it; deposition occurs when conditions permit accumulation. These processes are distinct even when they occur together. Transport can be by water, wind, ice, or gravity. Source composition and weathering resistance affect which grains survive. A rounded grain records abrasion history but does not uniquely determine transport distance or the transporting agent.',
        ],
        [
          'Grain populations',
          'Describe grain size, sorting, roundness, and composition independently. Sorting is the spread of sizes; roundness describes edge smoothness rather than overall spherical shape. Coarser particles often require greater transport competence, but density, shape, cohesion, and flow conditions modify the relationship. Clay can remain suspended yet resist erosion when cohesive. Avoid treating one grain-size diagram as a universal rule for every river, beach, glacier, or mud deposit.',
        ],
        [
          'Clastic rocks',
          'Clastic sedimentary rocks consist of transported fragments. Conglomerate contains rounded gravel-size clasts, while breccia has angular ones. Sandstone is dominated by sand-size material, and mudstone includes much finer sediment; fissile mudrock is commonly termed shale. Naming systems can differ, so state the descriptive evidence. Identify grains and cement separately. Quartz grains do not make the whole cemented specimen the mineral quartz; the aggregate is a rock.',
        ],
        [
          'Chemical and biological routes',
          'Chemical sediments precipitate from solution, while biochemical accumulation involves organisms or their products. Carbonate rocks can form through several routes and later recrystallize. Evaporites record concentration and precipitation under suitable water-balance conditions. Coal derives from organic material transformed through burial, whereas a limestone may contain shell fragments or chemical textures. Do not infer that every pale rock is limestone or that every limestone has identical depositional conditions.',
        ],
        [
          'Lithification and structures',
          'Compaction reduces pore space and cementation binds grains, turning sediment into rock. Cross-bedding, ripples, graded bedding, and mud cracks can constrain depositional processes. Interpret structures in orientation and scale; one ripple photograph does not establish an entire basin history. Fossils can record organisms, traces, and environmental conditions, but preservation is selective. Rapid burial, durable parts, low disturbance, and mineral replacement influence what enters the geological record.',
        ],
        [
          'Evidence and uncertainty',
          'Separate observations of grains, cement, bedding, and fossils from environmental interpretation. A well-sorted rounded quartz sand suggests sustained reworking, but several settings can produce it. Combine sedimentary structures and associated facies to strengthen the claim. The virtual rock cycle represents weathering, deposition, and lithification as separate steps. Explain which material moves and which process changes it rather than memorizing one arrow sequence as the only possible history.',
        ],
      ],
      [
        ['Sorting', 'Distribution of grain sizes.'],
        ['Roundness', 'Smoothness of grain edges.'],
        ['Lithification', 'Conversion of sediment into rock.'],
        ['Cementation', 'Mineral precipitation binding grains.'],
      ],
      [
        'A rock contains rounded gravel clasts in cement. Classify and constrain the claim.',
        [
          'Recognize transported clasts and cement.',
          'Rounded gravel supports conglomerate.',
          'Transport agent and exact environment need more evidence.',
        ],
        'Texture supports a name more strongly than a unique setting.',
      ],
      [
        [
          'Angular gravel clasts suggest…',
          'Breccia',
          ['Conglomerate specifically', 'Obsidian', 'Schist'],
          'Clast angularity distinguishes these names.',
        ],
        [
          'Cementation is…',
          'Binding grains by precipitated material',
          ['Moving grains downstream', 'Melting a whole rock', 'Only breaking crystals'],
          'It is a lithification process.',
        ],
        [
          'Sorting describes…',
          'Spread of grain sizes',
          ['Edge smoothness', 'Mineral hardness', 'Fossil age'],
          'Roundness is a different variable.',
        ],
      ],
      [
        [
          'Differentiate erosion and deposition.',
          'Erosion removes material; deposition accumulates it.',
        ],
        [
          'Why is quartz sandstone a rock?',
          'It is an aggregate of grains and often cement, even if quartz dominates.',
        ],
        [
          'Give two preservation factors.',
          'Rapid burial and durable parts can improve preservation, although other conditions matter.',
        ],
        [
          'Why avoid a unique environment from one grain size?',
          'Different agents and flow histories can produce overlapping grain populations.',
        ],
      ],
      [
        ['Weather', 'Create fragments and dissolved components.'],
        ['Deposit', 'Accumulate sorted or mixed material.'],
        ['Lithify', 'Compact and cement; preserve selected evidence.'],
      ],
      [
        ['Sorting', 'Size distribution', 'Not grain roundness.'],
        ['Clastic', 'Transported fragments', 'Cement can have different composition.'],
        ['Fossil record', 'Preserved evidence', 'Selective and incomplete.'],
      ],
      'Trace weathering to sedimentary rock in the cycle. Explain which steps change location and which change consolidation.',
      'Sedimentary textures preserve process clues whose interpretation improves with multiple lines of evidence.',
    ),
    c(
      'Metamorphism, stress, and mineral assemblages',
      [
        'Explain solid-state change.',
        'Distinguish metamorphic settings.',
        'Interpret foliation and grade with context.',
      ],
      [
        [
          'Solid-state transformation',
          'Metamorphism changes mineralogy and texture in existing rock through temperature, pressure, stress, and fluids without complete melting. The original rock is the protolith. New minerals can grow through chemical reactions, and old grains can recrystallize. Partial melting may occur at the transition toward igneous processes, so boundary definitions require context. A metamorphic rock retains constraints from bulk composition; limestone and shale do not produce identical assemblages under the same conditions.',
        ],
        [
          'Metamorphic settings',
          'Contact metamorphism is commonly associated with heating near an intrusion and can form an aureole. Regional metamorphism affects broad areas during tectonic burial and deformation. Dynamic metamorphism emphasizes deformation, often in fault zones. Hydrothermal alteration involves reactive fluids and may overlap other settings. These categories emphasize different processes rather than mutually exclusive isolated worlds. Identify field relationships, mineral assemblage, and fabric before assigning a setting from appearance alone.',
        ],
        [
          'Foliation and stress',
          'Foliation is a planar fabric that can arise through preferred mineral orientation, flattening, or compositional banding. Differential stress and suitable minerals often contribute. Slate, phyllite, schist, and gneiss show different fabrics and mineral visibility, but they are not a compulsory sequence for every protolith. Cleavage in a mineral differs from slaty cleavage in a rock. Examine whether the observed plane belongs to individual crystals or to the aggregate fabric.',
        ],
        [
          'Nonfoliated examples',
          'Marble forms by recrystallization of carbonate-rich protoliths, while quartzite commonly forms from quartz-rich sandstone. Nonfoliated does not mean unmetamorphosed or zero pressure. Equant mineral grains, limited differential stress, and composition can reduce a strong planar fabric. Recrystallized interlocking grains can distinguish quartzite from a cemented sandstone, though altered and intermediate examples can be difficult. Use hardness, reactivity observations, grain contacts, and geological context together.',
        ],
        [
          'Grade and index minerals',
          'Metamorphic grade broadly describes intensity of conditions, often emphasizing temperature within a setting. Index minerals can constrain conditions for suitable compositions. Their presence is not a universal thermometer independent of chemistry and pressure. Mineral assemblages and phase relationships provide stronger interpretations than a single shiny grain. A rock may record multiple episodes, retrograde alteration, or incomplete reaction. Distinguish peak conditions from later changes visible along cracks or grain margins.',
        ],
        [
          'Reconstructing history',
          'Describe protolith evidence, new minerals, fabric, and crosscutting features. A foliated mica-rich specimen supports a schistose texture, but exact pressure and temperature need additional constraints. Compare competing histories that explain the same visible banding. The rock cycle permits direct igneous-to-metamorphic and sedimentary-to-metamorphic routes. Explain the thermal and mechanical changes at each arrow and reserve a precise tectonic interpretation for evidence that actually supports it.',
        ],
      ],
      [
        ['Protolith', 'Original rock before metamorphism.'],
        ['Foliation', 'Planar fabric in a rock.'],
        ['Aureole', 'Zone of alteration around an intrusion.'],
        [
          'Index mineral',
          'Mineral useful for constraining conditions in an appropriate composition.',
        ],
      ],
      [
        'A carbonate-rich rock near an intrusion recrystallizes without melting. Propose an interpretation.',
        [
          'The protolith is carbonate-rich.',
          'Intrusion-related heating supports contact metamorphism.',
          'Recrystallized carbonate can form marble; check composition and fabric.',
        ],
        'Setting and composition jointly constrain the product.',
      ],
      [
        [
          'Metamorphism usually involves…',
          'Solid-state change',
          ['Complete melting by definition', 'Only loose sediment', 'No chemical reactions'],
          'Recrystallization can occur without melting.',
        ],
        [
          'The original rock is the…',
          'Protolith',
          ['Streak', 'Ore grade', 'Unit cell'],
          'Protolith constrains composition.',
        ],
        [
          'Nonfoliated means…',
          'No strong planar fabric',
          ['Never metamorphosed', 'Always igneous', 'No pressure occurred'],
          'Fabric and origin differ.',
        ],
      ],
      [
        [
          'Compare contact and regional metamorphism.',
          'Contact commonly emphasizes local intrusive heating; regional involves broad tectonic burial and deformation.',
        ],
        [
          'Why are index minerals conditional?',
          'Stability depends on pressure, temperature, composition, and reaction history.',
        ],
        [
          'Differentiate mineral and rock cleavage.',
          'Mineral cleavage is crystal breakage; rock cleavage is an aggregate planar fabric.',
        ],
        [
          'Give a likely quartzite protolith.',
          'Quartz-rich sandstone, with recrystallization producing interlocking grains.',
        ],
      ],
      [
        ['Start', 'Identify protolith constraints.'],
        ['Transform', 'Apply heat, stress, pressure, and fluids.'],
        ['Interpret', 'Use assemblage and fabric to constrain history.'],
      ],
      [
        ['Contact', 'Intrusion-related heat', 'May overlap fluid alteration.'],
        ['Regional', 'Broad tectonic transformation', 'Depends on bulk composition.'],
        ['Foliation', 'Planar rock fabric', 'Not proof of one exact pressure.'],
      ],
      'Select a sedimentary-to-metamorphic route. Compare limestone–marble and sandstone–quartzite transformations.',
      'Metamorphic explanations require both the starting composition and the conditions of transformation.',
    ),
    c(
      'Identification strategy, references, and timed practice',
      [
        'Build a diagnostic reference.',
        'Use evidence under time pressure.',
        'Learn from identification errors.',
      ],
      [
        [
          'Organizing a reference',
          'A useful specimen reference records composition, group, hardness, streak, cleavage, luster, density, representative habit, and likely confusions. Include multiple appearances rather than one ideal image. Organize rock pages by texture and composition as well as names. Label which features are diagnostic and which are variable. The applicable competition rules determine allowed resources and specimen scope; a course syllabus is not a substitute for that documentation.',
        ],
        [
          'Decision paths',
          'Start with broad observations, then choose a test that separates the remaining candidates. For a metallic dark mineral, magnetism or streak may be more useful than a subtle color comparison. For a pale nonmetallic specimen, hardness and cleavage often help. Avoid a rigid key that excludes natural variation. A decision path should preserve uncertain branches and tell you what additional evidence would change the conclusion. Record evidence before seeing the answer key.',
        ],
        [
          'Rock descriptions',
          'Describe grain relationships, layering, foliation, vesicles, or clastic texture before using a rock name. Distinguish mineral grains from fragments of other rocks and from cement. Use a hand lens where permitted and appropriate. A massive specimen can hide structure, while weathering can create misleading surface patterns. If evidence is insufficient, a qualified classification with a stated alternative is more scientific than an unsupported precise name.',
        ],
        [
          'Timed work',
          'Divide a station into observation, discrimination, and response. One teammate can record evidence while another checks references, then exchange conclusions with explicit reasons. Do not spend the entire interval browsing photographs. Use a short list of likely alternatives and one discriminating property. Keep unanswered uncertainties visible so a later review focuses on the actual weak point. Speed improves through reliable evidence retrieval rather than guessing from familiar shapes.',
        ],
        [
          'An error log',
          'Classify errors as missing knowledge, incorrect observation, weak discrimination, reference-navigation failure, or time management. For each error, state the incorrect rule and replace it with a testable distinction. If pyrite was confused with gold, compare hardness and streak rather than memorizing another yellow photograph. Revisit the specimen with a different orientation or lighting. Include cases where your first answer was correct for the wrong reason, because that reasoning may fail next time.',
        ],
        [
          'Transfer beyond memorization',
          'Practice with unfamiliar photographs, descriptions, and simplified property tables. Explain why the best candidate is better than the nearest alternative, then identify the observation most likely to overturn it. Rock-cycle reasoning adds formation context to identification without pretending every specimen preserves its entire history. The virtual lab supports repeated evidence comparisons and recorded trials. Its schematic cases simplify natural variability, so use them as reasoning practice alongside real approved specimens and authoritative references.',
        ],
      ],
      [
        ['Diagnostic feature', 'Observation that separates plausible alternatives.'],
        ['Differential identification', 'Comparison of competing candidates.'],
        ['Error log', 'Record of reasoning failures and corrections.'],
        ['Qualified claim', 'Conclusion with stated confidence and limitations.'],
      ],
      [
        'You have 60 seconds and two candidate minerals. Plan an evidence-first response.',
        [
          'Record luster and cleavage quickly.',
          'Choose a test that differs between candidates.',
          'State the best candidate, supporting observation, and remaining uncertainty.',
        ],
        'Choose information that changes the decision.',
      ],
      [
        [
          'Best reference design includes…',
          'Confusions and diagnostic distinctions',
          ['Only one photograph', 'Teacher names', 'Only specimen prices'],
          'Comparison supports reliable decisions.',
        ],
        [
          'An error log should record…',
          'The failed reasoning and correction',
          ['Only total score', 'Only elapsed time', 'Only the answer letter'],
          'It should improve transfer.',
        ],
        [
          'Under uncertainty, a useful answer states…',
          'Evidence and a plausible alternative',
          ['Unjustified certainty', 'Only a color', 'An unrelated process'],
          'Scientific claims have limits.',
        ],
      ],
      [
        [
          'Design a calcite–quartz comparison.',
          'Compare hardness, cleavage/fracture, and supplied carbonate reaction evidence.',
        ],
        [
          'Why use multiple images?',
          'Habit, impurities, lighting, and weathering create variable appearances.',
        ],
        [
          'What is a poor timed strategy?',
          'Browsing many unlabeled images without narrowing candidates by evidence.',
        ],
        [
          'How can a correct answer still reveal a learning gap?',
          'It may have been guessed or based on a nondiagnostic feature that will fail on another specimen.',
        ],
      ],
      [
        ['Observe', 'Record features without naming prematurely.'],
        ['Discriminate', 'Choose evidence separating alternatives.'],
        ['Review', 'Correct the reasoning and test a new case.'],
      ],
      [
        ['Recognition', 'Fast candidate generation', 'Needs confirmation.'],
        ['Reference', 'Retrieves diagnostic comparisons', 'Must meet applicable permissions.'],
        ['Practice', 'Tests transfer', 'A score alone does not explain errors.'],
      ],
      'Identify every virtual mineral using revealed evidence. Record the strongest discriminator for each, then reset and repeat.',
      'Preparation should make evidence retrieval fast while preserving uncertainty and scientific reasoning.',
    ),
  ],
});
