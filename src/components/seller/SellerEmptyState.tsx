import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';

interface SellerEmptyStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export default function SellerEmptyState({ title, message, action }: SellerEmptyStateProps) {
  const { t } = useLanguage();
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-bold text-navy-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
      <div className="mt-6 flex justify-center">
        {action ?? (
          <Link to="/seller/products" className={buttonClasses('secondary')}>
            {t('Back to products', 'بازگشت به محصولات')}
          </Link>
        )}
      </div>
    </div>
  );
}
