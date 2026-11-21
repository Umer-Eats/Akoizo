import { defineDeck, type Deck } from './presentation-types.ts';

// Botany (Division C) presentations for units 6–10, imported by presentations-botany.ts.

const groups = defineDeck('bot-u6-l1', [
  {
    kind: 'title',
    title: 'Major plant groups and comparative identification',
    subtitle:
      'Bryophytes, ferns, gymnosperms, and flowering plants, told apart by several traits at once.',
    objectives: [
      'Compare major **evolutionary innovations**.',
      'Use multiple traits to distinguish **monocots** and **eudicots**.',
      'Explain the limits of historical **group labels**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is the capsule on top of a moss a flower?',
    options: ['Yes', 'No', 'Only in spring', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Algae and land plants',
    bullets: [
      '**“Algae”** is an informal term spanning ==many photosynthetic lineages==, not one natural group.',
      'Land plants share traits for ==protecting and nourishing embryos==.',
      'Aquatic photosynthesis alone does not identify a land plant.',
      'Older terms such as **cryptogams** do not match one modern branch; ==state the framework used==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A green, photosynthetic organism lives in a pond. What does that alone tell you?',
    options: [
      'Not enough to call it a land plant; check embryos, tissues, and life cycle',
      'It is a land plant',
      'It is a moss',
      'It belongs to one natural group called algae',
    ],
    answer: 0,
    explanation:
      '“Algae” spans many lineages, and aquatic photosynthesis does not identify a land plant.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why do mosses usually need moisture to reproduce sexually?',
    options: [
      'Their sperm swim through a film of water to the egg',
      'Their seeds need soaking',
      'Their pollen is carried by water',
      'Their flowers only open when wet',
    ],
    answer: 0,
    explanation: 'Bryophytes have swimming sperm and no pollen, seeds, or flowers.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A fern frond with sori is which generation, and what do the sori release?',
    options: [
      'Sporophyte; spores',
      'Gametophyte; gametes',
      'Sporophyte; seeds',
      'Gametophyte; spores',
    ],
    answer: 0,
    explanation:
      'The frond is the diploid sporophyte; meiosis in its sporangia produces haploid spores.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Bryophytes and water dependence',
    image: 'bot-moss-cycle',
    caption:
      'In mosses the leafy plant is the **gametophyte**; the stalked capsule is the **sporophyte** growing on it.',
    bullets: [
      'Bryophytes ==lack lignified vascular tissue==.',
      'Sperm generally need a ==film of water== to reach the egg.',
      'A capsule is ==not a flower or seed==; it releases spores.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Seedless vascular plants',
    image: 'bot-fern-sori',
    caption:
      '**Sori** on a polypody fern: clusters of **sporangia** on the underside of the frond, which is the ==sporophyte==.',
    bullets: [
      'Lycophytes and ferns have **vascular tissue** and a prominent sporophyte.',
      'They reproduce by ==spores, not seeds==; a small gametophyte remains.',
      'Not every dot on a frond is a reproductive structure.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Gymnosperms and angiosperms',
    image: 'bot-pine-cone',
    caption:
      'A pine’s female cone: **ovules** sit ==exposed on scales== and become seeds, with no ovary around them.',
    bullets: [
      '**Gymnosperms**: ovules and seeds ==not enclosed in an ovary==.',
      '**Angiosperms**: flowers, with ovules inside an ovary that becomes a **fruit**.',
      'A fruit is defined by development, ==not sweetness or culinary use==.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Sort each trait to the group it best describes.',
    bins: ['Bryophytes', 'Ferns', 'Seed plants'],
    items: [
      ['No lignified vascular tissue', 0],
      ['Dominant gametophyte', 0],
      ['Vascular sporophyte that disperses spores', 1],
      ['Sori on fronds', 1],
      ['Embryo protected inside a seed', 2],
      ['Pollen carries the male gametophyte', 2],
    ],
    explanation:
      'Bryophytes are nonvascular with a conspicuous gametophyte, ferns are vascular spore-dispersers, and seed plants use pollen and seeds.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Monocots and eudicots',
    image: 'bot-monocot-dicot',
    caption:
      'Common patterns: **monocots** have one cotyledon, parallel veins, scattered bundles, parts in threes; **eudicots** two cotyledons, netted veins, a ring of bundles, parts in fours or fives.',
    bullets: [
      'These are ==patterns with exceptions==.',
      'Traditional “dicots” are broader than the **eudicot** clade.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: combine the traits',
    problem:
      'A specimen has parallel venation, floral parts in threes, and scattered stem bundles. Identify the supported group.',
    steps: [
      'Each feature is ==commonly associated with monocots==.',
      'The ==combined evidence== is stronger than any single trait.',
      'State the interpretation while recognizing exceptions and specimen context.',
    ],
    conclusion: 'The observations support a **monocot** classification.',
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which observations point toward a eudicot? Select all that apply.',
    options: [
      'Two cotyledons',
      'Netted leaf venation',
      'Flower parts in fives',
      'Scattered stem vascular bundles',
    ],
    answers: [0, 1, 2],
    explanation:
      'Two cotyledons, netted veins, and parts in fours or fives are eudicot patterns; scattered bundles are a monocot pattern.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Woody and herbaceous forms',
    bullets: [
      '**Woodiness** reflects ==secondary tissues and persistent growth==, not a separate lineage.',
      'Woody and herbaceous forms occur in many groups.',
      'A thick stem is not necessarily wood; a young woody plant can look soft.',
      'Move from observable traits to a ==supported group with stated uncertainty==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A student says “trees” form one evolutionary group. What is the best response?',
    options: [
      'Woodiness evolved in several lineages, so trees are a growth form, not one clade',
      'Correct, all trees share one woody ancestor',
      'Only conifers are trees',
      'Trees are defined by having fruit',
    ],
    answer: 0,
    explanation:
      'Woody growth comes from secondary tissues and appears across gymnosperms and many angiosperm lineages.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Bryophyte', back: 'Member of a nonvascular land-plant lineage.' },
      { front: 'Vascular plant', back: 'Plant with specialized lignified transport tissues.' },
      { front: 'Gymnosperm', back: 'Seed plant with ovules not enclosed in an ovary.' },
      { front: 'Eudicot', back: 'Angiosperm lineage often with two cotyledons.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Bryophytes**: nonvascular, dominant gametophyte, ==water for sperm==.',
      '**Ferns**: vascular sporophyte, ==spores not seeds==.',
      '**Gymnosperms** expose ovules; **angiosperms** enclose them in an ovary.',
      'Identify with ==several traits together==, and name the framework.',
    ],
  },
]);

const photosynthesis = defineDeck('bot-u7-l1', [
  {
    kind: 'title',
    title: 'Photosynthesis, carbon fixation, and plant biochemistry',
    subtitle: 'Light reactions, the Calvin cycle, C3, C4, and CAM, and reading a response curve.',
    objectives: [
      'Separate **light reactions** from **carbon fixation**.',
      'Explain **C3**, **C4**, and **CAM** strategies.',
      'Interpret **light-response** and net-assimilation curves.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: where does the O₂ released in photosynthesis come from?',
    options: ['CO₂', 'Water', 'Glucose', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Energy and carbon are different inputs',
    bullets: [
      '==Light supplies energy==; **CO₂ supplies carbon** atoms for fixation.',
      'Water supplies electrons, and the ==released O₂ comes from water==, not CO₂.',
      'The overall equation summarizes many steps; glucose does not appear in one step.',
      'Products feed respiration, growth, storage, and many other compounds.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each input of photosynthesis to what it supplies.',
    pairs: [
      ['Light', 'Energy'],
      ['CO₂', 'Carbon atoms'],
      ['Water', 'Electrons and the released O₂'],
    ],
    explanation:
      'Light powers the process, CO₂ provides carbon, and water is split for electrons, releasing O₂.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Light reactions',
    image: 'bot-thylakoid',
    caption:
      'In the thylakoid membrane, **PSII** splits water, electrons flow to **PSI** and ==NADPH==, and the ==proton gradient drives ATP synthase==.',
    bullets: [
      'Water splitting replaces electrons and releases **O₂**.',
      'More light does not give unlimited ATP: capacity, photoprotection, and CO₂ supply limit it.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the noncyclic electron path in the light reactions.',
    items: [
      'Water is split at photosystem II',
      'Electrons pass through the cytochrome complex',
      'Photosystem I re-energizes them',
      'NADP⁺ is reduced to NADPH',
    ],
    explanation:
      'Electrons from water move PSII → cytochrome b6f → PSI → NADP⁺, while pumped protons drive ATP synthase.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The Calvin cycle',
    image: 'bot-calvin',
    caption:
      'Three stages: ==fixation== of CO₂ by **RuBisCO**, ==reduction== with ATP and NADPH, and ==regeneration== of RuBP.',
    bullets: [
      'RuBisCO can also react with O₂, causing **photorespiration**.',
      '“Dark reactions” misleads: the cycle ==depends on light-made ATP and NADPH==.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each molecule to its role in the Calvin cycle.',
    pairs: [
      ['RuBisCO', 'Enzyme that fixes CO₂'],
      ['RuBP', 'Five-carbon acceptor that is regenerated'],
      ['NADPH', 'Supplies electrons for reduction'],
      ['G3P', 'Three-carbon sugar product'],
    ],
    explanation:
      'RuBisCO adds CO₂ to RuBP; ATP and NADPH reduce the product to G3P, and some G3P rebuilds RuBP.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'C3, C4, and CAM',
    columns: ['Pathway', 'How CO₂ is handled', 'Tradeoff'],
    rows: [
      ['**C3**', 'RuBisCO fixes CO₂ directly', 'Simple, but ==photorespiration in heat=='],
      [
        '**C4**',
        'Concentrates CO₂ by ==separating steps in space==',
        'Extra ATP cost; strong in hot, bright sites',
      ],
      [
        '**CAM**',
        'Opens stomata at night; ==separates steps in time==',
        'Saves water; usually slower growth',
      ],
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which strategy does each describe?',
    bins: ['C3', 'C4', 'CAM'],
    items: [
      ['Stomata open mainly at night', 2],
      ['Bundle-sheath cells hold the Calvin cycle', 1],
      ['First stable product is a three-carbon acid made by RuBisCO', 0],
      ['Common in succulents such as pineapple and cacti', 2],
      ['Maize and sugarcane', 1],
    ],
    explanation:
      'CAM separates uptake by time, C4 separates fixation by tissue, and C3 fixes CO₂ directly with RuBisCO.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Net gas exchange and limiting factors',
    bullets: [
      '**Net assimilation** = fixation − CO₂ release under the measured conditions.',
      'At low light, more light raises net assimilation; at high light ==another factor limits==.',
      'The **compensation point** is where the net balance is zero.',
      'A plateau ==does not by itself prove== which enzyme limits.',
    ],
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: net carbon gain',
    problem:
      'A leaf fixes 12 relative carbon units and releases 4 through respiration. What is the net gain?',
    steps: [
      'Keep the ==same interval and measurement basis==.',
      'Net gain = 12 − 4 = **8 units**.',
      'More light may not raise gain if ==CO₂ supply or water== becomes limiting.',
    ],
    conclusion: 'Net gain is 8 units in this simplified balance.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A leaf fixes 30 relative carbon units and respires 9 over the same interval. What is its net carbon gain?',
    answer: 21,
    tolerance: 0,
    unit: 'units',
    explanation: 'Net gain = fixation − release = 30 − 9 = 21 units.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Using a response curve',
    bullets: [
      'Read the ==x-axis stimulus and y-axis outcome== before explaining shape.',
      'A **saturating** curve fits limited processing capacity with other factors fixed.',
      'Compare **replicates** and uncertainty before claiming a treatment difference.',
      'Design measurements that separate ==stomatal from biochemical limits==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A light-response curve levels off at high light. Which next step best tests whether CO₂ supply is the limit?',
    options: [
      'Raise CO₂ around the leaf at high light and see whether assimilation rises',
      'Add even more light',
      'Conclude RuBisCO is broken',
      'Measure leaf color',
    ],
    answer: 0,
    explanation:
      'If assimilation rises with more CO₂ at saturating light, CO₂ supply was limiting rather than light.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Photosystem', back: 'Pigment-protein complex in light-driven electron transfer.' },
      { front: 'Calvin cycle', back: 'Carbon fixation, reduction, and RuBP regeneration.' },
      { front: 'Photorespiration', back: 'Costly pathway after RuBisCO reacts with O₂.' },
      { front: 'Compensation point', back: 'Condition where net CO₂ exchange is zero.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Light reactions make ==ATP and NADPH==; O₂ comes from water.',
      'The **Calvin cycle** fixes, reduces, and regenerates, using light-made carriers.',
      '**C4** separates steps in space; **CAM** in time.',
      'A plateau shows ==some factor limits==; test which one.',
    ],
  },
]);

const evolution = defineDeck('bot-u8-l1', [
  {
    kind: 'title',
    title: 'Plant evolution, fossils, and diversity',
    subtitle: 'Reading branching trees, the move onto land, and what fossils can and cannot say.',
    objectives: [
      'Interpret **branching evolutionary diagrams**.',
      'Connect **innovations** to environmental challenges.',
      'Evaluate **fossil** and modern evidence together.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: are living mosses the ancestors of flowering plants?',
    options: ['Yes', 'No', 'Some of them', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Evolution is branching',
    bullets: [
      'A tree shows ==relationships, not a ladder== from inferior to superior.',
      'Living mosses are ==modern branches==, not unchanged ancestors.',
      'A **node** is a common ancestor; rotating branches ==does not change relationships==.',
      'Traits can be gained, lost, or evolve by **convergence**.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: shared ancestry',
    problem:
      'Two modern lineages share a vascular ancestor. Must one living lineage be the ancestor of the other?',
    steps: [
      'Locate their ==common ancestral node==.',
      'Both are ==modern branches== descended from it.',
      'Use branching order and traits to describe how they relate.',
    ],
    conclusion: 'Shared ancestry does ==not make one living branch the ancestor== of the other.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'On a tree, ferns are drawn next to flowering plants and far from mosses. What does the closeness on the page show?',
    options: [
      'Nothing by itself; relationships come from branching order',
      'Ferns are flowering plants',
      'Mosses are the oldest living plants',
      'Ferns evolved from flowering plants',
    ],
    answer: 0,
    explanation:
      'Branches can rotate around a node, so label position is arbitrary; read shared nodes instead.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Challenges on land',
    bullets: [
      'Life on land meant ==desiccation, support, transport, gas exchange, and reproduction== problems.',
      '**Protected embryos**, **cuticles**, **stomata**, **vascular tissue**, **pollen**, and **seeds** each addressed part.',
      '==No one innovation solves everything==.',
      'A cuticle saves water but blocks gas, so stomata regulate the tradeoff.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each innovation to the land challenge it helped address.',
    pairs: [
      ['Cuticle', 'Water loss from surfaces'],
      ['Lignified vascular tissue', 'Support and long-distance transport'],
      ['Pollen', 'Sperm transfer without a water film'],
      ['Seed', 'Protecting and provisioning the embryo'],
    ],
    explanation:
      'Each trait solved part of the terrestrial problem, often with a cost such as restricted gas exchange.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Fossil evidence',
    image: 'bot-rhynie',
    caption:
      '**Rhynie chert**: about 400-million-year-old land plants such as *Rhynia*, ==preserved in silica down to their cells==.',
    bullets: [
      'Fossils preserve impressions, mineralized tissue, pollen, spores, or wood.',
      'Preservation is selective: ==absence of evidence is not evidence of absence==.',
      'The ==oldest known fossil== is not the exact time of origin.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'No fossils of a plant group are found in rocks older than 130 million years. What is the best conclusion?',
    options: [
      'The group is at least 130 million years old; it may have arisen earlier',
      'The group arose exactly 130 million years ago',
      'The group never existed before then anywhere',
      'Older rocks contain no fossils at all',
    ],
    answer: 0,
    explanation:
      'The oldest known fossil sets a minimum age; selective preservation means origins can predate the record.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Paleobotanical reconstruction',
    image: 'bot-pollen',
    caption:
      'Pollen grains of several species differ in shape and surface, so ==fossil pollen can be identified== to plant groups.',
    bullets: [
      'Combine **stratigraphy**, dating, anatomy, and associated sediments.',
      'Pollen is produced, dispersed, and preserved unevenly, so ==abundance ≠ vegetation share==.',
      'Test interpretations with modern reference collections.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Pine pollen makes up 60% of grains in a lake core. What is the best conclusion?',
    options: [
      'Pines were present nearby, but their share of vegetation needs correcting for production and dispersal',
      'Exactly 60% of local plants were pines',
      'No other trees grew there',
      'The core is too young to contain pollen',
    ],
    answer: 0,
    explanation:
      'Wind-pollinated pines make and spread huge amounts of pollen, so their grains overstate their share of standing vegetation.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Diversity and resilience',
    bullets: [
      'Diversity is ==genetic, species, and functional==.',
      'Different traits can support complementary resource use or disturbance responses.',
      'A **species count** alone hides abundance and function.',
      'Judge conservation claims by ==explicit outcomes==, not assumed resistance.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Two meadows each have 20 species. In one, a single grass makes up 90% of the plants. What does the species count miss?',
    options: [
      'How evenly abundance is spread among species',
      'Nothing; the meadows are equally diverse',
      'The number of species',
      'Whether plants are present',
    ],
    answer: 0,
    explanation:
      'Richness alone hides evenness and functional differences, which affect how a community responds to stress.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing evolutionary explanations',
    bullets: [
      'A functional story is a ==hypothesis, not proof== of historical selection.',
      '**Homology**: similarity from shared ancestry. **Convergence**: similar traits evolved independently.',
      'Use comparative data, fossils, genetics, and experiments.',
      'Keep ==current function== separate from ==how a trait arose==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each similarity more likely homology or convergence?',
    bins: ['Homology', 'Convergence'],
    items: [
      ['Succulent stems in American cacti and African euphorbias', 1],
      ['Vascular tissue shared by ferns and seed plants', 0],
      ['Seeds in pines and in flowering plants', 0],
      ['CAM photosynthesis arising in many unrelated families', 1],
    ],
    explanation:
      'Shared vascular tissue and seeds trace to common ancestors; succulence and CAM evolved repeatedly in distant lineages.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Clade', back: 'An ancestor and all its descendants.' },
      { front: 'Homology', back: 'Similarity due to shared ancestry.' },
      { front: 'Convergence', back: 'Independent evolution of similar traits.' },
      { front: 'Paleobotany', back: 'Study of fossil plants and past vegetation.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Trees show ==branching relationships==, not a ladder.',
      'Land innovations each solved part of the problem, with ==tradeoffs==.',
      'Fossil records are ==selective==; oldest find ≠ origin.',
      'Separate **homology** from **convergence**, and function from history.',
    ],
  },
]);

const ecology = defineDeck('bot-u9-l1', [
  {
    kind: 'title',
    title: 'Plant ecology, nutrient deficiencies, and disease',
    subtitle: 'Competition, tradeoffs, symptom patterns, and testing competing diagnoses.',
    objectives: [
      'Explain **resource competition** and environmental adaptation.',
      'Distinguish **nutrient deficiency** from **infection**.',
      'Design comparisons that ==test competing causes==.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: a plant’s lower leaves are yellow. What would you check first?',
    options: ['Soil nutrients', 'Watering history', 'Signs of a pathogen', 'The plant’s age'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Communities and competition',
    bullets: [
      'Plants compete for ==light, water, nutrients, and space==.',
      'Competition is ==often asymmetric==: a tall plant shades neighbors.',
      '**Facilitation**: one plant can improve conditions for another.',
      'Describe the ==measured interaction and resource==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A nurse shrub shades a desert seedling, and the seedling survives better under it than in the open. What interaction is this?',
    options: ['Facilitation', 'Competition for light', 'Parasitism', 'Herbivory'],
    answer: 0,
    explanation:
      'The shrub improves conditions for the seedling, such as lower heat and water loss, which is facilitation.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Adaptations and tradeoffs',
    bullets: [
      'Drought traits ==cut water loss or improve storage and uptake==.',
      'Flood traits improve **internal aeration** for low-oxygen roots.',
      'Sun and shade leaves differ in structure and physiology.',
      'Avoid “better adapted” without naming the ==environment and outcome==.',
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each trait to the challenge it addresses.',
    pairs: [
      ['Aerenchyma (air channels) in roots', 'Flooded, low-oxygen soil'],
      ['Thick, waxy leaves', 'Drought'],
      ['Large, thin leaves', 'Deep shade'],
      ['Deep taproot', 'Water far below the surface'],
    ],
    explanation:
      'Each trait helps in one environment and costs something elsewhere, such as large thin leaves losing water in sun.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Nutrients and symptom patterns',
    bullets: [
      '**Mobile nutrients** (such as N) move from old leaves, so ==older leaves show symptoms first==.',
      '**Immobile nutrients** (such as Ca) affect ==new growth first==.',
      'Yellowing can also come from pH-limited availability or root damage.',
      'Visual symptoms are ==not a unique test==; use tissue or soil data and treatments.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: is it deficiency?',
    problem:
      'Older leaves yellow first, but the soil is dry and no tissue analysis exists. Is a deficiency established?',
    steps: [
      'The age pattern ==fits some mobile-nutrient deficiencies==.',
      '==Dryness and other causes== remain plausible.',
      'Measure water status and nutrients, or run controlled comparisons.',
    ],
    conclusion: 'The symptom supports hypotheses but ==does not uniquely diagnose== a deficiency.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'New leaves at the shoot tip are distorted, while older leaves look normal. Which deficiency type fits best?',
    options: [
      'An immobile nutrient, such as calcium',
      'A mobile nutrient, such as nitrogen',
      'Any nutrient equally',
      'None; this pattern rules out nutrients',
    ],
    answer: 0,
    explanation:
      'Immobile nutrients cannot be moved from old tissue, so new growth shows symptoms first; still confirm with tests.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Infection and environmental injury',
    image: 'bot-leaf-spot',
    caption:
      'Gray leaf spot on corn: the tan lesions are ==symptoms==; the fungus *Cercospora zeae-maydis* is the cause.',
    bullets: [
      'A **symptom** is the plant’s response; a **sign** is ==direct evidence of the agent==.',
      'Abiotic injury: drought, salinity, temperature, chemicals, damage.',
      'A detected pathogen is ==not automatically the cause== of every injury.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each observation a symptom or a sign?',
    bins: ['Symptom', 'Sign'],
    items: [
      ['Wilting leaves', 0],
      ['Fungal spores visible on a lesion', 1],
      ['Yellow halo around a spot', 0],
      ['Bacterial ooze from a cut stem', 1],
      ['Stunted growth', 0],
    ],
    explanation:
      'Symptoms are the plant’s responses; signs are the pathogen itself or its structures and products.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Plants in energy and nutrient cycles',
    image: 'bot-nitrogen-cycle',
    caption:
      'The nitrogen cycle: ==microbes fix, convert, and release== nitrogen; plants assimilate it as ammonium or nitrate.',
    bullets: [
      '**Decomposition** returns nutrients from dead material.',
      '==Energy flows and dissipates==; matter cycles among reservoirs.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Nitrogen fixation is microbial',
    bullets: [
      '**Nitrogen fixation** is done by particular microbes, ==not by plants themselves==.',
      'In legumes, **rhizobia** live inside **root nodules**.',
      'A legume’s benefit depends on the ==right partners and conditions==.',
    ],
    image: 'bot-nodules',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Who actually fixes atmospheric N₂ in a bean plant’s root nodules?',
    options: [
      'Rhizobium bacteria living in the nodules',
      'The bean’s leaf cells',
      'Soil fungi on the leaves',
      'Decomposers in leaf litter',
    ],
    answer: 0,
    explanation: 'Symbiotic rhizobia fix N₂ inside nodules; the plant supplies sugars in return.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing competing diagnoses',
    bullets: [
      'For yellowing, list ==nutrients, water stress, infection, and senescence==.',
      'Name what would differ: tissue levels, moisture history, pathogen evidence, age pattern.',
      'Use comparable plants and ==controls==.',
      'Changing several treatments at once ==hides which one worked==.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt:
      'A grower adds fertilizer, fungicide, and extra water at once, and the plants recover. What can they conclude? Select all that apply.',
    options: [
      'At least one change, or their combination, helped',
      'They cannot tell which factor caused the yellowing',
      'A follow-up should change one factor at a time with controls',
      'The cause was a fungus',
    ],
    answers: [0, 1, 2],
    explanation:
      'Changing three factors together confounds them; single-factor comparisons with controls are needed to identify a cause.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Symptom', back: 'Plant response to injury or disease.' },
      { front: 'Sign', back: 'Visible evidence of a causal organism.' },
      { front: 'Nutrient mobility', back: 'Ability to redistribute a nutrient within the plant.' },
      { front: 'Facilitation', back: 'Interaction improving another organism’s conditions.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Competition is often asymmetric; **facilitation** also occurs.',
      '==Mobile nutrients: old leaves first; immobile: new growth first.==',
      'Separate **symptoms** from **signs**; a pathogen present is not proof of cause.',
      'Test competing diagnoses ==one factor at a time==.',
    ],
  },
]);

const applied = defineDeck('bot-u10-l1', [
  {
    kind: 'title',
    title: 'Horticulture, aquatic systems, medicine, and materials',
    subtitle:
      'Applying plant mechanisms to cultivation, propagation, medicine, and materials, and judging the claims.',
    objectives: [
      'Connect **cultivation decisions** to plant mechanisms.',
      'Distinguish **hydroponics**, **aquatic plants**, and **aquaculture**.',
      'Evaluate **medicinal** and **material** claims using evidence.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: does “natural” mean a plant remedy is safe?',
    options: ['Yes', 'No', 'Usually', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Horticulture as controlled management',
    bullets: [
      '**Horticulture** applies plant biology to cultivation, propagation, and quality.',
      'Light, water, nutrients, temperature, substrate, and stage ==interact==.',
      '==More fertilizer or water is not always better==: salinity, low oxygen, runoff.',
      'Define the ==outcome first==, and use replicated comparisons.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A grower doubles fertilizer and the plants’ leaf edges brown. What is a likely cause?',
    options: [
      'Salt buildup from excess fertilizer damaging roots and leaves',
      'Too few nutrients',
      'Fertilizer always improves growth',
      'The plants are flowering',
    ],
    answer: 0,
    explanation:
      'Excess fertilizer raises salinity, lowering soil water potential and burning leaf margins.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Hydroponics and aquatic contexts',
    image: 'bot-hydroponics',
    caption: 'Hydroponics at NASA: roots sit in ==aerated nutrient solution== instead of soil.',
    bullets: [
      'Roots still need the right ==water, ions, and oxygen==.',
      '**Aquatic plants** have their own adaptations to submerged or floating life.',
      '**Aquaculture** farms aquatic organisms; it is ==not a synonym for hydroponics==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Hydroponic lettuce wilts and its roots turn brown, even though the solution has plenty of nutrients. What is the most likely problem?',
    options: [
      'The roots lack oxygen in poorly aerated solution',
      'Hydroponic plants need no oxygen',
      'There is too little water',
      'Lettuce cannot grow without soil',
    ],
    answer: 0,
    explanation:
      'Roots respire and need dissolved oxygen; stagnant solution suffocates them even when nutrients are ample.',
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Propagation choices',
    columns: ['', 'Sexual (seed)', 'Vegetative (clonal)'],
    rows: [
      ['Offspring', '==Genetically varied==', '==Closely preserve== the selected genotype'],
      ['Strength', 'Variation for breeding and adaptation', 'Uniform, predictable traits'],
      ['Risk', 'Traits may not come true', 'Shared vulnerability to one pest or disease'],
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Grafting and propagation plans',
    bullets: [
      '**Grafting** joins parts with ==distinct genetic identities==; it does not make every cell identical.',
      'Success depends on compatibility, developmental state, and conditions.',
      'A plan names the ==trait to preserve, the method, and how success is measured==.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each method produce clonal or genetically varied offspring?',
    bins: ['Clonal', 'Genetically varied'],
    items: [
      ['Stem cuttings', 0],
      ['Planting seeds from a cross', 1],
      ['Tissue culture of one plant', 0],
      ['Dividing a clump of bulbs', 0],
      ['Open-pollinated seed', 1],
    ],
    explanation:
      'Cuttings, tissue culture, and division keep one genotype; seed from sexual reproduction recombines alleles.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Plants and medicine',
    image: 'bot-yew',
    caption:
      'The Pacific yew’s bark yielded **paclitaxel (Taxol)**, now a cancer drug, after ==decades of chemistry and clinical trials==.',
    bullets: [
      'Plant compounds evolved for ==defense and signaling==.',
      '==Natural origin does not establish safety or effectiveness==.',
      'Evidence must match the compound, dose, outcome, and study design.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'A plant extract kills cancer cells in a dish. What does that show?',
    options: [
      'A biochemical activity worth testing, not a proven treatment for patients',
      'The extract cures cancer',
      'The plant is safe to eat in any amount',
      'Clinical trials are unnecessary',
    ],
    answer: 0,
    explanation:
      'Lab activity must still be tested for dose, safety, and benefit in appropriate clinical studies.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Materials and environmental management',
    bullets: [
      'Fibers, wood, oils, resins, and starches reflect ==plant anatomy and chemistry==.',
      'Performance depends on composition, processing, moisture, and structure.',
      '**Phytoremediation** can take up contaminants but ==creates disposal and food-chain issues==.',
      'A green site is ==not automatically restored function==.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt:
      'Plants grown to absorb lead from a contaminated lot are thriving. Which follow-up questions matter? Select all that apply.',
    options: [
      'How will the lead-laden plants be disposed of?',
      'Could animals eat them and move lead up the food chain?',
      'Has soil lead actually fallen?',
      'None; green growth proves the site is restored',
    ],
    answers: [0, 1, 2],
    explanation:
      'Phytoremediation moves contaminants into plants, so disposal, food-chain exposure, and soil data all matter.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Designing an applied evaluation',
    bullets: [
      'State the ==decision, comparison, outcomes, timescale, and tradeoffs==.',
      'For irrigation, compare **water use** and yield, not just leaf color.',
      'Record conditions and ==independent plant units==.',
      'Change one factor at a time when isolating its effect.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: two irrigation plans',
    problem:
      'Two irrigation treatments give the same growth index, but one uses twice the water. What else is needed?',
    steps: [
      'Compare ==water-use efficiency== under the measured conditions.',
      'Check replication, crop quality, soil effects, and whether the index predicts yield.',
      'Weigh ==long-term and environmental tradeoffs== before generalizing.',
    ],
    conclusion: 'Equal growth alone ==does not establish equal performance==.',
  },
  {
    kind: 'numeric',
    section: 5,
    prompt:
      'Plot A yields 12 kg using 400 L of water; plot B yields 12 kg using 800 L. What is plot A’s water-use efficiency in kg per 100 L?',
    answer: 3,
    tolerance: 0.01,
    unit: 'kg/100 L',
    explanation: '12 kg ÷ 400 L = 0.03 kg/L = 3 kg per 100 L, twice plot B’s 1.5.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Horticulture', back: 'Applied cultivation and management of plants.' },
      { front: 'Hydroponics', back: 'Growing plants in nutrient solution instead of soil.' },
      { front: 'Clonal propagation', back: 'Producing offspring that preserve one genotype.' },
      { front: 'Phytoremediation', back: 'Using plants to manage a defined contaminant.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Define the outcome before judging a ==cultivation treatment==.',
      'Hydroponic roots still need **oxygen**; aquaculture ≠ hydroponics.',
      'Clones are uniform but ==share vulnerabilities==.',
      '“Natural” is ==not evidence== of safety or benefit.',
    ],
  },
]);

export const botanyDecksApplied: Deck[] = [groups, photosynthesis, evolution, ecology, applied];
