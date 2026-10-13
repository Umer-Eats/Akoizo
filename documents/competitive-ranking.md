# Akoizo ranked profiles

Open **Community → Across communities** for searchable student cards, community and division filters, and rank order. Student names in community rosters, members, event seats, and the existing all-time points leaderboard open `/students/[studentId]`. Students also have a **My ranked profile** link in Community.

Profiles require active enrollment. Cross-community data includes first name and last initial, community, division, released ranked statistics, event averages, score trends, and test history. Email, complete surnames, answers, instructor feedback, questions, and private account data are excluded. Practice results do not contribute to competitive rank. Public Global Rankings uses full-width clickable cards displaying the same rank emblem, tier, RR, or first-five-test placement progress as the profile. Only that small rank summary is added to the public response; detailed analytics and test history still require enrollment. The all-time points ordering remains separate from competitive RR.

## Rules

This is a test-based adaptation of Valorant's published competitive structure, not a reproduction of Riot's private matchmaking formula. Akoizo has one continuous global ladder; it does not implement Valorant seasons, regional matchmaking, or season resets.

- Five fully graded, released tests establish placement, with 50 RR and a maximum initial rank of Ascendant 3.
- Iron through Ascendant each have three tiers with 100 RR per tier. Immortal has three tiers on one uncapped RR total: tier 2 at 90 and tier 3 at 200, following North American thresholds.
- Radiant is limited to the top five eligible students globally and requires 450 elite RR. Elite leaderboard eligibility requires a qualifying test completed within seven days. Inactivity does not erase earned RR. Equal ratings use stable student IDs as the tie breaker. Fewer than five students can be Radiant if fewer meet the requirements.
- A test's existing server-awarded ranked points are normalized to 0–100. A score of at least 60 is a successful result; lower scores lose RR.
- Skill starts from the mean placement performance multiplied by 21. Later skill estimates use 85% previous skill and 15% new performance. Paper difficulty adjusts performance by `clamp(60 − paper average, −10, 10)`; a paper needs at least three qualifying results before this adjustment applies. Legacy results use a neutral benchmark.
- Below Immortal, convergence is `clamp((skill − current cumulative rating) / 100, −8, 8)`. Success earns `round(clamp(20 + (points − 60) / 4 + convergence, 10, 40))`. An unsuccessful result loses `round(clamp(20 + (60 − points) / 4 − convergence, 10, 35))`. Immortal omits convergence. This is Akoizo's explicit points-to-RR policy, not Riot's formula.
- Promotion leaves at least 10 RR; entry to Immortal starts at 10 elite RR. A student must reach zero and have another unsuccessful result before demotion, which leaves at least 70 RR. Entering tier 1 below Immortal grants two shields against crossing into a lower rank.

Ratings replay from stored attempts in completion-time and attempt-ID order. Requests do not award or persist extra credit. Corrections, releases, reopens, membership departures, and community closure are reflected on the next refresh. Shared paper benchmarks may also change as scores are released or corrected. Profiles and cards refresh every 30 seconds and on window focus. Rank colors and SVG emblems are original Akoizo artwork, with mascot eyes, orbital paths, and distinct tier markers.

## Reference and verification

The published structures used as references are Riot's [Iron through Ascendant RR rules](https://support.riotgames.com/en-us/valorant/gameplay/rank-rating-rr-for-iron-through-ascendant-ranks) and [Immortal and Radiant RR rules](https://support.riotgames.com/en-us/valorant/gameplay/rank-rating-rr-for-immortal-and-radiant-ranks). These inform placements, promotion/demotion protection, shields, and elite thresholds.

`tests/competitive-rating.test.ts` covers placements, variable RR, promotions, demotion shields, replay, difficulty, and Radiant eligibility. `tests/student-profiles.test.ts` exercises cross-community access, safe fields, pending/released/corrected scores, and revoked membership. `scripts/student-profile-browser-check.mjs` uses an isolated database and mock sign-in to verify cards, pagination, search, profile navigation, chart controls, badges, errors, and responsive light/dark layouts at 1440, 390, and 320 pixels. Screenshots are in `output/student-profile-qa`.
