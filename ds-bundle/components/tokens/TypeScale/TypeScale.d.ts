/**
 * winsym.ai Typography Tokens
 * Three distinct font roles — never mix them outside their intended use.
 */
export interface TypographyTokens {
  /** Display font — Bebas Neue. Headlines, stat numbers, nav logo, card titles only. */
  '--font-display': "'Bebas Neue', sans-serif";
  /** Body font — DM Sans. All paragraph text, UI copy, form inputs. */
  '--font-body': "'DM Sans', sans-serif";
  /** Mono font — DM Mono. Eyebrows, labels, badges, nav links, buttons, metadata. */
  '--font-mono': "'DM Mono', monospace";
}

export interface TypeScaleTokens {
  '--text-xxs':  '0.55rem';  // 8.8px  — eyebrows, badge text, nav links
  '--text-xs':   '0.65rem';  // 10.4px — section labels, meta
  '--text-sm':   '0.75rem';  // 12px   — secondary labels
  '--text-base': '1rem';     // 16px   — body (minimum)
  '--text-lg':   '1.125rem'; // 18px   — large body
  '--text-xl':   '1.5rem';   // 24px   — section headings (Bebas)
  '--text-2xl':  '2rem';     // 32px   — card headings, stat numbers
  '--text-3xl':  '3rem';     // 48px   — sub-hero (Bebas)
  '--text-hero': 'clamp(5rem, 10vw, 9rem)'; // responsive hero
}

export interface TrackingTokens {
  '--tracking-tight':   '0';
  '--tracking-normal':  '0.5px';
  '--tracking-wide':    '1.5px';
  '--tracking-wider':   '2px';
  '--tracking-widest':  '3px'; // eyebrows, buttons
}

/** CSS utility classes for common type patterns */
export type TypeClass =
  | 'type-hero'     // Bebas Neue, --text-hero, tracking-tight
  | 'type-h1'       // Bebas Neue, --text-3xl, tracking-wider
  | 'type-h2'       // Bebas Neue, --text-2xl, tracking-wide
  | 'type-h3'       // Bebas Neue, --text-xl, tracking-wide
  | 'type-body-lg'  // DM Sans, --text-lg, relaxed line-height
  | 'type-body'     // DM Sans, --text-base
  | 'type-body-sm'  // DM Sans, --text-sm
  | 'type-eyebrow'  // DM Mono, --text-xxs, uppercase, 3px tracking, orange
  | 'type-label'    // DM Mono, --text-xs, uppercase, 2px tracking, muted
  | 'type-caption'; // DM Mono, --text-xxs, wide tracking, dim
