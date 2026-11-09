import { BadgeCheck, Store } from 'lucide-react';
import type { SellerType } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';

interface SellerBadgeProps {
  type: SellerType;
}

export default function SellerBadge({ type }: SellerBadgeProps) {
  const { t } = useLanguage();

  if (type === 'official') {
    return (
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-800 ring-1 ring-primary-200">
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
        {t('Official store', 'فروشگاه رسمی')}
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
      <Store className="h-3.5 w-3.5" aria-hidden="true" />
      {t('Independent seller', 'فروشنده مستقل')}
    </span>
  );
}
