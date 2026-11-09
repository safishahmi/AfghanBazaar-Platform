import { isValidEmail, PASSWORD_MIN_LENGTH, type FieldErrors } from '@/lib/authValidation';

export interface SellerSignInValues {
  email: string;
  password: string;
}

export interface SellerSignUpValues extends SellerSignInValues {
  passwordConfirm: string;
}

export type SellerSignInField = keyof SellerSignInValues;
export type SellerSignUpField = keyof SellerSignUpValues;

export function validateSellerSignIn(values: SellerSignInValues): FieldErrors<SellerSignInField> {
  const errors: FieldErrors<SellerSignInField> = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = 'required';
  } else if (!isValidEmail(email)) {
    errors.email = 'invalidEmail';
  }

  if (!values.password) errors.password = 'required';

  return errors;
}

export function validateSellerSignUp(values: SellerSignUpValues): FieldErrors<SellerSignUpField> {
  const errors: FieldErrors<SellerSignUpField> = { ...validateSellerSignIn(values) };

  if (values.password && values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = 'passwordShort';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'passwordMismatch';
  }

  return errors;
}
