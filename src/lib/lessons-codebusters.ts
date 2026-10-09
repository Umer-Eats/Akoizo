import { buildCourse } from './lesson-course-builder.ts';

export const codebustersLessons = buildCourse({
  eventId: 'codebusters',
  eventName: 'Codebusters',
  prefix: 'code',
  lab: 'cipher',
  syllabus: 'Codebusters SciConnect Syllabus 2026 - Google Docs.pdf',
  intro:
    'Learn to recognize, decode, and verify substitution, keyed, fractionated, and numerical ciphers. Follow the supplied seven-unit syllabus, including its historical columnar material and checkerboard update. Tournament cipher lists and equipment permissions must be checked in the applicable rulebook.',
  references: [
    {
      title: 'Science Olympiad Codebusters resources and cipher summaries',
      url: 'https://www.soinc.org/codebusters-c',
    },
  ],
  chapters: [
    {
      title: 'Cryptography foundations and the solving workflow',
      description: 'Plaintext, ciphertext, keys, transformations, and reversible reasoning.',
      objectives: [
        'Separate a cipher algorithm from its key.',
        'Recognize substitution versus transposition.',
        'Verify a proposed solution by re-encryption.',
      ],
      sections: [
        [
          'Messages and representations',
          'Plaintext is the intended message; ciphertext is the transformed representation. An algorithm describes the transformation and a key selects one transformation from a family. In a Caesar cipher the algorithm shifts letters around a circular alphabet and the key supplies the shift. Keep A = 0 through Z = 25 consistent throughout a calculation. Spaces, punctuation, and case may be preserved for readability or removed by the problem. Those formatting choices affect the clues available, but they do not automatically change the underlying letter transformation.',
        ],
        [
          'Substitution and transposition',
          'Substitution replaces symbols while preserving their sequence. Transposition rearranges positions while preserving the underlying symbol inventory. A monoalphabetic substitution uses the same replacement throughout; a polyalphabetic system can use different replacements at different positions. Count letters before attempting a full solve. An ordinary transposition preserves individual letter frequencies exactly. A substitution preserves equality patterns even though the letter names change. These are useful diagnostics rather than guarantees: short text, null symbols, errors, or preprocessing can conceal expected statistical patterns.',
        ],
        [
          'What makes a key valid',
          'A decoding transformation must undo encoding on the stated alphabet. A substitution table must map distinct plaintext letters to distinct ciphertext letters if ordinary one-to-one decoding is intended. Two plaintext letters assigned the same ciphertext letter create an ambiguity that no inverse table can resolve. Write both directions of the table rather than mentally switching them. An entry P → Q means plaintext P encodes to Q; decoding Q then returns P. The inverse direction is a frequent source of otherwise consistent-looking mistakes.',
        ],
        [
          'Evidence before guesses',
          'Separate observations from hypotheses. An observation might be that the same three-letter ciphertext word occurs four times, with a repeated final symbol in another word. A hypothesis might be that it represents THE. Test the hypothesized mappings across every occurrence before filling the rest of the page. A candidate that creates a contradiction should be revised even if one sentence sounds plausible. Maintain tentative and confirmed mappings visibly. For a short cryptogram, a unique-looking local match can still have several globally possible solutions.',
        ],
        [
          'Verification as an independent operation',
          'A readable answer is necessary but not sufficient. Re-encrypt each recovered letter using the stated key and compare it to the original ciphertext, including every repeated symbol. Check spaces and numerical conventions separately. If one position fails, locate whether the cause is arithmetic, a mistaken key direction, or a transcription error. For a cipher containing deliberate spelling errors, distinguish the source error from your decoding error. This discipline also lets teammates verify one another without depending on the same initial guess.',
        ],
        [
          'Building a practice system',
          'Practice recognition, transformation, and verification as separate skills before combining them under time pressure. Keep an error log with the cipher family, failed assumption, corrected rule, and a small counterexample. A useful exercise starts with a known message, encodes it, hides the key, and asks a partner to recover it; the original message supplies a reliable key for review. Generating a puzzle is optional enrichment, not a replacement for learning to solve unfamiliar examples. Event permissions and scoring come from the tournament rules rather than this historical syllabus.',
        ],
      ],
      terms: [
        ['Plaintext', 'Original intended message.'],
        ['Ciphertext', 'Encoded message.'],
        ['Key', 'Parameter that selects a transformation.'],
        ['Inverse', 'Operation that reverses another operation.'],
      ],
      example: {
        problem: 'A = 0 and a Caesar key of +3 are used to encode CAT. Decode FDW and verify.',
        steps: [
          'CAT corresponds to 2, 0, 19. Add 3 modulo 26 to obtain 5, 3, 22: FDW.',
          'Decode FDW by subtracting 3 modulo 26: 2, 0, 19.',
          'Re-encrypt CAT and compare all three symbols with FDW.',
        ],
        conclusion:
          'The recovered plaintext is CAT, and independent re-encryption confirms the key direction.',
      },
      mcq: [
        [
          'Which operation preserves the exact letter counts while changing order?',
          'Transposition',
          ['Monoalphabetic letter replacement', 'Deleting spaces and letters', 'A numerical hash'],
          'A transposition permutes positions without replacing letters.',
        ],
        [
          'What is the key in a Caesar transformation?',
          'The shift amount',
          ['The recovered English sentence', 'The alphabet itself', 'The paper layout'],
          'The shift chooses one member of the family.',
        ],
        [
          'Which check is strongest after a plausible solve?',
          'Re-encrypt and compare every symbol',
          ['Accept any grammatical sentence', 'Ignore repeated letters', 'Count only words'],
          'Re-encryption checks the actual transformation rather than plausibility.',
        ],
      ],
      written: [
        ['Encode ZOO with key +3.', 'CRR: Z wraps to C and O maps to R twice.'],
        [
          'Why must an ordinary substitution table be one-to-one?',
          'Otherwise one ciphertext symbol can refer to multiple plaintext letters, so a unique inverse does not exist.',
        ],
        [
          'A guessed word works once but contradicts another occurrence. What should change?',
          'Revisit the guess or mapping direction; a consistent substitution must satisfy all occurrences.',
        ],
        [
          'Design a useful entry for an error log.',
          'Record the cipher, mistaken assumption, corrected transformation, and a short re-encrypted example that verifies the correction.',
        ],
      ],
      flow: [
        ['Observe', 'Record alphabet, spaces, repetitions, and stated conventions.'],
        ['Transform', 'Apply a consistent key and track tentative mappings.'],
        ['Verify', 'Re-encrypt the result and resolve every mismatch.'],
      ],
      compare: [
        ['Substitution', 'Replaces symbol identities', 'Order normally remains.'],
        ['Transposition', 'Reorders symbol positions', 'Letter counts remain.'],
        ['Plausible English', 'Helps generate a hypothesis', 'Does not replace verification.'],
      ],
      challenge:
        'Encode a repeated-letter message, then change the Caesar key. Predict which equality patterns survive.',
      takeaway:
        'A reversible rule and a globally consistent verification matter more than a lucky word guess.',
    },
    {
      title: 'Atbash, Caesar, and affine transformations',
      description: 'Modular arithmetic, inverses, and affine-key validity.',
      objectives: [
        'Compute wraparound shifts.',
        'Find a modular multiplicative inverse.',
        'Distinguish valid affine keys from collisions.',
      ],
      sections: [
        [
          'Working modulo 26',
          'Represent letters as integers 0 through 25. Working modulo 26 means replacing an integer by its remainder in this range, so 28 is equivalent to 2 and −1 is equivalent to 25. Modular addition gives a circular alphabet rather than a line that ends at Z. Write the index convention before calculating because an A = 1 convention changes apparent formulas. Negative results require wraparound; they are not invalid letters. Convert back to letters only after the arithmetic is complete.',
        ],
        [
          'Atbash as a reflection',
          'Atbash reverses the alphabet: A pairs with Z, B with Y, and so on. With zero-based indices its rule is y = 25 − x. Applying the rule twice gives 25 − (25 − x) = x, so the same transformation encodes and decodes. This self-inverse property does not mean every substitution is self-inverse. In the lab, compare repeated letters and alphabet endpoints. Atbash is also the affine transformation with multiplier 25 and offset 25 modulo 26.',
        ],
        [
          'Caesar as a rotation',
          'A Caesar cipher uses y = x + b modulo 26. To decode, compute x = y − b modulo 26. There are 26 possible shifts including the unchanged alphabet. If no key is supplied, a short systematic shift table can reveal candidates, but a readable fragment must still be tested across the entire text. All Caesar shifts preserve letter differences around the circle. A ciphertext that requires different shifts for different positions cannot be solved by a single ordinary Caesar key.',
        ],
        [
          'Affine encoding and invertibility',
          'An affine cipher uses y = ax + b modulo 26. The multiplier a must be relatively prime to 26: its greatest common divisor with 26 must equal 1. Otherwise two plaintext inputs can collide. The allowable multipliers are 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, and 25. The offset b can be any residue. Multiplication by 2 fails because 2 × 0 and 2 × 13 both become 0 modulo 26.',
        ],
        [
          'Decoding and recovering keys',
          'Find a number a-inverse satisfying a × a-inverse = 1 modulo 26. Then decode with x = a-inverse(y − b) modulo 26. For a = 5 the inverse is 21 because 105 leaves remainder 1. If two plaintext-ciphertext pairs are known, subtract their equations to eliminate b. Division is only legitimate when the divisor has an inverse. An even difference can yield multiple possible multipliers, so enumerate and test candidates instead of using ordinary real-number division.',
        ],
        [
          'Diagnosing calculation mistakes',
          'Check endpoints, a repeated letter, and a wraparound example. If all outputs look shifted by a constant, suspect an offset or indexing mistake. If several different inputs collapse to the same output, suspect an invalid multiplier. If encoding works but decoding fails, verify the inverse and the order of subtracting the offset before multiplication. A good solution includes the transformation, the index convention, and a reverse check. Treat any derived key as a hypothesis until it explains the complete supplied message.',
        ],
      ],
      terms: [
        ['Modulo', 'Arithmetic using residue classes.'],
        ['Affine', 'Multiplication followed by addition modulo an alphabet size.'],
        ['Coprime', 'Having greatest common divisor 1.'],
        ['Modular inverse', 'A multiplier that produces residue 1 with another multiplier.'],
      ],
      example: {
        problem: 'Encode CAT with a = 5, b = 8; then decode using the inverse.',
        steps: [
          'C = 2 gives 5 × 2 + 8 = 18 → S. A = 0 gives 8 → I. T = 19 gives 103 mod 26 = 25 → Z.',
          'The inverse of 5 is 21 because 5 × 21 mod 26 = 1.',
          'For Z, 21 × (25 − 8) = 357; 357 mod 26 = 19 → T. Repeat for S and I.',
        ],
        conclusion: 'CAT encodes to SIZ and the inverse recovers CAT.',
      },
      mcq: [
        [
          'Which affine multiplier is invalid modulo 26?',
          '2',
          ['5', '7', '25'],
          '2 shares a factor with 26 and produces collisions.',
        ],
        ['Atbash maps A to what?', 'Z', ['B', 'A', 'Y'], 'Atbash reverses alphabet order.'],
        [
          'For a = 5, what inverse is used modulo 26?',
          '21',
          ['5', '13', '20'],
          '5 × 21 = 105 = 1 mod 26.',
        ],
      ],
      written: [
        ['Decode D with Caesar key +3.', 'A: 3 − 3 = 0.'],
        [
          'Show why multiplier 2 is ambiguous.',
          'Inputs A = 0 and N = 13 both map to residue 0 when b = 0.',
        ],
        ['Encode Z with affine a = 5 and b = 8.', '5 × 25 + 8 = 133; remainder 3 gives D.'],
        [
          'Why can dividing two affine equations fail?',
          'The difference may not be invertible modulo 26; solve valid residue candidates and verify them instead.',
        ],
      ],
      flow: [
        ['Index', 'Set A = 0 and identify a and b.'],
        ['Map', 'Compute (ax + b) mod 26.'],
        ['Invert', 'Use a-inverse(y − b) and recheck.'],
      ],
      compare: [
        ['Atbash', 'Reflection y = 25 − x', 'Self-inverse.'],
        ['Caesar', 'Rotation y = x + b', 'Subtract b to decode.'],
        ['Affine', 'Scaled rotation y = ax + b', 'Requires gcd(a,26) = 1.'],
      ],
      challenge:
        'Use affine a = 5, b = 8 on CAT. Change the key and inspect all 26 mappings for collisions.',
      takeaway: 'An inverse exists only when the multiplier is coprime to the alphabet size.',
    },
    {
      title: 'Monoalphabetic substitution and language evidence',
      description: 'Aristocrats, erristocrats, patristocrats, and keyed alphabets.',
      objectives: [
        'Combine frequency and word-pattern evidence.',
        'Explain how spaces and errors affect solving.',
        'Construct and check a keyed alphabet.',
      ],
      sections: [
        [
          'Patterns as invariant evidence',
          'A one-to-one substitution preserves equality patterns within a word. Assign the first unseen symbol 0, the next unseen symbol 1, and so on: MEET becomes 0-1-1-2. A candidate with pattern 0-1-2-3 cannot fit it, regardless of letter frequency. Repeated words, doubled letters, and matching prefixes create linked constraints across the message. A word list can generate candidates, but every candidate must obey existing mappings in both directions. Replacing two different ciphertext symbols by the same plaintext letter violates an ordinary substitution.',
        ],
        [
          'Frequency without overconfidence',
          'In long English samples some letters and pairs are more common than others, making frequency a useful starting clue. A short quotation can differ greatly from average language statistics. Count rather than merely notice which letter seems common, then use words and grammatical structure to test the guess. Common digraphs and trigraphs supply stronger contextual evidence than a single-letter ranking alone. Record uncertainty explicitly: a frequent ciphertext X may be E, but it may also be another letter in a topic-specific passage.',
        ],
        [
          'Aristocrats and linked word constraints',
          'Aristocrats generally preserve word boundaries, making short words and repeated phrases especially useful. Identify one-letter words, three-letter patterns, repeated endings, and punctuation structure. A guessed one-letter word can be A or I in English, but its effects on larger words may distinguish them. Update a two-way alphabet table and revisit unresolved words after each confirmed mapping. Never erase a contradiction by quietly changing an established letter in just one place. Global consistency is what turns local hints into a solution.',
        ],
        [
          'Erristocrats and patristocrats',
          'An erristocrat contains intentional errors in the underlying text, so a strange-looking decoded word may reflect the puzzle rather than a failed cipher. Verify the substitution before deciding whether a spelling anomaly is intentional. A patristocrat removes ordinary word divisions, often grouping letters for presentation. Those displayed groups are not necessarily words. Use frequency, likely language fragments, repeated strings, and tentative segmentation together. A successful segmentation should explain the complete stream without forcing letter mappings to vary between occurrences.',
        ],
        [
          'Keyed alphabet construction',
          'A keyed alphabet commonly starts with the unique letters of a keyword in order, followed by unused alphabet letters in the specified order. BALLOON begins B A L O N, then the remaining unused letters. The terms K1, K2, and K3 describe conventions for which alphabet is keyed; write both plaintext and ciphertext rows before applying any convention. Under the common convention K1 keys plaintext, K2 keys ciphertext, and K3 keys both with the same keyword and a relative shift. Follow the puzzle’s exact convention rather than assuming a remembered row direction.',
        ],
        [
          'A disciplined substitution session',
          'Begin with a clean transcription and frequency count. Enter likely mappings tentatively, propagate them to all occurrences, and look for contradictions before expanding the guess. Separate a word-pattern mismatch from a meaning mismatch: the first is decisive under the stated system, while the second may reflect an unusual quotation. At the end, compare ciphertext against a re-encryption of the proposed plaintext. Practice both with and without spaces so recognition depends on structural evidence instead of one familiar type of puzzle.',
        ],
      ],
      terms: [
        ['Monoalphabetic', 'One substitution alphabet used throughout.'],
        ['Aristocrat', 'Substitution puzzle retaining word boundaries.'],
        ['Patristocrat', 'Substitution puzzle without normal word boundaries.'],
        ['Word pattern', 'The equality structure of repeated letters.'],
      ],
      example: {
        problem:
          'A ciphertext word ABBC is proposed to mean MEET or TEAM. Which fits the equality pattern?',
        steps: [
          'ABBC has pattern 0-1-1-2.',
          'MEET has 0-1-1-2; TEAM has 0-1-2-3.',
          'Accept MEET only as a candidate; test A → M, B → E, C → T throughout the message.',
        ],
        conclusion:
          'MEET fits the local pattern, but a full solution requires global verification.',
      },
      mcq: [
        [
          'Which word fits ABBC?',
          'MEET',
          ['TEAM', 'TREE', 'NOON'],
          'The repeated middle pair must stay repeated.',
        ],
        [
          'What is removed in a patristocrat?',
          'Normal word boundaries',
          ['All repeated letters', 'The substitution key space', 'All vowels'],
          'Grouping is presentation rather than plaintext segmentation.',
        ],
        [
          'What begins a deduplicated BALLOON keyword alphabet?',
          'BALON',
          ['BALLOON', 'AB LNO', 'BONLA'],
          'Keep each keyword letter at its first occurrence.',
        ],
      ],
      written: [
        ['Give the pattern of LEVEL.', '0-1-2-1-0.'],
        [
          'Why does the most frequent symbol not prove a mapping to E?',
          'Short samples and topic-specific vocabulary can depart from average frequencies; independent constraints are required.',
        ],
        [
          'A decoded word is misspelled in an erristocrat. What should be checked first?',
          'Verify consistent substitution and re-encryption before treating the spelling as an intentional source error.',
        ],
        [
          'What should a solver write for K1/K2/K3?',
          'Explicit plaintext and ciphertext alphabets, keyword deduplication, remaining-letter order, and any relative shift stated in the problem.',
        ],
      ],
      flow: [
        ['Pattern', 'Reject candidates that break equality constraints.'],
        ['Propagate', 'Apply every tentative mapping globally.'],
        ['Resolve', 'Use contradictions, language, and re-encryption.'],
      ],
      compare: [
        ['Frequency', 'Prioritizes candidate letters', 'Short samples can mislead.'],
        ['Word pattern', 'Constrains repeated-letter positions', 'Several words may share it.'],
        [
          'Keyed alphabet',
          'Restricts the substitution structure',
          'Row conventions must be explicit.',
        ],
      ],
      challenge:
        'Encode MEET ME AT NOON and inspect the frequency chart. Predict which repeated patterns remain under every Caesar or affine key.',
      takeaway:
        'Combine independent clues; language plausibility alone does not establish a substitution.',
    },
    {
      title: 'Tables, repeating keys, and coordinate systems',
      description:
        'Porta, Nihilist, complete columnar history, and the syllabus checkerboard update.',
      objectives: [
        'Track repeating-key alignment.',
        'Perform Polybius-coordinate arithmetic.',
        'Separate coordinate substitution from columnar transposition.',
      ],
      sections: [
        [
          'Repeating keys and alignment',
          'A repeating-key cipher uses a key position to select a rule for each message position. Write the key stream directly beneath the letters to prevent an unnoticed alignment shift. Determine whether spaces and punctuation advance the key; educational problems often ignore them, but the stated convention controls. The same plaintext letter may encode differently at different positions. Compare observations separated by the key period rather than applying a single global substitution table. A single omitted letter can corrupt every later key alignment even when the table itself is correct.',
        ],
        [
          'Porta tables',
          'Porta uses 13 reciprocal substitution alphabets selected by paired key letters AB, CD, through YZ. Each row maps the first half of the alphabet to the second and vice versa. For a zero-based row k, a first-half index x maps to 13 + ((x + k) mod 13); a second-half index x maps to (x − 13 − k) mod 13. Applying the same row twice returns the original letter. Pair membership matters: key A and key B select the same row, so apparently different keywords can generate identical row sequences.',
        ],
        [
          'Nihilist coordinate arithmetic',
          'Build the specified 5 × 5 Polybius square, commonly combining I and J. Each letter becomes a two-digit row-column coordinate from 11 through 55. In the usual additive Nihilist system, convert a repeating keyword to coordinates and add its coordinates to plaintext coordinates as ordinary integers. Decode by subtracting the key coordinates first, then look up the resulting pair. Carrying in decimal addition is intentional: 55 + 55 = 110. Do not reduce the total modulo 100 unless the problem explicitly defines a different variant.',
        ],
        [
          'Complete columnar as historical material',
          'For complete columnar transposition, a rectangular message grid is filled row by row and columns are read in the order specified by the key ranking. Repeated key letters require a stated tie-breaking rule, often left-to-right ordering. Complete means the rectangle is filled; padding or message length must be handled as instructed. The ciphertext has the same symbol inventory as the prepared plaintext. To decode, determine column lengths, restore columns to their original positions, and read rows. A coordinate-square method cannot substitute for this position-rearranging procedure.',
        ],
        [
          'The checkerboard update',
          'The supplied syllabus explicitly warns that its older complete-columnar material was replaced by a 5 × 5 checkerboard topic in the referenced rotation. Learn the coordinate principle: a letter is identified by one row label and one column label in a keyed square. The labels themselves may be letters or digits, and their order matters. The lab uses clearly stated 1–5 row and column labels with I/J combined as a teaching convention. A real puzzle may use different labels or additional steps. Check the applicable Division C cipher summary rather than treating an old syllabus as a current rulebook.',
        ],
        [
          'Avoiding mixed conventions',
          'Before solving, write the square, key expansion, label order, and treatment of I/J. For Porta, confirm which key pair selects each row. For Nihilist, show coordinate subtraction before lookup. For columnar, show the column permutation and rectangle dimensions. A result that contains impossible coordinates usually signals an alignment or arithmetic mistake rather than a new alphabet. Test the first few positions in both directions before committing to a long message. Distinguishing the mechanism early prevents spending time applying a correct algorithm to the wrong cipher family.',
        ],
      ],
      terms: [
        ['Polybius square', 'A row-column coordinate alphabet.'],
        ['Reciprocal', 'The same keyed operation encodes and decodes.'],
        ['Key period', 'Length of the repeating key sequence.'],
        ['Column permutation', 'The order in which columns are read or restored.'],
      ],
      example: {
        problem:
          'Using a row-major unkeyed I/J-combined square, encode CAT as coordinates. Add key coordinates for repeated A.',
        steps: [
          'Rows are ABCDE, FGHIK, LMNOP, QRSTU, VWXYZ. C = 13, A = 11, T = 44.',
          'A is 11, so Nihilist addition gives 24, 22, 55.',
          'Subtract 11 from each total to recover 13, 11, 44, then look up CAT.',
        ],
        conclusion: 'Coordinate substitution and integer addition are separate reversible stages.',
      },
      mcq: [
        [
          'In the stated square, T has which coordinate?',
          '44',
          ['45', '34', '54'],
          'T lies in row 4, column 4.',
        ],
        [
          'Which Porta keys select the same alphabet row?',
          'A and B',
          ['A and C', 'C and E', 'Y and A'],
          'Key letters occur in paired rows.',
        ],
        [
          'What does columnar transposition preserve?',
          'Prepared message letter counts',
          ['Letter positions', 'Word boundaries necessarily', 'Polybius coordinates'],
          'It rearranges positions rather than replacing identities.',
        ],
      ],
      written: [
        [
          'What is 55 + 55 in the stated Nihilist convention?',
          '110; ordinary integer addition is used.',
        ],
        [
          'Why specify I/J handling?',
          'A 25-cell square cannot assign separate ordinary cells to all 26 letters; the defined merge affects encoding and interpretation.',
        ],
        [
          'What must a checkerboard solution record?',
          'The keyed square, row and column labels and their order, coordinate pairing, and any preprocessing conventions.',
        ],
        [
          'Why keep columnar labeled historical here?',
          'The supplied syllabus contains a replacement warning; historical learning content does not establish the applicable tournament cipher list.',
        ],
      ],
      flow: [
        ['Prepare', 'Write alphabet tables and key alignment.'],
        ['Transform', 'Perform the correct coordinate or position operation.'],
        ['Reverse', 'Undo steps in reverse order and verify.'],
      ],
      compare: [
        ['Porta', 'Reciprocal keyed alphabet rows', 'AB and other pairs share rows.'],
        ['Nihilist', 'Coordinates plus key coordinates', 'Addition is not a column permutation.'],
        [
          'Checkerboard',
          'Row and column labels locate letters',
          'Use the stated square and labels.',
        ],
      ],
      challenge:
        'Choose the checkerboard mode and compare a keyword square with the unkeyed square. Then use Porta to test reciprocal decoding.',
      takeaway:
        'Tables are explicit mathematical objects: their labels, ordering, and key alignment determine the result.',
    },
    {
      title: 'Baconian and fractionated Morse systems',
      description: 'Binary groups, Morse separators, and fractionation boundaries.',
      objectives: [
        'Decode fixed-width A/B groups.',
        'Separate a carrier from its hidden symbol stream.',
        'Explain Morse fractionation and padding ambiguity.',
      ],
      sections: [
        [
          'Finding the encoded layer',
          'A message can have a readable carrier whose visual properties encode another stream. Two fonts, upper/lower case, or two symbol classes can represent A and B without their visible letters being the plaintext. First identify the binary distinction and preserve its order. A meaningful carrier sentence is not evidence that its literal words are the hidden answer. Record whether the first class means A or B and where grouping begins. A one-position shift in a fixed-width grouping can make every later decoded character wrong.',
        ],
        [
          'Baconian five-symbol groups',
          'The modern 26-letter Baconian convention numbers A through Z from 0 through 25 and writes each index as five binary positions, with A = 0 and B = 1. Thus AAAAA gives A, AAAAB gives B, and AABAA gives E. The historical 24-letter alphabet merges I/J and U/V and changes later assignments; do not silently use one table for the other. Five binary places can represent 32 patterns, leaving unused values in the modern 26-letter convention. An unused pattern signals a convention, alignment, or transcription problem.',
        ],
        [
          'From Morse to a structured stream',
          'International Morse represents letters using dots and dashes of different lengths. Written fractionated-Morse puzzles use a separator symbol, often X, to represent boundaries between letters and usually a doubled separator between words. The exact treatment of word endings and final padding must be given. Without separators, concatenated dots and dashes are ambiguous because a longer sequence may be segmented into different letters. Recovering a substitution alphabet is therefore only part of solving: the recovered stream must also parse into valid Morse letters and word boundaries.',
        ],
        [
          'Fractionating into triples',
          'A common fractionated-Morse convention groups a stream over dot, dash, and X into triples. There are 27 possible triples; a standard 26-entry table omits XXX. An explicitly ordered table maps each triple to a letter of a keyed alphabet. A ciphertext letter then encodes a triple that can cross an original Morse letter boundary. Frequency analysis must account for those cross-boundary groups rather than treating each ciphertext letter as one plaintext letter. Different table orders produce different puzzles, so copy the supplied ordering exactly.',
        ],
        [
          'Working backward through layers',
          'Decode the keyed alphabet substitution first to recover triples, join them into one continuous stream, and then interpret separators and Morse letters. Do not translate each triple independently as though it were a complete Morse character. If a candidate produces impossible separators or a long unparseable run, revisit the mapping. Track padding separately from meaningful message content because final fill symbols can change the apparent last letter. A complete explanation shows the carrier classification, recovered group stream, table lookup, and final linguistic interpretation.',
        ],
        [
          'Checks that expose boundary errors',
          'Use a short message with known repeated letters to test the method. In Baconian, every complete letter consumes five A/B symbols. In fractionated Morse, ciphertext length reflects triples rather than plaintext length, so variable-length Morse letters change the relationship. Count symbols before and after each layer and annotate the groups visibly. If a group seems to cross a word boundary, that may be expected fractionation rather than a mistake. The decisive check is reconstructing the complete intermediate stream and re-encoding it under the same conventions.',
        ],
      ],
      terms: [
        ['Carrier', 'Visible material carrying an encoded distinction.'],
        ['Baconian', 'Five-position binary letter encoding.'],
        ['Fractionation', 'Splitting or regrouping encoded units across original boundaries.'],
        ['Separator', 'Symbol identifying character or word boundaries.'],
      ],
      example: {
        problem: 'Decode AAAAA AAAAB AABAA under the modern 26-letter Baconian convention.',
        steps: [
          'Assign A = 0 and B = 1 within each five-symbol group.',
          'The groups represent binary values 0, 1, and 4.',
          'With A = index 0, those values become A, B, E.',
        ],
        conclusion:
          'The hidden plaintext is ABE; the result depends on the stated 26-letter convention.',
      },
      mcq: [
        [
          'How many binary positions encode one letter here?',
          '5',
          ['2', '3', '26'],
          'Five bits provide 32 possible patterns.',
        ],
        [
          'A fractionated-Morse triple can cross what?',
          'An original letter boundary',
          ['Only a page boundary', 'No boundary ever', 'Only complete words'],
          'Fractionation regroups the continuous stream.',
        ],
        [
          'What must be known before using a Baconian table?',
          'The alphabet convention',
          ['The carrier sentence meaning only', 'The most common English word', 'The paper color'],
          'Historical and modern tables differ.',
        ],
      ],
      written: [
        ['Encode C in the modern Baconian table.', 'AAABA: index 2 is binary 00010.'],
        [
          'Why cannot a triple always be read as one Morse letter?',
          'It may contain fragments from two letters or a separator, so the complete recovered stream must be parsed.',
        ],
        [
          'What can an unused Baconian group indicate?',
          'Wrong class assignment, incorrect grouping, transcription error, or a different alphabet convention.',
        ],
        [
          'Describe a complete verification.',
          'Reconstruct intermediate groups from the proposed plaintext using the same table, separators, and padding, then compare the full encoded stream.',
        ],
      ],
      flow: [
        ['Extract', 'Classify the carrier into the encoded symbol alphabet.'],
        ['Regroup', 'Apply five-bit or triple boundaries consistently.'],
        ['Interpret', 'Decode using the stated table and separators.'],
      ],
      compare: [
        ['Baconian', 'Fixed five-position binary groups', 'Check 24 versus 26 letters.'],
        ['Morse', 'Variable-length dots and dashes', 'Boundaries are necessary.'],
        [
          'Fractionated Morse',
          'Triples of a Morse-plus-separator stream',
          'Triples need not equal letters.',
        ],
      ],
      challenge:
        'Use Baconian mode to encode ABC. Predict the number of A/B symbols before revealing the result.',
      takeaway:
        'Keep each encoding layer and boundary convention visible; reversing only one layer is incomplete.',
    },
    {
      title: 'Xenocrypts and cryptarithms',
      description: 'Language constraints, place value, carries, and numerical consistency.',
      objectives: [
        'Use language-specific evidence in a substitution.',
        'Set up column equations for a cryptarithm.',
        'Verify distinct digits and leading-zero constraints.',
      ],
      sections: [
        [
          'Language changes the evidence',
          'A xenocrypt is a cryptogram in a language other than the solver’s default, commonly a Spanish-language substitution in educational practice. The substitution mechanism remains consistent, but frequency, vocabulary, short words, and grammatical endings differ. Start with the stated alphabet and handling of accents or Ñ. A long word with a familiar shape may be a cognate, but resemblance alone is weak evidence. Check adjective agreement, common function words, and repeated endings against the same two-way letter table used for an English substitution.',
        ],
        [
          'Useful Spanish constraints',
          'Frequent short words such as DE, LA, EL, EN, and Y can offer starting candidates when their patterns fit. Gender and number agreement link word endings across a sentence. Infinitive endings AR, ER, and IR and plural endings can constrain likely suffixes. These are candidate-generating features rather than universal rules for every position. Proper nouns and quotations can depart from expected patterns. Do not insert a Spanish-looking word if it violates an already confirmed substitution elsewhere; global consistency still outranks local fluency.',
        ],
        [
          'Cryptarithms are place-value problems',
          'A cryptarithm assigns digits to letters so an arithmetic statement becomes true. Under the usual convention different letters represent different digits, the same letter always has the same digit, and the leading letter of a multi-digit number is nonzero. State the base; most examples use decimal. Work from columns and carries rather than guessing complete numbers. For addition, a column equation includes both its incoming carry and outgoing carry. Omitting either can yield a locally plausible digit that fails the full sum.',
        ],
        [
          'Using carry constraints',
          'For a two-addend decimal addition the carry from a column is normally 0 or 1. In SEND + MORE = MONEY, the extra leading digit forces M = 1 under ordinary nonzero-leading conventions. This reduces the search dramatically before any arbitrary digit guesses. At the units column D + E = Y + 10c1; the tens column N + R + c1 = E + 10c2. Continue through all columns while keeping assigned digits distinct. A contradiction should eliminate the branch that introduced the uncertain assignment.',
        ],
        [
          'Systematic search and propagation',
          'Maintain domains of possible digits for each letter and update them whenever a carry or sum restricts a column. Choose a constrained letter or carry to branch on, then propagate consequences before trying another guess. In subtraction, multiplication, or other bases, derive the appropriate equations instead of reusing addition rules. Small local checks prevent a large unstructured search. A calculator can verify candidate arithmetic, but it does not replace reasoning about distinctness and place value. Any equipment used in competition must follow the applicable rules.',
        ],
        [
          'What counts as a complete solution',
          'For a xenocrypt, re-encrypt the recovered language text and preserve the stated normalization of accents and spaces. For a cryptarithm, substitute every digit, check the full arithmetic, check uniqueness of assigned digits, and check leading letters. A valid numerical equation can still be an invalid cryptarithm if two different letters share a digit against the stated convention. State when multiple solutions remain possible. The best explanation identifies which constraints forced the result, making the answer reproducible instead of a lucky completed grid.',
        ],
      ],
      terms: [
        ['Xenocrypt', 'A cryptogram in another specified language.'],
        ['Cryptarithm', 'Arithmetic with symbols standing for digits.'],
        ['Carry', 'Place-value transfer to the next column.'],
        ['Domain', 'Remaining possible values for a symbol.'],
      ],
      example: {
        problem: 'Verify the candidate SEND = 9567, MORE = 1085, MONEY = 10652.',
        steps: [
          'Add 9567 + 1085 to obtain 10652.',
          'Check assignments S9 E5 N6 D7 M1 O0 R8 Y2; all eight digits are distinct.',
          'Check leading S and M are nonzero and every repeated letter uses the same digit.',
        ],
        conclusion: 'The candidate satisfies the arithmetic and ordinary cryptarithm constraints.',
      },
      mcq: [
        [
          'What forces M = 1 in the ordinary SEND + MORE example?',
          'The extra leading carry',
          ['Spanish word frequencies', 'The letter M being common', 'Every M always means 1'],
          'Adding two four-digit numbers can produce a leading carry of 1.',
        ],
        [
          'What remains true in a xenocrypt substitution?',
          'Mappings must be globally consistent',
          [
            'English frequency ranks are exact',
            'Every word is a cognate',
            'Accents are always separate symbols',
          ],
          'The language changes evidence, not consistency.',
        ],
        [
          'Why can a numerically true sum still be invalid?',
          'Different letters may share a forbidden digit',
          ['It has any carry', 'It contains a zero internally', 'It uses eight letters'],
          'Digit uniqueness and leading-zero rules are additional constraints.',
        ],
      ],
      written: [
        ['Write the SEND + MORE units equation.', 'D + E = Y + 10c1, with c1 the outgoing carry.'],
        [
          'Why state the base?',
          'Place value, allowable digits, and the carry multiplier depend on the base.',
        ],
        [
          'How should a guessed Spanish DE be tested?',
          'Propagate both letter mappings to all occurrences and check grammar and substitution consistency.',
        ],
        [
          'List all checks on a cryptarithm candidate.',
          'Full arithmetic, consistent repeated letters, distinct digits when required, correct base, and no forbidden leading zeros.',
        ],
      ],
      flow: [
        ['Constrain', 'Use grammar or column equations.'],
        ['Propagate', 'Carry mappings and digit restrictions across the puzzle.'],
        ['Verify', 'Check every symbol and the full transformed statement.'],
      ],
      compare: [
        [
          'Xenocrypt',
          'Language supplies word and grammar clues',
          'Alphabet normalization must be stated.',
        ],
        [
          'Cryptarithm',
          'Place value supplies digit equations',
          'Arithmetic alone is not all constraints.',
        ],
        ['Carry', 'Connects adjacent columns', 'Cannot be omitted from a column equation.'],
      ],
      challenge:
        'Use the substitution workbench on a Spanish phrase such as LA LUNA. Explain which repetitions survive without relying on English frequencies.',
      takeaway:
        'Choose constraints appropriate to the representation: language for letters and place value for digits.',
    },
    {
      title: 'Competition strategy and deliberate practice',
      description: 'Triage, team coordination, timed solving, and diagnostic review.',
      objectives: [
        'Allocate work using expected progress.',
        'Communicate tentative keys precisely.',
        'Turn practice errors into targeted drills.',
      ],
      sections: [
        [
          'Read the actual task first',
          'Before solving, identify the requested direction, cipher family, key information, formatting conventions, and any stated scoring conditions. A page asking for encryption is not solved by writing the inverse operation. The supplied syllabus describes a course rather than a current tournament rulebook, so team size, timing, resource permissions, and cipher eligibility should be confirmed separately. During practice, annotate the information supplied explicitly and distinguish it from your assumptions. This prevents routine recognition from overriding a special instruction in the problem.',
        ],
        [
          'Triage under a finite clock',
          'Estimate how much progress a question offers relative to the time it is likely to consume. A short deterministic coordinate cipher may be a useful early solve, while an unconstrained substitution may need several revisits. Do not treat point value divided by time as a guaranteed score: uncertainty about solving successfully also matters. Mark questions as ready, partially constrained, or currently blocked. Revisit a blocked problem when another clue or teammate insight changes its prospects rather than repeatedly making the same unproductive guesses.',
        ],
        [
          'Divide work and verification',
          'Assign tasks by skills and current workload rather than giving every solver the same page. One teammate can solve while another performs an independent reverse check. Record keys, alphabet direction, and tentative mappings so another person can continue without reconstructing the entire thought process. If two teammates disagree, compare a specific encoded position or column equation rather than debating which sentence sounds more natural. A shared notation for confirmed and tentative entries reduces accidental overwriting and makes handoffs faster under pressure.',
        ],
        [
          'Time checks and switching costs',
          'Use a practice timer to learn where time is actually spent: recognition, setup, transformation, searching, or verification. Switching questions has a cost because context must be recovered, so leave a concise note before moving on. Set a planned check-in point and compare progress with the remaining workload. Exact schedules depend on the rules and test; this lesson does not prescribe tournament timing. Reserve some time for transcription checks because a correct private solution is not useful if the submitted answer omits a symbol or uses the wrong direction.',
        ],
        [
          'Generating reliable practice',
          'Construct a known plaintext, choose a valid key, encode it with an explicit convention, and retain the answer and intermediate steps. A generated puzzle should have a checked key rather than a merely plausible output. Vary message length, repeated-letter patterns, key periods, and table labels. For substitutions, mix easy pattern-rich messages with less predictable text. For arithmetic, include wraparound and carry cases. Generating tests is optional enrichment in the syllabus; learning from checked solutions remains the central task. Use permitted, attributed material when sharing practice sets.',
        ],
        [
          'Review that changes future performance',
          'After a timed run, classify each lost answer as a recognition error, convention error, arithmetic error, unsupported guess, or verification failure. Redo one representative item slowly and write a short prevention rule. Then solve a new item that exercises the same skill; repeating a memorized answer does not show transfer. Track accuracy alongside speed because faster incorrect work can hide a worsening process. Interleave cipher families so each question requires recognition, and periodically recheck older skills to avoid a narrow practice routine.',
        ],
      ],
      terms: [
        ['Triage', 'Prioritizing work under limited time.'],
        ['Verification', 'Checking a solution by reversing the transformation.'],
        ['Interleaving', 'Mixing problem types in practice.'],
        ['Handoff', 'Transferring work with enough context to continue.'],
      ],
      example: {
        problem:
          'Puzzle A offers 100 points with a 0.9 estimated solve probability in 3 minutes; B offers 200 with 0.3 probability in 6 minutes. Compare expected points per minute as a planning aid.',
        steps: [
          'A gives 100 × 0.9 / 3 = 30 expected points per minute.',
          'B gives 200 × 0.3 / 6 = 10 expected points per minute.',
          'Estimates are uncertain; revise them if new constraints make B easier or actual scoring differs.',
        ],
        conclusion:
          'A is a reasonable initial priority under these assumptions; the ratio is a planning heuristic, not a score guarantee.',
      },
      mcq: [
        [
          'Which handoff is most useful?',
          'State cipher, key direction, and confirmed mappings',
          [
            'Write only “almost solved”',
            'Erase all tentative work',
            'Give only the final guessed word',
          ],
          'A new solver needs reproducible state.',
        ],
        [
          'What should follow an arithmetic-error review?',
          'A new problem exercising the corrected skill',
          ['Memorize the old answer only', 'Skip all verification', 'Change every cipher family'],
          'Transfer requires applying the correction to unfamiliar work.',
        ],
        [
          'Which priority follows the example assumptions?',
          'A before B',
          ['B necessarily before A', 'Both guarantee full credit', 'Neither can be compared'],
          'A has the higher estimated expected return per minute.',
        ],
      ],
      written: [
        [
          'Compute A’s expected points per minute.',
          '100 × 0.9 / 3 = 30 expected points/minute under the estimate.',
        ],
        [
          'Why is the heuristic uncertain?',
          'Solve probabilities and times are estimates; dependencies, scoring rules, and later clues can change priorities.',
        ],
        [
          'Give a prevention rule for wrong key direction.',
          'Write plaintext and ciphertext rows explicitly, test one known pair, then re-encrypt the finished answer.',
        ],
        [
          'Design a short interleaved drill.',
          'Mix a shift, a pattern substitution, and a coordinate puzzle; identify the family and conventions before solving and verify each answer.',
        ],
      ],
      flow: [
        ['Assess', 'Read instructions and identify tractable constraints.'],
        ['Coordinate', 'Assign solving and independent checking roles.'],
        ['Review', 'Use error categories to choose the next drill.'],
      ],
      compare: [
        ['Speed', 'Reduces time per operation', 'Must be measured with accuracy.'],
        [
          'Verification',
          'Catches direction and transcription errors',
          'Requires reserved attention.',
        ],
        ['Expected return', 'Helps choose initial priorities', 'Depends on uncertain estimates.'],
      ],
      challenge:
        'Encode an unfamiliar sentence, record two key trials, and describe a handoff that lets another solver verify the output.',
      takeaway:
        'Good strategy connects accurate solving, explicit communication, and evidence from practice.',
    },
  ],
});
