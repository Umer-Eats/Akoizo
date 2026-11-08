import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Frame, Reveal, Head, Label } from "./Design";
export const Tools = () => {
  const f = useCurrentFrame();
  return (
    <Frame section="03 / TURN CURIOSITY INTO CONFIDENCE">
      <Reveal delay={3}>
        <Label>LESS SCATTERED. MORE PREPARED.</Label>
      </Reveal>
      <Reveal delay={6}>
        <Head>
          Learn it.
          <br />
          <span style={{ color: "#8aaeff" }}>Put it to work.</span>
        </Head>
      </Reveal>
      <Reveal
        delay={15}
        style={{
          marginTop: 60,
          border: "1px solid #a6c1ff55",
          borderRadius: 22,
          padding: 18,
          background: "#191d24",
          rotate: interpolate(f, [0, 165], ["-2deg", "1deg"], {
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 40px 100px #0009",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "4px 12px 18px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9,
              background: "#8aaeff",
            }}
          />
          <span style={{ fontFamily: "Mono", fontSize: 22, color: "#a6acb8" }}>
            akoizo / interactive learning
          </span>
        </div>
        <div style={{ height: 530, overflow: "hidden", borderRadius: 10 }}>
          <Img
            src={staticFile("model.png")}
            style={{ width: 1110, maxWidth: "none", translate: "-245px -75px" }}
          />
        </div>
      </Reveal>
      <Reveal
        delay={28}
        style={{
          marginTop: 55,
          display: "flex",
          flexDirection: "column",
          gap: 23,
          fontSize: 45,
        }}
      >
        <div>
          <span style={{ color: "#8aaeff" }}>01</span> Event lessons
        </div>
        <div>
          <span style={{ color: "#8aaeff" }}>02</span> Practice tests
        </div>
        <div>
          <span style={{ color: "#8aaeff" }}>03</span> Interactive models
        </div>
      </Reveal>
    </Frame>
  );
};
