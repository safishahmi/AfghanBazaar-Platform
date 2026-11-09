import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { getProductById } from '@/lib/productQueries';
import { useLanguage } from '@/i18n/useLanguage';
import { useWishlist } from '@/wishlist/useWishlist';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/ui/PageHeader';
import ProductGrid from '@/components/product/ProductGrid';

export default function WishlistPage() {
  const { t } = useLanguage();
  const { productIds } = useWishlist();

  const products = useMemo(
    () =>
      productIds.flatMap((id) => {
        const product = getProductById(id);
        return product ? [product] : [];
      }),
    [productIds],
  );

  return (
    <>
      <PageHeader
        title={t('Wishlist', 'لیست علاقه‌مندی')}
        description={t(
          'Products you saved for later. The list is kept on this device.',
          'محصولاتی که برای بعداً ذخیره کرده‌اید. این لیست در همین دستگاه نگهداری می‌شود.',
        )}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            icon={Heart}
            title={t('Your wishlist is empty', 'لیست علاقه‌مندی شما خالی است')}
            description={t(
              'Tap the heart on any product to save it here.',
              'روی قلب هر محصول بزنید تا اینجا ذخیره شود.',
            )}
            action={
              <Link to="/products" className={buttonClasses('primary')}>
                {t('Browse products', 'مرور محصولات')}
              </Link>
            }
          />
        )}
      </div>
    </>
  );
}
