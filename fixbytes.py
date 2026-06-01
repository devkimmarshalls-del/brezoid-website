import re

# Extract full navbar from about.html (working correctly)
with open('about.html', 'rb') as f:
    about = f.read()

# Extract everything from <nav to </nav>
nav_match = re.search(
    b'<nav id="navbar".*?</nav>',
    about,
    re.DOTALL
)

if not nav_match:
    print('Could not find navbar in about.html')
    exit()

about_nav = nav_match.group()
print('Extracted navbar from about.html:')
print('Length:', len(about_nav), 'bytes')
print('First 100:', about_nav[:100])
print()

# Now replace navbar in quote.html with about.html navbar
with open('quote.html', 'rb') as f:
    quote = f.read()

quote_nav_match = re.search(
    b'<nav id="navbar".*?</nav>',
    quote,
    re.DOTALL
)

if not quote_nav_match:
    print('Could not find navbar in quote.html')
    exit()

print('Found navbar in quote.html:')
print('Length:', len(quote_nav_match.group()), 'bytes')
print('First 100:', quote_nav_match.group()[:100])
print()

# Replace
new_quote = quote[:quote_nav_match.start()] + about_nav + quote[quote_nav_match.end():]

with open('quote.html', 'wb') as f:
    f.write(new_quote)

print('Done. quote.html navbar replaced with about.html navbar.')