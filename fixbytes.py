import os
from pathlib import Path

extensions = ['.html', '.css', '.js']
replacements = [
    (b'20+ Years', b'6+ Years'),
    (b'20+ years', b'6+ years'),
    (b'20+\nYears', b'6+\nYears'),
    (b'data-count="20"', b'data-count="6"'),
]

files_changed = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ['_backups', '.git', 'node_modules']]
    for fname in files:
        if any(fname.endswith(ext) for ext in extensions):
            path = Path(root) / fname
            content = path.read_bytes()
            new = content
            for old, new_val in replacements:
                new = new.replace(old, new_val)
            if new != content:
                path.write_bytes(new)
                files_changed.append(str(path))
                print(f"  [updated] {path}")

if not files_changed:
    print("  Nothing to change")
else:
    print(f"\nDone. {len(files_changed)} file(s) updated")