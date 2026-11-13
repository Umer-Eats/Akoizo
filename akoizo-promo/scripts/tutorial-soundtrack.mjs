import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Original soundtracks for the ten tutorial Reels, synthesized from scratch (no samples, no
// third-party music). Timing comes from src/tutorials/tutorials.json, the same grid the picture uses:
// hook (build) → drop on step 1 → steps → payoff → call to action.
//   students: bright study-pop, 112.5 BPM (16 frames a beat)
//   coaches:  warm lo-fi house, 100 BPM (18 frames a beat)
// Each tutorial gets its own key and progression. Writes public/tutorials/<id>.wav (music + effects)
// and public/tutorials/<id>-sfx.wav (effects only, for a trending sound added inside Instagram).
// Usage: node scripts/tutorial-soundtrack.mjs [id ...]
const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(here, '../src/tutorials/tutorials.json'), 'utf8'));
const outDir = path.join(here, '../public/tutorials');
fs.mkdirSync(outDir, { recursive: true });
const rate = 44100;
const midi = (m) => 440 * 2 ** ((m - 69) / 12);
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));

// Per-tutorial musical identity: semitone offset from C, and a progression (scale degrees).
const MAJOR = { I: [0, 4, 7], ii: [2, 5, 9], iii: [4, 7, 11], IV: [5, 9, 12], V: [7, 11, 14], vi: [9, 12, 16] };
const SEVENTHS = { I: [0, 4, 7, 11], ii: [2, 5, 9, 12], iii: [4, 7, 11, 14], IV: [5, 9, 12, 16], V: [7, 11, 14, 17], vi: [9, 12, 16, 19] };
const ROOT = { I: 0, ii: 2, iii: 4, IV: 5, V: 7, vi: 9 };
const style = {
  '01-find-your-events': { key: 2, prog: ['I', 'V', 'vi', 'IV'] },
  '02-interactive-lessons': { key: 7, prog: ['vi', 'IV', 'I', 'V'] },
  '03-virtual-labs': { key: 0, prog: ['I', 'iii', 'vi', 'IV'] },
  '04-past-tests': { key: 9, prog: ['vi', 'V', 'IV', 'V'] },
  '05-ranked-tests': { key: 4, prog: ['vi', 'IV', 'I', 'V'] },
  '06-binder-generator': { key: 5, prog: ['I', 'vi', 'IV', 'V'] },
  '07-coach-school-code': { key: 3, prog: ['ii', 'V', 'I', 'vi'] },
  '08-coach-teams': { key: 10, prog: ['IV', 'iii', 'ii', 'I'] },
  '09-coach-assignments': { key: 8, prog: ['I', 'vi', 'ii', 'V'] },
  '10-coach-analytics': { key: 1, prog: ['vi', 'ii', 'V', 'I'] },
};

export function grid(tutorial) {
  const a = data.audiences[tutorial.audience];
  const b = data.beats;
  const bf = a.beatFrames;
  const sections = [];
  let at = 0;
  const push = (id, beats) => {
    sections.push({ id, from: at, dur: beats * bf });
    at += beats * bf;
  };
  push('hook', b.hook);
  tutorial.steps.forEach((_, i) => push(`step${i + 1}`, b.step));
  push('payoff', b.payoff);
  push('cta', b.cta);
  return { bf, bpm: a.bpm, sections, duration: at };
}

