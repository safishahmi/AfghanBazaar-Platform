import { BarChart3, FolderTree, LayoutDashboard, Network, Settings, ShieldCheck, ShoppingBag, Store, Users, Wallet } from 'lucide-react';
import DashboardShell, { DashboardSection, StatCard, StatusPill, TableWrapper } from '@/components/preview/dashboard/DashboardShell';
import { useLanguage } from '@/i18n/useLanguage';
import { formatAfn } from '@/lib/format';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { DEMO_USERS, MODERATION_QUEUE } from '@/data/previewDashboards';

const NAV = [
  { href: '#overview', en: 'Overview', prs: 'نمای کلی', icon: LayoutDashboard },
  { href: '#areas', en: 'Business areas', prs: 'بخش‌های کسب‌وکار', icon: Store },
  { href: '#users', en: 'Users and sellers', prs: 'کاربران و فروشندگان', icon: Users },
  { href: '#moderation', en: 'Product moderation', prs: 'بازبینی محصولات', icon: ShieldCheck },
  { href: '#orders', en: 'Orders', prs: 'سفارش‌ها', icon: ShoppingBag },
  { href: '#categories', en: 'Categories', prs: 'دسته‌بندی‌ها', icon: FolderTree },
  { href: '#finance', en: 'Financial controls', prs: 'کنترل‌های مالی', icon: Wallet },
  { href: '#reports', en: 'Reports and settings', prs: 'گزارش‌ها و تنظیمات', icon: Settings },
];

const DISABLED_ACTION =
  'cursor-not-allowed rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500';

