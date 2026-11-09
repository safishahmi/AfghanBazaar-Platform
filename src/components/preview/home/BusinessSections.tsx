import { ArrowRight, Store, Users, Network } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';

export function BusinessSplit() {
  const { t, isRtl } = useLanguage();
  const arrow = `h-4 w-4 ${isRtl ? 'rotate-180' : ''}`;
  return (
    <section aria-labelledby="proto-businesses" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 id="proto-businesses" className="text-2xl font-bold text-navy-900 sm:text-3xl">
        {t('Two ways to shop, kept separate', 'دو روش خرید، جدا از هم')}
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col gap-5 rounded-3xl bg-navy-900 p-8 text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-navy-950">
            <Store aria-hidden="true" className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">{t('Area A', 'بخش الف')}</p>
            <h3 className="mt-2 text-xl font-bold">{t('AfghanBazaar Official Store', 'فروشگاه رسمی افغان بازار')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-100">
              {t(
                'Products owned and sold directly by AfghanBazaar. These sales are not treated as independent seller sales.',
                'محصولاتی که مستقیماً توسط افغان بازار مالک و فروخته می‌شوند. این فروش‌ها، فروش فروشنده مستقل حساب نمی‌شوند.',
              )}
            </p>
          </div>
          <Link to="/products?source=official" className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors duration-200 hover:bg-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400">
            {t('Shop official products', 'خرید از محصولات رسمی')}
            <ArrowRight aria-hidden="true" className={arrow} />
          </Link>
        </article>
        <article className="flex flex-col gap-5 rounded-3xl border-2 border-navy-100 bg-white p-8 text-slate-900">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
            <Users aria-hidden="true" className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">{t('Area B', 'بخش ب')}</p>
            <h3 className="mt-2 text-xl font-bold text-navy-900">{t('Independent Seller Marketplace', 'بازار فروشندگان مستقل')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {t(
                'Third-party sellers list their own products. Each seller is shown by name on every product.',
                'فروشندگان شخص ثالث محصولات خود را عرضه می‌کنند. نام هر فروشنده روی هر محصول نشان داده می‌شود.',
              )}
            </p>
          </div>
          <Link to="/products?source=independent" className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-navy-700 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors duration-200 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600">
            {t('Browse seller products', 'مشاهده محصولات فروشندگان')}
            <ArrowRight aria-hidden="true" className={arrow} />
          </Link>
        </article>
      </div>
    </section>
  );
}

export function MlmIntroBand() {
  const { t, isRtl } = useLanguage();
  return (
    <section aria-labelledby="proto-mlm" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-gold-300 bg-gold-50 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
            <Network aria-hidden="true" className="h-6 w-6" />
          </span>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-800">{t('Area C - future phase', 'بخش ج - مرحله آینده')}</p>
            <h2 id="proto-mlm" className="mt-2 text-xl font-bold text-navy-900">
              {t('Network marketing portal', 'پورتال بازاریابی شبکه‌ای')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {t(
                'A separate portal with its own member accounts and rules. It is not open yet. No income is guaranteed, and no earnings are shown on this site.',
                'یک پورتال جدا با حساب‌های عضویت و قوانین خاص خود. هنوز باز نشده است. هیچ درآمدی تضمین نمی‌شود و هیچ سودی در این سایت نشان داده نمی‌شود.',
              )}
            </p>
          </div>
        </div>
        <Link to="/mlm" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 md:self-center">
          {t('Read the MLM overview', 'خواندن معرفی شبکه')}
          <ArrowRight aria-hidden="true" className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </section>
  );
}
