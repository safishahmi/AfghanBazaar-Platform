import { createContext } from 'react';

export const MAX_CART_QUANTITY = 99;

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
