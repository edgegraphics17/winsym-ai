# Card — Usage Guide

## Base Card
```html
<div class="ws-card">
  <div class="type-eyebrow">Company Brain</div>
  <h3 class="type-h3">AI Operating System</h3>
  <p class="type-body" style="color:var(--color-text-muted);margin-top:8px">
    Built in 30 days. 5 phases. Fully integrated.
  </p>
</div>
```

## Interactive Card (hover lift — use for course/service links)
```html
<a href="/academy/course-1" class="ws-card ws-card-interactive">
  <div class="type-eyebrow">Module 01</div>
  <h3 class="type-h3">AI Foundations</h3>
  <p style="color:var(--color-text-muted);font-size:0.9rem;margin-top:8px">
    Start here. Practical AI literacy for business leaders.
  </p>
  <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--color-border);
              display:flex;align-items:center;justify-content:space-between">
    <span class="type-label">6 modules · 3 hours</span>
    <span class="ws-badge ws-badge-success">Free</span>
  </div>
</a>
```

## Card with Footer (price + meta)
```html
<div class="ws-card">
  <div class="type-eyebrow">Monthly Retainer</div>
  <h3 class="type-h3">Ongoing AI Support</h3>
  <p style="color:var(--color-text-muted);font-size:0.9rem;margin-top:8px">
    Continuous strategy and implementation — your AI partner every month.
  </p>
  <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--color-border);
              display:flex;align-items:center;justify-content:space-between">
    <span class="type-label">Recurring · Cancel anytime</span>
    <span style="font-family:var(--font-display);font-size:1.3rem;color:var(--color-orange)">MYR 3,500/mo</span>
  </div>
</div>
```

## Grid Layout
```html
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
  <!-- cards here -->
</div>
```

## Rules
- Cards always `background: var(--color-bg-raised)` — never white or transparent
- Border-radius: 0 — no rounding
- Use `ws-card-interactive` only for links (`<a href>`), never for non-navigating divs
- One card = one scannable idea — don't pack more than title + 2 lines body + one action
