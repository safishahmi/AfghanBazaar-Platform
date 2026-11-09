import { useContext } from 'react';
import { SellerContext } from './sellerContext';

export function useSellerData() {
  const context = useContext(SellerContext);
  if (!context) throw new Error('useSellerData must be used inside SellerDataProvider');
  return context;
}
