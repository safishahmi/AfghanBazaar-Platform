import { CircleCheck, Clock, Smartphone, Store, Users, Network } from 'lucide-react';
import PreviewFrame from '@/components/preview/PreviewFrame';
import { useLanguage } from '@/i18n/useLanguage';
import { CUSTOM_PROGRAMMING, ONE_TIME_COSTS, RECURRING_COSTS, type CostLine } from '@/data/roadmap';

function usd(amount: number) {
  return `$${amount.toLocaleString('en-US')}`;
}

function sumRange(lines: CostLine[]) {
  return lines.reduce((acc, line) => ({ min: acc.min + line.min, max: acc.max + line.max }), { min: 0, max: 0 });
}

export default function RoadmapPage() {
  const { t, tx } = useLanguage();
  const oneTimeTotal = sumRange(ONE_TIME_COSTS);
  const recurringTotal = sumRange(RECURRING_COSTS);

  const systems = [
    { icon: Store, title: t('A. Official store', 'الف. فروشگاه رسمی'), text: t('Products owned and sold by AfghanBazaar. Never counted as seller sales.', 'محصولات متعلق به افغان بازار. هرگز فروش فروشنده حساب نمی‌شوند.') },
    { icon: Users, title: t('B. Independent sellers', 'ب. فروشندگان مستقل'), text: t('Seller registration, products, orders, and configurable commission rules.', 'ثبت فروشنده، محصولات، سفارش‌ها و قوانین کمیسیون قابل تنظیم.') },
    { icon: Network, title: t('C. Network (MLM) portal', 'ج. پورتال شبکه (MLM)'), text: t('Separate member accounts, referrals, eligible products, and rules. Not combined with A or B.', 'حساب اعضای جدا، معرفی‌ها، محصولات واجد شرایط و قوانین. با A و B ترکیب نمی‌شود.') },
  ];

  const stages = [
    { status: 'done', title: t('Stage 1: Responsive website foundation', 'مرحله ۱: زیربنای سایت واکنش‌گرا'), text: t('Pages, language switching, demonstration products, local cart and wishlist.', 'صفحات، تغییر زبان، محصولات نمونه، سبد و علاقه‌مندی‌های محلی.') },
    { status: 'current', title: t('Stage 2: Design approval', 'مرحله ۲: تأیید طراحی'), text: t('Homepage, product page, seller and admin dashboards are reviewed here before full build.', 'صفحه اصلی، صفحه محصول، داشبورد فروشنده و مدیر پیش از ساخت کامل بررسی می‌شوند.') },
    { status: 'next', title: t('Stage 3: Accounts, data, and product and order management', 'مرحله ۳: حساب‌ها، داده‌ها، و مدیریت محصول و سفارش'), text: t('Database, customer accounts, seller onboarding, and real product records.', 'پایگاه داده، حساب مشتری، ثبت فروشنده و ثبت واقعی محصولات.') },
    { status: 'later', title: t('Stage 4: Payments, delivery, commission rules', 'مرحله ۴: پرداخت، ارسال، قوانین کمیسیون'), text: t('Starts only after provider availability and legal review are confirmed.', 'تنها پس از تأیید دسترسی درگاه و بررسی حقوقی شروع می‌شود.') },
    { status: 'later', title: t('Stage 5: MLM portal', 'مرحله ۵: پورتال MLM'), text: t('Starts only after legal, financial, and accounting review. No earnings are promised.', 'تنها پس از بررسی حقوقی، مالی و حسابداری شروع می‌شود. هیچ درآمدی وعده داده نمی‌شود.') },
  ];

  const mobile = [
    { title: t('Phase 1: Responsive website', 'مرحله ۱: سایت واکنش‌گرا'), text: t('Works on phones, tablets, and desktops in a browser. This is the current focus.', 'در مرورگر گوشی، تبلت و کامپیوتر کار می‌کند. این تمرکز فعلی است.') },
    { title: t('Phase 2: Progressive Web App (evaluate)', 'مرحله ۲: برنامه وب پیشرو (ارزیابی)'), text: t('Installable from the browser, app icons, and limited offline browsing. Not built yet; must be tested before any claim is made.', 'قابل نصب از مرورگر، آیکون اپلیکیشن و مرور محدود آفلاین. هنوز ساخته نشده؛ پیش از هر ادعا باید آزمایش شود.') },
    { title: t('Phase 3: Native Android and iOS apps', 'مرحله ۳: اپلیکیشن بومی اندروید و iOS'), text: t('Considered after orders, accounts, and APIs are stable. Not estimated yet.', 'پس از پایداری سفارش‌ها، حساب‌ها و API بررسی می‌شود. هنوز تخمین زده نشده است.') },
  ];

  const statusMeta = {
    done: { label: t('Done', 'انجام شده'), className: 'bg-navy-50 text-navy-900 ring-navy-200' },
    current: { label: t('Current', 'فعلی'), className: 'bg-gold-100 text-gold-900 ring-gold-300' },
    next: { label: t('Next', 'بعدی'), className: 'bg-navy-50 text-navy-800 ring-navy-200' },
    later: { label: t('Later', 'بعداً'), className: 'bg-slate-100 text-slate-700 ring-slate-300' },
  } as const;

  return (
    <PreviewFrame>
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">{t('Roadmap and cost planning', 'نقشه راه و برنامه هزینه')}</p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{t('From approved design to a full marketplace', 'از طراحی تأییدشده تا یک بازار کامل')}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            {t(
              'This page is a planning document. Costs are preliminary planning ranges in US dollars, not vendor quotes. Actual costs depend on final scope, provider availability, and legal review.',
              'این صفحه یک سند برنامه‌ریزی است. هزینه‌ها بازه‌های اولیه به دلار آمریکا هستند، نه پیشنهاد قیمت رسمی فروشنده. هزینه نهایی به محدوده نهایی، دسترسی درگاه‌ها و بررسی حقوقی بستگی دارد.',
            )}
          </p>

          <section aria-labelledby="rm-systems" className="mt-14">
            <h2 id="rm-systems" className="text-xl font-bold text-navy-900">{t('Three separate business systems', 'سه سیستم کسب‌وکار جدا')}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {systems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                    <Icon aria-hidden="true" className="h-6 w-6 text-navy-800" />
                    <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="rm-stages" className="mt-14">
            <h2 id="rm-stages" className="text-xl font-bold text-navy-900">{t('Delivery stages', 'مراحل اجرا')}</h2>
            <ol className="mt-6 flex flex-col gap-3">
              {stages.map((stage) => {
                const meta = statusMeta[stage.status as keyof typeof statusMeta];
                return (
                  <li key={stage.title} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="font-semibold text-slate-900">{stage.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{stage.text}</p>
                    </div>
                    <span className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${meta.className}`}>
                      {stage.status === 'done' ? <CircleCheck aria-hidden="true" className="h-3.5 w-3.5" /> : <Clock aria-hidden="true" className="h-3.5 w-3.5" />}
                      {meta.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="rm-mobile" className="mt-14">
            <h2 id="rm-mobile" className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <Smartphone aria-hidden="true" className="h-5 w-5" />
              {t('Mobile app strategy', 'استراتژی اپلیکیشن موبایل')}
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {mobile.map((item) => (
                <li key={item.title} className="rounded-2xl bg-navy-50 p-6">
                  <h3 className="font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="rm-costs" className="mt-14">
            <h2 id="rm-costs" className="text-xl font-bold text-navy-900">{t('Preliminary cost ranges (USD)', 'بازه‌های اولیه هزینه (دلار آمریکا)')}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {t(
                'Assumes one development team building the full scope above in Dari and English. Excludes mobile apps, legal and tax advice, and licensing.',
                'فرض بر یک تیم توسعه است که دامنه کامل بالا را به زبان‌های دری و انگلیسی می‌سازد. اپلیکیشن موبایل، مشاوره حقوقی و مالیاتی و مجوزها را شامل نمی‌شود.',
              )}
            </p>

            <h3 className="mt-8 text-base font-semibold text-slate-900">{t('A. One-time development', 'الف. هزینه یکباره توسعه')}</h3>
            <CostTable lines={ONE_TIME_COSTS} total={oneTimeTotal} totalLabel={t('Estimated total', 'مجموع تخمینی')} />

            <h3 className="mt-8 text-base font-semibold text-slate-900">{t('B. Recurring yearly costs', 'ب. هزینه‌های سالانه تکرارشونده')}</h3>
            <CostTable lines={RECURRING_COSTS} total={recurringTotal} totalLabel={t('Estimated yearly total', 'مجموع سالانه تخمینی')} />

            <h3 className="mt-8 text-base font-semibold text-slate-900">{t('C. Custom programming requirements', 'ج. نیازمندی‌های برنامه‌نویسی سفارشی')}</h3>
            <ul className="mt-3 flex list-disc flex-col gap-2 ps-5 text-sm text-slate-700">
              {CUSTOM_PROGRAMMING.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              {t(
                'Payment provider availability in Afghanistan is not confirmed. Fees and onboarding must be checked directly with each provider.',
                'دسترسی درگاه‌های پرداخت در افغانستان تأیید نشده است. کارمزد و ثبت‌نام باید مستقیماً با هر درگاه بررسی شود.',
              )}
            </p>
          </section>

          <section aria-labelledby="rm-before" className="mt-14 rounded-3xl bg-navy-900 p-8 text-white">
            <h2 id="rm-before" className="text-xl font-bold">{t('Before full production development', 'پیش از توسعه کامل و راه‌اندازی')}</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 ps-5 text-sm text-navy-100">
              <li>{t('Approve the homepage, product, seller, and admin prototypes.', 'تأیید نمونه‌های صفحه اصلی، محصول، فروشنده و مدیر.')}</li>
              <li>{t('Choose the database and hosting plan, and confirm who owns the accounts.', 'انتخاب پایگاه داده و پلان میزبانی، و تعیین مالک حساب‌ها.')}</li>
              <li>{t('Confirm payment and delivery options with providers.', 'تأیید گزینه‌های پرداخت و ارسال با درگاه‌ها و پیک‌ها.')}</li>
              <li>{t('Get legal and accounting advice before the commission and MLM rules are built.', 'پیش از ساخت قوانین کمیسیون و MLM، مشاوره حقوقی و حسابداری بگیرید.')}</li>
              <li>{t('Have a native Dari reviewer check all Dari text.', 'یک بازبین بومی دری تمام متن‌های دری را بررسی کند.')}</li>
            </ul>
          </section>
        </div>
      </main>
    </PreviewFrame>
  );
}

function CostTable({
  lines,
  total,
  totalLabel,
}: {
  lines: CostLine[];
  total: { min: number; max: number };
  totalLabel: string;
}) {
  const { t, tx } = useLanguage();
  const formatRange = (line: CostLine) => (line.min === 0 && line.max === 0 ? '-' : `${usd(line.min)} - ${usd(line.max)}`);
  return (
    <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white" role="region" aria-label={totalLabel} tabIndex={0}>
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-xs text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Item', 'مورد')}</th>
            <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Range', 'بازه')}</th>
            <th scope="col" className="px-4 py-3 text-start font-semibold">{t('Notes', 'توضیح')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {lines.map((line) => (
            <tr key={line.item.en}>
              <td className="px-4 py-3 font-medium text-slate-900">{tx(line.item)}</td>
              <td className="whitespace-nowrap px-4 py-3 tabular-nums">{formatRange(line)}</td>
              <td className="px-4 py-3 text-slate-600">{tx(line.note)}</td>
            </tr>
          ))}
          <tr className="bg-navy-50 font-semibold text-navy-900">
            <td className="px-4 py-3">{totalLabel}</td>
            <td className="whitespace-nowrap px-4 py-3 tabular-nums">{`${usd(total.min)} - ${usd(total.max)}`}</td>
            <td className="px-4 py-3 font-normal text-slate-600">{t('Planning estimate only', 'فقط برآورد برنامه‌ریزی')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
