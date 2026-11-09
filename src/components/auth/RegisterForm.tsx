import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import {
  hasErrors,
  validateRegistration,
  type FieldErrors,
  type RegistrationValues,
} from '@/lib/authValidation';
import type { Lang } from '@/types/marketplace';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { PasswordField, SelectField, TextField } from './AuthFields';
import { useFieldErrorText } from './useFieldErrorText';

type RegistrationField = keyof RegistrationValues;

interface RegistrationFormValues extends RegistrationValues {
  preferredLang: Lang;
}

export default function RegisterForm() {
  const { t, lang } = useLanguage();
  const errorText = useFieldErrorText();
  const [values, setValues] = useState<RegistrationFormValues>({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
    preferredLang: lang,
  });
  const [errors, setErrors] = useState<FieldErrors<RegistrationField>>({});
  const [submitted, setSubmitted] = useState(false);
  const [prototypeNoticeShown, setPrototypeNoticeShown] = useState(false);

  const updateField = <K extends keyof RegistrationFormValues>(field: K, value: RegistrationFormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateRegistration(next));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRegistration(values);
    const valid = !hasErrors(nextErrors);
    setSubmitted(true);
    setErrors(nextErrors);
    setPrototypeNoticeShown(valid);
    if (valid) setValues((current) => ({ ...current, password: '', passwordConfirm: '' }));
  };

  const hasFieldErrors = submitted && hasErrors(errors);

  const languageOptions: { value: Lang; label: string }[] = [
    { value: 'prs', label: 'دری' },
    { value: 'en', label: 'English' },
  ];

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      {hasFieldErrors && (
        <p role="alert" className="rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-gold-400">
          {t('Please correct the highlighted fields.', 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.')}
        </p>
      )}

      <TextField
        id="register-name"
        label={t('Full name', 'نام کامل')}
        value={values.fullName}
        onChange={(value) => updateField('fullName', value)}
        autoComplete="name"
        error={errors.fullName ? errorText(errors.fullName) : undefined}
      />

      <TextField
        id="register-phone"
        label={t('Phone number', 'شماره تلفن')}
        type="tel"
        inputMode="tel"
        value={values.phone}
        onChange={(value) => updateField('phone', value)}
        autoComplete="tel"
        hint={t('Include the country code, for example +93.', 'کد کشور را وارد کنید، مثلاً +93.')}
        error={errors.phone ? errorText(errors.phone) : undefined}
      />

      <TextField
        id="register-email"
        label={t('Email (optional)', 'ایمیل (اختیاری)')}
        type="email"
        inputMode="email"
        value={values.email}
        onChange={(value) => updateField('email', value)}
        autoComplete="email"
        error={errors.email ? errorText(errors.email) : undefined}
      />

      <PasswordField
        id="register-password"
        label={t('Password', 'رمز عبور')}
        value={values.password}
        onChange={(value) => updateField('password', value)}
        autoComplete="new-password"
        error={errors.password ? errorText(errors.password) : undefined}
      />

      <PasswordField
        id="register-password-confirm"
        label={t('Confirm password', 'تکرار رمز عبور')}
        value={values.passwordConfirm}
        onChange={(value) => updateField('passwordConfirm', value)}
        autoComplete="new-password"
        error={errors.passwordConfirm ? errorText(errors.passwordConfirm) : undefined}
      />

      <SelectField
        id="register-language"
        label={t('Preferred language', 'زبان ترجیحی')}
        value={values.preferredLang}
        onChange={(value) => updateField('preferredLang', value)}
        options={languageOptions}
      />

      <button type="submit" className={buttonClasses('primary', 'w-full')}>
        {t('Create account', 'ایجاد حساب')}
      </button>

      {prototypeNoticeShown && (
        <p role="status" className="rounded-xl bg-navy-50 px-4 py-3 text-center text-sm leading-relaxed text-navy-900">
          {t(
            'Prototype only. No account was created and your password was not saved. Real registration is not connected yet.',
            'فقط نمونه. هیچ حسابی ساخته نشد و رمز عبور شما ذخیره نشد. ثبت‌نام واقعی هنوز وصل نشده است.',
          )}
        </p>
      )}
    </form>
  );
}
