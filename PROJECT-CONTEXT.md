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

## Git Workflow Notes

- Windows CRLF issue: always use `git config core.autocrlf false` before staging, then restore with `git config core.autocrlf true` after push
- All Python patches go into `fixbytes.py` — overwrite each session, run with `python fixbytes.py`
- Backups auto-created in `_backups/` folder — ignored by git via `.gitignore`

## File Structure

Brezoid-Website-v4/
index.html
about.html
contact.html
quote.html
PROJECT-CONTEXT.md
fixbytes.py
.gitignore
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
    telitraq.png       ← client logo (grayscale, transparent bg)
    arcbit.png         ← client logo (grayscale, transparent bg)
    carrums.png        ← client logo (grayscale, transparent bg)
    lyvios.png         ← client logo (grayscale, transparent bg)

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
| services/*.html  | nav-solid       | White nav, colour logo       |

### CTA Button States

- Dark nav: accent border, accent text, gold fill on hover
- White nav: accent border, primary text, gold fill on hover
- CSS at bottom of styles.css (no !important except hover)

### Phone Number States

- Dark nav: rgba(255,255,255,0.75)
- White nav: var(--ink-soft)

## Hero Section (Completed)

- Two-column flex layout: left text (52%) + right SVG artwork (46%)
- Right column: animated gold growth chart SVG with 4 stat cards
  - KRA Registered · TPA/2004/0142
  - 20+ Years in practice
  - 500+ Clients served
  - ICPAK Certified
- GSAP animations: chart line draws on load, stat cards slide in, node pulse loop
- GSAP script wrapped in window.addEventListener('load') — fires after defer scripts
- Typewriter animation on 3rd headline line (cycles through phrases)
- Hero section min-height: 620px
- Injected CSS in <style id="hero-art-styles"> block in <head>

## Social Proof / Trust Strip (Completed)

- Real client logos: Telitraq, Arcbit Solutions Limited, Carrums Solutions, Lyvios
- All logos processed to grayscale with transparent backgrounds (40px height)
- Layout: flex-nowrap single horizontal row, flex-shrink:0 on each item
- Hover: opacity 0.55 → 0.9
- Old placeholder text logos (Safaricom, Kenya Airways etc.) fully removed

## Team Section

- index.html: about-img-stack block hidden with display:none (pending real photos)
- about.html: Leadership Team section (#team) hidden with display:none
- "Meet Our Team" button renamed to "Learn About Us" linking to about.html

## Completed Work

- Full 13-page website built from scratch
- Rebranded from Nexus Tax & Audit → Brezoid Global Networks Limited
- All contact details updated (phone, email, address)
- All encoding corruption fixed sitewide (UTF-8, byte-level replacement)
- All Nexus → Brezoid references replaced sitewide (including testimonials)
- All internal links converted to relative paths
- Logo image crossfade on scroll working across all pages
- Navigation fully consistent across all 13 pages
- quote.html dark strip (body.page-quote::before) for navbar visibility
- GSAP animations working with CSS fallback (gsap-active class)
- GitHub Pages live and auto-deploying
- fixbytes.py established as permanent reusable patch tool
- .gitignore set up (ignores _backups/)
- Hero two-column layout with animated SVG artwork
- Real client logos in trust strip

## Known Remaining Issues (Start Next Session Here)

1. Contact form — functional backend needed (Formspree or similar)
2. Quote form — verify multi-step form works correctly
3. meta description on index.html — check for remaining encoding issues
4. about.html service dropdown links — still point to index.html#services
5. Page content review — check all sections on all pages
6. Service pages content review (text, links, imagery)
7. Footer consistency check across all pages
8. Image placeholders — populate remaining placeholder images
9. Upload to live server (cPanel / HostAfrica)

## Reusable Scripts

fixbytes.py lives permanently in the project root.
Run with: python fixbytes.py
Overwrite with new content each session for current job.

Common patterns:
- Text replacement: content.replace(b'old', b'new')
- CRLF-aware: use b'\r\n' for line endings in anchors
- Regex replacement: re.sub(b'pattern', b'replacement', content, re.DOTALL)
- Always test anchor with `if old in content:` before replacing

## Git Tags

- navigation-complete — navigation fully fixed across all pages

## Deployment Checklist (Before Going Live on cPanel)

- [ ] All links relative (run verify.py)
- [ ] UTF-8 encoding, no BOM
- [ ] Logo files in assets/images/
- [ ] No Nexus references remaining
- [ ] All encoding corruption fixed
- [ ] Contact form backend connected
- [ ] Quote form tested end-to-end
- [ ] All image placeholders populated
- [ ] Team section either populated or kept hidden
- [ ] Footer consistent across all 13 pages
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

### June 2026 — Hero Artwork + Social Proof

- Added animated SVG artwork to hero right column
- Two-column flex layout with GSAP animations
- Typewriter animation on hero headline
- Real client logos (Telitraq, Arcbit, Carrums, Lyvios) in trust strip
- Logos processed to grayscale with transparent backgrounds
- Removed all Nexus placeholder references sitewide
- Hidden Team section on index.html and about.html
- Renamed "Meet Our Team" CTA to "Learn About Us"
- Set up .gitignore for _backups/
- Resolved CRLF git line-ending issues with core.autocrlf false workflow

## How to Start Next Session

Paste this file into a new Claude chat with:
"I'm continuing work on the Brezoid website. Here is my project context:"
Then describe what you want to work on next.
