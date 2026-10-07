export const AKO_ACTIONS = [
  'idle',
  'wave',
  'thinking',
  'angry',
  'happy',
  'sad',
  'walk',
  'run',
  'eat',
  'sleep',
  'surprised',
] as const;
export type AkoAction = (typeof AKO_ACTIONS)[number];
export const AKO_WAVE_SECONDS = 2.8;
export const AKO_CLIPS: Record<AkoAction, { frames: number; fps: number }> = {
  idle: { frames: 8, fps: 3 },
  wave: { frames: 6, fps: 7 },
  thinking: { frames: 8, fps: 4 },
  angry: { frames: 4, fps: 7 },
  happy: { frames: 6, fps: 8 },
  sad: { frames: 6, fps: 3 },
  walk: { frames: 8, fps: 8 },
  run: { frames: 8, fps: 14 },
  eat: { frames: 6, fps: 7 },
  sleep: { frames: 6, fps: 2 },
  surprised: { frames: 4, fps: 5 },
};
export function akoFrame(action: AkoAction, seconds: number) {
  const clip = AKO_CLIPS[action];
  return Math.floor(Math.max(0, seconds) * clip.fps) % clip.frames;
}
export type Point = { x: number; y: number };
export const AKO_SIZE = 96;
export function boundAko(point: Point, width: number, height: number): Point {
  return {
    x: Math.max(0, Math.min(Math.max(0, width - AKO_SIZE), point.x)),
    y: Math.max(0, Math.min(Math.max(0, height - AKO_SIZE), point.y)),
  };
}
export function stepAko(from: Point, to: Point, seconds: number, speed: number): Point {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const step = Math.max(0, seconds) * speed;
  if (distance <= step || distance === 0) return { ...to };
  return {
    x: from.x + ((to.x - from.x) / distance) * step,
    y: from.y + ((to.y - from.y) / distance) * step,
  };
}
/** Future chat integrations can dispatch this event while a response is pending. */
export function setAkoMood(action: AkoAction, duration = 5000) {
  window.dispatchEvent(new CustomEvent('ako:mood', { detail: { action, duration } }));
}
