// Checkpoint explanations for Designer Genes, keyed by question id.
export const designerGenes: Record<string, string> = {
  'gene-u1-l1-q1':
    'Dominant describes which phenotype appears in a heterozygote (Aa): the dominant allele’s trait shows. It says nothing about how common the allele is, whether it is helpful or how strong its effect is.',
  'gene-u1-l1-q2':
    'Each Aa parent passes on a with probability 1/2. An aa child needs a from both parents: 1/2 × 1/2 = 1/4. The other 3/4 are AA or Aa.',
  'gene-u1-l1-q3':
    'A Punnett square lists every combination of parental gametes, each equally likely, giving the probability of each offspring genotype. It does not predict the actual order or exact counts of children.',
  'gene-u1-l1-q4':
    'Genotype is the pair of alleles an organism carries, such as Aa. Phenotype is the observable trait, such as flower color, which results from the genotype together with environment and other genes.',
  'gene-u1-l1-q5':
    'Multiply probabilities when events are independent (one does not affect the other), such as alleles from two separate parents. If events are linked, use the conditional probability of the second event given the first.',
  'gene-u1-l1-q6':
    'A 3:1 ratio is an expected proportion, like the chance of a coin toss. With only a few offspring, random variation can easily give 2:2 or 4:0. Ratios get closer to 3:1 only with large numbers.',
  'gene-u1-l1-q7':
    'Changing dominance mode only changes how genotypes appear as phenotypes. The gametes and the genotype probabilities (1/4 AA, 1/2 Aa, 1/4 aa for Aa × Aa) stay exactly the same.',
  'gene-u2-l1-q1':
    'A father gives his X chromosome only to daughters; sons receive his Y. So an X-linked allele cannot normally pass from father to son. Male-to-male transmission rules out X-linked inheritance.',
  'gene-u2-l1-q2':
    'With incomplete dominance, the heterozygote shows an intermediate phenotype, such as pink from red × white. Alleles still segregate the same way; only how the heterozygote looks changes, so ratios become 1:2:1.',
  'gene-u2-l1-q3':
    'Penetrance is the proportion of individuals with a genotype who show the expected phenotype at all. Expressivity is how strongly it appears in those who show it. Incomplete penetrance can make a trait seem to skip generations.',
  'gene-u2-l1-q4':
    'Pedigrees often have few people, missing information and traits that do not always show (incomplete penetrance). Several inheritance patterns may fit the same chart, so more data are needed to tell them apart.',
  'gene-u2-l1-q5':
    'A population can carry many alleles at one gene; the ABO blood group has three (IA, IB, i). Each diploid individual still carries only two, one from each parent.',
  'gene-u2-l1-q6':
    'In codominance both alleles show fully in the heterozygote, as in AB blood type or red-and-white roan coats. In incomplete dominance the heterozygote is an intermediate blend, such as pink flowers.',
  'gene-u2-l1-q7':
    'For X-linked traits, write gametes with the sex chromosomes, such as Xᴬ, Xᵃ and Y. The father contributes X or Y and the mother an X, so the square gives separate results for sons and daughters.',
  'gene-u3-l1-q1':
    'Linked genes sit close together on the same chromosome, so they tend to be inherited together instead of assorting independently. Crossing over can separate them, and less often the closer they are.',
  'gene-u3-l1-q2':
    'Epistasis is when one gene affects or masks the phenotypic effect of another gene. In Labrador coat color, for example, one gene can prevent pigment deposition regardless of the color gene.',
  'gene-u3-l1-q3':
    'A recombination fraction is a proportion of offspring, so it cannot exceed 1. For two loci it maxes out near 0.5, which is the same result as independent assortment; even far-apart loci on one chromosome look unlinked.',
  'gene-u3-l1-q4':
    'Phase tells which alleles are on the same chromosome (for example AB/ab versus Ab/aB). That determines which offspring combinations are parental and which are recombinant, which is needed to calculate recombination frequency.',
  'gene-u3-l1-q5':
    'If two crossovers occur between two markers, the second can swap them back, so the offspring look parental. Those hidden events are not counted, so recombination frequency underestimates actual distance for far-apart loci.',
  'gene-u3-l1-q6':
    'If two recessive mutants with the same phenotype are crossed and the offspring look normal, each parent supplies a working copy of the gene the other lacks, so the mutations are in different genes. If the offspring stay mutant, they are likely in the same gene.',
  'gene-u3-l1-q7':
    'Epistatic ratios like 9:3:4 or 9:7 depend on how the genes interact in their pathway. Different interactions give different ratios, so work out each one from the pathway rather than memorizing a single ratio.',
  'gene-u4-l1-q1':
    'Meiosis I separates homologous chromosomes (one from each parent), halving the chromosome number. Sister chromatids stay together until meiosis II.',
  'gene-u4-l1-q2':
    'In S (synthesis) phase, the cell copies its DNA, so each chromosome becomes two sister chromatids. Separation happens later, in mitosis or meiosis.',
  'gene-u4-l1-q3':
    'Aneuploidy is having an extra or missing individual chromosome, such as trisomy 21. Polyploidy is having extra complete sets of chromosomes, such as 3n or 4n.',
  'gene-u4-l1-q4':
    'Sister chromatids stay attached through meiosis I, when homologs separate. They separate in anaphase II of meiosis II, giving each gamete one copy.',
  'gene-u4-l1-q5':
    'During prophase I, homologous chromosomes pair. Crossing over swaps segments between nonsister chromatids, one from each homolog, creating new allele combinations.',
  'gene-u4-l1-q6':
    'After S phase a cell has twice the DNA, but it still has the same number of chromosome sets because sister chromatids count as one chromosome. Ploidy counts sets; DNA content can double without changing ploidy.',
  'gene-u4-l1-q7':
    'The Punnett lab assumes each parent’s alleles separate normally and each gamete type is equally likely. Nondisjunction, linkage or gametes that survive unequally would change the expected outcomes.',
  'gene-u5-l1-q1':
    'DNA polymerase can only add nucleotides to the 3′ end of an existing strand, so new DNA grows 5′ → 3′. It also needs a primer to start. That is why the lagging strand is made in short fragments.',
  'gene-u5-l1-q2':
    'Codons are three bases long, so inserting exactly three bases adds one codon and keeps the rest of the reading frame. It adds one amino acid (or a stop codon) but does not shift the frame.',
  'gene-u5-l1-q3':
    'In semiconservative replication, each new DNA molecule has one original strand and one newly made strand. The two parent strands separate and each serves as a template.',
  'gene-u5-l1-q4':
    'The coding strand has the same sequence as the mRNA except that DNA uses T where RNA uses U. In eukaryotes, introns are also spliced out of the mRNA, so the mature message is shorter than the gene.',
  'gene-u5-l1-q5':
    'The genetic code is redundant: several codons can code for the same amino acid (GCU, GCC, GCA and GCG all mean alanine). It is not ambiguous: each codon means only one amino acid or stop.',
  'gene-u5-l1-q6':
    'Whether a new strand is leading (continuous) or lagging (fragments) depends on how its 5′ → 3′ synthesis compares with the direction the fork is opening. Without the fork direction, the strands cannot be labeled.',
  'gene-u5-l1-q7':
    'A synonymous change keeps the same amino acid, but it can still alter splicing signals, mRNA stability or folding, or how quickly the codon is translated. Each of these can change how much protein is made.',
  'gene-u6-l1-q1':
    'No. Gene expression changes all the time through regulation, such as transcription factors, signaling or epigenetic marks, without any change to the DNA sequence.',
  'gene-u6-l1-q2':
    'No. Cells constantly repair DNA damage. Damage becomes a permanent mutation only if it is not repaired, or is repaired incorrectly, before the DNA is copied.',
  'gene-u6-l1-q3':
    'An operon groups several genes under one promoter and operator, so they are transcribed together as one mRNA. A single regulator, such as the lac repressor, can switch the whole set on or off.',
  'gene-u6-l1-q4':
    'Protein levels can change because of transcription, RNA stability, translation or protein breakdown. Measuring both RNA and protein shows which step is regulated.',
  'gene-u6-l1-q5':
    'Mismatch repair fixes bases paired wrongly during replication. Other answers include base excision repair (single damaged bases), nucleotide excision repair (bulky damage such as UV dimers) and homologous recombination or nonhomologous end joining (double-strand breaks).',
  'gene-u6-l1-q6':
    'A reporter, such as GFP linked to a promoter, shows overall expression, but the signal also depends on the reporter’s own stability, folding and detection. It may not exactly match the real gene’s regulation.',
  'gene-u6-l1-q7':
    'Somatic mutations occur in body cells; they affect only that person and are not inherited. Germline mutations occur in egg or sperm cells and can be passed to offspring.',
  'gene-u7-l1-q1':
    'Heritability is the fraction of variation in a trait within a specific population and environment that is due to genetic differences. It does not tell how much of one person’s trait comes from genes, and it changes if the environment changes.',
  'gene-u7-l1-q2':
    'Heterozygote frequency 2pq with q = 1 − p becomes 2p(1 − p), which is largest when p = 0.5: 2 × 0.5 × 0.5 = 0.5. At p = 0 or 1, there are no heterozygotes.',
  'gene-u7-l1-q3':
    'No. The dominant phenotype includes both AA and Aa individuals, so its frequency is p² + 2pq, not p. For example, if p = 0.5, the dominant phenotype frequency is 0.75.',
  'gene-u7-l1-q4':
    '100 individuals carry 200 alleles. A alleles: AA gives 2 × 20 = 40, Aa gives 1 × 40 = 40, total 80. p = 80 ÷ 200 = 0.40. Then q = 0.60.',
  'gene-u7-l1-q5':
    'Hardy–Weinberg frequencies (p², 2pq, q²) hold only with random mating, no selection, mutation or migration and a large population. If those fail, using the formulas to infer genotypes from phenotypes can give wrong answers.',
  'gene-u7-l1-q6':
    'No. High heritability means genes explain most of the variation in that particular environment. A different environment, such as better nutrition, can still change the trait a lot, as height increased over generations.',
  'gene-u7-l1-q7':
    'The bars show expected Hardy–Weinberg genotype frequencies, p², 2pq and q², for the allele frequency p you choose. They are model predictions, not measurements from a real population.',
  'gene-u8-l1-q1':
    'No. A tree’s topology is its branching pattern, which groups share which ancestors. Rotating branches around a node only changes the drawing, not the relationships.',
  'gene-u8-l1-q2':
    'Paralogs are genes in the same genome that arose by duplication of one ancestral gene, such as the α- and β-globin genes. Orthologs are versions of a gene in different species that arose by speciation.',
  'gene-u8-l1-q3':
    'No. Allele frequencies also change by genetic drift (random chance, strong in small populations), gene flow and mutation. Showing selection requires evidence that the allele improves survival or reproduction.',
  'gene-u8-l1-q4':
    'In some trees branch length shows time, in others the number of genetic changes, and in some (cladograms) it means nothing. Without a label, readers cannot interpret the lengths.',
  'gene-u8-l1-q5':
    'A clade is a group made of one common ancestor and all of its descendants, nothing left out. Birds belong in the clade with other dinosaurs, which is why "reptiles" without birds is not a clade.',
  'gene-u8-l1-q6':
    'Each gene has its own history. Duplications, losses, recombination, incomplete lineage sorting and horizontal gene transfer can make a single gene’s tree branch differently from the species’ true history.',
  'gene-u8-l1-q7':
    'Genome size depends heavily on noncoding DNA, repeated sequences and duplications, not on the number of genes or complexity. Some amoebae and lilies have far larger genomes than humans (the C-value paradox).',
  'gene-u9-l1-q1':
    'PCR uses primers that flank a target DNA region and repeated heating and cooling cycles to copy it millions of times. It amplifies DNA; it does not edit genes or sequence whole chromosomes.',
  'gene-u9-l1-q2':
    'No. Tools like CRISPR cut at a target, but the cell repairs the cut in different ways, producing various insertions or deletions, and not every cell gets edited. Off-target edits are also possible, so outcomes must be checked.',
  'gene-u9-l1-q3':
    'A negative result can mean the target really is absent, but it can also mean the test failed, for example degraded DNA or a bad reagent. A positive control shows whether the test could have detected the target.',
  'gene-u9-l1-q4':
    'A DNA insert can be ligated into a plasmid either way round. If it is backwards relative to the promoter, the gene will not be expressed correctly, so orientation must be checked by sequencing or restriction digestion.',
  'gene-u9-l1-q5':
    'Coverage is how many sequencing reads span each base. High coverage reduces random errors but does not guarantee every base is correct or that large rearrangements, repeats or copy-number changes are detected.',
  'gene-u9-l1-q6':
    'Comparing an edited organism with a control that differs only in the edit, with the same genetic background and handling, ensures any difference is due to the edit and not to other genetic or procedural differences.',
  'gene-u9-l1-q7':
    'The lab treats alleles as already defined, with a stated dominance and inheritance pattern. In real research, an allele’s identity and how it is inherited must be shown experimentally.',
  'gene-u10-l1-q1':
    'No. A match shows the person cannot be excluded as the source. Its strength depends on how rare the profile is, and relatives, lab error or contamination must be considered. It gives a probability, not certainty.',
  'gene-u10-l1-q2':
    'Multiplying genotype frequencies across loci (the product rule) assumes the markers are inherited independently, with no linkage or population structure. That assumption must be justified, or the result may overstate rarity.',
  'gene-u10-l1-q3':
    'A strong proposal states a specific, measurable goal and how success will be tested, with controls. Naming a technology or showing one positive image does not show it works.',
  'gene-u10-l1-q4':
    'Match probability asks how likely a random person would have this profile. Guilt asks whether this person committed the crime, which also depends on how the DNA got there and on other evidence. They are different questions.',
  'gene-u10-l1-q5':
    'DNA profiles can be complicated by mixtures from several people, degraded DNA, alleles that fail to amplify (dropout), lab artifacts such as stutter peaks, or contamination. Each can lead to a misleading interpretation.',
  'gene-u10-l1-q6':
    'Confirm the edit at the DNA level (sequencing), show it has the intended functional effect and test it in the context where it will be used, including checking for off-target effects.',
  'gene-u10-l1-q7':
    'Evidence answers what happens; values answer what we should do about it. Data can show an edit is effective, but whether it is acceptable involves ethical judgments that the data alone cannot settle.',
};
