/**
 * winsym.ai — i18n engine (v2 / CORTEX redesign)
 * ------------------------------------------------------------
 * One HTML file per page. Each page defines its own dictionary:
 *
 *   window.I18N = {
 *     en: { "nav.about": "About", "hero.title": "..." },
 *     de: { "nav.about": "Über uns", "hero.title": "..." },
 *     zh: { "nav.about": "关于我们", "hero.title": "..." }
 *   };
 *
 * Usage in markup:
 *   <a data-i18n="nav.about">About</a>                     -> textContent
 *   <input data-i18n="form.email" data-i18n-attr="placeholder">  -> attribute
 *   <img data-i18n="hero.imgAlt" data-i18n-attr="alt">
 *
 * Multiple data-i18n-attr targets can be comma-separated:
 *   data-i18n-attr="placeholder,aria-label"
 *
 * Language is persisted to localStorage under "winsym_lang".
 * Default language for first-time visitors is English ("en"),
 * regardless of browser locale, per winsym.ai content policy.
 *
 * No build step, no bundler — plain script, load after the DOM
 * (or with defer) and after window.I18N has been declared inline.
 * ------------------------------------------------------------
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'winsym_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'de'];
  var LANG_LABELS = { en: 'EN', de: 'DE' };

  function getStoredLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(v) !== -1 ? v : null;
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — fail silently, language still applies for this page view */
    }
  }

  function resolveDict(lang) {
    var table = window.I18N || {};
    return table[lang] || table[DEFAULT_LANG] || {};
  }

  function lookup(dict, key) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    // support dot-path fallback if dictionaries are ever nested instead of flat
    var parts = key.split('.');
    var node = dict;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return typeof node === 'string' ? node : undefined;
  }

  function applyTranslations(lang) {
    var dict = resolveDict(lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = lookup(dict, key);
      if (value === undefined) return; // leave existing content untouched if key missing

      var attrSpec = el.getAttribute('data-i18n-attr');
      if (attrSpec) {
        attrSpec.split(',').forEach(function (attr) {
          attr = attr.trim();
          if (!attr) return;
          if (attr === 'html') {
            el.innerHTML = value;
          } else {
            el.setAttribute(attr, value);
          }
        });
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.setAttribute('lang', lang);
    syncSwitchers(lang);

    document.dispatchEvent(new CustomEvent('winsym:langchange', { detail: { lang: lang } }));
  }

  function syncSwitchers(lang) {
    document.querySelectorAll('.ws-lang-switch').forEach(function (switcher) {
      var btn = switcher.querySelector('.ws-lang-btn');
      if (btn) btn.textContent = LANG_LABELS[lang] || lang.toUpperCase();
      switcher.querySelectorAll('.ws-lang-option').forEach(function (opt) {
        var isActive = opt.getAttribute('data-lang') === lang;
        opt.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });
    });
  }

  function closeMenu(menu, btn) {
    menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function openMenu(menu, btn) {
    menu.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    setStoredLang(lang);
    applyTranslations(lang);
  }

  function wireSwitchers() {
    document.querySelectorAll('.ws-lang-switch').forEach(function (switcher) {
      var btn = switcher.querySelector('.ws-lang-btn');
      var menu = switcher.querySelector('.ws-lang-menu');
      if (!btn || !menu) return;

      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = menu.classList.contains('open');
        // close any other open menus first
        document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
          if (m !== menu) closeMenu(m, m.closest('.ws-lang-switch').querySelector('.ws-lang-btn'));
        });
        if (isOpen) {
          closeMenu(menu, btn);
        } else {
          openMenu(menu, btn);
        }
      });

      menu.querySelectorAll('.ws-lang-option').forEach(function (opt) {
        opt.setAttribute('role', 'option');
        opt.addEventListener('click', function () {
          var lang = opt.getAttribute('data-lang');
          setLanguage(lang);
          closeMenu(menu, btn);
          btn.focus();
        });
      });

      menu.setAttribute('role', 'listbox');
    });

    // Global dismissal: outside click + Escape
    document.addEventListener('click', function () {
      document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
        closeMenu(m, m.closest('.ws-lang-switch').querySelector('.ws-lang-btn'));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.ws-lang-menu.open').forEach(function (m) {
          var switcher = m.closest('.ws-lang-switch');
          var btn = switcher.querySelector('.ws-lang-btn');
          closeMenu(m, btn);
          if (btn) btn.focus();
        });
      }
    });
  }

  function init() {
    var lang = getStoredLang() || DEFAULT_LANG;
    wireSwitchers();
    applyTranslations(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose a tiny public API in case a page needs to set language programmatically
  window.winsymI18n = {
    setLanguage: setLanguage,
    getLanguage: function () { return getStoredLang() || DEFAULT_LANG; },
    supported: SUPPORTED.slice()
  };
})();
