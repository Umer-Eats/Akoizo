"""Reviewed, offline expansion from the batch exchanger's immutable source PDFs.

No provider calls, student records, or converter state are modified. Run with the
converter data folder as the sole argument. Source hashes are checked before copy.
"""
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[1]
HOME = Path(sys.argv[1])
OUT = ROOT / 'output/practice-research/nov8'
ADDED = []
EVIDENCE = []


def clean(s):
    return s.replace('\u200b', '').replace('\ufeff', '').replace('\u00ad', '')


def source(identifier):
    s = json.loads((HOME / 'queue' / (identifier + '.json')).read_text(encoding='utf-8'))
    for a in s['assets']:
        if not a.get('path') or not (HOME / a['path']).is_file():
            continue
        data = (HOME / a['path']).read_bytes()
        assert hashlib.sha256(data).hexdigest() == a['sha256'], a['name']
    return s


def pages(s, role):
    a = next(a for a in s['assets'] if a['role'] == role)
    with fitz.open(HOME / a['path']) as doc:
        return [clean(p.get_text(sort=True)) for p in doc]


def numbered(pp, first=1):
    # A page-anchored source number; never treat option letters as questions.
    text = '\n\f\n'.join(pp[first:])
    matches = list(re.finditer(r'(?m)^[ \t]*(\d{1,3})[.)][ \t]*', text))
    result = {}
    for i, m in enumerate(matches):
        n = int(m[1])
        assert n not in result, f'Repeated number {n}; split sections explicitly.'
        body = text[m.end():matches[i+1].start() if i+1 < len(matches) else len(text)]
        body = re.sub(r'(?m)^\s*(?:Page \d+|\d+)\s*$', '', body)
        result[n] = (first + 1 + text[:m.start()].count('\f'), re.sub(r'\s+', ' ', body).strip())
    return result


def base(s, year, topics, difficulty, reason, match='current'):
    return dict(id=s['id'], sourceId=s['sourceId'], sourceUrl=s['sourceUrl'],
                eventId=s['eventId'], division=s['division'], competition=s['competition'],
                year=year, season=2027, reviewedOn='2026-11-08',
                level=None, levelEvidence=None, difficulty=difficulty, difficultyReason=reason,
                topics=topics, topicMatch=match,
                alignment=('Covers the current broad subject areas; older rules and individual question scope may differ.'
                           if match == 'current' else 'Historical topic rotation; use for the topics listed, not as a complete 2027 simulation.'),
                rulesUrl=f'/rules/2027/{s["division"].lower()}/{s["eventId"]}.pdf',
                paperUrl=f'/practice/{s["id"]}/test.pdf', keyUrl=f'/practice/{s["id"]}/key.pdf',
                gradingMode='published-key', minutes=50, questions=[], keys={},
                instructions='Use the complete original PDF for all figures, tables, and question context. Answer every labeled part. Written explanations may need Auto Grade or instructor rubric review.')


def frq(t, identifier, page, prompt, answer, points=1, accepted=None, numeric=None):
    identifier = str(identifier)
    t['questions'].append(dict(id=identifier, label=identifier, page=page, type='frq', points=points, prompt=prompt))
    c = dict(id='answer', points=points, answer=answer, accepted=accepted or [])
    if numeric is not None:
        value, tolerance, units = numeric
        c['numeric'] = dict(value=value, tolerance=tolerance, units=units, unitRequired=False)
    t['keys'][identifier] = dict(criteria=[c])


def mcq(t, n, page, body, answer, points=1, multiple=False, alternatives=None):
    # Layout extraction may lose superscripts; the original PDF remains authoritative.
    opts = list(re.finditer(r'(?<!\w)([a-eA-E])[.)]\s+', body))
    opts = opts[next(i for i,m in enumerate(opts) if m[1].upper() == 'A'):]
    assert len(opts) >= 2, (n, body)
    ids = [m[1].upper() for m in opts]
    assert len(ids) == len(set(ids)), (n, body)
    q = dict(id=str(n), label=str(n), page=page, type='mcq', points=points,
             prompt=body[:opts[0].start()].strip(),
             options=[dict(id=m[1].upper(), text=body[m.end():opts[i+1].start() if i+1<len(opts) else len(body)].strip()) for i,m in enumerate(opts)])
    if multiple:
        q['multiple'] = True
        key = dict(correctOptions=list(answer))
    else:
        key = dict(correctOption=answer)
    if alternatives:
        key['acceptedOptions'] = alternatives
    assert set(answer) <= set(ids)
    t['questions'].append(q)
    t['keys'][str(n)] = key


