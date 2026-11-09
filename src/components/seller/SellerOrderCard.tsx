import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { SellerOrderStatusBadge } from '@/components/seller/SellerStatusBadge';
import { FULFILMENT_TEXT, ORDER_STATUS_LABEL, PAYMENT_STATUS_TEXT } from '@/data/sellerLabels';
import { formatAfn, formatDemoDate } from '@/lib/format';
import { canCancelOrder, getNextOrderStatus, getOrderQuantity, getOrderTotal } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerOrder } from '@/types/seller';

type PendingAction = 'advance' | 'cancel' | null;

interface SellerOrderCardProps {
  order: SellerOrder;
}

export default function SellerOrderCard({ order }: SellerOrderCardProps) {
  const { t, tx, lang } = useLanguage();
  const { advanceOrder, cancelOrder } = useSellerData();
  const [pending, setPending] = useState<PendingAction>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const nextStatus = getNextOrderStatus(order.status);
  const cancellable = canCancelOrder(order.status);
  const nextLabel = nextStatus ? tx(ORDER_STATUS_LABEL[nextStatus]) : '';

  const confirmAdvance = () => {
    if (!nextStatus) return;
    advanceOrder(order.id);
    setNotice(t(`Order moved to ${tx(ORDER_STATUS_LABEL[nextStatus])}. Demo change only.`, `سفارش به «${tx(ORDER_STATUS_LABEL[nextStatus])}» منتقل شد. فقط تغییر نمونه.`));
    setPending(null);
  };

  const confirmCancel = () => {
    cancelOrder(order.id);
    setNotice(t('Order cancelled. Demo change only.', 'سفارش لغو شد. فقط تغییر نمونه.'));
    setPending(null);
  };

  return (
    <article className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-navy-900" dir="ltr">
            {order.id}
          </p>
          <p className="text-xs text-slate-600">{t(`Placed ${formatDemoDate(order.placedAt, lang)}`, `ثبت‌شده در ${formatDemoDate(order.placedAt, lang)}`)}</p>
        </div>
        <SellerOrderStatusBadge status={order.status} />
      </header>

      <div className="grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Customer (masked)', 'مشتری (پنهان‌شده)')}</p>
          <p className="mt-1 font-semibold text-navy-900">{order.customerName}</p>
          <p className="text-slate-700" dir="ltr">
            {order.customerPhone}
          </p>
          <p className="text-slate-700">{tx(order.customerArea)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Payment', 'پرداخت')}</p>
          <p className="mt-1 font-semibold text-navy-900">{tx(PAYMENT_STATUS_TEXT[order.paymentStatus])}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Delivery', 'تحویل')}</p>
          <p className="mt-1 font-semibold text-navy-900">{tx(FULFILMENT_TEXT[order.fulfilment])}</p>
        </div>
      </div>

      <ul className="divide-y divide-slate-200 rounded-xl bg-slate-50 px-4">
        {order.items.map((item) => (
          <li key={item.productId} className="flex items-center justify-between gap-3 py-3 text-sm">
            <span className="min-w-0 truncate text-navy-900">
              {tx(item.name)} <span className="text-slate-600">× {item.quantity}</span>
            </span>
            <span className="shrink-0 font-semibold text-navy-900">{formatAfn(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-3 py-3 text-sm font-bold text-navy-900">
          <span>{t(`Items (${getOrderQuantity(order)}) subtotal`, `جمع اقلام (${getOrderQuantity(order)})`)}</span>
          <span>{formatAfn(getOrderTotal(order))}</span>
        </li>
      </ul>

      {notice && (
        <p role="status" className="rounded-xl bg-navy-50 p-3 text-sm font-semibold text-navy-900 ring-1 ring-navy-200">
          {notice}
        </p>
      )}

      {pending === 'advance' && nextStatus && (
        <div className="space-y-3 rounded-xl bg-gold-50 p-4 ring-1 ring-gold-400">
          <p className="text-sm font-semibold text-navy-900">
            {t(`Move this order to ${nextLabel}?`, `این سفارش به «${nextLabel}» منتقل شود؟`)}
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={confirmAdvance} className={buttonClasses('primary', 'gap-2')}>
              <Check className="h-4 w-4" aria-hidden="true" />
              {t('Yes, confirm', 'بله، تأیید شود')}
            </button>
            <button type="button" onClick={() => setPending(null)} className={buttonClasses('ghost')}>
              {t('Not yet', 'فعلاً نه')}
            </button>
          </div>
        </div>
      )}

      {pending === 'cancel' && (
        <div className="space-y-3 rounded-xl bg-gold-50 p-4 ring-1 ring-gold-400">
          <p className="text-sm font-semibold text-navy-900">{t('Cancel this order?', 'این سفارش لغو شود؟')}</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={confirmCancel} className={buttonClasses('primary', 'gap-2')}>
              <X className="h-4 w-4" aria-hidden="true" />
              {t('Yes, cancel order', 'بله، سفارش لغو شود')}
            </button>
            <button type="button" onClick={() => setPending(null)} className={buttonClasses('ghost')}>
              {t('Keep order', 'سفارش بماند')}
            </button>
          </div>
        </div>
      )}

      {pending === null && (nextStatus || cancellable) && (
        <div className="flex flex-wrap gap-3">
          {nextStatus && (
            <button type="button" onClick={() => setPending('advance')} className={buttonClasses('primary')}>
              {t(`Move to ${nextLabel}`, `انتقال به «${nextLabel}»`)}
            </button>
          )}
          {cancellable && (
            <button type="button" onClick={() => setPending('cancel')} className={buttonClasses('secondary')}>
              {t('Cancel order', 'لغو سفارش')}
            </button>
          )}
        </div>
      )}
    </article>
  );
}
