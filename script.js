/**
 * Shared Script
 * - Mobile Navigation Toggle
 * - Dark / Light Mode Toggle (persisted via localStorage)
 * - Navbar Search (keyword search across site sections)
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

  /* ── Navbar Search ──────────────────────────────────────── */

  /**
   * Site-wide search index.
   * Each entry: { title, keywords[], excerpt, href }
   * href is relative from the site root.
   */
  const SEARCH_INDEX = [
    {
      title: 'Home',
      keywords: ['home', 'portfolio', 'rylie richard', 'welcome', 'landing'],
      excerpt: 'Landing page of Rylie Richard\'s portfolio',
      href: 'index.html',
      anchor: null,
    },
    {
      title: 'About Me',
      keywords: ['about', 'background', 'lsu', 'louisiana state university', 'cybersecurity', 'analytics', 'information systems', 'student', 'baton rouge'],
      excerpt: 'Background, education, and personal story',
      href: 'index.html',
      anchor: 'about',
    },
    {
      title: 'Skills — Systems & IT Support',
      keywords: ['skills', 'it support', 'macos', 'windows', 'technical troubleshooting', 'hardware', 'software diagnostics', 'systems'],
      excerpt: 'MacOS, Windows, IT Support Tools, Troubleshooting',
      href: 'index.html',
      anchor: 'skills',
    },
    {
      title: 'Skills — Productivity & Security',
      keywords: ['skills', 'security', 'office 365', 'compliance', 'cybersecurity', 'access management', 'documentation'],
      excerpt: 'Office 365, Security Policy & Compliance, Access Management',
      href: 'index.html',
      anchor: 'skills',
    },
    {
      title: 'Skills — Methodologies & Analytics',
      keywords: ['skills', 'agile', 'analytics', 'systems analysis', 'process optimization', 'collaboration'],
      excerpt: 'Agile, Analytics, Systems Analysis, Process Optimization',
      href: 'index.html',
      anchor: 'skills',
    },
    {
      title: 'Experience — Entergy Internship',
      keywords: ['experience', 'entergy', 'intern', 'chief security office', 'security policy', 'compliance', 'agile', 'cyber risk'],
      excerpt: 'Chief Security Office Intern at Entergy',
      href: 'index.html',
      anchor: 'experience',
    },
    {
      title: 'Experience — Mayo Clinic Internship',
      keywords: ['experience', 'mayo clinic', 'healthcare', 'helpdesk', 'intern', 'it support', 'office 365', 'ticket management'],
      excerpt: 'Healthcare Helpdesk Intern at Mayo Clinic',
      href: 'index.html',
      anchor: 'experience',
    },
    {
      title: 'Featured Project — NIST 800-53',
      keywords: ['project', 'nist', '800-53', 'compliance', 'mapping', 'security controls', 'featured', 'cybersecurity'],
      excerpt: 'NIST SP 800-53 Security Control Mapping Initiative',
      href: 'project.html',
      anchor: null,
    },
    {
      title: 'Resume',
      keywords: ['resume', 'cv', 'education', 'work history', 'download', 'lsu', 'entergy', 'mayo clinic'],
      excerpt: 'Full resume including education, experience, and skills',
      href: 'resume.html',
      anchor: null,
    },
    {
      title: 'Contact',
      keywords: ['contact', 'email', 'linkedin', 'github', 'get in touch', 'reach out', 'message', 'connect'],
      excerpt: 'Email, LinkedIn, GitHub, and contact form',
      href: 'index.html',
      anchor: 'contact',
    },
  ];

  const searchContainer  = document.getElementById('nav-search');
  const searchToggleBtn  = document.getElementById('search-toggle-btn');
  const searchWrapper    = document.getElementById('search-input-wrapper');
  const searchInput      = document.getElementById('nav-search-input');
  const searchClearBtn   = document.getElementById('search-clear-btn');
  const searchDropdown   = document.getElementById('search-dropdown');

  if (!searchContainer || !searchToggleBtn || !searchInput || !searchDropdown) return;

  let searchOpen = false;

  function openSearch() {
    searchOpen = true;
    searchContainer.classList.add('is-open');
    searchToggleBtn.setAttribute('aria-expanded', 'true');
    searchWrapper.setAttribute('aria-hidden', 'false');
    searchInput.removeAttribute('tabindex');
    // Focus after transition
    setTimeout(() => searchInput.focus(), 200);
  }

  function closeSearch() {
    searchOpen = false;
    searchContainer.classList.remove('is-open');
    searchToggleBtn.setAttribute('aria-expanded', 'false');
    searchWrapper.setAttribute('aria-hidden', 'true');
    searchInput.setAttribute('tabindex', '-1');
    hideDropdown();
    searchInput.value = '';
  }

  searchToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchOpen ? closeSearch() : openSearch();
  });

  searchClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.value = '';
    hideDropdown();
    searchInput.focus();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (searchOpen && !searchContainer.contains(e.target)) {
      closeSearch();
    }
  });

  // Close on Escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const first = searchDropdown.querySelector('.search-result-item');
      if (first) first.focus();
    }
  });

  // Arrow key navigation inside dropdown
  searchDropdown.addEventListener('keydown', (e) => {
    const items = Array.from(searchDropdown.querySelectorAll('.search-result-item'));
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < items.length - 1) items[idx + 1].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) items[idx - 1].focus();
      else searchInput.focus();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  function hideDropdown() {
    searchDropdown.classList.remove('has-results');
    searchDropdown.innerHTML = '';
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<span class="search-match">$1</span>');
  }

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) { hideDropdown(); return; }

    const results = SEARCH_INDEX.filter(entry => {
      const haystack = [entry.title, entry.excerpt, ...entry.keywords].join(' ').toLowerCase();
      return haystack.includes(q);
    });

    searchDropdown.innerHTML = '';

    if (results.length === 0) {
      searchDropdown.innerHTML = '<div class="search-no-results">No results found</div>';
      searchDropdown.classList.add('has-results');
      return;
    }

    results.forEach(entry => {
      const item = document.createElement('a');
      item.className = 'search-result-item';
      item.setAttribute('role', 'option');
      item.setAttribute('tabindex', '0');

      // Build the href: if we're already on the right page, use hash only
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage  = entry.href;

      if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
        item.href = entry.anchor ? `#${entry.anchor}` : '#';
      } else {
        item.href = entry.anchor ? `${entry.href}#${entry.anchor}` : entry.href;
      }

      item.innerHTML = `
        <span class="search-result-title">${highlightMatch(entry.title, query.trim())}</span>
        <span class="search-result-excerpt">${highlightMatch(entry.excerpt, query.trim())}</span>
      `;

      item.addEventListener('click', (e) => {
        const isSamePage = (currentPage === targetPage) ||
                           (currentPage === '' && targetPage === 'index.html');

        if (isSamePage && entry.anchor) {
          e.preventDefault();
          closeSearch();
          const target = document.getElementById(entry.anchor);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Flash highlight
            target.classList.remove('search-highlight-flash');
            void target.offsetWidth; // reflow
            target.classList.add('search-highlight-flash');
            target.addEventListener('animationend', () => {
              target.classList.remove('search-highlight-flash');
            }, { once: true });
          }
        } else {
          closeSearch();
          // Let normal href navigation happen
        }
      });

      searchDropdown.appendChild(item);
    });

    searchDropdown.classList.add('has-results');
  }

  searchInput.addEventListener('input', (e) => {
    runSearch(e.target.value);
  });

  /* ── Handle incoming search query from URL param ─────────── */
  // e.g. index.html?search=about — auto-open search and scroll
  const urlParams = new URLSearchParams(window.location.search);
  const incomingQuery = urlParams.get('search');
  if (incomingQuery) {
    openSearch();
    searchInput.value = incomingQuery;
    runSearch(incomingQuery);
  }

});