def save(t, s, note, excluded=None):
    t['questionCount'] = len(t['questions'])
    t['maxScore'] = sum(q['points'] for q in t['questions'])
    assert len({q['id'] for q in t['questions']}) == t['questionCount']
    t['scoringBasis'] = note
    assets = []
    dest = ROOT / 'public/practice' / t['id']
    dest.mkdir(parents=True, exist_ok=True)
    for role, name in [('test', 'test.pdf'), ('key', 'key.pdf')]:
        a = next(a for a in s['assets'] if a['role'] == role)
        shutil.copyfile(HOME / a['path'], dest / name)
        assets.append({k:a[k] for k in ['role', 'name', 'sha256']})
    ADDED.append(t)
    EVIDENCE.append(dict(id=t['id'], sourceUrl=s['sourceUrl'], assets=assets,
                         review='Offline source transcription and scoring review', reviewedOn=t['reviewedOn'],
                         scoringBasis=note, excluded=excluded or []))


# Raleigh/NCSU: complete numbered MCQ paper and explicit two-column key.
s = source('scioly-wpknin0qxmq-b')
t = base(s, 2026, ['plant anatomy', 'photosynthesis', 'plant reproduction', 'agriculture', 'genetics'], 'Medium',
         'Mixes plant identification diagrams, botanical terminology, photosynthesis, genetics, and crop applications.')
qq = numbered(pages(s, 'test'))
kk = {int(n):a.upper() for n,a in re.findall(r'(\d+)\.\s*([a-d])\b', '\n'.join(pages(s,'key')))}
assert set(qq) == set(kk) == set(range(1,71))
for n,(p,b) in qq.items():
    # Multiple defensible options or imprecise claim in the original: retain as unscored practice.
    if n in [4,9,14,21,57,60,66]:
        frq(t,n,p,b,'Unscored: source wording or answer alternatives do not support a unique, reliable grade. Consult the original key critically.',0)
    else:
        mcq(t,n,p,b,kk[n])
save(t,s,'Practice weighting: one point per scored response; the source does not specify item weights. All 70 questions retained. Questions 4, 9, 14, 21, 57, 60 and 66 are unscored because of multiple defensible answers, ambiguous regional/time-dependent claims, or imprecise wording. Figure questions use the original PDF. Broad subject alignment only; original restrictions differ.')

# Pembroke: written section only; date is printed on the cover, not season label.
s = source('scioly-dz8-ypn7zj8-b')
t = base(s,2025,['DC circuits','electrostatics','magnetism','electrical components'],'Medium',
         'Combines series/parallel calculations, capacitor charge, internal resistance, and component applications.')
qq = numbered(pages(s,'test'))
answers = {1:('2.0 A',2,.02,['A','amps']),2:('4.0 V',4,.02,['V','volts']),3:('5.33 W',16/3,.03,['W','watts']),4:('0.59 ohms',.5/.85,.01,['ohms','Ω']),5:('4800 microcoulombs (4.8 mC)',4800,1,['microC','µC']),6:('12 V',12,.02,['V']),7:('$0.36',.36,.005,['dollars']),11:('12 V',12,.02,['V'])}
short={8:['False','F'],10:['South','South pole'],13:['Parallel'],14:['Counterclockwise','Counter-clockwise','CCW'],15:['Thomas Edison','Edison'],16:['GFCI','Ground fault circuit interrupter'],17:['Higher'],21:['Variable resistor','Potentiometer','Rheostat'],22:['They all go out'],23:['AND','AND gate'],24:['Shorted','Short circuit'],26:['Connected'],30:['False','F']}
mck={9:'B',12:'A',18:'A',19:'B',20:'B',25:'B',27:'B',31:'C',32:'B',33:'D',34:'B'}
for n in range(1,36):
    p,b=qq[n]
    pts=2 if n in list(range(1,8))+[11,28,29] else 1
    if n in mck: mcq(t,n,p,b,mck[n],pts,alternatives=['B','D'] if n==33 else None)
    elif n in answers:
        a,v,tol,u=answers[n];frq(t,n,p,b,a,pts,numeric=(v,tol,u))
    elif n in short:frq(t,n,p,b,short[n][0],pts,short[n])
    elif n==28:frq(t,n,p,b,'Shorter leg: cathode (negative); longer leg: anode (positive).',2)
    elif n==29:frq(t,n,p,b,'Idealized source answer: No; I=P/V=600/120=5 A, exactly at the rating. Real fuse operation also depends on its time-current curve.',2)
    else:frq(t,n,p,b,'Unscored: the source keys D, but number of turns affects an electromagnet; the stated alternatives do not support that key.',0)
