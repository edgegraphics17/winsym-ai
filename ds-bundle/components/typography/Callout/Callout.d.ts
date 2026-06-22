/**
 * winsym.ai Callout / Quote
 * Orange left-border block for testimonials, key insights, and stat callouts.
 */
export interface CalloutProps {
  /** Callout content */
  children: React.ReactNode;
  /** Optional citation/attribution below the quote */
  cite?: string;
}

/**
 * CSS classes:
 *   Quote callout:   ws-callout  (border-left:2px orange, padding-left:16px, italic body)
 *   Accent line:     ws-accent-line  (inline flex with left orange 24px line via ::before)
 *
 * Highlight block variant (composed manually):
 *   background: var(--color-orange-faint)
 *   border: 1px solid var(--color-border)
 *   border-left: 2px solid var(--color-orange)
 *   padding: 20px 24px
 *
 * Stat callout variant:
 *   Large Bebas Neue number (type-h1 or type-h2) + body text beside it
 *   flex row, align-items:baseline, gap:16px
 */
