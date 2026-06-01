python -c "
with open('quote.html', 'rb') as f:
    content = f.read()
import re
style_match = re.search(b'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    style = style_match.group(1)
    for m in re.finditer(b'navbar[^}]*}', style, re.DOTALL):
        print(m.group())
        print()
"