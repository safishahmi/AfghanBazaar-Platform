import { Minus, Plus, PackageX, TriangleAlert } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import SellerShell from '@/components/seller/SellerShell';
import { StockStatusBadge } from '@/components/seller/SellerStatusBadge';
import { formatDemoDate } from '@/lib/format';
import { LOW_STOCK_THRESHOLD, getStockStatus } from '@/lib/sellerQueries';
import { useSellerData } from '@/seller/useSellerData';
import type { SellerProduct } from '@/types/seller';

const ICON_BUTTON_CLASS =
  'flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 ring-1 ring-slate-300 transition-colors duration-200 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white';

export default function SellerInventoryPage() {
  const { t, tx, lang } = useLanguage();
  const { products, setQuantity } = useSellerData();

  const attention = products.filter((product) => getStockStatus(product.quantity) !== 'in_stock').length;

  return (
    <SellerShell
      title={t('Inventory', 'موجودی')}
      description={t('Track stock levels for every product in your store.', 'موجودی هر محصول فروشگاه خود را پیگیری کنید.')}
    >
      {attention > 0 && (
        <div role="status" className="flex items-start gap-3 rounded-2xl bg-gold-400/20 p-4 text-sm font-semibold leading-relaxed text-navy-900 ring-1 ring-gold-500">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-navy-900" aria-hidden="true" />
          <p>
            {t(
              `${attention} product(s) need attention. Stock of ${LOW_STOCK_THRESHOLD} or fewer is marked as low, and zero as out of stock.`,
              `${attention} محصول نیاز به بررسی دارد. موجودی ${LOW_STOCK_THRESHOLD} یا کمتر کم، و صفر ناموجود به شمار می‌رود.`,
            )}
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {products.map((product) => (
          <InventoryRow
            key={product.id}
            product={product}
            name={tx(product.name)}
            updatedLabel={formatDemoDate(product.updatedAt, lang)}
            onChange={(quantity) => setQuantity(product.id, quantity)}
          />
        ))}
      </ul>
      <p className="text-xs text-slate-600">
        {t('Changes here are demo changes and reset when the page reloads.', 'تغییرات این بخش نمونه هستند و با بارگذاری دوباره صفحه بازنشانی می‌شوند.')}{' '}
        <Link to="/seller/products" className="font-semibold text-navy-900 underline-offset-4 hover:underline">
          {t('Go to products', 'رفتن به محصولات')}
        </Link>
      </p>
    </SellerShell>
  );
}

interface InventoryRowProps {
  product: SellerProduct;
  name: string;
  updatedLabel: string;
  onChange: (quantity: number) => void;
}

function InventoryRow({ product, name, updatedLabel, onChange }: InventoryRowProps) {
  const { t } = useLanguage();
  const status = getStockStatus(product.quantity);
  const isLow = status === 'low_stock';

  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 sm:flex-row sm:items-center sm:justify-between ${
        isLow ? 'ring-gold-500' : 'ring-slate-200'
      }`}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="truncate font-bold text-navy-900">{name}</p>
        <p className="text-xs text-slate-600" dir="ltr">
          {product.sku}
        </p>
        <p className="text-xs text-slate-500">{t(`Last updated ${updatedLabel}`, `آخرین به‌روزرسانی ${updatedLabel}`)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <StockStatusBadge status={status} />
        <div className="flex items-center gap-2" role="group" aria-label={t(`Adjust stock for ${name}`, `تنظیم موجودی ${name}`)}>
          <button
            type="button"
            aria-label={t('Decrease by one', 'کاهش یک عدد')}
            disabled={product.quantity <= 0}
            onClick={() => onChange(product.quantity - 1)}
            className={ICON_BUTTON_CLASS}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-lg font-bold text-navy-900" aria-live="polite">
            {product.quantity}
          </span>
          <button
            type="button"
            aria-label={t('Increase by one', 'افزایش یک عدد')}
            onClick={() => onChange(product.quantity + 1)}
            className={ICON_BUTTON_CLASS}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          disabled={product.quantity <= 0}
          onClick={() => onChange(0)}
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy-900 ring-1 ring-slate-300 transition-colors duration-200 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          <PackageX className="h-4 w-4" aria-hidden="true" />
          {t('Mark out of stock', 'ثبت به‌عنوان ناموجود')}
        </button>
      </div>
    </li>
  );
}
