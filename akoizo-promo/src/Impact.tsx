import { useCurrentFrame, interpolate } from "remotion";
import { Frame, Reveal, Head, Label } from "./Design";
export const Impact = () => {
  const f = useCurrentFrame();
  const count = Math.round(
    interpolate(f, [9, 48], [0, 400], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <Frame light section="04 / REAL STUDENTS. REAL IMPACT.">
      <Reveal delay={3}>
        <Label>CURIOSITY HAS A RIPPLE EFFECT.</Label>
      </Reveal>
      <Reveal delay={6}>
        <Head>
          Small steps.
          <br />
          Growing impact.
        </Head>
      </Reveal>
      <Reveal
        delay={9}
        style={{
          fontFamily: "Space",
          fontSize: 300,
          letterSpacing: -22,
          fontWeight: 600,
          color: "#2455f5",
          lineHeight: 1.1,
          marginTop: 90,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ fontSize: 150, letterSpacing: -8 }}>+</span>
      </Reveal>
      <Reveal
        delay={24}
        style={{ fontSize: 57, fontWeight: 600, letterSpacing: -2 }}
      >
        students impacted.
      </Reveal>
      <Reveal
        delay={32}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          gap: 15,
          marginTop: 70,
        }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 19,
              borderRadius: 12,
              background: i < Math.min(100, f - 25) ? "#2455f5" : "#d9deea",
            }}
          />
        ))}
      </Reveal>
      <Reveal
        delay={45}
        style={{ fontSize: 45, marginTop: 56, lineHeight: 1.3 }}
      >
        And there’s room for you.
      </Reveal>
    </Frame>
  );
};
