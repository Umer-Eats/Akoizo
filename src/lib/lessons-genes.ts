import { buildCourse } from './lesson-course-builder.ts';
import { chapter as c } from './course-authoring.ts';
export const genesLessons = buildCourse({
  eventId: 'designer-genes',
  eventName: 'Designer Genes',
  prefix: 'gene',
  lab: 'genetics',
  syllabus: 'Designer Genes C SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Ten units connect Mendelian probabilities, inheritance, linkage, cell division, molecular genetics, regulation, populations, evolution, and biotechnology. Synthetic crosses and population bars show expected probabilities, not deterministic family outcomes. Unit 10 is optional application material.',
  references: [
    {
      title: 'OpenStax Biology 2e',
      url: 'https://openstax.org/books/biology-2e/pages/1-introduction',
    },
    { title: 'NHGRI genetics glossary', url: 'https://www.genome.gov/genetics-glossary' },
  ],
  chapters: [
    c(
      'Mendelian inheritance and probability',
      [
        'Separate genotype and phenotype.',
        'Construct gametes before a Punnett square.',
        'Use product and sum rules appropriately.',
      ],
      [
        [
          'Mendel’s experimental logic',
          'Controlled crosses and counts across generations let Mendel distinguish competing inheritance models. The key reasoning was not merely noticing similar offspring but tracking discrete trait patterns and testing predictions. Modern alleles are alternative sequence forms at a locus, and diploid organisms typically carry two copies of an autosomal locus. Genotype describes allele combination; phenotype describes an observed trait influenced by genotype and often environment.',
        ],
        [
          'Segregation',
          'During meiosis, the two alleles at a locus segregate into gametes under the ordinary model. An Aa individual produces A and a gametes with equal expected frequencies if segregation is unbiased. Fertilization combines one gamete from each parent. A Punnett square records possible combinations and their probabilities; it is not a schedule requiring each family of four to contain every outcome exactly once.',
        ],
        [
          'Dominance',
          'Complete dominance means one heterozygous phenotype resembles one homozygote for the specified trait. Dominant does not mean more common, stronger, or more beneficial. The phenotype ratio 3:1 for Aa × Aa requires complete dominance and other model assumptions. Genotype probabilities remain 1/4 AA, 1/2 Aa, 1/4 aa. State the phenotype rule separately from the genetic cross.',
        ],
        [
          'Probability rules',
          'Multiply probabilities for independent events and add probabilities for mutually exclusive alternatives. For independent loci in an AaBb cross, the probability of aabb is 1/4 × 1/4 = 1/16. If events are not independent, use conditional probabilities instead. The word or does not justify simple addition when events overlap. Draw event sets or enumerate gametes to avoid counting one outcome twice.',
        ],
        [
          'Sampling variation',
          'Expected ratios describe long-run behavior under assumptions. Small samples can differ substantially by chance, and a mismatch alone does not prove an alternative inheritance mechanism. Consider sample size, viability, scoring, and segregation assumptions. Repeated offspring outcomes are usually modeled as independent conditional on parental genotypes, not influenced by whether the previous child inherited one allele. Avoid the gambler’s fallacy.',
        ],
        [
          'Using the cross lab',
          'Choose both parental genotypes and inspect labeled gametes and offspring cells. Toggle complete versus incomplete dominance to see phenotype interpretation change while genotype probabilities remain fixed. Explain the allele transmission mechanism before quoting a ratio. The lab has one autosomal locus and does not model sex linkage, penetrance, linkage, or selection; those topics require additional assumptions developed in later units.',
        ],
      ],
      [
        ['Allele', 'Alternative form at a genetic locus.'],
        ['Genotype', 'Allele combination.'],
        ['Phenotype', 'Observed trait.'],
        ['Segregation', 'Separation of alleles into gametes.'],
      ],
      [
        'Find P(aa) for Aa × Aa and P(two independent aa offspring).',
        [
          'Each parent passes a with probability 1/2.',
          'One aa probability is 1/4.',
          'Two independent aa offspring have probability (1/4)² = 1/16.',
        ],
        'Expected ratios do not force exact family counts.',
      ],
      [
        [
          'Dominant means…',
          'Expressed in the specified heterozygote model',
          ['Always common', 'Always beneficial', 'Always stronger'],
          'Dominance describes phenotype.',
        ],
        ['Aa × Aa gives P(aa)…', '1/4', ['1/2', '3/4', '1'], 'Two a gametes must combine.'],
        [
          'A Punnett square describes…',
          'Probabilities',
          ['A guaranteed birth order', 'Mutation rates always', 'Only phenotypes'],
          'It enumerates combinations.',
        ],
      ],
      [
        [
          'Distinguish genotype and phenotype.',
          'Genotype is allele combination; phenotype is the observed trait under its biological context.',
        ],
        [
          'When can probabilities multiply?',
          'For independent events or with suitable conditional probabilities.',
        ],
        [
          'Why can a small family miss a 3:1 ratio?',
          'Sampling variation means expected ratios are not exact quotas.',
        ],
        [
          'What is fixed when the lab changes dominance mode?',
          'The genotype probabilities from parental gametes.',
        ],
      ],
      [
        ['Gametes', 'Determine transmitted alleles.'],
        ['Combine', 'Multiply gamete probabilities.'],
        ['Interpret', 'Apply the stated phenotype rule.'],
      ],
      [
        ['Genotype', 'Allele combination', 'Does not alone define every trait.'],
        ['Dominance', 'Heterozygote phenotype', 'Not frequency or fitness.'],
        ['Expectation', 'Probability model', 'Not an exact family quota.'],
      ],
      'Compare Aa × Aa under complete and incomplete dominance. Record which genotype and phenotype probabilities change.',
      'Inheritance predictions combine transmission probabilities with a separate phenotype model.',
    ),
    c(
      'Pedigrees and extensions of Mendelian patterns',
      [
        'Compare autosomal and sex-linked models.',
        'Recognize incomplete dominance and codominance.',
        'Explain penetrance and pedigree uncertainty.',
      ],
      [
        [
          'Pedigree evidence',
          'A pedigree records relationships and observed phenotypes with a defined symbol key. Infer possible genotypes under an explicit inheritance model rather than assigning one from appearance alone. An unaffected person may carry a recessive allele. Small pedigrees can fit several models, and missing observations matter. State whether outsiders’ allele frequencies are assumed rare; that shortcut can change inferred probabilities and should never be silently treated as fact.',
        ],
        [
          'Autosomal patterns',
          'Autosomal dominant traits can appear across generations under high penetrance, while recessive traits can appear in offspring of unaffected carriers. These are clues, not proof. New variants, incomplete penetrance, variable expression, and small family size can obscure patterns. Affected parents do not automatically imply all offspring are affected. Use genotype constraints for each relationship and identify which observation would reject the proposed model.',
        ],
        [
          'Sex-linked inheritance',
          'For a simple X-linked recessive model, a typical XY individual has one X-linked copy, while a typical XX individual has two. A father transmits his X to daughters and Y to sons under the standard chromosomal model, so father-to-son transmission of an X-linked allele is absent. State the biological assumptions and locus location. Sex-associated prevalence alone does not prove X linkage; sampling and other mechanisms can produce differences.',
        ],
        [
          'Beyond complete dominance',
          'Incomplete dominance gives a heterozygote phenotype distinct from either homozygote, while codominance expresses distinguishable contributions of both alleles. Multiple alleles can exist in a population even though one diploid individual carries two at a locus. ABO blood groups illustrate multiple alleles and codominance in a simplified model. Do not confuse two alleles per individual with only two possible alleles in the whole population.',
        ],
        [
          'Penetrance and expression',
          'Penetrance is the proportion of individuals with a genotype showing a specified phenotype under defined conditions. Expressivity describes variation in degree or form of the phenotype. Environment, age, other genes, and measurement influence observations. A genotype probability and a phenotype probability can therefore differ. A family-tree exercise is a mathematical model, not a clinical risk assessment for a real family.',
        ],
        [
          'Comparing models',
          'List expected transmissions, compatible genotypes, and exceptions each model would need. Prefer a model supported by the full pedigree rather than one dramatic relationship. The lab contrasts complete and incomplete dominance for one autosomal locus; it does not automatically reproduce a sex-linked pedigree. Explain the extra chromosome-specific gamete information required. Distinguishing model scope prevents a familiar square from being used for the wrong inheritance system.',
        ],
      ],
      [
        ['Penetrance', 'Frequency of a defined phenotype among a genotype group.'],
        ['Expressivity', 'Degree or form of expression.'],
        ['Codominance', 'Distinguishable contributions from both alleles.'],
        [
          'Carrier',
          'Individual carrying a recessive allele without the modeled recessive phenotype.',
        ],
      ],
      [
        'Two unaffected carriers of an autosomal recessive trait have a child. Find the modeled affected probability.',
        [
          'Assign Aa to both parents.',
          'Aa × Aa gives 1/4 aa.',
          'Under complete penetrance, affected probability is 1/4.',
        ],
        'Penetrance or other assumptions can change phenotype probability.',
      ],
      [
        [
          'Father-to-son transmission of his X allele occurs in the standard model?',
          'No',
          ['Always', 'Half the time', 'Only if dominant'],
          'A typical father gives sons his Y.',
        ],
        [
          'Incomplete dominance changes…',
          'Heterozygote phenotype interpretation',
          ['Gamete segregation automatically', 'Chromosome number always', 'DNA direction'],
          'Transmission can stay the same.',
        ],
        [
          'Penetrance concerns…',
          'Whether a specified phenotype appears',
          ['Only severity', 'Only allele count', 'Only ancestry'],
          'Expressivity describes degree.',
        ],
      ],
      [
        [
          'Why can pedigrees be ambiguous?',
          'Small samples, missing data, penetrance, and alternative models can fit the same observations.',
        ],
        [
          'How many alleles can a population have?',
          'More than two at a locus even though a diploid individual normally carries two.',
        ],
        [
          'Distinguish codominance and incomplete dominance.',
          'Codominance reveals both contributions; incomplete dominance gives an intermediate or distinct heterozygote phenotype.',
        ],
        [
          'What must be added for an X-linked square?',
          'Chromosome-specific gametes and the stated sex-chromosome model.',
        ],
      ],
      [
        ['Record', 'Use a clear pedigree key.'],
        ['Constrain', 'Assign possible genotypes under a model.'],
        ['Compare', 'Test all relationships and limitations.'],
      ],
      [
        ['Dominance', 'Phenotype relationship', 'Not penetrance.'],
        ['Penetrance', 'Presence frequency', 'Not severity.'],
        ['Expressivity', 'Variation in expression', 'Can depend on context.'],
      ],
      'Toggle dominance mode for the same cross and explain how a pedigree phenotype could change without altered segregation.',
      'Pedigrees constrain inheritance models but rarely justify unstated biological assumptions.',
    ),
    c(
      'Linkage, mapping, epistasis, and complementation',
      [
        'Estimate recombination fraction.',
        'Separate gene interaction from linkage.',
        'Interpret complementation with assumptions.',
      ],
      [
        [
          'Linked loci',
          'Genes on the same chromosome can be transmitted together more often than expected under independent assortment. Phase matters: AB/ab and Ab/aB contain the same allele set but different arrangements. A testcross can reveal parental and recombinant gamete classes when the tester makes their phenotypes distinguishable. Do not assume the largest two classes are parental without considering scoring, viability, and the experimental design.',
        ],
        [
          'Recombination maps',
          'Recombination fraction is recombinant offspring divided by informative total under the testcross model. For short intervals, percent recombination approximates map distance in centimorgans. Multiple crossovers can hide events, so larger map distances do not equal simple observed fractions. Recombination fraction approaches at most 0.5 for ordinary two-locus observations, even when loci are far apart. Genetic distance is not a fixed physical number of base pairs.',
        ],
        [
          'Three-point reasoning',
          'Three-point crosses can identify gene order by comparing parental and double-recombinant classes under suitable assumptions. Count recombination in each interval, including double crossovers in both intervals. Interference compares observed double crossovers with an independence-based expectation. Carefully label locus order and phase before arithmetic. Without the offspring classes, a memorized formula cannot identify the correct middle gene.',
        ],
        [
          'Epistasis',
          'Epistasis occurs when the effect of an allele at one locus depends on another locus. A pathway with one gene needed to make a precursor and another modifying it can produce phenotype ratios unlike simple 9:3:3:1. Ratios such as 9:3:4 arise in particular recessive-epistasis models, not every gene interaction. Explain the biochemical or logical phenotype mapping before naming a ratio. Linkage concerns transmission; epistasis concerns phenotype relationships.',
        ],
        [
          'Complementation',
          'A classical complementation test asks whether two recessive mutant defects restore a reference phenotype when combined in a suitable organism or cell. Restoration often suggests defects in different genes, while failure can suggest the same gene. Assumptions include appropriate recessivity and experimental context; exceptions exist. Do not equate complementation with crossing over or with one allele becoming dominant. State what the combined genotype tests.',
        ],
        [
          'Model separation',
          'The one-locus lab cannot produce recombination or two-locus epistasis by changing a dominance toggle. Use its gamete logic as a foundation, then draw two-locus haplotypes and explicit phenotype rules. Check whether a ratio mismatch is caused by linked transmission, interaction, viability, or sampling. A good explanation identifies the mechanism and the observation that distinguishes it from alternatives.',
        ],
      ],
      [
        ['Haplotype', 'Allele combination on one chromosome.'],
        ['Recombination fraction', 'Fraction of informative recombinant outcomes.'],
        ['Epistasis', 'Locus-dependent effect on phenotype.'],
        ['Complementation', 'Functional restoration when suitable mutant defects combine.'],
      ],
      [
        'A testcross has 420, 430, 70, and 80 offspring in two parental and two recombinant classes. Estimate short-interval distance.',
        [
          'Total is 1000.',
          'Recombinants total 150; fraction = 0.15.',
          'Approximate distance is 15 cM, subject to missed crossovers and other assumptions.',
        ],
        'Map distance is not a base-pair count.',
      ],
      [
        [
          'Linkage mainly concerns…',
          'Transmission together',
          ['Only phenotype masking', 'Only protein folding', 'Only expression level'],
          'Chromosomal arrangement affects gametes.',
        ],
        [
          'Epistasis mainly concerns…',
          'Interaction in phenotype effects',
          ['Physical distance alone', 'Only chromosome count', 'Only DNA replication'],
          'Phenotype mapping depends on loci.',
        ],
        [
          'Observed two-locus recombination fraction can normally approach…',
          '0.5',
          ['2', '10', '100'],
          'Distant loci can appear independently assorted.',
        ],
      ],
      [
        ['Why record phase?', 'It defines which allele combinations are parental.'],
        [
          'Why can mapping underestimate events?',
          'Multiple crossovers can restore parental marker combinations.',
        ],
        [
          'What does complementation suggest?',
          'Under suitable recessive-mutant assumptions, restoration often indicates defects in different genes.',
        ],
        [
          'Why not memorize one epistatic ratio?',
          'Different pathway and phenotype rules generate different ratios.',
        ],
      ],
      [
        ['Phase', 'Label chromosome allele combinations.'],
        ['Count', 'Separate parental and recombinant classes.'],
        ['Explain', 'Distinguish transmission from phenotype interaction.'],
      ],
      [
        ['Linkage', 'Gamete association', 'Not epistasis.'],
        ['Map distance', 'Recombination-based estimate', 'Not fixed physical length.'],
        ['Complementation', 'Functional genetic test', 'Has model-dependent exceptions.'],
      ],
      'Explain what extra loci and haplotype controls would be required beyond the single-locus lab to simulate a testcross.',
      'Different genetic mechanisms can change ratios for fundamentally different reasons.',
    ),
    c(
      'Chromosomes, mitosis, meiosis, and mutations',
      [
        'Count chromosomes and chromatids correctly.',
        'Locate segregation events.',
        'Interpret nondisjunction and rearrangements.',
      ],
      [
        [
          'Counting definitions',
          'A replicated chromosome has two sister chromatids joined around a centromeric region. Chromosome counting usually follows centromeres, so DNA replication doubles DNA content without immediately doubling chromosome number. Homologous chromosomes carry corresponding loci but can have different alleles. Sisters are replicated copies subject to later changes. Keep ploidy, chromosome number, chromatid count, and DNA amount distinct in every stage diagram.',
        ],
        [
          'Mitosis',
          'Mitosis segregates replicated chromosomes into daughter nuclei, generally preserving chromosome complement in the ordinary model. Prophase, metaphase, anaphase, and telophase describe major organizational changes, followed or accompanied by cytokinesis. DNA replication occurs before mitosis in S phase, not between every mitotic stage. Cell division can serve growth, maintenance, or asexual reproduction depending on the organism. Do not equate mitosis with gamete production universally.',
        ],
        [
          'Meiosis I',
          'Homologs pair and recombination can occur during prophase I. Homologous chromosomes segregate in the first division, reducing ploidy in the standard diploid-to-haploid pathway. Independent orientation of homolog pairs contributes variation for unlinked loci. Crossing over occurs between nonsister chromatids of homologs, not simply between any two chromosomes. Distinguish homolog separation from sister-chromatid separation to explain allele segregation correctly.',
        ],
        [
          'Meiosis II',
          'Sister chromatids separate in meiosis II, usually without an intervening round of DNA replication. The products reflect both recombination and chromosome assortment. Four meiotic products do not always become four equivalent functional gametes in every organism. Label the biological system before generalizing a textbook diagram. A haploid chromosome can still be replicated before sisters separate; haploid does not mean one chromatid by definition.',
        ],
        [
          'Segregation errors',
          'Nondisjunction is failure of appropriate chromosome or chromatid separation. Errors in different divisions produce different patterns among gametes in a simple model. Aneuploidy changes individual chromosome number, while polyploidy changes whole sets. Structural changes include deletions, duplications, inversions, and translocations. Their effects depend on size, genes, breakpoint position, dosage, and segregation behavior rather than the name alone.',
        ],
        [
          'Reading diagrams',
          'Count centromeres and DNA units at the stated stage, then trace where each goes. Do not infer a chromosome number from the number of colored lines without a legend. The cross lab assumes successful meiosis and equal allele segregation; nondisjunction would require a different gamete model. Explain which underlying assumption fails and how offspring probabilities would need to be recomputed.',
        ],
      ],
      [
        ['Homolog', 'Chromosome with corresponding loci in a pair.'],
        ['Chromatid', 'One replicated chromosome copy.'],
        ['Ploidy', 'Number of chromosome sets.'],
        ['Nondisjunction', 'Failure of appropriate segregation.'],
      ],
      [
        'A diploid cell has 2n=6. Immediately after S phase, count chromosomes and chromatids.',
        [
          'There are still six centromere-defined chromosomes.',
          'Each has two sister chromatids.',
          'There are twelve chromatids; DNA content doubled.',
        ],
        'Replication changes DNA amount without immediately changing chromosome count.',
      ],
      [
        [
          'Meiosis I normally separates…',
          'Homologs',
          ['All sister chromatids', 'Only RNA', 'Only proteins'],
          'It is the reductional division.',
        ],
        [
          'S phase primarily…',
          'Replicates DNA',
          ['Separates homologs', 'Halves chromosome sets', 'Creates all mutations'],
          'It precedes division.',
        ],
        [
          'Aneuploidy changes…',
          'Individual chromosome number',
          ['Only whole-set number', 'Only protein color', 'Only cell shape'],
          'Polyploidy concerns whole sets.',
        ],
      ],
      [
        ['When do sisters separate in ordinary meiosis?', 'Meiosis II.'],
        ['What crosses over?', 'Nonsister chromatids of paired homologous chromosomes.'],
        [
          'Why distinguish DNA content and ploidy?',
          'Replication can change DNA amount while the number of chromosome sets stays the same.',
        ],
        [
          'What assumption does the Punnett lab make?',
          'Normal segregation with specified equal gamete probabilities.',
        ],
      ],
      [
        ['Replicate', 'Make sister chromatids.'],
        ['Pair', 'Homologs recombine and segregate.'],
        ['Separate', 'Sisters segregate in the second division.'],
      ],
      [
        ['Homologs', 'Corresponding loci', 'Can carry different alleles.'],
        ['Sisters', 'Replicated copies', 'Not the homolog pair.'],
        ['Ploidy', 'Set count', 'Not DNA mass.'],
      ],
      'Trace how an Aa parent produces gametes in the lab. Identify the meiotic event supporting the one-half probabilities.',
      'Accurate genetics diagrams distinguish chromosome sets, centromeres, and replicated DNA.',
    ),
    c(
      'DNA replication, transcription, and translation',
      [
        'Apply complementary base pairing and directionality.',
        'Explain semiconservative replication.',
        'Interpret coding changes in a stated frame.',
      ],
      [
        [
          'DNA organization',
          'DNA has antiparallel strands with complementary base pairing. Sequence order carries information, while sugar–phosphate backbones provide directional structure. A pairs with T and G with C in the standard DNA model. Complementarity supports copying but does not make the two strands identical when written in the same direction. Label 5′ and 3′ ends before constructing a reverse complement or identifying a template.',
        ],
        [
          'Replication',
          'Semiconservative replication produces daughter molecules containing one parental and one newly synthesized strand. Polymerases extend from a primer in the 5′ to 3′ direction. Leading and lagging synthesis reflect antiparallel templates and fork movement, with fragments joined on the lagging side. Helicases, primases, ligases, and other proteins contribute distinct functions. A fork drawing must specify direction; the top strand is not inherently the leading strand.',
        ],
        [
          'Transcription',
          'RNA polymerase uses a DNA template to make complementary RNA. Promoters and regulatory context determine initiation, while termination and processing differ across organisms. The coding strand resembles the RNA sequence with T/U substitution, but mature eukaryotic transcripts can differ through splicing. One DNA region can yield multiple transcript products under appropriate regulation. Separate copying a short sequence exercise from the full biological process.',
        ],
        [
          'Translation',
          'Ribosomes read codons and tRNAs deliver amino acids under the genetic code. The start position determines the frame; insertions or deletions not divisible by three can shift downstream codons in a coding region. Stop codons signal termination. Wobble and redundancy mean several codons can encode one amino acid. Redundancy is not ambiguity: a codon normally has a defined meaning in the specified code.',
        ],
        [
          'Mutation consequences',
          'A substitution can be synonymous, missense, or nonsense within a given coding frame. The same DNA change can have different implications in a regulatory region or a noncoding transcript. Effects depend on context, expression, protein structure, and organism. A frameshift is not guaranteed from every insertion: multiples of three can preserve frame while adding residues. State the reference sequence and coordinate system before labeling a variant.',
        ],
        [
          'Integrated reasoning',
          'Move through template orientation, RNA sequence, frame, amino-acid sequence, and possible molecular effect in separate steps. Check each before inferring phenotype. The inheritance lab shows transmission probabilities, not the biochemical effect of a sequence variant. Explain why two individuals with the same one-locus genotype may still differ through environment or other genes. Molecular and Mendelian reasoning answer related but distinct questions.',
        ],
      ],
      [
        ['Semiconservative', 'Each daughter DNA molecule retains one old strand.'],
        ['Primer', 'Starting nucleic-acid segment for extension.'],
        ['Reading frame', 'Grouping into successive codons.'],
        ['Missense', 'Coding substitution changing an amino acid.'],
      ],
      [
        'Coding DNA 5′-ATG TTT TGA-3′ gives what simple translation?',
        [
          'RNA is 5′-AUG UUU UGA-3′.',
          'Read AUG then UUU in the stated frame.',
          'Met–Phe followed by stop.',
        ],
        'Template orientation and frame must be defined.',
      ],
      [
        [
          'DNA synthesis extends…',
          '5′ to 3′',
          ['3′ to 5′', 'Both directions on one new strand', 'Without a primer always'],
          'Polymerase adds to the growing 3′ end.',
        ],
        [
          'A three-base insertion necessarily shifts frame?',
          'No',
          ['Always', 'Only in RNA', 'Only in bacteria'],
          'A multiple of three can preserve frame.',
        ],
        [
          'Semiconservative means…',
          'One old and one new strand per daughter molecule',
          ['Both strands old', 'Only half the bases copied', 'No complementary pairing'],
          'The parental strands separate.',
        ],
      ],
      [
        [
          'Why can the coding strand differ from mature mRNA?',
          'T/U substitution and processing such as splicing affect the relationship.',
        ],
        [
          'Distinguish redundancy and ambiguity.',
          'Several codons can specify one amino acid, while one codon has a defined meaning in the stated code.',
        ],
        [
          'Why label fork direction?',
          'Leading/lagging designation depends on synthesis relative to fork movement.',
        ],
        [
          'Why is a synonymous change not always effect-free?',
          'It may affect expression, splicing, or RNA behavior in context.',
        ],
      ],
      [
        ['Copy', 'Use antiparallel complementarity.'],
        ['Express', 'Transcribe and process RNA.'],
        ['Decode', 'Translate a specified reading frame.'],
      ],
      [
        ['Replication', 'Copies DNA', 'Requires replication machinery.'],
        ['Transcription', 'Makes RNA', 'Template and processing matter.'],
        ['Translation', 'Makes polypeptide', 'Depends on reading frame.'],
      ],
      'Explain what sequence and expression information the genotype labels A and a omit from the lab.',
      'Transmission labels become molecular explanations only when sequence, direction, and function are specified.',
    ),
    c(
      'Regulation, mutation, and DNA repair',
      [
        'Compare bacterial and eukaryotic regulation.',
        'Distinguish damage from mutation.',
        'Explain regulation at multiple levels.',
      ],
      [
        [
          'Regulatory purpose',
          'Cells regulate gene expression in response to developmental and environmental conditions. Regulation can affect transcription, RNA processing, translation, and protein stability. A gene can remain present while its expression changes. Distinguish a DNA sequence change from a reversible regulatory response. Expression level is not identical to protein activity because folding, modification, localization, and binding partners can intervene.',
        ],
        [
          'Bacterial regulation',
          'Operons can coordinate several coding regions under shared regulatory control. Repressors and activators affect transcription through DNA binding and interactions with transcription machinery. The lac system illustrates combined nutrient-related regulation, while other operons use different logic. Do not generalize one switch diagram to every bacterial gene. Identify the regulatory molecule, binding site, environmental signal, and effect on transcription separately.',
        ],
        [
          'Eukaryotic regulation',
          'Chromatin accessibility, transcription factors, enhancers, RNA processing, RNA stability, and translation contribute. Enhancers can act through three-dimensional regulatory contacts rather than only adjacent sequence position. Epigenetic marks can correlate with or contribute to regulation, but a mark alone does not prove a complete causal mechanism. Different cell types can use the same genome differently. Avoid interpreting every expression difference as a new mutation.',
        ],
        [
          'Damage and mutation',
          'DNA damage is a chemical or structural lesion; a mutation is a sequence change that can become fixed through replication or repair. Not every lesion becomes a mutation. Substitutions, insertions, deletions, and rearrangements can affect coding or regulatory sequences. Somatic and germline contexts have different inheritance implications. A useful variant description includes reference, position, change, and the biological level at which it was observed.',
        ],
        [
          'Repair mechanisms',
          'Proofreading, mismatch repair, base excision, nucleotide excision, and double-strand break pathways address different problems. Repair can be accurate or introduce changes depending on pathway and context. Homologous recombination and end joining are not interchangeable labels for every break. Defective repair can increase instability, but interpreting an individual’s health requires much more than a classroom mechanism. This lesson stays with molecular principles and synthetic examples.',
        ],
        [
          'Testing regulation',
          'Measure RNA and protein separately when the question spans expression levels. Include suitable controls, matched conditions, and replicate samples. A reporter signal can reflect transcription, stability, or assay behavior depending on design. The genotype lab cannot simulate an operon by changing dominance mode. Explain the environmental input, expression output, and regulatory rule a dedicated model would require.',
        ],
      ],
      [
        ['Operon', 'Co-regulated bacterial transcriptional organization.'],
        ['Enhancer', 'Regulatory DNA influencing transcription.'],
        ['Lesion', 'Chemical or structural DNA damage.'],
        ['Mismatch repair', 'Repair targeting replication-associated mismatches.'],
      ],
      [
        'A protein level falls while its mRNA is unchanged. Propose two mechanisms.',
        [
          'Transcription alone is not sufficient to explain the observation.',
          'Translation could decrease.',
          'Protein degradation could increase; test each with suitable assays.',
        ],
        'Measure the level relevant to the mechanism.',
      ],
      [
        [
          'Expression change always means mutation?',
          'No',
          ['Always', 'Only in bacteria', 'Only for dominant alleles'],
          'Regulation can change without sequence change.',
        ],
        [
          'Damage always becomes a mutation?',
          'No',
          ['Always', 'Only after a diagram', 'Only for RNA'],
          'Repair may restore sequence.',
        ],
        [
          'An operon coordinates…',
          'Transcriptional control',
          ['All chromosome segregation', 'Only meiosis', 'Only protein folding'],
          'Its organization links gene regulation.',
        ],
      ],
      [
        [
          'Why measure RNA and protein?',
          'Different regulatory steps can produce similar final protein changes.',
        ],
        [
          'Name a repair pathway.',
          'Mismatch repair or a specified excision or break-repair pathway.',
        ],
        [
          'What is a reporter limitation?',
          'Signal may reflect several expression and assay processes.',
        ],
        [
          'Why distinguish somatic and germline?',
          'They differ in the cells affected and typical transmission to offspring.',
        ],
      ],
      [
        ['Signal', 'Environmental or developmental context.'],
        ['Regulate', 'Change expression at a defined level.'],
        ['Measure', 'Use controls specific to the proposed mechanism.'],
      ],
      [
        ['Damage', 'Lesion', 'May be repaired.'],
        ['Mutation', 'Sequence change', 'Effect depends on context.'],
        ['Regulation', 'Expression control', 'Need not change DNA sequence.'],
      ],
      'Keep parental genotypes fixed and explain how an environmental expression rule could alter phenotype without changing gamete probabilities.',
      'Regulation, DNA damage, and inherited sequence change are related but distinct mechanisms.',
    ),
    c(
      'Population genetics, additive traits, and heritability',
      [
        'Calculate allele and genotype frequencies.',
        'State Hardy–Weinberg assumptions.',
        'Interpret heritability at population level.',
      ],
      [
        [
          'Frequency bookkeeping',
          'For two alleles, p + q = 1. In a diploid sample, count two copies for each homozygote and one of each allele for each heterozygote, then divide by twice the number of individuals. Genotype frequency and allele frequency are different summaries. A dominant phenotype frequency does not directly equal dominant allele frequency. State whether the sample is representative and whether genotypes or only phenotypes are observed.',
        ],
        [
          'Hardy–Weinberg model',
          'Random mating with specified allele frequencies yields expected genotype proportions p², 2pq, and q² under the standard two-allele autosomal model. Persistence of allele frequencies additionally assumes no relevant selection, mutation, migration, or drift in the idealized large population. These assumptions are a baseline for comparison, not a claim that natural populations never evolve. A departure can have several explanations and does not identify one force by itself.',
        ],
        [
          'Recessive inference',
          'If a fully penetrant recessive phenotype uniquely identifies aa and Hardy–Weinberg assumptions are suitable, its frequency estimates q². Take the square root to estimate q, then derive p and heterozygote expectation. Without those assumptions, the inference can fail. Do not take the square root of a dominant phenotype frequency as a universal shortcut. The lab displays expected genotypes from p, not measured population samples.',
        ],
        [
          'Additive effects',
          'Quantitative traits can reflect many loci, environment, and interactions. An additive model assigns contributions that sum under stated assumptions. It is useful for predicting averages but does not mean every trait consists of independent equal-effect alleles. Linkage, dominance, epistasis, and environmental covariance complicate the picture. Distinguish a statistical effect estimated in one population from a universal mechanistic constant.',
        ],
        [
          'Heritability',
          'Heritability describes a fraction of trait variation associated with genetic differences in a particular population and environment. Broad-sense and narrow-sense definitions include different variance components. It is not the percentage of one individual’s trait caused by genes, and high heritability does not imply immutability. Changing environments can shift both the mean and variance. A genetic association does not eliminate the role of environmental intervention.',
        ],
        [
          'Reading population bars',
          'Move p and inspect p², 2pq, and q². Heterozygosity peaks at p = 0.5 for the two-allele model. Distinguish changing allele frequency from changing mating structure at fixed frequency. The lab does not simulate selection or random drift across generations, so its bars are expectations, not an evolutionary time series. Explain what reproduction, fitness, and sampling rules would be required for such a simulation.',
        ],
      ],
      [
        ['Allele frequency', 'Proportion of gene copies of an allele.'],
        ['Hardy–Weinberg', 'Baseline genotype-frequency model.'],
        ['Additive effect', 'Contribution summed in a specified trait model.'],
        ['Heritability', 'Population/context-specific variance ratio.'],
      ],
      [
        'Under the model, recessive phenotype frequency is 0.09. Find q, p, and 2pq.',
        ['q = √0.09 = 0.30.', 'p = 0.70.', '2pq = 2 × 0.70 × 0.30 = 0.42.'],
        'The inference depends on phenotype and equilibrium assumptions.',
      ],
      [
        [
          'Heritability describes…',
          'Variation in a population and environment',
          ['Percent of one person caused by genes', 'Guaranteed immutability', 'Only allele count'],
          'It is a contextual variance statistic.',
        ],
        [
          'Maximum 2pq occurs at p…',
          '0.5',
          ['0', '1', '2'],
          'The symmetric product peaks at equal frequencies.',
        ],
        [
          'A dominant phenotype frequency equals p automatically?',
          'No',
          ['Always', 'Only for any plant', 'Only at 50%'],
          'Genotypes and phenotypes differ.',
        ],
      ],
      [
        ['Count A frequency in 20 AA, 40 Aa, 40 aa.', '(40+40)/200 = 0.40.'],
        [
          'Why state Hardy–Weinberg assumptions?',
          'They justify expected genotype frequencies and phenotype-based inference.',
        ],
        [
          'Does high heritability mean unchangeable?',
          'No; environmental changes can alter the trait despite high within-context heritability.',
        ],
        [
          'What do the lab bars represent?',
          'Expected genotype proportions at a chosen p under the model.',
        ],
      ],
      [
        ['Count', 'Estimate allele frequencies.'],
        ['Predict', 'Compute p², 2pq, q².'],
        ['Compare', 'Assess data and assumptions.'],
      ],
      [
        ['Allele', 'Gene-copy proportion', 'Not phenotype frequency.'],
        ['Genotype', 'Combination frequency', 'Depends on mating model.'],
        ['Heritability', 'Variance ratio', 'Not an individual causal percentage.'],
      ],
      'Set p to 0.7 and verify all genotype bars. Find the p value maximizing heterozygotes and explain the symmetry.',
      'Population equations are conditional baselines, not universal descriptions of individuals.',
    ),
    c(
      'Phylogenies and genome evolution',
      [
        'Read ancestry from branching.',
        'Distinguish homology from analogy.',
        'Explain duplication and divergence.',
      ],
      [
        [
          'Tree structure',
          'A phylogenetic tree represents a hypothesis of relationships. Nodes denote common ancestry, and branches connect lineages. Rotating branches around a node does not change the relationships. Tip order on the page is not an evolutionary ranking. A tree needs a root to establish direction, and branch lengths mean time or change only if the legend states so. Read shared ancestry rather than visual proximity of labels.',
        ],
        [
          'Groups and comparisons',
          'A clade contains an ancestor and all its descendants. Sister groups share an immediate common ancestor on the depicted tree. An outgroup can help orient character changes under suitable assumptions. Living species are not necessarily ancestors of other living tips; both can descend from a common ancestor. A ladderlike drawing does not imply inevitable progress toward one endpoint. Distinguish tree topology from the amount of change on branches.',
        ],
        [
          'Homology and convergence',
          'Homologous features share ancestry, while analogous similarities can arise through convergent evolution. Similarity alone is not proof of a close relationship. Sequence alignment compares positions under an inferred homology model, and alignment quality affects downstream trees. Different genes can yield different histories because of duplication, loss, recombination, or other processes. A single short matching sequence may be insufficient evidence for a species-level relationship.',
        ],
        [
          'Duplication and divergence',
          'Gene duplication creates additional copies that can retain, partition, or acquire functions, or lose function. Orthologs diverge through speciation, while paralogs relate through duplication, though real histories can be complex. Genome evolution includes rearrangement, transposable elements, copy-number changes, and horizontal transfer in relevant systems. A larger genome does not automatically mean a more complex organism. Sequence quantity and functional organization are different measures.',
        ],
        [
          'Evolutionary forces',
          'Mutation supplies variation, selection changes reproduction associated with traits, drift reflects finite-population sampling, and gene flow moves alleles between populations. Effects can interact. A frequency increase alone does not prove positive selection. Population size, demographic history, and sampling uncertainty matter. The Hardy–Weinberg lab shows a baseline snapshot and cannot identify the evolutionary force responsible for a chosen frequency.',
        ],
        [
          'Evidence-based explanation',
          'State the data, alignment or character model, tree support, and uncertainty. Compare alternative topologies rather than declaring every drawn branch certain. A morphological similarity and a molecular match can be complementary but may not be independent if they reflect the same underlying feature. Use the lab to distinguish an allele-frequency statement from an ancestry statement; neither alone determines the other.',
        ],
      ],
      [
        ['Clade', 'Ancestor plus all descendants.'],
        ['Ortholog', 'Gene relationship associated with speciation.'],
        ['Paralog', 'Gene relationship associated with duplication.'],
        ['Drift', 'Allele-frequency change through finite sampling.'],
      ],
      [
        'A and B share a node more recently than either shares with C. Rotate A and B on the drawing. What changes?',
        [
          'The same nodes remain connected.',
          'Tip display order changes.',
          'A and B remain sister groups in the depicted topology.',
        ],
        'Layout is not ancestry.',
      ],
      [
        [
          'Rotating a node changes topology?',
          'No',
          ['Always', 'Only for DNA trees', 'Only if labels move'],
          'Connections define relationships.',
        ],
        [
          'Paralogs arise through…',
          'Duplication',
          ['Only salinity', 'Only translation', 'Only meiosis II'],
          'Gene history matters.',
        ],
        [
          'Increasing allele frequency proves selection?',
          'No',
          ['Always', 'Only for dominant alleles', 'Only for proteins'],
          'Drift and other forces can contribute.',
        ],
      ],
      [
        [
          'Why label branch length meaning?',
          'It may represent time, substitutions, or no quantitative scale.',
        ],
        ['What is a clade?', 'An ancestor and all descendants.'],
        [
          'Why can gene and species trees differ?',
          'Duplication, loss, recombination, and other historical processes can differ among loci.',
        ],
        [
          'Why is genome size not a complexity ranking?',
          'Noncoding content, duplication, and organization vary independently of a simple complexity measure.',
        ],
      ],
      [
        ['Compare', 'Align homologous evidence.'],
        ['Infer', 'Construct relationships under a model.'],
        ['Qualify', 'Report support and alternative histories.'],
      ],
      [
        ['Topology', 'Branching relationships', 'Not page order.'],
        ['Length', 'Model-defined quantity', 'Needs a legend.'],
        ['Similarity', 'Observed resemblance', 'Not automatically shared ancestry.'],
      ],
      'Choose two different p values and explain why their frequency bars cannot determine a phylogenetic tree.',
      'Evolutionary explanations distinguish ancestry, sequence change, and population-frequency mechanisms.',
    ),
    c(
      'Sequencing, cloning, and gene editing',
      [
        'Compare major biotechnology purposes.',
        'Use controls for molecular inference.',
        'Distinguish intended edit from validated outcome.',
      ],
      [
        [
          'Sequencing questions',
          'Sequencing determines nucleotide order through a method with characteristic read length, error profile, and coverage. A raw signal is processed into base calls and quality estimates. Alignment to a reference can miss or misrepresent some variants, while assembly has different challenges. A sequence result should specify sample, reference, coverage, and uncertainty. Reading one short region does not establish every genomic change or an organism’s entire phenotype.',
        ],
        [
          'Amplification',
          'PCR enriches a target using primers, polymerase, and cycles of temperature-dependent steps in a suitable protocol. Primer specificity determines what is amplified. A positive signal needs contamination controls, and a negative result can reflect failed amplification rather than true absence. This lesson explains logic and does not provide a wet-lab operational protocol. Distinguish copying a region from cloning a whole organism or changing a genome.',
        ],
        [
          'Gene cloning',
          'Molecular cloning places a DNA fragment into a replicating construct or other suitable system for maintenance or expression. A vector, insert, host, and selection or screening strategy have distinct roles. Selecting for vector presence does not automatically verify the correct insert and orientation. Confirm structure and sequence with appropriate methods. An expressed protein may need processing or conditions the chosen host does not provide.',
        ],
        [
          'Editing mechanisms',
          'Gene editing uses targeted molecular systems to alter DNA under a designed strategy. CRISPR-associated systems can guide recognition, while cellular repair or specialized editing chemistry determines outcomes. Targeting is not a guarantee of one exact edit in every cell. Mosaicism, delivery, unintended changes, and selection effects require validation. A phenotype change alone does not prove the intended sequence was installed.',
        ],
        [
          'Controls and verification',
          'Use suitable negative, positive, and process controls for the question. Verify the target sequence and consider relevant off-target or structural changes with appropriate methods. Compare edited and reference cells under matched conditions. A correlation between an edit and phenotype can still be influenced by background differences. Independent lines or rescue experiments can strengthen causal interpretation where appropriate. Choose evidence proportional to the claim.',
        ],
        [
          'Interpretation limits',
          'Biotechnology connects sequence, manipulation, expression, and function, but each step can fail independently. The synthetic genetics lab does not perform or predict a real edit. Use it to reason about transmission after a hypothetical validated allele change, then state the molecular validation still needed. Avoid presenting a Punnett square as proof that an intervention is effective, safe, or ethically resolved.',
        ],
      ],
      [
        ['Coverage', 'Extent of sequence sampling across a target.'],
        ['Primer', 'Nucleic-acid starting segment defining amplification specificity.'],
        ['Vector', 'Construct carrying genetic material in a system.'],
        ['Mosaicism', 'Different cell genotypes within an organism or sample.'],
      ],
      [
        'A clone survives selection. Has its insert been verified?',
        [
          'Selection may establish a selectable feature.',
          'It may not prove insert identity, orientation, or sequence.',
          'Use appropriate structural and sequence confirmation.',
        ],
        'Selection and validation answer different questions.',
      ],
      [
        [
          'PCR primarily…',
          'Amplifies a target',
          [
            'Guarantees an exact edit',
            'Sequences every chromosome directly',
            'Creates a phenotype model',
          ],
          'Primer-defined copying is distinct from editing.',
        ],
        [
          'Targeted editing guarantees uniform exact outcomes?',
          'No',
          ['Always', 'Only in any plant', 'Only with a diagram'],
          'Repair and delivery vary.',
        ],
        [
          'A negative assay can reflect…',
          'Process failure',
          ['Only true absence', 'Only perfect specificity', 'Only an unchanged genome'],
          'Controls identify failure modes.',
        ],
      ],
      [
        ['Why verify insert orientation?', 'It can affect expression and construct function.'],
        [
          'What does coverage not guarantee?',
          'Perfect accuracy or detection of every variant type.',
        ],
        [
          'Why use matched controls?',
          'Background and process differences can confound phenotype comparisons.',
        ],
        [
          'What does the inheritance lab assume about an allele?',
          'Its identity and transmission model are already defined, not experimentally validated.',
        ],
      ],
      [
        ['Design', 'Define the molecular target and purpose.'],
        ['Manipulate', 'Use an appropriate validated strategy.'],
        ['Verify', 'Confirm sequence and functional consequences.'],
      ],
      [
        ['Amplify', 'Copy a target', 'Not genome editing.'],
        ['Clone', 'Maintain a construct', 'Needs insert verification.'],
        ['Edit', 'Alter sequence', 'Needs outcome validation.'],
      ],
      'Compare hypothetical AA and Aa parents. Explain why changing a genotype selector is not evidence that an edit succeeded.',
      'Biotechnology claims require validation at the sequence, expression, and functional levels they address.',
    ),
    c(
      'DNA profiles and gene-editing applications',
      [
        'Interpret multilocus comparisons.',
        'Separate a match from source certainty.',
        'Evaluate applications with explicit evidence.',
      ],
      [
        [
          'Profiles',
          'A DNA profile compares selected variable markers rather than necessarily sequencing a whole genome. STR loci vary in repeat number and can provide informative combinations. A profile needs allele-calling methods, quality checks, and suitable reference data. A partial profile, mixture, or degraded sample has different interpretation from a complete clean single-source profile. Do not infer a person’s identity or traits from a few unlabeled bands.',
        ],
        [
          'Match probabilities',
          'A matching profile supports compatibility under a defined comparison. Random-match probability depends on marker frequencies, population assumptions, and independence or correction models. It is not the probability that a particular person is innocent or that evidence was handled correctly. Laboratory errors, contamination, relatedness, and case context are separate considerations. Avoid multiplying frequencies without checking what event and assumptions the calculation represents.',
        ],
        [
          'Mixtures and uncertainty',
          'More than two observed alleles at an autosomal locus can suggest multiple contributors under a simple model, but artifacts and interpretation rules matter. Peak heights, dropout, stutter, and sample quality complicate inference. A classroom profile can illustrate exclusions and compatibility but cannot replace validated forensic interpretation. Explain which observations are direct and which conclusions require statistical or procedural evidence.',
        ],
        [
          'Editing applications',
          'Gene editing can support research into gene function, agricultural traits, and other applications. A useful proposal defines target, intended mechanism, delivery context, verification, and outcome measure. Effects on one trait can have tradeoffs elsewhere. Laboratory success does not automatically imply field performance or broad applicability. This course teaches evaluation rather than recommending a biological intervention or providing an operational editing protocol.',
        ],
        [
          'Evidence and values',
          'Scientific evidence addresses whether a method produces a defined outcome under tested conditions. Decisions can also involve equity, consent, environmental effects, and governance. Distinguish empirical uncertainty from value judgments so neither is disguised as the other. A change inherited through a population has different scope from a contained cell experiment. State who or what is affected and which evidence remains missing.',
        ],
        [
          'Synthesis',
          'Connect molecular identity, transmission, population frequency, and phenotype while keeping each inference separate. The lab’s crosses and Hardy–Weinberg bars are synthetic expectations and do not compute a forensic match statistic or editing risk. Use them to identify assumptions, then describe the additional data needed for an application. A defensible conclusion is precise about the question answered and the ones still open.',
        ],
      ],
      [
        ['STR', 'Short tandem repeat marker.'],
        ['Random-match probability', 'Probability of a specified profile match under a model.'],
        ['Dropout', 'Failure to observe an allele that is present.'],
        ['Validation', 'Evidence that a method performs as intended in a defined context.'],
      ],
      [
        'Two independent marker match probabilities are 0.1 and 0.2. Find the joint modeled probability.',
        [
          'State the independence assumption.',
          'Multiply 0.1 × 0.2.',
          'The result is 0.02 for that specified event, not a probability of guilt.',
        ],
        'Probability meaning must remain explicit.',
      ],
      [
        [
          'A profile match alone proves source identity with certainty?',
          'No',
          ['Always', 'Only with two loci', 'Only with an image'],
          'Compatibility and certainty differ.',
        ],
        [
          'Multiplying marker probabilities requires…',
          'A justified model of dependence',
          ['Only matching colors', 'No population data', 'A teacher label'],
          'Assumptions affect the calculation.',
        ],
        [
          'An application proposal needs…',
          'A defined outcome and validation',
          ['Only a technology name', 'Only a positive image', 'No controls'],
          'Success must be measurable.',
        ],
      ],
      [
        [
          'Why distinguish match probability and guilt?',
          'They concern different conditional events and evidence contexts.',
        ],
        [
          'Name a profile complication.',
          'Mixtures, degradation, dropout, artifacts, or contamination.',
        ],
        [
          'What validates an edit application?',
          'Confirmed molecular outcome plus relevant functional evidence and context-specific testing.',
        ],
        [
          'Why distinguish evidence and values?',
          'Empirical findings and choices about acceptable consequences answer different questions.',
        ],
      ],
      [
        ['Compare', 'Define markers and sample quality.'],
        ['Model', 'Use justified frequencies and assumptions.'],
        ['Interpret', 'Keep statistical and application claims separate.'],
      ],
      [
        ['Match', 'Compatibility', 'Not automatic source certainty.'],
        ['Probability', 'Defined event', 'Not a universal verdict.'],
        ['Application', 'Context-specific outcome', 'Needs validation and deliberation.'],
      ],
      'Use p to explain why allele frequencies matter in population calculations, then state why the lab cannot calculate a multilocus forensic statistic.',
      'Applications require careful inference from molecular evidence to the specific claim being made.',
      true,
    ),
  ],
});
