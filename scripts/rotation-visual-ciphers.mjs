import {
  table,
  svg,
  label,
  box,
  written as w,
  figureBuilder,
} from './practice-figure-primitives.mjs';
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  POLY = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
const clean = (s) => s.replaceAll(' ', '');
const cipher = (prompt, solution) => ({
  ...w(prompt, solution, '3.e', 200),
  solution,
  freeErrors: 2,
});
export function visualCiphers(test, f) {
  if (test.eventId !== 'codebusters') return null;
  const b = figureBuilder(test),
    add = b.add,
    offset = (f - 1) * 3;
  const grid = POLY.slice(offset) + POLY.slice(0, offset),
    coords = (c) => {
      const i = grid.indexOf(c === 'J' ? 'I' : c);
      return (1 + Math.floor(i / 5)) * 10 + 1 + (i % 5);
    };
  const words = [
    ['CAREFUL', 'SCIENCE', 'RECORDS'],
    ['EVIDENCE', 'MEASURE', 'CONTROL'],
    ['PATTERNS', 'RESULTS', 'COMPARE'],
    ['OBSERVE', 'METHODS', 'EXAMINE'],
  ][(f - 1) % 4];
  const checkerWords = [
    'VERIFY EACH MODEL WITH STRONG EVIDENCE',
    'CHECK EVERY SYMBOL AND RECORD RESULTS',
    'COMPARE THE OBSERVED DATA WITH PREDICTIONS',
  ];
  const check = checkerWords.map((word) =>
    clean(word)
      .split('')
      .map((c) => {
        let i = grid.indexOf(c);
        return 'ABCDE'[Math.floor(i / 5)] + 'VWXYZ'[i % 5];
      })
      .join(' '),
  );
  function gridArt(title, rows, cols, messages) {
    let body = '';
    const cw = 46,
      ch = 42;
    for (let y = 0; y < 6; y++)
      for (let x = 0; x < 6; x++) {
        body += box(25 + x * cw, 65 + y * ch, cw, ch, x === 0 || y === 0 ? '#e5eff3' : 'white');
        const s =
          y === 0 ? (x ? cols[x - 1] : '') : x === 0 ? rows[y - 1] : grid[(y - 1) * 5 + x - 1];
        body += label(40 + x * cw, 94 + y * ch, s, 17);
      }
    messages.forEach((m, i) => {
      const segments = m.match(/.{1,38}(?:\s|$)|.{1,38}/g) ?? [m];
      body += label(325, 85 + i * 95, `Message ${i + 1}`, 17);
      segments.slice(0, 3).forEach((s, j) => (body += label(325, 110 + i * 95 + j * 20, s, 12)));
    });
    return svg(title, body);
  }
  add(
    'Checkerboard coordinate grid',
    gridArt('Given row/column labels and full Polybius key', 'ABCDE', 'VWXYZ', check),
    `Gridrows${Array.from({ length: 5 }, (_, i) => grid.slice(i * 5, i * 5 + 5)).join('/')}.RowlabelsABCDE,columnVWXYZ,readrowthen column,I/Jsharecell.Messages1:${check[0]};2:${check[1]};3:${check[2]}.`,
    checkerWords.map((word, i) =>
      cipher(
        `Decode Message ${i + 1} using the row-first pairs and the pictured grid. I/J share a cell.`,
        word,
      ),
    ),
  );
  const key = 'DATA',
    nih = words.map((word) => [...word].map((c, i) => coords(c) + coords(key[i % 4])).join(' '));
  add(
    'Nihilist cipher station',
    gridArt('Nihilist: key DATA repeats; add row-column coordinates', '12345', '12345', nih),
    `Gridrows${Array.from({ length: 5 }, (_, i) => grid.slice(i * 5, i * 5 + 5)).join('/')}.Coordinates rowthen column.I/Jsharecell.KeyDATArepeats.Encryption addsplaintextcoordinatepluskeycoordinate asintegers.Messages1:${nih[0]};2:${nih[1]};3:${nih[2]}.`,
    words.map((word, i) =>
      cipher(
        `Decode Nihilist Message ${i + 1}. Use the pictured grid and the given repeating key DATA; subtract its coordinate values as integers.`,
        word,
      ),
    ),
  );
  const portaKey = ['SCIENCE', 'CONTROL', 'OBSERVE', 'RECORDS'][(f - 1) % 4];
  const rows = Array.from({ length: 13 }, (_, r) =>
    [...ABC]
      .map((_, i) => (i < 13 ? ABC[13 + ((i + r) % 13)] : ABC[(i - 13 - r + 13) % 13]))
      .join(''),
  );
  const plain = ['COMPARE EVIDENCE', 'RECORD THE PATTERN', 'CHECK EVERY RESULT'];
  const enc = plain.map((word) =>
    [...clean(word)]
      .map(
        (c, i) => rows[Math.floor(ABC.indexOf(portaKey[i % portaKey.length]) / 2)][ABC.indexOf(c)],
      )
      .join(''),
  );
  let porta = label(25, 62, `Upper alphabet: ${ABC}; key ${portaKey}`, 15);
  rows.forEach(
    (row, i) => (porta += label(25, 85 + i * 20, `${ABC.slice(2 * i, 2 * i + 2)}: ${row}`, 14)),
  );
  enc.forEach((c, i) => (porta += label(390, 135 + i * 75, `M${i + 1}: ${c}`, 13)));
  add(
    'Porta reciprocal alphabet chart',
    svg('Given-key Porta; repeat keyword over letters only', porta),
    `Upperalphabet${ABC}.Keyword${portaKey}.Reciprocallowerrows:${rows.map((r, i) => ABC.slice(2 * i, 2 * i + 2) + ':' + r).join(';')}.Messages:${enc.join(';')}.`,
    plain.map((word, i) =>
      cipher(
        `Decode M${i + 1} with the pictured Porta chart. Use the keyword printed above the chart, repeated across letters only.`,
        word,
      ),
    ),
  );
  const baconWords = ['READ DATA', 'TEST IDEAS', 'KEEP NOTES'],
    bacon = (c) =>
      ABC.indexOf(c).toString(2).padStart(5, '0').replaceAll('0', 'a').replaceAll('1', 'b');
  const bac = baconWords.map((word) => [...clean(word)].map(bacon).join(' '));
  let art = '';
  [...ABC].forEach(
    (c, i) =>
      (art += label(25 + Math.floor(i / 13) * 175, 75 + (i % 13) * 22, `${c} = ${bacon(c)}`, 15)),
  );
  bac.forEach((message, i) => {
    art += label(380, 80 + i * 100, `Message ${i + 1}`, 16);
    const chunks = message.split(' ');
    for (let j = 0; j < chunks.length; j += 4)
      art += label(
        380,
        105 + i * 100 + Math.floor(j / 4) * 22,
        chunks.slice(j, j + 4).join(' '),
        13,
      );
  });
  add(
    'Baconian symbol chart',
    svg('Modern26-letter mapping; groups encode individual letters', art),
    `ModernmappingA00000throughZ11001,0=a,1=b.Messages:${bac.join(';')}.Spaces separatecipherletters,wordboundaries omitted. Firstwordcribs respectivelyREAD,TEST,KEEP atplaintextstart.`,
    baconWords.map((word, i) =>
      cipher(
        `Decode Message ${i + 1} with the pictured Baconian chart. Cipher groups encode letters. The plaintext starts with ${word.split(' ')[0]}; restore word spaces.`,
        word,
      ),
    ),
  );
  return b;
}
