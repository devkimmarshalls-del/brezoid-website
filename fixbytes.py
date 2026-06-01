import os, glob

BASE = os.getcwd()

# Fix broken service links in about.html and other root pages
# They incorrectly point to index.html#services
replacements = [
    (b'href="index.html#services"', b'href="services/index.html"'),
]

files = sorted(glob.glob(os.path.join(BASE, '*.html')))

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