// Checkpoint explanations for Protein Modeling, keyed by question id.
export const proteinModeling: Record<string, string> = {
  'prot-u1-l1-q1':
    'No. One PDB entry can contain several protein chains (A, B, C…), ligands and copies of the molecule. You must state which chain, and which residues, you are modeling.',
  'prot-u1-l1-q2':
    'Regions with no experimental density were not observed. Mark them as missing, or clearly label any added segment as modeled, so no one mistakes a guess for data. Deleting them silently breaks the residue numbering.',
  'prot-u1-l1-q3':
    'Start with what the model is meant to show, such as a binding site, a conformational change or how the chain folds. That purpose decides which parts to include, what to highlight and how much detail is needed.',
  'prot-u1-l1-q4':
    'Each season’s assigned protein, residue range and building rules can differ from the example in the course. Checking the current rules ensures the model meets the actual requirements.',
  'prot-u1-l1-q5':
    'A good annotation names the residues involved, describes the interaction’s geometry (such as distance), explains the chemistry (hydrogen bond, salt bridge, hydrophobic contact), cites the source structure and notes any uncertainty.',
  'prot-u1-l1-q6':
    'Colors and symbols mean nothing on their own: red could mean acidic residues, helices or oxygen atoms. A legend states what each one represents, so viewers and judges read the model correctly.',
  'prot-u1-l1-q7':
    'The built-in lab is a simplified, synthetic model. It cannot show how a real protein actually folds, which structure has the lowest energy or what the protein does in the cell; that needs experimental data.',
  'prot-u2-l1-q1':
    'Ribosomes add each new amino acid to the free carboxyl end of the growing chain, so the protein is built from its N-terminus (amino end) to its C-terminus (carboxyl end).',
  'prot-u2-l1-q2':
    'A stop codon (UAA, UAG or UGA) normally codes for no amino acid. It is recognized by release factors, which end translation and free the finished polypeptide.',
  'prot-u2-l1-q3':
    'Many proteins work only after folding correctly and receiving modifications such as phosphorylation, glycosylation or cleavage, or after binding partners like other subunits, cofactors or metal ions.',
  'prot-u2-l1-q4':
    'DNA and RNA strands have direction, 5′ to 3′. Complementary strands run in opposite directions, and codons are read 5′ to 3′. Labeling the ends ensures you pair bases correctly and read the right reading frame.',
  'prot-u2-l1-q5':
    'Each tRNA has an anticodon that base-pairs with a specific mRNA codon and carries the matching amino acid. It is the adapter that translates the nucleotide code into amino acids.',
  'prot-u2-l1-q6':
    'Many proteins are made with extra segments, such as a signal peptide, that are cut off. Numbering may count from the first amino acid of the precursor or of the mature protein, and databases can differ, so numbers must be checked.',
  'prot-u2-l1-q7':
    'Make a mutant with only that one residue changed and compare it with the normal (reference) protein in the same binding or activity assay. A difference then points to that residue’s role.',
  'prot-u3-l1-q1':
    'In an α-helix, the backbone C=O of each residue hydrogen-bonds to the N–H of the residue four positions later. These backbone bonds hold the regular coil; side chains point outward and do not form the helix.',
  'prot-u3-l1-q2':
    'Quaternary structure is the arrangement of two or more separate polypeptide chains (subunits) in one functional protein, as in hemoglobin’s four chains. "Quaternary" means the fourth level of structure, not four subunits.',
  'prot-u3-l1-q3':
    'No. Denaturation unfolds the protein by disrupting hydrogen bonds, hydrophobic interactions and other weak forces. The covalent peptide bonds of the primary sequence normally stay intact.',
  'prot-u3-l1-q4':
    'A motif is a short, recurring pattern of secondary structures, such as a helix-turn-helix or zinc finger. A domain is a larger region that folds independently and often has its own function. A domain can contain several motifs.',
  'prot-u3-l1-q5':
    'In a crystal, protein copies pack against each other, and some contacts are just packing, not real biological partners. Checking the annotated biological assembly shows which arrangement exists in the living cell.',
  'prot-u3-l1-q6':
    'Loops lack regular helix or sheet structure but are often important: they can form binding or active sites, flex to change the protein’s shape or connect structural elements.',
  'prot-u3-l1-q7':
    'A cartoon shows the backbone path as ribbons and arrows but leaves out individual atoms and side chains. It hides which residues contact each other and the exact chemistry of binding.',
  'prot-u4-l1-q1':
    'No. The hydrophobic effect is not a bond. Water molecules are more ordered around nonpolar groups, so the system gains entropy when those groups cluster together. It is driven by the solvent, not by new covalent links.',
  'prot-u4-l1-q2':
    'A disulfide bond is a covalent S–S link between the sulfur atoms of two cysteine side chains. It can stabilize a protein’s folded structure, especially outside the cell.',
  'prot-u4-l1-q3':
    'No. Stability depends on the kind and quality of interactions, their geometry, the cost of removing water and charge states, not just the number of contacts. Many weak or strained contacts can be less stabilizing than a few good ones.',
  'prot-u4-l1-q4':
    'pH determines whether side chains like Asp, Glu, His and Lys carry a charge. Changing pH can make or break salt bridges and hydrogen bonds, which changes folding, stability and activity.',
  'prot-u4-l1-q5':
    'Stability is how much lower in free energy the folded state is than the unfolded state. Rate is how quickly folding or unfolding happens, set by the energy barrier between them. A very stable protein can still fold slowly.',
  'prot-u4-l1-q6':
    'Membrane proteins sit in an oily lipid bilayer, so the parts facing the lipid are nonpolar on the outside. Water-soluble proteins have the opposite pattern: polar surfaces outside and a nonpolar core.',
  'prot-u4-l1-q7':
    'Counting contacts ignores which atoms are involved, the surrounding water, charge states, bond angles and distances and the actual energies of interactions. Without an energy model, a count cannot measure stability.',
  'prot-u5-l1-q1':
    'Attachment is the virus binding to receptors on the host cell. Fusion (for enveloped viruses) is the viral membrane merging with a host membrane to release the genome. They are separate steps, often using different proteins or conformational changes.',
  'prot-u5-l1-q2':
    'An epitope is the specific part of an antigen that an antibody or T-cell receptor recognizes, often a few amino acids or a small surface patch. It is not the whole virus or genome.',
  'prot-u5-l1-q3':
    'No. An antibody can bind a virus without blocking infection, for example by binding a site that is not needed for entry. Neutralization must be shown with a functional assay that measures infection.',
  'prot-u5-l1-q4':
    'Innate defenses act quickly without prior exposure, for example pattern-recognition receptors (such as toll-like receptors) detecting viral RNA, interferon signaling that puts nearby cells into an antiviral state, or natural killer cells.',
  'prot-u5-l1-q5':
    'Viral entry proteins change shape during infection, as hemagglutinin does when it shifts from its prefusion to its postfusion form. One structure shows one moment; comparing states reveals how the protein works.',
  'prot-u5-l1-q6':
    'A mutation can change how tightly a protein binds its target, its stability, how it is processed or cut, or whether antibodies still recognize it. The effect depends on where the change is and its chemistry.',
  'prot-u5-l1-q7':
    'Identifying real epitopes needs experimental data, such as antibody–protein structures or binding studies on actual viral sequences. The synthetic lab has none, so any epitope it suggests would be invented.',
  'prot-u6-l1-q1':
    'Hemagglutinin (HA) binds sialic acid receptors on host cells (attachment) and then, after a pH-triggered shape change, fuses the viral and host membranes. Neuraminidase (NA), by contrast, helps release new viruses.',
  'prot-u6-l1-q2':
    'Influenza’s genome is split into eight RNA segments. When two strains infect the same cell, new viruses can package a mix of segments from both, which is reassortment. It can produce new strains quickly.',
  'prot-u6-l1-q3':
    'The 2009 H1N1 pandemic is used to teach how hemagglutinin and reassortment work. It is a historical example, not current case data or medical advice, and the current competition protein must be confirmed separately.',
  'prot-u6-l1-q4':
    'HA is made as a precursor that is cut into HA1 and HA2, and different subtypes are numbered by different alignment conventions. Structure files may also use their own numbering, so a residue number must be matched to its reference.',
  'prot-u6-l1-q5':
    'Sugar chains (glycans) attached to HA can shield parts of its surface from antibodies and affect receptor binding. They are often only partly visible in structures, so their effect may be underestimated.',
  'prot-u6-l1-q6':
    'Antigenic drift is the gradual buildup of small mutations, which slowly changes surface proteins like HA. Antigenic shift via reassortment swaps whole genome segments between strains, causing a sudden large change.',
  'prot-u6-l1-q7':
    'A prefusion structure shows HA before it changes shape. It does not show the intermediate or postfusion forms or the movement through the entry process, so it is one snapshot of a dynamic mechanism.',
  'prot-u7-l1-q1':
    'Rotating a molecule only changes the viewing angle. The bonds, atom positions relative to each other, sequence and PDB ID stay the same.',
  'prot-u7-l1-q2':
    'Coloring by structure assigns colors by secondary-structure type, for example helices, sheets and loops in different colors. It shows classification, not energy, charge or a diagnosis, and needs a legend to interpret.',
  'prot-u7-l1-q3':
    'No. The lesson’s lab is a simplified, built-in viewer that imitates some controls. Real Jmol or JUDE workflows, scripts and outputs must be practiced in the actual software.',
  'prot-u7-l1-q4':
    'In Jmol, commands like color or display act only on the current selection. If an old selection is still active, the next command changes only that subset. Resetting ensures each step applies to the residues you intend.',
  'prot-u7-l1-q5':
    'A caption should identify the PDB entry and chain, the residue numbering used, the representation (cartoon, sticks, surface), a color legend and the specific claim the image supports.',
  'prot-u7-l1-q6':
    'A 2D image flattens depth, so atoms that appear to touch may be far apart front to back. Measure distances in 3D or rotate the model to confirm a real contact.',
  'prot-u7-l1-q7':
    'Record the exact input structure (PDB ID and chain), the commands or steps in order and consistent residue identifiers. Another person can then repeat the workflow and get the same result.',
  'prot-u8-l1-q1':
    'A strong annotation says what the feature is (residue or element), what it does (its role in structure or function) and what evidence supports that, such as a cited structure or experiment.',
  'prot-u8-l1-q2':
    'Clearly mark or label a segment with no experimental data, for example with a different material or a note. Inventing it or calling it observed misleads viewers, and ignoring it breaks the numbering.',
  'prot-u8-l1-q3':
    'Judge the model against the current official rubric for your competition level and year. Invented point values, looks alone or an old rubric can steer the work toward things that do not score.',
  'prot-u8-l1-q4':
    'Labeling the N-terminus and C-terminus shows the chain’s direction and lets anyone trace the backbone from start to finish, which is especially helpful in complex folds.',
  'prot-u8-l1-q5':
    'Having a teammate trace the chain without help reveals where the path is unclear, labels are confusing, directions are hard to follow or important features are hidden. Those are fixes you might miss yourself.',
  'prot-u8-l1-q6':
    'Not everyone sees colors the same way, and colors alone can be ambiguous. Adding text labels alongside color makes the meaning clear and accessible to all viewers.',
  'prot-u8-l1-q7':
    'Revise when there is a reason: a scientific error, something unclear to viewers or a requirement in the verified rules. Changes for decoration alone take time without improving accuracy or score.',
};
