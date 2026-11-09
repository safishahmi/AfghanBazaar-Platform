import { useLanguage } from '@/i18n/useLanguage';
import { PASSWORD_MIN_LENGTH, type FieldErrorCode } from '@/lib/authValidation';

export function useFieldErrorText() {
  const { t } = useLanguage();
  return (code: FieldErrorCode): string => {
    switch (code) {
      case 'required':
        return t('This field is required.', 'این فیلد الزامی است.');
      case 'invalidPhone':
        return t('Enter a valid phone number, for example +93 70 000 0000.', 'شماره تلفن معتبر وارد کنید، مثلاً +93 70 000 0000.');
      case 'invalidEmail':
        return t('Enter a valid email address.', 'یک آدرس ایمیل معتبر وارد کنید.');
      case 'passwordShort':
        return t(`Use at least ${PASSWORD_MIN_LENGTH} characters.`, `حداقل ${PASSWORD_MIN_LENGTH} حرف یا رقم استفاده کنید.`);
      case 'passwordMismatch':
        return t('The passwords do not match.', 'رمزهای عبور یکسان نیستند.');
      case 'positive':
        return t('Enter an amount greater than zero.', 'مقداری بزرگ‌تر از صفر وارد کنید.');
      case 'nonNegative':
        return t('Enter zero or a positive number.', 'صفر یا عدد مثبت وارد کنید.');
      case 'integer':
        return t('Enter a whole number.', 'یک عدد صحیح وارد کنید.');
      case 'discountTooHigh':
        return t('The discount price must be lower than the selling price.', 'قیمت تخفیف باید از قیمت فروش کمتر باشد.');
      case 'skuFormat':
        return t('Use 3 to 20 letters, numbers, or dashes.', 'از ۳ تا ۲۰ حرف، عدد یا خط تیره استفاده کنید.');
      case 'tooLong':
        return t('This text is too long.', 'این متن خیلی طولانی است.');
    }
  };
}
