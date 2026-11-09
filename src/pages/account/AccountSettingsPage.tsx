import { useLanguage } from '@/i18n/useLanguage';
import type { Lang } from '@/types/marketplace';
import AccountShell from '@/components/account/AccountShell';
import { Panel } from '@/components/account/AccountUi';

const LANGUAGE_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'prs', label: 'دری' },
  { value: 'en', label: 'English' },
];

export default function AccountSettingsPage() {
  const { t, lang, setLang } = useLanguage();

  return (
    <AccountShell
      title={t('Account settings', 'تنظیمات حساب')}
      description={t('Choose how the site appears to you.', 'انتخاب کنید سایت چگونه برای شما نمایش داده شود.')}
    >
      <Panel title={t('Display language', 'زبان نمایش')}>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm text-slate-600">
            {t(
              'Changing the language updates the whole site. Your choice is saved on this device.',
              'تغییر زبان کل سایت را به‌روز می‌کند. انتخاب شما در همین دستگاه ذخیره می‌شود.',
            )}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {LANGUAGE_OPTIONS.map((option) => {
              const checked = lang === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-gold-500 ${
                    checked ? 'border-navy-900 bg-navy-50 text-navy-900' : 'border-slate-200 bg-white text-slate-700 hover:border-navy-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="display-language"
                    value={option.value}
                    checked={checked}
                    onChange={() => setLang(option.value)}
                    className="h-4 w-4 accent-navy-900"
                  />
                </label>
              );
            })}
          </div>
        </fieldset>
      </Panel>

      <Panel title={t('Security and sign-in', 'امنیت و ورود')}>
        <p className="text-sm leading-relaxed text-slate-600">
          {t(
            'Password changes, sign-in devices, and account deletion will be available once customer accounts are connected. Nothing here changes a real account.',
            'تغییر رمز عبور، دستگاه‌های ورود و حذف حساب وقتی فعال می‌شوند که حساب‌های مشتری وصل شوند. این بخش هیچ حساب واقعی را تغییر نمی‌دهد.',
          )}
        </p>
      </Panel>
    </AccountShell>
  );
}
