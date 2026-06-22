/**
 * winsym.ai Toast Notification
 * Non-blocking status message. Bottom-right, spring-animated entry.
 * Auto-dismiss after 3–5 seconds. Uses aria-live for screen readers.
 */
export type ToastVariant = 'default' | 'success' | 'danger';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  /** Optional action label — e.g. "Undo", "View cert", "Retry" */
  action?: string;
  onAction?: () => void;
  /** Auto-dismiss delay in ms. Default: 4000 */
  duration?: number;
}

/**
 * CSS classes:
 *   Region wrapper: ws-toast-region  (fixed bottom-right, aria-live="polite")
 *   Individual toast: ws-toast  (spring animation on enter)
 *   Dot (default/orange): ws-toast-dot
 *   Dot (success/green):  ws-toast-dot ws-toast-dot-success
 *   Dot (danger/red):     ws-toast-dot ws-toast-dot-danger
 *
 * Anatomy:
 *   <div class="ws-toast">
 *     <span class="ws-toast-dot [variant]"></span>
 *     <span>Message text</span>
 *     <button>Action</button>  <!-- optional -->
 *   </div>
 */
