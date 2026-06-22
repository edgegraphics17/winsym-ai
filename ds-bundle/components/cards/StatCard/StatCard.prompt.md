# StatCard — Usage Guide

## Dashboard Stats Row (3 columns with 1px separator trick)
```html
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;
            background:var(--color-border);border:1px solid var(--color-border)">
  <div class="ws-stat-card">
    <div class="ws-stat-num">3</div>
    <div class="ws-stat-label">Courses Enrolled</div>
  </div>
  <div class="ws-stat-card">
    <div class="ws-stat-num">67%</div>
    <div class="ws-stat-label">Avg. Progress</div>
  </div>
  <div class="ws-stat-card">
    <div class="ws-stat-num">1</div>
    <div class="ws-stat-label">Certificates Earned</div>
  </div>
</div>
```
The `gap:1px; background:var(--color-border)` trick creates visible divider lines between cells without needing border CSS on each cell.

## Standalone Marketing Stats
```html
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px">
  <div class="ws-card ws-stat-card">
    <div class="ws-stat-num">8×</div>
    <div class="ws-stat-label">Company Brains to 100K</div>
  </div>
  <div class="ws-card ws-stat-card" style="--stat-color:var(--color-success)">
    <div class="ws-stat-num" style="color:var(--color-success)">30</div>
    <div class="ws-stat-label">Days to deploy</div>
  </div>
</div>
```

## Rules
- `ws-stat-num` is always Bebas Neue — don't override the font
- Number color: orange (default) for brand stats, green (`--color-success`) for completion/positive metrics
- Keep `ws-stat-label` text under 4 words — it's a micro label, not a sentence
