import type { ReactNode } from 'react';
import { Heart, LayoutDashboard, MapPin, Package, Settings, User } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import SectionShell from '@/components/ui/SectionShell';
import type { SectionNavItem } from '@/components/ui/SectionNav';

const ACCOUNT_NAV_ITEMS: SectionNavItem[] = [
  { to: '/account', label: { en: 'Overview', prs: 'خلاصه' }, icon: LayoutDashboard },
  { to: '/account/profile', label: { en: 'Profile', prs: 'پروفایل' }, icon: User },
  { to: '/account/addresses', label: { en: 'Addresses', prs: 'آدرس‌ها' }, icon: MapPin },
  { to: '/account/orders', label: { en: 'Orders', prs: 'سفارش‌ها' }, icon: Package },
  { to: '/account/wishlist', label: { en: 'Wishlist', prs: 'لیست علاقه‌مندی' }, icon: Heart },
  { to: '/account/settings', label: { en: 'Settings', prs: 'تنظیمات' }, icon: Settings },
];

interface AccountShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AccountShell({ title, description, children }: AccountShellProps) {
  const { t } = useLanguage();

  return (
    <SectionShell
      title={title}
      description={description}
      navLabel={t('Account sections', 'بخش‌های حساب')}
      navItems={ACCOUNT_NAV_ITEMS}
      rootPath="/account"
      notice={t(
        'This section shows demo account data only. No real account is connected.',
        'این بخش فقط داده‌های نمونه حساب را نشان می‌دهد. هیچ حساب واقعی وصل نشده است.',
      )}
    >
      {children}
    </SectionShell>
  );
}
