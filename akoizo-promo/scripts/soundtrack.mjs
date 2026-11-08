import fs from "node:fs";
const rate = 44100,
  seconds = 30,
  n = rate * seconds,
  data = new Float32Array(n);
const add = (t, d, fn) => {
  for (let j = 0; j < d * rate && t * rate + j < n; j++) {
    const k = Math.floor(t * rate) + j;
    if (k >= 0) data[k] += fn(j / rate, j);
  }
};
const midi = (m) => 440 * 2 ** ((m - 69) / 12);
const chords = [
  [50, 57, 62, 65, 69],
  [46, 53, 58, 62, 65],
  [53, 60, 65, 69, 72],
  [48, 55, 60, 64, 67],
];
for (let c = 0; c < 8; c++) {
  const t = c * 3.75;
  for (const m of chords[c % 4])
    add(
      t,
      4.3,
      (s) =>
        0.027 *
        Math.sin(2 * Math.PI * midi(m) * s) *
        Math.min(1, s / 0.5) *
        Math.exp(-s * 0.37),
    );
}
for (let i = 0; i < 64; i++) {
  const t = i * 0.46875;
  const chord = chords[Math.floor(t / 3.75) % 4];
  const m = chord[[0, 2, 4, 1, 3, 2, 4, 3][i % 8]] + 12;
  add(
    t,
    0.8,
    (s) =>
      0.075 *
      (Math.sin(2 * Math.PI * midi(m) * s) +
        0.16 * Math.sin(4 * Math.PI * midi(m) * s)) *
      Math.exp(-s * 7) *
      Math.min(1, s / 0.008),
  );
  if (i % 2 === 0)
    add(
      t,
      0.3,
      (s) =>
        0.27 *
        Math.sin(2 * Math.PI * (48 * s + 4 * (1 - Math.exp(-s * 26)))) *
        Math.exp(-s * 18),
    );
  if (i % 4 === 2)
    add(t, 0.14, (s, j) => 0.055 * Math.sin(j * j * 1.782) * Math.exp(-s * 35));
  add(
    t + 0.234375,
    0.07,
    (s, j) => 0.022 * Math.sin(j * j * 0.731) * Math.exp(-s * 60),
  );
}
for (const t of [4, 8.5, 14, 19, 24])
  add(
    t - 0.32,
    0.65,
    (s, j) =>
      0.038 * Math.sin(j * j * 0.997) * Math.sin((Math.PI * s) / 0.65) ** 2,
  );
const buffer = Buffer.alloc(44 + n * 4);
buffer.write("RIFF");
buffer.writeUInt32LE(buffer.length - 8, 4);
buffer.write("WAVEfmt ", 8);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(2, 22);
buffer.writeUInt32LE(rate, 24);
buffer.writeUInt32LE(rate * 4, 28);
buffer.writeUInt16LE(4, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(n * 4, 40);
for (let i = 0; i < n; i++) {
  const t = i / rate;
  const gain = Math.min(1, t / 0.4, (30 - t) / 1.4);
  const l = Math.tanh(data[i] * 1.25) * gain;
  const r =
    Math.tanh(
      (data[i] * 0.92 + (data[Math.max(0, i - 441)] || 0) * 0.08) * 1.25,
    ) * gain;
  buffer.writeInt16LE(Math.round(l * 28000), 44 + i * 4);
  buffer.writeInt16LE(Math.round(r * 28000), 46 + i * 4);
}
fs.writeFileSync(new URL("../public/soundtrack.wav", import.meta.url), buffer);
