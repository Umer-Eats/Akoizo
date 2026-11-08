import { useCurrentFrame } from "remotion";
import { Frame, Reveal, Head, Label, Chrome } from "./Design";
export const Hook = () => {
  const f = useCurrentFrame();
  return (
    <Frame section="01 / FIND YOUR EDGE">
      <Reveal delay={3}>
        <Label>BIG AMBITIONS. ZERO BARRIERS.</Label>
      </Reveal>
      <Reveal delay={7}>
        <Head>
          Your next
          <br />
          breakthrough
          <br />
          <span style={{ color: "#8aaeff" }}>starts here.</span>
        </Head>
      </Reveal>
      <Reveal
        delay={18}
        style={{ marginTop: 70, height: 500, position: "relative" }}
      >
        <svg
          viewBox="0 0 820 500"
          width="100%"
          height="500"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="metal">
              <stop stopColor="#8aaeff" />
              <stop offset=".35" stopColor="#fff" />
              <stop offset=".55" stopColor="#4c5e89" />
              <stop offset=".8" stopColor="#cedaff" />
              <stop offset="1" stopColor="#2455f5" />
            </linearGradient>
          </defs>
          <g
            transform={`translate(410 250) rotate(${f * 0.26})`}
            fill="none"
            stroke="url(#metal)"
            strokeWidth="5"
          >
            <ellipse rx="325" ry="135" transform="rotate(-30)" />
            <ellipse rx="325" ry="135" transform="rotate(30)" />
            <ellipse rx="325" ry="135" transform="rotate(90)" />
          </g>
          <circle cx="410" cy="250" r="48" fill="#2455f5" />
          <circle cx="410" cy="250" r="26" fill="#c6d7ff" />
        </svg>
      </Reveal>
      <Reveal delay={24} style={{ marginTop: -30 }}>
        <Chrome />
      </Reveal>
    </Frame>
  );
};
