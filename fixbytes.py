import os, glob, re

BASE = os.getcwd()

def fix_file(filepath, is_service):
    prefix = b'../assets/images/' if is_service else b'assets/images/'

    with open(filepath, 'rb') as f:
        content = f.read()
    original = content

    # Replace desktop navbar logo (handles any whitespace between elements)
    content = re.sub(
        b'<div class="nav-logo-icon"[^>]*></div>\\s*'
        b'<div class="nav-logo-text">\\s*'
        b'<span class="nav-logo-wordmark"[^>]*>Brezoid</span>\\s*'
        b'<span class="nav-logo-tagline">[^<]*</span>\\s*'
        b'</div>',
        b'<img src="' + prefix + b'Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
        b'class="nav-logo-img nav-logo-img-white" width="160" height="38" />'
        b'<img src="' + prefix + b'brezoid-logo.svg" alt="" aria-hidden="true" '
        b'class="nav-logo-img nav-logo-img-color" width="160" height="38" />',
        content
    )

    # Replace mobile menu logo (has inline style on wordmark)
    content = re.sub(
        b'<div class="nav-logo-icon"[^>]*></div>\\s*'
        b'<div class="nav-logo-text">\\s*'
        b'<span class="nav-logo-wordmark" style="[^"]*">Brezoid</span>\\s*'
        b'<span class="nav-logo-tagline">[^<]*</span>\\s*'
        b'</div>',
        b'<img src="' + prefix + b'brezoid-logo.svg" alt="Brezoid Global Networks Limited" '
        b'class="nav-logo-img" width="150" height="36" />',
        content
    )

    # Replace footer logo
    content = re.sub(
        b'<div class="nav-logo-icon"[^>]*></div>\\s*'
        b'<div class="nav-logo-text">\\s*'
        b'<span class="nav-logo-wordmark"[^>]*>Brezoid</span>\\s*'
        b'<span class="nav-logo-tagline">[^<]*</span>\\s*'
        b'</div>',
        b'<img src="' + prefix + b'Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
        b'class="footer-logo-img" width="150" height="34" />',
        content
    )

    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print('Fixed: ' + os.path.relpath(filepath, BASE))
    else:
        print('OK:    ' + os.path.relpath(filepath, BASE))

root_files = sorted(glob.glob(os.path.join(BASE, '*.html')))
svc_files  = sorted(glob.glob(os.path.join(BASE, 'services', '*.html')))

for f in root_files:
    fix_file(f, is_service=False)
for f in svc_files:
    fix_file(f, is_service=True)

print('\nDone.')