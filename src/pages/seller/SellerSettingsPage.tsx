import { useLanguage } from '@/i18n/useLanguage';
import type { Lang, LocalizedText } from '@/types/marketplace';
import { Panel } from '@/components/account/AccountUi';
import SellerShell from '@/components/seller/SellerShell';
import { useSellerData } from '@/seller/useSellerData';
import { useSellerAuth } from '@/seller/useSellerAuth';

const LANGUAGE_OPTIONS: { value: Lang; label: LocalizedText }[] = [
  { value: 'en', label: { en: 'English', prs: 'انگلیسی' } },
  { value: 'prs', label: { en: 'Dari', prs: 'دری' } },
];

export default function SellerSettingsPage() {
  const { t, tx, lang, setLang } = useLanguage();
  const { application } = useSellerData();
  const { user } = useSellerAuth();
  const notSet = t('Not set yet', 'هنوز تنظیم نشده');

  return (
    <SellerShell
      title={t('Seller settings', 'تنظیمات فروشنده')}
      description={t('Language and account details for your seller account.', 'زبان و جزئیات حساب فروشنده شما.')}
    >
      <Panel title={t('Display language', 'زبان نمایش')}>
        <fieldset className="flex flex-col gap-3 sm:flex-row">
          <legend className="sr-only">{t('Display language', 'زبان نمایش')}</legend>
          {LANGUAGE_OPTIONS.map((option) => {
            const checked = lang === option.value;
            return (
              <label
                key={option.value}
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ring-1 transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-500 ${
                  checked ? 'bg-navy-900 text-white ring-navy-900' : 'bg-white text-slate-800 ring-slate-300 hover:bg-navy-50'
                }`}
              >
                {tx(option.label)}
                <input
                  type="radio"
                  name="seller-language"
                  value={option.value}
                  checked={checked}
                  onChange={() => setLang(option.value)}
                  className="h-4 w-4 accent-navy-900"
                />
              </label>
            );
          })}
        </fieldset>
      </Panel>

      <Panel title={t('Seller account', 'حساب فروشنده')}>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Name', 'نام')}</dt>
            <dd className="mt-1 text-sm font-semibold text-navy-900">{application.fullName.trim() || notSet}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Phone', 'تلفن')}</dt>
            <dd className="mt-1 text-sm font-semibold text-navy-900" dir="ltr">
              {application.phone.trim() || notSet}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('Sign-in email', 'ایمیل ورود')}</dt>
            <dd className="mt-1 text-sm font-semibold text-navy-900" dir="ltr">
              {user?.email ?? notSet}
            </dd>
          </div>
        </dl>
        <p className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
          {t(
            'Name, phone, and store details are edited in your store registration form. Password changes are not available yet.',
            'نام، تلفن و جزئیات فروشگاه در فرم ثبت فروشگاه ویرایش می‌شوند. تغییر رمز عبور هنوز فعال نیست.',
          )}
        </p>
      </Panel>
    </SellerShell>
  );
}
