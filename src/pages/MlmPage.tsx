import { Network, ShieldAlert, Users, Link2, Package, Percent } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { buttonClasses } from '@/components/ui/buttonStyles';
import PageHeader from '@/components/ui/PageHeader';

export default function MlmPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('Member accounts', 'حساب اعضا'),
      text: t('Members join through a separate sign-up process with their own dashboard.', 'اعضا از طریق ثبت‌نام جداگانه و داشبورد اختصاصی وارد می‌شوند.'),
    },
    {
      icon: Link2,
      title: t('Referral links', 'لینک‌های معرفی'),
      text: t('Referral tracking will show which sales came from each member.', 'ردیابی معرفی نشان می‌دهد هر فروش از کدام عضو آمده است.'),
    },
    {
      icon: Package,
      title: t('Eligible products', 'محصولات واجد شرایط'),
      text: t('Only products approved for the program can be promoted by members.', 'فقط محصولات تأییدشده برنامه می‌توانند توسط اعضا معرفی شوند.'),
    },
    {
      icon: Percent,
      title: t('Commission rules', 'قوانین کمیسیون'),
      text: t('Direct sales and downline rules will be published before the portal opens.', 'قوانین فروش مستقیم و شبکه قبل از فعال شدن پورتال منتشر می‌شود.'),
    },
  ];

  return (
    <>
      <PageHeader
        title={t('MLM and business opportunity portal', 'پورتال فرصت تجاری و بازاریابی شبکه‌ای')}
        description={t(
          'A future portal for members who want to share eligible products. It is separate from the official store and the seller marketplace.',
          'پورتالی در آینده برای اعضایی که می‌خواهند محصولات واجد شرایط را معرفی کنند. این پورتال از فروشگاه رسمی و بازار فروشندگان جداست.',
        )}
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4 rounded-2xl bg-slate-900 p-6 text-slate-100 sm:p-8">
          <Network className="mt-1 h-7 w-7 shrink-0 text-accent-300" aria-hidden="true" />
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">{t('A separate program', 'یک برنامه جداگانه')}</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t(
                'Member sales, referrals, and commissions are kept apart from official store sales and independent seller sales.',
                'فروش اعضا، معرفی‌ها و کمیسیون‌ها کاملاً جدا از فروش فروشگاه رسمی و فروش فروشندگان مستقل نگهداری می‌شوند.',
              )}
            </p>
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex items-start gap-3 rounded-2xl border border-gold-400 bg-gold-50 p-6 text-sm leading-relaxed text-navy-900">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            {t(
              'No income is guaranteed. Participation is optional, and eligibility, terms, and commission rules will be published in full before the program opens.',
              'هیچ درآمدی تضمین نمی‌شود. اشتراک اختیاری است و شرایط، معیارهای واجد شرایط بودن و قوانین کمیسیون قبل از باز شدن برنامه کامل منتشر می‌شوند.',
            )}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-slate-900">
            {t('Member registration opens later', 'ثبت‌نام اعضا بعداً باز می‌شود')}
          </p>
          <button type="button" disabled className={buttonClasses('primary')}>
            {t('Join the program', 'پیوستن به برنامه')}
          </button>
        </div>
      </div>
    </>
  );
}
