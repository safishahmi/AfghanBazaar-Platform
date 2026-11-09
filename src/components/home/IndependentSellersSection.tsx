import { ArrowRight, Store } from 'lucide-react';
import { INDEPENDENT_SELLERS } from '@/data/sellers';
import { countProductsBySeller } from '@/lib/productQueries';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import DemoBadge from '@/components/ui/DemoBadge';
import SectionHeading from '@/components/ui/SectionHeading';

export default function IndependentSellersSection() {
  const { t, tx, isRtl } = useLanguage();

  return (
    <section aria-labelledby="sellers-heading" className="py-12 sm:py-16">
      <SectionHeading
        id="sellers-heading"
        title={t('Independent sellers', 'فروشندگان مستقل')}
        subtitle={t(
          'Sample sellers that will appear here once independent seller accounts open.',
          'فروشندگان نمونه که پس از فعال شدن حساب‌های فروشنده مستقل اینجا نمایش داده می‌شوند.',
        )}
        action={
          <Link to="/sell" className={buttonClasses('secondary')}>
            {t('Register as a seller', 'ثبت به‌عنوان فروشنده')}
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDEPENDENT_SELLERS.map((seller) => {
          const sellerName = tx(seller.name);
          const productCount = countProductsBySeller(seller.id);
          return (
            <li key={seller.id}>
              <Link
                to={`/products?q=${encodeURIComponent(sellerName)}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                  <Store className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-slate-900">{sellerName}</span>
                    <DemoBadge />
                  </span>
                  <span className="text-xs text-slate-600">
                    {t(
                      `${productCount} sample products`,
                      `${productCount} محصول نمونه`,
                    )}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
