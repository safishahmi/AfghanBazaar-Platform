import { Warehouse, Truck } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { Panel } from '@/components/account/AccountUi';
import SellerShell from '@/components/seller/SellerShell';
import { FULFILMENT_OPTIONS } from '@/data/seller';
import type { LocalizedText } from '@/types/marketplace';
import type { FulfilmentMethod } from '@/types/seller';
import { useSellerData } from '@/seller/useSellerData';

const AVAILABILITY: Record<FulfilmentMethod, LocalizedText> = {
  seller: { en: 'Available in demo', prs: 'در نمونه فعال است' },
  afghanbazaar: { en: 'Planned, not available yet', prs: 'برنامه‌ریزی شده، هنوز فعال نیست' },
};

export default function SellerShippingPage() {
  const { t, tx } = useLanguage();
  const { products } = useSellerData();

  const countFor = (method: FulfilmentMethod) => products.filter((product) => product.shippingMethod === method).length;

  return (
    <SellerShell
      title={t('Shipping and fulfilment', 'ارسال و تحویل')}
      description={t('Choose how orders for your products are delivered. Fees are not set yet.', 'روش تحویل سفارش‌های محصولات خود را انتخاب کنید. هزینه‌ها هنوز تعیین نشده‌اند.')}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {FULFILMENT_OPTIONS.map((option) => {
          const Icon = option.id === 'seller' ? Warehouse : Truck;
          return (
            <Panel key={option.id} title={tx(option.title)}>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 space-y-3">
                  <p className="text-sm leading-relaxed text-slate-700">{tx(option.description)}</p>
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-900 ring-1 ring-slate-300">
                    {tx(AVAILABILITY[option.id])}
                  </span>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Fee per order', 'هزینه هر سفارش')}</dt>
                  <dd className="mt-1 text-sm font-semibold text-navy-900">{t('To be configured', 'به‌زودی تعیین می‌شود')}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Your products', 'محصولات شما')}</dt>
                  <dd className="mt-1 text-sm font-semibold text-navy-900">{countFor(option.id)}</dd>
                </div>
              </dl>
            </Panel>
          );
        })}
      </div>
    </SellerShell>
  );
}
