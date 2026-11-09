import { Boxes, LayoutDashboard, Package, ShoppingBag, TrendingUp, Users, Wallet } from 'lucide-react';
import DashboardShell, { DashboardSection, StatCard, StatusPill, TableWrapper } from '@/components/preview/dashboard/DashboardShell';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import { SELLER_ORDERS, SELLER_PRODUCTS, type OrderStatus, type StockStatus } from '@/data/previewDashboards';

const NAV = [
  { href: '#overview', en: 'Overview', prs: 'نمای کلی', icon: LayoutDashboard },
  { href: '#products', en: 'Products', prs: 'محصولات', icon: Package },
  { href: '#orders', en: 'Orders', prs: 'سفارش‌ها', icon: ShoppingBag },
  { href: '#inventory', en: 'Inventory', prs: 'موجودی', icon: Boxes },
  { href: '#customers', en: 'Customers', prs: 'مشتریان', icon: Users },
  { href: '#reports', en: 'Commission and reports', prs: 'کمیسیون و گزارش‌ها', icon: Wallet },
];

export default function SellerDashboardPage() {
  const { t, tx, isRtl } = useLanguage();

  const orderStatusLabel: Record<OrderStatus, string> = {
    new: t('New', 'جدید'),
    packed: t('Packed', 'بسته‌بندی شده'),
    shipped: t('Shipped', 'ارسال شده'),
    delivered: t('Delivered', 'تحویل شده'),
  };
  const orderTone: Record<OrderStatus, 'info' | 'warning' | 'neutral' | 'success'> = {
    new: 'info',
    packed: 'warning',
    shipped: 'neutral',
    delivered: 'success',
  };
  const stockLabel: Record<StockStatus, string> = {
    ok: t('In stock', 'موجود'),
    low: t('Low stock', 'موجودی کم'),
    out: t('Out of stock', 'ناموجود'),
  };
  const stockTone: Record<StockStatus, 'success' | 'warning' | 'danger'> = { ok: 'success', low: 'warning', out: 'danger' };
  const numberFormat = (value: number) => value.toLocaleString(isRtl ? 'fa-AF' : 'en-US');

  return (
    <DashboardShell
      title={t('Seller dashboard', 'داشبورد فروشنده')}
      subtitle={t('A preview of how an independent seller would manage sales, products, orders, and stock.', 'نمایشی از اینکه یک فروشنده مستقل چگونه فروش، محصولات، سفارش‌ها و موجودی را مدیریت می‌کند.')}
      roleLabel={t('Independent seller', 'فروشنده مستقل')}
      navItems={NAV.map((item) => ({ href: item.href, icon: item.icon, label: t(item.en, item.prs) }))}
    >
      <DashboardSection id="overview" title={t('Sales summary (sample)', 'خلاصه فروش (نمونه)')}>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard label={t('Sales this month (sample)', 'فروش این ماه (نمونه)')} value={formatAfn(1284000)} hint={t('Sample figure', 'رقم نمونه')} />
          <StatCard label={t('Orders (sample)', 'سفارش‌ها (نمونه)')} value={numberFormat(46)} hint={t('Sample figure', 'رقم نمونه')} />
          <StatCard label={t('Awaiting packing (sample)', 'منتظر بسته‌بندی (نمونه)')} value={numberFormat(5)} hint={t('Sample figure', 'رقم نمونه')} />
          <StatCard label={t('Average order (sample)', 'میانگین سفارش (نمونه)')} value={formatAfn(27900)} hint={t('Sample figure', 'رقم نمونه')} />
        </div>
      </DashboardSection>

      <DashboardSection id="products" title={t('Product management', 'مدیریت محصولات')} description={t('Sample catalogue. Editing is not connected in this prototype.', 'کاتالوگ نمونه. ویرایش در این نمونه متصل نیست.')}>
        <TableWrapper label={t('Seller products', 'محصولات فروشنده')}>
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-start text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Product', 'محصول')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('SKU', 'کد محصول')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Price', 'قیمت')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Stock', 'موجودی')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SELLER_PRODUCTS.map((product) => (
                <tr key={product.sku} className="transition-colors hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{tx(product.name)}</td>
                  <td className="px-4 py-3 text-slate-600">{product.sku}</td>
                  <td className="px-4 py-3 tabular-nums">{formatAfn(product.price)}</td>
                  <td className="px-4 py-3 tabular-nums">{numberFormat(product.stock)}</td>
                  <td className="px-4 py-3"><StatusPill tone={stockTone[product.status]}>{stockLabel[product.status]}</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </DashboardSection>

      <DashboardSection id="orders" title={t('Order management', 'مدیریت سفارش‌ها')} description={t('Sample orders for this seller only.', 'سفارش‌های نمونه فقط برای این فروشنده.')}>
        <TableWrapper label={t('Seller orders', 'سفارش‌های فروشنده')}>
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Order', 'سفارش')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Customer', 'مشتری')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('City', 'شهر')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Items', 'اقلام')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Total', 'مجموع')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SELLER_ORDERS.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-semibold text-navy-900">{order.id}</td>
                  <td className="px-4 py-3">{tx(order.customer)}</td>
                  <td className="px-4 py-3">{tx(order.city)}</td>
                  <td className="px-4 py-3 tabular-nums">{numberFormat(order.items)}</td>
                  <td className="px-4 py-3 tabular-nums">{formatAfn(order.total)}</td>
                  <td className="px-4 py-3"><StatusPill tone={orderTone[order.status]}>{orderStatusLabel[order.status]}</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </DashboardSection>

      <DashboardSection id="inventory" title={t('Inventory status (sample)', 'وضعیت موجودی (نمونه)')}>
        <ul className="grid gap-3 md:grid-cols-2">
          {SELLER_PRODUCTS.map((product) => {
            const width = Math.min(100, Math.round((product.stock / 60) * 100));
            return (
              <li key={product.sku} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-900">{tx(product.name)}</span>
                  <StatusPill tone={stockTone[product.status]}>{stockLabel[product.status]}</StatusPill>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${stockLabel[product.status]}: ${product.stock}`}>
                  <div className={`h-full rounded-full ${product.status === 'ok' ? 'bg-navy-700' : product.status === 'low' ? 'bg-gold-500' : 'bg-slate-400'}`} style={{ width: `${width}%` }} />
                </div>
                <p className="mt-2 text-xs text-slate-500">{t('Units (sample):', 'تعداد (نمونه):')} {numberFormat(product.stock)}</p>
              </li>
            );
          })}
        </ul>
      </DashboardSection>

      <DashboardSection id="customers" title={t('Customer order information (sample)', 'معلومات سفارش مشتریان (نمونه)')} description={t('Shows only what a seller needs to deliver the order. No contact details are shown.', 'فقط اطلاعاتی را نشان می‌دهد که فروشنده برای تحویل سفارش نیاز دارد. اطلاعات تماس نشان داده نمی‌شود.')}>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SELLER_ORDERS.map((order) => (
            <li key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500">{order.id} - {order.date}</p>
              <p className="mt-2 font-semibold text-slate-900">{tx(order.customer)}</p>
              <p className="mt-1 text-sm text-slate-600">{tx(order.city)}</p>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection id="reports" title={t('Commission and reports (prototype)', 'کمیسیون و گزارش‌ها (نمونه)')} description={t('Future area. No commission is calculated or paid in this phase.', 'بخش آینده. در این مرحله هیچ کمیسیونی محاسبه یا پرداخت نمی‌شود.')}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-navy-300 bg-white p-6">
            <div className="flex items-center gap-2 text-navy-900">
              <TrendingUp aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-semibold">{t('Commission rule (prototype)', 'قانون کمیسیون (نمونه)')}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {t('Example only: the rate would be set by AfghanBazaar in a future phase. It is not active and no amounts are calculated.', 'فقط نمونه: نرخ را افغان بازار در مرحله آینده تعیین می‌کند. این قانون فعال نیست و هیچ مبلغی محاسبه نمی‌شود.')}
            </p>
            <p className="mt-4 text-2xl font-bold text-slate-400">{t('Not active', 'فعال نیست')}</p>
          </div>
          <div className="rounded-2xl border border-dashed border-navy-300 bg-white p-6">
            <div className="flex items-center gap-2 text-navy-900">
              <Wallet aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-semibold">{t('Payout report (prototype)', 'گزارش پرداخت (نمونه)')}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {t('Payouts and withdrawals are not part of Phase 1 or this design preview.', 'پرداخت‌ها و برداشت‌ها بخشی از مرحله اول یا این پیش‌نمایش طراحی نیستند.')}
            </p>
            <p className="mt-4 text-2xl font-bold text-slate-400">{t('Not available', 'در دسترس نیست')}</p>
          </div>
        </div>
      </DashboardSection>
    </DashboardShell>
  );
}
