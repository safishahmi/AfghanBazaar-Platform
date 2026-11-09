import { useState } from 'react';
import { Heart, Minus, Plus, ShieldCheck, Store, Truck, Users } from 'lucide-react';
import PreviewFrame from '@/components/preview/PreviewFrame';
import PrototypeHeader from '@/components/preview/PrototypeHeader';
import PrototypeFooter from '@/components/preview/PrototypeFooter';
import PreviewProductCard from '@/components/preview/PreviewProductCard';
import DemoBadge from '@/components/ui/DemoBadge';
import { useCart } from '@/cart/useCart';
import { useLanguage } from '@/i18n/useLanguage';
import { useWishlist } from '@/wishlist/useWishlist';
import { CATEGORIES } from '@/data/categories';
import { formatAfn } from '@/lib/format';
import { getDiscountPercent, getProductById, getRelatedProducts } from '@/lib/productQueries';
import Link from '@/router/Link';

const PRODUCT_ID = 'wireless-over-ear-headphones';
const MAX_QTY = 10;

type InfoTab = 'description' | 'details' | 'delivery';

export default function ProductPrototypePage() {
  const { t, tx, isRtl } = useLanguage();
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<InfoTab>('description');
  const [added, setAdded] = useState(false);

  const product = getProductById(PRODUCT_ID);
  if (!product) return null;

  const category = CATEGORIES.find((item) => item.id === product.categoryId);
  const discount = getDiscountPercent(product);
  const isOfficial = product.seller.type === 'official';
  const saved = isSaved(product.id);
  const related = getRelatedProducts(product, 4);
  const inStock = product.availability !== 'out_of_stock';
  const name = tx(product.name);

  const tabs: { id: InfoTab; label: string }[] = [
    { id: 'description', label: t('Description', 'توضیحات') },
    { id: 'details', label: t('Product information', 'معلومات محصول') },
    { id: 'delivery', label: t('Delivery', 'ارسال') },
  ];

  const handleAdd = () => {
    addItem(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <PreviewFrame>
      <PrototypeHeader />
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label={t('Breadcrumb', 'مسیر صفحه')}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <li><Link to="/preview/home" className="hover:text-navy-800 hover:underline">{t('Home', 'خانه')}</Link></li>
              <li aria-hidden="true">/</li>
              {category && (
                <li>
                  <Link to={`/products?category=${category.id}`} className="hover:text-navy-800 hover:underline">{tx(category.name)}</Link>
                </li>
              )}
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-900" aria-current="page">{name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200">
                <img src={product.imageUrl} alt={name} className="aspect-[4/3] w-full object-cover" />
                <span className="absolute start-4 top-4">
                  <DemoBadge />
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t('Photo gallery: production listings will show several seller photos. This prototype shows one sample image.', 'گالری عکس: فهرست‌های واقعی چند عکس فروشنده را نشان می‌دهند. این نمونه فقط یک عکس نمونه دارد.')}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isOfficial ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-900 ring-1 ring-navy-200'
                  }`}
                >
                  {isOfficial ? <Store aria-hidden="true" className="h-3.5 w-3.5" /> : <Users aria-hidden="true" className="h-3.5 w-3.5" />}
                  {isOfficial ? t('Sold by AfghanBazaar Official Store', 'فروخته‌شده توسط فروشگاه رسمی افغان بازار') : t('Sold by an independent seller', 'فروخته‌شده توسط فروشنده مستقل')}
                </span>
                <h1 className="text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{name}</h1>
                <p className="text-sm text-slate-600">
                  {t('Seller: ', 'فروشنده: ')}
                  <span className="font-semibold text-slate-900">{tx(product.seller.name)}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-navy-50 p-5">
                <span className="text-3xl font-bold text-navy-900">{formatAfn(product.price)}</span>
                {product.oldPrice !== undefined && (
                  <span className="pb-1 text-base text-slate-500 line-through">{formatAfn(product.oldPrice)}</span>
                )}
                {discount !== null && (
                  <span className="mb-1 rounded-full bg-gold-400 px-2.5 py-1 text-xs font-bold text-navy-950">
                    {isRtl ? `${discount}٪ تخفیف` : `${discount}% off`}
                  </span>
                )}
              </div>

              <p className={`text-sm font-semibold ${inStock ? 'text-navy-900' : 'text-slate-700'}`}>
                {product.availability === 'in_stock' && t('In stock (demo)', 'موجود (نمونه)')}
                {product.availability === 'low_stock' && t('Only a few left (demo)', 'فقط چند عدد باقی مانده (نمونه)')}
                {product.availability === 'out_of_stock' && t('Currently unavailable (demo)', 'فعلاً ناموجود (نمونه)')}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white" role="group" aria-label={t('Quantity', 'تعداد')}>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    disabled={quantity <= 1}
                    aria-label={t('Decrease quantity', 'کاهش تعداد')}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                  >
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums" aria-live="polite">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(MAX_QTY, value + 1))}
                    disabled={quantity >= MAX_QTY}
                    aria-label={t('Increase quantity', 'افزایش تعداد')}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!inStock}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-navy-950 shadow-sm transition-all duration-200 hover:bg-gold-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                >
                  {added ? t('Added to cart', 'به سبد افزوده شد') : t('Add to cart', 'افزودن به سبد')}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(product.id)}
                  aria-pressed={saved}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 ${
                    saved ? 'border-navy-700 bg-navy-900 text-white' : 'border-slate-300 bg-white text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  <Heart aria-hidden="true" className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? t('Saved', 'ذخیره شده') : t('Save', 'ذخیره')}
                </button>
              </div>

              <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <Truck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" />
                  {t('Delivery cost is shown before payment.', 'هزینه ارسال پیش از پرداخت نشان داده می‌شود.')}
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" />
                  {t('Questions about this product? Contact support.', 'پرسش درباره این محصول دارید؟ با پشتیبانی تماس بگیرید.')}
                </li>
              </ul>
            </div>
          </div>

          <section aria-labelledby="proto-product-info" className="mt-14">
            <h2 id="proto-product-info" className="sr-only">{t('Product information', 'معلومات محصول')}</h2>
            <div role="tablist" aria-label={t('Product information', 'معلومات محصول')} className="flex gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={tab === item.id}
                  aria-controls="product-tabpanel"
                  onClick={() => setTab(item.id)}
                  className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 ${
                    tab === item.id ? 'border-gold-500 text-navy-900' : 'border-transparent text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div id="product-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="animate-fade-in py-6 text-sm leading-relaxed text-slate-700">
              {tab === 'description' && <p className="max-w-3xl text-base">{tx(product.description)}</p>}
              {tab === 'details' && (
                <dl className="grid max-w-2xl gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">{t('Category', 'دسته‌بندی')}</dt><dd className="font-semibold text-slate-900">{category ? tx(category.name) : '-'}</dd></div>
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">{t('Seller', 'فروشنده')}</dt><dd className="font-semibold text-slate-900">{tx(product.seller.name)}</dd></div>
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">{t('Warranty', 'ضمانت')}</dt><dd className="font-semibold text-slate-900">{t('To be confirmed by the seller', 'توسط فروشنده تأیید می‌شود')}</dd></div>
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">{t('Listing type', 'نوع فهرست')}</dt><dd className="font-semibold text-slate-900">{t('Demonstration product', 'محصول نمونه')}</dd></div>
                </dl>
              )}
              {tab === 'delivery' && (
                <p className="max-w-3xl text-base">
                  {t(
                    'Delivery times and fees will be calculated by province at checkout. Exact delivery rules are still being confirmed, so no delivery promise is shown in this prototype.',
                    'زمان و هزینه ارسال در مرحله پرداخت برای هر ولایت محاسبه می‌شود. قوانین دقیق ارسال هنوز تأیید نشده‌اند، بنابراین این نمونه هیچ وعده‌ای برای ارسال نشان نمی‌دهد.',
                  )}
                </p>
              )}
            </div>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="proto-related" className="mt-10 border-t border-slate-200 pt-12">
              <h2 id="proto-related" className="mb-6 text-2xl font-bold text-navy-900">
                {t('Related products (demo)', 'محصولات مرتبط (نمونه)')}
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                {related.map((item) => (
                  <PreviewProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <PrototypeFooter />
    </PreviewFrame>
  );
}
