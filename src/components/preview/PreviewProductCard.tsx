import { Store, Users } from 'lucide-react';
import type { Product } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import { getDiscountPercent } from '@/lib/productQueries';
import DemoBadge from '@/components/ui/DemoBadge';
import Link from '@/router/Link';

const AVAILABILITY_STYLES = {
  in_stock: 'bg-navy-50 text-navy-900 ring-navy-200',
  low_stock: 'bg-gold-50 text-gold-800 ring-gold-300',
  out_of_stock: 'bg-slate-100 text-slate-700 ring-slate-300',
} as const;

export default function PreviewProductCard({ product }: { product: Product }) {
  const { t, tx, isRtl } = useLanguage();
  const discount = getDiscountPercent(product);
  const isOfficial = product.seller.type === 'official';
  const name = tx(product.name);

  const availabilityLabel = {
    in_stock: t('In stock (demo)', 'موجود (نمونه)'),
    low_stock: t('Low stock (demo)', 'موجودی کم (نمونه)'),
    out_of_stock: t('Out of stock (demo)', 'ناموجود (نمونه)'),
  }[product.availability];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600">
        <img
          src={product.imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount !== null && (
          <span className="absolute start-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-xs font-bold text-navy-950">
            {isRtl ? `${discount}٪ تخفیف` : `${discount}% off`}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isOfficial ? 'bg-navy-900 text-white' : 'bg-white text-navy-800 ring-1 ring-navy-200'
            }`}
          >
            {isOfficial ? <Store aria-hidden="true" className="h-3.5 w-3.5" /> : <Users aria-hidden="true" className="h-3.5 w-3.5" />}
            {isOfficial ? t('Official store', 'فروشگاه رسمی') : t('Independent seller', 'فروشنده مستقل')}
          </span>
          <DemoBadge />
        </div>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-slate-900">
          <Link to={`/product/${product.id}`} className="hover:text-navy-700 focus-visible:outline-none focus-visible:underline">
            {name}
          </Link>
        </h3>
        <p className="text-xs text-slate-600">{tx(product.seller.name)}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {product.oldPrice !== undefined && (
              <span className="text-xs text-slate-500 line-through">{formatAfn(product.oldPrice)}</span>
            )}
            <span className="text-lg font-bold text-navy-900">{formatAfn(product.price)}</span>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${AVAILABILITY_STYLES[product.availability]}`}>
            {availabilityLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
