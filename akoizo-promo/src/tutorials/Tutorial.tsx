import React from "react";
import {
  AbsoluteFill,
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
import data from "./tutorials.json";
import {
  Backdrop,
  C,
  Chip,
  Head,
  Screen,
  Sticker,
  Whip,
  display,
  mono,
  pop,
  shake,
} from "../reel/kit";

// Ten 9:16 tutorial Reels from one template. Structure (in beats, see tutorials.json):
// hook (pattern interrupt + result teaser) → drop → 3 numbered steps on the real app → payoff → CTA.
// Cuts land on the beat; the soundtrack (scripts/tutorial-soundtrack.mjs) reads the same grid.
// Copy stays inside Instagram's safe area: x 70–1010, y 230–1560.

export type Step = {
  text: string;
  kind?: "ranks";
  clip?: string;
  from?: number;
  rate?: number;
  zoom?: number[];
  focus?: number[];
  sticker?: string;
};
export type TutorialData = (typeof data.tutorials)[number];
type Section = { id: string; from: number; dur: number };

export const tutorials = data.tutorials as TutorialData[];

export function grid(t: TutorialData) {
  const bf = data.audiences[t.audience as "student" | "coach"].beatFrames;
  const b = data.beats;
  const sections: Section[] = [];
  let at = 0;
  const push = (id: string, beats: number) => {
    sections.push({ id, from: at, dur: beats * bf });
    at += beats * bf;
  };
  push("hook", b.hook);
  t.steps.forEach((_, i) => push(`step${i + 1}`, b.step));
  push("payoff", b.payoff);
  push("cta", b.cta);
  return { bf, sections, duration: at };
}

const slotColor = (t: TutorialData) =>
  (data.slots as Record<string, string>)[t.slot];
// Bright slot colours read better with ink text inside the highlight.
const onSlot = (t: TutorialData) =>
  ["yellow", "green"].includes(t.slot) ? C.ink : "#fff";
// Largest size (≤ max) whose longest line fits `width` px. Space Grotesk bold averages ~0.5em a glyph.
const fit = (text: string, max: number, width = 900) =>
  Math.min(
    max,
    Math.floor(
      width /
        (0.5 *
          Math.max(
            ...text
              .replace(/\*/g, "")
              .split("|")
              .map((l) => l.length),
          )),
    ),
  );
const index = (t: TutorialData) =>
  tutorials.findIndex((x) => x.id === t.id) + 1;
const pad2 = (n: number) => String(n).padStart(2, "0");

const SlotChip: React.FC<{
  t: TutorialData;
  n?: string;
  label: string;
  delay?: number;
}> = ({ t, n, label, delay }) => {
  const c = slotColor(t);
  return (
    <Chip
      n={n}
      label={label}
      delay={delay}
      style={{ color: c, border: `2px solid ${c}`, background: `${c}22` }}
    />
  );
};

// Persistent chrome: progress bar (retention), series tag, and step dots.
const Overlay: React.FC<{
  t: TutorialData;
  duration: number;
  sections: Section[];
}> = ({ t, duration, sections }) => {
  const f = useCurrentFrame();
  const c = slotColor(t);
  const steps = sections.filter((s) => s.id.startsWith("step"));
  const current = steps.filter((s) => f >= s.from).length;
  const payoff = sections.find((s) => s.id === "payoff")!.from;
  const inCta = f >= sections[sections.length - 1].from;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: 10,
          width: `${(f / duration) * 100}%`,
          background: c,
          boxShadow: `0 0 24px ${c}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 150,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: mono,
          fontSize: 24,
          letterSpacing: 4,
          color: C.muted,
          textTransform: "uppercase",
          opacity: inCta ? 0 : 1,
        }}
      >
        <Img
          src={staticFile("reel/akoizo-logo.svg")}
          style={{ width: 40, height: 40 }}
        />
        <span style={{ color: "#fff" }}>akoizo</span>
        <span>
          · how-to {pad2(index(t))}/{pad2(tutorials.length)}
        </span>
      </div>
      {current > 0 && f < payoff && (
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 160,
            display: "flex",
            gap: 10,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.id}
              style={{
                width: i + 1 === current ? 56 : 18,
                height: 18,
                borderRadius: 9,
                background: i + 1 <= current ? c : "#ffffff30",
              }}
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

// 0 – 4 beats. Readable on frame 0: audience tag, pain-point kicker, promise, and a glimpse of the result.
const Hook: React.FC<{ t: TutorialData }> = ({ t }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = shake(f, 0, 14, 8);
  const rise = spring({
    frame: f,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const c = slotColor(t);
  const label = data.audiences[t.audience as "student" | "coach"].label;
  return (
    <AbsoluteFill style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 1040 + (1 - rise) * 300 - f * 0.6,
          width: 700,
          height: 1244,
          borderRadius: 50,
          overflow: "hidden",
          border: `3px solid ${c}66`,
          boxShadow: `0 0 120px ${c}55`,
          transform: `rotate(${-6 + f * 0.04}deg)`,
          opacity: 0.85,
        }}
      >
        <OffthreadVideo
          src={staticFile(`reel/${t.teaser.clip}.mp4`)}
          trimBefore={Math.round(t.teaser.from * fps)}
          muted
          style={{ width: 700, height: 1244 }}
        />
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, ${C.ink} 0%, transparent 35%)`,
          }}
        />
      </div>
      <div style={{ position: "absolute", left: 70, top: 260 }}>
        <SlotChip t={t} label={label} delay={-6} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 380,
          fontFamily: display,
          fontWeight: 600,
          fontSize: 52,
          letterSpacing: -1,
          color: C.ice,
          opacity: Math.min(1, pop(f, fps, -8) * 2),
        }}
      >
        {t.kicker}
      </div>
      <div style={{ position: "absolute", left: 70, top: 480 }}>
        {/* Negative delay: the whole promise is already on screen at frame 0 (it doubles as the cover). */}
        <Head
          text={t.hook}
          size={fit(t.hook, 112)}
          delay={-18}
          stagger={1}
          hl={c}
          hlText={onSlot(t)}
        />
      </div>
    </AbsoluteFill>
  );
};

