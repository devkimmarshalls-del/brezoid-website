import os

BASE = os.getcwd()

# Add Get a Quote button to quote.html navbar
# Find the phone number link and insert the button after it

with open('quote.html', 'rb') as f:
    content = f.read()

original = content

# Find the phone link in the nav and add the CTA button after it
old = (
    b'<a href="tel:+254112472121" class="hidden lg:flex items-center gap-2" '
    b'style="color:var(--muted);font-family:var(--font-mono);font-size:0.78rem;" '
    b'aria-label="Call us">'
    b'<svg data-feather="phone" width="13" height="13" aria-hidden="true"></svg>'
    b'+254 112 472 121</a>'
)

new = old + (
    b'\r\n        '
    b'<a href="quote.html" class="nav-cta nav-cta-solid">Get a Quote</a>'
)

content = content.replace(old, new)

if content != original:
    with open('quote.html', 'wb') as f:
        f.write(content)
    print('Fixed: quote.html')
else:
    print('Pattern not found - checking alternate format...')
    # Try alternate spacing
    idx = content.find(b'+254 112 472 121</a>')
    if idx != -1:
        insert_after = idx + len(b'+254 112 472 121</a>')
        button = b'\r\n        <a href="quote.html" class="nav-cta nav-cta-solid">Get a Quote</a>'
        content = content[:insert_after] + button + content[insert_after:]
        with open('quote.html', 'wb') as f:
            f.write(content)
        print('Fixed: quote.html (alternate method)')
    else:
        print('Could not find insertion point')