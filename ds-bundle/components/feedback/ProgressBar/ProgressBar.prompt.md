# ProgressBar — Usage Guide

## Basic Usage
```html
<!-- Green (course completion — default) -->
<div class="ws-progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="ws-progress-fill" style="width: 65%"></div>
</div>

<!-- Orange (in-progress / started) -->
<div class="ws-progress" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
  <div class="ws-progress-fill ws-progress-fill-orange" style="width: 20%"></div>
</div>
```

## With Label Row (dashboard context)
```html
<div style="margin-bottom:20px">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
    <span class="type-label">Company Brain Masterclass</span>
    <span style="font-family:var(--font-display);font-size:1rem;color:var(--color-orange)">65%</span>
  </div>
  <div class="ws-progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
    <div class="ws-progress-fill" style="width:65%"></div>
  </div>
</div>
```

## In Course Card Thumbnail
```html
<div style="position:relative;height:80px;background:#080808;overflow:hidden">
  <!-- decorative course number -->
  <span style="position:absolute;right:12px;bottom:-8px;font-family:var(--font-display);
               font-size:4rem;color:rgba(255,255,255,.07)">01</span>
  <!-- progress bar pinned to bottom of thumbnail -->
  <div style="position:absolute;bottom:0;left:0;right:0" class="ws-progress">
    <div class="ws-progress-fill" style="width:100%"></div>
  </div>
</div>
```

## Color Convention
- **Green** (`ws-progress-fill`) → 100% complete or > 50% progress
- **Orange** (`ws-progress-fill-orange`) → started but < 50%, or "in progress" state
- Never show a progress bar for 0% — hide it or show an "Enroll" state instead
