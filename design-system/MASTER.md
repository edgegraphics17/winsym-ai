# winsym.ai — Design System MASTER
> Single source of truth. Version 1.0 · June 2026

All pages import `css/design-system.css` first. Page-specific overrides live in `design-system/pages/<page>.md`.

---

## Brand Essence

| Attribute | Value |
|-----------|-------|
| Positioning | "I translate Business into AI" — premium, results-only, no fluff |
| Aesthetic | Dark brutalism meets premium consultant — sharp angles, zero decoration |
| Mood | McKinsey meets Silicon Valley. Authoritative. Precise. |
| Anti-pattern | Gradients that look cheap · Generic stock imagery · Corporate clipart · Rounded pill buttons |

---

## 1. Color System

### Dark Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#1C1917` | Page background |
| `--color-bg-raised` | `#232019` | Card surfaces |
| `--color-bg-elevated` | `#2A2520` | Elevated cards, modals |
| `--color-bg-overlay` | `rgba(28,25,23,0.97)` | Nav, dropdowns (blur backdrop) |
| `--color-surface` | `#0c0c0c` | Deep surface, hero sections |
| `--color-text` | `#F5F2EE` | Primary text |
| `--color-text-muted` | `#8a8278` | Secondary text, labels |
| `--color-text-dim` | `#5a5550` | Placeholder, inactive |
| `--color-border` | `#2E2A27` | Default borders, dividers |
| `--color-border-mid` | `#5a5550` | Hovered borders |
| `--color-orange` | `#C45A1A` | Brand primary, CTA, accents |
| `--color-orange-hover` | `#E06820` | Orange hover state |
| `--color-orange-dim` | `#7a3010` | Orange borders, dim accents |
| `--color-orange-glow` | `rgba(196,90,26,0.15)` | Radial glow bg effect |
| `--color-orange-faint` | `rgba(196,90,26,0.08)` | Focus rings, badge bg |
| `--color-success` | `#22c55e` | Completion, free badge |
| `--color-success-dim` | `rgba(34,197,94,0.10)` | Success bg |
| `--color-danger` | `#f87171` | Errors, destructive |
| `--color-danger-dim` | `rgba(248,113,113,0.10)` | Error bg |

### Light Mode Overrides

| Token | Value |
|-------|-------|
| `--color-bg` | `#F5F1EB` |
| `--color-bg-raised` | `#EDE9E2` |
| `--color-text` | `#2C2416` |
| `--color-text-muted` | `#7A7066` |
| `--color-border` | `#DDD8CF` |
| `--color-orange` | `#B84F12` |
| `--color-orange-hover` | `#D06018` |

Light mode is applied by setting `data-theme="light"` on `<html>`. Managed by `js/theme.js`.

