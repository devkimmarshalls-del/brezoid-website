#!/usr/bin/env python3
"""
patch_hero.py  Brezoid Website Patcher
Run from:  E:/Work/Brezoid/Website/Brezoid-Website-v4/

Steps:
  1. Backup index.html
  2. Fix encoding corruption
  3. Replace Nexus references with Brezoid
  4. Inject hero artwork CSS into <head>
  5. Add hero-two-col class to hero-inner div
  6. Inject hero artwork HTML (SVG + stat cards)
  7. Inject GSAP animation script before </body>

Usage:  python patch_hero.py
"""

import shutil
from datetime import datetime
from pathlib import Path

TARGET     = Path("index.html")
BACKUP_DIR = Path("_backups")

# ---------------------------------------------------------------------------
# HERO ARTWORK HTML
# ---------------------------------------------------------------------------
HERO_RIGHT_BLOCK = """
          <!-- HERO ARTWORK: right column -->
          <div class="hero-artwork-col" id="heroArtworkCol">

            <div class="hero-stat-card card-kra" id="cardKra">
              <div class="hsc-inner">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M14 3L4 7.5V14.5C4 19.5 8.5 24 14 25.5C19.5 24 24 19.5 24 14.5V7.5L14 3Z"
                    stroke="#CC9F46" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 14l3 3 5-5" stroke="#CC9F46" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                  <div class="hsc-title">KRA Registered</div>
                  <div class="hsc-sub">Tax Agent &middot; TPA/2004/0142</div>
                </div>
              </div>
            </div>

            <div class="hero-stat-card card-exp" id="cardExp">
              <div class="hsc-val">20+</div>
              <div class="hsc-label">Years in practice</div>
              <div class="hsc-sub">Est. 2004 &middot; Nairobi</div>
            </div>

            <div class="hero-stat-card card-clients" id="cardClients">
              <div class="hsc-val">500+</div>
              <div class="hsc-label">Clients served</div>
              <div class="hsc-sub">Corporates &middot; NGOs &middot; SMEs</div>
            </div>

            <div class="hero-stat-card card-cert" id="cardCert">
              <div class="hsc-title">ICPAK Certified</div>
              <div class="hsc-sub">Full member &middot; Good standing</div>
              <div class="hsc-sub" style="margin-top:2px">ISQM-1 &middot; ISO 27001-aligned</div>
            </div>

            <svg class="hero-art-svg" id="heroArtSvg" viewBox="0 0 500 480"
              fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="0.5">
                <line x1="0" y1="80"  x2="500" y2="80"/>
                <line x1="0" y1="160" x2="500" y2="160"/>
                <line x1="0" y1="240" x2="500" y2="240"/>
                <line x1="0" y1="320" x2="500" y2="320"/>
                <line x1="0" y1="400" x2="500" y2="400"/>
                <line x1="100" y1="0" x2="100" y2="480"/>
                <line x1="200" y1="0" x2="200" y2="480"/>
                <line x1="300" y1="0" x2="300" y2="480"/>
                <line x1="400" y1="0" x2="400" y2="480"/>
              </g>
              <line x1="40" y1="400" x2="480" y2="400" stroke="#CC9F46" stroke-opacity="0.15" stroke-width="1"/>
              <line x1="40" y1="400" x2="40"  y2="60"  stroke="#CC9F46" stroke-opacity="0.15" stroke-width="1"/>
              <g font-family="DM Mono, monospace" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="end">
                <text x="34" y="322">25</text>
                <text x="34" y="242">50</text>
                <text x="34" y="162">75</text>
                <text x="34" y="82">100</text>
              </g>
              <g stroke="#CC9F46" stroke-opacity="0.07" stroke-width="0.5">
                <line x1="40" y1="320" x2="480" y2="320"/>
                <line x1="40" y1="240" x2="480" y2="240"/>
                <line x1="40" y1="160" x2="480" y2="160"/>
              </g>
              <path id="artChartFill"
                d="M40,400 L100,370 L160,345 L230,305 L300,248 L360,188 L420,130 L470,88 L470,400 Z"
                fill="url(#artChartGrad)" opacity="0"/>
              <path id="artChartLine"
                d="M40,400 L100,370 L160,345 L230,305 L300,248 L360,188 L420,130 L470,88"
                stroke="url(#artLineGrad)" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="900" stroke-dashoffset="900"/>
              <g id="artChartDots" opacity="0">
                <circle cx="100" cy="370" r="3.5" fill="#CC9F46"/>
                <circle cx="160" cy="345" r="3.5" fill="#CC9F46"/>
                <circle cx="230" cy="305" r="3.5" fill="#CC9F46"/>
                <circle cx="300" cy="248" r="3.5" fill="#CC9F46"/>
                <circle cx="360" cy="188" r="3.5" fill="#CC9F46"/>
                <circle cx="420" cy="130" r="3.5" fill="#CC9F46"/>
              </g>
              <circle class="art-pulse-ring" cx="470" cy="88" r="8"
                fill="none" stroke="#CC9F46" stroke-width="1" opacity="0"/>
              <circle id="artTipDot" cx="470" cy="88" r="6" fill="#CC9F46" opacity="0.9"/>
              <circle cx="470" cy="88" r="3" fill="#ffffff" opacity="0.9"/>
              <g id="artTooltip" opacity="0">
                <rect x="376" y="56" width="90" height="26" rx="5"
                  fill="#CC9F46" fill-opacity="0.15" stroke="#CC9F46"
                  stroke-opacity="0.4" stroke-width="0.8"/>
                <text font-family="DM Sans, sans-serif" font-size="10" fill="#CC9F46"
                  x="421" y="74" text-anchor="middle" font-weight="600">Sustained Growth</text>
              </g>
              <g id="artNetwork" opacity="0">
                <line x1="350" y1="340" x2="410" y2="300" stroke="#CC9F46" stroke-opacity="0.15" stroke-width="0.8"/>
                <line x1="350" y1="340" x2="300" y2="310" stroke="#CC9F46" stroke-opacity="0.15" stroke-width="0.8"/>
                <line x1="350" y1="340" x2="370" y2="395" stroke="#CC9F46" stroke-opacity="0.15" stroke-width="0.8"/>
                <line x1="410" y1="300" x2="300" y2="310" stroke="#CC9F46" stroke-opacity="0.10" stroke-width="0.6"/>
                <line x1="300" y1="310" x2="280" y2="370" stroke="#CC9F46" stroke-opacity="0.10" stroke-width="0.6"/>
                <line x1="370" y1="395" x2="280" y2="370" stroke="#CC9F46" stroke-opacity="0.10" stroke-width="0.6"/>
                <circle cx="350" cy="340" r="8"   fill="#113766" stroke="#CC9F46" stroke-opacity="0.45" stroke-width="1"/>
                <circle cx="350" cy="340" r="3.5" fill="#CC9F46" opacity="0.85" id="artNodePulse"/>
                <circle cx="410" cy="300" r="5"   fill="#113766" stroke="#CC9F46" stroke-opacity="0.35" stroke-width="0.8"/>
                <circle cx="410" cy="300" r="2.5" fill="#CC9F46" opacity="0.6"/>
                <circle cx="300" cy="310" r="5"   fill="#113766" stroke="#CC9F46" stroke-opacity="0.35" stroke-width="0.8"/>
                <circle cx="300" cy="310" r="2.5" fill="#CC9F46" opacity="0.6"/>
                <circle cx="370" cy="395" r="5"   fill="#113766" stroke="#CC9F46" stroke-opacity="0.35" stroke-width="0.8"/>
                <circle cx="370" cy="395" r="2.5" fill="#CC9F46" opacity="0.6"/>
                <circle cx="280" cy="370" r="5"   fill="#113766" stroke="#CC9F46" stroke-opacity="0.35" stroke-width="0.8"/>
                <circle cx="280" cy="370" r="2.5" fill="#CC9F46" opacity="0.6"/>
              </g>
              <g font-family="DM Mono, monospace" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="middle">
                <text x="100" y="416">Q1</text>
                <text x="160" y="416">Q2</text>
                <text x="230" y="416">Q3</text>
                <text x="300" y="416">Q4</text>
                <text x="360" y="416">Q1</text>
                <text x="420" y="416">Q2</text>
                <text x="470" y="416">Q3</text>
              </g>
              <text font-family="Cormorant Garamond, Georgia, serif" font-size="10"
                fill="#CC9F46" fill-opacity="0.25"
                x="250" y="455" text-anchor="middle" letter-spacing="3">
                BREZOID GLOBAL NETWORKS LIMITED
              </text>
              <defs>
                <linearGradient id="artChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#CC9F46" stop-opacity="0.22"/>
                  <stop offset="100%" stop-color="#CC9F46" stop-opacity="0.02"/>
                </linearGradient>
                <linearGradient id="artLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#CC9F46" stop-opacity="0.3"/>
                  <stop offset="50%"  stop-color="#CC9F46" stop-opacity="1.0"/>
                  <stop offset="100%" stop-color="#CC9F46" stop-opacity="0.7"/>
                </linearGradient>
              </defs>
            </svg>
          </div><!-- /hero-artwork-col -->
"""

