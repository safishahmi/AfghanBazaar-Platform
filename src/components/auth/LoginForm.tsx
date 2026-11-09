import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { hasErrors, validateLogin, type FieldErrors, type LoginValues } from '@/lib/authValidation';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { PasswordField, TextField } from './AuthFields';
import { useFieldErrorText } from './useFieldErrorText';

type LoginField = keyof LoginValues;

const EMPTY_VALUES: LoginValues = { identifier: '', password: '' };

export default function LoginForm() {
  const { t } = useLanguage();
  const errorText = useFieldErrorText();
  const [values, setValues] = useState<LoginValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({});
  const [submitted, setSubmitted] = useState(false);
  const [prototypeNoticeShown, setPrototypeNoticeShown] = useState(false);

  const updateField = (field: LoginField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateLogin(next));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setSubmitted(true);
    setErrors(nextErrors);
    setPrototypeNoticeShown(!hasErrors(nextErrors));
  };

  const hasFieldErrors = submitted && hasErrors(errors);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      {hasFieldErrors && (
        <p role="alert" className="rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-gold-400">
          {t('Please correct the highlighted fields.', 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.')}
        </p>
      )}

      <TextField
        id="login-identifier"
        label={t('Phone number or email', 'شماره تلفن یا ایمیل')}
        value={values.identifier}
        onChange={(value) => updateField('identifier', value)}
        autoComplete="username"
        inputMode="text"
        error={errors.identifier ? errorText(errors.identifier) : undefined}
      />

      <PasswordField
        id="login-password"
        label={t('Password', 'رمز عبور')}
        value={values.password}
        onChange={(value) => updateField('password', value)}
        autoComplete="current-password"
        error={errors.password ? errorText(errors.password) : undefined}
      />

      <button type="submit" className={buttonClasses('primary', 'w-full')}>
        {t('Login', 'ورود')}
      </button>

      {prototypeNoticeShown && (
        <p role="status" className="rounded-xl bg-navy-50 px-4 py-3 text-center text-sm leading-relaxed text-navy-900">
          {t(
            'Prototype only. Sign-in is not connected, so nothing was checked or signed in.',
            'فقط نمونه. ورود وصل نشده است، بنابراین چیزی بررسی یا وارد حساب نشد.',
          )}
        </p>
      )}
    </form>
  );
}
