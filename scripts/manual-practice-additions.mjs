// Reviewed transcriptions from original competition papers and published keys.
// Writes drafts only; publish explicit IDs with import-reviewed-practice.mjs.
import { readFile, writeFile } from 'node:fs/promises';
import { validatePracticeCatalog } from '../src/lib/practice-catalog.ts';

const sources = JSON.parse(await readFile('documents/practice-import-sources.json', 'utf8'));
const drafts = [];
function paper(id, difficulty, difficultyReason, topics, topicMatch, alignment, scoringBasis) {
  const s = sources.find(s => s.id === id);
  if (!s) throw new Error(`Missing source ${id}`);
  const t = { id, eventId:s.eventId, division:s.division, competition:s.competition,
    year:s.year, level:s.level, difficulty, difficultyReason, topics, topicMatch, alignment,
    scoringBasis, sourceUrl:s.sourceUrl, paperUrl:s.paperUrl, keyUrl:s.keyUrl,
    season:2027, minutes:50, reviewedOn:'2026-10-08', rulesUrl:'https://www.soinc.org/rules-2027',
    instructions:'Read the original paper and use its printed question numbers. Enter all requested parts and show calculations in the response box. Auto Grade reviews written explanations against the published rubric. '+scoringBasis,
    gradingMode:'published-key', questions:[], keys:{}, questionCount:0, maxScore:0,
    levelEvidence:s.level ? {sourceUrl:s.sourceUrl,text:s.levelText,basis:'Reported competition title in the source archive.'} : null };
  drafts.push(t); return t;
}
function mc(t,id,page,points,answer,letters='ABCD',prompt) {
  t.questions.push({id:String(id),label:String(id),page,points,type:'mcq',options:[...letters].map(id=>({id,text:id})),...(prompt ? {prompt}: {})});
  t.keys[id]={correctOption:answer};
}
function fr(t,id,page,points,prompt,answer,extra={}) {
  t.questions.push({id:String(id),label:String(id),page,points,type:'frq',prompt});
  t.keys[id]={criteria:[{id:'answer',points,answer,...extra}]};
}

const water=paper('bullso-2026-water-quality-c','Easy',
  'Mostly direct multiple-choice recall of aquatic ecology and water treatment, with short explanations and no multi-step calculations.',
  ['Freshwater ecology','Macroinvertebrates','Water treatment','Water monitoring'],'different',
  'Historical freshwater rotation. The 2027 Division C rules focus on marine and estuary environments; nutrient cycles, treatment and monitoring overlap, but this is not a complete current-topic practice paper.',
  '90 written points: questions 1–20 are 1.5 each and 21–40 are 3 each. The 10-point physical salinometer station is excluded. Published answers are retained; the key can contain debatable answers (for example Q6, Q20 and Q24).');
