import { useLanguage } from '@/i18n/useLanguage';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import Link from '@/router/Link';
import { useRouter } from '@/router/useRouter';

const PREVIEW_LINKS = [
  { to: '/preview', en: 'Overview', prs: 'نمای کلی' },
  { to: '/preview/home', en: 'Homepage', prs: 'صفحه اصلی' },
  { to: '/preview/product', en: 'Product page', prs: 'صفحه محصول' },
  { to: '/preview/seller', en: 'Seller dashboard', prs: 'داشبورد فروشنده' },
  { to: '/preview/admin', en: 'Admin dashboard', prs: 'داشبورد مدیر' },
  { to: '/preview/roadmap', en: 'Roadmap & costs', prs: 'نقشه راه و هزینه‌ها' },
];

export default function PreviewBar() {
  const { t } = useLanguage();
  const { path } = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-navy-950 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
            {t('Design preview', 'پیش‌نمایش طراحی')}
          </span>
          <span className="hidden truncate text-sm text-navy-100 md:block">
            {t('Not the live site. All figures are demonstration data.', 'این نسخه سایت زنده نیست. همه ارقام نمونه هستند.')}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/"
            className="whitespace-nowrap rounded-full border border-navy-300 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {t('Live site', 'سایت زنده')}
          </Link>
        </div>
      </div>
      <nav
        aria-label={t('Prototype pages', 'صفحات نمونه')}
        className="border-t border-navy-800 no-scrollbar overflow-x-auto"
      >
        <ul className="mx-auto flex max-w-7xl gap-1 px-4 py-2 sm:px-6 lg:px-8">
          {PREVIEW_LINKS.map((item) => {
            const isActive = path === item.to;
            return (
              <li key={item.to} className="shrink-0">
                <Link
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                    isActive ? 'bg-gold-400 text-navy-950' : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  {t(item.en, item.prs)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
