/* ==========================================================================
   Brass & Bristle Barbershop — main.js (no dependencies)

   1. Mobile navigation (burger)
   2. Smooth scrolling for in-page links
   3. Header shadow on scroll
   4. Reveal-on-scroll animation (IntersectionObserver)
   5. Contact form validation (client-side only, nothing is sent)
   6. Current year in the footer
   ========================================================================== */
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Keep in sync with the desktop-nav breakpoint in css/style.css
  const desktopNav = window.matchMedia('(min-width: 900px)');

  /* 1. Mobile navigation
     ------------------------------------------------------------------------ */
  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  const isMenuOpen = () => nav.classList.contains('is-open');

  navToggle.addEventListener('click', () => setMenu(!isMenuOpen()));

  // Esc closes the menu and returns focus to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Click outside the header closes the menu
  document.addEventListener('click', (event) => {
    if (isMenuOpen() && !header.contains(event.target)) setMenu(false);
  });

  // Reset the mobile state when the window grows to desktop width
  desktopNav.addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  /* 2. Smooth scrolling
     CSS scroll-padding-top keeps sections from hiding under the sticky header.
     ------------------------------------------------------------------------ */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (hash === '#') return; // placeholder links, e.g. social icons

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    setMenu(false);

    const behavior = reducedMotion.matches ? 'auto' : 'smooth';
    if (hash === '#top') {
      window.scrollTo({ top: 0, behavior });
    } else {
      target.scrollIntoView({ behavior, block: 'start' });
    }
    history.pushState(null, '', hash);

    // Move keyboard focus to the section so the next Tab continues from there
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* 3. Header shadow once the page is scrolled
     ------------------------------------------------------------------------ */
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* 4. Reveal on scroll
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  // Children of [data-reveal-stagger] appear one after another
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty('--reveal-delay', `${index * 90}ms`);
    });
  });

  if (!('IntersectionObserver' in window) || reducedMotion.matches) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // animate only once
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* 5. Contact form validation
     ------------------------------------------------------------------------ */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Each rule returns an error message, or '' when the value is valid
  const rules = {
    name: (value) => {
      if (!value) return 'Please enter your name.';
      if (value.length < 2) return 'Name should be at least 2 characters.';
      return '';
    },
    email: (value) => {
      if (!value) return 'Please enter your email.';
      if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email, e.g. name@example.com.';
      return '';
    },
    message: (value) => {
      if (!value) return 'Please tell us the service and a time that suits you.';
      if (value.length < 10) return 'Please add a little more detail (at least 10 characters).';
      return '';
    },
  };

  const fields = Array.from(form.elements).filter((el) => rules[el.name]);

  function validateField(field) {
    const error = rules[field.name](field.value.trim());
    field.setAttribute('aria-invalid', error ? 'true' : 'false');
    document.getElementById(`${field.id}-error`).textContent = error;
    return !error;
  }

  fields.forEach((field) => {
    // Don't nag while the user is still typing: check on leaving a filled field,
    // then re-check live once a field has been marked invalid
    field.addEventListener('blur', () => {
      if (field.value.trim()) validateField(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    status.classList.remove('is-success');

    const firstInvalid = fields.filter((field) => !validateField(field))[0];
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Demo only: no request is sent. To receive messages, connect a service
    // such as Netlify Forms or Formspree (see README).
    const firstName = form.querySelector('#name').value.trim().split(/\s+/)[0];
    status.textContent = `Thanks, ${firstName}! We'll confirm your booking by email shortly.`;
    status.classList.add('is-success');

    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
  });

  /* 6. Footer year
     ------------------------------------------------------------------------ */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
