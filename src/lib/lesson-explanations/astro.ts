// Checkpoint explanations for Astronomy, keyed by question id.
export const astronomy: Record<string, string> = {
  'astro-u1-l1-q1':
    'A light-year is the distance light travels in one year, about 9.46 × 10¹² km. Despite the word "year", it measures distance, not time. It does not describe brightness or temperature.',
  'astro-u1-l1-q2':
    'Luminosity is the total power a star emits, a property of the star itself. Flux and apparent magnitude describe how bright it looks from Earth, which also depends on distance. Angular size is how large it appears on the sky.',
  'astro-u1-l1-q3':
    'A teammate can only check or continue your work if they know what was measured, which equation was used, the units and what was assumed. A nickname, screenshot or bare number cannot be reproduced or checked.',
  'astro-u1-l1-q4':
    'Flux follows the inverse-square law, F = L ÷ (4πd²). Doubling the distance multiplies d² by 4, so the flux drops to 1/4 of its original value, assuming the luminosity is unchanged and nothing absorbs the light.',
  'astro-u1-l1-q5':
    'Every equation holds only under certain conditions, such as no dust, a blackbody or a main-sequence star. Writing the assumptions next to it stops you from using a familiar formula where it does not apply.',
  'astro-u1-l1-q6':
    'Stefan–Boltzmann gives L = 4πR²σT⁴. Holding T fixed and doubling R multiplies R² by 4, so L becomes 4 times larger. A quick check like this catches errors in a calculation.',
  'astro-u1-l1-q7':
    'A good entry records what went wrong (for example, using flux instead of luminosity, or a missed unit conversion), the correct relation, and a new worked example that applies the fix correctly.',
  'astro-u2-l1-q1':
    'Distance in parsecs = 1 ÷ parallax in arcseconds. d = 1 ÷ 0.05 = 20 pc. A smaller parallax means a more distant star.',
  'astro-u2-l1-q2':
    'Wien’s law: λ_peak = b ÷ T, so peak wavelength is inversely proportional to temperature. Hotter objects peak at shorter, bluer wavelengths, and cooler ones peak at longer, redder wavelengths.',
  'astro-u2-l1-q3':
    'In a false-color image, colors are assigned to chosen wavelength bands or data values, which may be X-ray, infrared or radio. Blue means only "the data assigned to the blue channel"; check the legend for what it represents physically.',
  'astro-u2-l1-q4':
    '1 milliarcsecond (mas) = 0.001 arcsecond. 50 mas × 0.001 = 0.050 arcseconds. That parallax would correspond to a distance of 1 ÷ 0.050 = 20 pc.',
  'astro-u2-l1-q5':
    'A spectral line forms only when atoms are in the right state. Temperature, density and ionization decide how many atoms can absorb or emit at that wavelength, so the line can strengthen or weaken while the element’s abundance stays the same.',
  'astro-u2-l1-q6':
    'Angular size is how large an object looks on the sky, measured as an angle. Physical size is its actual diameter. Converting needs the distance: physical size ≈ distance × angle (in radians).',
  'astro-u2-l1-q7':
    'Not detecting something does not prove it is absent. It may be too faint for the instrument, too small to resolve, hidden by dust, or emitting at wavelengths the instrument does not cover.',
  'astro-u3-l1-q1':
    'By convention, the H–R diagram’s horizontal axis runs from hot (left) to cool (right), so temperature increases toward the left. Luminosity increases upward on the vertical axis.',
  'astro-u3-l1-q2':
    'L = 4πR²σT⁴. A cool star emits less energy per square meter, so to be very luminous it needs an enormous surface area, meaning a large radius. That is why the cool, luminous corner holds red giants and supergiants.',
  'astro-u3-l1-q3':
    'Luminosity depends on T⁴ when radius is fixed. Doubling T multiplies L by 2⁴ = 16. Answers of 2, 4 or 8 use the wrong power.',
  'astro-u3-l1-q4':
    'With R and T in solar units, L = R² × T⁴. For a star with twice the Sun’s radius and twice its temperature: L = 2² × 2⁴ = 4 × 16 = 64 L☉.',
  'astro-u3-l1-q5':
    'A white dwarf is about Earth’s size, so its surface area is tiny. Even with a very high temperature, L = 4πR²σT⁴ stays small because R² is so small. It sits in the lower left of the H–R diagram.',
  'astro-u3-l1-q6':
    'The relation L ∝ M^3.5 describes stars burning hydrogen in their cores. A giant has a different internal structure and burns fuel in shells, so its luminosity no longer follows the same mass relation.',
  'astro-u3-l1-q7':
    'An evolutionary track on the H–R diagram shows how a star’s temperature and luminosity change over its life. Moving along the track means the star’s properties change, not that it moves through space.',
  'astro-u4-l1-q1':
    'As a protostar contracts, gravitational potential energy is converted to heat and light. That powers it until the core is hot enough for hydrogen fusion. Chemical burning is far too weak, and a planetary nebula forms at the end of a star’s life.',
  'astro-u4-l1-q2':
    'A giant’s radius increases enormously. Even though each square meter is cooler and emits less, the surface area (∝ R²) grows so much that total luminosity rises. Distance has no effect on luminosity.',
  'astro-u4-l1-q3':
    'Stars in a cluster formed at about the same time. Massive stars use their fuel fastest and leave the main sequence first. The mass at the turnoff point shows which stars are just running out, which reveals the cluster’s age.',
  'astro-u4-l1-q4':
    'Lifetime ∝ fuel ÷ burn rate ∝ M ÷ L, and L ∝ M^3.5, so t ∝ M ÷ M^3.5 = M^−2.5. For 2 M☉: 2^−2.5 ≈ 0.177, so the star lives about 18% as long as the Sun.',
  'astro-u4-l1-q5':
    'Only the hydrogen in the core is used up. The star still has hydrogen in its outer layers, which can fuse in a shell around the core, and the core may later fuse helium. The star does not simply switch off.',
  'astro-u4-l1-q6':
    'A planetary nebula is a dying star’s outer layers, ejected and lit by the hot core left behind. The name came from early telescopes, where some looked round like planets; planets play no part in forming one.',
  'astro-u4-l1-q7':
    'Turnoff ages assume all the stars formed at about the same time and depend on stellar models. Distance, dust reddening (extinction), metallicity, binary stars and missing faint stars can all shift the result.',
  'astro-u5-l1-q1':
    'A Type Ia supernova is a white dwarf in a binary system that gains mass until carbon fusion runs away and destroys it. Other supernova types come from the core collapse of massive stars. Type Ia spectra lack hydrogen lines.',
  'astro-u5-l1-q2':
    'A pulsar is a spinning neutron star that sends out beams of radiation. Each time a beam sweeps across Earth we see a pulse, so the period mostly reflects how fast it rotates and how its beams are aligned with us.',
  'astro-u5-l1-q3':
    'The event horizon is the boundary inside which nothing, not even light, can escape. It is not a solid surface or a visible shell of gas; it marks where events can no longer affect the outside universe.',
  'astro-u5-l1-q4':
    'The Schwarzschild radius is about 3 km per solar mass (Rs = 2GM/c²). For 10 M☉: 10 × 3 km = 30 km. Rs scales linearly with mass.',
  'astro-u5-l1-q5':
    'Gas falling toward a black hole forms a spinning accretion disk. Friction heats it to millions of degrees, so it emits light and X-rays. That happens outside the event horizon, so the radiation can escape.',
  'astro-u5-l1-q6':
    'A white dwarf has no ongoing fusion. Electron degeneracy pressure holds it up against gravity, and it shines only by slowly radiating away stored heat, cooling over billions of years.',
  'astro-u5-l1-q7':
    'Type Ia supernovae are not all equally bright. Brighter ones fade more slowly, so astronomers use light-curve shape and color to correct each one to a standard brightness. Without that correction, distances would be less accurate.',
  'astro-u6-l1-q1':
    'In astronomy, "metals" means every element heavier than hydrogen and helium, including carbon, oxygen and nitrogen. Metallicity measures how much of a star is made of these heavier elements.',
  'astro-u6-l1-q2':
    'A reflection nebula is a dust cloud lit by nearby stars. The dust scatters starlight, especially blue light, so it looks bluish. It does not glow on its own like an emission nebula.',
  'astro-u6-l1-q3':
    'No. The Hubble sequence (ellipticals, spirals, irregulars) sorts galaxies by appearance, not age. Galaxies can change type through mergers and interactions, and the original "early/late" labels do not mean an age order.',
  'astro-u6-l1-q4':
    'Dust clouds absorb and scatter light from stars behind them, so they appear as dark patches against a bright background. A dark area can contain a large amount of material, not empty space.',
  'astro-u6-l1-q5':
    'An emission nebula is gas energized by ultraviolet light from hot stars, glowing at specific wavelengths (often red hydrogen-alpha). A reflection nebula is dust that scatters light from nearby stars and does not produce its own light.',
  'astro-u6-l1-q6':
    'A galaxy’s light is the sum of billions of stars with many temperatures and ages, plus glowing gas and dust that absorbs light. One star’s temperature or spectrum cannot represent that mix.',
  'astro-u6-l1-q7':
    'Before comparing images at different wavelengths, match their scale, orientation and alignment. Also account for differences in resolution, sensitivity and when or how each image was taken, since these can create false differences.',
  'astro-u7-l1-q1':
    'On a logarithmic axis, equal distances mean equal multiplicative factors. Going from 1 to 10 and from 10 to 100 are both ×10, so they take up the same space even though the absolute differences (9 and 90) are very different.',
  'astro-u7-l1-q2':
    'An isochrone is a line on an H–R diagram showing where stars of different masses would be if they all had the same age. Fitting isochrones to a cluster estimates its age.',
  'astro-u7-l1-q3':
    'A flux-limited survey detects only objects brighter than a threshold. At large distances only intrinsically luminous objects pass, so the sample over-represents bright objects (Malmquist bias).',
  'astro-u7-l1-q4':
    'At equal temperature, L ∝ R², so R ∝ √L. If one star is 100 times as luminous, its radius is √100 = 10 times larger.',
  'astro-u7-l1-q5':
    'If two stars are too close together to separate in an image, their light adds and they look like one brighter star. Plotted as a single point, the pair lies above the single-star sequence, up to about 0.75 magnitude brighter.',
  'astro-u7-l1-q6':
    'In false-color images, blue may represent X-rays, a specific filter or any data channel chosen for display. It does not necessarily mean visible blue light, so it cannot be read as a hot star without checking the legend.',
  'astro-u7-l1-q7':
    'Before claiming how common something is, know how the sample was selected, which objects the survey could detect (completeness), how distances were determined and how each quantity was defined. Otherwise selection effects can masquerade as real frequencies.',
  'astro-u8-l1-q1':
    'The magnitude scale is logarithmic: 5 magnitudes equals a factor of exactly 100 in flux. Larger magnitudes are fainter, so 5 magnitudes fainter means 100 times less flux.',
  'astro-u8-l1-q2':
    'Distance modulus: m − M = 5 log₁₀(d ÷ 10 pc). At d = 10 pc, log₁₀(1) = 0, so m − M = 0. Absolute magnitude is defined as the apparent magnitude at 10 pc.',
  'astro-u8-l1-q3':
    'A positive shift means the observed wavelength is longer than the rest wavelength, a redshift, which indicates the source is moving away (receding). A negative shift (blueshift) indicates approach.',
  'astro-u8-l1-q4':
    'Rearrange m − M = 5 log₁₀(d ÷ 10) to d = 10 × 10^((m − M) ÷ 5). With m = 10 and M = 5: d = 10 × 10^(5 ÷ 5) = 10 × 10 = 100 pc.',
  'astro-u8-l1-q5':
    'Magnitudes are logarithms of flux, so adding them does not add the light. Convert each magnitude to flux, add the fluxes, then convert the total back. Two equal stars combined are only about 0.75 magnitude brighter, not double the magnitude.',
  'astro-u8-l1-q6':
    'F = L ÷ (4πd²) assumes the source radiates equally in all directions (isotropically) and that nothing absorbs or scatters the light along the way. Dust or beamed emission breaks this assumption.',
  'astro-u8-l1-q7':
    'Dust dims a star (extinction, A > 0). If that dimming is ignored, the star seems fainter only because it is farther away, so the calculated distance comes out too large. The corrected form is m − M − A = 5 log₁₀(d ÷ 10).',
};
