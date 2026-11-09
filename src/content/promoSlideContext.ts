import { createContext } from 'react';
import type { PromotionalSlide } from '@/types/admin';
import type { SlideDraft } from './promoSlideDraft';

export interface PromoSlideContextValue {
  slides: PromotionalSlide[];
  activeSlides: PromotionalSlide[];
  addSlide: (draft: SlideDraft) => void;
  updateSlide: (id: string, draft: SlideDraft) => void;
  setSlideActive: (id: string, active: boolean) => void;
  moveSlide: (id: string, direction: -1 | 1) => void;
}

export const PromoSlideContext = createContext<PromoSlideContextValue | null>(null);
