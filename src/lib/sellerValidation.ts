import { PROVINCES } from '@/data/seller';
import { isValidEmail, isValidPhone, type FieldErrors } from '@/lib/authValidation';
import type { CategoryId } from '@/types/marketplace';
import type { FulfilmentMethod, ProductCondition } from '@/types/seller';

export interface ProductFormValues {
  nameDari: string;
  nameEnglish: string;
  description: string;
  categoryId: CategoryId | '';
  imageUrl: string;
  sellingPrice: string;
  discountPrice: string;
  quantity: string;
  condition: ProductCondition;
  brand: string;
  sku: string;
  shippingMethod: FulfilmentMethod;
}

export interface ApplicationFormValues {
  fullName: string;
  storeName: string;
  phone: string;
  email: string;
  businessAddress: string;
  provinceId: string;
  categoryId: CategoryId | '';
  description: string;
}

export type ProductField = keyof ProductFormValues;
export type ApplicationField = keyof ApplicationFormValues;

export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_APPLICATION_DESCRIPTION_LENGTH = 300;

const SKU_PATTERN = /^[A-Za-z0-9-]{3,20}$/;

function parseNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return Number(trimmed);
}

export function validateProduct(values: ProductFormValues, categoryIds: readonly string[]): FieldErrors<ProductField> {
  const errors: FieldErrors<ProductField> = {};

  if (!values.nameDari.trim()) errors.nameDari = 'required';
  if (!values.nameEnglish.trim()) errors.nameEnglish = 'required';

  const description = values.description.trim();
  if (!description) {
    errors.description = 'required';
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = 'tooLong';
  }

  if (!categoryIds.includes(values.categoryId)) errors.categoryId = 'required';
  if (!values.imageUrl) errors.imageUrl = 'required';

  const price = parseNumber(values.sellingPrice);
  if (price === null) {
    errors.sellingPrice = 'required';
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.sellingPrice = 'positive';
  }

  const discount = parseNumber(values.discountPrice);
  if (discount !== null) {
    if (!Number.isFinite(discount) || discount < 0) {
      errors.discountPrice = 'nonNegative';
    } else if (price !== null && Number.isFinite(price) && discount >= price) {
      errors.discountPrice = 'discountTooHigh';
    }
  }

  const quantity = parseNumber(values.quantity);
  if (quantity === null) {
    errors.quantity = 'required';
  } else if (!Number.isFinite(quantity) || quantity < 0) {
    errors.quantity = 'nonNegative';
  } else if (!Number.isInteger(quantity)) {
    errors.quantity = 'integer';
  }

  if (!values.sku.trim()) {
    errors.sku = 'required';
  } else if (!SKU_PATTERN.test(values.sku.trim())) {
    errors.sku = 'skuFormat';
  }

  return errors;
}

export function validateApplication(values: ApplicationFormValues, categoryIds: readonly string[]): FieldErrors<ApplicationField> {
  const errors: FieldErrors<ApplicationField> = {};

  if (!values.fullName.trim()) errors.fullName = 'required';
  if (!values.storeName.trim()) errors.storeName = 'required';

  if (!values.phone.trim()) {
    errors.phone = 'required';
  } else if (!isValidPhone(values.phone.trim())) {
    errors.phone = 'invalidPhone';
  }

  if (!values.email.trim()) {
    errors.email = 'required';
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = 'invalidEmail';
  }

  if (!values.businessAddress.trim()) errors.businessAddress = 'required';
  if (!PROVINCES.some((province) => province.id === values.provinceId)) errors.provinceId = 'required';
  if (!categoryIds.includes(values.categoryId)) errors.categoryId = 'required';

  const description = values.description.trim();
  if (!description) {
    errors.description = 'required';
  } else if (description.length > MAX_APPLICATION_DESCRIPTION_LENGTH) {
    errors.description = 'tooLong';
  }

  return errors;
}
