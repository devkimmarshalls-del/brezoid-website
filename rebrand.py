import os, re, glob

BASE = os.getcwd()

replacements = [
    ('Nexus Tax &amp; Audit LLP', 'Brezoid Global Networks Limited'),
    ('Nexus Tax & Audit LLP', 'Brezoid Global Networks Limited'),
    ('Nexus Tax &amp; Audit', 'Brezoid Global Networks Limited'),
    ('Nexus Tax & Audit', 'Brezoid Global Networks Limited'),
    ('<span class="nav-logo-wordmark">Nexus</span>', '<span class="nav-logo-wordmark">Brezoid</span>'),
    ('<span class="nav-logo-tagline">Tax &amp; Audit</span>', '<span class="nav-logo-tagline">Advisory &middot; Compliance &middot; Assurance</span>'),
    ('| Nexus Tax &amp; Audit', '| Brezoid Global Networks Limited'),
    ('| Nexus Tax & Audit', '| Brezoid Global Networks Limited'),
    ('Nexus Tax &amp; Audit', 'Brezoid Global Networks Limited'),
    ('Nexus Tax & Audit', 'Brezoid Global Networks Limited'),
    ('Nexus provides', 'Brezoid provides'),
    ('Nexus tax', 'Brezoid tax'),
    ('Nexus advises', 'Brezoid advises'),
    ('Nexus handles', 'Brezoid handles'),
    ('Nexus bookkeeping', 'Brezoid bookkeeping'),
    ('Nexus Bookkeeping', 'Brezoid Bookkeeping'),
    ('Nexus is authorised', 'Brezoid is authorised'),
    ('Nexus was founded', 'Brezoid Global Networks Limited was founded'),
    ('At Nexus,', 'At Brezoid,'),
    ('At Nexus ', 'At Brezoid '),
    ('Nexus prepares', 'Brezoid prepares'),
    ('Nexus advisory', 'Brezoid advisory'),
    ('Nexus Advisory', 'Brezoid Advisory'),
    ('by Nexus', 'by Brezoid'),
    ('with Nexus', 'with Brezoid'),
    ('from Nexus', 'from Brezoid'),
    ('+254 700 000 000', '0112 472 121'),
    ('+254 711 000 000', '0112 472 121'),
    ('tel:+254700000000', 'tel:+254112472121'),
    ('tel:+254711000000', 'tel:+254112472121'),
    ('info@nexustax.co.ke', 'operations@brezoidglobal.co.ke'),
    ('audits@nexustax.co.ke', 'operations@brezoidglobal.co.ke'),
    ('nexustax.co.ke', 'brezoidglobal.co.ke'),
    ('14th Floor, Lonrho House', 'Ecobank Towers'),
    ('Lonrho House', 'Ecobank Towers'),
    ('Standard Street, Nairobi CBD', 'Mama Ngina Street'),
    ('Standard Street', 'Mama Ngina Street'),
    ('Nairobi CBD', 'Jubilee Exchange Building, 4th Floor'),
    ('Nexus Tax &amp; Audit LLP. All rights reserved.', 'Brezoid Global Networks Limited. All rights reserved.'),
    ('Nexus Tax & Audit LLP. All rights reserved.', 'Brezoid Global Networks Limited. All rights reserved.'),
]

files = glob.glob(os.path.join(BASE, '**/*.html'), recursive=True)
files += glob.glob(os.path.join(BASE, '*.html'))
files = sorted(set(files))

total_changes = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        changes = sum(1 for a, b in zip(original.splitlines(), content.splitlines()) if a != b)
        print('Updated: ' + os.path.relpath(filepath, BASE) + ' (' + str(changes) + ' lines)')
        total_changes += 1

print('')
print('Done. ' + str(total_changes) + ' files updated.')