import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { usePromoSlides } from '@/content/usePromoSlides';
import PromoSlideView from './PromoSlideView';

const AUTOPLAY_INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const CONTROL_BUTTON =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-navy-900 shadow-md transition-colors duration-200 hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900';

export default function PromotionalHeroSlider() {
  const { t, isRtl } = useLanguage();
  const { activeSlides: slides } = usePromoSlides();
  const count = slides.length;

  const [storedIndex, setIndex] = useState(0);
  const index = storedIndex < count ? storedIndex : 0;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const autoplayActive = count > 1 && !userPaused && !hovered && !focused && !prefersReducedMotion;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoplayActive, count, index]);

  if (count === 0) return null;

  const goTo = (target: number) => setIndex(((target % count) + count) % count);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
  const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === nextKey) {
      event.preventDefault();
      goNext();
    } else if (event.key === prevKey) {
      event.preventDefault();
      goPrev();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    const swipedToNext = isRtl ? delta > 0 : delta < 0;
    if (swipedToNext) goNext();
    else goPrev();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t('Promotions', 'پیشنهادهای ویژه')}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[500px] overflow-hidden rounded-3xl bg-navy-900 text-white shadow-xl sm:h-[480px] lg:h-[520px]"
    >
      <div aria-live={autoplayActive ? 'off' : 'polite'} className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <PromoSlideView
            key={slide.id}
            slide={slide}
            index={slideIndex}
            total={count}
            active={slideIndex === index}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-4 pb-4 sm:px-12 sm:pb-6 lg:px-16">
        <div className="flex items-center gap-2">
          <button type="button" onClick={goPrev} aria-label={t('Previous slide', 'اسلاید قبلی')} className={CONTROL_BUTTON}>
            <PrevIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={goNext} aria-label={t('Next slide', 'اسلاید بعدی')} className={CONTROL_BUTTON}>
            <NextIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {slides.map((slide, slideIndex) => {
            const isCurrent = slideIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={t(`Go to slide ${slideIndex + 1}`, `رفتن به اسلاید ${slideIndex + 1}`)}
                aria-current={isCurrent ? 'true' : undefined}
                className="flex h-8 items-center rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    isCurrent ? 'w-8 bg-gold-400' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setUserPaused((paused) => !paused)}
          aria-pressed={userPaused}
          aria-label={userPaused ? t('Play slideshow', 'پخش اسلایدها') : t('Pause slideshow', 'توقف اسلایدها')}
          className={CONTROL_BUTTON}
        >
          {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
