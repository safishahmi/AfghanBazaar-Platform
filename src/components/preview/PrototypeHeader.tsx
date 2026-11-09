import { useState, type FormEvent } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { CATEGORIES } from '@/data/categories';
import Link from '@/router/Link';
import { useRouter } from '@/router/useRouter';

export default function PrototypeHeader() {
  const { t, isRtl } = useLanguage();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : '/products');
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/preview/home"
          aria-label={t('AfghanBazaar prototype home', 'صفحه اصلی نمونه افغان بازار')}
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
        >
          <img src="/brand/logo-compact-transparent.png" alt="" aria-hidden="true" width={64} height={45} className="h-10 w-auto sm:h-12" />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-navy-900">افغان بازار</span>
            <span className="hidden text-xs font-semibold tracking-wide text-navy-600 sm:block">AfghanBazaar</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} role="search" className="relative hidden flex-1 md:block md:max-w-xl">
          <label htmlFor="proto-search" className="sr-only">
            {t('Search products', 'جستجوی محصولات')}
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="proto-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('Search products, sellers, categories', 'جستجوی محصولات، فروشندگان، دسته‌بندی‌ها')}
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pe-4 ps-11 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-200"
          />
        </form>

        <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-900 transition-colors duration-200 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <User aria-hidden="true" className="h-5 w-5" />
            <span className="hidden sm:inline">{t('Sign in (preview)', 'ورود (پیش‌نمایش)')}</span>
          </Link>
          <Link
            to="/cart"
            aria-label={t('Shopping cart', 'سبد خرید')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-navy-950 transition-colors duration-200 hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <form onSubmit={handleSearch} role="search" className="px-4 pt-3 md:hidden">
          <label htmlFor="proto-search-mobile" className="sr-only">
            {t('Search products', 'جستجوی محصولات')}
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="proto-search-mobile"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Search products', 'جستجوی محصولات')}
              className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pe-4 ps-11 text-sm text-slate-900 placeholder:text-slate-500 focus:border-navy-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-200"
            />
          </div>
        </form>
        <nav aria-label={t('Categories', 'دسته‌بندی‌ها')} className="no-scrollbar overflow-x-auto">
          <ul className="mx-auto flex max-w-7xl gap-2 px-4 py-3 sm:px-6 lg:px-8">
            {CATEGORIES.map((category) => (
              <li key={category.id} className="shrink-0">
                <Link
                  to={`/products?category=${category.id}`}
                  className="block whitespace-nowrap rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-navy-300 hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                >
                  {category.name[isRtl ? 'prs' : 'en']}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
