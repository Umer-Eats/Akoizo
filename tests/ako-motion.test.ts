import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AKO_ACTIONS,
  AKO_CLIPS,
  akoFrame,
  akoPose,
  boundAko,
  stepAko,
} from '../src/lib/ako-motion.ts';

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

test('every action interpolates between poses at both 60Hz and 120Hz without changing clip timing', () => {
  for (const action of AKO_ACTIONS) {
    const { fps, frames } = AKO_CLIPS[action];
    for (const refresh of [60, 120]) {
      const first = akoPose(action, 1 / refresh);
      const second = akoPose(action, 2 / refresh);
      assert.equal(first.frame, 0);
      assert.ok(first.sway > 0 && first.sway < second.sway && second.sway < 1, action);
    }
    assert.deepEqual(akoPose(action, frames / fps), akoPose(action, 0), action);
    const beforeWrap = akoPose(action, frames / fps - 0.00001);
    assert.ok(Math.abs(beforeWrap.sway) < 0.000001, `${action} loops continuously`);
    assert.deepEqual(akoPose(action, -1), akoPose(action, 0));
  }
});

test('walking and running travel the same distance at different display refresh rates', () => {
  for (const speed of [45, 230, 560]) {
    for (const refresh of [30, 60, 120, 144]) {
      let position = { x: 0, y: 0 };
      for (let i = 0; i < refresh; i++) {
        position = stepAko(position, { x: 1000, y: 0 }, 1 / refresh, speed);
      }
      assert.ok(Math.abs(position.x - speed) < 0.000001);
    }
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
