import { LayoutGrid } from 'lucide-react';
import { useCategories } from '@/catalog/useCategories';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';

export default function CategoryNav() {
  const { t, tx } = useLanguage();
  const { activeCategories } = useCategories();
  const { path, search } = useRouter();
  const activeCategory = path === '/products' ? new URLSearchParams(search).get('category') : null;
  const allActive = path === '/products' && !activeCategory;

  const linkClass = (isActive: boolean) =>
    `group inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-500 ${
      isActive
        ? 'border-gold-500 text-navy-900'
        : 'border-transparent text-slate-700 hover:border-gold-400 hover:text-navy-900'
    }`;

  const iconClass = 'h-4 w-4 shrink-0 text-navy-800';

  return (
    <nav aria-label={t('Product categories', 'دسته‌های محصولات')} className="border-b border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-7xl snap-x snap-proximity gap-1 overflow-x-auto px-2 [scrollbar-width:thin] sm:px-6 lg:px-8">
        <li className="snap-start">
          <Link
            to="/products"
            aria-current={allActive ? 'page' : undefined}
            className={linkClass(allActive)}
          >
            <LayoutGrid className={iconClass} aria-hidden="true" />
            {t('All products', 'همه محصولات')}
          </Link>
        </li>
        {activeCategories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;
          return (
            <li key={category.id} className="snap-start">
              <Link
                to={`/products?category=${category.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={linkClass(isActive)}
              >
                <Icon className={iconClass} aria-hidden="true" />
                {tx(category.name)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
