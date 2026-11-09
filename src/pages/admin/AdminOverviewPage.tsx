import { useState } from 'react';
import { LayoutDashboard, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import OrderManagementSection from '@/components/admin/OrderManagementSection';
import ProductModerationSection from '@/components/admin/ProductModerationSection';
import SellerApplicationsSection from '@/components/admin/SellerApplicationsSection';
import DashboardShell, { DashboardSection, StatCard } from '@/components/preview/dashboard/DashboardShell';
import { PENDING_APPLICATION_STATUSES } from '@/data/adminLabels';
import { DEMO_ORDERS } from '@/data/account';
import { SEED_APPLICATIONS, SEED_PRODUCT_MODERATION } from '@/data/adminOverview';
import { useLanguage } from '@/i18n/useLanguage';
import type { AdminApplicationStatus, ModerationStatus, ProductModerationRecord, SellerApplicationReview } from '@/types/admin';

const NAV = [
  { href: '#overview', en: 'Overview', prs: 'نمای کلی', icon: LayoutDashboard },
  { href: '#applications', en: 'Seller applications', prs: 'درخواست‌های فروشنده', icon: Store },
  { href: '#moderation', en: 'Product moderation', prs: 'بررسی محصولات', icon: ShieldCheck },
  { href: '#orders', en: 'Orders', prs: 'سفارش‌ها', icon: ShoppingBag },
];

export default function AdminOverviewPage() {
  const { t, isRtl } = useLanguage();
  const [applications, setApplications] = useState<SellerApplicationReview[]>(SEED_APPLICATIONS);
  const [products, setProducts] = useState<ProductModerationRecord[]>(SEED_PRODUCT_MODERATION);

  const numberFormat = (value: number) => value.toLocaleString(isRtl ? 'fa-AF' : 'en-US');

  const decideApplication = (id: string, status: AdminApplicationStatus, requestedInfo?: string) =>
    setApplications((current) =>
      current.map((item) => (item.id === id ? { ...item, status, requestedInfo: requestedInfo ?? item.requestedInfo } : item)),
    );

  const decideProduct = (productId: string, status: ModerationStatus) =>
    setProducts((current) => current.map((item) => (item.productId === productId ? { ...item, status } : item)));

  const pendingApplications = applications.filter((item) => PENDING_APPLICATION_STATUSES.includes(item.status)).length;
  const awaitingReview = products.filter((item) => item.status === 'pending_review').length;
  const officialOrders = DEMO_ORDERS.filter((order) => order.source === 'official').length;
  const independentOrders = DEMO_ORDERS.filter((order) => order.source === 'independent').length;

  return (
    <DashboardShell
      title={t('Admin overview', 'نمای کلی مدیریت')}
      subtitle={t(
        'Review seller applications, product listings, and orders in one place.',
        'درخواست‌های فروشنده، فهرست محصولات و سفارش‌ها را در یک جا بررسی کنید.',
      )}
      roleLabel={t('Administrator', 'مدیر')}
      navItems={NAV.map((item) => ({ href: item.href, icon: item.icon, label: t(item.en, item.prs) }))}
    >
      <DashboardSection id="overview" title={t('Overview', 'نمای کلی')}>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            label={t('Applications to decide', 'درخواست‌ها برای تصمیم')}
            value={numberFormat(pendingApplications)}
            hint={t('Waiting for a decision', 'منتظر تصمیم')}
          />
          <StatCard
            label={t('Products to review', 'محصولات برای بررسی')}
            value={numberFormat(awaitingReview)}
            hint={t('Pending product review', 'منتظر بررسی محصول')}
          />
          <StatCard
            label={t('Official store orders', 'سفارش‌های فروشگاه رسمی')}
            value={numberFormat(officialOrders)}
            hint={t('Sold by AfghanBazaar', 'فروش افغان بازار')}
          />
          <StatCard
            label={t('Independent seller orders', 'سفارش‌های فروشندگان مستقل')}
            value={numberFormat(independentOrders)}
            hint={t('Tracked per seller', 'جدا برای هر فروشنده')}
          />
        </div>
      </DashboardSection>

      <SellerApplicationsSection applications={applications} onDecide={decideApplication} />
      <ProductModerationSection products={products} onDecide={decideProduct} />
      <OrderManagementSection orders={DEMO_ORDERS} />
    </DashboardShell>
  );
}
