#!/usr/bin/env python3
"""Build the redesign and publish its generated files to the GitHub Pages root."""
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def promote():
    subprocess.run([sys.executable, str(ROOT / 'tools/build_redesign_content.py')], check=True)
    subprocess.run([sys.executable, str(ROOT / 'tools/build_production_site.py'), 'dist'], check=True)
    subprocess.run([sys.executable, str(ROOT / 'tools/validate_accessibility.py'), 'dist'], cwd=ROOT, check=True)
    output = ROOT / 'dist'
    files = sorted(path for path in output.rglob('*') if path.is_file())
    for path in files:
        target = ROOT / path.relative_to(output)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
    # GitHub Pages serves these generated files directly, without Jekyll processing.
    (ROOT / '.nojekyll').touch()
    print(f'Published {len(files)} production files to the repository root')


if __name__ == '__main__':
    promote()
