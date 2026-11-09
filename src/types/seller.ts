import type { CategoryId, LocalizedText } from './marketplace';

export type FulfilmentMethod = 'seller' | 'afghanbazaar';

export type SellerApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';

export type ProductCondition = 'new' | 'like_new' | 'used';

export type SellerProductStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'inactive';

export type SellerStockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type SellerOrderStatus =
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_dispatch'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'paid' | 'cash_on_delivery_due';

export interface SellerStore {
  id: string;
  sellerId: string;
  name: LocalizedText;
  description: LocalizedText;
  provinceId: string;
  address: string;
  primaryCategoryId: CategoryId | '';
}

export interface SellerApplication {
  id: string;
  status: SellerApplicationStatus;
  fullName: string;
  storeName: string;
  phone: string;
  email: string;
  businessAddress: string;
  provinceId: string;
  categoryId: CategoryId | '';
  description: string;
}

export interface SellerProduct {
  id: string;
  sellerId: string;
  name: LocalizedText;
  description: string;
  categoryId: CategoryId;
  imageUrl: string;
  sellingPrice: number;
  discountPrice: number | null;
  quantity: number;
  condition: ProductCondition;
  brand: string | null;
  sku: string;
  shippingMethod: FulfilmentMethod;
  status: SellerProductStatus;
  updatedAt: string;
}

export interface SellerOrderLine {
  productId: string;
  name: LocalizedText;
  unitPrice: number;
  quantity: number;
}

export interface SellerOrder {
  id: string;
  sellerId: string;
  placedAt: string;
  status: SellerOrderStatus;
  paymentStatus: PaymentStatus;
  fulfilment: FulfilmentMethod;
  customerName: string;
  customerPhone: string;
  customerArea: LocalizedText;
  items: SellerOrderLine[];
}

export interface FulfilmentOption {
  id: FulfilmentMethod;
  title: LocalizedText;
  description: LocalizedText;
  feePerOrder: number | null;
}
