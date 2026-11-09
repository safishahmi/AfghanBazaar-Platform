import type { Lang } from '@/types/marketplace';

export function formatAfn(amount: number): string {
  return `${amount.toLocaleString('en-US')} AFN`;
}

export function formatDemoDate(isoDate: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'prs' ? 'fa-AF' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
