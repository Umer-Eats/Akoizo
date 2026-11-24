import { defineDeck } from './presentation-types.ts';

// Food Science (Division B) presentations for processing, nutrition labels, and dairy
// sensitivities, following the lessons section by section like presentations-b-food-science.ts.

const processing = defineDeck('food-u5-l1', [
  {
    kind: 'title',
    title: 'Processing, cooking, and preservation',
    subtitle: 'What happens to milk between the cow and your fridge, and in the pan.',
    objectives: [
      'Explain pasteurization, homogenization, and drying.',
      'Describe how cooking changes dairy foods chemically.',
      'Explain fermentation, probiotics, and organic dairy.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why do you think most milk is heated before it is sold?',
    options: ['To kill harmful microbes', 'To make it taste sweeter', 'To thicken it', 'Not sure'],
  },
  {
    kind: 'compare',
    section: 0,
    title: 'Pasteurization methods',
    columns: ['Method', 'Heat and time', 'Notes'],
    rows: [
      ['**HTST**', '72 °C for 15 seconds', 'Most common; must be refrigerated'],
      ['**Vat**', '63 °C for 30 minutes', 'Slow, batch method'],
      [
        '**UHT**',
        '135–150 °C for a few seconds',
        'Sterile packaging: ==stored unrefrigerated for months== until opened',
      ],
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each heat treatment to its conditions.',
    pairs: [
      ['HTST pasteurization', '72 °C for 15 seconds'],
      ['Vat pasteurization', '63 °C for 30 minutes'],
      ['UHT processing', 'About 140 °C for a few seconds'],
    ],
    explanation:
      'Higher temperatures need much shorter times; all three kill disease-causing microbes.',
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Pasteurize, don’t sterilize',
    bullets: [
      '**Pasteurization** heats milk enough to kill disease-causing microbes and reduce spoilage organisms.',
      'It does ==not sterilize== milk: some harmless microbes survive, so most milk still needs the fridge.',
      'UHT plus **aseptic** (sterile) packaging is what lets boxed milk sit on a shelf.',
    ],
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Homogenization and standardization',
    bullets: [
      'In raw milk, **cream rises** because fat globules are lighter than water.',
      '**Homogenization** forces milk through tiny openings at high pressure, breaking globules into smaller ones that stay mixed.',
      '**Standardization** removes cream and adds it back to reach whole (3.25%), 2%, 1%, or fat-free milk.',
      '==Homogenization does not affect safety; pasteurization does.==',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'Which process makes milk safe to drink?',
    options: ['Pasteurization', 'Homogenization', 'Standardization', 'Fortification'],
    answer: 0,
    explanation:
      'Pasteurization kills harmful microbes; homogenization only keeps cream from rising.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Preservation methods',
    bullets: [
      'Preservation ==slows microbes and enzymes==.',
      '**Refrigeration** slows growth; **drying** makes powdered milk with no water for microbes.',
      '**Concentration** makes evaporated and sweetened condensed milk; high sugar ties up water.',
      '**Fermentation** lowers pH; **salting and aging** preserve cheeses.',
      'Light-blocking packaging protects riboflavin and prevents off-flavors.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each dairy product to how it is preserved.',
    pairs: [
      ['Powdered milk', 'Drying removes the water microbes need'],
      ['Sweetened condensed milk', 'High sugar ties up water'],
      ['Yogurt', 'Low pH from fermentation'],
      ['Aged cheese', 'Salting and aging'],
    ],
    explanation:
      'Each method takes away something microbes need: water, a mild pH, or comfortable conditions.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'How cooking changes dairy',
    bullets: [
      'Whey proteins denature and, with fat, form a **skin** on heated milk.',
      'The **Maillard reaction** between sugars like lactose and amino acids makes ==brown color and toasty flavors==, as in dulce de leche.',
      '**Caramelization** breaks down sugars at even higher temperatures.',
      'Heat can curdle **acidic** mixtures; overheated cheese turns greasy and rubbery.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'A cheese crust turns golden brown and tastes toasty. Which reaction is the main cause?',
    options: [
      'The Maillard reaction between sugars and amino acids',
      'Esterification of fatty acids',
      'Freezing point depression',
      'Homogenization of fat globules',
    ],
    answer: 0,
    explanation: 'Maillard browning joins sugars and amino acids, making brown color and flavor.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Fermentation: milk to yogurt',
    steps: [
      {
        label: 'Bacteria added',
        detail: '**Lactobacillus bulgaricus** and **Streptococcus thermophilus**.',
      },
      { label: 'Lactose used', detail: 'Bacteria convert lactose to **lactic acid**.' },
      { label: 'pH drops', detail: 'The milk becomes more acidic.' },
      { label: 'Gel forms', detail: '==Casein gels== into thick yogurt.' },
      {
        label: 'Bonus',
        detail: 'Less lactose is left, so many lactose-intolerant people tolerate it.',
      },
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'What is a probiotic?',
    options: [
      'A live microbe that may benefit health when eaten in adequate amounts',
      'A vitamin added to milk',
      'A protein that makes yogurt thick',
      'A heat treatment for milk',
    ],
    answer: 0,
    explanation:
      'Probiotics are live microbes, such as yogurt cultures, that may support gut bacteria.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Organic dairy',
    bullets: [
      'USDA organic cows ==graze on pasture at least 120 days a year==.',
      'They eat organic feed grown without most synthetic pesticides.',
      'They get no synthetic growth hormones or antibiotics.',
      'Organic milk is still **pasteurized**, often UHT, and has similar basic nutrients; some studies find more omega-3 fats.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which are requirements for USDA organic dairy? Choose all that apply.',
    options: [
      'At least 120 days of pasture grazing per year',
      'Organic feed',
      'No synthetic growth hormones',
      'No pasteurization',
    ],
    answers: [0, 1, 2],
    explanation: 'Organic milk must still be pasteurized like any other milk sold in stores.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: compare two milks',
    problem:
      'Dairy A heats milk to 72 °C for 15 s, homogenizes it, and stores it at 4 °C. Dairy B heats to 140 °C for 3 s and packs it in sterile cartons.',
    steps: [
      'Dairy A makes **HTST pasteurized** milk, which must stay refrigerated.',
      'Dairy B makes **UHT** milk with aseptic packaging.',
      'UHT milk keeps for months unopened but may taste slightly cooked.',
    ],
    conclusion:
      'Both are safe; ==UHT keeps longer unopened== but has more heat-related flavor change.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Pasteurization', back: 'Heat treatment that kills harmful microbes.' },
      { front: 'Homogenization', back: 'Breaking fat globules so cream does not rise.' },
      { front: 'Maillard reaction', back: 'Browning between sugars and amino acids.' },
      { front: 'Fermentation', back: 'Microbes converting sugars to acids or other products.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Pasteurization** makes milk safe; UHT plus sterile packaging makes it shelf-stable.',
      'Homogenization and standardization change fat, not safety.',
      'Preservation takes away water, mild pH, or warmth that microbes need.',
      '==Cooking browns dairy; fermentation turns lactose into lactic acid.==',
    ],
  },
]);

const labels = defineDeck('food-u6-l1', [
  {
    kind: 'title',
    title: 'Nutrition and food labels',
    subtitle: 'What milk gives your body, and how to read the label on the carton.',
    objectives: [
      'Identify key vitamins and minerals in dairy and what a deficiency causes.',
      'Read a Nutrition Facts label and percent Daily Value.',
      'Explain labeling rules for fat content and allergens.',
    ],
    image: 'b-food-label',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what is the first thing you look at on a food label?',
    options: ['Calories', 'Sugar', 'Serving size', 'I never read labels'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Calcium and vitamin D',
    bullets: [
      '**Calcium** builds bones and teeth and is needed for muscles, nerves, and blood clotting.',
      '**Vitamin D** helps the intestine absorb calcium.',
      'Too little causes **rickets** in children (soft, bent bones) and osteomalacia or osteoporosis in adults.',
      'Teens need about ==1,300 mg of calcium a day==, more than adults, because bones grow fastest.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Why do teens need more calcium each day than adults?',
    options: [
      'Their bones are growing fastest',
      'They drink less water',
      'Their muscles do not use calcium',
      'Vitamin D does not work in teens',
    ],
    answer: 0,
    explanation: 'Fast bone growth in the teen years needs about 1,300 mg of calcium daily.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Other nutrients in dairy',
    columns: ['Nutrient', 'Job in the body', 'Deficiency sign'],
    rows: [
      ['**Riboflavin (B₂)**', 'Energy metabolism', 'Cracked lips, sore throat'],
      ['**Vitamin B₁₂**', 'Red blood cells and nerves', '==Anemia=='],
      ['**Vitamin A**', 'Vision', '==Night blindness=='],
      ['**Phosphorus, potassium**', 'Bones; blood pressure', '—'],
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each deficiency to the nutrient that is missing.',
    pairs: [
      ['Rickets', 'Vitamin D or calcium'],
      ['Night blindness', 'Vitamin A'],
      ['Anemia', 'Vitamin B12'],
      ['Cracked lips and sore throat', 'Riboflavin'],
    ],
    explanation:
      'Each vitamin or mineral has a job; when it is missing, that job fails in a recognizable way.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Dairy protein is complete',
    bullets: [
      'Dairy protein provides **all essential amino acids**.',
      'That makes it a ==complete protein==.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'RDA and Daily Values',
    bullets: [
      '**RDA**: the daily intake that meets the needs of nearly all healthy people in an age and sex group.',
      'Labels use one **Daily Value (DV)** per nutrient, based on a 2,000-calorie diet.',
      '==5% DV or less is low; 20% DV or more is high.==',
      'A cup of milk gives about 20–25% DV for calcium.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: percent Daily Value',
    problem:
      'A label lists 300 mg calcium per serving and a DV of 1,300 mg. A student drinks 3 servings.',
    steps: [
      'One serving: 300 ÷ 1,300 × 100 ≈ **23% DV**.',
      'Three servings: about **69% DV**, or 900 mg.',
      '20% DV or more counts as high.',
    ],
    conclusion: 'Each serving is ==high in calcium==; three servings give about 69% DV.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'One serving has 260 mg of calcium and the Daily Value is 1,300 mg. What percent DV is that?',
    answer: 20,
    tolerance: 0.5,
    unit: '%',
    explanation: '260 ÷ 1,300 × 100 = 20% DV, which counts as high.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Reading the label',
    image: 'b-food-label',
    caption:
      '**Serving size** comes first, and ==every number is per serving==. Then calories, fats, cholesterol, sodium, carbohydrates, sugars, and protein.',
    bullets: [
      'Required micronutrients: **vitamin D, calcium, iron, and potassium**.',
      'Plain milk lists sugars from lactose but **zero added sugars**; chocolate milk lists added sugars.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt:
      'A label says 8 g of protein per serving, and the carton holds 4 servings. How many grams of protein are in the carton?',
    answer: 32,
    tolerance: 0,
    unit: 'g',
    explanation: 'Every label number is per serving: 8 g × 4 servings = 32 g.',
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Plain milk shows 12 g of total sugars but 0 g added sugars. Why?',
    options: [
      'The sugar is lactose, which is naturally in milk',
      'The label is wrong',
      'Sugar was added and then removed',
      'Lactose is not a sugar',
    ],
    answer: 0,
    explanation:
      'Lactose occurs naturally in milk, so it counts in total sugars but not added sugars.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Fat-content claims',
    bullets: [
      '**Whole milk**: at least 3.25% milk fat.',
      '**Reduced-fat (2%)**: at least 25% less fat than whole milk.',
      '**Low-fat**: 1% fat. **Fat-free / skim**: less than 0.5 g fat per serving.',
      'All have similar protein, calcium, and lactose; ==they differ mainly in fat and calories==.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each milk name to its fat rule.',
    pairs: [
      ['Whole milk', 'At least 3.25% milk fat'],
      ['Reduced-fat milk', '2% fat, at least 25% less than whole'],
      ['Low-fat milk', '1% fat'],
      ['Fat-free milk', 'Less than 0.5 g fat per serving'],
    ],
    explanation: 'The names are legal definitions based on fat content.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Allergen labeling',
    bullets: [
      'Milk is a **major food allergen** that U.S. law requires on packaged food labels.',
      'It appears in the ingredient list or a **“Contains: Milk”** statement.',
      '**Casein, whey, and lactose** come from milk and must be identified.',
      '“May contain milk” is a ==voluntary== warning about possible cross-contact.',
    ],
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which ingredients tell a reader the food contains milk? Choose all that apply.',
    options: ['Casein', 'Whey', 'Lactose', 'Cocoa butter'],
    answers: [0, 1, 2],
    explanation: 'Casein, whey, and lactose come from milk; cocoa butter comes from cacao beans.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Daily Value (%DV)', back: 'Share of a reference daily amount in one serving.' },
      { front: 'Fortification', back: 'Adding nutrients not originally present, like vitamin D.' },
      {
        front: 'Rickets',
        back: 'Soft, bent bones in children from too little vitamin D or calcium.',
      },
      { front: 'Complete protein', back: 'A protein with all essential amino acids.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Calcium and vitamin D** build bones; teens need about 1,300 mg calcium daily.',
      'Read serving size first: ==every label number is per serving==.',
      '5% DV is low; 20% DV is high.',
      'Milk names are legal fat rules, and milk must be declared as an allergen.',
    ],
  },
]);

const sensitivities = defineDeck('food-u7-l1', [
  {
    kind: 'title',
    title: 'Lactose intolerance, allergies, alternatives, and the notebook',
    subtitle:
      'Why some people avoid milk, what they drink instead, and how to plan your experiments.',
    objectives: [
      'Distinguish lactose intolerance from milk allergy.',
      'Compare lactose-free and non-dairy “milk” products.',
      'Design notebook experiments with one independent variable.',
    ],
    image: 'b-food-lactose-hydrolysis',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: are lactose intolerance and milk allergy the same thing?',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Lactose intolerance',
    image: 'b-food-lactose-hydrolysis',
    caption:
      'The enzyme **lactase**, made in the small intestine, splits lactose into glucose and galactose.',
    bullets: [
      'Many people ==make less lactase after childhood==.',
      'Undigested lactose reaches the large intestine, where bacteria ferment it into gases and acids.',
      'Result: bloating, cramps, and diarrhea.',
      'It is a **digestive** problem, not an immune reaction; many people tolerate small amounts.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Lactase around the world',
    image: 'ap-lactase-map',
    bullets: [
      'Keeping lactase into adulthood (**lactase persistence**) is common where dairy herding has a long history.',
      'In many other places, ==making less lactase as an adult is the usual pattern==.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order what happens when someone with lactose intolerance drinks milk.',
    items: [
      'Lactose reaches the small intestine',
      'Too little lactase is there to split it',
      'Lactose moves into the large intestine',
      'Bacteria ferment it into gases and acids',
      'Bloating and cramps follow',
    ],
    explanation:
      'Without enough lactase, lactose passes on to gut bacteria, which make gas and acid.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Intolerance versus allergy',
    columns: ['', 'Lactose intolerance', 'Milk allergy'],
    rows: [
      ['Cause', 'Too little **lactase** enzyme', '**Immune** reaction to milk proteins'],
      ['Trigger', 'Lactose (sugar)', 'Casein or whey proteins'],
      ['Symptoms', 'Bloating, cramps, diarrhea', 'Hives, vomiting, wheezing, **anaphylaxis**'],
      ['Small amounts', 'Often tolerated', '==Even tiny amounts can trigger it=='],
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Intolerance or allergy?',
    bins: ['Lactose intolerance', 'Milk allergy'],
    items: [
      ['An immune reaction to casein', 1],
      ['Caused by too little lactase', 0],
      ['Can cause anaphylaxis', 1],
      ['Small amounts are often fine', 0],
      ['Most common in young children, many outgrow it', 1],
    ],
    explanation:
      'Intolerance is about digesting a sugar; allergy is the immune system reacting to proteins.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Lactose-free milk',
    bullets: [
      'Regular milk with **lactase added**, which splits lactose before you drink it.',
      'Same protein, calcium, and fat as regular milk.',
      'Tastes ==slightly sweeter==, because glucose plus galactose taste sweeter than lactose; no sugar is added.',
      'It still has milk proteins, so it is **not safe for milk allergy**.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why is lactose-free milk unsafe for someone with a milk allergy?',
    options: [
      'It still contains milk proteins like casein and whey',
      'It has extra sugar added',
      'It is not pasteurized',
      'It contains soy',
    ],
    answer: 0,
    explanation: 'Only the lactose is broken down; the proteins that trigger the allergy remain.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Non-dairy “milk” products',
    bullets: [
      'Made from **soy, almonds, oats, rice, coconut, or peas**.',
      '**Soy milk** has protein close to cow’s milk; almond and rice milks have much less.',
      'Most are ==fortified with calcium, vitamin D, and B₁₂==, but nutrients vary by brand.',
      'No lactose or milk proteins, but **soy and tree nuts are allergens too**.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'Which plant-based drink is closest to cow’s milk in protein?',
    options: ['Soy milk', 'Almond milk', 'Rice milk', 'Coconut milk'],
    answer: 0,
    explanation:
      'Soy milk is close to cow’s milk in protein; almond and rice milks are much lower.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Health benefits of dairy',
    bullets: [
      'Dairy supplies **protein, calcium, vitamin D, and potassium**, which many people lack.',
      'Dairy is linked to ==better bone health in children and teens==.',
      'Fermented dairy provides **probiotics**.',
      'Guidelines suggest **low-fat or fat-free** choices to limit saturated fat.',
      'People who avoid dairy can use fortified alternatives, leafy greens, and canned fish with bones.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'Someone avoids all dairy. Which food could help them get calcium?',
    options: ['Canned fish with bones', 'White rice', 'Unfortified apple juice', 'Plain pasta'],
    answer: 0,
    explanation:
      'Fortified alternatives, leafy greens, and canned fish with soft bones all supply calcium.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Designing notebook experiments',
    steps: [
      { label: 'Requirement', detail: 'At least **3 experiments for each of the 3 lab tasks**.' },
      { label: 'One variable', detail: 'Each has ==only one independent variable==.' },
      { label: 'Control', detail: 'Keep everything else constant (controlled variables).' },
      { label: 'Repeat', detail: 'Run repeated trials; record tables with units.' },
      { label: 'Conclude', detail: 'Graph results and state a conclusion with sources of error.' },
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt:
      'A team tests how vinegar volume affects curd mass. Sort each item by its role in the experiment.',
    bins: ['Independent variable', 'Dependent variable', 'Controlled variable'],
    items: [
      ['Vinegar volume (1, 2, 3, 4 mL)', 0],
      ['Curd mass', 1],
      ['Milk volume (120 mL)', 2],
      ['Drain time (15 min)', 2],
      ['Milk temperature', 2],
    ],
    explanation:
      'Change only vinegar volume, measure curd mass, and hold everything else the same.',
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: plan one experiment',
    problem: 'Design an experiment testing how vinegar volume affects curd mass.',
    steps: [
      '**Independent variable**: vinegar volume (1, 2, 3, and 4 mL).',
      '**Controlled**: 120 mL of the same milk, room temperature, 30 s swirling, 5 min rest, 15 min drain.',
      '**Dependent**: curd mass, converted to percent curd, with three trials per level.',
    ],
    conclusion:
      'Plot percent curd against vinegar volume and ==state a conclusion your data supports==, with sources of error.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Lactase', back: 'Enzyme that splits lactose into glucose and galactose.' },
      { front: 'Milk allergy', back: 'Immune reaction to milk proteins.' },
      { front: 'Anaphylaxis', back: 'Severe, life-threatening allergic reaction.' },
      { front: 'Independent variable', back: 'The one factor deliberately changed.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Intolerance** is too little lactase; **allergy** is an immune reaction to milk proteins.',
      'Lactose-free milk still has milk proteins, so ==it is not safe for milk allergy==.',
      'Plant “milks” vary in protein and are fortified to resemble dairy.',
      'Notebook experiments change one variable and keep the rest constant.',
    ],
  },
]);

export const foodDecksApplied = [processing, labels, sensitivities];
