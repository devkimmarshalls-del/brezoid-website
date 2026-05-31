/**
 * ============================================================
 * Brezoid Global Networks Limited â€” MAIN JAVASCRIPT
 * Version: 1.0.0
 * ============================================================
 *
 * Modules:
 *  1. Feather Icons Init
 *  2. Navbar (scroll behavior, mobile toggle, dropdowns)
 *  3. GSAP Animations (scroll-triggered reveals, stagger)
 *  4. Back-to-top button
 *  5. Cookie banner
 *  6. Smooth scroll
 *  7. Page transition
 *  8. Reusable animation helpers
 *  9. Form utilities
 * 10. Utilities
 * ============================================================
 */

(function () {
  'use strict';

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     0. CONFIG
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const CONFIG = {
    navScrollThreshold: 50,
    revealThreshold: 0.12,
    revealRootMargin: '0px 0px -60px 0px',
    staggerDelay: 0.1,
    animDuration: 0.75,
    animEase: 'power3.out',
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     1. FEATHER ICONS
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
      feather.replace({
        'stroke-width': 1.5,
        width: '18',
        height: '18',
      });
    }
  }

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     2. NAVBAR
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const Navbar = {
    el: null,
    hamburger: null,
    mobileMenu: null,
    mobileOverlay: null,
    isOpen: false,
    lastScrollY: 0,

    init() {
      this.el = document.getElementById('navbar');
      if (!this.el) return;

      this.hamburger = document.querySelector('.nav-hamburger');
      this.mobileMenu = document.querySelector('.nav-mobile-menu');
      this.mobileOverlay = document.querySelector('.nav-mobile-overlay');

      this.setInitialState();
      this.bindEvents();
      this.initDropdowns();
      this.initMobileAccordions();
      this.initFocusTrap();
    },

    setInitialState() {
      // If page is already scrolled on load
      if (window.scrollY > CONFIG.navScrollThreshold) {
        this.el.classList.remove('nav-transparent');
        this.el.classList.add('nav-solid');
      } else {
        this.el.classList.add('nav-transparent');
        this.el.classList.remove('nav-solid');
      }
    },

    bindEvents() {
      // Scroll behavior
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      // Hamburger toggle
      if (this.hamburger) {
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
      }

      // Overlay click closes menu
      if (this.mobileOverlay) {
        this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
      }

      // Close on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && this.isOpen) {
          this.closeMobileMenu();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMobileMenu();
        }
      });

      // Active nav link highlighting
      this.highlightActiveLink();
    },

    handleScroll() {
      const scrollY = window.scrollY;
      const shouldSolid = scrollY > CONFIG.navScrollThreshold;

      if (shouldSolid) {
        this.el.classList.remove('nav-transparent');
        this.el.classList.add('nav-solid');
      } else {
        this.el.classList.add('nav-transparent');
        this.el.classList.remove('nav-solid');
      }

      this.lastScrollY = scrollY;
    },

    toggleMobileMenu() {
      if (this.isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    },

    openMobileMenu() {
      this.isOpen = true;
      this.mobileMenu?.classList.add('is-open');
      this.mobileOverlay?.classList.add('is-open');
      this.hamburger?.classList.add('is-open');
      this.hamburger?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      // Animate menu items in
      const items = this.mobileMenu?.querySelectorAll('.nav-mobile-link');
      if (items && typeof gsap !== 'undefined') {
        gsap.fromTo(
          items,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.15,
          }
        );
      }
    },

    closeMobileMenu() {
      this.isOpen = false;
      this.mobileMenu?.classList.remove('is-open');
      this.mobileOverlay?.classList.remove('is-open');
      this.hamburger?.classList.remove('is-open');
      this.hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    },

    initDropdowns() {
      const dropdowns = document.querySelectorAll('.nav-dropdown');
      dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        let closeTimer;

        // Hover open
        dropdown.addEventListener('mouseenter', () => {
          clearTimeout(closeTimer);
          // Close other dropdowns
          dropdowns.forEach((d) => {
            if (d !== dropdown) d.classList.remove('active');
          });
          dropdown.classList.add('active');
        });

        // Hover close with delay
        dropdown.addEventListener('mouseleave', () => {
          closeTimer = setTimeout(() => {
            dropdown.classList.remove('active');
          }, 120);
        });

        // Keyboard / click toggle
        toggle?.addEventListener('click', (e) => {
          e.stopPropagation();
          const isActive = dropdown.classList.contains('active');
          dropdowns.forEach((d) => d.classList.remove('active'));
          if (!isActive) dropdown.classList.add('active');
        });
      });

      // Close on outside click
      document.addEventListener('click', () => {
        dropdowns.forEach((d) => d.classList.remove('active'));
      });
    },

    initMobileAccordions() {
      const toggles = document.querySelectorAll('[data-mobile-accordion]');
      toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const target = document.querySelector(toggle.dataset.mobileAccordion);
          if (!target) return;

          const isOpen = target.classList.contains('is-open');
          target.classList.toggle('is-open', !isOpen);

          const icon = toggle.querySelector('[data-accordion-icon]');
          if (icon && typeof gsap !== 'undefined') {
            gsap.to(icon, {
              rotation: isOpen ? 0 : 180,
              duration: 0.25,
              ease: 'power2.inOut',
            });
          }
        });
      });
    },

    /* â”€â”€ Focus trap for mobile menu (WCAG 2.1 â€” 2.1.2) â”€â”€ */
    initFocusTrap() {
      const menu = this.mobileMenu;
      if (!menu) return;

      const getFocusable = () => [...menu.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )];

      menu.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;
        if (e.key === 'Escape') { this.closeMobileMenu(); return; }
        if (e.key !== 'Tab') return;

        const els = getFocusable();
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    },

    highlightActiveLink() {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('.nav-link, .nav-dropdown-item, .nav-mobile-link');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.split('?')[0].split('#')[0];

        if (
          linkPath === currentPath ||
          (linkPath !== '/' && currentPath.startsWith(linkPath))
        ) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     3. GSAP ANIMATIONS
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const Animations = {
    observers: [],

    init() {
      if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Animations disabled.');
        this.fallbackReveal();
        return;
      }

      this.registerPlugins();
      this.initScrollReveal();
      this.initHeroAnimation();
      this.initCounters();
      this.initParallax();
    },

    registerPlugins() {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
    },

    /* â”€â”€ Hero entrance animation (with CDN fallback) â”€â”€ */
    initHeroAnimation() {
      const hero = document.querySelector('.hero, .page-header');
      if (!hero) return;

      const heading   = hero.querySelector('.heading-hero, h1');
      const lead      = hero.querySelector('.text-lead');
      const ctas      = hero.querySelectorAll('.btn, .hero-cta');
      const heroItems = document.querySelectorAll('.hero-animate-item');

      const tl = gsap.timeline({
        defaults: { ease: CONFIG.animEase },
        onStart: () => {
          // Disable CSS transition once GSAP controls opacity
          heroItems.forEach(el => { el.style.transition = 'none'; });
        },
      });

      if (heroItems.length) {
        tl.fromTo(heroItems,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.13 }
        );
      } else {
        if (heading) tl.fromTo(heading, { opacity:0, y:36 }, { opacity:1, y:0, duration:0.8 });
        if (lead)    tl.fromTo(lead,    { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6 }, '-=0.5');
        if (ctas.length) tl.fromTo(ctas, { opacity:0, y:16 }, { opacity:1, y:0, duration:0.55, stagger:0.1 }, '-=0.4');
      }

      // Decorative accent bar lines
      const lines = document.querySelectorAll('.hero-accent-bar');
      if (lines.length) {
        tl.fromTo(lines,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 1.2, ease: 'power2.inOut', stagger: 0.2 },
          0
        );
      }
    },

    /* â”€â”€ Scroll-triggered reveal â”€â”€ */
    initScrollReveal() {
      // Use Intersection Observer as primary (with GSAP animation)
      const revealEls = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, [data-reveal]'
      );

      if (revealEls.length === 0) return;

      if (typeof ScrollTrigger !== 'undefined') {
        this.gsapScrollTriggerReveal(revealEls);
      } else {
        this.intersectionObserverReveal(revealEls);
      }
    },

    gsapScrollTriggerReveal(els) {
      els.forEach((el) => {
        const delay = parseFloat(el.dataset.delay || 0);
        const from = {};
        const to = { opacity: 1, x: 0, y: 0, scale: 1, duration: CONFIG.animDuration, ease: CONFIG.animEase, delay };

        if (el.classList.contains('reveal'))        { from.opacity = 0; from.y = 30; }
        if (el.classList.contains('reveal-left'))   { from.opacity = 0; from.x = -36; }
        if (el.classList.contains('reveal-right'))  { from.opacity = 0; from.x = 36; }
        if (el.classList.contains('reveal-scale'))  { from.opacity = 0; from.scale = 0.9; }

        if (el.dataset.reveal) {
          const dir = el.dataset.reveal;
          if (dir === 'up')    { from.opacity = 0; from.y = 30; }
          if (dir === 'left')  { from.opacity = 0; from.x = -36; }
          if (dir === 'right') { from.opacity = 0; from.x = 36; }
          if (dir === 'scale') { from.opacity = 0; from.scale = 0.9; }
        }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => gsap.fromTo(el, from, to),
          once: true,
        });
      });
    },

    intersectionObserverReveal(els) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = parseFloat(el.dataset.delay || 0) * 1000;

              setTimeout(() => {
                gsap.to(el, {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: CONFIG.animDuration,
                  ease: CONFIG.animEase,
                });
              }, delay);

              observer.unobserve(el);
            }
          });
        },
        {
          threshold: CONFIG.revealThreshold,
          rootMargin: CONFIG.revealRootMargin,
        }
      );

      els.forEach((el) => observer.observe(el));
      this.observers.push(observer);
    },

    /* â”€â”€ Stagger children â”€â”€ */
    staggerReveal(containerSelector, childSelector = '*', options = {}) {
      const containers = document.querySelectorAll(containerSelector);

      containers.forEach((container) => {
        const children = container.querySelectorAll(childSelector);
        if (!children.length) return;

        const defaults = {
          threshold: 0.1,
          from: { opacity: 0, y: 28 },
          to: {
            opacity: 1,
            y: 0,
            duration: CONFIG.animDuration,
            stagger: CONFIG.staggerDelay,
            ease: CONFIG.animEase,
          },
        };

        const config = Object.assign({}, defaults, options);

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.create({
            trigger: container,
            start: 'top 85%',
            onEnter: () => gsap.fromTo(children, config.from, config.to),
            once: true,
          });
        } else {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  gsap.fromTo(children, config.from, config.to);
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: config.threshold }
          );
          observer.observe(container);
          this.observers.push(observer);
        }
      });
    },

    /* â”€â”€ Count-up animation for stat numbers â”€â”€ */
    initCounters() {
      const counters = document.querySelectorAll('[data-count]');
      if (!counters.length) return;

      const formatNumber = (num, suffix) => {
        if (num >= 1000) {
          return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K' + (suffix || '');
        }
        return Math.round(num) + (suffix || '');
      };

      counters.forEach((counter) => {
        const target = parseFloat(counter.dataset.count);
        const suffix = counter.dataset.suffix || '';
        const prefix = counter.dataset.prefix || '';
        const decimals = parseInt(counter.dataset.decimals || 0);

        const runCounter = () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              counter.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            },
            onComplete: function () {
              // Snap to exact final value to avoid floating point display drift
              counter.textContent = prefix + target.toFixed(decimals) + suffix;
            },
          });
        };

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: runCounter,
            once: true,
          });
        } else {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  runCounter();
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.5 }
          );
          observer.observe(counter);
          this.observers.push(observer);
        }
      });
    },

    /* â”€â”€ Subtle parallax on hero/section images â”€â”€ */
    initParallax() {
      if (typeof ScrollTrigger === 'undefined') return;

      const parallaxEls = document.querySelectorAll('[data-parallax]');
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || 0.3);
        gsap.to(el, {
          yPercent: speed * 100 * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },

    /* â”€â”€ Fallback: just show elements when no GSAP â”€â”€ */
    fallbackReveal() {
      const els = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    },

    /* â”€â”€ Animate a single element (utility) â”€â”€ */
    animateIn(el, options = {}) {
      if (typeof gsap === 'undefined' || !el) return;

      const defaults = {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: CONFIG.animEase,
      };

      gsap.to(el, Object.assign(defaults, options));
    },

    /* â”€â”€ Timeline builder (utility) â”€â”€ */
    buildTimeline(options = {}) {
      if (typeof gsap === 'undefined') return null;
      return gsap.timeline(options);
    },

    /* â”€â”€ Destroy all observers (clean-up) â”€â”€ */
    destroy() {
      this.observers.forEach((obs) => obs.disconnect());
      this.observers = [];
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     4. BACK-TO-TOP BUTTON
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const BackToTop = {
    btn: null,

    init() {
      this.btn = document.querySelector('.back-to-top');
      if (!this.btn) this.create();

      this.bindEvents();
    },

    create() {
      this.btn = document.createElement('button');
      this.btn.className = 'back-to-top';
      this.btn.setAttribute('aria-label', 'Back to top');
      this.btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      document.body.appendChild(this.btn);
    },

    bindEvents() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          this.btn.classList.add('visible');
        } else {
          this.btn.classList.remove('visible');
        }
      }, { passive: true });

      this.btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     5. COOKIE BANNER
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const CookieBanner = {
    STORAGE_KEY: 'nexus_cookie_consent',

    init() {
      if (this.hasConsent()) return;

      this.banner = document.querySelector('.cookie-banner');
      if (!this.banner) this.create();

      setTimeout(() => {
        this.banner.classList.add('visible');
      }, 2000);

      this.bindEvents();
    },

    hasConsent() {
      try {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
      } catch {
        return false;
      }
    },

    create() {
      this.banner = document.createElement('div');
      this.banner.className = 'cookie-banner';
      this.banner.setAttribute('role', 'region');
      this.banner.setAttribute('aria-label', 'Cookie consent');
      this.banner.innerHTML = `
        <div class="cookie-text">
          We use cookies to enhance your experience and analyse site performance.
          <a href="/privacy.html" style="color:var(--accent);text-decoration:underline;">Learn more</a>
        </div>
        <div class="cookie-actions">
          <button class="btn btn-sm btn-ghost" style="color:rgba(255,255,255,0.6);font-size:0.75rem;" data-cookie-decline>Decline</button>
          <button class="btn btn-sm btn-accent" data-cookie-accept>Accept</button>
        </div>
      `;
      document.body.appendChild(this.banner);
    },

    bindEvents() {
      this.banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
        this.setConsent('accepted');
        this.dismiss();
      });

      this.banner.querySelector('[data-cookie-decline]')?.addEventListener('click', () => {
        this.setConsent('declined');
        this.dismiss();
      });
    },

    setConsent(value) {
      try {
        localStorage.setItem(this.STORAGE_KEY, value);
      } catch {}
    },

    dismiss() {
      this.banner.style.transform = 'translateY(120%)';
      setTimeout(() => this.banner.remove(), 600);
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     6. SMOOTH SCROLL FOR ANCHOR LINKS
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();

        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80'
        );
        const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;

        window.scrollTo({ top: offset, behavior: 'smooth' });

        // Close mobile menu if open
        Navbar.closeMobileMenu();
      });
    });
  }

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     7. PAGE TRANSITION
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const PageTransition = {
    overlay: null,

    init() {
      if (typeof gsap === 'undefined') return;

      this.overlay = document.querySelector('.page-transition-overlay');
      if (!this.overlay) {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        document.body.appendChild(this.overlay);
      }

      // Entrance: slide out overlay on page load
      gsap.fromTo(
        this.overlay,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.75, ease: 'power3.inOut', delay: 0.1 }
      );

      // Exit: slide in before navigation
      this.bindLinks();
    },

    bindLinks() {
      document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');

        // Only internal page links (not #anchors, not external)
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          link.target === '_blank' ||
          href.includes('://')
        ) return;

        link.addEventListener('click', (e) => {
          e.preventDefault();

          gsap.to(this.overlay, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
              window.location.href = href;
            },
          });
        });
      });
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     8. REUSABLE ANIMATION HELPERS (exposed on window)
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const AnimHelpers = {

    /* Fade in a single element */
    fadeIn(el, options = {}) {
      if (typeof gsap === 'undefined' || !el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 20 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.6,
          ease: options.ease ?? CONFIG.animEase,
          delay: options.delay ?? 0,
        }
      );
    },

    /* Fade out a single element */
    fadeOut(el, options = {}) {
      if (typeof gsap === 'undefined' || !el) return;
      gsap.to(el, {
        opacity: 0,
        y: options.y ?? -10,
        duration: options.duration ?? 0.4,
        ease: options.ease ?? 'power2.in',
        onComplete: options.onComplete,
      });
    },

    /* Stagger a NodeList / array of elements */
    staggerIn(els, options = {}) {
      if (typeof gsap === 'undefined' || !els.length) return;
      gsap.fromTo(
        els,
        { opacity: 0, y: options.fromY ?? 24, x: options.fromX ?? 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration ?? CONFIG.animDuration,
          stagger: options.stagger ?? CONFIG.staggerDelay,
          ease: options.ease ?? CONFIG.animEase,
          delay: options.delay ?? 0,
        }
      );
    },

    /* Scale-bounce pop */
    popIn(el, options = {}) {
      if (typeof gsap === 'undefined' || !el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.75 },
        {
          opacity: 1,
          scale: 1,
          duration: options.duration ?? 0.5,
          ease: options.ease ?? 'back.out(1.7)',
          delay: options.delay ?? 0,
        }
      );
    },

    /* Slide from direction */
    slideIn(el, direction = 'bottom', options = {}) {
      if (typeof gsap === 'undefined' || !el) return;
      const from = {};
      if (direction === 'bottom') from.y = 40;
      if (direction === 'top')    from.y = -40;
      if (direction === 'left')   from.x = -40;
      if (direction === 'right')  from.x = 40;
      from.opacity = 0;

      gsap.fromTo(el, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: options.duration ?? 0.65,
        ease: options.ease ?? CONFIG.animEase,
        delay: options.delay ?? 0,
      });
    },

    /* Draw a line (stroke) */
    drawLine(el, options = {}) {
      if (typeof gsap === 'undefined' || !el) return;
      const length = el.getTotalLength?.() || 100;
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: options.duration ?? 1.2,
        ease: options.ease ?? 'power2.inOut',
        delay: options.delay ?? 0,
      });
    },

    /* Shimmer highlight on an element */
    shimmer(el) {
      if (!el || typeof gsap === 'undefined') return;
      gsap.fromTo(
        el,
        { backgroundPosition: '-200% 0' },
        { backgroundPosition: '200% 0', duration: 1.5, ease: 'none' }
      );
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     9. FORM UTILITIES
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const FormUtils = {
    init() {
      this.initFloatingLabels();
      this.initFormValidation();
      this.initPhoneMask();
    },

    initFloatingLabels() {
      document.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
        const group = input.closest('.form-group');
        if (!group) return;

        const checkFilled = () => {
          group.classList.toggle('is-filled', input.value.trim() !== '');
        };

        input.addEventListener('input', checkFilled);
        input.addEventListener('blur', checkFilled);
        checkFilled(); // Check on init
      });
    },

    initFormValidation() {
      document.querySelectorAll('form[data-validate]').forEach((form) => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          let isValid = true;
          const inputs = form.querySelectorAll('[required]');

          inputs.forEach((input) => {
            const group = input.closest('.form-group');
            const errorEl = group?.querySelector('.form-error');

            if (!input.value.trim()) {
              isValid = false;
              group?.classList.add('has-error');
              if (errorEl) errorEl.textContent = 'This field is required.';

              if (typeof gsap !== 'undefined') {
                gsap.fromTo(input, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
              }
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
              isValid = false;
              group?.classList.add('has-error');
              if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
            } else {
              group?.classList.remove('has-error');
              if (errorEl) errorEl.textContent = '';
            }
          });

          if (isValid) {
            const handler = form.dataset.validate;
            if (handler && typeof window[handler] === 'function') {
              window[handler](form);
            } else {
              this.defaultSubmitSuccess(form);
            }
          }
        });

        // Clear error on input
        form.querySelectorAll('[required]').forEach((input) => {
          input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            group?.classList.remove('has-error');
          });
        });
      });
    },

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    defaultSubmitSuccess(form) {
      const successMsg = form.querySelector('[data-success-msg]') || this.createSuccessMsg(form);
      form.style.display = 'none';
      successMsg.style.display = 'block';

      if (typeof gsap !== 'undefined') {
        AnimHelpers.fadeIn(successMsg);
      }
    },

    createSuccessMsg(form) {
      const msg = document.createElement('div');
      msg.setAttribute('data-success-msg', '');
      msg.style.cssText = 'display:none;text-align:center;padding:3rem 2rem;';
      msg.innerHTML = `
        <div style="width:64px;height:64px;background:var(--primary-muted);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="font-family:var(--font-display);font-size:1.5rem;color:var(--ink);margin-bottom:0.75rem;">Message Sent</h3>
        <p style="color:var(--muted);font-size:0.95rem;max-width:320px;margin:0 auto;line-height:1.7;">Thank you for reaching out. One of our advisors will be in touch within 1 business day.</p>
      `;
      form.parentNode.insertBefore(msg, form.nextSibling);
      return msg;
    },

    initPhoneMask() {
      document.querySelectorAll('input[data-mask="phone"]').forEach((input) => {
        input.addEventListener('input', (e) => {
          let val = e.target.value.replace(/\D/g, '');
          if (val.length <= 10) {
            val = val.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
          }
          e.target.value = val;
        });
      });
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     10. UTILITIES
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const Utils = {
    /* Debounce */
    debounce(fn, wait = 250) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
      };
    },

    /* Throttle */
    throttle(fn, limit = 100) {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          fn(...args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },

    /* Element in viewport */
    inViewport(el, offset = 0) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
      );
    },

    /* Format currency (KES) */
    formatCurrency(amount, currency = 'KES') {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
      }).format(amount);
    },

    /* Get URL param */
    getParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    },

    /* Truncate text */
    truncate(str, maxLen = 100) {
      return str.length > maxLen ? str.slice(0, maxLen) + 'â€¦' : str;
    },

    /* Copy to clipboard */
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      }
    },

    /* Prefers reduced motion */
    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     STAGGER INIT (runs after DOM ready)
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function initStaggerGroups() {
    // Cards in a grid
    Animations.staggerReveal('.services-grid', '.service-card', {
      from: { opacity: 0, y: 32 },
      to: { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: CONFIG.animEase },
    });

    // Stats
    Animations.staggerReveal('.stats-grid', '.stat-card', {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: CONFIG.animEase },
    });

    // Team cards
    Animations.staggerReveal('.team-grid', '.team-card', {
      from: { opacity: 0, scale: 0.92 },
      to: { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
    });

    // Feature list items
    Animations.staggerReveal('.feature-list', 'li', {
      from: { opacity: 0, x: -20 },
      to: { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
    });
  }

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     EXPOSE PUBLIC API
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  window.NexusTax = {
    Animations,
    AnimHelpers,
    FormUtils,
    Utils,
    Navbar,
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     INIT SEQUENCE
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function init() {
    const reducedMotion = Utils.prefersReducedMotion();

    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      Animations.fallbackReveal();
    } else {
      // Safety fallback: if GSAP takes >2.5s, show hero content via CSS class
      const heroItems = document.querySelectorAll('.hero-animate-item');
      const fallbackTimer = setTimeout(() => {
        if (heroItems.length && parseFloat(getComputedStyle(heroItems[0]).opacity) < 0.5) {
          document.body.classList.add('gsap-fallback');
        }
      }, 2500);

      if (typeof gsap !== 'undefined') {
        clearTimeout(fallbackTimer);
        Animations.init();
        PageTransition.init();
      } else {
        clearTimeout(fallbackTimer);
        document.body.classList.add('gsap-fallback');
      }
    }

    initFeatherIcons();
    Navbar.init();
    BackToTop.init();
    CookieBanner.init();
    initSmoothScroll();
    initStaggerGroups();
    FormUtils.init();
  }

  /* â”€â”€ DOM Ready â”€â”€ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

