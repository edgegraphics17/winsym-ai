# Homepage — Design Overrides
> Inherits from `design-system/MASTER.md`.

## Purpose
Marketing landing page. Primary goal: book a discovery call. Secondary: build authority.

## Sections (in order)

1. **Hero** — full-viewport, noise texture, orange glow, Bebas Neue headline
2. **Stats / Social Proof** — Google/Meta Partner, client numbers
3. **Services** — Company Brain, Retainer, Academy
4. **About** — condensed Karim identity block
5. **Projects / Case Studies** — client results
6. **CTA** — "Book Discovery Call" primary orange button
7. **Footer** — minimal: logo, nav links, contact

## Layout Overrides

- **Hero:** `min-height: 100dvh`, `background: --color-surface` with noise texture and orange radial glow
- **Nav on homepage:** transparent background scrolls to solid at 56px scroll — use IntersectionObserver or scroll listener
- **Container pad:** `clamp(1.5rem, 5vw, 4rem)` (slightly wider than default)

## Typography Overrides

- **Hero headline:** `--font-display`, `--text-hero`, `letter-spacing: 0` (Bebas Neue is wide enough)
- **Hero subheadline:** `--text-xl`, `font-weight: 300`, `--color-text-muted`, max-width 600px
- **Service labels:** `--font-mono`, `--text-xxs`, orange, `3px` tracking

## Key CTAs

- Primary: `<a class="btn btn-primary btn-lg" href="#contact">Book a Free Discovery Call</a>`
- Secondary: `<a class="btn btn-ghost" href="/academy">Explore Academy</a>`

## Special Components

### Noise hero bg
```css
.hero {
  position: relative;
  background: var(--color-surface);
  overflow: hidden;
}
.hero::before { /* orange glow */ }
.hero::after  { /* noise texture, opacity 0.04 */ }
```

### Service card — borderless dark
- `background: transparent`
- `border-top: 1px solid --color-border` (top rule only)
- Number in giant Bebas, very low opacity (orange 0.10), absolutely positioned

## SEO Notes

- `<h1>` = "AI Coach Kuala Lumpur | winsym.ai"
- First visible `<h2>` = "Company Brain — Your AI Operating System"
- Keyword density target: "AI coaching Malaysia", "Company Brain", "AI consultant KL"
