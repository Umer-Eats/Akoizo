import { defineDeck, type Deck } from './presentation-types.ts';

// Crime Busters (Division B) decks for chromatography, pattern evidence, and the written analysis.

const chromatography = defineDeck('cb-u5-l1', [
  {
    kind: 'title',
    title: 'Paper chromatography',
    subtitle:
      'Separate an ink into its dyes, measure each one, and ==compare it with the suspects’ pens==.',
    objectives: [
      'Explain how the **stationary phase** and **mobile phase** separate a mixture.',
      'Set up a chromatogram so the results are fair.',
      'Calculate and interpret **Rf values**.',
      'Match ink evidence to a suspect, and state the **limits** of a match.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: do you think all black pens use the same black ink?',
    options: [
      'Yes, black is black',
      'No, they use different dye mixtures',
      'Only pens of one brand match',
      'Not sure',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'How chromatography works',
    image: 'for-ink',
    caption:
      'Black ink separating on paper: the climbing solvent carries ==each dye a different distance==.',
    bullets: [
      'The **stationary phase** is the paper; it holds components back.',
      'The **mobile phase** is the solvent, which climbs by **capillary action**.',
      'Dyes that dissolve well and cling weakly to the paper **travel farther**.',
      'Dyes that cling strongly to the paper **travel less**.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each chromatography term to its meaning.',
    pairs: [
      ['Stationary phase', 'The paper, which holds components back'],
      ['Mobile phase', 'The solvent that moves up the paper'],
      ['Capillary action', 'Liquid moving through narrow spaces between fibers'],
      ['Chromatogram', 'The developed paper showing separated components'],
    ],
    explanation:
      'The solvent (mobile phase) climbs the paper (stationary phase) by capillary action, and the finished strip is the chromatogram.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Setting up a chromatogram',
    steps: [
      {
        label: 'Pencil start line',
        detail: 'Draw it **1–2 cm** from the bottom in **pencil**; pen ink would separate too.',
      },
      {
        label: 'Small spot',
        detail: 'Place a **small, concentrated** spot on the line and let it dry.',
      },
      {
        label: 'Solvent below spot',
        detail:
          'The solvent level must be ==below the spot==, or the sample dissolves into the pool.',
      },
      {
        label: 'Cover',
        detail: 'Cover the container so the air stays **saturated** with solvent.',
      },
      {
        label: 'Mark the front',
        detail:
          'Remove the paper before the solvent reaches the top and **mark the solvent front** at once.',
      },
    ],
  },
  {
    kind: 'multi',
    section: 1,
    prompt: 'Which setup mistakes would ruin a chromatogram? Choose all that apply.',
    options: [
      'Drawing the start line in ballpoint pen',
      'Filling the solvent above the sample spot',
      'Covering the container',
      'Forgetting to mark the solvent front',
      'Letting the spot dry before developing',
    ],
    answers: [0, 1, 3],
    explanation:
      'Pen ink would separate along with the sample, solvent above the spot washes the sample away, and without the solvent front you cannot calculate Rf. Covering and drying are correct steps.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Calculating Rf',
    image: 'for-tlc-rf',
    caption:
      'Rf is the spot’s distance from the start line divided by the **solvent front’s** distance, both measured from the start line.',
    bullets: [
      'Rf is always **between 0 and 1** and has **no units**.',
      'Measure to the **center** of each spot.',
      'Example: spot at 3.0 cm, front at 6.0 cm → ==Rf of 0.50==.',
      'Report Rf to **two decimal places**.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A spot’s center is 2.1 cm from the start line, and the solvent front is 7.0 cm from the start line. What is the Rf value?',
    answer: 0.3,
    tolerance: 0.005,
    explanation: 'Rf = 2.1 cm ÷ 7.0 cm = 0.30.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A student reports an Rf value of 1.4. What does that tell you?',
    options: [
      'The dye moved faster than the solvent',
      'A measurement or calculation mistake was made',
      'The dye is very soluble',
      'The paper was too long',
    ],
    answer: 1,
    explanation:
      'A spot can never travel farther than the solvent front, so Rf cannot be greater than 1. The distances were probably swapped.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'What affects Rf',
    bullets: [
      'For a given **solvent and paper**, each substance has a characteristic Rf.',
      'Changing the **solvent**, **paper type**, or **temperature** changes Rf values.',
      'So known samples must run ==on the same paper, under the same conditions==, as the evidence.',
      'That is why suspects’ pens are tested **side by side** with the ransom note ink.',
    ],
    callout: 'No marked solvent front means no Rf can be calculated.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: whose pen wrote the note?',
    problem:
      'The note’s ink gives a **blue spot at 2.4 cm** and a **yellow spot at 4.8 cm**; the solvent front is at **6.0 cm**. Suspect A’s pen gives Rf 0.40 and 0.80. Suspect B’s gives 0.40 and 0.65.',
    steps: [
      'Blue: Rf = 2.4 ÷ 6.0 = **0.40**.',
      'Yellow: Rf = 4.8 ÷ 6.0 = **0.80**.',
      'Suspect A matches both bands; suspect B’s yellow band (0.65) **does not**.',
    ],
    conclusion: 'The ink is ==consistent with suspect A’s pen==, but not suspect B’s.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Two black inks look identical on paper. One separates into blue and yellow bands, the other into blue and red bands. What can you conclude?',
    options: [
      'They are the same ink',
      'They are different inks',
      'Nothing, because both are black',
      'Both came from the same pen',
    ],
    answer: 1,
    explanation:
      'A match needs the same number of bands, colors, order, and Rf values. Different band colors mean different dye mixtures.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Limitations',
    bullets: [
      'A match shows the ink is **consistent with** a pen, not that it came from that exact pen.',
      'Many pens of one brand ==share the same ink==.',
      'Faint or **overlapping bands** are hard to measure.',
      'Some dyes do not move in a given solvent and stay on the start line: **Rf of 0**.',
      'State these limits and combine chromatography with other evidence.',
    ],
  },
  {
    kind: 'fill',
    section: 5,
    prompt: 'Complete the statement about a chromatography match.',
    text: 'A matching chromatogram shows the ink is {0} with the suspect’s pen. It does not prove the note came from that exact pen, because many pens of a brand {1} the same ink.',
    blanks: ['consistent', 'share'],
    distractors: ['identical', 'change', 'destroy'],
    explanation:
      'Ink is class evidence: it narrows the source to pens with that ink, which may include many pens of the same brand.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'The solvent (**mobile phase**) carries dyes up the paper (**stationary phase**) different distances.',
      'Use a **pencil** start line, keep the solvent **below the spot**, and **mark the solvent front**.',
      '**Rf = spot distance ÷ solvent front distance**, between 0 and 1, with no units.',
      'A match needs ==the same bands, colors, order, and Rf values==, and it shows only consistency.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'A teammate ran the ransom note ink on Monday and the suspects’ pens on Tuesday with a different solvent. Explain why the comparison is not fair and how to fix it.',
    model:
      'Rf values depend on the solvent, paper, and temperature, so inks run under different conditions cannot be compared. The fix is to run the note ink and all suspects’ pens side by side on the same paper in the same solvent at the same time.',
  },
]);

const patternEvidence = defineDeck('cb-u6-l1', [
  {
    kind: 'title',
    title: 'Fingerprints, DNA, prints, soil, and spatter',
    subtitle:
      'Pattern evidence: compare the big picture first, then ==the details that can rule people in or out==.',
    objectives: [
      'Classify fingerprints as **loops**, **whorls**, or **arches**.',
      'Compare **DNA electropherograms** between a scene and suspects.',
      'Read **shoe prints**, **tire treads**, and **soil** evidence.',
      'Describe **spatter** direction and speed without calculations.',
    ],
    image: 'for-fp-kit',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: look at your fingertip. Which pattern do you think you have?',
    options: ['Loop', 'Whorl', 'Arch', 'Cannot tell'],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Fingerprint patterns',
    image: 'for-loops',
    caption:
      'Ridge patterns with their cores and **deltas** marked: ==loops have one delta, whorls have two==, and arches have none.',
    bullets: [
      '**Friction ridges** form fingerprints, which differ even between identical twins.',
      '**Loops** (about 60–65%): ridges enter and leave on the same side.',
      '**Whorls** (about 30–35%): circular or spiral ridges.',
      '**Arches** (about 5%): ridges enter one side, rise, and leave the other side.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each fingerprint pattern to its description.',
    pairs: [
      ['Loop', 'Enters and leaves on the same side, one delta'],
      ['Whorl', 'Circular or spiral ridges, two deltas'],
      ['Arch', 'Rises in the middle and leaves the other side, no delta'],
    ],
    explanation:
      'Counting deltas is a quick check: one for a loop, two for a whorl, none for an arch.',
  },
  {
    kind: 'order',
    section: 0,
    prompt: 'Order the fingerprint patterns from most common to least common.',
    items: ['Loops', 'Whorls', 'Arches'],
    explanation: 'Loops are about 60–65% of prints, whorls about 30–35%, and arches only about 5%.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Comparing prints',
    bullets: [
      'First check the **overall pattern**: a whorl ==cannot match a loop==.',
      'Then compare **minutiae**: ridge endings, **bifurcations** (forks), and dots.',
      'Fingerprints are **individual evidence**: a full match can point to one person.',
      'A **partial or smudged** print may only rule suspects out.',
    ],
  },
  {
    kind: 'figure',
    section: 2,
    title: 'DNA electropherograms',
    image: 'for-epg',
    caption: 'Each **peak’s position** gives the number of repeats at an STR location.',
    bullets: [
      '**STRs** (short tandem repeats) are places where a short sequence repeats a different number of times in different people.',
      'A person shows **two peaks** at a location, one from each parent, or **one peak** if both copies match.',
      'A suspect matches only if ==every peak at every location matches==.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: which suspect matches?',
    problem:
      'Scene: **12/15** at location 1 and **8/8** at location 2. Suspect X: 12/15 and 8/10. Suspect Y: 12/15 and 8/8.',
    steps: [
      'Location 1: both suspects show **12/15**, matching the scene.',
      'Location 2: the scene shows only **8 repeats** (both copies are 8).',
      'Suspect X has **8/10**, which does not match; suspect Y has **8/8**, which does.',
    ],
    conclusion: 'Only ==suspect Y matches at every location== tested.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A scene sample shows 9/11 at one location and 14/14 at another. Which suspect could match?',
    options: [
      'Suspect P: 9/11 and 14/15',
      'Suspect Q: 9/11 and 14/14',
      'Suspect R: 9/9 and 14/14',
      'Suspect S: 11/12 and 14/14',
    ],
    answer: 1,
    explanation:
      'Only suspect Q matches both peaks at both locations; every other suspect differs somewhere.',
  },
  {
    kind: 'figure',
    section: 3,
    title: 'Shoe prints and tire treads',
    image: 'for-shoe',
    caption:
      'A scene print compared with a suspect’s shoe: the **pattern** narrows the field, and ==unique damage== can single out one shoe.',
    bullets: [
      '**Class characteristics**: brand pattern and size.',
      '**Individual characteristics**: cuts, nicks, and wear.',
      'Direction of travel: the toe for shoes, soil **thrown backward** for tires.',
      'Deeper, longer, spread-out prints suggest **running**; short, even strides suggest **walking**.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each shoe print feature a class or an individual characteristic?',
    bins: ['Class characteristic', 'Individual characteristic'],
    items: [
      ['Brand tread pattern', 0],
      ['Shoe size', 0],
      ['A cut across the heel', 1],
      ['A worn spot under the big toe', 1],
      ['Sole shape of one shoe model', 0],
    ],
    explanation:
      'Pattern, size, and model are shared by many shoes. Cuts and wear come from one shoe’s own history.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Soil evidence',
    image: 'for-soil',
    bullets: [
      'Soil varies in **color**, **particle size**, and **composition**: sand, silt, clay, and organic matter.',
      'Soil on a suspect’s shoes can show whether they ==could have been at the scene==.',
      'A matching soil is **class evidence**: consistent with the scene, not proof.',
      'A clearly different soil can help **rule a suspect out** for that location.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Soil on suspect M’s boots is sandy and pale, while the scene soil is dark and full of clay. What can you conclude?',
    options: [
      'M was definitely at the scene',
      'M’s boot soil does not link M to the scene',
      'M’s boot soil proves M is innocent of everything',
      'Soil can never be compared',
    ],
    answer: 1,
    explanation:
      'A clearly different soil fails to link M to that location. It does not prove innocence on its own, since M could have cleaned or changed boots.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Spatter patterns',
    image: 'for-blood-drop',
    caption:
      'Drip stains beside a forensic scale: drops falling **straight down** leave ==round stains==.',
    bullets: [
      'A drop striking **at an angle** makes an **elongated** stain.',
      'The narrow **tail points in the direction of travel**.',
      '**Low-speed** impacts, like dripping, make larger drops; **high-speed** impacts make a fine mist.',
      'Where many stains **converge** points to the **area of origin**.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'What does each spatter observation suggest?',
    bins: ['Fell straight down', 'Struck at an angle', 'High-speed impact'],
    items: [
      ['A round stain', 0],
      ['An elongated stain with a tail', 1],
      ['A fine mist of tiny drops', 2],
      ['A teardrop shape pointing toward the door', 1],
    ],
    explanation:
      'Round stains come from vertical drops, elongated stains from angled impacts (tail pointing the way it traveled), and a fine mist from a high-speed impact.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      '**Loops** have one delta, **whorls** two, **arches** none; compare pattern first, then **minutiae**.',
      'A DNA match needs ==every peak at every STR location== to agree.',
      'Prints show **class** features (pattern, size) and **individual** features (cuts, wear).',
      'Soil is **class evidence**; spatter tails point the **direction of travel**.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'A smudged partial fingerprint at the scene is clearly a whorl. Suspect A has loops on every finger. What can you conclude about suspect A, and why?',
    model:
      'Suspect A can be ruled out as the source of that print, because a whorl cannot match a loop. The smudged print is not detailed enough to identify anyone, but the pattern type alone is enough to exclude A.',
  },
]);

const analysis = defineDeck('cb-u7-l1', [
  {
    kind: 'title',
    title: 'Writing the crime scene analysis',
    subtitle:
      'Explain who is implicated, ==why everyone else is not==, and how strong each link is.',
    objectives: [
      'Organize evidence in a **summary table** linking items to suspects.',
      'Explain which evidence **implicates** the culprit and which **excludes** the others.',
      'Use careful words such as **consistent with**.',
      'Plan the 50 minutes so the analysis gets written.',
    ],
    image: 'for-evidence',
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when do you usually start writing your analysis at a Crime Busters event?',
    options: [
      'Right at the start',
      'Halfway through',
      'In the last few minutes',
      'I have not competed yet',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Start with a summary table',
    bullets: [
      'Put **suspects as columns** and **evidence items as rows**.',
      'Mark each cell: **link** (consistent), **no link** (excluded), or **not tested**.',
      'Example: soil links A and C, while chromatography links only A.',
      'The table shows ==who connects to the most evidence== and who is cleared.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: build the table, find the culprit',
    problem:
      'The scene powder is **baking soda**; A and C have baking soda, B has cornstarch. The note’s ink matches only **C’s pen**. A **dog hair** was found; A and C own dogs, B owns a cat.',
    steps: [
      'Powder row: links **A and C**, excludes **B**.',
      'Hair row: links **A and C**, excludes **B** (cat).',
      'Ink row: links only **C**, which **excludes A**.',
    ],
    conclusion:
      'Suspect C is implicated by all three items; ==A is excluded by the ink, and B by the powder and hair==.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'In the worked example, which single piece of evidence separates suspect A from suspect C?',
    options: ['The powder', 'The dog hair', 'The pen ink', 'None of them'],
    answer: 2,
    explanation:
      'A and C both have baking soda and dogs. Only the ink differs: it matches C’s pen and not A’s.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Explain who did it',
    bullets: [
      'Name each piece of evidence, give your **test result**, and **connect it to the suspect**.',
      'Example: “The powder fizzed with HCl but did not dissolve, identifying calcium carbonate, which was found in suspect A’s garage.”',
      'Lead with the strongest **individual evidence**, like fingerprints or DNA.',
      'Support it with ==class evidence== such as fibers, soil, or powders.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Explain why the others are innocent',
    bullets: [
      'An analysis is **incomplete** if it only names the culprit.',
      'For each other suspect, name the evidence that **excludes** them or fails to link them.',
      'Example: “B’s ink had a different second band (Rf 0.65 versus 0.80), so the note was not written with B’s pen.”',
      '==One clear mismatch== is enough to rule a suspect out.',
    ],
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each analysis word to its meaning.',
    pairs: [
      ['Implicate', 'Show that evidence links a suspect to the crime'],
      ['Exclude', 'Show that evidence rules a suspect out'],
      ['Inconclusive', 'Neither links nor excludes'],
      ['Corroborate', 'Support one piece of evidence with another'],
    ],
    explanation:
      'A strong analysis implicates the culprit, excludes everyone else, notes inconclusive results, and shows how evidence corroborates.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Use careful language',
    bullets: [
      'Say **“consistent with”** or **“matches”** for class evidence.',
      'Save **“identifies”** for strong individual evidence.',
      'Avoid claiming ==certainty you do not have==.',
      'Note **limitations**, such as a smudged print or a very common fiber.',
    ],
    callout: 'Clear, cautious wording earns points for the quality of your explanation.',
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Is each sentence well worded, or does it overclaim?',
    bins: ['Well worded', 'Overclaims'],
    items: [
      ['The fiber is consistent with suspect A’s sweater.', 0],
      ['The fiber proves suspect A was at the scene.', 1],
      ['The DNA profile matches suspect Y at every location tested.', 0],
      ['The soil identifies suspect C as the thief.', 1],
      ['The partial print rules out suspect B, whose prints are all arches.', 0],
    ],
    explanation:
      'Fibers and soil are class evidence, so they are “consistent with,” not proof or identification. DNA matching at every location and a pattern mismatch are reported accurately.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Handle conflicting evidence',
    bullets: [
      'Evidence can point different ways: soil may link two suspects while the hair links only one.',
      'Weigh **individual evidence** above **class evidence**.',
      'Look for an explanation that ==fits all the results==.',
      'The scenario may allow **more than one culprit** working together.',
      'Never ignore a result: explain it, or state why it carries less weight.',
    ],
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'Soil on suspects D and E is consistent with the scene, but DNA from the scene matches only E. What is the best conclusion?',
    options: [
      'D is the culprit because the soil matched first',
      'E is most strongly implicated, because DNA is individual evidence',
      'Both are equally guilty',
      'Ignore the DNA because the soil disagrees',
    ],
    answer: 1,
    explanation:
      'DNA can point to one person, while soil only shows someone could have been there. The soil result still fits E.',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'Time management in about 50 minutes',
    steps: [
      {
        label: 'Split the work',
        detail:
          'One partner on **powders and liquids**, the other on **hair, fibers, and chromatography**.',
      },
      {
        label: 'Identify unknowns fast',
        detail: 'Work in a sensible testing order and record results in a **clean data table**.',
      },
      {
        label: 'Fill the summary table',
        detail: 'Mark each suspect as linked, excluded, or not tested for every item.',
      },
      {
        label: 'Write the analysis',
        detail: 'Leave ==at least 10 minutes== to write who did it and why the others did not.',
      },
      {
        label: 'Clean up',
        detail: 'Clean as directed and use the **waste containers** the supervisor provides.',
      },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the event plan in order.',
    items: [
      'Split the tasks between partners',
      'Test the unknowns and record results',
      'Complete the summary table',
      'Write the analysis',
      'Clean up and dispose of waste as directed',
    ],
    explanation:
      'Divide the work, collect data, organize it, write the analysis with time to spare, and finish by cleaning up.',
  },
  {
    kind: 'fill',
    section: 3,
    prompt: 'Complete the guide to careful wording.',
    text: 'For class evidence such as fibers, write that the evidence is {0} with a source. Save the word {1} for strong individual evidence such as fingerprints or DNA.',
    blanks: ['consistent', 'identifies'],
    distractors: ['proves', 'identical', 'guesses'],
    explanation:
      'Class evidence narrows the source to a group, so it is “consistent with.” Only strong individual evidence “identifies” one person.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Build a **summary table** with suspects as columns and evidence as rows.',
      'Explain who is **implicated** and ==why every other suspect is excluded==.',
      'Use **“consistent with”** for class evidence and save **“identifies”** for strong individual evidence.',
      'Weigh individual over class evidence, and leave **10 minutes** to write.',
    ],
  },
  {
    kind: 'open',
    prompt:
      'Write two sentences of an analysis explaining why a suspect who owns a cat is not linked by a dog hair found at the scene.',
    model:
      'The hair found at the scene had a wide, continuous medulla and flattened scales, which is consistent with a dog. Suspect B owns only a cat, so the hair evidence does not link B to the scene.',
  },
]);

export const crimeDecksEvidence: Deck[] = [chromatography, patternEvidence, analysis];
