import { BadgeCheck, FileText, Search, Send, XCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import PageHeader from '@/components/ui/PageHeader';
import SellerApplicationForm from '@/components/seller/SellerApplicationForm';
import { ApplicationStatusBadge } from '@/components/seller/SellerStatusBadge';
import { applicationToFormValues } from '@/lib/sellerMappers';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerApplicationStatus } from '@/types/seller';

const TRACK_STEPS: { status: SellerApplicationStatus; icon: typeof FileText }[] = [
  { status: 'draft', icon: FileText },
  { status: 'submitted', icon: Send },
  { status: 'under_review', icon: Search },
  { status: 'approved', icon: BadgeCheck },
];

const TRACK_ORDER: SellerApplicationStatus[] = ['draft', 'submitted', 'under_review', 'approved'];

export default function SellerRegisterPage() {
  const { t, tx } = useLanguage();
  const { application } = useSellerData();
  const isRejected = application.status === 'rejected';
  const currentIndex = TRACK_ORDER.indexOf(application.status);

  const stepLabel = (status: SellerApplicationStatus) =>
    tx({
      draft: { en: 'Draft', prs: 'پیش‌نویس' },
      submitted: { en: 'Submitted', prs: 'ارسال‌شده' },
      under_review: { en: 'Under review', prs: 'در حال بررسی' },
      approved: { en: 'Approved', prs: 'تأییدشده' },
      rejected: { en: 'Rejected', prs: 'رد شده' },
    }[status]);

  return (
    <>
      <PageHeader
        title={t('Seller registration', 'ثبت فروشنده')}
        description={t(
          'Tell us about your business. Your application is a demo and no real team reviews it.',
          'درباره کسب‌وکار خود معلومات بدهید. این درخواست نمونه است و هیچ تیم واقعی آن را بررسی نمی‌کند.',
        )}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="min-w-0 space-y-6">
          <SellerApplicationForm initialValues={applicationToFormValues(application)} />
        </div>

        <aside aria-label={t('Application status', 'وضعیت درخواست')} className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-slate-900">{t('Your application', 'درخواست شما')}</h2>
              <ApplicationStatusBadge status={application.status} />
            </div>

            {isRejected ? (
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-navy-50 p-4 text-sm text-navy-900 ring-1 ring-navy-200">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p>{t('This demo application was not approved. You can edit the form and submit again.', 'این درخواست نمونه تأیید نشد. می‌توانید فرم را ویرایش کنید و دوباره ارسال کنید.')}</p>
              </div>
            ) : (
              <ol className="mt-5 space-y-4">
                {TRACK_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const reached = currentIndex >= index;
                  const current = currentIndex === index;
                  return (
                    <li key={step.status} className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ${
                          reached ? 'bg-navy-900 text-white ring-navy-900' : 'bg-white text-slate-500 ring-slate-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className={`text-sm ${current ? 'font-bold text-navy-900' : reached ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                        {stepLabel(step.status)}
                        {current && <span className="sr-only"> ({t('current step', 'مرحله فعلی')})</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>

          <p className="rounded-2xl bg-slate-50 p-5 text-xs leading-relaxed text-slate-600">
            {t(
              'Applications are saved to your account. Review is simulated, so nothing is sent to a real review team.',
              'درخواست‌ها در حساب شما ذخیره می‌شوند. بررسی شبیه‌سازی می‌شود و چیزی به تیم بررسی واقعی ارسال نمی‌شود.',
            )}
          </p>
        </aside>
      </div>
    </>
  );
}
