import re

# Copy exact navbar from index.html to quote.html
with open('index.html', 'rb') as f:
    index = f.read()

nav_match = re.search(b'<nav id="navbar".*?</nav>', index, re.DOTALL)
if not nav_match:
    print('Navbar not found in index.html')
    exit()

index_nav = nav_match.group()

with open('quote.html', 'rb') as f:
    quote = f.read()

quote_nav = re.search(b'<nav id="navbar".*?</nav>', quote, re.DOTALL)
if not quote_nav:
    print('Navbar not found in quote.html')
    exit()

new_quote = quote[:quote_nav.start()] + index_nav + quote[quote_nav.end():]

with open('quote.html', 'wb') as f:
    f.write(new_quote)

print('Done. quote.html navbar replaced with index.html navbar.')