import type { LucideIcon } from 'lucide-react';
import Link from '@/router/Link';

interface IconLinkProps {
  to: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

export default function IconLink({ to, label, icon: Icon, count }: IconLinkProps) {
  const showCount = count !== undefined && count > 0;
  return (
    <Link
      to={to}
      title={label}
      aria-label={count !== undefined ? `${label} (${count})` : label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {showCount && (
        <span className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-900">
          {count}
        </span>
      )}
    </Link>
  );
}