const waterPages=[2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,9,9,10];
const waterKey={1:'C',2:'B',3:'B',5:'B',6:'B',8:'B',10:'C',11:'A',12:'A',13:'D',15:'C',16:'B',17:'C',18:'B',19:'D',20:'A',21:'B',22:'C',24:'A',26:'D',27:'B',28:'A',30:'C',31:'B',32:'B',33:'B',35:'C',36:'B',38:'B',39:'C'};
const waterFR={
  4:['Explain two ways sedimentation can negatively impact freshwater ecosystems.','Any two distinct impacts: increases turbidity, smothers benthic organisms, increases temperature, transports pollutants/nutrients, reduces light penetration, clogs fish gills, or disrupts feeding/reproduction. Award half credit for one.'],
  7:['The process of converting wastewater into effluent safe for discharge is known as ______ treatment.','Wastewater or sewage.',{accepted:['wastewater','sewage']}],
  9:['Describe one difference between potable water treatment and wastewater treatment.','Potable treatment prepares drinking water/removes pathogens; wastewater treatment prepares safe discharge/reduces environmental pollutants.'],
  14:['Explain the difference between coagulation and flocculation.','Coagulation rapidly mixes chemicals such as alum to neutralize charges and start clumps; flocculation gently mixes so those clumps grow into settleable floc.'],
  23:['Match each organism to its pollution tolerance class: A Mayfly; B Dragonfly; C Mosquito larva; D Water penny.','A: Class 1; B: Class 2; C: Class 5 or 4; D: Class 1. Award 0.75 points per correct match.'],
  25:['Why are macroinvertebrates useful indicators of long-term water quality?','They show cumulative water-quality impacts over time because they are sessile.'],
  29:['State one feeding habit of caddisfly larvae.','Any one: filter feeding, shredding, scraping/grazing, or predation.',{accepted:['filter feeding','shredding','scraping','grazing','predation']}],
  34:['Explain how fecal coliform bacteria are used in water-quality assessment.','They indicate fecal contamination and the potential presence of pathogens.'],
  37:['Describe one relationship between turbidity and aquatic plant growth.','High turbidity blocks sunlight, reducing photosynthesis and plant growth.'],
  40:['Why is long-term water monitoring more informative than a single measurement?','It reveals trends, fluctuations and seasonal variation missed by a snapshot and reduces the influence of an abnormal measurement.']
};
for(let n=1;n<=40;n++) {
  const points=n<=20?1.5:3;
  if(waterKey[n]) mc(water,n,waterPages[n-1],points,waterKey[n]);
  else fr(water,n,waterPages[n-1],points,...waterFR[n]);
}

const protein=paper('nationals-2010-protein-modeling-c','Medium',
  'Ten foundational multiple-choice items followed by five explanations connecting protein structure, influenza entry and antiviral resistance.',
  ['Protein structure','Hemagglutinin','Influenza','Neuraminidase'],'different',
  'Includes hemagglutinin and influenza concepts relevant to 2027, but the historical neuraminidase/2HU4 modeling target differs from the 2027 target. Use the topic filter for this older rotation.',
  '30 written points: ten MCQs at 1 point and five written responses at 4 points. The physical pre-build and onsite model portions are excluded.');
[...'ABDD DCCBBD'.replaceAll(' ','')].forEach((a,i)=>mc(protein,`MC-${i+1}`,i<5?2:3,1,a));
const proteinFR=[
  ['Why do we need a flu shot every year even though our body develops immunity after illness or vaccination?','1 point each: influenza is an RNA virus with error-prone RNA polymerase; mutations occur frequently; circulating strains therefore change; the vaccine is updated to match the new strains.'],
  ['Identify the key neuraminidase mutation causing Tamiflu resistance and explain how it prevents the antiviral from working effectively.','1 point each: His274 is replaced by Tyr274; drug binding normally moves Glu276 toward His274; the bulkier Tyr pushes Glu276 back into the active site; this reduces drug binding space/affinity so the drug is displaced while substrate binding can continue.'],
  ['What triggers the conformational change of hemagglutinin after endocytosis, and why is it essential?','1 point each: lower endosomal pH; triggers conformational change; exposes the buried hydrophobic fusion peptide so it inserts into the membrane; enables membrane fusion and transfer of viral genetic material.'],
  ['Explain how antigenic shift and antigenic drift contribute to novel influenza strains.','0.5 point: shift abruptly creates new subtypes. 1 point: animal transmission or reassortment/mixing contributes to shift. 0.5 point: drift gradually changes HA/NA antigens. 0.5 point: point mutations cause drift. 0.5 point: mutations can alter the HA binding pocket without losing overall function. 1 point: altered antigens escape existing antibodies, allowing illness.'],
  ['Explain why influenza vaccines prevent spread while antiviral medications treat infections.','1 point each: vaccines induce antibodies; prime protective immunity before infection; antivirals block a viral protein needed for replication; therefore limit replication in an existing infection.']
];
proteinFR.forEach(([p,a],i)=>fr(protein,`SA-${i+1}`,i<3?4:5,4,p,a));

