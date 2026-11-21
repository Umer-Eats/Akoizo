import { defineDeck, type Deck } from './presentation-types.ts';

// Anatomy and Physiology, units 5–6: digestive anatomy, physiology, and pathophysiology.

const upperGut = defineDeck('anat-u5-l1', [
  {
    kind: 'title',
    title: 'Alimentary canal: mouth to stomach',
    subtitle:
      'Following a bite of food from chewing to chyme, and how the stomach avoids digesting itself.',
    objectives: [
      'Trace bolus movement and the sphincters that control it.',
      'Explain salivary, gastric, and enzymatic digestion.',
      'Describe stomach layers and mucosal protection.',
      'Localize ulcer and reflux pathology.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: why doesn’t stomach acid dissolve the stomach itself?',
    options: [
      'A mucus-bicarbonate barrier protects it',
      'Stomach acid is weak',
      'The stomach wall is made of bone',
      'Not sure yet',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Mouth, pharynx, and esophagus',
    image: 'ap-digestive-system',
    caption:
      'The alimentary canal runs from mouth to anus; accessory organs (salivary glands, liver, gallbladder, pancreas) add secretions.',
    bullets: [
      '**Chewing** is mechanical digestion; **salivary amylase** starts chemical digestion of starch.',
      'The uvula and epiglottis route the bolus past the airway.',
      '**Peristalsis** moves the bolus; the **lower esophageal sphincter** blocks reflux.',
      'Trouble swallowing solids suggests a stricture; solids ==and== liquids suggests a motility problem.',
    ],
  },
  {
    kind: 'sort',
    section: 0,
    prompt: 'Is each process mechanical or chemical digestion?',
    bins: ['Mechanical', 'Chemical'],
    items: [
      ['Chewing', 0],
      ['Salivary amylase on starch', 1],
      ['Stomach churning', 0],
      ['Lingual lipase on fat', 1],
      ['Pepsin on protein', 1],
    ],
    explanation:
      'Mechanical processes break food into smaller pieces; chemical digestion uses enzymes to break covalent bonds.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Stomach anatomy',
    image: 'ap-stomach',
    caption:
      'Regions: **cardia, fundus, body, antrum, pylorus**. Rugae fold the lining so the stomach can expand.',
    bullets: [
      'Muscularis externa has **three layers**: longitudinal, circular, and an inner oblique layer.',
      'The **pyloric sphincter** meters chyme into the duodenum.',
      'Vagal parasympathetics stimulate secretion and motility; sympathetics inhibit.',
      'The lesser curvature and pylorus are ==common ulcer sites==.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the stomach regions from where food enters to where it leaves.',
    items: ['Cardia', 'Fundus', 'Body', 'Antrum', 'Pylorus'],
    explanation:
      'Food enters at the cardia, the fundus bulges above it, the body is the main chamber, and the antrum narrows to the pylorus.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Gastric secretions',
    image: 'ap-stomach-histology',
    caption: 'Gastric pits open into glands lined with different secretory cells.',
    bullets: [
      '**Parietal cells**: HCl and intrinsic factor. **Chief cells**: pepsinogen.',
      '**G cells**: gastrin. **Mucous neck cells**: protective mucus and bicarbonate.',
      'HCl kills microbes, denatures protein, and ==turns pepsinogen into pepsin== near pH 2.',
      'Histamine (H2 receptors) boosts acid; somatostatin inhibits it.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each gastric cell to what it secretes.',
    pairs: [
      ['Parietal cell', 'HCl and intrinsic factor'],
      ['Chief cell', 'Pepsinogen'],
      ['G cell', 'Gastrin'],
      ['Mucous neck cell', 'Mucus and bicarbonate'],
    ],
    explanation:
      'Parietal cells acidify, chief cells supply the inactive protease, G cells signal, and mucous cells protect.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Protection and failure',
    bullets: [
      'Defenses: mucus-bicarbonate layer, tight junctions, fast cell turnover, prostaglandin-driven blood flow.',
      '**NSAIDs** block prostaglandins; alcohol and bile injure directly.',
      '**H. pylori** uses urease to alkalinize its niche and triggers inflammation.',
      'Chronic reflux can cause **Barrett metaplasia**, which ==raises adenocarcinoma risk==.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt: 'How do NSAIDs make ulcers more likely?',
    options: [
      'They block protective prostaglandins',
      'They raise stomach pH',
      'They kill parietal cells',
      'They thicken the mucus layer',
    ],
    answer: 0,
    explanation:
      'Prostaglandins support mucus, bicarbonate, and blood flow. Blocking them weakens the barrier against normal acid.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Motility and testing',
    bullets: [
      'Liquids empty faster than solids; high glucose and opioids slow emptying.',
      '**Dumping syndrome** after gastrectomy: early vasomotor symptoms, late hypoglycemia.',
      'Endoscopy sees the lining; urea breath or stool antigen tests detect **H. pylori**.',
      'Barium swallow shows strictures and the **bird-beak** narrowing of achalasia.',
    ],
  },
  {
    kind: 'match',
    section: 4,
    prompt: 'Match each test to what it shows best.',
    pairs: [
      ['Upper endoscopy', 'The lining itself, directly'],
      ['Urea breath test', 'Active H. pylori infection'],
      ['Esophageal manometry', 'Pressure and motility of the esophagus'],
      ['Barium swallow', 'The outline of strictures and achalasia'],
    ],
    explanation:
      'Pick the test that measures the property in question: structure, infection, or motility.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Track food, enzymes, and signals separately',
    bullets: [
      'Food moves in the **lumen**; secretions enter it; hormones and nerves act through other routes.',
      '==Gastrin is a hormone, not an enzyme==, and bile is made by the liver, not the gallbladder.',
      'Peristalsis works by sequential contraction, not gravity alone.',
      'Gastric mixing makes **chyme**, released in small portions into the duodenum.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each substance a digestive enzyme or a signal?',
    bins: ['Digestive enzyme', 'Signaling hormone'],
    items: [
      ['Pepsin', 0],
      ['Gastrin', 1],
      ['Salivary amylase', 0],
      ['Secretin', 1],
      ['Cholecystokinin (CCK)', 1],
      ['Lingual lipase', 0],
    ],
    explanation:
      'Enzymes break bonds in food inside the lumen; hormones travel in blood to coordinate secretion and movement.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Secretion and protection at the cell level',
    bullets: [
      'Chief cells release **pepsinogen**, an inactive precursor, so they do not digest themselves.',
      'Surface mucus keeps a ==less acidic microlayer next to the tissue==.',
      'Pits open into glands; **rugae** are larger folds. They are not synonyms.',
      'Losing intrinsic factor causes B12 malabsorption downstream in the **terminal ileum**.',
    ],
  },
  {
    kind: 'example',
    section: 6,
    title: 'Worked example: a B12 absorption failure',
    problem:
      'Parietal-cell function is lost. Dietary B12 is adequate, yet B12 absorption is poor. Explain why.',
    steps: [
      'Parietal cells supply acid and **intrinsic factor**.',
      'Adequate intake cannot replace a missing binding partner.',
      'Intrinsic factor–bound B12 is normally taken up in the **terminal ileum**.',
      'The defect starts in the stomach but shows up as an intestinal absorption problem.',
    ],
    conclusion: 'Digestive cases often need ==a chain of functions across several organs==.',
  },
  {
    kind: 'order',
    section: 6,
    prompt: 'Order B12’s path from a meal into the body.',
    items: [
      'B12 is released from food proteins in the stomach',
      'Parietal cells secrete intrinsic factor',
      'B12 binds intrinsic factor in the small intestine',
      'The complex is absorbed in the terminal ileum',
    ],
    explanation:
      'Without intrinsic factor from the stomach, the ileum cannot absorb B12, however much is eaten.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Coordinating a meal',
    bullets: [
      '**Cephalic phase**: sight, smell, and thought trigger neural secretion.',
      '**Gastric phase**: distension and peptides stimulate the stomach.',
      '**Intestinal phase**: duodenal feedback slows emptying to match processing.',
      '**Secretin** answers acid; **CCK** answers fat and protein. ==Each signal has its own trigger.==',
    ],
  },
  {
    kind: 'match',
    section: 7,
    prompt: 'Match each duodenal input to the hormone that answers it.',
    pairs: [
      ['Acidic chyme', 'Secretin, releasing bicarbonate'],
      ['Fat and protein products', 'CCK, releasing enzymes and bile'],
      ['Distension and peptides in the stomach', 'Gastrin, raising acid'],
      ['Too much acid in the stomach', 'Somatostatin, lowering acid'],
    ],
    explanation:
      'Different inputs call for different responses; not every hormone simply “increases digestion”.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Peristalsis', back: 'A coordinated wave of contraction that propels contents.' },
      { front: 'Pepsin', back: 'Acid-activated protease made from pepsinogen.' },
      { front: 'Barrett esophagus', back: 'Intestinal-type metaplasia from chronic reflux.' },
      { front: 'Gastrin', back: 'G-cell hormone stimulating acid and mucosal growth.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Digestion is mechanical and chemical from the very first bite.',
      'Parietal, chief, G, and mucous cells each have a distinct product.',
      '==Ulcers form when exposure outweighs the mucosal barrier.==',
      'Hormones coordinate the meal; enzymes do the digesting.',
    ],
  },
]);

const lowerGut = defineDeck('anat-u5-l2', [
  {
    kind: 'title',
    title: 'Small intestine, liver, pancreas, and absorption',
    subtitle:
      'Where most digestion and absorption happen, and the accessory organs that make it possible.',
    objectives: [
      'Map duodenum, jejunum, and ileum specializations.',
      'Explain bile, pancreatic enzymes, and brush-border digestion.',
      'Describe nutrient absorption routes and vitamins.',
      'Interpret gallstone, pancreatitis, and celiac cases.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: which organ makes bile?',
    options: ['Liver', 'Gallbladder', 'Pancreas', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Small intestine architecture',
    image: 'ap-villi',
    caption:
      'Circular folds, **villi**, and **microvilli** stack up to about 200 m² of absorptive surface.',
    bullets: [
      '**Duodenum** receives bile and pancreatic juice at the ampulla of Vater.',
      '**Jejunum**: tall folds and villi, where most absorption happens.',
      '**Ileum**: absorbs B12 and bile salts; Peyer patches sample antigens.',
      'Brush-border enzymes (lactase, sucrase, maltase) ==finish carbohydrate digestion==.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each segment of the small intestine to its specialty.',
    pairs: [
      ['Duodenum', 'Receives bile and pancreatic juice'],
      ['Jejunum', 'Absorbs most nutrients'],
      ['Ileum', 'Absorbs B12 and bile salts'],
      ['Peyer patches', 'Sample gut antigens for the immune system'],
    ],
    explanation:
      'Each segment is specialized; the terminal ileum is the only site for B12–intrinsic factor uptake.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Liver and bile',
    image: 'ap-liver-lobule',
    caption:
      'A liver lobule: blood flows from portal triads at the edges toward a central vein, past rows of hepatocytes.',
    bullets: [
      'The liver makes bile, stores glycogen, makes albumin and clotting factors, and detoxifies drugs.',
      '**Bile salts** emulsify fat; micelles ferry fatty acids to enterocytes.',
      '**Enterohepatic circulation** reclaims bile salts in the ileum.',
      'A common bile duct stone causes ==jaundice with raised direct bilirubin==.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'What do bile salts do to dietary fat?',
    options: [
      'Emulsify it and help form micelles',
      'Cleave its ester bonds like an enzyme',
      'Convert it into glucose',
      'Absorb it directly into blood',
    ],
    answer: 0,
    explanation:
      'Bile salts are detergents, not enzymes. They disperse fat so lipase can work and micelles can carry the products.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Exocrine pancreas',
    image: 'ap-pancreas',
    caption:
      'Pancreatic **acinar** cells make enzymes; **duct** cells add bicarbonate. Islets are the separate endocrine part.',
    bullets: [
      'Acinar cells secrete trypsinogen, chymotrypsinogen, amylase, and lipase.',
      '**Enterokinase** activates trypsin, which activates the other zymogens.',
      'Premature activation causes ==autodigestion: pancreatitis==.',
      'Pancreatitis: epigastric pain to the back, high lipase. Top causes: gallstones and alcohol.',
    ],
  },
  {
    kind: 'order',
    section: 2,
    prompt: 'Order the activation of pancreatic proteases.',
    items: [
      'Acinar cells secrete inactive trypsinogen',
      'Trypsinogen reaches the duodenum',
      'Enterokinase on the brush border activates trypsin',
      'Trypsin activates chymotrypsinogen and other zymogens',
    ],
    explanation:
      'Keeping enzymes inactive until they reach the intestine protects the pancreas from digesting itself.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Absorption routes',
    bullets: [
      'Carbohydrates enter as glucose, galactose, and fructose; proteins as amino acids and small peptides.',
      'Fats travel as micelles, then are rebuilt into **chylomicrons** that enter **lacteals**.',
      'Vitamins **A, D, E, and K** follow fat; B12 needs intrinsic factor and the terminal ileum.',
      'Water follows sodium; ==oral rehydration uses sodium-glucose cotransport== to pull water in.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'After absorption, does each nutrient leave the gut mainly in blood or in lymph?',
    bins: ['Portal blood', 'Lymph (lacteals)'],
    items: [
      ['Glucose', 0],
      ['Amino acids', 0],
      ['Chylomicrons from long-chain fats', 1],
      ['Fructose', 0],
      ['Vitamin A packaged with fat', 1],
    ],
    explanation:
      'Water-soluble products go to portal blood; long-chain fats and fat-soluble vitamins ride chylomicrons into lymph.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Malabsorption patterns',
    bullets: [
      '**Celiac disease**: gluten-triggered villous atrophy, anti-tTG antibodies, iron deficiency.',
      '**Cystic fibrosis**: pancreatic insufficiency with greasy stools.',
      '**Crohn disease**: anywhere in the gut, transmural, skip lesions, fistulas.',
      '**Ulcerative colitis**: colon mucosa only, ==continuous from the rectum==.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'Crohn disease or ulcerative colitis?',
    bins: ['Crohn disease', 'Ulcerative colitis'],
    items: [
      ['Skip lesions', 0],
      ['Continuous from the rectum', 1],
      ['Transmural inflammation and fistulas', 0],
      ['Mucosa-only inflammation', 1],
      ['Can affect mouth to anus', 0],
      ['Toxic megacolon risk', 1],
    ],
    explanation:
      'Crohn disease is patchy, deep, and anywhere; ulcerative colitis is continuous, superficial, and limited to the colon.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Three parallel pathways for a mixed meal',
    steps: [
      {
        label: 'Carbohydrate',
        detail: 'Hydrolyzed to monosaccharides → SGLT1 or facilitated transport → portal blood.',
      },
      {
        label: 'Protein',
        detail:
          'Gastric, pancreatic, and brush-border digestion → amino acids and peptides → portal blood.',
      },
      {
        label: 'Long-chain fat',
        detail: 'Bile and lipase → micelles → chylomicrons → lacteals → lymph → blood.',
      },
    ],
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Name the whole path',
    bullets: [
      'For any enzyme, name its ==substrate, source, destination, and product==.',
      'Glucose and galactose use sodium-linked transport; fructose uses facilitated transport.',
      'Most absorbed peptides are broken down further inside the enterocyte.',
      'Many short-chain fatty acids enter portal blood directly, so lymph is not the route for every lipid.',
    ],
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Secretions match the chemical environment',
    bullets: [
      '**Secretin** answers acid with bicarbonate from pancreatic ducts.',
      '**CCK** answers fat and protein with enzymes and gallbladder contraction.',
      'The liver makes bile; the gallbladder ==stores and concentrates it==.',
      'Folds, villi, and microvilli enlarge area at three different scales.',
    ],
  },
  {
    kind: 'mcq',
    section: 6,
    prompt:
      'A villus-flattening disease and a single brush-border enzyme deficiency are compared. Which affects more nutrient pathways?',
    options: [
      'Villus flattening',
      'The single enzyme deficiency',
      'Both affect only carbohydrate',
      'Neither affects absorption',
    ],
    answer: 0,
    explanation:
      'Losing villus area impairs many pathways at once; one missing enzyme mainly affects its one substrate.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Mass balance for malabsorption',
    bullets: [
      'Split every nutrient’s path into **delivery, digestion, uptake, and transport away**.',
      'Unabsorbed solute ==holds water in the lumen==; colonic bacteria ferment it into gas.',
      'A model of one step does not predict every symptom of a meal.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: a fat-absorption pattern',
    problem:
      'Pancreatic enzyme production is normal, but bile delivery to the small intestine is greatly reduced. Which step is most directly affected?',
    steps: [
      'Lipase is present, but fat dispersion and **micelle** transport are impaired.',
      'Expect poorer absorption of long-chain fats and **fat-soluble vitamins**.',
      'Glucose and amino-acid pathways do not depend on micelles in the same way.',
      'Normal route after uptake: chylomicrons → lacteals → lymph → blood.',
    ],
    conclusion: 'A strong answer names ==the disrupted step and why the effect is selective==.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Enterohepatic circulation',
        back: 'Bile salts reabsorbed in the ileum and reused by the liver.',
      },
      { front: 'Chylomicron', back: 'Lipoprotein carrying absorbed fat into lymph.' },
      { front: 'Enterokinase', back: 'Brush-border enzyme that activates trypsinogen.' },
      { front: 'SGLT1', back: 'Sodium-glucose cotransporter driving sugar uptake.' },
    ],
  },
  {
    kind: 'fill',
    prompt: 'Complete the summary.',
    text: 'The liver makes bile and the {0} stores it. Bile salts {1} fat, and absorbed long-chain fats leave enterocytes as {2} that enter lacteals.',
    blanks: ['gallbladder', 'emulsify', 'chylomicrons'],
    distractors: ['pancreas', 'hydrolyze', 'micelles'],
    explanation:
      'The gallbladder stores bile, bile salts emulsify rather than digest, and chylomicrons carry fat into lymph.',
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Folds, villi, and microvilli give the small intestine its huge surface.',
      'Bile emulsifies; pancreatic enzymes digest; zymogens wait until the duodenum.',
      '==Water-soluble nutrients go to portal blood; long-chain fats go to lymph.==',
      'Locate malabsorption by delivery, digestion, uptake, or transport.',
    ],
  },
]);

const ulcers = defineDeck('anat-u6-l1', [
  {
    kind: 'title',
    title: 'Ulcers, GI bleeding, and GI cancers',
    subtitle:
      'When the barrier breaks, when blood appears, and when cells stop following the rules.',
    objectives: [
      'Explain H. pylori ulcer pathogenesis and treatment.',
      'Distinguish upper and lower GI bleeding signs.',
      'Outline colorectal, gastric, and esophageal cancer risks.',
      'Apply screening and red-flag logic.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: what causes most stomach and duodenal ulcers?',
    options: ['Stress and spicy food', 'H. pylori and NSAIDs', 'Too much water', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Ulcer disease',
    image: 'ap-gastric-ulcer',
    caption:
      'An ulcer seen at endoscopy: a break in the lining that goes deeper than a surface erosion.',
    bullets: [
      '**Duodenal** ulcers: strongly tied to **H. pylori** and acid; often better with food.',
      '**Gastric** ulcers: tied to **NSAIDs**, bile reflux, and weak defense.',
      'Test with urea breath, stool antigen, or biopsy; treat with antibiotics plus a PPI.',
      'Perforation: sudden severe pain, rigid abdomen, ==free air under the diaphragm==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'After H. pylori treatment, what should happen next?',
    options: [
      'Confirm eradication with a follow-up test',
      'Nothing; symptoms are enough',
      'Start NSAIDs',
      'Remove the stomach',
    ],
    answer: 0,
    explanation:
      'Treatment can fail, so eradication is confirmed with a urea breath or stool antigen test.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'GI bleeding logic',
    bullets: [
      '**Melena** (black, tarry stool) often reflects digested blood from an **upper** source.',
      '**Hematochezia** (bright red blood) usually suggests a **lower** source.',
      'A brisk upper bleed can move fast enough to look red.',
      '**Coffee-ground** vomit is blood altered by acid. ==Color alone does not fix the site or severity.==',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Which source does each finding usually suggest?',
    bins: ['Upper GI source', 'Lower GI source'],
    items: [
      ['Black, tarry stool', 0],
      ['Coffee-ground vomit', 0],
      ['Bright red blood from a slow left-colon bleed', 1],
      ['Vomiting fresh blood', 0],
      ['Bleeding diverticulum in the sigmoid colon', 1],
    ],
    explanation:
      'Blood exposed to acid and digestion darkens; lower bleeds stay red. These are tendencies, not absolutes.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Colorectal cancer',
    image: 'ap-colon-polyp',
    caption: 'An adenomatous polyp: most colorectal cancers grow from polyps like this over years.',
    bullets: [
      '**Left-sided** lesions obstruct and narrow stools; **right-sided** lesions bleed slowly and cause iron deficiency.',
      'Screening: colonoscopy, FIT, or stool DNA; earlier with family history or IBD.',
      'Spreads to the **liver** through portal drainage; CEA tracks recurrence but ==does not screen==.',
      '**Lynch syndrome**: mismatch-repair defects. **FAP**: hundreds of polyps.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Is each finding more typical of a right-sided or left-sided colon cancer?',
    bins: ['Right-sided', 'Left-sided'],
    items: [
      ['Iron-deficiency anemia from slow bleeding', 0],
      ['Pencil-thin stools', 1],
      ['Obstruction and changed bowel habit', 1],
      ['Fatigue with occult blood', 0],
    ],
    explanation:
      'The right colon is wide with liquid contents, so tumors bleed quietly; the narrower left colon obstructs.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Upper GI cancers',
    bullets: [
      'Esophageal **squamous** cancer: smoking and alcohol. **Adenocarcinoma**: Barrett esophagus and obesity.',
      '**Gastric** cancer: H. pylori, smoked foods, chronic gastritis.',
      '**Pancreatic** cancer: late, with weight loss, new diabetes, and ==painless jaundice==.',
      'Swallowing trouble that progresses from solids to liquids suggests a mechanical tumor.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each cancer to its strongest risk link.',
    pairs: [
      ['Esophageal adenocarcinoma', 'Barrett esophagus from chronic reflux'],
      ['Esophageal squamous cell carcinoma', 'Smoking and alcohol'],
      ['Gastric cancer', 'H. pylori and chronic gastritis'],
      ['Colorectal cancer', 'Adenomatous polyps'],
    ],
    explanation: 'Risk factors shift probabilities; they are not guarantees.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Prevention and counseling',
    bullets: [
      'Fiber, activity, limited alcohol, no smoking, and treating H. pylori lower risk.',
      'High-risk NSAID users need stomach protection.',
      'Giving iron alone to an older adult with anemia ==can miss a GI cancer==.',
      'Next test: endoscopy for upper, colonoscopy for lower, urea breath for H. pylori.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'A 65-year-old has new iron-deficiency anemia and no obvious blood loss. What is the key next step?',
    options: [
      'Investigate the GI tract, including colonoscopy',
      'Give iron and stop there',
      'Retest in five years',
      'Start NSAIDs',
    ],
    answer: 0,
    explanation:
      'Silent bleeding from a right-sided colon cancer is a classic cause, so the GI tract must be examined.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Injury is exposure versus defense',
    bullets: [
      'Acid and proteases are normal; injury comes when ==exposure outweighs protection==.',
      'H. pylori and NSAIDs harm the barrier by different routes.',
      'Pain timing with meals is not specific enough to locate an ulcer.',
      'Depth matters: mucosa, submucosa, muscle, and serosa fail in different ways.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each ulcer complication to the layer it involves.',
    pairs: [
      ['Superficial erosion', 'Mucosa only'],
      ['Bleeding ulcer', 'Erodes into a submucosal vessel'],
      ['Perforation', 'Breaks through the full wall'],
      ['Pyloric obstruction', 'Scarring narrows the outlet'],
    ],
    explanation: 'Deeper injury produces different complications than surface irritation.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'From altered cells to organ effects',
    bullets: [
      'Cancer: uncontrolled growth, invasion, and spread. ==Size alone does not separate benign from malignant.==',
      '**Dysplasia** is abnormal growth; **invasion** means crossing a tissue boundary.',
      '**Metaplasia** (like Barrett) changes cell type and raises risk, but does not always progress.',
      'Not every polyp becomes cancer, and not every cancer follows one route.',
    ],
  },
  {
    kind: 'order',
    section: 6,
    prompt: 'Order the adenoma-to-carcinoma sequence.',
    items: [
      'Normal colonic epithelium',
      'Adenomatous polyp',
      'High-grade dysplasia',
      'Invasive carcinoma',
      'Spread to the liver',
    ],
    explanation:
      'This model fits many colorectal cancers, and screening aims to remove polyps before invasion.',
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Reading blood with transit in mind',
    bullets: [
      'Digestion darkens blood; ==speed of bleeding changes its color==.',
      'Coffee grounds show altered blood, not how much was lost.',
      'Use color as one clue alongside location, history, and test results.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: two mechanisms of dysfunction',
    problem:
      'Case A: weak mucus protection and a focal mucosal defect. Case B: an invasive colonic lesion narrowing the lumen.',
    steps: [
      'A: reduced defense exposes tissue to acid and enzymes, so the problem is **barrier injury**.',
      'B: abnormal growth and invasion narrow the lumen and impair propulsion.',
      'Both may bleed, so ==bleeding alone does not separate them==.',
    ],
    conclusion: 'A shared symptom does not erase the anatomical differences behind it.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Melena', back: 'Black, tarry stool, usually from upper GI bleeding.' },
      { front: 'Hematochezia', back: 'Bright red blood per rectum, usually a lower source.' },
      { front: 'Adenoma-carcinoma sequence', back: 'Polyp progression to colorectal cancer.' },
      { front: 'Lynch syndrome', back: 'Inherited mismatch-repair defect with multiple cancers.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'H. pylori and NSAIDs break the mucosal barrier by different routes.',
      'Dark blood suggests upper, red suggests lower, but transit time matters.',
      '==Most colorectal cancers start as polyps==, so screening removes them early.',
      'Anemia in an older adult needs a GI workup, not just iron.',
    ],
  },
]);

const lactose = defineDeck('anat-u6-l2', [
  {
    kind: 'title',
    title: 'Lactose intolerance, obesity, and exercise metabolism',
    subtitle: 'An enzyme limit, a whole-body energy balance, and a gut under exercise stress.',
    objectives: [
      'Explain lactase deficiency and hydrogen breath testing.',
      'Contrast lactose intolerance with milk allergy and celiac disease.',
      'Describe obesity effects on the gut, liver, and joints.',
      'Explain exercise fuel use and gut effects.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: is lactose intolerance an allergy?',
    options: ['Yes', 'No', 'Sometimes', 'Not sure yet'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Lactose intolerance mechanism',
    image: 'ap-lactase-map',
    caption:
      'Lactase persistence into adulthood varies widely across populations because of genetic regulatory variants.',
    bullets: [
      '**Lactase** splits lactose into glucose and galactose at the brush border.',
      'Most people ==lower lactase after weaning==.',
      'Undigested lactose draws water in and is **fermented** into hydrogen, methane, and acids.',
      'Symptoms 30 min–2 h after dairy; diagnose with a **hydrogen breath test**.',
    ],
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order what happens when someone with low lactase drinks milk.',
    items: [
      'Lactose reaches the small intestine',
      'Too little lactase hydrolyzes only part of it',
      'Undigested lactose draws water into the lumen',
      'Colonic bacteria ferment the lactose',
      'Hydrogen rises in exhaled breath',
    ],
    explanation:
      'The enzyme shortfall leaves substrate that pulls water osmotically and feeds bacteria, which make hydrogen.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Mimics to separate',
    columns: ['Condition', 'Mechanism', 'Clue'],
    rows: [
      ['Lactose intolerance', 'Enzyme shortfall for a sugar', 'Bloating and diarrhea after dairy'],
      ['Milk allergy', '**Immune response to milk protein**', 'Hives, wheeze, or anaphylaxis'],
      ['Celiac disease', 'Immune damage to villi from gluten', 'Anti-tTG antibodies, anemia'],
      ['Irritable bowel', 'Sensitivity to many FODMAPs', 'Symptoms with many foods'],
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'A child gets hives and wheezing minutes after drinking milk. What is the right plan?',
    options: [
      'Treat as milk allergy: avoid milk protein and plan for epinephrine',
      'Lactase pills with each meal',
      'Switch to lactose-free milk only',
      'No action needed',
    ],
    answer: 0,
    explanation:
      'This is an immune reaction to milk protein. Lactose-free milk still contains the protein.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Secondary and congenital loss',
    bullets: [
      '**Secondary** lactase loss follows gastroenteritis, celiac, or Crohn injury to villus tips.',
      'It ==often recovers as the lining heals==.',
      '**Congenital** lactase deficiency is rare and severe from birth.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Obesity and the gut',
    bullets: [
      'Raises the risk of reflux, gallstones, fatty liver, and colorectal cancer.',
      'Inflamed adipose tissue drives **insulin resistance**.',
      '==Even modest weight loss== improves reflux, liver fat, and blood sugar.',
      'Rapid weight loss can trigger gallstones; gradual loss is safer.',
    ],
  },
  {
    kind: 'multi',
    section: 2,
    prompt: 'Which conditions does obesity make more likely? Select all that apply.',
    options: [
      'Reflux (GERD)',
      'Gallstones',
      'Fatty liver disease',
      'Colorectal cancer',
      'Lactase deficiency',
    ],
    answers: [0, 1, 2, 3],
    explanation:
      'Obesity raises risk for reflux, gallstones, fatty liver, and colorectal cancer. Lactase levels are set by genetics and gut injury.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Exercise fuel and the gut',
    bullets: [
      '**High intensity** burns glycogen first; **moderate** blends glucose and fat; **long, easy** exercise favors fat.',
      '**Splanchnic shunting** diverts blood from the gut during hard exercise.',
      'Sodium plus glucose uses **SGLT1** to speed fluid absorption.',
      'NSAIDs before races raise gut permeability and kidney risk.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each exercise type to its main fuel.',
    pairs: [
      ['All-out 400 m sprint', 'Muscle glycogen'],
      ['Steady 30-minute jog', 'A blend of glucose and fat'],
      ['Three-hour easy hike', 'Mostly fat once glycogen falls'],
    ],
    explanation: 'Intensity and duration set the fuel mix; training and food intake shift it too.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Practical management',
    bullets: [
      'Smaller portions, hard cheeses, yogurt, and lactase tablets with dairy.',
      'Replace **calcium and vitamin D** if dairy is cut.',
      'Lactose hides in whey, milk solids, and some medicines.',
      'One cup of milk has about **12 g** of lactose. ==Probiotics do not restore human lactase.==',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'One cup of milk has about 12 g of lactose. How many grams are in 2.5 cups?',
    answer: 30,
    tolerance: 0,
    unit: 'g',
    explanation: '2.5 × 12 g = 30 g of lactose.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Enzyme deficiency versus immune response',
    bullets: [
      '**Malabsorption** is incomplete absorption; **intolerance** adds symptoms.',
      'Dose, transit, gut bacteria, and sensitivity all change the outcome.',
      'Milk allergy targets **proteins**; removing lactose ==does not remove the allergen==.',
      'Identify the substrate, the tissue, and the type of process before naming a label.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Is each condition an enzyme problem or an immune problem?',
    bins: ['Enzyme (digestive) problem', 'Immune-mediated problem'],
    items: [
      ['Lactose intolerance', 0],
      ['Milk-protein allergy', 1],
      ['Celiac disease', 1],
      ['Congenital lactase deficiency', 0],
    ],
    explanation:
      'Lactase problems are about an enzyme and a sugar; allergy and celiac disease involve the immune system.',
  },
  {
    kind: 'bullets',
    section: 6,
    title: 'Energy balance without oversimplifying',
    bullets: [
      'Body mass depends on intake, expenditure, absorption, hormones, genetics, sleep, and medicines.',
      'Energy is conserved, but ==the body adjusts both sides of the balance==.',
      'Adipose tissue is metabolically active and signals with hormones.',
      'Keep immediate exercise responses separate from adaptations over weeks.',
    ],
  },
  {
    kind: 'bullets',
    section: 7,
    title: 'Design a controlled comparison',
    bullets: [
      'Change **one factor** and hold the rest fixed.',
      'Compare equal lactose loads at different capacities, then equal capacities at different loads.',
      'The measured output is ==unhydrolyzed lactose, not symptom severity==.',
    ],
  },
  {
    kind: 'example',
    section: 7,
    title: 'Worked example: a substrate balance',
    problem:
      'A model supplies 24 g of lactose. In one setting 18 g can be hydrolyzed; in another, only 6 g.',
    steps: [
      'Use **residual = max(0, input − hydrolysis capacity)**.',
      'Setting 1: 24 − 18 = 6 g left. Setting 2: 24 − 6 = 18 g left.',
      'The second leaves three times the substrate, but not necessarily three times the symptoms.',
      'If capacity exceeds the load, the residual is zero, never negative.',
    ],
    conclusion:
      'A mass balance isolates mechanism ==while leaving clinical outcomes undetermined==.',
  },
  {
    kind: 'numeric',
    section: 7,
    prompt:
      'A meal supplies 20 g of lactose and the gut can hydrolyze 14 g. How many grams stay unhydrolyzed?',
    answer: 6,
    tolerance: 0,
    unit: 'g',
    explanation: 'Residual = 20 − 14 = 6 g.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Lactase persistence',
        back: 'Genetic continued lactase expression into adulthood.',
      },
      { front: 'Hydrogen breath test', back: 'Rise in exhaled H₂ from undigested carbohydrate.' },
      { front: 'NAFLD', back: 'Liver fat from metabolic disease; reversible early.' },
      { front: 'Splanchnic shunt', back: 'Blood diverted away from the gut during exercise.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Lactose intolerance is an enzyme shortfall; milk allergy is immune.',
      'Undigested lactose pulls in water and feeds gas-producing bacteria.',
      '==Change one factor at a time== to test a digestive mechanism.',
      'Exercise intensity sets the fuel mix; hard exercise diverts blood from the gut.',
    ],
  },
]);

export const anatomyDecksDigestive: Deck[] = [upperGut, lowerGut, ulcers, lactose];