// The rank ladder, built from Akoizo's real rank badges.
const Ranks: React.FC<{
  size?: number;
  top: number;
  per: number;
  hold?: boolean;
}> = ({ size = 420, top, per, hold }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const idx = hold
    ? RANK_NAMES.length - 1
    : Math.min(RANK_NAMES.length - 1, Math.floor(f / per));
  const last = hold ? 0 : idx * per;
  const p = spring({
    frame: f - last,
    fps,
    config: { damping: 9, stiffness: 260, mass: 0.5 },
  });
  const radiant = idx === RANK_NAMES.length - 1;
  const name = RANK_NAMES[idx];
  return (
    <>
      {radiant && (
        <div
          style={{
            position: "absolute",
            left: 540 - 520,
            top: top + size / 2 - 520,
            width: 1040,
            height: 1040,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.gold}55, transparent 62%)`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: 540 - size / 2,
          top,
          width: size,
          height: size,
          color: C.muted,
          transform: `scale(${interpolate(p, [0, 1], [1.35, 1])}) rotate(${radiant ? f * 0.3 : 0}deg)`,
          filter: `drop-shadow(0 0 ${radiant ? 70 : 30}px ${radiant ? C.gold : C.accent}88)`,
        }}
      >
        <RankBadge rank={{ name, tier: radiant ? null : 3 }} size={size} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: top + size + 40,
          textAlign: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 92,
          letterSpacing: -3,
          color: radiant ? C.gold : "#fff",
        }}
      >
        {name}
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: top + size + 170,
          display: "flex",
          gap: 10,
        }}
      >
        {RANK_NAMES.map((r, i) => (
          <div
            key={r}
            style={{
              flex: 1,
              height: 14,
              borderRadius: 7,
              background:
                i <= idx
                  ? radiant && i === idx
                    ? C.gold
                    : C.accent
                  : "#ffffff22",
            }}
          />
        ))}
      </div>
    </>
  );
};

const StepScene: React.FC<{
  t: TutorialData;
  step: Step;
  n: number;
  dur: number;
  bf: number;
}> = ({ t, step, n, dur, bf }) => {
  const c = slotColor(t);
  // The sticker pops on the same frame as the soundtrack's "pop" cue.
  const stickerAt = Math.round(bf * 1.5) + 8;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 70, top: 240 }}>
        <SlotChip t={t} n={pad2(n)} label={`Step ${n}`} />
      </div>
      <div style={{ position: "absolute", left: 70, top: 340 }}>
        <Head
          text={step.text}
          size={fit(step.text, 92)}
          delay={2}
          stagger={2}
          hl={c}
          hlText={onSlot(t)}
        />
      </div>
      {step.kind === "ranks" ? (
        <Ranks top={640} per={Math.floor((dur - 20) / RANK_NAMES.length)} />
      ) : (
        <Screen
          clip={step.clip!}
          from={step.from!}
          rate={step.rate ?? 1}
          w={600}
          h={1067}
          top={590}
          zoom={step.zoom as [number, number]}
          zoomAt={[6, dur - 10]}
          focus={step.focus as [number, number, number, number]}
          delay={1}
        />
      )}
      {step.sticker && (
        <Sticker
          at={stickerAt}
          x={n % 2 ? 520 : 90}
          y={n % 2 ? 1180 : 1260}
          rotate={n % 2 ? 5 : -5}
          bg={c}
          color={onSlot(t)}
          size={40}
        >
          {step.sticker}
        </Sticker>
      )}
    </AbsoluteFill>
  );
};

const Payoff: React.FC<{ t: TutorialData; dur: number }> = ({ t, dur }) => {
  const f = useCurrentFrame();
  const c = slotColor(t);
  const s = shake(f, 0, 18, 9);
  const p = t.payoff as { kind: string; text: string; chips?: string[] };
  return (
    <AbsoluteFill style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, ${c}33, transparent 60%)`,
        }}
      />
      {p.kind === "ranks" ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 260 }}>
            <Head
              text={p.text}
              size={120}
              align="center"
              delay={0}
              stagger={3}
              hl={C.gold}
              hlText={C.ink}
            />
          </div>
          <Ranks top={620} size={440} per={1} hold />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 560 }}>
            <Head
              text={p.text}
              size={fit(p.text, 124)}
              align="center"
              delay={0}
              stagger={3}
              hl={c}
              hlText={onSlot(t)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 70,
              right: 70,
              top: 960,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {(p.chips ?? []).map((label, i) => (
              <SlotChip key={label} t={t} label={label} delay={10 + i * 5} />
            ))}
          </div>
        </>
      )}
      <Sticker
        at={Math.round(dur * 0.45)}
        x={p.kind === "ranks" ? 640 : 380}
        y={p.kind === "ranks" ? 1440 : 1170}
        rotate={-7}
        size={46}
      >
        100% free
      </Sticker>
    </AbsoluteFill>
  );
};

