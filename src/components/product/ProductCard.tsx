import { useEffect, useState } from 'react';
import { Check, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';
import { useCart } from '@/cart/useCart';
import { getDiscountPercent } from '@/lib/productQueries';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import DemoBadge from '@/components/ui/DemoBadge';
import AvailabilityBadge from './AvailabilityBadge';
import PriceDisplay from './PriceDisplay';
import SellerBadge from './SellerBadge';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, tx } = useLanguage();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const detailsPath = `/product/${product.id}`;
  const name = tx(product.name);
  const discount = getDiscountPercent(product);
  const isOutOfStock = product.availability === 'out_of_stock';

  const handleAddToCart = () => {
    addItem(product.id);
    setJustAdded(true);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={detailsPath} tabIndex={-1} className="block h-full w-full">
          <img
            src={product.imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {discount !== null && (
          <span className="absolute start-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-900">
            -{discount}%
          </span>
        )}
        <WishlistButton productId={product.id} className="absolute end-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-slate-600">
            {tx(product.seller.name)}
          </span>
          <DemoBadge />
        </div>
        <SellerBadge type={product.seller.type} />

        <h3>
          <Link
            to={detailsPath}
            className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-900 transition-colors hover:text-primary-700"
          >
            {name}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t('No ratings yet', 'هنوز امتیازی ثبت نشده')}</span>
        </div>

        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        <AvailabilityBadge availability={product.availability} />

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={buttonClasses('primary', 'w-full')}
          >
            {justAdded ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            )}
            {justAdded
              ? t('Added to cart', 'به سبد اضافه شد')
              : isOutOfStock
                ? t('Unavailable', 'ناموجود')
                : t('Add to cart', 'افزودن به سبد')}
          </button>
          <Link
            to={detailsPath}
            className="rounded-full py-1 text-center text-sm font-semibold text-primary-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {t('View details', 'مشاهده جزئیات')}
          </Link>
        </div>
      </div>
    </article>
  );
}
