import { useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { filterProducts, type SortOption, type SourceFilter } from '@/lib/productQueries';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/ui/PageHeader';
import ProductGrid from '@/components/product/ProductGrid';

const SOURCE_VALUES: SourceFilter[] = ['all', 'official', 'independent'];
const SORT_VALUES: SortOption[] = ['default', 'price-asc', 'price-desc'];

const selectClass =
  'h-11 w-full rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

export default function ProductListingPage() {
  const { t, tx, isRtl } = useLanguage();
  const { path, search, navigate } = useRouter();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const query = params.get('q') ?? '';
  const category = CATEGORIES.find((item) => item.id === params.get('category'));
  const source = SOURCE_VALUES.find((value) => value === params.get('source')) ?? 'all';
  const sort = SORT_VALUES.find((value) => value === params.get('sort')) ?? 'default';

  const results = useMemo(
    () => filterProducts({ query, categoryId: category?.id ?? null, source, sort }),
    [query, category, source, sort],
  );

  const hasFilters = Boolean(query) || Boolean(category) || source !== 'all' || sort !== 'default';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(search);
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    navigate(qs ? `${path}?${qs}` : path);
  };

  const title = category ? tx(category.name) : t('All products', 'همه محصولات');
  const description = category
    ? tx(category.description)
    : t('Browse the full catalogue of sample products.', 'کتالوگ کامل محصولات نمونه را مرور کنید.');

  const countLabel = t(`${results.length} products`, `${results.length} محصول`);

  return (
    <>
      <PageHeader title={title} description={description} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
            {t('Category', 'دسته')}
            <select
              className={selectClass}
              value={category?.id ?? ''}
              onChange={(event) => updateParam('category', event.target.value)}
            >
              <option value="">{t('All categories', 'همه دسته‌ها')}</option>
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(item.name)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
            {t('Seller', 'فروشنده')}
            <select
              className={selectClass}
              value={source}
              onChange={(event) => updateParam('source', event.target.value)}
            >
              <option value="all">{t('All sellers', 'همه فروشندگان')}</option>
              <option value="official">{t('AfghanBazaar Official Store', 'فروشگاه رسمی افغان بازار')}</option>
              <option value="independent">{t('Independent sellers', 'فروشندگان مستقل')}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
            {t('Sort by', 'مرتب‌سازی')}
            <select
              className={selectClass}
              value={sort}
              onChange={(event) => updateParam('sort', event.target.value)}
            >
              <option value="default">{t('Recommended', 'پیشنهادی')}</option>
              <option value="price-asc">{t('Price: low to high', 'قیمت: از کم به زیاد')}</option>
              <option value="price-desc">{t('Price: high to low', 'قیمت: از زیاد به کم')}</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-900" aria-live="polite">
              {countLabel}
            </span>
            {query && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                {t(`Search: "${query}"`, `جستجو: «${query}»`)}
              </span>
            )}
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="text-sm font-semibold text-primary-800 hover:underline"
            >
              {t('Clear all filters', 'پاک کردن همه فیلترها')}
            </button>
          )}
        </div>

        <div className="mt-6">
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <EmptyState
              icon={Search}
              title={t('No products match your filters', 'محصولی با این فیلترها پیدا نشد')}
              description={t(
                'Try a different search term or clear the filters to see the full catalogue.',
                'کلمه جستجوی دیگری امتحان کنید یا فیلترها را پاک کنید تا کتالوگ کامل را ببینید.',
              )}
              action={
                <button type="button" onClick={() => navigate('/products')} className={buttonClasses('primary')}>
                  {t('Show all products', 'نمایش همه محصولات')}
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              }
            />
          )}
        </div>

        {!hasFilters && (
          <p className="mt-10 text-center text-xs text-slate-500">
            <Link to="/info/help" className="font-semibold text-primary-800 hover:underline">
              {t('How do seller labels work?', 'برچسب فروشنده چطور کار می‌کند؟')}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
