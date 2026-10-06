export type AkoAction = 'idle' | 'wave';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export const AKO_WAVE_SECONDS = 2.8;

/** Continuous joint targets in one fixed coordinate system; no pose images or flips. */
export function sampleAkoPose(time: number, waveTime = -1, look?: number) {
  const cycle = ((time % 14) + 14) % 14;
  const automaticLook =
    cycle < 4
      ? -0.65
      : cycle < 6
        ? -0.65 + 1.3 * smooth((cycle - 4) / 2)
        : cycle < 10
          ? 0.65
          : cycle < 12
            ? 0.65 - 1.3 * smooth((cycle - 10) / 2)
            : -0.65;
  const yaw = clamp(look ?? automaticLook, -1, 1);
  const blinkTime = (((time + 1.9) % 5.4) + 5.4) % 5.4;
  const blink =
    blinkTime < 0.075
      ? smooth(blinkTime / 0.075)
      : blinkTime < 0.19
        ? 1 - smooth((blinkTime - 0.075) / 0.115)
        : 0;
  const wave =
    waveTime < 0 ? 0 : smooth(waveTime / 0.3) * smooth((AKO_WAVE_SECONDS - waveTime) / 0.45);
  const breath = Math.sin((time * Math.PI) / 2.3);
  return {
    yaw,
    blink,
    breath,
    headTilt: yaw * 4 + Math.sin(time * 0.9) * 0.6 + wave * Math.sin(waveTime * 3) * 2,
    upperArm: -8 + Math.sin(time * 1.1) * 1.2 - wave * 12,
    forearm: 27 + Math.sin(time * 1.05) * 2 + wave * Math.sin(waveTime * 12) * 23,
    restArm: Math.sin(time * 0.8) * 1.4,
    tailTipX: 42 + Math.sin(time * 1.3) * 7,
    tailTipY: 343 + Math.sin(time * 1.3 + 0.8) * 5,
  };
}

export type AkoPose = ReturnType<typeof sampleAkoPose>;