# ---------------------------------------------------------------------------
# CSS BLOCK
# ---------------------------------------------------------------------------
HERO_ART_CSS = """
  /* Hero Artwork Column */
  .hero-artwork-col {
    position: relative;
    width: 100%;
    height: 520px;
    flex: 1 1 50%;
    min-width: 0;
  }
  .hero-art-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .hero-stat-card {
    position: absolute;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(204,159,70,0.25);
    border-radius: 8px;
    padding: 12px 16px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 10;
    opacity: 0;
  }
  .hero-stat-card .hsc-inner  { display:flex; align-items:center; gap:10px; }
  .hero-stat-card .hsc-val    { font-family:var(--font-display,Georgia,serif); font-size:26px; color:#CC9F46; font-weight:600; line-height:1; }
  .hero-stat-card .hsc-title  { font-size:12px; color:#CC9F46; font-weight:600; }
  .hero-stat-card .hsc-label  { font-size:11px; color:rgba(255,255,255,0.45); margin-top:4px; }
  .hero-stat-card .hsc-sub    { font-size:10px; color:rgba(204,159,70,0.6); margin-top:3px; }
  .card-kra     { top:24px;    left:0;    min-width:200px; }
  .card-exp     { top:24px;    right:8px; min-width:130px; }
  .card-clients { bottom:80px; left:8px;  min-width:130px; }
  .card-cert    { bottom:80px; right:8px; min-width:180px; }
  @keyframes art-pulse {
    0%   { r:8;  opacity:0.6; }
    100% { r:22; opacity:0;   }
  }
  .art-pulse-ring { animation: art-pulse 2s ease-out infinite; }
  @media (max-width:768px) {
    .hero-artwork-col { height:320px; margin-top:28px; }
    .card-kra     { top:8px;     left:0;    min-width:160px; }
    .card-exp     { top:8px;     right:4px; min-width:110px; }
    .card-clients { bottom:30px; left:4px; }
    .card-cert    { bottom:30px; right:4px; min-width:155px; }
  }
"""

