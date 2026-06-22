/**
 * winsym.ai Badge
 * Compact inline label with border. Always DM Mono, uppercase, tight.
 * Border-radius: 0 (angular — consistent with brand).
 */
export type BadgeVariant = 'orange' | 'success' | 'muted' | 'danger';

export interface BadgeProps {
  /** Visual style */
  variant: BadgeVariant;
  /** Badge text — keep under 2 words */
  label: string;
}

/**
 * CSS classes:
 *   Base (required):    ws-badge
 *   Orange (brand/new): ws-badge ws-badge-orange
 *   Success (complete): ws-badge ws-badge-success
 *   Muted (neutral):    ws-badge ws-badge-muted
 *   Danger (error):     ws-badge ws-badge-danger  (not in base DS — compose manually)
 *
 * Use cases by variant:
 *   orange  → "New", "Company Brain", paid course tag
 *   success → "Complete", "Free", "Enrolled"
 *   muted   → "Coming Soon", "Draft", "Archived"
 */
