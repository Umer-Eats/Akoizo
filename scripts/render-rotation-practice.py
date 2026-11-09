"""Render only the new 2027 rotation papers, leaving saved historical assets intact."""
import runpy
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
runtime = runpy.run_path(str(ROOT / 'scripts/render-complete-practice.py'))
render, fitz = runtime['render'], runtime['fitz']
catalog = ROOT / 'src/data/rotation-practice-tests.json'
tests = json.loads(catalog.read_text(encoding='utf-8'))
report = []
qa = ROOT / 'output/practice-rotation/pdf-qa'
qa.mkdir(parents=True, exist_ok=True)
for test in tests:
    dest = ROOT / 'public/practice' / test['id']
    dest.mkdir(parents=True, exist_ok=True)
    pages = render(dest / 'test.pdf', test, test['questions'])
    for q in test['questions']:
        q['page'] = pages[q['id']]
    render(dest / 'key.pdf', test, test['questions'], key=True)
    assets = []
    for role in ['test', 'key']:
        path = dest / (role + '.pdf')
        with fitz.open(path) as doc:
            assert all(p.get_text().strip() for p in doc), path
            if role == 'test':
                assert all(1 <= q['page'] <= len(doc) for q in test['questions'])
            for page in doc:
                page.get_pixmap(matrix=fitz.Matrix(.25, .25))
                for word in page.get_text('words'):
                    assert word[0] >= 35 and word[2] <= 578 and word[1] >= 20 and word[3] <= 780, (path, word)
            assets.append(dict(role=role, pages=len(doc), bytes=path.stat().st_size,
                               sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
            if test['id'].endswith('form-1'):
                doc[0].get_pixmap(matrix=fitz.Matrix(1, 1)).save(qa / (test['id'] + '-' + role + '.png'))
    report.append(dict(id=test['id'], assets=assets))
catalog.write_text(json.dumps(tests, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(ROOT / 'documents/practice-rotation-2027-assets.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(f'Rendered and verified {len(report)*2} PDFs; question page references and text bounds pass.')
