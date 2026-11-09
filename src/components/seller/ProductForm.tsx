import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { TextAreaField, TextField, SelectField } from '@/components/auth/AuthFields';
import { useFieldErrorText } from '@/components/auth/useFieldErrorText';
import { useCategories } from '@/catalog/useCategories';
import { CONDITION_OPTIONS, CONDITION_TEXT, FULFILMENT_TEXT, SHIPPING_METHOD_OPTIONS } from '@/data/sellerLabels';
import { SAMPLE_PRODUCT_IMAGES } from '@/data/seller';
import { hasErrors, type FieldErrors } from '@/lib/authValidation';
import { MAX_DESCRIPTION_LENGTH, validateProduct, type ProductField, type ProductFormValues } from '@/lib/sellerValidation';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerProductStatus } from '@/types/seller';
import ProductPreview from './ProductPreview';

type SaveStatus = Extract<SellerProductStatus, 'draft' | 'pending_review'>;

interface ProductFormProps {
  productId?: string;
  initialValues: ProductFormValues;
}

export default function ProductForm({ productId, initialValues }: ProductFormProps) {
  const { t, tx } = useLanguage();
  const { navigate } = useRouter();
  const { addProduct, updateProduct } = useSellerData();
  const { activeCategories } = useCategories();
  const categoryIds = activeCategories.map((category) => category.id);
  const errorText = useFieldErrorText();
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const errors: FieldErrors<ProductField> = submitted ? validateProduct(values, categoryIds) : {};
  const errorFor = (field: ProductField) => {
    const code = errors[field];
    return code ? errorText(code) : undefined;
  };

  const setField = <K extends ProductField>(field: K, value: ProductFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const save = (status: SaveStatus) => {
    setSubmitted(true);
    if (hasErrors(validateProduct(values, categoryIds))) return;
    if (productId) updateProduct(productId, values, status);
    const savedId = productId ?? addProduct(values, status);
    navigate(`/seller/products/${savedId}?saved=${status}`);
  };

  const categoryOptions = [
    { value: '' as const, label: t('Choose a category', 'یک دسته انتخاب کنید') },
    ...activeCategories.map((category) => ({ value: category.id, label: tx(category.name) })),
  ];
  const conditionOptions = CONDITION_OPTIONS.map((value) => ({ value, label: tx(CONDITION_TEXT[value]) }));
  const shippingOptions = SHIPPING_METHOD_OPTIONS.map((value) => ({ value, label: tx(FULFILMENT_TEXT[value]) }));
  const hasSubmitErrors = submitted && hasErrors(errors);

  return (
    <div className={`grid gap-6 ${showPreview ? 'xl:grid-cols-[minmax(0,1fr)_360px]' : ''}`}>
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {hasSubmitErrors && (
          <p role="alert" className="rounded-xl bg-gold-50 p-4 text-sm font-semibold text-navy-900 ring-1 ring-gold-400">
            {t('Please fix the highlighted fields before saving.', 'لطفاً بخش‌های مشخص‌شده را قبل از ذخیره اصلاح کنید.')}
          </p>
        )}

        <fieldset className="space-y-5">
          <legend className="mb-1 text-base font-bold text-navy-900">{t('Product details', 'جزئیات محصول')}</legend>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              id="product-name-en"
              label={t('Product name (English)', 'نام محصول (انگلیسی)')}
              value={values.nameEnglish}
              onChange={(value) => setField('nameEnglish', value)}
              error={errorFor('nameEnglish')}
            />
            <TextField
              id="product-name-prs"
              label={t('Product name (Dari)', 'نام محصول (دری)')}
              value={values.nameDari}
              onChange={(value) => setField('nameDari', value)}
              error={errorFor('nameDari')}
            />
          </div>
          <TextAreaField
            id="product-description"
            label={t('Description', 'توضیحات')}
            value={values.description}
            onChange={(value) => setField('description', value)}
            error={errorFor('description')}
            hint={t(
              `Write in Dari or English. Up to ${MAX_DESCRIPTION_LENGTH} characters (${values.description.length} now).`,
              `به دری یا انگلیسی بنویسید. تا ${MAX_DESCRIPTION_LENGTH} حرف (اکنون ${values.description.length}).`,
            )}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              id="product-category"
              label={t('Category', 'دسته')}
              value={values.categoryId}
              onChange={(value) => setField('categoryId', value)}
              options={categoryOptions}
              error={errorFor('categoryId')}
            />
            <TextField
              id="product-brand"
              label={t('Brand (optional)', 'برند (اختیاری)')}
              value={values.brand}
              onChange={(value) => setField('brand', value)}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="mb-1 text-base font-bold text-navy-900">{t('Product image', 'تصویر محصول')}</legend>
          <p className="text-xs text-slate-600">
            {t('Demo mode: choose one of the sample images. Real photo uploads are not part of this prototype.', 'حالت آزمایشی: یکی از تصاویر نمونه را انتخاب کنید. بارگذاری عکس واقعی در این نمونه وجود ندارد.')}
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6" role="group" aria-label={t('Sample images', 'تصاویر نمونه')}>
            {SAMPLE_PRODUCT_IMAGES.map((image) => {
              const selected = values.imageUrl === image.imageUrl;
              return (
                <button
                  key={image.imageUrl}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setField('imageUrl', image.imageUrl)}
                  className={`group overflow-hidden rounded-xl text-start ring-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-gold-500 ${
                    selected ? 'ring-navy-900' : 'ring-slate-200 hover:ring-navy-300'
                  }`}
                >
                  <img src={image.imageUrl} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                  <span className="block truncate px-2 py-1.5 text-xs font-semibold text-navy-900">{tx(image.label)}</span>
                </button>
              );
            })}
          </div>
          {errorFor('imageUrl') && <p className="text-xs font-semibold text-navy-900">{errorFor('imageUrl')}</p>}
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="mb-1 text-base font-bold text-navy-900">{t('Pricing and stock', 'قیمت و موجودی')}</legend>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              id="product-price"
              label={t('Selling price (AFN)', 'قیمت فروش (افغانی)')}
              inputMode="decimal"
              value={values.sellingPrice}
              onChange={(value) => setField('sellingPrice', value)}
              error={errorFor('sellingPrice')}
            />
            <TextField
              id="product-discount"
              label={t('Discount price (AFN, optional)', 'قیمت تخفیفی (افغانی، اختیاری)')}
              inputMode="decimal"
              value={values.discountPrice}
              onChange={(value) => setField('discountPrice', value)}
              error={errorFor('discountPrice')}
            />
            <TextField
              id="product-quantity"
              label={t('Quantity in stock', 'موجودی')}
              inputMode="numeric"
              value={values.quantity}
              onChange={(value) => setField('quantity', value)}
              error={errorFor('quantity')}
            />
            <TextField
              id="product-sku"
              label={t('SKU (your product code)', 'کد محصول (SKU)')}
              value={values.sku}
              onChange={(value) => setField('sku', value)}
              error={errorFor('sku')}
              hint={t('3 to 20 letters, numbers, or dashes.', 'از ۳ تا ۲۰ حرف، عدد یا خط تیره.')}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              id="product-condition"
              label={t('Condition', 'وضعیت')}
              value={values.condition}
              onChange={(value) => setField('condition', value)}
              options={conditionOptions}
            />
            <SelectField
              id="product-shipping"
              label={t('Delivery method', 'روش تحویل')}
              value={values.shippingMethod}
              onChange={(value) => setField('shippingMethod', value)}
              options={shippingOptions}
            />
          </div>
        </fieldset>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link to={productId ? `/seller/products/${productId}` : '/seller/products'} className={buttonClasses('ghost')}>
              {t('Cancel', 'لغو')}
            </Link>
            <button
              type="button"
              aria-pressed={showPreview}
              onClick={() => setShowPreview((current) => !current)}
              className={buttonClasses('secondary', 'gap-2')}
            >
              {showPreview ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              {showPreview ? t('Hide preview', 'پنهان کردن پیش‌نمایش') : t('Show preview', 'نمایش پیش‌نمایش')}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => save('draft')} className={buttonClasses('secondary')}>
              {t('Save as draft', 'ذخیره به‌عنوان پیش‌نویس')}
            </button>
            <button type="button" onClick={() => save('pending_review')} className={buttonClasses('primary')}>
              {t('Submit for review', 'ارسال برای بررسی')}
            </button>
          </div>
        </div>
      </form>

      {showPreview && (
        <aside aria-label={t('Product preview', 'پیش‌نمایش محصول')} className="min-w-0 xl:sticky xl:top-32 xl:self-start">
          <ProductPreview values={values} imageUrl={values.imageUrl} />
        </aside>
      )}
    </div>
  );
}
