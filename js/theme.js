// ─── WINSYM.AI THEME TOGGLE ───────────────────────────────────────────────
// Reads/writes localStorage key "winsym-theme"
// Applies data-theme="light" | "dark" on <html>

(function () {
  var stored = localStorage.getItem('winsym-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);
})();

function toggleTheme() {
  var html  = document.documentElement;
  var current = html.getAttribute('data-theme') || 'dark';
  var next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('winsym-theme', next);
  // update all toggle buttons on page
  document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
    btn.setAttribute('data-current', next);
    btn.innerHTML = next === 'dark'
      ? '<span class="theme-icon">☀</span><span class="theme-label">Light Mode</span>'
      : '<span class="theme-icon">☽</span><span class="theme-label">Dark Mode</span>';
  });
}

// Set button label once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var theme = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
    btn.setAttribute('data-current', theme);
    btn.innerHTML = theme === 'dark'
      ? '<span class="theme-icon">☀</span><span class="theme-label">Light Mode</span>'
      : '<span class="theme-icon">☽</span><span class="theme-label">Dark Mode</span>';
  });
});
