import { SearchX } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import EmptyState from '@/components/ui/EmptyState';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-center text-6xl font-bold text-primary-700">404</p>
      <div className="mt-8">
        <EmptyState
          icon={SearchX}
          title={t('Page not found', 'صفحه پیدا نشد')}
          description={t(
            'The page you are looking for may have moved or does not exist.',
            'صفحه‌ای که دنبال آن هستید ممکن است جابه‌جا شده باشد یا وجود نداشته باشد.',
          )}
          action={
            <Link to="/" className={buttonClasses('primary')}>
              {t('Back to homepage', 'بازگشت به صفحه اصلی')}
            </Link>
          }
        />
      </div>
    </div>
  );
}
