import type { FulfilmentOption, SellerOrder, SellerProduct } from '@/types/seller';
import type { LocalizedText } from '@/types/marketplace';
import { getProductById } from '@/lib/productQueries';

export const DEMO_SELLER_ID = 'demo-seller';

export interface SellerProvince {
  id: string;
  name: LocalizedText;
}

export const PROVINCES: SellerProvince[] = [
  { id: 'kabul', name: { en: 'Kabul', prs: 'کابل' } },
  { id: 'herat', name: { en: 'Herat', prs: 'هرات' } },
  { id: 'balkh', name: { en: 'Balkh', prs: 'بلخ' } },
  { id: 'kandahar', name: { en: 'Kandahar', prs: 'کندهار' } },
  { id: 'nangarhar', name: { en: 'Nangarhar', prs: 'ننگرهار' } },
  { id: 'badakhshan', name: { en: 'Badakhshan', prs: 'بدخشان' } },
  { id: 'bamyan', name: { en: 'Bamyan', prs: 'بامیان' } },
  { id: 'ghazni', name: { en: 'Ghazni', prs: 'غزنی' } },
  { id: 'helmand', name: { en: 'Helmand', prs: 'هلمند' } },
  { id: 'kunduz', name: { en: 'Kunduz', prs: 'کندز' } },
  { id: 'parwan', name: { en: 'Parwan', prs: 'پروان' } },
  { id: 'takhar', name: { en: 'Takhar', prs: 'تخار' } },
];

export const FULFILMENT_OPTIONS: FulfilmentOption[] = [
  {
    id: 'seller',
    title: { en: 'Seller fulfilment', prs: 'تحویل توسط فروشنده' },
    description: {
      en: 'You pack and deliver orders yourself. Available now in this demo.',
      prs: 'شما سفارش‌ها را بسته‌بندی و تحویل می‌دهید. در این نسخه آزمایشی فعال است.',
    },
    feePerOrder: null,
  },
  {
    id: 'afghanbazaar',
    title: { en: 'AfghanBazaar fulfilment', prs: 'تحویل توسط افغان‌بازار' },
    description: {
      en: 'AfghanBazaar stores, packs, and dispatches your stock. Planned for a later phase.',
      prs: 'افغان‌بازار موجودی شما را نگهداری، بسته‌بندی و ارسال می‌کند. برای مرحله بعدی برنامه‌ریزی شده است.',
    },
    feePerOrder: null,
  },
];

