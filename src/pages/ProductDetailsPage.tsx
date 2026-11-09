import { useMemo, useState } from 'react';
import { Check, Heart, PackageX, ShoppingCart, Star } from 'lucide-react';
import { getDiscountPercent, getProductById, getRelatedProducts } from '@/lib/productQueries';
import { useLanguage } from '@/i18n/useLanguage';
import { useCart } from '@/cart/useCart';
import { useWishlist } from '@/wishlist/useWishlist';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { CATEGORIES } from '@/data/categories';
import DemoBadge from '@/components/ui/DemoBadge';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from '@/components/ui/SectionHeading';
import AvailabilityBadge from '@/components/product/AvailabilityBadge';
import PriceDisplay from '@/components/product/PriceDisplay';
import ProductGrid from '@/components/product/ProductGrid';
import QuantityStepper from '@/components/product/QuantityStepper';
import SellerBadge from '@/components/product/SellerBadge';

interface ProductDetailsPageProps {
  productId: string;
}

export default function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
  const { t, tx } = useLanguage();
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedQuantity, setAddedQuantity] = useState<number | null>(null);

  const product = getProductById(productId);
  const related = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product],
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={PackageX}
          title={t('This product could not be found', 'این محصول پیدا نشد')}
          description={t(
            'It may have been removed or the link is incorrect.',
            'ممکن است حذف شده باشد یا لینک درست نباشد.',
          )}
          action={
            <Link to="/products" className={buttonClasses('primary')}>
              {t('Back to products', 'بازگشت به محصولات')}
            </Link>
          }
        />
      </div>
    );
  }

  const category = CATEGORIES.find((item) => item.id === product.categoryId);
  const name = tx(product.name);
  const discount = getDiscountPercent(product);
  const isOutOfStock = product.availability === 'out_of_stock';
  const saved = isSaved(product.id);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedQuantity(quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label={t('Breadcrumb', 'مسیر صفحه')} className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary-800 hover:underline">
              {t('Home', 'خانه')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          {category && (
            <>
              <li>
                <Link
                  to={`/products?category=${category.id}`}
                  className="hover:text-primary-800 hover:underline"
                >
                  {tx(category.name)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
            </>
          )}
          <li className="max-w-[16rem] truncate font-semibold text-slate-900" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
          <img src={product.imageUrl} alt={name} className="aspect-square w-full object-cover" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <SellerBadge type={product.seller.type} />
            <DemoBadge />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{name}</h1>

          <p className="text-sm text-slate-600">
            {t('Sold by', 'فروشنده')}:{' '}
            <span className="font-semibold text-slate-900">{tx(product.seller.name)}</span>
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star className="h-4 w-4" aria-hidden="true" />
            <span>
              {t(
                'No ratings yet. Reviews will appear after real purchases.',
                'هنوز امتیازی ثبت نشده است. نظرات بعد از خریدهای واقعی نمایش داده می‌شوند.',
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="lg" />
            {discount !== null && (
              <span className="rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-900">
                -{discount}%
              </span>
            )}
          </div>

          <AvailabilityBadge availability={product.availability} />

          <p className="leading-relaxed text-slate-700">{tx(product.description)}</p>

          <div className="rounded-xl bg-gold-50 p-4 text-sm leading-relaxed text-navy-900 ring-1 ring-gold-400">
            {t(
              'This is a demonstration product. Price, stock, and seller details are sample information, not a real listing.',
              'این یک محصول نمایشی است. قیمت، موجودی و معلومات فروشنده نمونه هستند و آگهی واقعی نیستند.',
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityStepper value={quantity} onChange={(value) => { setQuantity(value); setAddedQuantity(null); }} />
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={buttonClasses('primary', 'flex-1 py-3')}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {isOutOfStock ? t('Unavailable', 'ناموجود') : t('Add to cart', 'افزودن به سبد')}
            </button>
          </div>

          {addedQuantity !== null && (
            <div className="flex flex-wrap items-center gap-3 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-900 ring-1 ring-navy-200" role="status">
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>{t(`${addedQuantity} item(s) added to your cart.`, `${addedQuantity} قلم به سبد خرید اضافه شد.`)}</span>
              <Link to="/cart" className="font-semibold underline underline-offset-2">
                {t('View cart', 'مشاهده سبد خرید')}
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-pressed={saved}
            className={buttonClasses('secondary', 'w-full sm:w-auto sm:self-start')}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-navy-900 text-navy-900' : ''}`} aria-hidden="true" />
            {saved
              ? t('Saved to wishlist', 'در لیست علاقه‌مندی است')
              : t('Save to wishlist', 'ذخیره در لیست علاقه‌مندی')}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16">
          <SectionHeading
            id="related-heading"
            title={t('Related products', 'محصولات مرتبط')}
            subtitle={t('Other products in the same category.', 'محصولات دیگر در همین دسته.')}
          />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
