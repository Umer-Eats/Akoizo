import React from "react";
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Akoizo brand: ink background, cobalt accents, Space Grotesk display type.
export const C = {
  ink: "#050608",
  panel: "#0f1117",
  blue: "#2455f5",
  accent: "#4d7cff",
  ice: "#a9c0ff",
  paper: "#f4f5f8",
  muted: "#9aa3b5",
  red: "#ff4d6d",
  gold: "#f0c040",
};
export const display = "SG, sans-serif";
export const body = "MR, sans-serif";
export const mono = "PM, monospace";

// Brand fonts must be ready before any frame is captured.
const fonts: [string, string, string][] = [
  ["SG", "reel/space-grotesk.woff2", "300 700"],
  ["MR", "reel/manrope.woff2", "200 800"],
  ["PM", "reel/plex-mono.woff2", "500"],
];
if (typeof document !== "undefined") {
  const handle = delayRender("Loading brand fonts");
  Promise.all(
    fonts.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(file)})`, { weight });
      document.fonts.add(face);
      return face.load();
    }),
  ).then(() => continueRender(handle));
}

export const pop = (frame: number, fps: number, delay = 0, stiff = 220) =>
  spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: stiff, mass: 0.6 } });

// A decaying camera shake that starts at `at`.
export const shake = (frame: number, at: number, amp = 16, dur = 9) => {
  const t = frame - at;
  if (t < 0 || t > dur) return { x: 0, y: 0 };
  const k = amp * (1 - t / dur);
  return { x: Math.sin(t * 2.7) * k, y: Math.cos(t * 3.3) * k };
};
export const shakeAll = (frame: number, ats: number[], amp?: number) =>
  ats.reduce(
    (acc, at) => {
      const s = shake(frame, at, amp);
      return { x: acc.x + s.x, y: acc.y + s.y };
    },
    { x: 0, y: 0 },
  );

// Kinetic headline. *word* or *several words* are highlighted; | breaks the line.
export const Head: React.FC<{
  text: string;
  size?: number;
  delay?: number;
  stagger?: number;
  align?: "left" | "center";
  hl?: string;
  hlText?: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  size = 104,
  delay = 0,
  stagger = 3,
  align = "left",
  hl = C.blue,
  hlText = "#fff",
  color = "#fff",
  style,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let marked = false;
  let i = 0;
  const lines = text.split("|").map((line) =>
    line.split(" ").filter(Boolean).map((raw) => {
      const start = raw.startsWith("*");
      if (start) marked = true;
      const on = marked;
      if (raw.endsWith("*")) marked = false;
      return { word: raw.replace(/\*/g, ""), on, index: i++ };
    }),
  );
  return (
    <div
      style={{
        fontFamily: display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: -size * 0.035,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((words, l) => (
        <div key={l} style={{ whiteSpace: "nowrap" }}>
          {words.map(({ word, on, index }) => {
            const p = pop(f, fps, delay + index * stagger);
            const box = pop(f, fps, delay + index * stagger + 2, 260);
            return (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginRight: size * 0.24,
                  padding: on ? `0 ${size * 0.1}px` : 0,
                  color: on ? hlText : color,
                  opacity: Math.min(1, p * 2.5),
                  transform: `translateY(${(1 - p) * size * 0.55}px) scale(${1 + (1 - p) * 0.35})`,
                  filter: `blur(${Math.max(0, (1 - p) * 10)}px)`,
                }}
              >
                {on && (
                  <span
                    style={{
                      position: "absolute",
                      inset: `${size * 0.08}px 0 ${size * 0.02}px`,
                      background: hl,
                      borderRadius: size * 0.12,
                      transform: `scaleX(${Math.max(0, box)})`,
                      transformOrigin: "left center",
                      zIndex: -1,
                    }}
                  />
                )}
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Chip: React.FC<{ n?: string; label: string; delay?: number; style?: React.CSSProperties }> = ({
  n,
  label,
  delay = 0,
  style,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(f, fps, delay);
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 16,
        alignItems: "center",
        fontFamily: mono,
        fontSize: 30,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: C.ice,
        border: `2px solid ${C.accent}`,
        background: "#4d7cff22",
        borderRadius: 999,
        padding: "12px 26px",
        opacity: Math.min(1, p * 2),
        transform: `translateX(${(1 - p) * -60}px)`,
        ...style,
      }}
    >
      {n && <span style={{ color: "#fff" }}>{n}</span>}
      {n && <span style={{ width: 2, height: 26, background: C.accent }} />}
      <span>{label}</span>
    </div>
  );
};

// A rotated pill that slaps onto the frame.
export const Sticker: React.FC<{
  children: React.ReactNode;
  at: number;
  x: number;
  y: number;
  rotate?: number;
  bg?: string;
  color?: string;
  size?: number;
}> = ({ children, at, x, y, rotate = -6, bg = "#fff", color = C.ink, size = 40 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - at, fps, config: { damping: 9, stiffness: 260, mass: 0.5 } });
  if (f < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: display,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: -0.5,
        background: bg,
        color,
        padding: `${size * 0.32}px ${size * 0.6}px`,
        borderRadius: size * 0.5,
        boxShadow: "0 18px 40px #0008",
        whiteSpace: "nowrap",
        transform: `rotate(${rotate + Math.sin((f - at) / 6) * 1.2}deg) scale(${interpolate(p, [0, 1], [2.2, 1])})`,
        opacity: Math.min(1, p * 3),
        zIndex: 5,
      }}
    >
      {children}
    </div>
  );
};

type Ease = [number, number];
// A recorded app clip inside a phone-like card. `focus` is the source point (in 1080×1920 clip
// pixels) kept centred, and `zoom` animates from its first to its second value over `zoomAt`.
export const Screen: React.FC<{
  clip: string;
  from: number;
  rate?: number;
  w?: number;
  h?: number;
  top?: number;
  zoom?: Ease;
  zoomAt?: Ease;
  focus?: [number, number, number, number];
  delay?: number;
}> = ({
  clip,
  from,
  rate = 1,
  w = 660,
  h = 1173,
  top = 610,
  zoom = [1, 1.12],
  zoomAt = [0, 75],
  focus = [540, 960, 540, 960],
  delay = 0,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - delay, fps, config: { damping: 16, stiffness: 150, mass: 0.7 } });
  const t = interpolate(f, zoomAt, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const z = zoom[0] + (zoom[1] - zoom[0]) * t;
  const fx = focus[0] + (focus[2] - focus[0]) * t;
  const fy = focus[1] + (focus[3] - focus[1]) * t;
  const s = (w / 1080) * z;
  const tx = Math.min(0, Math.max(w - 1080 * s, w / 2 - fx * s));
  const ty = Math.min(0, Math.max(h - 1920 * s, h / 2 - fy * s));
  const glare = interpolate(f - delay, [4, 22], [-120, 220], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - w) / 2,
        top,
        width: w,
        height: h,
        borderRadius: 46,
        overflow: "hidden",
        background: "#000",
        border: "3px solid #ffffff2e",
        boxShadow: `0 50px 140px ${C.blue}66, 0 0 0 10px #ffffff0a`,
        transform: `perspective(1800px) translateY(${(1 - p) * 700}px) rotateX(${(1 - p) * 28}deg) scale(${0.88 + 0.12 * p})`,
        transformOrigin: "50% 0%",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        }}
      >
        <OffthreadVideo
          src={staticFile(`reel/${clip}.mp4`)}
          trimBefore={Math.round(from * fps)}
          playbackRate={rate}
          muted
          style={{ width: 1080, height: 1920 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(115deg, transparent ${glare - 30}%, #ffffff22 ${glare}%, transparent ${glare + 30}%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// Shared moving backdrop: ink, a drifting cobalt glow and a faint grid.
export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          left: -110 + Math.sin(f / 40) * 160,
          top: 380 + Math.cos(f / 55) * 220,
          background: `radial-gradient(circle, ${C.blue}55, transparent 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          right: -300 + Math.cos(f / 33) * 120,
          top: -200 + Math.sin(f / 47) * 120,
          background: "radial-gradient(circle, #7a4dff33, transparent 62%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(#ffffff09 2px, transparent 2px), linear-gradient(90deg, #ffffff09 2px, transparent 2px)",
          backgroundSize: "120px 120px",
          backgroundPosition: `0 ${(f * 2) % 120}px`,
          maskImage: "radial-gradient(ellipse at 50% 45%, #000 30%, transparent 75%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Each scene whips in from the right and punches out.
export const Whip: React.FC<{ dur: number; children: React.ReactNode; bg?: string }> = ({ dur, children, bg }) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 7], [260, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const blurIn = interpolate(f, [0, 6], [14, 0], { extrapolateRight: "clamp" });
  const out = interpolate(f, [dur - 4, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: bg,
        transform: `translateX(${x - out * 160}px) scale(${1 + out * 0.08})`,
        filter: `blur(${blurIn + out * 12}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
