# TypeScale — Usage Guide

## Three Font Roles — Never Mix Outside Their Purpose

| Font | Token | Role |
|------|-------|------|
| Bebas Neue | `--font-display` | Headlines, stat numbers, nav logo, card titles |
| DM Sans | `--font-body` | All paragraph text, UI copy, inputs |
| DM Mono | `--font-mono` | Eyebrows, labels, badges, buttons, nav links, metadata |

## The Eyebrow Pattern (most common mono use)
All short uppercase labels above headings or in navigation use this pattern:
```html
<div class="type-eyebrow">Company Brain Method</div>
<!-- Renders: DM Mono · 0.55rem · 3px tracking · uppercase · orange -->
```

## The Label Pattern (secondary metadata)
```html
<div class="type-label">8 Modules · 4 Hours</div>
<!-- Renders: DM Mono · 0.65rem · 2px tracking · uppercase · muted -->
```

## Heading Pattern
```html
<h1 class="type-h1">AI Operating System</h1>
<!-- Renders: Bebas Neue · 3rem · 2px tracking -->

<h2 class="type-h2">Company Brain</h2>
<h3 class="type-h3">Phase 1 — Audit</h3>
```

## Hero (homepage only)
```html
<div class="type-hero">KARIM<span class="text-orange"> AZZAOUI</span></div>
<!-- Renders: Bebas Neue · clamp(5rem,10vw,9rem) · tracks tight -->
```

## Rules
- Bebas Neue is DISPLAY only — never use for body copy or inputs
- Body text minimum: 16px (`--text-base`) to avoid iOS auto-zoom
- Nav links and buttons always use `--font-mono` at `--text-xxs` with 3px tracking
- `color: var(--color-text-muted)` for secondary text, `var(--color-text-dim)` for placeholders
