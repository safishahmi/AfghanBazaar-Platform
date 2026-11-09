export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary-700 text-white shadow-sm hover:bg-primary-800',
  accent: 'bg-accent-500 text-slate-900 shadow-sm hover:bg-accent-400',
  secondary: 'border border-primary-700 bg-white text-primary-800 hover:bg-primary-50',
  ghost: 'text-primary-800 hover:bg-primary-50',
};

export function buttonClasses(variant: ButtonVariant = 'primary', extra = ''): string {
  return `${BASE} ${VARIANTS[variant]} ${extra}`.trim();
}
