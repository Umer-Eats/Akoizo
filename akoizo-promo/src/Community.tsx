import { interpolate, useCurrentFrame } from "remotion";
import { Frame, Reveal, Head, Label } from "./Design";
export const Community = () => {
  const f = useCurrentFrame();
  return (
    <Frame section="05 / BETTER, TOGETHER">
      <Reveal delay={3}>
        <Label>ONE SCHOOL. MORE POSSIBILITY.</Label>
      </Reveal>
      <Reveal delay={7}>
        <Head>
          Your school.
          <br />
          Your people.
          <br />
          <span style={{ color: "#8aaeff" }}>Your next level.</span>
        </Head>
      </Reveal>
      <Reveal
        delay={16}
        style={{ position: "relative", height: 430, marginTop: 65 }}
      >
        <svg viewBox="0 0 820 430" style={{ width: "100%", height: "100%" }}>
          <g
            stroke="#8aaeff66"
            strokeWidth="2"
            strokeDasharray="8 10"
            strokeDashoffset={-f}
          >
            <path d="M410 205L120 80M410 205L700 80M410 205L120 350M410 205L700 350" />
          </g>
          <g fill="#191d24" stroke="#8aaeff" strokeWidth="2">
            <circle cx="120" cy="80" r="50" />
            <circle cx="700" cy="80" r="50" />
            <circle cx="120" cy="350" r="50" />
            <circle cx="700" cy="350" r="50" />
          </g>
          <circle cx="410" cy="205" r="105" fill="#2455f5" />
          <g fill="#c8d8ff">
            <circle cx="120" cy="72" r="15" />
            <circle cx="700" cy="72" r="15" />
            <circle cx="120" cy="342" r="15" />
            <circle cx="700" cy="342" r="15" />
          </g>
          <text
            x="410"
            y="220"
            textAnchor="middle"
            fill="white"
            fontSize="50"
            fontFamily="Space"
            fontWeight="600"
          >
            AKOIZO
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 305,
            top: 100,
            width: 210,
            height: 210,
            border: "1px solid #8aaeff",
            borderRadius: "50%",
            scale: interpolate(f, [0, 160], [1, 1.5]),
            opacity: interpolate(f, [0, 160], [0.6, 0]),
          }}
        />
      </Reveal>
      <Reveal
        delay={30}
        style={{ fontSize: 48, lineHeight: 1.3, marginTop: 60 }}
      >
        Bring your team together.
        <br />
        Build your school community.
      </Reveal>
      <Reveal
        delay={42}
        style={{
          fontFamily: "Mono",
          fontSize: 28,
          color: "#a6c1ff",
          marginTop: 35,
        }}
      >
        TEACHERS & COACHES — LET’S GET SET UP ↗
      </Reveal>
    </Frame>
  );
};
