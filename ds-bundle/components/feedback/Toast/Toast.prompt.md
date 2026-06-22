# Toast — Usage Guide

## Toast Region (place once, before `</body>`)
```html
<div class="ws-toast-region" aria-live="polite" aria-atomic="true" role="status">
  <!-- toasts injected here by JS -->
</div>
```

## Toast Variants
```html
<!-- Default / info (orange dot) -->
<div class="ws-toast">
  <span class="ws-toast-dot"></span>
  <span>Progress saved automatically</span>
</div>

<!-- Success (green dot) -->
<div class="ws-toast">
  <span class="ws-toast-dot ws-toast-dot-success"></span>
  <span>Course marked complete</span>
  <button style="font-family:var(--font-mono);font-size:0.5rem;letter-spacing:2px;
                 text-transform:uppercase;color:var(--color-orange);
                 background:none;border:none;cursor:pointer;margin-left:auto">
    View cert
  </button>
</div>

<!-- Error (red dot + retry) -->
<div class="ws-toast">
  <span class="ws-toast-dot ws-toast-dot-danger"></span>
  <span>Failed to save — please retry</span>
  <button style="font-family:var(--font-mono);font-size:0.5rem;letter-spacing:2px;
                 text-transform:uppercase;color:var(--color-orange);
                 background:none;border:none;cursor:pointer;margin-left:auto">
    Retry
  </button>
</div>
```

## JS: Show and auto-dismiss
```js
function showToast(message, variant = 'default', duration = 4000) {
  const region = document.querySelector('.ws-toast-region');
  const toast = document.createElement('div');
  toast.className = 'ws-toast';

  const dotClass = variant === 'success' ? 'ws-toast-dot ws-toast-dot-success'
                 : variant === 'danger'  ? 'ws-toast-dot ws-toast-dot-danger'
                 : 'ws-toast-dot';

  toast.innerHTML = `<span class="${dotClass}"></span><span>${message}</span>`;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}
```

## Rules
- `ws-toast-region` must have `aria-live="polite"` — screen readers announce new content automatically
- Toasts must NOT steal focus — they're informational, not blocking
- Auto-dismiss: 3000ms for short confirmations, 5000ms if there's an action to click
- Never stack more than 3 toasts — remove oldest if limit exceeded