// Final beats: brand, the save/share prompt (saves and sends drive Reels reach), and the next episode.
const Cta: React.FC<{ t: TutorialData }> = ({ t }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = slotColor(t);
  const p = spring({
    frame: f - 4,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.6 },
  });
  const breathe = 1 + 0.025 * Math.sin(f / 4);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 280,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
          opacity: Math.min(1, pop(f, fps, -4) * 2),
        }}
      >
        <Img
          src={staticFile("reel/akoizo-logo.svg")}
          style={{ width: 110, height: 110 }}
        />
        <span
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 96,
            letterSpacing: -4,
            color: "#fff",
          }}
        >
          akoizo
        </span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 500 }}>
        <Head
          text={t.cta.text}
          size={fit(t.cta.text, 100)}
          align="center"
          delay={2}
          stagger={2}
          hl={c}
          hlText={onSlot(t)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 820,
          height: 170,
          borderRadius: 90,
          background: C.blue,
          boxShadow: `0 0 0 8px #ffffff18, 0 40px 120px ${C.blue}aa`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 104,
          letterSpacing: -4,
          color: "#fff",
          transform: `scale(${interpolate(p, [0, 1], [0.4, 1]) * breathe})`,
          opacity: Math.min(1, p * 3),
        }}
      >
        akoizo.app
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1070,
          textAlign: "center",
          fontFamily: mono,
          fontSize: 32,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: C.ice,
          opacity: Math.min(1, pop(f, fps, 18) * 2),
        }}
      >
        {t.cta.next}
      </div>
    </AbsoluteFill>
  );
};

export const Tutorial: React.FC<{ id: string; music: boolean }> = ({
  id,
  music,
}) => {
  const t = tutorials.find((x) => x.id === id)!;
  const { bf, sections, duration } = grid(t);
  const f = useCurrentFrame();
  const drop = sections[1].from;
  const flash =
    interpolate(f, [drop, drop + 5], [0.45, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) * (f >= drop ? 1 : 0);
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <Audio src={staticFile(`tutorials/${t.id}${music ? "" : "-sfx"}.wav`)} />
      <Backdrop />
      {sections.map((s) => {
        let scene: React.ReactNode;
        if (s.id === "hook") scene = <Hook t={t} />;
        else if (s.id === "payoff") scene = <Payoff t={t} dur={s.dur} />;
        else if (s.id === "cta") scene = <Cta t={t} />;
        else {
          const n = Number(s.id.slice(4));
          scene = (
            <StepScene
              t={t}
              step={t.steps[n - 1] as Step}
              n={n}
              dur={s.dur}
              bf={bf}
            />
          );
        }
        return (
          <Sequence
            key={s.id}
            name={s.id}
            from={s.from}
            durationInFrames={s.dur}
            premountFor={30}
          >
            {/* The CTA holds to the last frame (no punch-out) so the loop restarts cleanly. */}
            {s.id === "hook" ? (
              scene
            ) : (
              <Whip dur={s.id === "cta" ? s.dur + 10 : s.dur}>{scene}</Whip>
            )}
          </Sequence>
        );
      })}
      <Overlay t={t} duration={duration} sections={sections} />
      <AbsoluteFill
        style={{ background: "#fff", opacity: flash, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
