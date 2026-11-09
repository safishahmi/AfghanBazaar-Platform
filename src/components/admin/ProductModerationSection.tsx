import { DashboardSection, StatusPill, TableWrapper } from '@/components/preview/dashboard/DashboardShell';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { MODERATION_STATUS_TEXT } from '@/data/adminLabels';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import type { ModerationStatus, ProductModerationRecord } from '@/types/admin';

const STATUS_TONE = {
  pending_review: 'warning',
  approved: 'success',
  changes_requested: 'warning',
  rejected: 'danger',
  inactive: 'neutral',
} as const;

const REVIEWABLE: ModerationStatus[] = ['pending_review', 'changes_requested'];

interface ProductModerationSectionProps {
  products: ProductModerationRecord[];
  onDecide: (productId: string, status: ModerationStatus) => void;
}

export default function ProductModerationSection({ products, onDecide }: ProductModerationSectionProps) {
  const { t, tx } = useLanguage();
  const awaiting = products.filter((item) => item.status === 'pending_review').length;

  return (
    <DashboardSection
      id="moderation"
      title={t('Product moderation', 'بررسی محصولات')}
      description={t(`${awaiting} products are waiting for review.`, `${awaiting} محصول منتظر بررسی است.`)}
    >
      <TableWrapper label={t('Product moderation queue', 'صف بررسی محصولات')}>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Product', 'محصول')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Seller', 'فروشنده')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Price', 'قیمت')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Submitted', 'ارسال شده')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Actions', 'اقدامات')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => (
              <tr key={item.productId} className="align-top hover:bg-navy-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">{tx(item.name)}</p>
                      {item.note && <p className="mt-1 text-xs text-slate-700">{item.note}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{tx(item.sellerName)}</td>
                <td className="px-4 py-3 tabular-nums">{formatAfn(item.price)}</td>
                <td className="px-4 py-3 tabular-nums">{item.submittedAt}</td>
                <td className="px-4 py-3">
                  <StatusPill tone={STATUS_TONE[item.status]}>{tx(MODERATION_STATUS_TEXT[item.status])}</StatusPill>
                </td>
                <td className="px-4 py-3">
                  {REVIEWABLE.includes(item.status) ? (
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => onDecide(item.productId, 'approved')} className={buttonClasses('primary')}>
                        {t('Approve', 'تأیید')}
                      </button>
                      <button type="button" onClick={() => onDecide(item.productId, 'changes_requested')} className={buttonClasses('secondary')}>
                        {t('Request changes', 'درخواست تغییر')}
                      </button>
                      <button type="button" onClick={() => onDecide(item.productId, 'rejected')} className={buttonClasses('ghost')}>
                        {t('Reject', 'رد')}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">{t('Decision recorded', 'تصمیم ثبت شد')}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </DashboardSection>
  );
}
