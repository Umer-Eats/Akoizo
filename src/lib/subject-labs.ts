export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const cleanLetters = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, '');
export function keyedAlphabet(key: string, square = false) {
  const letters = cleanLetters(key + alphabet).replace(square ? /J/g : /$^/g, 'I');
  return [...new Set(letters)].join('');
}
export type CipherMode =
  | 'Caesar'
  | 'Atbash'
  | 'Affine'
  | 'Porta'
  | 'Checkerboard'
  | 'Nihilist'
  | 'Baconian'
  | 'Fractionated Morse'
  | 'Complete columnar';
const mod = (n: number, base = 26) => ((n % base) + base) % base;
const morse = [
  '.-',
  '-...',
  '-.-.',
  '-..',
  '.',
  '..-.',
  '--.',
  '....',
  '..',
  '.---',
  '-.-',
  '.-..',
  '--',
  '-.',
  '---',
  '.--.',
  '--.-',
  '.-.',
  '...',
  '-',
  '..-',
  '...-',
  '.--',
  '-..-',
  '-.--',
  '--..',
];
const triples = ['.', '-', 'X']
  .flatMap((a) => ['.', '-', 'X'].flatMap((b) => ['.', '-', 'X'].map((c) => a + b + c)))
  .filter((s) => s !== 'XXX');
export function cipherTransform(
  text: string,
  mode: CipherMode,
  shift: number,
  multiplier: number,
  keyword: string,
  decode = false,
): string {
  const key = cleanLetters(keyword) || 'A';
  const words = text.toUpperCase().trim().split(/\s+/).map(cleanLetters).filter(Boolean);
  const square = keyedAlphabet(keyword, true);
  const coord = (ch: string) => {
    const i = square.indexOf(ch === 'J' ? 'I' : ch);
    return (Math.floor(i / 5) + 1) * 10 + (i % 5) + 1;
  };
  const fromCoord = (n: number) => {
    const row = Math.floor(n / 10) - 1,
      col = (n % 10) - 1;
    if (row < 0 || row > 4 || col < 0 || col > 4)
      throw new Error(
        'The decoded coordinate is outside the stated 1–5 square. Check key and grouping.',
      );
    return square[row * 5 + col];
  };
  if (mode === 'Checkerboard' || mode === 'Nihilist') {
    const keyCodes = [...key].map(coord);
    if (decode) {
      let i = 0;
      return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => {
          if (token === '/') return ' ';
          if (!/^\d+$/.test(token))
            throw new Error('Use space-separated numerical groups; / separates words.');
          const n = Number(token) - (mode === 'Nihilist' ? keyCodes[i++ % keyCodes.length] : 0);
          return fromCoord(n);
        })
        .join('');
    }
    let i = 0;
    return words
      .map((word) =>
        [...word]
          .map((ch) => coord(ch) + (mode === 'Nihilist' ? keyCodes[i++ % keyCodes.length] : 0))
          .join(' '),
      )
      .join(' / ');
  }
  if (mode === 'Baconian') {
    if (decode)
      return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((group) => {
          if (group === '/') return ' ';
          if (!/^[AB]{5}$/i.test(group))
            throw new Error('Each modern Baconian group must have five A/B symbols.');
          const n = parseInt(group.toUpperCase().replace(/A/g, '0').replace(/B/g, '1'), 2);
          if (n > 25) throw new Error('This group is unused in the modern 26-letter convention.');
          return alphabet[n];
        })
        .join('');
    return words
      .map((word) =>
        [...word]
          .map((ch) =>
            alphabet.indexOf(ch).toString(2).padStart(5, '0').replace(/0/g, 'A').replace(/1/g, 'B'),
          )
          .join(' '),
      )
      .join(' / ');
  }
  if (mode === 'Fractionated Morse') {
    const keyed = keyedAlphabet(keyword);
    if (decode) {
      const stream = [...cleanLetters(text)]
        .map((ch) => triples[keyed.indexOf(ch)])
        .join('')
        .replace(/X+$/, '');
      return stream
        .split('XX')
        .map((word) =>
          word
            .split('X')
            .map((code) => {
              const n = morse.indexOf(code);
              if (n < 0)
                throw new Error(
                  'The recovered Morse stream cannot be parsed under this convention.',
                );
              return alphabet[n];
            })
            .join(''),
        )
        .join(' ');
    }
    let stream = words
      .map((word) => [...word].map((ch) => morse[alphabet.indexOf(ch)]).join('X'))
      .join('XX');
    while (stream.length % 3) stream += 'X';
    return (
      stream
        .match(/.{3}/g)
        ?.map((group) => keyed[triples.indexOf(group)])
        .join('') ?? ''
    );
  }
  if (mode === 'Complete columnar') {
    const width = key.length,
      order = [...key]
        .map((ch, i) => ({ ch, i }))
        .sort((a, b) => a.ch.localeCompare(b.ch) || a.i - b.i)
        .map((k) => k.i);
    let prepared = cleanLetters(text);
    if (decode) {
      if (prepared.length % width)
        throw new Error('Complete-columnar ciphertext length must fill the rectangle.');
      const rows = prepared.length / width,
        columns = Array<string>(width).fill('');
      order.forEach((i, n) => (columns[i] = prepared.slice(n * rows, (n + 1) * rows)));
      return Array.from({ length: rows }, (_, r) => columns.map((col) => col[r]).join('')).join('');
    }
    while (prepared.length % width) prepared += 'X';
    return order
      .map((col) =>
        Array.from({ length: prepared.length / width }, (_, r) => prepared[r * width + col]).join(
          '',
        ),
      )
      .join('');
  }
  const inverse = Array.from({ length: 26 }, (_, i) => i).find((i) => mod(i * multiplier) === 1);
  if (mode === 'Affine' && inverse === undefined)
    throw new Error('Affine multiplier must be coprime to 26.');
  let position = 0;
  return text.toUpperCase().replace(/[A-Z]/g, (ch) => {
    const x = alphabet.indexOf(ch);
    if (mode === 'Atbash') return alphabet[25 - x];
    if (mode === 'Porta') {
      const row = Math.floor(alphabet.indexOf(key[position++ % key.length]) / 2);
      return alphabet[x < 13 ? 13 + mod(x + row, 13) : mod(x - 13 - row, 13)];
    }
    return alphabet[
      mode === 'Affine'
        ? mod(decode ? inverse! * (x - shift) : multiplier * x + shift)
        : mod(x + (decode ? -shift : shift))
    ];
  });
}

