import { useLanguage } from '@/i18n/useLanguage';
import { useCategories } from '@/catalog/useCategories';
import Link from '@/router/Link';

export default function Footer() {
  const { t, tx } = useLanguage();
  const { activeCategories } = useCategories();
  const year = new Date().getFullYear();

  const columnTitle = 'text-sm font-bold text-white';
  const columnLink = 'text-sm text-slate-300 transition-colors hover:text-white hover:underline';

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2">
            <img
              src="/AfghanBazaar_Logo_Web_HD.png"
              alt={t('AfghanBazaar logo', 'لوگوی افغان بازار')}
              width={56}
              height={40}
              className="h-9 w-auto"
            />
            <span className="text-sm font-bold text-primary-900">افغان بازار</span>
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            {t(
              'An online marketplace for Afghan shoppers, with clear labels for official store and independent seller products.',
              'بازار آنلاین برای مشتریان افغان، با برچسب‌های روشن برای محصولات فروشگاه رسمی و فروشندگان مستقل.',
            )}
          </p>
        </div>

        <nav aria-label={t('Company', 'شرکت')} className="flex flex-col gap-3">
          <h2 className={columnTitle}>{t('Company', 'شرکت')}</h2>
          <Link to="/about" className={columnLink}>
            {t('About us', 'درباره ما')}
          </Link>
          <Link to="/contact" className={columnLink}>
            {t('Contact', 'تماس با ما')}
          </Link>
          <Link to="/info/help" className={columnLink}>
            {t('Help', 'کمک و پشتیبانی')}
          </Link>
        </nav>

        <nav aria-label={t('Business', 'کسب‌وکار')} className="flex flex-col gap-3">
          <h2 className={columnTitle}>{t('Business', 'کسب‌وکار')}</h2>
          <Link to="/sell" className={columnLink}>
            {t('Seller registration', 'ثبت فروشنده')}
          </Link>
          <Link to="/products?source=official" className={columnLink}>
            {t('AfghanBazaar Official Store', 'فروشگاه رسمی افغان بازار')}
          </Link>
          <Link to="/mlm" className={columnLink}>
            {t('MLM and business portal', 'پورتال شبکه‌ای و تجارتی')}
          </Link>
        </nav>

        <nav aria-label={t('Legal', 'قانونی')} className="flex flex-col gap-3">
          <h2 className={columnTitle}>{t('Legal', 'قانونی')}</h2>
          <Link to="/info/terms" className={columnLink}>
            {t('Terms of use', 'شرایط استفاده')}
          </Link>
          <Link to="/info/privacy" className={columnLink}>
            {t('Privacy policy', 'سیاست حریم خصوصی')}
          </Link>
          <Link to="/login" className={columnLink}>
            {t('Login and register', 'ورود و ثبت نام')}
          </Link>
        </nav>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} AfghanBazaar. {t('All rights reserved.', 'همه حقوق محفوظ است.')}
          </p>
          <nav aria-label={t('Categories', 'دسته‌ها')} className="flex flex-wrap gap-x-4 gap-y-2">
            {activeCategories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="transition-colors hover:text-white"
              >
                {tx(category.name)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
