import { defineDeck, type Deck } from './presentation-types.ts';
import { foodDecksApplied } from './presentations-b-food-science-2.ts';

// Food Science (Division B) presentations. Each deck follows its lesson in the Division B
// food-science course section by section (`section` is the lesson section index), at a
// middle-school level, and its activities rehearse the lesson's terms, lab math and checks.

const milk = defineDeck('food-u1-l1', [
  {
    kind: 'title',
    title: 'What milk is made of',
    subtitle: 'Water, sugar, fat, protein, and minerals, all mixed together in one glass.',
    objectives: [
      'Describe the composition of cow’s milk.',
      'Compare sugars, starches, fats, and proteins.',
      'Explain the roles of lactose, casein, and whey.',
    ],
    image: 'b-food-casein-acid',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what do you think makes up most of a glass of milk?',
    options: ['Water', 'Fat', 'Protein', 'Sugar'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Milk composition',
    bullets: [
      'Cow’s milk is about **87% water**.',
      'The rest: about 4.8% **lactose**, 3–4% fat, 3.3% protein, and 0.7% minerals.',
      'Milk is three mixtures at once: an **emulsion** of fat droplets, a suspension of protein particles, and a solution of lactose and salts.',
      'Store whole milk is standardized to about ==3.25% fat==.',
    ],
    callout: 'Breed, feed, and processing all change the exact numbers.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt:
      'A 258 g glass of whole milk is 3.3% protein by mass. About how many grams of protein does it hold?',
    answer: 8.5,
    tolerance: 0.3,
    unit: 'g',
    explanation: '0.033 × 258 g ≈ 8.5 g, close to the 8 g printed on most milk labels.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Carbohydrates',
    bullets: [
      'Carbohydrates contain carbon, hydrogen, and oxygen, usually in a **1 : 2 : 1** ratio.',
      '**Monosaccharides** are single sugar units, such as glucose and galactose.',
      '**Disaccharides** join two units: ==lactose = glucose + galactose==, linked by a glycosidic bond.',
      '**Polysaccharides** such as starch are long chains of glucose. Milk has no starch.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Sort each carbohydrate by its size.',
    bins: ['Monosaccharide', 'Disaccharide', 'Polysaccharide'],
    items: [
      ['Glucose', 0],
      ['Galactose', 0],
      ['Lactose', 1],
      ['Starch', 2],
    ],
    explanation:
      'Glucose and galactose are single units, lactose joins two, and starch is a long glucose chain.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Lipids: the fat in milk',
    image: 'b-food-triglyceride',
    caption:
      'Milk fat is mostly **triglycerides**: one glycerol bonded to three fatty acids by **ester bonds**.',
    bullets: [
      'Fatty acids are long hydrocarbon chains with a carboxyl group at one end.',
      'Milk fat also has **phospholipids**, which form membranes around fat globules, and cholesterol.',
      'The long chains are ==nonpolar==, so fat does not dissolve in water and stays as tiny globules.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why does milk fat stay as tiny globules instead of dissolving in the water?',
    options: [
      'Its long hydrocarbon chains are nonpolar',
      'It is heavier than water',
      'It is made of amino acids',
      'Lactose holds it in place',
    ],
    answer: 0,
    explanation:
      'Nonpolar chains do not mix with polar water, so fat stays in separate globules spread through the milk.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Proteins',
    image: 'prot-amino-acids',
    bullets: [
      'Proteins are chains of **amino acids** linked by **peptide bonds**.',
      'Each amino acid has an amino group, a carboxyl group, and a side chain.',
      '**Casein** is about 80% of milk protein and forms clusters called **micelles** that help make milk white.',
      '**Whey proteins** (about 20%), like β-lactoglobulin and α-lactalbumin, stay dissolved.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each milk molecule to its building blocks.',
    pairs: [
      ['Lactose', 'Glucose + galactose'],
      ['Triglyceride', 'Glycerol + three fatty acids'],
      ['Casein', 'Amino acids'],
      ['Starch', 'Many glucose units'],
    ],
    explanation:
      'Sugars build from sugar units, fats from glycerol and fatty acids, and proteins from amino acids.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Casein and whey behave differently',
    image: 'b-food-casein-acid',
    caption:
      'Casein micelles are stable at milk’s normal **pH 6.7** but clump near **pH 4.6**, their isoelectric point.',
    bullets: [
      'Whey proteins stay dissolved in acid, but ==unfold and clump when heated== strongly.',
      'That is why heated milk can form a skin.',
      'In cheesemaking, **casein forms the curd**; whey proteins and lactose drain off in the liquid whey.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Which milk protein group does each statement describe?',
    bins: ['Casein', 'Whey proteins'],
    items: [
      ['About 80% of milk protein', 0],
      ['Clumps near pH 4.6', 0],
      ['Stays dissolved when acid is added', 1],
      ['Clumps when heated strongly', 1],
      ['Forms the curd in cheese', 0],
    ],
    explanation:
      'Casein is the big, acid-sensitive group that becomes curd; whey proteins survive acid but not strong heat.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Minerals and vitamins in milk',
    bullets: [
      'Milk is a major source of **calcium** and **phosphorus**, much of it bound in casein micelles.',
      'It also supplies potassium, riboflavin (B₂), vitamin B₁₂, and vitamin A.',
      'U.S. milk is usually **fortified with vitamin D**, which helps the body absorb calcium.',
      'Vitamins A and D are fat-soluble, so ==skim milk loses them and is fortified to restore them==.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why are reduced-fat and skim milks fortified with vitamins A and D?',
    options: [
      'Those vitamins are removed along with the fat',
      'Cows on pasture make less of them',
      'Pasteurization destroys them',
      'They are needed to keep the milk white',
    ],
    answer: 0,
    explanation: 'Vitamins A and D dissolve in fat, so taking out fat also takes them out.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: protein and sugar in one glass',
    problem:
      'A 250 mL glass of whole milk weighs about 258 g. Using 3.3% protein and 4.8% lactose by mass, estimate the grams of each.',
    steps: [
      'Protein: 0.033 × 258 g ≈ **8.5 g**.',
      'Lactose: 0.048 × 258 g ≈ **12.4 g**.',
      'Compare with a label: about 8 g protein and 12 g sugar per cup.',
    ],
    conclusion:
      'Percent by mass times total mass gives grams: ==about 8.5 g protein and 12.4 g lactose==.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'The same 258 g glass is 4.8% lactose. About how many grams of lactose is that?',
    answer: 12.4,
    tolerance: 0.3,
    unit: 'g',
    explanation: '0.048 × 258 g ≈ 12.4 g of lactose.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Lactose', back: 'Milk sugar: a disaccharide of glucose and galactose.' },
      { front: 'Triglyceride', back: 'Glycerol bonded to three fatty acids.' },
      { front: 'Casein', back: 'Main milk protein, forming micelles.' },
      {
        front: 'Isoelectric point',
        back: 'The pH where a protein has no net charge and clumps most.',
      },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'Milk is mostly {0}. Its sugar, {1}, is made of glucose and galactose. The main protein, {2}, clumps near pH 4.6.',
    blanks: ['water', 'lactose', 'casein'],
    distractors: ['fat', 'starch', 'whey'],
    explanation: 'Milk is about 87% water; lactose is the milk sugar; casein forms curds in acid.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Milk is about **87% water** plus lactose, fat, protein, and minerals.',
      'Lactose is a disaccharide; fat is triglycerides; proteins are amino acid chains.',
      '==Casein clumps in acid; whey proteins clump with heat.==',
      'Skim milk is fortified because vitamins A and D leave with the fat.',
    ],
  },
]);

const fats = defineDeck('food-u2-l1', [
  {
    kind: 'title',
    title: 'Fats: saturation, esters, and emulsions',
    subtitle: 'Why butter is solid, oil is liquid, and cream turns into butter when you shake it.',
    objectives: [
      'Distinguish saturated, unsaturated, and essential fats.',
      'Describe the esterification that forms a triglyceride.',
      'Explain emulsions and how butter forms.',
    ],
    image: 'b-food-churn',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why is butter solid on the counter while olive oil is liquid?',
    options: [
      'Their fat molecules have different shapes',
      'Butter has more water',
      'Oil is warmer',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Saturated and unsaturated fats',
    image: 'b-food-triglyceride',
    caption:
      'The top chain is **saturated** (only single bonds); the lower two are **unsaturated**, with C=C double bonds.',
    bullets: [
      'Saturated chains are straight and ==pack tightly==, so fats like butter are solid at room temperature.',
      '**Monounsaturated** = one double bond; **polyunsaturated** = more than one.',
      'Cis double bonds put **kinks** in the chain, so the fat packs loosely and is a liquid oil.',
      'About two-thirds of milk fat is saturated.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Saturated or unsaturated?',
    bins: ['Saturated', 'Unsaturated'],
    items: [
      ['Only single C–C bonds', 0],
      ['Has at least one C=C double bond', 1],
      ['Straight chains that pack tightly', 0],
      ['Kinked chains, liquid oil', 1],
      ['Most of the fat in butter', 0],
    ],
    explanation:
      'Single bonds keep chains straight and solid; cis double bonds kink them so they stay liquid.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Essential fats and trans fats',
    bullets: [
      '**Essential fatty acids** cannot be made by the body: linoleic acid (omega-6) and alpha-linolenic acid (omega-3).',
      '**Trans fats** have double bonds arranged so the chain stays straight.',
      'Most trans fats come from partially hydrogenated oils and ==raise heart disease risk==.',
      'Dairy has a little natural trans fat from bacteria in cows’ stomachs, thought to be less harmful.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What makes a fatty acid “essential”?',
    options: [
      'The body cannot make it, so it must come from food',
      'It has no double bonds',
      'It is found only in milk',
      'It is solid at room temperature',
    ],
    answer: 0,
    explanation: 'Essential nutrients must be eaten because the body cannot build them.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'Esterification builds a triglyceride',
    steps: [
      { label: 'Start', detail: '**Glycerol** has three –OH groups.' },
      { label: 'React', detail: 'Each –OH reacts with one **fatty acid** (a carboxylic acid).' },
      { label: 'Release', detail: 'Each ester bond releases ==one water molecule==.' },
      { label: 'Result', detail: 'One **triglyceride** plus three water molecules.' },
      {
        label: 'Reverse',
        detail:
          '**Hydrolysis** adds water to break ester bonds; lipase enzymes do this in digestion.',
      },
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'How many water molecules are released when one triglyceride forms?',
    answer: 3,
    tolerance: 0,
    explanation:
      'Three fatty acids each form one ester bond with glycerol, releasing one water each.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Emulsions and emulsifiers',
    bullets: [
      'An **emulsion** is a stable mix of tiny droplets of one liquid in another.',
      'Milk is an **oil-in-water** emulsion.',
      '**Emulsifiers** have a water-loving (hydrophilic) end and a fat-loving (hydrophobic) end, so they sit on droplet surfaces.',
      'In milk, phospholipids and proteins coat fat globules; ==homogenization makes globules smaller== so cream does not rise.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'How does an emulsifier keep droplets from merging?',
    options: [
      'One end faces water and the other faces fat, so it coats droplet surfaces',
      'It makes the fat dissolve in water',
      'It turns fat into sugar',
      'It raises the temperature of the mixture',
    ],
    answer: 0,
    explanation:
      'Sitting at the oil–water surface, emulsifiers form a coat that stops droplets from joining.',
  },
  {
    kind: 'figure',
    section: 4,
    title: 'Making butter',
    image: 'b-food-churn',
    caption:
      'Churning cream at about **13 °C** damages the membranes around partly solid fat globules, so the fat sticks together.',
    bullets: [
      'First, air is trapped as whipped cream; then fat clumps into **butter grains**.',
      'The emulsion **inverts**: cream is oil-in-water, butter is ==water-in-oil, about 80% fat==.',
      'The leftover liquid is **buttermilk**, drained off before weighing.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order what happens as cream is churned into butter.',
    items: [
      'Shaking damages the membranes around fat globules',
      'Exposed fat traps air as whipped cream',
      'Fat clumps into butter grains',
      'Buttermilk is drained off',
      'Butter is weighed',
    ],
    explanation:
      'Membranes break, fat first holds air, then clumps; buttermilk is removed before the butter is weighed.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Why temperature matters for butter',
    columns: ['Cream temperature', 'What the fat does', 'Result'],
    rows: [
      ['Too cold', 'Fat is too **solid**; globules do not stick', 'Churning takes a long time'],
      ['About 13 °C', 'Globules are ==partly crystallized==', 'Fat clumps efficiently'],
      ['Too warm', 'Fat is too **liquid**', 'Greasy butter; more fat lost in buttermilk'],
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'A team’s cream is too warm. What will they most likely see?',
    options: [
      'Greasy butter and more fat lost in the buttermilk',
      'Butter forms almost instantly and is very firm',
      'No change at all',
      'The cream turns into cheese',
    ],
    answer: 0,
    explanation:
      'Warm fat is too liquid, so butter is greasy and more fat escapes in the buttermilk.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: fat in cream',
    problem:
      'A team churns 148 g of cream and collects 52 g of butter. If butter is about 80% fat, estimate the cream’s fat percentage.',
    steps: [
      'Fat in butter ≈ 0.80 × 52 g ≈ **41.6 g**.',
      'Fat fraction of cream ≈ 41.6 g ÷ 148 g ≈ **0.28**.',
      'That is about 28%, a bit below typical heavy cream (about 36%).',
    ],
    conclusion: '==About 28% fat was captured==; some fat probably stayed in the buttermilk.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'A team collects 60 g of butter that is 80% fat. How many grams of milk fat is that?',
    answer: 48,
    tolerance: 0.5,
    unit: 'g',
    explanation: '0.80 × 60 g = 48 g of milk fat.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Saturated fat', back: 'Fatty acids with only single C–C bonds.' },
      { front: 'Esterification', back: 'Acid + alcohol → ester + water.' },
      { front: 'Emulsifier', back: 'Molecule that stabilizes droplets at an oil–water surface.' },
      { front: 'Phase inversion', back: 'Oil-in-water becomes water-in-oil, as in butter.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Straight saturated chains** pack into solids; kinked unsaturated chains make oils.',
      'Glycerol + 3 fatty acids → triglyceride + 3 water; hydrolysis reverses it.',
      'Emulsifiers sit at the oil–water surface and keep droplets apart.',
      '==Churning at about 13 °C inverts cream into butter.==',
    ],
  },
]);

const curds = defineDeck('food-u3-l1', [
  {
    kind: 'title',
    title: 'Proteins and curds',
    subtitle: 'Add a little acid to milk, and its proteins clump into curds you can weigh.',
    objectives: [
      'Explain how acid makes casein form curds.',
      'Calculate percent curd from lab data.',
      'Identify variables that change curd yield.',
    ],
    image: 'b-food-casein-acid',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you ever seen milk curdle?',
    options: ['Yes, in old milk', 'Yes, when cooking with lemon or vinegar', 'Never', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Casein micelles',
    image: 'b-food-micelle',
    caption:
      'A micelle is a cluster of thousands of casein proteins held together partly by **calcium phosphate**.',
    bullets: [
      'Micelle surfaces carry a **negative charge** and a hairy layer of **κ-casein**.',
      'Because micelles ==repel each other==, fresh milk stays smooth.',
      'Acid or the enzyme **rennet** removes the charge or hairy layer, so micelles stick together.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What keeps casein micelles apart in fresh milk?',
    options: [
      'Their negative surface charge and hairy κ-casein layer',
      'The fat globules between them',
      'Lactose sticking to them',
      'The cold temperature of the fridge',
    ],
    answer: 0,
    explanation: 'Like charges repel, and the hairy κ-casein layer keeps micelles from touching.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Acid coagulation',
    steps: [
      { label: 'Add acid', detail: 'Vinegar (acetic acid) or lemon juice (citric acid) is added.' },
      { label: 'pH drops', detail: 'pH falls from about **6.7** as hydrogen ions build up.' },
      {
        label: 'Charges cancel',
        detail: 'H⁺ ions ==neutralize the negative charges== and dissolve calcium phosphate.',
      },
      { label: 'pH 4.6', detail: 'At casein’s **isoelectric point**, micelles stop repelling.' },
      { label: 'Curd forms', detail: 'Micelles clump into **curd**; the liquid left is **whey**.' },
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the steps of acid coagulation.',
    items: [
      'Vinegar is added to milk',
      'The pH falls below 6.7',
      'Negative charges on micelles are neutralized',
      'Micelles reach pH 4.6 and stop repelling',
      'Curd separates from whey',
    ],
    explanation: 'Acid lowers pH, removes the charges that kept micelles apart, and they clump.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'The curd lab procedure',
    steps: [
      {
        label: 'Measure',
        detail: 'Measure **120 mL** of milk, weigh it, keep it near room temperature.',
      },
      {
        label: 'Acidify',
        detail: 'Add drops of vinegar or lemon juice, swirling gently for **30 s**.',
      },
      { label: 'Rest', detail: 'Let it sit about **5 minutes**.' },
      { label: 'Drain', detail: 'Drain through cheesecloth for **15 minutes**.' },
      { label: 'Weigh', detail: 'Weigh the curds; aim to ==match the supervisor’s percentage==.' },
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'In the curd lab, what matters most for a good score?',
    options: [
      'Consistent technique that matches the supervisor’s percentage',
      'Getting the largest curd mass possible',
      'Using the warmest milk available',
      'Stirring as hard as possible',
    ],
    answer: 0,
    explanation:
      'Teams aim to match the supervisor’s value, so a repeatable method beats a big yield.',
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: percent curd',
    problem:
      'Milk in a beaker weighs 245.0 g; the empty beaker is 120.8 g. Curds on a 3.2 g cheesecloth weigh 22.0 g together. Find percent curd.',
    steps: [
      'Milk mass = 245.0 − 120.8 = **124.2 g** (subtract the container: tare).',
      'Curd mass = 22.0 − 3.2 = **18.8 g**.',
      'Percent curd = 18.8 ÷ 124.2 × 100 ≈ **15.1%**.',
    ],
    conclusion:
      '==Percent curd = curd mass ÷ milk mass × 100.== Curd still holds water, so it weighs more than the casein alone.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: '124 g of milk gives 18.6 g of curd. What is the percent curd?',
    answer: 15,
    tolerance: 0.2,
    unit: '%',
    explanation: '18.6 ÷ 124 × 100 = 15%.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A beaker with milk weighs 250.0 g and the empty beaker weighs 130.0 g. What is the mass of the milk?',
    answer: 120,
    tolerance: 0.1,
    unit: 'g',
    explanation: 'Subtract the container: 250.0 − 130.0 = 120.0 g of milk.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Variables that change yield',
    bullets: [
      '**Milk type**: whole milk traps fat in the curd and gives more mass than skim.',
      '**Temperature**: warmer milk curdles faster and firmer.',
      '**Acid amount and type**: too little acid leaves casein in solution.',
      '**Stirring**: too hard breaks curds into bits that pass through the cloth.',
      '**Drain time and squeezing** change ==how much water stays in the curd==.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Would each change most likely raise or lower the curd mass?',
    bins: ['Raises curd mass', 'Lowers curd mass'],
    items: [
      ['Using whole milk instead of skim', 0],
      ['Adding too little acid', 1],
      ['Stirring very hard', 1],
      ['Draining for a much shorter time', 0],
      ['Squeezing the curd hard', 1],
    ],
    explanation:
      'Fat and leftover water add mass; too little acid, broken curds, and squeezing out water reduce it.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Heat and proteins',
    image: 'prot-denaturation',
    bullets: [
      'Heat **denatures** proteins by breaking the weak bonds that hold their folded shape.',
      'Whey proteins denature above about **70 °C** and can then join the curd, as in ricotta.',
      'Heated milk forms a **skin** of denatured protein and fat.',
      '==Casein is heat-stable at normal pH==, so milk can boil without curdling unless it is acidic.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Why can fresh milk be boiled without curdling?',
    options: [
      'Casein is heat-stable at normal pH',
      'Boiling removes all the protein',
      'Whey proteins protect it from heat',
      'Lactose stops proteins from changing',
    ],
    answer: 0,
    explanation: 'Casein needs acid or rennet to clump; heat alone does not curdle fresh milk.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Micelle', back: 'Cluster of casein proteins held by calcium phosphate.' },
      { front: 'Curd', back: 'Solid of clumped casein, fat, and trapped water.' },
      { front: 'Whey', back: 'Liquid left after curd forms.' },
      { front: 'Tare', back: 'Zeroing a balance to remove container mass.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Charged, hairy micelles repel; ==acid cancels the charge and they clump== near pH 4.6.',
      'Percent curd = curd mass ÷ milk mass × 100, after subtracting containers.',
      'Milk type, temperature, acid, stirring, and drain time all change yield.',
      'Heat denatures whey proteins, but casein is heat-stable at normal pH.',
    ],
  },
]);

const iceCream = defineDeck('food-u4-l1', [
  {
    kind: 'title',
    title: 'Freezing point depression and ice cream',
    subtitle: 'Salt makes ice colder than ice, and that is how you freeze ice cream in a bag.',
    objectives: [
      'Explain freezing point depression and why salt is added to ice.',
      'Calculate freezing point changes with ΔT = i · Kf · m.',
      'Describe the structure of ice cream and what makes it stand.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why do people put salt on icy roads?',
    options: ['It melts the ice', 'It adds grip only', 'It warms the road', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Freezing point depression',
    bullets: [
      'Dissolving particles in a liquid ==lowers its freezing point==.',
      'Solute particles get in the way of water molecules joining the ice crystal.',
      'It depends on the **number** of particles, not their type: a **colligative property**.',
      '**ΔTf = i × Kf × m**: Kf for water is 1.86 °C·kg/mol, m is **molality**, i is particles per formula unit.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each symbol in ΔTf = i × Kf × m to its meaning.',
    pairs: [
      ['ΔTf', 'How much the freezing point drops'],
      ['i', 'Particles each formula unit makes'],
      ['Kf', '1.86 °C·kg/mol for water'],
      ['m', 'Moles of solute per kilogram of water'],
    ],
    explanation: 'Multiply particles, the water constant, and molality to get the drop in °C.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Salt and ice',
    bullets: [
      'Ice alone sits near **0 °C**.',
      'Salt dissolves in the thin meltwater layer and lowers its freezing point, so **more ice melts**.',
      'Melting absorbs heat (**latent heat of fusion**), so the mix cools to about ==−10 to −20 °C==.',
      'NaCl splits into Na⁺ and Cl⁻, so **i ≈ 2**: a mole of salt works twice as well as a mole of sugar.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: salty meltwater',
    problem: 'Estimate the freezing point of meltwater with 2.0 mol of NaCl per kilogram of water.',
    steps: [
      'NaCl gives Na⁺ and Cl⁻, so **i = 2**.',
      'ΔTf = 2 × 1.86 × 2.0 = **7.44 °C**.',
      'New freezing point ≈ 0 − 7.44 = **−7.4 °C**.',
    ],
    conclusion: '==About −7.4 °C==, cold enough to freeze the sugary ice cream mix.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Water has 1.0 mol of NaCl dissolved per kilogram (i = 2, Kf = 1.86). By how many °C does its freezing point drop?',
    answer: 3.72,
    tolerance: 0.05,
    unit: '°C',
    explanation: 'ΔTf = 2 × 1.86 × 1.0 = 3.72 °C, so it freezes near −3.7 °C.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Why does one mole of NaCl lower the freezing point more than one mole of sugar?',
    options: [
      'NaCl splits into two ions, so it makes twice as many particles',
      'Salt is heavier than sugar',
      'Sugar raises the freezing point',
      'Salt reacts with ice to make heat',
    ],
    answer: 0,
    explanation: 'Freezing point depression counts particles; NaCl gives Na⁺ and Cl⁻, so i ≈ 2.',
  },
  {
    kind: 'flow',
    section: 2,
    title: 'The ice cream lab',
    steps: [
      {
        label: 'Mix',
        detail:
          'Up to **125 mL** milk, cream, or half-and-half, **15 mL** sugar, **1.2 mL** vanilla in a pint bag.',
      },
      { label: 'Bath', detail: 'Half-fill a gallon bag with ice and up to **90 mL** salt; shake.' },
      { label: 'Freeze', detail: 'Put the small bag inside and ==shake hard for 5–10 minutes==.' },
      { label: 'Shape', detail: 'Shape the ice cream by hand.' },
      {
        label: 'Measure',
        detail: 'It must **stand on its own for 5 seconds** before its height is measured.',
      },
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the ice cream lab steps.',
    items: [
      'Mix milk, sugar, and vanilla in a pint bag',
      'Fill a gallon bag with ice and salt',
      'Place the small bag inside and shake 5–10 minutes',
      'Shape the ice cream by hand',
      'Let it stand 5 seconds and measure its height',
    ],
    explanation: 'Make the mix, make the cold bath, freeze by shaking, then shape and measure.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'What ice cream is made of',
    bullets: [
      'Ice cream mixes **ice crystals**, **fat globules**, **air bubbles**, and a sugar solution that stays unfrozen.',
      'Sugar lowers the mix’s freezing point: scoopable, but it ==needs a very cold bath==.',
      'Fat globules cluster around air bubbles and stabilize them, like in whipped cream.',
      'The extra volume from air is called **overrun**.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which of these are parts of ice cream’s structure? Choose all that apply.',
    options: [
      'Ice crystals',
      'Fat globules',
      'Air bubbles',
      'Unfrozen sugar solution',
      'Starch grains',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'Ice cream is ice, fat, air, and a concentrated sugar solution; it has no starch grains.',
  },
  {
    kind: 'compare',
    section: 4,
    title: 'Getting a tall, firm scoop',
    columns: ['Change', 'Effect on the mix', 'Effect on the scoop'],
    rows: [
      ['Cream instead of milk', 'More fat', '**Firmer**, holds its shape'],
      ['Less sugar', 'Higher freezing point, more water freezes', 'Firmer but harder'],
      ['More salt in the bath', 'Colder, faster freezing', '==Smaller crystals==, smoother'],
      ['Vigorous shaking', 'Adds air, keeps crystals small', 'Lighter and smoother'],
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Which change would most likely make the ice cream stand taller and firmer?',
    options: [
      'Use cream instead of milk',
      'Add extra sugar',
      'Use less salt in the ice bath',
      'Shake gently for only one minute',
    ],
    answer: 0,
    explanation: 'More fat gives a firmer structure; extra sugar or a warmer bath makes it softer.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Ice crystals and texture',
    bullets: [
      '**Fast freezing** makes many small crystals: smooth ice cream.',
      '**Slow freezing** or melting and refreezing grows large crystals: icy, grainy texture.',
      '**Stabilizers** such as gums and proteins limit crystal growth.',
      'In the lab, ==keep the bag touching the salted ice and shake nonstop==.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Smooth or icy?',
    bins: ['Smooth texture', 'Icy, grainy texture'],
    items: [
      ['Freezing quickly in a very cold bath', 0],
      ['Melting and refreezing in a freezer', 1],
      ['Adding a stabilizer gum', 0],
      ['Freezing slowly with little shaking', 1],
    ],
    explanation:
      'Fast freezing and stabilizers keep crystals small; slow or repeated freezing grows big ones.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Colligative property',
        back: 'Depends on the number of particles, not their identity.',
      },
      { front: 'Molality', back: 'Moles of solute per kilogram of solvent.' },
      { front: 'Latent heat of fusion', back: 'Heat absorbed when a solid melts.' },
      { front: 'Overrun', back: 'Extra volume from air whipped into ice cream.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Dissolved particles lower the freezing point: **ΔTf = i × Kf × m**.',
      'Salt melts ice, and melting absorbs heat, so the bath drops ==well below 0 °C==.',
      'Ice cream is ice crystals, fat, air, and unfrozen sugar solution.',
      'More fat, less sugar, and fast freezing give a taller, smoother scoop.',
    ],
  },
]);

export const decks: Deck[] = [milk, fats, curds, iceCream, ...foodDecksApplied];
