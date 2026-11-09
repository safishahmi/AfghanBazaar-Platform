import type { LocalizedText } from '@/types/marketplace';
import type {
  FulfilmentMethod,
  PaymentStatus,
  ProductCondition,
  SellerApplicationStatus,
  SellerOrderStatus,
  SellerProductStatus,
  SellerStockStatus,
} from '@/types/seller';

export const PRODUCT_STATUS_TEXT: Record<SellerProductStatus, LocalizedText> = {
  draft: { en: 'Draft', prs: 'پیش‌نویس' },
  pending_review: { en: 'Pending review', prs: 'در انتظار بررسی' },
  published: { en: 'Published', prs: 'منتشر شده' },
  rejected: { en: 'Rejected', prs: 'رد شده' },
  inactive: { en: 'Inactive', prs: 'غیرفعال' },
};

export const STOCK_STATUS_TEXT: Record<SellerStockStatus, LocalizedText> = {
  in_stock: { en: 'In stock', prs: 'موجود' },
  low_stock: { en: 'Low stock', prs: 'موجودی کم' },
  out_of_stock: { en: 'Out of stock', prs: 'ناموجود' },
};

export const CONDITION_TEXT: Record<ProductCondition, LocalizedText> = {
  new: { en: 'New', prs: 'نو' },
  like_new: { en: 'Like new', prs: 'مانند نو' },
  used: { en: 'Used', prs: 'کارکرده' },
};

export const ORDER_STATUS_LABEL: Record<SellerOrderStatus, LocalizedText> = {
  new: { en: 'New', prs: 'جدید' },
  confirmed: { en: 'Confirmed', prs: 'تأیید شده' },
  preparing: { en: 'Preparing', prs: 'در حال آماده‌سازی' },
  ready_for_dispatch: { en: 'Ready for dispatch', prs: 'آماده ارسال' },
  shipped: { en: 'Shipped', prs: 'ارسال شده' },
  delivered: { en: 'Delivered', prs: 'تحویل شده' },
  cancelled: { en: 'Cancelled', prs: 'لغو شده' },
};

export const PAYMENT_STATUS_TEXT: Record<PaymentStatus, LocalizedText> = {
  paid: { en: 'Paid', prs: 'پرداخت شده' },
  cash_on_delivery_due: { en: 'Cash on delivery due', prs: 'پرداخت هنگام تحویل' },
};

export const FULFILMENT_TEXT: Record<FulfilmentMethod, LocalizedText> = {
  seller: { en: 'Seller fulfilment', prs: 'تحویل توسط فروشنده' },
  afghanbazaar: { en: 'AfghanBazaar fulfilment', prs: 'تحویل توسط افغان‌بازار' },
};

export const APPLICATION_STATUS_TEXT: Record<SellerApplicationStatus, LocalizedText> = {
  draft: { en: 'Draft', prs: 'پیش‌نویس' },
  submitted: { en: 'Submitted', prs: 'ثبت شده' },
  under_review: { en: 'Under review', prs: 'در حال بررسی' },
  approved: { en: 'Approved', prs: 'تأیید شده' },
  rejected: { en: 'Rejected', prs: 'رد شده' },
};

export const SHIPPING_METHOD_OPTIONS: FulfilmentMethod[] = ['seller', 'afghanbazaar'];
export const CONDITION_OPTIONS: ProductCondition[] = ['new', 'like_new', 'used'];