interface ProductSeed {
  id: string;
  imageFrom: string;
  name: LocalizedText;
  description: string;
  categoryId: SellerProduct['categoryId'];
  sellingPrice: number;
  discountPrice: number | null;
  quantity: number;
  condition: SellerProduct['condition'];
  brand: string | null;
  sku: string;
  shippingMethod: SellerProduct['shippingMethod'];
  status: SellerProduct['status'];
  updatedAt: string;
}

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    id: 'demo-earbuds',
    imageFrom: 'wireless-over-ear-headphones',
    name: { en: 'Demo wireless earbuds', prs: 'گوش‌ی بی‌سیم نمونه' },
    description: 'Compact earbuds with a charging case. Demo listing.',
    categoryId: 'electronics',
    sellingPrice: 2800,
    discountPrice: 2400,
    quantity: 24,
    condition: 'new',
    brand: 'DemoSound',
    sku: 'DEMO-EB-001',
    shippingMethod: 'seller',
    status: 'published',
    updatedAt: '2026-10-28',
  },
  {
    id: 'demo-vase',
    imageFrom: 'hand-painted-ceramic-vase',
    name: { en: 'Demo hand-painted vase', prs: 'گلدان نمونه دست‌ساز' },
    description: 'A small hand-painted ceramic vase. Demo listing.',
    categoryId: 'home-kitchen',
    sellingPrice: 1900,
    discountPrice: null,
    quantity: 2,
    condition: 'new',
    brand: null,
    sku: 'DEMO-HV-002',
    shippingMethod: 'seller',
    status: 'published',
    updatedAt: '2026-10-27',
  },
  {
    id: 'demo-shirt',
    imageFrom: 'mens-cotton-shirt',
    name: { en: 'Demo cotton shirt', prs: 'پیراهن نمونه پنبه‌ای' },
    description: 'Breathable cotton shirt for everyday wear. Demo listing.',
    categoryId: 'clothing',
    sellingPrice: 1300,
    discountPrice: null,
    quantity: 15,
    condition: 'new',
    brand: null,
    sku: 'DEMO-CS-003',
    shippingMethod: 'seller',
    status: 'pending_review',
    updatedAt: '2026-10-29',
  },
  {
    id: 'demo-moisturiser',
    imageFrom: 'daily-face-moisturiser',
    name: { en: 'Demo face moisturiser', prs: 'کرم نمونه مرطوب‌کننده' },
    description: 'Lightweight daily moisturiser. Demo draft.',
    categoryId: 'beauty',
    sellingPrice: 900,
    discountPrice: null,
    quantity: 0,
    condition: 'new',
    brand: 'DemoCare',
    sku: 'DEMO-MF-004',
    shippingMethod: 'afghanbazaar',
    status: 'draft',
    updatedAt: '2026-10-30',
  },
  {
    id: 'demo-study-set',
    imageFrom: 'stack-of-study-books',
    name: { en: 'Demo study book set', prs: 'مجموعه کتاب درسی نمونه' },
    description: 'Set of study books for secondary school. Demo listing.',
    categoryId: 'books',
    sellingPrice: 750,
    discountPrice: null,
    quantity: 10,
    condition: 'used',
    brand: null,
    sku: 'DEMO-BK-005',
    shippingMethod: 'seller',
    status: 'rejected',
    updatedAt: '2026-10-22',
  },
  {
    id: 'demo-tool-kit',
    imageFrom: 'hand-tool-set',
    name: { en: 'Demo hand tool kit', prs: 'کیت ابزار دستی نمونه' },
    description: 'Basic hand tool kit for home repairs. Demo listing.',
    categoryId: 'tools',
    sellingPrice: 2600,
    discountPrice: 2450,
    quantity: 0,
    condition: 'new',
    brand: null,
    sku: 'DEMO-TK-006',
    shippingMethod: 'seller',
    status: 'published',
    updatedAt: '2026-10-26',
  },
  {
    id: 'demo-vitamin-pack',
    imageFrom: 'vitamin-c-gummies',
    name: { en: 'Demo vitamin pack', prs: 'بسته ویتامین نمونه' },
    description: 'Vitamin C pack. Demo listing, currently paused by the seller.',
    categoryId: 'health',
    sellingPrice: 1100,
    discountPrice: null,
    quantity: 5,
    condition: 'new',
    brand: 'DemoHealth',
    sku: 'DEMO-VP-007',
    shippingMethod: 'afghanbazaar',
    status: 'inactive',
    updatedAt: '2026-10-18',
  },
  {
    id: 'demo-veg-crate',
    imageFrom: 'fresh-vegetable-crate',
    name: { en: 'Demo vegetable crate', prs: 'سبد سبزیجات نمونه' },
    description: 'Fresh seasonal vegetable crate. Demo listing.',
    categoryId: 'agriculture',
    sellingPrice: 600,
    discountPrice: null,
    quantity: 8,
    condition: 'new',
    brand: null,
    sku: 'DEMO-VC-008',
    shippingMethod: 'seller',
    status: 'published',
    updatedAt: '2026-10-30',
  },
];

function imageFor(productId: string): string {
  const product = getProductById(productId);
  if (!product) throw new Error(`Unknown demo image source: ${productId}`);
  return product.imageUrl;
}

export const SAMPLE_PRODUCT_IMAGES: { label: LocalizedText; imageUrl: string }[] = [
  { label: { en: 'Headphones', prs: 'هدفون' }, imageUrl: imageFor('wireless-over-ear-headphones') },
  { label: { en: 'Ceramic vase', prs: 'گلدان سرامیکی' }, imageUrl: imageFor('hand-painted-ceramic-vase') },
  { label: { en: 'Cotton shirt', prs: 'پیراهن پنبه‌ای' }, imageUrl: imageFor('mens-cotton-shirt') },
  { label: { en: 'Skincare', prs: 'مراقبت پوست' }, imageUrl: imageFor('daily-face-moisturiser') },
  { label: { en: 'Vitamins', prs: 'ویتامین' }, imageUrl: imageFor('vitamin-c-gummies') },
  { label: { en: 'Vegetables', prs: 'سبزیجات' }, imageUrl: imageFor('fresh-vegetable-crate') },
];