const dynamic=paper('nationals-2011-dynamic-planet-b','Medium',
  'The self-contained written portion combines hydrology recall, discharge calculations, diagram interpretation and evaluation of human impacts.',
  ['Freshwater','Hydrology','Groundwater','Lakes','Human impacts'],'current',
  'Freshwater, hydrology, groundwater, lakes and human impacts match the 2027 topic cycle. This conversion covers the self-contained written portion of the original national paper.',
  '43 of the original 88 points. Questions 1–13 require the unavailable Atlas of Landforms and are excluded. Drawing-only questions 17, 19 and 20 are excluded. Questions 21–23 can be answered from the original supplied elevation diagram.');
mc(dynamic,14,4,2,'D');mc(dynamic,15,4,2,'D','ABCDE');mc(dynamic,16,5,2,'B');
fr(dynamic,18,5,4,'A river is 7 m wide, 2 m deep, with mean velocity 45 cm/s. Calculate discharge in m³/s and show your work.','1 point: convert 45 cm/s to 0.45 m/s. 1 point: cross-sectional area 7 × 2 = 14 m². 1 point: Q = velocity × area. 1 point: Q = 6.3 m³/s.');
for (const [letter,value,tolerance] of [['A',1,1],['B',14.5,1.5],['C',40,1]]) fr(dynamic,`21${letter}`,6,1,`Using the original diagram, give the water table elevation at point ${letter}, in ft amsl.`,`${value-tolerance}–${value+tolerance} ft amsl.`,{numeric:{value,tolerance,units:['ft','feet','ft amsl'],unitRequired:false}});
mc(dynamic,22,6,2,'B');mc(dynamic,23,7,2,'C','ABCDEFGH');
fr(dynamic,24,7,6,'Using the original lake diagram, list inputs and outputs in its hydrologic cycle.','Inputs (3 points): precipitation, groundwater, runoff/overland flow. Outputs (3 points): evaporation, groundwater. Deduct 0.5 per incorrect answer from the appropriate group; do not reduce either group below zero.');
for(const [letter,answer] of [['A','summer'],['B','winter'],['C','fall'],['D','spring']]) fr(dynamic,`25${letter}`,8,1,`Name the season represented by temperature profile ${letter} in the original paper.`,answer,{accepted:answer==='fall'?['fall','autumn']:[answer]});
fr(dynamic,26,8,2,'Name one likely pollution source for this lake in a rural area.','Agricultural runoff (pesticides/fertilizers), acid rain or septic tank discharge.');mc(dynamic,27,8,2,'A','ABCDE');
const impacts=[
 ['dam near community A','Positive: recreation/water supply (potentially all, mostly A), navigation (all or A), electricity (all or A), or flood control (A). Negative: downstream erosion (mostly B, possibly farmers/C), reduced sediment to delta/beaches (C), or habitat/biodiversity loss (all).'],
 ['levees/support structures near community B','Positive: protects B from floods or prevents cutoff/loss of waterfront for B. Negative: increased downstream flooding (farmers/C) or harder navigation around the meander (all, especially A traveling to ocean).'],
 ['draining of wetlands between the farmers and community C','Positive: more farmland/food supply (all). Negative: habitat/biodiversity loss (all), increased flooding (C/farmers), decreased water quality (C), or decreased carbon storage (all).']
];
impacts.forEach(([p,a],i)=>fr(dynamic,28+i,10,4,`Read the communities scenario and diagram on paper page 9. Give one positive and one negative impact of the ${p}, identifying the affected communities for each.`,a+' Award 1 point per impact and 1 per corresponding community list. Deduct 0.5 for incomplete community lists.'));

