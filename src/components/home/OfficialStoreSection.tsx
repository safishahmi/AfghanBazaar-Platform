import { ArrowRight, BadgeCheck } from 'lucide-react';
import type { Product } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import ProductGrid from '@/components/product/ProductGrid';

interface OfficialStoreSectionProps {
  products: Product[];
}

export default function OfficialStoreSection({ products }: OfficialStoreSectionProps) {
  const { t, isRtl } = useLanguage();

  return (
    <section aria-labelledby="official-store-heading" className="py-12 sm:py-16">
      <div className="rounded-3xl bg-primary-50 p-6 ring-1 ring-primary-100 sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-700 px-3 py-1 text-xs font-semibold text-white">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Sold directly by AfghanBazaar', 'مستقیماً توسط افغان بازار فروخته می‌شود')}
            </span>
            <h2 id="official-store-heading" className="mt-4 text-2xl font-bold text-primary-950 sm:text-3xl">
              {t('AfghanBazaar Official Store', 'فروشگاه رسمی افغان بازار')}
            </h2>
            <p className="mt-2 text-slate-700">
              {t(
                'Products owned and sold by AfghanBazaar itself. Official store sales are separate from independent seller sales.',
                'محصولاتی که خود افغان بازار مالک و فروشنده آن است. فروش فروشگاه رسمی جدا از فروش فروشندگان مستقل است.',
              )}
            </p>
          </div>
          <Link
            to="/products?source=official"
            className={buttonClasses('primary', 'w-full shrink-0 md:w-auto')}
          >
            {t('Shop official products', 'خرید محصولات رسمی')}
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
        {products.length > 0 && (
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        )}
      </div>
    </section>
  );
}
