/**
 * winsym.ai Section Label
 * Horizontal rule divider with centered or left-aligned uppercase text.
 * Used to introduce content sections with a subtle visual separator.
 */
export interface SectionLabelProps {
  /** Label text — keep short, 1–3 words */
  children: string;
  /** Alignment variant */
  align?: 'center' | 'left';
}

/**
 * CSS classes:
 *   Centered (flanking lines): ws-section-label
 *   Left-aligned (no left line): ws-section-label ws-section-label-left
 *
 * Both use: DM Mono, 0.55rem, 3px tracking, uppercase, --color-text-muted
 * Lines use: 1px solid --color-border
 *
 * The lines are ::before / ::after pseudo-elements with flex:1 — they fill
 * all available horizontal space automatically.
 */
