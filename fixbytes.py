import os, glob

BASE = os.getcwd()

replacements = [
    # Pattern in contact.html: c3a2 e282ac e2809d
    (bytes.fromhex('c3a2e282ace2809d'), b'\xe2\x80\x99'),  # -> '
    (bytes.fromhex('c3a2e282ace28094'), b'\xe2\x80\x94'),  # -> —
    (bytes.fromhex('c3a2e282ace2809c'), b'\xe2\x80\x9c'),  # -> "
    (bytes.fromhex('c3a2e282ace2809e'), b'\xe2\x80\x9e'),  # -> „
    (bytes.fromhex('c3a2e282ace280a6'), b'\xe2\x80\xa6'),  # -> …
    (bytes.fromhex('c3a2e282ace29885'), b'\xe2\x98\x85'),  # -> ★
    (bytes.fromhex('c3a2e282ac'),       b'\xe2\x80'),      # fallback
]

# Target all remaining files that may still have corruption
files = glob.glob(os.path.join(BASE, '*.html'))
files += glob.glob(os.path.join(BASE, 'services', '*.html'))
files = sorted(files)

total = 0
for filepath in files:
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    for find, replace in replacements:
        content = content.replace(find, replace)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print('Fixed: ' + os.path.relpath(filepath, BASE))
        total += 1
    else:
        print('OK:    ' + os.path.relpath(filepath, BASE))

print('')
print('Done. ' + str(total) + ' files updated.')