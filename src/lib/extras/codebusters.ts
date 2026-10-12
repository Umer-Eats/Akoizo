import { check, sort, type EventExtras } from '../lesson-extras.ts';
import {
  choice,
  goal,
  line,
  rect,
  slider,
  text,
  toggle,
  type Shape,
  type TopicLab,
} from '../topic-lab-kit.ts';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const systems: [string, number][] = [
  ['Atbash', 1],
  ['Caesar shift', 25],
  ['Affine', 311],
  ['Columnar transposition with 8 columns', 40320],
  ['Monoalphabetic substitution', 4.03e26],
];
const keyspace: TopicLab = {
  id: 'code-keyspace',
  title: 'Key space and brute force',
  lead: 'One way to break a cipher is to try every key. Whether that is practical depends on how many keys exist and how fast you can test them.',
  controls: [
    choice(
      'cipher',
      'Cipher system',
      systems.map(([name]) => name),
      1,
    ),
    slider('rate', 'Keys tested per second, log₁₀', -1, 12, 0.5, 0, ''),
  ],
  run: (v) => {
    const keys = systems[v.cipher][1],
      seconds = keys / 10 ** v.rate,
      years = seconds / 3.156e7;
    return {
      o: { keys, seconds, years },
      metrics: [
        { label: 'Possible keys', value: keys < 1e6 ? keys : keys.toExponential(2) },
        {
          label: 'Testing speed',
          value:
            v.rate < 0
              ? `one key every ${10 ** -v.rate} s`
              : `${(10 ** v.rate).toLocaleString('en-US')} per second`,
        },
        {
          label: 'Time to try every key',
          value:
            seconds < 120
              ? `${seconds.toPrecision(3)} s`
              : seconds < 7200
                ? `${(seconds / 60).toPrecision(3)} min`
                : years < 1
                  ? `${(seconds / 3600).toPrecision(3)} h`
                  : `${years.toExponential(2)} years`,
        },
        {
          label: 'Practical by exhaustive search?',
          value:
            seconds < 3600
              ? 'Yes'
              : years < 1
                ? 'Slow but possible'
                : 'No — a smarter attack is required',
        },
      ],
      bars: {
        title: 'log₁₀ of the number of keys',
        max: 27,
        items: systems.map(([name, k], i) => ({
          label: name,
          value: Math.log10(k) + 0.02,
          tone: i === v.cipher ? ('slot' as const) : ('accent' as const),
        })),
      },
    };
  },
  missions: [
    goal(
      'Show that a Caesar cipher can be exhausted by hand in under five minutes at one trial every ten seconds.',
      'There are only 25 useful shifts.',
      { rate: -1 },
      (o, v) => v.cipher === 1 && v.rate === -1 && o.seconds < 300,
    ),
    goal(
      'Find a cipher that would take more than ten billion years to exhaust even at a billion keys per second.',
      'One of these has 26 factorial keys.',
      { cipher: 4, rate: 9 },
      (o, v) => v.rate >= 9 && o.years > 1e10,
    ),
    goal(
      'Find how long every affine key takes at one trial per second.',
      'Twelve valid multipliers times twenty-six shifts, less the identity.',
      { cipher: 2 },
      (o, v) => v.cipher === 2 && v.rate === 0,
    ),
  ],
  predict: {
    q: 'A monoalphabetic substitution cipher has about 4 × 10²⁶ keys, yet people solve them by hand. Why?',
    options: [
      'Each letter always becomes the same symbol, so the language’s patterns survive',
      'Most of the keys are identical',
      'Solvers test keys faster than computers',
      'The key is always a common word',
    ],
    correct: 0,
    why: 'A huge key space defeats brute force but not analysis. Letter frequencies, repeated patterns, and short words leak straight through a simple substitution.',
  },
  model:
    'Key counts: Caesar 25 non-trivial shifts; affine 12 × 26 − 1 = 311; monoalphabetic 26! ≈ 4.03 × 10²⁶; a complete columnar transposition with 8 columns 8! = 40,320. Time is the worst case of testing every key; on average half are needed.',
};

