import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sampleAkoPose, AKO_WAVE_SECONDS } from '../src/lib/ako-motion.ts';

test('joint motion is continuous across idle loops and greeting boundaries', () => {
  let last = sampleAkoPose(0, 0);
  for (let i = 1; i <= 14 * 240; i++) {
    const time = i / 240;
    const pose = sampleAkoPose(time, time);
    assert.ok(Object.values(pose).every(Number.isFinite));
    assert.ok(pose.blink >= 0 && pose.blink <= 1);
    assert.ok(Math.abs(pose.yaw - last.yaw) < 0.01, 'No instantaneous facing flip');
    assert.ok(Math.abs(pose.forearm - last.forearm) < 1.3, 'No arm pose jumps');
    assert.ok(Math.abs(pose.headTilt - last.headTilt) < 0.08, 'No head pose jumps');
    last = pose;
  }
  const idle = sampleAkoPose(8);
  const completedWave = sampleAkoPose(8, AKO_WAVE_SECONDS);
  assert.equal(completedWave.forearm, idle.forearm);
  assert.equal(completedWave.upperArm, idle.upperArm);
  assert.ok(Math.abs(sampleAkoPose(14 - 0.0001).yaw - sampleAkoPose(14 + 0.0001).yaw) < 0.001);
});

test('rig uses bounded, separate parts and explicit anchors for reuse', () => {
  const rig = JSON.parse(
    readFileSync(new URL('../public/art/ako/rig.json', import.meta.url), 'utf8'),
  );
  assert.equal(rig.name, 'Ako');
  assert.deepEqual(rig.footAnchor, [200, 448]);
  const parts = Object.values(rig.parts) as {
    source: number[];
    target: number[];
    pivot: number[];
  }[];
  assert.equal(parts.length, 6);
  for (const part of parts) {
    const [x, y, w, h] = part.source;
    assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0);
    assert.ok(x + w <= rig.atlasSize[0] && y + h <= rig.atlasSize[1]);
    assert.equal(part.target.length, 4);
    assert.equal(part.pivot.length, 2);
  }
  for (let i = 0; i < parts.length; i++)
    for (let j = i + 1; j < parts.length; j++) {
      const [x, y, w, h] = parts[i].source;
      const [a, b, c, d] = parts[j].source;
      assert.ok(
        x + w <= a || a + c <= x || y + h <= b || b + d <= y,
        'Atlas parts must not bleed into each other',
      );
    }
});
