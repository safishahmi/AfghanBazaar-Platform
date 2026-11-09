import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import SellerSignInPage from '@/pages/seller/SellerSignInPage';
import { SellerDataProvider } from './SellerDataProvider';
import { useSellerAuth } from './useSellerAuth';

export function SellerAccessGate({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const { user, isLoading } = useSellerAuth();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p role="status" className="text-sm font-semibold text-slate-600">
          {t('Checking your seller account...', 'در حال بررسی حساب فروشنده...')}
        </p>
      </div>
    );
  }

  if (!user) return <SellerSignInPage />;

  return <SellerDataProvider userId={user.id}>{children}</SellerDataProvider>;
}
