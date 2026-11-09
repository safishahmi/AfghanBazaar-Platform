import { useState } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import SellerShell from '@/components/seller/SellerShell';
import SellerOrderCard from '@/components/seller/SellerOrderCard';
import SellerEmptyState from '@/components/seller/SellerEmptyState';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerOrder, SellerOrderStatus } from '@/types/seller';

type OrderFilter = 'all' | 'new' | 'in_progress' | 'shipped' | 'delivered' | 'cancelled';

const FILTER_STATUSES: Record<Exclude<OrderFilter, 'all' | 'in_progress'>, SellerOrderStatus> = {
  new: 'new',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
};

const IN_PROGRESS: SellerOrderStatus[] = ['confirmed', 'preparing', 'ready_for_dispatch'];

function matchesFilter(order: SellerOrder, filter: OrderFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'in_progress') return IN_PROGRESS.includes(order.status);
  return order.status === FILTER_STATUSES[filter];
}

export default function SellerOrdersPage() {
  const { t } = useLanguage();
  const { orders } = useSellerData();
  const [filter, setFilter] = useState<OrderFilter>('all');

  const filters: { value: OrderFilter; label: string }[] = [
    { value: 'all', label: t('All', 'همه') },
    { value: 'new', label: t('New', 'جدید') },
    { value: 'in_progress', label: t('In progress', 'در حال انجام') },
    { value: 'shipped', label: t('Shipped', 'ارسال شده') },
    { value: 'delivered', label: t('Delivered', 'تحویل شده') },
    { value: 'cancelled', label: t('Cancelled', 'لغو شده') },
  ];

  const visible = orders.filter((order) => matchesFilter(order, filter));

  return (
    <SellerShell
      title={t('Orders', 'سفارش‌ها')}
      description={t('Sample orders for your store. Customer details are masked.', 'سفارش‌های نمونه برای فروشگاه شما. جزئیات مشتری پنهان است.')}
    >
      <div role="group" aria-label={t('Filter orders', 'فیلتر سفارش‌ها')} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                active ? 'bg-navy-900 text-white ring-navy-900' : 'bg-white text-slate-700 ring-slate-300 hover:bg-navy-50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <SellerEmptyState
          title={t('No orders here yet.', 'هنوز سفارشی اینجا نیست.')}
          message={t('Orders will appear here when customers buy from your store.', 'وقتی مشتریان از فروشگاه شما خرید کنند، سفارش‌ها اینجا ظاهر می‌شوند.')}
        />
      ) : (
        <div className="space-y-4">
          {visible.map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </SellerShell>
  );
}
