import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import DemoBadge from '@/components/ui/DemoBadge';
import PreviewFrame from '@/components/preview/PreviewFrame';

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardShellProps {
  title: string;
  subtitle: string;
  roleLabel: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
}

export default function DashboardShell({ title, subtitle, roleLabel, navItems, children }: DashboardShellProps) {
  const { t } = useLanguage();

  return (
    <PreviewFrame>
      <div className="flex flex-1 flex-col bg-slate-50 lg:flex-row">
        <aside className="border-b border-slate-200 bg-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-e">
          <div className="hidden p-6 lg:block">
            <span className="inline-flex rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-gold-300">{roleLabel}</span>
          </div>
          <nav aria-label={t('Dashboard sections', 'بخش‌های داشبورد')} className="no-scrollbar overflow-x-auto">
            <ul className="flex gap-1 px-4 py-3 lg:flex-col lg:px-3 lg:py-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      href={item.href}
                      className="flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main id="main-content" className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">{subtitle}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gold-400 bg-gold-50 px-3 py-2 text-xs text-navy-900">
                <DemoBadge />
                {t('All records and figures on this page are samples.', 'همه ثبت‌ها و ارقام این صفحه نمونه هستند.')}
              </div>
            </header>
            <div className="mt-8 flex flex-col gap-10">{children}</div>
          </div>
        </main>
      </div>
    </PreviewFrame>
  );
}

export function DashboardSection({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <div className="mb-4">
        <h2 id={`${id}-title`} className="text-lg font-bold text-navy-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-navy-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

export function TableWrapper({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: 'success' | 'warning' | 'danger' | 'neutral' | 'info'; children: ReactNode }) {
  const styles = {
    success: 'bg-navy-50 text-navy-900 ring-navy-200',
    warning: 'bg-gold-50 text-gold-800 ring-gold-300',
    danger: 'bg-slate-100 text-slate-800 ring-slate-300',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-300',
    info: 'bg-navy-50 text-navy-800 ring-navy-200',
  }[tone];
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${styles}`}>{children}</span>;
}
