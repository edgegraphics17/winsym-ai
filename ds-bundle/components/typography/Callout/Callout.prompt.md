# Callout — Usage Guide

## Quote / Testimonial
```html
<blockquote class="ws-callout">
  "We built a Company Brain in 30 days and cut our decision-making time by 60%.
  Every department now runs on AI."
  <cite style="display:block;margin-top:10px;font-style:normal;
               font-family:var(--font-mono);font-size:0.55rem;
               letter-spacing:2px;text-transform:uppercase;color:var(--color-orange)">
    — CEO, logistics company · KL
  </cite>
</blockquote>
```

## Highlight / Insight Block
```html
<div style="background:var(--color-orange-faint);
            border:1px solid var(--color-border);
            border-left:2px solid var(--color-orange);
            padding:20px 24px">
  <div class="type-eyebrow" style="margin-bottom:8px">Key Insight</div>
  <p style="color:var(--color-text-muted);font-size:0.95rem;line-height:1.6">
    One Company Brain engagement at MYR 12,000 covers 12% of the monthly 100K target.
    Eight clients = the milestone.
  </p>
</div>
```

## Stat Callout (impact number + descriptor)
```html
<div style="display:flex;align-items:baseline;gap:20px;
            padding:24px 0;border-top:1px solid var(--color-border)">
  <span class="type-h1" style="color:var(--color-orange);flex-shrink:0">8×</span>
  <p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.5;max-width:240px">
    Company Brain engagements per month to hit MYR 100,000 — the single clearest path.
  </p>
</div>
```

## Accent Line Decorator (inline section marker)
```html
<div class="ws-accent-line" style="margin-bottom:16px">
  Phase 3 of 5 — Build
</div>
```
The `ws-accent-line::before` pseudo-element draws a 24px orange horizontal rule automatically.

## Rules
- `ws-callout` is for testimonials and key quotes — always include a `<cite>` with attribution
- Highlight blocks use `--color-orange-faint` background — not full orange
- Stat callouts: the number is always Bebas Neue in orange, descriptor in muted body text
