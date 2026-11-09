import { ArrowRight, LayoutDashboard, Package, Home, Map, ShieldCheck } from 'lucide-react';
import PreviewFrame from '@/components/preview/PreviewFrame';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';

export default function PreviewHubPage() {
  const { t, isRtl } = useLanguage();

  const prototypes = [
    {
      to: '/preview/home',
      icon: Home,
      title: t('A. Homepage', 'الف. صفحه اصلی'),
      text: t('Header with the logo, search, categories, hero, product sections, the two business areas, the MLM introduction, and trust information.', 'سربرگ با لوگو، جستجو، دسته‌بندی‌ها، بخش معرفی، بخش‌های محصول، دو بخش کسب‌وکار، معرفی MLM و اطلاعات اعتماد.'),
    },
    {
      to: '/preview/product',
      icon: Package,
      title: t('B. Product details', 'ب. جزئیات محصول'),
      text: t('Gallery, AFN price with discount, availability, seller distinction, quantity, cart and save actions, tabs, and related products.', 'گالری، قیمت به افغانی با تخفیف، موجودی، تفکیک فروشنده، تعداد، افزودن به سبد و ذخیره، تب‌ها و محصولات مرتبط.'),
    },
    {
      to: '/preview/seller',
      icon: LayoutDashboard,
      title: t('C. Seller dashboard', 'ج. داشبورد فروشنده'),
      text: t('Sample sales cards, product and order tables, inventory status, customer order information, and a future commission area marked inactive.', 'کارت‌های نمونه فروش، جدول محصولات و سفارش‌ها، وضعیت موجودی، اطلاعات سفارش مشتری، و بخش آینده کمیسیون که غیرفعال نشان داده شده.'),
    },
    {
      to: '/preview/admin',
      icon: ShieldCheck,
      title: t('D. Admin dashboard', 'د. داشبورد مدیر'),
      text: t('Overview, the three business areas kept apart, users and sellers, product moderation, categories, and financial controls shown as visuals only.', 'نمای کلی، سه بخش کسب‌وکار جدا از هم، کاربران و فروشندگان، بازبینی محصولات، دسته‌بندی‌ها، و کنترل‌های مالی فقط به‌صورت نمایشی.'),
    },
    {
      to: '/preview/roadmap',
      icon: Map,
      title: t('Roadmap and costs', 'نقشه راه و هزینه‌ها'),
      text: t('Business systems, delivery stages, mobile app strategy, and preliminary one-time and recurring cost ranges.', 'سیستم‌های کسب‌وکار، مراحل اجرا، استراتژی اپلیکیشن موبایل، و بازه‌های اولیه هزینه یکباره و تکرارشونده.'),
    },
  ];

  return (
    <PreviewFrame>
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">{t('Design review', 'بازبینی طراحی')}</p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{t('AfghanBazaar design prototypes', 'نمونه‌های طراحی افغان بازار')}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            {t(
              'These pages are for approval only. They do not replace the live site. Every price, seller, order, and user figure is demonstration data.',
              'این صفحات فقط برای تأیید هستند و جایگزین سایت زنده نمی‌شوند. همه قیمت‌ها، فروشندگان، سفارش‌ها و ارقام کاربران نمونه هستند.',
            )}
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {prototypes.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-navy-900">{item.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-navy-800">
                      {t('Open prototype', 'باز کردن نمونه')}
                      <ArrowRight aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-sm text-slate-600">
            {t('The live site, with the current working features, remains at the home page.', 'سایت زنده با امکانات فعلی در صفحه اصلی باقی می‌ماند.')}{' '}
            <Link to="/" className="font-semibold text-navy-800 underline underline-offset-4 hover:text-navy-950">
              {t('Return to the live site', 'بازگشت به سایت زنده')}
            </Link>
          </p>
        </div>
      </main>
    </PreviewFrame>
  );
}
