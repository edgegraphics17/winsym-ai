/**
 * winsym.ai Progress Bar
 * Horizontal bar showing completion percentage.
 * Height: 5px. Fill animates over 0.8s ease on load.
 */
export interface ProgressBarProps {
  /** 0–100 */
  value: number;
  /** Fill color variant */
  variant?: 'success' | 'orange';
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * CSS classes:
 *   Track:         ws-progress  (5px tall, rgba white overlay background)
 *   Fill (green):  ws-progress-fill  (--color-success, transitions width 0.8s)
 *   Fill (orange): ws-progress-fill ws-progress-fill-orange  (--color-orange)
 *
 * Set width via inline style: style="width: 65%"
 *
 * Accessibility:
 *   Use role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"
 *   on the track element.
 */
