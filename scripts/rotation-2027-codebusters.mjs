// Supplied tables make every original puzzle independently solvable. No archived
// quotation or missing image/key is used. Ciphers follow the 2027 C type list.
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  POLY = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
const phrases = [
  'SCIENCE REWARDS CAREFUL OBSERVATION',
  'CHECK EVERY LETTER BEFORE ACCEPTING A SOLUTION',
  'EVIDENCE HELPS A TEAM REVISE ITS MODEL',
  'CLEAR RECORDS MAKE RESULTS REPRODUCIBLE',
];
const spanish = [
  'LA CIENCIA REQUIERE EVIDENCIA',
  'LOS DATOS AYUDAN A PENSAR',
  'LA CLAVE PERMITE LEER EL MENSAJE',
  'UNA PRUEBA NECESITA DATOS CLAROS',
];
const clean = (s) => s.toUpperCase().replace(/[^A-Z]/g, '');
const morse = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
};
const tri = [];
for (const a of '.-x')
  for (const b of '.-x') for (const c of '.-x') if (a + b + c !== 'xxx') tri.push(a + b + c);
const puzzle = (prompt, solution, clause, context, freeErrors = 2) => ({
  prompt,
  answer: solution,
  solution,
  clause,
  context,
  points: 400,
  freeErrors,
});
const fact = (prompt, answer, clause, context = '') => ({
  prompt,
  answer,
  clause,
  context,
  points: 2,
});
const number = (prompt, value, clause) => ({
  ...fact(prompt, String(value), clause),
  numeric: { value, tolerance: 0, units: [''], unitRequired: false },
});

function alphabet(f) {
  // Multiplication by an odd coprime number plus offset is a permutation. Choose
  // a deterministic offset with no fixed points, as required for these ciphers.
  const a = [5, 7, 11, 17][(f - 1) % 4];
  for (let b = f; b < f + 26; b++) {
    const s = [...ABC].map((_, i) => ABC[(a * i + b) % 26]).join('');
    if ([...s].every((c, i) => c !== ABC[i])) return s;
  }
  throw Error('No deranged substitution alphabet');
}
function keyedAlphabet(f) {
  const word = ['SCIENCE', 'OBSERVATION', 'EXPERIMENT', 'LABORATORY'][(f - 1) % 4];
  const base = [...new Set(word + ABC)].join('');
  for (let shift = 0; shift < 26; shift++) {
    const key = base.slice(shift) + base.slice(0, shift);
    if ([...key].every((c, i) => c !== ABC[i])) return key;
  }
  throw Error('No deranged K2 alphabet');
}
function substitute(text, key) {
  return text.replace(/[A-Z]/g, (c) => key[ABC.indexOf(c)]);
}

