import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { useWishlist } from '@/wishlist/useWishlist';
import { getProductById } from '@/lib/productQueries';
import Link from '@/router/Link';
import AccountShell from '@/components/account/AccountShell';
import EmptyState from '@/components/ui/EmptyState';
import ProductGrid from '@/components/product/ProductGrid';
import { buttonClasses } from '@/components/ui/buttonStyles';

export default function AccountWishlistPage() {
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
    <AccountShell
      title={t('Wishlist', 'لیست علاقه‌مندی')}
      description={t('Products you saved on this device.', 'محصولاتی که در همین دستگاه ذخیره کرده‌اید.')}
    >
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          icon={Heart}
          title={t('Your wishlist is empty', 'لیست علاقه‌مندی شما خالی است')}
          description={t('Tap the heart on any product to save it here.', 'روی قلب هر محصول بزنید تا اینجا ذخیره شود.')}
          action={
            <Link to="/products" className={buttonClasses('primary')}>
              {t('Browse products', 'مرور محصولات')}
            </Link>
          }
        />
      )}
    </AccountShell>
  );
}
