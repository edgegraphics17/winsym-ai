/**
 * winsym.ai Form Input
 * Styled text input with label, helper text, and error state.
 * Background: --color-bg-raised. Focus: orange border + faint glow ring.
 */
export interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

/**
 * CSS classes:
 *   Form group wrapper: ws-form-group  (flex-col, gap:8px)
 *   Label:              ws-label  (DM Mono, 0.55rem, uppercase, 2px tracking, muted)
 *   Input:              ws-input  (48px min-height, bg-raised, 2px border-radius)
 *   Error state:        ws-input ws-input-error  (red border + red glow ring)
 *   Helper text:        ws-helper  (0.75rem, muted)
 *   Error message:      ws-error  (0.75rem, danger color)
 *
 * Required indicator: add <span style="color:var(--color-danger)"> *</span> after label text
 * Focus state: handled by ws-input:focus — orange border + faint glow (built into CSS)
 */
