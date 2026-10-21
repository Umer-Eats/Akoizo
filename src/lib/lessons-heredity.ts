import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c, evidence } from './course-authoring.ts';

// Division B Heredity, organized from the 2027 Heredity B rules (section 3.b, topics i–vi).
export const heredityLessons = buildCourse({
  eventId: 'heredity',
  eventName: 'Heredity',
  prefix: 'her',
  division: 'B',
  syllabus: '2027 Science Olympiad Division B Heredity rules',
  intro:
    'Eight units follow the 2027 Heredity B topic list: Mendelian genetics, pedigrees, exceptions to Mendel, mitosis and meiosis, DNA structure and replication, gene expression, population genetics, and PCR. Every unit stresses the process skills the rules emphasize: calculating probabilities, reading experimental results, and drawing conclusions from evidence. Units marked State/National cover topics that regional tests skip.',
  references: [
    { title: 'Science Olympiad: Heredity B', url: 'https://www.soinc.org/heredity-b' },
    {
      title: 'OpenStax Biology 2e: Mendel’s experiments and heredity',
      url: 'https://openstax.org/books/biology-2e/pages/12-introduction',
    },
    {
      title: 'National Human Genome Research Institute: Talking Glossary',
      url: 'https://www.genome.gov/genetics-glossary',
    },
  ],
  chapters: [
    {
      ...c(
        'Mendel’s laws, Punnett squares, and probability',
        [
          'State the laws of segregation and independent assortment.',
          'Build monohybrid and dihybrid Punnett squares from parent genotypes.',
          'Use the product and sum rules to predict offspring ratios.',
        ],
        [
          [
            'Mendel’s experimental design',
            'Gregor Mendel studied garden peas because they self-pollinate, can be cross-pollinated by hand, and show traits with two clear forms, such as round or wrinkled seeds. He began with true-breeding lines, crossed them, and then let the hybrids self-pollinate. Counting thousands of offspring let him see stable ratios instead of single surprising plants. His key insight was that each trait is controlled by paired heritable factors, which we now call alleles of a gene.',
          ],
          [
            'Genotype, phenotype, and dominance',
            'A genotype is the pair of alleles an organism carries, such as AA, Aa, or aa. A phenotype is the observable trait. With complete dominance, one dominant allele is enough to show the dominant phenotype, so AA and Aa look alike. Homozygous means two identical alleles; heterozygous means two different alleles. Because Aa and AA share a phenotype, you cannot always read a genotype from appearance, which is why test crosses and pedigrees matter.',
          ],
          [
            'The law of segregation',
            'The two alleles of a gene separate when gametes form, so each gamete carries only one allele. An Aa parent therefore makes A and a gametes in equal proportions. In a monohybrid cross of Aa × Aa, the Punnett square gives genotypes in a 1 AA : 2 Aa : 1 aa ratio and phenotypes in a 3 dominant : 1 recessive ratio. A test cross with an aa parent reveals an unknown genotype: an AA parent gives all dominant offspring, while an Aa parent gives about half recessive offspring.',
          ],
          [
            'Independent assortment and dihybrid crosses',
            'Alleles of different genes on different chromosomes sort into gametes independently. An AaBb parent makes four gamete types, AB, Ab, aB, and ab, each with probability one quarter. Crossing two AaBb parents gives a 16-box Punnett square and the familiar 9 : 3 : 3 : 1 phenotype ratio. Independent assortment comes from the random orientation of homologous pairs in meiosis I, which is why it fails for genes that sit close together on one chromosome.',
          ],
          [
            'Probability rules replace large squares',
            'The product rule says the probability that two independent events both happen is the product of their probabilities. The sum rule says the probability that one of several mutually exclusive outcomes happens is the sum of their probabilities. For AaBb × AaBb, the chance of aabb is ¼ × ¼ = 1/16. For a trihybrid cross, solve gene by gene and multiply instead of drawing a 64-box square. Use the sum rule for questions phrased with “or,” such as AA or Aa.',
          ],
          [
            'Reading experimental data',
            'Real offspring counts rarely match a ratio exactly, because each fertilization is a random event. With 400 offspring from Aa × Aa you expect 300 dominant and 100 recessive, but 290 and 110 is normal sampling variation. Larger samples cluster closer to the expected ratio. When a question asks whether data support a model, compare observed and expected numbers, look at the sample size, and explain any large departure with evidence rather than assuming the model is wrong.',
          ],
        ],
        [
          ['Allele', 'One version of a gene, such as A or a.'],
          ['Homozygous', 'Carrying two identical alleles of a gene.'],
          ['Heterozygous', 'Carrying two different alleles of a gene.'],
          [
            'Test cross',
            'A cross to a homozygous recessive individual that reveals an unknown genotype.',
          ],
          ['Product rule', 'Multiply probabilities of independent events that must both happen.'],
          ['Sum rule', 'Add probabilities of mutually exclusive outcomes when any one counts.'],
        ],
        [
          'Two pea plants heterozygous for seed shape (Rr) and seed color (Yy) are crossed. What fraction of offspring will be round and green (R_yy)?',
          [
            'Solve each gene separately: Rr × Rr gives round (R_) with probability ¾.',
            'Yy × Yy gives green (yy) with probability ¼.',
            'The genes assort independently, so multiply: ¾ × ¼ = 3/16.',
          ],
          'Three of every sixteen offspring are expected to be round and green, matching one of the 3/16 classes in the 9 : 3 : 3 : 1 ratio.',
        ],
        [
          [
            'In a cross of Aa × Aa, what fraction of offspring are expected to be heterozygous?',
            '1/2',
            ['1/4', '3/4', '1/3'],
            'The square gives 1 AA : 2 Aa : 1 aa, so two of four boxes are Aa.',
          ],
          [
            'A tall plant is crossed with a short (tt) plant and about half the offspring are short. What was the tall parent’s genotype?',
            'Tt',
            ['TT', 'tt', 'It cannot be heterozygous'],
            'Only a heterozygous parent can pass t to half of the offspring in a test cross.',
          ],
          [
            'What is the probability that AaBbCc × AaBbCc produces an aabbcc offspring?',
            '1/64',
            ['1/16', '1/8', '3/64'],
            'Each gene gives aa with probability ¼, and ¼ × ¼ × ¼ = 1/64.',
          ],
        ],
        [
          [
            'Explain why the law of independent assortment is a consequence of meiosis.',
            'In metaphase I, each homologous pair lines up independently of the others, so which maternal or paternal chromosome goes to a given pole is random for each pair. Genes on different chromosomes therefore end up in gametes in all combinations with equal probability.',
          ],
          [
            'A cross gives 152 purple and 48 white flowers. Which parental genotypes best explain this, and why?',
            'Both parents are likely heterozygous (Pp × Pp). The ratio 152 : 48 is close to 3 : 1 (expected 150 : 50 of 200), and the small difference is normal sampling variation.',
          ],
          [
            'Use the product and sum rules to find the probability that Aa × Aa gives an offspring with the dominant phenotype.',
            'The dominant phenotype comes from AA (¼) or Aa (½). These outcomes are mutually exclusive, so add them: ¼ + ½ = ¾.',
          ],
          [
            'Describe how a test cross distinguishes AA from Aa.',
            'Cross the unknown to aa. If all offspring show the dominant trait, the parent was probably AA. If roughly half show the recessive trait, the parent must carry a and is Aa. Larger offspring numbers make the conclusion more reliable.',
          ],
        ],
        [
          ['Parents', 'Write genotypes and list every gamete each parent can make.'],
          ['Gametes', 'Segregation gives one allele per gene; independent genes combine freely.'],
          ['Offspring', 'Combine gametes, then group genotypes into phenotype classes.'],
        ],
        [
          [
            'Monohybrid cross',
            'One gene, 3 : 1 phenotypes when both parents are heterozygous',
            'Assumes complete dominance and equal survival.',
          ],
          [
            'Dihybrid cross',
            'Two independent genes, 9 : 3 : 3 : 1 phenotypes',
            'Fails when genes are linked on one chromosome.',
          ],
          [
            'Test cross',
            'Unknown × homozygous recessive shows gamete types directly',
            'Small families can mislead; count many offspring.',
          ],
        ],
        'Predict the phenotype ratio for AaBb × aabb before checking the evidence.',
        'Solve one gene at a time, then multiply; ratios are probabilities, not guarantees.',
      ),
      investigation: evidence(
        [
          ['Parent phenotypes', 'Both parents have purple flowers and round seeds.'],
          ['F1 flower color', '301 purple and 99 white offspring were scored.'],
          ['F1 seed shape', '297 round and 103 wrinkled offspring were scored.'],
          ['Double recessives', '24 of 400 offspring are white and wrinkled.'],
        ],
        'Which genotype pair best explains the data?',
        ['AaBb × AaBb', 'AABB × aabb', 'AaBB × Aabb', 'AaBb × aabb'],
        0,
        'Each trait shows close to a 3 : 1 ratio, so both parents are heterozygous for both genes. About 1/16 of 400 (25) is expected to be double recessive, and 24 were seen.',
      ),
    },
    {
      ...c(
        'Pedigrees and sex-linked inheritance',
        [
          'Read pedigree symbols and generation numbering.',
          'Decide between dominant and recessive, autosomal and X-linked patterns.',
          'Construct a pedigree from a written case study.',
        ],
        [
          [
            'Pedigree symbols',
            'A pedigree is a family chart. Squares are males and circles are females. A filled symbol shows an affected person, and a half-filled or dotted symbol may show a carrier. A horizontal line between a male and female shows mating, and a vertical line drops to their children, who hang from a sibship line in birth order. Roman numerals label generations and Arabic numerals label individuals, so II-3 is the third person in the second generation.',
          ],
          [
            'Autosomal recessive clues',
            'A recessive trait often skips generations because carriers look unaffected. The strongest clue is two unaffected parents with an affected child: both parents must be carriers. Males and females are affected at similar rates. If both parents are carriers, each child has a one-quarter chance of being affected. An unaffected child of two carriers has a two-thirds chance of being a carrier, because the aa outcome has been ruled out.',
          ],
          [
            'Autosomal dominant clues',
            'A dominant trait usually appears in every generation, and every affected person has at least one affected parent. Two affected parents can have an unaffected child, which proves the trait is dominant: both parents must be heterozygous. An affected heterozygote and an unaffected partner have a one-half chance of an affected child. Males and females are again affected at similar rates, and father-to-son transmission can occur.',
          ],
          [
            'X-linked recessive clues',
            'Males have one X chromosome, so a single recessive allele on the X is expressed. X-linked recessive traits therefore affect many more males than females. An affected father passes his X to all daughters, making them carriers, but never passes it to sons, because sons receive his Y. A carrier mother passes the allele to half of her sons, who are affected, and half of her daughters, who become carriers. Red–green color blindness and hemophilia A follow this pattern.',
          ],
          [
            'Ruling patterns in and out',
            'Work by elimination. Father-to-son transmission rules out X-linkage. An affected daughter of an unaffected father rules out X-linked recessive inheritance. Two unaffected parents with an affected child rule out dominant inheritance. When several patterns remain possible, state the most likely one and the evidence that would separate them, such as the phenotypes of more sons or a carrier test. Never assume people marrying into a family carry a rare allele unless the case says so.',
          ],
          [
            'Building a pedigree from a case',
            'Read the case once to list people, then draw generation I at the top. Place each couple with a mating line, add children from left to right in birth order, and number everyone. Shade affected individuals and mark known carriers. Finally, write genotypes under each symbol, filling in those you can prove and using a blank, such as A_, for those you cannot. This step-by-step layout keeps probability calculations for future children accurate.',
          ],
        ],
        [
          ['Pedigree', 'A chart that traces a trait through a family.'],
          ['Proband', 'The first affected family member who brings the family to attention.'],
          ['Carrier', 'A heterozygote who carries a recessive allele without showing the trait.'],
          ['Sex-linked', 'A gene located on a sex chromosome, usually the X.'],
          ['Hemizygous', 'Having only one copy of a gene, as males do for X-linked genes.'],
          [
            'Consanguinity',
            'Mating between relatives, which raises the chance of shared recessive alleles.',
          ],
        ],
        [
          'A woman whose father has hemophilia A (X-linked recessive) has children with an unaffected man. What is the probability that their first son is affected?',
          [
            'Her father passed his only X, carrying the hemophilia allele, to her, so she is a carrier (XᴴXʰ).',
            'Each son receives one of her two X chromosomes with equal probability.',
            'A son who receives Xʰ is affected, so the probability is ½.',
          ],
          'Each son has a 50% chance of hemophilia; daughters are not affected but half are expected to be carriers.',
        ],
        [
          [
            'Two unaffected parents have an affected daughter. Which pattern is most consistent?',
            'Autosomal recessive',
            ['Autosomal dominant', 'X-linked recessive', 'Y-linked'],
            'Both parents must be carriers. X-linked recessive is ruled out because the daughter’s father would have to be affected.',
          ],
          [
            'An affected father has an affected son. Which pattern does this rule out?',
            'X-linked inheritance',
            ['Autosomal dominant', 'Autosomal recessive', 'Mitochondrial inheritance'],
            'Sons inherit their father’s Y, not his X, so a son cannot get an X-linked allele from his father.',
          ],
          [
            'Two carrier parents have an unaffected child. What is the probability that this child is a carrier?',
            '2/3',
            ['1/2', '1/4', '3/4'],
            'Among the three unaffected outcomes (AA, Aa, aA), two are carriers.',
          ],
        ],
        [
          [
            'Explain why X-linked recessive traits are more common in males.',
            'Males are hemizygous: they have one X, so one recessive allele is expressed. Females need two copies, one from each parent, which is much less likely for a rare allele.',
          ],
          [
            'Describe one pedigree observation that proves a trait is dominant.',
            'Two affected parents having an unaffected child. They must both be heterozygous and each pass a recessive allele, which is only possible if the trait is dominant.',
          ],
          [
            'A carrier woman for an X-linked recessive trait has a child with an affected man. What fraction of their daughters will be affected?',
            'One half. Every daughter receives the father’s affected X, and each has a ½ chance of receiving the mother’s affected X.',
          ],
          [
            'Why is consanguinity often shown in pedigrees of rare recessive disorders?',
            'Relatives share alleles inherited from a common ancestor, so two relatives are more likely to carry the same rare recessive allele and have an affected child.',
          ],
        ],
        [
          ['Read', 'Label generations and individuals; note sex and affected status.'],
          ['Eliminate', 'Use key clues to rule out dominant, recessive, or X-linked patterns.'],
          ['Assign', 'Write provable genotypes, then calculate risks for new children.'],
        ],
        [
          [
            'Autosomal recessive',
            'Skips generations; unaffected parents can have affected children',
            'Equal in both sexes, unless the sample is very small.',
          ],
          [
            'Autosomal dominant',
            'Appears every generation; affected parents can have unaffected children',
            'New mutations or reduced penetrance can hide the pattern.',
          ],
          [
            'X-linked recessive',
            'Mostly males; passes through carrier mothers',
            'No father-to-son transmission.',
          ],
        ],
        'Use the case evidence to decide which inheritance pattern survives every clue.',
        'Rule patterns out with single decisive clues, then calculate risks from proven genotypes.',
      ),
      investigation: evidence(
        [
          ['Generation I', 'An unaffected man and an unaffected woman.'],
          ['Generation II sons', 'Two of their four sons are affected.'],
          ['Generation II daughters', 'Neither of their two daughters is affected.'],
          ['Generation III', 'An affected son’s children are all unaffected.'],
        ],
        'Which inheritance pattern best fits?',
        [
          'Autosomal dominant',
          'X-linked recessive',
          'Y-linked',
          'Autosomal dominant with full penetrance',
        ],
        1,
        'Unaffected parents with affected sons fit a carrier mother. Only males are affected, and an affected father passes the X to daughters (carriers) but not to sons, so his children are unaffected.',
      ),
    },
    {
      ...c(
        'Beyond Mendel: dominance, linkage, and epistasis',
        [
          'Recognize incomplete dominance and codominance from phenotype ratios.',
          'Explain how linkage changes dihybrid ratios.',
          'Interpret complementation tests and recessive epistasis.',
        ],
        [
          [
            'Incomplete dominance',
            'In incomplete dominance, the heterozygote has an intermediate phenotype. Crossing red (RR) and white (WW) snapdragons gives pink (RW) offspring. Crossing two pink plants gives red, pink, and white in a 1 : 2 : 1 ratio, so the phenotype ratio matches the genotype ratio. This does not mean the alleles blended: the original red and white phenotypes return in the next generation, showing that the alleles stayed intact.',
          ],
          [
            'Codominance and multiple alleles',
            'In codominance, both alleles are fully expressed in the heterozygote. Human ABO blood type shows codominance of Iᴬ and Iᴮ, which give type AB, while both are dominant to i. ABO also shows multiple alleles: three alleles exist in the population, though each person carries only two. An Iᴬi × Iᴮi cross can produce children with all four blood types, A, B, AB, and O, in equal proportions.',
          ],
          [
            'Linkage and recombination',
            'Genes close together on the same chromosome tend to be inherited together, which breaks independent assortment. In a test cross of AaBb × aabb, unlinked genes give four classes at about 25% each. Linked genes give mostly parental combinations and fewer recombinant ones. Crossing over in prophase I creates recombinants. Recombination frequency equals recombinant offspring divided by total offspring, and 1% recombination is defined as one map unit, or centimorgan. Frequencies never exceed 50%.',
          ],
          [
            'Complementation',
            'Two mutants with the same recessive phenotype may have defects in the same gene or in different genes. A complementation test crosses them. If the offspring are normal, the mutations complement each other: each parent supplies a working copy of the gene the other lacks, so the mutations are in different genes. If the offspring show the mutant phenotype, neither parent supplies a working copy, so the mutations are in the same gene.',
          ],
          [
            'Recessive epistasis',
            'Epistasis occurs when one gene masks the effect of another. In recessive epistasis, a homozygous recessive genotype at one gene hides the phenotype of a second gene. In Labrador retrievers, gene B gives black (B_) or brown (bb) pigment, but ee dogs cannot deposit pigment in fur and are yellow whatever their B genotype. A cross of BbEe × BbEe gives 9 black : 3 brown : 4 yellow instead of 9 : 3 : 3 : 1, because the two ee classes merge.',
          ],
          [
            'Recognizing modified ratios',
            'Modified ratios are clues. A 1 : 2 : 1 phenotype ratio in a one-gene cross suggests incomplete dominance or codominance. A dihybrid ratio of 9 : 3 : 4 suggests recessive epistasis, and 9 : 7 suggests two genes that are both needed for one product. Test cross data with far more parental than recombinant offspring suggest linkage. State the ratio, name the model it supports, and show the expected numbers so a grader can follow the evidence.',
          ],
        ],
        [
          ['Incomplete dominance', 'The heterozygote shows an intermediate phenotype.'],
          ['Codominance', 'Both alleles are fully expressed in the heterozygote.'],
          ['Linkage', 'The tendency of nearby genes on one chromosome to be inherited together.'],
          [
            'Recombinant',
            'An offspring with an allele combination not found in either parental chromosome.',
          ],
          [
            'Complementation',
            'Restoration of the normal phenotype when mutations in different genes combine.',
          ],
          ['Epistasis', 'An interaction in which one gene masks the expression of another.'],
        ],
        [
          'A test cross of AaBb × aabb gives 420 AB, 412 ab, 85 Ab, and 83 aB offspring. Are the genes linked, and how far apart are they?',
          [
            'Parental classes are the most common: AB and ab (832 offspring).',
            'Recombinant classes are Ab and aB: 85 + 83 = 168 offspring.',
            'Recombination frequency = 168 ÷ 1000 = 0.168, or 16.8%.',
          ],
          'The genes are linked about 16.8 map units apart, since unlinked genes would give four classes of about 250.',
        ],
        [
          [
            'Two pink snapdragons (RW) are crossed. What fraction of offspring are pink?',
            '1/2',
            ['1/4', '3/4', 'All of them'],
            'RW × RW gives 1 RR : 2 RW : 1 WW, so half are pink.',
          ],
          [
            'A BbEe × BbEe cross of Labradors shows recessive epistasis. What phenotype ratio is expected?',
            '9 black : 3 brown : 4 yellow',
            [
              '9 black : 3 brown : 3 yellow : 1 white',
              '12 black : 3 brown : 1 yellow',
              '9 black : 7 yellow',
            ],
            'All ee dogs (4/16) are yellow regardless of B, leaving 9 B_E_ black and 3 bbE_ brown.',
          ],
          [
            'Two white-flowered mutants are crossed and all offspring have purple flowers. What does this show?',
            'The mutations are in different genes',
            ['The mutations are in the same gene', 'Purple is recessive', 'The genes are linked'],
            'Each parent supplies a working copy of the gene the other lacks, so the mutations complement.',
          ],
        ],
        [
          [
            'Explain how incomplete dominance differs from blending inheritance.',
            'In incomplete dominance the heterozygote is intermediate, but the alleles remain unchanged: crossing two heterozygotes brings back both parental phenotypes. Blending would permanently mix the traits.',
          ],
          [
            'Why can recombination frequency never be greater than 50%?',
            'Even for genes far apart, with many crossovers, recombinant and parental gametes become equally likely, which is the same 50% result seen for unlinked genes.',
          ],
          [
            'Parents with blood types A and B have a child with type O. What are the parents’ genotypes?',
            'Iᴬi and Iᴮi. Each parent must carry the recessive i allele for the child to be ii.',
          ],
          [
            'Describe what a 9 : 7 ratio in a dihybrid cross suggests.',
            'Two genes are both required to make the phenotype, such as two enzymes in one pathway. Only A_B_ offspring (9/16) show it; any homozygous recessive genotype at either gene (7/16) blocks it.',
          ],
        ],
        [
          ['Observe', 'Count phenotype classes and compare the ratio to 3 : 1 or 9 : 3 : 3 : 1.'],
          ['Match', 'Link the modified ratio to a model: dominance type, linkage, or epistasis.'],
          ['Verify', 'Calculate expected numbers under the model and compare them with the data.'],
        ],
        [
          [
            'Incomplete dominance',
            'Intermediate heterozygote; 1 : 2 : 1 phenotypes',
            'Looks like codominance unless both products can be seen.',
          ],
          [
            'Linkage',
            'Excess parental classes in a test cross',
            'Crossing over still creates some recombinants.',
          ],
          [
            'Recessive epistasis',
            'ee masks a second gene; 9 : 3 : 4',
            'Needs both genes to be identified to explain.',
          ],
        ],
        'Classify each cross result by the modified ratio it shows before reviewing the evidence.',
        'A modified ratio is evidence for a specific gene interaction model, not a failure of Mendel.',
        true,
      ),
      investigation: evidence(
        [
          ['Parents', 'True-breeding black (BBEE) × yellow (bbee) Labradors.'],
          ['F1', 'All puppies are black.'],
          ['F2 count', '90 black, 31 brown, and 39 yellow puppies.'],
          ['Yellow puppies', 'Some yellow puppies have black noses; others have brown noses.'],
        ],
        'What explains the F2 results?',
        [
          'Two unlinked genes, independent',
          'Recessive epistasis by gene E',
          'Incomplete dominance',
          'Linkage of B and E',
        ],
        1,
        'The F2 ratio 90 : 31 : 39 is close to 9 : 3 : 4 (expected 90 : 30 : 40 of 160). ee dogs are yellow whatever their B genotype, which shows up in their different nose colors.',
      ),
    },
    {
      ...c(
        'Mitosis, meiosis, and karyotypes',
        [
          'Compare the stages and outcomes of mitosis and meiosis.',
          'Explain how meiosis creates genetic variation.',
          'Read a human karyotype and identify abnormalities.',
        ],
        [
          [
            'Chromosomes and ploidy',
            'Human body cells are diploid (2n = 46), with 23 pairs of homologous chromosomes, one from each parent. Homologs carry the same genes, though perhaps different alleles. Before division, each chromosome replicates into two identical sister chromatids joined at the centromere. Gametes are haploid (n = 23). Counting chromosomes means counting centromeres, so a replicated chromosome with two chromatids still counts as one chromosome.',
          ],
          [
            'Mitosis',
            'Mitosis produces two genetically identical diploid daughter cells for growth and repair. In prophase, chromosomes condense and the spindle forms. In metaphase, chromosomes line up single file at the cell’s middle. In anaphase, sister chromatids separate and move to opposite poles. In telophase, nuclear envelopes re-form, and cytokinesis divides the cytoplasm. Interphase, including the S phase in which DNA replicates, comes before mitosis and is not part of it.',
          ],
          [
            'Meiosis I',
            'Meiosis I separates homologous chromosomes. In prophase I, homologs pair to form tetrads, and crossing over exchanges segments between non-sister chromatids at chiasmata. In metaphase I, pairs line up side by side, each pair orienting independently. In anaphase I, homologs move to opposite poles while sister chromatids stay together. The result is two haploid cells whose chromosomes still have two chromatids each. Meiosis I is called the reductional division.',
          ],
          [
            'Meiosis II and variation',
            'Meiosis II resembles mitosis: sister chromatids separate, giving four haploid cells. Variation comes from three sources. Crossing over mixes alleles along a chromosome. Independent orientation in metaphase I gives 2²³, about 8.4 million, chromosome combinations in human gametes. Random fertilization then combines any egg with any sperm. Nondisjunction, a failure of homologs or chromatids to separate, produces gametes with an extra or missing chromosome.',
          ],
          [
            'Preparing a karyotype',
            'A karyotype is an organized picture of a cell’s chromosomes. Cells, often white blood cells, are grown in culture and stopped in metaphase with a drug such as colchicine, when chromosomes are most condensed. The cells are swollen, fixed, spread on a slide, and stained, commonly with Giemsa to give G-bands. Chromosomes are photographed and arranged in pairs by size, centromere position, and banding pattern, with the sex chromosomes last.',
          ],
          [
            'Interpreting a karyotype',
            'Count the chromosomes and check the sex chromosomes first. A normal female is 46,XX and a normal male is 46,XY. Trisomy 21 (47,XX,+21 or 47,XY,+21) causes Down syndrome. 45,X is Turner syndrome and 47,XXY is Klinefelter syndrome. Large structural changes, such as a deletion, duplication, inversion, or translocation, can appear as altered banding. A karyotype cannot detect single-base mutations, which are far too small to see.',
          ],
        ],
        [
          [
            'Homologous chromosomes',
            'A matching pair carrying the same genes, one from each parent.',
          ],
          [
            'Sister chromatids',
            'Two identical copies of a replicated chromosome joined at the centromere.',
          ],
          ['Crossing over', 'Exchange of segments between non-sister chromatids in prophase I.'],
          ['Nondisjunction', 'Failure of chromosomes or chromatids to separate during division.'],
          ['Karyotype', 'An ordered display of a cell’s metaphase chromosomes.'],
          ['Aneuploidy', 'An abnormal number of one or more chromosomes.'],
        ],
        [
          'A diploid cell with 2n = 8 undergoes meiosis. How many chromosomes and chromatids are in each cell at the end of meiosis I and at the end of meiosis II?',
          [
            'Before meiosis, replication gives 8 chromosomes with 16 chromatids.',
            'Meiosis I separates homologs: each cell has 4 chromosomes, still with 2 chromatids each (8 chromatids).',
            'Meiosis II separates sister chromatids: each of four cells has 4 chromosomes with 1 chromatid each.',
          ],
          'After meiosis I: 4 chromosomes and 8 chromatids per cell. After meiosis II: 4 chromosomes and 4 chromatids per cell.',
        ],
        [
          [
            'In which phase do homologous chromosomes separate?',
            'Anaphase I',
            ['Anaphase II', 'Anaphase of mitosis', 'Prophase I'],
            'Meiosis I is the reductional division that separates homologs; sister chromatids separate later.',
          ],
          [
            'A karyotype shows 47 chromosomes with three copies of chromosome 21. What is this condition?',
            'Trisomy 21',
            ['Turner syndrome', 'Klinefelter syndrome', 'Monosomy 21'],
            'Three copies of chromosome 21 cause Down syndrome.',
          ],
          [
            'Why are cells arrested in metaphase to prepare a karyotype?',
            'Chromosomes are most condensed and visible',
            ['DNA is unreplicated', 'Homologs are paired', 'The nucleus is intact'],
            'Condensed metaphase chromosomes show clear size, centromere position, and bands.',
          ],
        ],
        [
          [
            'Give two differences between mitosis and meiosis.',
            'Mitosis makes two identical diploid cells; meiosis makes four genetically different haploid cells. Meiosis includes pairing and crossing over of homologs, which do not occur in mitosis.',
          ],
          [
            'Explain how nondisjunction in meiosis I can produce a trisomy.',
            'If a homologous pair fails to separate, one cell receives both homologs and the other none. A gamete with an extra chromosome fertilized by a normal gamete gives a zygote with three copies.',
          ],
          [
            'List three features used to pair chromosomes in a karyotype.',
            'Overall size, centromere position (metacentric, submetacentric, or acrocentric), and the pattern of stained bands.',
          ],
          [
            'Why can a karyotype not detect a sickle-cell mutation?',
            'Sickle-cell disease is caused by a single base substitution, far too small to change the size or banding of a chromosome under a light microscope.',
          ],
        ],
        [
          ['Replicate', 'DNA copies in S phase, giving two sister chromatids per chromosome.'],
          ['Reduce', 'Meiosis I separates homologs and halves the chromosome number.'],
          ['Separate', 'Meiosis II splits sister chromatids, giving four haploid cells.'],
        ],
        [
          [
            'Mitosis',
            'One division; identical diploid daughters',
            'Errors cause mosaicism, not inherited gamete defects.',
          ],
          [
            'Meiosis',
            'Two divisions; four varied haploid gametes',
            'Nondisjunction produces aneuploid gametes.',
          ],
          [
            'Karyotype',
            'Counts and arranges metaphase chromosomes',
            'Misses small mutations below microscope resolution.',
          ],
        ],
        'Use the karyotype evidence to identify the chromosome condition.',
        'Count centromeres to count chromosomes; karyotypes show number and large structure only.',
      ),
      investigation: evidence(
        [
          ['Total count', '47 chromosomes are visible.'],
          ['Autosomes', 'Each of the 22 autosome pairs has exactly two copies.'],
          ['Sex chromosomes', 'Two X chromosomes and one Y chromosome.'],
          ['Banding', 'No deletions or translocations are visible.'],
        ],
        'Which karyotype has been described?',
        [
          '47,XXY (Klinefelter syndrome)',
          '47,XX,+21',
          '45,X (Turner syndrome)',
          '46,XY normal male',
        ],
        0,
        'The extra chromosome is a sex chromosome: two X chromosomes plus a Y gives 47,XXY.',
      ),
    },
    {
      ...c(
        'DNA structure, replication, and mutation',
        [
          'Describe nucleotide structure, base pairing, and 5′–3′ direction.',
          'Explain events at the replication fork, including proofreading.',
          'Classify mutations and predict their effect on a protein.',
        ],
        [
          [
            'Nucleotides and the double helix',
            'Each DNA nucleotide has a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases: adenine, guanine, cytosine, or thymine. The phosphate of one nucleotide bonds to the 3′ carbon of the next sugar, forming a sugar-phosphate backbone with a 5′ end and a 3′ end. Two strands run antiparallel and are held together by hydrogen bonds between bases: A pairs with T by two bonds, and G pairs with C by three. Purines (A, G) always pair with pyrimidines (T, C).',
          ],
          [
            'Packaging DNA',
            'Eukaryotic DNA wraps around histone proteins to form nucleosomes, which coil into chromatin. Loosely packed euchromatin is usually active in transcription, while tightly packed heterochromatin is usually silent. During division, chromatin condenses further into visible chromosomes. Bacteria have a circular chromosome and may also carry plasmids, small circular DNA molecules that replicate independently and often carry genes such as antibiotic resistance.',
          ],
          [
            'The replication fork',
            'Replication is semiconservative: each new double helix keeps one old strand. Helicase unwinds the helix, single-strand binding proteins hold the strands apart, and topoisomerase relieves twisting ahead of the fork. Primase lays down a short RNA primer, because DNA polymerase can only add nucleotides to an existing 3′ end. DNA polymerase therefore builds new DNA only in the 5′ to 3′ direction.',
          ],
          [
            'Leading and lagging strands',
            'Because the two template strands are antiparallel, one new strand, the leading strand, is made continuously toward the fork. The other, the lagging strand, is made in short Okazaki fragments away from the fork, each starting from its own primer. Primers are later replaced with DNA, and DNA ligase seals the gaps. DNA polymerase also proofreads: its 3′ to 5′ exonuclease activity removes a wrongly paired nucleotide before replication continues.',
          ],
          [
            'Types of mutations',
            'A substitution changes one base. A silent substitution still codes for the same amino acid. A missense substitution changes one amino acid, and a nonsense substitution creates a stop codon, shortening the protein. Insertions and deletions that are not multiples of three cause a frameshift, changing every codon after the mutation. Chromosomal rearrangements include large deletions, duplications, inversions, and translocations, which can disrupt or misplace many genes at once.',
          ],
          [
            'UV damage and repair',
            'Ultraviolet light damages DNA. UVB is absorbed directly by DNA and joins adjacent pyrimidines, especially thymines, into pyrimidine dimers that kink the helix. UVA penetrates deeper and mainly causes indirect damage through reactive oxygen species. Nucleotide excision repair fixes bulky lesions: proteins detect the distortion, nucleases cut the damaged strand on both sides, the short segment is removed, DNA polymerase fills the gap using the other strand, and ligase seals it.',
          ],
        ],
        [
          ['Antiparallel', 'The two DNA strands run in opposite 5′ to 3′ directions.'],
          ['Semiconservative', 'Each daughter helix keeps one parental strand.'],
          ['Okazaki fragment', 'A short DNA piece made on the lagging strand.'],
          ['Proofreading', 'Removal of a mismatched nucleotide by DNA polymerase.'],
          ['Frameshift', 'A change in the reading frame caused by an insertion or deletion.'],
          ['Pyrimidine dimer', 'Two adjacent pyrimidines covalently linked by UV light.'],
        ],
        [
          'A DNA template strand reads 3′-TAC GGA TTC-5′. A mutation changes the third codon’s template to ATC. Classify the mutation.',
          [
            'The mRNA is complementary: 5′-AUG CCU AAG-3′, coding Met–Pro–Lys.',
            'A template of ATC gives the mRNA codon UAG.',
            'UAG is a stop codon, so translation ends after Pro.',
          ],
          'This is a nonsense mutation that shortens the protein to two amino acids.',
        ],
        [
          [
            'Which base pairs with guanine in DNA?',
            'Cytosine',
            ['Adenine', 'Thymine', 'Uracil'],
            'G pairs with C through three hydrogen bonds.',
          ],
          [
            'Why is the lagging strand made in fragments?',
            'DNA polymerase only adds nucleotides to a 3′ end',
            [
              'Helicase works only on one strand',
              'Ligase cannot join long strands',
              'Primers are too long',
            ],
            'The lagging template runs the wrong way for continuous 5′ to 3′ synthesis toward the fork.',
          ],
          [
            'A deletion of one base early in a gene most likely causes which effect?',
            'A frameshift that changes many amino acids',
            [
              'A silent mutation',
              'A single missense change only',
              'No change to the reading frame',
            ],
            'Removing one base shifts every codon downstream.',
          ],
        ],
        [
          [
            'Explain why DNA replication is called semiconservative.',
            'Each new DNA molecule contains one original strand, used as a template, and one newly made strand.',
          ],
          [
            'Describe the roles of helicase, primase, and ligase.',
            'Helicase unwinds the double helix. Primase makes RNA primers that give DNA polymerase a 3′ end to extend. Ligase seals the gaps between Okazaki fragments.',
          ],
          [
            'Distinguish euchromatin from heterochromatin.',
            'Euchromatin is loosely packed and usually transcriptionally active. Heterochromatin is tightly packed and usually silent.',
          ],
          [
            'Outline the steps of nucleotide excision repair.',
            'The helix distortion is recognized, nucleases cut the damaged strand on both sides of the lesion, the segment is removed, DNA polymerase fills the gap using the complementary strand, and ligase seals the backbone.',
          ],
        ],
        [
          ['Unwind', 'Helicase opens the helix; primase adds RNA primers.'],
          ['Extend', 'DNA polymerase builds 5′ to 3′ and proofreads mismatches.'],
          ['Join', 'Primers are replaced and ligase seals Okazaki fragments.'],
        ],
        [
          [
            'Missense',
            'One codon changes to a different amino acid',
            'Effect ranges from harmless to severe.',
          ],
          [
            'Nonsense',
            'A codon becomes a stop codon',
            'Usually gives a short, nonfunctional protein.',
          ],
          [
            'Frameshift',
            'An insertion or deletion not divisible by three',
            'Changes every downstream codon.',
          ],
        ],
        'Classify the mutation from the sequence evidence.',
        'Translate both versions codon by codon before naming a mutation type.',
      ),
      investigation: evidence(
        [
          ['Normal mRNA', '5′-AUG GCU UGG AAA-3′ codes Met–Ala–Trp–Lys.'],
          ['Patient mRNA', '5′-AUG GCU UGA AAA-3′.'],
          ['Protein size', 'The patient’s protein is much shorter than normal.'],
        ],
        'What type of mutation is this?',
        ['Silent', 'Missense', 'Nonsense', 'Frameshift'],
        2,
        'UGG (Trp) became UGA, a stop codon, so translation ends early. The reading frame is unchanged, so it is not a frameshift.',
      ),
    },
    {
      ...c(
        'Gene expression: transcription and translation',
        [
          'Explain the central dogma and the stages of transcription.',
          'Describe RNA processing and the stages of translation.',
          'Explain how the lac and trp operons regulate genes.',
        ],
        [
          [
            'The central dogma',
            'The central dogma describes the flow of genetic information: DNA is transcribed into RNA, and messenger RNA is translated into protein. Each three-base codon in mRNA specifies one amino acid or a stop signal. The genetic code is redundant, since 61 codons specify 20 amino acids, and nearly universal across organisms. AUG is the usual start codon and codes for methionine, while UAA, UAG, and UGA are stop codons.',
          ],
          [
            'Transcription',
            'In initiation, RNA polymerase binds a promoter, often with help from transcription factors, and unwinds the DNA. In elongation, it reads the template strand 3′ to 5′ and builds RNA 5′ to 3′, using uracil in place of thymine. No primer is needed. In termination, a terminator sequence signals polymerase to release the RNA. Activators bind DNA and increase transcription, while repressors block it.',
          ],
          [
            'RNA maturation',
            'Eukaryotic pre-mRNA is processed in the nucleus. A 5′ cap, a modified guanine, protects the RNA and helps ribosomes bind. A poly-A tail of many adenines at the 3′ end adds stability and aids export. Splicing removes introns and joins exons; it is carried out by the spliceosome. Alternative splicing lets one gene produce several proteins by joining different combinations of exons. Bacterial mRNA is not processed this way.',
          ],
          [
            'Translation',
            'Translation happens on ribosomes. In initiation, the small subunit binds the mRNA and finds the start codon, an initiator tRNA carrying methionine pairs with AUG, and the large subunit joins. In elongation, each tRNA’s anticodon pairs with an mRNA codon in the A site, the ribosome links the growing chain to the new amino acid, and then it moves one codon along. In termination, a stop codon binds a release factor, and the protein is freed.',
          ],
          [
            'The lac operon',
            'Bacteria regulate groups of genes called operons. The lac operon’s genes digest lactose. Without lactose, the lac repressor binds the operator and blocks RNA polymerase. When lactose is present, allolactose binds the repressor and changes its shape, so it releases the operator and the genes are transcribed. Expression is highest when glucose is low, because the CAP–cAMP activator then helps polymerase bind. This is an inducible operon.',
          ],
          [
            'The trp operon',
            'The trp operon makes enzymes that synthesize the amino acid tryptophan. It is a repressible operon: it is normally on. When tryptophan is plentiful, tryptophan binds and activates the trp repressor, which then binds the operator and shuts off transcription. When tryptophan is scarce, the repressor is inactive and the genes are expressed. Compare the two: the lac operon turns on when its substrate appears, while the trp operon turns off when its product accumulates.',
          ],
        ],
        [
          ['Codon', 'A three-base mRNA sequence that specifies an amino acid or stop.'],
          ['Anticodon', 'The three tRNA bases that pair with a codon.'],
          ['Promoter', 'The DNA site where RNA polymerase begins transcription.'],
          ['Intron', 'A noncoding region removed from pre-mRNA by splicing.'],
          ['Operon', 'A group of bacterial genes controlled by one promoter and operator.'],
          ['Repressor', 'A protein that blocks transcription by binding the operator.'],
        ],
        [
          'A DNA template strand reads 3′-TAC AAA CCG ATT-5′. Give the mRNA and the amino acid sequence.',
          [
            'Pair each template base: T→A, A→U, C→G, G→C.',
            'The mRNA is 5′-AUG UUU GGC UAA-3′.',
            'Translate: AUG = Met, UUU = Phe, GGC = Gly, UAA = stop.',
          ],
          'The peptide is Met–Phe–Gly, ending at the UAA stop codon.',
        ],
        [
          [
            'Which molecule carries amino acids to the ribosome?',
            'tRNA',
            ['mRNA', 'rRNA only', 'RNA polymerase'],
            'Each tRNA carries one amino acid and pairs with a codon by its anticodon.',
          ],
          [
            'In the lac operon, what happens when lactose is present?',
            'The repressor is released from the operator',
            [
              'The repressor binds more tightly',
              'Tryptophan activates the repressor',
              'Transcription stops',
            ],
            'Allolactose binds the repressor, changing its shape so it cannot bind DNA.',
          ],
          [
            'Which RNA processing step removes introns?',
            'Splicing',
            ['Capping', 'Polyadenylation', 'Termination'],
            'The spliceosome removes introns and joins exons.',
          ],
        ],
        [
          [
            'Contrast an inducible and a repressible operon, with an example of each.',
            'An inducible operon, like lac, is normally off and turns on when an inducer (allolactose) is present. A repressible operon, like trp, is normally on and turns off when a corepressor (tryptophan) builds up.',
          ],
          [
            'Explain how one gene can encode several different proteins.',
            'Alternative splicing joins different combinations of exons from the same pre-mRNA, producing different mature mRNAs and proteins.',
          ],
          [
            'Why does a single base deletion in an intron usually not change the protein?',
            'Introns are removed before translation, so the change is spliced out, unless it disrupts a splice site.',
          ],
          [
            'Describe what happens at the A, P, and E sites during elongation.',
            'A new tRNA enters the A site, the growing chain on the P-site tRNA is joined to its amino acid, and the ribosome moves so the empty tRNA leaves from the E site.',
          ],
        ],
        [
          ['Transcribe', 'RNA polymerase reads the template strand and makes pre-mRNA.'],
          ['Process', 'Cap, tail, and splice the RNA in the nucleus.'],
          ['Translate', 'Ribosomes read codons; tRNAs deliver amino acids.'],
        ],
        [
          [
            'Transcription',
            'DNA template to RNA in the nucleus',
            'Uses uracil and needs no primer.',
          ],
          [
            'Translation',
            'mRNA codons to amino acids on ribosomes',
            'Starts at AUG and ends at a stop codon.',
          ],
          [
            'Operon control',
            'Repressors and activators switch bacterial genes',
            'Mainly prokaryotic; eukaryotes regulate genes individually.',
          ],
        ],
        'Predict operon activity under each set of conditions before opening the evidence.',
        'Follow the information from template to codon to amino acid, and track repressor state for operons.',
      ),
      investigation: evidence(
        [
          ['Medium', 'The bacteria grow with lactose and no glucose.'],
          ['Repressor', 'The lac repressor is not bound to the operator.'],
          ['cAMP', 'cAMP levels are high, and CAP is bound near the promoter.'],
        ],
        'What is the expected lac operon activity?',
        ['Off', 'Low', 'High', 'Only tryptophan genes are on'],
        2,
        'With lactose present, the repressor is released; with glucose absent, CAP–cAMP boosts polymerase binding, so transcription is high.',
      ),
    },
    {
      ...c(
        'Population genetics and Hardy–Weinberg',
        [
          'Calculate allele and genotype frequencies with Hardy–Weinberg equations.',
          'State the five assumptions and what happens when they fail.',
          'Explain drift, founder effects, bottlenecks, migration, fitness, and additive traits.',
        ],
        [
          [
            'Allele frequencies',
            'Population genetics tracks how common alleles are. For a gene with alleles A and a, p is the frequency of A and q is the frequency of a, with p + q = 1. You can count alleles directly from genotype counts: each AA individual has two A alleles and each Aa individual has one. In a population of 100 with 36 AA, 48 Aa, and 16 aa, there are 120 A alleles out of 200, so p = 0.6 and q = 0.4.',
          ],
          [
            'The Hardy–Weinberg equation',
            'If a population is in Hardy–Weinberg equilibrium, genotype frequencies are p² for AA, 2pq for Aa, and q² for aa, adding to 1. These frequencies stay constant from generation to generation. The equation is most useful for recessive traits: the fraction of affected aa individuals equals q², so q is its square root. If 1 in 10,000 people has a recessive disorder, q = 0.01, p = 0.99, and carriers are about 2pq ≈ 0.0198, nearly 2%.',
          ],
          [
            'The five assumptions',
            'Equilibrium requires a very large population, random mating, no mutation, no migration, and no natural selection. Real populations almost never meet all five, so the model is a null hypothesis: when observed genotype frequencies differ from p², 2pq, and q², at least one assumption is being violated. Identifying which one, such as nonrandom mating that creates too few heterozygotes, is a common test question.',
          ],
          [
            'Genetic drift, founders, and bottlenecks',
            'Genetic drift is a random change in allele frequency, strongest in small populations. A founder effect occurs when a few individuals start a new population and, by chance, carry different allele frequencies from the source population. A bottleneck occurs when a population is suddenly reduced, as after a disaster, leaving survivors with fewer alleles. Both reduce genetic diversity, and rare alleles may be lost or become unusually common.',
          ],
          [
            'Migration and fitness',
            'Migration, or gene flow, moves alleles between populations and tends to make them more similar. Natural selection changes allele frequencies by differences in relative fitness: an individual’s reproductive success compared with the most successful genotype, which is given a fitness of 1. If aa individuals have relative fitness 0.5, they leave half as many offspring, so q tends to fall over generations, though slowly once a is rare and mostly hidden in heterozygotes.',
          ],
          [
            'Additive alleles and continuous traits',
            'Traits like human height show continuous variation because many genes each add a small amount. With additive alleles, each contributing allele adds the same increment. If n genes contribute, the F2 of a cross between two extremes shows 2n + 1 phenotype classes, and the fraction matching one extreme is (1/4)ⁿ. If 1/64 of an F2 matches a parent, then (1/4)ⁿ = 1/64, so three genes contribute. Environment also blurs these classes into a smooth curve.',
          ],
        ],
        [
          ['Allele frequency', 'The proportion of all copies of a gene that are one allele.'],
          [
            'Hardy–Weinberg equilibrium',
            'Constant allele and genotype frequencies when no evolutionary forces act.',
          ],
          ['Genetic drift', 'Random change in allele frequencies, strongest in small populations.'],
          ['Founder effect', 'Drift caused by a few individuals starting a new population.'],
          ['Gene flow', 'Movement of alleles between populations by migration.'],
          ['Relative fitness', 'Reproductive success compared with the most successful genotype.'],
        ],
        [
          'In a Hardy–Weinberg population, 9% of individuals show a recessive trait. What percentage are carriers?',
          [
            'Affected individuals are aa: q² = 0.09, so q = 0.3.',
            'p = 1 − q = 0.7.',
            'Carriers are Aa: 2pq = 2 × 0.7 × 0.3 = 0.42.',
          ],
          'About 42% of the population is heterozygous, far more than the 9% who show the trait.',
        ],
        [
          [
            'If q = 0.2 in a Hardy–Weinberg population, what is the frequency of AA?',
            '0.64',
            ['0.04', '0.32', '0.8'],
            'p = 0.8, and p² = 0.64.',
          ],
          [
            'A storm kills most of an island’s lizards, and the survivors carry only a few alleles. What is this?',
            'A bottleneck',
            ['A founder effect', 'Gene flow', 'Directional selection'],
            'A sudden drop in population size randomly reduces diversity.',
          ],
          [
            'Which violation would most directly produce fewer heterozygotes than 2pq?',
            'Nonrandom (inbreeding) mating',
            ['Very large population size', 'No mutation', 'No migration'],
            'Inbreeding increases homozygotes and decreases heterozygotes.',
          ],
        ],
        [
          [
            'List the five Hardy–Weinberg assumptions.',
            'Very large population, random mating, no mutation, no migration (gene flow), and no natural selection.',
          ],
          [
            'Explain why selection against a rare recessive allele is slow.',
            'When q is small, nearly all copies of the allele are in heterozygous carriers, who are not selected against, so few copies are removed each generation.',
          ],
          [
            'A population has 49 AA, 42 Aa, and 9 aa individuals. Is it in Hardy–Weinberg equilibrium?',
            'p = (98 + 42) ÷ 200 = 0.7 and q = 0.3. Expected: 49 AA, 42 Aa, 9 aa. The observed counts match exactly, consistent with equilibrium.',
          ],
          [
            'In a cross of two extreme parents for an additive trait, 1/256 of the F2 match one parent. How many genes contribute?',
            '(1/4)ⁿ = 1/256 gives n = 4 genes.',
          ],
        ],
        [
          ['Count', 'Convert genotype counts to allele frequencies p and q.'],
          ['Predict', 'Compute p², 2pq, and q² for the next generation.'],
          ['Compare', 'Differences from expectation point to a violated assumption.'],
        ],
        [
          [
            'Genetic drift',
            'Random change in small populations',
            'Direction is unpredictable; not adaptive.',
          ],
          [
            'Natural selection',
            'Fitness differences change allele frequencies',
            'Slow against rare recessive alleles.',
          ],
          [
            'Gene flow',
            'Migration shares alleles between populations',
            'Makes populations more similar over time.',
          ],
        ],
        'Test whether the sample population is in equilibrium using the counts provided.',
        'Hardy–Weinberg is a null model: departures point to the force that is acting.',
      ),
      investigation: evidence(
        [
          ['Sample', '200 plants: 90 AA, 40 Aa, 70 aa.'],
          ['Allele frequencies', 'p = 0.55 and q = 0.45.'],
          ['Expected Aa', '2pq × 200 = 99 heterozygotes.'],
          ['Mating system', 'The plants mostly self-pollinate.'],
        ],
        'What best explains the data?',
        [
          'Equilibrium holds',
          'Inbreeding reduces heterozygotes',
          'Gene flow adds heterozygotes',
          'Mutation is very fast',
        ],
        1,
        'Only 40 heterozygotes were seen instead of 99. Self-pollination is nonrandom mating, which increases homozygotes without changing allele frequencies.',
      ),
    },
    {
      ...c(
        'PCR and Sanger sequencing',
        [
          'List PCR components and explain each temperature step.',
          'Calculate PCR product copies and identify questions PCR can answer.',
          'Explain how Sanger sequencing differs from PCR.',
        ],
        [
          [
            'Why copy DNA?',
            'Many experiments need much more of one DNA segment than a sample provides. The polymerase chain reaction (PCR) copies a chosen region millions of times in a test tube. It is used to detect pathogens, compare DNA from a crime scene with a suspect, check whether an organism carries a gene, and prepare DNA for sequencing. PCR copies only the segment between two primers, not the whole genome.',
          ],
          [
            'PCR components',
            'A PCR reaction needs a DNA template containing the target, two primers that are complementary to the ends of the target on opposite strands, a heat-stable DNA polymerase such as Taq polymerase from the hot-spring bacterium Thermus aquaticus, the four deoxynucleotide triphosphates (dNTPs), a buffer, and magnesium ions that the polymerase needs. A thermocycler changes the temperature in repeated cycles.',
          ],
          [
            'Denaturation, annealing, and extension',
            'In denaturation, near 94–95 °C, hydrogen bonds break and the two strands separate. In annealing, cooled to roughly 50–65 °C, primers bind to complementary sequences on each single strand. In extension, near 72 °C, the optimum for Taq, polymerase adds dNTPs to the 3′ end of each primer, copying the template. Annealing temperature matters: too high and primers cannot bind, too low and they bind to wrong sites.',
          ],
          [
            'Exponential copying',
            'Each cycle roughly doubles the number of target copies. Starting with one double-stranded molecule, the reaction gives up to 2ⁿ copies after n cycles, so 30 cycles give about a billion. Products of exactly the target length dominate after a few cycles, because new strands start and stop at the primers. Real reactions slow down as primers and dNTPs run out, so copy numbers level off.',
          ],
          [
            'Sanger sequencing',
            'Sanger sequencing reads the order of bases. Like PCR it uses a template, a polymerase, and dNTPs, but it uses only one primer, so copying runs in one direction and is not exponential. It also adds a small amount of dideoxynucleotides (ddNTPs), which lack a 3′ hydroxyl group. When a ddNTP is added, the strand cannot grow further, so the reaction makes fragments that end at every position.',
          ],
          [
            'Reading the sequence',
            'In modern Sanger sequencing each ddNTP carries a different fluorescent dye. Fragments are separated by size with capillary electrophoresis, smallest first, and a detector records the color of each. Reading colors from smallest to largest fragment gives the new strand’s sequence 5′ to 3′, which is complementary to the template. Sanger sequencing answers questions such as which mutation a patient carries or whether a cloned gene has the expected sequence.',
          ],
        ],
        [
          ['Primer', 'A short single strand that gives polymerase a 3′ end to extend.'],
          ['Taq polymerase', 'Heat-stable DNA polymerase used in PCR.'],
          ['Denaturation', 'Separating DNA strands with heat.'],
          ['Annealing', 'Binding of primers to complementary template sequences.'],
          ['dNTP', 'A deoxynucleotide building block for new DNA.'],
          ['ddNTP', 'A chain-terminating nucleotide lacking a 3′ hydroxyl group.'],
        ],
        [
          'A PCR starts with 50 copies of a target. Assuming perfect doubling, how many copies are present after 10 cycles?',
          ['Each cycle doubles the copies: multiply by 2¹⁰.', '2¹⁰ = 1024.', '50 × 1024 = 51,200.'],
          'About 51,200 copies, an upper limit; real efficiency is usually a little lower.',
        ],
        [
          [
            'Why is Taq polymerase used in PCR?',
            'It survives the high denaturation temperature',
            ['It needs no primers', 'It copies RNA', 'It works best at 37 °C'],
            'Taq comes from a hot-spring bacterium and stays active through repeated heating to about 95 °C.',
          ],
          [
            'What happens during the annealing step?',
            'Primers bind to complementary sequences',
            ['Strands separate', 'Polymerase adds nucleotides', 'Primers are removed'],
            'Cooling lets primers form hydrogen bonds with the single-stranded template.',
          ],
          [
            'What makes a ddNTP stop chain growth?',
            'It lacks a 3′ hydroxyl group',
            ['It has no base', 'It lacks a phosphate', 'It pairs with uracil'],
            'Without a 3′ –OH, the next nucleotide cannot be attached.',
          ],
        ],
        [
          [
            'Give the temperature and purpose of each PCR step.',
            'Denaturation, about 95 °C, separates strands. Annealing, about 50–65 °C, lets primers bind. Extension, about 72 °C, lets Taq polymerase add nucleotides.',
          ],
          [
            'List two ways Sanger sequencing differs from PCR.',
            'Sanger uses one primer, so copying is linear rather than exponential, and it includes labeled ddNTPs that stop chains at every position.',
          ],
          [
            'Name an experimental question that PCR could answer.',
            'Whether a sample contains DNA from a particular pathogen, detected by whether a target-specific product forms.',
          ],
          [
            'Why might a PCR produce extra, unexpected bands?',
            'If the annealing temperature is too low, primers bind partly matching sites, so polymerase copies other regions.',
          ],
        ],
        [
          ['Denature', 'Heat to about 95 °C to separate strands.'],
          ['Anneal', 'Cool so primers bind the target ends.'],
          ['Extend', 'Taq adds dNTPs at about 72 °C, doubling the target.'],
        ],
        [
          [
            'PCR',
            'Two primers; exponential copying of a region',
            'Detects presence but does not give the sequence.',
          ],
          [
            'Sanger sequencing',
            'One primer plus ddNTPs; fragments end at each base',
            'Reads hundreds of bases per reaction.',
          ],
          [
            'Annealing temperature',
            'Controls how specifically primers bind',
            'Too low gives wrong products; too high gives none.',
          ],
        ],
        'Use the gel evidence to decide which sample contains the target.',
        'Every PCR product begins and ends at the primers; Sanger adds chain terminators to read bases.',
      ),
      investigation: evidence(
        [
          ['Positive control', 'Known target DNA gives a 450 bp band.'],
          ['Negative control', 'Water gives no band.'],
          ['Sample 1', 'One band at 450 bp.'],
          ['Sample 2', 'No band, but a later test shows its DNA is intact.'],
        ],
        'Which conclusion is best supported?',
        [
          'Both samples have the target',
          'Only sample 1 has the target',
          'The PCR failed',
          'Only sample 2 has the target',
        ],
        1,
        'Controls worked, so the reaction ran correctly. Sample 1 matches the positive control; sample 2 had usable DNA but no product, so it lacks the target.',
      ),
    },
  ],
});
