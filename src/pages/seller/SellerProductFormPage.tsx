import { useLanguage } from '@/i18n/useLanguage';
import SellerShell from '@/components/seller/SellerShell';
import ProductForm from '@/components/seller/ProductForm';
import SellerEmptyState from '@/components/seller/SellerEmptyState';
import { emptyProductFormValues, productToFormValues } from '@/lib/sellerMappers';
import { useSellerData } from '@/seller/useSellerData';

interface SellerProductFormPageProps {
  productId?: string;
}

export default function SellerProductFormPage({ productId }: SellerProductFormPageProps) {
  const { t } = useLanguage();
  const { products } = useSellerData();

  if (!productId) {
    return (
      <SellerShell
        title={t('Add product', 'افزودن محصول')}
        description={t('Create a listing for your store. It is saved to your account and not yet shown on the public store.', 'یک آگهی برای فروشگاه خود بسازید. در حساب شما ذخیره می‌شود و هنوز در فروشگاه عمومی نمایش داده نمی‌شود.')}
      >
        <ProductForm initialValues={emptyProductFormValues()} />
      </SellerShell>
    );
  }

  const product = products.find((item) => item.id === productId);
  if (!product) {
    return (
      <SellerShell title={t('Product not found', 'محصول پیدا نشد')}>
        <SellerEmptyState
          title={t('This product is not in your store.', 'این محصول در فروشگاه شما نیست.')}
          message={t('It may have been removed, or the link is out of date.', 'ممکن است حذف شده باشد یا پیوند قدیمی باشد.')}
        />
      </SellerShell>
    );
  }

  return (
    <SellerShell
      title={t('Edit product', 'ویرایش محصول')}
      description={t('Changes are saved to this demo store only.', 'تغییرات فقط در این فروشگاه آزمایشی ذخیره می‌شود.')}
    >
      <ProductForm productId={product.id} initialValues={productToFormValues(product)} />
    </SellerShell>
  );
}
