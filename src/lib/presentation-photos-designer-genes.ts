import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Designer Genes presentations, served from public/presentations.
export const photos = {
  'gene-abo': {
    file: 'gene-abo.png',
    width: 1200,
    height: 773,
    alt: 'A table of blood groups A, B, AB and O showing the antigens on each red cell and the antibodies in each plasma.',
    caption: 'ABO groups: type AB cells carry both A and B antigens; type O cells carry neither.',
    credit: 'InvictaHOG',
    source: commons('ABO_blood_type.svg'),
  },
  'gene-autosomal-recessive': {
    file: 'gene-autosomal-recessive.png',
    width: 1200,
    height: 1660,
    alt: 'Two carrier parents with one marked chromosome each, and four children: one unaffected, two carriers and one affected.',
    caption:
      'Autosomal recessive: two carriers have a 1 in 4 chance of an affected child in each pregnancy.',
    credit: 'Domaina, Kashmiri and SUM1',
    source: commons('Autosomal_recessive_-_en.svg'),
  },
  'gene-crispr': {
    file: 'gene-crispr.png',
    width: 1200,
    height: 803,
    alt: 'Cas9 protein holding a guide RNA paired with target DNA next to a red PAM site, with arrows marking the two cut sites.',
    caption:
      'CRISPR–Cas9: the guide RNA pairs with the target beside a PAM, and Cas9 cuts both strands.',
    credit: 'Marius Walter',
    source: commons('GRNA-Cas9.png'),
  },
  'gene-crossover': {
    file: 'gene-crossover.png',
    width: 1200,
    height: 930,
    alt: 'An old book figure of two paired chromosomes twisting, with black and white bead chains swapping segments to make mixed chromosomes.',
    caption:
      'Morgan’s scheme of crossing over: paired chromosomes exchange segments, creating recombinant chromosomes.',
    credit: 'Thomas Hunt Morgan',
    source: commons('Morgan_crossover_1.jpg'),
  },
  'gene-gel': {
    file: 'gene-gel.jpg',
    width: 1200,
    height: 900,
    alt: 'A purple-lit agarose gel with glowing pink DNA bands at different heights in several lanes.',
    caption:
      'An agarose gel: DNA fragments separate by size, with smaller fragments running farther.',
    credit: 'Mnolf',
    source: commons('Gel_electrophoresis_2.jpg'),
  },
  'gene-hardy-weinberg': {
    file: 'gene-hardy-weinberg.png',
    width: 1200,
    height: 966,
    alt: 'A graph of genotype frequency against allele frequency p: a falling blue q² curve, rising red p² curve and green 2pq arch peaking at 0.5.',
    caption: 'Hardy–Weinberg genotype frequencies: p², 2pq and q² across allele frequencies.',
    credit: 'Johnuniq',
    source: commons('Hardy-Weinberg.svg'),
  },
  'gene-karyotype': {
    file: 'gene-karyotype.png',
    width: 1200,
    height: 1291,
    alt: 'A banded human karyotype of chromosomes 1 to 22 plus X and Y, with three copies of chromosome 21.',
    caption: 'Trisomy 21: three copies of chromosome 21, the karyotype of Down syndrome.',
    credit: 'National Human Genome Research Institute',
    source: commons('Down_Syndrome_Karyotype.png'),
  },
  'gene-lac-operon': {
    file: 'gene-lac-operon.png',
    width: 1200,
    height: 1000,
    alt: 'The lac operon map (lacI, CAP site, promoter, operator, lacZ, lacY, lacA) with four rows showing expression under each glucose and lactose condition.',
    caption:
      'The lac operon is strongly expressed only when glucose is low and lactose is available.',
    credit: 'G3pro and Tereseik',
    source: commons('Lac_operon-2010-21-01.png'),
  },
  'gene-meiosis': {
    file: 'gene-meiosis.png',
    width: 1200,
    height: 755,
    alt: 'Two pairs of homologous chromosomes replicate, separate in meiosis I into two nuclei, then split again in meiosis II into four haploid nuclei.',
    caption:
      'Meiosis: homologs separate in meiosis I and sister chromatids in meiosis II, giving four haploid nuclei.',
    credit: 'Rdbickel',
    source: commons('Meiosis_Overview_new.svg'),
  },
  'gene-mitosis': {
    file: 'gene-mitosis.png',
    width: 1200,
    height: 437,
    alt: 'One homologous pair goes through DNA replication and mitosis, ending in two diploid daughter cells with the same chromosomes.',
    caption: 'Replication then mitosis: each daughter cell gets one copy of every chromosome.',
    credit: 'Mysid, after NCBI',
    source: commons('Major_events_in_mitosis.svg'),
  },
  'gene-nondisjunction': {
    file: 'gene-nondisjunction.png',
    width: 1200,
    height: 1246,
    alt: 'Maternal and paternal meiosis side by side: maternal chromosomes 21 fail to separate in meiosis I, giving 24- and 22-chromosome eggs, and fertilization yields a 47-chromosome zygote.',
    caption:
      'Nondisjunction in maternal meiosis I produces an egg with 24 chromosomes and a trisomy 21 zygote.',
    credit: 'Willnpp11',
    source: commons('Nondisjunction_in_meiosis_leading_to_trisomy_21.jpg'),
  },
  'gene-pcr': {
    file: 'gene-pcr.png',
    width: 1200,
    height: 625,
    alt: 'Polymerase chain reaction over three cycles: denaturation, primer annealing and extension, with the target doubling each cycle.',
    caption: 'PCR: each cycle of denaturing, annealing and extending roughly doubles the target.',
    credit: 'Enzoklop',
    source: commons('Polymerase_chain_reaction.svg'),
  },
  'gene-phylo-tree': {
    file: 'gene-phylo-tree.png',
    width: 1200,
    height: 653,
    alt: 'A rooted tree of life splitting into Bacteria, Archaea and Eukarya, each with labeled branches such as Cyanobacteria, Methanosarcina, Fungi, Plants and Animals.',
    caption:
      'The three domains: Archaea and Eukarya share a more recent common ancestor than either does with Bacteria.',
    credit: 'Eric Gaba and Cherkash, after NASA Astrobiology Institute',
    source: commons('Phylogenetic_tree.svg'),
  },
  'gene-punnett': {
    file: 'gene-punnett.png',
    width: 1200,
    height: 1200,
    alt: 'A Punnett square for a Bb × Bb pea cross: gametes B and b along each side, giving BB, Bb, Bb purple flowers and a bb white flower.',
    caption:
      'A Bb × Bb cross: 1 BB : 2 Bb : 1 bb, giving 3 purple : 1 white with complete dominance.',
    credit: 'Madprime',
    source: commons('Punnett_square_mendel_flowers.svg'),
  },
  'gene-replication': {
    file: 'gene-replication.png',
    width: 1200,
    height: 584,
    alt: 'A replication fork with helicase opening the helix, primase, DNA polymerases on the leading and lagging strands, Okazaki fragments, ligase and topoisomerase.',
    caption:
      'The replication fork: continuous leading strand, Okazaki fragments on the lagging strand.',
    credit: 'Mariana Ruiz (LadyofHats)',
    source: commons('DNA_replication_en.svg'),
  },
  'gene-sanger': {
    file: 'gene-sanger.png',
    width: 1200,
    height: 826,
    alt: 'Sanger sequencing: a reaction with primer, template and labeled ddNTPs makes chain-terminated fragments, which a capillary gel and laser read into a chromatogram.',
    caption:
      'Sanger sequencing: chain-terminated fragments sorted by length are read as a colored chromatogram.',
    credit: 'Estevezj',
    source: commons('Sanger-sequencing.svg'),
  },
  'gene-translation': {
    file: 'gene-translation.png',
    width: 1200,
    height: 847,
    alt: 'A ribosome with large and small subunits on an mRNA strand, tRNAs entering the A and P sites and a growing chain of amino acids.',
    caption:
      'Translation: tRNAs match codons in the A and P sites as the ribosome links amino acids.',
    credit: 'Mariana Ruiz (LadyofHats)',
    source: commons('Ribosome_mRNA_translation_en.svg'),
  },
  'gene-x-linked': {
    file: 'gene-x-linked.png',
    width: 1200,
    height: 1540,
    alt: 'An unaffected father and carrier mother with X and Y chromosomes drawn, and four children: an unaffected son and daughter, a carrier daughter and an affected son.',
    caption:
      'X-linked recessive: a carrier mother passes the allele to half her sons (affected) and half her daughters (carriers).',
    credit: 'NIH, adapted by Drsrisenthil',
    source: commons('X-linked_recessive.svg'),
  },
} satisfies Record<string, Photo>;
