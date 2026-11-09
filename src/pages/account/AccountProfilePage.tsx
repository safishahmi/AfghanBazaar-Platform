import { Info } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { formatDemoDate } from '@/lib/format';
import { getCustomer } from '@/lib/accountQueries';
import { LANGUAGE_NAME_TEXT } from '@/data/account';
import AccountShell from '@/components/account/AccountShell';
import { Panel } from '@/components/account/AccountUi';

export default function AccountProfilePage() {
  const { t, tx, lang } = useLanguage();
  const customer = getCustomer();

  const rows = [
    { label: t('Full name', 'نام کامل'), value: tx(customer.fullName) },
    { label: t('Phone number', 'شماره تلفن'), value: customer.phone },
    { label: t('Email', 'ایمیل'), value: customer.email ?? t('Not provided', 'ارائه نشده') },
    { label: t('Preferred language', 'زبان ترجیحی'), value: tx(LANGUAGE_NAME_TEXT[customer.preferredLang]) },
    { label: t('Member since', 'عضو از'), value: formatDemoDate(customer.memberSince, lang) },
  ];

  return (
    <AccountShell
      title={t('Profile', 'پروفایل')}
      description={t('Your personal details for this demo account.', 'جزئیات شخصی شما برای این حساب نمونه.')}
    >
      <Panel title={t('Personal details', 'جزئیات شخصی')}>
        <dl className="grid gap-5 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="min-w-0 rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{row.label}</dt>
              <dd className="mt-1 break-words text-base font-semibold text-slate-900">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" />
          {t(
            'Profile editing will be available once customer accounts are connected. Nothing on this page is saved.',
            'ویرایش پروفایل وقتی فعال می‌شود که حساب‌های مشتری وصل شوند. چیزی در این صفحه ذخیره نمی‌شود.',
          )}
        </p>
      </Panel>
    </AccountShell>
  );
}
