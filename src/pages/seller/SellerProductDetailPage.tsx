import { useState } from 'react';
import { Pencil, RotateCcw, Ban } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import SellerShell from '@/components/seller/SellerShell';
import SellerEmptyState from '@/components/seller/SellerEmptyState';
import { ProductStatusBadge, StockStatusBadge } from '@/components/seller/SellerStatusBadge';
import { CONDITION_TEXT, FULFILMENT_TEXT } from '@/data/sellerLabels';
import { useCategories } from '@/catalog/useCategories';
import { formatAfn, formatDemoDate } from '@/lib/format';
import { getStockStatus } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';

interface SellerProductDetailPageProps {
  productId: string;
}

const SAVED_MESSAGES: Record<string, { en: string; prs: string }> = {
  draft: {
    en: 'Saved as a draft. Only you can see it.',
    prs: 'به‌عنوان پیش‌نویس ذخیره شد. فقط شما می‌توانید آن را ببینید.',
  },
  pending_review: {
    en: 'Submitted for review. Nothing is published to the public store in this demo.',
    prs: 'برای بررسی ارسال شد. در این نسخه آزمایشی چیزی در فروشگاه عمومی منتشر نمی‌شود.',
  },
};

export default function SellerProductDetailPage({ productId }: SellerProductDetailPageProps) {
  const { t, tx, lang } = useLanguage();
  const { getCategory } = useCategories();
  const { search } = useRouter();
  const { products, setProductStatus } = useSellerData();
  const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);

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

  const savedKey = new URLSearchParams(search).get('saved') ?? '';
  const savedMessage = SAVED_MESSAGES[savedKey];
  const category = getCategory(product.categoryId);
  const stock = getStockStatus(product.quantity);
  const isInactive = product.status === 'inactive';

  const details: { label: string; value: string }[] = [
    { label: t('Category', 'دسته'), value: category ? tx(category.name) : '-' },
    { label: t('SKU', 'کد محصول (SKU)'), value: product.sku },
    { label: t('Brand', 'برند'), value: product.brand ?? '-' },
    { label: t('Condition', 'وضعیت'), value: tx(CONDITION_TEXT[product.condition]) },
    { label: t('Quantity in stock', 'موجودی'), value: String(product.quantity) },
    { label: t('Delivery method', 'روش تحویل'), value: tx(FULFILMENT_TEXT[product.shippingMethod]) },
    { label: t('Last updated', 'آخرین به‌روزرسانی'), value: formatDemoDate(product.updatedAt, lang) },
  ];

  return (
    <SellerShell title={tx(product.name)} description={product.sku}>
      {savedMessage && (
        <p role="status" className="rounded-2xl bg-navy-50 p-4 text-sm font-semibold text-navy-900 ring-1 ring-navy-200">
          {tx(savedMessage)}
        </p>
      )}

      <article className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[280px_minmax(0,1fr)] sm:p-6">
        <img src={product.imageUrl} alt="" className="aspect-square w-full rounded-xl object-cover" />
        <div className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <ProductStatusBadge status={product.status} />
            <StockStatusBadge status={stock} />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy-900">
              {formatAfn(product.discountPrice ?? product.sellingPrice)}
            </p>
            {product.discountPrice !== null && (
              <p className="text-sm text-slate-500 line-through">{formatAfn(product.sellingPrice)}</p>
            )}
          </div>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-navy-900">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">{t('Description', 'توضیحات')}</h2>
            <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-700">{product.description}</p>
          </div>
        </div>
      </article>

      <section aria-labelledby="product-actions" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 id="product-actions" className="text-lg font-bold text-navy-900">
          {t('Manage this product', 'مدیریت این محصول')}
        </h2>

        {confirmingDeactivate ? (
          <div className="mt-4 space-y-4 rounded-xl bg-gold-50 p-4 ring-1 ring-gold-400">
            <p className="text-sm font-semibold text-navy-900">
              {t('Deactivate this product?', 'این محصول غیرفعال شود؟')}
            </p>
            <p className="text-sm text-slate-700">
              {t(
                'It will be hidden from your active list. Past orders keep their records.',
                'از فهرست فعال شما پنهان می‌شود. سفارش‌های قبلی سوابق خود را حفظ می‌کنند.',
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setProductStatus(product.id, 'inactive');
                  setConfirmingDeactivate(false);
                }}
                className={buttonClasses('primary', 'gap-2')}
              >
                <Ban className="h-4 w-4" aria-hidden="true" />
                {t('Yes, deactivate', 'بله، غیرفعال شود')}
              </button>
              <button type="button" onClick={() => setConfirmingDeactivate(false)} className={buttonClasses('ghost')}>
                {t('Keep active', 'فعال بماند')}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/seller/products/${product.id}/edit`} className={buttonClasses('primary', 'gap-2')}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              {t('Edit product', 'ویرایش محصول')}
            </Link>
            {isInactive ? (
              <button
                type="button"
                onClick={() => setProductStatus(product.id, 'pending_review')}
                className={buttonClasses('secondary', 'gap-2')}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {t('Send back for review', 'ارسال مجدد برای بررسی')}
              </button>
            ) : (
              <button type="button" onClick={() => setConfirmingDeactivate(true)} className={buttonClasses('secondary', 'gap-2')}>
                <Ban className="h-4 w-4" aria-hidden="true" />
                {t('Deactivate', 'غیرفعال کردن')}
              </button>
            )}
          </div>
        )}
      </section>
    </SellerShell>
  );
}
