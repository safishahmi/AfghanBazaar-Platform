import { useId, useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { useRouter } from '@/router/useRouter';

interface SearchBoxProps {
  className?: string;
}

export default function SearchBox({ className = '' }: SearchBoxProps) {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products');
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {t('Search products', 'جستجوی محصولات')}
      </label>
      <Search
        className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        aria-hidden="true"
      />
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('Search products, brands, and sellers', 'جستجوی محصولات، برند و فروشنده')}
        className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 ps-10 pe-4 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </form>
  );
}
