import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';
import type { Product } from '@/types/marketplace';
import { useCart } from '@/cart/useCart';
import { formatAfn } from '@/lib/format';
import { getProductById } from '@/lib/productQueries';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/ui/PageHeader';
import QuantityStepper from '@/components/product/QuantityStepper';
import DemoBadge from '@/components/ui/DemoBadge';

interface CartLine {
  productId: string;
  quantity: number;
  product: Product;
}

export default function CartPage() {
  const { t, tx, isRtl } = useLanguage();
  const { items, itemCount, updateQuantity, removeItem } = useCart();

  const lines: CartLine[] = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ productId: item.productId, quantity: item.quantity, product }] : [];
  });

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const arrow = <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />;

  return (
    <>
      <PageHeader
        title={t('Shopping cart', 'سبد خرید')}
        description={t(
          'Your cart is saved on this device. Online checkout is not active yet.',
          'سبد خرید شما در همین دستگاه ذخیره می‌شود. خرید آنلاین هنوز فعال نشده است.',
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {lines.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title={t('Your cart is empty', 'سبد خرید شما خالی است')}
            description={t('Browse products and add the ones you like.', 'محصولات را ببینید و موارد دلخواه را اضافه کنید.')}
            action={
              <Link to="/products" className={buttonClasses('primary')}>
                {t('Start shopping', 'شروع خرید')}
                {arrow}
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="flex flex-col gap-4">
              {lines.map(({ productId, quantity, product }) => {
                const name = tx(product.name);
                return (
                  <li
                    key={productId}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:gap-6 sm:p-5"
                  >
                    <Link to={`/product/${product.id}`} tabIndex={-1} className="shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={name}
                        loading="lazy"
                        className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${product.id}`}
                            className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-primary-800 hover:underline"
                          >
                            {name}
                          </Link>
                          <p className="mt-1 text-xs text-slate-600">{tx(product.seller.name)}</p>
                          <div className="mt-2">
                            <DemoBadge />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(productId)}
                          aria-label={t(`Remove ${name}`, `حذف ${name}`)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                        <QuantityStepper
                          value={quantity}
                          onChange={(value) => updateQuantity(productId, value)}
                        />
                        <div className="text-end">
                          <p className="text-sm font-bold text-slate-900">
                            {formatAfn(product.price * quantity)}
                          </p>
                          <p className="text-xs text-slate-600">
                            {formatAfn(product.price)} {t('each', 'هر قلم')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside
              aria-label={t('Order summary', 'خلاصه سفارش')}
              className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-40"
            >
              <h2 className="text-lg font-bold text-slate-900">{t('Order summary', 'خلاصه سفارش')}</h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-600">{t('Items', 'تعداد اقلام')}</dt>
                  <dd className="font-semibold text-slate-900">{itemCount}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-600">{t('Subtotal', 'جمع جزء')}</dt>
                  <dd className="font-semibold text-slate-900">{formatAfn(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-600">{t('Delivery', 'تحویل')}</dt>
                  <dd className="text-end text-slate-600">{t('Shown at checkout', 'در زمان خرید نشان داده می‌شود')}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>{t('Estimated total', 'مجموع تقریبی')}</span>
                  <span>{formatAfn(subtotal)}</span>
                </div>
              </div>
              <button type="button" disabled className={buttonClasses('primary', 'mt-6 w-full')}>
                {t('Checkout (coming soon)', 'تکمیل خرید (به‌زودی)')}
              </button>
              <p className="mt-3 text-center text-xs text-slate-600">
                {t(
                  'Payments and order placement will be added in a later phase.',
                  'پرداخت و ثبت سفارش در مرحله‌های بعدی اضافه می‌شوند.',
                )}
              </p>
              <Link
                to="/products"
                className="mt-4 block text-center text-sm font-semibold text-primary-800 hover:underline"
              >
                {t('Continue shopping', 'ادامه خرید')}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
