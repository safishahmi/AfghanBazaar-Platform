import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { hasErrors, type FieldErrors } from '@/lib/authValidation';
import { validateSellerSignIn, validateSellerSignUp, type SellerSignUpValues } from '@/lib/sellerAuthValidation';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { PasswordField, TextField } from '@/components/auth/AuthFields';
import { useFieldErrorText } from '@/components/auth/useFieldErrorText';
import { useSellerAuth } from '@/seller/useSellerAuth';
import type { SignInOutcome, SignUpOutcome } from '@/seller/sellerAuthContext';

type AuthMode = 'signIn' | 'signUp';

const EMPTY_VALUES: SellerSignUpValues = { email: '', password: '', passwordConfirm: '' };

export default function SellerAuthForm() {
  const { t } = useLanguage();
  const errorText = useFieldErrorText();
  const { signIn, signUp } = useSellerAuth();
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [values, setValues] = useState<SellerSignUpValues>(EMPTY_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const errors: FieldErrors<keyof SellerSignUpValues> = submitted
    ? mode === 'signIn'
      ? validateSellerSignIn(values)
      : validateSellerSignUp(values)
    : {};

  const errorFor = (field: keyof SellerSignUpValues) => {
    const code = errors[field];
    return code ? errorText(code) : undefined;
  };

  const setField = (field: keyof SellerSignUpValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setNotice(null);
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setSubmitted(false);
    setNotice(null);
  };

  const signInMessage = (outcome: SignInOutcome): string | null => {
    if (outcome === 'invalidCredentials') return t('Email or password is not correct.', 'ایمیل یا رمز عبور درست نیست.');
    if (outcome === 'failed') return t('Something went wrong. Please try again.', 'مشکلی پیش آمد. دوباره تلاش کنید.');
    return null;
  };

  const signUpMessage = (outcome: SignUpOutcome): string | null => {
    if (outcome === 'alreadyRegistered') {
      return t('An account with this email already exists. Sign in instead.', 'حسابی با این ایمیل وجود دارد. لطفاً وارد شوید.');
    }
    if (outcome === 'confirmationRequired') {
      return t('Check your email to confirm your account, then sign in.', 'ایمیل خود را برای تأیید حساب بررسی کنید، سپس وارد شوید.');
    }
    if (outcome === 'failed') return t('Something went wrong. Please try again.', 'مشکلی پیش آمد. دوباره تلاش کنید.');
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = mode === 'signIn' ? validateSellerSignIn(values) : validateSellerSignUp(values);
    if (hasErrors(nextErrors)) return;

    setPending(true);
    setNotice(null);
    const email = values.email.trim();
    if (mode === 'signIn') {
      setNotice(signInMessage(await signIn(email, values.password)));
    } else {
      setNotice(signUpMessage(await signUp(email, values.password)));
    }
    setPending(false);
  };

  const modeButtonClass = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
      active ? 'bg-navy-900 text-white' : 'text-slate-700 hover:text-navy-900'
    }`;

  return (
    <div className="space-y-6">
      <div role="group" aria-label={t('Account action', 'نوع ورود')} className="flex gap-1 rounded-xl bg-slate-100 p-1">
        <button type="button" aria-pressed={mode === 'signIn'} onClick={() => switchMode('signIn')} className={modeButtonClass(mode === 'signIn')}>
          {t('Sign in', 'ورود')}
        </button>
        <button type="button" aria-pressed={mode === 'signUp'} onClick={() => switchMode('signUp')} className={modeButtonClass(mode === 'signUp')}>
          {t('Create account', 'ایجاد حساب')}
        </button>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        {submitted && hasErrors(errors) && (
          <p role="alert" className="rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-gold-400">
            {t('Please correct the highlighted fields.', 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.')}
          </p>
        )}

        <TextField
          id="seller-auth-email"
          label={t('Email', 'ایمیل')}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          error={errorFor('email')}
        />

        <PasswordField
          id="seller-auth-password"
          label={t('Password', 'رمز عبور')}
          autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
          value={values.password}
          onChange={(value) => setField('password', value)}
          error={errorFor('password')}
        />

        {mode === 'signUp' && (
          <PasswordField
            id="seller-auth-password-confirm"
            label={t('Confirm password', 'تکرار رمز عبور')}
            autoComplete="new-password"
            value={values.passwordConfirm}
            onChange={(value) => setField('passwordConfirm', value)}
            error={errorFor('passwordConfirm')}
          />
        )}

        <button type="submit" disabled={pending} className={buttonClasses('primary', 'w-full')}>
          {mode === 'signIn' ? t('Sign in', 'ورود') : t('Create account', 'ایجاد حساب')}
        </button>

        {notice && (
          <p role="status" className="rounded-xl bg-navy-50 px-4 py-3 text-center text-sm leading-relaxed text-navy-900">
            {notice}
          </p>
        )}
      </form>
    </div>
  );
}
