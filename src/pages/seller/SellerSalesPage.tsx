import { Panel, SummaryCard } from '@/components/account/AccountUi';
import { useLanguage } from '@/i18n/useLanguage';
import SellerShell from '@/components/seller/SellerShell';
import { ORDER_STATUS_LABEL } from '@/data/sellerLabels';
import { formatAfn } from '@/lib/format';
import { getOrderCounts, getSalesSummary } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';
import { BadgeCheck, Ban, Wallet } from 'lucide-react';
import type { SellerOrderStatus } from '@/types/seller';

const STATUS_ORDER: SellerOrderStatus[] = ['new', 'confirmed', 'preparing', 'ready_for_dispatch', 'shipped', 'delivered', 'cancelled'];

export default function SellerSalesPage() {
  const { t, tx } = useLanguage();
  const { orders } = useSellerData();

  const sales = getSalesSummary(orders);
  const counts = getOrderCounts(orders);
  const cancelled = orders.filter((order) => order.status === 'cancelled').length;

  return (
    <SellerShell
      title={t('Sales', 'فروش')}
      description={t('Demo sales figures for your store. These are not real earnings or payouts.', 'ارقام فروش نمونه برای فروشگاه شما. این درآمد یا پرداخت واقعی نیستند.')}
    >
      <section aria-label={t('Sales summary', 'خلاصه فروش')} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label={t('Delivered total (AFN, demo)', 'مجموع تحویل‌شده (افغانی، نمونه)')} value={sales.deliveredTotal} icon={<Wallet className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Completed orders', 'سفارش‌های تکمیل شده')} value={counts.completed} icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />} />
        <SummaryCard label={t('Cancelled orders', 'سفارش‌های لغو شده')} value={cancelled} icon={<Ban className="h-5 w-5" aria-hidden="true" />} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={t('Orders by status', 'سفارش‌ها بر اساس وضعیت')}>
          <ul className="divide-y divide-slate-200">
            {STATUS_ORDER.map((status) => {
              const count = orders.filter((order) => order.status === status).length;
              return (
                <li key={status} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-slate-800">{tx(ORDER_STATUS_LABEL[status])}</span>
                  <span className="font-bold text-navy-900">{count}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-slate-600">
            {t(`Open order value (demo): ${formatAfn(sales.openTotal)} across ${sales.openCount} orders.`, `ارزش سفارش‌های باز (نمونه): ${formatAfn(sales.openTotal)} برای ${sales.openCount} سفارش.`)}
          </p>
        </Panel>

        <Panel
          title={t('Commission (future)', 'کمیسیون (آینده)')}
          action={
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300">
              {t('Inactive preview', 'پیش‌نمایش غیرفعال')}
            </span>
          }
        >
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-500">{t('Commission rate', 'نرخ کمیسیون')}</span>
              <input
                type="text"
                disabled
                placeholder={t('Not set', 'تعیین نشده')}
                dir="ltr"
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
              />
            </label>
            <p className="text-sm leading-relaxed text-slate-700">
              {t(
                'No commission is calculated in this demo. Commission rules will be published before seller accounts open, and this section stays inactive until then.',
                'در این نسخه آزمایشی هیچ کمیسیونی محاسبه نمی‌شود. قوانین کمیسیون قبل از فعال شدن حساب‌های فروشنده منتشر می‌شود و تا آن زمان این بخش غیرفعال است.',
              )}
            </p>
          </div>
        </Panel>
      </div>
    </SellerShell>
  );
}
