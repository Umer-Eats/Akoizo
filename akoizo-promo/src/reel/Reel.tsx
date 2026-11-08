import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { RankBadge } from "@/components/rank-badge";
import { RANK_NAMES } from "@/lib/competitive-rating";
import timeline from "./timeline.json";
import { Backdrop, C, Chip, Head, Screen, Sticker, Whip, body, display, mono, pop, shake, shakeAll } from "./kit";

const at = Object.fromEntries(timeline.scenes.map((s) => [s.id, s]));

// 0–2s. Curiosity hook, readable on the very first frame.
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const s = shake(f, 16, 18);
  const underline = interpolate(f, [22, 34], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.75 }}>
        <div
          style={{
            position: "absolute",
            width: 1080,
            height: 1920,
            transformOrigin: "540px 300px",
            transform: `scale(${2.6 + f * 0.006})`,
          }}
        >
          <OffthreadVideo src={staticFile("reel/hero.mp4")} trimBefore={45} muted style={{ width: 1080, height: 1920 }} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #050608cc 0%, #05060855 35%, #050608ee 70%)" }} />
      <div style={{ position: "absolute", left: 80, top: 330 }}>
        <Chip label="Science Olympiad" delay={-10} />
      </div>
      <div style={{ position: "absolute", left: 80, top: 470, transform: `translate(${s.x}px, ${s.y}px)` }}>
        <Head text="The *Science*|*Olympiad* site|nobody told|you about." size={124} delay={-12} stagger={4} />
        <svg width="440" height="40" style={{ position: "absolute", left: 0, top: 372 }} viewBox="0 0 560 40" preserveAspectRatio="none">
          <path
            d="M6 26 C120 8, 260 34, 380 16 S 520 18, 552 22"
            stroke={C.accent}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={underline}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// 2–4s. FREE, one letter per beat.
const Free: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beats = [8, 15, 22, 30];
  const s = shakeAll(f, beats, 14);
  return (
    <AbsoluteFill style={{ background: C.blue, transform: `translate(${s.x}px, ${s.y}px)` }}>
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(#ffffff26 3px, transparent 3px)",
          backgroundSize: "54px 54px",
          backgroundPosition: `${f}px ${f}px`,
          opacity: 0.6,
        }}
      />
      <div style={{ position: "absolute", left: 80, top: 520 }}>
        <Head text="And it's" size={100} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 640,
          display: "flex",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 340,
          letterSpacing: -14,
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {"FREE.".split("").map((ch, i) => {
          const p = spring({ frame: f - (beats[Math.min(i, 3)] + (i === 4 ? 4 : 0)), fps, config: { damping: 11, stiffness: 300, mass: 0.5 } });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: p > 0.02 ? 1 : 0,
                transform: `scale(${interpolate(p, [0, 1], [2.6, 1])}) rotate(${(1 - p) * (i % 2 ? 12 : -12)}deg)`,
                textShadow: "0 20px 0 #0a2a9a",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 84, top: 1030 }}>
        <Head text="For every student.|Forever." size={76} delay={34} stagger={2} hl="#fff" hlText={C.blue} />
      </div>
      <Sticker at={40} x={700} y={330} rotate={12} bg="#fff" color={C.blue} size={90}>
        $0
      </Sticker>
    </AbsoluteFill>
  );
};

