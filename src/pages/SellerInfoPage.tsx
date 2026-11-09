import { CheckCircle2, ClipboardList, PackageOpen, Wallet } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import PageHeader from '@/components/ui/PageHeader';

export default function SellerInfoPage() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: ClipboardList,
      title: t('1. Register your business', '۱. کسب‌وکار خود را ثبت کنید'),
      text: t('Tell us about your business and the products you plan to sell.', 'درباره کسب‌وکار و محصولاتی که می‌خواهید بفروشید معلومات بدهید.'),
    },
    {
      icon: PackageOpen,
      title: t('2. List your products', '۲. محصولات خود را ثبت کنید'),
      text: t('Add product photos, descriptions, prices, and stock levels.', 'عکس، توضیحات، قیمت و موجودی محصولات را اضافه کنید.'),
    },
    {
      icon: Wallet,
      title: t('3. Receive orders', '۳. سفارش دریافت کنید'),
      text: t('Manage incoming orders and see your own sales history.', 'سفارش‌های رسیده را مدیریت کنید و تاریخچه فروش خود را ببینید.'),
    },
  ];

  const benefits = [
    t('Reach shoppers across Afghanistan', 'به مشتریان سراسر افغانستان دسترسی پیدا کنید'),
    t('Your own seller dashboard for products and orders', 'داشبورد اختصاصی فروشنده برای محصولات و سفارش‌ها'),
    t('Clear labels that show you are an independent seller', 'برچسب روشن که نشان می‌دهد شما فروشنده مستقل هستید'),
  ];

  return (
    <>
      <PageHeader
        title={t('Sell on AfghanBazaar', 'در افغان بازار بفروشید')}
        description={t(
          'Independent sellers can list products and manage their own sales here. Registration and the seller dashboard are a demo.',
          'فروشندگان مستقل می‌توانند اینجا محصول ثبت کنند و فروش خود را مدیریت کنند. ثبت و داشبورد فروشنده نسخه آزمایشی است.',
        )}
      />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-bold text-slate-900">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <section aria-labelledby="seller-benefits" className="grid gap-8 rounded-3xl bg-primary-50 p-6 ring-1 ring-primary-100 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="seller-benefits" className="text-2xl font-bold text-slate-900">
              {t('Why sell with us', 'چرا با ما بفروشید')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {t(
                'Commission rules will be published before seller accounts open. No commission is calculated in this preview.',
                'قوانین کمیسیون قبل از فعال شدن حساب‌های فروشنده منتشر می‌شود. در این نسخه آزمایشی هیچ کمیسیونی محاسبه نمی‌شود.',
              )}
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-slate-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">{t('Ready to start?', 'آماده شروع هستید؟')}</p>
            <p className="mt-1 text-sm text-slate-600">
              {t('Have questions in the meantime? Our team can help.', 'در این مدت سوالی دارید؟ تیم ما کمک می‌کند.')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/sell/register" className={buttonClasses('primary')}>
              {t('Register as a seller', 'ثبت به‌عنوان فروشنده')}
            </Link>
            <Link to="/contact" className={buttonClasses('secondary')}>
              {t('Contact us', 'تماس با ما')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
