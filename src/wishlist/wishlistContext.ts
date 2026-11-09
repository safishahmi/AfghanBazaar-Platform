import { createContext } from 'react';

export interface WishlistContextValue {
  productIds: string[];
  count: number;
  isSaved: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

export const WishlistContext = createContext<WishlistContextValue | null>(null);