// 4–6s. The problem: a pile of scattered files, then it collapses.
const files: [string, string, string][] = [
  ["PDF", "astronomy_2019_FINAL(3).pdf", C.red],
  ["???", "answer key — not found", "#ffb020"],
  ["DOC", "binder_v7_REAL_final.docx", "#4d9bff"],
  ["PDF", "rules_manual_2027.pdf", C.red],
  ["TAB", "47 tabs open", "#9aa3b5"],
  ["???", "is this even 2027 rules?", "#ffb020"],
];
const Chaos: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const starts = [4, 11, 18, 26, 33, 40];
  const implode = interpolate(f, [47, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 300, opacity: 1 - implode }}>
        <Head text="Still studying|like *this?*" size={118} hl={C.red} />
      </div>
      {files.map(([tag, name, color], i) => {
        const p = spring({ frame: f - starts[i], fps, config: { damping: 10, stiffness: 240, mass: 0.5 } });
        if (f < starts[i]) return null;
        const y = 640 + i * 132;
        const x = 70 + ((i * 97) % 3) * 40;
        const rot = [-5, 4, -3, 6, -6, 3][i];
        const jitter = Math.sin((f + i * 7) * 1.7) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "22px 30px",
              background: "#14161d",
              border: "2px solid #ffffff22",
              borderRadius: 22,
              boxShadow: "0 20px 50px #000a",
              fontFamily: mono,
              fontSize: 38,
              color: "#e9ecf3",
              whiteSpace: "nowrap",
              transformOrigin: `${540 - x}px ${960 - y}px`,
              transform: `rotate(${rot + jitter * 0.3 + implode * 40}deg) scale(${interpolate(p, [0, 1], [1.6, 1]) * (1 - implode * 0.95)})`,
              opacity: Math.min(1, p * 3) * (1 - implode),
            }}
          >
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 28, background: color, color: "#000", padding: "6px 12px", borderRadius: 8 }}>
              {tag}
            </span>
            {name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 6–7.5s. The drop: logo slam.
const Logo: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 9, stiffness: 200, mass: 0.7 } });
  const s = shake(f, 0, 26, 12);
  return (
    <AbsoluteFill style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
      <svg width="1080" height="1920" style={{ position: "absolute" }}>
        {Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const r0 = 200 + f * 60;
          const len = 160 + (i % 3) * 90;
          return (
            <line
              key={i}
              x1={540 + Math.cos(a) * r0}
              y1={820 + Math.sin(a) * r0}
              x2={540 + Math.cos(a) * (r0 + len)}
              y2={820 + Math.sin(a) * (r0 + len)}
              stroke={i % 2 ? C.accent : "#fff"}
              strokeWidth={6}
              strokeLinecap="round"
              opacity={interpolate(f, [0, 16], [0.9, 0], { extrapolateRight: "clamp" })}
            />
          );
        })}
        {[0, 6].map((d) => (
          <circle
            key={d}
            cx={540}
            cy={820}
            r={Math.max(0, (f - d) * 40)}
            fill="none"
            stroke={C.accent}
            strokeWidth={8}
            opacity={interpolate(f - d, [0, 20], [0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 560,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${interpolate(p, [0, 1], [0.3, 1])}) rotate(${(1 - p) * -8}deg)`,
        }}
      >
        <Img src={staticFile("reel/akoizo-logo.svg")} style={{ width: 250, height: 250, filter: "drop-shadow(0 0 40px #4d7cffaa)" }} />
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 210, letterSpacing: -10, color: "#fff", marginTop: -10 }}>
          akoizo
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1110 }}>
        <Head text="Every SciOly tool.|*One place.*" size={92} align="center" delay={12} stagger={2} />
      </div>
    </AbsoluteFill>
  );
};

// A product feature: index chip, two-line headline, the recorded app clip.
const Feature: React.FC<{
  n: string;
  label: string;
  title: string;
  dur: number;
  screen: React.ComponentProps<typeof Screen>;
  children?: React.ReactNode;
  hl?: string;
  hlText?: string;
}> = ({ n, label, title, dur, screen, children, hl, hlText }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", left: 80, top: 236 }}>
      <Chip n={n} label={label} />
    </div>
    <div style={{ position: "absolute", left: 80, top: 330 }}>
      <Head text={title} size={100} delay={2} stagger={2} hl={hl} hlText={hlText} />
    </div>
    <Screen zoomAt={[8, dur]} delay={3} {...screen} />
    {children}
  </AbsoluteFill>
);

const Count: React.FC<{ to: number; from: number; dur: number; suffix?: string }> = ({ to, from, dur, suffix = "" }) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [from, from + dur], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  return (
    <>
      {v}
      {suffix}
    </>
  );
};

const Events: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(f, fps, 12);
  return (
    <Feature
      n="01"
      label="Every event"
      title="Every *2027*|event. Covered."
      dur={75}
      screen={{ clip: "catalog", from: 2.3, rate: 2.7, zoom: [1, 1.15], focus: [540, 900, 540, 1100] }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 1180,
          padding: "26px 38px",
          borderRadius: 34,
          background: C.blue,
          boxShadow: "0 30px 80px #000c",
          transform: `rotate(-6deg) scale(${interpolate(p, [0, 1], [1.8, 1])})`,
          opacity: Math.min(1, p * 3),
          fontFamily: display,
          color: "#fff",
          zIndex: 4,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 150, lineHeight: 0.9, letterSpacing: -6 }}>
          <Count to={63} from={14} dur={22} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: 3 }}>EVENTS · DIV A · B · C</div>
      </div>
    </Feature>
  );
};

const Lessons: React.FC = () => (
  <Feature
    n="02"
    label="Lessons"
    title="Lessons you|can *play* with."
    dur={75}
    screen={{ clip: "lesson", from: 3.55, rate: 1.0, zoom: [1, 1.5], zoomAt: [30, 75], focus: [540, 900, 540, 1250] }}
  >
    <Sticker at={20} x={640} y={700} rotate={7}>
      Interactive models
    </Sticker>
  </Feature>
);

const Labs: React.FC = () => (
  <Feature
    n="03"
    label="Virtual labs"
    title="Run the lab.|*Record real data.*"
    dur={75}
    screen={{ clip: "lab", from: 1.9, rate: 2.6, zoom: [1, 1.2], focus: [540, 960, 540, 1100] }}
  >
    <Sticker at={24} x={600} y={1150} rotate={-7} bg={C.gold}>
      No lab coat needed
    </Sticker>
  </Feature>
);

const Tests: React.FC = () => (
  <Feature
    n="04"
    label="Past tests"
    title="Real past tests.|*Auto-graded.*"
    dur={75}
    screen={{ clip: "paper", from: 1.05, rate: 1.75, zoom: [1, 1.3], focus: [540, 700, 540, 800] }}
  >
    <Sticker at={18} x={680} y={760} rotate={8} bg="#2fd07a">
      ✓ Graded
    </Sticker>
    <Sticker at={34} x={70} y={1240} rotate={-8}>
      +2 pts
    </Sticker>
    <Sticker at={48} x={740} y={1380} rotate={6}>
      +2 pts
    </Sticker>
  </Feature>
);

// 17.5–21.5s. Ranked: climb the real Akoizo rank ladder, Iron to Radiant.
const Ranked: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = timeline.rankSteps;
  const idx = steps.filter((s) => f >= s).length - 1;
  const last = idx >= 0 ? steps[idx] : 0;
  const name = idx >= 0 ? RANK_NAMES[idx] : "Unranked";
  const radiant = idx === 8;
  const p = spring({ frame: f - last, fps, config: { damping: 9, stiffness: 260, mass: 0.5 } });
  const s = shakeAll(f, radiant ? [steps[8]] : steps.slice(0, idx + 1), radiant ? 26 : 8);
  const colors = ["#cdd5dd", "#f2be8c", "#f1f5f9", "#ffe08a", "#a7f3e4", "#dccbff", "#b4f2c4", "#ffb3c5", "#ffe08a"];
  const color = idx >= 0 ? colors[idx] : C.muted;
  const rr = interpolate(f - last, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
      {radiant && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 46%, #f0c04066, transparent 60%)`,
            opacity: interpolate(f - steps[8], [0, 4, 40], [1, 0.9, 0.55], { extrapolateRight: "clamp" }),
          }}
        />
      )}
      <div style={{ position: "absolute", left: 80, top: 236 }}>
        <Chip n="05" label="Ranked tests" />
      </div>
      <div style={{ position: "absolute", left: 80, top: 330 }}>
        <Head text="Ranked tests.|Climb to *Radiant.*" size={100} delay={2} stagger={2} hl={C.gold} hlText={C.ink} />
      </div>
      <div style={{ position: "absolute", left: 80, right: 60, top: 560, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {["AI-built", "Locked full screen", "Instant score"].map((t, i) => (
          <Chip key={t} label={t} delay={8 + i * 5} style={{ fontSize: 26, padding: "10px 20px", letterSpacing: 2 }} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 230,
          top: 680,
          width: 460,
          height: 460,
          transform: `scale(${interpolate(p, [0, 1], [1.35, 1])}) rotate(${radiant ? (f - steps[8]) * 0.6 : 0}deg)`,
          filter: `drop-shadow(0 0 ${radiant ? 70 : 30}px ${color}88)`,
          color: C.muted,
        }}
      >
        <RankBadge rank={{ name, tier: radiant || idx < 0 ? null : 3 }} size={460} />
      </div>
      {radiant &&
        Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2;
          const d = (f - steps[8]) * (22 + (i % 4) * 7);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 540 + Math.cos(a) * d - 9,
                top: 910 + Math.sin(a) * d - 9,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: i % 2 ? C.gold : "#fff",
                opacity: interpolate(f - steps[8], [0, 30], [1, 0], { extrapolateRight: "clamp" }),
              }}
            />
          );
        })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: radiant ? 120 : 104,
          letterSpacing: radiant ? 10 : 4,
          color,
          textTransform: "uppercase",
          textShadow: radiant ? `0 0 40px ${C.gold}` : "none",
          transform: `scale(${interpolate(p, [0, 1], [1.4, 1])})`,
        }}
      >
        {name}
      </div>
      <div style={{ position: "absolute", left: 190, width: 700, top: 1335, height: 18, borderRadius: 9, background: "#ffffff1c", overflow: "hidden" }}>
        <div style={{ width: `${radiant ? 100 : Math.max(8, rr * 100)}%`, height: "100%", background: color, borderRadius: 9 }} />
      </div>
      {idx >= 0 && !radiant && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            top: 1395 - (f - last) * 3,
            fontFamily: mono,
            fontSize: 38,
            color: "#7dffb0",
            opacity: interpolate(f - last, [0, 3, 9, 12], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
          }}
        >
          +{18 + idx * 3} RR
        </div>
      )}
      {radiant && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1395, textAlign: "center", fontFamily: mono, fontSize: 34, letterSpacing: 3, color: "#fff", opacity: interpolate(f - steps[8], [6, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          ONLY THE TOP 5 HOLD IT
        </div>
      )}
    </AbsoluteFill>
  );
};

