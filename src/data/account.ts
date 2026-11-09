import type { CustomerAddress, Customer, CustomerOrder, OrderItem, OrderSource, OrderStatus, PaymentMethodLabel } from '@/types/account';
import type { LocalizedText } from '@/types/marketplace';
import { getProductById } from '@/lib/productQueries';

export const DEMO_DELIVERY_FEE = 200;

export const DEMO_CUSTOMER: Customer = {
  id: 'demo-customer',
  fullName: { en: 'Demo Customer', prs: 'مشتری نمونه' },
  phone: '+93 70 000 0000',
  email: 'demo@example.com',
  preferredLang: 'prs',
  memberSince: '2026-08-15',
};

const ADDRESS_HOME: CustomerAddress = {
  id: 'address-home',
  label: { en: 'Home', prs: 'خانه' },
  recipientName: DEMO_CUSTOMER.fullName,
  phone: DEMO_CUSTOMER.phone,
  city: { en: 'Kabul', prs: 'کابل' },
  line: { en: 'District 4, Street 12, House 45', prs: 'ناحیه ۴، سرک ۱۲، خانه ۴۵' },
  isDefault: true,
};

const ADDRESS_OFFICE: CustomerAddress = {
  id: 'address-office',
  label: { en: 'Office', prs: 'دفتر کار' },
  recipientName: DEMO_CUSTOMER.fullName,
  phone: DEMO_CUSTOMER.phone,
  city: { en: 'Herat', prs: 'هرات' },
  line: { en: 'Main Bazaar, Shop 7', prs: 'بازار اصلی، دکان ۷' },
  isDefault: false,
};

export const DEMO_ADDRESSES: CustomerAddress[] = [ADDRESS_HOME, ADDRESS_OFFICE];

function demoItem(productId: string, quantity: number): OrderItem {
  const product = getProductById(productId);
  if (!product) throw new Error(`Unknown demo product: ${productId}`);
  return {
    productId,
    productName: product.name,
    imageUrl: product.imageUrl,
    unitPrice: product.price,
    quantity,
  };
}

function demoOrder(
  id: string,
  source: OrderSource,
  items: OrderItem[],
  paymentMethod: PaymentMethodLabel,
  deliveryAddress: CustomerAddress,
  statusHistory: { status: OrderStatus; date: string }[],
): CustomerOrder {
  return { id, source, items, deliveryFee: DEMO_DELIVERY_FEE, paymentMethod, deliveryAddress, statusHistory };
}

export const DEMO_ORDERS: CustomerOrder[] = [
  demoOrder(
    'AB-DEMO-1005',
    'official',
    [demoItem('hand-tool-set', 1)],
    'cash_on_delivery',
    ADDRESS_HOME,
    [{ status: 'placed', date: '2026-10-30' }],
  ),
  demoOrder(
    'AB-DEMO-1004',
    'official',
    [demoItem('oud-eau-de-parfum', 1)],
    'bank_transfer',
    ADDRESS_HOME,
    [
      { status: 'placed', date: '2026-10-18' },
      { status: 'cancelled', date: '2026-10-19' },
    ],
  ),
  demoOrder(
    'AB-DEMO-1003',
    'official',
    [demoItem('smart-watch-fitness', 1)],
    'bank_transfer',
    ADDRESS_HOME,
    [
      { status: 'placed', date: '2026-10-26' },
      { status: 'confirmed', date: '2026-10-27' },
      { status: 'preparing', date: '2026-10-28' },
    ],
  ),
  demoOrder(
    'AB-DEMO-1002',
    'independent',
    [demoItem('mens-cotton-shirt', 2), demoItem('niacinamide-serum', 1)],
    'mobile_wallet',
    ADDRESS_OFFICE,
    [
      { status: 'placed', date: '2026-10-20' },
      { status: 'confirmed', date: '2026-10-21' },
      { status: 'preparing', date: '2026-10-22' },
      { status: 'shipped', date: '2026-10-24' },
    ],
  ),
  demoOrder(
    'AB-DEMO-1001',
    'official',
    [demoItem('floral-ceramic-serving-pot', 2), demoItem('vitamin-c-gummies', 1)],
    'cash_on_delivery',
    ADDRESS_HOME,
    [
      { status: 'placed', date: '2026-10-02' },
      { status: 'confirmed', date: '2026-10-03' },
      { status: 'preparing', date: '2026-10-04' },
      { status: 'shipped', date: '2026-10-05' },
      { status: 'delivered', date: '2026-10-06' },
    ],
  ),
];

export const ORDER_STATUS_TEXT: Record<OrderStatus, LocalizedText> = {
  placed: { en: 'Order placed', prs: 'سفارش ثبت شد' },
  confirmed: { en: 'Confirmed', prs: 'تایید شد' },
  preparing: { en: 'Preparing', prs: 'در حال آماده‌سازی' },
  shipped: { en: 'Shipped', prs: 'ارسال شد' },
  delivered: { en: 'Delivered', prs: 'تحویل داده شد' },
  cancelled: { en: 'Cancelled', prs: 'لغو شد' },
};

export const PAYMENT_METHOD_TEXT: Record<PaymentMethodLabel, LocalizedText> = {
  cash_on_delivery: { en: 'Cash on delivery (demo)', prs: 'پرداخت نقدی هنگام تحویل (نمونه)' },
  bank_transfer: { en: 'Bank transfer (demo)', prs: 'انتقال بانکی (نمونه)' },
  mobile_wallet: { en: 'Mobile wallet (demo)', prs: 'کیف پول موبایلی (نمونه)' },
};

export const ORDER_SOURCE_TEXT: Record<OrderSource, LocalizedText> = {
  official: { en: 'AfghanBazaar Official Store', prs: 'فروشگاه رسمی افغان بازار' },
  independent: { en: 'Independent seller', prs: 'فروشنده مستقل' },
};

export const LANGUAGE_NAME_TEXT: Record<'en' | 'prs', LocalizedText> = {
  en: { en: 'English', prs: 'انگلیسی' },
  prs: { en: 'Dari', prs: 'دری' },
};
