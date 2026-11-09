import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn, formatDemoDate } from '@/lib/format';
import { getCurrentStatus, getOrderQuantity, getOrderTotals, getPlacedDate } from '@/lib/accountQueries';
import Link from '@/router/Link';
import type { CustomerOrder } from '@/types/account';
import { OrderStatusBadge } from './AccountUi';

interface OrderListProps {
  orders: CustomerOrder[];
}

export default function OrderList({ orders }: OrderListProps) {
  const { t, tx, lang } = useLanguage();

  const moreLabel = (count: number) => t(`+${count} more`, `+${count} مورد دیگر`);
  const linkClass =
    'font-semibold text-navy-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded';

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th scope="col" className="py-3 pe-4 text-start">{t('Order', 'سفارش')}</th>
              <th scope="col" className="py-3 pe-4 text-start">{t('Date', 'تاریخ')}</th>
              <th scope="col" className="py-3 pe-4 text-start">{t('Products', 'محصولات')}</th>
              <th scope="col" className="py-3 pe-4 text-start">{t('Qty', 'تعداد')}</th>
              <th scope="col" className="py-3 pe-4 text-start">{t('Total', 'جمع کل')}</th>
              <th scope="col" className="py-3 pe-4 text-start">{t('Status', 'وضعیت')}</th>
              <th scope="col" className="py-3 text-start"><span className="sr-only">{t('Details', 'جزئیات')}</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="align-middle transition-colors hover:bg-navy-50/50">
                <td className="py-4 pe-4 font-semibold text-navy-900">{order.id}</td>
                <td className="py-4 pe-4 text-slate-700">{formatDemoDate(getPlacedDate(order), lang)}</td>
                <td className="max-w-xs py-4 pe-4 text-slate-700">
                  {tx(order.items[0].productName)}
                  {order.items.length > 1 && <span className="text-slate-500"> {moreLabel(order.items.length - 1)}</span>}
                </td>
                <td className="py-4 pe-4 text-slate-700">{getOrderQuantity(order)}</td>
                <td className="py-4 pe-4 font-semibold text-slate-900">{formatAfn(getOrderTotals(order).total)}</td>
                <td className="py-4 pe-4"><OrderStatusBadge status={getCurrentStatus(order)} /></td>
                <td className="py-4 text-start">
                  <Link to={`/account/orders/${order.id}`} className={linkClass}>
                    {t('View', 'مشاهده')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              to={`/account/orders/${order.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-navy-200 hover:bg-navy-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-navy-900">{order.id}</span>
                <OrderStatusBadge status={getCurrentStatus(order)} />
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {tx(order.items[0].productName)}
                {order.items.length > 1 && <span className="text-slate-500"> {moreLabel(order.items.length - 1)}</span>}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span>{formatDemoDate(getPlacedDate(order), lang)}</span>
                <span className="font-semibold text-slate-900">{formatAfn(getOrderTotals(order).total)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
