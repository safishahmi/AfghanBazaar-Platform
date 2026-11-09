import type { ReactNode } from 'react';
import DemoBadge from '@/components/ui/DemoBadge';
import PageHeader from '@/components/ui/PageHeader';
import SectionNav, { type SectionNavItem } from '@/components/ui/SectionNav';

interface SectionShellProps {
  title: string;
  description?: string;
  navLabel: string;
  navItems: SectionNavItem[];
  rootPath: string;
  notice: string;
  children: ReactNode;
}

export default function SectionShell({ title, description, navLabel, navItems, rootPath, notice, children }: SectionShellProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <SectionNav label={navLabel} items={navItems} rootPath={rootPath} />
        <div className="min-w-0 space-y-6">
          <div className="flex items-start gap-3 rounded-2xl bg-gold-50 p-4 text-sm leading-relaxed text-navy-900 ring-1 ring-gold-400">
            <DemoBadge />
            <p>{notice}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
