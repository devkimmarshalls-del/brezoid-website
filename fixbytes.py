import os, glob

BASE = os.getcwd()

replacements = [
    # Pattern specific to international-tax.html
    # c3a2 e2809a c2ac = corrupted character sequence
    (bytes.fromhex('c3a2e2809ac2ac'), b'\xe2\x80\x94'),  # -> —

    # Catch all remaining c3a2 variants not yet covered
    (bytes.fromhex('c3a2e2809a'),     b'\xe2\x80'),
    (bytes.fromhex('c3a2c2809a'),     b'\xe2\x80'),
    (bytes.fromhex('c3a2c282'),       b'\xe2\x82'),
]

# Only target the remaining file
files = ['services/international-tax.html']

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
        print('Fixed: ' + filepath)
        total += 1
    else:
        print('OK:    ' + filepath)

print('')
print('Done. ' + str(total) + ' files updated.')