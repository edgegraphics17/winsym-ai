/**
 * winsym.ai Card
 * Dark surface container. Border-radius: 0 (sharp corners, brand rule).
 * Hover: border turns orange-dim + shadow lifts.
 * Interactive variant adds cursor:pointer + translateY(-4px) on hover.
 */
export interface CardProps {
  /** Makes card a hover-lift clickable block. Render as <a> with href. */
  interactive?: boolean;
  /** Card content — freely composable */
  children: React.ReactNode;
  /** Optional href when interactive */
  href?: string;
  className?: string;
}

/**
 * CSS classes:
 *   Base card:         ws-card
 *   Interactive card:  ws-card ws-card-interactive  (render as <a href="...">)
 *
 * Internal anatomy (recommended structure):
 *   .card-eyebrow  — type-eyebrow above title (orange mono, left line accent)
 *   .card-title    — type-h3 or h2 (Bebas Neue)
 *   .card-body     — body text (DM Sans 300, muted)
 *   .card-footer   — border-top rule, flex row with meta + price/action
 */
