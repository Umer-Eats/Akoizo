import { defineDeck, type Deck } from './presentation-types.ts';
import { crimeDecksEvidence } from './presentations-b-crime-busters-2.ts';

// Crime Busters (Division B) presentations, one per lesson, following presentations-anatomy.ts.
// Each deck follows its lesson in lessons-crime-busters.ts section by section (`section` is the
// lesson section index); decks for lessons 5–7 are in presentations-b-crime-busters-2.ts.

const powders = defineDeck('cb-u1-l1', [
  {
    kind: 'title',
    title: 'Identifying white powders',
    subtitle:
      'Thirteen white solids, a few simple tests, and ==a testing order that saves your sample==.',
    objectives: [
      'Describe the **appearance** and **solubility** of the listed solids.',
      'Use **water**, **HCl**, and **iodine** tests to tell powders apart.',
      'Plan a testing sequence that **conserves samples**.',
    ],
    image: 'for-evidence',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which white powder from your kitchen do you think is hardest to identify?',
    options: ['Salt', 'Sugar', 'Baking soda', 'Flour or cornstarch'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'The solids list',
    bullets: [
      'Unknowns come from a **fixed list**: sodium acetate, yeast, vitamin C, calcium carbonate, salt, sugar, flour, gypsum, cornstarch, baking soda, gelatin, Alka-Seltzer, and white sand.',
      'Some solids can appear in **mixtures**.',
      'Every team gets the same unknowns, so ==careful observation and a consistent testing order== win.',
      'Record every result in a **table** as you go.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Look, feel, and smell first',
    bullets: [
      'Start with tests that use **no sample**: a hand lens, touch, and smell.',
      '**Salt** forms clear cubes; **sugar** forms clear, irregular crystals; **sand** is hard grains.',
      '**Flour** and **cornstarch** are very fine; ==cornstarch squeaks when pressed==.',
      '**Yeast** is tan granules that smell like bread; **sodium acetate** may smell faintly of vinegar.',
    ],
    callout: '**Waft** odors toward your nose with your hand; never sniff a container directly.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each observation to the solid it suggests.',
    pairs: [
      ['Clear cubic crystals', 'Table salt'],
      ['Tan granules with a bread-like smell', 'Yeast'],
      ['Very fine white powder that squeaks', 'Cornstarch'],
      ['Hard, rounded or angular grains', 'White sand'],
    ],
    explanation:
      'Hand-lens and touch observations cost no sample: salt cubes, yeast’s smell, cornstarch’s squeak, and sand’s hard grains are all quick clues.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Water solubility',
    image: 'mp-alka',
    caption:
      'An **Alka-Seltzer** tablet fizzing in water: it contains both an acid and baking soda, so it ==fizzes all by itself==.',
    bullets: [
      '**Dissolve readily**: salt, sugar, baking soda, sodium acetate, and vitamin C.',
      '**Do not dissolve well**: calcium carbonate, sand, gypsum, flour, and cornstarch.',
      '**Gelatin** swells, dissolves well only in warm water, and can gel as it cools.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'What happens when each solid is stirred into room-temperature water?',
    bins: ['Dissolves', 'Does not dissolve well', 'Dissolves and fizzes'],
    items: [
      ['Table salt', 0],
      ['Calcium carbonate', 1],
      ['Alka-Seltzer', 2],
      ['Sugar', 0],
      ['White sand', 1],
      ['Cornstarch', 1],
      ['Vitamin C', 0],
    ],
    explanation:
      'Salt, sugar, and vitamin C dissolve; calcium carbonate, sand, and cornstarch stay cloudy or settle; Alka-Seltzer dissolves and fizzes because it carries its own acid and baking soda.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Hydrochloric acid test',
    image: 'mp-vinegar',
    caption:
      'Baking soda foaming with vinegar: an acid releases **carbon dioxide** from a **carbonate**, just as 1 M HCl does at the event.',
    bullets: [
      '**Calcium carbonate** and **baking soda** both ==fizz strongly== with HCl.',
      '**Sodium acetate** gives a vinegar smell (acetic acid) but **no fizzing**.',
      'Salt, sugar, sand, gypsum, flour, and cornstarch show **no visible reaction**.',
      'Use only **a few drops** of acid on a **tiny** sample.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Two powders both fizz strongly with HCl. How can you tell baking soda from calcium carbonate?',
    options: [
      'Smell them',
      'Test which one dissolves in water',
      'Add iodine to both',
      'You cannot tell them apart',
    ],
    answer: 1,
    explanation:
      'Both are carbonates, but baking soda dissolves in water while calcium carbonate does not.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Iodine test',
    image: 'for-iodine-starch',
    caption:
      'Iodine on a cut apple: the **starch**-rich flesh turns ==blue-black==, the same result flour and cornstarch give.',
    bullets: [
      '**Flour** and **cornstarch** turn iodine **blue-black** because they contain starch.',
      '**Vitamin C** is a **reducing agent**: it turns brown iodine ==colorless==.',
      'Most other solids leave iodine its normal **yellow-brown**.',
      'Flour versus cornstarch: cornstarch is pure white, very fine, and squeaks; flour is off-white and slightly gritty.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'What color does iodine show with each solid?',
    bins: ['Blue-black', 'Colorless', 'Stays yellow-brown'],
    items: [
      ['Flour', 0],
      ['Vitamin C', 1],
      ['Cornstarch', 0],
      ['Table salt', 2],
      ['Baking soda', 2],
      ['Sugar', 2],
    ],
    explanation:
      'Starch (flour, cornstarch) turns iodine blue-black, vitamin C removes the color, and the others leave it yellow-brown.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: an insoluble fizzing powder',
    problem:
      'An unknown white powder is **insoluble** in water, **fizzes strongly** with HCl, and leaves iodine **yellow-brown**.',
    steps: [
      'Fizzing with HCl means a **carbonate**: calcium carbonate or baking soda.',
      'Baking soda **dissolves** in water, but this powder does not.',
      'The iodine result **rules out starch**.',
    ],
    conclusion: 'The powder is ==calcium carbonate== (powdered limestone).',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Testing mixtures efficiently',
    bullets: [
      'The scenario tells you **how many** materials a mixture contains.',
      '**Dissolve** the mixture, then **filter or decant**; test the dissolved part and the solid part separately.',
      'Look for **two results in one sample**: fizzing plus blue-black iodine suggests ==a carbonate mixed with a starch==.',
      'Use a **spot plate** and tiny samples, so material is left to confirm your answer.',
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put a sample-saving testing sequence in order.',
    items: [
      'Observe with a hand lens, touch, and smell',
      'Test a tiny amount in water',
      'Add a few drops of HCl to a small sample',
      'Add iodine to a small sample',
      'Confirm the identity with a remaining sample',
    ],
    explanation:
      'Free observations come first, then the reagent tests from simplest to more specific, keeping some sample to confirm.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the reagent summary.',
    text: 'Carbonates {0} with hydrochloric acid. Starch turns iodine {1}. Vitamin C turns iodine {2}.',
    blanks: ['fizz', 'blue-black', 'colorless'],
    distractors: ['melt', 'green', 'red'],
    explanation:
      'Carbonates release carbon dioxide bubbles with acid, starch gives the blue-black iodine color, and vitamin C removes iodine’s color.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Start with **look, feel, and smell**, and always **waft**.',
      '**Water** splits soluble from insoluble; **HCl** finds **carbonates**; **iodine** finds **starch** and **vitamin C**.',
      'Baking soda and calcium carbonate both fizz, but ==only baking soda dissolves==.',
      'Separate **mixtures** and use **tiny samples** on a spot plate.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'An unknown mixture of two solids fizzes with HCl and turns iodine blue-black. Describe how you would identify both solids.',
    model:
      'Fizzing means a carbonate and blue-black iodine means a starch. I would stir the mixture in water and filter it. If the carbonate dissolved, it is baking soda; if it stayed in the solid with the starch, it is calcium carbonate. Then I would tell flour from cornstarch by color, fineness, and squeak.',
  },
]);

const metalsLiquids = defineDeck('cb-u2-l1', [
  {
    kind: 'title',
    title: 'Metals and liquids',
    subtitle:
      'Color, magnets, acid, density, odor, and pH: ==combine clues until only one answer fits==.',
    objectives: [
      'Identify the six listed **metals** by color, magnetism, and reaction with acid.',
      'Identify the six listed **liquids** using odor, **pH**, and simple reactions.',
      'Explain the chemistry behind each key test.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which metal do you think a magnet will pick up?',
    options: ['Aluminum', 'Copper', 'Iron', 'All of them'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Metal appearance and magnetism',
    image: 'rock-copper',
    bullets: [
      'The listed metals: **aluminum**, **iron**, **zinc**, **magnesium**, **copper**, and **tin**.',
      '**Copper** is easy: it is ==reddish-orange==.',
      'Aluminum is light, dull silver; magnesium is a silvery ribbon that tarnishes gray; zinc is bluish gray; tin is shiny and soft; iron is gray.',
      '**Only iron** is attracted to a magnet.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A gray metal sticks to a magnet. Which listed metal is it?',
    options: ['Zinc', 'Tin', 'Iron', 'Magnesium'],
    answer: 2,
    explanation: 'Of the six listed metals, only iron is attracted to a magnet.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Metals with hydrochloric acid',
    bullets: [
      'Many metals react with HCl to make **hydrogen gas** and a metal chloride.',
      'Reactivity follows the **activity series**.',
      '**Magnesium**: vigorous, rapid bubbling. **Zinc**: steady bubbling. **Iron** and **tin**: slow.',
      '**Aluminum** starts slowly because its **oxide layer** must be removed, then speeds up.',
      '**Copper** is below hydrogen in the series and ==does not react== with HCl.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order these metals from fastest to slowest reaction with hydrochloric acid.',
    items: ['Magnesium', 'Zinc', 'Iron', 'Copper'],
    explanation:
      'Magnesium bubbles vigorously, zinc steadily, iron slowly, and copper does not react at all.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Density and other clues',
    bullets: [
      'Light metals: **magnesium** about 1.7 g/cm³ and **aluminum** about 2.7 g/cm³.',
      'Heavier: **zinc**, **tin**, and **iron** about 7–8 g/cm³; **copper** about 9 g/cm³.',
      'Measure **mass** on a balance and **volume** by **water displacement**, then divide.',
      '==Combining color, magnetism, reaction rate, and density== settles look-alike metals.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A silvery metal has a mass of 13.5 g. It raises the water in a graduated cylinder by 5.0 mL. What is its density, in g/cm³?',
    answer: 2.7,
    tolerance: 0.05,
    unit: 'g/cm³',
    explanation:
      'Volume is 5.0 mL, which is 5.0 cm³. Density = 13.5 g ÷ 5.0 cm³ = 2.7 g/cm³, which fits aluminum.',
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: a light, reactive metal',
    problem:
      'A silvery metal is **not magnetic**, reacts **vigorously** with HCl, and has a density of about **1.7 g/cm³**.',
    steps: [
      'Not magnetic **rules out iron**.',
      'A vigorous reaction with HCl points to a **very reactive** metal.',
      'A density near 1.7 g/cm³ is much **lighter** than zinc or tin.',
    ],
    conclusion: 'The metal is ==magnesium==.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'The liquids list',
    bullets: [
      'The listed liquids: **lemon juice**, **rubbing alcohol** (isopropyl), **household ammonia** (3%), **water**, **vinegar**, and **3% hydrogen peroxide**.',
      'Many look like water, so ==tests matter more than looks==.',
      'Lemon juice is slightly cloudy and yellowish; vinegar smells sour.',
      'Isopropyl alcohol smells sharp and medicinal and evaporates quickly; ammonia smells strong and pungent.',
    ],
    callout: 'Waft gently, and never mix ammonia with other cleaners.',
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Sort each liquid by its pH group.',
    bins: ['Acidic (about pH 2–3)', 'Near neutral', 'Basic (about pH 11)'],
    items: [
      ['Vinegar', 0],
      ['Lemon juice', 0],
      ['Water', 1],
      ['Household ammonia', 2],
      ['Isopropyl alcohol', 1],
      ['3% hydrogen peroxide', 1],
    ],
    explanation:
      'Vinegar and lemon juice are acidic, ammonia is basic, and water, alcohol, and peroxide are near neutral or slightly acidic.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'pH testing',
    bullets: [
      'Use **pH paper** or an indicator: below 7 is **acidic**, above 7 is **basic**.',
      'pH splits the liquids into ==acid, neutral, and base groups==.',
      'Then **odor** separates vinegar from lemon juice, and alcohol from water.',
    ],
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Hydrogen peroxide and confirmation',
    image: 'mp-vinegar',
    caption:
      'Baking soda foaming in vinegar: ==acids fizz with baking soda==, while neutral liquids do not.',
    bullets: [
      '**Hydrogen peroxide** slowly breaks down into water and oxygen.',
      'Adding **yeast**, which contains the enzyme **catalase**, makes it bubble vigorously.',
      'That one test **identifies peroxide** and **confirms yeast** at the same time.',
      '**Isopropyl alcohol** evaporates far faster than water from a watch glass.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each confirming test to the liquid it identifies.',
    pairs: [
      ['Bubbles vigorously when yeast is added', 'Hydrogen peroxide'],
      ['Strong, pungent odor and pH about 11', 'Household ammonia'],
      ['Evaporates quickly from a watch glass', 'Isopropyl alcohol'],
      ['Sour smell, acidic, fizzes with baking soda', 'Vinegar'],
    ],
    explanation:
      'Catalase in yeast speeds peroxide breakdown, ammonia is the only base, alcohol evaporates fastest, and vinegar is a sour-smelling acid.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A piece of aluminum barely bubbles in HCl at first, then bubbles faster after a minute. Why?',
    options: [
      'The acid got stronger',
      'Its protective oxide layer had to be removed first',
      'Aluminum does not react with HCl',
      'It was actually copper',
    ],
    answer: 1,
    explanation:
      'Aluminum is coated with a thin oxide layer. Once the acid removes it, the metal underneath reacts more quickly.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**Copper** is reddish; **only iron** is magnetic.',
      'HCl reactivity: **magnesium** fastest, then zinc, then iron and tin; ==copper does not react==.',
      '**Density** (mass ÷ volume by displacement) separates light Mg and Al from heavy metals.',
      '**pH** groups the liquids; **odor**, **evaporation**, and **yeast** confirm them.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'Two clear liquids are both near neutral on pH paper. Describe two tests that would tell water from 3% hydrogen peroxide.',
    model:
      'First, I would add a pinch of yeast to each: hydrogen peroxide would bubble vigorously as catalase breaks it into water and oxygen, while water would not. Second, I could confirm by comparing with a known sample; water shows no bubbling at all.',
  },
]);

const hairFibers = defineDeck('cb-u3-l1', [
  {
    kind: 'title',
    title: 'Hair and fibers',
    subtitle:
      'Human, dog, or cat? Animal, plant, or plastic? ==The microscope tells the difference==.',
    objectives: [
      'Distinguish **human**, **dog**, and **cat** hair by **medulla** and **scales**.',
      'Classify fibers as **animal**, **vegetable**, or **synthetic**.',
      'Interpret provided **burn test** results.',
    ],
    image: 'for-hair-wool',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you ever looked at a hair under a microscope?',
    options: ['Yes, a human hair', 'Yes, a pet hair', 'No, never', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Hair structure',
    image: 'for-hair-follicle',
    caption:
      'A hair grows from a follicle; the shaft above the skin has ==three layers== you can see under a microscope.',
    bullets: [
      'The **cuticle** is the outer layer of overlapping scales.',
      'The **cortex** holds pigment granules that give color.',
      'The **medulla** is a central canal: continuous, fragmented, or absent.',
      'Crime Busters asks only for **human versus dog versus cat**; view at **100× to 400×**.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each hair layer to its description.',
    pairs: [
      ['Cuticle', 'Outer layer of overlapping scales'],
      ['Cortex', 'Middle layer holding pigment granules'],
      ['Medulla', 'Central canal of the hair'],
    ],
    explanation:
      'From outside in: cuticle scales, the pigmented cortex, and the medulla canal in the center.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Medulla index',
    bullets: [
      '**Medullary index** = medulla width ÷ whole hair width.',
      '**Human** hair: medulla absent or fragmented; when present, index ==less than about one-third==.',
      '**Animal** hair: wide, continuous medulla with an index of ==about one-half or more==.',
      'Wide and continuous suggests an animal; thin or absent suggests a human.',
    ],
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A hair is 80 micrometers wide and its medulla is 48 micrometers wide. What is the medullary index? Give a decimal.',
    answer: 0.6,
    tolerance: 0.01,
    explanation:
      'Medullary index = 48 ÷ 80 = 0.60. That is above one-half, which suggests an animal hair.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Telling dog from cat',
    image: 'for-hair-wool',
    caption:
      'Wool (top) beside a human hair (bottom): both have **cuticle scales**, but ==scale shape and size differ== by species.',
    bullets: [
      '**Cat**: pointed, spiky or petal-like scales; medulla like a **string of pearls**.',
      '**Dog**: flattened, wavy scales; wide, continuous medulla, often **ladder-like**.',
      '**Human**: flat, smooth scales that overlap like **shingles** (imbricate).',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: whose hair is it?',
    problem:
      'A hair has a **continuous medulla** about **60%** of the hair’s width and scales shaped like **petals**.',
    steps: [
      'A medullary index above one-half suggests an **animal** hair.',
      'Pointed, **petal-like** scales are typical of **cat** hair.',
      'Combine both features for the conclusion.',
    ],
    conclusion: 'The hair is ==most consistent with a cat==.',
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Which source does each hair feature point to?',
    bins: ['Human', 'Dog', 'Cat'],
    items: [
      ['Medulla absent or fragmented', 0],
      ['Medulla like a string of pearls', 2],
      ['Ladder-like continuous medulla', 1],
      ['Flat, smooth scales like shingles', 0],
      ['Pointed, petal-like scales', 2],
      ['Flattened, wavy scales', 1],
    ],
    explanation:
      'Human hair has a thin or missing medulla and smooth shingle scales; cat hair has pearl-string medullas and pointed scales; dog hair has ladder-like medullas and wavy scales.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Fiber categories',
    image: 'for-cotton',
    bullets: [
      '**Animal** fibers (wool, silk) are made of **protein**.',
      '**Vegetable** fibers (cotton, linen) are made of **cellulose** from plants.',
      '**Synthetic** fibers (nylon, polyester, acrylic) are petroleum-based polymers.',
      'Under a microscope: cotton is ==a flat, twisted ribbon==, wool shows scales, and synthetics are smooth, even rods.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Sort each fiber into its category.',
    bins: ['Animal', 'Vegetable', 'Synthetic'],
    items: [
      ['Wool', 0],
      ['Cotton', 1],
      ['Nylon', 2],
      ['Silk', 0],
      ['Linen', 1],
      ['Polyester', 2],
    ],
    explanation:
      'Wool and silk are animal protein, cotton and linen are plant cellulose, and nylon and polyester are synthetic polymers.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Burn test results (provided, not performed)',
    columns: ['Fiber type', 'How it burns', 'Smell and residue'],
    rows: [
      [
        '**Animal**',
        'Slowly, shrinks from flame, often self-extinguishes',
        'Burning hair; ==crushable black ash==',
      ],
      [
        '**Vegetable**',
        'Quickly, like paper, then glows',
        'Burning paper or leaves; **soft gray ash**',
      ],
      ['**Synthetic**', 'Melts, shrinks away, may drip', 'Chemical smell; ==hard bead=='],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Provided results say a fiber melted, dripped, smelled chemical, and left a hard bead. What type is it?',
    options: ['Animal', 'Vegetable', 'Synthetic', 'Cannot tell'],
    answer: 2,
    explanation: 'Melting, dripping, and a hard bead are the signature of a synthetic fiber.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Linking fibers to suspects',
    bullets: [
      'Fibers are **class evidence**: consistent with a source, rarely proof of one garment.',
      'Compare **color**, **diameter**, **shape**, and **category** with suspects’ clothing or pets.',
      'A dog hair on a victim points more toward a **dog owner** than a cat owner.',
      'Write ==“consistent with,” not “identical to,”== and combine with other evidence.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A dog hair is found on the victim. Suspect J owns a dog and suspect K owns a cat. What is the most careful conclusion?',
    options: [
      'The hair proves suspect J committed the crime',
      'The hair is consistent with suspect J’s dog, not suspect K’s cat',
      'The hair rules out every dog owner except J',
      'The hair tells us nothing',
    ],
    answer: 1,
    explanation:
      'Hair is class evidence. It points toward a dog owner like J, but many dogs could shed a similar hair, so it supports rather than proves.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Hair has a **cuticle**, **cortex**, and **medulla**.',
      'Medullary index under one-third suggests **human**; about one-half or more suggests ==an animal==.',
      'Cats: pearl-string medulla and pointed scales. Dogs: ladder medulla and wavy scales.',
      'Fibers are **animal** (protein), **vegetable** (cellulose), or **synthetic**; they are **class evidence**.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'A blue fiber at the scene is cotton. Suspect A wears a blue cotton shirt; suspect B wears a blue polyester jacket. Write two cautious sentences for your analysis.',
    model:
      'The scene fiber is a flat, twisted ribbon, so it is cotton, which is consistent with suspect A’s blue cotton shirt. It is not consistent with suspect B’s polyester jacket, though many blue cotton garments could also be the source.',
  },
]);

const plastics = defineDeck('cb-u4-l1', [
  {
    kind: 'title',
    title: 'Recyclable plastics',
    subtitle: 'Fragments rarely show their code, so ==float, sink, and observe== to identify them.',
    objectives: [
      'Name the listed plastics and their **resin codes**.',
      'Use **density** to separate plastics that float or sink.',
      'Interpret provided **burn** and other results.',
    ],
    image: 'wq-microplastics',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what number is in the recycling triangle on a plastic water bottle?',
    options: ['1', '2', '5', 'I have never looked'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Polymers and resin codes',
    image: 'for-resin-codes',
    caption: 'Resin identification codes **1–7** name the polymer each plastic is made of.',
    bullets: [
      'Plastics are **polymers**: long chains of repeating units.',
      '1 **PETE**, 2 **HDPE**, 3 **PVC**, 4 **LDPE**, 5 **PP**, 6 **PS**, 7 other (including **PMMA**, acrylic).',
      'An evidence fragment ==rarely shows its code==, so you must test it.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each resin code to its plastic.',
    pairs: [
      ['1', 'PETE'],
      ['2', 'HDPE'],
      ['3', 'PVC'],
      ['4', 'LDPE'],
      ['5', 'PP'],
      ['6', 'PS'],
    ],
    explanation: 'The codes run PETE, HDPE, PVC, LDPE, PP, PS, and 7 for others such as PMMA.',
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which plastic is each everyday item usually made from?',
    bins: ['PETE', 'HDPE', 'PP', 'PS'],
    items: [
      ['Clear soda bottle', 0],
      ['Milk jug', 1],
      ['Yogurt cup', 2],
      ['Disposable cutlery', 3],
      ['Bottle cap', 2],
      ['Detergent bottle', 1],
    ],
    explanation:
      'Soda bottles are PETE, milk jugs and detergent bottles are HDPE, yogurt cups and caps are PP, and disposable cutlery is PS.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Everyday sources',
    bullets: [
      '**PVC**: pipes and some clear packaging. **LDPE**: plastic bags and squeeze bottles.',
      '**PP**: yogurt cups, bottle caps, and straws. **PS**: cutlery, CD cases, and clear cups.',
      '**PMMA** (acrylic): shatter-resistant windows and displays.',
      'Knowing uses helps ==link a fragment to a scene==.',
    ],
  },
  {
    kind: 'compare',
    section: 2,
    title: 'Density separations in water (1.00 g/cm³)',
    columns: ['Result in water', 'Plastics', 'Approximate density (g/cm³)'],
    rows: [
      ['==Floats==', 'PP, LDPE, HDPE', '0.90, 0.92, 0.95'],
      ['**Sinks**', 'PS, PMMA', '1.05, 1.18'],
      ['**Sinks**', 'PVC, PETE', '1.3–1.4, 1.38'],
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each plastic float or sink in plain water?',
    bins: ['Floats', 'Sinks'],
    items: [
      ['Polypropylene (PP)', 0],
      ['Polystyrene (PS)', 1],
      ['LDPE', 0],
      ['PETE', 1],
      ['HDPE', 0],
      ['PVC', 1],
    ],
    explanation:
      'Anything less dense than water (PP, LDPE, HDPE) floats; anything denser (PS, PMMA, PVC, PETE) sinks.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Testing technique',
    bullets: [
      'Use small pieces **free of air bubbles**; push each under and **wet it fully**.',
      'Trapped air makes plastics ==float falsely==.',
      'Test from the **least dense** to the **most dense** solution.',
      'Floats in water but sinks in 0.93 g/cm³ alcohol solution → denser than 0.93 → **HDPE**.',
      'Record **float or sink** for each solution in a table.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: a sinking, sooty fragment',
    problem:
      'A fragment **sinks in water**, **floats in a 1.10 g/cm³** salt solution, and burns with a **sooty flame**.',
    steps: [
      'Sinking in water: density is **above 1.00** g/cm³.',
      'Floating in 1.10 g/cm³: density is **below 1.10** g/cm³.',
      'Only **polystyrene** (about 1.05) fits, and a sooty flame confirms it.',
    ],
    conclusion: 'The fragment is ==polystyrene (PS, code 6)==.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A fragment floats in water but sinks in a 0.93 g/cm³ alcohol-water solution. Which plastic is it?',
    options: ['Polypropylene (PP)', 'LDPE', 'HDPE', 'PETE'],
    answer: 2,
    explanation:
      'Floating in water means less than 1.00; sinking in 0.93 means more than 0.93. Only HDPE, about 0.95, fits.',
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each provided burn result to the plastic.',
    pairs: [
      ['Green-edged flame on copper wire, acrid fumes', 'PVC'],
      ['Sooty, smoky flame', 'Polystyrene'],
      ['Waxy, candle-like smell and drips', 'Polyethylene or PP'],
      ['Fruity odor', 'PMMA'],
    ],
    explanation:
      'PVC’s chlorine colors the Beilstein flame green, polystyrene burns sooty, polyethylene and PP smell waxy, and PMMA smells fruity.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Burn and other provided results',
    bullets: [
      'Burn tests are **not done** at the event, but results may be given.',
      '**PVC** contains chlorine: a ==green-edged flame== in the copper-wire **Beilstein test**, and it tends to self-extinguish.',
      '**PETE** burns and drips with a sweet smell.',
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Physical properties',
    bullets: [
      '**LDPE** is soft and flexible; **HDPE** is stiffer and somewhat waxy.',
      '**PP** bends repeatedly without breaking.',
      '**PS** is rigid and brittle and sounds ==metallic when dropped==.',
      '**PMMA** is very clear and rigid; **PETE** is clear and tough.',
    ],
    callout:
      'Colorants and fillers can shift density slightly, so combine density with these clues.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A rigid, brittle clear fragment makes a metallic sound when dropped and sinks in water. Which plastic is most likely?',
    options: ['LDPE', 'Polystyrene (PS)', 'Polypropylene (PP)', 'HDPE'],
    answer: 1,
    explanation:
      'PS is rigid, brittle, and sounds metallic when dropped, and at about 1.05 g/cm³ it sinks. LDPE, PP, and HDPE all float.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Codes: 1 **PETE**, 2 **HDPE**, 3 **PVC**, 4 **LDPE**, 5 **PP**, 6 **PS**, 7 other (**PMMA**).',
      '==PP, LDPE, and HDPE float== in water; PS, PMMA, PVC, and PETE sink.',
      'Remove **air bubbles** and test from least to most dense solution.',
      'Burn results and feel (soft, stiff, brittle, clear) confirm the density result.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'A plastic fragment floats in water. Describe how you would decide between PP, LDPE, and HDPE.',
    model:
      'All three float in water, so I would use an alcohol-water solution of about 0.93 g/cm³: HDPE (0.95) would sink while PP and LDPE would float. Then I would bend the floating piece: PP flexes repeatedly without breaking, while LDPE is softer and floppier.',
  },
]);

export const decks: Deck[] = [powders, metalsLiquids, hairFibers, plastics, ...crimeDecksEvidence];
