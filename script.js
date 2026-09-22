/**
 * Shared Script
 * - Mobile Navigation Toggle
 * - Dark / Light Mode Toggle (persisted via localStorage)
 * Used across index.html, resume.html, and project.html
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Navigation ──────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close menu when any nav link is tapped
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu if clicked outside
    document.addEventListener('click', (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Dark / Light Mode Toggle ───────────────────────────── */
  const themeToggle = document.getElementById('theme-toggle');
  const root        = document.documentElement;

  // Apply saved theme immediately (prevents flash)
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
});
