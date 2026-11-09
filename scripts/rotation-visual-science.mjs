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

export function visualScience(test, f) {
  const b = figureBuilder(test),
    add = b.add,
    e = test.eventId,
    d = test.division;
  if (e === 'dynamic-planet') {
    const width = 8 + f,
      depth = 2,
      v = 0.5 + 0.1 * f;
    add(
      'Stream cross section and measured velocity',
      svg(
        'Stream station: section perpendicular to flow',
        path('M80 100L160 270L560 270L640 100') +
          line(120, 160, 600, 160, 'stroke="#006c80" stroke-width="4"') +
          line(160, 270, 160, 160, 'stroke-dasharray="6 4"') +
          line(560, 270, 560, 160, 'stroke-dasharray="6 4"') +
          label(255, 145, `Width = ${width} m`) +
          label(210, 235, `Mean depth = ${depth} m`) +
          label(160, 320, `Rectangular approximation; mean velocity = ${v.toFixed(1)} m/s`),
      ),
      `Rectangular wetted cross section ${width} m wide and ${depth} m deep. Mean downstream velocity ${v} m/s.`,
      [
        n(
          'Estimate wetted cross-sectional area using the indicated rectangular approximation.',
          width * depth,
          'm^2',
          '3',
        ),
        n('Calculate stream discharge from this section.', width * depth * v, 'm^3/s', '3'),
        w(
          'The water rises while width and mean velocity remain fixed. Explain the predicted discharge change.',
          'Greater depth increases cross-sectional area, so Q=Av increases under those assumptions.',
          '3',
        ),
      ],
    );
    const peak = 10 + 2 * f;
    add(
      'Storm hydrograph',
      chart({
        title: 'Direct runoff: baseflow already subtracted',
        xLabel: 'Time (hours)',
        yLabel: 'Discharge (m^3/s)',
        xMax: 4,
        yMax: 24,
        xTicks: [0, 1, 2, 3, 4],
        yTicks: [0, 6, 12, 18, 24],
        series: [
          {
            name: 'Direct runoff',
            points: [
              [0, 0],
              [2, peak, 'peak'],
              [4, 0],
            ],
          },
        ],
      }),
      `Triangular direct-runoff hydrograph: (0 h,0), (2 h,${peak} m^3/s), (4 h,0); no baseflow.`,
      [
        n('Read the time of peak direct runoff.', 2, 'hours', '3'),
        n(
          'Find the event runoff volume. Convert hours to seconds.',
          0.5 * 4 * 3600 * peak,
          'm^3',
          '3',
        ),
        w(
          'A wetland spreads the same runoff volume over more time. Describe how its hydrograph could differ.',
          'Its peak can be lower and its duration longer while the area under the discharge-time curve remains the same.',
          '3',
        ),
      ],
    );
    const sep = 200 + 20 * f;
    add(
      'Groundwater heads in two wells',
      svg(
        'Saturated aquifer: head measurements',
        line(65, 110, 650, 110) +
          box(120, 110, 35, 180, '#e5eff3') +
          box(530, 110, 35, 180, '#e5eff3') +
          line(120, 155, 155, 155, 'stroke="#006c80" stroke-width="5"') +
          line(530, 215, 565, 215, 'stroke="#006c80" stroke-width="5"') +
          label(80, 85, 'Well A: head 110 m') +
          label(430, 85, 'Well B: head 106 m') +
          label(180, 330, `Horizontal separation = ${sep} m`) +
          label(180, 370, 'Same connected aquifer; datum shared'),
      ),
      `Well A hydraulic head110 m; B106 m; horizontal separation${sep} m in one connected aquifer, common datum.`,
      [
        n('Calculate hydraulic-gradient magnitude.', 4 / sep, '', '3'),
        w(
          'Predict the horizontal flow direction and identify the controlling measurement.',
          'From A toward B, from higher hydraulic head to lower head, assuming the connected aquifer shown.',
          '3',
        ),
        w(
          'Why cannot the diagram alone determine groundwater discharge?',
          'Hydraulic conductivity and flow cross-sectional area are also required for Darcy discharge; head gradient alone is insufficient.',
          '3',
        ),
      ],
    );
    add(
      'Tributary network',
      svg(
        'Stream-order network: arrows show downstream',
        arrow(100, 90, 280, 180) +
          arrow(100, 270, 280, 180) +
          arrow(280, 180, 460, 180) +
          arrow(450, 75, 540, 180) +
          arrow(460, 180, 540, 180) +
          arrow(540, 180, 660, 180) +
          label(60, 65, 'A: order 1') +
          label(45, 310, 'B: order 1') +
          label(300, 155, 'Reach X') +
          label(405, 55, 'C: order 1') +
          label(560, 220, 'Reach Y'),
      ),
      'First-order A and first-order B merge into X. First-order C subsequently joins X to create Y. All arrows downstream.',
      [
        n('Give the Strahler order of reach X.', 2, '', '3'),
        n('Give the Strahler order of reach Y.', 2, '', '3'),
        w(
          'If C were second order instead, how would Y change?',
          'Two second-order reaches joining would produce a third-order Y.',
          '3',
        ),
      ],
    );
  } else if (e === 'water-quality') {
    add(
      'Estuary sampling map',
      svg(
        'Coastal transect after a watershed nutrient pulse',
        path('M30 160Q180 70 300 170T690 190', 'stroke-width="50" stroke="#d4e8ed"') +
          arrow(70, 165, 620, 190) +
          label(35, 80, 'River') +
          label(545, 80, 'Marine inlet') +
          label(55, 260, 'S1: salinity 0') +
          label(245, 290, `S2: salinity ${10 + f}`) +
          label(490, 260, 'S3: salinity 34') +
          box(230, 50, 145, 50, '#fff0dc') +
          label(240, 80, 'Farm runoff') +
          arrow(300, 105, 300, 155) +
          label(250, 350, 'Nutrient input indicated by arrow'),
      ),
      `River-to-sea connected transect S1 salinity0, S2 ${10 + f}, S3 34. Farm-runoff arrow enters near S2.`,
      [
        w(
          'Which labeled station most clearly represents brackish mixing rather than either freshwater or full seawater? Explain.',
          'S2; its intermediate salinity is consistent with freshwater-seawater mixing.',
          '3.Part I',
          2.4,
        ),
        w(
          'Trace a plausible route from the mapped nutrient source to reef oxygen stress.',
          'Runoff can transport nutrients to the estuary and coast; enhanced production and subsequent respiration/decomposition can consume oxygen. The map alone does not prove the full causal chain.',
          '3.Part I',
          2.4,
        ),
        w(
          'Place a vegetated buffer at an appropriate location on the map and explain its purpose.',
          'Between the farm/runoff source and the channel, to intercept runoff and reduce nutrient transport before it reaches the estuary.',
          '3.Part I',
          2.4,
        ),
      ],
    );
    let reef =
      path(
        'M60 300L145 230L130 180M145 230L185 175M145 230L170 300M145 230L100 255',
        'stroke-width="14"',
      ) + circle(365, 235, 32, '#fff');
    for (let i = 0; i < 16; i++) {
      let a = (i * Math.PI) / 8;
      reef += line(
        365 + 35 * Math.cos(a),
        235 + 35 * Math.sin(a),
        365 + 82 * Math.cos(a),
        235 + 82 * Math.sin(a),
      );
    }
    reef +=
      path('M510 235Q570 170 630 220L675 195L670 270L630 247Q560 300 510 235Z') +
      path('M510 232L530 224L532 245Z', 'stroke-width="4"') +
      circle(600, 220, 4, '#142d38') +
      label(100, 110, 'A: rigid branching skeleton') +
      label(305, 145, 'B: very long spines') +
      label(480, 330, 'C: fused beak-like teeth');
    add(
      'Reef organism identification sketches',
      svg('Diagnostic structures, not to scale', reef),
      'A branching hard skeleton of a colonial reef builder; B round urchin with conspicuously long thin spines; C fish with fused beak-like scraping teeth. Original schematic, no species-level coloration claim.',
      [
        w(
          'Identify the listed reef-building group represented by A.',
          'Hard/stony coral.',
          '3.Part II',
          2.4,
        ),
        w(
          'Identify the listed urchin group represented by B.',
          'Long-spined black sea urchin.',
          '3.Part II',
          2.4,
        ),
        w(
          'Identify C and explain how its feeding could affect competition for reef space.',
          'Parrotfish; algal grazing can reduce competition between macroalgae and corals, although ecosystem responses depend on other conditions.',
          '3.Part II',
          2.4,
        ),
      ],
    );
    add(
      'Diel dissolved oxygen',
      chart({
        title: 'Fixed reef station: repeated DO measurements',
        xLabel: 'Hour after noon',
        yLabel: 'DO (mg/L)',
        xMax: 24,
        yMax: 10,
        xTicks: [0, 6, 12, 18, 24],
        yTicks: [0, 2, 4, 6, 8, 10],
        series: [
          {
            name: 'DO',
            points: [
              [0, 8],
              [6, 6],
              [12, 3 + f * 0.2],
              [18, 5],
              [24, 8],
            ],
          },
        ],
      }),
      `DO time series, hours after noon:0:8,6:6,12:${3 + f * 0.2},18:5,24:8 mg/L.`,
      [
        n('Read the lowest observed DO concentration.', 3 + f * 0.2, 'mg/L', '3.Part III', 2.4),
        n(
          'Calculate the observed maximum-to-minimum DO range.',
          5 - f * 0.2,
          'mg/L',
          '3.Part III',
          2.4,
        ),
        w(
          'Why would a noon-only survey miss information visible in this graph?',
          'It would miss lower overnight oxygen and the daily variation, so the repeated time series is needed to characterize exposure.',
          '3.Part III',
          2.4,
        ),
      ],
    );
    add(
      'Salinometer calibration',
      chart({
        title: 'Calibration in final-solution mass/volume percent',
        xLabel: 'Salt concentration (% m/v)',
        yLabel: 'Instrument reading',
        xMax: 10,
        yMax: 50,
        xTicks: [0, 2, 4, 6, 8, 10],
        yTicks: [0, 10, 20, 30, 40, 50],
        series: [
          {
            name: 'Calibration standards',
            points: [
              [0, 0],
              [2, 10],
              [4, 20],
              [6, 30],
              [8, 40],
              [10, 50],
            ],
          },
        ],
      }),
      'Linear calibration readings:0%=0,2%=10,4%=20,6%=30,8%=40,10%=50. Percent is grams salt per100mL final solution.',
      [
        n(
          `A sample gives reading ${20 + f}. Interpolate its salt concentration.`,
          (20 + f) / 5,
          '%',
          '3.Part IV',
          0.8,
        ),
        n(
          'How many grams of salt are needed for 200 mL final solution at the 4% standard?',
          8,
          'g',
          '3.Part IV',
          0.8,
        ),
        w(
          'Why is extrapolating this line to a reading of 80 less supported than interpolation?',
          'Reading80 lies outside the tested calibration range; linear behavior there has not been demonstrated.',
          '3.Part IV',
          0.8,
        ),
      ],
    );
  } else if (e === 'chemistry-lab') {
    const p0 = 8 + 4 * f;
    add(
      'Ideal gas isotherm',
      chart({
        title: 'One fixed gas sample at constant temperature',
        xLabel: 'Volume (L)',
        yLabel: 'Pressure (atm)',
        xMax: 8,
        yMax: p0,
        xTicks: [1, 2, 4, 8],
        yTicks: [0, p0 / 4, p0 / 2, p0],
        series: [
          {
            name: 'Equilibrium states',
            points: [
              [1, p0, 'A'],
              [2, p0 / 2, 'B'],
              [4, p0 / 4, 'C'],
              [8, p0 / 8, 'D'],
            ],
          },
        ],
      }),
      `Fixed n,T. States A(1L,${p0}atm),B(2L,${p0 / 2}atm),C(4L,${p0 / 4}atm),D(8L,${p0 / 8}atm). Connecting segments guide the eye, not a continuous fitted isotherm.`,
      [
        n('Read the pressure at state C.', p0 / 4, 'atm', '3.e'),
        n('Calculate PV at B.', p0, 'L atm', '3.e'),
        w(
          'Use two plotted states to explain the volume-pressure relationship.',
          'For example, volume doubles A to B while pressure halves; PV remains constant for this fixed amount at constant temperature.',
          '3.e',
        ),
      ],
    );
    let particles = '';
    for (let j = 0; j < 3; j++) {
      particles += box(35 + j * 230, 100, 190, 185) + label(80 + j * 230, 80, ['A', 'B', 'C'][j]);
      for (let i = 0; i < 4 * (j + 1); i++)
        particles += circle(
          65 + j * 230 + (i % 4) * 40,
          130 + Math.floor(i / 4) * 50,
          8,
          '#006c80',
        );
    }
    particles += label(40, 335, 'Same volume and temperature; each dot = one molecule unit');
    add(
      'Ideal gas particle models',
      svg('Equal-volume samples at equal temperature', particles),
      'Equal volumes and equal absolute temperature. A has4 dots,B8,C12; each dot represents the same molecule count. Noninteracting ideal-gas model.',
      [
        n('Find the pressure ratio B/A.', 2, '', '3.e'),
        n('If A contains 0.10 mol, how many moles does C contain?', 0.3, 'mol', '3.e'),
        w(
          'Would the dots justify a claim that C has faster molecules than A? Explain.',
          'No; equal temperature fixes the ideal-gas average translational kinetic energy, while this picture varies number density. Speed also depends on molecular mass.',
          '3.e',
        ),
      ],
    );
    const k = 2 + f;
    add(
      'Initial-rate experiment',
      table(
        'Matched-temperature initial-rate measurements',
        ['Run', '[A] (M)', '[B] (M)', 'Rate (M/s)'],
        [
          ['1', '0.10', '0.10', (k * 0.001).toFixed(3)],
          ['2', '0.20', '0.10', (k * 0.004).toFixed(3)],
          ['3', '0.10', '0.20', (k * 0.002).toFixed(3)],
        ],
      ),
      `Runs1:A.10 B.10 rate${k * 0.001};2:A.20 B.10 rate${k * 0.004};3:A.10 B.20 rate${k * 0.002}. Temperature fixed; rate=k[A]^m[B]^n.`,
      [
        n(
          '[State/National] Determine reaction order with respect to A from runs 1 and 2.',
          2,
          '',
          '3.f',
        ),
        n(
          '[State/National] Determine reaction order with respect to B from runs 1 and 3.',
          1,
          '',
          '3.f',
        ),
        n('[State/National] Calculate k for rate=k[A]^2[B].', k, 'M^-2 s^-1', '3.f'),
      ],
    );
    const half = 5 + f;
    add(
      'Reactant decay curve',
      chart({
        title: 'Teaching first-order decay data',
        xLabel: 'Time (s)',
        yLabel: 'Concentration (M)',
        xMax: 3 * half,
        yMax: 0.8,
        xTicks: [0, half, 2 * half, 3 * half],
        yTicks: [0, 0.2, 0.4, 0.6, 0.8],
        series: [
          {
            name: 'Measured concentrations',
            points: [
              [0, 0.8],
              [half, 0.4],
              [2 * half, 0.2],
              [3 * half, 0.1],
            ],
          },
        ],
      }),
      `First-order data: time0 .8M;${half}s .4M;${2 * half}s .2M;${3 * half}s .1M.`,
      [
        n('[State/National] Read the half-life.', half, 's', '3.f'),
        n(
          '[State/National] Use k=ln(2)/half-life with ln(2)=0.693 to calculate k.',
          0.693 / half,
          's^-1',
          '3.f',
        ),
        w(
          '[State/National] Explain why the equal time intervals do not remove an equal concentration each time.',
          'For first-order decay an equal fraction remains after each half-life; the absolute concentration decrement becomes smaller as concentration falls.',
          '3.f',
        ),
      ],
    );
  } else if (e === 'circuit-lab') {
    const r1 = 2 + f,
      r2 = 4 + f,
      V = 12 + 2 * f;
    const circuit =
      box(180, 105, 115, 55) +
      label(195, 140, `R1=${r1} ohm`) +
      box(420, 105, 115, 55) +
      label(435, 140, `R2=${r2} ohm`) +
      path('M180 132H90V300H330M350 300H620V132H535M295 132H420') +
      line(330, 280, 330, 320, 'stroke-width="4"') +
      line(350, 290, 350, 310, 'stroke-width="4"') +
      label(285, 365, `Ideal source ${V} V`) +
      label(300, 255, '+       -');
    add(
      'Series resistor circuit',
      svg('Ideal wires and resistors', circuit),
      `One series loop. Ideal battery${V}V, resistors R1=${r1}ohm and R2=${r2}ohm. No other conducting paths.`,
      [
        n('Calculate equivalent resistance.', r1 + r2, 'ohms', '3.Part I.c.v'),
        n('Calculate loop current.', V / (r1 + r2), 'A', '3.Part I.c.iv-v'),
        n(
          'Calculate the potential difference across R1.',
          (V * r1) / (r1 + r2),
          'V',
          '3.Part I.c.v',
        ),
      ],
    );
    const R = 6 + f;
    add(
      'Two parallel branches',
      svg(
        'A 12 V source maintains the two rail potentials',
        line(130, 90, 130, 330) +
          line(590, 90, 590, 330) +
          line(130, 150, 280, 150) +
          box(280, 125, 160, 50) +
          line(440, 150, 590, 150) +
          line(130, 270, 280, 270) +
          box(280, 245, 160, 50) +
          line(440, 270, 590, 270) +
          label(290, 156, `R3=${R} ohm`) +
          label(290, 276, `R4=${2 * R} ohm`) +
          label(75, 65, 'Rail A: +12 V') +
          label(520, 65, 'Rail B: 0 V'),
      ),
      `R3=${R}ohm and R4=${2 * R}ohm are parallel between12V and0V rails. Ideal source maintains voltage.`,
      [
        n('Find current through R3.', 12 / R, 'A', '3.Part I.c.v'),
        n('Find current through R4.', 6 / R, 'A', '3.Part I.c.v'),
        n('Find equivalent resistance between the rails.', (2 * R) / 3, 'ohms', '3.Part I.c.v'),
      ],
    );
    add(
      'Combinational logic',
      svg(
        'Standard rectangular gate notation',
        label(35, 135, 'A') +
          label(35, 245, 'B') +
          line(60, 130, 200, 130) +
          line(60, 240, 200, 240) +
          box(200, 95, 170, 190) +
          label(235, 195, 'AND') +
          circle(380, 190, 10) +
          line(390, 190, 475, 190) +
          path('M475 145L475 235L550 190Z') +
          circle(560, 190, 10) +
          line(570, 190, 650, 190) +
          label(610, 165, 'Y') +
          label(50, 350, 'Output bubbles indicate inversion; no clock or memory elements'),
      ),
      'Inputs A,B enter an AND gate with an inversion bubble (NAND). Its output enters a triangle with an inversion bubble (NOT) to produce Y.',
      [
        n('Find Y for A=1 and B=0.', 0, '', '3.Part I.c.viii'),
        n('Find Y for A=1 and B=1.', 1, '', '3.Part I.c.viii'),
        w(
          'Name the single gate equivalent to the complete diagram and justify.',
          'AND. The NAND result is inverted again, so the two inversions cancel and Y=A AND B.',
          '3.Part I.c.viii',
        ),
      ],
    );
    add(
      'Measurement connections',
      svg(
        'Meters P and Q in an ideal DC circuit',
        path('M100 285V130H190M260 130H340M460 130H620V285H380M360 285H100') +
          line(360, 265, 360, 305, 'stroke-width="4"') +
          line(380, 275, 380, 295, 'stroke-width="4"') +
          circle(225, 130, 35) +
          label(217, 136, 'P') +
          box(340, 105, 120, 50) +
          label(375, 138, 'R') +
          path('M340 130V230H365M435 230H460V130') +
          circle(400, 230, 35) +
          label(393, 236, 'Q') +
          label(70, 345, 'Ideal battery in lower wire; current flows through P and R'),
      ),
      'Meter P is in series with R. Meter Q is connected across R in parallel. Ideal DC source in loop. P and Q are unlabeled meter roles, not component values.',
      [
        w(
          'Which meter position is appropriate for a voltmeter? Explain using the wiring.',
          'Q, because it spans both terminals of R and measures potential difference in parallel.',
          '3.Part II.b',
        ),
        w(
          'Which meter position is appropriate for an ammeter? Explain.',
          'P, because it lies in the series current path through R.',
          '3.Part II.b',
        ),
        w(
          'Describe the desired input resistance of the meter at Q and its purpose.',
          'Very high input resistance, to draw little additional current and reduce loading of the measured circuit.',
          '3.Part II.b',
        ),
      ],
    );
  } else return null;
  return b;
}
