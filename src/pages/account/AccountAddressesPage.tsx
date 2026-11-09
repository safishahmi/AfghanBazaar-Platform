import { MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { getAddresses } from '@/lib/accountQueries';
import AccountShell from '@/components/account/AccountShell';

export default function AccountAddressesPage() {
  const { t, tx } = useLanguage();
  const addresses = getAddresses();

  return (
    <AccountShell
      title={t('Address book', 'دفترچه آدرس')}
      description={t(
        'Delivery addresses saved for this demo account. Adding and editing will be available later.',
        'آدرس‌های تحویل ذخیره‌شده برای این حساب نمونه. افزودن و ویرایش در مرحله بعدی فعال می‌شود.',
      )}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <li
            key={address.id}
            className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-bold text-navy-900">
                <MapPin className="h-4 w-4 text-navy-700" aria-hidden="true" />
                {tx(address.label)}
              </span>
              {address.isDefault && (
                <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-navy-900 ring-1 ring-gold-400">
                  {t('Default', 'پیش‌فرض')}
                </span>
              )}
            </div>
            <div className="text-sm leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">{tx(address.recipientName)}</p>
              <p dir="ltr" className="text-start">{address.phone}</p>
              <p>{tx(address.city)}</p>
              <p>{tx(address.line)}</p>
            </div>
          </li>
        ))}
      </ul>
    </AccountShell>
  );
}