export function codebustersCases(f) {
  const plain = phrases[(f - 1) % phrases.length],
    key = alphabet(f);
  const table = `Plain alphabet: ${ABC}\nCipher alphabet: ${key}. Each row means plaintext letter -> ciphertext letter. This is a supplied one-to-one monoalphabetic substitution; no letter maps to itself.`;
  const xeno = spanish[(f - 1) % spanish.length],
    k2 = keyedAlphabet(f);
  const baconText = ['READ DATA', 'TEST IDEAS', 'CHECK WORK', 'KEEP NOTES'][(f - 1) % 4];
  const bmap = Object.fromEntries(
    [...ABC].map((c, i) => [
      c,
      i.toString(2).padStart(5, '0').replaceAll('0', 'a').replaceAll('1', 'b'),
    ]),
  );
  const bacon = clean(baconText)
    .split('')
    .map((c) => bmap[c])
    .join(' ');
  const polyText = ['MEASURE', 'SCIENCE', 'RECORD', 'COMPARE'][(f - 1) % 4],
    polyKey = 'DATA';
  const coords = (c) => {
    let i = POLY.indexOf(c === 'J' ? 'I' : c);
    return 10 * (1 + Math.floor(i / 5)) + 1 + (i % 5);
  };
  const nihil = [...polyText]
    .map((c, i) => coords(c) + coords(polyKey[i % polyKey.length]))
    .join(' ');
  const polyTable = Array.from(
    { length: 5 },
    (_, i) =>
      `${i + 1}: ${POLY.slice(i * 5, i * 5 + 5)
        .split('')
        .join(' ')}`,
  ).join('\n');
  const checkerPlain = 'PACK MY BOX WITH FIVE DOZEN QUARTS';
  const row = 'ABCDE',
    col = 'VWXYZ';
  const checker = clean(checkerPlain)
    .split('')
    .map((c) => {
      let i = POLY.indexOf(c);
      return row[Math.floor(i / 5)] + col[i % 5];
    })
    .join(' ');
  const pairs = checker.split(' ');
  if (
    ![...row].every((r) => pairs.some((p) => p[0] === r)) ||
    ![...col].every((c) => pairs.some((p) => p[1] === c))
  )
    throw Error('Missing checkerboard keyword letters');
  const columnPlain = clean(
    [
      'STARLIGHTREVEALSSTELLARHISTORY',
      'STARCOUNTSNEEDCONSISTENTMETHODS',
      'STARFORMATIONSUPPORTSNEWEVIDENCE',
      'STARDATAREQUIRECAREFULANALYSIS',
    ][(f - 1) % 4],
  );
  const pad = columnPlain.padEnd(Math.ceil(columnPlain.length / 4) * 4, 'X'),
    order = [2, 0, 3, 1];
  const column = order
    .map((j) => Array.from({ length: pad.length / 4 }, (_, i) => pad[i * 4 + j]).join(''))
    .join(' ');
  const fmPlain = ['READ THE DATA', 'READ EACH LINE', 'READ EVERY WORD', 'READ YOUR NOTES'][
    (f - 1) % 4
  ];
  let stream = fmPlain
    .split(' ')
    .map((w) => [...w].map((c) => morse[c]).join('x'))
    .join('xx');
  stream = stream.padEnd(Math.ceil(stream.length / 3) * 3, 'x');
  const fm = stream
    .match(/.{3}/g)
    .map((t) => ABC[tri.indexOf(t)])
    .join('');
  const portaPlain = ['COMPARE DATA', 'CHECK RESULTS', 'RECORD EVIDENCE', 'VERIFY ANSWERS'][
      (f - 1) % 4
    ],
    portaKey = 'SCIENCE';
  const portaRows = Array.from({ length: 13 }, (_, r) =>
    [...ABC]
      .map((_, i) => (i < 13 ? ABC[13 + ((i + r) % 13)] : ABC[(i - 13 - r + 13) % 13]))
      .join(''),
  );
  const porta = clean(portaPlain)
    .split('')
    .map(
      (c, i) =>
        portaRows[Math.floor(ABC.indexOf(portaKey[i % portaKey.length]) / 2)][ABC.indexOf(c)],
    )
    .join('');
  return [
    puzzle(
      `Decode the timed-base Aristocrat: ${substitute(plain, key)}`,
      plain,
      '3.e.i, 3.g–h',
      table + ' Timing is practiced separately; this worksheet awards the base score only.',
    ),
    puzzle(
      `Decode the Patristocrat: ${substitute(clean(plain), k2)
        .match(/.{1,5}/g)
        .join(' ')}`,
      plain,
      '3.e.i.2, 3.g',
      `Spaces were removed and groups of five added for display.\nPlain alphabet: ${ABC}\nCipher alphabet (K2, keyed and cyclically shifted): ${k2}`,
    ),
    puzzle(
      `Decode this Spanish Xenocrypt: ${substitute(xeno, k2)}`,
      xeno,
      '3.e.iv, 3.g',
      `Plain alphabet: ${ABC}\nCipher alphabet (K2, keyed and cyclically shifted): ${k2}. Plaintext is Spanish; no accent marks are encoded.`,
    ),
    puzzle(
      `Decode this Baconian message: ${bacon}`,
      baconText,
      '3.e.iii',
      `Use the supplied modern 26-letter mapping:\n${Object.entries(bmap)
        .map(([a, b]) => `${a}=${b}`)
        .join(
          '; ',
        )}. Spaces separate encoded letters; restore word boundaries from meaning. Crib READ/TEST/CHECK/KEEP, as applicable: the plaintext begins with ${baconText.split(' ')[0]}.`,
    ),
    puzzle(
      `Decode this Nihilist message: ${nihil}`,
      polyText,
      '3.e.ix',
      `Use key ${polyKey}, repeated. I/J share a cell. Coordinates are row then column. Encryption adds plaintext coordinate plus key coordinate as ordinary integers.\n${polyTable}`,
    ),
    puzzle(
      `Decode this 5x5 Checkerboard message: ${checker}`,
      checkerPlain,
      '3.e.x',
      `Rows are labeled ${row}; columns ${col}. Read each pair row first. Polybius grid rows in order:\n${polyTable}. All row and column labels occur in the ciphertext.`,
    ),
    puzzle(
      `Solve this complete-columnar transposition: ${column}`,
      pad,
      '3.e.viii',
      `Four columns were filled left-to-right by rows; whole columns were read in an unknown order. Trailing X characters pad the last row. The plaintext begins with crib STAR at its first four positions. Recover the complete plaintext including padding X characters. There are no omitted cells.`,
    ),
    fact(
      'A Homophonic Cipher keyword has four letters. Which property must those letters satisfy under the 2027 C rules?',
      'They must be four unique letters.',
      '3.e.xi',
    ),
    number(
      `A timed Aristocrat is solved correctly in ${120 + f * 30} seconds. Compute the timing bonus using 2(600-t).`,
      2 * (600 - 120 - f * 30),
      '4.f',
    ),
    number(
      'A 400-point plaintext answer has five character errors. Two errors are free and each further error costs 100 points. Find its score.',
      100,
      '4.d',
    ),
    number(
      'A 500-point keyword answer has three character errors. No keyword errors are free and each error costs 100 points. Find its score.',
      200,
      '4.e',
    ),
    fact(
      'A proposed Aristocrat alphabet maps plaintext A to ciphertext A. Why is it invalid under the 2027 C rules?',
      'For Aristocrats, Patristocrats and Xenocrypts, a letter may not decrypt to itself.',
      '3.g',
    ),
    fact(
      'A Fractionated Morse problem supplies a crib but does not identify its ciphertext placement. What information is missing under the 2027 C rules?',
      'The location of the crib must be clearly identified for this cryptanalysis type.',
      '3.j',
    ),
    puzzle(
      `Decode this Fractionated Morse message: ${fm}`,
      fmPlain,
      '3.e.v, 3.j',
      `A Morse letter separator is x and a word separator is xx; trailing x is padding. The plaintext begins with READ at its first four letters. Supplied fractionation table: ${tri.map((t, i) => `${ABC[i]}=${t}`).join('; ')}. Morse letters: ${Object.entries(
        morse,
      )
        .map(([a, b]) => `${a}=${b}`)
        .join('; ')}.`,
    ),
    puzzle(
      `Decode this Porta message: ${porta}`,
      portaPlain,
      '3.e.vii',
      `Given keyword ${portaKey}, repeated over letters only. A=0..Z=25. Each key pair selects a reciprocal substitution row. Upper alphabet for every row is ${ABC}; lower rows: ${portaRows.map((r, i) => `${ABC[i * 2]}${ABC[i * 2 + 1]}=${r}`).join('; ')}.`,
    ),
    fact(
      'How do keyword-answer scoring and plaintext-answer scoring differ in their free-error allowances?',
      'A requested keyword/key phrase or cryptarithm word requires zero errors for full credit; ordinary plaintext permits two free errors unless otherwise stated.',
      '4.d–e',
    ),
    fact(
      'Why must a monoalphabetic substitution use a globally consistent mapping?',
      'Each symbol uses the same replacement across the message; inconsistent local guesses do not define a valid inverse substitution.',
      '3.e.i',
    ),
    number(
      'A timed puzzle is first solved after 650 seconds. What timing bonus remains?',
      0,
      '3.h.v, 4.f',
    ),
    number(
      'Two special-bonus questions are solved with no penalty points. What aggregate special bonus does the 2027 C schedule award?',
      400,
      '4.g',
    ),
    fact(
      'Which permitted monoalphabetic format removes word spaces and displays ciphertext in groups of five?',
      'A Patristocrat.',
      '3.e.i.2',
    ),
  ];
}

export const cipherChecks = { ABC, POLY, alphabet, keyedAlphabet, substitute, morse, tri };
