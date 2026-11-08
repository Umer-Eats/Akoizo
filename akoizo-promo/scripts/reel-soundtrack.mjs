import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Original 120 BPM soundtrack for the Reel, synthesized from scratch (no samples).
// Hits, whooshes and rank-up chimes are placed from src/reel/timeline.json so they land on the cuts.
// Writes public/reel/reel-music.wav (music + effects) and public/reel/reel-sfx.wav (effects only,
// for posting with a trending Instagram sound underneath).
const here = path.dirname(fileURLToPath(import.meta.url));
const timeline = JSON.parse(fs.readFileSync(path.join(here, '../src/reel/timeline.json'), 'utf8'));
const rate = 44100;
const seconds = timeline.duration / timeline.fps;
const n = Math.round(rate * seconds);
const beat = 60 / timeline.bpm;
const drop = timeline.drop / timeline.fps;
const fr = (frame) => frame / timeline.fps;

const track = () => [new Float32Array(n), new Float32Array(n)];
const music = track();
const sfx = track();
const synth = track();

// Deterministic noise so every render is identical.
let seed = 7;
const noise = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 2 ** 31 - 1;
};
const midi = (m) => 440 * 2 ** ((m - 69) / 12);

function add(bus, t, dur, fn, pan = 0) {
  const start = Math.floor(t * rate);
  const len = Math.floor(dur * rate);
  const l = Math.cos(((pan + 1) * Math.PI) / 4);
  const r = Math.sin(((pan + 1) * Math.PI) / 4);
  for (let j = 0; j < len; j++) {
    const k = start + j;
    if (k < 0 || k >= n) continue;
    const v = fn(j / rate, j);
    bus[0][k] += v * l * Math.SQRT2;
    bus[1][k] += v * r * Math.SQRT2;
  }
}

// One-pole filters, recomputed per sample so they can sweep.
const lowpass = () => {
  let y = 0;
  return (x, f) => (y += (1 - Math.exp((-2 * Math.PI * f) / rate)) * (x - y));
};
const highpass = () => {
  const lp = lowpass();
  return (x, f) => x - lp(x, f);
};

// --- instruments -------------------------------------------------------------
const kick = (bus, t, g = 1) =>
  add(bus, t, 0.42, (s) => {
    const f = 45 + 110 * Math.exp(-s * 38);
    const ph = 2 * Math.PI * (45 * s + (110 / 38) * (1 - Math.exp(-s * 38)));
    return g * (0.9 * Math.sin(ph) * Math.exp(-s * 7) + (s < 0.004 ? noise() * 0.4 : 0)) * (f > 0 ? 1 : 1);
  });
const clap = (bus, t, g = 0.5) => {
  const hp = highpass();
  add(bus, t, 0.3, (s) => {
    const burst = [0, 0.011, 0.022].some((o) => s >= o && s < o + 0.008) ? 1 : 0;
    const env = burst ? 1 : Math.exp(-(s - 0.025) * 22) * (s > 0.025 ? 1 : 0);
    return g * hp(noise(), 900) * env;
  });
};
const hat = (bus, t, g = 0.16, open = false, pan = 0.2) => {
  const hp = highpass();
  add(bus, t, open ? 0.2 : 0.05, (s) => g * hp(noise(), 7000) * Math.exp(-s * (open ? 18 : 80)), pan);
};
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));
const bass = (bus, t, m, dur, g = 0.32) => {
  const lp = lowpass();
  add(bus, t, dur, (s) => {
    const f = midi(m);
    const x = saw(f * s) * 0.6 + Math.sin(2 * Math.PI * f * 0.5 * s) * 0.7;
    return g * lp(x, 300 + 1400 * Math.exp(-s * 14)) * Math.min(1, s / 0.004) * Math.min(1, (dur - s) / 0.02);
  });
};
const stab = (bus, t, notes, dur, g = 0.07, cutoff = 2600) => {
  const lp = lowpass();
  add(bus, t, dur, (s) => {
    let x = 0;
    for (const m of notes) for (const d of [-0.12, 0, 0.12]) x += saw(midi(m + d) * s + d);
    return g * lp(x, cutoff * Math.exp(-s * 3) + 400) * Math.min(1, s / 0.005) * Math.exp(-s * 2.2);
  });
};
const pluck = (bus, t, m, g = 0.09, pan = 0) =>
  add(bus, t, 0.22, (s) => g * (Math.sin(2 * Math.PI * midi(m) * s) + 0.3 * saw(midi(m) * s)) * Math.exp(-s * 16), pan);
