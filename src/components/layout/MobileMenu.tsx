import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCategories } from '@/catalog/useCategories';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import SearchBox from '@/components/search/SearchBox';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const { t, tx } = useLanguage();
  const { activeCategories } = useCategories();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const linkClass =
    'flex items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-primary-50 hover:text-primary-800';

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label={t('Close menu', 'بستن منو')}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-slate-900/50"
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('Site menu', 'منوی سایت')}
        className="absolute inset-y-0 start-0 flex w-[85%] max-w-sm animate-drawer-start flex-col overflow-y-auto bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close menu', 'بستن منو')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <SearchBox />

          <nav aria-label={t('Product categories', 'دسته‌های محصولات')}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('Categories', 'دسته‌ها')}
            </p>
            <ul className="flex flex-col">
              {activeCategories.map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} onClick={onClose} className={linkClass}>
                    {tx(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('Account and services', 'حساب و خدمات')}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('My account', 'حساب من')}
            </p>
            <ul className="flex flex-col">
              <li>
                <Link to="/account" onClick={onClose} className={linkClass}>
                  {t('My account (demo)', 'حساب من (نمونه)')}
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={onClose} className={linkClass}>
                  {t('Login and register', 'ورود و ثبت نام')}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" onClick={onClose} className={linkClass}>
                  {t('Wishlist', 'لیست علاقه‌مندی')}
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={onClose} className={linkClass}>
                  {t('Shopping cart', 'سبد خرید')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('Company and help', 'شرکت و کمک')}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('Company', 'شرکت')}
            </p>
            <ul className="flex flex-col">
              <li>
                <Link to="/about" onClick={onClose} className={linkClass}>
                  {t('About us', 'درباره ما')}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={onClose} className={linkClass}>
                  {t('Contact', 'تماس با ما')}
                </Link>
              </li>
              <li>
                <Link to="/info/help" onClick={onClose} className={linkClass}>
                  {t('Help', 'کمک و پشتیبانی')}
                </Link>
              </li>
              <li>
                <Link to="/sell" onClick={onClose} className={linkClass}>
                  {t('Seller registration', 'ثبت فروشنده')}
                </Link>
              </li>
              <li>
                <Link to="/mlm" onClick={onClose} className={linkClass}>
                  {t('MLM and business portal', 'پورتال شبکه‌ای و تجارتی')}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <LanguageSwitcher />
            <Link to="/sell" onClick={onClose} className={buttonClasses('secondary', 'w-full')}>
              {t('Sell on AfghanBazaar', 'فروش در افغان بازار')}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
