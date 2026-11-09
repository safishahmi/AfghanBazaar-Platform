import { useEffect, useState, type ReactNode } from 'react';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { DEMO_SELLER_ORDERS } from '@/data/seller';
import { useLanguage } from '@/i18n/useLanguage';
import { canCancelOrder, getNextOrderStatus, getSellerOrders } from '@/lib/sellerQueries';
import { productFromFormValues } from '@/lib/sellerMappers';
import { fetchSellerData, upsertApplicationRow, upsertProductRow, type SellerData } from '@/lib/sellerRepository';
import type { ApplicationFormValues, ProductFormValues } from '@/lib/sellerValidation';
import type { SellerApplication, SellerOrder, SellerProduct, SellerProductStatus, SellerStore } from '@/types/seller';
import { SellerContext, type SellerContextValue } from './sellerContext';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function newProductId(): string {
  return `seller-product-${Date.now().toString(36)}`;
}

export function SellerDataProvider({ userId, children }: { userId: string; children: ReactNode }) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState<SellerData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetchSellerData(userId).then(
      (data) => {
        if (!active) return;
        setLoaded(data);
        setLoadFailed(false);
      },
      () => {
        if (active) setLoadFailed(true);
      },
    );
    return () => {
      active = false;
    };
  }, [attempt, userId]);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        {loadFailed ? (
          <div className="space-y-4">
            <p role="alert" className="font-semibold text-navy-900">
              {t(
                'The seller panel could not load. Check your connection and try again.',
                'پنل فروشنده بارگذاری نشد. اتصال خود را بررسی کنید و دوباره تلاش کنید.',
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setLoadFailed(false);
                setAttempt((count) => count + 1);
              }}
              className={buttonClasses('primary')}
            >
              {t('Try again', 'دوباره تلاش کنید')}
            </button>
          </div>
        ) : (
          <p role="status" className="text-sm font-semibold text-slate-600">
            {t('Loading your seller panel...', 'در حال بارگذاری پنل فروشنده...')}
          </p>
        )}
      </div>
    );
  }

  return <LoadedSellerData initial={loaded}>{children}</LoadedSellerData>;
}

function LoadedSellerData({ initial, children }: { initial: SellerData; children: ReactNode }) {
  const { t } = useLanguage();
  const [application, setApplication] = useState<SellerApplication>(initial.application);
  const [products, setProducts] = useState<SellerProduct[]>(initial.products);
  const [allOrders, setOrders] = useState<SellerOrder[]>(() =>
    DEMO_SELLER_ORDERS.map((order) => ({ ...order, sellerId: initial.sellerId })),
  );
  const [saveFailed, setSaveFailed] = useState(false);

  const persist = (write: Promise<void>) => {
    setSaveFailed(false);
    write.catch(() => setSaveFailed(true));
  };

  const replaceProduct = (next: SellerProduct) => {
    setProducts((current) => current.map((product) => (product.id === next.id ? next : product)));
    persist(upsertProductRow(next));
  };

  const value: SellerContextValue = {
    store: storeFromApplication(application, initial.sellerId),
    application,
    products,
    orders: getSellerOrders(allOrders, initial.sellerId),
    saveApplication: (values: ApplicationFormValues, status) => {
      const next: SellerApplication = {
        ...application,
        status,
        fullName: values.fullName.trim(),
        storeName: values.storeName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        businessAddress: values.businessAddress.trim(),
        provinceId: values.provinceId,
        categoryId: values.categoryId,
        description: values.description.trim(),
      };
      setApplication(next);
      persist(upsertApplicationRow(next));
    },
    addProduct: (values: ProductFormValues, status) => {
      const id = newProductId();
      const product = productFromFormValues(values, { id, sellerId: initial.sellerId, status }, todayIsoDate());
      setProducts((current) => [...current, product]);
      persist(upsertProductRow(product));
      return id;
    },
    updateProduct: (productId: string, values: ProductFormValues, status) => {
      const current = products.find((product) => product.id === productId);
      if (!current) return;
      replaceProduct(productFromFormValues(values, { id: current.id, sellerId: current.sellerId, status }, todayIsoDate()));
    },
    setProductStatus: (productId: string, status: SellerProductStatus) => {
      const current = products.find((product) => product.id === productId);
      if (!current) return;
      replaceProduct({ ...current, status, updatedAt: todayIsoDate() });
    },
    setQuantity: (productId: string, quantity: number) => {
      const current = products.find((product) => product.id === productId);
      if (!current) return;
      replaceProduct({ ...current, quantity: Math.max(0, Math.floor(quantity)), updatedAt: todayIsoDate() });
    },
    advanceOrder: (orderId: string) => {
      setOrders((current) =>
        current.map((order) => {
          if (order.id !== orderId) return order;
          const next = getNextOrderStatus(order.status);
          return next ? { ...order, status: next } : order;
        }),
      );
    },
    cancelOrder: (orderId: string) => {
      setOrders((current) =>
        current.map((order) => (order.id === orderId && canCancelOrder(order.status) ? { ...order, status: 'cancelled' } : order)),
      );
    },
  };

  return (
    <SellerContext.Provider value={value}>
      {saveFailed && (
        <p role="alert" className="mx-auto mt-6 max-w-7xl rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-900 ring-1 ring-gold-400 sm:px-6 lg:px-8">
          {t(
            'Your last change could not be saved. Reload the page to see what is stored.',
            'آخرین تغییر ذخیره نشد. برای دیدن وضعیت ذخیره‌شده، صفحه را دوباره بارگذاری کنید.',
          )}
        </p>
      )}
      {children}
    </SellerContext.Provider>
  );
}

function storeFromApplication(application: SellerApplication, sellerId: string): SellerStore {
  const storeName = application.storeName.trim();
  return {
    id: sellerId,
    sellerId,
    name: storeName ? { en: storeName, prs: storeName } : { en: 'Your store', prs: 'فروشگاه شما' },
    description: { en: application.description, prs: application.description },
    provinceId: application.provinceId,
    address: application.businessAddress,
    primaryCategoryId: application.categoryId,
  };
}