export function vegetation(nir: number, red: number, blue: number) {
  const nd = nir + red,
    ev = nir + 6 * red - 7.5 * blue + 1;
  return {
    ndvi: Math.abs(nd) < 1e-10 ? null : (nir - red) / nd,
    evi: Math.abs(ev) < 1e-10 ? null : (2.5 * (nir - red)) / ev,
  };
}
const divide = (n: number, d: number) => (d === 0 ? null : n / d);
export function epiMeasures(a: number, b: number, c: number, d: number) {
  const exposed = divide(a, a + b),
    unexposed = divide(c, c + d);
  return {
    exposed,
    unexposed,
    rr: exposed === null || unexposed === null || unexposed === 0 ? null : exposed / unexposed,
    or: divide(a * d, b * c),
    sensitivity: divide(a, a + c),
    specificity: divide(d, b + d),
    ppv: divide(a, a + b),
    npv: divide(d, c + d),
  };
}
export function stellar(temperature: number, radius: number, distance: number) {
  const luminosity = radius ** 2 * (temperature / 5772) ** 4;
  return {
    luminosity,
    flux: luminosity / (distance / 10) ** 2,
    peak: 2.898e6 / temperature,
    modulus: 5 * Math.log10(distance / 10),
    parallax: 1 / distance,
  };
}
export function plantResponse(light: number, opening: number, water: number, dryness: number) {
  // Relative indices only; not a fitted biochemical or hydraulic model.
  const gain = ((100 * light) / (light + 30)) * (opening / 100) * (water / 100);
  const loss = 100 * (opening / 100) * (dryness / 100) * (water / 100);
  return { gain, loss };
}
export function sampleStats(values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sd =
    values.length < 2
      ? null
      : Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / (values.length - 1));
  return { mean, sd, range: Math.max(...values) - Math.min(...values) };
}
export type ExperimentSettings = {
  slope: number;
  noise: number;
  offset: number;
  replicates: number;
  confounded: boolean;
  randomized: boolean;
  anomaly: boolean;
  run: number;
};
export function experimentData(s: ExperimentSettings) {
  // Deterministic synthetic noise, changing reproducibly between runs. No real observations implied.
  const order = Array.from({ length: 3 * s.replicates }, (_, i) => i);
  if (s.randomized)
    order.sort((a, b) => Math.sin((a + 1) * 12.9898 + s.run) - Math.sin((b + 1) * 12.9898 + s.run));
  const observations = order.map((id, index) => {
    const level = Math.floor(id / s.replicates) + 1;
    const jitter = Math.sin((id + 1) * 23.17 + s.run * 7.1) * s.noise;
    return {
      level,
      trial: (id % s.replicates) + 1,
      order: index + 1,
      value:
        10 +
        s.slope * level +
        s.offset +
        jitter +
        (s.confounded ? index * 0.6 : 0) +
        (s.anomaly && id === 0 ? 15 : 0),
    };
  });
  return {
    observations,
    groups: [1, 2, 3].map((level) => ({
      level,
      ...sampleStats(observations.filter((o) => o.level === level).map((o) => o.value)),
    })),
  };
}
