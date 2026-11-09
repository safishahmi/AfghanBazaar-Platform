import { OrderStatusBadge } from '@/components/account/AccountUi';
import { DashboardSection } from '@/components/preview/dashboard/DashboardShell';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import type { CustomerOrder } from '@/types/account';

interface OrderManagementSectionProps {
  orders: CustomerOrder[];
}

function orderTotal(order: CustomerOrder): number {
  return order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) + order.deliveryFee;
}

interface OrderGroupProps {
  title: string;
  description: string;
  orders: CustomerOrder[];
}

function OrderGroup({ title, description, orders }: OrderGroupProps) {
  const { t } = useLanguage();

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-600">{description}</p>
      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">{t('No orders yet.', 'هنوز سفارشی ثبت نشده است.')}</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {orders.map((order) => {
            const latest = order.statusHistory[order.statusHistory.length - 1];
            return (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{order.id}</p>
                  <p className="text-xs text-slate-600 tabular-nums">
                    {order.statusHistory[0]?.date} · {formatAfn(orderTotal(order))}
                  </p>
                </div>
                {latest && <OrderStatusBadge status={latest.status} />}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export default function OrderManagementSection({ orders }: OrderManagementSectionProps) {
  const { t } = useLanguage();
  const official = orders.filter((order) => order.source === 'official');
  const independent = orders.filter((order) => order.source === 'independent');

  return (
    <DashboardSection
      id="orders"
      title={t('Order management', 'مدیریت سفارش‌ها')}
      description={t('Each group is tracked and reported separately.', 'هر گروه جداگانه ثبت و گزارش می‌شود.')}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <OrderGroup
          title={t('Official store', 'فروشگاه رسمی')}
          description={t('Sold directly by AfghanBazaar. Never counted as seller sales.', 'مستقیماً توسط افغان بازار فروخته می‌شود. هرگز فروش فروشنده حساب نمی‌شود.')}
          orders={official}
        />
        <OrderGroup
          title={t('Independent sellers', 'فروشندگان مستقل')}
          description={t('Each seller has a separate ledger.', 'هر فروشنده دفتر حساب جداگانه دارد.')}
          orders={independent}
        />
        <article className="rounded-2xl border border-dashed border-gold-400 bg-gold-50 p-5">
          <h3 className="font-bold text-slate-900">{t('Network (MLM)', 'شبکه (MLM)')}</h3>
          <p className="mt-1 text-xs text-slate-700">{t('Separate area, not open yet.', 'بخش جداگانه، هنوز باز نشده است.')}</p>
          <p className="mt-4 text-sm text-slate-700">
            {t('No orders are processed for this area in this phase.', 'در این مرحله هیچ سفارشی برای این بخش پردازش نمی‌شود.')}
          </p>
        </article>
      </div>
    </DashboardSection>
  );
}
