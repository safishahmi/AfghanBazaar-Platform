import type { LocalizedText } from '@/types/marketplace';

export type PromoSlideKind = 'seasonal' | 'discount' | 'featured' | 'official' | 'announcement';

interface PromoSlideBase {
  id: string;
  kind: PromoSlideKind;
  eyebrow: LocalizedText;
  text: LocalizedText;
  cta: { label: LocalizedText; to: string };
}

export interface ImagePromoSlide extends PromoSlideBase {
  source: 'image';
  title: LocalizedText;
  imageUrl: string;
  imageAlt: LocalizedText;
}

export interface ProductPromoSlide extends PromoSlideBase {
  source: 'product';
  productId: string;
}

export type PromoSlideConfig = ImagePromoSlide | ProductPromoSlide;

export interface PromoSlide {
  id: string;
  kind: PromoSlideKind;
  eyebrow: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  imageUrl: string;
  imageAlt: LocalizedText;
  cta: { label: LocalizedText; to: string };
  price?: { current: number; previous?: number; discountPercent: number | null };
}