save(t,s,'Written questions 1–35 retained, with printed weights; hands-on 36–39 excluded (physical apparatus and measurements required). Q33 accepts both B and D: W/A and J/C both equal volts. Q35 is unscored because its published D answer conflicts with the dependence on number of turns. Q29 uses the source idealization, not a prediction about a real fuse. 2025 cover date overrides the 2026 archive season. Unrelated raw-score PDF omitted; blank answer sheet is not needed for the written questions.')

# Little Tiger Thermodynamics: published 30-MCQ + three 3-point responses.
s=source('scioly-p6s6szpywts-b')
t=base(s,2018,['temperature','heat transfer','thermodynamic laws','phase changes'],'Medium',
       'Mixes direct conceptual questions with conduction, calorimetry, internal energy, and thermal expansion calculations.')
qq=numbered(pages(s,'test'))
letters='B A D A D A B B A C A B B B A A C B B D E A C C A A A B D C'.split()
assert set(qq)==set(range(1,34))
for n in range(1,31):
    p,b=qq[n]
    if n==24:
        frq(t,n,p,b,'Unscored: the published key says C (isothermal), while constant volume (D, isochoric) prevents boundary p–V work. The absolute claim about all forms of work is also too broad.',0)
    elif n==30:
        frq(t,n,p,b,'Unscored: the source attributes this Kelvin–Planck statement to Clausius. Conflicting attribution is not graded.',0)
    else:mcq(t,n,p,b,letters[n-1])
frq(t,31,*qq[31],'86 °C; energy balance between tea and cup.',3,numeric=(86,.6,['°C','C']))
frq(t,32,*qq[32],'Unscored: published 5.0×10^5 J is less than the latent heat alone (16.50×88,000 J); the question does not provide the melting temperature needed to reproduce a full solution.',0)
frq(t,33,*qq[33],'4.3×10^-3 m (gap at 20 °C for expansion to 50 °C).',3,numeric=(.0043,.0001,['m']))
save(t,s,'All 33 numbered items retained. Printed weights: MCQ 1 each and written 3 each. Q24, Q30 and Q32 unscored for inconsistent key/wording or missing melting-temperature data. The unrelated football tiebreaker is omitted. Q33 follows expansion from installation at 20 °C to 50 °C. Full original heating-curve diagram retained.')

# Short historic Food Science paper: keep disputed answers unscored rather than copying errors.
s=source('scioly-tj8pj0wzt-s-b')
s['competition']='Scioly Food Science Minitest 1'
t=base(s,2013,['food chemistry','carbohydrates','emulsions','nutrition'],'Easy',
       'A short mix of food-chemistry recall, reducing sugars, density, and nutrition-label arithmetic.',match='different')
qq=numbered(pages(s,'test'),first=0)
for n in range(1,10):
    p,b=qq[n]
    if n==1:frq(t,n,p,b,'Emulsifiers',1,['Emulsifier','Emulsifiers'])
    elif n==3:mcq(t,n,p,b,'AC',1,multiple=True)
    elif n in [4,5]:mcq(t,n,p,b,{4:'B',5:'C'}[n])
    elif n==7:frq(t,n,p,b,'Aspartame',1,['Aspartame'])
    elif n==9:frq(t,n,p,b,'58 Calories (half of the source label’s 116-Calorie serving, using its standard 4/4/9 factors).',1,numeric=(58,.01,['Calories','kcal']))
    else:frq(t,n,p,b,{2:'Unscored: acetic acid is not an amino acid; published key A conflicts with the question.',6:'Unscored: the key labels “Base” as B, but Base is option A in the paper.',8:'Unscored: the key reports volume/100 rather than density. Using the printed values gives approximately 0.55 g/cm³.'}[n],0)
