# Brezoid Global Networks Limited — Website Project

## Live Site

https://devkimmarshalls-del.github.io/brezoid-website/

## Repository

https://github.com/devkimmarshalls-del/brezoid-website

## Local Folder

E:\Work\Brezoid\Website\Brezoid-Website-v4

## Company Details

- Full name: Brezoid Global Networks Limited
- Short: Brezoid, Brezoid Global, BGNL
- Tagline: Advisory · Compliance · Assurance
- Phone: +254 112 472 121 (tel:+254112472121)
- Email: operations@brezoidglobal.co.ke
- Address: Ecobank Towers, Mama Ngina Street, Jubilee Exchange Building, 4th Floor
- P.O. Box: P.O. Box 12345-00100
- Domain: https://brezoidglobal.co.ke/
- KRA Agent: TPA/2004/0142
- Founder: Dr. Brenda Nyaboke Okerosi, CPA(K), PhD

## Tech Stack

- Plain HTML5, Tailwind CSS CDN, GSAP + ScrollTrigger CDN, Feather Icons CDN, Vanilla JS
- No build tools — pure static site
- Hosted on GitHub Pages (development preview)
- Production: cPanel / HostAfrica (manual upload of changed files)
- Git workflow: edit locally → git add -A → git commit → git push → GitHub Pages auto-deploys in ~60s

## File Structure

Brezoid-Website-v4/
index.html
about.html
contact.html
quote.html
PROJECT-CONTEXT.md
fixbytes.py
services/
index.html
tax-agent.html
auditing.html
bookkeeping.html
accounting.html
tax-advisory.html
business-registration.html
forensic.html
international-tax.html
assets/
css/
styles.css
js/
main.js
images/
Brezoid-logo-light.svg
brezoid-logo.svg

## Design System

- Primary: #113766 (navy blue)
- Primary Dark: #0b2548
- Accent: #CC9F46 (gold)
- Fonts: Cormorant Garamond (display), DM Sans (body), DM Mono (mono)
- Border radius: 4px (sm), 8px (md), 16px (lg)
- Nav height: 80px default, 64px scrolled

## Link Pattern (IMPORTANT)

All hrefs use relative paths — not absolute:

- Root pages (index/about/contact/quote): href="services/tax-agent.html"
- Service pages: href="../index.html", src="../assets/css/styles.css"
- Never use leading slash: href="/services/..." will break on local and GitHub Pages

## Logo Behaviour

- Two images stacked via CSS position:absolute crossfade
- nav-logo-img-white: opacity 1 on dark nav, opacity 0 on solid nav
- nav-logo-img-color: opacity 0 on dark nav, opacity 1 on solid nav
- Transition: 0.3s ease crossfade on scroll

## Navigation States (Fully Fixed)

| Page             | Default Class   | Behaviour                    |
| ---------------- | --------------- | ---------------------------- |
| index.html       | nav-transparent | Dark/transparent, white logo |
| about.html       | nav-solid       | White nav, colour logo       |
| contact.html     | nav-solid       | White nav, colour logo       |
| quote.html       | nav-transparent | Dark strip via body::before  |
| services/\*.html | nav-solid       | White nav, colour logo       |

### CTA Button States

- Dark nav: accent border, accent text, gold fill on hover
- White nav: accent border, primary text, gold fill on hover
- CSS at bottom of styles.css (no !important except hover)

### Phone Number States

- Dark nav: rgba(255,255,255,0.75)
- White nav: var(--ink-soft)

## Completed Work

- Full 13-page website built from scratch
- Rebranded from Nexus Tax & Audit → Brezoid Global Networks Limited
- All contact details updated (phone, email, address)
- All encoding corruption fixed sitewide (UTF-8, byte-level replacement)
- All internal links converted to relative paths
- Logo image crossfade on scroll working across all pages
- Navigation fully consistent across all 13 pages
- quote.html dark strip (body.page-quote::before) for navbar visibility
- GSAP animations working with CSS fallback (gsap-active class)
- gsap-fallback class for pages without hero-animate-items
- GitHub Pages live and auto-deploying
- fixbytes.py established as permanent reusable fix tool

## Known Remaining Issues (Start Next Session Here)

1. meta description on index.html still has â€" encoding corruption
2. about.html service dropdown links still point to index.html#services
3. Page content review needed — check all sections on all pages
4. Service pages content review (text, links, imagery)
5. Footer consistency check across all pages
6. Contact form — verify it works or needs backend
7. Quote form — verify multi-step form works correctly

## Reusable Scripts

fixbytes.py lives permanently in the project root.
Run with: python fixbytes.py

Common patterns:

- Text replacement: content.replace(b'old', b'new')
- Regex replacement: re.sub(b'pattern', b'replacement', content, re.DOTALL)
- Copy navbar between pages: extract with re.search then re.sub to replace

## Git Tags

- navigation-complete — navigation fully fixed across all pages

## Deployment Checklist (Before Going Live on cPanel)

- [ ] All links relative (run verify.py)
- [ ] UTF-8 encoding, no BOM
- [ ] Logo files in assets/images/
- [ ] No Nexus references remaining
- [ ] All encoding corruption fixed
- [ ] Git tag before deploying
- [ ] Upload to cPanel via File Manager or FileZilla
- [ ] Test all nav links, forms, and animations on live domain

## Change Log

### May 2026 — Full Build & Setup

- Built complete 13-page static website
- HTML5, Tailwind CSS, GSAP, Feather Icons, Vanilla JS
- Rebranded from Nexus to Brezoid Global Networks Limited
- Set up GitHub repo and GitHub Pages
- Connected VS Code to GitHub

### May 2026 — Content & Encoding Fixes

- Replaced all placeholder contact details
- Fixed sitewide encoding corruption using byte-level Python scripts
- Fixed all relative path links
- Fixed logo filenames and crossfade behaviour

### May 2026 — Navigation Complete

- Fixed all navbar states across 13 pages
- Consistent button and phone styling in all 4 states
- quote.html dark strip for transparent navbar
- GSAP animation fallback for inner pages
- Git tag: navigation-complete

## How to Start Next Session

Paste this file into a new Claude chat with:
"I'm continuing work on the Brezoid website. Here is my project context:"
Then describe what you want to work on next.
