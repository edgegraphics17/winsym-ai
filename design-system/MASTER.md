# winsym.ai — Design System MASTER
> Single source of truth. Version 2.0 · June 2026 · "CORTEX / Cream"
> Supersedes v1 (dark brutalism, June 2026). Replaced per Karim's direction to adopt the CORTEX/Cohere-inspired aesthetic site-wide.

All pages import `css/design-system.css` first, then `js/i18n.js`. Page-specific overrides live in `design-system/pages/<page>.md`.

---

## Brand Essence

| Attribute | Value |
|-----------|-------|
| Positioning | "I translate Business into AI" — premium, results-only, no fluff |
| Aesthetic | Editorial warmth meets technical credibility — cream surfaces, serif display type, rounded geometry, orange accent. Inspired by cohere.com's visual language. |
| Mood | Premium AI lab meets independent consultancy. Approachable, confident, never cold. |
| Anti-pattern | Gradients that look cheap · Generic stock imagery · Corporate clipart · Sharp/angular dark-brutalist UI (v1, retired) |

**Why the shift from v1:** Karim approved the CORTEX homepage prototype (built against cohere.com/de as reference) and directed a full-site adoption. v1's dark/sharp aesthetic is retired; this file documents the replacement system used across all 8 pages of winsym.ai.

---

## 1. Color System

Single palette — **no dark/light mode toggle**. Cream is the default and only background.

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#F5F2EE` | Page background |
| `--card` | `#EFEAE1` | Card surfaces, toggle-group bg |
| `--card-border` | `#E3DCCF` | Borders, dividers |
| `--black` | `#1C1917` | Headings, body text, dark sections |
| `--white` | `#FFFFFF` | Stat cards, price cards, inputs |
| `--orange` | `#C45A1A` | Brand accent, icons, eyebrow dot, links |
| `--orange-bright` | `#E06820` | Hover on brand accent / on-dark accent |
| `--orange-cta` | `#A64C16` | Primary button background |
| `--orange-cta-bright` | `#934313` | Primary button hover |
| `--orange-faint` | `rgba(196,90,26,0.08)` | Focus rings, chip backgrounds |
| `--orange-glow` | `rgba(196,90,26,0.18)` | Button shadow glow |
| `--gray` | `#5A5550` | Body copy on cream |
| `--gray-light` | `#6E6860` | Secondary/muted text, labels |
| `--gray-dark` | `#3A3631` | — |
| `--success` | `#22c55e` | Completion states |
| `--danger` | `#dc2626` | Errors, destructive actions |

**Back-compat aliases** are defined in the stylesheet (`--color-bg`, `--color-text`, `--color-orange`, etc.) mapping to the new tokens, so any legacy markup referencing v1 variable names degrades gracefully rather than breaking — but new work should use the v2 names directly.

### Color Rules
- **Never use raw hex in components.** Always use CSS variables.
- **Orange = action/brand only.** Don't use it for decorative text or large fill areas.
- **Body text on cream:** `--black` on `--cream` = 14.8:1 ✓ WCAG AAA. `--gray` on `--cream` ≈ 5.4:1 ✓ AA for body text.
- **Dark sections** (trust strip, credibility, footer, final CTA) use `--black` as background with `--cream`/`#C9C2B6` text — verify contrast per component, documented inline in `css/design-system.css`.
- **There is no theme toggle.** `js/theme.js` and `data-theme="light"` from v1 are retired — do not reference them in new pages.

---

## 2. Typography

### Font Stack

| Role | Family | Use Case |
|------|--------|----------|
| Display | `'Fraunces', serif` → `--font-display` | Headlines, hero text, stat numbers, step/tab panel headings |
| Body | `'DM Sans', sans-serif` → `--font-body` | All paragraph text, buttons, form inputs, nav links, general UI |
| Mono | `'DM Mono', monospace` → `--font-mono` | Eyebrows, section labels, badges, price tiers, lang switcher — **labels only, never body copy** |

**Key shift from v1:** Bebas Neue is retired as the display font; Fraunces (a serif) now carries all headline weight. Buttons are now set in normal-case DM Sans — v1's mono/uppercase/wide-tracking button convention is retired.

### Type Scale

