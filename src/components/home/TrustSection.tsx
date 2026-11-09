import { BadgeCheck, Headset, Store, Truck } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';

export default function TrustSection() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Truck,
      title: t('Delivery information', 'معلومات تحویل'),
      text: t(
        'Delivery times and fees are shown clearly before you order.',
        'زمان و هزینه تحویل پیش از سفارش به‌روشنی نشان داده می‌شود.',
      ),
    },
    {
      icon: Headset,
      title: t('Customer support', 'پشتیبانی مشتریان'),
      text: t(
        'Help is available for orders, returns, and product questions.',
        'برای سفارش‌ها، بازگشت کالا و سوال‌های محصول کمک دریافت می‌کنید.',
      ),
    },
    {
      icon: BadgeCheck,
      title: t('Product quality', 'کیفیت محصول'),
      text: t(
        'Product details, availability, and seller information on every item.',
        'جزئیات، موجودی و معلومات فروشنده برای هر محصول.',
      ),
    },
    {
      icon: Store,
      title: t('Clear seller labels', 'برچسب‌های روشن فروشنده'),
      text: t(
        'Official store and independent seller products are always labelled.',
        'محصولات فروشگاه رسمی و فروشندگان مستقل همیشه برچسب دارند.',
      ),
    },
  ];

  return (
    <section aria-label={t('Why shop with us', 'چرا از ما خرید کنید')} className="border-b border-slate-200 bg-white">
      <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
