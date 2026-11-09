export const PASSWORD_MIN_LENGTH = 8;

export type FieldErrorCode =
  | 'required'
  | 'invalidPhone'
  | 'invalidEmail'
  | 'passwordShort'
  | 'passwordMismatch'
  | 'positive'
  | 'nonNegative'
  | 'integer'
  | 'discountTooHigh'
  | 'skuFormat'
  | 'tooLong';

export type FieldErrors<Field extends string> = Partial<Record<Field, FieldErrorCode>>;

export interface LoginValues {
  identifier: string;
  password: string;
}

export interface RegistrationValues {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PHONE_PATTERN = /^\+?\d{9,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailAddress(value: string): boolean {
  return value.includes('@');
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value.replace(/[\s-]/g, ''));
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function validateLogin({ identifier, password }: LoginValues): FieldErrors<keyof LoginValues> {
  const errors: FieldErrors<keyof LoginValues> = {};
  const trimmed = identifier.trim();

  if (!trimmed) {
    errors.identifier = 'required';
  } else if (isEmailAddress(trimmed)) {
    if (!isValidEmail(trimmed)) errors.identifier = 'invalidEmail';
  } else if (!isValidPhone(trimmed)) {
    errors.identifier = 'invalidPhone';
  }

  if (!password) errors.password = 'required';

  return errors;
}

export function validateRegistration(values: RegistrationValues): FieldErrors<keyof RegistrationValues> {
  const errors: FieldErrors<keyof RegistrationValues> = {};

  if (!values.fullName.trim()) errors.fullName = 'required';

  if (!values.phone.trim()) {
    errors.phone = 'required';
  } else if (!isValidPhone(values.phone.trim())) {
    errors.phone = 'invalidPhone';
  }

  const email = values.email.trim();
  if (email && !isValidEmail(email)) errors.email = 'invalidEmail';

  if (!values.password) {
    errors.password = 'required';
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = 'passwordShort';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'passwordMismatch';
  }

  return errors;
}

export function hasErrors(errors: Partial<Record<string, FieldErrorCode>>): boolean {
  return Object.keys(errors).length > 0;
}
