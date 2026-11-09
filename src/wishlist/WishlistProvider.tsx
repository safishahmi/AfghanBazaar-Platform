import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadStoredValue, saveStoredValue } from '@/lib/storage';
import { WishlistContext, type WishlistContextValue } from './wishlistContext';

const STORAGE_KEY = 'afghanbazaar-wishlist';

function parseWishlist(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.filter((id): id is string => typeof id === 'string');
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() =>
    loadStoredValue(STORAGE_KEY, parseWishlist, []),
  );

  useEffect(() => {
    saveStoredValue(STORAGE_KEY, productIds);
  }, [productIds]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      productIds,
      count: productIds.length,
      isSaved: (productId) => productIds.includes(productId),
      toggle: (productId) => {
        setProductIds((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        );
      },
    }),
    [productIds],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
