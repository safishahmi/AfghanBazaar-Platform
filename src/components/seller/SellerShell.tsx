import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import SectionShell from '@/components/ui/SectionShell';
import type { SectionNavItem } from '@/components/ui/SectionNav';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { useSellerAuth } from '@/seller/useSellerAuth';
import { LayoutDashboard, LogOut, Package, PackagePlus, Warehouse, ShoppingBag, BarChart3, Store, Truck, Settings } from 'lucide-react';

const SELLER_ROOT = '/seller/dashboard';

const SELLER_NAV_ITEMS: SectionNavItem[] = [
  { to: SELLER_ROOT, label: { en: 'Overview', prs: 'خلاصه' }, icon: LayoutDashboard },
  { to: '/seller/products', label: { en: 'Products', prs: 'محصولات' }, icon: Package },
  { to: '/seller/products/new', label: { en: 'Add product', prs: 'افزودن محصول' }, icon: PackagePlus },
  { to: '/seller/inventory', label: { en: 'Inventory', prs: 'موجودی' }, icon: Warehouse },
  { to: '/seller/orders', label: { en: 'Orders', prs: 'سفارش‌ها' }, icon: ShoppingBag },
  { to: '/seller/sales', label: { en: 'Sales', prs: 'فروش' }, icon: BarChart3 },
  { to: '/seller/store', label: { en: 'Store profile', prs: 'پروفایل فروشگاه' }, icon: Store },
  { to: '/seller/shipping', label: { en: 'Shipping', prs: 'ارسال' }, icon: Truck },
  { to: '/seller/settings', label: { en: 'Settings', prs: 'تنظیمات' }, icon: Settings },
];

interface SellerShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SellerShell({ title, description, children }: SellerShellProps) {
  const { t } = useLanguage();
  const { signOut } = useSellerAuth();

  return (
    <SectionShell
      title={title}
      description={description}
      navLabel={t('Seller sections', 'بخش‌های فروشنده')}
      navItems={SELLER_NAV_ITEMS}
      rootPath={SELLER_ROOT}
      notice={t(
        'Your seller account. Store profile and product changes are saved to your account. Orders are sample data for now.',
        'حساب فروشنده شما. تغییرات پروفایل فروشگاه و محصولات در حساب شما ذخیره می‌شود. سفارش‌ها فعلاً داده‌های نمونه هستند.',
      )}
    >
      <div className="mb-6 flex justify-end">
        <button type="button" onClick={() => void signOut()} className={buttonClasses('ghost', 'gap-2')}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {t('Sign out', 'خروج از حساب')}
        </button>
      </div>
      {children}
    </SectionShell>
  );
}