const bell = (bus, t, m, g = 0.22) =>
  add(bus, t, 1.2, (s) => {
    const f = midi(m);
    return (
      g *
      (Math.sin(2 * Math.PI * f * s) * Math.exp(-s * 3) +
        0.5 * Math.sin(2 * Math.PI * f * 2.76 * s) * Math.exp(-s * 6) +
        0.25 * Math.sin(2 * Math.PI * f * 5.4 * s) * Math.exp(-s * 10))
    );
  });

// --- effects -----------------------------------------------------------------
const whoosh = (bus, t, dur = 0.32, g = 0.5) => {
  const lp = lowpass();
  const hp = highpass();
  add(bus, t - dur * 0.75, dur, (s) => {
    const u = s / dur;
    const env = Math.sin(Math.PI * u) ** 2;
    return g * env * lp(hp(noise(), 300 + 2500 * u), 1500 + 7000 * u);
  });
};
const impact = (bus, t, g = 0.9) => {
  kick(bus, t, g);
  add(bus, t, 1.4, (s) => g * 0.7 * Math.sin(2 * Math.PI * (38 * s + 30 * (1 - Math.exp(-s * 6)) / 6)) * Math.exp(-s * 2.6));
  const hp = highpass();
  add(bus, t, 0.5, (s) => g * 0.35 * hp(noise(), 2500) * Math.exp(-s * 9));
};
const crash = (bus, t, g = 0.3) => {
  const hp = highpass();
  add(bus, t, 2.2, (s) => g * hp(noise(), 5000) * Math.exp(-s * 1.8), -0.2);
};
const tick = (bus, t, m = 96, g = 0.14) => add(bus, t, 0.05, (s) => g * Math.sin(2 * Math.PI * midi(m) * s) * Math.exp(-s * 90));
const riser = (bus, t0, t1, g = 0.32) => {
  const hp = highpass();
  const dur = t1 - t0;
  add(bus, t0, dur, (s) => {
    const u = s / dur;
    const tone = Math.sin(2 * Math.PI * (200 * s + 900 * s * u * 0.5));
    return g * u * u * (0.6 * hp(noise(), 400 + 6000 * u) + 0.25 * tone);
  });
};

// --- music -------------------------------------------------------------------
// F minor: Fm – Db – Ab – Eb, one chord per bar (2 s).
const chords = [
  [53, 56, 60],
  [49, 53, 56],
  [56, 60, 63],
  [51, 55, 58],
];
const roots = [41, 37, 44, 39];
const bars = Math.ceil(seconds / (beat * 4));
for (let b = 0; b < bars; b++) {
  const t0 = b * beat * 4;
  const chord = chords[b % 4];
  const full = t0 >= drop - 0.001;
  for (let q = 0; q < 4; q++) {
    const t = t0 + q * beat;
    if (t >= seconds) break;
    // Pre-drop gap: the last half beat before the drop is silent.
    if (t >= drop - beat * 0.5 && t < drop) continue;
    kick(music, t, full ? 0.95 : 0.6);
    if (q % 2 === 1) clap(music, t, full ? 0.5 : 0.32);
    for (let e = 0; e < (full ? 4 : 2); e++) {
      const th = t + e * (beat / (full ? 4 : 2));
      if (th < drop - beat * 0.5 || th >= drop) hat(music, th, e % 2 ? 0.1 : 0.15, false, e % 2 ? 0.35 : -0.2);
    }
    if (full) {
      hat(music, t + beat / 2, 0.11, true, 0.3);
      bass(synth, t + beat / 2, roots[b % 4], beat / 2 - 0.01);
      bass(synth, t + beat * 0.75, roots[b % 4] + 12, beat / 4 - 0.01, 0.2);
    }
  }
  // Arpeggio: 16ths through the chord, quieter and duller before the drop.
  const arp = [...chord, chord[0] + 12, chord[1] + 12, chord[2], chord[1], chord[0] + 12];
  for (let s = 0; s < 16; s++) {
    const t = t0 + s * (beat / 4);
    if (t >= seconds || (t >= drop - beat * 0.5 && t < drop)) continue;
    pluck(synth, t, arp[s % arp.length] + 12, full ? 0.075 : 0.05, s % 2 ? 0.45 : -0.45);
  }
  if (full) {
    stab(synth, t0, chord, 0.45, 0.06);
    stab(synth, t0 + beat * 1.5, chord, 0.3, 0.05);
    stab(synth, t0 + beat * 2.75, chord, 0.3, 0.05);
  }
}

