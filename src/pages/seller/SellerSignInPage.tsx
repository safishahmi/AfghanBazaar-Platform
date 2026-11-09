import { useLanguage } from '@/i18n/useLanguage';
import PageHeader from '@/components/ui/PageHeader';
import SellerAuthForm from '@/components/seller/SellerAuthForm';

export default function SellerSignInPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('Seller sign in', 'ورود فروشنده')}
        description={t(
          'Sign in to manage your store profile and products. Your changes are saved to your account.',
          'برای مدیریت پروفایل فروشگاه و محصولات وارد شوید. تغییرات شما در حساب‌تان ذخیره می‌شود.',
        )}
      />

      <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SellerAuthForm />
        </div>
      </div>
    </>
  );
}