# ---------------------------------------------------------------------------
# GSAP SCRIPT
# ---------------------------------------------------------------------------
HERO_ART_SCRIPT = """
  <!-- Hero Artwork GSAP Animations -->
  <script>
  (function() {
    if (typeof gsap === 'undefined') return;
    var tl = gsap.timeline({ delay: 0.4 });
    tl.to('#artChartLine',    { strokeDashoffset:0, duration:1.5, ease:'power2.inOut' }, 0.3);
    tl.to('#artChartFill',    { opacity:1, duration:0.7, ease:'power2.out' }, 1.4);
    tl.to('#artChartDots',    { opacity:1, duration:0.3 }, 1.7);
    tl.from('#artChartDots circle', { scale:0, transformOrigin:'center', stagger:0.08, duration:0.3, ease:'back.out(2)' }, 1.7);
    tl.to('#artTooltip',      { opacity:1, duration:0.4, ease:'power2.out' }, 2.0);
    tl.from('#artTooltip',    { y:-6 }, 2.0);
    tl.to('#artNetwork',      { opacity:1, duration:0.5, ease:'power2.out' }, 1.9);
    tl.to('#cardKra',         { opacity:1, x:0, duration:0.5, ease:'power3.out' }, 0.6);
    tl.from('#cardKra',       { x:-24 }, 0.6);
    tl.to('#cardExp',         { opacity:1, x:0, duration:0.5, ease:'power3.out' }, 0.85);
    tl.from('#cardExp',       { x:24  }, 0.85);
    tl.to('#cardClients',     { opacity:1, x:0, duration:0.5, ease:'power3.out' }, 1.1);
    tl.from('#cardClients',   { x:-24 }, 1.1);
    tl.to('#cardCert',        { opacity:1, x:0, duration:0.5, ease:'power3.out' }, 1.35);
    tl.from('#cardCert',      { x:24  }, 1.35);
    gsap.to('#artNodePulse',  { scale:1.4, transformOrigin:'350px 340px', repeat:-1, yoyo:true, duration:1.8, ease:'sine.inOut', delay:2.5 });
  })();
  </script>
"""

