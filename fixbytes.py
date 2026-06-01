import os

with open('quote.html', 'rb') as f:
    content = f.read()

original = content

# Add nav-solid as default class on the navbar
content = content.replace(
    b'<nav id="navbar" role="navigation"',
    b'<nav id="navbar" class="nav-solid" role="navigation"'
)

# In case it already has a class attribute
content = content.replace(
    b'<nav id="navbar" class="" role="navigation"',
    b'<nav id="navbar" class="nav-solid" role="navigation"'
)

if content != original:
    with open('quote.html', 'wb') as f:
        f.write(content)
    print('Fixed: quote.html')
else:
    # Find the exact navbar tag to debug
    import re
    m = re.search(b'<nav id="navbar"[^>]*>', content)
    if m:
        print('Current navbar tag:', m.group())
    else:
        print('navbar tag not found')