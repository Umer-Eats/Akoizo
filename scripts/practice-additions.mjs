// Checked against the original papers and their published answer keys.
export function addArchivePapers(make) {
  {
    const t = make({
      id: 'lake-erie-niagara-2018-thermodynamics-b',
      eventId: 'thermodynamics',
      division: 'B',
      competition: 'Lake Erie/Niagara Buffalo State College Invitational',
      level: 'Invitational',
      year: 2018,
      topics: ['Temperature and heat', 'Ideal gases', 'Heat transfer', 'Thermodynamic cycles'],
      alignment:
        'The December 8, 2018 paper covers the same core thermodynamics areas retained in the 2027 Thermodynamics B rules: temperature, phases, heat transfer, ideal gases, engines, efficiency, and the first and second laws. Its written test does not include the 2027 device-testing component.',
      scoringBasis:
        'Published answer-sheet rubric; historical written-test scale of 52 points (the cover and handwritten key disagree about the free-response total, so the itemized key is retained).',
      instructions:
        'Questions 1–8 are two points each. Written questions keep the published subpart weights. The answer key is handwritten; numeric answers accept equivalent units and rounding within the stated tolerance. Question 15 retains the published seven-point total even though the annotation says two points per table entry.',
      sourceUrl: 'https://scioly.org/wiki/Scioly.org:Test_Exchange#Thermodynamics',
      paperUrl: 'https://scioly.org/w/images/9/9a/2019_Thermo_Invite_WNY.pdf',
      keyUrl: 'https://scioly.org/w/images/2/27/2019_Thermo_Invite_WNY_Key.pdf',
    });
    ['B', 'D', 'E', 'B', 'D', 'B', 'E', 'A'].forEach((key, i) =>
      t.mcq(String(i + 1), 2, 2, key, i === 3 ? 'AB' : 'ABCDE'),
    );
    t.number('9a', 3, 5, 0, 0.1, ['°C', 'C', 'degrees C'], false, '0 °C');
    t.exact('9b', 3, 1, 'Yes', ['yes, ice remains', 'ice remains', 'yes']);
    t.number('9c', 3, 3, -0.73, 0.03, ['kJ/K', 'kJ per K', 'J/K'], true, '-0.73 kJ/K');
    t.number('10a', 3, 2, 0.24, 0.01, ['kg', 'kilograms'], true, '0.24 kg');
    t.number('10b', 3, 3, 357, 2, ['K', 'kelvin'], true, '357 K');
    t.number('10c', 3, 2, 609, 5, ['kPa', 'kilopascals'], true, '609 kPa');
    t.number('10d', 3, 3, 3818, 15, ['kJ', 'kilojoules'], true, '3818 kJ');
    t.number('11', 3, 2, 1, 0.05, ['K', '°C', 'degrees C'], true, '1 K');
    t.add(
      '12',
      3,
      2,
      'The maximum speed depends on the temperature difference between the hot and cold reservoirs; the Carnot efficiency and possible work change when outside temperature changes.',
      { prompt: 'Why maximum possible speed depends on outside temperature' },
    );
    t.add(
      '13',
      3,
      3,
      'No. The Carnot efficiency between 300 K and 1000 K is 1 − 300/1000 = 70%, so an 80% engine is impossible.',
      { prompt: 'Whether an 80% engine can operate between 300 K and 1000 K' },
    );
    t.number('14', 3, 3, 0.072, 0.003, ['W', 'watts'], true, '0.072 W (72 mW)');
    t.add(
      '15',
      3,
      7,
      'State 1: 100 kPa, 300 K, 301.5 kJ/kg. State 2: 1000 kPa, 579 K, 581.9 kJ/kg. State 3: 1000 kPa, 1975 K, 1985 kJ/kg. State 4: 100 kPa, 1023 K, 1028 kJ/kg. The work must use the isentropic relations and h = cpT.',
      {
        prompt:
          'Complete the four-state thermodynamic-cycle table and show the isentropic calculation',
      },
    );
    t.finish();
  }
  {
    const t = make({
      id: 'michigan-regions-2024-meteorology-b',
      eventId: 'meteorology',
      division: 'B',
      competition: 'Michigan Regions 1, 6 & 11',
      level: 'Regionals',
      year: 2024,
      topics: ['Severe storms', 'Tornadoes', 'Hurricanes', 'Weather instruments'],
      alignment:
        'The 2024 severe-storms rotation matches 2027 Meteorology B. Includes thunderstorm and tornado development, tropical cyclones, storm surge, safety, and observing instruments. Historical storm maps are retained.',
      instructions:
        'All 53 multiple-choice questions are worth one point. Written questions 54–69 follow the published rubric (19 points). For question 62, enter the location and surge height in separate fields. Total: 72 points.',
      sourceUrl: 'https://scioly.org/wiki/Scioly.org:Test_Exchange#Meteorology',
      paperUrl: 'https://scioly.org/w/images/f/fd/Meteorology_Test_2024_Regional.pdf',
      keyUrl: 'https://scioly.org/w/images/8/81/Meteorology_Key_2024_Regional.pdf',
    });
    const keys =
      'B D A B A D B D A C C A B B C A D A B A A C A C B A D C B B D C B D D D C C B C A B D C D B A C A C A B D'.split(
        ' ',
      );
    const pageEnds = [
      [5, 2],
      [10, 3],
      [16, 4],
      [21, 5],
      [27, 6],
      [32, 7],
      [38, 8],
      [43, 9],
      [47, 10],
      [53, 11],
    ];
    keys.forEach((key, i) =>
      t.mcq(i + 1, pageEnds.find(([end]) => i + 1 <= end)[1], 1, key, 'ABCD'),
    );
    [132, 127, 125].forEach((n, i) =>
      t.number(String(54 + i), 13, 1, n, 0, ['mph', 'miles per hour'], false, `${n} mph`),
    );
    t.exact('57', 13, 1, 'EF-2', ['EF2', 'EF 2', '2']);
    t.add(
      '58',
      13,
      2,
      '1 point: get down in the vehicle or a nearby ditch/ravine. 1 point: cover the head and neck.',
      { prompt: 'Tornado safety while unable to reach shelter' },
    );
    t.add(
      '59',
      14,
      1,
      'All five required: Eastbay/Tampa, Cedar Key, Steinhatchee, Apalachicola (Florida), and Charleston (South Carolina).',
      { prompt: 'Locations with a storm-surge warning on the supplied Idalia map' },
    );
    t.add('60', 14, 1, 'Both required: Naples and Fort Myers, Florida.', {
      prompt: 'Locations without tropical-storm-force winds on the supplied map',
    });
    t.exact('61', 14, 1, 'Charleston, SC', ['Charleston', 'Charleston, South Carolina']);
    t.exact('62-location', 14, 1, 'Steinhatchee, FL', ['Steinhatchee', 'Steinhatchee, Florida']);
    t.number('62-height', 14, 1, 8, 1, ['feet', 'ft', 'foot'], false, '7–9 feet');
    t.add(
      '63',
      14,
      2,
      '1 point: closest to the center, eye, or eyewall. 1 point: on the right side of the storm.',
      { prompt: 'Why the identified location had the largest storm surge' },
    );
    t.exact(
      '64',
      14,
      1,
      'Land use',
      ['shoreline profile', 'topography', 'tidal conditions', 'spring tide', 'neap tide'],
      { prompt: 'One factor besides hurricane intensity affecting storm-surge damage or height' },
    );
    t.exact('65', 16, 1, 'Wind speed and direction', ['wind', 'wind speed', 'wind direction']);
    t.exact('66', 16, 1, 'Ultrasonic sound waves', [
      'sound waves',
      'ultrasonic waves',
      'ultrasound',
      'sound',
    ]);
    t.exact('67', 16, 1, 'Freezing rain', [
      'ice accumulation',
      'freezing rain/ice accumulation',
      'freezing rain and ice accumulation',
    ]);
    t.exact('68', 16, 1, 'Visibility');
    t.exact('69', 16, 1, 'Automated Surface Observing System');
    t.finish();
  }
  {
    const t = make({
      id: 'wicklund-2016-food-science-b',
      eventId: 'food-science',
      division: 'B',
      competition: 'Wicklund',
      level: 'Invitational',
      year: 2016,
      topics: ['Milk and dairy', 'Nutrition', 'Proteins and lipids', 'Cheese and butter'],
      alignment:
        'The 2016 milk-and-dairy rotation matches the 2027 Food Science B written topics. The paper also asks broader food comparisons and dairy history. Labels, health claims, and the published key are historical. This is the complete written paper; the practical lab and notebook are separate event components.',
      scoringBasis: 'Published single-choice/FRQ weights; 1 practice point per multi-select',
      instructions:
        'The paper gives 1 point for each question 1–27 and 25 points across written questions 42–54. It does not specify weights for questions 28–41: these receive 1 practice point each, all correct selections required. The two tiebreakers remain available for feedback but carry 0 points. Total practice scale: 66 points. Enter chemical structures as a condensed structural formula or describe the bonds in words. Question 53 requires working as well as the final mass.',
      sourceUrl: 'https://scioly.org/wiki/Scioly.org:Test_Exchange#Food_Science',
      paperUrl: 'https://scioly.org/w/images/e/ef/Wicklund_2016_Food_Science_Test.pdf',
      keyUrl: 'https://scioly.org/w/images/d/dc/Wicklund_2016_Food_Science_Key.pdf',
    });
    const keys = 'C E B E C A B D E C F B A D B D A A C E F B B A B B D'.split(' ');
    const lengths = [
      5, 6, 9, 5, 6, 5, 5, 5, 5, 5, 6, 5, 4, 6, 3, 5, 6, 4, 4, 5, 8, 4, 4, 4, 4, 3, 9,
    ];
    keys.forEach((key, i) =>
      t.mcq(
        i + 1,
        i < 5 ? 2 : i < 10 ? 3 : i < 14 ? 4 : i < 19 ? 5 : i < 23 ? 6 : 7,
        1,
        key,
        'ABCDEFGHI'.slice(0, lengths[i]),
      ),
    );
    const multi = [
      'AD',
      'BDE',
      'ABCD',
      'BCE',
      'BF',
      'ABF',
      'GH',
      'ABD',
      'ACD',
      'BEF',
      'BC',
      'DF',
      'GI',
      'CD',
    ];
    const sizes = [5, 5, 6, 5, 6, 8, 8, 5, 5, 7, 7, 6, 13, 6];
    multi.forEach((key, i) => {
      const id = String(i + 28);
      t.mcq(
        id,
        i === 0 ? 7 : i < 6 ? 8 : i < 12 ? 9 : 10,
        1,
        key[0],
        'ABCDEFGHIJKLM'.slice(0, sizes[i]),
        { multiple: true },
      );
      t.test.keys[id] = { correctOptions: [...key] };
    });
    t.exact('42', 10, 1, 'Rennet', ['enzyme', 'enzymes', 'rennet enzyme', 'chymosin']);
    t.exact('43-1', 10, 1, 'Ester', ['esters']);
    t.exact('43-2', 10, 1, "RCO2R'", ["RCOOR'", "R-C(=O)-O-R'", 'RCO₂R′'], {
      prompt: 'General structural formula',
    });
    t.exact('43-3', 10, 1, 'Octyl acetate', ['octyl ethanoate']);
    t.exact(
      '44',
      10,
      1,
      'At least one carbon-carbon double bond',
      [
        'at least one double bond',
        'one or more double bonds',
        'a carbon-carbon double bond',
        'C=C',
      ],
      { prompt: 'Feature shared by unsaturated lipids' },
    );
    t.exact('45', 10, 1, 'Amino acids', ['amino acid']);
    t.exact('46', 11, 1, 'Desaturase enzymes', ['desaturase', 'desaturases', 'desaturase enzyme']);
    t.exact('47', 11, 1, 'Glutamic acid', ['glutamate']);
    t.number('48-1', 11, 1, 4.6, 0, [], false, 'pH 4.6');
    t.exact('48-2', 11, 1, 'Isoelectric point', ['IEP', 'pI']);
    t.add('49', 11, 1, 'Agitation breaks fat-globule membranes, allowing fat to join together.', {
      prompt: 'Why cream is agitated to make butter',
    });
    t.exact('50', 11, 1, 'C12H22O11', ['C₁₂H₂₂O₁₁']);
    t.add('51', 11, 3, '1 point each: diacetyl; (R)-delta-decalactone; butyric acid.', {
      prompt: 'The three key butter aroma substances',
    });
    t.exact('52', 11, 1, 'Lactic acid', ['lactate']);
    t.add(
      '53',
      11,
      3,
      '426 g if using 82% casein, or 416 g if using 80% casein. Show the calculation using the container label, casein yield, and 60% cheese moisture; final mass alone does not demonstrate the requested work.',
      { prompt: 'Ideal cheese yield using the supplied milk label; include working' },
    );
    [
      ['54-1a', 27, 'Calories'],
      ['54-1b', 4, 'Calories'],
      ['54-1c', 35, 'Calories'],
      ['54-2', 80, 'mg'],
      ['54-3', 8, '%'],
      ['54-4', 300, 'mL'],
    ].forEach(([id, n, unit]) =>
      t.number(id, 12, 1, n, 0, [unit, unit.toLowerCase()], false, `${n} ${unit}`),
    );
    t.add('TB-1', 12, 0, 'Milk fat globules and protein micelles scatter and absorb light.', {
      label: 'Tiebreaker 1',
      prompt: 'Why milk appears white; unscored tiebreaker',
    });
    t.add(
      'TB-2',
      12,
      0,
      'Vitamin C (ascorbic acid): C6H8O6. The published key prefers the full structural diagram over only the molecular formula.',
      { label: 'Tiebreaker 2', prompt: 'Vitamin C structure; unscored tiebreaker' },
    );
    t.finish();
  }
}