save(t,s,'Practice weighting: one point per reliable response; source item weights not specified. All nine items retained. Q2, Q6 and Q8 unscored because the published key is inconsistent with the paper or its arithmetic. Historical general food chemistry/baking, not the 2027 dairy rotation. No tournament name is claimed; the archive does not report one.')

# Scanned Archimedean Codebusters: original page/weight mappings visually reviewed.
s=source('scioly-os4feum0a2o-b')
t=base(s,2026,['Aristocrat','Patristocrat','Baconian','Nihilist','Fractionated Morse','cryptarithm','columnar','Porta'],'Hard',
       'Includes multiple cipher families, Spanish text, cryptarithms, columnar transposition, and Fractionated Morse with cribs.')
kk=numbered(pages(s,'key'),first=0)
weights=[250,0,273,131,278,174,153,294,274,244,401,241,233,262,276,266,284,322,373,193,242,231,344,352,277,371,181]
page_map={1:2,**{n:3 for n in range(3,7)},**{n:4 for n in range(7,11)},**{n:5 for n in range(11,15)},**{n:6 for n in range(15,19)},**{n:7 for n in range(19,23)},**{n:8 for n in range(23,26)},26:9,27:9}
assert set(kk)==set(range(1,28))
for n in range(1,28):
    if n==2:continue  # No puzzle 2 exists on the supplied student PDF.
    answer=kk[n][1]
    frq(t,n,page_map[n],f'Decode puzzle {n} in the original PDF. Enter the complete plaintext (or the requested decoded words for a cryptarithm).',answer,weights[n-1])
    t['keys'][str(n)]['criteria'][0]['cipher']=dict(solution=answer,freeErrors=2,penaltyPerError=100)
save(t,s,'Published base puzzle weights from the scanned student paper. Puzzle 2 is absent from the supplied student PDF and is excluded despite appearing in the key. Includes timed puzzle base score only; no proctor-dependent timing or aggregate special bonuses. Current plaintext scoring: two free character errors, then 100-point deductions; spacing, punctuation and case ignored. Key-only answers are never shown before submission. Original cipher grids remain in the embedded source PDF.',[2])

# Staten Island CSE: complete illustrated 17-station paper and published item weights.
s=source('scioly-fmnnyytasp0-c')
t=base(s,2025,['mineral properties','rock cycle','igneous structures','relative dating','specimen identification'],'Hard',
       'Seventeen image-based stations combine optical properties, deposition environments, rock history and geological interpretation.')
qq=numbered(pages(s,'test'))
kk=numbered(pages(s,'key'))
for n in range(77,87):qq[n]=(18,'Identify the numbered rapid-ID specimen in the original PDF.')
for n in [69,71]:qq[n]=(16,'Identify the pictured environment of deposition.')
assert set(qq)==set(kk)==set(range(1,87)), (sorted(qq), sorted(kk))
# Explicit source weights; remaining items are 2 points each.
wp={1:5,23:4,27:4,33:4,38:4,51:4,52:8,55:4,56:5,72:4,73:9,**{n:1 for n in range(77,87)}}
for n in range(1,87):
    p,b=qq[n]
    # Remove next station heading/header from the preceding answer/prompt.
    b=re.split(r'STATION \d+',b)[0].strip()
    a=re.split(r'STATION \d+',kk[n][1],flags=re.I)[0].strip()
    a=re.sub(r'ROCKS & MINERALS.*?Staten Island Technical High School','',a).strip()
    if n in [9,34,63]:
        a={9:'Unscored: the supplied piezoelectric key B and C is not a reliable property match for the identified galena/stibnite specimens.',34:'Unscored: the key attributes rotten-egg smell and taste to sulfur, conflating elemental sulfur with hydrogen sulfide. Do not taste specimens.',63:'Unscored: source keys volcanic neck as extrusive, although it is solidified conduit material exposed by erosion.'}[n]
        pts=0
    else:pts=wp.get(n,2)
    if n==52:a='Discontinuous: olivine → pyroxene → amphibole → biotite (2); continuous Ca-rich anorthite → Na-rich oligoclase plagioclase (2); residual K-feldspar, muscovite, quartz (2); temperature decreases and silica increases from ultramafic/mafic to felsic rock types (2). A labeled textual sequence is accepted instead of drawing.'
    if n==56:a='Five missing chart terms, one point each: sediments; sedimentary rock; metamorphic rock; magma; igneous rock. Place each at the correct position in the source diagram.'
    if n==2:a='B — Halite (2).'
    if n==29:a='C — Rhodochrosite (2).'
    if n>=68 and n<=71:b=f'Identify the environment of deposition in photograph {n} on PDF page {p}.'
    if n>=77:b=f'Identify specimen {n} in the rapid-ID images on PDF page {p}.'
    frq(t,n,p,b,a,pts)
