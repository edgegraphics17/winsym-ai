# Button — Usage Guide

## Class Vocabulary

```html
<!-- Primary CTA (orange fill — use for the ONE main action per screen) -->
<button class="btn btn-primary">Book Discovery Call</button>

<!-- Ghost (orange border — secondary action) -->
<button class="btn btn-ghost">Learn More</button>

<!-- Outline neutral (tertiary / cancel) -->
<button class="btn btn-outline">Cancel</button>

<!-- Danger (destructive actions only) -->
<button class="btn btn-danger">Sign Out</button>
```

## Sizes
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large Hero CTA</button>
```

## Navigation Links (use `<a>` not `<button>`)
```html
<a href="/academy" class="btn btn-ghost">Explore Academy</a>
<a href="#contact" class="btn btn-primary btn-lg">Book a Free Call</a>
```

## Loading / Disabled
```html
<button class="btn btn-primary btn-loading" disabled>Saving…</button>
```

## Rules
- **One primary button per screen** — never stack two `btn-primary` side by side
- **Never use rounded corners** — border-radius is 0 by design; the sharp edge is the brand
- **Min touch target 44px** — already enforced by `min-height` in the base `btn` class
- **Orange = action** — only use `btn-primary` or `btn-ghost` for genuine user actions, not decorative links
- Buttons always use DM Mono font — do not override `font-family`
