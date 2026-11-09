import { Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useWishlist } from '@/wishlist/useWishlist';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const { t } = useLanguage();
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(productId);
  const label = saved
    ? t('Remove from wishlist', 'حذف از لیست علاقه‌مندی')
    : t('Add to wishlist', 'افزودن به لیست علاقه‌مندی');

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:scale-110 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${saved ? 'fill-navy-900 text-navy-900' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}
