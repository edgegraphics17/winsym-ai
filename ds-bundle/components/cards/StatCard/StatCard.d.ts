/**
 * winsym.ai StatCard
 * Displays a large numeric value with a small uppercase label.
 * Used in dashboard stats rows and marketing social-proof sections.
 */
export interface StatCardProps {
  /** The number or value to display prominently — e.g. "8×", "30", "MYR 12K", "100%" */
  value: string;
  /** Short uppercase descriptor — e.g. "Courses Enrolled", "Days to Deploy" */
  label: string;
  /** Color of the stat number. Defaults to orange. */
  valueColor?: 'orange' | 'success' | 'text';
}

/**
 * CSS classes:
 *
 * Dashboard stats row (1px separator grid):
 *   Wrapper:    stats-row  (grid with 1px gap + border background trick)
 *   Each cell:  ws-stat-card
 *   Number:     ws-stat-num  (Bebas Neue, 2rem, orange)
 *   Label:      ws-stat-label  (DM Mono, 0.55rem, uppercase, muted)
 *
 * Standalone card:
 *   Use ws-card + ws-stat-num + ws-stat-label inside
 */