const Binder: React.FC = () => (
  <Feature
    n="06"
    label="Binders"
    title="Your binder,|*built for you.*"
    dur={60}
    screen={{ clip: "binder", from: 1.4, rate: 3.0, zoom: [1, 1.15], focus: [540, 960, 540, 1100] }}
  >
    <Sticker at={18} x={620} y={1180} rotate={-6}>
      + Cheatsheets
    </Sticker>
  </Feature>
);

const Coaches: React.FC = () => (
  <Feature
    n="07"
    label="For coaches"
    title="Coaches:|*teams in seconds.*"
    dur={60}
    screen={{ clip: "teams", from: 3.0, rate: 2.2, zoom: [1, 1.25], focus: [540, 1000, 540, 1100] }}
  >
    {["Teams", "Assignments", "Analytics"].map((t, i) => (
      <Sticker key={t} at={14 + i * 6} x={[60, 600, 90][i]} y={[1060, 1240, 1420][i]} rotate={[-7, 6, -4][i]} bg={i === 1 ? C.gold : "#fff"}>
        {t}
      </Sticker>
    ))}
  </Feature>
);

// 25.5–27.5s. Social proof.
const Proof: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(f, fps, 28);
  const s = shake(f, 30, 18);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 360 }}>
        <Head text="Built by a|*high school student.*" size={100} stagger={2} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 700,
          textAlign: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 330,
          letterSpacing: -14,
          color: "#fff",
          lineHeight: 1,
          transform: `translate(${s.x}px, ${s.y}px) scale(${interpolate(p, [0, 1], [1.3, 1])})`,
          textShadow: `0 0 60px ${C.blue}`,
          opacity: f >= 12 ? 1 : 0,
        }}
      >
        <Count to={400} from={12} dur={18} />
        <span style={{ color: C.accent }}>+</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1060 }}>
        <Head text="students and counting." size={72} align="center" delay={22} stagger={2} color={C.ice} />
      </div>
    </AbsoluteFill>
  );
};

