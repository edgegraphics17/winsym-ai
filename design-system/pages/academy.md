# Academy Hub — Design Overrides
> Inherits from `design-system/MASTER.md`.

## Purpose
Course catalogue. Unauthenticated: shows all courses, prompts sign-in for enrolled access.
Authenticated: shows enrolled courses with progress, highlights "continue" CTA.

## Layout Overrides

- **Course grid:** 1-col mobile → 2-col tablet → 3-col desktop
- **Hero section:** minimal — eyebrow + h1 + sub, no full-viewport. Max ~300px height.
- **Filter bar** (if added): sticky below nav, `--color-bg-overlay`, mono labels, orange active state

## Component Overrides

### Course Card (Academy variant)
- More vertical than dashboard version (full artwork height)
- Visual number: Bebas Neue, `clamp(4rem, 8vw, 7rem)`, `rgba(255,255,255,0.07)` background decoration
- `coming-soon` cards: desaturated, pointer-events none except for "notify me" trigger
- Free badge: `--color-success` border + text (not orange)
- Paid badge: `--color-orange` border + text

### Course meta row
- Dot separator: `--color-orange` 4px circle via `::before` pseudo
- Font: `--font-mono`, `--text-xxs`, `--color-text-muted`
- Items: Module count · Duration · Level

## State Notes

- Enrolled: show progress bar + "Continue" CTA (orange) instead of "Enroll"
- Not enrolled / unauthenticated: show "Enroll" or "Sign In to Access"
- Complete: green badge + "Review" CTA

## Animation

- Cards stagger in on page load: `animation-delay: calc(index * 60ms)`
- Respect `prefers-reduced-motion`
