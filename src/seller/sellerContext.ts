import { createContext } from 'react';
import type { ApplicationFormValues, ProductFormValues } from '@/lib/sellerValidation';
import type { SellerApplication, SellerApplicationStatus, SellerOrder, SellerProduct, SellerProductStatus, SellerStore } from '@/types/seller';

export interface SellerContextValue {
  store: SellerStore;
  application: SellerApplication;
  products: SellerProduct[];
  orders: SellerOrder[];
  saveApplication: (values: ApplicationFormValues, status: Extract<SellerApplicationStatus, 'draft' | 'submitted'>) => void;
  addProduct: (values: ProductFormValues, status: Extract<SellerProductStatus, 'draft' | 'pending_review'>) => string;
  updateProduct: (productId: string, values: ProductFormValues, status: Extract<SellerProductStatus, 'draft' | 'pending_review'>) => void;
  setProductStatus: (productId: string, status: SellerProductStatus) => void;
  setQuantity: (productId: string, quantity: number) => void;
  advanceOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
}

export const SellerContext = createContext<SellerContextValue | null>(null);
