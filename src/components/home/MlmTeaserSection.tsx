import { ArrowRight, Network, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';

export default function MlmTeaserSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section aria-labelledby="mlm-teaser-heading" className="py-12 sm:py-16">
      <div className="grid gap-8 overflow-hidden rounded-3xl bg-slate-900 p-6 text-slate-100 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 ring-1 ring-accent-300/30">
            <Network className="h-3.5 w-3.5" aria-hidden="true" />
            {t('Separate business program', 'برنامه تجاری جداگانه')}
          </span>
          <h2 id="mlm-teaser-heading" className="text-2xl font-bold text-white sm:text-3xl">
            {t('MLM and business opportunity portal', 'پورتال فرصت تجاری و بازاریابی شبکه‌ای')}
          </h2>
          <p className="max-w-2xl leading-relaxed text-slate-300">
            {t(
              'A separate portal for members, referrals, and eligible products. It is not part of the official store or the seller marketplace, and it is not active yet.',
              'پورتالی جداگانه برای اعضا، معرفی‌ها و محصولات واجد شرایط. این پورتال بخشی از فروشگاه رسمی یا بازار فروشندگان نیست و هنوز فعال نشده است.',
            )}
          </p>
          <div className="flex items-start gap-2 text-xs text-slate-400">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
            <span>
              {t(
                'No income is promised. Eligibility and terms will be published before launch.',
                'هیچ درآمدی تضمین نمی‌شود. شرایط و معیارهای واجد شرایط بودن قبل از راه‌اندازی منتشر می‌شود.',
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-start lg:justify-end">
          <Link to="/mlm" className={buttonClasses('accent', 'px-6 py-3')}>
            {t('Learn about the portal', 'درباره پورتال بیشتر بدانید')}
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
