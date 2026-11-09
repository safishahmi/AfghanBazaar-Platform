import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: 'md' | 'lg';
}

export default function PriceDisplay({ price, oldPrice, size = 'md' }: PriceDisplayProps) {
  const { t } = useLanguage();
  const hasDiscount = oldPrice !== undefined && oldPrice > price;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span
        className={`font-bold text-slate-900 ${size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-base'}`}
      >
        {formatAfn(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-slate-500 line-through">
          <span className="sr-only">{t('Previous price: ', 'قیمت قبلی: ')}</span>
          {formatAfn(oldPrice)}
        </span>
      )}
    </div>
  );
}
