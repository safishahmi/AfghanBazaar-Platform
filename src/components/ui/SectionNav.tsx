import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';
import Link from '@/router/Link';
import type { LocalizedText } from '@/types/marketplace';

export interface SectionNavItem {
  to: string;
  label: LocalizedText;
  icon: LucideIcon;
}

interface SectionNavProps {
  label: string;
  items: SectionNavItem[];
  rootPath: string;
}

export default function SectionNav({ label, items, rootPath }: SectionNavProps) {
  const { tx } = useLanguage();
  const { path } = useRouter();

  const isActive = (to: string) => (to === rootPath ? path === to : path === to || path.startsWith(`${to}/`));

  return (
    <nav aria-label={label} className="min-w-0 lg:sticky lg:top-32 lg:self-start">
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {items.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <li key={item.to} className="shrink-0">
              <Link
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 lg:rounded-xl ${
                  active ? 'bg-navy-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-navy-50 hover:text-navy-900'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {tx(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