export default function AdminDashboardPage() {
  const { t, tx, isRtl } = useLanguage();
  const numberFormat = (value: number) => value.toLocaleString(isRtl ? 'fa-AF' : 'en-US');

  const reviewLabel = {
    pending: t('Waiting review', 'منتظر بازبینی'),
    approved: t('Approved', 'تأیید شده'),
    changes: t('Changes requested', 'درخواست اصلاح'),
  };
  const reviewTone = { pending: 'warning', approved: 'success', changes: 'danger' } as const;
  const userStatusLabel = { active: t('Active', 'فعال'), pending: t('Pending', 'در انتظار'), suspended: t('Suspended', 'تعلیق') };
  const userStatusTone = { active: 'success', pending: 'warning', suspended: 'danger' } as const;

  const areas = [
    {
      icon: Store,
      tag: t('Area A', 'بخش الف'),
      title: t('AfghanBazaar Official Store', 'فروشگاه رسمی افغان بازار'),
      rule: t('Sales are owned by AfghanBazaar and never counted as seller sales.', 'فروش‌ها متعلق به افغان بازار هستند و هرگز فروش فروشنده حساب نمی‌شوند.'),
      stats: [`${t('Products (sample)', 'محصولات (نمونه)')}: ${numberFormat(PRODUCTS.filter((p) => p.seller.type === 'official').length)}`, `${t('Orders (sample)', 'سفارش‌ها (نمونه)')}: ${numberFormat(128)}`],
      tone: 'dark' as const,
    },
    {
      icon: Users,
      tag: t('Area B', 'بخش ب'),
      title: t('Independent seller marketplace', 'بازار فروشندگان مستقل'),
      rule: t('Each seller has a separate ledger. Commission rules are a future feature.', 'هر فروشنده دفتر جدا دارد. قوانین کمیسیون یک قابلیت آینده است.'),
      stats: [`${t('Products (sample)', 'محصولات (نمونه)')}: ${numberFormat(PRODUCTS.filter((p) => p.seller.type === 'independent').length)}`, `${t('Active sellers (sample)', 'فروشندگان فعال (نمونه)')}: ${numberFormat(6)}`],
      tone: 'light' as const,
    },
    {
      icon: Network,
      tag: t('Area C - future', 'بخش ج - آینده'),
      title: t('Network (MLM) portal', 'پورتال شبکه (MLM)'),
      rule: t('Separate members, referrals, and rules. Not open in this phase; no earnings are calculated.', 'اعضا، معرفی‌ها و قوانین جدا. در این مرحله باز نیست و هیچ درآمدی محاسبه نمی‌شود.'),
      stats: [t('Status: planning only', 'وضعیت: فقط برنامه‌ریزی')],
      tone: 'gold' as const,
    },
  ];

  const toneClasses = {
    dark: 'bg-navy-900 text-white',
    light: 'border-2 border-navy-100 bg-white text-slate-900',
    gold: 'border border-gold-300 bg-gold-50 text-slate-900',
  };

  const categoryCounts = CATEGORIES.map((category) => ({
    category,
    count: PRODUCTS.filter((product) => product.categoryId === category.id).length,
  }));

  return (
    <DashboardShell
      title={t('Admin dashboard', 'داشبورد مدیر')}
      subtitle={t('A preview of marketplace oversight. Buttons are shown for layout only and are not connected.', 'نمایشی از نظارت بر بازار. دکمه‌ها فقط برای چیدمان نشان داده شده‌اند و متصل نیستند.')}
      roleLabel={t('Administrator', 'مدیر')}
      navItems={NAV.map((item) => ({ href: item.href, icon: item.icon, label: t(item.en, item.prs) }))}
    >
      <DashboardSection id="overview" title={t('Marketplace overview (sample)', 'نمای کلی بازار (نمونه)')}>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard label={t('Official store sales (sample)', 'فروش فروشگاه رسمی (نمونه)')} value={formatAfn(3450000)} hint={t('Sample figure', 'رقم نمونه')} />
          <StatCard label={t('Seller sales (sample)', 'فروش فروشندگان (نمونه)')} value={formatAfn(2180000)} hint={t('Sample figure, tracked separately', 'رقم نمونه، جداگانه ثبت می‌شود')} />
          <StatCard label={t('Users (sample)', 'کاربران (نمونه)')} value={numberFormat(1240)} hint={t('Sample figure', 'رقم نمونه')} />
          <StatCard label={t('Awaiting review (sample)', 'منتظر بازبینی (نمونه)')} value={numberFormat(7)} hint={t('Sample figure', 'رقم نمونه')} />
        </div>
      </DashboardSection>

      <DashboardSection id="areas" title={t('Business areas (kept separate)', 'بخش‌های کسب‌وکار (جدا از هم)')} description={t('Each area has its own rules, reports, and ledger.', 'هر بخش قوانین، گزارش‌ها و دفتر حساب جداگانه دارد.')}>
        <div className="grid gap-4 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className={`rounded-2xl p-6 ${toneClasses[area.tone]}`}>
                <div className="flex items-center justify-between gap-2">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                  <span className="text-xs font-semibold opacity-80">{area.tag}</span>
                </div>
                <h3 className="mt-4 font-bold">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{area.rule}</p>
                <ul className="mt-4 flex flex-col gap-1 text-sm font-medium">
                  {area.stats.map((stat) => (
                    <li key={stat}>{stat}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </DashboardSection>

      <DashboardSection id="users" title={t('User and seller management (sample)', 'مدیریت کاربران و فروشندگان (نمونه)')}>
        <TableWrapper label={t('Users and sellers', 'کاربران و فروشندگان')}>
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Name', 'نام')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Role', 'نقش')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Joined', 'تاریخ عضویت')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_USERS.map((user) => (
                <tr key={tx(user.name)} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{tx(user.name)}</td>
                  <td className="px-4 py-3">{tx(user.role)}</td>
                  <td className="px-4 py-3"><StatusPill tone={userStatusTone[user.status]}>{userStatusLabel[user.status]}</StatusPill></td>
                  <td className="px-4 py-3 tabular-nums">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </DashboardSection>

      <DashboardSection id="moderation" title={t('Product moderation queue (sample)', 'صف بازبینی محصولات (نمونه)')} description={t('Review actions are shown but disabled in this prototype.', 'اقدامات بازبینی نشان داده شده‌اند اما در این نمونه غیرفعال هستند.')}>
        <TableWrapper label={t('Moderation queue', 'صف بازبینی')}>
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Product', 'محصول')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Seller', 'فروشنده')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Submitted', 'ارسال شده')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Status', 'وضعیت')}</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Actions', 'اقدامات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MODERATION_QUEUE.map((item) => (
                <tr key={item.id} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{tx(item.product)}</td>
                  <td className="px-4 py-3">{tx(item.seller)}</td>
                  <td className="px-4 py-3 tabular-nums">{item.submitted}</td>
                  <td className="px-4 py-3"><StatusPill tone={reviewTone[item.status]}>{reviewLabel[item.status]}</StatusPill></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" disabled className={DISABLED_ACTION}>{t('Approve', 'تأیید')}</button>
                      <button type="button" disabled className={DISABLED_ACTION}>{t('Request changes', 'درخواست اصلاح')}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </DashboardSection>

      <DashboardSection id="orders" title={t('Order management (sample)', 'مدیریت سفارش‌ها (نمونه)')}>
        <div className="grid gap-4 md:grid-cols-3">
          {areas.slice(0, 2).map((area) => (
            <div key={area.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-navy-900">{area.title}</p>
              <p className="mt-2 text-sm text-slate-600">{t('Orders are tracked and reported separately for this area.', 'سفارش‌های این بخش جداگانه ثبت و گزارش می‌شوند.')}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-gold-400 bg-gold-50 p-5">
            <p className="text-sm font-semibold text-slate-900">{t('Network (MLM)', 'شبکه (MLM)')}</p>
            <p className="mt-2 text-sm text-slate-700">{t('No orders are processed for this area yet.', 'هنوز هیچ سفارشی برای این بخش پردازش نمی‌شود.')}</p>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection id="categories" title={t('Category management', 'مدیریت دسته‌بندی‌ها')} description={t('Product counts come from the demonstration catalogue.', 'تعداد محصولات از کاتالوگ نمونه گرفته شده است.')}>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {categoryCounts.map(({ category, count }) => {
            const Icon = category.icon;
            return (
              <li key={category.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="h-5 w-5 text-navy-700" />
                  <span className="text-sm font-medium text-slate-900">{tx(category.name)}</span>
                </span>
                <span className="text-xs font-semibold text-slate-600 tabular-nums">{numberFormat(count)}</span>
              </li>
            );
          })}
        </ul>
      </DashboardSection>

      <DashboardSection id="finance" title={t('Financial controls (visual prototype)', 'کنترل‌های مالی (نمونه بصری)')} description={t('These controls are not functional. No commission, payout, or MLM calculation runs.', 'این کنترل‌ها کار نمی‌کنند. هیچ محاسبه کمیسیون، پرداخت یا MLM انجام نمی‌شود.')}>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-navy-300 bg-white p-6">
            <div className="flex items-center gap-2 text-navy-900">
              <BarChart3 aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-semibold">{t('Seller commission rules', 'قوانین کمیسیون فروشندگان')}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">{t('Configurable per seller in a future phase. Shown here as layout only.', 'در مرحله آینده برای هر فروشنده قابل تنظیم است. اینجا فقط چیدمان نشان داده شده است.')}</p>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <span className="text-slate-700">{t('Rule status', 'وضعیت قانون')}</span>
              <StatusPill tone="neutral">{t('Not active', 'فعال نیست')}</StatusPill>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-navy-300 bg-white p-6">
            <div className="flex items-center gap-2 text-navy-900">
              <Wallet aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-semibold">{t('Payout holds and audit trail', 'توقف پرداخت و سابقه ممیزی')}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">{t('Payouts and withdrawals are not part of this phase.', 'پرداخت و برداشت بخشی از این مرحله نیستند.')}</p>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <span className="text-slate-700">{t('Payouts', 'پرداخت‌ها')}</span>
              <StatusPill tone="neutral">{t('Not available', 'در دسترس نیست')}</StatusPill>
            </div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection id="reports" title={t('Reports and settings (sample)', 'گزارش‌ها و تنظیمات (نمونه)')}>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            t('Sales report by area', 'گزارش فروش بر اساس بخش'),
            t('Language and content settings', 'تنظیمات زبان و محتوا'),
            t('Contact and support inbox', 'صندوق تماس و پشتیبانی'),
          ].map((label) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-medium text-slate-900">{label}</span>
              <span className="text-xs font-semibold text-slate-500">{t('Coming later', 'به‌زودی')}</span>
            </div>
          ))}
        </div>
      </DashboardSection>
    </DashboardShell>
  );
}
