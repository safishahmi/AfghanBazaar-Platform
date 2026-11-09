import type { Lang, LocalizedText } from './marketplace';

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderSource = 'official' | 'independent';

export type PaymentMethodLabel = 'cash_on_delivery' | 'bank_transfer' | 'mobile_wallet';

export interface Customer {
  id: string;
  fullName: LocalizedText;
  phone: string;
  email: string | null;
  preferredLang: Lang;
  memberSince: string;
}

export interface CustomerAddress {
  id: string;
  label: LocalizedText;
  recipientName: LocalizedText;
  phone: string;
  city: LocalizedText;
  line: LocalizedText;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: LocalizedText;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  date: string;
}

export interface CustomerOrder {
  id: string;
  source: OrderSource;
  items: OrderItem[];
  deliveryFee: number;
  paymentMethod: PaymentMethodLabel;
  deliveryAddress: CustomerAddress;
  statusHistory: OrderStatusEvent[];
}
