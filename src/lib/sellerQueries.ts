import type { SellerOrder, SellerOrderStatus, SellerProduct, SellerStockStatus } from '@/types/seller';

export const LOW_STOCK_THRESHOLD = 3;

const OPEN_ORDER_STATUSES: SellerOrderStatus[] = ['new', 'confirmed', 'preparing', 'ready_for_dispatch', 'shipped'];
const PROCESSING_ORDER_STATUSES: SellerOrderStatus[] = ['confirmed', 'preparing', 'ready_for_dispatch'];

const NEXT_ORDER_STATUS: Partial<Record<SellerOrderStatus, SellerOrderStatus>> = {
  new: 'confirmed',
  confirmed: 'preparing',
  preparing: 'ready_for_dispatch',
  ready_for_dispatch: 'shipped',
  shipped: 'delivered',
};

export function getStockStatus(quantity: number): SellerStockStatus {
  if (quantity <= 0) return 'out_of_stock';
  if (quantity <= LOW_STOCK_THRESHOLD) return 'low_stock';
  return 'in_stock';
}

export function getSellerProducts(products: SellerProduct[], sellerId: string): SellerProduct[] {
  return products.filter((product) => product.sellerId === sellerId);
}

export function getSellerOrders(orders: SellerOrder[], sellerId: string): SellerOrder[] {
  return orders
    .filter((order) => order.sellerId === sellerId)
    .sort((a, b) => b.placedAt.localeCompare(a.placedAt));
}

export function getNextOrderStatus(status: SellerOrderStatus): SellerOrderStatus | null {
  return NEXT_ORDER_STATUS[status] ?? null;
}

export function canCancelOrder(status: SellerOrderStatus): boolean {
  return status === 'new' || status === 'confirmed';
}

export function getOrderTotal(order: SellerOrder): number {
  return order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function getOrderQuantity(order: SellerOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export interface SellerProductCounts {
  total: number;
  published: number;
  outOfStock: number;
}

export function getProductCounts(products: SellerProduct[]): SellerProductCounts {
  return products.reduce<SellerProductCounts>(
    (counts, product) => {
      counts.total += 1;
      if (product.status === 'published') counts.published += 1;
      if (product.quantity <= 0) counts.outOfStock += 1;
      return counts;
    },
    { total: 0, published: 0, outOfStock: 0 },
  );
}

export interface SellerOrderCounts {
  new: number;
  processing: number;
  completed: number;
}

export function getOrderCounts(orders: SellerOrder[]): SellerOrderCounts {
  return orders.reduce<SellerOrderCounts>(
    (counts, order) => {
      if (order.status === 'new') counts.new += 1;
      if (PROCESSING_ORDER_STATUSES.includes(order.status)) counts.processing += 1;
      if (order.status === 'delivered') counts.completed += 1;
      return counts;
    },
    { new: 0, processing: 0, completed: 0 },
  );
}

export interface SellerSalesSummary {
  deliveredTotal: number;
  openTotal: number;
  openCount: number;
}

export function getSalesSummary(orders: SellerOrder[]): SellerSalesSummary {
  return orders.reduce<SellerSalesSummary>(
    (summary, order) => {
      const total = getOrderTotal(order);
      if (order.status === 'delivered') summary.deliveredTotal += total;
      if (OPEN_ORDER_STATUSES.includes(order.status)) {
        summary.openTotal += total;
        summary.openCount += 1;
      }
      return summary;
    },
    { deliveredTotal: 0, openTotal: 0, openCount: 0 },
  );
}
