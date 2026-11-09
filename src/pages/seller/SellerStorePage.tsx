import { useLanguage } from '@/i18n/useLanguage';
import { Panel } from '@/components/account/AccountUi';
import SellerShell from '@/components/seller/SellerShell';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { PROVINCES } from '@/data/seller';
import { useCategories } from '@/catalog/useCategories';
import Link from '@/router/Link';
import { useSellerData } from '@/seller/useSellerData';

export default function SellerStorePage() {
  const { t, tx } = useLanguage();
  const { getCategory } = useCategories();
  const { store, application } = useSellerData();
  const province = PROVINCES.find((item) => item.id === application.provinceId);
  const category = getCategory(application.categoryId);
  const notSet = t('Not set yet', 'هنوز تنظیم نشده');

  const rows: { label: string; value: string; ltr?: boolean }[] = [
    { label: t('Store name', 'نام فروشگاه'), value: application.storeName.trim() || notSet },
    { label: t('Owner', 'مالک'), value: application.fullName.trim() || notSet },
    { label: t('Province', 'ولایت'), value: province ? tx(province.name) : notSet },
    { label: t('Address', 'آدرس'), value: application.businessAddress.trim() || notSet },
    { label: t('Main category', 'دسته اصلی'), value: category ? tx(category.name) : notSet },
    { label: t('Phone', 'تلفن'), value: application.phone.trim() || notSet, ltr: true },
    { label: t('Email', 'ایمیل'), value: application.email.trim() || notSet, ltr: true },
  ];

  return (
    <SellerShell
      title={t('Store profile', 'پروفایل فروشگاه')}
      description={t('How your store appears in this panel.', 'نحوه نمایش فروشگاه شما در این پنل.')}
    >
      <Panel title={tx(store.name)}>
        <p className="text-sm leading-relaxed text-slate-700">{application.description.trim() || notSet}</p>
        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{row.label}</dt>
              <dd className="mt-1 break-words text-sm font-semibold text-navy-900" dir={row.ltr ? 'ltr' : undefined}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate-600">
            {t('Store details are edited in your store registration form.', 'جزئیات فروشگاه در فرم ثبت فروشگاه ویرایش می‌شود.')}
          </p>
          <Link to="/sell/register" className={buttonClasses('secondary', 'shrink-0')}>
            {t('Edit store details', 'ویرایش جزئیات فروشگاه')}
          </Link>
        </div>
      </Panel>
    </SellerShell>
  );
}
