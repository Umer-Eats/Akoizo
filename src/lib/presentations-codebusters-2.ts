import { defineDeck } from './presentation-types.ts';

// Codebusters decks for layered encodings, xenocrypts and cryptarithms, and competition
// strategy (lessons 5–7), imported by presentations-codebusters.ts.

const layers = defineDeck('code-u5-l1', [
  {
    kind: 'title',
    title: 'Baconian and fractionated Morse systems',
    subtitle:
      'Messages hidden in **two-symbol carriers** and **regrouped Morse streams**: decode one layer at a time.',
    objectives: [
      'Find the **binary distinction** in a carrier and decode **Baconian** groups.',
      'Turn Morse into a **separator stream** and fractionate it into **triples**.',
      'Work **backward through layers** and check group boundaries.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Finding the encoded layer',
    bullets: [
      'A readable **carrier** can hide another stream in its visual properties: two fonts, case, or two symbol classes.',
      '==The carrier’s literal words are not the hidden answer.==',
      'Identify the **binary distinction**, keep its order, and record which class means A and which means B.',
      'A **one-position shift** in fixed-width grouping corrupts every later character.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'A sentence alternates bold and plain letters. Which part carries a Baconian message?',
    options: [
      'The meaning of the sentence’s words',
      'The sequence of bold versus plain letters',
      'Only the first letter of each word',
      'The punctuation marks',
    ],
    answer: 1,
    explanation:
      'The **binary distinction** (bold = one symbol, plain = the other) is the hidden stream.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Baconian five-symbol groups',
    bullets: [
      'Modern 26-letter convention: number **A–Z as 0–25** and write each in **five binary places**, with A = 0, B = 1.',
      '**AAAAA = A, AAAAB = B, AABAA = E.**',
      'The historical **24-letter** alphabet merges I/J and U/V: ==do not silently mix the two tables==.',
      'Five places give **32 patterns**; an unused pattern signals a convention, alignment, or transcription problem.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: Baconian decode',
    problem: 'Decode **AAAAA AAAAB AABAA** under the modern 26-letter convention.',
    steps: [
      'Assign **A = 0, B = 1** within each five-symbol group.',
      'The groups are binary **0, 1, and 4**.',
      'With A = index 0, those values are **A, B, E**.',
    ],
    conclusion: 'Every complete letter uses ==exactly five symbols==.',
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Decode the modern Baconian groups ABBAA and AABBB.',
    text: 'ABBAA is binary 01100 = {0}, the letter {1}. AABBB is binary 00111 = {2}, the letter {3}.',
    blanks: ['12', 'M', '7', 'H'],
    distractors: ['13', 'N', '6', 'G'],
    explanation: '01100 = 12 → **M** and 00111 = 7 → **H**, counting A as 0.',
  },
  {
    kind: 'figure',
    section: 2,
    title: 'From Morse to a structured stream',
    image: 'code-morse',
    caption:
      'Morse letters use **one to four** dots and dashes, so without separators a stream like •••• could be H, or EEEE, or IS.',
    bullets: [
      'Written fractionated-Morse puzzles mark letter boundaries with a **separator, often X**, and word boundaries with **XX**.',
      'The treatment of word endings and final padding ==must be stated==.',
      'Recovering the substitution is only part of solving: the stream must also **parse into valid Morse letters**.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Fractionating into triples',
    bullets: [
      'Group the stream over **dot, dash, and X** into **triples**.',
      'There are **3³ = 27** triples; a standard 26-entry table omits **XXX**.',
      'A keyed alphabet maps each triple to a letter, so ==one ciphertext letter can cross a Morse letter boundary==.',
      'Copy the supplied table ordering **exactly**: different orders make different puzzles.',
    ],
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'How many different triples can be made from the three symbols dot, dash, and X?',
    answer: 27,
    tolerance: 0,
    explanation: '3 × 3 × 3 = **27**; the 26-letter table leaves out XXX.',
  },
  {
    kind: 'flow',
    section: 4,
    title: 'Working backward through layers',
    steps: [
      { label: 'Substitution', detail: 'Decode the keyed alphabet to recover **triples**.' },
      {
        label: 'Join',
        detail:
          '==Join triples into one continuous stream==; never read a triple as a whole Morse letter.',
      },
      { label: 'Parse', detail: 'Split at **X** separators and **XX** word breaks.' },
      { label: 'Read', detail: 'Translate Morse letters; set **padding** aside.' },
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order the steps for decoding fractionated Morse.',
    items: [
      'Map each ciphertext letter back to its triple',
      'Join the triples into one stream',
      'Split the stream at separators and word breaks',
      'Translate each Morse letter',
      'Set aside final padding',
    ],
    explanation:
      'Undo the outer layer first, then rebuild the **whole intermediate stream** before reading Morse.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Checks that expose boundary errors',
    bullets: [
      'Baconian: every complete letter consumes **five A/B symbols**.',
      'Fractionated Morse: ciphertext length reflects **triples**, not plaintext letters.',
      '==A group crossing a word boundary may be expected==, not a mistake.',
      'The decisive check: rebuild the **intermediate stream** and re-encode it under the same conventions.',
    ],
  },
  {
    kind: 'numeric',
    section: 5,
    prompt: 'A Baconian carrier has 45 A/B symbols. How many plaintext letters does it hold?',
    answer: 9,
    tolerance: 0,
    explanation:
      '45 ÷ 5 = **9** letters. A count that is not a multiple of 5 signals a transcription problem.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Carrier', 'Visible material carrying an encoded distinction'],
      ['Baconian', 'Five-position binary letter encoding'],
      ['Fractionation', 'Regrouping encoded units across original boundaries'],
      ['Separator', 'Symbol marking character or word boundaries'],
    ],
    explanation: 'These layered systems hide a stream, then regroup it.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Find the **binary distinction** in the carrier, not the carrier’s meaning.',
      'Baconian: **five symbols per letter**, A = 0 … Z = 25 in the modern table.',
      'Fractionated Morse: **27 triples** over dot, dash, X; XXX is unused.',
      '==Decode layers in reverse== and rebuild the whole intermediate stream.',
    ],
  },
]);

const xenocrypts = defineDeck('code-u6-l1', [
  {
    kind: 'title',
    title: 'Xenocrypts and cryptarithms',
    subtitle:
      'Spanish-language substitutions and letter-for-digit arithmetic, both solved by **constraints**.',
    objectives: [
      'Use **Spanish language features** to generate substitution candidates.',
      'Set up **column and carry equations** for a cryptarithm.',
      'Search systematically and state what makes a **complete solution**.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Language changes the evidence',
    bullets: [
      'A **xenocrypt** is a cryptogram in another language, commonly **Spanish**.',
      'The substitution mechanism is the same, but ==frequency, short words, and endings differ==.',
      'Start with the stated alphabet and handling of **accents and Ñ**.',
      'A familiar-looking long word may be a **cognate**, but resemblance alone is weak evidence.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt: 'What changes when a substitution cipher is a Spanish xenocrypt instead of English?',
    options: [
      'The substitution must be polyalphabetic',
      'The language evidence: frequencies, short words, and endings',
      'Letters may map to several letters at once',
      'Word patterns no longer matter',
    ],
    answer: 1,
    explanation:
      'The mechanism stays one consistent substitution; only the **language evidence** used to find it changes.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Useful Spanish constraints',
    bullets: [
      'Frequent short words: **DE, LA, EL, EN, Y**.',
      '**Gender and number agreement** link word endings across a sentence.',
      'Infinitive endings **AR, ER, IR** and plural endings constrain suffixes.',
      '==Global consistency outranks local fluency==: never insert a Spanish-looking word that breaks a confirmed mapping.',
    ],
  },
  {
    kind: 'fill',
    section: 1,
    prompt: 'Complete the Spanish constraints.',
    text: 'Common two-letter Spanish words include DE, LA, EL and {0}. Infinitives end in AR, ER or {1}. A common one-letter word meaning “and” is {2}.',
    blanks: ['EN', 'IR', 'Y'],
    distractors: ['TH', 'ING', 'I'],
    explanation:
      '**EN**, the **IR** infinitive ending, and **Y** are strong starting candidates when their patterns fit.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Cryptarithms are place-value problems',
    bullets: [
      'Letters stand for digits so an arithmetic statement becomes true.',
      'Usual rules: **different letters, different digits**; the same letter, the same digit; **leading letters nonzero**.',
      'State the **base**; most examples are decimal.',
      'Work from **columns and carries**: ==each column equation includes its incoming and outgoing carry==.',
    ],
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Using carry constraints',
    bullets: [
      'Adding two numbers, a column’s carry is **0 or 1**.',
      'In **SEND + MORE = MONEY**, the extra leading digit forces **M = 1**.',
      'Units: **D + E = Y + 10c₁**. Tens: **N + R + c₁ = E + 10c₂**.',
      'A contradiction eliminates the branch that introduced the uncertain assignment.',
    ],
  },
  {
    kind: 'example',
    section: 3,
    title: 'Worked example: TO + GO = OUT',
    problem: 'Solve **TO + GO = OUT** with distinct digits and nonzero leading letters.',
    steps: [
      'The sum has an extra digit, so the final carry makes **O = 1**.',
      'Units: O + O = 2 = T with no carry, so **T = 2**.',
      'Tens: T + G = U + 10, so 2 + G = U + 10, giving **G = 8, U = 0**.',
    ],
    conclusion: 'Check: **21 + 81 = 102**, with T, O, G, U all ==different digits==.',
  },
  {
    kind: 'numeric',
    section: 3,
    prompt: 'In SEND + MORE = MONEY with ordinary rules, what digit must M be?',
    answer: 1,
    tolerance: 0,
    explanation:
      'The sum of two four-digit numbers is below 20,000, so the leading carry gives **M = 1**.',
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Systematic search and propagation',
    bullets: [
      'Keep a **domain** of possible digits for each letter; update it whenever a column restricts it.',
      'Branch on the ==most constrained letter or carry==, then propagate consequences before the next guess.',
      'For subtraction, multiplication, or other bases, **derive the right equations**.',
      'A calculator can check arithmetic but does not replace reasoning; equipment must follow the rules.',
    ],
  },
  {
    kind: 'order',
    section: 4,
    prompt: 'Order a systematic cryptarithm search.',
    items: [
      'Write column equations with carries',
      'Fix forced values such as a leading carry',
      'Branch on the most constrained letter',
      'Propagate consequences through every column',
      'Back up when a contradiction appears',
    ],
    explanation: 'Forced values first, then **constrained branching** with propagation.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'What counts as a complete solution',
    bullets: [
      'Xenocrypt: **re-encrypt** the recovered text, keeping the stated accent and space rules.',
      'Cryptarithm: substitute every digit, check the **full arithmetic**, **distinct digits**, and **nonzero leading letters**.',
      '==A true equation can still be an invalid cryptarithm== if two letters share a digit.',
      'State when **multiple solutions** remain possible.',
    ],
  },
  {
    kind: 'example',
    section: 5,
    title: 'Worked example: verify SEND + MORE',
    problem: 'Verify the candidate **SEND = 9567, MORE = 1085, MONEY = 10652**.',
    steps: [
      'Add 9567 + 1085 = **10652**.',
      'Assignments S9 E5 N6 D7 M1 O0 R8 Y2: ==all eight digits are distinct==.',
      'Leading S and M are **nonzero**, and every repeated letter uses the same digit.',
    ],
    conclusion: 'Arithmetic, distinctness, and leading digits are **three separate checks**.',
  },
  {
    kind: 'multi',
    section: 5,
    prompt: 'Which checks are needed before a cryptarithm answer is complete?',
    options: [
      'The full arithmetic is correct',
      'Different letters have different digits',
      'Leading letters are nonzero',
      'The digits add up to 45',
      'Each repeated letter keeps the same digit',
    ],
    answers: [0, 1, 2, 4],
    explanation:
      'Arithmetic, **distinctness**, **leading digits**, and consistency; the digit sum is irrelevant.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Xenocrypt', 'A cryptogram in another specified language'],
      ['Cryptarithm', 'Arithmetic with letters standing for digits'],
      ['Carry', 'Place-value transfer to the next column'],
      ['Domain', 'Remaining possible values for a symbol'],
    ],
    explanation: 'Both puzzle types are solved by narrowing domains with consistent constraints.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Xenocrypts: same substitution, **Spanish evidence** (DE, LA, EL, EN, Y; AR/ER/IR).',
      'Cryptarithms: **column equations with carries**; leading carries force digits.',
      '==Propagate before guessing==, and back up on contradictions.',
      'Complete = arithmetic, distinct digits, nonzero leading letters, re-encryption.',
    ],
  },
]);

const strategy = defineDeck('code-u7-l1', [
  {
    kind: 'title',
    title: 'Competition strategy and deliberate practice',
    subtitle:
      'Read the task, triage the clock, split solving from checking, and ==review in a way that changes next time==.',
    image: 'code-bombe',
    objectives: [
      'Read the **actual task** and separate given facts from assumptions.',
      'Triage questions with **expected value** and handoffs.',
      'Generate reliable practice and classify **errors** for review.',
    ],
  },
  {
    kind: 'bullets',
    section: 0,
    title: 'Read the actual task first',
    bullets: [
      'Identify the **direction** (encode or decode), **cipher family**, **key information**, formatting, and scoring.',
      '==A page asking for encryption is not solved by the inverse operation.==',
      'The syllabus is a course, not a rulebook: confirm **team size, timing, resources, and cipher list** separately.',
      'Annotate what is given and **distinguish it from your assumptions**.',
    ],
  },
  {
    kind: 'mcq',
    section: 0,
    prompt:
      'A question gives a plaintext and a Caesar key of +4 and asks for the ciphertext. What should you do?',
    options: [
      'Subtract 4 from each letter',
      'Add 4 to each letter, because the task asks for encryption',
      'Try all 26 shifts',
      'Use Atbash first',
    ],
    answer: 1,
    explanation:
      'Read the **direction**: encryption adds the key; subtracting would answer a different question.',
  },
  {
    kind: 'bullets',
    section: 1,
    title: 'Triage under a finite clock',
    bullets: [
      'Estimate progress offered against **time likely consumed**.',
      'A short deterministic coordinate cipher may be an early solve; an unconstrained substitution may need revisits.',
      'Mark questions **ready, partially constrained, or blocked**.',
      '==Revisit a blocked problem when something changes==, not to repeat the same guesses.',
    ],
  },
  {
    kind: 'example',
    section: 1,
    title: 'Worked example: expected points per minute',
    problem:
      'Puzzle A: **100 points**, 0.9 solve chance, 3 minutes. Puzzle B: **200 points**, 0.3 chance, 6 minutes. Compare.',
    steps: [
      'A: 100 × 0.9 ÷ 3 = **30** expected points per minute.',
      'B: 200 × 0.3 ÷ 6 = **10** expected points per minute.',
      'Estimates are uncertain: ==revise them== if new constraints make B easier.',
    ],
    conclusion: 'Expected value is a **planning aid**, not a guaranteed score.',
  },
  {
    kind: 'numeric',
    section: 1,
    prompt:
      'A 150-point puzzle has a 0.6 estimated solve chance and should take 3 minutes. What are its expected points per minute?',
    answer: 30,
    tolerance: 0.01,
    explanation: '150 × 0.6 ÷ 3 = **30** expected points per minute.',
  },
  {
    kind: 'bullets',
    section: 2,
    title: 'Divide work and verification',
    bullets: [
      'Assign tasks by **skill and workload**, not the same page to everyone.',
      'One teammate solves while ==another performs an independent reverse check==.',
      'Record keys, alphabet direction, and tentative mappings so someone else can **continue**.',
      'Settle disagreements by checking **a specific encoded position or column equation**.',
    ],
  },
  {
    kind: 'mcq',
    section: 2,
    prompt: 'Two teammates disagree about a decoded sentence. What is the best way to settle it?',
    options: [
      'Pick the sentence that sounds more natural',
      'Re-encrypt a specific disputed position and compare with the ciphertext',
      'Let the faster solver decide',
      'Skip the question',
    ],
    answer: 1,
    explanation: 'A **specific position check** is evidence; how a sentence sounds is not.',
  },
  {
    kind: 'bullets',
    section: 3,
    title: 'Time checks and switching costs',
    bullets: [
      'A practice timer shows where time goes: **recognition, setup, transformation, searching, verification**.',
      'Switching questions costs time: ==leave a short note before moving on==.',
      'Set a planned **check-in point** to compare progress with remaining work.',
      'Reserve time for **transcription checks**: a missing symbol or wrong direction loses the answer.',
    ],
  },
  {
    kind: 'bullets',
    section: 4,
    title: 'Generating reliable practice',
    bullets: [
      'Choose a known plaintext and a **valid key**, encode with an **explicit convention**, and keep the steps.',
      'A generated puzzle needs a ==checked key==, not just plausible output.',
      'Vary **length, repeated-letter patterns, key periods, and table labels**; include wraparound and carry cases.',
      'Generating tests is **optional enrichment**; learning from checked solutions is the core.',
    ],
  },
  {
    kind: 'multi',
    section: 4,
    prompt: 'Which make a generated practice puzzle reliable and useful?',
    options: [
      'A verified, valid key',
      'Saved intermediate steps and answer',
      'Including wraparound and carry cases',
      'An affine multiplier of 13 for variety',
      'Output that merely looks scrambled',
    ],
    answers: [0, 1, 2],
    explanation:
      'A **checked key** and saved steps make the puzzle gradable; a = 13 is not invertible mod 26.',
  },
  {
    kind: 'bullets',
    section: 5,
    title: 'Review that changes future performance',
    bullets: [
      'Classify each lost answer: **recognition, convention, arithmetic, unsupported guess, or verification**.',
      'Redo one item slowly and write a short **prevention rule**.',
      'Then solve a ==new item using the same skill==: repeating a memorized answer shows no transfer.',
      'Track **accuracy alongside speed**, and **interleave** cipher families.',
    ],
  },
  {
    kind: 'sort',
    section: 5,
    prompt: 'Classify each lost answer.',
    bins: ['Convention error', 'Arithmetic error', 'Verification failure'],
    items: [
      ['Used the 24-letter Baconian table on a 26-letter puzzle', 0],
      ['Computed 21 × 15 mod 26 as 4', 1],
      ['Submitted a decode with one letter never re-checked', 2],
      ['Read Porta rows by single letters instead of key pairs', 0],
      ['Forgot a carry in a cryptarithm column', 1],
      ['Never compared the final answer against the ciphertext', 2],
    ],
    explanation:
      'Naming the error type points to the right **prevention rule**: check the convention, the arithmetic, or the final comparison.',
  },
  {
    kind: 'match',
    prompt: 'Match each term to its meaning.',
    pairs: [
      ['Triage', 'Prioritizing work under limited time'],
      ['Verification', 'Checking a solution by reversing the transformation'],
      ['Interleaving', 'Mixing problem types in practice'],
      ['Handoff', 'Transferring work with enough context to continue'],
    ],
    explanation: 'Together these habits turn individual solving into team scoring.',
  },
  {
    kind: 'summary',
    title: 'Key takeaways',
    points: [
      'Read the **direction, family, key, and conventions** before solving.',
      'Triage with expected value, and ==revisit blocked problems only when something changes==.',
      'Solve and **verify independently**; leave notes for handoffs.',
      'Classify errors, write prevention rules, and practice on **new items**.',
    ],
  },
]);

export const codebustersDecksLayers = [layers, xenocrypts, strategy];
