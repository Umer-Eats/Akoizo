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

export function visualEarthSpace(test, f) {
  const b = figureBuilder(test),
    add = b.add,
    e = test.eventId,
    d = test.division;
  if (e === 'meteorology') {
    add(
      'Synthetic dual-polarization radar panels',
      table(
        'Same small storm area: collocated measurements',
        ['Region', 'Reflectivity', 'Radial velocity', 'Correlation'],
        [
          ['West cell', '65 dBZ', '-30 m/s', '0.70'],
          ['East cell', '60 dBZ', '+35 m/s', '0.72'],
          ['Background', '25 dBZ', '+5 m/s', '0.98'],
        ],
      ),
      'Adjacent west/east cells:65/60dBZ, velocities-30/+35m/s, correlation.70/.72; background25dBZ,+5m/s,.98. Negative is toward radar, positive away. West/east are adjacent spatial cells.',
      [
        n(
          'Read the velocity difference between the adjacent west and east cells.',
          65,
          'm/s',
          '3.c',
        ),
        w(
          'Explain why the juxtaposed velocity signs support investigating rotation rather than concluding that both cells are calm.',
          'The adjacent approaching and receding velocities form a couplet consistent with rotation; geometry, resolution and other evidence are needed for confirmation.',
          '3.c',
        ),
        w(
          'What extra interpretation does low correlation in the same area support, and what does it not prove by itself?',
          'It can support mixed/irregular scatterers such as lofted debris when collocated with rotation, but cannot independently prove a ground-contact tornado without corroborating evidence.',
          '3.c',
        ),
      ],
    );
    add(
      'Parcel and environment profiles',
      chart({
        title: 'Supplied parcel temperature comparison',
        xLabel: 'Height above ground (km)',
        yLabel: 'Temperature (C)',
        xMax: 3,
        yMax: 36,
        xTicks: [0, 1, 2, 3],
        yTicks: [0, 6, 12, 18, 24, 30, 36],
        series: [
          {
            name: 'Environment: solid',
            points: [
              [0, 30],
              [1, 22],
              [2, 14],
              [3, 6],
            ],
          },
          {
            name: 'Parcel: dashed',
            points: [
              [0, 30],
              [1, 24],
              [2, 18],
              [3, 12],
            ],
          },
        ],
      }),
      'At height0,1,2,3km environment30,22,14,6C; parcel30,24,18,12C. Compare temperature buoyancy at matched pressure; moisture effects neglected in this teaching comparison.',
      [
        n('Read parcel-minus-environment temperature at 2 km.', 4, 'C', '3.c'),
        w(
          'Under the stated simplification, is the parcel positively or negatively buoyant at 2 km? Explain.',
          'Positively buoyant: the parcel is warmer and hence less dense than its environment at matched pressure under the stated simplification.',
          '3.c',
        ),
        w(
          'Why cannot this profile alone establish tornado occurrence?',
          'It does not supply all required storm and wind information, including shear/rotation, initiation and ground-level evidence; instability alone does not establish a tornado.',
          '3.c',
        ),
      ],
    );
    const dist = 20 + 5 * f;
    add(
      'Storm-track map',
      svg(
        'Map north is up; distance scale is explicit',
        arrow(80, 330, 80, 250) +
          label(70, 235, 'N') +
          arrow(160, 180, 560, 180) +
          circle(160, 180, 8, '#006c80') +
          circle(360, 180, 8, '#006c80') +
          circle(560, 180, 8, '#006c80') +
          label(120, 145, '12:00') +
          label(320, 145, '12:30') +
          label(520, 145, '13:00') +
          label(140, 245, `0 km E`) +
          label(330, 245, `${dist} km E`) +
          label(520, 245, `${2 * dist} km E`) +
          label(170, 335, 'Positions relative to the first storm location'),
      ),
      `Eastward positions0km at12:00,${dist}km at12:30,${2 * dist}km at13:00. Map north up. Constant speed only for extrapolation.`,
      [
        n('Calculate mean storm speed from 12:00 to 13:00.', 2 * dist, 'km/h', '3.c'),
        w('Give the direction of the plotted motion.', 'East.', '3.c'),
        n(
          `If the motion continues unchanged, how many minutes after 13:00 would a point ${dist} km farther east be reached?`,
          30,
          'minutes',
          '3.c',
        ),
      ],
    );
    add(
      'Accumulated rainfall curve',
      chart({
        title: 'Rain gauge: cumulative precipitation',
        xLabel: 'Elapsed time (hours)',
        yLabel: 'Accumulated rain (mm)',
        xMax: 2,
        yMax: 60,
        xTicks: [0, 0.5, 1, 1.5, 2],
        yTicks: [0, 15, 30, 45, 60],
        series: [
          {
            name: 'Gauge record',
            points: [
              [0, 0],
              [0.5, 15],
              [1, 40],
              [1.5, 45],
              [2, 50],
            ],
          },
        ],
      }),
      'Cumulative rain at0,.5,1,1.5,2h:0,15,40,45,50mm. Straight segments indicate constant mean rates within each interval.',
      [
        n('Calculate the mean rain rate during the 0.5-to-1.0 h interval.', 50, 'mm/h', '3.c'),
        w(
          'Identify the interval with the steepest accumulation and explain what the slope measures.',
          '0.5 to1.0h; slope is rainfall rate, and this interval has the largest increase per unit time.',
          '3.c',
        ),
        w(
          'For an already saturated basin, explain why the steep interval deserves attention even if a later interval has a higher cumulative total.',
          'Short intense rainfall can create rapid runoff when infiltration capacity/storage is limited. Cumulative total and current intensity describe different aspects of flood response.',
          '3.c',
        ),
      ],
    );
  } else if (e === 'remote-sensing' && d === 'B') {
    add(
      'Active and passive observing geometries',
      svg(
        'Two observing systems; arrows indicate signal paths',
        box(75, 75, 140, 55, '#e5eff3') +
          label(95, 110, 'Sensor A') +
          box(465, 75, 140, 55, '#e5eff3') +
          label(485, 110, 'Sensor B') +
          line(40, 310, 670, 310, 'stroke-width="5"') +
          circle(340, 95, 30, '#fff0dc') +
          label(315, 100, 'Sun') +
          arrow(320, 125, 190, 290) +
          arrow(190, 290, 145, 140) +
          arrow(510, 140, 520, 290) +
          arrow(545, 290, 560, 140) +
          label(65, 350, 'A: reflected sunlight') +
          label(415, 350, 'B: transmitted microwave + echo'),
      ),
      'Sensor A receives sunlight reflected from surface. Sensor B emits microwaves and receives an echo. Both view ground below.',
      [
        w(
          'Classify A as active or passive using the arrows.',
          'Passive: it receives reflected sunlight rather than emitting the probing signal.',
          '3.a',
        ),
        w(
          'Classify B as active or passive using the arrows.',
          'Active: it transmits a microwave signal and measures its return.',
          '3.a',
        ),
        w(
          'Which path is generally better suited to observing the surface through cloud, and why?',
          'The microwave radar path B can often penetrate cloud that obscures visible/near-infrared sunlight-based observations; surface scattering and geometry still matter.',
          '3.a',
        ),
      ],
    );
    const pixel = 10 + 5 * f;
    let body = '';
    const before = ['FFFFWW', 'FFFFWW', 'BBBBWW', 'BBBBWW'],
      after = ['FFBBWW', 'FFBBWW', 'BBBBWW', 'BBBBWW'];
    for (let p = 0; p < 2; p++) {
      const rows = p ? after : before;
      body += label(75 + p * 350, 65, p ? 'Landsat: later' : 'Landsat: earlier');
      for (let y = 0; y < 4; y++)
        for (let x = 0; x < 6; x++) {
          const c = rows[y][x];
          body +=
            box(
              45 + p * 350 + x * 43,
              90 + y * 43,
              43,
              43,
              c === 'F' ? '#dcebd8' : c === 'B' ? '#e7dfd5' : '#d3e9f1',
            ) + label(58 + p * 350 + x * 43, 118 + y * 43, c, 16);
        }
    }
    body +=
      label(45, 310, 'F forest; B built; W water. Same grid, north up.') +
      label(45, 355, `Each square pixel = ${pixel} m x ${pixel} m. Dates matched by season.`);
    add(
      'Paired classified Landsat maps',
      svg('Synthetic classified maps, not real mission imagery', body),
      `Earlier4x6 grid rows FFFFWW,FFFFWW,BBBBWW,BBBBWW; later FFBBWW,FFBBWW,BBBBWW,BBBBWW. Fforest Bbuilt Wwater; square pixels${pixel}m side;northup;seasonmatched.`,
      [
        w(
          'Which resolution category is quantified by the pixel side length?',
          'Spatial resolution.',
          '3.a',
        ),
        n('How many forest pixels change to built class?', 4, '', '3.b'),
        n(
          'Calculate the ground area of the forest-to-built change.',
          4 * pixel * pixel,
          'm^2',
          '3.b',
        ),
      ],
    );
    add(
      'Elevation transect',
      chart({
        title: 'SRTM-derived teaching profile',
        xLabel: 'Horizontal distance (m)',
        yLabel: 'Elevation (m)',
        xMax: 600,
        yMax: 160,
        xTicks: [0, 200, 400, 600],
        yTicks: [0, 40, 80, 120, 160],
        series: [
          {
            name: 'Elevation',
            points: [
              [0, 40, 'A'],
              [200, 60, 'B'],
              [400, 140, 'C'],
              [600, 160, 'D'],
            ],
          },
        ],
      }),
      'SRTM-style synthetic elevation profile: A0m,40m;B200m,60m;C400m,140m;D600m,160m. Horizontal axis is ground distance, vertical axis elevation.',
      [
        n('Calculate mean slope from B to C as a percentage.', 40, '%', '3.b'),
        w(
          'Which labeled interval is steepest? Justify from the axes.',
          'B to C:80m rise over200m horizontal distance, exceeding the rise per distance in the other intervals.',
          '3.b',
        ),
        n('Read the total elevation difference between A and D.', 120, 'm', '3.b'),
      ],
    );
    add(
      'Thermal and false-color products',
      table(
        'Synthetic ECOSTRESS/Landsat interpretation',
        ['Feature', 'Thermal surface (C)', 'NIR display channel', 'Reference class'],
        [
          ['A', '38', 'bright red', 'Canopy'],
          ['B', '48', 'dark red', 'Pavement'],
          ['C', '25', 'very dark', 'Open water'],
        ],
      ),
      'ECOSTRESS-style surface temperatures A canopy38C,B pavement48C,C openwater25C. Landsat display assigns NIR to red channel; A brightred,B darkred,Cverydark. Reference classes supplied, surface not air temperature.',
      [
        n('Calculate pavement-minus-canopy surface temperature.', 10, 'C', '3.b'),
        w(
          'Explain why bright red A does not mean its leaves reflect visible red most strongly.',
          'The display assigns near-infrared measurements to red; display color is not necessarily the original visible wavelength of reflected light.',
          '3.b',
        ),
        w(
          'Can the thermal panel alone establish a 10 C air-temperature difference between A and B? Explain.',
          'No. It estimates surface temperature; air temperature requires appropriate atmospheric measurements or a supported surface-air model.',
          '3.b',
        ),
      ],
    );
  } else if (e === 'remote-sensing' && d === 'C') {
    const curves = [10, 5].map((peak, i) => ({
      name: i ? 'Curve B (dashed)' : 'Curve A (solid)',
      points: Array.from({ length: 49 }, (_, j) => {
        let x = 2 + j * 0.5;
        const T = 2900 / peak;
        const a = 14388 / (x * T),
          v = 1 / (x ** 5 * Math.expm1(a));
        const norm = 1 / (peak ** 5 * Math.expm1(14388 / (peak * T)));
        return [x, v / norm];
      }),
    }));
    add(
      'Normalized thermal spectra',
      chart({
        title: 'Blackbody wavelength spectra: each normalized to own peak',
        xLabel: 'Wavelength (micrometers)',
        yLabel: 'Relative spectral radiance',
        xMax: 26,
        yMax: 1.2,
        xTicks: [0, 5, 10, 15, 20, 25],
        yTicks: [0, 0.4, 0.8, 1.2],
        series: curves,
      }),
      'Normalized blackbody wavelength spectra A peaks10micrometers; B peaks5micrometers. Each peak normalized1, so relative absolute radiance between curves is not shown. Wien b=2900 micrometer K.',
      [
        n(
          'Use the peak of A and b=2900 micrometer K to estimate its temperature.',
          290,
          'K',
          '3.c',
          2,
        ),
        w(
          'Which curve represents a higher-temperature blackbody? Explain.',
          'B; its shorter peak wavelength corresponds to higher temperature by Wien law.',
          '3.c',
          2,
        ),
        w(
          'Why cannot equal plotted peak heights establish equal absolute radiance?',
          'Each curve was normalized separately to its own maximum, removing the absolute-amplitude comparison.',
          '3.c',
          2,
        ),
      ],
    );
    add(
      'Satellite trend panels',
      table(
        'Synthetic JASON and GRACE observations',
        ['Year', 'JASON sea level (mm)', 'GRACE ice-mass change (Gt)'],
        [
          ['0', '0', '0'],
          ['1', String(2 + f), String(-10 * f)],
          ['2', String(4 + 2 * f), String(-20 * f)],
          ['3', String(6 + 3 * f), String(-30 * f)],
        ],
      ),
      `Year0,1,2,3;JASON sea-level anomaly0,${2 + f},${4 + 2 * f},${6 + 3 * f}mm;GRACE ice-mass change0,${-10 * f},${-20 * f},${-30 * f}Gt. Synthetic separate measurement quantities.`,
      [
        n('Calculate the endpoint JASON sea-level trend.', 2 + f, 'mm/year', '3.d', 2.8),
        n('Calculate the endpoint GRACE ice-mass trend.', -10 * f, 'Gt/year', '3.d', 2.8),
        w(
          'Why cannot a sea-level trend in mm/year simply replace the GRACE trend?',
          'They measure different quantities: surface height versus mass redistribution. Thermal expansion and spatial distribution can also affect sea level, so they are not interchangeable observations.',
          '3.d',
          2.8,
        ),
      ],
    );
    add(
      'Carbon reservoirs and transfers',
      svg(
        'Teaching carbon budget; fluxes are mass per year',
        box(50, 140, 150, 90, '#fff0dc') +
          label(65, 175, 'Fossil carbon') +
          label(70, 205, 'reservoir') +
          box(290, 140, 150, 90, '#e5eff3') +
          label(300, 180, 'Atmosphere') +
          box(540, 140, 150, 90, '#dcebd8') +
          label(565, 180, 'Vegetation') +
          arrow(200, 165, 285, 165) +
          label(200, 120, `E=${8 + f}`) +
          arrow(440, 165, 535, 165) +
          label(445, 120, 'Uptake=6') +
          arrow(535, 215, 445, 215) +
          label(450, 270, 'Release=4') +
          label(50, 345, 'Only the three shown transfers are included in this simplified budget.'),
      ),
      `Reservoirs fossil carbon,atmosphere,vegetation. Annual flux fossil->atmosphere E=${8 + f}; atmosphere->vegetation6; vegetation->atmosphere4. Same mass unit/year; no other fluxes.`,
      [
        n(
          'Find the net annual vegetation carbon gain from the shown arrows.',
          2,
          'mass units/year',
          '3.e',
          1.6,
        ),
        n(
          'Find the net atmospheric gain in this simplified budget.',
          6 + f,
          'mass units/year',
          '3.e',
          1.6,
        ),
        w(
          'Distinguish a box quantity from an arrow quantity in this diagram.',
          'A box is a reservoir/storage quantity, while an arrow is a transfer rate between reservoirs; a flux is not the total carbon stock.',
          '3.e',
          1.6,
        ),
      ],
    );
    add(
      'Top-of-atmosphere energy budget',
      svg(
        'Global-mean fluxes; units W/m^2',
        box(160, 130, 410, 160, '#e5eff3') +
          label(265, 215, 'Earth system') +
          arrow(90, 70, 220, 150) +
          label(30, 60, 'Incoming solar: 340') +
          arrow(300, 140, 350, 60) +
          label(290, 85, 'Reflected solar: 100') +
          arrow(490, 140, 620, 60) +
          label(470, 340, 'Outgoing longwave: 230') +
          label(50, 380, 'Fluxes are global means, not local noon irradiance.'),
      ),
      'Global-mean incoming solar340 W/m2;reflectedsolar100;outgoinglongwave230. Net storage is incoming minus both outgoing terms.',
      [
        n('Calculate the net incoming energy flux.', 10, 'W/m^2', '3.f', 1.6),
        n('Calculate the implied planetary albedo.', 100 / 340, '', '3.f', 1.6),
        w(
          'If outgoing longwave and incoming solar initially remain fixed while reflected solar decreases, describe the immediate change in net heating.',
          'Less reflected solar means more absorbed energy; net incoming energy and immediate heating increase under the stated fixed-flux assumptions.',
          '3.f',
          1.6,
        ),
      ],
    );
  } else if (e === 'solar-system') {
    const period = 4 + f;
    add(
      'Exoplanet transit light curve',
      chart({
        title: 'Idealized repeated transits; no limb darkening',
        xLabel: 'Time (days)',
        yLabel: 'Normalized stellar flux',
        xMax: 2 * period + 1,
        yMin: 0.94,
        yMax: 1.02,
        xTicks: [0, period, 2 * period],
        yTicks: [0.94, 0.96, 0.98, 1],
        series: [
          {
            name: 'Photometry',
            points: [
              [0, 1],
              [0.5, 1],
              [1, 0.96],
              [1.5, 1],
              [period + 0.5, 1],
              [period + 1, 0.96],
              [period + 1.5, 1],
              [2 * period + 1, 1],
            ],
          },
        ],
      }),
      `Two identical transit minima centered day1 and day${period + 1};baselineflux1.00,min.96. No limb darkening. Supplied host radius5 arbitrary units.`,
      [
        n('Read the time between the two transit minima.', period, 'days', '3'),
        n('Find transit depth as a percentage of baseline light.', 4, '%', '3'),
        n(
          'Use depth=(planet radius/star radius)^2. The stellar radius is 5 units; find planet radius. Hint:0.2 squared=0.04.',
          1,
          'units',
          '3',
        ),
      ],
    );
    add(
      'Habitable-zone placement',
      svg(
        'One teaching star: orbital distances are labeled',
        circle(80, 210, 35, '#fff0dc') +
          label(60, 215, 'Star') +
          box(290, 90, 210, 240, '#e4efdc') +
          label(295, 70, 'Model zone:0.8 to1.6 AU') +
          circle(220, 210, 12, '#fff') +
          label(165, 265, 'A:0.5 AU') +
          circle(400, 210, 12, '#fff') +
          label(345, 265, 'B:1.0 AU') +
          circle(620, 210, 12, '#fff') +
          label(570, 265, 'C:2.0 AU') +
          label(50, 375, 'Schematic only; all worlds orbit the same star.'),
      ),
      'Model habitable-zone orbital distance.8to1.6AU. CandidateA.5AU,B1.0AU,C2AU. Same star. Zone is a simplified liquid-surface-water screening model, not a life detection.',
      [
        w('Which candidate lies inside the indicated model zone?', 'B.', '3'),
        w(
          'Explain why that placement does not establish habitability by itself.',
          'Atmosphere, pressure, water inventory, surface conditions and energy balance still matter; orbital distance alone is insufficient.',
          '3',
        ),
        n(
          'Use the labeled orbital distances to find incident stellar flux at candidate B / flux at candidate C. Use inverse-square scaling.',
          4,
          '',
          '3',
        ),
      ],
    );
    add(
      'Icy-world interior hypothesis',
      svg(
        'Ocean-world cutaway, not to scale',
        circle(350, 220, 140, '#e8f3f7') +
          circle(350, 220, 105, '#b8dce8') +
          circle(350, 220, 65, '#ddd1bd') +
          label(520, 135, 'A') +
          line(490, 140, 450, 150) +
          label(520, 220, 'B') +
          line(490, 220, 440, 220) +
          label(520, 300, 'C') +
          line(490, 290, 390, 245) +
          arrow(350, 235, 350, 150) +
          label(65, 365, 'Legend: A solid ice; B liquid layer; C rocky interior'),
      ),
      'Icy-world schematic: outerA solidice,middleB liquidwater,innerCrockyinterior. Arrow points outward from interior toward ocean; layers conceptual, not actual mission-derived boundaries.',
      [
        w('Which labeled layer is the direct liquid-water habitat candidate?', 'B.', '3'),
        w(
          'Explain one interior energy source consistent with maintaining B beneath ice.',
          'Tidal dissipation or internal radiogenic heating could supply energy; sufficient heat and suitable pressure/composition must be established.',
          '3',
        ),
        w(
          'Would this interior hypothesis establish living organisms? Explain.',
          'No. Potential water and energy identify a candidate environment; direct or otherwise well-supported biological evidence would still be needed.',
          '3',
        ),
      ],
    );
    add(
      'Matched mineral spectra',
      chart({
        title: 'Mars teaching spectrum and laboratory references',
        xLabel: 'Wavelength (micrometers)',
        yLabel: 'Relative reflectance',
        xMax: 3,
        yMax: 1,
        xTicks: [1, 1.5, 2, 2.5, 3],
        yTicks: [0, 0.25, 0.5, 0.75, 1],
        series: [
          {
            name: 'Mars sample: solid',
            points: [
              [1, 0.8],
              [1.5, 0.8],
              [2, 0.3],
              [2.5, 0.8],
              [3, 0.8],
            ],
          },
          {
            name: 'Reference H: dashed',
            points: [
              [1, 0.8],
              [1.5, 0.8],
              [2, 0.3],
              [2.5, 0.8],
              [3, 0.8],
            ],
          },
          {
            name: 'Reference D: purple',
            points: [
              [1, 0.8],
              [1.5, 0.8],
              [2, 0.8],
              [2.5, 0.8],
              [3, 0.8],
            ],
          },
        ],
      }),
      'Synthetic Mars sample and referenceH both show.3reflectance at2micrometers and.8at1,1.5,2.5,3. ReferenceD is.8throughout. H is supplied as a hydrated-mineral reference; D lacks this absorption.',
      [
        w('Which laboratory reference matches the plotted absorption?', 'H.', '3'),
        n('Read the sample reflectance at the absorption minimum.', 0.3, '', '3'),
        w(
          'Explain why matching the hydrated-mineral reference supports water-related geological investigation without proving present life.',
          'Hydrated-mineral evidence can support water-related alteration, but does not itself demonstrate a current liquid habitat or biology.',
          '3',
        ),
      ],
    );
  } else if (e === 'astronomy') {
    add(
      'Hertzsprung-Russell diagram',
      chart({
        title: 'Selected stars: simplified H-R positions',
        xLabel: 'Temperature increases toward left (K)',
        yLabel: 'Luminosity (solar units)',
        xMin: 2000,
        xMax: 16000,
        yMin: 0.001,
        yMax: 1000,
        logY: true,
        xTicks: [4000, 6000, 8000, 12000, 16000],
        yTicks: [0.01, 0.1, 1, 10, 100, 1000],
        reverseX: true,
        series: [
          {
            name: 'Individual stars (no track)',
            scatter: true,
            points: [
              [6000, 1, 'A'],
              [6000, 100, 'B'],
              [12000, 0.01, 'C'],
            ],
          },
        ],
      }),
      'H-R positions: A6000K,1Lsun;B6000K,100Lsun;C12000K,.01Lsun. Horizontal temperature decreases rightward. Values stated here are exact plotted coordinates; no connecting track is plotted.',
      [
        n('Use L proportional to R^2 T^4 to find radius B / radius A.', 10, '', '3.a-b'),
        w(
          'Which labeled object best fits a hot, low-luminosity compact remnant position? Explain.',
          'C; high temperature but very low luminosity implies a small radiating surface, consistent with a white-dwarf-like position.',
          '3.a',
        ),
        w(
          'Why should the displayed positions not be read as motion of one star through space?',
          'The points represent different objects in temperature-luminosity space; their placement is not a spatial path or a demonstrated evolution sequence.',
          '3.a',
        ),
      ],
    );
    const period = 4 + f;
    add(
      'Pulsating-variable photometry',
      chart({
        title: 'Synthetic standard-candle exercise',
        xLabel: 'Time (days)',
        yLabel: 'Apparent magnitude',
        xMax: 2 * period,
        yMin: 9.5,
        yMax: 11.5,
        xTicks: [0, period / 2, period, period * 1.5, 2 * period],
        yTicks: [9.5, 10, 10.5, 11, 11.5],
        series: [
          {
            name: 'Variable star',
            points: [
              [0, 10],
              [period / 2, 11],
              [period, 10],
              [period * 1.5, 11],
              [2 * period, 10],
            ],
          },
        ],
      }),
      `Repeated magnitude minima10 atdays0,${period},${2 * period};maxima11at${period / 2},${period * 1.5}. For the associated teaching calculation use the plotted magnitude extrema and the supplied absolute magnitude in the question. Straight segments schematic.`,
      [
        n('Read the repeat period.', period, 'days', '3.a-b'),
        n(
          'For this teaching estimate use the arithmetic midpoint of the plotted magnitude extrema as m. Take M=0.5, negligible extinction, and m-M=5log10(d/10pc). Find distance.',
          1000,
          'pc',
          '3.b',
        ),
        w(
          'At plotted magnitude10 versus11, which state is brighter and why?',
          'Magnitude10 is brighter; astronomical magnitude decreases as received flux increases.',
          '3.a-b',
        ),
      ],
    );
    add(
      'Spectral-line displacement',
      svg(
        'Same identified line: laboratory and galaxy spectra',
        line(90, 140, 650, 140) +
          line(90, 270, 650, 270) +
          line(300, 105, 300, 175, 'stroke-width="5"') +
          line(440, 235, 440, 305, 'stroke-width="5"') +
          label(50, 85, 'Laboratory wavelength:500.0 nm') +
          label(50, 350, 'Galaxy wavelength:503.5 nm') +
          label(360, 85, 'Red wavelength direction') +
          arrow(380, 110, 600, 110),
      ),
      'Same line has rest wavelength500.0nm and observed503.5nm. Red wavelength direction right. For this low-z teaching problem use v=cz,c=300000km/s,H0=70km/s/Mpc.',
      [
        n('Calculate z=(observed-rest)/rest.', 0.007, '', '3.a-b'),
        n(
          'Use the low-redshift relation v=cz, with c=300000 km/s, to estimate recession speed.',
          2100,
          'km/s',
          '3.b',
        ),
        n(
          'Use H0=70 km/s/Mpc and the nearby linear Hubble law to estimate distance.',
          30,
          'Mpc',
          '3.b',
        ),
      ],
    );
    let galaxies = '';
    for (let j = 0; j < 3; j++) {
      let x = 120 + 240 * j;
      galaxies += label(x - 15, 75, ['A', 'B', 'C'][j]);
      if (j === 0)
        galaxies +=
          path(
            `M${x - 65} 235Q${x - 30} 110 ${x + 55} 205Q${x + 85} 290 ${x - 40} 270Q${x - 100} 230 ${x - 5} 190`,
            'stroke-width="8"',
          ) + circle(x, 220, 14, '#ddd');
      else if (j === 1)
        galaxies +=
          box(x - 90, 205, 180, 35, '#ddd') +
          line(x - 80, 220, x + 80, 220, 'stroke="#333" stroke-width="8"') +
          arrow(x, 195, x, 110) +
          arrow(x, 250, x, 330);
      else
        galaxies += circle(x, 220, 70, 'white', 'stroke-width="12"') + circle(x, 220, 12, '#ddd');
    }
    galaxies += label(
      30,
      380,
      'Original morphology sketches; structures are schematic, not telescope images.',
    );
    add(
      'Galaxy morphology comparison',
      svg('Spiral, edge-on outflow, and ring structures', galaxies),
      'A shows curved spiral arms around a central concentration;B an edge-on disk with perpendicular outflow arrows;C a bright ring around a central concentration. Original conceptual sketches, not observed data for named galaxies.',
      [
        w(
          'Which panel visibly shows a ring morphology, relevant when studying the listed Cartwheel Galaxy?',
          'C.',
          '3.a,c',
        ),
        w(
          'Which panel illustrates an outflow perpendicular to an edge-on disk, a geometry relevant to starburst-galaxy studies?',
          'B.',
          '3.a,c',
        ),
        w(
          'Why cannot these three morphology sketches alone establish a universal galaxy age sequence?',
          'Morphology depends on structure, interactions, viewing orientation and history; the sketches provide no universal time ordering or complete population evidence.',
          '3.a',
        ),
      ],
    );
  } else return null;
  return b;
}
