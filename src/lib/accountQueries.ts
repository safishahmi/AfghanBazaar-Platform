import type { CustomerAddress, Customer, CustomerOrder, OrderStatus } from '@/types/account';
import { DEMO_ADDRESSES, DEMO_CUSTOMER, DEMO_ORDERS } from '@/data/account';

export const ORDER_STEPS: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'shipped', 'delivered'];

const PENDING_STATUSES: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'shipped'];

export interface OrderTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface OrderStatusCounts {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
}

export function getCustomer(): Customer {
  return DEMO_CUSTOMER;
}

export function getAddresses(): CustomerAddress[] {
  return DEMO_ADDRESSES;
}

export function getOrders(): CustomerOrder[] {
  return [...DEMO_ORDERS].sort((a, b) => getPlacedDate(b).localeCompare(getPlacedDate(a)));
}

export function getOrderById(id: string): CustomerOrder | undefined {
  return DEMO_ORDERS.find((order) => order.id === id);
}

export function getPlacedDate(order: CustomerOrder): string {
  return order.statusHistory[0].date;
}

export function getCurrentStatus(order: CustomerOrder): OrderStatus {
  return order.statusHistory[order.statusHistory.length - 1].status;
}

export function getOrderTotals(order: CustomerOrder): OrderTotals {
  const subtotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return { subtotal, deliveryFee: order.deliveryFee, total: subtotal + order.deliveryFee };
}

export function getOrderQuantity(order: CustomerOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getOrderStatusCounts(orders: CustomerOrder[]): OrderStatusCounts {
  return orders.reduce<OrderStatusCounts>(
    (counts, order) => {
      const status = getCurrentStatus(order);
      counts.total += 1;
      if (PENDING_STATUSES.includes(status)) counts.pending += 1;
      if (status === 'delivered') counts.completed += 1;
      if (status === 'cancelled') counts.cancelled += 1;
      return counts;
    },
    { total: 0, pending: 0, completed: 0, cancelled: 0 },
  );
}
