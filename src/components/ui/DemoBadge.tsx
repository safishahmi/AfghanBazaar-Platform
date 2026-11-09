import { useLanguage } from '@/i18n/useLanguage';

export default function DemoBadge() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-gold-100 px-2 py-0.5 text-[11px] font-semibold text-navy-900 ring-1 ring-gold-400">
      {t('Demo', 'نمونه')}
    </span>
  );
}
