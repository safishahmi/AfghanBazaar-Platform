import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import type { OrderStatus } from '@/types/account';
import { ORDER_STATUS_TEXT } from '@/data/account';

const STATUS_CLASSES: Record<OrderStatus, string> = {
  placed: 'bg-slate-100 text-navy-900 ring-slate-300',
  confirmed: 'bg-navy-50 text-navy-900 ring-navy-200',
  preparing: 'bg-navy-100 text-navy-900 ring-navy-300',
  shipped: 'bg-navy-800 text-white ring-navy-800',
  delivered: 'bg-gold-100 text-navy-900 ring-gold-400',
  cancelled: 'bg-white text-slate-700 ring-slate-300',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { tx } = useLanguage();
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_CLASSES[status]}`}
    >
      {tx(ORDER_STATUS_TEXT[status])}
    </span>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
  icon: ReactNode;
}

export function SummaryCard({ label, value, icon }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-navy-900">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  );
}

interface PanelProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Panel({ title, action, children }: PanelProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-navy-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
