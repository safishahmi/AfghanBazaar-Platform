import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';

export default function PrototypeFooter() {
  const { t } = useLanguage();

  const groups = [
    {
      title: t('Shop', 'خرید'),
      links: [
        { to: '/products', label: t('All products', 'همه محصولات') },
        { to: '/products?source=official', label: t('Official store', 'فروشگاه رسمی') },
        { to: '/products?source=independent', label: t('Independent sellers', 'فروشندگان مستقل') },
        { to: '/wishlist', label: t('Wishlist', 'علاقه‌مندی‌ها') },
      ],
    },
    {
      title: t('Business', 'کسب‌وکار'),
      links: [
        { to: '/sell', label: t('Sell on AfghanBazaar', 'فروش در افغان بازار') },
        { to: '/mlm', label: t('Network portal (future)', 'پورتال شبکه (آینده)') },
        { to: '/about', label: t('About us', 'درباره ما') },
      ],
    },
    {
      title: t('Help', 'کمک'),
      links: [
        { to: '/info/help', label: t('Help center', 'مرکز راهنما') },
        { to: '/contact', label: t('Contact support', 'تماس با پشتیبانی') },
        { to: '/info/terms', label: t('Terms', 'شرایط') },
        { to: '/info/privacy', label: t('Privacy', 'حریم خصوصی') },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/brand/logo-compact-transparent.png" alt="" aria-hidden="true" width={64} height={45} className="h-11 w-auto rounded-md bg-white p-1" />
            <span className="text-lg font-bold text-white">افغان بازار</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-navy-200">
            {t(
              'A bilingual Afghan marketplace for official store products and independent sellers.',
              'بازار آنلاین دوزبانه افغانستان برای محصولات فروشگاه رسمی و فروشندگان مستقل.',
            )}
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-white">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-navy-200 transition-colors duration-200 hover:text-gold-300 focus-visible:outline-none focus-visible:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-800">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-navy-300 sm:px-6 lg:px-8">
          {t(
            'Design preview. Prices, stock, and sellers shown here are demonstration data, not real listings.',
            'پیش‌نمایش طراحی. قیمت‌ها، موجودی و فروشندگان نشان‌داده‌شده نمونه هستند و فهرست واقعی نیستند.',
          )}
        </p>
      </div>
    </footer>
  );
}