const code=paper('bullso-2026-codebusters-c','Hard',
  'A long mixed-cipher paper including cryptarithms, keyword recovery, Spanish xenocrypt, Hill, Baconian, Nihilist and columnar ciphers under a 50-minute target.',
  ['Cryptanalysis','Substitution ciphers','Cryptarithms','Transposition ciphers'],'current',
  'Covers cipher-solving skills used in 2027. The historical cipher mix and scoring bonuses differ from the current competition rules.',
  'Published base points for the timed question and questions 1–22. Two letter errors are free except keyword answers (7, 21) and cryptarithms (8, 18), which allow none. Each additional error costs 100 points, down to zero. Timed and aggregate special-question bonuses are excluded.');
code.instructions+=' Type only the decoded message (or requested keyword). Spaces, punctuation, case and accents are ignored. Use an underscore for each unsolved letter to preserve its position. Retype visible digits in the decoded message.';
const codeAnswers=[
  ['Timed',3,292,"DRINKING WATER WITH A MINTY MOUTH IS THE COLD VERSION OF SPICY. BOTH MAKE ME UNCOMFORTABLE IN A WAY I RESPECT BUT CAN'T ENJOY."],
  [1,4,333,'THAT ONE KID IN ELEMENTARY SCHOOL THAT COULD INVERT HIS EYELIDS SCARED ME'],
  [2,5,226,'SCHOOL WITHOUT ACADEMIC STRESS IS LOWKEY BETTER THAN SUMMER'],
  [3,5,542,'COUSINS HAVING OTHER COUSINS IS TRUTHFULLY A TOP FIVE BETRAYAL IN THE ENTIRE HISTORY OF HUMANKIND AND MODERN CIVILIZATION'],
  [4,6,197,'WEARING A HOODIE WITH NO SHIRT IS WEIRD'],
  [5,6,239,'1111 MULTIPLIED BY 1111 BEING 1234321 IS THE MATHEMATICAL EQUIVALENT OF WHITE LIGHT DISPERSING THROUGH A PRISM TO MAKE A RAINBOW'],
  [6,7,186,'MUFFINS ARE BALD CUPCAKES'],
  [7,7,369,'BLASPHEMY'],[8,8,192,'BALD BOY'],
  [9,9,201,"ONE TO FIVE FEELS LIKE FIVE NUMBERS, BUT SIX TO TEN FEELS LIKE FOUR NUMBERS. I DON'T KNOW WHY, BUT IT'S DEFINITELY TRUE."],
  [10,9,88,'ROOT BEER IS THE MOST OVERRATED SODA OF ALL TIME ITS TRUE'],
  [11,10,578,'LA UNICA PERSONA QUE NECESITAS EN TU VIDA, ES AQUELLA QUE DEMUESTRA QUE TE NECESITA EN LA SUYA.'],
  [12,11,226,'PURPLE GLUE STICKS ARE BETTER THAN WHITE ONES'],
  [13,12,292,'HEARING A GOOD SONG ON THE RADIO IS LIKE SEEING A WILD ANIMAL IN ITS NATURAL HABITAT, BUT HEARING IT IN A PLAYLIST IS LIKE SEEING IT IN A ZOO.'],
  [14,12,332,'RED AND GREEN MAY BE OPPOSITE ON THE WHEEL, BUT RED AND BLUE ARE THE REAL ENEMIES'],
  [15,13,313,"BIRDS DON'T GET ENOUGH CREDIT FOR HOW HARD IT IS TO BUILD A NEST"],
  [16,14,246,'THE ONLY BAD PART ABOUT FALLING IS GETTING HURT OTHERWISE ITS REALLY FUN'],
  [17,15,495,'MONDAY IS HOLDING SUNDAY BACK FROM HER TRUE POTENTIAL'],
  [18,15,253,'SOLAR SHIRT'],
  [19,16,254,'TRUTHFULLY, STEALING CANDY FROM A BABY IS DEFINITELY NOT AS EASY AS IT SOUNDS. TRUST ME. I SPEAK FROM EXPERIENCE.'],
  [20,16,345,'POPCORN SMELLS SIGNIFICANTLY BETTER THAN HOW IT TASTES ESPECIALLY AT THE MOVIES'],
  [21,17,478,'DOMINATES'],
  [22,17,278,'BEING PICKED LAST IN GYM CLASS IS ONE OF THE MOST EMBARRASSING THINGS A LIVING ORGANISM CAN ENDURE.']
];
for(const [id,page,points,solution] of codeAnswers) fr(code,id,page,points,
  [7,21].includes(id)?'Enter the requested keyword only.': 'Decode the cipher in the original paper. Enter the decoded message only.',
  solution,{accepted:[solution],cipher:{solution,freeErrors:[7,8,18,21].includes(id)?0:2,penaltyPerError:100}});

