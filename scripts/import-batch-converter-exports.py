"""Import approved Batch Converter ZIPs into Akoizo's graded practice catalog.

Run with --apply after checking the dry-run report. Unapproved drafts are never read.
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / 'src' / 'data' / 'batch-converter-practice-tests.json'
MAX_PDF = 50 * 1024 * 1024


def digest(value):
    encoded = json.dumps(value, sort_keys=True, ensure_ascii=False, allow_nan=False).encode()
    return hashlib.sha256(encoded).hexdigest()


def read_json(archive, name):
    member = archive.getinfo(name)
    if member.file_size > 10 * 1024 * 1024:
        raise ValueError(f'{name} is too large')
    return json.loads(archive.read(member).decode('utf-8'))


def read_bundle(path):
    identifier = path.stem
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,100}', identifier):
        raise ValueError('Invalid bundle ID')
    with zipfile.ZipFile(path) as archive:
        test = read_json(archive, identifier + '.json')
        evidence = read_json(archive, 'review-evidence.json')
        manifest = read_json(archive, 'source-manifest.json')
        if test.get('id') != identifier or test.get('gradingMode') != 'published-key':
            raise ValueError('Bundle ID or grading mode is invalid')
        if evidence.get('approvalHash') != digest(evidence.get('review')):
            raise ValueError('Review approval hash does not match')
        review = evidence['review']
        if review.get('sourceFingerprint') != digest({'version': '1.0.0', 'source': manifest}):
            raise ValueError('Review source fingerprint does not match the bundled PDFs')
        metadata = review.get('metadata', {})
        for field in ('division', 'eventId', 'competition', 'year', 'sourceUrl'):
            if metadata.get(field) != test.get(field):
                raise ValueError(f'Review and exported {field} disagree')
        if test.get('sourceId') and test['sourceId'] != metadata.get('sourceId'):
            raise ValueError('Source identity disagrees')
        assets = {}
        for role, filename, url_key in (('test', 'test.pdf', 'paperUrl'),
                                        ('key', 'key.pdf', 'keyUrl'),
                                        ('supplement', 'images.pdf', 'supplementUrl')):
            matches = [asset for asset in manifest.get('assets', []) if asset.get('role') == role]
            if len(matches) > 1:
                raise ValueError(f'Multiple {role} assets need review')
            if not matches:
                if role != 'supplement':
                    raise ValueError(f'Missing {role} asset')
                continue
            expected = f'/practice/{identifier}/{filename}'
            if test.get(url_key) != expected:
                raise ValueError(f'{url_key} does not point to the bundled PDF')
            member = archive.getinfo('public' + expected)
            if member.file_size > MAX_PDF:
                raise ValueError(f'{filename} exceeds 50 MB')
            data = archive.read(member)
            if not data.startswith(b'%PDF-') or hashlib.sha256(data).hexdigest() != matches[0].get('sha256'):
                raise ValueError(f'{filename} is not the reviewed source PDF')
            assets[filename] = data
        if set(test.get('keys', {})) != {question.get('id') for question in test.get('questions', [])}:
            raise ValueError('The published answer key does not cover every question')
        return test, assets, evidence


def validate_catalog(entries):
    with tempfile.TemporaryDirectory(dir=ROOT) as directory:
        candidate = Path(directory) / 'catalog.json'
        candidate.write_text(json.dumps(entries, ensure_ascii=False, allow_nan=False), encoding='utf-8')
        script = """import fs from 'node:fs';
import { validatePracticeCatalog } from './src/lib/practice-catalog.ts';
validatePracticeCatalog(JSON.parse(fs.readFileSync(process.argv[1], 'utf8')));
"""
        result = subprocess.run(['node', '--experimental-strip-types', '--input-type=module',
                                 '-e', script, str(candidate)], cwd=ROOT, capture_output=True, text=True)
        if result.returncode:
            raise ValueError('Akoizo rejected the combined catalog: ' + result.stderr[-500:])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('converter_home', type=Path, help='Batch Converter data folder containing exports/')
    parser.add_argument('--apply', action='store_true', help='Copy validated bundles into Akoizo')
    args = parser.parse_args()
    current = json.loads(BATCH.read_text(encoding='utf-8'))
    existing = (json.loads((ROOT / 'src/data/practice-tests.json').read_text(encoding='utf-8'))
                + json.loads((ROOT / 'src/data/imported-practice-tests.json').read_text(encoding='utf-8'))
                + current)
    ids = {test['id'] for test in existing}
    sources = {(test.get('sourceId'), test['division']) for test in existing if test.get('sourceId')}
    added = []
    skipped = []
    for path in sorted((args.converter_home / 'exports').glob('*.zip')):
        try:
            test, assets, evidence = read_bundle(path)
            source = (test.get('sourceId'), test['division'])
            if test['id'] in ids or (source[0] and source in sources):
                skipped.append((path.name, 'already in Akoizo'))
                continue
            destination = ROOT / 'public' / 'practice' / test['id']
            if destination.exists():
                raise ValueError('Destination already exists with an unrecognized test')
            ids.add(test['id'])
            if source[0]:
                sources.add(source)
            added.append((test, assets, evidence))
        except (KeyError, ValueError, zipfile.BadZipFile) as error:
            skipped.append((path.name, str(error)))
    if added:
        validate_catalog(existing + [test for test, _, _ in added])
    if args.apply:
        for test, assets, evidence in added:
            destination = ROOT / 'public' / 'practice' / test['id']
            destination.mkdir(parents=True)
            for filename, data in assets.items():
                temp = destination / (filename + '.tmp')
                temp.write_bytes(data)
                os.replace(temp, destination / filename)
            audit = ROOT / 'documents' / 'converter-reviews' / (test['id'] + '.json')
            audit.parent.mkdir(parents=True, exist_ok=True)
            audit.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        if added:
            temp = BATCH.with_suffix('.json.tmp')
            temp.write_text(json.dumps(current + [test for test, _, _ in added], ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
            os.replace(temp, BATCH)
    print(f'{"Imported" if args.apply else "Ready to import"}: {len(added)} approved tests')
    for name, reason in skipped:
        print(f'Skipped {name}: {reason}')


if __name__ == '__main__':
    main()
