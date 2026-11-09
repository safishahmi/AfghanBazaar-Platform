import { useContext } from 'react';
import { SellerAuthContext } from './sellerAuthContext';

export function useSellerAuth() {
  const context = useContext(SellerAuthContext);
  if (!context) throw new Error('useSellerAuth must be used inside SellerAuthProvider');
  return context;
}
