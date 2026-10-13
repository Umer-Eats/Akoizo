import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRating,
  applyLeaderboard,
  type RatingTest,
} from '../src/lib/competitive-rating.ts';
const now = Date.now();
const scores = (values: number[]): RatingTest[] =>
  values.map((points, i) => ({
    id: String(i).padStart(5, '0'),
    points,
    completedAt: new Date(now - (values.length - i) * 60000).toISOString(),
    paperAverage: 60,
  }));

test('five placements establish a rank with 50 RR; placement is capped at Ascendant 3', () => {
  assert.equal(calculateRating(scores([100, 100, 100, 100])).name, 'Unranked');
  const placed = calculateRating(scores(Array(5).fill(100)));
  assert.equal(placed.name, 'Ascendant');
  assert.equal(placed.tier, 3);
  assert.equal(placed.rr, 50);
  assert.equal(calculateRating(scores(Array(5).fill(0))).name, 'Iron');
});
test('RR responds to scores, can fall, and promotes with a buffer', () => {
  const initial = Array(5).fill(50);
  const weak = calculateRating(scores([...initial, 60]));
  const strong = calculateRating(scores([...initial, 100]));
  const loss = calculateRating(scores([...initial, 0]));
  assert.ok(strong.rr > weak.rr);
  assert.ok(loss.rr < 50);
  const promoted = calculateRating(scores([...initial, 100, 100]));
  assert.ok(promoted.rating > 1100);
  assert.ok(promoted.rr >= 10);
});
test('zero RR protects until another loss, then two shields protect tier 1', () => {
  const initial = Array(5).fill(30); // Silver 1, 50 RR
  const atZero = calculateRating(scores([...initial, 0, 0]));
  assert.equal(atZero.rr, 0);
  assert.equal(atZero.name, 'Silver');
  assert.equal(atZero.shields, 2);
  const shieldOne = calculateRating(scores([...initial, 0, 0, 0]));
  assert.equal(shieldOne.rr, 0);
  assert.equal(shieldOne.shields, 1);
  const shieldTwo = calculateRating(scores([...initial, 0, 0, 0, 0]));
  assert.equal(shieldTwo.shields, 0);
  assert.equal(shieldTwo.name, 'Silver');
  const demoted = calculateRating(scores([...initial, 0, 0, 0, 0, 0]));
  assert.equal(demoted.name, 'Bronze');
  assert.equal(demoted.tier, 3);
  assert.ok(demoted.rr >= 70);
});
test('rating replays deterministically after score corrections and removal', () => {
  const attempts = scores([70, 70, 70, 70, 70, 100, 100]);
  assert.deepEqual(calculateRating(attempts), calculateRating([...attempts].reverse()));
  const corrected = attempts.map((t, i) => (i === 6 ? { ...t, points: 0 } : t));
  assert.ok(calculateRating(corrected).rating < calculateRating(attempts).rating);
  assert.equal(calculateRating(attempts.slice(0, 4)).name, 'Unranked');
});
test('paper difficulty influences the skill estimate', () => {
  const neutral = scores(Array(5).fill(60));
  assert.ok(
    calculateRating(neutral.map((t) => ({ ...t, paperAverage: 40 }))).rating >
      calculateRating(neutral.map((t) => ({ ...t, paperAverage: 80 }))).rating,
  );
});
test('Immortal RR is uncapped and Radiant needs threshold, top 500, and recent activity', () => {
  const rank = calculateRating(scores(Array(50).fill(100)));
  assert.equal(rank.name, 'Immortal');
  assert.equal(rank.tier, 3);
  assert.ok(rank.rr > 450);
  const players = Array.from({ length: 501 }, (_, i) => ({ id: String(i).padStart(4, '0'), rank }));
  const ladder = applyLeaderboard(players, now);
  assert.equal(ladder[499].rank.name, 'Radiant');
  assert.equal(ladder[500].rank.name, 'Immortal');
  assert.equal(
    applyLeaderboard([{ id: 'a', rank: { ...rank, rr: 449 } }], now)[0].rank.name,
    'Immortal',
  );
  const inactive = applyLeaderboard([{ id: 'a', rank }], now + 8 * 86400000)[0];
  assert.equal(inactive.rank.name, 'Immortal');
  assert.equal(inactive.rank.rr, rank.rr);
  assert.equal(inactive.rank.leaderboardPosition, null);
});
