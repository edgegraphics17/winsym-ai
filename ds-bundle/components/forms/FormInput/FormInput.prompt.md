# FormInput — Usage Guide

## Basic Input
```html
<div class="ws-form-group">
  <label class="ws-label" for="email">
    Email Address <span style="color:var(--color-danger)">*</span>
  </label>
  <input class="ws-input" id="email" type="email" placeholder="you@company.com" required>
  <span class="ws-helper">We'll never share your email.</span>
</div>
```

## Error State
```html
<div class="ws-form-group">
  <label class="ws-label" for="company">Company Name</label>
  <input class="ws-input ws-input-error" id="company" type="text" value="AB"
         aria-describedby="company-error" aria-invalid="true">
  <span class="ws-error" id="company-error" role="alert">
    Company name must be at least 3 characters.
  </span>
</div>
```

## Disabled Input
```html
<div class="ws-form-group">
  <label class="ws-label" for="phone">Phone</label>
  <input class="ws-input" id="phone" type="tel" placeholder="+60 112 4487055" disabled>
</div>
```

## Full Auth Form
```html
<form style="display:flex;flex-direction:column;gap:16px;max-width:380px">
  <div class="ws-form-group">
    <label class="ws-label" for="auth-email">Email</label>
    <input class="ws-input" id="auth-email" type="email" 
           placeholder="you@company.com" autocomplete="email" required>
  </div>
  <div class="ws-form-group">
    <label class="ws-label" for="auth-pass">Password</label>
    <input class="ws-input" id="auth-pass" type="password" 
           placeholder="••••••••" autocomplete="current-password" required>
  </div>
  <button class="btn btn-primary" style="width:100%;margin-top:8px" type="submit">
    Sign In to Academy
  </button>
</form>
```

## Rules
- Always pair `<label for="id">` with `<input id="id">` — never placeholder-only labels
- Error messages go BELOW the field, not above
- Use `aria-describedby` + `aria-invalid="true"` on errored inputs for screen readers
- `ws-input` min-height is 48px — do not reduce it (touch target requirement)
- Use `autocomplete` attributes (`email`, `current-password`, `name`) to enable browser autofill
