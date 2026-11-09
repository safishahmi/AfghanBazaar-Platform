import { useLanguage } from '@/i18n/useLanguage';
import { CATEGORIES } from '@/data/categories';
import { CONDITION_TEXT, FULFILMENT_TEXT } from '@/data/sellerLabels';
import { formatAfn } from '@/lib/format';
import { getStockStatus } from '@/lib/sellerQueries';
import type { ProductFormValues } from '@/lib/sellerValidation';
import { StockStatusBadge } from './SellerStatusBadge';

interface ProductPreviewProps {
  values: ProductFormValues;
  imageUrl: string;
}

export default function ProductPreview({ values, imageUrl }: ProductPreviewProps) {
  const { t, tx } = useLanguage();
  const category = CATEGORIES.find((item) => item.id === values.categoryId);
  const price = Number(values.sellingPrice);
  const discount = values.discountPrice.trim() === '' ? null : Number(values.discountPrice);
  const quantity = values.quantity.trim() === '' ? 0 : Number(values.quantity);
  const hasPrice = Number.isFinite(price) && price > 0;
  const activeDiscount = discount !== null && Number.isFinite(discount) && discount >= 0 && discount < price ? discount : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-slate-100">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            {t('Choose a sample image', 'یک تصویر نمونه انتخاب کنید')}
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{category ? tx(category.name) : t('Category', 'دسته')}</p>
        <h3 className="text-lg font-bold leading-snug text-navy-900">
          {values.nameEnglish.trim() || t('Product name in English', 'نام محصول به انگلیسی')}
        </h3>
        {values.nameDari.trim() && <p className="text-sm text-slate-700">{values.nameDari.trim()}</p>}
        <div className="flex flex-wrap items-baseline gap-2">
          {hasPrice && (
            <span className="text-xl font-bold text-navy-900">{formatAfn(activeDiscount ?? price)}</span>
          )}
          {hasPrice && activeDiscount !== null && <span className="text-sm text-slate-500 line-through">{formatAfn(price)}</span>}
          {!hasPrice && <span className="text-sm text-slate-500">{t('Set a price', 'قیمت را تعیین کنید')}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
          <StockStatusBadge status={getStockStatus(quantity)} />
          <span className="rounded-full bg-slate-100 px-2.5 py-1 ring-1 ring-slate-200">{tx(CONDITION_TEXT[values.condition])}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 ring-1 ring-slate-200">{tx(FULFILMENT_TEXT[values.shippingMethod])}</span>
        </div>
        <p className="text-xs text-slate-600">
          {t('Preview only. This product is not shown on the public store.', 'فقط پیش‌نمایش است. این محصول در فروشگاه عمومی نمایش داده نمی‌شود.')}
        </p>
      </div>
    </div>
  );
}
