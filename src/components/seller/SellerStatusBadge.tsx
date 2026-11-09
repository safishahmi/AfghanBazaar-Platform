import { useLanguage } from '@/i18n/useLanguage';
import { APPLICATION_STATUS_TEXT, ORDER_STATUS_LABEL, PRODUCT_STATUS_TEXT, STOCK_STATUS_TEXT } from '@/data/sellerLabels';
import type { SellerApplicationStatus, SellerOrderStatus, SellerProductStatus, SellerStockStatus } from '@/types/seller';

const BADGE_BASE = 'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1';

const PRODUCT_CLASSES: Record<SellerProductStatus, string> = {
  draft: 'bg-slate-100 text-slate-800 ring-slate-300',
  pending_review: 'bg-gold-100 text-navy-900 ring-gold-400',
  published: 'bg-navy-900 text-white ring-navy-900',
  rejected: 'bg-white text-navy-900 ring-navy-300',
  inactive: 'bg-slate-100 text-slate-700 ring-slate-300',
};

const STOCK_CLASSES: Record<SellerStockStatus, string> = {
  in_stock: 'bg-white text-navy-900 ring-navy-200',
  low_stock: 'bg-gold-400 text-navy-900 ring-gold-500',
  out_of_stock: 'bg-navy-900 text-white ring-navy-900',
};

const ORDER_CLASSES: Record<SellerOrderStatus, string> = {
  new: 'bg-gold-100 text-navy-900 ring-gold-400',
  confirmed: 'bg-navy-50 text-navy-900 ring-navy-200',
  preparing: 'bg-navy-100 text-navy-900 ring-navy-300',
  ready_for_dispatch: 'bg-navy-100 text-navy-900 ring-navy-300',
  shipped: 'bg-navy-800 text-white ring-navy-800',
  delivered: 'bg-white text-navy-900 ring-navy-300',
  cancelled: 'bg-slate-100 text-slate-700 ring-slate-300',
};

const APPLICATION_CLASSES: Record<SellerApplicationStatus, string> = {
  draft: 'bg-slate-100 text-slate-800 ring-slate-300',
  submitted: 'bg-navy-50 text-navy-900 ring-navy-200',
  under_review: 'bg-gold-100 text-navy-900 ring-gold-400',
  approved: 'bg-navy-900 text-white ring-navy-900',
  rejected: 'bg-white text-navy-900 ring-navy-300',
};

export function ProductStatusBadge({ status }: { status: SellerProductStatus }) {
  const { tx } = useLanguage();
  return <span className={`${BADGE_BASE} ${PRODUCT_CLASSES[status]}`}>{tx(PRODUCT_STATUS_TEXT[status])}</span>;
}

export function StockStatusBadge({ status }: { status: SellerStockStatus }) {
  const { tx } = useLanguage();
  return <span className={`${BADGE_BASE} ${STOCK_CLASSES[status]}`}>{tx(STOCK_STATUS_TEXT[status])}</span>;
}

export function SellerOrderStatusBadge({ status }: { status: SellerOrderStatus }) {
  const { tx } = useLanguage();
  return <span className={`${BADGE_BASE} ${ORDER_CLASSES[status]}`}>{tx(ORDER_STATUS_LABEL[status])}</span>;
}

export function ApplicationStatusBadge({ status }: { status: SellerApplicationStatus }) {
  const { tx } = useLanguage();
  return <span className={`${BADGE_BASE} ${APPLICATION_CLASSES[status]}`}>{tx(APPLICATION_STATUS_TEXT[status])}</span>;
}
