import { defineDeck, type Deck } from './presentation-types.ts';
import { heredityDecksMolecular } from './presentations-b-heredity-2.ts';

// Heredity (Division B) presentations, one per lesson, following presentations-anatomy.ts. Each
// deck follows its lesson in lessons-division-b.ts section by section (`section` is the lesson
// section index), at a middle-school level, and rehearses the lesson's terms and worked example.

const mendel = defineDeck('her-u1-l1', [
  {
    kind: 'title',
    title: 'Mendel’s laws, Punnett squares, and probability',
    subtitle: 'How paired alleles separate and combine, and how to predict what the offspring look like.',
    objectives: [
      'State the laws of segregation and independent assortment.',
      'Build monohybrid and dihybrid Punnett squares from parent genotypes.',
      'Use the product and sum rules to predict offspring ratios.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: two brown-eyed parents have a blue-eyed child. Is that possible?',
    options: ['Yes', 'No', 'Only if a mutation happened', 'Not sure yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Mendel’s experimental design',
    bullets: [
      'Mendel used **garden peas**: they self-pollinate, can be crossed by hand, and show traits with two clear forms.',
      'He started with **true-breeding** lines, crossed them, then let the hybrids self-pollinate.',
      'Counting **thousands of offspring** revealed stable ratios instead of single surprising plants.',
      'His insight: ==each trait is controlled by a pair of heritable factors==, which we now call **alleles** of a gene.',
    ],
    callout: 'Large counts turned messy individual results into patterns he could test.',
  },
  {
    kind: 'multi',
    section: 0,
    prompt: 'Why were garden peas a good choice for Mendel? Choose all that apply.',
    options: [
      'They can self-pollinate',
      'They can be cross-pollinated by hand',
      'Many traits come in two clear forms',
      'Each plant has only one allele per gene',
    ],
    answers: [0, 1, 2],
    explanation:
      'Peas self-pollinate, can be crossed by hand, and show either-or traits. Like us, each pea plant carries two alleles of each gene.',
  },
  {
    kind: 'compare',
    section: 1,
    title: 'Genotype and phenotype',
    columns: ['Genotype', 'Name', 'Phenotype (complete dominance)'],
    rows: [
      ['AA', '**Homozygous** dominant', 'Dominant trait'],
      ['Aa', '**Heterozygous**', 'Dominant trait — ==looks the same as AA=='],
      ['aa', 'Homozygous recessive', 'Recessive trait'],
    ],
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Genotype', 'The pair of alleles an organism carries'],
      ['Phenotype', 'The observable trait'],
      ['Homozygous', 'Two identical alleles'],
      ['Heterozygous', 'Two different alleles'],
    ],
    explanation:
      'Genotype is the allele pair and phenotype is what you see. Because AA and Aa look alike, appearance does not always reveal genotype.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'The law of segregation',
    image: 'gene-punnett',
    caption:
      'The two alleles **separate** when gametes form, so each gamete carries one. Bb × Bb gives 1 BB : 2 Bb : 1 bb.',
    bullets: [
      'An Aa parent makes **A** and **a** gametes in equal numbers.',
      'Aa × Aa gives a ==3 dominant : 1 recessive== phenotype ratio.',
      'A **test cross** with aa reveals an unknown genotype: AA gives all dominant, Aa gives about half recessive.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'A purple-flowered plant is crossed with a white (pp) plant. About half the offspring are white. What is the purple parent’s genotype?',
    options: ['PP', 'Pp', 'pp', 'It cannot be known'],
    answer: 1,
    explanation:
      'This is a test cross. A PP parent could only give P gametes, so all offspring would be purple. Half white offspring means the parent also makes p gametes: it is Pp.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Independent assortment and dihybrid crosses',
    bullets: [
      'Alleles of genes on **different chromosomes** sort into gametes independently.',
      'An AaBb parent makes four gamete types — **AB, Ab, aB, ab** — each with probability ¼.',
      'AaBb × AaBb fills a 16-box square and gives the ==9 : 3 : 3 : 1== phenotype ratio.',
      'It comes from the **random orientation** of homologous pairs in meiosis I, so it fails for genes close together on one chromosome.',
    ],
  },
  {
    kind: 'order',
    section: 3,
    prompt: 'Order the phenotype classes of an AaBb × AaBb cross from most to least common.',
    items: ['Dominant for both (A_B_)', 'Dominant A, recessive b (A_bb)', 'Recessive for both (aabb)'],
    explanation:
      'A_B_ is 9/16, A_bb is 3/16 (tied with aaB_), and aabb is only 1/16.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Probability replaces a big square',
    problem:
      'Two pea plants heterozygous for seed shape (Rr) and seed color (Yy) are crossed. What fraction of offspring are round and green (R_yy)?',
    steps: [
      'Solve each gene alone: Rr × Rr gives round (R_) with probability **¾**.',
      'Yy × Yy gives green (yy) with probability **¼**.',
      'The genes assort independently, so use the **product rule**: ¾ × ¼ = 3/16.',
    ],
    conclusion:
      '==3 of every 16 offspring== are round and green, one of the 3/16 classes in the 9 : 3 : 3 : 1 ratio.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Product rule and sum rule',
    bullets: [
      '**Product rule** (“and”): multiply the probabilities of independent events.',
      '**Sum rule** (“or”): add the probabilities of outcomes that cannot happen together.',
      'AaBb × AaBb → aabb = ¼ × ¼ = **1/16**.',
      'For a trihybrid cross, ==solve gene by gene and multiply== instead of drawing a 64-box square.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'In the cross AaBbCc × AaBbCc, what fraction of offspring are aabbcc? Enter the answer as a decimal to four places.',
    answer: 0.0156,
    tolerance: 0.0002,
    explanation: 'Each gene gives aa with probability ¼, so ¼ × ¼ × ¼ = 1/64 ≈ 0.0156.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt: 'For Aa × Aa, what is the probability that a child is AA or Aa?',
    options: ['1/4', '1/2', '3/4', '1'],
    answer: 2,
    explanation:
      'AA (¼) and Aa (½) cannot both happen to one child, so add them with the sum rule: ¼ + ½ = ¾.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Reading experimental data',
    bullets: [
      'Real counts rarely match a ratio exactly, because ==each fertilization is a random event==.',
      'From 400 offspring of Aa × Aa, expect 300 dominant : 100 recessive; 290 : 110 is normal variation.',
      '**Larger samples** cluster closer to the expected ratio.',
      'Compare observed with expected, check the sample size, and explain big differences with evidence.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A cross expected to give 3 : 1 produces 290 dominant and 110 recessive offspring. What is the best conclusion?',
    options: [
      'The results fit the 3 : 1 model; the difference is normal sampling variation',
      'The model is wrong because the numbers are not exactly 300 and 100',
      'The parents must have been homozygous',
      'A mutation must have occurred',
    ],
    answer: 0,
    explanation:
      'With 400 offspring, being 10 away from 300 and 100 is expected chance variation. Small differences do not overturn a model.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Allele', back: 'One version of a gene.' },
      { front: 'Test cross', back: 'Crossing an unknown with a homozygous recessive to reveal its genotype.' },
      { front: 'Product rule', back: 'Multiply probabilities of independent events (“and”).' },
      { front: 'Sum rule', back: 'Add probabilities of mutually exclusive outcomes (“or”).' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Each parent passes **one allele** of each gene to each gamete (segregation).',
      'Genes on different chromosomes sort **independently**, giving 9 : 3 : 3 : 1.',
      '==Solve gene by gene, then multiply== — and add only for “or” questions.',
      'Compare observed counts with expected ones, keeping sample size in mind.',
    ],
  },
]);

const pedigrees = defineDeck('her-u2-l1', [
  {
    kind: 'title',
    title: 'Pedigrees and sex-linked inheritance',
    subtitle: 'Reading family charts to work out how a trait is inherited.',
    objectives: [
      'Read pedigree symbols and number individuals.',
      'Recognize autosomal recessive, autosomal dominant, and X-linked recessive patterns.',
      'Rule patterns in and out using evidence from the chart.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Pedigree symbols',
    bullets: [
      '**Squares** are males and **circles** are females.',
      'A **filled** symbol is affected; a half-filled or dotted symbol may mark a **carrier**.',
      'A horizontal **mating line** joins parents; a vertical line drops to their children, in birth order.',
      'Roman numerals label generations, so ==II-3 is the third person in generation II==.',
    ],
  },
  {
    kind: 'match',
    section: 0,
    prompt: 'Match each pedigree symbol to its meaning.',
    pairs: [
      ['Square', 'Male'],
      ['Circle', 'Female'],
      ['Filled symbol', 'Affected person'],
      ['Half-filled symbol', 'Carrier'],
    ],
    explanation:
      'Shape gives sex, and shading gives phenotype: filled means affected and half-filled marks a known carrier.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Autosomal recessive clues',
    image: 'gene-autosomal-recessive',
    caption:
      'Two unaffected **carrier** parents have a 1 in 4 chance of an affected child in each pregnancy.',
    bullets: [
      'The trait often **skips generations**.',
      '==Two unaffected parents with an affected child== means both are carriers.',
      'An unaffected child of two carriers has a **2/3** chance of being a carrier.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Two carriers of an autosomal recessive trait have an unaffected child. What is the chance that this child is a carrier?',
    options: ['1/4', '1/2', '2/3', '3/4'],
    answer: 2,
    explanation:
      'The possible outcomes are AA, Aa, Aa, aa. The child is unaffected, so aa is ruled out, leaving 2 carriers out of 3 outcomes.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Autosomal dominant clues',
    bullets: [
      'The trait usually appears in **every generation**.',
      'Every affected person has at least one **affected parent**.',
      '==Two affected parents with an unaffected child prove the trait is dominant==: both parents are heterozygous.',
      'Affected heterozygote × unaffected partner → **½** chance of an affected child.',
    ],
  },
  {
    kind: 'figure',
    section: 3,
    title: 'X-linked recessive clues',
    image: 'gene-x-linked',
    caption:
      'A **carrier mother** passes the allele to half her sons (affected) and half her daughters (carriers).',
    bullets: [
      'Males have one X, so a single recessive allele is expressed: they are **hemizygous**.',
      'Many more **males** than females are affected.',
      'An affected father gives his X to all daughters but ==never passes the allele to sons==, who get his Y.',
      'Examples: red–green color blindness and hemophilia A.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'A hemophilia question',
    problem:
      'A woman whose father has hemophilia A (X-linked recessive) has children with an unaffected man. What is the chance their first son is affected?',
    steps: [
      'Her father passed his only X, carrying the allele, to her, so she is a **carrier** (XᴴXʰ).',
      'Each son receives one of her two X chromosomes with equal probability.',
      'A son who gets Xʰ is affected, so the chance is **½**.',
    ],
    conclusion:
      'Each son has a ==50% chance== of hemophilia; daughters are not affected, but half are expected to be carriers.',
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Sort each clue under the pattern it points to.',
    bins: ['Autosomal recessive', 'Autosomal dominant', 'X-linked recessive'],
    items: [
      ['Two unaffected parents have an affected daughter', 0],
      ['Two affected parents have an unaffected child', 1],
      ['Mostly males affected, passed through carrier mothers', 2],
      ['Trait appears in every generation, father to son', 1],
      ['Trait skips a generation, males and females equally', 0],
      ['An affected man’s daughters are all carriers', 2],
    ],
    explanation:
      'Unaffected parents with an affected child signal recessive; affected parents with an unaffected child signal dominant; a male bias passed through carrier mothers signals X-linked recessive.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Ruling patterns in and out',
    bullets: [
      '**Father-to-son** transmission rules out X-linkage.',
      'An **affected daughter of an unaffected father** rules out X-linked recessive.',
      '**Two unaffected parents with an affected child** rule out dominant inheritance.',
      'If several patterns remain, ==name the most likely one and the evidence that would decide==.',
    ],
    callout: 'Do not assume people marrying into the family carry a rare allele unless the case says so.',
  },
  {
    kind: 'mcq',
    section: 4,
    prompt:
      'In a pedigree, an affected father has an affected son, and the mother is unaffected and not a carrier. Which pattern is ruled out?',
    options: ['Autosomal dominant', 'Autosomal recessive', 'X-linked recessive', 'None of them'],
    answer: 2,
    explanation:
      'A son gets his father’s Y, not his X, so a father cannot pass an X-linked allele to his son. Father-to-son transmission rules out X-linkage.',
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Put the steps for drawing a pedigree from a case in order.',
    items: [
      'Read the case once and list the people',
      'Draw generation I at the top',
      'Join couples with mating lines and add children in birth order',
      'Number everyone and shade affected individuals',
      'Write the genotypes you can prove under each symbol',
    ],
    explanation:
      'Laying out people, generations, and couples first keeps the chart tidy; genotypes come last, with blanks such as A_ where you cannot be sure.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a pedigree from a case',
    bullets: [
      'Place each couple with a mating line and add children **left to right** in birth order.',
      'Shade affected people and mark **known carriers**.',
      'Write genotypes under each symbol; use a blank such as ==A_ when only one allele is certain==.',
      'A neat layout keeps probability calculations for future children accurate.',
    ],
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Proband', back: 'The person whose case first drew attention to the family.' },
      { front: 'Carrier', back: 'A heterozygote who has a recessive allele but does not show the trait.' },
      { front: 'Hemizygous', back: 'Having only one copy of a gene, as males do for X-linked genes.' },
      { front: 'Consanguinity', back: 'Mating between close relatives, which raises the chance of recessive traits.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Squares are males, circles females, filled symbols affected.',
      '**Recessive** traits skip generations; **dominant** traits appear in every generation.',
      'X-linked recessive traits mostly affect males and ==never pass father to son==.',
      'Rule patterns out with specific evidence, then write the genotypes you can prove.',
    ],
  },
]);

const beyond = defineDeck('her-u3-l1', [
  {
    kind: 'title',
    title: 'Beyond Mendel: dominance, linkage, and epistasis',
    subtitle: 'When ratios do not come out 3 : 1 or 9 : 3 : 3 : 1, they are clues.',
    objectives: [
      'Distinguish incomplete dominance from codominance.',
      'Calculate recombination frequency and map distance.',
      'Interpret complementation tests and recessive epistasis.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Incomplete dominance',
    bullets: [
      'The heterozygote has an **intermediate** phenotype: red (RR) × white (WW) snapdragons give **pink** (RW).',
      'Pink × pink gives red : pink : white in a **1 : 2 : 1** ratio.',
      'The ==phenotype ratio matches the genotype ratio==.',
      'The alleles did not blend: red and white return in the next generation.',
    ],
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Codominance and multiple alleles',
    image: 'gene-abo',
    caption: 'Type AB cells carry **both** A and B antigens; type O cells carry neither.',
    bullets: [
      'In **codominance**, both alleles are fully expressed in the heterozygote: Iᴬ and Iᴮ give type AB.',
      'Iᴬ and Iᴮ are both dominant to **i**.',
      'ABO has **multiple alleles**: three exist in the population, but each person carries only two.',
      '==Iᴬi × Iᴮi can give all four blood types== in equal proportions.',
    ],
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A type A parent (Iᴬi) and a type B parent (Iᴮi) have a child. What is the chance the child is type O?',
    options: ['0', '1/4', '1/2', '3/4'],
    answer: 1,
    explanation:
      'Each parent passes i with probability ½, so ii has probability ½ × ½ = ¼. The four types A, B, AB, and O each appear ¼ of the time.',
  },
  {
    kind: 'match',
    section: 1,
    prompt: 'Match each pattern to an example.',
    pairs: [
      ['Incomplete dominance', 'Red × white snapdragons give pink'],
      ['Codominance', 'Type AB blood shows both antigens'],
      ['Multiple alleles', 'Three ABO alleles in the population'],
      ['Complete dominance', 'Aa looks exactly like AA'],
    ],
    explanation:
      'Incomplete dominance gives the heterozygote an in-between look, codominance shows both, and multiple alleles means more than two versions exist in the population.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Linkage and recombination',
    image: 'gene-crossover',
    caption:
      'Crossing over swaps segments between paired chromosomes, making **recombinant** chromosomes.',
    bullets: [
      'Genes close together on one chromosome are usually inherited together: they are **linked**.',
      'A test cross gives mostly **parental** classes and fewer recombinants.',
      '**Recombination frequency** = recombinants ÷ total; ==1% = 1 map unit (centimorgan)==.',
      'Frequencies never go above 50%.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Mapping two linked genes',
    problem:
      'A test cross of AaBb × aabb gives 420 AB, 412 ab, 85 Ab, and 83 aB offspring. Are the genes linked, and how far apart are they?',
    steps: [
      'The most common classes are **parental**: AB and ab (832 offspring).',
      'Recombinants are Ab and aB: 85 + 83 = **168**.',
      'Recombination frequency = 168 ÷ 1000 = **16.8%**.',
    ],
    conclusion:
      'The genes are ==linked about 16.8 map units apart==; unlinked genes would give four classes of about 250 each.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'A test cross gives 1000 offspring: 455 AB, 445 ab, 52 Ab, and 48 aB. How many map units apart are the genes?',
    answer: 10,
    tolerance: 0.1,
    unit: 'map units',
    explanation: 'Recombinants are 52 + 48 = 100 of 1000, which is 10%, or 10 map units.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Complementation',
    bullets: [
      'Two mutants with the same recessive phenotype may have defects in the **same gene** or in **different genes**.',
      'A **complementation test** crosses them.',
      'Normal offspring: ==each parent supplies the working copy the other lacks== → different genes.',
      'Mutant offspring: neither parent supplies a working copy → same gene.',
    ],
  },
  {
    kind: 'mcq',
    section: 3,
    prompt:
      'Two white-eyed fly strains are crossed and all offspring have normal red eyes. What does this show?',
    options: [
      'The mutations are in different genes',
      'The mutations are in the same gene',
      'White eyes are dominant',
      'The genes are linked',
    ],
    answer: 0,
    explanation:
      'The offspring are normal, so the mutations complement each other: each strain supplies a working copy of the gene broken in the other.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Recessive epistasis',
    bullets: [
      '**Epistasis**: one gene masks the effect of another.',
      'In Labrador retrievers, **B_** is black and **bb** is brown.',
      'But **ee** dogs cannot deposit pigment in fur and are ==yellow whatever their B genotype==.',
      'BbEe × BbEe gives **9 black : 3 brown : 4 yellow**, because the two ee classes merge.',
    ],
  },
  {
    kind: 'sort',
    section: 4,
    prompt: 'What coat color does each Labrador genotype give?',
    bins: ['Black', 'Brown', 'Yellow'],
    items: [
      ['BBEE', 0],
      ['BbEe', 0],
      ['bbEE', 1],
      ['bbEe', 1],
      ['BBee', 2],
      ['bbee', 2],
    ],
    explanation: 'Any ee dog is yellow. Otherwise B_ dogs are black and bb dogs are brown.',
  },
  {
    kind: 'compare',
    section: 5,
    title: 'Recognizing modified ratios',
    columns: ['Ratio you see', 'Likely model', 'Why'],
    rows: [
      ['1 : 2 : 1 (one gene)', '**Incomplete dominance** or codominance', 'Heterozygotes look different'],
      ['9 : 3 : 4', '**Recessive epistasis**', 'Two classes merge'],
      ['9 : 7', 'Two genes ==both needed for one product==', 'Three classes merge'],
      ['Mostly parental classes', '**Linkage**', 'Few recombinants'],
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each result to the model it supports.',
    pairs: [
      ['Pink × pink gives 1 red : 2 pink : 1 white', 'Incomplete dominance'],
      ['Dihybrid cross gives 9 : 3 : 4', 'Recessive epistasis'],
      ['Dihybrid cross gives 9 : 7', 'Two genes needed for one product'],
      ['Test cross gives 45% : 45% : 5% : 5%', 'Linkage'],
    ],
    explanation:
      'State the ratio, name the model it supports, and show the expected numbers so a grader can follow the evidence.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Codominance', back: 'Both alleles fully expressed in the heterozygote.' },
      { front: 'Recombinant', back: 'An offspring with a new combination of alleles made by crossing over.' },
      {
        front: 'Complementation',
        back: 'Two mutants together give a normal phenotype because their defects are in different genes.',
      },
      { front: 'Epistasis', back: 'One gene masks the effect of another gene.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      '**Incomplete dominance** gives an in-between heterozygote; **codominance** shows both alleles.',
      'Linked genes give mostly parental classes; ==recombination % = map units==.',
      'Complementation tells you whether two mutations are in the same gene.',
      'A modified ratio such as 9 : 3 : 4 is evidence for a specific model.',
    ],
  },
]);

const division = defineDeck('her-u4-l1', [
  {
    kind: 'title',
    title: 'Mitosis, meiosis, and karyotypes',
    subtitle: 'How cells copy and divide their chromosomes, and how we look at them.',
    objectives: [
      'Count chromosomes and chromatids through mitosis and meiosis.',
      'Explain where genetic variation comes from in meiosis.',
      'Prepare and interpret a karyotype.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Chromosomes and ploidy',
    bullets: [
      'Human body cells are **diploid** (2n = 46): 23 pairs of **homologous chromosomes**, one of each pair from each parent.',
      'Homologs carry the same genes, perhaps with different alleles.',
      'Before division, each chromosome copies itself into two **sister chromatids** joined at the centromere.',
      'Gametes are **haploid** (n = 23). ==Count chromosomes by counting centromeres==.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A replicated chromosome made of two sister chromatids counts as how many chromosomes?',
    options: ['One', 'Two', 'Four', 'It depends on the species'],
    answer: 0,
    explanation:
      'Chromosomes are counted by centromeres. Two sister chromatids share one centromere, so they are still one chromosome.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Mitosis',
    image: 'gene-mitosis',
    caption: 'After replication, mitosis gives each daughter cell **one copy of every chromosome**.',
    bullets: [
      '**Prophase**: chromosomes condense and the spindle forms.',
      '**Metaphase**: chromosomes line up single file at the middle.',
      '**Anaphase**: sister chromatids separate to opposite poles. **Telophase**: nuclei re-form.',
      'Result: ==two identical diploid cells== for growth and repair.',
    ],
  },
  {
    kind: 'order',
    section: 1,
    prompt: 'Order the stages of mitosis.',
    items: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    explanation:
      'Chromosomes condense, line up, separate, and then new nuclei form. Interphase, including S phase, comes before mitosis and is not part of it.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Meiosis I and meiosis II',
    image: 'gene-meiosis',
    caption:
      '**Homologs** separate in meiosis I; **sister chromatids** separate in meiosis II, giving four haploid cells.',
    bullets: [
      'Prophase I: homologs pair into **tetrads** and ==cross over at chiasmata==.',
      'Metaphase I: pairs line up side by side, each pair orienting independently.',
      'Anaphase I: homologs move apart while sister chromatids stay together.',
      'Meiosis I is the **reductional division**: two haploid cells.',
    ],
  },
  {
    kind: 'sort',
    section: 2,
    prompt: 'Does each event happen in mitosis, meiosis I, or meiosis II?',
    bins: ['Mitosis', 'Meiosis I', 'Meiosis II'],
    items: [
      ['Homologs pair and cross over', 1],
      ['Homologous pairs line up side by side', 1],
      ['Sisters separate in a haploid cell', 2],
      ['Two identical diploid cells form', 0],
      ['Homologs move to opposite poles', 1],
      ['Single file line-up in a body cell', 0],
    ],
    explanation:
      'Pairing, crossing over, and separating homologs are meiosis I. Meiosis II separates sisters in haploid cells. Mitosis lines chromosomes up single file and keeps the cells diploid.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Meiosis II and variation',
    bullets: [
      'Meiosis II resembles mitosis: sister chromatids separate, giving **four haploid cells**.',
      '**Crossing over** mixes alleles along a chromosome.',
      '**Independent orientation** gives 2²³ ≈ ==8.4 million chromosome combinations== in human gametes.',
      '**Random fertilization** combines any egg with any sperm.',
      '**Nondisjunction** — a failure to separate — gives gametes with an extra or missing chromosome.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Counting through meiosis',
    problem:
      'A diploid cell with 2n = 8 undergoes meiosis. How many chromosomes and chromatids are in each cell after meiosis I and after meiosis II?',
    steps: [
      'Before meiosis, replication gives **8 chromosomes with 16 chromatids**.',
      'Meiosis I separates homologs: each cell has **4 chromosomes**, still 2 chromatids each (8 chromatids).',
      'Meiosis II separates sisters: each of four cells has **4 chromosomes, 4 chromatids**.',
    ],
    conclusion:
      '==Chromosome number halves in meiosis I==; meiosis II halves only the chromatid count.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'A cell with 2n = 6 finishes meiosis I. How many chromatids are in each of the two cells?',
    answer: 6,
    tolerance: 0,
    unit: 'chromatids',
    explanation:
      'After meiosis I each cell has n = 3 chromosomes, each still made of 2 sister chromatids: 3 × 2 = 6.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Preparing a karyotype',
    bullets: [
      'Grow cells, often **white blood cells**, in culture.',
      'Stop them in **metaphase** with a drug such as colchicine, when ==chromosomes are most condensed==.',
      'Swell, fix, spread, and **stain** the cells — Giemsa stain gives G-bands.',
      'Photograph and arrange chromosomes in pairs by **size, centromere position, and banding**, sex chromosomes last.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Put the steps for making a karyotype in order.',
    items: [
      'Grow white blood cells in culture',
      'Stop the cells in metaphase with colchicine',
      'Swell, fix, and spread the cells on a slide',
      'Stain the chromosomes to show bands',
      'Photograph and arrange the chromosomes in pairs',
    ],
    explanation:
      'Cells must be dividing and caught in metaphase before they are spread, stained, and sorted into pairs.',
  },
  {
    kind: 'figure',
    section: 5,
    title: 'Interpreting a karyotype',
    image: 'gene-karyotype',
    caption: 'Three copies of chromosome 21: the karyotype of **Down syndrome** (trisomy 21).',
    bullets: [
      'First **count** the chromosomes and check the **sex chromosomes**: 46,XX or 46,XY is typical.',
      '47,+21 is Down syndrome; **45,X** is Turner syndrome; **47,XXY** is Klinefelter syndrome.',
      'Deletions, duplications, inversions, and translocations can show as altered banding.',
      '==A karyotype cannot detect single-base mutations==: they are far too small to see.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each karyotype to the condition.',
    pairs: [
      ['47,XY,+21', 'Down syndrome'],
      ['45,X', 'Turner syndrome'],
      ['47,XXY', 'Klinefelter syndrome'],
      ['46,XX', 'Typical female'],
    ],
    explanation: 'Read the count first, then the sex chromosomes, then any extra numbered chromosome.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      {
        front: 'Homologous chromosomes',
        back: 'A matching pair, one from each parent, carrying the same genes.',
      },
      { front: 'Sister chromatids', back: 'Two identical copies of a chromosome joined at the centromere.' },
      { front: 'Nondisjunction', back: 'Chromosomes or chromatids fail to separate during division.' },
      { front: 'Aneuploidy', back: 'An extra or missing chromosome, such as 47 or 45 in humans.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Takeaways',
    points: [
      'Mitosis makes **two identical diploid** cells; meiosis makes **four haploid** cells.',
      '==Meiosis I separates homologs; meiosis II separates sisters.==',
      'Crossing over, independent orientation, and random fertilization create variation.',
      'A karyotype shows chromosome number and large changes, not single-base mutations.',
    ],
  },
]);

export const decks: Deck[] = [mendel, pedigrees, beyond, division, ...heredityDecksMolecular];