// --- effects on the timeline --------------------------------------------------
for (const bus of [music, sfx]) {
  for (const s of timeline.scenes.slice(1)) if (s.from !== timeline.drop) whoosh(bus, fr(s.from), 0.3, 0.45);
  for (const h of timeline.hits) impact(bus, fr(h), h === timeline.drop ? 1 : 0.55);
  crash(bus, drop, 0.35);
  riser(bus, drop - 2, drop - beat * 0.5, 0.35);
  for (const t of timeline.ticks) tick(bus, fr(t));
  const ranked = timeline.scenes.find((s) => s.id === 'ranked').from;
  const scale = [72, 74, 75, 77, 79, 80, 82, 84];
  timeline.rankSteps.forEach((step, i) => {
    const t = fr(ranked + step);
    if (i < 8) bell(bus, t, scale[i], 0.2);
    else {
      impact(bus, t, 0.8);
      crash(bus, t, 0.3);
      [84, 87, 91, 96].forEach((m, k) => bell(bus, t + k * 0.06, m, 0.16));
    }
  });
  for (const t of timeline.taps) tick(bus, fr(t), 84, 0.3);
  // Count-ups: a tick every other frame while the numbers roll.
  for (const [from, dur] of [[225 + 14, 22], [765 + 12, 18]])
    for (let k = 0; k < dur; k += 2) tick(bus, fr(from + k), 98 + (k % 4), 0.08);
}

// Sidechain: after the drop, synths duck under each kick for a pumping feel.
for (let k = 0; k < n; k++) {
  const t = k / rate;
  const g = t >= drop ? 1 - 0.55 * Math.exp(-(t % beat) * 14) : 1;
  for (let c = 0; c < 2; c++) music[c][k] += synth[c][k] * g;
}

// --- master ------------------------------------------------------------------
function write(bus, file) {
  const out = Buffer.alloc(44 + n * 4);
  let peak = 0;
  const mixed = [new Float32Array(n), new Float32Array(n)];
  // Drive into a soft clipper by a fixed amount, whatever the raw level.
  let raw = 0;
  for (let c = 0; c < 2; c++) for (let k = 0; k < n; k++) raw = Math.max(raw, Math.abs(bus[c][k]));
  const drive = 3.2 / (raw || 1);
  for (let c = 0; c < 2; c++)
    for (let k = 0; k < n; k++) {
      const x = Math.tanh(bus[c][k] * drive);
      mixed[c][k] = x;
      peak = Math.max(peak, Math.abs(x));
    }
  const gain = 0.89 / (peak || 1);
  out.write('RIFF', 0);
  out.writeUInt32LE(36 + n * 4, 4);
  out.write('WAVEfmt ', 8);
  out.writeUInt32LE(16, 16);
  out.writeUInt16LE(1, 20);
  out.writeUInt16LE(2, 22);
  out.writeUInt32LE(rate, 24);
  out.writeUInt32LE(rate * 4, 28);
  out.writeUInt16LE(4, 32);
  out.writeUInt16LE(16, 34);
  out.write('data', 36);
  out.writeUInt32LE(n * 4, 40);
  for (let k = 0; k < n; k++)
    for (let c = 0; c < 2; c++)
      out.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(mixed[c][k] * gain * 32767))), 44 + k * 4 + c * 2);
  fs.writeFileSync(path.join(here, '../public/reel', file), out);
  console.log(`${file}: ${seconds}s, raw peak ${raw.toFixed(2)}`);
}
write(music, 'reel-music.wav');
write(sfx, 'reel-sfx.wav');