save(t,s,'All 86 numbered questions and original illustrations retained. Printed item weights total 195 before exclusions; Q9 (piezoelectric mismatch), Q34 (sulfur/H₂S confusion), and Q63 (volcanic-neck classification) are unscored. Matching and multipart answers use the published rubric; drawings accept equivalent labeled text. The source uses 2025 mineral lists; 2027 species/subtopic coverage may differ. Source cover is CSE 2025, overriding the archive’s 2026 season label.')

# Fairfax's self-contained written questions. No absent lab samples are invented.
s=source('scioly-t-bhel1zl1m-c')
t=base(s,2017,['qualitative analysis','polymers','hair and fibers','chromatography','mass spectrometry','PCR'],'Medium',
       'Interprets polymer structures, microscopy images, chromatograms and a mass spectrum alongside forensic chemistry and PCR concepts.')
pp=pages(s,'test')
# IDs use section and within-page order, because the source questions are unnumbered.
sections={3:('chemistry','BBC AACC'.replace(' ','')),4:('plastic','DBBB'),5:('hair','CAADBC'),6:('fiber','ACDADCC'),7:('chromatography','AACB'),9:('dna','DDBADB')}
excluded=[]
for page,(section,key) in sections.items():
    text=re.split(r'TEAM #',pp[page-1])[0]
    blocks=re.split(r'(?m)^\s*_{3,}\s*',text)[1:]
    assert len(blocks)==len(key),(page,len(blocks),len(key))
    for i,b in enumerate(blocks,1):
        identifier=f'{section}-{i}'
        if (page in [5,6] and i<=3) or (page==9 and i==1):
            excluded.append(identifier);continue
        b=re.sub(r'\s+',' ',b).strip()
        points=3 if page==7 and i==1 else 2 if page==7 and i==2 else 1
        # Chemistry's final question has more than one plausible basic substance.
        if page==3 and i==7:
            frq(t,identifier,page,b,'Unscored: the source keys sodium carbonate, but calcium carbonate can also produce alkaline water; the single-choice alternatives are ambiguous.',0)
        else:mcq(t,identifier,page,b,key[i-1],points)
frq(t,'mass-1',8,'What is the m/z of the base peak in the spectrum on PDF page 8?',
    'Unscored: the published key says 46, but the tallest plotted peak is at m/z 31. The two numerical key entries appear reversed.',0)
frq(t,'mass-2',8,'What is the mass of the molecule shown in the mass spectrum on PDF page 8?',
    'Unscored: the published key says 31, but the circled ethanol structure and molecular-ion peak correspond to nominal mass 46. The two numerical key entries appear reversed.',0)
frq(t,'mass-3',8,'Which pictured structure matches the mass spectrum? Give its name or describe its position on PDF page 8.',
    'Ethanol; the first/leftmost structure, CH3CH2OH.',1,['Ethanol','CH3CH2OH','First structure','Leftmost structure'])
save(t,s,'Self-contained written section, using printed raw item points rather than the original section-weighted /100 total. Excludes the three physical powders, three suspect hair IDs, three suspect fiber IDs, suspect DNA comparison, shoe-comparison tasks and final suspect analyses: required samples/electropherograms/impressions are not supplied. Original microscopy, polymer and chromatogram figures remain in the full PDF. Chemistry item 7 is unscored for multiple basic substances; mass-spectrum numerical keys appear reversed and are unscored. Source third suspect-fiber question repeats “suspect 1”; it is excluded. No absent physical observations are fabricated.',excluded)

