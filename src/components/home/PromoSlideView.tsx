import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import type { PromoSlide } from '@/types/promotions';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import DemoBadge from '@/components/ui/DemoBadge';

interface PromoSlideViewProps {
  slide: PromoSlide;
  index: number;
  total: number;
  active: boolean;
}

export default function PromoSlideView({ slide, index, total, active }: PromoSlideViewProps) {
  const { t, tx, isRtl } = useLanguage();
  const isFirst = index === 0;
  const Heading = isFirst ? 'h1' : 'h2';
  const overlayDirection = isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r';

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={t(`Slide ${index + 1} of ${total}`, `اسلاید ${index + 1} از ${total}`)}
      className={`absolute inset-0 transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none ${
        active ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <img
        src={slide.imageUrl}
        alt={tx(slide.imageAlt)}
        loading={isFirst ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className={`absolute inset-0 ${overlayDirection} from-navy-950/95 via-navy-900/75 to-navy-900/10`}
        aria-hidden="true"
      />
      <div className="absolute end-4 top-4 sm:end-6 sm:top-6">
        <DemoBadge />
      </div>

      <div className="relative flex h-full max-w-2xl flex-col justify-center gap-4 px-6 pb-28 pt-14 sm:px-12 sm:pb-28 lg:px-16">
        <span className="inline-flex w-fit items-center rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-900">
          {tx(slide.eyebrow)}
        </span>
        <Heading className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {tx(slide.title)}
        </Heading>
        <p className="max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">{tx(slide.text)}</p>

        {slide.price && (
          <div className="flex flex-wrap items-center gap-3 text-white">
            <span className="text-2xl font-bold sm:text-3xl">{formatAfn(slide.price.current)}</span>
            {slide.price.previous !== undefined && (
              <span className="text-sm text-white/75 line-through">
                <span className="sr-only">{t('Previous price: ', 'قیمت قبلی: ')}</span>
                {formatAfn(slide.price.previous)}
              </span>
            )}
            {slide.price.discountPercent !== null && (
              <span className="rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-900">
                -{slide.price.discountPercent}%
              </span>
            )}
          </div>
        )}

        <div>
          <Link to={slide.cta.to} className={buttonClasses('accent', 'px-6 py-3')}>
            {tx(slide.cta.label)}
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
