# SectionLabel — Usage Guide

## Centered (marketing sections — lines on both sides)
```html
<div class="ws-section-label">Our Services</div>
<div class="ws-section-label">What We Build</div>
<div class="ws-section-label">Client Results</div>
```

## Left-Aligned (dashboard / app sections — no left line)
```html
<div class="ws-section-label ws-section-label-left">Your Courses</div>
<div class="ws-section-label ws-section-label-left">Certificates</div>
```

## Eyebrow (above a heading — orange, with left accent line, no flanking lines)
```html
<div class="type-eyebrow">Company Brain Method</div>
<h2 class="type-h2">Phase 3 — Build</h2>
```

## Full Section Header Pattern
```html
<div style="margin-bottom:48px">
  <div class="ws-section-label">What We Build</div>
  <h2 class="type-h2" style="margin-top:32px;margin-bottom:12px">
    The Company Brain
  </h2>
  <p style="color:var(--color-text-muted);font-size:1rem;max-width:540px;line-height:1.6">
    A custom AI Operating System — built for your business in 30 days.
    Five phases. Zero disruption.
  </p>
</div>
```

## Dashboard Section Pattern
```html
<div style="display:flex;align-items:baseline;gap:16px;margin-bottom:24px">
  <div class="ws-section-label ws-section-label-left">Enrolled Courses</div>
  <a href="/academy" class="type-label" style="color:var(--color-orange);margin-left:auto">
    Browse all →
  </a>
</div>
```

## Rule
Section labels are dividers, not headings — always follow with an `<h2>` or `<h3>` for the actual content title. Don't use them as standalone headings.
