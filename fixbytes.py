import os, glob

BASE = os.getcwd()

replacements = [
    # Fix navbar white logo filename
    (b'brezoid-logo-light.svg',   b'Brezoid-logo-light.svg'),
    (b'Brezoid-logo.svg',         b'brezoid-logo.svg'),

    # Fix footer logo filename
    (b'Brezoid-logo-light.svg',   b'Brezoid-logo-light.svg'),

    # Fix any other variations
    (b'logo-white.svg',           b'Brezoid-logo-light.svg'),
    (b'logo-color.svg',           b'brezoid-logo.svg'),
]

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