import { Ban, Check, Circle } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { formatDemoDate } from '@/lib/format';
import { ORDER_STEPS, getCurrentStatus } from '@/lib/accountQueries';
import { ORDER_STATUS_TEXT } from '@/data/account';
import type { CustomerOrder, OrderStatus } from '@/types/account';

interface TimelineRow {
  status: OrderStatus;
  date: string | null;
}

function buildRows(order: CustomerOrder): TimelineRow[] {
  const current = getCurrentStatus(order);
  if (current === 'cancelled') {
    return order.statusHistory.map((event) => ({ status: event.status, date: event.date }));
  }
  const currentIndex = ORDER_STEPS.indexOf(current);
  return ORDER_STEPS.map((status, index) => ({
    status,
    date: index <= currentIndex ? order.statusHistory.find((event) => event.status === status)?.date ?? null : null,
  }));
}

export default function OrderTimeline({ order }: { order: CustomerOrder }) {
  const { t, tx, lang } = useLanguage();
  const current = getCurrentStatus(order);
  const rows = buildRows(order);

  return (
    <ol aria-label={t('Demo status history', 'تاریخچه وضعیت نمونه')} className="flex flex-col">
      {rows.map((row, index) => {
        const reached = row.date !== null;
        const isCurrent = row.status === current;
        const isLast = index === rows.length - 1;
        const isCancelled = row.status === 'cancelled';
        return (
          <li key={row.status} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute start-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${
                  reached && !isCurrent ? 'bg-gold-500' : 'bg-slate-200'
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${
                isCancelled
                  ? 'bg-slate-200 text-navy-900'
                  : reached
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-400 ring-slate-200'
              } ${isCurrent ? 'ring-gold-300' : ''}`}
            >
              {isCancelled ? (
                <Ban className="h-4 w-4" aria-hidden="true" />
              ) : reached ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Circle className="h-3 w-3" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0 pt-1">
              <p className={`font-semibold ${reached ? 'text-navy-900' : 'text-slate-500'}`}>
                {tx(ORDER_STATUS_TEXT[row.status])}
                {isCurrent && <span className="ms-2 text-xs font-semibold text-navy-700">({t('current', 'فعلی')})</span>}
              </p>
              <p className="text-sm text-slate-600">
                {row.date ? formatDemoDate(row.date, lang) : t('Not reached yet', 'هنوز نرسیده')}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