| Token / class | Size | Usage |
|-------|------|-------|
| `h1` / `.type-h1` | `clamp(34px, 4.6vw, 56px)` | Page hero headline |
| `h2` / `.type-h2` | `clamp(28px, 3.4vw, 44px)` | Section headings |
| `h3` / `.type-h3` | 20px | Card/panel headings |
| `h4` | 16px | Minor headings |
| `.type-body-lg` | 18px | Hero lead paragraph |
| `.type-body` | 16px | Standard body |
| `.type-body-sm` | 14px | Secondary/meta text |
| `.eyebrow` / `.type-eyebrow` | 12px mono | Orange label above headings, with a dot marker |
| `.ws-section-label` | 12px mono | Section label with flanking horizontal rules |

### Typography Rules
- **Eyebrows always:** `--font-mono` + uppercase + `0.14em` tracking + `--orange`, with a small dot (`::before`) marker.
- **Headlines are serif (Fraunces), bold (700–900), tight tracking** (`-0.01em`).
- **Buttons:** DM Sans, 600 weight, normal case — never mono/uppercase in v2.
- **Minimum body text:** 16px.
- **Line height:** 1.5–1.6 body, ~1.08–1.1 for large display headlines.

---

## 3. Radius & Shape

v2 reverses v1's "never round" rule. Rounded geometry is now the signature.

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 10px | Inputs |
| `--radius-md` | 18px | Cards, tab visuals, step buttons |
| `--radius-lg` | 28px | Step panels, final CTA block, swipe cards, dark lists |
| `--radius-full` | 100px | **All buttons** (pill-shaped), badges, lang switcher, toggle group |

**Default for buttons: full pill.** Default for cards: `--radius-md`.

---

## 4. Shadows & Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(28,25,23,0.06)` | Subtle lift |
| `--shadow-md` | `0 8px 24px -8px rgba(28,25,23,0.12)` | Card hover |
| `--shadow-lg` | `0 16px 36px -12px rgba(28,25,23,0.18)` | Dropdowns, lang menu, modals |
| `--shadow-orange` | `0 8px 20px -8px var(--orange-glow)` | Primary button accent shadow |

Durations: `--duration-fast` 150ms, `--duration-base` 220ms, `--duration-slow` 350ms. Easing: `--ease: cubic-bezier(.4,0,.2,1)`.

### Rules
- **Always declare** `@media (prefers-reduced-motion: reduce)` — already handled globally in `css/design-system.css`.
- Animate only `transform`, `opacity`, `box-shadow`, `border-color`, `background` — never `width/height/top/left`.
- Card hover lift: `translateY(-4px)` at `--duration-slow`.

---

## 5. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-sticky` | 200 | Sticky header |
| `--z-dropdown` | 300 | Lang switcher menu |
| `--z-overlay` | 400 | Mobile nav overlay |
| `--z-toast` | 2000 | Toast notifications |

