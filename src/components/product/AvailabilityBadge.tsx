import type { Availability } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';

interface AvailabilityBadgeProps {
  availability: Availability;
}

export default function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  const { t } = useLanguage();

  const config = {
    in_stock: {
      label: t('In stock', 'موجود است'),
      classes: 'bg-navy-50 text-navy-900 ring-navy-200',
    },
    low_stock: {
      label: t('Limited stock', 'موجودی محدود'),
      classes: 'bg-gold-100 text-navy-900 ring-gold-400',
    },
    out_of_stock: {
      label: t('Out of stock', 'ناموجود'),
      classes: 'bg-slate-100 text-slate-800 ring-slate-300',
    },
  }[availability];

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${config.classes}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {config.label}
    </span>
  );
}
