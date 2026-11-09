"""Render only the new 2027 rotation papers, leaving saved historical assets intact."""
import runpy
import json
import hashlib
import subprocess
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
runtime = runpy.run_path(str(ROOT / 'scripts/render-complete-practice.py'))
render, fitz = runtime['render'], runtime['fitz']
catalog = ROOT / 'src/data/rotation-practice-tests.json'
tests = json.loads(catalog.read_text(encoding='utf-8'))
report = []
stage=ROOT / 'output/practice-rotation' / ('staging-'+uuid.uuid4().hex)
publish=[]
qa = ROOT / 'output/practice-rotation/pdf-qa'
qa.mkdir(parents=True, exist_ok=True)
for test in tests:
    dest = stage / 'public/practice' / test['id']
    dest.mkdir(parents=True, exist_ok=True)
    figure_assets=[]
    for url in dict.fromkeys(q['figure']['url'] for q in test['questions'] if q.get('figure')):
        png=stage / ('public'+url)
        png.parent.mkdir(parents=True,exist_ok=True)
        source=ROOT / ('public'+url.replace('.png','.svg'))
        with fitz.open(stream=source.read_bytes(),filetype='svg') as artwork:
            with fitz.open('pdf',artwork.convert_to_pdf()) as vector:
                for word in vector[0].get_text('words'):
                    assert word[0]>=10 and word[2]<=710 and word[1]>=5 and word[3]<=395, (source,word)
                vector[0].get_pixmap(matrix=fitz.Matrix(2,2),alpha=False).save(png)
        figure_assets.append(dict(url=url,sha256=hashlib.sha256(png.read_bytes()).hexdigest(),sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),width=1440,height=800))
        publish.append([str(png),str(ROOT / ('public'+url))])
    pages = render(dest / 'test.pdf', test, test['questions'],asset_root=stage)
    for q in test['questions']:
        q['page'] = pages[q['id']]
    render(dest / 'key.pdf', test, test['questions'], key=True,asset_root=stage)
    assets = []
    for role in ['test', 'key']:
        path = dest / (role + '.pdf')
        with fitz.open(path) as doc:
            assert all(p.get_text().strip() for p in doc), path
            if role == 'test':
                assert all(1 <= q['page'] <= len(doc) for q in test['questions'])
                assert sum(len(p.get_images()) for p in doc)>=4, path
            for page in doc:
                page.get_pixmap(matrix=fitz.Matrix(.25, .25))
                for word in page.get_text('words'):
                    assert word[0] >= 35 and word[2] <= 578 and word[1] >= 20 and word[3] <= 780, (path, word)
            assets.append(dict(role=role, pages=len(doc), bytes=path.stat().st_size,
                               sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
            publish.append([str(path),str(ROOT / 'public/practice' / test['id'] / (role+'.pdf'))])
            if test['id'].endswith('form-1'):
                page=test['questions'][20]['page']-1 if role=='test' else min(len(doc)-1,test['questions'][20]['page']-1)
                doc[page].get_pixmap(matrix=fitz.Matrix(1, 1)).save(qa / (test['id'] + '-' + role + '.png'))
    report.append(dict(id=test['id'], assets=assets, figures=figure_assets))
(stage / 'rendered-catalog.json').write_text(json.dumps(tests, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(stage / 'rendered-assets.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
publish += [[str(stage/'rendered-catalog.json'),str(catalog)],[str(stage/'rendered-assets.json'),str(ROOT/'documents/practice-rotation-2027-assets.json')]]
# Publish verified files using the same file writer as the catalog builder.
subprocess.run(['node','--input-type=module','-e',"import fs from 'node:fs'; import path from 'node:path'; for(const [source,dest] of JSON.parse(fs.readFileSync(0,'utf8'))){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest);}"],input=json.dumps(publish),text=True,cwd=ROOT,check=True)
print(f'Rendered and verified {len(report)*2} PDFs; question page references and text bounds pass.')