(Reduced from v1's full scale since the WhatsApp float/hamburger no longer need a 9000+ stack — see `.wa-float` and `.nav-burger` in the stylesheet for their actual fixed values.)

---

## 6. Component Reference

### Import (every page, in this order)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,400..600&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/design-system.css">
<script src="js/i18n.js"></script>
```

### Buttons

```html
<button class="btn btn-primary">Book a Discovery Call</button>
<button class="btn btn-ghost">Learn More</button>
<button class="btn btn-outline">Cancel</button>
<button class="btn btn-danger">Sign Out</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large CTA</button>
<button class="btn btn-primary btn-loading" disabled>Loading...</button>
```

All buttons are pill-shaped (`--radius-full`), DM Sans 600, normal case, min-height 44px.

### Cards

```html
<div class="ws-card">Content</div>
<a href="#" class="ws-card ws-card-interactive">Hover-lift card</a>

<div class="ws-stat-card">
  <span class="ws-stat-num">8</span>
  <span class="ws-stat-label">Company Brains Built</span>
</div>
```

### Badges

```html
<span class="ws-badge ws-badge-orange"><span class="dot"></span>New</span>
<span class="ws-badge ws-badge-success"><span class="dot"></span>Complete</span>
<span class="ws-badge ws-badge-muted">Coming Soon</span>
```

### Eyebrow & Section Label

```html
<div class="eyebrow">Company Brain Method</div>
<div class="ws-section-label">Our Services</div>
```

### Language Switcher (new in v2 — see also `js/i18n.js`)

```html
<div class="ws-lang-switch">
  <button class="ws-lang-btn" aria-haspopup="listbox" aria-expanded="false">EN</button>
  <div class="ws-lang-menu" role="listbox">
    <button class="ws-lang-option" role="option" aria-checked="true" data-lang="en">English</button>
    <button class="ws-lang-option" role="option" aria-checked="false" data-lang="de">Deutsch</button>
    <button class="ws-lang-option" role="option" aria-checked="false" data-lang="zh">简体中文</button>
  </div>
</div>
```

Wired up automatically by `js/i18n.js` — see Section 8.

### Maturity Stepper

```html
<div class="stepper-track" role="tablist" aria-label="Company Brain phases">
  <button class="step-btn" role="tab" aria-selected="true" data-step="0">
    <span class="step-num">01</span><span class="step-name">Audit</span>
  </button>
  <!-- ...more steps -->
</div>
<div class="step-panel" role="tabpanel">...</div>
```

### Tabs (Solutions)

```html
<div class="tabs-nav" role="tablist">
  <button class="tab-btn" role="tab" aria-selected="true">For Founders</button>
  <button class="tab-btn" role="tab" aria-selected="false">For Teams</button>
</div>
<div class="tab-panel" role="tabpanel">...</div>
```

### Swipe-scroll cards (Industries / case studies)

```html
<div class="swipe-scroll">
  <div class="swipe-card" style="background:#2A2520"><div class="sc-content"><h3>Retail</h3></div></div>
  <!-- ...more cards -->
</div>
<div class="scroll-ctrls">
  <button class="scroll-btn" aria-label="Scroll left">←</button>
  <button class="scroll-btn" aria-label="Scroll right">→</button>
</div>
```

### Pricing Toggle + Cards

```html
<div class="ws-toggle-group" role="group" aria-label="Currency">
  <button class="ws-toggle-btn" aria-pressed="true">MYR</button>
  <button class="ws-toggle-btn" aria-pressed="false">EUR</button>
</div>
<div class="pricing-grid">
  <div class="price-card featured">
    <span class="price-tier-name">Company Brain</span>
    <div class="price-target">For SMEs ready to operationalise AI</div>
    <div class="price-num">MYR 12,000</div>
    <div class="price-sub">30-day build</div>
    <a class="btn btn-primary" href="#contact">Book a Call</a>
  </div>
</div>
```

### Forms

```html
<div class="ws-form-group">
  <label class="ws-label" for="email">Email Address</label>
  <input class="ws-input" id="email" type="email" placeholder="you@company.com">
  <span class="ws-helper">We'll never share your email.</span>
</div>
```

### Toast

```html
<div class="ws-toast-region" aria-live="polite" aria-atomic="true">
  <div class="ws-toast"><span class="ws-toast-dot ws-toast-dot-success"></span>Saved</div>
</div>
```

### Navigation

```html
<header class="ws-header">
  <nav class="ws-nav" aria-label="Main navigation">
    <a href="/" class="ws-nav-logo">
      <span class="brand-mark">winsym<span class="accent">.ai</span></span>
    </a>
    <ul class="ws-nav-links" role="list">
      <li><a href="/cortex" class="ws-nav-link" data-i18n="nav.cortex">CORTEX</a></li>
      <li><a href="/academy" class="ws-nav-link" data-i18n="nav.academy">Academy</a></li>
      <li><a href="/about" class="ws-nav-link" data-i18n="nav.about">About</a></li>
      <li><a href="/projects" class="ws-nav-link" data-i18n="nav.projects">Projects</a></li>
    </ul>
    <div class="ws-nav-ctas">
      <div class="ws-lang-switch"><!-- see above --></div>
      <a href="#contact" class="btn btn-ghost btn-sm" data-i18n="nav.cta">Book a Call</a>
    </div>
    <button class="nav-burger" aria-label="Open menu" aria-expanded="false">☰</button>
  </nav>
</header>
```

### Final CTA

```html
<div class="final-cta">
  <h2>Ready to build your Company Brain?</h2>
  <p>30 days. One AI Operating System. Zero fluff.</p>
  <div class="cta-row">
    <a class="btn btn-primary btn-lg" href="#contact">Book a Free Discovery Call</a>
    <a class="btn btn-ghost btn-lg" href="/cortex">Explore CORTEX</a>
  </div>
</div>
```

---

## 7. Layout & Breakpoints

### Container

```html
<div class="wrap"><!-- max-width: 1240px, auto margins, responsive padding --></div>
```

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `< 768px` | Default; nav collapses to hamburger below 920px |
| Tablet | `≥ 768px` | Section padding increases |
| Desktop | `≥ 920px` | Full nav links visible |
| Wide | `≥ 1240px` | Container hits max-width |

---

## 8. Internationalisation (new in v2)

winsym.ai is trilingual: **English (default), German, Simplified Chinese.**

- **One HTML file per page** — no `/de/` or `/zh/` file duplication.
- `js/i18n.js` is the shared engine: reads a per-page `window.I18N = { en: {...}, de: {...}, zh: {...} }` dictionary, applies strings to every `[data-i18n="key.path"]` element (`textContent` by default; `data-i18n-attr="placeholder"` etc. for attributes), wires the `.ws-lang-switch` dropdown, and persists the chosen language to `localStorage` under `winsym_lang`.
- **Default language is English** for first-time visitors (no stored preference) regardless of browser locale, per Karim's explicit instruction — content was historically partly German, and English is now the canonical base.
- `<html lang="">` is updated on language switch for accessibility/SEO; `[data-lang-only]` blocks (rare) can hide/show whole sections per language.
- Every page-level dictionary lives inline in that page's own `<script>` block (not a separate JSON file) to keep the "no build step" constraint intact.

---

## 9. Accessibility Checklist

Before any page ships:

- [ ] All interactive elements have `:focus-visible` outlines (orange, 2px)
- [ ] Color is not the only differentiator (badges have text + icon/border, not just color)
- [ ] `alt` text on all meaningful images
- [ ] Form labels are associated (`for` + `id`)
- [ ] Error messages reference the field and explain how to fix
- [ ] `aria-live` on toast region
- [ ] `aria-current="page"` on active nav link
- [ ] `aria-selected`/`role="tab"` correctly wired on Stepper and Tabs components
- [ ] `prefers-reduced-motion` respected
- [ ] Min touch target 44px (all buttons have `min-height: 44px`)
- [ ] Lang switcher reachable and operable by keyboard; `aria-expanded`/`aria-checked` kept in sync
- [ ] Body text contrast verified against cream (`--gray` on `--cream` ≥ 4.5:1)

---

## 10. Page Registry

| Page | File | Design Override | Status |
|------|------|----------------|--------|
| Homepage | `winsymai.html` | `design-system/pages/homepage.md` | pending rebuild (task #14) |
| CORTEX | `cortex.html` (new) | — | pending build (task #20) |
| About / Identity | `karim-identity.html` | `design-system/pages/about.md` | pending rebuild (task #16) |
| Projects | `projects-showcase.html` | — | pending rebuild (task #17) |
| Academy Hub | `academy.html` / `courses.html` / `claude-academy.html` | `design-system/pages/academy.md` | pending consolidation + rebuild (task #18) |
| Dashboard | `dashboard.html` | `design-system/pages/dashboard.md` | pending rebuild (task #19) |
| Auth | `auth.html` | — | pending rebuild (task #19) |

---

## 11. Migration Notes (v1 → v2)

Each page currently has its own embedded `<style>` block and does **not** import `css/design-system.css` (confirmed via repo scan, June 2026) — so migration is additive per page, not a breaking change to anything live.

1. Replace the inline `<style>` `:root{}` block with the shared import (Section 6).
2. Map any v1 variable references → v2 tokens:

| v1 | v2 |
|-----|-----|
| `--color-bg` / `--black` | `--cream` (page bg is now light) |
| `--color-text` / `--white` | `--black` (text is now dark-on-cream) |
| `--color-orange` | `--orange` |
| `--color-orange-hover` | `--orange-bright` |
| `--font-display` (Bebas Neue) | `--font-display` (Fraunces) — same token name, new font |
| Sharp/zero radius buttons | `--radius-full` pill buttons |
| Mono/uppercase button text | Normal-case DM Sans |
| `js/theme.js` / `data-theme="light"` toggle | Removed — single cream theme, no toggle |

3. Replace component CSS with `.ws-*` classes from `css/design-system.css`.
4. Add `data-i18n` keys + the page's `window.I18N` dictionary; load `js/i18n.js`.
5. Run `design:design-critique` + `design:accessibility-review` before marking the page complete (per CLAUDE.md Rule 3.4).
6. Screenshot-verify desktop + mobile against this doc before moving to the next page.