function render(tutorial) {
  const { bf, bpm, sections, duration } = grid(tutorial);
  const fps = data.fps;
  const seconds = duration / fps;
  const n = Math.round(rate * seconds);
  const beat = 60 / bpm;
  const drop = sections[1].from / fps;
  const coach = tutorial.audience === 'coach';
  const { key, prog } = style[tutorial.id];
  let seed = [...tutorial.id].reduce((s, c) => (s * 31 + c.charCodeAt(0)) >>> 0, 7);
  const noise = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 31 - 1;
  };
  const track = () => [new Float32Array(n), new Float32Array(n)];
  const drums = track();
  const synth = track();
  const sfx = track();

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
  const lowpass = () => {
    let y = 0;
    return (x, f) => (y += (1 - Math.exp((-2 * Math.PI * f) / rate)) * (x - y));
  };
  const highpass = () => {
    const lp = lowpass();
    return (x, f) => x - lp(x, f);
  };

  // --- instruments -----------------------------------------------------------
  const kick = (bus, t, g = 1) =>
    add(bus, t, 0.42, (s) => {
      const ph = 2 * Math.PI * (45 * s + (110 / 38) * (1 - Math.exp(-s * 38)));
      return g * (0.9 * Math.sin(ph) * Math.exp(-s * 7) + (s < 0.004 ? noise() * 0.4 : 0));
    });
  const clap = (bus, t, g = 0.5) => {
    const hp = highpass();
    add(bus, t, 0.3, (s) => {
      const burst = [0, 0.011, 0.022].some((o) => s >= o && s < o + 0.008) ? 1 : 0;
      const env = burst ? 1 : Math.exp(-(s - 0.025) * 22) * (s > 0.025 ? 1 : 0);
      return g * hp(noise(), 900) * env;
    });
  };
  const rim = (bus, t, g = 0.18) =>
    add(bus, t, 0.06, (s) => g * (Math.sin(2 * Math.PI * 1700 * s) * 0.6 + noise() * 0.4) * Math.exp(-s * 70), 0.15);
  const hat = (bus, t, g = 0.14, open = false, pan = 0.2) => {
    const hp = highpass();
    add(bus, t, open ? 0.2 : 0.05, (s) => g * hp(noise(), 7000) * Math.exp(-s * (open ? 18 : 80)), pan);
  };
  const shaker = (bus, t, g = 0.06) => {
    const hp = highpass();
    add(bus, t, 0.09, (s) => g * hp(noise(), 5000) * Math.sin((Math.PI * s) / 0.09), -0.3);
  };
  const bass = (bus, t, m, dur, g = 0.3) => {
    const lp = lowpass();
    add(bus, t, dur, (s) => {
      const f = midi(m);
      const x = coach ? Math.sin(2 * Math.PI * f * s) * 0.9 + 0.2 * saw(f * s) : saw(f * s) * 0.6 + Math.sin(2 * Math.PI * f * 0.5 * s) * 0.7;
      return g * lp(x, coach ? 500 : 300 + 1400 * Math.exp(-s * 14)) * Math.min(1, s / 0.004) * Math.min(1, (dur - s) / 0.02);
    });
  };
  // Soft detuned pad (coach chords, student lift under the payoff).
  const pad = (bus, t, notes, dur, g = 0.05, cutoff = 1400) => {
    const lp = lowpass();
    add(bus, t, dur, (s) => {
      let x = 0;
      for (const m of notes) for (const d of [-0.08, 0.08]) x += saw(midi(m + d) * s + d);
      const env = Math.min(1, s / 0.08) * Math.min(1, (dur - s) / 0.15);
      return g * lp(x, cutoff) * env;
    });
  };
  // Electric-piano style keys for the lo-fi coach tracks.
  const keys = (bus, t, notes, dur, g = 0.08) =>
    add(bus, t, dur, (s) => {
      let x = 0;
      for (const m of notes) {
        const f = midi(m);
        x += Math.sin(2 * Math.PI * f * s + 0.6 * Math.sin(2 * Math.PI * f * 2 * s) * Math.exp(-s * 5));
      }
      return g * x * Math.exp(-s * 1.6) * Math.min(1, s / 0.004) * (1 + 0.15 * Math.sin(2 * Math.PI * 5 * s));
    });
  const pluck = (bus, t, m, g = 0.08, pan = 0) =>
    add(bus, t, 0.24, (s) => g * (Math.sin(2 * Math.PI * midi(m) * s) + 0.3 * saw(midi(m) * s)) * Math.exp(-s * 15), pan);
  const bell = (bus, t, m, g = 0.2) =>
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
  const whoosh = (bus, t, dur = 0.32, g = 0.45) => {
    const lp = lowpass();
    const hp = highpass();
    add(bus, t - dur * 0.75, dur, (s) => {
      const u = s / dur;
      return g * Math.sin(Math.PI * u) ** 2 * lp(hp(noise(), 300 + 2500 * u), 1500 + 7000 * u);
    });
  };
  const impact = (bus, t, g = 0.8) => {
    kick(bus, t, g);
    add(bus, t, 1.2, (s) => g * 0.6 * Math.sin(2 * Math.PI * (38 * s + (30 * (1 - Math.exp(-s * 6))) / 6)) * Math.exp(-s * 2.8));
    const hp = highpass();
    add(bus, t, 0.45, (s) => g * 0.3 * hp(noise(), 2500) * Math.exp(-s * 9));
  };
  const crash = (bus, t, g = 0.26) => {
    const hp = highpass();
    add(bus, t, 2, (s) => g * hp(noise(), 5000) * Math.exp(-s * 1.9), -0.2);
  };
  const pop = (bus, t, m = 88, g = 0.2) =>
    add(bus, t, 0.09, (s) => g * Math.sin(2 * Math.PI * midi(m) * s * (1 + 0.6 * Math.exp(-s * 60))) * Math.exp(-s * 40));
  const riser = (bus, t0, t1, g = 0.3) => {
    const hp = highpass();
    const dur = t1 - t0;
    add(bus, t0, dur, (s) => {
      const u = s / dur;
      return g * u * u * (0.6 * hp(noise(), 400 + 6000 * u) + 0.25 * Math.sin(2 * Math.PI * (200 * s + 450 * s * u)));
    });
  };

  // --- music -------------------------------------------------------------------
  const base = (coach ? 48 : 52) + key; // chord register
  const bassBase = (coach ? 36 : 40) + key - (key > 6 ? 12 : 0);
  const bars = Math.ceil(seconds / (beat * 4));
  const payoffAt = sections.find((s) => s.id === 'payoff').from / fps;
  for (let b = 0; b < bars; b++) {
    const t0 = b * beat * 4;
    const deg = prog[b % prog.length];
    const chord = (coach ? SEVENTHS : MAJOR)[deg].map((x) => x + base);
    const root = bassBase + ROOT[deg];
    const full = t0 >= drop - 0.001;
    const lift = t0 >= payoffAt - 0.001;
    for (let q = 0; q < 4; q++) {
      const t = t0 + q * beat;
      if (t >= seconds) break;
      if (t >= drop - beat * 0.5 && t < drop) continue; // breath before the drop
      if (!full) {
        // Hook: filtered pulse only, so the drop on step 1 lands.
        if (q % 2 === 0) kick(drums, t, 0.4);
        hat(drums, t + beat / 2, 0.08);
        continue;
      }
      if (coach) {
        // Lo-fi house: kick on every beat, lazy swung hats, rim on 2 and 4.
        kick(drums, t, 0.75);
        if (q % 2 === 1) {
          rim(drums, t);
          clap(drums, t, 0.22);
        }
        hat(drums, t + beat * 0.5 + beat * 0.06, 0.1, true, 0.3);
        shaker(drums, t + beat * 0.25);
        shaker(drums, t + beat * 0.75 + beat * 0.05);
        bass(synth, t + beat * 0.5, root, beat * 0.45, 0.3);
      } else {
        // Study-pop: kick 1 and 3 plus pickups, clap 2 and 4, 8th hats.
        kick(drums, t, q % 2 === 0 ? 0.9 : 0.55);
        if (q === 3) kick(drums, t + beat * 0.5, 0.45);
        if (q % 2 === 1) clap(drums, t, 0.45);
        hat(drums, t, 0.12, false, -0.2);
        hat(drums, t + beat / 2, 0.1, lift && q % 2 === 1, 0.3);
        bass(synth, t + beat / 2, root, beat / 2 - 0.01);
        bass(synth, t + beat * 0.75, root + 12, beat / 4 - 0.01, 0.18);
      }
    }
    if (coach) {
      if (full) keys(synth, t0, chord, beat * 1.8, 0.055);
      if (full) keys(synth, t0 + beat * 2.5, chord, beat * 1.4, 0.04);
      pad(synth, t0, chord, beat * 4, full ? 0.03 : 0.04, full ? 1600 : 700);
    } else {
      // 16th arpeggio through the chord; quieter and duller in the hook.
      const arp = [...chord, chord[0] + 12, chord[1] + 12, chord[2], chord[1], chord[0] + 12];
      for (let s = 0; s < 16; s++) {
        const t = t0 + s * (beat / 4);
        if (t >= seconds || (t >= drop - beat * 0.5 && t < drop)) continue;
        pluck(synth, t, arp[s % arp.length] + 12, full ? 0.07 : 0.045, s % 2 ? 0.45 : -0.45);
      }
      if (lift) pad(synth, t0, chord.map((x) => x + 12), beat * 4, 0.035, 2200);
    }
  }

  // --- effects on the cuts -------------------------------------------------------
  const cue = [];
  const sfxOn = (fn) => {
    fn(drums);
    cue.push(fn);
  };
  sfxOn((bus) => impact(bus, 0, 0.7)); // pattern interrupt on frame 0
  sfxOn((bus) => riser(bus, drop - beat * 3.5, drop - beat * 0.5));
  sfxOn((bus) => impact(bus, drop, 0.95));
  sfxOn((bus) => crash(bus, drop));
  for (const s of sections.slice(2)) sfxOn((bus) => whoosh(bus, s.from / fps));
  // Step stickers pop a beat and a half into each step; payoff and CTA land with a hit.
  sections
    .filter((s) => s.id.startsWith('step'))
    .forEach((s, i) => {
      if (tutorial.steps[i].sticker || tutorial.steps[i].kind === 'ranks') sfxOn((bus) => pop(bus, (s.from + bf * 1.5 + 8) / fps));
    });
  for (const id of ['payoff', 'cta']) {
    const s = sections.find((x) => x.id === id);
    sfxOn((bus) => impact(bus, s.from / fps, 0.55));
  }
  const motif = [0, 4, 7, 12].map((x) => x + 72 + key - (key > 6 ? 12 : 0));
  const cta = sections.find((x) => x.id === 'cta').from / fps;
  motif.forEach((m, i) => sfxOn((bus) => bell(bus, cta + 0.2 + i * beat * 0.5, m, 0.13)));
  for (const fn of cue) fn(sfx);

  // Sidechain: synths duck under the beat after the drop.
  const music = track();
  for (let k = 0; k < n; k++) {
    const t = k / rate;
    const g = t >= drop ? 1 - (coach ? 0.35 : 0.5) * Math.exp(-(t % beat) * 12) : 1;
    // Short tail fade so the Reel loops cleanly.
    const fade = Math.min(1, (seconds - t) / 0.25);
    for (let c = 0; c < 2; c++) {
      music[c][k] = (drums[c][k] + synth[c][k] * g) * fade;
      sfx[c][k] *= fade;
    }
  }
  write(music, n, `${tutorial.id}.wav`);
  write(sfx, n, `${tutorial.id}-sfx.wav`);
  return seconds;
}

function write(bus, n, file) {
  let raw = 0;
  for (let c = 0; c < 2; c++) for (let k = 0; k < n; k++) raw = Math.max(raw, Math.abs(bus[c][k]));
  const drive = 2.6 / (raw || 1);
  let peak = 0;
  const mixed = [new Float32Array(n), new Float32Array(n)];
  for (let c = 0; c < 2; c++)
    for (let k = 0; k < n; k++) {
      mixed[c][k] = Math.tanh(bus[c][k] * drive);
      peak = Math.max(peak, Math.abs(mixed[c][k]));
    }
  const gain = 0.89 / (peak || 1);
  const out = Buffer.alloc(44 + n * 4);
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
  fs.writeFileSync(path.join(outDir, file), out);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const only = process.argv.slice(2);
  for (const t of data.tutorials) {
    if (only.length && !only.includes(t.id)) continue;
    console.log(`${t.id}: ${render(t).toFixed(2)}s`);
  }
}
