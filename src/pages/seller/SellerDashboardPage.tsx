import { BadgeCheck, CheckCircle2, Clock, Inbox, Package, PackageX } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Panel, SummaryCard } from '@/components/account/AccountUi';
import SellerShell from '@/components/seller/SellerShell';
import { ApplicationStatusBadge, SellerOrderStatusBadge } from '@/components/seller/SellerStatusBadge';
import { formatAfn, formatDemoDate } from '@/lib/format';
import { getOrderCounts, getOrderTotal, getProductCounts, getSalesSummary } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';

export default function SellerDashboardPage() {
  const { t, tx, lang } = useLanguage();
  const { store, application, products, orders } = useSellerData();

  const productCounts = getProductCounts(products);
  const orderCounts = getOrderCounts(orders);
  const sales = getSalesSummary(orders);
  const recentOrders = orders.slice(0, 3);

  return (
    <SellerShell title={t('Seller dashboard', 'داشبورد فروشنده')} description={tx(store.name)}>
      <section aria-label={t('Key numbers', 'شاخص‌های کلیدی')} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard label={t('Listed products', 'محصولات ثبت‌شده')} value={productCounts.total} icon={<Package className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Published', 'منتشر شده')} value={productCounts.published} icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Out of stock', 'ناموجود')} value={productCounts.outOfStock} icon={<PackageX className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('New orders', 'سفارش‌های جدید')} value={orderCounts.new} icon={<Inbox className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Processing', 'در حال پردازش')} value={orderCounts.processing} icon={<Clock className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Completed', 'تکمیل شده')} value={orderCounts.completed} icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />} />
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title={t('Seller application', 'درخواست فروشنده')}
          action={
            <Link to="/sell/register" className="text-sm font-semibold text-navy-900 underline-offset-4 hover:underline">
              {t('View application', 'مشاهده درخواست')}
            </Link>
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <ApplicationStatusBadge status={application.status} />
            <p className="text-sm text-slate-700">{application.storeName}</p>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            {t('Approval is simulated in this demo. No application is sent to a real team.', 'تأیید در این نسخه آزمایشی شبیه‌سازی می‌شود. هیچ درخواستی به تیم واقعی ارسال نمی‌شود.')}
          </p>
        </Panel>

        <Panel title={t('Demo sales summary', 'خلاصه فروش آزمایشی')}>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Delivered (demo)', 'تحویل شده (نمونه)')}</dt>
              <dd className="mt-1 text-lg font-bold text-navy-900">{formatAfn(sales.deliveredTotal)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t(`Open orders (${sales.openCount})`, `سفارش‌های باز (${sales.openCount})`)}
              </dt>
              <dd className="mt-1 text-lg font-bold text-navy-900">{formatAfn(sales.openTotal)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-slate-600">
            {t('These are demo figures, not real earnings or payouts.', 'این ارقام نمونه هستند و درآمد یا پرداخت واقعی نیستند.')}
          </p>
        </Panel>
      </div>

      <Panel
        title={t('Recent orders', 'سفارش‌های اخیر')}
        action={
          <Link to="/seller/orders" className="text-sm font-semibold text-navy-900 underline-offset-4 hover:underline">
            {t('All orders', 'همه سفارش‌ها')}
          </Link>
        }
      >
        {recentOrders.length === 0 ? (
          <p className="text-sm text-slate-600">{t('No orders yet.', 'هنوز سفارشی ثبت نشده است.')}</p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="font-semibold text-navy-900" dir="ltr">
                    {order.id}
                  </p>
                  <p className="text-xs text-slate-600">{formatDemoDate(order.placedAt, lang)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <SellerOrderStatusBadge status={order.status} />
                  <span className="text-sm font-semibold text-navy-900">{formatAfn(getOrderTotal(order))}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="flex flex-wrap gap-3">
        <Link to="/seller/products/new" className={buttonClasses('primary')}>
          {t('Add a product', 'افزودن محصول')}
        </Link>
        <Link to="/seller/inventory" className={buttonClasses('secondary')}>
          {t('Check inventory', 'بررسی موجودی')}
        </Link>
      </div>
    </SellerShell>
  );
}
