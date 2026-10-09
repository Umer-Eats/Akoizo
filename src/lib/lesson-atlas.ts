// Original teaching diagrams and comparison panels, grounded in each lesson's prose.
// Source images are unchanged local copies; their attribution is displayed beside every use.
export type AtlasImage =
  | 'respiratory-zone'
  | 'digestive-system'
  | 'lymphatic-system'
  | 'skin-structure'
  | 'fingerprint-whorl';
export type AtlasEntry = {
  section: number;
  title: string;
  steps: { label: string; detail: string }[];
  contrasts: { label: string; mechanism: string; limit: string }[];
  image?: AtlasImage;
};
function entry(
  section: number,
  title: string,
  steps: string[],
  contrasts: string[],
  image?: AtlasImage,
): AtlasEntry {
  return {
    section,
    title,
    steps: steps.map((s) => {
      const [label, detail] = s.split('|');
      return { label, detail };
    }),
    contrasts: contrasts.map((s) => {
      const [label, mechanism, limit] = s.split('|');
      return { label, mechanism, limit };
    }),
    image,
  };
}
export const lessonAtlas: Record<string, AtlasEntry> = {
  'anat-u1-l1': entry(
    0,
    'Describe a structure from a fixed reference',
    [
      'Position|Stand erect, face forward, arms at the sides, palms forward. Patient right stays patient right in every view.',
      'Direction|Anterior/posterior describe front/back; proximal/distal compare distance from a limb attachment.',
      'Section|Sagittal divides left/right, frontal divides front/back, and transverse divides superior/inferior.',
    ],
    [
      'Sagittal|Left and right portions|Only a midsagittal cut produces equal halves.',
      'Frontal|Anterior and posterior portions|A front-view image is not itself proof of a frontal section.',
      'Transverse|Superior and inferior portions|A tubular organ can appear circular or elongated depending on the cut.',
    ],
  ),
  'anat-u1-l2': entry(
    0,
    'A negative-feedback loop',
    [
      'Disturbance|The regulated variable moves away from its set point.',
      'Sensor → integrator|Detection and comparison determine the direction of the error.',
      'Effector → correction|A response opposes the deviation; successful correction reduces the stimulus.',
    ],
    [
      'Negative feedback|Opposes a deviation|Stability can include fluctuations and response delays.',
      'Positive feedback|Amplifies a change|An endpoint must terminate the loop.',
      'Gradient|Creates a driving difference|A pathway and permeability are also necessary.',
    ],
  ),
  'anat-u2-l1': entry(
    1,
    'Trace air and airway protection',
    [
      'Trachea → bronchi|Cartilage supports larger conducting airways; branching distributes airflow.',
      'Bronchioles|Small airways have smooth muscle; narrowing raises resistance sharply in the ideal tube model.',
      'Respiratory zone|Respiratory bronchioles lead to alveolar ducts and alveoli where exchange occurs.',
    ],
    [
      'Conducting zone|Moves, warms, humidifies, and filters air|Airflow here is not alveolar gas exchange.',
      'Mucociliary clearance|Mucus traps particles and cilia move the layer|Loss of either component weakens clearance.',
      'Bronchiolar narrowing|Reduced radius raises resistance|Real airways do not satisfy every rigid-tube assumption.',
    ],
    'respiratory-zone',
  ),
  'anat-u2-l2': entry(
    1,
    'Cross the alveolar–capillary interface',
    [
      'Alveolar air|Ventilation renews gas in the exchange compartment.',
      'Thin barrier|Type I alveolar cells and capillary endothelium provide a short diffusion path.',
      'Capillary blood|Perfusion removes delivered oxygen and brings carbon dioxide to the lung.',
    ],
    [
      'Type I cells|Thin exchange surface|Thickness and area affect transfer.',
      'Type II cells|Surfactant production and repair contribution|Surfactant changes surface tension; it is not hemoglobin.',
      'Pleural space|Mechanical coupling through pressure|It is separate from the alveolar air compartment.',
    ],
    'respiratory-zone',
  ),
  'anat-u3-l1': entry(
    1,
    'Account for every milliliter of a breath',
    [
      'Tidal volume|Total air moved in one breath, VT.',
      'Subtract dead space|Fresh-air contribution to exchange regions is VT − VD.',
      'Multiply by frequency|Minute ventilation = VT × f; alveolar ventilation = (VT − VD) × f.',
    ],
    [
      '500 mL × 12/min|6 L/min total; 4.2 L/min alveolar with VD = 150 mL|This is a fixed-dead-space teaching example.',
      '250 mL × 24/min|6 L/min total; 2.4 L/min alveolar with VD = 150 mL|Equal total ventilation can hide unequal effective ventilation.',
      'Residual volume|Air remains after maximal expiration|Simple spirometry cannot directly measure it.',
    ],
    'respiratory-zone',
  ),
  'anat-u3-l2': entry(
    5,
    'Keep oxygen measurements separate',
    [
      'Partial pressure|Dissolved oxygen establishes the pressure that drives diffusion.',
      'Saturation and content|Hemoglobin occupancy is a fraction; content also depends on the amount of hemoglobin.',
      'Delivery|Oxygen content multiplied by blood flow determines delivery to tissue.',
    ],
    [
      'Right shift|Lower affinity promotes unloading at a given pressure|Compare at the same oxygen pressure.',
      'Left shift|Higher affinity favors binding|Higher affinity can make unloading harder.',
      'Low hemoglobin|Less binding capacity can reduce oxygen content|A normal saturation does not establish normal delivery.',
    ],
    'respiratory-zone',
  ),
  'anat-u4-l1': entry(
    5,
    'Compare the site of obstructive changes',
    [
      'Lumen and mucus|Secretions and wall changes can impede flow.',
      'Smooth muscle|Bronchoconstriction reduces airway radius and increases resistance.',
      'Parenchyma|Loss of elastic support and exchange area changes emptying and gas transfer.',
    ],
    [
      'Asthma|Variable airway narrowing and hyperreactivity|Variability matters; one image alone is insufficient.',
      'Chronic bronchitis|Chronic airway inflammation and mucus burden|The phenotype differs from alveolar wall destruction.',
      'Emphysema|Loss of alveolar walls and elastic recoil|Area loss and airway collapse are related but distinct effects.',
    ],
    'respiratory-zone',
  ),
  'anat-u4-l2': entry(
    5,
    'Locate the physical exchange problem',
    [
      'Airspace filling|Material in alveoli changes the available air compartment.',
      'Barrier thickening|A longer diffusion path lowers normalized transfer.',
      'Reduced compliance|A stiffer system requires more pressure for a given volume change.',
    ],
    [
      'Pneumonia|Airspace infection and inflammatory filling|Distribution and clinical context matter.',
      'Fibrosis|Thickening and stiffness|Restriction is not synonymous with every diffusion problem.',
      'Shunt|Perfusion reaches inadequately ventilated regions|This differs from an isolated membrane-thickness change.',
    ],
    'respiratory-zone',
  ),
  'anat-u5-l1': entry(
    2,
    'Separate secretion, digestion, and protection',
    [
      'Parietal cell|Produces acid and intrinsic factor; intrinsic factor supports the downstream B12 pathway.',
      'Chief cell|Produces pepsinogen, the precursor of a protein-digesting enzyme.',
      'Mucosal protection|Mucus, bicarbonate, epithelial integrity, and perfusion limit injury from luminal contents.',
    ],
    [
      'Acid|Creates the gastric chemical environment|Acid is not an enzyme.',
      'Intrinsic factor|Supports terminal-ileal vitamin B12 absorption|The secretion site and absorption site differ.',
      'Mucus–bicarbonate|Protective surface barrier|Protection is coordinated, not one isolated substance.',
    ],
    'digestive-system',
  ),
  'anat-u5-l2': entry(
    3,
    'Follow parallel nutrient routes',
    [
      'Lumen → enterocyte|Digestion supplies smaller products and transport mechanisms move them across the epithelium.',
      'Portal route|Many absorbed sugars and amino acids enter blood and travel to the liver.',
      'Lymphatic route|Many long-chain lipids leave as chylomicrons through lacteals before reaching blood.',
    ],
    [
      'Bile|Emulsifies lipids and supports micellar transport|Bile salts do not hydrolyze triglycerides as enzymes do.',
      'Pancreatic enzymes|Hydrolyze nutrient substrates|Delivery and luminal conditions also matter.',
      'Villi and microvilli|Increase absorptive area|Digestion and absorption are different steps.',
    ],
    'digestive-system',
  ),
  'anat-u6-l1': entry(
    5,
    'Balance injury against defense',
    [
      'Exposure|Acid and proteolytic activity challenge the mucosal surface.',
      'Defense|Mucus, bicarbonate, epithelial repair, and perfusion protect tissue.',
      'Failure|A breached barrier can lead to injury and bleeding; a mass can instead change the lumen or wall.',
    ],
    [
      'Ulceration|Defect through mucosal tissue|A mechanism must be linked to evidence.',
      'Obstruction|Narrowing impedes passage|Not every mucosal defect is an obstructing mass.',
      'Blood appearance|Transit and location influence observed color|Color alone does not precisely localize every bleed.',
    ],
    'digestive-system',
  ),
  'anat-u6-l2': entry(
    0,
    'From lactose hydrolysis to colonic substrate',
    [
      'Lactose load|The disaccharide enters the small intestine.',
      'Lactase hydrolysis|Effective hydrolysis determines how much smaller absorbable product becomes available.',
      'Residual substrate|Unhydrolyzed lactose can reach the colon, retain water, and undergo fermentation.',
    ],
    [
      'Lactase limitation|Reduced carbohydrate hydrolysis|This is not the same mechanism as an allergic immune response.',
      'Load versus capacity|Residual = max(0, load − capacity)|The lab uses a chosen effective capacity, not a prescribed enzyme dose.',
      'Energy balance|Intake and expenditure interact over time|Obesity cannot be explained by one nutrient or simple willpower.',
    ],
    'digestive-system',
  ),
  'anat-u7-l1': entry(
    2,
    'Trace tissue fluid back to blood',
    [
      'Interstitial fluid|Fluid around tissue cells can enter lymphatic capillaries.',
      'Lymph → regional node|Afferent vessels bring tissue-derived antigen and cells to a surveillance compartment.',
      'Collecting ducts → veins|Lymph returns to the venous circulation; valves and movement help one-way flow.',
    ],
    [
      'Bone marrow|Hematopoiesis and B-cell development|Development differs from a mature antigen encounter.',
      'Thymus|T-cell maturation and selection|It is a primary lymphoid organ.',
      'Regional node|Filters incoming tissue lymph|Blood filtration instead points toward the spleen.',
    ],
    'lymphatic-system',
  ),
  'anat-u7-l2': entry(
    5,
    'Map a lymph node and a spleen by input',
    [
      'Tissue lymph|Regional lymph nodes survey material from surrounding tissue.',
      'Blood|The spleen surveys blood-borne material; white and red pulp serve distinct functions.',
      'Mucosal interfaces|Organized and diffuse defenses respond where external material meets internal tissue.',
    ],
    [
      'Node follicles|B-cell-rich regions; germinal centers support selection|Cell location informs function.',
      'Node paracortex|T-cell-rich region|Architecture organizes encounters.',
      'Splenic red pulp|Erythrocyte processing|Red pulp and immune white pulp are not interchangeable.',
    ],
    'lymphatic-system',
  ),
  'anat-u8-l1': entry(
    6,
    'Complement converges, then branches',
    [
      'Initiation|Classical, lectin, and alternative pathways have different initiating conditions.',
      'C3 convergence|C3 activation supplies fragments with different jobs.',
      'Effector outcomes|Opsonization, inflammatory recruitment, and terminal membrane effects are distinct outcomes.',
    ],
    [
      'C3b|Target coating supports phagocytic uptake|Recognition and successful uptake are separate actions.',
      'C3a / C5a|Inflammatory signaling and recruitment|These fragments do not all perform the same function.',
      'Terminal complex|Can disrupt susceptible membranes|It does not replace every other immune defense.',
    ],
    'lymphatic-system',
  ),
  'anat-u8-l2': entry(
    5,
    'Build an antigen-specific response',
    [
      'Recognition + activation|Specific receptor recognition works with the required activation context.',
      'Clonal expansion|Selected cells multiply and differentiate into effector populations.',
      'Memory|Some cells persist and change the response to later exposure to the same antigen.',
    ],
    [
      'Antibody specificity|Determined by antigen-binding regions|Specificity is not identical to antibody class.',
      'Class switching|Changes effector role through the constant region|Class switching does not by itself change antigen specificity.',
      'Affinity selection|Favors stronger-binding variants in appropriate responses|Conceptual response curves are not individual clinical titers.',
    ],
    'lymphatic-system',
  ),
  'anat-u9-l1': entry(
    5,
    'Classify function before naming a disorder',
    [
      'Inventory|Ask which cell populations are present and how they are measured.',
      'Functional challenge|Ask whether the relevant arm responds appropriately to its challenge.',
      'Context and pattern|Combine functional, temporal, and clinical evidence before narrowing causes.',
    ],
    [
      'Humoral gap|Poor antibody output despite possible B-cell presence|A count does not establish normal function.',
      'T-cell gap|Disrupted coordination or cell-mediated functions|Antibody and cellular arms interact.',
      'Combined gap|More than one immune arm is impaired|One observation rarely defines every cause.',
    ],
    'lymphatic-system',
  ),
  'anat-u9-l2': entry(
    6,
    'Separate trigger, target, and timing',
    [
      'Trigger|Distinguish external antigen, self target, and failure of defense.',
      'Effector mechanism|Identify the cells or mediators responsible for the observed change.',
      'Tissue consequence|Connect airway, vascular, joint, or neural changes with the mechanism.',
    ],
    [
      'Allergy|Response to an external antigen|Rapid re-exposure effects support an immediate effector mechanism in the case.',
      'Autoimmunity|Immune damage directed toward self structures|Different target tissues produce different functional losses.',
      'Immunodeficiency|Inadequate protective function|This differs from an excessive or misdirected response.',
    ],
    'lymphatic-system',
  ),
  'anat-u10-l1': entry(
    5,
    'Read a case in a fixed order',
    [
      'Orient + verify|Confirm viewpoint, units, measurement context, and supplied reference information.',
      'Describe → localize|State the finding before explaining its anatomical location.',
      'Mechanism → limits|Connect location to physiology and identify what additional evidence would resolve uncertainty.',
    ],
    [
      'Pressure|A driving or measured pressure difference|Do not substitute saturation or flow for pressure.',
      'Volume / rate|Quantifies movement of air|Effective exchange also depends on dead space and perfusion.',
      'Image appearance|Shows a distribution or structure|A diagnosis requires context beyond a single visual sign.',
    ],
    'respiratory-zone',
  ),
  'anat-u10-l2': entry(
    6,
    'Turn an error into a targeted drill',
    [
      'Classify the error|Separate recall, orientation, arithmetic, interpretation, and time management.',
      'Select the drill|Practice the operation that failed using varied examples.',
      'Transfer + retest|Use a new view or case, then check whether the original error returns.',
    ],
    [
      'Orientation error|Use changed viewpoints and patient-relative directions|More unrelated definitions do not fix a viewpoint error.',
      'Mechanism error|Reconstruct a causal chain|A label-only flashcard can hide missing relationships.',
      'Timing error|Rehearse complete stations with checkpoints|Rushed repetition can reinforce the wrong operation.',
    ],
  ),
  'for-u1-l1': entry(
    5,
    'Keep evidence claims on the right level',
    [
      'Material|Describe what the analysis detected in the item.',
      'Source|Compare possible origins and recognize class-level compatibility.',
      'Activity|Ask how and when transfer occurred; ordinary contact and persistence can matter.',
    ],
    [
      'Material agreement|Shared observed properties|Not necessarily a unique source.',
      'Source association|Compatibility with a reference|Does not by itself establish activity.',
      'Responsibility|A broader event-level proposition|Cannot be read directly from one compatible fiber.',
    ],
  ),
  'for-u1-l2': entry(
    5,
    'A control run must be interpretable',
    [
      'Positive control|Shows whether the method can detect a known target under this run.',
      'Blank|Tests background response or contamination introduced by the procedure.',
      'Unknown|Interpret only in relation to valid controls and documented conditions.',
    ],
    [
      'Positive works; blank negative|Expected control pattern|Still inspect unknown-specific limitations.',
      'Positive works; blank positive|Background or contamination is unresolved|Do not accept the unknown merely because the positive worked.',
      'Positive fails|Detection performance is compromised|A negative unknown is not interpretable as a valid absence.',
    ],
  ),
  'for-u2-l1': entry(
    5,
    'Narrow the powder candidate set',
    [
      'Water solubility|Separate dissolved material from persistent solid under the stated conditions.',
      'Fresh aliquot + acid|Observe effervescence with a negative blank for this exercise.',
      'Reference intersection|Retain only candidates consistent with both properties in the supplied panel.',
    ],
    [
      'Calcium carbonate|Poorly soluble; acid-reactive in this panel|Candidate-set comparison, not a universal unique identification.',
      'Sodium carbonate|Soluble; acid-reactive|Acid response alone cannot separate these two carbonates.',
      'Sodium chloride|Soluble; not acid-effervescent|Record an observation rather than an unsupported molecular claim.',
    ],
  ),
  'for-u2-l2': entry(
    6,
    'Read a test matrix, not one color',
    [
      'Validate controls|Known samples establish expected responses and blanks establish background.',
      'Iodine observation|Compare with the starch reference under the stated procedure.',
      'Benedict observation|Compare reducing behavior separately; combine both results without overclaiming.',
    ],
    [
      'Iodine response|Evidence for the reference starch behavior|A negative result does not exclude all carbohydrates.',
      'Benedict response|Evidence for reducing behavior|A positive result does not uniquely identify one sugar.',
      'Flame emission|Atomic transitions produce characteristic emission|Contamination and mixed colors can complicate observation.',
    ],
  ),
  'for-u3-l1': entry(
    5,
    'Connect polymer chains to properties',
    [
      'Repeat units|The monomer-derived units define chemical composition.',
      'Chain organization|Branching, interactions, and crystallinity influence bulk behavior.',
      'Measured properties|Density and other tests narrow candidates when compared with a suitable reference set.',
    ],
    [
      'Recycling code|Identifies a broad resin category|Not a unique source or an exact density measurement.',
      'Crystallinity|Can influence density and mechanical behavior|Sample history and additives also matter.',
      'Density agreement|A shared physical property|One matching value cannot identify a manufacturer.',
    ],
  ),
  'for-u3-l2': entry(
    5,
    'Bracket the unknown density',
    [
      'Lower-density liquid|A denser ideal sample sinks.',
      'Higher-density liquid|A less-dense ideal sample floats.',
      'Bracket|Find the interval between liquids where the behavior changes, then compare other evidence.',
    ],
    [
      'Sample denser than liquid|Sinks in the ideal model|Trapped air can mislead a real test.',
      'Sample less dense than liquid|Floats with a density-dependent submerged fraction|Floating in water fits multiple polymers.',
      'Equal densities|Ideal neutral buoyancy|Temperature and uncertainty can affect the comparison.',
    ],
  ),
  'for-u4-l1': entry(
    1,
    'Compare morphology before source claims',
    [
      'Longitudinal shape|Look for ribbon twists, scales, or uniform filament morphology.',
      'Composition|Use an independent material-property comparison rather than appearance alone.',
      'Source limits|A fiber class can be consistent with multiple garments and transfer histories.',
    ],
    [
      'Cotton-like|Flattened ribbon with convolutions; cellulose-based|The class does not identify one garment.',
      'Wool-like|Scale-bearing reference morphology|Evaluate observable detail before assigning a class.',
      'Synthetic reference|Smooth uniform filament in this comparison|Synthetic fibers are a broad, varied family.',
    ],
  ),
  'for-u4-l2': entry(
    0,
    'Inspect a hair as nested structures',
    [
      'Cuticle|Outer layer with a scale pattern; preparation and magnification affect the view.',
      'Cortex|Contains much of the pigment and contributes to shaft properties.',
      'Medulla|Central region can be continuous, fragmented, or absent in an observed segment.',
    ],
    [
      'Morphological overlap|Questioned features fall within a reference range|Not individual identification.',
      'Within-person variation|Known hairs can differ|One reference hair may not capture the relevant range.',
      'Biological analysis|Different material may support different DNA analyses|No DNA conclusion follows when no DNA result is supplied.',
    ],
    'skin-structure',
  ),
  'for-u5-l1': entry(
    1,
    'Measure two distances from one origin',
    [
      'Baseline|Mark the origin before migration; both measurements start here.',
      'Spot center|Measure the component center rather than the upper edge of a broad spot.',
      'Solvent front|Measure before it disappears; Rf = spot distance / front distance.',
    ],
    [
      'Same Rf|Agreement under matched conditions|Does not uniquely establish ink identity.',
      'Changed solvent|Changes the interacting system|Rf is not a universal compound constant.',
      'Broad or overlapping spots|Center and separation are uncertain|Report measurement limitations.',
    ],
  ),
  'for-u5-l2': entry(
    5,
    'Read a spectrum from axes to inference',
    [
      'Axes|m/z locates a signal; relative intensity describes its abundance in the displayed spectrum.',
      'Base peak|The highest-intensity signal is normalized to the display maximum.',
      'Candidate comparison|Use a complete informative pattern and complementary constraints to discriminate candidates.',
    ],
    [
      'Base peak|Most intense displayed signal|Need not equal the intact molecular mass.',
      'Molecular-ion region|Can constrain intact mass when interpretable|A weak region may leave a candidate question unresolved.',
      'Common fragment|Can occur in more than one candidate|m/z 91 alone is not unique proof of one compound.',
    ],
  ),
  'for-u6-l1': entry(
    0,
    'Move from ridge flow to usable detail',
    [
      'Pattern class|Describe broad arch, loop, or whorl flow.',
      'Quality|Identify distortion, smearing, and the area that can actually be compared.',
      'Detailed comparison|Evaluate configurations and disagreement in usable regions.',
    ],
    [
      'Class agreement|Broad flow looks compatible|Many individuals share a pattern class.',
      'Clear ridge detail|Supports a more detailed comparison|There is no universal two-feature certainty threshold.',
      'Smearing|Merged or missing recorded detail|A poor record is not proof of changed anatomy.',
    ],
    'fingerprint-whorl',
  ),
  'for-u6-l2': entry(
    4,
    'Choose the development pathway by substrate',
    [
      'Surface|Determine porous, nonporous, or another relevant surface class.',
      'Residue|Consider the targeted chemistry and expected material remaining.',
      'Sequence|Use a validated compatible method while preserving other evidence on the exhibit.',
    ],
    [
      'Porous paper|Amino-acid-targeting methods may be relevant|Consider ink and other evidence before treatment.',
      'Nonporous surface|Surface residues require a compatible method|Do not apply one universal sequence everywhere.',
      'No visible mark|Latent residue may remain|Invisible is not equivalent to no contact.',
    ],
    'fingerprint-whorl',
  ),
  'for-u7-l1': entry(
    5,
    'Compare an STR profile under explicit assumptions',
    [
      'Locus-by-locus|Compare the allele set at each supplied locus.',
      'Quality model|Check single source, completeness, contamination, and dropout assumptions.',
      'Conclusion|A mismatch may exclude under the model; compatibility needs a separate significance assessment.',
    ],
    [
      'A: 10,12 / 8,9|Compatible with the teaching questioned profile|Compatibility does not establish responsibility.',
      'B: 10,11 / 8,9|Locus 1 differs from 10,12|Excluded as sole source only under the stated model.',
      'Mixture / dropout|Changes what can be inferred from a missing allele|Do not apply clean single-source logic automatically.',
    ],
  ),
  'for-u7-l2': entry(
    2,
    'Separate typing from stain geometry',
    [
      'Typing|ABO results describe a broad biological property.',
      'Ellipse measurement|Measure the stain body width and length, excluding tails.',
      'Angle|Use arcsin(width / length) for the ideal smooth-surface ellipse.',
    ],
    [
      'Ratio 0.5|An ideal impact angle of 30°|Doubling both axes preserves angle.',
      'Ratio 1|A circular ideal stain implies 90°|Real surface texture limits inference.',
      'ABO compatibility|A broad class-level biological agreement|Does not uniquely identify a donor or a trajectory.',
    ],
  ),
  'for-u8-l1': entry(
    5,
    'Compare intervals before declaring agreement',
    [
      'Measurement|Attach the value to units, conditions, and uncertainty.',
      'Intervals|Compare the questioned and reference ranges, not just rounded centers.',
      'Source claim|Preserve compatibility or exclusion at the property-comparison level.',
    ],
    [
      'Questioned: 1.520 ± 0.002|Interval 1.518–1.522|Refractive index is unitless.',
      'A: 1.521 ± 0.002|Interval 1.519–1.523 overlaps questioned|Overlap supports consistency, not unique source proof.',
      'B: 1.535 ± 0.002|Interval 1.533–1.537 is separated|Interpret under matched measurement conditions.',
    ],
  ),
  'for-u8-l2': entry(
    6,
    'Accumulate effective temperature over time',
    [
      'Threshold|Only temperature above the chosen developmental threshold contributes in this model.',
      'Each interval|Degree-hours = max(0, temperature − threshold) × hours.',
      'Sum and interpret|Sum intervals, then distinguish insect age and colonization from time since death.',
    ],
    [
      '24 h at 20 °C; base 6 °C|14 × 24 = 336 degree-hours|Constant-temperature teaching example.',
      '48 h at 13 °C; base 6 °C|7 × 48 = 336 degree-hours|Different histories can have equal thermal accumulation.',
      'Colonization timing|Access may be delayed|Insect age does not automatically equal the postmortem interval.',
    ],
  ),
  'for-u9-l1': entry(
    5,
    'Make a claim traceable to a measurement',
    [
      'Record|Keep raw observations, units, conditions, and controls together.',
      'Estimate|State the calculation and an appropriate uncertainty description.',
      'Claim|Tie the conclusion to the actual data and its limits.',
    ],
    [
      'Random scatter|Repeated measurements vary|Averaging does not remove all bias.',
      'Systematic error|A consistent offset or method bias|More repeats can preserve the same error.',
      'False precision|Digits exceed measurement support|A calculated decimal does not create new information.',
    ],
  ),
  'for-u9-l2': entry(
    5,
    'Attach each result to its own proposition',
    [
      'Item|Identify the analyzed exhibit rather than an assumed actor.',
      'Source question|Record what each comparison supports or excludes.',
      'Activity question|Integrate timing, transfer, and scenario constraints without cancelling unrelated findings.',
    ],
    [
      'Ink agreement|A pen is compatible with a developed pattern|Does not prove who wrote a note.',
      'DNA exclusion|A is excluded as sole donor of the clean stain|Does not resolve every possible activity involving A.',
      'Different sources|Writer and stain donor need not be identical|A match-count shortcut can erase the actual propositions.',
    ],
  ),
  'for-u6-l3': entry(
    3,
    'A persistent ridge pattern can leave different records',
    [
      'Anatomical source|Friction-ridge architecture supplies the underlying spatial pattern.',
      'Residue + contact|Sweat, transferred material, pressure, and movement affect transfer.',
      'Recorded impression|Substrate and contact conditions determine which detail is visible.',
    ],
    [
      'Stationary light contact|Can preserve clear ridge segments|The example describes a record, not a new anatomy.',
      'Sliding excess residue|Can merge and smear ridge marks|Distortion does not prove an instantly changed pattern.',
      'Thick palmar skin|Eccrine ducts support residue deposition|Palmar friction skin does not have hair follicles.',
    ],
    'skin-structure',
  ),
  'for-u8-l3': entry(
    2,
    'Compare an assemblage within the sampled set',
    [
      'Questioned trace|Record pollen P and Q plus seed type R together.',
      'Reference sites|A contains P, Q, R; B contains only P in this supplied sample.',
      'Independent tread evidence|Broad design agreement is separate from unresolved fine wear detail.',
    ],
    [
      'Site A|More consistent within the exercise set|Unsampled sites may share the assemblage.',
      'Site B|Supplied sample has only P|Sampling coverage and variability limit exclusion strength.',
      'Partial tread|Broad design agrees|Unclear wear detail cannot uniquely establish wearer or timing.',
    ],
  ),
};

