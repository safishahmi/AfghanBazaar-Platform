import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';
import Link from '@/router/Link';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from './ProductGrid';

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllTo?: string;
}

export default function ProductSection({ id, title, subtitle, products, viewAllTo }: ProductSectionProps) {
  const { t, isRtl } = useLanguage();

  const action = viewAllTo ? (
    <Link
      to={viewAllTo}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 transition-colors hover:text-primary-600"
    >
      {t('View all', 'مشاهده همه')}
      <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
    </Link>
  ) : null;

  return (
    <section aria-labelledby={id} className="py-12 sm:py-16">
      <SectionHeading id={id} title={title} subtitle={subtitle} action={action} />
      <ProductGrid products={products} />
    </section>
  );
}
