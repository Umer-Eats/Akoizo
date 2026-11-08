import { interpolate, useCurrentFrame } from "remotion";
import { Frame, Reveal, Head, Label } from "./Design";
export const Free = () => {
  const f = useCurrentFrame();
  return (
    <Frame blue section="02 / FREE TO LEARN">
      <Reveal delay={3}>
        <Label>YOUR CURIOSITY. NO PRICE TAG.</Label>
      </Reveal>
      <Reveal delay={6}>
        <Head size={130}>
          A serious
          <br />
          study app.
        </Head>
      </Reveal>
      <Reveal
        delay={12}
        style={{
          fontFamily: "Space",
          fontSize: 340,
          lineHeight: 1.1,
          letterSpacing: -22,
          fontWeight: 600,
          marginLeft: -12,
          marginTop: 40,
          scale: interpolate(f, [12, 45], [0.8, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        FREE<span style={{ fontSize: 100, letterSpacing: -5 }}>↗</span>
      </Reveal>
      <Reveal
        delay={26}
        style={{
          borderTop: "2px solid #ffffff66",
          paddingTop: 48,
          marginTop: 40,
        }}
      >
        <Head size={100}>
          Open to
          <br />
          everyone.
        </Head>
      </Reveal>
      <Reveal
        delay={35}
        style={{ fontSize: 45, lineHeight: 1.4, marginTop: 48, maxWidth: 740 }}
      >
        Science Olympiad study tools.
        <br />
        Built for curious minds.
      </Reveal>
    </Frame>
  );
};
