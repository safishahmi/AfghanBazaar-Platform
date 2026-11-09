import { useState, type FormEvent } from 'react';
import { useAdminAccess } from '@/admin/useAdminAccess';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { useLanguage } from '@/i18n/useLanguage';

export default function AdminSignInForm() {
  const { t } = useLanguage();
  const { signIn } = useAdminAccess();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result === 'invalidCredentials') {
      setError(t('Email or password is incorrect.', 'ایمیل یا رمز عبور نادرست است.'));
    } else if (result === 'failed') {
      setError(t('Sign-in failed. Please try again.', 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-800">
          {t('Email', 'ایمیل')}
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-200"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-800">
          {t('Password', 'رمز عبور')}
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-200"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className={`${buttonClasses('primary')} w-full disabled:opacity-60`}>
        {submitting ? t('Signing in...', 'در حال ورود...') : t('Sign in', 'ورود')}
      </button>
    </form>
  );
}
