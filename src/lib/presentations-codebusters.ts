import { defineDeck, type Deck } from './presentation-types.ts';
import { codebustersDecksLayers } from './presentations-codebusters-2.ts';

// Codebusters (Division C) presentations. Each deck follows its lesson in the Codebusters course
// section by section (`section` is the lesson section index). Worked examples and activities
// actually encode and decode, with every answer checked by re-encryption.

const foundations = defineDeck('code-u1-l1', [
  {
    kind: 'title',
    title: 'Cryptography foundations and the solving workflow',
    subtitle:
      'Separate the **algorithm** from the **key**, gather evidence before guessing, and ==verify by re-encrypting==.',
    image: 'code-zimmermann',
    objectives: [
      'Separate a cipher **algorithm** from its **key**.',
      'Recognize **substitution** versus **transposition**.',
      'Verify a proposed solution by **re-encryption**.',
    ],
  },
  {
    kind: 'poll',
    prompt: 'Warm-up: when you think you have decoded a message, how do you usually check it?',
    options: [
      'It reads like English',
      'I re-encode it and compare',
      'A teammate reads it',
      'I do not check',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Messages, algorithms, and keys',
    image: 'code-caesar',
    bullets: [
      '**Plaintext** is the intended message; **ciphertext** is the transformed one.',
      'An **algorithm** describes a family of transformations; ==the key selects one of them==.',
      'Keep **A = 0 through Z = 25** consistent throughout a calculation.',
      'Spaces, punctuation, and case may be kept or removed; that changes the clues, not the letter rule.',
    ],
    callout:
      'In a **Caesar cipher** the algorithm shifts letters around a circular alphabet, and the **key** is the size of the shift.',
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: Caesar +3',
    problem: 'With A = 0 and a Caesar key of **+3**, CAT encodes to FDW. Decode FDW and verify.',
    steps: [
      'CAT is 2, 0, 19. Add 3 modulo 26: 5, 3, 22, which is **FDW**.',
      'Decode FDW by subtracting 3 modulo 26: **2, 0, 19**, which is CAT.',
      'Re-encrypt CAT and compare **all three symbols** with FDW.',
    ],
    conclusion: 'Decoding is the ==inverse== of encoding with the same key.',
  },
  {
    kind: 'fill',
    section: 0,
    prompt: 'Decode this Caesar +3 ciphertext, letter by letter: KHOOR.',
    text: 'K → {0}, H → {1}, O → {2}, R → {3}, so KHOOR decodes to HELLO.',
    blanks: ['H', 'E', 'L', 'O'],
    distractors: ['N', 'K', 'R', 'B'],
    explanation:
      'Subtract 3 from each letter: K→H, H→E, O→L, R→O. Re-encrypting **HELLO** gives KHOOR.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Transposition: same letters, new places',
    image: 'code-skytale',
    caption:
      'A scytale is a **transposition**: unwinding the strip rearranges letter positions without changing any letter.',
    bullets: [
      '**Substitution** replaces symbols but keeps their order.',
      '**Transposition** rearranges positions but keeps the letter inventory.',
      '**Monoalphabetic** = one replacement throughout; **polyalphabetic** = replacements change by position.',
      'Count letters first: ==a transposition keeps letter frequencies exactly==; a substitution keeps equality patterns.',
    ],
  },
  {
    kind: 'sort',
    section: 1,
    prompt: 'Substitution or transposition?',
    bins: ['Substitution', 'Transposition'],
    items: [
      ['Caesar shift of 5', 0],
      ['Writing the message in rows and reading columns', 1],
      ['Atbash (A↔Z, B↔Y, …)', 0],
      ['A scytale strip', 1],
      ['Ciphertext with exactly the plaintext’s letter counts', 1],
      ['Repeated words keep their repeat pattern under new letters', 0],
    ],
    explanation:
      'Substitutions change letter identities; transpositions only move letters, so **frequencies are preserved**.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'What makes a key valid',
    bullets: [
      'Decoding must ==undo encoding on the stated alphabet==.',
      'A substitution table must map **distinct** plaintext letters to **distinct** ciphertext letters.',
      'Two plaintext letters sharing one ciphertext letter create an ambiguity no inverse can resolve.',
      'Write **both directions**: P → Q means plaintext P encodes to Q, and decoding Q returns P.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'A proposed table maps plaintext E → K and plaintext T → K. What is wrong?',
    options: [
      'Nothing; tables may repeat outputs',
      'It is not one-to-one, so a K in ciphertext cannot be decoded uniquely',
      'E and T must map to vowels',
      'K may only appear once in a ciphertext',
    ],
    answer: 1,
    explanation:
      'An ordinary substitution must be **one-to-one**; otherwise the inverse is ambiguous.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Evidence before guesses',
    bullets: [
      'Separate **observations** (a three-letter word occurs four times) from **hypotheses** (it is THE).',
      '==Test a hypothesized mapping across every occurrence== before filling the rest of the page.',
      'A candidate that creates a **contradiction** must be revised, even if one sentence sounds right.',
      'Keep **tentative** and **confirmed** mappings visibly separate.',
    ],
  },
  {
    kind: 'sort',
    section: 3,
    prompt: 'Observation or hypothesis?',
    bins: ['Observation', 'Hypothesis'],
    items: [
      ['The word QXV appears four times', 0],
      ['QXV probably means THE', 1],
      ['Ciphertext letter M is the most frequent', 0],
      ['M stands for E', 1],
    ],
    explanation:
      'Observations are counts and patterns you can see; hypotheses are mappings to **test everywhere**.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Verification as an independent operation',
    steps: [
      { label: 'Readable', detail: 'A readable answer is ==necessary but not sufficient==.' },
      { label: 'Re-encrypt', detail: 'Encode each recovered letter with the stated key.' },
      {
        label: 'Compare',
        detail: 'Match against the original ciphertext, including **every repeated symbol**.',
      },
      {
        label: 'Locate',
        detail: 'If a position fails: arithmetic, **key direction**, or transcription error?',
      },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order a verification check.',
    items: [
      'Recover a readable plaintext',
      'Re-encrypt it with the stated key',
      'Compare every symbol with the original ciphertext',
      'Find the cause of any mismatched position',
    ],
    explanation:
      'Re-encryption is an **independent check** that a teammate can run without your guesses.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Building a practice system',
    bullets: [
      'Practice **recognition, transformation, and verification** as separate skills first.',
      'Keep an **error log**: cipher family, failed assumption, corrected rule, small counterexample.',
      'Encode a known message, hide the key, and have a partner recover it: ==the original message checks the answer==.',
      'Event permissions and scoring come from the **tournament rules**, not this syllabus.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'With A = 0, what number is the letter T?',
    answer: 19,
    tolerance: 0,
    explanation: 'A = 0, so T, the 20th letter, is **19**.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'The **key** selects one transformation from the algorithm’s family.',
      'Substitution changes identities; **transposition** changes positions.',
      'A valid substitution is **one-to-one**; write both directions.',
      '==Verify by re-encrypting every symbol.==',
    ],
  },
]);

const affine = defineDeck('code-u2-l1', [
  {
    kind: 'title',
    title: 'Atbash, Caesar, and affine transformations',
    subtitle: 'Three ciphers built from **modular arithmetic** on A = 0 … Z = 25.',
    image: 'code-confederate-disk',
    objectives: [
      'Compute **modulo 26** with wraparound.',
      'Encode and decode **Atbash, Caesar, and affine** ciphers.',
      'Find **modular inverses** and diagnose calculation mistakes.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Working modulo 26',
    bullets: [
      'Letters are integers **0 through 25**.',
      'Modulo 26 replaces a number by its remainder: ==28 ≡ 2 and −1 ≡ 25==.',
      'Modular addition makes a **circular alphabet**, not a line that ends at Z.',
      'Write the index convention first: an **A = 1** convention changes the formulas.',
    ],
  },
  {
    kind: 'numeric',
    section: 0,
    prompt: 'What is −5 modulo 26?',
    answer: 21,
    tolerance: 0,
    explanation: '−5 + 26 = **21**, so −5 wraps around to V.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Atbash as a reflection',
    bullets: [
      'Atbash reverses the alphabet: **A ↔ Z, B ↔ Y**, and so on.',
      'With zero-based indices: **y = 25 − x**.',
      'Applying it twice gives 25 − (25 − x) = x, so ==the same rule encodes and decodes==.',
      'Atbash is also the affine cipher with **a = 25, b = 25**.',
    ],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Encode WIZARD with Atbash.',
    text: 'W → {0}, I → {1}, Z → {2}, A → {3}, R → {4}, D → {5}',
    blanks: ['D', 'R', 'A', 'Z', 'I', 'W'],
    distractors: ['C', 'Q', 'B'],
    explanation:
      'Each letter x becomes 25 − x: WIZARD → **DRAZIW**, a neat check that Atbash is its own inverse.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Caesar as a rotation',
    bullets: [
      'Encode **y = x + b mod 26**; decode **x = y − b mod 26**.',
      'There are **26 shifts**, including the unchanged alphabet.',
      'With no key, a short **shift table** reveals candidates, but ==test a readable fragment across the whole text==.',
      'If different positions need different shifts, it is **not** a single Caesar key.',
    ],
  },
  {
    kind: 'numeric',
    section: 2,
    prompt: 'A Caesar cipher maps plaintext E to ciphertext R. What is the shift b (0–25)?',
    answer: 13,
    tolerance: 0,
    explanation: 'R − E = 17 − 4 = **13** (ROT13).',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Affine encoding and invertibility',
    bullets: [
      'Encode **y = ax + b mod 26**.',
      'The multiplier a must be ==coprime to 26==: gcd(a, 26) = 1.',
      'Allowed a: **1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25**. The offset b can be anything.',
      'a = 2 fails because 2 × 0 and 2 × 13 both give 0: **two inputs collide**.',
    ],
  },
  {
    kind: 'multi',
    section: 3,
    prompt: 'Which multipliers give a valid affine cipher mod 26?',
    options: ['3', '13', '11', '4', '25', '2'],
    answers: [0, 2, 4],
    explanation:
      '3, 11, and 25 are coprime to 26; even numbers and 13 share a factor with 26, so inputs collide.',
  },
  {
    kind: 'example',
    section: 4,
    title: 'Worked example: affine a = 5, b = 8',
    problem: 'Encode **CAT** with a = 5, b = 8; then decode using the inverse.',
    steps: [
      'C = 2: 5 × 2 + 8 = 18 → **S**. A = 0: 8 → **I**. T = 19: 103 mod 26 = 25 → **Z**.',
      'The inverse of 5 is **21**, because 5 × 21 = 105 and 105 mod 26 = 1.',
      'For Z: 21 × (25 − 8) = 357; 357 mod 26 = 19 → **T**. Repeat for S and I.',
    ],
    conclusion: 'Decode with **x = a⁻¹(y − b) mod 26**: subtract the offset first, then multiply.',
  },
  {
    kind: 'numeric',
    section: 4,
    prompt: 'What is the modular inverse of 7 mod 26 (the number n with 7n mod 26 = 1)?',
    answer: 15,
    tolerance: 0,
    explanation: '7 × 15 = 105 = 4 × 26 + 1, so the inverse is **15**.',
  },
  {
    kind: 'fill',
    section: 4,
    prompt: 'Decode the affine ciphertext XAM with a = 5, b = 8 (inverse 21).',
    text: 'X → {0}, A → {1}, M → {2}',
    blanks: ['D', 'O', 'G'],
    distractors: ['C', 'T', 'B'],
    explanation:
      'X: 21 × (23 − 8) = 315 ≡ 3 → D. A: 21 × (0 − 8) = −168 ≡ 14 → O. M: 21 × (12 − 8) = 84 ≡ 6 → G. Re-encrypting **DOG** gives XAM.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Diagnosing calculation mistakes',
    bullets: [
      'Check **endpoints, a repeated letter, and a wraparound** example.',
      'All outputs off by a constant? Suspect an ==offset or indexing mistake==.',
      'Different inputs collapsing to one output? Suspect an **invalid multiplier**.',
      'Encoding works but decoding fails? Check the **inverse** and that you **subtract b before multiplying**.',
    ],
  },
  {
    kind: 'match',
    section: 5,
    prompt: 'Match each symptom to its most likely cause.',
    pairs: [
      ['Every letter is off by the same amount', 'Offset or indexing error'],
      ['Two plaintext letters give the same ciphertext', 'Multiplier not coprime to 26'],
      ['Encoding checks but decoding fails', 'Wrong inverse or wrong order of operations'],
      ['A result of −3 is treated as invalid', 'Forgot to wrap around modulo 26'],
    ],
    explanation: 'Each error leaves a recognizable fingerprint in the output.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Work **mod 26**; negatives wrap around.',
      'Atbash y = 25 − x (self-inverse); Caesar y = x + b.',
      'Affine y = ax + b needs **gcd(a, 26) = 1**.',
      'Decode x = a⁻¹(y − b); **verify** by re-encrypting.',
    ],
  },
]);

const substitution = defineDeck('code-u3-l1', [
  {
    kind: 'title',
    title: 'Monoalphabetic substitution and language evidence',
    subtitle:
      'Word **patterns**, letter **frequency**, and **keyed alphabets** crack aristocrats and patristocrats.',
    objectives: [
      'Use **word patterns** as invariant evidence.',
      'Use **frequency** without overconfidence.',
      'Build **keyed alphabets** and solve with a disciplined session.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Patterns as invariant evidence',
    bullets: [
      'A one-to-one substitution ==preserves equality patterns== within a word.',
      'Number each new symbol: **MEET → 0-1-1-2**.',
      'A candidate with pattern 0-1-2-3 **cannot** fit, regardless of frequency.',
      'Every candidate must obey existing mappings **in both directions**.',
    ],
  },
  {
    kind: 'example',
    section: 0,
    title: 'Worked example: which word fits?',
    problem: 'A ciphertext word **ABBC** is proposed to mean MEET or TEAM. Which fits?',
    steps: [
      'ABBC has pattern **0-1-1-2**.',
      'MEET has **0-1-1-2**; TEAM has **0-1-2-3**.',
      'Accept MEET only as a **candidate**: test A → M, B → E, C → T throughout the message.',
    ],
    conclusion: 'A pattern mismatch is ==decisive==; a pattern match is only a candidate.',
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'Which word fits the ciphertext pattern XQRX (0-1-2-0)?',
    options: ['THEM', 'THAT', 'TOOK', 'SEES'],
    answer: 1,
    explanation: 'THAT is 0-1-2-0; THEM is 0-1-2-3, TOOK is 0-1-1-2, and SEES is 0-1-1-0.',
  },
  {
    kind: 'figure',
    section: 1,
    title: 'Frequency without overconfidence',
    image: 'code-frequency',
    caption:
      'In long English text **E, T, A, O, I, N** are common and **J, Q, X, Z** are rare. ==Short quotations can differ a lot.==',
    bullets: [
      '**Count**, rather than notice, which letters are common.',
      '**Digraphs and trigraphs** (TH, HE, THE, ING) are stronger evidence than one letter’s rank.',
      'Record uncertainty: a frequent X may be E, or something else in a topic-specific passage.',
    ],
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Aristocrats: linked word constraints',
    bullets: [
      '**Aristocrats** keep word boundaries, so short words and repeated phrases are powerful.',
      'One-letter words are **A or I**; the larger words they appear in decide which.',
      'Update a **two-way alphabet table** and revisit unresolved words after each confirmed mapping.',
      '==Never quietly change an established letter in just one place.==',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt:
      'In an aristocrat, the one-letter word Q appears, and QM appears as a two-letter word. Which reading is most likely, to test first?',
    options: [
      'Q = I, so QM could be IS, IT, IN or IF',
      'Q = A, so QM must be AN',
      'Q = O, because O is common',
      'Q = E, because E is most frequent',
    ],
    answer: 0,
    explanation:
      'One-letter English words are A or I; I starts many common two-letter words (IS, IT, IN, IF). Test the candidate **everywhere** before confirming.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Erristocrats and patristocrats',
    bullets: [
      'An **erristocrat** contains intentional spelling errors: verify the substitution before blaming the decode.',
      'A **patristocrat** removes word divisions; letters are often grouped in fives.',
      '==Displayed groups are not words.==',
      'Combine frequency, likely fragments, repeated strings, and tentative segmentation, with **consistent mappings** everywhere.',
    ],
  },
  {
    kind: 'match',
    section: 3,
    prompt: 'Match each puzzle type to its description.',
    pairs: [
      ['Aristocrat', 'Substitution that keeps word boundaries'],
      ['Patristocrat', 'Substitution without word boundaries'],
      ['Erristocrat', 'Substitution whose plaintext has deliberate errors'],
      ['Xenocrypt', 'Substitution in another language'],
    ],
    explanation:
      'All four use one substitution alphabet; they differ in what clues the plaintext offers.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Keyed alphabets',
    bullets: [
      'Write the **unique letters of the keyword** in order, then the unused letters.',
      'BALLOON → **B A L O N**, then C D E F G H I J K M P Q R S T U V W X Y Z.',
      'Common convention: **K1** keys plaintext, **K2** keys ciphertext, **K3** keys both with a shift.',
      '==Write both rows before applying any convention.==',
    ],
  },
  {
    kind: 'fill',
    section: 4,
    prompt: 'Build the keyed alphabet for the keyword CIPHER.',
    text: 'The alphabet begins C I P H E R, then continues {0} {1} {2} {3} …',
    blanks: ['A', 'B', 'D', 'F'],
    distractors: ['C', 'E', 'G'],
    explanation:
      'After CIPHER come the unused letters in order: **A B D F G J K …** (C and E are already used).',
  },
  {
    kind: 'flow',
    section: 5,
    title: 'A disciplined substitution session',
    steps: [
      { label: 'Transcribe', detail: 'A clean copy and a **frequency count**.' },
      { label: 'Tentative', detail: 'Enter likely mappings, ==propagate to every occurrence==.' },
      { label: 'Contradictions', detail: 'Look for conflicts before expanding the guess.' },
      { label: 'Expand', detail: 'Use newly readable words to fill more of the table.' },
      { label: 'Verify', detail: '**Re-encrypt** the proposed plaintext and compare.' },
    ],
  },
  {
    kind: 'order',
    section: 5,
    prompt: 'Order the steps of a disciplined substitution session.',
    items: [
      'Make a clean transcription and count frequencies',
      'Enter likely mappings tentatively',
      'Propagate them to every occurrence and check for contradictions',
      'Expand from newly readable words',
      'Re-encrypt the plaintext and compare to the ciphertext',
    ],
    explanation:
      'Evidence, tentative mapping, propagation, expansion, and finally **verification**.',
  },
  {
    kind: 'mcq',
    section: 5,
    prompt:
      'A decoded word has the right pattern but an odd meaning in context. What should you conclude?',
    options: [
      'The mapping is definitely wrong',
      'It may be an unusual quotation; a pattern mismatch would be decisive, a meaning mismatch is not',
      'Change that one letter so it reads better',
      'Abandon the puzzle',
    ],
    answer: 1,
    explanation:
      'Pattern evidence is **structural**; meaning can surprise you, especially in quotations.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Word **patterns** (MEET = 0-1-1-2) are invariant under substitution.',
      'Frequency is a **starting clue**, not proof.',
      'Keyed alphabets: unique keyword letters, then the rest; ==write both rows==.',
      'Propagate, check contradictions, and **re-encrypt** to finish.',
    ],
  },
]);

const tables = defineDeck('code-u4-l1', [
  {
    kind: 'title',
    title: 'Tables, repeating keys, and coordinate systems',
    subtitle:
      'Porta, Nihilist, and columnar ciphers: ==keep the key aligned== and write every convention down.',
    image: 'code-alberti',
    objectives: [
      'Align a **repeating key** with the message.',
      'Use **Porta** tables and **Nihilist** coordinate arithmetic.',
      'Encode and decode **complete columnar** transposition and checkerboard coordinates.',
    ],
  },
  {
    kind: 'figure',
    section: 0,
    title: 'Repeating keys and alignment',
    image: 'code-vigenere',
    caption:
      'In a repeating-key table, each key letter picks a row, so ==the same plaintext letter can encode differently== at different positions.',
    bullets: [
      'Write the **key stream directly beneath** the message letters.',
      'Check whether **spaces and punctuation advance the key**; the stated convention controls.',
      'Compare positions separated by the **key period**.',
      'One omitted letter can **misalign every later position**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A solver skips one plaintext letter while writing the key stream underneath. What happens?',
    options: [
      'Only that letter is wrong',
      'Every later position is decoded with the wrong key letter',
      'Nothing; repeating keys tolerate gaps',
      'The table itself becomes invalid',
    ],
    answer: 1,
    explanation:
      'The key stream shifts by one, so **all later alignments** are off even though the table is right.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Porta tables',
    image: 'code-enigma',
    bullets: [
      '**13 reciprocal alphabets**, selected by key-letter pairs **AB, CD, …, YZ**.',
      'Each row maps the first half of the alphabet to the second half and back.',
      'Row k: first-half x → **13 + ((x + k) mod 13)**; second-half x → **(x − 13 − k) mod 13**.',
      '==Applying the same row twice returns the original letter==, and keys A and B select the same row.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: Porta with key KEY',
    problem:
      'Encode **CODE** with the Porta key **KEY** (rows: K → KL = 5, E → EF = 2, Y → YZ = 12).',
    steps: [
      'C (2) with row 5: 13 + ((2 + 5) mod 13) = 20 → **U**.',
      'O (14) with row 2: (14 − 13 − 2) mod 13 = 12 → **M**.',
      'D (3) with row 12: 13 + (15 mod 13) = 15 → **P**. E (4) with row 5 (key repeats): 13 + 9 = 22 → **W**.',
    ],
    conclusion:
      'CODE → **UMPW**, and encoding UMPW with KEY ==returns CODE==: Porta is reciprocal.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'The Porta row for key A (or B) works like ROT13. Encode HELLO with key A.',
    text: 'H → {0}, E → {1}, L → {2}, L → {3}, O → {4}',
    blanks: ['U', 'R', 'Y', 'Y', 'B'],
    distractors: ['T', 'Q', 'C'],
    explanation: 'Row 0 swaps each first-half letter with the one 13 later: HELLO → **URYYB**.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'Polybius squares and Nihilist arithmetic',
    image: 'code-polybius',
    caption:
      'Polybius placed letters in a **5 × 5 grid**, so each letter becomes a row-column pair. Modern squares combine **I and J**.',
    bullets: [
      'Unkeyed rows: **ABCDE, FGHIK, LMNOP, QRSTU, VWXYZ**; each letter is **11 to 55**.',
      'Nihilist: ==add key coordinates to plaintext coordinates== as ordinary integers (55 + 55 = 110).',
      'Decode by **subtracting key coordinates first**, then look up the pair.',
    ],
  },
  {
    kind: 'example',
    section: 2,
    title: 'Worked example: Nihilist CAT',
    problem: 'Using the unkeyed I/J square, encode **CAT** with the repeated key letter **A**.',
    steps: [
      'C = **13**, A = **11**, T = **44**.',
      'Key A = 11, so Nihilist addition gives **24, 22, 55**.',
      'Decode: subtract 11 from each to recover 13, 11, 44, then look up **CAT**.',
    ],
    conclusion: 'Do not reduce totals modulo 100 ==unless the problem defines that variant==.',
  },
  {
    kind: 'numeric',
    section: 2,
    prompt:
      'In the unkeyed I/J square (rows ABCDE, FGHIK, LMNOP, QRSTU, VWXYZ), what is the coordinate of H?',
    answer: 23,
    tolerance: 0,
    explanation: 'H is in row 2 (FGHIK), column 3: **23**.',
  },
  {
    kind: 'fill',
    section: 2,
    prompt:
      'Nihilist-encode DOG with the key KEY (K = 25, E = 15, Y = 54) in the unkeyed I/J square.',
    text: 'D (14) + K (25) = {0}; O (34) + E (15) = {1}; G (22) + Y (54) = {2}',
    blanks: ['39', '49', '76'],
    distractors: ['38', '59', '66'],
    explanation: 'Ordinary addition of coordinates: **39, 49, 76**. Subtract the key to decode.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Complete columnar transposition',
    bullets: [
      'Fill a rectangle **row by row**; read **columns in key-rank order**.',
      'Repeated key letters need a stated tie-break, often **left to right**.',
      'The ciphertext has ==the same letters== as the plaintext.',
      'Decode: find column lengths, restore columns to their places, read rows.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: key CAB',
    problem: 'Encode **ATTACKATDAWN** by complete columnar transposition with key **CAB**.',
    steps: [
      'Rows of 3: ATT / ACK / ATD / AWN. Columns: C = AAAA, A = TCTW, B = TKDN.',
      'Key rank: A (column 2) first, B (column 3) second, C (column 1) third.',
      'Ciphertext: **TCTW TKDN AAAA**.',
    ],
    conclusion: 'Same 12 letters, ==new positions==: a transposition, not a substitution.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'The checkerboard update',
    bullets: [
      'The syllabus notes that older columnar material was replaced by a **5 × 5 checkerboard** topic.',
      'A letter is identified by **one row label and one column label** in a keyed square.',
      'Labels may be letters or digits, and ==their order matters==.',
      'Check the current **Division C cipher summary** rather than treating an old syllabus as the rulebook.',
    ],
  },
  {
    kind: 'numeric',
    section: 4,
    prompt:
      'A checkerboard square has row labels 1–5 and column labels 1–5, written row label first. What two-digit label names the letter in row 4, column 5?',
    answer: 45,
    tolerance: 0,
    explanation:
      'Row label first, then column label: **45**. Reversing the order would point to a different letter.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Avoiding mixed conventions',
    bullets: [
      'Before solving, write the **square, key expansion, label order, and I/J rule**.',
      'Porta: confirm which **key pair** selects each row. Nihilist: **subtract before lookup**.',
      'Columnar: show the **column permutation and rectangle size**.',
      '==Impossible coordinates signal an alignment or arithmetic mistake==, not a new alphabet.',
    ],
  },
  {
    kind: 'mcq',
    section: 5,
    prompt: 'Subtracting a Nihilist key gives the pair 62. What does that most likely mean?',
    options: [
      'The letter is in a sixth row of the square',
      'An alignment or arithmetic mistake, since a 5 × 5 square has no row 6',
      'It encodes a digit',
      'The plaintext letter is J',
    ],
    answer: 1,
    explanation:
      'Valid coordinates run 11–55; an impossible pair points to a **misaligned key** or arithmetic error.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Write the **key stream under the message**; one slip misaligns everything after it.',
      'Porta: 13 reciprocal rows chosen by **key pairs**.',
      'Nihilist: ==add coordinates; subtract before lookup==.',
      'Columnar keeps letters and moves positions; **check the current cipher list**.',
    ],
  },
]);

export const decks: Deck[] = [foundations, affine, substitution, tables, ...codebustersDecksLayers];
