import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Protein Modeling presentations, served from public/presentations.
export const photos = {
  'prot-levels': {
    file: 'prot-levels.png',
    width: 900,
    height: 1571,
    alt: 'A chain of colored amino-acid beads, a helix and sheet, a folded single chain and a four-chain hemoglobin, each labeled with its structural level.',
    caption:
      'The four levels: primary sequence, secondary helices and sheets, the tertiary fold of one chain, and the quaternary assembly of several chains.',
    credit: 'LadyofHats',
    source: commons('Main_protein_structure_levels_en.svg'),
  },
  'prot-myoglobin': {
    file: 'prot-myoglobin.png',
    width: 1200,
    height: 1214,
    alt: 'A blue cartoon of myoglobin made mostly of alpha helices wrapped around a heme group drawn as sticks.',
    caption: 'Myoglobin as a cartoon: one chain of helices holding a heme; side chains are hidden.',
    credit: 'AzaToth',
    source: commons('Myoglobin.png'),
  },
  'prot-hemoglobin': {
    file: 'prot-hemoglobin.png',
    width: 1200,
    height: 1200,
    alt: 'A cartoon of hemoglobin with two red and two blue chains packed together, each holding a green heme.',
    caption:
      'Hemoglobin’s quaternary structure: four chains (two α in red, two β in blue), each with a heme.',
    credit: 'Richard Wheeler (Zephyris)',
    source: commons('1GZX_Haemoglobin.png'),
  },
  'prot-gfp': {
    file: 'prot-gfp.png',
    width: 1200,
    height: 1200,
    alt: 'A rainbow-colored cartoon of green fluorescent protein: a barrel of beta strands with loops at the ends.',
    caption:
      'GFP colored from N terminus (blue) to C terminus (red): a beta barrel of eleven strands.',
    credit: 'Richard Wheeler (Zephyris)',
    source: commons('GFP_structure.png'),
  },
  'prot-translation': {
    file: 'prot-translation.png',
    width: 1200,
    height: 847,
    alt: 'A ribosome with large and small subunits on an mRNA strand, tRNAs carrying amino acids into the A site and a growing protein chain leaving the top.',
    caption:
      'Translation: tRNAs bring amino acids to the ribosome’s A site, and the chain grows from the P site.',
    credit: 'LadyofHats',
    source: commons('Ribosome_mRNA_translation_en.svg'),
  },
  'prot-genetic-code': {
    file: 'prot-genetic-code.png',
    width: 1200,
    height: 456,
    alt: 'A double DNA strand transcribed to a colored RNA sequence, read in triplets to the amino acids V, H, L, T, P, E, E, K.',
    caption:
      'DNA is transcribed to RNA, and each three-base codon is translated into one amino acid.',
    credit: 'Madprime',
    source: commons('Genetic_code.svg'),
  },
  'prot-ramachandran': {
    file: 'prot-ramachandran.png',
    width: 1200,
    height: 1072,
    alt: 'A scatter of backbone φ against ψ angles from many structures, dense in a beta region upper left and an alpha region middle left, with contour lines.',
    caption:
      'A Ramachandran plot: real backbones cluster in the α-helix and β-sheet regions of φ and ψ.',
    credit: 'Dcrjsr',
    source: commons('Ramachandran_plot_general_100K.jpg'),
  },
  'prot-denaturation': {
    file: 'prot-denaturation.png',
    width: 1200,
    height: 663,
    alt: 'A tangled folded chain, an arrow labeled heat, then the same colored chain as loose separate strands.',
    caption:
      'Denaturation: heat unfolds the chain, but the sequence and peptide bonds stay intact.',
    credit: 'Scurran15',
    source: commons('Process_of_Denaturation.svg'),
  },
  'prot-amino-acids': {
    file: 'prot-amino-acids.png',
    width: 1200,
    height: 1553,
    alt: 'A chart of the amino acids grouped in colored panels: electrically charged, polar uncharged, special cases and hydrophobic side chains.',
    caption:
      'Amino acids grouped by side chain: charged, polar uncharged, special cases (Cys, Gly, Pro) and hydrophobic.',
    credit: 'Dan Cojocari',
    source: commons('Molecular_structures_of_the_21_proteinogenic_amino_acids.svg'),
  },
  'prot-helix': {
    file: 'prot-helix.jpg',
    width: 1200,
    height: 517,
    alt: 'A green ribbon alpha helix running horizontally with stick side chains and yellow dashed hydrogen bonds along it.',
    caption:
      'An α-helix as ribbon and sticks: yellow dashes are backbone hydrogen bonds between residues i and i+4.',
    credit: 'Zsolt Bikadi',
    source: commons('Alpha_helix.png'),
  },
  'prot-flu-3d': {
    file: 'prot-flu-3d.png',
    width: 1200,
    height: 890,
    alt: 'A cutaway 3D model of an influenza virion: a purple lipid envelope studded with hemagglutinin and neuraminidase spikes around coiled RNPs.',
    caption:
      'Influenza A virion: HA and NA spikes stud the lipid envelope; the segmented genome sits inside as RNPs.',
    credit: 'National Institutes of Health',
    source: commons('3D_Influenza_virus.png'),
  },
  'prot-antibody': {
    file: 'prot-antibody.png',
    width: 1200,
    height: 1695,
    alt: 'A Y-shaped antibody with antigen-binding sites at the tips of both arms, a matching antigen bound to one tip, and six differently shaped antigens above.',
    caption: 'An antibody’s two tips bind one particular shape; other antigens do not fit.',
    credit: 'Fvasconcellos',
    source: commons('Antibody.svg'),
  },
  'prot-flu-names': {
    file: 'prot-flu-names.png',
    width: 1200,
    height: 790,
    alt: 'A virus drawing above the strain name A/Fujian/411/2002 (H3N2), with arrows labeling virus type, origin, strain number, year and subtype.',
    caption:
      'Influenza names give type, origin, strain, year and the H and N subtypes of its surface proteins.',
    credit: 'Sakurambo',
    source: commons('InfluenzaNomenclatureDiagram.svg'),
  },
  'prot-ha-ribbon': {
    file: 'prot-ha-ribbon.jpg',
    width: 500,
    height: 331,
    alt: 'A physical model of the influenza hemagglutinin trimer built from colored backbone tubes in green, red, purple and orange.',
    caption:
      'A physical backbone model of hemagglutinin: each chain has its own color so the trimer can be traced.',
    credit: 'NIAID',
    source: commons('Flu_Hemagglutinin_Ribbon_(14550383745).jpg'),
  },
  'prot-ha-model': {
    file: 'prot-ha-model.jpg',
    width: 1200,
    height: 795,
    alt: 'A 3D-printed space-filling model of influenza hemagglutinin in yellow, green, red and blue.',
    caption:
      'A 3D-printed space-filling hemagglutinin model: the surface view shows shape, not the chain path.',
    credit: 'NIAID',
    source: commons('Flu_Hemagglutinin_(14547505471).jpg'),
  },
  'prot-jmol': {
    file: 'prot-jmol.png',
    width: 330,
    height: 330,
    alt: 'A Jmol view of a protein bound to DNA, with the DNA in pink and the protein chains as purple and green cartoons.',
    caption: 'A Jmol view: a protein–DNA complex drawn as cartoons, colored by chain.',
    credit: 'NicoV',
    source: commons('Jmol_screenshot_2hvy.jpg'),
  },
} satisfies Record<string, Photo>;
