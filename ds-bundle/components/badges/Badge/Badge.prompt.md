# Badge — Usage Guide

## All Variants
```html
<span class="ws-badge ws-badge-orange">New</span>
<span class="ws-badge ws-badge-success">Complete</span>
<span class="ws-badge ws-badge-success">Free</span>
<span class="ws-badge ws-badge-muted">Coming Soon</span>
```

## In Course Cards
```html
<!-- Top-right of card thumbnail -->
<div style="position:relative">
  <span class="ws-badge ws-badge-success"
        style="position:absolute;top:12px;right:12px">Free</span>
</div>

<!-- In card footer -->
<div style="display:flex;align-items:center;justify-content:space-between;
            margin-top:16px;padding-top:16px;border-top:1px solid var(--color-border)">
  <span class="type-label">6 modules · 3 hours</span>
  <span class="ws-badge ws-badge-orange">New</span>
</div>
```

## In Navigation (notification count)
```html
<li style="position:relative">
  <a href="#" class="ws-nav-link">Academy</a>
  <span class="ws-badge ws-badge-orange"
        style="position:absolute;top:-6px;right:-18px;font-size:0.4rem;padding:2px 5px">3</span>
</li>
```

## Rules
- Max 2 words in a badge — "Complete" not "Marked as Complete"
- Never use a badge as the primary action — pair with a button or link if action needed
- `ws-badge-orange` = attention / brand; `ws-badge-success` = positive / done; `ws-badge-muted` = neutral / future
