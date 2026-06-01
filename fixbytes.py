import os, glob

BASE = os.getcwd()

# Root pages — logo paths use assets/images/
ROOT_NAVBAR_OLD = (
    b'<div class="nav-logo-icon" aria-hidden="true"></div>'
    b'<div class="nav-logo-text">'
    b'<span class="nav-logo-wordmark">Brezoid</span>'
    b'<span class="nav-logo-tagline">Advisory &middot; Compliance &middot; Assurance</span>'
    b'</div>'
)
ROOT_NAVBAR_NEW = (
    b'<img src="assets/images/Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
    b'class="nav-logo-img nav-logo-img-white" width="160" height="38" />'
    b'<img src="assets/images/brezoid-logo.svg" alt="" aria-hidden="true" '
    b'class="nav-logo-img nav-logo-img-color" width="160" height="38" />'
)

ROOT_MOBILE_OLD = (
    b'<div class="nav-logo-icon" aria-hidden="true"></div>'
    b'<div class="nav-logo-text">'
    b'<span class="nav-logo-wordmark" style="color:var(--primary)">Brezoid</span>'
    b'<span class="nav-logo-tagline">Advisory &middot; Compliance &middot; Assurance</span>'
    b'</div>'
)
ROOT_MOBILE_NEW = (
    b'<img src="assets/images/brezoid-logo.svg" alt="Brezoid Global Networks Limited" '
    b'class="nav-logo-img" width="150" height="36" />'
)

ROOT_FOOTER_OLD = (
    b'<div class="nav-logo-icon" aria-hidden="true"></div>'
    b'<div class="nav-logo-text">'
    b'<span class="nav-logo-wordmark">Brezoid</span>'
    b'<span class="nav-logo-tagline">Advisory &middot; Compliance &middot; Assurance</span>'
    b'</div>'
)
ROOT_FOOTER_NEW = (
    b'<img src="assets/images/Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
    b'class="footer-logo-img" width="150" height="34" />'
)

# Service pages — logo paths use ../assets/images/
SVC_NAVBAR_OLD = ROOT_NAVBAR_OLD
SVC_NAVBAR_NEW = (
    b'<img src="../assets/images/Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
    b'class="nav-logo-img nav-logo-img-white" width="160" height="38" />'
    b'<img src="../assets/images/brezoid-logo.svg" alt="" aria-hidden="true" '
    b'class="nav-logo-img nav-logo-img-color" width="160" height="38" />'
)

SVC_MOBILE_OLD = ROOT_MOBILE_OLD
SVC_MOBILE_NEW = (
    b'<img src="../assets/images/brezoid-logo.svg" alt="Brezoid Global Networks Limited" '
    b'class="nav-logo-img" width="150" height="36" />'
)

SVC_FOOTER_OLD = ROOT_FOOTER_OLD
SVC_FOOTER_NEW = (
    b'<img src="../assets/images/Brezoid-logo-light.svg" alt="Brezoid Global Networks Limited" '
    b'class="footer-logo-img" width="150" height="34" />'
)

# Process root files
root_files = glob.glob(os.path.join(BASE, '*.html'))
svc_files = glob.glob(os.path.join(BASE, 'services', '*.html'))

total = 0

for filepath in sorted(root_files):
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    content = content.replace(ROOT_NAVBAR_OLD, ROOT_NAVBAR_NEW)
    content = content.replace(ROOT_MOBILE_OLD, ROOT_MOBILE_NEW)
    content = content.replace(ROOT_FOOTER_OLD, ROOT_FOOTER_NEW)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print('Fixed: ' + os.path.relpath(filepath, BASE))
        total += 1
    else:
        print('OK:    ' + os.path.relpath(filepath, BASE))

for filepath in sorted(svc_files):
    with open(filepath, 'rb') as f:
        content = f.read()
    original = content
    content = content.replace(SVC_NAVBAR_OLD, SVC_NAVBAR_NEW)
    content = content.replace(SVC_MOBILE_OLD, SVC_MOBILE_NEW)
    content = content.replace(SVC_FOOTER_OLD, SVC_FOOTER_NEW)
    if content != original:
        with open(filepath, 'wb') as f:
            f.write(content)
        print('Fixed: ' + os.path.relpath(filepath, BASE))
        total += 1
    else:
        print('OK:    ' + os.path.relpath(filepath, BASE))

print('')
print('Done. ' + str(total) + ' files updated.')