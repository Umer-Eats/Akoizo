"""Import approved converter bundles and optionally publish the validated result.

Only the converter's approved ZIPs are considered. The existing importer checks
their source hashes, review approval, answer coverage, and catalog shape.
"""

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMPORTER = ROOT / 'scripts' / 'import-batch-converter-exports.py'


def run(*args):
    executable = shutil.which(args[0])
    if not executable:
        raise ValueError(f'{args[0]} is required to publish approved tests.')
    return subprocess.run((executable, *args[1:]), cwd=ROOT, text=True, capture_output=True, check=True)


def clean_checkout():
    if Path(run('git', 'rev-parse', '--show-toplevel').stdout.strip()).resolve() != ROOT.resolve():
        raise ValueError('The chosen folder is not the Akoizo Git checkout.')
    if run('git', 'branch', '--show-current').stdout.strip() != 'main':
        raise ValueError('Automatic publishing requires the Akoizo main branch.')
    if run('git', 'status', '--porcelain').stdout.strip():
        raise ValueError('Akoizo has other local changes. Commit or review them before automatic publishing.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('converter_home', type=Path)
    parser.add_argument('--publish', action='store_true', help='Check, commit and push imports to Akoizo main')
    args = parser.parse_args()
    if args.publish:
        clean_checkout()
    preview = run(sys.executable, str(IMPORTER), str(args.converter_home))
    if 'Ready to import: 0 approved tests' in preview.stdout:
        print('No new approved tests to add.')
        return
    if 'Ready to import:' not in preview.stdout:
        raise ValueError('Could not confirm the importer preview.')
    imported = run(sys.executable, str(IMPORTER), str(args.converter_home), '--apply')
    print(imported.stdout.strip())
    if not args.publish:
        print('Imported into the local Akoizo checkout. Git publishing is disabled.')
        return
    run('npm', 'run', 'typecheck')
    run('npm', 'test')
    run('npm', 'run', 'build')
    # Next regenerates this tracked type stub during a production build.
    run('git', 'restore', '--', 'next-env.d.ts')
    run('git', 'add', '--', 'src/data/batch-converter-practice-tests.json',
        'documents/converter-reviews', 'public/practice')
    staged = run('git', 'diff', '--cached', '--name-only').stdout.strip().splitlines()
    if not staged or any(not (name == 'src/data/batch-converter-practice-tests.json'
                              or name.startswith('documents/converter-reviews/')
                              or name.startswith('public/practice/')) for name in staged):
        raise ValueError('Unexpected files were staged; automatic publishing stopped.')
    run('git', 'commit', '-m', f'Add {len(staged) - 1} approved converter assets')
    pushed = run('git', 'push', 'origin', 'main')
    print('Published approved tests to Akoizo main. ' + pushed.stderr.strip())


if __name__ == '__main__':
    try:
        main()
    except (ValueError, subprocess.CalledProcessError) as error:
        if isinstance(error, subprocess.CalledProcessError):
            detail = (error.stderr or error.stdout or '').strip()[-1600:]
            print(f'Import or publish failed: {error.cmd[0]}: {detail}', file=sys.stderr)
        else:
            print(str(error), file=sys.stderr)
        sys.exit(1)
