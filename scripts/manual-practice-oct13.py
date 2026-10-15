"""Reviewed October 13 conversions. Offline only; no model API calls."""
import json,re,sys,runpy
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
H=runpy.run_path('scripts/offline-practice-conversion.py')
clean,numbered,options,pages=[H[x] for x in ['clean','numbered','options','pages']]
ROOT=Path('output/practice-research/division-c')
SOURCES={s['sourceId']:s for s in json.loads((ROOT/'authenticated-manifest.json').read_text(encoding='utf-8'))}
DRAFTS=Path('output/practice-research/converted')
reviewed=[]
# Reuse the established paper writer without executing any prior conversion blocks.
prior=Path('scripts/manual-division-c-archive.py').read_text(encoding='utf-8')
exec(prior[prior.index('class Paper:'):prior.index("if '6p22EE45syM'")])

def paper(id,**meta):
 # A score-distribution PNG was misclassified as context in the download manifest.
 # Only student PDF attachments belong in the embedded supplement viewer.
 context=SOURCES[id].get('contextPath')
 if context and not Path(context).read_bytes().startswith(b'%PDF-'):
  SOURCES[id].pop('contextPath')
 p=Paper(id,reviewedOn='2026-10-13',**meta)
 return p

def blocks(text,pattern=r'(?m)^[ \t]*(\d{1,3})[.)][ \t]*'):
 hits=list(re.finditer(pattern,text)); result={}
 for i,m in enumerate(hits):
  id=m[1]
  assert id not in result,(id,'duplicate')
  result[id]={'text':clean(text[m.end():hits[i+1].start() if i+1<len(hits) else len(text)]),'page':text[:m.start()].count('\f')+1}
 return result

def original(p):return '\n\f\n'.join(p.pp)
def keypages(p):return pages(p.source['keyPath'])
def bank(items):return [{'id':chr(65+i),'text':t} for i,t in enumerate(items)]
def criterion(answer,points,**kwargs):return dict(id='answer',answer=answer,points=points,accepted=[],**kwargs)
def finish_all():
 manifest=Path('documents/practice-import-sources.json');existing=json.loads(manifest.read_text(encoding='utf-8'))
 for s in reviewed:
  existing=[x for x in existing if x['id']!=s['id']];existing.append(s)
 manifest.write_text(json.dumps(existing,indent=2)+'\n',encoding='utf-8')
 Path('output/practice-research/batch-oct13/import-ids.json').write_text(json.dumps([s['id'] for s in reviewed],indent=2),encoding='utf-8')

# CODEBUSTERS: source ciphertext and published plaintext; timed base score only.
for sid,name in [('51MtaevLop0','Syosset High School'),('yYjK7oyAQZI','West Windsor-Plainsboro North'),('nt3v7oJ3rjc','Montgomery High School')]:
 p=paper(sid,competition='Captain’s Summer Exchange — '+name,year=2025,difficulty='Hard',difficultyReason='Thirty-four puzzles span substitution, foreign-language, fractionated Morse, Hill, Baconian and cryptarithm techniques.',topics=['Substitution ciphers','Xenocrypts','Hill ciphers','Baconian','Cryptarithms','Morse ciphers'],topicMatch='unverified',alignment='Historical cipher practice; the complete puzzle mix and timed format have not been certified against the 2027 roster.',scoringBasis='Published base puzzle weights are retained, including the separately labeled timed puzzle. Current-rule practice scoring allows two errors for ordinary plaintext before 100-point deductions; keywords and cryptarithms allow zero errors before 100-point deductions. The timed base is all-or-nothing with two errors allowed, as printed. Proctor-dependent timed and aggregate special bonuses are excluded. Cover year 2025 overrides archive season 2026. Keyword puzzles grade only the requested keyword, and cryptarithms grade the requested decoded letters, not the worked arithmetic.')
 qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==33
 kt='\n'.join(keypages(p));sol=clean(re.search(r'Timed Question:\s*(.*?)(?=\n1\.)',kt,re.S)[1])
 tt=original(p);hit=re.search(r'Timed Question[^\n]*\(?(\d+) points\)?',tt)
 # The actual timed puzzle is headed T or Timed Question on its own page.
 timed_candidates=[(i,t) for i,t in enumerate(p.pp) if re.search(r'Timed Question',t) and re.search(r'Aristocrat',t)]
 assert timed_candidates,(sid,'timed page')
 pg,txt=timed_candidates[0];wm=re.search(r'[\[(](\d+) points[\])]',txt,re.I);assert wm,(sid,txt)
 p.frq('T','Timed puzzle: solve the ciphertext on this page of the original paper.',sol,int(wm[1]),pg+1,criteria=[criterion(sol,int(wm[1]),cipher=dict(solution=sol,freeErrors=2,penaltyPerError=250))])
 for n,b in qs.items():
  pm=re.match(r'\((\d+) points\)',b['text']);assert pm,(sid,n,b['text'][:100]);weight=int(pm[1]);answer=ks[n]['text'].split('Page 2')[0].strip();prompt=b['text']
  if sid=='51MtaevLop0' and n in [22,26]:answer={22:'HONEY PLAT',26:'ODNLEA'}[n]
  elif re.search('cryptarithm',prompt,re.I):answer=answer.split(':')[0].strip()
  elif re.search(r'(?:what is|find|determine).*keyword',prompt,re.I|re.S):answer=answer.split(':')[0].strip()
  if sid=='yYjK7oyAQZI' and n==1:answer='Desearia poder escribir todo este examen sin Internet, pero no se espanol, asi que necesite Google Translate para ayudarme.'
  if sid=='nt3v7oJ3rjc' and n==11:answer='Como no tenia nada que hacer me fui a los lavabos con el y, para matar el tiempo, me puse a darle conversacion mientras se afeitaba.'
  if sid=='nt3v7oJ3rjc' and n==6:prompt+=' Use the boxed Answer digits 7489512 04871; the introductory digits contain a transposition.'
  p.frq(str(n),prompt,answer,weight,b['page'],criteria=[criterion(answer,weight,cipher=dict(solution=answer,freeErrors=0 if re.search('cryptarithm|what is.*keyword',prompt,re.I|re.S) else 2,penaltyPerError=100))])
 p.finish()

# MICHIGAN THERMODYNAMICS: all 18 written problems, original 70 points.
p=paper('uk5mc-XTiQw',difficulty='Hard',difficultyReason='Multi-step enthalpy, phase change, engine efficiency, and thermal resistance calculations require methods and units.',topics=['Thermodynamics','Heat transfer','Ideal gases','Heat engines'],topicMatch='current',alignment='Heat, thermodynamic laws, ideal gases and thermal transfer overlap the 2027 written topics. The historical paper does not reproduce the current device task.',scoringBasis='All 18 published problems, totaling 70 points. Text descriptions of diagram labels are accepted. Q5 accepts reversible for no entropy generation; Q11 distinguishes total heat capacity from specific and molar heat capacities. William Thomson spelling is corrected. Calculation questions preserve method credit and accept consistent work sign conventions.')
qs=numbered(p.pp);ks=numbered(keypages(p));weights=[1,4,3,2,2,2,4,4,4,2,3,3,3,6,8,4,8,7]
fix={5:'No entropy generation means a reversible process. Isentropic is acceptable if adiabatic is also assumed. Rudolf Clausius introduced entropy. One point each.',6:'0 K (1); William Thomson, Lord Kelvin (1).',7:'Describe the positions in the supplied pressure-temperature diagram: solid at upper left, liquid between fusion and vaporization curves, gas below sublimation/vaporization curves, supercritical fluid beyond the critical point, the critical point at the vaporization endpoint, and triple point where the three coexistence curves meet. Six diagram labels at 0.5 each plus 1 for identifying three-phase coexistence at the triple point.',11:'Both characterize heat needed per temperature increase (1). Heat capacity C=Q/dT applies to the whole object, in J/K (1). Specific heat c=C/m is per unit mass, e.g. J/(kg K) (1). Molar heat capacity is separately C/n; the original key incorrectly describes total heat capacity as necessarily molar.'}
for n,q in qs.items():
 answer=fix.get(n,ks[n]['text']);p.frq(str(n),q['text']+(' Describe each label and its location in words.' if n==7 else ''),answer,weights[n-1],q['page'],accepted=['Sadi Carnot','Nicolas Leonard Sadi Carnot'] if n==1 else [])
p.finish()

# Remaining papers are appended below; finish_all is safe to rerun offline.
# ANATOMY: explicit historical-system filters, with diagrams retained in each PDF.
p=paper('nY-DzsKLY80',year=2016,difficulty='Medium',difficultyReason='One hundred recall and interpretation questions cover neural signaling, sensory structures and endocrine feedback.',topics=['Nervous system','Special senses','Endocrine system'],topicMatch='different',alignment='Historical nervous, sensory and endocrine rotation; not the digestive, respiratory and immune systems of 2027.',scoringBasis='One practice point per question because the paper and key do not specify weights. Cover says Islip Invitational 2016; archive lists 2017. Q93 accepts theta or delta because sleep stage is unspecified. Original diagrams and shared option banks remain in the paper.')
sys.path.insert(0,'output/practice-research/python-packages');import pymupdf
pp=[]
for pg in pymupdf.open(p.source['paperPath']):
 w=pg.rect.width;hh=pg.rect.height
 pp.append(pg.get_text(clip=pymupdf.Rect(0,32,w/2,hh),sort=True)+'\n'+pg.get_text(clip=pymupdf.Rect(w/2,32,w,hh),sort=True))
