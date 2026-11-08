import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Hook } from "./Hook";
import { Free } from "./Free";
import { Tools } from "./Tools";
import { Impact } from "./Impact";
import { Community } from "./Community";
import { Closing } from "./Closing";
export const Promo = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("soundtrack.wav")}
        premountFor={fps}
        volume={0.85}
      />
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={132}
          premountFor={fps}
        >
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Free for everyone"
          durationInFrames={147}
          premountFor={fps}
        >
          <Free />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Real study tools"
          durationInFrames={177}
          premountFor={fps}
        >
          <Tools />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="400 students impacted"
          durationInFrames={162}
          premountFor={fps}
        >
          <Impact />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="School communities"
          durationInFrames={162}
          premountFor={fps}
        >
          <Community />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Visit and contact"
          durationInFrames={180}
          premountFor={fps}
        >
          <Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
