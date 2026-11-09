import type { PromoSlide, PromoSlideKind } from '@/types/promotions';
import type { LocalizedText } from '@/types/marketplace';

export interface SlideDraft {
  kind: PromoSlideKind;
  title: LocalizedText;
  text: LocalizedText;
  imageUrl: string;
  cta: PromoSlide['cta'];
}
