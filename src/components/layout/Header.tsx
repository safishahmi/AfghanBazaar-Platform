import { useEffect, useState } from 'react';
import { Heart, Menu, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useCart } from '@/cart/useCart';
import { useWishlist } from '@/wishlist/useWishlist';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import SearchBox from '@/components/search/SearchBox';
import CategoryNav from './CategoryNav';
import IconLink from './IconLink';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-slate-200 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:gap-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('Open menu', 'باز کردن منو')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-primary-50 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <Logo />

          <SearchBox className="ms-2 hidden flex-1 md:block md:max-w-md lg:max-w-xl" />

          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <IconLink to="/account" label={t('My account', 'حساب من')} icon={User} />

            <IconLink
              to="/wishlist"
              label={t('Wishlist', 'لیست علاقه‌مندی')}
              icon={Heart}
              count={wishlistCount}
            />
            <IconLink
              to="/cart"
              label={t('Shopping cart', 'سبد خرید')}
              icon={ShoppingCart}
              count={itemCount}
            />
            <Link
              to="/sell"
              className={buttonClasses('secondary', 'ms-1 hidden px-4 py-2 text-xs xl:inline-flex')}
            >
              {t('Sell on AfghanBazaar', 'فروش در افغان بازار')}
            </Link>
          </div>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <SearchBox />
        </div>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </header>

      <CategoryNav />
    </>
  );
}

