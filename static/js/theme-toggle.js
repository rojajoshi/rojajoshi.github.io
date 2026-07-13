/* ============================================
   LEGO PORTFOLIO — THEME TOGGLE
   ============================================ */

(function () {
  const STORAGE_KEY = 'lego-portfolio-theme';
  const DARK = 'dark';
  const LIGHT = 'light';
  // Cache system theme query
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Apply theme immediately to avoid flash of wrong theme
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = mediaQuery.matches;
  const initialTheme = savedTheme || (prefersDark ? DARK : LIGHT);
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Set correct icon on load
    updateIcon(toggle, initialTheme);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === DARK ? LIGHT : DARK;

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      updateIcon(toggle, next);
    });

    // Listen for system preference changes
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const systemTheme = e.matches ? DARK : LIGHT;
        document.documentElement.setAttribute('data-theme', systemTheme);
        updateIcon(toggle, systemTheme);
      }
    });
  });

  function updateIcon(toggle, theme) {
    toggle.textContent = theme === DARK ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', `Switch to ${theme === DARK ? LIGHT : DARK} mode`);
  }
})();