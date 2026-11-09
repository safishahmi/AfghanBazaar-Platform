import { Globe, Handshake, ShieldCheck, Store, Users } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  const { t } = useLanguage();

  const areas = [
    {
      icon: Store,
      title: t('Official store', 'فروشگاه رسمی'),
      text: t(
        'Products owned and sold directly by AfghanBazaar. No independent seller commission applies.',
        'محصولاتی که مستقیماً توسط افغان بازار مالک و فروخته می‌شوند. هیچ کمیسیون فروشنده مستقل در آن‌ها وجود ندارد.',
      ),
    },
    {
      icon: Users,
      title: t('Independent sellers', 'فروشندگان مستقل'),
      text: t(
        'A marketplace where local businesses will list products, manage orders, and track their own sales.',
        'بازاری که کسب‌وکارهای محلی در آن محصول ثبت می‌کنند، سفارش‌ها را مدیریت می‌کنند و فروش خود را پیگیری می‌کنند.',
      ),
    },
    {
      icon: Handshake,
      title: t('Business portal', 'پورتال تجاری'),
      text: t(
        'A separate future portal for members and referrals. It is kept apart from the store and seller systems.',
        'پورتالی جداگانه برای اعضا و معرفی‌ها در آینده. این بخش کاملاً از فروشگاه و سیستم فروشندگان جداست.',
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={t('About AfghanBazaar', 'درباره افغان بازار')}
        description={t(
          'A marketplace built for Afghan shoppers and Afghan businesses.',
          'بازاری ساخته‌شده برای مشتریان و کسب‌وکارهای افغان.',
        )}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-base leading-relaxed text-slate-700">
            <h2 className="text-2xl font-bold text-slate-900">{t('Our mission', 'ماموریت ما')}</h2>
            <p>
              {t(
                'AfghanBazaar aims to make everyday shopping simpler and more trustworthy for people across Afghanistan. We want every product page to be clear about what it is, who sells it, and whether it is available.',
                'افغان بازار می‌خواهد خرید روزمره را برای مردم سراسر افغانستان ساده‌تر و قابل‌اعتمادتر کند. می‌خواهیم هر صفحه محصول روشن نشان دهد که محصول چیست، چه کسی آن را می‌فروشد و موجود است یا نه.',
              )}
            </p>
            <p>
              {t(
                'The platform is designed in Dari and English, with clear labels so shoppers always know whether they are buying from the official store or an independent seller.',
                'این پلتفرم به دری و انگلیسی ساخته شده و برچسب‌های روشن دارد تا مشتری همیشه بداند از فروشگاه رسمی خرید می‌کند یا از فروشنده مستقل.',
              )}
            </p>
          </div>
          <div className="flex items-start gap-4 rounded-2xl bg-primary-50 p-6 ring-1 ring-primary-100">
            <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-primary-700" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-slate-900">{t('Our principles', 'اصول ما')}</h3>
              <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-slate-700">
                <li>{t('Clear seller and availability information', 'معلومات روشن درباره فروشنده و موجودی')}</li>
                <li>{t('Respect for shoppers and their privacy', 'احترام به مشتریان و حریم خصوصی آن‌ها')}</li>
                <li>{t('Honest product descriptions and pricing', 'توضیحات صادقانه محصول و قیمت‌گذاری شفاف')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="areas-heading">
          <h2 id="areas-heading" className="text-2xl font-bold text-slate-900">
            {t('Three separate business areas', 'سه بخش جداگانه کسب‌وکار')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'Each area works independently, so official sales, seller sales, and member commissions never mix.',
              'هر بخش جداگانه کار می‌کند تا فروش رسمی، فروش فروشندگان و کمیسیون اعضا هرگز با هم مخلوط نشوند.',
            )}
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <li key={area.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.text}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <Globe className="mt-1 h-6 w-6 shrink-0 text-primary-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-slate-700">
            {t(
              'This website is currently a preview. Product listings are sample data, and account, checkout, and seller features will be connected in later phases.',
              'این وب‌سایت فعلاً نسخه آزمایشی است. فهرست محصولات نمونه هستند و امکانات حساب کاربری، خرید و فروشندگان در مراحل بعدی وصل می‌شوند.',
            )}
          </p>
        </section>
      </div>
    </>
  );
}
