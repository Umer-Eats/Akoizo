import { buildEventCourse } from './build-course-kit.ts';

// Boomilever (2027), one course per division. B and C differ only in the wall contact lines
// and the size of the Load Scored Bonus, so every rule number below comes from `r`.
function boomilever(division: 'B' | 'C') {
  const r =
    division === 'B'
      ? { base: 20, line: 15, bonus: 5000, prefix: 'boomb' }
      : { base: 15, line: 10, bonus: 7500, prefix: 'boom' };
  const kg = r.bonus / 1000;
  const cap = (15000 + r.bonus) / 15000;
  // Horizontal force in the top chord for 15 kg hung 42 cm out, with the strut meeting the wall
  // d cm below the bolt: T = W × L / d.
  const chord = (d: number) => Math.round((147 * 0.42) / (d / 100));
  const strut = (d: number) => Math.round((147 * Math.hypot(42, d)) / d);
  const score = (load: number, mass: number) => (load / mass).toFixed(1);
  return buildEventCourse({
    eventId: 'boomilever',
    eventName: 'Boomilever',
    prefix: r.prefix,
    division,
    intro: `Seven units take you from the scoring formula to a tested, efficient wooden cantilever. In ${division} the base design touches the wall only above the ${r.base} cm line, and the Load Scored Bonus (${r.bonus.toLocaleString('en-US')} g) needs contact above the ${r.line} cm line plus a full 15 kg hold. Each unit pairs the statics with the decisions you make at the bench.`,
    references: [
      {
        title: 'Science Olympiad: Boomilever',
        url: `https://www.soinc.org/boomilever-${division.toLowerCase()}`,
      },
      {
        title: 'MIT OpenCourseWare: Elements of Structures',
        url: 'https://ocw.mit.edu/courses/16-20-structural-mechanics-fall-2002/',
      },
    ],
    units: [
      {
        title: 'Reading the event: score, tiers, and the bonus decision',
        objectives: [
          'Calculate a Boomilever score from load supported, bonus, and structure mass.',
          'Explain how Tier 1, Tier 2, and participation placement work.',
          'Decide when the Load Scored Bonus is worth the extra mass.',
        ],
        sections: [
          [
            'What the event asks',
            `A Boomilever is a single wooden structure that hangs off a vertical Testing Wall by resting on one Mounting Bolt. It carries a Loading Block, chain, and five-gallon bucket whose chain centerline sits 40 to 45 cm out from the wall and within 2.5 cm of the wall centerline. Sand is poured into the bucket until the structure fails, time runs out, or the load reaches its 15,000 g maximum.`,
          ],
          [
            'The score is efficiency',
            `Score equals Load Scored divided by structure mass in grams, and a high score wins. Load Scored is the Load Supported plus any Load Scored Bonus. Because mass sits in the denominator, a light structure that holds the full 15 kg beats a heavy one that holds the same load. Halving the mass doubles the score, so every unnecessary gram of wood and glue directly costs points.`,
          ],
          [
            'The bonus option',
            `The Load Scored Bonus adds ${r.bonus.toLocaleString('en-US')} g to Load Scored, but only if two things happen. The structure may touch the wall only above the ${r.line} cm contact depth line, and it must hold the full 15 kg. If a bonus-style structure fails early, it is simply scored on its load without the bonus, and no construction violation is recorded for missing the 15 kg.`,
          ],
          [
            'Tiers',
            `Tier 1 structures meet every construction and competition rule. Tier 2 structures break one or more of them; for example, a base design that touches the wall below the ${r.base} cm line is placed in Tier 2. Every Tier 1 score ranks above every Tier 2 score. A structure that cannot hold the Loading Assembly, lacks eye protection, or does not fit the stand earns participation points only.`,
          ],
          [
            'Minimum and maximum load',
            `The Loading Assembly (block, eyebolt, chain, S-hook, and bucket) may weigh no more than 1,500 g, and that assembly is the Minimum Load Supported. A structure that cannot hold it scores participation only. The maximum counted load is 15,000 g, so once you can reliably hold 15 kg, strength beyond that earns nothing; the only way up is to remove mass.`,
          ],
          [
            'The bonus decision',
            `With the bonus, a perfect run scores ${(15000 + r.bonus).toLocaleString('en-US')} g divided by mass, instead of 15,000 g divided by mass. That is ${cap.toFixed(2)} times more load, so a bonus design wins as long as it weighs less than ${cap.toFixed(2)} times the matching base design. The shallower contact makes the members carry larger forces, so the real question is how much extra wood that costs you.`,
          ],
        ],
        terms: [
          [
            'Load Scored',
            `Load Supported plus the ${r.bonus.toLocaleString('en-US')} g bonus when the bonus rules are met.`,
          ],
          ['Structural efficiency', 'Load carried per gram of structure; here, the score itself.'],
          ['Tier 1', 'Placement for structures that meet every construction and competition rule.'],
          [
            'Tier 2',
            'Placement for structures that break one or more rules; ranks below all of Tier 1.',
          ],
          ['Loading Assembly', 'Block, eyebolt, chain, S-hook, and bucket; at most 1,500 g.'],
          [
            'Contact depth line',
            `A horizontal wall line (10, 15, 20 cm below the bolt) limiting where the structure may touch.`,
          ],
        ],
        example: [
          `Team A's base design weighs 10.0 g and holds 15 kg. Team B's bonus design weighs 13.0 g, touches only above the ${r.line} cm line, and also holds 15 kg. Who scores higher?`,
          [
            `Team A: 15,000 g ÷ 10.0 g = ${score(15000, 10)}.`,
            `Team B: (15,000 + ${r.bonus.toLocaleString('en-US')}) g ÷ 13.0 g = ${score(15000 + r.bonus, 13)}.`,
            `Compare: 13.0 g is ${(13 / 10).toFixed(2)} times Team A's mass, ${13 / 10 < cap ? 'below' : 'above'} the ${cap.toFixed(2)} break-even ratio.`,
          ],
          `Team ${15000 / 10 > (15000 + r.bonus) / 13 ? 'A' : 'B'} wins; the bonus pays off only while the extra mass stays under the ${cap.toFixed(2)}× break-even.`,
        ],
        mcq: [
          [
            'A structure weighs 8.00 g and holds 15,000 g without the bonus. What is its score?',
            '1,875',
            ['120', '15,000', '1,500'],
            'Score is Load Scored divided by structure mass: 15,000 g ÷ 8.00 g = 1,875. Multiplying (120,000) or reporting the load alone ignores that mass sits in the denominator of the efficiency score.',
          ],
          [
            'A bonus-style structure breaks at 11,000 g. How is it scored?',
            'On 11,000 g with no bonus and no violation',
            [
              'On 11,000 g plus the bonus',
              'Participation points only',
              'Tier 2 with a construction violation',
            ],
            `The bonus requires holding the full 15 kg. Missing it removes only the bonus; the rules state no construction violation is recorded, so the structure keeps its Tier and is scored on the 11,000 g it held.`,
          ],
          [
            `A base design touches the wall below the ${r.base} cm contact depth line. Where is it placed?`,
            'Tier 2',
            ['Tier 1 with a smaller score', 'Participation only', 'Disqualified'],
            `Touching below the ${r.base} cm line breaks a construction rule, which places the structure in Tier 2. It still gets a score, but every Tier 1 structure ranks above it.`,
          ],
        ],
        written: [
          [
            'Why does strength beyond 15 kg add nothing to the score?',
            'The maximum Load Supported is 15,000 g, so once a structure reliably holds that, the numerator is fixed and the only way to raise the score is to reduce mass.',
            'Loading stops at 15,000 g, so any reserve strength is unused mass. Good answers connect the capped numerator to the mass denominator: past 15 kg, efficiency improves only by removing wood or glue.',
          ],
          [
            `State the mass ratio below which a bonus design beats a base design, and show where it comes from.`,
            `(15,000 + ${r.bonus}) ÷ 15,000 = ${cap.toFixed(2)}. If both hold 15 kg, the bonus design wins whenever its mass is less than ${cap.toFixed(2)} times the base design's mass.`,
            `Setting the two scores equal gives (15,000 + ${r.bonus.toLocaleString('en-US')})/m_bonus = 15,000/m_base, so m_bonus/m_base = ${cap.toFixed(2)}. Lighter than that ratio, the bonus wins; heavier, the base design wins.`,
          ],
          [
            'Why might a team choose the base option even though the bonus is large?',
            'A shallower wall contact makes member forces larger, so the bonus structure may need much more wood, and it risks failing before 15 kg and losing the bonus anyway.',
            'The bonus is all-or-nothing at 15 kg, and the shallower contact raises the forces in the chord and strut. If the extra mass exceeds the break-even ratio, or reliability drops, the base design scores more.',
          ],
          [
            'What is the minimum load a structure must hold to be scored above participation?',
            'It must hold the Loading Assembly itself (up to 1,500 g); a structure that cannot carry the empty assembly receives participation points only.',
            'The Minimum Load Supported is the Loading Assembly mass. Answers should name the assembly parts or its 1,500 g limit and say that failing to hold it means participation only.',
          ],
        ],
        flow: [
          ['Hold the load', 'Load Supported is capped at 15,000 g.'],
          [
            'Add the bonus',
            `${r.bonus.toLocaleString('en-US')} g more if contact stays above ${r.line} cm and 15 kg holds.`,
          ],
          ['Divide by mass', 'Fewer grams means a higher score.'],
        ],
        compare: [
          ['Base option', `Contact above ${r.base} cm; lower member forces`, 'No bonus available.'],
          [
            'Bonus option',
            `Contact above ${r.line} cm; ${r.bonus.toLocaleString('en-US')} g bonus`,
            'Higher forces and an all-or-nothing 15 kg hold.',
          ],
          ['Tier 2', 'Still scored on load ÷ mass', 'Ranks below every Tier 1 structure.'],
        ],
        challenge: 'Compare base and bonus designs at different masses and find where they tie.',
        takeaway: `Past 15 kg, mass is everything; the bonus is worth it only below a ${cap.toFixed(2)}× mass ratio.`,
        evidence: {
          observations: [
            ['Prototype 1 (base)', '9.6 g, held 15,000 g, contact at 14 cm below the bolt.'],
            ['Prototype 2 (bonus)', `12.1 g, held 15,000 g, contact above the ${r.line} cm line.`],
            ['Prototype 3 (bonus, lightened)', '10.4 g, failed at 12,300 g when a joint cracked.'],
            [
              'Supervisor note',
              `Prototype 1's contact point is ${14 < r.base ? 'above' : 'below'} the ${r.base} cm line.`,
            ],
          ],
          question: 'Which prototype should the team bring, based on expected score?',
          options: ['Prototype 2', 'Prototype 1', 'Prototype 3'],
          correct: 0,
          explanation: `Prototype 2 scores ${score(15000 + r.bonus, 12.1)} (bonus earned). Prototype 1 scores ${score(15000, 9.6)}. Prototype 3 lost its bonus by failing early and scores only ${score(12300, 10.4)}. The reliable bonus design is best here.`,
        },
      },
      {
        title: 'Statics of a cantilever: moments, tension, and compression',
        objectives: [
          'Find the moment the load creates about the Mounting Bolt.',
          'Identify which members carry tension and which carry compression.',
          'Use a force couple to estimate member forces.',
        ],
        sections: [
          [
            'Equilibrium',
            'A structure that is not moving is in static equilibrium: the forces in every direction add to zero, and the moments (turning effects) about any point add to zero. A Boomilever has only a few external forces: the hanging load pulling down at the loading block, the bolt pushing on the structure, and the wall pushing back where the structure touches it below the bolt.',
          ],
          [
            'The moment of the load',
            'A moment is force times the perpendicular distance to the pivot. Fifteen kilograms weighs about 147 N. Hung 42 cm from the wall, it creates a moment of 147 × 0.42 ≈ 62 N·m trying to rotate the structure downward about the bolt. That moment must be balanced by a pair of opposite horizontal forces, one at the bolt and one at the lower wall contact.',
          ],
          [
            'Tension at the top',
            'Because the load tries to rotate the structure away from the wall at the top, the top member is pulled outward and hooks on the bolt. It is in tension. Wood is very strong in tension along the grain, so a tension chord can be a thin strip. The weak spots are usually the joints at each end, where glue must transfer the whole pull.',
          ],
          [
            'Compression at the bottom',
            'The lower member, often called the compression member or strut, runs from the wall contact out to the loading point. The load pushes it into the wall, so it is squeezed. Compression members fail by buckling, bowing sideways long before the wood crushes. That is why the compression side is usually the heaviest part of a good Boomilever and why bracing it matters.',
          ],
          [
            'The force couple',
            `The horizontal pull at the bolt and the horizontal push at the wall contact form a couple. Their size is the load moment divided by the vertical distance between them. For 147 N at 42 cm, a contact ${r.base} cm below the bolt gives about ${chord(r.base)} N; at ${r.line} cm it rises to about ${chord(r.line)} N. Halving the depth doubles these forces.`,
          ],
          [
            'Members as a triangle',
            'The simplest Boomilever is a triangle: a near-horizontal tension chord, a sloping compression strut, and the wall. At the loading point, the strut force and chord force must combine to hold the load straight up. A steeper strut carries more of the vertical load directly, while a flatter strut must push harder to do the same job. Drawing this triangle of forces is the core design skill.',
          ],
        ],
        terms: [
          ['Moment', 'Force times perpendicular distance; the turning effect about a point.'],
          ['Static equilibrium', 'Forces and moments both sum to zero, so nothing moves.'],
          ['Tension member', 'A member being pulled; in a Boomilever, usually the top chord.'],
          [
            'Compression member',
            'A member being pushed; usually the lower strut, at risk of buckling.',
          ],
          ['Force couple', 'Two equal, opposite, offset forces that balance a moment.'],
          ['Free-body diagram', 'A sketch of one object with every external force acting on it.'],
        ],
        example: [
          `A 15 kg load hangs 42 cm from the wall. The strut meets the wall ${r.base} cm below the bolt. Estimate the horizontal chord force.`,
          [
            'Weight: 15 kg × 9.8 m/s² ≈ 147 N.',
            'Moment about the wall contact: 147 N × 0.42 m ≈ 62 N·m.',
            `Chord force = moment ÷ lever arm = 62 ÷ ${(r.base / 100).toFixed(2)} ≈ ${chord(r.base)} N.`,
          ],
          `The tension chord carries about ${chord(r.base)} N, roughly ${(chord(r.base) / 147).toFixed(1)} times the load itself.`,
        ],
        mcq: [
          [
            'In a typical Boomilever, which member is in tension?',
            'The top chord that hooks on the bolt',
            ['The strut pressing on the wall', 'The Loading Block', 'Every member equally'],
            'The load tries to rotate the structure down and away from the wall, so the top member is pulled outward against the bolt. The lower strut is pushed into the wall and is in compression.',
          ],
          [
            'If the wall contact moves from 20 cm to 10 cm below the bolt, the chord force:',
            'Doubles',
            ['Halves', 'Stays the same', 'Drops to zero'],
            'Chord force equals the load moment divided by the vertical distance between bolt and contact. Halving that lever arm from 20 cm to 10 cm doubles the force for the same load.',
          ],
          [
            'How do compression members usually fail in a Boomilever?',
            'By buckling sideways',
            ['By stretching apart', 'By melting the glue', 'By crushing the bolt'],
            'Slender wooden members under compression bow out sideways (buckle) at loads far below the wood’s crushing strength. That is why struts are heavier and braced.',
          ],
        ],
        written: [
          [
            'Calculate the moment of a 147 N load hung 0.44 m from the wall.',
            '147 N × 0.44 m ≈ 64.7 N·m.',
            'Moment is force times perpendicular distance: 147 × 0.44 = 64.68 N·m. Answers should include units (N·m) and recognize that hanging the load farther out raises the moment.',
          ],
          [
            'Explain why the top chord can be much thinner than the compression strut.',
            'Wood is strong in tension along the grain and a tension member cannot buckle, while a slender strut buckles under compression at a much lower force.',
            'Tension members are limited by material strength, which is high for wood along the grain. Compression members are limited by buckling, which depends on length and stiffness, so they need more cross-section.',
          ],
          [
            'What two horizontal forces form the couple that balances the load moment?',
            'The outward pull of the structure on the bolt (top) and the inward push of the structure against the wall at the lower contact.',
            'The bolt holds the top in, the wall holds the bottom out, and these opposite horizontal forces separated by the contact depth create a moment equal and opposite to the load moment.',
          ],
          [
            'Why does a flatter strut need to push harder?',
            'Only the vertical component of the strut force supports the load; a flatter angle gives a smaller vertical share, so the total force must be larger.',
            'At the loading point the strut force resolves into vertical and horizontal parts. A shallow strut has a small vertical part per newton of force, so supporting the same load requires a larger total force.',
          ],
        ],
        flow: [
          ['Load', 'Weight hangs at 40–45 cm and creates a moment.'],
          ['Couple', 'Bolt pull and wall push balance that moment.'],
          ['Members', 'Chord carries tension, strut carries compression.'],
        ],
        compare: [
          ['Tension chord', 'Pulled along its length', 'Joints often fail first.'],
          ['Compression strut', 'Pushed into the wall', 'Buckles if slender or unbraced.'],
          ['Deep contact', 'Long lever arm, smaller forces', 'Not allowed below the contact line.'],
        ],
        challenge: 'Change the contact depth and watch the chord and strut forces respond.',
        takeaway:
          'Member forces equal the load moment divided by the contact depth: deeper is gentler.',
        evidence: {
          observations: [
            ['Test A', 'Strut 15 cm deep, 3 mm square: bowed sideways at 9 kg.'],
            ['Test B', 'Same strut with one mid-length brace: held 15 kg.'],
            ['Test C', 'Chord 1.5 × 3 mm: never failed in any test.'],
            ['Test D', 'Chord-to-bolt joint glued with a single drop: pulled off at 12 kg.'],
          ],
          question: 'What do these tests show about where the structure needs material?',
          options: [
            'The strut needs bracing and joints need care; the chord is already strong enough',
            'The chord needs to be much thicker',
            'All members should be the same size',
          ],
          correct: 0,
          explanation:
            'The unbraced strut buckled, and a brace fixed it without changing the wood. The thin chord never failed, so adding wood there wastes mass. The pulled-off joint shows glue area, not member size, limited Test D.',
        },
      },
      {
        title: 'Geometry: contact depth, strut angle, and the bonus line',
        objectives: [
          'Relate contact depth and reach to chord and strut forces.',
          'Explain why the bonus contact line makes the structure heavier.',
          'Choose a geometry that balances force, length, and mass.',
        ],
        sections: [
          [
            'Two numbers set the forces',
            'In the simple triangle model, the reach L (wall to chain) and the contact depth d (bolt to wall contact) set every member force. Chord tension equals W × L ÷ d. Strut compression equals W × (strut length) ÷ d, where strut length is the hypotenuse √(L² + d²). Mass grows with force and with length, so geometry is the first design decision.',
          ],
          [
            'Reach',
            'The chain centerline must be 40 to 45 cm from the wall. Every extra centimeter of reach raises the moment, so aim close to 40 cm while leaving margin for measurement and for the structure deflecting under load. Many teams target about 41 cm. Being under 40 cm is a rules violation, so never cut it to the edge.',
          ],
          [
            'Depth and the contact lines',
            `The Testing Wall has contact depth lines at 10, 15, and 20 cm below the bolt. The base design may touch only above the ${r.base} cm line, and the bonus design only above the ${r.line} cm line. Since deeper contact lowers forces, base designs usually put the strut foot just above the ${r.base} cm line, and bonus designs just above the ${r.line} cm line.`,
          ],
          [
            'Cost of the bonus geometry',
            `At ${r.base} cm depth, the chord carries about ${chord(r.base)} N and the strut about ${strut(r.base)} N for a full 15 kg. At ${r.line} cm, those rise to about ${chord(r.line)} N and ${strut(r.line)} N. The strut is also flatter, so its buckling length grows. Together, a bonus strut usually needs noticeably more wood or more bracing.`,
          ],
          [
            'Keeping clear of the lines',
            'The rule is about where the structure touches, not where it ends. If the strut foot is a block, its lowest edge must stay above the line during the whole test, including when the structure rotates slightly under load. Leave a few millimeters of margin. A foot that slides down the wall as the load rises can cross the line mid-test.',
          ],
          [
            'Beyond the single triangle',
            'Many designs use two chords and two struts in a narrow pyramid, which resists twisting and sideways tipping. Others add a second, shallower brace from the strut to the chord to shorten buckling lengths. Each extra member adds mass, so add it only where a test shows a failure it prevents. The triangle model still predicts the main force flow.',
          ],
        ],
        terms: [
          ['Reach', 'Horizontal distance from wall to chain centerline: 40–45 cm.'],
          ['Contact depth', 'Vertical distance from the bolt centerline down to the wall contact.'],
          [
            'Strut angle',
            'Angle of the compression member from horizontal; steeper means less force.',
          ],
          ['Hypotenuse', 'Strut length, √(reach² + depth²) in the triangle model.'],
          ['Pyramid layout', 'Paired chords and struts that resist twisting and side loads.'],
          ['Margin', 'Deliberate clearance from a rule limit to absorb error and deflection.'],
        ],
        example: [
          `Compare strut forces for a full 15 kg (147 N) at 42 cm reach, with contact at ${r.base} cm versus ${r.line} cm.`,
          [
            `At ${r.base} cm: strut length √(42² + ${r.base}²) ≈ ${Math.hypot(42, r.base).toFixed(1)} cm; force = 147 × ${Math.hypot(42, r.base).toFixed(1)} ÷ ${r.base} ≈ ${strut(r.base)} N.`,
            `At ${r.line} cm: length ≈ ${Math.hypot(42, r.line).toFixed(1)} cm; force ≈ ${strut(r.line)} N.`,
            `Ratio: ${(strut(r.line) / strut(r.base)).toFixed(2)} times more compression at the shallower contact.`,
          ],
          'The bonus geometry asks the strut for more force over a similar length, so it must be stiffer or better braced.',
        ],
        mcq: [
          [
            'Why do most teams aim the chain near 41 cm rather than 45 cm?',
            'Less reach means a smaller moment and smaller member forces',
            [
              'The rules require exactly 41 cm',
              'Longer reach lowers the score directly',
              'The bucket hits the wall at 45 cm',
            ],
            'The load moment equals weight times reach. Staying near the 40 cm minimum (with margin) keeps the moment and every member force as small as the rules allow.',
          ],
          [
            'In the triangle model, which change lowers the strut compression the most?',
            'Moving the wall contact deeper (within the allowed line)',
            [
              'Making the chord thicker',
              'Adding glue to the bolt hook',
              'Moving the chain from 41 to 44 cm',
            ],
            'Strut force scales with strut length divided by contact depth. Increasing depth raises the denominator much faster than the length grows, so forces drop. A thicker chord or more reach does not help.',
          ],
          [
            'A base structure’s foot slides down during loading and touches below the line. What happens?',
            'It is placed in Tier 2',
            [
              'Nothing; only the starting position counts',
              'Loading restarts',
              'It earns the bonus',
            ],
            'The contact rule applies during competition testing, not just at setup. Touching below the allowed line at any point breaks a construction rule and places the structure in Tier 2.',
          ],
        ],
        written: [
          [
            `Using T = W × L ÷ d, find the chord force for 147 N at L = 0.40 m and d = ${(r.base / 100).toFixed(2)} m.`,
            `T = 147 × 0.40 ÷ ${(r.base / 100).toFixed(2)} ≈ ${Math.round((147 * 0.4) / (r.base / 100))} N.`,
            `Substituting gives ${Math.round((147 * 0.4) / (r.base / 100))} N. Answers should keep units in metres or cancel them consistently and note that the result is several times the load because d is smaller than L.`,
          ],
          [
            'Why should a strut foot stop a few millimeters above the contact line rather than right on it?',
            'The structure deflects and can slide or rotate under load, and placement is not perfect, so margin keeps the contact above the line throughout the test.',
            'Rules apply during testing. Deflection, wall friction, and setup error can move the foot downward, so a small margin protects Tier 1 placement at almost no force cost.',
          ],
          [
            'Explain why the bonus contact line usually makes a Boomilever heavier.',
            'A shallower contact shortens the lever arm of the couple, so chord and strut forces rise, and a flatter strut buckles more easily, requiring more wood or bracing.',
            'Both effects come from geometry: forces scale with 1/d, and buckling resistance falls with a flatter, longer-feeling strut. More material or bracing is the usual cost of the bonus.',
          ],
          [
            'What does a pyramid layout gain over a single flat triangle?',
            'Two spread-out chords and struts resist twisting and sideways tipping of the load, which a single plane triangle cannot.',
            'A flat triangle is stiff only in its own plane. Spreading members apart gives width, so off-center loads or bucket swing do not twist the structure off the bolt.',
          ],
        ],
        flow: [
          ['Pick reach', 'Close to 40 cm with margin.'],
          ['Pick depth', `Just above the ${r.base} cm (base) or ${r.line} cm (bonus) line.`],
          ['Size members', 'Force from geometry sets wood and bracing.'],
        ],
        compare: [
          ['Deep contact', 'Smallest forces', 'Limited by the contact line.'],
          ['Short reach', 'Smallest moment', 'Must stay at least 40 cm.'],
          ['Extra bracing', 'Shorter buckling lengths', 'Adds mass and joints.'],
        ],
        challenge:
          'Find the lightest geometry that keeps the strut force under your wood’s safe limit.',
        takeaway: 'Reach and depth set the forces before any wood is chosen.',
        evidence: {
          observations: [
            ['Design X', `Reach 45 cm, contact ${r.base - 1} cm: strut needed 2 braces.`],
            ['Design Y', `Reach 41 cm, contact ${r.base - 1} cm: strut needed 1 brace.`],
            ['Design Z', `Reach 41 cm, contact ${r.line - 1} cm: strut needed 3 braces.`],
          ],
          question: 'What explains the change in bracing between the designs?',
          options: [
            'Longer reach and shallower contact both raise strut force',
            'Bracing depends only on wood type',
            'Shallower contact always lowers force',
          ],
          correct: 0,
          explanation:
            'Design Y has the smallest reach and the deeper contact, so it carries the least force. Adding reach (X) or moving the contact up (Z) both raise compression, so those designs need extra braces.',
        },
      },
      {
        title: 'Wood selection, density, and buckling',
        objectives: [
          'Compare balsa and basswood for tension and compression members.',
          'Sort wood by density to match strength to job.',
          'Use the Euler buckling idea to size and brace a strut.',
        ],
        sections: [
          [
            'What counts as wood',
            'The structure must be wood joined by adhesive, and nothing else. Wood means natural wood from stems, trunks, or roots. Plywood and other commercially laminated wood, bamboo, paper, particleboard, and composites are not allowed, and wood may not be painted, soaked in glue, or chemically treated. You may laminate pieces together yourself with adhesive, and there is no limit on cross-section sizes.',
          ],
          [
            'Balsa and basswood',
            'Balsa is extremely light, with densities from roughly 0.08 to 0.25 g/cm³, and has excellent stiffness for its weight. Basswood is about two to three times denser but more uniform and much tougher at joints. Many Boomilevers use balsa for compression struts, where stiffness per gram matters, and basswood or hard balsa for the tension chord and the bolt hook, where joints carry concentrated force.',
          ],
          [
            'Density sorting',
            'Two balsa sticks of the same size can differ in mass by a factor of two, and stiffness rises with density. Weigh every stick and calculate density as mass ÷ (length × width × thickness). Save light sticks for lightly loaded bracing and the stiffest, denser sticks for the main strut. Labeling sticks with their density lets you rebuild a good design with matching parts.',
          ],
          [
            'Euler buckling',
            'A slender column pinned at both ends buckles at a critical load P = π²EI ÷ L², where E is stiffness, I describes the cross-section, and L is the unbraced length. For a square stick of side b, I = b⁴ ÷ 12. The square of length in the denominator is the key: halving the unbraced length makes the strut four times harder to buckle, for the cost of one small brace.',
          ],
          [
            'Shape matters',
            'Because I grows with the fourth power of width, a wider, hollow-looking cross-section is far stiffer than a solid square of the same mass. Some teams laminate thin sheets into an L or box section, or use two thin struts spaced apart with small cross braces. These tricks raise I without adding much area, which is exactly what a compression member needs.',
          ],
          [
            'Tension sizing',
            'A tension member fails when stress, force ÷ area, exceeds the wood’s tensile strength. Balsa along the grain holds very roughly 7 to 20 MPa, so a chord of a few square millimetres can carry hundreds of newtons in theory. In practice, the chord fails at its ends, where glue and grain direction matter more than area, so test joints, not just sticks.',
          ],
        ],
        terms: [
          ['Density', 'Mass per volume, g/cm³; strongly linked to balsa stiffness.'],
          ['Modulus of elasticity (E)', 'Material stiffness; resistance to stretching or bending.'],
          [
            'Second moment of area (I)',
            'How cross-section shape resists bending; b⁴/12 for a square.',
          ],
          ['Unbraced length', 'Distance between points that stop a member from bowing sideways.'],
          ['Euler load', 'Critical buckling force, π²EI/L², for a slender pinned column.'],
          ['Lamination', 'Gluing layers of wood together; allowed when done by the team.'],
        ],
        example: [
          'A strut buckles at 120 N with an unbraced length of 30 cm. A brace is added at its midpoint. Estimate the new buckling load.',
          [
            'Euler load scales with 1/L².',
            'New unbraced length is 15 cm, half the original.',
            'Load rises by (30/15)² = 4: about 480 N.',
          ],
          'One midpoint brace roughly quadruples buckling resistance, usually for less mass than a thicker strut.',
        ],
        mcq: [
          [
            'Which material is NOT allowed in a Boomilever?',
            'Commercial plywood',
            ['Team-laminated balsa', 'Basswood', 'Hard balsa'],
            'Commercially laminated wood such as plywood is excluded by the wood definition. Teams may laminate wood themselves with adhesive, and both balsa and basswood are natural wood.',
          ],
          [
            'Doubling a strut’s unbraced length changes its Euler buckling load by a factor of:',
            '1/4',
            ['1/2', '2', '4'],
            'Euler load is proportional to 1/L². Doubling L multiplies the load by 1/2² = 1/4, which is why long, unbraced compression members fail so easily.',
          ],
          [
            'A 30 cm × 0.3 cm × 0.3 cm balsa stick has a mass of 0.405 g. What is its density?',
            '0.15 g/cm³',
            ['0.015 g/cm³', '1.5 g/cm³', '0.45 g/cm³'],
            'Volume is 30 × 0.3 × 0.3 = 2.7 cm³, and 0.405 g ÷ 2.7 cm³ = 0.15 g/cm³, a typical medium balsa density.',
          ],
        ],
        written: [
          [
            'Why sort balsa by density before building?',
            'Stiffness and strength rise with density and vary widely between sticks, so sorting lets you put the stiffest wood in the strut and the lightest in lightly loaded bracing.',
            'Matching wood to the job removes wasted mass. Good answers mention the wide density range of balsa and the link between density and stiffness.',
          ],
          [
            'Explain why a box or spaced-pair strut beats a solid square of the same mass.',
            'Moving material away from the center raises the second moment of area I much faster than it raises area, so buckling resistance rises for the same mass.',
            'I grows with distance squared from the neutral axis, so spreading material out increases stiffness against bowing without adding grams.',
          ],
          [
            'Give one reason the tension chord often fails at its ends rather than its middle.',
            'Force must pass through glue joints and the bolt hook, where contact areas are small and stress concentrates, while the middle carries only uniform tension.',
            'Stress concentrates where load enters and leaves a member. Glue area, grain direction at the hook, and crushing at the bolt are the usual failure points.',
          ],
          [
            'Can a team glue three balsa strips into one thicker strut? Explain.',
            'Yes; lamination by the team with adhesive is allowed. Only commercially laminated wood such as plywood is prohibited.',
            'The rules distinguish team lamination (allowed without restriction) from commercial lamination like plywood (not allowed). Answers should name that distinction.',
          ],
        ],
        flow: [
          ['Weigh', 'Measure every stick’s mass and size.'],
          ['Sort', 'Calculate density and label.'],
          ['Assign', 'Dense, stiff wood to the strut; light wood to bracing.'],
        ],
        compare: [
          ['Balsa', 'Very light, high stiffness per gram', 'Variable; soft at joints.'],
          ['Basswood', 'Uniform and tough at joints', 'Heavier for the same size.'],
          ['Bracing', 'Cuts unbraced length, ×4 per halving', 'Adds joints and some mass.'],
        ],
        challenge:
          'Find the lightest strut that just clears the compression force your geometry requires.',
        takeaway: 'Compression is a stiffness and length problem: brace before you bulk up.',
        evidence: {
          observations: [
            ['Stick A', '0.11 g/cm³ — failed as a strut at 6 kg.'],
            ['Stick B', '0.18 g/cm³, same size — held 11 kg as a strut.'],
            ['Stick C', '0.11 g/cm³ with a midpoint brace — held 15 kg.'],
          ],
          question: 'What is the best conclusion from these strut tests?',
          options: [
            'Both density and unbraced length control buckling; bracing helped most',
            'Only density matters',
            'Light wood can never be a strut',
          ],
          correct: 0,
          explanation:
            'Denser wood (B) was stiffer and held more, but light wood with a brace (C) held the most, because halving the unbraced length quadruples the Euler load. Both factors matter.',
        },
      },
      {
        title: 'Joints, adhesives, and the bolt hook',
        objectives: [
          'Explain how glue joints carry shear and why area matters.',
          'Design a bolt hook that seats securely on the Mounting Bolt.',
          'Avoid adding mass with excess adhesive.',
        ],
        sections: [
          [
            'Adhesive rules',
            'Any commercially available adhesive may be used, such as wood glue, cyanoacrylate (CA), epoxy, or hot melt, but adhesive may be used only to join pieces. Tape is not allowed, and wood may not be coated or soaked in glue to strengthen it. That means glue must sit in joints, not spread along members as a reinforcing skin.',
          ],
          [
            'How glue joints carry load',
            'Most joints transfer force through shear: two surfaces sliding past each other with glue resisting. Joint strength is roughly glue shear strength times bonded area, so a butt joint where only the stick end touches is weak, while an overlapped or gusseted joint is much stronger. Long-grain-to-long-grain contact bonds far better than end grain, which soaks up glue.',
          ],
          [
            'Gussets',
            'A gusset is a small plate of thin wood glued across a joint, adding bonded area on both members. Gussets turn a weak butt joint into a strong overlapped one. Because they add mass, use them where tests show a joint failing, especially at the chord-to-bolt hook and where the strut meets the chord at the loading point.',
          ],
          [
            'The bolt hook',
            'The structure attaches by resting on the Mounting Bolt, a 1/4-20 connector bolt with about 3.0 cm of clearance between its nearest face and the wall. The hook must seat on the bolt shaft within that clearance and pass the whole chord tension into it. Crushing of soft wood against the round bolt is a common failure; a hardwood or end-grain bearing block spreads the pressure.',
          ],
          [
            'The loading point',
            'The Loading Block (5 cm × 5 cm × about 2 cm) sits on the structure with its eyebolt hanging below. Before sand is added, the bottom of the block must be above the horizontal plane through the bolt centerline. The structure must support only the block, which then carries the rest of the assembly. A small platform or pair of rails under the block keeps it level and centered.',
          ],
          [
            'Glue mass',
            'A drop of CA can weigh several hundredths of a gram, and a lightweight structure may have dozens of joints. Excess glue can add 10 to 20 percent to a structure’s mass. Use thin CA for tight-fitting joints, apply with a fine tip, and wipe away runs. Weigh a structure before and after gluing to see how much adhesive you are really carrying.',
          ],
        ],
        terms: [
          ['Shear', 'Force that slides one surface along another.'],
          ['Gusset', 'A thin plate glued across a joint to increase bonded area.'],
          ['Butt joint', 'Members meeting end-to-face, with little glue area.'],
          ['End grain', 'The cut end of wood fibers; bonds poorly and absorbs glue.'],
          [
            'Bearing stress',
            'Pressure where one part pushes on another, such as wood on the bolt.',
          ],
          ['Mounting Bolt', '1/4-20 connector bolt set about 3.0 cm out from the wall face.'],
        ],
        example: [
          'A chord joint must carry 300 N. Your glue holds about 2 N per mm² of long-grain overlap. How much bonded area do you need, with a safety factor of 1.5?',
          [
            'Required strength: 300 N × 1.5 = 450 N.',
            'Area = 450 N ÷ 2 N/mm² = 225 mm².',
            'A 15 mm × 15 mm overlap, or two gussets of about 113 mm² each, would do.',
          ],
          'Joint area, not member size, decides whether the chord end survives.',
        ],
        mcq: [
          [
            'Which joint is usually strongest for the same glue?',
            'A long-grain overlap with gussets',
            [
              'An end-grain butt joint',
              'A joint wrapped in tape',
              'A joint where glue coats the whole member',
            ],
            'Overlaps and gussets give large long-grain bonded area, which carries shear well. End grain bonds poorly, tape is banned, and coating members in glue is not allowed.',
          ],
          [
            'Before sand is added, the bottom of the Loading Block must be:',
            'Above the horizontal plane through the bolt centerline',
            ['Below the bolt plane', 'Touching the wall', 'Exactly 45 cm from the wall'],
            'The rules require the block’s bottom to start above the bolt-centerline plane. During loading it may sag below, but it must start above.',
          ],
          [
            'Why do soft-wood bolt hooks often fail by crushing?',
            'The round bolt concentrates force on a small area of soft wood',
            [
              'The bolt heats up under load',
              'Glue cannot touch metal',
              'The bolt is too far from the wall',
            ],
            'Bearing stress equals force over contact area. A thin bolt pressing into soft balsa creates high stress, so the wood crushes; a harder bearing block spreads the load.',
          ],
        ],
        written: [
          [
            'Why are adhesive tapes and glue-soaked wood both banned, and what does that mean for design?',
            'Adhesive may only join pieces; tape is excluded, and glue cannot be used to reinforce members. Strength must come from wood choice and joint design.',
            'The definitions limit adhesive to joining. That forces strength into geometry, wood selection, and joint area, not into coatings or wraps.',
          ],
          [
            'Describe one way to keep the Loading Block centered within 2.5 cm of the wall centerline.',
            'Build two short rails or a small cradle at the loading point that fit the 5 cm block, so it cannot slide sideways off center.',
            'Physical guides make placement repeatable under time pressure. Any answer that constrains sideways block movement at the loading point is valid.',
          ],
          [
            'How could you find out how much of your structure’s mass is glue?',
            'Weigh all cut pieces before assembly, then weigh the finished structure; the difference is adhesive.',
            'Measuring before and after gluing isolates adhesive mass and shows whether glue technique is costing efficiency.',
          ],
          [
            'Why must the hook fit within the bolt’s 3.0 cm clearance?',
            'The bolt sticks out only about 3.0 cm from the wall, so the hook and any bearing surface must sit on that exposed shaft without touching the nut or washer region improperly.',
            'The hook must seat fully on the exposed shaft. Designs too thick for the clearance may sit on the bolt head or slip, so measure your hook against the 3.0 cm space.',
          ],
        ],
        flow: [
          ['Fit', 'Cut joints so surfaces meet tightly.'],
          ['Bond', 'Thin glue on long grain, gussets where tested.'],
          ['Check', 'Weigh and test joints alone before full builds.'],
        ],
        compare: [
          ['CA glue', 'Fast, light, wicks into tight joints', 'Brittle; poor gap filling.'],
          ['Wood glue', 'Tough, good on long grain', 'Slow cure, heavier water content at first.'],
          ['Gusset', 'Adds bond area', 'Adds mass at every use.'],
        ],
        challenge:
          'Size a joint so it carries the chord force with a safety margin and minimum area.',
        takeaway:
          'Most Boomilevers fail at joints; design the load path through them deliberately.',
        evidence: {
          observations: [
            ['Failure 1', 'Hook crushed into an oval around the bolt at 10 kg.'],
            ['Failure 2', 'Strut-to-chord butt joint split at 13 kg.'],
            ['Fix trial', 'Basswood bearing pad (+0.15 g) and two gussets (+0.10 g): held 15 kg.'],
          ],
          question: 'Why did the fix work?',
          options: [
            'It lowered bearing stress at the bolt and increased joint glue area',
            'It made the strut longer',
            'It moved the chain farther from the wall',
          ],
          correct: 0,
          explanation:
            'The harder pad spread bolt force over more area, and gussets added long-grain bond area at the butt joint. Both targeted the observed failure points with very little extra mass.',
        },
      },
      {
        title: 'The test apparatus, setup, and loading procedure',
        objectives: [
          'Describe the Testing Wall, contact lines, and Mounting Bolt Assembly.',
          'List what the Event Supervisor checks before sand is poured.',
          'Plan a six-minute setup and loading routine.',
        ],
        sections: [
          [
            'The Testing Wall',
            'The wall is a rigid, smooth surface at least 40 cm wide and 30 cm high, set plumb with a level. A single bolt hole sits about 5 cm below the top and centered side to side, with its horizontal and vertical centerlines marked. Horizontal contact depth lines are drawn 10, 15, and 20 cm below the bolt center, and two vertical contact width lines sit 4.0 cm either side of it.',
          ],
          [
            'Mounting Bolt Assembly',
            'The bolt is a 1/4-20 connector bolt about 60 mm long, held by a nut and washer on each side of the wall, with 3.0 ± 0.1 cm between the wall and the nearest face of the bolt. Teams may not adjust it. Your hook must work with that exact geometry, so build a practice wall to the same dimensions.',
          ],
          [
            'Check-in',
            'At check-in you may not leave, receive help, or alter the structure. The supervisor confirms eye protection and construction rules, records your Estimated Load Supported (a tiebreaker), and weighs the structure to 0.01 g where possible. The estimate matters: ties on mass are broken by whose estimate is closest to the actual load held.',
          ],
          [
            'Before loading',
            `You have six minutes to mount the structure and assemble the load. The supervisor checks bolt seating, that only the block is supported, the chain position (40–45 cm out, within 2.5 cm of center), wall contact zones, and that the block starts above the bolt plane. They also confirm whether contact stays above the ${r.line} cm line for the bonus, and that the bucket hangs clear of the floor.`,
          ],
          [
            'During loading',
            'Once sand starts, the structure may not be adjusted. You may steady the bucket only with the tips of the two stabilizing sticks; you may not lift or push it. Loading stops when the structure fails, anything other than the structure supports the load, the structure gets vertical support other than the bolt, or time expires.',
          ],
          [
            'Recording the result',
            'Load Supported is the mass of the assembly plus sand in the bucket, with any broken structure pieces removed, recorded to the nearest gram and capped at 15,000 g. The supervisor reviews the score sheet with you; once you acknowledge it, testing is complete. If you plan to appeal, you must leave your structure with the supervisor.',
          ],
        ],
        terms: [
          ['Testing Wall', 'Plumb, rigid wall at least 40 × 30 cm holding the bolt.'],
          ['Contact width lines', 'Vertical lines 4.0 cm either side of the bolt center.'],
          ['Estimated Load Supported', 'The team’s pre-test prediction, used as a tiebreaker.'],
          [
            'Stabilizing sticks',
            'Dowels with doorstop tips, the only allowed way to steady the bucket.',
          ],
          ['Load Supported', 'Assembly plus sand mass at the end of loading, max 15,000 g.'],
          ['Plumb', 'Exactly vertical, checked with a level.'],
        ],
        example: [
          'Plan the six-minute window for a team that has practiced setup.',
          [
            '0:00–1:30 — seat the hook, check the foot clears the line, place the block on the rails.',
            '1:30–3:00 — hang chain and bucket; confirm block above bolt plane and chain at about 41 cm.',
            '3:00 onward — pour steadily, one partner steadies with stick tips only.',
          ],
          'A rehearsed routine leaves time to pour slowly, which avoids dynamic shocks that break structures early.',
        ],
        mcq: [
          [
            'How may participants keep the bucket from swinging during loading?',
            'Only with the tips of the stabilizing sticks',
            [
              'By holding the bucket handle',
              'By resting it on a stool',
              'By pushing the structure',
            ],
            'The rules allow stabilizing only with stabilizing stick tips; the bucket may not be lifted or pushed. Other support would end loading because the load would not be carried by the structure alone.',
          ],
          [
            'What is the first tiebreaker if two teams have equal scores?',
            'Lowest structure mass',
            ['Closest load estimate', 'Fastest setup', 'Highest load'],
            'Ties are broken first by lowest structure mass, then by the Estimated Load Supported closest to the actual load supported.',
          ],
          [
            'When may a team adjust its structure?',
            'Before sand loading begins, within the six minutes',
            [
              'At any time',
              'Only after the first kilogram',
              'After check-in, before the six minutes',
            ],
            'No alterations are allowed after check-in begins, apart from setting the structure on the apparatus, and the structure may not be adjusted once sand starts.',
          ],
        ],
        written: [
          [
            'Why should a team build a practice wall matching the official dimensions?',
            'The hook, contact foot, and reach depend on exact bolt clearance, bolt height, and contact lines, so practice on matching geometry reveals fit and rule problems before competition.',
            'A practice wall turns rules into measurements you can check every build: 3.0 cm bolt clearance, contact lines, and the 40–45 cm chain window.',
          ],
          [
            'Why is pouring sand steadily better than dumping it quickly?',
            'Fast pouring creates sudden dynamic loads and bucket swing that can exceed the static load and break the structure early.',
            'Impact and swing add force on top of the sand’s weight. Smooth pouring keeps the load close to static, so the structure reaches its true capacity.',
          ],
          [
            'List three situations that end loading.',
            'The structure fails; the load is supported by something other than the structure; the structure receives vertical support besides the bolt; or time expires.',
            'Any three of the four official stop conditions earn full credit. Each ends loading because the measured load would no longer reflect the structure alone.',
          ],
          [
            'How should a team choose its Estimated Load Supported?',
            'Base it on consistent test data from identical builds; a team that reliably holds 15 kg should estimate 15,000 g.',
            'The estimate breaks ties, so it should come from logged tests. Most competitive structures that reliably hold the full load estimate 15,000 g.',
          ],
        ],
        flow: [
          ['Check in', 'Mass, estimate, eye protection.'],
          ['Set up', 'Seat hook, place block, hang bucket in six minutes.'],
          ['Load', 'Pour steadily; steady only with stick tips.'],
        ],
        compare: [
          ['Pre-load checks', 'Placement and contact verified', 'No adjusting after sand starts.'],
          ['Stick tips', 'Allowed bucket steadying', 'No lifting or pushing.'],
          ['Estimate', 'Second tiebreaker', 'Guessing low or high can cost a tie.'],
        ],
        challenge: 'Check a setup against every pre-loading requirement before you pour.',
        takeaway: 'A rehearsed setup protects a good structure from a bad test.',
        evidence: {
          observations: [
            ['Run 1', 'Setup took 5 min; fast pour; failed at 9 kg with violent swing.'],
            ['Run 2', 'Setup took 2 min; slow pour with stick tips; held 15 kg.'],
            ['Inspection', 'Both structures were identical builds from the same wood batch.'],
          ],
          question: 'What most likely caused the difference?',
          options: [
            'Rushed loading and bucket swing in Run 1',
            'Different wood in Run 2',
            'The bonus line',
          ],
          correct: 0,
          explanation:
            'The builds were identical, so the procedure differed. A rushed pour with swing adds dynamic load, while a calm pour with stick tips keeps the load near its static value.',
        },
      },
      {
        title: 'Testing, failure analysis, and iteration',
        objectives: [
          'Run controlled tests that change one variable at a time.',
          'Read failure modes to decide what to change next.',
          'Keep a build log that predicts competition performance.',
        ],
        sections: [
          [
            'Test to failure, then to 15 kg',
            'Early prototypes should be loaded until they break, because the failure shows the weakest part. Once a design reliably holds 15 kg, keep testing copies to confirm consistency, then remove mass in small steps. Each removal is an experiment: if the structure still holds, the removed wood was not needed; if it fails, the failure shows exactly where the limit is.',
          ],
          [
            'Read the break',
            'Look at the broken pieces. A strut that bowed sideways before snapping buckled; brace it or stiffen it. Clean wood failure in the chord means tension strength was reached; a joint that peeled with glue on one surface means bond area or fit was poor. Crushed wood at the hook means bearing stress was too high. Each mode has a different fix.',
          ],
          [
            'One change at a time',
            'If you change the strut wood, the bracing, and the joint style together, you cannot tell which helped. Change one variable per build, keep the others identical, and record mass, load held, and failure mode. Slow-motion phone video of the moment of failure often reveals which part let go first, which is not always the part that looks most broken afterward.',
          ],
          [
            'The build log',
            'Record each build’s date, wood densities, member sizes, joint method, glue type, total mass, load held, and failure description. Over time, the log shows the trend of score against mass and gives you the evidence for your Estimated Load Supported. It also prepares you for design-knowledge questions, since participants must be able to explain their structure’s construction and operation.',
          ],
          [
            'Consistency over records',
            'One extraordinary build that held 15 kg at 6 g is less useful than five builds that each held 15 kg at 7 g. Natural variation in balsa means the lightest design that works every time is the right competition structure. Build at least two competition-ready copies so damage in transport does not end your day.',
          ],
          [
            'Transport and humidity',
            'Wood absorbs moisture and gets heavier and slightly weaker in humid air. Store finished structures in a dry box, weigh them before leaving, and protect them with a padded carrier that supports the strut without loading the joints. A crack from transport is a common reason a proven design fails at competition.',
          ],
        ],
        terms: [
          ['Failure mode', 'How a part broke: buckling, tension, joint peel, or bearing crush.'],
          ['Controlled variable', 'A factor kept the same so one change can be judged.'],
          ['Build log', 'Record of each build’s materials, mass, load, and failure.'],
          ['Safety factor', 'Ratio of capacity to expected load; margin against variation.'],
          ['Consistency', 'Getting the same result from repeated, identical builds.'],
          [
            'Design knowledge',
            'Ability to explain your structure’s construction and operation, required by rules.',
          ],
        ],
        example: [
          `Your log shows: 9.2 g held 15 kg; 8.4 g held 15 kg; 7.9 g failed at 13.1 kg (strut buckled). What should the competition build be?`,
          [
            'Scores: 1,630; 1,786; 1,658.',
            'The 7.9 g build failed by buckling, so the strut is at its limit near that mass.',
            'Build two or three more at about 8.4 g to confirm they hold reliably.',
          ],
          'Compete with the 8.4 g design once it repeats; push lighter only with a stiffer strut, not by thinning it.',
        ],
        mcq: [
          [
            'A strut bowed sideways and then snapped in the middle. What is the best next change?',
            'Add a brace at mid-length',
            ['Use thicker chord wood', 'Add glue to the hook', 'Increase the reach'],
            'Bowing before breaking is buckling. Bracing halves the unbraced length and multiplies buckling resistance about four times, directly targeting the failure.',
          ],
          [
            'A joint failed and glue remained on only one surface. What does that suggest?',
            'Poor bond area or fit at that joint',
            ['The wood was too dense', 'The load was too far out', 'The bolt was loose'],
            'Glue on one side only means it never bonded well to the other surface, from a gap, end grain, or contamination. Improve fit and bond area.',
          ],
          [
            'Why change only one variable between test builds?',
            'So any change in result can be traced to that variable',
            ['It is required by the rules', 'It saves glue', 'It makes the structure lighter'],
            'Controlled experiments isolate cause and effect. Changing several things at once makes it impossible to know which change helped or hurt.',
          ],
        ],
        written: [
          [
            'Why is a reliable 7 g design better than a one-time 6 g success?',
            'Wood varies, so a design that works every time gives a dependable score, while a borderline design may fail at competition and score far lower.',
            'Expected score depends on reliability. One lucky build hides variation; repeated success shows the design has enough margin for real wood.',
          ],
          [
            'Name two items every build-log entry should record and say why.',
            'Total mass and load held, because together they give the score; failure mode, because it shows what to change.',
            'Mass, load, failure mode, wood densities, and joint method are all useful. Answers should link the recorded item to a design decision.',
          ],
          [
            'How can slow-motion video help failure analysis?',
            'It shows which part failed first, since secondary breaks happen as the structure collapses and can mislead you.',
            'After a collapse, many parts may be broken. Video reveals the initiating failure, which is the one to fix.',
          ],
          [
            'How does humidity affect a finished structure?',
            'Wood absorbs moisture, adding mass and slightly reducing stiffness, so store structures dry and weigh them before competition.',
            'Moisture raises mass, which lowers the score directly because mass is the denominator, and it slightly lowers stiffness. Dry storage protects both.',
          ],
        ],
        flow: [
          ['Build', 'Change one variable.'],
          ['Break', 'Load and film the failure.'],
          ['Log', 'Record mass, load, and mode; plan the next change.'],
        ],
        compare: [
          ['Buckling', 'Strut bows sideways', 'Fix with bracing or stiffer wood.'],
          ['Joint peel', 'Glue lets go', 'Fix with fit and area.'],
          ['Bearing crush', 'Wood dents at bolt', 'Fix with a harder pad.'],
        ],
        challenge: 'Use logged tests to choose the lightest design that holds 15 kg every time.',
        takeaway: 'Every failure is data; the log turns breaks into a better structure.',
        evidence: {
          observations: [
            ['Builds 1–3', '8.1 g, 8.3 g, 8.2 g: all held 15 kg.'],
            ['Builds 4–5', '7.4 g, 7.5 g: failed at 12 kg and 14 kg, strut buckled.'],
            ['Build 6', '7.6 g with a stiffer, denser strut: held 15 kg.'],
          ],
          question: 'What should the team do next?',
          options: [
            'Repeat Build 6 to confirm it is reliable',
            'Compete with Build 4 because it is lightest',
            'Return to 8.2 g and stop testing',
          ],
          correct: 0,
          explanation:
            'Build 6 fixed the buckling failure at a lower mass than Builds 1–3, but one success is not proof. Repeating it shows whether the improvement is reliable enough for competition.',
        },
      },
    ],
  });
}

export const boomileverLessonsC = boomilever('C');
export const boomileverLessonsB = boomilever('B');