qs=numbered(pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==100
shared=set(range(30,34))|set(range(51,56))|set(range(63,67))|set(range(73,81))
for n,q in qs.items():
 answer=re.match(r'[A-E]',ks[n]['text'])[0]
 if n in shared: count=5
 else:
  first=re.split(r'Base your answers|Base your answer',q['text'])[0]
  letters=re.findall(r'(?:^|\s)([A-E])\)',first);count=max([ord(x)-64 for x in letters],default=5)
  if count<2:count=5
 p.mcq(str(n),f'Answer question {n} in the original paper. Use its diagram or shared answer bank where indicated.',bank(list('ABCDE'[:count])),answer,page=q['page'],accepted=['C','D'] if n==93 else None)
p.finish()

p=paper('z1tQAMHU3cw',year=2017,difficulty='Hard',difficultyReason='Neurophysiology, clinical scenarios, sensory diagrams and hormone pathways combine recall and multi-step explanations.',topics=['Nervous system','Special senses','Endocrine system'],topicMatch='different',alignment='Historical nervous, sensory and endocrine rotation, distinct from the 2027 anatomy systems.',scoringBasis='Published question and subpart weights are retained. Questions 18 and 33 are unscored because their answer choices/key are inconsistent. Question 42 is corrected to B only: endocrine glands secrete into blood/interstitial fluid, not body cavities. Q61 corrects glucagon to glycogen. Q41 accepts different documented genetic forms of night blindness. Diagram labels may be described in text.')
qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==63
frweights={19:4,20:5,21:3,22:2,23:2,24:3,32:5,37:4,39:6,40:5,41:4,59:3,60:5,61:6,62:4,63:4}
for n,q in qs.items():
 if n in frweights:
  answer=ks[n]['text'].replace('glucose to glucagon','glucose to glycogen')
  if n==41:answer='a. Nyctalopia/night blindness (1). b. Acquired vitamin A deficiency associated with malnutrition (2). c. X-linked is the published example; autosomal dominant or recessive congenital forms also exist and are acceptable with a named/clear example (1).'
  p.frq(str(n),q['text'],answer,frweights[n],q['page'])
 else:
  parsed=options(q['text']);assert parsed,(n,q['text']);a=re.search(r'([A-G](?:/[A-G])*)',ks[n]['text'])[1].split('/');a=['B'] if n==42 else a
  p.mcq(str(n),parsed[0],parsed[1],a if len(a)>1 else a[0],points=0 if n in [18,33] else 1.5 if n==9 else 1,page=q['page'],option_points={x:.5 for x in a} if n==9 else None)
p.finish()

p=paper('ajzMepy-1V8',competition='Scioly Summer Study Session — Cherrie_Lan',year=2017,difficulty='Medium',difficultyReason='Mixes digestive, respiratory and immune recall with explanations, matching and anatomical diagram identification.',topics=['Digestive system','Respiratory system','Immune system'],topicMatch='current',alignment='The three systems match the 2027 topic rotation, while historical wording and examples are retained.',scoringBasis='All five sections and all 26 diagram labels are converted. Itemized weights total 117.5 before excluding MC12 (all options are colon functions) and SA4 (bronchus/bronchi are singular/plural, not a hierarchy), leaving 114.5. MC4 is corrected to nitrogen; CO2 transport, compliance, bile and immunity explanations are corrected. Mucin is a glycoprotein, not a hormone. Cover 2017 overrides archive 2018.')
tt=original(p);section2=re.search(r'Section\s+2\s+-\s+Short\s+Answer:',tt);section3=re.search(r'Section\s+3\s+-\s+Matching\s+Section:',tt);section4=re.search(r'Section\s+4\s+-\s+True/False:',tt);section5=re.search(r'Section\s+5\s+-\s+Labelling:',tt)
mc=numbered(tt[:section2.start()].split('\f'));sa=numbered(tt[section2.start():section3.start()].split('\f'));tf=numbered(tt[section4.start():section5.start()].split('\f'))
assert (len(mc),len(sa),len(tf))==(20,20,10)
answers='C B B D A D A A D C D B A B C B C B A B'.split()
for n,q in mc.items():
 parsed=options(q['text']);assert parsed,(n,q['text']);p.mcq(f'MC-{n}',parsed[0],parsed[1],answers[n-1],0 if n==12 else 1,q['page'])
sa_answers=[
'At constant temperature and fixed amount of gas, pressure is inversely proportional to volume; PV is constant.',
'Inspiratory capacity = tidal volume + inspiratory reserve volume; IC = TV + IRV.',
'Most CO2 is transported as bicarbonate ions, about 70%; about 20–23% binds to proteins as carbamino compounds and about 7–10% is dissolved. Accept reasonable textbook ranges. The source’s 90% carbonic acid is incorrect.',
'Unscored: alveoli are distal to bronchioles, then bronchi. Bronchus is the singular of bronchi, so the requested distinct hierarchy is not defined.',
'The posterior opening allows the esophagus to expand during swallowing; the trachealis can also adjust airway diameter.',
'Red pulp contains red blood cells, macrophages and lymphocytes; white pulp is predominantly lymphoid tissue/lymphocytes. One point each.',
'Tonsils, adenoids and Peyer’s patches. One point each; accept clear lymphoid-nodule equivalents.',
'Surfactant lowers surface tension at the alveolar air-liquid interface and helps prevent collapse.',
'Compliance measures distensibility, the volume change per pressure change (delta V / delta P). It is not simply elastic recoil; greater compliance means easier expansion.',
'Cytotoxic T cells recognize infected or abnormal cells via antigen presentation and kill them, for example using perforin/granzymes or death signaling.',
'2: Esophagus; transports swallowed food by peristalsis. One point name, one function.',
'4: Small intestine; most enzymatic digestion and nutrient absorption. One point each.',
'8: Pancreas; digestive enzymes/bicarbonate and endocrine blood-glucose regulation. One point identification, one valid function.',
'1: Mouth; mastication/bolus formation and beginning starch digestion. One point each.',
'10: Liver; processes portal blood, detoxifies/metabolizes substances, and produces bile that emulsifies fats. Bile does not enzymatically digest fat. One point identification, one valid function.',
'Redness, heat, swelling and pain, 0.5 point each.',
'Viruses, bacteria, fungi, protozoa and parasitic worms/helminths; 0.5 point each.',
'Active: one’s own immune response following antigen exposure, e.g. infection or vaccination. Passive: transferred antibodies, e.g. maternal antibodies or immune globulin; immediate but temporary. One point per correct distinction/example. Vaccines normally induce active immunity.',
'A and B antigens on red blood cells.',
'Thymosin.'
]
for n,q in sa.items():p.frq(f'SA-{n}',q['text'],sa_answers[n-1],0 if n==4 else 3 if n==7 else 2.5 if n==17 else 2,q['page']+tt[:section2.start()].count('\f'),accepted=['Thymosin'] if n==20 else [])
for i,a in enumerate('C E A B D'.split(),1):p.mcq(f'Match-Ig-{i}',f'Antibody matching item {i}: use the A–E descriptions on page 8.',bank(list('ABCDE')),a,page=8)
for i,a in enumerate('F P A H J E L O D K Q C N S G'.split(),1):p.mcq(f'Match-Disease-{i}',f'Disease matching item {i}: use the A–S descriptions on pages 8–9.',bank(list('ABCDEFGHIJKLMNOPQRS')),a,page=8 if i<=8 else 9)
for n,q in tf.items():p.mcq(f'TF-{n}',q['text'],[{'id':'T','text':'True'},{'id':'F','text':'False'}],'FFTTFTFTFF'[n-1],page=10)
labels=[('Stomach',10,['Surface epithelium','Lamina propria','Muscularis mucosae','Oblique layer','Circular layer','Longitudinal layer','Parietal cell','Gastric pit','Gastric gland','Chief cell','Enteroendocrine cell']),('Larynx',11,['Hyoid bone','Thyroid cartilage','Cricoid cartilage','Epiglottis','Laryngeal prominence','Tracheal cartilages']),('Lung',11,['Respiratory bronchiole','Alveolar duct','Alveoli']),('Lymph',12,['Tonsils and adenoids','Thymus','Appendix','Bone marrow','Spleen','Peyer’s patches'])]
for name,pg,aa in labels:
 for i,a in enumerate(aa,1):p.frq(f'{name}-{i}',f'{name} diagram: identify label {i}.',a,1,pg,accepted=[a,'Adam’s apple'] if a=='Laryngeal prominence' else [a])
p.finish()

# ROCKS AND MINERALS: all photographed specimens are included, no physical kit required.
p=paper('MSR9Ze54iKU',competition='Captain’s Summer Exchange — Tesla STEM High School',year=2025,difficulty='Hard',difficultyReason='Sixteen pages of mineral identification, chemistry, petrogenesis and geological applications include 160 numbered responses.',topics=['Mineral identification','Rock identification','Igneous processes','Metamorphism','Mineral properties'],topicMatch='current',alignment='General rocks/minerals and process practice overlaps 2027; archived specimen selection is retained.',scoringBasis='All 160 questions are represented. Printed item weights total 167. Source-dependent or ambiguous questions 27, 60, 70, 95, 96, 123 and 124 are unscored, leaving 160. Chemical formulas lost in extraction are restored from the key images. Q95 discusses diffraction/play of color, not inability to refract light. Short, unambiguous names receive free exact-answer checks; explanations use Auto Grade.')
qs=numbered(p.pp);ks=numbered(keypages(p));zero={27,60,70,95,96,123,124}
fix={32:'TiO2',49:'Fluorite',52:'Pb5(VO4)3Cl',82:'Mg3Si4O10(OH)2',92:'SiO2 · nH2O',102:'ZrSiO4',95:'Unscored wording: precious opal shows play of color when ordered silica-sphere arrays diffract/interfere with visible light. Disordered common opal lacks this play of color; both still refract light.',96:'Unscored: opal and steel nails have variable overlapping hardness, so this is not an unconditional yes/no.',123:'Unscored: grain rounding/sorting alone does not uniquely identify depositional environment. The key suggests fluvial.',124:'Unscored: identical wording to Q123 but a different key answer (deepwater marine); not uniquely determined.'}
for n in range(1,141):
 q=qs[n];qt=re.split(r'\f|\bStation\s+\d+',q['text'])[0].strip();kt=re.split(r'\f|\bStation\s+\d+',ks[n]['text'])[0].strip()
 norm=lambda x:re.sub(r'\s+',' ',x).strip()
 assert norm(kt).startswith(norm(qt)),(n,qt,kt)
 answer=fix.get(n,norm(kt)[len(norm(qt)):].strip());assert answer,n
 pm=re.search(r'\((\d+(?:\.\d+)?) points\)',qt);weight=float(pm[1]) if pm else 1
 if n in zero:weight=0
 if n==4:p.mcq(str(n),qt,[{'id':'T','text':'True'},{'id':'F','text':'False'}],'F',weight,q['page'])
 else:p.frq(str(n),qt,answer,weight,q['page'],accepted=[answer] if len(answer)<50 and not re.search(r'\(|\bor\b|\band\b|[;/]',answer) and n not in zero else [])
for n,a in enumerate(['Malachite','Citrine','Alabaster','Scoria','Phyllite','Tremolite','Chalcedony','Arkose','Hornblende','Willemite','Hematite','Spodumene','Epidote','Sodalite','Barite','Beryl','Albite','Fluorite','Rose quartz','Coquina'],141):p.frq(str(n),f'Identify specimen {n} in Station 15.',a,1,16 if n<=152 else 17,accepted=[a])
p.finish()

p=paper('pgZ8OGkXHr0',competition='Captain’s Summer Exchange — Clark High School',year=2025,difficulty='Medium',difficultyReason='Photographed identification and geological diagrams mix mineral recall, multi-select items, and explanations of rock formation.',topics=['Mineral identification','Rock identification','Rock cycle','Igneous processes','Metamorphism'],topicMatch='current',alignment='Mineral properties, photographed rock identification and geologic processes overlap the 2027 topics. Year 2025 comes from the source filenames; the undated paper is indexed under 2026.',scoringBasis='All ten sections are retained with the test’s item weights rather than inconsistent key weights. Section 6 item 2 is split into true/false and explanation. Unreliable source questions 4-6, 6-3, 7-2, 7-4 and 7-5 are unscored. Section 10-2 is corrected to granite. Diagram labels may be entered as ordered text lists; full images remain in the original PDF.')
AA={
1:[('Hematite',2),('a False; b True; c True; d True. 0.5 each.',2),('Fe2O3',2),('a Bauxite; b Azurite; c Aragonite; d Augite; e Aragonite; f Apatite; g Albite; h Barite; i Barite. One point each.',9)],
2:[('Mafic composition, rapid cooling near the surface, gas bubbles trapped as vesicles. One point each.',3),('B',2),('Farther/deeper; closer/shallower. One point each.',2),('Granodiorite',2),('Iron',2),(['A','D','F'],3)],
3:[('Laccolith: lens/dome-shaped intrusion between layers that uplifts overburden. Batholith: large irregular intrusive body with exposed area above 100 square km. Two points shape and two size comparison.',4),('Rock-cycle positions: top metamorphic rock; right magma; bottom-right igneous rock; bottom-left sediment; left sedimentary rock. One point each.',5),('Less',2),('Joints are fractures/discontinuities without significant shear displacement. Cooling/contraction can generate systematic joints, but they are not restricted to igneous rocks. Credit accurate definition and formation explanation.',4),('Top-left coarse-grained/granite; top-middle porphyritic/granite; right vesicular/pumice; bottom-left fine-grained/rhyolite; bottom-middle glassy/obsidian. One per textural label.',5)],
4:[('a–f: all calcite. One point per image.',6),('Effervescence/bubbles as carbonate reacts with acid to release CO2.',3),('White streak; perfect rhombohedral cleavage in three directions; Mohs 3; specific gravity about 2.7. One each.',4),('CaCO3',2),(['A','D'],2),('Unscored: blue calcite coloration cannot be uniquely attributed to copper from this photograph; impurities and defects can contribute.',0)],
5:[('Olivine',2),('Carbon dioxide / CO2',3),('Peridot',3),('Granite A; shale C; sandstone B, C and E. 1.5 each identification group.',4.5),('1 Laccolith; 2 Dike; 3 Batholith; 4 Dike; 5 Sill; 6 Volcanic neck; 7 Lopolith. One each.',7)],
6:[('Diamond; native element family. One each.',2),('F',1),('Diamonds are generally too old for carbon-14 dating. Long-lived radiogenic isotope systems in suitable inclusions can constrain formation age; explain dating inclusions rather than treating diamond carbon as C14-datable.',3),('Unscored: key A,D,E combines variable trace inclusions with general properties; no unique complete set follows from the specimen image.',0),('Carbon under high pressure and temperature in the mantle, often about 140–190 km deep; kimberlite/lamproite can transport diamonds to the crust.',3),('Carat weight, cut, color, clarity; Gemological Institute of America/GIA. One each.',5),('a Triple point; b Critical point. One each.',2)],
7:[('A',1),('Unscored: the key repeats syenite for different photos and assigns a universal white streak to heterogeneous rocks. Key identities: obsidian, scoria, syenite, pegmatite, syenite, tuff; not used as a grading standard.',0),('Minerals are naturally occurring inorganic solids with defined composition and ordered crystal structure. Rocks are aggregates of minerals/mineraloids and can include organic material. One point each distinction.',2),('Unscored: environment matching depends on inconsistent specimen identities in question 2.',0),('Unscored: the proposed strict grain-size ordering is not reliable from these photographs and is inconsistent with the specimen key.',0)],
8:[('D',2),('B',1),('Same chemical composition, different crystal structures; differing pressure/temperature conditions can favor different structures. One each.',2),('1 Contact metamorphism; 2 Volcanic arc; 3 Collisional mountain belt; 4 Stable continent; 5 Accretionary prism. One each.',5),('A',2),('Increasing grade generally means higher temperature/pressure and more recrystallization or mineral changes. Low grade example slate; high grade example gneiss (or well-qualified schist). Describe each and give examples.',4)],
9:[(['A','B','C','D'],3),('Native; Element; elements. One point each blank.',3),('Silicon and oxygen are abundant in the crust, and linked silica tetrahedra allow many structural arrangements and substitutions. Two points.',2),('Selenite / crystalline gypsum',2),('Vitreous/pearly luster; density about 2.317 g/cm^3; transparent/translucent; CaSO4·2H2O. One each.',4),('a Discontinuous; b Continuous. One each.',2)],
10:[('a Ultramafic; b Mafic; c Intermediate; d Felsic. One each.',4),('D',2),('D',2),('a Coquina, sedimentary rock; b Silver, native element; c Calcite, carbonate; d Talc, silicate. One point each name/category.',8),('Specimen c / calcite. Birefringence gives two refracted rays with different refractive indices and produces a doubled image. One identification and two explanation points.',3)]}
mc={ (2,2):4,(2,6):6,(4,5):5,(7,1):4,(8,1):4,(8,2):5,(8,5):4,(9,1):4,(10,2):4,(10,3):4 }
for sec,items in AA.items():
 for n,(a,w) in enumerate(items,1):
  label=str(n) if sec!=6 or n==1 else '2a' if n==2 else '2b' if n==3 else str(n-1)
  id=f'{sec}-{label}';prompt=f'Section {sec}, question {label}: answer every requested part using the original page and diagrams.'
  if (sec,n) in mc:p.mcq(id,prompt,bank(list('ABCDEF'[:mc[(sec,n)]])),a,w,sec)
  elif sec==6 and n==2:p.mcq(id,prompt,[{'id':'T','text':'True'},{'id':'F','text':'False'}],a,w,sec)
  else:p.frq(id,prompt,a,w,sec,accepted=[a] if len(a)<35 and not re.search(r'[;/]|\b(and|or)\b',a) else [])
p.finish()

# FORENSICS: both selected papers supply photographed evidence for online casework.
p=paper('feHPs-Jnwpk',year=2017,difficulty='Medium',difficultyReason='Interprets DNA bands, chromatography, hair and fingerprints, then evaluates a complete fictional case.',topics=['Forensic chemistry','Chromatography','DNA evidence','Hair','Fingerprints','Case analysis'],topicMatch='current',alignment='Written evidence interpretation overlaps 2027 forensics; this paper needs no physical specimens.',scoringBasis='All sections are converted. Section I printed question weights sum to 50, followed by 10 safety/procedure and 30 analysis points. Q4 is unscored because burnt-hair odor does not justify the key’s PTFE answer. Q1 accepts either calcium salt; Q3 is corrected to iodine/C. Eight fingerprint labels retain 0.75 point each. Drawing Q8 accepts a labeled verbal structure. Analysis awards evidence-based reasoning and does not require the key’s incorrect claim that Jake is the athlete.')
p.pp=Path('output/practice-research/batch-oct13/feHPs-Jnwpk-paperPath.txt').read_text(encoding='utf-8').split('\f')
p.mcq('I-1','White powder gives an orange flame. Which listed powder could it be?',bank(['Calcium chloride','Calcium carbonate','Lithium chloride','Magnesium sulfate']),'A',2,1,accepted=['A','B'])
p.frq('I-2a','Acid added to Jake’s powder releases a gas that turns limewater milky. Name the gas.','Carbon dioxide',2,1,accepted=['Carbon dioxide','CO2'])
p.mcq('I-2b','Which powder could produce that gas with ethanoic acid?',bank(['Lithium chloride','Sodium carbonate','Sodium chloride','Calcium nitrate']),'B',2,1)
p.mcq('I-3','Which reagent identifies cornstarch?',bank(['Cobalt','Ethanol','Iodine','Ammonia']),'C',2,2)
p.frq('I-4','The plastic has a burnt-hair odor. Identify it from the original choices.','Unscored: the supplied PTFE answer is not supported by the stated odor or alternatives.',0,2)
for id,prompt,a,w,pg in [
('I-5','What bonds join complementary DNA bases?','Hydrogen bonds',2,2),
('I-6','Does the crime-scene DNA match any suspect? Explain using the pictured bands.','No complete matching profile among the four suspects. Explain the band mismatch; do not select a person based on one shared band.',2,2),
('I-7','Was the DNA analysis useful? Why or why not?','It does not identify one of these suspects. The public statue may have unrelated deposited DNA; a mismatch can still inform exclusion of a particular profile, so accept a justified discussion of its limitations/usefulness.',2,2),
('I-8','Describe a fully labeled hair structure, including where each part lies.','Outer cuticle; cortex beneath; central medulla; root at base. One point per correctly located label.',4,2),
('I-9','Compare human and dog hair density, nature and growth patterns.','Discuss denser/coarser dog coat versus the human comparison, often larger/continuous animal medulla versus thinner/fragmented human medulla, and more synchronized/seasonal coat growth versus more asynchronous human scalp-hair growth. Allow species, hair type and growth-cycle qualifications; neither grows indefinitely.',4,2),
('I-10','Identify the species of the pictured hair and explain.','Human is the published interpretation; explain relatively distributed pigmentation and the pictured shaft features. Microscopy supports classification, not individual identification.',4,3),
('I-11','Which suspect does this hair evidence identify?','None specifically; all suspects are human.',2,3),
('I-12a','Explain how paper chromatography would be performed.','Spot sample and standards on a pencil baseline above solvent; place paper in solvent chamber; let solvent rise and separate components; mark solvent front and compare component travel/Rf. One point per major step, maximum four.',4,3),
('I-12b','How could chromatography help the case?','Compare the unknown ink separation/Rf pattern to suspect inks; a matching pattern supports a common ink but is not unique proof of guilt.',1,3),
('I-13','Which suspect does the chromatogram implicate, and why?','Jake: ink spots have the same relative positions/Rf pattern as the crime-scene sample. Award identification plus explanation.',3,3),
('I-15','Who matches the plain-whorl fingerprint? Explain.','Jake; the concentric/whorl ridge pattern matches the class shown. Explain the pattern; class similarity alone is not individual identification.',3,4),
('I-16','Who is the best-supported suspect in the fictional case?','Jake',3,4),
('II-1','Describe iodine-fuming principles, materials, limitations and conditions.','Iodine vapor adsorbs to fingerprint residues and produces transient brown prints on suitable porous material. Describe an enclosed chamber and controlled vapor exposure under fume extraction, observation and prompt photography/fixation, suitable porous surfaces, and fading/limited durability. Six relevant rubric elements, one each; this is a written procedure question.',6,4),
('II-2','List four laboratory precautions for iodine fuming.','Splash goggles, suitable gloves, protective clothing and use of a fume hood/avoid inhalation. One point each valid distinct precaution.',4,4),
('III','Write the final case report answering all five bullets in Section III.','Six points per requested discussion: Jake is best supported; compare other suspects against the ink/fingerprint evidence; discuss contradictory/unmatched DNA and non-specific human hair; distinguish speculative motive from evidence; relate the timeline and black clothing to the account without inventing observations. Dave, not Jake, is the athlete. Do not claim unmatched public-surface DNA proves guilt or innocence. Credit defensible alternative analysis backed by the supplied evidence.',30,4)]:p.frq(id,prompt,a,w,pg,accepted=[a] if id in ['I-5','I-16'] else [])
for i,a in enumerate(['Plain arch','Tented arch','Ulnar loop','Radial loop','Plain whorl','Central pocket loop whorl','Double loop whorl','Accidental whorl']):p.frq('I-14-'+chr(65+i),f'Identify fingerprint {chr(65+i)} in question 14.',a,.75,3,accepted=[a])
p.finish()

p=paper('zrvevxmrLCc',difficulty='Medium',difficultyReason='Combines chemical tests, photographed fibers and fingerprints, chromatography ratios, optics and a fictional evidence report.',topics=['Forensic chemistry','Polymers','Chromatography','Mass spectrometry','Fingerprints','Case analysis'],topicMatch='current',alignment='Written and photographed evidence overlaps 2027 forensics; no physical samples are required.',scoringBasis='All requested written items retain their published weights. Solubility accepts magnesium sulfate or calcium nitrate; base selection also includes calcium carbonate. Two polymer descriptions are insufficiently specific and are unscored. Chromatography ratios are calculated from the printed distance labels, not the key’s reversed sample labels. The 40-point case report uses a disclosed four-part, ten-point practice rubric because the handwritten key has no subdivisions. Absence of motive, probation or childbirth is not proof of innocence.')
p.mcq('Chem-1','Which listed chemical is water soluble?',bank(['Calcium sulfate','Cornstarch','Magnesium sulfate','Calcium nitrate']),'D',2,2,accepted=['C','D'])
p.mcq('Chem-2','Select all listed substances whose aqueous solutions/suspensions can be basic.',bank(['Sodium carbonate','Calcium nitrate','Sucrose','Sodium acetate','Calcium carbonate']),['A','D','E'],4,2)
for id,a in [('a','Yellow'),('b','Crimson red'),('c','Lilac')]:p.frq('Chem-3'+id,f'Name the flame color in qualitative analysis 3({id}).',a,2,2,accepted=[a]+({'b':['Red','Crimson'],'c':['Purple','Violet'],'a':['Yellow-orange']}[id]))
p.frq('Chem-4','Why is Benedict’s solution useful?','Detects reducing sugars, e.g. glucose, distinguishing them from non-reducing sucrose under the standard test. Explain expected positive color/precipitate with appropriate heating.',3,2)
for n,a in [(1,'PVC'),(2,'PET/PETE')]:p.frq(f'Plastic-{n}',f'Identify plastic {n} from its listed burn characteristics.','Unscored: the published key suggests '+a+', but the listed qualitative observations are not sufficiently specific to require this identity.',0,2)
for id,a,pg in [('Fiber-1','Polyester',2),('Fiber-2','Cotton',2),('Hair','Human',3)]:p.frq(id,'Identify the pictured '+id.lower()+'.',a,3,pg,accepted=[a])
for id,v in [('A',.4),('B',.6),('C',.2)]:p.frq('Rf-'+id,f'Calculate Rf for sample {id} using the printed distance labels.','Rf = distance traveled by spot / solvent-front distance = '+str(v),3,3,numeric=numeric(v,.01))
p.frq('Mass-1','Give the m/z value of the base peak.','57',1,3,numeric=numeric(57,0))
p.frq('Mass-2','For charge +1, what is the molecular mass indicated by the molecular-ion peak?','86 g/mol',3,3,numeric=numeric(86,0,['g/mol','Da']))
p.frq('Mass-3','What does TLC stand for?','Thin-layer chromatography',2,3,accepted=['Thin layer chromatography'])
p.frq('Glass-1','Calculate the refractive index from the given incident and refracted angles.','Snell’s law: n = sin(33 degrees)/sin(20.997 degrees) = approximately 1.520. Award method and calculation credit.',4,4)
p.frq('Glass-2','Identify the glass type from that refractive index.','Crown glass',3,4,accepted=['Crown glass','Crown'])
for name,pos in [('Plain arch',3),('Tented arch',1),('Loop',4),('Plain whorl',2)]:p.mcq('Print-'+name.lower().replace(' ','-'),f'Match {name} to the images numbered top to bottom, 1–4.',bank(['Image 1 (top)','Image 2','Image 3','Image 4 (bottom)']),chr(64+pos),1,4)
p.frq('Print-methods','List four methods for developing latent fingerprints.','Dusting; iodine fuming; ninhydrin; cyanoacrylate fuming. One point per valid distinct method; accept other suitable methods.',4,4)
p.frq('Analysis','Who most likely robbed Bon Magasin? Compare all four suspects with the supplied evidence and explain limitations.','Cam Brioleur is the key’s intended suspect, supported by B+ blood, matching print appearance and dog hair. Vole: blood/print mismatch; Charm: blood/print mismatch; Ben: polypropylene overlap is non-exclusive and blood/print do not match. Motive supports investigation but does not establish guilt; probation or recent childbirth does not establish innocence. Practice allocation: 10 points each for conclusion, supporting evidence, evaluating alternatives, and reasoned limitations/contradictions.',40,6)
p.finish()

# DISEASE DETECTIVES: retain tables and epidemic curves, correct statistical interpretations.
p=paper('37x5BgyXapo',year=2026,difficulty='Hard',difficultyReason='Definitions, causal diagrams, epidemic curves and cohort/case-control calculations require both recall and reasoning.',topics=['Epidemiology','Study design','Outbreak investigation','Causal diagrams'],topicMatch='current',alignment='Epidemiology and outbreak investigation overlap the 2027 topics; dated history questions retain their stated historical context.',scoringBasis='All 86 items are retained. Itemized question/blank weights take precedence over inconsistent section totals. Q33, Q54, Q55 and Q69 are unscored due to definition/interpretation ambiguity. Corrections include effectiveness (Q30), secondary prevention (Q51), conditional case confirmation (Q62), relative risk (Q78–79), and association versus causation (Q80/86). Q82 is exposed-group prevalence, not an attack rate. Epidemiologic interpretations are educational, not individual medical advice.')
qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==86
weights={21:3,24:2,26:2,28:3,29:2,30:2,32:2,33:3,57:2,58:3,59:3,60:2,61:2,62:2,69:2,75:2,76:2,78:2,79:2,80:3,81:2,83:3,85:4,86:3}
fix={28:'Immunization; inoculation; vaccination. Allow appropriate overlap in terminology rather than implying inoculation and vaccination are wholly separate concepts. One point per supplied blank.',30:'Efficacy under ideal conditions; effectiveness under real-world conditions. One each. The key says efficiency, but effectiveness is the word-bank term matching the definition.',33:'Unscored: endemic and hyperendemic describe baseline presence/frequency. Holoendemic does not mean every person is infected; it refers to high sustained transmission with widespread childhood infection.',51:'Secondary prevention: screening for early detection.',54:'Unscored: avoiding unnecessary intervention may be quaternary prevention, but choosing non-invasive treatment alone does not establish that classification.',55:'Unscored: ART can be discussed as secondary or tertiary prevention depending on goals, stage and prevention framework; the question does not specify these.',62:'Depends on the disease-specific surveillance case definition. Some confirmed case definitions permit clinical criteria plus epidemiological linkage or other non-laboratory evidence; others require laboratory evidence. Reject the key’s universal claim that confirmation always requires a lab test.',69:'Unscored: blocking backdoor/non-causal paths requires appropriate conditioning on non-colliders while avoiding colliders and their descendants; the generic wording about all mediators is not universally correct.',78:'RR = (74/105)/(29/132) = 3.21 (approximately 3.208). Two points for correct formula and result.',79:'Exposed participants had about 3.21 times the disease risk of unexposed participants in this cohort. This is association, not proof of causation.',80:'The exposure is associated with higher risk, but the RR alone does not establish causation. Consider confounding, bias, temporality and uncertainty; a causal conclusion requires additional evidence. Credit cautious discussion, not a categorical yes based only on effect size.',82:'173/261 = 0.66 or 66.3% is prevalence among the exposed in this cross-sectional sample. An incidence attack rate cannot be inferred from this design alone.',86:'Exposure B has the larger estimated odds ratio in the key’s separate binary comparisons (about 4.87 vs 2.02), but neither odds ratio proves causation. Explain the association and limitations.'}
for n,q in qs.items():
 w=weights.get(n,1);w=0 if n in [33,54,55,69] else w
 answer=fix.get(n,ks[n]['text']);answer=re.split(r'\nPart [1-4]',answer)[0].strip()
 if 35<=n<=49:
  letter=re.match(r'[BVRFS]',answer)[0];choices=[{'id':a,'text':b} for a,b in [('B','Bacterium'),('V','Virus'),('F','Fungus'),('R','Prion'),('S','Parasite')]];p.mcq(str(n),q['text'].split('Which of the four')[0],choices,letter,w,q['page'])
 else:p.frq(str(n),q['text'],answer,w,q['page'],accepted=['Secondary','Secondary prevention'] if n==51 else ['Relative risk','Risk ratio','RR'] if n==77 else ['Odds ratio','OR'] if n==84 else [])
p.finish()

p=paper('d9cpYsuDN_Y',year=2017,difficulty='Medium',difficultyReason='Case definitions, risk calculations, outbreak graphs and foodborne scenarios combine practical epidemiology and vocabulary.',topics=['Epidemiology','Foodborne illness','Study design','Outbreak investigation'],topicMatch='current',alignment='General epidemiology and outbreak investigation overlap 2027, with original historical data retained.',scoringBasis='All 20 main questions, 22 matching items and three zero-point tiebreakers are included. Published main-item weights total 70 with matching. Q4 and Q8 are excluded due to contradictory wording/key; Q10 is evaluated consistently with the student’s revised definition. Q11 is corrected to immunoglobulin M. Case-control odds are not called risk. The unkeyed sixth tiebreaker organism is completed as fungal and remains unscored.')
qs=numbered(p.pp);assert len(qs)==20
answers=[
'Accept 6–15 hours for diarrheal Bacillus cereus, as keyed; also accept the shorter roughly 0.5–6-hour emetic incubation when distinguished. Two points for a valid form/range.',
'Contact, vehicle and vector transmission. Accept equivalent recognized transmission modes.',
'a Age 80 or older; b All ages; c approximately 47–53%. One point each; use the supplied hospitalization graphs.',
'Unscored: part a asks incubation period but the key gives an exposure date (October 20). The supplied average incubation period is four days; exposure-window estimates require explicit assumptions, and the key’s dates conflict with the question.',
'a 48/60=.80 (2); b 18/40=.45 (2); c .80/.45=1.78 (2); d exposed cohort has about 1.78 times the risk, without proving causation (2); e cohort (1); f three valid symptoms such as diarrhea, cramps, nausea, fever or vomiting (2).',
'a OR=(25*63)/(32*14)=3.52 (2); b cases have about 3.52 times the odds of exposure compared with controls, equivalently an exposure–disease odds association, not directly 3.52 times the risk (2); c case-control (1); d retrospective (1); e Mantel–Haenszel stratified/adjusted odds ratio (1).',
'Line listing.',
'Unscored: the written case definition is incomplete and the key’s count of four does not require nausea as the wording suggests. Credit discussion of which criteria are being applied, without affecting score.',
'Create a clear, operational revised definition using the listed clinical findings and IgM anti-HAV evidence. A defensible definition can require acute onset plus compatible symptoms and positive IgM anti-HAV. Do not force an internally contradictory definition.',
'Count consistently with the definition proposed in Q9 and the supplied table. All six are IgM-HAV-positive; only four have jaundice. A definition requiring jaundice therefore cannot yield six. Award the point for a correct count under the student’s explicit criteria.',
'Immunoglobulin M.',
'IgM antibody to hepatitis A virus; a marker used in assessing recent/acute HAV infection in the appropriate clinical context.',
'a Determine whether food refrigeration was adequately cold to limit bacterial growth (2); b determine whether cooking temperatures could kill vegetative bacteria (2). Fat temperature alone does not guarantee food-center temperature or destruction of preformed toxins.',
'Name a distinct risk factor and mechanism: e.g. cracked surface harbors microbes, putrefied meat contaminates grinder, missing handwashing promotes transfer, or 68 F refrigerator permits growth. One point identification, one explanation.',
'Name a second distinct risk factor and explain its mechanism, as in Q14. Do not duplicate the same factor for additional credit.',
'Name a third distinct risk factor and explain its mechanism, as in Q14. Do not duplicate earlier factors.',
'Coliform testing detects/counts indicator bacteria and helps assess water sanitation or contamination. Total coliform presence is not direct proof of a specific pathogen; fecal indicators are more specific to fecal contamination.',
'Escherichia coli / E. coli.',
'Retrospective cohort study.',
'97/261 = .37165, about 37.2%. Accept .370–.374 or 37.0–37.4%.'
]
weights=[2,1,3,0,11,7,1,0,1,1,1,2,4,2,2,2,2,1,1,1]
for n,q in qs.items():
 prompt=q['text'].split('Matching:')[0]
 p.frq(str(n),prompt,answers[n-1],weights[n-1],q['page'],accepted=['Immunoglobulin M','IgM'] if n==11 else ['Line listing','Line list'] if n==7 else ['Escherichia coli','E coli','E. coli'] if n==18 else [])
match='I A J V P Q K D E G H M F L S T R C B N O U'.split()
for n,a in enumerate(match,1):p.mcq(f'M-{n}',f'Matching item {n}: select the definition from the original A–V bank.',bank(list('ABCDEFGHIJKLMNOPQRSTUV')),a,1,9)
for n,a in enumerate(['Random error is chance variation; confounding is distortion by a third factor related to exposure and outcome. Accept systematic versus random error if explained, since confounding is a bias rather than a non-bias error.','Selection bias arises from differential inclusion; information bias from systematic measurement/classification errors. Give an example of each.','Clostridium perfringens bacterial; Mucor circinelloides fungal; shigellosis bacterial; listeriosis bacterial; aspergillosis fungal; candidiasis fungal.'],1):p.frq(f'TB-{n}',f'Answer tiebreaker {n} on page 10. This does not affect the percentage.',a,0,10)
p.finish()

p=paper('nChmgorIXfs',difficulty='Medium',difficultyReason='Written immunity, transmission, outbreak assessment and odds-ratio questions require reasoned explanations.',topics=['Epidemiology','Outbreak investigation','Immunity','Foodborne illness'],topicMatch='current',alignment='Core epidemiologic concepts overlap 2027; the paper is educational historical practice.',scoringBasis='Published test weights take precedence over inconsistent key weights, totaling 48 points before excluding ambiguous outbreak Q3 (2 points). Tiebreakers are included at zero points. The epidemiologic triad is corrected to agent-host-environment. The vaccine odds ratio is approximately 4.153. A ratio near one does not prove absence of association or establish statistical significance without a confidence interval.')
items=[
('1','Which of the five statements demonstrates active immunity? Explain the yes/no choices.','Only C, vaccine-induced immune response. A,B,D,E do not demonstrate acquired active immunity. B’s claim about sickle-cell disease preventing HIV is not biologically supported. Give full three for C only; partial credit for recognizing C with errors.',3,2),
('2','Describe the epidemiologic triad.','Agent, susceptible host and environment; explain how they interact in transmission/disease occurrence. Five points for all three and their relationship. The source key substitutes a vector/fomite for the environment and is incomplete.',5,2),
('3','Is the fictional Heloniogitis situation an outbreak?','Unscored: an outbreak is excess cases relative to expectation in a defined context; lack of statistical significance alone does not settle whether an outbreak exists.',0,2),
('4a','Can the tomato salad be pinpointed as the source? Explain.','No definitive attribution from the supplied information; many cases ate it but comparison exposure rates and uncertainty are essential. Three points for a clear conclusion and reasoning.',3,3),
('4b','Interpret the odds ratio 1.01.','Estimated odds are approximately equal between comparison groups. The point estimate suggests little observed association, but significance/precision cannot be determined without the actual confidence limits; it does not prove that salad is impossible as a source.',4,3),
('5','Name three routes of pathogen entry.','Examples: inhalation/respiratory mucosa, ingestion/gastrointestinal tract, and entry through broken skin/parenteral inoculation or other mucosa. Credit three distinct appropriate routes; intact skin contact alone is not necessarily entry.',5,3),
('6','Give two biological, two chemical and two physical causes of disease.','Biological: bacteria, viruses, parasites or fungi. Chemical: toxic contaminants, poisonous chemicals/drugs. Physical: radiation, extreme temperatures, noise or mechanical trauma. One point per valid distinct example.',6,3),
('7','Describe five ways to prevent foodborne illness.','Five distinct actions with explanation, two points each: hand/surface hygiene, separating raw/cooked foods, adequate cooking, proper refrigeration, safe reheating/storage, or excluding ill food handlers. Accept other valid controls.',10,4),
('8','Calculate the odds ratio from the vaccine table.','(139*953)/(58*550) = 4.153; accept 4.10–4.19.',5,4),
('9','Fill the three empty chain-of-infection bubbles, describing their positions.','Upper right reservoir; lower left portal of entry; upper left susceptible host. All three correct =5; two =3; one =1, following the key’s partial-credit scale.',5,4),
('TB-1','List the outbreak investigation steps in the requested order.','Prepare fieldwork; establish outbreak; verify diagnosis; define/identify cases; descriptive epidemiology; develop hypotheses; evaluate hypotheses; refine/additional studies; implement control/prevention; communicate. Real investigations can overlap steps and urgent control should not be delayed. Unscored tiebreaker.',0,5),
('TB-2','Define random error, systematic error, selection bias and confounding.','Random error: chance variability. Systematic error: consistent directional distortion. Selection bias: distorted comparisons from how participants enter/remain in a study. Confounding: mixing of exposure effect with another causal factor related to exposure and outcome. Unscored tiebreaker.',0,5)]
for id,q,a,w,pg in items:p.frq(id,q,a,w,pg,numeric=numeric(4.153,.043) if id=='8' else None)
p.finish()


# REMOTE SENSING: preserve separate image packets and published subpart weights.
p=paper('MYPk0KIxvlM',competition='Captain’s Summer Exchange — Ann Arbor Pioneer',year=2025,difficulty='Hard',difficultyReason='Satellite image interpretation, refraction calculations and planetary energy balance require multi-step reasoning.',topics=['Climate','Atmospheric radiation','Ocean carbon','Satellite imagery'],topicMatch='different',alignment='Historical climate-focused paper, distinct from the 2027 geology-focused rotation.',scoringBasis='50 MCQs at two points plus six multipart FRQs totaling 96 points. Drawing subparts accept a precise verbal description. Source image packet included. Cover year 2025 overrides archive season 2026. In Q56 R is the globally averaged incoming flux assumed by the published model.')
qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==56
for n in range(1,51):
 q=qs[n];a=re.match('[A-D]',ks[n]['text'])[0]
 p.mcq(str(n),f'Answer question {n} in the original paper, using the image packet where indicated.',bank(list('AB' if n==43 else 'ABCD')),a,2,q['page'])
answers={
51:'a. Describe a solid reflected ray 53 degrees above horizontal (2). b. Snell law (1), incident angle 37 degrees with n=1 and 1.33 (1), refracted normal angle about 27 degrees (2), horizontal angle 63 degrees (1). c. Describe dashed transmitted ray 63 degrees below horizontal (2). d. 116 degrees (2). e. Angle increases (3). f. Beer-Lambert I/I0=exp(-kd) (1), ratio .01 and k=.6 (2), distance 7.68 m (2). g. depth=d sin63 (2), 6.84 m (1).',
52:'a. Any two of Terra, Aqua, Aura, Suomi NPP (1 each). b. Brown sea spray (2) with ocean/cyclone pattern evidence (3). c. Light blue black carbon (2), wildfire distribution in California/Canada/Africa (3). d. Dark green dust (2), desert source distribution such as Sahara/Arabian Peninsula (3).',
53:'a. Fossil-fuel combustion (2). b. Improving (1), less NO2, a harmful air pollutant (2). c. Reduced biomass/grassland burning (3). d. Fossil-fuel use was increasing (2), so increasing NO2 was expected (2).',
54:'a. Phytoplankton/algae (1) fix carbon via photosynthesis (1), sinking biomass exports carbon (1). b. CO2 dissolves in surface water (1), circulation transports it deep (2). c. Higher latitudes (1), cooler water (1), greater CO2 solubility (1). d. Warming reduces solubility/increases release (1), reinforcing greenhouse warming (2): positive feedback (2).',
55:'a. Gravity Recovery and Climate Experiment (2). b. Gravity anomalies (1). c. Six sequential relative motions (1 each): leading satellite accelerated toward excess mass/separation grows; leading satellite slows beyond it; separation shrinks; following satellite accelerates toward it, further decreasing separation; following satellite slows beyond it; separation returns/increases toward its prior value.',
56:'a. R(1-a) (3). b. Ra+sigma*T^4 (3). c. R(1-a)=sigma*T^4 (2), T=[R(1-a)/sigma]^(1/4) (2). d. R(1-a) and sigma*TA^4 (1 each), equal at top of atmosphere (2). e. Surface output sigma*TS^4 (1), input R(1-a)+sigma*TA^4 (1), equate (2). f. TS>TA (1), substitute the top balance (2), TS=2^(1/4)*TA (1). R is averaged incoming flux, so no extra factor four is needed.'}
for n,w in zip(range(51,57),[22,17,12,14,9,22]):p.frq(str(n),qs[n]['text']+' For drawing parts, describe the ray and angle in words.',answers[n],w,qs[n]['page'])
p.finish()

p=paper('q7MxC-LYT3Q',competition='Captain’s Summer Exchange — Ward Melville',year=2025,difficulty='Medium',difficultyReason='Acronyms, instrument principles, satellite imagery and climate explanations mix recall and applications.',topics=['Climate','Satellite instruments','Electromagnetic radiation','Energy balance'],topicMatch='different',alignment='Historical climate-focused rotation rather than the 2027 geology rotation.',scoringBasis='Published 128 points before excluding unreliable image attribution Q31/Q33 (4 each). The entire image sheet is included. Q30 corrects GRACE to gravity/water-mass change; Q32 accepts OCO-2 solar-induced fluorescence. Q40 corrects the positive ice-albedo feedback sign. Q44 uses micrometres, not the paper’s erroneous nm; corrected wording is shown before answering. The source satellite-purpose errors are checked against NASA CERES, GRACE and OCO-2 mission descriptions. Q52 accepts the intended long-term reference station Mauna Loa; the wording does not imply it is the only CO2 station.')
qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==60
acronyms=['Global Positioning System','Visible and Thermal Infrared Radiometer','Advanced Spaceborne Thermal Emission and Reflection Radiometer','Coastal Zone Color Scanner','Atmospherically Resistant Vegetation Index','Advanced Earth Observing Satellite','Center for International Earth Science Information Network','High Spectral Resolution Lidar','Land Vegetation and Ice Sensor','Multibeam Echo Sounding','Multifrequency Imaging Microwave Radiometer','Tropospheric Ozone Lidar Network','Transformed Soil Adjusted Vegetation Index','Weighted Difference Vegetation Index','Terrestrial Biosphere Model','Sea Surface Salinity','Red Green Blue','Positron Electron Magnet Spectrometer','Space Based Global Change Observation System','Software as a Service']
for n,a in enumerate(acronyms,1):p.frq(str(n),qs[n]['text'].split('Section')[0],a,1,qs[n]['page'],accepted=[a]+(['Consortium for International Earth Science Information Network'] if n==7 else ['Multibeam Echo Sounder'] if n==10 else []))
fr={21:('Active emits its own energy and detects a return; passive measures naturally emitted/reflected energy. One point per correct distinction.',2),22:('Radar active, conventional echo sonar active, ordinary camera passive, lidar active, infrared sensor passive, radiometer passive. One each; accept passive sonar if explicitly distinguished from echo sounding.',6),23:('Quality concerns usefulness/perceived suitability; fidelity concerns faithful reproduction of the original signal or scene. One point each; accept objective definitions of image quality involving resolution, noise and contrast.',2),24:('Wien law: peak wavelength inversely proportional to absolute temperature.',2),25:('Wave speed changes across media.',2),26:('Attenuation.',2),27:('Angle of incidence equals angle of reflection (1); specular reflection (1).',2),28:('Transmission.',2),29:('CERES (accept Terra/Aqua or Suomi NPP as CERES platforms), measuring Earth outgoing longwave radiative flux/energy budget. Two points for instrument/platform identification and two for purpose; this image alone does not uniquely establish Suomi NPP.',4),30:('GRACE twin satellites (2), gravity variations used to estimate changes in terrestrial water storage/groundwater mass (2). The map is water-storage change over India, not a surface-wave measurement.',4),31:('Unscored: the source assigns Suomi NPP but lists Doppler radar, which it does not carry, and the unlabeled image does not establish the platform. Optical/IR weather imagery interpretation is acceptable practice.',0),32:('OCO-2 (2), remotely measures CO2 and solar-induced chlorophyll fluorescence used to study photosynthesis (2). The supplied map is labeled SIF, not a generic map of every greenhouse gas/aerosol.',4),33:('Unscored: the image is a cosmic microwave-background-style sky map, inconsistent with the key’s ATMS Earth temperature identification. Do not penalize students for the mismatched key.',0),39:('Approximately 0.3 or 30 percent.',2),40:('Warming melts bright ice, exposing darker water/land, lowering albedo and increasing solar absorption, causing further warming and melting: positive feedback. The source key’s decreasing melt rate is incorrect.',2),41:('Examples: more cloud water, greater optical thickness, or smaller droplets at fixed water content. Credit a valid explanation.',2),42:('Any correctly explained climate feedback other than ice-albedo, e.g. warming increases water vapor, strengthening greenhouse warming (positive); or warming increases outgoing thermal radiation (negative). Identify direction and causal loop, one point each.',2),43:('Scattering aerosols such as sulfates generally cool; absorbing black carbon can warm the atmosphere. One point each, allowing cloud-mediated effects with sound reasoning.',2),54:('Explain two factors, two points each: increased albedo reduces absorbed sunlight and equilibrium temperature; more greenhouse gas increases infrared opacity and surface temperature. Other physically valid atmospheric/surface changes accepted.',4),55:('Choose two gases and explain natural drivers, two points each. Examples: water vapor responds to evaporation/temperature, CO2 to respiration/photosynthesis/ocean exchange, methane to wetlands. Greenhouse gas and trace gas are overlapping categories, so distinct gases suffice.',4),56:('A valid climate mitigation or adaptation approach beyond the three Rs, with mechanism. Examples: clean electricity, ecosystem restoration or urban greening reducing heat islands. Full credit for a coherent, scientifically sound explanation.',4),57:('Resolution resolves small details; contrast distinguishes objects; low noise improves measurement reliability. Credit all three aspects and their contributions; proportional partial credit.',4),58:('Spectroscopy identifies characteristic absorption/emission features; gas chromatography separates components for identification. Credit scientifically sound techniques and explanations, up to four.',4),59:('Wien law: 2.898e-3/(5e-7) = 5796 K, approximately 5800 K. Source gives no method credit.',4),60:('T=9667+273.15=9940.15 K; radiant exitance sigma*T^4 approximately 5.54e8 W/m^2. Credit Kelvin conversion and Stefan-Boltzmann method.',4)}
mc={34:'B',35:'B',36:'C',37:'D',38:'D',44:'C',45:'D',46:'B',47:'A',48:'B',49:'D',50:'A',51:'B',52:'C',53:'B'}
for n in range(21,61):
 q=qs[n]
 if n in mc:
  prompt=f'Answer question {n} in the original paper.'
  if n==44:prompt+=' Correction: option B’s visible wavelength range is 0.4–0.7 micrometres (µm).'
  if n==52:prompt+=' Select the famous long-term reference station intended by this question.'
  p.mcq(str(n),prompt,bank(list('ABCD')),mc[n],2,q['page'])
 else:
  a,w=fr[n];prompt=q['text'].split('Section')[0]
  if 29<=n<=33:prompt=f'Identify the satellite/instrument and purpose for image {n} in the image sheet.'
  p.frq(str(n),prompt,a,w,q['page'],numeric=numeric(5800,20,['K']) if n==59 else None,accepted=['Transmission'] if n==28 else ['Attenuation'] if n==26 else [])
p.finish()

# DESIGNER GENES: full original pedigrees, karyotypes and molecular diagrams.
p=paper('OyWS8QhR8_s',competition='Captain’s Summer Exchange — Palo Alto',year=2025,difficulty='Medium',difficultyReason='Molecular genetics, pedigrees, Hardy-Weinberg calculations and Punnett crosses.',topics=['Molecular genetics','Inheritance','Population genetics','Biotechnology'],topicMatch='current',alignment='Core genetics and inheritance concepts overlap the 2027 event.',scoringBasis='Published item weights retained, with all multipart questions and optional extra-credit prompt. Extra credit is unscored so it does not change the denominator. Q8 and Q9 are unscored because cut sites/number of cuts are unspecified. Q7 accepts extension or elongation. Q22b is corrected to 100% of male offspring. Q31 starts translation at the first AUG, correcting the published reading frame. Q34 accepts all four monophyletic clades, correcting the published exclusion of Archosauria. Drawing tasks accept a labeled textual Punnett square. Cover year 2025 overrides the archive season.')
qs=numbered(p.pp);assert len(qs)==36
letters='C B A A A C A D A A B D B A A D A B B B'.split()
for n,a in enumerate(letters,1):
 q=qs[n];count=5 if n==1 else 4
 p.mcq(str(n),f'Answer question {n} in the original paper.',bank(list('ABCDE'[:count])),a,0 if n in [8,9] else 1,q['page'],accepted=['A','B'] if n==7 else None)
for n,a in {23:'C',24:'D',26:'E',27:'A'}.items():p.mcq(str(n),qs[n]['text'],bank(list('ABCDEF' if n in [26,27] else 'ABCD')),a,2,qs[n]['page'])
fr={21:('a. q²=.49 gives q=.7 and p=.3; p²=.09=9% savory only (3, method credit). b. 2pq=.42=42% heterozygotes (2).',5),22:('a. Incomplete dominance for hypothetical intermediate pink (2). b. Red-eyed father XRY and white-eyed mother XrXr produce XrY sons: 100% of male offspring white-eyed (2). The source 50% counts white-eyed sons among all offspring instead of among sons.',4),25:('Yyrr gametes Yr/yr; yyRr gametes yR/yr. Square yields YyRr,Yyrr,yyRr,yyrr equally (2). Calculation 1/2*1/2 (1), 25% YyRr (1). A textual square is accepted.',4),28:('Karyotype (1), metaphase (1), Turner syndrome/45,X (2), female (2).',6),29:('Restriction fragment length polymorphism.',1),30:('GamerGirl3 matches the supplied crime-scene band pattern.',1),31:('Begin at the first AUG in 5′ AGUAUGUCCCCUAUCCAAAGAAAACGGUAGGGGUCG 3′. Codons AUG UCC CCU AUC CAA AGA AAA CGG UAG: Met-Ser-Pro-Ile-Gln-Arg-Lys-Arg-STOP. Five points for the correct translation; proportional credit for correct codons. The key incorrectly translates the leading untranslated AGU as a start and mislabels AUG as serine.',5),32:('Pribnow box.',2),33:('Valine.',1),35:('SDS denatures proteins and supplies approximately uniform negative charge per unit mass, allowing electrophoretic separation mainly by size. One point each for denaturation, charge standardization and size separation.',3),36:('Negative.',2)}
for n,(a,w) in fr.items():p.frq(str(n),qs[n]['text'].split('Extra credit')[0]+' Describe any required drawing in labeled text.',a,w,qs[n]['page'],accepted=['Restriction fragment length polymorphism'] if n==29 else ['GamerGirl3','Gamer Girl 3'] if n==30 else ['Pribnow box'] if n==32 else ['Valine'] if n==33 else ['Negative','Negatively charged'] if n==36 else [])
p.mcq('34',qs[34]['text'],bank(['Squamata','Testudines','Archosauria','Crocodylomorpha']),list('ABCD'),2,8,option_points={c:.5 for c in 'ABCD'})
p.frq('EXTRA','Optional: write your own Designer Genes question. Unscored extra-credit practice.','A factually accurate genetics question with a clearly answerable prompt.',0,9)
p.test['questions'].sort(key=lambda q: 999 if q['id']=='EXTRA' else int(q['id']))
p.finish()

p=paper('p_vAH4UtvEU',difficulty='Medium',difficultyReason='Recall, pedigrees, karyotypes, genetic crosses and short molecular explanations.',topics=['Molecular genetics','Mendelian inheritance','Gene expression','Biotechnology'],topicMatch='current',alignment='Core inheritance, molecular genetics and gene-expression topics overlap 2027.',scoringBasis='All 48 questions with published weights. Q24 uses 40% cytosine (handwritten key verified). Q27 corrects the printed DNA GUA to GTA, matching the published mRNA/protein solution, with correction shown before answering. Q29a accepts two biological male children; the key counts one unaffected male only. Q37d corrects the father-phenotype probability to 25%. Q43b accepts beta-galactosidase, the actual lac operon product, and the key’s informal lactase. Punnett squares can be described as labeled crosses in text.')
qs=numbered(p.pp);assert len(qs)==48
letters='C A B B D A D D D A D C D D B B A C B D'.split()
for n,a in enumerate(letters,1):
 q=qs[n];parsed=options(q['text']);assert parsed,(n,q)
 p.mcq(str(n),parsed[0],parsed[1],a,1,q['page'])
fr={21:('a BB; b Bb; c blue horns; d white horns. One each.',4),22:('GGA-TCA-CTT. One point per complementary triplet.',3),23:('a Incomplete dominance (1). b RW x RR (2). c Square RR,RW,RR,RW (6), genotypes 50%RR/50%RW and phenotypes 50%red/50%pink (4). Accept a labeled textual square.',13),24:('40 percent: A=T=10%, leaving G+C=80%, so C=40%.',1),25:('Yes (1). Heterozygous parents AO x BO (or IAi x IBi); square AB,AO,BO,OO. Full 12 for correct parents and labeled square showing OO child; proportional partial credit for valid cross elements.',13),26:('Hydrogen bonds between complementary bases.',1),27:('With corrected template TAC-GTT-AAA-GTA, mRNA AUG-CAA-UUU-CAU (4), protein Met-Gln-Phe-His (4). One per correct codon/amino acid.',8),28:('UAA,UAG,UGA: one per distinct stop codon in the standard genetic code.',3),29:('a Two male children of individual 4: squares 9 and 11 (1); source key incorrectly gives one. b Individual 2 Rr (1). c Individual 10 smooth coat (1). d Individual 10 has no sisters (1).',4),30:('Centrosome/centrioles organize spindle microtubules. Accept the key’s centriole.',2),31:('Messenger ribonucleic acid.',3),32:('Mother Rr (1), father r^h r (1). Gametes R/r and r^h/r. Square Rr^h,Rr,r^h r,rr each25% (6). Full-color50%, Himalayan25%, albino25%, consistent labeled genotype ratios (7).',15),33:('Female (1); trisomy13/Patau syndrome (1); select cleft palate, polydactyly and heart abnormalities, exclude gigantism (4; proportional selection credit).',6),34:('Amino acids.',2),35:('Gap.',2),36:('Non-Mendelian under the question’s simple complete-dominance comparison (1); codominance and/or multiple alleles (1). ABO still follows Mendelian segregation, so a nuanced explanation earns full credit.',2),37:('a Father GPdd, mother GPDd (2). b Gametes father Gd/Pd and mother GD/Gd/PD/Pd, yielding GG Dd 1/8, GG dd1/8, GP Dd1/4, GP dd1/4, PP Dd1/8, PP dd1/8 (12 for correct square, with partial credit). c Green25% (1). d Striped four-clawed GPdd, father phenotype25% (1), not source12%. e Both heterozygous GPDd25% (1).',17),38:('Prokaryotes couple transcription and translation because no nuclear barrier; operons/polycistronic mRNA also coordinate expression. Credit either explained source mechanism up to2.',2),39:('Promoter/promoter region.',2),40:('a introns; b exons; c splicing; d 5-prime cap; e 3-prime poly-A tail. One each.',5),41:('Flexible pairing at codon third position/anticodon first allows one tRNA to read multiple synonymous codons (2). It does not mean a changed amino acid is always tolerated.',2),42:('Tryptophan acts as corepressor, activating repression and turning down trp operon expression.',2),43:('a Lactose (1); b beta-galactosidase, accept informal lactase from key (1); c saves resources by not making lactose-utilization proteins when substrate absent (1).',3),44:('Mother/maternal inheritance.',2),45:('Restriction enzymes/restriction endonucleases.',2),46:('Gel electrophoresis.',2),47:('a Retrovirus, e.g. HIV or HTLV (1); b reverse transcriptase/RNA-dependent DNA polymerase (1).',2),48:('Size and charge (2); accept size/molecular weight, noting DNA has roughly uniform charge-to-mass ratio and migration separation is primarily length.',2)}
aliases={26:['Hydrogen bonds','Hydrogen bonding'],30:['Centrosome','Centrioles','Centriole'],31:['Messenger ribonucleic acid'],34:['Amino acids'],35:['Gap'],39:['Promoter','Promoter region'],44:['Mother','Maternal','Female parent'],45:['Restriction enzymes','Restriction endonucleases'],46:['Gel electrophoresis']}
for n,(a,w) in fr.items():
 prompt=qs[n]['text']
 if n==27:prompt+=' Correction: the final DNA triplet is GTA, not GUA.'
 if n in [23,25,32,37]:prompt+=' Describe the labeled Punnett square and ratios in text.'
 p.frq(str(n),prompt,a,w,qs[n]['page'],accepted=aliases.get(n,[]),numeric=numeric(40,0,['%','percent']) if n==24 else None)
p.finish()

# MIT image packet is a later attachment, not the manifest's first attachment.
sid='lQsQFOwWQCU';image_file=next(f for f in SOURCES[sid]['files'] if f['type']=='images')
SOURCES[sid]['contextPath']=str(ROOT/(image_file['sha256']+'.pdf'))
p=paper(sid,difficulty='Hard',difficultyReason='86 problems combine satellite imagery, radiative transfer, climate feedback and orbital/energy-balance calculations.',topics=['Climate','Ocean color','Satellite imagery','Radiative balance','Orbital physics'],topicMatch='different',alignment='Historical climate and ocean-color emphasis; the 2027 rotation focuses on geology.',scoringBasis='All 86 published questions and the five-page image packet. Source weights total 200. Doppler/orbit Q8 and Q10 are unscored because the published solution ignores radar’s two-way shift and has an inconsistent orbital-velocity sign. Q16 is unscored because the unobserved polar chlorophyll value cannot be inferred as certainly high. Q17 uses the upwelling-radiance definition of z90. Q40 corrects the aerosol mitigation sign. Q79 accepts the correctly explained distinction between total power (ratio 1) and incident versus globally averaged flux (ratio 4). Nighttime imagery is emitted thermal radiation, despite the source’s reflected wording.')
qs=numbered(p.pp);ks=numbered(keypages(p));assert len(qs)==len(ks)==86
weights=[1,1,2,3,2,1,1,4,3,2,2,3,1,1,2,3,2,3,3,1,2,2,2,2,1,1,3,6,1,2,1,2,2,2,3,2,2,3,2,3,1,2,1,2,4,3,3,1,2,2,4,2,2,3,3,2,2,4,1,4,2,1,3,3,3,2,3,1,3,2,4,2,2,1,1,3,3,2,3,4,2,1,5,2,3,6]
assert len(weights)==86 and sum(weights)==200,(len(weights),sum(weights))
fix={8:'Unscored: the source key gives 30 km/s using a one-way Doppler approximation. A radar return requires the two-way shift, yielding approximately 15 km/s in the stated simplified line-of-sight geometry.',10:'Unscored: the source’s 29.53 km/s follows its inconsistent one-way Doppler result and subtraction of surface speed. A physically consistent interpretation must account for the two-way shift and eastward surface motion.',14:'Sun-synchronous passes observe a location at approximately the same local solar time, improving illumination consistency (1). Global/high-latitude coverage is also accepted; this does not mean every place is revisited daily.',15:'Coastal upwelling brings nutrient-rich deep water supporting phytoplankton; land runoff also supplies nutrients. Explain one valid mechanism (2).',16:'Unscored: missing polar measurements alone cannot establish chlorophyll concentration. Low illumination/polar night, cloud, sea ice, swath coverage and observation time can limit ocean-color retrievals; biological concentration depends on actual conditions.',17:'z90 is the depth above which approximately 90% of the water-leaving/upwelling signal originates (2). It is not in general identical to the depth where downwelling irradiance falls to 10%, as the source alternative suggests.',40:'Aerosol mitigation/decrease reduces atmospheric shading and can enhance surface warming/drying, increasing fire susceptibility (3). Contrast greenhouse warming and regional/seasonal aerosol effects with reference to the given figures; accept scientifically justified alternatives. The source key reverses increased/decreased aerosol concentration.',50:'For typical sea-surface temperature near 300K, the spectral peak is near 10 micrometres; the 4-micrometre band is on the short-wavelength side and 11 micrometres is near/on the longer-wavelength side (2). Both are thermal emission at night.',51:'At 4 micrometres radiance has a larger fractional temperature sensitivity than near 11 micrometres, because it lies farther on the short-wavelength Wien tail. Explain band position and sensitivity (4).',71:'IR permits useful spatial resolution from geostationary altitude (2). Passive microwave typically uses low polar orbits because long wavelength and practical antenna size limit spatial resolution from high altitude (2). Microwave geostationary observations are not fundamentally forbidden.',75:'Stefan-Boltzmann law.',76:'sigma*(5800 K)^4 approximately 64.17 MW/m^2; accept 63.5–64.5 MW/m^2 (3).',77:'Flux ratio = (150000000/700000)^2 approximately 45918; accept 45800–46000 (3).',78:'Approximately 1398 W/m^2; accept 1370–1420 W/m^2 (2).',79:'The intended ratio of solar flux on the projected disk to average emitted surface flux is 4 because sphere area is four times disk area. If interpreting total incoming/outgoing power, equilibrium gives ratio1. Award three for either interpretation with consistent definitions; do not require unequal total powers.',80:'sigma*T^4=Qs/4, giving approximately 280 K; accept278–282K (4).',81:'Reflects (1) 30% of incoming solar/shortwave radiation (1).',83:'T=[0.7*Qs/(4*sigma)]^(1/4), approximately256K; accept255–258K (5).',84:'QA=QE/2 (2), since the layer re-emits equally upward and downward.',85:'QE=QA+0.7*Qs/4 (3).',86:'Combining equations gives QE=0.7*Qs/2 and T=[0.7*Qs/(2*sigma)]^(1/4), approximately305K; accept303–306K (6).'}
aliases={1:['Nitrous oxide'],2:['Infrared','IR'],5:['Water vapor','Water vapour'],6:['Vibration','Molecular vibration'],13:['Phytoplankton','Productivity'],20:['Shortwave','Shortwave radiation'],21:['Sun','The sun'],22:['Albedo'],25:['Longwave','Longwave radiation'],26:['High'],29:['Increase','Increased CO2'],31:['MODIS'],41:['Passive'],42:['Celsius','Degrees Celsius'],43:['No'],48:['Polar','Sun synchronous','Sun-synchronous'],52:['Bjerknes feedback'],59:['West','Westward'],62:['Decrease'],66:['Geostationary','Geostationary orbit'],68:['Passive'],74:['Microwave'],75:['Stefan Boltzmann law','Stefan-Boltzmann law'],82:['Decrease']}
for n,q in qs.items():
 a=fix.get(n,re.split(r'\nSection [A-I]|\nMIT Invitational',ks[n]['text'])[0]);w=0 if n in [8,10,16] else weights[n-1]
 prompt=f'Answer question {n} in the original test packet. Use the separate image sheet where indicated.'
 if n in [50,51]:prompt+=' Interpret the nighttime signal as emitted thermal radiation.'
 # The paper text, surrounding context and source diagrams remain available to the grader.
 p.frq(str(n),prompt,a,w,q['page'],accepted=aliases.get(n,[]),numeric=numeric(1.0001,.000001) if n==7 else numeric(101,0,['minutes','min']) if n==73 else numeric(81.3,.1,['degrees']) if n==72 else None)
p.finish()

# CLEMENTS: printed cover date, complete state/work/heat tables, offline calculations.
p=paper('8HOeY_b0s6o',year=2017,difficulty='Hard',difficultyReason='Conceptual thermodynamics plus a ten-process ideal-gas cycle with state, heat, work and efficiency calculations.',topics=['Thermodynamics','Ideal gases','Heat engines','Phase changes'],topicMatch='current',alignment='Thermodynamic laws, heat engines and heat transfer overlap the current written topics; the old device activity is not reproduced.',scoringBasis='Printed paper weights total100: 28 conceptual points,17 state blanks,40 work/heat points,5 diagram and10 efficiency. Q1.13 (1) and Q1.20 (4) are unscored due to malformed wording and inconsistent dissolution key. Engine values are recalculated offline with ideal monatomic gas laws to correct rounded/inconsistent source numbers; 2% tolerance for work/heat, practical rounding for states, and method credit on request. Final isochoric expansion is interpreted as isochoric heating, with correction shown before answering. Cover date December16,2017 overrides archive2018. Work is positive when done by the gas; heat is positive into it.')
# Decimal numbering is not compatible with the generic integer parser.
text=original(p);qs=blocks(text,r'(?m)^\s*(1\.\d{1,2})\.?\s+')
assert len(qs)==25,(len(qs),list(qs))
for n,a in enumerate('C C D B B C C A B B D A D C'.split(),1):
 q=qs[f'1.{n}'];prompt=q['text']
 if n==5:prompt+=' Assume reversible idealized processes when deciding whether an adiabatic process is isentropic.'
 p.mcq(f'1-{n}',prompt,bank(list('ABCD')),a,0 if n==13 else 1,q['page'])
for n,v in zip(range(15,20),[-40,-17.7777778,4.4444444,0,100]):
 q=qs[f'1.{n}'];p.frq(f'1-{n}',q['text'],f'{v:g} degrees Celsius; C=(F-32)*5/9.',1,q['page'],numeric=numeric(v,.6 if n in [16,17] else .01,['C','°C','degrees Celsius']))
p.frq('1-20',qs['1.20']['text'].split('Match the following')[0],'Unscored: cooling means dissolution absorbs heat. Depending on water-only versus solution mass convention, heat is about+3.14 or+3.86kJ; per mole about+7.98 or+9.79kJ/mol. The source negative3.9 without coherent units is not a valid unique rubric.',0,4)
for n,a in zip(range(21,26),'ECADB'):p.mcq(f'1-{n}',f'Match scientist in item 1.{n} to the A–E description in the paper.',bank(list('ABCDE')),a,1,4)
p.frq('2-DIAGRAM','Describe the ordered P–V cycle, identifying straight/curved segments and their directions. Correction: final “isochoric expansion” means heating at fixed volume back to the start.','Start at100atm,.5L. Isobaric expansion to1L, vertical cooling, isobaric expansion1.5L, vertical heating100atm, isobaric expansion2L, vertical cooling, isobaric compression1L, adiabatic compression to75atm near.299L, isothermal expansion.5L, vertical heating100atm. Five for correct relative positions and process directions; proportional credit.',5,5)
import math
R=8.314462618;atmL=101.325
# State P in atm, V in L. One mole of monatomic ideal gas.
states=[(100,.5),(100,1),(R*853.06/atmL,1)]
states.extend([(states[-1][0],1.5),(100,1.5),(100,2),(R*243.73/(2*atmL),2),(R*243.73/(2*atmL),1)])
p8,v8=states[-1];v9=v8*(p8/75)**(3/5);states.extend([(75,v9),(75*v9/.5,.5)])
for variable,indices in [('P',[3,4,7,8,10]),('V',[3,5,7,9]),('T',[1,2,4,5,6,8,9,10])]:
 for n in indices:
  pres,vol=states[n-1];value={'P':pres,'V':vol,'T':pres*vol*atmL/R}[variable];unit={'P':'atm','V':'L','T':'K'}[variable]
  tol={'P':1,'V':.01,'T':5}[variable]
  p.frq(f'2-{variable}{n}',f'Fill the {variable} blank for state {n} in the table ({unit}).',f'{value:.6g} {unit}; use PV=nRT and the stated process.',1,6,numeric=numeric(value,tol,[unit]))
heat=[];work=[]
for i,(pres,vol) in enumerate(states):
 nextp,nextv=states[(i+1)%10];du=1.5*atmL*(nextp*nextv-pres*vol)
 w=pres*(nextv-vol)*atmL if i in [0,2,4,6] else -du if i==7 else pres*vol*atmL*math.log(nextv/vol) if i==8 else 0
 q=0 if i==7 else du+w;work.append(w);heat.append(q)
 for kind,value in [('W',w),('Q',q)]:
  p.frq(f'2-{kind}{i+1}',f'Process {i+1}: {"work done by gas" if kind=="W" else "heat added to gas"} in joules. Use a negative sign for work on the gas or heat released.',f'{value:.7g} J. Ideal gas: deltaU=1.5 delta(PV), Q=deltaU+W. Isobaric W=P deltaV; isochoric W=0; adiabatic Q=0; isothermal W=PV ln(Vfinal/Vinitial).',2,6,numeric=numeric(value,max(.1,abs(value)*.02),['J','joules']))
eff=100*sum(work)/sum(q for q in heat if q>0)
p.frq('2-EFF','Calculate the thermal efficiency in percent. Show your work.','Efficiency = net work divided by total positive heat input, not net heat. Net work approximately '+str(round(sum(work)))+' J, positive heat input '+str(round(sum(q for q in heat if q>0)))+' J, efficiency '+str(round(eff,2))+'%. Ten points for correct method/result; allow consistent intermediate rounding and the source approximate25%.',10,6)
p.finish()

finish_all()
