// Checkpoint explanations for Codebusters, keyed by question id.
export const codebusters: Record<string, string> = {
  'code-u1-l1-q1':
    'A transposition only moves letters to new positions, so every letter keeps its identity and the letter counts match the plaintext exactly. A substitution replaces letters, which changes which symbols appear even though the frequency pattern is kept.',
  'code-u1-l1-q2':
    'Every Caesar cipher uses the same rule, shifting each letter along the alphabet; the key is how far to shift (for example +3). The alphabet and layout are fixed parts of the system, and the recovered sentence is the output, not the key.',
  'code-u1-l1-q3':
    'Encrypting your answer with the key you found should reproduce the ciphertext symbol for symbol. A sentence that merely reads well can still contain a wrong letter or a wrong mapping; re-encrypting tests the actual transformation.',
  'code-u1-l1-q4':
    'With A = 0, Z = 25 and O = 14: Z → (25 + 3) mod 26 = 2 = C, and O → 14 + 3 = 17 = R. So ZOO encodes as CRR. Remember to wrap around after Z.',
  'code-u1-l1-q5':
    'If two plaintext letters mapped to the same cipher letter, a reader seeing that cipher letter could not tell which one was meant, so the message could not be decoded uniquely. A one-to-one table guarantees exactly one way back.',
  'code-u1-l1-q6':
    'In a simple substitution each cipher letter always stands for the same plaintext letter. If a guess fits one place but breaks another, the guess or the direction of the mapping is wrong. Revise it until every occurrence agrees.',
  'code-u1-l1-q7':
    'A useful log entry names the cipher type, the assumption that went wrong (for example, reversing the key direction), the corrected method and a short example that re-encrypts correctly. That lets you spot and prevent the same mistake next time.',
  'code-u2-l1-q1':
    'An affine multiplier must share no factor with 26 (be coprime to it). 2 shares the factor 2, so two different letters land on the same cipher letter and decoding is ambiguous. 5, 7 and 25 are all coprime to 26 and therefore valid.',
  'code-u2-l1-q2':
    'Atbash reverses the alphabet: A ↔ Z, B ↔ Y, C ↔ X and so on. Numerically, a letter at position x maps to 25 − x, so A (0) becomes Z (25). The same rule both encodes and decodes.',
  'code-u2-l1-q3':
    'Decoding an affine cipher multiplies by the inverse of a, the number that gives 1 when multiplied by a (mod 26). 5 × 21 = 105 = 4 × 26 + 1, so 21 is the inverse. 5 × 5 = 25, which is not 1 mod 26.',
  'code-u2-l1-q4':
    'Decoding a Caesar +3 means shifting back 3. D is 3, so 3 − 3 = 0, which is A. Check by encoding: A + 3 = D.',
  'code-u2-l1-q5':
    'With a = 2 and b = 0, A (0) becomes 2 × 0 = 0 and N (13) becomes 2 × 13 = 26 ≡ 0 (mod 26). Both give the same cipher letter, so the receiver cannot tell A from N. This happens because 2 shares a factor with 26.',
  'code-u2-l1-q6':
    'Affine encoding is (a·x + b) mod 26. Z = 25, so 5 × 25 + 8 = 133. 133 = 5 × 26 + 3, leaving remainder 3, which is D. Always reduce the result modulo 26.',
  'code-u2-l1-q7':
    'Dividing in modular arithmetic means multiplying by an inverse, which exists only if the number is coprime to 26. If the difference of two equations is even or a multiple of 13, it has no inverse. Then test the possible values of a and check each against the ciphertext.',
  'code-u3-l1-q1':
    'ABBC means four letters where the 2nd and 3rd match and the 1st and 4th are different from each other and from the pair. MEET fits (M, E, E, T). TREE has the pair at the end, NOON has matching ends, and TEAM has no repeat.',
  'code-u3-l1-q2':
    'A patristocrat is a substitution cipher written in fixed groups (usually five letters), so the original spaces between words are hidden. Without word lengths, solvers must rely more on letter frequencies and common letter pairs.',
  'code-u3-l1-q3':
    'To build a keyword alphabet, write the keyword keeping only the first occurrence of each letter, then add the unused letters in order. BALLOON becomes B, A, L, O, N, giving BALON. Repeated letters would make the alphabet non-unique.',
  'code-u3-l1-q4':
    'Number each new letter as it first appears and reuse the number when it repeats: L = 0, E = 1, V = 2, then E = 1 and L = 0. LEVEL has the pattern 0-1-2-1-0, which matches any palindrome with a distinct center.',
  'code-u3-l1-q5':
    'E is the most common letter in long English texts, but a short message or one on a narrow topic can easily favor T, A or another letter. Use frequency as a starting guess and confirm it with patterns and short words.',
  'code-u3-l1-q6':
    'Erristocrats can contain deliberate misspellings, but a wrong letter is more often your own mapping error. First check that the substitution is consistent everywhere and re-encrypts correctly; only then treat the spelling as intentional.',
  'code-u3-l1-q7':
    'Write both alphabets out in full, show how the keyword was reduced to unique letters, list the remaining letters in order and state any shift. That makes it clear whether the keyword is in the plain alphabet (K1), the cipher alphabet (K2) or both (K3).',
  'code-u4-l1-q1':
    'In the standard 5 × 5 square (I/J combined), row 4 is Q R S T U and T is the 4th letter in that row. Coordinates are written row first, then column, so T is 44, not 45 or 54.',
  'code-u4-l1-q2':
    'The Porta table has 13 rows, and each row is chosen by a pair of key letters: A/B, C/D, E/F and so on. A and B pick the same row; A and C pick different rows.',
  'code-u4-l1-q3':
    'Columnar transposition writes the message into rows and reads the columns out in a keyed order. Letters are only moved, never replaced, so the counts of each letter stay the same while positions and word boundaries change.',
  'code-u4-l1-q4':
    'In the Nihilist cipher, plaintext and key coordinates are added as ordinary whole numbers: 55 + 55 = 110. Under this convention you do not drop the hundreds digit or add the digits separately, so a three-digit sum is possible.',
  'code-u4-l1-q5':
    'A 5 × 5 square has 25 cells but the alphabet has 26 letters, so two letters must share a cell, usually I and J. Stating this convention tells solvers how to encode a J and how to read the shared cell when decoding.',
  'code-u4-l1-q6':
    'Record the keyed square, the row and column labels in their order, how the two coordinates are paired and read, and any preparation such as I/J merging or removing spaces. Without these, another solver cannot reproduce or check the answer.',
  'code-u4-l1-q7':
    'The syllabus warns that a newer rule set replaced some cipher types, so having a cipher in the lessons does not mean it will be tested. Labeling columnar as historical stops students from assuming it is on the current tournament list.',
  'code-u5-l1-q1':
    'The Baconian cipher writes each letter as a group of five A/B symbols. Five binary positions give 2⁵ = 32 patterns, enough for 26 letters. Three positions would give only 8.',
  'code-u5-l1-q2':
    'Fractionated Morse turns the message into one continuous stream of dots, dashes and separators, then cuts it into groups of three. Those groups ignore letter boundaries, so one triple can hold the end of one letter and the start of the next.',
  'code-u5-l1-q3':
    'The original Baconian table uses 24 codes, combining I with J and U with V, while the modern table gives all 26 letters their own code. The same group can mean different letters under each, so you must know which table is used.',
  'code-u5-l1-q4':
    'In the modern 26-letter table, A = 0, B = 1, C = 2. Write 2 in five-bit binary: 00010. Replace 0 with A and 1 with B, giving AAABA.',
  'code-u5-l1-q5':
    'Each triple is a fixed-size cut of the continuous Morse stream, so it may include part of one letter, a separator and part of the next. Decode all the triples back into the full stream first, then split at the separators to read letters.',
  'code-u5-l1-q6':
    'A group that maps to no letter means something is off: the A/B classes may be assigned the wrong way round, the groups may be misaligned, a symbol may have been copied wrongly or the wrong alphabet table is being used.',
  'code-u5-l1-q7':
    'Take your proposed plaintext and encode it again with the same table, separators and padding to rebuild each intermediate step. If the complete stream matches the ciphertext exactly, the solution is verified.',
  'code-u6-l1-q1':
    'SEND + MORE is two four-digit numbers whose sum MONEY has five digits. The largest possible sum is 9,999 + 9,999 = 19,998, so the extra leading digit can only be a carry of 1, and M = 1. Letter frequency is irrelevant.',
  'code-u6-l1-q2':
    'A xenocrypt is a substitution in another language, often Spanish. The language changes which letters and words are common, but the cipher rule is the same: each cipher letter maps to one plaintext letter everywhere it appears.',
  'code-u6-l1-q3':
    'A cryptarithm also requires each letter to stand for a different digit and usually forbids a leading zero. An arithmetically correct sum can still break those rules, for example by giving two letters the same digit, so it is not a valid solution.',
  'code-u6-l1-q4':
    'In the ones column, D + E produces the digit Y plus any carry to the tens column: D + E = Y + 10·c₁, where c₁ is 0 or 1. Each column gets an equation like this, and the carries connect them.',
  'code-u6-l1-q5':
    'The base determines which digits are allowed (0–7 in base 8) and the value of a carry (one carry equals the base, not always 10). The same letters can give different solutions in different bases, so it must be stated.',
  'code-u6-l1-q6':
    'If a two-letter word is guessed as DE, apply D and E to every other place those cipher letters appear. The guess holds only if the resulting words make sense in Spanish and the mapping stays consistent throughout.',
  'code-u6-l1-q7':
    'Check that the arithmetic works in every column with carries, that each letter always has the same digit, that different letters have different digits if required, that the base is correct and that no number starts with zero.',
  'code-u7-l1-q1':
    'A teammate taking over needs to know the cipher type, which direction the key runs and which letter mappings are confirmed. With that they can continue without redoing your work. "Almost solved" or a bare guessed word gives them nothing to build on.',
  'code-u7-l1-q2':
    'After finding the error, test the fix on a fresh problem that needs the same skill. Memorizing the old answer only shows you remember it; a new problem shows the corrected method actually works.',
  'code-u7-l1-q3':
    'Using the lesson’s estimates, A gives more expected points per minute than B (A = 100 × 0.9 ÷ 3 = 30). Doing A first banks more points in the same time. This is a planning estimate, not a guarantee.',
  'code-u7-l1-q4':
    'Expected points per minute = points × probability of solving ÷ minutes = 100 × 0.9 ÷ 3 = 90 ÷ 3 = 30. It ranks questions by expected payoff per minute spent.',
  'code-u7-l1-q5':
    'The solve chance and the time needed are guesses that can be wrong. Tiebreak rules, partial credit and clues found in other questions can also change which question is worth doing first.',
  'code-u7-l1-q6':
    'Write out the plaintext alphabet with the cipher alphabet directly beneath it, test one known letter pair to confirm direction, then re-encrypt the final answer. Writing it out removes guesswork about direction.',
  'code-u7-l1-q7':
    'An interleaved drill mixes types, for example a shift cipher, a pattern-based substitution and a coordinate puzzle. For each one, identify the cipher type and its conventions before solving, then verify. Mixing forces you to practice recognizing types.',
  'code-u2-l1-b-q1':
    'A Caesar +3 shift is decoded by moving each letter back 3 places: F → C, D → A, W → T, giving CAT. Check by moving forward 3: C → F, A → D, T → W, which matches FDW. IGZ comes from shifting forward instead.',
  'code-u2-l1-b-q2':
    'A full answer names the shift (+3), shows each letter moving back 3 places (F → C, D → A, W → T) and checks by re-encrypting CAT to get FDW. The check proves the direction of the shift was correct.',
  'code-u2-l1-b-q3':
    'A Caesar cipher moves every letter the same number of places along the alphabet, wrapping from Z back to A. Encrypting moves one way and decrypting moves back the same number of places. The shift amount is the key.',
  'code-u4-l1-b-q1':
    'In a Nihilist cipher, subtract the key number from the cipher number: 65 − 23 = 42. Read 42 as row 4, column 2 of the square, which is R. Check by adding: 42 + 23 = 65.',
  'code-u4-l1-b-q2':
    'A full answer subtracts the key from the ciphertext number as whole numbers (65 − 23 = 42), reads 42 as row 4, column 2 to get R, and checks by adding back 42 + 23 = 65.',
  'code-u4-l1-b-q3':
    'A Polybius square is a 5 × 5 grid of letters where each letter is written as its row and column number, such as 44 for T. I and J usually share a cell so 26 letters fit in 25 squares.',
  'code-u8-l1-b-q1':
    'Six letters in two columns gives three letters per column. Put CTO in the left column and ATO in the right, then read across the rows: CA, TT, OO. Joined, that is CATTOO, which agrees with the crib.',
  'code-u8-l1-b-q2':
    'A full answer shows the column height (6 letters ÷ 2 columns = 3), places CTO in the left column, reads the rows CA, TT and OO, and confirms the result CATTOO agrees with the given crib.',
  'code-u8-l1-b-q3':
    'A transposition cipher rearranges the letters of the message without changing any of them, for example by writing them into a grid and reading columns in a keyed order. Letter counts stay the same; only positions change.',
};
