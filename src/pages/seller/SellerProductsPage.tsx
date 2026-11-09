import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import SellerShell from '@/components/seller/SellerShell';
import { ProductStatusBadge, StockStatusBadge } from '@/components/seller/SellerStatusBadge';
import { PRODUCT_STATUS_TEXT } from '@/data/sellerLabels';
import { formatAfn } from '@/lib/format';
import { getStockStatus } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerProductStatus } from '@/types/seller';

type StatusFilter = 'all' | SellerProductStatus;

const FILTERS: StatusFilter[] = ['all', 'published', 'pending_review', 'draft', 'rejected', 'inactive'];

export default function SellerProductsPage() {
  const { t, tx } = useLanguage();
  const { products } = useSellerData();
  const [filter, setFilter] = useState<StatusFilter>('all');

  const visible = filter === 'all' ? products : products.filter((product) => product.status === filter);

  const filterLabel = (value: StatusFilter) => (value === 'all' ? t('All', 'همه') : tx(PRODUCT_STATUS_TEXT[value]));

  return (
    <SellerShell
      title={t('Products', 'محصولات')}
      description={t('Manage the products in your store.', 'محصولات فروشگاه خود را مدیریت کنید.')}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={t('Filter by status', 'فیلتر بر اساس وضعیت')} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((value) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  active ? 'bg-navy-900 text-white ring-navy-900' : 'bg-white text-slate-700 ring-slate-300 hover:bg-navy-50'
                }`}
              >
                {filterLabel(value)}
              </button>
            );
          })}
        </div>
        <Link to="/seller/products/new" className={buttonClasses('primary', 'gap-2')}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('Add product', 'افزودن محصول')}
        </Link>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-semibold text-navy-900">{t('No products in this status.', 'محصولی با این وضعیت وجود ندارد.')}</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id} className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
              <Link to={`/seller/products/${product.id}`} className="flex min-w-0 flex-1 gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500">
                <img src={product.imageUrl} alt="" loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 space-y-2">
                  <p className="truncate font-bold text-navy-900">{tx(product.name)}</p>
                  <p className="text-xs text-slate-600" dir="ltr">
                    {product.sku}
                  </p>
                  <p className="text-sm font-semibold text-navy-900">{formatAfn(product.discountPrice ?? product.sellingPrice)}</p>
                  <div className="flex flex-wrap gap-2">
                    <ProductStatusBadge status={product.status} />
                    <StockStatusBadge status={getStockStatus(product.quantity)} />
                  </div>
                </div>
              </Link>
              <div className="flex shrink-0 items-start p-3">
                <Link
                  to={`/seller/products/${product.id}/edit`}
                  aria-label={t(`Edit ${tx(product.name)}`, `ویرایش ${tx(product.name)}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-navy-900 ring-1 ring-slate-200 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SellerShell>
  );
}
