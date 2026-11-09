import { Check, Heart, MapPin, Package, Settings, Truck, User } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useWishlist } from '@/wishlist/useWishlist';
import { formatDemoDate } from '@/lib/format';
import { getCustomer, getOrderStatusCounts, getOrders } from '@/lib/accountQueries';
import { LANGUAGE_NAME_TEXT } from '@/data/account';
import Link from '@/router/Link';
import AccountShell from '@/components/account/AccountShell';
import OrderList from '@/components/account/OrderList';
import { Panel, SummaryCard } from '@/components/account/AccountUi';
import { buttonClasses } from '@/components/ui/buttonStyles';

export default function AccountDashboardPage() {
  const { t, tx, lang } = useLanguage();
  const { count: wishlistCount } = useWishlist();
  const customer = getCustomer();
  const orders = getOrders();
  const counts = getOrderStatusCounts(orders);

  const quickLinks = [
    { to: '/account/profile', label: t('View profile details', 'مشاهده جزئیات پروفایل'), icon: User },
    { to: '/account/addresses', label: t('Manage addresses', 'مدیریت آدرس‌ها'), icon: MapPin },
    { to: '/account/orders', label: t('View all orders', 'مشاهده همه سفارش‌ها'), icon: Package },
    { to: '/account/settings', label: t('Account settings', 'تنظیمات حساب'), icon: Settings },
  ];

  return (
    <AccountShell
      title={t('My account', 'حساب من')}
      description={t(
        'Track your demo orders, saved products, and profile in one place.',
        'سفارش‌های نمونه، محصولات ذخیره‌شده و پروفایل خود را در یک جا ببینید.',
      )}
    >
      <section className="rounded-2xl bg-navy-900 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-gold-300">{t('Welcome back', 'خوش آمدید')}</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{tx(customer.fullName)}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
          {t('Orders in progress in this demo:', 'سفارش‌های در جریان در این نمونه:')} {counts.pending}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <SummaryCard label={t('Total orders', 'کل سفارش‌ها')} value={counts.total} icon={<Package className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Pending orders', 'سفارش‌های در جریان')} value={counts.pending} icon={<Truck className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Completed orders', 'سفارش‌های تکمیل‌شده')} value={counts.completed} icon={<Check className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Wishlist items', 'موارد لیست علاقه‌مندی')} value={wishlistCount} icon={<Heart className="h-5 w-5" aria-hidden="true" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Panel
          title={t('Recent orders', 'سفارش‌های اخیر')}
          action={
            <Link to="/account/orders" className="text-sm font-semibold text-navy-900 underline-offset-4 hover:underline">
              {t('All orders', 'همه سفارش‌ها')}
            </Link>
          }
        >
          <OrderList orders={orders.slice(0, 3)} />
        </Panel>

        <div className="flex min-w-0 flex-col gap-6">
          <Panel title={t('Profile summary', 'خلاصه پروفایل')}>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-slate-500">{t('Phone', 'تلفن')}</dt>
                <dd className="font-semibold text-slate-900">{customer.phone}</dd>
              </div>
              <div>
                <dt className="text-slate-500">{t('Email', 'ایمیل')}</dt>
                <dd className="font-semibold text-slate-900 break-all">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">{t('Preferred language', 'زبان ترجیحی')}</dt>
                <dd className="font-semibold text-slate-900">{tx(LANGUAGE_NAME_TEXT[customer.preferredLang])}</dd>
              </div>
              <div>
                <dt className="text-slate-500">{t('Member since', 'عضو از')}</dt>
                <dd className="font-semibold text-slate-900">{formatDemoDate(customer.memberSince, lang)}</dd>
              </div>
            </dl>
          </Panel>

          <Panel title={t('Quick links', 'دسترسی سریع')}>
            <ul className="flex flex-col gap-1">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link to="/products" className={buttonClasses('primary', 'mt-4 w-full')}>
              {t('Continue shopping', 'ادامه خرید')}
            </Link>
          </Panel>
        </div>
      </div>
    </AccountShell>
  );
}
