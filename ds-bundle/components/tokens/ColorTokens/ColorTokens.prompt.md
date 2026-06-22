# ColorTokens — Usage Guide

winsym.ai is a dark-first design system. All colors are CSS custom properties; never write raw hex in components.

## Core Rule
```css
/* ✅ correct */
color: var(--color-orange);
background: var(--color-bg-raised);

/* ❌ wrong */
color: #C45A1A;
background: #232019;
```

## Background Layers (dark → deeper)
| Token | Use |
|-------|-----|
| `--color-bg` | Page root (#1C1917) |
| `--color-bg-raised` | Cards, panels (#232019) |
| `--color-bg-elevated` | Menus, modals (#2A2520) |
| `--color-surface` | Hero, deep sections (#0c0c0c) |
| `--color-bg-overlay` | Nav (with backdrop-filter blur) |

## Text Hierarchy
| Token | Use |
|-------|-----|
| `--color-text` | Primary body text |
| `--color-text-muted` | Labels, captions, secondary |
| `--color-text-dim` | Placeholders, inactive |
| `--color-text-inverse` | Text on orange buttons |

## Orange — Only for Action & Brand
Use orange only on: CTAs, active/hover states, brand accents, eyebrow labels, progress indicators, badges.
Do NOT use orange for decorative text or body copy.

```html
<!-- CTA button -->
<button style="background:var(--color-orange);color:var(--color-text-inverse)">Book a Call</button>

<!-- Eyebrow label -->
<div style="color:var(--color-orange);font-family:var(--font-mono)">Company Brain</div>

<!-- Focus ring -->
<input style="border-color:var(--color-orange);box-shadow:0 0 0 3px var(--color-orange-faint)">
```

## Light Mode
Apply `data-theme="light"` to `<html>`. All tokens automatically swap — no class changes needed on child elements.
