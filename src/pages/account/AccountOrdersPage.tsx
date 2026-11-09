import { Package } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { getOrders } from '@/lib/accountQueries';
import AccountShell from '@/components/account/AccountShell';
import OrderList from '@/components/account/OrderList';
import { Panel } from '@/components/account/AccountUi';
import EmptyState from '@/components/ui/EmptyState';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';

export default function AccountOrdersPage() {
  const { t } = useLanguage();
  const orders = getOrders();

  return (
    <AccountShell
      title={t('Order history', 'تاریخچه سفارش‌ها')}
      description={t(
        'Every demo order, with its own source. Official store and independent seller orders are kept separate.',
        'همه سفارش‌های نمونه با منبع مربوط به خود. سفارش‌های فروشگاه رسمی و فروشندگان مستقل جدا نگه داشته می‌شوند.',
      )}
    >
      {orders.length > 0 ? (
        <Panel title={t('All orders', 'همه سفارش‌ها')}>
          <OrderList orders={orders} />
        </Panel>
      ) : (
        <EmptyState
          icon={Package}
          title={t('No orders yet', 'هنوز سفارشی نیست')}
          description={t('Orders you place will appear here.', 'سفارش‌هایی که ثبت می‌کنید اینجا نمایش داده می‌شوند.')}
          action={
            <Link to="/products" className={buttonClasses('primary')}>
              {t('Browse products', 'مرور محصولات')}
            </Link>
          }
        />
      )}
    </AccountShell>
  );
}
