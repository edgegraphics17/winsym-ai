# Dashboard Page — Design Overrides
> Inherits everything from `design-system/MASTER.md`. Only overrides listed here.

## Purpose
Authenticated user home. Shows: welcome (personalized), stats row, enrolled courses, certifications, skills.

## Layout Overrides

- **Top nav:** simplified — logo + home back-link + user avatar/menu + theme toggle. No marketing links.
- **Stats row:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: --color-border` — 1px gap creates line separator effect.
- **Content grid:** single column on mobile, 2-col course cards on tablet+, 3-col on desktop.

## Component Overrides

### Course Card (Dashboard variant)
- Background: `--color-bg-raised` (#232019)
- No hover lift on `coming-soon` state
- Progress bar always visible below thumbnail
- Badge in top-right corner of thumbnail

### Stat Card
- Background: `--color-bg` (no raise) — the grid gap creates visual separation
- No border — relies on gap background for division

## Typography Overrides

- **Welcome tag:** `--text-xxs` mono, `3px` tracking, orange — "WELCOME BACK"
- **Welcome name (static):** `--font-display`, `clamp(2rem, 5vw, 3rem)`, white
- **Welcome user (dynamic):** `--font-display`, `clamp(2.5rem, 6vw, 4.5rem)`, orange
- **Welcome sub:** `--text-base`, `--color-text-muted`

## Interaction Notes

- Course card links to `academy.html?course=<id>` — never open in new tab
- User menu: click-toggle, close on outside click, close on Escape key
- Theme toggle persists via `localStorage` (handled by `js/theme.js`)
- Progress bars animate in on page load (not on hover)
