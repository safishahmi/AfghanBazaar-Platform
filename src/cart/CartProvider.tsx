import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadStoredValue, saveStoredValue } from '@/lib/storage';
import { CartContext, MAX_CART_QUANTITY, type CartContextValue, type CartItem } from './cartContext';

const STORAGE_KEY = 'afghanbazaar-cart';

function clampQuantity(quantity: number): number {
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(quantity)));
}

function parseCart(raw: unknown): CartItem[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.flatMap((entry): CartItem[] => {
    if (typeof entry !== 'object' || entry === null) return [];
    const { productId, quantity } = entry as Record<string, unknown>;
    if (typeof productId !== 'string' || typeof quantity !== 'number' || !Number.isFinite(quantity)) return [];
    return [{ productId, quantity: clampQuantity(quantity) }];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadStoredValue(STORAGE_KEY, parseCart, []));

  useEffect(() => {
    saveStoredValue(STORAGE_KEY, items);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (productId, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (!existing) return [...current, { productId, quantity: clampQuantity(quantity) }];
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
              : item,
          );
        });
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current.map((item) =>
            item.productId === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        );
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
