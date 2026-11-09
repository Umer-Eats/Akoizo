// Self-contained authored written exercises for events without a lesson bank.
// Dimensions, coordinates and observations are supplied; no missing CAD file or kit is assumed.
const item = (prompt, answer, context = '', numeric) => ({
  prompt,
  answer,
  context,
  numeric,
  kind: 'written',
  points: 4,
});
const num = (prompt, value, units, context, explanation = '') =>
  item(prompt, `${value} ${units}. ${explanation}`.trim(), context, {
    value,
    tolerance: Math.max(0.001, Math.abs(value) * 0.001),
    units: ['', units],
  });

export function skillForm(eventId, form) {
  const k = form + 1;
  if (eventId === 'engineering-cad') {
    const L = 50 + 10 * k,
      W = 24 + 4 * k,
      H = 6 + 2 * k,
      r = 2 + k;
    const a = 20 + k * 5,
      b = 40 + k * 5,
      m1 = 100 + 20 * k,
      m2 = 60 + 10 * k;
    const c = `Authored CAD case ${k}. Units are mm. A rectangular base is L=${L}, W=${W}, H=${H}, occupying x=0..${L}, y=0..${W}, z=0..${H}. A cylindrical hole of radius ${r} goes through the full height, centered at (x=${L / 2}, y=${W / 2}). Ignore chamfers and fillets. Use pi=3.141592653589793. A separate assembly has point-mass components of mass ${m1} g at (${a},0,0) mm and ${m2} g at (${b},0,0) mm. Do not infer any other component or coordinate.`;
    const volume = L * W * H - Math.PI * r * r * H;
    return [
      num(
        'Calculate the base volume before cutting the hole.',
        L * W * H,
        'mm^3',
        c,
        'Rectangular prism volume is length times width times height.',
      ),
      num(
        'Calculate the material removed by the through hole.',
        Math.PI * r * r * H,
        'mm^3',
        c,
        'Cylinder volume is pi r squared times height.',
      ),
      num('Calculate the remaining base volume.', volume, 'mm^3', c),
      num('Calculate the hole diameter.', 2 * r, 'mm', c),
      num(
        'Calculate the solid base centroid x coordinate after the centered hole is cut.',
        L / 2,
        'mm',
        c,
        'The centered cut preserves reflection symmetry.',
      ),
      num('Calculate the solid base centroid y coordinate.', W / 2, 'mm', c),
      num('Calculate the solid base centroid z coordinate.', H / 2, 'mm', c),
      num(
        'Calculate the separate two-component assembly center-of-mass x coordinate.',
        (m1 * a + m2 * b) / (m1 + m2),
        'mm',
        c,
        'Use the mass-weighted mean, not the midpoint.',
      ),
      num('Calculate the separate assembly center-of-mass y coordinate.', 0, 'mm', c),
      num(
        'A second version doubles every linear dimension of the perforated base. By what factor does its volume increase?',
        8,
        '',
        c,
      ),
      num('Convert the base length to centimetres.', L / 10, 'cm', c),
      item(
        'Describe a feature sequence that makes the base and centered hole, including a reliable end condition for the cut.',
        'Sketch a fully dimensioned rectangle on a specified plane; extrude to H; sketch the centered circle on the top face; use a remove extrude through all. Constrain the circle center and radius. Equivalent sequences that produce the same geometry are acceptable.',
        c,
      ),
      item(
        'Why can a sketch with the correct visible shape still be under-constrained? Name a way to remove an unintended degree of freedom.',
        'It may still translate, rotate, or change size because position, orientation or dimensions are unspecified. Add suitable dimensions/geometric constraints and anchor the intended datum; avoid redundant constraints.',
        c,
      ),
      item(
        'Why is the arithmetic midpoint of the assembly positions generally the wrong center of mass for this case?',
        'The component masses differ. Center of mass weights each coordinate by its component mass; an arithmetic midpoint assumes equal masses.',
        c,
      ),
      item(
        'Explain how two parts can have equal volume but different center-of-mass positions.',
        'Equal volume does not fix spatial distribution. Translating a part or changing shape while retaining volume can move its centroid; differing material densities can also move mass distribution.',
        c,
      ),
      item(
        'A reported part volume is numerically correct in cm^3 but entered as mm^3. Explain the scale error.',
        'One cm equals ten mm, so one cm^3 equals 1,000 mm^3. Reusing the same number with the wrong volume unit causes a factor-of-1,000 error.',
        c,
      ),
      item(
        'Describe how to check that a hole is a cut rather than a separate overlapping solid.',
        'Inspect the feature operation for remove/subtract, inspect a section through the hole, check that the passage is empty and verify that the remaining volume equals prism volume minus cylinder volume.',
        c,
      ),
      item(
        'Explain why matching the part volume alone does not prove that an assembly is correct.',
        'Incorrectly positioned or oriented components can retain their individual volumes. Check specified coordinates, mates, materials and assembly center of mass as well as individual geometry.',
        c,
      ),
    ];
  }
  const s = 2 + k,
    x = k + 1,
    y = 2 * k + 1;
  const c = `Authored Write It Do It case ${k}. This is a written reconstruction exercise; coordinates describe the target and are not a diagram handed to a builder in competition. A flat ${s * 8}-cm square base has an origin at its southwest corner. East is +x and north is +y; coordinates are in cm and viewed from above. Put red cube R at (${x},${y}); blue cube B at (${x + s},${y}); green cube G at (${x + s},${y + 2 * s}); and yellow cube Y at (${x},${y + 2 * s}). All cubes have edge 1 cm and centers at the named coordinates. A horizontal straw joins the top centers of R and B, a second joins B and G, and a third joins G and Y. No straw joins Y and R. No parts are hidden. The inventory has four cubes, three straws, and the base.`;
  return [
    num('What is the x coordinate of the blue cube center?', x + s, 'cm', c),
    num('What is the y coordinate of the green cube center?', y + 2 * s, 'cm', c),
    num('How far east of the red cube center is the blue cube center?', s, 'cm', c),
    num('How far north of the blue cube center is the green cube center?', 2 * s, 'cm', c),
    num('What is the straight-line center-to-center distance from red to yellow?', 2 * s, 'cm', c),
    num(
      'What is the total center-to-center length of the three specified straw spans?',
      4 * s,
      'cm',
      c,
    ),
    num('How many straw connections meet the blue cube?', 2, '', c),
    num('How many straw connections meet the yellow cube?', 1, '', c),
    item(
      'Write unambiguous words-only instructions for establishing the base orientation and placing the red cube.',
      `Identify the southwest corner as origin, the east edge direction as +x and north as +y. View from above. Place the red cube center ${x} cm east and ${y} cm north of the origin. State that coordinates locate cube centers, not edges.`,
      c,
    ),
    item(
      'Write a complete words-only sequence to place all four cubes and connect the three straws.',
      `Establish the stated axes; position red at (${x},${y}), blue at (${x + s},${y}), green at (${x + s},${y + 2 * s}) and yellow at (${x},${y + 2 * s}) using center coordinates. Connect top center red to blue, blue to green, green to yellow. Leave yellow-to-red unconnected. Numerals used within prose are acceptable for this practice.`,
      c,
    ),
    item(
      'A builder places the green cube south of the blue cube. Identify the direction error and give the correction.',
      `The target green cube is ${2 * s} cm north of blue, not south. Keep green's x coordinate equal to blue's and increase its y coordinate by ${2 * s} cm.`,
      c,
    ),
    item(
      'Explain why “put the other cube beside it” is insufficient for this target.',
      'It does not identify either cube, the side, orientation, distance or reference point. Use colors/identifiers, a fixed viewpoint and center-to-center offsets.',
      c,
    ),
    item(
      'State two checks that catch an unintended mirror image.',
      'Check the fixed east/north orientation against the southwest origin; then verify that blue is east of red and green is north of blue. Either independent signed offset check helps detect mirroring.',
      c,
    ),
    item(
      'Describe how you would identify a missing straw without using a drawing in your instructions.',
      'List the three endpoint pairs explicitly: red-blue, blue-green, green-yellow. Compare that list with the construction and also state that yellow-red must remain open.',
      c,
    ),
    item(
      'Explain the difference between specifying cube centers and specifying the nearest edges.',
      'They are different reference positions. Each center is half a cube edge from its faces. A dimension must name its reference points consistently or the reconstructed separation shifts.',
      c,
    ),
    item(
      'A builder is missing one cube but connects two later pieces correctly to one another. Explain how to document the useful partial reconstruction.',
      'Record the correct downstream piece-to-piece relationship separately from the missing or incorrect earlier connection. Do not discard all later relationships solely because an earlier part is wrong; event scoring can recognize correct connections beyond an incorrect one.',
      c,
    ),
    item(
      'Rewrite “left” and “right” in a way that prevents the writer and builder from using opposite viewpoints.',
      'Specify a common top-down viewpoint and fixed north/east axes on the base, then replace left/right with west/east or signed coordinate offsets relative to a named reference.',
      c,
    ),
    item(
      'Explain how to test the instructions with a partner while avoiding feedback that makes a weak description appear successful.',
      'Have the partner reconstruct from the written description alone using a fresh kit, without seeing the target or receiving extra verbal hints. Compare the result with the stated locations and connection list, then revise ambiguous steps.',
      c,
    ),
  ];
}