### Color Rules
- **Never use raw hex in components.** Always use CSS variables.
- **Orange = action/brand only.** Don't use it for decorative text.
- **Gray text on dark bg:** `--color-text-muted` (#8a8278) passes 3:1 contrast on `--color-bg`. Use for secondary labels only, not long-form copy.
- **Foreground text:** `--color-text` (#F5F2EE on #1C1917) = 9.7:1 contrast ✓ WCAG AAA

---

## 2. Typography

### Font Stack

| Role | Family | Use Case |
|------|--------|----------|
| Display | `'Bebas Neue', sans-serif` → `--font-display` | Hero headlines, stat numbers, nav logo, card titles |
| Body | `'DM Sans', sans-serif` → `--font-body` | All paragraph text, form inputs, general UI |
| Mono | `'DM Mono', monospace` → `--font-mono` | Eyebrows, labels, badges, nav links, buttons, metadata |

**Font weights in use:** 300 (body default), 400, 500 (mono/body emphasis), 700 (bold mono)

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xxs` | 0.55rem (8.8px) | Eyebrows, badge text, nav links, micro-labels |
| `--text-xs` | 0.65rem (10.4px) | Section labels, meta info |
| `--text-sm` | 0.75rem (12px) | Secondary labels |
| `--text-base` | 1rem (16px) | Body text |
| `--text-lg` | 1.125rem (18px) | Large body |
| `--text-xl` | 1.5rem (24px) | Section headings |
| `--text-2xl` | 2rem (32px) | Card headings, stat numbers |
| `--text-3xl` | 3rem (48px) | Sub-hero text |
| `--text-hero` | clamp(5rem, 10vw, 9rem) | Hero name/headline |

### Typography Rules
- **Eyebrows always:** `font-family: mono` + `uppercase` + `letter-spacing: 3px` + `color: orange`
- **Section labels:** `font-family: mono` + `uppercase` + `letter-spacing: 2px` + `color: muted`
- **Bebas Neue is display-only** — never use for body copy or form text
- **Minimum body text:** 16px / `--text-base`
- **Nav links:** `--text-xxs` mono, `2px` tracking — intentionally micro-scale for the aesthetic
- **Line height:** `1.5–1.6` for body, `1` for large display text

---

## 3. Spacing Scale

Base unit: **4px**

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-1` | 4px | Icon-text gap, tiny nudges |
| `--space-2` | 8px | Badge padding, button gap |
| `--space-3` | 12px | Input padding (vertical), compact padding |
| `--space-4` | 16px | Default component padding |
| `--space-5` | 20px | Toast padding |
| `--space-6` | 24px | Card padding, nav gap |
| `--space-8` | 32px | Button padding (horizontal), section sub-gaps |
| `--space-10` | 40px | Section content gaps |
| `--space-12` | 48px | Section padding (small screens) |
| `--space-16` | 64px | Section padding (tablet) |
| `--space-20` | 80px | Section padding (default) |
| `--space-24` | 96px | Section padding (tablet+) |
| `--space-32` | 128px | Section padding (desktop) |

---

## 4. Border Radius

winsym.ai uses a **sharp/angular aesthetic**. Never use rounded pill buttons.

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0 | Most components (cards, buttons, inputs) |
| `--radius-sm` | 2px | Subtle rounding (inputs only) |
| `--radius-md` | 4px | Minor softening |
| `--radius-lg` | 8px | Modals, dropdowns |
| `--radius-full` | 9999px | Avatars, dots, pill badges |

**Default for buttons: 0 (no radius).** Default for cards: 0.

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.3)` | Subtle card lift |
| `--shadow-md` | `0 8px 28px rgba(0,0,0,0.4)` | Default card hover |
| `--shadow-lg` | `0 12px 36px rgba(0,0,0,0.45)` | Hovered interactive cards |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,0.6)` | Modals |
| `--shadow-orange` | `0 0 24px rgba(196,90,26,0.25)` | Brand accent glow |

Light mode shadows are lower opacity (defined in tokens).

---

## 6. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-below` | -1 | Background decorative elements |
| `--z-base` | 0 | Default document flow |
| `--z-raised` | 10 | Hovered cards, overlapping elements |
| `--z-dropdown` | 100 | Dropdowns, user menus |
| `--z-sticky` | 200 | Sticky nav |
| `--z-overlay` | 400 | Overlay backgrounds |
| `--z-modal` | 1000 | Modals, dialogs |
| `--z-toast` | 2000 | Toast notifications |

---

## 7. Motion

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 80ms | Press/active state feedback |
| `--duration-fast` | 150ms | Hover transitions, colour changes |
| `--duration-base` | 220ms | Default UI transitions |
| `--duration-slow` | 350ms | Panel/card animations |
| `--duration-enter` | 400ms | Page-level enter animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Entering elements |
| `--ease-in` | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Exiting elements |
| `--ease-inout` | `cubic-bezier(0.645, 0.045, 0.355, 1.0)` | Symmetric transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toasts, popovers entering |

### Rules
- **Always declare** `@media (prefers-reduced-motion: reduce)` — zero durations
- Animate only `transform` and `opacity` — never `width/height/top/left`
- Card hover lift: `translateY(-4px)` at `--duration-slow`
- Progress bars: `width 0.8s ease` (exception: content-meaningful, not decorative)

---

## 8. Component Reference

### Import

Every page starts with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/design-system.css">
<script src="js/theme.js"></script>
```

### Buttons

```html
<!-- Primary CTA -->
<button class="btn btn-primary">Book Discovery Call</button>

<!-- Ghost (orange border) -->
<button class="btn btn-ghost">Learn More</button>

<!-- Neutral outline -->
<button class="btn btn-outline">Cancel</button>

<!-- Danger / destructive -->
<button class="btn btn-danger">Sign Out</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large CTA</button>

<!-- Loading state -->
<button class="btn btn-primary btn-loading" disabled>Loading...</button>
```

### Cards

```html
<!-- Standard card -->
<div class="ws-card">Content</div>

<!-- Interactive (hover lift) -->
<a href="#" class="ws-card ws-card-interactive">Course Card</a>

<!-- Stat card -->
<div class="ws-stat-card">
  <div class="ws-stat-num">8</div>
  <div class="ws-stat-label">Courses Enrolled</div>
</div>
```

### Badges

```html
<span class="ws-badge ws-badge-orange">New</span>
<span class="ws-badge ws-badge-success">Complete</span>
<span class="ws-badge ws-badge-muted">Coming Soon</span>
```

### Section Label (with flanking lines)

```html
<div class="ws-section-label">Our Services</div>

<!-- Left-aligned (no left line) -->
<div class="ws-section-label ws-section-label-left">Courses</div>
```

### Eyebrow (orange mono)

```html
<div class="type-eyebrow">Company Brain Method</div>
```

### Progress Bar

```html
<!-- Success green -->
<div class="ws-progress">
  <div class="ws-progress-fill" style="width: 65%"></div>
</div>

<!-- Orange -->
<div class="ws-progress">
  <div class="ws-progress-fill ws-progress-fill-orange" style="width: 40%"></div>
</div>
```

### Forms

```html
<div class="ws-form-group">
  <label class="ws-label" for="email">Email Address</label>
  <input class="ws-input" id="email" type="email" placeholder="you@company.com">
  <span class="ws-helper">We'll never share your email.</span>
</div>

<!-- Error state -->
<div class="ws-form-group">
  <label class="ws-label" for="pass">Password</label>
  <input class="ws-input ws-input-error" id="pass" type="password">
  <span class="ws-error">Password must be at least 8 characters.</span>
</div>
```

### Toast

```html
<!-- Toast region (place before </body>) -->
<div class="ws-toast-region" aria-live="polite" aria-atomic="true">
  <div class="ws-toast">
    <span class="ws-toast-dot"></span>
    Progress saved
  </div>
  <div class="ws-toast">
    <span class="ws-toast-dot ws-toast-dot-success"></span>
    Course complete
  </div>
</div>
```

### Navigation

```html
<nav class="ws-nav" aria-label="Main navigation">
  <a href="/" class="ws-nav-logo">WINSYM<span class="accent">.AI</span></a>
  <ul class="ws-nav-links" role="list">
    <li><a href="/academy" class="ws-nav-link">Academy</a></li>
    <li><a href="/about" class="ws-nav-link">About</a></li>
    <li><a href="#contact" class="btn btn-ghost btn-sm">Book Call</a></li>
  </ul>
  <button class="ws-theme-toggle" aria-label="Toggle theme">◐</button>
</nav>
```

### Callout / Quote

```html
<blockquote class="ws-callout">
  We built a Company Brain in 30 days and cut decision time by 60%.
</blockquote>
```

---

## 9. Layout & Breakpoints

### Container

```html
<div class="container">
  <!-- max-width: 1280px, auto margins, responsive padding -->
</div>
```

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `< 768px` | Default (mobile-first) |
| Tablet | `≥ 768px` | Navigation expands, section padding increases |
| Desktop | `≥ 1024px` | Full section padding |
| Wide | `≥ 1440px` | 2xl container |

---

## 10. Accessibility Checklist

Before any page ships:

- [ ] All interactive elements have `:focus-visible` outlines (orange, 2px)
- [ ] Color is not the only differentiator (badges have text + border, not just color)
- [ ] `alt` text on all meaningful images
- [ ] Form labels are associated (`for` + `id`)
- [ ] Error messages reference the field and explain how to fix
- [ ] `aria-live` on toast region
- [ ] `aria-current="page"` on active nav link
- [ ] `prefers-reduced-motion` respected
- [ ] Min touch target 44px (all buttons have `min-height: 44px`)
- [ ] Light mode tested independently (don't assume dark mode contrast transfers)

---

## 11. Page Registry

| Page | File | Design Override |
|------|------|----------------|
| Homepage | `winsymai.html` | `design-system/pages/homepage.md` |
| About / Identity | `karim-identity.html` | `design-system/pages/about.md` |
| Projects | `projects-showcase.html` | — |
| Academy Hub | `courses.html` | `design-system/pages/academy.md` |
| Dashboard | `dashboard.html` | `design-system/pages/dashboard.md` |
| Auth | `auth.html` | — |

---

## 12. Migration Guide

To migrate an existing page to use the design system:

1. Replace the inline `<style>` `:root {}` block with the shared import
2. Map old variable names → new tokens:

| Old | New |
|-----|-----|
| `--black` | `--color-bg` |
| `--white` | `--color-text` |
| `--orange` | `--color-orange` |
| `--orange-bright` | `--color-orange-hover` |
| `--orange-dim` | `--color-orange-dim` |
| `--orange-glow` | `--color-orange-glow` |
| `--gray` | `--color-text-muted` |
| `--gray-dim` | `--color-border` |
| `--gray-mid` | `--color-border-mid` |
| `--green` | `--color-success` |
| `--green-dim` | `--color-success-dim` |
| `--font-display` | same |
| `--font-body` | same |
| `--font-mono` | same |

3. Replace component CSS with `.ws-*` classes where applicable
4. Verify light mode visually (not just by inspection)
5. Run through the accessibility checklist above
