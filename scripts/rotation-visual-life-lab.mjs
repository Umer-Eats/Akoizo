import {
  svg,
  chart,
  table,
  label,
  line,
  box,
  circle,
  path,
  arrow,
  written as w,
  numeric as n,
  figureBuilder,
} from './practice-figure-primitives.mjs';

export function visualLifeLab(test, f) {
  const b = figureBuilder(test),
    add = b.add,
    e = test.eventId;
  if (e === 'crime-busters') {
    const front = 8 + f;
    let ink =
      line(70, 100, 660, 100, 'stroke-dasharray="7 5"') +
      label(75, 75, `Solvent front = ${front} cm above baseline`) +
      line(70, 320, 660, 320) +
      label(75, 370, 'Baseline =0 cm; all lanes run on the same sheet');
    const lanes = [
      [2, 5],
      [2, 5],
      [3, 6],
      [2, 6],
    ];
    lanes.forEach((heights, i) => {
      const x = 140 + i * 145;
      ink += label(x - 25, 345, ['Scene', 'Pen A', 'Pen B', 'Pen C'][i]);
      for (const h of heights)
        ink +=
          circle(x, 320 - (220 * h) / front, 9, '#006c80') +
          label(x + 12, 320 - (220 * h) / front + 5, `${h} cm`, 14);
    });
    add(
      'Ink chromatography',
      svg('Measured band positions on one chromatogram', ink),
      `All lanes baseline0 solventfront${front}cm. Scene bands2,5cm;PenA2,5;PenB3,6;PenC2,6. Original synthetic chromatogram.`,
      [
        n('Calculate Rf for the lower scene band.', 2 / front, '', '3.e'),
        w('Which candidate pen matches both scene band positions?', 'Pen A.', '3.e'),
        w(
          'Does the match uniquely identify a writer? Explain.',
          'No. Matching ink behavior is class evidence; different pens and owners can share ink formulations, so other independent evidence is required.',
          '3.e,g',
        ),
      ],
    );
    let fibers =
      label(65, 80, 'A') +
      label(300, 80, 'B') +
      label(535, 80, 'C') +
      path('M80 110Q20 150 100 190T80 290M115 110Q55 150 135 190T115 290', 'stroke-width="5"') +
      path('M295 110L295 290M350 110L350 290', 'stroke-width="4"') +
      line(540, 110, 540, 290, 'stroke-width="7"') +
      line(590, 110, 590, 290, 'stroke-width="7"');
    for (let y = 130; y < 290; y += 35) fibers += path(`M295 ${y}L323 ${y + 15}L350 ${y}`);
    fibers +=
      label(35, 345, 'Twisted ribbon') +
      label(255, 345, 'Overlapping scales') +
      label(495, 345, 'Uniform smooth sides');
    add(
      'Fiber morphology sketches',
      svg('Idealized longitudinal microscopy views', fibers),
      'A twisted flattened ribbon;B overlapping cuticle scales;C smooth uniform cylinder. Teaching morphology, not a photograph and not a unique-source identification.',
      [
        w(
          'Which panel is most consistent with the supplied cotton reference morphology?',
          'A, the twisted ribbon-like plant fiber.',
          '3.d',
        ),
        w(
          'Which panel is most consistent with wool-type cuticle morphology?',
          'B, the overlapping scale pattern.',
          '3.d',
        ),
        w(
          'Why is assigning one unique garment from panel C alone unjustified?',
          'Smooth morphology can occur in multiple manufactured fibers and products; additional chemical, physical and comparison evidence is needed for source attribution.',
          '3.d,g',
        ),
      ],
    );
    add(
      'Powder test station record',
      table(
        'Matched test conditions: supplied references and unknown',
        ['Sample', 'Water', 'Dilute acid', 'Iodine'],
        [
          ['Ref bicarbonate', 'Dissolves', 'Bubbles', 'No blue-black'],
          ['Ref cornstarch', 'Suspension', 'No bubbles', 'Blue-black'],
          ['Unknown U', 'Dissolves', 'Bubbles', 'No blue-black'],
        ],
      ),
      'Under matched conditions bicarbonate dissolves,bubbleswithdiluteacid,no blueblackiodine;cornstarchsuspension,nobubbles,blueblackiodine;Umatchesbicarbonate. Results are supplied observations, not an instruction to taste/test unknown substances.',
      [
        w(
          'Which supplied reference best matches U using the complete pattern?',
          'Sodium bicarbonate.',
          '3.c',
        ),
        w(
          'Which displayed test most directly distinguishes the starch reference through its characteristic color response?',
          'Iodine: the starch reference turns blue-black while U does not.',
          '3.c',
        ),
        w(
          'Why should an identification compare the complete row rather than only water solubility?',
          'Multiple materials can share solubility; the combined test pattern supplies more discriminating evidence, subject to the available reference set and controls.',
          '3.c,g',
        ),
      ],
    );
    let tread = '';
    const patterns = [
      [1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 0, 1, 0, 1],
    ];
    for (let j = 0; j < 4; j++) {
      let x = 45 + j * 170;
      tread += label(x, 80, ['Scene', 'Shoe A', 'Shoe B', 'Shoe C'][j]);
      for (let i = 0; i < 6; i++)
        tread += box(
          x + (i % 2) * 50,
          110 + Math.floor(i / 2) * 65,
          42,
          50,
          patterns[j][i] ? '#183946' : '#fff',
        );
    }
    tread += label(40, 355, 'All panels are shown in the same orientation and scale.');
    add(
      'Class-pattern comparison',
      svg('Simplified sole-impression features', tread),
      'Two columns bythree rows, row-major filled-block patterns:Scene101010,A101010,B110011,C010101. Same orientation andscale. No individual wear marks supplied.',
      [
        w(
          'Which candidate shares the scene class pattern in the displayed orientation?',
          'Shoe A.',
          '3.g',
        ),
        n('How many filled blocks are visible in the scene panel?', 3, '', '3.g'),
        w(
          'What additional type of feature could help distinguish shoes sharing this class pattern?',
          'Reproducible individual wear, cuts or damage, together with adequate sampling and comparison quality; the generic class pattern alone is not unique.',
          '3.g',
        ),
      ],
    );
  } else if (e === 'food-science') {
    const carb = 12 + f;
    add(
      'Dairy nutrition label',
      table(
        'One serving of a teaching dairy product',
        ['Item', 'Per serving'],
        [
          ['Total fat', '4 g'],
          ['Protein', '8 g'],
          ['Total carbohydrate', `${carb} g`],
          ['Total sugars', '10 g'],
          ['Includes added sugars', '3 g'],
          ['Calcium', '260 mg; DV1300 mg'],
        ],
      ),
      `Per serving fat4g,protein8g,carbohydrate${carb}g,total sugars10g,added sugars3g,calcium260mg,DV1300mg. Use4kcal/gcarbohydrate/protein,9fat.`,
      [
        n('Estimate serving energy with 4/4/9 kcal per gram.', 4 * carb + 32 + 36, 'kcal', '3.c'),
        n('Calculate calcium percent Daily Value.', 20, '%', '3.c'),
        n('How many grams of sugars are not labeled as added?', 7, 'g', '3.c'),
      ],
    );
    const mass = 12 + f;
    add(
      'Dairy curd yield experiment',
      table(
        'All trials use100 g starting milk and5 min draining',
        ['Trial', 'Milk type', 'Vinegar (mL)', 'Drained curd (g)'],
        [
          ['A', 'Whole', '2', String(mass)],
          ['B', 'Skim', '2', '10'],
          ['C', 'Whole', '4', String(mass + 3)],
        ],
      ),
      `Awhole100g vinegar2mL curd${mass}g;Bskim100g vinegar2mL curd10g;Cwhole100g vinegar4mL curd${mass + 3}g. All drain5minutes. Synthetic teaching results.`,
      [
        n('Compute percent mass yield in A.', mass, '%', '3.b'),
        w(
          'Which displayed pair best isolates vinegar volume with milk type matched?',
          'A and C; both use whole milk and differ in vinegar amount while starting mass and draining time are matched.',
          '3.a-b',
        ),
        w(
          'Why would failing to standardize draining time weaken this comparison?',
          'Different retained whey can change measured curd mass independently of curd solids or the intended experimental variable.',
          '3.a-b',
        ),
      ],
    );
    let emulsions =
      box(40, 90, 285, 220, '#e0f1f7') +
      box(395, 90, 285, 220, '#f8e8c6') +
      label(55, 70, 'A: W is continuous') +
      label(410, 70, 'B: F is continuous');
    for (let j = 0; j < 2; j++)
      for (let i = 0; i < 6; i++) {
        let x = 90 + j * 355 + (i % 3) * 80,
          y = 145 + Math.floor(i / 3) * 105;
        emulsions +=
          circle(x, y, 25, j ? '#e0f1f7' : '#f8e8c6') + label(x - 6, y + 6, j ? 'W' : 'F');
      }
    emulsions += label(50, 365, 'W=water-rich phase; F=fat-rich phase. Schematic, not to scale.');
    add(
      'Dairy emulsion microstructures',
      svg('Dispersed droplets and continuous phases', emulsions),
      'A:fat-richF droplets dispersed in continuouswater-richW phase.B:Wdroplets dispersed in continuousFphase. Original schematic emulsion microstructures.',
      [
        w('Which panel represents the usual oil-in-water organization of milk?', 'A.', '3.c'),
        w(
          'Which panel represents the water-in-fat organization associated with butter?',
          'B.',
          '3.b-c',
        ),
        w(
          'Describe the phase-organization change represented by A to B during churning.',
          'Fat becomes the continuous phase and water-rich material becomes dispersed droplets; this is a phase inversion rather than removal of all water.',
          '3.b-c',
        ),
      ],
    );
    add(
      'Ice-bath cooling curves',
      chart({
        title: 'Matched sealed dairy mixtures; bath conditions vary',
        xLabel: 'Elapsed time (min)',
        yLabel: 'Mixture temperature (C)',
        xMax: 10,
        yMin: -10,
        yMax: 10,
        xTicks: [0, 2, 4, 6, 8, 10],
        yTicks: [-10, -5, 0, 5, 10],
        series: [
          {
            name: 'Unsalted bath: solid',
            points: [
              [0, 8],
              [2, 4],
              [4, 2],
              [6, 1],
              [8, 0],
              [10, 0],
            ],
          },
          {
            name: 'Salted bath: dashed',
            points: [
              [0, 8],
              [2, 2],
              [4, -2],
              [6, -5],
              [8, -6],
              [10, -6],
            ],
          },
        ],
      }),
      'Equal sealed dairy samples in two external icebaths. Unsalted mixtureT at0,2,4,6,8,10min:8,4,2,1,0,0C;salted8,2,-2,-5,-6,-6C. Samples do not contact bathsalt. Dataset is a teaching example.',
      [
        n('Read the salted-bath mixture temperature at6 min.', -5, 'C', '3.b-c'),
        n('Find the temperature difference unsalted minus salted at8 min.', 6, 'C', '3.b-c'),
        w(
          'Explain the physical role of salt in the surrounding bath.',
          'Dissolved salt lowers the freezing point of bath water, allowing an ice-water bath below0C and heat transfer out of the sealed dairy mixture; it need not enter the food.',
          '3.b-c',
        ),
      ],
    );
  } else if (e === 'anatomy-and-physiology') {
    add(
      'Respiratory branching schematic',
      svg(
        'Airway branches and a terminal gas-exchange cluster',
        path(
          'M350 65V155L210 230M350 155L490 230M490 230L550 280M490 230L470 300',
          'stroke-width="17"',
        ) +
          circle(555, 290, 22, '#e5eff3') +
          circle(580, 315, 22, '#e5eff3') +
          circle(540, 330, 22, '#e5eff3') +
          label(405, 100, 'A') +
          line(395, 100, 365, 100) +
          label(110, 240, 'B') +
          line(135, 235, 200, 225) +
          label(635, 305, 'C') +
          line(625, 300, 580, 300) +
          label(
            40,
            365,
            'Simplified branching only; proportions and branch counts are not anatomical scale.',
          ),
      ),
      'A labels the single vertical airway above its first bifurcation; B one main bronchial branch; C grape-like terminal cluster of tiny air sacs. Schematic respiratory tree.',
      [
        w('Name the structure labeled A.', 'Trachea.', '3.a'),
        w(
          'Which labeled region most directly provides the thin gas-exchange interface?',
          'C, the alveolar cluster.',
          '3.a',
        ),
        w(
          'Trace inspired air from A toward C using the branching arrangement.',
          'Air passes from trachea through a main bronchus and progressively smaller bronchi/bronchioles to alveoli; the drawing omits many intermediate branches.',
          '3.a',
        ),
      ],
    );
    add(
      'Forced expiratory volume curves',
      chart({
        title: 'Matched starting lung volume; forced expiration',
        xLabel: 'Time after forced expiration begins (s)',
        yLabel: 'Expired volume (L)',
        xMax: 5,
        yMax: 5,
        xTicks: [0, 1, 2, 3, 4, 5],
        yTicks: [0, 1, 2, 3, 4, 5],
        series: [
          {
            name: 'Reference: solid',
            points: [
              [0, 0],
              [1, 3.2],
              [2, 3.8],
              [3, 4],
              [5, 4],
            ],
          },
          {
            name: 'Case: dashed',
            points: [
              [0, 0],
              [1, 2],
              [2, 3],
              [3, 3.6],
              [5, 4],
            ],
          },
        ],
      }),
      'Reference expiredvol0,3.2,3.8,4,4L at0,1,2,3,5s;case0,2,3,3.6,4L. FVC is final plateau4L forboth. Teaching curves only, not an individual clinical diagnosis.',
      [
        n('Calculate case FEV1/FVC as a percentage.', 50, '%', '3.a'),
        w(
          'Which curve shows slower early emptying, and what pattern does that support studying?',
          'The case/dashed curve; reduced early expired volume relative to final capacity supports studying an obstructive pattern, without establishing a specific disease by itself.',
          '3.a',
        ),
        n('Find reference-minus-case expired volume at1 s.', 1.2, 'L', '3.a'),
      ],
    );
    add(
      'Digestive organ relationships',
      svg(
        'Connections are schematic; no anatomical scale',
        path(
          'M365 65V135Q500 110 470 210Q410 260 350 220L280 250Q220 290 300 315Q400 350 455 290',
          'stroke-width="10"',
        ) +
          path('M145 115Q170 80 220 100L295 120L278 160Q205 183 145 150Z','fill="#ddd1bd"') +
          label(195, 140, 'A') +
          path('M355 280Q365 260 380 270Q395 255 410 270Q425 255 440 270Q465 260 480 274Q505 265 515 285Q485 310 460 296Q430 310 410 297Q380 310 355 290Z','fill="#e5eff3"') +
          label(425, 290, 'B') +
          arrow(290, 155, 320, 235) +
          arrow(380, 265, 310, 250) +
          label(190, 325, 'C') +
          line(220, 320, 270, 310) +
          label(45, 375, 'A large accessory organ; B lobulated gland; C coiled intestinal region'),
      ),
      'A is a large upper accessory organ connected by a duct to the first intestinal segment. B is an elongated gland below the stomach connected by a separate duct to that segment. C points to the downstream coiled intestinal tube. The diagram is schematic.',
      [
        w('Which labeled organ produces bile? Give its name.', 'A, the liver.', '3.b'),
        w(
          'Name B and explain one digestive secretion it delivers toward the shown intestinal connection.',
          'Pancreas; digestive enzymes and bicarbonate enter the duodenum through pancreatic ducts.',
          '3.b',
        ),
        w(
          'Which labeled region is most directly associated with most nutrient absorption?',
          'C, the small-intestinal region.',
          '3.b',
        ),
      ],
    );
    add(
      'Primary and secondary antibody responses',
      chart({
        title: 'Same antigen; second exposure after memory develops',
        xLabel: 'Days after the indicated exposure',
        yLabel: 'Antibody signal (relative units)',
        xMax: 14,
        yMax: 100,
        xTicks: [0, 2, 4, 6, 8, 10, 12, 14],
        yTicks: [0, 25, 50, 75, 100],
        series: [
          {
            name: 'Primary: solid',
            points: [
              [0, 0],
              [2, 0],
              [4, 5],
              [6, 15],
              [8, 25],
              [10, 20],
              [14, 10],
            ],
          },
          {
            name: 'Secondary: dashed',
            points: [
              [0, 10],
              [2, 40],
              [4, 80],
              [6, 100],
              [8, 80],
              [10, 60],
              [14, 30],
            ],
          },
        ],
      }),
      'Teaching timecourses after separateexposures:sameantigen.Primarypeak25atday8;secondary100atday6.Primaryday4=5,secondaryday4=80. Timezero is each respective exposure; relative assay units.',
      [
        n('Read the ratio secondary-peak / primary-peak signal.', 4, '', '3.c'),
        n('At day4, calculate secondary-minus-primary signal.', 75, 'relative units', '3.c'),
        w(
          'Explain how the curve comparison is consistent with adaptive immune memory.',
          'The secondary response is faster and larger, consistent with memory lymphocyte activation; the schematic alone does not identify every cellular mechanism.',
          '3.c',
        ),
      ],
    );
  } else if (e === 'protein-modeling') {
    add(
      'Backbone motifs and selected residue interval',
      svg(
        'Original motif cartoon, not 3UBE atomic coordinates',
        path('M50 190Q80 100 110 190T170 190T230 190', 'stroke-width="10"') +
          path('M280 130L340 130L340 105L390 150L340 195L340 170L280 170Z', 'stroke-width="4"') +
          path('M420 200Q450 80 490 180T570 210T660 150', 'stroke-width="8"') +
          label(95, 285, 'A') +
          label(310, 285, 'B') +
          label(530, 285, 'C') +
          label(45, 350, `Selected subinterval: residues ${160 + f} through ${169 + f}, inclusive`),
      ),
      `A is a spring-like motif; B a broad flat arrow; C an irregular curved connector. These use conventional backbone-cartoon symbols. Selected subinterval${160 + f}..${169 + f} inclusive. Motifs originalschematic,not3UBE coordinates.`,
      [
        w(
          'Identify the secondary-structure motif convention represented by B.',
          'A beta strand, commonly drawn as an arrow in a beta sheet.',
          '3.Part II',
        ),
        n(
          'How many residue positions are included in the selected subinterval?',
          10,
          '',
          '3.Part I',
        ),
        n(
          'At2 cm per residue, what model backbone length represents that selected subinterval?',
          20,
          'cm',
          '3.Part I',
        ),
      ],
    );
    add(
      'Charge and burial in a folded protein',
      svg(
        'Simplified side-chain interaction environment',
        box(60, 85, 600, 240, '#e5eff3') +
          box(260, 125, 250, 160, '#ddd1bd') +
          circle(140, 200, 30) +
          label(128, 207, '+') +
          circle(215, 200, 30) +
          label(204, 207, '-') +
          circle(350, 190, 32, '#fff0dc') +
          label(332, 198, 'NP') +
          circle(440, 240, 32, '#fff0dc') +
          label(420, 248, 'NP') +
          label(90, 285, 'Pair X') +
          label(300, 105, 'Buried core: Y') +
          label(40, 370, 'Blue=water-exposed region; NP=nonpolar side chain. Positions schematic.'),
      ),
      'PairX oppositelycharged adjacent sidechains inwater-exposedregion. BuriedcoreY contains nonpolarNPsidechains. Positions schematic,not a contact measurement.',
      [
        w(
          'What stabilizing interaction could occur at pair X? State one condition that affects it.',
          'An electrostatic/salt-bridge interaction; protonation state, distance, geometry and solvent can affect its contribution.',
          '3.Part II',
        ),
        w(
          'Explain why nonpolar side chains in Y can be favorable in an aqueous environment.',
          'Burying nonpolar side chains reduces their exposure to water and can contribute to hydrophobic stabilization of a fold.',
          '3.Part II',
        ),
        w(
          'Why could changing pH alter the displayed interaction at X?',
          'pH can change side-chain protonation and charge, altering electrostatic interactions and possibly stability.',
          '3.Part II',
        ),
      ],
    );
    add(
      'Influenza attachment mechanism',
      svg(
        'Conceptual hemagglutinin-receptor interaction',
        circle(165, 190, 80, '#e5eff3') +
          path('M240 170L285 170L310 145M240 210L285 210L310 235', 'stroke-width="9"') +
          line(525, 70, 525, 330, 'stroke-width="14"') +
          path('M525 190H470L445 165M470 190L445 215', 'stroke-width="8"') +
          label(80, 310, 'Viral envelope') +
          label(255, 100, 'HA spike') +
          label(385, 295, 'Sialic-acid receptor') +
          arrow(320, 190, 435, 190) +
          label(535, 350, 'Host membrane'),
      ),
      'Influenza viralenvelope carriesHA spike oriented toward sialic-acid receptor onhostmembrane;arrow denotes possible attachment. Conceptualnotstructuralcoordinates.',
      [
        w(
          '[State/National] Which labeled viral feature directly participates in the depicted receptor attachment?',
          'Hemagglutinin/HA spike.',
          '3.Part II',
        ),
        w(
          '[State/National] Predict how blocking the displayed receptor-binding interaction could affect this entry step.',
          'It could reduce attachment through that HA-receptor interaction, while overall infectivity would require further experimental evidence and context.',
          '3.Part II',
        ),
        w(
          '[State/National] Why does this attachment drawing not prove that a bound particle has completed membrane fusion?',
          'Attachment and fusion are distinct steps; the drawing shows binding geometry, not the subsequent conformational, membrane or functional evidence of fusion.',
          '3.Part II',
        ),
      ],
    );
    add(
      'Molecular-view selection record',
      table(
        'Illustrative JUDE selection record; not a captured application screen',
        ['Field', 'Recorded selection'],
        [
          ['Structure', '3UBE'],
          ['Chain', 'A'],
          ['Residue range', '153-252 inclusive'],
          ['Display', 'Backbone cartoon'],
          ['View action', 'Rotate camera'],
          ['Coordinate check', 'Check missing residues before building'],
        ],
      ),
      'IllustrativeJUDEworkflowrecord:structure3UBE,chainA,residues153-252inclusive,backbonecartoon,camerarotation,checkmissingresidues. Not an actual software screenshot or3UBEcoordinateplot.',
      [
        w(
          'Which recorded field distinguishes the intended chain from other chains in the same structure?',
          'Chain A.',
          '3.Part II',
        ),
        w(
          'Does the recorded camera rotation change primary sequence or bonds? Explain.',
          'No. It changes the viewpoint rather than the underlying sequence or chemical connectivity.',
          '3.Part II',
        ),
        w(
          'Why is the final coordinate check important even when the numbered interval is correctly recorded?',
          'Requested residue numbering does not guarantee every atom/residue is resolved in the experimental structure; missing segments must be verified and documented rather than invented.',
          '3.Part I-II',
        ),
      ],
    );
  } else return null;
  return b;
}
