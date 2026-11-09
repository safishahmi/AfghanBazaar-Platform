import type { LocalizedText } from '@/types/marketplace';

export interface CostLine {
  item: LocalizedText;
  min: number;
  max: number;
  note: LocalizedText;
}

export const ONE_TIME_COSTS: CostLine[] = [
  { item: { en: 'Visual design and branding', prs: 'طراحی بصری و برندسازی' }, min: 1500, max: 4000, note: { en: 'Logo variants, design system, prototype approval', prs: 'نسخه‌های لوگو، سیستم طراحی، تأیید نمونه' } },
  { item: { en: 'Website frontend (Dari and English)', prs: 'بخش نمایشی سایت (دری و انگلیسی)' }, min: 6000, max: 15000, note: { en: 'Full responsive site from the approved prototypes', prs: 'سایت کامل واکنش‌گرا بر اساس نمونه‌های تأییدشده' } },
  { item: { en: 'Database and API', prs: 'پایگاه داده و API' }, min: 4000, max: 10000, note: { en: 'Products, orders, sellers, categories, audit fields', prs: 'محصولات، سفارش‌ها، فروشندگان، دسته‌بندی‌ها، ثبت ممیزی' } },
  { item: { en: 'Customer authentication', prs: 'احراز هویت مشتری' }, min: 1500, max: 3000, note: { en: 'Email and password accounts, password reset', prs: 'حساب با ایمیل و رمز عبور، بازیابی رمز' } },
  { item: { en: 'Seller and admin dashboards', prs: 'داشبورد فروشنده و مدیر' }, min: 6000, max: 14000, note: { en: 'Seller onboarding, moderation, reports', prs: 'ثبت فروشنده، بازبینی محصولات، گزارش‌ها' } },
  { item: { en: 'Product and order management', prs: 'مدیریت محصولات و سفارش‌ها' }, min: 5000, max: 12000, note: { en: 'Stock, order statuses, customer notifications', prs: 'موجودی، وضعیت سفارش، اعلان به مشتری' } },
  { item: { en: 'Payment gateway integration', prs: 'اتصال درگاه پرداخت' }, min: 2000, max: 6000, note: { en: 'Depends on which provider is available in Afghanistan', prs: 'بستگی به درگاهی دارد که در افغانستان در دسترس است' } },
  { item: { en: 'Delivery and fulfilment workflow', prs: 'روند ارسال و تحویل سفارش' }, min: 2000, max: 8000, note: { en: 'Manual workflow, or courier APIs where available', prs: 'روند دستی، یا API پیک در جاهایی که موجود است' } },
  { item: { en: 'Configurable seller commission', prs: 'کمیسیون قابل تنظیم فروشنده' }, min: 3000, max: 8000, note: { en: 'Rules set by the business, tested before use', prs: 'قوانین توسط کسب‌وکار تعیین و پیش از استفاده آزمایش می‌شوند' } },
  { item: { en: 'MLM system and financial rules', prs: 'سیستم MLM و قوانین مالی' }, min: 8000, max: 20000, note: { en: 'Excludes legal and accounting review', prs: 'بررسی حقوقی و حسابداری را شامل نمی‌شود' } },
  { item: { en: 'Testing, deployment, security review', prs: 'آزمایش، راه‌اندازی، بررسی امنیتی' }, min: 3000, max: 8000, note: { en: 'Includes an external review if required', prs: 'در صورت نیاز، بررسی بیرونی را شامل می‌شود' } },
];

export const RECURRING_COSTS: CostLine[] = [
  { item: { en: 'Domain name', prs: 'نام دامنه' }, min: 15, max: 30, note: { en: 'Per year, depends on the extension', prs: 'در سال، بسته به پسوند' } },
  { item: { en: 'Hosting and database', prs: 'میزبانی و پایگاه داده' }, min: 300, max: 1500, note: { en: 'Per year, depends on traffic and plan', prs: 'در سال، بسته به ترافیک و پلان' } },
  { item: { en: 'Backups and monitoring', prs: 'پشتیبان‌گیری و نظارت' }, min: 100, max: 500, note: { en: 'Per year', prs: 'در سال' } },
  { item: { en: 'Email, SMS, or notifications', prs: 'ایمیل، پیامک یا اعلان' }, min: 200, max: 1000, note: { en: 'Per year, depends on message volume', prs: 'در سال، بسته به حجم پیام' } },
  { item: { en: 'Maintenance, support, security updates', prs: 'نگهداری، پشتیبانی، به‌روزرسانی امنیتی' }, min: 1500, max: 6000, note: { en: 'Per year, optional retainer', prs: 'در سال، قرارداد اختیاری' } },
  { item: { en: 'Payment provider fees', prs: 'کارمزد درگاه پرداخت' }, min: 0, max: 0, note: { en: 'Set by each provider per transaction. Not estimated here.', prs: 'توسط هر درگاه برای هر تراکنش تعیین می‌شود. اینجا تخمین زده نمی‌شود.' } },
];

export const CUSTOM_PROGRAMMING: LocalizedText[] = [
  { en: 'Seller commission rules, configurable per seller and per category', prs: 'قوانین کمیسیون فروشنده، قابل تنظیم برای هر فروشنده و دسته‌بندی' },
  { en: 'MLM eligibility, referral tracking, and downline rules', prs: 'شرایط عضویت MLM، ثبت معرفی و قوانین زیرمجموعه' },
  { en: 'Afghanistan-compatible payment methods, confirmed with providers', prs: 'روش‌های پرداخت سازگار با افغانستان، با تأیید درگاه‌ها' },
  { en: 'Order fulfilment and delivery workflows, by province', prs: 'روند تکمیل سفارش و ارسال، بر اساس ولایت' },
  { en: 'Financial reporting and audit trails for each business area', prs: 'گزارش مالی و سابقه ممیزی برای هر بخش کسب‌وکار' },
  { en: 'Multilingual content management (Dari, English, later Pashto)', prs: 'مدیریت محتوای چندزبانه (دری، انگلیسی، و بعداً پشتو)' },
  { en: 'Mobile application development (after the website is stable)', prs: 'توسعه اپلیکیشن موبایل (پس از پایداری سایت)' },
];
