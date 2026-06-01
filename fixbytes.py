import re

# Extract the full working navbar from index.html
with open('index.html', 'rb') as f:
    index = f.read()

nav_match = re.search(b'<nav id="navbar".*?</nav>', index, re.DOTALL)
if not nav_match:
    print('Navbar not found in index.html')
    exit()

index_nav = nav_match.group()
print('Extracted from index.html, length:', len(index_nav))

# Also extract mobile overlay and mobile menu
overlay_match = re.search(
    b'<div class="nav-mobile-overlay".*?</div>',
    index, re.DOTALL
)
mobile_match = re.search(
    b'<div class="nav-mobile-menu".*?</div>\s*\n\s*<main',
    index, re.DOTALL
)

# Pages to fix — root pages only (services handled separately)
pages = ['about.html', 'contact.html']

for page in pages:
    with open(page, 'rb') as f:
        content = f.read()
    original = content

    # Replace navbar
    page_nav = re.search(b'<nav id="navbar".*?</nav>', content, re.DOTALL)
    if page_nav:
        content = content[:page_nav.start()] + index_nav + content[page_nav.end():]
        print('Replaced navbar in:', page)
    else:
        print('Navbar not found in:', page)

    if content != original:
        with open(page, 'wb') as f:
            f.write(content)

print('\nDone.')