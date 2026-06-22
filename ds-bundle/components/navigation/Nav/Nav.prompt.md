# Nav — Usage Guide

## Marketing Nav (unauthenticated)
```html
<nav class="ws-nav" aria-label="Main navigation">
  <a href="/" class="ws-nav-logo">WINSYM<span class="accent">.AI</span></a>
  <ul class="ws-nav-links" role="list">
    <li><a href="/" class="ws-nav-link" aria-current="page">Home</a></li>
    <li><a href="/about" class="ws-nav-link">About</a></li>
    <li><a href="/projects" class="ws-nav-link">Projects</a></li>
    <li><a href="/academy" class="ws-nav-link">Academy</a></li>
    <li><a href="#contact" class="btn btn-ghost btn-sm">Book a Call</a></li>
  </ul>
  <button class="ws-theme-toggle" aria-label="Toggle light/dark mode">◐</button>
</nav>
```

## Academy Nav (authenticated — simplified)
```html
<nav class="ws-nav" aria-label="Academy navigation">
  <a href="/" class="ws-nav-logo">WINSYM<span class="accent">.AI</span></a>
  <ul class="ws-nav-links" role="list">
    <li><a href="/academy" class="ws-nav-link">← Academy</a></li>
    <li><button class="ws-theme-toggle" aria-label="Toggle theme">◐</button></li>
    <li>
      <div class="ws-avatar" role="button" aria-label="User menu" tabindex="0">K</div>
    </li>
  </ul>
</nav>
```

## Rules
- Logo: always `WINSYM` (all caps) + `<span class="accent">.AI</span>` — the `.accent` class applies orange color
- Nav links: DM Mono, auto-styled by `ws-nav-link` — don't add font-family manually
- `ws-nav` already handles: `position:sticky`, `top:0`, `z-index:200`, blur backdrop, border-bottom
- Active link: add `aria-current="page"` — it's both semantic and CSS-selectable
- CTA in nav: always `btn-ghost btn-sm` (not btn-primary — too heavy for nav)
- Mobile: hide all links except logo + CTA + theme toggle below 768px
