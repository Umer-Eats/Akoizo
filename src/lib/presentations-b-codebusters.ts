import { defineDeck, type Deck } from './presentation-types.ts';
import { decks as divisionCDecks } from './presentations-codebusters.ts';

// Codebusters (Division B) presentations. Lessons code-u1-l1, -u3, -u5, -u6 and -u7 are identical
// in Divisions B and C (same ids and sections), so their Division C decks are reused. The B-only
// lessons get their own decks below; every cipher answer on them was checked by script and by hand.

const shared = ['code-u1-l1', 'code-u3-l1', 'code-u5-l1', 'code-u6-l1', 'code-u7-l1'];

const shifts = defineDeck('code-u2-l1-b', [
  {
    kind: 'title',
    title: 'Atbash and Caesar shifts',
    subtitle: 'Two fixed substitutions: a mirror alphabet and a sliding one.',
    objectives: [
      'Number the alphabet for shift arithmetic.',
      'Decode a Caesar cipher.',
      'Decode an Atbash cipher.',
      'Identify the cipher family before solving.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: have you ever made or solved a secret code?',
    options: ['Yes, made one', 'Yes, solved one', 'Both', 'Not yet'],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Number the alphabet',
    bullets: [
      'Use **A = 0 through Z = 25** for shift arithmetic.',
      '==Wrap around after Z==: 25 + 1 goes back to 0.',
      'Encryption and decryption move in **opposite directions**.',
      'Write down which direction the problem asks for.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'Using A = 0 through Z = 25, what number is the letter T?',
    answer: 19,
    tolerance: 0,
    explanation: 'Counting from A = 0: A0 B1 C2 … S18 T19. So T = 19.',
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'Y is 24. Shift it forward by 5, wrapping after 25. What number do you get?',
    answer: 3,
    tolerance: 0,
    explanation: '24 + 5 = 29. Subtract 26 to wrap around: 29 − 26 = 3, which is D.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Caesar decoding',
    image: 'code-caesar',
    caption:
      'Every letter slides by the **same amount**. Here the shift is three to the left, so E becomes B.',
    bullets: [
      'If encryption shifts forward 3, then ==D decodes to A and A decodes to X==.',
      'Try likely shifts, then verify a **whole phrase**, not one word.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: decode FDW',
    problem: 'Caesar cipher, forward encryption shift 3. Ciphertext: FDW.',
    steps: [
      'Decode by shifting **backward three** places.',
      'F → C, D → A, W → T.',
      'Check: re-encrypt CAT forward 3 to get FDW.',
    ],
    conclusion: 'The plaintext is ==CAT==.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt: 'The ciphertext KHOOR was made with a forward shift of 3. What is the plaintext?',
    options: ['HELLO', 'NKRRU', 'HOLLE', 'JELLY'],
    answer: 0,
    explanation: 'Shift each letter back 3: K → H, H → E, O → L, O → L, R → O, giving HELLO.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Encode with a forward shift of 5.',
    text: 'CODE encodes to {0}, and Z encodes to {1}.',
    blanks: ['HTIJ', 'E'],
    distractors: ['XJYZ', 'D'],
    explanation: 'C2→H7, O14→T19, D3→I8, E4→J9 gives HTIJ. Z25 + 5 = 30, which wraps to 4: E.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Atbash decoding',
    bullets: [
      'Atbash **reverses the alphabet**: A ↔ Z, B ↔ Y, C ↔ X.',
      'In numbers, letter n becomes **25 − n**.',
      '==The same table encrypts and decrypts.==',
      'There is no unknown key to find. Just check every letter carefully.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: Atbash',
    problem: 'Decode the Atbash ciphertext DRMW.',
    steps: [
      'D is 3 → 25 − 3 = **22** → W.',
      'R is 17 → **8** → I; M is 12 → **13** → N.',
      'W is 22 → 3 → D.',
    ],
    conclusion: 'DRMW decodes to ==WIND==. Encoding WIND gives DRMW again.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'What is HELLO in Atbash?',
    options: ['SVOOL', 'KHOOR', 'URYYB', 'SVLLO'],
    answer: 0,
    explanation: 'H → S, E → V, L → O, L → O, O → L, giving SVOOL.',
  },
  {
    kind: 'match',
    section: 2,
    prompt: 'Match each letter to its Atbash partner.',
    pairs: [
      ['A', 'Z'],
      ['B', 'Y'],
      ['G', 'T'],
      ['M', 'N'],
    ],
    explanation: 'Each letter n pairs with 25 − n: A0↔Z25, B1↔Y24, G6↔T19, M12↔N13.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Check the B cipher list',
    columns: ['Cipher', 'Key to find?', 'How to solve'],
    rows: [
      ['**Caesar**', 'A shift from 1 to 25', 'Try shifts; verify a whole phrase'],
      ['**Atbash**', '==None==', 'Apply the mirror table'],
      ['Affine', 'Not on the B Regional list', 'Not covered in this lesson'],
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'How many different useful Caesar shifts are there (not counting a shift of 0)?',
    answer: 25,
    tolerance: 0,
    unit: 'shifts',
    explanation:
      'Shifts 1 through 25 each give a different alphabet. A shift of 26 is the same as 0, which changes nothing.',
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Which cipher made each ciphertext?',
    bins: ['Caesar shift', 'Atbash'],
    items: [
      ['HELLO became KHOOR', 0],
      ['HELLO became SVOOL', 1],
      ['WIND became DRMW', 1],
      ['CAT became FDW', 0],
    ],
    explanation:
      'KHOOR and FDW are each letter moved forward 3. SVOOL and DRMW are each letter n replaced by 25 − n.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Caesar cipher', back: 'Every letter shifted by the same amount.' },
      { front: 'Atbash', back: 'The alphabet reversed: A↔Z, B↔Y.' },
      { front: 'Plaintext', back: 'The original, readable message.' },
      { front: 'Ciphertext', back: 'The encoded message.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Number letters **A = 0 to Z = 25** and wrap around.',
      'Caesar: decode by shifting the ==opposite way==; check a whole phrase.',
      'Atbash: n becomes **25 − n**; the same table works both ways.',
      'Name the cipher family before choosing a method.',
    ],
  },
]);

const tables = defineDeck('code-u4-l1-b', [
  {
    kind: 'title',
    title: 'Porta, Nihilist, and checkerboard tables',
    subtitle: 'Ciphers that use a table and a key: look things up carefully, then check.',
    objectives: [
      'Decode a Porta cipher with a supplied key.',
      'Decode a Nihilist cipher by subtracting key numbers.',
      'Read a checkerboard by row and column labels.',
      'Use a crib to verify a key.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Porta',
    bullets: [
      'Repeat the **keyword** under the text.',
      'Each key letter picks a **row** of paired alphabets in the supplied Porta table.',
      'Find the cipher letter in that row and read its partner.',
      '==Porta is reciprocal==: the same step encodes and decodes.',
    ],
    callout:
      'In the A/B row, the first half of the alphabet pairs straight across with the second half: A↔N, B↔O, … M↔Z.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: Porta row A/B',
    problem: 'Encode CAT with the key B, using the A/B row of the Porta table.',
    steps: [
      'In the A/B row, A↔N, B↔O, C↔P, … G↔T.',
      'C → **P**, A → **N**, T → **G**.',
      'Decode PNG with the same key: P → C, N → A, G → T.',
    ],
    conclusion: 'CAT ↔ ==PNG==. The same row works in both directions.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Use the Porta A/B row (A↔N, B↔O, … M↔Z).',
    text: 'With key A, the plaintext HI encodes to {0}, and the ciphertext U decodes to {1}.',
    blanks: ['UV', 'H'],
    distractors: ['VW', 'G'],
    explanation:
      'H is the 8th letter, so it pairs with the 8th letter of N–Z, which is U. I pairs with V. Because Porta is reciprocal, U decodes back to H.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Nihilist: the Polybius square',
    image: 'code-polybius',
    caption:
      'The ancient Polybius square puts letters in a 5 × 5 grid so each letter has a **row-column number**.',
    bullets: [
      'Build a keyed square: unique keyword letters, then unused letters; ==I and J share a cell==.',
      'Each letter gets a coordinate like **11** (row 1, column 1) or **34**.',
      'Nihilist **adds** the plaintext coordinate and the repeating key coordinate as whole numbers.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: Nihilist',
    problem:
      'Ciphertext number: 65. Key coordinate: 23. In the square, row 4, column 2 contains R.',
    steps: [
      'Subtract **whole numbers**: 65 − 23 = **42**.',
      'Read 42 as row 4, column 2.',
      'That cell holds R. Check: 42 + 23 = 65.',
    ],
    conclusion: 'The letter is ==R==. Never subtract the digits separately.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'Plain square (row 1: ABCDE, row 2: FGHIK, row 3: LMNOP, row 4: QRSTU, row 5: VWXYZ). Nihilist ciphertext 57 with key coordinate 23. What coordinate is the plaintext letter?',
    answer: 34,
    tolerance: 0,
    explanation: '57 − 23 = 34, which is row 3, column 4: the letter O.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Using the same plain square, the ciphertext is 46 and the key coordinate is 11. Which letter was sent?',
    options: ['P', 'O', 'U', 'S'],
    answer: 0,
    explanation: '46 − 11 = 35: row 3, column 5. Row 3 is L M N O P, so the letter is P.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'Build the square from the keyword SCIENCE: S C I E N / A B D F G / H K L M O / P Q R T U / V W X Y Z. What is the coordinate of T?',
    options: ['44', '42', '34', '54'],
    answer: 0,
    explanation: 'T is in row 4 (P Q R T U), column 4, so its coordinate is 44.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Checkerboard',
    bullets: [
      'A 5 × 5 square with a **row keyword** and a **column keyword** as labels.',
      'Read each ciphertext pair as ==row label, then column label==.',
      'Look up the letter in that cell of the supplied square.',
      'A label is not an alphabet shift.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: checkerboard',
    problem:
      'Rows are labeled B L A C K and columns W H I T E, over the plain square. Decode LH AT.',
    steps: [
      'LH: L is **row 2**, H is **column 2** → row 2 is F G H I K → **G**.',
      'AT: A is **row 3**, T is **column 4** → row 3 is L M N O P → **O**.',
    ],
    conclusion: 'LH AT decodes to ==GO==.',
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'Same checkerboard (rows B L A C K, columns W H I T E, plain square). What does the pair CI decode to?',
    options: ['S', 'N', 'H', 'R'],
    answer: 0,
    explanation: 'C is row 4 (Q R S T U) and I is column 3, so the letter is S.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Verify with a crib',
    bullets: [
      'A **crib** is a piece of plaintext you already know.',
      'Decode several positions, then ==re-encode to check== the key or alignment.',
      'B Regional questions usually **give the key**; some State and National questions give a crib instead.',
      'Practice under the conditions your tournament uses.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each cipher to how you decode one symbol.',
    pairs: [
      ['Porta', 'Look up the partner letter in the key’s row'],
      ['Nihilist', 'Subtract the key number, then read the square'],
      ['Checkerboard', 'Read a row label and a column label'],
      ['Atbash', 'Replace letter n with 25 − n'],
    ],
    explanation:
      'Each table cipher has its own lookup. Naming the family first tells you which lookup to use.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Polybius square', back: 'A 5 × 5 letter grid read by row and column.' },
      { front: 'Crib', back: 'Known plaintext used to test a key.' },
      { front: 'Repeating key', back: 'A key reused letter by letter along the message.' },
      { front: 'Reciprocal', back: 'The same operation both encodes and decodes.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      '**Porta**: the key letter picks a row; the same lookup encodes and decodes.',
      '**Nihilist**: ==subtract whole key numbers==, then read row and column.',
      '**Checkerboard**: row label, then column label.',
      'Use a **crib** or re-encoding to verify.',
    ],
  },
]);

const transposition = defineDeck('code-u8-l1-b', [
  {
    kind: 'title',
    title: 'Columnar transposition and homophonic evidence',
    subtitle:
      'Rebuild a rectangle of letters, and handle ciphers where one letter has many symbols.',
    objectives: [
      'Tell rearrangement from substitution.',
      'Rebuild a complete columnar rectangle.',
      'Explain homophonic substitution.',
      'Use consistent evidence and a crib.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Rearrangement versus substitution',
    image: 'code-skytale',
    caption:
      'The ancient skytale wraps a strip around a rod: the letters stay the same, but their ==order is scrambled==.',
    bullets: [
      'A **transposition** rearranges plaintext letters without replacing them.',
      'In **complete columnar** transposition, text fills a rectangle and columns are read in a keyed order.',
      'Letter counts are preserved. B problems use **nine columns or fewer** and give a crib.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A ciphertext has exactly the same letter counts as normal English, with E and T most common. What does that suggest?',
    options: ['A transposition', 'An Atbash cipher', 'A Caesar cipher', 'A homophonic cipher'],
    answer: 0,
    explanation:
      'Transposition only moves letters, so the letter counts look like ordinary English. Substitutions change which letters are common.',
  },
  {
    kind: 'flow',
    section: 1,
    title: 'Rebuild the rectangle',
    steps: [
      { label: 'Height', detail: 'Column height = **message length ÷ number of columns**.' },
      { label: 'Split', detail: 'Cut the ciphertext into column-sized pieces.' },
      { label: 'Arrange', detail: 'Try orders and ==read across the rows==.' },
      { label: 'Check', detail: 'Look for the crib, then recheck the whole message.' },
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: two columns',
    problem:
      'Six letters in two columns. Ciphertext pieces: CTO and ATO. The plaintext starts with CAT.',
    steps: [
      'Each column holds 6 ÷ 2 = **3 letters**.',
      'Put CTO on the left and ATO on the right; read the rows: **CA, TT, OO**.',
      'Join the rows: CATTOO, which agrees with the crib.',
    ],
    conclusion: 'The plaintext is ==CATTOO==.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt: 'A complete columnar ciphertext has 12 letters and 3 columns. How tall is each column?',
    answer: 4,
    tolerance: 0,
    unit: 'letters',
    explanation: 'Column height = 12 ÷ 3 = 4 letters.',
  },
  {
    kind: 'mcq',
    section: 1,
    prompt:
      'A 12-letter message in 3 columns splits into TCTW, TKDN, and AAAA. The crib is ATTACK. Which piece is the leftmost column?',
    options: ['AAAA', 'TCTW', 'TKDN', 'It cannot be told'],
    answer: 0,
    explanation:
      'Order AAAA, TCTW, TKDN and read across: ATT, ACK, ATD, AWN → ATTACKATDAWN, which starts with the crib.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Rebuild GOODLUCK from two columns.',
    text: 'Eight letters in two columns gives columns {0} letters tall. The left column is GOLC and the right column is {1}.',
    blanks: ['4', 'ODUK'],
    distractors: ['2', 'OUDK'],
    explanation:
      'Rows GO, OD, LU, CK spell GOODLUCK. Reading down, the left column is GOLC and the right is ODUK.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Homophonic substitution',
    bullets: [
      'A **homophonic** cipher lets ==several symbols stand for the same letter==.',
      'Spreading a common letter like E across many symbols **weakens frequency guesses**.',
      'Keep a symbol-to-letter table and use the crib and keyword clues.',
      'B rules use a **four-unique-letter keyword**; follow the table supplied with the puzzle.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Why might a puzzle writer give the letter E several different symbols?',
    options: [
      'To hide how common E is, so frequency counts help less',
      'To make the message shorter',
      'Because E is a vowel',
      'To turn it into a transposition',
    ],
    answer: 0,
    explanation:
      'Splitting a common letter among several symbols flattens the frequency counts, which makes simple frequency guesses weaker.',
  },
  {
    kind: 'compare',
    section: 3,
    title: 'Use consistent evidence',
    columns: ['Observation', 'Monoalphabetic', 'Homophonic'],
    rows: [
      ['Two symbols decode to E', '**Contradiction**', '==Allowed=='],
      ['One symbol decodes to two letters', 'Contradiction', '**Contradiction**'],
      ['Word patterns', 'Kept exactly', 'Repeats can be hidden'],
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'In a homophonic cipher, is each finding allowed or a contradiction?',
    bins: ['Allowed', 'Contradiction'],
    items: [
      ['Symbols 14 and 62 both decode to E', 0],
      ['Symbol 14 decodes to E in one place and to S in another', 1],
      ['Three symbols all decode to T', 0],
      ['Your answer does not match the given crib', 1],
    ],
    explanation:
      'Many symbols may share one letter, but each symbol must always mean the same letter, and the answer must match the crib.',
  },
  {
    kind: 'cards',
    title: 'Key terms — tap to flip',
    cards: [
      { front: 'Transposition', back: 'Rearranging letters without changing them.' },
      { front: 'Column height', back: 'Rows in a complete transposition rectangle.' },
      { front: 'Homophone', back: 'Another symbol for the same plaintext letter.' },
      { front: 'Crib', back: 'Known plaintext used to check a solution.' },
    ],
  },
  {
    kind: 'summary',
    title: 'Summary',
    points: [
      'Transposition **moves** letters, so letter counts look like normal English.',
      'Column height = length ÷ columns; ==read across the rows== to test an order.',
      'Homophonic ciphers give one letter **several symbols**.',
      'Each symbol must stay consistent, and the answer must fit the crib.',
    ],
  },
]);

export const decks: Deck[] = [
  ...divisionCDecks.filter((deck) => shared.includes(deck.lessonId)),
  shifts,
  tables,
  transposition,
];