# ---------------------------------------------------------------------------
# ENCODING FIXES  (all \x escapes - no raw non-ASCII bytes in source)
# ---------------------------------------------------------------------------
ENCODING_FIXES = [
    # True UTF-8 multi-byte sequences
    (b'\xe2\x80\x93', b'&ndash;'),
    (b'\xe2\x80\x94', b'&mdash;'),
    (b'\xe2\x80\x99', b'&rsquo;'),
    (b'\xe2\x80\x98', b'&lsquo;'),
    (b'\xe2\x80\x9c', b'&ldquo;'),
    (b'\xe2\x80\x9d', b'&rdquo;'),
    (b'\xe2\x80\xa6', b'&hellip;'),
    (b'\xc2\xa0',     b'&nbsp;'),
    # Double-encoded mojibake (UTF-8 of the Latin-1 misread characters)
    (b'\xc3\xa2\xc2\x80\xc2\x93', b'&ndash;'),
    (b'\xc3\xa2\xc2\x80\xc2\x94', b'&mdash;'),
    (b'\xc3\xa2\xc2\x80\xc2\x99', b'&rsquo;'),
    (b'\xc3\xa2\xc2\x80\xc2\x98', b'&lsquo;'),
    (b'\xc3\xa2\xc2\x80\xc2\x9c', b'&ldquo;'),
    (b'\xc3\xa2\xc2\x80\xc2\x9d', b'&rdquo;'),
    (b'\xc3\xa2\xc2\x80\xc2\xa6', b'&hellip;'),
    (b'\xc3\x82\xc2\xa0',         b'&nbsp;'),
]

NEXUS_FIXES = [
    (b'Why Nexus',   b'Why Brezoid'),
    (b'About Nexus', b'About Brezoid'),
    (b'Nexus Advisory &middot; Compliance &middot; Assurance',
     b'Brezoid &middot; Advisory &middot; Compliance &middot; Assurance'),
    (b'Nexus Advisory \xc2\xb7 Compliance \xc2\xb7 Assurance',
     b'Brezoid \xc2\xb7 Advisory \xc2\xb7 Compliance \xc2\xb7 Assurance'),
    (b'Nexus transformed our tax compliance',
     b'Brezoid transformed our tax compliance'),
    (b'We engaged Nexus for our statutory audit',
     b'We engaged Brezoid for our statutory audit'),
    (b"Nexus's international tax practice",
     b"Brezoid's international tax practice"),
    (b'Nexus\xe2\x80\x99s international tax practice',
     b"Brezoid's international tax practice"),
]

# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def backup(path):
    BACKUP_DIR.mkdir(exist_ok=True)
    ts  = datetime.now().strftime("%Y%m%d_%H%M%S")
    dst = BACKUP_DIR / f"{path.stem}_{ts}{path.suffix}"
    shutil.copy2(path, dst)
    print(f"  [backup]  {dst}")


