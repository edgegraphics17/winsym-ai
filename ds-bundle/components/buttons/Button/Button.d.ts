/**
 * winsym.ai Button
 * CSS class-based — apply classes to <button> or <a> elements.
 * All buttons use DM Mono font, uppercase, 3px letter-spacing.
 * Default border-radius: 0 (angular brand aesthetic — never use rounded pills).
 */

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'base' | 'lg';

/**
 * CSS class combinations:
 *
 * Base (required on every button):  btn
 *
 * Variants:
 *   Primary  (orange fill):   btn btn-primary
 *   Ghost    (orange border): btn btn-ghost
 *   Outline  (neutral):       btn btn-outline
 *   Danger   (red text):      btn btn-danger
 *
 * Sizes (optional modifier):
 *   Small:   btn-sm  → 36px min-height, 0.5rem font
 *   Default:          → 44px min-height, 0.55rem font
 *   Large:   btn-lg  → 52px min-height, 0.65rem font
 *
 * States:
 *   Loading/disabled: btn-loading + disabled attribute
 */

export interface ButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** href — use <a class="btn"> for navigation targets */
  href?: string;
  onClick?: () => void;
  children: string;
}
