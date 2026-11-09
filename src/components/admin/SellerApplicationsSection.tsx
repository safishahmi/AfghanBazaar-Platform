import { useCategories } from '@/catalog/useCategories';
import { DashboardSection, StatusPill, TableWrapper } from '@/components/preview/dashboard/DashboardShell';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { APPLICATION_STATUS_TEXT, PENDING_APPLICATION_STATUSES } from '@/data/adminLabels';
import { PROVINCES } from '@/data/seller';
import { useLanguage } from '@/i18n/useLanguage';
import type { AdminApplicationStatus, SellerApplicationReview } from '@/types/admin';

const STATUS_TONE = {
  submitted: 'neutral',
  under_review: 'warning',
  info_requested: 'warning',
  approved: 'success',
  rejected: 'danger',
} as const;

interface SellerApplicationsSectionProps {
  applications: SellerApplicationReview[];
  onDecide: (id: string, status: AdminApplicationStatus, requestedInfo?: string) => void;
}

export default function SellerApplicationsSection({ applications, onDecide }: SellerApplicationsSectionProps) {
  const { t, tx } = useLanguage();
  const { getCategory } = useCategories();
  const waiting = applications.filter((item) => PENDING_APPLICATION_STATUSES.includes(item.status)).length;

  return (
    <DashboardSection
      id="applications"
      title={t('Seller applications', 'درخواست‌های فروشنده')}
      description={t(`${waiting} applications need a decision.`, `${waiting} درخواست به تصمیم نیاز دارد.`)}
    >
      <TableWrapper label={t('Seller applications', 'درخواست‌های فروشنده')}>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Store', 'فروشگاه')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Province', 'ولایت')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Category', 'دسته')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Submitted', 'ارسال شده')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Actions', 'اقدامات')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((item) => {
              const province = PROVINCES.find((entry) => entry.id === item.provinceId);
              const category = getCategory(item.categoryId);
              const pending = PENDING_APPLICATION_STATUSES.includes(item.status);
              return (
                <tr key={item.id} className="align-top hover:bg-navy-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{item.storeName}</p>
                    <p className="text-xs text-slate-600">{item.applicantName}</p>
                    {item.requestedInfo && <p className="mt-1 text-xs text-slate-700">{item.requestedInfo}</p>}
                  </td>
                  <td className="px-4 py-3">{province ? tx(province.name) : '-'}</td>
                  <td className="px-4 py-3">{category ? tx(category.name) : '-'}</td>
                  <td className="px-4 py-3 tabular-nums">{item.submittedAt}</td>
                  <td className="px-4 py-3">
                    <StatusPill tone={STATUS_TONE[item.status]}>{tx(APPLICATION_STATUS_TEXT[item.status])}</StatusPill>
                  </td>
                  <td className="px-4 py-3">
                    {pending ? (
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => onDecide(item.id, 'approved')} className={buttonClasses('primary')}>
                          {t('Approve', 'تأیید')}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDecide(item.id, 'info_requested', t('Please send your business licence number.', 'لطفاً شماره جواز کسب خود را ارسال کنید.'))}
                          className={buttonClasses('secondary')}
                        >
                          {t('Request info', 'درخواست اطلاعات')}
                        </button>
                        <button type="button" onClick={() => onDecide(item.id, 'rejected')} className={buttonClasses('ghost')}>
                          {t('Reject', 'رد')}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">{t('Decision recorded', 'تصمیم ثبت شد')}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </DashboardSection>
  );
}
