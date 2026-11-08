import React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from "remotion";
export const Frame: React.FC<{
  children: React.ReactNode;
  light?: boolean;
  blue?: boolean;
  section: string;
}> = ({ children, light, blue, section }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: blue ? "#2455f5" : light ? "#f4f5f8" : "#08090c",
        color: light ? "#111319" : "#f4f5f8",
        fontFamily: "Manrope",
        overflow: "hidden",
      }}
    >
      <style>{`@font-face{font-family:Space;src:url('${staticFile("display.woff2")}')}@font-face{font-family:Manrope;src:url('${staticFile("body.woff2")}')}@font-face{font-family:Mono;src:url('${staticFile("mono.woff2")}')}*{box-sizing:border-box}`}</style>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(90deg, ${light ? "#1420470c" : "#ffffff08"} 1px,transparent 1px)`,
          backgroundSize: "216px 100%",
          backgroundPosition: "108px 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: blue ? "#90b0ff18" : "#2455f51a",
          filter: "blur(100px)",
          top: 550,
          left: 100,
          translate: `${Math.sin(f / 80) * 80}px 0px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 142,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Mono",
          fontSize: 25,
          letterSpacing: 2,
        }}
      >
        <span>AKOIZO®</span>
        <span style={{ opacity: 0.65 }}>THE OPEN STUDY LAB</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 300,
          bottom: 300,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          bottom: 220,
          borderTop: `1px solid ${light ? "#11131930" : "#ffffff35"}`,
          paddingTop: 25,
          fontFamily: "Mono",
          fontSize: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{section}</span>
        <span>OPEN TO EVERYONE ↗</span>
      </div>
    </AbsoluteFill>
  );
};
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  name?: string;
}> = ({ children, delay = 0, style, name }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name={name ?? "Reveal"}
      premountFor={fps}
      style={{
        opacity: interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [delay, delay + 26],
          ["0px 64px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        ...style,
      }}
    >
      {children}
    </Interactive.Div>
  );
};
export const Head: React.FC<{ children: React.ReactNode; size?: number }> = ({
  children,
  size = 118,
}) => (
  <div
    style={{
      fontFamily: "Space",
      fontSize: size,
      lineHeight: 0.99,
      letterSpacing: -6,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);
export const Label: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: "Mono",
      fontSize: 27,
      letterSpacing: 3,
      marginBottom: 42,
    }}
  >
    {children}
  </div>
);
export const Chrome = () => (
  <Img
    src={staticFile("chrome.png")}
    style={{ width: "100%", height: 270, objectFit: "contain" }}
  />
);