// 27.5–30s. Call to action and share prompt.
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 6, fps, config: { damping: 10, stiffness: 220, mass: 0.6 } });
  const beat = 1 + Math.max(0, 0.035 * (1 - ((f + 9) % 15) / 6));
  const tap = timeline.taps[0] - at.cta.from;
  const press = interpolate(f, [tap, tap + 3, tap + 9], [1, 0.93, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const finger = interpolate(f, [tap - 14, tap], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const plane = Math.sin(f / 4) * 10;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: Math.min(1, pop(f, fps, 0) * 2) }}>
        <Img src={staticFile("reel/akoizo-logo.svg")} style={{ width: 120, height: 120 }} />
        <span style={{ fontFamily: display, fontWeight: 700, fontSize: 100, letterSpacing: -4, color: "#fff" }}>akoizo</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560 }}>
        <Head text="Start free at" size={80} align="center" delay={2} color={C.ice} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 690,
          height: 230,
          borderRadius: 120,
          background: C.blue,
          boxShadow: `0 0 0 8px #ffffff18, 0 40px 120px ${C.blue}aa`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 150,
          letterSpacing: -6,
          color: "#fff",
          transform: `scale(${interpolate(p, [0, 1], [0.4, 1]) * beat * press})`,
          opacity: Math.min(1, p * 3),
        }}
      >
        akoizo.app
      </div>
      <div
        style={{
          position: "absolute",
          left: 720 + (1 - finger) * 220,
          top: 860 + (1 - finger) * 300,
          width: 96,
          height: 96,
          borderRadius: 48,
          background: "#ffffffcc",
          border: "4px solid #fff",
          boxShadow: `0 0 0 ${f > tap ? (f - tap) * 6 : 0}px #ffffff${f > tap && f < tap + 12 ? "44" : "00"}`,
          opacity: finger,
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1070 }}>
        <Head text="Send this to your|*SciOly team.*" size={88} align="center" delay={20} stagger={2} />
      </div>
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        style={{ position: "absolute", left: 480, top: 1310, transform: `translate(${plane}px, ${-Math.abs(plane) / 2}px) rotate(-12deg)`, opacity: Math.min(1, pop(f, fps, 30) * 2) }}
      >
        <path d="M22 3 2 11l7 3 2 7 3-5 5 4z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 14 22 3" stroke="#fff" strokeWidth="1.6" />
      </svg>
    </AbsoluteFill>
  );
};

