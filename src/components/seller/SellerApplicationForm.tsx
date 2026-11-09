import { useState } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { SelectField, TextAreaField, TextField } from '@/components/auth/AuthFields';
import { useFieldErrorText } from '@/components/auth/useFieldErrorText';
import { useCategories } from '@/catalog/useCategories';
import { PROVINCES } from '@/data/seller';
import { hasErrors, type FieldErrors } from '@/lib/authValidation';
import { validateApplication, MAX_APPLICATION_DESCRIPTION_LENGTH, type ApplicationField, type ApplicationFormValues } from '@/lib/sellerValidation';
import { useSellerData } from '@/seller/useSellerData';

interface SellerApplicationFormProps {
  initialValues: ApplicationFormValues;
}

export default function SellerApplicationForm({ initialValues }: SellerApplicationFormProps) {
  const { t, tx } = useLanguage();
  const { activeCategories } = useCategories();
  const categoryIds = activeCategories.map((category) => category.id);
  const { saveApplication } = useSellerData();
  const errorText = useFieldErrorText();
  const [values, setValues] = useState<ApplicationFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const errors: FieldErrors<ApplicationField> = submitted ? validateApplication(values, categoryIds) : {};
  const errorFor = (field: ApplicationField) => {
    const code = errors[field];
    return code ? errorText(code) : undefined;
  };

  const setField = <K extends ApplicationField>(field: K, value: ApplicationFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setResult(null);
  };

  const saveDraft = () => {
    saveApplication(values, 'draft');
    setResult(t('Draft saved. It has not been sent for review.', 'پیش‌نویس ذخیره شد. برای بررسی ارسال نشده است.'));
  };

  const submit = () => {
    setSubmitted(true);
    if (hasErrors(validateApplication(values, categoryIds))) return;
    saveApplication(values, 'submitted');
    setResult(
      t(
        'Application submitted (demo). Review is simulated, and no real team has received it.',
        'درخواست ارسال شد (نمونه). بررسی شبیه‌سازی می‌شود و هیچ تیم واقعی آن را دریافت نکرده است.',
      ),
    );
  };

  const provinceOptions = PROVINCES.map((province) => ({ value: province.id, label: tx(province.name) }));
  const categoryOptions = [
    { value: '' as const, label: t('Choose a category', 'یک دسته انتخاب کنید') },
    ...activeCategories.map((category) => ({ value: category.id, label: tx(category.name) })),
  ];

  return (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {submitted && hasErrors(errors) && (
        <p role="alert" className="rounded-xl bg-gold-50 p-4 text-sm font-semibold text-navy-900 ring-1 ring-gold-400">
          {t('Please fix the highlighted fields before submitting.', 'لطفاً بخش‌های مشخص‌شده را قبل از ارسال اصلاح کنید.')}
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="application-full-name"
          label={t('Full name', 'نام کامل')}
          autoComplete="name"
          value={values.fullName}
          onChange={(value) => setField('fullName', value)}
          error={errorFor('fullName')}
        />
        <TextField
          id="application-store-name"
          label={t('Store name', 'نام فروشگاه')}
          value={values.storeName}
          onChange={(value) => setField('storeName', value)}
          error={errorFor('storeName')}
        />
        <TextField
          id="application-phone"
          label={t('Phone', 'تلفن')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(value) => setField('phone', value)}
          error={errorFor('phone')}
        />
        <TextField
          id="application-email"
          label={t('Email', 'ایمیل')}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          error={errorFor('email')}
        />
      </div>

      <TextField
        id="application-address"
        label={t('Business address', 'آدرس کسب‌وکار')}
        value={values.businessAddress}
        onChange={(value) => setField('businessAddress', value)}
        error={errorFor('businessAddress')}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id="application-province"
          label={t('Province', 'ولایت')}
          value={values.provinceId}
          onChange={(value) => setField('provinceId', value)}
          options={[{ value: '', label: t('Choose a province', 'یک ولایت انتخاب کنید') }, ...provinceOptions]}
          error={errorFor('provinceId')}
        />
        <SelectField
          id="application-category"
          label={t('Main category', 'دسته اصلی')}
          value={values.categoryId}
          onChange={(value) => setField('categoryId', value)}
          options={categoryOptions}
          error={errorFor('categoryId')}
        />
      </div>

      <TextAreaField
        id="application-description"
        label={t('What do you sell?', 'چه چیزی می‌فروشید؟')}
        rows={4}
        value={values.description}
        onChange={(value) => setField('description', value)}
        error={errorFor('description')}
        hint={t(
          `Up to ${MAX_APPLICATION_DESCRIPTION_LENGTH} characters (${values.description.length} now).`,
          `تا ${MAX_APPLICATION_DESCRIPTION_LENGTH} حرف (اکنون ${values.description.length}).`,
        )}
      />

      {result && (
        <p role="status" className="rounded-xl bg-navy-50 p-4 text-sm font-semibold text-navy-900 ring-1 ring-navy-200">
          {result}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={saveDraft} className={buttonClasses('secondary')}>
          {t('Save draft', 'ذخیره پیش‌نویس')}
        </button>
        <button type="button" onClick={submit} className={buttonClasses('primary')}>
          {t('Submit application', 'ارسال درخواست')}
        </button>
      </div>
    </form>
  );
}
