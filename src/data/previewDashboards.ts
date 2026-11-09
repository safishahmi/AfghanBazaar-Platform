import type { LocalizedText } from '@/types/marketplace';

export type OrderStatus = 'new' | 'packed' | 'shipped' | 'delivered';
export type StockStatus = 'ok' | 'low' | 'out';
export type ProductReviewStatus = 'pending' | 'approved' | 'changes';

export interface DemoSellerProduct {
  sku: string;
  name: LocalizedText;
  price: number;
  stock: number;
  status: StockStatus;
}

export interface DemoOrder {
  id: string;
  customer: LocalizedText;
  city: LocalizedText;
  total: number;
  items: number;
  status: OrderStatus;
  date: string;
}

export interface DemoModerationItem {
  id: string;
  product: LocalizedText;
  seller: LocalizedText;
  sellerType: 'official' | 'independent';
  submitted: string;
  status: ProductReviewStatus;
}

export interface DemoUser {
  name: LocalizedText;
  role: LocalizedText;
  sellerType: 'official' | 'independent' | 'customer';
  status: 'active' | 'pending' | 'suspended';
  joined: string;
}

export const SELLER_PRODUCTS: DemoSellerProduct[] = [
  { sku: 'DEMO-HP-001', name: { en: 'Wireless Over-Ear Headphones', prs: 'هدفون بی‌سیم گوش‌گیر' }, price: 4500, stock: 24, status: 'ok' },
  { sku: 'DEMO-LP-014', name: { en: '14-inch Laptop', prs: 'لپ‌تاپ ۱۴ اینچی' }, price: 42000, stock: 3, status: 'low' },
  { sku: 'DEMO-SW-220', name: { en: 'Fitness Smart Watch', prs: 'ساعت هوشمند ورزشی' }, price: 3200, stock: 0, status: 'out' },
  { sku: 'DEMO-KT-031', name: { en: 'Non-stick Cookware Set', prs: 'ست ظروف غیرچسبنده' }, price: 2800, stock: 16, status: 'ok' },
  { sku: 'DEMO-BK-007', name: { en: 'Afghan History Book', prs: 'کتاب تاریخ افغانستان' }, price: 650, stock: 58, status: 'ok' },
];

export const SELLER_ORDERS: DemoOrder[] = [
  { id: 'DEMO-1042', customer: { en: 'Sample customer A', prs: 'مشتری نمونه A' }, city: { en: 'Kabul', prs: 'کابل' }, total: 9000, items: 2, status: 'new', date: '2026-10-30' },
  { id: 'DEMO-1041', customer: { en: 'Sample customer B', prs: 'مشتری نمونه B' }, city: { en: 'Herat', prs: 'هرات' }, total: 42000, items: 1, status: 'packed', date: '2026-10-30' },
  { id: 'DEMO-1040', customer: { en: 'Sample customer C', prs: 'مشتری نمونه C' }, city: { en: 'Mazar-i-Sharif', prs: 'مزار شریف' }, total: 2800, items: 1, status: 'shipped', date: '2026-10-29' },
  { id: 'DEMO-1039', customer: { en: 'Sample customer D', prs: 'مشتری نمونه D' }, city: { en: 'Kandahar', prs: 'قندهار' }, total: 650, items: 1, status: 'delivered', date: '2026-10-28' },
];

export const MODERATION_QUEUE: DemoModerationItem[] = [
  { id: 'DEMO-M1', product: { en: 'Handmade Carpet, Small', prs: 'قالین دستباف کوچک' }, seller: { en: 'Herat Home Crafts', prs: 'دست‌سازه‌های هرات' }, sellerType: 'independent', submitted: '2026-10-30', status: 'pending' },
  { id: 'DEMO-M2', product: { en: 'Children School Bag', prs: 'بستۀ مکتب کودکان' }, seller: { en: 'Kandahar Fashion House', prs: 'خانه مد قندهار' }, sellerType: 'independent', submitted: '2026-10-29', status: 'changes' },
  { id: 'DEMO-M3', product: { en: 'Bluetooth Speaker', prs: 'اسپیکر بلوتوث' }, seller: { en: 'AfghanBazaar Official Store', prs: 'فروشگاه رسمی افغان بازار' }, sellerType: 'official', submitted: '2026-10-28', status: 'approved' },
];

export const DEMO_USERS: DemoUser[] = [
  { name: { en: 'Sample seller: Kabul Tech Hub', prs: 'فروشنده نمونه: کابل تک هب' }, role: { en: 'Independent seller', prs: 'فروشنده مستقل' }, sellerType: 'independent', status: 'active', joined: '2026-08-12' },
  { name: { en: 'Sample seller: Herat Home Crafts', prs: 'فروشنده نمونه: دست‌سازه‌های هرات' }, role: { en: 'Independent seller', prs: 'فروشنده مستقل' }, sellerType: 'independent', status: 'pending', joined: '2026-10-27' },
  { name: { en: 'Sample customer E', prs: 'مشتری نمونه E' }, role: { en: 'Customer', prs: 'مشتری' }, sellerType: 'customer', status: 'active', joined: '2026-09-03' },
  { name: { en: 'Sample operator: Official Store', prs: 'اپراتور نمونه: فروشگاه رسمی' }, role: { en: 'Official store team', prs: 'تیم فروشگاه رسمی' }, sellerType: 'official', status: 'active', joined: '2026-07-01' },
  { name: { en: 'Sample seller: Mazar Agro Supply', prs: 'فروشنده نمونه: تأمین زراعتی مزار' }, role: { en: 'Independent seller', prs: 'فروشنده مستقل' }, sellerType: 'independent', status: 'suspended', joined: '2026-06-18' },
];
