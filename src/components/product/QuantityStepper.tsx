import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { MAX_CART_QUANTITY } from '@/cart/cartContext';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  const { t } = useLanguage();
  const buttonClass =
    'flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
      <button
        type="button"
        aria-label={t('Decrease quantity', 'کاهش تعداد')}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-slate-900" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={t('Increase quantity', 'افزایش تعداد')}
        disabled={value >= MAX_CART_QUANTITY}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