const multipliers = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25, 2, 13];
const affine: TopicLab = {
  id: 'code-affine',
  title: 'Affine keys and invertibility',
  lead: 'An affine cipher multiplies each letter’s position and then shifts it. Only some multipliers can be undone — see what goes wrong with the others.',
  controls: [
    choice(
      'a',
      'Multiplier a',
      multipliers.map((m, i) => (i < 12 ? `${m}` : `${m} (shares a factor with 26)`)),
      0,
    ),
    slider('b', 'Shift b', 0, 25, 1, 0, ''),
    slider('x', 'Plaintext letter to trace', 0, 25, 1, 4, ''),
  ],
  run: (v) => {
    const a = multipliers[v.a],
      map = (x: number) => (a * x + v.b) % 26,
      image = Array.from({ length: 26 }, (_, x) => map(x)),
      distinct = new Set(image).size,
      inverse = Array.from({ length: 26 }, (_, i) => i).find((i) => (a * i) % 26 === 1) ?? 0;
    return {
      o: { e: map(v.x), distinct, inverse, m0: map(0), m1: map(1) },
      metrics: [
        { label: 'Encryption rule', value: `E(x) = (${a}x + ${v.b}) mod 26` },
        {
          label: 'Traced letter',
          value: `${letters[v.x]} (position ${v.x}) becomes ${letters[map(v.x)]} (position ${map(v.x)})`,
        },
        { label: 'Different ciphertext letters produced', value: distinct },
        {
          label: 'Decryption',
          value:
            distinct === 26
              ? `D(y) = ${inverse}(y − ${v.b}) mod 26`
              : 'Impossible — several plaintext letters share a ciphertext letter',
        },
      ],
      sceneLabel: `Affine mapping with multiplier ${a} and shift ${v.b}; ${letters[v.x]} maps to ${letters[map(v.x)]}`,
      scene: [
        text(26, 108, 'plain', 'start', 'muted', 11),
        text(26, 178, 'cipher', 'start', 'muted', 11),
        ...image.flatMap((y, x): Shape[] => [
          rect(
            70 + x * 21,
            90,
            19,
            26,
            x === v.x ? 'slot' : 'muted',
            x === v.x,
            x === v.x ? 0.35 : 1,
            3,
          ),
          text(79.5 + x * 21, 108, letters[x], 'middle', 'ink', 12),
          rect(
            70 + x * 21,
            160,
            19,
            26,
            x === v.x ? 'slot' : 'accent',
            x === v.x,
            x === v.x ? 0.35 : 1,
            3,
          ),
          text(79.5 + x * 21, 178, letters[y], 'middle', 'ink', 12),
        ]),
        line(79.5 + v.x * 21, 118, 79.5 + v.x * 21, 158, 'slot', 2),
        text(
          320,
          240,
          distinct === 26
            ? 'Every ciphertext letter appears exactly once: the key is reversible.'
            : `Only ${distinct} different ciphertext letters appear: information is lost.`,
          'middle',
          distinct === 26 ? 'muted' : 'warm',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Find the key that sends A to H and B to M.',
      'A (position 0) reveals b directly; the step from A to B then reveals a.',
      { a: 2, b: 7 },
      (o) => o.m0 === 7 && o.m1 === 12,
    ),
    goal(
      'Build a Caesar shift of 3 as a special case of the affine cipher.',
      'A multiplier of 1 leaves only the shift.',
      { a: 0, b: 3 },
      (o, v) => multipliers[v.a] === 1 && v.b === 3,
    ),
    goal(
      'Choose a multiplier that makes decryption impossible.',
      'Pick one that shares a factor with 26.',
      { a: 13 },
      (o) => o.distinct < 26,
    ),
  ],
  predict: {
    q: 'Which multiplier cannot be used as the key a in an affine cipher on a 26-letter alphabet?',
    options: ['13', '5', '11', '25'],
    correct: 0,
    why: 'A multiplier must be coprime to 26 to have a modular inverse. 13 divides 26, so it maps all even positions to one letter and all odd positions to another.',
  },
  model:
    'E(x) = (ax + b) mod 26 with A = 0 … Z = 25. A modular inverse of a exists only when gcd(a, 26) = 1, leaving twelve usable multipliers. Recovering a key from two known letter pairs is a pair of linear congruences.',
};

const english = [
  8.17, 1.49, 2.78, 4.25, 12.7, 2.23, 2.02, 6.09, 6.97, 0.15, 0.77, 4.03, 2.41, 6.75, 7.51, 1.93,
  0.1, 5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.07,
];
const samples: [string, number][] = [
  ['THE QUICK MEASUREMENT OF EVIDENCE REQUIRES PATIENCE AND A CLEAR RECORD OF EVERY STEP', 7],
  ['SCIENCE OLYMPIAD TEAMS PREPARE ALL SEASON FOR THE STATE TOURNAMENT IN THE SPRING', 19],
  ['FREQUENCY ANALYSIS WORKS BECAUSE SOME LETTERS APPEAR FAR MORE OFTEN THAN OTHERS', 11],
];
const rotate = (message: string, shift: number) =>
  message.replace(/[A-Z]/g, (ch) => letters[(letters.indexOf(ch) + shift + 26) % 26]);
const ciphertexts = samples.map(([plain, shift]) => rotate(plain, shift));
function chiSquared(message: string) {
  const only = message.replace(/[^A-Z]/g, ''),
    counts = Array<number>(26).fill(0);
  for (const ch of only) counts[letters.indexOf(ch)]++;
  return counts.reduce(
    (sum, n, i) =>
      sum + (n - (only.length * english[i]) / 100) ** 2 / ((only.length * english[i]) / 100),
    0,
  );
}
const frequency: TopicLab = {
  id: 'code-frequency',
  title: 'Cracking a shift with letter frequencies',
  lead: 'Try a shift and compare the resulting letter counts with ordinary English. The right key is the one that makes the statistics look like language.',
  controls: [
    choice('sample', 'Intercepted message', ['Message 1', 'Message 2', 'Message 3'], 0),
    slider('shift', 'Trial shift to undo', 0, 25, 1, 0, ''),
  ],
  run: (v) => {
    const cipher = ciphertexts[v.sample],
      attempt = rotate(cipher, -v.shift),
      chi = (s: number) => Math.log10(chiSquared(rotate(cipher, -Math.round(s)))),
      counts = [...letters]
        .map((ch) => [ch, [...cipher].filter((c) => c === ch).length] as const)
        .sort((a, b) => b[1] - a[1]);
    return {
      o: { chi: chiSquared(attempt), solved: v.shift === samples[v.sample][1] ? 1 : 0 },
      metrics: [
        { label: 'Ciphertext', value: cipher.slice(0, 44) + '…' },
        { label: 'With this shift undone', value: attempt.slice(0, 44) + '…' },
        {
          label: 'Most frequent ciphertext letters',
          value: counts
            .slice(0, 3)
            .map(([ch, n]) => `${ch} (${n})`)
            .join(', '),
        },
        { label: 'Chi-squared against English', value: Number(chiSquared(attempt).toFixed(1)) },
      ],
      plot: {
        title: 'Misfit to English for every possible shift',
        x: [0, 25, 'Shift undone'],
        y: [1, 4, 'log₁₀ (chi-squared)'],
        curves: [{ f: chi }],
        points: [{ x: v.shift, y: Math.log10(chiSquared(attempt)), label: `shift ${v.shift}` }],
      },
    };
  },
  missions: [
    goal(
      'Recover the plaintext of Message 1.',
      'Its most frequent letter probably stands for E. How far is that letter from E?',
      { sample: 0, shift: 7 },
      (o, v) => v.sample === 0 && o.solved === 1,
    ),
    goal(
      'Recover the plaintext of Message 2.',
      'Look for the shift with by far the lowest chi-squared.',
      { sample: 1, shift: 19 },
      (o, v) => v.sample === 1 && o.solved === 1,
    ),
    goal(
      'Recover the plaintext of Message 3.',
      'When the statistic bottoms out, the text should read as English.',
      { sample: 2, shift: 11 },
      (o, v) => v.sample === 2 && o.solved === 1,
    ),
  ],
  predict: {
    q: 'In a long English message enciphered with a single shift, the most frequent ciphertext letter most likely stands for…',
    options: ['E', 'Z', 'Q', 'It cannot be guessed'],
    correct: 0,
    why: 'A shift moves every letter by the same amount, so the frequency profile is preserved, just displaced. E is the most common letter in English text.',
  },
  model:
    'Chi-squared goodness of fit between a trial decryption’s letter counts and typical English frequencies. Short messages can mislead — the lowest value is a strong hint, not proof — so always read the result. Monoalphabetic substitutions need pattern work as well as counts.',
};

const squareLetters = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
const keywords = ['', 'SCIENCE', 'OLYMPIAD'];
const squareFor = (keyword: string) =>
  [...new Set((keyword + squareLetters).replace(/J/g, 'I'))].join('');
const polybius: TopicLab = {
  id: 'code-polybius',
  title: 'Polybius coordinates and Nihilist sums',
  lead: 'A 5 × 5 square turns each letter into a row–column number. The Nihilist cipher then adds the coordinates of a key letter to those of each plaintext letter.',
  controls: [
    choice('sq', 'Square', ['Standard alphabet', 'Keyword SCIENCE', 'Keyword OLYMPIAD'], 0),
    slider('p', 'Plaintext letter (position in A–Z without J)', 0, 24, 1, 7, ''),
    slider('k', 'Key letter (position in A–Z without J)', 0, 24, 1, 10, ''),
  ],
  run: (v) => {
    const square = squareFor(keywords[v.sq]),
      coord = (ch: string) => {
        const i = square.indexOf(ch);
        return (Math.floor(i / 5) + 1) * 10 + (i % 5) + 1;
      },
      plain = squareLetters[v.p],
      key = squareLetters[v.k],
      cp = coord(plain),
      ck = coord(key);
    return {
      o: { cp, ck, sum: cp + ck },
      metrics: [
        {
          label: 'Plaintext letter',
          value: `${plain}: row ${Math.floor(cp / 10)}, column ${cp % 10} → ${cp}`,
        },
        {
          label: 'Key letter',
          value: `${key}: row ${Math.floor(ck / 10)}, column ${ck % 10} → ${ck}`,
        },
        { label: 'Nihilist ciphertext number', value: cp + ck },
        { label: 'To decrypt', value: `${cp + ck} − ${ck} = ${cp} → ${plain}` },
      ],
      sceneLabel: `Polybius square with ${plain} at ${cp} and key letter ${key} at ${ck}`,
      scene: [
        ...[1, 2, 3, 4, 5].flatMap((n) => [
          text(232 + n * 46, 48, `${n}`, 'middle', 'muted'),
          text(232, 48 + n * 46, `${n}`, 'middle', 'muted'),
        ]),
        ...[...square].flatMap((ch, i): Shape[] => {
          const x = 255 + (i % 5) * 46,
            y = 62 + Math.floor(i / 5) * 46,
            isPlain = ch === plain,
            isKey = ch === key;
          return [
            rect(
              x,
              y,
              42,
              42,
              isPlain ? 'slot' : isKey ? 'gold' : 'muted',
              isPlain || isKey,
              isPlain || isKey ? 0.4 : 1,
              4,
            ),
            text(x + 21, y + 27, ch === 'I' ? 'I/J' : ch, 'middle', 'ink', 15),
          ];
        }),
        text(60, 120, 'purple: plaintext', 'start', 'slot', 12),
        text(60, 144, 'gold: key letter', 'start', 'gold', 12),
        text(60, 190, 'Read the row first,', 'start', 'muted', 12),
        text(60, 208, 'then the column.', 'start', 'muted', 12),
      ],
    };
  },
  missions: [
    goal(
      'In the standard square, find the plaintext and key letters that give the smallest possible sum.',
      'Both must be the letter at row 1, column 1.',
      { p: 0, k: 0 },
      (o, v) => v.sq === 0 && o.sum === 22,
    ),
    goal(
      'In the standard square, find the pair that gives the largest possible sum, 110.',
      'Both must be the letter at row 5, column 5.',
      { p: 24, k: 24 },
      (o, v) => v.sq === 0 && o.sum === 110,
    ),
    goal(
      'In the standard square, encipher T with the key letter E and read the Nihilist number.',
      'T is at 44 and E is at 15.',
      { p: 18, k: 4 },
      (o, v) => v.sq === 0 && v.p === 18 && v.k === 4,
    ),
    goal(
      'Switch to the SCIENCE square and find the new coordinate of plaintext A.',
      'The keyword’s letters fill the square first, pushing A into the second row.',
      { sq: 1, p: 0 },
      (o, v) => v.sq === 1 && v.p === 0 && o.cp === 21,
    ),
  ],
  predict: {
    q: 'A Nihilist ciphertext contains the number 110. What does that tell you?',
    options: [
      'Both the plaintext and key letters are at row 5, column 5',
      'The message contains an error',
      'The plaintext letter is A',
      'Nothing; any pair of letters could give 110',
    ],
    correct: 0,
    why: 'Each coordinate is at most 55, so 110 can only be 55 + 55. Extreme sums like 22 and 110 give away both letters at once — a standard way in.',
  },
  model:
    'A 5 × 5 Polybius square with I and J sharing a cell and rows and columns numbered 1–5. Keyed squares list the keyword’s distinct letters first, then the rest of the alphabet. Nihilist encryption adds plaintext and key coordinates as ordinary integers.',
};

const bits = ['b1', 'b2', 'b3', 'b4', 'b5'];
const baconian: TopicLab = {
  id: 'code-baconian',
  title: 'Baconian five-symbol groups',
  lead: 'The Baconian cipher is binary in disguise: each letter is five symbols drawn from two types. Set each position and read the letter.',
  controls: bits.map((key, i) => toggle(key, `Symbol ${i + 1} is B (place value ${16 >> i})`)),
  run: (v) => {
    const value = bits.reduce((n, key, i) => n + v[key] * (16 >> i), 0),
      group = bits.map((key) => (v[key] ? 'B' : 'A')).join('');
    return {
      o: { value },
      metrics: [
        { label: 'Group', value: group },
        { label: 'As a binary number', value: `${bits.map((key) => v[key]).join('')} = ${value}` },
        {
          label: 'Letter (26-letter convention)',
          value: value < 26 ? letters[value] : 'Unused — no letter has this value',
        },
      ],
      sceneLabel: `Baconian group ${group} with value ${value}`,
      scene: [
        ...bits.flatMap((key, i): Shape[] => [
          rect(130 + i * 80, 90, 64, 80, v[key] ? 'slot' : 'muted', !!v[key], v[key] ? 0.35 : 1, 8),
          text(162 + i * 80, 142, v[key] ? 'B' : 'A', 'middle', 'ink', 30),
          text(162 + i * 80, 196, `${16 >> i}`, 'middle', 'muted'),
        ]),
        text(320, 60, 'Each B adds its place value; each A adds nothing', 'middle', 'muted'),
        text(
          320,
          262,
          value < 26 ? `${group} → ${value} → ${letters[value]}` : `${group} → ${value} → (unused)`,
          'middle',
          'slot',
          20,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Set the group that encodes the letter S.',
      'S is position 18 counting from A = 0: 16 + 2.',
      { b1: 1, b4: 1 },
      (o) => o.value === 18,
    ),
    goal(
      'Set the group that encodes the letter Z.',
      'Z is position 25: 16 + 8 + 1.',
      { b1: 1, b2: 1, b5: 1 },
      (o) => o.value === 25,
    ),
    goal(
      'Find a five-symbol group that no letter uses.',
      'There are 32 possible groups but only 26 letters.',
      { b1: 1, b2: 1, b4: 1 },
      (o) => o.value >= 26,
    ),
  ],
  predict: {
    q: 'How many different five-symbol groups can be made from two symbol types?',
    options: ['32', '10', '25', '26'],
    correct: 0,
    why: 'Each of the five positions has two choices: 2⁵ = 32. Six groups are left over in the 26-letter convention.',
  },
  model:
    'Modern 26-letter Baconian convention: A = AAAAA (0) through Z = BBAAB (25), read as a five-bit binary number. The older 24-letter version merges I/J and U/V. In a test the two “symbols” may be disguised as fonts, cases, or any two categories.',
};

const marks = ['·', '–', '×'];
const triples: TopicLab = {
  id: 'code-triples',
  title: 'Fractionated Morse triples',
  lead: 'Fractionated Morse cuts the dot–dash–separator stream into groups of three. Each of the 26 usable triples is then replaced by one letter of a keyed alphabet.',
  controls: ['a', 'b', 'c'].map((key, i) =>
    choice(key, `Symbol ${i + 1}`, ['· dot', '– dash', '× separator'], [1, 0, 2][i]),
  ),
  run: (v) => {
    const index = 9 * v.a + 3 * v.b + v.c,
      triple = [v.a, v.b, v.c].map((n) => marks[n]).join(' ');
    return {
      o: { index },
      metrics: [
        { label: 'Triple', value: triple },
        {
          label: 'Position in the table',
          value: index === 26 ? 'None — this triple is never used' : index,
        },
        {
          label: 'With an unkeyed alphabet it is written as',
          value: index < 26 ? letters[index] : '—',
        },
      ],
      sceneLabel: `Fractionated Morse table position ${index} for the triple ${triple}`,
      scene: [
        text(
          320,
          34,
          'Table order: dot before dash before separator, like counting in base 3',
          'middle',
          'muted',
        ),
        ...Array.from({ length: 27 }, (_, i): Shape[] => {
          const x = 58 + (i % 9) * 60,
            y = 60 + Math.floor(i / 9) * 76,
            on = i === index;
          return [
            rect(x, y, 54, 60, on ? 'slot' : i === 26 ? 'warm' : 'muted', on, on ? 0.35 : 1, 6),
            text(
              x + 27,
              y + 24,
              [Math.floor(i / 9), Math.floor(i / 3) % 3, i % 3].map((n) => marks[n]).join(''),
              'middle',
              'ink',
              15,
            ),
            text(
              x + 27,
              y + 48,
              i < 26 ? letters[i] : 'unused',
              'middle',
              i === 26 ? 'warm' : 'muted',
              11,
            ),
          ];
        }).flat(),
        text(
          320,
          316,
          'Letters shown are for an unkeyed alphabet; a keyword reorders them',
          'middle',
          'muted',
          11,
        ),
      ],
    };
  },
  missions: [
    goal(
      'Find the triple that sits first in the table.',
      'Three of the symbol that sorts first.',
      { a: 0, b: 0, c: 0 },
      (o) => o.index === 0,
    ),
    goal(
      'Find the triple at position 13, the middle of the table.',
      '13 = 9 + 3 + 1: one step in every place.',
      { a: 1, b: 1, c: 1 },
      (o) => o.index === 13,
    ),
    goal(
      'Find the last usable triple, at position 25.',
      'Two separators followed by a dash.',
      { a: 2, b: 2, c: 1 },
      (o) => o.index === 25,
    ),
    goal(
      'Find the one triple that never occurs.',
      'Letters are separated by one ×, words by two.',
      { a: 2, b: 2, c: 2 },
      (o) => o.index === 26,
    ),
  ],
  predict: {
    q: 'Why is the triple × × × left out of the fractionated Morse table?',
    options: [
      'The stream never contains three separators in a row',
      'It would make the table too large to memorise',
      'It stands for the letter J',
      'It is reserved for numbers',
    ],
    correct: 0,
    why: 'One × ends a letter and two end a word; nothing produces three. That leaves 27 − 1 = 26 triples — exactly one per alphabet letter.',
  },
  model:
    'Triples are ordered with dot < dash < separator, so a triple’s position is 9·first + 3·second + third. The plaintext is written in Morse with × between letters and ×× between words, padded with × to a multiple of three, and each triple is replaced using a keyed alphabet.',
};

const cryptarithm: TopicLab = {
  id: 'code-cryptarithm',
  title: 'Cryptarithm column logic: TO + GO = OUT',
  lead: 'Each letter is a different digit. Treat every column as an equation with a carry, and the puzzle collapses long before you would finish guessing.',
  controls: [
    slider('t', 'T', 0, 9, 1, 3, ''),
    slider('o', 'O', 0, 9, 1, 4, ''),
    slider('g', 'G', 0, 9, 1, 5, ''),
    slider('u', 'U', 0, 9, 1, 6, ''),
  ],
  run: (v) => {
    const first = 10 * v.t + v.o,
      second = 10 * v.g + v.o,
      target = 100 * v.o + 10 * v.u + v.t,
      distinct = new Set([v.t, v.o, v.g, v.u]).size === 4,
      leading = v.t !== 0 && v.g !== 0 && v.o !== 0,
      units = (2 * v.o) % 10 === v.t,
      carry = Math.floor((2 * v.o) / 10),
      tens = (v.t + v.g + carry) % 10 === v.u,
      hundreds = Math.floor((v.t + v.g + carry) / 10) === v.o,
      valid = distinct && leading && first + second === target ? 1 : 0;
    const mark = (ok: boolean) => (ok ? 'holds' : 'fails');
    return {
      o: { valid, sum: first + second, target },
      metrics: [
        {
          label: 'Arithmetic',
          value: `${first} + ${second} = ${first + second}; OUT reads ${target}`,
        },
        { label: 'Units column: O + O ends in T', value: mark(units) },
        { label: 'Tens column: T + G + carry ends in U', value: mark(tens) },
        { label: 'Hundreds column: the final carry equals O', value: mark(hundreds) },
        { label: 'All letters different, no leading zero', value: mark(distinct && leading) },
        { label: 'Solution', value: valid ? 'Complete and valid' : 'Not yet' },
      ],
      sceneLabel: `Column addition ${first} plus ${second} compared with ${target}`,
      scene: [
        text(380, 90, `${v.t}  ${v.o}`, 'end', 'ink', 34),
        text(250, 140, '+', 'middle', 'ink', 34),
        text(380, 140, `${v.g}  ${v.o}`, 'end', 'ink', 34),
        line(230, 158, 392, 158, 'ink', 3),
        text(380, 206, `${v.o}  ${v.u}  ${v.t}`, 'end', valid ? 'green' : 'slot', 34),
        text(430, 90, 'T O', 'start', 'muted', 16),
        text(430, 140, 'G O', 'start', 'muted', 16),
        text(430, 206, 'O U T', 'start', 'muted', 16),
        text(
          320,
          270,
          valid ? 'Every column and every rule is satisfied.' : `Actual sum: ${first + second}`,
          'middle',
          valid ? 'green' : 'muted',
        ),
      ],
    };
  },
  missions: [
    goal(
      'Fix the hundreds column first: give O the only value it can have.',
      'Two two-digit numbers add to less than 200, so the leading digit of the sum is forced.',
      { o: 1 },
      (o, v) => v.o === 1,
    ),
    goal(
      'With O settled, make the units column work.',
      'O + O must end in T.',
      { o: 1, t: 2 },
      (o, v) => v.o === 1 && v.t === 2,
    ),
    goal(
      'Finish the puzzle: find digits that satisfy every column.',
      'T + G must produce a carry of 1 and leave U; all four digits must differ.',
      { t: 2, o: 1, g: 8, u: 0 },
      (o) => o.valid === 1,
    ),
  ],
  predict: {
    q: 'In TO + GO = OUT, why must O be 1?',
    options: [
      'The sum of two two-digit numbers is below 200, so its hundreds digit can only be 1',
      'O is always 1 in cryptarithms',
      'Because T + G is even',
      'Because O appears three times',
    ],
    correct: 0,
    why: 'The largest possible sum is 99 + 99 = 198, and a leading digit cannot be zero. Carries into a new column are the strongest clue in addition cryptarithms.',
  },
  model:
    'Base-ten column addition with carries; letters stand for distinct digits and no number starts with zero. This puzzle has a single solution. Larger cryptarithms are solved the same way: fix forced carries first, then propagate constraints.',
};

const kinds: [string, number, number, number, number][] = [
  ['Quick ciphers (Caesar, Atbash, Baconian)', 150, 3, 0.95, 6],
  ['Aristocrats and patristocrats', 300, 7, 0.8, 8],
  ['Hard items (cryptarithm, xenocrypt)', 500, 14, 0.5, 4],
];
const triage: TopicLab = {
  id: 'code-triage',
  title: 'Triage: where do the points come from?',
  lead: 'Fifty minutes, more questions than you can finish. Decide how many of each kind to attempt and compare expected points with time spent.',
  controls: [
    slider('quick', 'Quick ciphers attempted', 0, 6, 1, 2, ''),
    slider('medium', 'Aristocrat-type ciphers attempted', 0, 8, 1, 2, ''),
    slider('hard', 'Hard items attempted', 0, 4, 1, 2, ''),
  ],
  run: (v) => {
    const counts = [v.quick, v.medium, v.hard],
      time = counts.reduce((sum, n, i) => sum + n * kinds[i][2], 0),
      raw = counts.map((n, i) => n * kinds[i][1] * kinds[i][3]),
      scale = time > 50 ? 50 / time : 1,
      score = raw.reduce((a, b) => a + b, 0) * scale;
    return {
      o: { time, score },
      metrics: [
        { label: 'Time committed', value: time, unit: 'min' },
        {
          label: 'Status',
          value:
            time > 50
              ? `Over by ${time - 50} min — some work will be left unfinished`
              : `${50 - time} min in reserve`,
        },
        { label: 'Expected points', value: Math.round(score) },
        {
          label: 'Expected points per minute by type',
          value: kinds.map((k) => ((k[1] * k[3]) / k[2]).toFixed(0)).join(' / '),
        },
      ],
      bars: {
        title: 'Expected points from each type',
        max: 2000,
        items: kinds.map(([name], i) => ({
          label: `${name} × ${counts[i]}`,
          value: raw[i] * scale,
          tone: 'accent' as const,
        })),
      },
    };
  },
  missions: [
    goal(
      'Build a plan worth more than 1,800 expected points that fits in 50 minutes.',
      'Rank the question types by expected points per minute and fill time in that order.',
      { quick: 6, medium: 4, hard: 0 },
      (o) => o.time <= 50 && o.score > 1800,
    ),
    goal(
      'Show a hard-first plan: at least three hard items, within 50 minutes, scoring under 1,200.',
      'High point values do not help if they take long and often fail.',
      { quick: 2, medium: 0, hard: 3 },
      (o, v) => v.hard >= 3 && o.time <= 50 && o.score < 1200,
    ),
    goal(
      'Show an overcommitted plan that needs more than 50 minutes.',
      'Attempt everything and watch the reserve go negative.',
      { quick: 6, medium: 8, hard: 4 },
      (o) => o.time > 50,
    ),
  ],
  predict: {
    q: 'Which question should usually be attempted first in a timed cipher event?',
    options: [
      'The one with the best expected points per minute — after the timed question',
      'The one worth the most points',
      'The first one printed',
      'The one that looks most unusual',
    ],
    correct: 0,
    why: 'Points are earned per unit of time, and only if the solution is right. Quick, reliable solves bank points and leave the uncertain ones for remaining time.',
  },
  model:
    'A teaching model with illustrative point values, solving times, and success probabilities for three question types; an over-long plan is scaled down in proportion. Real tests vary — replace these numbers with your own practice data to plan a strategy.',
};

export const codebustersExtras: EventExtras = {
  eventId: 'codebusters',
  labs: [keyspace, affine, frequency, polybius, baconian, triples, cryptarithm, triage],
  lessons: {
    'code-u1-l1': {
      labs: ['code-keyspace'],
      sort: sort(
        'Substitution or transposition?',
        ['Substitution (letters are replaced)', 'Transposition (letters are rearranged)'],
        [
          ['Caesar cipher', 0],
          ['Complete columnar cipher', 1],
          ['Aristocrat', 0],
          ['Letter frequencies stay exactly as in plain English', 1],
          ['Atbash', 0],
          ['Rail-fence cipher', 1],
        ],
      ),
      checks: [
        check(
          3,
          'You have a plausible crib for one word of a cipher. What is the disciplined next step?',
          [
            'Test whether the letters it implies are consistent elsewhere in the message',
            'Fill in the whole message from intuition',
            'Erase all earlier work',
            'Assume it is correct and move on',
          ],
          'A guess becomes evidence only when it survives a check that could have failed — repeated letters and other words are those checks.',
        ),
      ],
    },
    'code-u2-l1': {
      labs: ['code-affine'],
      sort: sort(
        'Which simple cipher fits the rule?',
        ['Atbash', 'Caesar', 'Affine'],
        [
          ['A ↔ Z, B ↔ Y, C ↔ X', 0],
          ['Every letter moves forward by the same amount', 1],
          ['E(x) = (ax + b) mod 26 with a ≠ 1', 2],
          ['Encrypting twice returns the plaintext', 0],
          ['Has 25 non-trivial keys', 1],
          ['Needs a multiplier coprime to 26', 2],
        ],
      ),
      checks: [
        check(
          0,
          'What is 17 + 12 reduced modulo 26?',
          ['3', '29', '5', '−3'],
          '17 + 12 = 29, and 29 − 26 = 3. In letters, R (17) shifted by 12 wraps around to D (3).',
        ),
      ],
    },
    'code-u3-l1': {
      labs: ['code-frequency'],
      sort: sort(
        'Which word could fit the pattern?',
        ['Pattern 1-2-2-1 (ABBA)', 'Pattern 1-2-3-1 (ABCA)', 'Pattern 1-1-2 (AAB)'],
        [
          ['NOON', 0],
          ['THAT', 1],
          ['EEL', 2],
          ['DEED', 0],
          ['HIGH', 1],
          ['OOH', 2],
        ],
      ),
      checks: [
        check(
          2,
          'In an aristocrat, a one-letter ciphertext word most likely stands for…',
          ['A or I', 'E or T', 'Q or Z', 'Any letter equally'],
          'English has only two common one-letter words. Word boundaries are preserved in aristocrats, which makes short words the best starting points.',
        ),
      ],
    },
    'code-u4-l1': {
      labs: ['code-polybius'],
      sort: sort(
        'Which system is being described?',
        ['Porta', 'Nihilist', 'Complete columnar'],
        [
          ['A keyword letter selects one of 13 reciprocal alphabets', 0],
          ['Polybius coordinates of plaintext and key are added', 1],
          ['Plaintext is written in rows and read off by columns', 2],
          ['Ciphertext is a string of two- or three-digit numbers', 1],
          ['Letter frequencies match ordinary English exactly', 2],
          ['The same operation encrypts and decrypts', 0],
        ],
      ),
      checks: [
        check(
          2,
          'In a Nihilist cipher using a standard square, a ciphertext number of 22 means…',
          [
            'Both the plaintext and the key letter are A',
            'The plaintext letter is V',
            'The key letter is Z',
            'An arithmetic mistake was made',
          ],
          'The smallest coordinate is 11, so 22 can only be 11 + 11. Extreme values pin down plaintext and key together.',
        ),
      ],
    },
    'code-u5-l1': {
      labs: ['code-baconian', 'code-triples'],
      sort: sort(
        'Baconian or fractionated Morse?',
        ['Baconian', 'Fractionated Morse'],
        [
          ['Five two-valued symbols per letter', 0],
          ['Dots, dashes, and separators grouped in threes', 1],
          ['The two symbol types may be hidden as fonts or cases', 0],
          ['Uses a keyed alphabet of 26 triples', 1],
          ['Ciphertext is five times as long as the plaintext', 0],
          ['One ciphertext letter can span parts of two plaintext letters', 1],
        ],
      ),
      checks: [
        check(
          1,
          'The Baconian group ABBAA stands for which letter (A = AAAAA)?',
          ['M', 'L', 'N', 'G'],
          'Read it as binary 01100 = 8 + 4 = 12, and position 12 counting from A = 0 is M.',
        ),
      ],
    },
    'code-u6-l1': {
      labs: ['code-cryptarithm'],
      sort: sort(
        'English or Spanish clue?',
        ['Typical of English text', 'Typical of Spanish text'],
        [
          ['E, T, A are the most frequent letters', 0],
          ['E, A, O are the most frequent letters', 1],
          ['The one-letter words are A and I', 0],
          ['The one-letter words are A, Y, and O', 1],
          ['Common word THE', 0],
          ['Common words DE, LA, QUE', 1],
        ],
      ),
      checks: [
        check(
          2,
          'In a cryptarithm, what is the largest carry that can pass from one column to the next when two numbers are added?',
          ['1', '2', '9', '10'],
          'Two digits plus an incoming carry total at most 9 + 9 + 1 = 19, so the outgoing carry is never more than 1.',
        ),
      ],
    },
    'code-u7-l1': {
      labs: ['code-triage'],
      sort: sort(
        'Productive habit, or time sink?',
        ['Productive', 'Time sink'],
        [
          ['Reading every question’s type and point value first', 0],
          ['Staying on one stuck aristocrat for fifteen minutes', 1],
          ['Having a teammate verify a decrypted answer', 0],
          ['Rewriting a neat frequency table for a Caesar cipher', 1],
          ['Starting the timed question immediately', 0],
          ['Three teammates working the same question', 1],
        ],
      ),
      checks: [
        check(
          1,
          'After two minutes with no progress on a cipher, the best move is usually to…',
          [
            'Mark it, switch to another question, and return later',
            'Keep going until it is solved',
            'Erase everything and restart it',
            'Guess the answer',
          ],
          'Switching has a cost, but sunk time has a larger one. A fresh look later often reveals the pattern that was missed.',
        ),
      ],
    },
  },
};
