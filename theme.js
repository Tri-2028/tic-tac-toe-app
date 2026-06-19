// Theme toggle logic (Light/Dark mode)
// Uses localStorage so the preference persists until page refresh/revisit.

const THEME_KEY = 'ttt_theme';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  const btn = document.getElementById('themeBtn');
  if (!btn) return;

  const setBtnText = () => {
    // Button label indicates what will happen on next click.
    const current = document.documentElement.dataset.theme || 'dark';
    btn.textContent = current === 'dark' ? 'Light Mode' : 'Dark Mode';
  };

  setBtnText();

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    setBtnText();
  });
}

initTheme();

