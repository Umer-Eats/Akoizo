import test from 'node:test';
import assert from 'node:assert/strict';
import { AKO_ACTIONS, AKO_CLIPS, akoFrame, boundAko, stepAko } from '../src/lib/ako-motion.ts';

test('all pixel clips loop within their declared frame counts', () => {
  for (const action of AKO_ACTIONS) {
    const { frames, fps } = AKO_CLIPS[action];
    assert.equal(akoFrame(action, 0), 0);
    assert.equal(akoFrame(action, frames / fps), 0);
    const seen = new Set<number>();
    for (let i = 0; i < frames; i++) seen.add(akoFrame(action, (i + 0.1) / fps));
    assert.equal(seen.size, frames);
    assert.equal(akoFrame(action, -1), 0);
  }
});
test('movement arrives exactly without overshoot, including zero distance', () => {
  assert.deepEqual(stepAko({ x: 0, y: 0 }, { x: 3, y: 4 }, 1, 2), { x: 1.2, y: 1.6 });
  assert.deepEqual(stepAko({ x: 0, y: 0 }, { x: 3, y: 4 }, 1, 230), { x: 3, y: 4 });
  assert.deepEqual(stepAko({ x: 3, y: 4 }, { x: 3, y: 4 }, 1, 230), { x: 3, y: 4 });
});
test('resize and cheese targets keep the whole character on screen', () => {
  assert.deepEqual(boundAko({ x: -50, y: 900 }, 320, 600), { x: 0, y: 504 });
  assert.deepEqual(boundAko({ x: 1500, y: -30 }, 320, 600), { x: 224, y: 0 });
  assert.deepEqual(boundAko({ x: 10, y: 10 }, 60, 60), { x: 0, y: 0 });
});
