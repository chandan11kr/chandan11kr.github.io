/* ============================================================
   CHANDAN KUMAR PASWAN — PORTFOLIO JAVASCRIPT
   File: js/main.js
   Sections:
     1. Company Logo Auto-Loader
     2. Mobile Navigation Toggle
     3. Active Nav Link Highlight (scroll spy)
     4. Scroll Reveal Animations
     5. Smooth Scroll for Anchor Links
     6. Navbar Shadow on Scroll
   ============================================================ */


/* ── 1. COMPANY LOGO AUTO-LOADER ─────────────────────────
   Checks assets/ folder for: accenture, infosys, coworks
   Extensions tried in order: svg, png, jpg, jpeg
   Falls back to 2-letter initials if no image found.
   ──────────────────────────────────────────────────────── */

const companyLogos = [
  { id: 'logo-accenture', name: 'accenture' },
  { id: 'logo-infosys',   name: 'infosys'   },
  { id: 'logo-coworks',   name: 'coworks'   },
];

companyLogos.forEach(({ id, name }) => {
  const el = document.getElementById(id);
  if (!el) return;

  const extensions = ['svg', 'png', 'jpg', 'jpeg'];

  const tryLoad = (index) => {
    if (index >= extensions.length) return; // none found, keep initials

    const img = new Image();
    img.src = `assets/${name}.${extensions[index]}`;

    img.onload = () => {
      el.textContent = '';
      el.classList.add('has-logo');
      el.style.padding = '0';
      img.alt = name;
      el.appendChild(img);
    };

    img.onerror = () => tryLoad(index + 1);
  };

  tryLoad(0);
});


/* ── 2. MOBILE NAVIGATION TOGGLE ────────────────────────── */

const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

// Toggle the mobile drawer open/closed
navToggle.addEventListener('click', () => {
  navDrawer.classList.toggle('open');
});

// Close drawer when any link inside it is clicked
drawerLinks.forEach(link => {
  link.addEventListener('click', () => {
    navDrawer.classList.remove('open');
  });
});

// Close drawer when clicking outside of it
document.addEventListener('click', (e) => {
  if (!navDrawer.contains(e.target) && !navToggle.contains(e.target)) {
    navDrawer.classList.remove('open');
  }
});


/* ── 3. ACTIVE NAV LINK HIGHLIGHT (SCROLL SPY) ───────────── */

const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Add active style via JS-injected CSS rule
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: #e8ecf4; }`;
document.head.appendChild(style);

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // run on load


/* ── 4. SCROLL REVEAL ANIMATIONS ────────────────────────── */

// Cards and sections fade up when they enter the viewport
const revealTargets = document.querySelectorAll(
  '.exp-card, .proj-card, .cert-card, .skill-card, .ach-card, .contact-link'
);

// Initial hidden state — applied via JS so it degrades gracefully if JS is off
revealTargets.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay based on position among siblings
        const siblings = Array.from(entry.target.parentElement.children);
        const index    = siblings.indexOf(entry.target);
        const delay    = Math.min(index * 80, 400); // cap at 400 ms

        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);

        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.1 }
);

revealTargets.forEach(el => revealObserver.observe(el));


/* ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────── */

// Adds offset to account for the fixed navbar height (64 px)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const navHeight = 64;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ── 6. NAVBAR SHADOW ON SCROLL ──────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
