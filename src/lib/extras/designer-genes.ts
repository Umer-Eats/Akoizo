import { check, phet, sort, type EventExtras } from '../lesson-extras.ts';
import {
  arrow,
  choice,
  circle,
  goal,
  line,
  near,
  rect,
  seeded,
  slider,
  text,
  toggle,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

const crosses: [string, number[]][] = [
  ['AaBb × AaBb', [9 / 16, 3 / 16, 3 / 16, 1 / 16]],
  ['AaBb × aabb (testcross)', [0.25, 0.25, 0.25, 0.25]],
  ['AaBb × Aabb', [3 / 8, 3 / 8, 1 / 8, 1 / 8]],
];
const classes = ['A_B_', 'A_bb', 'aaB_', 'aabb'];
const dihybrid: TopicLab = {
  id: 'gene-dihybrid',
  title: 'Two-gene crosses and sampling variation',
  lead: 'Expected ratios are probabilities, not quotas. Draw families of different sizes and compare what you get with what Mendel’s rules predict.',
  controls: [
    choice('cross', 'Cross', crosses.map(([name]) => name), 0),
    slider('n', 'Number of offspring scored', 16, 1600, 16, 320, ''),
    slider('run', 'Sample number (draw a new family)', 1, 20, 1, 1, ''),
  ],
  run: (v) => {
    const ratios = crosses[v.cross][1],
      expected = ratios.map((r) => r * v.n),
      observed = [0, 0, 0, 0],
      rng = seeded(v.run * 7919 + v.cross * 131 + v.n);
    for (let i = 0; i < v.n; i++) {
      let u = rng(),
        k = 0;
      while (k < 3 && u >= ratios[k]) u -= ratios[k++];
      observed[k]++;
    }
    const chi = expected.reduce((sum, e, i) => sum + (observed[i] - e) ** 2 / e, 0);
    return {
      o: { chi, e4: expected[3], o4: observed[3] },
      metrics: [
        { label: 'Expected counts', value: expected.map((e) => Number(e.toFixed(1))).join(' : ') },
        { label: 'Observed in this sample', value: observed.join(' : ') },
        { label: 'Chi-square (3 degrees of freedom)', value: Number(chi.toFixed(2)) },
        { label: 'Compared with the 0.05 critical value 7.81', value: chi > 7.81 ? 'Larger — an unusual sample' : 'Smaller — consistent with the model' },
      ],
      bars: {
        title: 'Expected (grey) and observed (colour) offspring',
        max: Math.max(...expected, ...observed),
        items: classes.flatMap((name, i) => [
          { label: `${name} expected`, value: expected[i], tone: 'muted' as const },
          { label: `${name} observed`, value: observed[i], tone: 'slot' as const },
        ]),
      },
    };
  },
  missions: [
    goal('Choose the cross in which all four phenotype classes are expected equally often.', 'One parent must contribute only recessive alleles, so the other parent’s gametes show directly.', { cross: 1 }, (o, v) => v.cross === 1),
    goal('In the AaBb × AaBb cross, find the family size that leads you to expect exactly 100 double-recessive offspring.', 'The aabb class is 1/16 of the total.', { n: 1600 }, (o, v) => v.cross === 0 && near(o.e4, 100, 1e-9)),
    goal('In AaBb × Aabb with 320 offspring, confirm that the rarest classes are each expected 40 times.', 'Multiply the one-gene probabilities: ¼ aa × ½ for either B phenotype.', { cross: 2 }, (o, v) => v.cross === 2 && near(o.e4, 40, 1e-9)),
  ],
  predict: {
    q: 'In AaBb × AaBb with independent assortment and complete dominance, what fraction of offspring show both recessive traits?',
    options: ['1/16', '1/4', '3/16', '9/16'],
    correct: 0,
    why: 'Each gene independently gives ¼ homozygous recessive, and ¼ × ¼ = 1/16.',
  },
  model:
    'Two unlinked autosomal genes with complete dominance and equal viability. “Observed” counts are a reproducible pseudo-random multinomial sample — synthetic, not real data. Chi-square compares them with expectation; values above 7.81 occur by chance about 5% of the time when the model is true.',
};

const mothers = [
  ['Xᴬ', 'Xᴬ'],
  ['Xᴬ', 'Xᵃ'],
  ['Xᵃ', 'Xᵃ'],
];
const sexLinked: TopicLab = {
  id: 'gene-sexlinked',
  title: 'X-linked recessive inheritance',
  lead: 'Sons receive their only X from their mother; daughters receive one X from each parent. Track the allele through both routes.',
  controls: [
    choice('mother', 'Mother', ['XᴬXᴬ · unaffected', 'XᴬXᵃ · carrier', 'XᵃXᵃ · affected'], 1),
    choice('father', 'Father', ['XᴬY · unaffected', 'XᵃY · affected'], 0),
  ],
  run: (v) => {
    const eggs = mothers[v.mother],
      fx = v.father ? 'Xᵃ' : 'Xᴬ';
    const daughters = eggs.map((e) => [e, fx]),
      sons = eggs.map((e) => [e, 'Y']);
    const affD = daughters.filter(([a, b]) => a === 'Xᵃ' && b === 'Xᵃ').length / 2,
      carD = daughters.filter(([a, b]) => a !== b).length / 2,
      affS = sons.filter(([a]) => a === 'Xᵃ').length / 2;
    const cell = (x: number, y: number, g: string[], sick: boolean): Shape[] => [
      rect(x, y, 150, 80, sick ? 'warm' : 'accent', sick, sick ? 0.3 : 1, 6),
      text(x + 75, y + 46, g.join(''), 'middle', 'ink', 18),
    ];
    return {
      o: { affD, carD, affS },
      metrics: [
        { label: 'Daughters affected', value: affD * 100, unit: '%' },
        { label: 'Daughters who are carriers', value: carD * 100, unit: '%' },
        { label: 'Sons affected', value: affS * 100, unit: '%' },
      ],
      sceneLabel: `Punnett square for an X-linked recessive trait: ${affS * 100} percent of sons and ${affD * 100} percent of daughters affected`,
      scene: [
        text(250, 40, `sperm: ${fx}`, 'middle'),
        text(410, 40, 'sperm: Y', 'middle'),
        text(160, 110, `egg: ${eggs[0]}`, 'end'),
        text(160, 200, `egg: ${eggs[1]}`, 'end'),
        ...cell(175, 60, daughters[0], daughters[0][0] === 'Xᵃ' && fx === 'Xᵃ'),
        ...cell(335, 60, sons[0], eggs[0] === 'Xᵃ'),
        ...cell(175, 150, daughters[1], daughters[1][0] === 'Xᵃ' && fx === 'Xᵃ'),
        ...cell(335, 150, sons[1], eggs[1] === 'Xᵃ'),
        text(250, 260, 'daughters', 'middle', 'muted'),
        text(410, 260, 'sons', 'middle', 'muted'),
        text(320, 310, 'Shaded cells express the recessive trait. Xᵃ carries the recessive allele.', 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal('Find the cross in which every son is affected but no daughter is.', 'Sons take their X only from the mother; daughters also get a rescuing X from the father.', { mother: 2 }, (o) => o.affS === 1 && o.affD === 0),
    goal('Find a cross that can produce an affected daughter.', 'She needs a recessive allele from each parent — so the father must be affected.', { father: 1 }, (o) => o.affD > 0),
    goal('Find the cross in which no child is affected yet every daughter is a carrier.', 'An affected father passes his X to all daughters and to no sons.', { mother: 0, father: 1 }, (o) => o.affS === 0 && o.affD === 0 && o.carD === 1),
  ],
  predict: {
    q: 'X-linked recessive conditions are seen more often in males mainly because…',
    options: [
      'A male has one X, so a single recessive allele is expressed',
      'The Y chromosome carries the same allele',
      'Males inherit two copies from their fathers',
      'The allele is dominant in males',
    ],
    correct: 0,
    why: 'A female needs the recessive allele on both X chromosomes; a male is hemizygous and has no second copy to mask it.',
  },
  model:
    'Single X-linked gene, full penetrance, no new mutation, and equal probability for each gamete. X-inactivation mosaicism in carrier females and rare recombination with the Y are ignored.',
};

const mapping: TopicLab = {
  id: 'gene-mapping',
  title: 'Testcross recombination and map distance',
  lead: 'A doubly heterozygous parent is crossed to a double recessive. The rare offspring classes are the recombinants, and their share measures distance.',
  controls: [
    slider('d', 'Recombination frequency between the genes', 0, 50, 1, 20, '%'),
    slider('n', 'Offspring scored', 100, 2000, 100, 1000, ''),
    choice('phase', 'Arrangement in the heterozygous parent', ['Coupling: AB / ab', 'Repulsion: Ab / aB'], 0),
  ],
  run: (v) => {
    const rec = (v.n * v.d) / 200,
      par = (v.n * (100 - v.d)) / 200;
    const counts = v.phase === 0 ? [par, par, rec, rec] : [rec, rec, par, par];
    return {
      o: { rec, par, rf: v.d / 100, ab: counts[0] },
      metrics: [
        { label: 'Each recombinant class', value: rec },
        { label: 'Each parental class', value: par },
        { label: 'Recombination frequency', value: v.d, unit: '%' },
        { label: 'Interpretation', value: v.d === 50 ? 'Indistinguishable from independent assortment' : v.d === 0 ? 'Complete linkage' : `Linked — about ${v.d} map units apart` },
      ],
      bars: {
        title: 'Testcross offspring by phenotype',
        max: v.n / 2,
        items: ['AB', 'ab', 'Ab', 'aB'].map((name, i) => ({
          label: `${name} ${(v.phase === 0) === i < 2 ? '(parental)' : '(recombinant)'}`,
          value: counts[i],
          tone: (v.phase === 0) === i < 2 ? ('accent' as const) : ('slot' as const),
        })),
      },
    };
  },
  missions: [
    goal('With 1,000 offspring, find the recombination frequency that gives exactly 50 in each recombinant class.', 'Two recombinant classes of 50 make 100 recombinants out of 1,000.', { d: 10 }, (o, v) => v.n === 1000 && near(o.rec, 50, 1e-9)),
    goal('Make the two genes behave as if they were on different chromosomes.', 'Unlinked genes give four equal classes.', { d: 50 }, (o) => o.rf === 0.5),
    goal('In repulsion with 2,000 offspring, make the AB class contain exactly 100 individuals.', 'In repulsion AB is a recombinant class.', { phase: 1, n: 2000, d: 10 }, (o, v) => v.phase === 1 && v.n === 2000 && near(o.ab, 100, 1e-9)),
  ],
  predict: {
    q: 'Two genes that lie very far apart on the same chromosome produce recombinant offspring in a testcross at a frequency of about…',
    options: ['50%', '100%', '75%', '0%'],
    correct: 0,
    why: 'Multiple crossovers between distant genes scramble the alleles so that recombination frequency saturates at 50% — the same as independent assortment.',
  },
  model:
    'Expected class sizes for a two-point testcross with recombination frequency r: recombinants r/2 each, parentals (1 − r)/2 each. Map distance in centimorgans approximates r only for short intervals; double crossovers make long intervals appear shorter.',
};

const meiosis = [
  { gametes: ['A', 'A', 'a', 'a'], tri: 0, mono: 0, normal: 1 },
  { gametes: ['A a', 'A a', '—', '—'], tri: 0.5, mono: 0.5, normal: 0 },
  { gametes: ['A A', '—', 'a', 'a'], tri: 0.25, mono: 0.25, normal: 0.5 },
];
const nondisjunction: TopicLab = {
  id: 'gene-nondisjunction',
  title: 'Meiotic errors and the gametes they make',
  lead: 'One chromosome pair carries a marker, A on one homolog and a on the other. Choose where segregation fails and inspect the four products.',
  controls: [
    choice('error', 'Meiosis outcome', ['Normal segregation', 'Nondisjunction in meiosis I', 'Nondisjunction in meiosis II (one of the two cells)'], 0),
    slider('pairs', 'Chromosome pairs in the organism', 1, 23, 1, 4, ''),
  ],
  run: (v) => {
    const m = meiosis[v.error];
    return {
      o: { tri: m.tri, mono: m.mono, normal: m.normal, combos: 2 ** v.pairs },
      metrics: [
        { label: 'Gametes with the normal count (n)', value: m.normal * 100, unit: '%' },
        { label: 'Zygotes trisomic after normal fertilisation', value: m.tri * 100, unit: '%' },
        { label: 'Zygotes monosomic after normal fertilisation', value: m.mono * 100, unit: '%' },
        { label: 'Gamete combinations from independent assortment', value: 2 ** v.pairs },
      ],
      sceneLabel: `Four meiotic products for the marked chromosome: ${m.gametes.join(', ')}`,
      scene: [
        text(320, 36, 'Copies of the marked chromosome in each of the four gametes', 'middle'),
        ...m.gametes.flatMap((g, i) => {
          const copies = g === '—' ? 0 : g.split(' ').length,
            x = 110 + i * 140;
          return [
            circle(x, 150, 52, copies === 1 ? 'accent' : 'warm', false),
            text(x, 158, g, 'middle', 'ink', 20),
            text(x, 232, copies === 1 ? 'n' : copies === 2 ? 'n + 1' : 'n − 1', 'middle', copies === 1 ? 'muted' : 'warm'),
          ];
        }),
        text(320, 284, 'A a = both homologs (different) · A A = two sister copies (identical)', 'middle', 'muted'),
        text(320, 312, `With ${v.pairs} pairs, independent assortment alone gives 2^${v.pairs} combinations.`, 'middle', 'muted'),
      ],
    };
  },
  missions: [
    goal('Find the error after which half of all zygotes would be trisomic for this chromosome.', 'If the homologs fail to separate, no product is normal.', { error: 1 }, (o) => o.tri === 0.5),
    goal('Find the error that still leaves exactly half of the gametes normal.', 'Only one of the two second-division cells is affected.', { error: 2 }, (o) => o.normal === 0.5 && o.tri > 0),
    goal('Set the human number of chromosome pairs and read how many gamete combinations independent assortment allows.', 'Humans have 23 pairs.', { pairs: 23 }, (o, v) => v.pairs === 23),
  ],
  predict: {
    q: 'A disomic gamete carries two identical copies (A A) of a chromosome from a heterozygous parent. The error most likely occurred in…',
    options: ['Meiosis II, when sister chromatids failed to separate', 'Meiosis I, when homologs failed to separate', 'Mitosis before meiosis', 'Fertilisation'],
    correct: 0,
    why: 'Sister chromatids are copies of one homolog. A meiosis I error would instead leave both different homologs (A and a) together.',
  },
  model:
    'One marked chromosome pair with no crossing over between the marker and the centromere. Meiosis II failure is shown in one of the two secondary cells. Zygote outcomes assume fertilisation by a normal gamete; viability differences are not modelled.',
};

const bases = 'TCAG',
  aminoString = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const names: Record<string, string> = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'Stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
const translate = (codon: string) =>
  names[aminoString[bases.indexOf(codon[0]) * 16 + bases.indexOf(codon[1]) * 4 + bases.indexOf(codon[2])]];
const alleles = ['ATGGCTGAATTCTGGTAA', 'ATGGCCGAATTCTGGTAA', 'ATGGCTGTATTCTGGTAA', 'ATGGCTGAATTCTGATAA', 'ATGCTGAATTCTGGTAA'];
function protein(dna: string) {
  const out: string[] = [];
  for (let i = 0; i + 3 <= dna.length; i += 3) {
    const aa = translate(dna.slice(i, i + 3));
    if (aa === 'Stop') break;
    out.push(aa);
  }
  return out;
}
const codons: TopicLab = {
  id: 'gene-codon',
  title: 'Point mutations: from DNA change to protein change',
  lead: 'A short gene is transcribed and translated. Apply each DNA change and decide what kind of mutation it is from its effect on the protein.',
  controls: [
    choice('mut', 'Change to the coding strand', ['No change', 'Codon 2: GCT → GCC', 'Codon 3: GAA → GTA', 'Codon 5: TGG → TGA', 'Codon 2: delete the G'], 0),
    slider('focus', 'Codon to inspect', 1, 6, 1, 1, ''),
  ],
  run: (v) => {
    const dna = alleles[v.mut],
      wild = protein(alleles[0]),
      now = protein(dna),
      triplets = dna.match(/.{1,3}/g) ?? [];
    const changed = now.filter((aa, i) => aa !== wild[i]).length + Math.max(0, wild.length - now.length);
    const focus = triplets[v.focus - 1] ?? '';
    return {
      o: { length: now.length, changed, same: dna === alleles[0] ? 1 : 0 },
      metrics: [
        { label: 'mRNA', value: dna.replace(/T/g, 'U').match(/.{1,3}/g)!.join(' ') },
        { label: 'Protein', value: now.join('–') || '(none)' },
        { label: 'Amino acids in the product', value: now.length },
        { label: 'Positions that differ from the original protein', value: changed },
        { label: `Codon ${v.focus}`, value: focus.length === 3 ? `${focus.replace(/T/g, 'U')} → ${translate(focus)}` : 'Incomplete codon — no amino acid' },
      ],
      sceneLabel: `Coding strand ${triplets.join(' ')} translated to ${now.join(', ') || 'no protein'}`,
      scene: [
        text(40, 44, '5′ coding strand, read in triplets from the start codon'),
        ...triplets.flatMap((codon, i) => {
          const x = 44 + i * 96,
            aa = codon.length === 3 ? translate(codon) : '?',
            differs = codon !== (alleles[0].match(/.{1,3}/g) ?? [])[i];
          return [
            rect(x, 70, 84, 46, differs ? 'warm' : 'accent', i + 1 === v.focus, i + 1 === v.focus ? 0.25 : 1, 6),
            text(x + 42, 99, codon, 'middle', 'ink', 16),
            ...arrow(x + 42, 122, x + 42, 160, 'muted', 1.5),
            rect(x, 166, 84, 46, aa === 'Stop' ? 'warm' : 'green', aa === 'Stop', 0.35, 23),
            text(x + 42, 195, aa, 'middle', 'ink', 15),
          ];
        }),
        text(40, 260, 'Orange outlines mark codons that differ from the original sequence.', 'start', 'muted'),
        text(40, 284, 'Translation stops at the first in-frame stop codon.', 'start', 'muted'),
      ],
    };
  },
  missions: [
    goal('Find the DNA change that leaves the protein completely unchanged.', 'The genetic code is redundant: look at the third base of an alanine codon.', { mut: 1 }, (o) => o.same === 0 && o.changed === 0),
    goal('Find the change that makes the protein shorter than the original.', 'One of these changes creates a stop codon early.', { mut: 3 }, (o) => o.length < 5),
    goal('Find the change that alters every amino acid downstream of it.', 'Removing a single base shifts the reading frame.', { mut: 4 }, (o) => o.changed >= 4 && o.length >= 5),
  ],
  predict: {
    q: 'Which single change is most likely to destroy a protein’s function?',
    options: [
      'Deleting one base near the start of the coding sequence',
      'Changing the third base of a codon to a synonymous one',
      'Replacing one amino acid with a chemically similar one',
      'Changing a base in a stretch that is spliced out',
    ],
    correct: 0,
    why: 'A frameshift early in the gene changes every later codon and usually introduces a premature stop, so almost none of the normal protein is made.',
  },
  model:
    'Standard genetic code applied to a six-codon teaching gene. Real consequences also depend on where the residue sits in the folded protein, on splicing, and on nonsense-mediated decay — none of which a codon table shows.',
};

const lac: TopicLab = {
  id: 'gene-lac',
  title: 'The lac operon as a logic circuit',
  lead: 'Two signals — lactose and glucose — and two regulatory proteins decide whether RNA polymerase transcribes the lactose genes.',
  controls: [
    toggle('lactose', 'Lactose present'),
    toggle('glucose', 'Glucose present', 1),
    choice('strain', 'Strain', ['Wild type', 'lacI⁻ · no functional repressor', 'lacOᶜ · operator cannot bind repressor', 'Promoter deleted'], 0),
  ],
  run: (v) => {
    const repressor = v.strain !== 1,
      bound = v.strain === 0 && !v.lactose,
      cap = !v.glucose,
      expr = v.strain === 3 ? 0 : bound ? 1 : cap ? 100 : 10;
    return {
      o: { expr, bound: bound ? 1 : 0, cap: cap ? 1 : 0 },
      metrics: [
        { label: 'Relative transcription of lacZYA', value: expr, unit: '% of maximum' },
        { label: 'Repressor on the operator', value: bound ? 'Yes — transcription blocked' : repressor && v.strain === 0 ? 'No — inactivated by allolactose' : 'No' },
        { label: 'CAP–cAMP bound at the promoter', value: cap ? 'Yes — polymerase recruited strongly' : 'No — glucose keeps cAMP low' },
      ],
      sceneLabel: `lac operon: repressor ${bound ? 'bound' : 'not bound'}, activator ${cap ? 'bound' : 'absent'}, transcription ${expr} percent`,
      scene: [
        line(40, 170, 600, 170, 'muted', 6),
        rect(70, 150, 70, 40, 'gold', true, 0.5),
        text(105, 214, 'CAP site', 'middle', 'muted', 11),
        rect(150, 150, 90, 40, v.strain === 3 ? 'muted' : 'accent', v.strain !== 3, 0.5),
        text(195, 214, v.strain === 3 ? 'promoter (deleted)' : 'promoter', 'middle', 'muted', 11),
        rect(250, 150, 60, 40, 'warm', true, 0.5),
        text(280, 214, 'operator', 'middle', 'muted', 11),
        ...['lacZ', 'lacY', 'lacA'].flatMap((gene, i) => [
          rect(320 + i * 90, 150, 84, 40, 'green', true, expr >= 100 ? 0.9 : expr >= 10 ? 0.45 : 0.15),
          text(362 + i * 90, 175, gene, 'middle'),
        ]),
        ...(cap ? [circle(105, 120, 20, 'gold'), text(105, 92, 'CAP–cAMP', 'middle', 'gold', 11)] : []),
        ...(bound ? [circle(280, 120, 22, 'warm'), text(280, 90, 'repressor', 'middle', 'warm', 11)] : []),
        ...(expr >= 10 ? arrow(200, 250, 200 + expr * 3.6, 250, 'slot', 3 + expr / 25) : []),
        text(200, 290, expr >= 10 ? 'mRNA made' : 'essentially no mRNA', 'start', 'slot'),
        ...(v.lactose ? [text(480, 60, 'lactose → allolactose (inducer)', 'middle')] : []),
        ...(v.glucose ? [text(160, 60, 'glucose present', 'middle')] : []),
      ],
    };
  },
  missions: [
    goal('Drive the wild-type operon to maximum transcription.', 'Remove the repressor and recruit the activator: lactose present, glucose absent.', { lactose: 1, glucose: 0 }, (o, v) => v.strain === 0 && o.expr === 100),
    goal('Find a mutant that transcribes at the full rate with no lactose present.', 'If the repressor is missing or cannot bind, the operon is constitutive.', { strain: 1, glucose: 0 }, (o, v) => v.lactose === 0 && o.expr === 100),
    goal('Show that glucose still reduces expression in a constitutive mutant.', 'Catabolite repression acts through CAP, independently of the repressor.', { strain: 1 }, (o, v) => (v.strain === 1 || v.strain === 2) && v.glucose === 1 && o.expr === 10),
  ],
  predict: {
    q: 'Wild-type E. coli growing with both glucose and lactose expresses the lac operon…',
    options: [
      'At a low level — the repressor is off, but the activator is missing',
      'At the maximum level',
      'Not at all, because the repressor is bound',
      'Only after all the lactose is gone',
    ],
    correct: 0,
    why: 'Lactose removes the repressor, but glucose keeps cAMP low so CAP cannot help polymerase bind. Cells use glucose first.',
  },
  model:
    'Qualitative logic levels: 100 = induced with CAP, 10 = induced without CAP, 1 = repressed (basal leak), 0 = no promoter. Real expression is graded, and inducer exclusion also limits lactose entry when glucose is present.',
};

function trajectory(p0: number, wAA: number, wAa: number, waa: number) {
  const ps = [p0];
  for (let i = 0; i < 100; i++) {
    const p = ps[i],
      q = 1 - p,
      mean = p * p * wAA + 2 * p * q * wAa + q * q * waa;
    ps.push(mean > 0 ? (p * (p * wAA + q * wAa)) / mean : p);
  }
  return ps;
}
const selection: TopicLab = {
  id: 'gene-selection',
  title: 'Selection on one gene across generations',
  lead: 'Assign a relative fitness to each genotype and follow allele A’s frequency. Hardy–Weinberg is what you get when all three are equal.',
  controls: [
    slider('p0', 'Starting frequency of allele A', 0.05, 0.95, 0.05, 0.5, ''),
    slider('wAA', 'Fitness of AA', 0, 1, 0.05, 1, ''),
    slider('wAa', 'Fitness of Aa', 0, 1, 0.05, 1, ''),
    slider('waa', 'Fitness of aa', 0, 1, 0.05, 0.5, ''),
    slider('gens', 'Generations elapsed', 0, 100, 1, 20, ''),
  ],
  run: (v) => {
    const ps = trajectory(v.p0, v.wAA, v.wAa, v.waa),
      p = ps[v.gens],
      over = v.wAa > v.wAA && v.wAa > v.waa,
      peq = over ? (v.wAa - v.waa) / (2 * v.wAa - v.wAA - v.waa) : -1;
    return {
      o: { p, q: 1 - p, peq },
      metrics: [
        { label: 'Frequency of A now', value: p },
        { label: 'Frequency of a now', value: 1 - p },
        { label: 'Genotypes AA : Aa : aa at birth', value: [p * p, 2 * p * (1 - p), (1 - p) ** 2].map((x) => x.toFixed(3)).join(' : ') },
        { label: 'Predicted stable equilibrium for A', value: over ? peq : 'None — one allele is favoured throughout' },
      ],
      plot: {
        title: 'Allele A frequency over time',
        x: [0, 100, 'Generation'],
        y: [0, 1, 'Frequency of A'],
        curves: [{ f: (g) => ps[Math.max(0, Math.min(100, Math.round(g)))] }],
        hlines: over ? [{ y: peq, label: 'equilibrium' }] : [],
        points: [{ x: v.gens, y: p, label: `p = ${p.toFixed(3)}` }],
      },
    };
  },
  missions: [
    goal('Make aa lethal and show that after 20 generations the a allele is below 5% — but not gone.', 'Set the fitness of aa to zero. Heterozygotes shelter the allele from selection.', { waa: 0 }, (o, v) => v.waa === 0 && v.wAA === 1 && v.wAa === 1 && v.gens >= 20 && o.q < 0.05 && o.q > 0),
    goal('Give heterozygotes the advantage and show a population that started far from 0.5 settling at its equilibrium after 100 generations.', 'Make Aa fitter than both homozygotes, start A rare, and run the full time.', { wAA: 0.8, waa: 0.8, p0: 0.1, gens: 100 }, (o, v) => o.peq > 0 && Math.abs(v.p0 - o.peq) > 0.2 && v.gens === 100 && near(o.p, o.peq, 0.02)),
    goal('Drive allele A above 99% within 100 generations.', 'Selection is far faster when heterozygotes are also at a disadvantage: try 0.75 for Aa.', { wAa: 0.75, gens: 100 }, (o) => o.p > 0.99),
  ],
  predict: {
    q: 'A recessive lethal allele is not eliminated quickly from a large population because…',
    options: [
      'Most copies are carried by unaffected heterozygotes',
      'Lethal alleles mutate back to normal',
      'Selection only acts on dominant alleles',
      'Homozygotes reproduce before dying',
    ],
    correct: 0,
    why: 'When q is small, aa individuals (q²) are far rarer than carriers (2pq), so selection sees only a tiny fraction of the allele’s copies.',
  },
  model:
    'Deterministic one-locus viability selection: p′ = p(p·w_AA + q·w_Aa) / w̄, with random mating and an effectively infinite population. No drift, mutation, or migration. With heterozygote advantage the equilibrium is p̂ = (w_Aa − w_aa) / (2w_Aa − w_AA − w_aa).',
};

const clock: TopicLab = {
  id: 'gene-clock',
  title: 'Sequence divergence and saturation',
  lead: 'Two lineages accumulate substitutions independently. The differences you can count are fewer than the changes that happened — increasingly so with time.',
  controls: [
    slider('rate', 'Substitution rate per site per million years', 0.001, 0.05, 0.001, 0.01, ''),
    slider('t', 'Time since the lineages split', 0, 100, 0.5, 5, 'Myr'),
  ],
  run: (v) => {
    const seen = (t: number) => 0.75 * (1 - Math.exp((-8 * v.rate * t) / 3)),
      k = 2 * v.rate * v.t,
      p = seen(v.t);
    return {
      o: { k, p, share: k > 0 ? p / k : 1 },
      metrics: [
        { label: 'Substitutions that occurred, per site', value: k },
        { label: 'Differences actually observed, per site', value: p },
        { label: 'Share of changes still visible', value: (k > 0 ? p / k : 1) * 100, unit: '%' },
      ],
      plot: {
        title: 'Observed differences fall behind true change',
        x: [0, 100, 'Time since divergence (Myr)'],
        y: [0, 1, 'Per-site difference'],
        curves: [
          { f: seen, label: 'observed (p-distance)' },
          { f: (t) => 2 * v.rate * t, label: 'substitutions that occurred', dash: true, tone: 'muted' },
        ],
        hlines: [{ y: 0.75, label: 'ceiling for random sequences' }],
        points: [{ x: v.t, y: p, label: `p = ${p.toFixed(3)}` }],
      },
    };
  },
  missions: [
    goal('At the starting rate, find the divergence time at which about 10% of sites differ.', 'A little longer than a naive 5 Myr, because some sites have changed twice.', { t: 5.5 }, (o, v) => near(v.rate, 0.01, 1e-9) && near(o.p, 0.1, 0.005)),
    goal('Find a divergence at which fewer than 80% of the substitutions are still visible.', 'Go back far enough that multiple hits become common.', { t: 20 }, (o) => o.share < 0.8),
    goal('Push the observed difference above 0.70, close to its ceiling.', 'Use the fastest rate and the longest time.', { rate: 0.05, t: 100 }, (o) => o.p > 0.7),
  ],
  predict: {
    q: 'Two DNA sequences that diverged very long ago show fewer differences than the number of substitutions that occurred. Why?',
    options: [
      'Some sites changed more than once, hiding earlier changes',
      'Old mutations are repaired',
      'Substitution rates always slow down over time',
      'Sequencing cannot read old DNA',
    ],
    correct: 0,
    why: 'A second substitution at a site can overwrite the first or even restore the original base, so raw difference saturates while true change keeps rising.',
  },
  model:
    'Jukes–Cantor model: equal base frequencies and equal rates for all substitutions, giving p = ¾(1 − e^(−4K/3)) with K = 2 × rate × time. Real genomes have rate variation among sites and unequal transition/transversion rates.',
};

const pcr: TopicLab = {
  id: 'gene-pcr',
  title: 'PCR amplification by the numbers',
  lead: 'Every cycle copies each template that is successfully primed. A small loss of efficiency compounds over thirty cycles.',
  controls: [
    slider('n0', 'Starting template copies', 1, 1000, 1, 1, ''),
    slider('cycles', 'Cycles', 0, 40, 1, 10, ''),
    slider('eff', 'Efficiency per cycle', 50, 100, 5, 100, '%'),
  ],
  run: (v) => {
    const copies = (c: number) => v.n0 * (1 + v.eff / 100) ** c;
    return {
      o: { copies: copies(v.cycles), log: Math.log10(copies(v.cycles)) },
      metrics: [
        { label: 'Copies after this many cycles', value: copies(v.cycles) },
        { label: 'Fold amplification', value: copies(v.cycles) / v.n0, unit: '×' },
        { label: 'Growth factor per cycle', value: 1 + v.eff / 100, unit: '×' },
      ],
      plot: {
        title: 'Exponential growth is a straight line on a log scale',
        x: [0, 40, 'Cycle'],
        y: [0, 15, 'log₁₀ (copies)'],
        curves: [
          { f: (c) => Math.log10(copies(c)), label: 'this reaction' },
          { f: (c) => Math.log10(v.n0 * 2 ** c), label: '100% efficient', dash: true, tone: 'muted' },
        ],
        hlines: [{ y: 6, label: 'one million copies' }],
        points: [{ x: v.cycles, y: Math.log10(copies(v.cycles)), label: copies(v.cycles).toExponential(2) }],
      },
    };
  },
  missions: [
    goal('From a single template at 100% efficiency, find the fewest cycles that yield at least a million copies.', '2¹⁰ is about a thousand, so 2²⁰ is about a million.', { cycles: 20 }, (o, v) => v.n0 === 1 && v.eff === 100 && v.cycles === 20),
    goal('Repeat at 90% efficiency: how many cycles are needed now?', 'Each cycle multiplies by 1.9 instead of 2.', { eff: 90, cycles: 22 }, (o, v) => v.n0 === 1 && v.eff === 90 && v.cycles === 22),
    goal('Starting from 10 templates at 100% efficiency, reach ten billion copies in the fewest cycles.', 'You need about a billion-fold amplification: 2³⁰.', { n0: 10, cycles: 30 }, (o, v) => v.n0 === 10 && v.eff === 100 && v.cycles === 30),
  ],
  predict: {
    q: 'After 10 ideal PCR cycles, one template molecule has become about…',
    options: ['1,000 copies', '10 copies', '20 copies', '100 copies'],
    correct: 0,
    why: 'Each ideal cycle doubles the number of copies, so ten cycles give 2¹⁰ = 1,024 — about a thousand.',
  },
  model:
    'Exponential phase only: N = N₀(1 + E)ⁿ. Real reactions plateau as primers and nucleotides run out and the polymerase loses activity, and early cycles produce some over-length products.',
};

const ladder = [500, 1000, 2000, 3000, 4000, 6000];
const bandY = (size: number) => 60 + (80 - 30 * Math.log10(size / 250)) * 3;
const gel: TopicLab = {
  id: 'gene-gel',
  title: 'Restriction digest on a gel',
  lead: 'A 6,000 bp linear DNA is cut at up to two sites, and the fragments are separated by size. Read the lane the way you would read a real gel.',
  controls: [
    slider('cut1', 'First cut site (0 = uncut)', 0, 6000, 500, 0, 'bp'),
    slider('cut2', 'Second cut site (0 = uncut)', 0, 6000, 500, 0, 'bp'),
  ],
  run: (v) => {
    const sites = [...new Set([v.cut1, v.cut2])].filter((s) => s > 0 && s < 6000).sort((a, b) => a - b),
      edges = [0, ...sites, 6000],
      frags = edges.slice(1).map((e, i) => e - edges[i]),
      bands = [...new Set(frags)];
    return {
      o: { frags: frags.length, bands: bands.length, smallest: Math.min(...frags), largest: Math.max(...frags) },
      metrics: [
        { label: 'Fragments produced', value: frags.join(' + ') + ' bp' },
        { label: 'Distinct bands visible', value: bands.length },
        { label: 'Fragment sizes add up to', value: frags.reduce((a, b) => a + b, 0), unit: 'bp' },
      ],
      sceneLabel: `Agarose gel with a size ladder and a digest lane showing bands at ${bands.join(', ')} base pairs`,
      scene: [
        rect(150, 30, 340, 290, 'muted', false, 1, 6),
        text(230, 22, 'ladder', 'middle'),
        text(400, 22, 'digest', 'middle'),
        rect(200, 40, 60, 8, 'ink', false),
        rect(370, 40, 60, 8, 'ink', false),
        ...ladder.flatMap((size) => [
          rect(200, bandY(size), 60, 4, 'cool', true),
          text(190, bandY(size) + 5, `${size}`, 'end', 'muted', 11),
        ]),
        ...bands.map((size) => rect(370, bandY(size), 60, frags.filter((f) => f === size).length > 1 ? 8 : 4, 'slot', true)),
        ...bands.map((size) => text(440, bandY(size) + 5, `${size} bp`, 'start', 'slot', 11)),
        ...arrow(520, 60, 520, 290, 'muted', 1.5),
        text(530, 180, 'migration (−) → (+)', 'start', 'muted', 11),
      ],
    };
  },
  missions: [
    goal('Make a single cut that gives fragments of 2,000 bp and 4,000 bp.', 'One cut makes two fragments whose sizes add to 6,000.', { cut1: 2000 }, (o) => o.frags === 2 && o.smallest === 2000),
    goal('Produce three fragments of 1,000, 2,000, and 3,000 bp.', 'Place the cuts so the gaps between sites are 1,000 and 2,000.', { cut1: 1000, cut2: 3000 }, (o) => o.frags === 3 && o.smallest === 1000 && o.largest === 3000),
    goal('Cut the DNA into two fragments that appear as only one band.', 'Fragments of equal length migrate together.', { cut1: 3000 }, (o) => o.frags === 2 && o.bands === 1),
  ],
  predict: {
    q: 'On an agarose gel, which DNA fragment ends up farthest from the well?',
    options: ['The shortest', 'The longest', 'The one with the most G–C pairs', 'All fragments travel the same distance'],
    correct: 0,
    why: 'DNA has a uniform charge-to-mass ratio, so separation is by sieving: short fragments thread through the gel matrix faster.',
  },
  model:
    'Migration distance is taken as linear in log₁₀(size), a reasonable approximation over this range for linear double-stranded DNA. Co-migrating equal fragments are drawn as one heavier band. Supercoiled or circular DNA would migrate differently.',
};

const rmp: TopicLab = {
  id: 'gene-rmp',
  title: 'Random-match probability and the product rule',
  lead: 'A profile’s rarity comes from multiplying independent loci. See how quickly the number shrinks — and what it does and does not tell a court.',
  controls: [
    slider('loci', 'Loci in the profile', 1, 20, 1, 5, ''),
    slider('freq', 'Genotype frequency at each locus', 0.02, 0.3, 0.01, 0.1, ''),
    slider('pop', 'Population considered (log₁₀)', 3, 10, 0.5, 6, ''),
  ],
  run: (v) => {
    const match = v.freq ** v.loci,
      expected = 10 ** v.pop * match;
    return {
      o: { match, expected, log: Math.log10(match) },
      metrics: [
        { label: 'Random-match probability', value: match.toExponential(2) },
        { label: 'About one person in', value: (1 / match).toExponential(2) },
        { label: 'Unrelated people in this population expected to match by chance', value: expected < 0.01 ? expected.toExponential(1) : Number(expected.toPrecision(3)) },
      ],
      plot: {
        title: 'Each added locus multiplies the rarity',
        x: [1, 20, 'Number of loci'],
        y: [-27, 0, 'log₁₀ (match probability)'],
        curves: [{ f: (n) => n * Math.log10(v.freq) }],
        hlines: [{ y: -v.pop, label: '1 / population' }],
        points: [{ x: v.loci, y: Math.log10(match), label: match.toExponential(1) }],
      },
    };
  },
  missions: [
    goal('With a genotype frequency of 0.10 at every locus, find the fewest loci that bring the match probability down to about one in a billion.', 'Each locus contributes a factor of ten.', { loci: 9 }, (o, v) => near(v.freq, 0.1, 1e-9) && v.loci === 9),
    goal('In a city of one million, find a profile so weak that more than 100 unrelated people would be expected to match.', 'Remove loci until the match probability exceeds 1 in 10,000.', { loci: 3 }, (o, v) => v.pop === 6 && o.expected > 100),
    goal('Using common genotypes (frequency 0.30), reach a match probability below one in a million.', 'Solve 0.3ⁿ < 10⁻⁶.', { freq: 0.3, loci: 12 }, (o, v) => near(v.freq, 0.3, 1e-9) && o.match < 1e-6),
  ],
  predict: {
    q: 'Multiplying genotype frequencies across loci is valid only if the loci are…',
    options: [
      'Inherited independently in the relevant population',
      'All on the same chromosome',
      'All homozygous',
      'Sequenced on the same instrument',
    ],
    correct: 0,
    why: 'The product rule requires independence — unlinked loci in a population without strong substructure. Relatives and subpopulations need corrections.',
  },
  model:
    'Product rule with the same genotype frequency at every locus for simplicity. A random-match probability is the chance that an unrelated person matches; it is not the probability that the suspect is innocent, and it says nothing about relatives, mixtures, or laboratory error.',
};

export const designerGenesExtras: EventExtras = {
  eventId: 'designer-genes',
  labs: [dihybrid, sexLinked, mapping, nondisjunction, codons, lac, selection, clock, pcr, gel, rmp],
  lessons: {
    'gene-u1-l1': {
      labs: ['gene-dihybrid'],
      sort: sort('Which probability rule applies?', ['Multiply (AND)', 'Add (OR)'], [
        ['Offspring is aa AND bb for two unlinked genes', 0],
        ['Offspring is AA OR Aa', 1],
        ['First child affected AND second child affected', 0],
        ['A die shows a 1 OR a 2', 1],
        ['Gamete carries A AND carries B', 0],
        ['Child has blood type A OR blood type O', 1],
      ]),
      checks: [
        check(1, 'A plant heterozygous for a gene (Aa) makes gametes. What fraction carry the a allele?', ['1/2', '1/4', '3/4', 'All of them'], 'Segregation: the two alleles separate into different gametes with equal probability.'),
      ],
    },
    'gene-u2-l1': {
      labs: ['gene-sexlinked'],
      sort: sort('Which inheritance pattern fits the pedigree clue?', ['Autosomal dominant', 'Autosomal recessive', 'X-linked recessive'], [
        ['Every affected person has an affected parent', 0],
        ['Two unaffected parents have an affected daughter', 1],
        ['Affected males far outnumber affected females; no father-to-son transmission', 2],
        ['The trait skips generations and affects both sexes equally', 1],
        ['An affected father and unaffected mother have an affected son and an unaffected daughter', 0],
        ['A carrier mother passes the trait to half of her sons', 2],
      ]),
      checks: [
        check(2, 'A man with an X-linked recessive condition has children with a non-carrier woman. Their sons will be…', ['Unaffected — they receive his Y, not his X', 'All affected', 'Half affected', 'All carriers'], 'A father gives sons a Y chromosome. His X — with the allele — goes to every daughter, who becomes a carrier.'),
      ],
    },
    'gene-u3-l1': {
      labs: ['gene-mapping'],
      sort: sort('Linkage, epistasis, or complementation?', ['Linkage', 'Epistasis', 'Complementation'], [
        ['Parental allele combinations appear more often than 50%', 0],
        ['One gene’s genotype masks the phenotype of another gene', 1],
        ['Two mutants with the same phenotype produce wild-type offspring', 2],
        ['A 9:3:4 ratio in a dihybrid cross', 1],
        ['Recombinant classes are the rarest in a testcross', 0],
        ['Shows the two mutations are in different genes', 2],
      ]),
      checks: [
        check(1, 'A testcross yields 440 and 460 offspring in the parental classes and 48 and 52 in the recombinant classes. The map distance is…', ['10 map units', '5 map units', '50 map units', '90 map units'], 'Recombinants = 100 of 1,000 = 10%. One percent recombination is one map unit.'),
      ],
    },
    'gene-u4-l1': {
      labs: ['gene-nondisjunction'],
      sort: sort('Mitosis, meiosis I, or meiosis II?', ['Mitosis', 'Meiosis I', 'Meiosis II'], [
        ['Homologous chromosomes pair and cross over', 1],
        ['Homologs separate; ploidy is halved', 1],
        ['Sister chromatids separate in a haploid cell', 2],
        ['Produces two genetically identical diploid cells', 0],
        ['Used for growth and tissue repair', 0],
        ['Yields four haploid products in total', 2],
      ]),
      checks: [
        check(0, 'A human cell in G2, after DNA replication, contains…', ['46 chromosomes and 92 chromatids', '92 chromosomes and 92 chromatids', '46 chromosomes and 46 chromatids', '23 chromosomes and 46 chromatids'], 'Chromosomes are counted by centromeres. Replication doubles the chromatids, not the chromosome number.'),
      ],
    },
    'gene-u5-l1': {
      labs: ['gene-codon'],
      phet: [
        phet(
          'gene-expression-essentials',
          'Gene Expression Essentials',
          'Assemble the machinery yourself: transcription factors and RNA polymerase make mRNA; ribosomes turn it into protein; destroyers remove it.',
          'On the Expression screen, drag a positive transcription factor and RNA polymerase to the gene. What is produced, and where does it go next?',
          'Attach a ribosome to the mRNA, then add an mRNA destroyer. How does mRNA lifetime change the amount of protein made?',
          'Compare genes 1, 2, and 3. Which features of a gene differ between them?',
        ),
      ],
      sort: sort('Replication, transcription, or translation?', ['Replication', 'Transcription', 'Translation'], [
        ['DNA polymerase copies both strands', 0],
        ['RNA polymerase reads a template strand', 1],
        ['A ribosome reads codons', 2],
        ['Okazaki fragments are joined by ligase', 0],
        ['tRNA anticodons pair with mRNA', 2],
        ['A promoter is recognised', 1],
      ]),
      checks: [
        check(2, 'The DNA template strand reads 3′-TAC-5′. The mRNA codon made from it is…', ['5′-AUG-3′', '5′-UAC-3′', '5′-ATG-3′', '5′-GUA-3′'], 'mRNA is complementary and antiparallel to the template, with U in place of T: TAC pairs with AUG, the start codon.'),
      ],
    },
    'gene-u6-l1': {
      labs: ['gene-lac'],
      phet: [
        phet(
          'gene-expression-essentials',
          'Gene Expression Essentials',
          'Regulation is about concentrations and binding strengths. Tune them and watch protein output respond.',
          'On the mRNA screen, raise the positive transcription factor’s concentration and then its affinity. Which has the larger effect on mRNA output?',
          'Add a negative transcription factor. What must change for transcription to resume?',
          'On the Multiple Cells screen, vary protein degradation. How does it shift the average protein level across cells?',
        ),
      ],
      sort: sort('Which repair pathway handles the damage?', ['Mismatch repair', 'Nucleotide excision repair', 'Double-strand break repair'], [
        ['A wrong base inserted during replication', 0],
        ['A UV-induced thymine dimer', 1],
        ['Both strands broken by ionising radiation', 2],
        ['A bulky chemical adduct distorting the helix', 1],
        ['A small insertion loop left by polymerase slippage', 0],
        ['A break repaired by homologous recombination', 2],
      ]),
      checks: [
        check(1, 'In the lac operon, the repressor protein binds to the…', ['Operator, blocking RNA polymerase', 'Promoter, recruiting RNA polymerase', 'lacZ coding sequence', 'Ribosome-binding site'], 'The operator overlaps the promoter region; a bound repressor physically prevents transcription until allolactose releases it.'),
      ],
    },
    'gene-u7-l1': {
      labs: ['gene-selection'],
      phet: [
        phet(
          'natural-selection',
          'Natural Selection',
          'Allele frequencies change when genotypes differ in survival. Run a population of rabbits and change what the environment rewards.',
          'On the Intro screen, add a mate and let the population grow. Then introduce the brown-fur mutation and wolves. What happens to each phenotype’s share?',
          'Switch the environment to arctic and repeat. Which allele is favoured now?',
          'On the Lab screen, make the mutation recessive and then dominant. How does dominance change the speed of the response?',
        ),
      ],
      sort: sort('Which Hardy–Weinberg assumption is violated?', ['Selection', 'Genetic drift', 'Gene flow', 'Non-random mating'], [
        ['One genotype survives better than another', 0],
        ['A population founded by five individuals', 1],
        ['Migrants arrive from a population with different allele frequencies', 2],
        ['Individuals mate preferentially with relatives', 3],
        ['Allele frequencies wander randomly in a small herd', 1],
        ['Pesticide kills susceptible insects', 0],
      ]),
      checks: [
        check(2, 'In a population at Hardy–Weinberg equilibrium, 1 person in 10,000 shows a recessive condition. The carrier frequency is about…', ['1 in 50', '1 in 100', '1 in 10,000', '1 in 5,000'], 'q² = 0.0001, so q = 0.01 and 2pq ≈ 2 × 0.99 × 0.01 ≈ 0.02, or 1 in 50.'),
      ],
    },
    'gene-u8-l1': {
      labs: ['gene-clock'],
      sort: sort('Homology or convergence?', ['Homologous (shared ancestry)', 'Analogous (convergent)'], [
        ['Human arm and bat wing bones', 0],
        ['Bird wing and insect wing as flight surfaces', 1],
        ['Globin genes in humans and mice', 0],
        ['Streamlined bodies of sharks and dolphins', 1],
        ['Hox genes in flies and mammals', 0],
        ['Camera eyes of octopuses and vertebrates', 1],
      ]),
      checks: [
        check(1, 'A group consisting of a common ancestor and all of its descendants is called…', ['Monophyletic (a clade)', 'Paraphyletic', 'Polyphyletic', 'An outgroup'], 'A clade can be removed from the tree with a single cut. Paraphyletic groups leave out some descendants.'),
      ],
    },
    'gene-u9-l1': {
      labs: ['gene-pcr', 'gene-gel'],
      sort: sort('Which tool does the job?', ['PCR', 'Restriction enzyme', 'DNA ligase', 'CRISPR–Cas9'], [
        ['Amplify a chosen DNA segment a billion-fold', 0],
        ['Cut DNA at a specific short recognition sequence', 1],
        ['Seal a fragment into a plasmid backbone', 2],
        ['Make a guided double-strand break at a genomic target', 3],
        ['Needs primers and a heat-stable polymerase', 0],
        ['Uses a guide RNA to find its site', 3],
      ]),
      checks: [
        check(1, 'Why does PCR use a heat-stable DNA polymerase?', ['It must survive the repeated ~95 °C denaturation steps', 'It works without primers', 'It can copy RNA directly', 'It cuts DNA at specific sites'], 'Each cycle heats the mixture to separate the strands. An ordinary polymerase would denature and have to be re-added every cycle.'),
      ],
    },
    'gene-u10-l1': {
      labs: ['gene-rmp'],
      sort: sort('Supported by a DNA profile match, or overreach?', ['Supported statement', 'Overreach'], [
        ['The suspect cannot be excluded as a contributor', 0],
        ['The suspect committed the crime', 1],
        ['The profile is expected in about 1 in a billion unrelated people', 0],
        ['There is a 1 in a billion chance the suspect is innocent', 1],
        ['A close relative could share much of this profile', 0],
        ['The DNA was deposited at the time of the crime', 1],
      ]),
      checks: [
        check(1, 'At one STR locus a person is heterozygous for alleles with frequencies 0.1 and 0.2. The expected genotype frequency is…', ['0.04', '0.02', '0.30', '0.01'], 'For a heterozygote under Hardy–Weinberg, 2pq = 2 × 0.1 × 0.2 = 0.04.'),
      ],
    },
  },
};
