import { useState } from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { buttonClasses } from '@/components/ui/buttonStyles';

type AuthMode = 'login' | 'register';

export default function LoginPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>('login');

  const isLogin = mode === 'login';

  const tabClass = (active: boolean) =>
    `flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
      active ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-gold-50 p-4 text-sm leading-relaxed text-navy-900 ring-1 ring-gold-400">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          {t(
            'Prototype preview. Accounts are not connected, so nothing you enter is saved, checked, or signed in.',
            'نمونه آزمایشی. حساب‌ها وصل نشده‌اند، بنابراین چیزی که وارد می‌کنید ذخیره، بررسی یا وارد حساب نمی‌شود.',
          )}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div role="tablist" aria-label={t('Account options', 'گزینه‌های حساب')} className="flex rounded-full bg-slate-100 p-1">
          <button
            type="button"
            role="tab"
            id="tab-login"
            aria-selected={isLogin}
            aria-controls="auth-panel"
            onClick={() => setMode('login')}
            className={tabClass(isLogin)}
          >
            {t('Login', 'ورود')}
          </button>
          <button
            type="button"
            role="tab"
            id="tab-register"
            aria-selected={!isLogin}
            aria-controls="auth-panel"
            onClick={() => setMode('register')}
            className={tabClass(!isLogin)}
          >
            {t('Register', 'ثبت نام')}
          </button>
        </div>

        <div id="auth-panel" role="tabpanel" aria-labelledby={isLogin ? 'tab-login' : 'tab-register'} className="mt-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 text-center text-sm text-slate-600">
        <Link to="/account" className={buttonClasses('secondary', 'w-full sm:w-auto')}>
          {t('View the demo account dashboard', 'مشاهده داشبورد حساب نمونه')}
        </Link>
        <Link to="/products" className="font-semibold text-navy-900 underline-offset-4 hover:underline">
          {t('Continue browsing products', 'ادامه مرور محصولات')}
        </Link>
      </div>
    </div>
  );
}
