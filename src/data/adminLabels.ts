import type { AdminApplicationStatus, AdminArea, ModerationStatus } from '@/types/admin';
import type { PromoSlideKind } from '@/types/promotions';
import type { LocalizedText } from '@/types/marketplace';

export const CAMPAIGN_TYPE_TEXT: Record<PromoSlideKind, LocalizedText> = {
  seasonal: { en: 'Seasonal campaign', prs: 'کمپاین فصلی' },
  discount: { en: 'Discount', prs: 'تخفیف' },
  featured: { en: 'Featured product', prs: 'محصول برگزیده' },
  official: { en: 'Official store', prs: 'فروشگاه رسمی' },
  announcement: { en: 'Announcement', prs: 'اطلاعیه' },
};

export const APPLICATION_STATUS_TEXT: Record<AdminApplicationStatus, LocalizedText> = {
  submitted: { en: 'Submitted', prs: 'ارسال شده' },
  under_review: { en: 'Under review', prs: 'در حال بررسی' },
  info_requested: { en: 'Information requested', prs: 'درخواست اطلاعات بیشتر' },
  approved: { en: 'Approved', prs: 'تایید شده' },
  rejected: { en: 'Rejected', prs: 'رد شده' },
};

export const PENDING_APPLICATION_STATUSES: AdminApplicationStatus[] = ['submitted', 'under_review', 'info_requested'];

export const MODERATION_STATUS_TEXT: Record<ModerationStatus, LocalizedText> = {
  pending_review: { en: 'Pending review', prs: 'در انتظار بررسی' },
  approved: { en: 'Approved', prs: 'تایید شده' },
  changes_requested: { en: 'Changes requested', prs: 'درخواست تغییر' },
  rejected: { en: 'Rejected', prs: 'رد شده' },
  inactive: { en: 'Inactive', prs: 'غیرفعال' },
};

export const AREA_TEXT: Record<AdminArea, LocalizedText> = {
  applications: { en: 'Seller applications', prs: 'درخواست‌های فروشنده' },
  sellers: { en: 'Seller directory', prs: 'فهرست فروشندگان' },
  moderation: { en: 'Product moderation', prs: 'بررسی محصولات' },
  categories: { en: 'Categories', prs: 'دسته‌بندی‌ها' },
  slides: { en: 'Promotional slider', prs: 'اسلایدر تبلیغاتی' },
};

export const SLIDE_CTA_OPTIONS: { to: string; label: LocalizedText }[] = [
  { to: '/products', label: { en: 'Browse all products', prs: 'مشاهده همه محصولات' } },
  { to: '/products?source=official', label: { en: 'Shop official products', prs: 'خرید محصولات رسمی' } },
  { to: '/products?source=independent', label: { en: 'Shop independent sellers', prs: 'خرید از فروشندگان مستقل' } },
  { to: '/sell', label: { en: 'Become a seller', prs: 'فروشنده شوید' } },
  { to: '/about', label: { en: 'About AfghanBazaar', prs: 'درباره افغان بازار' } },
];

export const CAMPAIGN_TYPE_OPTIONS: PromoSlideKind[] = ['seasonal', 'discount', 'featured', 'official', 'announcement'];
