import type { Lang } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'prs', label: 'دری' },
  { value: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('Language', 'زبان')}
      className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5"
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLang(option.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              isActive ? 'bg-primary-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
