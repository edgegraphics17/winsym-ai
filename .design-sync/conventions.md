# winsym.ai Design System — Agent Conventions

This is a **CSS class-based design system** — no React runtime components. Every design uses HTML elements with CSS classes from `styles.css`. There is no component import syntax.

## Setup (required in every design)

Load styles and fonts in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

Dark mode is default. Light mode: add `data-theme="light"` to `<html>`.

## Styling Idiom: CSS Custom Properties + Class Vocabulary

Never write raw hex. Always use `var(--color-*)`. All design tokens are in `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — all auto-imported via `styles.css`.

```html
<!-- ✅ correct -->
<div style="background:var(--color-bg-raised);border:1px solid var(--color-border)">

<!-- ❌ wrong -->
<div style="background:#232019;border:1px solid #2E2A27">
```

## Three Font Roles

| Use case | Font | CSS variable |
|----------|------|-------------|
| Headlines, numbers, logo | Bebas Neue | `var(--font-display)` |
| Body text, inputs, paragraphs | DM Sans | `var(--font-body)` |
| Labels, badges, buttons, nav links | DM Mono | `var(--font-mono)` |

**Bebas Neue is display-only** — never use it for body copy or form fields.

## Class Vocabulary

**Buttons** — always `btn` base + one variant. Never use rounded corners (border-radius: 0).
```html
<button class="btn btn-primary">Book Discovery Call</button>
<button class="btn btn-ghost">Learn More</button>
<button class="btn btn-outline">Cancel</button>
<a href="#" class="btn btn-primary btn-lg">Large Hero CTA</a>
```

**Cards** — dark surface, sharp corners, hover lift for interactive.
```html
<div class="ws-card">...</div>
<a href="#" class="ws-card ws-card-interactive">...</a>
```

**Badges** — inline status labels.
```html
<span class="ws-badge ws-badge-orange">New</span>
<span class="ws-badge ws-badge-success">Complete</span>
<span class="ws-badge ws-badge-muted">Coming Soon</span>
```

**Typography classes** — type-eyebrow is the most common: DM Mono, orange, uppercase, 3px tracking.
```html
<div class="type-eyebrow">Company Brain Method</div>
<h1 class="type-h1">AI Operating System</h1>
<div class="type-label">8 Modules · 4 Hours</div>
```

**Forms** — always label + input + optional helper/error.
```html
<div class="ws-form-group">
  <label class="ws-label" for="email">Email</label>
  <input class="ws-input" id="email" type="email" placeholder="you@company.com">
</div>
```

**Stat display** — Bebas Neue number in orange, DM Mono label.
```html
<div class="ws-stat-card">
  <div class="ws-stat-num">8×</div>
  <div class="ws-stat-label">Company Brain clients to 100K</div>
</div>
```

**Section label** (divider with text).
```html
<div class="ws-section-label">Our Services</div>           <!-- centered, both lines -->
<div class="ws-section-label ws-section-label-left">Courses</div>  <!-- left, no left line -->
```

**Navigation**.
```html
<nav class="ws-nav">
  <a href="/" class="ws-nav-logo">WINSYM<span class="accent">.AI</span></a>
  <ul class="ws-nav-links" role="list">
    <li><a href="#" class="ws-nav-link">Services</a></li>
    <li><a href="#contact" class="btn btn-ghost btn-sm">Book a Call</a></li>
  </ul>
</nav>
```

## Where to Look

- All token values: `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`
- All component CSS: `_ds_bundle.css`
- Per-component usage examples: `components/<group>/<Name>/<Name>.prompt.md`
- Visual reference: `components/<group>/<Name>/<Name>.html`

## Idiomatic Build Example

```html
<!-- Service card — typical winsym.ai pattern -->
<a href="/services/company-brain" class="ws-card ws-card-interactive">
  <div class="type-eyebrow">Company Brain</div>
  <h3 class="type-h3" style="margin-top:12px">AI Operating System</h3>
  <p style="color:var(--color-text-muted);font-size:0.9rem;
            line-height:1.6;margin-top:8px">
    Built in 30 days. Five phases. Zero disruption to your team.
  </p>
  <div style="margin-top:20px;padding-top:16px;
              border-top:1px solid var(--color-border);
              display:flex;align-items:center;justify-content:space-between">
    <span class="type-label">30 days · Fully managed</span>
    <span style="font-family:var(--font-display);
                 font-size:1.3rem;color:var(--color-orange)">MYR 12,000</span>
  </div>
</a>
```
