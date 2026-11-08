// Checkpoint explanations for Heredity (Division B), keyed by question id.
export const heredity: Record<string, string> = {
  'her-u1-l1-q1':
    'The Punnett square for Aa × Aa gives 1 AA : 2 Aa : 1 aa. Two of the four boxes are Aa, so 2/4 = 1/2 are heterozygous. 1/4 is the chance of AA or aa alone, and 3/4 counts every dominant phenotype.',
  'her-u1-l1-q2':
    'The short parent (tt) can only give t. For half the offspring to be short (tt), the tall parent must give t half the time, so it is Tt. A TT parent would make every offspring tall.',
  'her-u1-l1-q3':
    'Treat each gene separately. Aa × Aa gives aa with probability 1/4, and the same holds for b and c. Multiply independent events: 1/4 × 1/4 × 1/4 = 1/64. 1/8 would mean each gene had a 1/2 chance.',
  'her-u1-l1-q4':
    'In metaphase I, each homologous pair lines up independently, so whether the maternal or paternal copy goes to a given pole is random for each pair. Genes on different chromosomes therefore sort into gametes in every combination equally often.',
  'her-u1-l1-q5':
    'Total = 200. A Pp × Pp cross predicts 3/4 purple and 1/4 white, or 150 : 50. The observed 152 : 48 is very close to 3 : 1, and the small gap is normal chance variation, so both parents are likely heterozygous.',
  'her-u1-l1-q6':
    'The dominant phenotype comes from AA (1/4) or Aa (1/2). An offspring cannot be both, so the outcomes are mutually exclusive and the sum rule applies: 1/4 + 1/2 = 3/4.',
  'her-u1-l1-q7':
    'Cross the unknown with an aa individual, which can only give a. If all offspring show the dominant trait, the parent is probably AA. If about half show the recessive trait, the parent must carry a and is Aa. More offspring make the result more reliable.',
  'her-u2-l1-q1':
    'Two unaffected parents with an affected child means both carry a hidden recessive allele, so the trait is recessive. It cannot be X-linked recessive, because an affected daughter would need an affected father. Dominant traits need an affected parent.',
  'her-u2-l1-q2':
    'A father passes his Y chromosome, not his X, to his sons. So a son cannot inherit an X-linked allele from his father, and father-to-son transmission rules out X-linked inheritance.',
  'her-u2-l1-q3':
    'Aa × Aa gives AA, Aa, aA and aa. The child is unaffected, so aa is ruled out, leaving three equally likely outcomes. Two of them are carriers, so the probability is 2/3. Using 1/2 forgets to remove the aa outcome first.',
  'her-u2-l1-q4':
    'Males have only one X chromosome, so a single recessive allele on it is expressed. Females have two X chromosomes and need the allele on both, one from each parent, which is much rarer for an uncommon allele.',
  'her-u2-l1-q5':
    'Two affected parents having an unaffected child proves the trait is dominant. Both parents must be heterozygous and each pass on a hidden normal allele. If the trait were recessive, two affected parents could only have affected children.',
  'her-u2-l1-q6':
    'The affected father gives his X (carrying the allele) to every daughter. The carrier mother passes her affected X half the time. So each daughter has a 1/2 chance of two affected X chromosomes, and half the daughters are affected.',
  'her-u2-l1-q7':
    'Relatives inherit alleles from shared ancestors, so a rare recessive allele is far more likely to be carried by both partners if they are related. That raises the chance their child gets two copies, so consanguinity often appears in these pedigrees.',
  'her-u3-l1-q1':
    'With incomplete dominance, RW is pink. RW × RW gives 1 RR (red) : 2 RW (pink) : 1 WW (white), so 2/4 = 1/2 are pink. 3/4 would apply only if pink were completely dominant.',
  'her-u3-l1-q2':
    'In Labradors, ee dogs are yellow whatever their B alleles. That is 4 of 16 offspring. The remaining 12 split into 9 B_E_ (black) and 3 bbE_ (brown), giving 9 : 3 : 4.',
  'her-u3-l1-q3':
    'Purple offspring mean each parent supplied a working copy of the gene the other mutant lacked. That complementation shows the mutations are in different genes. Mutations in the same gene would give only white offspring.',
  'her-u3-l1-q4':
    'With incomplete dominance the heterozygote looks intermediate, but the alleles stay unchanged. Crossing two heterozygotes brings back both parental phenotypes. Blending would mix traits permanently, so the originals could never reappear.',
  'her-u3-l1-q5':
    'Crossovers between distant genes happen so often that recombinant and parental gametes become equally likely. That gives 50% recombinants, the same result as unlinked genes. More crossovers cannot push it past 50%.',
  'her-u3-l1-q6':
    'A type O child is ii, so it received an i allele from each parent. The type A parent must be Iᴬi and the type B parent must be Iᴮi.',
  'her-u3-l1-q7':
    'A 9 : 7 ratio means both genes are needed for the trait, as with two enzymes in one pathway. Only A_B_ offspring (9/16) show it. Being homozygous recessive at either gene (7/16) blocks the pathway.',
  'her-u4-l1-q1':
    'Homologous chromosomes separate in anaphase I, which halves the chromosome number. Sister chromatids separate later, in anaphase II and in mitosis. In prophase I homologs pair up but do not separate.',
  'her-u4-l1-q2':
    'Three copies of chromosome 21 (47 chromosomes total) is trisomy 21, also called Down syndrome. Turner syndrome is a single X (45,X), and Klinefelter syndrome is XXY.',
  'her-u4-l1-q3':
    'In metaphase, chromosomes are the most condensed they get, so their size, centromere position and banding pattern are easiest to see and compare. In other phases they are too long and tangled, or the DNA is not yet copied.',
  'her-u4-l1-q4':
    'Mitosis makes two genetically identical diploid cells; meiosis makes four genetically different haploid cells. Meiosis also pairs homologous chromosomes and has crossing over, which do not happen in mitosis.',
  'her-u4-l1-q5':
    'In nondisjunction, a homologous pair fails to separate in meiosis I. One daughter cell gets both homologs and the other gets none. If a gamete with the extra chromosome is fertilized by a normal gamete, the zygote has three copies: a trisomy.',
  'her-u4-l1-q6':
    'Chromosomes are paired by overall size, centromere position (metacentric, submetacentric or acrocentric) and the pattern of stained light and dark bands.',
  'her-u4-l1-q7':
    'Sickle-cell disease is caused by a single base change in the hemoglobin gene. That is far too small to change a chromosome’s size or banding under a light microscope. Detecting it needs a DNA or protein test.',
  'her-u5-l1-q1':
    'In DNA, guanine pairs with cytosine through three hydrogen bonds, and adenine pairs with thymine through two. Uracil replaces thymine only in RNA.',
  'her-u5-l1-q2':
    'DNA polymerase can only add nucleotides to a 3′ end, so it builds new DNA 5′ to 3′. On the lagging strand that direction points away from the opening fork, so the strand is made in short Okazaki fragments, later joined by ligase.',
  'her-u5-l1-q3':
    'Codons are read in groups of three. Deleting one base early in a gene shifts every later codon, changing many amino acids and often creating an early stop codon. That is a frameshift, not a single missense or silent change.',
  'her-u5-l1-q4':
    'Each original strand serves as a template for a new strand. Every new DNA molecule therefore has one old (conserved) strand and one new strand, so half of the original is kept: semiconservative.',
  'her-u5-l1-q5':
    'Helicase unwinds the double helix. Primase makes short RNA primers, giving DNA polymerase a 3′ end to build from. Ligase seals the gaps between Okazaki fragments to complete the strand.',
  'her-u5-l1-q6':
    'Euchromatin is loosely packed, so transcription machinery can reach the genes and they are usually active. Heterochromatin is tightly packed, which blocks access, so its genes are usually silent.',
  'her-u5-l1-q7':
    'The distortion in the helix is recognized. Nucleases cut the damaged strand on both sides of the lesion and the piece is removed. DNA polymerase fills the gap using the other strand as a template, and ligase seals the backbone.',
  'her-u6-l1-q1':
    'tRNA molecules carry amino acids to the ribosome. Each tRNA has an anticodon that pairs with a matching mRNA codon. mRNA carries the code, rRNA forms the ribosome and RNA polymerase makes RNA.',
  'her-u6-l1-q2':
    'When lactose is present, its form allolactose binds the lac repressor and changes its shape. The repressor falls off the operator, so RNA polymerase can transcribe the genes. Tryptophan controls a different operon (trp).',
  'her-u6-l1-q3':
    'Splicing removes introns and joins exons together, carried out by the spliceosome. Capping adds a protective cap to the 5′ end, and polyadenylation adds a poly-A tail to the 3′ end; neither removes introns.',
  'her-u6-l1-q4':
    'An inducible operon, like lac, is usually off and turns on when an inducer such as allolactose is present. A repressible operon, like trp, is usually on and turns off when a corepressor such as tryptophan builds up.',
  'her-u6-l1-q5':
    'Through alternative splicing, one pre-mRNA can have different combinations of exons kept or removed. Each version is a different mature mRNA, which is translated into a different protein.',
  'her-u6-l1-q6':
    'Introns are cut out of the pre-mRNA before translation, so a deletion inside one usually disappears with it and the protein is unchanged. The exception is a change that disrupts a splice site.',
  'her-u6-l1-q7':
    'A new tRNA with its amino acid enters the A site. The growing chain on the P-site tRNA is joined to that amino acid. The ribosome moves along one codon, and the now-empty tRNA leaves from the E site.',
  'her-u7-l1-q1':
    'Since p + q = 1, p = 1 − 0.2 = 0.8. The frequency of AA is p² = 0.8² = 0.64. 0.32 is 2pq (heterozygotes), and 0.04 is q² (aa).',
  'her-u7-l1-q2':
    'A bottleneck is a sudden, sharp drop in population size that leaves only a few alleles by chance. A founder effect is similar but happens when a small group starts a new population elsewhere. Neither is selection.',
  'her-u7-l1-q3':
    'Inbreeding (nonrandom mating) makes relatives more likely to share alleles, raising the share of homozygotes and lowering the share of heterozygotes below 2pq. A large population, no mutation and no migration are Hardy–Weinberg conditions, not violations.',
  'her-u7-l1-q4':
    'Hardy–Weinberg requires a very large population, random mating, no mutation, no migration (gene flow) and no natural selection. If all five hold, allele frequencies stay the same over generations.',
  'her-u7-l1-q5':
    'When a recessive allele is rare, almost all of its copies are in heterozygous carriers, who look normal and are not selected against. Only the rare aa individuals are removed, so the allele declines very slowly.',
  'her-u7-l1-q6':
    'There are 200 alleles. A = 2(49) + 42 = 140, so p = 0.7 and q = 0.3. Expected: p² = 0.49 (49), 2pq = 0.42 (42), q² = 0.09 (9). Observed counts match exactly, consistent with equilibrium.',
  'her-u7-l1-q7':
    'For an additive trait, each gene gives a 1/4 chance of matching one extreme parent in the F2. With n genes the chance is (1/4)ⁿ. Since 4⁴ = 256, (1/4)⁴ = 1/256, so 4 genes contribute.',
  'her-u8-l1-q1':
    'PCR repeatedly heats the sample to about 95 °C to separate DNA strands. Taq polymerase comes from a hot-spring bacterium and survives this heat, so it keeps working cycle after cycle. Ordinary polymerases would be destroyed.',
  'her-u8-l1-q2':
    'During annealing, the mixture cools so primers can bind by base pairing to their complementary sequences on the single-stranded template. Strands separate in denaturation, and nucleotides are added in extension.',
  'her-u8-l1-q3':
    'A ddNTP lacks the 3′ hydroxyl (–OH) group. DNA polymerase needs that group to attach the next nucleotide, so once a ddNTP is added, the chain cannot grow. It still has a base and phosphates.',
  'her-u8-l1-q4':
    'Denaturation at about 95 °C separates the strands. Annealing at about 50–65 °C lets primers bind. Extension at about 72 °C lets Taq polymerase add nucleotides. The cycle repeats, doubling the DNA each time.',
  'her-u8-l1-q5':
    'Sanger sequencing uses one primer, so copying is linear, not exponential. It also adds labeled ddNTPs that stop chains at every position, giving fragments that reveal the sequence. PCR uses two primers and no ddNTPs.',
  'her-u8-l1-q6':
    'PCR can answer whether a sample contains a specific DNA sequence, such as a pathogen’s DNA. If primers for that target produce a product, the DNA is present; no product suggests it is absent or below detection.',
  'her-u8-l1-q7':
    'If the annealing temperature is too low, primers can bind to sites that only partly match. Polymerase then copies those extra regions, producing unexpected bands. Raising the annealing temperature makes binding more specific.',
};
