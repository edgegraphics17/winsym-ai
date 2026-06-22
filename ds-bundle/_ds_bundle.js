/* @ds-bundle winsym-ai v1.0.0 shape:css-only */
/**
 * winsym.ai Design System — CSS class-based system
 *
 * No React runtime components. The design agent applies CSS classes
 * from window.WinsymAI.classes to any HTML element. All styles come
 * from styles.css (import it or _ds_bundle.css) and the Google Fonts
 * import in fonts/fonts.css.
 *
 * Usage pattern:
 *   <button class="btn btn-primary">Book a Call</button>
 *   <div class="ws-card ws-card-interactive">…</div>
 */
(function () {
  'use strict';

  window.WinsymAI = {
    version: '1.0.0',

    /* CSS class vocabulary ─────────────────────────── */
    classes: {
      /* Buttons */
      btn:        'btn',
      btnPrimary: 'btn btn-primary',
      btnGhost:   'btn btn-ghost',
      btnOutline: 'btn btn-outline',
      btnDanger:  'btn btn-danger',
      btnSm:      'btn btn-sm',
      btnLg:      'btn btn-lg',
      btnLoading: 'btn btn-loading',

      /* Cards */
      card:            'ws-card',
      cardInteractive: 'ws-card ws-card-interactive',
      statCard:        'ws-stat-card',
      statNum:         'ws-stat-num',
      statLabel:       'ws-stat-label',

      /* Badges */
      badge:        'ws-badge',
      badgeOrange:  'ws-badge ws-badge-orange',
      badgeSuccess: 'ws-badge ws-badge-success',
      badgeMuted:   'ws-badge ws-badge-muted',

      /* Forms */
      formGroup:  'ws-form-group',
      label:      'ws-label',
      input:      'ws-input',
      inputError: 'ws-input ws-input-error',
      helper:     'ws-helper',
      error:      'ws-error',

      /* Typography */
      typeHero:    'type-hero',
      typeH1:      'type-h1',
      typeH2:      'type-h2',
      typeH3:      'type-h3',
      typeEyebrow: 'type-eyebrow',
      typeLabel:   'type-label',
      typeCaption: 'type-caption',
      textOrange:  'text-orange',
      textMuted:   'text-muted',
      textDim:     'text-dim',

      /* Navigation */
      nav:      'ws-nav',
      navLogo:  'ws-nav-logo',
      navLinks: 'ws-nav-links',
      navLink:  'ws-nav-link',

      /* Layout */
      container:        'container',
      section:          'section',
      sectionSm:        'section-sm',
      sectionLabel:     'ws-section-label',
      sectionLabelLeft: 'ws-section-label ws-section-label-left',

      /* Feedback */
      progress:            'ws-progress',
      progressFill:        'ws-progress-fill',
      progressFillOrange:  'ws-progress-fill ws-progress-fill-orange',
      toastRegion:         'ws-toast-region',
      toast:               'ws-toast',
      toastDot:            'ws-toast-dot',
      toastDotSuccess:     'ws-toast-dot ws-toast-dot-success',
      toastDotDanger:      'ws-toast-dot ws-toast-dot-danger',

      /* Misc */
      avatar:       'ws-avatar',
      themeToggle:  'ws-theme-toggle',
      divider:      'ws-divider',
      callout:      'ws-callout',
      accentLine:   'ws-accent-line',
      glowBg:       'ws-glow-bg',
      srOnly:       'sr-only',
    },

    /* Design token values (mirrors CSS custom properties) ── */
    tokens: {
      colors: {
        bg:           '#1C1917',
        bgRaised:     '#232019',
        bgElevated:   '#2A2520',
        text:         '#F5F2EE',
        textMuted:    '#8a8278',
        textDim:      '#5a5550',
        border:       '#2E2A27',
        borderMid:    '#5a5550',
        orange:       '#C45A1A',
        orangeHover:  '#E06820',
        orangeDim:    '#7a3010',
        success:      '#22c55e',
        danger:       '#f87171',
      },
      fonts: {
        display: "'Bebas Neue', sans-serif",
        body:    "'DM Sans', sans-serif",
        mono:    "'DM Mono', monospace",
      },
      spacing: {
        1:  '4px',  2:  '8px',  3:  '12px', 4:  '16px',
        5:  '20px', 6:  '24px', 8:  '32px', 10: '40px',
        12: '48px', 16: '64px', 20: '80px', 24: '96px',
      },
    },
  };
})();
