/* ══════════════════════════════════════════
   Students' Union Mikroskil — script.js
   ══════════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile burger menu ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate burger to X
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when link is clicked
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Intersection Observer for scroll animations ──
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedEls = document.querySelectorAll(
  '.reveal, .reveal-delay, .stagger-reveal, .fade-up'
);
animatedEls.forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav link highlighting ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle(
          'nav-active',
          a.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ── Inject nav-active style ──
const style = document.createElement('style');
style.textContent = `
  .nav-links a.nav-active {
    color: #fff !important;
    background: rgba(255,255,255,0.07) !important;
  }
`;
document.head.appendChild(style);

// ── Counter animation for stat numbers (optional) ──
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statNum = document.querySelector('.stat-num');
if (statNum) {
  const numObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(statNum, 2024, 1200);
        numObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  numObserver.observe(statNum);
}

// ── Parallax effect on hero blobs (subtle) ──
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blobs = document.querySelectorAll('.blob');
  blobs.forEach((blob, i) => {
    const speed = 0.08 + i * 0.04;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });
