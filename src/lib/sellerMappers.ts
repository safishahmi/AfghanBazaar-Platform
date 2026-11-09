import type { CategoryId } from '@/types/marketplace';
import type { SellerApplication, SellerProduct, SellerProductStatus } from '@/types/seller';
import type { ApplicationFormValues, ProductFormValues } from '@/lib/sellerValidation';

export function applicationToFormValues(application: SellerApplication): ApplicationFormValues {
  return {
    fullName: application.fullName,
    storeName: application.storeName,
    phone: application.phone,
    email: application.email,
    businessAddress: application.businessAddress,
    provinceId: application.provinceId,
    categoryId: application.categoryId,
    description: application.description,
  };
}

export function emptyProductFormValues(): ProductFormValues {
  return {
    nameDari: '',
    nameEnglish: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    sellingPrice: '',
    discountPrice: '',
    quantity: '',
    condition: 'new',
    brand: '',
    sku: '',
    shippingMethod: 'seller',
  };
}

export function productToFormValues(product: SellerProduct): ProductFormValues {
  return {
    nameDari: product.name.prs,
    nameEnglish: product.name.en,
    description: product.description,
    categoryId: product.categoryId,
    imageUrl: product.imageUrl,
    sellingPrice: String(product.sellingPrice),
    discountPrice: product.discountPrice === null ? '' : String(product.discountPrice),
    quantity: String(product.quantity),
    condition: product.condition,
    brand: product.brand ?? '',
    sku: product.sku,
    shippingMethod: product.shippingMethod,
  };
}

interface ProductIdentity {
  id: string;
  sellerId: string;
  status: SellerProductStatus;
}

// Expects values that already passed validateProduct.
export function productFromFormValues(values: ProductFormValues, identity: ProductIdentity, updatedAt: string): SellerProduct {
  const brand = values.brand.trim();
  const discount = values.discountPrice.trim();
  return {
    id: identity.id,
    sellerId: identity.sellerId,
    name: { en: values.nameEnglish.trim(), prs: values.nameDari.trim() },
    description: values.description.trim(),
    categoryId: values.categoryId as CategoryId,
    imageUrl: values.imageUrl,
    sellingPrice: Number(values.sellingPrice),
    discountPrice: discount ? Number(discount) : null,
    quantity: Number(values.quantity),
    condition: values.condition,
    brand: brand || null,
    sku: values.sku.trim().toUpperCase(),
    shippingMethod: values.shippingMethod,
    status: identity.status,
    updatedAt,
  };
}
