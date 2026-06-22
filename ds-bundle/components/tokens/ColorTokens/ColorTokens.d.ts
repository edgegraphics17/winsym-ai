/**
 * winsym.ai Color Tokens
 * All colors are CSS custom properties on :root.
 * Never use raw hex — always reference via var(--color-*).
 */
export interface ColorTokens {
  /** Page background — #1C1917 (dark) / #F5F1EB (light) */
  '--color-bg': string;
  /** Raised surface (cards) — #232019 */
  '--color-bg-raised': string;
  /** Elevated surface (modals, menus) — #2A2520 */
  '--color-bg-elevated': string;
  /** Nav/overlay background with blur — rgba(28,25,23,0.97) */
  '--color-bg-overlay': string;
  /** Deep surface for hero sections — #0c0c0c */
  '--color-surface': string;

  /** Primary text — #F5F2EE */
  '--color-text': string;
  /** Secondary / label text — #8a8278 */
  '--color-text-muted': string;
  /** Placeholder / inactive text — #5a5550 */
  '--color-text-dim': string;
  /** Text on orange backgrounds — #1C1917 */
  '--color-text-inverse': string;

  /** Default border — #2E2A27 */
  '--color-border': string;
  /** Hover/active border — #5a5550 */
  '--color-border-mid': string;

  /** Brand primary, CTA, accents — #C45A1A */
  '--color-orange': string;
  /** Orange hover state — #E06820 */
  '--color-orange-hover': string;
  /** Orange border, dim accents — #7a3010 */
  '--color-orange-dim': string;
  /** Orange radial glow — rgba(196,90,26,0.15) */
  '--color-orange-glow': string;
  /** Orange focus ring / badge bg — rgba(196,90,26,0.08) */
  '--color-orange-faint': string;

  /** Success / completion — #22c55e */
  '--color-success': string;
  /** Success background tint — rgba(34,197,94,0.10) */
  '--color-success-dim': string;

  /** Error / destructive — #f87171 */
  '--color-danger': string;
  /** Error background tint — rgba(248,113,113,0.10) */
  '--color-danger-dim': string;
}
