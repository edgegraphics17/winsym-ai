/**
 * winsym.ai Navigation Bar
 * Sticky, 56px tall, blur-backdrop. Three variants: marketing, academy, minimal/mobile.
 */
export interface NavProps {
  /** Variant determines which items are shown */
  variant: 'marketing' | 'academy' | 'minimal';
  /** Whether user is authenticated (shows avatar vs CTA) */
  authenticated?: boolean;
  /** Current page path for aria-current */
  currentPath?: string;
}

/**
 * CSS classes:
 *   Nav wrapper:  ws-nav  (position:sticky, top:0, z-index:200, blur backdrop)
 *   Logo:         ws-nav-logo  (Bebas Neue, accent span for .ai)
 *   Links list:   ws-nav-links  (margin-left:auto to push right)
 *   Link item:    ws-nav-link  (DM Mono, 0.55rem, uppercase, muted → white on active/hover)
 *   CTA button:   btn btn-ghost btn-sm  (orange border, shrinks to btn-sm in nav context)
 *   Avatar:       ws-avatar  (orange circle, Bebas Neue initial)
 *   Theme toggle: ws-theme-toggle
 *
 * Logo anatomy:
 *   <a class="ws-nav-logo" href="/">WINSYM<span class="accent">.AI</span></a>
 *   The .accent span applies color:var(--color-orange)
 *
 * Active link:
 *   <a class="ws-nav-link" aria-current="page">Home</a>
 */