export const atlasImages: Record<
  AtlasImage,
  {
    title: string;
    alt: string;
    source: string;
    author: string;
    license: string;
    licenseUrl: string;
  }
> = {
  'respiratory-zone': {
    title: 'Respiratory bronchioles, alveoli, and capillaries',
    alt: 'Labeled OpenStax illustration of terminal and respiratory bronchioles, alveolar ducts, sacs, pores, pulmonary vessels, and surrounding capillaries.',
    source: 'https://commons.wikimedia.org/wiki/File:2309_The_Respiratory_Zone.jpg',
    author: 'OpenStax College',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  'digestive-system': {
    title: 'Digestive organs and their anatomical relationships',
    alt: 'Labeled digestive-system illustration showing mouth, salivary glands, esophagus, stomach, liver, gallbladder, pancreas, and segments of small and large intestine.',
    source: 'https://commons.wikimedia.org/wiki/File:2401_Components_of_the_Digestive_System.jpg',
    author: 'OpenStax College',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  'lymphatic-system': {
    title: 'Lymphatic organs, vessels, and tissue-fluid entry',
    alt: 'Labeled lymphatic-system illustration with marrow, thymus, nodes, spleen, lymphatic ducts, and close-ups of lymph entering capillaries and node structure.',
    source: 'https://commons.wikimedia.org/wiki/File:2201_Anatomy_of_the_Lymphatic_System.jpg',
    author: 'OpenStax College',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  'skin-structure': {
    title: 'Skin layers, hair follicles, and glands',
    alt: 'Cross-sectional skin illustration labeling epidermis, dermis, hypodermis, vessels, nerves, hair follicles, and glands. This hair-bearing reference differs from thick palmar skin.',
    source: 'https://commons.wikimedia.org/wiki/File:501_Structure_of_the_skin.jpg',
    author: 'OpenStax College',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  'fingerprint-whorl': {
    title: 'A real whorl-pattern fingerprint',
    alt: 'NIST reference fingerprint image with concentric whorl ridge flow and surrounding ridge detail.',
    source: 'https://commons.wikimedia.org/wiki/File:Fingerprint_Whorl.jpg',
    author: 'NIST database, U.S. Department of Commerce',
    license: 'Public domain',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:Fingerprint_Whorl.jpg#Licensing',
  },
};