const scenes: Record<string, React.FC> = {
  hook: Hook,
  free: Free,
  chaos: Chaos,
  logo: Logo,
  events: Events,
  lessons: Lessons,
  labs: Labs,
  tests: Tests,
  ranked: Ranked,
  binder: Binder,
  coaches: Coaches,
  proof: Proof,
  cta: Cta,
};

export const Reel: React.FC<{ music: boolean }> = ({ music }) => {
  const f = useCurrentFrame();
  const flash = Math.max(
    ...timeline.scenes.slice(1).map((s) =>
      interpolate(f, [s.from, s.from + 4], [s.from === timeline.drop ? 1 : 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
      (f >= s.from ? 1 : 0),
    ),
  );
  return (
    <AbsoluteFill style={{ background: C.ink, fontFamily: body, overflow: "hidden" }}>
      <Audio src={staticFile(music ? "reel/reel-music.wav" : "reel/reel-sfx.wav")} />
      <Backdrop />
      {timeline.scenes.map((s) => {
        const Scene = scenes[s.id];
        return (
          <Sequence key={s.id} name={s.id} from={s.from} durationInFrames={s.dur} premountFor={30}>
            {s.id === "hook" ? (
              <Scene />
            ) : (
              <Whip dur={s.dur}>
                <Scene />
              </Whip>
            )}
          </Sequence>
        );
      })}
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
