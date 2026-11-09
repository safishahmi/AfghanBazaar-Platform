import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';

export default function Logo() {
  const { t } = useLanguage();
  return (
    <Link
      to="/"
      aria-label={t('AfghanBazaar home page', 'صفحه اصلی افغان بازار')}
      className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <img
        src="/AfghanBazaar_Logo_Web_HD.png"
        alt=""
        aria-hidden="true"
        width={56}
        height={40}
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-10"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-base font-bold text-primary-900">افغان بازار</span>
        <span className="hidden text-xs font-semibold tracking-wide text-slate-500 sm:block">
          AfghanBazaar
        </span>
      </span>
    </Link>
  );
}