# Brown Rocks: station-local numbering, explicit student weights, original images.
s=source('scioly-9gdab8vmnhi-b')
t=base(s,2025,['mineral identification','rock identification','mineral chemistry','rock cycle','relative dating','depositional environments'],'Hard',
       'Eighteen illustrated stations combine specimen identification, mineral chemistry, crystallization, relative dating and deposition.')
def station_blocks(page_list):
    text='\n\f\n'.join(page_list)
    hs=list(re.finditer(r'(?im)^[ \t]*Station (\d+)[ \t]*$',text))
    out={}
    for i,h in enumerate(hs):
        end=hs[i+1].start() if i+1<len(hs) else len(text)
        body=text[h.end():end]
        ms=list(re.finditer(r'(?m)^[ \t]*([1-9]\d*)[.)][ \t]*',body))
        out[int(h[1])]=[(int(m[1]),1+text[:h.end()+m.start()].count('\f'),re.sub(r'\s+',' ',re.sub(r'(?m)^\s*Page \d+\s*$','',body[m.end():ms[j+1].start() if j+1<len(ms) else len(body)])).strip()) for j,m in enumerate(ms)]
    return out
qs=station_blocks(pages(s,'test'));ks=station_blocks(pages(s,'key'))
assert len(qs)==len(ks)==18
unscored={(2,10),(2,11),(6,3),(6,5),(15,1),(16,1),(17,1),(17,2)}
for station,rows in qs.items():
    for idx,(n,page,b) in enumerate(rows):
        identifier=f's{station}-{n}'
        weight=re.search(r'^\((\d+(?:\.\d+)?) points?\)',b)
        assert weight,(station,n,b)
        pts=float(weight[1]);b=b[weight.end():].strip()
        if station==18:
            answer='Numbered deposition labels (0.5 each): 1 submarine fan; 2 abyssal plain; 3 reef; 4 beach; 5 dune; 6 glacier; 7 alluvial fan; 8 flood plain; 9 river channel; 10 delta; 11 lagoon; 12 bar; 13 continental shelf; 14 submarine canyon; 15 continental slope; 16 lake.'
        else:
            assert len(rows)==len(ks[station]),station
            answer=ks[station][idx][2]
        if (station,n) in unscored:
            answer='Unscored: source key and student prompt disagree, scientific claim is unreliable, or diagram-only rubric has not been transcribed reliably. Original source key remains available for critical review.'
            pts=0
        frq(t,identifier,page,b,answer,pts)
save(t,s,'All 124 station questions retained with original illustrated test. Student-paper weights control where key annotations differ (for example station 1 question 2). Key subpart numbering restarts for stations 2, 4 and 6; answer mappings follow source order. Station 2 questions 10–11 have a mismatched key. Station 6 questions 3 and 5 have unreliable polymorphism/lead-detection claims. Station 15 question 1, station 16 question 1 and station 17 questions 1–2 remain unscored pending reliable diagram/rubric reconciliation. Source “Fluoraparite” spelling remains in station 11 rubric. Written rubrics require semantic/instructor review; original image identifications are not replaced by invented specimens. Cover date December 7, 2025 overrides 2026 season label.')


def main():
    path=ROOT/'src/data/imported-practice-tests.json'
    raw=path.read_text(encoding='utf-8')
    original=json.loads(raw)
    replacements={t['id']:t for t in ADDED}
    # Preserve every unrelated paper's exact formatting as well as its values.
    decoder=json.JSONDecoder();pos=raw.index('[')+1;chunks=[]
    for entry in original:
        while raw[pos] in ' \r\n\t,':pos+=1
        _,end=decoder.raw_decode(raw,pos)
        if entry['id'] not in replacements:chunks.append(raw[pos:end])
        pos=end
    chunks += [json.dumps(t,ensure_ascii=False,indent=2).replace('\n','\n  ') for t in ADDED]
    path.write_text('[\n  '+',\n  '.join(chunks)+'\n]\n',encoding='utf-8')
    report=ROOT/'documents/practice-expansion-nov2026.json'
    report.write_text(json.dumps(EVIDENCE,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for t in ADDED:print(t['id'],t['division'],t['eventId'],t['questionCount'],t['maxScore'])


if __name__=='__main__':main()
