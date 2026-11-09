import { ArrowRight, Boxes, Scale, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import PreviewProductCard from '@/components/preview/PreviewProductCard';
import { getOfferProducts, getProductsByTag } from '@/lib/productQueries';
import type { Product } from '@/types/marketplace';

export function HomeHero() {
  const { t, isRtl } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gold-400" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-navy-800 px-3.5 py-1.5 text-xs font-semibold text-gold-200 ring-1 ring-navy-600">
            {t('Trusted shopping across Afghanistan', 'خرید مطمئن در سراسر افغانستان')}
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {t('Everyday products, clearly priced, from trusted sellers', 'محصولات روزمره، با قیمت شفاف، از فروشندگان مطمئن')}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
            {t(
              'Shop official AfghanBazaar products and independent sellers in one place. Prices are in AFN and shown before you check out.',
              'محصولات رسمی افغان بازار و فروشندگان مستقل را در یک جا خریداری کنید. قیمت‌ها به افغانی و پیش از پرداخت نشان داده می‌شوند.',
            )}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-navy-950 shadow-sm transition-all duration-200 hover:bg-gold-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t('Browse products', 'مشاهده محصولات')}
              <ArrowRight aria-hidden="true" className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center justify-center rounded-full border border-navy-300 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              {t('Become a seller', 'فروشنده شوید')}
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <div className="flex h-96 w-96 items-center justify-center rounded-[2rem] bg-white p-10 shadow-2xl">
            <img src="/brand/logo-full-transparent.png" alt={t('AfghanBazaar logo', 'لوگوی افغان بازار')} className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryGrid() {
  const { t, tx } = useLanguage();
  return (
    <section aria-labelledby="proto-categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="proto-categories" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {t('Shop by category', 'خرید بر اساس دسته‌بندی')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t('Ten categories for everyday needs', 'ده دسته‌بندی برای نیازهای روزمره')}</p>
        </div>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <li key={category.id}>
              <Link
                to={`/products?category=${category.id}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 transition-colors duration-200 group-hover:bg-gold-100 group-hover:text-navy-950">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-900">{tx(category.name)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ProductRow({ id, title, subtitle, products }: { id: string; title: string; subtitle: string; products: Product[] }) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 id={id} className="text-2xl font-bold text-navy-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {products.slice(0, 4).map((product) => (
          <PreviewProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function ProductSections() {
  const { t } = useLanguage();
  return (
    <>
      <ProductRow
        id="proto-featured"
        title={t('Featured products', 'محصولات برگزیده')}
        subtitle={t('Demonstration products. Not real inventory.', 'محصولات نمونه. موجودی واقعی نیستند.')}
        products={getProductsByTag('featured')}
      />
      <ProductRow
        id="proto-new"
        title={t('New arrivals', 'تازه‌های رسیده')}
        subtitle={t('Demonstration products. Not real inventory.', 'محصولات نمونه. موجودی واقعی نیستند.')}
        products={getProductsByTag('new')}
      />
      <ProductRow
        id="proto-offers"
        title={t('Special offers', 'پیشنهادهای ویژه')}
        subtitle={t('Sample discounts shown against sample previous prices.', 'تخفیف‌های نمونه نسبت به قیمت‌های قبلی نمونه.')}
        products={getOfferProducts()}
      />
    </>
  );
}

export function TrustStrip() {
  const { t } = useLanguage();
  const items = [
    {
      icon: Boxes,
      title: t('Delivery information', 'اطلاعات ارسال'),
      text: t('Delivery times and fees will be shown per province before you pay. Exact rules are still being confirmed.', 'زمان و هزینه ارسال برای هر ولایت پیش از پرداخت نشان داده می‌شود. قوانین دقیق هنوز تأیید می‌شوند.'),
    },
    {
      icon: ShieldCheck,
      title: t('Customer support', 'پشتیبانی مشتری'),
      text: t('Questions about orders, products, or sellers can be sent through the contact page.', 'پرسش‌ها درباره سفارش، محصول یا فروشنده از طریق صفحه تماس ارسال می‌شوند.'),
    },
    {
      icon: Scale,
      title: t('Clear prices in AFN', 'قیمت‌های شفاف به افغانی'),
      text: t('Prices, discounts, and seller names are shown on every product before you add it to the cart.', 'قیمت، تخفیف و نام فروشنده روی هر محصول پیش از افزودن به سبد نشان داده می‌شود.'),
    },
  ];
  return (
    <section aria-labelledby="proto-trust" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 id="proto-trust" className="sr-only">
        {t('Delivery, support, and trust', 'ارسال، پشتیبانی و اعتماد')}
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-navy-900">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
