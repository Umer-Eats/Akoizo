import { Frame, Reveal, Head, Label, Chrome } from "./Design";
export const Closing = () => (
  <Frame section="06 / YOUR NEXT CHAPTER STARTS HERE">
    <Reveal delay={3}>
      <Label>FREE TO LEARN. ROOM TO GROW.</Label>
    </Reveal>
    <Reveal delay={6}>
      <Head>
        Stay curious.
        <br />
        <span style={{ color: "#8aaeff" }}>Go further.</span>
      </Head>
    </Reveal>
    <Reveal delay={12} style={{ marginTop: 60 }}>
      <Chrome />
    </Reveal>
    <Reveal
      delay={20}
      style={{
        background: "#2455f5",
        border: "1px solid #a6c1ff",
        padding: "37px 38px",
        marginTop: 45,
        fontFamily: "Space",
        fontSize: 72,
        letterSpacing: -3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>Visit akoizo.app</span>
      <span>↗</span>
    </Reveal>
    <Reveal
      delay={30}
      style={{
        marginTop: 62,
        borderTop: "1px solid #ffffff35",
        paddingTop: 40,
        fontSize: 42,
        lineHeight: 1.4,
      }}
    >
      <strong>Set up your school community.</strong>
      <div style={{ color: "#a6c1ff", fontSize: 46, marginTop: 20 }}>
        akoizo.app/contact ↗
      </div>
    </Reveal>
  </Frame>
);
