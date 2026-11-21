import { commons, type Photo } from './presentation-photo-source.ts';

// Figures for the Codebusters presentations, served from public/presentations.
export const photos = {
  'code-caesar': {
    file: 'code-caesar.png',
    width: 960,
    height: 405,
    alt: 'Two alphabet strips with arrows: each letter in the top strip maps to the letter three places earlier in the bottom strip, so E becomes B.',
    caption:
      'A Caesar cipher is a rotation: here every letter shifts three places left, so E becomes B and A wraps around to X.',
    credit: 'Matt Crypto',
    source: commons('Caesar_cipher_left_shift_of_3.svg'),
  },
  'code-vigenere': {
    file: 'code-vigenere.png',
    width: 960,
    height: 960,
    alt: 'A 26 by 26 table of alphabets, each row shifted one letter further than the row above it.',
    caption:
      'A tabula recta: each row is a Caesar alphabet, and a repeating key picks which row encodes each message letter.',
    credit: 'Brandon T. Fields',
    source: commons('Vigenère_square_shading.svg'),
  },
  'code-frequency': {
    file: 'code-frequency.png',
    width: 960,
    height: 768,
    alt: 'A bar chart of English letter frequencies from a to z, with e tallest near 12.7 percent, then t, a, o, i and n, and j, q, x and z near zero.',
    caption:
      'English letter frequencies: E, T, A, O, I and N are common; J, Q, X and Z are rare. Short texts can differ a lot.',
    credit: 'Nandhp',
    source: commons('English_letter_frequency_(alphabetic).svg'),
  },
  'code-morse': {
    file: 'code-morse.png',
    width: 960,
    height: 1229,
    alt: 'A chart of International Morse Code listing the dots and dashes for letters A to Z and digits 0 to 9, with timing rules at the top.',
    caption:
      'International Morse Code: letters use one to four dots and dashes, so a stream without separators is ambiguous.',
    credit: 'Rhey T. Snodgrass and Victor F. Camp',
    source: commons('International_Morse_Code.svg'),
  },
  'code-enigma': {
    file: 'code-enigma.jpg',
    width: 960,
    height: 1047,
    alt: 'An open Enigma machine in a wooden case showing its lamp board, rotors, keyboard and plugboard cables.',
    caption:
      'An Enigma machine: its rotors changed the substitution alphabet at every key press, a mechanical polyalphabetic cipher.',
    credit: 'Alessandro Nassiri',
    source: commons('Enigma_(crittografia)_-_Museo_scienza_e_tecnologia_Milano.jpg'),
  },
  'code-polybius': {
    file: 'code-polybius.png',
    width: 960,
    height: 951,
    alt: 'The 24 Greek capital letters from alpha to omega arranged in five rows of five.',
    caption:
      'Polybius arranged the Greek alphabet in a 5 × 5 grid, so each letter could be sent as a row number and a column number.',
    credit: 'Gre regiment',
    source: commons('Polybius_square.png'),
  },
  'code-alberti': {
    file: 'code-alberti.jpg',
    width: 960,
    height: 960,
    alt: 'Two concentric rings: an outer fixed alphabet with digits 1 to 4 and an inner movable ring of scrambled lowercase letters.',
    caption:
      'Alberti’s cipher disk (1467): turning the inner ring to a new position changes the alphabet, the first polyalphabetic device.',
    credit: 'Augusto Buonafalce',
    source: commons('Alberti_cipher_disk.JPG'),
  },
  'code-skytale': {
    file: 'code-skytale.png',
    width: 960,
    height: 549,
    alt: 'A leather strip wound in a spiral around a rod, with letters written along the rod.',
    caption:
      'A scytale: the message is written along a wound strip, and unwinding it scrambles the letter positions, a transposition.',
    credit: 'Wikimedia Commons',
    source: commons('Skytale.png'),
  },
  'code-zimmermann': {
    file: 'code-zimmermann.jpg',
    width: 500,
    height: 591,
    alt: 'A typed telegram received by the US State Department giving the decrypted German proposal of an alliance with Mexico, signed Zimmermann.',
    caption:
      'The Zimmermann Telegram as decrypted by British codebreakers in 1917: a solved ciphertext that changed the course of a war.',
    credit: 'National Archives',
    source: commons('Zimmermann-telegramm-offen.jpg'),
  },
  'code-confederate-disk': {
    file: 'code-confederate-disk.jpg',
    width: 960,
    height: 640,
    alt: 'A small brass cipher disk with two concentric alphabet rings, resting on a black pouch.',
    caption:
      'A Civil War cipher disk: two alphabet rings that can be turned to any of the 26 Caesar shifts.',
    credit: 'RadioFan',
    source: commons('Confederate_cipher_disk.png'),
  },
  'code-bombe': {
    file: 'code-bombe.jpg',
    width: 960,
    height: 1449,
    alt: 'A tall cabinet with rows of colored rotating drums, a rebuilt Bletchley Park bombe.',
    caption:
      'A rebuilt Bletchley Park bombe: it tested Enigma settings for contradictions, eliminating wrong keys systematically.',
    credit: 'Antoine Taveneaux',
    source: commons('Bletchley_Park_Bombe4.jpg'),
  },
} satisfies Record<string, Photo>;
