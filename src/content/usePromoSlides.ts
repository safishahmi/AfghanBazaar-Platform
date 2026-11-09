import { useContext } from 'react';
import { PromoSlideContext } from './promoSlideContext';

export function usePromoSlides() {
  const context = useContext(PromoSlideContext);
  if (!context) throw new Error('usePromoSlides must be used inside PromoSlideProvider');
  return context;
}
