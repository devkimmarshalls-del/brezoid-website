import re

with open('quote.html', 'rb') as f:
    content = f.read()

original = content

content = content.replace(
    b'<nav id="navbar" class="nav-solid" role="navigation"',
    b'<nav id="navbar" class="nav-transparent" role="navigation"'
)

content = content.replace(
    b'<body class="font-body">',
    b'<body class="font-body page-quote">'
)

if content != original:
    with open('quote.html', 'wb') as f:
        f.write(content)
    print('Fixed: quote.html')
else:
    print('Pattern not found')