const DEMO_SELLER_PRODUCTS: SellerProduct[] = PRODUCT_SEEDS.map((seed) => ({
  id: seed.id,
  sellerId: DEMO_SELLER_ID,
  name: seed.name,
  description: seed.description,
  categoryId: seed.categoryId,
  imageUrl: imageFor(seed.imageFrom),
  sellingPrice: seed.sellingPrice,
  discountPrice: seed.discountPrice,
  quantity: seed.quantity,
  condition: seed.condition,
  brand: seed.brand,
  sku: seed.sku,
  shippingMethod: seed.shippingMethod,
  status: seed.status,
  updatedAt: seed.updatedAt,
}));

function line(productId: string, quantity: number) {
  const product = DEMO_SELLER_PRODUCTS.find((item) => item.id === productId);
  if (!product) throw new Error(`Unknown demo seller product: ${productId}`);
  return {
    productId,
    name: product.name,
    unitPrice: product.discountPrice ?? product.sellingPrice,
    quantity,
  };
}

export const DEMO_SELLER_ORDERS: SellerOrder[] = [
  {
    id: 'AB-SELL-2001',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-30',
    status: 'new',
    paymentStatus: 'cash_on_delivery_due',
    fulfilment: 'seller',
    customerName: 'M*** R***',
    customerPhone: '+93 7* *** *21',
    customerArea: { en: 'Kabul, District 4', prs: 'کابل، ناحیه ۴' },
    items: [line('demo-earbuds', 1)],
  },
  {
    id: 'AB-SELL-2002',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-29',
    status: 'confirmed',
    paymentStatus: 'paid',
    fulfilment: 'seller',
    customerName: 'S*** A***',
    customerPhone: '+93 7* *** *48',
    customerArea: { en: 'Herat, Main Bazaar', prs: 'هرات، بازار اصلی' },
    items: [line('demo-vase', 1), line('demo-veg-crate', 2)],
  },
  {
    id: 'AB-SELL-2003',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-28',
    status: 'preparing',
    paymentStatus: 'cash_on_delivery_due',
    fulfilment: 'seller',
    customerName: 'K*** N***',
    customerPhone: '+93 7* *** *07',
    customerArea: { en: 'Balkh, Mazar district', prs: 'بلخ، ولسوالی مزار' },
    items: [line('demo-tool-kit', 1)],
  },
  {
    id: 'AB-SELL-2004',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-27',
    status: 'ready_for_dispatch',
    paymentStatus: 'paid',
    fulfilment: 'seller',
    customerName: 'H*** W***',
    customerPhone: '+93 7* *** *93',
    customerArea: { en: 'Kandahar, City centre', prs: 'کندهار، مرکز شهر' },
    items: [line('demo-earbuds', 2)],
  },
  {
    id: 'AB-SELL-2005',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-25',
    status: 'shipped',
    paymentStatus: 'paid',
    fulfilment: 'seller',
    customerName: 'L*** Z***',
    customerPhone: '+93 7* *** *65',
    customerArea: { en: 'Nangarhar, Jalalabad', prs: 'ننگرهار، جلال‌آباد' },
    items: [line('demo-shirt', 2)],
  },
  {
    id: 'AB-SELL-2006',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-20',
    status: 'delivered',
    paymentStatus: 'paid',
    fulfilment: 'seller',
    customerName: 'F*** Q***',
    customerPhone: '+93 7* *** *30',
    customerArea: { en: 'Parwan, Charikar', prs: 'پروان، چاریکار' },
    items: [line('demo-veg-crate', 1)],
  },
  {
    id: 'AB-SELL-2007',
    sellerId: DEMO_SELLER_ID,
    placedAt: '2026-10-19',
    status: 'cancelled',
    paymentStatus: 'cash_on_delivery_due',
    fulfilment: 'afghanbazaar',
    customerName: 'J*** B***',
    customerPhone: '+93 7* *** *17',
    customerArea: { en: 'Kabul, District 2', prs: 'کابل، ناحیه ۲' },
    items: [line('demo-moisturiser', 1)],
  },
];
