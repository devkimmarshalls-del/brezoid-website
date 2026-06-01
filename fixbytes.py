import os, glob

BASE = os.getcwd()

replacements = [
    # Fix service dropdown links pointing to services/index.html
    (b'href="services/index.html"',  b'href="services/tax-agent.html"'),
]

# Only fix root pages - BUT we need specific replacements per link
# So we do a targeted fix per file
def fix_service_links(content):
    # Replace each service link in order they appear
    links = [
        b'services/tax-agent.html',
        b'services/auditing.html',
        b'services/bookkeeping.html',
        b'services/accounting.html',
        b'services/tax-advisory.html',
        b'services/business-registration.html',
        b'services/forensic.html',
        b'services/international-tax.html',
    ]
    for link in links:
        content = content.replace(b'href="services/index.html"', b'href="' + link + b'"', 1)
    return content

files = ['about.html', 'contact.html', 'quote.html']
total = 0
for filepath in files:
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    content = fix_service_links(content)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print('Fixed: ' + filepath)
        total += 1
    else:
        print('OK:    ' + filepath)

print('\nDone. ' + str(total) + ' files updated.')