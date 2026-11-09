import { ChevronRight, Package } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn, formatDemoDate } from '@/lib/format';
import { getCurrentStatus, getOrderById, getOrderTotals, getPlacedDate } from '@/lib/accountQueries';
import { ORDER_SOURCE_TEXT, PAYMENT_METHOD_TEXT } from '@/data/account';
import type { CustomerOrder } from '@/types/account';
import Link from '@/router/Link';
import AccountShell from '@/components/account/AccountShell';
import OrderTimeline from '@/components/account/OrderTimeline';
import { OrderStatusBadge, Panel } from '@/components/account/AccountUi';
import EmptyState from '@/components/ui/EmptyState';
import { buttonClasses } from '@/components/ui/buttonStyles';

interface AccountOrderDetailsPageProps {
  orderId: string;
}

function OrderDetailsContent({ order }: { order: CustomerOrder }) {
  const { t, tx, lang, isRtl } = useLanguage();
  const totals = getOrderTotals(order);
  const address = order.deliveryAddress;
  const sourceNote =
    order.source === 'official'
      ? t(
          'Sold by AfghanBazaar Official Store. No independent seller commission applies to this order.',
          'فروخته‌شده توسط فروشگاه رسمی افغان بازار. هیچ کمیسیون فروشنده مستقل برای این سفارش اعمال نمی‌شود.',
        )
      : t(
          'Sold by an independent seller. Seller commission is not calculated in this prototype.',
          'فروخته‌شده توسط فروشنده مستقل. کمیسیون فروشنده در این نمونه محاسبه نمی‌شود.',
        );

  return (
    <div className="flex flex-col gap-6">
      <Link to="/account/orders" className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-navy-900 hover:underline">
        <ChevronRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
        {t('Back to order history', 'بازگشت به تاریخچه سفارش‌ها')}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Panel title={t('Order status', 'وضعیت سفارش')} action={<OrderStatusBadge status={getCurrentStatus(order)} />}>
            <p className="mb-5 text-sm text-slate-600">
              {t('Placed on', 'ثبت شده در')} {formatDemoDate(getPlacedDate(order), lang)}
            </p>
            <OrderTimeline order={order} />
          </Panel>

          <Panel title={t('Items', 'اقلام')}>
            <ul className="flex flex-col divide-y divide-slate-100">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <img
                    src={item.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-xl bg-slate-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${item.productId}`} className="font-semibold text-slate-900 hover:text-navy-900 hover:underline">
                      {tx(item.productName)}
                    </Link>
                    <p className="text-sm text-slate-600">
                      {item.quantity} x {formatAfn(item.unitPrice)}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold text-slate-900">{formatAfn(item.unitPrice * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <Panel title={t('Price breakdown', 'تفکیک قیمت')}>
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-600">{t('Subtotal', 'جمع اقلام')}</dt>
                <dd className="font-semibold text-slate-900">{formatAfn(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-600">{t('Delivery fee', 'هزینه تحویل')}</dt>
                <dd className="font-semibold text-slate-900">{formatAfn(totals.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-slate-200 pt-3">
                <dt className="font-bold text-navy-900">{t('Total', 'جمع کل')}</dt>
                <dd className="font-bold text-navy-900">{formatAfn(totals.total)}</dd>
              </div>
            </dl>
            <p className="mt-4 rounded-xl bg-navy-50 p-3 text-xs leading-relaxed text-navy-900">{sourceNote}</p>
          </Panel>

          <Panel title={t('Delivery and payment', 'تحویل و پرداخت')}>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t('Delivery address', 'آدرس تحویل')}
                </p>
                <p className="mt-1 font-semibold text-slate-900">{tx(address.recipientName)}</p>
                <p className="text-slate-700">
                  {tx(address.city)}, {tx(address.line)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t('Payment method', 'روش پرداخت')}
                </p>
                <p className="mt-1 text-slate-700">{tx(PAYMENT_METHOD_TEXT[order.paymentMethod])}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Order source', 'منبع سفارش')}</p>
                <p className="mt-1 text-slate-700">{tx(ORDER_SOURCE_TEXT[order.source])}</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default function AccountOrderDetailsPage({ orderId }: AccountOrderDetailsPageProps) {
  const { t, lang } = useLanguage();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <AccountShell title={t('Order not found', 'سفارش پیدا نشد')}>
        <EmptyState
          icon={Package}
          title={t('We could not find this demo order', 'این سفارش نمونه پیدا نشد')}
          description={t('Check the order number or return to your order history.', 'شماره سفارش را بررسی کنید یا به تاریخچه سفارش‌ها برگردید.')}
          action={
            <Link to="/account/orders" className={buttonClasses('primary')}>
              {t('Back to order history', 'بازگشت به تاریخچه سفارش‌ها')}
            </Link>
          }
        />
      </AccountShell>
    );
  }

  return (
    <AccountShell
      title={order.id}
      description={`${t('Demo order placed on', 'سفارش نمونه ثبت شده در')} ${formatDemoDate(getPlacedDate(order), lang)}`}
    >
      <OrderDetailsContent order={order} />
    </AccountShell>
  );
}
