"""Verify normal browser downloads against Scioly's published SHA-256 metadata."""
import hashlib
import json
import shutil
from pathlib import Path
from pypdf import PdfReader

ROOT = Path('output/practice-research/division-c')
manifest_path = ROOT / 'authenticated-manifest.json'
existing = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else []
sources = json.loads((ROOT / 'browser-downloads.json').read_text(encoding='utf-8'))
for source in sources:
    matched = {}
    for name in source.get('downloadedPaths', []):
        path = Path(name)
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        reference = next((f for f in source['files'] if f['sha256'] == digest), None)
        if not reference:
            raise ValueError(f"Download does not match its archive source: {source['id']}")
        dest = ROOT / (digest + path.suffix.lower())
        if not dest.exists():
            shutil.copyfile(path, dest)
        matched[reference['sha256']] = dest.as_posix()
        if dest.suffix == '.pdf' and not dest.with_suffix('.txt').exists():
            reader = PdfReader(dest)
            dest.with_suffix('.txt').write_text('\f'.join(p.extract_text() or '' for p in reader.pages), encoding='utf-8')
    test = next((f for f in source['files'] if f['type'] == 'test'), None)
    key = next((f for f in source['files'] if f['type'] == 'answer_key'), None)
    attachments = [f for f in source['files'] if f is not test and f is not key]
    row = {k: v for k, v in source.items() if k not in ['downloadedPaths', 'downloadError']}
    if test and test['sha256'] in matched:
        row['paperPath'] = matched[test['sha256']]
    if key and key['sha256'] in matched:
        row['keyPath'] = matched[key['sha256']]
    if len(attachments) == 1 and attachments[0]['sha256'] in matched:
        row['contextPath'] = matched[attachments[0]['sha256']]
    row['state'] = 'downloaded' if all(f['sha256'] in matched for f in source['files']) else 'incomplete-download'
    row['attachmentPaths'] = [matched[f['sha256']] for f in attachments if f['sha256'] in matched]
    previous = next((s for s in existing if s['id'] == row['id']), None)
    if previous and previous.get('originalPaperPath') == row.get('paperPath'):
        row['originalPaperPath'] = previous['originalPaperPath']
        row['paperPath'] = previous['paperPath']
    existing = [s for s in existing if s['id'] != row['id']]
    existing.append(row)
manifest_path.write_text(json.dumps(existing, indent=2) + '\n', encoding='utf-8')
print('Verified', len(existing), 'archive papers; complete:', sum(s['state'] == 'downloaded' for s in existing))
