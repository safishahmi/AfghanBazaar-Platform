import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAdminAccess } from '@/admin/useAdminAccess';
import AdminSignInForm from '@/components/admin/AdminSignInForm';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { useLanguage } from '@/i18n/useLanguage';

function AccessCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminAccessGate({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const { status, email, signOut } = useAdminAccess();

  if (status === 'loading') {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p role="status" className="text-sm font-semibold text-slate-600">
          {t('Checking admin access...', 'در حال بررسی دسترسی مدیر...')}
        </p>
      </div>
    );
  }

  if (status === 'signedOut') {
    return (
      <AccessCard>
        <h1 className="text-2xl font-bold text-slate-900">{t('Admin sign-in', 'ورود مدیر')}</h1>
        <p className="mt-2 mb-6 text-sm text-slate-600">
          {t('This area is for authorized AfghanBazaar staff only.', 'این بخش فقط برای کارکنان مجاز افغان بازار است.')}
        </p>
        <AdminSignInForm />
      </AccessCard>
    );
  }

  if (status === 'denied') {
    return (
      <AccessCard>
        <h1 className="text-2xl font-bold text-slate-900">{t('Access not granted', 'دسترسی داده نشده است')}</h1>
        <p className="mt-2 mb-6 text-sm text-slate-600">
          {t(
            'This account is not authorized for the admin dashboard. Sign out and use a staff account.',
            'این حساب برای داشبورد مدیریت مجاز نیست. خارج شوید و از یک حساب کارمند استفاده کنید.',
          )}
        </p>
        <button type="button" onClick={() => void signOut()} className={`${buttonClasses('primary')} w-full`}>
          {t('Sign out', 'خروج')}
        </button>
      </AccessCard>
    );
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-4 py-2 text-xs text-slate-600">
        <span className="truncate">{email}</span>
        <button type="button" onClick={() => void signOut()} className="font-semibold text-navy-700 hover:underline">
          {t('Sign out', 'خروج')}
        </button>
      </div>
      {children}
    </>
  );
}