def apply_fixes(content, fixes, tag):
    changed = 0
    for old, new in fixes:
        if old in content:
            n = content.count(old)
            content = content.replace(old, new)
            print(f"  [{tag}]  {old!r} -> {new!r}  ({n}x)")
            changed += n
    if not changed:
        print(f"  [{tag}]  nothing to change")
    return content


def inject_css(content):
    if b'hero-art-styles' in content:
        print("  [css]  already present, skipping")
        return content
    block = b'\n  <style id="hero-art-styles">\n' + HERO_ART_CSS.encode('utf-8') + b'\n  </style>\n'
    new = content.replace(b'</head>', block + b'</head>', 1)
    print("  [css]  injected" if new != content else "  [css]  WARNING: </head> not found")
    return new


def add_two_col(content):
    old = b'class="hero-inner"'
    new = b'class="hero-inner hero-two-col"'
    if new in content:
        print("  [class]  hero-two-col already present")
        return content
    result = content.replace(old, new, 1)
    print("  [class]  added hero-two-col" if result != content else "  [class]  WARNING: hero-inner not found")
    return result


def inject_artwork(content):
    if b'hero-artwork-col' in content:
        print("  [html]  artwork already present, skipping")
        return content
    anchors = [
        b'<div class="hero-scroll"',
        b'class="hero-scroll-indicator"',
        b'<div class="hero-stats"',
        b'id="hero-stats"',
    ]
    for anchor in anchors:
        if anchor in content:
            block = HERO_RIGHT_BLOCK.encode('utf-8')
            result = content.replace(anchor, block + b'\n          ' + anchor, 1)
            print(f"  [html]  injected before {anchor!r}")
            return result
    for fb in [b'<section id="social-proof"', b'<section class="social-proof']:
        if fb in content:
            block = HERO_RIGHT_BLOCK.encode('utf-8')
            result = content.replace(fb, block + b'\n\n' + fb, 1)
            print(f"  [html]  injected before {fb!r}")
            return result
    print("  [html]  WARNING: no anchor found - inject manually")
    return content


def inject_script(content):
    if b'artChartLine' in content:
        print("  [script]  already present, skipping")
        return content
    block = HERO_ART_SCRIPT.encode('utf-8')
    new = content.replace(b'</body>', block + b'\n</body>', 1)
    print("  [script]  injected" if new != content else "  [script]  WARNING: </body> not found")
    return new

# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    if not TARGET.exists():
        print(f"\nERROR: {TARGET} not found.")
        print("Run from:  E:/Work/Brezoid/Website/Brezoid-Website-v4/")
        return

    print("\n" + "=" * 56)
    print("  Brezoid patch_hero.py")
    print("=" * 56)

    content = TARGET.read_bytes()
    print(f"\n  Read {len(content):,} bytes from {TARGET}")
    backup(TARGET)

    print("\n  STEP 1  Encoding fixes")
    content = apply_fixes(content, ENCODING_FIXES, "enc")

    print("\n  STEP 2  Nexus -> Brezoid")
    content = apply_fixes(content, NEXUS_FIXES, "nexus")

    print("\n  STEP 3  Inject hero CSS")
    content = inject_css(content)

    print("\n  STEP 4  Add hero-two-col layout class")
    content = add_two_col(content)

    print("\n  STEP 5  Inject hero artwork HTML")
    content = inject_artwork(content)

    print("\n  STEP 6  Inject GSAP script")
    content = inject_script(content)

    TARGET.write_bytes(content)
    print(f"\n  Wrote {len(content):,} bytes to {TARGET}")
    print("\n" + "=" * 56)
    print("  DONE. Checklist:")
    print("  1. Add to styles.css:")
    print("       .hero-two-col { display:flex; align-items:center; gap:40px; }")
    print("  2. Open index.html locally and verify hero")
    print("  3. git add -A && git commit -m 'feat: hero artwork' && git push")
    print("=" * 56 + "\n")


if __name__ == "__main__":
    main()