const rocks=paper('bullso-2026-rocks-and-minerals-c','Medium',
  'Image identification, rock-cycle reasoning and relative dating, followed by descriptive rock identification; explanations require applying geologic processes.',
  ['Rocks','Minerals','Rock cycle','Sedimentary structures','Relative dating'],'current',
  'Rock and mineral identification and geologic-process questions overlap the 2027 rules. This written selection includes the supplied images and diagrams for stations 12–16.',
  '114 points from stations 12–16, including the 20-point identification tiebreaker. Specimen-based stations 1–11 and team-number bonuses are excluded. Station 14.1 has a reversed sequence in the published key; either orientation earns credit when consistently labeled.');
const rockRows=[
  [12,1,4,'Identify bed forms A–D in the original photos.','A ripple marks; B mud cracks; C cross bedding; D graded bedding. 1 point each.'],
  [12,2,4,'Identify the depositional energy regime for each structure A–D.','A low to moderate; B very low; C moderate to high; D high to decreasing. 1 point each.'],
  [12,3,3,'Which structure indicates periodic exposure to air? Explain.','B (mud cracks): wet sediment dries and shrinks after exposure to air.'],
  [12,4,3,'Which structure best indicates paleocurrent direction? Why?','C (cross bedding): inclined layers dip in the sediment-transport direction.'],
  [12,5,4,'Explain how graded bedding helps determine stratigraphic top and bottom.','Published rubric: accept any reasonable explanation. A valid explanation relates normal grading (coarser base, finer top as flow wanes) to determining younging direction; overturned beds reverse this orientation.'],
  [12,6,2,'Rank structures A–D by preservation potential, lowest to highest.','B < A < C < D.',{accepted:['B A C D','B < A < C < D','B, A, C, D']}],
  [13,1,7,'Label the lettered rock-cycle diagram in the original paper.','Published key: A cooling; B melting; C weathering & lithification; D igneous rock; E magma; F melting; G heat & pressure; H weathering & lithification; I sediment; J compaction & cementation; K heat & pressure; L metamorphic rock; M sedimentary rock. For C/H accept the scientifically correct weathering/erosion (these arrows lead to loose sediment). The source assigns 7 points to the complete diagram without per-blank weights; award proportional partial credit.'],
  [13,2,3,'Which part of the rock cycle is most strongly influenced by climate? Explain.','Weathering and erosion: temperature, precipitation and biological activity control weathering rates and sediment transport. Other defensible processes may receive partial credit.'],
  [13,3,4,'Why is the rock cycle dynamic rather than a closed loop?','Any two: no fixed sequence, multiple pathways, steps skipped/repeated, driven by internal Earth and external solar energy.'],
  [13,4,4,'Predict how the rock cycle would differ without plate tectonics.','Any two: little/no subduction; reduced metamorphism/magma production; fewer volcanoes/mountain belts; dominance of surface weathering, erosion and deposition.'],
  [13,'5a',3,'A shale undergoes burial, heating and partial melting. Identify rock types it may become at each stage.','Burial: slate. Heating: schist or gneiss. Partial melting: magma, granite or rhyolite. 1 point per stage.'],
  [13,'5b',3,'For the shale sequence in 5a, identify the dominant process at each stage.','Burial: low-grade metamorphism. Heating: regional metamorphism. Partial melting: melting and crystallization. 1 point per stage.'],
  [14,1,13,'List the lettered layers/events in the original diagram from youngest to oldest. Clearly label your order.','The published key prints M, R, A, E, Y, P, G, Fa, S, B, W, Fb, T, which runs oldest to youngest in its interpretation. Accept its reverse T, Fb, W, B, S, Fa, G, P, Y, E, A, R, M for the requested youngest-to-oldest order; do not penalize a clearly labeled consistent orientation. The key assigns 13 points without further partial-credit detail.'],
  [14,2,2,'What break is below S?','Angular unconformity.',{accepted:['angular unconformity','an angular unconformity']}],
  [14,3,2,'Beds B and W display which principle?','Superposition.',{accepted:['superposition','law of superposition','principle of superposition']}],
  [14,4,2,'What principle gives the relative age of G versus E?','Cross-cutting relationships.',{accepted:['cross-cutting relationships','cross cutting relationships','principle of cross cutting relationship']}],
  [14,5,3,'How could faunal succession refine relative ages if fossils were found in two layers?','Fossils occur in a predictable order, so comparing fossil types shows which layer is older or younger.'],
  [14,6,3,'Explain one limitation of relative dating and how absolute dating addresses it.','Relative dating gives age order; absolute dating gives numerical ages using radiometric methods.'],
  [15,1,3,'Identify the silica-rich, viscous igneous rock described in question 1 of the original paper.','Rhyolite.',{accepted:['rhyolite']}],
  [15,2,2,'Where does this rock form, and why are eruptions explosive?','Continental volcanic arcs or hotspots; high silica increases viscosity and traps gas.'],
  [15,3,3,'Identify the low-grade metamorphic rock with a silky sheen, transitional between slate and schist.','Phyllite.',{accepted:['phyllite']}],
  [15,4,2,'What process causes the mineral alignment producing foliation in this rock?','Directed pressure during regional metamorphism aligns minerals.'],
  [15,5,3,'Identify the calcite-cemented shell-fragment rock described in question 5.','Fossiliferous limestone.',{accepted:['fossiliferous limestone']}],
  [15,6,2,'What biological process primarily forms this rock?','Accumulation and lithification of shell material from marine organisms.'],
  [15,7,3,'Identify the mantle-derived ultramafic olivine/pyroxene rock that may alter to serpentinite.','Peridotite.',{accepted:['peridotite']}],
  [15,8,2,'What plate-tectonic process brings this rock to the surface?','Obduction of mantle material or emplacement in ophiolite complexes.'],
  [15,9,3,'Identify the clastic rock described in question 9 of the original paper.','Greywacke.',{accepted:['greywacke','graywacke']}],
  [15,10,2,'Why is this rock useful in reconstructing ancient submarine slopes?','Preserves graded bedding from turbidity currents, indicating submarine-slope processes and flow direction.']
];
for(const [station,n,points,prompt,answer,extra] of rockRows) fr(rocks,`S${station}-${n}`,station,points,prompt,answer,extra);
['Beryl','Azurite','Augite','Amethyst','Chalcopyrite','Selenite','Celestite','Topaz','Sodalite','Citrine','Hornblende','Fluorite','Slate','Coquina','Scoria','Dolostone','Pegmatite','Peridotite','Lignite','Arkose'].forEach((answer,i)=>fr(rocks,`S16-${i+1}`,16,1,`Identify image ${i+1} at station 16. Count left to right, then top to bottom.`,answer,{accepted:answer==='Celestite'?['celestite','celestine']:answer==='Dolostone'?['dolostone','dolomite']:[answer]}));

for(const t of drafts) {
  t.questionCount=t.questions.length;t.maxScore=t.questions.reduce((s,q)=>s+q.points,0);
  validatePracticeCatalog([t]);
  await writeFile(`output/practice-research/converted/${t.id}.json`,JSON.stringify(t,null,2));
  console.log(`${t.id}: ${t.questionCount} questions, ${t.maxScore} points`);
}
