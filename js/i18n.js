/*
 * winsym.ai — lightweight translate layer
 * ----------------------------------------
 * English is the single source of truth in the HTML.
 * Translation is handled live by the Google Website Translate widget.
 * The existing header language switcher (.ws-lang-switch with
 * .ws-lang-option[data-lang]) drives it. No per-string i18n tables,
 * no data-i18n maintenance — write English once, the button does the rest.
 *
 * To add a language later: add it to SUPPORTED + LANG_LABELS below and add
 * a <button class="ws-lang-option" data-lang="xx"> to the switcher markup.
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var SUPPORTED    = ['en', 'de'];
  var LANG_LABELS  = { en: 'EN', de: 'DE' };
  var STORAGE_KEY  = 'winsym.lang';
  var GT_COOKIE    = 'googtrans';

  /* ---------- storage ---------- */
  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setStoredLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  /* ---------- google translate cookie ----------
   * The widget reads the language from a "googtrans" cookie shaped /en/de.
   * We set it on both the bare domain and the host so it survives reloads. */
  function setGoogTrans(lang) {
    var val = lang === DEFAULT_LANG ? '' : '/en/' + lang;
    var host = location.hostname;
    var paths = '; path=/';
    // delete first
    document.cookie = GT_COOKIE + '=' + paths;
    document.cookie = GT_COOKIE + '=' + paths + '; domain=' + host;
    document.cookie = GT_COOKIE + '=' + paths + '; domain=.' + host;
    if (val) {
      document.cookie = GT_COOKIE + '=' + val + paths;
      document.cookie = GT_COOKIE + '=' + val + paths + '; domain=' + host;
      document.cookie = GT_COOKIE + '=' + val + paths + '; domain=.' + host;
    }
  }

  /* ---------- kill the google translate top banner / tooltip ---------- */
  function suppressGoogleChrome() {
    if (document.getElementById('gt-suppress-style')) return;
    var css = ''
      + '.goog-te-banner-frame,.goog-te-banner-frame.skiptranslate,iframe.goog-te-banner-frame,'
      + '.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame,div#goog-gt-{display:none!important;visibility:hidden!important;}'
      + 'body{top:0!important;position:static!important;}'
      + '.goog-tooltip,.goog-tooltip:hover{display:none!important;}'
      + '.goog-text-highlight{background:none!important;box-shadow:none!important;}'
      + '#google_translate_element{display:none!important;}';
    var st = document.createElement('style');
    st.id = 'gt-suppress-style';
    st.textContent = css;
    document.head.appendChild(st);

    /* Google can inject the banner asynchronously — keep removing it. */
    function strip() {
      var f = document.querySelector('.goog-te-banner-frame, iframe.goog-te-banner-frame');
      if (f && f.parentNode) f.parentNode.removeChild(f);
      if (document.body && document.body.style.top) document.body.style.top = '0px';
    }
    strip();
    var obs = new MutationObserver(strip);
    try { obs.observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
    setTimeout(strip, 500);
    setTimeout(strip, 1500);
  }

  /* ---------- load the google widget once ---------- */
  var widgetInjected = false;
  function injectWidget() {
    if (widgetInjected) return;
    widgetInjected = true;
    suppressGoogleChrome();

    if (!document.getElementById('google_translate_element')) {
      var holder = document.createElement('div');
      holder.id = 'google_translate_element';
      holder.style.display = 'none';
      document.body.appendChild(holder);
    }

    window.googleTranslateElementInit = function () {
      /* eslint-disable no-undef */
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: SUPPORTED.join(','),
        autoDisplay: false
      }, 'google_translate_element');
    };

    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }

  /* ---------- public: change language ---------- */
  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    setStoredLang(lang);
    setGoogTrans(lang);
    syncSwitchers(lang);
    document.documentElement.setAttribute('lang', lang);
    /* The widget only re-translates on load, so reload to apply cleanly.
     * (This is by design — one click, one clean render, no flicker.) */
    location.reload();
  }

  /* ---------- reflect current language in the switcher UI ---------- */
  function syncSwitchers(lang) {
    document.querySelectorAll('.ws-lang-switch').forEach(function (switcher) {
      var label = switcher.querySelector('.ws-lang-btn-text') || switcher.querySelector('.ws-lang-btn');
      if (label) label.textContent = LANG_LABELS[lang] || lang.toUpperCase();
      switcher.querySelectorAll('.ws-lang-option').forEach(function (opt) {
        opt.setAttribute('aria-checked', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
      });
    });
  }

  /* ---------- menu open/close + option wiring ---------- */
  function closeMenu(menu, btn) { menu.classList.remove('open'); if (btn) btn.setAttribute('aria-expanded', 'false'); }
  function openMenu(menu, btn)  { menu.classList.add('open');    if (btn) btn.setAttribute('aria-expanded', 'true');  }

  function wireSwitchers() {
    document.querySelectorAll('.ws-lang-switch').forEach(function (switcher) {
      var btn  = switcher.querySelector('.ws-lang-btn');
      var menu = switcher.querySelector('.ws-lang-menu');
      if (!btn || !menu) return;

      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = menu.classList.contains('open');
        document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
          if (m !== menu) closeMenu(m, m.closest('.ws-lang-switch').querySelector('.ws-lang-btn'));
        });
        isOpen ? closeMenu(menu, btn) : openMenu(menu, btn);
      });

      menu.querySelectorAll('.ws-lang-option').forEach(function (opt) {
        opt.setAttribute('role', 'option');
        opt.addEventListener('click', function () {
          var lang = opt.getAttribute('data-lang');
          closeMenu(menu, btn);
          setLanguage(lang);
        });
      });
      menu.setAttribute('role', 'listbox');
    });

    document.addEventListener('click', function () {
      document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
        closeMenu(m, m.closest('.ws-lang-switch').querySelector('.ws-lang-btn'));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
          var s = m.closest('.ws-lang-switch'); var b = s.querySelector('.ws-lang-btn');
          closeMenu(m, b); if (b) b.focus();
        });
      }
    });
  }

  /* ---------- init ---------- */
  function init() {
    var lang = getStoredLang() || DEFAULT_LANG;
    wireSwitchers();
    syncSwitchers(lang);
    document.documentElement.setAttribute('lang', lang);
    if (lang !== DEFAULT_LANG) {
      suppressGoogleChrome();
      setGoogTrans(lang);
      injectWidget();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ---------- public API (kept for backwards compat) ---------- */
  window.winsymI18n = {
    setLanguage: setLanguage,
    getLanguage: function () { return getStoredLang() || DEFAULT_LANG; },
    supported: SUPPORTED.slice()
  };
})();
