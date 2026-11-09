import { useMemo, useState, type ReactNode } from 'react';
import { getPromoSlides } from '@/data/promotions';
import { CAMPAIGN_TYPE_TEXT } from '@/data/adminLabels';
import { makeUniqueSlug } from '@/lib/ids';
import type { PromotionalSlide } from '@/types/admin';
import { PromoSlideContext, type PromoSlideContextValue } from './promoSlideContext';
import type { SlideDraft } from './promoSlideDraft';

const SEED_SLIDES: PromotionalSlide[] = getPromoSlides().map((slide, index) => ({
  ...slide,
  displayOrder: index + 1,
  active: true,
}));

function sortByOrder(slides: PromotionalSlide[]): PromotionalSlide[] {
  return [...slides].sort((a, b) => a.displayOrder - b.displayOrder);
}

export default function PromoSlideProvider({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState<PromotionalSlide[]>(SEED_SLIDES);

  const value = useMemo<PromoSlideContextValue>(() => {
    const ordered = sortByOrder(slides);
    return {
      slides: ordered,
      activeSlides: ordered.filter((slide) => slide.active),
      addSlide: (draft: SlideDraft) =>
        setSlides((current) => [
          ...current,
          {
            id: makeUniqueSlug(draft.title.en, current.map((slide) => slide.id)),
            kind: draft.kind,
            eyebrow: CAMPAIGN_TYPE_TEXT[draft.kind],
            title: draft.title,
            text: draft.text,
            imageUrl: draft.imageUrl,
            imageAlt: draft.title,
            cta: draft.cta,
            displayOrder: current.length + 1,
            active: true,
          },
        ]),
      updateSlide: (id, draft) =>
        setSlides((current) =>
          current.map((slide) =>
            slide.id === id
              ? {
                  ...slide,
                  kind: draft.kind,
                  eyebrow: CAMPAIGN_TYPE_TEXT[draft.kind],
                  title: draft.title,
                  text: draft.text,
                  imageUrl: draft.imageUrl,
                  imageAlt: draft.title,
                  cta: draft.cta,
                }
              : slide,
          ),
        ),
      setSlideActive: (id, active) =>
        setSlides((current) => current.map((slide) => (slide.id === id ? { ...slide, active } : slide))),
      moveSlide: (id, direction) =>
        setSlides((current) => {
          const ordered = sortByOrder(current);
          const index = ordered.findIndex((slide) => slide.id === id);
          const target = index + direction;
          if (index < 0 || target < 0 || target >= ordered.length) return current;
          [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
          return ordered.map((slide, position) => ({ ...slide, displayOrder: position + 1 }));
        }),
    };
  }, [slides]);

  return <PromoSlideContext.Provider value={value}>{children}</PromoSlideContext.Provider>;
}
